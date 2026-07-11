import { Resend } from "resend";
import { getSupabaseAdmin } from "./supabaseClient";

interface ContactSubmission {
  fullName?: string;
  email: string;
  phone?: string;
  company?: string;
  useCase: string;
  source?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Loose on purpose: accepts digits with optional leading +, spaces,
// hyphens, or parens, so we don't reject real international numbers.
const PHONE_RE = /^[+\d][\d\s\-()]{5,19}$/;
const MAX_FIELD_LENGTH = 5000;
const MAX_SHORT_FIELD_LENGTH = 200;

// Validates and truncates a raw request body into a safe submission shape.
// Called at the API boundary before anything reaches Resend or Supabase, so
// malformed or oversized payloads (scripted abuse, not real form fills)
// never turn into an email send or a database write.
export function validateContactSubmission(body: any): ContactSubmission | { error: string } {
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const useCase = typeof body?.useCase === "string" ? body.useCase.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";

  if (!email || !EMAIL_RE.test(email) || email.length > MAX_SHORT_FIELD_LENGTH) {
    return { error: "Please include a valid email address." };
  }
  if (!useCase) {
    return { error: "Please include a description of what you want to automate." };
  }
  if (phone && !PHONE_RE.test(phone)) {
    return { error: "Please include a valid phone number, or leave it blank." };
  }

  return {
    email,
    useCase: useCase.slice(0, MAX_FIELD_LENGTH),
    fullName: typeof body?.fullName === "string" ? body.fullName.trim().slice(0, MAX_SHORT_FIELD_LENGTH) : undefined,
    phone: phone ? phone.slice(0, MAX_SHORT_FIELD_LENGTH) : undefined,
    company: typeof body?.company === "string" ? body.company.trim().slice(0, MAX_SHORT_FIELD_LENGTH) : undefined,
    source: typeof body?.source === "string" ? body.source.trim().slice(0, MAX_SHORT_FIELD_LENGTH) : undefined,
  };
}

// Persists every form submission to the `leads` table in Supabase.
// Best-effort — a database outage or missing schema should never block
// the email notification, so failures are logged, not thrown.
async function saveLeadToDatabase(submission: ContactSubmission): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  try {
    const { error } = await supabase.from("leads").insert({
      source: submission.source || "contact_form",
      full_name: submission.fullName || null,
      email: submission.email,
      phone: submission.phone || null,
      company: submission.company || null,
      use_case: submission.useCase,
    });

    if (error) {
      console.error("[Contact] Failed to save lead to Supabase:", error.message);
    }
  } catch (err: any) {
    console.error("[Contact] Unexpected error saving lead to Supabase:", err?.message);
  }
}

// Per-source subject/body for the confirmation email sent back to the
// visitor, so "thanks for reaching out" actually reflects what they did
// (applied for the internship, tried the ROI calculator, etc.) instead of
// a generic "we got your message."
const CONFIRMATION_COPY: Record<string, { subject: string; body: (name: string) => string }> = {
  careers_internship: {
    subject: "We've got your internship application, Mashnu AI",
    body: (name) =>
      `Hi ${name},\n\nThanks for applying to the Mashnu AI internship program. A real person on our team reviews every application, we'll email you within a few business days with next steps.\n\nIn the meantime, feel free to reply to this email if anything comes up.\n\nThanks for connecting with us,\nThe Mashnu AI team`,
  },
  early_access: {
    subject: "You're on the list, Mashnu AI",
    body: (name) =>
      `Hi ${name},\n\nThanks for requesting early access to the Mashnu AI assistant. We're rolling it out gradually while we get it right, we'll reach out with an honest update on timing, usually within a business day.\n\nThanks for connecting with us,\nThe Mashnu AI team`,
  },
  roi_calculator: {
    subject: "Your ROI estimate is on its way, Mashnu AI",
    body: (name) =>
      `Hi ${name},\n\nThanks for trying the Mashnu AI ROI calculator. We've saved your numbers, and a real person will follow up within a business day with a plan tailored to your team.\n\nThanks for connecting with us,\nThe Mashnu AI team`,
  },
  chat_widget: {
    subject: "Thanks for reaching out, Mashnu AI",
    body: (name) =>
      `Hi ${name},\n\nThanks for connecting with us through the chat widget. We've passed your details to the team, and someone will reach out within a business day.\n\nThanks for connecting with us,\nThe Mashnu AI team`,
  },
  contact_page: {
    subject: "We've got your message, Mashnu AI",
    body: (name) =>
      `Hi ${name},\n\nThanks for telling us what you want to automate. An engineer will reply to this email directly, usually within a business day, with an honest read on whether we're a good fit.\n\nThanks for connecting with us,\nThe Mashnu AI team`,
  },
};

const DEFAULT_CONFIRMATION = {
  subject: "Thanks for connecting with us, Mashnu AI",
  body: (name: string) =>
    `Hi ${name},\n\nThanks for reaching out to Mashnu AI. We've received your message, and a real person will follow up within a business day.\n\nThanks for connecting with us,\nThe Mashnu AI team`,
};

// Emails the visitor a short, honest confirmation that we received their
// submission. Best-effort: a failure here should never surface as an error
// to the visitor, since the internal notification and database write (the
// parts that actually matter operationally) already succeeded by this point.
async function sendConfirmationEmail(resend: Resend, submission: ContactSubmission): Promise<void> {
  const { fullName, email, source } = submission;
  const name = fullName?.trim().split(/\s+/)[0] || "there";
  const copy = CONFIRMATION_COPY[source || ""] || DEFAULT_CONFIRMATION;

  try {
    await resend.emails.send({
      from: process.env.NOTIFY_FROM || "Mashnu AI Website <onboarding@resend.dev>",
      to: email,
      subject: copy.subject,
      text: copy.body(name),
    });
  } catch (err: any) {
    console.error("[Contact] Failed to send visitor confirmation email:", err?.message);
  }
}

// Sends every form submission (Contact page, homepage early-access form,
// Careers internship application) to the address in NOTIFY_EMAIL via
// Resend, and persists it to Supabase. Falls back to a console log if
// RESEND_API_KEY isn't configured, so local dev without the key doesn't
// hard-fail — but this means submissions are NOT emailed until the key
// is set (they are still saved to the database if Supabase is configured).
export async function notifyContact(submission: ContactSubmission): Promise<void> {
  const { fullName, email, phone, company, useCase } = submission;
  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.NOTIFY_EMAIL;

  await saveLeadToDatabase(submission);

  if (!apiKey || !notifyTo) {
    console.warn(
      `[Contact] RESEND_API_KEY or NOTIFY_EMAIL not set — submission from ${fullName || "unknown"} <${email}> was NOT emailed. ` +
      `Message: ${useCase.slice(0, 200)}`
    );
    return;
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: process.env.NOTIFY_FROM || "Mashnu AI Website <onboarding@resend.dev>",
    to: notifyTo,
    replyTo: email,
    subject: `New website submission from ${fullName || email}`,
    text: [
      `Name: ${fullName || "(not provided)"}`,
      `Email: ${email}`,
      `Phone: ${phone || "(not provided)"}`,
      `Context: ${company || "(none)"}`,
      "",
      "Message:",
      useCase,
    ].join("\n"),
  });

  await sendConfirmationEmail(resend, submission);
}

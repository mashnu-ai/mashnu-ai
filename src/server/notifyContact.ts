import { Resend } from "resend";
import { getSupabaseAdmin } from "./supabaseClient";

interface ContactSubmission {
  fullName?: string;
  email: string;
  company?: string;
  useCase: string;
  source?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 5000;
const MAX_SHORT_FIELD_LENGTH = 200;

// Validates and truncates a raw request body into a safe submission shape.
// Called at the API boundary before anything reaches Resend or Supabase, so
// malformed or oversized payloads (scripted abuse, not real form fills)
// never turn into an email send or a database write.
export function validateContactSubmission(body: any): ContactSubmission | { error: string } {
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const useCase = typeof body?.useCase === "string" ? body.useCase.trim() : "";

  if (!email || !EMAIL_RE.test(email) || email.length > MAX_SHORT_FIELD_LENGTH) {
    return { error: "Please include a valid email address." };
  }
  if (!useCase) {
    return { error: "Please include a description of what you want to automate." };
  }

  return {
    email,
    useCase: useCase.slice(0, MAX_FIELD_LENGTH),
    fullName: typeof body?.fullName === "string" ? body.fullName.trim().slice(0, MAX_SHORT_FIELD_LENGTH) : undefined,
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

// Sends every form submission (Contact page, homepage early-access form,
// Careers internship application) to the address in NOTIFY_EMAIL via
// Resend, and persists it to Supabase. Falls back to a console log if
// RESEND_API_KEY isn't configured, so local dev without the key doesn't
// hard-fail — but this means submissions are NOT emailed until the key
// is set (they are still saved to the database if Supabase is configured).
export async function notifyContact(submission: ContactSubmission): Promise<void> {
  const { fullName, email, company, useCase } = submission;
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
      `Context: ${company || "(none)"}`,
      "",
      "Message:",
      useCase,
    ].join("\n"),
  });
}

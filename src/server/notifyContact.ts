import { Resend } from "resend";

interface ContactSubmission {
  fullName?: string;
  email: string;
  company?: string;
  useCase: string;
}

// Sends every form submission (Contact page, homepage early-access form,
// Careers internship application) to the address in NOTIFY_EMAIL via
// Resend. Falls back to a console log if RESEND_API_KEY isn't configured,
// so local dev without the key doesn't hard-fail — but this means
// submissions are NOT delivered anywhere until the key is set.
export async function notifyContact(submission: ContactSubmission): Promise<void> {
  const { fullName, email, company, useCase } = submission;
  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.NOTIFY_EMAIL;

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

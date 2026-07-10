import type { VercelRequest, VercelResponse } from "@vercel/node";
import { notifyContact, validateContactSubmission } from "../src/server/notifyContact";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const submission = validateContactSubmission(req.body);
  if ("error" in submission) {
    return res.status(400).json({ error: submission.error });
  }

  try {
    await notifyContact(submission);
    res.json({ received: true });
  } catch (error: any) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Failed to send your message. Please try again shortly." });
  }
}

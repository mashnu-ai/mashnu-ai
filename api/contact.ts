import type { VercelRequest, VercelResponse } from "@vercel/node";
import { notifyContact, validateContactSubmission } from "../src/server/notifyContact";
import { checkRateLimit, getClientIp } from "../src/server/rateLimit";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const ip = getClientIp(req.headers, req.socket?.remoteAddress);
  const rateLimit = checkRateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!rateLimit.allowed) {
    res.setHeader("Retry-After", String(rateLimit.retryAfterSeconds));
    return res.status(429).json({ error: "Too many submissions. Please try again in a few minutes." });
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

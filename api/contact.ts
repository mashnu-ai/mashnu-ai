import type { VercelRequest, VercelResponse } from "@vercel/node";
import { notifyContact } from "../src/server/notifyContact";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { fullName, email, company, useCase } = req.body ?? {};

  if (!useCase || !email) {
    return res.status(400).json({ error: "Please include your email and a description of what you want to automate." });
  }

  try {
    await notifyContact({ fullName, email, company, useCase });
    res.json({ received: true });
  } catch (error: any) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: error?.message || "Failed to send your message." });
  }
}

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { assistantChat } from "../../src/server/agentLogic";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { messages } = req.body ?? {};

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "A valid array of messages is required." });
  }

  try {
    res.json(assistantChat(messages));
  } catch (error: any) {
    console.error("Personal Assistant chat error:", error);
    res.status(500).json({ error: error?.message || "Failed to generate chat response." });
  }
}

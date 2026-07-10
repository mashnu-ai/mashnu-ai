import type { VercelRequest, VercelResponse } from "@vercel/node";
import { assistantChat } from "../../src/server/agentLogic";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { messages, sessionId } = req.body ?? {};

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "A valid array of messages is required." });
  }

  try {
    res.json(await assistantChat(messages, sessionId));
  } catch (error: any) {
    console.error("Personal Assistant chat error:", error);
    res.status(500).json({ error: "Failed to generate chat response. Please try again shortly." });
  }
}

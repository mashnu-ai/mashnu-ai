import type { VercelRequest, VercelResponse } from "@vercel/node";
import { assistantChat } from "../../src/server/agentLogic";
import { checkRateLimit, getClientIp } from "../../src/server/rateLimit";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const ip = getClientIp(req.headers, req.socket?.remoteAddress);
  const rateLimit = checkRateLimit(`assistant-chat:${ip}`, 20, 5 * 60 * 1000);
  if (!rateLimit.allowed) {
    res.setHeader("Retry-After", String(rateLimit.retryAfterSeconds));
    return res.status(429).json({ error: "You're sending messages too quickly. Please wait a moment and try again." });
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

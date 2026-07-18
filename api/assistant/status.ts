import type { VercelRequest, VercelResponse } from "@vercel/node";
import { assistantChatStatus } from "../../src/server/agentLogic.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const sessionId = typeof req.query.sessionId === "string" ? req.query.sessionId : undefined;

  try {
    res.json(await assistantChatStatus(sessionId));
  } catch (error: any) {
    console.error("Assistant status error:", error);
    res.status(500).json({ error: "Failed to check assistant status." });
  }
}

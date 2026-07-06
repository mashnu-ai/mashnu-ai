import type { VercelRequest, VercelResponse } from "@vercel/node";
import { compileAgent } from "../src/server/agentLogic";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { prompt } = req.body ?? {};

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required to compile an agent pipeline." });
  }

  try {
    res.json(compileAgent(prompt));
  } catch (error: any) {
    console.error("Compilation error:", error);
    res.status(500).json({ error: error?.message || "Failed to compile the agent pipeline." });
  }
}

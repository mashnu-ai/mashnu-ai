import type { VercelRequest, VercelResponse } from "@vercel/node";
import { simulateStep } from "../src/server/agentLogic.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { compiledAgent, userInput } = req.body ?? {};

  if (!compiledAgent || !userInput) {
    return res.status(400).json({ error: "Compiled agent configuration and user input test query are required." });
  }

  try {
    res.json(simulateStep(compiledAgent, userInput));
  } catch (error: any) {
    console.error("Simulation error:", error);
    res.status(500).json({ error: "Failed to simulate agent execution trace." });
  }
}

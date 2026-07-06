import type { VercelRequest, VercelResponse } from "@vercel/node";
import { qualifyLead } from "../src/server/agentLogic";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { company, useCase, estimatedVolume, currentSystem } = req.body ?? {};

  if (!useCase) {
    return res.status(400).json({ error: "The useCase field is required for technical assessment." });
  }

  try {
    res.json(qualifyLead(useCase, company, estimatedVolume, currentSystem));
  } catch (error: any) {
    console.error("Lead qualification error:", error);
    res.status(500).json({ error: error?.message || "Failed to analyze proposed use-case." });
  }
}

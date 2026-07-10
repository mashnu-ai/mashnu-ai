import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getModelPricing } from "../src/server/modelPricing";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    res.json(await getModelPricing());
  } catch (error: any) {
    console.error("Model pricing error:", error);
    res.status(500).json({ error: "Failed to fetch model pricing." });
  }
}

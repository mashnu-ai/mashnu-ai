import type { VercelRequest, VercelResponse } from "@vercel/node";
import { detectGeo } from "../src/server/geo.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const forwardedFor = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(",")[0]?.trim();

  try {
    const geo = await detectGeo(ip);
    res.json(geo);
  } catch (error: any) {
    console.error("Geo detection error:", error);
    res.status(500).json({ error: "Failed to detect location." });
  }
}

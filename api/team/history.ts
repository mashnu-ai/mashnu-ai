import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isTeamRequestAuthorized, getRecentRuns } from "../../src/server/teamLogic.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!isTeamRequestAuthorized(req.headers["x-team-key"] as string | undefined)) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  try {
    res.json({ runs: await getRecentRuns(40) });
  } catch (error: any) {
    console.error("[Team] History fetch failed:", error);
    res.status(500).json({ error: "Failed to fetch run history." });
  }
}

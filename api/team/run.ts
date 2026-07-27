import type { VercelRequest, VercelResponse } from "@vercel/node";
import { randomUUID } from "node:crypto";
import { isTeamRequestAuthorized, runRole, runAllRoles, saveRoleResult, TeamRole } from "../../src/server/teamLogic.js";
import { checkRateLimit, getClientIp } from "../../src/server/rateLimit.js";

const VALID_ROLES: TeamRole[] = ["content_strategist", "copy_producer", "publisher", "community_rep", "growth_analyst"];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!isTeamRequestAuthorized(req.headers["x-team-key"] as string | undefined)) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const ip = getClientIp(req.headers, req.socket?.remoteAddress);
  const rateLimit = checkRateLimit(`team-run:${ip}`, 20, 10 * 60 * 1000);
  if (!rateLimit.allowed) {
    res.setHeader("Retry-After", String(rateLimit.retryAfterSeconds));
    return res.status(429).json({ error: "Too many runs. Please wait a few minutes." });
  }

  const { role, approve, theme, drafts } = req.body || {};
  const runGroupId = randomUUID();

  try {
    if (role === "all") {
      const results = await runAllRoles(!!approve);
      await Promise.all(results.map((r) => saveRoleResult(runGroupId, r)));
      return res.json({ runGroupId, results });
    }

    if (!VALID_ROLES.includes(role)) {
      return res.status(400).json({ error: `Unknown role "${role}".` });
    }

    const result = await runRole(role, { theme, drafts, approve: !!approve });
    await saveRoleResult(runGroupId, result, { theme, drafts, approve });
    return res.json({ runGroupId, results: [result] });
  } catch (error: any) {
    console.error("[Team] Run failed:", error);
    res.status(500).json({ error: "The run failed unexpectedly. Please try again." });
  }
}

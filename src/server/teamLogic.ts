// Internal "AI marketing team" pipeline for src/pages/Team.tsx. Five roles
// mirror the AI Employees Mashnu sells to customers (see AIEmployees.tsx):
// each one is a pure function returning a RoleResult, shared between the
// local Express dev server (server.ts) and the Vercel functions
// (api/team/*.ts) — same pattern as agentLogic.ts.
//
// Two things are load-bearing across every role below and must not be
// "simplified" away:
//   1. Publisher never posts without an explicit approve=true from a human.
//      There is no autonomous cold-posting path in this file, on purpose.
//   2. A role with no credentials configured returns status "needs_setup"
//      with an honest message, never a fabricated result.

import { createHmac, randomBytes } from "node:crypto";
import { getSupabaseAdmin } from "./supabaseClient.js";
import { callGroq, GroqNotConfiguredError } from "./agentLogic.js";

export type TeamRole = "content_strategist" | "copy_producer" | "publisher" | "community_rep" | "growth_analyst";
export type RunStatus = "done" | "needs_approval" | "needs_setup" | "error";

export interface RoleResult {
  role: TeamRole;
  status: RunStatus;
  output: any;
  message?: string;
}

export function isTeamRequestAuthorized(providedKey: string | undefined): boolean {
  const expected = process.env.TEAM_ADMIN_KEY;
  // Fail closed: an unset TEAM_ADMIN_KEY means nobody is authorized, not
  // "anyone is" — unlike the best-effort Supabase/Resend checks elsewhere
  // on this site, this gates an internal admin surface.
  return !!expected && providedKey === expected;
}

const MASHNU_CONTEXT =
  `Mashnu AI builds a personal AI assistant that answers calls, replies on WhatsApp, and remembers what matters to a person, ` +
  `plus "AI Employees" (AI Receptionist, AI Sales & Support Rep, AI SDR, AI Concierge, and more) that businesses hire the same way. ` +
  `The company was founded 8 July 2026 and is building in public: honest about what's ready, never overpromising, never fabricating stats. ` +
  `Brand voice: plain, outcome-focused, no hype, no em dashes.`;

const FOUNDING_DATE_UTC = Date.UTC(2026, 6, 8);

function getDayNumber(): number {
  return Math.floor((Date.now() - FOUNDING_DATE_UTC) / (24 * 60 * 60 * 1000)) + 1;
}

// Groq is asked for compact JSON but LLMs occasionally wrap it in prose or
// a code fence — try a straight parse first, then fall back to pulling out
// the first {...} block, before giving up and returning null.
function parseJsonLoose(text: string): any {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

// ---------------------------------------------------------------------------
// Role 1: Content Strategist — proposes today's content idea.
// ---------------------------------------------------------------------------

export interface ContentTheme {
  dayNumber: number;
  theme: string;
  angle: string;
}

async function runContentStrategist(): Promise<RoleResult> {
  const dayNumber = getDayNumber();

  try {
    const raw = await callGroq(
      [
        {
          role: "system",
          content:
            `${MASHNU_CONTEXT}\n\nYou are Mashnu's content strategist. Given today's day number, propose ONE concrete, ` +
            `specific content idea for today's social post, tied to something real: a product feature, a roadmap stage, ` +
            `a lesson from building, or a problem Mashnu solves. Never generic filler like "exciting things ahead." ` +
            `Respond with ONLY compact JSON: {"theme": "2-5 word topic label", "angle": "one sentence, the specific point to make"}.`,
        },
        { role: "user", content: `Day ${dayNumber}. Give me today's content idea.` },
      ],
      { temperature: 0.8, maxTokens: 200 }
    );

    const parsed = parseJsonLoose(raw);
    const theme: ContentTheme = {
      dayNumber,
      theme: typeof parsed?.theme === "string" && parsed.theme.trim() ? parsed.theme.slice(0, 80) : "Building in public",
      angle: typeof parsed?.angle === "string" && parsed.angle.trim() ? parsed.angle.slice(0, 300) : raw.slice(0, 300),
    };

    return { role: "content_strategist", status: "done", output: theme };
  } catch (err) {
    if (err instanceof GroqNotConfiguredError) {
      return {
        role: "content_strategist",
        status: "needs_setup",
        output: null,
        message: "GROQ_API_KEY isn't set — add it to generate real content ideas instead of nothing.",
      };
    }
    return { role: "content_strategist", status: "error", output: null, message: (err as Error).message };
  }
}

// ---------------------------------------------------------------------------
// Role 2: Copy Producer — writes platform-tuned captions for the theme.
// ---------------------------------------------------------------------------

export interface PlatformDrafts {
  dayNumber: number;
  theme: string;
  linkedin: string;
  x: string;
  facebook: string;
  medium: { title: string; content: string };
}

async function runCopyProducer(theme?: ContentTheme): Promise<RoleResult> {
  // Individual "Run" on this card (without a prior Strategist run today)
  // still needs a theme to write against, so generate one inline.
  const resolvedTheme = theme ?? (await runContentStrategist()).output;

  if (!resolvedTheme) {
    return {
      role: "copy_producer",
      status: "needs_setup",
      output: null,
      message: "No content theme available — the content strategist step needs GROQ_API_KEY configured first.",
    };
  }

  try {
    const raw = await callGroq(
      [
        {
          role: "system",
          content:
            `${MASHNU_CONTEXT}\n\nYou write Mashnu's social captions. Given a content theme and angle, write four platform-specific ` +
            `pieces grounded in that exact angle, no generic hype, no fabricated numbers. LinkedIn: founder-update tone, 3-5 sentences. ` +
            `X: under 260 characters, punchy. Facebook: warm, narrative, 3-4 sentences. Medium: a short build-in-public post ` +
            `(a title, and 2-4 short paragraphs of body text) going into a bit more of the real detail than the other platforms. ` +
            `Respond with ONLY compact JSON: {"linkedin": "...", "x": "...", "facebook": "...", "medium": {"title": "...", "content": "..."}}.`,
        },
        { role: "user", content: `Day ${resolvedTheme.dayNumber}. Theme: ${resolvedTheme.theme}. Angle: ${resolvedTheme.angle}` },
      ],
      { temperature: 0.7, maxTokens: 900 }
    );

    const parsed = parseJsonLoose(raw);
    if (!parsed?.linkedin || !parsed?.x || !parsed?.facebook || !parsed?.medium?.title || !parsed?.medium?.content) {
      return {
        role: "copy_producer",
        status: "error",
        output: null,
        message: "Groq's response wasn't valid JSON with linkedin/x/facebook/medium fields — try running this step again.",
      };
    }

    const drafts: PlatformDrafts = {
      dayNumber: resolvedTheme.dayNumber,
      theme: resolvedTheme.theme,
      linkedin: String(parsed.linkedin).slice(0, 3000),
      x: String(parsed.x).slice(0, 280),
      facebook: String(parsed.facebook).slice(0, 3000),
      medium: { title: String(parsed.medium.title).slice(0, 200), content: String(parsed.medium.content).slice(0, 5000) },
    };

    return { role: "copy_producer", status: "needs_approval", output: drafts, message: "Draft ready. Nothing posts until you approve it." };
  } catch (err) {
    if (err instanceof GroqNotConfiguredError) {
      return { role: "copy_producer", status: "needs_setup", output: null, message: "GROQ_API_KEY isn't set." };
    }
    return { role: "copy_producer", status: "error", output: null, message: (err as Error).message };
  }
}

// ---------------------------------------------------------------------------
// Role 3: Publisher — the only role allowed to touch a real platform API.
// Each platform is attempted independently so one missing credential (or one
// platform's outage) never blocks the others.
// ---------------------------------------------------------------------------

export interface PublishAttempt {
  platform: "linkedin" | "x" | "medium";
  status: "posted" | "needs_setup" | "error";
  detail?: string;
  url?: string;
}

async function publishToLinkedIn(drafts: PlatformDrafts): Promise<PublishAttempt> {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!token) {
    return { platform: "linkedin", status: "needs_setup", detail: "LINKEDIN_ACCESS_TOKEN isn't set (LinkedIn Developer App, w_member_social scope)." };
  }

  try {
    const meRes = await fetch("https://api.linkedin.com/v2/userinfo", { headers: { Authorization: `Bearer ${token}` } });
    if (!meRes.ok) throw new Error(`Fetching member id failed (${meRes.status}).`);
    const me = await meRes.json();
    if (!me?.sub) throw new Error("LinkedIn userinfo response had no member id.");

    const postRes = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify({
        author: `urn:li:person:${me.sub}`,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: { text: drafts.linkedin },
            shareMediaCategory: "NONE",
          },
        },
        visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
      }),
    });
    if (!postRes.ok) {
      const errText = await postRes.text().catch(() => "");
      throw new Error(`LinkedIn rejected the post (${postRes.status}): ${errText.slice(0, 200)}`);
    }
    return { platform: "linkedin", status: "posted" };
  } catch (err: any) {
    return { platform: "linkedin", status: "error", detail: err?.message || "Unknown LinkedIn error." };
  }
}

// X (Twitter) posting requires a real user-context token, not an app-only
// bearer token — OAuth 1.0a is the self-serve option (X's developer portal
// generates the access token/secret directly, no hosted redirect callback
// needed), so that's what we sign requests with, using only Node's built-in
// crypto (no oauth library dependency).
function oauth1PercentEncode(str: string): string {
  return encodeURIComponent(str).replace(/[!*'()]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
}

function buildOAuth1Header(method: string, url: string, consumerKey: string, consumerSecret: string, token: string, tokenSecret: string): string {
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: String(Math.floor(Date.now() / 1000)),
    oauth_token: token,
    oauth_version: "1.0",
  };
  // The signature base string covers oauth_* params only here (no query or
  // form params on this request) — correct per OAuth 1.0a for a JSON POST body.
  const paramString = Object.keys(oauthParams)
    .sort()
    .map((k) => `${oauth1PercentEncode(k)}=${oauth1PercentEncode(oauthParams[k])}`)
    .join("&");
  const baseString = [method.toUpperCase(), oauth1PercentEncode(url), oauth1PercentEncode(paramString)].join("&");
  const signingKey = `${oauth1PercentEncode(consumerSecret)}&${oauth1PercentEncode(tokenSecret)}`;
  const signature = createHmac("sha1", signingKey).update(baseString).digest("base64");

  const headerParams = { ...oauthParams, oauth_signature: signature };
  return (
    "OAuth " +
    Object.keys(headerParams)
      .sort()
      .map((k) => `${oauth1PercentEncode(k)}="${oauth1PercentEncode(headerParams[k])}"`)
      .join(", ")
  );
}

async function publishToX(drafts: PlatformDrafts): Promise<PublishAttempt> {
  const consumerKey = process.env.TWITTER_API_KEY;
  const consumerSecret = process.env.TWITTER_API_SECRET;
  const token = process.env.TWITTER_ACCESS_TOKEN;
  const tokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

  if (!consumerKey || !consumerSecret || !token || !tokenSecret) {
    return { platform: "x", status: "needs_setup", detail: "TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, and TWITTER_ACCESS_TOKEN_SECRET must all be set." };
  }

  const url = "https://api.twitter.com/2/tweets";
  try {
    const authHeader = buildOAuth1Header("POST", url, consumerKey, consumerSecret, token, tokenSecret);
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: authHeader, "Content-Type": "application/json" },
      body: JSON.stringify({ text: drafts.x }),
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`X rejected the post (${res.status}): ${errText.slice(0, 200)}`);
    }
    return { platform: "x", status: "posted" };
  } catch (err: any) {
    return { platform: "x", status: "error", detail: err?.message || "Unknown X error." };
  }
}

async function publishToMedium(drafts: PlatformDrafts): Promise<PublishAttempt> {
  const token = process.env.MEDIUM_INTEGRATION_TOKEN;
  if (!token) {
    return { platform: "medium", status: "needs_setup", detail: "MEDIUM_INTEGRATION_TOKEN isn't set (Settings → Security and apps → Integration tokens)." };
  }

  try {
    const meRes = await fetch("https://api.medium.com/v1/me", { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } });
    if (!meRes.ok) throw new Error(`Fetching Medium user id failed (${meRes.status}).`);
    const me = await meRes.json();
    const userId = me?.data?.id;
    if (!userId) throw new Error("Medium /v1/me returned no user id.");

    const postRes = await fetch(`https://api.medium.com/v1/users/${userId}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        title: drafts.medium.title,
        contentFormat: "markdown",
        content: drafts.medium.content,
        publishStatus: "public",
      }),
    });
    if (!postRes.ok) {
      const errText = await postRes.text().catch(() => "");
      throw new Error(`Medium rejected the post (${postRes.status}): ${errText.slice(0, 200)}`);
    }
    const postData = await postRes.json().catch(() => null);
    return { platform: "medium", status: "posted", url: postData?.data?.url };
  } catch (err: any) {
    return { platform: "medium", status: "error", detail: err?.message || "Unknown Medium error." };
  }
}

async function runPublisher(drafts: PlatformDrafts | null | undefined, approved: boolean): Promise<RoleResult> {
  if (!drafts) {
    return { role: "publisher", status: "needs_approval", output: { drafts: null, attempts: [] }, message: "Nothing to publish yet — run the copy producer first." };
  }

  if (!approved) {
    return {
      role: "publisher",
      status: "needs_approval",
      output: { drafts, attempts: [] },
      message: "Waiting for approval. Nothing is posted anywhere until you approve this draft.",
    };
  }

  const attempts = await Promise.all([publishToLinkedIn(drafts), publishToX(drafts), publishToMedium(drafts)]);
  const posted = attempts.filter((a) => a.status === "posted");
  const errored = attempts.filter((a) => a.status === "error");

  // "done" if at least one platform actually posted — a partial success
  // still counts as the run doing real work, not a failure.
  const status: RunStatus = posted.length > 0 ? "done" : errored.length > 0 ? "error" : "needs_setup";
  const summary = attempts.map((a) => `${a.platform}: ${a.status}${a.detail ? ` — ${a.detail}` : ""}`).join(" · ");

  return { role: "publisher", status, output: { drafts, attempts }, message: summary };
}

// ---------------------------------------------------------------------------
// Role 4: Community Rep — would watch inbound comments/DMs. Not wired yet;
// every platform's read API needs its own credential, same as Publisher.
// ---------------------------------------------------------------------------

async function runCommunityRep(): Promise<RoleResult> {
  return {
    role: "community_rep",
    status: "needs_setup",
    output: null,
    message: "Needs each platform's comment/DM read access (Meta Graph API, LinkedIn Community Management API, X API) — not wired yet.",
  };
}

// ---------------------------------------------------------------------------
// Role 5: Growth Analyst — reads real lead data already captured by the
// site's existing forms. The one role that's fully functional today.
// ---------------------------------------------------------------------------

export interface GrowthStats {
  totalLeads: number;
  leadsLast7Days: number;
  bySource: Record<string, number>;
}

async function runGrowthAnalyst(): Promise<RoleResult> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { role: "growth_analyst", status: "needs_setup", output: null, message: "Supabase isn't configured — can't read real lead data." };
  }

  try {
    const { count: totalLeads, error: totalErr } = await supabase.from("leads").select("id", { count: "exact", head: true });
    if (totalErr) throw new Error(totalErr.message);

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { data: recent, error: recentErr } = await supabase.from("leads").select("source, created_at").gte("created_at", sevenDaysAgo);
    if (recentErr) throw new Error(recentErr.message);

    const bySource: Record<string, number> = {};
    for (const row of recent || []) {
      const key = row.source || "unknown";
      bySource[key] = (bySource[key] || 0) + 1;
    }

    const stats: GrowthStats = { totalLeads: totalLeads || 0, leadsLast7Days: (recent || []).length, bySource };
    return { role: "growth_analyst", status: "done", output: stats };
  } catch (err: any) {
    return { role: "growth_analyst", status: "error", output: null, message: err?.message || "Failed to read lead data." };
  }
}

// ---------------------------------------------------------------------------
// Orchestration + persistence
// ---------------------------------------------------------------------------

export async function runRole(
  role: TeamRole,
  opts: { theme?: ContentTheme; drafts?: PlatformDrafts; approve?: boolean } = {}
): Promise<RoleResult> {
  switch (role) {
    case "content_strategist":
      return runContentStrategist();
    case "copy_producer":
      return runCopyProducer(opts.theme);
    case "publisher":
      return runPublisher(opts.drafts, !!opts.approve);
    case "community_rep":
      return runCommunityRep();
    case "growth_analyst":
      return runGrowthAnalyst();
  }
}

// "Run All": walks every role once, in pipeline order. Publisher only
// actually attempts to post if `approve` is true — otherwise it (correctly)
// reports needs_approval, same as clicking it individually would.
export async function runAllRoles(approve = false): Promise<RoleResult[]> {
  const strategist = await runContentStrategist();
  const producer =
    strategist.status === "done"
      ? await runCopyProducer(strategist.output)
      : ({ role: "copy_producer", status: "error", output: null, message: "Skipped — content strategist step didn't complete." } as RoleResult);
  const publisher = await runPublisher(producer.output, approve);
  const community = await runCommunityRep();
  const growth = await runGrowthAnalyst();
  return [strategist, producer, publisher, community, growth];
}

// Best-effort, consistent with every other Supabase write on this site — a
// persistence failure should never mask the actual pipeline result from
// the caller who's waiting on it.
export async function saveRoleResult(runGroupId: string, result: RoleResult, input?: any): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  try {
    const { error } = await supabase.from("team_runs").insert({
      run_group_id: runGroupId,
      role: result.role,
      status: result.status,
      input: input ?? null,
      output: result.output ?? null,
      message: result.message ?? null,
    });
    if (error) console.error("[Team] Failed to save run result to Supabase:", error.message);
  } catch (err: any) {
    console.error("[Team] Unexpected error saving run result:", err?.message);
  }
}

export async function getRecentRuns(limit = 40): Promise<any[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data, error } = await supabase.from("team_runs").select("*").order("created_at", { ascending: false }).limit(limit);
  if (error) {
    console.error("[Team] Failed to fetch run history:", error.message);
    return [];
  }
  return data || [];
}

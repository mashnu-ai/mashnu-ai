// Simple in-memory, per-IP sliding-window rate limiter, shared between the
// local Express dev server (server.ts) and the Vercel serverless functions
// (api/*.ts). Protects endpoints that cost real money per call (Resend
// emails, Groq chat completions) from being hammered by a script.
//
// This is per-instance, not global: on Vercel, a cold start or a request
// routed to a different instance gets a fresh counter. That's a known,
// accepted tradeoff for a marketing site, not a high-value target, an
// in-memory limiter stops casual/scripted abuse within a warm instance
// without adding a database round-trip to every request.

interface Bucket {
  count: number;
  windowStart: number;
}

const buckets = new Map<string, Bucket>();

// Periodically drop old buckets so this map doesn't grow unbounded on a
// long-lived process (the local dev/prod Express server).
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupIfDue(maxWindowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, bucket] of buckets) {
    if (now - bucket.windowStart > maxWindowMs) buckets.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

// Checks and increments the counter for `key` (typically `${routeName}:${ip}`)
// in one call. Returns whether this request is allowed under `limit`
// requests per `windowMs`.
export function checkRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  cleanupIfDue(windowMs);

  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStart >= windowMs) {
    buckets.set(key, { count: 1, windowStart: now });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= limit) {
    const retryAfterSeconds = Math.ceil((bucket.windowStart + windowMs - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

// Best-effort client IP extraction, consistent with how src/server/geo.ts
// reads the caller's address behind Vercel/proxy forwarding.
export function getClientIp(headers: Record<string, string | string[] | undefined>, fallback?: string): string {
  const forwardedFor = headers["x-forwarded-for"];
  const ip = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor?.split(",")[0]?.trim();
  return ip || fallback || "unknown";
}

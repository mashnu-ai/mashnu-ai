import { createClient, SupabaseClient } from "@supabase/supabase-js";
import WebSocket from "ws";

let client: SupabaseClient | null | undefined;

// Server-only admin client (uses the secret/service-role key, bypasses RLS).
// Never import this from client-side code. Returns null if Supabase isn't
// configured (or fails to initialize), so callers can no-op instead of
// crashing — persistence is always best-effort, never load-bearing.
export function getSupabaseAdmin(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    console.warn("[Supabase] SUPABASE_URL or SUPABASE_SECRET_KEY not set — database writes will be skipped.");
    client = null;
    return client;
  }

  try {
    client = createClient(url, secretKey, {
      auth: { persistSession: false },
      // supabase-js always constructs a realtime client, which needs a
      // WebSocket implementation. Node < 22 has no native global
      // WebSocket, so supply the `ws` package explicitly.
      realtime: { transport: WebSocket as any },
    });
  } catch (err: any) {
    console.error("[Supabase] Failed to initialize client — database writes will be skipped:", err?.message);
    client = null;
  }

  return client;
}

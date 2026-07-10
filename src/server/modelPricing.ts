// Live AI model pricing, fetched directly from Groq's own /models API — the
// same provider Mashnu's assistant (Pari) runs on. This backs the "raw
// compute, no markup" claim on the Pricing page with real, current numbers
// instead of a static claim. Best-effort with a stale-but-labeled fallback:
// if Groq is unreachable, we serve the last known good price with its real
// fetch date rather than inventing one.

const GROQ_MODEL = "llama-3.3-70b-versatile";

export interface ModelPricing {
  modelId: string;
  modelName: string;
  contextWindow: number;
  inputPricePerMillion: number;
  outputPricePerMillion: number;
  currency: "USD";
  asOf: string; // ISO timestamp of when this price was fetched from Groq
  live: boolean; // false if this is the cached fallback served after a fetch failure
}

let cache: { data: ModelPricing; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

// Last-known-good numbers (Groq's published rate as of this writing), used only
// if the live fetch fails on a cold start with no prior successful cache.
const FALLBACK: ModelPricing = {
  modelId: GROQ_MODEL,
  modelName: "Llama 3.3 70B",
  contextWindow: 131072,
  inputPricePerMillion: 0.59,
  outputPricePerMillion: 0.79,
  currency: "USD",
  asOf: "2026-07-10T00:00:00.000Z",
  live: false,
};

export async function getModelPricing(): Promise<ModelPricing> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.data;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return cache?.data || FALLBACK;
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/models", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!response.ok) throw new Error(`Groq models API returned ${response.status}`);

    const data = await response.json();
    const model = data?.data?.find((m: any) => m.id === GROQ_MODEL);
    if (!model?.pricing) throw new Error(`Model ${GROQ_MODEL} not found in Groq response`);

    const result: ModelPricing = {
      modelId: model.id,
      modelName: model.name || model.id,
      contextWindow: model.context_window || model.context_length || 0,
      inputPricePerMillion: Math.round(Number(model.pricing.prompt) * 1_000_000 * 100) / 100,
      outputPricePerMillion: Math.round(Number(model.pricing.completion) * 1_000_000 * 100) / 100,
      currency: "USD",
      asOf: new Date().toISOString(),
      live: true,
    };

    cache = { data: result, fetchedAt: Date.now() };
    return result;
  } catch (err) {
    console.error("[ModelPricing] Failed to fetch live Groq pricing:", (err as Error)?.message);
    return cache?.data || FALLBACK;
  }
}

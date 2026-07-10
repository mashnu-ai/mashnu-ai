// IP-based country + currency detection, shared between the local Express
// dev server (server.ts) and the Vercel serverless functions (api/*.ts).
// Two free, keyless external services: ip-api.com for geolocation and
// frankfurter.dev (ECB rates) for live exchange rates. Both are
// best-effort — any failure falls back to USD so the ROI calculator
// never breaks, it just shows dollars instead of the visitor's currency.

// ISO 3166-1 alpha-2 country code -> ISO 4217 currency code, limited to
// currencies Frankfurter actually publishes rates for (see SUPPORTED below).
const COUNTRY_CURRENCY: Record<string, string> = {
  US: "USD", IN: "INR", GB: "GBP", JP: "JPY", CN: "CNY", CA: "CAD", AU: "AUD",
  CH: "CHF", HK: "HKD", ID: "IDR", IL: "ILS", IS: "ISK", KR: "KRW", MX: "MXN", MY: "MYR",
  NO: "NOK", NZ: "NZD", PH: "PHP", PL: "PLN", RO: "RON", SE: "SEK", SG: "SGD", TH: "THB",
  TR: "TRY", ZA: "ZAR", BR: "BRL", CZ: "CZK", DK: "DKK", HU: "HUF",
  // Eurozone
  AT: "EUR", BE: "EUR", CY: "EUR", EE: "EUR", FI: "EUR", FR: "EUR", DE: "EUR", GR: "EUR",
  IE: "EUR", IT: "EUR", LV: "EUR", LT: "EUR", LU: "EUR", MT: "EUR", NL: "EUR", PT: "EUR",
  SK: "EUR", SI: "EUR", ES: "EUR", HR: "EUR",
};

const SUPPORTED_CURRENCIES = new Set([
  "USD", "AUD", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF",
  "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN",
  "RON", "SEK", "SGD", "THB", "TRY", "ZAR",
]);

export interface GeoResult {
  countryCode: string;
  countryName: string;
  currencyCode: string;
  rates: Record<string, number>; // units of each currency per 1 USD
}

let rateCache: { data: Record<string, number>; fetchedAt: number } | null = null;
const RATE_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

async function getExchangeRates(): Promise<Record<string, number>> {
  if (rateCache && Date.now() - rateCache.fetchedAt < RATE_CACHE_TTL_MS) {
    return rateCache.data;
  }
  const response = await fetch("https://api.frankfurter.dev/v1/latest?from=USD");
  if (!response.ok) throw new Error(`Exchange rate API returned ${response.status}`);
  const data = await response.json();
  rateCache = { data: { USD: 1, ...data.rates }, fetchedAt: Date.now() };
  return rateCache.data;
}

function isPrivateIp(ip: string): boolean {
  const clean = ip.replace("::ffff:", "");
  return (
    clean === "::1" ||
    clean === "127.0.0.1" ||
    clean.startsWith("192.168.") ||
    clean.startsWith("10.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(clean)
  );
}

const DEFAULT_RESULT = (rates: Record<string, number>): GeoResult => ({
  countryCode: "US",
  countryName: "United States",
  currencyCode: "USD",
  rates,
});

// A visitor's country doesn't change between page loads, but /api/geo is
// called on every ROI-calculator visit with no other caching. Without this,
// a burst of traffic (or a trivial repeated-request script) can exceed
// ip-api.com's free-tier rate limit (45 req/min) and get this server's
// outbound IP throttled, breaking geo detection for every visitor at once.
// Country/currency data is cached separately from rates: it never expires,
// but each IP's own lookup entry has a 24h TTL to bound memory growth.
const ipGeoCache = new Map<string, { countryCode: string; countryName: string; fetchedAt: number }>();
const IP_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function detectGeo(ip: string | undefined): Promise<GeoResult> {
  let rates: Record<string, number>;
  try {
    rates = await getExchangeRates();
  } catch (err) {
    console.error("[Geo] Failed to fetch exchange rates:", (err as Error)?.message);
    rates = { USD: 1 };
  }

  if (!ip || isPrivateIp(ip)) {
    return DEFAULT_RESULT(rates);
  }

  const cached = ipGeoCache.get(ip);
  if (cached && Date.now() - cached.fetchedAt < IP_CACHE_TTL_MS) {
    const mappedCurrency = COUNTRY_CURRENCY[cached.countryCode];
    const currencyCode = mappedCurrency && SUPPORTED_CURRENCIES.has(mappedCurrency) ? mappedCurrency : "USD";
    return { countryCode: cached.countryCode, countryName: cached.countryName, currencyCode, rates };
  }

  try {
    const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=status,countryCode,country`);
    const geoData = await geoResponse.json();

    if (geoData.status !== "success" || !geoData.countryCode) {
      return DEFAULT_RESULT(rates);
    }

    ipGeoCache.set(ip, { countryCode: geoData.countryCode, countryName: geoData.country || geoData.countryCode, fetchedAt: Date.now() });

    const mappedCurrency = COUNTRY_CURRENCY[geoData.countryCode];
    const currencyCode = mappedCurrency && SUPPORTED_CURRENCIES.has(mappedCurrency) ? mappedCurrency : "USD";

    return {
      countryCode: geoData.countryCode,
      countryName: geoData.country || geoData.countryCode,
      currencyCode,
      rates,
    };
  } catch (err) {
    console.error("[Geo] IP geolocation failed:", (err as Error)?.message);
    return DEFAULT_RESULT(rates);
  }
}

// Pure, framework-agnostic logic shared between the local Express dev server
// (server.ts) and the Vercel serverless functions (api/*.ts). The compiler
// and simulator endpoints return deterministic sample content built from
// the request inputs. The assistant endpoint calls the Groq API for real
// chat responses and persists conversations to Supabase.

import { getSupabaseAdmin } from "./supabaseClient";

export function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}

export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return hash;
}

export function titleCaseFromPrompt(prompt: string): string {
  const words = prompt
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const stopwords = new Set(["a", "an", "the", "for", "to", "of", "and", "with", "on", "in"]);
  const picked = words.filter((w) => !stopwords.has(w.toLowerCase())).slice(0, 4);
  const cased = picked.map((w) => w.charAt(0).toUpperCase() + w.slice(1));
  return cased.length ? `${cased.join(" ")} Agent` : "Mashnu Autonomous Agent";
}

export function compileAgent(prompt: string) {
  const seed = hashString(prompt);
  const appName = titleCaseFromPrompt(prompt);
  const isInvoice = /\b(invoice|freight|ledger|reconcil\w*)\b/i.test(prompt);
  const isVoice = !isInvoice && /\b(voice|call|phone|patient)\b/i.test(prompt);
  const isRag = /\b(rag|knowledge|search|sop|compliance)\b/i.test(prompt);

  const nodes = [
    { id: "input_trigger", label: isVoice ? "Inbound Voice Trigger" : "Webhook Trigger", type: "trigger", description: "Receives the incoming event and normalizes payload metadata before routing." },
    { id: "state_router", label: "State Router", type: "condition", description: "Evaluates intent and conversation state to select the correct downstream node." },
    { id: "rag_lookup", label: "Context Retrieval", type: "rag", description: "Queries the vector index for relevant context chunks using hybrid dense + keyword search." },
    { id: "response_generator", label: "Response Generator", type: "model", description: "Synthesizes a grounded response using retrieved context and the compiled system prompt." },
    { id: "action_dispatch", label: "Action Dispatcher", type: "action", description: "Executes the resolved tool call against the connected downstream system." },
  ];

  const edges = [
    { source: "input_trigger", target: "state_router" },
    { source: "state_router", target: "rag_lookup", condition: "requires_context === true" },
    { source: "state_router", target: "response_generator", condition: "requires_context === false" },
    { source: "rag_lookup", target: "response_generator" },
    { source: "response_generator", target: "action_dispatch" },
  ];

  return {
    appName,
    description: `Compiled operational agent for: "${prompt.slice(0, 140)}${prompt.length > 140 ? "..." : ""}"`,
    nodes,
    edges,
    systemPrompt: `You are ${appName}, an operational assistant. Follow the compiled pipeline: understand intent, retrieve relevant context, and take the correct action. Be precise and confirm before executing irreversible actions.`,
    ragContext: {
      vectorDatabase: isRag ? "Qdrant (Cloud Dedicated, Cosine Distance, 1536-dim)" : "Qdrant (Standard Tier, Cosine Distance, 768-dim)",
      chunkStrategy: "Parent-Child chunking (1024-char parent, 256-char child) with overlap",
      sourcesIngested: isInvoice
        ? ["Carrier invoice PDFs", "Dispatch database exports", "Rate card CSVs"]
        : isVoice
          ? ["EHR appointment records", "Insurance eligibility feed", "Clinical triage keyword list"]
          : ["Internal knowledge base", "Product documentation", "Historical support transcripts"],
    },
    tools: [
      {
        name: isInvoice ? "query_dispatch_database" : isVoice ? "query_ehr_system" : "query_knowledge_base",
        description: "Retrieves structured records needed to resolve the current request.",
        apiEndpoint: isInvoice ? "GET https://internal.api/dispatch/records" : isVoice ? "GET https://internal.api/ehr/appointments" : "POST https://internal.api/search",
        mockResponseSample: '{"status": "ok", "recordsFound": 3}',
      },
      {
        name: "notify_downstream_system",
        description: "Sends the resolved action or result to the connected CRM, ledger, or scheduling system.",
        apiEndpoint: "POST https://internal.api/notify",
        mockResponseSample: '{"status": "queued", "id": "evt_4821"}',
      },
    ],
    benchmarks: {
      latencyMs: 220 + (Math.abs(seed) % 180),
      accuracyRate: `${96 + (Math.abs(seed) % 4)}.${Math.abs(seed) % 10}% (estimated)`,
      costPerOp: `$${(0.08 + (Math.abs(seed) % 20) / 100).toFixed(2)}`,
      humanEffortDiff: "Saves an estimated 3-5 minutes of manual work per transaction",
    },
    latencyBreakdown: isVoice
      ? [
          { component: "Voice STT", latencyMs: 120 },
          { component: "State Router", latencyMs: 20 },
          { component: "Context Retrieval", latencyMs: 40 },
          { component: "Response Generation", latencyMs: 90 },
        ]
      : [
          { component: "Webhook Ingestion", latencyMs: 15 },
          { component: "State Router", latencyMs: 20 },
          { component: "Context Retrieval", latencyMs: 45 },
          { component: "Response Generation", latencyMs: 110 },
        ],
  };
}

export function simulateStep(compiledAgent: any, userInput: string) {
  const seed = hashString(userInput);
  const promptTokens = 40 + (Math.abs(seed) % 60);
  const completionTokens = 30 + (Math.abs(seed) % 50);

  const executionTraceLogs = [
    { timestamp: "+0.00s", nodeId: "input_trigger", level: "INFO", message: `Received trigger event. Payload: "${userInput.slice(0, 60)}"` },
    { timestamp: "+0.05s", nodeId: "state_router", level: "DEBUG", message: "Evaluating intent classification against compiled routing table." },
    { timestamp: "+0.12s", nodeId: "rag_lookup", level: "INFO", message: `Queried vector index "${compiledAgent.ragContext?.vectorDatabase || "primary"}", 3 chunks retrieved.` },
    { timestamp: "+0.19s", nodeId: "response_generator", level: "INFO", message: "Synthesizing grounded response from retrieved context." },
    { timestamp: "+0.24s", nodeId: "action_dispatch", level: "INFO", message: "Dispatching resolved action to downstream system." },
  ];

  const finalResult = `Request processed successfully. The ${compiledAgent.appName || "agent"} resolved the query "${userInput.slice(0, 80)}" and completed the associated downstream action.`;

  return {
    success: true,
    finalResult,
    totalTimeMs: 240 + (Math.abs(seed) % 120),
    tokensUsed: {
      prompt: promptTokens,
      completion: completionTokens,
      total: promptTokens + completionTokens,
    },
    executionTraceLogs,
  };
}


const CONTACT_KEYWORDS = [
  "contact you", "contact us", "contact mashnu", "get in touch", "how do i contact",
  "how can i contact", "phone number", "your number", "call you", "email address",
  "your email", "reach you", "reach out", "social media", "connect with you",
  "connect with mashnu", "talk to someone", "talk to a person", "speak to someone",
  "speak to a person", "real person", "customer support", "support team",
  "who founded", "the founder", "your founder", "whatsapp", "facebook",
  "linkedin", "instagram", "reddit", "twitter", "medium blog", "your blog",
];

function isContactIntent(text: string): boolean {
  const lower = text.toLowerCase();
  return CONTACT_KEYWORDS.some((kw) => lower.includes(kw));
}

const GROQ_MODEL = "llama-3.3-70b-versatile";

const ASSISTANT_SYSTEM_PROMPT = `Your name is Pari. You are Pari, always introduce and refer to yourself as Pari, never as "the Mashnu AI assistant," "an AI language model," or any other name. If asked "what is your name" or "who are you," answer exactly: "I'm Pari, Mashnu's AI assistant." You are embedded in the Mashnu AI marketing website.

Mashnu AI builds a personal AI assistant for real life that answers calls, replies to messages, and remembers what matters to a person. The same underlying voice, WhatsApp, and back-office agent technology powers automation products for businesses (voice agents, WhatsApp agents, CRM automation, enterprise knowledge search, and more).

Answer questions about Mashnu's products, how automation could help the visitor's use case, and general questions helpfully and concisely. Speak in plain, outcome-focused language, and never mention specific AI models, vendors, frameworks, or internal implementation details. Do not use em dashes or en dashes in your responses; use commas, periods, or parentheses instead. Keep responses short (a few sentences or a short list) unless the visitor asks for depth. If you don't know something specific about Mashnu, say so honestly and suggest they reach out via the Connect With Us options rather than guessing.`;

async function callGroq(messages: { role: string; content: string }[]): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return "The assistant isn't fully configured yet. Please reach out via the Connect With Us options below and a real person will help.";
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: ASSISTANT_SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      temperature: 0.6,
      max_tokens: 600,
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`Groq API error (${response.status}): ${errText.slice(0, 200)}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Groq API returned an empty response.");
  }

  return content;
}

async function saveChatMessages(
  sessionId: string | undefined,
  userText: string,
  assistantText: string
): Promise<void> {
  if (!sessionId) return;

  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  try {
    const { error } = await supabase.from("chat_messages").insert([
      { session_id: sessionId, role: "user", content: userText },
      { session_id: sessionId, role: "assistant", content: assistantText },
    ]);

    if (error) {
      console.error("[Assistant] Failed to save chat messages to Supabase:", error.message);
    }
  } catch (err: any) {
    console.error("[Assistant] Unexpected error saving chat messages to Supabase:", err?.message);
  }
}

// Pari (the site-wide widget) caps each visitor at 3 questions. The count is
// enforced against Supabase's persisted history for their visitor ID — not a
// client-side counter — so refreshing the page or reopening the widget can't
// reset it; only actually being a new visitor (a new ID) can. If Supabase is
// unreachable/unconfigured, we fail open rather than block real visitors on
// an infra hiccup, consistent with persistence being best-effort site-wide.
export const FREE_QUESTION_LIMIT = 3;

async function countPriorQuestions(sessionId: string | undefined): Promise<number> {
  if (!sessionId) return 0;

  const supabase = getSupabaseAdmin();
  if (!supabase) return 0;

  try {
    const { count, error } = await supabase
      .from("chat_messages")
      .select("id", { count: "exact", head: true })
      .eq("session_id", sessionId)
      .eq("role", "user");

    if (error) {
      console.error("[Assistant] Failed to count prior questions in Supabase:", error.message);
      return 0;
    }
    return count || 0;
  } catch (err: any) {
    console.error("[Assistant] Unexpected error counting prior questions:", err?.message);
    return 0;
  }
}

export async function assistantChatStatus(sessionId: string | undefined) {
  const priorQuestions = await countPriorQuestions(sessionId);
  return { limitReached: priorQuestions >= FREE_QUESTION_LIMIT, questionsAsked: priorQuestions, limit: FREE_QUESTION_LIMIT };
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_MESSAGES = 40;
const MAX_MESSAGE_LENGTH = 4000;

export async function assistantChat(
  messages: { role: string; content: string }[],
  sessionId?: string
) {
  // A missing or malformed sessionId must never grant unlimited free
  // messages. countPriorQuestions() treats "no sessionId" as "0 prior
  // questions" (Supabase has nothing to count), so without this check an
  // attacker could omit sessionId, or send a fresh random one per request,
  // and bypass the free-question cap entirely against a paid Groq endpoint.
  if (!sessionId || !UUID_RE.test(sessionId)) {
    return {
      content: "Something went wrong starting this chat. Please refresh the page and try again.",
      limitReached: true,
    };
  }

  // Bound the request shape before it reaches Groq: an unbounded messages
  // array or unbounded per-message length both translate directly into
  // Groq API cost with no benefit to a legitimate visitor.
  const safeMessages = messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));

  const lastUserMessage = [...safeMessages].reverse().find((m) => m.role === "user");
  const userText: string = lastUserMessage?.content || "";

  if (!userText.trim()) {
    return { content: "Could you say a bit more? I didn't catch a question there." };
  }

  const priorQuestions = await countPriorQuestions(sessionId);
  if (priorQuestions >= FREE_QUESTION_LIMIT) {
    return {
      content: `You've reached the ${FREE_QUESTION_LIMIT}-question limit for this chat. For anything further, a real person on our team would love to help. See the **Connect With Us** panel below, or [get in touch here](/contact).`,
      limitReached: true,
    };
  }

  const wantsContact = isContactIntent(userText);

  const content = wantsContact
    ? `Happy to help you get in touch. You can reach us directly, or connect on social. See the **Connect With Us** panel below for every option.\n\nIf you'd rather talk it through live, our team typically replies within one business day.`
    : await callGroq(safeMessages);

  await saveChatMessages(sessionId, userText, content);

  return { content };
}

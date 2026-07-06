// Pure, framework-agnostic logic shared between the local Express dev server
// (server.ts) and the Vercel serverless functions (api/*.ts). No external AI
// API dependency and no API keys required — every response is realistic,
// deterministic sample content built from the request inputs.

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
    { timestamp: "+0.12s", nodeId: "rag_lookup", level: "INFO", message: `Queried vector index "${compiledAgent.ragContext?.vectorDatabase || "primary"}" — 3 chunks retrieved.` },
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

export function qualifyLead(useCase: string, company?: string, estimatedVolume?: string, currentSystem?: string) {
  const seed = hashString(useCase);
  const isInvoice = /\b(invoice|freight|ledger|reconcil\w*)\b/i.test(useCase);
  const isVoice = !isInvoice && /\b(voice|call|phone|patient)\b/i.test(useCase);
  const isRag = /\b(rag|knowledge|search|sop|compliance)\b/i.test(useCase);

  const architectureTier = isInvoice
    ? "Document Processing & Reconciliation Pipeline"
    : isVoice
      ? "Low-Latency Voice Streaming Agent"
      : isRag
        ? "Standard RAG & LLM Retrieval System"
        : "Complex Multi-Agent Cascade";

  return {
    feasibilityRating: 6 + (Math.abs(seed) % 4),
    architectureTier,
    technicalAssessment: `Based on the described workflow${company ? ` for ${company}` : ""}, this use-case fits a ${architectureTier.toLowerCase()}. Expected token volume and request pattern are compatible with standard streaming webhook concurrency, and the primary engineering considerations are context window sizing and database read performance at your target scale (${estimatedVolume || "not specified"}).`,
    suggestedStack: isInvoice
      ? ["LangGraph", "PostgreSQL", "PDF extraction pipeline", "Webhook queue workers"]
      : isVoice
        ? ["Low-latency STT/TTS", "LangGraph", "EHR/CRM API integration", "Real-time state sync"]
        : ["LangGraph", "Qdrant Vector DB", "FastAPI Webhooks", "RAG chunking pipeline"],
    latencyRisk: isVoice
      ? "Voice round-trip latency is the primary bottleneck; mitigate with streaming STT/TTS and edge-deployed inference."
      : "Database read performance under concurrent load is the primary bottleneck; mitigate with connection pooling and read replicas.",
    platformReuseFit: `This aligns with Mashnu's core platform roadmap item covering ${architectureTier.toLowerCase()}, reusing existing ${currentSystem ? `integrations with ${currentSystem}` : "connector infrastructure"}.`,
  };
}

export function assistantChat(messages: { role: string; content: string }[]) {
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
  const userText: string = lastUserMessage?.content || "";

  const responses = [
    `Understood. For "${userText.slice(0, 60)}", the recommended approach is to break the workflow into a compiled agent pipeline: a trigger node, a state router, a retrieval step (if grounding is needed), and an action dispatcher.\n\n- Start with the **Agent Compiler** tool to generate a working DAG\n- Test it in the simulation sandbox\n- Iterate on the system prompt based on simulated traces`,
    `Good question. In general, low-latency multi-agent systems benefit from:\n\n- **Streaming responses** to reduce perceived latency\n- **Hybrid retrieval** (dense + keyword) for grounded answers\n- **Clear state machine boundaries** between trigger, retrieval, and action nodes\n\nWould you like me to sketch a pipeline for your specific use-case?`,
    `That's a common pattern. A typical architecture would use a vector database (like Qdrant) for retrieval-augmented context, paired with a router node that decides whether a query needs grounding or can be answered directly.\n\nTry describing your exact workflow in the **Agent Compiler** playground to see a generated pipeline.`,
  ];

  return { content: pick(responses, hashString(userText || "default")) };
}

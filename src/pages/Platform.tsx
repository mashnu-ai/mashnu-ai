import React, { useState } from 'react';
import { Link } from '../components/Router';
import { 
  Cpu, Database, Network, Shield, BarChart3, Terminal, Check, 
  ArrowRight, Code, Zap, RefreshCw, Key, Layers, Server, 
  Workflow, ArrowUpRight, Lock, CheckCircle2
} from 'lucide-react';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';

interface DetailedProduct {
  id: string;
  title: string;
  phase: 'Live' | 'Building' | 'Platform Layer';
  status: string;
  whatItDoes: string;
  whoItsFor: string;
  technicalDifferentiator: string;
  description: string;
  specs: string[];
  codeTitle: string;
  codeSnippet: string;
  ctaText: string;
  icon: React.ReactNode;
  bgGradient: string;
}

const DEEP_DIVE_PRODUCTS: DetailedProduct[] = [
  {
    id: 'enterprise-rag',
    title: "Enterprise RAG Architectures",
    phase: "Building",
    status: "Beta Testing",
    whatItDoes: "Powers semantic enterprise search over large collections of internal documents (e.g. clinical records, manuals, policy folders, and SOPs), returning highly accurate, cited answers in real time.",
    whoItsFor: "Compliance officers, product support specialists, internal training coordinators, and medical/financial administration executives.",
    technicalDifferentiator: "Employs an advanced hybrid dense-sparse vector and keyword retrieval mechanism structured with parent-child recursive tree mapping, bypassing unstructured naive paragraph splittings.",
    description: "Our retrieval architecture features dual-index search synchronization. First, a dense embedding query retrieves localized context from Qdrant, filtered by active active-directory authorization flags. Simultaneously, a sparse BM25 query extracts keyword match scores. The result is combined via a Reciprocal Rank Fusion (RRF) algorithm to ensure zero hallucination thresholds.",
    specs: [
      "Chunk-graph parent-child relationship tracking",
      "Dense vector (Qdrant) + BM25 keyword hybrid searching",
      "Granular document permission scoping for enterprise directories",
      "Average retrieval latency < 180ms"
    ],
    codeTitle: "Parent-Child Extraction Pipeline",
    codeSnippet: `class ParentChildRAGPipeline:
    def __init__(self, qdrant_client, embed_model):
        self.qdrant = qdrant_client
        self.embedder = embed_model

    def retrieve_with_permissions(self, query: str, tenant_id: str, user_role: str):
        query_vector = self.embedder.embed(query)
        # Apply precise active-directory role filters at search time
        results = self.qdrant.search(
            collection_name=f"tenant_{tenant_id}",
            query_vector=query_vector,
            query_filter=Filter(
                must=[FieldCondition(key="allowed_roles", match=Value(user_role))]
            ),
            limit=5
        )
        return self._reconstruct_parent_context(results)`,
    ctaText: "Book Enterprise RAG Demo",
    icon: <Database className="w-5 h-5 text-purple-400" />,
    bgGradient: "from-purple-500/10 to-indigo-500/5"
  },
  {
    id: 'multi-agent-systems',
    title: "Multi-Agent Systems",
    phase: "Building",
    status: "Active R&D",
    whatItDoes: "Integrates complex multi-step corporate operations (e.g. processing a freight order, matching invoices, and executing ledger entries) into coordinated agent teams.",
    whoItsFor: "Supply chain managers, financial ledger auditors, and enterprise resource planning (ERP) system integrators.",
    technicalDifferentiator: "Orchestrated using stateful, multi-agent LangGraph architectures that guarantee transaction consistency rather than linear, brittle if-else script routines.",
    description: "Instead of monolithic agents trying to handle all domains, we deploy specialized nodes for each business function. An orchestration manager coordinates state handoffs. If an agent node fails to confirm a billing entry, the system triggers custom compensation actions (e.g. rolling back warehouse inventory reservations) in absolute synchronization.",
    specs: [
      "Built atop custom state-consistent LangGraph DAGs",
      "Parallel task execution with state verification checks",
      "Deterministic manual human-in-the-loop approvals",
      "Auto-rollback state managers for distributed operations"
    ],
    codeTitle: "LangGraph State Router Configuration",
    codeSnippet: `from langgraph.graph import StateGraph, END

def route_next_action(state: EnterpriseState):
    if state.needs_validation:
        return "compliance_auditor"
    if state.balance_matched:
        return "ledger_dispatcher"
    return "human_approval_checkpoint"

builder = StateGraph(EnterpriseState)
builder.add_node("compliance_auditor", verify_regulatory_hash)
builder.add_node("ledger_dispatcher", commit_transaction_block)
builder.add_conditional_edges("triage_node", route_next_action)`,
    ctaText: "Book Multi-Agent Demo",
    icon: <Network className="w-5 h-5 text-pink-400" />,
    bgGradient: "from-pink-500/10 to-rose-500/5"
  },
  {
    id: 'productized-saas',
    title: "Productized SaaS Platform",
    phase: "Platform Layer",
    status: "Active R&D",
    whatItDoes: "A centralized cloud dashboard that allows corporate IT personnel to instantly configure, hot-swap, inspect, and scale customized AI agents.",
    whoItsFor: "Chief Information Officers (CIOs), network engineers, enterprise system administrators, and DevOps teams.",
    technicalDifferentiator: "Deploys directly into serverless container structures with integrated open-telemetry path tracing for millisecond-level troubleshooting.",
    description: "The Mashnu SaaS dashboard provides enterprise-wide visibility. Corporate IT teams can view real-time latency graphs, inspect cost logs per department, update baseline system prompts without re-deploying, and switch underlying LLM models in a single click with no active system downtime.",
    specs: [
      "Instant API route creation for custom agents",
      "Visual canvas-based graph editing UI",
      "Comprehensive telemetry dashboards & latency tracking",
      "Granular departmental spend caps and billing controls"
    ],
    codeTitle: "Dynamic Routing Middleware",
    codeSnippet: `// Serverless Edge Router for Multi-Tenant Hot-Swapping
export async function handleAgentDispatch(request: Request) {
  const tenantConfig = await fetchTenantRegistry(request.headers.get("X-Tenant-ID"));
  
  // Hot-swap weights / routes instantly without re-deploying containers
  const gatewayURL = tenantConfig.active_inference_edge_url;
  const latencyTraceId = crypto.randomUUID();
  
  return fetch(gatewayURL, {
    method: "POST",
    headers: { ...request.headers, "X-Trace-ID": latencyTraceId },
    body: request.body
  });
}`,
    ctaText: "Book Platform Demo",
    icon: <Layers className="w-5 h-5 text-blue-400" />,
    bgGradient: "from-blue-500/10 to-cyan-500/5"
  },
  {
    id: 'low-latency-infra',
    title: "Low-Latency AI Infrastructure",
    phase: "Platform Layer",
    status: "Scheduled",
    whatItDoes: "Executes deep neural net processing and inference tasks closer to the user, maximizing UI responsiveness and reducing database wait cycles.",
    whoItsFor: "Real-time gaming companies, global booking providers, high-volume digital portals, and critical medical triage centers.",
    technicalDifferentiator: "Runs open-weight model instances inside optimized WASM-compiled edge containers with an active distributed cache protocol.",
    description: "Standard model APIs introduce significant queuing and cold-start overheads. Mashnu is engineering a distributed edge execution layer. By running lightweight open-weight models (e.g. Llama 3 8B, Mistral 7B) compiled into WebAssembly (WASM) directly on edge nodes, we reduce network distance to the absolute bare minimum.",
    specs: [
      "Edge deployment via Cloudflare Workers and serverless WASM",
      "Custom model weight cache layers for fast cold-starts",
      "Distributed agent queuing architecture",
      "Inference processing overhead under 15ms"
    ],
    codeTitle: "WASM Edge Model Ingestion Config",
    codeSnippet: `// Initialize WASM-compiled model weights inside isolated Edge Sandbox
import { WebAssemblyModelInstance } from "mashnu-edge-inference";

const modelCacheConfig = {
  max_stale_ms: 180000,
  preloaded_weights: ["llama3-8b-instruct-q4_k_m"]
};

export async function processEdgeInference(prompt: string) {
  const model = await WebAssemblyModelInstance.loadCached(modelCacheConfig);
  const stream = await model.generateStream(prompt, { temperature: 0.1 });
  return new Response(stream);
}`,
    ctaText: "Book Low-Latency Infra Demo",
    icon: <Cpu className="w-5 h-5 text-violet-400" />,
    bgGradient: "from-violet-500/10 to-purple-500/5"
  },
  {
    id: 'llm-fine-tuning',
    title: "Custom LLM Fine-Tuning Platform",
    phase: "Platform Layer",
    status: "Scheduled",
    whatItDoes: "Builds proprietary model intelligence by fine-tuning open-source foundations (e.g. Llama 3) on secure enterprise datasets.",
    whoItsFor: "Information security executives, model researchers, specialized regulatory compliance teams, and clinical auditors.",
    technicalDifferentiator: "Integrates QLoRA parameter-efficient training directly with automated evaluations, deployed inside fully isolated, air-gapped enterprise clouds.",
    description: "General-purpose models lack specialized vocabulary and specific regulatory awareness. Our platform automates the fine-tuning process. We load base weights, perform Low-Rank Adaptation (LoRA) on your proprietary interaction transcripts, run comprehensive diagnostic benchmarks, and compile the final customized adapter blocks in a fully secure Sandbox.",
    specs: [
      "Parameter-Efficient Fine-Tuning (PEFT/LoRA) adapters",
      "Evaluation benchmarking against standard commercial models",
      "100% air-gapped private inference deployments",
      "Automated diagnostic safety evaluations"
    ],
    codeTitle: "QLoRA Parameter Adaption Training Hook",
    codeSnippet: `from peft import LoraConfig, get_peft_model
from transformers import AutoModelForCausalLM

def build_custom_finetuning_session(base_model_path: str):
    base_model = AutoModelForCausalLM.from_pretrained(
        base_model_path, 
        load_in_4bit=True, 
        device_map="auto"
    )
    peft_config = LoraConfig(
        r=16,
        lora_alpha=32,
        target_modules=["q_proj", "v_proj"],
        lora_dropout=0.05,
        bias="none",
        task_type="CAUSAL_LM"
    )
    return get_peft_model(base_model, peft_config)`,
    ctaText: "Book Fine-Tuning Demo",
    icon: <Code className="w-5 h-5 text-teal-400" />,
    bgGradient: "from-teal-500/10 to-emerald-500/5"
  }
];

export default function Platform() {
  const [activeTab, setActiveTab] = useState<string>('enterprise-rag');

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 py-16">
      
      {/* Background visual components */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-cyan-950/20 via-slate-950/0 to-transparent pointer-events-none z-0" />
      <div className="absolute top-1/4 right-1/10 w-80 h-80 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-2/3 left-1/12 w-96 h-96 rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none z-0" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <section className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[10px] font-mono uppercase tracking-widest text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Developer & Partner Specifications</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight bg-gradient-to-r from-slate-50 via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Enterprise Platforms Deep-Dive
          </h1>
          <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive architectural blueprint of our advanced retrieval, multi-agent orchestrations, and secure deployment infrastructure designed for technical buyers and enterprise partners.
          </p>
        </section>

        {/* INTERACTIVE PRODUCTION ARCHITECTURE DIAGRAM SECTION */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-100">
              The Unified Autonomous Stack
            </h2>
            <p className="text-xs text-slate-400">
              A high-precision, real-time pipeline visualization illustrating how network streams coordinate state machine transitions, hybrid vector indexes, and database logs.
            </p>
          </div>
          <ArchitectureDiagram />
        </section>

        {/* DETAILED ITEMS 6-10 DEEP DIVE TABS AND PANELS */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">Deep Dive (Items 6–10)</span>
            <h2 className="text-2xl font-bold font-display text-slate-100">Core Engineering Solutions</h2>
            <p className="text-xs text-slate-400">
              Select an enterprise-grade component below to review operational parameters, developer configurations, and functional specifications.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
            {DEEP_DIVE_PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`px-4 py-2.5 rounded-xl border font-mono text-xs font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === p.id
                    ? 'bg-cyan-400/10 border-cyan-400 text-cyan-400 shadow-sm shadow-cyan-400/5'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 text-slate-400'
                }`}
              >
                {p.icon}
                <span>{p.title}</span>
              </button>
            ))}
          </div>

          {/* Display panel */}
          <div className="max-w-6xl mx-auto">
            {DEEP_DIVE_PRODUCTS.map((p) => {
              if (p.id !== activeTab) return null;
              return (
                <div
                  key={p.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-950/40 border border-slate-900 rounded-2xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-sm"
                >
                  {/* Glowing background hint */}
                  <div className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-br ${p.bgGradient} blur-[90px] pointer-events-none`} />

                  {/* Left content block (Col-span 7) */}
                  <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
                    <div className="space-y-5">
                      {/* Badge and Title */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-cyan-400/10 border border-cyan-400/30 text-cyan-400">
                            Phase: {p.phase}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-slate-900 border border-slate-800 text-slate-400">
                            {p.status}
                          </span>
                        </div>
                        <h3 className="text-2xl font-black font-display tracking-wide text-slate-50 flex items-center gap-2.5">
                          {p.icon}
                          {p.title}
                        </h3>
                      </div>

                      {/* Main narrative */}
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {p.description}
                      </p>

                      {/* What it does / Who it's for / Tech differentiator */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 border-t border-slate-900 text-xs">
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">What It Does</span>
                          <p className="text-slate-300 leading-relaxed font-sans">{p.whatItDoes}</p>
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Who It's For</span>
                          <p className="text-slate-300 leading-relaxed font-sans">{p.whoItsFor}</p>
                        </div>
                      </div>

                      {/* Technical Differentiator */}
                      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-900/80 text-xs space-y-1.5">
                        <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">Systems-Engineering Differentiator</span>
                        <p className="text-slate-200 font-sans italic leading-relaxed">
                          “{p.technicalDifferentiator}”
                        </p>
                      </div>

                      {/* Specifications List */}
                      <div className="space-y-2.5 pt-3 border-t border-slate-900">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Core Engineering Specifications</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px] text-slate-300 font-sans">
                          {p.specs.map((spec, i) => (
                            <div key={i} className="flex gap-2 items-start">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Specific Action CTA */}
                    <div className="pt-4">
                      <Link
                        to="/contact"
                        className="inline-flex px-6 py-3 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs tracking-wider transition-all items-center gap-1.5 shadow-lg shadow-cyan-500/10 cursor-pointer"
                      >
                        {p.ctaText}
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Right code/payload block (Col-span 5) */}
                  <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950 rounded-xl border border-slate-900 p-5 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">{p.codeTitle}</span>
                        <span className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest">Active Spec</span>
                      </div>
                      <div className="bg-slate-950/40 p-4 rounded-lg border border-slate-900/60 font-mono text-[10px] text-slate-300 overflow-x-auto max-h-[340px] scrollbar-thin">
                        <pre className="text-emerald-400/90 whitespace-pre">{p.codeSnippet}</pre>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900/20 border border-slate-900/80 rounded-lg flex items-center gap-3 text-xs">
                      <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
                      <p className="text-slate-400 font-sans text-[11px]">
                        Enterprise code modules are delivered inside air-gapped container repositories, meeting strict ISO-27001, SOC2 Type II compliance rules.
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </section>

        {/* OVERALL PARTNERSHIP CTA */}
        <section className="border border-slate-900 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 p-8 sm:p-10 text-center space-y-5">
          <h2 className="text-2xl font-bold font-display text-slate-100">
            Let's Review Your Enterprise Architecture Requirements
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
            Ready to deploy enterprise AI Employees with proper systems engineering? Book a direct discovery technical callback with our principal platform architect today.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex px-5 py-2.5 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs tracking-wider transition-all items-center gap-1.5 shadow-lg shadow-cyan-500/10 cursor-pointer"
            >
              Book Systems Briefing
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

      </main>

    </div>
  );
}

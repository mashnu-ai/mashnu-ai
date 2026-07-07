import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { RoadmapItem } from '../types';

const ROADMAP: RoadmapItem[] = [
  {
    id: 1,
    quarter: "Q1 2026",
    title: "AI Voice Agents",
    status: "Live/GA",
    description: "Inbound/outbound voice automation systems designed to automate complex, unstructured call-center operations.",
    specs: ["Sub-500ms voice roundtrip (STT + LLM + TTS)", "AthenaHealth & Salesforce native integrations", "VAD (Voice Activity Detection) resilience to heavy background noise"],
    whatItDoes: "Handles high-volume inbound and outbound telephone calls, pulling and pushing patient EHR data (e.g. AthenaHealth) or CRM status (e.g. Salesforce) to schedule appointments and perform triage.",
    whoItsFor: "Medical practices, retail businesses, logistics dispatch offices, and enterprise call-center managers.",
    technicalDifferentiator: "Orchestrated via a custom sub-480ms streaming STT-LLM-TTS audio pipeline, bypassing high-overhead third-party middleware.",
    ctaText: "Book AI Voice Agent Demo",
    phase: "Live"
  },
  {
    id: 2,
    quarter: "Q1 2026",
    title: "WhatsApp AI Agents",
    status: "Live/GA",
    description: "Multi-modal commerce and support automation agents delivering transactional messaging on the WhatsApp Business API.",
    specs: ["Twilio WhatsApp Sandbox support", "Direct Shopify/WooCommerce inventory sync", "Rich media (images, PDFs, locations) parsing and ingestion"],
    whatItDoes: "Operates as an automated conversational sales and customer care associate over the WhatsApp Business API, processing multi-modal inputs like invoices or screenshots.",
    whoItsFor: "Direct-to-Consumer (DTC) brands, regional distributors, and proactive client relations teams.",
    technicalDifferentiator: "Features state-consistent thread preservation utilizing a specialized Redis-backed memory buffer to restore context during intermittent carrier dropouts.",
    ctaText: "Book WhatsApp AI Demo",
    phase: "Live"
  },
  {
    id: 3,
    quarter: "Q2 2026",
    title: "AI Chatbots",
    status: "In Production",
    description: "Fully embedded client-facing chat components that resolve deep knowledge inquiries with custom context mapping.",
    specs: ["Custom corporate brand styling rules", "Sub-100ms streaming text latency", "Pre-chat form qualification and routing logic"],
    whatItDoes: "Renders as an interactive on-site widget to address complex, multi-tier visitor queries, referencing internal policy documents in real time and routing high-value leads.",
    whoItsFor: "Customer support executives, digital product managers, and administrative leads.",
    technicalDifferentiator: "Built with localized compliance and safety guardrail checks compiled into the core prompt layout, guaranteeing zero hallucinations or brand violations.",
    ctaText: "Book AI Chatbot Demo",
    phase: "Live"
  },
  {
    id: 4,
    quarter: "Q2 2026",
    title: "Website AI Assistants",
    status: "In Production",
    description: "Proactive on-site concierge that monitors customer click behaviors and triggers custom intent-based assistance overlays.",
    specs: ["Dynamic user interaction tracking hooks", "Smart semantic page-search indexing", "Real-time CRM lead profile creation"],
    whatItDoes: "Tracks user interaction patterns such as dwell time, scroll depth, and page navigation to proactively overlay custom support windows and increase conversions.",
    whoItsFor: "Growth marketing teams, sales development representatives (SDRs), and conversion-rate optimization (CRO) leads.",
    technicalDifferentiator: "Leverages a lightweight client-side behavioral scoring engine paired with localized page micro-RAG nodes for extreme responsiveness.",
    ctaText: "Book Website Assistant Demo",
    phase: "Live"
  },
  {
    id: 5,
    quarter: "Q3 2026",
    title: "CRM Automation Orchestrator",
    status: "Beta Testing",
    description: "Stateful agents that run continuous clean-up routines, score inbound leads semantically, and generate custom follow-ups.",
    specs: ["Continuous Salesforce & HubSpot data hygiene loops", "AI-driven opportunity-to-close probability mapping", "Automatic meeting note ingestion and task extraction"],
    whatItDoes: "Acts as a backend automated worker that executes deep CRM sanitization, transcribes team meetings, extracts actionable follow-ups, and auto-assigns tickets.",
    whoItsFor: "Revenue Operations (RevOps) leaders, sales operations administrators, and customer success coordinators.",
    technicalDifferentiator: "Runs on a reliable server-side asynchronous cron loop rather than ephemeral, event-driven webhooks that are vulnerable to data omissions.",
    ctaText: "Book CRM Orchestrator Demo",
    phase: "Building"
  },
  {
    id: 6,
    quarter: "Q3 2026",
    title: "Enterprise RAG Architectures",
    status: "Beta Testing",
    description: "Industrial retrieval pipelines engineered to support zero-leakage, high-precision searches over private company knowledge bases.",
    specs: ["Chunk-graph parent-child relationship tracking", "Dense vector (Qdrant) + BM25 keyword hybrid searching", "Granular document permission scoping for enterprise directories"],
    whatItDoes: "Powers semantic enterprise search over large collections of internal documents (e.g. manuals, policy folders, SOPs), giving accurate, cited answers.",
    whoItsFor: "Compliance officers, product support specialists, internal training coordinators, and HR administrators.",
    technicalDifferentiator: "Employs an advanced hybrid dense-sparse vector and keyword retrieval mechanism structured with parent-child recursive tree mapping.",
    ctaText: "Book Enterprise RAG Demo",
    phase: "Building"
  },
  {
    id: 7,
    quarter: "Q4 2026",
    title: "Multi-Agent Systems",
    status: "Active R&D",
    description: "Complex operational orchestrations where specialized agents hand off tasks with central state synchronization.",
    specs: ["Built atop custom LangGraph orchestrations", "Parallel task execution with state verification", "Deterministic manual human-in-the-loop approvals"],
    whatItDoes: "Integrates complex multi-step corporate operations (e.g. processing a freight order, matching invoices, and executing ledger entries) into coordinated agent teams.",
    whoItsFor: "Supply chain managers, financial ledger auditors, and ERP system integrators.",
    technicalDifferentiator: "Orchestrated using stateful, multi-agent LangGraph architectures that guarantee transaction consistency rather than linear, brittle if-else scripts.",
    ctaText: "Book Multi-Agent Demo",
    phase: "Building"
  },
  {
    id: 8,
    quarter: "Q4 2026",
    title: "Productized SaaS Platform",
    status: "Active R&D",
    description: "Self-serve developer dashboard to deploy, test, monitor, and run custom-built business agents with single-click infrastructure.",
    specs: ["Instant API route creation for custom agents", "Visual canvas-based graph editing UI", "Comprehensive telemetry dashboards & latency tracking"],
    whatItDoes: "A centralized cloud dashboard that allows corporate IT personnel to instantly configure, hot-swap, inspect, and scale customized AI agents.",
    whoItsFor: "Chief Information Officers (CIOs), network engineers, and system administrators.",
    technicalDifferentiator: "Deploys directly into serverless container structures with integrated open-telemetry path tracing for millisecond-level troubleshooting.",
    ctaText: "Book Platform Demo",
    phase: "Platform Layer"
  },
  {
    id: 9,
    quarter: "Q1 2027",
    title: "Low-Latency AI Infrastructure",
    status: "Scheduled",
    description: "High-performance execution layer enabling companies to run complex agent workflows with sub-millisecond network speeds.",
    specs: ["Edge deployment via Cloudflare Workers and serverless WASM", "Custom model weight cache layers for fast cold-starts", "Distributed agent queuing architecture"],
    whatItDoes: "Executes deep neural net processing and inference tasks closer to the user, maximizing UI responsiveness and reducing database wait cycles.",
    whoItsFor: "Real-time gaming companies, global booking providers, and high-volume digital portals.",
    technicalDifferentiator: "Runs open-weight model instances inside optimized WASM-compiled edge containers with an active distributed cache protocol.",
    ctaText: "Book Low-Latency Infra Demo",
    phase: "Platform Layer"
  },
  {
    id: 10,
    quarter: "Q2 2027",
    title: "Custom LLM Fine-Tuning Platform",
    status: "Scheduled",
    description: "Secure, on-premise training pipeline to fine-tune open-source weights (Llama, Mistral) on enterprise proprietary logs.",
    specs: ["Parameter-Efficient Fine-Tuning (PEFT/LoRA) adapters", "Evaluation benchmarking against standard commercial models", "100% air-gapped private inference deployments"],
    whatItDoes: "Builds proprietary model intelligence by fine-tuning open-source foundations (e.g. Llama 3) on secure enterprise datasets.",
    whoItsFor: "Information security executives, model researchers, and specialized regulatory compliance teams.",
    technicalDifferentiator: "Integrates QLoRA parameter-efficient training directly with automated evaluations, deployed inside fully isolated, air-gapped enterprise clouds.",
    ctaText: "Book Fine-Tuning Demo",
    phase: "Platform Layer"
  }
];

export default function ProductSuite() {
  const [selectedRoadmapItem, setSelectedRoadmapItem] = useState<RoadmapItem>(ROADMAP[0]);

  const handleCTAClick = () => {
    document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="max-w-3xl mx-auto text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-slate-900">
          The Mashnu AI Platform Suite & Roadmap
        </h2>
        <p className="text-xs text-slate-400 font-sans">
          We build fully productized agent infrastructure in strict priority order. Each custom client engagement adds battle-tested microservices to the common runtime stack, speeding up subsequent client deployments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: List of 10 Roadmap Lines */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-2 bg-slate-950 p-4 rounded-xl border border-slate-900 max-h-[500px] overflow-y-auto">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Standard Platform Componentry</span>
          
          {ROADMAP.map((item) => {
            const isSelected = selectedRoadmapItem.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedRoadmapItem(item)}
                className={`p-3 rounded-lg border text-left transition-all flex items-center justify-between gap-4 cursor-pointer ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500">0{item.id}.</span>
                    <span className={`text-xs font-semibold font-display tracking-wide ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>
                      {item.title}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-1">{item.description}</p>
                </div>
                
                <div className="shrink-0 flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 text-[8px] font-mono rounded-md uppercase border ${
                    item.status === 'Live/GA' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    item.status === 'In Production' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                    item.status === 'Beta Testing' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    item.status === 'Active R&D' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                    'bg-slate-800 text-slate-500 border-slate-900'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Spec View */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-900 pb-4">
            <div>
              <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px]">
                <span>Quarter Target: {selectedRoadmapItem.quarter}</span>
                <span>•</span>
                <span>Phase 0{selectedRoadmapItem.id}</span>
              </div>
              <h3 className="text-lg font-bold font-display tracking-wide text-slate-900 mt-1">
                {selectedRoadmapItem.title}
              </h3>
            </div>
            <span className={`px-2 py-0.5 text-[9px] font-mono rounded uppercase border ${
              selectedRoadmapItem.status === 'Live/GA' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
              selectedRoadmapItem.status === 'In Production' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
              selectedRoadmapItem.status === 'Beta Testing' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
              selectedRoadmapItem.status === 'Active R&D' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
              'bg-slate-800 text-slate-500 border-slate-900'
            }`}>
              {selectedRoadmapItem.status}
            </span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Functional Purpose</span>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">{selectedRoadmapItem.description}</p>
            </div>

            {/* Detailed What It Does and Who It's For */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">What It Does</span>
                <p className="text-slate-700 leading-relaxed font-sans">{selectedRoadmapItem.whatItDoes}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Who It's For</span>
                <p className="text-slate-700 leading-relaxed font-sans">{selectedRoadmapItem.whoItsFor}</p>
              </div>
            </div>

            {/* Technical Differentiator */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">Technical Differentiator</span>
              <p className="text-slate-800 font-sans italic leading-relaxed">
                “{selectedRoadmapItem.technicalDifferentiator}”
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Core Technical Specifications</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {selectedRoadmapItem.specs.map((spec, i) => (
                  <div key={i} className="flex gap-2 p-3 rounded-lg bg-slate-950 border border-slate-900">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-[11px] text-slate-700 leading-normal">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specific Product CTA */}
            <div className="pt-2">
              <button
                onClick={handleCTAClick}
                className="w-full py-3 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10"
              >
                <span>{selectedRoadmapItem.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mock implementation snippet */}
            <div className="border-t border-slate-900 pt-4 space-y-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Active Platform Integration Hook</span>
              <div className="p-3 bg-slate-950 rounded border border-slate-900 text-slate-400 font-mono text-[10px] space-y-1 leading-relaxed">
                <div><span className="text-cyan-400">from</span> mashnu.core.agents <span className="text-cyan-400">import</span> MashnuAgentRuntime</div>
                <div><span className="text-cyan-400">from</span> mashnu.core.database <span className="text-cyan-400">import</span> QdrantVectorConnector</div>
                <br />
                <div className="text-slate-500"># Instantiating the {selectedRoadmapItem.title.replace(/\s+/g, '')} controller</div>
                <div>agent = MashnuAgentRuntime(</div>
                <div className="pl-4">agent_id=<span className="text-amber-500">"mashnu_0{selectedRoadmapItem.id}_{selectedRoadmapItem.title.toLowerCase().replace(/\s+/g, '_')}"</span>,</div>
                <div className="pl-4">memory=QdrantVectorConnector(distance_metric=<span className="text-amber-500">"cosine"</span>),</div>
                <div className="pl-4">hot_warm_cache_cluster=<span className="text-cyan-400">True</span></div>
                <div>)</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

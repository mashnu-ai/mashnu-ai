import React from 'react';
import { motion } from 'motion/react';
import { Link } from '../components/Router';
import { 
  Phone, MessageSquare, Globe, Shield, Sparkles, Database, Layers, BarChart3, 
  Settings, Cpu, ArrowRight, Check, Network, Terminal, Code
} from 'lucide-react';

interface ProductItem {
  id: string;
  title: string;
  phase: string;
  phaseDesc: string;
  status: string;
  description: string;
  specs: string[];
  latency: string;
  accuracy: string;
  icon: React.ReactNode;
  whatItDoes: string;
  whoItsFor: string;
  technicalDifferentiator: string;
  ctaText: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'voice-agents',
    title: 'AI Voice Agents',
    phase: 'Build Phase 1: Interactive Channels',
    phaseDesc: 'Deploying direct, stateful human interaction pipelines with custom low-latency voice protocols.',
    status: 'Live / GA',
    description: 'Inbound and outbound voice automation systems designed to automate complex clinical and logistics call-center operations. Replaces basic IVR menus with fluid natural conversation.',
    specs: [
      'Sub-500ms voice roundtrip (STT + LLM + TTS streaming pipeline)',
      'Custom Voice Activity Detection (VAD) ignoring heavy background noise',
      'Native EHR (AthenaHealth, Epic) and CRM (Salesforce) integrations'
    ],
    latency: '< 480ms P50',
    accuracy: '98.6% Triage Precision',
    icon: <Phone className="w-5 h-5 text-emerald-600" />,
    whatItDoes: "Handles high-volume inbound and outbound telephone calls, pulling and pushing patient EHR data (e.g. AthenaHealth) or CRM status (e.g. Salesforce) to schedule appointments and perform triage.",
    whoItsFor: "Medical practices, retail businesses, logistics dispatch offices, and enterprise call-center managers.",
    technicalDifferentiator: "Orchestrated via a custom sub-480ms streaming STT-LLM-TTS audio pipeline, bypassing high-overhead third-party middleware.",
    ctaText: "Book AI Voice Agent Demo"
  },
  {
    id: 'whatsapp-agents',
    title: 'WhatsApp AI Agents',
    phase: 'Build Phase 1: Interactive Channels',
    phaseDesc: 'Deploying direct, stateful human interaction pipelines with custom low-latency voice protocols.',
    status: 'Live / GA',
    description: 'Autonomous commerce and support agents executing on the WhatsApp Business API. Orchestrates personalized sales advice, discount logic, and direct CRM tracking.',
    specs: [
      'Multi-modal ingestion supporting images, PDFs, and locations',
      'Direct Shopify, WooCommerce, and NetSuite active inventory sync',
      'Dynamic CRM hub creation and HubSpot pipeline synchronization'
    ],
    latency: '< 1.2s Roundtrip',
    accuracy: '99.1% Intent Scoring',
    icon: <MessageSquare className="w-5 h-5 text-[#C15F3C]" />,
    whatItDoes: "Operates as an automated conversational sales and customer care associate over the WhatsApp Business API, processing multi-modal inputs like invoices or screenshots.",
    whoItsFor: "Direct-to-Consumer (DTC) brands, regional distributors, and proactive client relations teams.",
    technicalDifferentiator: "Features state-consistent thread preservation utilizing a specialized Redis-backed memory buffer to restore context during intermittent carrier dropouts.",
    ctaText: "Book WhatsApp AI Demo"
  },
  {
    id: 'ai-chatbots',
    title: 'AI Chatbots',
    phase: 'Build Phase 2: On-Site Ingestion',
    phaseDesc: 'Integrating reactive support environments on corporate digital properties with semantic context matching.',
    status: 'In Production',
    description: 'Client-facing chat components embedded directly into websites, web apps, and member portals. Resolves deep administrative queries and routes complex cases based on clinical and regulatory thresholds.',
    specs: [
      'Pre-chat form qualification and intelligent routing thresholds',
      'Streaming token output with latency under 100ms from core nodes',
      'Custom corporate brand compliance filter preventing safety breaches'
    ],
    latency: '< 100ms TTFT',
    accuracy: '99.4% Safety Factualness',
    icon: <Globe className="w-5 h-5 text-[#C15F3C]" />,
    whatItDoes: "Renders as an interactive on-site widget to address complex, multi-tier visitor queries, referencing internal policy documents in real time and routing high-value leads.",
    whoItsFor: "Customer support executives, digital product managers, and administrative leads.",
    technicalDifferentiator: "Built with localized compliance and safety guardrail checks compiled into the core prompt layout, guaranteeing zero hallucinations or brand violations.",
    ctaText: "Book AI Chatbot Demo"
  },
  {
    id: 'website-ai-assistants',
    title: 'Website AI Assistants',
    phase: 'Build Phase 2: On-Site Ingestion',
    phaseDesc: 'Integrating reactive support environments on corporate digital properties with semantic context matching.',
    status: 'In Production',
    description: 'Proactive on-site concierge that monitors customer behavior, scores engagement context, and triggers intent-based overlay workflows dynamically.',
    specs: [
      'Real-time user engagement tracking (scroll depth, click rates, idle times)',
      'Dynamic page indexing creating micro-RAG nodes for in-page queries',
      'CRM integration with instant lead profile scoring and calendar sync'
    ],
    latency: 'Real-time client-side',
    accuracy: '94.2% Context Relevance',
    icon: <Sparkles className="w-5 h-5 text-amber-600" />,
    whatItDoes: "Tracks user interaction patterns such as dwell time, scroll depth, and page navigation to proactively overlay custom support windows and increase conversions.",
    whoItsFor: "Growth marketing teams, sales development representatives (SDRs), and conversion-rate optimization (CRO) leads.",
    technicalDifferentiator: "Leverages a lightweight client-side behavioral scoring engine paired with localized page micro-RAG nodes for extreme responsiveness.",
    ctaText: "Book Website Assistant Demo"
  },
  {
    id: 'crm-orchestrator',
    title: 'CRM Automation Orchestrator',
    phase: 'Build Phase 3: Operational Orchestration',
    phaseDesc: 'Transitioning from reactive frontends to proactive, continuous backend database operations.',
    status: 'Beta Testing',
    description: 'Stateful, background background cron loops that run automated database hygiene, lead scrubbing, meeting transcript ingestion, and opportunity close probability modeling.',
    specs: [
      'Continuous HubSpot & Salesforce active data hygiene loops',
      'AI-driven custom follow-ups created automatically from call logs',
      'Structured task extraction linking deal notes directly to Jira/linear'
    ],
    latency: 'Asynchronous Cron',
    accuracy: '98.9% Field Sync Match',
    icon: <Settings className="w-5 h-5 text-[#C15F3C]" />,
    whatItDoes: "Acts as a backend automated worker that executes deep CRM sanitization, transcribes team meetings, extracts actionable follow-ups, and auto-assigns tickets.",
    whoItsFor: "Revenue Operations (RevOps) leaders, sales operations administrators, and customer success coordinators.",
    technicalDifferentiator: "Runs on a reliable server-side asynchronous cron loop rather than ephemeral, event-driven webhooks that are vulnerable to data omissions.",
    ctaText: "Book CRM Orchestrator Demo"
  },
  {
    id: 'helpdesk-agent',
    title: 'AI Helpdesk & Ticketing Agent',
    phase: 'Build Phase 3: Operational Orchestration',
    phaseDesc: 'Transitioning from reactive frontends to proactive, continuous backend database operations.',
    status: 'Live / GA',
    description: 'Autonomous support specialist that connects directly with Zendesk, Freshdesk, and Jira. Automatically drafts ticket replies, tags categories, escalates complex issues, and maintains deep database cohesion.',
    specs: [
      'Direct Zendesk & Jira Service Desk secure webhook integration',
      'Automated customer tier-level validation and service-level agreement (SLA) alerts',
      'Intelligent, multi-language translation and custom tone mapping'
    ],
    latency: '< 800ms API dispatch',
    accuracy: '97.2% SLA Compliance',
    icon: <Shield className="w-5 h-5 text-[#C15F3C]" />,
    whatItDoes: "Injects as a background service into standard ticketing queues, reading inbound customer inquiries, looking up resolution guidelines in the RAG repository, and compiling draft responses.",
    whoItsFor: "Customer success managers, IT support directors, and customer experience operations teams.",
    technicalDifferentiator: "Combines dense vector retrieval of company SOPs with a strict safety evaluation filter to generate answers that comply with customer SLAs.",
    ctaText: "Book Helpdesk Agent Demo"
  },
  {
    id: 'lead-enrichment-engine',
    title: 'CRM Lead Enrichment & Pipeline Engine',
    phase: 'Build Phase 3: Operational Orchestration',
    phaseDesc: 'Transitioning from reactive frontends to proactive, continuous backend database operations.',
    status: 'In Production',
    description: 'Continuous background workers that enrich cold records, scrape web data for active technographics, and calculate automated close-probability scores for active sales opportunities.',
    specs: [
      'Deep web scraper finding corporate technographic profiles and active hiring trends',
      'Automatic duplicate merging and field normalization across Salesforce & HubSpot',
      'AI-driven custom sales outreach sequences tailored to lead technographic footprints'
    ],
    latency: 'Asynchronous Pipeline',
    accuracy: '99.2% Enrichment Precision',
    icon: <Layers className="w-5 h-5 text-[#C15F3C]" />,
    whatItDoes: "Scans database records, enriches missing fields (e.g., funding rounds, tech stack, employee count) using public records and LLM web-search APIs, and updates CRM layouts.",
    whoItsFor: "Sales development teams, growth marketing executives, and revenue operations directors.",
    technicalDifferentiator: "Constructed with advanced multi-tier scraping algorithms that cross-verify company details before executing CRM write commits.",
    ctaText: "Book Enrichment Engine Demo"
  },
  {
    id: 'enterprise-rag',
    title: 'Enterprise RAG Architectures',
    phase: 'Build Phase 3: Operational Orchestration',
    phaseDesc: 'Transitioning from reactive frontends to proactive, continuous backend database operations.',
    status: 'Beta Testing',
    description: 'Industrial-grade Retrieval-Augmented Generation engines designed for zero-leakage search over 10,000+ proprietary internal operational standard procedures and manuals.',
    specs: [
      'Parent-Child recursive chunk mapping preserving structural relationships',
      'Dense vector (Qdrant) + BM25 keyword matching hybrid retrieval',
      'Granular permission scopes mirroring Windows Active Directory/LDAP'
    ],
    latency: '< 210ms Query Speed',
    accuracy: '99.6% Retrieval Precision',
    icon: <Database className="w-5 h-5 text-indigo-600" />,
    whatItDoes: "Powers semantic enterprise search over large collections of internal documents (e.g. manuals, policy folders, SOPs), giving accurate, cited answers.",
    whoItsFor: "Compliance officers, product support specialists, internal training coordinators, and HR administrators.",
    technicalDifferentiator: "Employs an advanced hybrid dense-sparse vector and keyword retrieval mechanism structured with parent-child recursive tree mapping.",
    ctaText: "Book Enterprise RAG Demo"
  },
  {
    id: 'multi-agent-systems',
    title: 'Multi-Agent Systems',
    phase: 'Build Phase 4: Autonomous Platforms',
    phaseDesc: 'Compiling decentralized agent networks cooperating under state validation algorithms.',
    status: 'Active R&D',
    description: 'Stateful, handoff-based operational networks built atop our core LangGraph runtime. Enables multiple narrow agents to coordinate on complicated enterprise logistics.',
    specs: [
      'State-consistent transitions with deterministic handoff triggers',
      'Parallel sub-task execution with auto-verification checks',
      'Strict Human-in-the-Loop thresholds requiring validation'
    ],
    latency: 'Sub-minute pipelines',
    accuracy: '99.8% Code Integrity',
    icon: <Network className="w-5 h-5 text-[#C15F3C]" />,
    whatItDoes: "Integrates complex multi-step corporate operations (e.g. processing a freight order, matching invoices, and executing ledger entries) into coordinated agent teams.",
    whoItsFor: "Supply chain managers, financial ledger auditors, and ERP system integrators.",
    technicalDifferentiator: "Orchestrated using stateful, multi-agent LangGraph architectures that guarantee transaction consistency rather than linear, brittle if-else scripts.",
    ctaText: "Book Multi-Agent Demo"
  },
  {
    id: 'productized-saas',
    title: 'Productized SaaS Platform',
    status: 'Active R&D',
    phase: 'Build Phase 4: Autonomous Platforms',
    phaseDesc: 'Compiling decentralized agent networks cooperating under state validation algorithms.',
    description: 'Self-serve developer dashboard allowing company IT teams to spin up, configure, monitor, and scale custom-engineered micro-agents with complete observability.',
    specs: [
      'Instant deployment to serverless infrastructure via single click',
      'Visual drag-and-drop workflow canvas editing agent DAG topologies',
      'Full open telemetry trace logging mapping latency bottlenecks'
    ],
    latency: '< 10ms Platform API',
    accuracy: '99.99% Node Uptime',
    icon: <Layers className="w-5 h-5 text-[#C15F3C]" />,
    whatItDoes: "A centralized cloud dashboard that allows corporate IT personnel to instantly configure, hot-swap, inspect, and scale customized AI agents.",
    whoItsFor: "Chief Information Officers (CIOs), network engineers, and system administrators.",
    technicalDifferentiator: "Deploys directly into serverless container structures with integrated open-telemetry path tracing for millisecond-level troubleshooting.",
    ctaText: "Book Platform Demo"
  },
  {
    id: 'low-latency-infra',
    title: 'Low-Latency AI Infrastructure',
    phase: 'Build Phase 5: Deep Tech Scale',
    phaseDesc: 'Optimizing open-source LLMs at the compiler level for sub-millisecond execution.',
    status: 'Scheduled',
    description: 'Bare-metal, serverless execution nodes designed to run open-weight models at the edge, bypassing corporate cloud queues for sub-millisecond network speeds.',
    specs: [
      'WASM-compiled edge model execution via Cloudflare Workers',
      'Highly optimized model weight caching minimizing cold-start latency',
      'Load-balanced distributed agent queuing avoiding throttling risks'
    ],
    latency: '< 15ms Edge Overhead',
    accuracy: '100% Core Availability',
    icon: <Cpu className="w-5 h-5 text-[#C15F3C]" />,
    whatItDoes: "Executes deep neural net processing and inference tasks closer to the user, maximizing UI responsiveness and reducing database wait cycles.",
    whoItsFor: "Real-time gaming companies, global booking providers, and high-volume digital portals.",
    technicalDifferentiator: "Runs open-weight model instances inside optimized WASM-compiled edge containers with an active distributed cache protocol.",
    ctaText: "Book Low-Latency Infra Demo"
  },
  {
    id: 'llm-fine-tuning',
    title: 'Custom LLM Fine-Tuning Platform',
    phase: 'Build Phase 5: Deep Tech Scale',
    phaseDesc: 'Optimizing open-source LLMs at the compiler level for sub-millisecond execution.',
    status: 'Scheduled',
    description: 'Private, secure model training pipelines to fine-tune open weights (Llama, Mistral) on company-specific interaction databases and compliance logs.',
    specs: [
      'LoRA/QLoRA parameter-efficient training protocols',
      'Evaluation pipeline benchmarking fine-tuned weights against GPT-4',
      'Air-gapped secure deployment to isolated enterprise virtual clouds'
    ],
    latency: '< 40ms Inference TTFT',
    accuracy: '99.7% Brand Compliance',
    icon: <Code className="w-5 h-5 text-[#C15F3C]" />,
    whatItDoes: "Builds proprietary model intelligence by fine-tuning open-source foundations (e.g. Llama 3) on secure enterprise datasets.",
    whoItsFor: "Information security executives, model researchers, and specialized regulatory compliance teams.",
    technicalDifferentiator: "Integrates QLoRA parameter-efficient training directly with automated evaluations, deployed inside fully isolated, air-gapped enterprise clouds.",
    ctaText: "Book Fine-Tuning Demo"
  }
];

const PRODUCT_IMAGES: Record<string, string> = {
  'voice-agents': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
  'whatsapp-agents': 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=600&auto=format&fit=crop',
  'ai-chatbots': 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop',
  'website-ai-assistants': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
  'crm-orchestrator': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
  'helpdesk-agent': 'https://images.unsplash.com/photo-1516321111749-2ec392f40d89?q=80&w=600&auto=format&fit=crop',
  'lead-enrichment-engine': 'https://images.unsplash.com/photo-1552581230-c01bc9145c00?q=80&w=600&auto=format&fit=crop',
  'enterprise-rag': 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop',
  'multi-agent-systems': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop',
  'productized-saas': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop',
  'low-latency-infra': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop',
  'llm-fine-tuning': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
};

export default function Products() {
  const phases = Array.from(new Set(PRODUCTS.map(p => p.phase)));

  return (
    <div className="relative min-h-screen bg-[#F7F3EB] text-[#211D16] font-sans selection:bg-[#C15F3C]/20 selection:text-[#C15F3C] py-16">
      
      {/* Header section with Apple-style centered presentation */}
      <header className="max-w-4xl mx-auto text-center px-4 mb-20 space-y-4 animate-fade-in">
        <span className="text-[11px] font-semibold text-[#C15F3C] uppercase tracking-wider block">
          Enterprise Catalog
        </span>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.02em] text-[#211D16] leading-tight">
          The 12-Item Product Suite
        </h1>
        <p className="text-lg text-[#6F6757] leading-relaxed max-w-2xl mx-auto">
          We engineer custom autonomous pipelines that connect native business logic with robust, air-gapped AI components.
        </p>
      </header>

      {/* Main product catalog container with alternating background sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        <div className="space-y-20">
          {phases.map((phase, phaseIndex) => {
            const phaseProducts = PRODUCTS.filter(p => p.phase === phase);
            const isAlternatePhase = phaseIndex % 2 !== 0;

            return (
              <section 
                key={phase} 
                className={`p-8 sm:p-12 rounded-[32px] space-y-10 transition-colors duration-300 ${
                  isAlternatePhase ? 'bg-[#EFE9DD]' : 'bg-white border border-[#E5DED0]'
                }`}
              >
                {/* Phase Title Grouping */}
                <div className="border-b border-[#E5DED0] pb-6">
                  <span className="text-[10px] font-semibold text-[#6F6757] uppercase tracking-wider block mb-1">
                    Deployment Scope
                  </span>
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#211D16]">
                    {phase}
                  </h2>
                  <p className="text-sm text-[#6F6757] mt-1.5 max-w-3xl leading-relaxed">
                    {phaseProducts[0]?.phaseDesc || 'Tailored solutions designed for rapid integration.'}
                  </p>
                </div>

                {/* Even Apple-style Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                  {phaseProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col h-full bg-white rounded-[24px] overflow-hidden border border-[#E5DED0] hover:border-[#D2C9B6] hover:shadow-md transition-all duration-300 group"
                    >
                      {/* Image/Render Area at top */}
                      <div className="h-48 sm:h-56 relative overflow-hidden bg-[#EFE9DD] border-b border-[#E5DED0]">
                        <img 
                          src={PRODUCT_IMAGES[product.id] || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop'} 
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-2.5 py-1 text-[9px] font-semibold rounded-full bg-[#211D16] text-white tracking-wide uppercase">
                            {product.status}
                          </span>
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-6">
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-2.5">
                            <span className="text-[#C15F3C] shrink-0">{product.icon}</span>
                            <h3 className="text-lg font-semibold text-[#211D16] tracking-tight">{product.title}</h3>
                          </div>
                          
                          <p className="text-xs sm:text-sm text-[#6F6757] leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* Preserving Deep Technical Specifics */}
                        <div className="space-y-4 pt-4 border-t border-[#E5DED0]">
                          <div className="space-y-2.5 text-xs text-[#4C463B]">
                            <div>
                              <strong className="text-[#211D16] font-medium block">How it works:</strong>
                              <span className="leading-relaxed">{product.whatItDoes}</span>
                            </div>
                            <div>
                              <strong className="text-[#211D16] font-medium block">Intended users:</strong>
                              <span className="leading-relaxed">{product.whoItsFor}</span>
                            </div>
                            <div>
                              <strong className="text-[#211D16] font-medium block">Technical edge:</strong>
                              <span className="leading-relaxed">{product.technicalDifferentiator}</span>
                            </div>
                          </div>

                          {/* Bulleted Specs */}
                          <div className="space-y-2 pt-3 border-t border-[#E5DED0]/60">
                            <span className="text-[9px] font-semibold text-[#6F6757] uppercase tracking-wider block">Operational Specs</span>
                            <ul className="space-y-1.5">
                              {product.specs.map((spec, sIdx) => (
                                <li key={sIdx} className="flex items-start gap-2 text-[11px] text-[#6F6757] leading-relaxed">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#C15F3C] shrink-0 mt-1.5" />
                                  <span>{spec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Technical Meta Footer using clean plain sentences */}
                        <div className="pt-4 border-t border-[#E5DED0] flex items-center justify-between text-[11px] text-[#6F6757] bg-[#EFE9DD] px-4 py-2.5 rounded-xl">
                          <div>
                            <span className="text-[#211D16] font-medium block">System Latency</span>
                            <span>We deliver {product.latency}.</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[#211D16] font-medium block">Target Precision</span>
                            <span>Validated at {product.accuracy}.</span>
                          </div>
                        </div>

                        {/* Call To Action */}
                        <div className="pt-4">
                          <Link
                            to="/contact"
                            className="w-full py-2 rounded-full bg-[#211D16] hover:bg-[#4C463B] text-white font-medium text-xs tracking-tight transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            {product.ctaText}
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>

                      </div>
                    </motion.div>
                  ))}
                </div>

              </section>
            );
          })}
        </div>

        {/* CTA Section */}
        <section className="rounded-[32px] bg-[#EFE9DD] p-8 sm:p-12 text-center space-y-6 border border-[#E5DED0] relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#211D16]">
              Integrate Mashnu AI Components Into Your Stack
            </h2>
            <p className="text-sm text-[#6F6757] leading-relaxed">
              Our modules are engineered with complete backwards compatibility, bridging standard operational hubs and secure cloud instances. Let us conduct an architectural evaluation for your workloads.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
              <Link
                to="/contact"
                className="px-6 py-2 rounded-full bg-[#C15F3C] hover:bg-[#A64D2D] text-white text-xs font-semibold tracking-tight transition-colors flex items-center gap-1.5 shadow-sm"
              >
                Book Discovery Call
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/solutions"
                className="px-6 py-2 rounded-full bg-[#211D16] hover:bg-[#4C463B] text-white text-xs font-semibold tracking-tight transition-colors"
              >
                Browse Industry Solutions
              </Link>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { Link } from '../components/Router';
import {
  Phone, MessageSquare, Globe, Shield, Sparkles, Database, Layers, BarChart3,
  Settings, Cpu, ArrowRight, Check, Network, Terminal, Code
} from 'lucide-react';
import voiceAgentsImg from '../assets/products/AI_Voice_Agent.png';
import whatsappAgentsImg from '../assets/products/WhatsApp_AI_Agent.png';
import aiChatbotsImg from '../assets/products/AI_Chatbots.png';
import websiteAssistantsImg from '../assets/products/Website_AI_Assistant.png';
import crmOrchestratorImg from '../assets/products/CRM_Orchestration.png';
import helpdeskAgentImg from '../assets/products/AI_Helpdesk_Ticketing_Agent.png';
import leadEnrichmentImg from '../assets/products/CRM_Lead_Enrichment_Pipeline_Engine.png';
import enterpriseSearchImg from '../assets/products/Enterprise_RAG.png';
import multiAgentSystemsImg from '../assets/products/Multi_Agent_System.png';
import productizedSaasImg from '../assets/products/Productized_SaaS_Platform.png';
import lowLatencyInfraImg from '../assets/products/Low_Latency_AI.png';
import customTuningImg from '../assets/products/Custom_LLM_Fine_Tuning.png';
import fallbackProductImg from '../assets/products/Mashnu_AI_Promo.png';
import { useSEO } from '../components/SEO';

interface ProductItem {
  id: string;
  title: string;
  phase: string;
  phaseDesc: string;
  status: string;
  description: string;
  specs: string[];
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
      'Fast, natural voice responses with minimal delay',
      'Reliably handles real conversations, including background noise',
      'Native connections to major records and CRM systems'
    ],
    icon: <Phone className="w-5 h-5 text-emerald-600" />,
    whatItDoes: "Handles high-volume inbound and outbound telephone calls, pulling and pushing patient records or CRM status to schedule appointments and perform triage.",
    whoItsFor: "Medical practices, retail businesses, logistics dispatch offices, and enterprise call-center managers.",
    technicalDifferentiator: "Built on a custom, low-latency voice pipeline that avoids the delay of typical third-party middleware.",
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
      'Understands images, PDFs, and locations, not just text',
      'Direct connection to your storefront and inventory systems',
      'Automatically creates and syncs CRM records'
    ],
    icon: <MessageSquare className="w-5 h-5 text-[#2563EB]" />,
    whatItDoes: "Operates as an automated conversational sales and customer care associate over WhatsApp, processing images, invoices, and screenshots along with text.",
    whoItsFor: "Direct-to-Consumer (DTC) brands, regional distributors, and proactive client relations teams.",
    technicalDifferentiator: "Preserves full conversation context reliably, even through network interruptions or carrier dropouts.",
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
      'Pre-chat form qualification and intelligent routing',
      'Fast, streaming responses with minimal delay',
      'Custom brand and safety guardrails built in'
    ],
    icon: <Globe className="w-5 h-5 text-[#2563EB]" />,
    whatItDoes: "Renders as an interactive on-site widget to address complex, multi-tier visitor queries, referencing internal policy documents in real time and routing high-value leads.",
    whoItsFor: "Customer support executives, digital product managers, and administrative leads.",
    technicalDifferentiator: "Built with compliance and safety guardrails at the prompt layer to reduce off-brand or unsafe responses before they reach a customer.",
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
      'Understands page content to answer in-page questions accurately',
      'CRM integration with instant lead profile scoring and calendar sync'
    ],
    icon: <Sparkles className="w-5 h-5 text-amber-600" />,
    whatItDoes: "Tracks user interaction patterns such as dwell time, scroll depth, and page navigation to proactively overlay custom support windows and increase conversions.",
    whoItsFor: "Growth marketing teams, sales development representatives (SDRs), and conversion-rate optimization (CRO) leads.",
    technicalDifferentiator: "Runs lightweight, on-page intelligence paired with fast content lookups for extreme responsiveness.",
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
      'Continuous CRM data hygiene, running automatically in the background',
      'AI-driven custom follow-ups created automatically from call logs',
      'Structured task extraction linking deal notes directly to your project tools'
    ],
    icon: <Settings className="w-5 h-5 text-[#2563EB]" />,
    whatItDoes: "Acts as a backend automated worker that executes deep CRM sanitization, transcribes team meetings, extracts actionable follow-ups, and auto-assigns tickets.",
    whoItsFor: "Revenue Operations (RevOps) leaders, sales operations administrators, and customer success coordinators.",
    technicalDifferentiator: "Runs on a reliable, continuous background process rather than one-off triggers that are vulnerable to data omissions.",
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
      'Direct, secure integration with major ticketing platforms',
      'Automated customer tier-level validation and service-level agreement (SLA) alerts',
      'Intelligent, multi-language translation and custom tone mapping'
    ],
    icon: <Shield className="w-5 h-5 text-[#2563EB]" />,
    whatItDoes: "Runs as a background service in your ticketing queue, reading inbound customer inquiries, looking up the right resolution guidance, and compiling draft responses.",
    whoItsFor: "Customer success managers, IT support directors, and customer experience operations teams.",
    technicalDifferentiator: "Combines accurate search over your internal documentation with a strict safety review to generate answers that comply with customer SLAs.",
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
    icon: <Layers className="w-5 h-5 text-[#2563EB]" />,
    whatItDoes: "Scans database records, enriches missing fields (e.g., funding rounds, company size, employee count) using public data sources, and updates CRM layouts.",
    whoItsFor: "Sales development teams, growth marketing executives, and revenue operations directors.",
    technicalDifferentiator: "Cross-verifies company details from multiple sources before writing anything back to your CRM.",
    ctaText: "Book Enrichment Engine Demo"
  },
  {
    id: 'enterprise-search',
    title: 'Enterprise Knowledge Search',
    phase: 'Build Phase 3: Operational Orchestration',
    phaseDesc: 'Transitioning from reactive frontends to proactive, continuous backend database operations.',
    status: 'Beta Testing',
    description: 'Search built for accurate, cited answers over your internal SOPs, manuals, and policy documents.',
    specs: [
      'Understands document structure, not just flat text',
      'Combines meaning-based and keyword search for accuracy',
      'Granular permission scopes that mirror your existing access controls'
    ],
    icon: <Database className="w-5 h-5 text-indigo-600" />,
    whatItDoes: "Powers semantic enterprise search over large collections of internal documents (e.g. manuals, policy folders, SOPs), giving accurate, cited answers.",
    whoItsFor: "Compliance officers, product support specialists, internal training coordinators, and HR administrators.",
    technicalDifferentiator: "Combines meaning-based and keyword search with document structure awareness, so answers stay grounded in your real documents.",
    ctaText: "Book Enterprise Search Demo"
  },
  {
    id: 'multi-agent-systems',
    title: 'Coordinated Multi-Step Automation',
    phase: 'Build Phase 4: Autonomous Platforms',
    phaseDesc: 'Compiling decentralized agent networks cooperating under strict verification.',
    status: 'Active R&D',
    description: 'Reliable, handoff-based operational networks that let multiple specialized agents coordinate on complicated enterprise logistics.',
    specs: [
      'Consistent, reliable handoffs between steps',
      'Parallel sub-task execution with automatic verification checks',
      'Strict human-in-the-loop thresholds requiring validation'
    ],
    icon: <Network className="w-5 h-5 text-[#2563EB]" />,
    whatItDoes: "Integrates complex multi-step corporate operations (e.g. processing a freight order, matching invoices, and executing ledger entries) into coordinated agent teams.",
    whoItsFor: "Supply chain managers, financial ledger auditors, and ERP system integrators.",
    technicalDifferentiator: "Each step is handled by a specialized process with built-in verification, guaranteeing transaction consistency rather than linear, brittle if-else scripts.",
    ctaText: "Book Automation Demo"
  },
  {
    id: 'productized-saas',
    title: 'Productized SaaS Platform',
    status: 'Active R&D',
    phase: 'Build Phase 4: Autonomous Platforms',
    phaseDesc: 'Compiling decentralized agent networks cooperating under state validation algorithms.',
    description: 'Self-serve dashboard allowing company IT teams to spin up, configure, monitor, and scale custom-built agents with complete visibility.',
    specs: [
      'Instant deployment with a single click',
      'Visual drag-and-drop workflow builder',
      'Full performance visibility mapping response times and bottlenecks'
    ],
    icon: <Layers className="w-5 h-5 text-[#2563EB]" />,
    whatItDoes: "A centralized cloud dashboard that allows corporate IT personnel to instantly configure, swap, inspect, and scale customized AI agents.",
    whoItsFor: "Chief Information Officers (CIOs), network engineers, and system administrators.",
    technicalDifferentiator: "Deploys directly into scalable cloud infrastructure with integrated performance tracing for fast troubleshooting.",
    ctaText: "Book Platform Demo"
  },
  {
    id: 'low-latency-infra',
    title: 'Low-Latency AI Infrastructure',
    phase: 'Build Phase 5: Deep Tech Scale',
    phaseDesc: 'Optimizing open-source LLMs at the compiler level for sub-millisecond execution.',
    status: 'Scheduled',
    description: 'Optimized execution infrastructure designed to run AI processing at the edge, bypassing shared cloud queues for near-instant response speeds.',
    specs: [
      'Optimized edge execution for minimal delay',
      'Smart caching that minimizes cold-start latency',
      'Load-balanced queuing that avoids throttling risks'
    ],
    icon: <Cpu className="w-5 h-5 text-[#2563EB]" />,
    whatItDoes: "Executes AI processing and inference tasks closer to the user, maximizing responsiveness and reducing wait times.",
    whoItsFor: "Real-time gaming companies, global booking providers, and high-volume digital portals.",
    technicalDifferentiator: "Runs optimized inference inside efficient edge containers with an active distributed caching layer.",
    ctaText: "Book Low-Latency Infra Demo"
  },
  {
    id: 'custom-tuning',
    title: 'Custom-Tuned Assistants',
    phase: 'Build Phase 5: Deep Tech Scale',
    phaseDesc: 'Optimizing our AI models for maximum speed and efficiency.',
    status: 'Scheduled',
    description: 'Private, secure training pipelines that adapt a general-purpose assistant to your company-specific data and compliance requirements.',
    specs: [
      'Efficient, cost-effective training protocols',
      'Rigorous evaluation against industry-standard benchmarks',
      'Fully isolated, secure deployment to your own private environment'
    ],
    icon: <Code className="w-5 h-5 text-[#2563EB]" />,
    whatItDoes: "Builds proprietary assistant intelligence by tuning a strong general-purpose foundation on your secure enterprise data.",
    whoItsFor: "Information security executives, model researchers, and specialized regulatory compliance teams.",
    technicalDifferentiator: "Combines efficient, cost-effective tuning with automated evaluations, deployed inside fully isolated, air-gapped enterprise environments.",
    ctaText: "Book Tuning Demo"
  }
];

const PRODUCT_IMAGES: Record<string, string> = {
  'voice-agents': voiceAgentsImg,
  'whatsapp-agents': whatsappAgentsImg,
  'ai-chatbots': aiChatbotsImg,
  'website-ai-assistants': websiteAssistantsImg,
  'crm-orchestrator': crmOrchestratorImg,
  'helpdesk-agent': helpdeskAgentImg,
  'lead-enrichment-engine': leadEnrichmentImg,
  'enterprise-search': enterpriseSearchImg,
  'multi-agent-systems': multiAgentSystemsImg,
  'productized-saas': productizedSaasImg,
  'low-latency-infra': lowLatencyInfraImg,
  'custom-tuning': customTuningImg,
};

export default function Products() {
  const phases = Array.from(new Set(PRODUCTS.map(p => p.phase)));

  useSEO({
    title: 'AI Voice Agents, WhatsApp Agents, and CRM Automation',
    description: 'Custom AI agents that connect to your existing systems: CRM, EHR, ticketing, and internal docs. Voice agents, WhatsApp automation, enterprise search, and more.',
    path: '/products',
  });

  return (
    <div className="relative min-h-screen text-[#0F172A] font-sans selection:bg-[#2563EB]/20 selection:text-[#2563EB] py-16">
      
      {/* Header section with Apple-style centered presentation */}
      <header className="max-w-4xl mx-auto text-center px-4 mb-20 space-y-4 animate-fade-in">
        <span className="text-[11px] font-semibold text-[#2563EB] uppercase tracking-wider block">
          Enterprise Catalog
        </span>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.02em] text-[#0F172A] leading-tight">
          The 12-Item Product Suite
        </h1>
        <p className="text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto">
          We engineer custom AI agents that connect to your existing systems (CRM, EHR, ticketing, and internal docs) instead of generic chat widgets bolted onto the front end.
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
                  isAlternatePhase ? 'bg-[#F1F5F9]' : 'bg-white border border-[#E2E8F0]'
                }`}
              >
                {/* Phase Title Grouping */}
                <div className="border-b border-[#E2E8F0] pb-6">
                  <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block mb-1">
                    Deployment Scope
                  </span>
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#0F172A]">
                    {phase}
                  </h2>
                  <p className="text-sm text-[#64748B] mt-1.5 max-w-3xl leading-relaxed">
                    {phaseProducts[0]?.phaseDesc || 'Tailored solutions designed for rapid integration.'}
                  </p>
                </div>

                {/* Even Apple-style Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                  {phaseProducts.map((product) => {
                    const globalIndex = PRODUCTS.findIndex((p) => p.id === product.id);
                    return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col h-full bg-white rounded-[24px] overflow-hidden border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-md transition-all duration-300 group"
                    >
                      {/* Image/Render Area at top */}
                      <div className="h-48 sm:h-56 relative overflow-hidden bg-[#0B1120] border-b border-[#E2E8F0]">
                        <div
                          className="absolute inset-0 pointer-events-none z-10"
                          style={{ boxShadow: 'inset 0 0 40px 6px rgba(0,0,0,0.35)' }}
                        />
                        <img
                          src={PRODUCT_IMAGES[product.id] || fallbackProductImg}
                          alt={product.title}
                          className="w-full h-full object-contain animate-ken-burns"
                          style={{ animationDelay: `-${(globalIndex % 6) * 3.3}s` }}
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 z-20">
                          <span className="px-2.5 py-1 text-[9px] font-semibold rounded-full bg-[#0F172A] text-white tracking-wide uppercase">
                            {product.status}
                          </span>
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-6">
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-2.5">
                            <span className="text-[#2563EB] shrink-0">{product.icon}</span>
                            <h3 className="text-lg font-semibold text-[#0F172A] tracking-tight">{product.title}</h3>
                          </div>
                          
                          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* Preserving Deep Technical Specifics */}
                        <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
                          <div className="space-y-2.5 text-xs text-[#334155]">
                            <div>
                              <strong className="text-[#0F172A] font-medium block">How it works:</strong>
                              <span className="leading-relaxed">{product.whatItDoes}</span>
                            </div>
                            <div>
                              <strong className="text-[#0F172A] font-medium block">Intended users:</strong>
                              <span className="leading-relaxed">{product.whoItsFor}</span>
                            </div>
                            <div>
                              <strong className="text-[#0F172A] font-medium block">Technical edge:</strong>
                              <span className="leading-relaxed">{product.technicalDifferentiator}</span>
                            </div>
                          </div>

                          {/* Bulleted Specs */}
                          <div className="space-y-2 pt-3 border-t border-[#E2E8F0]/60">
                            <span className="text-[9px] font-semibold text-[#64748B] uppercase tracking-wider block">Operational Specs</span>
                            <ul className="space-y-1.5">
                              {product.specs.map((spec, sIdx) => (
                                <li key={sIdx} className="flex items-start gap-2 text-[11px] text-[#64748B] leading-relaxed">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0 mt-1.5" />
                                  <span>{spec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Call To Action */}
                        <div className="pt-4">
                          <Link
                            to="/contact"
                            className="w-full py-2 rounded-full bg-[#0F172A] hover:bg-[#334155] text-white font-medium text-xs tracking-tight transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            {product.ctaText}
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>

                      </div>
                    </motion.div>
                    );
                  })}
                </div>

              </section>
            );
          })}
        </div>

        {/* CTA Section */}
        <section className="rounded-[32px] bg-[#F1F5F9] p-8 sm:p-12 text-center space-y-6 border border-[#E2E8F0] relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#0F172A]">
              Integrate Mashnu AI Components Into Your Stack
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Our capabilities are built to work together and connect cleanly with the tools you already use. Let us walk through what fits your workflow best.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
              <Link
                to="/contact"
                className="px-6 py-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold tracking-tight transition-colors flex items-center gap-1.5 shadow-sm"
              >
                Book Discovery Call
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/solutions"
                className="px-6 py-2 rounded-full bg-[#0F172A] hover:bg-[#334155] text-white text-xs font-semibold tracking-tight transition-colors"
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

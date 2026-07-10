import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from '../components/Router';
import { useSEO } from '../components/SEO';
import {
  HeartPulse, ShoppingBag, Truck, Scale, ArrowRight, Check,
  Database, Terminal
} from 'lucide-react';

interface SolutionCase {
  id: string;
  industry: string;
  title: string;
  problem: string;
  solution: string;
  mappedProducts: string[];
  specs: string[];
  icon: React.ReactNode;
  sampleFlow: string[];
}

const SOLUTIONS: SolutionCase[] = [
  {
    id: 'healthcare',
    industry: 'Healthcare & Clinical Care Operations',
    title: 'Inbound Patient Intake & Scheduling Automation',
    problem: 'Pediatric medical groups experience massive call volumes during morning rushes, leading to high abandon rates, long patient hold times, and receptionist burnout.',
    solution: 'Deploy a stateful AI Voice Agent connected directly to your scheduling and records systems to verify patient eligibility, reschedule appointments, and handle clinical triage.',
    mappedProducts: ['AI Voice Agents', 'AI Chatbots', 'Website AI Assistants'],
    specs: [
      'Connects directly with major EHR and scheduling systems',
      'Built to support HIPAA-aligned patient verification workflows',
      'Automatic routing to registered nurses based on clinical keyword flags'
    ],
    sampleFlow: [
      'Patient calls medical office requesting urgent physical appointment',
      'AI Voice Agent verifies patient identity using DOB and mobile matching',
      'Checks provider schedules for tomorrow in real time',
      'Agent presents schedules vocally, confirms selection, updates records'
    ],
    icon: <HeartPulse className="w-5 h-5 text-emerald-400" />
  },
  {
    id: 'ecommerce',
    industry: 'Direct-to-Consumer & Retail Commerce',
    title: 'WhatsApp Conversational Sales & Inventory Concierge',
    problem: 'Premium retail brands struggle to convert high-intent ad traffic. Simple email loops and basic FAQ chatbots fail to provide actual consultative sizing assistance and inventory updates.',
    solution: 'Embed a conversational WhatsApp commerce agent that matches buyer sizing criteria with real-time inventory and logs every conversation straight into your sales pipeline.',
    mappedProducts: ['WhatsApp AI Agents', 'Website AI Assistants', 'CRM Automation Orchestrator'],
    specs: [
      'Connects to your existing storefront and inventory systems',
      'Syncs contacts and deals directly into your CRM',
      'Understands images and product photos, not just text'
    ],
    sampleFlow: [
      'Customer clicks Instagram ad, triggering WhatsApp conversation thread',
      'WhatsApp AI Agent analyzes customer queries about jacket fit and sizing',
      'Checks live stock levels for the requested size and color',
      'Sends a checkout link in WhatsApp and notifies the sales team'
    ],
    icon: <ShoppingBag className="w-5 h-5 text-cyan-400" />
  },
  {
    id: 'logistics',
    industry: 'Logistics, Freight & Supply Chain Ledgers',
    title: 'Freight Invoice & Custom Dispatch Reconciliation',
    problem: 'Logistics accounts payable departments manually cross-reference thousands of carrier invoice PDFs with dispatcher databases, leading to costly billing overcharges.',
    solution: 'Set up a coordinated backend workflow that automatically reads carrier invoices, extracts the key details, cross-checks them against dispatch records, and flags price mismatches.',
    mappedProducts: ['Enterprise Knowledge Search', 'Coordinated Multi-Step Automation', 'CRM Automation Orchestrator'],
    specs: [
      'Reads invoice PDFs and extracts key line items automatically',
      'Cross-references every charge against your dispatch records',
      'Human-in-the-loop approval alerts triggered for variances exceeding 5%'
    ],
    sampleFlow: [
      'Freight carrier drops billing invoice PDF in corporate shared inbox',
      'System extracts container ID and total charge from the document',
      'Reconciliation step checks the charge against the active dispatch log',
      'Compares ledger data; creates accounting approval ticket if matched'
    ],
    icon: <Truck className="w-5 h-5 text-indigo-400" />
  },
  {
    id: 'compliance',
    industry: 'Corporate Compliance & Legal Operations',
    title: 'Cited RAG Search for Standard Operating Procedures',
    problem: 'Compliance officers spend hours looking up regulatory warnings and corporate guidelines, frequently making reference mistakes that lead to costly audit warnings.',
    solution: 'Build a search system over your internal regulatory documents that combines meaning-based and keyword search, so every answer cites its exact source document and paragraph.',
    mappedProducts: ['Enterprise Knowledge Search', 'AI Chatbots', 'Custom-Tuned Assistants'],
    specs: [
      'Understands document structure, not just flat text',
      'Respects your existing document permissions and access levels',
      'Only answers when it can cite a real source, no guessing'
    ],
    sampleFlow: [
      'Officer asks compliance tool about specific policy breach exceptions',
      'System searches the document set for the most relevant passages',
      'Retrieves the matching passage along with its source context',
      'Renders cited answer containing exact paragraph and audit date stamp'
    ],
    icon: <Scale className="w-5 h-5 text-amber-400" />
  },
  {
    id: 'crm_sync',
    industry: 'CRM Integrations & Customer Lifecycle Systems',
    title: 'Enterprise CRM Syncing & Automated Ticketing Lifecycle',
    problem: 'Sales and relations teams spend dozens of hours manually entering lead data, transcribing client calls, logging opportunity statuses, and sorting support tickets.',
    solution: 'Deploy a fast CRM automation layer that catches incoming activity, enriches lead details, keeps opportunity records up to date, and drafts ticket replies automatically.',
    mappedProducts: ['CRM Automation Orchestrator', 'AI Helpdesk & Ticketing Agent', 'CRM Lead Enrichment & Pipeline Engine'],
    specs: [
      'Keeps your CRM records in sync automatically, both ways',
      'Drafts follow-up emails using context from past conversations',
      'Automated user profile enrichment and classification'
    ],
    sampleFlow: [
      'New customer books demo or opens support ticket on enterprise portal',
      'System checks the existing contact registry for duplicate records',
      'Enriches the lead by researching public company and funding information',
      'Updates deal pipeline status, auto-assigns a rep, and pushes a team notification'
    ],
    icon: <Database className="w-5 h-5 text-indigo-400" />
  }
];

export default function Solutions() {
  const [activeSolutionId, setActiveSolutionId] = useState<string>(SOLUTIONS[0].id);

  const activeSolution = SOLUTIONS.find(s => s.id === activeSolutionId) || SOLUTIONS[0];

  useSEO({
    title: 'AI Automation Solutions by Industry',
    description: 'How Mashnu\'s reusable multi-agent stack solves real operations problems in financial services, healthcare, real estate, logistics, and e-commerce.',
    path: '/solutions',
  });

  return (
    <div className="relative min-h-screen text-slate-900 font-sans selection:bg-blue-500/20 selection:text-blue-900 py-16">
      
      {/* Visual background noise elements */}
      <div className="absolute top-1/4 right-1/10 w-80 h-80 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 left-1/12 w-96 h-96 rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none z-0" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-800 text-[10px] font-mono uppercase tracking-widest text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Operational Solutions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            Capabilities Framed by Industry
          </h1>
          <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We solve hard, unstructured operations problems for mid-market and enterprise brands. Here is how Mashnu’s reusable multi-agent stack is deployed in real production workloads.
          </p>
        </section>

        {/* Navigation Tabs (Vertical/Horizontal Selector depending on screen) */}
        <div className="border border-slate-900 rounded-xl bg-white p-2 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1">
            {SOLUTIONS.map((sol) => (
              <button
                key={sol.id}
                onClick={() => setActiveSolutionId(sol.id)}
                className={`py-3 px-4 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  activeSolutionId === sol.id
                    ? 'bg-slate-900 text-cyan-400 font-bold border border-slate-800'
                    : 'text-slate-400 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {sol.icon}
                <span className="hidden sm:inline">{sol.industry.split(' & ')[0]}</span>
                <span className="sm:hidden">{sol.id.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Industry Solution layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSolution.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4"
          >
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold block">{activeSolution.industry}</span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-slate-900">{activeSolution.title}</h2>
                
                {/* Problems and Solutions block */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-white border border-slate-900 rounded-lg p-4 space-y-1.5">
                    <span className="text-[9px] font-mono text-slate-500 uppercase font-bold tracking-widest block">The Problem</span>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">{activeSolution.problem}</p>
                  </div>
                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4 space-y-1.5">
                    <span className="text-[9px] font-mono text-cyan-400 uppercase font-bold tracking-widest block">The Solution</span>
                    <p className="text-xs text-slate-700 font-sans leading-relaxed">{activeSolution.solution}</p>
                  </div>
                </div>

                {/* Bullets */}
                <div className="space-y-2.5 pt-4 border-t border-slate-200">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Key Highlights</span>
                  <div className="space-y-2">
                    {activeSolution.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="font-sans leading-relaxed text-[12px]">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mapped Products indicator */}
              <div className="pt-4 border-t border-slate-900">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Utilized Platform Capabilities</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeSolution.mappedProducts.map((pName, idx) => (
                    <span key={idx} className="px-2.5 py-1 text-[10px] rounded-md border border-slate-200 bg-slate-100 text-slate-700 font-mono">
                      {pName}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Flow Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">

              {/* Execution Flow Diagram */}
              <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
                  <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-slate-800">Autonomous Core Flow Diagram</span>
                </div>
                
                <div className="space-y-3 relative pl-4 border-l border-slate-200 py-1">
                  {activeSolution.sampleFlow.map((step, idx) => (
                    <div key={idx} className="relative group space-y-1">
                      {/* Colored dot placement */}
                      <span className="absolute -left-[20.5px] top-1.5 w-2 h-2 rounded-full bg-cyan-500 group-hover:scale-125 transition-transform" />
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-slate-500 uppercase">Step 0{idx + 1}</span>
                      </div>
                      <p className="text-[11px] text-slate-700 leading-relaxed font-sans">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

        {/* Lead Qualification Block below solutions */}
        <section className="border border-slate-900 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 p-8 sm:p-10 text-center space-y-5">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold font-display tracking-tight text-white">
              Don't see your exact workflow?
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Most of what we build doesn't fit a template. Talk to an engineer about what you're trying to automate and we'll tell you honestly whether it's a good fit.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex px-5 py-2.5 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-xs tracking-wider transition-all items-center gap-1.5 shadow-lg shadow-cyan-500/10"
              >
                Talk to an engineer
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}

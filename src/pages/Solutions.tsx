import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from '../components/Router';
import { 
  HeartPulse, ShoppingBag, Truck, Scale, ShieldCheck, ArrowRight, Check, Play,
  Phone, MessageSquare, Database, FileText, ChevronRight, Terminal, Clock
} from 'lucide-react';

interface SolutionCase {
  id: string;
  industry: string;
  title: string;
  problem: string;
  solution: string;
  mappedProducts: string[];
  metrics: { value: string; label: string }[];
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
    solution: 'Deploy stateful AI Voice Agents integrated directly with electronic health record (EHR) platforms via secure API channels to verify patient eligibility, reschedule appointments, and handle clinical triage.',
    mappedProducts: ['AI Voice Agents', 'AI Chatbots', 'Website AI Assistants'],
    metrics: [
      { value: '82%', label: 'Inbound Call Resolution' },
      { value: '480ms', label: 'STT+TTS Voice Latency' },
      { value: '98.6%', label: 'Triage Categorization' }
    ],
    specs: [
      'AthenaHealth, Epic, and Cerner FHIR API scheduling integration',
      'HIPAA compliant and SOC2 Type II air-gapped patient verification',
      'Automatic routing to registered nurses based on clinical keyword flags'
    ],
    sampleFlow: [
      'Patient calls medical office requesting urgent physical appointment',
      'AI Voice Agent verifies patient identity using DOB and mobile matching',
      'Query AthenaHealth FHIR APIs for active provider schedules tomorrow',
      'Agent presents schedules vocally, confirms selection, updates EHR state'
    ],
    icon: <HeartPulse className="w-5 h-5 text-emerald-400" />
  },
  {
    id: 'ecommerce',
    industry: 'Direct-to-Consumer & Retail Commerce',
    title: 'WhatsApp Conversational Sales & Inventory Concierge',
    problem: 'Premium retail brands struggle to convert high-intent ad traffic. Simple email loops and basic FAQ chatbots fail to provide actual consultative sizing assistance and inventory updates.',
    solution: 'Embed a conversational WhatsApp commerce agent that matches buyer sizing criteria with real-time Shopify inventory and commits custom pipeline deals directly to HubSpot.',
    mappedProducts: ['WhatsApp AI Agents', 'Website AI Assistants', 'CRM Automation Orchestrator'],
    metrics: [
      { value: '+24%', label: 'Shopify Checkout Conversion' },
      { value: '1.2s', label: 'Average Response Time' },
      { value: '99.1%', label: 'Intent Extraction Accuracy' }
    ],
    specs: [
      'Shopify Plus & WooCommerce active catalog and inventory sync',
      'HubSpot and Salesforce CRM contact creation and deal mapping',
      'Multi-modal ingestion resolving sizing charts and custom product images'
    ],
    sampleFlow: [
      'Customer clicks Instagram ad, triggering WhatsApp conversation thread',
      'WhatsApp AI Agent analyzes customer queries about jacket fit and sizing',
      'Lookup active Shopify stock levels for size Medium, color Navy',
      'Drafts draft checkout link in WhatsApp and notifies Sales CRM'
    ],
    icon: <ShoppingBag className="w-5 h-5 text-cyan-400" />
  },
  {
    id: 'logistics',
    industry: 'Logistics, Freight & Supply Chain Ledgers',
    title: 'Freight Invoice & Custom Dispatch Reconciliation',
    problem: 'Logistics accounts payable departments manually cross-reference thousands of carrier invoice PDFs with dispatcher databases, leading to costly billing overcharges.',
    solution: 'Establish a multi-agent backend data pipeline that automatically ingests carrier invoices, extracts metadata, queries dispatches in Postgres, and scores price variances.',
    mappedProducts: ['Enterprise RAG Architectures', 'Multi-Agent Systems', 'CRM Automation Orchestrator'],
    metrics: [
      { value: '92%', label: 'Manual Accounting Hours Saved' },
      { value: 'Sub-10s', label: 'PDF Parsing & Ingestion' },
      { value: '99.8%', label: 'Ledger Audit Precision' }
    ],
    specs: [
      'Multi-agent pipeline running layout-aware text extraction (PyPDF/OCR)',
      'Deterministic database lookup cross-referencing carrier container IDs',
      'Human-in-the-loop approval alerts triggered for variances exceeding 5%'
    ],
    sampleFlow: [
      'Freight carrier drops billing invoice PDF in corporate shared inbox',
      'Document Ingestion Node extracts container ID and total USD charge',
      'Reconciliation Agent queries PostgreSQL database for active dispatch log',
      'Compares ledger data; creates accounting approval ticket if matched'
    ],
    icon: <Truck className="w-5 h-5 text-indigo-400" />
  },
  {
    id: 'compliance',
    industry: 'Corporate Compliance & Legal Operations',
    title: 'Zero-Leakage RAG for Technical Standard Operating Procedures',
    problem: 'Compliance officers spend hours looking up regulatory warnings and corporate guidelines, frequently making reference mistakes that lead to costly audit warnings.',
    solution: 'Compile a hybrid Qdrant dense vector and BM25 keyword-matched retrieval pipeline over internal regulatory corpuses, guaranteeing verified sources with legal warning citations.',
    mappedProducts: ['Enterprise RAG Architectures', 'AI Chatbots', 'Custom LLM Fine-Tuning Platform'],
    metrics: [
      { value: '99.6%', label: 'Retrieval Source Precision' },
      { value: '< 210ms', label: 'Compliance Lookup Latency' },
      { value: '0%', label: 'Hallucination / Leakage Rate' }
    ],
    specs: [
      'Parent-Child recursive chunk mapping ensuring visual hierarchy context',
      'Active document permissions syncing with Windows Active Directory/LDAP',
      'Rigid brand compliance filters blocking responses without manual sources'
    ],
    sampleFlow: [
      'Officer asks compliance tool about specific policy breach exceptions',
      'RAG Engine initiates hybrid vector and keyword query in Qdrant DB',
      'Retrieves chunk segments alongside structural parent-document metadata',
      'Renders cited answer containing exact paragraph and audit date stamp'
    ],
    icon: <Scale className="w-5 h-5 text-amber-400" />
  },
  {
    id: 'crm_sync',
    industry: 'CRM Integrations & Customer Lifecycle Systems',
    title: 'Enterprise CRM Syncing & Automated Ticketing Lifecycle',
    problem: 'Sales and relations teams spend dozens of hours manually entering lead data, transcribing client calls, logging opportunity statuses, and sorting support tickets.',
    solution: 'Deploy a high-speed multi-agent CRM orchestrator that intercepts incoming webhooks, enriches lead metadata, updates opportunity fields in HubSpot/Salesforce, and drafts ticket replies.',
    mappedProducts: ['CRM Automation Orchestrator', 'AI Helpdesk & Ticketing Agent', 'CRM Lead Enrichment & Pipeline Engine'],
    metrics: [
      { value: '98.9%', label: 'CRM Sync Accuracy' },
      { value: 'Sub-5s', label: 'Real-Time Sync Speed' },
      { value: '94.2%', label: 'Manual Admin Hours Saved' }
    ],
    specs: [
      'Two-way custom Salesforce and HubSpot REST API synchronizations with concurrency locks',
      'Dynamic email draft compiler pulling context from past conversations and RAG solutions',
      'Automated user profile enrichment and technographic classification'
    ],
    sampleFlow: [
      'New customer books demo or opens support ticket on enterprise portal',
      'Orchestrator cross-references existing Salesforce contact registry for duplicate records',
      'Lead Enrichment node scrapes web presence to classify technographic and funding profiles',
      'Updates HubSpot deal pipeline status, auto-assigns SDR, and pushes Slack confirmation'
    ],
    icon: <Database className="w-5 h-5 text-indigo-400" />
  }
];

export default function Solutions() {
  const [activeSolutionId, setActiveSolutionId] = useState<string>(SOLUTIONS[0].id);

  const activeSolution = SOLUTIONS.find(s => s.id === activeSolutionId) || SOLUTIONS[0];

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500/20 selection:text-blue-900 py-16">
      
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
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Core Technical Standards</span>
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

            {/* Right Flow & Performance Metrics Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 border border-slate-900 rounded-xl bg-white p-4">
                {activeSolution.metrics.map((metric, idx) => (
                  <div key={idx} className="text-center font-mono p-2">
                    <span className="text-2xl font-extrabold text-cyan-400 block tracking-tight font-display">{metric.value}</span>
                    <span className="text-[9px] text-slate-500 uppercase tracking-wide block leading-snug mt-1">{metric.label}</span>
                  </div>
                ))}
              </div>

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
              Need a Custom System Feasibility Audit?
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Our lead engineers can compile a comprehensive technical architecture recommendation tailored exactly to your unique workflow, detailing expected database connections and P50 latencies.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex px-5 py-2.5 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-xs tracking-wider transition-all items-center gap-1.5 shadow-lg shadow-cyan-500/10"
              >
                Request Systems Appraisal
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}

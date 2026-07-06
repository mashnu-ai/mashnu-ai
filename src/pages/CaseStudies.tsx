import React from 'react';
import { Link } from '../components/Router';
import { 
  CheckCircle, ArrowRight, HeartPulse, ShoppingBag, Truck, LayoutTemplate, HelpCircle, FileSpreadsheet, ShieldCheck
} from 'lucide-react';

interface CaseStudyTemplate {
  id: string;
  industry: string;
  templateTitle: string;
  metricPlaceholder: string;
  metricLabel: string;
  challengeInstructions: string;
  solutionInstructions: string;
  resultPoints: string[];
  techStack: string[];
  icon: React.ReactNode;
}

const CASE_TEMPLATES: CaseStudyTemplate[] = [
  {
    id: 'healthcare-voice-triage',
    industry: 'Healthcare & Clinical Care',
    templateTitle: 'Inbound Medical Scheduling & Triage Automation',
    metricPlaceholder: '--%',
    metricLabel: 'Autonomous Intake Target',
    challengeInstructions: 'To be populated with client metrics. Detail the practice size, initial monthly call volume, patient booking friction, and receptionist burnout rates that motivated automation.',
    solutionInstructions: 'To be populated with implementation architecture. Describe the integration of the low-latency voice pipeline, patient authentication schemas, and AthenaHealth/EHR FHIR scheduling syncs.',
    resultPoints: [
      'Patient booking and registration inquiries resolved autonomously without staff intervention',
      'Average reduction in inbound call queue abandon rates during peak morning bottlenecks',
      'Operator minutes reclaimed per appointment scheduled'
    ],
    techStack: [
      'AthenaHealth EHR (FHIR API)',
      'Noise-Resilient VAD Enclaves',
      'Sub-480ms Streaming STT/TTS Sockets',
      'Secure HIPAA-Compliant Sandbox'
    ],
    icon: <HeartPulse className="w-5 h-5 text-emerald-400" />
  },
  {
    id: 'dtc-whatsapp-concierge',
    industry: 'Direct-to-Consumer / E-Commerce',
    templateTitle: 'Direct Conversational Concierge & Cart Recovery',
    metricPlaceholder: '+--%',
    metricLabel: 'Sales Conversion Lift',
    challengeInstructions: 'To be populated with brand metrics. Detail the advertising spend, average customer response delays, cart abandonment rates, and peak-hour staff constraints.',
    solutionInstructions: 'To be populated with Shopify/CRM integration. Describe how thread-persistent memory caches, inventory lookup tools, and Shopify Plus API draft checkouts are coordinated.',
    resultPoints: [
      'Conversion rate increase over baseline email/SMS recovery campaigns',
      'Average customer answer latency reduction (milliseconds vs hours)',
      'Monthly sales volume assisted and recorded in HubSpot pipeline'
    ],
    techStack: [
      'Shopify Plus REST/GraphQL API',
      'Thread-Persistent Redis Memory Map',
      'HubSpot CRM Lead Sync',
      'Meta WhatsApp Business Cloud API'
    ],
    icon: <ShoppingBag className="w-5 h-5 text-cyan-400" />
  },
  {
    id: 'logistics-invoice-audit',
    industry: 'Logistics & Supply Chain',
    templateTitle: 'Autonomous Carrier Ledger & Invoice Reconciliation',
    metricPlaceholder: '--%',
    metricLabel: 'AP Labor Reclaimed',
    challengeInstructions: 'To be populated with shipping metrics. Detail the volume of monthly carrier invoices, average discrepancy percentages, and hours spent manually audits by the accounting department.',
    solutionInstructions: 'To be populated with multi-agent architecture. Describe the OCR parsing pipeline, metadata extraction schemas, and PostgreSQL matching logics.',
    resultPoints: [
      'Reduction in manual accounts payable auditing labor hours',
      'Discharge discrepancies identified and stopped before ledger write-back',
      'Document parsing speed acceleration (seconds vs business days)'
    ],
    techStack: [
      'High-Density OCR Parsing Nodes',
      'PostgreSQL Dispatch Sync',
      'LangGraph Multi-Agent Dag Core',
      'Deterministic Slack Escalation Hooks'
    ],
    icon: <Truck className="w-5 h-5 text-indigo-400" />
  }
];

export default function CaseStudies() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 py-16">
      
      {/* Background visual graphics */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-cyan-950/20 via-slate-950/0 to-transparent pointer-events-none z-0" />
      <div className="absolute top-1/4 right-1/10 w-80 h-80 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/12 w-96 h-96 rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none z-0" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <section className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[10px] font-mono uppercase tracking-widest text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Operational Blueprints</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight bg-gradient-to-r from-slate-50 via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Technical Case Templates
          </h1>
          <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We measure system engineering by factual, verified transaction outcomes. Rather than fabricating placeholder metrics, we display our standardized case templates ready for active client data.
          </p>
        </section>

        {/* GUIDELINE CALLOUT */}
        <section className="border border-slate-900 rounded-2xl bg-slate-900/20 backdrop-blur-sm p-6 max-w-4xl mx-auto space-y-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest">Our Credibility Directive</h2>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Mashnu AI enforces a strict disclosure standard. We do not invent fictional client entities or fake performance charts to inflate our marketing presentation. The templates below outline the structural frameworks we deploy to measure automation success during active pilot sprints.
          </p>
        </section>

        {/* LIST OF STRUCTURAL CASE TEMPLATES */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {CASE_TEMPLATES.map((tmpl) => (
            <div 
              key={tmpl.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border border-slate-900 rounded-2xl bg-slate-950/40 backdrop-blur-md p-6 sm:p-8"
              id={tmpl.id}
            >
              
              {/* Left text column */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4 text-cyan-500" />
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">{tmpl.industry}</span>
                    <span className="text-slate-700 font-mono text-xs">•</span>
                    <span className="text-xs text-slate-500 font-mono">Template ID: {tmpl.id}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-slate-100">{tmpl.templateTitle}</h2>
                  
                  <div className="space-y-4 pt-3 font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
                    <div className="border-l-2 border-slate-900 pl-4 py-1">
                      <strong className="text-slate-300 block text-xs font-mono uppercase tracking-wider mb-1">Challenge Blueprint:</strong>
                      <p className="italic text-slate-500">
                        {tmpl.challengeInstructions}
                      </p>
                    </div>
                    <div className="border-l-2 border-cyan-900/60 pl-4 py-1">
                      <strong className="text-cyan-400/80 block text-xs font-mono uppercase tracking-wider mb-1">Solution Blueprint:</strong>
                      <p className="italic text-slate-500">
                        {tmpl.solutionInstructions}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tech Stack used */}
                <div className="pt-4 border-t border-slate-900/60">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-2">Target Stack Architecture</span>
                  <div className="flex flex-wrap gap-1.5">
                    {tmpl.techStack.map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 text-[9.5px] font-mono rounded bg-slate-900 text-slate-300 border border-slate-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right results column */}
              <div className="lg:col-span-4 flex flex-col justify-between border-l border-slate-900 pl-0 lg:pl-8 pt-6 lg:pt-0">
                
                {/* Metric placeholder */}
                <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-5 text-center font-mono space-y-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-600 block tracking-tight font-display">{tmpl.metricPlaceholder}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold leading-tight">{tmpl.metricLabel}</span>
                </div>

                {/* Bullets List */}
                <div className="space-y-3 pt-6 lg:pt-0">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Planned Verification Metrics</span>
                  <div className="space-y-3">
                    {tmpl.resultPoints.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-400">
                        <CheckCircle className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                        <span className="font-sans leading-relaxed text-[11.5px]">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* CTA Section */}
        <section className="border border-slate-900 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 p-8 sm:p-10 text-center space-y-5 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold font-display tracking-tight text-slate-100">
            Let's Scope a Verified Success Pilot
          </h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed font-sans">
            Ready to deploy stateful multi-agent DAG pipelines inside your production workflows? Share your operational bottlenecks so our systems architect can design a targeted feasibility report.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex px-5 py-2.5 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs tracking-wider transition-all items-center gap-1.5 shadow-lg shadow-cyan-500/10"
            >
              Request Custom Appraisal
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

      </main>

    </div>
  );
}

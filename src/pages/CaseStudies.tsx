import React from 'react';
import { Link } from '../components/Router';
import { useSEO } from '../components/SEO';
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
  icon: React.ReactNode;
}

const CASE_TEMPLATES: CaseStudyTemplate[] = [
  {
    id: 'healthcare-voice-triage',
    industry: 'Healthcare & Clinical Care',
    templateTitle: 'Answering the phone so the front desk doesn\'t have to',
    metricPlaceholder: '--%',
    metricLabel: 'Calls handled without staff',
    challengeInstructions: 'A practice is getting more calls than the front desk can handle, patients wait too long, appointments get missed, and staff are burning out on repetitive scheduling questions.',
    solutionInstructions: 'A voice agent connects directly to the scheduling and records system, answers routine questions, books and reschedules appointments, and only hands off to a person when something actually needs one.',
    resultPoints: [
      'Share of booking and scheduling calls resolved without a staff member',
      'Drop in how long patients wait on hold during busy hours',
      'Staff time freed up per appointment booked'
    ],
    icon: <HeartPulse className="w-5 h-5 text-emerald-400" />
  },
  {
    id: 'dtc-whatsapp-concierge',
    industry: 'Direct-to-Consumer / E-Commerce',
    templateTitle: 'Replying to customers before they give up and leave',
    metricPlaceholder: '+--%',
    metricLabel: 'More sales recovered',
    challengeInstructions: 'A growing brand can\'t answer WhatsApp fast enough during busy hours, so carts get abandoned and customer questions go unanswered until it\'s too late.',
    solutionInstructions: 'A WhatsApp agent connects to inventory and order data, answers product questions instantly, and follows up on abandoned carts before the customer moves on.',
    resultPoints: [
      'More carts recovered compared to email or SMS follow-ups alone',
      'Response time drops from hours to seconds',
      'Sales assisted by the agent, tracked in the CRM'
    ],
    icon: <ShoppingBag className="w-5 h-5 text-cyan-400" />
  },
  {
    id: 'logistics-invoice-audit',
    industry: 'Logistics & Supply Chain',
    templateTitle: 'Catching invoice errors before they cost you',
    metricPlaceholder: '--%',
    metricLabel: 'Fewer manual audit hours',
    challengeInstructions: 'The accounts payable team is manually checking every carrier invoice against dispatch records, a slow process that still lets discrepancies slip through.',
    solutionInstructions: "Invoices are read and cross-checked against dispatch records automatically, flagging mismatches before they're paid instead of after.",
    resultPoints: [
      'Fewer hours spent on manual invoice auditing',
      "Discrepancies caught before they're paid out, not after",
      'Invoices processed in seconds instead of days'
    ],
    icon: <Truck className="w-5 h-5 text-indigo-400" />
  }
];

export default function CaseStudies() {
  useSEO({
    title: 'Case Studies and Client Outcomes',
    description: "We're early, so there are no fake numbers here, just an honest look at how we'll measure results once we're working with real clients.",
    path: '/case-studies',
  });

  return (
    <div className="relative min-h-screen text-slate-900 font-sans selection:bg-blue-500/20 selection:text-blue-900 py-16">
      
      {/* Background visual graphics */}
      <div className="absolute top-1/4 right-1/10 w-80 h-80 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/12 w-96 h-96 rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none z-0" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <section className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-800 text-[10px] font-mono uppercase tracking-widest text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>What Success Looks Like</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            How we'll measure your results
          </h1>
          <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We're early, so we don't have a wall of client logos and numbers to show off yet. What we do have is exactly how we'll track and report results once we're working together, laid out honestly below.
          </p>
        </section>

        {/* GUIDELINE CALLOUT */}
        <section className="border border-slate-900 rounded-2xl bg-slate-50 backdrop-blur-sm p-6 max-w-4xl mx-auto space-y-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest">Why these are still empty</h2>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            We won't make up client names or invent numbers to look more established than we are. What's below is the real shape of how each engagement gets measured, ready to fill in with real results as we take on real clients.
          </p>
        </section>

        {/* LIST OF STRUCTURAL CASE TEMPLATES */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {CASE_TEMPLATES.map((tmpl) => (
            <div 
              key={tmpl.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border border-slate-900 rounded-2xl bg-white backdrop-blur-md p-6 sm:p-8"
              id={tmpl.id}
            >
              
              {/* Left text column */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4 text-cyan-500" />
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">{tmpl.industry}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-slate-900">{tmpl.templateTitle}</h2>

                  <div className="space-y-4 pt-3 font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
                    <div className="border-l-2 border-slate-900 pl-4 py-1">
                      <strong className="text-slate-700 block text-xs font-mono uppercase tracking-wider mb-1">The problem:</strong>
                      <p className="italic text-slate-500">
                        {tmpl.challengeInstructions}
                      </p>
                    </div>
                    <div className="border-l-2 border-cyan-900/60 pl-4 py-1">
                      <strong className="text-cyan-400/80 block text-xs font-mono uppercase tracking-wider mb-1">What we'd build:</strong>
                      <p className="italic text-slate-500">
                        {tmpl.solutionInstructions}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right results column */}
              <div className="lg:col-span-4 flex flex-col justify-between border-l border-slate-900 pl-0 lg:pl-8 pt-6 lg:pt-0">
                
                {/* Metric placeholder */}
                <div className="bg-slate-50 border border-slate-900 rounded-xl p-5 text-center font-mono space-y-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-600 block tracking-tight font-display">{tmpl.metricPlaceholder}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold leading-tight">{tmpl.metricLabel}</span>
                </div>

                {/* Bullets List */}
                <div className="space-y-3 pt-6 lg:pt-0">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">What we'd track</span>
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
          <h2 className="text-2xl font-bold font-display tracking-tight text-white">
            Want to be one of the first real case studies?
          </h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed font-sans">
            Tell us what's slowing your team down and we'll walk you through exactly how we'd measure whether it worked.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex px-5 py-2.5 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-xs tracking-wider transition-all items-center gap-1.5 shadow-lg shadow-cyan-500/10"
            >
              Tell us your situation
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

      </main>

    </div>
  );
}

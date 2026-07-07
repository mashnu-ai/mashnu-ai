import React from 'react';
import { Link } from '../components/Router';
import {
  Check, CalendarClock
} from 'lucide-react';

export default function Pricing() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500/20 selection:text-blue-900 py-16">

      <div className="absolute top-1/4 right-1/10 w-80 h-80 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/12 w-96 h-96 rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none z-0" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Page Header */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-800 text-[10px] font-mono uppercase tracking-widest text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Pricing</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            A flat fee, plus what you actually use
          </h1>
          <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            No per-seat pricing, no markup on model or infrastructure costs. You pay a fixed fee for the build and the retainer, and the raw pass-through cost of whatever AI models or vector lookups your agent uses.
          </p>
        </section>

        {/* THE MODEL — the one honest differentiator, stated plainly */}
        <section className="max-w-4xl mx-auto border-2 border-cyan-500 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 p-6 sm:p-10 space-y-6 relative overflow-hidden shadow-xl shadow-cyan-500/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[80px] pointer-events-none" />

          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-display tracking-tight text-white">How we charge</h2>
            <p className="text-xs text-slate-400 font-sans max-w-xl">
              Every business has different data, integrations, and compliance requirements, so we don't sell a fixed-price subscription. Instead:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400 leading-relaxed font-sans pt-2">
            <div className="space-y-1.5">
              <h4 className="text-white font-bold font-display">1. Fixed build fee</h4>
              <p>Scoped and quoted up front after a call, based on what you're actually integrating with — not a percentage of value or a per-agent tax.</p>
            </div>
            <div className="space-y-1.5">
              <h4 className="text-white font-bold font-display">2. Flat monthly retainer</h4>
              <p>Covers maintenance, monitoring, and support. Fixed, agreed before you sign anything.</p>
            </div>
            <div className="space-y-1.5">
              <h4 className="text-white font-bold font-display">3. Raw compute, no markup</h4>
              <p>Model tokens and vector database usage are billed at the provider's actual cost. We don't add a margin on top of your AI spend.</p>
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <Link
              to="/contact"
              className="px-6 py-3 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/10"
            >
              <CalendarClock className="w-4 h-4" />
              Talk to us about your use case
            </Link>
          </div>
        </section>

        {/* Engagement shapes — honest, no fake numbers, no fake SLAs */}
        <section className="space-y-6 max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-slate-900">How engagements typically start</h2>
            <p className="text-xs text-slate-400 font-sans">
              These aren't fixed packages — they're the shapes most engagements take. Actual scope and cost depend on your integrations and volume.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

            {/* Tier 1: Pilot */}
            <div className="border border-slate-900 rounded-2xl bg-white p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold block">Pilot</span>
                <h3 className="text-lg font-bold font-display text-slate-900">Prove it on one workflow</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  A single voice or messaging agent, scoped to one workflow, built and tested against your real systems before you commit to anything larger.
                </p>

                <div className="space-y-2 pt-4 border-t border-slate-900 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>One integration channel (voice or chat)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>Fixed scope and fixed fee, agreed up front</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>Read/write connection to one CRM or record system</span>
                  </div>
                </div>
              </div>

              <Link
                to="/contact"
                className="w-full py-2.5 rounded bg-slate-900 hover:bg-slate-800 text-center text-xs font-bold text-white tracking-wider uppercase block"
              >
                Ask about a pilot
              </Link>
            </div>

            {/* Tier 2: Production retainer */}
            <div className="border-2 border-cyan-500 rounded-2xl bg-white p-6 flex flex-col justify-between space-y-6 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-widest font-bold bg-cyan-400 text-slate-900 rounded-full">Most common</span>
              <div className="space-y-4">
                <span className="text-[9px] font-mono text-cyan-500 uppercase tracking-widest font-bold block">Production</span>
                <h3 className="text-lg font-bold font-display text-slate-900">Run it, then keep improving it</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Your agent goes live and stays maintained — monitored, tuned, and extended as your workflows change, under a flat monthly retainer.
                </p>

                <div className="space-y-2 pt-4 border-t border-slate-900 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>Multiple workflows on a shared platform</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>Ongoing monitoring and tuning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>Direct access to the engineers who built it</span>
                  </div>
                </div>
              </div>

              <Link
                to="/contact"
                className="w-full py-2.5 rounded bg-cyan-400 hover:bg-cyan-300 text-center text-xs font-bold text-slate-900 tracking-wider uppercase block"
              >
                Ask about production
              </Link>
            </div>

            {/* Tier 3: Enterprise */}
            <div className="border border-slate-900 rounded-2xl bg-white p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold block">Enterprise</span>
                <h3 className="text-lg font-bold font-display text-slate-900">Dedicated infrastructure</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  For teams with data residency, isolation, or compliance requirements that need a dedicated environment rather than shared infrastructure.
                </p>

                <div className="space-y-2 pt-4 border-t border-slate-900 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>Isolated deployment environment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>Custom data residency and access controls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>Named point of contact for support</span>
                  </div>
                </div>
              </div>

              <Link
                to="/contact"
                className="w-full py-2.5 rounded bg-slate-900 hover:bg-slate-800 text-center text-xs font-bold text-white tracking-wider uppercase block"
              >
                Ask about enterprise
              </Link>
            </div>

          </div>
        </section>

      </main>

    </div>
  );
}

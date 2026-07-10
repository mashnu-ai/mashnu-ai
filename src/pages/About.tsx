import React from 'react';
import { Link } from '../components/Router';
import { useSEO } from '../components/SEO';
import {
  Compass, ArrowRight, Code, Shield, Landmark, Terminal, Cpu, Layers, HeartHandshake
} from 'lucide-react';

export default function About() {
  useSEO({
    title: 'About Mashnu AI',
    description: 'Mashnu AI was founded to replace fragile API consulting wrappers with permanent, deterministic systems engineering for AI voice, WhatsApp, and automation agents.',
    path: '/about',
  });

  return (
    <div className="relative min-h-screen text-slate-900 font-sans selection:bg-blue-500/20 selection:text-blue-900 py-16">
      
      {/* Background visual components */}
      <div className="absolute top-1/4 right-1/10 w-80 h-80 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/12 w-96 h-96 rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none z-0" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-800 text-[10px] font-mono uppercase tracking-widest text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Company Manifesto & DNA</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            Built for Long-Term Moats
          </h1>
          <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Mashnu AI was established to replace fragile API consulting wrappers with permanent, deterministic systems engineering.
          </p>
        </section>

        {/* FOUNDER STORY: KIRAN, CTO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-slate-900 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[40px] pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold block">The Founder's Story</span>
              <h2 className="text-2xl font-bold font-display tracking-tight text-slate-900">Kiran<br />CTO & Technical Founder</h2>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Prior to founding Mashnu, Kiran spent over a decade scaling low-latency transactional database kernels and stateful distributed routing networks.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Frustrated by witnessing enterprise leaders being billed extreme fees by agencies to stitch fragile, temporary prompt scripts together, Kiran established Mashnu AI. The mission is simple: bring rigid database engineering integrity back to autonomous operations.
              </p>
            </div>
            
            <div className="border-t border-slate-900 pt-4 mt-6">
              <span className="text-xs font-semibold text-slate-700 block">Kiran</span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">CTO / Founder, Mashnu AI</span>
            </div>
          </div>

          <div className="lg:col-span-7 border border-slate-900 rounded-2xl bg-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 blur-[50px] pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold block">The Philosophy</span>
              <h3 className="text-lg font-bold font-display tracking-wide text-slate-900">Escaping the Brittle Consulting Cycle</h3>
              
              <div className="space-y-4 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                <p>
                  "We built Mashnu because the modern AI market is bloated with short-sighted wrappers. Agencies charge massive hourly premiums to plug API nodes into standard templates that break the moment an underlying model updates or a carrier connection drops."
                </p>
                <p>
                  To eliminate this dependency, we operate with a strict commitment to engineering reciprocity. We do not design disposable scripts.
                </p>
                <p>
                  By treating every custom enterprise deployment as a modular addition to our shared libraries, we compile a permanent, hardened platform that guarantees security, sub-millisecond latencies, and total state residency.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-400 flex items-center gap-3 mt-6">
              <Terminal className="w-5 h-5 text-cyan-400 shrink-0" />
              <p className="text-[10px] leading-relaxed font-sans">
                "We don't build projects. We build reproducible system components that compile directly into a unified micro-agent framework."
              </p>
            </div>
          </div>

        </section>

        {/* WHY WE BUILD PLATFORMS, NOT PROJECTS */}
        <section className="border border-slate-900 rounded-2xl bg-white backdrop-blur-md p-6 sm:p-10 max-w-5xl mx-auto space-y-6 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[70px] pointer-events-none" />
          
          <div className="flex items-center gap-3 border-b border-slate-900 pb-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Layers className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display tracking-wide text-slate-900">Why We Build Platforms, Not Projects</h3>
              <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold">The Systems Engineering Stance</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
            <div className="space-y-3">
              <h4 className="text-slate-800 font-bold font-display">Brittle Projects vs Permanent Platforms</h4>
              <p>
                A "project" is a customized, static integration written for a single-use-case. It has high maintenance overhead, relies on custom script routes, and becomes fragile as external service payloads shift.
              </p>
              <p>
                Mashnu AI rejects custom project setups. Instead, we compile all workflows into reusable, multi-tenant state graphs inside our unified micro-agent **Platform**.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-slate-800 font-bold font-display">System Integrity & Continuous Value</h4>
              <p>
                Because every webhook handler, vector chunk parser, and Voice VAD node we deploy for a client runs as a parameter-validated node on our platform, our clients benefit from continuous reliability, security patches, and instant hardware-level model upgrades.
              </p>
              <p>
                That means fixes and model upgrades reach your automation without you having to rewrite your integration or your core operational rules.
              </p>
            </div>
          </div>
        </section>

        {/* CORE ENGINEERING PHILOSOPHIES */}
        <section className="space-y-8 max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-slate-900">Our Core Disciplines</h2>
            <p className="text-xs text-slate-400 font-sans">
              The non-negotiable systems engineering guidelines dictating every module we commit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="border border-slate-900 rounded-xl bg-white p-6 space-y-3">
              <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Code className="w-4 h-4 text-cyan-400" />
              </div>
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900">Deterministic Graphs</h4>
              <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans">
                We reject loose, recursive LLM loops. All states, actions, and conditional branches are compiled into strict Directed Acyclic Graphs (DAGs) with explicit schema validation.
              </p>
            </div>

            <div className="border border-slate-900 rounded-xl bg-white p-6 space-y-3">
              <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900">Flat Pass-Through Integrity</h4>
              <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans">
                We never apply profit markups on raw model APIs or vector lookups. Licensing is a transparent flat-rate, meaning you pay exactly what the hardware and hosting services cost.
              </p>
            </div>

            <div className="border border-slate-900 rounded-xl bg-white p-6 space-y-3">
              <div className="w-8 h-8 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Landmark className="w-4 h-4 text-indigo-400" />
              </div>
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900">Strict Code Reciprocity</h4>
              <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans">
                We only partner with select, operations-driven teams because every node we build scales our underlying product catalog, keeping our efforts focused purely on real-world stability.
              </p>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="border border-slate-900 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 p-8 sm:p-10 text-center space-y-5 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold font-display tracking-tight text-white">
            Work With a Serious Systems Team
          </h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed font-sans">
            Ready to transition your legacy operations into stateful multi-agent pipelines? Book a technical callback with one of our lead architects today.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex px-5 py-2.5 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-xs tracking-wider transition-all items-center gap-1.5 shadow-lg shadow-cyan-500/10"
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

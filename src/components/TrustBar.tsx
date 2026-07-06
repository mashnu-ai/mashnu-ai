import React from 'react';
import { ScrollReveal } from './ScrollReveal';

export default function TrustBar() {
  return (
    <ScrollReveal yOffset={15} duration={0.2}>
      <section className="border-t border-b border-slate-800/60 py-8 bg-slate-900/5">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
            Trusted by early partners across core sectors
          </span>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs font-mono font-medium text-slate-400">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900/40 border border-slate-800/80">Financial Services</span>
            <span className="text-slate-700">/</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900/40 border border-slate-800/80">Healthcare Systems</span>
            <span className="text-slate-700">/</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900/40 border border-slate-800/80">Real Estate Operations</span>
            <span className="text-slate-700">/</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900/40 border border-slate-800/80">Supply Chain Logistics</span>
            <span className="text-slate-700">/</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900/40 border border-slate-800/80">E-Commerce Operators</span>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

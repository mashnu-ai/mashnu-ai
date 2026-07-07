import React from 'react';
import { Shield, Code } from 'lucide-react';

export default function VisionTimeline() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4 animate-fade-in">
      
      {/* Visual quote container */}
      <div className="relative p-6 sm:p-8 rounded-2xl border border-slate-900 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 text-slate-700 font-serif leading-relaxed text-base italic space-y-4">
        <div className="absolute top-4 left-4 text-4xl text-cyan-500/20 font-serif select-none pointer-events-none">“</div>
        <p className="relative z-10 pl-4 font-sans not-italic text-sm text-slate-400">
          <strong className="text-slate-900 block text-base font-display font-bold not-italic tracking-tight mb-2">Platforms, not one-off projects</strong>
          A lot of AI consulting is a demo wrapped around a chat prompt — quick to build, hard to maintain, and thrown away the moment requirements change.
        </p>
        <p className="relative z-10 pl-4 font-sans not-italic text-sm text-slate-400">
          We build differently. Every workflow, connector, and guardrail we build for a client is designed to be reusable — it gets built back into our core platform, not thrown away after the project ends.
        </p>
        <p className="relative z-10 pl-4 font-sans not-italic text-sm text-slate-400">
          If you think AI agents handling real business operations should be engineered with the same rigor as production infrastructure — not prompted together and hoped for the best — that's who we're building this for.
        </p>
        
        <div className="pt-4 border-t border-slate-900 not-italic flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-800 block font-display">The Engineering Team</span>
            <span className="text-[10px] font-mono text-slate-500">Mashnu AI founders & engineers</span>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-slate-900 text-slate-400 border border-slate-800">Bootstrapped</span>
            <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-slate-900 text-slate-400 border border-slate-800">Moving fast</span>
          </div>
        </div>
      </div>

      {/* Pitch Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        
        <div className="p-5 rounded-xl border border-slate-900 bg-white space-y-2">
          <Shield className="w-5 h-5 text-cyan-400" />
          <h4 className="text-xs font-bold font-display uppercase tracking-wider text-slate-900">For Investors</h4>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Our capital efficiency is our moat. By productizing client requests into structured API components, we achieve rapid customer acquisition costs without burning venture funds on abstract, generic infrastructure.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-900 bg-white space-y-2">
          <Code className="w-5 h-5 text-indigo-400" />
          <h4 className="text-xs font-bold font-display uppercase tracking-wider text-slate-900">For Future Hires</h4>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            We do not build generic chatbots. We compile stateful multi-agent DAG engines that process millions of real-time transactions. If you enjoy raw systems optimization, custom VAD streams, and telemetry logging, read our open source contributions.
          </p>
        </div>

      </div>

    </div>
  );
}

import React from 'react';
import { Shield, Code } from 'lucide-react';

export default function VisionTimeline() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4 animate-fade-in">
      
      {/* Visual quote container */}
      <div className="relative p-6 sm:p-8 rounded-2xl border border-slate-900 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 text-slate-700 font-serif leading-relaxed text-base italic space-y-4">
        <div className="absolute top-4 left-4 text-4xl text-cyan-500/20 font-serif select-none pointer-events-none">“</div>
        <p className="relative z-10 pl-4 font-sans not-italic text-sm text-slate-400">
          <strong className="text-slate-900 block text-base font-display font-bold not-italic tracking-tight mb-2">Our Stance Against the AI Consulting Trap</strong>
          The market is flooded with generic "AI development boutiques" that bill $250/hour to spin up basic LangChain tutorials and present them as enterprise software. They leave clients with massive, unmaintainable node spaghetti.
        </p>
        <p className="relative z-10 pl-4 font-sans not-italic text-sm text-slate-400">
          At Mashnu AI, we reject this pattern completely. We are engineering-first product builders. We only partner with select international enterprise clients because every single workflow, connector, and safety guardrail we build for them is designed to be committed back into our core micro-agent framework.
        </p>
        <p className="relative z-10 pl-4 font-sans not-italic text-sm text-slate-400">
          We compete directly on latency metrics, database lookup throughput, and factual retrieval accuracies. If you are an investor, developer, or enterprise operator who believes AI employees should be engineered like mission-critical databases rather than dynamic chat prompts, we are building this platform for you.
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

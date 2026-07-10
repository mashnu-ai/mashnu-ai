import React from 'react';

export default function LatencyBenchmarks() {
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="max-w-3xl mx-auto text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-slate-900">
          How the pipeline is built for speed
        </h2>
        <p className="text-xs text-slate-400 font-sans">
          Voice agents live or die on latency. Every extra API hop between the caller and a response is time the caller notices. Here's how we structure the pipeline to keep that overhead low.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="border border-slate-900 rounded-xl bg-white p-5 space-y-2">
          <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">Voice Activity Detection</span>
          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            Custom VAD tuned per deployment so the agent starts responding the moment the caller stops talking, instead of waiting on a fixed silence timeout.
          </p>
        </div>

        <div className="border border-slate-900 rounded-xl bg-white p-5 space-y-2">
          <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">Hybrid Retrieval</span>
          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            Combined keyword and meaning-based search that understands document structure, so answers are grounded in your actual documents rather than a guess.
          </p>
        </div>

        <div className="border border-slate-900 rounded-xl bg-white p-5 space-y-2">
          <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">Provider Fallback</span>
          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            If a model provider degrades or errors, the agent retries against a secondary provider on the next turn rather than dropping the conversation.
          </p>
        </div>

      </div>

      {/* Pipeline anatomy — a real architecture diagram, not a fabricated benchmark */}
      <div className="border border-slate-900 rounded-xl bg-white p-6 space-y-6">
        <div className="border-b border-slate-900 pb-4">
          <h4 className="text-sm font-semibold text-slate-800">Anatomy of a Voice Turn</h4>
          <p className="text-[11px] text-slate-400">Each stage in the round trip from caller speech to agent response.</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-[10px] font-mono text-cyan-500 font-bold">
            <span>PIPELINE STAGES</span>
          </div>
          <div className="h-8 rounded bg-slate-50 border border-cyan-500/30 flex overflow-hidden font-mono text-[9px] text-slate-900 select-none">
            <div className="bg-emerald-400 flex items-center justify-center font-bold" style={{ width: '15%' }} title="Speech-to-text">STT</div>
            <div className="bg-cyan-400 flex items-center justify-center font-bold" style={{ width: '45%' }} title="Model inference">Inference</div>
            <div className="bg-indigo-400 flex items-center justify-center font-bold" style={{ width: '25%' }} title="Text-to-speech streaming">TTS Stream</div>
            <div className="bg-teal-400 flex items-center justify-center font-bold" style={{ width: '15%' }} title="Network and buffering">Network</div>
          </div>
          <p className="text-[10px] text-slate-400 font-sans pt-1">
            Inference is the dominant cost in this chain, which is why model choice and prompt design matter more to latency than any other single decision.
          </p>
        </div>
      </div>

    </div>
  );
}

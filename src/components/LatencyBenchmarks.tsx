import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function LatencyBenchmarks() {
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="max-w-3xl mx-auto text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-slate-900">
          Industrial Latency & Reliability Metrics
        </h2>
        <p className="text-xs text-slate-400 font-sans">
          Standard multi-layer wrappers inject significant overhead that degrades the user experience. We optimize our execution path, deploying dedicated model caches and specialized routing protocols to achieve sub-500ms voice response times.
        </p>
      </div>

      {/* Performance stats layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="border border-slate-900 rounded-xl bg-white p-5 space-y-2">
          <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">Voice Roundtrip Latency</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-cyan-400 font-display">480ms</span>
            <span className="text-xs text-slate-500 font-mono">P50</span>
          </div>
          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            Custom Voice Activity Detection (VAD) coupled with warm inference caching nodes reduces voice-to-voice latency by over 70% compared to standard OpenAI Realtime socket endpoints.
          </p>
        </div>

        <div className="border border-slate-900 rounded-xl bg-white p-5 space-y-2">
          <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">RAG Precision (BM25 + Dense)</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-400 font-display">99.4%</span>
            <span className="text-xs text-slate-500 font-mono">Precision</span>
          </div>
          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            By using recursive parent-child chunk mapping alongside hybrid sparse-dense scoring in Qdrant, we mitigate context leakage and align generated text within narrow confidence boundaries.
          </p>
        </div>

        <div className="border border-slate-900 rounded-xl bg-white p-5 space-y-2">
          <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">Inference Redundancy</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-400 font-display">99.99%</span>
            <span className="text-xs text-slate-500 font-mono">Uptime</span>
          </div>
          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            Failover routing protocols instantly migrate active LLM contexts across Anthropic Claude, Google Gemini, and our private, air-gapped Llama servers on AWS.
          </p>
        </div>

      </div>

      {/* Pipeline visual stack comparison */}
      <div className="border border-slate-900 rounded-xl bg-white p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-900 pb-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-800">The Anatomy of a Low-Latency AI Voice Turn</h4>
            <p className="text-[11px] text-slate-400">Comparing Mashnu's bare-metal audio stream vs. traditional API integrations</p>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 uppercase tracking-widest font-bold">Saved: 1,320ms</span>
        </div>

        <div className="space-y-4">
          
          {/* Mashnu Optimizations */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-cyan-400 font-bold">
              <span>MASHNU OPTIMIZED BARE-METAL PIPELINE</span>
              <span>Total: 480ms</span>
            </div>
            <div className="h-8 rounded bg-slate-50 border border-cyan-500/30 flex overflow-hidden font-mono text-[9px] text-slate-900 select-none">
              <div className="bg-emerald-400 flex items-center justify-center font-bold" style={{ width: '15%' }} title="Deepgram STT (80ms)">STT (80ms)</div>
              <div className="bg-cyan-400 flex items-center justify-center font-bold" style={{ width: '45%' }} title="Claude Haiku 4.5 (220ms)">Inference Router (220ms)</div>
              <div className="bg-indigo-400 flex items-center justify-center font-bold" style={{ width: '25%' }} title="Cartesia/ElevenLabs Stream (120ms)">TTS Stream (120ms)</div>
              <div className="bg-teal-400 flex items-center justify-center font-bold" style={{ width: '15%' }} title="Buffer Overlap (60ms)">Network (60ms)</div>
            </div>
          </div>

          {/* Standard wrapper pipeline */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 font-bold">
              <span>TRADITIONAL API WRAPPER SERVICE</span>
              <span>Total: 1,800ms</span>
            </div>
            <div className="h-8 rounded bg-slate-950 border border-slate-900 flex overflow-hidden font-mono text-[9px] text-slate-900 opacity-40 select-none">
              <div className="bg-red-400 flex items-center justify-center font-bold" style={{ width: '20%' }} title="Whisper API (350ms)">STT API (350ms)</div>
              <div className="bg-orange-400 flex items-center justify-center font-bold" style={{ width: '50%' }} title="Non-Stream GPT-4 (900ms)">Uncached LLM Core (900ms)</div>
              <div className="bg-pink-400 flex items-center justify-center font-bold" style={{ width: '20%' }} title="TTS API (350ms)">TTS API (350ms)</div>
              <div className="bg-red-500 flex items-center justify-center font-bold" style={{ width: '10%' }} title="Socket overhead (200ms)">Sockets (200ms)</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

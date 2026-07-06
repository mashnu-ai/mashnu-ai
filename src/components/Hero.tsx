import React from 'react';
import { Terminal, Layers } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import HeroPipelineGraph from './HeroPipelineGraph';

interface HeroProps {
  onBookDemoClick: () => void;
  onSeePlatformClick: () => void;
}

export default function Hero({ onBookDemoClick, onSeePlatformClick }: HeroProps) {
  return (
    <section className="text-center max-w-5xl mx-auto space-y-8 pt-8 md:pt-12 scroll-mt-24">
      <ScrollReveal yOffset={15} duration={0.2}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-accent/10 border border-primary-accent/25 text-[10px] font-mono uppercase tracking-widest text-primary-accent animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-accent animate-pulse" />
          <span>Production-grade agents for enterprise operations</span>
        </div>
      </ScrollReveal>

      <ScrollReveal yOffset={25} duration={0.22}>
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-display tracking-tighter leading-none text-slate-100">
          Personal AI Assistants <br />
          <span className="text-primary-accent font-mono font-semibold relative inline-block">
            We Are Building.
          </span>
        </h1>
      </ScrollReveal>

      <ScrollReveal yOffset={20} duration={0.24}>
        <p className="text-base sm:text-lg text-slate-400 font-sans max-w-3xl mx-auto leading-relaxed">
          Mashnu is a state-machine orchestration engine. We coordinate streaming audio pipelines, WhatsApp conversational states, and legacy CRM databases to handle high-frequency customer operations without human intervention.
        </p>
      </ScrollReveal>

      <ScrollReveal yOffset={15} duration={0.26}>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
          <button
            onClick={onBookDemoClick}
            className="px-6 py-3 rounded bg-primary-accent hover:bg-primary-accent-hover text-white font-semibold text-xs tracking-wide transition-all flex items-center gap-2 shadow-sm cursor-pointer animate-pulse-slow"
          >
            <Terminal className="w-4 h-4" />
            Book a Demo
          </button>
          <button
            onClick={onSeePlatformClick}
            className="px-6 py-3 rounded border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-700 text-slate-300 font-semibold text-xs tracking-wide transition-all flex items-center gap-2 cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            See the Platform
          </button>
        </div>
      </ScrollReveal>

      {/* Animated node-graph pipeline visualization */}
      <ScrollReveal yOffset={30} duration={0.3}>
        <div className="pt-6">
          <HeroPipelineGraph />
        </div>
      </ScrollReveal>
    </section>
  );
}

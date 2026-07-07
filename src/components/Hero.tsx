import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import HeroPipelineGraph from './HeroPipelineGraph';

interface HeroProps {
  onBookDemoClick: () => void;
  onSeePlatformClick: () => void;
}

export default function Hero({ onBookDemoClick, onSeePlatformClick }: HeroProps) {
  return (
    <section className="text-center max-w-5xl mx-auto space-y-8 pt-10 md:pt-16 scroll-mt-24">
      <ScrollReveal yOffset={15} duration={0.2}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-accent-light border border-primary-accent/20 text-[10px] font-mono uppercase tracking-[0.18em] text-primary-accent animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-accent animate-pulse" />
          <span>Production-grade agents for enterprise operations</span>
        </div>
      </ScrollReveal>

      <ScrollReveal yOffset={25} duration={0.22}>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-[1.04] text-text-main">
          Autonomous AI agents,
          <br />
          <em className="text-primary-accent font-normal">engineered like infrastructure.</em>
        </h1>
      </ScrollReveal>

      <ScrollReveal yOffset={20} duration={0.24}>
        <p className="text-base sm:text-lg text-text-sub font-sans max-w-2xl mx-auto leading-relaxed">
          Mashnu is a state-machine orchestration engine. We coordinate streaming voice pipelines, WhatsApp conversation states, and legacy CRM systems to run high-frequency customer operations — without human intervention.
        </p>
      </ScrollReveal>

      <ScrollReveal yOffset={15} duration={0.26}>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <button
            onClick={onBookDemoClick}
            className="group px-6 py-3 rounded-full bg-text-main hover:bg-primary-accent text-bg-card font-sans font-medium text-sm tracking-tight transition-colors duration-200 flex items-center gap-2 cursor-pointer"
          >
            Book a demo
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={onSeePlatformClick}
            className="px-6 py-3 rounded-full border border-border-hover bg-bg-card hover:border-text-muted text-text-main font-sans font-medium text-sm tracking-tight transition-colors duration-200 flex items-center gap-2 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-primary-accent" />
            See the platform
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

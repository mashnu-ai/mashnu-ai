import React from 'react';
import { ArrowRight, Layers, Phone, MessageSquare, Brain } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

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
          <span>A personal AI assistant for real life</span>
        </div>
      </ScrollReveal>

      <ScrollReveal yOffset={25} duration={0.22}>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-[1.04] text-text-main">
          An AI assistant that actually
          <br />
          <em className="text-primary-accent font-normal">helps with your life.</em>
        </h1>
      </ScrollReveal>

      <ScrollReveal yOffset={20} duration={0.24}>
        <p className="text-base sm:text-lg text-text-sub font-sans max-w-2xl mx-auto leading-relaxed">
          Mashnu builds a personal AI assistant that remembers what matters to you, handles calls and messages on your behalf, and takes care of the small, repetitive things — so you get real time back, not another app to manage.
        </p>
      </ScrollReveal>

      <ScrollReveal yOffset={15} duration={0.26}>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <button
            onClick={onBookDemoClick}
            className="group px-6 py-3 rounded-full bg-text-main hover:bg-primary-accent text-bg-card font-sans font-medium text-sm tracking-tight transition-colors duration-200 flex items-center gap-2 cursor-pointer"
          >
            Try the assistant
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={onSeePlatformClick}
            className="px-6 py-3 rounded-full border border-border-hover bg-bg-card hover:border-text-muted text-text-main font-sans font-medium text-sm tracking-tight transition-colors duration-200 flex items-center gap-2 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-primary-accent" />
            About Mashnu
          </button>
        </div>
      </ScrollReveal>

      {/* Simple, human-facing highlights instead of a technical pipeline diagram */}
      <ScrollReveal yOffset={30} duration={0.3}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-3xl mx-auto">
          <div className="border border-border-main rounded-2xl bg-bg-card p-5 text-left space-y-2">
            <Phone className="w-5 h-5 text-primary-accent" />
            <h3 className="text-sm font-semibold text-text-main">Answers your calls</h3>
            <p className="text-xs text-text-muted leading-relaxed">Picks up, understands what's needed, and handles it or takes a clear message.</p>
          </div>
          <div className="border border-border-main rounded-2xl bg-bg-card p-5 text-left space-y-2">
            <MessageSquare className="w-5 h-5 text-primary-accent" />
            <h3 className="text-sm font-semibold text-text-main">Handles your messages</h3>
            <p className="text-xs text-text-muted leading-relaxed">Replies on WhatsApp and chat so nothing important slips through.</p>
          </div>
          <div className="border border-border-main rounded-2xl bg-bg-card p-5 text-left space-y-2">
            <Brain className="w-5 h-5 text-primary-accent" />
            <h3 className="text-sm font-semibold text-text-main">Remembers what matters</h3>
            <p className="text-xs text-text-muted leading-relaxed">Keeps track of your preferences and context, so you don't repeat yourself.</p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

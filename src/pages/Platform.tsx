import React, { useState } from 'react';
import { Link } from '../components/Router';
import { useSEO } from '../components/SEO';
import {
  Cpu, Database, Network, Layers, Code,
  ArrowRight, ArrowUpRight, Lock, CheckCircle2
} from 'lucide-react';

interface DetailedProduct {
  id: string;
  title: string;
  phase: 'Live' | 'Building' | 'Platform Layer';
  status: string;
  whatItDoes: string;
  whoItsFor: string;
  differentiator: string;
  description: string;
  specs: string[];
  ctaText: string;
  icon: React.ReactNode;
  bgGradient: string;
}

const DEEP_DIVE_PRODUCTS: DetailedProduct[] = [
  {
    id: 'enterprise-search',
    title: "Enterprise Knowledge Search",
    phase: "Building",
    status: "Beta Testing",
    whatItDoes: "Powers semantic enterprise search over large collections of internal documents (e.g. clinical records, manuals, policy folders, and SOPs), returning highly accurate, cited answers in real time.",
    whoItsFor: "Compliance officers, product support specialists, internal training coordinators, and medical/financial administration executives.",
    differentiator: "Combines meaning-based and keyword search so answers stay grounded in your actual documents, not guesses.",
    description: "Employees ask a plain-language question and get a cited answer pulled from the right internal document, not a generic response. Access stays scoped to what each person is actually permitted to see.",
    specs: [
      "Understands document structure, not just flat text",
      "Combines meaning-based and keyword search for accuracy",
      "Respects existing document permissions and access levels",
      "Typical answer time under a fifth of a second"
    ],
    ctaText: "Book a walkthrough",
    icon: <Database className="w-5 h-5 text-purple-400" />,
    bgGradient: "from-purple-500/10 to-indigo-500/5"
  },
  {
    id: 'multi-agent-systems',
    title: "Coordinated Multi-Step Automation",
    phase: "Building",
    status: "Active R&D",
    whatItDoes: "Integrates complex multi-step operations (e.g. processing a freight order, matching invoices, and executing ledger entries) into coordinated, reliable workflows.",
    whoItsFor: "Supply chain managers, financial ledger auditors, and operations teams running multi-step processes.",
    differentiator: "Each step is handled by a specialized, purpose-built process instead of one system trying to do everything, so failures are caught and corrected, not silently ignored.",
    description: "Instead of one system trying to handle every part of a process, each step is handled on its own with clear handoffs. If a step can't be confirmed, the workflow pauses and corrects itself rather than pushing a bad result forward.",
    specs: [
      "Specialized handling per business step, not one do-everything system",
      "Automatic checks before moving to the next step",
      "Human approval built in for sensitive actions",
      "Safe rollback if a step fails partway through"
    ],
    ctaText: "Book a walkthrough",
    icon: <Network className="w-5 h-5 text-pink-400" />,
    bgGradient: "from-pink-500/10 to-rose-500/5"
  },
  {
    id: 'productized-saas',
    title: "Unified Management Dashboard",
    phase: "Platform Layer",
    status: "Active R&D",
    whatItDoes: "A centralized dashboard that lets your team instantly configure, monitor, and scale your deployed agents without engineering involvement.",
    whoItsFor: "Operations leads, IT administrators, and teams managing agents across multiple functions.",
    differentiator: "Changes take effect without downtime or a redeploy, your team stays in control day to day.",
    description: "Once an agent is live, your team shouldn't need an engineer to check on it. The dashboard shows real-time performance, lets you adjust behavior safely, and keeps spend visible and predictable.",
    specs: [
      "Real-time performance and usage visibility",
      "Safe configuration changes with no downtime",
      "Clear cost tracking per team or department",
      "Built-in spend limits and controls"
    ],
    ctaText: "Book a walkthrough",
    icon: <Layers className="w-5 h-5 text-blue-400" />,
    bgGradient: "from-blue-500/10 to-cyan-500/5"
  },
  {
    id: 'low-latency-infra',
    title: "Low-Latency Response Infrastructure",
    phase: "Platform Layer",
    status: "Scheduled",
    whatItDoes: "Runs inference closer to the user to keep voice and chat responses fast, reducing the lag that makes automated interactions feel robotic.",
    whoItsFor: "Real-time service providers, booking platforms, high-volume support desks, and time-sensitive operations.",
    differentiator: "We treat response speed as a first-class requirement, not an afterthought. Most delay in automated systems comes from unnecessary network hops.",
    description: "A slow assistant feels broken, even if it's accurate. We're built to minimize the distance and steps between a request and a response, so conversations feel natural instead of laggy.",
    specs: [
      "Optimized response paths to minimize delay",
      "Smart caching to avoid repeated slow lookups",
      "Built for high-volume, real-time interactions",
      "Consistently fast under normal load"
    ],
    ctaText: "Book a walkthrough",
    icon: <Cpu className="w-5 h-5 text-violet-400" />,
    bgGradient: "from-violet-500/10 to-purple-500/5"
  },
  {
    id: 'custom-tuning',
    title: "Custom-Tuned Assistants",
    phase: "Platform Layer",
    status: "Scheduled",
    whatItDoes: "Adapts a general-purpose assistant to your specific vocabulary, tone, and internal knowledge, without starting from scratch.",
    whoItsFor: "Teams with specialized terminology, compliance requirements, or a distinct brand voice.",
    differentiator: "Tuning happens on your own data inside a secure, isolated environment. Nothing is shared across clients.",
    description: "Off-the-shelf assistants often miss industry-specific language or context. We adapt the assistant to your world (your terms, your tone, your edge cases) and test it thoroughly before it goes live.",
    specs: [
      "Learns your specific terminology and context",
      "Tested against your real use cases before launch",
      "Fully isolated, private environment per client",
      "Ongoing safety and quality checks"
    ],
    ctaText: "Book a walkthrough",
    icon: <Code className="w-5 h-5 text-teal-400" />,
    bgGradient: "from-teal-500/10 to-emerald-500/5"
  }
];

export default function Platform() {
  const [activeTab, setActiveTab] = useState<string>('enterprise-search');

  useSEO({
    title: 'The Mashnu AI Platform',
    description: 'Enterprise knowledge search, coordinated multi-step automation, a self-serve dashboard, low-latency inference, and custom-tuned assistants, engineered to work together.',
    path: '/platform',
  });

  return (
    <div className="relative min-h-screen text-slate-900 font-sans selection:bg-blue-500/20 selection:text-blue-900 py-16">

      {/* Background visual components */}
      <div className="absolute top-1/4 right-1/10 w-80 h-80 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-2/3 left-1/12 w-96 h-96 rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none z-0" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Page Header */}
        <section className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-800 text-[10px] font-mono uppercase tracking-widest text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>What Our Platform Does</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-slate-900">
            One Platform, Built to Last
          </h1>
          <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Every capability below is designed to work together, so what we build for you keeps getting better without starting over.
          </p>
        </section>

        {/* DETAILED PRODUCT DEEP DIVE TABS AND PANELS */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">Deep Dive</span>
            <h2 className="text-2xl font-bold font-display text-slate-900">What Each Capability Delivers</h2>
            <p className="text-xs text-slate-400">
              Select a capability below to see what it does, who it's for, and what makes it reliable.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
            {DEEP_DIVE_PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`px-4 py-2.5 rounded-xl border font-mono text-xs font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === p.id
                    ? 'bg-cyan-400/10 border-cyan-400 text-cyan-400 shadow-sm shadow-cyan-400/5'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-700 text-slate-400'
                }`}
              >
                {p.icon}
                <span>{p.title}</span>
              </button>
            ))}
          </div>

          {/* Display panel */}
          <div className="max-w-6xl mx-auto">
            {DEEP_DIVE_PRODUCTS.map((p) => {
              if (p.id !== activeTab) return null;
              return (
                <div
                  key={p.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-slate-900 rounded-2xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-sm"
                >
                  {/* Glowing background hint */}
                  <div className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-br ${p.bgGradient} blur-[90px] pointer-events-none`} />

                  {/* Left content block (Col-span 7) */}
                  <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
                    <div className="space-y-5">
                      {/* Badge and Title */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-cyan-400/10 border border-cyan-400/30 text-cyan-400">
                            Phase: {p.phase}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-slate-900 border border-slate-800 text-slate-400">
                            {p.status}
                          </span>
                        </div>
                        <h3 className="text-2xl font-black font-display tracking-wide text-slate-900 flex items-center gap-2.5">
                          {p.icon}
                          {p.title}
                        </h3>
                      </div>

                      {/* Main narrative */}
                      <p className="text-xs text-slate-700 font-sans leading-relaxed">
                        {p.description}
                      </p>

                      {/* What it does / Who it's for */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 border-t border-slate-900 text-xs">
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">What It Does</span>
                          <p className="text-slate-700 leading-relaxed font-sans">{p.whatItDoes}</p>
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Who It's For</span>
                          <p className="text-slate-700 leading-relaxed font-sans">{p.whoItsFor}</p>
                        </div>
                      </div>

                      {/* Differentiator */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                        <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">What Makes It Different</span>
                        <p className="text-slate-800 font-sans italic leading-relaxed">
                          "{p.differentiator}"
                        </p>
                      </div>

                      {/* Specifications List */}
                      <div className="space-y-2.5 pt-3 border-t border-slate-900">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Key Highlights</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px] text-slate-700 font-sans">
                          {p.specs.map((spec, i) => (
                            <div key={i} className="flex gap-2 items-start">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Specific Action CTA */}
                    <div className="pt-4">
                      <Link
                        to="/contact"
                        className="inline-flex px-6 py-3 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-xs tracking-wider transition-all items-center gap-1.5 shadow-lg shadow-cyan-500/10 cursor-pointer"
                      >
                        {p.ctaText}
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Right highlight block (Col-span 5) */}
                  <div className="lg:col-span-5 flex flex-col justify-center bg-slate-950 rounded-xl border border-slate-900 p-6 space-y-5">
                    <div className="space-y-3">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">At a Glance</span>
                      <div className="space-y-3">
                        {p.specs.map((spec, i) => (
                          <div key={i} className="flex gap-2.5 items-start text-xs text-slate-300 font-sans">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex items-center gap-3 text-xs">
                      <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
                      <p className="text-slate-400 font-sans text-[11px]">
                        Deployed into isolated environments, built to support common compliance requirements like ISO 27001 and SOC 2.
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </section>

        {/* OVERALL PARTNERSHIP CTA */}
        <section className="border border-slate-900 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 p-8 sm:p-10 text-center space-y-5">
          <h2 className="text-2xl font-bold font-display text-white">
            Let's Talk About What You Need
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
            Ready to see how this could work for your team? Book a direct conversation with someone who can walk you through it.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex px-5 py-2.5 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-xs tracking-wider transition-all items-center gap-1.5 shadow-lg shadow-cyan-500/10 cursor-pointer"
            >
              Book a Conversation
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

      </main>

    </div>
  );
}

import React, { useState } from 'react';
import { Link } from '../components/Router';
import { 
  Check, ArrowRight, Shield, Zap, CircleDollarSign, Calculator, HelpCircle, Info, CalendarClock, PhoneCall
} from 'lucide-react';

export default function Pricing() {
  const [actions, setActions] = useState<number>(20000); // monthly inquiries slider

  // ROI math
  // Human average: 5 minutes per action at $24/hour = $2.00 per action
  const humanCost = actions * 2.00;
  // Mashnu average pass-through token cost: $0.012 per action
  const tokenCost = actions * 0.012;
  // Net savings
  const netSavings = humanCost - tokenCost;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 py-16">
      
      {/* Background visual components */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-cyan-950/20 via-slate-950/0 to-transparent pointer-events-none z-0" />
      <div className="absolute top-1/4 right-1/10 w-80 h-80 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/12 w-96 h-96 rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none z-0" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[10px] font-mono uppercase tracking-widest text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Pricing & Sizing Architecture</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight bg-gradient-to-r from-slate-50 via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Transparent, Custom Scoping
          </h1>
          <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We build secure, stateful platforms rather than cookie-cutter subscriptions. Because each deployment integrates with private corporate schemas, we prioritize dedicated architectural scoping.
          </p>
        </section>

        {/* PRIMARY CALL TO ACTION: CUSTOM PRICING COOPERATIVE BLOCK */}
        <section className="max-w-4xl mx-auto border-2 border-cyan-500 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 p-6 sm:p-10 space-y-6 relative overflow-hidden shadow-xl shadow-cyan-500/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[80px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-900 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[8.5px] font-mono rounded bg-cyan-400/10 text-cyan-400 border border-cyan-500/20 uppercase font-bold tracking-wider">
                  Operational Standard
                </span>
                <span className="text-xs font-mono text-slate-500">Bespoke Integration Only</span>
              </div>
              <h2 className="text-2xl font-bold font-display tracking-tight text-slate-100">Book an Engineering Sizing Call</h2>
              <p className="text-xs text-slate-400 font-sans max-w-xl">
                We reject standard markups on model tokens or API relays. To ensure high-integrity and predictable operational costs, we partner with clients under flat service agreements paired with direct, transparent, raw pass-through token billing.
              </p>
            </div>

            <div className="shrink-0 flex flex-col justify-center items-center md:items-end space-y-2 bg-slate-900/40 p-5 rounded-xl border border-slate-900">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Pricing Status</span>
              <span className="text-sm font-bold text-cyan-400 font-mono text-right">Quote Under Scoping</span>
              <span className="text-[9px] text-slate-500 text-center md:text-right">Zero arbitrary markup on compute</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400 leading-relaxed font-sans pt-2">
            <div className="space-y-1.5">
              <h4 className="text-slate-200 font-bold font-display">1. Why We Avoid Fixed Rates</h4>
              <p>Every business possesses distinct EMR, CRM, or document schemas. Standardizing subscriptions forces clients to pay for compute overheads they don't consume.</p>
            </div>
            <div className="space-y-1.5">
              <h4 className="text-slate-200 font-bold font-display">2. Flat Retainers + Raw Compute</h4>
              <p>We charge a predictable flat implementation and maintenance fee. All underlying token usage from Claude or vector lookups is billed transparently at raw cost.</p>
            </div>
            <div className="space-y-1.5">
              <h4 className="text-slate-200 font-bold font-display">3. Risk-Free Proof-of-Concept</h4>
              <p>We work with select operations-focused teams to construct custom, deterministic sandbox pilots before any contract is signed.</p>
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <Link
              to="/contact"
              className="px-6 py-3 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/10"
            >
              <CalendarClock className="w-4 h-4" />
              Schedule Architectural Sizing Call
            </Link>
          </div>
        </section>

        {/* INTERACTIVE ROI SAVINGS CALCULATOR */}
        <section className="max-w-4xl mx-auto border border-slate-900 rounded-2xl bg-slate-950/40 backdrop-blur-md p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5 border-b border-slate-900 pb-4">
            <Calculator className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-base font-bold font-display uppercase tracking-wider text-slate-100">Operational ROI Calculator</h2>
              <span className="text-[9px] font-mono text-slate-500">Based on manual human triage vs. raw pass-through token execution</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Slider Input */}
            <div className="md:col-span-6 space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-400 uppercase font-bold">Estimated Monthly Inquiries</span>
                  <span className="text-cyan-400 font-extrabold text-xs">{actions.toLocaleString()} transactions</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={actions}
                  onChange={(e) => setActions(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-900 rounded-lg cursor-pointer"
                />
              </div>
              <div className="p-3.5 bg-slate-900/20 border border-slate-900 rounded-lg text-[10.5px] leading-relaxed text-slate-400 font-sans">
                <Info className="w-3.5 h-3.5 text-cyan-400 inline mr-1.5 shrink-0 -mt-0.5" />
                <strong>Calculation logic:</strong> Assumes a manual customer/database lookup takes an operator 5 minutes on average at $24/hour ($2.00/triage cost). Mashnu AI token cost assumes average context sizes of 4,000 tokens utilizing Claude Haiku 4.5 pass-through rates.
              </div>
            </div>

            {/* Right Cost Comparison Outcomes */}
            <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center">
              
              <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4 flex flex-col justify-center">
                <span className="text-[8px] text-slate-500 uppercase block leading-snug">Manual Staff Triage Cost</span>
                <span className="text-base font-bold text-slate-400 mt-1">${humanCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>

              <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4 flex flex-col justify-center">
                <span className="text-[8px] text-slate-500 uppercase block leading-snug">Mashnu Token Cost</span>
                <span className="text-base font-bold text-cyan-400 mt-1">${tokenCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>

              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 flex flex-col justify-center">
                <span className="text-[8px] text-emerald-500 uppercase block leading-snug">Net Monthly Savings</span>
                <span className="text-base font-extrabold text-emerald-400 mt-1">${netSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>

            </div>

          </div>
        </section>

        {/* ILLUSTRATIVE REFERENCE TIERS (Clearly marked as Subject to Custom Scoping) */}
        <section className="space-y-6 max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-slate-100">Illustrative Sizing Models</h2>
            <p className="text-xs text-slate-400 font-sans">
              Provisional guidelines representing typical pilot and deployment configurations. Sizing is not finalized.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Tier 1: Starter / Pilot Sprint */}
            <div className="border border-slate-900 rounded-2xl bg-slate-950/40 p-6 flex flex-col justify-between space-y-6 relative opacity-85 hover:opacity-100 transition-opacity">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">Model 01</span>
                  <span className="px-1.5 py-0.5 text-[8px] font-mono bg-slate-900 text-slate-400 border border-slate-800 rounded uppercase">Provisional</span>
                </div>
                <h3 className="text-lg font-bold font-display text-slate-100">Starter Pilot</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  A rapid technical proof-of-concept to build, configure, and compile a single voice or messaging micro-agent pipeline in a secure sandbox.
                </p>
                
                <div className="py-2 flex items-baseline gap-1 font-display">
                  <span className="text-2xl font-extrabold text-slate-400">Custom Pilot Agreement</span>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-900 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>1 Custom Integration Channel (Voice/Chat)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>Full DAG configuration and prompt design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>Basic read/write CRM/EHR API link</span>
                  </div>
                </div>
              </div>

              <Link 
                to="/contact" 
                className="w-full py-2.5 rounded bg-slate-900 hover:bg-slate-800 text-center text-xs font-bold text-slate-300 tracking-wider uppercase block"
              >
                Inquire Starter Scoping
              </Link>
            </div>

            {/* Tier 2: Growth Operational Retainer */}
            <div className="border border-slate-900 rounded-2xl bg-slate-950/40 p-6 flex flex-col justify-between space-y-6 relative opacity-85 hover:opacity-100 transition-opacity">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Model 02</span>
                  <span className="px-1.5 py-0.5 text-[8px] font-mono bg-cyan-950/20 text-cyan-400 border border-cyan-900/30 rounded uppercase font-bold">Provisional</span>
                </div>
                <h3 className="text-lg font-bold font-display text-slate-100">Growth Operational</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Comprehensive platform support providing continuous vector optimization, active dashboard telemetry logs, and state-validated multi-agent nodes.
                </p>
                
                <div className="py-2 flex items-baseline gap-1 font-display">
                  <span className="text-2xl font-extrabold text-slate-400">Tailored Monthly SLA</span>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-900 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>Up to 5 concurrent stateful DAG workflows</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>Continuous data chunking and vector index tuning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>Active telemetry and performance metric logs</span>
                  </div>
                </div>
              </div>

              <Link 
                to="/contact" 
                className="w-full py-2.5 rounded bg-slate-900 hover:bg-slate-800 text-center text-xs font-bold text-slate-300 tracking-wider uppercase block"
              >
                Inquire Growth Scoping
              </Link>
            </div>

            {/* Tier 3: Enterprise Dedicated VPC */}
            <div className="border border-slate-900 rounded-2xl bg-slate-950/40 p-6 flex flex-col justify-between space-y-6 relative opacity-85 hover:opacity-100 transition-opacity">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">Model 03</span>
                  <span className="px-1.5 py-0.5 text-[8px] font-mono bg-slate-900 text-slate-400 border border-slate-800 rounded uppercase">Provisional</span>
                </div>
                <h3 className="text-lg font-bold font-display text-slate-100">Enterprise Enclaves</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Deploy secure, isolated virtual private cloud (VPC) containers to host client model weights with regional residency and HIPAA compliance guarantees.
                </p>
                
                <div className="py-2 flex items-baseline gap-1 font-display">
                  <span className="text-2xl font-extrabold text-slate-400">Enterprise Architecture</span>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-900 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>Isolated VPC / confidential VM enclaves</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>Custom adapter models and private LoRA fine-tuning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>Dedicated 24/7 technical architect response SLA</span>
                  </div>
                </div>
              </div>

              <Link 
                to="/contact" 
                className="w-full py-2.5 rounded bg-slate-900 hover:bg-slate-800 text-center text-xs font-bold text-slate-300 tracking-wider uppercase block"
              >
                Inquire Enterprise Scoping
              </Link>
            </div>

          </div>
        </section>

        {/* Compliance statement */}
        <section className="max-w-3xl mx-auto text-center space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-900 bg-slate-900/10 text-[10.5px] text-slate-400 font-sans">
            <Shield className="w-4 h-4 text-cyan-500 shrink-0" />
            <span>All licensing plans are evaluated with respect to strict HIPAA, SOC2 Type II, and GDPR compliance parameters.</span>
          </div>
        </section>

      </main>

    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Shield, Settings, Send, AlertCircle, UserCheck } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export default function LeadCapture() {
  // Lead submission form states
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadRole, setLeadRole] = useState('');
  const [leadUseCase, setLeadUseCase] = useState('');
  const [leadVolume, setLeadVolume] = useState('< 10k actions/month');
  const [leadSystem, setLeadSystem] = useState('Manual spreadsheets/operations');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadReport, setLeadReport] = useState<any | null>(null);

  // Run lead assessment via API
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadUseCase.trim()) return;

    setIsSubmittingLead(true);
    setLeadReport(null);

    try {
      const res = await fetch('/api/qualify-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: leadName,
          email: leadEmail,
          company: leadCompany,
          role: leadRole,
          useCase: leadUseCase,
          estimatedVolume: leadVolume,
          currentSystem: leadSystem
        })
      });

      if (!res.ok) {
        throw new Error('Failed to generate technical report.');
      }

      const data = await res.json();
      setLeadReport(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <section id="lead-capture" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6 scroll-mt-24">
      
      {/* Left Lead Info */}
      <ScrollReveal as="div" className="lg:col-span-5 flex flex-col justify-between space-y-6 p-6 rounded-2xl border border-slate-900 bg-slate-950/40" yOffset={20} duration={0.25}>
        <div className="space-y-3">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">Systems Engineering Deep Dive</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-slate-100 leading-tight">
            Request an Operational <br />
            Feasibility Appraisal
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Submit your operational specifications to generate a structured technical feasibility report. Our systems analyzer maps proposed integrations, details state-machine topology models, and projects critical-path execution speeds based on historical performance.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-900">
          <div className="flex items-start gap-2 text-xs">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-slate-300">Detailed custom database and model mapping recommendations</span>
          </div>
          <div className="flex items-start gap-2 text-xs">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-slate-300">Instant latency bottleneck evaluations and P50 expectations</span>
          </div>
          <div className="flex items-start gap-2 text-xs">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-slate-300">Priority scheduling with Mashnu's lead architects</span>
          </div>
        </div>

        <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-900 text-slate-400 flex items-center gap-3">
          <Shield className="w-5 h-5 text-cyan-400 shrink-0" />
          <p className="text-[10px] leading-relaxed font-sans">
            Mashnu AI is 100% compliant with HIPAA, SOC2 Type II, and GDPR guidelines. Your proposed operational logs are air-gapped and never utilized to train public weights.
          </p>
        </div>
      </ScrollReveal>

      {/* Right Lead Capture Form */}
      <ScrollReveal as="div" className="lg:col-span-7 border border-slate-900 rounded-2xl bg-slate-950/80 p-6 flex flex-col justify-between relative" yOffset={20} duration={0.25}>
        
        <AnimatePresence mode="wait">
          {!leadReport ? (
            <motion.form
              key="lead-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleLeadSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="e.g. Sarah Connor"
                    className="w-full px-3 py-1.5 text-xs bg-slate-900/60 rounded border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Corporate Email</label>
                  <input
                    type="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="e.g. sarah@cyberdyne.com"
                    className="w-full px-3 py-1.5 text-xs bg-slate-900/60 rounded border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Company Name</label>
                  <input
                    type="text"
                    value={leadCompany}
                    onChange={(e) => setLeadCompany(e.target.value)}
                    placeholder="e.g. Cyberdyne Systems"
                    className="w-full px-3 py-1.5 text-xs bg-slate-900/60 rounded border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Your Title / Role</label>
                  <input
                    type="text"
                    value={leadRole}
                    onChange={(e) => setLeadRole(e.target.value)}
                    placeholder="e.g. Director of Operations"
                    className="w-full px-3 py-1.5 text-xs bg-slate-900/60 rounded border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Estimated Transaction Scale</label>
                  <select
                    value={leadVolume}
                    onChange={(e) => setLeadVolume(e.target.value)}
                    className="w-full bg-slate-900 text-xs py-1.5 px-2 border border-slate-800 rounded text-slate-300 focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    <option value="< 10k actions/month">&lt; 10,000 requests/month</option>
                    <option value="10k-100k actions/month">10,000 to 100,000 requests/month</option>
                    <option value="100k-1M actions/month">100,000 to 1,000,000 requests/month</option>
                    <option value="1M+ actions/month">1,000,000+ requests/month</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Current Operating Stack</label>
                  <select
                    value={leadSystem}
                    onChange={(e) => setLeadSystem(e.target.value)}
                    className="w-full bg-slate-900 text-xs py-1.5 px-2 border border-slate-800 rounded text-slate-300 focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    <option value="Manual spreadsheets/operations">Manual spreadsheets/operators</option>
                    <option value="Offshore BPO contractors">Offshore BPO contractors</option>
                    <option value="Legacy software scripts (Python/SQL)">Legacy software scripts</option>
                    <option value="V1 AI wraps (Zapier / Custom GPTs)">V1 wrappers (Zapier/GPTs)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Operational Automation Target (Use-case)</label>
                  <span className="text-[9px] text-slate-500">Provide detailed specs for accuracy</span>
                </div>
                <textarea
                  value={leadUseCase}
                  onChange={(e) => setLeadUseCase(e.target.value)}
                  placeholder="Explain what operation needs automation (e.g., 'Reconcile invoice PDFs against Hubspot deals, trigger instant billing webhooks on Stripe if matched')"
                  className="w-full h-24 px-3 py-2 text-xs bg-slate-900/60 rounded border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-sans resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingLead}
                className="w-full py-2.5 rounded bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-bold text-xs tracking-wider transition-all disabled:opacity-40 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isSubmittingLead ? (
                  <>
                    <Settings className="w-4 h-4 animate-spin" />
                    <span>Compiling Feasibility Analysis...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Request instant systems appraisal and callback</span>
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="lead-report"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider">Feasibility Analysis Compiled</h4>
                    <span className="text-[9px] text-slate-500">Mashnu Autonomous Auditor v2.0</span>
                  </div>
                </div>
                <button
                  onClick={() => setLeadReport(null)}
                  className="text-[10px] font-mono text-slate-500 hover:text-slate-300 uppercase underline cursor-pointer"
                >
                  Audit another process
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-900/80 font-mono text-[10px] space-y-1">
                  <span className="text-slate-500 block uppercase">FEASIBILITY SCORE</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-cyan-400">{leadReport.feasibilityRating}</span>
                    <span className="text-slate-500 text-[10px]">/ 10</span>
                  </div>
                </div>

                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-900/80 font-mono text-[10px] space-y-1">
                  <span className="text-slate-500 block uppercase font-bold">ARCHITECTURE LAYER</span>
                  <span className="text-slate-200 font-bold block truncate">{leadReport.architectureTier}</span>
                </div>

                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-900/80 font-mono text-[10px] space-y-1">
                  <span className="text-slate-500 block uppercase font-bold">PLATFORM ROADMAP FIT</span>
                  <span className="text-slate-200 font-bold block truncate">{leadReport.platformReuseFit}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Structural Assessment</span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-900/30 p-3.5 rounded-xl border border-slate-900/60">
                  {leadReport.technicalAssessment}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Suggested Technical Stack</span>
                  <div className="flex flex-wrap gap-1">
                    {leadReport.suggestedStack.map((tech: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 text-[9.5px] font-mono rounded bg-slate-900 text-cyan-300 border border-slate-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest block font-bold">Primary Latency Risk</span>
                  <div className="p-2.5 rounded bg-red-950/10 border border-red-500/20 flex gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-red-300 leading-normal">{leadReport.latencyRisk}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Appraisal generated successfully in real-time</span>
                </div>
                <a 
                  href="https://calendly.com/mashnu-ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs tracking-wider transition-all flex items-center gap-1.5 cursor-pointer font-sans"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Book discovery callback with Architect</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollReveal>

    </section>
  );
}

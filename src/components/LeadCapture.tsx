import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Settings, Send, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export default function LeadCapture() {
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadRole, setLeadRole] = useState('');
  const [leadUseCase, setLeadUseCase] = useState('');
  const [leadVolume, setLeadVolume] = useState('< 10k actions/month');
  const [leadSystem, setLeadSystem] = useState('Manual spreadsheets/operations');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadUseCase.trim()) return;

    setIsSubmittingLead(true);

    try {
      const res = await fetch('/api/contact', {
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
        throw new Error('Failed to send message.');
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <section id="lead-capture" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6 scroll-mt-24">

      {/* Left Info */}
      <ScrollReveal as="div" className="lg:col-span-5 flex flex-col justify-between space-y-6 p-6 rounded-2xl border border-slate-900 bg-white" yOffset={20} duration={0.25}>
        <div className="space-y-3">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">Talk to an engineer</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-slate-900 leading-tight">
            Describe what you want <br />
            to automate
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            No auto-generated reports, no jargon-filled scoring. Tell us the workflow and an engineer will reply personally with an honest read on fit and rough approach.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-900">
          <div className="flex items-start gap-2 text-xs">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-slate-700">A real reply from an engineer, not a bot</span>
          </div>
          <div className="flex items-start gap-2 text-xs">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-slate-700">Honest feedback if we're not the right fit</span>
          </div>
          <div className="flex items-start gap-2 text-xs">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-slate-700">Usually a reply within one business day</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Right Form */}
      <ScrollReveal as="div" className="lg:col-span-7 border border-slate-900 rounded-2xl bg-white p-6 flex flex-col justify-between relative" yOffset={20} duration={0.25}>

        <AnimatePresence mode="wait">
          {!submitted ? (
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
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 rounded border border-slate-800 text-slate-800 focus:outline-none focus:border-cyan-500 font-sans"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Work Email</label>
                  <input
                    type="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="e.g. sarah@company.com"
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 rounded border border-slate-800 text-slate-800 focus:outline-none focus:border-cyan-500 font-sans"
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
                    placeholder="e.g. Acme Inc."
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 rounded border border-slate-800 text-slate-800 focus:outline-none focus:border-cyan-500 font-sans"
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
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 rounded border border-slate-800 text-slate-800 focus:outline-none focus:border-cyan-500 font-sans"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Rough Monthly Volume</label>
                  <select
                    value={leadVolume}
                    onChange={(e) => setLeadVolume(e.target.value)}
                    className="w-full bg-white text-xs py-1.5 px-2 border border-slate-200 rounded text-slate-900 focus:outline-none focus:border-blue-500 font-mono"
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
                    className="w-full bg-white text-xs py-1.5 px-2 border border-slate-200 rounded text-slate-900 focus:outline-none focus:border-blue-500 font-mono"
                  >
                    <option value="Manual spreadsheets/operations">Manual spreadsheets/operators</option>
                    <option value="Offshore BPO contractors">Offshore BPO contractors</option>
                    <option value="Legacy software scripts (Python/SQL)">Legacy software scripts</option>
                    <option value="V1 AI wraps (Zapier / Custom GPTs)">V1 wrappers (Zapier/GPTs)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">What do you want to automate?</label>
                <textarea
                  value={leadUseCase}
                  onChange={(e) => setLeadUseCase(e.target.value)}
                  placeholder="Explain what operation needs automation (e.g., 'Reconcile invoice PDFs against HubSpot deals, trigger a billing webhook on Stripe if matched')"
                  className="w-full h-24 px-3 py-2 text-xs bg-slate-50 rounded border border-slate-800 text-slate-800 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-sans resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingLead}
                className="w-full py-2.5 rounded bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-900 font-bold text-xs tracking-wider transition-all disabled:opacity-40 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isSubmittingLead ? (
                  <>
                    <Settings className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send message</span>
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="lead-sent"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center space-y-4 h-full py-12"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-200">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-base font-bold font-display text-slate-900">Message sent</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-sm">
                  Thanks — we've got your message. An engineer will reply to your email, usually within a business day.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="text-[10px] font-mono text-slate-500 hover:text-slate-700 uppercase underline cursor-pointer"
              >
                Send another message
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollReveal>

    </section>
  );
}

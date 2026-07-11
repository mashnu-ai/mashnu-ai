import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Settings, Send, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export default function LeadCapture() {
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadInterest, setLeadInterest] = useState('For myself');
  const [leadUseCase, setLeadUseCase] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadUseCase.trim()) return;

    setIsSubmittingLead(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: leadName,
          email: leadEmail,
          phone: leadPhone,
          company: `Assistant early access, interest: ${leadInterest}`,
          useCase: leadUseCase,
          source: 'early_access',
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Failed to send message.');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setSubmitError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <section id="lead-capture" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6 scroll-mt-24">

      {/* Left Info */}
      <ScrollReveal as="div" className="lg:col-span-5 flex flex-col justify-between space-y-6 p-6 rounded-2xl border border-slate-900 bg-white" yOffset={20} duration={0.25}>
        <div className="space-y-3">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">Early access</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-slate-900 leading-tight">
            Tell us what you'd <br />
            hand off first
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            The assistant is rolling out gradually while we get it right. Tell us what you'd want it to take off your plate (calls, messages, reminders, the daily admin) and we'll reach out as we onboard people.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-900">
          <div className="flex items-start gap-2 text-xs">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-slate-700">A real reply from our team, not an auto-responder</span>
          </div>
          <div className="flex items-start gap-2 text-xs">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-slate-700">Works for individuals and small businesses alike</span>
          </div>
          <div className="flex items-start gap-2 text-xs">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-slate-700">Honest word on timing, no fake waitlist games</span>
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
                    placeholder="e.g. Crispy"
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 rounded border border-slate-800 text-slate-800 focus:outline-none focus:border-cyan-500 font-sans"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Email</label>
                  <input
                    type="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="e.g. crispy@gmail.com"
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 rounded border border-slate-800 text-slate-800 focus:outline-none focus:border-cyan-500 font-sans"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Phone <span className="text-slate-600 normal-case">(optional)</span></label>
                <input
                  type="tel"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 rounded border border-slate-800 text-slate-800 focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Who is it for?</label>
                <select
                  value={leadInterest}
                  onChange={(e) => setLeadInterest(e.target.value)}
                  className="w-full bg-white text-xs py-1.5 px-2 border border-slate-200 rounded text-slate-900 focus:outline-none focus:border-blue-500 font-sans"
                >
                  <option value="For myself">For myself</option>
                  <option value="For my family / household">For my family or household</option>
                  <option value="For my business">For my business</option>
                  <option value="Both personal and business">Both personal and business</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">What would you hand off to an assistant?</label>
                <textarea
                  value={leadUseCase}
                  onChange={(e) => setLeadUseCase(e.target.value)}
                  placeholder="e.g. 'Answer calls when I'm busy and take proper messages', 'Reply to customer WhatsApp messages after hours', 'Keep track of appointments and remind me'"
                  className="w-full h-24 px-3 py-2 text-xs bg-slate-50 rounded border border-slate-800 text-slate-800 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-sans resize-none"
                  required
                />
              </div>

              {submitError && <p className="text-xs text-red-600">{submitError}</p>}

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
                    <span>Request early access</span>
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
                <h4 className="text-base font-bold font-display text-slate-900">You're on the list</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-sm">
                  Thanks, we've got your request. We'll email you with an honest update on timing, usually within a business day.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="text-[10px] font-mono text-slate-500 hover:text-slate-700 uppercase underline cursor-pointer"
              >
                Send another request
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollReveal>

    </section>
  );
}

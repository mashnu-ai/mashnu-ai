import React, { useState } from 'react';
import {
  Send, Mail, Building, User, Briefcase,
  CheckCircle2, AlertTriangle, RotateCcw
} from 'lucide-react';

export default function Contact() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [useCase, setUseCase] = useState('');
  const [estimatedVolume, setEstimatedVolume] = useState('10,000 / month');
  const [currentSystem, setCurrentSystem] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!useCase.trim()) {
      setError('Tell us what you want to automate — we need at least a sentence to route this to the right person.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          company,
          role,
          useCase,
          estimatedVolume,
          currentSystem
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Something went wrong sending your message. Please try again.');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setCompany('');
    setRole('');
    setUseCase('');
    setEstimatedVolume('10,000 / month');
    setCurrentSystem('');
    setSubmitted(false);
    setError(null);
  };

  return (
    <div className="relative min-h-screen text-[#0F172A] font-sans selection:bg-[#2563EB]/20 selection:text-[#2563EB] py-16">

      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Page Title */}
        <section className="text-center space-y-4">
          <span className="text-[11px] font-semibold text-[#2563EB] uppercase tracking-wider block">
            Contact us
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.02em] text-[#0F172A] leading-tight">
            Tell us what you want to automate
          </h1>
          <p className="text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            No forms full of jargon, no auto-generated reports. Describe the workflow, and an engineer will get back to you — usually within a business day — with an honest read on whether we're a good fit.
          </p>
        </section>

        <div className="border border-[#E2E8F0] rounded-[28px] bg-white p-6 sm:p-8 shadow-sm">

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full name and email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B] block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-2.5 w-4 h-4 text-[#94A3B8]" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2 pl-10 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B] block">Work Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-2.5 w-4 h-4 text-[#94A3B8]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@company.com"
                      className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2 pl-10 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Company and role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B] block">Company</label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-2.5 w-4 h-4 text-[#94A3B8]" />
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Inc."
                      className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2 pl-10 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B] block">Role / Title</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-2.5 w-4 h-4 text-[#94A3B8]" />
                    <input
                      type="text"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="VP of Operations"
                      className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2 pl-10 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Expected Volume and Current System */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B] block">Rough Monthly Volume</label>
                  <select
                    value={estimatedVolume}
                    onChange={(e) => setEstimatedVolume(e.target.value)}
                    className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                  >
                    <option value="Under 5,000 / month">Under 5,000 / month</option>
                    <option value="10,000 / month">10,000 / month</option>
                    <option value="50,000 / month">50,000 / month</option>
                    <option value="100,000+ / month">100,000+ / month</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B] block">Current System / Tools</label>
                  <input
                    type="text"
                    value={currentSystem}
                    onChange={(e) => setCurrentSystem(e.target.value)}
                    placeholder="e.g. HubSpot, manual spreadsheets"
                    className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* What you want to automate */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B] block">What do you want to automate?</label>
                <textarea
                  required
                  rows={5}
                  value={useCase}
                  onChange={(e) => setUseCase(e.target.value)}
                  placeholder="Describe the workflow — the manual step, the tools involved, and roughly how often it happens."
                  className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:bg-white leading-relaxed resize-none transition-all"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs leading-relaxed">
                  <AlertTriangle className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                  {error}
                </div>
              )}

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-full font-semibold text-xs tracking-tight flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    loading
                      ? 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0] cursor-not-allowed'
                      : 'bg-[#0F172A] hover:bg-[#334155] text-white shadow-xs'
                  }`}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-[#94A3B8] border-t-[#2563EB] animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Send message
                    </>
                  )}
                </button>
              </div>

            </form>
          ) : (
            // Success Screen
            <div className="space-y-6 text-center py-8">
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold tracking-tight text-[#0F172A]">Message sent</h3>
                <p className="text-sm text-[#64748B] leading-relaxed max-w-md mx-auto">
                  Thanks — we've got your message. An engineer will reply to your email, usually within a business day.
                </p>
              </div>
              <div className="pt-4">
                <button
                  onClick={resetForm}
                  className="inline-flex px-5 py-2.5 rounded-full bg-[#0F172A] hover:bg-[#334155] text-white text-xs font-semibold tracking-tight items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Send another message
                </button>
              </div>
            </div>
          )}

        </div>

      </main>

    </div>
  );
}

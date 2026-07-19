import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from '../components/Router';
import { Calculator, TrendingDown, CheckCircle2, ArrowRight, Globe2, Users } from 'lucide-react';
import { useSEO } from '../components/SEO';
import { formatCurrency, currencySymbol, CURRENCY_LOCALES, CURRENCY_NAMES } from '../lib/currencyFormat';

const WAGE_GROWTH_RATE = 0.04; // Assumes 4% annual salary growth for human-staffed roles
const HOURS_PER_YEAR = 52 * 40;
const HOURS_PER_MONTH = HOURS_PER_YEAR / 12;
const DEFAULT_ANNUAL_SALARY_USD = 50000;
const DEFAULT_MONTHLY_MASHNU_COST_USD = 2500; // Typical estimate for an AI employee

export default function AIEmployeeCostCalculator() {
  useSEO({
    title: 'AI Employee Cost Calculator',
    description: 'Compare the cost of hiring AI employees vs. human staff. See your savings over 5 years.',
    path: '/ai-employee-cost-calculator',
    noindex: true,
  });

  const [numberOfHumanStaff, setNumberOfHumanStaff] = useState(3);
  const [numberOfAIEmployees, setNumberOfAIEmployees] = useState(3);
  const [avgAnnualSalary, setAvgAnnualSalary] = useState(DEFAULT_ANNUAL_SALARY_USD);
  const [monthlyMashnutCost, setMonthlyMashnutCost] = useState(DEFAULT_MONTHLY_MASHNU_COST_USD);

  const [currencyCode, setCurrencyCode] = useState('USD');
  const [rates, setRates] = useState<Record<string, number>>({ USD: 1 });
  const [countryName, setCountryName] = useState<string | null>(null);

  const [showLeadForm, setShowLeadForm] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/geo')
      .then((res) => res.json())
      .then((geo: { countryCode: string; countryName: string; currencyCode: string; rates: Record<string, number> }) => {
        if (cancelled || !geo?.currencyCode) return;
        setCurrencyCode(geo.currencyCode);
        setRates(geo.rates || { USD: 1 });
        setCountryName(geo.countryCode === 'US' ? null : geo.countryName);
        const rate = geo.rates?.[geo.currencyCode];
        if (rate) {
          setAvgAnnualSalary(Math.round((DEFAULT_ANNUAL_SALARY_USD * rate) / 100) * 100);
          setMonthlyMashnutCost(Math.round((DEFAULT_MONTHLY_MASHNU_COST_USD * rate) / 100) * 100);
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const handleCurrencyChange = (newCurrency: string) => {
    const oldRate = rates[currencyCode] || 1;
    const newRate = rates[newCurrency] || 1;
    setAvgAnnualSalary((prev) => Math.round((prev * (newRate / oldRate)) / 100) * 100);
    setMonthlyMashnutCost((prev) => Math.round((prev * (newRate / oldRate)) / 100) * 100);
    setCurrencyCode(newCurrency);
  };

  const results = useMemo(() => {
    const annualHumanCost = numberOfHumanStaff * avgAnnualSalary;
    const monthlyHumanCost = annualHumanCost / 12;
    const annualMashnutCost = numberOfAIEmployees * monthlyMashnutCost * 12;
    const monthlySavings = monthlyHumanCost - (numberOfAIEmployees * monthlyMashnutCost);

    const yearly: number[] = [];
    for (let year = 1; year <= 5; year++) {
      const inflatedAnnualHumanCost = annualHumanCost * Math.pow(1 + WAGE_GROWTH_RATE, year - 1);
      const costDiff = (inflatedAnnualHumanCost - annualMashnutCost);
      yearly.push(costDiff);
    }
    const fiveYearTotal = yearly.reduce((a, b) => a + b, 0);

    return {
      monthlyHumanCost,
      annualHumanCost,
      annualMashnutCost,
      monthlySavings,
      yearly,
      fiveYearTotal,
    };
  }, [numberOfHumanStaff, numberOfAIEmployees, avgAnnualSalary, monthlyMashnutCost]);

  const maxYearly = Math.max(...results.yearly, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          useCase: `AI Employee Cost Calculator: ${numberOfHumanStaff} human staff @ ${formatCurrency(avgAnnualSalary, currencyCode)}/yr vs. ${numberOfAIEmployees} AI employees @ ${formatCurrency(monthlyMashnutCost, currencyCode)}/mo. Estimated 5-year savings: ${formatCurrency(results.fiveYearTotal, currencyCode)}.`,
          source: 'ai_employee_calculator',
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to submit.');
      }
      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err?.message || "Something went wrong. Please try again, or reach us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen text-[#0F172A] font-sans selection:bg-[#2563EB]/20 selection:text-[#2563EB] py-16">
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header */}
        <section className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/15 text-[10px] font-mono uppercase tracking-widest text-[#2563EB]">
            <Calculator className="w-3.5 h-3.5" />
            Cost Calculator
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.02em] text-[#0F172A] leading-tight">
            AI Employees vs. Human Hires
          </h1>
          <p className="text-sm text-[#64748B] leading-relaxed">
            Compare your current team headcount to an AI-powered alternative. See the real cost difference over 5 years, accounting for salary growth.
          </p>
        </section>

        {/* Calculator Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Inputs */}
          <div className="lg:col-span-5 border border-[#E2E8F0] rounded-[24px] bg-white p-6 sm:p-8 space-y-5">
            <h2 className="text-sm font-semibold text-[#0F172A] uppercase tracking-wider">Your scenario</h2>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#334155]">Number of human staff today</label>
              <input
                type="number"
                min={0}
                value={numberOfHumanStaff}
                onChange={(e) => setNumberOfHumanStaff(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-sm outline-none focus:border-[#2563EB] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#334155]">Number of AI employees you'd hire</label>
              <input
                type="number"
                min={0}
                value={numberOfAIEmployees}
                onChange={(e) => setNumberOfAIEmployees(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-sm outline-none focus:border-[#2563EB] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[#334155]">Average annual salary per staff member</label>
                <select
                  value={currencyCode}
                  onChange={(e) => handleCurrencyChange(e.target.value)}
                  className="text-[10px] font-mono uppercase tracking-wider text-[#2563EB] bg-transparent outline-none cursor-pointer"
                >
                  {Object.keys(rates).sort().map((code) => (
                    <option key={code} value={code}>{code}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8]">{currencySymbol(currencyCode)}</span>
                <input
                  type="number"
                  min={0}
                  value={avgAnnualSalary}
                  onChange={(e) => setAvgAnnualSalary(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-sm outline-none focus:border-[#2563EB] transition-colors"
                />
              </div>
              {countryName && (
                <p className="text-[10px] text-[#94A3B8] flex items-center gap-1">
                  <Globe2 className="w-3 h-3" />
                  Detected {countryName}, showing {CURRENCY_NAMES[currencyCode] || currencyCode}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#334155]">Monthly cost per AI employee (typical estimate)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8]">{currencySymbol(currencyCode)}</span>
                <input
                  type="number"
                  min={0}
                  value={monthlyMashnutCost}
                  onChange={(e) => setMonthlyMashnutCost(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-sm outline-none focus:border-[#2563EB] transition-colors"
                />
              </div>
              <p className="text-[10px] text-[#94A3B8]">
                This is a typical estimate. Your actual cost depends on complexity, integrations, and support. We'll give you an exact quote after a call.
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 space-y-4">
            <motion.div
              key={Math.round(results.fiveYearTotal)}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="border border-[#2563EB]/20 rounded-[24px] bg-gradient-to-br from-[#2563EB] to-[#4F46E5] p-6 sm:p-8 text-white space-y-1"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/70">Estimated 5-year savings</span>
              <div className="text-4xl sm:text-5xl font-bold tracking-tight">{formatCurrency(results.fiveYearTotal, currencyCode)}</div>
              <p className="text-xs text-white/80">≈ {formatCurrency(results.monthlySavings, currencyCode)} saved every month, starting now</p>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              <div className="border border-[#E2E8F0] rounded-2xl bg-white p-4 space-y-1">
                <Users className="w-4 h-4 text-[#2563EB]" />
                <div className="text-lg font-semibold text-[#0F172A]">{formatCurrency(results.annualHumanCost, currencyCode)}</div>
                <div className="text-[10px] text-[#64748B]">annual cost (human team)</div>
              </div>
              <div className="border border-[#E2E8F0] rounded-2xl bg-white p-4 space-y-1">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                <div className="text-lg font-semibold text-[#0F172A]">{formatCurrency(results.annualMashnutCost, currencyCode)}</div>
                <div className="text-[10px] text-[#64748B]">annual cost (AI team)</div>
              </div>
            </div>

            {/* Year-by-year bar chart */}
            <div className="border border-[#E2E8F0] rounded-2xl bg-white p-5 space-y-4">
              <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">Year-by-year savings</span>
              <div className="flex items-end gap-3 h-32">
                {results.yearly.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1.5 h-full">
                    <span className="text-[9px] font-semibold text-[#334155]">{formatCurrency(val, currencyCode)}</span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.max(6, (val / Math.max(maxYearly, 1)) * 100)}%` }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full rounded-t-lg bg-gradient-to-t from-[#2563EB] to-[#60A5FA]"
                    />
                    <span className="text-[9px] text-[#94A3B8]">Year {i + 1}</span>
                  </div>
                ))}
              </div>
              <p className="text-[9px] text-[#94A3B8] leading-relaxed">
                Assumes {(WAGE_GROWTH_RATE * 100).toFixed(0)}% annual salary growth for human staff. AI employee costs remain fixed in this estimate.
              </p>
            </div>
          </div>
        </section>

        {/* Lead capture CTA */}
        <section className="border border-[#E2E8F0] rounded-[24px] bg-[#F1F5F9] p-6 sm:p-10 max-w-2xl mx-auto text-center space-y-4">
          {submitted ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              <h3 className="text-lg font-semibold text-[#0F172A]">Sent, thanks!</h3>
              <p className="text-xs text-[#64748B] max-w-sm">
                We've saved your estimate and a real person will follow up within a business day with an exact quote and deployment plan for your team.
              </p>
            </div>
          ) : showLeadForm ? (
            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              <h3 className="text-lg font-semibold text-[#0F172A] text-center">Get an exact AI team quote</h3>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-sm outline-none focus:border-[#2563EB] transition-colors"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-sm outline-none focus:border-[#2563EB] transition-colors"
              />
              {submitError && <p className="text-xs text-red-600">{submitError}</p>}
              <button
                type="submit"
                disabled={!email.trim() || submitting}
                className={`w-full py-3 rounded-full text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  !email.trim() || submitting
                    ? 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
                    : 'bg-[#0F172A] hover:bg-[#2563EB] text-white'
                }`}
              >
                {submitting ? 'Sending...' : 'Send my estimate'}
                {!submitting && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </form>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-[#0F172A]">Ready for an exact quote?</h3>
              <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                Share your estimate and we'll follow up with real pricing based on your specific roles, integrations, and support needs.
              </p>
              <button
                onClick={() => setShowLeadForm(true)}
                className="inline-flex px-6 py-2.5 rounded-full bg-[#0F172A] hover:bg-[#2563EB] text-white text-xs font-semibold tracking-wide transition-colors items-center gap-1.5 cursor-pointer"
              >
                Email me a quote
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="pt-2">
                <Link to="/contact" className="text-xs text-[#2563EB] hover:underline">
                  Or talk to us directly
                </Link>
              </div>
            </>
          )}
        </section>

      </main>
    </div>
  );
}

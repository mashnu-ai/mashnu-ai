import React from 'react';
import { TrendingUp, Ear, HeartHandshake, ArrowRight } from 'lucide-react';

const PROMISES = [
  {
    icon: Ear,
    title: "We start by listening",
    description: "No pitch, no fixed package. Tell us how your business actually runs day to day, and we'll figure out where automation genuinely pays off before we talk product.",
  },
  {
    icon: TrendingUp,
    title: "Built around your revenue",
    description: "Every hour saved and every lead followed up on faster is money. We shape what we build around what moves the number that matters to you.",
  },
  {
    icon: HeartHandshake,
    title: "No pressure to buy anything",
    description: "If it turns out automation isn't the right move for you yet, we'll tell you that too. We'd rather be honest than sell you something you don't need.",
  },
];

export default function ProductSuite() {
  const handleCTAClick = () => {
    document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono uppercase tracking-widest text-cyan-500">
          For business owners
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-slate-900">
          Tell us about your business. We'll tell you where the revenue is.
        </h2>
        <p className="text-sm text-slate-400 font-sans leading-relaxed">
          We spend time understanding how things actually work on the ground before suggesting anything, because real businesses don't run on templates, and neither should the help they get.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {PROMISES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 hover:border-cyan-500/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-cyan-500" />
            </div>
            <h3 className="text-sm font-bold font-display text-slate-900">{title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">{description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handleCTAClick}
          className="px-6 py-3 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/10 cursor-pointer"
        >
          <span>Talk to us about your business</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-[10px] text-slate-400">No commitment. Just a real conversation.</p>
      </div>
    </div>
  );
}

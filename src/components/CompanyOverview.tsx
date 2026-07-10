import React from 'react';
import { Link } from './Router';
import { Heart, Users, MapPin, ArrowRight } from 'lucide-react';

export default function CompanyOverview() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 animate-fade-in">

      <div className="text-center space-y-3">
        <span className="text-[10px] font-mono text-cyan-600 uppercase tracking-widest font-bold block">Who we are</span>
        <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-slate-900">
          Mashnu AI builds a personal assistant for real life
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
          Most AI products are built for businesses first. We started with a simpler question: what would it take for an AI assistant to actually help a person get through their day (answering calls, replying to messages, keeping track of what matters) without adding one more thing to manage?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
          <Heart className="w-5 h-5 text-cyan-600" />
          <h4 className="text-xs font-bold font-display uppercase tracking-wider text-slate-900">What we're building</h4>
          <p className="text-xs text-slate-500 leading-relaxed font-sans">
            A personal AI assistant that handles calls and messages on your behalf, remembers context so you don't repeat yourself, and helps with the everyday tasks that eat up your time.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
          <Users className="w-5 h-5 text-cyan-600" />
          <h4 className="text-xs font-bold font-display uppercase tracking-wider text-slate-900">Who it's for</h4>
          <p className="text-xs text-slate-500 leading-relaxed font-sans">
            Anyone who wants fewer things to keep track of: busy professionals, small business owners, and households juggling calls, appointments, and messages across too many apps.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
          <MapPin className="w-5 h-5 text-cyan-600" />
          <h4 className="text-xs font-bold font-display uppercase tracking-wider text-slate-900">Where we're at</h4>
          <p className="text-xs text-slate-500 leading-relaxed font-sans">
            We're a small, early-stage team building this in public. We'd rather move fast and be honest about what's ready than promise more than we can deliver today.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          to="/about"
          className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold tracking-tight transition-colors flex items-center gap-1.5"
        >
          More about Mashnu
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          to="/assistant"
          className="px-5 py-2.5 rounded-full border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold tracking-tight transition-colors"
        >
          Try the assistant
        </Link>
      </div>

    </div>
  );
}

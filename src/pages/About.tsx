import React from 'react';
import { Link } from '../components/Router';
import { useSEO } from '../components/SEO';
import {
  Compass, ArrowRight, Code, Shield, Landmark, Terminal, Cpu, Layers, HeartHandshake
} from 'lucide-react';

export default function About() {
  useSEO({
    title: 'About Mashnu AI',
    description: 'Mashnu AI was started to build automation that actually holds up, not fragile scripts glued together by an agency. Meet the founder and the platform-first approach behind it.',
    path: '/about',
  });

  return (
    <div className="relative min-h-screen text-slate-900 font-sans selection:bg-blue-500/20 selection:text-blue-900 py-16">
      
      {/* Background visual components */}
      <div className="absolute top-1/4 right-1/10 w-80 h-80 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/12 w-96 h-96 rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none z-0" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-800 text-[10px] font-mono uppercase tracking-widest text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Who We Are</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            Built to last, not to launch
          </h1>
          <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Mashnu AI started because too many businesses were paying agencies a lot of money for automation that broke the moment something changed underneath it. We wanted to build it the way real infrastructure gets built: to hold up.
          </p>
        </section>

        {/* FOUNDER STORY: KIRAN, CTO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-slate-900 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[40px] pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold block">The Founder</span>
              <h2 className="text-2xl font-bold font-display tracking-tight text-slate-900">Kiran<br />CTO & Founder</h2>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Before starting Mashnu, Kiran spent over a decade building the kind of systems that aren't allowed to go down: fast, reliable databases and the networks that route traffic between them.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Watching business owners get charged a fortune for automation that was really just a few scripts glued together, held together by hope, was the reason Kiran started Mashnu. The idea is simple: bring that same "this has to actually hold up" standard to AI automation.
              </p>
            </div>
            
            <div className="border-t border-slate-900 pt-4 mt-6">
              <span className="text-xs font-semibold text-slate-700 block">Kiran</span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">CTO / Founder, Mashnu AI</span>
            </div>
          </div>

          <div className="lg:col-span-7 border border-slate-900 rounded-2xl bg-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 blur-[50px] pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold block">The Approach</span>
              <h3 className="text-lg font-bold font-display tracking-wide text-slate-900">Why we don't do one-off projects</h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                <p>
                  "A lot of AI automation out there is a quick demo dressed up as a product. It works in the pitch, then breaks the first time a model updates or a connection drops, and there's nobody left to fix it."
                </p>
                <p>
                  We don't build one-off scripts that only work for one client, once.
                </p>
                <p>
                  Every piece we build for a client becomes part of a shared, reusable platform, so it's tested, maintained, and gets more reliable over time instead of quietly rotting.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-400 flex items-center gap-3 mt-6">
              <Terminal className="w-5 h-5 text-cyan-400 shrink-0" />
              <p className="text-[10px] leading-relaxed font-sans">
                "We don't build projects. We build things once, properly, so they keep working."
              </p>
            </div>
          </div>

        </section>

        {/* WHY WE BUILD PLATFORMS, NOT PROJECTS */}
        <section className="border border-slate-900 rounded-2xl bg-white backdrop-blur-md p-6 sm:p-10 max-w-5xl mx-auto space-y-6 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[70px] pointer-events-none" />
          
          <div className="flex items-center gap-3 border-b border-slate-900 pb-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Layers className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display tracking-wide text-slate-900">Platforms, not projects</h3>
              <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Why It Matters</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
            <div className="space-y-3">
              <h4 className="text-slate-800 font-bold font-display">What most "projects" actually are</h4>
              <p>
                A one-off project is built for exactly one client, exactly once. It's high-maintenance, held together by custom glue code, and it breaks the moment something it depends on changes.
              </p>
              <p>
                We don't do that. Everything we build feeds back into one shared platform, so what we learn on one client's setup makes every future build faster and more solid.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-slate-800 font-bold font-display">What that means for you</h4>
              <p>
                Because the pieces we build for you run on that same platform, you get the benefit of ongoing improvements, security fixes, and better underlying models without having to redo any of the work.
              </p>
              <p>
                Fixes and upgrades reach your automation on their own. You never have to rebuild anything just because we improved something elsewhere.
              </p>
            </div>
          </div>
        </section>

        {/* CORE ENGINEERING PHILOSOPHIES */}
        <section className="space-y-8 max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-slate-900">How we actually work</h2>
            <p className="text-xs text-slate-400 font-sans">
              A few things we don't compromise on, no matter who the client is.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="border border-slate-900 rounded-xl bg-white p-6 space-y-3">
              <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Code className="w-4 h-4 text-cyan-400" />
              </div>
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900">Predictable, not guesswork</h4>
              <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans">
                We don't let an AI model wing every decision. The important paths are mapped out and validated up front, so behavior stays consistent instead of surprising you.
              </p>
            </div>

            <div className="border border-slate-900 rounded-xl bg-white p-6 space-y-3">
              <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900">No markup on AI costs</h4>
              <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans">
                We never add a margin on top of what AI models or infrastructure actually cost. You pay the real rate, plus a transparent fee for the work.
              </p>
            </div>

            <div className="border border-slate-900 rounded-xl bg-white p-6 space-y-3">
              <div className="w-8 h-8 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Landmark className="w-4 h-4 text-indigo-400" />
              </div>
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900">We're selective on purpose</h4>
              <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans">
                We take on clients we can genuinely help, not everyone who asks. Every build makes the platform better for the next client too, so quality matters more to us than volume.
              </p>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="border border-slate-900 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 p-8 sm:p-10 text-center space-y-5 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold font-display tracking-tight text-white">
            Want to talk to the people actually building this?
          </h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed font-sans">
            No sales team standing between you and the engineers. Tell us what you're dealing with and we'll tell you honestly if we can help.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex px-5 py-2.5 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-xs tracking-wider transition-all items-center gap-1.5 shadow-lg shadow-cyan-500/10"
            >
              Get in touch
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

      </main>

    </div>
  );
}

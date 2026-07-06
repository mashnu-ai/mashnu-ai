import React from 'react';
import { Link } from './Router';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#E8E8ED] bg-[#F5F5F7] pt-16 pb-12 mt-20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-[#E8E8ED] pb-12 mb-10">
          
          {/* Logo / Company Bio column */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1D1D1F] flex items-center justify-center">
                <span className="font-sans font-extrabold text-sm text-white">M</span>
              </div>
              <span className="font-sans font-semibold text-lg tracking-tight text-[#1D1D1F]">
                MASHNU <span className="text-[#0071E3] font-sans text-base font-medium ml-0.5">AI</span>
              </span>
            </Link>
            <p className="text-xs text-[#6E6E73] font-sans leading-relaxed max-w-sm">
              Mashnu AI engineers highly reliable, low-latency autonomous AI voice, conversational messaging, and back-office multi-agent pipelines for enterprise and mid-market operations.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-2 py-0.5 text-[9px] font-sans rounded-full bg-white border border-[#E8E8ED] text-[#1D1D1F] flex items-center gap-1">
                <Shield className="w-3 h-3 text-[#0071E3]" />
                SOC2 Type II
              </span>
              <span className="px-2 py-0.5 text-[9px] font-sans rounded-full bg-white border border-[#E8E8ED] text-[#1D1D1F] flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-600" />
                HIPAA Compliant
              </span>
              <span className="px-2 py-0.5 text-[9px] font-sans rounded-full bg-white border border-[#E8E8ED] text-[#1D1D1F] flex items-center gap-1">
                <Shield className="w-3 h-3 text-indigo-600" />
                GDPR Confirmed
              </span>
            </div>
          </div>

          {/* Links Column: Core Directory */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#1D1D1F]">Capabilities & Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/products" className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">The 10-Item Product Suite</Link>
              </li>
              <li>
                <Link to="/solutions" className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">Industry & Case Solutions</Link>
              </li>
              <li>
                <Link to="/platform" className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">SaaS, RAG & Multi-Agent Stack</Link>
              </li>
              <li>
                <Link to="/vision" className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">The Long-Term Roadmap</Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">Client Operational Case Studies</Link>
              </li>
            </ul>
          </div>

          {/* Links Column: Company & Capital */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#1D1D1F]">Engineering & Story</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">Founder Story & Philosophy</Link>
              </li>
              <li>
                <Link to="/blog" className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">Technical Build-In-Public Blog</Link>
              </li>
              <li>
                <Link to="/careers" className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">Careers / Hiring Hub</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">Tiered Cost & Booking</Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">Contact Systems Architect</Link>
              </li>
            </ul>
          </div>

          {/* Tech stack declaration Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#1D1D1F]">Core Micro-Agent Stack</h4>
            <p className="text-[11px] text-[#6E6E73] leading-relaxed font-sans">
              Python 3.12, FastAPI, LangGraph state topologies, Qdrant vector retrieval, Redis caching, and low-latency WebSockets.
            </p>
            <div className="border border-[#E8E8ED] rounded-xl p-3 bg-white text-[10px] font-sans text-[#6E6E73] space-y-1">
              <div className="flex justify-between">
                <span>Core Gateway Node:</span>
                <span className="text-[#0071E3] font-medium">US-EAST-4</span>
              </div>
              <div className="flex justify-between">
                <span>Inference Fallback:</span>
                <span className="text-emerald-600 font-medium">Active HA</span>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-sans text-[#6E6E73]">
          <p>© 2026 Mashnu AI Systems Inc. All rights reserved. Registered Entity.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">System Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

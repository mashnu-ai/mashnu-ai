import React from 'react';
import { Link } from './Router';
import { Shield } from 'lucide-react';
import BrandMark from './BrandMark';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#E2E8F0] bg-[#F1F5F9] pt-16 pb-12 mt-20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-[#E2E8F0] pb-12 mb-10">
          
          {/* Logo / Company Bio column */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <BrandMark className="w-9 h-9" />
              <span className="font-display font-semibold text-lg tracking-tight text-[#0F172A]">
                Mashnu
                <span className="font-mono text-[10px] font-medium text-[#2563EB] uppercase tracking-widest ml-1.5 align-middle">AI</span>
              </span>
            </Link>
            <span className="block text-[9px] font-mono uppercase tracking-[0.32em] text-[#94A3B8]">
              Built from the ground up
            </span>
            <p className="text-xs text-[#64748B] font-sans leading-relaxed max-w-sm">
              Mashnu AI engineers highly reliable, low-latency autonomous AI voice, conversational messaging, and back-office multi-agent pipelines for enterprise and mid-market operations.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-2 py-0.5 text-[9px] font-sans rounded-full bg-white border border-[#E2E8F0] text-[#0F172A] flex items-center gap-1">
                <Shield className="w-3 h-3 text-[#2563EB]" />
                SOC2 Type II
              </span>
              <span className="px-2 py-0.5 text-[9px] font-sans rounded-full bg-white border border-[#E2E8F0] text-[#0F172A] flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-600" />
                HIPAA Compliant
              </span>
              <span className="px-2 py-0.5 text-[9px] font-sans rounded-full bg-white border border-[#E2E8F0] text-[#0F172A] flex items-center gap-1">
                <Shield className="w-3 h-3 text-indigo-600" />
                GDPR Confirmed
              </span>
            </div>
          </div>

          {/* Links Column: Core Directory */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#0F172A]">Capabilities & Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/products" className="text-[#64748B] hover:text-[#0F172A] transition-colors">The 10-Item Product Suite</Link>
              </li>
              <li>
                <Link to="/solutions" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Industry & Case Solutions</Link>
              </li>
              <li>
                <Link to="/platform" className="text-[#64748B] hover:text-[#0F172A] transition-colors">SaaS, RAG & Multi-Agent Stack</Link>
              </li>
              <li>
                <Link to="/vision" className="text-[#64748B] hover:text-[#0F172A] transition-colors">The Long-Term Roadmap</Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Client Operational Case Studies</Link>
              </li>
            </ul>
          </div>

          {/* Links Column: Company & Capital */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#0F172A]">Engineering & Story</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Founder Story & Philosophy</Link>
              </li>
              <li>
                <Link to="/blog" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Technical Build-In-Public Blog</Link>
              </li>
              <li>
                <Link to="/careers" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Careers / Hiring Hub</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Tiered Cost & Booking</Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Contact Systems Architect</Link>
              </li>
            </ul>
          </div>

          {/* Tech stack declaration Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#0F172A]">Core Micro-Agent Stack</h4>
            <p className="text-[11px] text-[#64748B] leading-relaxed font-sans">
              Python 3.12, FastAPI, LangGraph state topologies, Qdrant vector retrieval, Redis caching, and low-latency WebSockets.
            </p>
            <div className="border border-[#E2E8F0] rounded-xl p-3 bg-white text-[10px] font-sans text-[#64748B] space-y-1">
              <div className="flex justify-between">
                <span>Core Gateway Node:</span>
                <span className="text-[#2563EB] font-medium">US-EAST-4</span>
              </div>
              <div className="flex justify-between">
                <span>Inference Fallback:</span>
                <span className="text-emerald-600 font-medium">Active HA</span>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-sans text-[#64748B]">
          <p>© 2026 Mashnu AI Systems Inc. All rights reserved. Registered Entity.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#0F172A] transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-[#0F172A] transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-[#0F172A] transition-colors">System Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

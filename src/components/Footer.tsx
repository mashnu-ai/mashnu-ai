import React from 'react';
import { Link } from './Router';
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
              Mashnu AI builds a personal AI assistant for real life — and the AI voice, WhatsApp, and back-office agents that power it for businesses too.
            </p>
          </div>

          {/* Links Column: Core Directory */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#0F172A]">Capabilities & Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/products" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/solutions" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Solutions by industry</Link>
              </li>
              <li>
                <Link to="/platform" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Platform</Link>
              </li>
              <li>
                <Link to="/vision" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Roadmap</Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Case studies</Link>
              </li>
            </ul>
          </div>

          {/* Links Column: Company & Capital */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#0F172A]">Engineering & Story</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="text-[#64748B] hover:text-[#0F172A] transition-colors">About</Link>
              </li>
              <li>
                <Link to="/blog" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/careers" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Contact us</Link>
              </li>
            </ul>
          </div>

          {/* Tech stack declaration Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#0F172A]">Built with</h4>
            <p className="text-[11px] text-[#64748B] leading-relaxed font-sans">
              Python, FastAPI, LangGraph, Qdrant, and Redis.
            </p>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-sans text-[#64748B]">
          <p>© 2026 Mashnu AI. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#0F172A] transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-[#0F172A] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

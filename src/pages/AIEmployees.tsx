import React from 'react';
import { motion } from 'motion/react';
import { Link } from '../components/Router';
import { ArrowRight, Zap, Brain, MessageSquare } from 'lucide-react';
import { useSEO } from '../components/SEO';
import { PRODUCTS, PRODUCT_IMAGES } from './Products';
import LatencyBenchmarks from '../components/LatencyBenchmarks';
import { ScrollReveal } from '../components/ScrollReveal';

// Map each product to its "AI Employee" role name and tagline
const ROLE_MAP: Record<string, { roleName: string; tagline: string }> = {
  'voice-agents': {
    roleName: 'AI Receptionist',
    tagline: 'Answers and makes calls, checks records, books appointments'
  },
  'whatsapp-agents': {
    roleName: 'AI Sales & Support Rep',
    tagline: 'Runs your WhatsApp line — sells and supports, reads images and invoices'
  },
  'ai-chatbots': {
    roleName: 'AI Support Agent (Web)',
    tagline: 'Resolves multi-tier support queries on your site, routes high-value leads'
  },
  'website-ai-assistants': {
    roleName: 'AI Concierge',
    tagline: 'Watches on-site behavior, proactively converts, syncs leads to CRM'
  },
  'crm-orchestrator': {
    roleName: 'AI Ops Coordinator',
    tagline: 'Cleans CRM data, transcribes meetings, turns notes into follow-ups'
  },
  'helpdesk-agent': {
    roleName: 'AI Helpdesk Agent',
    tagline: 'Drafts replies, tags and escalates tickets, watches SLAs'
  },
  'lead-enrichment-engine': {
    roleName: 'AI SDR',
    tagline: 'Enriches records, finds buying signals, keeps pipeline current'
  },
  'enterprise-search': {
    roleName: 'AI Research Analyst',
    tagline: 'Answers questions over internal docs with citations'
  }
};

// Products that are shown as hireable roles
const CUSTOMER_FACING_ROLES = [
  'voice-agents',
  'whatsapp-agents',
  'ai-chatbots',
  'website-ai-assistants',
  'crm-orchestrator',
  'helpdesk-agent',
  'lead-enrichment-engine',
  'enterprise-search'
];

export default function AIEmployees() {
  useSEO({
    title: 'Hire AI Employees for Your Business',
    description: 'Meet your AI team: Voice Receptionist, Sales Rep, Support Agent, Ops Coordinator, and more. Persistent digital workers that own jobs continuously.',
    path: '/ai-employees'
  });

  const rolesProducts = PRODUCTS.filter((p) => CUSTOMER_FACING_ROLES.includes(p.id));

  return (
    <div className="relative min-h-screen text-[#0F172A] font-sans selection:bg-[#2563EB]/20 selection:text-[#2563EB] py-16">
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* HERO SECTION */}
        <ScrollReveal yOffset={25} duration={0.35}>
          <section className="text-center max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/15 text-[10px] font-mono uppercase tracking-widest text-[#2563EB]">
              <Zap className="w-3.5 h-3.5" />
              AI Employees
            </span>
            <h1 className="text-5xl sm:text-6xl font-semibold tracking-[-0.02em] text-[#0F172A] leading-tight">
              Hire your AI team
            </h1>
            <p className="text-lg text-[#64748B] leading-relaxed max-w-xl mx-auto">
              Persistent digital workers that own jobs continuously. Not a dashboard you operate — a teammate you delegate to.
            </p>
          </section>
        </ScrollReveal>

        {/* ROLES GRID */}
        <ScrollReveal yOffset={25} duration={0.35}>
          <section className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {rolesProducts.map((product, idx) => {
                const roleInfo = ROLE_MAP[product.id];
                const imgSrc = PRODUCT_IMAGES[product.id];

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    className="group border border-[#E2E8F0] rounded-2xl bg-white p-5 hover:border-[#2563EB]/50 hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    {imgSrc && (
                      <img
                        src={imgSrc}
                        alt={roleInfo?.roleName || product.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                    )}
                    <div className="flex-1 space-y-2 mb-4">
                      <h3 className="text-sm font-semibold text-[#0F172A]">{roleInfo?.roleName || product.title}</h3>
                      <p className="text-xs text-[#64748B] leading-snug">{roleInfo?.tagline || product.description}</p>
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1e40af] transition-colors"
                    >
                      Learn more
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        {/* WHY MASHNU EMPLOYEES SECTION */}
        <ScrollReveal yOffset={25} duration={0.35}>
          <section className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#0F172A]">
                Why hire a Mashnu employee?
              </h2>
              <p className="text-[#64748B]">Not just a dashboard. A digital teammate that works while you sleep.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pillar 1: Voice + WhatsApp */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="border border-[#E2E8F0] rounded-2xl bg-gradient-to-br from-white to-[#F8FAFC] p-6 space-y-3"
              >
                <MessageSquare className="w-6 h-6 text-[#2563EB]" />
                <h3 className="text-lg font-semibold text-[#0F172A]">Voice + WhatsApp Native</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Meets your customers where they are—phone calls and WhatsApp. Not a web dashboard. Real conversations.
                </p>
              </motion.div>

              {/* Pillar 2: Proven low-latency */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="border border-[#E2E8F0] rounded-2xl bg-gradient-to-br from-white to-[#F8FAFC] p-6 space-y-3"
              >
                <Zap className="w-6 h-6 text-[#2563EB]" />
                <h3 className="text-lg font-semibold text-[#0F172A]">Proven Low Latency</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Not a promise, a guarantee. Our AI employees respond faster than any competitor—proven by real benchmarks.
                </p>
              </motion.div>

              {/* Pillar 3: Memory */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="border border-[#E2E8F0] rounded-2xl bg-gradient-to-br from-white to-[#F8FAFC] p-6 space-y-3"
              >
                <Brain className="w-6 h-6 text-[#2563EB]" />
                <h3 className="text-lg font-semibold text-[#0F172A]">Remembers Your Customers</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  An employee that remembers your customers, not just your prompts. Context across every interaction.
                </p>
              </motion.div>
            </div>
          </section>
        </ScrollReveal>

        {/* LATENCY BENCHMARKS */}
        <ScrollReveal yOffset={25} duration={0.35}>
          <LatencyBenchmarks />
        </ScrollReveal>

        {/* UNDER THE HOOD */}
        <ScrollReveal yOffset={25} duration={0.35}>
          <section className="max-w-4xl mx-auto border border-[#E2E8F0] rounded-3xl bg-[#F8FAFC] p-8 sm:p-12 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0F172A]">Under the hood</h2>
            <p className="text-[#64748B] leading-relaxed max-w-2xl mx-auto">
              Custom multi-agent orchestration, enterprise knowledge retrieval, low-latency infrastructure, and real-time CRM sync. See the full platform capabilities.
            </p>
            <Link
              to="/platform"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F172A] hover:bg-[#2563EB] text-white text-sm font-semibold transition-colors"
            >
              Explore Platform Architecture
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal yOffset={25} duration={0.35}>
          <section className="max-w-2xl mx-auto border border-[#2563EB]/20 rounded-3xl bg-gradient-to-br from-[#2563EB] to-[#4F46E5] p-8 sm:p-12 text-center text-white space-y-6">
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
              Ready to meet your AI team?
            </h2>
            <p className="text-sm text-white/80 leading-relaxed max-w-xl mx-auto">
              Tell us what job you need covered. We'll scope your team, pricing, and timeline.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white hover:bg-[#F1F5F9] text-[#2563EB] text-sm font-semibold transition-colors"
            >
              Book a consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </ScrollReveal>

      </main>
    </div>
  );
}

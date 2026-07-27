import React from 'react';
import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';
import taksha from '../assets/clients/taksha-studio.png';
import saiVihaar from '../assets/clients/sai-vihaar.png';
import poolWithLove from '../assets/clients/pool-with-love.png';

const CLIENTS = [
  { name: 'Taksha Studio', logo: taksha, description: 'Premium design studio' },
  { name: 'Sai Vihaar Inn & Suites', logo: saiVihaar, description: 'Hospitality services' },
  { name: 'Pool with Love', logo: poolWithLove, description: 'Pool services & maintenance' },
];

export default function ClientLogos() {
  return (
    <ScrollReveal yOffset={15} duration={0.3}>
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="inline-block text-[10px] font-mono text-[#64748B] uppercase tracking-[0.2em]">
              Trusted by
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0F172A]">
              Leading businesses in India
            </h2>
            <p className="text-sm text-[#64748B] max-w-md mx-auto">
              From hospitality to design, teams trust Mashnu to handle their most important customer interactions.
            </p>
          </div>

          {/* Logo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {CLIENTS.map((client, idx) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                className="flex flex-col items-center gap-4 group"
              >
                {/* Logo Container - Fixed height for uniform sizing */}
                <div className="w-full h-40 flex items-center justify-center bg-white rounded-2xl border border-[#E2E8F0] p-6 group-hover:border-[#2563EB]/50 group-hover:shadow-lg transition-all duration-300">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Client Info */}
                <div className="text-center space-y-1">
                  <h3 className="text-sm font-semibold text-[#0F172A]">{client.name}</h3>
                  <p className="text-xs text-[#64748B]">{client.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Supporting Text */}
          <div className="border-t border-[#E2E8F0] pt-8 text-center">
            <p className="text-xs text-[#64748B] leading-relaxed max-w-2xl mx-auto">
              These businesses reduced support costs by 40–60% and improved response times to under 30 seconds using Mashnu's AI automation. Ready to join them?
            </p>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

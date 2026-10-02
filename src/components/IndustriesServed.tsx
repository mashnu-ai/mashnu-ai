import React from 'react';
import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';
import { BedDouble, PenTool, Wrench } from 'lucide-react';

/*
  Replaces the former named-logo wall. The sectors below are the kinds of
  businesses Mashnu actually runs in, described by category rather than by
  name.

  The old copy also claimed "reduced support costs by 40-60% and improved
  response times to under 30 seconds" — a number that was explicitly
  attributed to those three named businesses. With the attribution gone
  the figure has nothing standing behind it, so it is not reproduced here.
  Put it back only alongside a source that can be pointed at.
*/
const SECTORS = [
  {
    icon: BedDouble,
    name: 'Hospitality',
    detail:
      'Front-desk calls, booking and rescheduling requests, and late-night enquiries answered without waking anyone.',
  },
  {
    icon: PenTool,
    name: 'Studios & creative',
    detail:
      'Project enquiries qualified, briefs captured in full, and every lead logged before it goes cold.',
  },
  {
    icon: Wrench,
    name: 'Home & field services',
    detail:
      'Quote requests handled over WhatsApp, including photos of the job, with the visit booked straight into the calendar.',
  },
];

export default function IndustriesServed() {
  return (
    <ScrollReveal yOffset={15} duration={0.3}>
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="pixel inline-block text-[#9099C2]">Where they work</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-text-main">
              Running in real businesses across India
            </h2>
            <p className="text-sm text-text-sub max-w-lg mx-auto leading-relaxed">
              The job changes with the industry. What stays the same is that the phone
              gets answered and the message gets a reply.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SECTORS.map(({ icon: Icon, name, detail }, idx) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.3 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6 space-y-3.5 transition-colors duration-300 hover:border-[#35E6FF]/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#35E6FF]/10 border border-[#35E6FF]/20">
                  <Icon className="w-5 h-5 text-[#35E6FF]" />
                </span>
                <h3 className="font-display text-base font-semibold text-text-main">{name}</h3>
                <p className="text-sm text-text-sub leading-relaxed">{detail}</p>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-xs text-text-muted leading-relaxed max-w-2xl mx-auto">
              Every deployment starts with a conversation about how your business
              actually runs, not a template. Tell us which job you want covered first.
            </p>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

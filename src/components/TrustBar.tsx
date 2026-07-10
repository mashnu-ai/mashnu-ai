import React from 'react';
import { ScrollReveal } from './ScrollReveal';

export default function TrustBar() {
  return (
    <ScrollReveal yOffset={15} duration={0.2}>
      <section className="border-t border-b border-[#E2E8F0] py-8">
        <div className="max-w-3xl mx-auto text-center space-y-2 px-4">
          <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-[0.2em] block">
            For people who don't have a spare minute
          </span>
          <p className="text-sm sm:text-base font-display italic text-[#334155] leading-relaxed">
            Too busy to even think about this? That's exactly why it's worth trying. Give it a day, or three if you want proof, and see what you get back.
          </p>
        </div>
      </section>
    </ScrollReveal>
  );
}

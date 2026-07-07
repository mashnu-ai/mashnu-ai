import React from 'react';
import { ScrollReveal } from './ScrollReveal';

const SECTORS = [
  'Financial Services',
  'Healthcare Systems',
  'Real Estate Operations',
  'Supply Chain Logistics',
  'E-Commerce Operators',
];

export default function TrustBar() {
  return (
    <ScrollReveal yOffset={15} duration={0.2}>
      <section className="border-t border-b border-[#E5DED0] py-8">
        <div className="max-w-4xl mx-auto text-center space-y-4 px-4">
          <span className="text-[10px] font-mono text-[#6F6757] uppercase tracking-[0.2em] block">
            Trusted by early partners across core sectors
          </span>
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-sm font-display text-[#4C463B]">
            {SECTORS.map((sector, i) => (
              <React.Fragment key={sector}>
                {i > 0 && <span aria-hidden="true" className="text-[#D2C9B6] select-none">·</span>}
                <span className="italic">{sector}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

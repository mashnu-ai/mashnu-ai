import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import nightOffice from '../assets/night-office.webp';

const HOURS = [
  { time: '02:14', event: 'Missed call answered, callback booked for 9am' },
  { time: '03:40', event: 'WhatsApp quote request replied to, lead logged' },
  { time: '05:02', event: 'CRM deduped, 3 stale deals flagged for follow-up' },
];

export default function AlwaysOn() {
  return (
    <ScrollReveal yOffset={28} duration={0.35}>
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10">
        {/* The photograph carries the argument: an empty chair at 3am with
            the work still moving. Copy stays out of its way. */}
        <img
          src={nightOffice}
          alt="An empty office desk at night, one monitor still lit, city skyline beyond the window"
          loading="lazy"
          width={1600}
          height={1600}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Two stacked scrims: a left-to-right ramp to seat the text column,
            and a bottom lift so the pixel row never sits on raw photo. */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#06060F] via-[#06060F]/88 to-[#06060F]/35" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#06060F] via-transparent to-transparent" />

        <div className="relative grid grid-cols-1 gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-2 backdrop-blur-md">
              <span className="animate-glow h-1.5 w-1.5 rounded-full bg-[#C6FF4D] shadow-[0_0_10px_2px_rgba(198,255,77,0.8)]" />
              <span className="pixel text-[#9099C2]">03:00 AM</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-text-main leading-[1.05]">
              Nobody is at the desk.
              <br />
              <span className="holo-text">The work still gets done.</span>
            </h2>

            <p className="max-w-md text-base text-text-sub leading-relaxed">
              Your AI employees do not keep hours. Calls get answered, messages get
              replied to, and records stay clean through the night, the weekend, and
              the festival break. You read what happened in the morning.
            </p>

            <div className="space-y-2.5 pt-1">
              {HOURS.map(({ time, event }) => (
                <div
                  key={time}
                  className="flex items-start gap-3.5 rounded-xl border border-white/8 bg-white/[0.035] px-4 py-3 backdrop-blur-md"
                >
                  <span className="font-mono text-xs text-[#35E6FF] tabular-nums pt-0.5">{time}</span>
                  <span className="text-sm text-text-sub leading-snug">{event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

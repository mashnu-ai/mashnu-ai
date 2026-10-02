import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Phone, MessageSquare, Database, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import TiltCard from './TiltCard';
import heroVisual from '../assets/hero-visual.jpg';
import orbVisual from '../assets/orb-visual.webp';

interface HeroProps {
  onBookDemoClick: () => void;
  onSeePlatformClick: () => void;
}

const ROLES = [
  { icon: Phone, label: 'Receptionist', desc: 'Answers every call, books the slot, never drops a lead.' },
  { icon: MessageSquare, label: 'Sales rep', desc: 'Works your WhatsApp line, reads invoices and photos, closes.' },
  { icon: Database, label: 'Ops analyst', desc: 'Keeps the CRM clean and follows up before you remember to.' },
];

export default function Hero({ onBookDemoClick, onSeePlatformClick }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative max-w-6xl mx-auto space-y-16 pt-8 md:pt-14 scroll-mt-24">
      {/* Backdrop: a perspective grid floor under a drifting aurora wash.
          aria-hidden and pointer-events-none throughout — pure atmosphere. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-36 h-[42rem] overflow-hidden">
        <div className="grid-floor absolute inset-x-[-20%] bottom-0 h-64 opacity-50" />
        <div className="animate-aurora absolute left-1/2 top-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(53,230,255,0.22),transparent_68%)] blur-2xl" />
        {/*
          mix-blend-screen keeps only pixels brighter than what sits beneath,
          so the orb's near-black navy plate dissolves into the void and just
          the glass and its bloom survive — no alpha mask needed.
          It lives in this atmospheric layer rather than beside the video
          card: sitting in the card's stacking context it was simply painted
          over, and raising it above instead put blend-mode over moving
          footage. Here it has open space and reads as depth behind the UI.
        */}
        <img
          src={orbVisual}
          alt=""
          loading="eager"
          width={520}
          height={383}
          className="animate-float absolute -right-16 -top-16 w-[15rem] max-w-none select-none opacity-70 mix-blend-screen sm:-right-20 sm:-top-12 sm:w-[22rem] sm:opacity-90 lg:right-[-6rem] lg:top-[-2rem] lg:w-[34rem]"
        />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="text-center lg:text-left space-y-7">
          <ScrollReveal yOffset={15} duration={0.2}>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-white/12 bg-white/[0.04] backdrop-blur-md">
              <span className="animate-glow h-1.5 w-1.5 rounded-full bg-[#35E6FF] shadow-[0_0_10px_2px_rgba(53,230,255,0.8)]" />
              <span className="pixel text-[#9099C2]">AI Employees</span>
            </div>
          </ScrollReveal>

          <ScrollReveal yOffset={25} duration={0.22}>
            <h1 className="font-display text-[2.75rem] sm:text-6xl lg:text-[4.1rem] font-bold tracking-[-0.035em] leading-[0.98] text-text-main">
              Your next hire
              <br />
              <span className="holo-text">never sleeps.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal yOffset={20} duration={0.24}>
            <p className="text-base sm:text-lg text-text-sub font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Mashnu builds AI employees that pick up your calls, run your WhatsApp line,
              and keep your CRM in order. They start on day one, work every hour, and never
              hand in a notice.
            </p>
          </ScrollReveal>

          <ScrollReveal yOffset={15} duration={0.26}>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onBookDemoClick}
                className="group px-6 py-3.5 rounded-full bg-[#35E6FF] hover:bg-[#7DF0FF] text-[#04040C] font-sans font-semibold text-sm tracking-tight transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-[0_0_30px_-6px_rgba(53,230,255,0.7)]"
              >
                Meet your AI team
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={onSeePlatformClick}
                className="px-6 py-3.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md hover:border-white/30 text-text-main font-sans font-medium text-sm tracking-tight transition-colors duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#A78BFA]" />
                How it works
              </button>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal yOffset={20} duration={0.3}>
          <div className="relative mx-auto max-w-md lg:max-w-none" style={{ perspective: 1200 }}>
            <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-[#35E6FF]/10 blur-3xl" />

            <TiltCard maxTilt={5} className="group">
              <div className="neon-ring relative overflow-hidden rounded-3xl">
                <video
                  ref={videoRef}
                  src="/videos/mashnu-intro.mp4"
                  poster={heroVisual}
                  autoPlay
                  muted={muted}
                  loop
                  playsInline
                  preload="auto"
                  aria-label="Mashnu AI introduction"
                  className="relative w-full object-cover"
                />
                <button
                  onClick={toggleSound}
                  aria-label={muted ? 'Unmute video' : 'Mute video'}
                  className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-black/55 hover:bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </TiltCard>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal yOffset={30} duration={0.3}>
        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {ROLES.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-5 text-left space-y-2.5 transition-colors duration-300 hover:border-[#35E6FF]/40"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#35E6FF]/10 border border-[#35E6FF]/20">
                  <Icon className="w-4 h-4 text-[#35E6FF]" />
                </span>
                <span className="pixel text-[#9099C2]">{label}</span>
              </div>
              <p className="text-sm text-text-sub leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

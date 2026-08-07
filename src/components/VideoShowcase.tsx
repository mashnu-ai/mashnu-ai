import React, { useRef, useState } from 'react';
import { Play, Phone, MessageSquare } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface Clip {
  id: string;
  title: string;
  description: string;
  src: string;
  icon: React.ReactNode;
}

const CLIPS: Clip[] = [
  {
    id: 'voice',
    title: 'AI Voice Receptionist',
    description: 'Answers every call, books the appointment, never misses a lead.',
    src: '/videos/voice-agent-demo.mp4',
    icon: <Phone className="w-4 h-4" />,
  },
  {
    id: 'whatsapp',
    title: 'AI WhatsApp Agent',
    description: 'Replies instantly, understands photos and invoices, closes the sale.',
    src: '/videos/whatsapp-agent-demo.mp4',
    icon: <MessageSquare className="w-4 h-4" />,
  },
];

function VideoCard({ clip }: { clip: Clip }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setPlaying(true);
  };

  return (
    <div className="group relative rounded-3xl overflow-hidden border border-[#E2E8F0] bg-[#0B1120] shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-[9/16] sm:aspect-video w-full bg-[#0B1120]">
        <video
          ref={videoRef}
          src={clip.src}
          controls={playing}
          playsInline
          preload="metadata"
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          className="w-full h-full object-cover"
        />
        {!playing && (
          <button
            onClick={handlePlay}
            aria-label={`Play ${clip.title} demo`}
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer"
          >
            <span className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-lg transition-colors">
              <Play className="w-6 h-6 text-[#0F172A] translate-x-0.5" fill="currentColor" />
            </span>
          </button>
        )}
      </div>
      <div className="p-5 space-y-1.5">
        <div className="flex items-center gap-2 text-[#2563EB]">
          {clip.icon}
          <h3 className="text-sm font-semibold text-white">{clip.title}</h3>
        </div>
        <p className="text-xs text-[#94A3B8] leading-relaxed">{clip.description}</p>
      </div>
    </div>
  );
}

export default function VideoShowcase() {
  return (
    <ScrollReveal yOffset={25} duration={0.35}>
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-semibold text-[#2563EB] uppercase tracking-wider block">
            See It In Action
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#0F172A]">
            Watch your AI team at work
          </h2>
          <p className="text-[#64748B] leading-relaxed">
            Two quick looks at how Mashnu's AI employees handle real customer moments.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {CLIPS.map((clip) => (
            <VideoCard key={clip.id} clip={clip} />
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}

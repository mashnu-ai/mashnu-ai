import React from 'react';

/*
  The Mashnu "Rising M" mark — ordinary nodes (people) connected by
  agent lines, ascending. Inline SVG version of logo/mashnu-ai-logo-primary.svg
  so it stays crisp at any size and inherits no background tile.
*/
export default function BrandMark({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 124 124" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="brand-rise" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
      </defs>
      <g>
        <path
          d="M 18 104 L 40 40 L 62 76 L 86 24 L 106 96"
          fill="none"
          stroke="url(#brand-rise)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="29" cy="72" r="4" fill="#2563EB" />
        <circle cx="51" cy="58" r="4" fill="#60A5FA" />
        <circle cx="74" cy="50" r="4" fill="#60A5FA" />
        <circle cx="96" cy="60" r="4" fill="#60A5FA" />
        <circle cx="40" cy="40" r="7" fill="#2563EB" />
        <circle cx="62" cy="76" r="7" fill="#1D4ED8" />
        <circle cx="86" cy="24" r="8" fill="#60A5FA" />
        <circle cx="106" cy="96" r="6" fill="#1E293B" />
        <circle cx="18" cy="104" r="8" fill="#7C3AED" />
        <circle cx="18" cy="104" r="12.5" fill="none" stroke="#7C3AED" strokeWidth="2" opacity="0.45" />
      </g>
    </svg>
  );
}

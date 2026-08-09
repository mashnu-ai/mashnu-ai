import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt angle in degrees. Keep subtle (6-10) for a premium feel, not a gimmick. */
  maxTilt?: number;
  /** Adds a soft light glare that follows the cursor across the surface. */
  glare?: boolean;
}

/**
 * Wraps content in a perspective-tilted card that follows the cursor,
 * giving flat cards real depth without pulling in a 3D rendering library.
 * Disabled on touch devices (no cursor) so mobile keeps the plain card.
 */
export default function TiltCard({ children, className = '', maxTilt = 8, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch] = useState(() => typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-maxTilt, maxTilt]), springConfig);
  const glareX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(mouseY, [0, 1], ['0%', '100%']);

  if (isTouch) {
    return <div className={className}>{children}</div>;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [glareX, glareY] as any,
              ([gx, gy]: any) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 60%)`
            ),
          }}
        />
      )}
    </motion.div>
  );
}

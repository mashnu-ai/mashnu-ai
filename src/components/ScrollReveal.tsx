import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion } from 'motion/react';

// Context to handle staggered groupings of elements
const StaggerContext = createContext<number>(0);

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number; // base delay in seconds
  duration?: number; // duration in seconds (defaults to 0.2s / 200ms)
  yOffset?: number; // vertical slide-up offset in pixels (defaults to 12px for subtle motion)
  className?: string;
  as?: 'div' | 'section' | 'article' | 'main' | 'header';
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.2, // 150-250ms (200ms is perfect)
  yOffset = 12, // Subtle, not bouncy
  className = '',
  as = 'div'
}: ScrollRevealProps) {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const staggerIndex = useContext(StaggerContext);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Compute final stagger/delay
  // ~60ms (0.06s) stagger per index in a group
  const finalDelay = shouldReduceMotion ? 0 : delay + staggerIndex * 0.06;

  // Render elements instantly if prefers-reduced-motion is active
  if (shouldReduceMotion) {
    const Component = as;
    return <Component className={className}>{children}</Component>;
  }

  const variants = {
    hidden: { 
      opacity: 0, 
      y: yOffset 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: duration,
        delay: finalDelay,
        ease: [0.16, 1, 0.3, 1] // Nice clean ease-out
      }
    }
  };

  const Component = motion[as] as any;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
    >
      {children}
    </Component>
  );
}

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
}

// Wrapper to automatically assign incrementing stagger indices to nested ScrollReveal components
export function StaggerGroup({ children, className = '' }: StaggerGroupProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return (
            <StaggerContext.Provider value={index}>
              {child}
            </StaggerContext.Provider>
          );
        }
        return child;
      })}
    </div>
  );
}

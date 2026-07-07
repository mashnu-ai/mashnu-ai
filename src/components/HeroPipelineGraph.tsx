import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare, Database, Cpu, Settings, Globe, Webhook, CheckCircle } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  color: string;
  status: string;
  metric: string;
}

export default function HeroPipelineGraph() {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Cycle through active steps to simulate stateful execution flow of LangGraph
  useEffect(() => {
    if (shouldReduceMotion) {
      setActiveStep(2); // Keep standard state active for reduced motion static view
      return;
    }
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 4000); // Slower, more ambient 4s interval
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const nodes: Node[] = [
    {
      id: 'trigger',
      label: 'Inbound Ingestion',
      icon: <Phone className="w-5 h-5" />,
      x: 120,
      y: 180,
      color: 'emerald',
      status: 'Awaiting Webhook',
      metric: 'Voice / WhatsApp Gateway'
    },
    {
      id: 'guard',
      label: 'State Guard & Router',
      icon: <Settings className={`w-5 h-5 ${shouldReduceMotion ? '' : 'animate-spin-slow'}`} />,
      x: 320,
      y: 180,
      color: 'cyan',
      status: 'Token Match: Active',
      metric: 'FastAPI Validation Layer'
    },
    {
      id: 'rag',
      label: 'Qdrant Hybrid Search',
      icon: <Database className="w-5 h-5" />,
      x: 520,
      y: 80,
      color: 'indigo',
      status: '98.4% Vector Match',
      metric: 'Enterprise SOP Context'
    },
    {
      id: 'llm',
      label: 'Claude Reasoning Core',
      icon: <Cpu className={`w-5 h-5 ${shouldReduceMotion ? '' : 'animate-pulse'}`} />,
      x: 520,
      y: 280,
      color: 'purple',
      status: 'Streaming Tokens',
      metric: 'Model: Claude Fable 5'
    },
    {
      id: 'action',
      label: 'Action Engine',
      icon: <Globe className="w-5 h-5" />,
      x: 720,
      y: 180,
      color: 'amber',
      status: 'CRM Deal Generated',
      metric: 'Stripe & HubSpot API'
    },
    {
      id: 'response',
      label: 'Outbound Response',
      icon: <Webhook className="w-5 h-5" />,
      x: 900,
      y: 180,
      color: 'rose',
      status: 'Synthesis Complete',
      metric: 'Sub-500ms Audio Stream'
    }
  ];

  // Helper to color nodes based on state
  const isNodeActive = (nodeId: string, index: number) => {
    if (nodeId === 'rag' && activeStep === 2) return true;
    if (nodeId === 'llm' && activeStep === 2) return true;
    if (index === activeStep) return true;
    if (index > activeStep) return false;
    return true; // completed steps
  };

  // Generate SVG path for a cubic bezier curve
  const getCurvePath = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1;
    const cx1 = x1 + dx * 0.5;
    const cx2 = x1 + dx * 0.5;
    return `M ${x1} ${y1} C ${cx1} ${y1}, ${cx2} ${y2}, ${x2} ${y2}`;
  };

  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
      {/* Topology Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            LangGraph Autonomous Agent Topology Visualizer
          </span>
        </div>
        <div className="flex gap-4 text-[10px] font-mono text-slate-600">
          <span className="text-emerald-600 font-medium">P50 Latency: 320ms</span>
          <span>•</span>
          <span className="text-blue-600 font-medium">Active State: Idle</span>
        </div>
      </div>

      <div className="relative w-full overflow-x-auto select-none">
        <div className="min-w-[950px] h-[360px] relative mx-auto">
          
          {/* Animated Flow Connections (SVG Layer) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1020 360">
            <defs>
              <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="50%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>

            {/* Static background lines */}
            <path d={getCurvePath(120, 180, 320, 180)} fill="none" stroke="#1E293B" strokeWidth="2" />
            <path d={getCurvePath(320, 180, 520, 80)} fill="none" stroke="#1E293B" strokeWidth="2" />
            <path d={getCurvePath(320, 180, 520, 280)} fill="none" stroke="#1E293B" strokeWidth="2" />
            <path d={getCurvePath(520, 80, 720, 180)} fill="none" stroke="#1E293B" strokeWidth="2" />
            <path d={getCurvePath(520, 280, 720, 180)} fill="none" stroke="#1E293B" strokeWidth="2" />
            <path d={getCurvePath(720, 180, 900, 180)} fill="none" stroke="#1E293B" strokeWidth="2" />

            {/* Glowing active flow trails */}
            {activeStep >= 0 && (
              <path
                d={getCurvePath(120, 180, 320, 180)}
                fill="none"
                stroke="url(#activeGrad)"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                className="animate-flow-dash"
                style={{ strokeDashoffset: activeStep === 0 ? 0 : 40 }}
              />
            )}
            {activeStep >= 1 && (
              <>
                <path
                  d={getCurvePath(320, 180, 520, 80)}
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className="animate-flow-dash"
                />
                <path
                  d={getCurvePath(320, 180, 520, 280)}
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className="animate-flow-dash"
                />
              </>
            )}
            {activeStep >= 2 && (
              <>
                <path
                  d={getCurvePath(520, 80, 720, 180)}
                  fill="none"
                  stroke="#047857"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className="animate-flow-dash"
                />
                <path
                  d={getCurvePath(520, 280, 720, 180)}
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className="animate-flow-dash"
                />
              </>
            )}
            {activeStep >= 3 && (
              <path
                d={getCurvePath(720, 180, 900, 180)}
                fill="none"
                stroke="#B45309"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                className="animate-flow-dash"
              />
            )}
          </svg>

          {/* Interactive Card Nodes */}
          {nodes.map((node, index) => {
            const isActive = isNodeActive(node.id, index);
            const isHovered = hoveredNode === node.id;
            
            // Map node colors dynamically
            const colorMap: Record<string, { border: string, borderHover: string, bg: string, text: string, shadow: string }> = {
              emerald: { border: 'border-emerald-300', borderHover: 'border-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700', shadow: 'shadow-sm' },
              cyan: { border: 'border-blue-300', borderHover: 'border-blue-500', bg: 'bg-blue-50', text: 'text-blue-700', shadow: 'shadow-sm' },
              indigo: { border: 'border-violet-300', borderHover: 'border-violet-500', bg: 'bg-violet-50', text: 'text-violet-700', shadow: 'shadow-sm' },
              purple: { border: 'border-violet-300', borderHover: 'border-violet-500', bg: 'bg-violet-50', text: 'text-violet-700', shadow: 'shadow-sm' },
              amber: { border: 'border-amber-300', borderHover: 'border-amber-500', bg: 'bg-amber-50', text: 'text-amber-700', shadow: 'shadow-sm' },
              rose: { border: 'border-rose-300', borderHover: 'border-rose-500', bg: 'bg-rose-50', text: 'text-rose-700', shadow: 'shadow-sm' }
            };

            const styles = colorMap[node.color];

            return (
              <motion.div
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: node.x, top: node.y }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                animate={shouldReduceMotion ? {} : {
                  y: [0, index % 2 === 0 ? -4 : 4, 0]
                }}
                transition={{
                  duration: 6 + (index % 3) * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div
                  className={`w-44 p-3.5 rounded-xl border backdrop-blur-md transition-all duration-250 cursor-pointer ${
                    isActive 
                      ? `${styles.border} ${styles.bg} ${styles.shadow}` 
                      : 'border-slate-200 bg-white opacity-70 hover:opacity-100'
                  } ${
                    isHovered
                      ? `scale-[1.02] ${isActive ? styles.borderHover : 'border-slate-400'} bg-slate-50 shadow-sm`
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-white border border-slate-200 ${isActive ? styles.text : 'text-slate-400'}`}>
                      {node.icon}
                    </div>
                    <div className="text-left">
                      <h4 className="text-[11px] font-bold font-sans tracking-wide text-slate-900">{node.label}</h4>
                      <p className="text-[9px] font-mono text-slate-400 mt-0.5 truncate">{node.metric}</p>
                    </div>
                  </div>

                  {/* Active/Status line */}
                  <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-[8px] font-mono">
                    <span className="text-slate-500 uppercase">State</span>
                    <span className={isActive ? styles.text : 'text-slate-600'}>
                      {isActive ? node.status : 'Awaiting Flow'}
                    </span>
                  </div>
                </div>

                {/* Pulsing indicator ring on the current step */}
                {((index === activeStep) || (node.id === 'rag' && activeStep === 2) || (node.id === 'llm' && activeStep === 2)) && !shouldReduceMotion && (
                  <span className="absolute -inset-1 rounded-2xl border-2 border-[#2563EB]/25 animate-pulse pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Topology Footer Info */}
      <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
          <span>Active Session ID: <span className="text-slate-700">session_92a3-f00d</span></span>
        </div>
        <div className="flex items-center gap-3">
          <span>Inference Fallback: <span className="text-emerald-500">Active (Multi-Region HA)</span></span>
          <span>•</span>
          <span>Tokens Streamed: <span className="text-slate-700">1.4M / sec</span></span>
        </div>
      </div>
    </div>
  );
}

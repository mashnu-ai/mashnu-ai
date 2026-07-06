import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from './Router';
import { 
  Terminal, Search, Compass, Briefcase, Zap, Sparkles, 
  RefreshCw, FileText, Phone, MessageSquare, Cpu, Command, 
  Layers, BarChart3, Landmark, ShieldCheck, CheckCircle2, AlertCircle, X
} from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  description: string;
  category: 'Navigation' | 'Diagnostics' | 'Assistance';
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const { navigate } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [overclockEnabled, setOverclockEnabled] = useState(false);
  const [diagnosticLog, setDiagnosticLog] = useState<string[]>([]);
  const [isCompiling, setIsCompiling] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);

  // Toggle keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle focus when palette opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setSearchQuery('');
    } else {
      setIsCompiling(false);
      setDiagnosticLog([]);
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Command items definitions
  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-products',
      title: 'Go to Products Suite',
      description: 'Explore our 12-item custom-engineered AI products',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4" />,
      action: () => { navigate('/products'); setIsOpen(false); }
    },
    {
      id: 'nav-solutions',
      title: 'Go to Solutions Blueprint',
      description: 'View industry-specific enterprise architectures',
      category: 'Navigation',
      icon: <BarChart3 className="w-4 h-4" />,
      action: () => { navigate('/solutions'); setIsOpen(false); }
    },
    {
      id: 'nav-platform',
      title: 'Go to Node Orchestration Platform',
      description: 'Review low-latency micro-agent compiler gateway',
      category: 'Navigation',
      icon: <Cpu className="w-4 h-4" />,
      action: () => { navigate('/platform'); setIsOpen(false); }
    },
    {
      id: 'nav-vision',
      title: 'Go to Vision Manifesto',
      description: 'Track our multi-stage sovereign evolution roadmap',
      category: 'Navigation',
      icon: <Compass className="w-4 h-4" />,
      action: () => { navigate('/vision'); setIsOpen(false); }
    },
    {
      id: 'nav-careers',
      title: 'Go to Careers Portal',
      description: 'Apply for high-integrity systems engineering roles',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4" />,
      action: () => { navigate('/careers'); setIsOpen(false); }
    },
    {
      id: 'nav-assistant',
      title: 'Go to AI Sandbox Assistant',
      description: 'Engage with our real-time core capability simulator',
      category: 'Navigation',
      icon: <MessageSquare className="w-4 h-4" />,
      action: () => { navigate('/assistant'); setIsOpen(false); }
    },
    {
      id: 'nav-contact',
      title: 'Go to Contact / Pitch Request',
      description: 'Secure consultation and custom deployment evaluation',
      category: 'Navigation',
      icon: <Phone className="w-4 h-4" />,
      action: () => { navigate('/contact'); setIsOpen(false); }
    },

    // Diagnostics
    {
      id: 'diag-overclock',
      title: overclockEnabled ? 'Deactivate System Low-Latency Adapter' : 'Activate System Low-Latency Overclock',
      description: overclockEnabled ? 'Reset model weights adapter to standard latency profiles' : 'Bypass caching locks to overclock agent response speeds to sub-350ms',
      category: 'Diagnostics',
      icon: <Zap className="w-4 h-4 text-amber-500" />,
      action: () => {
        setOverclockEnabled(prev => !prev);
        triggerLogNotification(overclockEnabled ? 'Overclock disengaged. Standard caching enabled.' : 'LOW-LATENCY INFRASTRUCTURE OVERCLOCK ACTIVATED. TARGET: sub-350ms');
      }
    },
    {
      id: 'diag-compile',
      title: 'Execute Core Diagnostic Compiler',
      description: 'Verify static-analysis nodes, edge-weights caching and schema security',
      category: 'Diagnostics',
      icon: <Terminal className="w-4 h-4" />,
      action: () => {
        runDiagnosticCompilation();
      }
    },
    {
      id: 'diag-cache',
      title: 'Flush Distributed Cache adapters',
      description: 'Clear local sandbox session variables and reset registry sockets',
      category: 'Diagnostics',
      icon: <RefreshCw className="w-4 h-4" />,
      action: () => {
        triggerLogNotification('Flushing distributed weight-adapter caches... Completed. Caches optimized.');
      }
    },

    // Assistance
    {
      id: 'assist-report',
      title: 'Generate Custom Pipeline Appraisal Report',
      description: 'Run automated model-feasibility analysis tool',
      category: 'Assistance',
      icon: <FileText className="w-4 h-4" />,
      action: () => { navigate('/contact'); setIsOpen(false); }
    },
    {
      id: 'assist-audit',
      title: 'View Cryptographic Audit Log',
      description: 'Verify sovereign integrity with SHA-256 ledger checksums',
      category: 'Assistance',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />,
      action: () => {
        triggerLogNotification('SECURE LEDGER INTEGRITY AUDIT: Verified SHA-256 checksum match. Zero memory leakage.');
      }
    }
  ];

  const triggerLogNotification = (msg: string) => {
    setDiagnosticLog([`[SYSTEM] ${msg}`]);
  };

  const runDiagnosticCompilation = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    setDiagnosticLog([]);

    const logSteps = [
      '[MASHNU COMPILER] Fetching local node-graph state parameters...',
      '[COMPILER] Validating 12 core product-line schema definitions against Zod compilers...',
      '[SECURITY] Running static analysis checks on isolated WASM weight containers...',
      '[METRIC] Local Voice Activity Detection (VAD) model: sub-480ms streaming validated.',
      '[METRIC] CRM Webhook Synchronization routing latency: sub-5s verified.',
      '[SUCCESS] INTEGRITY VERIFICATION PASSED. All system pipelines building green.'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < logSteps.length) {
        setDiagnosticLog(prev => [...prev, logSteps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsCompiling(false);
      }
    }, 400);
  };

  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* FLOATING ACTION BUTTON (FAB) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#1D1D1F] hover:bg-[#424245] text-white border border-[#D2D2D7]/30 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          title="Command Palette (Ctrl+K)"
        >
          {/* Inner metallic effect rings */}
          <span className="absolute inset-0.5 rounded-full border border-white/5 pointer-events-none" />
          <span className="absolute inset-0 rounded-full bg-radial from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <Command className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
          
          {/* Pulse ring when idle */}
          <span className="absolute -inset-1 rounded-full border border-[#1D1D1F]/10 animate-ping pointer-events-none opacity-40 group-hover:opacity-0 transition-opacity" />

          {/* Prompt Tooltip */}
          <div className="absolute right-16 px-3 py-1.5 rounded-lg bg-[#1D1D1F] text-white text-[10px] font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none border border-[#D2D2D7]/20 flex items-center gap-1.5 shadow-md whitespace-nowrap">
            <span className="text-[#8E8E93]">Command Gate</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#424245] text-white text-[8px] font-semibold border border-white/10 shadow-xs">Ctrl</kbd>
            <span className="text-white">+</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#424245] text-white text-[8px] font-semibold border border-white/10 shadow-xs">K</kbd>
          </div>
        </button>
      </div>

      {/* OVERLAY & MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#FBFBFD]/80 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel Card */}
            <motion.div
              ref={paletteRef}
              initial={{ opacity: 0, scale: 0.97, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-white border border-[#E8E8ED] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[60vh] font-sans text-[#1D1D1F]"
            >
              {/* Header Input bar */}
              <div className="flex items-center gap-3 px-4 border-b border-[#E8E8ED] bg-[#F5F5F7]/50">
                <Search className="w-5 h-5 text-[#8E8E93] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or page name to initiate..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-4 text-xs sm:text-sm bg-transparent border-none outline-none text-[#1D1D1F] placeholder-[#86868B] focus:ring-0"
                />
                
                {/* Overclock active badge */}
                {overclockEnabled && (
                  <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1D1D1F] text-white text-[9px] font-mono border border-[#D2D2D7]/20 animate-pulse">
                    <Zap className="w-2.5 h-2.5 text-amber-400" />
                    <span>OVERCLOCK ON</span>
                  </span>
                )}

                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-[#E8E8ED] text-[#8E8E93] hover:text-[#1D1D1F] transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Log notification output if any diagnostic has run */}
              {diagnosticLog.length > 0 && (
                <div className="bg-[#1D1D1F] border-b border-[#424245] p-3 font-mono text-[10px] sm:text-[11px] text-emerald-400 max-h-32 overflow-y-auto space-y-1">
                  {diagnosticLog.map((log, i) => (
                    <div key={i} className={
                      log.startsWith('[SUCCESS]') ? 'text-emerald-400 font-semibold' :
                      log.startsWith('[SYSTEM]') ? 'text-cyan-300 font-medium' : 'text-slate-300'
                    }>
                      {log}
                    </div>
                  ))}
                </div>
              )}

              {/* Items List */}
              <div className="grow overflow-y-auto p-2 space-y-4">
                
                {/* Filter matches info */}
                {filteredCommands.length === 0 ? (
                  <div className="py-12 text-center text-xs text-[#8E8E93] space-y-2">
                    <AlertCircle className="w-6 h-6 mx-auto text-amber-500/80" />
                    <p>No matching commands found. Refine your query parameters.</p>
                  </div>
                ) : (
                  ['Navigation', 'Diagnostics', 'Assistance'].map((cat) => {
                    const catItems = filteredCommands.filter(c => c.category === cat);
                    if (catItems.length === 0) return null;

                    return (
                      <div key={cat} className="space-y-1">
                        <span className="px-3 text-[9px] font-bold text-[#8E8E93] uppercase tracking-wider block">
                          {cat} Functions
                        </span>
                        
                        <div className="space-y-0.5">
                          {catItems.map((item) => (
                            <button
                              key={item.id}
                              onClick={item.action}
                              className="w-full flex items-center justify-between gap-4 p-3 rounded-xl hover:bg-[#F5F5F7] text-left transition-colors duration-150 cursor-pointer group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#FBFBFD] border border-[#E8E8ED] text-[#1D1D1F] flex items-center justify-center shadow-xs group-hover:bg-white group-hover:border-[#D2D2D7] transition-all">
                                  {item.icon}
                                </div>
                                <div className="space-y-0.5">
                                  <h4 className="text-xs sm:text-sm font-semibold text-[#1D1D1F]">
                                    {item.title}
                                  </h4>
                                  <p className="text-[10px] sm:text-xs text-[#8E8E93]">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                              <span className="text-[10px] text-[#8E8E93] font-mono group-hover:text-[#1D1D1F] transition-colors shrink-0">
                                Launch ↵
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}

              </div>

              {/* Footer hint */}
              <div className="px-4 py-3 bg-[#F5F5F7] border-t border-[#E8E8ED] flex items-center justify-between text-[10px] text-[#8E8E93]">
                <div className="flex items-center gap-1">
                  <span>Use keys</span>
                  <kbd className="px-1 py-0.5 rounded bg-white border border-[#E8E8ED] text-[9px] font-mono">↑↓</kbd>
                  <span>to navigate</span>
                  <span className="mx-1">•</span>
                  <kbd className="px-1 py-0.5 rounded bg-white border border-[#E8E8ED] text-[9px] font-mono">↵</kbd>
                  <span>to execute</span>
                </div>
                <div>
                  <span>Sovereign Command Engine v1.02</span>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, Cpu, Database, Phone, MessageSquare, Globe, BarChart3, Settings, CheckCircle2 
} from 'lucide-react';
import AgentGraph from './AgentGraph';
import { CompiledAgent, SimulationTrace, TraceLogLine } from '../types';

const PRESETS = [
  {
    title: "AI Voice Agent (Patient Inbound)",
    prompt: "Inbound voice automation for a busy pediatric medical group. Greets callers, pulls EHR appointment state from AthenaHealth API, schedules/reschedules, checks insurance eligibility, and routes complex calls based on clinical triage keywords.",
    icon: <Phone className="w-4 h-4 text-emerald-400" />
  },
  {
    title: "WhatsApp Conversational Commerce",
    prompt: "WhatsApp sales concierge for a direct-to-consumer premium apparel brand. Answers product sizing queries using active inventory search in Shopify, manages discount rules, scores purchase intent, and drafts custom CRM deals directly in HubSpot.",
    icon: <MessageSquare className="w-4 h-4 text-cyan-400" />
  },
  {
    title: "Freight Invoice & Custom Ledger Reconciliation",
    prompt: "Autonomous multi-agent pipeline to ingest freight carrier invoices (PDF), extract logistics metadata, cross-reference container IDs with PostgreSQL active dispatches, score price discrepancy, and flag discrepancies higher than 5% for human accounting team review.",
    icon: <Database className="w-4 h-4 text-indigo-400" />
  },
  {
    title: "Enterprise Knowledge RAG Search",
    prompt: "On-site retrieval agent querying 12,000 internal corporate standard operating procedures (SOPs). Employs hybrid search (dense Qdrant vector embeddings plus BM25 keyword matching) to provide cited compliance answers with auto-generated legal warning citations.",
    icon: <Globe className="w-4 h-4 text-amber-400" />
  }
];

export default function CompilerPlayground() {
  const [customPrompt, setCustomPrompt] = useState(PRESETS[0].prompt);
  const [selectedModel, setSelectedModel] = useState('claude-fable-5');
  const [selectedTemperature, setSelectedTemperature] = useState(0.15);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compiledAgent, setCompiledAgent] = useState<CompiledAgent | null>(null);
  
  // Simulator states
  const [testInput, setTestInput] = useState('Hi, I need to book a physical for my son tomorrow afternoon.');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationTrace, setSimulationTrace] = useState<SimulationTrace | null>(null);
  const [displayedLogs, setDisplayedLogs] = useState<TraceLogLine[]>([]);
  const [currentResult, setCurrentResult] = useState('');
  
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal logs
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [displayedLogs]);

  // Run the API call to compile a user prompt into a formal agent configuration
  const handleCompile = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customPrompt.trim()) return;

    setIsCompiling(true);
    setCompiledAgent(null);
    setSimulationTrace(null);
    setDisplayedLogs([]);
    setCurrentResult('');

    try {
      const res = await fetch('/api/compile-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: customPrompt,
          model: selectedModel,
          temperature: selectedTemperature
        })
      });

      if (!res.ok) {
        throw new Error('Internal compilation failure.');
      }

      const data = await res.json();
      setCompiledAgent(data);
      
      // Update default simulation input based on compiled agent type
      if (data.appName.toLowerCase().includes('voice')) {
        setTestInput("Yes, I would like to schedule a physical check-up for tomorrow at 2:00 PM if possible. Patient name is Leo Smith.");
      } else if (data.appName.toLowerCase().includes('invoice') || data.appName.toLowerCase().includes('ledger') || data.appName.toLowerCase().includes('freight')) {
        setTestInput("Process carrier invoice #FR-88942, container id CNT-1049, total ledger charge is $4,520.");
      } else {
        setTestInput("How do you handle policy breaches under Section 4.2 of the compliance handbook?");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCompiling(false);
    }
  };

  // Run the API call to simulate execution logs
  const handleSimulate = async () => {
    if (!compiledAgent || !testInput.trim()) return;

    setIsSimulating(true);
    setDisplayedLogs([]);
    setCurrentResult('');
    setSimulationTrace(null);

    try {
      const res = await fetch('/api/simulate-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          compiledAgent,
          userInput: testInput,
          model: selectedModel
        })
      });

      if (!res.ok) {
        throw new Error('Simulation endpoint failed.');
      }

      const data: SimulationTrace = await res.json();
      setSimulationTrace(data);

      // Stream logs visually with an interactive delayed typewriter effect
      let currentLogIdx = 0;
      const interval = setInterval(() => {
        if (currentLogIdx < data.executionTraceLogs.length) {
          setDisplayedLogs(prev => [...prev, data.executionTraceLogs[currentLogIdx]]);
          currentLogIdx++;
        } else {
          clearInterval(interval);
          setCurrentResult(data.finalResult);
          setIsSimulating(false);
        }
      }, 750); // Delay in ms per step to simulate real operations

    } catch (err) {
      console.error(err);
      setIsSimulating(false);
    }
  };

  return (
    <div id="compiler-tool" className="space-y-8 animate-fade-in">
      <div className="max-w-3xl mx-auto text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-slate-100">
          The Mashnu Agent Compiler & Simulation Core
        </h2>
        <p className="text-xs text-slate-400 font-sans">
          Translate complex enterprise requirements into fully visualized Directed Acyclic Graph (DAG) state machines. Verify system schemas, test live queries, and stream runtime performance telemetry logs instantly.
        </p>
      </div>

      {/* Left/Right layout for compiling */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Controls */}
        <form onSubmit={handleCompile} className="lg:col-span-4 flex flex-col gap-4 bg-slate-950/80 p-5 rounded-xl border border-slate-900/80">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Configuration Panel</span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/5 px-2 py-0.5 rounded border border-cyan-500/10">Dynamic API Engine</span>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Enterprise Use-Case Templates</label>
            <div className="grid grid-cols-1 gap-1">
              {PRESETS.map((preset) => (
                <button
                  key={preset.title}
                  type="button"
                  onClick={() => setCustomPrompt(preset.prompt)}
                  className={`p-2.5 rounded-lg border text-left transition-all flex items-start gap-2.5 ${
                    customPrompt === preset.prompt 
                      ? 'border-cyan-500 bg-cyan-500/5 text-cyan-300' 
                      : 'border-slate-900 bg-slate-950/30 hover:bg-slate-900 hover:border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="mt-0.5 shrink-0">{preset.icon}</span>
                  <span className="text-[10px] font-medium leading-snug line-clamp-2">{preset.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Operational Prompt Text Box */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Custom Operational Prompt</label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Inbound receptionist phone agent connected to Hubspot CRM to schedule real estate walkthroughs..."
              className="w-full h-32 px-3 py-2 text-[11px] bg-slate-900/60 rounded border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 font-sans resize-none"
              required
            />
          </div>

          {/* Technical Parameter Sliders */}
          <div className="grid grid-cols-2 gap-3 bg-slate-900/40 p-3 rounded border border-slate-900/60">
            <div className="space-y-1">
              <label className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Target LLM</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-slate-950 text-[10px] font-mono py-1 px-1.5 border border-slate-800 rounded text-slate-300 focus:outline-none focus:border-cyan-500"
              >
                <option value="claude-fable-5">Claude Fable 5 (Frontier Reasoning)</option>
                <option value="claude-haiku-4-5">Claude Haiku 4.5 (Low-Latency)</option>
                <option value="open-source-llama-70b">Llama 3.1 70B (Private Airgap)</option>
              </select>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[9px] font-mono">
                <span className="text-slate-500 uppercase tracking-wider">Temperature</span>
                <span className="text-cyan-400 font-bold">{selectedTemperature}</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.8"
                step="0.05"
                value={selectedTemperature}
                onChange={(e) => setSelectedTemperature(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 h-1 bg-slate-950 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isCompiling}
            className="w-full py-2.5 rounded bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10"
          >
            {isCompiling ? (
              <>
                <Settings className="w-4 h-4 animate-spin" />
                <span>Compiling Topology...</span>
              </>
            ) : (
              <>
                <Settings className="w-4 h-4 animate-spin-slow" />
                <span>Compile Agent Architecture</span>
              </>
            )}
          </button>
        </form>

        {/* Right Dashboard (The generated results) */}
        <div className="lg:col-span-8 flex flex-col gap-6 justify-center">
          <AnimatePresence mode="wait">
            {isCompiling ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="h-[400px] flex flex-col items-center justify-center text-center p-8 border border-slate-900 rounded-xl bg-slate-950/20"
              >
                <div className="relative w-16 h-16 mb-4">
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-500/10 animate-ping" />
                  <div className="absolute inset-2 rounded-full border-2 border-indigo-500/20 animate-pulse" />
                  <div className="absolute inset-4 rounded-full border border-teal-500/30 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-cyan-400 animate-spin-slow" />
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400 animate-pulse uppercase tracking-widest block mb-2">Analyzing Operational Specifications</span>
                <p className="text-xs text-slate-400 max-w-sm font-sans">
                  Mapping triggers to Directed Acyclic Graphs, building standard vector indexing schemas in Qdrant, generating high-performance micro-agent prompt topologies...
                </p>
              </motion.div>
            ) : compiledAgent ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* App Info Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-900 bg-slate-950/60 backdrop-blur-md">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold font-display tracking-wide text-slate-100">{compiledAgent.appName}</h3>
                      <span className="px-2 py-0.5 text-[8px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-bold">Compiled V1.0</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 max-w-xl font-sans">{compiledAgent.description}</p>
                  </div>
                  {/* Short Benchmarks summary */}
                  <div className="grid grid-cols-2 gap-4 border-l border-slate-900/80 pl-4 shrink-0 font-mono">
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block tracking-wider">Median Latency</span>
                      <span className="text-sm font-bold text-cyan-400">{compiledAgent.benchmarks.latencyMs}ms</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block tracking-wider">Accuracy Target</span>
                      <span className="text-sm font-bold text-emerald-400">{compiledAgent.benchmarks.accuracyRate}</span>
                    </div>
                  </div>
                </div>

                {/* Render the interactive DAG */}
                <AgentGraph nodes={compiledAgent.nodes} edges={compiledAgent.edges} />

                {/* Extra info grids */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left Box: Prompts, Tools & RAG Details */}
                  <div className="space-y-4">
                    
                    {/* RAG Context Panel */}
                    <div className="border border-slate-900/80 rounded-xl bg-slate-950/80 p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-indigo-400" />
                        <h4 className="text-xs font-semibold text-slate-200">Retrieval Augmented Memory Layer</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-[10px] font-mono text-slate-400 bg-slate-900/30 p-2.5 rounded border border-slate-900/60">
                        <div>
                          <span className="text-slate-500 block uppercase">Vector Database</span>
                          <span className="text-slate-200 font-medium">{compiledAgent.ragContext.vectorDatabase}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block uppercase">Chunking Strategy</span>
                          <span className="text-slate-200 font-medium">{compiledAgent.ragContext.chunkStrategy}</span>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Data Ingestion Streams</span>
                        <div className="flex flex-wrap gap-1">
                          {compiledAgent.ragContext.sourcesIngested.map((source, index) => (
                            <span key={index} className="px-2 py-0.5 text-[9px] rounded-md border border-slate-800 bg-slate-950 text-slate-400">
                              {source}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tool Schemas Panel */}
                    <div className="border border-slate-900/80 rounded-xl bg-slate-950/80 p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-amber-400" />
                        <h4 className="text-xs font-semibold text-slate-200">Active Operational Tool Schemas</h4>
                      </div>
                      <div className="space-y-2">
                        {compiledAgent.tools.map((tool, idx) => (
                          <div key={idx} className="bg-slate-900/40 p-2.5 rounded-lg border border-slate-900/60 text-[10px] space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-mono font-bold text-cyan-400">{tool.name}</span>
                              <span className="px-1.5 py-0.5 text-[8px] font-mono bg-slate-950 text-slate-500 rounded uppercase">Active binding</span>
                            </div>
                            <p className="text-slate-400 text-[10px] leading-relaxed font-sans">{tool.description}</p>
                            <div className="font-mono text-[9px] text-slate-500 space-y-0.5 bg-slate-950/80 p-2 rounded">
                              <div><span className="text-amber-500">API Endpoint:</span> {tool.apiEndpoint}</div>
                              <div><span className="text-emerald-500">Sample Return:</span> <span className="text-slate-400">{tool.mockResponseSample.length > 55 ? `${tool.mockResponseSample.slice(0, 52)}...` : tool.mockResponseSample}</span></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Box: Latency Benchmarks, Simulated Testing Area */}
                  <div className="space-y-4">
                    
                    {/* Latency Breakdown Bar chart */}
                    <div className="border border-slate-900/80 rounded-xl bg-slate-950/80 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-cyan-400" />
                          <h4 className="text-xs font-semibold text-slate-200">Critical Path Latency Contributions</h4>
                        </div>
                        <span className="text-[9px] font-mono text-slate-500 font-medium">P50 benchmark target</span>
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        {compiledAgent.latencyBreakdown.map((item, idx) => {
                          // Calculate percentage of total latency for bar width
                          const percentage = Math.min(100, Math.max(10, (item.latencyMs / compiledAgent.benchmarks.latencyMs) * 100));
                          return (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between text-[10px] font-mono">
                                <span className="text-slate-300">{item.component}</span>
                                <span className="text-cyan-400 font-bold">{item.latencyMs}ms</span>
                              </div>
                              <div className="h-1.5 bg-slate-900/80 rounded-full overflow-hidden border border-slate-900">
                                <div 
                                  className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full" 
                                  style={{ width: `${percentage}%` }} 
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Live Simulation Testing Tool */}
                    <div className="border border-slate-900/80 rounded-xl bg-slate-950/80 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-emerald-400 animate-pulse" />
                          <h4 className="text-xs font-semibold text-slate-200">Execution Simulation Sandbox</h4>
                        </div>
                        <span className="px-1.5 py-0.5 text-[8px] font-mono rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 uppercase font-bold">Emulator</span>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-slate-400 uppercase block">Simulate User Trigger Query</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={testInput}
                              onChange={(e) => setTestInput(e.target.value)}
                              className="w-full pl-3 pr-10 py-1.5 text-[10px] bg-slate-900/50 rounded border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 font-mono"
                              placeholder="Type test request..."
                              disabled={isSimulating}
                            />
                            <button
                              type="button"
                              onClick={handleSimulate}
                              disabled={isSimulating || !testInput.trim()}
                              className="absolute right-1 top-1 bottom-1 px-2.5 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-[9px] tracking-wide transition-all disabled:opacity-40"
                            >
                              {isSimulating ? "Streaming..." : "Run"}
                            </button>
                          </div>
                        </div>

                        {/* Streaming Log Screen */}
                        <div className="bg-slate-950 rounded border border-slate-900 p-3 h-52 overflow-y-auto font-mono text-[9.5px] leading-relaxed flex flex-col gap-2 relative">
                          
                          {/* Scroll Indicator */}
                          <div className="sticky top-0 right-0 left-0 bg-slate-950/90 py-1 border-b border-slate-900/50 text-[8px] text-slate-500 uppercase tracking-widest flex items-center justify-between z-10">
                            <span>Telemetry Stream logs</span>
                            <span className="flex items-center gap-1 font-bold">
                              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                              <span>Live Log Output</span>
                            </span>
                          </div>

                          {displayedLogs.length === 0 && !isSimulating && (
                            <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-600">
                              <Terminal className="w-5 h-5 mb-1 text-slate-700" />
                              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Console Standby</p>
                              <p className="text-[9px] text-slate-600 max-w-[190px] mt-0.5 font-sans">Click run above to trigger the simulated state machine trace log.</p>
                            </div>
                          )}

                          {isSimulating && displayedLogs.length === 0 && (
                            <div className="h-full flex items-center justify-center text-center p-4 text-cyan-400 text-[10px]">
                              <Settings className="w-4 h-4 animate-spin-slow mr-1.5 text-cyan-400" />
                              <span>Initiating simulation thread in container workspace...</span>
                            </div>
                          )}

                          {/* Stream Logs */}
                          {displayedLogs.map((log, index) => (
                            <div key={index} className="space-y-1 animate-fade-in">
                              <div className="flex items-start gap-1.5">
                                <span className="text-slate-500 text-[8px] tracking-wider font-semibold select-none mt-0.5">{log.timestamp}</span>
                                <span className={`px-1 rounded-[3px] text-[8px] font-bold select-none ${
                                  log.level === 'ERROR' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                  log.level === 'WARN' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                  log.level === 'DEBUG' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                                  'bg-slate-900 text-slate-400 border border-slate-800'
                                }`}>
                                  {log.level}
                                </span>
                                {log.nodeId && (
                                  <span className="text-cyan-400 font-bold">[{log.nodeId}]</span>
                                )}
                                <span className="text-slate-300 select-all">{log.message}</span>
                              </div>

                              {/* Payload block if any */}
                              {log.payload && (
                                <pre className="ml-10 p-2 rounded bg-slate-900/60 border border-slate-900/80 text-[8.5px] text-slate-400 max-h-24 overflow-y-auto select-all">
                                  {log.payload}
                                </pre>
                              )}
                            </div>
                          ))}

                          {currentResult && (
                            <div className="mt-2 p-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-400">
                              <div className="flex items-center gap-1.5 font-bold mb-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-[10px] uppercase tracking-wider">Final Output Action Resolved</span>
                              </div>
                              <p className="text-[9.5px] leading-relaxed text-slate-200">{currentResult}</p>
                              
                              {simulationTrace && (
                                <div className="mt-2 pt-2 border-t border-emerald-500/10 flex items-center justify-between text-[8px] text-emerald-500/60 font-semibold uppercase tracking-widest">
                                  <span>Trace complete in {simulationTrace.totalTimeMs}ms</span>
                                  <span>Tokens: {simulationTrace.tokensUsed.total}</span>
                                </div>
                              )}
                            </div>
                          )}

                          <div ref={terminalEndRef} />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-[450px] flex flex-col items-center justify-center text-center p-8 border border-slate-900 rounded-xl bg-slate-950/20">
                <div className="w-12 h-12 rounded bg-gradient-to-tr from-cyan-500/10 to-indigo-600/10 border border-slate-800 flex items-center justify-center mb-4 text-cyan-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold font-display tracking-tight text-slate-200 mb-1">No Active Compiler Session</h3>
                <p className="text-xs text-slate-400 max-w-sm mb-4 font-sans">
                  Select an enterprise use-case template on the left, adjust parameters, and compile the topology to see standard micro-agent state configurations.
                </p>
                <button
                  type="button"
                  onClick={() => handleCompile()}
                  className="px-4 py-2 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs tracking-wide transition-all cursor-pointer"
                >
                  Compile Preset 1 Immediately
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, Database, Network, Server, Zap, RefreshCw, 
  Terminal, ArrowRight, Play, CheckCircle2, ShieldAlert
} from 'lucide-react';

interface ComponentDetail {
  id: string;
  name: string;
  role: string;
  tech: string;
  description: string;
  metrics: string[];
  samplePayload: string;
  incomingFrom: string[];
  outgoingTo: string[];
}

const ARCHITECTURE_COMPONENTS: ComponentDetail[] = [
  {
    id: 'fastapi',
    name: 'FastAPI Gateway',
    role: 'API Ingress & Real-Time Connection Router',
    tech: 'Python 3.12 / ASGI / Uvicorn',
    description: 'Handles all external client interactions, including WebSocket-based sub-100ms bidirectional streams, secure REST API calls, and payload structural validation with strict Pydantic v2 schemas.',
    metrics: [
      'Throughput: 15,000+ request/sec per pod',
      'Average Latency: < 4.2ms ingress overhead',
      'WebSocket Connections: Up to 50k concurrent streams'
    ],
    samplePayload: `{
  "request_id": "req_01j23y7h9z9a",
  "client_id": "tenant_enterprise_7",
  "channel": "voice_websocket",
  "payload": {
    "audio_chunk_base64": "UklGRiZ...base64_encoded_pcm",
    "metadata": { "session_id": "sess_9182" }
  }
}`,
    incomingFrom: ['Client WebApp', 'WhatsApp Gateway', 'Twilio Trunk'],
    outgoingTo: ['Redis (Stream)', 'LangGraph Router']
  },
  {
    id: 'redis',
    name: 'Redis Cache & Session Hub',
    role: 'Ultra-Low Latency State & Token Memory Store',
    tech: 'Redis v7.2 Cluster / ElastiCache',
    description: 'Acts as the transient memory layer. Holds context, ongoing user conversations, WebSocket session buffers, rate-limiting counters, and short-term locks. Enables horizontal scaling by making the FastAPI gateway completely stateless.',
    metrics: [
      'Read/Write Latency: Sub-1ms (P99)',
      'Storage Scope: Ephemeral conversational history',
      'Locking Speed: < 0.2ms distributed locks'
    ],
    samplePayload: `{
  "session:sess_9182:context": {
    "last_interaction": "2026-07-06T07:44:12Z",
    "user_intent_history": ["pricing_inquiry", "schedule_demo"],
    "voice_vad_buffer_ms": 180,
    "current_agent_lock": "node_triage_0"
  }
}`,
    incomingFrom: ['FastAPI Gateway', 'LangGraph Router'],
    outgoingTo: ['LangGraph Router']
  },
  {
    id: 'langgraph',
    name: 'LangGraph Orchestrator',
    role: 'Stateful DAG & Agent Decision Core',
    tech: 'LangGraph SDK / Custom Stateful Router',
    description: 'Calculates the optimal state transition graph (Directed Acyclic Graph). Runs specialized worker agents, evaluates guardrails, monitors system constraints, and manages handoffs between sub-agents deterministically.',
    metrics: [
      'Execution Engine: Fully asynchronous node scheduler',
      'State Preservation: Thread-persistent state machine',
      'Guardrail Latency: < 15ms custom evaluation node'
    ],
    samplePayload: `{
  "current_node": "evaluate_compliance_thresholds",
  "state_history": ["ingest", "vector_lookup", "guardrail_check"],
  "agent_states": {
    "lead_score": 9.4,
    "is_compliant": true,
    "handoff_required": false
  },
  "next_transition": "synthesize_final_response"
}`,
    incomingFrom: ['FastAPI Gateway', 'Redis Cache', 'Qdrant Embeddings'],
    outgoingTo: ['Redis Cache', 'Qdrant Vector DB', 'PostgreSQL Logs']
  },
  {
    id: 'qdrant',
    name: 'Qdrant Vector Database',
    role: 'High-Density Hybrid Retrieval (RAG) Engine',
    tech: 'Qdrant / HNSW indexing / Cosine similarity',
    description: 'Stores and searches high-dimensional embeddings of all enterprise knowledge. Utilizes custom parent-child relational chunk graphs to pull accurate context blocks while maintaining precise permission filters.',
    metrics: [
      'Database Size: 120M+ custom document vectors',
      'Lookup Speed: < 8.5ms (99% precision)',
      'Index Strategy: Hybrid dense (1536-dim) + sparse BM25'
    ],
    samplePayload: `{
  "query_vector": [0.012, -0.045, 0.982, "...1536_floats"],
  "filter": {
    "must": [
      { "key": "tenant_id", "match": { "value": "tenant_enterprise_7" } },
      { "key": "user_role_scope", "match": { "value": "support_tier_1" } }
    ]
  },
  "top_k": 3,
  "score_threshold": 0.82
}`,
    incomingFrom: ['LangGraph Router'],
    outgoingTo: ['LangGraph Router']
  },
  {
    id: 'postgres',
    name: 'PostgreSQL Relational DB',
    role: 'Transactional System of Record & Audit Ledger',
    tech: 'PostgreSQL 16 / Aurora Serverless',
    description: 'Maintains long-term, durable relational models including user accounts, enterprise settings, billing history, agent configuration tables, and granular immutable compliance audit trails.',
    metrics: [
      'Uptime SLA: 99.999% multi-region cluster',
      'Compliance Standard: HIPAA / SOC2 compliant encryption',
      'Backup Schedule: Continuous point-in-time recovery'
    ],
    samplePayload: `{
  "transaction_id": "tx_981273918237",
  "audit_log": {
    "timestamp": "2026-07-06T07:44:13.125Z",
    "event_type": "agent_action_completed",
    "actor_id": "agent_voice_triage_7",
    "regulatory_hash": "e3b0c44298fc1c149afbf4c8996fb924"
  }
}`,
    incomingFrom: ['LangGraph Router', 'FastAPI Gateway'],
    outgoingTo: ['Admin Dashboard', 'BI Tools']
  }
];

export function ArchitectureDiagram() {
  const [activeNode, setActiveNode] = useState<string>('langgraph');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<number>(-1);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);

  const activeDetail = ARCHITECTURE_COMPONENTS.find(n => n.id === activeNode) || ARCHITECTURE_COMPONENTS[2];

  // Simulation steps representing the real-world flow
  const SIMULATION_STEPS = [
    { node: 'fastapi', log: '📥 Inbound voice/messaging stream received. Validating Pydantic JSON payload...' },
    { node: 'redis', log: '🔑 Session context retrieved from cache in 0.4ms. Acquiring distributed thread lock...' },
    { node: 'langgraph', log: '🧠 State machine triggered. LangGraph schedules current active routing node...' },
    { node: 'qdrant', log: '🔍 Query vector computed. Performing Qdrant hybrid semantic search with tenant filters...' },
    { node: 'langgraph', log: '⚖️ Core agent executes compliance guardrails. No security violations detected.' },
    { node: 'postgres', log: '💾 Transaction logging dispatched to Postgres. Creating permanent compliance audit block...' },
    { node: 'fastapi', log: '📤 Synthesized output streamed back to the client WebSocket. Request complete in 455ms!' }
  ];

  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(0);
    setSimulationLog(['🚀 Initiating real-time transaction simulation...']);
    setActiveNode('fastapi');
  };

  useEffect(() => {
    if (!isSimulating || simulationStep < 0) return;

    if (simulationStep < SIMULATION_STEPS.length) {
      const step = SIMULATION_STEPS[simulationStep];
      setActiveNode(step.node);
      setSimulationLog(prev => [...prev, step.log]);

      const timer = setTimeout(() => {
        setSimulationStep(prev => prev + 1);
      }, 1600);

      return () => clearTimeout(timer);
    } else {
      setIsSimulating(false);
      setSimulationStep(-1);
    }
  }, [isSimulating, simulationStep]);

  return (
    <div className="border border-slate-900 rounded-2xl bg-white p-6 sm:p-8 space-y-8 backdrop-blur-md relative overflow-hidden">
      
      {/* Decorative cybernetic background lines */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-[80px] pointer-events-none" />

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold font-display tracking-wide text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            Interactive Production Architecture
          </h3>
          <p className="text-xs text-slate-400 font-sans max-w-xl">
            Click on any module to inspect its live specifications, cluster role, performance latency, and active data structure.
          </p>
        </div>
        <div>
          <button
            onClick={startSimulation}
            disabled={isSimulating}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold tracking-wide flex items-center gap-2 border transition-all ${
              isSimulating 
                ? 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-cyan-400/10 border-cyan-400/20 hover:border-cyan-400 text-cyan-400 cursor-pointer shadow-sm hover:shadow-cyan-400/5'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            {isSimulating ? 'Simulating Pipeline...' : 'Simulate Packet Flow'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* DIAGRAM PANEL (Col-span 7) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-8 bg-slate-950 rounded-xl border border-slate-200 p-6 relative min-h-[380px]">
          
          <div className="absolute top-2 right-3 flex items-center gap-1.5 font-mono text-[9px] text-slate-500">
            <span className={`w-1.5 h-1.5 rounded-full ${isSimulating ? 'bg-cyan-400 animate-pulse' : 'bg-emerald-500'}`} />
            <span>{isSimulating ? 'SIMULATION RUNNING' : 'SYSTEM HEALTH: OPTIMAL'}</span>
          </div>

          {/* Visual node layout */}
          <div className="flex flex-col justify-center items-center h-full space-y-6 py-4">
            
            {/* Top Row: API Gateway */}
            <div className="w-full flex justify-center">
              <button
                onClick={() => !isSimulating && setActiveNode('fastapi')}
                className={`w-48 p-3 rounded-xl border text-left transition-all relative ${
                  activeNode === 'fastapi'
                    ? 'bg-cyan-400/10 border-cyan-400 shadow-md shadow-cyan-400/10 scale-105 z-10'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Server className={`w-4 h-4 ${activeNode === 'fastapi' ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-slate-800">FastAPI Ingress</span>
                </div>
                <div className="text-[9px] font-sans text-slate-400 mt-1">Python 3.12 / WebSocket</div>
                {activeNode === 'fastapi' && (
                  <span className="absolute -bottom-1.5 -right-1.5 px-1 py-0.5 rounded bg-cyan-400 text-slate-900 text-[7px] font-mono font-bold uppercase tracking-widest">Active</span>
                )}
              </button>
            </div>

            {/* Connecting line / indicators */}
            <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-500/20 to-indigo-500/20 relative">
              {isSimulating && activeNode === 'fastapi' && (
                <span className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
              )}
            </div>

            {/* Middle Row: Cache, Orchestrator, Database */}
            <div className="w-full grid grid-cols-3 gap-3 items-stretch">
              
              {/* Redis Cache */}
              <button
                onClick={() => !isSimulating && setActiveNode('redis')}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  activeNode === 'redis'
                    ? 'bg-red-500/10 border-red-500/60 shadow-md shadow-red-500/5 scale-105 z-10'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Zap className={`w-4 h-4 ${activeNode === 'redis' ? 'text-red-400' : 'text-slate-400'}`} />
                    <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-slate-800">Redis Cache</span>
                  </div>
                  <div className="text-[9px] font-sans text-slate-400 mt-1">Cluster Hub</div>
                </div>
                <div className="text-[8px] font-mono text-slate-500 mt-2 text-right">Sub-1ms latency</div>
                {activeNode === 'redis' && (
                  <span className="absolute -bottom-1.5 -right-1.5 px-1 py-0.5 rounded bg-red-500 text-white text-[7px] font-mono font-bold uppercase tracking-widest">Active</span>
                )}
              </button>

              {/* LangGraph Orchestrator (Centerpiece) */}
              <button
                onClick={() => !isSimulating && setActiveNode('langgraph')}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between min-h-[100px] ${
                  activeNode === 'langgraph'
                    ? 'bg-indigo-400/10 border-indigo-400 shadow-lg shadow-indigo-400/10 scale-105 z-10'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Network className={`w-4 h-4 ${activeNode === 'langgraph' ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-slate-800">LangGraph</span>
                  </div>
                  <div className="text-[9px] font-sans text-slate-400 mt-1">State Machine</div>
                </div>
                <div className="text-[8px] font-mono text-slate-500 mt-2 text-right">Stateful DAGs</div>
                {activeNode === 'langgraph' && (
                  <span className="absolute -bottom-1.5 -right-1.5 px-1 py-0.5 rounded bg-indigo-400 text-white text-[7px] font-mono font-bold uppercase tracking-widest">Active</span>
                )}
              </button>

              {/* Qdrant Vector Engine */}
              <button
                onClick={() => !isSimulating && setActiveNode('qdrant')}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  activeNode === 'qdrant'
                    ? 'bg-purple-500/10 border-purple-500/60 shadow-md shadow-purple-500/5 scale-105 z-10'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Cpu className={`w-4 h-4 ${activeNode === 'qdrant' ? 'text-purple-400' : 'text-slate-400'}`} />
                    <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-slate-800">Qdrant DB</span>
                  </div>
                  <div className="text-[9px] font-sans text-slate-400 mt-1">Vector Index</div>
                </div>
                <div className="text-[8px] font-mono text-slate-500 mt-2 text-right">Hybrid Search</div>
                {activeNode === 'qdrant' && (
                  <span className="absolute -bottom-1.5 -right-1.5 px-1 py-0.5 rounded bg-purple-500 text-white text-[7px] font-mono font-bold uppercase tracking-widest">Active</span>
                )}
              </button>

            </div>

            {/* Connecting lines */}
            <div className="w-0.5 h-6 bg-gradient-to-b from-indigo-500/20 to-emerald-500/20" />

            {/* Bottom Row: Relational Database DB */}
            <div className="w-full flex justify-center">
              <button
                onClick={() => !isSimulating && setActiveNode('postgres')}
                className={`w-48 p-3 rounded-xl border text-left transition-all relative ${
                  activeNode === 'postgres'
                    ? 'bg-emerald-500/10 border-emerald-500 shadow-md shadow-emerald-500/10 scale-105 z-10'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Database className={`w-4 h-4 ${activeNode === 'postgres' ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-slate-800">PostgreSQL</span>
                </div>
                <div className="text-[9px] font-sans text-slate-400 mt-1">Audit Log & System of Record</div>
                {activeNode === 'postgres' && (
                  <span className="absolute -bottom-1.5 -right-1.5 px-1 py-0.5 rounded bg-emerald-500 text-slate-900 text-[7px] font-mono font-bold uppercase tracking-widest">Active</span>
                )}
              </button>
            </div>

          </div>

          {/* SIMULATION CONSOLE LOGS */}
          <div className="bg-slate-950 rounded-xl border border-slate-200 p-3.5 font-mono text-[10px] space-y-1 bg-gradient-to-r from-slate-950 via-slate-950 to-slate-900">
            <div className="flex items-center justify-between text-slate-500 border-b border-slate-900 pb-1.5 mb-1.5">
              <span>SIMULATION TELEMETRY STREAM</span>
              <span className="animate-pulse text-cyan-400">● LIVE FEED</span>
            </div>
            {simulationLog.length === 0 ? (
              <span className="text-slate-600 italic">Click "Simulate Packet Flow" above to trigger telemetry stream data...</span>
            ) : (
              <div className="space-y-1 max-h-[80px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
                {simulationLog.map((log, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <span className="text-cyan-500/80 font-bold">[{idx}]</span>
                    <span className="text-slate-700 leading-relaxed">{log}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* SPECIFICATION PANEL (Col-span 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between border border-slate-900 rounded-xl bg-slate-50 p-5 space-y-5">
          
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">Platform Cluster Component</span>
              <h4 className="text-base font-extrabold text-slate-900 font-display">{activeDetail.name}</h4>
              <p className="text-[10px] font-mono text-slate-400 font-semibold italic">{activeDetail.role}</p>
            </div>

            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              {activeDetail.description}
            </p>

            <div className="space-y-2 border-t border-slate-200 pt-3">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Active Performance Specifications</span>
              <ul className="space-y-1.5 text-[11px] text-slate-700 font-sans">
                {activeDetail.metrics.map((metric, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-2 border-t border-slate-200 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Active Data Schema / Payload</span>
              <span className="text-[8px] font-mono text-cyan-400">{activeDetail.tech}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 font-mono text-[9.5px] text-slate-300 overflow-x-auto max-h-[160px] scrollbar-thin">
              <pre className="text-cyan-300/90 whitespace-pre">{activeDetail.samplePayload}</pre>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

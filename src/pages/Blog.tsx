import React, { useState } from 'react';
import { Link } from '../components/Router';
import { 
  BookOpen, Calendar, Clock, ArrowRight, ArrowLeft, Terminal, Code, Database, Zap, Sparkles, ChevronRight, Share2, CornerUpLeft, Shield
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  paragraphs: string[];
  specs: { label: string; value: string }[];
  codeBlock?: string;
  codeLanguage?: string;
  icon: React.ReactNode;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
}

const POSTS: BlogPost[] = [
  {
    id: 'compressing-voice-latency',
    title: 'How We Compressed Voice Sockets From 1.8s to 480ms',
    date: 'July 2, 2026',
    readTime: '6 min read',
    category: 'Latency Optimization',
    summary: 'Traditional wrapper setups suffer from terrible, un-conversational hold delays. By utilizing raw WebSocket streams, custom Voice Activity Detection, and persistent weights caching, we compressed the voice loop to just 480ms.',
    paragraphs: [
      'The biggest hurdle in autonomous clinical call-center operations is voice roundtrip latency. If a patient speaks and the AI assistant takes 1.8 seconds to reply, the patient immediately gets confused, speaks over the assistant, and the conversation details fragment.',
      'Traditional architectures rely on generic wrapper APIs that run the STT, LLM inference, and TTS sequentially as isolated HTTP POST requests. Each request suffers from severe cold-starts, DNS resolution times, and unbuffered network payload handoffs.',
      'To resolve this latency bottleneck, Mashnu AI engineers developed a bare-metal WebSocket gateway that handles audio streaming in chunks of 20ms. We paired this gateway with custom, noise-resilient Voice Activity Detection (VAD) algorithms running locally on our enclaves to instantly trigger state transitions.',
      'By coupling this stream with persistent, warm model inference routes and unbuffered ElevenLabs chunk-streaming outputs, we trimmed over 1,300ms off standard pipelines, achieving a highly fluid P50 voice roundtrip latency of just 480ms.'
    ],
    codeLanguage: 'typescript',
    codeBlock: `// Streaming audio chunks directly from raw phone websocket
import { AudioStreamer } from '@mashnu/voice-core';

const gateway = new AudioStreamer({
  chunkSize: 320, // 20ms chunks at 16kHz
  vadThreshold: -45.0, // db
  modelContext: "warm-patient-intake-v3"
});

gateway.on('speech_start', () => {
  console.log('[VAD] Speech start detected. Buffering downstream voice state...');
  engine.interruptActivePlayback();
});

gateway.on('chunk', async (pcmBytes) => {
  const textToken = await STT.stream(pcmBytes);
  if (textToken) {
    LLM.feedToken(textToken);
  }
});`,
    specs: [
      { label: 'Original Latency', value: '1,800ms' },
      { label: 'Mashnu Latency', value: '480ms' },
      { label: 'Audio Chunk Size', value: '20ms' }
    ],
    icon: <Zap className="w-5 h-5 text-amber-500" />,
    author: {
      name: 'Elena Rostova',
      role: 'Principal Voice Pipeline Engineer',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=120&auto=format&fit=crop'
    }
  },
  {
    id: 'why-embeddings-fail-compliance',
    title: 'Why Dense Vector Embeddings Alone Fail Corporate Compliance Tests',
    date: 'June 24, 2026',
    readTime: '8 min read',
    category: 'RAG Architecture',
    summary: 'Standard vector search has severe semantic blind spots, often pulling irrelevant clauses during legal audits. We break down why hybrid BM25 + parent-child chunk mapping is mandatory for corporate data governance.',
    paragraphs: [
      'Standard vector database searches operate on raw cosine similarity of text segment embeddings. While vectors excel at general semantic matching, they possess critical blind spots when querying technical codes, exact paragraph indexes, or regulatory identifiers.',
      'For instance, if a compliance officer queries a policy about "Section 4.2 breach parameters," a pure vector model frequently retrieves general section paragraphs that look mathematically close in semantic space, but misses the precise sub-clause detailing active penalty rules.',
      'To eliminate compliance leakage, Mashnu RAG pipelines deploy a hybrid search engine in Qdrant. We combine dense vector embeddings with BM25 keyword matching, ensuring that both general conceptual meaning and exact regulatory key phrases are scored concurrently.',
      'Additionally, we utilize recursive Parent-Child chunking. Instead of indexing isolated, floating 256-character text fragments, we map child chunks back to their structural parent document layout (e.g. section headings and audit dates), preserving critical document context and achieving 99.6% retrieval precision.'
    ],
    codeLanguage: 'python',
    codeBlock: `# Hybrid Search Ingestion & Mapping Topology
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

qdrant = QdrantClient(url="https://qdrant.mashnu-internal.net")

# Map dense embeddings and sparse keyword elements concurrently
results = qdrant.query_points(
    collection_name="compliance_sops",
    prefetch=[
        models.Prefetch(query=dense_vector, list_name="dense-1536", limit=20),
        models.Prefetch(query=sparse_indices, list_name="sparse-keyword", limit=20)
    ],
    query=models.FusionQuery(fusion=models.Fusion.RRF) # Reciprocal Rank Fusion
)`,
    specs: [
      { label: 'Retrieval Precision', value: '99.6%' },
      { label: 'Chunking Mapping', value: 'Parent-Child' },
      { label: 'Hybrid Scoring', value: 'Dense + BM25' }
    ],
    icon: <Database className="w-5 h-5 text-indigo-500" />,
    author: {
      name: 'Marcus Vance',
      role: 'Director of RAG Infrastructure',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=120&auto=format&fit=crop'
    }
  },
  {
    id: 'deterministic-multi-agent-handoffs',
    title: 'Stateful Handoffs: Deterministic Conditional Branches in Multi-Agent DAGs',
    date: 'June 10, 2026',
    readTime: '7 min read',
    category: 'Agent Orchestration',
    summary: 'Autonomous loops frequently experience task recursion and infinite loops under standard LLM agent configurations. We outline how state validation with Pydantic and LangGraph ensures secure multi-agent collaboration.',
    paragraphs: [
      'Most open-source multi-agent frameworks let LLMs decide their own handoffs dynamically. While flexible, this approach leads to massive operational risks in enterprise environments, such as infinite execution loops, data write errors, and total loss of state trace.',
      'In a typical financial ledger reconciliation pipeline, a generic agent might constantly rewrite database state without validating if a previous invoice extraction node completed successfully, exhausting API tokens and scrambling billing ledgers.',
      'Mashnu AI prevents agent recursion by building stateful, handoff-based networks on LangGraph. We enforce strict declarative state transitions using Pydantic schemas. Every node execution requires the preceding state variables to be fully validated.',
      'If an invoice extraction node produces a schema variance greater than 5%, our state router halts autonomous execution and issues an immediate, secure Slack approval notification. This hybrid human-in-the-loop checkpoint structure ensures absolute data security.'
    ],
    codeLanguage: 'typescript',
    codeBlock: `// Declaring state schemas for strict node transitions in LangGraph
import { StateGraph, Annotation } from "@langchain/langgraph";
import { z } from "zod";

const LedgerState = Annotation.Root({
  invoiceExtracted: Annotation.Property<boolean>(),
  discrepancyDelta: Annotation.Property<number>(),
  humanAuthorized: Annotation.Property<boolean>()
});

function stateRouter(state: typeof LedgerState.State) {
  if (state.discrepancyDelta > 0.05 && !state.humanAuthorized) {
    return "trigger_human_slack_checkpoint";
  }
  return "write_to_postgresql_ledger";
}`,
    specs: [
      { label: 'State Validation', value: 'Pydantic/Zod' },
      { label: 'Routing Logic', value: 'Deterministic DAG' },
      { label: 'Approval Triggers', value: 'Human-in-the-Loop' }
    ],
    icon: <Code className="w-5 h-5 text-emerald-600" />,
    author: {
      name: 'Nikhil Bharadwaj',
      role: 'Founding Systems Architect',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=120&auto=format&fit=crop'
    }
  }
];

export default function Blog() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const selectedPost = POSTS.find(p => p.id === selectedPostId);

  return (
    <div className="relative min-h-screen text-[#0F172A] font-sans selection:bg-[#2563EB]/20 selection:text-[#2563EB] py-16">
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* INTERACTIVE ROUTING HEADER */}
        {selectedPost ? (
          /* SINGLE ARTICLE VIEW */
          <div className="space-y-8 max-w-3xl mx-auto animate-fade-in">
            
            {/* Breadcrumb / Back button */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setSelectedPostId(null)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-sans text-[#0F172A] hover:text-[#2563EB] border border-[#E2E8F0] rounded-full bg-white shadow-sm transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Engineering Index</span>
              </button>
              
              <div className="flex items-center gap-1 text-[10.5px] font-sans text-[#64748B]">
                <span>Mashnu Systems Engineering Log</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-[#2563EB] font-semibold">{selectedPost.category}</span>
              </div>
            </div>

            {/* Article Canvas */}
            <article className="border border-[#E2E8F0] rounded-[24px] bg-white p-6 sm:p-10 space-y-8 shadow-sm">
              
              {/* Header meta */}
              <div className="space-y-4 border-b border-[#E2E8F0] pb-6">
                <div className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-wider text-[#64748B]">
                  <Calendar className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>{selectedPost.readTime}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F172A] leading-tight">
                  {selectedPost.title}
                </h1>
                
                {/* Author Avatar, Name, Role explicitly visible here */}
                <div className="flex items-center gap-3 pt-3">
                  <img 
                    src={selectedPost.author.avatarUrl} 
                    alt={selectedPost.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#E2E8F0] shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="font-sans font-semibold text-xs text-[#0F172A] block leading-none">{selectedPost.author.name}</span>
                    <span className="font-sans text-[11px] text-[#64748B] mt-0.5 block">{selectedPost.author.role}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#0F172A] leading-relaxed font-sans italic border-l-2 border-[#2563EB] pl-4 py-2 bg-[#F1F5F9] rounded-r mt-4">
                  {selectedPost.summary}
                </p>
              </div>

              {/* Body Paragraphs */}
              <div className="space-y-5 text-xs sm:text-sm text-[#334155] leading-relaxed font-sans">
                {selectedPost.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Code Blocks Template (Build in Public Code sample) */}
              {selectedPost.codeBlock && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between bg-[#F1F5F9] border-t border-x border-[#E2E8F0] rounded-t-lg px-4 py-2 font-sans text-[10px] text-[#64748B]">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>{selectedPost.id}.{selectedPost.codeLanguage || 'ts'}</span>
                    </span>
                    <span className="text-[9px] uppercase font-semibold text-[#64748B]">Mashnu Compiled Spec</span>
                  </div>
                  <pre className="bg-[#0F172A] p-4 rounded-b-lg font-mono text-[11px] text-[#F1F5F9] overflow-x-auto leading-relaxed shadow-inner">
                    <code>{selectedPost.codeBlock}</code>
                  </pre>
                </div>
              )}

              {/* Specifications Matrix */}
              <div className="space-y-3 pt-4 border-t border-[#E2E8F0]">
                <h3 className="text-xs font-sans uppercase tracking-wider text-[#64748B] font-semibold">Systems Diagnostic Metrics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-[11px]">
                  {selectedPost.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="bg-[#F1F5F9] p-3.5 rounded-xl border border-[#E2E8F0] flex flex-col justify-center">
                      <span className="text-[#64748B] uppercase block tracking-wider text-[9px]">{spec.label}</span>
                      <span className="text-[#0F172A] font-semibold block mt-1">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </article>

            {/* Back footer bar */}
            <div className="flex justify-center pt-4">
              <button 
                onClick={() => setSelectedPostId(null)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-sans font-medium text-[#0F172A] hover:text-[#2563EB] border border-[#E2E8F0] rounded-full bg-white shadow-sm transition-colors cursor-pointer"
              >
                <CornerUpLeft className="w-4 h-4" />
                <span>Return to Engineering Index</span>
              </button>
            </div>

          </div>
        ) : (
          /* INDEX BLOG POSTS LIST */
          <div className="space-y-12 animate-fade-in">
            
            {/* Page Header */}
            <section className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-[11px] font-semibold text-[#2563EB] uppercase tracking-wider block">
                Technical Blog
              </span>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.02em] text-[#0F172A] leading-tight">
                Build-In-Public Log
              </h1>
              <p className="text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto">
                Raw systems engineering breakdowns detailing how we resolve voice latencies, optimize database vectors, and validate multi-agent states.
              </p>
            </section>

            {/* Articles Cards Grid */}
            <div className="space-y-8 max-w-4xl mx-auto">
              {POSTS.map((post) => (
                <article 
                  key={post.id}
                  className="border border-[#E2E8F0] rounded-[24px] bg-white p-6 sm:p-8 space-y-5 hover:border-[#CBD5E1] hover:shadow-md transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedPostId(post.id)}
                >
                  
                  {/* Card Meta with Author profile */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={post.author.avatarUrl} 
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#E2E8F0]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="font-sans font-semibold text-xs text-[#0F172A] block">{post.author.name}</span>
                        <span className="font-sans text-[10px] text-[#64748B] mt-0.5 block">{post.author.role}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-[11px] text-[#64748B]">
                      <span className="px-2.5 py-0.5 text-[9px] font-semibold rounded-full bg-[#F1F5F9] text-[#0F172A] border border-[#E2E8F0]">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  {/* Diagnostics preview bar & Read link */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]/60 text-[11px] text-[#64748B]">
                    <div className="hidden sm:flex gap-6">
                      {post.specs.slice(0, 2).map((s, idx) => (
                        <div key={idx} className="flex gap-1">
                          <span className="text-[#64748B] uppercase font-medium text-[9px]">{s.label}:</span>
                          <span className="text-[#0F172A] font-semibold">{s.value}</span>
                        </div>
                      ))}
                    </div>
                    
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#2563EB] font-semibold tracking-tight group-hover:underline">
                      Read Breakdown
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>

                </article>
              ))}
            </div>

          </div>
        )}

        {/* Unified Call to Action */}
        <section className="rounded-[32px] bg-[#F1F5F9] p-8 sm:p-12 text-center space-y-6 border border-[#E2E8F0] relative overflow-hidden max-w-4xl mx-auto mt-20">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#0F172A]">
            Deploy Engineered AI Solutions Into Your Operations
          </h2>
          <p className="text-sm text-[#64748B] max-w-xl mx-auto leading-relaxed">
            Ready to integrate low-latency voice receptionists, hybrid retrieval databases, and stateful multi-agent DAG pipelines? Schedule an interactive systems briefing today.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex px-6 py-2 rounded-full bg-[#0F172A] hover:bg-[#334155] text-white font-medium text-xs tracking-tight transition-colors items-center gap-1.5 shadow-sm"
            >
              Book Systems Briefing
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

      </main>

    </div>
  );
}

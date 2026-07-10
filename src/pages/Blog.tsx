import React, { useState } from 'react';
import { Link } from '../components/Router';
import { useSEO } from '../components/SEO';
import {
  Calendar, Clock, ArrowRight, ArrowLeft, Code, Database, Zap, ChevronRight, CornerUpLeft
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
    title: 'How We Cut Voice Response Times by Nearly 75%',
    date: 'July 2, 2026',
    readTime: '6 min read',
    category: 'Latency Optimization',
    summary: 'Off-the-shelf voice setups suffer from awkward, un-conversational hold delays. By rethinking how audio is streamed and processed, we cut the voice response loop down to a fraction of a second.',
    paragraphs: [
      'The biggest hurdle in autonomous clinical call-center operations is voice response time. If a patient speaks and the AI assistant takes almost two seconds to reply, the patient immediately gets confused, speaks over the assistant, and the conversation loses its flow.',
      'Off-the-shelf approaches tend to run each part of the voice pipeline as separate, isolated steps, each with its own delay and network overhead. Those delays compound quickly.',
      'To resolve this, Mashnu AI engineers built a streaming audio pipeline that processes speech continuously in small chunks, paired with noise-resilient speech detection that reacts instantly to when someone starts or stops talking.',
      'By keeping the whole pipeline warm and streaming end-to-end instead of processing in isolated steps, we cut response time down dramatically, making conversations feel natural instead of laggy.'
    ],
    specs: [
      { label: 'Original Response Time', value: '1.8s' },
      { label: 'Current Response Time', value: 'Under 0.5s' },
      { label: 'Improvement', value: '~75% faster' }
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
    title: 'Why Search Alone Isn’t Enough for Compliance Teams',
    date: 'June 24, 2026',
    readTime: '8 min read',
    category: 'Enterprise Search',
    summary: 'Standard search has real blind spots, often pulling irrelevant clauses during legal audits. We break down why combining meaning-based and keyword search is essential for corporate data governance.',
    paragraphs: [
      'Standard search tools match text based on general similarity. While they excel at general topic matching, they have real blind spots when someone is searching for exact technical codes, paragraph numbers, or regulatory identifiers.',
      'For instance, if a compliance officer searches for a policy about "Section 4.2 breach parameters," a general similarity search frequently retrieves related sections that look topically close, but misses the precise sub-clause detailing active penalty rules.',
      'To eliminate that gap, Mashnu search pipelines combine meaning-based search with exact keyword matching, ensuring that both general concepts and exact regulatory phrases are scored together.',
      'We also preserve document structure. Instead of indexing isolated, floating fragments of text, we map every passage back to its place in the original document (section headings, audit dates, and all), preserving critical context and achieving 99.6% retrieval precision.'
    ],
    specs: [
      { label: 'Retrieval Precision', value: '99.6%' },
      { label: 'Context Preservation', value: 'Full document structure' },
      { label: 'Search Approach', value: 'Meaning + Keyword' }
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
    title: 'Why We Don’t Let Agents Freewheel Through Multi-Step Workflows',
    date: 'June 10, 2026',
    readTime: '7 min read',
    category: 'Agent Orchestration',
    summary: 'Loosely coordinated automation frequently gets stuck in loops or repeats steps under standard configurations. We outline how strict state validation ensures secure, reliable multi-step collaboration.',
    paragraphs: [
      'Most off-the-shelf multi-agent setups let each step decide its own handoffs dynamically. While flexible, this approach leads to real operational risks in enterprise environments, such as repeated execution loops, data write errors, and total loss of state tracking.',
      'In a typical financial ledger reconciliation workflow, a loosely coordinated system might constantly rewrite records without validating whether a previous step completed successfully, exhausting resources and scrambling billing ledgers.',
      'Mashnu AI prevents this by building reliable, handoff-based workflows with strict validation at every step. Every step requires the preceding state to be fully validated before it can proceed.',
      'If a step produces a variance greater than 5%, our system halts automatic execution and issues an immediate approval notification to a real person. This human-in-the-loop checkpoint ensures nothing moves forward without a check.'
    ],
    specs: [
      { label: 'Validation', value: 'Every step checked' },
      { label: 'Routing Logic', value: 'Deterministic, not freeform' },
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

  useSEO(
    selectedPost
      ? {
          title: selectedPost.title,
          description: selectedPost.summary,
          path: '/blog',
          structuredData: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: selectedPost.title,
            description: selectedPost.summary,
            datePublished: selectedPost.date,
            author: { '@type': 'Person', name: selectedPost.author.name },
          },
        }
      : {
          title: 'Blog: Engineering Notes from Mashnu AI',
          description: 'Technical writing on building reliable AI voice, WhatsApp, and automation agents, from the engineers building Mashnu AI.',
          path: '/blog',
        }
  );

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
                <span>Back to Blog</span>
              </button>
              
              <div className="flex items-center gap-1 text-[10.5px] font-sans text-[#64748B]">
                <span>Mashnu Blog</span>
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

              {/* Specifications Matrix */}
              <div className="space-y-3 pt-4 border-t border-[#E2E8F0]">
                <h3 className="text-xs font-sans uppercase tracking-wider text-[#64748B] font-semibold">Key Results</h3>
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
                <span>Back to Blog</span>
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
                Behind the Scenes
              </h1>
              <p className="text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto">
                Honest breakdowns of how we make voice responses faster, search more accurate, and multi-step automation more reliable.
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
            Put This to Work in Your Operations
          </h2>
          <p className="text-sm text-[#64748B] max-w-xl mx-auto leading-relaxed">
            Ready to add fast voice agents, accurate enterprise search, or reliable multi-step automation to your business? Schedule a conversation today.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex px-6 py-2 rounded-full bg-[#0F172A] hover:bg-[#334155] text-white font-medium text-xs tracking-tight transition-colors items-center gap-1.5 shadow-sm"
            >
              Book a Conversation
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

      </main>

    </div>
  );
}

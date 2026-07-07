import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Sparkles, Terminal, Shield, RefreshCw, Cpu, MessageSquare, 
  ChevronRight, Brain, AlertCircle, Info, ArrowUpRight
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const STARTER_PROMPTS = [
  {
    title: "Compile Medical Triage DAG",
    prompt: "Design a low-latency medical phone triage agent DAG with voice state syncs and safety guardrails.",
    icon: <Brain className="w-3.5 h-3.5 text-[#2563EB]" />
  },
  {
    title: "WASM Edge Deployment",
    prompt: "Explain how Mashnu plans to deploy open-weight Llama-3 models to local WebAssembly (WASM) edge routers.",
    icon: <Cpu className="w-3.5 h-3.5 text-emerald-500" />
  },
  {
    title: "Database Isolation Strategy",
    prompt: "Draft a standardized multi-tenant database isolation schema with strict compliance and logic boundaries.",
    icon: <Shield className="w-3.5 h-3.5 text-indigo-500" />
  }
];

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello. I am the Mashnu Sovereign Personal Assistant. I am compiled to help you architect, simulate, and configure high-integrity multi-agent operational workflows. How can I assist you with your system engineering goals today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    setError(null);
    setLoading(true);
    
    // Add user message to history
    const updatedMessages = [...messages, { role: 'user', content: textToSend } as Message];
    setMessages(updatedMessages);
    setInput('');

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (!response.ok) {
        throw new Error("Failed to secure a response from the compiler proxy.");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "An unexpected latency spike or model connection failure occurred.");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hello. I am the Mashnu Sovereign Personal Assistant. I am compiled to help you architect, simulate, and configure high-integrity multi-agent operational workflows. How can I assist you with your system engineering goals today?"
      }
    ]);
    setError(null);
  };

  // Safe and beautiful regex-based Markdown text parser to correctly render bullet points, bold tags, and JetBrains Mono code blocks
  const renderFormattedContent = (text: string) => {
    const lines = text.split('\n');
    let insideCodeBlock = false;
    let codeBlockContent: string[] = [];

    return lines.map((line, index) => {
      // Toggle code blocks
      if (line.trim().startsWith('```')) {
        if (insideCodeBlock) {
          insideCodeBlock = false;
          const codeText = codeBlockContent.join('\n');
          codeBlockContent = [];
          return (
            <div key={index} className="my-3 border border-[#E2E8F0] rounded-xl overflow-hidden shadow-xs bg-[#F1F5F9]">
              <div className="bg-white/80 border-b border-[#E2E8F0] px-4 py-1.5 flex items-center justify-between text-[10px] text-[#64748B] font-mono">
                <span>COMPILED SPECIFICATION</span>
                <span>SYSTEMS CORE</span>
              </div>
              <pre className="p-4 overflow-x-auto text-[11px] font-mono text-[#0F172A] leading-relaxed">
                <code>{codeText}</code>
              </pre>
            </div>
          );
        } else {
          insideCodeBlock = true;
          return null;
        }
      }

      if (insideCodeBlock) {
        codeBlockContent.push(line);
        return null;
      }

      // Check for headers
      if (line.trim().startsWith('### ')) {
        return (
          <h4 key={index} className="text-sm font-semibold text-[#0F172A] mt-4 mb-2 tracking-tight">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.trim().startsWith('## ')) {
        return (
          <h3 key={index} className="text-base font-semibold text-[#0F172A] mt-5 mb-2.5 tracking-tight border-b border-[#E2E8F0] pb-1">
            {line.replace('## ', '')}
          </h3>
        );
      }

      // Check for list items
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const content = line.trim().substring(2);
        return (
          <div key={index} className="flex items-start gap-2 text-xs text-[#334155] pl-2 py-0.5 leading-relaxed">
            <span className="text-[#2563EB] font-bold mt-0.5">•</span>
            <span>{parseInlineStyles(content)}</span>
          </div>
        );
      }

      // Regular paragraph line
      if (line.trim() === '') {
        return <div key={index} className="h-2" />;
      }

      return (
        <p key={index} className="text-xs sm:text-sm text-[#334155] leading-relaxed mb-2">
          {parseInlineStyles(line)}
        </p>
      );
    }).filter(el => el !== null);
  };

  // Helper to parse inline bolding (**text**)
  const parseInlineStyles = (line: string) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-[#0F172A]">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#2563EB]/20 selection:text-[#2563EB] py-12">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header Block */}
        <section className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/15 text-[10px] font-mono uppercase tracking-widest text-[#2563EB] animate-fade-in mx-auto">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Mashnu Sovereign Assist Pilot</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#0F172A]">
            Sovereign Personal AI Assistant
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-xl mx-auto leading-relaxed">
            Interact with our dedicated system engineering co-pilot. Submit questions regarding multi-agent logic flow, latency margins, compilation targets, and career alignments.
          </p>
        </section>

        {/* Chat Console Area */}
        <div className="border border-[#E2E8F0] rounded-3xl bg-white shadow-sm flex flex-col h-[550px] overflow-hidden">
          
          {/* Console Header bar */}
          <div className="bg-white border-b border-[#E2E8F0] px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-[#2563EB]" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#0F172A] block">Sovereign runtime v3.1</span>
                <span className="text-[9px] font-semibold text-emerald-500 uppercase tracking-wider block -mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Core Active & Grounded
                </span>
              </div>
            </div>

            <button
              onClick={clearChat}
              title="Reset conversation"
              className="p-1.5 rounded-full hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] transition-colors border border-[#E2E8F0] cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="grow overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#F8FAFC]/50">
            {messages.map((msg, i) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={i}
                  className={`flex gap-3 max-w-[85%] ${
                    isAssistant ? 'mr-auto items-start' : 'ml-auto flex-row-reverse items-start'
                  }`}
                >
                  {/* Icon */}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 shadow-xs ${
                    isAssistant 
                      ? 'bg-white border-[#E2E8F0] text-[#2563EB]' 
                      : 'bg-[#0F172A] border-[#0F172A] text-white'
                  }`}>
                    {isAssistant ? (
                      <Terminal className="w-3.5 h-3.5" />
                    ) : (
                      <MessageSquare className="w-3.5 h-3.5" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`rounded-2xl px-4 py-3 border text-xs sm:text-sm shadow-xs ${
                    isAssistant
                      ? 'bg-white border-[#E2E8F0] text-[#0F172A]'
                      : 'bg-[#2563EB]/5 border-[#2563EB]/15 text-[#0F172A]'
                  }`}>
                    <div className="space-y-1">
                      {isAssistant ? (
                        renderFormattedContent(msg.content)
                      ) : (
                        <p className="leading-relaxed">{msg.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Loader */}
            {loading && (
              <div className="flex gap-3 max-w-[80%] mr-auto items-start">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#2563EB] shadow-xs">
                  <Terminal className="w-3.5 h-3.5 animate-spin-slow" />
                </div>
                <div className="bg-white border border-[#E2E8F0] rounded-2xl px-4 py-3 text-xs text-[#64748B] shadow-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="ml-1.5 font-mono text-[10px]">Compiler computing pathway...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs flex gap-2 items-start max-w-xl mx-auto">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold uppercase tracking-wider text-[9px] block">Pipeline Exception</span>
                  <p className="leading-relaxed">{error}</p>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick-starter chips */}
          {messages.length === 1 && (
            <div className="p-4 border-t border-[#E2E8F0] bg-white space-y-2">
              <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block px-1">Quick-start engineering queries</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {STARTER_PROMPTS.map((starter, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(starter.prompt)}
                    className="p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white hover:border-[#2563EB] text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-full group shadow-xs"
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <div className="w-6 h-6 rounded bg-white border border-[#E2E8F0] flex items-center justify-center group-hover:border-[#2563EB]/25">
                        {starter.icon}
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B] opacity-0 group-hover:opacity-100 group-hover:text-[#2563EB] transition-all" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-[#0F172A] block">{starter.title}</span>
                      <p className="text-[10px] text-[#64748B] line-clamp-2 mt-0.5 leading-relaxed">{starter.prompt}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Console Bar */}
          <div className="p-4 bg-white border-t border-[#E2E8F0]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Submit pipeline query, technology architectural draft request..."
                disabled={loading}
                className="grow bg-[#F1F5F9] border border-[#E2E8F0] rounded-full px-4 py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-xs transition-colors cursor-pointer ${
                  loading || !input.trim()
                    ? 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0] cursor-not-allowed'
                    : 'bg-[#0F172A] hover:bg-[#334155]'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </main>
    </div>
  );
}

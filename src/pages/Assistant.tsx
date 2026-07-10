import React, { useState, useRef, useEffect } from 'react';
import {
  Send, Sparkles, Shield, RefreshCw, Cpu, MessageSquare,
  Brain, AlertCircle, ArrowUpRight, Globe
} from 'lucide-react';
import ConnectWithUs from '../components/ConnectWithUs';
import BrandMark from '../components/BrandMark';
import { CONTACT_LINKS } from '../data/contactInfo';
import { PhoneIcon, MailIcon, WhatsAppIcon, LinkedInIcon, InstagramIcon, FacebookIcon, RedditIcon, XIcon, MediumIcon } from '../components/BrandIcons';
import { useSEO } from '../components/SEO';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  showContact?: boolean;
}

const STARTER_PROMPTS = [
  {
    title: "Automate a Medical Intake Flow",
    prompt: "Help me design a phone triage flow for a medical office, with safety checks built in.",
    icon: <Brain className="w-3.5 h-3.5 text-[#2563EB]" />
  },
  {
    title: "Speed Up Response Times",
    prompt: "Explain how Mashnu keeps voice and chat responses fast, even at the edge.",
    icon: <Cpu className="w-3.5 h-3.5 text-emerald-500" />
  },
  {
    title: "Keep Data Isolated",
    prompt: "Draft a plan for keeping each client's data fully isolated and compliant.",
    icon: <Shield className="w-3.5 h-3.5 text-indigo-500" />
  }
];

const CONTACT_KEYWORDS = [
  'contact you', 'contact us', 'contact mashnu', 'get in touch', 'how do i contact',
  'how can i contact', 'phone number', 'your number', 'call you', 'email address',
  'your email', 'reach you', 'reach out', 'social media', 'connect with you',
  'connect with mashnu', 'talk to someone', 'talk to a person', 'speak to someone',
  'speak to a person', 'real person', 'customer support', 'support team',
  'who founded', 'the founder', 'your founder', 'whatsapp', 'facebook',
  'linkedin', 'instagram', 'reddit', 'twitter', 'medium blog', 'your blog'
];

const isContactIntent = (text: string) => {
  const lower = text.toLowerCase();
  return CONTACT_KEYWORDS.some((kw) => lower.includes(kw));
};

const QUICK_ACTIONS = [
  { id: 'phone', label: 'Call', icon: PhoneIcon, href: CONTACT_LINKS.find(l => l.id === 'phone')!.href, external: false },
  { id: 'email', label: 'Email', icon: MailIcon, href: CONTACT_LINKS.find(l => l.id === 'email')!.href, external: false },
  { id: 'whatsapp', label: 'WhatsApp', icon: WhatsAppIcon, href: CONTACT_LINKS.find(l => l.id === 'whatsapp')!.href, external: true },
  { id: 'linkedin', label: 'LinkedIn', icon: LinkedInIcon, href: CONTACT_LINKS.find(l => l.id === 'linkedin')!.href, external: true },
  { id: 'instagram', label: 'Instagram', icon: InstagramIcon, href: CONTACT_LINKS.find(l => l.id === 'instagram')!.href, external: true },
  { id: 'facebook', label: 'Facebook', icon: FacebookIcon, href: CONTACT_LINKS.find(l => l.id === 'facebook')!.href, external: true },
  { id: 'reddit', label: 'Reddit', icon: RedditIcon, href: CONTACT_LINKS.find(l => l.id === 'reddit')!.href, external: true },
  { id: 'x', label: 'X', icon: XIcon, href: CONTACT_LINKS.find(l => l.id === 'x')!.href, external: true },
  { id: 'medium', label: 'Medium', icon: MediumIcon, href: CONTACT_LINKS.find(l => l.id === 'medium')!.href, external: true },
];

export default function Assistant() {
  useSEO({
    title: 'Chat with Pari, Your Personal AI Assistant',
    description: 'Ask Pari anything about automating your workflow, or get connected with the Mashnu AI team directly.',
    path: '/assistant',
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey, I'm Pari! Need help? Connect with us anytime, or ask me anything about automating your workflow.",
      showContact: true
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const sessionIdRef = useRef<string>(crypto.randomUUID());

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    setError(null);
    setLoading(true);

    // Add user message to history
    const updatedMessages = [...messages, { role: 'user', content: textToSend } as Message];
    setMessages(updatedMessages);
    setInput('');

    const wantsContact = isContactIntent(textToSend);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: updatedMessages, sessionId: sessionIdRef.current })
      });

      if (!response.ok) {
        throw new Error("Failed to get a response from the assistant.");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content, showContact: wantsContact }]);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Something went wrong reaching the assistant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    sessionIdRef.current = crypto.randomUUID();
    setMessages([
      {
        role: 'assistant',
        content: "Hey, I'm Pari! Need help? Connect with us anytime, or ask me anything about automating your workflow.",
        showContact: true
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
                <span>DETAILS</span>
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
    <div className="relative min-h-screen text-[#0F172A] font-sans selection:bg-[#2563EB]/20 selection:text-[#2563EB] py-12">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header Block */}
        <section className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/15 text-[10px] font-mono uppercase tracking-widest text-[#2563EB] animate-fade-in mx-auto">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Assistant Preview</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#0F172A]">
            Try the Personal AI Assistant
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-xl mx-auto leading-relaxed">
            Ask about automating a workflow, speeding up response times, or anything else you're curious about.
          </p>
        </section>

        {/* Chat Console Area */}
        <div className="border border-[#E2E8F0] rounded-3xl bg-white shadow-sm flex flex-col h-[550px] overflow-hidden">
          
          {/* Console Header bar */}
          <div className="bg-white border-b border-[#E2E8F0] px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10 flex items-center justify-center">
                <BrandMark className="w-5 h-5 animate-logo-wobble" />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center shadow-xs">
                  <Globe className="w-2 h-2 text-[#2563EB]" />
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold text-[#0F172A] block">Pari</span>
                <span className="text-[9px] font-semibold text-emerald-500 uppercase tracking-wider block -mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
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
                <div key={i} className="space-y-3">
                  <div
                    className={`flex gap-3 max-w-[85%] ${
                      isAssistant ? 'mr-auto items-start' : 'ml-auto flex-row-reverse items-start'
                    }`}
                  >
                    {/* Icon */}
                    <div className={`relative w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 shadow-xs ${
                      isAssistant
                        ? 'bg-white border-[#E2E8F0] text-[#2563EB]'
                        : 'bg-[#0F172A] border-[#0F172A] text-white'
                    }`}>
                      {isAssistant ? (
                        <>
                          <BrandMark className="w-4 h-4" />
                          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center shadow-xs">
                            <Globe className="w-2 h-2 text-[#2563EB]" />
                          </span>
                        </>
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

                  {/* Inline Connect With Us block, shown on contact-intent messages */}
                  {isAssistant && msg.showContact && (
                    <div className="mr-auto max-w-[95%] sm:max-w-[85%] pl-11">
                      <ConnectWithUs
                        variant="compact"
                        title="Connect With Us"
                        className="p-4 rounded-2xl border border-[#E2E8F0] bg-white shadow-xs"
                      />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Loader */}
            {loading && (
              <div className="flex gap-3 max-w-[80%] mr-auto items-start">
                <div className="relative w-8 h-8 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#2563EB] shadow-xs">
                  <BrandMark className="w-4 h-4 animate-logo-wobble" />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center shadow-xs">
                    <Globe className="w-2 h-2 text-[#2563EB]" />
                  </span>
                </div>
                <div className="bg-white border border-[#E2E8F0] rounded-2xl px-4 py-3 text-xs text-[#64748B] shadow-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="ml-1.5 font-mono text-[10px]">Thinking...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs flex gap-2 items-start max-w-xl mx-auto">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold uppercase tracking-wider text-[9px] block">Something went wrong</span>
                  <p className="leading-relaxed">{error}</p>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick-starter chips */}
          {messages.length === 1 && (
            <div className="p-4 border-t border-[#E2E8F0] bg-white space-y-2">
              <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block px-1">Quick-start questions</span>
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

          {/* Persistent Quick Actions: Connect With Us */}
          <div className="px-4 pt-3 pb-1 bg-white border-t border-[#E2E8F0]">
            <span className="text-[9px] font-semibold text-[#64748B] uppercase tracking-wider block px-0.5 mb-2">
              Connect with us
            </span>
            <div className="flex flex-wrap gap-2">
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.id}
                    href={action.href}
                    target={action.external ? '_blank' : undefined}
                    rel={action.external ? 'noopener noreferrer' : undefined}
                    aria-label={action.label}
                    className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white hover:border-[#2563EB] hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#2563EB] transition-colors" />
                    <span className="text-[10.5px] font-medium text-[#334155] group-hover:text-[#0F172A]">
                      {action.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

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
                placeholder="Ask a question or describe what you want to automate..."
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

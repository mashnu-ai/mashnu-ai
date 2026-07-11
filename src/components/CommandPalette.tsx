import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from './Router';
import { X, Globe, Send, Home, CheckCircle2 } from 'lucide-react';
import BrandMark from './BrandMark';
import ConnectWithUs from './ConnectWithUs';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  showContact?: boolean;
  quickReplies?: string[];
  showLeadForm?: boolean;
  leadSubmitted?: boolean;
  time: string;
}

// Persists across refreshes/reopens (unlike a fresh crypto.randomUUID() per
// mount) so the server-enforced 3-question limit can't be reset just by
// reloading the page — only clearing site data creates a "new" visitor.
const VISITOR_ID_KEY = 'mashnu_visitor_id';

function getVisitorId(): string {
  try {
    const existing = localStorage.getItem(VISITOR_ID_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, id);
    return id;
  } catch {
    // localStorage unavailable (private browsing, etc.) — fall back to an
    // in-memory id; the limit just won't survive a refresh in that case.
    return crypto.randomUUID();
  }
}

const QUICK_REPLY_DEMO = 'Get a demo';

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

const formatTime = () => new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: "Hey, I'm Pari! Ask me anything about Mashnu: what we automate, how it works, or how to get started.",
  showContact: true,
  quickReplies: ['What can Mashnu automate?', 'How fast is it?', QUICK_REPLY_DEMO],
  time: formatTime(),
};

function LeadCaptureForm({ submitted, onSubmit }: { submitted?: boolean; onSubmit: (data: { fullName: string; email: string; goal: string }) => Promise<void> }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (submitted) {
    return (
      <div className="p-3 rounded-2xl border border-emerald-200 bg-emerald-50 flex items-start gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <p className="text-[11px] text-emerald-800 leading-relaxed">
          Thanks! I've passed this to our team, they'll reach out within a business day.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({ fullName, email, goal });
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 rounded-2xl border border-[#E2E8F0] bg-white shadow-xs space-y-2">
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="e.g. Crispy"
        className="w-full text-xs px-3 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] outline-none focus:border-[#2563EB] transition-colors"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="e.g. crispy@gmail.com"
        required
        className="w-full text-xs px-3 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] outline-none focus:border-[#2563EB] transition-colors"
      />
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="What would you like to automate? (optional)"
        className="w-full text-xs px-3 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] outline-none focus:border-[#2563EB] transition-colors"
      />
      {error && <p className="text-[11px] text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={!email.trim() || submitting}
        className={`w-full py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
          !email.trim() || submitting
            ? 'bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed'
            : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white'
        }`}
      >
        {submitting ? 'Sending...' : 'Request a demo'}
      </button>
    </form>
  );
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>(getVisitorId());

  // Check on mount whether this visitor already used up their free
  // questions in a prior session, so a refresh/reopen shows the disabled
  // state immediately instead of only after they try to send a message.
  useEffect(() => {
    fetch(`/api/assistant/status?sessionId=${encodeURIComponent(sessionIdRef.current)}`)
      .then((res) => res.json())
      .then((data) => { if (data?.limitReached) setLimitReached(true); })
      .catch(() => {});
  }, []);

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

  // Focus input when the panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
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

  // Scroll to latest message — but not on first open, so the welcome
  // message stays visible at the top instead of jumping straight to the
  // bottom of the (mostly empty) thread.
  useEffect(() => {
    if (isOpen && messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, loading, isOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading || limitReached) return;

    const userMessage: ChatMessage = { role: 'user', content: textToSend, time: formatTime() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    const wantsContact = isContactIntent(textToSend);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
          sessionId: sessionIdRef.current,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(response.status === 429 ? (errData?.error || 'Slow down a little, please try again shortly.') : 'Failed to reach Pari.');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content, showContact: wantsContact || data.limitReached, time: formatTime() }]);
      if (data.limitReached) setLimitReached(true);
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: err?.message || "Sorry, I couldn't get that. Please try again, or reach us directly below.",
        showContact: true,
        time: formatTime(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    if (reply === QUICK_REPLY_DEMO) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Happy to set that up, leave your details and I'll pass them straight to the team.",
        showLeadForm: true,
        time: formatTime(),
      }]);
      return;
    }
    handleSend(reply);
  };

  const handleLeadSubmit = async (messageIndex: number, data: { fullName: string; email: string; goal: string }) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: data.fullName,
        email: data.email,
        useCase: data.goal || 'Requested a demo via the chat widget.',
        source: 'chat_widget',
      }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data?.error || 'Failed to submit.');
    }

    setMessages(prev => prev.map((m, i) => i === messageIndex ? { ...m, leadSubmitted: true } : m));
  };

  return (
    <>
      {/* FLOATING ACTION BUTTON (FAB) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0F172A] hover:bg-[#334155] text-white border border-[#CBD5E1]/30 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          title="Chat with Pari"
        >
          {/* Inner metallic effect rings */}
          <span className="absolute inset-0.5 rounded-full border border-white/5 pointer-events-none" />
          <span className="absolute inset-0 rounded-full bg-radial from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <BrandMark className="w-6 h-6 animate-logo-wobble" />

          {/* Web badge */}
          <span className="absolute -bottom-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center shadow-xs">
            <Globe className="w-2.5 h-2.5 text-[#2563EB]" />
          </span>

          {/* Pulse ring when idle */}
          <span className="absolute -inset-1 rounded-full border border-[#0F172A]/10 animate-ping pointer-events-none opacity-40 group-hover:opacity-0 transition-opacity" />

          {/* Prompt Tooltip */}
          <div className="absolute right-16 px-3 py-1.5 rounded-lg bg-[#0F172A] text-white text-[10px] font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none border border-[#CBD5E1]/20 flex items-center gap-1.5 shadow-md whitespace-nowrap">
            <span className="text-white">Chat with Pari</span>
          </div>
        </button>
      </div>

      {/* OVERLAY & PANEL — compact chat widget anchored near the launcher */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50">
            {/* Invisible click-catcher to close on outside click — page stays fully visible */}
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            {/* Panel Card */}
            <motion.div
              ref={paletteRef}
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[70vh] max-h-[560px] font-sans text-[#0F172A]"
            >
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-[#2563EB] to-[#4F46E5] px-4 py-3.5 flex items-center gap-3 text-white shrink-0">
                <div className="w-10 h-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
                  <BrandMark className="w-6 h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold leading-tight">Pari</h3>
                  <p className="text-[11px] text-white/80 truncate">Ask me anything about Mashnu</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages Scroll Area */}
              <div className="grow overflow-y-auto px-3 py-3 space-y-3 bg-[#F8FAFC]">
                {/* Date divider */}
                <div className="flex justify-center pb-1">
                  <span className="text-[10px] font-medium text-[#94A3B8] bg-white border border-[#E2E8F0] px-2.5 py-1 rounded-full">Today</span>
                </div>

                {messages.map((msg, i) => {
                  const isAssistant = msg.role === 'assistant';
                  return (
                    <div key={i} className="space-y-1.5">
                      <div className={`flex flex-col max-w-[82%] ${isAssistant ? 'items-start mr-auto' : 'items-end ml-auto'}`}>
                        <div
                          className={`px-3.5 py-2.5 text-xs leading-relaxed ${
                            isAssistant
                              ? 'bg-[#F1F5F9] text-[#0F172A] rounded-2xl rounded-tl-sm'
                              : 'bg-[#2563EB] text-white rounded-2xl rounded-tr-sm'
                          }`}
                        >
                          {msg.content}
                        </div>
                        <span className="text-[9px] text-[#94A3B8] px-1 mt-0.5">{msg.time}</span>
                      </div>

                      {isAssistant && msg.quickReplies && messages.length === 1 && (
                        <div className="flex flex-wrap gap-1.5 mr-auto max-w-[95%]">
                          {msg.quickReplies.map((reply) => (
                            <button
                              key={reply}
                              onClick={() => handleQuickReply(reply)}
                              disabled={loading}
                              className="px-3 py-1.5 rounded-full border border-[#2563EB]/25 bg-white text-[#2563EB] text-[10.5px] font-medium hover:bg-[#2563EB]/5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      )}

                      {isAssistant && msg.showLeadForm && (
                        <div className="mr-auto max-w-[95%] w-[95%]">
                          <LeadCaptureForm
                            submitted={msg.leadSubmitted}
                            onSubmit={(data) => handleLeadSubmit(i, data)}
                          />
                        </div>
                      )}

                      {isAssistant && msg.showContact && (
                        <div className="mr-auto max-w-[95%]">
                          <ConnectWithUs
                            variant="compact"
                            title="Connect With Us"
                            className="p-3 rounded-2xl border border-[#E2E8F0] bg-white shadow-xs"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}

                {loading && (
                  <div className="flex flex-col items-start max-w-[82%] mr-auto">
                    <div className="bg-[#F1F5F9] rounded-2xl rounded-tl-sm px-3.5 py-2.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Footer Input Bar */}
              <div className="shrink-0 border-t border-[#E2E8F0] bg-white">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                  className="flex items-center gap-2 px-3 py-2.5"
                >
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors shrink-0"
                  >
                    <Home className="w-4 h-4" />
                  </Link>
                  <div className="flex-1 flex items-center gap-2 bg-[#F1F5F9] rounded-full pl-3.5 pr-1.5 py-1.5">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={limitReached ? 'Question limit reached, reach out below' : 'Type your message'}
                      disabled={loading || limitReached}
                      className="flex-1 bg-transparent text-xs outline-none text-[#0F172A] placeholder-[#94A3B8] min-w-0 disabled:cursor-not-allowed"
                    />
                    <button
                      type="submit"
                      disabled={loading || limitReached || !input.trim()}
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                        loading || limitReached || !input.trim()
                          ? 'text-[#CBD5E1]'
                          : 'text-[#2563EB] hover:bg-[#2563EB]/10'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
                <div className="text-center pb-2">
                  <span className="text-[9px] text-[#94A3B8]">
                    Powered by <span className="font-semibold text-[#0F172A]">Mashnu AI</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

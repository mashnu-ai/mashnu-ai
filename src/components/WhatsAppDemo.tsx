import React, { useState, useEffect } from 'react';
import { Send, CheckCheck, Sparkles, User, MessageSquare } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}

interface Scenario {
  title: string;
  subtitle: string;
  userPrompt: string;
  agentResponse: string[];
}

export default function WhatsAppDemo() {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'agent',
      text: 'Hello! I am Mashnu AI’s Omni-Channel Employee. Select a use-case below to test how I handle active systems integration in real-time.',
      timestamp: '09:00 AM'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const scenarios: Scenario[] = [
    {
      title: 'Commerce Inventory Query',
      subtitle: 'Shopify / HubSpot CRM',
      userPrompt: 'Hey, is the Classic Cotton Tee in Off-White XL still in stock?',
      agentResponse: [
        'Connecting to Shopify Product Catalog... Done.',
        'Yes! We have exactly 3 units left of the Classic Cotton Tee in Off-White (XL) at our East Coast hub.',
        ' HubSpot Deal updated: Lead intent score boosted to 94%. Would you like me to send you a direct 1-click Stripe checkout link?'
      ]
    },
    {
      title: 'Healthcare Appointment',
      subtitle: 'AthenaHealth EHR Sync',
      userPrompt: "Hi, I need to reschedule my pediatric appointment for tomorrow afternoon.",
      agentResponse: [
        'Checking clinical schedule in AthenaHealth EHR database...',
        'I found your slot tomorrow at 2:00 PM. I can move you to Thursday at 3:15 PM or Friday at 11:00 AM. Both times have pediatrician Dr. Sarah Jenkins available.',
        'Let me know which slot works and I will sync your profile instantly!'
      ]
    },
    {
      title: 'Freight Carrier Tracking',
      subtitle: 'PostgreSQL Dispatches / GPS',
      userPrompt: 'Can I track container #C930-B1 and get its estimated customs release date?',
      agentResponse: [
        'Querying global dispatch dispatch ledger...',
        'Container #C930-B1 is currently docked at the Port of Newark. Real-time GPS coordinates are 40.6892° N, 74.1745° W.',
        'Customs status: Form 3461 cleared. Estimated release is tomorrow at 08:30 AM EST. Automatically sent automated dispatch webhook to freight dispatcher.'
      ]
    }
  ];

  const handleTriggerScenario = (idx: number) => {
    if (isTyping) return;
    setActiveScenarioIdx(idx);
    const scenario = scenarios[idx];
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Add user prompt
    setMessages([
      {
        sender: 'user',
        text: scenario.userPrompt,
        timestamp: now
      }
    ]);

    // 2. Trigger sequential typing stream
    setIsTyping(true);

    let step = 0;
    const addNextResponse = () => {
      if (step < scenario.agentResponse.length) {
        setIsTyping(true);
        setTimeout(() => {
          const resTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          setMessages((prev) => [
            ...prev,
            {
              sender: 'agent',
              text: scenario.agentResponse[step],
              timestamp: resTime
            }
          ]);
          step++;
          addNextResponse();
        }, 1500); // 1.5 seconds delay between typing segments to simulate natural integration queries
      } else {
        setIsTyping(false);
      }
    };

    setTimeout(() => {
      addNextResponse();
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
      
      {/* Left Info Column */}
      <div className="lg:col-span-5 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-accent/10 border border-primary-accent/20 text-[10px] font-mono uppercase tracking-wider text-primary-accent">
          <Sparkles className="w-3 h-3" />
          <span>Interactive Live Sandbox</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-slate-900">
          Try Our WhatsApp <br />AI Employee Demo
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed font-sans">
          Unlike static chatbots, Mashnu’s AI employees query inventory databases, update HIPAA-secure healthcare registers, and write live ledger files. Select an operational use-case to simulate the stateful LangGraph workflow.
        </p>

        {/* Use-case buttons */}
        <div className="space-y-2 pt-2">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Choose a scenario to execute</span>
          <div className="flex flex-col gap-2">
            {scenarios.map((sc, i) => (
              <button
                key={i}
                onClick={() => handleTriggerScenario(i)}
                disabled={isTyping}
                className={`p-3 rounded-xl border text-left transition-all ${
                  activeScenarioIdx === i
                    ? 'bg-primary-accent/10 border-primary-accent text-slate-900 font-semibold'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                } disabled:opacity-50`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wide font-sans">{sc.title}</span>
                  <span className="text-[9px] font-mono text-primary-accent uppercase">{sc.subtitle}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          {/* CRITICAL CODE COMMENT requested by user */}
          <p className="text-[9.5px] font-mono text-slate-500 leading-relaxed">
            {/* CODE INTEGRATION NOTICE: To connect this WhatsApp interface to live Twilio WhatsApp sandbox and custom FastAPI agents, configure the server webhook routes at `/api/v1/whatsapp-webhook` with valid Shopify or EHR credentials. */}
            <span className="text-primary-accent">Integration Hook:</span> In production, this component communicates directly with our low-latency FastAPI router at <code className="bg-white px-1 py-0.5 rounded text-amber-500">/api/whatsapp-webhook</code>.
          </p>
        </div>
      </div>

      {/* Right Phone Mockup Column */}
      <div className="lg:col-span-7 flex justify-center">
        <div className="w-full max-w-[370px] aspect-[9/18] rounded-[40px] border-8 border-slate-800 bg-slate-950 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          
          {/* Phone Top Notch / Header */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 pt-6 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary-accent/10 border border-primary-accent/30 flex items-center justify-center text-primary-accent relative">
                <MessageSquare className="w-4 h-4" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-900" />
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-slate-900">Mashnu Concierge</h4>
                <p className="text-[8px] font-mono text-emerald-400">Active AI Employee</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="px-1.5 py-0.5 rounded text-[7px] font-mono bg-slate-950 text-slate-400 border border-slate-800">100% Secure</span>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="grow p-4 overflow-y-auto space-y-3 flex flex-col justify-end min-h-[300px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl p-3 text-[10.5px] leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'self-end bg-primary-accent text-white rounded-br-none'
                    : 'self-start bg-slate-100 text-slate-800 border border-slate-200 rounded-bl-none'
                }`}
              >
                <p className="font-sans whitespace-pre-line">{msg.text}</p>
                <div className={`mt-1 flex justify-end gap-1 text-[7.5px] ${msg.sender === 'user' ? 'text-white/60' : 'text-slate-500'}`}>
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-white/80" />}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="self-start bg-slate-100 text-slate-800 border border-slate-200 rounded-2xl rounded-bl-none p-3 max-w-[85%] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>

          {/* Fake Input Panel */}
          <div className="p-3 bg-slate-50 border-t border-slate-800 flex items-center gap-2">
            <div className="grow bg-white border border-slate-200 rounded-full py-1.5 px-3.5 text-[10px] text-slate-500 font-sans flex justify-between">
              <span>Selected use-case triggers payload...</span>
            </div>
            <button disabled className="p-2 rounded-full bg-primary-accent text-white opacity-40">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

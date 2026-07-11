import React, { useState } from 'react';
import { Link } from '../components/Router';
import { useSEO } from '../components/SEO';
import {
  Compass, ArrowRight, CheckCircle2, ChevronRight, Landmark, 
  Code, Shield, Activity, Cloud, ShoppingBag, Cpu, BookOpen, 
  Binary, Server, Workflow, Info, CircleDot, Eye, Globe, Sparkles
} from 'lucide-react';

interface StageItem {
  id: string;
  number: string;
  title: string;
  status: 'active' | 'transition' | 'rd' | 'scheduled' | 'horizon';
  statusLabel: string;
  whatItMeans: string;
  whereWeAre: string;
  description: string;
  unlockedCapabilities: string[];
  investorHireNote: string;
  icon: React.ReactNode;
  imageUrl: string;
}

const VISION_STAGES: StageItem[] = [
  {
    id: 'services',
    number: '01',
    title: "AI Services",
    status: 'active',
    statusLabel: "Current Core (100% Active)",
    whatItMeans: "Designing and delivering custom-built, enterprise-grade AI employee agents and real-time communication systems.",
    whereWeAre: "We are actively deploying high-performance voice and messaging solutions directly for enterprise partners, compiling their real-world edge cases into our shared code repositories.",
    description: "By working directly with clinic chains, logistics coordinators, and DTC companies, we gain unmediated exposure to real-world integration friction. This hands-on phase generates the proprietary code patterns that we continuously compile into our core micro-agent framework, ensuring we build software grounded in physical business bottlenecks rather than speculative academic exercises.",
    unlockedCapabilities: [
      "Fast, natural-feeling voice agent deployments",
      "Direct read-write connections to records and CRM systems",
      "Reliable handling of real conversations, including background noise"
    ],
    investorHireNote: "Venture Partners: This stage generates direct cash-flow to fund core platform development. Hires: You will gain deep experience writing low-level network bridges that handle live traffic under production conditions.",
    icon: <Workflow className="w-5 h-5 text-[#2563EB]" />,
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 'saas',
    number: '02',
    title: "AI SaaS",
    status: 'transition',
    statusLabel: "Active Transition",
    whatItMeans: "Turning custom agent implementations into modular, self-serve dashboard applications available via standard subscriptions.",
    whereWeAre: "Our core multi-tenant administration dashboards are in private beta testing with active pilot users, allowing managers to monitor runtimes and tweak prompts.",
    description: "To scale beyond custom engineering agreements, we are decoupling our core integrations into repeatable SaaS modules. Instead of manual code deployments, corporate clients will be able to provision, authorize, and integrate pre-built communication agents into standard channels (e.g., Twilio, Shopify, HubSpot) using an automated web-based subscription model.",
    unlockedCapabilities: [
      "No-code dashboard for account configuration and agent provisioning",
      "Complete data isolation between every customer account",
      "Simple, predictable billing tied directly to usage"
    ],
    investorHireNote: "Venture Partners: This unlocks exponential recurring revenue margins and establishes a high-growth SaaS financial model. Hires: You will build secure multi-tenant architectures and design clean state routers.",
    icon: <Cloud className="w-5 h-5 text-[#2563EB]" />,
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 'platform',
    number: '03',
    title: "AI Platform",
    status: 'rd',
    statusLabel: "In Active R&D",
    whatItMeans: "Providing a self-serve control panel where internal teams can design, test, configure, and monitor their own automated workflows.",
    whereWeAre: "The core engine is fully operational in our development environment, and we are currently finalizing how teams will connect their own tools to it.",
    description: "The platform layer shifts day-to-day control to the client. Teams will be able to connect their own data sources, apply their own safety rules, and adjust how workflows behave without needing engineering support for every change.",
    unlockedCapabilities: [
      "Visual workflow builder with reliable, predictable behavior",
      "Clear visibility into performance and response times",
      "Granular access controls and department-level spending limits"
    ],
    investorHireNote: "Venture Partners: Establishes Mashnu as the core operating system for enterprise agent operations, creating a strong platform moat. Hires: You will work on the systems that keep complex automated workflows fast and reliable.",
    icon: <Server className="w-5 h-5 text-[#2563EB]" />,
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 'cloud',
    number: '04',
    title: "AI Cloud",
    status: 'scheduled',
    statusLabel: "Scheduled Roadmap (Late 2026)",
    whatItMeans: "Deploying secure, fully isolated private hosting environments with regional compliance guarantees for each client.",
    whereWeAre: "The plan is mapped, waiting for aggregate platform traffic to reach cost-effective hosting thresholds.",
    description: "Shared, third-party hosting presents latency, routing, and privacy risks for enterprise buyers. Our cloud phase will offer fully isolated, private hosting dedicated to each client, guaranteeing complete data residency compliance and predictable, flat-rate billing.",
    unlockedCapabilities: [
      "Zero-data-leakage private hosting environments",
      "Automated load-balancing with reliable fallback coverage",
      "Regional hosting that satisfies HIPAA and GDPR residency requirements"
    ],
    investorHireNote: "Venture Partners: Alleviates dependence on volatile third-party providers, improving gross margins. Hires: You will architect resilient cloud deployments and optimize hosting speed and cost.",
    icon: <Activity className="w-5 h-5 text-[#2563EB]" />,
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 'marketplace',
    number: '05',
    title: "AI Agent Marketplace",
    status: 'scheduled',
    statusLabel: "Scheduled Roadmap (2027)",
    whatItMeans: "Establishing a curated, audited marketplace where developers can publish and license specialized, industry-specific agents.",
    whereWeAre: "Projected for mid-2027 following the stabilization of our primary developer platform.",
    description: "No single company can build specialized agents for every niche regulatory or logistics domain. The Marketplace will enable third-party developers to package, publish, and monetize custom agents. Mashnu will enforce strict security audits to ensure all marketplace listings are free of data-leak hazards.",
    unlockedCapabilities: [
      "Standard packaging format for shareable automated agents",
      "Secure sandboxed execution with strict access limits",
      "Automatic revenue sharing for published listings"
    ],
    investorHireNote: "Venture Partners: Introduces high-margin network effects as developer ecosystems consolidate around our runtime core. Hires: You will build secure sandboxes and static analysis linting suites.",
    icon: <ShoppingBag className="w-5 h-5 text-[#2563EB]" />,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 'infrastructure',
    number: '06',
    title: "AI Infrastructure",
    status: 'scheduled',
    statusLabel: "Scheduled Roadmap (2027)",
    whatItMeans: "Engineering our own edge infrastructure that bypasses slow, shared cloud queues to deliver near-instant responses.",
    whereWeAre: "We are currently running early feasibility tests on response speed and reliability at scale.",
    description: "True real-time action requires bypassing centralized, shared queues. We aim to run our own optimized infrastructure closer to the end user, drastically reducing the distance and overhead between a request and a response.",
    unlockedCapabilities: [
      "Near-instant response generation at the edge",
      "Distributed caching to keep frequent requests fast",
      "Reduced dependence on slow, high-overhead third-party middleware"
    ],
    investorHireNote: "Venture Partners: Protects core infrastructure against vendor lock-in and pricing spikes. Hires: You will build low-level, high-performance infrastructure for real-time systems.",
    icon: <Cpu className="w-5 h-5 text-[#2563EB]" />,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 'research',
    number: '07',
    title: "AI Research",
    status: 'scheduled',
    statusLabel: "Scheduled Roadmap (2028)",
    whatItMeans: "Developing and publishing novel techniques for efficient, specialized AI models and smarter search over complex data.",
    whereWeAre: "We systematically track active research in the field, with formal academic collaboration budgets earmarked for 2028.",
    description: "Instead of blindly applying generic commercial models, our research track will seek to discover efficient, specialized model designs, helping lightweight models perform complex, multi-tiered business reasoning at a fraction of current hardware costs.",
    unlockedCapabilities: [
      "Specialized model designs tuned for strict compliance workflows",
      "Advanced evaluation methods for multi-agent coordination quality",
      "Novel techniques for retrieving the right information faster"
    ],
    investorHireNote: "Venture Partners: Builds long-term deep-tech IP that cannot be replicated by basic API wrappers. Hires: You will conduct model training experiments, publish papers, and design custom adapters.",
    icon: <BookOpen className="w-5 h-5 text-[#2563EB]" />,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 'quantum',
    number: '08',
    title: "Advanced Quantum AI",
    status: 'horizon',
    statusLabel: "Long-term Horizon (5-10 Year Plan)",
    whatItMeans: "Collaborating with hardware researchers to explore next-generation computing for extreme-scale reasoning tasks.",
    whereWeAre: "This remains a conceptual, long-term research mandate looking beyond the limits of today's computing hardware.",
    description: "As today's computing hardware approaches its physical limits, high-performance systems will demand alternative approaches. Our long-term mission includes partnering with hardware providers to explore what comes next, targeting near-instantaneous decision-making at massive scale.",
    unlockedCapabilities: [
      "Advanced algorithms for large-scale pattern recognition",
      "Parallel processing for thousands of concurrent agent networks",
      "Dramatically lower energy costs for enterprise-scale calculations"
    ],
    investorHireNote: "Venture Partners: Positions Mashnu as a forward-looking participant in the post-silicon computational shift. Hires: You will bridge the gap between quantum mechanics and neural architectures.",
    icon: <Binary className="w-5 h-5 text-[#2563EB]" />,
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 'spatial',
    number: '09',
    title: "Spatial AI & AR/VR",
    status: 'horizon',
    statusLabel: "Spatial Computing Horizon (2028+)",
    whatItMeans: "Connecting real-time spatial awareness directly to fast, coordinated agent planning.",
    whereWeAre: "Developing software interfaces to bring AR/VR headset data directly into our agent systems.",
    description: "Assistants shouldn't be confined to 2D displays. By establishing real-time spatial awareness, workers equipped with AR/VR headsets can interact with agents that visually coordinate surgical steps, construction logs, or remote operations.",
    unlockedCapabilities: [
      "Seamless streaming of movement and gaze data into active agent memory",
      "Real-time spatial overlay with minimal delay",
      "Interactive 3D model generation directly from speech"
    ],
    investorHireNote: "Venture Partners: Opens direct pathways into industrial manufacturing, remote assistance, and spatial planning. Hires: You will build high-fidelity spatial interfaces and real-time processing pipelines.",
    icon: <Eye className="w-5 h-5 text-[#2563EB]" />,
    imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 'bci',
    number: '10',
    title: "Neural-Interface AI (BCI)",
    status: 'horizon',
    statusLabel: "Neural Synthesis Horizon",
    whatItMeans: "Direct cognitive input, bridging brain-signal interfaces with fast, reliable agent responses.",
    whereWeAre: "Mapping the technical requirements and evaluating safe boundaries for this kind of interaction.",
    description: "The ultimate bottleneck in software use is physical input and speech. We envision a future where a personal assistant can respond directly to focused mental intent: executing tasks, initiating emergency help, or summarizing information, entirely hands-free.",
    unlockedCapabilities: [
      "Reliable classification of intent for task routing",
      "Fast, low-latency triggers mapped directly to real actions",
      "Strong privacy protections built in from the start"
    ],
    investorHireNote: "Venture Partners: Establishes a radical tech moat in physical-neural interface safety software. Hires: You will collaborate with physical signal analysts and write custom digital signal processing algorithms.",
    icon: <Sparkles className="w-5 h-5 text-[#2563EB]" />,
    imageUrl: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 'orbit',
    number: '11',
    title: "Satellite Space Mesh",
    status: 'horizon',
    statusLabel: "Interplanetary Horizon",
    whatItMeans: "Extending our personal assistant and logistics agents to work reliably beyond standard ground networks.",
    whereWeAre: "Documenting the technical requirements for satellite-based communication and reliable agent handoffs.",
    description: "Personal assistants and logistics agents must be resilient to network outages. By routing agent access over decentralized satellite networks, Mashnu can guarantee constant, unblockable access across global coordinates, marine lanes, and high-altitude flights.",
    unlockedCapabilities: [
      "Resilient access across a decentralized satellite network",
      "Dynamic routing optimization for reliable handoffs",
      "Hardened, resilient software running at the edge"
    ],
    investorHireNote: "Venture Partners: Unlocks unblockable private access for global corporations and organizations operating in remote areas. Hires: You will build high-reliability communication protocols and resilient state sync systems.",
    icon: <Globe className="w-5 h-5 text-[#2563EB]" />,
    imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80"
  }
];

export default function Vision() {
  const [activeStageId, setActiveStageId] = useState<string>('services');
  const activeStage = VISION_STAGES.find(s => s.id === activeStageId) || VISION_STAGES[0];

  useSEO({
    title: 'Our Roadmap and Vision',
    description: 'How Mashnu AI is engineering agent infrastructure that gets more capable over time: from production-grade automation today to research on efficient, specialized models.',
    path: '/vision',
  });

  return (
    <div className="relative min-h-screen text-[#0F172A] font-sans selection:bg-[#2563EB]/20 selection:text-[#2563EB] py-16 animate-fade-in">
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Title Header */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-semibold text-[#2563EB] uppercase tracking-wider block">
            Where We're Headed
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.02em] text-[#0F172A] leading-tight">
            What we're building toward
          </h1>
          <p className="text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            We're not interested in throwaway consulting work. Every client engagement is a step in a deliberate, grounded roadmap to turn custom automation into something reusable and lasting.
          </p>
        </section>

        {/* MANIFESTO / STATEMENT OF INTENT */}
        <section className="border border-[#E2E8F0] rounded-[28px] bg-white p-6 sm:p-10 space-y-6 max-w-4xl mx-auto shadow-sm">
          
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4">
            <div className="w-10 h-10 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10 flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-[#0F172A]">Why we build it this way</h2>
              <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block mt-0.5">Our Approach</span>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#334155] leading-relaxed">
            <p>
              A lot of AI agencies charge premium rates to stitch a few third-party APIs together and call it a product. What they deliver is often slow, fragile, and falls apart the moment real usage hits it.
            </p>
            <p>
              <strong>We do things differently.</strong> We think like engineers building infrastructure, not consultants shipping a one-off. We don't build throwaway scripts for a single client, we build solid, reusable building blocks.
            </p>
            <p>
              Every integration, search feature, and voice handler we build for a client feeds back into our core platform. That's what lets us keep improving without starting over every time, and it's why the platform gets better with every client we take on.
            </p>
          </div>
        </section>

        {/* ROADMAP OVERVIEW PROGRESS TRACKER (HORIZONTAL PATH) */}
        <section className="space-y-6 max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A]">The roadmap, stage by stage</h2>
            <p className="text-sm text-[#64748B]">
              From what's live today to where we're headed years out. Click any stage to see the detail.
            </p>
          </div>

          {/* Horizontal Track with responsive layout wrapping */}
          <div className="p-5 border border-[#E2E8F0] rounded-[24px] bg-[#F1F5F9]">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-3">
              {VISION_STAGES.map((s) => {
                const isActive = s.id === activeStageId;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveStageId(s.id)}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 relative flex flex-col justify-between cursor-pointer ${
                      isActive
                        ? 'border-[#2563EB] bg-white scale-[1.03] z-10 shadow-sm'
                        : 'border-[#E2E8F0] bg-white/60 hover:border-[#CBD5E1]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-[#64748B]">{s.number}</span>
                      {s.status === 'active' && <CircleDot className="w-2.5 h-2.5 text-emerald-500 animate-pulse" />}
                      {s.status === 'transition' && <CircleDot className="w-2.5 h-2.5 text-[#2563EB]" />}
                    </div>
                    <div className="mt-2">
                      <h4 className={`text-[10px] font-semibold uppercase tracking-wider line-clamp-1 ${
                        isActive ? 'text-[#2563EB]' : 'text-[#0F172A]'
                      }`}>
                        {s.title}
                      </h4>
                      <span className="text-[8px] font-medium uppercase block mt-0.5 text-[#64748B]">
                        {s.status === 'active' ? 'Active Core' :
                         s.status === 'transition' ? 'Transition' :
                         s.status === 'rd' ? 'Active R&D' : 'Roadmap'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* INTERACTIVE TIMELINE / DEEP DIVE FOCUS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto items-stretch">
          
          {/* Vertical Index Timeline (Col-span 5) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">Select Milestone Stage</span>
            <div className="relative pl-4 border-l border-[#E2E8F0] space-y-4 py-1">
              {VISION_STAGES.map((s) => {
                const isSelected = s.id === activeStageId;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveStageId(s.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 relative flex flex-col gap-2 cursor-pointer ${
                      isSelected
                        ? 'border-[#2563EB] bg-white text-[#0F172A] shadow-sm'
                        : 'border-[#E2E8F0] bg-[#F1F5F9]/40 text-[#64748B] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    {/* Active side indicator */}
                    {isSelected && (
                      <span className="absolute -left-[21px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#2563EB] border border-white z-20 shadow-sm" />
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {s.icon}
                        <span className="text-[10px] font-semibold text-[#64748B]">{s.number}</span>
                        <h3 className="text-xs font-semibold text-[#0F172A]">{s.title}</h3>
                      </div>
                      <span className={`px-2 py-0.5 text-[8px] font-semibold rounded-full border uppercase ${
                        s.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        s.status === 'transition' ? 'bg-[#2563EB]/5 text-[#2563EB] border-[#2563EB]/10' :
                        s.status === 'rd' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                        'bg-white border-[#E2E8F0] text-[#64748B]'
                      }`}>
                        {s.statusLabel.split(' (')[0]}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#64748B] leading-relaxed line-clamp-2">
                      {s.whatItMeans}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Detail Display Panel (Col-span 7) */}
          <div className="lg:col-span-7 border border-[#E2E8F0] rounded-[28px] bg-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-sm">
            
            <div className="space-y-6 relative z-10">
              
              {/* Header Image */}
              <div className="relative h-48 sm:h-64 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 overflow-hidden bg-[#F1F5F9] border-b border-[#E2E8F0]">
                <img 
                  src={activeStage.imageUrl} 
                  alt={activeStage.title} 
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Header Title bar */}
              <div className="space-y-2 border-b border-[#E2E8F0] pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center shadow-xs">
                    {activeStage.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-semibold text-[#2563EB] uppercase tracking-wider">Evolution Node {activeStage.number}</span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-semibold uppercase tracking-wider ${
                        activeStage.status === 'active' ? 'bg-emerald-50 text-emerald-600' :
                        activeStage.status === 'transition' ? 'bg-[#2563EB]/5 text-[#2563EB]' :
                        activeStage.status === 'rd' ? 'bg-indigo-50 text-indigo-600' :
                        'bg-[#F1F5F9] text-[#64748B]'
                      }`}>
                        {activeStage.statusLabel}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-[#0F172A]">{activeStage.title}</h3>
                  </div>
                </div>
              </div>

              {/* Concrete Definition */}
              <div className="space-y-1">
                <span className="text-[9px] font-semibold text-[#64748B] uppercase tracking-wider block">Concrete Definition</span>
                <p className="text-xs sm:text-sm text-[#0F172A] leading-relaxed font-semibold">
                  {activeStage.whatItMeans}
                </p>
              </div>

              {/* Current Operational State */}
              <div className="space-y-1">
                <span className="text-[9px] font-semibold text-[#64748B] uppercase tracking-wider block">Current Operational State</span>
                <p className="text-xs sm:text-sm text-[#334155] leading-relaxed italic">
                  {activeStage.whereWeAre}
                </p>
              </div>

              {/* Milestone Narrative & Rationale */}
              <div className="space-y-1">
                <span className="text-[9px] font-semibold text-[#64748B] uppercase tracking-wider block">Milestone Narrative & Rationale</span>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {activeStage.description}
                </p>
              </div>

              {/* Unlocked Capabilities */}
              <div className="space-y-2.5 pt-4 border-t border-[#E2E8F0]">
                <span className="text-[9px] font-semibold text-[#64748B] uppercase tracking-wider block">Projected Engineering Unlocks</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px] text-[#334155]">
                  {activeStage.unlockedCapabilities.map((cap, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recruitment / Investor Note */}
              <div className="p-4 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0] text-xs flex gap-3 items-start">
                <Info className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[8px] font-semibold text-[#0F172A] uppercase tracking-wider block">Investor & Talent Disclosure</span>
                  <p className="text-[#64748B] text-[11px] leading-relaxed">
                    {activeStage.investorHireNote}
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-[10px] text-[#64748B]">
              <span>Reviewed & Verified</span>
              <span className="text-[#2563EB] font-semibold uppercase">Mashnu Platform Track</span>
            </div>

          </div>

        </section>

        {/* LOWER SECTION: GROUNDED ROADMAP NOTES FOR INVESTORS & HIRES */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* For Investors block */}
          <div className="border border-[#E2E8F0] rounded-[24px] bg-white p-6 sm:p-8 space-y-4 flex flex-col justify-between hover:border-[#CBD5E1] transition-colors relative overflow-hidden shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-[#2563EB]" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0F172A]">Capital Allocations & Partners</h3>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                By charging realistic fees for custom enterprise deployments from day one, we completely avoid the venture-subsidy trap. Our custom services directly fund core micro-agent software, ensuring stable growth with a highly defensive cash-flow model.
              </p>
            </div>
            <Link 
              to="/contact" 
              className="text-xs font-semibold uppercase text-[#2563EB] hover:underline flex items-center gap-1 mt-4 border-t border-[#E2E8F0] pt-3"
            >
              Request Pitch Materials
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* For Hires block */}
          <div className="border border-[#E2E8F0] rounded-[24px] bg-white p-6 sm:p-8 space-y-4 flex flex-col justify-between hover:border-[#CBD5E1] transition-colors relative overflow-hidden shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-[#2563EB]" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0F172A]">Engineering Principles</h3>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                We hire engineers who want to build real systems rather than compile API wrappers. If you enjoy optimizing low-latency data loops, writing clean TypeScript, and building predictable state architectures, our roadmap offers a rigorous environment.
              </p>
            </div>
            <Link 
              to="/careers" 
              className="text-xs font-semibold uppercase text-[#2563EB] hover:underline flex items-center gap-1 mt-4 border-t border-[#E2E8F0] pt-3"
            >
              Explore Open Roles
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </section>

      </main>

    </div>
  );
}

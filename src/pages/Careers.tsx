import React, { useState } from 'react';
import { Link } from '../components/Router';
import { 
  Compass, ShieldCheck, Cpu, Terminal, Hammer, HelpCircle, ArrowRight, 
  Lightbulb, Users2, Filter, CheckCircle2, ChevronDown, ChevronUp, AlertCircle, Sparkles, Send, Brain
} from 'lucide-react';

interface JobRole {
  id: string;
  title: string;
  department: 'Engineering' | 'Research' | 'Operations';
  location: string;
  compensation: string;
  stack: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const OPEN_ROLES: JobRole[] = [
  {
    id: 'voice-engineer',
    title: "Sovereign Voice Systems Engineer",
    department: "Engineering",
    location: "Sovereign Labs (Remote / London / SF)",
    compensation: "$180k - $240k • 0.5% - 1.2% Equity",
    stack: ["WebRTC", "C++", "Rust", "PCM Audio", "VAD", "TypeScript"],
    description: "Architect and optimize our streaming audio runtime. You will be responsible for keeping live duplex voice agent latency under 400ms by engineering raw socket buffers and localized voice activity detection filters.",
    responsibilities: [
      "Minimize end-to-end voice roundtrips by bypassing legacy HTTP streaming routes",
      "Optimize local WebRTC transport nodes and implement high-density audio compression streams",
      "Build strict safety locks that instantly interrupt agent responses when customer speech resumes"
    ],
    requirements: [
      "Deep understanding of digital signal processing (DSP), sample rates, and PCM formats",
      "Proven track record of deploying raw socket servers under high concurrent user loads",
      "Obsessive focus on microsecond performance gains"
    ]
  },
  {
    id: 'wasm-architect',
    title: "WASM Edge Inference Architect",
    department: "Research",
    location: "Sovereign Labs (Remote / Paris)",
    compensation: "$190k - $250k • 0.6% - 1.5% Equity",
    stack: ["WebAssembly", "Rust", "ONNX", "SIMD", "Caching", "Llama.cpp"],
    description: "Compile and bundle open-weight model runtimes directly into local WASM enclaves. Your work will enable high-speed model inference directly inside edge routers and distributed client servers.",
    responsibilities: [
      "Translate heavy PyTorch weights into optimized, static-compiled WASM binaries",
      "Leverage SIMD instructions to accelerate model matrix calculations inside local sandboxes",
      "Design a decentralized weight-adapter caching protocol that holds key layers close to clients"
    ],
    requirements: [
      "Expert-level competency in Rust and WebAssembly compilation flags",
      "Experience optimizing model quantization parameters (GGML, GPTQ) for low-memory devices",
      "A passion for liberating intelligence from central hyper-scaler cloud locks"
    ]
  },
  {
    id: 'agent-compiler',
    title: "Multi-Agent System Compiler Engineer",
    department: "Engineering",
    location: "Sovereign Labs (Remote / SF)",
    compensation: "$170k - $220k • 0.4% - 1.0% Equity",
    stack: ["TypeScript", "Zod", "LangGraph", "Directed Acyclic Graphs (DAGs)", "PostgreSQL"],
    description: "Build robust, deterministic execution paths for multi-agent Directed Acyclic Graphs (DAGs). You will construct the compiler that translates user prompts into strictly validated agent tasks.",
    responsibilities: [
      "Design zero-flicker state-consistent routers that coordinate asynchronous agent handoffs",
      "Implement strict declarative schema validators (Zod) at every API and tool node boundary",
      "Build advanced logging and instrumentation hooks that trace tool latency down to the millisecond"
    ],
    requirements: [
      "Deep experience managing state-machines and complex logical graph networks",
      "A refusal to use loose JSON objects, preferring strongly-typed, verifiable structures",
      "Proven history of building multi-tenant SaaS API routes"
    ]
  }
];

const FAQ_ITEMS = [
  {
    question: "What is Mashnu's stance on fully remote work?",
    answer: "We are remote-first but highly synchronized. We operate primarily in Western European and US time zones to maintain a high-density overlap for collaborative reviews. We gather the entire engineering team in person twice a year for dedicated physical compilation hackathons."
  },
  {
    question: "Do you hire junior developers or general API wrappers?",
    answer: "We are currently hiring seasoned systems programmers who can take absolute ownership of complex modules from day one. If your experience is primarily stitching generic APIs with loose prompt strings, our low-level compiler and latency-focused targets may not be the right environment."
  },
  {
    question: "How does the diagnostic evaluation screening work?",
    answer: "We value objective code capability over traditional resumes. Our pipeline involves completing a short architectural diagnostic (which you can test below), followed by a deep-dive design review of open-weight compilation or voice state sync protocols. We pay candidates for any contract trial projects."
  }
];

export default function Careers() {
  const [activeDept, setActiveDept] = useState<'All' | 'Engineering' | 'Research' | 'Operations'>('All');
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Alignment Diagnostic State
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  // Live Application Form State
  const [selectedJob, setSelectedJob] = useState<string>('voice-engineer');
  const [candidateName, setCandidateName] = useState<string>('');
  const [candidateEmail, setCandidateEmail] = useState<string>('');
  const [candidateStack, setCandidateStack] = useState<string>('');
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [applicationLog, setApplicationLog] = useState<string[]>([]);
  const [applicationStatus, setApplicationStatus] = useState<'idle' | 'success' | 'fail'>('idle');

  const filteredJobs = OPEN_ROLES.filter(job => activeDept === 'All' || job.department === activeDept);

  // Quiz Questions
  const QUIZ_QUESTIONS = [
    {
      q: "When building a real-time conversational agent, how do you minimize physical latency?",
      options: [
        "Use a centralized cloud API proxy, buffer the full sentence, then stream back the synthesized speech.",
        "Deploy raw socket handlers locally, process audio via sub-30ms streaming PCM buffers, and integrate edge VAD.",
        "Add a visual loading indicator and configure client-side timeout retries every 3 seconds."
      ],
      weights: [10, 100, 30]
    },
    {
      q: "How should a high-integrity multi-agent workflow handle state transitions?",
      options: [
        "Pass generic, unvalidated JSON arrays between nodes and let the LLM guess the next active node.",
        "Write custom state variables to local browser cookies and trigger page reloads.",
        "Enforce strict Zod schema validation at every node boundary within a state-consistent Directed Acyclic Graph (DAG)."
      ],
      weights: [20, 10, 100]
    },
    {
      q: "What is your stance on utilizing commercial LLM API wrappers for mission-critical medical/legal systems?",
      options: [
        "They are perfect. We should route all user data to central hyper-scalers without local verification.",
        "They are a severe security and latency liability. We must compile open-weight models locally inside isolated WASM enclaves.",
        "We should write simple prompt rules and hope the hyper-scalers don't experience latency spikes."
      ],
      weights: [10, 100, 20]
    }
  ];

  const handleQuizAnswer = (optionIdx: number) => {
    const nextAnswers = [...quizAnswers, QUIZ_QUESTIONS[quizStep].weights[optionIdx]];
    setQuizAnswers(nextAnswers);

    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(prev => prev + 1);
    } else {
      // Calculate score
      const average = Math.round(nextAnswers.reduce((a, b) => a + b, 0) / QUIZ_QUESTIONS.length);
      let resultText = '';
      if (average >= 90) {
        resultText = "Sovereign Systems Architect (100% Alignment). You reject wrappers. You belong in our systems enclave.";
      } else if (average >= 60) {
        resultText = "Integrations Specialist (70% Alignment). Good performance instincts, but we will challenge you to go deeper into compilation runtimes.";
      } else {
        resultText = "SaaS Administrator (30% Alignment). Your approach leans toward high-overhead commercial API wrappers. Mashnu requires a lower-level systems focus.";
      }
      setQuizResult(resultText);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizResult(null);
  };

  const toggleJobExpansion = (id: string) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  // Simulated live candidate screening logic
  const handleLiveApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim() || !candidateEmail.trim() || !candidateStack.trim()) return;

    setIsApplying(true);
    setApplicationStatus('idle');
    setApplicationLog([]);

    const logs = [
      `[MASHNU PORTAL] Initializing application stream for role: ${selectedJob.toUpperCase()}`,
      `[MASHNU PORTAL] Establishing pipeline socket to sovereign resume parser...`,
      `[METRIC] Target candidates payload: Name: ${candidateName}, Email: ${candidateEmail}`,
      `[COMPILER] Checking candidate technical stack profile: "${candidateStack}"`,
    ];

    let logIdx = 0;
    const interval = setInterval(() => {
      if (logIdx < logs.length) {
        setApplicationLog(prev => [...prev, logs[logIdx]]);
        logIdx++;
      } else {
        clearInterval(interval);
        
        // Dynamic qualification based on stack keywords
        const stackLower = candidateStack.toLowerCase();
        const scoreMatch = (stackLower.match(/(rust|wasm|webassembly|webrtc|pcm|c\+\+|zod|dag|langgraph|latency|systems|socket|kernel|compil|inference)/g) || []).length;
        
        setTimeout(() => {
          setApplicationLog(prev => [...prev, `[EVALUATOR] Structural Keyword Alignments Detected: ${scoreMatch}/4`]);
        }, 300);

        setTimeout(() => {
          if (scoreMatch >= 2) {
            setApplicationLog(prev => [
              ...prev, 
              `[SUCCESS] Alignment Threshold Met! Score: ${(scoreMatch * 25) + 20}/100`,
              `[SUCCESS] Automated pre-screening status: PASSED. Direct interview channel opened.`,
              `[SUCCESS] Routing invitation packet to ${candidateEmail}...`
            ]);
            setApplicationStatus('success');
            setIsApplying(false);
          } else {
            setApplicationLog(prev => [
              ...prev, 
              `[ANALYSIS] Candidate stack leans heavily towards general high-level frontend/marketing libraries.`,
              `[NOTICE] pre-screening status: HOLD. We require deeper native low-latency systems familiarity.`,
              `[INFO] We have registered your profile for alternative corporate pipeline paths.`
            ]);
            setApplicationStatus('fail');
            setIsApplying(false);
          }
        }, 1000);
      }
    }, 450);
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#2563EB]/20 selection:text-[#2563EB] py-16 animate-fade-in">
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/15 text-[10px] font-mono uppercase tracking-widest text-[#2563EB] mx-auto">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>Join Our Systems Enclave</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.02em] text-[#0F172A]">
            We build the systems. You own the code.
          </h1>
          <p className="text-base text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            We are a small, elite assembly of systems programmers constructing the permanent autonomous layer for global enterprise operations. No wrappers. No fluff. Just low-level engineering.
          </p>
        </section>

        {/* SECTION 1: CORE OPERATIONAL VALUES */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-[#E2E8F0] rounded-2xl bg-white p-6 space-y-4 hover:border-[#CBD5E1] transition-all shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB]/5 border border-[#2563EB]/10 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-[#2563EB]" />
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0F172A]">Uninterrupted Work</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              We organize around long, completely uninterrupted coding stretches. No daily standups, no recurring alignment committees, and no useless performance meetings. Let your compiled code speak.
            </p>
          </div>

          <div className="border border-[#E2E8F0] rounded-2xl bg-white p-6 space-y-4 hover:border-[#CBD5E1] transition-all shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0F172A]">Total Module Ownership</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Every system developer manages their module pipeline end-to-end—from compiling localized weight-adapter caches and optimizing signal paths to deploying private sandboxes.
            </p>
          </div>

          <div className="border border-[#E2E8F0] rounded-2xl bg-white p-6 space-y-4 hover:border-[#CBD5E1] transition-all shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0F172A]">Microsecond Precision</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              We never approximate. We measure voice latency in milliseconds, enforce strict declarative validation schemas, and construct self-documenting tests for every multi-agent node transition.
            </p>
          </div>
        </section>

        {/* SECTION 2: THE INTERACTIVE JOB BOARD */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A]">Engineering Operations</h2>
              <p className="text-xs text-[#64748B]">Explore active engineering and research positions within our Labs.</p>
            </div>
            
            {/* Filters */}
            <div className="flex gap-1.5 bg-[#F1F5F9] p-1 rounded-full border border-[#E2E8F0] self-start sm:self-auto">
              {(['All', 'Engineering', 'Research'] as const).map(dept => (
                <button
                  key={dept}
                  onClick={() => setActiveDept(dept)}
                  className={`px-3 py-1 text-[11px] font-medium rounded-full transition-all cursor-pointer ${
                    activeDept === dept 
                      ? 'bg-white text-[#2563EB] shadow-xs font-semibold' 
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs Listing */}
          <div className="space-y-4">
            {filteredJobs.map(job => {
              const isExpanded = expandedJobId === job.id;
              return (
                <div 
                  key={job.id}
                  className={`border border-[#E2E8F0] rounded-2xl bg-white transition-all overflow-hidden shadow-xs ${
                    isExpanded ? 'ring-1 ring-[#2563EB]/20 border-[#2563EB]' : 'hover:border-[#CBD5E1]'
                  }`}
                >
                  {/* Job Bar Header */}
                  <div 
                    onClick={() => toggleJobExpansion(job.id)}
                    className="p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-[9px] font-semibold uppercase rounded-full tracking-wider ${
                          job.department === 'Research' 
                            ? 'bg-purple-50 text-purple-600 border border-purple-100' 
                            : 'bg-blue-50 text-blue-600 border border-blue-100'
                        }`}>
                          {job.department}
                        </span>
                        <span className="text-[10px] text-[#64748B]">{job.location}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[#0F172A]">{job.title}</h3>
                      <p className="text-xs text-[#64748B] line-clamp-1">{job.description}</p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <span className="hidden sm:inline text-xs font-medium text-[#0F172A] bg-[#F1F5F9] px-3 py-1 rounded-full">{job.compensation.split(' • ')[0]}</span>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-[#64748B]" /> : <ChevronDown className="w-5 h-5 text-[#64748B]" />}
                    </div>
                  </div>

                  {/* Expanded Details Panel */}
                  {isExpanded && (
                    <div className="border-t border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-6 space-y-6 animate-fade-in">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Responsibilities */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]">Core Operational Directives</h4>
                          <ul className="space-y-2.5">
                            {job.responsibilities.map((resp, idx) => (
                              <li key={idx} className="flex gap-2.5 items-start text-xs text-[#64748B] leading-relaxed">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Requirements */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]">Engineering Prerequisites</h4>
                          <ul className="space-y-2.5">
                            {job.requirements.map((req, idx) => (
                              <li key={idx} className="flex gap-2.5 items-start text-xs text-[#64748B] leading-relaxed">
                                <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>

                      {/* Tech stack badges */}
                      <div className="border-t border-[#E2E8F0] pt-4 flex flex-wrap gap-1.5 items-center">
                        <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider mr-2">Core Pipeline Stack:</span>
                        {job.stack.map(tech => (
                          <span key={tech} className="px-2.5 py-1 bg-white border border-[#E2E8F0] text-[10px] font-mono rounded-md text-[#0F172A] font-semibold shadow-xs">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Actions link inside job card */}
                      <div className="border-t border-[#E2E8F0] pt-4 flex items-center justify-between">
                        <span className="text-xs text-[#64748B]">Compensation Plan: {job.compensation}</span>
                        <a 
                          href="#portal" 
                          onClick={() => setSelectedJob(job.id)}
                          className="px-4 py-1.5 rounded-full bg-[#2563EB] text-white hover:bg-[#2563EB]/90 text-xs font-medium tracking-tight transition-all shadow-xs"
                        >
                          Initiate Application
                        </a>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE SYSTEMS ALIGNMENT DIAGNOSTIC */}
        <section className="border border-[#E2E8F0] rounded-3xl bg-white p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2.5 border-b border-[#E2E8F0] pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB]/5 border border-[#2563EB]/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div>
              <h3 className="text-base font-semibold tracking-tight text-[#0F172A]">Systems Alignment Diagnostic</h3>
              <span className="text-[9px] font-semibold text-[#64748B] uppercase tracking-wider block mt-0.5">Test your engineering values</span>
            </div>
          </div>

          {quizResult ? (
            <div className="space-y-4 py-4 text-center max-w-xl mx-auto">
              <div className="inline-flex w-12 h-12 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/10 items-center justify-center text-[#2563EB] text-lg font-bold">
                ✓
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-semibold text-[#2563EB] uppercase tracking-wider block">Diagnostic Result</span>
                <p className="text-sm sm:text-base font-semibold text-[#0F172A] leading-relaxed">
                  {quizResult}
                </p>
              </div>
              <button
                onClick={resetQuiz}
                className="px-4 py-1.5 rounded-full border border-[#E2E8F0] hover:bg-[#F1F5F9] text-xs font-semibold cursor-pointer transition-colors"
              >
                Re-take Diagnostic
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Question card */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">
                  <span>Question {quizStep + 1} of {QUIZ_QUESTIONS.length}</span>
                  <span className="w-1 h-1 rounded-full bg-[#E2E8F0]" />
                  <span>Pipeline Philosophy</span>
                </div>
                <h4 className="text-sm sm:text-base font-medium text-[#0F172A] leading-relaxed">
                  {QUIZ_QUESTIONS[quizStep].q}
                </h4>
              </div>

              {/* Option Buttons */}
              <div className="grid grid-cols-1 gap-3">
                {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(idx)}
                    className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white hover:border-[#2563EB] text-left text-xs sm:text-sm text-[#334155] hover:text-[#0F172A] transition-all duration-200 cursor-pointer shadow-xs leading-relaxed"
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Progress Indicator */}
              <div className="h-1 bg-[#F1F5F9] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#2563EB] transition-all duration-300"
                  style={{ width: `${((quizStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </section>

        {/* SECTION 4: LIVE CANDIDACY APPLICATION PORTAL */}
        <section id="portal" className="border border-[#E2E8F0] rounded-[28px] bg-[#F1F5F9] p-6 sm:p-10 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563EB]/5 blur-[120px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Info Panel (Col-span 5) */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-mono text-[#2563EB] uppercase tracking-widest font-bold block">Live Target Portal</span>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#0F172A]">Compile Your Candidacy</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Submit your profile schema directly to our pipeline registry. Our automated evaluator will run a structural parsing diagnostic to test your credentials and stack alignment live.
              </p>
              
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] text-xs space-y-2">
                <span className="text-[8px] font-semibold uppercase text-emerald-600 block">Direct Pipeline targets:</span>
                <ul className="space-y-1.5 text-[11px] text-[#64748B]">
                  <li>• Voice Systems Engineer → Rust, WebRTC, PCM</li>
                  <li>• WASM Inference Architect → WebAssembly, ONNX, SIMD</li>
                  <li>• System Compiler Engineer → TypeScript, Zod, DAG</li>
                </ul>
              </div>
            </div>

            {/* Live Interactive Form (Col-span 7) */}
            <form onSubmit={handleLiveApply} className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">Select Target Target Role</label>
                <select
                  value={selectedJob}
                  onChange={(e) => setSelectedJob(e.target.value)}
                  className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                >
                  <option value="voice-engineer">Sovereign Voice Systems Engineer</option>
                  <option value="wasm-architect">WASM Edge Inference Architect</option>
                  <option value="agent-compiler">Multi-Agent System Compiler Engineer</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">Candidate Name</label>
                  <input
                    type="text"
                    required
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g. Linus Torvalds"
                    className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">Communication Endpoint (Email)</label>
                  <input
                    type="email"
                    required
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    placeholder="e.g. linus@kernel.org"
                    className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">Custom Engineering Stack & Repositories (Pitch)</label>
                <textarea
                  required
                  rows={3}
                  value={candidateStack}
                  onChange={(e) => setCandidateStack(e.target.value)}
                  placeholder="e.g. Highly optimized local ONNX inferences using SIMD adapters in Rust and WASM. Designed custom Gstreamer pipelines for sub-300ms PCM gateways."
                  className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors placeholder-[#94A3B8]"
                />
              </div>

              {/* Simulated compilation/screening logs output console */}
              {applicationLog.length > 0 && (
                <div className="bg-[#0F172A] rounded-xl p-4 border border-[#334155] space-y-1 font-mono text-[10px] sm:text-[11px] text-emerald-400 overflow-x-auto shadow-inner max-h-40 overflow-y-auto">
                  {applicationLog.map((log, i) => (
                    <div key={i} className={
                      log.startsWith('[SUCCESS]') ? 'text-emerald-400 font-semibold' :
                      log.startsWith('[METRIC]') ? 'text-cyan-300' :
                      log.startsWith('[COMPILER]') ? 'text-blue-300' :
                      log.startsWith('[EVALUATOR]') ? 'text-amber-300 font-semibold' : 'text-slate-300'
                    }>
                      {log}
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] text-[#64748B] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
                  Secure Logical Sandboxing
                </span>
                
                <button
                  type="submit"
                  disabled={isApplying || !candidateName.trim() || !candidateEmail.trim() || !candidateStack.trim()}
                  className={`px-5 py-2 rounded-full text-xs font-semibold tracking-tight transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    isApplying
                      ? 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0] cursor-not-allowed'
                      : 'bg-[#0F172A] hover:bg-[#334155] text-white'
                  }`}
                >
                  {isApplying ? 'Compiling Candidacy...' : 'Compile application payload'}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

            </form>

          </div>
        </section>

        {/* SECTION 5: ACCORDION FAQ */}
        <section className="space-y-6 max-w-4xl mx-auto pb-12">
          <div className="text-center max-w-md mx-auto space-y-1">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#0F172A]">Operational Inquiries FAQ</h3>
            <p className="text-xs text-[#64748B]">Transparent details regarding compensation, structure, and trial protocols.</p>
          </div>

          <div className="border border-[#E2E8F0] rounded-2xl bg-white overflow-hidden divide-y divide-[#E2E8F0] shadow-xs">
            {FAQ_ITEMS.map((item, idx) => {
              const isActive = activeFaq === idx;
              return (
                <div key={idx} className="transition-all">
                  <button
                    onClick={() => setActiveFaq(isActive ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#0F172A] hover:bg-[#F8FAFC] select-none cursor-pointer"
                  >
                    <span>{item.question}</span>
                    {isActive ? <ChevronUp className="w-4 h-4 text-[#2563EB]" /> : <ChevronDown className="w-4 h-4 text-[#64748B]" />}
                  </button>
                  {isActive && (
                    <div className="p-5 bg-[#F8FAFC] text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-[#E2E8F0] animate-fade-in">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}

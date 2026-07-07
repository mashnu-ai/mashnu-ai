import React, { useState } from 'react';
import { 
  Send, ShieldCheck, Mail, Building, User, Briefcase, HelpCircle, 
  ChevronRight, Terminal, FileText, CheckCircle2, AlertTriangle, Cpu, RotateCcw, ArrowRight
} from 'lucide-react';

interface AppraisalReport {
  feasibilityRating: number;
  architectureTier: string;
  technicalAssessment: string;
  suggestedStack: string[];
  latencyRisk: string;
  platformReuseFit: string;
}

export default function Contact() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [useCase, setUseCase] = useState('');
  const [estimatedVolume, setEstimatedVolume] = useState('10,000 / month');
  const [currentSystem, setCurrentSystem] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<AppraisalReport | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!useCase.trim()) {
      setError('Please provide a proposed use case so our system can run the feasibility assessment.');
      return;
    }

    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await fetch('/api/qualify-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          company,
          role,
          useCase,
          estimatedVolume,
          currentSystem
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'The system failed to compile the feasibility report.');
      }

      const data = await response.json();
      setReport(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'A network error occurred. Please try compiling again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setCompany('');
    setRole('');
    setUseCase('');
    setEstimatedVolume('10,000 / month');
    setCurrentSystem('');
    setReport(null);
    setError(null);
  };

  return (
    <div className="relative min-h-screen bg-[#F7F3EB] text-[#211D16] font-sans selection:bg-[#C15F3C]/20 selection:text-[#C15F3C] py-16">
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Title */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-semibold text-[#C15F3C] uppercase tracking-wider block">
            Real-time Systems Assessment
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.02em] text-[#211D16] leading-tight">
            Request Architectural Appraisal
          </h1>
          <p className="text-lg text-[#6F6757] leading-relaxed max-w-2xl mx-auto">
            Submit your unstructured workflows below. Our server-side LLM compiler will immediately generate a technical, realistic, and schema-validated feasibility assessment report.
          </p>
        </section>

        {/* MAIN INTERACTIVE SPLIT PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Left Form Panel */}
          <div className="lg:col-span-6 border border-[#E5DED0] rounded-[28px] bg-white p-6 sm:p-8 space-y-6 shadow-sm">
            
            <div className="flex items-center gap-2 border-b border-[#E5DED0] pb-4">
              <Terminal className="w-4 h-4 text-[#C15F3C]" />
              <span className="text-xs font-semibold text-[#211D16] uppercase tracking-wider">Specification Input Console</span>
            </div>

            {!report ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full name and email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#6F6757] block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-2.5 w-4 h-4 text-[#8B8271]" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-[#EFE9DD] border border-[#E5DED0] rounded-xl px-3 py-2 pl-10 text-xs text-[#211D16] placeholder-[#8B8271] focus:outline-none focus:border-[#C15F3C] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#6F6757] block">Business Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-2.5 w-4 h-4 text-[#8B8271]" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full bg-[#EFE9DD] border border-[#E5DED0] rounded-xl px-3 py-2 pl-10 text-xs text-[#211D16] placeholder-[#8B8271] focus:outline-none focus:border-[#C15F3C] focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Company and role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#6F6757] block">Company</label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-2.5 w-4 h-4 text-[#8B8271]" />
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Enterprise Inc."
                        className="w-full bg-[#EFE9DD] border border-[#E5DED0] rounded-xl px-3 py-2 pl-10 text-xs text-[#211D16] placeholder-[#8B8271] focus:outline-none focus:border-[#C15F3C] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#6F6757] block">Role / Title</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3.5 top-2.5 w-4 h-4 text-[#8B8271]" />
                      <input
                        type="text"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="VP of Operations"
                        className="w-full bg-[#EFE9DD] border border-[#E5DED0] rounded-xl px-3 py-2 pl-10 text-xs text-[#211D16] placeholder-[#8B8271] focus:outline-none focus:border-[#C15F3C] focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Expected Volume and Current System */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#6F6757] block">Target Monthly Volume</label>
                    <select
                      value={estimatedVolume}
                      onChange={(e) => setEstimatedVolume(e.target.value)}
                      className="w-full bg-[#EFE9DD] border border-[#E5DED0] rounded-xl px-3 py-2 text-xs text-[#211D16] focus:outline-none focus:border-[#C15F3C] focus:bg-white transition-all"
                    >
                      <option value="Under 5,000 / month">Under 5,000 / month</option>
                      <option value="10,000 / month">10,000 / month</option>
                      <option value="50,000 / month">50,000 / month</option>
                      <option value="100,000+ / month">100,000+ / month</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#6F6757] block">Current System / Tools</label>
                    <input
                      type="text"
                      value={currentSystem}
                      onChange={(e) => setCurrentSystem(e.target.value)}
                      placeholder="e.g. HubSpot, Manual PDF checklists"
                      className="w-full bg-[#EFE9DD] border border-[#E5DED0] rounded-xl px-3 py-2 text-xs text-[#211D16] placeholder-[#8B8271] focus:outline-none focus:border-[#C15F3C] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Proposed Use-case */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#6F6757] block">Proposed AI Use-Case Specification</label>
                    <span className="text-[9px] text-[#8B8271]">Mandatory</span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    placeholder="Describe exactly what manual step, invoice matching, clinical triage, or voice support loop you want to automate. Give as much raw data criteria as possible."
                    className="w-full bg-[#EFE9DD] border border-[#E5DED0] rounded-xl px-3 py-2.5 text-xs text-[#211D16] placeholder-[#8B8271] focus:outline-none focus:border-[#C15F3C] focus:bg-white leading-relaxed resize-none transition-all"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs leading-relaxed">
                    <AlertTriangle className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                    {error}
                  </div>
                )}

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-full font-semibold text-xs tracking-tight flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                      loading 
                        ? 'bg-[#EFE9DD] text-[#8B8271] border border-[#E5DED0] cursor-not-allowed'
                        : 'bg-[#211D16] hover:bg-[#4C463B] text-white shadow-xs'
                    }`}
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-[#8B8271] border-t-[#C15F3C] animate-spin" />
                        Analyzing Systems Architecture...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Compile Technical Appraisal
                      </>
                    )}
                  </button>
                </div>

              </form>
            ) : (
              // Success Screen
              <div className="space-y-6 text-center py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold tracking-tight text-[#211D16]">Appraisal Compiled</h3>
                  <p className="text-sm text-[#6F6757] leading-relaxed max-w-md mx-auto">
                    Your feasibility report has been successfully analyzed and structured on the server. Inspect the compiled output on the right dashboard.
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={resetForm}
                    className="inline-flex px-5 py-2.5 rounded-full bg-[#211D16] hover:bg-[#4C463B] text-white text-xs font-semibold tracking-tight items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Compile Another Use-Case
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Appraisal/Explanation Display Column */}
          <div className="lg:col-span-6 flex flex-col justify-between items-stretch">
            {report ? (
              <div className="border border-[#C15F3C] rounded-[28px] bg-white p-6 sm:p-8 space-y-6 flex flex-col justify-between h-full shadow-md">
                
                <div className="space-y-5">
                  
                  {/* Title and Rating Dial */}
                  <div className="flex items-center justify-between border-b border-[#E5DED0] pb-4">
                    <div>
                      <span className="text-[9px] font-semibold text-[#C15F3C] uppercase tracking-wider block">Appraisal Output</span>
                      <h3 className="text-lg font-semibold tracking-tight text-[#211D16] mt-0.5">{report.architectureTier}</h3>
                    </div>
                    
                    {/* Dial */}
                    <div className="relative w-14 h-14 rounded-full border border-[#E5DED0] bg-[#EFE9DD] flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-lg font-semibold text-[#C15F3C] block tracking-tight leading-none">{report.feasibilityRating}</span>
                        <span className="text-[8px] text-[#6F6757] block leading-none font-semibold uppercase mt-0.5">/ 10</span>
                      </div>
                    </div>
                  </div>

                  {/* Assessment paragraph */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold text-[#6F6757] uppercase tracking-wider block">Systems Engineer Assessment</span>
                    <p className="text-xs sm:text-sm text-[#4C463B] leading-relaxed">{report.technicalAssessment}</p>
                  </div>

                  {/* Technical bottlenecks */}
                  <div className="p-4 bg-red-50 border border-red-100 rounded-2xl space-y-1">
                    <span className="text-[9px] font-semibold text-red-600 uppercase tracking-wider block">Latency & Throttle Bottlenecks</span>
                    <p className="text-xs text-red-700 leading-relaxed">{report.latencyRisk}</p>
                  </div>

                  {/* Suggested stacks badges */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold text-[#6F6757] uppercase tracking-wider block">Suggested Stack Components</span>
                    <div className="flex flex-wrap gap-1.5">
                      {report.suggestedStack.map((tech, i) => (
                        <span key={i} className="px-3 py-1 text-[10px] font-medium rounded-full bg-[#EFE9DD] text-[#211D16] border border-[#E5DED0]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Platform fit highlight */}
                <div className="pt-5 border-t border-[#E5DED0] mt-6 flex items-start gap-2.5">
                  <Cpu className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider block">Core Roadmap Fit</span>
                    <p className="text-xs sm:text-sm text-[#6F6757] leading-relaxed mt-0.5">{report.platformReuseFit}</p>
                  </div>
                </div>

              </div>
            ) : (
              // Default preview guidelines
              <div className="border border-[#E5DED0] border-dashed rounded-[28px] bg-[#EFE9DD]/40 p-6 sm:p-8 flex flex-col justify-center items-center text-center space-y-4 h-full py-16">
                <FileText className="w-10 h-10 text-[#D2C9B6] animate-pulse" />
                <div className="space-y-2 max-w-sm">
                  <h3 className="text-sm font-semibold tracking-wider text-[#211D16] uppercase">Waiting for Specifications</h3>
                  <p className="text-xs sm:text-sm text-[#6F6757] leading-relaxed">
                    Once you submit your company's manual operational steps, our server-side compiler evaluates your requirements and generates the secure systems assessment here.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

      </main>

    </div>
  );
}

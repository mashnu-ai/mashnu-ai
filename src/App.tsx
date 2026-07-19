import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Layers, BarChart3, Landmark, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './components/ScrollReveal';
import CommandPalette from './components/CommandPalette';
import { useSEO } from './components/SEO';

// Modular Sections
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import CompanyOverview from './components/CompanyOverview';
import ProductSuite from './components/ProductSuite';
import LatencyBenchmarks from './components/LatencyBenchmarks';
import VisionTimeline from './components/VisionTimeline';
import LeadCapture from './components/LeadCapture';

// Global Layout & Page Imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { RouterProvider, useRouter } from './components/Router';
import { ThemeProvider } from './components/ThemeContext';
import Products from './pages/Products';
import Solutions from './pages/Solutions';
import Platform from './pages/Platform';
import Vision from './pages/Vision';
import CaseStudies from './pages/CaseStudies';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Assistant from './pages/Assistant';
import ROICalculator from './pages/ROICalculator';
import AIEmployees from './pages/AIEmployees';
import AIEmployeeCostCalculator from './pages/AIEmployeeCostCalculator';

const HOMEPAGE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Mashnu AI',
  url: 'https://mashnu.com/',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://mashnu.com/blog?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

function AppLayout() {
  const [activeTab, setActiveTab] = useState<'company' | 'roadmap' | 'benchmarks' | 'vision'>('company');
  const { path } = useRouter();
  const isHomepage = path === '/';

  // Sub-pages set their own title/description/structured data; only apply
  // the homepage's SEO tags while actually on the homepage, otherwise this
  // would stomp whatever the active sub-page just set on every render.
  useSEO(
    isHomepage
      ? {
          title: 'Mashnu AI: Personal AI Assistant for Real Life',
          description: 'Mashnu builds a personal AI assistant that answers calls, replies to messages, and remembers what matters to you. The same technology powers AI voice, WhatsApp, and automation agents for businesses.',
          path: '/',
          structuredData: HOMEPAGE_STRUCTURED_DATA,
        }
      : null
  );

  if (path !== '/') {
    return (
      <div className="min-h-screen text-[#0F172A] font-sans selection:bg-[#2563EB]/20 selection:text-[#2563EB] flex flex-col justify-between">
        <Navbar />
        <div className="grow overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={path}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {path === '/products' && <Products />}
              {path === '/solutions' && <Solutions />}
              {path === '/platform' && <Platform />}
              {path === '/vision' && <Vision />}
              {path === '/case-studies' && <CaseStudies />}
              {path === '/pricing' && <Pricing />}
              {path === '/about' && <About />}
              {path === '/blog' && <Blog />}
              {path === '/careers' && <Careers />}
              {path === '/contact' && <Contact />}
              {path === '/assistant' && <Assistant />}
              {path === '/roi-calculator' && <ROICalculator />}
              {path === '/ai-employees' && <AIEmployees />}
              {path === '/ai-employee-cost-calculator' && <AIEmployeeCostCalculator />}
            </motion.div>
          </AnimatePresence>
        </div>
        <Footer />
        <CommandPalette />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#0F172A] font-sans selection:bg-[#2563EB]/20 selection:text-[#2563EB]">
      
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
        
        {/* HERO SECTION */}
        <Hero 
          onBookDemoClick={() => {
            document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onSeePlatformClick={() => {
            document.getElementById('product-suite-anchor')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* TRUST BAR */}
        <TrustBar />

        {/* MAIN TABBED VIEW CONTAINER */}
        <ScrollReveal yOffset={25} duration={0.35}>
          <div id="product-suite-anchor" className="border border-[#E2E8F0] rounded-3xl bg-white p-4 sm:p-6 shadow-sm scroll-mt-24">
          
            {/* TAB HEADERS (Segmented Control style) */}
            <div className="flex items-center justify-center border-b border-[#E2E8F0] pb-4 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 w-full max-w-3xl gap-1 bg-[#F1F5F9] p-1 rounded-full">
                <button
                  onClick={() => setActiveTab('company')}
                  className={`py-2 text-[12px] font-sans rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'company' ? 'bg-white text-[#0F172A] font-semibold shadow-sm' : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>About Mashnu</span>
                </button>
                <button
                  onClick={() => setActiveTab('roadmap')}
                  className={`py-2 text-[12px] font-sans rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'roadmap' ? 'bg-white text-[#0F172A] font-semibold shadow-sm' : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Our Products</span>
                </button>
                <button
                  onClick={() => setActiveTab('benchmarks')}
                  className={`py-2 text-[12px] font-sans rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'benchmarks' ? 'bg-white text-[#0F172A] font-semibold shadow-sm' : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Latency Benchmarks</span>
                </button>
                <button
                  onClick={() => setActiveTab('vision')}
                  className={`py-2 text-[12px] font-sans rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'vision' ? 'bg-white text-[#0F172A] font-semibold shadow-sm' : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <Landmark className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Vision Manifesto</span>
                </button>
              </div>
            </div>

            {/* ACTIVE CONTENT SECTION */}
            <div className="p-2 sm:p-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  {activeTab === 'company' && <CompanyOverview />}
                  {activeTab === 'roadmap' && <ProductSuite />}
                  {activeTab === 'benchmarks' && <LatencyBenchmarks />}
                  {activeTab === 'vision' && <VisionTimeline />}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </ScrollReveal>

        {/* AI EMPLOYEES TEASER BANNER */}
        <ScrollReveal yOffset={25} duration={0.35}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border border-[#E2E8F0] rounded-3xl bg-gradient-to-r from-[#2563EB]/5 to-[#4F46E5]/5 p-6 sm:p-8 flex items-center justify-between gap-6"
          >
            <div className="flex-1 space-y-2">
              <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A]">
                Meet your AI team
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed max-w-sm">
                Not a dashboard. A persistent digital worker that owns a job function continuously — voice, WhatsApp, or web.
              </p>
            </div>
            <a
              href="/ai-employees"
              className="inline-flex px-6 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1e40af] text-white text-xs font-semibold tracking-wide transition-colors items-center gap-1.5 whitespace-nowrap"
            >
              Explore roles
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </ScrollReveal>

        {/* LEAD ACQUISITION COMPONENT */}
        <LeadCapture />

      </main>

      <Footer />
      <CommandPalette />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <ThemeProvider>
        <AppLayout />
      </ThemeProvider>
    </RouterProvider>
  );
}

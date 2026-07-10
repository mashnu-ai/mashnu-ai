import React, { useState, useEffect } from 'react';
import { Link, useRouter } from './Router';
import { Menu, X } from 'lucide-react';
import BrandMark from './BrandMark';

export default function Navbar() {
  const { path } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', href: '/products' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Platform', href: '/platform' },
    { name: 'Vision', href: '/vision' },
    { name: 'Careers', href: '/careers' },
    { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-sm'
        : 'bg-white/40 backdrop-blur-lg border-b border-white/40'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <BrandMark className="w-9 h-9 transition-transform duration-200 group-hover:scale-105" />
            <span className="font-display font-semibold text-lg tracking-tight text-[#0F172A]">
              Mashnu
              <span className="font-mono text-[10px] font-medium text-primary-accent uppercase tracking-widest ml-1.5 align-middle">AI</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-[13px] font-sans font-normal text-[#64748B] hover:text-[#0F172A] transition-colors duration-200"
              activeClassName="text-primary-accent font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/assistant"
            className="px-4 py-1.5 rounded-full bg-primary-accent-light hover:bg-primary-accent/15 text-primary-accent text-xs font-medium tracking-tight transition-all duration-200"
          >
            AI Assistant
          </Link>
          <Link
            to="/contact"
            className="px-4 py-1.5 rounded-full bg-[#0F172A] hover:bg-primary-accent text-[#FFFFFF] text-xs font-medium tracking-tight transition-colors duration-200 shadow-sm"
          >
            Book a demo
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="xl:hidden flex items-center gap-2">
          <Link
            to="/contact"
            className="px-3 py-1 rounded-full bg-[#0F172A] hover:bg-primary-accent text-[11px] font-sans text-[#FFFFFF] transition-colors"
          >
            Demo
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="p-1.5 rounded-full text-[#64748B] hover:text-[#0F172A] focus:outline-none transition-colors cursor-pointer"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden absolute top-16 left-0 w-full bg-white/85 backdrop-blur-xl border-b border-white/60 shadow-xl z-40 transition-all duration-300">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-xs font-sans text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-all text-center block"
                  activeClassName="text-primary-accent bg-[#F1F5F9] font-semibold"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-[#E2E8F0] mt-4 space-y-2">
              <Link
                to="/assistant"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 rounded-full bg-primary-accent-light hover:bg-primary-accent/15 text-center block text-xs font-medium text-primary-accent transition-all"
              >
                AI Assistant
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 rounded-full bg-[#0F172A] hover:bg-primary-accent text-center block text-xs font-medium text-[#FFFFFF] transition-colors"
              >
                Book a demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

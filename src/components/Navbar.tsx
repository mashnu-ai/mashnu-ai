import React, { useState, useEffect } from 'react';
import { Link, useRouter } from './Router';
import { useTheme } from './ThemeContext';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const { path } = useRouter();
  const { theme, toggleTheme } = useTheme();
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
    { name: 'AI Assistant', href: '/assistant' },
    { name: 'Careers', href: '/careers' },
    { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#FBFBFD]/85 backdrop-blur-md border-b border-[#E8E8ED]' 
        : 'bg-[#FBFBFD]/60 backdrop-blur-sm border-b border-[#E8E8ED]/40'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#1D1D1F] flex items-center justify-center shadow-sm group-hover:opacity-90 transition-opacity">
              <span className="font-sans font-bold text-base text-white">M</span>
            </div>
            <div>
              <span className="font-sans font-semibold text-base tracking-tight text-[#1D1D1F]">
                MASHNU <span className="text-[#0071E3] font-sans font-medium ml-0.5">AI</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-[12px] font-sans font-normal text-[#6E6E73] hover:text-[#1D1D1F] transition-colors duration-200"
              activeClassName="text-[#0071E3] font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-3">
          <Link 
            to="/assistant" 
            className="px-4 py-1.5 rounded-full bg-[#0071E3]/10 hover:bg-[#0071E3]/15 text-[#0071E3] text-xs font-medium tracking-tight transition-all duration-200"
          >
            AI Assistant
          </Link>
          <Link 
            to="/contact" 
            className="px-4 py-1.5 rounded-full bg-[#1D1D1F] hover:bg-[#424245] text-white text-xs font-normal tracking-tight transition-all duration-200 shadow-sm"
          >
            Book a Demo
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="xl:hidden flex items-center gap-2">
          <Link 
            to="/contact" 
            className="px-3 py-1 rounded-full bg-[#1D1D1F] hover:bg-[#424245] text-[11px] font-sans text-white transition-all"
          >
            Demo
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-full text-[#6E6E73] hover:text-[#1D1D1F] focus:outline-none transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden absolute top-16 left-0 w-full bg-[#FBFBFD] border-b border-[#E8E8ED] shadow-xl z-40 transition-all duration-300">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-sans text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all text-center block"
                  activeClassName="text-[#0071E3] bg-[#F5F5F7] font-semibold"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-[#E8E8ED] mt-4">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 rounded-full bg-[#1D1D1F] hover:bg-[#424245] text-center block text-xs font-normal text-white transition-colors"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

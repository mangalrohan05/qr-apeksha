
interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: any) => void;
  isNavScrolled: boolean;
  logoTheme: 'light' | 'dark';
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  isNavScrolled,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: NavbarProps) {
  
  const handleNavClick = (e: any, hash: string) => {
    e.preventDefault();
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        window.history.pushState(null, '', hash);
        const el = document.getElementById(hash.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.history.pushState(null, '', hash);
      const el = document.getElementById(hash.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${isNavScrolled ? 'nav-scrolled' : ''}`}>
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between relative px-2">
        {/* Logo Frame */}
        <a href="#home" className="flex items-center cursor-pointer gap-2.5" onClick={(e) => handleNavClick(e, '#home')}>
          <img src="/authentiq_logo.png" alt="Authentiq Logo" className="w-[119px] h-[119px] object-contain" />
        </a>

        {/* Centered Navigation Menu Array - Desktop Only */}
        <nav className="hidden md:flex items-center justify-center gap-7 absolute left-1/2 -translate-x-1/2">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-[15px] font-semibold text-[#38434f] hover:text-[#16B981] transition-colors"
          >
            Home
          </a>
          <a
            href="#how"
            onClick={(e) => handleNavClick(e, '#how')}
            className="text-[15px] font-semibold text-[#38434f] hover:text-[#16B981] transition-colors"
          >
            How it works
          </a>
          <a
            href="#features"
            onClick={(e) => handleNavClick(e, '#features')}
            className="text-[15px] font-semibold text-[#38434f] hover:text-[#16B981] transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={(e) => handleNavClick(e, '#pricing')}
            className="text-[15px] font-semibold text-[#38434f] hover:text-[#16B981] transition-colors"
          >
            Pricing
          </a>
          <a
            href="#faq"
            onClick={(e) => handleNavClick(e, '#faq')}
            className="text-[15px] font-semibold text-[#38434f] hover:text-[#16B981] transition-colors"
          >
            FAQ
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}
            className="text-[15px] font-semibold text-[#38434f] hover:text-[#16B981] transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Right side CTA - Desktop Only */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setCurrentPage('billing')}
            className="bg-[#16B981] text-white font-bold text-[15px] px-5 py-2.5 rounded-[10px] shadow-[0_6px_16px_rgba(22,185,129,0.28)] hover:scale-105 transition-transform"
          >
            Start Free Trial
          </button>
        </div>

        {/* Hamburger Menu Button - Mobile Only */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden p-2 rounded-lg text-[#0F2A43] hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="4" y1="7" x2="20" y2="7"></line>
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="17" x2="20" y2="17"></line>
          </svg>
        </button>
      </div>
    </header>
  );
}

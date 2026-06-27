
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
  logoTheme,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: NavbarProps) {
  return (
    <header className={`navbar ${isNavScrolled ? 'nav-scrolled' : ''}`}>
      <div className="w-full flex items-center justify-between relative">
        {/* Logo Frame */}
        <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="logo-container relative">
            <img
              src="/authentiq_logo.png"
              alt="Authentiq Logo"
              className="logo"
            />
          </div>
        </div>

        {/* Centered Navigation Menu Array - Desktop Only */}
        <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-10 absolute left-1/2 -translate-x-1/2">
          <button
            onClick={() => setCurrentPage('home')}
            className={`text-sm lg:text-base font-medium transition-all duration-200 cursor-pointer ${currentPage === 'home' ? 'active-nav underline decoration-2 underline-offset-8' : ''}`}
          >
            Home
          </button>

          <button
            onClick={() => setCurrentPage('plans')}
            className={`text-sm lg:text-base font-medium transition-all duration-200 cursor-pointer ${currentPage === 'plans' ? 'active-nav underline decoration-2 underline-offset-8' : ''}`}
          >
            Plans
          </button>

          <button
            onClick={() => setCurrentPage('products')}
            className={`text-sm lg:text-base font-medium transition-all duration-200 cursor-pointer ${currentPage === 'products' ? 'active-nav underline decoration-2 underline-offset-8' : ''}`}
          >
            Services
          </button>

          <button
            onClick={() => setCurrentPage('about')}
            className={`text-sm lg:text-base font-medium transition-all duration-200 cursor-pointer ${currentPage === 'about' ? 'active-nav underline decoration-2 underline-offset-8' : ''}`}
          >
            About us
          </button>

          <button
            onClick={() => setCurrentPage('contact')}
            className={`text-sm lg:text-base font-medium transition-all duration-200 cursor-pointer ${currentPage === 'contact' ? 'active-nav underline decoration-2 underline-offset-8' : ''}`}
          >
            Contact us
          </button>
        </nav>

        {/* Hamburger Menu Button - Mobile Only */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-slate-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        {/* Spacer to balance flex layout visually on larger viewports */}
        <div className="w-[140px] sm:w-[160px] md:w-[180px] hidden md:block pointer-events-none" />
      </div>
    </header>
  );
}

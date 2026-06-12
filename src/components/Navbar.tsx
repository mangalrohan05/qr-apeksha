
interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: any) => void;
  isNavScrolled: boolean;
  logoTheme: 'light' | 'dark';
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  isNavScrolled,
  logoTheme,
}: NavbarProps) {
  return (
    <header className={`navbar ${isNavScrolled ? 'nav-scrolled' : ''}`}>
      <div className="w-full flex items-center justify-between relative">
        {/* Logo Frame */}
        <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="logo-container relative">
            {/* Light Logo (white text, for dark backgrounds) */}
            <img
              src="/authentiq_logo_light.svg"
              alt="Authentiq Logo Light"
              className={`logo absolute inset-0 transition-opacity duration-200 ${logoTheme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
            />
            {/* Dark Logo (dark text, for light backgrounds) */}
            <img
              src="/authentiq_logo_dark.svg"
              alt="Authentiq Logo Dark"
              className={`logo absolute inset-0 transition-opacity duration-200 ${logoTheme === 'light' ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        </div>

        {/* Centered Navigation Menu Array */}
        <nav className="flex items-center justify-center gap-10 absolute left-1/2 -translate-x-1/2">
          <button
            onClick={() => setCurrentPage('home')}
            className={`text-base font-medium transition-all duration-200 cursor-pointer ${currentPage === 'home' ? 'active-nav underline decoration-2 underline-offset-8' : ''}`}
          >
            Home
          </button>

          <button
            onClick={() => setCurrentPage('plans')}
            className={`text-base font-medium transition-all duration-200 cursor-pointer ${currentPage === 'plans' ? 'active-nav underline decoration-2 underline-offset-8' : ''}`}
          >
            Plans
          </button>

          <button
            onClick={() => setCurrentPage('products')}
            className={`text-base font-medium transition-all duration-200 cursor-pointer ${currentPage === 'products' ? 'active-nav underline decoration-2 underline-offset-8' : ''}`}
          >
            Services
          </button>

          <button
            onClick={() => setCurrentPage('about')}
            className={`text-base font-medium transition-all duration-200 cursor-pointer ${currentPage === 'about' ? 'active-nav underline decoration-2 underline-offset-8' : ''}`}
          >
            About us
          </button>

          <button
            onClick={() => setCurrentPage('contact')}
            className={`text-base font-medium transition-all duration-200 cursor-pointer ${currentPage === 'contact' ? 'active-nav underline decoration-2 underline-offset-8' : ''}`}
          >
            Contact us
          </button>
        </nav>

        {/* Spacer to balance flex layout visually on larger viewports */}
        <div className="w-[180px] hidden md:block pointer-events-none" />
      </div>
    </header>
  );
}

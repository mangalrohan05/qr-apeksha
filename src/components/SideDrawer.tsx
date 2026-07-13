import { useEffect, useRef } from 'react';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  setCurrentPage: (page: any) => void;
}

export default function SideDrawer({ isOpen, onClose, currentPage, setCurrentPage }: SideDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleNavClick = (hash: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        window.location.hash = hash;
        const el = document.getElementById(hash.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.location.hash = hash;
      const el = document.getElementById(hash.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  const navItems = [
    { id: '#home', label: 'Home' },
    { id: '#how', label: 'How it works' },
    { id: '#features', label: 'Features' },
    { id: '#pricing', label: 'Pricing' },
    { id: '#faq', label: 'FAQ' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[1001] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[1002] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <img src="/authentiq_logo.png" alt="Authentiq Logo" className="w-[30px] h-[30px] object-contain" />
              <span className="font-display font-extrabold text-[20px] tracking-tight text-[#0F2A43]">
                Authent<span className="text-[#16B981]">iq</span>
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="text-slate-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-6 py-6">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.id}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer font-semibold text-[16px] text-[#0F2A43] hover:bg-slate-50 hover:text-[#16B981]`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 px-2">
              <button
                onClick={() => {
                  setCurrentPage('billing');
                  onClose();
                }}
                className="w-full bg-[#16B981] text-white font-bold text-[16px] px-5 py-3.5 rounded-[10px] shadow-[0_6px_16px_rgba(22,185,129,0.28)]"
              >
                Start Free Trial
              </button>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-slate-100">
            <p className="text-xs text-slate-400 text-center">
              © 2026 Authentiq. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

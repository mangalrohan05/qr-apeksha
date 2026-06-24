import { useState } from 'react';

interface FooterProps {
  setCurrentPage?: (page: 'home' | 'plans' | 'products' | 'about' | 'contact' | 'billing' | 'terms' | 'privacy') => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const [activeModal, setActiveModal] = useState<'help' | null>(null);

  return (
    <footer className="relative w-full bg-white pt-8 pb-6 px-8 sm:px-12 border-t border-slate-100 select-none">
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col">

        {/* Four-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left mb-6">

          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div
              onClick={() => setCurrentPage ? setCurrentPage('home') : null}
              className="cursor-pointer hover:opacity-85 transition-opacity duration-200 inline-block"
            >
              <img
                src="/authentiq_logo.png"
                alt="Authentiq Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light">
              Authentiq, we believe brand protection is more than a process, it's a foundation of trust. We build secure cryptographic tracking layers to bring supply chain integrity and absolute verification to every product.
            </p>
            <p className="text-slate-400 text-xs font-light pt-2">
              © 2026 Authentiq. All Rights Reserved.
            </p>
          </div>

          {/* Column 2: Quicklinks */}
          <div>
            <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wider mb-5">
              Quicklinks
            </h3>
            <div className="flex flex-col space-y-3 text-slate-600 text-xs sm:text-sm font-medium">
              <button
                onClick={() => setCurrentPage ? setCurrentPage('home') : null}
                className="text-left hover:text-[#00b074] transition-colors duration-200 cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage ? setCurrentPage('plans') : null}
                className="text-left hover:text-[#00b074] transition-colors duration-200 cursor-pointer"
              >
                Plans
              </button>
              <button
                onClick={() => setCurrentPage ? setCurrentPage('products') : null}
                className="text-left hover:text-[#00b074] transition-colors duration-200 cursor-pointer"
              >
                Services
              </button>
              <button
                onClick={() => setCurrentPage ? setCurrentPage('about') : null}
                className="text-left hover:text-[#00b074] transition-colors duration-200 cursor-pointer"
              >
                About Us
              </button>
              <button
                onClick={() => setCurrentPage ? setCurrentPage('contact') : null}
                className="text-left hover:text-[#00b074] transition-colors duration-200 cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wider mb-5">
              Customer Service
            </h3>
            <div className="flex flex-col space-y-3 text-slate-600 text-xs sm:text-sm font-medium">
              <button
                onClick={() => setCurrentPage ? setCurrentPage('privacy') : null}
                className="text-left hover:text-[#00b074] transition-colors duration-200 cursor-pointer"
              >
                Privacy Policies
              </button>
              <button
                onClick={() => setCurrentPage ? setCurrentPage('terms') : null}
                className="text-left hover:text-[#00b074] transition-colors duration-200 cursor-pointer"
              >
                Terms &amp; Condition
              </button>
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4 text-slate-600 text-xs sm:text-sm font-medium">
            <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wider mb-5">
              Contact Info
            </h3>
            <div className="space-y-3.5">

              {/* Phone */}
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-500 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.017 12.017 0 0 1-5.908-5.908c-.454-.445-.291-.933.106-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <span className="font-light">
                  +91 XXXXX XXXXX
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-500 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <span className="font-light hover:text-[#00b074] transition-colors duration-200 cursor-pointer">
                  info@authentiq.com
                </span>
              </div>
            </div>


          </div>
        </div>

      </div>

      {/* Elegant Pop-up Modals for links */}
      {activeModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
          <div className="bg-white border border-slate-100 rounded-3xl p-8 max-w-lg w-full relative shadow-2xl max-h-[85vh] overflow-y-auto">

            {/* Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-black transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>



            {activeModal === 'help' && (
              <div className="space-y-4 text-left">
                <h3 className="text-xl font-semibold text-slate-900 tracking-tight">System &amp; Help Desk</h3>
                <div className="h-0.5 w-12 bg-[#00b074] rounded-full"></div>
                <p className="text-slate-650 text-xs sm:text-sm leading-relaxed font-normal">
                  Need help verifying your product? Here are quick tips:
                </p>
                <ul className="space-y-2 text-slate-650 text-xs sm:text-sm font-normal">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00b074]">✓</span>
                    Ensure the physical label is clean and has adequate lighting.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00b074]">✓</span>
                    Position your camera 15-20cm away from the secure QR identifier.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00b074]">✓</span>
                    If an alert says &quot;Suspect Signature&quot;, report it directly via our Contact page.
                  </li>
                </ul>
                <div className="pt-4 flex gap-4">
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      if (setCurrentPage) setCurrentPage('contact');
                    }}
                    className="px-6 py-2.5 bg-[#00b074] hover:bg-[#009660] text-white text-xs font-semibold rounded-full transition-all cursor-pointer"
                  >
                    Open Support Ticket
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 border border-slate-200 hover:border-slate-350 text-slate-600 text-xs rounded-full cursor-pointer transition-colors"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}


    </footer>
  );
}

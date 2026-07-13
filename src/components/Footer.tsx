interface FooterProps {
  setCurrentPage?: (page: any) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const scrollToAnchor = (hash: string) => {
    if (setCurrentPage) setCurrentPage('home');
    setTimeout(() => {
      window.location.hash = hash;
      const el = document.getElementById(hash.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer id="contact" className="w-full bg-[#0b1d2e] pt-16 pb-8 border-t border-[#122e47]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="mb-6">
              <img src="/authentiq_logo_dark.png" alt="Authentiq Logo" className="w-[267px] h-auto object-contain" />
            </div>
            <p className="text-[15px] leading-[1.65] text-[#8b9ba8] max-w-[380px] font-medium">
              We build secure cryptographic tracking layers to bring supply chain integrity and absolute verification to every product.
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-[14px] uppercase tracking-wider text-white mb-5">Product</h3>
            <ul className="flex flex-col gap-3.5 text-[15px] text-[#8b9ba8] font-medium">
              <li><button onClick={() => scrollToAnchor('#how')} className="hover:text-[#4fd6a6] transition-colors cursor-pointer">How it works</button></li>
              <li><button onClick={() => scrollToAnchor('#features')} className="hover:text-[#4fd6a6] transition-colors cursor-pointer">Features</button></li>
              <li><button onClick={() => scrollToAnchor('#pricing')} className="hover:text-[#4fd6a6] transition-colors cursor-pointer">Pricing</button></li>
              <li><button onClick={() => scrollToAnchor('#faq')} className="hover:text-[#4fd6a6] transition-colors cursor-pointer">FAQ</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-[14px] uppercase tracking-wider text-white mb-5">Company</h3>
            <ul className="flex flex-col gap-3.5 text-[15px] text-[#8b9ba8] font-medium">
              <li><button onClick={() => setCurrentPage && setCurrentPage('contact')} className="hover:text-[#4fd6a6] transition-colors cursor-pointer">Contact Us</button></li>
              <li><button onClick={() => setCurrentPage && setCurrentPage('privacy')} className="hover:text-[#4fd6a6] transition-colors cursor-pointer">Privacy Policy</button></li>
              <li><button onClick={() => setCurrentPage && setCurrentPage('terms')} className="hover:text-[#4fd6a6] transition-colors cursor-pointer">Terms of Service</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1a3752] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[14px] text-[#5c7385] font-medium">
            © 2026 Authentiq. All Rights Reserved.
          </p>
          <a href="mailto:info@authentiq.com" className="text-[14px] text-[#5c7385] font-medium hover:text-[#4fd6a6] transition-colors cursor-pointer">
            info@authentiq.com
          </a>
        </div>
      </div>
    </footer>
  );
}

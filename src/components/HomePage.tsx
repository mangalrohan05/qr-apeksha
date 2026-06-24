import { useState } from 'react';

interface HomePageProps {
  setCurrentPage: (page: any) => void;
}

export default function HomePage({ setCurrentPage }: HomePageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "How do dynamic QR identifiers differ from regular QR codes?",
      a: "Standard QR codes only route to a static web link. Authentiq generates unique dynamic serialized hash nodes for individual product items. If a single code signature gets copied or scanned abnormally, our filters immediately flags it."
    },
    {
      q: "Can we integrate this into our existing packaging process?",
      a: "Yes. Our product registry system hooks directly into high-throughput warehouse printers and label applicators via standard API structures, adding zero delay to physical line operations."
    },
    {
      q: "What happens when a counterfeit code signature is detected?",
      a: "The system triggers a real-time warning dashboard alert to your team, maps the scanning telemetry coordinates, and presents a 'Suspect Warning' screen to the consumer scanning the product."
    },
    {
      q: "How do we verify the authenticity of each individual item?",
      a: "We assign a unique, tamper-proof dynamic QR code to every single unit, creating a digital twin that verifies the item’s origin and authenticity the moment it is scanned."
    },
    {
      q: "Is special equipment required to scan the Authentiq dynamic QR codes?",
      a: "No. Our system is designed to work with any standard smartphone camera. We prioritize accessibility, ensuring that consumers, logistics personnel, and retailers can verify authenticity without needing proprietary hardware or apps."
    }
  ];

  return (
    <div className="animate-fadeIn space-y-36 pb-32 bg-white text-slate-800">

      {/* HERO SECTION */}
      <div
        data-theme="dark"
        className="w-full flex flex-col justify-center items-center text-center h-screen pt-24 px-4 relative overflow-hidden shadow-2xl bg-[#050b14]"
      >
        <div
          className="absolute inset-0 z-0 bg-cover bg-center scale-[1.03]"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(0, 15, 30, 0.2) 0%, rgba(0, 5, 20, 0.5) 100%), url('/home_bg.png')`
          }}
        />
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col justify-center items-center text-center space-y-8 sm:space-y-10 relative z-10">
          <div className="text-[#ff7b00] text-xs sm:text-sm font-normal tracking-[0.25em] uppercase mx-auto">
            SPECIAL LAUNCH OFFER: SAVE 20% ON ANNUAL PROTECTION
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-light tracking-tight text-white leading-[1.15] max-w-6xl mx-auto">
            Protect Your Brand. <span className="bg-gradient-to-r from-[#00b074] via-[#00e699] to-emerald-300 bg-clip-text text-transparent font-medium">Eliminate Counterfeits Instantly.</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base lg:text-lg font-light tracking-wide max-w-4xl mx-auto leading-relaxed">
            Deploy secure verification tags directly onto your product packaging. Verify authenticity in seconds and track your supply chain with ease.
          </p>
          <div className="pt-4">
            <button
              onClick={() => setCurrentPage('plans')}
              className="px-16 py-4.5 bg-[#00b074] hover:bg-[#009660] text-white font-medium rounded-full transition-all duration-300 shadow-2xl shadow-[#00b074]/30 hover:scale-105 tracking-widest text-xs uppercase cursor-pointer"
            >
              VIEW HOSTING PLANS
            </button>
          </div>
        </div>
      </div>

      <div data-theme="light" className="max-w-7xl mx-auto px-6 space-y-36">

        {/* PILLARS SECTION */}
        <div className="space-y-16">
          <div className="text-center space-y-4" data-aos="fade-down" data-aos-duration="800">
            <h2 className="text-3xl font-light text-[#003057] tracking-tight sm:text-4xl">Complete Supply Integrity</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-normal">Robust security tracking built directly into our secure verification database.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div data-aos="fade-up" data-aos-duration="1000" className="group p-10 bg-slate-50 rounded-3xl shadow-xl space-y-6 border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
              <div className="w-14 h-14 bg-[#00b074]/10 rounded-2xl flex items-center justify-center border border-[#00b074]/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00b074] group-hover:border-[#00b074] group-hover:shadow-[0_8px_16px_rgba(0,176,116,0.25)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-[#00b074] transition-colors duration-300 group-hover:text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#003057] tracking-tight">Enterprise Fraud Mitigation</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-normal">
                Protect your brand with real-time copy detection. Instantly flag duplicate scans to stop counterfeits before they reach your customers.
              </p>
            </div>

            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100" className="group p-10 bg-slate-50 rounded-3xl shadow-xl space-y-6 border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
              <div className="w-14 h-14 bg-[#00b074]/10 rounded-2xl flex items-center justify-center border border-[#00b074]/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00b074] group-hover:border-[#00b074] group-hover:shadow-[0_8px_16px_rgba(0,176,116,0.25)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-[#00b074] transition-colors duration-300 group-hover:text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#003057] tracking-tight">Global Compliance Standards</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-normal">
                Built with secure verification systems to ensure complete safety and privacy across your entire distribution network.
              </p>
            </div>

            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="group p-10 bg-slate-50 rounded-3xl shadow-xl space-y-6 border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
              <div className="w-14 h-14 bg-[#00b074]/10 rounded-2xl flex items-center justify-center border border-[#00b074]/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00b074] group-hover:border-[#00b074] group-hover:shadow-[0_8px_16px_rgba(0,176,116,0.25)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-[#00b074] transition-colors duration-300 group-hover:text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#003057] tracking-tight">Seamless API Infrastructure</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-normal">
                Connect verification checks directly into your sales systems, customer portals, or shipping lines to protect your products effortlessly.
              </p>
            </div>
          </div>
        </div>

        {/* VISION SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-8 overflow-hidden">
          <div className="space-y-6 text-left">
            <h2 data-aos="fade-right" className="text-3xl sm:text-4xl font-light text-[#003057] tracking-tight">
              Complete Supply Chain Visibility
            </h2>
            <p data-aos="fade-right" data-aos-delay="100" className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
              Go beyond simple tracking. Authentiq maps every stage of your product journey, providing end-to-end transparency from the factory floor to the end consumer.
            </p>

            <ul data-aos="fade-right" data-aos-delay="200" className="space-y-4 pt-2 font-normal text-slate-500">
              <li className="flex items-start gap-3">
                <span className="text-[#00b074] text-sm mt-0.5">✓</span>
                <div className="text-sm sm:text-base leading-relaxed font-normal">
                  <span className="text-[#003057] font-normal">End-to-End Tracking:</span> Secure every single product item with a unique digital code.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00b074] text-sm mt-0.5">✓</span>
                <div className="text-sm sm:text-base leading-relaxed font-normal">
                  <span className="text-[#003057] font-normal">Real-Time Geo-Tagging:</span> See exactly where your products are moving globally.
                </div>
              </li>
            </ul>
          </div>

          <div className="animate-slide-in-right">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000"
              alt="Supply Chain Logistics Operations"
              className="w-full h-96 object-cover rounded-2xl shadow-xl transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-light text-[#003057] tracking-tight">Frequently Asked Questions</h2>
            <p className="text-slate-455 text-[11px] sm:text-xs font-normal">Everything you need to understand regarding our tracking integration logs.</p>
          </div>

          <div className="space-y-2.5 text-left">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-50/40 border border-slate-200/70 rounded-lg overflow-hidden hover:bg-slate-50 hover:border-[#00b074]/35 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-3 px-5 text-left flex justify-between items-center bg-transparent transition-colors focus:outline-none cursor-pointer"
                >
                  <h4 className="font-medium text-[#003057] text-xs sm:text-[13px] flex items-center pr-4">
                    <span className="text-[#00b074] font-semibold text-xs sm:text-sm mr-2.5 flex-shrink-0">Q.</span>
                    {faq.q}
                  </h4>
                  <svg
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-350 flex-shrink-0 ${openFaqIndex === idx ? 'transform rotate-180 text-[#00b074]' : ''
                      }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaqIndex === idx ? 'max-h-40' : 'max-h-0'
                    }`}
                >
                  <p className="pl-9 pr-5 pb-3.5 text-slate-500 text-[11px] sm:text-xs leading-relaxed font-normal bg-transparent">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

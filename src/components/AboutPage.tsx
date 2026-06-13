
interface AboutPageProps {
  setCurrentPage: (page: any) => void;
}

export default function AboutPage({ setCurrentPage }: AboutPageProps) {
  return (
    <div className="w-full bg-white text-slate-800 animate-fadeIn font-sans pb-0">
      
      {/* Section 1: Hero Banner (The Story) */}
      <div data-theme="dark" className="w-full h-screen pt-24 flex items-center justify-center relative overflow-hidden bg-[#003057]">
        {/* Dynamic SVG Network Background (Crisp, High-Resolution, Animated) */}
        <div className="absolute inset-0 z-0 opacity-40">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none">
            {/* Grid Pattern */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#ffffff" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Connecting Lines */}
            <path
              d="M 200 450 Q 450 150 700 350"
              stroke="url(#gradient-green)"
              strokeWidth="2"
              strokeDasharray="8 6"
              className="animate-dash"
            />
            <path
              d="M 700 350 Q 850 100 1100 250"
              stroke="#00b074"
              strokeWidth="1.5"
              opacity="0.6"
            />
            <path
              d="M 200 450 Q 600 200 1100 250"
              stroke="url(#gradient-green)"
              strokeWidth="2"
              strokeDasharray="12 8"
              className="animate-dash-reverse"
            />
            <path
              d="M 500 650 Q 600 500 700 350"
              stroke="#00b074"
              strokeWidth="1"
              opacity="0.4"
            />

            {/* Gradients */}
            <defs>
              <linearGradient id="gradient-green" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00b074" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#00b074" stopOpacity="1" />
                <stop offset="100%" stopColor="#00b074" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Hubs */}
            <g className="animate-pulse-slow">
              <circle cx="200" cy="450" r="6" fill="#00b074" />
              <circle cx="200" cy="450" r="15" stroke="#00b074" strokeWidth="1" opacity="0.4" className="animate-ping" style={{ transformOrigin: '200px 450px' }} />
            </g>
            <g>
              <circle cx="700" cy="350" r="6" fill="#00b074" />
              <circle cx="700" cy="350" r="15" stroke="#00b074" strokeWidth="1" opacity="0.4" className="animate-ping" style={{ transformOrigin: '700px 350px' }} />
            </g>
            <g className="animate-pulse-slow">
              <circle cx="1100" cy="250" r="6" fill="#00b074" />
              <circle cx="1100" cy="250" r="15" stroke="#00b074" strokeWidth="1" opacity="0.4" className="animate-ping" style={{ transformOrigin: '1100px 250px' }} />
            </g>
          </svg>
        </div>

        {/* Floating Supply Chain Elements (Plane/Ship/QR nodes) */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-[20%] left-[30%] animate-float-airplane opacity-60">
            <svg className="w-8 h-8 text-[#00b074]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z" />
            </svg>
          </div>
          <div className="absolute bottom-[25%] right-[25%] animate-float-ship opacity-50">
            <svg className="w-8 h-8 text-[#00b074]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.91 0 3.63-.57 5-1.56 1.37.99 3.09 1.56 5 1.56s3.63-.57 5-1.56c1.37.99 3.09 1.56 5 1.56h2v-2h-2zM4 19h16v-5l-2-2h-3V9H9v3H6l-2 2v5z" />
            </svg>
          </div>
          <div className="absolute top-[40%] right-[15%] animate-bounce-slow opacity-40">
            <svg className="w-10 h-10 text-[#00b074]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5zM15 15h.008v.008H15V15zm0 2.25h.008v.008H15v-.008zM17.25 15h.008v.008h-.008V15zM17.25 17.25h.008v.008h-.008v-.008zM15 19.5h.008v.008H15v-.008zm2.25 0h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H19.5V15zm0 2.25h.008v.008H19.5v-.008zm0 2.25h.008v.008H19.5v-.008z" />
            </svg>
          </div>
        </div>

        {/* Text Layer */}
        <div className="max-w-7xl mx-auto px-12 text-center relative z-20 space-y-8 w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.15] max-w-6xl mx-auto drop-shadow-md">
            Securing the Global Supply Chain
          </h1>
          <p className="text-slate-200 text-lg sm:text-xl md:text-2xl font-light max-w-4xl mx-auto leading-relaxed drop-shadow-sm">
            Authentiq is redefining product trust through cryptographic serialized tracking.
          </p>
        </div>
      </div>

      {/* Section 2: Our Mission (Left/Right Split) */}
      <div data-theme="light" className="w-full bg-white py-24">
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <h2 className="text-3xl sm:text-4xl font-light text-[#003057] tracking-tight">
              The Vision
            </h2>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-normal">
              Authentiq was founded with a singular, clear vision: to bridge the gap between physical supply chains and modern digital security. We build factory-grade serialized tracking layers that verify real-world products in milliseconds.
            </p>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-normal">
              Our platform integrates seamlessly with existing manufacturing processes, transforming packaging into dynamic entry points for product authentication, lifecycle tracking, and consumer trust.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-8 py-3 bg-[#00b074] hover:bg-[#009660] text-white font-normal rounded-full transition-all duration-300 shadow-md hover:scale-105 tracking-wider text-sm cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6">
            <div className="w-full h-96 rounded-2xl overflow-hidden shadow-xl cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=1200"
                alt="Secure packaging scanning"
                className="w-full h-full object-cover transition-all duration-500 ease-out hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2.5: Mission Section (Left: 40%, Right: 60%) */}
      <div className="w-full bg-[#0f172a] py-28 border-t border-slate-800/50 relative z-20">
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          {/* Left Column (Mission) - 40% */}
          <div className="lg:col-span-2 space-y-6 text-left" data-aos="fade-right" data-aos-duration="1000">
            <span className="text-[#10b981] text-xs font-bold uppercase tracking-[0.25em] block">
              OUR MISSION
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Verify Instantly. <br />
              <span className="bg-gradient-to-r from-[#10b981] via-[#34d399] to-emerald-300 bg-clip-text text-transparent font-medium animate-text-shine">
                Trust Absolutely.
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Authentiq optimizes global supply chains by maximizing data integrity while eliminating counterfeit friction. By embedding factory-grade cryptographic serial tracking layers directly into the manufacturing pipeline, we give brands the power to verify physical items in real time.
            </p>
          </div>

          {/* Right Column (Principle Box) - 60% */}
          <div className="lg:col-span-3 text-left" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="100">
            <div className="bg-[#1e293b]/25 backdrop-blur-md p-10 rounded-2xl rounded-l-none border border-slate-800/60 border-l-4 border-l-[#10b981] shadow-2xl space-y-6">
              <span className="text-[#10b981] text-xs font-bold uppercase tracking-[0.20em] block">
                Founding Principle
              </span>
              <blockquote className="space-y-4">
                <p className="text-xl sm:text-2xl font-light text-slate-100 italic leading-relaxed">
                  "The greatest vulnerability in global supply chains isn't complexity—it's ambiguity. Authentiq provides definitive proof where there was once only uncertainty."
                </p>
                <footer className="text-slate-400 text-sm font-medium">
                  — The Authentiq Charter
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: The Operational Pillars */}
      <div data-theme="light" className="w-full bg-[#f8fafc] py-24 border-t border-[#e2e8f0] border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-12 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-light text-[#003057] tracking-tight">
              The Operational Pillars
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base font-normal">
              Designed from the ground up to support modern logistics, high-volume transactions, and persistent reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="animate-levitate bg-white/40 backdrop-blur-md px-8 py-5 rounded-xl border border-[#00b074]/35 flex items-center justify-between gap-6 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#00b074]/10 rounded-lg flex items-center justify-center border border-[#00b074]/20 text-[#00b074]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                  </svg>
                </div>
                <span className="text-sm uppercase tracking-wider font-semibold text-[#003057]">Global Reach</span>
              </div>
              <span className="text-2xl md:text-3xl font-bold text-[#00b074] tracking-tight">15+</span>
            </div>

            {/* Pillar 2 */}
            <div className="animate-levitate [animation-delay:0.2s] bg-white/40 backdrop-blur-md px-8 py-5 rounded-xl border border-[#00b074]/35 flex items-center justify-between gap-6 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#00b074]/10 rounded-lg flex items-center justify-center border border-[#00b074]/20 text-[#00b074]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <span className="text-sm uppercase tracking-wider font-semibold text-[#003057]">Ledger Integrity</span>
              </div>
              <span className="text-2xl md:text-3xl font-bold text-[#00b074] tracking-tight">10M+</span>
            </div>

            {/* Pillar 3 */}
            <div className="animate-levitate [animation-delay:0.4s] bg-white/40 backdrop-blur-md px-8 py-5 rounded-xl border border-[#00b074]/35 flex items-center justify-between gap-6 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#00b074]/10 rounded-lg flex items-center justify-center border border-[#00b074]/20 text-[#00b074]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3V7.5a3 3 0 013-3h13.5a3 3 0 013 3v3.75a3 3 0 01-3 3m-13.5 0a3 3 0 00-3 3v3.75a3 3 0 003 3h13.5a3 3 0 003-3v-3.75a3 3 0 00-3-3M6.75 6.75h.008v.008H6.75V6.75zm.008 2.25H6.75v-.008h.008V9zm0 6h-.008v-.008h.008V15zm0 2.25H6.75v-.008h.008V17.25z" />
                  </svg>
                </div>
                <span className="text-sm uppercase tracking-wider font-semibold text-[#003057]">Reliability</span>
              </div>
              <span className="text-2xl md:text-3xl font-bold text-[#00b074] tracking-tight">99.99%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Our Journey Vertical Timeline Section */}
      <div className="w-full bg-[#0f172a] py-28 border-t border-slate-800/50 relative z-20">
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          
          <div className="lg:col-span-2 space-y-6 text-left relative lg:-top-8" data-aos="fade-right" data-aos-duration="1000">
            <span className="text-[#10b981] text-xs font-bold uppercase tracking-[0.25em] block">
              OUR JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              How we got here
            </h2>
          </div>

          <div className="lg:col-span-3 relative" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="100">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-[#10b981]/30" />
            
            <div className="space-y-12">
              <div className="relative">
                <div className="absolute left-1 top-1 w-6 h-6 rounded-full bg-[#0f172a] border-2 border-[#10b981] flex items-center justify-center text-xs font-bold text-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                  1
                </div>
                <div className="pl-12 space-y-2 text-left">
                  <h3 className="text-xl font-bold text-white tracking-tight">Cryptographic Foundation</h3>
                  <p className="text-[#94a3b8] text-sm sm:text-base leading-relaxed font-normal">
                    Built to solve the core problem of product ambiguity, our early work focused on creating an immutable, serial-level cryptographic identity for every item in a supply chain.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-1 top-1 w-6 h-6 rounded-full bg-[#0f172a] border-2 border-[#10b981] flex items-center justify-center text-xs font-bold text-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                  2
                </div>
                <div className="pl-12 space-y-2 text-left">
                  <h3 className="text-xl font-bold text-white tracking-tight">Dynamic Verification</h3>
                  <p className="text-[#94a3b8] text-sm sm:text-base leading-relaxed font-normal">
                    The platform evolved to support real-time telemetry and supply chain synchronization, moving brands from reactive counterfeit detection to data-driven provenance.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-1 top-1 w-6 h-6 rounded-full bg-[#0f172a] border-2 border-[#10b981] flex items-center justify-center text-xs font-bold text-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                  3
                </div>
                <div className="pl-12 space-y-2 text-left">
                  <h3 className="text-xl font-bold text-white tracking-tight">Trust at Scale</h3>
                  <p className="text-[#94a3b8] text-sm sm:text-base leading-relaxed font-normal">
                    Ongoing development emphasizes enterprise-grade governance and forensic-level transparency—trusted by global organizations that require accountable, secure verification infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

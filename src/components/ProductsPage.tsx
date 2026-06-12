
export default function ProductsPage() {
  return (
    <section id="products" className="relative bg-[#090d16] pt-40 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Platform Title */}
        <div className="text-center mb-24 flex flex-col items-center px-4" data-aos="fade-down" data-aos-duration="1000">
          <span className="text-[#10b981] text-xs font-bold uppercase tracking-[0.25em] mb-8">
            SERVICES & CAPABILITIES
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none mb-6">
            Cryptographic <span className="bg-gradient-to-r from-[#10b981] to-emerald-300 bg-clip-text text-transparent font-medium">Authentication Pipeline</span>
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-base sm:text-lg font-normal leading-relaxed">
            Protect brand equity, eliminate counterfeits, and build unbreakable customer trust with our end-to-end verification infrastructure.
          </p>
        </div>

        {/* Card 1: Image Left, Text Right */}
        <div 
          data-aos="fade-up" 
          data-aos-duration="1000" 
          className="sticky top-28 mb-16 bg-[#0f172a]/95 backdrop-blur-md p-10 md:p-12 rounded-[2rem] border border-[#10b981]/20 shadow-2xl flex flex-col lg:flex-row items-center gap-12 z-10 min-h-[480px] lg:min-h-[520px]"
        >
          <div className="w-full lg:w-1/2 bg-[#0b0f19] p-4 rounded-2xl border border-slate-700/50 flex items-center justify-center">
            <div className="w-full aspect-[16/10] bg-[#0c0e17] p-2.5 rounded-[1.5rem] shadow-2xl border-4 border-slate-800/80">
              <img 
                src="/Dashboard.png" 
                alt="Vendor Control Panel Dashboard" 
                className="rounded-xl w-full h-full object-contain transition-transform duration-500 hover:scale-[1.02]" 
              />
            </div>
          </div>
          <div className="flex-1 text-left space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">Centralized Vendor Control Panel</h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-normal">
              Track registered templates, total system scans, and suspicious entries in real time via live WebSockets. The dashboard activity stream features a 60-second sliding-window client IP deduplicator to prevent duplicate event logs.
            </p>
          </div>
        </div>

        {/* Card 2: Image Right, Text Left */}
        <div 
          data-aos="fade-up" 
          data-aos-duration="1000" 
          data-aos-delay="100"
          className="sticky top-32 mb-16 bg-[#0f172a]/95 backdrop-blur-md p-10 md:p-12 rounded-[2rem] border border-[#10b981]/30 shadow-2xl flex flex-col lg:flex-row-reverse items-center gap-12 z-20 min-h-[480px] lg:min-h-[520px]"
        >
          <div className="w-full lg:w-1/2 bg-[#0b0f19] p-4 rounded-2xl border border-slate-700/50 flex items-center justify-center">
            <div className="w-full aspect-[16/10] bg-[#0c0e17] p-2.5 rounded-[1.5rem] shadow-2xl border-4 border-slate-800/80">
              <img 
                src="/custom_qr_modal.png" 
                alt="Product QR Code Generation" 
                className="rounded-xl w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]" 
              />
            </div>
          </div>
          <div className="flex-1 text-left space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">Dynamic Product QR Code Registry</h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-normal">
              Connect registered templates to generate cryptographically secure QR code identifiers. Vendors can copy direct verification links or export high-resolution SVGs for packaging and hangtags.
            </p>
          </div>
        </div>

        {/* Card 3: Image Left, Text Right */}
        <div 
          data-aos="fade-up" 
          data-aos-duration="1000" 
          data-aos-delay="150"
          className="sticky top-36 mb-16 bg-[#0f172a]/95 backdrop-blur-md p-10 md:p-12 rounded-[2rem] border border-[#10b981]/40 shadow-2xl flex flex-col lg:flex-row items-center gap-12 z-30 min-h-[480px] lg:min-h-[520px]"
        >
          <div className="w-full lg:w-1/2 bg-[#0b0f19] p-4 rounded-2xl border border-slate-700/50 flex items-center justify-center">
            <div className="w-full aspect-[16/10] bg-[#0c0e17] p-2.5 rounded-[1.5rem] shadow-2xl border-4 border-slate-800/80">
              <img 
                src="/Image.png" 
                alt="Capture Product Details" 
                className="rounded-xl w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]" 
              />
            </div>
          </div>
          <div className="flex-1 text-left space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">Multi-Angle Image Quality Gate</h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-normal">
              Upload three compulsory views—Front, Back, and Label—and an optional Purchase Receipt. The system utilizes mobile-optimized uploads (`capture="environment"`) to immediately run inputs through brightness, focus, and blur quality gates.
            </p>
          </div>
        </div>

        {/* Card 4: Image Right, Text Left */}
        <div 
          data-aos="fade-up" 
          data-aos-duration="1000" 
          data-aos-delay="200"
          className="sticky top-40 mb-32 bg-[#0f172a]/95 backdrop-blur-md p-10 md:p-12 rounded-[2rem] border border-[#10b981]/50 shadow-2xl flex flex-col lg:flex-row-reverse items-center gap-12 z-40 min-h-[480px] lg:min-h-[520px]"
        >
          <div className="w-full lg:w-1/2 bg-[#0b0f19] p-4 rounded-2xl border border-slate-700/50 flex items-center justify-center">
            <div className="w-full aspect-[16/10] bg-[#0c0e17] p-2.5 rounded-[1.5rem] shadow-2xl border-4 border-slate-800/80">
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <img 
                  src="/Verify-Success.png" 
                  alt="Authentiq Verification UI" 
                  className="w-full h-full object-contain object-center scale-[1.03] transition-transform duration-500 hover:scale-[1.05]" 
                />
              </div>
            </div>
          </div>
          <div className="flex-1 text-left space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">AI-Powered Authenticity Verdict</h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-normal">
              Display ledger-backed authenticity verdicts. The OpenCLIP engine calculates cosine similarity, the pHash duplicate check flags replay attacks, and OCR matches label serials. Verdicts are returned on a themed dial: Green (≥80% Authentic), Yellow (65%-79% Review), or Red (under 65% Counterfeit).
            </p>
          </div>
        </div>

      </div>

      {/* Capabilities Grid Section */}
      <div className="relative z-50 bg-white border-t border-slate-200 py-24" data-aos="fade-up" data-aos-duration="1000">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 flex flex-col items-center px-4">
            <span className="text-[#10b981] text-xs font-bold uppercase tracking-[0.25em] mb-8">
              TECHNICAL CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-6">
              Enterprise Trust Infrastructure
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base font-normal">
              High-performance security modules designed for massive scale serial tracking and sub-millisecond query verification.
            </p>
          </div>

          {/* 3x2 Grid of sharp command-center style cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Immutable Ledger */}
            <div className="bg-[#0b2a40] border border-white/10 p-8 rounded-lg space-y-6 hover:border-[#10b981] hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 group text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded bg-[#10b981]/5 border border-[#10b981]/25 text-[#10b981] group-hover:bg-[#10b981]/10 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Immutable Ledger</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed font-normal">
                Every code generated and scan checked is permanently locked on decentralized blocks, creating an unalterable transaction path.
              </p>
            </div>

            {/* Card 2: Real-Time Telemetry */}
            <div className="bg-[#0b2a40] border border-white/10 p-8 rounded-lg space-y-6 hover:border-[#10b981] hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 group text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded bg-[#10b981]/5 border border-[#10b981]/25 text-[#10b981] group-hover:bg-[#10b981]/10 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h1.5m0 0h11.25A2.25 2.25 0 0118 5.25V14.25m-14.25 0h14.25M6 16.5H4.5M6 16.5h12m0 0h1.5m-1.5 0v3m-3.375-3h.008v.008h-.008V16.5zm0-3h.008v.008h-.008v-.008zm0-3h.008v.008h-.008V10.5zm-3 3h.008v.008h-.008v-.008zm0-3h.008v.008h-.008V10.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Real-Time Telemetry</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed font-normal">
                Instantly map geolocations, IP signatures, and hardware environments on query events, flagging clones within seconds.
              </p>
            </div>

            {/* Card 3: Advanced Cryptography */}
            <div className="bg-[#0b2a40] border border-white/10 p-8 rounded-lg space-y-6 hover:border-[#10b981] hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 group text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded bg-[#10b981]/5 border border-[#10b981]/25 text-[#10b981] group-hover:bg-[#10b981]/10 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Advanced Cryptography</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed font-normal">
                Secured by dynamic serialization algorithms, generating unique cryptographic signature hashes for individual packaging units.
              </p>
            </div>

            {/* Card 4: API & ERP Sync */}
            <div className="bg-[#0b2a40] border border-white/10 p-8 rounded-lg space-y-6 hover:border-[#10b981] hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 group text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded bg-[#10b981]/5 border border-[#10b981]/25 text-[#10b981] group-hover:bg-[#10b981]/10 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L17.5 12M21 7.5H7.5" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">API & ERP Sync</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed font-normal">
                Fully documented REST APIs and secure webhooks connect triggers into SAP, Oracle, and customized inventory warehouses.
              </p>
            </div>

            {/* Card 5: AI Anomaly Detection */}
            <div className="bg-[#0b2a40] border border-white/10 p-8 rounded-lg space-y-6 hover:border-[#10b981] hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 group text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded bg-[#10b981]/5 border border-[#10b981]/25 text-[#10b981] group-hover:bg-[#10b981]/10 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21m0 0l-.813-5.096L9 21zm0 0h1m-1 0H8m6.813-5.096L15 21m0 0l-.813-5.096L15 21zm0 0h1m-1 0h-1m-7-5a7 7 0 1114 0c0 1.617-.553 3.096-1.47 4.274l-.441.564A1.996 1.996 0 0015 18H9a1.996 1.996 0 00-1.09-.262l-.441-.564A6.977 6.977 0 017 11z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">AI Anomaly Detection</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed font-normal">
                Our lightweight ML engine dynamically parses scan behaviors, immediately identifying abnormal high-frequency replay attack patterns.
              </p>
            </div>

            {/* Card 6: Global Access Registry */}
            <div className="bg-[#0b2a40] border border-white/10 p-8 rounded-lg space-y-6 hover:border-[#10b981] hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 group text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded bg-[#10b981]/5 border border-[#10b981]/25 text-[#10b981] group-hover:bg-[#10b981]/10 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Global Access Registry</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed font-normal">
                Redundant global registries ensure your consumers can check item authenticity anywhere in the world with 99.99% uptime.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

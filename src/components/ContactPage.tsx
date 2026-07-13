
export default function ContactPage() {
  return (
    <div data-theme="dark" className="w-full min-h-screen bg-gradient-to-br from-[#0b1d2e] via-[#0F2A43] to-[#0b2236]">
      {/* Hero Header */}
      <div className="relative overflow-hidden pt-32 pb-20 px-6">
        {/* Background glow */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-[#16B981] blur-[140px]" />
          <div className="absolute bottom-[-60px] right-[-80px] w-[380px] h-[380px] rounded-full bg-[#0E7C7B] blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#16B981]/15 border border-[#16B981]/30 text-[#4fd6a6] font-bold text-[13px] tracking-wide px-4 py-2 rounded-full mb-6">
            <span className="w-[6px] h-[6px] rounded-full bg-[#16B981] inline-block animate-pulse" />
            We'd love to hear from you
          </div>
          <h1 className="text-[40px] sm:text-[52px] md:text-[58px] leading-[1.06] font-extrabold tracking-tight text-white font-display">
            Get in <span className="text-[#16B981]">Touch</span>
          </h1>
          <p className="text-[18px] sm:text-[19px] leading-[1.6] text-[#8fb0c9] mt-5 max-w-[540px] mx-auto font-medium">
            Ready to protect your brand? Our team is here to design the perfect solution for you.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Column: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Info Cards */}
            {[
              {
                label: 'Email Us',
                value: 'support@authentiq.io',
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5A2.25 2.25 0 0 1 2.25 17.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                ),
              },
              {
                label: 'Call Us',
                value: '+91 XXXXX XXXXX',
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.118-6.944-6.94l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                ),
              },
              {
                label: 'Headquarters',
                value: 'Authentiq Operations, Jaipur',
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-[18px] p-5 hover:bg-white/10 transition-colors duration-300">
                <div className="w-11 h-11 rounded-[12px] bg-[#16B981]/15 border border-[#16B981]/25 flex items-center justify-center text-[#4fd6a6] flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[11px] text-[#4fd6a6] font-bold uppercase tracking-[0.1em] mb-1">{item.label}</p>
                  <p className="text-white text-[15px] font-medium">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Decorative Quote */}
            <div className="mt-4 bg-gradient-to-br from-[#16B981]/10 to-[#0E7C7B]/10 border border-[#16B981]/20 rounded-[18px] p-6">
              <p className="text-[15px] leading-[1.7] text-[#8fb0c9] font-medium italic">
                "Every product deserves a trusted identity. Let's build that for your brand."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#16B981]/20 flex items-center justify-center">
                  <img src="/authentiq_logo.png" alt="Authentiq" className="w-5 h-5 object-contain brightness-0 invert" />
                </div>
                <span className="text-[13px] font-bold text-[#4fd6a6]">Authentiq Team</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-[24px] p-8 sm:p-10 shadow-[0_40px_80px_rgba(0,0,0,0.35)]">
              <h2 className="font-display font-bold text-[22px] text-white mb-1">Send us a message</h2>
              <p className="text-[14px] text-[#7a9bb0] mb-8 font-medium">We'll get back to you within 24 hours.</p>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#4fd6a6]">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/15 rounded-[12px] px-4 py-3.5 text-[14px] text-white placeholder-[#5c7a8c] focus:outline-none focus:border-[#16B981] focus:bg-white/8 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#4fd6a6]">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@domain.com"
                      className="w-full bg-white/5 border border-white/15 rounded-[12px] px-4 py-3.5 text-[14px] text-white placeholder-[#5c7a8c] focus:outline-none focus:border-[#16B981] focus:bg-white/8 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#4fd6a6]">Company / Brand</label>
                  <input
                    type="text"
                    placeholder="Your company name"
                    className="w-full bg-white/5 border border-white/15 rounded-[12px] px-4 py-3.5 text-[14px] text-white placeholder-[#5c7a8c] focus:outline-none focus:border-[#16B981] focus:bg-white/8 transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#4fd6a6]">Project Type</label>
                  <input
                    type="text"
                    placeholder="Supply Chain Protection / Serialized QR / Enterprise"
                    className="w-full bg-white/5 border border-white/15 rounded-[12px] px-4 py-3.5 text-[14px] text-white placeholder-[#5c7a8c] focus:outline-none focus:border-[#16B981] focus:bg-white/8 transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#4fd6a6]">Inquiry Details</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your tracking volume and requirements..."
                    className="w-full bg-white/5 border border-white/15 rounded-[12px] px-4 py-3.5 text-[14px] text-white placeholder-[#5c7a8c] focus:outline-none focus:border-[#16B981] focus:bg-white/8 transition-all font-medium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#16B981] text-white font-bold text-[15px] rounded-[14px] hover:bg-[#13a371] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-[0_10px_30px_rgba(22,185,129,0.35)] tracking-wide"
                >
                  Send Message →
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

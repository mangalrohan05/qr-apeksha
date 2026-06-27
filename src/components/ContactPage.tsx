
export default function ContactPage() {
  return (
    <div data-theme="light" className="w-full min-h-screen bg-slate-50 pt-40 pb-16 md:pb-20 px-6 sm:px-12 animate-fadeIn">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">

        {/* Left Column: Get in touch & Info details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-light text-[#003057] tracking-tight">
              Get in Touch
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
              Ready to secure your supply chain? Our authentication experts are here to design the perfect tracking solution for your brand.
            </p>
          </div>

          {/* Minimalist Info Rows with Brand Green Icons */}
          <div className="space-y-6 pt-4 font-sans font-normal">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-[#00b074]/30 bg-[#00b074]/5 flex items-center justify-center text-[#00b074] flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5A2.25 2.25 0 0 1 2.25 17.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-normal uppercase tracking-wider">Email Us</p>
                <p className="text-[#003057] text-sm sm:text-base font-normal">support@authentiq.io</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-[#00b074]/30 bg-[#00b074]/5 flex items-center justify-center text-[#00b074] flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.118-6.944-6.94l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-normal uppercase tracking-wider">Call Us</p>
                <p className="text-[#003057] text-sm sm:text-base font-normal">+91 XXXXX XXXXX</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-[#00b074]/30 bg-[#00b074]/5 flex items-center justify-center text-[#00b074] flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-normal uppercase tracking-wider">Global Headquarters</p>
                <p className="text-[#003057] text-sm sm:text-base font-normal">Authentiq Operations, Jaipur</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Clean White Card with Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl shadow-xl p-8 space-y-6">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5 font-normal">
            <div className="space-y-1.5">
              <label className="block text-xs font-normal uppercase tracking-wider text-slate-500">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 font-normal transition-colors placeholder-slate-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-normal uppercase tracking-wider text-slate-500">Email Address</label>
              <input
                type="email"
                placeholder="you@domain.com"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 font-normal transition-colors placeholder-slate-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-normal uppercase tracking-wider text-slate-500">Project Type</label>
              <input
                type="text"
                placeholder="Supply Chain Protection / Serialized QR"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 font-normal transition-colors placeholder-slate-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-normal uppercase tracking-wider text-slate-500">Inquiry Details</label>
              <textarea
                rows={4}
                placeholder="Describe your tracking volume and logistics requirements..."
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 font-normal transition-colors placeholder-slate-400 resize-none"
              />
            </div>

            <button className="w-full py-4 bg-[#00b074] text-white font-normal rounded-full hover:bg-[#009660] transition-colors cursor-pointer text-xs uppercase tracking-widest shadow-md">
              Submit Inquiry
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

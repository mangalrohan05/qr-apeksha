interface HeroSectionProps {
  onViewPlansClick: () => void;
}

export default function HeroSection({ onViewPlansClick }: HeroSectionProps) {
  return (
    <div
      data-theme="dark"
      className="w-full flex flex-col justify-center items-center text-center h-screen pt-24 px-4 relative overflow-hidden shadow-2xl bg-[#050b14]"
    >
      {/* Background Layer (Scaled slightly to crop out any baked-in image borders/corners) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center scale-[1.03]"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 15, 30, 0.2) 0%, rgba(0, 5, 20, 0.5) 100%), url('/saas_royal_bg.png')`
        }}
      />
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col justify-center items-center text-center space-y-8 sm:space-y-10 relative z-10">

        {/* Launch Tag: Orange all-caps flat text */}
        <div className="text-[#ff7b00] text-xs sm:text-sm font-normal tracking-[0.25em] uppercase mx-auto">
          SPECIAL LAUNCH OFFER: SAVE 20% ON ANNUAL PROTECTION
        </div>

        {/* Headline: Large text wrapping naturally */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-light tracking-tight text-white leading-[1.15] max-w-6xl mx-auto">
          Protect Your Brand. <span className="bg-gradient-to-r from-[#00b074] via-[#00e699] to-emerald-300 bg-clip-text text-transparent font-medium">Eliminate Counterfeits Instantly.</span>
        </h1>

        {/* Subtext: Wider horizontally, wrapping naturally */}
        <p className="text-slate-300 text-xs sm:text-sm md:text-base lg:text-lg font-light tracking-wide max-w-4xl mx-auto leading-relaxed">
          Deploy dynamic cryptographic serialized tracking layers directly onto your physical packaging lines. Verify authenticity in milliseconds and claim your supply chain metrics.
        </p>

        {/* Call to Action Button */}
        <div className="pt-4">
          <button
            onClick={onViewPlansClick}
            className="px-16 py-4.5 bg-[#00b074] hover:bg-[#009660] text-white font-medium rounded-full transition-all duration-300 shadow-2xl shadow-[#00b074]/30 hover:scale-105 tracking-widest text-xs uppercase cursor-pointer"
          >
            VIEW HOSTING PLANS
          </button>
        </div>
      </div>
    </div>
  );
}

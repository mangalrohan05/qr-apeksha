export default function VisionSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-8 overflow-hidden">
      {/* Left Column (Text & Bullets) */}
      <div className="space-y-6 text-left">
        <h2 data-aos="fade-right" className="text-3xl sm:text-4xl font-light text-[#003057] tracking-tight">
          Unrivaled Supply Chain Visibility
        </h2>
        <p data-aos="fade-right" data-aos-delay="100" className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
          Go beyond simple tracking. Authentiq maps every stage of your product journey, providing end-to-end transparency from the factory floor to the end consumer.
        </p>

        {/* Bullet Points */}
        <ul data-aos="fade-right" data-aos-delay="200" className="space-y-4 pt-2 font-normal text-slate-500">
          <li className="flex items-start gap-3">
            <span className="text-[#00b074] text-sm mt-0.5">✓</span>
            <div className="text-sm sm:text-base leading-relaxed font-normal">
              <span className="text-[#003057] font-normal">End-to-End Serialization:</span> Secure every unit with a unique cryptographic signature.
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

      {/* Right Column (Image) */}
      <div className="animate-slide-in-right">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000"
          alt="Supply Chain Logistics Operations"
          className="w-full h-96 object-cover rounded-2xl shadow-xl transition-transform duration-500 hover:scale-[1.02]"
        />
      </div>
    </div>
  );
}

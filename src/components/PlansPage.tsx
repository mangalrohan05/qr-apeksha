
import { useState, useRef, useEffect } from 'react';

interface PlansPageProps {
  handleSelectPlan: (planType: 'free' | 'business' | 'pro' | 'enterprise') => void;
  isAnnual: boolean;
  isFreeTrialDrawerOpen: boolean;
  setIsFreeTrialDrawerOpen: (open: boolean) => void;
  setCurrentPage: (page: any) => void;
}

export default function PlansPage({
  handleSelectPlan,
  isAnnual,
  isFreeTrialDrawerOpen,
  setIsFreeTrialDrawerOpen,
  setCurrentPage,
}: PlansPageProps) {
  // Business plan calculations
  const businessBaseCost = isAnnual ? 55000 : 5000;

  // Business Pro calculations
  const proBaseCost = isAnnual ? 245000 : 22500;

  // --- Carousel State ---
  const [activeCard, setActiveCard] = useState(1); // 0=Business, 1=Pro (center/default), 2=Enterprise
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  // --- Comparison Table State ---
  const [compareCol, setCompareCol] = useState(2); // 0=Free, 1=Business, 2=Pro(default), 3=Enterprise

  // Sync carousel scroll position → activeCard
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const handleScroll = () => {
      if (isScrolling.current) return;
      const { scrollLeft, offsetWidth } = el;
      const cardWidth = offsetWidth * 0.72 + 16; // 72vw + gap
      const idx = Math.round(scrollLeft / cardWidth);
      setActiveCard(Math.min(2, Math.max(0, idx)));
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll carousel to a specific card index
  const scrollToCard = (idx: number) => {
    const el = carouselRef.current;
    if (!el) return;
    isScrolling.current = true;
    const cardWidth = el.offsetWidth * 0.72 + 16;
    el.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
    setActiveCard(idx);
    setTimeout(() => { isScrolling.current = false; }, 500);
  };

  // On mount: scroll pro (index 1) into center view
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    // Only auto-center on mobile (scroll container is active)
    if (window.innerWidth < 768) {
      requestAnimationFrame(() => {
        const cardWidth = el.offsetWidth * 0.72 + 16;
        el.scrollLeft = 1 * cardWidth;
      });
    }
  }, []);

  return (
    <div data-theme="light" className="animate-fadeIn pt-24 pb-0 bg-slate-50 text-slate-800 relative overflow-x-hidden">
      {/* Header Area */}
      <div className="max-w-7xl mx-auto px-6 pt-12 text-center space-y-4">
        <h2 className="text-4xl sm:text-5xl font-light text-[#003057] tracking-tight">
          Predictable, Secure Verification Plans
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-normal">
          Secure your supply chain with end-to-end serialized tracking. Pick the tier that best fits your distribution volume.
        </p>

        {/* Billed Annually Indicator */}
        <div className="pt-4 flex items-center justify-center">
          <span className="text-xs font-bold px-4 py-1.5 bg-white text-black rounded-lg border border-slate-200 tracking-wider uppercase">
            Billed Annually (10% Discount Applied)
          </span>
        </div>

        {/* Free Trial Banner */}
        <div className="pt-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl px-5 py-3.5">
            <div className="flex items-center gap-3 text-left">
              <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md whitespace-nowrap">Free</span>
              <p className="text-sm text-slate-700 font-normal">
                Try free for 14 days — <span className="text-slate-500">250 scans, no credit card needed.</span>
              </p>
            </div>
            <button
              onClick={() => setIsFreeTrialDrawerOpen(true)}
              className="flex-shrink-0 text-xs font-semibold text-white bg-[#003057] hover:bg-[#004a87] px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Start Trial
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================
          PLAN CARDS — Desktop: 3-col grid | Mobile: swipe carousel
      ================================================================ */}
      <div className="max-w-7xl mx-auto px-6 pt-16">

        {/* ---- DESKTOP: 3-column grid (unchanged) ---- */}
        <div className="hidden md:grid grid-cols-3 gap-8 items-stretch w-full">

          {/* 1. Business Card */}
          <div className="flex flex-col justify-between p-8 bg-white border border-[#00b074]/30 hover:border-[#00b074]/60 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#00b074] bg-[#00b074]/10 px-3 py-1 rounded-md border border-[#00b074]/20">
                  For Growing Brands
                </span>
                <h3 className="text-2xl font-light text-[#003057] mt-4">Business</h3>
                <p className="text-xs text-slate-500 mt-2 min-h-8 font-normal leading-relaxed">
                  Scale production protection with dedicated location metrics.
                </p>
              </div>

              <div className="text-[#003057]">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-slate-400 text-sm line-through font-normal">
                    ₹{isAnnual ? '60,000' : '5,500'}
                  </span>
                  <span className="text-base font-bold">₹</span>
                  <span className="text-4xl font-extrabold tracking-tight">
                    {businessBaseCost.toLocaleString('en-IN')}
                  </span>
                  <span className="text-slate-400 text-xs ml-1">
                    /{isAnnual ? 'yr' : 'mo'}
                  </span>
                </div>
                <p className="text-[10px] text-[#00b074] font-normal mt-1">+18% GST (regulatory charge)</p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="space-y-0.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Team Members (add-ons)</label>
                  <span className="text-xs font-bold text-[#003057] font-sans">5 users</span>
                </div>
                <div className="space-y-0.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">SKUs Count Limits (add-ons)</label>
                  <span className="text-xs font-bold text-[#003057] font-sans">25 SKUs</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleSelectPlan('business')}
              className="mt-8 w-full py-4 bg-[#00b074] hover:bg-[#009660] text-white font-semibold rounded-2xl transition-all duration-200 text-xs tracking-wider uppercase shadow-md cursor-pointer"
            >
              Select Business
            </button>
          </div>

          {/* 2. Business Pro (Popular) */}
          <div className="flex flex-col justify-between p-8 bg-[#0a0f1d] text-white border-2 border-[#00b074] rounded-3xl shadow-xl scale-[1.02] relative z-10 transition-all duration-300 hover:scale-[1.04]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00b074] text-white px-4 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase shadow-md border border-[#00b074]/30">
              Most Popular
            </div>
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#00b074] bg-[#00b074]/15 px-3 py-1 rounded-md border border-[#00b074]/20">
                  Full Supply Protection
                </span>
                <h3 className="text-2xl font-light text-white mt-4">Business Pro</h3>
                <p className="text-xs text-slate-400 mt-2 min-h-8 font-normal leading-relaxed">
                  Enterprise tracking, advanced heatmaps, and webhook integrations.
                </p>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-slate-500 text-sm line-through font-normal">
                    ₹{isAnnual ? '2,75,000' : '25,000'}
                  </span>
                  <span className="text-base font-bold">₹</span>
                  <span className="text-4xl font-extrabold tracking-tight text-white">
                    {proBaseCost.toLocaleString('en-IN')}
                  </span>
                  <span className="text-slate-400 text-xs ml-1">/{isAnnual ? 'yr' : 'mo'}</span>
                </div>
                <p className="text-[10px] text-[#00b074] font-normal mt-1">+18% GST (regulatory charge)</p>
              </div>
              <div className="space-y-3 pt-2">
                <div className="space-y-0.5">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Team Members (add-ons)</label>
                  <span className="text-xs font-bold text-white font-sans">50 users</span>
                </div>
                <div className="space-y-0.5">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">SKUs Count Limits (add-ons)</label>
                  <span className="text-xs font-bold text-white font-sans">500 SKUs</span>
                </div>
                <div className="space-y-0.5">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Brands Registry (add-ons)</label>
                  <span className="text-xs font-bold text-white font-sans">5 brands</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleSelectPlan('pro')}
              className="mt-8 w-full py-4 bg-[#00b074] hover:bg-[#009660] text-white font-semibold rounded-2xl transition-all duration-200 text-xs tracking-wider uppercase shadow-lg shadow-[#00b074]/20 cursor-pointer border-none"
            >
              Select Business Pro
            </button>
          </div>

          {/* 3. Enterprise Card */}
          <div className="flex flex-col justify-between p-8 bg-white border border-[#00b074]/30 hover:border-[#00b074]/60 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                  Tailored SLA
                </span>
                <h3 className="text-2xl font-light text-[#003057] mt-4">Enterprise</h3>
                <p className="text-xs text-slate-550 mt-2 min-h-8 font-normal leading-relaxed">
                  High volume operations requiring custom pipelines & SSO.
                </p>
              </div>
              <div className="flex items-baseline gap-1 text-[#003057]">
                <span className="text-3xl font-extrabold tracking-tight">Custom</span>
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between opacity-75">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Users limit</span>
                  <span className="text-xs font-bold text-[#00b074] font-sans">Unlimited</span>
                </div>
                <div className="flex items-center justify-between opacity-75">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">SKUs limit</span>
                  <span className="text-xs font-bold text-[#00b074] font-sans">Unlimited</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setCurrentPage('contact')}
              className="mt-8 w-full py-4 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-2xl transition-all duration-200 text-xs tracking-wider uppercase cursor-pointer"
            >
              Contact Sales
            </button>
          </div>
        </div>

        {/* ---- MOBILE: Swipe Carousel ---- */}
        <div className="md:hidden relative px-2">
          {/* Side navigation click buttons (looping/circular drawer style) */}
          <button
            onClick={() => scrollToCard(activeCard === 0 ? 2 : activeCard - 1)}
            className="absolute left-4 top-[45%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur border border-slate-200 shadow-md flex items-center justify-center text-slate-700 active:scale-95 transition-all cursor-pointer"
            aria-label="Previous Plan"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button
            onClick={() => scrollToCard(activeCard === 2 ? 0 : activeCard + 1)}
            className="absolute right-4 top-[45%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur border border-slate-200 shadow-md flex items-center justify-center text-slate-700 active:scale-95 transition-all cursor-pointer"
            aria-label="Next Plan"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Scroll container — pt-6 leaves room for Most Popular badge */}
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-scroll pt-6 pb-4 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {/* Spacer so first card doesn't flush to edge */}
            <div className="flex-shrink-0 w-[10vw]" />

            {/* Card 0 — Business */}
            <div
              className="flex-shrink-0 snap-center transition-all duration-300"
              style={{
                width: '72vw',
                opacity: activeCard === 0 ? 1 : 0.45,
                filter: activeCard === 0 ? 'none' : 'blur(2px)',
                transform: activeCard === 0 ? 'scale(1)' : 'scale(0.96)',
              }}
            >
              <div className="flex flex-col justify-between p-7 bg-white border border-[#00b074]/40 rounded-3xl shadow-sm h-full">
                <div className="space-y-5">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#00b074] bg-[#00b074]/10 px-3 py-1 rounded-md border border-[#00b074]/20">
                      For Growing Brands
                    </span>
                    <h3 className="text-2xl font-light text-[#003057] mt-4">Business</h3>
                    <p className="text-xs text-slate-500 mt-2 font-normal leading-relaxed">
                      Scale production protection with dedicated location metrics.
                    </p>
                  </div>
                  <div className="text-[#003057] text-left">
                    <div className="text-[11px] text-slate-400 line-through font-normal leading-none mb-1">
                      ₹{isAnnual ? '60,000' : '5,500'}
                    </div>
                    <div className="flex items-baseline gap-0.5 whitespace-nowrap">
                      <span className="text-base font-bold">₹</span>
                      <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">{businessBaseCost.toLocaleString('en-IN')}</span>
                      <span className="text-slate-400 text-xs ml-0.5">/{isAnnual ? 'yr' : 'mo'}</span>
                    </div>
                    <p className="text-[10px] text-[#00b074] font-normal mt-1">+18% GST (regulatory charge)</p>
                  </div>
                  <div className="space-y-3 pt-1">
                    <div className="space-y-0.5">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Team Members</label>
                      <span className="text-xs font-bold text-[#003057]">5 users</span>
                    </div>
                    <div className="space-y-0.5">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">SKUs Count</label>
                      <span className="text-xs font-bold text-[#003057]">25 SKUs</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleSelectPlan('business')}
                  className="mt-7 w-full py-4 bg-[#00b074] hover:bg-[#009660] text-white font-semibold rounded-2xl transition-all duration-200 text-xs tracking-wider uppercase shadow-md cursor-pointer"
                >
                  Select Business
                </button>
              </div>
            </div>

            {/* Card 1 — Business Pro (center/popular) */}
            <div
              className="flex-shrink-0 snap-center transition-all duration-300 flex flex-col"
              style={{
                width: '72vw',
                opacity: activeCard === 1 ? 1 : 0.45,
                filter: activeCard === 1 ? 'none' : 'blur(2px)',
                transform: activeCard === 1 ? 'scale(1)' : 'scale(0.96)',
              }}
            >
              {/* Most Popular badge — inline above the card, no absolute positioning.
                  This is the ONLY reliable way to show it inside an overflow:scroll container. */}
              <div className="flex justify-center mb-0">
                <span className="bg-[#00b074] text-white px-4 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase shadow-md whitespace-nowrap">
                  ★ Most Popular
                </span>
              </div>

              <div className="flex flex-col justify-between p-7 pt-5 bg-[#0a0f1d] text-white border-2 border-[#00b074] rounded-3xl shadow-xl flex-1 -mt-2">
                <div className="space-y-5">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#00b074] bg-[#00b074]/15 px-3 py-1 rounded-md border border-[#00b074]/20">
                      Full Supply Protection
                    </span>
                    <h3 className="text-2xl font-light text-white mt-4">Business Pro</h3>
                    <p className="text-xs text-slate-400 mt-2 font-normal leading-relaxed">
                      Enterprise tracking, advanced heatmaps, and webhook integrations.
                    </p>
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] text-slate-555 line-through font-normal leading-none mb-1">
                      ₹{isAnnual ? '2,75,000' : '25,000'}
                    </div>
                    <div className="flex items-baseline gap-0.5 text-white whitespace-nowrap">
                      <span className="text-base font-bold">₹</span>
                      <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">{proBaseCost.toLocaleString('en-IN')}</span>
                      <span className="text-slate-400 text-xs ml-0.5">/{isAnnual ? 'yr' : 'mo'}</span>
                    </div>
                    <p className="text-[10px] text-[#00b074] font-normal mt-1">+18% GST (regulatory charge)</p>
                  </div>
                  <div className="space-y-3 pt-1">
                    <div className="space-y-0.5">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Team Members</label>
                      <span className="text-xs font-bold text-white">50 users</span>
                    </div>
                    <div className="space-y-0.5">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">SKUs Count</label>
                      <span className="text-xs font-bold text-white">500 SKUs</span>
                    </div>
                    <div className="space-y-0.5">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Brands Registry</label>
                      <span className="text-xs font-bold text-white">5 brands</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleSelectPlan('pro')}
                  className="mt-7 w-full py-4 bg-[#00b074] hover:bg-[#009660] text-white font-semibold rounded-2xl transition-all duration-200 text-xs tracking-wider uppercase shadow-lg shadow-[#00b074]/20 cursor-pointer border-none"
                >
                  Select Business Pro
                </button>
              </div>
            </div>

            {/* Card 2 — Enterprise */}
            <div
              className="flex-shrink-0 snap-center transition-all duration-300"
              style={{
                width: '72vw',
                opacity: activeCard === 2 ? 1 : 0.45,
                filter: activeCard === 2 ? 'none' : 'blur(2px)',
                transform: activeCard === 2 ? 'scale(1)' : 'scale(0.96)',
              }}
            >
              <div className="flex flex-col justify-between p-7 bg-white border border-[#00b074]/40 rounded-3xl shadow-sm h-full">
                <div className="space-y-5">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                      Tailored SLA
                    </span>
                    <h3 className="text-2xl font-light text-[#003057] mt-4">Enterprise</h3>
                    <p className="text-xs text-slate-500 mt-2 font-normal leading-relaxed">
                      High volume operations requiring custom pipelines & SSO.
                    </p>
                  </div>
                  <div className="flex items-baseline gap-1 text-[#003057]">
                    <span className="text-3xl font-extrabold tracking-tight">Custom</span>
                  </div>
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between opacity-75">
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Users limit</span>
                      <span className="text-xs font-bold text-[#00b074]">Unlimited</span>
                    </div>
                    <div className="flex items-center justify-between opacity-75">
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">SKUs limit</span>
                      <span className="text-xs font-bold text-[#00b074]">Unlimited</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="mt-7 w-full py-4 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-2xl transition-all duration-200 text-xs tracking-wider uppercase cursor-pointer"
                >
                  Contact Sales
                </button>
              </div>
            </div>

            {/* Trailing spacer */}
            <div className="flex-shrink-0 w-[10vw]" />
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2.5 mt-4">
            {['Business', 'Business Pro', 'Enterprise'].map((label, idx) => (
              <button
                key={label}
                onClick={() => scrollToCard(idx)}
                aria-label={`View ${label}`}
                className="transition-all duration-300 rounded-full cursor-pointer border-none"
                style={{
                  width: activeCard === idx ? '24px' : '8px',
                  height: '8px',
                  background: activeCard === idx ? '#00b074' : '#cbd5e1',
                }}
              />
            ))}`
          </div>

          {/* Swipe hint (only shown on first load — fades after 2s via CSS) */}
          <p className="text-center text-[10px] text-slate-400 mt-3 font-normal tracking-wide animate-pulse">
            ← Swipe to explore plans →
          </p>
        </div>
      </div>

      {/* ================================================================
          FEATURES COMPARISON SECTION
      ================================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-8">
        <div className="text-center space-y-4 mb-12">
          <h3 className="text-4xl sm:text-5xl font-light text-[#003057] tracking-tight mt-2">
            Everything compared, clearly
          </h3>
          <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">
            Know exactly what you're getting before you commit. Every feature, every plan.
          </p>
        </div>

        {/* ---- DESKTOP: Full 5-col table (unchanged) ---- */}
        <div className="hidden md:block">
          {/* Plan header pills */}
          <div className="grid grid-cols-5 gap-4 mb-6 px-2">
            <div />
            {[['Free Trial', false], ['Business', false], ['Business Pro', true], ['Enterprise', false]].map(([name, hot]) => (
              <div key={String(name)} className={`rounded-2xl py-4 px-3 text-center text-xs sm:text-sm font-bold uppercase tracking-widest flex flex-col justify-center items-center ${hot ? 'bg-[#00b074] text-white shadow-lg shadow-[#00b074]/25' : 'bg-slate-100 text-slate-500'}`}>
                {hot && <span className="block text-[9px] font-normal tracking-wider opacity-90 mb-1">★ Most Popular</span>}
                {String(name)}
              </div>
            ))}
          </div>

          {/* Comparison groups — desktop */}
          {[
            {
              category: '💰 Pricing & Terms',
              rows: [
                { feature: 'Annual base cost (excl. GST)', vals: ['₹0', '₹55,000', '₹2,45,000', 'Contact Sales'] },
                { feature: 'Monthly option', vals: ['—', 'N/A', 'N/A', 'Custom'] },
                { feature: 'Billing commitment', vals: ['14-day trial', '1 year', '1 year', 'Custom'] },
              ]
            },
            {
              category: '📦 Capacity Limits',
              rows: [
                { feature: 'Brand Registries included', vals: ['1 brand', '1 brand', '5 brands (+)', 'Unlimited'] },
                { feature: 'SKU Count capacity', vals: ['1 SKU', '25 SKUs (+)', '500 SKUs (+)', 'Unlimited'] },
                { feature: 'Team user seats', vals: ['1 user', '5 users (+)', '50 users (+)', 'Unlimited'] },
                { feature: 'Product verifications (Annual)', vals: ['250 scans', '100,000 scans', 'Unlimited', 'Unlimited'] },
              ]
            },
            {
              category: '⚙️ Feature Modules',
              rows: [
                { feature: 'Unique Authentiq QR Generator', vals: [true, true, true, true] },
                { feature: 'AI authenticity scoring (OpenCLIP)', vals: [true, true, true, true] },
                { feature: 'Mobile scan & verify page UI', vals: [true, true, true, true] },
                { feature: 'Report counterfeit & brand callback', vals: [true, true, true, true] },
                { feature: 'Location intelligence & geocodes', vals: [false, 'Region-level', 'Full heatmaps', 'Full logistics'] },
                { feature: 'CSV / Excel import & export', vals: [false, true, true, true] },
                { feature: 'Bulk serialization QR engine', vals: [false, false, true, true] },
                { feature: 'Advanced security telemetry', vals: [false, false, true, true] },
                { feature: 'Case & report registry', vals: ['Basic', true, true, true] },
                { feature: 'Integrations API & Webhooks', vals: [false, false, true, true] },
                { feature: 'SSO & Custom User Roles', vals: [false, false, false, true] },
              ]
            },
            {
              category: '🛎️ Support & Onboarding',
              rows: [
                { feature: 'Customer Support channel', vals: [false, 'Standard Email', 'Priority support', 'Dedicated CSM + SLA'] },
                { feature: 'Credit card required to start', vals: ['No', '—', '—', '—'] },
              ]
            },
          ].map((group) => (
            <div key={group.category} className="mb-8 bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-md">
              <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200/60">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#003057]">{group.category}</span>
              </div>
              {group.rows.map((row, ri) => (
                <div key={ri} className={`grid grid-cols-5 gap-0 ${ri < group.rows.length - 1 ? 'border-b border-slate-100' : ''} hover:bg-slate-50/60 transition-colors`}>
                  <div className="px-6 py-5 text-sm font-medium text-slate-700 flex items-center">{row.feature}</div>
                  {row.vals.map((val, vi) => {
                    const isProCol = vi === 2;
                    const cellBase = `px-4 py-5 text-center text-sm flex items-center justify-center ${isProCol ? 'bg-[#00b074]/5 border-x border-[#00b074]/10' : ''}`;
                    if (val === true) return (
                      <div key={vi} className={cellBase}>
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200">
                          <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </span>
                      </div>
                    );
                    if (val === false) return (
                      <div key={vi} className={cellBase}>
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 border border-slate-200">
                          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </span>
                      </div>
                    );
                    return (
                      <div key={vi} className={`${cellBase} ${isProCol ? 'font-semibold text-[#009660]' : 'text-slate-600'}`}>{String(val)}</div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ---- MOBILE: Plan selector tabs + 2-column feature list ---- */}
        <div className="md:hidden">
          {/* Plan selector tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 mb-6" style={{ scrollbarWidth: 'none' }}>
            {[
              { label: 'Free Trial', idx: 0 },
              { label: 'Business', idx: 1 },
              { label: 'Pro', idx: 2, hot: true },
              { label: 'Enterprise', idx: 3 },
            ].map(({ label, idx, hot }) => (
              <button
                key={label}
                onClick={() => setCompareCol(idx)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border-none ${compareCol === idx
                  ? hot
                    ? 'bg-[#00b074] text-white shadow-md shadow-[#00b074]/25'
                    : 'bg-[#003057] text-white shadow-md'
                  : 'bg-slate-100 text-slate-500'
                  }`}
              >
                {hot && compareCol === idx && <span className="mr-1">★</span>}
                {label}
              </button>
            ))}
          </div>

          {/* Feature groups for selected plan */}
          {[
            {
              category: '💰 Pricing & Terms',
              rows: [
                { feature: 'Annual base cost (excl. GST)', vals: ['₹0', '₹55,000', '₹2,45,000', 'Contact Sales'] },
                { feature: 'Monthly option', vals: ['—', 'N/A', 'N/A', 'Custom'] },
                { feature: 'Billing commitment', vals: ['14-day trial', '1 year', '1 year', 'Custom'] },
              ]
            },
            {
              category: '📦 Capacity Limits',
              rows: [
                { feature: 'Brand Registries', vals: ['1 brand', '1 brand', '5 brands (+)', 'Unlimited'] },
                { feature: 'SKU Count', vals: ['1 SKU', '25 SKUs (+)', '500 SKUs (+)', 'Unlimited'] },
                { feature: 'Team user seats', vals: ['1 user', '5 users (+)', '50 users (+)', 'Unlimited'] },
                { feature: 'Verifications / year', vals: ['250 scans', '100,000 scans', 'Unlimited', 'Unlimited'] },
              ]
            },
            {
              category: '⚙️ Feature Modules',
              rows: [
                { feature: 'Authentiq QR Generator', vals: [true, true, true, true] },
                { feature: 'AI authenticity scoring', vals: [true, true, true, true] },
                { feature: 'Mobile scan & verify UI', vals: [true, true, true, true] },
                { feature: 'Counterfeit reporting', vals: [true, true, true, true] },
                { feature: 'Location intelligence', vals: [false, 'Region-level', 'Full heatmaps', 'Full logistics'] },
                { feature: 'CSV / Excel import & export', vals: [false, true, true, true] },
                { feature: 'Bulk QR serialization', vals: [false, false, true, true] },
                { feature: 'Security telemetry', vals: [false, false, true, true] },
                { feature: 'Case & report registry', vals: ['Basic', true, true, true] },
                { feature: 'API & Webhooks', vals: [false, false, true, true] },
                { feature: 'SSO & Custom Roles', vals: [false, false, false, true] },
              ]
            },
            {
              category: '🛎️ Support',
              rows: [
                { feature: 'Support channel', vals: [false, 'Standard Email', 'Priority support', 'Dedicated CSM + SLA'] },
                { feature: 'Credit card required', vals: ['No', '—', '—', '—'] },
              ]
            },
          ].map((group) => (
            <div key={group.category} className="mb-5 bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#003057]">{group.category}</span>
              </div>
              {group.rows.map((row, ri) => {
                const val = row.vals[compareCol];
                const isProCol = compareCol === 2;
                return (
                  <div key={ri} className={`flex items-center justify-between px-4 py-4 ${ri < group.rows.length - 1 ? 'border-b border-slate-100' : ''} ${isProCol ? 'bg-[#00b074]/3' : ''}`}>
                    <span className="text-sm text-slate-700 font-medium flex-1 pr-4">{row.feature}</span>
                    <div className="flex-shrink-0">
                      {val === true ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200">
                          <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </span>
                      ) : val === false ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 border border-slate-200">
                          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </span>
                      ) : (
                        <span className={`text-xs font-bold ${isProCol ? 'text-[#009660]' : 'text-slate-700'}`}>{String(val)}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Below Fold Info Block */}
      <div className="w-full bg-[#f8fafc] pt-10 sm:pt-16 pb-16 md:pb-20 text-slate-800 mt-10 sm:mt-16 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <h2 className="text-4xl font-light tracking-tight text-[#003057] leading-tight">
              Professional Tracking <br />
              <span className="text-[#00b074] font-medium">Ownership Standards</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
              We don't just generate codes; we secure your infrastructure footprint. Our commitment to reliable verification checks ensures that every scan is secure, stable, and completely accurate.
            </p>
            <div className="space-y-3 pt-2 font-normal">
              <div className="flex items-center gap-3 text-sm text-[#003057]">
                <span className="w-5 h-5 rounded-full bg-[#00b074]/10 border border-[#00b074]/20 flex items-center justify-center text-[#00b074] text-xs font-normal">✓</span>
                Cryptographic QR Generation
              </div>
              <div className="flex items-center gap-3 text-sm text-[#003057]">
                <span className="w-5 h-5 rounded-full bg-[#00b074]/10 border border-[#00b074]/20 flex items-center justify-center text-[#00b074] text-xs font-normal">✓</span>
                Real-time Performance Metrics Auditing
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="w-full h-64 sm:h-80 rounded-3xl overflow-hidden bg-cover bg-center border border-slate-200"
              style={{ backgroundImage: `url('/verification_confirmed.png')` }}
            />
          </div>
        </div>
      </div>

      {/* --- FREE TRIAL DRAWER SYSTEM --- */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${isFreeTrialDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsFreeTrialDrawerOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col justify-between p-6 sm:p-8 border-l border-slate-200 text-left ${isFreeTrialDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Free Option</span>
          <button
            onClick={() => setIsFreeTrialDrawerOpen(false)}
            className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 cursor-pointer focus:outline-none border-none bg-transparent"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 bg-slate-105 px-3 py-1 rounded-md border border-slate-200">
              14-Day Trial
            </span>
            <h3 className="text-3xl font-light text-[#003057] mt-4">Free Trial</h3>
            <p className="text-xs text-slate-500 mt-2 font-normal leading-relaxed">
              Securely test batch serialization and OCR confidence pipelines on your packaging configurations.
            </p>
          </div>

          <div className="flex items-baseline gap-1 text-[#003057]">
            <span className="text-base font-bold">₹</span>
            <span className="text-5xl font-extrabold tracking-tight">0</span>
            <span className="text-slate-400 text-xs ml-1">/ forever</span>
          </div>

          <div className="space-y-3 pt-2">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between opacity-75">
              <span className="text-xs text-slate-400 font-semibold uppercase">Users limit</span>
              <span className="text-sm font-medium text-slate-600 font-sans">1 team user</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between opacity-75">
              <span className="text-xs text-slate-400 font-semibold uppercase">SKUs limit</span>
              <span className="text-sm font-medium text-slate-600 font-sans">1 SKU</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setIsFreeTrialDrawerOpen(false);
            handleSelectPlan('free');
          }}
          className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-2xl transition-all duration-200 text-xs tracking-wider uppercase cursor-pointer"
        >
          Start Free Trial
        </button>
      </div>
    </div>
  );
}

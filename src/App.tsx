import { useState, useEffect } from 'react';

// Define public navigation view states
type Page = 'home' | 'plans' | 'products' | 'about' | 'contact' | 'billing';

interface SelectedPlanInfo {
  name: string;
  price: number;
  interval: 'mo' | 'forever';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAnnual, setIsAnnual] = useState<boolean>(false);
  
  // Interactive billing information states
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  
  // State to track the selected payment method gateway
  const [paymentMethod, setPaymentMethod] = useState<string>('razorpay');

  // FAQ Dropdown state manager index key tracking
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const [logoTheme, setLogoTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-96px 0px -80% 0px',
      threshold: 0,
    };

    const handleIntersect = () => {
      const sections = document.querySelectorAll('[data-theme]');
      let activeTheme: 'light' | 'dark' = 'light';
      
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= 96 && rect.bottom > 96) {
          const theme = sections[i].getAttribute('data-theme');
          if (theme === 'dark' || theme === 'light') {
            activeTheme = theme;
          }
          break;
        }
      }
      setLogoTheme(activeTheme);
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = document.querySelectorAll('[data-theme]');
    sections.forEach(section => observer.observe(section));

    const checkInitialPosition = () => {
      handleIntersect();
    };
    checkInitialPosition();
    window.addEventListener('scroll', checkInitialPosition);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', checkInitialPosition);
    };
  }, [currentPage]);



  const [selectedPlan, setSelectedPlan] = useState<SelectedPlanInfo>({
    name: 'Spark',
    price: 0,
    interval: 'forever'
  });

  // Base plan conversion helper into Rupee values
  const getRupeePrice = (baseDollar: number) => {
    return baseDollar * 80;
  };

  const handleSelectPlan = (planName: string, monthlyPrice: string, annualPrice: string, isFree: boolean = false) => {
    const basePrice = isFree ? 0 : (isAnnual ? parseFloat(annualPrice) : parseFloat(monthlyPrice));
    const finalPrice = getRupeePrice(basePrice);
    const finalInterval = isFree ? 'forever' : 'mo';
    
    setSelectedPlan({
      name: planName,
      price: finalPrice,
      interval: finalInterval
    });
    
    setCurrentPage('billing');
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Tax calculations (18% GST/VAT placeholder)
  const taxRate = 0.18;
  const calculatedTax = selectedPlan.price * taxRate;
  const totalAmount = selectedPlan.price + calculatedTax;

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          /* Main container allows vertical scrolling below the fold in pure white */
          <div className="animate-fadeIn space-y-36 pb-32 bg-white text-slate-800">
            
            {/* SECTION 1: Above-the-fold Viewport Frame with Spatially Proportioned Page Rectangle */}
            <div 
              data-theme="dark"
              className="w-full flex flex-col justify-center items-center text-center h-screen pt-24 px-4 bg-cover bg-center bg-fixed relative overflow-hidden"
              style={{ 
                backgroundImage: `linear-gradient(135deg, rgba(0, 48, 87, 0.88) 0%, rgba(0, 30, 54, 0.95) 100%), url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=2500')` 
              }}
            >
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
                    onClick={() => setCurrentPage('plans')}
                    className="px-16 py-4.5 bg-[#00b074] hover:bg-[#009660] text-white font-medium rounded-full transition-all duration-300 shadow-2xl shadow-[#00b074]/30 hover:scale-105 tracking-widest text-xs uppercase cursor-pointer"
                  >
                    VIEW HOSTING PLANS
                  </button>
                </div>
              </div>
            </div>

            {/* Container for scrolling sections below the fold rendering on clean white background */}
            <div data-theme="light" className="max-w-7xl mx-auto px-6 space-y-36">
              
              {/* SECTION 2: Generous De-congested Spacing Value Pillars Grid (No Bold, Elegant Light/Medium Headers) */}
              <div className="space-y-16">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-light text-[#003057] tracking-tight sm:text-4xl">Complete Supply Integrity</h2>
                  <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-normal">Robust operational safety metrics built directly onto decentralised ledger architecture.</p>
                </div>

                {/* Increased layout gap to prevent tight card clutter */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                  <div className="p-10 bg-slate-50 rounded-3xl shadow-xl space-y-6 border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                    <div className="w-14 h-14 bg-[#00b074]/10 rounded-2xl flex items-center justify-center text-2xl border border-[#00b074]/20">🛡️</div>
                    <h3 className="text-xl font-medium text-[#003057] tracking-tight">Enterprise Fraud Mitigation</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-normal">
                      Protect market share with real-time cloned-code detection systems. Instantly flags and isolates duplicated serialization queries before fake goods clear retail registers.
                    </p>
                  </div>

                  <div className="p-10 bg-slate-50 rounded-3xl shadow-xl space-y-6 border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                    <div className="w-14 h-14 bg-[#00b074]/10 rounded-2xl flex items-center justify-center text-2xl border border-[#00b074]/20">🌍</div>
                    <h3 className="text-xl font-medium text-[#003057] tracking-tight">Global Compliance Standards</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-normal">
                      Completely aligned with international data protection protocols. Built with fully optimized encryption architecture ensuring complete safety for cross-border logistics distribution networks.
                    </p>
                  </div>

                  <div className="p-10 bg-slate-50 rounded-3xl shadow-xl space-y-6 border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                    <div className="w-14 h-14 bg-[#00b074]/10 rounded-2xl flex items-center justify-center text-2xl border border-[#00b074]/20">🔌</div>
                    <h3 className="text-xl font-medium text-[#003057] tracking-tight">Seamless API Infrastructure</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-normal">
                      Plug verification tracking triggers straight into your existing ERP inventory setups, custom apps, or digital billing gateways using secure webhooks.
                    </p>
                  </div>
                </div>
              </div>
 
              {/* SECTION 2.5: Strategic Vision (2-Column Split Layout, Flat Design, Animated) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-8 overflow-hidden">
                {/* Left Column (Text & Bullets) */}
                <div className="space-y-6 text-left animate-slide-in-left">
                  <h2 className="text-3xl sm:text-4xl font-light text-[#003057] tracking-tight">
                    Unrivaled Supply Chain Visibility
                  </h2>
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
                    Go beyond simple tracking. Authentiq maps every stage of your product journey, providing end-to-end transparency from the factory floor to the end consumer.
                  </p>
                  
                  {/* Bullet Points */}
                  <ul className="space-y-4 pt-2 font-normal text-slate-500">
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

              {/* SECTION 3: Open Workspace Roadmap Pathways Grid */}
              <div className="space-y-16">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-light text-[#003057] tracking-tight sm:text-4xl">How Authentiq Operates</h2>
                  <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-normal">Three straightforward steps protecting your brand catalog distribution items.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                  {[
                    { title: '1. SCAN PACKAGING', badge: 'Secure QR', desc: 'Unique tamper-proof dynamic codes generated natively for individual product packaging items.' },
                    { title: '2. RUN VERIFICATION', badge: 'Instant Feedback', desc: 'Sub-millisecond verification logic checking database state logs without page freezing or delays.' },
                    { title: '3. CONSUMER TRUST', badge: 'Guaranteed Authenticity', desc: 'Build an immutable relationship with consumers by presenting transparent supply metrics upon scan.' }
                  ].map((feat, idx) => (
                    <div key={idx} className="p-10 bg-slate-50 rounded-3xl shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                      <span className="text-xs font-normal text-[#00b074] bg-[#00b074]/10 px-3 py-1 rounded-md border border-[#00b074]/20">{feat.badge}</span>
                      <h3 className="text-xl font-medium text-[#003057] mt-5 mb-3 tracking-tight">{feat.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed font-normal">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 4: Interactive Dropdown Menu Accordion FAQ System */}
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-xl sm:text-2xl font-light text-[#003057] tracking-tight">Frequently Asked Questions</h2>
                  <p className="text-slate-450 text-[11px] sm:text-xs font-normal">Everything you need to understand regarding our tracking integration logs.</p>
                </div>

                <div className="space-y-2.5 text-left">
                  {[
                    { q: "How do dynamic QR identifiers differ from regular QR codes?", a: "Standard QR codes only route to a static web link. Authentiq generates unique dynamic serialized hash nodes for individual product items. If a single code signature gets copied or scanned abnormally, our filters immediately flags it." },
                    { q: "Can we integrate this into our existing packaging process?", a: "Yes. Our batch system hooks directly into high-throughput warehouse printers and label applicators via standard API structures, adding zero delay to physical line operations." },
                    { q: "What happens when a counterfeit code signature is detected?", a: "The system triggers a real-time warning dashboard alert to your team, maps the scanning telemetry coordinates, and presents a 'Suspect Warning' screen to the consumer scanning the product." }
                  ].map((faq, idx) => (
                    <div key={idx} className="bg-slate-50/40 border border-slate-200/70 rounded-lg overflow-hidden hover:bg-slate-50 hover:border-[#00b074]/35 transition-all duration-300 shadow-sm hover:shadow-md">
                      <button 
                        onClick={() => toggleFaq(idx)}
                        className="w-full py-3 px-5 text-left flex justify-between items-center bg-transparent transition-colors focus:outline-none cursor-pointer"
                      >
                        <h4 className="font-medium text-[#003057] text-xs sm:text-[13px] flex items-center pr-4">
                          <span className="text-[#00b074] font-semibold text-xs sm:text-sm mr-2.5 flex-shrink-0">Q.</span> 
                          {faq.q}
                        </h4>
                        <svg 
                          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-350 flex-shrink-0 ${openFaqIndex === idx ? 'transform rotate-180 text-[#00b074]' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaqIndex === idx ? 'max-h-40' : 'max-h-0'}`}>
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

      case 'plans':
        return (
          /* Page scrolling enabled under pricing cards row fold on white background */
          <div data-theme="light" className="animate-fadeIn pt-24 pb-32 space-y-28 bg-white text-slate-800">
            
            {/* ABOVE THE FOLD CONTAINER: Fits perfectly on selection load with no internal scrollbars */}
            <div className="min-h-[calc(100vh-120px)] flex flex-col justify-center space-y-10 py-4 max-w-7xl mx-auto">
              <div className="text-center space-y-2">
                <h2 className="text-3xl sm:text-4xl font-light text-[#003057] tracking-tight">Predictable Verification Plans</h2>
                <p className="text-slate-500 max-w-md mx-auto text-xs sm:text-sm font-normal">Choose the tracking volume your supply distribution requires.</p>
                
                <div className="pt-2 flex items-center justify-center gap-3">
                  <span className={`text-xs font-medium ${!isAnnual ? 'text-[#00b074]' : 'text-slate-400'}`}>Monthly Billing</span>
                  <button 
                    onClick={() => setIsAnnual(!isAnnual)}
                    className="w-12 h-6 bg-slate-200 rounded-full p-0.5 transition-all relative border border-slate-350 cursor-pointer"
                  >
                    <div className={`w-5 h-5 bg-[#00b074] rounded-full shadow-md transform transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                  <span className={`text-xs font-medium flex items-center gap-1.5 ${isAnnual ? 'text-[#00b074]' : 'text-slate-400'}`}>
                    Annual Billing <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500 text-white rounded font-medium">Save 20%</span>
                  </span>
                </div>
              </div>

              {/* Four-Column Clean Grid Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch w-full px-4">
                
                {/* Column 1: Spark Plan */}
                <div className="flex flex-col justify-between p-7 bg-slate-50 rounded-2xl hover:border-[#00b074]/40 border border-slate-200 transition-all duration-300 shadow-md hover:shadow-xl group">
                  <div>
                    <h3 className="text-xl font-medium text-[#00b074]">Spark</h3>
                    <p className="text-xs text-slate-400 mt-1.5 h-6 font-normal">For testing small batch physical inventory prototypes.</p>
                    {/* Compact Rupee Value Label Sizing (Smaller) */}
                    <div className="mt-5 flex items-baseline gap-0.5 text-[#003057] font-light">
                      <span className="text-base font-bold">₹</span>
                      <span className="text-xl font-medium">0</span>
                      <span className="text-slate-400 text-[10px] ml-1">/ forever</span>
                    </div>
                    <ul className="mt-6 space-y-3 text-xs text-slate-500 border-t border-slate-200 pt-5 font-normal">
                      <li className="flex items-center gap-2">✓ 50 Active QR Generates</li>
                      <li className="flex items-center gap-2">✓ Localstorage dashboard access</li>
                    </ul>
                  </div>
                  {/* Fully Circular select plan button */}
                  <button 
                    onClick={() => handleSelectPlan('Spark', '0', '0', true)}
                    className="mt-8 w-full py-3.5 bg-[#00b074] hover:bg-[#009660] text-white font-medium rounded-full transition-all duration-300 text-xs tracking-widest uppercase cursor-pointer shadow-md"
                  >
                    SELECT PLAN
                  </button>
                </div>

                {/* Column 2: Pro Plan */}
                <div className="flex flex-col justify-between p-7 bg-slate-50 rounded-2xl hover:border-[#00b074]/40 border border-slate-200 transition-all duration-300 shadow-md hover:shadow-xl group">
                  <div>
                    <h3 className="text-xl font-medium text-[#00b074]">Pro</h3>
                    <p className="text-xs text-slate-550 mt-1.5 h-6 font-normal">Perfect for growing boutique labels and brands.</p>
                    {/* Compact Rupee Value Label Sizing */}
                    <div className="mt-5 flex items-baseline gap-0.5 text-[#003057] font-light">
                      <span className="text-slate-450 text-[10px] line-through mr-1.5 font-normal">₹{isAnnual ? '2,320' : '2,800'}</span>
                      <span className="text-base font-bold">₹</span>
                      <span className="text-xl font-medium">{isAnnual ? '1,520' : '2,000'}</span>
                      <span className="text-slate-400 text-[10px] ml-1">/ mo</span>
                    </div>
                    <ul className="mt-6 space-y-3 text-xs text-slate-500 border-t border-slate-200 pt-5 font-normal">
                      <li className="flex items-center gap-2">✓ 2,500 Batched QR Slots</li>
                      <li className="flex items-center gap-2">✓ Real-time activity updates</li>
                    </ul>
                  </div>
                  {/* Fully Circular select plan button */}
                  <button 
                    onClick={() => handleSelectPlan('Pro', '25', '19')}
                    className="mt-8 w-full py-3.5 bg-[#00b074] hover:bg-[#009660] text-white font-medium rounded-full transition-all duration-300 text-xs tracking-widest uppercase cursor-pointer shadow-md"
                  >
                    SELECT PLAN
                  </button>
                </div>

                {/* Column 3: Distinct Most Popular Card (Different borders, zero internal scrollbar) */}
                <div className="flex flex-col justify-between p-7 bg-slate-50 border-2 border-[#00b074] rounded-2xl shadow-xl relative transition-all duration-300 scale-[1.03] z-10 group h-full overflow-visible">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00b074] text-white px-3 py-0.5 rounded-full text-[9px] font-medium tracking-widest uppercase shadow-md">
                    MOST POPULAR
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-[#00b074]">Most Popular</h3>
                    <p className="text-xs text-slate-550 mt-1.5 h-6 font-normal">Full scale tracking infrastructure with security filtering.</p>
                    {/* Compact Rupee Value Sizing */}
                    <div className="mt-5 flex items-baseline gap-0.5 text-[#003057] font-light">
                      <span className="text-slate-450 text-[10px] line-through mr-1.5 font-normal">₹{isAnnual ? '6,320' : '7,120'}</span>
                      <span className="text-base font-bold">₹</span>
                      <span className="text-xl font-medium">{isAnnual ? '4,720' : '5,520'}</span>
                      <span className="text-slate-400 text-[10px] ml-1">/ mo</span>
                    </div>
                    <ul className="mt-6 space-y-3 text-xs text-slate-500 border-t border-slate-200 pt-5 font-normal">
                      <li className="flex items-center gap-2 text-[#00b074] font-medium">★ Unlimited QR Generations</li>
                      <li className="flex items-center gap-2">✓ 60s Sliding-Window Fraud Filter</li>
                    </ul>
                  </div>
                  {/* Fully Circular select plan button */}
                  <button 
                    onClick={() => handleSelectPlan('Most Popular', '69', '59')}
                    className="mt-8 w-full py-3.5 bg-[#00b074] hover:bg-[#009660] text-white font-medium rounded-full transition-all duration-300 text-xs tracking-widest uppercase shadow-lg shadow-[#00b074]/30 cursor-pointer"
                  >
                    SELECT PLAN
                  </button>
                </div>

                {/* Column 4: Pro Plus Plan */}
                <div className="flex flex-col justify-between p-7 bg-slate-50 rounded-2xl hover:border-[#00b074]/40 border border-slate-200 transition-all duration-300 shadow-md hover:shadow-xl group">
                  <div>
                    <h3 className="text-xl font-medium text-[#00b074]">Pro Plus</h3>
                    <p className="text-xs text-slate-500 mt-1.5 h-6 font-normal">High-end specialized volume distribution metrics.</p>
                    {/* Compact Rupee Value Sizing */}
                    <div className="mt-5 flex items-baseline gap-0.5 text-[#003057] font-light">
                      <span className="text-slate-400 text-[10px] line-through mr-1.5 font-normal">₹{isAnnual ? '9,520' : '11,920'}</span>
                      <span className="text-base font-bold">₹</span>
                      <span className="text-xl font-medium">{isAnnual ? '7,920' : '9,520'}</span>
                      <span className="text-slate-400 text-[10px] ml-1">/ mo</span>
                    </div>
                    <ul className="mt-6 space-y-3 text-xs text-slate-500 border-t border-slate-200 pt-5 font-normal">
                      <li className="flex items-center gap-2">✓ 50,000 QR Slots</li>
                      <li className="flex items-center gap-2">✓ Dedicated webhook exports</li>
                    </ul>
                  </div>
                  {/* Fully Circular select plan button */}
                  <button 
                    onClick={() => handleSelectPlan('Pro Plus', '119', '99')}
                    className="mt-8 w-full py-3.5 bg-[#00b074] hover:bg-[#009660] text-white font-medium rounded-full transition-all duration-300 text-xs tracking-widest uppercase cursor-pointer shadow-md"
                  >
                    SELECT PLAN
                  </button>
                </div>

              </div>
            </div>

            {/* BELOW THE FOLD SCROLL BANNER SECTION: Appears elegantly upon scrolling page downward */}
            <div className="w-full bg-[#f8fafc] py-20 text-slate-800 mt-12">
              <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Split Text Area (No Bold) */}
                <div className="lg:col-span-6 space-y-6 text-left">
                  <h2 className="text-4xl font-light tracking-tight text-[#003057] leading-tight">
                    Professional Tracking <br />
                    <span className="text-[#00b074] font-medium">Ownership Standards</span>
                  </h2>
                  <p className="text-slate-655 text-sm sm:text-base leading-relaxed font-normal">
                    We don't just generate codes; we secure your infrastructure footprint. Our commitment to factory-grade dynamic verification logic ensures that every project meets the highest standards of stability and long-term ledger integrity.
                  </p>
                  
                  {/* Styled Check Nodes */}
                  <div className="space-y-3 pt-2 font-normal">
                    <div className="flex items-center gap-3 text-sm text-[#003057]">
                      <span className="w-5 h-5 rounded-full bg-[#00b074]/10 border border-[#00b074]/30 flex items-center justify-center text-[#00b074] text-xs font-normal">✓</span>
                      Tier-1 Cryptographic QR Generation
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#003057]">
                      <span className="w-5 h-5 rounded-full bg-[#00b074]/10 border border-[#00b074]/30 flex items-center justify-center text-[#00b074] text-xs font-normal">✓</span>
                      Real-time Performance Metrics Auditing
                    </div>
                  </div>
                </div>

                {/* Right Split Image Layer Area */}
                <div className="lg:col-span-6">
                  <div className="w-full h-80 rounded-3xl overflow-hidden bg-cover bg-center border border-slate-200"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200')` }}
                  />
                </div>

              </div>
            </div>

          </div>
        );
      case 'products':
        return (
          <div data-theme="light" className="w-full bg-[#f8fafc] text-slate-800 animate-fadeIn font-sans pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-12 space-y-32">
              
              {/* Main Header */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-light tracking-tight text-[#003057] sm:text-5xl">Platform Walkthrough</h1>
                <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base font-normal leading-relaxed">
                  Discover how our end-to-end cryptographic authentication pipeline secures your brand integrity and validates products in real-time.
                </p>
              </div>

              {/* SECTION 1: VENDOR */}
              <div className="space-y-16">
                {/* Section Header */}
                <div className="border-b border-slate-200 pb-6 text-left">
                  <h2 className="text-2xl font-medium text-[#003057] tracking-tight sm:text-3xl">Vendor</h2>
                  <p className="text-slate-500 text-sm mt-2 max-w-3xl font-normal leading-relaxed">
                    The Vendor portal provides brand owners and manufacturers with a robust control center to manage product catalogs, orchestrate batch serialization, and monitor security telemetry. Standard users access basic registries and QR batches, while Premium tier users unlock advanced features including interactive geocoded threat mapping, CSV/Excel bulk sync, and expanded capacity limits.
                  </p>
                </div>

                <div className="space-y-24">
                  {/* Card 1: Vendor Control Panel (Text Left, Image Right) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-6 space-y-6 text-left">
                      <span className="text-[#00b074] text-xs font-semibold uppercase tracking-widest bg-[#00b074]/10 px-3 py-1 rounded-md border border-[#00b074]/20">01 / MONITORING</span>
                      <h2 className="text-3xl font-light text-[#003057] tracking-tight sm:text-4xl">Centralized Vendor Control Panel</h2>
                      <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
                        Track registered batches, total system scans, and suspicious entries in real time via live WebSockets. The dashboard activity stream features a 60-second sliding-window client IP deduplicator to prevent duplicate event logs.
                      </p>
                    </div>
                    <div className="lg:col-span-6">
                      <div className="w-full rounded-2xl overflow-hidden cursor-pointer bg-white p-4 pb-6 pr-6">
                        <img 
                          src="/Dashboard.png" 
                          alt="Vendor Control Panel Dashboard" 
                          className="w-full h-auto block rounded-xl transition-all duration-500 ease-out hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Product QR (Image Left, Text Right) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-6 order-last lg:order-first">
                      <div className="w-full rounded-2xl overflow-hidden cursor-pointer bg-slate-50 p-4 pb-6 pr-6">
                        <img 
                          src="/QR.png" 
                          alt="Product QR Code Generation" 
                          className="w-full h-auto block rounded-xl transition-all duration-500 ease-out hover:scale-105"
                        />
                      </div>
                    </div>
                    <div className="lg:col-span-6 space-y-6 text-left">
                      <span className="text-[#00b074] text-xs font-semibold uppercase tracking-widest bg-[#00b074]/10 px-3 py-1 rounded-md border border-[#00b074]/20">02 / SERIALIZATION</span>
                      <h2 className="text-3xl font-light text-[#003057] tracking-tight sm:text-4xl">Dynamic Product QR Code Registry</h2>
                      <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
                        Connect registered templates to manufacturing batches to generate cryptographically secure QR code identifiers. Vendors can copy direct verification links or export high-resolution SVGs for packaging and hangtags.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: CONSUMER */}
              <div className="space-y-16">
                {/* Section Header */}
                <div className="border-b border-slate-200 pb-6 text-left">
                  <h2 className="text-2xl font-medium text-[#003057] tracking-tight sm:text-3xl">Consumer</h2>
                  <p className="text-slate-500 text-sm mt-2 max-w-3xl font-normal leading-relaxed">
                    The Consumer portal delivers a lightweight, mobile-first, friction-free verification interface. Upon scanning a physical QR code, the portal validates the active status of the code, shielding customers from revoked or counterfeit batches. Users then proceed through a guided camera-capture flow, launching their native device camera to submit product photos for sub-second visual validation.
                  </p>
                </div>

                <div className="space-y-24">
                  {/* Card 3: Verify Images (Text Left, Image Right) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-6 space-y-6 text-left">
                      <span className="text-[#00b074] text-xs font-semibold uppercase tracking-widest bg-[#00b074]/10 px-3 py-1 rounded-md border border-[#00b074]/20">03 / CAPTURE</span>
                      <h2 className="text-3xl font-light text-[#003057] tracking-tight sm:text-4xl">Multi-Angle Image Quality Gate</h2>
                      <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
                        Upload three compulsory views—Front, Back, and Label—and an optional Purchase Receipt. The system utilizes mobile-optimized uploads (`capture="environment"`) to immediately run inputs through brightness, focus, and blur quality gates.
                      </p>
                    </div>
                    <div className="lg:col-span-6">
                      <div className="w-full rounded-2xl overflow-hidden border border-slate-200 cursor-pointer bg-[#060814] p-4 pb-6 pr-6">
                        <img 
                          src="/Image.png" 
                          alt="Capture Product Details" 
                          className="w-full h-auto block rounded-xl transition-all duration-500 ease-out hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Results (Image Left, Text Right) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-6 order-last lg:order-first">
                      <div className="w-full rounded-2xl overflow-hidden border border-slate-200 cursor-pointer bg-[#060814] p-4 pb-6 pr-6">
                        <img 
                          src="/Verify-Success.png" 
                          alt="AI Authenticity Verdict" 
                          className="w-full h-auto block rounded-xl transition-all duration-500 ease-out hover:scale-105"
                        />
                      </div>
                    </div>
                    <div className="lg:col-span-6 space-y-6 text-left">
                      <span className="text-[#00b074] text-xs font-semibold uppercase tracking-widest bg-[#00b074]/10 px-3 py-1 rounded-md border border-[#00b074]/20">04 / VERDICT</span>
                      <h2 className="text-3xl font-light text-[#003057] tracking-tight sm:text-4xl">AI-Powered Authenticity Verdict</h2>
                      <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
                        Display ledger-backed authenticity verdicts. The OpenCLIP engine calculates cosine similarity, the pHash duplicate check flags replay attacks, and OCR matches label serials. Verdicts are returned on a themed dial: Green (≥80% Authentic), Yellow (65%-79% Review), or Red (under 65% Counterfeit, triggering pre-filled brand support emails).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        );

      case 'about':
        return (
          <div className="w-full bg-white text-slate-800 animate-fadeIn font-sans pb-24">
            
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
                  {/* Route 1: Asia to North America */}
                  <path 
                    d="M 200 450 Q 450 150 700 350" 
                    stroke="url(#gradient-green)" 
                    strokeWidth="2" 
                    strokeDasharray="8 6"
                    className="animate-dash"
                  />
                  {/* Route 2: Europe to North America */}
                  <path 
                    d="M 700 350 Q 850 100 1100 250" 
                    stroke="#00b074" 
                    strokeWidth="1.5" 
                    opacity="0.6"
                  />
                  {/* Route 3: Asia to Europe */}
                  <path 
                    d="M 200 450 Q 600 200 1100 250" 
                    stroke="url(#gradient-green)" 
                    strokeWidth="2" 
                    strokeDasharray="12 8"
                    className="animate-dash-reverse"
                  />
                  {/* Route 4: South America to North America */}
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

                  {/* Hub 1 (Asia) */}
                  <g className="animate-pulse-slow">
                    <circle cx="200" cy="450" r="6" fill="#00b074" />
                    <circle cx="200" cy="450" r="15" stroke="#00b074" strokeWidth="1" opacity="0.4" className="animate-ping" style={{ transformOrigin: '200px 450px' }} />
                  </g>
                  {/* Hub 2 (North America) */}
                  <g>
                    <circle cx="700" cy="350" r="6" fill="#00b074" />
                    <circle cx="700" cy="350" r="15" stroke="#00b074" strokeWidth="1" opacity="0.4" className="animate-ping" style={{ transformOrigin: '700px 350px' }} />
                  </g>
                  {/* Hub 3 (Europe) */}
                  <g className="animate-pulse-slow">
                    <circle cx="1100" cy="250" r="6" fill="#00b074" />
                    <circle cx="1100" cy="250" r="15" stroke="#00b074" strokeWidth="1" opacity="0.4" className="animate-ping" style={{ transformOrigin: '1100px 250px' }} />
                  </g>
                </svg>
              </div>

              {/* Floating Supply Chain Elements (Plane/Ship/QR nodes) */}
              <div className="absolute inset-0 pointer-events-none z-10">
                {/* Airplane flying across screen */}
                <div className="absolute top-[20%] left-[30%] animate-float-airplane opacity-60">
                  <svg className="w-8 h-8 text-[#00b074]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z"/>
                  </svg>
                </div>
                {/* Cargo Ship */}
                <div className="absolute bottom-[25%] right-[25%] animate-float-ship opacity-50">
                  <svg className="w-8 h-8 text-[#00b074]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.91 0 3.63-.57 5-1.56 1.37.99 3.09 1.56 5 1.56s3.63-.57 5-1.56c1.37.99 3.09 1.56 5 1.56h2v-2h-2zM4 19h16v-5l-2-2h-3V9H9v3H6l-2 2v5z"/>
                  </svg>
                </div>
                {/* QR Code Node */}
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

            {/* Section 3: The Operational Pillars (New Layout) */}
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {/* Pillar 1 */}
                  <div className="bg-white p-10 rounded-2xl border border-[#e2e8f0] transition-all duration-300 hover:shadow-lg space-y-6 text-left">
                    <div className="w-12 h-12 bg-[#00b074]/10 rounded-xl flex items-center justify-center border border-[#00b074]/20">
                      <svg className="w-6 h-6 text-[#00b074]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-light text-[#003057] tracking-tight">
                      Global Reach
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-normal">
                      Supporting operations across 15+ countries.
                    </p>
                  </div>

                  {/* Pillar 2 */}
                  <div className="bg-white p-10 rounded-2xl border border-[#e2e8f0] transition-all duration-300 hover:shadow-lg space-y-6 text-left">
                    <div className="w-12 h-12 bg-[#00b074]/10 rounded-xl flex items-center justify-center border border-[#00b074]/20">
                      <svg className="w-6 h-6 text-[#00b074]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-light text-[#003057] tracking-tight">
                      Ledger Integrity
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-normal">
                      Over 10 million secure authentications performed.
                    </p>
                  </div>

                  {/* Pillar 3 */}
                  <div className="bg-white p-10 rounded-2xl border border-[#e2e8f0] transition-all duration-300 hover:shadow-lg space-y-6 text-left">
                    <div className="w-12 h-12 bg-[#00b074]/10 rounded-xl flex items-center justify-center border border-[#00b074]/20">
                      <svg className="w-6 h-6 text-[#00b074]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3V7.5a3 3 0 013-3h13.5a3 3 0 013 3v3.75a3 3 0 01-3 3m-13.5 0a3 3 0 00-3 3v3.75a3 3 0 003 3h13.5a3 3 0 003-3v-3.75a3 3 0 00-3-3M6.75 6.75h.008v.008H6.75V6.75zm.008 2.25H6.75v-.008h.008V9zm0 6h-.008v-.008h.008V15zm0 2.25H6.75v-.008h.008V17.25z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-light text-[#003057] tracking-tight">
                      Reliability
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-normal">
                      99.99% infrastructure uptime commitment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        );

      case 'contact':
        return (
          /* Neutral Background page container to make cards pop */
          <div data-theme="light" className="w-full min-h-screen bg-slate-50 pt-40 pb-16 px-6 sm:px-12 animate-fadeIn">
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

      case 'billing':
        return (
          <div data-theme="light" className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-36 pb-12 bg-white text-slate-800 animate-fadeIn">
            
            {/* Left Column: Input Forms */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl shadow-xl p-8 space-y-6 text-left font-sans">
                <div>
                  <h2 className="text-2xl font-light text-[#003057]">Account Information</h2>
                  <p className="text-slate-500 text-xs mt-1 font-normal">Provide authorization logs linked directly to your dynamic QR registries.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-normal uppercase tracking-wider text-slate-500">Full Name</label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe" 
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 font-normal transition-colors placeholder-slate-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-normal uppercase tracking-wider text-slate-500">Company Name</label>
                    <input 
                      type="text" 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Authentiq Brand Operations" 
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 font-normal transition-colors placeholder-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-normal uppercase tracking-wider text-slate-300">Authorized Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com" 
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 font-normal transition-colors placeholder-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-normal uppercase tracking-wider text-slate-350">Verification Contact Number</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX" 
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 font-normal transition-colors placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Indian Gateway Selector */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl shadow-xl p-8 space-y-6 text-left">
                <div>
                  <h3 className="text-xl font-light text-[#003057]">Select Payment Method</h3>
                  <p className="text-slate-500 text-xs mt-1 font-normal">Choose your preferred gateway secure option to clear processing dues.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'razorpay' ? 'border-[#00b074] bg-[#00b074]/10' : 'border-slate-200 bg-white hover:border-slate-355'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-[#00b074] flex items-center justify-center p-0.5">
                        {paymentMethod === 'razorpay' && <div className="w-full h-full bg-[#00b074] rounded-full" />}
                      </div>
                      <div>
                        <p className="text-sm font-normal text-slate-800 font-sans">Razorpay Secure</p>
                        <p className="text-[10px] text-slate-400 font-normal">Cards, Netbanking, Wallets</p>
                      </div>
                    </div>
                    <span className="text-xs">💳</span>
                  </div>

                  <div 
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'upi' ? 'border-[#00b074] bg-[#00b074]/10' : 'border-slate-200 bg-white hover:border-slate-355'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-[#00b074] flex items-center justify-center p-0.5">
                        {paymentMethod === 'upi' && <div className="w-full h-full bg-[#00b074] rounded-full" />}
                      </div>
                      <div>
                        <p className="text-sm font-normal text-slate-800 font-sans">UPI / Google Pay</p>
                        <p className="text-[10px] text-slate-400 font-normal">Instant scan and pay nodes</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded tracking-wider border border-purple-300">UPI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Pricing Summary Card */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl shadow-xl overflow-hidden sticky top-24 text-left">
              <div className="bg-[#003057] p-6 text-white text-center border-b border-slate-200">
                <h2 className="text-xl font-light tracking-tight">Billing Summary</h2>
                <p className="text-slate-300 text-xs font-normal">Review transaction load summary mapping</p>
              </div>

              <div className="p-6 space-y-6">
                <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-3.5">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <span className="text-slate-500 text-xs font-normal uppercase tracking-wide">Selected Tier</span>
                    <span className="text-[#00b074] font-medium text-sm px-2.5 py-0.5 bg-slate-50 border border-[#00b074]/30 rounded-md">
                      {selectedPlan.name}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs font-normal">
                    <span className="text-slate-500">Base Allocation Rate</span>
                    <span className="text-slate-800 font-medium">₹{selectedPlan.price.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs font-normal">
                    <span className="text-slate-500">Regulatory Tax (18% GST/VAT)</span>
                    <span className="text-slate-800 font-medium">₹{calculatedTax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                    <span className="text-[#00b074] font-extrabold text-sm">Total Commitment</span>
                    <div className="text-right">
                      <span className="text-2xl font-black text-[#003057]">₹{totalAmount.toFixed(2)}</span>
                      <span className="text-slate-400 text-xs font-normal">/{selectedPlan.interval}</span>
                    </div>
                  </div>
                </div>

                {/* Fully Circular proceed button */}
                <button 
                  onClick={() => {
                    window.location.href = "http://localhost:3000/vendor/login";
                  }}
                  className="w-full py-4 bg-[#00b074] hover:bg-[#009660] text-white font-medium rounded-full transition-all shadow-lg shadow-[#00b074]/20 text-center block text-sm tracking-wide uppercase cursor-pointer"
                >
                  Proceed to Checkout
                </button>


              </div>
            </div>

          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-[#00b074] selection:text-white">
      
      {/* KEDIA-INSPIRED HEADER BAR */}
      <header className="navbar">
        <div className="w-full flex items-center justify-between relative">
          
          {/* Logo Frame */}
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="logo-container relative">
              {/* Light Logo (white text, for dark backgrounds) */}
              <img 
                src="/authentiq_logo_light.svg" 
                alt="Authentiq Logo Light" 
                className={`logo absolute inset-0 transition-opacity duration-200 ${logoTheme === 'dark' ? 'opacity-100' : 'opacity-0'}`} 
              />
              {/* Dark Logo (dark text, for light backgrounds) */}
              <img 
                src="/authentiq_logo_dark.svg" 
                alt="Authentiq Logo Dark" 
                className={`logo absolute inset-0 transition-opacity duration-200 ${logoTheme === 'light' ? 'opacity-100' : 'opacity-0'}`} 
              />
            </div>
          </div>

          {/* Centered Navigation Menu Array */}
          <nav className="flex items-center justify-center gap-10 absolute left-1/2 -translate-x-1/2">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`text-base font-medium transition-all duration-200 cursor-pointer ${currentPage === 'home' ? 'active-nav underline decoration-2 underline-offset-8' : ''}`}
            >
              Home
            </button>

            <button 
              onClick={() => setCurrentPage('plans')}
              className={`text-base font-medium transition-all duration-200 cursor-pointer ${currentPage === 'plans' ? 'active-nav underline decoration-2 underline-offset-8' : ''}`}
            >
              Plans
            </button>

            <button 
              onClick={() => setCurrentPage('products')}
              className={`text-base font-medium transition-all duration-200 cursor-pointer ${currentPage === 'products' ? 'active-nav underline decoration-2 underline-offset-8' : ''}`}
            >
              Services
            </button>

            <button 
              onClick={() => setCurrentPage('about')}
              className={`text-base font-medium transition-all duration-200 cursor-pointer ${currentPage === 'about' ? 'active-nav underline decoration-2 underline-offset-8' : ''}`}
            >
              About us
            </button>

            <button 
              onClick={() => setCurrentPage('contact')}
              className={`text-base font-medium transition-all duration-200 cursor-pointer ${currentPage === 'contact' ? 'active-nav underline decoration-2 underline-offset-8' : ''}`}
            >
              Contact us
            </button>
          </nav>

          {/* Spacer to balance flex layout visually on larger viewports */}
          <div className="w-[180px] hidden md:block pointer-events-none" />
        </div>
      </header>

      {/* Main content block */}
      <main className="w-full">
        {renderPage()}
      </main>
    </div>
  );
}

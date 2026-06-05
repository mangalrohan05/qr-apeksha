import { useState, useEffect } from 'react';

// Define public navigation view states
type Page = 'home' | 'plans' | 'products' | 'about' | 'contact' | 'billing';

interface SelectedPlanInfo {
  name: string;
  price: number;
  interval: 'mo' | 'yr' | 'trial';
  basePrice: number;
  extraUsers: number;
  extraUsersCost: number;
  extraSKUs: number;
  extraSKUsCost: number;
  extraBrands: number;
  extraBrandsCost: number;
  totalUsers: number;
  totalSKUs: number;
  totalBrands: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const isAnnual = true; // default to annual as in comparison sheet
  
  // Stepper step state: 1 (Company), 2 (Contact), 3 (Trademark & Compliance), 4 (Consent & Pay)
  const [checkoutStep, setCheckoutStep] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Step 1: Company Details
  const [legalName, setLegalName] = useState<string>('');
  const [companyType, setCompanyType] = useState<string>('');
  const [gstin, setGstin] = useState<string>('');
  const [pan, setPan] = useState<string>('');
  const [cin, setCin] = useState<string>('');
  const [addressLine1, setAddressLine1] = useState<string>('');
  const [addressLine2, setAddressLine2] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [stateName, setStateName] = useState<string>('');
  const [pinCode, setPinCode] = useState<string>('');
  const country = 'India';
  const [industry, setIndustry] = useState<string>('');
  const [website, setWebsite] = useState<string>('');

  // Step 2: Contact Details
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
  const [otpInput, setOtpInput] = useState<string>('');
  const [showOtpPopup, setShowOtpPopup] = useState<boolean>(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);

  // Step 3: Trademark & Compliance Docs
  const [tmStatus, setTmStatus] = useState<string>('');
  const [tmNumber, setTmNumber] = useState<string>('');
  // File name references to simulate uploads
  const [tmAppFile, setTmAppFile] = useState<string>('');
  const [tmCertFile, setTmCertFile] = useState<string>('');
  const [brandAuthFile, setBrandAuthFile] = useState<string>('');
  const [gstCertFile, setGstCertFile] = useState<string>('');
  const [incDocFile, setIncDocFile] = useState<string>('');
  const [pharmaDrugLicense, setPharmaDrugLicense] = useState<string>('');
  const [pharmaDrugLicenseFile, setPharmaDrugLicenseFile] = useState<string>('');
  const [fssaiLicense, setFssaiLicense] = useState<string>('');
  const [fssaiLicenseFile, setFssaiLicenseFile] = useState<string>('');
  const [exciseLicenseFile, setExciseLicenseFile] = useState<string>('');

  // Step 4: Consent
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [agreePrivacy, setAgreePrivacy] = useState<boolean>(false);
  const [agreeDataProcessing, setAgreeDataProcessing] = useState<boolean>(false);

  const resetCheckout = () => {
    setCheckoutStep(1);
    setErrors({});
    setLegalName('');
    setCompanyType('');
    setGstin('');
    setPan('');
    setCin('');
    setAddressLine1('');
    setAddressLine2('');
    setCity('');
    setStateName('');
    setPinCode('');
    setIndustry('');
    setWebsite('');
    setFullName('');
    setEmail('');
    setPhone('');
    setDesignation('');
    setIsOtpSent(false);
    setIsOtpVerified(false);
    setOtpInput('');
    setShowOtpPopup(false);
    setIsProcessingPayment(false);
    setTmStatus('');
    setTmNumber('');
    setTmAppFile('');
    setTmCertFile('');
    setBrandAuthFile('');
    setGstCertFile('');
    setIncDocFile('');
    setPharmaDrugLicense('');
    setPharmaDrugLicenseFile('');
    setFssaiLicense('');
    setFssaiLicenseFile('');
    setExciseLicenseFile('');
    setAgreeTerms(false);
    setAgreePrivacy(false);
    setAgreeDataProcessing(false);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!legalName.trim()) newErrors.legalName = 'Legal company name is required';
      if (!companyType) newErrors.companyType = 'Company type is required';
      
      if (!gstin.trim()) {
        newErrors.gstin = 'GSTIN is required';
      } else {
        const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (!gstinRegex.test(gstin.trim().toUpperCase())) {
          newErrors.gstin = 'Invalid GSTIN format (e.g. 27AAAAA1111A1Z1)';
        }
      }

      if (!pan.trim()) {
        newErrors.pan = 'PAN is required';
      } else {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!panRegex.test(pan.trim().toUpperCase())) {
          newErrors.pan = 'Invalid PAN format (e.g. ABCDE1234F)';
        }
      }

      if (!addressLine1.trim()) newErrors.addressLine1 = 'Registered address line 1 is required';
      if (!city.trim()) newErrors.city = 'City is required';
      if (!stateName) newErrors.stateName = 'State is required';
      
      if (!pinCode.trim()) {
        newErrors.pinCode = 'PIN code is required';
      } else {
        const pinRegex = /^[1-9][0-9]{5}$/;
        if (!pinRegex.test(pinCode.trim())) {
          newErrors.pinCode = 'Invalid 6-digit PIN code';
        }
      }

      if (!industry) newErrors.industry = 'Industry/sector is required';
    }

    if (step === 2) {
      if (!fullName.trim()) newErrors.fullName = 'Full name is required';
      
      if (!email.trim()) {
        newErrors.email = 'Work email is required';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
          newErrors.email = 'Invalid email address';
        }
      }

      if (!phone.trim()) {
        newErrors.phone = 'Mobile number is required';
      } else {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone.trim().replace(/\D/g, ''))) {
          newErrors.phone = 'Invalid 10-digit mobile number';
        }
      }

      if (!isOtpVerified) {
        newErrors.phone = 'Mobile OTP verification required';
      }

      if (!designation.trim()) newErrors.designation = 'Designation/role is required';
    }

    if (step === 3) {
      if (!gstCertFile) newErrors.gstCertFile = 'GST Certificate is required';
      if (!incDocFile) newErrors.incDocFile = 'Incorporation document is required';

      if (industry === 'Pharma') {
        if (!pharmaDrugLicense.trim()) newErrors.pharmaDrugLicense = 'Drug license number is required';
        if (!pharmaDrugLicenseFile) newErrors.pharmaDrugLicenseFile = 'Drug license file is required';
      } else if (industry === 'FMCG') {
        if (!fssaiLicense.trim()) newErrors.fssaiLicense = 'FSSAI license number is required';
        if (!fssaiLicenseFile) newErrors.fssaiLicenseFile = 'FSSAI license file is required';
      } else if (industry === 'Liquor') {
        if (!exciseLicenseFile) newErrors.exciseLicenseFile = 'Excise license file is required';
      }
    }

    if (step === 4) {
      if (!agreeTerms) newErrors.agreeTerms = 'Acceptance required';
      if (!agreePrivacy) newErrors.agreePrivacy = 'Acceptance required';
      if (!agreeDataProcessing) newErrors.agreeDataProcessing = 'Consent required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // State to track the selected payment method gateway
  const [paymentMethod, setPaymentMethod] = useState<string>('razorpay');

  // FAQ Dropdown state manager index key tracking
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const [logoTheme, setLogoTheme] = useState<'light' | 'dark'>('light');

  // Interactive plan sizing states (Business)
  const [businessUsers, setBusinessUsers] = useState<number>(5);
  const [businessSKUs, setBusinessSKUs] = useState<number>(25);

  // Interactive plan sizing states (Business Pro)
  const [proUsers, setProUsers] = useState<number>(50);
  const [proSKUs, setProSKUs] = useState<number>(500);
  const [proBrands, setProBrands] = useState<number>(5);

  // Free Trial side drawer toggle state
  const [isFreeTrialDrawerOpen, setIsFreeTrialDrawerOpen] = useState<boolean>(false);

  // Scroll to top of the page when the page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

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
    name: 'Free Trial',
    price: 0,
    interval: 'trial',
    basePrice: 0,
    extraUsers: 0,
    extraUsersCost: 0,
    extraSKUs: 0,
    extraSKUsCost: 0,
    extraBrands: 0,
    extraBrandsCost: 0,
    totalUsers: 1,
    totalSKUs: 1,
    totalBrands: 1
  });

  const handleSelectPlan = (planType: 'free' | 'business' | 'pro' | 'enterprise') => {
    resetCheckout();
    if (planType === 'free') {
      setSelectedPlan({
        name: 'Free Trial',
        price: 0,
        interval: 'trial',
        basePrice: 0,
        extraUsers: 0,
        extraUsersCost: 0,
        extraSKUs: 0,
        extraSKUsCost: 0,
        extraBrands: 0,
        extraBrandsCost: 0,
        totalUsers: 1,
        totalSKUs: 1,
        totalBrands: 1
      });
      setCurrentPage('billing');
      return;
    }

    if (planType === 'enterprise') {
      setSelectedPlan({
        name: 'Enterprise',
        price: 0,
        interval: 'yr',
        basePrice: 0,
        extraUsers: 0,
        extraUsersCost: 0,
        extraSKUs: 0,
        extraSKUsCost: 0,
        extraBrands: 0,
        extraBrandsCost: 0,
        totalUsers: 999999,
        totalSKUs: 999999,
        totalBrands: 999999
      });
      setCurrentPage('billing');
      return;
    }

    if (planType === 'business') {
      const baseCost = isAnnual ? 55000 : 5000;
      const extraUsersCount = businessUsers - 5;
      const extraUsersC = (extraUsersCount / 5) * (isAnnual ? 5000 : 450);
      
      let extraSKUsC = 0;
      if (businessSKUs === 35) {
        extraSKUsC = isAnnual ? 10000 : 900;
      } else if (businessSKUs === 75) {
        extraSKUsC = isAnnual ? 45000 : 4000;
      }

      const totalCost = baseCost + extraUsersC + extraSKUsC;

      setSelectedPlan({
        name: 'Business',
        price: totalCost,
        interval: isAnnual ? 'yr' : 'mo',
        basePrice: baseCost,
        extraUsers: extraUsersCount,
        extraUsersCost: extraUsersC,
        extraSKUs: businessSKUs - 25,
        extraSKUsCost: extraSKUsC,
        extraBrands: 0,
        extraBrandsCost: 0,
        totalUsers: businessUsers,
        totalSKUs: businessSKUs,
        totalBrands: 1
      });
      setCurrentPage('billing');
      return;
    }

    if (planType === 'pro') {
      const baseCost = isAnnual ? 245000 : 22500;
      const extraUsersCount = proUsers - 50;
      const extraUsersC = (extraUsersCount / 5) * (isAnnual ? 5000 : 450);

      let extraSKUsC = 0;
      if (proSKUs === 510) {
        extraSKUsC = isAnnual ? 10000 : 900;
      } else if (proSKUs === 550) {
        extraSKUsC = isAnnual ? 45000 : 4000;
      }

      const extraBrandsCount = proBrands - 5;
      const extraBrandsC = extraBrandsCount * (isAnnual ? 10000 : 900);

      const totalCost = baseCost + extraUsersC + extraSKUsC + extraBrandsC;

      setSelectedPlan({
        name: 'Business Pro',
        price: totalCost,
        interval: isAnnual ? 'yr' : 'mo',
        basePrice: baseCost,
        extraUsers: extraUsersCount,
        extraUsersCost: extraUsersC,
        extraSKUs: proSKUs - 500,
        extraSKUsCost: extraSKUsC,
        extraBrands: extraBrandsCount,
        extraBrandsCost: extraBrandsC,
        totalUsers: proUsers,
        totalSKUs: proSKUs,
        totalBrands: proBrands
      });
      setCurrentPage('billing');
      return;
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };


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
      case 'plans': {
        // Business plan calculations
        const businessBaseCost = isAnnual ? 55000 : 5000;
        const businessExtraUsersCost = ((businessUsers - 5) / 5) * (isAnnual ? 5000 : 450);
        const businessExtraSKUsCost = businessSKUs === 35 ? (isAnnual ? 10000 : 900) : (businessSKUs === 75 ? (isAnnual ? 45000 : 4000) : 0);
        const businessTotalCost = businessBaseCost + businessExtraUsersCost + businessExtraSKUsCost;

        // Business Pro calculations
        const proBaseCost = isAnnual ? 245000 : 22500;
        const proExtraUsersCost = ((proUsers - 50) / 5) * (isAnnual ? 5000 : 450);
        const proExtraSKUsCost = proSKUs === 510 ? (isAnnual ? 10000 : 900) : (proSKUs === 550 ? (isAnnual ? 45000 : 4000) : 0);
        const proExtraBrandsCost = (proBrands - 5) * (isAnnual ? 10000 : 900);
        const proTotalCost = proBaseCost + proExtraUsersCost + proExtraSKUsCost + proExtraBrandsCost;

        return (
          <div data-theme="light" className="animate-fadeIn pt-24 pb-32 bg-slate-50 text-slate-800 relative overflow-x-hidden">
            
            {/* Header Area */}
            <div className="max-w-7xl mx-auto px-6 pt-12 text-center space-y-4">
              <h2 className="text-4xl sm:text-5xl font-light text-[#003057] tracking-tight">
                Predictable, Secure Verification Plans
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-normal">
                Deploy cryptographic serialized tracking directly onto your packaging lines. Select or customize your parameters below.
              </p>
              
              {/* Billed Annually Indicator */}
              <div className="pt-4 flex items-center justify-center">
                <span className="text-xs font-bold px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full border border-blue-200/60 tracking-wider uppercase">
                  Billed Annually (10% Discount Applied)
                </span>
              </div>

              {/* Drawer Banner Trigger Card (High visibility banner) */}
              <div className="pt-6 max-w-2xl mx-auto">
                <div 
                  onClick={() => setIsFreeTrialDrawerOpen(true)}
                  className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 border border-blue-500/20 text-left shadow-md group"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl animate-pulse">
                      🎁
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide uppercase">
                        Start with a 14-Day Free Trial
                      </h4>
                      <p className="text-xs text-blue-100 font-normal mt-0.5">
                        Get 250 free verification scans. No credit card or contract required.
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFreeTrialDrawerOpen(true);
                    }}
                    className="flex-shrink-0 bg-white hover:bg-slate-100 text-blue-600 font-bold px-6 py-3 rounded-2xl text-xs uppercase tracking-wider transition-colors shadow-sm active:scale-95 cursor-pointer group-hover:scale-105"
                  >
                    Try for Free →
                  </button>
                </div>
              </div>
            </div>

            {/* Grid Container (3 Columns: Business, Business Pro, Enterprise) */}
            <div className="max-w-7xl mx-auto px-6 pt-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch w-full">
                
                {/* 1. Business Card */}
                <div className="flex flex-col justify-between p-8 bg-white border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-200/40">
                        For Growing Brands
                      </span>
                      <h3 className="text-2xl font-light text-[#003057] mt-4">Business</h3>
                      <p className="text-xs text-slate-500 mt-2 min-h-8 font-normal leading-relaxed">
                        Scale production protection with dedicated location metrics.
                      </p>
                    </div>

                    {/* Price Section */}
                    <div className="text-[#003057]">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-slate-400 text-sm line-through font-normal">
                          ₹{isAnnual ? '60,000' : '5,500'}
                        </span>
                        <span className="text-base font-bold">₹</span>
                        <span className="text-4xl font-extrabold tracking-tight">
                          {businessTotalCost.toLocaleString('en-IN')}
                        </span>
                        <span className="text-slate-400 text-xs ml-1">
                          /{isAnnual ? 'yr' : 'mo'}
                        </span>
                      </div>
                      <p className="text-[10px] text-blue-600 font-normal mt-1">
                        +18% GST (regulatory charge)
                      </p>
                    </div>

                    {/* Interactive Sizing Block */}
                    <div className="space-y-3.5 pt-2">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Team Members
                        </label>
                        <div className="flex items-center bg-slate-100 rounded-xl p-1.5 w-full justify-between">
                          <button 
                            onClick={() => setBusinessUsers(Math.max(5, businessUsers - 5))}
                            className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 active:scale-95 disabled:opacity-50 cursor-pointer"
                            disabled={businessUsers <= 5}
                          >
                            –
                          </button>
                          <span className="text-xs font-medium text-slate-800 font-sans">
                            {businessUsers} users
                          </span>
                          <button 
                            onClick={() => setBusinessUsers(businessUsers + 5)}
                            className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 active:scale-95 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          SKUs Count Limits
                        </label>
                        <select 
                          value={businessSKUs}
                          onChange={(e) => setBusinessSKUs(Number(e.target.value))}
                          className="w-full bg-slate-100 text-slate-800 border-none rounded-xl p-3.5 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                          <option value={25}>25 SKUs (included)</option>
                          <option value={35}>35 SKUs (+{isAnnual ? '₹10,000/yr' : '₹900/mo'})</option>
                          <option value={75}>75 SKUs (+{isAnnual ? '₹45,000/yr' : '₹4,000/mo'})</option>
                        </select>
                      </div>
                    </div>


                  </div>

                  <button 
                    onClick={() => handleSelectPlan('business')}
                    className="mt-8 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all duration-200 text-xs tracking-wider uppercase shadow-md cursor-pointer"
                  >
                    Select Business
                  </button>
                </div>

                {/* 2. Business Pro (Highlighted Dark popular card) */}
                <div className="flex flex-col justify-between p-8 bg-[#0a0f1d] text-white border-2 border-blue-500 rounded-3xl shadow-xl scale-[1.02] relative z-10 transition-all duration-300 hover:scale-[1.04]">
                  {/* Popular tag badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase shadow-md border border-blue-400/30">
                    Most Popular
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 bg-blue-900/40 px-3 py-1 rounded-md border border-blue-500/20">
                        Full Supply Protection
                      </span>
                      <h3 className="text-2xl font-light text-white mt-4">Business Pro</h3>
                      <p className="text-xs text-slate-400 mt-2 min-h-8 font-normal leading-relaxed">
                        Enterprise tracking, advanced heatmaps, and webhook integrations.
                      </p>
                    </div>

                    {/* Price Section */}
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-slate-500 text-sm line-through font-normal">
                          ₹{isAnnual ? '2,75,000' : '25,000'}
                        </span>
                        <span className="text-base font-bold">₹</span>
                        <span className="text-4xl font-extrabold tracking-tight text-white">
                          {proTotalCost.toLocaleString('en-IN')}
                        </span>
                        <span className="text-slate-400 text-xs ml-1">
                          /{isAnnual ? 'yr' : 'mo'}
                        </span>
                      </div>
                      <p className="text-[10px] text-blue-400 font-normal mt-1">
                        +18% GST (regulatory charge)
                      </p>
                    </div>

                    {/* Interactive Sizing Blocks */}
                    <div className="space-y-3.5 pt-2">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Team Members
                        </label>
                        <div className="flex items-center bg-slate-800 border border-slate-700/50 rounded-xl p-1.5 w-full justify-between">
                          <button 
                            onClick={() => setProUsers(Math.max(50, proUsers - 5))}
                            className="w-8 h-8 rounded-lg bg-slate-700 text-white flex items-center justify-center font-bold hover:bg-slate-600 active:scale-95 disabled:opacity-50 cursor-pointer border-none"
                            disabled={proUsers <= 50}
                          >
                            –
                          </button>
                          <span className="text-xs font-medium text-white font-sans">
                            {proUsers} users
                          </span>
                          <button 
                            onClick={() => setProUsers(proUsers + 5)}
                            className="w-8 h-8 rounded-lg bg-slate-700 text-white flex items-center justify-center font-bold hover:bg-slate-600 active:scale-95 cursor-pointer border-none"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          SKUs Count Limits
                        </label>
                        <select 
                          value={proSKUs}
                          onChange={(e) => setProSKUs(Number(e.target.value))}
                          className="w-full bg-slate-800 text-white border border-slate-700/50 rounded-xl p-3.5 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                          <option value={500}>500 SKUs (included)</option>
                          <option value={510}>510 SKUs (+{isAnnual ? '₹10,000/yr' : '₹900/mo'})</option>
                          <option value={550}>550 SKUs (+{isAnnual ? '₹45,000/yr' : '₹4,000/mo'})</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Brands Registry
                        </label>
                        <div className="flex items-center bg-slate-800 border border-slate-700/50 rounded-xl p-1.5 w-full justify-between">
                          <button 
                            onClick={() => setProBrands(Math.max(5, proBrands - 1))}
                            className="w-8 h-8 rounded-lg bg-slate-700 text-white flex items-center justify-center font-bold hover:bg-slate-600 active:scale-95 disabled:opacity-50 cursor-pointer border-none"
                            disabled={proBrands <= 5}
                          >
                            –
                          </button>
                          <span className="text-xs font-medium text-white font-sans">
                            {proBrands} brands
                          </span>
                          <button 
                            onClick={() => setProBrands(proBrands + 1)}
                            className="w-8 h-8 rounded-lg bg-slate-700 text-white flex items-center justify-center font-bold hover:bg-slate-600 active:scale-95 cursor-pointer border-none"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>


                  </div>

                  <button 
                    onClick={() => handleSelectPlan('pro')}
                    className="mt-8 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all duration-200 text-xs tracking-wider uppercase shadow-lg shadow-blue-500/20 cursor-pointer border-none"
                  >
                    Select Business Pro
                  </button>
                </div>

                {/* 3. Enterprise Card */}
                <div className="flex flex-col justify-between p-8 bg-white border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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

                    {/* Price Section */}
                    <div className="flex items-baseline gap-1 text-[#003057]">
                      <span className="text-3xl font-extrabold tracking-tight">Custom</span>
                    </div>

                    {/* Interactive Input Mock Blocks */}
                    <div className="space-y-3 pt-2">
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between opacity-75">
                        <span className="text-xs text-slate-400 font-semibold uppercase">Users limit</span>
                        <span className="text-sm font-semibold text-blue-600 font-sans">Unlimited</span>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between opacity-75">
                        <span className="text-xs text-slate-400 font-semibold uppercase">SKUs limit</span>
                        <span className="text-sm font-semibold text-blue-600 font-sans">Unlimited</span>
                      </div>
                    </div>


                  </div>

                  <button 
                    onClick={() => handleSelectPlan('enterprise')}
                    className="mt-8 w-full py-4 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-2xl transition-all duration-200 text-xs tracking-wider uppercase cursor-pointer"
                  >
                    Contact Sales
                  </button>
                </div>

              </div>
            </div>

            {/* Features Comparison Table */}
            <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
              <div className="text-center space-y-4 mb-12">
                <h3 className="text-3xl font-light text-[#003057] tracking-tight">
                  Compare Plan Features in Detail
                </h3>
                <p className="text-slate-500 text-sm max-w-xl mx-auto">
                  Find the exact feature fit for your packaging validation and product tracking goals.
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-sm">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/75">
                      <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-400 w-1/4">Features Matrix</th>
                      <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-400 text-center w-3/16">Free Trial</th>
                      <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-400 text-center w-3/16">Business</th>
                      <th className="p-5 text-xs font-bold uppercase tracking-wider text-blue-600 text-center w-3/16 bg-blue-50/30 border-x border-blue-200/40">Business Pro</th>
                      <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-400 text-center w-3/16">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150">
                    
                    {/* Section: Pricing & Billing */}
                    <tr className="bg-slate-50/30">
                      <td colSpan={5} className="p-4 text-xs font-extrabold text-[#003057] tracking-wide uppercase bg-slate-100/40">
                        Pricing & Terms
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4.5 text-xs font-semibold text-slate-700">Annual base cost (excl. GST)</td>
                      <td className="p-4.5 text-xs text-slate-500 text-center">₹0</td>
                      <td className="p-4.5 text-xs text-slate-650 font-medium text-center">₹55,000</td>
                      <td className="p-4.5 text-xs text-blue-700 font-bold text-center bg-blue-50/20 border-x border-blue-200/20">₹2,45,000</td>
                      <td className="p-4.5 text-xs text-slate-700 font-semibold text-center">Contact Sales</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4.5 text-xs font-semibold text-slate-700">Monthly option</td>
                      <td className="p-4.5 text-xs text-slate-400 text-center">—</td>
                      <td className="p-4.5 text-xs text-slate-400 text-center">N/A</td>
                      <td className="p-4.5 text-xs text-slate-400 text-center bg-blue-50/20 border-x border-blue-200/20">N/A</td>
                      <td className="p-4.5 text-xs text-slate-600 text-center">Custom</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4.5 text-xs font-semibold text-slate-700">Billing commitment</td>
                      <td className="p-4.5 text-xs text-slate-500 text-center">14-day trial</td>
                      <td className="p-4.5 text-xs text-slate-500 text-center">1 year</td>
                      <td className="p-4.5 text-xs text-slate-550 text-center bg-blue-50/20 border-x border-blue-200/20">1 year</td>
                      <td className="p-4.5 text-xs text-slate-550 text-center">Custom</td>
                    </tr>

                    {/* Section: Capacity Limits */}
                    <tr className="bg-slate-50/30">
                      <td colSpan={5} className="p-4 text-xs font-extrabold text-[#003057] tracking-wide uppercase bg-slate-100/40">
                        Operational Capacity Limits
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4.5 text-xs font-semibold text-slate-700">Brand Registries included</td>
                      <td className="p-4.5 text-xs text-slate-500 text-center">1 brand</td>
                      <td className="p-4.5 text-xs text-slate-500 text-center">1 brand</td>
                      <td className="p-4.5 text-xs text-blue-700 font-bold text-center bg-blue-50/20 border-x border-blue-200/20">5 brands <span className="text-[9px] font-normal text-slate-400 block mt-0.5">(extendable)</span></td>
                      <td className="p-4.5 text-xs text-slate-700 font-semibold text-center">Unlimited</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4.5 text-xs font-semibold text-slate-700">SKU Count capacity</td>
                      <td className="p-4.5 text-xs text-slate-500 text-center">1 SKU</td>
                      <td className="p-4.5 text-xs text-slate-500 text-center">25 SKUs <span className="text-[9px] font-normal text-slate-400 block mt-0.5">(extendable)</span></td>
                      <td className="p-4.5 text-xs text-blue-700 font-bold text-center bg-blue-50/20 border-x border-blue-200/20">500 SKUs <span className="text-[9px] font-normal text-slate-400 block mt-0.5">(extendable)</span></td>
                      <td className="p-4.5 text-xs text-slate-700 font-semibold text-center">Unlimited</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4.5 text-xs font-semibold text-slate-700">Team user seats</td>
                      <td className="p-4.5 text-xs text-slate-500 text-center">1 user</td>
                      <td className="p-4.5 text-xs text-slate-500 text-center">5 users <span className="text-[9px] font-normal text-slate-400 block mt-0.5">(extendable)</span></td>
                      <td className="p-4.5 text-xs text-blue-700 font-bold text-center bg-blue-50/20 border-x border-blue-200/20">50 users <span className="text-[9px] font-normal text-slate-400 block mt-0.5">(extendable)</span></td>
                      <td className="p-4.5 text-xs text-slate-700 font-semibold text-center">Unlimited</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4.5 text-xs font-semibold text-slate-700">Product verifications (Annual)</td>
                      <td className="p-4.5 text-xs text-slate-500 text-center">250 scans</td>
                      <td className="p-4.5 text-xs text-slate-500 text-center">100,000 scans</td>
                      <td className="p-4.5 text-xs text-blue-700 font-bold text-center bg-blue-50/20 border-x border-blue-200/20">Unlimited <span className="text-[9px] font-normal text-slate-400 block mt-0.5">(fair use)</span></td>
                      <td className="p-4.5 text-xs text-slate-700 font-semibold text-center">Unlimited</td>
                    </tr>

                    {/* Section: Features */}
                    <tr className="bg-slate-50/30">
                      <td colSpan={5} className="p-4 text-xs font-extrabold text-[#003057] tracking-wide uppercase bg-slate-100/40">
                        Feature Modules
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4.5 text-xs font-semibold text-slate-700">Unique Authentiq QR Generator</td>
                      <td className="p-4.5 text-center"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                      <td className="p-4.5 text-center"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                      <td className="p-4.5 text-center bg-blue-50/20 border-x border-blue-200/20"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                      <td className="p-4.5 text-center"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4.5 text-xs font-semibold text-slate-700">AI authenticity scoring (OpenCLIP)</td>
                      <td className="p-4.5 text-center"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                      <td className="p-4.5 text-center"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                      <td className="p-4.5 text-center bg-blue-50/20 border-x border-blue-200/20"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                      <td className="p-4.5 text-center"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4.5 text-xs font-semibold text-slate-700">Mobile scan & verify page UI</td>
                      <td className="p-4.5 text-center"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                      <td className="p-4.5 text-center"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                      <td className="p-4.5 text-center bg-blue-50/20 border-x border-blue-200/20"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                      <td className="p-4.5 text-center"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4.5 text-xs font-semibold text-slate-700">Report counterfeit & brand callback</td>
                      <td className="p-4.5 text-center"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                      <td className="p-4.5 text-center"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                      <td className="p-4.5 text-center bg-blue-50/20 border-x border-blue-200/20"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                      <td className="p-4.5 text-center"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                    </tr>

                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4.5 text-xs font-semibold text-slate-700">Location intelligence & geocodes</td>
                      <td className="p-4.5 text-center"><span className="text-rose-500 font-extrabold text-base">✗</span></td>
                      <td className="p-4.5 text-xs text-slate-500 text-center">Region-level</td>
                      <td className="p-4.5 text-xs text-blue-700 font-bold text-center bg-blue-50/20 border-x border-blue-200/20">Full heatmaps</td>
                      <td className="p-4.5 text-xs text-slate-700 font-semibold text-center">Full logistics</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4.5 text-xs font-semibold text-slate-700">CSV / Excel import & export</td>
                      <td className="p-4.5 text-center"><span className="text-rose-500 font-extrabold text-base">✗</span></td>
                      <td className="p-4.5 text-center"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                      <td className="p-4.5 text-center bg-blue-50/20 border-x border-blue-200/20"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                      <td className="p-4.5 text-center"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4.5 text-xs font-semibold text-slate-700">Bulk serialization QR engine</td>
                      <td className="p-4.5 text-center"><span className="text-rose-500 font-extrabold text-base">✗</span></td>
                      <td className="p-4.5 text-center"><span className="text-rose-500 font-extrabold text-base">✗</span></td>
                      <td className="p-4.5 text-center bg-blue-50/20 border-x border-blue-200/20"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                      <td className="p-4.5 text-center"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4.5 text-xs font-semibold text-slate-700">Advanced security telemetry</td>
                      <td className="p-4.5 text-center"><span className="text-rose-500 font-extrabold text-base">✗</span></td>
                      <td className="p-4.5 text-center"><span className="text-rose-500 font-extrabold text-base">✗</span></td>
                      <td className="p-4.5 text-center bg-blue-50/20 border-x border-blue-200/20"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                      <td className="p-4.5 text-center"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4.5 text-xs font-semibold text-slate-700">Case & report registry</td>
                      <td className="p-4.5 text-xs text-slate-500 text-center font-medium">Basic</td>
                      <td className="p-4.5 text-center"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                      <td className="p-4.5 text-center bg-blue-50/20 border-x border-blue-200/20"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                      <td className="p-4.5 text-center"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4.5 text-xs font-semibold text-slate-700">Integrations API & Webhooks</td>
                      <td className="p-4.5 text-center"><span className="text-rose-500 font-extrabold text-base">✗</span></td>
                      <td className="p-4.5 text-center"><span className="text-rose-500 font-extrabold text-base">✗</span></td>
                      <td className="p-4.5 text-center bg-blue-50/20 border-x border-blue-200/20"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                      <td className="p-4.5 text-center"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4.5 text-xs font-semibold text-slate-700">SSO & Custom User Roles</td>
                      <td className="p-4.5 text-center"><span className="text-rose-500 font-extrabold text-base">✗</span></td>
                      <td className="p-4.5 text-center"><span className="text-rose-500 font-extrabold text-base">✗</span></td>
                      <td className="p-4.5 text-center bg-blue-50/20 border-x border-blue-200/20"><span className="text-rose-500 font-extrabold text-base">✗</span></td>
                      <td className="p-4.5 text-center"><span className="text-emerald-500 font-extrabold text-base">✓</span></td>
                    </tr>

                    {/* Section: Support */}
                    <tr className="bg-slate-50/30">
                      <td colSpan={5} className="p-4 text-xs font-extrabold text-[#003057] tracking-wide uppercase bg-slate-100/40">
                        Support & Onboarding
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4.5 text-xs font-semibold text-slate-700">Customer Support channel</td>
                      <td className="p-4.5 text-center"><span className="text-rose-500 font-extrabold text-base">✗</span></td>
                      <td className="p-4.5 text-xs text-slate-500 text-center">Standard Email</td>
                      <td className="p-4.5 text-xs text-blue-700 font-bold text-center bg-blue-50/20 border-x border-blue-200/20">Priority support</td>
                      <td className="p-4.5 text-xs text-slate-700 font-semibold text-center">Dedicated CSM + SLA</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4.5 text-xs font-semibold text-slate-700">Credit card required to start</td>
                      <td className="p-4.5 text-xs text-slate-600 font-medium text-center">No</td>
                      <td className="p-4.5 text-xs text-slate-400 text-center">—</td>
                      <td className="p-4.5 text-xs text-slate-400 text-center bg-blue-50/20 border-x border-blue-200/20">—</td>
                      <td className="p-4.5 text-xs text-slate-400 text-center">—</td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>

            {/* Below Fold Info Block */}
            <div className="w-full bg-[#f8fafc] py-20 text-slate-800 mt-28 border-t border-slate-200/50">
              <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-6 space-y-6 text-left">
                  <h2 className="text-4xl font-light tracking-tight text-[#003057] leading-tight">
                    Professional Tracking <br />
                    <span className="text-blue-600 font-medium">Ownership Standards</span>
                  </h2>
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
                    We don't just generate codes; we secure your infrastructure footprint. Our commitment to factory-grade dynamic verification logic ensures that every project meets the highest standards of stability and long-term ledger integrity.
                  </p>
                  
                  <div className="space-y-3 pt-2 font-normal">
                    <div className="flex items-center gap-3 text-sm text-[#003057]">
                      <span className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 text-xs font-normal">✓</span>
                      Tier-1 Cryptographic QR Generation
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#003057]">
                      <span className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 text-xs font-normal">✓</span>
                      Real-time Performance Metrics Auditing
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="w-full h-80 rounded-3xl overflow-hidden bg-cover bg-center border border-slate-200"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200')` }}
                  />
                </div>

              </div>
            </div>

            {/* --- SLIDING DRAWER SYSTEM FOR FREE TRIAL --- */}
            {/* Drawer Backdrop Overlay */}
            <div 
              className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
                isFreeTrialDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
              onClick={() => setIsFreeTrialDrawerOpen(false)}
            />
            
            {/* Drawer Panel */}
            <div 
              className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col justify-between p-8 border-l border-slate-200 text-left ${
                isFreeTrialDrawerOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              {/* Close Button Header */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Free Option
                </span>
                <button 
                  onClick={() => setIsFreeTrialDrawerOpen(false)}
                  className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 cursor-pointer focus:outline-none border-none bg-transparent"
                >
                  ✕
                </button>
              </div>
              
              {/* Drawer Content Body */}
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

                {/* Price Section */}
                <div className="flex items-baseline gap-1 text-[#003057]">
                  <span className="text-base font-bold">₹</span>
                  <span className="text-5xl font-extrabold tracking-tight">0</span>
                  <span className="text-slate-400 text-xs ml-1">/ forever</span>
                </div>

                {/* Static Mock Blocks */}
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

      case 'billing': {
        const taxRate = 0.18;
        const calculatedTax = selectedPlan.price * taxRate;
        const totalAmount = selectedPlan.price + calculatedTax;
        
        return (
          <div data-theme="light" className="min-h-screen bg-slate-50 pt-36 pb-24 px-4 sm:px-6 lg:px-8 text-slate-800 animate-fadeIn relative font-sans">
            
            {/* Main Double Column Content */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Form & Stepper Stepped Interface */}
              <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl shadow-xl p-8 sm:p-10 space-y-8 text-left">
                
                {/* Visual Stepper Header */}
                <div className="border-b border-slate-150 pb-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-200/40">
                        SaaS Registration Gate
                      </span>
                      <h2 className="text-3xl font-light text-[#003057] mt-3">Account Verification Setup</h2>
                      <p className="text-xs text-slate-500 mt-1 font-normal">Complete compliance details to sync your brand credentials.</p>
                    </div>
                    
                    {/* Active Step Indicator pill */}
                    <div className="bg-[#003057] text-white px-4.5 py-1.5 rounded-full text-xs font-semibold tracking-wider">
                      Step {checkoutStep} of 4
                    </div>
                  </div>

                  {/* Progressive Horizontal Stepper Bar */}
                  <div className="relative flex items-center justify-between w-full mt-8">
                    {/* Background Progress Track Line */}
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 z-0" />
                    
                    {/* Active Progress Track Line */}
                    <div 
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-blue-600 z-0 transition-all duration-500" 
                      style={{ width: `${((checkoutStep - 1) / 3) * 100}%` }}
                    />
                    
                    {/* Steps List */}
                    {[
                      { s: 1, label: 'Company' },
                      { s: 2, label: 'Contact' },
                      { s: 3, label: 'Compliance' },
                      { s: 4, label: 'Payment' }
                    ].map((stepItem) => {
                      const isActive = checkoutStep >= stepItem.s;
                      const isCurrent = checkoutStep === stepItem.s;
                      return (
                        <div key={stepItem.s} className="flex flex-col items-center z-10 relative">
                          <button
                            type="button"
                            onClick={() => {
                              // Allow moving to a step only if valid up to that point
                              let valid = true;
                              for (let i = 1; i < stepItem.s; i++) {
                                if (!validateStep(i)) {
                                  valid = false;
                                  break;
                                }
                              }
                              if (valid || stepItem.s < checkoutStep) {
                                setCheckoutStep(stepItem.s);
                                setErrors({});
                              }
                            }}
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all duration-300 cursor-pointer ${
                              isCurrent 
                                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20 scale-110' 
                                : isActive 
                                  ? 'bg-blue-50 border-blue-600 text-blue-600' 
                                  : 'bg-white border-slate-300 text-slate-400'
                            }`}
                          >
                            {isActive && checkoutStep > stepItem.s ? '✓' : stepItem.s}
                          </button>
                          <span className={`text-[10px] mt-2 font-bold uppercase tracking-wider hidden sm:block ${
                            isCurrent ? 'text-blue-600' : isActive ? 'text-slate-700' : 'text-slate-450'
                          }`}>
                            {stepItem.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Form fields depending on Step */}
                
                {/* Step 1: Company Details */}
                {checkoutStep === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Legal Company Name *</label>
                        <input 
                          type="text" 
                          value={legalName}
                          onChange={(e) => setLegalName(e.target.value)}
                          placeholder="Acme Brands Private Limited" 
                          className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.legalName ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                        />
                        {errors.legalName && <p className="text-[10px] text-red-500 font-medium">{errors.legalName}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Company Type *</label>
                        <select 
                          value={companyType}
                          onChange={(e) => setCompanyType(e.target.value)}
                          className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-sans transition-colors cursor-pointer ${errors.companyType ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                        >
                          <option value="">Select Type</option>
                          <option value="Pvt Ltd">Pvt Ltd</option>
                          <option value="LLP">LLP</option>
                          <option value="Proprietorship">Proprietorship</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Public Ltd">Public Ltd</option>
                        </select>
                        {errors.companyType && <p className="text-[10px] text-red-500 font-medium">{errors.companyType}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">GSTIN *</label>
                        <input 
                          type="text" 
                          value={gstin}
                          onChange={(e) => setGstin(e.target.value)}
                          placeholder="27AAAAA1111A1Z1" 
                          className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.gstin ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                        />
                        {errors.gstin && <p className="text-[10px] text-red-500 font-medium">{errors.gstin}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">PAN *</label>
                        <input 
                          type="text" 
                          value={pan}
                          onChange={(e) => setPan(e.target.value)}
                          placeholder="ABCDE1234F" 
                          className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.pan ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                        />
                        {errors.pan && <p className="text-[10px] text-red-500 font-medium">{errors.pan}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-550">CIN (Corporate ID)</label>
                        <input 
                          type="text" 
                          value={cin}
                          onChange={(e) => setCin(e.target.value)}
                          placeholder="U12345MH2026PTC123456" 
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Registered Address Line 1 *</label>
                      <input 
                        type="text" 
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        placeholder="Floor 4, Block B, Tech Hub Complex" 
                        className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.addressLine1 ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                      />
                      {errors.addressLine1 && <p className="text-[10px] text-red-500 font-medium">{errors.addressLine1}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-555">Registered Address Line 2</label>
                      <input 
                        type="text" 
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        placeholder="Industrial Area, Phase II" 
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">City *</label>
                        <input 
                          type="text" 
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Mumbai" 
                          className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.city ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                        />
                        {errors.city && <p className="text-[10px] text-red-500 font-medium">{errors.city}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">State *</label>
                        <select
                          value={stateName}
                          onChange={(e) => setStateName(e.target.value)}
                          className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-sans transition-colors cursor-pointer ${errors.stateName ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                        >
                          <option value="">Select State</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Telangana">Telangana</option>
                          <option value="West Bengal">West Bengal</option>
                        </select>
                        {errors.stateName && <p className="text-[10px] text-red-500 font-medium">{errors.stateName}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">PIN Code *</label>
                        <input 
                          type="text" 
                          value={pinCode}
                          onChange={(e) => setPinCode(e.target.value)}
                          placeholder="400001" 
                          maxLength={6}
                          className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.pinCode ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                        />
                        {errors.pinCode && <p className="text-[10px] text-red-500 font-medium">{errors.pinCode}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Country</label>
                        <input 
                          type="text" 
                          value={country}
                          readOnly
                          className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-500 font-normal transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Industry / Sector *</label>
                        <select 
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-sans transition-colors cursor-pointer ${errors.industry ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                        >
                          <option value="">Select Sector</option>
                          <option value="FMCG">FMCG / Food / Retail</option>
                          <option value="Pharma">Pharma / Healthcare</option>
                          <option value="Agro">Agro / Chemicals</option>
                          <option value="Liquor">Liquor / Alcohol</option>
                          <option value="Electronics">Electronics / Hardware</option>
                          <option value="Manufacturing">Heavy Manufacturing</option>
                          <option value="Other">Other Services</option>
                        </select>
                        {errors.industry && <p className="text-[10px] text-red-500 font-medium">{errors.industry}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-555">Company Website</label>
                        <input 
                          type="url" 
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="https://www.acmebrands.com" 
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Contact Details */}
                {checkoutStep === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Full Name *</label>
                        <input 
                          type="text" 
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="John Doe" 
                          className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                        />
                        {errors.fullName && <p className="text-[10px] text-red-500 font-medium">{errors.fullName}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Work Email *</label>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@acmebrands.com" 
                          className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                        />
                        {errors.email && <p className="text-[10px] text-red-500 font-medium">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Mobile Number *</label>
                        <div className="flex gap-2 relative">
                          <span className="flex items-center bg-slate-100 border border-slate-200 rounded-xl px-3 text-slate-500 font-sans text-sm font-semibold select-none">
                            +91
                          </span>
                          <input 
                            type="tel" 
                            value={phone}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\D/g, '');
                              setPhone(v);
                              setIsOtpVerified(false); // require re-verification on change
                            }}
                            placeholder="9876543210" 
                            maxLength={10}
                            className={`flex-1 bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                          />
                        </div>
                        {errors.phone && <p className="text-[10px] text-red-500 font-medium">{errors.phone}</p>}
                      </div>

                      <div className="h-full">
                        {isOtpVerified ? (
                          <div className="w-full flex items-center justify-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-600 py-3 rounded-xl font-bold text-xs uppercase tracking-wider select-none">
                            <span>Verified ✓</span>
                          </div>
                        ) : (
                          <button 
                            type="button"
                            onClick={() => {
                              if (!phone || phone.trim().length !== 10) {
                                setErrors({ ...errors, phone: 'Enter a valid 10-digit mobile number first' });
                                return;
                              }
                              setErrors({});
                              setIsOtpSent(true);
                              setShowOtpPopup(true);
                            }}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md shadow-blue-500/10"
                          >
                            {isOtpSent ? 'Resend OTP' : 'Verify Mobile'}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-550">Designation / Role *</label>
                      <input 
                        type="text" 
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="Director / Brand Manager / Operations Manager" 
                        className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.designation ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                      />
                      {errors.designation && <p className="text-[10px] text-red-500 font-medium">{errors.designation}</p>}
                    </div>

                    {/* Interactive OTP Simulator Dialog Modal */}
                    {showOtpPopup && (
                      <div className="fixed inset-0 z-55 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-sm w-full space-y-6 text-center shadow-2xl border border-slate-100 animate-fadeIn">
                          <div>
                            <span className="text-xl">💬</span>
                            <h3 className="text-lg font-bold text-[#003057] mt-3">SMS Verification Simulator</h3>
                            <p className="text-xs text-slate-500 mt-1.5 font-normal">
                              We sent a verification SMS to <span className="font-semibold text-slate-800">+91 {phone}</span>.
                            </p>
                          </div>
                          
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-left text-xs text-blue-700 space-y-1">
                            <span className="font-bold">⚠️ Test Simulator Hint:</span>
                            <p className="font-normal">Enter code <span className="font-black underline tracking-widest text-blue-900 font-sans">1234</span> to successfully complete OTP validation.</p>
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider text-left">4-Digit Security OTP</label>
                            <input 
                              type="text" 
                              maxLength={4}
                              value={otpInput}
                              onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                              placeholder="0 0 0 0" 
                              className="w-full text-center text-xl font-bold tracking-[0.75em] bg-slate-50 border border-slate-200 rounded-xl py-3.5 focus:outline-none focus:border-blue-600 font-mono text-slate-800 placeholder-slate-300"
                            />
                            {errors.otp && <p className="text-[10px] text-red-500 font-semibold">{errors.otp}</p>}
                          </div>

                          <div className="flex gap-3 pt-2">
                            <button 
                              type="button"
                              onClick={() => {
                                setShowOtpPopup(false);
                                setOtpInput('');
                                setErrors({});
                              }}
                              className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-500 font-semibold py-3 rounded-xl text-xs uppercase transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button 
                              type="button"
                              onClick={() => {
                                if (otpInput === '1234') {
                                  setIsOtpVerified(true);
                                  setShowOtpPopup(false);
                                  setOtpInput('');
                                  setErrors({});
                                } else {
                                  setErrors({ otp: 'Invalid OTP code. Please enter 1234.' });
                                }
                              }}
                              className="flex-1 bg-[#00b074] hover:bg-[#009660] text-white font-bold py-3 rounded-xl text-xs uppercase transition-colors cursor-pointer shadow-md shadow-[#00b074]/10"
                            >
                              Verify Code
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Trademark & Compliance Docs */}
                {checkoutStep === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-550">Trademark Registry Status</label>
                        <select 
                          value={tmStatus}
                          onChange={(e) => setTmStatus(e.target.value)}
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-sans transition-colors cursor-pointer"
                        >
                          <option value="">Select Status</option>
                          <option value="Registered">Registered</option>
                          <option value="Applied">Applied & Awaiting</option>
                          <option value="Pending">Pending Litigation</option>
                          <option value="Not Applied">Not Applied</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-555">TM Application Number</label>
                        <input 
                          type="text" 
                          value={tmNumber}
                          onChange={(e) => setTmNumber(e.target.value)}
                          placeholder="TM-987654321" 
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400"
                        />
                      </div>
                    </div>

                    <div className="border-t border-slate-150 pt-6 space-y-5">
                      <h3 className="text-sm font-semibold text-[#003057] uppercase tracking-wider">Required Verification Certificates</h3>
                      
                      {/* Document upload grids with dashed borders and click triggers */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* GST Certificate */}
                        <div className="space-y-2">
                          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">GST Certificate PDF *</label>
                          <div 
                            className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-slate-50/50 ${
                              gstCertFile ? 'border-emerald-500 bg-emerald-50/10' : errors.gstCertFile ? 'border-red-500 bg-red-50/5' : 'border-slate-200'
                            }`}
                            onClick={() => {
                              const name = `gst_certificate_${legalName.toLowerCase().replace(/\s+/g, '_') || 'company'}.pdf`;
                              setGstCertFile(name);
                              setErrors({ ...errors, gstCertFile: '' });
                            }}
                          >
                            <span className="text-xl mb-1.5">{gstCertFile ? '📄' : '📁'}</span>
                            <span className="text-xs font-semibold text-slate-700">
                              {gstCertFile ? gstCertFile : 'GST_Registration.pdf'}
                            </span>
                            <span className="text-[10px] text-slate-450 mt-1 font-normal">
                              {gstCertFile ? 'Ready to upload ✓' : 'Click to simulate PDF attachment'}
                            </span>
                          </div>
                          {errors.gstCertFile && <p className="text-[10px] text-red-500 font-medium">{errors.gstCertFile}</p>}
                        </div>

                        {/* Incorporation Certificate */}
                        <div className="space-y-2">
                          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Certificate of Incorporation PDF *</label>
                          <div 
                            className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-slate-50/50 ${
                              incDocFile ? 'border-emerald-500 bg-emerald-50/10' : errors.incDocFile ? 'border-red-500 bg-red-50/5' : 'border-slate-200'
                            }`}
                            onClick={() => {
                              const name = `certificate_of_incorporation_${legalName.toLowerCase().replace(/\s+/g, '_') || 'company'}.pdf`;
                              setIncDocFile(name);
                              setErrors({ ...errors, incDocFile: '' });
                            }}
                          >
                            <span className="text-xl mb-1.5">{incDocFile ? '📄' : '📁'}</span>
                            <span className="text-xs font-semibold text-slate-700">
                              {incDocFile ? incDocFile : 'Incorporation_Document.pdf'}
                            </span>
                            <span className="text-[10px] text-slate-455 mt-1 font-normal">
                              {incDocFile ? 'Ready to upload ✓' : 'Click to simulate PDF attachment'}
                            </span>
                          </div>
                          {errors.incDocFile && <p className="text-[10px] text-red-500 font-medium">{errors.incDocFile}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Optional Trademark / Auth uploads */}
                    <div className="border-t border-slate-150 pt-6 space-y-5">
                      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Additional Supporting Records (Optional)</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* TM App Doc */}
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">TM Application PDF</label>
                          <div 
                            onClick={() => setTmAppFile('trademark_application.pdf')}
                            className={`border rounded-xl p-3 text-center cursor-pointer text-xs font-normal border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2 ${tmAppFile ? 'bg-slate-100 border-slate-350' : ''}`}
                          >
                            <span>📎</span>
                            <span className="truncate max-w-[120px]">{tmAppFile ? tmAppFile : 'Attach File'}</span>
                          </div>
                        </div>

                        {/* TM Cert PDF */}
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">TM Certificate PDF</label>
                          <div 
                            onClick={() => setTmCertFile('trademark_certificate.pdf')}
                            className={`border rounded-xl p-3 text-center cursor-pointer text-xs font-normal border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2 ${tmCertFile ? 'bg-slate-100 border-slate-350' : ''}`}
                          >
                            <span>📎</span>
                            <span className="truncate max-w-[120px]">{tmCertFile ? tmCertFile : 'Attach File'}</span>
                          </div>
                        </div>

                        {/* Brand Auth File */}
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Brand Authorization Letter</label>
                          <div 
                            onClick={() => setBrandAuthFile('brand_authorization.pdf')}
                            className={`border rounded-xl p-3 text-center cursor-pointer text-xs font-normal border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2 ${brandAuthFile ? 'bg-slate-100 border-slate-350' : ''}`}
                          >
                            <span>📎</span>
                            <span className="truncate max-w-[120px]">{brandAuthFile ? brandAuthFile : 'Attach File'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Conditional Industry Document Sections */}
                    {(industry === 'Pharma' || industry === 'FMCG' || industry === 'Liquor') && (
                      <div className="border-t border-slate-150 pt-6 space-y-6 animate-fadeIn">
                        <div className="bg-blue-50/50 border border-blue-200/50 rounded-2xl p-5 flex items-start gap-4">
                          <span className="text-xl">🛡️</span>
                          <div>
                            <h4 className="text-sm font-semibold text-[#003057] uppercase tracking-wide">Sector Compliance Check ({industry})</h4>
                            <p className="text-xs text-slate-500 font-normal mt-0.5">Your industry sector requires mandatory documentation compliance checks to proceed.</p>
                          </div>
                        </div>

                        {/* Pharma: Drug License */}
                        {industry === 'Pharma' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            <div className="space-y-1.5">
                              <label className="block text-xs font-bold uppercase tracking-wider text-slate-555">Drug License Number *</label>
                              <input 
                                type="text" 
                                value={pharmaDrugLicense}
                                onChange={(e) => setPharmaDrugLicense(e.target.value)}
                                placeholder="DL-1234567890" 
                                className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.pharmaDrugLicense ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                              />
                              {errors.pharmaDrugLicense && <p className="text-[10px] text-red-500 font-medium">{errors.pharmaDrugLicense}</p>}
                            </div>

                            <div className="space-y-1.5">
                              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Drug License Copy PDF *</label>
                              <div 
                                onClick={() => {
                                  setPharmaDrugLicenseFile('pharma_drug_license.pdf');
                                  setErrors({ ...errors, pharmaDrugLicenseFile: '' });
                                }}
                                className={`border-2 border-dashed rounded-2xl p-4.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-slate-50/50 ${
                                  pharmaDrugLicenseFile ? 'border-emerald-500 bg-emerald-50/10' : errors.pharmaDrugLicenseFile ? 'border-red-500 bg-red-50/5' : 'border-slate-200'
                                }`}
                              >
                                <span className="text-xs font-semibold text-slate-700 truncate max-w-[150px]">
                                  {pharmaDrugLicenseFile ? pharmaDrugLicenseFile : 'Attach Drug License PDF'}
                                </span>
                                <span className="text-[9px] text-slate-400 mt-0.5">Click to simulate</span>
                              </div>
                              {errors.pharmaDrugLicenseFile && <p className="text-[10px] text-red-500 font-medium">{errors.pharmaDrugLicenseFile}</p>}
                            </div>
                          </div>
                        )}

                        {/* FMCG: FSSAI */}
                        {industry === 'FMCG' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            <div className="space-y-1.5">
                              <label className="block text-xs font-bold uppercase tracking-wider text-slate-555">FSSAI License Number *</label>
                              <input 
                                type="text" 
                                value={fssaiLicense}
                                onChange={(e) => setFssaiLicense(e.target.value)}
                                placeholder="FSSAI-14-Digit-Code" 
                                className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.fssaiLicense ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                              />
                              {errors.fssaiLicense && <p className="text-[10px] text-red-500 font-medium">{errors.fssaiLicense}</p>}
                            </div>

                            <div className="space-y-1.5">
                              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">FSSAI Certificate PDF *</label>
                              <div 
                                onClick={() => {
                                  setFssaiLicenseFile('fssai_compliance_certificate.pdf');
                                  setErrors({ ...errors, fssaiLicenseFile: '' });
                                }}
                                className={`border-2 border-dashed rounded-2xl p-4.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-slate-50/50 ${
                                  fssaiLicenseFile ? 'border-emerald-500 bg-emerald-50/10' : errors.fssaiLicenseFile ? 'border-red-500 bg-red-50/5' : 'border-slate-200'
                                }`}
                              >
                                <span className="text-xs font-semibold text-slate-700 truncate max-w-[150px]">
                                  {fssaiLicenseFile ? fssaiLicenseFile : 'Attach FSSAI PDF'}
                                </span>
                                <span className="text-[9px] text-slate-400 mt-0.5">Click to simulate</span>
                              </div>
                              {errors.fssaiLicenseFile && <p className="text-[10px] text-red-500 font-medium">{errors.fssaiLicenseFile}</p>}
                            </div>
                          </div>
                        )}

                        {/* Liquor: Excise */}
                        {industry === 'Liquor' && (
                          <div className="space-y-1.5">
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Excise & Liquor License PDF Upload *</label>
                            <div 
                              onClick={() => {
                                setExciseLicenseFile('excise_department_license.pdf');
                                setErrors({ ...errors, exciseLicenseFile: '' });
                              }}
                              className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-slate-50/50 ${
                                exciseLicenseFile ? 'border-emerald-500 bg-emerald-50/10' : errors.exciseLicenseFile ? 'border-red-500 bg-red-50/5' : 'border-slate-200'
                              }`}
                            >
                              <span className="text-xl mb-1">📄</span>
                              <span className="text-xs font-semibold text-slate-700">
                                {exciseLicenseFile ? exciseLicenseFile : 'Attach Excise License Copy'}
                              </span>
                              <span className="text-[9px] text-slate-400 mt-1">Required for Liquor & Spirits protection</span>
                            </div>
                            {errors.exciseLicenseFile && <p className="text-[10px] text-red-500 font-medium">{errors.exciseLicenseFile}</p>}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Consent & Payment Selection */}
                {checkoutStep === 4 && (
                  <div className="space-y-6 animate-fadeIn">
                    
                    {/* Consent Tickboxes with custom styled blue indicators */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-[#003057] uppercase tracking-wider">Legal Agreements</h3>
                      
                      {/* 1. ToS Checkbox */}
                      <div 
                        onClick={() => setAgreeTerms(!agreeTerms)}
                        className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200/80 bg-slate-50/40 cursor-pointer hover:bg-slate-50 transition-colors"
                      >
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          agreeTerms ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {agreeTerms && <span className="text-xs font-black">✓</span>}
                        </div>
                        <div className="text-xs text-slate-500 font-normal leading-relaxed">
                          <span className="font-semibold text-[#003057]">I accept the Terms of Service *</span>
                          <p className="mt-0.5">Required to activate operational ledger validation scanning nodes.</p>
                        </div>
                      </div>
                      {errors.agreeTerms && <p className="text-[10px] text-red-500 font-medium pl-10">{errors.agreeTerms}</p>}

                      {/* 2. Privacy Policy */}
                      <div 
                        onClick={() => setAgreePrivacy(!agreePrivacy)}
                        className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200/80 bg-slate-50/40 cursor-pointer hover:bg-slate-50 transition-colors"
                      >
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          agreePrivacy ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {agreePrivacy && <span className="text-xs font-black">✓</span>}
                        </div>
                        <div className="text-xs text-slate-500 font-normal leading-relaxed">
                          <span className="font-semibold text-[#003057]">I accept the Privacy Policy *</span>
                          <p className="mt-0.5">Authorizes database collection profiles and scan coordinate auditing.</p>
                        </div>
                      </div>
                      {errors.agreePrivacy && <p className="text-[10px] text-red-500 font-medium pl-10">{errors.agreePrivacy}</p>}

                      {/* 3. Data-processing Consent */}
                      <div 
                        onClick={() => setAgreeDataProcessing(!agreeDataProcessing)}
                        className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200/80 bg-slate-50/40 cursor-pointer hover:bg-slate-50 transition-colors"
                      >
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          agreeDataProcessing ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {agreeDataProcessing && <span className="text-xs font-black">✓</span>}
                        </div>
                        <div className="text-xs text-slate-500 font-normal leading-relaxed">
                          <span className="font-semibold text-[#003057]">I consent to Data Processing Protocols *</span>
                          <p className="mt-0.5">Agree to secure storage and processing of verification logs in accordance with ISO standards.</p>
                        </div>
                      </div>
                      {errors.agreeDataProcessing && <p className="text-[10px] text-red-500 font-medium pl-10">{errors.agreeDataProcessing}</p>}
                    </div>

                    {/* Gateway Selectors (Only shown if selected plan price > 0) */}
                    {selectedPlan.price > 0 ? (
                      <div className="border-t border-slate-150 pt-6 space-y-4">
                        <h3 className="text-sm font-semibold text-[#003057] uppercase tracking-wider">Select Payment Gateway</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Razorpay */}
                          <div 
                            onClick={() => setPaymentMethod('razorpay')}
                            className={`p-4.5 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                              paymentMethod === 'razorpay' ? 'border-blue-600 bg-blue-50/30' : 'border-slate-200 bg-white hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-4.5 h-4.5 rounded-full border-2 border-blue-600 flex items-center justify-center p-0.5">
                                {paymentMethod === 'razorpay' && <div className="w-full h-full bg-blue-600 rounded-full" />}
                              </div>
                              <div className="text-left">
                                <p className="text-sm font-bold text-slate-800 font-sans">Razorpay Secure</p>
                                <p className="text-[10px] text-slate-400 font-normal mt-0.5">Cards, Netbanking, Wallets</p>
                              </div>
                            </div>
                            <span className="text-xl">💳</span>
                          </div>

                          {/* UPI */}
                          <div 
                            onClick={() => setPaymentMethod('upi')}
                            className={`p-4.5 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                              paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50/30' : 'border-slate-200 bg-white hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-4.5 h-4.5 rounded-full border-2 border-blue-600 flex items-center justify-center p-0.5">
                                {paymentMethod === 'upi' && <div className="w-full h-full bg-blue-600 rounded-full" />}
                              </div>
                              <div className="text-left">
                                <p className="text-sm font-bold text-slate-800 font-sans">UPI / Google Pay</p>
                                <p className="text-[10px] text-slate-400 font-normal mt-0.5">Instant scan and pay node</p>
                              </div>
                            </div>
                            <span className="text-xs font-black bg-purple-100 text-purple-700 px-2 py-0.5 rounded tracking-wide border border-purple-200 font-sans uppercase">UPI</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="border-t border-slate-150 pt-6">
                        <div className="bg-emerald-50 border border-emerald-200/50 rounded-2xl p-5 flex items-start gap-3 text-left">
                          <span className="text-xl">🎁</span>
                          <div>
                            <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wide">Free Trial Account</h4>
                            <p className="text-xs text-emerald-600 font-normal mt-0.5">No credit card or payments required. You will be redirected straight to the dashboard to begin testing.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Processing Payment Overlay Simulation Modal */}
                    {isProcessingPayment && (
                      <div className="fixed inset-0 z-55 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-10 max-w-sm w-full space-y-6 text-center shadow-2xl border border-slate-100 animate-fadeIn">
                          {/* Pulsing transaction circle */}
                          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-2xl mx-auto border border-blue-200/40 relative">
                            <div className="absolute inset-0 bg-blue-400/25 rounded-full animate-ping" />
                            🔒
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-[#003057]">Processing Secure Gateway</h3>
                            <p className="text-xs text-slate-500 mt-2 font-normal leading-relaxed">
                              {selectedPlan.price > 0 
                                ? "Contacting payment nodes and recording subscription ledger metadata..."
                                : "Activating sandbox trial permissions on your vendor namespace..."}
                            </p>
                          </div>
                          <div className="flex items-center justify-center gap-1.5 pt-2">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer Buttons Navigation Row */}
                <div className="border-t border-slate-150 pt-6 flex justify-between gap-4">
                  {checkoutStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setCheckoutStep(checkoutStep - 1);
                        setErrors({});
                      }}
                      className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-[#003057] font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      ← Back
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCurrentPage('plans')}
                      className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-[#003057] font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}

                  {checkoutStep < 4 ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (validateStep(checkoutStep)) {
                          setCheckoutStep(checkoutStep + 1);
                        }
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md shadow-blue-500/15"
                    >
                      Next Step →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (validateStep(4)) {
                          setIsProcessingPayment(true);
                          setTimeout(() => {
                            window.location.href = "http://localhost:3000/vendor/login";
                          }, 2500);
                        }
                      }}
                      className="bg-[#00b074] hover:bg-[#009660] text-white font-extrabold py-4 px-10 rounded-xl text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-lg shadow-[#00b074]/20"
                    >
                      {selectedPlan.price > 0 ? 'Complete Payment & Register' : 'Activate Free Trial'}
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: Billing Summary Card */}
              <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-3xl shadow-lg overflow-hidden lg:sticky lg:top-28 text-left animate-fadeIn">
                <div className="bg-[#003057] p-5.5 text-white text-center border-b border-[#001e36]">
                  <h2 className="text-lg font-light tracking-tight">Invoice Summary</h2>
                  <p className="text-slate-355 text-[10px] font-normal uppercase tracking-wider mt-0.5">Plan Allocation Metrics</p>
                </div>

                <div className="p-6 space-y-6">
                  <div className="bg-white rounded-2xl p-5 border border-slate-150 space-y-4 shadow-sm">
                    <div className="flex justify-between items-center pb-2.5 border-b border-slate-150">
                      <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Tier Name</span>
                      <span className="text-blue-600 font-bold text-xs px-2.5 py-0.5 bg-blue-50 border border-blue-200/50 rounded-md">
                        {selectedPlan.name}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs font-normal">
                      <span className="text-slate-500">Base Plan Charge</span>
                      <span className="text-slate-800 font-bold">₹{selectedPlan.basePrice.toLocaleString('en-IN')}</span>
                    </div>

                    {selectedPlan.extraUsersCost > 0 && (
                      <div className="flex justify-between items-center text-xs font-normal">
                        <span className="text-slate-500">Extra Team Seats (+{selectedPlan.extraUsers} users)</span>
                        <span className="text-slate-800 font-bold">₹{selectedPlan.extraUsersCost.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    {selectedPlan.extraSKUsCost > 0 && (
                      <div className="flex justify-between items-center text-xs font-normal">
                        <span className="text-slate-500">Extra SKUs Capacity</span>
                        <span className="text-slate-800 font-bold">₹{selectedPlan.extraSKUsCost.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    {selectedPlan.extraBrandsCost > 0 && (
                      <div className="flex justify-between items-center text-xs font-normal">
                        <span className="text-slate-500">Extra Brands Registry (+{selectedPlan.extraBrands} brands)</span>
                        <span className="text-slate-800 font-bold">₹{selectedPlan.extraBrandsCost.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-xs font-normal">
                      <span className="text-slate-500">Tax Levy (18% GST)</span>
                      <span className="text-slate-800 font-bold">₹{calculatedTax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-slate-150">
                      <span className="text-blue-600 font-extrabold text-xs uppercase tracking-wider">Gross Total</span>
                      <div className="text-right">
                        <span className="text-xl font-black text-[#003057]">₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        <span className="text-slate-450 text-[10px] font-normal block">
                          /{selectedPlan.interval === 'trial' ? 'trial' : selectedPlan.interval === 'mo' ? 'mo' : 'yr'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Visual trust security badge inside column */}
                  <div className="flex items-center gap-3.5 bg-slate-100/50 border border-slate-200 rounded-xl p-4.5">
                    <span className="text-xl select-none">🔒</span>
                    <p className="text-[10px] text-slate-500 font-normal leading-relaxed">
                      All calculations are secured using 256-bit SSL transaction encryptions and verified against physical ledger validation certificates.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        );
      }
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

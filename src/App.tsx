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

  const [isNavScrolled, setIsNavScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize AOS (Animate On Scroll) dynamic scripts/stylesheets
  useEffect(() => {
    // 1. Inject AOS CSS
    const linkId = 'aos-css';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
      document.head.appendChild(link);
    }

    // 2. Inject AOS JS
    const scriptId = 'aos-js';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
      script.async = true;
      script.onload = () => {
        // @ts-ignore
        if (window.AOS) {
          // @ts-ignore
          window.AOS.init({ once: true });
        }
      };
      document.body.appendChild(script);
    } else {
      // @ts-ignore
      if (window.AOS) {
        // @ts-ignore
        window.AOS.init({ once: true });
      }
    }
  }, [currentPage]);

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
  const [selectedCountry, setSelectedCountry] = useState<string>('India');
  const [isGeolocating, setIsGeolocating] = useState<boolean>(false);
  const [industry, setIndustry] = useState<string>('');
  const [website, setWebsite] = useState<string>('');

  // Step 2: Account Details
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
  const [otpInput, setOtpInput] = useState<string>('');
  const [showOtpPopup, setShowOtpPopup] = useState<boolean>(false);

  const [isEmailOtpSent, setIsEmailOtpSent] = useState<boolean>(false);
  const [isEmailOtpVerified, setIsEmailOtpVerified] = useState<boolean>(false);
  const [emailOtpInput, setEmailOtpInput] = useState<string>('');
  const [showEmailOtpPopup, setShowEmailOtpPopup] = useState<boolean>(false);

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

  // Interactive plan sizing states (Business)
  const [businessUsers, setBusinessUsers] = useState<number>(5);
  const [businessSKUs, setBusinessSKUs] = useState<number>(25);

  // Interactive plan sizing states (Business Pro)
  const [proUsers, setProUsers] = useState<number>(50);
  const [proSKUs, setProSKUs] = useState<number>(500);
  const [proBrands, setProBrands] = useState<number>(5);

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
    setSelectedCountry('India');
    setIndustry('');
    setWebsite('');
    setFullName('');
    setEmail('');
    setPhone('');
    setDesignation('');
    setPassword('');
    setConfirmPassword('');
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
    setBusinessUsers(5);
    setBusinessSKUs(25);
    setProUsers(50);
    setProSKUs(500);
    setProBrands(5);
  };

  const validateStep = (stepId: 'company' | 'contact' | 'addons' | 'compliance' | 'payment'): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepId === 'company') {
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

    if (stepId === 'contact') {
      if (!fullName.trim()) newErrors.fullName = 'Full name is required';

      if (!email.trim()) {
        newErrors.email = 'Work email is required';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
          newErrors.email = 'Invalid email address';
        }
      }

      if (!isEmailOtpVerified) {
        newErrors.email = 'Email OTP verification required';
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

      if (!password.trim()) {
        newErrors.password = 'Account password is required';
      } else if (password.trim().length < 6) {
        newErrors.password = 'Password must be at least 6 characters long';
      }

      if (!confirmPassword.trim()) {
        newErrors.confirmPassword = 'Confirm password is required';
      } else if (password.trim() !== confirmPassword.trim()) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (stepId === 'addons') {
      // Addons don't have validation errors since they are sliders/dropdowns with default values
    }

    if (stepId === 'compliance') {
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

    if (stepId === 'payment') {
      if (!agreeTerms) newErrors.agreeTerms = 'Acceptance required';
      if (!agreePrivacy) newErrors.agreePrivacy = 'Acceptance required';
      if (!agreeDataProcessing) newErrors.agreeDataProcessing = 'Consent required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (selectedPlan.name === 'Business') {
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

      setSelectedPlan(prev => ({
        ...prev,
        price: totalCost,
        basePrice: baseCost,
        extraUsers: extraUsersCount,
        extraUsersCost: extraUsersC,
        extraSKUs: businessSKUs - 25,
        extraSKUsCost: extraSKUsC,
        totalUsers: businessUsers,
        totalSKUs: businessSKUs,
      }));
    } else if (selectedPlan.name === 'Business Pro') {
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

      setSelectedPlan(prev => ({
        ...prev,
        price: totalCost,
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
      }));
    }
  }, [selectedPlan.name, businessUsers, businessSKUs, proUsers, proSKUs, proBrands, isAnnual]);

  // State to track the selected payment method gateway
  const [paymentMethod, setPaymentMethod] = useState<string>('razorpay');

  // FAQ Dropdown state manager index key tracking
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const [logoTheme, setLogoTheme] = useState<'light' | 'dark'>('light');



  // Free Trial side drawer toggle state
  const [isFreeTrialDrawerOpen, setIsFreeTrialDrawerOpen] = useState<boolean>(false);

  // --- REAL-TIME LOCATION API (CountriesNow) ---
  const [countriesList, setCountriesList] = useState<string[]>([]);
  const [statesList, setStatesList] = useState<string[]>([]);
  const [citiesList, setCitiesList] = useState<string[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState<boolean>(false);
  const [isLoadingStates, setIsLoadingStates] = useState<boolean>(false);
  const [isLoadingCities, setIsLoadingCities] = useState<boolean>(false);

  // Fetch all countries once on mount
  useEffect(() => {
    setIsLoadingCountries(true);
    fetch('https://countriesnow.space/api/v0.1/countries/positions')
      .then(r => r.json())
      .then(d => {
        if (d.data) {
          const names: string[] = d.data.map((c: { name: string }) => c.name).sort();
          setCountriesList(names);
          // pre-select India if it's in the list
          if (names.includes('India') && !selectedCountry) setSelectedCountry('India');
        }
      })
      .catch(() => { })
      .finally(() => setIsLoadingCountries(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch states whenever selectedCountry changes
  useEffect(() => {
    if (!selectedCountry) { setStatesList([]); setCitiesList([]); return; }
    setStatesList([]);
    setCitiesList([]);
    setStateName('');
    setCity('');
    setIsLoadingStates(true);
    fetch('https://countriesnow.space/api/v0.1/countries/states', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: selectedCountry }),
    })
      .then(r => r.json())
      .then(d => {
        if (d.data?.states) {
          setStatesList(d.data.states.map((s: { name: string }) => s.name).sort());
        }
      })
      .catch(() => { })
      .finally(() => setIsLoadingStates(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  // Fetch cities whenever stateName changes
  useEffect(() => {
    if (!selectedCountry || !stateName) { setCitiesList([]); return; }
    setCitiesList([]);
    setCity('');
    setIsLoadingCities(true);
    fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: selectedCountry, state: stateName }),
    })
      .then(r => r.json())
      .then(d => {
        if (d.data && Array.isArray(d.data)) {
          setCitiesList((d.data as string[]).sort());
        }
      })
      .catch(() => { })
      .finally(() => setIsLoadingCities(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateName]);

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
                <div className="text-center space-y-4" data-aos="fade-down" data-aos-duration="800">
                  <h2 className="text-3xl font-light text-[#003057] tracking-tight sm:text-4xl">Complete Supply Integrity</h2>
                  <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-normal">Robust operational safety metrics built directly onto decentralised ledger architecture.</p>
                </div>

                {/* Increased layout gap to prevent tight card clutter */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                  <div data-aos="fade-up" data-aos-duration="1000" className="group p-10 bg-slate-50 rounded-3xl shadow-xl space-y-6 border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
                    <div className="w-14 h-14 bg-[#00b074]/10 rounded-2xl flex items-center justify-center border border-[#00b074]/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00b074] group-hover:border-[#00b074] group-hover:shadow-[0_8px_16px_rgba(0,176,116,0.25)]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-[#00b074] transition-colors duration-300 group-hover:text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-[#003057] tracking-tight">Enterprise Fraud Mitigation</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-normal">
                      Protect market share with real-time cloned-code detection systems. Instantly flags and isolates duplicated serialization queries before fake goods clear retail registers.
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
                      Completely aligned with international data protection protocols. Built with fully optimized encryption architecture ensuring complete safety for cross-border logistics distribution networks.
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
                      Plug verification tracking triggers straight into your existing ERP inventory setups, custom apps, or digital billing gateways using secure webhooks.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 2.5: Strategic Vision (2-Column Split Layout, Flat Design, Animated) */}
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
                    { q: "What happens when a counterfeit code signature is detected?", a: "The system triggers a real-time warning dashboard alert to your team, maps the scanning telemetry coordinates, and presents a 'Suspect Warning' screen to the consumer scanning the product." },
                    { q: "How do we verify the authenticity of each individual item?", a: "We assign a unique, tamper-proof dynamic QR code to every single unit, creating a digital twin that verifies the item’s origin and authenticity the moment it is scanned." },
                    { q: "Is special equipment required to scan the Authentiq dynamic QR codes?", a: "No. Our system is designed to work with any standard smartphone camera. We prioritize accessibility, ensuring that consumers, logistics personnel, and retailers can verify authenticity without needing proprietary hardware or apps." }
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

        // Business Pro calculations
        const proBaseCost = isAnnual ? 245000 : 22500;

        return (
          <div data-theme="light" className="animate-fadeIn pt-24 pb-32 bg-slate-50 text-slate-800 relative overflow-x-hidden">

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
                <span className="text-xs font-bold px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full border border-blue-200/60 tracking-wider uppercase">
                  Billed Annually (10% Discount Applied)
                </span>
              </div>

              {/* Free Trial Banner — simple & clean */}
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
                          {businessBaseCost.toLocaleString('en-IN')}
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
                    <div className="space-y-3 pt-2">
                      <div className="space-y-0.5">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Team Members (add-ons)
                        </label>
                        <span className="text-xs font-bold text-[#003057] font-sans">
                          5 users
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          SKUs Count Limits (add-ons)
                        </label>
                        <span className="text-xs font-bold text-[#003057] font-sans">
                          25 SKUs
                        </span>
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
                          {proBaseCost.toLocaleString('en-IN')}
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
                    <div className="space-y-3 pt-2">
                      <div className="space-y-0.5">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Team Members (add-ons)
                        </label>
                        <span className="text-xs font-bold text-white font-sans">
                          50 users
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          SKUs Count Limits (add-ons)
                        </label>
                        <span className="text-xs font-bold text-white font-sans">
                          500 SKUs
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Brands Registry (add-ons)
                        </label>
                        <span className="text-xs font-bold text-white font-sans">
                          5 brands
                        </span>
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
                      <div className="flex items-center justify-between opacity-75">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Users limit</span>
                        <span className="text-xs font-bold text-blue-600 font-sans">Unlimited</span>
                      </div>
                      <div className="flex items-center justify-between opacity-75">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">SKUs limit</span>
                        <span className="text-xs font-bold text-blue-600 font-sans">Unlimited</span>
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
            </div>

            {/* Features Comparison Section — card-based modern layout */}
            <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
              <div className="text-center space-y-3 mb-14">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#00b074] bg-[#00b074]/10 px-3 py-1 rounded-md inline-block border border-[#00b074]/20">Feature Breakdown</span>
                <h3 className="text-3xl font-light text-[#003057] tracking-tight mt-2">
                  Everything compared, clearly
                </h3>
                <p className="text-slate-500 text-sm max-w-xl mx-auto">
                  Know exactly what you're getting before you commit. Every feature, every plan.
                </p>
              </div>

              {/* Plan header pills */}
              <div className="grid grid-cols-5 gap-3 mb-4 px-2">
                <div />
                {[['Free Trial', false], ['Business', false], ['Business Pro', true], ['Enterprise', false]].map(([name, hot]) => (
                  <div key={String(name)} className={`rounded-xl py-2.5 px-2 text-center text-[10px] font-bold uppercase tracking-widest ${hot ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {hot && <span className="block text-[8px] font-normal tracking-wider opacity-80 mb-0.5">★ Most Popular</span>}
                    {String(name)}
                  </div>
                ))}
              </div>

              {/* Comparison groups */}
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
                <div key={group.category} className="mb-6 bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
                  {/* Category header */}
                  <div className="px-5 py-3 bg-slate-50/80 border-b border-slate-200/60">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#003057]">{group.category}</span>
                  </div>
                  {group.rows.map((row, ri) => (
                    <div key={ri} className={`grid grid-cols-5 gap-0 ${ri < group.rows.length - 1 ? 'border-b border-slate-100' : ''
                      } hover:bg-slate-50/60 transition-colors`}>
                      <div className="px-5 py-3.5 text-xs font-medium text-slate-700 flex items-center">{row.feature}</div>
                      {row.vals.map((val, vi) => {
                        const isProCol = vi === 2;
                        const cellBase = `px-3 py-3.5 text-center text-xs flex items-center justify-center ${isProCol ? 'bg-blue-50/40 border-x border-blue-200/20' : ''
                          }`;
                        if (val === true) return (
                          <div key={vi} className={cellBase}>
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200">
                              <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            </span>
                          </div>
                        );
                        if (val === false) return (
                          <div key={vi} className={cellBase}>
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 border border-slate-200">
                              <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </span>
                          </div>
                        );
                        return (
                          <div key={vi} className={`${cellBase} ${isProCol ? 'font-semibold text-blue-700' : 'text-slate-600'
                            }`}>{String(val)}</div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Below Fold Info Block */}
            <div className="w-full bg-[#f8fafc] py-20 text-slate-800 mt-28 border-t border-slate-200/50">
              <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                <div className="lg:col-span-6 space-y-6 text-left">
                  <h2 className="text-4xl font-light tracking-tight text-[#003057] leading-tight" data-aos="fade-right">
                    Professional Tracking <br />
                    <span className="text-blue-600 font-medium">Ownership Standards</span>
                  </h2>
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal" data-aos="fade-right" data-aos-delay="100">
                    We don't just generate codes; we secure your infrastructure footprint. Our commitment to factory-grade dynamic verification logic ensures that every project meets the highest standards of stability and long-term ledger integrity.
                  </p>

                  <div className="space-y-3 pt-2 font-normal" data-aos="fade-right" data-aos-delay="200">
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
              className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${isFreeTrialDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              onClick={() => setIsFreeTrialDrawerOpen(false)}
            />

            {/* Drawer Panel */}
            <div
              className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col justify-between p-8 border-l border-slate-200 text-left ${isFreeTrialDrawerOpen ? 'translate-x-0' : 'translate-x-full'
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
                    Track registered batches, total system scans, and suspicious entries in real time via live WebSockets. The dashboard activity stream features a 60-second sliding-window client IP deduplicator to prevent duplicate event logs.
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
                    Connect registered templates to manufacturing batches to generate cryptographically secure QR code identifiers. Vendors can copy direct verification links or export high-resolution SVGs for packaging and hangtags.
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
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
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


      case 'about':
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
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z" />
                  </svg>
                </div>
                {/* Cargo Ship */}
                <div className="absolute bottom-[25%] right-[25%] animate-float-ship opacity-50">
                  <svg className="w-8 h-8 text-[#00b074]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.91 0 3.63-.57 5-1.56 1.37.99 3.09 1.56 5 1.56s3.63-.57 5-1.56c1.37.99 3.09 1.56 5 1.56h2v-2h-2zM4 19h16v-5l-2-2h-3V9H9v3H6l-2 2v5z" />
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

            {/* Section 4: Our Journey Vertical Timeline Section */}
            <div className="w-full bg-[#0f172a] py-28 border-t border-slate-800/50 relative z-20">
              <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
                
                {/* Left Side (40% width / lg:col-span-2) */}
                <div className="lg:col-span-2 space-y-6 text-left relative lg:-top-8" data-aos="fade-right" data-aos-duration="1000">
                  <span className="text-[#10b981] text-xs font-bold uppercase tracking-[0.25em] block">
                    OUR JOURNEY
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    How we got here
                  </h2>
                </div>

                {/* Right Side (60% width / lg:col-span-3) */}
                <div className="lg:col-span-3 relative" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="100">
                  {/* Vertical line connecting the steps */}
                  <div className="absolute left-4 top-2 bottom-2 w-px bg-[#10b981]/30" />
                  
                  <div className="space-y-12">
                    
                    {/* Step 1 */}
                    <div className="relative">
                      {/* Circle dot centered on the line */}
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

                    {/* Step 2 */}
                    <div className="relative">
                      {/* Circle dot centered on the line */}
                      <div className="absolute left-1 top-1 w-6 h-6 rounded-full bg-[#0f172a] border-2 border-[#10b981] flex items-center justify-center text-xs font-bold text-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                        2
                      </div>
                      <div className="pl-12 space-y-2 text-left">
                        <h3 className="text-xl font-bold text-white tracking-tight">Dynamic Verification</h3>
                        <p className="text-[#94a3b8] text-sm sm:text-base leading-relaxed font-normal">
                          The platform evolved to support real-time telemetry and supply chain synchronization, moving brands from reactive counterfeit detection to proactive, data-driven provenance.
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative">
                      {/* Circle dot centered on the line */}
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

        const hasAddOns = selectedPlan.name === 'Business' || selectedPlan.name === 'Business Pro';

        // Dynamic step items
        const stepItems = hasAddOns ? [
          { s: 1, label: 'Company', id: 'company' },
          { s: 2, label: 'Account', id: 'contact' },
          { s: 3, label: 'Add-Ons', id: 'addons' },
          { s: 4, label: 'Compliance', id: 'compliance' },
          { s: 5, label: 'Payment', id: 'payment' }
        ] : [
          { s: 1, label: 'Company', id: 'company' },
          { s: 2, label: 'Account', id: 'contact' },
          { s: 3, label: 'Compliance', id: 'compliance' },
          { s: 4, label: 'Payment', id: 'payment' }
        ];

        const totalSteps = stepItems.length;
        const currentStepItem = stepItems[checkoutStep - 1];
        const currentStepId = currentStepItem ? currentStepItem.id : 'company';

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
                      Step {checkoutStep} of {totalSteps}
                    </div>
                  </div>

                  {/* Progressive Horizontal Stepper Bar */}
                  <div className="relative flex items-center justify-between w-full mt-8">
                    {/* Background Progress Track Line */}
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 z-0" />

                    {/* Active Progress Track Line */}
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-blue-600 z-0 transition-all duration-500"
                      style={{ width: `${((checkoutStep - 1) / (totalSteps - 1)) * 100}%` }}
                    />

                    {/* Steps List */}
                    {stepItems.map((stepItem) => {
                      const isActive = checkoutStep >= stepItem.s;
                      const isCurrent = checkoutStep === stepItem.s;
                      return (
                        <div key={stepItem.s} className="flex flex-col items-center z-10 relative">
                          <button
                            type="button"
                            onClick={() => {
                              // Allow moving to a step only if valid up to that point
                              let valid = true;
                              for (let i = 0; i < stepItem.s - 1; i++) {
                                const prevStepId = stepItems[i].id as 'company' | 'contact' | 'addons' | 'compliance' | 'payment';
                                if (!validateStep(prevStepId)) {
                                  valid = false;
                                  break;
                                }
                              }
                              if (valid || stepItem.s < checkoutStep) {
                                setCheckoutStep(stepItem.s);
                                setErrors({});
                              }
                            }}
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all duration-300 cursor-pointer ${isCurrent
                              ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20 scale-110'
                              : isActive
                                ? 'bg-blue-50 border-blue-600 text-blue-600'
                                : 'bg-white border-slate-300 text-slate-400'
                              }`}
                          >
                            {isActive && checkoutStep > stepItem.s ? '✓' : stepItem.s}
                          </button>
                          <span className={`text-[10px] mt-2 font-bold uppercase tracking-wider hidden sm:block ${isCurrent ? 'text-blue-600' : isActive ? 'text-slate-700' : 'text-slate-450'
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
                {currentStepId === 'company' && (
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

                    {/* Country → State → City cascaded dropdowns with Geolocation */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Location *</label>
                        <button
                          type="button"
                          onClick={() => {
                            if (!navigator.geolocation) return;
                            setIsGeolocating(true);
                            navigator.geolocation.getCurrentPosition(
                              async (pos) => {
                                try {
                                  const { latitude, longitude } = pos.coords;
                                  const res = await fetch(
                                    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`
                                  );
                                  const data = await res.json();
                                  const addr = data.address || {};

                                  // Set country — useEffect will trigger states fetch
                                  const detectedCountry = addr.country || '';
                                  // Try matching against loaded countriesList (case-insensitive)
                                  const matched = countriesList.find(
                                    c => c.toLowerCase() === detectedCountry.toLowerCase()
                                  ) || detectedCountry;
                                  setSelectedCountry(matched);

                                  // Store detected state/city as hints — useEffects will fire after country resolves
                                  const detectedState = addr.state || addr.region || '';
                                  const detectedCity = addr.city || addr.town || addr.village || '';

                                  // Slight delay so state list has time to load before we try to set it
                                  setTimeout(() => {
                                    if (detectedState) {
                                      setStateName(detectedState);
                                    }
                                    setTimeout(() => {
                                      if (detectedCity) setCity(detectedCity);
                                    }, 800);
                                  }, 800);

                                  if (addr.postcode) {
                                    setPinCode(addr.postcode.replace(/\D/g, '').slice(0, 10));
                                  }
                                } catch { }
                                setIsGeolocating(false);
                              },
                              () => setIsGeolocating(false),
                              { timeout: 8000 }
                            );
                          }}
                          className="flex items-center gap-1.5 text-[10px] font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/60 px-3 py-1 rounded-lg transition-colors cursor-pointer"
                        >
                          {isGeolocating ? (
                            <>
                              <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                              Detecting...
                            </>
                          ) : (
                            <>
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                              Auto-detect
                            </>
                          )}
                        </button>
                      </div>

                      {/* Row 1: Country + PIN */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Country *</label>
                          <div className="relative">
                            <select
                              value={selectedCountry}
                              onChange={(e) => setSelectedCountry(e.target.value)}
                              disabled={isLoadingCountries}
                              className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-sans transition-colors cursor-pointer border-slate-200 disabled:opacity-60`}
                            >
                              {isLoadingCountries
                                ? <option>Loading countries...</option>
                                : <>
                                  <option value="">Select Country</option>
                                  {countriesList.map(c => <option key={c} value={c}>{c}</option>)}
                                </>
                              }
                            </select>
                            {isLoadingCountries && (
                              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <svg className="w-4 h-4 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">PIN / ZIP Code *</label>
                          <input
                            type="text"
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                            placeholder={selectedCountry === 'India' ? '400001' : 'Postal / ZIP code'}
                            maxLength={10}
                            className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.pinCode ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                          />
                          {errors.pinCode && <p className="text-[10px] text-red-500 font-medium">{errors.pinCode}</p>}
                        </div>
                      </div>

                      {/* Row 2: State + City */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">State / Province *</label>
                          <div className="relative">
                            <select
                              value={stateName}
                              onChange={(e) => setStateName(e.target.value)}
                              disabled={isLoadingStates || statesList.length === 0}
                              className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-sans transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${errors.stateName ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                            >
                              {isLoadingStates
                                ? <option>Loading states...</option>
                                : <>
                                  <option value="">{selectedCountry ? 'Select State / Province' : 'Select a country first'}</option>
                                  {statesList.map(s => <option key={s} value={s}>{s}</option>)}
                                </>
                              }
                            </select>
                            {isLoadingStates && (
                              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <svg className="w-4 h-4 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                              </div>
                            )}
                          </div>
                          {errors.stateName && <p className="text-[10px] text-red-500 font-medium">{errors.stateName}</p>}
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">City *</label>
                          <div className="relative">
                            {citiesList.length > 0 && !isLoadingCities ? (
                              <select
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-sans transition-colors cursor-pointer ${errors.city ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                              >
                                <option value="">Select City</option>
                                {citiesList.map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                            ) : (
                              <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder={isLoadingCities ? 'Loading cities...' : stateName ? 'Enter city name' : 'Select a state first'}
                                disabled={isLoadingCities}
                                className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400 disabled:opacity-50 ${errors.city ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                              />
                            )}
                            {isLoadingCities && (
                              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <svg className="w-4 h-4 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                              </div>
                            )}
                          </div>
                          {errors.city && <p className="text-[10px] text-red-500 font-medium">{errors.city}</p>}
                        </div>
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

                {/* Step 2: Account Details */}
                {currentStepId === 'contact' && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Full Name */}
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

                    {/* Work Email */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Work Email *</label>
                      <div className="flex gap-2">
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setIsEmailOtpVerified(false);
                          }}
                          placeholder="john@acmebrands.com" 
                          className={`flex-1 bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                        />
                        <div className="w-40 flex-shrink-0">
                          {isEmailOtpVerified ? (
                            <div className="w-full h-full flex items-center justify-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl font-bold text-xs uppercase tracking-wider select-none py-3">
                              <span>Verified ✓</span>
                            </div>
                          ) : (
                            <button 
                              type="button"
                              onClick={() => {
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                if (!email || !emailRegex.test(email.trim())) {
                                  setErrors({ ...errors, email: 'Enter a valid work email first' });
                                  return;
                                }
                                setErrors({});
                                setIsEmailOtpSent(true);
                                setShowEmailOtpPopup(true);
                              }}
                              className="w-full h-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md shadow-blue-500/10 py-3"
                            >
                              {isEmailOtpSent ? 'Resend OTP' : 'Verify Email'}
                            </button>
                          )}
                        </div>
                      </div>
                      {errors.email && <p className="text-[10px] text-red-500 font-medium">{errors.email}</p>}
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Mobile Number *</label>
                      <div className="flex gap-2">
                        <div className="flex gap-2 flex-1">
                          <span className="flex items-center bg-slate-100 border border-slate-200 rounded-xl px-3 text-slate-500 font-sans text-sm font-semibold select-none">
                            +91
                          </span>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\D/g, '');
                              setPhone(v);
                              setIsOtpVerified(false);
                            }}
                            placeholder="9876543210"
                            maxLength={10}
                            className={`flex-1 bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                          />
                        </div>
                        <div className="w-40 flex-shrink-0">
                          {isOtpVerified ? (
                            <div className="w-full h-full flex items-center justify-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl font-bold text-xs uppercase tracking-wider select-none py-3">
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
                              className="w-full h-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md shadow-blue-500/10 py-3"
                            >
                              {isOtpSent ? 'Resend OTP' : 'Verify Mobile'}
                            </button>
                          )}
                        </div>
                      </div>
                      {errors.phone && <p className="text-[10px] text-red-500 font-medium">{errors.phone}</p>}
                    </div>

                    {/* Designation / Role */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Designation / Role *</label>
                      <input 
                        type="text" 
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="Director / Brand Manager / Operations Manager" 
                        className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.designation ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                      />
                      {errors.designation && <p className="text-[10px] text-red-500 font-medium">{errors.designation}</p>}
                    </div>

                    {/* Create Account Password */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Create Account Password *</label>
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••" 
                        className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.password ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                      />
                      <p className="text-[10px] text-slate-400 mt-1 font-normal">This password will be used to log in to the Vendor Portal.</p>
                      {errors.password && <p className="text-[10px] text-red-500 font-medium">{errors.password}</p>}
                    </div>

                    {/* Confirm Account Password */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Confirm Account Password *</label>
                      <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••" 
                        className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.confirmPassword ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                      />
                      {errors.confirmPassword && <p className="text-[10px] text-red-500 font-medium">{errors.confirmPassword}</p>}
                    </div>

                    {/* Interactive Mobile OTP Simulator Dialog Modal */}
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

                    {/* Interactive Email OTP Simulator Dialog Modal */}
                    {showEmailOtpPopup && (
                      <div className="fixed inset-0 z-55 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-sm w-full space-y-6 text-center shadow-2xl border border-slate-100 animate-fadeIn">
                          <div>
                            <span className="text-xl">📧</span>
                            <h3 className="text-lg font-bold text-[#003057] mt-3">Email Verification Simulator</h3>
                            <p className="text-xs text-slate-500 mt-1.5 font-normal">
                              We sent a verification code to <span className="font-semibold text-slate-800">{email}</span>.
                            </p>
                          </div>
                          
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-left text-xs text-blue-700 space-y-1">
                            <span className="font-bold">⚠️ Test Simulator Hint:</span>
                            <p className="font-normal">Enter code <span className="font-black underline tracking-widest text-blue-900 font-sans">1234</span> to successfully complete email verification.</p>
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider text-left">4-Digit Security OTP</label>
                            <input 
                              type="text" 
                              maxLength={4}
                              value={emailOtpInput}
                              onChange={(e) => setEmailOtpInput(e.target.value.replace(/\D/g, ''))}
                              placeholder="0 0 0 0" 
                              className="w-full text-center text-xl font-bold tracking-[0.75em] bg-slate-50 border border-slate-200 rounded-xl py-3.5 focus:outline-none focus:border-blue-600 font-mono text-slate-800 placeholder-slate-300"
                            />
                            {errors.emailOtp && <p className="text-[10px] text-red-500 font-semibold">{errors.emailOtp}</p>}
                          </div>

                          <div className="flex gap-3 pt-2">
                            <button 
                              type="button"
                              onClick={() => {
                                setShowEmailOtpPopup(false);
                                setEmailOtpInput('');
                                setErrors({});
                              }}
                              className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-500 font-semibold py-3 rounded-xl text-xs uppercase transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button 
                              type="button"
                              onClick={() => {
                                if (emailOtpInput === '1234') {
                                  setIsEmailOtpVerified(true);
                                  setShowEmailOtpPopup(false);
                                  setEmailOtpInput('');
                                  setErrors({});
                                } else {
                                  setErrors({ emailOtp: 'Invalid OTP code. Please enter 1234.' });
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

                {/* Step 3: Add-Ons Configuration (if applicable) */}
                {currentStepId === 'addons' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <h3 className="text-lg font-medium text-[#003057]">Customize Plan Add-Ons</h3>
                      <p className="text-xs text-slate-500 mt-1">Configure additional capacities for your subscription.</p>
                    </div>

                    <div className="space-y-6">
                      {selectedPlan.name === 'Business' && (
                        <>
                          {/* Team Members Add-On */}
                          <div className="space-y-2 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-sm font-semibold text-[#003057]">Team Members</h4>
                                <p className="text-xs text-slate-500 mt-0.5">5 users included. Add in blocks of 5 users (+₹5,000/yr per block).</p>
                              </div>
                              {businessUsers > 5 && (
                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                                  +₹{(((businessUsers - 5) / 5) * 5000).toLocaleString('en-IN')}/yr
                                </span>
                              )}
                            </div>
                            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-2.5 justify-between max-w-xs mt-3">
                              <button
                                type="button"
                                onClick={() => setBusinessUsers(Math.max(5, businessUsers - 5))}
                                className="w-9 h-9 rounded-lg bg-slate-105 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 active:scale-95 disabled:opacity-50 cursor-pointer border-none"
                                disabled={businessUsers <= 5}
                              >
                                –
                              </button>
                              <span className="text-sm font-semibold text-slate-800 font-sans">
                                {businessUsers} users
                              </span>
                              <button
                                type="button"
                                onClick={() => setBusinessUsers(businessUsers + 5)}
                                className="w-9 h-9 rounded-lg bg-slate-105 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 active:scale-95 cursor-pointer border-none"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* SKUs Add-On */}
                          <div className="space-y-2 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-sm font-semibold text-[#003057]">SKUs Count Limits</h4>
                                <p className="text-xs text-slate-500 mt-0.5">25 SKUs included. Expand your product catalog limits.</p>
                              </div>
                              {businessSKUs > 25 && (
                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                                  +₹{(businessSKUs === 35 ? 10000 : 45000).toLocaleString('en-IN')}/yr
                                </span>
                              )}
                            </div>
                            <div className="max-w-xs mt-3">
                              <select
                                value={businessSKUs}
                                onChange={(e) => setBusinessSKUs(Number(e.target.value))}
                                className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl p-3.5 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                              >
                                <option value={25}>25 SKUs (included)</option>
                                <option value={35}>35 SKUs (+₹10,000/yr)</option>
                                <option value={75}>75 SKUs (+₹45,000/yr)</option>
                              </select>
                            </div>
                          </div>
                        </>
                      )}

                      {selectedPlan.name === 'Business Pro' && (
                        <>
                          {/* Team Members Add-On */}
                          <div className="space-y-2 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-sm font-semibold text-[#003057]">Team Members</h4>
                                <p className="text-xs text-slate-500 mt-0.5">50 users included. Add in blocks of 5 users (+₹5,000/yr per block).</p>
                              </div>
                              {proUsers > 50 && (
                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                                  +₹{(((proUsers - 50) / 5) * 5000).toLocaleString('en-IN')}/yr
                                </span>
                              )}
                            </div>
                            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-2.5 justify-between max-w-xs mt-3">
                              <button
                                type="button"
                                onClick={() => setProUsers(Math.max(50, proUsers - 5))}
                                className="w-9 h-9 rounded-lg bg-slate-105 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 active:scale-95 disabled:opacity-50 cursor-pointer border-none"
                                disabled={proUsers <= 50}
                              >
                                –
                              </button>
                              <span className="text-sm font-semibold text-slate-800 font-sans">
                                {proUsers} users
                              </span>
                              <button
                                type="button"
                                onClick={() => setProUsers(proUsers + 5)}
                                className="w-9 h-9 rounded-lg bg-slate-105 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 active:scale-95 cursor-pointer border-none"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* SKUs Add-On */}
                          <div className="space-y-2 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-sm font-semibold text-[#003057]">SKUs Count Limits</h4>
                                <p className="text-xs text-slate-500 mt-0.5">500 SKUs included. Expand your product catalog limits.</p>
                              </div>
                              {proSKUs > 500 && (
                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                                  +₹{(proSKUs === 510 ? 10000 : 45000).toLocaleString('en-IN')}/yr
                                </span>
                              )}
                            </div>
                            <div className="max-w-xs mt-3">
                              <select
                                value={proSKUs}
                                onChange={(e) => setProSKUs(Number(e.target.value))}
                                className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl p-3.5 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                              >
                                <option value={500}>500 SKUs (included)</option>
                                <option value={510}>510 SKUs (+₹10,000/yr)</option>
                                <option value={550}>550 SKUs (+₹45,000/yr)</option>
                              </select>
                            </div>
                          </div>

                          {/* Brands Registry Add-On */}
                          <div className="space-y-2 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-sm font-semibold text-[#003057]">Brands Registry</h4>
                                <p className="text-xs text-slate-500 mt-0.5">5 brands included. Add extra brands (+₹10,000/yr per brand).</p>
                              </div>
                              {proBrands > 5 && (
                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                                  +₹{((proBrands - 5) * 10000).toLocaleString('en-IN')}/yr
                                </span>
                              )}
                            </div>
                            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-2.5 justify-between max-w-xs mt-3">
                              <button
                                type="button"
                                onClick={() => setProBrands(Math.max(5, proBrands - 1))}
                                className="w-9 h-9 rounded-lg bg-slate-105 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 active:scale-95 disabled:opacity-50 cursor-pointer border-none"
                                disabled={proBrands <= 5}
                              >
                                –
                              </button>
                              <span className="text-sm font-semibold text-slate-800 font-sans">
                                {proBrands} brands
                              </span>
                              <button
                                type="button"
                                onClick={() => setProBrands(proBrands + 1)}
                                className="w-9 h-9 rounded-lg bg-slate-105 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 active:scale-95 cursor-pointer border-none"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 4: Trademark & Compliance Docs */}
                {currentStepId === 'compliance' && (
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
                            className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-slate-50/50 ${gstCertFile ? 'border-emerald-500 bg-emerald-50/10' : errors.gstCertFile ? 'border-red-500 bg-red-50/5' : 'border-slate-200'
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
                            className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-slate-50/50 ${incDocFile ? 'border-emerald-500 bg-emerald-50/10' : errors.incDocFile ? 'border-red-500 bg-red-50/5' : 'border-slate-200'
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
                                className={`border-2 border-dashed rounded-2xl p-4.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-slate-50/50 ${pharmaDrugLicenseFile ? 'border-emerald-500 bg-emerald-50/10' : errors.pharmaDrugLicenseFile ? 'border-red-500 bg-red-50/5' : 'border-slate-200'
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
                                className={`border-2 border-dashed rounded-2xl p-4.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-slate-50/50 ${fssaiLicenseFile ? 'border-emerald-500 bg-emerald-50/10' : errors.fssaiLicenseFile ? 'border-red-500 bg-red-50/5' : 'border-slate-200'
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
                              className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-slate-50/50 ${exciseLicenseFile ? 'border-emerald-500 bg-emerald-50/10' : errors.exciseLicenseFile ? 'border-red-500 bg-red-50/5' : 'border-slate-200'
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
                {currentStepId === 'payment' && (
                  <div className="space-y-6 animate-fadeIn">

                    {/* Consent Tickboxes with custom styled blue indicators */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-[#003057] uppercase tracking-wider">Legal Agreements</h3>

                      {/* 1. ToS Checkbox */}
                      <div
                        onClick={() => setAgreeTerms(!agreeTerms)}
                        className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200/80 bg-slate-50/40 cursor-pointer hover:bg-slate-50 transition-colors"
                      >
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${agreeTerms ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
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
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${agreePrivacy ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
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
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${agreeDataProcessing ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
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
                            className={`p-4.5 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${paymentMethod === 'razorpay' ? 'border-blue-600 bg-blue-50/30' : 'border-slate-200 bg-white hover:bg-slate-50'
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
                            className={`p-4.5 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50/30' : 'border-slate-200 bg-white hover:bg-slate-50'
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

                  {checkoutStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={() => {
                        const currentStepId = stepItems[checkoutStep - 1].id as 'company' | 'contact' | 'addons' | 'compliance' | 'payment';
                        if (validateStep(currentStepId)) {
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
                      onClick={async () => {
                        const currentStepId = stepItems[checkoutStep - 1].id as 'company' | 'contact' | 'addons' | 'compliance' | 'payment';
                        if (validateStep(currentStepId)) {
                          setIsProcessingPayment(true);
                          
                          const payload = {
                            legalName: legalName,
                            companyType: companyType,
                            gstin: gstin,
                            pan: pan,
                            cin: cin || null,
                            addressLine1: addressLine1,
                            addressLine2: addressLine2 || null,
                            city: city,
                            stateName: stateName,
                            pinCode: pinCode,
                            selectedCountry: selectedCountry,
                            industry: industry,
                            website: website || null,
                            
                            fullName: fullName,
                            email: email,
                            phone: phone,
                            designation: designation,
                            password: password,
                            
                            planName: selectedPlan.name,
                            extraUsers: selectedPlan.extraUsers,
                            extraSKUs: selectedPlan.extraSKUs,
                            extraBrands: selectedPlan.extraBrands,
                            totalUsers: selectedPlan.totalUsers,
                            totalSKUs: selectedPlan.totalSKUs,
                            totalBrands: selectedPlan.totalBrands
                          };

                          try {
                            const res = await fetch("http://localhost:8000/auth/checkout-register", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json"
                              },
                              body: JSON.stringify(payload)
                            });

                            if (!res.ok) {
                              const errData = await res.json().catch(() => ({}));
                              throw new Error(errData.detail || "Registration failed");
                            }

                            // On success, redirect to vendor login with email parameter for auto-filling
                            window.location.href = `http://localhost:3000/vendor/login?email=${encodeURIComponent(email)}`;
                          } catch (err: any) {
                            console.error("Checkout registration failed:", err);
                            alert("Registration failed: " + err.message);
                            setIsProcessingPayment(false);
                          }
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
                    <span className="text-xl select-none">🛡️</span>
                    <p className="text-[10px] text-slate-500 font-normal leading-relaxed">
                      Safe & secure checkout. Your data is protected, and you can upgrade, downgrade, or cancel your plan at any time from your settings.
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
      <header className={`navbar ${isNavScrolled ? 'nav-scrolled' : ''}`}>
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

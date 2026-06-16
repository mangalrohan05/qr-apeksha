import { useState, useEffect } from 'react';

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

interface BillingPageProps {
  selectedPlan: SelectedPlanInfo;
  businessUsers: number;
  setBusinessUsers: (u: number) => void;
  businessSKUs: number;
  setBusinessSKUs: (s: number) => void;
  proUsers: number;
  setProUsers: (u: number) => void;
  proSKUs: number;
  setProSKUs: (s: number) => void;
  proBrands: number;
  setProBrands: (b: number) => void;
}

export default function BillingPage({
  selectedPlan,
  businessUsers,
  setBusinessUsers,
  businessSKUs,
  setBusinessSKUs,
  proUsers,
  setProUsers,
  proSKUs,
  setProSKUs,
  proBrands,
  setProBrands,
}: BillingPageProps) {
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

  // Countries / States / Cities List
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
          if (names.includes('India')) setSelectedCountry('India');
        }
      })
      .catch(() => { })
      .finally(() => setIsLoadingCountries(false));
  }, []);

  // Fetch states when selectedCountry changes
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
  }, [selectedCountry]);

  // Fetch cities when stateName changes
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
  }, [stateName]);

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

  const taxRate = 0.18;
  const calculatedTax = selectedPlan.price * taxRate;
  const totalAmount = selectedPlan.price + calculatedTax;

  const hasAddOns = selectedPlan.name === 'Business' || selectedPlan.name === 'Business Pro';

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
  const currentStepId = (currentStepItem ? currentStepItem.id : 'company') as 'company' | 'contact' | 'addons' | 'compliance' | 'payment';

  return (
    <div data-theme="light" className="min-h-screen bg-slate-50 pt-36 pb-24 px-4 sm:px-6 lg:px-8 text-slate-800 animate-fadeIn relative font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Form & Stepper */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl shadow-xl p-8 sm:p-10 space-y-8 text-left">
          
          <div className="border-b border-slate-150 pb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-light text-[#003057] mt-3">Account Verification Setup</h2>
                <p className="text-xs text-slate-500 mt-1 font-normal">Complete compliance details to sync your brand credentials.</p>
              </div>
              <div className="bg-[#003057] text-white px-4.5 py-1.5 rounded-full text-xs font-semibold tracking-wider">
                Step {checkoutStep} of {totalSteps}
              </div>
            </div>

            <div className="relative flex items-center justify-between w-full mt-8">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 z-0" />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#00b074] z-0 transition-all duration-500"
                style={{ width: `${((checkoutStep - 1) / (totalSteps - 1)) * 100}%` }}
              />

              {stepItems.map((stepItem) => {
                const isActive = checkoutStep >= stepItem.s;
                const isCurrent = checkoutStep === stepItem.s;
                return (
                  <div key={stepItem.s} className="flex flex-col items-center z-10 relative">
                    <button
                      type="button"
                      onClick={() => {
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
                        ? 'bg-[#00b074] border-[#00b074] text-white shadow-lg shadow-[#00b074]/20 scale-110'
                        : isActive
                          ? 'bg-[#00b074]/10 border-[#00b074] text-[#00b074]'
                          : 'bg-white border-slate-300 text-slate-400'
                        }`}
                    >
                      {isActive && checkoutStep > stepItem.s ? '✓' : stepItem.s}
                    </button>
                    <span className={`text-[10px] mt-2 font-bold uppercase tracking-wider hidden sm:block ${isCurrent ? 'text-[#00b074]' : isActive ? 'text-slate-700' : 'text-slate-450'
                      }`}>
                      {stepItem.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Step Contents */}
          {currentStepId === 'company' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Legal Company Name *</label>
                  <input
                    type="text"
                    value={legalName}
                    onChange={(e) => setLegalName(e.target.value)}
                    placeholder="Acme Brands Pvt Ltd"
                    className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.legalName ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                  />
                  {errors.legalName && <p className="text-[10px] text-red-500 font-medium">{errors.legalName}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-550">Company Type *</label>
                  <select
                    value={companyType}
                    onChange={(e) => setCompanyType(e.target.value)}
                    className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 font-sans transition-colors cursor-pointer ${errors.companyType ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                  >
                    <option value="">Select Structure</option>
                    <option value="Proprietorship">Proprietorship</option>
                    <option value="Partnership">Partnership Firm</option>
                    <option value="LLP">Limited Liability Partnership (LLP)</option>
                    <option value="Pvt Ltd">Private Limited (Pvt Ltd)</option>
                    <option value="Public Ltd">Public Limited Co.</option>
                  </select>
                  {errors.companyType && <p className="text-[10px] text-red-500 font-medium">{errors.companyType}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-150 pt-6">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">GSTIN *</label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    placeholder="27AAAAA1111A1Z1"
                    maxLength={15}
                    className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.gstin ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                  />
                  {errors.gstin && <p className="text-[10px] text-red-500 font-medium">{errors.gstin}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Company PAN *</label>
                  <input
                    type="text"
                    value={pan}
                    onChange={(e) => setPan(e.target.value.toUpperCase())}
                    placeholder="AAAAA1111A"
                    maxLength={10}
                    className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.pan ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                  />
                  {errors.pan && <p className="text-[10px] text-red-500 font-medium">{errors.pan}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Corporate ID Number (CIN)</label>
                  <input
                    type="text"
                    value={cin}
                    onChange={(e) => setCin(e.target.value.toUpperCase())}
                    placeholder="U11111MH2021PTC111111"
                    maxLength={21}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 font-normal transition-colors placeholder-slate-400"
                  />
                </div>
              </div>

              <div className="border-t border-slate-150 pt-6 space-y-4">
                <h3 className="text-sm font-semibold text-[#003057] uppercase tracking-wider">Registered Address</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Address Line 1 *</label>
                    <input
                      type="text"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      placeholder="Building name, street, locality"
                      className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 font-normal transition-colors placeholder-slate-400 ${errors.addressLine1 ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                    />
                    {errors.addressLine1 && <p className="text-[10px] text-red-500 font-medium">{errors.addressLine1}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Address Line 2</label>
                    <input
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      placeholder="Floor, suite, landmark (optional)"
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 font-normal transition-colors placeholder-slate-400"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center gap-4 pt-2">
                  <div />
                  <button
                    type="button"
                    onClick={() => {
                      setIsGeolocating(true);
                      navigator.geolocation.getCurrentPosition(
                        async (position) => {
                          const { latitude, longitude } = position.coords;
                          try {
                            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
                            if (res.ok) {
                              const d = await res.json();
                              const addr = d.address || {};
                              setAddressLine1([addr.road, addr.suburb, addr.neighbourhood].filter(Boolean).join(', ') || addressLine1);
                              setPinCode(addr.postcode || pinCode);
                              if (addr.country) {
                                setSelectedCountry(addr.country);
                              }
                            }
                          } catch (e) {
                            console.error(e);
                          } finally {
                            setIsGeolocating(false);
                          }
                        },
                        () => setIsGeolocating(false),
                        { timeout: 8000 }
                      );
                    }}
                    className="flex items-center gap-1.5 text-[10px] font-semibold text-[#00b074] hover:text-[#009660] bg-[#00b074]/10 hover:bg-[#00b074]/20 border border-[#00b074]/30 px-3 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    {isGeolocating ? 'Detecting...' : 'Auto-detect Location'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Country *</label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      disabled={isLoadingCountries}
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 transition-colors"
                    >
                      {isLoadingCountries ? <option>Loading countries...</option> : (
                        <>
                          <option value="">Select Country</option>
                          {countriesList.map(c => <option key={c} value={c}>{c}</option>)}
                        </>
                      )}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">PIN / ZIP Code *</label>
                    <input
                      type="text"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      placeholder={selectedCountry === 'India' ? '400001' : 'Postal / ZIP code'}
                      maxLength={10}
                      className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 font-normal transition-colors ${errors.pinCode ? 'border-red-500' : 'border-slate-200'}`}
                    />
                    {errors.pinCode && <p className="text-[10px] text-red-500">{errors.pinCode}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">State / Province *</label>
                    <select
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      disabled={isLoadingStates || statesList.length === 0}
                      className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 ${errors.stateName ? 'border-red-500' : 'border-slate-200'}`}
                    >
                      {isLoadingStates ? <option>Loading states...</option> : (
                        <>
                          <option value="">Select State</option>
                          {statesList.map(s => <option key={s} value={s}>{s}</option>)}
                        </>
                      )}
                    </select>
                    {errors.stateName && <p className="text-[10px] text-red-500">{errors.stateName}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">City *</label>
                    {citiesList.length > 0 && !isLoadingCities ? (
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 ${errors.city ? 'border-red-500' : 'border-slate-200'}`}
                      >
                        <option value="">Select City</option>
                        {citiesList.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city name"
                        className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 ${errors.city ? 'border-red-500' : 'border-slate-200'}`}
                      />
                    )}
                    {errors.city && <p className="text-[10px] text-red-500">{errors.city}</p>}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-150 pt-6">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Industry / Sector *</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 ${errors.industry ? 'border-red-500' : 'border-slate-200'}`}
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
                  {errors.industry && <p className="text-[10px] text-red-500">{errors.industry}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Company Website</label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://www.acmebrands.com"
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStepId === 'contact' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Full Name *</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe" 
                  className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 ${errors.fullName ? 'border-red-500' : 'border-slate-200'}`}
                />
                {errors.fullName && <p className="text-[10px] text-red-500">{errors.fullName}</p>}
              </div>

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
                    className={`flex-1 bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
                  />
                  <div className="w-40 flex-shrink-0">
                    {isEmailOtpVerified ? (
                      <div className="w-full h-full flex items-center justify-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl font-bold text-xs uppercase tracking-wider py-3">
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
                        className="w-full h-full bg-[#00b074] hover:bg-[#009660] text-white font-bold rounded-xl text-xs uppercase tracking-wider py-3"
                      >
                        {isEmailOtpSent ? 'Resend OTP' : 'Verify Email'}
                      </button>
                    )}
                  </div>
                </div>
                {errors.email && <p className="text-[10px] text-red-500">{errors.email}</p>}
              </div>

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
                      className={`flex-1 bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 ${errors.phone ? 'border-red-500' : 'border-slate-200'}`}
                    />
                  </div>
                  <div className="w-40 flex-shrink-0">
                    {isOtpVerified ? (
                      <div className="w-full h-full flex items-center justify-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl font-bold text-xs uppercase tracking-wider py-3">
                        <span>Verified ✓</span>
                      </div>
                    ) : (
                      <button 
                        type="button"
                        onClick={() => {
                          if (!phone || phone.trim().length !== 10) {
                            setErrors({ ...errors, phone: 'Enter a valid 10-digit mobile number' });
                            return;
                          }
                          setErrors({});
                          setIsOtpSent(true);
                          setShowOtpPopup(true);
                        }}
                        className="w-full h-full bg-[#00b074] hover:bg-[#009660] text-white font-bold rounded-xl text-xs uppercase tracking-wider py-3"
                      >
                        {isOtpSent ? 'Resend OTP' : 'Verify Mobile'}
                      </button>
                    )}
                  </div>
                </div>
                {errors.phone && <p className="text-[10px] text-red-500">{errors.phone}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Designation / Role *</label>
                <input 
                  type="text" 
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="Director / Brand Manager / Operations Manager" 
                  className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 ${errors.designation ? 'border-red-500' : 'border-slate-200'}`}
                />
                {errors.designation && <p className="text-[10px] text-red-500">{errors.designation}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Create Account Password *</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 ${errors.password ? 'border-red-500' : 'border-slate-200'}`}
                />
                {errors.password && <p className="text-[10px] text-red-500">{errors.password}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Confirm Account Password *</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••" 
                  className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 ${errors.confirmPassword ? 'border-red-500' : 'border-slate-200'}`}
                />
                {errors.confirmPassword && <p className="text-[10px] text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>
          )}

          {currentStepId === 'addons' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-lg font-medium text-[#003057]">Customize Plan Add-Ons</h3>
                <p className="text-xs text-slate-500 mt-1">Configure additional capacities for your subscription.</p>
              </div>

              {selectedPlan.name === 'Business' && (
                <>
                  <div className="space-y-2 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-semibold text-[#003057]">Team Members</h4>
                        <p className="text-xs text-slate-500 mt-0.5">5 users included. Add in blocks of 5 users (+₹5,000/yr per block).</p>
                      </div>
                      {businessUsers > 5 && (
                        <span className="text-xs font-bold text-[#00b074] bg-[#00b074]/10 px-2 py-1 rounded border border-[#00b074]/20">
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
                      <span className="text-sm font-semibold text-slate-800 font-sans">{businessUsers} users</span>
                      <button
                        type="button"
                        onClick={() => setBusinessUsers(businessUsers + 5)}
                        className="w-9 h-9 rounded-lg bg-slate-105 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 active:scale-95 cursor-pointer border-none"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-semibold text-[#003057]">SKUs Count Limits</h4>
                        <p className="text-xs text-slate-500 mt-0.5">25 SKUs included. Expand your product catalog limits.</p>
                      </div>
                      {businessSKUs > 25 && (
                        <span className="text-xs font-bold text-[#00b074] bg-[#00b074]/10 px-2 py-1 rounded border border-[#00b074]/20">
                          +₹{(businessSKUs === 35 ? 10000 : 45000).toLocaleString('en-IN')}/yr
                        </span>
                      )}
                    </div>
                    <div className="max-w-xs mt-3">
                      <select
                        value={businessSKUs}
                        onChange={(e) => setBusinessSKUs(Number(e.target.value))}
                        className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl p-3.5 text-xs font-sans focus:outline-none"
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
                  <div className="space-y-2 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-semibold text-[#003057]">Team Members</h4>
                        <p className="text-xs text-slate-500 mt-0.5">50 users included. Add in blocks of 5 users (+₹5,000/yr per block).</p>
                      </div>
                      {proUsers > 50 && (
                        <span className="text-xs font-bold text-[#00b074] bg-[#00b074]/10 px-2 py-1 rounded border border-[#00b074]/20">
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
                      <span className="text-sm font-semibold text-slate-800 font-sans">{proUsers} users</span>
                      <button
                        type="button"
                        onClick={() => setProUsers(proUsers + 5)}
                        className="w-9 h-9 rounded-lg bg-slate-105 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 active:scale-95 cursor-pointer border-none"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-semibold text-[#003057]">SKUs Count Limits</h4>
                        <p className="text-xs text-slate-500 mt-0.5">500 SKUs included. Expand your product catalog limits.</p>
                      </div>
                      {proSKUs > 500 && (
                        <span className="text-xs font-bold text-[#00b074] bg-[#00b074]/10 px-2 py-1 rounded border border-[#00b074]/20">
                          +₹{(proSKUs === 510 ? 10000 : 45000).toLocaleString('en-IN')}/yr
                        </span>
                      )}
                    </div>
                    <div className="max-w-xs mt-3">
                      <select
                        value={proSKUs}
                        onChange={(e) => setProSKUs(Number(e.target.value))}
                        className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl p-3.5 text-xs font-sans focus:outline-none"
                      >
                        <option value={500}>500 SKUs (included)</option>
                        <option value={510}>510 SKUs (+₹10,000/yr)</option>
                        <option value={550}>550 SKUs (+₹45,000/yr)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-semibold text-[#003057]">Brands Registry</h4>
                        <p className="text-xs text-slate-500 mt-0.5">5 brands included. Add extra brands (+₹10,000/yr per brand).</p>
                      </div>
                      {proBrands > 5 && (
                        <span className="text-xs font-bold text-[#00b074] bg-[#00b074]/10 px-2 py-1 rounded border border-[#00b074]/20">
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
                      <span className="text-sm font-semibold text-slate-800 font-sans">{proBrands} brands</span>
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
          )}

          {currentStepId === 'compliance' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-550">Trademark Registry Status</label>
                  <select
                    value={tmStatus}
                    onChange={(e) => setTmStatus(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none text-slate-800"
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
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-800"
                  />
                </div>
              </div>

              <div className="border-t border-slate-150 pt-6 space-y-5">
                <h3 className="text-sm font-semibold text-[#003057] uppercase tracking-wider">Required Verification Certificates</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">GST Certificate PDF *</label>
                    <div
                      className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-slate-50/50 ${gstCertFile ? 'border-emerald-500 bg-emerald-50/10' : errors.gstCertFile ? 'border-red-500 bg-red-50/5' : 'border-slate-200'}`}
                      onClick={() => {
                        setGstCertFile(`gst_certificate_${legalName.toLowerCase().replace(/\s+/g, '_') || 'company'}.pdf`);
                        setErrors({ ...errors, gstCertFile: '' });
                      }}
                    >
                      <span className="text-xl mb-1.5">{gstCertFile ? '📄' : '📁'}</span>
                      <span className="text-xs font-semibold text-slate-700">{gstCertFile ? gstCertFile : 'GST_Registration.pdf'}</span>
                      <span className="text-[10px] text-slate-400 mt-1">{gstCertFile ? 'Ready to upload ✓' : 'Click to simulate PDF attachment'}</span>
                    </div>
                    {errors.gstCertFile && <p className="text-[10px] text-red-500">{errors.gstCertFile}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Certificate of Incorporation PDF *</label>
                    <div
                      className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-slate-50/50 ${incDocFile ? 'border-emerald-500 bg-emerald-50/10' : errors.incDocFile ? 'border-red-500 bg-red-50/5' : 'border-slate-200'}`}
                      onClick={() => {
                        setIncDocFile(`certificate_of_incorporation_${legalName.toLowerCase().replace(/\s+/g, '_') || 'company'}.pdf`);
                        setErrors({ ...errors, incDocFile: '' });
                      }}
                    >
                      <span className="text-xl mb-1.5">{incDocFile ? '📄' : '📁'}</span>
                      <span className="text-xs font-semibold text-slate-700">{incDocFile ? incDocFile : 'Incorporation_Document.pdf'}</span>
                      <span className="text-[10px] text-slate-400 mt-1">{incDocFile ? 'Ready to upload ✓' : 'Click to simulate PDF attachment'}</span>
                    </div>
                    {errors.incDocFile && <p className="text-[10px] text-red-500">{errors.incDocFile}</p>}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-150 pt-6 space-y-5">
                <h3 className="text-sm font-semibold text-slate-450 uppercase tracking-wider">Additional Supporting Records (Optional)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">TM Application PDF</label>
                    <div
                      onClick={() => setTmAppFile('trademark_application.pdf')}
                      className={`border rounded-xl p-3 text-center cursor-pointer text-xs border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2 ${tmAppFile ? 'bg-slate-105' : ''}`}
                    >
                      <span>📎</span>
                      <span className="truncate max-w-[120px]">{tmAppFile ? tmAppFile : 'Attach File'}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">TM Certificate PDF</label>
                    <div
                      onClick={() => setTmCertFile('trademark_certificate.pdf')}
                      className={`border rounded-xl p-3 text-center cursor-pointer text-xs border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2 ${tmCertFile ? 'bg-slate-105' : ''}`}
                    >
                      <span>📎</span>
                      <span className="truncate max-w-[120px]">{tmCertFile ? tmCertFile : 'Attach File'}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Brand Auth Letter</label>
                    <div
                      onClick={() => setBrandAuthFile('brand_authorization.pdf')}
                      className={`border rounded-xl p-3 text-center cursor-pointer text-xs border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2 ${brandAuthFile ? 'bg-slate-105' : ''}`}
                    >
                      <span>📎</span>
                      <span className="truncate max-w-[120px]">{brandAuthFile ? brandAuthFile : 'Attach File'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {(industry === 'Pharma' || industry === 'FMCG' || industry === 'Liquor') && (
                <div className="border-t border-slate-150 pt-6 space-y-6 animate-fadeIn">
                  <div className="bg-[#00b074]/5 border border-[#00b074]/25 rounded-2xl p-5 flex items-start gap-4">
                    <span className="text-xl">🛡️</span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#003057] uppercase tracking-wide">Sector Compliance Check ({industry})</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Your industry sector requires mandatory documentation compliance checks to proceed.</p>
                    </div>
                  </div>

                  {industry === 'Pharma' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-555">Drug License Number *</label>
                        <input
                          type="text"
                          value={pharmaDrugLicense}
                          onChange={(e) => setPharmaDrugLicense(e.target.value)}
                          placeholder="DL-1234567890"
                          className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-800 ${errors.pharmaDrugLicense ? 'border-red-500' : 'border-slate-200'}`}
                        />
                        {errors.pharmaDrugLicense && <p className="text-[10px] text-red-500">{errors.pharmaDrugLicense}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Drug License Copy PDF *</label>
                        <div
                          onClick={() => {
                            setPharmaDrugLicenseFile('pharma_drug_license.pdf');
                            setErrors({ ...errors, pharmaDrugLicenseFile: '' });
                          }}
                          className={`border-2 border-dashed rounded-2xl p-4.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-slate-50/50 ${pharmaDrugLicenseFile ? 'border-emerald-500 bg-emerald-50/10' : errors.pharmaDrugLicenseFile ? 'border-red-500' : 'border-slate-200'}`}
                        >
                          <span className="text-xs font-semibold text-slate-700 truncate max-w-[150px]">{pharmaDrugLicenseFile ? pharmaDrugLicenseFile : 'Attach Drug License PDF'}</span>
                          <span className="text-[9px] text-slate-400 mt-0.5">Click to simulate</span>
                        </div>
                        {errors.pharmaDrugLicenseFile && <p className="text-[10px] text-red-500">{errors.pharmaDrugLicenseFile}</p>}
                      </div>
                    </div>
                  )}

                  {industry === 'FMCG' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-555">FSSAI License Number *</label>
                        <input
                          type="text"
                          value={fssaiLicense}
                          onChange={(e) => setFssaiLicense(e.target.value)}
                          placeholder="FSSAI-14-Digit-Code"
                          className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-800 ${errors.fssaiLicense ? 'border-red-500' : 'border-slate-200'}`}
                        />
                        {errors.fssaiLicense && <p className="text-[10px] text-red-500">{errors.fssaiLicense}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">FSSAI Certificate PDF *</label>
                        <div
                          onClick={() => {
                            setFssaiLicenseFile('fssai_compliance_certificate.pdf');
                            setErrors({ ...errors, fssaiLicenseFile: '' });
                          }}
                          className={`border-2 border-dashed rounded-2xl p-4.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-slate-50/50 ${fssaiLicenseFile ? 'border-emerald-500 bg-emerald-50/10' : errors.fssaiLicenseFile ? 'border-red-500' : 'border-slate-200'}`}
                        >
                          <span className="text-xs font-semibold text-slate-700 truncate max-w-[150px]">{fssaiLicenseFile ? fssaiLicenseFile : 'Attach FSSAI PDF'}</span>
                          <span className="text-[9px] text-slate-400 mt-0.5">Click to simulate</span>
                        </div>
                        {errors.fssaiLicenseFile && <p className="text-[10px] text-red-500">{errors.fssaiLicenseFile}</p>}
                      </div>
                    </div>
                  )}

                  {industry === 'Liquor' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">State Excise License Copy PDF *</label>
                        <div
                          onClick={() => {
                            setExciseLicenseFile('state_excise_compliance.pdf');
                            setErrors({ ...errors, exciseLicenseFile: '' });
                          }}
                          className={`border-2 border-dashed rounded-2xl p-4.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-slate-50/50 ${exciseLicenseFile ? 'border-emerald-500 bg-emerald-50/10' : errors.exciseLicenseFile ? 'border-red-500' : 'border-slate-200'}`}
                        >
                          <span className="text-xs font-semibold text-slate-700 truncate max-w-[150px]">{exciseLicenseFile ? exciseLicenseFile : 'Attach Excise License PDF'}</span>
                          <span className="text-[9px] text-slate-400 mt-0.5">Click to simulate</span>
                        </div>
                        {errors.exciseLicenseFile && <p className="text-[10px] text-red-500">{errors.exciseLicenseFile}</p>}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {currentStepId === 'payment' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-lg font-medium text-[#003057]">Terms & Consent Checklist</h3>
                <p className="text-xs text-slate-500 mt-1">Accept operating criteria to execute verification onboarding.</p>
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#003057] block">I agree to the Terms of Service *</span>
                    <span className="text-[10px] text-slate-450">Accept terms regarding platform usage, SLA thresholds, and payment commits.</span>
                    {errors.agreeTerms && <p className="text-[10px] text-red-500 font-semibold">{errors.agreeTerms}</p>}
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                    className="mt-1"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#003057] block">I agree to the Privacy Policy *</span>
                    <span className="text-[10px] text-slate-450">Authorize processing of registered brand metadata profiles securely.</span>
                    {errors.agreePrivacy && <p className="text-[10px] text-red-500 font-semibold">{errors.agreePrivacy}</p>}
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={agreeDataProcessing}
                    onChange={(e) => setAgreeDataProcessing(e.target.checked)}
                    className="mt-1"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#003057] block">Consent to Data Audits *</span>
                    <span className="text-[10px] text-slate-450">Acknowledge that audit logs will record generated QR identifiers.</span>
                    {errors.agreeDataProcessing && <p className="text-[10px] text-red-500 font-semibold">{errors.agreeDataProcessing}</p>}
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons inside BillingPage */}
          <div className="flex justify-between items-center border-t border-slate-150 pt-6">
            {checkoutStep > 1 ? (
              <button
                type="button"
                onClick={() => {
                  setCheckoutStep(checkoutStep - 1);
                  setErrors({});
                }}
                className="border border-slate-200 hover:bg-slate-50 text-slate-500 font-semibold py-3.5 px-8 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                ← Back Step
              </button>
            ) : <div />}

            {checkoutStep < totalSteps ? (
              <button
                type="button"
                onClick={() => {
                  if (validateStep(currentStepId)) {
                    setCheckoutStep(checkoutStep + 1);
                  }
                }}
                className="bg-[#00b074] hover:bg-[#009660] text-white font-bold py-3.5 px-8 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md"
              >
                Next Step →
              </button>
            ) : (
              <button
                type="button"
                onClick={async () => {
                  if (validateStep(currentStepId)) {
                    setIsProcessingPayment(true);
                    
                    const payload = {
                      legalName,
                      companyType,
                      gstin,
                      pan,
                      cin: cin || null,
                      addressLine1,
                      addressLine2: addressLine2 || null,
                      city,
                      stateName,
                      pinCode,
                      selectedCountry,
                      industry,
                      website: website || null,
                      fullName,
                      email,
                      phone,
                      designation,
                      password,
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

                      window.location.href = `http://localhost:3000/vendor/login?email=${encodeURIComponent(email)}`;
                    } catch (err: any) {
                      console.error("Checkout registration failed:", err);
                      alert("Registration failed: " + err.message);
                      setIsProcessingPayment(false);
                    }
                  }
                }}
                className="bg-[#00b074] hover:bg-[#009660] text-white font-extrabold py-4 px-10 rounded-xl text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer"
                disabled={isProcessingPayment}
              >
                {isProcessingPayment ? 'Processing...' : selectedPlan.price > 0 ? 'Complete Payment & Register' : 'Activate Free Trial'}
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Invoice Summary Card */}
        <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-3xl shadow-lg overflow-hidden lg:sticky lg:top-28 text-left animate-fadeIn">
          <div className="bg-[#003057] p-5.5 text-white text-center border-b border-[#001e36]">
            <h2 className="text-lg font-light tracking-tight">Invoice Summary</h2>
            <p className="text-slate-300 text-[10px] font-normal uppercase tracking-wider mt-0.5">Plan Allocation Metrics</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-150 space-y-4 shadow-sm">
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-150">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Tier Name</span>
                <span className="text-[#00b074] font-bold text-xs px-2.5 py-0.5 bg-[#00b074]/10 border border-[#00b074]/20 rounded-md">
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
                <span className="text-[#00b074] font-extrabold text-xs uppercase tracking-wider">Gross Total</span>
                <div className="text-right">
                  <span className="text-xl font-black text-[#003057]">₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <span className="text-slate-450 text-[10px] font-normal block">
                    /{selectedPlan.interval === 'trial' ? 'trial' : selectedPlan.interval === 'mo' ? 'mo' : 'yr'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-slate-100/50 border border-slate-200 rounded-xl p-4.5">
              <span className="text-xl select-none">🛡️</span>
              <p className="text-[10px] text-slate-500 font-normal leading-relaxed">
                Safe & secure checkout. Your data is protected, and you can upgrade, downgrade, or cancel your plan at any time from your settings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SMS Sim OTP Modal */}
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

            <div className="bg-[#00b074]/10 border border-[#00b074]/20 rounded-xl p-3.5 text-left text-xs text-[#00b074] space-y-1">
              <span className="font-bold">⚠️ Test Simulator Hint:</span>
              <p className="font-normal">Enter code <span className="font-black underline tracking-widest text-[#003057] font-sans">1234</span> to successfully complete OTP validation.</p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider text-left">4-Digit Security OTP</label>
              <input
                type="text"
                maxLength={4}
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                placeholder="0 0 0 0"
                className="w-full text-center text-xl font-bold tracking-[0.75em] bg-slate-50 border border-slate-200 rounded-xl py-3.5 focus:outline-none focus:border-[#00b074] font-mono text-slate-800"
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
                className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-500 font-semibold py-3 rounded-xl text-xs uppercase cursor-pointer"
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
                className="flex-1 bg-[#00b074] hover:bg-[#009660] text-white font-bold py-3 rounded-xl text-xs uppercase cursor-pointer"
              >
                Verify Code
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Sim OTP Modal */}
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
            
            <div className="bg-[#00b074]/10 border border-[#00b074]/20 rounded-xl p-3.5 text-left text-xs text-[#00b074] space-y-1">
              <span className="font-bold">⚠️ Test Simulator Hint:</span>
              <p className="font-normal">Enter code <span className="font-black underline tracking-widest text-[#003057] font-sans">1234</span> to successfully complete email verification.</p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider text-left">4-Digit Security OTP</label>
              <input 
                type="text" 
                maxLength={4}
                value={emailOtpInput}
                onChange={(e) => setEmailOtpInput(e.target.value.replace(/\D/g, ''))}
                placeholder="0 0 0 0" 
                className="w-full text-center text-xl font-bold tracking-[0.75em] bg-slate-50 border border-slate-200 rounded-xl py-3.5 focus:outline-none focus:border-[#00b074] font-mono text-slate-800"
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
                className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-500 font-semibold py-3 rounded-xl text-xs uppercase cursor-pointer"
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
                className="flex-1 bg-[#00b074] hover:bg-[#009660] text-white font-bold py-3 rounded-xl text-xs uppercase cursor-pointer"
              >
                Verify Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

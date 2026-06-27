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

function generateStrongPassword() {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const special = '!@#$%^&*';
  
  let result = '';
  result += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
  result += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
  result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  result += special.charAt(Math.floor(Math.random() * special.length));
  
  const all = lowercase + uppercase + numbers + special;
  for (let i = 0; i < 8; i++) {
    result += all.charAt(Math.floor(Math.random() * all.length));
  }
  
  return result.split('').sort(() => 0.5 - Math.random()).join('');
}

function getPasswordStrength(pwd: string) {
  if (!pwd) return { score: 0, label: 'Empty', color: 'bg-slate-200', text: 'text-slate-400', percent: 0 };
  
  let score = 0;
  if (pwd.length >= 8) score += 1;
  if (pwd.length >= 12) score += 1;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score += 1;
  if (/\d/.test(pwd)) score += 1;
  if (/[^a-zA-Z0-9]/.test(pwd)) score += 1;
  
  const scoreCapped = Math.min(score, 4);
  
  switch (scoreCapped) {
    case 0:
      return { score: 0, label: 'Very Weak', color: 'bg-red-500', text: 'text-red-500', percent: 10 };
    case 1:
      return { score: 1, label: 'Weak', color: 'bg-orange-500', text: 'text-orange-500', percent: 25 };
    case 2:
      return { score: 2, label: 'Medium', color: 'bg-yellow-500', text: 'text-yellow-600', percent: 50 };
    case 3:
      return { score: 3, label: 'Strong', color: 'bg-lime-500', text: 'text-lime-650', percent: 75 };
    case 4:
      return { score: 4, label: 'Very Strong', color: 'bg-[#00b074]', text: 'text-[#00b074]', percent: 100 };
    default:
      return { score: 0, label: 'Empty', color: 'bg-slate-200', text: 'text-slate-400', percent: 0 };
  }
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
  const [recommendedPassword, setRecommendedPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

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

  // Initialize suggested strong password once on mount
  useEffect(() => {
    const pwd = generateStrongPassword();
    setRecommendedPassword(pwd);
    setPassword(pwd);
    setConfirmPassword(pwd);
  }, []);

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

  const validateStep = (stepId: 'user_info' | 'payment'): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepId === 'user_info') {
      if (!legalName.trim()) newErrors.legalName = 'Company name is required';
      if (!companyType) newErrors.companyType = 'Company type is required';
      if (!industry) newErrors.industry = 'Industry/sector is required';

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

      if (!password) {
        newErrors.password = 'Account password is required';
      } else {
        const pwdErrors = [];
        if (password.length < 8) {
          pwdErrors.push("at least 8 characters");
        }
        if (!/[A-Za-z]/.test(password)) {
          pwdErrors.push("at least one letter");
        }
        if (!/\d/.test(password)) {
          pwdErrors.push("at least one number");
        }
        if (pwdErrors.length > 0) {
          newErrors.password = `Password must include ${pwdErrors.join(", ")}.`;
        }
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = 'Confirm password is required';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
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
  const calculatedTax = selectedPlan.basePrice * taxRate;
  const totalAmount = selectedPlan.basePrice + calculatedTax;

  const stepItems = [
    { s: 1, label: 'User Info', id: 'user_info' },
    { s: 2, label: 'Payment', id: 'payment' }
  ];

  const totalSteps = stepItems.length;
  const currentStepItem = stepItems[checkoutStep - 1];
  const currentStepId = (currentStepItem ? currentStepItem.id : 'user_info') as 'user_info' | 'payment';

  return (
    <div data-theme="light" className="min-h-screen bg-slate-50 pt-32 sm:pt-36 pb-16 md:pb-20 px-3 sm:px-6 lg:px-8 text-slate-800 animate-fadeIn relative font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Form & Stepper */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 lg:p-10 space-y-8 text-left">
          
          <div className="border-b border-slate-150 pb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-light text-[#003057] mt-3">Account Registration</h2>
                <p className="text-xs text-slate-500 mt-1 font-normal">Create your initial vendor shell to proceed to payment.</p>
              </div>
              <div className="bg-[#003057] text-white px-4.5 py-1.5 rounded-full text-xs font-semibold tracking-wider">
                Step {checkoutStep} of {totalSteps}
              </div>
            </div>

          </div>

          {/* Form Step Contents */}
          {currentStepId === 'user_info' && (
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-150">
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-550">Company Website</label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://www.acmebrands.com"
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-150 space-y-6">
                <h3 className="text-sm font-semibold text-[#003057] uppercase tracking-wider">Account Credentials</h3>

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
                      className={`flex-1 min-w-0 bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
                    />
                    <div className="flex-shrink-0">
                      {isEmailOtpVerified ? (
                        <div className="h-full flex items-center justify-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl font-bold text-[10px] sm:text-xs uppercase tracking-wider py-3 px-3 sm:px-4 whitespace-nowrap">
                          <span>✓ Verified</span>
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
                          className="h-full bg-[#00b074] hover:bg-[#009660] text-white font-bold rounded-xl text-[10px] sm:text-xs uppercase tracking-wider py-3 px-3 sm:px-4 cursor-pointer whitespace-nowrap"
                        >
                          {isEmailOtpSent ? 'Resend' : 'Verify Email'}
                        </button>
                      )}
                    </div>
                  </div>
                  {errors.email && <p className="text-[10px] text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Mobile Number *</label>
                  <div className="flex gap-2">
                    <div className="flex gap-2 flex-1 min-w-0">
                      <span className="flex items-center bg-slate-100 border border-slate-200 rounded-xl px-3 text-slate-500 font-sans text-sm font-semibold select-none flex-shrink-0">
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
                        className={`flex-1 min-w-0 bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 ${errors.phone ? 'border-red-500' : 'border-slate-200'}`}
                      />
                    </div>
                    <div className="flex-shrink-0">
                      {isOtpVerified ? (
                        <div className="h-full flex items-center justify-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl font-bold text-[10px] sm:text-xs uppercase tracking-wider py-3 px-3 sm:px-4 whitespace-nowrap">
                          <span>✓ Verified</span>
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
                          className="h-full bg-[#00b074] hover:bg-[#009660] text-white font-bold rounded-xl text-[10px] sm:text-xs uppercase tracking-wider py-3 px-3 sm:px-4 cursor-pointer whitespace-nowrap"
                        >
                          {isOtpSent ? 'Resend' : 'Verify Mobile'}
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

                {/* Recommended password suggestion banner */}
                {recommendedPassword && (
                  <div className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-4.5 py-3 animate-fadeIn text-left col-span-1 md:col-span-2">
                    <span>
                      Recommended Strong Password: <span className="font-mono bg-emerald-50 px-2 py-0.5 border border-emerald-200/50 rounded text-emerald-800 font-bold select-all select-text cursor-text">{recommendedPassword}</span>
                    </span>
                  </div>
                )}

                <div className="space-y-1.5 relative">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Create Account Password *</label>
                    {recommendedPassword && (
                      <button
                        type="button"
                        onClick={() => {
                          setPassword(recommendedPassword);
                          setConfirmPassword(recommendedPassword);
                          setErrors(prev => {
                            const copy = { ...prev };
                            delete copy.password;
                            delete copy.confirmPassword;
                            return copy;
                          });
                        }}
                        className="text-[9px] text-[#00b074] hover:underline font-bold flex items-center gap-1 cursor-pointer select-none"
                      >
                        🔄 Use Suggested Strong Password
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input 
                       type={showPassword ? "text" : "password"} 
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="••••••••" 
                       maxLength={12}
                       className={`w-full bg-slate-50/50 border rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 ${errors.password ? 'border-red-500' : 'border-slate-200'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-450 hover:text-slate-700 text-[10px] font-bold uppercase tracking-wider select-none cursor-pointer"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  {/* Password Complexity UI */}
                  {password && (
                    <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 mt-2.5 space-y-2.5 animate-fadeIn">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-slate-500 uppercase tracking-wider">Complexity Strength:</span>
                        <span className={`${getPasswordStrength(password).text} uppercase tracking-wider`}>
                          {getPasswordStrength(password).label}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${getPasswordStrength(password).color}`}
                          style={{ width: `${getPasswordStrength(password).percent}%` }}
                        />
                      </div>
                      
                      {/* Checklist constraints */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[9px] font-semibold text-slate-500 pt-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className={password.length >= 8 ? "text-emerald-500 font-bold" : "text-slate-350"}>
                            {password.length >= 8 ? "✓" : "•"}
                          </span>
                          <span className={password.length >= 8 ? "text-slate-800" : "text-slate-450"}>Min 8 characters</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={/[A-Za-z]/.test(password) ? "text-emerald-500 font-bold" : "text-slate-350"}>
                            {/[A-Za-z]/.test(password) ? "✓" : "•"}
                          </span>
                          <span className={/[A-Za-z]/.test(password) ? "text-slate-800" : "text-slate-450"}>Contains a letter</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={/\d/.test(password) ? "text-emerald-500 font-bold" : "text-slate-350"}>
                            {/\d/.test(password) ? "✓" : "•"}
                          </span>
                          <span className={/\d/.test(password) ? "text-slate-800" : "text-slate-450"}>Contains a number</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={( /[A-Z]/.test(password) && /[a-z]/.test(password) ) ? "text-emerald-500 font-bold" : "text-slate-350"}>
                            {( /[A-Z]/.test(password) && /[a-z]/.test(password) ) ? "✓" : "•"}
                          </span>
                          <span className={( /[A-Z]/.test(password) && /[a-z]/.test(password) ) ? "text-slate-800" : "text-slate-450"}>Mixed case letters</span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2">
                          <span className={/[^a-zA-Z0-9]/.test(password) ? "text-emerald-500 font-bold" : "text-slate-350"}>
                            {/[^a-zA-Z0-9]/.test(password) ? "✓" : "•"}
                          </span>
                          <span className={/[^a-zA-Z0-9]/.test(password) ? "text-slate-800" : "text-slate-450"}>Special character (e.g. !@#$%)</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {errors.password && <p className="text-[10px] text-red-500 font-semibold">{errors.password}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Confirm Account Password *</label>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••" 
                    maxLength={12}
                    className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00b074] text-slate-800 ${errors.confirmPassword ? 'border-red-500' : 'border-slate-200'}`}
                  />
                  {errors.confirmPassword && <p className="text-[10px] text-red-500 font-semibold">{errors.confirmPassword}</p>}
                </div>
              </div>
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
          <div className="flex flex-wrap justify-between items-center gap-3 border-t border-slate-150 pt-6">
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
                      industry,
                      website: website || null,
                      fullName,
                      email,
                      phone,
                      designation,
                      password,
                      planName: selectedPlan.name,
                      extraUsers: 0,
                      extraSKUs: 0,
                      extraBrands: 0,
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
        <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden lg:sticky lg:top-28 text-left animate-fadeIn">
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

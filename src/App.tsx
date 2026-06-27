import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import SideDrawer from './components/SideDrawer';

const PlansPage = lazy(() => import('./components/PlansPage'));
const ProductsPage = lazy(() => import('./components/ProductsPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const BillingPage = lazy(() => import('./components/BillingPage'));
const TermsPage = lazy(() => import('./components/TermsPage'));
const PrivacyPage = lazy(() => import('./components/PrivacyPage'));

type Page = 'home' | 'plans' | 'products' | 'about' | 'contact' | 'billing' | 'terms' | 'privacy';

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
  const [logoTheme, setLogoTheme] = useState<'light' | 'dark'>('light');

  // Free Trial side drawer toggle state
  const [isFreeTrialDrawerOpen, setIsFreeTrialDrawerOpen] = useState<boolean>(false);

  // Mobile navigation drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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
    setBusinessUsers(5);
    setBusinessSKUs(25);
    setProUsers(50);
    setProSKUs(500);
    setProBrands(5);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync state with URL Hash (Browser Back/Forward buttons)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const trackedPages: Page[] = ['terms', 'privacy'];
      if (trackedPages.includes(hash as Page)) {
        setCurrentPage(hash as Page);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    // Initial routing setup (Enables back button to go home even on direct subpage land/reload)
    const initialHash = window.location.hash.replace('#', '');
    const trackedPages: Page[] = ['terms', 'privacy'];
    if (trackedPages.includes(initialHash as Page)) {
      window.history.replaceState({ page: 'home' }, '', '#');
      window.history.pushState({ page: initialHash }, '', '#' + initialHash);
      setCurrentPage(initialHash as Page);
    } else {
      setCurrentPage('home');
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const currentHash = window.location.hash.replace('#', '');
    const trackedPages: Page[] = ['terms', 'privacy'];
    if (trackedPages.includes(currentPage)) {
      if (currentHash !== currentPage) {
        window.location.hash = currentPage;
      }
    } else {
      if (currentHash !== '') {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
  }, [currentPage]);

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

  // Scroll to top of the page when the page changes
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' as any });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);
    return () => clearTimeout(timer);
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

  useEffect(() => {
    if (selectedPlan.name === 'Business') {
      const baseCost = isAnnual ? 55000 : 5000;
      setSelectedPlan(prev => ({
        ...prev,
        price: baseCost,
        basePrice: baseCost,
        extraUsers: 0,
        extraUsersCost: 0,
        extraSKUs: 0,
        extraSKUsCost: 0,
        totalUsers: 5,
        totalSKUs: 25,
      }));
    } else if (selectedPlan.name === 'Business Pro') {
      const baseCost = isAnnual ? 245000 : 22500;
      setSelectedPlan(prev => ({
        ...prev,
        price: baseCost,
        basePrice: baseCost,
        extraUsers: 0,
        extraUsersCost: 0,
        extraSKUs: 0,
        extraSKUsCost: 0,
        extraBrands: 0,
        extraBrandsCost: 0,
        totalUsers: 50,
        totalSKUs: 500,
        totalBrands: 5
      }));
    }
  }, [selectedPlan.name, isAnnual]);

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

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'plans':
        return (
          <PlansPage
            handleSelectPlan={handleSelectPlan}
            isAnnual={isAnnual}
            isFreeTrialDrawerOpen={isFreeTrialDrawerOpen}
            setIsFreeTrialDrawerOpen={setIsFreeTrialDrawerOpen}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'products':
        return <ProductsPage />;
      case 'about':
        return <AboutPage setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <ContactPage />;
      case 'billing':
        return (
          <BillingPage
            selectedPlan={selectedPlan}
            businessUsers={businessUsers}
            setBusinessUsers={setBusinessUsers}
            businessSKUs={businessSKUs}
            setBusinessSKUs={setBusinessSKUs}
            proUsers={proUsers}
            setProUsers={setProUsers}
            proSKUs={proSKUs}
            setProSKUs={setProSKUs}
            proBrands={proBrands}
            setProBrands={setProBrands}
          />
        );
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-[#00b074] selection:text-white">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isNavScrolled={isNavScrolled}
        logoTheme={logoTheme}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <SideDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <main className="w-full">
        <Suspense fallback={
          <div className="min-h-screen flex flex-col items-center justify-center bg-white text-slate-800">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-10 h-10 border-4 border-[#00b074] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest animate-pulse">
                Loading Secure Module...
              </p>
            </div>
          </div>
        }>
          {renderPage()}
        </Suspense>
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

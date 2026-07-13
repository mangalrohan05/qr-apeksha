import React, { useState, useEffect } from 'react';

interface HomePageProps {
  setCurrentPage: (page: any) => void;
}

const Icon = ({ path, w = 22 }: { path: string[]; w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {path.map((d, i) => <path key={i} d={d} />)}
  </svg>
);

const checkIconPath = ['M20 6L9 17l-5-5'];

export default function HomePage({ setCurrentPage }: HomePageProps) {
  const [faqOpen, setFaqOpen] = useState<number>(-1);

  useEffect(() => {
    // Scroll reveal observer
    const els = Array.from(document.querySelectorAll('[data-reveal]'));
    if ('IntersectionObserver' in window) {
      els.forEach((el: any) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(22px)';
        el.style.willChange = 'opacity, transform';
      });
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.transition = 'opacity .6s cubic-bezier(.2,.7,.3,1), transform .6s cubic-bezier(.2,.7,.3,1)';
            (e.target as HTMLElement).style.opacity = '1';
            (e.target as HTMLElement).style.transform = 'none';
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      els.forEach(el => io.observe(el));
      return () => io.disconnect();
    }
  }, []);

  const industries = ['FMCG', 'Pharma', 'Agro', 'Liquor', 'Electronics', 'Manufacturing'];
  const logoSlots = [1, 2, 3, 4, 5];

  const problems = [
    { icon: ['M8 3H5a2 2 0 00-2 2v3', 'M16 3h3a2 2 0 012 2v3', 'M8 21H5a2 2 0 01-2-2v-3', 'M16 21h3a2 2 0 002-2v-3', 'M9 12l2 2 4-4'], title: 'Copies slip through', body: 'Look-alike products and refilled packs reach shelves alongside your genuine goods.' },
    { icon: ['M12 2v20', 'M2 12h20'], title: 'Fake batch & price', body: 'Labels get swapped with wrong batch numbers, dates, or MRP — and customers can’t tell.' },
    { icon: ['M12 9v4', 'M12 17h.01', 'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z'], title: 'You hear too late', body: 'Without early signals, problems spread for months before your team finds out.' },
  ];

  const steps = [
    { n: '1', icon: ['M4 7V5a2 2 0 012-2h2', 'M16 3h2a2 2 0 012 2v2', 'M20 17v2a2 2 0 01-2 2h-2', 'M8 21H6a2 2 0 01-2-2v-2', 'M7 12h10'], title: 'Register & tag', body: 'Register your brand and products, then put an Authentiq QR on your packaging.' },
    { n: '2', icon: ['M3 7V5a2 2 0 012-2h2', 'M17 3h2a2 2 0 012 2v2', 'M21 17v2a2 2 0 01-2 2h-2', 'M7 21H5a2 2 0 01-2-2v-2', 'M7 8h4v4H7z', 'M15 8h2', 'M15 12h2', 'M13 15h4'], title: 'Customers scan', body: 'A customer or your vigilance team scans the QR and adds a few product photos — no app or account needed for a basic check.' },
    { n: '3', icon: ['M9 12l2 2 4-4', 'M12 3a9 9 0 100 18 9 9 0 000-18z'], title: 'Verify & act', body: 'They get a clear confidence score and a recommended next step, and can report anything suspicious. You see the signals.' },
  ];

  const features = [
    { icon: ['M9 12l2 2 4-4', 'M12 3a9 9 0 100 18 9 9 0 000-18z'], title: 'Evidence-based verification', body: 'Every check weighs the product’s details and the evidence provided, then returns a clear confidence score.' },
    { icon: ['M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z', 'M9 12l2 2 4-4'], title: 'Report straight to you', body: 'Customers and staff can flag anything suspicious, and the report lands with your team right away.' },
    { icon: ['M3 3v18h18', 'M7 14l3-3 3 3 5-6'], title: 'Early fraud & location signals', body: 'Spot suspicious activity by area with aggregate, privacy-respecting signals — no tracking of individual people.' },
    { icon: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'], title: 'Many brands, one place', body: 'Manage multiple brands, products, and batches from a single, organised workspace.' },
    { icon: ['M7 8h4v4H7z', 'M4 4h6v6H4z', 'M14 4h6v6h-6z', 'M14 14h6v6h-6z', 'M4 14h6v6H4z'], title: 'Bulk QR for your lines', body: 'Generate QR codes in bulk so your packaging lines keep moving without slowing down.' },
    { icon: ['M8 3H7a4 4 0 00-4 4v1', 'M16 3h1a4 4 0 014 4v1', 'M8 21H7a4 4 0 01-4-4v-1', 'M16 21h1a4 4 0 004-4v-1', 'M9 12h6'], title: 'Connect your systems', body: 'Fits alongside the tools you already use, so trust data flows where your business needs it.' },
  ];

  const brandBenefits = [
    'Protect your brand from copies, refills, and relabelled packs.',
    'See suspicious-activity signals by area, early enough to act.',
    'Receive reports from customers and your vigilance team in one place.',
    'Build lasting trust with the people who buy from you.',
  ];
  const customerBenefits = [
    'Check a product in seconds by scanning the QR on the pack.',
    'No app to download and no account needed for a basic check.',
    'Get a clear confidence score and a recommended next step.',
    'Report anything that looks off, directly to the brand.',
  ];

  const faqs = [
    { q: 'What is Authentiq, and who is it for?', a: 'Authentiq is a product trust platform for brand owners who sell physical packaged goods. It gives your customers and your vigilance team a simple way to check a product and see a confidence-scored result — helping protect your brand and the people who buy from you.' },
    { q: 'Do my customers need to download an app or create an account?', a: 'No. For a basic check, a customer simply scans the QR on the packaging with their phone camera — no app to install and no account to create.' },
    { q: 'How does a customer verify a product?', a: 'They scan the QR on the pack, add a few product photos, and receive a clear confidence score along with a recommended next step. It only takes a few moments.' },
    { q: 'Does scanning the QR alone mean the product is genuine?', a: 'No. The QR is the starting point, not proof on its own. Verification weighs the product’s details and the evidence provided, then returns a confidence score and a recommended next step — never a guarantee.' },
    { q: 'What happens if something looks suspicious?', a: 'The customer or your team can report it to you directly. Your team sees the signal, so you can look into patterns and act early.' },
    { q: 'Can I manage more than one brand or product?', a: 'Yes. You can manage multiple brands, products, and batches from one workspace, with plans that scale as you grow.' },
    { q: 'Can Authentiq connect to our existing systems?', a: 'Yes. At a business level, Authentiq is built to fit alongside the tools you already use, so trust data reaches the right places in your organisation.' },
  ];

  const tiers = [
    { name: 'Free Trial', price: '₹0', per: '/ 14 days', note: 'No card required. Around 250 verifications. Becomes read-only when the trial ends.', cta: 'Start Free Trial', popular: false, dark: false, features: ['~250 verifications', '1 brand to get started', 'Try core features', 'Read-only at expiry'] },
    { name: 'Business', price: '₹55,000', per: '/ year + GST', note: 'For a single, growing brand.', cta: 'Start Free Trial', popular: false, dark: false, features: ['1 brand', '[30] SKUs', '5 users', 'Unlimited verifications', 'Basic batch management', 'City-level location signals'] },
    { name: 'Business Pro', price: '₹2,45,000', per: '/ year + GST', note: 'For multi-brand teams that need more depth.', cta: 'Start Free Trial', popular: true, dark: false, features: ['5 brands', '[300] SKUs', '50 users', 'Unlimited verifications', 'Full batch management', 'Location heatmap', 'Bulk QR generation', 'Integration / API', 'Advanced analytics'] },
    { name: 'Enterprise', price: 'Custom', per: '', note: 'For large operations with higher limits and dedicated support.', cta: 'Contact Sales', popular: false, dark: true, features: ['Everything in Business Pro', 'Higher limits', 'Dedicated support', 'Tailored onboarding'] },
  ];

  return (
    <main className="w-full bg-white font-sans text-[#38434f]">
      {/* ===== HERO ===== */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#f4faf8] to-[#ffffff] via-[#f4faf8]">
        <div className="max-w-7xl mx-auto px-6 pt-[120px] sm:pt-[150px] pb-24 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <div data-reveal className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#e6f6ef] text-[#0E7C7B] font-bold text-[13px] tracking-wide px-3.5 py-1.5 rounded-full">
              <span className="w-[7px] h-[7px] rounded-full bg-[#16B981] inline-block"></span>
              Now welcoming founding brands
            </div>
            <h1 className="text-[40px] sm:text-[48px] md:text-[54px] leading-[1.06] font-extrabold tracking-tight text-[#0F2A43] mt-5 font-display">
              Give your customers a simple way to <span className="text-[#0E7C7B]">trust</span> what they buy.
            </h1>
            <p className="text-[18px] sm:text-[19px] leading-[1.6] text-[#51606d] mt-5 max-w-[520px]">
              Put an Authentiq QR on your packaging. Anyone can scan it, check the product's details and evidence, and get a clear confidence score — so your brand and your customers stay a step ahead.
            </p>
            <div className="flex flex-wrap gap-3.5 mt-8">
              <button onClick={() => setCurrentPage('billing')} className="bg-[#16B981] text-white font-bold text-[17px] px-7 py-3.5 rounded-[12px] shadow-[0_10px_24px_rgba(22,185,129,0.32)] hover:scale-105 transition-transform cursor-pointer">
                Start Free Trial
              </button>
              <button onClick={() => { document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' }); }} className="bg-white text-[#0F2A43] font-bold text-[17px] px-6 py-3.5 rounded-[12px] border-[1.5px] border-[#d9e0e4] hover:bg-slate-50 transition-colors cursor-pointer">
                See how it works
              </button>
            </div>
            <p className="text-[14px] text-[#7a8792] mt-4 font-medium">14-day free trial · No card required</p>
          </div>
          <div data-reveal className="flex justify-center lg:justify-end">
            <div className="relative w-[300px] max-w-[82vw]">
              <div className="absolute inset-[-8%_-6%] bg-[radial-gradient(circle_at_50%_42%,rgba(22,185,129,0.22),transparent_62%)] blur-[6px] z-0"></div>
              <div className="relative z-10 bg-[#0F2A43] rounded-[42px] p-3 shadow-[0_40px_80px_rgba(15,42,67,0.28)]">
                <div className="bg-[#f4faf8] rounded-[32px] overflow-hidden relative">
                  <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[90px] h-[20px] bg-[#0F2A43] rounded-full z-20"></div>
                  <div className="relative h-[196px] bg-[#0F2A43] overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.35]" style={{ backgroundImage: 'linear-gradient(#12405f 1px,transparent 1px),linear-gradient(90deg,#12405f 1px,transparent 1px)', backgroundSize: '26px 26px' }}></div>
                    <div className="absolute top-[34px] left-1/2 -translate-x-1/2 w-[96px] h-[128px] bg-gradient-to-br from-white to-[#e8eef1] rounded-[10px] shadow-[0_12px_26px_rgba(0,0,0,0.35)]">
                      <div className="h-[40px] bg-[#16B981] rounded-t-[10px]"></div>
                      <div className="p-3">
                        <div className="h-[6px] w-[70%] bg-[#0F2A43] rounded-[3px]"></div>
                        <div className="h-[5px] w-[50%] bg-[#c3ccd2] rounded-[3px] mt-[7px]"></div>
                        <div className="mt-[16px] w-[40px] h-[40px] bg-[#0F2A43] rounded-[6px]"></div>
                      </div>
                    </div>
                    <div className="absolute top-[26px] left-[26px] w-[26px] h-[26px] border-t-[3px] border-l-[3px] border-[#4fd6a6] rounded-tl-[6px]"></div>
                    <div className="absolute top-[26px] right-[26px] w-[26px] h-[26px] border-t-[3px] border-r-[3px] border-[#4fd6a6] rounded-tr-[6px]"></div>
                    <div className="absolute bottom-[26px] left-[26px] w-[26px] h-[26px] border-b-[3px] border-l-[3px] border-[#4fd6a6] rounded-bl-[6px]"></div>
                    <div className="absolute bottom-[26px] right-[26px] w-[26px] h-[26px] border-b-[3px] border-r-[3px] border-[#4fd6a6] rounded-br-[6px]"></div>
                    <div className="absolute left-[26px] right-[26px] h-[2px] bg-gradient-to-r from-transparent via-[#4fd6a6] to-transparent shadow-[0_0_12px_#4fd6a6] animate-[aq-scan_3.2s_ease-in-out_infinite]"></div>
                  </div>
                  <div className="p-[20px_18px_24px]">
                    <div className="flex items-center gap-[13px]">
                      <div className="relative w-[62px] h-[62px] rounded-full shrink-0 flex items-center justify-center" style={{ background: 'conic-gradient(#16B981 0 88%, #dfe7ea 88% 100%)' }}>
                        <div className="w-[48px] h-[48px] rounded-full bg-white flex flex-col items-center justify-center">
                          <span className="font-display font-extrabold text-[18px] text-[#0F2A43] leading-none">88</span>
                          <span className="text-[8px] text-[#8b97a1] font-semibold mt-[2px]">/100</span>
                        </div>
                      </div>
                      <div>
                        <div className="font-display font-bold text-[15px] text-[#0F2A43]">High confidence</div>
                        <div className="text-[12px] text-[#7a8792] mt-[2px] font-medium">Evidence checked</div>
                      </div>
                    </div>
                    <div className="mt-4 bg-[#e6f6ef] rounded-[12px] p-3 flex gap-2.5 items-start">
                      <span className="text-[#0E7C7B] shrink-0 mt-0.5"><Icon path={['M9 12l2 2 4-4','M12 3a9 9 0 100 18 9 9 0 000-18z']} w={17}/></span>
                      <span className="text-[12.5px] leading-[1.45] text-[#20604f] font-medium">Recommended next step: details match. Keep your receipt.</span>
                    </div>
                    <button className="mt-3.5 w-full bg-white border-[1.5px] border-[#e0e6e9] text-[#516170] rounded-[10px] p-[11px] text-[13px] font-bold hover:bg-slate-50 transition-colors">
                      Report something suspicious
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section className="border-y border-[#eef0f2] bg-[#fbfcfc]">
        <div className="max-w-[1100px] mx-auto py-8 px-6 text-center">
          <p className="text-[14px] font-semibold tracking-wider uppercase text-[#8b97a1]">Built for brands across</p>
          <div className="flex flex-wrap justify-center gap-3 mt-4.5">
            {industries.map(ind => (
              <span key={ind} className="font-display font-semibold text-[16px] text-[#516170] bg-white border border-[#e6eaed] px-4 py-2 rounded-full">{ind}</span>
            ))}
          </div>
          <p className="text-[13px] text-[#a3adb5] mt-5 font-medium">Founding-brand logos will appear here — spots reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-3.5">
            {logoSlots.map(s => (
              <div key={s} className="w-[118px] h-[44px] border-[1.5px] border-dashed border-[#d7dde1] rounded-[8px] flex items-center justify-center text-[#c3ccd2] text-[11px] font-mono">brand logo</div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className="max-w-7xl mx-auto px-6 py-[90px]">
        <div data-reveal className="max-w-[720px]">
          <p className="font-display font-bold text-[14px] tracking-[0.08em] uppercase text-[#16B981]">The problem</p>
          <h2 className="text-[34px] sm:text-[38px] leading-[1.12] font-extrabold tracking-tight text-[#0F2A43] mt-3.5 font-display">When a product leaves your line, your brand is on its own.</h2>
          <p className="text-[18px] leading-[1.65] text-[#51606d] mt-4.5">Products get copied, refilled, and relabelled with fake batch or price details. Customers can't easily tell what's real. And you often hear about it far too late.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-11">
          {problems.map((pr, i) => (
            <div key={i} data-reveal className="bg-[#fbfcfc] border border-[#eef0f2] rounded-[16px] p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-[46px] h-[46px] rounded-[12px] bg-[#fef1ee] flex items-center justify-center text-[#e07a55]"><Icon path={pr.icon} w={22} /></div>
              <h3 className="text-[19px] font-bold text-[#0F2A43] mt-4.5 font-display">{pr.title}</h3>
              <p className="text-[15.5px] leading-[1.6] text-[#5c6a76] mt-2.5 font-medium">{pr.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how" className="bg-[#0F2A43] text-white">
        <div className="max-w-7xl mx-auto px-6 py-[92px]">
          <div data-reveal className="text-center max-w-[640px] mx-auto">
            <p className="font-display font-bold text-[14px] tracking-[0.08em] uppercase text-[#4fd6a6]">How it works</p>
            <h2 className="text-[34px] sm:text-[40px] leading-[1.1] font-extrabold tracking-tight text-white mt-3.5 font-display">Three simple steps to a more trusted brand.</h2>
            <div className="inline-flex items-center gap-3.5 mt-5 font-display font-bold text-[16px] text-[#8fb0c9]">
              <span className="text-[#4fd6a6]">Scan</span><span className="opacity-40">→</span><span className="text-[#4fd6a6]">Verify</span><span className="opacity-40">→</span><span className="text-[#4fd6a6]">Trust</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {steps.map((st, i) => (
              <div key={i} data-reveal className="bg-white/5 border border-white/10 rounded-[18px] p-8 hover:bg-white/10 transition-colors duration-300">
                <div className="flex items-center gap-3.5">
                  <span className="font-display font-extrabold text-[15px] text-[#0F2A43] bg-[#4fd6a6] w-[34px] h-[34px] rounded-[10px] flex items-center justify-center">{st.n}</span>
                  <span className="text-[#4fd6a6]"><Icon path={st.icon} w={22}/></span>
                </div>
                <h3 className="text-[21px] font-bold text-white mt-5 font-display">{st.title}</h3>
                <p className="text-[15.5px] leading-[1.62] text-[#b6c6d4] mt-3 font-medium">{st.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-[92px]">
        <div data-reveal className="text-center max-w-[640px] mx-auto">
          <p className="font-display font-bold text-[14px] tracking-[0.08em] uppercase text-[#16B981]">Features</p>
          <h2 className="text-[34px] sm:text-[40px] leading-[1.1] font-extrabold tracking-tight text-[#0F2A43] mt-3.5 font-display">Everything you need to protect your brand.</h2>
          <p className="text-[18px] leading-[1.6] text-[#51606d] mt-4">Built around trust and evidence — simple for your customers, powerful for your team.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {features.map((ft, i) => (
            <div key={i} data-reveal className="bg-white border border-[#eaedef] rounded-[18px] p-7.5 shadow-[0_1px_3px_rgba(15,42,67,0.04)] hover:shadow-[0_16px_40px_rgba(15,42,67,0.10)] hover:-translate-y-[3px] transition-all duration-300">
              <div className="w-[50px] h-[50px] rounded-[14px] bg-[#e6f6ef] flex items-center justify-center text-[#0E7C7B]"><Icon path={ft.icon} w={24} /></div>
              <h3 className="text-[19px] font-bold text-[#0F2A43] mt-5 font-display">{ft.title}</h3>
              <p className="text-[15.5px] leading-[1.62] text-[#5c6a76] mt-2.5 font-medium">{ft.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BRAND / CUSTOMER SPLIT ===== */}
      <section className="bg-[#fbfcfc] border-y border-[#eef0f2]">
        <div className="max-w-7xl mx-auto px-6 py-[88px] grid grid-cols-1 md:grid-cols-2 gap-7">
          <div data-reveal className="bg-white border border-[#eaedef] rounded-[20px] p-8 sm:p-10 shadow-sm">
            <div className="inline-flex items-center gap-2 bg-[#eaf2f8] text-[#0F2A43] font-bold text-[13px] px-3.5 py-1.5 rounded-full">For brand owners</div>
            <h3 className="text-[26px] font-extrabold tracking-tight text-[#0F2A43] mt-5 font-display">Protection and clear visibility.</h3>
            <div className="flex flex-col gap-4 mt-5.5">
              {brandBenefits.map((b, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="shrink-0 mt-0.5 text-[#16B981]"><Icon path={checkIconPath} w={20}/></span>
                  <p className="text-[16px] leading-[1.55] text-[#42505c] font-medium">{b}</p>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal className="bg-[#0F2A43] rounded-[20px] p-8 sm:p-10 text-white shadow-xl">
            <div className="inline-flex items-center gap-2 bg-[#4fd6a6]/20 text-[#4fd6a6] font-bold text-[13px] px-3.5 py-1.5 rounded-full">For your customers</div>
            <h3 className="text-[26px] font-extrabold tracking-tight text-white mt-5 font-display">A reassuring check in seconds.</h3>
            <div className="flex flex-col gap-4 mt-5.5">
              {customerBenefits.map((b, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="shrink-0 mt-0.5 text-[#4fd6a6]"><Icon path={checkIconPath} w={20}/></span>
                  <p className="text-[16px] leading-[1.55] text-[#c3d1dd] font-medium">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-[92px]">
        <div data-reveal className="text-center max-w-[640px] mx-auto">
          <p className="font-display font-bold text-[14px] tracking-[0.08em] uppercase text-[#16B981]">Pricing</p>
          <h2 className="text-[34px] sm:text-[40px] leading-[1.1] font-extrabold tracking-tight text-[#0F2A43] mt-3.5 font-display">Simple plans. Unlimited verifications.</h2>
          <p className="text-[18px] leading-[1.6] text-[#51606d] mt-4 font-medium">Billed annually, in INR. Prices shown are exclusive of GST.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 items-start">
          {tiers.map((t, i) => (
            <div key={i} data-reveal className={`relative bg-white rounded-[18px] ${t.popular ? 'border-2 border-[#16B981] shadow-[0_24px_54px_rgba(22,185,129,0.18)] z-10' : 'border border-[#e6eaed] shadow-[0_1px_3px_rgba(15,42,67,0.05)]'}`}>
              {t.popular && <div className="absolute top-0 left-0 right-0 bg-[#16B981] text-white font-bold text-[12px] tracking-wider text-center py-1.5 rounded-t-[16px]">MOST POPULAR</div>}
              <div className={`${t.popular ? 'pt-11 pb-7.5 px-6' : 'p-7.5 px-6'}`}>
                <h3 className="font-display font-bold text-[18px] text-[#0F2A43]">{t.name}</h3>
                <div className="mt-3.5 min-h-[66px]">
                  <div className="flex items-baseline gap-1">
                    <span className={`font-display font-extrabold tracking-tight text-[#0F2A43] ${t.name === 'Enterprise' ? 'text-[32px]' : 'text-[28px]'}`}>{t.price}</span>
                    <span className="text-[13px] text-[#8b97a1] font-semibold">{t.per}</span>
                  </div>
                  <p className="text-[13px] text-[#7a8792] mt-1.5 leading-[1.4] font-medium">{t.note}</p>
                </div>
                <button
                  onClick={() => setCurrentPage('billing')}
                  className={`block w-full text-center mt-4.5 font-bold text-[15px] p-3 rounded-[11px] transition-colors cursor-pointer ${t.popular ? 'bg-[#16B981] text-white shadow-[0_10px_22px_rgba(22,185,129,0.3)] hover:bg-[#13a371]' : (t.dark ? 'bg-[#0F2A43] text-white hover:bg-[#0b1d2e]' : 'bg-[#eef6f2] text-[#0E7C7B] hover:bg-[#e2f0ea]')}`}
                >
                  {t.cta}
                </button>
                <div className={`h-[1px] my-6 ${t.popular ? 'bg-[#e2f2eb]' : 'bg-[#eef0f2]'}`}></div>
                <div className="flex flex-col gap-3">
                  {t.features.map((f, fi) => (
                    <div key={fi} className="flex gap-2.5 items-start">
                      <span className="shrink-0 mt-0.5 text-[#16B981]"><Icon path={checkIconPath} w={20}/></span>
                      <span className="text-[14px] leading-[1.5] text-[#516170] font-medium">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-[15px] text-[#5c6a76] mt-8 font-medium">Need more brands, SKUs, or users? Add-ons are available on any paid plan.</p>
        <p className="text-center text-[13px] text-[#a3adb5] mt-2">Founder note: confirm SKU / user counts (shown in brackets) before publishing.</p>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="bg-[#fbfcfc] border-t border-[#eef0f2]">
        <div className="max-w-[820px] mx-auto px-6 py-[90px]">
          <div data-reveal className="text-center">
            <p className="font-display font-bold text-[14px] tracking-[0.08em] uppercase text-[#16B981]">FAQ</p>
            <h2 className="text-[34px] sm:text-[40px] leading-[1.1] font-extrabold tracking-tight text-[#0F2A43] mt-3.5 font-display">Questions, answered plainly.</h2>
          </div>
          <div className="mt-11 flex flex-col gap-3">
            {faqs.map((fq, i) => (
              <div key={i} data-reveal className="bg-white border border-[#eaedef] rounded-[14px] overflow-hidden transition-all duration-300">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="font-display font-bold text-[17.5px] text-[#0F2A43]">{fq.q}</span>
                  <span className={`flex shrink-0 text-[#16B981] transition-transform duration-250 ${faqOpen === i ? 'rotate-180' : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${faqOpen === i ? 'max-h-96' : 'max-h-0'}`}>
                  <p className="px-6 pb-6 text-[16px] leading-[1.65] text-[#51606d] font-medium">{fq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="max-w-7xl mx-auto px-6 py-[90px]">
        <div data-reveal className="relative overflow-hidden bg-gradient-to-br from-[#0E7C7B] to-[#0F2A43] rounded-[26px] p-12 sm:p-16 text-center shadow-xl">
          <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_20%_30%,#4fd6a6_0,transparent_40%),radial-gradient(circle_at_85%_70%,#16B981_0,transparent_45%)]"></div>
          <div className="relative z-10">
            <h2 className="text-[32px] sm:text-[38px] leading-[1.12] font-extrabold tracking-tight text-white max-w-[640px] mx-auto font-display">Help every customer trust what they buy from you.</h2>
            <p className="text-[18px] text-[#cfe6e4] mt-4.5 max-w-[520px] mx-auto font-medium">Start your 14-day free trial today. No card required.</p>
            <div className="flex flex-wrap justify-center gap-3.5 mt-8">
              <button onClick={() => setCurrentPage('billing')} className="bg-[#16B981] text-white font-bold text-[17px] px-7 py-3.5 rounded-[12px] shadow-[0_10px_26px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform cursor-pointer">
                Start Free Trial
              </button>
              <button onClick={() => setCurrentPage('contact')} className="bg-white/10 text-white font-bold text-[17px] px-7 py-3.5 rounded-[12px] border border-white/25 hover:bg-white/20 transition-colors cursor-pointer">
                Talk to us
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

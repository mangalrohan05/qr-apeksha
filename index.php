<?php
$currentPage = 'home';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/png" href="assets/images/favicon.png">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Authentiq helps brand owners protect their products and their customers' trust. Put a verification QR on your packaging so anyone can scan, check the evidence, and get a confidence-scored authenticity result.">
  <meta property="og:title" content="Authentiq — Scan. Verify. Trust.">
  <meta property="og:description" content="A simple, evidence-based way for your customers to verify what they buy — and for your team to spot suspicious activity early.">
  <meta property="og:type" content="website">
  
  <title>Authentiq — Scan. Verify. Trust.</title>

  <!-- Tailwind CSS Play CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Manrope', 'sans-serif'],
            display: ['Sora', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <!-- Custom CSS Styles -->
  <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body class="min-h-screen bg-white text-[#38434f] antialiased selection:bg-[#16B981] selection:text-white">

  <!-- Header / Navbar Include -->
  <?php include 'components/navbar.php'; ?>

  <!-- Mobile Side Drawer Include -->
  <?php include 'components/sidedrawer.php'; ?>

  <main class="w-full">
    <!-- ===== HERO ===== -->
    <section id="home" class="relative overflow-hidden bg-gradient-to-b from-[#f4faf8] to-[#ffffff] via-[#f4faf8]">
      <div class="max-w-7xl mx-auto px-6 pt-[120px] sm:pt-[150px] pb-24 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
        
        <!-- Left Hero Content -->
        <div data-reveal class="max-w-2xl text-left">
          <div class="inline-flex items-center gap-2 bg-[#e6f6ef] text-[#0E7C7B] font-bold text-[13px] tracking-wide px-3.5 py-1.5 rounded-full">
            <span class="w-[7px] h-[7px] rounded-full bg-[#16B981] inline-block"></span>
            Now welcoming founding brands
          </div>
          <h1 class="text-[40px] sm:text-[48px] md:text-[54px] leading-[1.06] font-extrabold tracking-tight text-[#0F2A43] mt-5 font-display">
            Give your customers a simple way to <span class="text-[#0E7C7B]">trust</span> what they buy.
          </h1>
          <p class="text-[18px] sm:text-[19px] leading-[1.6] text-[#51606d] mt-5 max-w-[520px]">
            Put an Authentiq QR on your packaging. Anyone can scan it, check the product's details and evidence, and get a clear confidence score — so your brand and your customers stay a step ahead.
          </p>
          <div class="flex flex-wrap gap-3.5 mt-8">
            <a href="billing.php" class="bg-[#16B981] text-white font-bold text-[17px] px-7 py-3.5 rounded-[12px] shadow-[0_10px_24px_rgba(22,185,129,0.32)] hover:scale-105 transition-transform text-center inline-block">
              Start Free Trial
            </a>
            <a href="#how" class="bg-white text-[#0F2A43] font-bold text-[17px] px-6 py-3.5 rounded-[12px] border-[1.5px] border-[#d9e0e4] hover:bg-slate-50 transition-colors text-center inline-block">
              See how it works
            </a>
          </div>
          <p class="text-[14px] text-[#7a8792] mt-4 font-medium">14-day free trial · No card required</p>
        </div>

        <!-- Right Hero Mockup (Dynamic Scan Animation) -->
        <div data-reveal class="flex justify-center lg:justify-end">
          <div class="relative w-[300px] max-w-[82vw]">
            <!-- Background Glow -->
            <div class="absolute inset-[-8%_-6%] bg-[radial-gradient(circle_at_50%_42%,rgba(22,185,129,0.22),transparent_62%)] blur-[6px] z-0"></div>
            
            <!-- Mobile Shell -->
            <div class="relative z-10 bg-[#0F2A43] rounded-[42px] p-3 shadow-[0_40px_80px_rgba(15,42,67,0.28)]">
              <div class="bg-[#f4faf8] rounded-[32px] overflow-hidden relative">
                <!-- Speaker Notch -->
                <div class="absolute top-[12px] left-1/2 -translate-x-1/2 w-[90px] h-[20px] bg-[#0F2A43] rounded-full z-20"></div>
                
                <!-- Viewport Camera Scan -->
                <div class="relative h-[196px] bg-[#0F2A43] overflow-hidden">
                  <div class="absolute inset-0 opacity-[0.35]" style="background-image: linear-gradient(#12405f 1px,transparent 1px),linear-gradient(90deg,#12405f 1px,transparent 1px); background-size: 26px 26px;"></div>
                  
                  <!-- Package/QR Mockup -->
                  <div class="absolute top-[34px] left-1/2 -translate-x-1/2 w-[96px] h-[128px] bg-gradient-to-br from-white to-[#e8eef1] rounded-[10px] shadow-[0_12px_26px_rgba(0,0,0,0.35)]">
                    <div class="h-[40px] bg-[#16B981] rounded-t-[10px]"></div>
                    <div class="p-3">
                      <div class="h-[6px] w-[70%] bg-[#0F2A43] rounded-[3px]"></div>
                      <div class="h-[5px] w-[50%] bg-[#c3ccd2] rounded-[3px] mt-[7px]"></div>
                      <div class="mt-[16px] w-[40px] h-[40px] bg-[#0F2A43] rounded-[6px]"></div>
                    </div>
                  </div>
                  
                  <!-- Target Corners -->
                  <div class="absolute top-[26px] left-[26px] w-[26px] h-[26px] border-t-[3px] border-l-[3px] border-[#4fd6a6] rounded-tl-[6px]"></div>
                  <div class="absolute top-[26px] right-[26px] w-[26px] h-[26px] border-t-[3px] border-r-[3px] border-[#4fd6a6] rounded-tr-[6px]"></div>
                  <div class="absolute bottom-[26px] left-[26px] w-[26px] h-[26px] border-b-[3px] border-l-[3px] border-[#4fd6a6] rounded-bl-[6px]"></div>
                  <div class="absolute bottom-[26px] right-[26px] w-[26px] h-[26px] border-b-[3px] border-r-[3px] border-[#4fd6a6] rounded-br-[6px]"></div>
                  
                  <!-- Animated Scan Line -->
                  <div class="absolute left-[26px] right-[26px] h-[2px] bg-gradient-to-r from-transparent via-[#4fd6a6] to-transparent shadow-[0_0_12px_#4fd6a6]" style="animation: aq-scan 3.2s ease-in-out infinite;"></div>
                </div>
                
                <!-- Verification Screen Details -->
                <div class="p-[20px_18px_24px] text-left">
                  <div class="flex items-center gap-[13px]">
                    <div class="relative w-[62px] h-[62px] rounded-full shrink-0 flex items-center justify-center" style="background: conic-gradient(#16B981 0 88%, #dfe7ea 88% 100%);">
                      <div class="w-[48px] h-[48px] rounded-full bg-white flex flex-col items-center justify-center">
                        <span class="font-display font-extrabold text-[18px] text-[#0F2A43] leading-none">88</span>
                        <span class="text-[8px] text-[#8b97a1] font-semibold mt-[2px]">/100</span>
                      </div>
                    </div>
                    <div>
                      <div class="font-display font-bold text-[15px] text-[#0F2A43]">High confidence</div>
                      <div class="text-[12px] text-[#7a8792] mt-[2px] font-medium">Evidence checked</div>
                    </div>
                  </div>
                  <div class="mt-4 bg-[#e6f6ef] rounded-[12px] p-3 flex gap-2.5 items-start">
                    <span class="text-[#0E7C7B] shrink-0 mt-0.5">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </span>
                    <span class="text-[12.5px] leading-[1.45] text-[#20604f] font-medium font-sans">Recommended next step: details match. Keep your receipt.</span>
                  </div>
                  <button class="mt-3.5 w-full bg-white border-[1.5px] border-[#e0e6e9] text-[#516170] rounded-[10px] p-[11px] text-[13px] font-bold hover:bg-slate-50 transition-colors">
                    Report something suspicious
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ===== TRUST STRIP ===== -->
    <section class="border-y border-[#eef0f2] bg-[#fbfcfc]">
      <div class="max-w-[1100px] mx-auto py-8 px-6 text-center">
        <p class="text-[14px] font-semibold tracking-wider uppercase text-[#8b97a1]">Built for brands across</p>
        <div class="flex flex-wrap justify-center gap-3 mt-4">
          <?php 
          $industries = ['FMCG', 'Pharma', 'Agro', 'Liquor', 'Electronics', 'Manufacturing'];
          foreach ($industries as $ind): ?>
            <span class="font-display font-semibold text-[16px] text-[#516170] bg-white border border-[#e6eaed] px-4 py-2 rounded-full"><?php echo $ind; ?></span>
          <?php endforeach; ?>
        </div>
        <p class="text-[13px] text-[#a3adb5] mt-5 font-medium">Founding-brand logos will appear here — spots reserved.</p>
        <div class="flex flex-wrap justify-center gap-4 mt-3">
          <?php for ($i = 1; $i <= 5; $i++): ?>
            <div class="w-[118px] h-[44px] border-[1.5px] border-dashed border-[#d7dde1] rounded-[8px] flex items-center justify-center text-[#c3ccd2] text-[11px] font-mono select-none">brand logo</div>
          <?php endfor; ?>
        </div>
      </div>
    </section>

    <!-- ===== THE PROBLEM ===== -->
    <section class="max-w-7xl mx-auto px-6 py-[90px] text-left">
      <div data-reveal class="max-w-[720px]">
        <p class="font-display font-bold text-[14px] tracking-[0.08em] uppercase text-[#16B981]">The problem</p>
        <h2 class="text-[34px] sm:text-[38px] leading-[1.12] font-extrabold tracking-tight text-[#0F2A43] mt-3.5 font-display">When a product leaves your line, your brand is on its own.</h2>
        <p class="text-[18px] leading-[1.65] text-[#51606d] mt-4.5">Products get copied, refilled, and relabelled with fake batch or price details. Customers can't easily tell what's real. And you often hear about it far too late.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-11">
        <!-- Problem 1 -->
        <div data-reveal class="bg-[#fbfcfc] border border-[#eef0f2] rounded-[16px] p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div class="w-[46px] h-[46px] rounded-[12px] bg-[#fef1ee] flex items-center justify-center text-[#e07a55]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
              <path d="M16 3h3a2 2 0 0 1 2 2v3"></path>
              <path d="M8 21H5a2 2 0 0 1-2-2v-3"></path>
              <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
              <path d="M9 12l2 2 4-4"></path>
            </svg>
          </div>
          <h3 class="text-[19px] font-bold text-[#0F2A43] mt-4.5 font-display">Copies slip through</h3>
          <p class="text-[15.5px] leading-[1.6] text-[#5c6a76] mt-2.5 font-medium font-sans">Look-alike products and refilled packs reach shelves alongside your genuine goods.</p>
        </div>

        <!-- Problem 2 -->
        <div data-reveal class="bg-[#fbfcfc] border border-[#eef0f2] rounded-[16px] p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div class="w-[46px] h-[46px] rounded-[12px] bg-[#fef1ee] flex items-center justify-center text-[#e07a55]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="2" x2="12" y2="22"></line>
              <line x1="2" y1="12" x2="22" y2="12"></line>
            </svg>
          </div>
          <h3 class="text-[19px] font-bold text-[#0F2A43] mt-4.5 font-display">Fake batch & price</h3>
          <p class="text-[15.5px] leading-[1.6] text-[#5c6a76] mt-2.5 font-medium font-sans">Labels get swapped with wrong batch numbers, dates, or MRP — and customers can’t tell.</p>
        </div>

        <!-- Problem 3 -->
        <div data-reveal class="bg-[#fbfcfc] border border-[#eef0f2] rounded-[16px] p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div class="w-[46px] h-[46px] rounded-[12px] bg-[#fef1ee] flex items-center justify-center text-[#e07a55]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            </svg>
          </div>
          <h3 class="text-[19px] font-bold text-[#0F2A43] mt-4.5 font-display">You hear too late</h3>
          <p class="text-[15.5px] leading-[1.6] text-[#5c6a76] mt-2.5 font-medium font-sans">Without early signals, problems spread for months before your team finds out.</p>
        </div>
      </div>
    </section>

    <!-- ===== HOW IT WORKS ===== -->
    <section id="how" class="bg-[#0F2A43] text-white text-left">
      <div class="max-w-7xl mx-auto px-6 py-[92px]">
        <div data-reveal class="text-center max-w-[640px] mx-auto">
          <p class="font-display font-bold text-[14px] tracking-[0.08em] uppercase text-[#4fd6a6]">How it works</p>
          <h2 class="text-[34px] sm:text-[40px] leading-[1.1] font-extrabold tracking-tight text-white mt-3.5 font-display">Three simple steps to a more trusted brand.</h2>
          <div class="inline-flex items-center gap-3.5 mt-5 font-display font-bold text-[16px] text-[#8fb0c9]">
            <span class="text-[#4fd6a6]">Scan</span><span class="opacity-40">→</span><span class="text-[#4fd6a6]">Verify</span><span class="opacity-40">→</span><span class="text-[#4fd6a6]">Trust</span>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <!-- Step 1 -->
          <div data-reveal class="bg-white/5 border border-white/10 rounded-[18px] p-8 hover:bg-white/10 transition-colors duration-300">
            <div class="flex items-center gap-3.5">
              <span class="font-display font-extrabold text-[15px] text-[#0F2A43] bg-[#4fd6a6] w-[34px] h-[34px] rounded-[10px] flex items-center justify-center">1</span>
              <span class="text-[#4fd6a6]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 7V5a2 2 0 0 1 2-2h2"></path>
                  <path d="M16 3h2a2 2 0 0 1 2 2v2"></path>
                  <path d="M20 17v2a2 2 0 0 1-2 2h-2"></path>
                  <path d="M8 21H6a2 2 0 0 1-2-2v-2"></path>
                  <line x1="7" y1="12" x2="17" y2="12"></line>
                </svg>
              </span>
            </div>
            <h3 class="text-[21px] font-bold text-white mt-5 font-display">Register & tag</h3>
            <p class="text-[15.5px] leading-[1.62] text-[#b6c6d4] mt-3 font-medium font-sans">Register your brand and products, then put an Authentiq QR on your packaging.</p>
          </div>

          <!-- Step 2 -->
          <div data-reveal class="bg-white/5 border border-white/10 rounded-[18px] p-8 hover:bg-white/10 transition-colors duration-300">
            <div class="flex items-center gap-3.5">
              <span class="font-display font-extrabold text-[15px] text-[#0F2A43] bg-[#4fd6a6] w-[34px] h-[34px] rounded-[10px] flex items-center justify-center">2</span>
              <span class="text-[#4fd6a6]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
                  <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
                  <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
                  <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
                  <rect x="7" y="8" width="4" height="4"></rect>
                  <line x1="15" y1="8" x2="17" y2="8"></line>
                  <line x1="15" y1="12" x2="17" y2="12"></line>
                  <line x1="13" y1="15" x2="17" y2="15"></line>
                </svg>
              </span>
            </div>
            <h3 class="text-[21px] font-bold text-white mt-5 font-display">Customers scan</h3>
            <p class="text-[15.5px] leading-[1.62] text-[#b6c6d4] mt-3 font-medium font-sans">A customer or your vigilance team scans the QR and adds a few product photos — no app or account needed for a basic check.</p>
          </div>

          <!-- Step 3 -->
          <div data-reveal class="bg-white/5 border border-white/10 rounded-[18px] p-8 hover:bg-white/10 transition-colors duration-300">
            <div class="flex items-center gap-3.5">
              <span class="font-display font-extrabold text-[15px] text-[#0F2A43] bg-[#4fd6a6] w-[34px] h-[34px] rounded-[10px] flex items-center justify-center">3</span>
              <span class="text-[#4fd6a6]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 12l2 2 4-4"></path>
                  <circle cx="12" cy="12" r="9"></circle>
                </svg>
              </span>
            </div>
            <h3 class="text-[21px] font-bold text-white mt-5 font-display">Verify & act</h3>
            <p class="text-[15.5px] leading-[1.62] text-[#b6c6d4] mt-3 font-medium font-sans">They get a clear confidence score and a recommended next step, and can report anything suspicious. You see the signals.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== FEATURES ===== -->
    <section id="features" class="max-w-7xl mx-auto px-6 py-[92px] text-left">
      <div data-reveal class="text-center max-w-[640px] mx-auto">
        <p class="font-display font-bold text-[14px] tracking-[0.08em] uppercase text-[#16B981]">Features</p>
        <h2 class="text-[34px] sm:text-[40px] leading-[1.1] font-extrabold tracking-tight text-[#0F2A43] mt-3.5 font-display">Everything you need to protect your brand.</h2>
        <p class="text-[18px] leading-[1.6] text-[#51606d] mt-4 font-medium">Built around trust and evidence — simple for your customers, powerful for your team.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        
        <!-- Feature 1 -->
        <div data-reveal class="bg-white border border-[#eaedef] rounded-[18px] p-7.5 shadow-[0_1px_3px_rgba(15,42,67,0.04)] hover:shadow-[0_16px_40px_rgba(15,42,67,0.10)] hover:-translate-y-[3px] transition-all duration-300">
          <div class="w-[50px] h-[50px] rounded-[14px] bg-[#e6f6ef] flex items-center justify-center text-[#0E7C7B]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 12l2 2 4-4"></path>
              <circle cx="12" cy="12" r="9"></circle>
            </svg>
          </div>
          <h3 class="text-[19px] font-bold text-[#0F2A43] mt-5 font-display">Evidence-based verification</h3>
          <p class="text-[15.5px] leading-[1.62] text-[#5c6a76] mt-2.5 font-medium font-sans">Every check weighs the product’s details and the evidence provided, then returns a clear confidence score.</p>
        </div>

        <!-- Feature 2 -->
        <div data-reveal class="bg-white border border-[#eaedef] rounded-[18px] p-7.5 shadow-[0_1px_3px_rgba(15,42,67,0.04)] hover:shadow-[0_16px_40px_rgba(15,42,67,0.10)] hover:-translate-y-[3px] transition-all duration-300">
          <div class="w-[50px] h-[50px] rounded-[14px] bg-[#e6f6ef] flex items-center justify-center text-[#0E7C7B]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z"></path>
              <path d="M9 12l2 2 4-4"></path>
            </svg>
          </div>
          <h3 class="text-[19px] font-bold text-[#0F2A43] mt-5 font-display">Report straight to you</h3>
          <p class="text-[15.5px] leading-[1.62] text-[#5c6a76] mt-2.5 font-medium font-sans">Customers and vigilance staff can flag anything suspicious, and the report lands with your team right away.</p>
        </div>

        <!-- Feature 3 -->
        <div data-reveal class="bg-white border border-[#eaedef] rounded-[18px] p-7.5 shadow-[0_1px_3px_rgba(15,42,67,0.04)] hover:shadow-[0_16px_40px_rgba(15,42,67,0.10)] hover:-translate-y-[3px] transition-all duration-300">
          <div class="w-[50px] h-[50px] rounded-[14px] bg-[#e6f6ef] flex items-center justify-center text-[#0E7C7B]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 3v18h18"></path>
              <polyline points="7 14 10 11 13 14 18 8"></polyline>
            </svg>
          </div>
          <h3 class="text-[19px] font-bold text-[#0F2A43] mt-5 font-display">Early fraud & location signals</h3>
          <p class="text-[15.5px] leading-[1.62] text-[#5c6a76] mt-2.5 font-medium font-sans">Spot suspicious activity by area with aggregate, privacy-respecting signals — no tracking of individual people.</p>
        </div>

        <!-- Feature 4 -->
        <div data-reveal class="bg-white border border-[#eaedef] rounded-[18px] p-7.5 shadow-[0_1px_3px_rgba(15,42,67,0.04)] hover:shadow-[0_16px_40px_rgba(15,42,67,0.10)] hover:-translate-y-[3px] transition-all duration-300">
          <div class="w-[50px] h-[50px] rounded-[14px] bg-[#e6f6ef] flex items-center justify-center text-[#0E7C7B]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>
          <h3 class="text-[19px] font-bold text-[#0F2A43] mt-5 font-display">Many brands, one place</h3>
          <p class="text-[15.5px] leading-[1.62] text-[#5c6a76] mt-2.5 font-medium font-sans">Manage multiple brands, products, and batches from a single, organised workspace.</p>
        </div>

        <!-- Feature 5 -->
        <div data-reveal class="bg-white border border-[#eaedef] rounded-[18px] p-7.5 shadow-[0_1px_3px_rgba(15,42,67,0.04)] hover:shadow-[0_16px_40px_rgba(15,42,67,0.10)] hover:-translate-y-[3px] transition-all duration-300">
          <div class="w-[50px] h-[50px] rounded-[14px] bg-[#e6f6ef] flex items-center justify-center text-[#0E7C7B]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="7" y="8" width="4" height="4"></rect>
              <rect x="4" y="4" width="6" height="6"></rect>
              <rect x="14" y="4" width="6" height="6"></rect>
              <rect x="14" y="14" width="6" height="6"></rect>
              <rect x="4" y="14" width="6" height="6"></rect>
            </svg>
          </div>
          <h3 class="text-[19px] font-bold text-[#0F2A43] mt-5 font-display">Bulk QR for your lines</h3>
          <p class="text-[15.5px] leading-[1.62] text-[#5c6a76] mt-2.5 font-medium font-sans">Generate QR codes in bulk so your packaging lines keep moving without slowing down.</p>
        </div>

        <!-- Feature 6 -->
        <div data-reveal class="bg-white border border-[#eaedef] rounded-[18px] p-7.5 shadow-[0_1px_3px_rgba(15,42,67,0.04)] hover:shadow-[0_16px_40px_rgba(15,42,67,0.10)] hover:-translate-y-[3px] transition-all duration-300">
          <div class="w-[50px] h-[50px] rounded-[14px] bg-[#e6f6ef] flex items-center justify-center text-[#0E7C7B]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 3H7a4 4 0 0 0-4 4v1"></path>
              <path d="M16 3h1a4 4 0 0 1 4 4v1"></path>
              <path d="M8 21H7a4 4 0 0 1-4-4v-1"></path>
              <path d="M16 21h1a4 4 0 0 0 4-4v-1"></path>
              <line x1="9" y1="12" x2="15" y2="12"></line>
            </svg>
          </div>
          <h3 class="text-[19px] font-bold text-[#0F2A43] mt-5 font-display">Connect your systems</h3>
          <p class="text-[15.5px] leading-[1.62] text-[#5c6a76] mt-2.5 font-medium font-sans">Fits alongside the tools you already use, so trust data flows where your business needs it.</p>
        </div>

      </div>
    </section>

    <!-- ===== BRAND / CUSTOMER SPLIT ===== -->
    <section class="bg-[#fbfcfc] border-y border-[#eef0f2] text-left">
      <div class="max-w-7xl mx-auto px-6 py-[88px] grid grid-cols-1 md:grid-cols-2 gap-7">
        <!-- Brand Benefits -->
        <div data-reveal class="bg-white border border-[#eaedef] rounded-[20px] p-8 sm:p-10 shadow-sm">
          <div class="inline-flex items-center gap-2 bg-[#eaf2f8] text-[#0F2A43] font-bold text-[13px] px-3.5 py-1.5 rounded-full font-sans">For brand owners</div>
          <h3 class="text-[26px] font-extrabold tracking-tight text-[#0F2A43] mt-5 font-display">Protection and clear visibility.</h3>
          <div class="flex flex-col gap-4 mt-5.5 mt-5">
            <?php 
            $brandBenefits = [
              'Protect your brand from copies, refills, and relabelled packs.',
              'See suspicious-activity signals by area, early enough to act.',
              'Receive reports from customers and your vigilance team in one place.',
              'Build lasting trust with the people who buy from you.'
            ];
            foreach ($brandBenefits as $b): ?>
              <div class="flex gap-3 items-start">
                <span class="shrink-0 mt-0.5 text-[#16B981]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <p class="text-[16px] leading-[1.55] text-[#42505c] font-medium font-sans"><?php echo $b; ?></p>
              </div>
            <?php endforeach; ?>
          </div>
        </div>

        <!-- Customer Benefits -->
        <div data-reveal class="bg-[#0F2A43] rounded-[20px] p-8 sm:p-10 text-white shadow-xl">
          <div class="inline-flex items-center gap-2 bg-[#4fd6a6]/20 text-[#4fd6a6] font-bold text-[13px] px-3.5 py-1.5 rounded-full font-sans">For your customers</div>
          <h3 class="text-[26px] font-extrabold tracking-tight text-white mt-5 font-display">A reassuring check in seconds.</h3>
          <div class="flex flex-col gap-4 mt-5">
            <?php 
            $customerBenefits = [
              'Check a product in seconds by scanning the QR on the pack.',
              'No app to download and no account needed for a basic check.',
              'Get a clear confidence score and a recommended next step.',
              'Report anything that looks off, directly to the brand.'
            ];
            foreach ($customerBenefits as $b): ?>
              <div class="flex gap-3 items-start">
                <span class="shrink-0 mt-0.5 text-[#4fd6a6]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <p class="text-[16px] leading-[1.55] text-[#c3d1dd] font-medium font-sans"><?php echo $b; ?></p>
              </div>
            <?php endforeach; ?>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== PRICING ===== -->
    <section id="pricing" class="max-w-7xl mx-auto px-6 py-[92px] text-left">
      <div data-reveal class="text-center max-w-[640px] mx-auto">
        <p class="font-display font-bold text-[14px] tracking-[0.08em] uppercase text-[#16B981]">Pricing</p>
        <h2 class="text-[34px] sm:text-[40px] leading-[1.1] font-extrabold tracking-tight text-[#0F2A43] mt-3.5 font-display">Simple plans. Unlimited verifications.</h2>
        <p class="text-[18px] leading-[1.6] text-[#51606d] mt-4 font-medium">Billed annually, in INR. Prices shown are exclusive of GST.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 items-start">
        <?php 
        $tiers = [
          [
            'name' => 'Free Trial', 'price' => '₹0', 'per' => '/ 14 days', 
            'note' => 'No card required. Around 250 verifications. Becomes read-only when the trial ends.', 
            'cta' => 'Start Free Trial', 'popular' => false, 'dark' => false, 'plan_id' => 'free',
            'features' => ['~250 verifications', '1 brand to get started', 'Try core features', 'Read-only at expiry']
          ],
          [
            'name' => 'Business', 'price' => '₹55,000', 'per' => '/ year + GST', 
            'note' => 'For a single, growing brand.', 
            'cta' => 'Start Free Trial', 'popular' => false, 'dark' => false, 'plan_id' => 'business',
            'features' => ['1 brand', '[30] SKUs', '5 users', 'Unlimited verifications', 'Basic batch management', 'City-level location signals']
          ],
          [
            'name' => 'Business Pro', 'price' => '₹2,45,000', 'per' => '/ year + GST', 
            'note' => 'For multi-brand teams that need more depth.', 
            'cta' => 'Start Free Trial', 'popular' => true, 'dark' => false, 'plan_id' => 'pro',
            'features' => ['5 brands', '[300] SKUs', '50 users', 'Unlimited verifications', 'Full batch management', 'Location heatmap', 'Bulk QR generation', 'Integration / API', 'Advanced analytics']
          ],
          [
            'name' => 'Enterprise', 'price' => 'Custom', 'per' => '', 
            'note' => 'For large operations with higher limits and dedicated support.', 
            'cta' => 'Contact Sales', 'popular' => false, 'dark' => true, 'plan_id' => 'enterprise',
            'features' => ['Everything in Business Pro', 'Higher limits', 'Dedicated support', 'Tailored onboarding']
          ]
        ];
        
        foreach ($tiers as $t): ?>
          <div data-reveal class="relative bg-white rounded-[18px] <?php echo $t['popular'] ? 'border-2 border-[#16B981] shadow-[0_24px_54px_rgba(22,185,129,0.18)] z-10' : 'border border-[#e6eaed] shadow-[0_1px_3px_rgba(15,42,67,0.05)]'; ?>">
            <?php if ($t['popular']): ?>
              <div class="absolute top-0 left-0 right-0 bg-[#16B981] text-white font-bold text-[12px] tracking-wider text-center py-1.5 rounded-t-[16px]">MOST POPULAR</div>
            <?php endif; ?>
            <div class="<?php echo $t['popular'] ? 'pt-11 pb-7.5 px-6 pb-6' : 'p-7.5 px-6 pb-6'; ?>">
              <h3 class="font-display font-bold text-[18px] text-[#0F2A43]"><?php echo $t['name']; ?></h3>
              <div class="mt-3.5 min-h-[66px]">
                <div class="flex items-baseline gap-1">
                  <span class="font-display font-extrabold tracking-tight text-[#0F2A43] <?php echo $t['name'] === 'Enterprise' ? 'text-[32px]' : 'text-[28px]'; ?>"><?php echo $t['price']; ?></span>
                  <span class="text-[13px] text-[#8b97a1] font-semibold"><?php echo $t['per']; ?></span>
                </div>
                <p class="text-[13px] text-[#7a8792] mt-1.5 leading-[1.4] font-medium font-sans"><?php echo $t['note']; ?></p>
              </div>
              <a href="billing.php?plan=<?php echo $t['plan_id']; ?>" class="block w-full text-center mt-5 font-bold text-[15px] p-3 rounded-[11px] transition-colors <?php echo $t['popular'] ? 'bg-[#16B981] text-white shadow-[0_10px_22px_rgba(22,185,129,0.3)] hover:bg-[#13a371]' : ($t['dark'] ? 'bg-[#0F2A43] text-white hover:bg-[#0b1d2e]' : 'bg-[#eef6f2] text-[#0E7C7B] hover:bg-[#e2f0ea]'); ?>">
                <?php echo $t['cta']; ?>
              </a>
              <div class="h-[1px] my-6 <?php echo $t['popular'] ? 'bg-[#e2f2eb]' : 'bg-[#eef0f2]'; ?>"></div>
              <div class="flex flex-col gap-3">
                <?php foreach ($t['features'] as $f): ?>
                  <div class="flex gap-2.5 items-start">
                    <span class="shrink-0 mt-0.5 text-[#16B981]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span class="text-[14px] leading-[1.5] text-[#516170] font-medium font-sans"><?php echo $f; ?></span>
                  </div>
                <?php endforeach; ?>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
      <p class="text-center text-[15px] text-[#5c6a76] mt-8 font-medium">Need more brands, SKUs, or users? Add-ons are available on any paid plan.</p>
      <p class="text-center text-[13px] text-[#a3adb5] mt-2">Founder note: confirm SKU / user counts (shown in brackets) before publishing.</p>
    </section>

    <!-- ===== FAQ ===== -->
    <section id="faq" class="bg-[#fbfcfc] border-t border-[#eef0f2] text-left">
      <div class="max-w-[820px] mx-auto px-6 py-[90px]">
        <div data-reveal class="text-center">
          <p class="font-display font-bold text-[14px] tracking-[0.08em] uppercase text-[#16B981]">FAQ</p>
          <h2 class="text-[34px] sm:text-[40px] leading-[1.1] font-extrabold tracking-tight text-[#0F2A43] mt-3.5 font-display">Questions, answered plainly.</h2>
        </div>
        <div class="mt-11 flex flex-col gap-3">
          <?php 
          $faqs = [
            [
              'q' => 'What is Authentiq, and who is it for?',
              'a' => 'Authentiq is a product trust platform for brand owners who sell physical packaged goods. It gives your customers and your vigilance team a simple way to check a product and see a confidence-scored result — helping protect your brand and the people who buy from you.'
            ],
            [
              'q' => 'Do my customers need to download an app or create an account?',
              'a' => 'No. For a basic check, a customer simply scans the QR on the packaging with their phone camera — no app to install and no account to create.'
            ],
            [
              'q' => 'How does a customer verify a product?',
              'a' => 'They scan the QR on the pack, add a few product photos, and receive a clear confidence score along with a recommended next step. It only takes a few moments.'
            ],
            [
              'q' => 'Does scanning the QR alone mean the product is genuine?',
              'a' => 'No. The QR is the starting point, not proof on its own. Verification weighs the product’s details and the evidence provided, then returns a confidence score and a recommended next step — never a guarantee.'
            ],
            [
              'q' => 'What happens if something looks suspicious?',
              'a' => 'The customer or your team can report it to you directly. Your team sees the signal, so you can look into patterns and act early.'
            ],
            [
              'q' => 'Can I manage more than one brand or product?',
              'a' => 'Yes. You can manage multiple brands, products, and batches from one workspace, with plans that scale as you grow.'
            ],
            [
              'q' => 'Can Authentiq connect to our existing systems?',
              'a' => 'Yes. At a business level, Authentiq is built to fit alongside the tools you already use, so trust data reaches the right places in your organisation.'
            ]
          ];
          
          foreach ($faqs as $i => $fq): ?>
            <div data-reveal class="bg-white border border-[#eaedef] rounded-[14px] overflow-hidden transition-all duration-300">
              <button class="faq-btn w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer">
                <span class="font-display font-bold text-[17.5px] text-[#0F2A43]"><?php echo $fq['q']; ?></span>
                <span class="faq-arrow flex shrink-0 text-[#16B981] transition-transform duration-200">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
              <div class="faq-panel transition-all duration-300 ease-in-out overflow-hidden max-h-0">
                <p class="px-6 pb-6 text-[16px] leading-[1.65] text-[#51606d] font-medium font-sans"><?php echo $fq['a']; ?></p>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <!-- ===== FINAL CTA ===== -->
    <section class="max-w-7xl mx-auto px-6 py-[90px] text-center">
      <div data-reveal class="relative overflow-hidden bg-gradient-to-br from-[#0E7C7B] to-[#0F2A43] rounded-[26px] p-12 sm:p-16 shadow-xl">
        <div class="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_20%_30%,#4fd6a6_0,transparent_40%),radial-gradient(circle_at_85%_70%,#16B981_0,transparent_45%)]"></div>
        <div class="relative z-10">
          <h2 class="text-[32px] sm:text-[38px] leading-[1.12] font-extrabold tracking-tight text-white max-w-[640px] mx-auto font-display">Help every customer trust what they buy from you.</h2>
          <p class="text-[18px] text-[#cfe6e4] mt-4.5 max-w-[520px] mx-auto font-medium">Start your 14-day free trial today. No card required.</p>
          <div class="flex flex-wrap justify-center gap-3.5 mt-8">
            <a href="billing.php" class="bg-[#16B981] text-white font-bold text-[17px] px-7 py-3.5 rounded-[12px] shadow-[0_10px_26px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform text-center inline-block">
              Start Free Trial
            </a>
            <a href="contact.php" class="bg-white/10 text-white font-bold text-[17px] px-7 py-3.5 rounded-[12px] border border-white/25 hover:bg-white/20 transition-colors text-center inline-block">
              Talk to us
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer Include -->
  <?php include 'components/footer.php'; ?>

  <!-- Scripts -->
  <script src="assets/js/scripts.js" defer></script>
</body>
</html>

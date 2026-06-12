import { useState } from 'react';

export default function FAQSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "How do dynamic QR identifiers differ from regular QR codes?",
      a: "Standard QR codes only route to a static web link. Authentiq generates unique dynamic serialized hash nodes for individual product items. If a single code signature gets copied or scanned abnormally, our filters immediately flags it."
    },
    {
      q: "Can we integrate this into our existing packaging process?",
      a: "Yes. Our batch system hooks directly into high-throughput warehouse printers and label applicators via standard API structures, adding zero delay to physical line operations."
    },
    {
      q: "What happens when a counterfeit code signature is detected?",
      a: "The system triggers a real-time warning dashboard alert to your team, maps the scanning telemetry coordinates, and presents a 'Suspect Warning' screen to the consumer scanning the product."
    },
    {
      q: "How do we verify the authenticity of each individual item?",
      a: "We assign a unique, tamper-proof dynamic QR code to every single unit, creating a digital twin that verifies the item’s origin and authenticity the moment it is scanned."
    },
    {
      q: "Is special equipment required to scan the Authentiq dynamic QR codes?",
      a: "No. Our system is designed to work with any standard smartphone camera. We prioritize accessibility, ensuring that consumers, logistics personnel, and retailers can verify authenticity without needing proprietary hardware or apps."
    }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-light text-[#003057] tracking-tight">Frequently Asked Questions</h2>
        <p className="text-slate-450 text-[11px] sm:text-xs font-normal">Everything you need to understand regarding our tracking integration logs.</p>
      </div>

      <div className="space-y-2.5 text-left">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-slate-50/40 border border-slate-200/70 rounded-lg overflow-hidden hover:bg-slate-50 hover:border-[#00b074]/35 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <button
              onClick={() => toggleFaq(idx)}
              className="w-full py-3 px-5 text-left flex justify-between items-center bg-transparent transition-colors focus:outline-none cursor-pointer"
            >
              <h4 className="font-medium text-[#003057] text-xs sm:text-[13px] flex items-center pr-4">
                <span className="text-[#00b074] font-semibold text-xs sm:text-sm mr-2.5 flex-shrink-0">Q.</span>
                {faq.q}
              </h4>
              <svg
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-350 flex-shrink-0 ${
                  openFaqIndex === idx ? 'transform rotate-180 text-[#00b074]' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openFaqIndex === idx ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <p className="pl-9 pr-5 pb-3.5 text-slate-500 text-[11px] sm:text-xs leading-relaxed font-normal bg-transparent">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

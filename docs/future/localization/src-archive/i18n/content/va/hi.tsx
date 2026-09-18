"use client";

import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, AlertCircle, Info, ArrowRight } from "lucide-react";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "वीए (VA) मॉर्गेज क्या है और कौन पात्र है?",
    "answer": "यह अमेरिकी सैन्य कर्मियों, दिग्गजों और पात्र जीवनसाथियों के लिए सरकार द्वारा समर्थित गृह ऋण है।"
  },
  {
    "question": "क्या वीए ऋण में डाउन पेमेंट अनिवार्य है?",
    "answer": "नहीं, वीए ऋण 0% डाउन पेमेंट (बिना किसी अग्रिम भुगतान) और बिना PMI बीमा के 100% वित्तपोषण की अनुमति देता है।"
  },
  {
    "question": "वीए फंडिंग शुल्क क्या है?",
    "answer": "यह एकमुश्त सरकारी शुल्क (1.25% से 3.30%) है जो मासिक बीमा की जगह लेता है।"
  },
  {
    "question": "फंडिंग शुल्क से किसे छूट प्राप्त है?",
    "answer": "सेवा-संबंधी विकलांगता वाले दिग्गजों (10%+), पर्पल हार्ट प्राप्तकर्ताओं और पात्र आश्रितों को।"
  },
  {
    "question": "क्या शुल्क को ऋण में शामिल करना चाहिए या नकद देना चाहिए?",
    "answer": "ऋण में शामिल करने से तुरंत नकद बचता है लेकिन मासिक ब्याज और ऋण राशि बढ़ जाती है।"
  },
  {
    "question": "प्रथम उपयोग और पुन: उपयोग में क्या अंतर है?",
    "answer": "0% डाउन पर प्रथम उपयोग में 2.15% और बाद के उपयोगों में 3.30% शुल्क लगता है। 5%+ डाउन पर दोनों 1.50% हो जाते हैं।"
  },
  {
    "question": "क्या वीए ऋण में मासिक PMI बीमा लगता है?",
    "answer": "नहीं, वीए ऋणों में कभी भी मासिक PMI बीमा नहीं लगता।"
  },
  {
    "question": "IRRRL रीफाइनेंस क्या है?",
    "answer": "बिना मूल्यांकन और मात्र 0.50% शुल्क पर ब्याज दर घटाने की सरल रीफाइनेंस प्रक्रिया।"
  },
  {
    "question": "एंटाइटेलमेंट (Entitlement) क्या है?",
    "answer": "यह सरकारी गारंटी है; पूर्ण अधिकार होने पर 0% डाउन पर कोई ऋण सीमा नहीं होती।"
  },
  {
    "question": "न्यूनतम सेवा आवश्यकताएं क्या हैं?",
    "answer": "युद्धकाल में 90 दिन, शांतिकाल में 181 दिन या रिजर्व में 6 वर्ष।"
  },
  {
    "question": "FHA और कन्वेंशनल से यह कैसे बेहतर है?",
    "answer": "FHA के स्थायी मासिक शुल्क से बचाता है और कन्वेंशनल के 5%–20% डाउन पेमेंट की आवश्यकता को समाप्त करता है।"
  },
  {
    "question": "तेजी से ऋण कैसे चुकाएं?",
    "answer": "पाक्षिक (bi-weekly) भुगतान या मासिक अतिरिक्त मूलधन भुगतान द्वारा।"
  }
];

export const seo = {
  title: "वीए मॉर्गेज कैलकुलेटर (VA Mortgage Calculator) — VA ऋण",
  description: "0% डाउन पेमेंट वाले वीए (VA) ऋण, फंडिंग शुल्क (Funding Fee), PITI मासिक किस्त, विकलांगता छूट और ऋण तुलना की गणना करें।",
  keywords: ["वीए मॉर्गेज कैलकुलेटर","सैनिक गृह ऋण","va funding fee calculator","मिल्ट्री लोन"]
};

export const ContentComponent = function VAMortgageContentHI() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          वीए मॉर्गेज कैलकुलेटर (VA Mortgage Calculator)
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          वीए मॉर्गेज किस्त, फंडिंग शुल्क, PITI मासिक खर्च, 0% डाउन क्रय क्षमता, भुगतान त्वरण और IRRRL रीफाइनेंस बचत का विस्तृत विश्लेषण।
        </p>
      </div>

      {/* 2. WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. वीए (VA) मॉर्गेज कैलकुलेटर क्या है?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          यह कैलकुलेटर अमेरिकी वेटरन्स अफेयर्स विभाग द्वारा समर्थित सैन्य गृह ऋण की मासिक और दीर्घकालिक लागत का आकलन करता है।
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>योजना मॉडल सूचना</span>
          </div>
          <p>
            यह एक गणितीय सिमुलेशन है और आधिकारिक पात्रता प्रमाण पत्र (COE) नहीं है।
          </p>
        </div>
      </section>

      {/* 3. HOW TO USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. वीए कैलकुलेटर का उपयोग कैसे करें
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          अपने ऋण परिदृश्य का विश्लेषण करने के लिए इन चरणों का पालन करें :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
            <div key={0} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">1. घर का खरीद मूल्य दर्ज करें।</span>
            </div>
            <div key={1} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">2. डाउन पेमेंट प्रतिशत (0% से 100%) चुनें।</span>
            </div>
            <div key={2} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">3. सैन्य श्रेणी चुनें (सक्रिय/वेटरन, रिजर्व या जीवनसाथी)।</span>
            </div>
            <div key={3} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">4. प्रथम उपयोग या पुन: उपयोग चुनें।</span>
            </div>
            <div key={4} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">5. निश्चित ब्याज दर और अवधि दर्ज करें।</span>
            </div>
            <div key={5} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">6. फंडिंग शुल्क का प्रकार चुनें (ऋण में वित्तपोषित या नकद भुगतान)।</span>
            </div>
            <div key={6} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">7. विकलांगता छूट विकल्प का चयन करें यदि लागू हो।</span>
            </div>
            <div key={7} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">8. कुल वित्तपोषित राशि और PITI मासिक किस्त की समीक्षा करें।</span>
            </div>
            <div key={8} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">9. संपूर्ण परिशोधन तालिका का निरीक्षण करें।</span>
            </div>
            <div key={9} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">10. FHA और कन्वेंशनल ऋणों से तुलना करें।</span>
            </div>
            <div key={10} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">11. 0% डाउन क्षमता के लिए एंटाइटेलमेंट की जांच करें।</span>
            </div>
            <div key={11} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">12. पाक्षिक भुगतानों से ब्याज बचत देखें।</span>
            </div>
            <div key={12} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">13. अतिरिक्त मूलधन भुगतानों का अनुकरण करें।</span>
            </div>
            <div key={13} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">14. IRRRL रीफाइनेंस बचत का मूल्यांकन करें।</span>
            </div>
        </div>
      </section>

      {/* 4. CORE FORMULA */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. मुख्य परिशोधन सूत्र एवं PITI गणना
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          मासिक मूलधन और ब्याज (P&I) की गणना का सूत्र :
        </p>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-center font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans">मासिक मूलधन एवं ब्याज समीकरण</div>
          <div className="p-3 bg-white dark:bg-slate-950 rounded-xl text-base font-bold text-blue-600 dark:text-blue-400 shadow-inner">
            {"M = P × [r(1+r)^n] / [(1+r)^n - 1]"}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 font-sans text-left space-y-1.5 pt-1">
            <div>• <strong>M :</strong>  मासिक मूलधन और ब्याज किस्त।</div>
            <div>• <strong>P :</strong>  कुल वित्तपोषित ऋण (मूल ऋण + फंडिंग शुल्क)।</div>
            <div>• <strong>r :</strong>  मासिक ब्याज दर (वार्षिक दर / 12 / 100)।</div>
            <div>• <strong>n :</strong>  कुल मासिक भुगतानों की संख्या (अवधि × 12)।</div>
          </div>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300">
          कुल मासिक आवास खर्च (PITI) सभी लागतों को जोड़ता है :
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"कुल PITI = P&I + (संपत्ति कर / 12) + (गृह बीमा / 12) + मासिक सोसाइटी शुल्क"}
        </div>
      </section>

      {/* 5. FUNDING FEE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. वीए फंडिंग शुल्क (Funding Fee)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          यह कानून द्वारा अनिवार्य एकमुश्त सरकारी शुल्क है जो ऋण गारंटी कार्यक्रम को निधि देता है।
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          यह मासिक PMI बीमा को समाप्त करता है और इसे ऋण में शामिल किया जा सकता है या नकद दिया जा सकता है।
        </p>
      </section>

      {/* 6. FIRST VS SUBSEQUENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. प्रथम उपयोग बनाम पुन: उपयोग
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          पूर्व उपयोग के आधार पर 0% डाउन पर शुल्क भिन्न होता है :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600">प्रथम उपयोग (0% डाउन)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              500,000 $ पर 2.15% (10,750 $) शुल्क लगता है। कुल ऋण 510,750 $ और मासिक PITI 3,936.62 $ होता है।
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600">पुन: उपयोग (0% डाउन)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              दोबारा उपयोग पर 3.30% (16,500 $) शुल्क लगता है। कुल ऋण 516,500 $ और PITI 3,973.13 $ होता है।
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500 italic">
          *नोट : 5%+ डाउन पेमेंट पर दोनों स्थितियों में शुल्क घटकर 1.50% हो जाता है।
        </p>
      </section>

      {/* 7. STATUTORY MATRIX TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. वैधानिक वीए फंडिंग शुल्क तालिका
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">डाउन पेमेंट श्रेणी</th>
                <th className="p-3">प्रथम उपयोग</th>
                <th className="p-3">पुन: उपयोग</th>
                <th className="p-3 rounded-tr-xl">छूट प्राप्त दर</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"< 5% डाउन (0% Down)"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"2.15%"}</td>
                <td className="p-3 font-mono font-bold text-red-500">{"3.30%"}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">{"0.00% (छूट)"}</td>
              </tr>
              
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">{"5% – 9.99% डाउन"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.50%"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.50%"}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">{"0.00% (छूट)"}</td>
              </tr>
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"≥ 10% डाउन"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.25%"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.25%"}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">{"0.00% (छूट)"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. EXEMPTIONS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. फंडिंग शुल्क से वैधानिक छूट (0% शुल्क)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          संघीय कानून के तहत निम्नलिखित श्रेणियां पूरी तरह से शुल्क-मुक्त हैं :
        </p>
        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-xs space-y-2 text-slate-700 dark:text-slate-300">
          <span className="font-extrabold text-emerald-700 dark:text-emerald-300 block">छूट के पात्र :</span>
          <ul className="space-y-1 list-disc list-inside">
            <li>सेवा-संबंधी विकलांगता (10%+) के लिए VA मुआवजा पाने वाले वेटरन्स।</li>
            <li>विकलांगता मुआवजे के पात्र सैन्य सेवानिवृत्त।</li>
            <li>पर्पल हार्ट प्राप्त सक्रिय सैनिक।</li>
            <li>शहीद सैनिकों के पात्र जीवनसाथी (DIC प्राप्तकर्ता)।</li>
          </ul>
        </div>
      </section>

      {/* 9. CASH VS FINANCED */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. तुलना : शुल्क का वित्तपोषण बनाम नकद भुगतान
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          प्रारंभिक नकदी और दीर्घकालिक ब्याज का संतुलन :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-blue-600">ऋण में वित्तपोषित</h3>
            <p className="text-slate-600 dark:text-slate-400">
              500,000 $ पर 3.30% (16,500 $) जोड़ने से ऋण 516,500 $ और किस्त 3,264.80 $ हो जाती है। क्लोजिंग पर नकद 12,500 $ रहता है।
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-blue-600">क्लोजिंग पर नकद भुगतान</h3>
            <p className="text-slate-600 dark:text-slate-400">
              16,500 $ नकद देने से ऋण 500,000 $ और किस्त 3,160.34 $ रहती है, लेकिन क्लोजिंग नकद बढ़कर 29,000 $ हो जाता है।
            </p>
          </div>
        </div>
      </section>

      {/* 10. 3-WAY COMPARISON TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. 3-तरफा तुलना : VA बनाम FHA बनाम कन्वेंशनल
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">कार्यक्रम</th>
                <th className="p-3">न्यूनतम डाउन</th>
                <th className="p-3">मासिक बीमा</th>
                <th className="p-3">अग्रिम शुल्क</th>
                <th className="p-3 rounded-tr-xl">30 वर्षीय कुल खर्च</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"VA ऋण"}</td>
                <td className="p-3 font-bold text-emerald-600">{"0% (0 $)"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"0 $ (कोई PMI नहीं)"}</td>
                <td className="p-3">{"2.15% वित्तपोषित (10,750 $)"}</td>
                <td className="p-3 font-mono font-bold text-blue-600">{"1,357,200 $ (3,770 $/माह)"}</td>
              </tr>
              
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">{"FHA ऋण"}</td>
                <td className="p-3 font-bold ">{"3.5% (17,500 $)"}</td>
                <td className="p-3 text-red-500">{"0.55% स्थायी MIP"}</td>
                <td className="p-3">{"1.75% UFMIP (8,444 $)"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1,421,640 $ (3,949 $/माह)"}</td>
              </tr>
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"कन्वेंशनल"}</td>
                <td className="p-3 font-bold text-emerald-600">{"5.0% (25,000 $)"}</td>
                <td className="p-3 ">{"0.60% PMI (वर्ष 1-8)"}</td>
                <td className="p-3">{"0 $ अग्रिम शुल्क"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1,356,903 $ (3,943 $/माह)"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          वीए ऋण स्थायी मासिक शुल्क न होने से FHA से 64,440 $ बचाता है और बिना 25,000 $ नकद दिए कन्वेंशनल ऋण के बराबर लागत देता है।
        </p>
      </section>

      {/* 11. ENTITLEMENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. एंटाइटेलमेंट एवं 0% डाउन क्रय क्षमता
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          एंटाइटेलमेंट 0% डाउन पर उपलब्ध अधिकतम गारंटी निर्धारित करता है :
        </p>
        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-bold text-blue-600">पूर्ण एंटाइटेलमेंट</h3>
            <p className="text-slate-600 dark:text-slate-400">
              2019 के कानून के बाद पूर्ण अधिकार वाले वेटरन्स के लिए कोई अधिकतम ऋण सीमा नहीं है।
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-bold text-blue-600">आंशिक एंटाइटेलमेंट</h3>
            <p className="text-slate-600 dark:text-slate-400">
              सक्रिय ऋण होने पर काउंटी सीमाएं लागू होती हैं :
            </p>
            <div className="font-mono bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 space-y-0.5 text-[11px] text-slate-700 dark:text-slate-300">
              <div>{"शेष गारंटी = max(0, काउंटी सीमा × 25% - प्रयुक्त एंटाइटेलमेंट)"}</div>
              <div>{"0% डाउन पर अधिकतम खरीद मूल्य = शेष गारंटी × 4"}</div>
              <div>{"आवश्यक डाउन पेमेंट = max(0, (लक्ष्य मूल्य - अधिकतम 0% मूल्य) × 25%)"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. ACCELERATED PAYOFF */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. भुगतान त्वरण : पाक्षिक भुगतान और अतिरिक्त किस्तें
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-blue-600">पाक्षिक (Bi-Weekly) भुगतान</h3>
            <p className="text-slate-600 dark:text-slate-400">
              हर 2 सप्ताह में आधी किस्त देने से 510,750 $ पर 150,027 $ ब्याज बचता है और अवधि 5.8 वर्ष कम होती है।
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-blue-600">मासिक अतिरिक्त मूलधन भुगतान</h3>
            <p className="text-slate-600 dark:text-slate-400">
              200 $/माह अतिरिक्त देने से 118,241 $ ब्याज बचता है और अवधि 55 महीने (4.6 वर्ष) कम होती है।
            </p>
          </div>
        </div>
      </section>

      {/* 13. IRRRL */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. वीए IRRRL स्ट्रीमलाइन रीफाइनेंस
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          बिना मूल्यांकन और मात्र 0.50% शुल्क पर दर घटाने की सुविधा :
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
          <span className="font-bold text-blue-600 block">IRRRL उदाहरण (350,000 $ शेष, दर 7.25% से 6.00%) :</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-center">
            
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">मासिक बचत</span>
              <span className="text-emerald-600 font-extrabold">279 $ / माह</span>
            </div>
            
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">लागत वसूली समय</span>
              <span className="text-emerald-600 font-extrabold">17 महीने</span>
            </div>
            
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">5 वर्षीय शुद्ध बचत</span>
              <span className="text-emerald-600 font-extrabold">11,990 $</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 italic pt-1">
            *नोट : अवधि को दोबारा 30 वर्ष करने से कुल ब्याज बढ़ सकता है।
          </p>
        </div>
      </section>

      {/* 14. SERVICE ELIGIBILITY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. पात्रता एवं सेवा मानक
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">युद्धकालीन सेवा</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">युद्ध काल में कम से कम 90 दिन की निरंतर सक्रिय सेवा।</p>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">शांतिकालीन सेवा</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">शांतिकालीन अवधि में कम से कम 181 दिन की निरंतर सेवा।</p>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">नेशनल गार्ड / रिजर्व</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">कम से कम 6 वर्ष की सेवा या 90 दिन की सक्रिय सेवा।</p>
          </div>
        </div>
      </section>

      {/* 15. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. सामान्य गलतियों से बचें
        </h2>
        <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>प्रथम उपयोग या पुन: उपयोग का गलत चयन करना।</li>
            <li>सभी के लिए समान शुल्क मान लेना।</li>
            <li>यह भूल जाना कि शुल्क वित्तपोषण से मूलधन और ब्याज बढ़ता है।</li>
            <li>वीए की P&I की तुलना अन्य ऋणों के कुल PITI से करना।</li>
            <li>काउंटी सीमाओं को अपरिवर्तनीय मान लेना।</li>
            <li>सिमुलेशन को आधिकारिक पात्रता प्रमाण पत्र समझना।</li>
            <li>पाक्षिक भुगतानों को बिना बैंक पुष्टि के लागू मान लेना।</li>
            <li>IRRRL में अवधि विस्तार के प्रभाव को नजरअंदाज करना।</li>
            <li>विकलांगता छूट का दस्तावेजी प्रमाण न होना।</li>
            <li>20%+ डाउन पेमेंट होने पर भी अन्य विकल्पों की जांच न करना।</li>
          </ul>
        </div>
      </section>

      {/* 16. REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>शैक्षणिक मार्गदर्शन एवं विनियामक सूचना</span>
        </div>
        <p>
          वीए ऋण अमेरिकी संहिता के शीर्षक 38 और वीए नियमों द्वारा शासित हैं। यह कैलकुलेटर केवल नियोजन सिमुलेशन प्रदान करता है।
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "hi",
  calculatorSlug: "va-mortgage-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;

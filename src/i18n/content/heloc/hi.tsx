"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Info, AlertTriangle } from "lucide-react";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "हेलॉक (HELOC) क्या है और यह कैसे काम करता है?",
    "answer": "हेलॉक आपके घर की इक्विटी पर आधारित एक परिवर्तनीय दर वाली क्रेडिट लाइन है जिसमें आप ड्रॉ अवधि के दौरान आवश्यकतानुसार धनराशि निकाल सकते हैं।"
  },
  {
    "question": "मुझे कितनी अधिकतम क्रेडिट लाइन मिल सकती है?",
    "answer": "अधिकांश ऋणदाता घर के मूल्यांकन मूल्य का 80% से 85% सीएलटीवी (CLTV) और पहली मॉर्गेज की शेष राशि घटाकर क्रेडिट लाइन स्वीकृत करते हैं।"
  },
  {
    "question": "ड्रॉ अवधि और पुनर्भुगतान अवधि के भुगतानों में क्या अंतर है?",
    "answer": "ड्रॉ अवधि में आप केवल उपयोग की गई राशि पर मासिक ब्याज देते हैं। पुनर्भुगतान अवधि में मूलधन और ब्याज दोनों की निश्चित किस्त देनी होती है।"
  },
  {
    "question": "पेमेंट शॉक (Payment Shock) क्या है?",
    "answer": "जब ड्रॉ अवधि समाप्त होती है और अनिवार्य मूलधन पुनर्भुगतान शुरू होता है, तो मासिक किस्त में आने वाले अचानक उछाल को पेमेंट शॉक कहते हैं।"
  },
  {
    "question": "हेलॉक पर क्या ब्याज दर लागू होती है?",
    "answer": "आमतौर पर प्राइम रेट से जुड़ी परिवर्तनीय ब्याज दर लागू होती है।"
  },
  {
    "question": "हेलॉक से जुड़े शुल्क क्या हैं?",
    "answer": "इसमें वार्षिक रखरखाव शुल्क (50 $ से 100 $), मूल्यांकन शुल्क और क्लोजिंग लागत शामिल हो सकती है।"
  },
  {
    "question": "क्या हेलॉक का ब्याज कर-मुक्त है?",
    "answer": "यह केवल तभी कर-कटौती योग्य है जब राशि घर के नवीनीकरण या सुधार में लगाई गई हो।"
  },
  {
    "question": "क्या बैंक क्रेडिट लाइन को फ्रीज कर सकता है?",
    "answer": "हाँ, घर का बाजार मूल्य गिरने या साख कमजोर होने पर बैंक लाइन फ्रीज कर सकता है।"
  },
  {
    "question": "यदि मैं क्रेडिट का उपयोग न करूँ तो क्या होगा?",
    "answer": "अप्रयुक्त राशि पर कोई ब्याज नहीं लगता।"
  },
  {
    "question": "क्या ड्रॉ अवधि में मूलधन चुकाया जा सकता है?",
    "answer": "हाँ, आप क्रेडिट सीमा बहाल करने के लिए कभी भी स्वैच्छिक भुगतान कर सकते हैं।"
  },
  {
    "question": "कितना क्रेडिट स्कोर आवश्यक है?",
    "answer": "660–680 का स्कोर न्यूनतम और 720+ सर्वोत्तम दरों के लिए आवश्यक है।"
  },
  {
    "question": "ब्याज दर बढ़ने का क्या असर होता है?",
    "answer": "दर बढ़ने पर मासिक ब्याज और भविष्य की किस्तें तुरंत बढ़ जाती हैं।"
  }
];

export const seo = {
  title: "हेलॉक क्रेडिट लाइन कैलकुलेटर (HELOC Calculator) — अधिकतम अनुमेय ऋण",
  description: "हेलॉक (HELOC) ऋण क्षमता, केवल-ब्याज ड्रॉ भुगतान, पुनर्भुगतान चरण की किस्तें और परिवर्तनीय ब्याज दर परिदृश्यों की गणना करें।",
  keywords: ["हेलॉक कैलकुलेटर","होम इक्विटी लाइन ऑफ क्रेडिट","गृह इक्विटी क्रेडिट लाइन","हेलॉक ब्याज दर"]
};

export const ContentComponent = function HELOCContentHI() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          हेलॉक क्रेडिट लाइन कैलकुलेटर (HELOC Calculator)
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          हेलॉक ऋण क्षमता, संयुक्त ऋण-से-मूल्य (CLTV), केवल-ब्याज ड्रॉ भुगतान, पुनर्भुगतान किस्तें, पेमेंट शॉक और ब्याज दर वृद्धि परिदृश्यों का विश्लेषण करें।
        </p>
      </div>

      {/* 1. WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. हेलॉक (HELOC) कैलकुलेटर क्या है?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          हेलॉक कैलकुलेटर यह अनुमान लगाता है कि आप अपनी होम इक्विटी के आधार पर कितनी क्रेडिट लाइन ले सकते हैं और दोनों चरणों में किस्तों का व्यवहार कैसा रहेगा।
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          फिक्स्ड लोन के विपरीत, हेलॉक में 10 साल की ड्रॉ अवधि और 20 साल की पुनर्भुगतान अवधि होती है।
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>योजना मॉडल सूचना</span>
          </div>
          <p>
            यह एक गणितीय सिमुलेशन है और ऋणदाता की औपचारिक स्वीकृति नहीं है।
          </p>
        </div>
      </section>

      {/* 2. HOW TO USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. हेलॉक कैलकुलेटर का उपयोग कैसे करें
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          क्रेडिट लाइन के विश्लेषण के लिए इन चरणों का पालन करें :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
            <div key={0} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">1. घर का अनुमानित बाजार मूल्य दर्ज करें।</span>
            </div>
            <div key={1} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">2. पहले मॉर्गेज का शेष दर्ज करें।</span>
            </div>
            <div key={2} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">3. अधिकतम सीएलटीवी सीमा (80% मानक या 85%) चुनें।</span>
            </div>
            <div key={3} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">4. इच्छित हेलॉक क्रेडिट लाइन दर्ज करें।</span>
            </div>
            <div key={4} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">5. प्रारंभिक परिवर्तनीय ब्याज दर दर्ज करें।</span>
            </div>
            <div key={5} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">6. ड्रॉ अवधि (5, 10, 15 वर्ष) और पुनर्भुगतान अवधि (10, 15, 20 वर्ष) चुनें।</span>
            </div>
            <div key={6} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">7. क्लोजिंग लागत और वार्षिक शुल्क दर्ज करें।</span>
            </div>
            <div key={7} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">8. ड्रॉ भुगतान प्रकार चुनें (केवल ब्याज या मूलधन + ब्याज)।</span>
            </div>
            <div key={8} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">9. अधिकतम क्षमता, ड्रॉ किस्त और पुनर्भुगतान किस्त की समीक्षा करें।</span>
            </div>
            <div key={9} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">10. दो-चरणीय परिशोधन तालिका का निरीक्षण करें।</span>
            </div>
            <div key={10} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">11. ब्याज दर वृद्धि परिदृश्यों (+1%, +2%, +3%) का परीक्षण करें।</span>
            </div>
            <div key={11} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">12. भविष्य के आहरण और अतिरिक्त भुगतानों का अनुकरण करें।</span>
            </div>
            <div key={12} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">13. फिक्स्ड होम इक्विटी लोन से तुलना करें।</span>
            </div>
            <div key={13} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">14. कर कटौती पात्रता की जांच करें।</span>
            </div>
        </div>
      </section>

      {/* 3. CAPACITY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. हेलॉक उधार क्षमता की गणना
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          अधिकतम सीमा सीएलटीवी के आधार पर निर्धारित होती है :
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"अधिकतम अनुमेय ऋण = बाजार मूल्य × सीएलटीवी %"}</div>
          <div>{"अधिकतम हेलॉक लाइन = max(0, अधिकतम अनुमेय ऋण - पहली मॉर्गेज)"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          उदाहरण : 500,000 $ के घर पर 260,000 $ पहली मॉर्गेज और 80% सीएलटीवी होने पर अधिकतम क्रेडिट लाइन 140,000 $ बनती है। 50,000 $ की लाइन पर सीएलटीवी 62.0% रहता है।
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          यह सुरक्षा बफर बनाए रखने में मदद करता है।
        </p>
      </section>

      {/* 4. DRAW VS REPAY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. ड्रॉ अवधि बनाम पुनर्भुगतान अवधि
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          हेलॉक दो अलग-अलग चरणों में विभाजित होता है :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ड्रॉ चरण (10 वर्ष) में केवल ब्याज दिया जाता है। पुनर्भुगतान चरण (20 वर्ष) में अनिवार्य रूप से मूलधन और ब्याज चुकाया जाता है।
        </p>
      </section>

      {/* 5. INTEREST ONLY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. केवल-ब्याज ड्रॉ भुगतान
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          मासिक ब्याज किस्त (I) का सूत्र :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          I = उपयोग की गई राशि × (वार्षिक दर / 12)। 50,000 $ पर 8.50% की दर से मासिक किस्त 354.17 $ होती है।
        </p>
      </section>

      {/* 6. FULL PAYMENTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. पुनर्भुगतान चरण में पूर्ण किस्त
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          पुनर्भुगतान चरण में मानक एन्युइटी किस्त लागू होती है :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          50,000 $ पर 8.50% की दर से 20 वर्षों के लिए मासिक किस्त 433.91 $ होगी।
        </p>
      </section>

      {/* 7. PAYMENT SHOCK */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. पेमेंट शॉक (Payment Shock) विश्लेषण
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          पेमेंट शॉक पुनर्भुगतान चरण शुरू होने पर किस्त में आने वाली बढ़ोतरी को दर्शाता है।
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          किस्त 354.17 $ से बढ़कर 433.91 $ (+22.5%) हो जाती है। 10 वर्ष की अवधि में यह 620.06 $ (+75.1%) हो जाएगी।
        </p>
      </section>

      {/* 8. STRESS TEST */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. परिवर्तनीय दर तनाव परिदृश्य
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ब्याज दर बढ़ने पर किस्तों पर असर पड़ता है :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          +2% दर वृद्धि (10.50% पर) ड्रॉ किस्त को 437.50 $ (+23.5%) और पुनर्भुगतान किस्त को 498.98 $ (+15.0%) कर देती है।
        </p>
      </section>

      {/* 9. ANNUAL FEES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. वार्षिक रखरखाव शुल्क
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          वार्षिक शुल्क (50 $ से 100 $) कुल लागत बढ़ाते हैं।
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          30 वर्षों में 75 $ वार्षिक शुल्क कुल 2,250 $ बनता है।
        </p>
      </section>

      {/* 10. MULTI DRAW */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. अतिरिक्त मूलधन भुगतान
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          नियमित अतिरिक्त भुगतान ब्याज लागत को काफी कम कर देते हैं।
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          100 $ प्रति माह अतिरिक्त देने से हजारों डॉलर का ब्याज बचता है।
        </p>
      </section>

      {/* 11. HELOC VS HELOAN */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. हेलॉक बनाम फिक्स्ड लोन
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          हेलॉक क्रमिक खर्चों के लिए लचीलापन देता है।
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          फिक्स्ड लोन स्थिर किस्तों की गारंटी देता है।
        </p>
      </section>

      {/* 12. HELOC VS CASH OUT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. हेलॉक बनाम कैश-आउट रीफाइनेंस
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          हेलॉक पहले ऋण की कम ब्याज दर को सुरक्षित रखता है।
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          रीफाइनेंस पूरे ऋण को मौजूदा बाजार दर पर बदल देता है।
        </p>
      </section>

      {/* 13. CREDIT QUAL */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. पात्रता मानदंड
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          DTI अनुपात 43% से कम और 680+ क्रेडिट स्कोर होना चाहिए।
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          संपत्ति का मजबूत मूल्यांकन आवश्यक है।
        </p>
      </section>

      {/* 14. TAX */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. कर कटौती नियम
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          केवल घर के सुधार में प्रयुक्त राशि पर कर छूट मिलती है।
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          व्यक्तिगत खर्चों पर कोई कर लाभ नहीं मिलता।
        </p>
      </section>

      {/* 15. FREEZE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          15. क्रेडिट लाइन फ्रीज होने का जोखिम
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          बाजार मूल्य गिरने पर बैंक लाइन रोक सकता है।
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          अलग से आपातकालीन फंड रखना आवश्यक है।
        </p>
      </section>

      {/* 16. UNDERWATER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          16. नकारात्मक इक्विटी
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          मूल्य गिरने पर अतिरिक्त आहरण बंद हो जाते हैं।
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          भुगतान दायित्व जारी रहते हैं।
        </p>
      </section>

      {/* 17. FIXED RATE LOCK */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          17. फिक्स्ड-रेट लॉक विकल्प
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          कुछ बैंक उपयोग किए गए हिस्से को फिक्स्ड दर में बदलने का विकल्प देते हैं।
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          यह दर वृद्धि से सुरक्षा प्रदान करता है।
        </p>
      </section>

      {/* 18. CLOSING AND EARLY CLOSURE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          18. क्लोजिंग व कैंसिलेशन शुल्क
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          प्रारंभिक शुल्क 500 $ से 2,500 $ होते हैं।
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          जल्दी बंद करने पर शुल्क लग सकता है।
        </p>
      </section>

      {/* 19. STRATEGIC USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          19. रणनीतिक वित्तीय उपयोग
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          मूल्य संवर्धन परियोजनाओं के लिए उपयोग करना सर्वोत्तम है।
        </p>
      </section>

      {/* 20. TRANSITION PLANNING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          20. पुनर्भुगतान की पूर्व-योजना
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          किस्त वृद्धि के लिए पहले से बजट बनाना आवश्यक है।
        </p>
      </section>

      {/* 21. OPTIMIZATION TIPS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          21. हेलॉक प्रबंधन सुझाव
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ड्रॉ अवधि में भी मूलधन चुकाने से ब्याज कम होता है।
        </p>
      </section>

      {/* 22. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          22. बचने योग्य सामान्य गलतियाँ
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>10 साल तक केवल ब्याज देना और किस्त उछाल की तैयारी न करना।</li>
            <li>क्रेडिट लाइन का उपयोग गैर-उत्पादक उपभोग के लिए करना।</li>
            <li>ब्याज दर बढ़ने के जोखिम को अनदेखा करना।</li>
            <li>लाइन कभी फ्रीज न होने का अति-विश्वास।</li>
            <li>वार्षिक रखरखाव शुल्कों की अनदेखी करना।</li>
            <li>सभी ब्याज को बिना शर्त कर-मुक्त मान लेना।</li>
            <li>फिक्स्ड लोन विकल्पों से तुलना न करना।</li>
            <li>सुरक्षा बफर रखे बिना 100% क्रेडिट का उपयोग करना।</li>
            <li>समय पूर्व बंदी शुल्क की जांच न करना।</li>
            <li>तनाव परिदृश्यों का परीक्षण न करना।</li>
          </ul>
        </div>
      </section>

      {/* 23. CORE FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          23. हेलॉक मुख्य सूत्रों का सारांश
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
          <div>• <strong>अधिकतम अनुमेय ऋण:</strong>  बाजार मूल्य × सीएलटीवी %</div>
          <div>• <strong>अधिकतम हेलॉक लाइन:</strong>  max(0, अधिकतम अनुमेय ऋण - पहली मॉर्गेज)</div>
          <div>• <strong>उपयोग उपरांत सीएलटीवी:</strong>  (पहली मॉर्गेज + उपयोग राशि) / बाजार मूल्य × 100</div>
          <div>• <strong>मासिक ब्याज किस्त:</strong>  उपयोग राशि × (वार्षिक दर / 12)</div>
          <div>• <strong>पुनर्भुगतान किस्त:</strong>  P × [r(1+r)^n] / [(1+r)^n - 1]</div>
          <div>• <strong>पेमेंट शॉक:</strong>  (पुनर्भुगतान किस्त - ड्रॉ किस्त) / ड्रॉ किस्त × 100</div>
          <div>• <strong>अनुमानित कर बचत:</strong>  कटौती योग्य ब्याज × कर दर</div>
        </div>
      </section>

      {/* 24. REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>शैक्षणिक मार्गदर्शन एवं विनियामक सूचना</span>
        </div>
        <p>
          हेलोक ऋण उपभोक्ता संरक्षण कानूनों के अधीन हैं। यह कैलकुलेटर केवल नियोजन उद्देश्यों के लिए गणितीय सिमुलेशन प्रदान करता है।
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "hi",
  calculatorSlug: "heloc-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;

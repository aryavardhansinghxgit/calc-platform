"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  Scale,
  Calculator,
} from "lucide-react";
import { CalculatorLocalizedContent, FAQItem } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "बिजनेस लोन कैलकुलेटर क्या है?",
    "answer": "यह कैलकुलेटर ऋण राशि, ब्याज दर, अवधि और शुल्कों के आधार पर वाणिज्यिक ऋण की मासिक किस्त, कुल ब्याज और कुल लागत का सटीक अनुमान लगाता है।"
  },
  {
    "question": "बिजनेस लोन की ईएमआई की गणना कैसे की जाती है?",
    "answer": "नियमित किस्तों वाले ऋण के लिए सूत्र है: PMT = [P × r × (1+r)^n] / [(1+r)^n − 1], जहां r मासिक ब्याज दर और n महीनों की कुल संख्या है।"
  },
  {
    "question": "बिजनेस लोन पर मुझे कितना ब्याज देना होगा?",
    "answer": "कुल ब्याज सभी निर्धारित मासिक भुगतानों के योग में से मूलधन घटाकर निकाला जाता है।"
  },
  {
    "question": "क्या प्रोसेसिंग और दस्तावेज़ीकरण शुल्क महत्वपूर्ण हैं?",
    "answer": "हाँ, अपफ्रंट शुल्क आपके हाथ में आने वाली शुद्ध राशि को कम करते हैं और ऋण की वास्तविक वार्षिक लागत (APR) को बढ़ा देते हैं।"
  },
  {
    "question": "सांकेतिक ब्याज दर और वास्तविक APR में क्या अंतर है?",
    "answer": "सांकेतिक दर केवल बकाया ऋण पर लागू होती है, जबकि वास्तविक actuarial APR सभी शुल्कों और कैश-फ्लो के समय को ध्यान में रखकर निकाला जाता है।"
  },
  {
    "question": "क्या बिजनेस लोन का APR उपभोक्ता लोन जैसा ही होता है?",
    "answer": "हमेशा नहीं। व्यावसायिक ऋण उपभोक्ता संरक्षण नियमों के दायरे से बाहर हो सकते हैं, इसलिए कैलकुलेटर का APR आर्थिक तुलनात्मक साधन है।"
  },
  {
    "question": "बिजनेस लोन में DSCR का क्या अर्थ है?",
    "answer": "DSCR (डेट सर्विस कवरेज रेशियो) यह मापता है कि व्यवसाय का शुद्ध परिचालन लाभ (NOI) ऋण की वार्षिक किस्तों को चुकाने के लिए कितना पर्याप्त है।"
  },
  {
    "question": "क्या हर बिजनेस लोन के लिए 1.25x DSCR अनिवार्य है?",
    "answer": "नहीं। 1.25x एक सामान्य वित्तीय बेंचमार्क है, लेकिन विभिन्न बैंक अपनी नीतियों के अनुसार अलग मानक तय करते हैं।"
  },
  {
    "question": "SBA 7(a) लोन क्या है?",
    "answer": "यह यूएस स्मॉल बिजनेस एडमिनिस्ट्रेशन का प्रमुख ऋण कार्यक्रम (50 लाख डॉलर तक) है जो कार्यशील पूंजी, उपकरण और व्यवसाय विस्तार के लिए दिया जाता है।"
  },
  {
    "question": "SBA 504 लोन क्या है?",
    "answer": "यह अचल संपत्तियों जैसे वाणिज्यिक रियल एस्टेट और भारी मशीनरी के लिए लंबी अवधि का फिक्स्ड-रेट ऋण (55 लाख डॉलर तक) है।"
  },
  {
    "question": "SBA माइक्रोलोन क्या है?",
    "answer": "यह छोटे व्यवसायों के लिए 50,000 डॉलर तक का लघु ऋण है जो मध्यस्थ वित्तीय संस्थानों के माध्यम से उपलब्ध कराया जाता है।"
  },
  {
    "question": "क्या SBA लोन की 100% गारंटी देता है?",
    "answer": "नहीं। SBA आमतौर पर 75% से 85% हिस्से की गारंटी देता है, बाकी जोखिम बैंक का होता है।"
  },
  {
    "question": "क्या बिजनेस लोन का उपयोग वर्किंग कैपिटल के लिए किया जा सकता है?",
    "answer": "हाँ, अधिकांश व्यावसायिक ऋण उत्पाद दैनिक कार्यशील पूंजी और इन्वेंट्री की खरीद की अनुमति देते हैं।"
  },
  {
    "question": "क्या लंबी अवधि चुनने से कुल ब्याज कम होता है?",
    "answer": "नहीं। लंबी अवधि से मासिक किस्त तो घटती है लेकिन कुल ब्याज का भुगतान बहुत अधिक बढ़ जाता है।"
  },
  {
    "question": "क्या बिजनेस लोन का ब्याज टैक्स में कटौती योग्य है?",
    "answer": "हाँ, व्यावसायिक उपयोग के लिए लिए गए ऋण का ब्याज सामान्यतः व्यावसायिक व्यय के रूप में टैक्स में छूट योग्य होता है।"
  }
];

export const seo = {
  title: "बिजनेस लोन कैलकुलेटर — ईएमआई, ब्याज, शुल्क, वास्तविक APR और वाणिज्यिक ऋण विश्लेषण",
  description: "व्यावसायिक ऋण की मासिक ईएमआई, कुल ब्याज, प्रोसेसिंग शुल्क, वास्तविक actuarial APR, SBA लोन और DSCR कैश-फ्लो कवरेज की गणना करें।",
  keywords: ["बिजनेस लोन कैलकुलेटर","व्यावसायिक ऋण","business loan calculator","dscr calculator","commercial loan apr"]
};

export const ContentComponent: React.FC = () => {
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: faqs.length }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1: Title & Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. बिजनेस लोन कैलकुलेटर क्या है?
          </h2>
          <p>
            केवल विज्ञापित ब्याज दर देखकर बिजनेस लोन लेना भ्रामक हो सकता है। ऋण की वास्तविक लागत अवधि, प्रोसेसिंग शुल्क और दस्तावेज़ीकरण खर्चों पर निर्भर करती है।
          </p>
          <p>
            यह कैलकुलेटर सभी वित्तीय पहलुओं को एक साथ विश्लेषित करता है: मासिक ईएमआई, कुल ब्याज, कुल लागत, अमोर्टाइजेशन शेड्यूल और DSCR विश्लेषण।
          </p>
          <p>
            गणना के परिणाम वित्तीय योजना और तुलनात्मक अध्ययन के लिए हैं। अंतिम शर्तें ऋणदाता बैंक द्वारा निर्धारित की जाती हैं।
          </p>
        </section>

        {/* Section 2: What Is a Business Loan? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. व्यावसायिक ऋण (Business Loan) क्या है?
          </h2>
          <p>
            बिजनेस लोन व्यावसायिक उद्देश्यों जैसे वर्किंग कैपिटल, मशीनरी खरीद, इन्वेंट्री, रियल एस्टेट या व्यवसाय विस्तार के लिए लिया जाने वाला ऋण है।
          </p>
          <p>
            यह विभिन्न रूपों में मिलता है: सावधि ऋण (टर्म लोन), रिवॉल्विंग क्रेडिट लाइन और सरकारी गारंटी वाले SBA 7(a) ऋण।
          </p>
          <p>
            ऋण संरचना का चुनाव महत्वपूर्ण है क्योंकि समान ब्याज दर वाले दो ऋणों की कुल लागत शुल्कों के कारण भिन्न हो सकती है।
          </p>
        </section>

        {/* Section 3: How Payment Is Calculated & Formulas */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. बिजनेस लोन ईएमआई की गणना कैसे होती है?
          </h2>
          <p>
            समान मासिक किस्तों वाले ऋण के लिए मानक वित्तीय सूत्र का उपयोग किया जाता है:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            PMT = [ P × r × (1 + r)^n ] / [ (1 + r)^n − 1 ]
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            जहां: P = मूलधन, r = मासिक ब्याज दर (वार्षिक दर / 12), n = कुल महीनों की संख्या, PMT = मासिक ईएमआई।
          </p>
          <p>
            ऋण की अवधि लागत को सीधे प्रभावित करती है: अवधि बढ़ाने से ईएमआई कम होती है लेकिन कुल ब्याज बढ़ जाता है।
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5 text-xs">
            <strong className="text-slate-900 dark:text-slate-100 font-bold block">
              उदाहरण: 10,000 $ का ऋण, 10% ब्याज, 5 वर्ष (60 महीने)
            </strong>
            <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
              <li>मासिक ईएमआई (PMT): 212.47 $ प्रति माह</li>
              <li>कुल भुगतान (60 महीने): 60 × 212.47 $ = 12,748.23 $</li>
              <li>चुकाया गया मूलधन: 10,000.00 $</li>
              <li>कुल ब्याज भुगतान: 2,748.23 $</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Total Cost Is More Than Interest */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. कुल लागत केवल ब्याज नहीं: वाणिज्यिक शुल्क
          </h2>
          <p>
            व्यावसायिक ऋण में ब्याज व्यय और कुल वित्तीय लागत के अंतर को समझना आवश्यक है। बैंक ओरिजिनेशन और फाइल शुल्क भी जोड़ते हैं।
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-zinc-800 font-semibold text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="p-2.5 border-b">{"लागत घटक"}</th>
                  <th className="p-2.5 border-b text-right">{"राशि ($)"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-700 dark:text-slate-300">
                
                <tr className="">
                  <td className="p-2.5 ">{"ऋण का मूलधन"}</td>
                  <td className="p-2.5 text-right ">{"10,000.00 $"}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5 font-bold">{"कुल ब्याज भुगतान"}</td>
                  <td className="p-2.5 text-right text-rose-600">{"2,748.23 $"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 ">{"ओरिजिनेशन शुल्क (5.0%)"}</td>
                  <td className="p-2.5 text-right text-amber-600">{"500.00 $"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 ">{"दस्तावेज़ीकरण शुल्क"}</td>
                  <td className="p-2.5 text-right text-amber-600">{"750.00 $"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 ">{"अन्य प्रारंभिक शुल्क"}</td>
                  <td className="p-2.5 text-right ">{"0.00 $"}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5 font-bold">{"कुल वाणिज्यिक शुल्क:"}</td>
                  <td className="p-2.5 text-right text-amber-600">{"1,250.00 $"}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5 font-bold">{"कुल वित्तीय लागत (ब्याज + शुल्क):"}</td>
                  <td className="p-2.5 text-right text-indigo-600">{"3,998.23 $"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            इस प्रकार 10% की नाममात्र दर पर कुल वित्तीय लागत 3,998.23 $ हो जाती है।
          </p>
        </section>

        {/* Section 5: Nominal Rate vs Actuarial Cost (APR) */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. वास्तविक APR: नाममात्र दर बनाम प्रभावी लागत
          </h2>
          <p>
            वाणिज्यिक ऋण विश्लेषण में दो दरों को अलग रखा जाता है:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs flex items-center gap-1.5">
                <Scale className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                नाममात्र ब्याज दर (10.00%)
              </strong>
              <p className="text-slate-600 dark:text-slate-400">
                यह अनुबंध में उल्लिखित दर है जो बकाया मूलधन पर लागू होती है।
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs flex items-center gap-1.5">
                <Calculator className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                वास्तविक Actuarial APR / IRR (15.933%)
              </strong>
              <p className="text-slate-600 dark:text-slate-400">
                यह शुद्ध प्राप्त राशि (8,750 $) और 60 मासिक किस्तों (212.47 $) के आधार पर आंतरिक प्रतिफल दर (IRR) से निकाला गया वास्तविक APR है।
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            यह मान सामान्य लीनियर फॉर्मूले (12.50%) से अधिक सटीक है।
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            बिजनेस ग्राहकों को विभिन्न बैंकों के प्रस्तावों की तुलना इसी प्रभावी दर के आधार पर करनी चाहिए।
          </p>
        </section>

        {/* Section 6: How Amortization Works */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. वाणिज्यिक ऋण अमोर्टाइजेशन कैसे कार्य करता है?
          </h2>
          <p>
            शुरुआत में बकाया राशि अधिक होने के कारण किस्त में ब्याज का हिस्सा अधिक और मूलधन का हिस्सा कम होता है:
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-zinc-800 font-semibold text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="p-2.5 border-b">{"अवधि"}</th>
                  <th className="p-2.5 border-b">{"प्रारंभिक शेष"}</th>
                  <th className="p-2.5 border-b text-rose-600">{"ब्याज"}</th>
                  <th className="p-2.5 border-b text-emerald-600">{"मूलधन कटौती"}</th>
                  <th className="p-2.5 border-b">{"अंतिम शेष"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-700 dark:text-slate-300">
                
                <tr className="">
                  <td className="p-2.5 font-bold">{"माह 1"}</td>
                  <td className="p-2.5">{"10,000.00 $"}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{"83.33 $"}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{"129.14 $"}</td>
                  <td className="p-2.5 font-bold ">{"9,870.86 $"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 font-bold">{"माह 2"}</td>
                  <td className="p-2.5">{"9,870.86 $"}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{"82.26 $"}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{"130.21 $"}</td>
                  <td className="p-2.5 font-bold ">{"9,740.65 $"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 font-bold">{"माह 3"}</td>
                  <td className="p-2.5">{"9,740.65 $"}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{"81.17 $"}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{"131.30 $"}</td>
                  <td className="p-2.5 font-bold ">{"9,609.35 $"}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5 font-bold">{"माह 60 (अंतिम)"}</td>
                  <td className="p-2.5">{"210.71 $"}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{"1.76 $"}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{"210.71 $"}</td>
                  <td className="p-2.5 font-bold text-emerald-600">{"0.00 $"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            60वें महीने के अंत में ऋण पूरी तरह शून्य (0.00 $) हो जाता है।
          </p>
        </section>

        {/* Section 7: Shorter Term vs Longer Term */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. छोटी बनाम लंबी ऋण अवधि का चयन
          </h2>
          <p>
            ऋण की अवधि आपके कैश-फ्लो और मुनाफे को निर्धारित करती है:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-xs">
            <li>छोटी अवधि: अधिक मासिक ईएमआई + सबसे कम कुल ब्याज लागत।</li>
            <li>लंबी अवधि: कम मासिक ईएमआई + बहुत अधिक कुल ब्याज लागत।</li>
          </ul>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            उचित अवधि का चुनाव अपने व्यवसाय के मासिक कैश-फ्लो और लाभप्रदता के अनुसार करें।
          </p>
        </section>

        {/* Section 8: What Is DSCR? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. ऋण सेवा कवरेज अनुपात (DSCR) क्या है?
          </h2>
          <p>
            DSCR यह दर्शाता है कि आपकी कंपनी का मुनाफा ऋण की किस्तों को चुकाने के लिए कितना मजबूत है:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            DSCR = शुद्ध परिचालन आय (NOI) / वार्षिक कुल ऋण सेवा
          </div>
          <p>
            उदाहरण: 150,000 $ वार्षिक आय, 30,000 $ पुराना ऋण और 25,000 $ नया ऋण:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1 font-sans tabular-nums text-xs">
            <p>कुल वार्षिक ऋण सेवा: 30,000 $ + 25,000 $ = 55,000.00 $/वर्ष</p>
            <p>गणना किया गया DSCR: 150,000 $ / 55,000 $ = 2.73x (मजबूत कवरेज)</p>
            <p>अधिकतम वहन क्षमता (1.25x सीमा पर): 150,000 $ / 1.25 = 120,000.00 $/वर्ष</p>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            1.25x से अधिक DSCR बैंक स्वीकृति के लिए सुरक्षित माना जाता है।
          </p>
        </section>

        {/* Section 9: Small Business Administration (SBA) Loans */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. SBA ऋण योजनाएं (7(a), CDC/504 और माइक्रोलोन)
          </h2>
          <p>
            यूएस स्मॉल बिजनेस एडमिनिस्ट्रेशन (SBA) व्यवसायों को अनुकूल शर्तों पर ऋण प्राप्त करने के लिए सरकारी गारंटी प्रदान करता है:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs">
            
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">{"SBA 7(a) योजना"}</strong>
              <p className="text-slate-600 dark:text-slate-400">{"वर्किंग कैपिटल, मशीनरी और विस्तार हेतु 50 लाख $ तक का प्रमुख ऋण।"}</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">{"SBA 504 रियल एस्टेट"}</strong>
              <p className="text-slate-600 dark:text-slate-400">{"अचल संपत्तियों और भारी उपकरणों के लिए 55 लाख $ तक का फिक्स्ड-रेट ऋण।"}</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">{"SBA माइक्रोलोन"}</strong>
              <p className="text-slate-600 dark:text-slate-400">{"छोटे उद्यमों के लिए 50,000 $ तक का लघु वित्तपोषण।"}</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            सरकारी गारंटी वाले ऋणों में विशेष गारंटी शुल्क लागू होते हैं।
          </p>
        </section>

        {/* Section 10: Common Mistakes */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. बिजनेस लोन में होने वाली सामान्य गलतियाँ
          </h2>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-xs">
            <li>केवल ब्याज दर देखना और प्रोसेसिंग व अन्य छुपे शुल्कों को नजरअंदाज करना।</li>
            <li>ईएमआई कम करने के लिए अत्यधिक लंबी अवधि चुनना जिससे ब्याज बहुत बढ़ जाए।</li>
            <li>व्यावसायिक ऋणों पर उपभोक्ता लोन के नियम लागू होने की गलत धारणा रखना।</li>
            <li>1.25x DSCR होने पर बिना अन्य शर्तों के ऋण स्वीकृति मान लेना।</li>
            <li>व्यावसायिक ब्याज पर टैक्स कटौती के स्थानीय नियमों की अनदेखी करना।</li>
          </ul>
        </section>

        {/* Section 11: Related Calculators */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. संबंधित व्यावसायिक वित्तीय कैलकुलेटर
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            व्यावसायिक वित्तीय योजना के लिए हमारे अन्य कैलकुलेटर देखें:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            
            <Link
              href="/calculators/loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"ऋण कैलकुलेटर"}</span>
              <span className="text-slate-500 text-[11px]">{"सामान्य ऋण ईएमआई और अमोर्टाइजेशन।"}</span>
            </Link>
            <Link
              href="/calculators/personal-loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"पर्सनल लोन"}</span>
              <span className="text-slate-500 text-[11px]">{"व्यक्तिगत ऋणों के साथ तुलना।"}</span>
            </Link>
            <Link
              href="/calculators/mortgage-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"मॉर्गेज कैलकुलेटर"}</span>
              <span className="text-slate-500 text-[11px]">{"वाणिज्यिक और आवासीय संपत्ति ऋण।"}</span>
            </Link>
            <Link
              href="/calculators/roi-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"ROI कैलकुलेटर"}</span>
              <span className="text-slate-500 text-[11px]">{"व्यावसायिक निवेश पर प्रतिफल दर।"}</span>
            </Link>
            <Link
              href="/calculators/payback-period-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"पेबैक अवधि"}</span>
              <span className="text-slate-500 text-[11px]">{"निवेश वसूली का समय निर्धारण।"}</span>
            </Link>
            <Link
              href="/calculators/margin-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"मार्जिन कैलकुलेटर"}</span>
              <span className="text-slate-500 text-[11px]">{"लाभ मार्जिन और मार्कअप की गणना।"}</span>
            </Link>
            <Link
              href="/calculators/compound-interest-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"चक्रवृद्धि ब्याज"}</span>
              <span className="text-slate-500 text-[11px]">{"कैश रिजर्व और निवेश वृद्धि।"}</span>
            </Link>
            <Link
              href="/calculators/auto-loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"ऑटो लोन"}</span>
              <span className="text-slate-500 text-[11px]">{"वाणिज्यिक वाहन और फ्लीट फाइनेंसिंग।"}</span>
            </Link>
          </div>
        </section>
      </div>

      {/* 2. FAQ SECTION */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "hi",
  calculatorSlug: "business-loan-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck } from "lucide-react";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const HINDI_AMORTIZATION_SEO = {
  title: "परिशोधन कैलकुलेटर — ऋण व ईएमआई भुगतान अनुसूची",
  description:
    "मासिक किस्त (EMI), मूलधन और ब्याज का विभाजन, पूर्ण परिशोधन तालिका (Amortization Schedule), ऋण समाप्ति तिथि और अतिरिक्त भुगतान से ब्याज बचत की गणना करें।",
  category: "वित्त",
  keywords: [
    "परिशोधन कैलकुलेटर",
    "ऋण परिशोधन अनुसूची",
    "होम लोन ईएमआई तालिका",
    "ऋण भुगतान कैलकुलेटर",
    "मूलधन और ब्याज विभाजन",
    "लोन प्रीपेमेंट कैलकुलेटर",
    "अतिरिक्त ईएमआई भुगतान बचत",
    "ऋण चुकौती अनुसूची",
  ],
};

export const HINDI_AMORTIZATION_FAQS: CalculatorFAQ[] = [
  {
    question: "ऋण परिशोधन (Amortization) कैलकुलेटर क्या है?",
    answer:
      "एक परिशोधन कैलकुलेटर यह दर्शाता है कि समय के साथ नियमित भुगतानों के माध्यम से किसी ऋण की शेष राशि कैसे घटती और समाप्त होती है। यह मासिक किस्त (EMI), मूलधन और ब्याज का हिस्सा, प्रत्येक भुगतान के बाद बकाया राशि, कुल देय ब्याज और ऋण मुक्ति तिथि को स्पष्ट रूप से प्रदर्शित करता है।",
  },
  {
    question: "परिशोधन भुगतान (EMI) की गणना कैसे की जाती है?",
    answer:
      "निश्चित ब्याज दर वाले ऋण के लिए, मूलधन, मासिक आवधिक ब्याज दर और कुल किस्तों की संख्या से मानक वार्षिकी (Annuity) सूत्र द्वारा किस्त की गणना की जाती है। कैलकुलेटर वार्षिक ब्याज दर और ऋण अवधि को मासिक मानों में परिवर्तित करके अनुसूची तैयार करता है।",
  },
  {
    question: "परिशोधन तालिका या अनुसूची (Amortization Schedule) क्या है?",
    answer:
      "परिशोधन अनुसूची एक विस्तृत तालिका है जो प्रत्येक भुगतान अवधि के लिए किस्त राशि, ब्याज, मूलधन कटौती, प्रारंभिक शेष और अंतिम बकाया शेष को दर्शाती है। यह केवल एक मासिक आंकड़े तक सीमित रहने के बजाय पूरे ऋण चक्र के वित्तीय प्रवाह को समझने में मदद करती है।",
  },
  {
    question: "ऋण के शुरुआती वर्षों में अधिक ब्याज क्यों जाता है?",
    answer:
      "ब्याज की गणना सदैव उस समय की बकाया मूलधन राशि पर की जाती है। ऋण के प्रारंभ में कुल बकाया राशि सबसे अधिक होती है, इसलिए किस्त में ब्याज का अनुपात अधिक होता है। जैसे-जैसे मूलधन चुकाया जाता है, बकाया राशि घटती है और मासिक ब्याज का हिस्सा भी कम होता जाता है।",
  },
  {
    question: "ऋण की पूरी अवधि में मुझे कुल कितना ब्याज देना होगा?",
    answer:
      "ऋण राशि, ब्याज दर और अवधि दर्ज करें। कैलकुलेटर प्रत्येक अवधि के ब्याज को जोड़ता है। उदाहरण के लिए, 15 वर्षों के लिए 6% पर $200,000 के ऋण पर कुल मॉडल किया गया ब्याज $103,788.46 है।",
  },
  {
    question: "यदि मैं हर महीने $100 अतिरिक्त भुगतान करूं तो क्या होगा?",
    answer:
      "इसका प्रभाव ऋण राशि, दर, अवधि और शेष राशि पर निर्भर करता है। सत्यापित उदाहरण में, $100 का मासिक अतिरिक्त भुगतान ऋण अवधि को काफी कम कर देता है और भारी ब्याज बचत प्रदान करता है। कैलकुलेटर इस परिदृश्य का सटीक परिणाम दिखाता है।",
  },
  {
    question: "क्या अतिरिक्त भुगतान करने से ब्याज का बोझ कम होता है?",
    answer:
      "हां। मूलधन में किया गया अतिरिक्त भुगतान सीधे बकाया राशि को घटाता है। चूंकि भविष्य का ब्याज घटी हुई राशि पर लगता है, इसलिए ब्याज का समग्र बोझ कम हो जाता है और ऋण कई वर्ष पहले समाप्त हो जाता है।",
  },
  {
    question: "मासिक अतिरिक्त भुगतान और एकमुश्त भुगतान में क्या अंतर है?",
    answer:
      "मासिक अतिरिक्त भुगतान नियमित रूप से मूलधन को घटाता है, जबकि एकमुश्त भुगतान किसी निश्चित समय पर एक बड़ा भुगतान करता है। ऋण के शुरुआती दौर में किया गया मूलधन भुगतान अधिक प्रभावी होता है क्योंकि वह लंबी अवधि तक ब्याज को कम करता है।",
  },
  {
    question: "क्या ऋण अवधि बढ़ाने से मासिक किस्त कम हो जाती है?",
    answer:
      "हां, समान मूलधन और ब्याज दर पर लंबी अवधि में किस्त कम हो जाती है क्योंकि भुगतान अधिक महीनों में बंट जाता है। हालांकि, इसका नकारात्मक पहलू यह है कि पूरे जीवनकाल में कुल देय ब्याज बहुत अधिक बढ़ जाता है।",
  },
  {
    question: "क्या इस कैलकुलेटर में टैक्स और बीमा शामिल हैं?",
    answer:
      "मुख्य परिशोधन गणना केवल मूलधन और ब्याज (P&I) पर केंद्रित होती है। वास्तविक होम लोन में संपत्ति कर (Property Tax), गृह बीमा और अन्य शुल्क शामिल हो सकते हैं, जो मूल ऋण परिशोधन के अतिरिक्त होते हैं।",
  },
  {
    question: "क्या यह कैलकुलेटर परिवर्तनीय दर (ARM) ऋण की गणना कर सकता है?",
    answer:
      "नहीं। यह कैलकुलेटर एक निश्चित ब्याज दर (Fixed-Rate) मॉडल पर काम करता है। फ्लोटिंग या वेरिएबल रेट ऋणों के लिए बेंचमार्क इंडेक्स, स्प्रेड और समय-समय पर होने वाले बदलावों के लिए अलग मॉडलिंग की आवश्यकता होती है।",
  },
  {
    question: "क्या यह गणना बैंक के अंतिम क्लोजिंग अमाउंट की गारंटी है?",
    answer:
      "नहीं। यह दर्ज किए गए इनपुट के आधार पर एक गणितीय अनुमान है। वास्तविक बैंक विवरणों में तारीखों, प्रोसेसिंग शुल्क, एस्क्रो खातों और प्रीपेमेंट नियमों के कारण थोड़ा अंतर हो सकता है। किसी भी निर्णय से पहले अपने ऋण दस्तावेजों का सत्यापन करें।",
  },
];

export function HindiAmortizationContent() {
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 12 }, (_, i) => i))
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
      {/* 1. संबंधित वित्तीय कैलकुलेटर */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          संबंधित वित्तीय कैलकुलेटर (Related Financial Calculators)
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/calculators/mortgage-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            मॉर्गेज / होम लोन कैलकुलेटर
          </Link>
          <Link
            href="/calculators/loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            ऋण कैलकुलेटर (Loan Calculator)
          </Link>
          <Link
            href="/calculators/auto-loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            कार लोन कैलकुलेटर (Auto Loan)
          </Link>
          <Link
            href="/calculators/personal-loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            पर्सनल लोन कैलकुलेटर
          </Link>
          <Link
            href="/calculators/interest-rate-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            ब्याज दर कैलकुलेटर
          </Link>
          <Link
            href="/calculators/emi-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            ईएमआई कैलकुलेटर (EMI Calculator)
          </Link>
          <Link
            href="/calculators/refinance-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            ऋण पुनर्वित्त (Refinance Calculator)
          </Link>
        </div>
      </div>

      {/* 2. विस्तृत शैक्षणिक सामग्री (17 खंड) */}
      <div className="space-y-8 pt-6 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* खंड 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. ऋण परिशोधन (Amortization) क्या है?
          </h2>
          <p>
            ऋण परिशोधन (Amortization) वह गणितीय प्रक्रिया है जिसके द्वारा किसी ऋण की मूलधन राशि को निर्धारित समय सीमा में नियमित किस्तों के माध्यम से शून्य किया जाता है। एक मानक निश्चित दर वाले ऋण में, प्रत्येक किस्त में दो भाग होते हैं: ब्याज का भाग और मूलधन का भाग। ऋण की शुरुआत में बकाया राशि सबसे अधिक होती है, इसलिए किस्त का बड़ा हिस्सा ब्याज भुगतान में जाता है। जैसे-जैसे मूलधन कम होता है, ब्याज की राशि घटती है और किस्त का अधिकाधिक हिस्सा मूलधन चुकाने में लगने लगता है। उपभोक्ता वित्तीय सुरक्षा ब्यूरो (CFPB) भी इस प्रक्रिया की पुष्टि करता है: ऋण की प्रारंभिक किस्तों में अधिकांश हिस्सा ब्याज का होता है, जबकि अंतिम किस्तों में लगभग पूरा हिस्सा मूलधन का होता है।
          </p>
          <p>
            यह कैलकुलेटर पूरी भुगतान अनुसूची को पारदर्शी बनाकर दिखाता है। उधारकर्ता प्रत्येक महीने की किस्त, प्रारंभिक शेष, मूलधन कटौती, ब्याज और अंतिम शेष की जांच कर सकते हैं। यह उपकरण हमारे{" "}
            <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              होम लोन कैलकुलेटर
            </Link>{" "}
            के साथ मिलकर ऋण लागत को समझने और पूर्व-भुगतान (Prepayment) रणनीतियां बनाने के लिए अत्यंत उपयोगी है।
          </p>
        </section>

        {/* खंड 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. मासिक परिशोधन किस्तों (EMI) की गणना कैसे की जाती है
          </h2>
          <p>
            निश्चित दर वाले ऋण के लिए मासिक किस्त की गणना मानक वार्षिकी सूत्र (Standard Annuity Formula) द्वारा की जाती है। यदि <em>P</em> मूलधन है, <em>r</em> मासिक ब्याज दर (वार्षिक दर / 12) है और <em>n</em> कुल महीनों की संख्या है, तो सूत्र निम्नलिखित है:
          </p>
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-sans tabular-nums text-xs sm:text-sm text-center">
            PMT = P &times; [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ &minus; 1 ]
          </div>
          <p>
            यदि वार्षिक ब्याज दर 6% है, तो मासिक दर 0.06 / 12 = 0.005 होगी। कैलकुलेटर आंतरिक रूप से पूर्ण फ्लोटिंग-पॉइंट परिशुद्धता बनाए रखता है और केवल स्क्रीन पर प्रदर्शन के लिए मानों को राउंड करता है, जिससे लंबी अवधि में कोई गणितीय विसंगति नहीं आती।
          </p>
          <p>
            सत्यापित आधारभूत परिदृश्य में, 15 वर्षों के लिए 6% पर $200,000 के ऋण की मासिक किस्त $1,687.71 होती है। कुल 180 किस्तों में $200,000 मूलधन और $103,788.46 ब्याज का भुगतान होता है, जिससे कुल भुगतान $303,788.46 बनता है।
          </p>
        </section>

        {/* खंड 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. मूलधन बनाम ब्याज: समय के साथ अनुपात क्यों बदलता है?
          </h2>
          <p>
            ऋण की शुरुआत में ब्याज की गणना पूरी मूलधन राशि पर की जाती है। परिणामस्वरूप, पहली किस्तों में ब्याज का हिस्सा अधिक और मूलधन की कटौती कम होती है। जब किस्त मूलधन को थोड़ा कम कर देती है, तो अगले महीने का ब्याज इस घटे हुए शेष पर लगता है।
          </p>
          <p>
            उदाहरण के लिए, $200,000 के ऋण में पहले महीने का ब्याज $1,000.00 और मूलधन $687.71 होता है। 12वें महीने में ब्याज घटकर $961.19 रह जाता है और मूलधन बढ़कर $726.52 हो जाता है। 12वें वर्ष तक आते-आते वार्षिक मूलधन भुगतान $16,386.52 हो जाता है और वार्षिक ब्याज घटकर केवल $3,866.04 रह जाता है।
          </p>
        </section>

        {/* खंड 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. एक पूर्ण परिशोधन अनुसूची (Schedule) में क्या होता है?
          </h2>
          <p>
            मासिक परिशोधन तालिका ऋण के पहले दिन से लेकर अंतिम शून्य शेष तक की पूरी यात्रा को दर्ज करती है। इसमें किस्त संख्या, भुगतान तिथि, प्रारंभिक शेष, किस्त राशि, मूलधन, ब्याज, अतिरिक्त भुगतान, अंतिम शेष और संचयी योग शामिल होते हैं।
          </p>
          <p>
            आधारभूत मामले में, महीना 1 $200,000.00 से शुरू होता है और $199,312.29 पर समाप्त होता है। 180वें महीने के अंत में ऋण शेष ठीक $0.00 हो जाता है और कुल मूलधन $200,000.00 चुकता हो जाता है।
          </p>
        </section>

        {/* खंड 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. कुल देय ब्याज और कुल भुगतान
          </h2>
          <p>
            कुल ब्याज ऋण के पूरे जीवनकाल में चुकाए गए समस्त ब्याज का योग है। कुल मूलधन ऋण ली गई वास्तविक राशि है। वास्तविक ऋण समझौतों में संपत्ति कर और बीमा जैसे अन्य खर्च भी जुड़ सकते हैं। यह कैलकुलेटर मूलधन और ब्याज (P&amp;I) के शुद्ध वित्तीय गणित पर केंद्रित है।
          </p>
        </section>

        {/* खंड 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. ऋण अवधि मासिक किस्त और कुल ब्याज को कैसे प्रभावित करती है
          </h2>
          <p>
            ऋण अवधि सबसे प्रभावशाली कारकों में से एक है। अवधि बढ़ाने पर मासिक किस्त कम हो जाती है क्योंकि भुगतान अधिक महीनों में बंट जाता है, लेकिन कुल ब्याज बहुत अधिक बढ़ जाता है। अवधि घटाने पर मासिक किस्त बढ़ती है लेकिन कुल ब्याज में भारी बचत होती है।
          </p>
          <p>
            हमारे{" "}
            <Link href="/calculators/loan-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              ऋण कैलकुलेटर
            </Link>{" "}
            पर विभिन्न अवधियों की तुलना करके आप अपनी वित्तीय क्षमता के अनुसार सही विकल्प चुन सकते हैं।
          </p>
        </section>

        {/* खंड 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. मासिक अतिरिक्त भुगतान (Prepayment) का प्रभाव
          </h2>
          <p>
            हर महीने थोड़ा अतिरिक्त भुगतान करने से मूलधन तेजी से घटता है। इससे भविष्य का ब्याज कम हो जाता है और ऋण तय समय से पहले समाप्त हो जाता है। इस मॉडल में अतिरिक्त राशि सीधे मूलधन में जमा होती है।
          </p>
          <p>
            उदाहरण में, $100 प्रति माह अतिरिक्त देने से ऋण की अवधि काफी घट जाती है और हजारों डॉलर की ब्याज बचत होती है। अधिक जानकारी के लिए हमारा{" "}
            <Link href="/calculators/refinance-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              ऋण पुनर्वित्त कैलकुलेटर
            </Link>{" "}
            देखें।
          </p>
        </section>

        {/* खंड 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. वार्षिक अतिरिक्त भुगतान और एकमुश्त भुगतान
          </h2>
          <p>
            उधारकर्ता वार्षिक अतिरिक्त भुगतान या किसी विशेष समय पर एकमुश्त भुगतान करके भी ऋण का बोझ कम कर सकते हैं।
          </p>
          <p>
            समय का बहुत महत्व है: पहले वर्ष में किया गया $5,000 का एकमुश्त भुगतान 10वें वर्ष में किए गए उसी भुगतान की तुलना में कई गुना अधिक ब्याज बचाता है। उदाहरण में, $1,200 का वार्षिक अतिरिक्त भुगतान लगभग $10,131.78 की ब्याज बचत कराता है और ऋण 180 के बजाय 164 महीनों में समाप्त हो जाता है।
          </p>
        </section>

        {/* खंड 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. विलंबित अतिरिक्त भुगतान और समय का महत्व
          </h2>
          <p>
            यह कैलकुलेटर अतिरिक्त भुगतानों के लिए प्रारंभ माह और वर्ष चुनने की सुविधा देता है, जिससे आप भविष्य में शुरू होने वाली वित्तीय रणनीतियों (जैसे वेतन वृद्धि के बाद) का सटीक मॉडल बना सकते हैं।
          </p>
        </section>

        {/* खंड 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. शून्य ब्याज (0% APR) और विशेष स्थितियां
          </h2>
          <p>
            0% ब्याज दर होने पर सामान्य सूत्र में शून्य से विभाजन की त्रुटि आ सकती है। हमारा एल्गोरिदम इसे पहचानकर किस्त को सीधे मूलधन/महीनों से निकालता है (उदा. $120,000 / 120 माह = $1,000 प्रति माह)। इसके अलावा, यह अंतिम किस्त को सटीक $0.00 पर संतुलित करता है।
          </p>
        </section>

        {/* खंड 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. मानक परिशोधन बनाम केवल-ब्याज और परिवर्तनीय ऋण
          </h2>
          <p>
            यह उपकरण पारंपरिक निश्चित दर परिशोधन का मॉडल तैयार करता है। 'केवल-ब्याज' ऋणों में प्रारंभिक वर्षों में मूलधन नहीं घटता, जबकि परिवर्तनीय दर (ARM) ऋणों में ब्याज दर बाजार सूचकांकों के आधार पर बदलती रहती है।
          </p>
        </section>

        {/* खंड 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. वास्तविक होम लोन किस्त में क्या शामिल होता है?
          </h2>
          <p>
            परिशोधन कैलकुलेटर मूलधन और ब्याज को अलग करके दिखाता है। वास्तविक बैंक भुगतान में संपत्ति कर, बीमा और अन्य शुल्क भी शामिल हो सकते हैं।
          </p>
          <p>
            विभिन्न ब्याज दरों की तुलना के लिए हमारा{" "}
            <Link href="/calculators/interest-rate-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              ब्याज दर कैलकुलेटर
            </Link>{" "}
            और{" "}
            <Link href="/calculators/emi-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              ईएमआई कैलकुलेटर
            </Link>{" "}
            देखें।
          </p>
        </section>

        {/* खंड 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. ऋण मुक्ति तिथि का निर्धारण कैसे होता है
          </h2>
          <p>
            ऋण मुक्ति तिथि शुरुआत के महीने/वर्ष और ऋण को शून्य करने के लिए आवश्यक कुल किस्तों की संख्या से निर्धारित होती है। अतिरिक्त भुगतान करने से यह तिथि स्वतः पहले आ जाती है।
          </p>
        </section>

        {/* खंड 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. चार्ट और वार्षिक सारांश को समझना
          </h2>
          <p>
            चार्ट मूलधन और ब्याज के अनुपात को दृश्यात्मक रूप से प्रस्तुत करते हैं। उदाहरण में 65.8% राशि मूलधन और 34.2% राशि ब्याज में जाती है। वार्षिक तालिका 180 महीनों के डेटा को 15 सरल पंक्तियों में सारांशित करती है।
          </p>
        </section>

        {/* खंड 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. अनुसूची का निर्यात (Export) और सत्यापन
          </h2>
          <p>
            आप पूरी अनुसूची को CSV, Excel, PDF या प्रिंट प्रारूप में निर्यात कर सकते हैं। सत्यापन के लिए जांचें कि प्रत्येक पंक्ति में किस्त = मूलधन + ब्याज हो और अंतिम शेष शून्य हो।
          </p>
        </section>

        {/* खंड 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. ऋण लेने से पहले कैलकुलेटर का उपयोग
          </h2>
          <p>
            बैंक प्रस्तावों की तुलना करने और विभिन्न परिदृश्यों का विश्लेषण करने के लिए इस कैलकुलेटर का उपयोग करें। गैर-आवासीय ऋणों के लिए हमारा{" "}
            <Link href="/calculators/personal-loan-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              पर्सनल लोन कैलकुलेटर
            </Link>{" "}
            भी उपलब्ध है।
          </p>
        </section>

        {/* खंड 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. गणना पद्धति और वित्तीय अस्वीकरण
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                पद्धति और मॉडल की मान्यताएं
              </div>
              <p>
                पद्धति: वार्षिक दर को मासिक दर में बदलना (r = APR / 1200), कुल महीनों की गणना (n = वर्ष &times; 12 + माह), निश्चित किस्त निकालना और प्रत्येक माह शेष मूलधन पर ब्याज की गणना करना।
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                अस्वीकरण (Disclaimer)
              </div>
              <p>
                यह उपकरण केवल वित्तीय योजना और शैक्षणिक उद्देश्यों के लिए है। यह कोई कानूनी या कर सलाह नहीं है। वास्तविक ऋण शर्तों के लिए अपने ऋणदाता से संपर्क करें।
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 3. अक्सर पूछे जाने वाले प्रश्न (12 FAQs) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            अक्सर पूछे जाने वाले प्रश्न (FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {HINDI_AMORTIZATION_FAQS.map((faq, idx) => {
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
                      प्र{idx + 1}.
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
}

export default HindiAmortizationContent;

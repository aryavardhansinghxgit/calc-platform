import React from "react";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const HINDI_SCIENTIFIC_SEO = {
  title: "वैज्ञानिक कैलकुलेटर (Scientific Calculator)",
  description:
    "त्रिकोणमिति, लघुगणक (लॉग), घात, मूल, क्रमचय-संचय और सांख्यिकी गणनाओं के लिए उन्नत वैज्ञानिक कैलकुलेटर।",
  category: "गणित",
  keywords: [
    "वैज्ञानिक कैलकुलेटर",
    "त्रिकोणमिति",
    "लघुगणक",
    "घात और मूल",
    "क्रमचय संचय",
    "सांख्यिकी",
  ],
};

export const HINDI_SCIENTIFIC_FAQS: CalculatorFAQ[] = [
  {
    question: "इस वैज्ञानिक कैलकुलेटर में कौन से मुख्य कार्य शामिल हैं?",
    answer:
      "इसमें त्रिकोणमितीय फलन (sin, cos, tan), लघुगणक (ln, log₁₀, log₂), n-वें मूल, घात, क्रमचय (nPr), संचय (nCr), म.स.प. (GCD), ल.स.प. (LCM) और सांख्यिकीय गणनाएं शामिल हैं।",
  },
  {
    question: "डिग्री (Deg) और रेडियन (Rad) के बीच कैसे बदलें?",
    answer:
      "स्क्रीन के नीचे दिए गए कोण मोड चयनकर्ता में Deg (डिग्री), Rad (रेडियन) या Grad (ग्रेडियन) चुनें।",
  },
  {
    question: "कैलकुलेटर किस सटीकता स्तर का उपयोग करता है?",
    answer:
      "यह 64-बिट IEEE 754 फ्लोटिंग-पॉइंट परिशुद्धता और शंटिंग-यार्ड एल्गोरिदम का उपयोग करता है।",
  },
  {
    question: "किसी भी आधार पर लॉग की गणना कैसे करें?",
    answer:
      "log_b(a) = ln(a) / ln(b) सूत्र का उपयोग करें या log(x, base) फलन दर्ज करें।",
  },
  {
    question: "डोमेन त्रुटि (Domain Error) कब आती है?",
    answer:
      "ऋणात्मक संख्याओं के सम मूल (जैसे वर्गमूल) और शून्य या ऋणात्मक मानों के लघुगणक वास्तविक संख्याओं में अपरिभाषित होते हैं।",
  },
];

export function HindiScientificContent() {
  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-sans pt-4">
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          वैज्ञानिक कैलकुलेटर क्या है?
        </h2>
        <p>
          वैज्ञानिक कैलकुलेटर उच्च गणित, भौतिकी, इंजीनियरिंग और डेटा विश्लेषण में जटिल समीकरणों को हल करने का एक अनिवार्य उपकरण है।
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          कोण इकाइयाँ
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>डिग्री (Deg):</strong> पूर्ण चक्र = 360°।</li>
          <li><strong>रेडियन (Rad):</strong> पूर्ण चक्र = 2π रेडियन (मानक SI इकाई)।</li>
          <li><strong>ग्रेडियन (Grad):</strong> पूर्ण चक्र = 400 ग्रेडियन।</li>
        </ul>
      </section>

      <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">शैक्षणिक सारांश</h3>
        <p className="text-xs text-blue-900 dark:text-blue-300">
          सटीक वैज्ञानिक गणना से भौतिक नियमों और सांख्यिकीय प्रतिमानों का सटीक विश्लेषण संभव होता है।
        </p>
      </section>
    </article>
  );
}

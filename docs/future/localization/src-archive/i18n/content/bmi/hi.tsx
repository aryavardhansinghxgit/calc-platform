import React from "react";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const HINDI_BMI_SEO = {
  title: "बीएमआई कैलकुलेटर (बॉडी मास इंडेक्स)",
  description:
    "अपने बॉडी मास इंडेक्स (BMI), स्वस्थ वजन सीमा, बच्चों के लिए ग्रोथ परसेंटाइल और ऊर्जा आवश्यकता की सटीक गणना करें।",
  category: "स्वास्थ्य",
  keywords: [
    "बीएमआई कैलकुलेटर",
    "बॉडी मास इंडेक्स",
    "स्वस्थ वजन",
    "बीएमआई चार्ट",
    "मोटापा",
    "वजन घटाना",
  ],
};

export const HINDI_BMI_FAQS: CalculatorFAQ[] = [
  {
    question: "बॉडी मास इंडेक्स (BMI) क्या है और इसकी गणना कैसे की जाती है?",
    answer:
      "बॉडी मास इंडेक्स (BMI) ऊंचाई के अनुपात में वजन का एक मानक पैमाना है: बीएमआई = वजन (किलोग्राम) / [ऊंचाई (मीटर)]²।",
  },
  {
    question: "वयस्कों के लिए मुख्य बीएमआई श्रेणियां क्या हैं?",
    answer:
      "कम वजन (< 18.5), सामान्य स्वस्थ वजन (18.5 से < 25.0), अधिक वजन (25.0 से < 30.0), और मोटापा (≥ 30.0 kg/m²)।",
  },
  {
    question: "बच्चों के लिए बीएमआई परसेंटाइल का उपयोग क्यों किया जाता है?",
    answer:
      "बच्चों (2–19 वर्ष) के विकास के दौरान शरीर संरचना तेजी से बदलती है, इसलिए उम्र और लिंग आधारित परसेंटाइल का उपयोग किया जाता है।",
  },
  {
    question: "बीएमआई की सीमाएं क्या हैं?",
    answer:
      "बीएमआई मांसपेशियों के द्रव्यमान और वसा के बीच अंतर नहीं करता है, इसलिए एथलीटों का बीएमआई बिना अतिरिक्त वसा के भी अधिक हो सकता है।",
  },
  {
    question: "क्या बीएमआई एक पूर्ण चिकित्सीय निदान है?",
    answer:
      "नहीं, बीएमआई केवल एक प्रारंभिक स्क्रीनिंग साधन है। स्वास्थ्य की स्थिति के लिए डॉक्टर से जांच आवश्यक है।",
  },
];

export function HindiBmiContent() {
  return (
    <article className="space-y-10 text-zinc-700 dark:text-zinc-300 leading-relaxed text-xs sm:text-sm font-sans pt-4">
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          1. बॉडी मास इंडेक्स (BMI) क्या है?
        </h2>
        <p>
          बॉडी मास इंडेक्स (BMI) ऊंचाई के सापेक्ष शरीर के वजन का आकलन करने का एक अंतरराष्ट्रीय मानक पैमाना है।
        </p>
        <p>
          यह जनसंख्या स्तर पर वजन की स्थिति को वर्गीकृत करने का एक साधन है, लेकिन यह कोई चिकित्सीय निदान नहीं है।
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          2. बीएमआई गणना का सूत्र
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 max-w-md">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">मानक मीट्रिक सूत्र</h3>
          <div className="p-2.5 bg-white dark:bg-slate-950 rounded text-center font-bold text-blue-600 dark:text-blue-400 text-xs border border-slate-200 dark:border-slate-800">
            BMI = वजन (kg) / [ऊंचाई (m)]²
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          3. वयस्कों के लिए बीएमआई श्रेणियां
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs my-2">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-3">श्रेणी</th>
                <th className="py-2.5 px-3">बीएमआई सीमा (kg/m²)</th>
                <th className="py-2.5 px-3">स्वास्थ्य संदर्भ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              <tr><td className="py-2.5 px-3 text-sky-700 dark:text-sky-400 font-bold">कम वजन</td><td className="py-2.5 px-3 font-sans tabular-nums">&lt; 18.5</td><td className="py-2.5 px-3">पोषण संबंधी परामर्श अनुशंसित।</td></tr>
              <tr className="bg-emerald-50/50 dark:bg-emerald-950/20"><td className="py-2.5 px-3 text-emerald-700 dark:text-emerald-400 font-bold">स्वस्थ सामान्य वजन</td><td className="py-2.5 px-3 font-sans tabular-nums font-bold text-emerald-800 dark:text-emerald-300">18.5 से &lt; 25.0</td><td className="py-2.5 px-3">मानक स्वस्थ सीमा।</td></tr>
              <tr><td className="py-2.5 px-3 text-yellow-700 dark:text-yellow-400 font-bold">अधिक वजन</td><td className="py-2.5 px-3 font-sans tabular-nums">25.0 से &lt; 30.0</td><td className="py-2.5 px-3">निगरानी की सलाह।</td></tr>
              <tr><td className="py-2.5 px-3 text-orange-700 dark:text-orange-400 font-bold">मोटापा (श्रेणी 1)</td><td className="py-2.5 px-3 font-sans tabular-nums">30.0 से &lt; 35.0</td><td className="py-2.5 px-3">मध्यम स्वास्थ्य जोखिम।</td></tr>
              <tr><td className="py-2.5 px-3 text-rose-700 dark:text-rose-400 font-bold">मोटापा (श्रेणी 2)</td><td className="py-2.5 px-3 font-sans tabular-nums">35.0 से &lt; 40.0</td><td className="py-2.5 px-3">उच्च स्वास्थ्य जोखिम।</td></tr>
              <tr><td className="py-2.5 px-3 text-rose-900 dark:text-rose-300 font-bold">गंभीर मोटापा (श्रेणी 3)</td><td className="py-2.5 px-3 font-sans tabular-nums">&ge; 40.0</td><td className="py-2.5 px-3">व्यापक चिकित्सीय परामर्श आवश्यक।</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">स्वास्थ्य सलाह</h3>
        <p className="text-xs text-blue-900 dark:text-blue-300">
          यह कैलकुलेटर केवल सामान्य जानकारी और जागरूकता के लिए है। यह किसी डॉक्टर की सलाह का विकल्प नहीं है।
        </p>
      </section>
    </article>
  );
}

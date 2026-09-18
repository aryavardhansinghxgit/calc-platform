import React from "react";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const HINDI_PERCENTAGE_SEO = {
  title: "प्रतिशत कैलकुलेटर",
  description:
    "प्रतिशत मान, 3-चर समीकरण, प्रतिशत परिवर्तन, वृद्धि, छूट और गणितीय अनुपातों की सटीक गणना करें।",
  category: "गणित",
  keywords: [
    "प्रतिशत कैलकुलेटर",
    "प्रतिशत",
    "प्रतिशत कैसे निकालें",
    "प्रतिशत अंतर",
    "प्रतिशत परिवर्तन",
    "छूट कैलकुलेटर",
  ],
};

export const HINDI_PERCENTAGE_FAQS: CalculatorFAQ[] = [
  {
    question: "प्रतिशत क्या है और इसकी गणना कैसे की जाती है?",
    answer:
      "प्रतिशत 100 के भिन्न के रूप में व्यक्त किया जाने वाला अनुपात है। इसे भाग को कुल से विभाजित करके और 100 से गुणा करके निकाला जाता है: प्रतिशत = (भाग / कुल) × 100।",
  },
  {
    question: "एक संख्या दूसरी संख्या का कितना प्रतिशत है, यह कैसे निकालें?",
    answer:
      "यह ज्ञात करने के लिए कि A, B का कितना प्रतिशत है, A को B से विभाजित करें और 100 से गुणा करें: P = (A / B) × 100। यदि B शून्य है, तो परिणाम अपरिभाषित होगा।",
  },
  {
    question: "प्रतिशत परिवर्तन और प्रतिशत अंतर में क्या अंतर है?",
    answer:
      "प्रतिशत परिवर्तन प्रारंभिक मान के सापेक्ष दिशात्मक बदलाव को मापता है। प्रतिशत अंतर दो मानों के बीच उनके अंकगणितीय औसत के सापेक्ष सममित अंतर को मापता है।",
  },
  {
    question: "प्रतिशत वृद्धि या कमी की गणना कैसे करें?",
    answer:
      "P% वृद्धि के लिए प्रारंभिक मान को (1 + P / 100) से गुणा करें। कमी के लिए (1 - P / 100) से गुणा करें। उदाहरण के लिए, 100 पर 10% छूट = 100 × 0.90 = 90।",
  },
  {
    question: "शून्य से विभाजन होने पर प्रतिशत अपरिभाषित क्यों होता है?",
    answer:
      "गणित में शून्य से विभाजन मान्य नहीं है। जब आधार मान हर (denominator) में शून्य होता है, तो कोई वास्तविक संख्या परिणाम नहीं दे सकती।",
  },
];

export function HindiPercentageContent() {
  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-sans pt-4">
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          प्रतिशत क्या है?
        </h2>
        <p>
          गणित में प्रतिशत 100 के भिन्न के रूप में व्यक्त किया जाने वाला एक विमाहीन अनुपात है। यह एक निश्चित आधार के सापेक्ष आनुपातिक भागों की तुलना करने का एक सार्वभौमिक मानक है। लैटिन शब्द <em>per centum</em> (&quot;प्रति सौ&quot;) से लिया गया यह सिद्धांत वित्त, सांख्यिकी और दैनिक गणनाओं में व्यापक रूप से उपयोग किया जाता है।
        </p>
        <p>
          किसी भी प्रतिशत को 100 से विभाजित करके दशमलव में या सरल भिन्न में बदला जा सकता है। उदाहरण के लिए, 35% दशमलव में 0.35 और भिन्न में 7/20 के बराबर है।
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          प्रतिशत का मुख्य सूत्र
        </h2>
        <p>
          प्रतिशत का मूलभूत गणितीय संबंध तीन चरों को जोड़ता है:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P × V<sub>1</sub> = V<sub>2</sub>
        </div>
        <ul className="list-disc pl-5 space-y-1.5 font-sans tabular-nums text-xs">
          <li><strong>भाग (V<sub>2</sub>) ज्ञात करना:</strong> V<sub>2</sub> = (P / 100) × V<sub>1</sub></li>
          <li><strong>प्रतिशत दर (P%) ज्ञात करना:</strong> P = (V<sub>2</sub> / V<sub>1</sub>) × 100%</li>
          <li><strong>कुल आधार (V<sub>1</sub>) ज्ञात करना:</strong> V<sub>1</sub> = V<sub>2</sub> / (P / 100)</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          प्रतिशत अंतर बनाम प्रतिशत परिवर्तन
        </h2>
        <p>
          <strong>प्रतिशत अंतर</strong> दो मानों के बीच उनके अंकगणितीय औसत के सापेक्ष अंतर को मापता है:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs">
          प्रतिशत अंतर = (|V<sub>1</sub> - V<sub>2</sub>| / ((V<sub>1</sub> + V<sub>2</sub>) / 2)) × 100%
        </div>
        <p>
          <strong>प्रतिशत परिवर्तन</strong> प्रारंभिक मान V<sub>1</sub> से अंतिम मान V<sub>2</sub> की दिशात्मक वृद्धि या कमी को मापता है:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs">
          प्रतिशत परिवर्तन = ((V<sub>2</sub> - V<sub>1</sub>) / V<sub>1</sub>) × 100%
        </div>
      </section>

      <section className="space-y-3 pt-2">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          सामान्य प्रतिशत रूपांतरण तालिका
        </h2>
        <div className="overflow-x-auto border border-slate-300 dark:border-slate-700 rounded max-w-xl">
          <table className="w-full text-xs text-left border-collapse font-sans tabular-nums">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 font-bold">
                <th className="p-2 border-r border-slate-300 dark:border-slate-700">भिन्न</th>
                <th className="p-2 border-r border-slate-300 dark:border-slate-700">दशमलव</th>
                <th className="p-2">प्रतिशत</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              <tr><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/2</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0.5</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">50%</td></tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30"><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/4</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0.25</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">25%</td></tr>
              <tr><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/5</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0.2</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">20%</td></tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30"><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/10</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0.1</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">10%</td></tr>
              <tr><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">3/4</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0.75</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">75%</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">शैक्षणिक सारांश</h3>
        <p className="text-xs text-blue-900 dark:text-blue-300">
          प्रतिशत गणित, वित्त और विज्ञान में आनुपातिक संबंधों, विकास दरों और तुलनात्मक मानों को समझने का आधारभूत साधन है।
        </p>
      </section>
    </article>
  );
}

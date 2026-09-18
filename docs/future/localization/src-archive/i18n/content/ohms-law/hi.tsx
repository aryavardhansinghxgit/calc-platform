import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const HI_OHMS_LAW_SEO = {
  title: "ओम का नियम कैलकुलेटर | वोल्टेज, करंट, प्रतिरोध और पावर की गणना",
  description: "ओम के नियम और जूल के नियम से वोल्टेज (V), विद्युत धारा (I), प्रतिरोध (R) और विद्युत शक्ति (P / वाट) की सटीक गणना करें।",
  keywords: ["ओम का नियम कैलकुलेटर", "वोल्टेज करंट प्रतिरोध", "ohms law calculator in hindi", "विद्युत शक्ति सूत्र"],
};

export const HI_OHMS_LAW_FAQS: CalculatorFAQ[] = [
  {
    question: "ओम का नियम क्या है?",
    answer:
      "ओम के नियम के अनुसार किसी चालक में प्रवाहित होने वाली धारा (I) उसके सिरों के बीच के विभवांतर (V) के समानुपाती और प्रतिरोध (R) के व्युत्क्रमानुपाती होती है: V = I × R।",
  },
  {
    question: "विद्युत शक्ति (Power) की गणना कैसे की जाती है?",
    answer:
      "विद्युत शक्ति P = V × I = I² × R = V² / R सूत्र द्वारा वाट (Watts) में निकाली जाती है।",
  },
];

export function HiOhmsLawContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. ओम के नियम का परिचय
        </h2>
        <p>
          जर्मन भौतिक विज्ञानी जॉर्ज साइमन ओम द्वारा प्रतिपादित यह नियम विद्युत परिपथों के विश्लेषण का सबसे मूलभूत आधार है।
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. मूलभूत गणितीय सूत्र
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>वोल्टेज (V):</strong> V = I × R</p>
          <p><strong>धारा (I):</strong> I = V / R</p>
          <p><strong>प्रतिरोध (R):</strong> R = V / I</p>
          <p><strong>शक्ति (P):</strong> P = V × I</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. सारांश
        </h2>
        <p>
          किन्हीं दो विद्युत मानों के ज्ञात होने पर शेष दोनों मानों की गणना सरलता से की जा सकती है।
        </p>
      </section>
    </article>
  );
}

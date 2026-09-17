import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const HI_DATE_SEO = {
  title: "तारीख कैलकुलेटर | दो तिथियों के बीच के दिन और कार्य दिवस गणना",
  description: "दो तिथियों के बीच के कुल दिन, सप्ताह, महीने और वर्ष निकालें, किसी तारीख में दिन जोड़ें या घटाएं और सप्ताहांत व छुट्टियों को छोड़कर कार्य दिवस गिनें।",
  keywords: ["तारीख कैलकुलेटर", "दिनों की गणना", "तारीखों के बीच अंतर", "कार्य दिवस कैलकुलेटर"],
};

export const HI_DATE_FAQS: CalculatorFAQ[] = [
  {
    question: "दो तिथियों के बीच दिनों की सही गणना कैसे करें?",
    answer:
      "प्रारंभिक और अंतिम तिथि दर्ज करें। कैलकुलेटर ग्रेगोरियन कैलेंडर के नियमों का पालन करते हुए सटीक दिनों की संख्या निकालता है।",
  },
  {
    question: "लीप वर्ष (Leap Year) की गणना कैसे होती है?",
    answer:
      "कैलकुलेटर 4 से विभाज्य वर्षों को लीप वर्ष मानता है, सिवाय उन शताब्दी वर्षों के जो 400 से विभाज्य नहीं हैं।",
  },
  {
    question: "कार्य दिवसों (Business Days) की गणना कैसे की जाती है?",
    answer:
      "कुल दिनों में से चुने गए सप्ताहांत के दिनों (जैसे शनिवार और रविवार) और सार्वजनिक अवकाशों को घटाकर कार्य दिवस निकाले जाते हैं।",
  },
];

export function HiDateContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. तिथि एवं समय गणना का परिचय
        </h2>
        <p>
          परियोजना प्रबंधन, कानूनी समय-सीमा और वित्तीय योजनाओं में सटीक दिनों की गणना बहुत महत्वपूर्ण है। महीनों के असमान दिनों (28, 29, 30 या 31) और लीप वर्षों के कारण स्वचालित एल्गोरिदम आवश्यक होते हैं।
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. गणितीय नियम और सूत्र
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>कुल कैलेंडर दिन:</strong> Δt = अंतिम तिथि − प्रारंभिक तिथि</p>
          <p><strong>कार्य दिवस:</strong> कार्य दिवस = कुल दिन − सप्ताहांत − सार्वजनिक अवकाश</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. सामान्य गलतियाँ
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>सभी महीनों को 30 दिन का मानना।</li>
          <li>अंतिम दिन को शामिल करने या छोड़ने (Inclusive vs Exclusive) में भ्रम।</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          4. सारांश
        </h2>
        <p>
          विधिक अनुबंधों और आधिकारिक समय-सीमाओं के लिए हमेशा कैलेंडर-सम्मत गणना का उपयोग करें।
        </p>
      </section>
    </article>
  );
}

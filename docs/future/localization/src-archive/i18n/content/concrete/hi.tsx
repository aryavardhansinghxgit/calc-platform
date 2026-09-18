import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const HI_CONCRETE_SEO = {
  title: "कंक्रीट कैलकुलेटर | स्लैब, खंभा व नींव के लिए कंक्रीट आयतन निकालें",
  description: "स्लैब, पिलर, नींव और सीढ़ियों के लिए कंक्रीट की सटीक मात्रा (क्यूबिक मीटर या यार्ड) और आवश्यक सीमेंट बोरियों की संख्या की गणना करें।",
  keywords: ["कंक्रीट कैलकुलेटर", "कंक्रीट की मात्रा", "स्लैब कंक्रीट गणना", "सीमेंट बोरी कैलकुलेटर"],
};

export const HI_CONCRETE_FAQS: CalculatorFAQ[] = [
  {
    question: "छत या स्लैब के लिए कंक्रीट की मात्रा कैसे निकालें?",
    answer:
      "लंबाई, चौड़ाई और मोटाई को आपस में गुणा करें: लंबाई (मीटर) × चौड़ाई (मीटर) × मोटाई (मीटर) = कुल क्यूबिक मीटर कंक्रीट।",
  },
  {
    question: "कंक्रीट मंगाते समय कितना अतिरिक्त मार्जिन रखना चाहिए?",
    answer:
      "जमीन की असमानता और शटरिंग के फैलाव के लिए 5% से 10% अतिरिक्त कंक्रीट मंगाना अनुशंसित है।",
  },
];

export function HiConcreteContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. कंक्रीट आयतन गणना का परिचय
        </h2>
        <p>
          भवन निर्माण में कंक्रीट की सही मात्रा निकालना बहुत आवश्यक है। कम कंक्रीट से जोड़ (Cold Joint) बनते हैं और अधिक से बर्बादी होती है।
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. गणितीय सूत्र
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>स्लैब / चौकोर नींव:</strong> आयतन = लंबाई × चौड़ाई × मोटाई</p>
          <p><strong>गोल पिलर:</strong> आयतन = π × (त्रिज्या)² × ऊँचाई</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. सारांश
        </h2>
        <p>
          हमेशा शटरिंग के आंतरिक माप लें और 5-10% बर्बादी मार्जिन जोड़कर ऑर्डर करें।
        </p>
      </section>
    </article>
  );
}

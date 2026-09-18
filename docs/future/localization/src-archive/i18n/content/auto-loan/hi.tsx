import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const HI_AUTO_LOAN_SEO = {
  title: "कार लोन कैलकुलेटर | मासिक EMI, ब्याज और पुनर्भुगतान अनुसूची",
  description: "अपनी नई या पुरानी कार के लिए मासिक ईएमआई (EMI), कुल देय ब्याज और पूर्ण ऋण पुनर्भुगतान तालिका की सटीक गणना करें।",
  keywords: ["कार लोन कैलकुलेटर", "कार ईएमआई कैलकुलेटर", "गाड़ी लोन ब्याज", "ऑटो लोन ईएमआई"],
};

export const HI_AUTO_LOAN_FAQS: CalculatorFAQ[] = [
  {
    question: "कार लोन की मासिक ईएमआई (EMI) की गणना कैसे होती है?",
    answer:
      "ईएमआई की गणना मूलधन, मासिक ब्याज दर और कुल महीनों की संख्या के आधार पर मानक ईएमआई सूत्र: EMI = P × [r(1 + r)^n] / [(1 + r)^n − 1] से की जाती है।",
  },
  {
    question: "कार खरीदते समय कितना डाउन पेमेंट करना चाहिए?",
    answer:
      "गाड़ी के कुल मूल्य का कम से कम 15% से 20% डाउन पेमेंट करना आर्थिक दृष्टि से सबसे सुरक्षित माना जाता है।",
  },
];

export function HiAutoLoanContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. कार लोन एवं वित्तपोषण का परिचय
        </h2>
        <p>
          कार लोन लेते समय ब्याज दर, अवधि और डाउन पेमेंट को समझकर आप हजारों रुपयों की बचत कर सकते हैं।
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. गणितीय सूत्र
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>मासिक ईएमआई:</strong> EMI = P × [r(1 + r)^n] / [(1 + r)^n − 1]</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. सारांश
        </h2>
        <p>
          कम अवधि का ऋण चुनें ताकि ब्याज का बोझ कम हो और वाहन का मूल्य ऋण से अधिक बना रहे।
        </p>
      </section>
    </article>
  );
}

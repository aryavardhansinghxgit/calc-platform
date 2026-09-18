import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const HI_CURRENCY_SEO = {
  title: "मुद्रा परिवर्तक | लाइव विनिमय दरें और बैंक शुल्क कैलकुलेटर",
  description: "विश्व की 160 से अधिक मुद्राओं का लाइव विनिमय दर से रूपांतरण करें और विदेशी मुद्रा हस्तांतरण पर लगने वाले बैंक शुल्क का आकलन करें।",
  keywords: ["मुद्रा परिवर्तक", "डॉलर रुपया भाव", "करेंसी कनवर्टर", "मुद्रा विनिमय दर"],
};

export const HI_CURRENCY_FAQS: CalculatorFAQ[] = [
  {
    question: "मिड-मार्केट एक्सचेंज रेट (Mid-Market Rate) क्या होता है?",
    answer:
      "यह वैश्विक अंतर-बैंक बाजार में खरीदार और विक्रेता के बीच की वास्तविक विनिमय दर है, जिसमें कोई छिपा हुआ कमीशन नहीं होता।",
  },
  {
    question: "बैंक मुद्रा विनिमय पर शुल्क कैसे वसूलते हैं?",
    answer:
      "बैंक वास्तविक विनिमय दर पर 1% से 3.5% तक का अतिरिक्त मार्जिन (स्प्रेड) जोड़कर अपना मुनाफा कमाते हैं।",
  },
];

export function HiCurrencyContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. विदेशी मुद्रा बाजार का परिचय
        </h2>
        <p>
          अंतरराष्ट्रीय व्यापार और विदेश यात्रा के लिए मुद्राओं का रूपांतरण आवश्यक है। वास्तविक विनिमय दर जानकर आप अतिरिक्त बैंक शुल्कों से बच सकते हैं।
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. रूपांतरण सूत्र
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>परिवर्तित राशि:</strong> लक्षित राशि = मूल राशि × विनिमय दर</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. सारांश
        </h2>
        <p>
          हमेशा आधिकारिक मिड-मार्केट विनिमय दर की तुलना करके ही धन हस्तांतरण का चयन करें।
        </p>
      </section>
    </article>
  );
}

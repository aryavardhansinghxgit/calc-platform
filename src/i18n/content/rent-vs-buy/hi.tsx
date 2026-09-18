"use client";

import React from "react";
import Link from "next/link";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "क्या घर खरीदना बेहतर है या किराये पर रहना?",
    "answer": "यह आपके ठहरने की अवधि, खरीद मूल्य, किराया स्तर और वैकल्पिक निवेश रिटर्न पर निर्भर करता है।"
  },
  {
    "question": "ब्रेक-इवेन अवधि क्या है?",
    "answer": "वह समय जिसके बाद घर खरीदना किराये पर रहने की तुलना में अधिक लाभदायक हो जाता है।"
  },
  {
    "question": "5% का नियम क्या है?",
    "answer": "यह ब्याज, संपत्ति कर और वार्षिक रखरखाव को जोड़कर गैर-वसूली योग्य लागतों की गणना करता है।"
  },
  {
    "question": "घर के मूल्य में वृद्धि का क्या प्रभाव पड़ता है?",
    "answer": "यह लंबी अवधि में मालिक की कुल संपत्ति को बढ़ाता है।"
  },
  {
    "question": "किराया बढ़ने का क्या असर होता है?",
    "answer": "बढ़ता किराया किरायेदार की लागत को बढ़ाता है, जिससे निश्चित दर वाला ऋण अधिक आकर्षक बनता है।"
  },
  {
    "question": "डाउन पेमेंट की अवसर लागत क्या है?",
    "answer": "डाउन पेमेंट की राशि को शेयर बाजार में लगाकर कमाया जा सकने वाला संभावित लाभ।"
  },
  {
    "question": "घर खरीदने की छिपी लागतें क्या हैं?",
    "answer": "क्लोजिंग लागत (2%–5%), संपत्ति कर, बीमा, वार्षिक रखरखाव (1%) और भविष्य की बिक्री लागत।"
  },
  {
    "question": "मूल्य-से-किराया अनुपात क्या है?",
    "answer": "घर का मूल्य / वार्षिक किराया; 15 से कम अनुपात खरीदने के पक्ष में होता है।"
  },
  {
    "question": "कर लाभ कैसे मदद करते हैं?",
    "answer": "ब्याज कटौती से कर देनदारी कम होती है।"
  },
  {
    "question": "ठहरने की अवधि क्यों महत्वपूर्ण है?",
    "answer": "शुरुआती क्लोजिंग लागतों की भरपाई के लिए कई वर्षों का समय आवश्यक होता है।"
  },
  {
    "question": "30 वर्षों बाद संपत्ति का क्या होता है?",
    "answer": "खरीदार के पास ऋणमुक्त मकान होता है जबकि किरायेदार के पास निवेश पोर्टफोलियो होता है।"
  },
  {
    "question": "संवेदनशीलता विश्लेषण कैसे करें?",
    "answer": "किराया वृद्धि और बाजार रिटर्न के विभिन्न परिदृश्यों का परीक्षण करें।"
  }
];

export const seo = {
  title: "किराया बनाम खरीद कैलकुलेटर (Rent vs Buy Calculator) — अनुपात = खरीद मूल्य / कुल वार्षिक किराया (आधार",
  description: "किराये पर रहने और घर खरीदने की तुलना करें: मॉर्गेज लागत, किराया वृद्धि, संपत्ति मूल्य वृद्धि, कर लाभ और ब्रेक-इवेन अवधि।",
  keywords: ["किराया बनाम खरीद","rent vs buy calculator","घर खरीदें या किराये पर रहें","मकान खरीदना बनाम किराया"]
};

export const ContentComponent = function RentVsBuyContentHI() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-normal leading-relaxed max-w-4xl mx-auto py-4">
      {/* 1. Page Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          किराया बनाम खरीद कैलकुलेटर (Rent vs Buy Calculator)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
          किराये पर रहने और घर खरीदने का विस्तृत विश्लेषण: ऋण किस्तें, किराया वृद्धि, संपत्ति मूल्य वृद्धि, कर, रखरखाव और कुल संपत्ति निर्माण की तुलना।
        </p>
      </div>

      {/* 2. What Does it Do */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          2. किराया बनाम खरीद कैलकुलेटर क्या करता है?
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          किराया बनाम खरीद का निर्णय केवल मासिक किराये और मॉर्गेज किस्त की तुलना नहीं है। इसमें डाउन पेमेंट, ब्याज, मूलधन, कर, बीमा, रखरखाव, क्लोजिंग लागत, किराया वृद्धि और अवसर लागत का पूरा हिसाब लगाया जाता है।
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          यह एक वित्तीय नियोजन टूल है। मानक परिदृश्य में लगभग 4.8 वर्षों में ब्रेक-इवेन बिंदु प्राप्त होता है।
        </p>
      </section>

      {/* 3. Total Economics */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          3. कुल अर्थशास्त्र की तुलना करें, केवल मासिक भुगतान की नहीं
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          मॉर्गेज किस्त में ब्याज (लागत) और मूलधन (बचत/इक्विटी) दोनों शामिल होते हैं। किरायेदार रखरखाव नहीं देता लेकिन बढ़ता किराया चुकाता है।
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          हमारा मॉडल 30 वर्षों के दौरान दोनों विकल्पों के कुल खर्च और शुद्ध संपत्ति की तुलना करता है।
        </p>
      </section>

      {/* 4. How to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          4. कैलकुलेटर का उपयोग कैसे करें
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
          <li>घर का खरीद मूल्य और डाउन पेमेंट प्रतिशत दर्ज करें।</li>
          <li>मॉर्गेज ब्याज दर और ऋण अवधि दर्ज करें।</li>
          <li>संपत्ति कर, बीमा, रखरखाव और सोसाइटी शुल्क जोड़ें।</li>
          <li>खरीद और बिक्री की क्लोजिंग लागत दर्ज करें।</li>
          <li>वर्तमान मासिक किराया और वार्षिक किराया वृद्धि दर दर्ज करें।</li>
          <li>किरायेदार बीमा और अन्य खर्चे जोड़ें।</li>
          <li>वैकल्पिक निवेश पर मिलने वाली अनुमानित रिटर्न दर दर्ज करें।</li>
          <li>दोनों विकल्पों के लागत विवरण की समीक्षा करें।</li>
          <li>ब्रेक-इवेन अवधि और ठहराव तालिका का निरीक्षण करें।</li>
          <li>मूल्य-से-किराया अनुपात और 5% नियम का मूल्यांकन करें।</li>
          <li>10, 20 और 30 वर्षों के शुद्ध संपत्ति ग्राफ की तुलना करें।</li>
          <li>विभिन्न परिदृश्यों को सहेजें।</li>
        </ol>
      </section>

      {/* 5. Inputs Explained */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          5. इनपुट विवरण
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.1 घर का मूल्य और डाउन पेमेंट</h3>
            <p className="mt-1 leading-relaxed">यह ऋण राशि तय करता है। 500,000 $ के घर पर 20% डाउन पेमेंट के साथ 100,000 $ नकद और 400,000 $ का ऋण बनता है।</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.2 ब्याज दर और अवधि</h3>
            <p className="mt-1 leading-relaxed">यह परिशोधन तालिका निर्धारित करता है। उच्च ब्याज दर वित्तपोषण लागत को बढ़ाती है।</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.3 संपत्ति कर, बीमा और रखरखाव</h3>
            <p className="mt-1 leading-relaxed">मालिक के गैर-वसूली योग्य आवर्ती खर्चे जो मुद्रास्फीति के साथ बढ़ते हैं।</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.4 प्रारंभिक किराया और किराया वृद्धि</h3>
            <p className="mt-1 leading-relaxed">किराया हर साल बढ़ता है जिससे किरायेदार का खर्च समय के साथ काफी बढ़ जाता है।</p>
          </div>
        </div>
      </section>

      {/* 6. How Mortgage Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          6. मॉर्गेज पक्ष का कार्य सिद्धांत
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          शुरुआती वर्षों में ब्याज अधिक और मूलधन कम होता है, बाद में मूलधन तेजी से बढ़ता है।
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          समय बीतने के साथ इक्विटी निर्माण की गति तेज हो जाती है।
        </p>
      </section>

      {/* 7. Buying Costs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          7. किस्त से इतर स्वामित्व लागतें
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          संपत्ति कर, बीमा, मरम्मत और बिक्री पर लगने वाले दलाली शुल्क (5%–6%)।
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          कम समय के लिए घर खरीदना नुकसानदेह हो सकता है क्योंकि इन शुल्कों की भरपाई में समय लगता है।
        </p>
      </section>

      {/* 8. Stay Length */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          8. ठहराव अवधि का महत्व
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          लेन-देन लागतें एकमुश्त होती हैं, जबकि संपत्ति वृद्धि धीरे-धीरे होती है।
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          मानक मॉडल में 4.8 साल का ब्रेक-इवेन है। 3 साल से कम में किराया देना बेहतर रहता है।
        </p>
      </section>

      {/* 9. Breakeven Point */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          9. ब्रेक-इवेन बिंदु का विश्लेषण
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          वह समय जब खरीदने की शुद्ध लागत किराये से कम हो जाती है।
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          30 साल में खरीदने की शुद्ध लागत 726,761 $ और किराये की 1,721,379 $ बनती है।
        </p>
      </section>

      {/* 10. Appreciation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          10. मकान के मूल्य में वृद्धि
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          वार्षिक चक्रवृद्धि वृद्धि से घर का मूल्य बढ़ता है।
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          3% वार्षिक वृद्धि पर 500,000 $ का घर 30 साल में 1,200,000 $ से अधिक का हो जाता है।
        </p>
      </section>

      {/* 11. Rent Growth */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          11. किराया मुद्रास्फीति
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          3,000 $ का किराया 3% वृद्धि पर 30 साल बाद 7,280 $ प्रति माह हो जाएगा।
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          यह स्थिर मॉर्गेज किस्त के लाभ को स्पष्ट करता है।
        </p>
      </section>

      {/* 12. Opportunity Cost */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          12. डाउन पेमेंट की अवसर लागत
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          100,000 $ को यदि 5% रिटर्न पर शेयर बाजार में लगाया जाए तो 30 साल में 432,000 $ बनते हैं।
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          यह किरायेदार का मुख्य वित्तीय आधार बनता है।
        </p>
      </section>

      {/* 13. Price-to-Rent */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          13. मूल्य-से-किराया अनुपात
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          घर का मूल्य / वार्षिक किराया (500,000 $ / 36,000 $ = 13.9)।
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          15 से कम मान घर खरीदने के अनुकूल वातावरण को दर्शाता है।
        </p>
      </section>

      {/* 14. 5% Rule */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          14. 5% का नियम
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ब्याज, कर और रखरखाव की गैर-वसूली योग्य लागत 4,013 $/माह बनती है।
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          इसकी तुलना वर्तमान किराये से की जाती है।
        </p>
      </section>

      {/* 15. Tax Benefits */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          15. कर लाभ
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ब्याज कटौती से पहले वर्ष लगभग 1,007 $ की कर बचत होती है।
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          यह शुद्ध लागत को कम करने में मदद करता है।
        </p>
      </section>

      {/* 16. Net Worth */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          16. शुद्ध संपत्ति तुलना
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          10 वर्षों में खरीदार की शुद्ध संपत्ति 359,958 $ और किरायेदार की 162,889 $ होती है।
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          30 साल में ऋणमुक्त मकान खरीदार को बड़ी वित्तीय सुरक्षा देता है।
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          दोनों विकल्पों की संपत्ति का स्पष्ट अंतर सामने आता है।
        </p>
      </section>

      {/* 17. Scenario Drivers */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          17. निर्णय के प्रमुख कारक
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          लंबी अवधि और किराया वृद्धि खरीदने के पक्ष में जाती है।
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          अल्पकालिक निवास और उच्च निवेश रिटर्न किराये के पक्ष में जाते हैं।
        </p>
      </section>

      {/* 18. Short vs Long */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          18. अल्पकालिक बनाम दीर्घकालिक निर्णय
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          किराया अल्पकालिक गतिशीलता और लचीलापन देता है।
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          खरीद दीर्घकालिक स्थिरता और संपत्ति निर्माण देती है।
        </p>
      </section>

      {/* 19. Common Mistakes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          19. सामान्य गलतियों से बचें
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
          <li>केवल मासिक किराये की तुलना किस्त से करना।</li>
          <li>पूरी किस्त को व्यर्थ खर्च मान लेना।</li>
          <li>कर, बीमा और रखरखाव की अनदेखी करना।</li>
          <li>खरीद-बिक्री के क्लोजिंग शुल्कों को भूल जाना।</li>
          <li>मकान के मूल्य में वृद्धि को गारंटी मान लेना।</li>
          <li>शेयर बाजार के रिटर्न को जोखिम-मुक्त समझना।</li>
          <li>केवल मूल्य-किराया अनुपात पर निर्णय लेना।</li>
          <li>दीर्घकालिक किराया मुद्रास्फीति को नजरअंदाज करना।</li>
          <li>विभिन्न समय अवधियों का परीक्षण न करना।</li>
        </ul>
      </section>

      {/* 20. Scenario Analysis */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          20. परिदृश्य विश्लेषण की सर्वोत्तम विधि
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          मानक, सतर्क और आशावादी परिदृश्यों की तुलना करें।
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          एक समय में एक चर बदलकर निर्णय की मजबूती परखें।
        </p>
      </section>

      {/* 21. Methodology */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          21. कार्यप्रणाली एवं मुख्य सूत्र
        </h2>
        <div className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.1 मासिक मॉर्गेज किस्त</h3>
            <p className="mt-0.5 font-mono text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
              M = P × [r(1+r)^n] / [(1+r)^n - 1]
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.2 मकान का भविष्य मूल्य</h3>
            <p className="mt-0.5 leading-relaxed">Value(t) = Value(0) × (1 + r_growth)^t</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.3 भविष्य का किराया</h3>
            <p className="mt-0.5 leading-relaxed">Rent(t) = Rent(0) × (1 + r_rent_growth)^t</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.4 मूल्य-से-किराया अनुपात</h3>
            <p className="mt-0.5 leading-relaxed">अनुपात = खरीद मूल्य / कुल वार्षिक किराया (आधार: 13.9)</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.5 अवसर लागत</h3>
            <p className="mt-0.5 leading-relaxed">Portfolio(t) = Down Payment × (1 + r_return)^t</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.6 कर लाभ</h3>
            <p className="mt-0.5 leading-relaxed">Tax Benefit = max(0, Deductions - Standard) × Tax Rate</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "hi",
  calculatorSlug: "rent-vs-buy-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;

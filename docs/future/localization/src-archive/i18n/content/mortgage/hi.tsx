"use client";

import React from "react";
import Link from "next/link";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const HINDI_MORTGAGE_SEO = {
  title: "मॉर्गेज कैलकुलेटर",
  description:
    "अपने मासिक मॉर्गेज भुगतान (मूलधन और ब्याज), संपत्ति कर, गृह बीमा, पीएमआई और सोसायटी रखरखाव शुल्क की गणना करें। अतिरिक्त मूलधन भुगतान, पाक्षिक किस्त योजना और पूर्ण परिशोधन सारणी का अनुकरण करें।",
  category: "वित्त",
  keywords: [
    "मॉर्गेज कैलकुलेटर",
    "गृह ऋण कैलकुलेटर",
    "मासिक किस्त कैलकुलेटर",
    "परिशोधन सारणी",
    "गृह ऋण ब्याज दर",
    "पीएमआई बीमा",
    "संपत्ति कर",
    "गृह बीमा",
    "अतिरिक्त मूलधन भुगतान",
    "ईएमआई कैलकुलेटर",
  ],
};

export const HINDI_MORTGAGE_FAQS: CalculatorFAQ[] = [
  {
    question: "मासिक मूलधन और ब्याज (P&I) भुगतान की गणना कैसे की जाती है?",
    answer:
      "आपके आधार मासिक भुगतान की गणना मानक सावधि परिशोधन सूत्र से की जाती है: M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ], जहाँ P ऋण का मूलधन है, r मासिक ब्याज दर है (वार्षिक सांकेतिक दर को 12 से विभाजित करके) और n भुगतान अवधियों की कुल संख्या है (उदा. 30 वर्ष के ऋण के लिए 360 महीने)।",
  },
  {
    question: "PITI और कुल मासिक आवास व्यय में क्या अंतर है?",
    answer:
      "PITI पारंपरिक बैंकिंग मानक है जिसमें मूलधन (Principal), ब्याज (Interest), संपत्ति कर (Taxes), और गृह बीमा (Insurance) शामिल होते हैं। कुल मासिक आवास व्यय एक संपूर्ण व्यक्तिगत बजट आंकड़ा है जिसमें PITI के अतिरिक्त पीएमआई बीमा (PMI), हाउसिंग सोसायटी शुल्क (HOA), रखरखाव संचय निधि और स्वैच्छिक अतिरिक्त मूलधन भुगतान शामिल होते हैं।",
  },
  {
    question: "सांकेतिक ब्याज दर और वार्षिक प्रतिशत दर (APR) में क्या अंतर है?",
    answer:
      "सांकेतिक ब्याज दर (Note Rate) वह वार्षिक प्रतिशत है जो आपके बकाया मूलधन पर लगाया जाता है। वार्षिक प्रतिशत दर (APR) सांकेतिक दर के साथ-साथ ऋण प्रसंस्करण शुल्क, डिस्काउंट पॉइंट और अनिवार्य समापन लागतों को वार्षिक प्रतिशत के रूप में दर्शाती है।",
  },
  {
    question: "निजी बंधक बीमा (PMI) कब रद्द किया जा सकता है?",
    answer:
      "मानक नियामक दिशानिर्देशों (जैसे 1998 के होमओनर्स प्रोटेक्शन एक्ट) के तहत, जब ऋण का बकाया मूलधन संपत्ति के मूल खरीद मूल्य के 80% (80% LTV) तक पहुंच जाता है, तो उधारकर्ता लिखित रूप में पीएमआई रद्द करने का अनुरोध कर सकते हैं। साथ ही, जब निर्धारित परिशोधन 78% LTV तक पहुंचता है, तो ऋणदाता द्वारा इसे स्वतः समाप्त करना कानूनी रूप से अनिवार्य है।",
  },
  {
    question: "अतिरिक्त मूलधन भुगतान ऋण चुकौती अवधि को कैसे कम करता है?",
    answer:
      "अतिरिक्त भुगतान 100% सीधे आपके बकाया मूलधन को कम करने में लगाया जाता है। चूंकि भविष्य का मासिक ब्याज इस कम शेष राशि पर लगाया जाता है, ब्याज प्रभार स्थायी रूप से घट जाते हैं, जिससे आपकी नियमित निश्चित किस्तें शेष ऋण को वर्षों पहले चुकता कर देती हैं।",
  },
  {
    question: "पाक्षिक (हर दो सप्ताह में) भुगतान योजना ब्याज की बचत कैसे करती है?",
    answer:
      "पाक्षिक भुगतान योजना में आप हर दो सप्ताह में अपनी नियमित मासिक किस्त का आधा हिस्सा (M / 2) चुकाते हैं। एक कैलेंडर वर्ष में 52 सप्ताह होने के कारण, आप 26 अर्ध-भुगतान करते हैं, जो वर्ष में 13 पूर्ण मासिक भुगतानों के बराबर होता है। यह एक अतिरिक्त मासिक भुगतान 30 वर्ष की अवधि को कई वर्ष घटा देता है और भारी ब्याज बचाता है।",
  },
];

export function HindiMortgageContent() {
  return (
    <div className="space-y-10 py-4 text-slate-900 dark:text-slate-100">
      {/* SECTION 1: प्रस्तावना */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          अपने मॉर्गेज और आवास की कुल लागत को समझें
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          एक आवासीय बंधक ऋण (मॉर्गेज) किसी भी परिवार द्वारा की जाने वाली सबसे बड़ी दीर्घकालिक वित्तीय प्रतिबद्धताओं में से एक है।
          यद्यपि घर खरीदार अक्सर केवल अनुबंध खरीद मूल्य और सांकेतिक ब्याज दर के आधार पर संपत्तियों का मूल्यांकन करते हैं,
          घर के स्वामित्व की वास्तविक लागत में ऋण सेवा, स्थानीय नगरपालिका संपत्ति कर, गृह बीमा, हाउसिंग सोसायटी शुल्क और संभावित निजी बंधक बीमा (PMI) का संयोजन शामिल होता है।
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          यह <strong>मॉर्गेज कैलकुलेटर</strong> आपके आवास व्यय का एक व्यापक और पारदर्शी विवरण प्रदान करने के लिए तैयार किया गया है।
          मानक मूलधन और ब्याज गणनाओं से आगे बढ़कर, यह आपको एस्क्रो खर्च, अनुमानित वार्षिक लागत मुद्रास्फीति, त्वरित पाक्षिक भुगतान और ऋण अवधि के दौरान ब्याज बचत का मूल्यांकन करने के लिए अतिरिक्त मूलधन रणनीतियों का अनुकरण करने की अनुमति देता है।
        </p>
      </section>

      {/* SECTION 2: कैलकुलेटर का उपयोग कैसे करें */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          मॉर्गेज कैलकुलेटर का उपयोग कैसे करें
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          कैलकुलेटर को इंटरैक्टिव मॉड्यूल में व्यवस्थित किया गया है जो मासिक देनदारियों, दृश्य चार्ट और परिशोधन तालिकाओं को रीयल-टाइम में अपडेट करते हैं:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">घर का मूल्य और डाउन पेमेंट</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              घर का अनुबंध खरीद मूल्य और अपना प्रारंभिक डाउन पेमेंट दर्ज करें (राशि या प्रतिशत में)। उपकरण स्वचालित रूप से आवश्यक ऋण मूलधन और ऋण-से-मूल्य (LTV) अनुपात की गणना करता है।
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">ऋण अवधि और ब्याज दर</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              अपनी पुनर्भुगतान अवधि (जैसे 15 या 30 वर्ष) और बकाया मूलधन शेष पर लागू होने वाली निश्चित वार्षिक सांकेतिक ब्याज दर निर्दिष्ट करें।
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">कर, बीमा और पीएमआई</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              वार्षिक संपत्ति कर (निश्चित डॉलर या प्रतिशत के रूप में), वार्षिक गृह बीमा प्रीमियम और 20% से कम डाउन पेमेंट वाले ऋणों के लिए लागू पीएमआई दरें दर्ज करें।
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">सोसायटी शुल्क और रखरखाव संचय</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              मासिक हाउसिंग सोसायटी (HOA) शुल्क और वार्षिक रखरखाव संचय निधि दर्ज करें (जिसे कैलकुलेटर मासिक आरक्षित राशि स्थापित करने के लिए 12 से विभाजित करता है)।
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">वार्षिक लागत वृद्धि (मुद्रास्फीति)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              नगरपालिका करों, बीमा प्रीमियम, सोसायटी शुल्क और रखरखाव लागतों के लिए अनुमानित वार्षिक प्रतिशत वृद्धि निर्दिष्ट करके दीर्घकालिक मुद्रास्फीति का मॉडल बनाएं।
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">अतिरिक्त मूलधन और पाक्षिक भुगतान</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              मासिक अतिरिक्त भुगतान, वार्षिक वर्षगांठ योगदान, 8 एकमुश्त राशियों का अनुकरण करें या 26-अवधि के पाक्षिक भुगतान कार्यक्रम को सक्रिय करें।
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: कैलकुलेटर क्या गणना करता है */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          मॉर्गेज कैलकुलेटर क्या गणना करता है
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          कैलकुलेटर आपकी प्रारंभिक मासिक नकद प्रतिबद्धताओं और 30 वर्षों में संचयी देनदारियों का एक बहुआयामी सारांश प्रदान करता है:
        </p>
        <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>मूलधन और ब्याज (P&amp;I आधार):</strong> चुनी गई अवधि में अपने ऋण शेष को शून्य तक परिशोधित करने के लिए आवश्यक संविदात्मक मासिक ऋण सेवा।</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>मासिक संपत्ति कर एस्क्रो:</strong> आपके अनुमानित वार्षिक नगरपालिका संपत्ति कर दायित्व का ठीक 1/12वां हिस्सा।</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>मासिक गृह बीमा एस्क्रो:</strong> आपके वार्षिक संपत्ति बीमा प्रीमियम का ठीक 1/12वां हिस्सा।</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>मासिक निजी बंधक बीमा (PMI):</strong> 20% से कम डाउन पेमेंट होने पर (LTV &gt; 80%) लागू होने वाला अस्थायी मासिक शुल्क।</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>मासिक सोसायटी और रखरखाव शुल्क:</strong> गैर-एस्क्रो सोसायटी शुल्क और वार्षिक रखरखाव संचय का 1/12वां हिस्सा।</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>कुल मासिक आवास व्यय:</strong> प्रथम वर्ष का कुल मासिक बजट (P&amp;I + कर + बीमा + पीएमआई + सोसायटी + रखरखाव + अतिरिक्त मूलधन)।</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>जीवनकाल का कुल ब्याज और कुल लागत:</strong> पुनर्भुगतान अवधि में अर्जित संचयी ब्याज और सभी श्रेणियों में खर्च की गई कुल राशि।</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>ऋणमुक्ति तिथि:</strong> सटीक कैलेंडर माह और वर्ष जब आपका ऋण शेष शून्य हो जाता है।</span>
          </li>
        </ul>
      </section>

      {/* SECTION 4: मासिक किस्तों की गणना कैसे होती है */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          मासिक बंधक किस्तों की गणना कैसे होती है
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          निश्चित दर वाले मॉर्गेज भुगतान की गणना मानक वार्षिकी परिशोधन गणितीय मॉडल से की जाती है। प्रत्येक मासिक भुगतान को इस प्रकार संरचित किया जाता है कि आवधिक ब्याज और मूलधन में कमी का योग पूरी अवधि में स्थिर रहे।
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
            मानक सावधि मॉर्गेज सूत्र:
          </span>
          <div className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-slate-100 py-1 overflow-x-auto">
            M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
            <div><strong>M:</strong> मासिक मूलधन और ब्याज भुगतान</div>
            <div><strong>P:</strong> ऋण मूलधन राशि (घर का मूल्य - डाउन पेमेंट)</div>
            <div><strong>r:</strong> मासिक ब्याज दर (वार्षिक दर / 12 / 100)</div>
            <div><strong>n:</strong> भुगतान अवधियों की कुल संख्या (वर्षों में अवधि × 12)</div>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong>शून्य ब्याज दर का विशेष मामला:</strong> 0% ब्याज दर (r = 0) के सैद्धांतिक परिदृश्य में, सूत्र रैखिक विभाजन में सरल हो जाता है: <code>M = P / n</code>। इस स्थिति में कुल ब्याज $0.00 होता है और प्रत्येक डॉलर बकाया मूलधन को सीधे कम करता है।
        </p>
      </section>

      {/* SECTION 5: चरण-दर-चरण गणना उदाहरण */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          चरण-दर-चरण विस्तृत गणना उदाहरण
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          यह समझने के लिए कि प्रत्येक घटक आपके कुल मासिक आवास बजट का निर्माण कैसे करता है, निम्नलिखित आधार परिदृश्य की गणना देखें:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-slate-200 dark:border-slate-700 pb-2.5">
            <div><span className="text-slate-500 block">घर का मूल्य:</span><strong>$400,000.00</strong></div>
            <div><span className="text-slate-500 block">डाउन पेमेंट (20%):</span><strong>$80,000.00</strong></div>
            <div><span className="text-slate-500 block">ऋण मूलधन (P):</span><strong>$320,000.00</strong></div>
            <div><span className="text-slate-500 block">ब्याज दर:</span><strong>6.706%</strong></div>
          </div>
          <div className="space-y-1.5 font-mono text-[11px] leading-relaxed">
            <p>1. मासिक ब्याज दर (r) = 0.06706 / 12 = 0.0055883333...</p>
            <p>2. कुल भुगतान अवधियाँ (n) = 30 वर्ष × 12 = 360 माह</p>
            <p>3. चक्रवृद्धि कारक (1 + r)^360 = (1.0055883333)^360 ≈ 7.464627</p>
            <p>4. मासिक P&amp;I = $320,000 × [ 0.0055883333 × 7.464627 ] / [ 7.464627 - 1 ] = <strong>$2,066.16</strong></p>
            <p>5. मासिक संपत्ति कर (1.2% $400k पर) = $4,800.00 / 12 = <strong>$400.00</strong></p>
            <p>6. मासिक गृह बीमा = $1,500.00 / 12 = <strong>$125.00</strong></p>
            <p>7. मासिक पीएमआई = $0.00 (20% डाउन पेमेंट के कारण छूट)</p>
            <p>8. मासिक सोसायटी शुल्क = <strong>$333.33</strong></p>
            <p>9. मासिक रखरखाव संचय निधि = $4,000.00 / 12 = <strong>$333.33</strong></p>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs font-sans font-bold text-blue-700 dark:text-blue-400">
              कुल मासिक आवास व्यय = $2,066.16 + $400.00 + $125.00 + $0.00 + $333.33 + $333.33 = $3,257.82 / माह
            </div>
            <div className="text-[11px] font-sans text-slate-600 dark:text-slate-400">
              30 वर्षों की कुल लागत = $320,000 (मूलधन) + $423,818.78 (ब्याज) + $144,000 (कर) + $45,000 (बीमा) + $120,000 (सोसायटी) + $120,000 (संचय निधि) = <strong>$1,172,818.78</strong>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: परिशोधन यांत्रिकी */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          मॉर्गेज परिशोधन की कार्यप्रणाली
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          परिशोधन (Amortization) अनुसूचित आवधिक भुगतानों के माध्यम से ऋण को धीरे-धीरे समाप्त करने की प्रक्रिया है। निश्चित दर वाले ऋण में भुगतान की आंतरिक संरचना पूरी अवधि में लगातार बदलती रहती है:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">प्रारंभिक वर्ष (वर्ष 1–5)</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              चूंकि मासिक ब्याज की गणना बड़े प्रारंभिक मूलधन शेष (<code>ब्याज = शेष × r</code>) पर की जाती है, ब्याज का हिस्सा आपकी शुरुआती किस्तों का अधिकांश भाग ले लेता है। हमारे उदाहरण के पहले महीने में, $1,788.27 ब्याज में जाते हैं जबकि केवल $277.89 मूलधन को कम करते हैं।
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">अंतिम वर्ष (वर्ष 20–30)</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              जैसे-जैसे क्रमिक भुगतान शेष मूलधन को घटाते हैं, मासिक ब्याज शुल्क आनुपातिक रूप से घटता जाता है। चूंकि कुल मासिक किस्त स्थिर रहती है, भुगतान का एक बड़ा हिस्सा सीधे मूलधन में जाता है, जिससे गृह संपत्ति का निर्माण तेजी से होता है।
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          कर योजना के लिए वार्षिक ब्याज कटौती दर्शाने वाले स्टैंडअलोन शेड्यूल के लिए, हमारे समर्पित{" "}
          <Link href="/calculators/amortization-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            परिशोधन कैलकुलेटर
          </Link>{" "}
          का उपयोग करें।
        </p>
      </section>

      {/* SECTION 7: संपत्ति कर, बीमा और एस्क्रो */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          संपत्ति कर, गृह बीमा और एस्क्रो खाते
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          अधिकांश आवासीय ऋणदाता यह सुनिश्चित करने के लिए <strong>एस्क्रो खाता</strong> बनाए रखने की मांग करते हैं कि वार्षिक संपत्ति कर और बीमा प्रीमियम समय पर चुकाए जाएं।
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          आपका ऋण प्रबंधक प्रत्येक माह आपके अनुमानित वार्षिक कर और बीमा देनदारियों का 1/12वां हिस्सा एकत्र करता है। एक वार्षिक एस्क्रो विश्लेषण संशोधित करों के आधार पर मासिक संग्रह को समायोजित करता है। इस कैलकुलेटर में वार्षिक लागत वृद्धि प्रतिशत दर्ज करके आप देख सकते हैं कि मुद्रास्फीति 15 से 30 वर्षों में इन खर्चों को कैसे बढ़ाती है।
        </p>
      </section>

      {/* SECTION 8: पीएमआई और एलटीवी सीमाएं */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          निजी बंधक बीमा (PMI) और ऋण-से-मूल्य (LTV) सीमाएं
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          पारंपरिक ऋण से घर खरीदते समय 20% से कम डाउन पेमेंट करने पर आपका ऋण-से-मूल्य (LTV) अनुपात 80% से अधिक हो जाता है। ऐसे में बैंक जोखिम कम करने के लिए निजी बंधक बीमा (PMI) अनिवार्य करते हैं।
        </p>
        <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs space-y-1.5">
          <span className="font-bold text-blue-900 dark:text-blue-200 block">
            पीएमआई रद्दीकरण दिशानिर्देश (होमओनर्स प्रोटेक्शन एक्ट):
          </span>
          <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>उधारकर्ता के अनुरोध पर रद्दीकरण (80% LTV):</strong> जब बकाया मूलधन मूल संपत्ति मूल्य के 80% तक पहुंच जाता है, तो उधारकर्ता लिखित रूप में पीएमआई रद्द करने का अनुरोध कर सकते हैं।</li>
            <li><strong>ऋणदाता द्वारा स्वतः समाप्ति (78% LTV):</strong> जब अनुसूचित मूलधन 78% LTV तक पहुंचता है, तो ऋणदाता के लिए पीएमआई समाप्त करना कानूनी रूप से अनिवार्य है।</li>
          </ul>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <em>मॉडलिंग प्रकटीकरण:</em> यह कैलकुलेटर परिशोधन सारणी में पीएमआई शुल्क समाप्त करने के लिए <strong>80% LTV योजना धारणा</strong> का उपयोग करता है। विभिन्न डाउन पेमेंट विकल्पों के लिए हमारे{" "}
          <Link href="/calculators/down-payment-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            डाउन पेमेंट कैलकुलेटर
          </Link>{" "}
          का अन्वेषण करें।
        </p>
      </section>

      {/* SECTION 9: सोसायटी शुल्क और अन्य लागतें */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          हाउसिंग सोसायटी शुल्क और सहायक आवास लागतें
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          घर खरीदते समय <strong>PITI</strong> (मूलधन, ब्याज, कर, बीमा) को <strong>घर में रहने की कुल मासिक लागत</strong> समझ लेना एक सामान्य भूल है।
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          हाउसिंग सोसायटी (HOA) शुल्क का भुगतान सीधे सोसायटी प्रबंधन को साझा सुविधाओं, सुरक्षा और रखरखाव के लिए किया जाता है। इसके अतिरिक्त नियमित घर रखरखाव के लिए बजट बनाना आवश्यक है। हमारे कैलकुलेटर में <code>अन्य लागत ($/वर्ष)</code> के तहत वार्षिक राशि दर्ज करने पर यह इसे 12 से विभाजित करके आपके वास्तविक मासिक बजट में जोड़ता है।
        </p>
      </section>

      {/* SECTION 10: अतिरिक्त मूलधन भुगतान */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          अतिरिक्त मॉर्गेज भुगतान और त्वरित ऋणमुक्ति
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          अतिरिक्त मूलधन भुगतान करने से कुल ब्याज लागत में भारी कमी आती है और ऋण अवधि काफी छोटी हो जाती है:
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <th className="p-2.5 font-bold">भुगतान रणनीति ($320k ऋण @ 6.706%)</th>
                <th className="p-2.5 font-bold">नई ऋण अवधि</th>
                <th className="p-2.5 font-bold">बचाया गया समय</th>
                <th className="p-2.5 font-bold">कुल ब्याज बचत</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-sans tabular-nums text-slate-600 dark:text-slate-400">
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">आधार (कोई अतिरिक्त भुगतान नहीं)</td>
                <td className="p-2.5">360 माह (30.0 वर्ष)</td>
                <td className="p-2.5">0 माह</td>
                <td className="p-2.5">$0.00</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">+$200 / माह अतिरिक्त मूलधन</td>
                <td className="p-2.5">295 माह (~24.6 वर्ष)</td>
                <td className="p-2.5">65 माह (5.4 वर्ष)</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">$90,073.60</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">+$2,000 / वर्ष (वार्षिक बोनस)</td>
                <td className="p-2.5">289 माह (~24.1 वर्ष)</td>
                <td className="p-2.5">71 माह (5.9 वर्ष)</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">$97,337.83</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">एकमुश्त $20,000 (महीना 12)</td>
                <td className="p-2.5">304 माह (~25.3 वर्ष)</td>
                <td className="p-2.5">56 माह (4.7 वर्ष)</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">$84,926.92</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          यदि ऋण लेने के बाद से बाजार में ब्याज दरें कम हुई हैं, तो संभावित पुनर्वित्त बचत की गणना हमारे{" "}
          <Link href="/calculators/refinance-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            मॉर्गेज रीफाइनेंस कैलकुलेटर
          </Link>{" "}
          से करें।
        </p>
      </section>

      {/* SECTION 11: पाक्षिक भुगतान */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          पाक्षिक (हर दो सप्ताह में) भुगतान की कार्यप्रणाली
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          एक मानक मॉर्गेज में प्रति वर्ष 12 मासिक किस्तों की आवश्यकता होती है। पाक्षिक कार्यक्रम में आप हर दो सप्ताह में अपनी मासिक किस्त का आधा हिस्सा (<code>M / 2</code>) चुकाते हैं।
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          चूंकि कैलेंडर वर्ष में 52 सप्ताह होते हैं, एक पाक्षिक अनुसूची से <strong>26 अर्ध-भुगतान</strong> बनते हैं, जो वर्ष में <strong>13 पूर्ण भुगतानों के बराबर</strong> होते हैं (<code>26 × 0.5 = 13</code>)। यह अतिरिक्त वार्षिक किस्त ऋण अवधि को कई वर्ष कम कर देती है।
        </p>
      </section>

      {/* SECTION 12: 15-वर्ष बनाम 30-वर्ष */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          15-वर्ष बनाम 30-वर्ष सावधि मॉर्गेज
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          15-वर्ष और 30-वर्ष के ऋण के बीच चयन करना मासिक नकद लचीलेपन और कुल ब्याज लागत के बीच सीधा समझौता है:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">30-वर्ष सावधि मॉर्गेज</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li>कम मासिक अनिवार्य भुगतान।</li>
              <li>अप्रत्याशित वित्तीय संकट के समय बजट में अधिकतम लचीलापन।</li>
              <li>दशकों के दौरान कुल ब्याज भुगतान अधिक।</li>
            </ul>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">15-वर्ष सावधि मॉर्गेज</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li>उच्च अनिवार्य मासिक किस्तें (लगभग 35% से 50% अधिक)।</li>
              <li>भारी ब्याज बचत (अक्सर कुल ब्याज में 50% से अधिक की बचत)।</li>
              <li>पहले पांच वर्षों में ही तेजी से संपत्ति निर्माण।</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 13: बजट और डीटीआई अनुपात */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          आप कितने मूल्य का घर खरीद सकते हैं?
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          किसी ज्ञात मूल्य पर मासिक किस्त की गणना एक प्रत्यक्ष अनुमान है। लेकिन यदि आप घर की तलाश शुरू कर रहे हैं और अपनी आय व मौजूदा देनदारियों के आधार पर अधिकतम बजट जानना चाहते हैं, तो आपको अंडरराइटिंग गणना की आवश्यकता होती है।
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          ऋणदाता आपकी ऋण पात्रता का आकलन <strong>ऋण-से-आय (DTI) अनुपात</strong> से करते हैं :
          आवास अनुपात (आवास लागत को सकल मासिक आय से विभाजित करके, मानक सीमा 28%) और कुल ऋण अनुपात (सभी ऋण किस्तों को सकल आय से विभाजित करके, मानक सीमा 36% से 43%)। अपने बजट के मूल्यांकन के लिए हमारे{" "}
          <Link href="/calculators/house-affordability-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            गृह सामर्थ्य कैलकुलेटर
          </Link>{" "}
          या{" "}
          <Link href="/calculators/dti-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            DTI कैलकुलेटर
          </Link>{" "}
          का उपयोग करें।
        </p>
      </section>

      {/* SECTION 14: सामान्य त्रुटियाँ */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          मॉर्गेज गणना में होने वाली सामान्य गलतियाँ
        </h3>
        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <strong>1. सांकेतिक ब्याज दर और APR में भ्रम:</strong> सांकेतिक दर बकाया मूलधन पर लगाई जाती है। APR में सभी बैंक शुल्क शामिल होते हैं। परिशोधन सूत्र में APR दर्ज करने से मासिक किस्त का गलत अधिक अनुमान लग जाएगा।
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <strong>2. केवल मूलधन और ब्याज का बजट बनाना:</strong> संपत्ति कर, बीमा और सोसायटी शुल्क को नजरअंदाज करने से वास्तविक खर्च में 20% से 40% की कमी पड़ सकती है।
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <strong>3. सरकारी ऋणों पर पारंपरिक नियम लागू समझना:</strong> सरकारी ऋण (जैसे FHA या VA) के अपने बीमा नियम होते हैं। विशिष्ट सरकारी ऋणों के लिए हमारे{" "}
            <Link href="/calculators/fha-loan-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              FHA ऋण कैलकुलेटर
            </Link>{" "}
            या{" "}
            <Link href="/calculators/va-mortgage-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              VA मॉर्गेज कैलकुलेटर
            </Link>{" "}
            का उपयोग करें।
          </div>
        </div>
      </section>

      {/* SECTION 15: संबंधित कैलकुलेटर */}
      <section className="space-y-4 pt-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          संबंधित रियल एस्टेट और वित्तीय कैलकुलेटर
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <Link
            href="/calculators/house-affordability-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              गृह सामर्थ्य कैलकुलेटर
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">आय के आधार पर अधिकतम घर बजट की गणना करें।</span>
          </Link>
          <Link
            href="/calculators/amortization-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              परिशोधन कैलकुलेटर
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">पूर्ण वार्षिक और मासिक भुगतान तालिकाएं।</span>
          </Link>
          <Link
            href="/calculators/down-payment-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              डाउन पेमेंट कैलकुलेटर
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">प्रारंभिक नकद राशि अनुकूलित करें और पीएमआई बचाएं।</span>
          </Link>
          <Link
            href="/calculators/refinance-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              रीफाइनेंस कैलकुलेटर
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">पुनर्वित्त बचत और ब्रेक-ईवन की गणना करें।</span>
          </Link>
          <Link
            href="/calculators/rent-vs-buy-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              किराया बनाम खरीद
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">दीर्घकालिक संपत्ति निर्माण की तुलना करें।</span>
          </Link>
          <Link
            href="/calculators/dti-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              DTI अनुपात कैलकुलेटर
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">अपने ऋण-से-आय अनुपात की जांच करें।</span>
          </Link>
          <Link
            href="/calculators/fha-loan-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              FHA ऋण कैलकुलेटर
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">3.5% डाउन पेमेंट और एमआईपी वित्तपोषण।</span>
          </Link>
          <Link
            href="/calculators/va-mortgage-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              VA मॉर्गेज कैलकुलेटर
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">सैनिकों के लिए शून्य डाउन पेमेंट ऋण शर्तें।</span>
          </Link>
        </div>
      </section>

      {/* SECTION 16: अक्सर पूछे जाने वाले प्रश्न */}
      <section className="space-y-4 pt-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          अक्सर पूछे जाने वाले प्रश्न (FAQ)
        </h3>
        <div className="space-y-3">
          {HINDI_MORTGAGE_FAQS.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {faq.question}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HindiMortgageContent;

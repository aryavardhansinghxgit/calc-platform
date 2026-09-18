"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Info, AlertTriangle } from "lucide-react";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "होम इक्विटी लोन क्या है और यह कैसे काम करता है?",
    "answer": "होम इक्विटी लोन एक निश्चित ब्याज दर वाला दूसरा मॉर्गेज है जिसमें आप अपने घर में बनी इक्विटी को गिरवी रखकर एकमुश्त ऋण राशि प्राप्त करते हैं।"
  },
  {
    "question": "मैं अपनी होम इक्विटी पर कितना ऋण ले सकता हूँ?",
    "answer": "अधिकांश ऋणदाता संपत्ति के बाजार मूल्य का 80% से 85% अधिकतम सीएलटीवी (CLTV) और पहली मॉर्गेज की शेष राशि घटाकर ऋण देते हैं।"
  },
  {
    "question": "सीएलटीवी (CLTV) क्या है और इसकी गणना कैसे की जाती है?",
    "answer": "सीएलटीवी संपत्ति पर सभी सक्रिय ऋणों के कुल योग को घर के मौजूदा बाजार मूल्य से विभाजित करके निकाला जाता है।"
  },
  {
    "question": "होम इक्विटी लोन की मासिक किस्त कैसे निकाली जाती है?",
    "answer": "यह मानक एन्युइटी फॉर्मूले से मूलधन, मासिक ब्याज दर और महीनों में कुल अवधि के आधार पर निकाली जाती है।"
  },
  {
    "question": "इसके लिए किस क्रेडिट स्कोर की आवश्यकता होती है?",
    "answer": "आमतौर पर 620 या उससे अधिक का क्रेडिट स्कोर आवश्यक होता है, जबकि सर्वोत्तम ब्याज दरों के लिए 700+ स्कोर की आवश्यकता होती है।"
  },
  {
    "question": "होम इक्विटी लोन और हेलॉक (HELOC) में क्या अंतर है?",
    "answer": "होम इक्विटी लोन निश्चित ब्याज दर और निश्चित मासिक किस्त के साथ एकमुश्त राशि देता है, जबकि हेलॉक एक परिवर्तनीय दर वाली क्रेडिट लाइन है।"
  },
  {
    "question": "कैश-आउट रीफाइनेंस से यह कैसे अलग है?",
    "answer": "रीफाइनेंस आपके पहले ऋण को पूरी तरह से नए ऋण से बदल देता है, जबकि होम इक्विटी लोन आपके मूल ऋण को बिना बदले अतिरिक्त ऋण देता है।"
  },
  {
    "question": "क्या होम इक्विटी लोन का ब्याज कर-कटौती योग्य है?",
    "answer": "वर्तमान कर नियमों के अनुसार, ब्याज पर कर छूट तभी मिलती है जब ऋण का उपयोग घर की मरम्मत, नवीनीकरण या खरीद के लिए किया गया हो।"
  },
  {
    "question": "क्या मैं समय से पहले ऋण चुका सकता हूँ?",
    "answer": "हाँ, अधिकांश बैंक बिना किसी पूर्व-भुगतान शुल्क के समय से पहले भुगतान करने की अनुमति देते हैं।"
  },
  {
    "question": "क्लोजिंग लागत कितनी होती है?",
    "answer": "यह आमतौर पर ऋण राशि का 2% से 5% होती है जिसमें मूल्यांकन, दस्तावेजीकरण और कानूनी शुल्क शामिल होते हैं।"
  },
  {
    "question": "यदि घर का मूल्य गिर जाता है तो क्या होगा?",
    "answer": "आप नकारात्मक इक्विटी स्थिति में आ सकते हैं। मासिक किस्तें जारी रहती हैं, लेकिन बिक्री या रीफाइनेंस के लिए आपको अतिरिक्त नकद देना होगा।"
  },
  {
    "question": "ऋण स्वीकृति में कितना समय लगता है?",
    "answer": "दस्तावेज़ सत्यापन और संपत्ति मूल्यांकन के आधार पर इसमें आमतौर पर 2 से 6 सप्ताह का समय लगता है।"
  }
];

export const seo = {
  title: "होम इक्विटी लोन कैलकुलेटर (Home Equity Loan Calculator) — अधिकतम अनुमेय कुल ऋण",
  description: "होम इक्विटी लोन की मासिक किस्त, संयुक्त ऋण-से-मूल्य (CLTV), वास्तविक APR, पुनर्भुगतान अनुसूची और अधिकतम ऋण सीमा की गणना करें।",
  keywords: ["होम इक्विटी लोन कैलकुलेटर","दूसरी मॉर्गेज","सीएलटीवी कैलकुलेटर","गृह इक्विटी"]
};

export const ContentComponent = function HomeEquityContentHI() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          होम इक्विटी लोन कैलकुलेटर (Home Equity Loan Calculator)
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          होम इक्विटी लोन की मासिक किस्त, अधिकतम उधार क्षमता, संयुक्त ऋण-से-मूल्य (CLTV), वास्तविक वार्षिक दर (APR), दो-चरणीय परिशोधन और अग्रिम भुगतान बचत की गणना करें।
        </p>
      </div>

      {/* 1. WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. होम इक्विटी लोन कैलकुलेटर क्या है?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          होम इक्विटी लोन कैलकुलेटर यह अनुमान लगाता है कि आप अपनी संपत्ति की इक्विटी के विरुद्ध कितना ऋण ले सकते हैं और एक निश्चित दर वाली दूसरी मॉर्गेज की मासिक किस्त का मॉडल तैयार करता है।
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          यह हेलॉक (HELOC) से भिन्न है। होम इक्विटी लोन एकमुश्त राशि के साथ निश्चित मासिक किस्त प्रदान करता है।
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>ऋण मूल्यांकन मॉडल सूचना</span>
          </div>
          <p>
            यह परिणाम एक गणितीय सिमुलेशन है और किसी ऋणदाता की अंतिम प्रतिबद्धता नहीं है। वास्तविक ब्याज दरें आपकी साख पर निर्भर करती हैं।
          </p>
        </div>
      </section>

      {/* 2. HOW TO USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. होम इक्विटी लोन कैलकुलेटर का उपयोग कैसे करें
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          अपने ऋण परिदृश्य का विश्लेषण करने के लिए इन चरणों का पालन करें :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
            <div key={0} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">1. घर का अनुमानित बाजार मूल्य दर्ज करें।</span>
            </div>
            <div key={1} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">2. पहले मॉर्गेज की शेष राशि दर्ज करें।</span>
            </div>
            <div key={2} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">3. अधिकतम सीएलटीवी सीमा (80% मानक, 85% या 90%) चुनें।</span>
            </div>
            <div key={3} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">4. मोड A (इच्छित ऋण राशि) या मोड B (अधिकतम क्षमता) चुनें।</span>
            </div>
            <div key={4} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">5. निश्चित ब्याज दर और अवधि (15 या 30 वर्ष) दर्ज करें।</span>
            </div>
            <div key={5} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">6. अनुमानित क्लोजिंग लागत दर्ज करें।</span>
            </div>
            <div key={6} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">7. क्लोजिंग लागत का प्रकार चुनें (नकद, कटौती या वित्तपोषित)।</span>
            </div>
            <div key={7} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">8. गणना की गई मासिक किस्त की समीक्षा करें।</span>
            </div>
            <div key={8} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">9. अधिकतम उपलब्ध ऋण, नया सीएलटीवी और वास्तविक APR जांचें।</span>
            </div>
            <div key={9} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">10. संपूर्ण परिशोधन तालिका का निरीक्षण करें और CSV डाउनलोड करें।</span>
            </div>
            <div key={10} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">11. ब्याज बचत के लिए अतिरिक्त मासिक भुगतान जोड़ें।</span>
            </div>
            <div key={11} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">12. हेलॉक और कैश-आउट रीफाइनेंस परिदृश्यों से तुलना करें।</span>
            </div>
            <div key={12} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">13. आय-ऋण अनुपात (DTI) और कर लाभों का मूल्यांकन करें।</span>
            </div>
            <div key={13} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">14. अपने परिदृश्य को स्थानीय इतिहास में सुरक्षित करें।</span>
            </div>
        </div>
      </section>

      {/* 3. CLTV */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. होम इक्विटी और संयुक्त ऋण-से-मूल्य (CLTV)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          उधार लेने की अधिकतम क्षमता सीएलटीवी सीमा के आधार पर तय की जाती है :
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"अधिकतम अनुमेय कुल ऋण = घर का मूल्य × सीएलटीवी सीमा"}</div>
          <div>{"अधिकतम उपलब्ध इक्विटी = अधिकतम कुल ऋण - पहली मॉर्गेज का शेष"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          उदाहरण : 500,000 $ के मकान पर 275,000 $ की पहली मॉर्गेज और 80% सीएलटीवी सीमा होने पर कुल स्वीकार्य ऋण 400,000 $ बनता है। पहली मॉर्गेज घटाने के बाद अधिकतम 125,000 $ का दूसरा ऋण प्राप्त किया जा सकता है।
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          यह संपत्ति के बाजार उतार-चढ़ाव में सुरक्षित इक्विटी बनाए रखने में मदद करता है।
        </p>
      </section>

      {/* 4. MODE A VS B */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. मोड A बनाम मोड B: विशिष्ट ऋण बनाम अधिकतम क्षमता
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          कैलकुलेटर दो अलग-अलग गणना मोड प्रदान करता है :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">मोड A — विशिष्ट ऋण राशि</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">मरम्मत या अन्य आवश्यकताओं के लिए एक निश्चित राशि दर्ज करके सटीक किस्त निकालें।</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">मोड B — सीएलटीवी अनुसार अधिकतम क्षमता</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">अधिकतम स्वीकृत सीएलटीवी सीमा तक उपलब्ध संपूर्ण ऋण क्षमता की गणना करें।</p>
          </div>
        </div>
      </section>

      {/* 5. FORMULA */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. निश्चित मासिक किस्त का फॉर्मूला
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          मासिक किस्त (M) की गणना मानक एन्युइटी फॉर्मूले द्वारा की जाती है :
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"M = P \\times \\frac{r(1+r)^n}{(1+r)^n - 1}"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          M = P × [r(1+r)^n] / [(1+r)^n - 1], जहाँ P मूलधन, r मासिक ब्याज दर और n महीनों की कुल संख्या है। 125,000 $ पर 8.50% की दर से 15 वर्षों के लिए मासिक किस्त 1,230.94 $ होती है।
        </p>
      </section>

      {/* 6. ZERO INTEREST */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. शून्य ब्याज दर परिदृश्य
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          0% ब्याज दर वाले विशेष प्रस्तावों में सीधी रैखिक गणना लागू होती है : M = P / n.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          125,000 $ पर 15 वर्षों के लिए 0% ब्याज पर मासिक किस्त 694.44 $ होगी।
        </p>
      </section>

      {/* 7. AMORTIZATION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. दूसरी मॉर्गेज की परिशोधन अनुसूची
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          तालिका प्रत्येक महीने मूलधन और ब्याज के सटीक विभाजन को दर्शाती है।
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• {"Beginning Balance / Saldo Inicial"}: $125,000</div>
          <div>• {"Annual Payment / Pago Anual"}: $14,335</div>
          <div>• {"Principal Paid / Capital"}: $4,497</div>
          <div>• {"Interest Paid / Intereses"}: $9,837</div>
          <div>• {"Ending Balance / Saldo Final"}: $120,503</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          पहले महीने 1,230.94 $ की किस्त में से 885.42 $ ब्याज में और 345.52 $ मूलधन में जाते हैं, जिससे शेष राशि घटकर 124,654.48 $ हो जाती है।
        </p>
      </section>

      {/* 8. APR */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. वास्तविक वार्षिक दर (APR) और क्लोजिंग लागत
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          वास्तविक APR सभी अग्रिम शुल्कों को शामिल करके ऋण की वास्तविक लागत प्रदर्शित करता है।
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• {"Financed Loan"}: $125,000 | {"Nominal Rate"}: 8.0% | {"Term"}: 15 Years</div>
          <div>• {"Closing Costs"}: $2,500</div>
          <div>• {"Displayed True APR"}: <strong>8.10% / 8.82%</strong></div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          125,000 $ पर 8.50% ब्याज और 2,500 $ क्लोजिंग लागत के साथ वास्तविक APR 8.82% बनता है।
        </p>
      </section>

      {/* 9. CLOSING COSTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. क्लोजिंग लागत भुगतान विकल्प
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          कैलकुलेटर लागत निपटान के तीन तरीके प्रदान करता है :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">{"Paid Upfront in Cash"}</div>
            <p className="text-slate-600 dark:text-slate-400">1. नकद भुगतान : ऋण राशि प्रभावित किए बिना अलग से भुगतान। 2. ऋण से कटौती : कुल ऋण 125,000 $ रहेगा लेकिन आपको 122,500 $ प्राप्त होंगे। 3. वित्तपोषित : कुल ऋण बढ़कर 127,500 $ और किस्त 1,255.56 $ हो जाएगी।</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">{"Deducted from Proceeds"}</div>
            <p className="text-slate-600 dark:text-slate-400">अपनी नकदी स्थिति के अनुसार सबसे उपयुक्त विकल्प चुनें।</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">{"Financed into Loan"}</div>
            <p className="text-slate-600 dark:text-slate-400">1. नकद भुगतान : ऋण राशि प्रभावित किए बिना अलग से भुगतान। 2. ऋण से कटौती : कुल ऋण 125,000 $ रहेगा लेकिन आपको 122,500 $ प्राप्त होंगे। 3. वित्तपोषित : कुल ऋण बढ़कर 127,500 $ और किस्त 1,255.56 $ हो जाएगी।</p>
          </div>
        </div>
      </section>

      {/* 10. DTI */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. आय-ऋण अनुपात (DTI) और ऋण पात्रता
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ऋणदाता पात्रता जांचने के लिए DTI अनुपात का मूल्यांकन करते हैं :
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"DTI % = [(Housing Payments + Other Debts) / Gross Income] × 100"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          DTI = (कुल आवास लागत + अन्य मासिक ऋण) / कुल मासिक आय। 36% या उससे कम DTI सर्वोत्तम माना जाता है।
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          8,500 $ मासिक आय पर 1,850 $ पहली मॉर्गेज और 500 $ अन्य ऋण होने पर नई किस्त (1,230.94 $) के साथ DTI 42.1% बनता है।
        </p>
      </section>

      {/* 11. CREDIT TIERS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. क्रेडिट स्कोर और सीएलटीवी श्रेणियां
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          क्रेडिट स्कोर आपकी ब्याज दर और सीएलटीवी सीमा निर्धारित करता है :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          740+ स्कोर पर 85%–90% सीएलटीवी, 680–739 पर 80%–85%, और 620–679 पर अधिकतम 80% सीएलटीवी मिलता है।
        </p>
      </section>

      {/* 12. HELOAN VS HELOC */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. होम इक्विटी लोन बनाम हेलॉक (HELOC)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          होम इक्विटी लोन निश्चित ब्याज और स्थिर किस्तों की सुरक्षा देता है।
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Fixed Second Mortgage: $717 - $1,231/mo</div>
          <div>• HELOC (Interest-Only Draw): $578/mo</div>
          <div>• Cash-Out Refinance: $2,296/mo</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          हेलॉक परिवर्तनीय ब्याज के साथ लचीली क्रेडिट लाइन देता है लेकिन ब्याज दर बढ़ने का जोखिम रहता है।
        </p>
      </section>

      {/* 13. HELOAN VS CASH OUT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. होम इक्विटी लोन बनाम कैश-आउट रीफाइनेंस
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          होम इक्विटी लोन आपके पहले ऋण की कम ब्याज दर को सुरक्षित रखता है।
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          रीफाइनेंस आपके पूरे ऋण को वर्तमान बाजार दर पर बदल देता है, जो ब्याज दरें बढ़ने पर महंगा साबित हो सकता है।
        </p>
      </section>

      {/* 14. EXTRA PAYMENTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. अतिरिक्त मूलधन भुगतान और ब्याज बचत
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          नियमित अतिरिक्त भुगतान करने से ऋण की अवधि और कुल ब्याज में भारी कमी आती है।
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Extra Monthly Payment: $100 - $150/month</div>
          <div>• Accelerated Term: 146 - 156 months</div>
          <div>• Time Saved: 24 - 34 months shaved off</div>
          <div>• Lifetime Interest Saved: $16,400 - $19,341</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          125,000 $ के ऋण पर प्रति माह 100 $ अतिरिक्त देने से ऋण 24 महीने पहले समाप्त होता है और 16,400 $ से अधिक ब्याज बचता है।
        </p>
      </section>

      {/* 15. IRS TAX */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          15. कर कटौती अनुमान (कर नियम)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          कर नियमों के अनुसार, ब्याज पर छूट केवल तभी मिलती है जब राशि घर की मरम्मत या निर्माण में उपयोग की गई हो।
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"Tax Savings = Deductible Interest × Marginal Tax Rate"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          व्यक्तिगत खर्चों या अन्य ऋण चुकाने में उपयोग करने पर ब्याज कर-कटौती योग्य नहीं होता।
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          24% कर स्लैब में पहले वर्ष 9,800 $ ब्याज पर लगभग 2,352 $ की कर बचत हो सकती है।
        </p>
      </section>

      {/* 16. RENOVATION ROI */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          16. घर के नवीनीकरण से मूल्य वृद्धि
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          घर के रणनीतिक सुधार संपत्ति के बाजार मूल्य को बढ़ाते हैं।
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Project Cost: $50,000 @ 70% ROI</div>
          <div>• Value Added: $35,000 ($50,000 × 70%)</div>
          <div>• Projected Post-Remodel Value: $535,000</div>
          <div>• Resulting Net Home Equity: $210,000</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          50,000 $ के सुधार पर 70% मूल्य वापसी से घर का मूल्य 35,000 $ बढ़ जाता है।
        </p>
      </section>

      {/* 17. RISKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          17. होम इक्विटी लोन के जोखिम
        </h2>
        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1 text-xs text-slate-700 dark:text-slate-300">
          <div className="font-extrabold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Security Warning & Foreclosure Risk</span>
          </div>
          <p>चूंकि घर जमानत के रूप में होता है, भुगतान में चूक होने पर घर की जब्ती का जोखिम रहता है।</p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          मासिक बजट बनाते समय पहली और दूसरी मॉर्गेज दोनों को ध्यान में रखें।
        </p>
      </section>

      {/* 18. UNDERWATER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          18. नकारात्मक इक्विटी परिदृश्य
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          यदि बाजार मूल्य गिर जाता है और कुल ऋण घर के मूल्य से अधिक हो जाता है, तो संपत्ति नकारात्मक इक्विटी में आ जाती है। किस्तें समान रहती हैं लेकिन बिक्री के लिए अतिरिक्त धन देना पड़ता है।
        </p>
      </section>

      {/* 19. PREPAYMENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          19. पूर्व-भुगतान शुल्क
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          अधिकांश आधुनिक ऋणों में समय पूर्व भुगतान पर कोई जुर्माना नहीं होता, फिर भी अनुबंध की शर्तों की पुष्टि करें।
        </p>
      </section>

      {/* 20. TIMELINES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          20. क्लोजिंग लागत और समय-सीमा
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          लागत आमतौर पर 2% से 5% (1,500 $ से 4,000 $) होती है और स्वीकृति में 2 से 6 सप्ताह लगते हैं।
        </p>
      </section>

      {/* 21. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          21. बचने योग्य सामान्य गलतियाँ
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>कुल इक्विटी को उपलब्ध ऋण सीमा समझ लेना (बैंक 15%–20% सुरक्षा बफर रखते हैं)।</li>
            <li>सीएलटीवी निकालते समय पहले मॉर्गेज का शेष घटाना भूल जाना।</li>
            <li>यह मानना कि 80% सीएलटीवी सभी बैंकों में एक समान होता है।</li>
            <li>अच्छे क्रेडिट स्कोर पर DTI की जांच किए बिना ऋण स्वीकृति मान लेना।</li>
            <li>पहले ऋण के ब्याज दर अंतर को समझे बिना रीफाइनेंस से तुलना करना।</li>
            <li>वास्तविक APR की गणना में क्लोजिंग लागत को अनदेखा करना।</li>
            <li>बिना मरम्मत प्रमाण के सभी ब्याज को कर-मुक्त मान लेना।</li>
            <li>यह सोचना कि सुधार में लगा हर रुपया मकान का मूल्य 100% बढ़ाएगा।</li>
            <li>आपातकालीन कोष बनाए बिना अधिकतम ऋण ले लेना।</li>
            <li>बिना गणना किए वित्तीय निर्णय लेना।</li>
          </ul>
        </div>
      </section>

      {/* 22. CORE FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          22. मुख्य सूत्रों का सारांश
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
          <div>• <strong>अधिकतम अनुमेय कुल ऋण:</strong>  घर का मूल्य × सीएलटीवी सीमा</div>
          <div>• <strong>अधिकतम उपलब्ध इक्विटी:</strong>  max(0, कुल ऋण - पहली मॉर्गेज का शेष)</div>
          <div>• <strong>ऋणोपरांत सीएलटीवी:</strong>  (पहला ऋण + दूसरा ऋण) / घर का मूल्य × 100</div>
          <div>• <strong>सुरक्षित इक्विटी:</strong>  100% - ऋणोपरांत सीएलटीवी</div>
          <div>• <strong>मासिक किस्त:</strong>  P × [r(1+r)^n] / [(1+r)^n - 1]</div>
          <div>• <strong>ऋण-से-आय अनुपात (DTI):</strong>  कुल मासिक ऋण / कुल मासिक आय × 100</div>
          <div>• <strong>अनुमानित कर बचत:</strong>  कटौती योग्य वार्षिक ब्याज × सीमांत कर दर</div>
        </div>
      </section>

      {/* 23. REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>शैक्षणिक मार्गदर्शन एवं विनियामक सूचना</span>
        </div>
        <p>
          होम इक्विटी ऋण उपभोक्ता संरक्षण कानूनों और कर नियमों के अधीन हैं। यह कैलकुलेटर केवल शैक्षणिक और योजना उद्देश्यों के लिए गणितीय सिमुलेशन प्रदान करता है।
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "hi",
  calculatorSlug: "home-equity-loan-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;

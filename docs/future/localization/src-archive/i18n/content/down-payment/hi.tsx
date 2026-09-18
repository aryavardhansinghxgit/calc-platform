"use client";

import React from "react";
import Link from "next/link";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "घर खरीदने के लिए कितना डाउन पेमेंट देना चाहिए?",
    "answer": "यह आपकी बचत पर निर्भर करता है; अधिकांश खरीदार 3% से 20% तक डाउन पेमेंट देते हैं।"
  },
  {
    "question": "क्या 20% डाउन पेमेंट देना अनिवार्य है?",
    "answer": "नहीं, कई सरकारी और मानक योजनाएं 0% से 5% तक के डाउन पेमेंट की अनुमति देती हैं।"
  },
  {
    "question": "डाउन पेमेंट से मासिक किस्त पर क्या असर पड़ता है?",
    "answer": "अधिक डाउन पेमेंट से ऋण राशि और कुल ब्याज घटता है तथा PMI बीमा हट जाता है।"
  },
  {
    "question": "प्राइवेट मॉर्गेज इंश्योरेंस (PMI) क्या है?",
    "answer": "20% से कम डाउन पेमेंट पर बैंक की सुरक्षा के लिए यह बीमा अनिवार्य होता है।"
  },
  {
    "question": "क्लोजिंग लागत के लिए कितनी अतिरिक्त नकदी चाहिए?",
    "answer": "पंजीकरण और कानूनी शुल्कों के लिए 2% से 5% अतिरिक्त राशि रखनी चाहिए।"
  },
  {
    "question": "क्या 0% डाउन पेमेंट पर घर खरीदा जा सकता है?",
    "answer": "हाँ, VA और USDA जैसे विशेष सरकारी कार्यक्रमों के माध्यम से।"
  },
  {
    "question": "3%, 5%, 10% या 20% में क्या अंतर है?",
    "answer": "कम डाउन पेमेंट से मासिक किस्त बढ़ती है लेकिन आपातकालीन नकदी सुरक्षित रहती है।"
  },
  {
    "question": "क्या अधिक डाउन पेमेंट देना बेहतर है या निवेश करना?",
    "answer": "ऋण ब्याज दर की तुलना अपने निवेश पर मिलने वाले रिटर्न से करें।"
  },
  {
    "question": "PMI कब समाप्त होता है?",
    "answer": "80% LTV पर अनुरोध द्वारा या 78% LTV पर स्वचालित रूप से समाप्त होता है।"
  },
  {
    "question": "ऋण-से-मूल्य (LTV) क्या है?",
    "answer": "घर के मूल्य की तुलना में लिए गए ऋण का प्रतिशत।"
  },
  {
    "question": "क्या उपहार राशि का उपयोग डाउन पेमेंट में हो सकता है?",
    "answer": "हाँ, परिवार द्वारा दिए गए उपहार प्रमाण पत्र के साथ स्वीकार्य हैं।"
  },
  {
    "question": "डाउन पेमेंट बचाने में कितना समय लगता है?",
    "answer": "यह आपकी मासिक बचत और घर के लक्ष्य मूल्य पर निर्भर करता है।"
  }
];

export const seo = {
  title: "डाउन पेमेंट कैलकुलेटर (Down Payment Calculator) — कन्वेंशनल 97",
  description: "घर खरीदने हेतु आवश्यक डाउन पेमेंट, 3%, 5%, 10% और 20% पर किस्तों की तुलना, PMI बीमा समाप्ति और क्लोजिंग लागत की गणना करें।",
  keywords: ["डाउन पेमेंट कैलकुलेटर","गृह अग्रिम भुगतान","पीएमआई कैलकुलेटर","घर की शुरुआती किस्त"]
};

export const ContentComponent = function DownPaymentContentHI() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* H1 Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          डाउन पेमेंट कैलकुलेटर (Down Payment Calculator)
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          घर की खरीद हेतु आवश्यक अग्रिम भुगतान, विभिन्न ऋण कार्यक्रमों की न्यूनतम शर्तें, 78% LTV पर PMI समाप्ति और क्लोजिंग लागत का विस्तृत विश्लेषण।
        </p>
      </div>

      {/* SECTION 1: WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. डाउन पेमेंट क्या है और यह कैसे काम करता है?
        </h2>
        <p className="text-sm leading-relaxed">
          डाउन पेमेंट घर खरीदते समय खरीदार द्वारा नकद दी जाने वाली शुरुआती राशि है। शेष राशि को बैंक से मॉर्गेज लोन के रूप में लिया जाता है। डाउन पेमेंट आपकी इक्विटी और LTV अनुपात को निर्धारित करता है।
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans text-center">डाउन पेमेंट के मुख्य गणितीय सूत्र</div>
          
          <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 space-y-2">
            <div><strong>1. डाउन पेमेंट राशि ($) :</strong></div>
            <div className="text-center font-mono">{"डाउन पेमेंट = खरीद मूल्य (P) × (डाउन % / 100)"}</div>
            
            <div className="pt-2"><strong>2. वित्तपोषित ऋण राशि ($) :</strong></div>
            <div className="text-center font-mono">{"ऋण राशि = खरीद मूल्य - डाउन पेमेंट"}</div>

            <div className="pt-2"><strong>3. क्लोजिंग पर कुल आवश्यक नकदी ($) :</strong></div>
            <div className="text-center font-mono">{"कुल नकदी = डाउन पेमेंट + क्लोजिंग लागत (2% - 5%)"}</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW MUCH */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. आपको वास्तव में कितने डाउन पेमेंट की आवश्यकता है?
        </h2>
        <p className="text-sm leading-relaxed">
          न्यूनतम डाउन पेमेंट ऋण कार्यक्रम के नियमों पर निर्भर करता है :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">0% डाउन पेमेंट</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              सैन्य कर्मियों के लिए VA ऋण और ग्रामीण क्षेत्रों के लिए USDA ऋण में उपलब्ध।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">3% – 3.5% डाउन पेमेंट</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              कन्वेंशनल 97 में 3% (स्कोर 620+) और FHA ऋणों में 3.5% (स्कोर 580+) आवश्यक है।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">20% डाउन पेमेंट</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              PMI बीमा समाप्त करने और ब्याज लागत को न्यूनतम रखने का मानक स्तर।
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: 20% MYTH */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. 20% डाउन पेमेंट का मिथक बनाम वास्तविकता
        </h2>
        <p className="text-sm leading-relaxed">
          20% देने से PMI हटता है, लेकिन बचत करने में लगने वाले वर्षों में मकान की कीमतें बढ़ सकती हैं :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
            <h3 className="font-extrabold text-emerald-700 dark:text-emerald-400 text-sm">20% डाउन पेमेंट के लाभ</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 font-normal">
              <li>PMI हटने से प्रति माह 100 $ से 300 $ की तुरंत बचत।</li>
              <li>मासिक मूलधन और ब्याज की काफी कम किस्त।</li>
              <li>ऋण अवधि के दौरान कुल ब्याज में भारी कमी।</li>
              <li>विक्रेता के सामने मजबूत और प्रतिस्पर्धी खरीद प्रस्ताव।</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
            <h3 className="font-extrabold text-amber-700 dark:text-amber-400 text-sm">नुकसान और अवसर लागत</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 font-normal">
              <li>आपातकालीन नकदी फंड का समाप्त हो जाना।</li>
              <li>बचत करने के दौरान घर की कीमतें बढ़ने का जोखिम।</li>
              <li>अन्य लाभदायक निवेशों में पूंजी न लगा पाने की अवसर लागत।</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. ऋण कार्यक्रम और न्यूनतम डाउन पेमेंट आवश्यकताएं
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">ऋण कार्यक्रम</th>
                <th className="p-3">न्यूनतम डाउन %</th>
                <th className="p-3">न्यूनतम स्कोर</th>
                <th className="p-3">PMI बीमा नियम</th>
                <th className="p-3 rounded-tr-xl">अग्रिम शुल्क</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"कन्वेंशनल 97"}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{"3.0%"}</td>
                <td className="p-3">{"620"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"78%–80% LTV पर समाप्त"}</td>
                <td className="p-3 text-amber-600">{"0 $"}</td>
              </tr>
              
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">{"FHA ऋण"}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{"3.5%"}</td>
                <td className="p-3">{"580"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"संपूर्ण ऋण अवधि (<10% डाउन)"}</td>
                <td className="p-3 text-amber-600">{"1.75% UFMIP"}</td>
              </tr>
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"VA ऋण (सैनिक)"}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{"0.0%"}</td>
                <td className="p-3">{"580+"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"0 $ मासिक PMI लाभ"}</td>
                <td className="p-3 text-amber-600">{"1.4%–2.15% फंडिंग शुल्क"}</td>
              </tr>
              
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">{"USDA ग्रामीण"}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{"0.0%"}</td>
                <td className="p-3">{"640"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"0.35% वार्षिक गारंटी"}</td>
                <td className="p-3 text-amber-600">{"1.0% गारंटी शुल्क"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 5: PMI REMOVAL */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. प्राइवेट मॉर्गेज इंश्योरेंस (PMI) समाप्ति नियम (80% बनाम 78% LTV)
        </h2>
        <p className="text-sm leading-relaxed">
          गृहस्वामी संरक्षण कानून (HPA 1998) के अनुसार PMI समाप्ति के नियम :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">80% LTV पर खरीदार द्वारा रद्दीकरण अनुरोध</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              ऋण शेष मूल मूल्य के 80% पर आने पर आप लिखित अनुरोध करके PMI हटा सकते हैं।
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">78% LTV पर बैंक द्वारा स्वचालित समाप्ति</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              परिशोधन तालिका अनुसार 78% पर पहुँचते ही बैंक द्वारा PMI हटाना कानूनी रूप से अनिवार्य है।
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: ASSISTANCE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. डाउन पेमेंट सहायता कार्यक्रम (DPA)
        </h2>
        <p className="text-sm leading-relaxed">
          पात्र खरीदारों के लिए विभिन्न सरकारी सहायता योजनाएं उपलब्ध हैं :
        </p>
        <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1 font-medium">
          <li>अनुदान (Grants) : गैर-वापसी योग्य सहायता राशि।</li>
          <li>माफ योग्य दूसरे ऋण : 3 से 5 वर्ष रहने पर माफ होने वाले 0% ऋण।</li>
          <li>आस्थगित भुगतान ऋण : घर बेचने पर चुकाए जाने वाले 0% ऋण।</li>
        </ul>
      </section>

      {/* SECTION 7: SUMMARY */}
      <section className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2 text-xs">
        <h2 className="font-extrabold text-sm text-blue-700 dark:text-blue-300">
          7. शैक्षणिक सारांश
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          डाउन पेमेंट, PMI और क्लोजिंग लागत के संतुलन को समझकर सही वित्तीय रणनीति अपनाएं।
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "hi",
  calculatorSlug: "down-payment-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;

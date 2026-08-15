"use client";

import React, { useState } from "react";
import { ChevronDown, BookOpen, HelpCircle, ShieldCheck, Activity, Scale, Target, Award, AlertTriangle, Sparkles } from "lucide-react";

export function BodyFatContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is Body Fat Percentage and why is it more accurate than BMI?",
      a: "Body Fat Percentage (BFP) measures the proportion of total body mass composed purely of adipose fat tissue versus lean tissue (muscle, bone, organs, water). Body Mass Index (BMI) only evaluates total weight relative to height and frequently misclassifies athletic individuals with high muscularity as 'overweight' or 'obese'."
    },
    {
      q: "How does the U.S. Navy Body Fat Method work?",
      a: "Developed at the Naval Health Research Center by Hodgdon & Beckett (1984), the U.S. Navy method uses logarithmic equations based on anatomical tape measurements (neck, waist, and hip for females; neck and waist for males) alongside height. It correlates within 3% to 4% accuracy compared to hydrostatic weighing."
    },
    {
      q: "Where exactly should I measure my waist, neck, and hips?",
      a: "Measure neck circumference horizontally just below the larynx (Adam's apple). For males, measure waist circumference horizontally at the navel (belly button). For females, measure waist circumference at the narrowest point between ribs and hips, and hip circumference at the widest horizontal span of the buttocks."
    },
    {
      q: "What is the difference between Subcutaneous Fat and Visceral Fat?",
      a: "Subcutaneous fat resides directly beneath the skin and serves as insulation and energy storage. Visceral fat surrounds internal abdominal organs (liver, pancreas, kidneys); high visceral fat is strongly linked to insulin resistance, metabolic syndrome, and systemic inflammation."
    },
    {
      q: "What is essential body fat?",
      a: "Essential body fat is the minimum percentage of adipose tissue required for biological survival, cellular membrane structure, organ padding, and reproductive hormone synthesis. Essential fat is 2% to 5% for men and 10% to 13% for women."
    },
    {
      q: "What is Fat-Free Mass Index (FFMI)?",
      a: "FFMI evaluates lean body mass relative to height, independent of fat percentage. An FFMI above 22 for men or 18 for women indicates superior muscular development; natural muscular ceilings generally top out around 25 for men without anabolic supplementation."
    },
    {
      q: "How does body fat percentage change with age?",
      a: "Adipose distribution naturally shifts inward toward the abdomen with advancing age due to gradual declines in growth hormone, testosterone, and estrogen, alongside age-related muscle loss (sarcopenia). Consequently, healthy reference ranges increase slightly with age."
    },
    {
      q: "Why do women require a higher body fat percentage than men?",
      a: "Women naturally possess higher essential body fat (10-13% vs 2-5%) to support reproductive biology, endocrine function, mammary tissue, and fetal development."
    },
    {
      q: "How accurate is the U.S. Navy tape measure method compared to DEXA scans?",
      a: "DEXA (Dual-Energy X-ray Absorptiometry) is the gold standard (±1.5% accuracy). The U.S. Navy method provides ±3% to 4% accuracy, which is highly reliable for tracking relative changes over time when measurements are taken consistently."
    },
    {
      q: "Can you spot-reduce fat from specific body areas like the stomach?",
      a: "No. Fat loss occurs systemically across the entire body in response to a sustained caloric deficit, governed by genetics and hormone receptor density. Abdominal fat is often the last to leave in men, while hip/thigh fat is often the last in women."
    },
    {
      q: "What is the recommended rate of safe fat loss per week?",
      a: "The recommended clinical rate is 0.5 to 2.0 pounds (0.25 to 0.9 kg) of body fat per week, corresponding to a daily deficit of 250 to 1,000 calories. Faster loss increases muscle wasting."
    },
    {
      q: "Why does my body fat percentage fluctuate during the day?",
      a: "Hydration levels, GI tract food content, sodium intake, and muscle glycogen storage cause temporary weight and circumference fluctuations. Always take measurements in the morning before eating or drinking."
    },
    {
      q: "What body fat percentage is required to see visible abs?",
      a: "For men, abdominal muscle definition usually becomes visible around 10% to 12% BFP. For women, visible abs typically emerge around 16% to 19% BFP."
    },
    {
      q: "What are the health risks of extremely low body fat (<5% for men, <12% for women)?",
      a: "Dropping below essential fat thresholds triggers severe endocrine disruption, hypothalamic amenorrhea in females, testosterone suppression in males, chronic fatigue, compromised immunity, and bradycardia."
    },
    {
      q: "How does resistance training impact body fat percentage?",
      a: "Progressive resistance training stimulates muscle protein synthesis, preserving lean muscle mass during fat loss and elevating baseline resting energy expenditure."
    },
    {
      q: "What is the Deurenberg BMI body fat equation?",
      a: "The Deurenberg equation estimates body fat from BMI, age, and sex: BFP = 1.20 × BMI + 0.23 × Age - 16.2 (for adult men). It is useful when circumference tape measurements are unavailable."
    },
    {
      q: "How should tape tension be applied during measurement?",
      a: "Pull the tape snug against the skin surface so it rests flat without compressing or indenting soft subcutaneous tissue."
    },
    {
      q: "What is the Jackson & Pollock ideal body fat standard?",
      a: "Jackson & Pollock established age-stratified norms based on skinfold research, accounting for natural metabolic shifts between age 20 and 55+."
    },
    {
      q: "How often should I re-measure my body fat percentage?",
      a: "Re-measure every 2 to 4 weeks under identical morning baseline conditions to evaluate real trend progress while ignoring minor daily water weight fluctuations."
    },
    {
      q: "What is body recomposition?",
      a: "Body recomposition refers to simultaneously building lean muscle tissue while reducing adipose body fat, typically achieved by high protein intake and resistance training near caloric maintenance."
    }
  ];

  return (
    <article className="mt-12 space-y-10 text-zinc-800 dark:text-zinc-200">
      {/* 1. Introduction */}
      <section className="space-y-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400">
          <Activity className="w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            Comprehensive Clinical Guide to Body Fat Percentage &amp; Composition Analysis
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Body Fat Percentage (BFP) is the premier physiological metric for evaluating metabolic health, athletic performance, and physical fitness. Unlike standard Body Mass Index (BMI)—which simply compares total scale weight against height—body fat percentage isolates adipose fat mass from lean body mass (muscles, bones, organs, and body water). This guide details the science, mathematical formulas, tape measurement techniques, and health standards established by the U.S. Navy and the American Council on Exercise (ACE).
        </p>
      </section>

      {/* 2. Subcutaneous vs Visceral Fat */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          1. Biological Adipose Tissue: Subcutaneous vs. Visceral Fat
        </h3>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Human body fat is stored in two distinct physiological depots:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-sky-50 dark:bg-sky-950/30 rounded-xl border border-sky-200 dark:border-sky-800">
            <strong className="text-sky-900 dark:text-sky-200 font-bold block text-sm">Subcutaneous Fat</strong>
            <p className="text-sky-700 dark:text-sky-300 mt-1">Located directly beneath the dermis. Functions as thermal insulation, physical shock absorption, and long-term energy storage. Measured by tape circumferences and skinfold calipers.</p>
          </div>
          <div className="p-4 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-800">
            <strong className="text-rose-900 dark:text-rose-200 font-bold block text-sm">Visceral Fat</strong>
            <p className="text-rose-700 dark:text-rose-300 mt-1">Stored deep within the abdominal cavity around vital organs (liver, pancreas, intestines). Metabolically active adipose tissue associated with arterial plaque and type 2 diabetes.</p>
          </div>
        </div>
      </section>

      {/* 3. Formulas */}
      <section className="space-y-4 p-5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          2. Mathematical Formulas: U.S. Navy &amp; BMI Equations
        </h3>
        <div className="space-y-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">A. U.S. Navy Method Equations (Hodgdon &amp; Beckett 1984)</h4>
            <p>Calculates BFP from anatomical tape circumferences (in inches):</p>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-emerald-700 dark:text-emerald-400">
              Male: BFP = 86.010 × log10(Waist - Neck) - 70.041 × log10(Height) + 36.76<br/>
              Female: BFP = 163.205 × log10(Waist + Hip - Neck) - 97.684 × log10(Height) - 78.387
            </code>
          </div>

          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">B. Deurenberg BMI Body Fat Formula</h4>
            <p>Estimates BFP when tape measurements are unavailable:</p>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-sky-700 dark:text-sky-400">
              Adult Male: BFP = (1.20 × BMI) + (0.23 × Age) - 16.2<br/>
              Adult Female: BFP = (1.20 × BMI) + (0.23 × Age) - 5.4
            </code>
          </div>
        </div>
      </section>

      {/* 4. 20 Clinical FAQs Accordion */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-xl">
          <HelpCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          <h3>Frequently Asked Questions</h3>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left font-semibold text-sm text-zinc-900 dark:text-zinc-100 flex justify-between items-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform text-zinc-500 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}

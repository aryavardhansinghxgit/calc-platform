"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Activity, HeartPulse, Scale, ShieldCheck } from "lucide-react";

export function HealthyWeightContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is considered a healthy weight?",
      a: "A healthy weight is a body weight that minimizes long-term metabolic health risks and promotes physical well-being. Epidemiologically, it is defined as a body weight resulting in a Body Mass Index (BMI) between 18.5 and 24.9 kg/m²."
    },
    {
      q: "How is a healthy weight range calculated?",
      a: "Healthy weight range is calculated by multiplying the square of your height in meters (m²) by the lower (18.5) and upper (24.9) WHO BMI thresholds. For example, a person 1.75 meters tall has a healthy range of 18.5 × (1.75)² = 56.7 kg to 24.9 × (1.75)² = 76.3 kg."
    },
    {
      q: "What is the difference between Healthy Weight and Ideal Body Weight (IBW)?",
      a: "Healthy Weight is a statistical spectrum (BMI 18.5–24.9) representing a broad zone of minimal mortality risk. Ideal Body Weight (IBW) refers to specific mathematical point estimates (such as Devine, Hamwi, or Miller formulas) developed for clinical drug clearance."
    },
    {
      q: "Why do different formulas give different ideal weight estimates?",
      a: "Each formula was derived from distinct clinical population studies: Hamwi (1964) focused on diabetic pharmacology, Devine (1974) on renal drug clearance, Robinson (1983) on life insurance tables, and Peterson (2016) on non-linear height scaling."
    },
    {
      q: "How does body frame size affect healthy weight?",
      a: "Individuals with larger bone structures and wider wrist circumferences naturally carry heavier skeletal mass. Clinical guidelines adjust healthy weight estimates by -10% for small frames and +10% for large frames."
    },
    {
      q: "What is BMI Prime?",
      a: "BMI Prime is the ratio of your actual BMI to the upper limit of normal BMI (25.0). A BMI Prime of 1.00 represents 25.0 BMI. Values below 0.74 indicate underweight, 0.74–0.99 normal, and ≥1.00 overweight."
    },
    {
      q: "Why can athletic people be classified as overweight by BMI?",
      a: "BMI cannot distinguish between skeletal muscle mass and visceral fat mass. Muscular athletes often have high body weight relative to height, yielding an elevated BMI (>25) despite very low body fat percentage."
    },
    {
      q: "What are the health risks of being below healthy weight (BMI < 18.5)?",
      a: "Being underweight increases risk of osteopenia/osteoporosis, impaired immune function, muscle atrophy, nutrient deficiencies, hormonal imbalances, and increased mortality during acute illnesses."
    },
    {
      q: "What are the health risks of being above healthy weight (BMI ≥ 25)?",
      a: "Carrying excess adipose tissue elevates risk of Type 2 diabetes, essential hypertension, coronary artery disease, osteoarthritis, obstructive sleep apnea, fatty liver disease, and several cancers."
    },
    {
      q: "Does healthy weight change with age?",
      a: "While WHO BMI thresholds remain constant across adult ages 18–65, clinical evidence suggests that older adults (age >65) benefit from slightly higher BMI ranges (23.0–27.0) to protect against frailty and sarcopenia."
    },
    {
      q: "How does gender impact healthy weight calculations?",
      a: "Women naturally carry 8–12% higher essential body fat for reproductive physiology. Ideal body weight formulas account for this by establishing lower base weights for women at 5 feet of height (45.5 kg female vs 50.0 kg male)."
    },
    {
      q: "What is the safest rate of weight loss to reach a healthy weight?",
      a: "A safe and sustainable rate of weight loss is 1 to 2 pounds (0.5 to 1.0 kg) per week, requiring a daily caloric deficit of 500 to 1,000 calories paired with protein intake to preserve lean muscle."
    },
    {
      q: "What is the Devine Formula and why is it used in hospitals?",
      a: "Developed by Dr. B.J. Devine in 1974, the Devine formula is the standard clinical benchmark used by pharmacologists to calculate dosage for water-soluble medications and renal clearance drugs."
    },
    {
      q: "How does waist circumference relate to healthy weight?",
      a: "Waist-to-height ratio (WHtR) supplements healthy weight calculations. Maintaining a waist circumference less than half your height (WHtR < 0.50) strongly correlates with low abdominal visceral fat."
    },
    {
      q: "Can you be healthy at a higher weight if you exercise regularly?",
      a: "Cardiorespiratory fitness significantly reduces cardiovascular risk even in individuals with elevated BMI (metabolically healthy overweight). However, long-term joint strain and metabolic risk remain lower within healthy weight bounds."
    },
    {
      q: "How does pregnancy alter healthy weight recommendations?",
      a: "Pregnant women should not use standard healthy weight calculators. Weight gain during pregnancy is clinically managed based on pre-pregnancy BMI (typically 25–35 lbs for normal weight, 15–25 lbs for overweight)."
    },
    {
      q: "What dietary approach best supports maintaining a healthy weight?",
      a: "Focus on nutrient-dense whole foods: high dietary protein (1.6g/kg), fiber-rich vegetables, whole grains, and healthy fats while minimizing ultra-processed foods and refined sugars."
    },
    {
      q: "What role does resistance training play in healthy weight management?",
      a: "Resistance training stimulates muscle protein synthesis, increases resting metabolic rate (BMR), prevents muscle loss during caloric deficits, and improves insulin sensitivity."
    },
    {
      q: "What is the Peterson Formula (2016)?",
      a: "Published in 2016 by Dr. Peterson et al., this modern formula calculates ideal weight using a baseline target BMI of 22.0 kg/m² with non-linear height scaling, correcting bias in older formulas for very tall or short individuals."
    },
    {
      q: "How often should I measure my weight when working toward a healthy target?",
      a: "Measure weight 1 to 2 times weekly under consistent conditions (morning after waking, before eating, after using the restroom). Focus on multi-week average trends rather than daily fluid fluctuations."
    },
    {
      q: "Why is scale weight alone incomplete for tracking health?",
      a: "Scale weight measures gross mass (fat, muscle, water, bone). Body composition changes—such as gaining 3 lbs of muscle while losing 3 lbs of fat—leave scale weight unchanged despite significant health gains."
    },
    {
      q: "What is the difference between visceral fat and subcutaneous fat?",
      a: "Subcutaneous fat lies beneath the skin, while visceral fat surrounds internal organs in the abdominal cavity. Visceral fat is metabolically active and directly linked to insulin resistance and cardiovascular disease."
    },
    {
      q: "How does sleep deprivation affect healthy weight management?",
      a: "Insufficient sleep (<7 hours) elevates ghrelin (hunger hormone), suppresses leptin (satiety hormone), increases cortisol, and impairs glucose tolerance, promoting appetite and fat storage."
    },
    {
      q: "What is the Hamwi formula base calculation?",
      a: "The Hamwi formula starts at 48.0 kg for men and 45.5 kg for women at 5 feet tall, adding 2.7 kg (male) or 2.2 kg (female) for each additional inch above 5 feet."
    },
    {
      q: "When should I consult a doctor regarding my weight?",
      a: "Consult a healthcare provider if your BMI is under 18.5 or over 30, if you experience sudden unexplained weight changes, or if you plan to start a calorie restriction program."
    }
  ];

  return (
    <article className="mt-12 space-y-10 text-zinc-800 dark:text-zinc-200">
      {/* 1. Introduction */}
      <section className="space-y-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
          <HeartPulse className="w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            Comprehensive Clinical Guide to Healthy Weight, BMI &amp; Ideal Body Composition
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Achieving and maintaining a healthy body weight is one of the most effective strategies for long-term health, cardiovascular protection, and metabolic longevity. Rather than relying on rigid single-number weight targets, clinical medicine defines healthy weight as a range of body mass that optimizes organ function, minimizes chronic disease risk, and balances skeletal load.
        </p>
      </section>

      {/* 2. Clinical Formulas */}
      <section className="space-y-4 p-5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          1. Mathematical Formulas for Healthy Weight &amp; Ideal Body Weight (IBW)
        </h3>
        <div className="space-y-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">A. WHO Healthy BMI Range (BMI 18.5 – 24.9)</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-mono text-emerald-700 dark:text-emerald-400">
              Min Weight (kg) = 18.5 × Height(m)²<br/>
              Max Weight (kg) = 24.9 × Height(m)²<br/>
              Target Weight (kg) = 21.7 × Height(m)²
            </code>
          </div>

          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">B. Devine Clinical Formula (1974)</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-mono text-blue-700 dark:text-blue-400">
              Male IBW (kg) = 50.0 + 2.3 × (Height(in) - 60)<br/>
              Female IBW (kg) = 45.5 + 2.3 × (Height(in) - 60)
            </code>
          </div>
        </div>
      </section>

      {/* 3. 25 Clinical FAQs Accordion */}
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

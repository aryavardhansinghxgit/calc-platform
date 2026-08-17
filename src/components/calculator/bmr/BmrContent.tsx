"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Activity, Scale, Flame, Award, BookOpen, ShieldCheck, HeartPulse } from "lucide-react";

export function BmrContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is Basal Metabolic Rate (BMR)?",
      a: "Basal Metabolic Rate (BMR) represents the absolute minimum number of calories your body burns at complete rest in 24 hours to maintain essential life-sustaining biological functions including brain activity, breathing, blood circulation, cellular ion transport, body temperature regulation, and liver detoxification."
    },
    {
      q: "What is the difference between BMR and TDEE?",
      a: "BMR is your baseline resting burn assuming zero physical movement or digestive activity (lying motionless in bed for 24 hours after a 12-hour fast). Total Daily Energy Expenditure (TDEE) adds all physical activity, exercise, non-exercise movement (NEAT), and the thermic effect of food (TEF) on top of BMR."
    },
    {
      q: "What is the difference between BMR and RMR (Resting Metabolic Rate)?",
      a: "BMR is measured under strict laboratory conditions (awake in a thermoneutral room immediately upon waking after 12 hours of fasting and 8 hours of sleep). RMR is measured under less restrictive conditions without fasting, making RMR typically 5% to 10% higher than true BMR."
    },
    {
      q: "Which BMR formula is the most accurate?",
      a: "The Mifflin-St Jeor formula (1990) is clinically regarded as the gold standard for healthy adults, estimating true BMR within ±5%. However, for highly muscular individuals or athletes with known body fat percentage, the Katch-McArdle formula is superior because it directly calculates BMR from Lean Body Mass."
    },
    {
      q: "Can eating under your BMR damage your metabolism?",
      a: "Severe, prolonged caloric restriction below BMR triggers adaptive thermogenesis (commonly called 'starvation mode'). Your body reduces thyroid hormone production (T3), downregulates spontaneous movement (NEAT), and breaks down muscle tissue to lower energy expenditure."
    },
    {
      q: "Why does muscle burn more calories than fat at rest?",
      a: "Skeletal muscle is metabolically active tissue, burning approximately 6 kcal per pound (13 kcal/kg) per day at complete rest, compared to adipose fat tissue which burns roughly 2 kcal per pound (4.5 kcal/kg) per day."
    },
    {
      q: "How does age affect BMR?",
      a: "BMR declines by approximately 1% to 2% per decade after age 20. This decline is largely caused by age-related muscle mass loss (sarcopenia), decreases in growth hormone, and reduced mitochondrial efficiency."
    },
    {
      q: "Why do men generally have a higher BMR than women?",
      a: "Men naturally possess higher average skeletal muscle mass, greater bone density, larger organ mass, and higher circulating testosterone, whereas women naturally carry higher essential adipose tissue for reproductive health."
    },
    {
      q: "How does caffeine impact BMR?",
      a: "Caffeine stimulates the sympathetic nervous system and triggers lipolysis, temporarily increasing resting energy expenditure by 3% to 11% for 3 to 4 hours post-ingestion."
    },
    {
      q: "What is the Thermic Effect of Food (TEF)?",
      a: "TEF is the metabolic energy required to digest, absorb, transport, and metabolize nutrients. Dietary protein has the highest TEF (20-30% of consumed calories burned during digestion), compared to carbohydrates (5-10%) and fats (0-3%)."
    },
    {
      q: "How many calories should I eat to lose 1 pound of fat per week?",
      a: "One pound of body fat contains approximately 3,500 calories. To lose 1 pound of fat per week, establish a daily deficit of 500 calories below your calculated TDEE."
    },
    {
      q: "Can I increase my BMR permanently?",
      a: "Yes. The most effective way to permanently elevate BMR is through progressive resistance training to build lean skeletal muscle mass, alongside adequate protein intake and thyroid health."
    },
    {
      q: "How does body fat percentage change Katch-McArdle BMR calculations?",
      a: "Katch-McArdle ignores total weight and calculates BMR strictly from Lean Body Mass (LBM = Weight × (1 - BFP/100)). This prevents overestimating BMR in overweight individuals or underestimating BMR in lean athletes."
    },
    {
      q: "What is Non-Exercise Activity Thermogenesis (NEAT)?",
      a: "NEAT encompasses all energy expended for daily movement outside of structured exercise and sleeping, such as walking, fidgeting, standing, cooking, and typing. NEAT can vary by up to 800 kcal/day between individuals."
    },
    {
      q: "Does cold weather increase BMR?",
      a: "Yes. Exposure to cold environments stimulates brown adipose tissue (BAT) thermogenesis and involuntary shivering to maintain core body temperature (37°C), temporarily raising resting energy expenditure."
    },
    {
      q: "How does pregnancy impact BMR?",
      a: "Pregnancy increases BMR by 15% to 25% during the second and third trimesters to support fetal tissue synthesis, placental development, and elevated maternal cardiac workload."
    },
    {
      q: "What organ burns the most calories at rest?",
      a: "The liver is the single most metabolically active organ at rest, accounting for ~27% of total BMR, followed by the brain (~19%), skeletal muscle (~18%), kidneys (~10%), and heart (~7%)."
    },
    {
      q: "How accurate are online BMR calculators compared to indirect calorimetry?",
      a: "Online BMR equations provide an estimated baseline with 85% to 90% accuracy for standard populations. Indirect calorimetry (measuring O2 consumption and CO2 production) provides exact laboratory precision."
    },
    {
      q: "What is the recommended protein intake during a caloric deficit?",
      a: "During a caloric deficit, consuming 0.8 to 1.2 grams of protein per pound of body weight (1.8 to 2.6 g/kg) maximizes muscle protein synthesis and protects lean mass."
    },
    {
      q: "Why does weight loss slow down after a few weeks?",
      a: "As body weight decreases, your BMR and TDEE naturally decrease because carrying a lighter body requires less energy. Additionally, adaptive thermogenesis slightly reduces NEAT."
    }
  ];

  return (
    <article className="mt-12 space-y-10 text-zinc-800 dark:text-zinc-200">
      {/* 1. Introduction */}
      <section className="space-y-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400">
          <Activity className="w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400">
            Comprehensive Clinical Guide to Basal Metabolic Rate (BMR) &amp; Human Energy Expenditure
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-900 dark:text-zinc-300">
          Basal Metabolic Rate (BMR) is the foundational physiological metric governing human energy balance. It quantifies the minimum number of kilocalories your body consumes at complete rest over a 24-hour period to maintain vital organ function, cellular homeostasis, ion gradient maintenance, and biological synthesis. Understanding your exact BMR and Total Daily Energy Expenditure (TDEE) is essential for precision nutrition, weight loss, athletic conditioning, and body recomposition.
        </p>
      </section>

      {/* 2. Organ Burn Distribution */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">1. Biological Energy Partitioning: Where Do BMR Calories Go?
        </h3>
        <p className="text-sm leading-relaxed text-slate-900 dark:text-zinc-300">
          Contrary to popular belief, skeletal muscle does not dominate resting energy burn. Internal organs account for over 60% of total resting metabolic rate despite comprising less than 10% of total body mass:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-blue-50 dark:bg-blue-50/30 rounded-xl border border-rose-200 dark:border-rose-800">
            <strong className="text-rose-900 dark:text-rose-200 font-bold block text-sm">Liver (27% of BMR)</strong>
            <p className="text-blue-600 dark:text-blue-400 mt-1">Continuous gluconeogenesis, protein synthesis, cholesterol assembly, and metabolic toxin clearance.</p>
          </div>
          <div className="p-3.5 bg-blue-50 dark:bg-blue-50/30 rounded-xl border border-sky-200 dark:border-sky-800">
            <strong className="text-sky-900 dark:text-sky-200 font-bold block text-sm">Brain (19% of BMR)</strong>
            <p className="text-blue-600 dark:text-blue-400 mt-1">Uninterrupted glucose oxidation and Na+/K+-ATPase pump activity supporting neuronal membrane potentials.</p>
          </div>
          <div className="p-3.5 bg-blue-50 dark:bg-blue-50/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <strong className="text-emerald-900 dark:text-emerald-200 font-bold block text-sm">Muscle &amp; Kidneys (28% of BMR)</strong>
            <p className="text-blue-600 dark:text-blue-400 mt-1">Renal ion transport (10%) and skeletal muscle resting protein turnover (18%).</p>
          </div>
        </div>
      </section>

      {/* 3. Mathematical Formulas */}
      <section className="space-y-4 p-5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          2. Mathematical Formulations: Mifflin-St Jeor, Harris-Benedict &amp; Katch-McArdle
        </h3>
        <div className="space-y-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">A. Mifflin-St Jeor Equation (1990) — Clinical Benchmark</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 dark:text-blue-400">
              Male: BMR = (10 × W_kg) + (6.25 × H_cm) - (5 × Age) + 5<br/>
              Female: BMR = (10 × W_kg) + (6.25 × H_cm) - (5 × Age) - 161
            </code>
          </div>

          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">B. Revised Harris-Benedict Equation (Roza &amp; Shizgal 1984)</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 dark:text-blue-400">
              Male: BMR = 88.362 + (13.397 × W_kg) + (4.799 × H_cm) - (5.677 × Age)<br/>
              Female: BMR = 447.593 + (9.247 × W_kg) + (3.098 × H_cm) - (4.330 × Age)
            </code>
          </div>

          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">C. Katch-McArdle Equation (Lean Mass Based)</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 dark:text-blue-400">
              BMR = 370 + (21.6 × Lean Body Mass in kg)
            </code>
          </div>
        </div>
      </section>

      {/* 4. 20 Clinical FAQs Accordion */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-xl">
          <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
                  <ChevronDown className={`w-4 h-4 transition-transform text-slate-900 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-900 dark:text-zinc-300 leading-relaxed  dark:border-zinc-800">
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

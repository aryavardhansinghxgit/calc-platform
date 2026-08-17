"use client";

import React, { useState } from "react";
import { ChevronDown, BookOpen, HelpCircle, CheckCircle2, AlertTriangle, ShieldCheck, Flame, Scale, Target, Sparkles } from "lucide-react";

export function CalorieContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is a Calorie and how is it measured?",
      a: "A calorie (kcal or kilocalorie) is the amount of heat energy required to raise the temperature of 1 kilogram of water by 1 degree Celsius. In human nutrition, calories represent the potential energy contained within carbohydrates, proteins, fats, and alcohol that the body utilizes for metabolism, respiration, circulation, and physical activity."
    },
    {
      q: "What is Basal Metabolic Rate (BMR)?",
      a: "Basal Metabolic Rate (BMR) represents the minimum number of calories your body burns at complete rest during a 24-hour period just to maintain vital physiological functions—such as breathing, heart rate, brain activity, cell production, and body temperature regulation. BMR accounts for 60% to 75% of your total daily energy expenditure."
    },
    {
      q: "What is Total Daily Energy Expenditure (TDEE)?",
      a: "Total Daily Energy Expenditure (TDEE) is the total estimated number of calories your body burns in a 24-hour day. TDEE incorporates your BMR multiplied by an activity factor (Sedentary, Light, Moderate, Active, Very Active, or Extra Active), plus the Thermic Effect of Food (TEF) and Non-Exercise Activity Thermogenesis (NEAT)."
    },
    {
      q: "Which BMR formula is the most accurate?",
      a: "The Mifflin-St Jeor Equation is clinically recognized by the Academy of Nutrition and Dietetics as the most accurate predictor of BMR for healthy adults without body fat measurements. However, if your body fat percentage is accurately known (via DEXA scan or hydrostatic weighing), the Katch-McArdle Formula is superior because it calculates energy needs directly from Lean Body Mass (LBM)."
    },
    {
      q: "How many calories equal one pound of body weight?",
      a: "Roughly 3,500 kilocalories equal 1 pound (0.45 kg) of adipose body tissue. Consequently, creating a cumulative weekly calorie deficit of 3,500 kcal (approx. 500 kcal per day) results in a steady weight loss of 1 pound per week."
    },
    {
      q: "What is Zigzag Calorie Cycling and why is it effective?",
      a: "Zigzag calorie cycling is a dietary approach that alternates higher-calorie days with lower-calorie days while keeping the overall weekly calorie intake identical. This method prevents adaptive thermogenesis (metabolic slowdown) and leptin hormone suppression, helping individuals break through weight-loss plateaus."
    },
    {
      q: "Can I drop below 1,200 calories per day to lose weight faster?",
      a: "Medical guidelines strongly advise against consuming fewer than 1,200 calories per day for women or 1,500 calories per day for men without direct medical supervision. Dropping below these thresholds risks severe muscle wasting, acute nutrient deficiencies, gallbladder stones, and hormonal dysfunction."
    },
    {
      q: "What is the Thermic Effect of Food (TEF)?",
      a: "The Thermic Effect of Food (TEF) is the energy expended by your body to digest, absorb, and metabolize nutrients. Dietary protein has the highest TEF (20%-30% of calories burned in digestion), followed by carbohydrates (5%-10%) and fats (0%-3%)."
    },
    {
      q: "How does gender affect calorie requirements?",
      a: "Biological males generally require more calories than females of the same age and weight due to a higher proportion of lean muscle mass, larger bone density, and a higher baseline metabolic rate influenced by testosterone."
    },
    {
      q: "Why am I not losing weight even though I'm in a calorie deficit?",
      a: "Common reasons include underestimating portion sizes, uncounted liquid calories/condiments, fluid retention from high sodium or exercise, or metabolic adaptation. Weighing food on a digital kitchen scale eliminates tracking errors."
    },
    {
      q: "What macro ratio is best for weight loss?",
      a: "A High-Protein balanced split (e.g., 40% Carbs, 30% Protein, 30% Fat) is optimal for most weight loss goals. High protein intake preserves lean muscle mass during a calorie deficit and maximizes satiety."
    },
    {
      q: "How does physical activity level affect TDEE?",
      a: "Activity level scales your baseline BMR by 20% (Sedentary) up to 100% (Extra Active). Engaging in structured resistance training and increasing daily steps (NEAT) significantly elevates TDEE."
    },
    {
      q: "What is Non-Exercise Activity Thermogenesis (NEAT)?",
      a: "NEAT encompasses all energy expended for everything that is not sleeping, eating, or sports-like exercise—such as walking to work, fidgeting, yard work, and household chores. NEAT can vary by up to 800 kcal/day between individuals."
    },
    {
      q: "How does age impact calorie needs?",
      a: "BMR declines by approximately 1% to 2% per decade after age 30, primarily due to age-related sarcopenia (gradual loss of muscle mass) and reduced hormonal levels."
    },
    {
      q: "Is a calorie always just a calorie?",
      a: "Thermodynamically, yes—1 calorie equals 1 unit of energy. However, nutritionally and metabolically, foods affect hormones, satiety, and digestive energy expenditure differently. 500 calories of chicken breast and broccoli promote muscle recovery and fullness, whereas 500 calories of sugary soda spike insulin and trigger hunger."
    },
    {
      q: "What is the difference between Kilocalories (kcal) and Kilojoules (kJ)?",
      a: "Both measure energy content. 1 Kilocalorie (kcal or 'Calorie') equals 4.1868 Kilojoules (kJ). Kilocalories are standard in the US, UK, and Canada, while Kilojoules are standard in Australia and New Zealand."
    },
    {
      q: "How often should I recalculate my calorie needs?",
      a: "Recalculate your TDEE every 10 to 15 pounds (4.5 to 7 kg) of weight loss or gain, or whenever your physical activity routine changes significantly."
    },
    {
      q: "How does sleep affect daily calorie burn?",
      a: "Sleep deprivation elevates cortisol and ghrelin (the hunger hormone) while suppressing leptin (the satiety hormone), leading to increased cravings and reduced voluntary physical activity."
    },
    {
      q: "Can muscle mass increase your BMR?",
      a: "Yes. Each pound of muscle mass burns approximately 6 to 7 calories per day at rest, compared to 2 to 3 calories per day for a pound of adipose body fat."
    },
    {
      q: "What is the recommended rate of healthy weight loss?",
      a: "The National Institutes of Health (NIH) recommends a gradual weight loss of 0.5 to 2.0 pounds (0.25 to 0.9 kg) per week to ensure sustained fat loss rather than water or lean muscle depletion."
    }
  ];

  return (
    <article className="mt-12 space-y-10 text-zinc-800 dark:text-zinc-200">
      {/* 1. Introduction */}
      <section className="space-y-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400">
          <Flame className="w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400">
            Comprehensive Clinical Guide to Caloric Expenditure &amp; Energy Balance
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-900 dark:text-zinc-300">
          Understanding your daily caloric requirement is the fundamental cornerstone of evidence-based clinical nutrition, sports performance, and body composition management. Whether your goal is sustainable fat loss, lean muscle hypertrophy, athletic conditioning, or metabolic preservation, your daily energy balance dictates your biological trajectory. This guide details the physiological mechanics of Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and macronutrient optimization.
        </p>
      </section>

      {/* 2. What Is Caloric Intake & Energy Balance */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">1. The Physics of Energy Balance: First Law of Thermodynamics
        </h3>
        <p className="text-sm leading-relaxed text-slate-900 dark:text-zinc-300">
          In human physiology, weight change is governed by the First Law of Thermodynamics: energy cannot be created or destroyed, only transformed. Energy Intake (calories consumed via food and beverages) versus Energy Expenditure (calories burned through resting metabolism, digestion, and movement) determines net body mass change:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold">
          <div className="p-3 bg-blue-50 dark:bg-blue-50/30 rounded-xl border border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-200">
            <strong>Caloric Deficit (Energy Out &gt; In)</strong>
            <p className="text-[11px] font-normal text-blue-600 dark:text-blue-400 mt-1">Forces the body to metabolize stored adipose lipid tissue and glycogen for energy, resulting in weight loss.</p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-50/30 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
            <strong>Energy Balance (Energy In = Out)</strong>
            <p className="text-[11px] font-normal text-blue-600 dark:text-blue-400 mt-1">Maintains total body weight and physiological equilibrium without significant composition shifts.</p>
          </div>
          <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-xl border border-orange-200 dark:border-orange-800 text-orange-900 dark:text-orange-200">
            <strong>Caloric Surplus (Energy In &gt; Out)</strong>
            <p className="text-[11px] font-normal text-orange-700 dark:text-orange-300 mt-1">Provides excess energy stored as glycogen, muscle tissue (with resistance training), or adipose fat.</p>
          </div>
        </div>
      </section>

      {/* 3. BMR vs TDEE vs TEF */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">2. Deconstructing Total Daily Energy Expenditure (TDEE)
        </h3>
        <p className="text-sm leading-relaxed text-slate-900 dark:text-zinc-300">
          Your TDEE is composed of four distinct metabolic components:
        </p>
        <ul className="space-y-2 text-sm text-slate-900 dark:text-zinc-300 list-disc pl-5">
          <li><strong>Basal Metabolic Rate (BMR - 60% to 75%):</strong> Energy required for cell maintenance, organ function, respiration, and thermoregulation at complete rest.</li>
          <li><strong>Non-Exercise Activity Thermogenesis (NEAT - 15% to 30%):</strong> Calories burned during non-deliberate physical movement such as walking, typing, standing, and fidgeting.</li>
          <li><strong>Thermic Effect of Food (TEF - 10%):</strong> Energy consumed during nutrient digestion and processing (Protein = 20-30%, Carbs = 5-10%, Fat = 0-3%).</li>
          <li><strong>Exercise Energy Expenditure (EEE - 5% to 15%):</strong> Calories expended during deliberate athletic training and cardio activities.</li>
        </ul>
      </section>

      {/* 4. Formulas */}
      <section className="space-y-4 p-5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          3. Mathematical BMR Formulas Explained
        </h3>
        <div className="space-y-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">A. Mifflin-St Jeor Equation (Clinical Standard)</h4>
            <p>Validated in 1990 as the most reliable formula for modern sedentary lifestyles:</p>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 dark:text-blue-400">
              Male: BMR = (10 × W_kg) + (6.25 × H_cm) - (5 × Age) + 5<br/>
              Female: BMR = (10 × W_kg) + (6.25 × H_cm) - (5 × Age) - 161
            </code>
          </div>

          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">B. Revised Harris-Benedict Equation (Roza &amp; Shizgal 1984)</h4>
            <p>Refined version of the classic 1919 study, suitable for active individuals:</p>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 dark:text-blue-400">
              Male: BMR = 88.362 + (13.397 × W_kg) + (4.799 × H_cm) - (5.677 × Age)<br/>
              Female: BMR = 447.593 + (9.247 × W_kg) + (3.098 × H_cm) - (4.330 × Age)
            </code>
          </div>

          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">C. Katch-McArdle Formula (Lean Mass Based)</h4>
            <p>Calculates BMR directly from Lean Body Mass (LBM), making it ideal for athletes:</p>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 dark:text-blue-400">
              LBM = Weight_kg × (1 - BodyFat%/100)<br/>
              BMR = 370 + (21.6 × LBM)
            </code>
          </div>
        </div>
      </section>

      {/* 5. 20 Clinical FAQs Accordion */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-xl">
          <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3>Frequently Asked Questions (Clinical &amp; Practical)</h3>
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

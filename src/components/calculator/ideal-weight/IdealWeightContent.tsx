"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Activity, Scale, Award, BookOpen, ShieldCheck, HeartPulse } from "lucide-react";

export function IdealWeightContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is Ideal Body Weight (IBW)?",
      a: "Ideal Body Weight (IBW) is an anthropometric estimate of the optimal body weight associated with maximum life expectancy, minimal risk of chronic metabolic disease, and optimal organ function. IBW was originally developed in clinical medicine to calculate accurate drug dosages for narrow therapeutic window medications."
    },
    {
      q: "Which Ideal Weight formula is the most accurate?",
      a: "No single formula is perfect for all individuals. The Devine formula (1974) is the most widely adopted standard in clinical medicine and pharmacology. The Robinson (1983) and Miller (1983) formulas offer refined empirical models, while the Lemmens (2005) formula grounds target weight at a healthy BMI baseline of 22.0."
    },
    {
      q: "Why do different IBW formulas give different results?",
      a: "Different formulas were derived by different medical researchers studying different baseline populations. Hamwi (1964) used diabetic patient populations, Devine (1974) modified Hamwi for drug clearances, and Robinson/Miller (1983) adjusted baseline coefficients using modern regression analysis."
    },
    {
      q: "How does Body Frame Size affect ideal body weight?",
      a: "Bone density, joint breadth, and skeletal structure account for approximately 10% variation in lean tissue. A small-framed person should weigh approximately 10% less than the baseline formula result, while a large-framed person should weigh 10% more."
    },
    {
      q: "How do I measure my wrist circumference to determine frame size?",
      a: "Wrap a flexible tape measure around your dominant wrist just distal to the styloid process (wrist bone prominence). For women 5'2\" to 5'5\", a wrist under 6.0 inches indicates a small frame, 6.0 to 6.25 inches is medium, and over 6.25 inches is large."
    },
    {
      q: "Why do IBW formulas not apply accurately to muscular athletes?",
      a: "IBW formulas rely exclusively on height and gender without accounting for muscle mass versus fat mass. Highly muscular athletes, bodybuilders, and powerlifters carry dense skeletal muscle that increases weight above IBW guidelines without elevating metabolic risk."
    },
    {
      q: "What is the Healthy BMI range recommended by WHO?",
      a: "The World Health Organization defines the healthy adult BMI range as 18.5 to 24.9 kg/m². A BMI of 21.75 is considered the mathematical midpoint (prime target) for population health statistics."
    },
    {
      q: "What is the difference between IBW and BMI?",
      a: "BMI (Body Mass Index) evaluates weight relative to height squared ($W/H^2$) to output a single ratio. IBW outputs a specific target weight range in pounds or kilograms based on medical clinical equations."
    },
    {
      q: "Why do men have higher ideal body weight targets than women of the same height?",
      a: "Men naturally possess higher skeletal muscle mass, greater bone density, and lower essential fat levels (2-5% vs 10-13% in women), requiring higher baseline target weights."
    },
    {
      q: "Can IBW formulas be used for children and teenagers under 18?",
      a: "Standard adult IBW formulas (Hamwi, Devine, etc.) are validated for adults aged 18 and older. For children and adolescents aged 2 to 17, growth percentiles on CDC/WHO age-and-sex-specific BMI growth charts should be used instead."
    },
    {
      q: "Why were IBW formulas originally created?",
      a: "Dr. G. J. Hamwi originally created his formula in 1964 as a quick rule-of-thumb for estimating insulin dosages in diabetic patients. Dr. B. J. Devine adapted it in 1974 to standardize renal clearance calculations for nephrotoxic drugs like aminoglycosides."
    },
    {
      q: "What is the Devine Formula equation?",
      a: "For men: 50.0 kg + 2.3 kg per inch over 5 feet. For women: 45.5 kg + 2.3 kg per inch over 5 feet."
    },
    {
      q: "What is the Hamwi Formula equation?",
      a: "For men: 48.0 kg + 2.7 kg per inch over 5 feet. For women: 45.5 kg + 2.2 kg per inch over 5 feet."
    },
    {
      q: "How does aging impact ideal body weight targets?",
      a: "While baseline IBW formulas do not adjust upwards with age, clinical studies indicate that carrying a slightly higher BMI (23.0 to 26.0) in adults over age 65 offers protective benefits against osteoporosis and frailty."
    },
    {
      q: "How much weight can safely be lost per week to reach IBW?",
      a: "The clinical standard for safe, sustainable fat loss is 0.5 to 2.0 pounds (0.25 to 0.9 kg) per week, corresponding to a daily energy deficit of 250 to 1,000 calories."
    },
    {
      q: "Does body fat percentage matter more than ideal weight?",
      a: "Yes. Body fat percentage and visceral fat distribution are significantly stronger predictors of cardiovascular and metabolic health than scale weight alone."
    },
    {
      q: "What is the Lemmens Formula?",
      a: "Published by Dr. H. J. Lemmens in 2005, the formula calculates IBW directly from height in meters: IBW = 22 × Height(m)²."
    },
    {
      q: "What are the limitations of relying solely on IBW?",
      a: "IBW ignores individual body composition (fat vs muscle ratio), fluid retention, ethnic differences in bone density, and regional adipose storage."
    },
    {
      q: "How does hydration affect scale weight relative to IBW?",
      a: "Water weight can cause temporary scale fluctuations of 2 to 5 pounds daily due to sodium intake, carbohydrate glycogen storage, and hydration levels."
    },
    {
      q: "What should I do if my current weight is higher than my calculated IBW?",
      a: "Focus on sustainable lifestyle modifications: progressive resistance training, a modest caloric deficit (300-500 kcal/day), high protein intake, and consistent sleep rather than rapid crash dieting."
    }
  ];

  return (
    <article className="mt-12 space-y-10 text-zinc-800 dark:text-zinc-200">
      {/* 1. Introduction */}
      <section className="space-y-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400">
          <Activity className="w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            Comprehensive Clinical Guide to Ideal Body Weight (IBW) &amp; Body Frame Metrics
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Ideal Body Weight (IBW) is a fundamental anthropometric standard used across clinical medicine, clinical pharmacology, epidemiology, and health fitness. While modern medicine acknowledges that body composition (muscle vs fat) is paramount, IBW formulas provide a vital baseline for estimating optimal weight targets, medical drug dosages, and nutritional guidelines based on height, biological gender, and skeletal frame size.
        </p>
      </section>

      {/* 2. Clinical Formulas */}
      <section className="space-y-4 p-5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          1. Mathematical Derivations of the 5 Clinical IBW Formulas
        </h3>
        <div className="space-y-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">A. G. J. Hamwi Formula (1964)</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-mono text-blue-700 dark:text-blue-400">
              Male: 48.0 kg + 2.7 kg per inch over 5 feet<br/>
              Female: 45.5 kg + 2.2 kg per inch over 5 feet
            </code>
          </div>

          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">B. B. J. Devine Formula (1974) — Clinical Gold Standard</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-mono text-sky-700 dark:text-sky-400">
              Male: 50.0 kg + 2.3 kg per inch over 5 feet<br/>
              Female: 45.5 kg + 2.3 kg per inch over 5 feet
            </code>
          </div>

          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">C. J. D. Robinson Formula (1983)</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-mono text-indigo-700 dark:text-indigo-400">
              Male: 52.0 kg + 1.9 kg per inch over 5 feet<br/>
              Female: 49.0 kg + 1.7 kg per inch over 5 feet
            </code>
          </div>

          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">D. D. R. Miller Formula (1983)</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-mono text-purple-700 dark:text-purple-400">
              Male: 56.2 kg + 1.41 kg per inch over 5 feet<br/>
              Female: 53.1 kg + 1.36 kg per inch over 5 feet
            </code>
          </div>

          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">E. H. J. Lemmens Formula (2005)</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-mono text-emerald-700 dark:text-emerald-400">
              IBW = 22.0 × Height(meters)²
            </code>
          </div>
        </div>
      </section>

      {/* 3. 20 Clinical FAQs Accordion */}
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

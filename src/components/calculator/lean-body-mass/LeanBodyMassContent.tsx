"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Activity, Layers, BookOpen, ShieldCheck, Dumbbell } from "lucide-react";

export function LeanBodyMassContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is Lean Body Mass (LBM)?",
      a: "Lean Body Mass (LBM) is the total weight of your body minus all fat tissue mass. It comprises skeletal muscle, vital organs (heart, liver, kidneys), bone tissue, blood, skin, cellular water, and essential lipids necessary for biological survival."
    },
    {
      q: "What is the difference between Lean Body Mass and Fat-Free Mass (FFM)?",
      a: "While often used interchangeably, Fat-Free Mass (FFM) excludes 100% of all lipid tissue, whereas Lean Body Mass (LBM) includes essential fat contained in organ membranes, central nervous system tissue, and bone marrow (approx. 2-5% in men and 8-12% in women)."
    },
    {
      q: "Why do anesthesiologists and pharmacologists use LBM for drug dosing?",
      a: "Hydrophilic medications and anesthetic agents (such as propofol, neuromuscular blockers, and water-soluble antibiotics) distribute primarily into lean body tissue rather than adipose fat mass. Dosing strictly by total body weight in obese patients risks severe toxicity; LBM provides the true volume of distribution."
    },
    {
      q: "Which LBM formula is most accurate for adults?",
      a: "The Boer formula (1984) is widely recognized as the clinical gold standard for medical drug dosage. The Janmahasatian formula (2005) is preferred for individuals with high BMI, while the James formula (1976) works well for normal-weight adults."
    },
    {
      q: "How does Peters Formula calculate Lean Body Mass in children?",
      a: "Developed by A.M. Peters in 2011, Peters formula estimates extracellular fluid volume (eECV) from height and weight in children aged 14 or younger: eECV = 0.0215 × Weight^0.6469 × Height^0.7236. Lean Body Mass is calculated as 3.8 × eECV."
    },
    {
      q: "What is a healthy Lean Body Mass percentage for men and women?",
      a: "For men, healthy LBM ranges between 75% and 85% of total body weight (15-25% body fat). For women, healthy LBM ranges between 68% and 78% (22-32% body fat). High-level athletes may achieve LBM above 88-92%."
    },
    {
      q: "Can you increase Lean Body Mass while burning body fat (recomposition)?",
      a: "Yes. Body recomposition occurs when untrained individuals or returning athletes engage in progressive resistance training, consume high dietary protein (1.6-2.2g/kg), and maintain a slight caloric deficit or maintenance calories."
    },
    {
      q: "How does dehydration affect Lean Body Mass calculations?",
      a: "Water accounts for approximately 73% of lean muscle tissue. Severe dehydration reduces total body weight and intracellular fluid volume, causing an artificial drop in calculated Lean Body Mass."
    },
    {
      q: "Why does Lean Body Mass decrease with age (Sarcopenia)?",
      a: "Beginning around age 30, adults naturally lose 3% to 8% of skeletal muscle mass per decade due to declining anabolic hormone levels, reduced muscle protein synthesis, and sedentary lifestyle. Resistance training effectively mitigates age-related sarcopenia."
    },
    {
      q: "What role does Lean Body Mass play in Basal Metabolic Rate (BMR)?",
      a: "Lean Body Mass is the primary driver of daily caloric expenditure. Skeletal muscle and metabolic organs burn significantly more calories at rest per pound than inactive adipose fat tissue."
    },
    {
      q: "How does DEXA scanning compare to mathematical LBM formulas?",
      a: "Dual-Energy X-Ray Absorptiometry (DEXA) directly measures bone mineral density, fat mass, and lean soft tissue with a clinical accuracy margin of ±1.5%. Mathematical formulas provide an excellent non-invasive estimation (accuracy ±3-4%)."
    },
    {
      q: "What is the maximum rate of natural muscle mass gain per month?",
      a: "Under optimal resistance training and nutrition, natural male lifters can gain approximately 1 to 2 pounds of pure skeletal muscle per month in their first year of training. Natural female lifters gain approximately 0.5 to 1 pound per month."
    },
    {
      q: "How does protein intake impact Lean Body Mass retention during weight loss?",
      a: "Consuming 1.6 to 2.2 grams of protein per kilogram of body weight (0.7-1.0g/lb) during a caloric deficit signals muscle protein synthesis (MPS) and prevents the body from catabolizing lean muscle tissue for energy."
    },
    {
      q: "Does bone density count toward Lean Body Mass?",
      a: "Yes. Bone mineral content (skeleton) is part of Lean Body Mass, accounting for approximately 7% to 10% of total lean soft tissue weight."
    },
    {
      q: "Why is scale weight alone a misleading metric for fitness progress?",
      a: "Scale weight measures total body mass (water, fat, muscle, bone, food). Losing 5 pounds of fat while gaining 3 pounds of muscle results in a scale drop of only 2 pounds, despite dramatic improvements in body composition and metabolic health."
    },
    {
      q: "What are the essential fat requirements for males and females?",
      a: "Essential fat is required for hormone synthesis, cell membrane integrity, and organ insulation. Men require a minimum of 2% to 5% essential fat, while women require 10% to 13% for reproductive and endocrine function."
    },
    {
      q: "How does creatine supplementation affect Lean Body Mass?",
      a: "Creatine monohydrate increases intramuscular phosphocreatine stores and draws cellular water into muscle cells (hyperhydration), increasing measurable Lean Body Mass by 2 to 5 pounds within weeks while boosting power output."
    },
    {
      q: "Can cardiovascular exercise cause loss of Lean Body Mass?",
      a: "Excessive high-volume endurance cardio without adequate caloric intake or resistance training can elevate cortisol levels and promote muscle protein degradation. Moderate cardio paired with lifting preserves LBM."
    },
    {
      q: "How do clinical LBM formulas handle severe obesity?",
      a: "The James formula tends to underestimate LBM at very high BMI levels due to quadratic height terms. The Janmahasatian (2005) and Boer (1984) formulas apply non-linear BMI scaling, making them preferred for clinical obesity evaluation."
    },
    {
      q: "How often should I recalculate my Lean Body Mass?",
      a: "Recalculate your Lean Body Mass every 4 to 8 weeks or after completing a dedicated training block (bulking, cutting, or athletic conditioning) to track genuine structural progress."
    }
  ];

  return (
    <article className="mt-12 space-y-10 text-zinc-800 dark:text-zinc-200">
      {/* 1. Introduction */}
      <section className="space-y-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400">
          <Activity className="w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            Comprehensive Clinical Guide to Lean Body Mass &amp; Body Composition Physiology
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Lean Body Mass (LBM) represents one of the most vital health and performance metrics in human physiology, sports science, and clinical medicine. Unlike gross body weight on a bathroom scale—which fails to distinguish between metabolic muscle tissue and inert adipose fat storage—Lean Body Mass measures the total weight of your skeletal muscle mass, internal organs, bone matrix, blood volume, and intracellular water.
        </p>
      </section>

      {/* 2. Clinical Formulas */}
      <section className="space-y-4 p-5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          1. Mathematical Derivations of Clinical LBM Equations
        </h3>
        <div className="space-y-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">A. Boer Formula (1984)</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-700 dark:text-blue-400">
              Male LBM (kg) = 0.407 × Weight(kg) + 0.267 × Height(cm) - 19.2<br/>
              Female LBM (kg) = 0.252 × Weight(kg) + 0.473 × Height(cm) - 48.3
            </code>
          </div>

          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">B. Peters Pediatric Formula (2011) — Children ≤ 14</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-emerald-700 dark:text-emerald-400">
              eECV = 0.0215 × Weight(kg)^0.6469 × Height(cm)^0.7236<br/>
              eLBM (kg) = 3.8 × eECV
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

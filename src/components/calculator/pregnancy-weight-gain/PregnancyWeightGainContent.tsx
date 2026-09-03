"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Scale,
  Activity,
  Calendar,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  Info,
  Apple,
  TrendingUp,
  Heart,
  Baby,
  Dna,
  ArrowRight,
} from "lucide-react";
import { pregnancy_weight_gain_calculatorFaqs } from "@/app/calculators/pregnancy-weight-gain-calculator/faq";

export function PregnancyWeightGainContent() {
  // All 15 FAQs open by default (following 401(k) reference architecture)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 15 }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <article className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-10 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. HERO INTRODUCTION & CLINICAL SCOPE */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <BookOpen className="h-4 w-4" />
          Clinical Reference &amp; Educational Guide
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Pregnancy weight gain is not the same for everyone. The amount considered appropriate depends largely on your pre-pregnancy body mass index (BMI), whether you are carrying one baby or twins, and how far along you are in pregnancy.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          This pregnancy weight gain calculator uses your pre-pregnancy height and weight to determine your BMI category, combines that with pregnancy type and gestational week, and shows the corresponding pregnancy weight-gain reference information. You can enter your current weight to compare your actual gain with the calculator&apos;s estimated weekly range.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          The calculator also provides a 40-week weight-gain trajectory, a week-by-week schedule, a physiological weight-composition view, calorie and nutrient reference information, and tools for printing, sharing and exporting the results.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          The most important number is not how closely your weight follows a single line on a chart. Pregnancy weight gain varies between individuals, and your obstetric clinician should interpret your weight together with fetal growth, blood pressure, nutrition, medical history and the overall course of the pregnancy.
        </p>
      </div>

      {/* 2. QUICK ANSWER */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          How Much Weight Should You Gain During Pregnancy?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          There is no single pregnancy weight-gain target that applies to everyone.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For a singleton pregnancy, the Institute of Medicine recommendations are based on pre-pregnancy BMI:
        </p>

        {/* Singleton Quick Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5">Pre-pregnancy BMI</th>
                <th className="p-3.5 text-right">Recommended Total Gain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-normal">
              <tr>
                <td className="p-3.5 font-semibold">Underweight: below 18.5</td>
                <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">28–40 lb (12.7–18.1 kg)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold">Normal weight: 18.5–24.9</td>
                <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">25–35 lb (11.3–15.9 kg)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold">Overweight: 25.0–29.9</td>
                <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">15–25 lb (6.8–11.3 kg)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold">Obesity: 30.0 or higher</td>
                <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">11–20 lb (5.0–9.1 kg)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 pt-2">
          For twins, the recommended total gain is higher:
        </p>

        {/* Twin Quick Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5">Pre-pregnancy BMI</th>
                <th className="p-3.5 text-right">Recommended Total Gain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-normal">
              <tr>
                <td className="p-3.5 font-semibold">Underweight: below 18.5</td>
                <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">50–62 lb (22.7–28.1 kg)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold">Normal weight: 18.5–24.9</td>
                <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">37–54 lb (16.8–24.5 kg)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold">Overweight: 25.0–29.9</td>
                <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">31–50 lb (14.1–22.7 kg)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold">Obesity: 30.0 or higher</td>
                <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">25–42 lb (11.3–19.1 kg)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 italic">
          These are population-level recommendations rather than personalized medical prescriptions. For pregnancies with triplets or more, recommended gain should be discussed directly with the prenatal care team rather than extrapolated from the twin ranges.
        </p>
      </section>

      {/* 3. WHAT THIS CALCULATOR ACTUALLY CALCULATES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          What This Calculator Calculates
        </h2>
        <p>
          A pregnancy weight gain calculator starts with the information that most strongly determines the guideline category: your pre-pregnancy BMI.
        </p>
        <p>It then combines:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-sm">
          <li>Pre-pregnancy height</li>
          <li>Pre-pregnancy weight</li>
          <li>Current pregnancy weight</li>
          <li>Gestational week</li>
          <li>Pregnancy type (single baby or twins)</li>
        </ul>
        <p>From those inputs, it displays:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-sm">
          <li>Pre-pregnancy BMI and BMI category</li>
          <li>Current weight gain to date</li>
          <li>Official guideline recommended total pregnancy gain (40 weeks)</li>
          <li>Second- and third-trimester IOM guideline weekly rate</li>
          <li>An estimated weekly gain range for your current stage</li>
          <li>Clinical status relative to that estimated range</li>
          <li>An illustrative 40-week trajectory chart and full schedule</li>
          <li>Physiological weight composition breakdown</li>
          <li>Calorie surplus targets and key prenatal nutrient recommendations</li>
        </ul>
        <p>
          The calculator intentionally keeps the official guideline range separate from the calculator&apos;s illustrative weekly trajectory. That distinction matters: a chart that smoothly estimates where you might be at a particular week is not the same thing as an official clinical prescription for that exact week.
        </p>
      </section>

      {/* 4. HOW PREGNANCY WEIGHT GAIN IS DETERMINED */}
      <section className="pt-8 space-y-5">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          How Pregnancy Weight Gain Is Determined
        </h2>
        <p>
          The process begins before pregnancy, not with your current pregnancy weight.
        </p>

        <div className="space-y-4 text-sm">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Step 1: Calculate Pre-Pregnancy BMI
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              For US units: <code>BMI = (weight in pounds × 703) / height in inches²</code>
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              For metric units: <code>BMI = weight in kilograms / height in meters²</code>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The calculator uses the unrounded BMI for classification into standard categories: Underweight (&lt; 18.5), Normal weight (18.5–24.9), Overweight (25.0–29.9), and Obesity (≥ 30.0).
            </p>
          </div>

          {/* LIGHTWEIGHT PROCESS DIAGRAM */}
          <div className="p-4 sm:p-6 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-center space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Guideline Determination Architecture
            </div>
            <div
              className="inline-block font-mono text-xs sm:text-sm text-left bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-2xs leading-relaxed"
              role="img"
              aria-label="Diagram showing how pre-pregnancy BMI and pregnancy type determine pregnancy weight-gain reference ranges."
            >
              <div className="text-slate-700 dark:text-slate-300">
                Pre-pregnancy height + weight<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pre-pregnancy BMI<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BMI category<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pregnancy type (Single vs Twins)<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gestational week (1–40)<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br />
                ┌──────────────────────────────────────┐<br />
                │ • Guideline Total Range (40 Wks)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br />
                │ • Guideline Weekly Rate (T2/T3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br />
                │ • Illustrative Weekly Trajectory&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br />
                └──────────────────────────────────────┘
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              Pregnancy weight-gain guidance starts with pre-pregnancy BMI and changes according to pregnancy type and gestational stage.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Step 2: Identify Pregnancy Type
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              The total recommended gain differs between one baby and twins. Twin pregnancies have higher recommended total weight gain than singleton pregnancies due to dual fetuses, higher blood volume expansion, and greater placental mass.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Step 3: Compare the Current Pregnancy Week
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              The calculator evaluates where your current gain falls relative to its week-specific estimated range.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Step 4: Compare Actual Gain With the Displayed Range
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Current gain is simply: <code>Current weight − pre-pregnancy weight</code>. For example: Pre-pregnancy weight: 130 lb; Current weight: 142 lb; Current gain: 12 lb. The calculator compares that 12-lb gain with the range shown for the selected pregnancy week.
            </p>
          </div>
        </div>
      </section>

      {/* 5. WHY PRE-PREGNANCY BMI MATTERS */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Why Does Pre-Pregnancy BMI Determine How Much Weight You Should Gain?
        </h2>
        <p>
          Pregnancy weight-gain recommendations are based on body size before pregnancy because the nutritional and metabolic context of pregnancy differs depending on starting BMI.
        </p>
        <p>
          The IOM/National Academies recommendations therefore divide singleton pregnancies into four pre-pregnancy BMI categories. Someone who began pregnancy underweight has a higher recommended total gain than someone who began pregnancy with obesity.
        </p>
        <p>
          Because pregnancy weight-gain recommendations depend on pre-pregnancy BMI, it can be useful to calculate your BMI separately before interpreting the pregnancy target using the site&apos;s{" "}
          <Link
            href="/calculators/bmi-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2"
          >
            BMI Calculator
          </Link>
          .
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          This does not mean BMI tells you exactly how much weight your body should gain. It is a population-based starting framework used to guide pregnancy care. Your clinician may consider additional factors when evaluating your individual weight trajectory.
        </p>
      </section>

      {/* 6. SINGLETON PREGNANCY WEIGHT-GAIN TABLE */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Recommended Weight Gain for One Baby
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5">Pre-pregnancy BMI</th>
                <th className="p-3.5">BMI Category</th>
                <th className="p-3.5 text-right">Total Pregnancy Gain</th>
                <th className="p-3.5 text-right">Approx. Metric Equivalent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-normal">
              <tr>
                <td className="p-3.5 font-semibold">&lt; 18.5</td>
                <td className="p-3.5 text-blue-700 dark:text-blue-300 font-medium">Underweight</td>
                <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">28–40 lb</td>
                <td className="p-3.5 text-right">12.7–18.1 kg</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold">18.5–24.9</td>
                <td className="p-3.5 text-emerald-700 dark:text-emerald-300 font-medium">Normal weight</td>
                <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">25–35 lb</td>
                <td className="p-3.5 text-right">11.3–15.9 kg</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold">25.0–29.9</td>
                <td className="p-3.5 text-amber-700 dark:text-amber-300 font-medium">Overweight</td>
                <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">15–25 lb</td>
                <td className="p-3.5 text-right">6.8–11.3 kg</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold">≥ 30.0</td>
                <td className="p-3.5 text-purple-700 dark:text-purple-300 font-medium">Obesity</td>
                <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">11–20 lb</td>
                <td className="p-3.5 text-right">5.0–9.1 kg</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          These are total pregnancy reference ranges for singleton pregnancy. They are not targets that must be reached by a particular calendar week. The calculator&apos;s week-specific estimated range is therefore displayed separately from the full-pregnancy guideline total.
        </p>
      </section>

      {/* 7. TWIN PREGNANCY WEIGHT-GAIN TABLE */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Recommended Weight Gain With Twins
        </h2>
        <p>
          For twin pregnancies, the IOM-based reference ranges are higher than for singleton pregnancy:
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5">Pre-pregnancy BMI</th>
                <th className="p-3.5 text-right">Total Gain (lbs)</th>
                <th className="p-3.5 text-right">Metric Equivalent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-normal">
              <tr>
                <td className="p-3.5 font-semibold">&lt; 18.5 (Underweight)</td>
                <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">50–62 lb</td>
                <td className="p-3.5 text-right">22.7–28.1 kg</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold">18.5–24.9 (Normal weight)</td>
                <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">37–54 lb</td>
                <td className="p-3.5 text-right">16.8–24.5 kg</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold">25.0–29.9 (Overweight)</td>
                <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">31–50 lb</td>
                <td className="p-3.5 text-right">14.1–22.7 kg</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold">≥ 30.0 (Obesity)</td>
                <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">25–42 lb</td>
                <td className="p-3.5 text-right">11.3–19.1 kg</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          CDC notes that the underweight-twin recommendation is an exception to the IOM recommendations and recommends discussing weight-gain goals with a healthcare provider for triplet or higher-order pregnancies. The exact management of a twin pregnancy also depends on the characteristics of the pregnancy and fetal growth, so a twin range should not be treated as a personalized delivery or nutrition prescription.
        </p>
      </section>

      {/* 8. HOW MUCH SHOULD YOU GAIN EACH WEEK? */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          How Much Weight Should You Gain Each Week?
        </h2>
        <p>
          Weekly gain depends on pre-pregnancy BMI. For the second and third trimesters, the IOM reference rates are:
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5">BMI Category</th>
                <th className="p-3.5 text-right">Average T2/T3 Weekly Rate</th>
                <th className="p-3.5 text-right">Metric Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-normal">
              <tr>
                <td className="p-3.5 font-semibold">Underweight</td>
                <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">1.0–1.3 lb/week</td>
                <td className="p-3.5 text-right">0.45–0.59 kg/week</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold">Normal weight</td>
                <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">0.8–1.0 lb/week</td>
                <td className="p-3.5 text-right">0.36–0.45 kg/week</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold">Overweight</td>
                <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">0.5–0.7 lb/week</td>
                <td className="p-3.5 text-right">0.23–0.32 kg/week</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold">Obesity</td>
                <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">0.4–0.6 lb/week</td>
                <td className="p-3.5 text-right">0.18–0.27 kg/week</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          These are average guideline rates, not a requirement for identical weight gain every week. Real pregnancy weight does not always increase in a perfectly straight line. This calculator therefore separates the guideline weekly rate from its illustrative weekly trajectory.
        </p>
      </section>

      {/* 9. WEIGHT GAIN BY TRIMESTER */}
      <section className="pt-8 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Weight Gain Across Trimesters
        </h2>

        <div className="space-y-4 text-sm">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              First-Trimester Weight Gain (Weeks 1–13)
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              First-trimester weight gain is different from the later pregnancy pattern. ACOG notes that during the first 12 weeks, a pregnant person may gain only about 1–5 pounds or may gain no weight at all. That is why it is inappropriate to take a second- or third-trimester weekly rate and simply apply it to every week from the start of pregnancy.
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              Morning sickness, reduced appetite, nausea and normal early-pregnancy changes can all affect weight. The calculator therefore treats its first-trimester weekly trajectory as an illustrative reference rather than an individualized medical prescription. If you are losing substantial weight, cannot keep food or fluids down, or are concerned about nutrition, contact your prenatal care provider rather than trying to correct the number using a calculator.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Second Trimester: The Steady Acceleration (Weeks 14–27)
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              The second trimester is when the rate of pregnancy weight gain generally becomes more predictable. For someone who began pregnancy at a healthy weight, ACOG describes an average gain of about 0.5–1 pound per week during the second and third trimesters. The appropriate pace is lower for people who began pregnancy overweight or with obesity and higher for people who began underweight.
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              For broader pregnancy dating, use the{" "}
              <Link
                href="/calculators/pregnancy-calculator"
                className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2"
              >
                Pregnancy Calculator
              </Link>{" "}
              to estimate your gestational timeline and relate your current week to pregnancy milestones.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Third Trimester: Peak Fetal Growth &amp; Fluid Expansion (Weeks 28–40)
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              Weight gain continues during the third trimester as the fetus grows rapidly and the maternal body adapts to the later stages of pregnancy. The pattern is not necessarily identical from week to week. Some weeks may show a larger change and others a smaller one. For that reason, a single scale reading should not be interpreted in isolation. A prenatal clinician may look at several measurements over time together with fetal growth and other indicators of pregnancy health.
            </p>
          </div>
        </div>
      </section>

      {/* 10. WORKED EXAMPLE */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Example Calculation: 5&apos;6&quot;, 130 lb Before Pregnancy
        </h2>
        <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3 text-sm">
          <p className="font-medium text-slate-900 dark:text-white">
            Suppose someone enters the following pregnancy parameters:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li><strong>Height:</strong> 5 ft 6 in (66 inches / 168 cm)</li>
            <li><strong>Pre-pregnancy weight:</strong> 130 lb (59.0 kg)</li>
            <li><strong>Current weight:</strong> 142 lb (64.4 kg)</li>
            <li><strong>Pregnancy type:</strong> Singleton</li>
            <li><strong>Pregnancy stage:</strong> Week 20</li>
          </ul>
          <div className="pt-2 space-y-2">
            <p>
              <strong>1. Pre-pregnancy BMI:</strong> (130 × 703) / (66 × 66) ≈ <strong>20.98 kg/m²</strong> (displays as <strong>21.0</strong>, Normal Weight).
            </p>
            <p>
              <strong>2. Current Weight Gain:</strong> 142 − 130 = <strong>12.0 lb</strong>.
            </p>
            <p>
              <strong>3. Week 20 Illustrative Range:</strong> <strong>7.3 – 12.3 lb</strong>.
            </p>
            <p>
              <strong>4. Clinical Status:</strong> Because 12.0 lb falls strictly within [7.3, 12.3], the status is <strong>On Track — Within Estimated Range</strong>.
            </p>
            <p>
              <strong>5. Separately Displayed Guideline Values:</strong> Total 40-week guideline target = <strong>25–35 lb</strong>; IOM T2/T3 guideline pace = <strong>0.8–1.0 lb/week</strong>.
            </p>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 italic pt-1">
            The result should be read as an educational reference for tracking, not as a diagnostic verdict.
          </p>
        </div>
      </section>

      {/* 11. UNDERSTANDING THE 40-WEEK TRAJECTORY & SEPARATED CONCEPTS */}
      <section className="pt-8 space-y-5">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          How to Read the Pregnancy Weight-Gain Chart
        </h2>
        <p>
          The 40-week chart is designed to visualize an estimated weight-gain trajectory rather than predict the exact weight of an individual pregnant person. The chart uses the calculator&apos;s illustrative weekly model. That is deliberately different from the official IOM total-gain range.
        </p>
        <p>
          For example, if your total recommended gain is 25–35 lb, the calculator can use an illustrative trajectory to show how that overall range may develop across pregnancy. This helps answer questions such as: <em>&quot;Where does my current gain sit compared with the calculator&apos;s reference trajectory?&quot;</em> It does NOT answer: <em>&quot;Should my body weigh exactly this number next Tuesday?&quot;</em> Pregnancy weight naturally fluctuates.
        </p>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          Why Does the Calculator Show Two Different Kinds of Weight Information?
        </h3>
        <p>This distinction is important:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-2xs">
            <h4 className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-xs">
              Guideline Total
            </h4>
            <p className="text-slate-700 dark:text-slate-300">
              The established full-pregnancy reference range associated with pre-pregnancy BMI and pregnancy type (e.g., 25–35 lb for normal singleton; 37–54 lb for normal twins).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-2xs">
            <h4 className="font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider text-xs">
              Guideline Rate
            </h4>
            <p className="text-slate-700 dark:text-slate-300">
              The average second- and third-trimester weekly rate from the IOM framework (e.g., 0.8–1.0 lb/week for normal BMI singleton).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-2xs">
            <h4 className="font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider text-xs">
              Illustrative Trajectory
            </h4>
            <p className="text-slate-700 dark:text-slate-300">
              A smooth week-by-week educational trajectory between pregnancy reference points. Useful for visualization, not an individualized prescription.
            </p>
          </div>
        </div>
      </section>

      {/* 12. WHAT DOES "ON TRACK" MEAN & HANDLING WEIGHT CHANGES */}
      <section className="pt-8 space-y-5">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          What Does the Weight-Gain Status Mean?
        </h2>
        <p>
          The calculator compares your current gain with the estimated range displayed for the selected week:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-sm">
          <li><strong>Below Estimated Range:</strong> Actual weight gain is less than the lower illustrative bound for your gestational week.</li>
          <li><strong>On Track — Within Estimated Range:</strong> Actual gain sits comfortably within the illustrative reference corridor.</li>
          <li><strong>Above Estimated Range:</strong> Actual weight gain exceeds the upper illustrative bound for your gestational week.</li>
        </ul>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          The boundaries are calculated without an artificial clinical tolerance. That means a value exactly at the displayed upper boundary can still be classified as within the displayed range. The status is a mathematical comparison with the calculator&apos;s reference trajectory. It is not a medical diagnosis.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-sm">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              What if I am not gaining enough weight?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Being below a calculator&apos;s estimated range does not automatically mean something is wrong. Explanations include normal variation, nausea or vomiting, appetite changes, differences in measurement timing, pre-pregnancy BMI, and fluid balance. Persistent inadequate gain, significant weight loss, or severe vomiting should be discussed with your prenatal care provider.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              What if I am gaining weight faster than expected?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              A value above an estimated range is a reason to look at the trend rather than panic over one measurement. Rapid changes can sometimes reflect factors other than changes in body tissue, including fluid retention. Your clinician can evaluate whether the overall pattern is appropriate. Do not attempt aggressive dieting or intentional weight loss during pregnancy without medical guidance.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2 text-sm">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Is losing weight during pregnancy normal?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Some people gain little weight or even lose weight early in pregnancy, especially when nausea and vomiting reduce food intake. However, significant or persistent weight loss deserves medical attention. The calculator can mathematically handle a negative weight change, but that does not mean a negative value is automatically healthy or unhealthy. If you cannot keep food or fluids down or feel weak, dehydrated or unwell, contact your healthcare provider.
          </p>
        </div>
      </section>

      {/* 13. WHERE DOES PREGNANCY WEIGHT GO? */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          What Makes Up Pregnancy Weight Gain?
        </h2>
        <p>
          Pregnancy weight gain is not simply &quot;baby weight.&quot; The increase represents comprehensive physiological adaptations:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold block text-slate-900 dark:text-white">Fetus (Baby)</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">~7.5 lbs / 25–30%</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold block text-slate-900 dark:text-white">Placenta</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">~1.5 lbs / 5–8%</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold block text-slate-900 dark:text-white">Amniotic Fluid</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">~2.0 lbs / 7–10%</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold block text-slate-900 dark:text-white">Uterine Muscle</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">~2.0 lbs / 7–9%</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold block text-slate-900 dark:text-white">Blood Volume</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">~4.0 lbs / 13–14%</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold block text-slate-900 dark:text-white">Body Fluids</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">~3.0 lbs / 10%</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold block text-slate-900 dark:text-white">Breast Tissue</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">~2.0 lbs / 6–7%</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold block text-slate-900 dark:text-white">Maternal Fat</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">~7.0 lbs / 14–25%</span>
          </div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          Those percentages are an educational model, not a direct measurement of how every individual&apos;s weight is distributed. Two pregnancies with the same total weight gain can have different underlying physiological distributions.
        </p>
      </section>

      {/* 14. CALORIES AND NUTRITION */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Calories and Nutrition During Pregnancy
        </h2>
        <p>
          Pregnancy increases nutritional needs, but the change is not simply &quot;eating for two.&quot; CDC guidance states that additional calorie needs are generally around:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-sm">
          <li><strong>First trimester:</strong> No extra calories are typically needed.</li>
          <li><strong>Second trimester:</strong> About 340 extra calories per day.</li>
          <li><strong>Third trimester:</strong> About 450 extra calories per day.</li>
        </ul>
        <p>
          If you are planning pregnancy or trying to understand energy requirements, you can also use the site&apos;s{" "}
          <Link
            href="/calculators/calorie-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2"
          >
            Calorie Calculator
          </Link>{" "}
          for a separate general calorie estimate.
        </p>
        <div className="pt-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Which nutrients are especially important during pregnancy?
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            ACOG identifies key nutrients needed to support the pregnant person and developing fetus. For adults aged 19–50, key benchmarks include:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-sm mt-2">
            <li><strong>Folic acid:</strong> 600 mcg/day (critical for neural tube defect risk reduction)</li>
            <li><strong>Iron:</strong> 27 mg/day (supports maternal blood plasma expansion and fetal oxygenation)</li>
            <li><strong>Calcium:</strong> 1,000 mg/day (fetal skeletal and tooth development)</li>
            <li><strong>Vitamin D:</strong> 600 IU/day (promotes calcium absorption and immune health)</li>
            <li><strong>Protein:</strong> 71 g/day (structural tissue growth)</li>
            <li><strong>DHA / Omega-3:</strong> 200–300 mg/day (fetal neurodevelopment and retina)</li>
          </ul>
        </div>
      </section>

      {/* 15. PHYSICAL ACTIVITY & LIFESTYLE */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Physical Activity and Pregnancy Weight
        </h2>
        <p>
          Physical activity can help support healthy weight management and overall fitness during pregnancy. ACOG recommends that most pregnant people aim for at least 150 minutes of moderate-intensity aerobic activity per week when there are no medical or obstetric reasons to avoid or modify exercise.
        </p>
        <p>
          Appropriate activities include brisk walking, swimming, stationary cycling, and modified prenatal yoga or pilates. Talk with your obstetric care provider about the type and intensity of activity that is appropriate for your pregnancy.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          If you are specifically trying to estimate conception or fertile timing, use the{" "}
          <Link
            href="/calculators/conception-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2"
          >
            Conception Calculator
          </Link>
          . For a calendar-based view of fertile timing, explore the{" "}
          <Link
            href="/calculators/ovulation-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2"
          >
            Ovulation Calculator
          </Link>
          .
        </p>
      </section>

      {/* 16. COMMON TRACKING MISTAKES & WHEN TO CONSULT */}
      <section className="pt-8 space-y-5">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Common Tracking Mistakes to Avoid
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white">Comparing with Others</span>
            <p className="text-slate-600 dark:text-slate-400">
              Two people can have completely different appropriate weight-gain patterns based on pre-pregnancy BMI, fluid shifts, and physiology.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white">Using Current BMI</span>
            <p className="text-slate-600 dark:text-slate-400">
              Guideline categories are determined strictly by pre-pregnancy BMI, not current pregnancy weight.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white">Treating Totals as Weekly Quotas</span>
            <p className="text-slate-600 dark:text-slate-400">
              A 25–35 lb target does not mean gaining exactly the same decimal amount every week. Real weight gain accelerates in T2 and T3.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white">Overreacting to Scale Fluctuation</span>
            <p className="text-slate-600 dark:text-slate-400">
              Daily weight changes often reflect hydration, digestive fullness, and sodium balance rather than tissue mass.
            </p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          When to Talk With Your Healthcare Provider
        </h3>
        <p className="text-sm">
          Contact your prenatal care team when you have concerns about substantial weight loss, persistent vomiting, difficulty keeping fluids down, rapid unexpected weight gain, severe swelling, changes in fetal movement, gestational diabetes, or high blood pressure.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          The calculator can organize numbers. Your clinician interprets what those numbers mean in the context of your pregnancy.
        </p>
      </section>

      {/* 17. CLINICAL REFERENCES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Clinical References &amp; Guidelines
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The pregnancy weight-gain information on this page is based primarily on guidance and reference material from the Centers for Disease Control and Prevention, the American College of Obstetricians and Gynecologists, and the National Academies/IOM.
        </p>
        <ul className="space-y-2 text-xs sm:text-sm">
          <li>
            <a
              href="https://www.cdc.gov/reproductivehealth/maternalinfanthealth/pregnancy-weight-gain.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 font-medium"
            >
              CDC — Weight Gain During Pregnancy <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </li>
          <li>
            <a
              href="https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2013/01/weight-gain-during-pregnancy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 font-medium"
            >
              ACOG — How Much Weight Should I Gain During Pregnancy? <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </li>
          <li>
            <a
              href="https://nap.nationalacademies.org/catalog/12584/weight-gain-during-pregnancy-reexamining-the-guidelines"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 font-medium"
            >
              National Academies — Weight Gain During Pregnancy <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </li>
          <li>
            <a
              href="https://www.acog.org/womens-health/faqs/nutrition-during-pregnancy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 font-medium"
            >
              ACOG — Healthy Eating During Pregnancy <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </li>
          <li>
            <a
              href="https://www.acog.org/womens-health/faqs/exercise-during-pregnancy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 font-medium"
            >
              ACOG — Exercise During Pregnancy <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </li>
        </ul>
      </section>

      {/* 18. FAQ SECTION (15 Approved FAQs, Open by Default, 401(k) Style) */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {pregnancy_weight_gain_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-slate-900 dark:text-white flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 19. RELATED CALCULATORS (White Cards, 401(k) Style) */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            Related Calculators
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Explore related clinical and nutritional tools to plan and monitor your gestational health:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {/* Card 1: BMI Calculator */}
          <Link
            href="/calculators/bmi-calculator"
            className="group p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-blue-600 dark:text-blue-400 group-hover:underline">
                  BMI Calculator
                </span>
                <Scale className="h-4 w-4 text-blue-500" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Determine your baseline body mass index to establish your starting pregnancy weight-gain category.
              </p>
            </div>
            <div className="pt-3 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
              Calculate <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Pregnancy Calculator */}
          <Link
            href="/calculators/pregnancy-calculator"
            className="group p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-blue-600 dark:text-blue-400 group-hover:underline">
                  Pregnancy Calculator
                </span>
                <Calendar className="h-4 w-4 text-pink-500" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Estimate your due date, current gestational week, and key developmental milestones across all three trimesters.
              </p>
            </div>
            <div className="pt-3 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
              Calculate <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Calorie Calculator */}
          <Link
            href="/calculators/calorie-calculator"
            className="group p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-blue-600 dark:text-blue-400 group-hover:underline">
                  Calorie Calculator
                </span>
                <Apple className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Calculate daily maintenance caloric requirements and add appropriate trimester-specific energy surpluses.
              </p>
            </div>
            <div className="pt-3 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
              Calculate <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Conception Calculator */}
          <Link
            href="/calculators/conception-calculator"
            className="group p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-blue-600 dark:text-blue-400 group-hover:underline">
                  Conception Calculator
                </span>
                <Baby className="h-4 w-4 text-purple-500" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Estimate the probable date of conception based on your due date, last menstrual period, or ultrasound dating.
              </p>
            </div>
            <div className="pt-3 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
              Calculate <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* Card 5: Ovulation Calculator */}
          <Link
            href="/calculators/ovulation-calculator"
            className="group p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-blue-600 dark:text-blue-400 group-hover:underline">
                  Ovulation Calculator
                </span>
                <Heart className="h-4 w-4 text-rose-500" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Track menstrual cycle regularity and identify your fertile window for conception planning.
              </p>
            </div>
            <div className="pt-3 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
              Calculate <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 20. MEDICAL DISCLAIMER */}
      <section className="pt-8">
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            Medical Disclaimer
          </div>
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            This pregnancy weight gain calculator provides educational estimates and population-based reference ranges. It is not a diagnostic tool and does not determine whether a pregnancy, fetus or weight-gain pattern is medically healthy.
          </p>
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Recommended pregnancy weight gain depends on factors such as pre-pregnancy BMI, pregnancy type, gestational age and the overall clinical course of the pregnancy. Your obstetrician, midwife or other qualified healthcare professional should interpret your weight trajectory together with fetal growth, nutrition, medical history and other findings.
          </p>
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Do not use the calculator to intentionally lose weight, restrict calories, change medication, or delay medical care without professional guidance.
          </p>
        </div>
      </section>
    </article>
  );
}

export default PregnancyWeightGainContent;

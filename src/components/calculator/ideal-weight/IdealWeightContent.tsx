"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  HelpCircle,
  Scale,
  Activity,
  Layers,
  ArrowRight,
  Info,
} from "lucide-react";
import { ideal_weight_calculatorFaqs } from "@/app/calculators/ideal-weight-calculator/faq";

export function IdealWeightContent() {
  // 401(k) Standard: All 15 FAQs unfolded by default in DOM with individual toggle support
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(
    () => new Set(Array.from({ length: ideal_weight_calculatorFaqs.length }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => {
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
    <article className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed space-y-10">
      {/* Article Header & Suggested Intro */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Complete Guide to Ideal Body Weight
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 mt-3 leading-relaxed">
          An ideal body weight (IBW) calculator gives a reference estimate of body weight based primarily on height, usually using a historical equation developed from population or clinical data. There is not one universally accepted &quot;ideal&quot; weight for every person. Different equations can produce different results at the same height because they were developed using different populations, assumptions, and mathematical relationships. A comparison of commonly used IBW equations demonstrates this variation clearly.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
          This calculator therefore shows several formulas rather than treating one number as an absolute answer. It calculates estimates from the Devine, Robinson, Miller, Hamwi, and Lemmens equations, then provides a consensus value based on the arithmetic mean of those five results.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed font-medium">
          The result is best interpreted as a reference point, not a diagnosis and not a prescription for what a person must weigh.
        </p>
      </div>

      {/* 1. What Is Ideal Body Weight? */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          1. What Is Ideal Body Weight?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Ideal body weight is a historical term used for estimating a reference body weight from height. It has been particularly common in clinical and pharmacological settings because a simple height-based equation is easy to calculate when a patient&apos;s actual or appropriate dosing weight may not be directly usable. Several different equations have been published over the years, and they do not give identical results.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For example, at the same height, Devine, Robinson, Miller, and Hamwi can produce noticeably different estimates. That difference does not necessarily mean one calculation is &quot;wrong&quot;; it reflects the fact that the formulas were developed differently.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
            The practical implication is important:
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            An IBW number is a reference estimate, not a biological optimum that applies equally to everyone. Muscle mass, fat mass, body proportions, age, health status, and the reason the estimate is being used can all matter.
          </p>
        </div>
      </section>

      {/* 2. Why Does This Calculator Use Multiple IBW Formulas? */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          2. Why Does This Calculator Use Multiple IBW Formulas?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          There is no single universally accepted ideal-body-weight equation. Published formulas vary in their coefficients and in the populations or reference tables from which they were derived. Reviews of IBW equations show substantial variation in the calculated result as height changes and as the selected equation changes.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          This calculator addresses that problem by showing five approaches side by side:
        </p>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700/60 rounded-xl">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold">
              <tr>
                <th className="p-3 border-b border-slate-200 dark:border-slate-700">Formula</th>
                <th className="p-3 border-b border-slate-200 dark:border-slate-700">Main Basis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">Devine (1974)</td>
                <td className="p-3">Height above or below the 5-foot reference</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">Robinson (1983)</td>
                <td className="p-3">Height-based regression-style actuarial reference</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">Miller (1983)</td>
                <td className="p-3">Updated height-based empirical equation</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">Hamwi (1964)</td>
                <td className="p-3">Height-based clinical dietetic reference</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">Lemmens (2005)</td>
                <td className="p-3">BMI 22.0 × height(m)² universal target</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator&apos;s consensus IBW is the arithmetic mean of the five calculated values. That does not make the mean medically &quot;more correct&quot;; it simply provides a transparent central estimate across the selected formulas.
        </p>
      </section>

      {/* 3. Devine Formula */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          3. Devine Formula
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The Devine equation was published in 1974 and became one of the most widely recognized IBW equations in clinical pharmacokinetics and medicine.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2 font-mono text-xs sm:text-sm">
          <p className="text-blue-700 dark:text-blue-300 font-bold">
            Men: IBW (kg) = 50.0 + 2.3 × (H - 60)
          </p>
          <p className="text-blue-700 dark:text-blue-300 font-bold">
            Women: IBW (kg) = 45.5 + 2.3 × (H - 60)
          </p>
          <p className="font-sans text-xs text-slate-500 mt-1">
            where H is height in inches and the resulting weight is in kilograms.
          </p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <strong>Example:</strong> For a 5-foot-10-inch male (H = 70 inches):
        </p>
        <p className="text-sm font-mono text-slate-800 dark:text-slate-200 pl-4 border-l-2 border-emerald-500">
          IBW = 50.0 + 2.3 × (70 - 60) = 50.0 + 23.0 = 73.0 kg (approx. 160.9 lb)
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The Devine formula is historically important, but it should still be treated as a reference equation rather than an individualized health target.
        </p>
      </section>

      {/* 4. Robinson Formula */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          4. Robinson Formula
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The Robinson equation was published in 1983 as an actuarial revision of Devine using Metropolitan Life insurance data:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2 font-mono text-xs sm:text-sm">
          <p className="text-blue-700 dark:text-blue-300 font-bold">
            Men: IBW (kg) = 52.0 + 1.9 × (H - 60)
          </p>
          <p className="text-blue-700 dark:text-blue-300 font-bold">
            Women: IBW (kg) = 49.0 + 1.7 × (H - 60)
          </p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          At 5 feet 10 inches, the male calculation is:
        </p>
        <p className="text-sm font-mono text-slate-800 dark:text-slate-200 pl-4 border-l-2 border-emerald-500">
          52.0 + 1.9 × 10 = 71.0 kg (approx. 156.5 lb)
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          This is lower than the Devine result for the same height, illustrating why comparing multiple formulas can be useful.
        </p>
      </section>

      {/* 5. Miller Formula */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          5. Miller Formula
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The Miller equation is another commonly referenced height-based IBW equation:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2 font-mono text-xs sm:text-sm">
          <p className="text-blue-700 dark:text-blue-300 font-bold">
            Men: IBW (kg) = 56.2 + 1.41 × (H - 60)
          </p>
          <p className="text-blue-700 dark:text-blue-300 font-bold">
            Women: IBW (kg) = 53.1 + 1.36 × (H - 60)
          </p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For a 5-foot-10-inch male:
        </p>
        <p className="text-sm font-mono text-slate-800 dark:text-slate-200 pl-4 border-l-2 border-emerald-500">
          56.2 + 1.41 × 10 = 70.3 kg (approx. 155.0 lb)
        </p>
      </section>

      {/* 6. Hamwi Formula */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          6. Hamwi Formula
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The Hamwi formula uses pounds directly and represents a historical height-based clinical reference:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2 font-mono text-xs sm:text-sm">
          <p className="text-blue-700 dark:text-blue-300 font-bold">
            Men: IBW (lb) = 106 + 6 × (H - 60) [approx. 48.0 kg + 2.7 kg/inch]
          </p>
          <p className="text-blue-700 dark:text-blue-300 font-bold">
            Women: IBW (lb) = 100 + 5 × (H - 60) [approx. 45.5 kg + 2.2 kg/inch]
          </p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For a 5-foot-10-inch male:
        </p>
        <p className="text-sm font-mono text-slate-800 dark:text-slate-200 pl-4 border-l-2 border-emerald-500">
          106 + 6 × 10 = 166 lb (or approx. 75.0 kg / 165.3 lb in metric conversion)
        </p>
      </section>

      {/* 7. Lemmens Formula */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          7. Lemmens Formula
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The Lemmens approach takes a modern route away from piecewise &quot;weight above 5 feet&quot; linear equations:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-bold">
          IBW (kg) = 22.0 × Height(m)²
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The equation was proposed as a simple formula for both men and women, with the authors noting that the resulting value falls approximately midway within the range produced by several established IBW formulas.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For someone 1.778 m (5&apos;10&quot;) tall:
        </p>
        <p className="text-sm font-mono text-slate-800 dark:text-slate-200 pl-4 border-l-2 border-emerald-500">
          IBW = 22.0 × (1.778)² ≈ 69.5 kg (approx. 153.2 lb)
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Because the Lemmens method is mathematically based on BMI 22.0, it demonstrates an important connection between IBW calculations and BMI-based reference weights.
        </p>
      </section>

      {/* 8. Why the Five Formulas Give Different Answers */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          8. Why the Five Formulas Give Different Answers
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Suppose a male is 5 feet 10 inches tall. This calculator&apos;s reference calculations produce approximately:
        </p>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700/60 rounded-xl">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-mono">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold font-sans">
              <tr>
                <th className="p-3 border-b border-slate-200 dark:border-slate-700">Method</th>
                <th className="p-3 border-b border-slate-200 dark:border-slate-700">Estimated IBW</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold font-sans">Devine</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">160.9 lb (73.0 kg)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold font-sans">Robinson</td>
                <td className="p-3">156.5 lb (71.0 kg)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold font-sans">Miller</td>
                <td className="p-3">155.0 lb (70.3 kg)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold font-sans">Hamwi</td>
                <td className="p-3">165.3 lb (75.0 kg)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold font-sans">Lemmens</td>
                <td className="p-3">153.2 lb (69.5 kg)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The spread is substantial enough to matter when interpreting the result. Research comparing IBW equations has found that calculated &quot;ideal&quot; weight varies between equations and can lead to different implied BMI values at the same height. That is precisely why this calculator displays individual formula results rather than hiding differences behind a single number.
        </p>
      </section>

      {/* 9. Consensus Ideal Body Weight */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          9. Consensus Ideal Body Weight
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator&apos;s consensus value is calculated as the arithmetic mean of all five models:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-center text-emerald-800 dark:text-emerald-300 font-bold">
          Consensus IBW = (Devine + Robinson + Miller + Hamwi + Lemmens) ÷ 5
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For the reference case of a 28-year-old male at 5 feet 10 inches:
        </p>
        <p className="text-sm font-mono text-slate-800 dark:text-slate-200 pl-4 border-l-2 border-emerald-500">
          (160.9 + 156.5 + 155.0 + 165.3 + 153.2) ÷ 5 ≈ 158.3 lb (71.8 kg)
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The consensus figure should be read as a mathematical summary of several reference equations, not as a clinically validated &quot;perfect&quot; weight.
        </p>
      </section>

      {/* 10. WHO BMI-Based Healthy Weight Range */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          10. WHO BMI-Based Healthy Weight Range
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator also shows a separate BMI-based reference range. For adults, the World Health Organization (WHO) classifies Body Mass Index as follows:
        </p>
        <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-1">
          <li><strong>Below 18.5:</strong> Underweight</li>
          <li><strong>18.5–24.9:</strong> Normal weight</li>
          <li><strong>25.0–29.9:</strong> Pre-obesity / Overweight</li>
          <li><strong>30.0 or higher:</strong> Obesity</li>
        </ul>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator converts the BMI reference limits into corresponding body weights:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-center text-blue-800 dark:text-blue-300 font-semibold">
          W_min = 18.5 × Height(m)² &nbsp;&nbsp;|&nbsp;&nbsp; W_max = 24.99 × Height(m)²
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Check your individual score on our dedicated <Link href="/calculators/bmi-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">BMI Calculator</Link>.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1 text-xs sm:text-sm">
          <p className="font-bold text-slate-900 dark:text-slate-100">Important distinction:</p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            The WHO BMI range and an IBW formula are not the same thing. An IBW formula asks: <em>&quot;What weight does this historical height-based equation estimate?&quot;</em> The BMI range asks: <em>&quot;What weight corresponds to the adult BMI reference range at this height?&quot;</em> Those are different calculations and should not be treated as interchangeable.
          </p>
        </div>
      </section>

      {/* 11. Does Bone Frame Size Change Ideal Body Weight? */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          11. Does Bone Frame Size Change Ideal Body Weight?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Some historical clinical applications have used body-frame or anthropometric adjustments. This calculator allows an optional frame-size adjustment:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-center">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-bold">
            Small Frame: 0.90× (-10%)
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-bold">
            Medium Frame: 1.00× (Baseline)
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-bold">
            Large Frame: 1.10× (+10%)
          </div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The frame adjustment is applied to the calculator&apos;s anthropometric IBW formulas. Frame size does <strong>not</strong> change the WHO BMI classification thresholds. Selecting a larger frame should never redefine a BMI of 25 as a &quot;normal&quot; BMI.
        </p>
      </section>

      {/* 12. How Wrist Circumference and Frame Size Work */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          12. How Wrist Circumference and Frame Size Work
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          When automatic frame detection is enabled, the calculator uses wrist circumference together with biological sex and height to suggest a frame category. The calculator provides two distinct modes:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h3 className="text-sm font-bold text-blue-700 dark:text-blue-300">Automatic Mode</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Wrist circumference is dynamically evaluated against validated anthropometric cutoffs to determine the calculated frame.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h3 className="text-sm font-bold text-blue-700 dark:text-blue-300">Manual Mode</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Your selected Small, Medium, or Large frame is authoritative. Changing wrist circumference in manual mode does not overwrite your chosen frame.
            </p>
          </div>
        </div>
      </section>

      {/* 13. Ideal Weight Is Not the Same as Healthy Weight */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          13. Ideal Weight Is Not the Same as Healthy Weight
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          One of the most important limitations of IBW calculators is the word &quot;ideal.&quot; A historical IBW formula does not know how much muscle you carry, where body fat is distributed, your physical activity, metabolic health, or nutritional status.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Two people can have exactly the same height and very different body compositions. A muscular athlete may weigh considerably more than an IBW estimate while maintaining a healthy body fat percentage. Compare your fat and lean mass distribution with our <Link href="/calculators/body-fat-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Body Fat Calculator</Link>.
        </p>
      </section>

      {/* 14. How to Interpret Your Result */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          14. How to Interpret Your Result
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A useful way to read the calculator is to look at several numbers together:
        </p>
        <ol className="list-decimal pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-2">
          <li><strong>Individual formula estimates:</strong> See how much Devine, Robinson, Miller, Hamwi, and Lemmens differ.</li>
          <li><strong>Consensus estimate:</strong> Use the calculator&apos;s arithmetic mean as a convenient central reference point.</li>
          <li><strong>BMI-based range:</strong> Compare your current weight with the BMI-derived adult healthy reference range.</li>
          <li><strong>Current-weight difference:</strong> The calculator shows how far your current weight is from the consensus estimate when provided.</li>
          <li><strong>Frame-adjusted result:</strong> Understand frame adjustments as an anthropometric scenario rather than a change in underlying BMI classification.</li>
        </ol>
      </section>

      {/* 15. Worked Example: 5'10" Male */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          15. Worked Example: 5&apos;10&quot; Male
        </h2>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1 text-xs sm:text-sm">
          <p>• Age: 28 | Sex: Male</p>
          <p>• Height: 5 ft 10 in (70 inches / 177.8 cm)</p>
          <p>• Current Weight: 175 lb (79.4 kg)</p>
          <p>• Wrist: 7.0 in | Frame: Medium</p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The difference between current weight and the consensus estimate is:
        </p>
        <p className="text-sm font-mono text-slate-800 dark:text-slate-200 pl-4 border-l-2 border-emerald-500">
          175 - 158.3 = 16.7 lb deficit
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator then shows illustrative planning timelines:
        </p>
        <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-1 font-mono">
          <li>1.0 lb/week pace (approx. 500 kcal/day deficit): 17 weeks</li>
          <li>1.5 lb/week pace (approx. 750 kcal/day deficit): 12 weeks</li>
        </ul>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For daily energy and calorie planning, combine this target with our <Link href="/calculators/calorie-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">Calorie Calculator</Link>, <Link href="/calculators/tdee-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">TDEE Calculator</Link>, and <Link href="/calculators/bmr-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">BMR Calculator</Link>.
        </p>
      </section>

      {/* Simple Way to Think About the Calculator */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          A Simple Way to Think About the Calculator
        </h2>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-slate-700 dark:text-slate-300 whitespace-pre overflow-x-auto leading-relaxed">
{`                    YOUR HEIGHT
                         │
          ┌──────────────┼──────────────┐
          │              │              │
       Devine         Robinson        Miller
          │              │              │
          ├──────────────┼──────────────┤
          │              │              │
        Hamwi         Lemmens      Frame Adjustment
          │              │              │
          └──────────────┼──────────────┘
                         │
                  Formula Comparison
                         │
                  Consensus IBW
                         │
              ┌──────────┴──────────┐
              │                     │
       Current Weight         BMI Reference
              │                     │
       Weight Difference       Healthy Range
              │
       Optional Target Planning`}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          This diagram is intentionally simplified: IBW formulas and BMI are related through height, but they are not interchangeable measures.
        </p>
      </section>

      {/* Ideal Weight vs. BMI vs. Actual Healthy Weight */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Ideal Weight vs. BMI vs. Actual Healthy Weight
        </h2>
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700/60 rounded-xl">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold">
              <tr>
                <th className="p-3 border-b border-slate-200 dark:border-slate-700">Measure</th>
                <th className="p-3 border-b border-slate-200 dark:border-slate-700">What It Tells You</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">IBW</td>
                <td className="p-3">Historical height-based reference estimate</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">BMI Range</td>
                <td className="p-3">Population-based weight-to-height classification</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">Actual Healthy Target</td>
                <td className="p-3">Individualized clinical assessment incorporating health, blood markers, and body composition</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Frequently Asked Questions (15 Curated Q&As) */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
          <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {ideal_weight_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqs.has(idx);
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold shrink-0">
                      Q{idx + 1}
                    </span>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Disclaimer */}
      <section className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Clinical &amp; Nutritional Disclaimer
          </h3>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          This calculator is for educational and general planning purposes. Ideal body weight formulas are historical reference equations and do not provide an individualized medical diagnosis or universally appropriate target weight. BMI is a population-level screening measure and does not directly measure body fat or body composition. For children, pregnancy, eating disorders, significant medical conditions, medication dosing, or individualized weight-management decisions, use guidance from an appropriately qualified healthcare professional.
        </p>
      </section>

      {/* Related Calculators */}
      <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 space-y-2">
        <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Related Health &amp; Body Composition Calculators
        </h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-semibold">
          <Link href="/calculators/bmi-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
            BMI Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link href="/calculators/body-fat-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
            Body Fat Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link href="/calculators/healthy-weight-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
            Healthy Weight Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link href="/calculators/calorie-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
            Calorie Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link href="/calculators/tdee-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
            TDEE Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link href="/calculators/bmr-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
            BMR Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link href="/calculators/protein-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
            Protein Calculator
          </Link>
        </div>
      </div>
    </article>
  );
}

export default IdealWeightContent;

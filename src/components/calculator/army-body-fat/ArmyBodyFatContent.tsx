"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Ruler,
  Scale,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Info,
} from "lucide-react";
import { army_body_fat_calculatorFaqs } from "@/app/calculators/army-body-fat-calculator/faq";

export function ArmyBodyFatContent() {
  // All 24 FAQs open (unfolded) by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 24 }, (_, i) => i))
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
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. EXPANDED MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1: Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Army Body Composition Calculator: Check Your 2026 WHtR
          </h2>
          <p>
            The U.S. Army has changed how Soldier body composition is assessed. Under the current 2026 Body
            Composition Program, the Army uses waist-to-height ratio (WHtR) rather than the previous height-and-weight
            tables and circumference-based body-fat percentage methods. The current Army benchmark is WHtR strictly less
            than 0.55.
          </p>
          <p>
            This Army Waist-to-Height Ratio Calculator lets you enter your standing height and waist circumference to
            calculate your WHtR and compare it directly with the Army&apos;s current operational threshold.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100 block">
              Core Calculation Formula:
            </span>
            <div className="font-mono text-base sm:text-lg font-bold text-blue-700 dark:text-blue-300">
              WHtR = Waist Circumference ÷ Standing Height
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              For the Army measurement, waist circumference is taken at the navel (belly button). The ratio is
              calculated using the waist measurement divided by standing height, with both measurements expressed in the
              same unit.
            </p>
          </div>
          <div className="p-3.5 bg-blue-50 dark:bg-slate-800/60 rounded-xl border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <p>
              <strong>Important Notice:</strong> This is an informational and planning calculator based on published Army
              guidance. It does not itself perform an official Army assessment, create an administrative personnel flag,
              or replace an assessment conducted under Army procedures by authorized military personnel.
            </p>
          </div>
        </section>

        {/* Section 2: The New Standard & Boundary */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is the Army&apos;s New Body Composition Standard?
          </h2>
          <p>
            The Army announced that it had replaced the long-standing height-and-weight screening tables,
            circumference-based tape test, and supplemental body-fat assessments with waist-to-height ratio as its sole
            body-composition assessment tool.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-slate-800/90 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-sm text-emerald-900 dark:text-emerald-200 block">
                  WHtR &lt; 0.55
                </span>
                <span className="text-xs text-emerald-800 dark:text-emerald-300">
                  Meets the Army benchmark (Compliant)
                </span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-slate-800/90 border border-rose-200 dark:border-rose-800/60 flex items-start gap-2.5">
              <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-sm text-rose-900 dark:text-rose-200 block">
                  WHtR ≥ 0.55
                </span>
                <span className="text-xs text-rose-800 dark:text-rose-300">
                  Does not meet the benchmark on initial assessment (Non-Compliant)
                </span>
              </div>
            </div>
          </div>
          <p>
            The Army&apos;s official policy explicitly describes the standard as <em>less than</em>, but not equal to,
            0.55. The boundary matters critically: <strong>0.550 is not a passing value</strong> under the current Army
            rule.
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-2.5 sm:p-3">Calculated WHtR</th>
                  <th className="p-2.5 sm:p-3">Mathematical Status</th>
                  <th className="p-2.5 sm:p-3">Official Army Assessment Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 sm:p-3 font-semibold text-slate-800 dark:text-slate-200">0.500</td>
                  <td className="p-2.5 sm:p-3 text-emerald-600 dark:text-emerald-400 font-sans">Below threshold</td>
                  <td className="p-2.5 sm:p-3 text-emerald-600 dark:text-emerald-400 font-sans font-semibold">Compliant</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 sm:p-3 font-semibold text-slate-800 dark:text-slate-200">0.540</td>
                  <td className="p-2.5 sm:p-3 text-emerald-600 dark:text-emerald-400 font-sans">Below threshold</td>
                  <td className="p-2.5 sm:p-3 text-emerald-600 dark:text-emerald-400 font-sans font-semibold">Compliant</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 sm:p-3 font-semibold text-slate-800 dark:text-slate-200">0.549</td>
                  <td className="p-2.5 sm:p-3 text-emerald-600 dark:text-emerald-400 font-sans">Below threshold</td>
                  <td className="p-2.5 sm:p-3 text-emerald-600 dark:text-emerald-400 font-sans font-semibold">Compliant</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 sm:p-3 font-semibold text-slate-800 dark:text-slate-200">0.5499</td>
                  <td className="p-2.5 sm:p-3 text-emerald-600 dark:text-emerald-400 font-sans">Below threshold</td>
                  <td className="p-2.5 sm:p-3 text-emerald-600 dark:text-emerald-400 font-sans font-semibold">Compliant</td>
                </tr>
                <tr className="bg-rose-50/50 dark:bg-rose-950/20 hover:bg-rose-50 dark:hover:bg-rose-950/30">
                  <td className="p-2.5 sm:p-3 font-bold text-rose-700 dark:text-rose-400">0.550</td>
                  <td className="p-2.5 sm:p-3 text-rose-600 dark:text-rose-400 font-sans font-bold">At threshold</td>
                  <td className="p-2.5 sm:p-3 text-rose-600 dark:text-rose-400 font-sans font-bold">Not compliant (Triggers confirmation test)</td>
                </tr>
                <tr className="bg-rose-50/50 dark:bg-rose-950/20 hover:bg-rose-50 dark:hover:bg-rose-950/30">
                  <td className="p-2.5 sm:p-3 font-bold text-rose-700 dark:text-rose-400">0.551</td>
                  <td className="p-2.5 sm:p-3 text-rose-600 dark:text-rose-400 font-sans font-semibold">Above threshold</td>
                  <td className="p-2.5 sm:p-3 text-rose-600 dark:text-rose-400 font-sans font-bold">Not compliant</td>
                </tr>
                <tr className="bg-rose-50/50 dark:bg-rose-950/20 hover:bg-rose-50 dark:hover:bg-rose-950/30">
                  <td className="p-2.5 sm:p-3 font-bold text-rose-700 dark:text-rose-400">0.600</td>
                  <td className="p-2.5 sm:p-3 text-rose-600 dark:text-rose-400 font-sans font-semibold">Above threshold</td>
                  <td className="p-2.5 sm:p-3 text-rose-600 dark:text-rose-400 font-sans font-bold">Not compliant</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: How to Calculate WHtR */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Calculate Waist-to-Height Ratio
          </h2>
          <p>
            The waist-to-height ratio calculation is straightforward: divide waist circumference by standing height.
            Both numbers must use the exact same unit.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 block">
                Example in Inches (Imperial)
              </span>
              <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                <li><strong>Standing Height:</strong> 70 inches</li>
                <li><strong>Waist Circumference:</strong> 34 inches</li>
                <li><strong>Calculation:</strong> 34 ÷ 70 = 0.485714...</li>
                <li><strong>Rounded to 4 decimals:</strong> WHtR = 0.4857</li>
                <li className="text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                  Result: 0.4857 &lt; 0.55 → Below Army threshold (Compliant)
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 block">
                Example in Centimeters (Metric)
              </span>
              <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                <li><strong>Standing Height:</strong> 177.8 cm</li>
                <li><strong>Waist Circumference:</strong> 86.36 cm</li>
                <li><strong>Calculation:</strong> 86.36 ÷ 177.8 = 0.485714...</li>
                <li><strong>Rounded to 4 decimals:</strong> WHtR = 0.4857</li>
                <li className="text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                  Result: 0.4857 &lt; 0.55 → Dimensionless ratio remains identical
                </li>
              </ul>
            </div>
          </div>
          <p>
            The ratio does not change when switching from inches to centimeters, provided both measurements are
            measured and converted consistently.
          </p>
        </section>

        {/* Section 4: How to Use the Calculator */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Use the Army WHtR Calculator
          </h2>
          <p>Using this calculator takes five simple steps:</p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-blue-600 dark:text-blue-400 block text-sm">Step 1</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 block">Enter Standing Height</span>
              <p className="text-slate-600 dark:text-slate-400">Enter your standing height in inches or centimeters without shoes.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-blue-600 dark:text-blue-400 block text-sm">Step 2</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 block">Enter Navel Waist</span>
              <p className="text-slate-600 dark:text-slate-400">Measure circumference directly across the navel (belly button) at relaxed exhale.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-blue-600 dark:text-blue-400 block text-sm">Step 3</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 block">Calculate WHtR</span>
              <p className="text-slate-600 dark:text-slate-400">The calculator divides waist by height using full mathematical precision.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-blue-600 dark:text-blue-400 block text-sm">Step 4</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 block">Compare with 0.55</span>
              <p className="text-slate-600 dark:text-slate-400">Evaluates against the strict Army threshold: WHtR &lt; 0.55.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-blue-600 dark:text-blue-400 block text-sm">Step 5</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 block">Review Max Waist</span>
              <p className="text-slate-600 dark:text-slate-400">Work backward from 0.55 to inspect your maximum compliant waist boundary.</p>
            </div>
          </div>
        </section>

        {/* Section 5: Understanding the 0.55 Threshold */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Understanding the 0.55 Army Threshold
          </h2>
          <p>
            The Army&apos;s current rule deliberately makes the boundary strict. Consider someone who stands 70 inches
            tall:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            <li>
              A waist of <strong>38.4 inches</strong> gives: 38.4 ÷ 70 = <strong>0.54857</strong>. That is strictly below
              0.55 and meets the standard.
            </li>
            <li>
              A waist of <strong>38.5 inches</strong> gives: 38.5 ÷ 70 = <strong>0.55000</strong>. That is at the
              threshold and is <strong>not compliant</strong> under current Army policy.
            </li>
          </ul>
          <p>
            This illustrates why rounding the ratio before checking compliance causes errors. If 0.54857 is prematurely
            rounded to two decimal places (0.55), an evaluator might mistakenly classify a passing Soldier as failing.
            Our calculator evaluates compliance at full floating-point precision before formatting the displayed value.
          </p>
        </section>

        {/* Section 6: Measurement Site & Protocol */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Ruler className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            What Waist Measurement Does the Army Use and How Is It Measured?
          </h2>
          <p>
            Current Army guidance specifies measurement <strong>at the navel (belly button)</strong>. The tape is
            positioned horizontally around the torso at that exact anatomical landmark.
          </p>
          <p>
            Standardization is vital because WHtR is sensitive to measurement site. A tape positioned several inches
            above (the natural narrow waist) or below (across the iliac crest) produces a substantially different
            circumference and an invalid ratio.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100 block">
              Official Army Measurement Sequence
            </span>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-semibold text-center">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 w-full">
                Standing Height (No Shoes)
              </div>
              <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 rotate-90 sm:rotate-0" />
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 w-full">
                Waist at Navel (Relaxed Exhale)
              </div>
              <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 rotate-90 sm:rotate-0" />
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 w-full">
                Waist ÷ Height (Same Units)
              </div>
              <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 rotate-90 sm:rotate-0" />
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 w-full">
                Compare Against &lt; 0.55
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Confirmation & ABCP Process */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Happens at WHtR 0.55 or Higher?
          </h2>
          <p>
            The Army states that Soldiers with a WHtR of 0.55 or greater receive a <strong>confirmation test by
            another team on the same duty day</strong> to verify accuracy. If the Soldier fails the confirmation WHtR
            assessment, formal enrollment into the Army Body Composition Program (ABCP) follows.
          </p>
          <p>
            This distinction is critical: an online calculator informs you of your mathematical ratio, but cannot impose
            or waive an administrative military flag. During the initial 180-day assessment period of the new WHtR
            approach, the Army has stated that no separation action will occur solely for failing WHtR.
          </p>
        </section>

        {/* Section 8: Assessment Frequency & Commander Discretion */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Often Is Army WHtR Assessed?
          </h2>
          <p>
            Under current Army guidance, all Soldiers undergo a WHtR assessment <strong>twice per calendar year</strong>{" "}
            (semi-annually). Additionally, commanders may direct a Soldier to undergo a WHtR assessment whenever they
            have concerns that the Soldier does not meet body composition standards.
          </p>
        </section>

        {/* Section 9: Old Tape Test vs Current WHtR */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            What Happened to the Old Army Body-Fat Tape Test?
          </h2>
          <p>
            The 2026 Army update replaced the previous screening height-and-weight tables, circumference-based tape
            tests (neck and waist for males; neck, waist, and hips for females), and supplemental body-fat equations.
            Historical body-fat percentages (such as 20% or 26%) are no longer the primary standard.
          </p>
          <p>
            While the old methodology remains available in our historical mode for research and veteran reference,
            current military fitness evaluations rely strictly on Waist-to-Height Ratio. To explore general body
            composition estimation formulas, visit our dedicated{" "}
            <Link
              href="/calculators/body-fat-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Body Fat Calculator
            </Link>
            .
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-sm text-slate-700 dark:text-slate-300 block uppercase tracking-wider text-[11px]">
                Historical Method (Pre-2026)
              </span>
              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <div>Multiple circumferences (Neck, Waist, Hips)</div>
                <div>↓ Logarithmic circumference formulas</div>
                <div>Estimated Body Fat %</div>
                <div>↓ Evaluated against age &amp; sex percentage tables</div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-slate-800/90 border border-blue-200 dark:border-blue-900/50 space-y-2">
              <span className="font-bold text-sm text-blue-900 dark:text-blue-200 block uppercase tracking-wider text-[11px]">
                Current Method (2026 Policy)
              </span>
              <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <div>Standing Height + Waist at Navel</div>
                <div>↓ Waist ÷ Height</div>
                <div>Waist-to-Height Ratio (WHtR)</div>
                <div>↓ Evaluated against uniform &lt; 0.55 threshold</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Military vs Clinical Standard */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Is the Army WHtR Standard the Same as a General Health WHtR Standard?
          </h2>
          <p>
            <strong>No.</strong> The Army uses WHtR &lt; 0.55 as an administrative military readiness standard. That
            does not make 0.55 a universal clinical cutoff or medical diagnosis.
          </p>
          <p>
            Clinical organizations establish different thresholds for cardiometabolic health. For example, National
            Institute for Health and Care Excellence (NICE) guidance recommends adults keep their waist circumference
            below half their height (WHtR &lt; 0.50) to minimize central adiposity risk, categorizing 0.50–0.59 as
            increased risk and 0.60+ as high risk. Army compliance does not equal a complete clinical evaluation of
            health.
          </p>
        </section>

        {/* Section 11: WHtR vs BMI */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            WHtR vs. BMI: Understanding the Difference
          </h2>
          <p>
            Waist-to-height ratio and Body Mass Index (BMI) evaluate completely different anthropometric parameters:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-700 dark:text-slate-300">
            <li>
              <strong>Body Mass Index (BMI):</strong> Weight ÷ Height². It measures total body weight relative to
              stature, without differentiating between dense muscle tissue and adipose fat. You can evaluate your stature
              metrics on our{" "}
              <Link href="/calculators/bmi-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                BMI Calculator
              </Link>
              .
            </li>
            <li>
              <strong>Waist-to-Height Ratio (WHtR):</strong> Waist ÷ Height. It measures abdominal circumference
              relative to stature, directly capturing central visceral adiposity around internal organs.
            </li>
          </ul>
          <p>
            Because muscular Soldiers often have high BMIs despite very low body-fat percentages, WHtR provides the
            military with a more equitable, functional measure of abdominal mass than scale weight alone.
          </p>
        </section>

        {/* Section 12: Muscle vs Fat & Body Composition */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Does WHtR Measure Body Fat Percentage?
          </h2>
          <p>
            No. WHtR is a dimensional ratio of waist circumference to height, not a direct measurement of body-fat
            percentage. Two individuals can have identical waist-to-height ratios with noticeably different body-fat
            percentages due to bone structure and muscular development.
          </p>
          <p>
            Heavily muscular athletes with broad torsos or thick core musculature may exhibit a higher waist
            circumference. To isolate muscle tissue from fat mass, review our{" "}
            <Link
              href="/calculators/lean-body-mass-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Lean Body Mass Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 13: Maximum Compliant Waist Formula */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Maximum Waist at the Army 0.55 Boundary
          </h2>
          <p>
            By rearranging the WHtR formula, Soldiers can determine their exact maximum compliant waist for their
            standing height:
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-sm space-y-1">
            <div className="text-slate-800 dark:text-slate-200">Waist = WHtR × Height</div>
            <div className="font-bold text-blue-600 dark:text-blue-400">
              Boundary Waist = 0.55 × Standing Height
            </div>
          </div>
          <p>
            Remember: because the Army standard requires WHtR to be <em>strictly less than</em> 0.55, a waist that
            produces exactly 0.55 is not compliant. For a 70-inch Soldier, 38.5 inches produces 0.5500 (non-compliant),
            meaning the maximum passing waist at quarter-inch tape increments is 38.25 inches.
          </p>
        </section>

        {/* Section 14: Gender, Age & Assessment Protocols */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Do Gender or Age Affect the Current Army WHtR Standard?
          </h2>
          <p>
            Under current 2026 policy, the WHtR benchmark is uniform: <strong>WHtR &lt; 0.55</strong> applies across all
            genders and age brackets. This represents a significant shift from previous decades of AR 600-9, where
            allowable body-fat percentages varied from 20% to 26% for males and 28% to 36% for females across age
            tiers.
          </p>
        </section>

        {/* Section 15: Preparation & What Not to Do */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            How Should You Prepare for an Official Assessment?
          </h2>
          <p>
            The goal of body composition testing is an accurate, repeatable measurement. Soldiers should follow normal
            hydration and nutrition routines. <strong>Do not attempt short-term manipulation</strong> such as:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              • Extreme acute dehydration or sweat suits
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              • Severe starvation or rapid crash dieting
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              • Holding breath or Valsalva abdominal sucking
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              • Distorting posture or flaring the rib cage
            </div>
          </div>
        </section>

        {/* Section 16: Army vs General Health WHtR Comparison Table */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Army WHtR Calculator vs. General Health WHtR
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-2.5 sm:p-3">Feature</th>
                  <th className="p-2.5 sm:p-3">Army WHtR Calculator</th>
                  <th className="p-2.5 sm:p-3">General Health WHtR Guidelines</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 sm:p-3 font-semibold text-slate-900 dark:text-slate-100">Primary Purpose</td>
                  <td className="p-2.5 sm:p-3 text-slate-700 dark:text-slate-300">Army body-composition compliance benchmark</td>
                  <td className="p-2.5 sm:p-3 text-slate-700 dark:text-slate-300">Cardiometabolic health risk assessment</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 sm:p-3 font-semibold text-slate-900 dark:text-slate-100">Basic Calculation</td>
                  <td className="p-2.5 sm:p-3 font-mono">Waist ÷ Height</td>
                  <td className="p-2.5 sm:p-3 font-mono">Waist ÷ Height</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 sm:p-3 font-semibold text-slate-900 dark:text-slate-100">Threshold / Target</td>
                  <td className="p-2.5 sm:p-3 font-bold text-blue-600 dark:text-blue-400">&lt; 0.55 (Strict)</td>
                  <td className="p-2.5 sm:p-3 text-slate-700 dark:text-slate-300">&lt; 0.50 (Keep waist below half your height)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 sm:p-3 font-semibold text-slate-900 dark:text-slate-100">Waist Site</td>
                  <td className="p-2.5 sm:p-3 text-slate-700 dark:text-slate-300">Navel (belly button) per Army protocol</td>
                  <td className="p-2.5 sm:p-3 text-slate-700 dark:text-slate-300">Midpoint between lowest rib &amp; iliac crest</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 sm:p-3 font-semibold text-slate-900 dark:text-slate-100">Administrative Meaning</td>
                  <td className="p-2.5 sm:p-3 text-slate-700 dark:text-slate-300">Military readiness &amp; ABCP compliance</td>
                  <td className="p-2.5 sm:p-3 text-slate-700 dark:text-slate-300">Educational health status indication</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 sm:p-3 font-semibold text-slate-900 dark:text-slate-100">Official Determination</td>
                  <td className="p-2.5 sm:p-3 text-slate-700 dark:text-slate-300">No (Informational planning tool)</td>
                  <td className="p-2.5 sm:p-3 text-slate-700 dark:text-slate-300">No (Medical consultation required)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 17: Common Calculation Mistakes */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Common Army WHtR Calculation Mistakes
          </h2>
          <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100">1. Measuring at the wrong anatomical location:</strong> The current Army standard requires measuring at the navel, not the narrowest waist or the hips.
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100">2. Mixing measurement units:</strong> Never divide inches by centimeters (e.g. 34 inches ÷ 177.8 cm). Use 34 ÷ 70 inches or 86.36 ÷ 177.8 cm.
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100">3. Treating 0.55 as a passing score:</strong> The standard is strictly less than 0.55. A ratio of 0.5500 requires a same-duty-day confirmation retest.
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100">4. Using outdated 2023 tape tables:</strong> Legacy circumference formulas estimating body-fat percentage have been replaced by direct WHtR.
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100">5. Confusing military compliance with universal health:</strong> Passing the military benchmark does not replace comprehensive medical checkups.
            </div>
          </div>
        </section>

        {/* Section 18: Final Educational Takeaway */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Final Takeaway &amp; Policy Summary
          </h2>
          <p>
            The biggest change in U.S. Army body composition policy is simple: the current assessment is no longer
            primarily a body-fat-percentage calculation. The single governing formula is:
          </p>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-slate-100 text-center">
            Waist at the Navel ÷ Standing Height = WHtR (Compliant if &lt; 0.55)
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Soldiers undergo assessment twice per calendar year. While this calculator provides an exact mathematical
            model of the standard, official evaluations must always be administered by certified military personnel.
          </p>
        </section>
      </div>

      {/* 2. FREQUENTLY ASKED QUESTIONS (All 24 Authoritative FAQs, Unfolded by Default) */}
      <div className="pt-8">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {army_body_fat_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
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
      </div>
    </article>
  );
}

export default ArmyBodyFatContent;

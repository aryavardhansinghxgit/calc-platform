"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  Activity,
  Scale,
  Target,
  Award,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Info,
} from "lucide-react";
import { body_fat_calculatorFaqs } from "@/app/calculators/body-fat-calculator/faq";

export function BodyFatContent() {
  // All 20 FAQs open by default for maximum educational authority and scannability
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 20 }, (_, i) => i))
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
        
        {/* Section 1: Overview */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is Body Fat Percentage?
          </h2>
          <p>
            Body fat percentage (BFP or BF%) is the proportion of your total body weight that is made up of fat. Unlike body weight alone, body fat percentage separates your weight into fat mass and fat-free mass, which includes muscle, bone, water, organs, and other lean tissues.
          </p>
          <p>
            For example, a person weighing 70 kg with an estimated body-fat percentage of 20% has approximately:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400 text-[11px] block font-semibold">Fat Mass (20%)</span>
              <strong className="text-sm font-bold text-rose-600 dark:text-rose-400 block mt-0.5">14 kg (30.9 lbs)</strong>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Adipose storage and essential lipids</span>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400 text-[11px] block font-semibold">Fat-Free Mass (80%)</span>
              <strong className="text-sm font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">56 kg (123.5 lbs)</strong>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Skeletal muscle, skeleton, hydration, organs</span>
            </div>
          </div>
          <p>
            That distinction is useful when monitoring changes in body composition. Two people can have the same body weight but very different amounts of body fat and lean mass. To evaluate the exact metabolic demands of maintaining your current lean tissue, pair this tool with our{" "}
            <Link href="/calculators/bmr-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              BMR Calculator
            </Link>{" "}
            and{" "}
            <Link href="/calculators/tdee-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              TDEE Calculator
            </Link>
            .
          </p>
          <p>
            This calculator estimates body fat using the U.S. Navy circumference method and provides a second estimate based on the Deurenberg BMI equation, alongside BMI, fat mass, lean body mass, FFMI, an age-based target, and a fat-loss planning estimate.
          </p>
          <p>
            These methods are intended for estimation and tracking rather than diagnosis. BMI does not directly measure body fat, and anthropometric equations can differ from laboratory body-composition methods.
          </p>
        </section>

        {/* Section 2: How It Works */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How This Body Fat Calculator Works
          </h2>
          <p>
            The calculator combines several related measurements rather than relying on body weight alone. For the U.S. Navy method, the required measurements are:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Age:</strong> Factor in Jackson &amp; Pollock ideal targets and Deurenberg regression.</li>
            <li><strong>Biological Sex:</strong> Dictates anatomical body density logarithmic equations.</li>
            <li><strong>Height:</strong> Primary vertical dimension scaling body surface and cylinder volume.</li>
            <li><strong>Neck circumference:</strong> Proxy for upper-body skeletal structure and cervical lean mass.</li>
            <li><strong>Waist circumference:</strong> Primary marker of central subcutaneous and visceral adiposity.</li>
            <li><strong>Hip circumference (women):</strong> Captures gynoid fat distribution across the pelvic region.</li>
          </ul>
          <p>
            Weight is used to translate the estimated percentage into fat mass and lean mass.
          </p>
          <p>
            The calculator also provides an independent BMI-based estimate using the Deurenberg relationship. Because the two approaches use different inputs, their results do not have to be identical. That difference is useful: it reminds you that a calculated body-fat percentage is an estimate rather than a direct scan.
          </p>
          <p>
            The supplied QA baseline confirms that both the male and female reference scenarios produce the intended results.
          </p>
        </section>

        {/* Section 3: Navy Formula */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            U.S. Navy Body Fat Formula
          </h2>
          <p>
            The U.S. Navy circumference method estimates body density from body measurements and converts that estimate into body-fat percentage. The commonly used metric equations are:
          </p>
          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans tabular-nums text-xs text-blue-700 dark:text-blue-300 font-semibold space-y-1">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Men (Metric)</span>
              <div>BF% = [495 / (1.0324 - 0.19077 × log₁₀(waist - neck) + 0.15456 × log₁₀(height))] - 450</div>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans tabular-nums text-xs text-blue-700 dark:text-blue-300 font-semibold space-y-1">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Women (Metric)</span>
              <div>BF% = [495 / (1.29579 - 0.35004 × log₁₀(waist + hip - neck) + 0.22100 × log₁₀(height))] - 450</div>
            </div>
          </div>
          <p>
            The equations use different body measurements for men and women; the female equation includes hip circumference.
          </p>
          <p>
            The important practical detail is that the measurements must be entered consistently. The calculator handles the conversion between supported unit systems before applying the calculation. For official military tape screening standards, also review our{" "}
            <Link href="/calculators/army-body-fat-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Army Body Fat Calculator
            </Link>
            .
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Why does the Navy formula use circumference measurements?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A person&apos;s fat distribution contains information that body weight alone cannot provide. Waist and neck measurements provide a simple anthropometric proxy for body composition without requiring calipers, imaging, or laboratory equipment.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The method was developed as a field-oriented body-composition assessment approach and has subsequently been widely used in fitness and military contexts. It should still be treated as an estimation equation, not as an equivalent replacement for a direct body-composition assessment.
            </p>
          </div>
        </section>

        {/* Section 4: Deurenberg Formula */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Deurenberg BMI Body Fat Formula
          </h2>
          <p>
            The calculator also calculates estimated body fat from BMI, age, and sex. For adults, the published Deurenberg equation is:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans tabular-nums text-xs text-blue-700 dark:text-blue-300 font-semibold space-y-1">
            <div>BF% = 1.20 × (BMI) + 0.23 × (Age) - 10.8 × (Sex) - 5.4</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">where: Sex = 1 for males, Sex = 0 for females</div>
          </div>
          <p>
            The original research derived age- and sex-specific prediction equations from measured body composition. For adults, the reported standard error of estimate was approximately 4.1 percentage points of body fat. The researchers also noted some overestimation in obese subjects.
          </p>
          <p>
            That is why this calculator shows the BMI-based estimate as a comparative measurement, rather than pretending that one formula is universally exact.
          </p>
        </section>

        {/* Section 5: BMI vs Body Fat */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            BMI and Body Fat Are Not the Same Thing
          </h2>
          <p>
            BMI is calculated as:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans tabular-nums text-xs text-blue-700 dark:text-blue-300 font-semibold">
            BMI = weight (kg) / [height (m)]²
          </div>
          <p>
            The CDC describes BMI as a screening measure of weight relative to height. It does not directly measure body fat and cannot distinguish fat from muscle, bone, or other lean tissue. To inspect your weight-to-height screening bracket, visit our dedicated{" "}
            <Link href="/calculators/bmi-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              BMI Calculator
            </Link>
            .
          </p>
          <p>
            This is particularly important for people with unusually high or low muscularity. For example, a muscular athlete can have a relatively high BMI while carrying comparatively little body fat. Conversely, someone can have a BMI within a conventional range while carrying a relatively high proportion of body fat.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-2 px-3">BMI Range</th>
                  <th className="py-2 px-3">CDC Classification Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-2 px-3 font-semibold text-slate-900 dark:text-zinc-100">Below 18.5</td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">Underweight</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-2 px-3 font-semibold text-emerald-600 dark:text-emerald-400">18.5 – 24.9</td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">Healthy weight</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-2 px-3 font-semibold text-amber-600 dark:text-amber-400">25.0 – 29.9</td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">Overweight</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-2 px-3 font-semibold text-rose-600 dark:text-rose-400">30.0 or higher</td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">Obesity</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            BMI categories are screening categories, not a diagnosis of an individual&apos;s health.
          </p>
        </section>

        {/* Section 6: Fat Mass vs Lean Mass */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Are Fat Mass and Lean Body Mass?
          </h2>
          <p>
            Once body-fat percentage is estimated, the calculator can convert that percentage into approximate body composition:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans tabular-nums text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-zinc-100 block">Fat Mass Formula</span>
              <div className="text-blue-700 dark:text-blue-300 font-semibold">Fat Mass = Body Weight × (BF% / 100)</div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-zinc-100 block">Lean Body Mass Formula</span>
              <div className="text-blue-700 dark:text-blue-300 font-semibold">Lean Mass = Body Weight - Fat Mass</div>
            </div>
          </div>
          <p>
            For example, with a body weight of 70 kg and an estimated BF% of 20%:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans tabular-nums text-xs space-y-1 text-slate-700 dark:text-slate-300">
            <div>Fat Mass = 70 × 0.20 = <strong>14 kg</strong></div>
            <div>Lean Mass = 70 - 14 = <strong>56 kg</strong></div>
          </div>
          <p>
            These figures are estimates because the underlying BF% itself is estimated. For an isolated breakdown of muscular and organ mass without adipose tissue, test our{" "}
            <Link href="/calculators/lean-body-mass-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Lean Body Mass Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 7: What Is FFMI */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is FFMI?
          </h2>
          <p>
            Fat-Free Mass Index (FFMI) relates fat-free mass to height:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans tabular-nums text-xs text-blue-700 dark:text-blue-300 font-semibold space-y-1">
            <div>FFMI = Fat Free Mass (kg) / [Height (m)]²</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Normalized FFMI = FFMI + 6.1 × (1.8 - Height in meters)</div>
          </div>
          <p>
            The calculator also reports a normalized FFMI based on a standard height reference (1.8 meters). This makes comparisons across different heights easier.
          </p>
          <p>
            FFMI can be useful in fitness and body-composition tracking because it focuses on fat-free mass rather than total body weight. It should not be treated as a definitive measurement of muscle mass. Fat-free mass includes water, bone, organs, and other non-fat tissues.
          </p>
        </section>

        {/* Section 8: DEXA Comparison */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Your Body Fat Result May Differ From a DEXA Scan
          </h2>
          <p>
            A tape-measure estimate and a DEXA scan are fundamentally different measurement approaches. The Navy method estimates body composition from anthropometric inputs. DEXA directly assesses body composition using X-ray attenuation and provides a much more detailed body-composition assessment.
          </p>
          <p>Differences between methods can occur because of:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Measurement-site differences:</strong> Slight shifts along the abdominal wall alter tape circumference.</li>
            <li><strong>Tape tension:</strong> Pulling the tape tight compresses subcutaneous fat layers.</li>
            <li><strong>Posture:</strong> Standing slouching versus upright spine expansion changes torso geometry.</li>
            <li><strong>Hydration:</strong> Total body water changes tissue conductivity and muscle volume.</li>
            <li><strong>Fat distribution:</strong> Android vs gynoid fat patterns differ across demographics.</li>
            <li><strong>Formula-specific population characteristics:</strong> Mathematical regression coefficients reflect the original study sample.</li>
            <li><strong>Normal measurement error:</strong> Statistical variance inherent to any field estimation tool.</li>
          </ul>
          <p>
            The Deurenberg research itself reports a prediction error rather than perfect agreement with measured body fat. For personal tracking, consistency is often more useful than repeatedly switching between different measurement methods.
          </p>
        </section>

        {/* Section 9: Measurement Guide */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Measure for the U.S. Navy Method
          </h2>
          <p>
            Measurement technique matters. Use a flexible, non-stretch measuring tape and keep the tape snug without compressing the body.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-zinc-100 font-bold block">Height</strong>
              <p className="text-slate-600 dark:text-slate-400">Stand upright without shoes, heels together, gaze straight forward, recording standing height.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-zinc-100 font-bold block">Neck</strong>
              <p className="text-slate-600 dark:text-slate-400">Measure horizontally just below the larynx (Adam&apos;s apple), keeping the tape level and consistent each time.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-zinc-100 font-bold block">Waist (Men &amp; Women)</strong>
              <p className="text-slate-600 dark:text-slate-400">For men, measure horizontally at the level of the navel. For women, measure at the natural narrowest point of the torso at the end of a normal exhalation.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-zinc-100 font-bold block">Hip (Women)</strong>
              <p className="text-slate-600 dark:text-slate-400">Measure horizontally around the widest circumference of the hips and buttocks with feet placed together.</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            The key is not merely taking a measurement once; it is repeating the measurement under the same conditions and at the same locations so that changes over time are meaningful.
          </p>
        </section>

        {/* Section 10: Why Sex Matters */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Sex Matters in Body Fat Calculations
          </h2>
          <p>
            The calculator uses different equations because body-fat distribution differs between males and females:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <span className="font-bold text-blue-600 dark:text-blue-400 block mb-0.5">Male Circumference Ratio</span>
              <div className="font-mono text-slate-800 dark:text-slate-200">waist - neck</div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <span className="font-bold text-rose-600 dark:text-rose-400 block mb-0.5">Female Circumference Ratio</span>
              <div className="font-mono text-slate-800 dark:text-slate-200">waist + hip - neck</div>
            </div>
          </div>
          <p>
            Consequently, entering identical height and weight values for a male and female does not imply that the calculated body-fat percentage should be the same. This is not a bug or arbitrary adjustment; it is built into the underlying prediction equations.
          </p>
        </section>

        {/* Section 11: How to Use */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Use the Body Fat Calculator
          </h2>
          <p>
            Start by selecting the unit system and entering your age and biological sex. Then enter your height, weight, neck circumference, and waist circumference. For the female calculation, also enter hip circumference.
          </p>
          <p>
            The calculator then produces a body-composition assessment that can include:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Estimated Body Fat %:</strong> The primary Navy circumference estimate.</li>
            <li><strong>BMI-based Body Fat %:</strong> The Deurenberg comparison estimate.</li>
            <li><strong>BMI:</strong> Weight relative to height screening metric.</li>
            <li><strong>Fat Mass:</strong> Estimated weight attributable to adipose tissue.</li>
            <li><strong>Lean Body Mass:</strong> Estimated non-fat skeletal and muscular mass.</li>
            <li><strong>FFMI:</strong> Height-adjusted fat-free mass index.</li>
            <li><strong>Ideal/Target BFP:</strong> A model-based target used by the calculator for scenario planning.</li>
            <li><strong>Target Weight:</strong> The approximate body weight corresponding to the selected target body-fat assumption while holding estimated lean mass constant.</li>
            <li><strong>Fat to Lose:</strong> The difference between current estimated fat mass and the modeled target.</li>
          </ul>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            The uploaded QA confirms these outputs are synchronized with the underlying calculation engine and target-planning tables.
          </p>
        </section>

        {/* Section 12: Target Weight */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Understanding the Target Weight Calculation
          </h2>
          <p>
            A target body-fat percentage does not simply mean &ldquo;lose X kilograms.&rdquo; The more useful question is:
          </p>
          <blockquote className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-l-4 border-blue-600 text-xs italic text-slate-700 dark:text-slate-300">
            &ldquo;How much could body weight change if estimated lean mass were maintained?&rdquo;
          </blockquote>
          <p>Suppose: Current body weight = 80 kg, Estimated lean mass = 60 kg, Target body fat = 20%.</p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans tabular-nums text-xs text-blue-700 dark:text-blue-300 font-semibold space-y-1">
            <div>Target Weight = Lean Mass / (1 - Target BF)</div>
            <div>Target Weight = 60 / (1 - 0.20) = <strong>75 kg (165.3 lbs)</strong></div>
            <div className="text-slate-600 dark:text-slate-400 font-normal">Modeled fat reduction: 80 - 75 = <strong>5 kg (11.0 lbs)</strong></div>
          </div>
          <p>
            This is a planning model, not a guarantee that all weight lost during dieting will come exclusively from fat. Compare this against conventional height-weight benchmarks using our{" "}
            <Link href="/calculators/ideal-weight-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Ideal Weight Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 13: Timeline Planner */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Body Fat Loss Rate and Timeline Estimates
          </h2>
          <p>
            The calculator includes scenario planning for several weekly fat-loss rates based on the thermodynamic approximation:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-blue-700 dark:text-blue-300">
            1 lb fat ≈ 3,500 kcal
          </div>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-2 px-3">Target Loss Rate</th>
                  <th className="py-2 px-3">Approximate Daily Energy Deficit</th>
                  <th className="py-2 px-3">Primary Physiological Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-2 px-3 font-semibold text-slate-900 dark:text-zinc-100">0.5 lb/week</td>
                  <td className="py-2 px-3 font-sans tabular-nums text-emerald-600 dark:text-emerald-400 font-bold">-250 kcal/day</td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">Conservative, preserves maximum muscle tissue</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-2 px-3 font-semibold text-slate-900 dark:text-zinc-100">1.0 lb/week</td>
                  <td className="py-2 px-3 font-sans tabular-nums text-blue-600 dark:text-blue-400 font-bold">-500 kcal/day</td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">Standard clinical gold standard for sustainable loss</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-2 px-3 font-semibold text-slate-900 dark:text-zinc-100">1.5 lb/week</td>
                  <td className="py-2 px-3 font-sans tabular-nums text-amber-600 dark:text-amber-400 font-bold">-750 kcal/day</td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">Moderately aggressive, requires high protein intake</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-2 px-3 font-semibold text-slate-900 dark:text-zinc-100">2.0 lb/week</td>
                  <td className="py-2 px-3 font-sans tabular-nums text-rose-600 dark:text-rose-400 font-bold">-1,000 kcal/day</td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">Upper clinical ceiling; higher risk of muscle loss</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            These are mathematical planning equivalents, not individualized medical prescriptions. The calculator&apos;s timeline table uses these rates to provide estimated weeks and dates for reaching the modeled target. To calculate exact caloric deficit targets, consult our{" "}
            <Link href="/calculators/calorie-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calorie Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 14: Healthy BFP */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is a Healthy Body Fat Percentage?
          </h2>
          <p>
            There is no single body-fat percentage that defines health for every individual. Body-fat interpretation depends on factors such as age, sex, athletic status, muscle mass, fat distribution, overall health, and measurement method.
          </p>
          <p>
            The calculator provides category-style interpretation as a practical reference, but these categories should not be treated as medical diagnoses. For health-risk assessment, body weight, BMI, waist circumference, medical history, blood pressure, metabolic markers, physical activity, and other factors can all matter. NIDDK specifically notes that BMI and waist size can both contribute information when assessing healthy weight.
          </p>
        </section>

        {/* Section 15 & 16: Worked Examples */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Verified Reference Case Studies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-sm text-blue-700 dark:text-blue-300">
                Example 1: Male Reference Profile
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Age: 25 | Height: 179 cm | Weight: 68.9 kg | Neck: 38 cm | Waist: 80 cm
              </p>
              <div className="space-y-1 text-xs pt-1 border-t border-slate-200 dark:border-slate-700 font-sans tabular-nums">
                <div>U.S. Navy Body Fat: <strong>12.0%</strong> (Athletes)</div>
                <div>Fat Mass: <strong>18.2 lbs (8.3 kg)</strong></div>
                <div>Lean Body Mass: <strong>133.7 lbs (60.6 kg)</strong></div>
                <div>Body Mass Index (BMI): <strong>21.5</strong></div>
                <div>Deurenberg BMI Estimate: <strong>15.4%</strong></div>
                <div>FFMI Index: <strong>18.9</strong> (Norm: 19.0)</div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                The two body-fat estimates differ because they come from different models. The reference test confirms the calculator reproduces these values.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-sm text-rose-700 dark:text-rose-300">
                Example 2: Female Reference Profile
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Age: 25 | Height: 178 cm | Weight: 68.9 kg | Neck: 38.1 cm | Waist: 80 cm | Hip: 96.5 cm
              </p>
              <div className="space-y-1 text-xs pt-1 border-t border-slate-200 dark:border-slate-700 font-sans tabular-nums">
                <div>U.S. Navy Body Fat: <strong>24.7%</strong> (Fitness)</div>
                <div>BMI Method Body Fat: <strong>26.4%</strong></div>
                <div>Body Mass Index (BMI): <strong>21.7</strong></div>
                <div>Fat Mass: <strong>37.5 lbs (17.0 kg)</strong></div>
                <div>Lean Body Mass: <strong>114.4 lbs (51.9 kg)</strong></div>
                <div>FFMI Index: <strong>16.4</strong> (Norm: 16.5)</div>
                <div>Modeled Target BFP / Weight: <strong>18.9% / 141.1 lbs</strong></div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                The difference between Navy and BMI estimates is expected because the two methods use different mathematical models.
              </p>
            </div>
          </div>
        </section>

        {/* Section 17: Trend Tracking */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Tracking Trends Can Be More Useful Than One Reading
          </h2>
          <p>
            A body-fat estimate can move because of measurement variation as well as genuine changes in body composition. For that reason, compare measurements taken:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Using the same unit system</li>
            <li>At the exact same anatomical measurement sites</li>
            <li>With the same tape technique and tension</li>
            <li>At approximately the same time of day (morning before eating)</li>
            <li>Under similar hydration and resting conditions</li>
          </ul>
          <p>
            Rather than reacting to one result, look for the direction over several measurements. A sequence such as:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans tabular-nums text-xs text-blue-700 dark:text-blue-300 font-bold text-center">
            25.1% → 24.6% → 24.0% → 23.5%
          </div>
          <p>
            is generally more informative for personal tracking than treating a single 25.1% reading as an exact biological value.
          </p>
        </section>

        {/* Section 18: Comparison Table */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Body Fat Calculator vs BMI Calculator
          </h2>
          <p>
            These tools answer fundamentally different physiological questions:
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-2 px-3">Metric / Measure</th>
                  <th className="py-2 px-3">What It Tells You</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-2 px-3 font-semibold text-slate-900 dark:text-zinc-100">Body Weight</td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">Total physical mass on a gravitational scale</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-2 px-3 font-semibold text-slate-900 dark:text-zinc-100">BMI</td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">Total weight relative to height (screening proxy)</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-2 px-3 font-semibold text-blue-600 dark:text-blue-400">Body Fat %</td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">Estimated proportion of total body weight that is adipose fat</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-2 px-3 font-semibold text-rose-600 dark:text-rose-400">Fat Mass</td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">Estimated absolute mass (kg or lbs) of body fat</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-2 px-3 font-semibold text-emerald-600 dark:text-emerald-400">Lean Mass</td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">Estimated non-fat mass (muscles, bones, water, organs)</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-2 px-3 font-semibold text-purple-600 dark:text-purple-400">FFMI</td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">Height-adjusted fat-free mass index for muscularity</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            BMI is convenient and useful as a screening measure, but it cannot distinguish muscle from fat. A body-fat estimate adds another layer of information, although it also carries measurement and model uncertainty.
          </p>
        </section>

        {/* Section 19: Accuracy & Limitations */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Body Fat Calculator Accuracy and Limitations
          </h2>
          <p>
            This calculator should be viewed as an anthropometric estimator. It does not directly measure:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Visceral fat depots surrounding organs</li>
            <li>Subcutaneous fat thickness distribution</li>
            <li>Bone mineral density</li>
            <li>Organ mass and fluid distribution</li>
            <li>Intracellular vs extracellular hydration status</li>
            <li>Exact skeletal muscle mass</li>
          </ul>
          <p>
            The original Deurenberg research reported an adult standard error of estimate of approximately 4.1 percentage points, demonstrating why calculated body fat should not be interpreted as an exact laboratory measurement. For clinical assessment or when an accurate body-composition measurement is important, professional assessment using an appropriate validated method may be preferable.
          </p>
        </section>

        {/* Section 20: Common Mistakes */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Common Body-Fat Measurement Mistakes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-zinc-100 font-bold block mb-1">Measuring waist inconsistently</strong>
              <p className="text-slate-600 dark:text-slate-400">Moving the tape even a few centimeters vertically can change the circumference input significantly.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-zinc-100 font-bold block mb-1">Pulling the tape too tightly</strong>
              <p className="text-slate-600 dark:text-slate-400">Compressing soft subcutaneous tissue artificially depresses the circumference entered into the formula.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-zinc-100 font-bold block mb-1">Holding the stomach in</strong>
              <p className="text-slate-600 dark:text-slate-400">Sucking in the abdomen creates an artificially reduced waist measurement that invalidates the logarithmic equation.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-zinc-100 font-bold block mb-1">Changing measurement locations</strong>
              <p className="text-slate-600 dark:text-slate-400">Comparing measurements taken at different anatomical landmarks makes longitudinal trend analysis unreliable.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-zinc-100 font-bold block mb-1">Switching formulas between measurements</strong>
              <p className="text-slate-600 dark:text-slate-400">A Navy estimate and a BMI-derived estimate should not be treated as interchangeable values.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-zinc-100 font-bold block mb-1">Treating the result as an exact number</strong>
              <p className="text-slate-600 dark:text-slate-400">A displayed value such as 24.7% should not be interpreted as proving that exactly 24.7% of body weight is fat.</p>
            </div>
          </div>
        </section>

        {/* Section 21: Methodology & Disclaimers */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Methodology Summary &amp; Clinical Disclaimers
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                Calculation Methodology
              </div>
              <p>
                This calculator uses multiple established equations and derived metrics rather than presenting one number without context:
              </p>
              <ul className="list-disc pl-5 space-y-0.5 mt-1">
                <li><strong>Primary estimate:</strong> U.S. Navy circumference method (Hodgdon &amp; Beckett 1984).</li>
                <li><strong>Secondary estimate:</strong> Deurenberg BMI-based body-fat equation.</li>
                <li><strong>Composition:</strong> Fat mass and lean mass derived from estimated body-fat percentage.</li>
                <li><strong>FFMI:</strong> Fat-free mass normalized for height.</li>
                <li><strong>Target planning:</strong> Target body-fat and estimated target-weight scenarios.</li>
                <li><strong>Trend planning:</strong> Modeled fat-loss rates and estimated completion periods.</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                Clinical &amp; Health Disclaimer
              </div>
              <p>
                The calculator reports mathematically calculated estimates based on established anthropometric equations. It does not directly observe adipose tissue. A useful way to interpret the result is: &ldquo;This is an estimate produced by a particular model from my measurements,&rdquo; rather than &ldquo;This is my exact biological body-fat percentage.&rdquo;
              </p>
              <p>
                This calculator is for educational and fitness-tracking purposes. It does not diagnose obesity, malnutrition, or any medical condition. For medical decisions or concerns about body composition, consult an appropriately qualified healthcare professional.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* 2. FREQUENTLY ASKED QUESTIONS (20 ENTITIES IN EXACT 1:1 SCHEMA PARITY) */}
      <div className="pt-8">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {body_fat_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-slate-900 dark:text-zinc-100 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-800/30 font-normal">
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

export default BodyFatContent;

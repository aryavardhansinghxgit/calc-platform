"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, HeartPulse, Scale, Activity } from "lucide-react";
import { healthy_weight_calculatorFaqs } from "@/app/calculators/healthy-weight-calculator/faq";

export function HealthyWeightContent() {
  // All 17 FAQs open by default (matching 401k design pattern)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: healthy_weight_calculatorFaqs.length }, (_, i) => i))
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
      {/* 1. EXPANDED MAIN EDUCATIONAL CONTENT (22 COMPREHENSIVE SECTIONS) */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Intro */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Healthy Weight Calculator: BMI Range and Ideal Body Weight
          </h2>
          <p>
            A healthy weight is not a single number that applies to everyone. For adults, body mass index (BMI) provides a commonly used weight-to-height screening measure, while ideal body weight (IBW) equations provide historical reference estimates based mainly on height. These are related concepts, but they are not interchangeable. The World Health Organization classifies adult BMI of 18.5–24.9 as the normal-weight range, while also emphasizing that BMI is an index used for classification rather than a direct measurement of body composition.
          </p>
          <p>
            This Healthy Weight Calculator brings those ideas together instead of forcing one number to represent everyone&apos;s &ldquo;ideal&rdquo; weight. It calculates the adult BMI-based range for your height, compares several historical IBW equations, and shows how your current weight relates to those reference values.
          </p>
          <p>
            For a 5-foot-10-inch adult, for example, the BMI-based range is approximately 128.9 to 173.5 lb. Historical IBW equations can produce different reference values around that range because each equation uses its own coefficients and assumptions. Published reviews have documented substantial variation among IBW formulas.
          </p>
        </section>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is a Healthy Weight?
          </h2>
          <p>
            In everyday use, &ldquo;healthy weight&rdquo; can mean different things.
          </p>
          <p>
            A clinician may consider your BMI, waist circumference, body composition, blood pressure, blood glucose, physical activity, medications, medical history and other risk factors. A calculator based on height and weight cannot incorporate all of those variables.
          </p>
          <p>For adults, BMI is calculated as:</p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-sans tabular-nums font-semibold text-center text-xs sm:text-sm text-blue-700 dark:text-blue-300">
            BMI = Weight (kg) / [Height (m)]²
          </div>
          <p>WHO lists these adult BMI categories:</p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 dark:bg-zinc-800/80 text-slate-800 dark:text-slate-200 uppercase font-bold">
                <tr>
                  <th className="py-2.5 px-3 border-b border-slate-200 dark:border-slate-700">Adult BMI</th>
                  <th className="py-2.5 px-3 border-b border-slate-200 dark:border-slate-700">WHO Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr><td className="py-2 px-3">Below 18.5</td><td className="py-2 px-3 font-medium text-sky-600 dark:text-sky-400">Underweight</td></tr>
                <tr><td className="py-2 px-3">18.5–24.9</td><td className="py-2 px-3 font-medium text-emerald-600 dark:text-emerald-400">Normal weight</td></tr>
                <tr><td className="py-2 px-3">25.0–29.9</td><td className="py-2 px-3 font-medium text-amber-600 dark:text-amber-400">Pre-obesity</td></tr>
                <tr><td className="py-2 px-3">30.0–34.9</td><td className="py-2 px-3 font-medium text-orange-600 dark:text-orange-400">Obesity class I</td></tr>
                <tr><td className="py-2 px-3">35.0–39.9</td><td className="py-2 px-3 font-medium text-rose-600 dark:text-rose-400">Obesity class II</td></tr>
                <tr><td className="py-2 px-3">40.0+</td><td className="py-2 px-3 font-medium text-rose-700 dark:text-rose-300">Obesity class III</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            These categories are intended for adults and should not simply be applied to children and adolescents, whose BMI interpretation is age- and sex-specific. The calculator converts the adult BMI range into corresponding weights for your height.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How the Healthy Weight Range Is Calculated
          </h2>
          <p>For a height measured in meters:</p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-sans tabular-nums font-semibold space-y-1 text-center text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
            <div>W_min (kg) = 18.5 × Height(m)²</div>
            <div>W_max (kg) = 24.9 × Height(m)²</div>
          </div>
          <p>
            where W = body weight in kilograms, and H = height in meters. For standalone screening against official adult percentiles, use our{" "}
            <Link href="/calculators/bmi-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              BMI Calculator
            </Link>
            .
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700/50 space-y-1.5">
            <strong className="block text-slate-900 dark:text-slate-100 font-bold">Example: 5&apos;10&quot; Adult (1.778 m)</strong>
            <p>Lower reference weight: 18.5 × 1.778² ≈ 58.5 kg ≈ 128.9 lb</p>
            <p>Upper reference weight: 24.9 × 1.778² ≈ 78.7 kg ≈ 173.5 lb</p>
            <p className="font-semibold text-emerald-700 dark:text-emerald-400 pt-1">
              Adult BMI-based reference range at 5&apos;10&quot;: 128.9 – 173.5 lb (58.5 – 78.7 kg)
            </p>
          </div>
          <p>
            The calculator keeps this BMI-derived range independent of body-frame selection. Choosing Small, Medium or Large frame does not alter the underlying BMI thresholds.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. BMI Target Weight
          </h2>
          <p>
            A specific BMI can also be converted into a corresponding body weight:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-sans tabular-nums font-semibold text-center text-xs sm:text-sm text-blue-700 dark:text-blue-300">
            Weight = Target BMI × Height(m)²
          </div>
          <p>
            The calculator includes a 21.7 BMI reference target:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-sans tabular-nums font-semibold text-center text-xs sm:text-sm text-blue-700 dark:text-blue-300">
            Weight_target (kg) = 21.7 × Height(m)²
          </div>
          <p>
            For 5 feet 10 inches: 21.7 × 1.778² ≈ 68.6 kg, or approximately 151.2 lb.
          </p>
          <p>
            This 21.7 value is a calculator reference target, not a claim that WHO requires every adult to reach that exact BMI. The broader WHO adult normal-weight interval is 18.5–24.9. This distinction matters because a healthy BMI range is a range—not a single mandatory target.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. What Is Ideal Body Weight (IBW)?
          </h2>
          <p>
            Ideal body weight is a historical term used for height-based reference equations. Several formulas were developed for clinical and pharmacological applications, and they do not produce the same value. To explore individual formula history and mathematical comparisons in detail, visit our{" "}
            <Link href="/calculators/ideal-weight-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Ideal Weight Calculator
            </Link>
            .
          </p>
          <p>The calculator compares:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Devine (1974)</li>
            <li>Hamwi (1964)</li>
            <li>Robinson (1983)</li>
            <li>Miller (1983)</li>
            <li>Peterson Universal (2016)</li>
          </ul>
          <p>
            The differences are not calculation errors. The equations have different mathematical structures and historical origins. Reviews of IBW formulas have found considerable variability between methods. That is why this calculator presents the individual estimates alongside its multi-formula reference average.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Devine Ideal Body Weight Formula
          </h2>
          <p>
            The Devine equation was published in 1974 and is one of the most widely encountered historical IBW formulas.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-sans tabular-nums font-semibold space-y-1 text-center text-xs sm:text-sm text-purple-700 dark:text-purple-300">
            <div>Men: IBW (kg) = 50 + 2.3 × (Height in inches - 60)</div>
            <div>Women: IBW (kg) = 45.5 + 2.3 × (Height in inches - 60)</div>
          </div>
          <p>where H is height in inches and the result is in kilograms.</p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700/50">
            <p className="font-semibold text-slate-900 dark:text-slate-100">Example: 5&apos;10&quot; Male (70 in)</p>
            <p>IBW = 50 + 2.3 × (70 - 60) = 50 + 23 = 73.0 kg ≈ 160.9 lb</p>
          </div>
          <p>
            This is a reference equation, not a statement that 160.9 lb is the one medically correct weight for every 5&apos;10&quot; man.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Hamwi Ideal Body Weight Formula
          </h2>
          <p>
            The Hamwi equation is another historical height-based formula. The published comparison literature lists:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-sans tabular-nums font-semibold space-y-1 text-center text-xs sm:text-sm text-blue-700 dark:text-blue-300">
            <div>Men: IBW (lb) = 106 + 6 × (Height in inches - 60)</div>
            <div>Women: IBW (lb) = 100 + 5 × (Height in inches - 60)</div>
          </div>
          <p>For a 5&apos;10&quot; male in customary US units: 106 + 6 × (10) = 166 lb.</p>
          <p>
            The precise version displayed by this calculator should always be interpreted according to its documented formula implementation. Historical equations sometimes appear in slightly different variants across secondary references (such as metric hospital approximations 48 kg / 45.5 kg base).
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Robinson Ideal Body Weight Formula
          </h2>
          <p>
            The Robinson equation was published in 1983 based on empirical Metropolitan Life tables:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-sans tabular-nums font-semibold space-y-1 text-center text-xs sm:text-sm text-blue-700 dark:text-blue-300">
            <div>Men: IBW (kg) = 52 + 1.9 × (Height in inches - 60)</div>
            <div>Women: IBW (kg) = 49 + 1.7 × (Height in inches - 60)</div>
          </div>
          <p>
            For a 5&apos;10&quot; male: 52 + 1.9 × (10) = 71.0 kg ≈ 156.5 lb. Again, this differs from Devine because the base weights and incremental coefficients are different.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Miller Ideal Body Weight Formula
          </h2>
          <p>
            The Miller equation uses:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-sans tabular-nums font-semibold space-y-1 text-center text-xs sm:text-sm text-blue-700 dark:text-blue-300">
            <div>Men: IBW (kg) = 56.2 + 1.41 × (Height in inches - 60)</div>
            <div>Women: IBW (kg) = 53.1 + 1.36 × (Height in inches - 60)</div>
          </div>
          <p>
            For a 5&apos;10&quot; male: 56.2 + 1.41 × (10) = 70.3 kg ≈ 155.0 lb.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Peterson Universal Equation
          </h2>
          <p>
            Peterson et al. published a universal equation in 2016 that connects body weight directly to both height and a selected BMI, rather than treating IBW as a single fixed height-only relationship. The authors described the equation as a way to estimate body weight at any target BMI and height.
          </p>
          <p>The published equations are:</p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-sans tabular-nums font-semibold space-y-1 text-center text-xs sm:text-sm text-indigo-700 dark:text-indigo-300">
            <div>US: Weight (lb) = 5 × BMI + (BMI / 5) × (Height in inches - 60)</div>
            <div>Metric: Weight (kg) = 2.2 × BMI + 3.5 × BMI × (Height in meters - 1.5)</div>
          </div>
          <p>
            The paper specifically notes that this method can calculate body weight at any selected BMI, which is a conceptual difference from older fixed IBW equations.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700/50 space-y-1">
            <strong className="block text-slate-900 dark:text-slate-100 font-bold">Example: 5&apos;10&quot; at BMI 22.0</strong>
            <p>Using the published US equation: 5 × (22) + (22 / 5) × (70 - 60) = 110 + 44 = 154 lb.</p>
            <p>The metric calculation gives approximately 69.8 kg, which is approximately 153.9 lb after conversion.</p>
          </div>
          <p>
            The small difference is simply a matter of unit conversion and rounding. The calculator preserves the internal precision and rounds at the display boundary.
          </p>
          <p className="text-[11px] text-slate-500 italic">
            Source: Peterson CM, Thomas DM, Blackburn GL, Heymsfield SB. Universal equation for estimating ideal body weight and body weight at any BMI. Am J Clin Nutr. 2016;103(5):1197-1203.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Why Different IBW Formulas Produce Different Answers
          </h2>
          <p>
            Consider a 5&apos;10&quot; adult male. The calculator produces values around:
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 dark:bg-zinc-800/80 text-slate-800 dark:text-slate-200 uppercase font-bold">
                <tr>
                  <th className="py-2.5 px-3 border-b border-slate-200 dark:border-slate-700">Method</th>
                  <th className="py-2.5 px-3 border-b border-slate-200 dark:border-slate-700">Reference Weight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-sans tabular-nums">
                <tr><td className="py-2 px-3 font-semibold text-slate-900 dark:text-slate-100">Devine</td><td className="py-2 px-3 font-bold text-blue-600 dark:text-blue-400">~160.9 lb</td></tr>
                <tr><td className="py-2 px-3 font-semibold text-slate-900 dark:text-slate-100">Hamwi*</td><td className="py-2 px-3 font-bold text-blue-600 dark:text-blue-400">~165.3 lb</td></tr>
                <tr><td className="py-2 px-3 font-semibold text-slate-900 dark:text-slate-100">Robinson</td><td className="py-2 px-3 font-bold text-blue-600 dark:text-blue-400">~156.5 lb</td></tr>
                <tr><td className="py-2 px-3 font-semibold text-slate-900 dark:text-slate-100">Miller</td><td className="py-2 px-3 font-bold text-blue-600 dark:text-blue-400">~155.0 lb</td></tr>
                <tr><td className="py-2 px-3 font-semibold text-slate-900 dark:text-slate-100">Peterson</td><td className="py-2 px-3 font-bold text-blue-600 dark:text-blue-400">~153.9 lb</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-500 italic">*Using the calculator&apos;s documented metric hospital variant.</p>
          <p>
            There is no mathematical requirement that these historical formulas agree. A major reason is that older IBW equations use fixed coefficients based on their original development methods, while Peterson explicitly incorporates a chosen BMI into the equation. Research examining IBW equations has shown that different formulas can produce materially different results, particularly across the height range.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Multi-Formula Reference Average
          </h2>
          <p>
            Rather than choosing one historical equation and calling it the answer, the calculator summarizes the supported methods into a Multi-Formula Reference Average.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-sans tabular-nums font-semibold text-center text-xs sm:text-sm text-blue-700 dark:text-blue-300">
            Reference Average = [IBW₁ + IBW₂ + ... + IBWₙ] / n
          </div>
          <p>
            The exact set of methods included is shown by the calculator (Hamwi, Devine, Robinson, Miller, Peterson at BMI 22, and WHO Prime Target at BMI 21.7).
          </p>
          <p>
            This number should be interpreted correctly: it is a mathematical average of reference equations—not a medically validated universal &ldquo;perfect weight.&rdquo; Averaging several historical equations is useful for comparison, but it does not eliminate the underlying limitations of the equations themselves.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Body Frame Size and Reference Weight
          </h2>
          <p>The calculator supports a frame-size scenario:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Small Frame: −10% multiplier (0.90)</li>
            <li>Medium Frame: baseline multiplier (1.00)</li>
            <li>Large Frame: +10% multiplier (1.10)</li>
          </ul>
          <p>
            These adjustments are intended for the calculator&apos;s reference/IBW target, not for changing BMI itself:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-sans tabular-nums font-semibold text-center text-xs sm:text-sm text-indigo-700 dark:text-indigo-300">
            FrameAdjustedTarget = ReferenceTarget × FrameMultiplier
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700/50 space-y-1">
            <strong className="block text-slate-900 dark:text-slate-100 font-bold">Important Distinction</strong>
            <p>Frame size does not change BMI = weight / height², and it does not change the adult BMI thresholds.</p>
            <p>
              Therefore, if your 5&apos;10&quot; BMI-based range is approximately 128.9–173.5 lb, that range remains exactly the same under Small, Medium and Large frame selections. The frame adjustment is a separate reference-weight scenario.
            </p>
          </div>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Wrist Circumference and Automatic Frame Detection
          </h2>
          <p>
            The calculator can use wrist circumference to estimate a frame category when automatic detection is enabled. It also supports manual frame selection.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Automatic Mode:</strong> Wrist circumference is evaluated using the calculator&apos;s documented sex- and height-related frame rules (Male: &lt;6.5&quot; Small, 6.5–7.5&quot; Medium, &gt;7.5&quot; Large; Female: stratified by height).</li>
            <li><strong>Manual Mode:</strong> The user&apos;s selected frame is authoritative.</li>
          </ul>
          <p>
            This distinction prevents an accidental wrist change from silently replacing a deliberate Small, Medium or Large selection. Frame selection should be considered an anthropometric reference, not a clinical diagnosis of skeletal structure.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Current Weight vs. Reference Weight
          </h2>
          <p>
            The calculator becomes more useful when current body weight is supplied. It can show current BMI, BMI-based healthy-weight range, reference target, formula-specific IBW estimates, and difference between current weight and reference values.
          </p>
          <p>
            For example, suppose a 5&apos;10&quot; adult currently weighs 160 lb. BMI is approximately: 72.6 / 1.778² ≈ 23.0. That places the person comfortably within the WHO adult normal-weight BMI category. At the same time, different IBW formulas may produce values below or above 160 lb. That is not contradictory; it simply demonstrates that BMI classification and historical IBW equations answer different questions.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Why BMI Does Not Tell the Whole Story
          </h2>
          <p>
            BMI is useful because it is simple, reproducible and strongly associated with population-level health risks. However, it does not directly measure body fat and cannot distinguish fat mass from muscle mass. For example, someone with substantial muscle mass may weigh more than a height-based IBW estimate without having the same body-composition profile as a sedentary person at the same weight.
          </p>
          <p>
            To evaluate your fat mass and lean body tissue ratio directly, consult our{" "}
            <Link href="/calculators/body-fat-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Body Fat Calculator
            </Link>
            .
          </p>
          <p>
            WHO describes BMI as a simple adult nutritional-status indicator and notes its relationship with disease risk, but a BMI result still needs to be interpreted in context. For a more complete assessment, other measures can include waist circumference, body-fat percentage, lean mass, blood pressure, blood glucose, lipids, fitness level, and medical history. No single calculator captures all of these.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Is &ldquo;Ideal Weight&rdquo; Really Ideal?
          </h2>
          <p>
            The word ideal can be misleading. A historical equation may estimate a reference weight, but it does not know whether you are highly muscular, your body-fat distribution, your medical history, your medications, your athletic demands, your nutritional status, your previous weight history, or your individual health goals.
          </p>
          <p>
            For that reason, a better interpretation is: &ldquo;This is a reference value produced by a particular equation.&rdquo; The calculator&apos;s multi-formula approach is designed to make that uncertainty visible rather than hiding it behind a single number.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Children and Teenagers Are Different
          </h2>
          <p>
            Adult BMI categories should not simply be applied to children. WHO states that for people aged 0–19, BMI interpretation requires age- and sex-specific growth references, because the relationship between weight and height changes during growth. Therefore, an adult &ldquo;healthy weight range&rdquo; calculator should not be interpreted as a pediatric growth-chart tool. For children and teenagers, an appropriate pediatric growth reference and professional assessment should be used.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            18. Can Ideal Body Weight Be Used for Medication Dosing?
          </h2>
          <p>
            Historical IBW equations are sometimes encountered in clinical and pharmacological calculations, but that does not mean an IBW calculator determines the correct dose of a medication. Depending on the medication and clinical protocol, dosing may use actual body weight, ideal body weight, adjusted body weight, lean body weight, body-surface area, or another drug-specific calculation. The correct dosing method is medication-specific and should come from prescribing information or an appropriately qualified clinician or pharmacist.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            19. A Better Way to Use the Result
          </h2>
          <p>A useful interpretation sequence is:</p>
          <ol className="list-decimal pl-5 space-y-1.5">
            <li><strong>Step 1 — Check BMI:</strong> Calculate your current BMI and determine where it falls relative to the adult reference categories.</li>
            <li><strong>Step 2 — Look at the BMI-based Range:</strong> See the weight range corresponding to BMI 18.5–24.9 for your height.</li>
            <li><strong>Step 3 — Compare IBW Equations:</strong> See how Devine, Hamwi, Robinson, Miller and Peterson differ.</li>
            <li><strong>Step 4 — Look at the Reference Average:</strong> Use the multi-formula average as a convenient comparison point rather than a compulsory target.</li>
            <li>
              <strong>Step 5 — Align Energy Balance:</strong> When planning nutritional adjustments toward your target weight, calculate your baseline metabolism with our{" "}
              <Link href="/calculators/bmr-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                BMR Calculator
              </Link>{" "}
              and total daily energy expenditure with our{" "}
              <Link href="/calculators/tdee-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                TDEE Calculator
              </Link>
              . To structure safe caloric deficits or surpluses, refer to the{" "}
              <Link href="/calculators/calorie-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Calorie Calculator
              </Link>
              , and ensure sufficient protein intake to preserve lean muscle using our{" "}
              <Link href="/calculators/protein-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Protein Calculator
              </Link>
              .
            </li>
          </ol>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            20. Worked Example: 5&apos;10&quot;, 160 lb Adult
          </h2>
          <p>Assume: Height: 5&apos;10&quot; (70 in, 177.8 cm), Current Weight: 160 lb (72.6 kg), Frame: Medium.</p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 dark:bg-zinc-800/80 text-slate-800 dark:text-slate-200 uppercase font-bold">
                <tr>
                  <th className="py-2.5 px-3 border-b border-slate-200 dark:border-slate-700">Measure</th>
                  <th className="py-2.5 px-3 border-b border-slate-200 dark:border-slate-700">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-sans tabular-nums">
                <tr><td className="py-2 px-3 font-semibold text-slate-900 dark:text-slate-100">BMI</td><td className="py-2 px-3 font-bold text-emerald-600 dark:text-emerald-400">23.0 (Normal weight)</td></tr>
                <tr><td className="py-2 px-3 font-semibold text-slate-900 dark:text-slate-100">WHO Adult Reference Range</td><td className="py-2 px-3 font-bold text-emerald-600 dark:text-emerald-400">128.9 – 173.5 lb</td></tr>
                <tr><td className="py-2 px-3 font-semibold text-slate-900 dark:text-slate-100">BMI 21.7 Reference Target</td><td className="py-2 px-3 font-bold text-blue-600 dark:text-blue-400">151.2 lb</td></tr>
                <tr><td className="py-2 px-3 font-semibold text-slate-900 dark:text-slate-100">Devine (1974)</td><td className="py-2 px-3 font-bold text-purple-600 dark:text-purple-400">160.9 lb</td></tr>
                <tr><td className="py-2 px-3 font-semibold text-slate-900 dark:text-slate-100">Robinson (1983)</td><td className="py-2 px-3 font-bold text-blue-600 dark:text-blue-400">156.5 lb</td></tr>
                <tr><td className="py-2 px-3 font-semibold text-slate-900 dark:text-slate-100">Miller (1983)</td><td className="py-2 px-3 font-bold text-blue-600 dark:text-blue-400">155.0 lb</td></tr>
                <tr><td className="py-2 px-3 font-semibold text-slate-900 dark:text-slate-100">Peterson Universal (2016)</td><td className="py-2 px-3 font-bold text-indigo-600 dark:text-indigo-400">153.9 lb</td></tr>
                <tr><td className="py-2 px-3 font-semibold text-slate-900 dark:text-slate-100">Hamwi (Documented Metric)</td><td className="py-2 px-3 font-bold text-blue-600 dark:text-blue-400">165.3 lb</td></tr>
                <tr><td className="py-2 px-3 font-semibold text-slate-900 dark:text-slate-100">Multi-Formula Reference Average</td><td className="py-2 px-3 font-bold text-emerald-600 dark:text-emerald-400">157.2 lb</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            The key takeaway is not that one number is &ldquo;correct.&rdquo; Instead: current BMI is inside the adult normal-weight category; the BMI-derived range is substantially wider than any single IBW estimate; different historical IBW equations disagree; and the reference target is an estimation tool rather than a medical mandate.
          </p>
        </section>

        {/* Section 21 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            21. Reference Formulas at a Glance
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 dark:bg-zinc-800/80 text-slate-800 dark:text-slate-200 uppercase font-bold">
                <tr>
                  <th className="py-2.5 px-3 border-b border-slate-200 dark:border-slate-700">Method</th>
                  <th className="py-2.5 px-3 border-b border-slate-200 dark:border-slate-700">Type</th>
                  <th className="py-2.5 px-3 border-b border-slate-200 dark:border-slate-700">Main Input</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr><td className="py-2 px-3 font-bold text-slate-900 dark:text-slate-100">WHO BMI Range</td><td className="py-2 px-3">Population reference</td><td className="py-2 px-3">Height + weight</td></tr>
                <tr><td className="py-2 px-3 font-bold text-slate-900 dark:text-slate-100">BMI 21.7 Target</td><td className="py-2 px-3">Calculator reference target</td><td className="py-2 px-3">Height</td></tr>
                <tr><td className="py-2 px-3 font-bold text-slate-900 dark:text-slate-100">Devine (1974)</td><td className="py-2 px-3">Historical IBW</td><td className="py-2 px-3">Height + sex</td></tr>
                <tr><td className="py-2 px-3 font-bold text-slate-900 dark:text-slate-100">Hamwi (1964)</td><td className="py-2 px-3">Historical IBW</td><td className="py-2 px-3">Height + sex</td></tr>
                <tr><td className="py-2 px-3 font-bold text-slate-900 dark:text-slate-100">Robinson (1983)</td><td className="py-2 px-3">Historical IBW</td><td className="py-2 px-3">Height + sex</td></tr>
                <tr><td className="py-2 px-3 font-bold text-slate-900 dark:text-slate-100">Miller (1983)</td><td className="py-2 px-3">Historical IBW</td><td className="py-2 px-3">Height + sex</td></tr>
                <tr><td className="py-2 px-3 font-bold text-slate-900 dark:text-slate-100">Peterson (2016)</td><td className="py-2 px-3">Universal BMI/height equation</td><td className="py-2 px-3">Height + selected BMI</td></tr>
                <tr><td className="py-2 px-3 font-bold text-slate-900 dark:text-slate-100">Frame-Adjusted Target</td><td className="py-2 px-3">Optional scenario</td><td className="py-2 px-3">Reference target + frame</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            The Peterson paper itself places the older Devine, Robinson, Hamwi and Miller equations alongside its universal equation, highlighting that the equations represent different approaches to defining reference body weight.
          </p>
        </section>

        {/* Section 22 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            22. Healthy Weight Calculator Limitations
          </h2>
          <p>
            This calculator is useful for reference calculations, but there are several boundaries to keep in mind:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>BMI is not a direct body-fat test.</li>
            <li>Historical IBW formulas are not personalized medical prescriptions.</li>
            <li>Frame adjustments are scenario assumptions, not universal clinical standards.</li>
            <li>Averages of several equations do not automatically become medically authoritative.</li>
            <li>Adult BMI cutoffs should not be used for children and adolescents.</li>
            <li>The calculator cannot diagnose obesity, malnutrition, metabolic disease or another medical condition.</li>
            <li>Weight loss or weight gain decisions should consider the person&apos;s full health context rather than a single calculated number.</li>
          </ul>
          <p>
            These limitations are especially important when using the result for a medical decision rather than general education.
          </p>
        </section>

        {/* Methodology & Clinical Disclaimer */}
        <section className="space-y-3 pt-2">
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Calculation Methodology
              </div>
              <p>
                Core methodology: The calculator converts height to meters and computes WHO healthy bounds (18.5 × H² to 24.9 × H²) and target weight (21.7 × H²). Historical IBW formulas evaluate height in inches above 5 feet (Devine, Hamwi, Robinson, Miller) with sex-specific constants. Peterson&apos;s 2016 equation calculates weight directly from height and target BMI 22.0. The Multi-Formula Reference Average computes the mean across all 6 models. Body-frame adjustments apply ±10% to reference targets while keeping the WHO BMI range unscaled.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Clinical / Educational Disclaimer
              </div>
              <p>
                This calculator is for educational and general planning purposes. BMI and ideal body weight equations are reference tools and do not provide a diagnosis or a universally appropriate target weight. BMI does not directly measure body fat or body composition. Adult BMI thresholds should not be used for children and adolescents, who require age- and sex-specific interpretation. For pregnancy, eating disorders, significant medical conditions, medication dosing, unexplained weight changes, or individualized nutrition and weight-management decisions, consult an appropriately qualified healthcare professional.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 2. FAQ SECTION (17 Authoritative FAQs Matching 401(k) Positioning) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {healthy_weight_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
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

export default HealthyWeightContent;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  Activity,
  Layers,
  Scale,
  Dumbbell,
  Flame,
  HeartPulse,
} from "lucide-react";
import { lean_body_mass_calculatorFaqs } from "@/app/calculators/lean-body-mass-calculator/faq";

export function LeanBodyMassContent() {
  // All 20 FAQs open by default matching the 401(k) design pattern
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: lean_body_mass_calculatorFaqs.length }, (_, i) => i))
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
      {/* MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Intro / Header */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Lean Body Mass (LBM) Calculator: Estimate Fat-Free Mass and Compare Clinical Equations
          </h2>
          <p>
            Lean body mass calculators estimate the amount of your body that is not stored as body fat. This measurement is commonly discussed as lean body mass (LBM) or fat-free mass (FFM), although modern body-composition literature recommends using more precise terminology because different measurement methods define body compartments somewhat differently.
          </p>
          <p>
            This Lean Body Mass Calculator uses established anthropometric equations based primarily on body weight, height, and biological sex, and compares multiple models rather than pretending that one equation produces a universally exact answer. For adults, the calculator compares the Boer, James, Hume, and Janmahasatian equations. For children within the calculator&apos;s pediatric age range, it uses the Peters pediatric model rather than applying adult equations indiscriminately. The underlying research comes from studies developed for estimating lean mass or fat-free mass from anthropometric measurements.
          </p>
          <p>
            The result should be treated as a model-based estimate, not as a direct measurement of muscle tissue. A person&apos;s actual body composition can differ substantially from an equation derived from population data, particularly when body size or composition is unusual.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is Lean Body Mass?
          </h2>
          <p>
            Lean body mass is a historical term used to describe the portion of body mass that is not adipose tissue. In practical calculator use, it is often treated as a close proxy for fat-free mass, but the terminology deserves care.
          </p>
          <p>
            Fat-free mass includes the body&apos;s non-fat components, including water, protein, minerals and other non-adipose material. It is not the same thing as skeletal muscle mass. A person can have a relatively high fat-free mass because of differences in muscle, body water, bone mineral and other tissues without all of that mass being contractile muscle.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <div>Body Weight = Fat Mass + Fat-Free Mass</div>
            <div>Estimated Fat Mass = Body Weight − Estimated LBM</div>
            <div>Estimated FFM = Body Weight − Estimated Fat Mass</div>
          </div>
          <p>
            This is a modeling relationship. It should not be interpreted as proof that the calculator has physically measured your muscle, body water, bone or organ mass. Recent expert-endorsed body-composition terminology recommends fat-free mass (FFM) as the more precise term, while recognizing that &ldquo;lean body mass&rdquo; remains common in older research and clinical calculators.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How This Lean Body Mass Calculator Works
          </h2>
          <p>
            The calculator begins with your basic anthropometric measurements: age, biological sex, height, and body weight. It then selects the applicable formula family based on age gating.
          </p>
          <p>
            For adults, four established equations are calculated independently: Boer (1984), James (1976), Hume (1966), and Janmahasatian (2005). The calculator reports the individual estimates and a multi-formula reference average. For children in the supported pediatric age range, the calculator uses the Peters model, rather than mixing pediatric and adult equations into one result. The Peters work was specifically developed to estimate lean body mass in children from anthropometric information and estimated extracellular fluid volume.
          </p>

          <div className="space-y-1.5">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
              Calculation Logic &amp; Routing Flowchart:
            </span>
            <pre className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-[11px] sm:text-xs overflow-x-auto text-slate-800 dark:text-slate-200 leading-snug">
{`Height + Weight + Biological Sex + Age
                  │
                  ▼
          Determine age group
            /            \\
     Adult >14          Child ≤14
         │                  │
         ▼                  ▼
  Boer / James /      Peters pediatric
  Hume / Janmahasatian       model
         │
         ▼
  Compare estimates
         │
         ▼
Multi-Formula Reference
       Estimate`}
            </pre>
          </div>
          <p>
            The purpose of comparing formulas is simple: different equations can produce different estimates for the same person because they were developed from different populations, measurements and mathematical relationships.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Lean Body Mass Formulae Used
          </h2>

          <div className="space-y-3">
            {/* Boer */}
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="block text-slate-900 dark:text-zinc-100 font-bold text-xs sm:text-sm">
                A. Boer Formula (1984)
              </strong>
              <p className="text-slate-600 dark:text-slate-400 text-xs">
                Published in 1984 in the <em>American Journal of Physiology</em> to estimate lean body mass from height and weight. The original study examined body-fluid volumes in healthy adults and evaluated estimated lean body mass as an index for normalization.
              </p>
              <div className="font-mono text-xs text-blue-700 dark:text-blue-300 pt-1">
                For men: LBM (kg) = 0.407 × Weight (kg) + 0.267 × Height (cm) − 19.2<br />
                For women: LBM (kg) = 0.252 × Weight (kg) + 0.473 × Height (cm) − 48.3
              </div>
            </div>

            {/* James */}
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="block text-slate-900 dark:text-zinc-100 font-bold text-xs sm:text-sm">
                B. James Formula (1976)
              </strong>
              <p className="text-slate-600 dark:text-slate-400 text-xs">
                A commonly used anthropometric equation. Unlike the simple linear structure of Boer and Hume, the James model contains a squared weight-to-height term, making its response to body size nonlinear.
              </p>
              <div className="font-mono text-xs text-blue-700 dark:text-blue-300 pt-1">
                For men: LBM (kg) = 1.10 × Weight (kg) − 128 × [ Weight (kg) / Height (cm) ]²<br />
                For women: LBM (kg) = 1.07 × Weight (kg) − 148 × [ Weight (kg) / Height (cm) ]²
              </div>
            </div>

            {/* Hume */}
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="block text-slate-900 dark:text-zinc-100 font-bold text-xs sm:text-sm">
                C. Hume Formula (1966)
              </strong>
              <p className="text-slate-600 dark:text-slate-400 text-xs">
                Published in 1966 in the <em>Journal of Clinical Pathology</em>. Hume developed formulas for predicting lean body mass from height and weight using body-water-related measurements as the reference basis.
              </p>
              <div className="font-mono text-xs text-blue-700 dark:text-blue-300 pt-1">
                For men: LBM (kg) = 0.32810 × Weight (kg) + 0.33929 × Height (cm) − 29.5336<br />
                For women: LBM (kg) = 0.29569 × Weight (kg) + 0.41813 × Height (cm) − 43.2933
              </div>
            </div>

            {/* Janmahasatian */}
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="block text-slate-900 dark:text-zinc-100 font-bold text-xs sm:text-sm">
                D. Janmahasatian Formula (2005)
              </strong>
              <p className="text-slate-600 dark:text-slate-400 text-xs">
                Published in 2005 in <em>Clinical Pharmacokinetics</em> as a semi-mechanistic model for estimating fat-free mass across a wider range of body sizes, where simple weight-based approaches can behave poorly.
              </p>
              <div className="font-mono text-xs text-blue-700 dark:text-blue-300 pt-1">
                For men: LBM (kg) = [ 9270 × Weight (kg) ] / [ 6680 + 216 × BMI ]<br />
                For women: LBM (kg) = [ 9270 × Weight (kg) ] / [ 8780 + 244 × BMI ]
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Why Does the Calculator Compare Several Equations?
          </h2>
          <p>
            There is no single anthropometric formula that is guaranteed to reproduce an individual&apos;s measured body composition exactly. The equations were developed in different research contexts and use different mathematical structures. Even when two formulas have similar names or are both described as &ldquo;LBM formulas,&rdquo; they can produce meaningfully different estimates.
          </p>
          <p>
            For example, the calculator&apos;s adult reference scenario (Male, age 30, 5&apos;10&quot;, 160 lb) illustrates this spread:
          </p>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 dark:bg-zinc-800/80 text-slate-800 dark:text-slate-200 font-bold">
                <tr>
                  <th className="py-2.5 px-3 border-b border-slate-200 dark:border-slate-800">Clinical Equation</th>
                  <th className="py-2.5 px-3 border-b border-slate-200 dark:border-slate-800">Estimated LBM (lbs)</th>
                  <th className="py-2.5 px-3 border-b border-slate-200 dark:border-slate-800">Estimated LBM (kg)</th>
                  <th className="py-2.5 px-3 border-b border-slate-200 dark:border-slate-800">Mathematical Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr>
                  <td className="py-2 px-3 font-semibold">Boer (1984)</td>
                  <td className="py-2 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">127.5 lb</td>
                  <td className="py-2 px-3 font-mono">57.8 kg</td>
                  <td className="py-2 px-3 text-slate-500">Linear fluid normalization</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold">James (1976)</td>
                  <td className="py-2 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">129.0 lb</td>
                  <td className="py-2 px-3 font-mono">58.5 kg</td>
                  <td className="py-2 px-3 text-slate-500">Nonlinear squared weight/height ratio</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold">Hume (1966)</td>
                  <td className="py-2 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">120.4 lb</td>
                  <td className="py-2 px-3 font-mono">54.6 kg</td>
                  <td className="py-2 px-3 text-slate-500">Total body water regression</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold">Janmahasatian (2005)</td>
                  <td className="py-2 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">127.4 lb</td>
                  <td className="py-2 px-3 font-mono">57.8 kg</td>
                  <td className="py-2 px-3 text-slate-500">Semi-mechanistic BMI scaling</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/40 font-bold">
                  <td className="py-2 px-3 text-emerald-700 dark:text-emerald-400">Multi-Formula Reference Average</td>
                  <td className="py-2 px-3 font-mono text-emerald-700 dark:text-emerald-400">126.1 lb</td>
                  <td className="py-2 px-3 font-mono text-emerald-700 dark:text-emerald-400">57.2 kg</td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">Arithmetic consensus mean</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The spread between equations is itself useful information. The calculator exposes the individual equations rather than hiding disagreement behind one unexplained number.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. How the Multi-Formula Reference Estimate Is Calculated
          </h2>
          <p>
            For adults, the calculator uses the arithmetic mean of the four adult equations:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-center text-blue-700 dark:text-blue-300 font-semibold">
            Reference LBM = (Boer + James + Hume + Janmahasatian) ÷ 4
          </div>
          <p>
            Using the 160-lb, 5&apos;10&quot; male reference scenario:
          </p>
          <p className="font-mono text-xs pl-2">
            Reference LBM ≈ (127.45 + 128.98 + 120.38 + 127.44) ÷ 4 ≈ 126.06 lb<br />
            Displayed to one decimal place: 126.1 lb (57.2 kg)
          </p>
          <p>
            This value should be interpreted as a multi-formula reference estimate, not as a clinically measured body-composition value and not as evidence that averaging formulas necessarily improves accuracy for every individual.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Adult Reference Example: 160 lb at 5&apos;10&quot;
          </h2>
          <p>
            Suppose an adult male weighs 160 lb and is 5&apos;10&quot; tall (Weight = 72.5748 kg, Height = 177.8 cm, BMI = 23.0). The calculator produces:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-mono text-xs">
            <li>Boer: 127.5 lb (57.8 kg)</li>
            <li>James: 129.0 lb (58.5 kg)</li>
            <li>Hume: 120.4 lb (54.6 kg)</li>
            <li>Janmahasatian: 127.4 lb (57.8 kg)</li>
            <li>Multi-formula reference: 126.1 lb (57.2 kg)</li>
            <li>Estimated fat mass under the two-compartment model: 160 − 126.1 ≈ 34.0 lb (21.2% Body Fat)</li>
            <li>Estimated non-fat compartment (FFM): ≈ 126.1 lb (57.2 kg)</li>
          </ul>
          <p>
            These calculations are internally consistent with <em>Fat Mass + FFM ≈ Total Body Weight</em>. The production regression verified this identity to full floating-point precision before display rounding.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Lean Body Mass vs. Fat-Free Mass vs. Skeletal Muscle Mass
          </h2>
          <p>
            The terms lean body mass, lean mass, and fat-free mass are often used interchangeably in everyday calculator content, but they are not always perfectly interchangeable in scientific measurement terminology.
          </p>
          <p>
            Modern body-composition standards recommend using fat-free mass (FFM) when referring to the complete non-fat compartment and distinguishing it from lean soft tissue (LST) and other components. For this calculator, the term LBM is retained because it corresponds to the historical equations being calculated. The resulting non-fat estimate is presented alongside FFM terminology so that users understand what the number represents.
          </p>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/50 text-xs text-amber-800 dark:text-amber-300">
            <strong>Important distinction:</strong> LBM is not skeletal muscle mass. A 150-lb person with 120 lb of estimated fat-free mass does not have 120 lb of skeletal muscle. Fat-free mass includes water, vital organs, bone mineral, blood volume, and non-adipose tissues. Skeletal muscle typically accounts for only 40% to 50% of total lean body mass.
          </div>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. What Factors Affect Estimated Lean Body Mass?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="block text-slate-900 dark:text-zinc-100 font-bold">Height</strong>
              <p className="text-slate-600 dark:text-slate-400">Height directly enters the Boer, James and Hume equations and indirectly affects Janmahasatian through BMI. Two people with identical body weights receive different LBM estimates if their heights differ.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="block text-slate-900 dark:text-zinc-100 font-bold">Body Weight</strong>
              <p className="text-slate-600 dark:text-slate-400">Body weight is a fundamental input in every adult equation. However, an increase in scale weight does not automatically mean an equivalent increase in muscle tissue.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="block text-slate-900 dark:text-zinc-100 font-bold">Biological Sex</strong>
              <p className="text-slate-600 dark:text-slate-400">The Boer, James and Hume equations have sex-specific coefficients. The same height and weight produce different estimates under male and female versions to reflect biological essential fat differences.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="block text-slate-900 dark:text-zinc-100 font-bold">Age &amp; Pediatric Gating</strong>
              <p className="text-slate-600 dark:text-slate-400">Age determines which model applies. This calculator separates pediatric (≤14) and adult (&gt;14) pathways rather than applying adult equations to growing children.</p>
            </div>
          </div>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Pediatric Lean Body Mass Estimation (Peters 2011 Model)
          </h2>
          <p>
            For children within the calculator&apos;s pediatric range, the calculator uses the Peters 2011 model. The Peters study was designed specifically to estimate lean body mass in children. The investigators first estimated extracellular fluid volume (eECV) and then converted that estimate into eLBM using a relationship derived from physiological fluid data:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <div>eECV = 0.0215 × Weight (kg)^0.6469 × Height (cm)^0.7236</div>
            <div>eLBM = 3.8 × eECV</div>
          </div>
          <p>
            The pediatric and adult pathways are not interchangeable. The calculator strictly enforces the age boundary: <strong>Age ≤14 → Peters pediatric model</strong>; <strong>Age &gt;14 → Adult equations</strong>.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Why Can Two LBM Calculators Give Different Answers?
          </h2>
          <p>
            Different websites may use different equations, unit conversions, sex-specific coefficients, rounding rules, definitions of &ldquo;lean mass,&rdquo; pediatric applicability rules, or formulas for calculating a composite estimate. A difference does not automatically mean one calculator is broken. The better question is: <em>Which equation is being used, for which population, with which variables, and how is the result interpreted?</em> That is why this calculator displays formula-level estimates instead of presenting one number without context.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Is Lean Body Mass the Same as Muscle Mass?
          </h2>
          <p>
            No. Lean body mass should not be interpreted as a direct measurement of skeletal muscle. An estimated LBM/FFM value includes non-fat body components such as water, organs, and bone matrix. Current body-composition standards specifically recommend distinguishing fat-free mass from lean soft tissue and other anatomical compartments. A muscle-focused assessment requires a measurement method capable of estimating muscle-related compartments rather than relying solely on an anthropometric equation.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. How Accurate Is a Lean Body Mass Calculator?
          </h2>
          <p>
            A lean-body-mass calculator provides an estimate, not an exact measurement. Anthropometric equations are regression models based on population data. Their performance depends on the population in which they were developed and on how closely an individual resembles the characteristics of those reference populations. For someone with an unusual body composition, very high or very low body weight, substantial muscularity, or a medical condition affecting fluid distribution, a height-and-weight equation may be less representative.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. When Should Body Composition Be Measured Directly?
          </h2>
          <p>
            An equation is useful for estimation and screening, but there are situations where a direct body-composition assessment is more appropriate. Common measurement approaches include Dual-Energy X-Ray Absorptiometry (DXA), bioelectrical impedance analysis (BIA), air-displacement plethysmography (Bod Pod), underwater weighing, and skinfold assessment. DXA, for example, is widely used for clinical assessment and can distinguish fat mass, lean soft tissue and bone mineral content. For medical decisions, medication dosing, pediatric care, eating-disorder treatment, or unexplained weight changes, an appropriately qualified healthcare professional should determine which measurement method is appropriate.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Understanding the Calculator&apos;s Result
          </h2>
          <p>
            A useful way to read the result is to separate estimate, comparison, and measurement:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Estimate:</strong> The LBM number is the mathematical output of an anthropometric equation.</li>
            <li><strong>Comparison:</strong> The formula table shows whether Boer, James, Hume and Janmahasatian are relatively close or widely separated.</li>
            <li><strong>Measurement:</strong> A physical body-composition assessment (e.g. DXA) is a separate process and should not be confused with equation output.</li>
          </ul>
          <p>
            When several equations cluster closely together, the estimates are internally more consistent. When they spread apart, that spread provides useful context and a reason to avoid treating one displayed number as exact.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Why Formula Results Should Be Viewed Together
          </h2>
          <p>
            A common mistake is to search for &ldquo;the correct LBM formula&rdquo; as though all formulas must produce the identical answer. Boer, James, Hume and Janmahasatian were developed using different research approaches and populations. Janmahasatian&apos;s model, for example, was designed as a semi-mechanistic approach across populations with extremes of body size.
          </p>
          <pre className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-[11px] sm:text-xs overflow-x-auto text-slate-800 dark:text-slate-200 leading-snug">
{`                 Estimated LBM
                      │
       ┌──────────────┼──────────────┐
       │              │              │
     Boer           James           Hume
       │              │              │
       └──────────────┼──────────────┘
                      │
                Janmahasatian
                      │
                      ▼
          Multi-Formula Reference`}
          </pre>
          <p>
            The reference average is therefore best viewed as a comparison summary, not a laboratory measurement.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. LBM Percentage and Fat Mass Relationship
          </h2>
          <p>
            When the calculator derives a percentage from estimated lean mass:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <div>LBM % = Estimated LBM ÷ Body Weight × 100</div>
            <div>Estimated Fat % = Estimated Fat Mass ÷ Body Weight × 100</div>
          </div>
          <p>
            Because both values are derived from the same estimated body compartments, they should be interpreted as model outputs rather than direct body-fat measurements from DXA or hydrostatic weighing.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Practical Uses of a Lean Body Mass Estimate
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Fitness tracking:</strong> Comparing an estimated non-fat body mass over time when the same method is used consistently.</li>
            <li><strong>Body-composition planning:</strong> Understanding how changes in total body weight relate to estimated fat and non-fat compartments.</li>
            <li><strong>Research and education:</strong> Evaluating the differences between established anthropometric prediction equations.</li>
            <li><strong>Reference calculations:</strong> Providing an estimated body-size variable when a particular physiological equation calls for it.</li>
          </ul>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            18. How to Use This Calculator Responsibly
          </h2>
          <p>
            Enter your measurements as accurately as practical, choose the appropriate unit system, and review the individual formula outputs rather than looking only at the headline number. For adults, compare the Boer, James, Hume and Janmahasatian results. For children, use the pediatric pathway provided by the calculator rather than substituting an adult equation. Treat the result as an estimate.
          </p>
          <p>
            Most importantly, do not interpret estimated LBM as a direct measurement of skeletal muscle or as a medical diagnosis. The calculator is intended for educational and planning purposes and does not replace clinical body-composition measurement or professional medical assessment.
          </p>
        </section>

        {/* Section 19: Related Calculators Grid */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            19. Related Health &amp; Body Composition Calculators
          </h2>
          <p>
            To expand your health, body composition, and metabolic profile, explore our integrated clinical calculation tools:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            <Link
              href="/calculators/bmi-calculator"
              className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-300 dark:hover:border-blue-700 transition-all flex items-start gap-2.5 group"
            >
              <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-bold text-slate-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  BMI Calculator
                </strong>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug block mt-0.5">
                  Calculate body mass index from height and weight across WHO categories.
                </span>
              </div>
            </Link>

            <Link
              href="/calculators/body-fat-calculator"
              className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-300 dark:hover:border-blue-700 transition-all flex items-start gap-2.5 group"
            >
              <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-bold text-slate-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  Body Fat Calculator
                </strong>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug block mt-0.5">
                  Estimate body-fat percentage using US Navy tape circumference measurements.
                </span>
              </div>
            </Link>

            <Link
              href="/calculators/ideal-weight-calculator"
              className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-300 dark:hover:border-blue-700 transition-all flex items-start gap-2.5 group"
            >
              <HeartPulse className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-bold text-slate-900 dark:text-zinc-100 group-hover:text-rose-600 dark:group-hover:text-rose-400">
                  Ideal Weight Calculator
                </strong>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug block mt-0.5">
                  Compare Devine, Robinson, Miller, and Hamwi ideal body weight formulas.
                </span>
              </div>
            </Link>

            <Link
              href="/calculators/bmr-calculator"
              className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-300 dark:hover:border-blue-700 transition-all flex items-start gap-2.5 group"
            >
              <Flame className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-bold text-slate-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  BMR Calculator
                </strong>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug block mt-0.5">
                  Estimate basal metabolic rate and baseline caloric expenditure.
                </span>
              </div>
            </Link>

            <Link
              href="/calculators/tdee-calculator"
              className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-300 dark:hover:border-blue-700 transition-all flex items-start gap-2.5 group"
            >
              <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-bold text-slate-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  TDEE Calculator
                </strong>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug block mt-0.5">
                  Estimate total daily energy expenditure combining BMR and physical activity.
                </span>
              </div>
            </Link>

            <Link
              href="/calculators/protein-calculator"
              className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-300 dark:hover:border-blue-700 transition-all flex items-start gap-2.5 group"
            >
              <Dumbbell className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-bold text-slate-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Protein Calculator
                </strong>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug block mt-0.5">
                  Translate body-composition and athletic goals into daily protein targets.
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* Section 20: Disclaimer & Research Basis */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            20. Calculation Methodology, Research Basis &amp; Disclaimer
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Clinical and Measurement Disclaimer
              </div>
              <p>
                This calculator provides estimated lean body mass and fat-free mass values from anthropometric equations. It does not directly measure skeletal muscle, body water, bone mineral content or adipose tissue. Results can differ from measurements obtained using DXA, bioelectrical impedance, air-displacement plethysmography, hydrostatic weighing, skinfold methods or other body-composition techniques. The calculator is intended for education, comparison and general planning, not diagnosis or individualized medical treatment. Pediatric body composition, medication dosing, eating disorders, significant illness, unusual fluid status and other specialized situations should be assessed using an appropriate professional or validated clinical method.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Published Research Basis &amp; Literature Citations
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                <li>
                  <strong>Boer, P. (1984):</strong> <em>Estimated lean body mass as an index for normalization of body fluid volumes in humans.</em> American Journal of Physiology, 247(4 Pt 2): F632–6.
                </li>
                <li>
                  <strong>James, W. P. T. (1976):</strong> <em>Research on obesity: a report of the DHSS/MRC group.</em> Department of Health and Social Security, London: HMSO.
                </li>
                <li>
                  <strong>Hume, R. (1966):</strong> <em>Prediction of lean body mass from height and weight.</em> Journal of Clinical Pathology, 19(4): 389–391.
                </li>
                <li>
                  <strong>Janmahasatian, S. et al. (2005):</strong> <em>Quantification of lean bodyweight.</em> Clinical Pharmacokinetics, 44(10): 1051–1065.
                </li>
                <li>
                  <strong>Peters, A. M. et al. (2011):</strong> <em>Estimation of lean body mass in children.</em> British Journal of Anaesthesia, 106(5): 719–723.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* FAQ SECTION (Matching 401(k) styling, all open by default, 100% schema parity) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {lean_body_mass_calculatorFaqs.map((faq, idx) => {
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

export default LeanBodyMassContent;

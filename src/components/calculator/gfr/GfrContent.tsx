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
  HeartPulse,
  Flame,
  Layers,
  Dumbbell,
  AlertTriangle,
  ArrowRight,
  Info,
} from "lucide-react";
import { gfr_calculatorFaqs } from "@/app/calculators/gfr-calculator/faq";

export function GfrContent() {
  // All 15 FAQs open by default matching the 401(k) accessibility and scannability standard
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: gfr_calculatorFaqs.length }, (_, i) => i))
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
      {/* MAIN BODY CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Intro Section */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            GFR Calculator: Estimate Glomerular Filtration Rate &amp; Kidney Function
          </h2>
          <p>
            Use this GFR Calculator to estimate your glomerular filtration rate (eGFR) from commonly used kidney-function equations. Enter serum creatinine, age and sex to calculate an estimated GFR, then compare results across additional equations where applicable.
          </p>
          <p>
            The calculator includes the 2021 CKD-EPI creatinine equation, the 2021 CKD-EPI creatinine-cystatin C equation, the 2012 CKD-EPI cystatin C equation, and selected historical or clinical comparison equations. For children, the calculator can use the Bedside Schwartz equation when pediatric inputs are appropriate. NIDDK identifies the 2021 CKD-EPI equations as race-free adult equations and notes that using both creatinine and cystatin C can improve GFR estimation when clinically appropriate.
          </p>
          <p>
            An eGFR result is an estimate rather than a direct measurement of filtration. Its interpretation depends on the equation used, laboratory measurements, age, body composition, urine albumin and the clinical context. Trends over time are often more informative than a single result.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What is GFR and eGFR?
          </h2>
          <p>
            Glomerular filtration rate (GFR) describes how quickly the kidneys filter fluid through the glomeruli. Because directly measuring GFR requires specialized clearance testing, routine clinical care generally uses estimated GFR (eGFR) calculated from biomarkers such as serum creatinine and, when available, cystatin C.
          </p>
          <p>The result is commonly reported as:</p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-sm font-bold text-blue-700 dark:text-blue-300">
            mL/min/1.73 m²
          </div>
          <p>
            The 1.73 m² represents a standardized body-surface-area reference. This allows kidney filtration estimates to be compared across people of different body sizes.
          </p>
          <p>
            The important distinction is that eGFR is a calculated estimate, not a direct laboratory measurement of filtration. Equation performance also becomes less precise at higher GFR values.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How this GFR Calculator works
          </h2>
          <p>
            The calculator accepts the laboratory and demographic information required by the selected equation and then produces the corresponding eGFR.
          </p>
          <p>
            For the current primary adult method, CKD-EPI 2021 creatinine, the equation is:
          </p>

          <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm text-blue-800 dark:text-blue-300 overflow-x-auto leading-relaxed">
            eGFR = 142 × min(SCr/κ, 1)^α × max(SCr/κ, 1)^(-1.200) × 0.9938^Age × [1.012 if female]
          </div>

          <div className="text-xs space-y-1 text-slate-600 dark:text-slate-400 pl-1">
            <p>where:</p>
            <ul className="list-disc pl-5 space-y-0.5">
              <li><strong>SCr</strong> = standardized serum creatinine in mg/dL</li>
              <li><strong>κ</strong> = 0.7 for females and 0.9 for males</li>
              <li><strong>α</strong> = -0.241 for females and -0.302 for males</li>
              <li><strong>Age</strong> is measured in years</li>
            </ul>
            <p className="pt-1">This equation does not use a race coefficient.</p>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">
              Creatinine unit conversion
            </h3>
            <p>When creatinine is supplied in SI units:</p>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-blue-700 dark:text-blue-300">
              SCr (mg/dL) = SCr (µmol/L) / 88.4
            </div>
            <p className="text-xs">
              Thus: <strong>0.9 mg/dL = 79.56 µmol/L</strong>. The calculator converts the laboratory value before applying the selected equation.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Why the calculator includes more than one GFR equation
          </h2>
          <p>
            Different estimating equations were developed for different populations, biomarkers and clinical purposes. They should therefore not be treated as interchangeable formulas that necessarily produce the same number.
          </p>

          <div className="space-y-3 pt-1">
            {/* CKD-EPI 2021 Cr */}
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-zinc-100">
                CKD-EPI 2021 creatinine
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                This is the current race-free creatinine-based adult equation and is widely used for routine adult eGFR estimation. It uses age, sex and standardized serum creatinine.
              </p>
            </div>

            {/* CKD-EPI 2021 Cr-Cys */}
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2">
              <strong className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-zinc-100">
                CKD-EPI 2021 creatinine-cystatin C
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                This equation uses both serum creatinine and cystatin C:
              </p>
              <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-lg border border-slate-200 dark:border-zinc-700 font-mono text-[11px] sm:text-xs text-blue-700 dark:text-blue-300 overflow-x-auto">
                eGFR = 135 × min(SCr/κ, 1)^α × max(SCr/κ, 1)^(-0.544) × min(Scys/0.8, 1)^(-0.323) × max(Scys/0.8, 1)^(-0.778) × 0.9961^Age × [0.963 if female]
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                NIDDK states that combined creatinine-cystatin C estimation is generally preferred when available because it can be more accurate than creatinine alone, particularly when the eGFR is close to an important clinical decision threshold.
              </p>
            </div>

            {/* CKD-EPI 2012 Cys Alone */}
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2">
              <strong className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-zinc-100">
                CKD-EPI 2012 cystatin C
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                This method estimates GFR using cystatin C rather than serum creatinine:
              </p>
              <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-lg border border-slate-200 dark:border-zinc-700 font-mono text-[11px] sm:text-xs text-blue-700 dark:text-blue-300 overflow-x-auto">
                eGFR = 133 × min(Scys/0.8, 1)^(-0.499) × max(Scys/0.8, 1)^(-1.328) × 0.996^Age × [0.932 if female]
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Cystatin C can provide useful additional information because it is influenced by different non-GFR determinants than creatinine.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. eGFR and CKD stages
          </h2>
          <p>KDIGO categorizes GFR into six categories:</p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-bold">
                <tr>
                  <th className="py-2.5 px-3 border-b border-slate-200 dark:border-slate-700">GFR category</th>
                  <th className="py-2.5 px-3 border-b border-slate-200 dark:border-slate-700">eGFR, mL/min/1.73 m²</th>
                  <th className="py-2.5 px-3 border-b border-slate-200 dark:border-slate-700">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-2 px-3 font-bold text-emerald-600 dark:text-emerald-400">G1</td>
                  <td className="py-2 px-3 font-mono font-semibold">≥90</td>
                  <td className="py-2 px-3">Normal or high</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-teal-600 dark:text-teal-400">G2</td>
                  <td className="py-2 px-3 font-mono font-semibold">60–89</td>
                  <td className="py-2 px-3">Mildly decreased</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-amber-600 dark:text-amber-400">G3a</td>
                  <td className="py-2 px-3 font-mono font-semibold">45–59</td>
                  <td className="py-2 px-3">Mildly to moderately decreased</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-orange-600 dark:text-orange-400">G3b</td>
                  <td className="py-2 px-3 font-mono font-semibold">30–44</td>
                  <td className="py-2 px-3">Moderately to severely decreased</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-rose-600 dark:text-rose-400">G4</td>
                  <td className="py-2 px-3 font-mono font-semibold">15–29</td>
                  <td className="py-2 px-3">Severely decreased</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-purple-600 dark:text-purple-400">G5</td>
                  <td className="py-2 px-3 font-mono font-semibold">&lt;15</td>
                  <td className="py-2 px-3">Kidney failure</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            These are GFR categories, not automatically diagnoses of chronic kidney disease. KDIGO specifically notes that G1 and G2 do not meet CKD criteria in the absence of evidence of kidney damage. That distinction is important when interpreting a calculator result.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. When does an eGFR result indicate CKD?
          </h2>
          <p>
            A single eGFR number does not by itself establish chronic kidney disease.
          </p>
          <p>
            The National Kidney Foundation defines CKD as an abnormality of kidney structure or function that is present for more than three months and has implications for health. CKD can be established by either:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700 dark:text-slate-300">
            <li><strong>eGFR &lt;60 mL/min/1.73 m²</strong> for more than three months, or</li>
            <li><strong>persistent evidence of kidney damage</strong>, such as albuminuria with ACR ≥30 mg/g, for more than three months.</li>
          </ul>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Therefore, someone with an eGFR of 95 is not automatically considered to have CKD, and someone with an eGFR between 60 and 89 does not automatically have CKD either. Clinical interpretation requires the patient&apos;s history, repeat testing and other evidence of kidney damage.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. eGFR and urine albumin: why both matter
          </h2>
          <p>
            Kidney function assessment is stronger when eGFR is considered alongside urine albumin-to-creatinine ratio (uACR/ACR).
          </p>
          <p>KDIGO divides albuminuria into:</p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-bold">
                <tr>
                  <th className="py-2.5 px-3 border-b border-slate-200 dark:border-slate-700">Category</th>
                  <th className="py-2.5 px-3 border-b border-slate-200 dark:border-slate-700">ACR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-2 px-3 font-bold text-emerald-600 dark:text-emerald-400">A1</td>
                  <td className="py-2 px-3 font-mono">&lt;30 mg/g</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-amber-600 dark:text-amber-400">A2</td>
                  <td className="py-2 px-3 font-mono">30–300 mg/g</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-rose-600 dark:text-rose-400">A3</td>
                  <td className="py-2 px-3 font-mono">&gt;300 mg/g</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            The G category and A category are used together to describe CKD prognosis. Someone with the same eGFR can have a substantially different risk profile depending on the amount of albumin in the urine.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            This is why the calculator&apos;s KDIGO risk grid combines eGFR categories with albuminuria categories rather than treating eGFR as the only kidney-health variable.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Why your eGFR can differ between equations
          </h2>
          <p>
            It is normal for two legitimate equations to produce somewhat different results.
          </p>
          <p>
            The equations use different biomarkers and mathematical coefficients, and creatinine itself is affected by factors beyond filtration, including muscle mass and other non-GFR determinants. NIDDK notes that the 2021 creatinine equation has limitations and that combined creatinine-cystatin C estimation can reduce some of the uncertainty.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            This is particularly relevant for people with unusual muscle mass, frailty or other conditions that make serum creatinine less representative of filtration. For these situations, the difference between equations is not necessarily evidence that one result is &ldquo;wrong.&rdquo;
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. eGFR versus Cockcroft-Gault creatinine clearance
          </h2>
          <p>
            This calculator also separates Cockcroft-Gault creatinine clearance (CrCl) from eGFR because they are not the same measurement.
          </p>
          <p>
            Cockcroft-Gault estimates creatinine clearance in <strong>mL/min</strong>, whereas standard CKD-EPI eGFR is reported in <strong>mL/min/1.73 m²</strong>.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            The two values should not be compared as if they were identical. The distinction is particularly important when a medication reference or clinical protocol specifically calls for creatinine clearance rather than indexed eGFR. The National Kidney Foundation&apos;s clinical calculator also distinguishes BSA-adjusted eGFR from unindexed values used in medication-related decisions.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Pediatric eGFR
          </h2>
          <p>
            Adult equations should not simply be applied to children. For pediatric patients, this calculator can use the Bedside Schwartz equation:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm text-blue-700 dark:text-blue-300">
            eGFR = 0.413 × [ Height(cm) / SCr(mg/dL) ]
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            The equation uses height and standardized serum creatinine and is intended for pediatric estimation. Your calculator therefore switches its population logic rather than treating a child&apos;s values as an adult CKD-EPI calculation. A mathematically valid result still needs pediatric clinical context; unusual supplied height or laboratory values can produce unusual estimates.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Example calculation
          </h2>
          <p>Consider an adult male aged 50 with:</p>
          <ul className="list-disc pl-5 space-y-0.5 text-xs">
            <li>Serum creatinine = 0.9 mg/dL</li>
            <li>Height = 5 ft 10 in</li>
            <li>Weight = 160 lb</li>
          </ul>

          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5 text-xs">
            <p>Using CKD-EPI 2021:</p>
            <div className="font-mono text-blue-700 dark:text-blue-300">
              κ = 0.9 and SCr/κ = 0.9 / 0.9 = 1
            </div>
            <p>
              which produces an estimated GFR of approximately: <strong>104 mL/min/1.73 m²</strong>.
            </p>
            <p>
              The independent Cockcroft-Gault calculation for the same profile is approximately: <strong>100.8 mL/min</strong>.
            </p>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            Those values are both consistent with the corresponding equations and, importantly, they are expressed in different units and represent different estimation concepts. The supplied calculator regression independently verified these baseline values.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. How to use the GFR Calculator
          </h2>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-0.5">
              <strong className="block font-bold text-slate-900 dark:text-zinc-100">Step 1: Enter serum creatinine</strong>
              <p className="text-slate-600 dark:text-slate-400">Use the value from your laboratory report and select the appropriate unit, either mg/dL or µmol/L.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-0.5">
              <strong className="block font-bold text-slate-900 dark:text-zinc-100">Step 2: Enter age and sex</strong>
              <p className="text-slate-600 dark:text-slate-400">Adult CKD-EPI equations use age and sex as part of the mathematical model.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-0.5">
              <strong className="block font-bold text-slate-900 dark:text-zinc-100">Step 3: Add height and weight when required</strong>
              <p className="text-slate-600 dark:text-slate-400">Height and weight are not required by the CKD-EPI creatinine equation but are relevant for equations such as Cockcroft-Gault and pediatric formulas.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-0.5">
              <strong className="block font-bold text-slate-900 dark:text-zinc-100">Step 4: Add cystatin C or uACR when available</strong>
              <p className="text-slate-600 dark:text-slate-400">Cystatin C enables additional eGFR equations, while uACR allows a more complete KDIGO risk assessment.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-0.5">
              <strong className="block font-bold text-slate-900 dark:text-zinc-100">Step 5: Compare the result</strong>
              <p className="text-slate-600 dark:text-slate-400">Review the primary eGFR, formula comparison, G category and, where sufficient information is available, the KDIGO albuminuria/eGFR risk classification.</p>
            </div>
          </div>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Why trends matter more than one isolated eGFR
          </h2>
          <p>
            An eGFR result is a point estimate with inherent uncertainty. NIDDK specifically notes that trends in eGFR are often more informative than a single value because repeated values help reveal whether kidney function is stable, declining or changing temporarily.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Changes in hydration, acute illness, laboratory variation and other non-GFR determinants can influence creatinine and therefore affect a creatinine-based eGFR. For that reason, a surprising result should be interpreted alongside previous results, urine testing and the broader clinical picture rather than in isolation.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Important limitations
          </h2>
          <p>
            This calculator provides estimated kidney filtration, not a direct measurement of GFR.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Results may be less reliable when the patient has characteristics that substantially affect serum creatinine or cystatin C independent of filtration. Equation accuracy also varies across populations and tends to become less precise at higher GFR values.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            The calculator should not be used by itself to diagnose CKD, determine dialysis eligibility, change medication doses, assess transplant eligibility or make other high-stakes treatment decisions. Clinical decisions should use the laboratory result, the appropriate equation, repeat measurements, urine albumin testing and professional medical judgment.
          </p>
        </section>

        {/* Section 14: Related Calculators */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Related Renal &amp; Metabolic Calculators
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Integrate your kidney filtration assessment with related physiological, body composition, and nutritional calculators:
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
                  Assess body mass index from height and weight across clinical WHO categories.
                </span>
              </div>
            </Link>

            <Link
              href="/calculators/body-surface-area-calculator"
              className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-300 dark:hover:border-blue-700 transition-all flex items-start gap-2.5 group"
            >
              <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-bold text-slate-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  Body Surface Area (BSA)
                </strong>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug block mt-0.5">
                  Calculate Mosteller and DuBois BSA for chemotherapy and unindexed GFR conversions.
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
                  Compare Devine, Robinson, and Peterson equations for renal medication clearance.
                </span>
              </div>
            </Link>

            <Link
              href="/calculators/calorie-calculator"
              className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-300 dark:hover:border-blue-700 transition-all flex items-start gap-2.5 group"
            >
              <Flame className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-bold text-slate-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  Calorie Calculator
                </strong>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug block mt-0.5">
                  Estimate daily caloric maintenance for cardiovascular and metabolic renal protection.
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
                  Manage dietary protein intake according to clinical CKD stages (0.6–0.8 g/kg/day).
                </span>
              </div>
            </Link>

            <Link
              href="/calculators/tdee-calculator"
              className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-300 dark:hover:border-blue-700 transition-all flex items-start gap-2.5 group"
            >
              <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-bold text-slate-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  TDEE Calculator
                </strong>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug block mt-0.5">
                  Calculate Total Daily Energy Expenditure incorporating basal rate and physical activity.
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* Section 15: Disclaimer & Sources */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Clinical Disclaimer &amp; Recommended Source References
          </h2>
          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="block font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                Clinical and Educational Disclaimer
              </strong>
              <p>
                This calculator provides mathematical estimates based on published GFR equations. It is intended for educational and reference purposes and does not diagnose kidney disease or replace professional medical evaluation. eGFR must be interpreted in clinical context, including repeat measurements, urine albumin and other evidence of kidney damage when appropriate. Medication dosing, transplant evaluation, dialysis decisions and other treatment decisions should be made using applicable clinical guidance and a qualified healthcare professional.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="block font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                Recommended Source References
              </strong>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                <li>
                  <strong>National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK):</strong> eGFR equations for adults, including CKD-EPI 2021 creatinine, creatinine-cystatin C and cystatin C equations.
                </li>
                <li>
                  <strong>National Kidney Foundation (NKF):</strong> CKD criteria and eGFR interpretation.
                </li>
                <li>
                  <strong>KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease:</strong> GFR and albuminuria categories and CKD classification.
                </li>
                <li>
                  <strong>National Kidney Foundation eGFR Calculator:</strong> clinical distinction between indexed eGFR and BSA-adjusted values and use of creatinine/cystatin C equations.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* FAQ ACCORDION SECTION (401(k) styling, all open by default, Q1..Q15 badges) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions (15 Clinical Answers)
          </h2>
        </div>

        <div className="space-y-3">
          {gfr_calculatorFaqs.map((faq, idx) => {
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

export default GfrContent;

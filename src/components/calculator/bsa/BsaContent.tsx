"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  Activity,
  Calculator,
  Scale,
  Heart,
  Flame,
  UserCheck,
} from "lucide-react";
import { bsaFaqs } from "@/app/calculators/body-surface-area-calculator/faq";

export function BsaContent() {
  // All 20 approved FAQs open by default
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

  const relatedCalculators = [
    {
      name: "BMI Calculator",
      slug: "/calculators/bmi-calculator",
      desc: "Evaluate weight-for-height body mass index and clinical category.",
      icon: Scale,
    },
    {
      name: "Lean Body Mass Calculator",
      slug: "/calculators/lean-body-mass-calculator",
      desc: "Estimate fat-free mass using Boer, James, Hume and Peters models.",
      icon: UserCheck,
    },
    {
      name: "GFR Calculator",
      slug: "/calculators/gfr-calculator",
      desc: "Estimate glomerular filtration rate via CKD-EPI 2021 & 2012 cystatin C.",
      icon: Activity,
    },
    {
      name: "Ideal Weight Calculator",
      slug: "/calculators/ideal-weight-calculator",
      desc: "Calculate ideal body weight using Devine, Robinson, Miller and Hamwi.",
      icon: Calculator,
    },
    {
      name: "BMR Calculator",
      slug: "/calculators/bmr-calculator",
      desc: "Determine basal metabolic energy expenditure using Mifflin-St Jeor.",
      icon: Flame,
    },
    {
      name: "Calories Burned Calculator",
      slug: "/calculators/calories-burned-calculator",
      desc: "Estimate physical activity expenditure using Compendium MET values.",
      icon: Heart,
    },
  ];

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* MAIN EDUCATIONAL BODY */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1: Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Body Surface Area (BSA) Calculator
          </h2>
          <p>
            This Body Surface Area (BSA) calculator estimates body surface area from height and weight and lets you compare results from several established BSA equations. The calculator includes the widely used Mosteller formula, historical equations such as Du Bois, pediatric-oriented methods such as Haycock, and additional equations used for clinical or research comparison.
          </p>
          <p>
            Enter height and body weight to calculate BSA in m². You can also switch between US and metric units without manually converting feet, inches, pounds, centimeters, or kilograms.
          </p>
          <p>
            BSA is commonly expressed in square meters and is used as a body-size descriptor in areas such as oncology, nephrology, cardiology, pharmacology, and clinical research. It is important to understand that BSA is an estimated mathematical measure of body size, not a direct measurement of the body&apos;s physical surface area.
          </p>
          <p>
            Different equations can produce slightly different results for the same person because they were derived from different populations, measurements, mathematical assumptions, and historical datasets. That is why this calculator provides a formula comparison rather than presenting one number as universally correct.
          </p>
        </section>

        {/* Section 2: Quick Answer / Feature Summary */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. Quick Answer / Feature Summary
          </h2>
          <p>
            A BSA calculator estimates body surface area in square meters (m²) from height and weight.
          </p>
          <p>
            The most commonly used simplified equation is the Mosteller formula:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-300">
            BSA (m²) = √[(Height in cm × Weight in kg) / 3600]
          </div>
          <p>
            For example, a person who is 177.8 cm tall and weighs 74.8 kg has a Mosteller BSA of approximately 1.92 m².
          </p>
          <p>
            The result can then be used as a body-size input for calculations or clinical protocols that specifically call for BSA.
          </p>
        </section>

        {/* Section 3: What Is Body Surface Area? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. What Is Body Surface Area?
          </h2>
          <p>
            Body surface area is an estimate of the external surface area of the human body. Unlike BMI, which relates body mass to height through a squared-height relationship, BSA is designed as a body-size measure that combines both height and weight.
          </p>
          <p>
            BSA is usually reported in square meters (m²). A person&apos;s BSA generally increases as body weight and height increase, although the relationship is not linear. This is why BSA equations use mathematical transformations rather than simply multiplying height and weight.
          </p>
          <p>
            BSA has historically been used in clinical contexts because it provides a standardized body-size variable that can be incorporated into calculations involving drug dosing, physiological measurements, and renal or cardiovascular normalization.
          </p>
          <p>
            The value produced by a BSA equation should therefore be interpreted as an estimate generated by a particular model, not as a laboratory measurement.
          </p>
        </section>

        {/* Section 4: The Mosteller BSA Formula */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. The Mosteller BSA Formula
          </h2>
          <p>
            The calculator&apos;s primary BSA calculation uses the simplified equation proposed by Mosteller:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-300">
            BSA (m²) = √[(Height (cm) × Weight (kg)) / 3600]
          </div>
          <p>
            The formula was published by R. D. Mosteller in 1987 as a simplified method for calculating body-surface area.
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs sm:text-sm">
            <span className="font-bold text-slate-900 dark:text-white">Example Calculation:</span>
            <p>Suppose Height = 177.8 cm and Weight = 74.84 kg.</p>
            <p className="font-mono text-blue-700 dark:text-blue-300">
              BSA = √[(177.8 × 74.84) / 3600] = √[13306.55 / 3600] = √3.6963 ≈ 1.92 m²
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-xs pt-1">
              The calculator keeps the underlying numerical calculation separate from the final displayed rounding so that downstream results remain consistent with the displayed BSA convention.
            </p>
          </div>
        </section>

        {/* Section 5: Why Are There Different BSA Formulas? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Why Are There Different BSA Formulas?
          </h2>
          <p>
            There is no single mathematical equation that must be used for every circumstance. Several BSA equations have been developed over time.
          </p>
          <p>
            This calculator allows comparison because a useful clinical question is often not simply: <em>&ldquo;What is my BSA?&rdquo;</em>, but rather: <em>&ldquo;Which BSA equation is being used, and how much does the choice of equation change the result?&rdquo;</em>
          </p>
          <p>
            The equations available in this calculator include models derived from different populations and historical periods:
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Formula</th>
                  <th className="p-3">Primary Characteristic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Mosteller</td>
                  <td className="p-3">Simplified height-weight equation</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Du Bois &amp; Du Bois</td>
                  <td className="p-3">Early historical BSA equation</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Haycock</td>
                  <td className="p-3">Developed using measurements across infants, children and adults</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Gehan &amp; George</td>
                  <td className="p-3">Alternative height-weight BSA model</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Boyd</td>
                  <td className="p-3">Historical equation using a logarithmic weight term</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Fujimoto</td>
                  <td className="p-3">Equation developed from a Japanese population</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Takahira</td>
                  <td className="p-3">Historical Japanese BSA equation</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Schlich 3D</td>
                  <td className="p-3">Modern equation based on 3D body-scan data</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Costeff</td>
                  <td className="p-3">Pediatric-oriented simplified relationship</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            The calculator&apos;s source audit documents the corresponding primary publications for these models.
          </p>
        </section>

        {/* Section 6: BSA Calculation Example */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. BSA Calculation Example
          </h2>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm">
            <span className="font-bold text-slate-900 dark:text-white">
              Example Baseline: 5 ft 10 in (177.8 cm), 165 lb (74.84 kg), 35-year-old adult
            </span>
            <p>
              Converted to metric units: Height = 177.8 cm, Weight = 74.84 kg.
            </p>
            <p>
              Using the Mosteller equation: <strong>BSA ≈ 1.92 m²</strong> (or 20.69 ft²).
            </p>
            <p>
              The calculator&apos;s canonical regression baseline produces:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
              <li><strong>Body Mass Index (BMI):</strong> approximately 23.7 kg/m²</li>
              <li><strong>Devine Ideal Body Weight:</strong> approximately 73.0 kg</li>
              <li><strong>Cardiac Index at 5.0 L/min cardiac output:</strong> approximately 2.60 L/min/m²</li>
              <li><strong>GFR normalized to 1.73 m² from 90 mL/min:</strong> approximately 81.0 mL/min/1.73 m²</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-400 pt-1 text-xs">
              Those are separate derived calculations; BSA should not be confused with BMI, absolute GFR, or cardiac output. The calculator&apos;s regression baseline confirms these relationships.
            </p>
          </div>
        </section>

        {/* Section 7: BSA in Square Meters and Square Feet */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. BSA in Square Meters and Square Feet
          </h2>
          <p>
            Clinical BSA calculations are normally expressed in m². For users who prefer imperial area units:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-300">
            1 m² ≈ 10.7639 ft² &nbsp;|&nbsp; 1.92 m² × 10.7639 ≈ 20.69 ft²
          </div>
          <p>
            The calculator provides both representations so the same underlying BSA can be viewed using either unit convention.
          </p>
        </section>

        {/* Section 8: BSA vs BMI */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. What Is the Difference Between BSA and BMI?
          </h2>
          <p>
            BSA and BMI use height and weight but answer different questions.
          </p>
          <p>
            BMI is calculated as <code>BMI = weight (kg) / height² (m²)</code>. It is primarily used as a weight-for-height screening measure.
          </p>
          <p>
            BSA is an estimated body-size measure expressed in square meters. A person can therefore have a BMI of 23.7 kg/m² and a BSA of 1.92 m² without the two values being interchangeable.
          </p>
          <p>
            BSA should not be interpreted as a replacement for BMI, and BMI should not be substituted for BSA in a protocol that specifically calls for a BSA-based calculation.
          </p>
        </section>

        {/* Section 9: BSA and Chemotherapy Dosing */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. BSA and Chemotherapy Dosing
          </h2>
          <p>
            Some antineoplastic regimens specify a dose in mg/m². In that situation, the arithmetic relationship is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-300">
            Dose (mg) = Prescribed Dose (mg/m²) × BSA (m²)
          </div>
          <p>
            For example, purely as a mathematical illustration:
          </p>
          <p className="font-mono text-slate-800 dark:text-slate-200 pl-4 border-l-2 border-blue-500">
            BSA = 1.92 m² &nbsp;|&nbsp; Protocol dose = 175 mg/m² &nbsp;→&nbsp; 1.92 × 175 ≈ 336 mg
          </p>
          <p>
            This example demonstrates the arithmetic only. It is not a recommendation for a particular drug, cancer, patient, or treatment regimen. The actual chemotherapy dose must be determined from the drug&apos;s prescribing information, treatment protocol, patient-specific factors, toxicity history, organ function, and oncology/pharmacy review.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white">
              ASCO 2021 Guideline Position on Obesity:
            </span>
            <p>
              The calculator specifically uses the uncapped relationship rather than silently imposing a universal 2.0 m² BSA ceiling. This is consistent with the 2021 ASCO guideline update (Griggs et al.), which recommends full weight-based cytotoxic chemotherapy dosing for adults with obesity rather than routine arbitrary BSA capping.
            </p>
            <p className="text-slate-600 dark:text-slate-400 pt-1">
              <em>Important clinical distinction:</em> ASCO&apos;s recommendation does not mean that every cancer drug, regimen, or clinical situation should be handled identically. Drug-specific labeling and treatment protocols can contain their own dosing instructions or modifications. That is why this calculator should be treated as a mathematical reference tool, not a prescribing system.
            </p>
          </div>
        </section>

        {/* Section 10: Carboplatin and the Calvert Formula */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Carboplatin and the Calvert Formula
          </h2>
          <p>
            Carboplatin is an important exception to the simple &ldquo;mg/m² × BSA&rdquo; concept.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-300">
            Carboplatin Dose (mg) = Target AUC × (GFR + 25)
          </div>
          <p>
            The U.S. prescribing information likewise presents the Calvert equation in this form and specifies that the resulting dose is calculated in mg, not mg/m².
          </p>
          <p>
            The original Calvert work (Calvert et al., 1989) was based on the relationship between carboplatin clearance and measured renal function. This distinction matters because a carboplatin dose should not be calculated by blindly multiplying BSA by a generic mg/m² dose.
          </p>
        </section>

        {/* Section 11: GFR Normalization */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. GFR Normalization: What Does &ldquo;mL/min/1.73 m²&rdquo; Mean?
          </h2>
          <p>
            Some renal measurements are reported relative to a standardized body surface area of 1.73 m². When converting an absolute filtration value to an indexed value, the mathematical normalization can be expressed as:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-300">
            Indexed GFR = Absolute GFR × 1.73 / BSA
          </div>
          <p>
            For example, if Absolute GFR = 90 mL/min and BSA = 1.92 m²:
          </p>
          <p className="font-mono text-slate-800 dark:text-slate-200 pl-4 border-l-2 border-blue-500">
            Indexed GFR ≈ 90 × 1.73 / 1.92 ≈ 81.0 mL/min/1.73 m²
          </p>
          <p>
            The two quantities should not be treated as interchangeable: <code>mL/min</code> is an absolute clearance value, while <code>mL/min/1.73 m²</code> is a body-size-indexed value. The calculator deliberately displays those units separately.
          </p>
        </section>

        {/* Section 12: Cardiac Index */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Cardiac Index: BSA and Hemodynamics
          </h2>
          <p>
            Cardiac index is cardiac output normalized to body surface area:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-300">
            Cardiac Index (L/min/m²) = Cardiac Output (L/min) / BSA (m²)
          </div>
          <p>
            If cardiac output is 5.0 L/min and BSA is 1.92 m²:
          </p>
          <p className="font-mono text-slate-800 dark:text-slate-200 pl-4 border-l-2 border-blue-500">
            CI = 5.0 / 1.92 ≈ 2.60 L/min/m²
          </p>
          <p>
            This calculation illustrates why BSA is sometimes used as a normalization variable in cardiovascular physiology. The cardiac index result is not a standalone diagnosis. Its interpretation depends on the clinical context and the measurement method used to obtain cardiac output.
          </p>
        </section>

        {/* Section 13: Pediatric BSA */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Pediatric BSA: Why Special Attention Is Required
          </h2>
          <p>
            Children, infants, and adults do not necessarily behave identically within a single mathematical model.
          </p>
          <p>
            The Haycock equation, for example, was developed using measurements covering infants, children, and adults. The calculator therefore includes pediatric-oriented calculations and formula comparisons rather than assuming that every equation is equally appropriate across every age group.
          </p>
          <p>
            For a child, infant, or neonate, the clinically appropriate formula and treatment protocol should be determined by the relevant pediatric reference or institutional protocol. A mathematical BSA result should not be interpreted as evidence that a pediatric medication dose is safe or appropriate.
          </p>
        </section>

        {/* Section 14: Why Your BSA May Differ Between Calculators */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Why Your BSA May Differ Between Calculators
          </h2>
          <p>
            Two calculators can return slightly different BSA values even when you enter exactly the same height and weight. Common reasons include:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Different equations:</strong> Mosteller, Du Bois, Haycock, Schlich and other models do not produce mathematically identical results.</li>
            <li><strong>Different rounding:</strong> One calculator may round height or weight before calculating, while another may preserve several decimal places internally.</li>
            <li><strong>Different unit conversion:</strong> Converting pounds to kilograms or inches to centimeters can introduce small floating-point differences if intermediate values are rounded.</li>
            <li><strong>Different population models:</strong> Some formulas were derived from specific populations or historical datasets.</li>
          </ul>
          <p>
            For that reason, a small difference between two BSA calculators does not automatically mean one calculator is broken. The important question is which formula and calculation convention each calculator uses.
          </p>
        </section>

        {/* Section 15: Formula Comparison Matrix */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Formula Comparison: Nine BSA Equations in One Place
          </h2>
          <p>
            A major advantage of this calculator is that it allows you to compare multiple equations for the same patient.
          </p>
          <p>
            For the canonical 35-year-old male, 5&apos;10&quot;, 165-lb baseline example, the independently verified results include approximately:
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Formula</th>
                  <th className="p-3">Calculated BSA</th>
                  <th className="p-3">Model Derivation Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Mosteller</td>
                  <td className="p-3 font-bold">1.92 m²</td>
                  <td className="p-3">Square root of (H × W / 3600); clinical standard</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Du Bois &amp; Du Bois</td>
                  <td className="p-3 font-bold">1.92 m²</td>
                  <td className="p-3">Classic 1916 metabolic chamber equation</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Haycock</td>
                  <td className="p-3 font-bold">1.93 m²</td>
                  <td className="p-3">Validated across infants, children and adults</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Gehan &amp; George</td>
                  <td className="p-3 font-bold">1.93 m²</td>
                  <td className="p-3">Direct anthropometric measurements (n=229)</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Boyd</td>
                  <td className="p-3 font-bold">1.93 m²</td>
                  <td className="p-3">Logarithmic weight-adjusted polynomial exponent</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Fujimoto</td>
                  <td className="p-3 font-bold">1.87 m²</td>
                  <td className="p-3">Calibrated to East Asian adult body proportions</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Takahira</td>
                  <td className="p-3 font-bold">1.94 m²</td>
                  <td className="p-3">Historical Japanese demographic standard</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Schlich Male</td>
                  <td className="p-3 font-bold">1.84 m²</td>
                  <td className="p-3">Gender-differentiated modern 3D laser scan model</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Costeff</td>
                  <td className="p-3 font-bold">1.86 m²</td>
                  <td className="p-3">Pediatric rule of thumb (designed for ≤40 kg)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            These values are useful for understanding model sensitivity: the same patient can receive different estimated BSA values depending on the selected equation. The underlying regression report verifies these formula calculations against independent mathematical evaluation.
          </p>
        </section>

        {/* Section 16: When Should You Use Mosteller? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. When Should You Use Mosteller?
          </h2>
          <p>
            Mosteller is popular partly because it is easy to calculate manually:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-300">
            BSA = √[(cm × kg) / 3600]
          </div>
          <p>
            Its simplicity makes it convenient for clinical calculators, spreadsheets, educational use, and quick verification. The original Mosteller publication specifically proposed a simplified calculation of body surface area.
          </p>
          <p>
            However, &ldquo;simple&rdquo; does not mean &ldquo;universally required.&rdquo; The correct BSA convention should follow the clinical protocol or application for which the BSA is being used.
          </p>
        </section>

        {/* Section 17: BSA Limitations & Accuracy */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. BSA Limitations: How Accurate Is a BSA Calculator?
          </h2>
          <p>
            A BSA calculator does not directly measure the body&apos;s physical surface area. It estimates BSA from mathematical relationships involving height, weight, and—in some models—specific demographic or sex-related characteristics.
          </p>
          <p>Consequently:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li>Different formulas can produce different results;</li>
            <li>A calculator cannot determine the true anatomical surface area of an individual;</li>
            <li>Rounding can create small differences;</li>
            <li>Specialized populations may require specialized methods;</li>
            <li>BSA alone does not determine a medication dose.</li>
          </ul>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            The calculator&apos;s purpose is therefore to provide a transparent, reproducible estimate based on the selected formula, not to imply laboratory-level measurement accuracy.
          </p>
        </section>

        {/* Section 18: How to Use This BSA Calculator */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            18. How to Use This BSA Calculator
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400">1. Enter Height</span>
              <p>Use feet and inches for US imperial or centimeters for metric units.</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400">2. Enter Body Weight</span>
              <p>Use pounds (lbs) or kilograms (kg). The calculator converts automatically.</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400">3. Select Calculation Mode</span>
              <p>Switch between Mosteller, Du Bois, Haycock, Chemo, CI, and GFR modules.</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400">4. Review Results</span>
              <p>View primary BSA in m² and ft², BMI, ideal weight, and formula variance.</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400">5. Explore Derived Tools</span>
              <p>Evaluate chemotherapy dose arithmetic, Calvert AUC, and hemodynamics.</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400">6. Export Your Calculation</span>
              <p>Download clinical PDF reports, export RFC-4180 CSV, or generate shareable URLs.</p>
            </div>
          </div>
        </section>

        {/* Section 19: BSA vs Body Weight for Dosing */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            19. BSA vs Body Weight for Drug Dosing
          </h2>
          <p>
            Does BSA automatically determine drug dosage? <strong>No.</strong>
          </p>
          <p>
            BSA can be one variable in a protocol, but the presence of a BSA calculation does not mean that every medication should be dosed by BSA. Different medications can use:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Fixed standard doses</li>
            <li>mg/m² of body surface area</li>
            <li>mg/kg of actual or ideal body weight</li>
            <li>AUC-based dosing (e.g. Carboplatin via the Calvert formula)</li>
            <li>Renal-function-based dosing (Cockcroft-Gault CrCl or eGFR)</li>
            <li>Regimen-specific protocols with laboratory thresholds</li>
          </ul>
          <p>
            Carboplatin is a classic example of a drug whose standard mathematical dosing approach uses the Calvert AUC equation rather than simply multiplying a dose in mg/m² by BSA.
          </p>
        </section>

        {/* Section 20: Calculation Methodology, Disclaimer & Sources */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            20. Calculation Methodology, Clinical Disclaimer &amp; Sources
          </h2>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wider text-xs">
              <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Important Medical &amp; Clinical-Use Notice
            </div>
            <p>
              This calculator provides mathematical estimates for educational, reference, and planning purposes. It is not a substitute for clinical judgment, prescribing information, institutional protocols, or professional medical care. BSA is an estimated body-size metric and different equations can produce different results. Chemotherapy and other medication doses must be independently verified against the specific drug, indication, regimen, patient characteristics, organ function, and applicable clinical guidance. Do not use this calculator by itself to select, prescribe, or alter treatment.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wider text-xs">
              <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Primary and Clinical References
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <li>
                <strong>Mosteller RD.</strong> Simplified calculation of body-surface area. <em>New England Journal of Medicine.</em> 1987; 317:1098.
              </li>
              <li>
                <strong>Du Bois D, Du Bois EF.</strong> A formula to estimate the approximate surface area if height and weight be known. <em>Archives of Internal Medicine.</em> 1916; 17:863–871.
              </li>
              <li>
                <strong>Haycock GB, Schwartz GJ, Wisotsky DH.</strong> Geometric method for measuring body surface area: A height-weight formula validated in infants, children, and adults. <em>Journal of Pediatrics.</em> 1978; 93:62–66.
              </li>
              <li>
                <strong>Griggs JJ, et al.</strong> Appropriate Systemic Therapy Dosing for Obese Adult Patients With Cancer: ASCO Guideline Update. <em>Journal of Clinical Oncology.</em> 2021; 39:2037–2048. DOI: 10.1200/JCO.21.00471.
              </li>
              <li>
                <strong>Calvert AH, et al.</strong> Carboplatin dosage: prospective evaluation of a simple formula based on renal function. <em>Journal of Clinical Oncology.</em> 1989; 7:1748–1756. DOI: 10.1200/JCO.1989.7.11.1748.
              </li>
              <li>
                <strong>U.S. DailyMed</strong> – Carboplatin Injection prescribing information. The label states the Calvert equation as Total Dose (mg) = target AUC × (GFR + 25) and distinguishes this from mg/m² dosing.
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* RELATED CALCULATORS SECTION (Positioned properly like 401k with light, crisp cards) */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Related Clinical &amp; Body Composition Calculators
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {relatedCalculators.map((c, i) => {
            const Icon = c.icon;
            return (
              <Link
                key={i}
                href={c.slug}
                className="p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-all group space-y-1.5 block"
              >
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm">
                  <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  {c.name}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                  {c.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* FAQ SECTION (20 High-Intent Questions, Open by Default, 401(k) Style) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {bsaFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800/60 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-800/40 font-normal">
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

export default BsaContent;

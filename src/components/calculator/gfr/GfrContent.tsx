"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  BookOpen,
  Sparkles,
  Activity,
  BarChart2,
} from "lucide-react";
import { gfr_calculatorFaqs } from "@/app/calculators/gfr-calculator/faq";

export function GfrContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-16 space-y-12 text-slate-800 font-sans">
      {/* Educational Content Sections */}
      <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-10">
        <div className="border-b border-slate-100 pb-6 flex items-center gap-3">
          <div className="p-3 bg-cyan-50 text-cyan-600 rounded-2xl border border-cyan-100">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              The Definitive Guide to Glomerular Filtration Rate (eGFR), CKD Staging & Kidney Health
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Medically reviewed clinical guide covering 7 GFR equations, pediatric Bedside Schwartz formula, KDIGO 2024 staging grids, and nephrology action plans.
            </p>
          </div>
        </div>

        {/* Section 1 & 2 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-cyan-600">1–2.</span> What Is Glomerular Filtration Rate (eGFR)?
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            <strong className="text-slate-900">Glomerular Filtration Rate (GFR)</strong> is the standard medical index used by nephrologists to quantify kidney filtration performance. Expressed in milliliters per minute per 1.73 square meters (mL/min/1.73 m²), GFR indicates the total flow rate of blood plasma filtered through the kidney's microscopic capillaries (glomeruli).
          </p>
        </div>

        {/* CKD Staging Spectrum Table */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-cyan-600">4–7.</span> Chronic Kidney Disease (CKD) Stages 1 through 5
          </h3>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs md:text-sm text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold">
                <tr>
                  <th className="p-3.5">CKD Stage</th>
                  <th className="p-3.5">eGFR (mL/min/1.73 m²)</th>
                  <th className="p-3.5">Clinical Classification</th>
                  <th className="p-3.5">Primary Action Plan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-cyan-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Stage 1</td>
                  <td className="p-3.5 font-bold text-emerald-700">≥ 90</td>
                  <td className="p-3.5">Normal or High Function</td>
                  <td className="p-3.5">Screen for proteinuria; control BP and blood sugar.</td>
                </tr>
                <tr className="hover:bg-cyan-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Stage 2</td>
                  <td className="p-3.5 font-bold text-teal-700">60 – 89</td>
                  <td className="p-3.5">Mildly Decreased</td>
                  <td className="p-3.5">Monitor GFR decline rate; cardiovascular risk reduction.</td>
                </tr>
                <tr className="hover:bg-cyan-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Stage 3a</td>
                  <td className="p-3.5 font-bold text-amber-700">45 – 59</td>
                  <td className="p-3.5">Mild to Moderate Reduction</td>
                  <td className="p-3.5">Evaluate anemia & bone disease; nephrology consultation.</td>
                </tr>
                <tr className="hover:bg-cyan-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Stage 3b</td>
                  <td className="p-3.5 font-bold text-orange-700">30 – 44</td>
                  <td className="p-3.5">Moderate to Severe Reduction</td>
                  <td className="p-3.5">Adjust medication dosages; aggressive BP & SGLT2i therapy.</td>
                </tr>
                <tr className="hover:bg-cyan-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Stage 4</td>
                  <td className="p-3.5 font-bold text-rose-700">15 – 29</td>
                  <td className="p-3.5">Severely Decreased</td>
                  <td className="p-3.5">Prepare for renal replacement (dialysis/transplant).</td>
                </tr>
                <tr className="hover:bg-cyan-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Stage 5</td>
                  <td className="p-3.5 font-bold text-purple-700">&lt; 15</td>
                  <td className="p-3.5">Kidney Failure (ESRD)</td>
                  <td className="p-3.5">Initiate dialysis or kidney transplantation.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 40 Interactive FAQs Accordion */}
      <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions (40 Clinical Answers)
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Comprehensive clinical responses covering eGFR equations, serum creatinine, Cystatin C, pediatric Schwartz formula, and KDIGO staging.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {gfr_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-50/80 border border-slate-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-semibold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-100/80 transition-colors"
                >
                  <span className="text-sm md:text-base flex items-center gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 font-bold">
                      Q{idx + 1}
                    </span>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-cyan-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 text-slate-700 text-xs md:text-sm leading-relaxed border-t border-slate-200 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Cross-linking Related Calculators */}
      <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <Activity className="w-6 h-6 text-cyan-600" />
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Related Health & Body Calculators
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/calculators/bmi-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-cyan-600 transition-colors flex items-center justify-between">
              BMI Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600" />
            </div>
            <p className="text-xs text-slate-500 mt-1">Body mass index evaluation.</p>
          </Link>

          <Link
            href="/calculators/ideal-weight-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors flex items-center justify-between">
              Ideal Weight Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
            </div>
            <p className="text-xs text-slate-500 mt-1">Devine, Robinson & Miller formulas.</p>
          </Link>

          <Link
            href="/calculators/tdee-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-400 hover:bg-purple-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors flex items-center justify-between">
              TDEE Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600" />
            </div>
            <p className="text-xs text-slate-500 mt-1">Total daily energy expenditure.</p>
          </Link>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex items-start gap-4 text-xs md:text-sm text-amber-900">
        <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-950 font-bold block mb-1">Clinical Nephrology Disclaimer</strong>
          This GFR calculator and educational guide are designed for clinical reference and informational purposes only. They do not constitute formal medical diagnosis or nephrology treatment orders. eGFR values should be evaluated by a board-certified physician or nephrologist in conjunction with urine tests, imaging, and physical exam findings.
        </div>
      </section>
    </div>
  );
}

export default GfrContent;

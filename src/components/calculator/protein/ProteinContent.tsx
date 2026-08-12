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
  Apple,
  Dumbbell,
  PieChart,
} from "lucide-react";
import { protein_calculatorFaqs } from "@/app/calculators/protein-calculator/faq";

export function ProteinContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-16 space-y-12 text-slate-800 font-sans">
      {/* Educational Content Sections */}
      <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-10">
        <div className="border-b border-slate-100 pb-6 flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              The Ultimate Guide to Protein Requirements, Amino Acids & Muscle Protein Synthesis
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Medically reviewed protein biochemistry, RDA baselines, essential amino acids (EAAs), Leucine trigger math, and pregnancy additions.
            </p>
          </div>
        </div>

        {/* Section 1 & 2 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600">1–2.</span> What Is Protein & Why Does It Matter?
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            <strong className="text-slate-900">Protein</strong> is a primary macronutrient built from chains of amino acids linked by peptide bonds. Protein performs structural, enzymatic, antibody, and messaging roles across human cells.
          </p>
        </div>

        {/* Functional Types of Proteins */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="bg-emerald-50/80 p-6 rounded-2xl border border-emerald-200/80 space-y-3">
            <h4 className="font-bold text-emerald-950 text-base flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-emerald-600" />
              Structural & Enzymes
            </h4>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              Collagen and actin/myosin build muscle fibers, while metabolic enzymes catalyze digestion and cellular energy production.
            </p>
          </div>

          <div className="bg-cyan-50/80 p-6 rounded-2xl border border-cyan-200/80 space-y-3">
            <h4 className="font-bold text-cyan-950 text-base flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-600" />
              Antibodies & Immune
            </h4>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              Immunoglobulins target pathogens, protecting the body against viral and bacterial infection.
            </p>
          </div>

          <div className="bg-purple-50/80 p-6 rounded-2xl border border-purple-200/80 space-y-3">
            <h4 className="font-bold text-purple-950 text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Leucine & EAAs
            </h4>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              Leucine acts as the molecular trigger for Muscle Protein Synthesis (MPS) via the mTORC1 pathway (~2.5g–3.5g per meal).
            </p>
          </div>
        </div>

        {/* Section 10 & 15: RDA & Pregnancy Additions Table */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600">10 & 15.</span> RDA Guidelines & Pregnancy/Lactation Additions
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            Recommended Dietary Allowance (RDA) minimum baselines and gestational protein additions extracted from clinical guidelines:
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs md:text-sm text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold">
                <tr>
                  <th className="p-3.5">Stage / Population</th>
                  <th className="p-3.5">Protein Needed</th>
                  <th className="p-3.5">Clinical Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-emerald-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Adult RDA Minimum</td>
                  <td className="p-3.5">0.8 g / kg (56g Men / 46g Women)</td>
                  <td className="p-3.5">Prevent nitrogen deficiency in sedentary adults</td>
                </tr>
                <tr className="hover:bg-emerald-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Pregnancy Trimester 1</td>
                  <td className="p-3.5">+1 g / day safe intake</td>
                  <td className="p-3.5">Initial blastocyst & placental expansion</td>
                </tr>
                <tr className="hover:bg-emerald-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Pregnancy Trimester 2</td>
                  <td className="p-3.5">+10 g / day safe intake</td>
                  <td className="p-3.5">Maternal blood expansion & fetal organogenesis</td>
                </tr>
                <tr className="hover:bg-emerald-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Pregnancy Trimester 3</td>
                  <td className="p-3.5">+31 g / day safe intake</td>
                  <td className="p-3.5">Rapid third-trimester fetal skeletal & tissue growth</td>
                </tr>
                <tr className="hover:bg-emerald-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Lactation First 6 Months</td>
                  <td className="p-3.5">+19 g / day safe intake</td>
                  <td className="p-3.5">Expressed breast milk protein synthesis</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 23 & 24: High-Protein Reference Values */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600">23–24.</span> High-Protein Food Reference Table
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            Reference protein content and quality classifications:
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs md:text-sm text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold">
                <tr>
                  <th className="p-3">Food Item</th>
                  <th className="p-3">Serving Size</th>
                  <th className="p-3">Protein (g)</th>
                  <th className="p-3">Calories</th>
                  <th className="p-3">Protein Quality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-emerald-50/40">
                  <td className="p-3 font-bold text-slate-900">Chicken breast, cooked</td>
                  <td className="p-3">3 oz (85g)</td>
                  <td className="p-3 font-bold text-emerald-700">26.0 g</td>
                  <td className="p-3 text-slate-900">140 kcal</td>
                  <td className="p-3 font-bold text-emerald-700">Complete Protein</td>
                </tr>
                <tr className="hover:bg-emerald-50/40">
                  <td className="p-3 font-bold text-slate-900">Lean Beef (90/10)</td>
                  <td className="p-3">3 oz (85g)</td>
                  <td className="p-3 font-bold text-emerald-700">22.0 g</td>
                  <td className="p-3 text-slate-900">175 kcal</td>
                  <td className="p-3 font-bold text-emerald-700">Complete Protein</td>
                </tr>
                <tr className="hover:bg-emerald-50/40">
                  <td className="p-3 font-bold text-slate-900">Greek Yogurt (Non-fat)</td>
                  <td className="p-3">1 cup (227g)</td>
                  <td className="p-3 font-bold text-emerald-700">23.0 g</td>
                  <td className="p-3 text-slate-900">130 kcal</td>
                  <td className="p-3 font-bold text-emerald-700">Complete Protein</td>
                </tr>
                <tr className="hover:bg-emerald-50/40">
                  <td className="p-3 font-bold text-slate-900">Tofu (Firm)</td>
                  <td className="p-3">4 oz (113g)</td>
                  <td className="p-3 font-bold text-emerald-700">11.0 g</td>
                  <td className="p-3 text-slate-900">95 kcal</td>
                  <td className="p-3 font-bold text-emerald-700">Complete Protein</td>
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
              Comprehensive responses to common questions about protein intake, RDA vs fitness targets, leucine triggers, pregnancy additions, and senior sarcopenia.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {protein_calculatorFaqs.map((faq, idx) => {
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
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                      Q{idx + 1}
                    </span>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" />
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
          <PieChart className="w-6 h-6 text-emerald-600" />
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Related Fitness & Nutrition Calculators
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/calculators/macro-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors flex items-center justify-between">
              Macro Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
            </div>
            <p className="text-xs text-slate-500 mt-1">Full macronutrient suite.</p>
          </Link>

          <Link
            href="/calculators/carbohydrate-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-cyan-600 transition-colors flex items-center justify-between">
              Carbohydrate Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600" />
            </div>
            <p className="text-xs text-slate-500 mt-1">Net carbs & glycemic load.</p>
          </Link>

          <Link
            href="/calculators/calorie-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-400 hover:bg-purple-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors flex items-center justify-between">
              Calorie Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600" />
            </div>
            <p className="text-xs text-slate-500 mt-1">Daily energy expenditure.</p>
          </Link>

          <Link
            href="/calculators/tdee-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors flex items-center justify-between">
              TDEE Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
            </div>
            <p className="text-xs text-slate-500 mt-1">Total daily energy expenditure.</p>
          </Link>

          <Link
            href="/calculators/bmr-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
              BMR Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </div>
            <p className="text-xs text-slate-500 mt-1">Basal metabolic rate.</p>
          </Link>

          <Link
            href="/calculators/fat-intake-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-rose-400 hover:bg-rose-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors flex items-center justify-between">
              Fat Intake Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600" />
            </div>
            <p className="text-xs text-slate-500 mt-1">Dietary fat target calculator.</p>
          </Link>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex items-start gap-4 text-xs md:text-sm text-amber-900">
        <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-950 font-bold block mb-1">Nutritional & Medical Disclaimer</strong>
          This protein calculator and educational content are intended for informational purposes only. They do not constitute clinical diagnosis or medical nutrition therapy. Individuals with pre-existing renal (kidney) disease or hepatic impairment must consult a board-certified nephrologist or registered dietitian (RD) before increasing protein intake.
        </div>
      </section>
    </div>
  );
}

export default ProteinContent;

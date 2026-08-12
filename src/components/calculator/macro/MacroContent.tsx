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
import { macro_calculatorFaqs } from "@/app/calculators/macro-calculator/faq";

export function MacroContent() {
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
              The Ultimate Guide to Macronutrients, Calorie Targets & Precision Nutrition
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Medically reviewed energy expenditure principles, BMR formulas, protein synthesis, carbohydrate metabolism, and macro ratios.
            </p>
          </div>
        </div>

        {/* Section 1 & 2 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600">1–2.</span> What Are Macronutrients & Macro Calculators?
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            <strong className="text-slate-900">Macronutrients</strong> (macros) are the foundational energy-yielding organic compounds that humans consume in large daily quantities to sustain life, repair muscle tissue, and fuel metabolic activity. The three primary macros are <strong className="text-emerald-700">Protein</strong> (4 kcal/g), <strong className="text-blue-700">Carbohydrates</strong> (4 kcal/g), and <strong className="text-purple-700">Dietary Fats</strong> (9 kcal/g).
          </p>
        </div>

        {/* Section 3 to 6: Macronutrient Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="bg-emerald-50/80 p-6 rounded-2xl border border-emerald-200/80 space-y-3">
            <h4 className="font-bold text-emerald-950 text-base flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-emerald-600" />
              Protein (4 kcal/g)
            </h4>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              Composed of essential amino acids (EAAs like Leucine). Critical for muscle protein synthesis (MPS), tissue repair, enzyme creation, and satiety.
            </p>
          </div>

          <div className="bg-blue-50/80 p-6 rounded-2xl border border-blue-200/80 space-y-3">
            <h4 className="font-bold text-blue-950 text-base flex items-center gap-2">
              <Apple className="w-5 h-5 text-blue-600" />
              Carbohydrates (4 kcal/g)
            </h4>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              Digested into glucose to supply central nervous system fuel and replenish glycogen stores for high-intensity exercise.
            </p>
          </div>

          <div className="bg-purple-50/80 p-6 rounded-2xl border border-purple-200/80 space-y-3">
            <h4 className="font-bold text-purple-950 text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Dietary Fat (9 kcal/g)
            </h4>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              Provides essential fatty acids (Omega-3 & Omega-6) for testosterone/estrogen hormone production and fat-soluble vitamin absorption (A, D, E, K).
            </p>
          </div>
        </div>

        {/* Section 10 & 11: BMR & TDEE Clinical Formulas */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600">10–11.</span> Clinical BMR & TDEE Equations
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            Basal Metabolic Rate (BMR) measures baseline cellular energy expenditure over 24 hours. Total Daily Energy Expenditure (TDEE) factors in physical activity multipliers:
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs md:text-sm text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold">
                <tr>
                  <th className="p-3.5">Formula Name</th>
                  <th className="p-3.5">Mathematical Equation</th>
                  <th className="p-3.5">Clinical Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-emerald-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Mifflin-St Jeor</td>
                  <td className="p-3.5">10W + 6.25H - 5A + 5 (Male) / -161 (Female)</td>
                  <td className="p-3.5">Gold standard for general population without body fat data</td>
                </tr>
                <tr className="hover:bg-emerald-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Katch-McArdle</td>
                  <td className="p-3.5">370 + 21.6 × LBM (kg)</td>
                  <td className="p-3.5">Superior accuracy for lean & athletic individuals</td>
                </tr>
                <tr className="hover:bg-emerald-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Cunningham</td>
                  <td className="p-3.5">500 + 22 × LBM (kg)</td>
                  <td className="p-3.5">Optimized for high-performance athletic populations</td>
                </tr>
                <tr className="hover:bg-emerald-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Harris-Benedict</td>
                  <td className="p-3.5">66.5 + 13.75W + 5.003H - 6.755A (Male)</td>
                  <td className="p-3.5">Classic clinical baseline equation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 25: Macronutrient Food Reference Table */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600">25.</span> Macronutrients in Common Foods
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            Reference macronutrient values extracted from standard clinical food databases:
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs md:text-sm text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold">
                <tr>
                  <th className="p-3">Food Item</th>
                  <th className="p-3">Serving Size</th>
                  <th className="p-3">Protein (g)</th>
                  <th className="p-3">Carbs (g)</th>
                  <th className="p-3">Fat (g)</th>
                  <th className="p-3">Calories</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-emerald-50/40">
                  <td className="p-3 font-bold text-slate-900">Chicken breast, cooked</td>
                  <td className="p-3">2 oz.</td>
                  <td className="p-3 font-bold text-emerald-700">16.0g</td>
                  <td className="p-3 font-bold text-blue-700">0.0g</td>
                  <td className="p-3 font-bold text-purple-700">1.84g</td>
                  <td className="p-3">82 kcal</td>
                </tr>
                <tr className="hover:bg-emerald-50/40">
                  <td className="p-3 font-bold text-slate-900">Beef regular, cooked</td>
                  <td className="p-3">2 oz.</td>
                  <td className="p-3 font-bold text-emerald-700">14.2g</td>
                  <td className="p-3 font-bold text-blue-700">0.0g</td>
                  <td className="p-3 font-bold text-purple-700">10.4g</td>
                  <td className="p-3">151 kcal</td>
                </tr>
                <tr className="hover:bg-emerald-50/40">
                  <td className="p-3 font-bold text-slate-900">Apple</td>
                  <td className="p-3">1 (4 oz.)</td>
                  <td className="p-3 font-bold text-emerald-700">0.27g</td>
                  <td className="p-3 font-bold text-blue-700">14.36g</td>
                  <td className="p-3 font-bold text-purple-700">0.18g</td>
                  <td className="p-3">59 kcal</td>
                </tr>
                <tr className="hover:bg-emerald-50/40">
                  <td className="p-3 font-bold text-slate-900">Banana</td>
                  <td className="p-3">1 (6 oz.)</td>
                  <td className="p-3 font-bold text-emerald-700">1.85g</td>
                  <td className="p-3 font-bold text-blue-700">38.85g</td>
                  <td className="p-3 font-bold text-purple-700">0.56g</td>
                  <td className="p-3">168 kcal</td>
                </tr>
                <tr className="hover:bg-emerald-50/40">
                  <td className="p-3 font-bold text-slate-900">Broccoli</td>
                  <td className="p-3">1 cup</td>
                  <td className="p-3 font-bold text-emerald-700">2.57g</td>
                  <td className="p-3 font-bold text-blue-700">6.04g</td>
                  <td className="p-3 font-bold text-purple-700">0.34g</td>
                  <td className="p-3">31 kcal</td>
                </tr>
                <tr className="hover:bg-emerald-50/40">
                  <td className="p-3 font-bold text-slate-900">Subway Turkey Sandwich</td>
                  <td className="p-3">6 inch</td>
                  <td className="p-3 font-bold text-emerald-700">18.0g</td>
                  <td className="p-3 font-bold text-blue-700">46.0g</td>
                  <td className="p-3 font-bold text-purple-700">3.5g</td>
                  <td className="p-3">280 kcal</td>
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
              Comprehensive responses to common questions about protein requirements, BMR formulas, TDEE, keto macros, IIFYM, and fat loss plateaus.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {macro_calculatorFaqs.map((faq, idx) => {
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
            href="/calculators/calorie-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors flex items-center justify-between">
              Calorie Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
            </div>
            <p className="text-xs text-slate-500 mt-1">Estimate daily caloric expenditure.</p>
          </Link>

          <Link
            href="/calculators/bmr-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-400 hover:bg-purple-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors flex items-center justify-between">
              BMR Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600" />
            </div>
            <p className="text-xs text-slate-500 mt-1">Calculate resting metabolic rate.</p>
          </Link>

          <Link
            href="/calculators/bmi-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
              BMI Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </div>
            <p className="text-xs text-slate-500 mt-1">Body mass index classification.</p>
          </Link>

          <Link
            href="/calculators/body-fat-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-rose-400 hover:bg-rose-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors flex items-center justify-between">
              Body Fat Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600" />
            </div>
            <p className="text-xs text-slate-500 mt-1">Body composition assessment.</p>
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
            href="/calculators/ideal-weight-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors flex items-center justify-between">
              Ideal Weight Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
            </div>
            <p className="text-xs text-slate-500 mt-1">Target healthy weight ranges.</p>
          </Link>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex items-start gap-4 text-xs md:text-sm text-amber-900">
        <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-950 font-bold block mb-1">Nutritional & Medical Disclaimer</strong>
          This macro calculator and educational content are intended for informational and fitness planning purposes only. They do not constitute medical nutrition therapy or clinical diagnosis. Individual energy expenditure varies. Consult a registered dietitian (RD) or physician before initiating drastic dietary changes.
        </div>
      </section>
    </div>
  );
}

export default MacroContent;

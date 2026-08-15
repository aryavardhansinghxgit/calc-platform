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
import { carbohydrate_calculatorFaqs } from "@/app/calculators/carbohydrate-calculator/faq";

export function CarbohydrateContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-16 space-y-12 text-slate-800 font-sans">
      {/* Educational Content Sections */}
      <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-10">
        <div className=" pb-6 flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-cyan-100">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue-600">
              The Ultimate Guide to Carbohydrates, Net Carbs, Glycemic Load & Metabolic Health
            </h2>
            <p className="text-sm text-slate-900 mt-1">
              Medically reviewed carbohydrate biochemistry, Net Carbs calculation, Glycemic Index (GI), Glycemic Load (GL), BMR equations, and carb cycling schedules.
            </p>
          </div>
        </div>

        {/* Section 1 & 2 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <span className="text-blue-600">1–2.</span> What Are Carbohydrates & Why Do They Matter?
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            <strong className="text-slate-900">Carbohydrates</strong> are organic biomolecules composed of carbon, hydrogen, and oxygen atoms ($C_n(H_2O)_n$). They are the body&apos;s principal energy source, digested into <strong className="text-blue-600">glucose</strong> to fuel brain function, central nervous system activity, and muscular exercise.
          </p>
        </div>

        {/* Section 3 to 6: Types of Carbs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="bg-blue-50/80 p-6 rounded-2xl border border-cyan-200/80 space-y-3">
            <h4 className="font-bold text-cyan-950 text-base flex items-center gap-2">Simple Sugars
            </h4>
            <p className="text-xs md:text-sm text-slate-900 leading-relaxed">
              Monosaccharides and disaccharides (glucose, fructose, sucrose) that digest rapidly, spiking blood sugar and insulin.
            </p>
          </div>

          <div className="bg-blue-50/80 p-6 rounded-2xl border border-emerald-200/80 space-y-3">
            <h4 className="font-bold text-emerald-950 text-base flex items-center gap-2">Complex Starches
            </h4>
            <p className="text-xs md:text-sm text-slate-900 leading-relaxed">
              Long-chain glucose polymers found in oats, brown rice, sweet potatoes, and legumes that provide sustained energy.
            </p>
          </div>

          <div className="bg-blue-50/80 p-6 rounded-2xl border border-purple-200/80 space-y-3">
            <h4 className="font-bold text-purple-950 text-base flex items-center gap-2">Dietary Fiber
            </h4>
            <p className="text-xs md:text-sm text-slate-900 leading-relaxed">
              Non-digestible carbohydrates essential for gut microbiome health, cholesterol management, and lowering Net Carbs.
            </p>
          </div>
        </div>

        {/* Section 14 to 16: GI, GL & Net Carbs Table */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <span className="text-blue-600">14–16.</span> Glycemic Index (GI), Glycemic Load (GL) & Net Carbs
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            Glycemic Index measures blood sugar speed, while Glycemic Load measures serving size impact. Net Carbs subtract non-digestible fiber:
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs md:text-sm text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold">
                <tr>
                  <th className="p-3.5">Concept</th>
                  <th className="p-3.5">Formula / Scale</th>
                  <th className="p-3.5">Clinical Classification</th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Glycemic Index (GI)</td>
                  <td className="p-3.5">Scale 0 to 100 relative to pure glucose</td>
                  <td className="p-3.5">Low (≤55), Medium (56-69), High (≥70)</td>
                </tr>
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Glycemic Load (GL)</td>
                  <td className="p-3.5">(GI × Net Carbs in grams) / 100</td>
                  <td className="p-3.5">Low (≤10), Medium (11-19), High (≥20)</td>
                </tr>
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Net Carbs</td>
                  <td className="p-3.5">Total Carbs - Fiber - Sugar Alcohols</td>
                  <td className="p-3.5">Digestible carbohydrates impacting insulin</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 24: Carbohydrate Food Reference Table */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <span className="text-blue-600">24.</span> Carbohydrate & Glycemic Reference Values
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            Reference nutritional values extracted from standard food glycemic databases:
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs md:text-sm text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold">
                <tr>
                  <th className="p-3">Food Item</th>
                  <th className="p-3">Serving Size</th>
                  <th className="p-3">Total Carbs (g)</th>
                  <th className="p-3">Fiber (g)</th>
                  <th className="p-3">Net Carbs (g)</th>
                  <th className="p-3">GI (Category)</th>
                  <th className="p-3">GL</th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3 font-bold text-slate-900">Apple</td>
                  <td className="p-3">1 medium (150g)</td>
                  <td className="p-3 font-bold text-blue-600">19.1g</td>
                  <td className="p-3 font-bold text-blue-600">3.3g</td>
                  <td className="p-3 font-bold text-blue-700">15.8g</td>
                  <td className="p-3">36 (Low)</td>
                  <td className="p-3 font-bold text-slate-900">6</td>
                </tr>
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3 font-bold text-slate-900">Banana</td>
                  <td className="p-3">1 medium (118g)</td>
                  <td className="p-3 font-bold text-blue-600">27.0g</td>
                  <td className="p-3 font-bold text-blue-600">3.1g</td>
                  <td className="p-3 font-bold text-blue-700">23.9g</td>
                  <td className="p-3">51 (Low)</td>
                  <td className="p-3 font-bold text-slate-900">12</td>
                </tr>
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3 font-bold text-slate-900">Rolled Oats</td>
                  <td className="p-3">1 cup cooked (234g)</td>
                  <td className="p-3 font-bold text-blue-600">28.1g</td>
                  <td className="p-3 font-bold text-blue-600">4.0g</td>
                  <td className="p-3 font-bold text-blue-700">24.1g</td>
                  <td className="p-3">55 (Low)</td>
                  <td className="p-3 font-bold text-slate-900">13</td>
                </tr>
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3 font-bold text-slate-900">Black Beans</td>
                  <td className="p-3">1 cup cooked (172g)</td>
                  <td className="p-3 font-bold text-blue-600">40.8g</td>
                  <td className="p-3 font-bold text-blue-600">15.0g</td>
                  <td className="p-3 font-bold text-blue-700">25.8g</td>
                  <td className="p-3">30 (Low)</td>
                  <td className="p-3 font-bold text-slate-900">8</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 40 Interactive FAQs Accordion */}
      <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <div className="flex items-center gap-3  pb-6">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-purple-100">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue-600">
              Frequently Asked Questions (40 Clinical Answers)
            </h2>
            <p className="text-sm text-slate-900 mt-1">
              Comprehensive responses to common questions about carbohydrate targets, Net Carbs, Glycemic Index, GI vs GL, keto, and sports carb loading.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {carbohydrate_calculatorFaqs.map((faq, idx) => {
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
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-cyan-200 font-bold">
                      Q{idx + 1}
                    </span>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 text-slate-700 text-xs md:text-sm leading-relaxed  bg-white">
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
        <div className="flex items-center gap-3  pb-4">
          <PieChart className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl md:text-2xl font-bold text-blue-600">
            Related Fitness & Nutrition Calculators
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/calculators/macro-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-cyan-400 hover:bg-blue-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
              Macro Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </div>
            <p className="text-xs text-slate-900 mt-1">Full macronutrient suite.</p>
          </Link>

          <Link
            href="/calculators/calorie-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-blue-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
              Calorie Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </div>
            <p className="text-xs text-slate-900 mt-1">Daily energy expenditure.</p>
          </Link>

          <Link
            href="/calculators/protein-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-400 hover:bg-blue-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
              Protein Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </div>
            <p className="text-xs text-slate-900 mt-1">Protein targets for muscle.</p>
          </Link>

          <Link
            href="/calculators/tdee-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-blue-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
              TDEE Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </div>
            <p className="text-xs text-slate-900 mt-1">Total daily energy expenditure.</p>
          </Link>

          <Link
            href="/calculators/bmr-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
              BMR Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </div>
            <p className="text-xs text-slate-900 mt-1">Basal metabolic rate.</p>
          </Link>

          <Link
            href="/calculators/fat-intake-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-rose-400 hover:bg-blue-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
              Fat Intake Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </div>
            <p className="text-xs text-slate-900 mt-1">Dietary fat target calculator.</p>
          </Link>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="bg-blue-50 border border-amber-200 p-6 rounded-2xl flex items-start gap-4 text-xs md:text-sm text-amber-900">
        <ShieldAlert className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-950 font-bold block mb-1">Nutritional & Medical Disclaimer</strong>
          This carbohydrate calculator and educational guide are intended for informational purposes only. They do not constitute clinical diagnosis or medical nutrition therapy. Individual carbohydrate tolerance and blood glucose response vary. Consult a board-certified endocrinologist or registered dietitian (RD) for personalized diabetic or metabolic care.
        </div>
      </section>
    </div>
  );
}

export default CarbohydrateContent;

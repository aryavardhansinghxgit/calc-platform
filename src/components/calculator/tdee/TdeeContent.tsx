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
  Flame,
  PieChart,
} from "lucide-react";
import { tdee_calculatorFaqs } from "@/app/calculators/tdee-calculator/faq";

export function TdeeContent() {
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
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              The Definitive Guide to Total Daily Energy Expenditure (TDEE) & Metabolism
            </h2>
            <p className="text-sm text-slate-900 mt-1">
              Medically reviewed metabolic breakdown, 7 clinical BMR formulas, NEAT step count adjustments, and 12-week weight trajectory modeling.
            </p>
          </div>
        </div>

        {/* Section 1 & 2 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-blue-600">1–2.</span> What Is TDEE & Why Does It Matter?
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            <strong className="text-slate-900">Total Daily Energy Expenditure (TDEE)</strong> is the sum total of all calories (or kilojoules) your body burns in a 24-hour day. TDEE is the master baseline for fat loss, muscle gain, and weight maintenance.
          </p>
        </div>

        {/* 4 Metabolic Components Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          <div className="bg-blue-50/80 p-5 rounded-2xl border border-cyan-200/80 space-y-2">
            <h4 className="font-bold text-cyan-950 text-sm flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-blue-600" />
              BMR (~60-70%)
            </h4>
            <p className="text-xs text-slate-900 leading-relaxed">
              Basal Metabolic Rate required for organ function at rest.
            </p>
          </div>

          <div className="bg-blue-50/80 p-5 rounded-2xl border border-emerald-200/80 space-y-2">
            <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              NEAT (~15-20%)
            </h4>
            <p className="text-xs text-slate-900 leading-relaxed">
              Non-exercise movement like walking, standing, and daily steps.
            </p>
          </div>

          <div className="bg-blue-50/80 p-5 rounded-2xl border border-amber-200/80 space-y-2">
            <h4 className="font-bold text-amber-950 text-sm flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-blue-600" />
              EAT (~10-15%)
            </h4>
            <p className="text-xs text-slate-900 leading-relaxed">
              Deliberate workout exercise (gym, running, cycling).
            </p>
          </div>

          <div className="bg-blue-50/80 p-5 rounded-2xl border border-purple-200/80 space-y-2">
            <h4 className="font-bold text-purple-950 text-sm flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              TEF (~10%)
            </h4>
            <p className="text-xs text-slate-900 leading-relaxed">
              Thermic Effect of Food required to digest macronutrients.
            </p>
          </div>
        </div>

        {/* Section 8 & 9: Activity Multiplier Reference Table */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-blue-600">8–9.</span> Physical Activity Level (PAL) Multipliers
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            Standard clinical activity multipliers applied to Basal Metabolic Rate:
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs md:text-sm text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold">
                <tr>
                  <th className="p-3.5">Activity Category</th>
                  <th className="p-3.5">Multiplier</th>
                  <th className="p-3.5">Exercise Frequency & Step Baseline</th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Sedentary</td>
                  <td className="p-3.5 font-bold text-blue-600">1.20</td>
                  <td className="p-3.5">Desk job, little exercise (&lt; 5,000 steps/day)</td>
                </tr>
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Lightly Active</td>
                  <td className="p-3.5 font-bold text-blue-600">1.375</td>
                  <td className="p-3.5">Light exercise 1-3 times/week (5,000 – 7,500 steps/day)</td>
                </tr>
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Moderately Active</td>
                  <td className="p-3.5 font-bold text-blue-600">1.55</td>
                  <td className="p-3.5">Moderate exercise 4-5 times/week (7,500 – 10,000 steps/day)</td>
                </tr>
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Very Active</td>
                  <td className="p-3.5 font-bold text-blue-600">1.725</td>
                  <td className="p-3.5">Intense exercise 6-7 times/week (10,000 – 12,500 steps/day)</td>
                </tr>
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Competitive Athlete</td>
                  <td className="p-3.5 font-bold text-blue-600">2.10</td>
                  <td className="p-3.5">Professional training 2+ sessions/day (15,000+ steps)</td>
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
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions (40 Clinical Answers)
            </h2>
            <p className="text-sm text-slate-900 mt-1">
              Comprehensive responses to common questions about TDEE, BMR, NEAT, TEF, calories vs kilojoules, and weight projections.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {tdee_calculatorFaqs.map((faq, idx) => {
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
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Related Fitness & Metabolism Calculators
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/calculators/calorie-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-cyan-400 hover:bg-blue-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
              Calorie Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </div>
            <p className="text-xs text-slate-900 mt-1">Daily energy expenditure.</p>
          </Link>

          <Link
            href="/calculators/bmr-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-blue-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
              BMR Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </div>
            <p className="text-xs text-slate-900 mt-1">Basal metabolic rate equations.</p>
          </Link>

          <Link
            href="/calculators/macro-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-400 hover:bg-blue-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
              Macro Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </div>
            <p className="text-xs text-slate-900 mt-1">Full macronutrient suite.</p>
          </Link>

          <Link
            href="/calculators/protein-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-blue-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
              Protein Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </div>
            <p className="text-xs text-slate-900 mt-1">Muscle building & leucine targets.</p>
          </Link>

          <Link
            href="/calculators/carbohydrate-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
              Carbohydrate Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </div>
            <p className="text-xs text-slate-900 mt-1">Net carbs & glycemic load.</p>
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
          <strong className="text-amber-950 font-bold block mb-1">Nutritional & Metabolic Disclaimer</strong>
          This TDEE calculator and educational content are intended for informational purposes only. They do not constitute medical diagnosis or clinical dietetics. Individuals with metabolic disorders, thyroid conditions, or eating disorders should consult a board-certified endocrinologist or registered dietitian (RD).
        </div>
      </section>
    </div>
  );
}

export default TdeeContent;

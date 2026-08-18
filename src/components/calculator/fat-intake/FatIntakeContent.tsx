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
  Flame,
  PieChart,
} from "lucide-react";
import { fat_intake_calculatorFaqs } from "@/app/calculators/fat-intake-calculator/faq";

export function FatIntakeContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-16 space-y-12 text-slate-800 font-sans">
      {/* Educational Content Sections */}
      <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-10">
        <div className=" pb-6 flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-rose-100">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue-600">
              The Comprehensive Guide to Dietary Fat Intake, Fatty Acid Sub-Types & Cardiovascular Health
            </h2>
            <p className="text-sm text-slate-900 mt-1">
              Medically reviewed fat digestion biochemistry, saturated fat safety limits, monounsaturated/polyunsaturated fatty acids, Omega-3 targets, and age guidelines.
            </p>
          </div>
        </div>

        {/* Section 1 & 2 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <span className="text-blue-600">1–2.</span> What Is Dietary Fat & Why Is It Essential?
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            <strong className="text-slate-900">Dietary fat</strong> (lipids) is an obligate macronutrient yielding 9 calories per gram. Fats form cellular membranes, synthesize endocrine hormones (testosterone and estrogen), absorb fat-soluble vitamins (A, D, E, K), and insulate neural axons.
          </p>
        </div>

        {/* Fatty Acid Types Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="bg-blue-50/80 p-6 rounded-2xl border border-emerald-200/80 space-y-3">
            <h4 className="font-bold text-emerald-950 text-base flex items-center gap-2">Monounsaturated (MUFA)
            </h4>
            <p className="text-xs md:text-sm text-slate-900 leading-relaxed">
              Found in extra virgin olive oil and avocados. Lowers harmful LDL cholesterol while preserving protective HDL cholesterol.
            </p>
          </div>

          <div className="bg-blue-50/80 p-6 rounded-2xl border border-cyan-200/80 space-y-3">
            <h4 className="font-bold text-cyan-950 text-base flex items-center gap-2">Polyunsaturated (PUFA) & Omega-3
            </h4>
            <p className="text-xs md:text-sm text-slate-900 leading-relaxed">
              EPA and DHA from wild salmon reduce triglycerides, decrease systemic inflammation, and support brain cell membrane fluidity.
            </p>
          </div>

          <div className="bg-blue-50/80 p-6 rounded-2xl border border-rose-200/80 space-y-3">
            <h4 className="font-bold text-rose-950 text-base flex items-center gap-2">Saturated Fat Limits
            </h4>
            <p className="text-xs md:text-sm text-slate-900 leading-relaxed">
              Limit saturated fat to &lt;10% of daily calories (&lt;7% according to the AHA for cardiovascular risk reduction).
            </p>
          </div>
        </div>

        {/* Section 18 & 19: Fat Intake by Age Table (Reference from PDF) */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <span className="text-blue-600">18–19.</span> Fat Intake Guidelines by Age Bracket
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            Reference guidelines for daily fat intake percentages extracted from clinical literature:
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs md:text-sm text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold">
                <tr>
                  <th className="p-3.5">Age Group</th>
                  <th className="p-3.5">Suggested Fat Intake Limit (% of Total Calories)</th>
                  <th className="p-3.5">Clinical Focus</th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Age 2 – 3 Years</td>
                  <td className="p-3.5 font-bold text-blue-600">30% to 40% of Total Calories</td>
                  <td className="p-3.5">Critical nervous system & neural sheath myelination</td>
                </tr>
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Age 4 – 18 Years</td>
                  <td className="p-3.5 font-bold text-blue-600">25% to 35% of Total Calories</td>
                  <td className="p-3.5">Pediatric growth & endocrine hormone maturation</td>
                </tr>
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Age 19+ Years (Adults)</td>
                  <td className="p-3.5 font-bold text-blue-600">20% to 35% of Total Calories</td>
                  <td className="p-3.5">Standard AMDR adult energy balance & lipid control</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 25: Healthy Fat Food Reference Table */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <span className="text-blue-600">25.</span> Healthy Fat Food Reference Values
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            Fatty acid profiles for healthy food sources:
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs md:text-sm text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold">
                <tr>
                  <th className="p-3">Food Item</th>
                  <th className="p-3">Serving Size</th>
                  <th className="p-3">Total Fat</th>
                  <th className="p-3">Saturated Fat</th>
                  <th className="p-3">MUFA</th>
                  <th className="p-3">Calories</th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3 font-bold text-slate-900">Extra Virgin Olive Oil</td>
                  <td className="p-3">1 tbsp (14g)</td>
                  <td className="p-3 font-bold text-blue-600">14.0 g</td>
                  <td className="p-3 text-blue-600 font-bold">1.9 g</td>
                  <td className="p-3 text-blue-600 font-bold">9.9 g</td>
                  <td className="p-3 text-slate-900">119 kcal</td>
                </tr>
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3 font-bold text-slate-900">Avocado</td>
                  <td className="p-3">1 medium (150g)</td>
                  <td className="p-3 font-bold text-blue-600">21.0 g</td>
                  <td className="p-3 text-blue-600 font-bold">3.1 g</td>
                  <td className="p-3 text-blue-600 font-bold">14.7 g</td>
                  <td className="p-3 text-slate-900">240 kcal</td>
                </tr>
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3 font-bold text-slate-900">Wild Salmon, cooked</td>
                  <td className="p-3">3 oz (85g)</td>
                  <td className="p-3 font-bold text-blue-600">11.0 g</td>
                  <td className="p-3 text-blue-600 font-bold">2.1 g</td>
                  <td className="p-3 text-blue-600 font-bold">3.8 g</td>
                  <td className="p-3 text-slate-900">175 kcal</td>
                </tr>
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3 font-bold text-slate-900">Walnuts</td>
                  <td className="p-3">1 oz (28g)</td>
                  <td className="p-3 font-bold text-blue-600">18.5 g</td>
                  <td className="p-3 text-blue-600 font-bold">1.7 g</td>
                  <td className="p-3 text-blue-600 font-bold">2.5 g</td>
                  <td className="p-3 text-slate-900">185 kcal</td>
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
              Comprehensive responses to common questions about dietary fat intake, saturated fat limits, trans fats, omega-3 targets, and keto diet ratios.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {fat_intake_calculatorFaqs.map((faq, idx) => {
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
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-rose-200 font-bold">
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

      {/* Related Calculators */}
      <div className="space-y-2 pt-6">
        <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Related Calculators
        </h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-semibold">
          <Link
            href="/calculators/macro-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Macro Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/carbohydrate-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Carbohydrate Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/protein-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Protein Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/calorie-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Calorie Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/tdee-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            TDEE Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/bmr-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            BMR Calculator
          </Link>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <section className="bg-blue-50 border border-amber-200 p-6 rounded-2xl flex items-start gap-4 text-xs md:text-sm text-amber-900">
        <ShieldAlert className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-950 font-bold block mb-1">Nutritional & Cardiovascular Disclaimer</strong>
          This fat intake calculator and educational content are intended for informational purposes only. They do not constitute clinical diagnosis or medical nutrition therapy. Individuals with familial hypercholesterolemia, coronary artery disease, or cardiovascular risk factors should consult a board-certified cardiologist or registered dietitian (RD) regarding lipid targets.
        </div>
      </section>
    </div>
  );
}

export default FatIntakeContent;

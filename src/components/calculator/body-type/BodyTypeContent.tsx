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
  User,
  Heart,
  Activity,
  Award,
} from "lucide-react";
import { body_type_calculatorFaqs } from "@/app/calculators/body-type-calculator/faq";

export function BodyTypeContent() {
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
              The Definitive Guide to Body Types, Somatotypes & Morphological Health
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Scientific guide covering 7 female body shapes (NCSU Study), male V-shape/Trapezoid frames, Heath-Carter somatotyping, and WHO cardiovascular risk standards.
            </p>
          </div>
        </div>

        {/* Section 1 & 2 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-cyan-600">1–3.</span> What Is Body Type & Why Does Shape Matter?
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            An individual's <strong className="text-slate-900">body type (or body shape)</strong> represents the unique anatomical proportion between their bust/chest, natural waist, upper high hip, and lower hip circumferences. Beyond clothing aesthetics and fashion tailoring, body shape metrics—specifically <strong className="text-slate-900">Waist-to-Hip Ratio (WHR)</strong> and <strong className="text-slate-900">Waist-to-Height Ratio (WHtR)</strong>—serve as clinical biomarkers for visceral fat deposition and cardiovascular health.
          </p>
        </div>

        {/* Female Body Shapes Table */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-cyan-600">4–7.</span> Mathematical Criteria for the 7 Female Body Shapes
          </h3>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs md:text-sm text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold">
                <tr>
                  <th className="p-3.5">Body Shape</th>
                  <th className="p-3.5">Differential Formula (Inches)</th>
                  <th className="p-3.5">NCSU Study Prevalence</th>
                  <th className="p-3.5">Styling Objective</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-cyan-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Rectangle (Banana)</td>
                  <td className="p-3.5">|Bust - Hips| &lt; 3.6" &amp; Bust-Waist &lt; 9"</td>
                  <td className="p-3.5 font-bold text-cyan-700">46.1%</td>
                  <td className="p-3.5">Create visual waist dimension &amp; curves.</td>
                </tr>
                <tr className="hover:bg-cyan-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Triangle (Pear)</td>
                  <td className="p-3.5">Hips - Bust ≥ 3.6" &amp; Hips-Waist &lt; 9"</td>
                  <td className="p-3.5 font-bold text-cyan-700">20.9%</td>
                  <td className="p-3.5">Draw visual focus upward to shoulders.</td>
                </tr>
                <tr className="hover:bg-cyan-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Inverted Triangle (Apple)</td>
                  <td className="p-3.5">Bust - Hips ≥ 3.6" &amp; Bust-Waist &lt; 9"</td>
                  <td className="p-3.5 font-bold text-cyan-700">13.8%</td>
                  <td className="p-3.5">Soften upper torso &amp; add volume to hips.</td>
                </tr>
                <tr className="hover:bg-cyan-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Hourglass</td>
                  <td className="p-3.5">Bust == Hips (±1") &amp; Bust-Waist ≥ 9"</td>
                  <td className="p-3.5 font-bold text-emerald-700">8.4%</td>
                  <td className="p-3.5">Highlight natural narrow waistline.</td>
                </tr>
                <tr className="hover:bg-cyan-50/40">
                  <td className="p-3.5 font-bold text-slate-900">Spoon</td>
                  <td className="p-3.5">Hips - Bust &gt; 2" &amp; HighHip/Waist ≥ 1.193</td>
                  <td className="p-3.5">High Hip Class</td>
                  <td className="p-3.5">Flatter high-hip shelf curvature.</td>
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
              Frequently Asked Questions (40 Detailed Answers)
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Comprehensive responses covering body shape algorithms, measuring instructions, WHO health risk cutoffs, and wardrobe fit tips.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {body_type_calculatorFaqs.map((faq, idx) => {
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
            Related Fitness & Body Composition Tools
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
            <p className="text-xs text-slate-500 mt-1">Devine, Robinson &amp; Miller formulas.</p>
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
    </div>
  );
}

export default BodyTypeContent;

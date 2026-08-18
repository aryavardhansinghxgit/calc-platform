"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  BookOpen,
  Calendar,
  Sparkles,
  Activity,
  Baby,
} from "lucide-react";
import { period_calculatorFaqs } from "@/app/calculators/period-calculator/faq";

export function PeriodContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-16 space-y-12 text-slate-800 font-sans">
      {/* 28 Educational Content Sections */}
      <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-10">
        <div className=" pb-6 flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-rose-100">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue-600">
              The Ultimate Guide to Menstrual Cycles, Period Tracking & Reproductive Health
            </h2>
            <p className="text-sm text-slate-900 mt-1">
              Medically reviewed timing principles, hormonal mechanics, biomarker tracking, and clinical dating algorithms.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <span className="text-blue-600">1.</span> What Is a Period?
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            A <strong className="text-slate-900">period</strong> (medically termed <em>menstruation</em>) is the periodic shedding of the endometrial lining of the uterus. It manifests as a discharge of blood and mucosal tissue from the vagina, occurring approximately once a month in non-pregnant females between puberty and menopause. Menstruation marks Day 1 of a new reproductive cycle, indicating that fertilization did not occur during the preceding cycle.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <span className="text-blue-600">2.</span> Understanding the Menstrual Cycle
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            The menstrual cycle is managed by the hypothalamic-pituitary-ovarian (HPO) axis to prepare the body for potential pregnancy each month:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-slate-700 pl-2">
            <li><strong className="text-slate-900">Normal Duration</strong>: 21 to 35 days in adults (averaging 28 days).</li>
            <li><strong className="text-slate-900">Bleeding Duration</strong>: 2 to 7 days (averaging 4 to 5 days).</li>
            <li><strong className="text-slate-900">Normal Blood Loss</strong>: 30 to 50 mL per cycle (soaking fewer than 6–8 pads/tampons per day).</li>
          </ul>
        </div>

        {/* Section 3 & 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">Menstrual Phase
            </h4>
            <p className="text-xs md:text-sm text-slate-900 leading-relaxed">
              Days 1–5: Low estrogen and progesterone levels cause prostaglandins to trigger uterine muscle contractions and endometrial shedding.
            </p>
          </div>

          <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">Follicular Phase
            </h4>
            <p className="text-xs md:text-sm text-slate-900 leading-relaxed">
              Days 1–13: FSH stimulates follicle maturation in the ovaries while rising estrogen thickens the uterine lining (7–14 mm).
            </p>
          </div>
        </div>

        {/* Section 5: Menstrual Cycle Table */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <span className="text-blue-600">5.</span> Menstrual Cycle Phase Architecture
          </h3>
          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs md:text-sm text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold">
                <tr>
                  <th className="p-3.5">Phase Name</th>
                  <th className="p-3.5">Average Days</th>
                  <th className="p-3.5">Hormonal Drivers</th>
                  <th className="p-3.5">Primary Biological Event</th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3.5 font-bold text-blue-600">Menstruation</td>
                  <td className="p-3.5">Days 1–5</td>
                  <td className="p-3.5">Low Estrogen/Progesterone</td>
                  <td className="p-3.5">Endometrium sheds; new cycle begins</td>
                </tr>
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3.5 font-bold text-blue-700">Follicular Phase</td>
                  <td className="p-3.5">Days 1–13</td>
                  <td className="p-3.5">FSH & Estrogen Rise</td>
                  <td className="p-3.5">Ovarian follicles mature; lining thickens</td>
                </tr>
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3.5 font-bold text-blue-600">Ovulation</td>
                  <td className="p-3.5">Day 14</td>
                  <td className="p-3.5">LH Surge Peak</td>
                  <td className="p-3.5">Mature egg released into fallopian tube</td>
                </tr>
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3.5 font-bold text-blue-600">Luteal Phase</td>
                  <td className="p-3.5">Days 15–28</td>
                  <td className="p-3.5">High Progesterone</td>
                  <td className="p-3.5">Corpus luteum prepares lining for blastocyst</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 8 to 12 Overview */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <span className="text-blue-600">8–12.</span> How Period & Ovulation Calculations Work
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            Period prediction algorithms establish your next period start date by adding your average cycle length to the start date of your last period. Because the luteal phase remains stable at ~14 days, ovulation is calculated backward as Cycle Length - 14 days. The 6-day fertile window includes the 5 days preceding ovulation plus ovulation day itself.
          </p>
        </div>

        {/* Section 14 to 19: Irregular Cycles, PCOS & Birth Control */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-base">PCOS & Irregular Cycles</h4>
            <p className="text-xs md:text-sm text-slate-900 leading-relaxed">
              PCOS causes elevated androgens and multiple ovarian micro-follicles, leading to irregular or delayed ovulation (35–90+ day cycles).
            </p>
          </div>

          <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-base">Birth Control & PMS/PMDD</h4>
            <p className="text-xs md:text-sm text-slate-900 leading-relaxed">
              Hormonal birth control suppresses natural ovulation. PMS affects 75% of women, while PMDD causes severe premenstrual mood disruption requiring clinical support.
            </p>
          </div>
        </div>
      </section>

      {/* 30 Interactive FAQs Accordion */}
      <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <div className="flex items-center gap-3  pb-6">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-purple-100">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue-600">
              Frequently Asked Questions (30 Clinical Answers)
            </h2>
            <p className="text-sm text-slate-900 mt-1">
              Comprehensive clinical responses to common questions about period predictions, irregular cycles, ovulation, and birth control.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {period_calculatorFaqs.map((faq, idx) => {
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
            href="/calculators/ovulation-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Ovulation Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/pregnancy-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Pregnancy Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/due-date-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Due Date Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/conception-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Conception Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/pregnancy-weight-gain-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Weight Gain Tracker
          </Link>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <section className="bg-blue-50 border border-amber-200 p-6 rounded-2xl flex items-start gap-4 text-xs md:text-sm text-amber-900">
        <ShieldAlert className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-950 font-bold block mb-1">Medical Disclaimer</strong>
          This period calculator and educational guide are intended for informational purposes only. They do not constitute clinical diagnosis or medical advice. Individual menstrual cycle timing varies. Consult a board-certified gynecologist for medical cycle evaluations.
        </div>
      </section>
    </div>
  );
}

export default PeriodContent;

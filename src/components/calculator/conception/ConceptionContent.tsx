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
import { conception_calculatorFaqs } from "@/app/calculators/conception-calculator/faq";

export function ConceptionContent() {
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
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              The Ultimate Guide to Conception, Fertility Windows & Pregnancy Planning
            </h2>
            <p className="text-sm text-slate-900 mt-1">
              Medically reviewed timing principles, hormonal mechanics, biomarker tracking, and clinical dating algorithms.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-blue-600">1.</span> What Is Conception?
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            <strong className="text-slate-900">Conception</strong> is the biological initiation of human pregnancy. In clinical reproductive medicine, conception takes place when a healthy sperm cell successfully penetrates and fertilizes a mature egg (ovum) inside the fallopian tube. This forms a single-celled zygote containing a complete set of 46 chromosomes. Contrary to popular belief, conception rarely occurs during sex itself; rather, fertilization happens hours or days after intercourse once the egg is released during ovulation.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-blue-600">2.</span> Difference Between Conception and Fertilization
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            While frequently used as synonyms, reproductive endocrinologists distinguish between these events:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-slate-700 pl-2">
            <li><strong className="text-slate-900">Fertilization</strong>: The exact cellular union of sperm and egg nuclei inside the fallopian tube ampulla.</li>
            <li><strong className="text-slate-900">Conception</strong>: The broader process encompassing fertilization, early cell division, and transport down the fallopian tube.</li>
            <li><strong className="text-slate-900">Implantation</strong>: The embedding of the multi-cellular blastocyst into the endometrial lining 6 to 12 days later, initiating clinical pregnancy.</li>
          </ul>
        </div>

        {/* Section 3 & 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Understanding Fertility
            </h4>
            <p className="text-xs md:text-sm text-slate-900 leading-relaxed">
              Fertility depends on regular ovulatory cycles, high sperm concentration and progressive motility, open fallopian tubes, and a receptive uterine lining (7–14 mm thickness) supported by estrogen and progesterone balance.
            </p>
          </div>

          <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Understanding Ovulation
            </h4>
            <p className="text-xs md:text-sm text-slate-900 leading-relaxed">
              Triggered by a sharp surge in Luteinizing Hormone (LH) from the pituitary gland 24 to 36 hours prior, ovulation releases a mature oocyte into the fallopian tube, signaling the cycle's peak fertility window.
            </p>
          </div>
        </div>

        {/* Section 5: Menstrual Cycle Table */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
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

        {/* Section 6 to 12 Overview */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-blue-600">6–12.</span> Fertile Window, Gamete Physiology & Biomarkers
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            The biological <strong className="text-slate-900">fertile window spans 6 days</strong>: the 5 days leading up to ovulation plus ovulation day itself. Sperm cells can survive up to 5 days inside fertile-quality cervical mucus (Egg-White Cervical Mucus / EWCM), whereas the human ovum remains viable for only 12 to 24 hours post-release. Having intercourse during the 2 to 3 days immediately preceding ovulation yields the highest clinical conception rates (~30% to 33% per cycle).
          </p>
        </div>

        {/* Section 13 & 14: BBT & FAM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-base">Basal Body Temperature (BBT)</h4>
            <p className="text-xs md:text-sm text-slate-900 leading-relaxed">
              Measuring resting morning temperature confirms post-ovulatory progesterone rise (+0.5°F to +1.0°F shift), verifying that an egg was successfully released.
            </p>
          </div>

          <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-base">Implantation & Early Development</h4>
            <p className="text-xs md:text-sm text-slate-900 leading-relaxed">
              Blastocyst implantation occurs 6 to 12 days post-ovulation (peak 8–10 DPO). hCG secretion begins immediately, enabling sensitive test detection at 10 DPO.
            </p>
          </div>
        </div>

        {/* Section 17: Daily Probability Table */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-blue-600">17.</span> Conception Probability by Cycle Timing
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <div className="text-[10px] text-slate-900 font-bold">-5 Days</div>
              <div className="text-lg font-black text-blue-700 mt-1">5%</div>
              <div className="text-[9px] text-slate-900 font-medium">Low</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <div className="text-[10px] text-slate-900 font-bold">-4 Days</div>
              <div className="text-lg font-black text-blue-800 mt-1">12%</div>
              <div className="text-[9px] text-slate-900 font-medium">Moderate</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <div className="text-[10px] text-slate-900 font-bold">-3 Days</div>
              <div className="text-lg font-black text-blue-600 mt-1">18%</div>
              <div className="text-[9px] text-slate-900 font-medium">Moderate</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <div className="text-[10px] text-slate-900 font-bold">-2 Days</div>
              <div className="text-lg font-black text-blue-600 mt-1">27%</div>
              <div className="text-[9px] text-slate-900 font-medium">High</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-rose-300 text-center scale-105 shadow-xs">
              <div className="text-[10px] text-blue-600 font-bold">-1 Day</div>
              <div className="text-lg font-black text-blue-600 mt-1">33%</div>
              <div className="text-[9px] text-blue-600 font-bold">PEAK</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-emerald-300 text-center scale-105 shadow-xs">
              <div className="text-[10px] text-blue-600 font-bold">0 Day</div>
              <div className="text-lg font-black text-blue-600 mt-1">30%</div>
              <div className="text-[9px] text-blue-600 font-bold">PEAK</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <div className="text-[10px] text-slate-900 font-bold">+1 Day</div>
              <div className="text-lg font-black text-slate-900 mt-1">5%</div>
              <div className="text-[9px] text-slate-900 font-medium">Low</div>
            </div>
          </div>
        </div>

        {/* Section 21: IVF & Assisted Reproduction */}
        <div className="space-y-4 pt-4 ">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-blue-600">21.</span> IVF & Assisted Reproductive Technology (ART)
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            For IVF cycles, conception dating replaces menstrual math with exact embryonic age:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200">
              <div className="font-bold text-blue-600">Day 3 Embryo Transfer</div>
              <div className="text-slate-900 mt-1">Conception Date = Transfer Date - 3 Days</div>
            </div>
            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200">
              <div className="font-bold text-blue-600">Day 5 Blastocyst Transfer</div>
              <div className="text-slate-900 mt-1">Conception Date = Transfer Date - 5 Days</div>
            </div>
            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200">
              <div className="font-bold text-blue-600">Estimated Due Date (EDD)</div>
              <div className="text-slate-900 mt-1">Transfer Date + 266 Days - Embryo Age</div>
            </div>
          </div>
        </div>
      </section>

      {/* 30 Interactive FAQs Accordion (Light Theme) */}
      <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <div className="flex items-center gap-3  pb-6">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-purple-100">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions (30 Clinical Answers)
            </h2>
            <p className="text-sm text-slate-900 mt-1">
              Comprehensive responses to common questions about conception timing, test accuracy, biomarkers, and IVF.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {conception_calculatorFaqs.map((faq, idx) => {
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

      {/* Cross-linking Related Calculators */}
      <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3  pb-4">
          <Baby className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Related Fertility & Pregnancy Tools
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/calculators/ovulation-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-rose-400 hover:bg-blue-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
              Ovulation Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </div>
            <p className="text-xs text-slate-900 mt-1">Predict upcoming peak fertile windows.</p>
          </Link>

          <Link
            href="/calculators/pregnancy-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-400 hover:bg-blue-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
              Pregnancy Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </div>
            <p className="text-xs text-slate-900 mt-1">Gestational age & milestone tracker.</p>
          </Link>

          <Link
            href="/calculators/due-date-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-blue-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
              Due Date Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </div>
            <p className="text-xs text-slate-900 mt-1">Estimate exact delivery date.</p>
          </Link>

          <Link
            href="/calculators/period-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-cyan-400 hover:bg-blue-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
              Period Calculator
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </div>
            <p className="text-xs text-slate-900 mt-1">Menstrual cycle & period tracker.</p>
          </Link>

          <Link
            href="/calculators/pregnancy-weight-gain-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-blue-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
              Weight Gain Tracker
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </div>
            <p className="text-xs text-slate-900 mt-1">Healthy trimester weight goals.</p>
          </Link>

          <Link
            href="/calculators/pregnancy-conception-calculator"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-rose-400 hover:bg-blue-50/30 transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
              Pregnancy Conception
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </div>
            <p className="text-xs text-slate-900 mt-1">Advanced gestational conception suite.</p>
          </Link>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="bg-blue-50 border border-amber-200 p-6 rounded-2xl flex items-start gap-4 text-xs md:text-sm text-amber-900">
        <ShieldAlert className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-950 font-bold block mb-1">Medical Disclaimer</strong>
          This calculator and educational content are designed solely for educational and family planning purposes. They do not constitute professional medical advice, diagnosis, or clinical treatment plans. Individual menstrual cycles and biological timing vary. Consult a board-certified gynecologist or reproductive endocrinologist for clinical fertility assessments.
        </div>
      </section>
    </div>
  );
}

export default ConceptionContent;

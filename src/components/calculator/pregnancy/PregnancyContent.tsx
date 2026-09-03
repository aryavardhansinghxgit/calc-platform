"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  HelpCircle,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { pregnancy_calculatorFaqs } from "@/app/calculators/pregnancy-calculator/faq";

export const PregnancyContent: React.FC = () => {
  // All 15 FAQs unfolded by default per 401(k) reference architecture
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 15 }, (_, i) => i))
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

  return (
    <article className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-10 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. HERO INTRODUCTION & CLINICAL SCOPE */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <BookOpen className="h-4 w-4" />
          Clinical Reference &amp; Educational Guide
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A pregnancy calculator helps estimate where you are in pregnancy and when your baby may be due. Depending on the information you already have, pregnancy dating can be based on the first day of your last menstrual period (LMP), a known conception date, an ultrasound-reported gestational age, an IVF embryo transfer date, or another established pregnancy-date anchor.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          This calculator brings several dating methods into one tool. It can estimate your expected due date (EDD), conception timing, gestational age, days pregnant, days remaining, trimester, a generalized birth window, week-by-week development information, and pregnancy milestones.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Because pregnancy dating is a clinical process rather than a simple calendar prediction, different inputs can produce different estimates. Your official estimated due date should be established by your healthcare professional using the best available clinical information.
        </p>
      </div>

      {/* 2. HOW DOES A PREGNANCY CALCULATOR WORK? */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          How Does a Pregnancy Calculator Work?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A pregnancy calculator estimates important pregnancy dates from a known dating point. The most common starting point is the first day of the last menstrual period, or LMP.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For conventional LMP dating, the estimated due date is approximately 280 days, or 40 weeks, from the first day of the LMP. This convention assumes a typical 28-day cycle and ovulation around cycle day 14. Real menstrual cycles and ovulation timing vary, so an LMP-based date is an estimate rather than a guarantee of when delivery will occur.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          This calculator goes beyond a simple LMP formula by supporting multiple dating methods. You can work forward from an LMP or conception date, work backward from an expected due date, use an ultrasound-reported gestational age, or use IVF embryo-transfer information.
        </p>

        {/* 3. OPTIONAL VISUAL DIAGRAM */}
        <div className="my-6 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Gestational Timeline Progression
          </span>
          <div className="overflow-x-auto py-2">
            <div className="min-w-[640px] flex items-center justify-between text-center text-xs font-semibold text-slate-700 dark:text-slate-300">
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shrink-0">
                <span className="block font-bold text-blue-600 dark:text-blue-400">LMP</span>
                <span className="text-[10px] text-slate-500">Day 0 (Week 0)</span>
              </div>
              <span className="text-slate-400 font-bold">→</span>
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shrink-0">
                <span className="block font-bold">Ovulation</span>
                <span className="text-[10px] text-slate-500">~Day 14 (Week 2)</span>
              </div>
              <span className="text-slate-400 font-bold">→</span>
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shrink-0">
                <span className="block font-bold">Conception</span>
                <span className="text-[10px] text-slate-500">Fertilization</span>
              </div>
              <span className="text-slate-400 font-bold">→</span>
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shrink-0">
                <span className="block font-bold">Implantation</span>
                <span className="text-[10px] text-slate-500">Week 3–4</span>
              </div>
              <span className="text-slate-400 font-bold">→</span>
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shrink-0">
                <span className="block font-bold">Early Dev</span>
                <span className="text-[10px] text-slate-500">Weeks 5–13</span>
              </div>
              <span className="text-slate-400 font-bold">→</span>
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shrink-0">
                <span className="block font-bold">Trimester 2</span>
                <span className="text-[10px] text-slate-500">Weeks 14–27</span>
              </div>
              <span className="text-slate-400 font-bold">→</span>
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shrink-0">
                <span className="block font-bold">Trimester 3</span>
                <span className="text-[10px] text-slate-500">Weeks 28–40+</span>
              </div>
              <span className="text-slate-400 font-bold">→</span>
              <div className="p-2.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 shrink-0 font-bold">
                <span className="block">EDD Target</span>
                <span className="text-[10px]">40 Weeks (280d)</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 italic mt-2">
            Pregnancy is conventionally dated from the first day of the last menstrual period, so gestational age includes approximately two weeks before conception in a typical cycle.
          </p>
        </div>
      </section>

      {/* 4. WHAT INFORMATION DO I NEED? */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          What Information Do I Need to Calculate My Pregnancy Dates?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The information required depends on the dating method you choose.
        </p>

        {/* DATA TABLE */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 my-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Dating Method</th>
                <th className="p-3">Information Needed</th>
                <th className="p-3">Main Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">LMP</td>
                <td className="p-3">First day of last period</td>
                <td className="p-3">Conventional pregnancy dating</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Due Date</td>
                <td className="p-3">Estimated delivery date</td>
                <td className="p-3">Work backward through timeline</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Conception</td>
                <td className="p-3">Known/estimated conception</td>
                <td className="p-3">Conception-based dating</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Ultrasound</td>
                <td className="p-3">Scan date + reported GA</td>
                <td className="p-3">Ultrasound-based timeline</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">IVF Transfer</td>
                <td className="p-3">Transfer date + embryo stage</td>
                <td className="p-3">ART dating</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Custom Start</td>
                <td className="p-3">Gestational anchor date</td>
                <td className="p-3">Custom timeline</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Reverse Due Date</td>
                <td className="p-3">Target due date</td>
                <td className="p-3">Reverse dating</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm pt-2">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <strong className="text-slate-900 dark:text-white block mb-1">LMP:</strong>
            Enter the first day of your last menstrual period and, where applicable, your average cycle length.
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <strong className="text-slate-900 dark:text-white block mb-1">Due Date:</strong>
            Enter an estimated due date when you already have one and want to work backward through the pregnancy timeline.
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <strong className="text-slate-900 dark:text-white block mb-1">Conception Date:</strong>
            Enter a known or estimated conception date.
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <strong className="text-slate-900 dark:text-white block mb-1">Ultrasound:</strong>
            Enter the ultrasound date and the gestational age reported by the scan.
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <strong className="text-slate-900 dark:text-white block mb-1">IVF Transfer:</strong>
            Enter the embryo transfer date and embryo developmental stage.
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <strong className="text-slate-900 dark:text-white block mb-1">Custom Start:</strong>
            Enter the gestational anchor date you want to use for the timeline.
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 md:col-span-2">
            <strong className="text-slate-900 dark:text-white block mb-1">Reverse Due Date:</strong>
            Enter the target due date and work backward to estimate related pregnancy dates.
          </div>
        </div>
      </section>

      {/* 5. LMP DATING */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          How Is a Due Date Calculated From the Last Period?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For conventional LMP dating, the estimated due date is approximately 280 days from the first day of the last menstrual period.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          This is the traditional 40-week pregnancy-dating framework.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The important limitation is that the LMP does not tell you the exact day ovulation or fertilization occurred. The traditional calculation assumes a typical cycle, so differences in cycle length or ovulation timing can change the actual timing of conception.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator can incorporate cycle information where supported, but the result should still be treated as an estimate.
        </p>
        <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          If you only need an expected delivery date rather than the complete pregnancy timeline, use the{" "}
          <Link
            href="/calculators/due-date-calculator"
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Due Date Calculator
          </Link>
          .
        </div>
      </section>

      {/* 6. GESTATIONAL AGE */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          What Is Gestational Age?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Gestational age describes how far a pregnancy has progressed. It is commonly expressed in weeks and days.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For example, <strong>35w0d</strong> means 35 completed weeks and 0 additional days.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Gestational age is conventionally counted from the first day of the LMP rather than from fertilization. That means the first approximately two weeks of the standard pregnancy timeline occur before conception in a typical cycle.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          This is why a person may be described as four weeks pregnant even though fertilization occurred roughly two weeks earlier.
        </p>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5 text-xs sm:text-sm">
          <p>
            <strong>Gestational age:</strong> time counted from LMP
          </p>
          <p>
            <strong>Age since conception:</strong> time since fertilization
          </p>
          <p className="text-slate-500 text-xs mt-1">These are different measurements.</p>
        </div>
      </section>

      {/* 7. NAEGELE'S RULE & CONCEPTION LINK */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          What Is Naegele&apos;s Rule?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Naegele&apos;s rule is the traditional calendar method for estimating an expected due date from the first day of the LMP.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The classic expression is: <code>LMP + 1 year − 3 months + 7 days</code>, which corresponds approximately to <code>LMP + 280 days</code>.
        </p>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs sm:text-sm space-y-1">
          <p><strong>LMP:</strong> January 1</p>
          <p><strong>Estimated due date:</strong> October 8</p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The method is useful as a conventional starting point, but it does not capture every variation in menstrual cycles or ovulation.
        </p>
        <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          If you already know or have estimated the conception date, the{" "}
          <Link
            href="/calculators/conception-calculator"
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Conception Calculator
          </Link>{" "}
          provides a more focused way to explore conception timing.
        </div>
      </section>

      {/* 8. WHY DUE DATES ARE ESTIMATES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Why Is My Due Date Only an Estimate?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          An estimated due date is a reference point rather than a promise that birth will occur on that exact day.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The date can differ from the actual delivery date because pregnancy length varies between individuals and because the initial dating method may not perfectly capture ovulation, fertilization or early fetal development.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ACOG uses the estimated due date as the reference point for establishing gestational age and organizing pregnancy care. An established EDD should not be repeatedly changed simply because a later estimate differs slightly.
        </p>
      </section>

      {/* 9. LMP VS ULTRASOUND */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          LMP Dating vs Ultrasound Dating
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          LMP dating can work well when the date is known accurately and menstrual cycles are reasonably predictable.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          It becomes less reliable when:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
          <li>the LMP is uncertain</li>
          <li>cycles are irregular</li>
          <li>ovulation occurs earlier or later than expected</li>
          <li>recent hormonal contraception affects cycle interpretation</li>
        </ul>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ACOG states that first-trimester ultrasound measurement of the embryo or fetus is the most accurate method for establishing or confirming gestational age.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          That does not mean every later ultrasound should produce a new due date. The clinical significance of a dating difference depends on when the ultrasound was performed and how large the discrepancy is.
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-400 italic">
          If you already have a gestational age reported by an ultrasound, use this calculator&apos;s Ultrasound Scan mode rather than replacing that information with a generic calendar estimate.
        </p>
      </section>

      {/* 10. HOW DOES ULTRASOUND DATING WORK? */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          How Does Ultrasound Dating Work?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The Ultrasound Scan mode uses two pieces of information: the date of the ultrasound and the gestational age reported by the scan.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator then works backward to estimate the corresponding pregnancy dating and forward to estimate the EDD.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          This is date arithmetic based on the gestational age you enter. It does not independently measure an ultrasound image and should not be interpreted as a substitute for a clinical ultrasound examination.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For pregnancy dating, early ultrasound is generally more precise than later ultrasound dating.
        </p>
      </section>

      {/* 11. HOW DOES IVF PREGNANCY DATING WORK? */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          How Does IVF Pregnancy Dating Work?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          IVF pregnancies can be dated more precisely because the embryo&apos;s developmental stage and transfer date are known.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For example, ACOG&apos;s pregnancy-dating guidance uses:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
          <li><strong>Day-3 embryo transfer:</strong> approximately 263 days from transfer to the EDD</li>
          <li><strong>Day-5 embryo transfer:</strong> approximately 261 days from transfer to the EDD</li>
        </ul>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator&apos;s IVF Transfer mode combines the transfer date with the embryo stage to establish the pregnancy timeline. This approach is different from simply entering an estimated LMP.
        </p>
        <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          For a general conception-date calculation outside IVF, use the{" "}
          <Link
            href="/calculators/conception-calculator"
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Conception Calculator
          </Link>
          .
        </div>
      </section>

      {/* 12. WHY ARE THE FIRST TWO PREGNANCY WEEKS DIFFERENT? */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Why Are the First Two Pregnancy Weeks Different?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Pregnancy dating starts before fertilization. Week 1 begins on the first day of the LMP. Week 2 generally corresponds to the period leading toward ovulation.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          If fertilization occurs, conception follows ovulation. This means the conventional gestational-age clock can reach approximately two weeks around the time conception occurs.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Those early weeks should not be interpreted as though an embryo or fetus already exists from the first day of the LMP.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator therefore distinguishes the pregnancy timeline from the biological age of the embryo or fetus.
        </p>
      </section>

      {/* 13. WHAT DO THE PREGNANCY TRIMESTERS MEAN? */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          What Do the Pregnancy Trimesters Mean?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Pregnancy is commonly divided into three trimesters:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <strong className="block text-slate-900 dark:text-white font-bold">First Trimester</strong>
            <span className="text-slate-600 dark:text-slate-400 block mt-0.5">Through 13 weeks 6 days</span>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <strong className="block text-slate-900 dark:text-white font-bold">Second Trimester</strong>
            <span className="text-slate-600 dark:text-slate-400 block mt-0.5">14 weeks 0 days through 27 weeks 6 days</span>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <strong className="block text-slate-900 dark:text-white font-bold">Third Trimester</strong>
            <span className="text-slate-600 dark:text-slate-400 block mt-0.5">28 weeks 0 days onward</span>
          </div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          These divisions help organize pregnancy care and developmental information. The exact milestone timing of an individual pregnancy can vary, so trimester labels should be understood as gestational-age categories rather than exact developmental boundaries.
        </p>
      </section>

      {/* 14. WHAT HAPPENS DURING EACH STAGE OF PREGNANCY? */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          What Happens During Each Stage of Pregnancy?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Early pregnancy includes implantation and rapid embryonic development.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          During the first trimester, major structures begin to develop and early pregnancy changes become apparent. The second trimester is characterized by continued structural development, growth and increasing fetal movement.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          During the third trimester, fetal growth continues while organs such as the lungs and brain continue to mature.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator&apos;s weekly development information is designed to provide general context for these stages. It should not be used as a diagnostic measure of an individual fetus.
        </p>
      </section>

      {/* 15. HOW SHOULD I READ THE WEEK-BY-WEEK DEVELOPMENT INFORMATION? */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          How Should I Read the Week-by-Week Development Information?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator&apos;s week-by-week development section connects your estimated gestational age with general developmental information.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          It may include developmental milestones, size references, weight references, maternal changes, and pregnancy-stage information.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          These are educational reference points. They are not ultrasound measurements of your individual pregnancy. Fetal growth varies naturally between pregnancies, so a reference value should not be interpreted as a required measurement for your baby.
        </p>
      </section>

      {/* 16. WHAT DOES THE FETAL GROWTH CHART SHOW? */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          What Does the Fetal Growth Chart Show?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The fetal-growth chart provides a visual reference for how fetal size changes across pregnancy.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Its purpose is educational: it helps you understand the general direction of growth from early pregnancy toward term.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The chart should not be interpreted as a prediction of the exact weight of your baby at a particular week. Individual fetal growth is assessed clinically using gestational age, ultrasound measurements and growth patterns over time.
        </p>
      </section>

      {/* 17. BIRTH WINDOW */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          What Is the Difference Between an Estimated Due Date and a Birth Window?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The estimated due date is a single reference date. A birth window is broader and is intended to illustrate that delivery does not normally occur on one universally fixed day.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs sm:text-sm my-3">
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="font-bold text-blue-600 dark:text-blue-400 block">Early Term</span>
            <span className="text-slate-600 dark:text-slate-400">37w0d–38w6d</span>
          </div>
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="font-bold text-blue-600 dark:text-blue-400 block">Full Term</span>
            <span className="text-slate-600 dark:text-slate-400">39w0d–40w6d</span>
          </div>
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="font-bold text-blue-600 dark:text-blue-400 block">Late Term</span>
            <span className="text-slate-600 dark:text-slate-400">41w0d–41w6d</span>
          </div>
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="font-bold text-blue-600 dark:text-blue-400 block">Postterm</span>
            <span className="text-slate-600 dark:text-slate-400">42w0d and beyond</span>
          </div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          These labels describe gestational age and should not be interpreted as a guarantee that a particular pregnancy will continue to any specific week.
        </p>
      </section>

      {/* 18. MULTIPLE PREGNANCIES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          How Does Pregnancy Dating Differ for Twins and Triplets?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Twin and triplet pregnancies require different clinical management from singleton pregnancies.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator supports Single Baby, Twins, and Triplets. Pregnancy-type selection affects the calculator&apos;s applicable pregnancy timeline and generalized delivery planning.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          However, multiple pregnancies are more complex than a singleton pregnancy. Factors such as fetal growth, placental arrangement, maternal complications and other pregnancy-specific findings can affect management.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator&apos;s generalized output should therefore be treated as educational planning information rather than individualized delivery advice.
        </p>
      </section>

      {/* 19. WHY ACCURATE PREGNANCY DATING MATTERS */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Why Does Accurate Pregnancy Dating Matter?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Many prenatal tests and appointments are scheduled according to gestational age.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
          <li>first-trimester screening</li>
          <li>dating ultrasound</li>
          <li>anatomy ultrasound</li>
          <li>glucose screening</li>
          <li>later-pregnancy testing</li>
          <li>delivery planning</li>
        </ul>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For example, ACOG recommends that a second-trimester ultrasound for assessment of fetal structural defects is ideally performed between 18 and 22 weeks. Accurate dating therefore helps place these events in the correct part of the pregnancy timeline.
        </p>
        <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          If you are trying to understand the relationship between ovulation, fertile timing and conception, use the{" "}
          <Link
            href="/calculators/ovulation-calculator"
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Ovulation Calculator
          </Link>{" "}
          for a cycle-based estimate and the{" "}
          <Link
            href="/calculators/conception-calculator"
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Conception Calculator
          </Link>{" "}
          for a conception-date view.
        </div>
      </section>

      {/* 20. WHEN DATES DISAGREE */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          What If This Calculator Gives Me a Different Due Date Than My Doctor?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Do not automatically assume the calculator is more accurate.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A clinical due date may be based on reliable LMP dating, first-trimester ultrasound, assisted reproductive technology, or clinical history.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ACOG recommends using the best obstetric estimate and avoiding unnecessary changes to an established EDD. If your calculator result differs from the date documented by your healthcare provider, use the clinically established date for medical care.
        </p>
      </section>

      {/* 21. WHAT CAN THIS CALCULATOR TELL ME? */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          What Can This Pregnancy Calculator Tell Me?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator can estimate:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs sm:text-sm my-2">
          <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 font-medium">
            Due date
          </div>
          <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 font-medium">
            Conception timing
          </div>
          <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 font-medium">
            Gestational age
          </div>
          <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 font-medium">
            Days pregnant
          </div>
          <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 font-medium">
            Days remaining
          </div>
          <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 font-medium">
            Trimester
          </div>
          <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 font-medium">
            Pregnancy stage
          </div>
          <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 font-medium">
            Generalized birth timing
          </div>
          <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 font-medium">
            Fetal-development timing
          </div>
          <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 font-medium">
            Pregnancy milestones
          </div>
          <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 font-medium">
            IVF pregnancy dates
          </div>
          <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 font-medium">
            Reverse pregnancy dates
          </div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          It also lets you explore the pregnancy timeline using multiple dating methods rather than forcing every pregnancy into an LMP-only calculation.
        </p>
      </section>

      {/* 22. WHAT CAN'T A PREGNANCY CALCULATOR TELL ME? */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          What Can&apos;t a Pregnancy Calculator Tell Me?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A pregnancy calculator cannot diagnose pregnancy complications or determine whether a pregnancy is healthy.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          It cannot reliably determine:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
          <li>exact conception time</li>
          <li>exact delivery date</li>
          <li>fetal abnormalities</li>
          <li>fetal growth disorders</li>
          <li>pregnancy complications</li>
          <li>whether a symptom is dangerous</li>
          <li>whether a medication is safe</li>
          <li>whether a prenatal test will be positive or negative</li>
        </ul>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Those questions require clinical assessment.
        </p>
      </section>

      {/* 23. MEDICATION SAFETY & FDA PLLR */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Medication Safety in Pregnancy: The FDA PLLR Framework
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Older prescription-drug labeling sometimes used pregnancy letter categories such as A, B, C, D and X. The FDA removed those categories from prescription drug labeling under the Pregnancy and Lactation Labeling Rule because the letter system could oversimplify pregnancy risks. Current labeling instead uses narrative risk and clinical information.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 font-semibold">
          Do not use this calculator as a medication-safety checker.
        </p>
      </section>

      {/* 24. WHEN TO CONTACT A HEALTHCARE PROVIDER */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          When Should I Contact My Healthcare Provider?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Do not use a calculator to decide whether urgent symptoms can be ignored. Contact your maternity or prenatal care team for concerns such as:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
          <li>vaginal bleeding</li>
          <li>leaking fluid</li>
          <li>severe abdominal or pelvic pain</li>
          <li>severe headache or vision changes</li>
          <li>significant shortness of breath</li>
          <li>concerning swelling</li>
          <li>persistent vomiting or inability to keep fluids down</li>
          <li>reduced fetal movement later in pregnancy</li>
          <li>suspected preterm labor</li>
          <li>any symptom your healthcare team has told you requires urgent assessment</li>
        </ul>
      </section>

      {/* 25. HOW TO USE THE CALCULATOR & INTERNAL WEIGHT/BMI/CALORIE LINKS */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          How to Use This Pregnancy Calculator
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Start by choosing the dating method for which you have the most reliable information.
        </p>
        <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
          <li>Select LMP, Due Date, Conception Date, Ultrasound Scan, IVF Transfer, Custom Start or Reverse Due Date.</li>
          <li>Enter the required date or gestational information.</li>
          <li>Select Single Baby, Twins or Triplets when appropriate.</li>
          <li>Review the estimated due date.</li>
          <li>Review gestational age, days pregnant, days remaining and trimester.</li>
          <li>Explore the weekly development information.</li>
          <li>Review the pregnancy timeline and milestone information.</li>
          <li>Use the PDF, print, copy, share or CSV tools when you need to save the result.</li>
        </ol>

        <div className="space-y-3 pt-3">
          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            Pregnancy dating and pregnancy weight management answer different questions. For a separate estimate of recommended pregnancy weight gain based on pre-pregnancy BMI, use the{" "}
            <Link
              href="/calculators/pregnancy-weight-gain-calculator"
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Pregnancy Weight Gain Calculator
            </Link>
            .
          </div>

          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            If you need to calculate BMI separately before reviewing pregnancy weight-gain guidance, use the{" "}
            <Link
              href="/calculators/bmi-calculator"
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              BMI Calculator
            </Link>
            .
          </div>

          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            For a separate general estimate of daily energy needs, use the{" "}
            <Link
              href="/calculators/calorie-calculator"
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Calorie Calculator
            </Link>{" "}
            rather than treating pregnancy calorie guidance as a personalized prescription.
          </div>
        </div>
      </section>

      {/* 26. CLINICAL REFERENCES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Clinical References
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The pregnancy-dating information on this page is based primarily on guidance from the American College of Obstetricians and Gynecologists and other authoritative health agencies.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <a
            href="https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 transition-all flex items-start justify-between gap-3 group"
          >
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                ACOG: Methods for Estimating the Due Date
              </span>
              <span className="text-xs text-slate-500 mt-1 block">Committee Opinion No. 700</span>
            </div>
            <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-600 shrink-0 mt-0.5" />
          </a>

          <a
            href="https://www.acog.org/womens-health/faqs/how-your-fetus-grows-during-pregnancy"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 transition-all flex items-start justify-between gap-3 group"
          >
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                ACOG: How Your Fetus Grows During Pregnancy
              </span>
              <span className="text-xs text-slate-500 mt-1 block">Clinical Patient Guidance</span>
            </div>
            <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-600 shrink-0 mt-0.5" />
          </a>

          <a
            href="https://www.acog.org/womens-health/faqs/when-pregnancy-goes-past-your-due-date"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 transition-all flex items-start justify-between gap-3 group"
          >
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                ACOG: When Pregnancy Goes Past Your Due Date
              </span>
              <span className="text-xs text-slate-500 mt-1 block">Postterm Pregnancy Monitoring</span>
            </div>
            <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-600 shrink-0 mt-0.5" />
          </a>

          <a
            href="https://www.fda.gov/drugs/labeling-information-drug-products/pregnancy-and-lactation-labeling-drugs-final-rule"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 transition-all flex items-start justify-between gap-3 group"
          >
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                FDA: Pregnancy and Lactation Labeling Rule (PLLR)
              </span>
              <span className="text-xs text-slate-500 mt-1 block">Prescription Drug Labeling Standards</span>
            </div>
            <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-600 shrink-0 mt-0.5" />
          </a>
        </div>
      </section>

      {/* 27. FAQ (15 QUESTIONS UNFOLDED BY DEFAULT) */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            Pregnancy Calculator FAQ
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Frequently asked clinical and mathematical questions about pregnancy calculation, gestational age, and due date estimation.
        </p>

        <div className="space-y-3 pt-2">
          {pregnancy_calculatorFaqs.map((faq, index) => {
            const isOpen = openFaqIndices.has(index);
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "transform rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 29. MEDICAL DISCLAIMER (EXACTLY 1 SECTION) */}
      <section className="pt-8">
        <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            Medical Disclaimer
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            This pregnancy calculator provides estimated pregnancy dates, gestational-age information and educational pregnancy references. It is not a diagnostic tool and does not replace prenatal care.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The estimated due date and other dates depend on the information entered and the dating method used. Clinical pregnancy dating may take into account menstrual history, ultrasound findings, assisted reproductive technology and other medical information.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Do not use this calculator to diagnose pregnancy complications, interpret an ultrasound independently, determine medication safety, change treatment, or delay urgent medical care.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            When a pregnancy date from this calculator differs from the date established by your healthcare professional, use the clinically established date for medical care.
          </p>
        </div>
      </section>
    </article>
  );
};

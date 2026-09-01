"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  ShieldAlert,
  ArrowRight,
  Heart,
  ExternalLink,
} from "lucide-react";
import { period_calculatorFaqs } from "@/app/calculators/period-calculator/faq";

export function PeriodContent() {
  // All 19 FAQs open by default (unfolded like 401(k)), toggleable on click
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 19 }, (_, i) => i))
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
    <article className="mt-8 space-y-8 text-slate-800 font-sans leading-relaxed text-sm sm:text-base">
      {/* Introduction Card */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <p className="text-slate-700 leading-relaxed">
          Wondering when your next period will start, when you may ovulate, or which days of your cycle are most likely to be fertile? A period calculator can provide a useful calendar-based estimate from the first day of your last menstrual period (LMP) and your usual cycle length.
        </p>
        <p className="text-slate-700 leading-relaxed">
          This Period Calculator goes beyond predicting a single upcoming period. It can estimate your next period start and end dates, calculate an approximate ovulation date, identify the six-day fertile window, generate future cycle dates, and provide additional cycle-planning views. Depending on the mode you select, it can also show an estimated prediction range for irregular cycles or help connect cycle timing with conception and pregnancy dating.
        </p>
        <p className="text-slate-700 leading-relaxed">
          The calculation starts with a simple idea: your menstrual cycle is counted from the first day of one period to the first day of the next. If you know your usual cycle length, adding that length to the first day of your last period provides an estimated start date for the next cycle.
        </p>
        <p className="text-slate-700 leading-relaxed">
          The important word is &ldquo;estimated.&rdquo; Periods do not always follow a fixed calendar, and ovulation can shift from cycle to cycle. Stress, illness, changes in body weight, intense exercise, breastfeeding, hormonal contraception, PCOS and the transition toward menopause can all affect menstrual timing.
        </p>
      </section>

      {/* H2 How Do You Calculate Your Next Period? */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          How Do You Calculate Your Next Period?
        </h2>
        <p className="text-slate-700 leading-relaxed">
          A basic period prediction uses:
        </p>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 font-mono text-xs sm:text-sm text-slate-900 space-y-1">
          <div className="font-bold text-rose-600">Next period start = First day of your last period + your average cycle length</div>
        </div>
        <p className="text-slate-700 leading-relaxed">
          For example:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li><strong>Last period:</strong> January 1</li>
          <li><strong>Average cycle length:</strong> 28 days</li>
          <li><strong>Estimated next period:</strong> January 29</li>
        </ul>
        <p className="text-slate-700 leading-relaxed">
          That is because cycle day 1 is January 1, and a 28-day cycle ends with the day before the next period begins.
        </p>
        <p className="text-slate-700 leading-relaxed">
          This calculator uses your actual cycle-length input instead of assuming that every cycle is 28 days. That distinction matters. Someone whose usual cycle is 24 days will generally have a different predicted next-period date from someone whose cycle is 35 or 38 days, even when both periods began on the same day.
        </p>
      </section>

      {/* H2 What Counts as Day 1 of Your Period? */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          What Counts as Day 1 of Your Period?
        </h2>
        <p className="text-slate-700 leading-relaxed">
          For cycle tracking, Day 1 is generally the first day of menstrual bleeding.
        </p>
        <p className="text-slate-700 leading-relaxed">
          That is different from light spotting that occurs before normal menstrual flow. Using the wrong Day 1 shifts every date calculated from the cycle, including the next period and estimated ovulation.
        </p>
        <p className="text-slate-700 leading-relaxed">
          A consistent definition of Day 1 is especially important when you are comparing cycles over several months or entering previous cycles into a fertility-tracking system.
        </p>
        <p className="text-slate-700 leading-relaxed">
          If you are unsure whether bleeding counts as the start of your period, use the pattern you normally recognize as the beginning of full menstrual flow and discuss unusual bleeding with a healthcare professional.
        </p>
      </section>

      {/* H2 What Is a Normal Menstrual Cycle? */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          What Is a Normal Menstrual Cycle?
        </h2>
        <p className="text-slate-700 leading-relaxed">
          The menstrual cycle is measured from the first day of one period to the first day of the next.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Many adult cycles average around 28 days, but individual cycles can be shorter or longer. ACOG advises evaluation when periods consistently occur more often than every 21 days, less often than every 45 days, or when a previously regular pattern becomes irregular. Periods lasting longer than 7 days also warrant medical attention.
        </p>
        <p className="text-slate-700 leading-relaxed">
          This does not mean that every cycle outside a 28-day example is abnormal. A single early or late cycle can happen for many reasons. The more useful question is whether your usual pattern is stable and whether there has been a meaningful change from your normal cycle.
        </p>
        <p className="text-slate-700 leading-relaxed">
          That is why this calculator lets you enter your own average cycle length rather than forcing a universal 28-day assumption.
        </p>
      </section>

      {/* H2 Cycle Length vs. Period Length */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          Cycle Length vs. Period Length
        </h2>
        <p className="text-slate-700 leading-relaxed">
          These two measurements are easy to confuse.
        </p>
        <div className="space-y-3 pt-1">
          <div>
            <h3 className="text-sm font-bold text-slate-900 m-0">Cycle length</h3>
            <p className="text-slate-700 leading-relaxed m-0 mt-0.5">
              Cycle length is the total time from the first day of one period to the first day of the next period.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 m-0">Period length</h3>
            <p className="text-slate-700 leading-relaxed m-0 mt-0.5">
              Period length is the number of days you actually bleed.
            </p>
          </div>
        </div>
        <p className="text-slate-700 leading-relaxed">
          For example: Cycle length: 28 days; Period duration: 5 days. Those are two different measurements. The calculator uses cycle length to predict the next period and period duration to estimate when the menstrual bleeding itself is likely to end. Changing period duration from 5 days to 8 days should therefore not secretly change the underlying cycle length.
        </p>

        {/* Menstrual Cycle Diagram */}
        <div className="mt-4 p-5 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Menstrual Cycle Flow Architecture
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold">
            <span className="px-3 py-1.5 bg-rose-100 text-rose-800 rounded-lg border border-rose-200">
              PERIOD
            </span>
            <span className="text-slate-400 font-bold">↓</span>
            <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg border border-blue-200">
              FOLLICULAR PHASE
            </span>
            <span className="text-slate-400 font-bold">↓</span>
            <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-200">
              OVULATION
            </span>
            <span className="text-slate-400 font-bold">↓</span>
            <span className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-lg border border-purple-200">
              LUTEAL PHASE
            </span>
            <span className="text-slate-400 font-bold">↓</span>
            <span className="px-3 py-1.5 bg-rose-100 text-rose-800 rounded-lg border border-rose-200">
              NEXT PERIOD
            </span>
          </div>
          <p className="text-xs text-slate-500 italic pt-1 m-0">
            Cycle Day 1 = first day of menstrual bleeding.
          </p>
        </div>
      </section>

      {/* H2 How This Period Calculator Works */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          How This Period Calculator Works
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Enter:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>First day of last period</li>
          <li>Average cycle length</li>
          <li>Period duration</li>
          <li>Luteal phase, when using advanced fertility timing</li>
          <li>Age, when supported by the calculator&apos;s analysis</li>
          <li>Cycle regularity</li>
          <li>Birth-control information</li>
          <li>PCOS information, when applicable</li>
        </ul>
        <p className="text-slate-700 leading-relaxed">
          The calculator can then produce:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>next period start date</li>
          <li>expected period end date</li>
          <li>estimated ovulation date</li>
          <li>six-day fertile window</li>
          <li>estimated due date if conception occurs</li>
          <li>future cycle predictions</li>
          <li>irregular-cycle prediction ranges</li>
          <li>cycle-phase information</li>
          <li>cycle regularity scoring</li>
          <li>fertility-planning information</li>
        </ul>
        <p className="text-slate-700 leading-relaxed">
          The available tools are therefore useful for both straightforward cycle tracking and more advanced fertility planning.
        </p>
      </section>

      {/* H2 How Ovulation Is Estimated (Mid-content anchor 1) */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          How Ovulation Is Estimated
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Ovulation does not necessarily happen on cycle day 14. A simple calendar estimate can approximate ovulation by working backward from the expected next period.
        </p>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs sm:text-sm text-slate-900">
          Estimated ovulation day ≈ cycle length − luteal phase length
        </div>
        <p className="text-slate-700 leading-relaxed">
          For a 28-day cycle with a 14-day luteal phase: 28 − 14 = 14. So ovulation is estimated around cycle day 14.
        </p>
        <p className="text-slate-700 leading-relaxed">
          For a 38-day cycle with an 11-day luteal phase: 38 − 11 = 27. So ovulation is estimated around cycle day 27.
        </p>
        <p className="text-slate-700 leading-relaxed">
          These are estimates, not direct observations of ovulation. If you want a dedicated calculation focused specifically on ovulation timing, use the existing{" "}
          <Link
            href="/calculators/ovulation-calculator"
            className="text-blue-600 font-semibold underline hover:text-blue-800 transition-colors"
          >
            ovulation calculator
          </Link>{" "}
          for a more focused view of this part of the cycle.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Do not treat a calendar estimate as proof that ovulation happened on that exact date.
        </p>
      </section>

      {/* H2 The Fertile Window */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          The Fertile Window
        </h2>
        <p className="text-slate-700 leading-relaxed">
          For fertility counseling, ASRM defines the fertile window as the six-day interval ending on the day of ovulation.
        </p>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold">
          5 days before ovulation + ovulation day = 6-day fertile window
        </div>
        <p className="text-slate-700 leading-relaxed">
          The highest probability of conception is generally concentrated in the days immediately before ovulation, particularly the two days preceding it.
        </p>
        <p className="text-slate-700 leading-relaxed">
          A simple example: Ovulation: January 15. Six-day fertile window: January 10, January 11, January 12, January 13, January 14, January 15. This calculator deliberately uses that six-day framework.
        </p>
        <p className="text-slate-700 leading-relaxed">
          However, the fertile window should not be interpreted as a guarantee that pregnancy is impossible on every other day. Calendar estimates are imperfect, ovulation can shift, and sperm and egg survival create biological variability. The most useful interpretation is that these are the days the model considers most relevant for fertility planning.
        </p>
      </section>

      {/* H2 Longer and Shorter Cycles */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          Longer and Shorter Cycles
        </h2>
        <p className="text-slate-700 leading-relaxed">
          The same calculation can produce very different dates when cycle length changes. Example using an LMP of January 1:
        </p>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700">
            <thead className="bg-slate-100 text-slate-900 font-bold">
              <tr>
                <th className="p-3">Average Cycle</th>
                <th className="p-3">Estimated Next Period</th>
                <th className="p-3">Estimated Ovulation with a 14-day Luteal Phase</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">21 days</td>
                <td className="p-3 font-bold text-rose-600">January 22</td>
                <td className="p-3 text-emerald-700">January 8</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">24 days</td>
                <td className="p-3 font-bold text-rose-600">January 25</td>
                <td className="p-3 text-emerald-700">January 11</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">28 days</td>
                <td className="p-3 font-bold text-rose-600">January 29</td>
                <td className="p-3 text-emerald-700">January 15</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">30 days</td>
                <td className="p-3 font-bold text-rose-600">January 31</td>
                <td className="p-3 text-emerald-700">January 17</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">35 days</td>
                <td className="p-3 font-bold text-rose-600">February 5</td>
                <td className="p-3 text-emerald-700">January 22</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 m-0 pt-1">
          These are calendar estimates based on the assumed luteal phase. They should not be interpreted as measured ovulation dates. This is one of the main reasons a period calculator should allow cycle length to be changed instead of assuming every user has a 28-day cycle.
        </p>
      </section>

      {/* H2 Irregular Periods and Prediction Ranges */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          Irregular Periods and Prediction Ranges
        </h2>
        <p className="text-slate-700 leading-relaxed">
          A single predicted date can create false confidence when cycle lengths vary. For that reason, the Irregular Predictor mode uses a prediction range based on the cycle-variability setting.
        </p>
        <p className="text-slate-700 leading-relaxed">
          The current calculator uses estimated variability bands of:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li><strong>Regular:</strong> ±2 days</li>
          <li><strong>Slightly irregular:</strong> ±5 days</li>
          <li><strong>Moderately irregular:</strong> ±10 days</li>
          <li><strong>Highly irregular:</strong> ±15 days</li>
        </ul>
        <p className="text-slate-700 leading-relaxed">
          These are model-based planning ranges, not clinical confidence intervals. For example, if the underlying cycle prediction is January 29 and the selected variability is ±10 days, the calculator may show a broader estimated interval rather than presenting January 29 as though it were certain. This is often a more honest way to represent an unpredictable cycle.
        </p>
        <p className="text-slate-700 leading-relaxed">
          If your periods have become newly irregular, are consistently very far apart, or your previous cycle pattern has changed substantially, the appropriate next step is medical evaluation rather than simply widening a calendar prediction. ACOG and NHS both recommend discussing persistent or changing irregular periods with a healthcare professional.
        </p>
      </section>

      {/* H2 Why a Period Can Be Early or Late */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          Why a Period Can Be Early or Late
        </h2>
        <p className="text-slate-700 leading-relaxed">
          A late period does not automatically mean pregnancy. Common causes of a late or missed period include:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>pregnancy</li>
          <li>stress</li>
          <li>changes in body weight</li>
          <li>excessive exercise</li>
          <li>breastfeeding</li>
          <li>hormonal contraception</li>
          <li>PCOS</li>
          <li>the transition toward menopause</li>
          <li>other hormonal or medical conditions</li>
        </ul>
        <p className="text-slate-700 leading-relaxed">
          NHS guidance lists several of these as common causes of missed or late periods. A calendar calculator cannot determine which cause applies to you. If pregnancy is possible, a pregnancy test is more appropriate than relying on the predicted date alone. If a cycle has changed repeatedly or you are experiencing other symptoms, speak with a qualified healthcare professional.
        </p>
      </section>

      {/* H2 Stress and Menstrual Timing */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          Stress and Menstrual Timing
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Stress can affect menstrual timing because reproductive hormones are controlled through the hypothalamic-pituitary-ovarian system.
        </p>
        <p className="text-slate-700 leading-relaxed">
          A stressful period may be associated with delayed or disrupted ovulation, which then shifts the expected date of the next menstrual period. That is why a cycle that is usually regular can occasionally arrive earlier or later than the date predicted from the previous average.
        </p>
        <p className="text-slate-700 leading-relaxed">
          A calculator cannot measure stress-related hormonal changes. It can only recalculate the calendar estimate when you provide a different cycle pattern.
        </p>
      </section>

      {/* H2 PCOS and Irregular Cycles */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          PCOS and Irregular Cycles
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Polycystic ovary syndrome (PCOS) is a common endocrine condition associated with menstrual irregularity and abnormal ovulation.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Some people with PCOS have long or unpredictable cycles because ovulation may occur less frequently or less predictably. A cycle calculator can help you document the pattern, but it cannot diagnose PCOS.
        </p>
        <p className="text-slate-700 leading-relaxed">
          If you already have a PCOS diagnosis, cycle tracking can provide useful information for discussions with your healthcare team. If you do not have a diagnosis, do not interpret irregular-cycle output as proof that you have PCOS. ACOG notes that PCOS can be associated with irregular menstrual cycles and that treatment depends on symptoms and reproductive goals.
        </p>
      </section>

      {/* H2 Birth Control and Period Predictions */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          Birth Control and Period Predictions
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Hormonal contraception can change bleeding patterns and, depending on the method, may suppress ovulation.
        </p>
        <p className="text-slate-700 leading-relaxed">
          This creates an important distinction: A calendar estimate of when a period might occur is not necessarily the same thing as predicting natural ovulation. For example, some hormonal methods produce withdrawal bleeding rather than a natural menstrual period.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Therefore, if you use hormonal birth control, interpret fertility and ovulation predictions cautiously and according to the contraceptive method you use. The calculator should be considered a planning tool, not a replacement for the contraceptive instructions provided by your healthcare professional.
        </p>
      </section>

      {/* H2 Periods During the Teen Years */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          Periods During the Teen Years
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Menstrual cycles can be less predictable during the first years after menstruation begins because the reproductive hormone system is still maturing.
        </p>
        <p className="text-slate-700 leading-relaxed">
          ACOG notes that adolescent cycles commonly fall within a broader range than the typical adult 28-day example, and persistent gaps of more than 90 days should be evaluated. This means a young teenager should not necessarily compare every cycle with an adult 28-day template.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Cycle tracking can still be useful, but unusual or prolonged gaps should be discussed with a healthcare professional.
        </p>
      </section>

      {/* H2 Perimenopause and Changing Periods */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          Perimenopause and Changing Periods
        </h2>
        <p className="text-slate-700 leading-relaxed">
          As menopause approaches, cycles often become less predictable. A period may come earlier, later, become lighter or heavier, or occasionally be skipped.
        </p>
        <p className="text-slate-700 leading-relaxed">
          NHS guidance lists the start of menopause/perimenopause as a common cause of missed or late periods, usually occurring during the 40s and 50s. A calendar prediction becomes less reliable as cycle variability increases. In this situation, tracking changes over time can be more informative than treating one predicted date as definitive.
        </p>
      </section>

      {/* H2 Period Tracking Over Multiple Months */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          Period Tracking Over Multiple Months
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Looking at one cycle can be misleading. Tracking several cycles can reveal:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>average cycle length</li>
          <li>shortest cycle</li>
          <li>longest cycle</li>
          <li>changes in regularity</li>
          <li>changes in bleeding duration</li>
          <li>approximate ovulation patterns</li>
        </ul>
        <p className="text-slate-700 leading-relaxed">
          The calculator&apos;s 12-month future view is useful for seeing how a recurring pattern would project forward. The key limitation is that future predictions are based on your entered pattern. If your biology changes, the future calendar changes too. A predicted date is therefore a planning estimate, not a promise.
        </p>
      </section>

      {/* H2 The 12-Month Future Calendar */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          The 12-Month Future Calendar
        </h2>
        <p className="text-slate-700 leading-relaxed">
          The 12-Month Future mode extends the same cycle model beyond the next period. Instead of producing only one date, it generates a sequence of future cycle starts and related fertility dates.
        </p>
        <p className="text-slate-700 leading-relaxed">
          This can be useful for:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>planning around expected periods</li>
          <li>spotting changes in cycle regularity</li>
          <li>preparing for travel or events</li>
          <li>tracking fertility timing</li>
          <li>comparing expected and actual cycles over time</li>
        </ul>
        <p className="text-slate-700 leading-relaxed">
          If your real cycle repeatedly differs from the predicted schedule, update your average cycle length rather than continuing to treat old predictions as fixed.
        </p>
      </section>

      {/* H2 Understanding the Cycle Phases */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          Understanding the Cycle Phases
        </h2>
        <p className="text-slate-700 leading-relaxed">
          The menstrual cycle is commonly described in four broad phases:
        </p>
        <div className="space-y-2 pt-1">
          <div>
            <h3 className="text-sm font-bold text-slate-900 m-0">Menstrual phase</h3>
            <p className="text-slate-700 leading-relaxed m-0 mt-0.5">This begins with menstrual bleeding.</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 m-0">Follicular phase</h3>
            <p className="text-slate-700 leading-relaxed m-0 mt-0.5">The ovarian follicles develop and estrogen rises.</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 m-0">Ovulation</h3>
            <p className="text-slate-700 leading-relaxed m-0 mt-0.5">A mature egg is released.</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 m-0">Luteal phase</h3>
            <p className="text-slate-700 leading-relaxed m-0 mt-0.5">After ovulation, progesterone rises as the body prepares for a possible pregnancy.</p>
          </div>
        </div>
        <p className="text-slate-700 leading-relaxed">
          These phases are biologically connected, but their timing can vary between people and between cycles. The calculator uses cycle length and luteal-phase assumptions to estimate where these events fall on the calendar.
        </p>
      </section>

      {/* H2 Why the Luteal Phase Matters */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          Why the Luteal Phase Matters
        </h2>
        <p className="text-slate-700 leading-relaxed">
          The luteal phase is the part of the cycle after ovulation and before the next period. When a cycle calculator assumes a luteal phase, it is effectively estimating ovulation by working backward from the expected next period.
        </p>
        <p className="text-slate-700 leading-relaxed">
          For example: Cycle length: 35 days; Luteal phase: 14 days; Estimated ovulation: cycle day 21. That is: 35 − 14 = 21.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Changing the assumed luteal phase changes the estimated ovulation date. This is why advanced users should avoid entering a luteal-phase value simply to make the result look more convenient. Use a value that reflects your actual cycle tracking when you have one.
        </p>
      </section>

      {/* H2 Period Prediction and Pregnancy (Mid-content anchors 2 & 3) */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          Period Prediction and Pregnancy
        </h2>
        <p className="text-slate-700 leading-relaxed">
          A predicted late period can sometimes be the first clue that pregnancy is possible. If you have had unprotected sex and your period does not arrive as expected, do not rely on the calendar prediction alone. A pregnancy test is the appropriate next step when pregnancy is possible.
        </p>
        <p className="text-slate-700 leading-relaxed">
          The period calculator can estimate the expected date, but it cannot tell you whether a pregnancy has occurred.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Once pregnancy dating becomes relevant, the site&apos;s existing{" "}
          <Link
            href="/calculators/pregnancy-conception-calculator"
            className="text-blue-600 font-semibold underline hover:text-blue-800 transition-colors"
          >
            Pregnancy Conception Calculator
          </Link>{" "}
          can be used to explore conception timing.
        </p>
        <p className="text-slate-700 leading-relaxed">
          For users specifically working backward from an expected delivery date, the existing{" "}
          <Link
            href="/calculators/due-date-calculator"
            className="text-blue-600 font-semibold underline hover:text-blue-800 transition-colors"
          >
            Due Date Calculator
          </Link>{" "}
          is the more focused tool.
        </p>
      </section>

      {/* H2 Fertility Planning */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          Fertility Planning
        </h2>
        <p className="text-slate-700 leading-relaxed">
          If your purpose is to become pregnant, a period prediction can be useful as a starting point, but the fertile window is tied more closely to ovulation than to the period itself.
        </p>
        <p className="text-slate-700 leading-relaxed">
          ASRM recommends identifying the fertile window rather than relying only on a fixed calendar assumption, and fertility-awareness approaches such as ovulation-predictor kits and cervical mucus monitoring can help identify fertility timing.
        </p>
        <p className="text-slate-700 leading-relaxed">
          For that reason, the calculator&apos;s Fertility Planning mode should be treated as a planning aid. If you are specifically looking for ovulation timing, use the site&apos;s existing{" "}
          <Link
            href="/calculators/ovulation-calculator"
            className="text-blue-600 font-semibold underline hover:text-blue-800 transition-colors"
          >
            Ovulation Calculator
          </Link>{" "}
          rather than assuming that the period date alone tells you exactly when ovulation will occur.
        </p>
      </section>

      {/* H2 When a Period Calculator Is Most Useful */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          When a Period Calculator Is Most Useful
        </h2>
        <p className="text-slate-700 leading-relaxed">
          A period calculator is particularly useful for:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>estimating your next expected period</li>
          <li>keeping a consistent calendar record</li>
          <li>seeing how cycle length changes the forecast</li>
          <li>planning around expected menstrual dates</li>
          <li>reviewing a 12-month calendar</li>
          <li>estimating ovulation and fertile timing</li>
          <li>understanding irregular-cycle prediction ranges</li>
          <li>organizing information to discuss with your healthcare provider</li>
        </ul>
        <p className="text-slate-700 leading-relaxed">
          It is less useful when your cycle changes dramatically from month to month and you need an explanation for that change. In those cases, tracking is still valuable, but the reason for the irregularity should be evaluated separately.
        </p>
      </section>

      {/* H2 When to See a Healthcare Professional */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          When to See a Healthcare Professional
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Talk with a healthcare professional if:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>your previously regular periods become irregular</li>
          <li>your periods consistently occur less than 21 days apart</li>
          <li>your periods consistently occur more than 45 days apart</li>
          <li>a period lasts longer than 7 days</li>
          <li>you repeatedly miss periods</li>
          <li>you have significant or worsening pelvic pain</li>
          <li>you have unusually heavy bleeding</li>
          <li>you have symptoms of anemia such as dizziness or unusual fatigue</li>
          <li>pregnancy is possible and your period is late</li>
          <li>you are concerned about PCOS or another hormonal condition</li>
        </ul>
        <p className="text-slate-700 leading-relaxed">
          ACOG identifies periods occurring more often than every 21 days, less often than every 45 days, periods lasting more than 7 days, and very heavy bleeding as reasons to seek medical assessment. If bleeding is heavy enough to soak a pad or tampon every hour for several hours, or you feel dizzy or faint, seek prompt medical attention.
        </p>
      </section>

      {/* H2 What the Calculator Cannot Tell You */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          What the Calculator Cannot Tell You
        </h2>
        <p className="text-slate-700 leading-relaxed">
          A period calculator cannot determine:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>whether you actually ovulated</li>
          <li>whether you are pregnant</li>
          <li>whether irregular periods are caused by PCOS</li>
          <li>whether your hormones are normal</li>
          <li>whether you are fertile</li>
          <li>whether a particular bleeding pattern is medically safe</li>
          <li>whether a delayed period has a specific cause</li>
        </ul>
        <p className="text-slate-700 leading-relaxed">
          It can only calculate a date or range from the information you provide. That distinction is important because a mathematically correct calendar result can still differ from what your body actually does in a particular month.
        </p>
      </section>

      {/* H2 Examples */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          Examples
        </h2>

        {/* Example: Regular 28-Day Cycle */}
        <div className="space-y-2">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 m-0">
            Example: Regular 28-Day Cycle
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 m-0">
            Inputs: LMP: January 1, 2026; Cycle: 28 days; Period duration: 5 days; Luteal phase: 14 days.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700">
            <li><strong>Next period:</strong> January 29, 2026</li>
            <li><strong>Period end:</strong> February 2, 2026</li>
            <li><strong>Ovulation:</strong> January 15, 2026</li>
            <li><strong>Six-day fertile window:</strong> January 10–15, 2026</li>
            <li><strong>Due date if conception occurs around estimated ovulation:</strong> October 8, 2026</li>
          </ul>
          <p className="text-xs text-slate-500 m-0">
            This is the classic example of a 28-day calendar model. It should not be treated as evidence that every person with a 28-day cycle ovulates at exactly the same time.
          </p>
        </div>

        {/* Example: Longer 38-Day Cycle */}
        <div className="border-t border-slate-100 pt-4 space-y-2">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 m-0">
            Example: Longer 38-Day Cycle
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 m-0">
            Inputs: LMP: January 1, 2026; Cycle: 38 days; Period duration: 9 days; Luteal phase: 11 days.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700">
            <li><strong>Estimated next period:</strong> February 8, 2026</li>
            <li><strong>Estimated ovulation:</strong> January 28, 2026</li>
            <li><strong>Estimated fertile window:</strong> January 23–28, 2026</li>
            <li><strong>Estimated due date if conception occurs around estimated ovulation:</strong> October 21, 2026</li>
          </ul>
          <p className="text-xs text-slate-500 m-0">
            The important point is how dramatically the dates change simply because the cycle is longer. This is why using a generic &ldquo;day 14&rdquo; assumption can give misleading fertility timing for people with longer or shorter cycles.
          </p>
        </div>

        {/* How to Make Your Period Predictions More Useful */}
        <div className="border-t border-slate-100 pt-4 space-y-2">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 m-0">
            How to Make Your Period Predictions More Useful
          </h3>
          <ol className="list-decimal pl-5 space-y-1 text-xs sm:text-sm text-slate-700">
            <li>Record the first day of each period consistently.</li>
            <li>Measure cycle length from one period start to the next.</li>
            <li>Track several cycles rather than relying on one.</li>
            <li>Record major changes such as illness, stress, breastfeeding or medication.</li>
            <li>Update your average when your cycle pattern changes.</li>
            <li>Use biological fertility signs when trying to identify ovulation.</li>
            <li>Treat calendar predictions as estimates rather than guarantees.</li>
          </ol>
          <p className="text-xs text-slate-500 m-0">
            The more representative your inputs are of your usual cycle, the more useful the prediction can be.
          </p>
        </div>
      </section>

      {/* H2 Clinical References */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 m-0">
          Clinical References
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">
          This page uses medical information from authoritative sources including:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
          <li className="flex items-start gap-2">
            <ExternalLink className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <a
                href="https://www.acog.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-blue-600 hover:underline"
              >
                American College of Obstetricians and Gynecologists (ACOG)
              </a>{" "}
              — Clinical guidance on normal menstrual frequency, adolescent cycle ranges, and abnormal uterine bleeding.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <ExternalLink className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <a
                href="https://www.asrm.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-blue-600 hover:underline"
              >
                American Society for Reproductive Medicine (ASRM)
              </a>{" "}
              — Practice Committee clinical guidelines defining the six-day fertile window and optimizing natural fertility.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <ExternalLink className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <a
                href="https://www.nhs.uk/conditions/missed-or-late-periods/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-blue-600 hover:underline"
              >
                NHS
              </a>{" "}
              — Clinical evidence on causes of late or missed periods, perimenopause, stress, and medical evaluation criteria.
            </div>
          </li>
        </ul>
      </section>

      {/* H2 Frequently Asked Questions (Unfolded by Default, 401(k) Style) */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <HelpCircle className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 m-0">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {period_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* H2 Related Calculators (Clean 401(k) Style Cards) */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Heart className="h-5 w-5 text-rose-600" />
            Related Calculators
          </h2>
          <p className="text-xs text-slate-500 mt-1 m-0">
            Explore companion tools for ovulation timing, conception planning, and obstetrical dating.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/calculators/ovulation-calculator"
            className="p-4 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/30 transition-all block group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-rose-600">
                Ovulation Calculator
              </span>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-rose-600 transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 mt-1.5 leading-normal m-0">
              Estimate ovulation timing and the fertile window from your cycle information.
            </p>
            <span className="text-[11px] font-semibold text-rose-600 mt-2.5 inline-block">
              Calculate Ovulation →
            </span>
          </Link>

          <Link
            href="/calculators/pregnancy-conception-calculator"
            className="p-4 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/30 transition-all block group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-rose-600">
                Pregnancy Conception Calculator
              </span>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-rose-600 transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 mt-1.5 leading-normal m-0">
              Explore estimated conception timing and related pregnancy dates.
            </p>
            <span className="text-[11px] font-semibold text-rose-600 mt-2.5 inline-block">
              Explore Conception →
            </span>
          </Link>

          <Link
            href="/calculators/due-date-calculator"
            className="p-4 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/30 transition-all block group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-rose-600">
                Due Date Calculator
              </span>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-rose-600 transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 mt-1.5 leading-normal m-0">
              Calculate an estimated delivery date from pregnancy or menstrual dates.
            </p>
            <span className="text-[11px] font-semibold text-rose-600 mt-2.5 inline-block">
              Calculate Due Date →
            </span>
          </Link>
        </div>
      </section>

      {/* Medical Disclaimer Card */}
      <section className="bg-amber-50/60 border border-amber-200 p-6 rounded-xl flex items-start gap-3.5 text-xs sm:text-sm text-amber-900 shadow-xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-amber-950 font-bold block">Medical Disclaimer</strong>
          <p className="leading-relaxed m-0 text-amber-900/90">
            This period calculator provides calendar-based estimates for menstrual timing, ovulation, fertile-window timing and related dates. It is an educational tool and does not diagnose pregnancy, infertility, PCOS, hormonal disorders or other medical conditions. Actual menstrual and ovulatory timing can vary from cycle to cycle. If you experience persistent irregular periods, unusually heavy or prolonged bleeding, severe pain, missed periods, or other concerning symptoms, consult a qualified healthcare professional.
          </p>
        </div>
      </section>
    </article>
  );
}

export default PeriodContent;

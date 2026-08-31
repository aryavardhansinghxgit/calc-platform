"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  Calculator,
  Scale,
  Flame,
  Activity,
  Heart,
  Calendar,
  Sparkles,
  PieChart,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { ovulation_calculatorFaqs } from "@/app/calculators/ovulation-calculator/faq";

export function OvulationContent() {
  // All 20 approved FAQs open by default for maximum accessibility & SEO indexing
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 20 }, (_, i) => i))
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

  const relatedCalculators = [
    {
      name: "Due Date Calculator",
      slug: "/calculators/due-date-calculator",
      desc: "Estimate an expected delivery date from pregnancy timing information.",
      icon: Calendar,
    },
    {
      name: "Pregnancy Calculator",
      slug: "/calculators/pregnancy-calculator",
      desc: "Explore pregnancy timing, gestational age and key pregnancy milestones.",
      icon: Sparkles,
    },
    {
      name: "Pregnancy Conception Calculator",
      slug: "/calculators/pregnancy-conception-calculator",
      desc: "Work backward from pregnancy timing to estimate a possible conception period.",
      icon: Heart,
    },
    {
      name: "Pregnancy Weight Gain Calculator",
      slug: "/calculators/pregnancy-weight-gain-calculator",
      desc: "Review pregnancy weight-gain planning based on pre-pregnancy characteristics.",
      icon: Scale,
    },
    {
      name: "BMI Calculator",
      slug: "/calculators/bmi-calculator",
      desc: "Calculate BMI as one component of general health assessment.",
      icon: Scale,
    },
    {
      name: "Period Calculator",
      slug: "/calculators/period-calculator",
      desc: "Forecast upcoming menstrual cycles, period dates, and cycle regularities.",
      icon: Activity,
    },
    {
      name: "Calorie Calculator",
      slug: "/calculators/calorie-calculator",
      desc: "Estimate daily energy needs for preconception health and metabolic balance.",
      icon: Flame,
    },
    {
      name: "Macro Calculator",
      slug: "/calculators/macro-calculator",
      desc: "Model balanced macronutrient intake to support reproductive and hormonal health.",
      icon: PieChart,
    },
  ];

  return (
    <article className="mt-6 bg-white rounded-xl border border-slate-200 p-5 sm:p-7 text-slate-800 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 print:border-none print:p-0 print:m-0 print:space-y-4 print:divide-y-0 font-sans">
      {/* 1. INTRODUCTORY CONTENT & ESTIMATION SCOPE */}
      <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-800">
        <section className="space-y-3 print:break-inside-avoid">
          <div className="flex items-center gap-2 pb-1">
            <span className="p-1.5 rounded-lg bg-pink-50 text-pink-600">
              <BookOpen className="h-4 w-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
              Clinical Reproductive Guidance
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600">
            Ovulation Calculator: Estimate Your Fertile Window and Ovulation Date
          </h2>
          <p>
            An ovulation calculator estimates when ovulation may occur based on your menstrual-cycle information. By entering the first day of your last menstrual period, average cycle length, and related cycle parameters, you can estimate a likely ovulation date, fertile window, peak fertility period, expected next period, and other cycle milestones.
          </p>
          <p>
            The important word is <strong>estimate</strong>. Ovulation does not necessarily occur on the same calendar day every cycle, and even people with regular periods can experience variation in the timing of the fertile window. Research published in <em>The BMJ</em> found substantial variation in when the fertile window occurred across menstrual cycles, including among women who considered their cycles regular.
          </p>
          <p>
            This calculator therefore works best as a cycle-planning and fertility-awareness tool, rather than as a direct measurement of ovulation. The American Society for Reproductive Medicine (ASRM) notes that calendar-based methods estimate ovulation from cycle length and commonly assume an approximately 14-day luteal phase; it also recommends using fertility-awareness markers such as cervical mucus, ovulation-detection devices and basal body temperature when appropriate.
          </p>
        </section>

        {/* What this ovulation calculator can estimate */}
        <section className="space-y-3 print:break-inside-avoid">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            What This Ovulation Calculator Can Estimate
          </h3>
          <p>The calculator can help you estimate:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
            <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-pink-600 shrink-0"></span>
              <span>Predicted ovulation date</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-pink-600 shrink-0"></span>
              <span>Six-day fertile window</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0"></span>
              <span>Peak fertility days</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-slate-600 shrink-0"></span>
              <span>Next expected menstrual period</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0"></span>
              <span>Estimated implantation reference window</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
              <span>Estimated due date when conception occurs</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>
              <span>Cycle-day relationships &amp; fertility awareness</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-pink-500 shrink-0"></span>
              <span>Interactive calendar and chart views</span>
            </div>
          </div>
          <p className="pt-1">
            For more complete pregnancy planning, combine this tool with our{" "}
            <Link href="/calculators/due-date-calculator" className="text-blue-600 font-semibold hover:underline">
              Due Date Calculator
            </Link>
            ,{" "}
            <Link href="/calculators/pregnancy-calculator" className="text-blue-600 font-semibold hover:underline">
              Pregnancy Calculator
            </Link>{" "}
            and{" "}
            <Link href="/calculators/pregnancy-conception-calculator" className="text-blue-600 font-semibold hover:underline">
              Pregnancy Conception Calculator
            </Link>
            .
          </p>
        </section>

        {/* 2. WHAT IS OVULATION */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            What Is Ovulation?
          </h2>
          <p>
            Ovulation is the release of an egg from an ovary. The timing of ovulation is important because conception is most likely when viable sperm are present around the time the egg is released.
          </p>
          <p>
            For cycle planning, the relationship between ovulation and the following menstrual period is often more useful than simply assuming that ovulation always happens on cycle day 14. ASRM&apos;s fertility-awareness guidance describes calendar-based prediction using an approximately 14-day luteal phase; therefore, a 28-day cycle is commonly estimated to ovulate around day 14, while a 30-day cycle may be estimated around day 16.
          </p>
          <p>
            That calculation is a population-based planning model, not a guarantee that your ovaries will release an egg on that exact date.
          </p>
        </section>

        {/* 3. HOW THE CALCULATOR WORKS */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            How Does an Ovulation Calculator Work?
          </h2>
          <p>The primary calculation follows this basic sequence:</p>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 text-center leading-relaxed space-y-1">
            <div>First day of last period</div>
            <div className="text-pink-600 font-bold">↓</div>
            <div>Average cycle length</div>
            <div className="text-pink-600 font-bold">↓</div>
            <div>Estimated ovulation day</div>
            <div className="text-pink-600 font-bold">↓</div>
            <div>6-day fertile window</div>
            <div className="text-pink-600 font-bold">↓</div>
            <div>Peak fertility period</div>
            <div className="text-pink-600 font-bold">↓</div>
            <div>Next expected period</div>
            <div className="text-pink-600 font-bold">↓</div>
            <div>Additional cycle milestones</div>
          </div>

          <p>
            For a calendar-based estimate, the calculator uses the expected relationship between cycle length and luteal-phase duration.
          </p>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Simplified Ovulation Estimate</h3>
            <p className="font-mono text-xs text-blue-900 font-semibold bg-white p-2.5 rounded-lg border border-slate-200">
              Estimated ovulation day ≈ cycle length − luteal phase length
            </p>
            <div className="text-xs text-slate-700 space-y-1 pt-1">
              <div>• 28-day cycle with a 14-day luteal estimate → approximately cycle day 14</div>
              <div>• 30-day cycle with a 14-day luteal estimate → approximately cycle day 16</div>
              <div>• 35-day cycle with a 14-day luteal estimate → approximately cycle day 21</div>
            </div>
          </div>

          <p>
            The actual timing can differ from this estimate, which is why cycle tracking and ovulation biomarkers can provide additional information. ASRM specifically notes that the timing of the fertile window can vary considerably, including in women with regular cycles.
          </p>
        </section>

        {/* 4. THE SIX-DAY FERTILE WINDOW */}
        <section className="space-y-4 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            What Is the Fertile Window?
          </h2>
          <p>
            For clinical counseling, ASRM defines the fertile window as the six-day interval ending on the day of ovulation. That means:
          </p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center font-mono font-bold text-xs text-blue-900">
            O−5 → O−4 → O−3 → O−2 → O−1 → O &nbsp;&nbsp;(where O = ovulation day)
          </div>
          <p>For example, if estimated ovulation is August 15:</p>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">Cycle Timing</th>
                  <th className="p-3">Calendar Date</th>
                  <th className="p-3">Fertility Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-semibold text-slate-900">O−5</td>
                  <td className="p-3 font-semibold">Aug 10</td>
                  <td className="p-3">Fertile Window Begins</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-semibold text-slate-900">O−4</td>
                  <td className="p-3 font-semibold">Aug 11</td>
                  <td className="p-3">Fertile Window</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-semibold text-slate-900">O−3</td>
                  <td className="p-3 font-semibold">Aug 12</td>
                  <td className="p-3">Fertile Window</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-purple-700">O−2</td>
                  <td className="p-3 font-bold text-purple-700">Aug 13</td>
                  <td className="p-3 font-semibold text-purple-700">Peak Fertility Window</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-purple-700">O−1</td>
                  <td className="p-3 font-bold text-purple-700">Aug 14</td>
                  <td className="p-3 font-semibold text-purple-700">Peak Fertility Window</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-pink-700">O</td>
                  <td className="p-3 font-bold text-pink-700">Aug 15</td>
                  <td className="p-3 font-bold text-pink-700">Predicted Ovulation Day</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            This is why the calculator labels August 10–15 as a six-day fertile window rather than August 10–16. ASRM uses this six-day definition for counseling, and Wilcox&apos;s prospective study similarly found that pregnancies in its study occurred when intercourse took place during a six-day period ending on the estimated day of ovulation.
          </p>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Why Do Some Sources Mention Six or Seven Days?</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              There is a terminology difference worth understanding.
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              ASRM&apos;s counseling definition is the six-day fertile window ending on ovulation. The American College of Obstetricians and Gynecologists (ACOG) patient guidance explains that sperm can survive for several days and that pregnancy may occur with intercourse from about five days before ovulation through one day afterward.
            </p>
            <p className="text-xs text-slate-700 leading-relaxed m-0">
              So the biological opportunity for conception should not be interpreted as a guarantee that every person has exactly the same fertile dates. The calculator uses the six-day ASRM counseling window for its primary fertility-window display.
            </p>
          </div>
        </section>

        {/* 5. WHEN IS FERTILITY HIGHEST */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            When Are the Best Days to Try to Conceive?
          </h2>
          <p>
            Fertility is not equally distributed across the fertile window. ASRM states that peak fecundability is observed when intercourse occurs within approximately the two days before ovulation, although the exact pattern varies between studies.
          </p>
          <p>
            For practical planning, the calculator therefore highlights the period immediately preceding predicted ovulation as the most important part of the fertile window.
          </p>
          <p>
            A useful strategy is to avoid waiting until the exact predicted ovulation date. Because the prediction itself is uncertain, intercourse on multiple days across the fertile window provides better coverage than relying on one calculated date.
          </p>
          <p>
            ASRM reports that reproductive efficiency is highest with intercourse every 1–2 days during the fertile window, while less frequent intercourse, such as two to three times per week, can produce nearly equivalent results for many couples.
          </p>
        </section>

        {/* 6. CALENDAR PREDICTION VS ACTUAL OVULATION */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Can an Ovulation Calculator Tell Exactly When I Ovulate?
          </h2>
          <p className="font-bold text-slate-900">No.</p>
          <p>
            A calendar calculator predicts a likely date from cycle history. It does not directly measure follicular development, the luteinizing-hormone surge, or the release of the egg.
          </p>
          <p>
            This distinction matters because the fertile window can shift from one cycle to another. <em>BMJ</em> research found that the fertile window can occur across a broad portion of the menstrual cycle and that many women cannot predict a sporadically late ovulation simply from previous cycle patterns.
          </p>
          <p>For greater cycle awareness, some people combine calendar estimates with:</p>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-pink-600 block">Ovulation predictor kits (OPKs)</strong>
              <p className="text-slate-700 m-0">These detect urinary hormonal changes associated with the LH surge.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-purple-600 block">Basal body temperature (BBT)</strong>
              <p className="text-slate-700 m-0">A sustained post-ovulatory temperature rise can help retrospectively identify that ovulation likely occurred.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-blue-600 block">Cervical mucus observations</strong>
              <p className="text-slate-700 m-0">Changes in cervical mucus can provide additional information about approaching fertility.</p>
            </div>
          </div>

          <p className="text-xs text-slate-600 pt-1">
            ACOG describes fertility-awareness methods as including recognition of fertile time and the use of fertility signs and timing information.
          </p>
        </section>

        {/* 7. UNDERSTANDING OPKS */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            How Does an Ovulation Predictor Kit Work?
          </h2>
          <p>
            An ovulation predictor kit detects an LH surge in urine. The LH surge generally occurs shortly before ovulation, making an OPK useful for identifying a period when ovulation may be approaching.
          </p>
          <p>
            A positive OPK should not be interpreted as proof that an egg has definitely been released. The calculator therefore uses OPK information as an additional observation, not as an absolute measurement.
          </p>
          <p>For the most useful interpretation, consider the OPK result together with:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs">
            <li>cycle day</li>
            <li>expected ovulation</li>
            <li>cervical mucus</li>
            <li>BBT pattern</li>
            <li>the consistency of previous cycles</li>
          </ul>
          <p className="text-xs text-slate-600">
            This is particularly important when cycles are irregular.
          </p>
        </section>

        {/* 8. WHY CYCLE LENGTH MATTERS */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            How Does Cycle Length Affect Ovulation?
          </h2>
          <p>Cycle length can substantially change the estimated ovulation date.</p>
          <p>A simplified example using a 14-day luteal-phase assumption:</p>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">Cycle Length</th>
                  <th className="p-3">Approximate Ovulation Day</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50"><td className="p-2.5 font-semibold">21 days</td><td className="p-2.5 font-mono">Day 7</td></tr>
                <tr className="hover:bg-slate-50"><td className="p-2.5 font-semibold">24 days</td><td className="p-2.5 font-mono">Day 10</td></tr>
                <tr className="hover:bg-slate-50"><td className="p-2.5 font-semibold">28 days</td><td className="p-2.5 font-mono">Day 14</td></tr>
                <tr className="hover:bg-slate-50"><td className="p-2.5 font-semibold">30 days</td><td className="p-2.5 font-mono">Day 16</td></tr>
                <tr className="hover:bg-slate-50"><td className="p-2.5 font-semibold">32 days</td><td className="p-2.5 font-mono">Day 18</td></tr>
                <tr className="hover:bg-slate-50"><td className="p-2.5 font-semibold">35 days</td><td className="p-2.5 font-mono">Day 21</td></tr>
                <tr className="hover:bg-slate-50"><td className="p-2.5 font-semibold">40 days</td><td className="p-2.5 font-mono">Day 26</td></tr>
                <tr className="hover:bg-slate-50"><td className="p-2.5 font-semibold">45 days</td><td className="p-2.5 font-mono">Day 31</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-600 italic">
            These are calendar-model examples, not personalized predictions.
          </p>
          <p>
            ASRM specifically explains that calendar methods generally presume an approximately 14-day luteal phase and calculate the expected ovulation day from cycle length.
          </p>
          <p>
            Your calculator dynamically adjusts its calendar and hormone visualization for different cycle lengths rather than forcing every user into a 28-day template.
          </p>
        </section>

        {/* 9. WORKED EXAMPLE */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Example: 28-Day Cycle
          </h2>
          <p>
            Suppose the first day of the last menstrual period is August 1 and the average cycle length is 28 days.
          </p>
          <p>Using a 14-day luteal-phase estimate:</p>
          <div className="font-mono text-xs text-slate-800 space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>• Estimated ovulation: <span className="font-bold text-blue-700">August 15</span></div>
            <div>• Six-day fertile window: <span className="font-bold text-emerald-700">August 10 – August 15</span></div>
            <div>• Peak fertility period: <span className="font-bold text-purple-700">approximately August 13 – August 15</span></div>
            <div>• Next expected period: <span className="font-bold text-slate-900">August 29</span></div>
          </div>
          <p>The calculator&apos;s current verified baseline produces exactly these dates.</p>
          <p className="text-xs text-slate-600">
            The dates should still be treated as estimates because the actual day of ovulation can move between cycles.
          </p>
        </section>

        {/* 10. LUTEAL PHASE */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            What Is the Luteal Phase?
          </h2>
          <p>
            The luteal phase is the part of the menstrual cycle after ovulation and before the next period.
          </p>
          <p>
            For calendar prediction, luteal-phase length is particularly important because the calculator estimates ovulation by working backward from the expected next period.
          </p>
          <p>
            The new calculator lets the user set a luteal-phase estimate from 9 to 18 days, rather than silently forcing everyone to use 14 days.
          </p>
          <p className="text-xs text-slate-600">
            That makes the calculation more transparent, but the resulting date is still an estimate.
          </p>
        </section>

        {/* 11. IMPLANTATION TIMING */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            What Is the Implantation Window?
          </h2>
          <p>
            Implantation occurs after fertilization and embryo development, not immediately at ovulation.
          </p>
          <p>
            For planning purposes, the calculator displays an estimated implantation reference window, rather than a guaranteed implantation date.
          </p>
          <p>
            Because implantation timing varies, a calendar estimate should not be used to determine with certainty whether implantation has occurred or whether a pregnancy is progressing normally.
          </p>
          <p>The calculator&apos;s clinical content should therefore use terms such as:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs">
            <li>estimated</li>
            <li>reference window</li>
            <li>typical timing</li>
            <li>may occur</li>
          </ul>
          <p className="text-xs text-slate-500 italic">
            rather than: guaranteed implantation, exact implantation date, or confirmed implantation.
          </p>
        </section>

        {/* 12. CONCEPTION PROBABILITY */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Does the Calculator Predict My Exact Chance of Getting Pregnant?
          </h2>
          <p className="font-bold text-slate-900">No.</p>
          <p>
            A fertility score in the calculator is a relative cycle-planning index, not a guarantee that you will conceive on a particular day.
          </p>
          <p>
            This distinction was deliberately built into the current implementation to ensure a relative fertility index is never conflated with an individual conception probability. The production version clearly separates the cycle-planning index from population fecundability.
          </p>
          <p>
            Research by Wilcox and colleagues found estimated conception probabilities in the fertile interval ranging from roughly 10% to 33% depending on timing, with the highest estimates around ovulation. Those figures describe a study population, not the individualized probability for every person using a calculator.
          </p>
          <p>
            Age, sperm quality, ovulatory status, tubal factors, timing, frequency of intercourse and many other biological variables affect the real probability of conception.
          </p>
        </section>

        {/* 13. CAN TIMING DETERMINE BABY'S SEX */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Does Timing Intercourse Determine Whether the Baby Is a Boy or Girl?
          </h2>
          <p>No reliable evidence supports using intercourse timing to select fetal sex.</p>
          <p>
            The widely circulated Shettles method is a historical hypothesis, not an evidence-based sex-selection method. Wilcox and colleagues specifically reported that the timing of intercourse relative to ovulation had no practical influence on the sex of the baby.
          </p>
          <p>
            Therefore, an evidence-based ovulation calculator should focus on conception timing, not promises of boy-or-girl selection.
          </p>
          <p className="text-xs text-slate-600">
            The current calculator strictly adheres to clinical guidance, excluding speculative sperm-sorting and sex-optimization hypotheses.
          </p>
        </section>

        {/* 14. WHEN TO SEEK FERTILITY EVALUATION */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            When Should I Talk to a Fertility Specialist?
          </h2>
          <p>An ovulation calculator should not be used to diagnose infertility.</p>
          <p>
            ASRM states that, when there are no known risk factors, infertility evaluation generally begins after 12 months of regular unprotected intercourse when the female partner is under 35, and after 6 months when the female partner is 35 or older. Earlier evaluation can be appropriate when there are known risk factors or concerning menstrual or reproductive findings.
          </p>
          <p>Examples that can justify earlier medical evaluation include:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs">
            <li>very irregular cycles</li>
            <li>absent periods</li>
            <li>suspected ovulatory problems</li>
            <li>known endometriosis</li>
            <li>known tubal disease</li>
            <li>known or suspected male-factor infertility</li>
            <li>other conditions associated with reduced fertility</li>
          </ul>
        </section>

        {/* 15. PRECONCEPTION PREPARATION */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            What Should I Do Before Trying to Conceive?
          </h2>
          <p>Cycle timing is only one part of preconception health.</p>
          <p>
            ACOG recommends that most people who may become pregnant take a daily supplement containing at least 400 micrograms of folic acid, beginning at least one month before pregnancy when possible and continuing through the first 12 weeks.
          </p>
          <p>
            Preconception care can also include reviewing medications, chronic medical conditions, vaccinations, lifestyle factors and nutritional needs with a healthcare professional.
          </p>
          <p className="text-xs text-slate-600">
            The calculator is for cycle-planning information; it does not replace preconception or fertility care.
          </p>
        </section>

        {/* 16. PRACTICAL INTERPRETATION GUIDE */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            How to Use an Ovulation Calculator More Effectively
          </h2>
          <p>A useful workflow is:</p>
          <div className="space-y-2 text-xs text-slate-800">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-medium">
              <strong>Step 1:</strong> Enter the first day of your last period.
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-medium">
              <strong>Step 2:</strong> Enter your typical cycle length.
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-medium">
              <strong>Step 3:</strong> Review the predicted ovulation date.
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-medium">
              <strong>Step 4:</strong> Treat the six-day fertile window as a planning range rather than a single guaranteed day.
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-medium">
              <strong>Step 5:</strong> Consider additional fertility signs such as OPKs, cervical mucus and BBT.
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-medium">
              <strong>Step 6:</strong> Repeat the process over several cycles to learn how consistent your own pattern is.
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-medium">
              <strong>Step 7:</strong> Seek medical advice when cycles are highly irregular, ovulation appears absent, or conception is taking longer than expected.
            </div>
          </div>
          <p className="text-xs text-slate-600 pt-1">
            This approach is more robust than relying on a single calendar prediction. ASRM specifically notes the value of fertility-awareness methods and the variability of the fertile window.
          </p>
        </section>
      </div>

      {/* 2. RELATED CALCULATORS MODULE WITH CONTEXTUAL ANCHORS */}
      <div className="pt-6 print:hidden">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          Related Pregnancy &amp; Fertility Calculators
        </h2>
        <p className="text-xs text-slate-600 mb-4">
          Continue planning with these related tools:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {relatedCalculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link
                key={calc.slug}
                href={calc.slug}
                className="p-3.5 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 rounded-xl transition-all group flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-md bg-white border border-slate-200 text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                      {calc.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {calc.desc}
                  </p>
                </div>
                <div className="text-[10px] font-bold text-blue-600 group-hover:underline pt-2">
                  Launch Tool →
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 3. FREQUENTLY ASKED QUESTIONS (EXACT 20 AUTHORITATIVE FAQS) */}
      <div className="pt-6 print:pt-3 print:break-inside-auto">
        <div className="flex items-center gap-2 mb-4 print:mb-2 print:break-after-avoid">
          <HelpCircle className="h-5 w-5 text-blue-600 print:hidden" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Frequently Asked Questions (20 Clinical Answers)
          </h2>
        </div>

        <div className="space-y-2.5 print:space-y-2">
          {ovulation_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs print:border-slate-300 print:shadow-none print:break-inside-avoid"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-3.5 text-left text-xs sm:text-sm font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer print:p-2"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-pink-600 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 print:hidden ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`${
                    isOpen ? "block" : "hidden"
                  } print:block p-3.5 pt-0 print:pt-1 text-xs text-slate-700 leading-relaxed bg-slate-50/50 font-normal print:bg-white`}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. METHODOLOGY & SOURCES */}
      <div className="pt-6 print:pt-3 print:break-inside-avoid">
        <section className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-700">
          <div className="flex items-center gap-2 font-bold text-slate-900 uppercase tracking-wider">
            <FileText className="h-4 w-4 text-blue-600 shrink-0" />
            Methodology &amp; Sources
          </div>
          <p className="leading-relaxed">
            This calculator&apos;s fertility-window methodology is informed by reproductive-health guidance from the American Society for Reproductive Medicine (ASRM) and patient guidance from the American College of Obstetricians and Gynecologists (ACOG). Fertility-window and conception-timing discussion also draws on prospective research by Wilcox, Weinberg and Baird published in the <em>New England Journal of Medicine</em> and subsequent work published in <em>The BMJ</em>.
          </p>
          <p className="leading-relaxed m-0">
            For users seeking medical diagnosis or individualized fertility treatment, professional evaluation is more appropriate than a calendar-based prediction.
          </p>
        </section>
      </div>

      {/* 5. MEDICAL / FERTILITY DISCLAIMER */}
      <div className="pt-6 print:pt-3 print:break-inside-avoid">
        <section className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-2 font-bold text-slate-900 uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0" />
            Important Health Disclaimer
          </div>
          <p className="leading-relaxed">
            This ovulation calculator is provided for educational and planning purposes. It estimates ovulation and fertile-window timing from menstrual-cycle information and other user-entered observations. It does not directly measure ovulation, diagnose infertility, confirm pregnancy, or guarantee conception.
          </p>
          <p className="leading-relaxed m-0">
            Cycle timing can vary between individuals and between cycles. A healthcare professional should be consulted for concerns about irregular or absent periods, suspected ovulation problems, infertility, pregnancy complications, or other reproductive-health conditions.
          </p>
        </section>
      </div>
    </article>
  );
}

export default OvulationContent;

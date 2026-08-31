"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  BookOpen,
  Calendar,
  Sparkles,
  Heart,
  ShieldCheck,
  Activity,
  Clock,
  Info,
  Layers,
  HelpCircle,
  AlertTriangle,
  FileText,
  ExternalLink,
  CheckCircle2,
  Baby,
  Stethoscope,
  Zap,
} from "lucide-react";
import { conception_calculatorFaqs } from "@/app/calculators/conception-calculator/faq";

export function ConceptionContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <article className="space-y-8 text-slate-800 leading-relaxed font-normal">
      {/* 1. Introduction */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 m-0">
              Conception Calculator: Understanding When Fertilization Occurred
            </h2>
            <p className="text-xs text-rose-600 font-semibold m-0 mt-0.5">
              Evidence-Based Reproductive Timing Based on ASRM and ACOG Clinical Guidelines
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Trying to work out when conception most likely occurred can be surprisingly difficult. The date of intercourse is not necessarily the date of conception because sperm can remain viable in the reproductive tract for several days, while the egg is available for fertilization for a much shorter period after ovulation.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          This Conception Calculator estimates the most likely conception date from the information you know about your menstrual cycle, ovulation, pregnancy dating, ultrasound or assisted reproductive treatment.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Depending on the calculation mode, you can use a last menstrual period (LMP), a known ovulation date, an estimated due date, ultrasound gestational age, or an IVF embryo-transfer date. The calculator then provides related dates such as estimated conception, ovulation, fertile-window timing, implantation timing, pregnancy-test timing and estimated due date.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          The important point is that a conception calculator estimates timing rather than identifying the exact moment fertilization occurred. Even with accurate cycle information, biological events do not always happen according to a fixed calendar.
        </p>
      </section>

      {/* 2. Quick Answer: When Does Conception Usually Happen? */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Sparkles className="h-5 w-5 text-rose-600" />
            Quick Answer: When Does Conception Usually Happen?
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Understanding the biological interval between intercourse, ovulation, and fertilization
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Conception occurs when a sperm fertilizes an egg, usually around the time of ovulation.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          For natural conception, the most important period is the fertile window leading up to ovulation. The American Society for Reproductive Medicine (ASRM) defines the fertile window for fertility counseling as the six-day interval ending on the day of ovulation. Research summarized by ASRM indicates that fecundability is highest when intercourse occurs within the two days before ovulation.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Sperm can survive for several days in the female reproductive tract, which means intercourse before ovulation can result in conception later. The egg, in contrast, remains capable of fertilization for only a relatively short period after it is released.
        </p>

        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 space-y-1">
          <strong className="text-slate-900 block font-bold">Key Clinical Takeaway:</strong>
          <p className="m-0 leading-relaxed">
            This is why the date of intercourse, the date of ovulation and the estimated conception date should not automatically be treated as the same date.
          </p>
        </div>
      </section>

      {/* 3. How This Conception Calculator Works */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Activity className="h-5 w-5 text-rose-600" />
            How This Conception Calculator Works
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Five tailored clinical dating modalities adapted to the specific reproductive information you have
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          This calculator uses different dating methods depending on which information you have:
        </p>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm m-0">1. Last Menstrual Period (LMP)</h3>
            <p className="text-slate-700 leading-relaxed m-0">
              If you know the first day of your last menstrual period, the calculator estimates ovulation using the cycle length and luteal-phase information you enter.
            </p>
            <div className="p-2.5 rounded-lg bg-white border border-slate-200 font-mono text-xs text-rose-700 font-semibold inline-block">
              Ovulation date ≈ LMP + (cycle length − luteal phase length)
            </div>
            <p className="text-slate-700 leading-relaxed m-0">
              The resulting ovulation estimate is then used as the basis for estimated conception timing. This approach is more flexible than simply assuming that everybody ovulates on cycle day 14. A 28-day cycle and a 35-day cycle can have substantially different ovulation dates.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm m-0">2. Known Ovulation Date</h3>
            <p className="text-slate-700 leading-relaxed m-0">
              If you have a reasonably reliable ovulation date from cycle tracking, an ovulation predictor test, fertility monitoring or another method, entering that date removes much of the uncertainty created by estimating ovulation solely from menstrual-cycle length. The calculator can then use the known ovulation date to estimate conception timing and related pregnancy dates.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm m-0">3. Reverse Calculation From an Estimated Due Date</h3>
            <p className="text-slate-700 leading-relaxed m-0">
              You can also work backward from an estimated due date. A typical pregnancy dating convention is approximately 280 days from the first day of the last menstrual period, while conception-based dating is approximately 266 days from fertilization.
            </p>
            <p className="text-slate-700 leading-relaxed m-0">
              This distinction matters because pregnancy is conventionally dated from the LMP rather than from the day fertilization occurred. For this reason:
            </p>
            <div className="p-2.5 rounded-lg bg-white border border-slate-200 font-mono text-xs text-rose-700 font-semibold inline-block">
              Estimated conception date ≈ estimated due date − 266 days
            </div>
            <p className="text-slate-600 leading-relaxed m-0 text-xs">
              This is an estimate rather than proof of the exact conception date.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm m-0">4. Ultrasound Dating</h3>
            <p className="text-slate-700 leading-relaxed m-0">
              Early ultrasound can provide an important independent method of pregnancy dating, especially when the LMP is uncertain or menstrual cycles are irregular.
            </p>
            <p className="text-slate-700 leading-relaxed m-0">
              According to the American College of Obstetricians and Gynecologists (ACOG), first-trimester ultrasound measurement of the embryo or fetus is the most accurate method for establishing or confirming gestational age.
            </p>
            <p className="text-slate-600 leading-relaxed m-0 text-xs">
              The accuracy becomes less precise as pregnancy progresses, so an early dating ultrasound should not be treated as equivalent to a later pregnancy scan for determining the original conception date.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm m-0">5. IVF Embryo Transfer</h3>
            <p className="text-slate-700 leading-relaxed m-0">
              IVF provides another special case because the embryo-transfer date and embryo age are known.
            </p>
            <p className="text-slate-700 leading-relaxed m-0">
              For assisted reproductive technology pregnancies, ACOG recommends using the ART-derived gestational age when assigning the estimated due date. For example, the due-date calculation differs according to whether a day-3 embryo or day-5 embryo was transferred. This makes IVF dating fundamentally different from an estimate based only on an LMP.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Conception Date vs. Intercourse Date */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Clock className="h-5 w-5 text-rose-600" />
            Conception Date vs. Intercourse Date
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Why sexual intercourse timing and fertilization timing often diverge by days
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          One of the most common mistakes when trying to determine conception is assuming that the date of intercourse must be the conception date. That is not necessarily true.
        </p>

        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 space-y-2">
          <span className="font-bold text-slate-900 block text-sm">Consider this example:</span>
          <div className="grid grid-cols-3 gap-2 font-mono text-center">
            <div className="p-2 rounded-lg bg-white border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Intercourse</span>
              <strong className="text-slate-900 text-xs">Monday</strong>
            </div>
            <div className="p-2 rounded-lg bg-white border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Ovulation</span>
              <strong className="text-rose-600 text-xs">Wednesday</strong>
            </div>
            <div className="p-2 rounded-lg bg-white border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Fertilization</span>
              <strong className="text-purple-600 text-xs">Wednesday</strong>
            </div>
          </div>
          <p className="text-slate-700 m-0 leading-relaxed pt-1">
            In this situation, conception could occur around Wednesday even though intercourse took place two days earlier.
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          This happens because sperm may remain capable of fertilizing an egg for several days. Therefore, when someone asks &quot;When did I conceive?&quot;, the useful question is usually not &quot;When did intercourse happen?&quot; but rather &quot;When was ovulation most likely to have occurred, and which intercourse dates fell within the fertile period?&quot;
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          For this reason, the calculator gives greater importance to ovulation and fertility timing than to simply assigning conception to an intercourse date.
        </p>
      </section>

      {/* 5. Understanding the Fertile Window */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Calendar className="h-5 w-5 text-rose-600" />
            Understanding the Fertile Window
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            ASRM clinical counseling definition: the 6-day interval ending on ovulation
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          The fertile window is the relatively short period of the menstrual cycle during which intercourse can result in pregnancy.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          ASRM defines the fertile window for counseling purposes as the six-day interval ending on the day of ovulation.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Timing Relative to Ovulation</th>
                <th className="p-3">Clinical Fertile Category</th>
                <th className="p-3">Physiological State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-3 font-semibold font-mono">Day −5</td>
                <td className="p-3">Fertile window begins</td>
                <td className="p-3">Sperm enter cervical mucus crypts</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-mono">Day −4</td>
                <td className="p-3">Fertile</td>
                <td className="p-3">Sperm migrate toward fallopian ampulla</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-mono">Day −3</td>
                <td className="p-3">Fertile</td>
                <td className="p-3">Viable sperm capacitation underway</td>
              </tr>
              <tr className="bg-rose-50/40">
                <td className="p-3 font-bold font-mono text-rose-700">Day −2</td>
                <td className="p-3 font-bold text-rose-700">Highly fertile</td>
                <td className="p-3">High concentration of active sperm present</td>
              </tr>
              <tr className="bg-rose-50/40">
                <td className="p-3 font-bold font-mono text-rose-700">Day −1</td>
                <td className="p-3 font-bold text-rose-700">Peak fertility</td>
                <td className="p-3">Optimal timing immediately preceding follicle rupture</td>
              </tr>
              <tr className="bg-rose-50/40">
                <td className="p-3 font-bold font-mono text-rose-700">Day 0</td>
                <td className="p-3 font-bold text-rose-700">Ovulation</td>
                <td className="p-3">Mature oocyte released (viable 12–24 hours)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          The highest likelihood of conception is generally concentrated around the days immediately preceding ovulation rather than being evenly distributed across the entire window. This is important because a person can have intercourse several days before ovulation and still conceive.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          However, do not interpret the six-day calculator window as a guarantee that pregnancy is impossible outside it. ACOG notes that pregnancy can occur from intercourse up to about five days before ovulation and around the day after ovulation because sperm and egg survival do not follow exact clock-like rules.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          The calculator uses the ASRM six-day definition as its primary fertile-window framework so that the displayed fertility window remains clinically interpretable and consistent.
        </p>
      </section>

      {/* 6. Why Cycle Length Changes the Conception Estimate */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Clock className="h-5 w-5 text-rose-600" />
            Why Cycle Length Changes the Conception Estimate
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Ovulation date dynamically reflects cycle length and luteal phase stability
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Cycle length is one of the most important inputs when estimating ovulation from an LMP. A common mistake is to assume: &quot;Day 14 = ovulation for everyone.&quot; That is only a rough example for a typical 28-day cycle.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Ovulation timing is better understood in relation to the expected length of the cycle and the luteal phase. For example, someone with a longer cycle may ovulate considerably later than someone with a shorter cycle.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          This is why the calculator allows cycle length to vary rather than forcing every user into a fixed 28-day pattern. The calculator also lets you adjust luteal-phase length because the interval between ovulation and the next menstrual period tends to be more stable within an individual&apos;s cycle than the first half of the cycle.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Even so, these calculations remain estimates. A calendar-based calculation cannot directly observe whether ovulation occurred on a particular day.
        </p>
      </section>

      {/* 7. How to Estimate Ovulation More Accurately */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Activity className="h-5 w-5 text-rose-600" />
            How to Estimate Ovulation More Accurately
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Supplementing calendar calculations with physical and chemical biomarkers
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Calendar calculations are useful, but biological signs can provide additional information:
        </p>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm m-0">Ovulation Predictor Kits (OPKs)</h3>
            <p className="text-slate-700 leading-relaxed m-0">
              Urine ovulation tests detect a rise in luteinizing hormone (LH). A positive result generally indicates that ovulation may occur within the following day or two. This can be particularly useful when cycle length varies.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm m-0">Cervical Mucus</h3>
            <p className="text-slate-700 leading-relaxed m-0">
              Around the fertile period, cervical mucus often becomes wetter, clearer and more slippery. ACOG describes thin and slippery cervical mucus as a useful fertility-awareness sign. The appearance of cervical mucus can vary between individuals, and medications, illness and other factors can affect observations.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm m-0">Basal Body Temperature (BBT)</h3>
            <p className="text-slate-700 leading-relaxed m-0">
              Basal body temperature (BBT) generally rises slightly after ovulation (+0.5°F to +1.0°F). This means BBT is most useful for identifying that ovulation has already happened rather than predicting the exact day in advance. For someone trying to understand their cycle over several months, BBT can nevertheless provide useful information about their personal ovulation pattern.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/30 text-xs sm:text-sm text-slate-700">
          <p className="m-0 leading-relaxed">
            If you want to estimate ovulation more directly from cycle timing, use our{" "}
            <Link
              href="/calculators/ovulation-calculator"
              className="text-rose-700 font-bold hover:underline"
            >
              Ovulation Calculator
            </Link>{" "}
            to map your upcoming fertile windows and ovulation days across future cycles.
          </p>
        </div>
      </section>

      {/* 8. How Implantation Fits Into the Timeline */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Layers className="h-5 w-5 text-rose-600" />
            How Implantation Fits Into the Timeline
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Distinguishing fertilization from blastocyst endometrial embedding
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Conception and implantation are different events. Conception occurs when fertilization takes place. Implantation occurs later, when the developing embryo attaches to the uterine lining.
        </p>

        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono text-slate-800 space-y-1 overflow-x-auto">
          <div className="font-bold text-slate-900">Simplified Early Reproductive Sequence:</div>
          <div className="pl-4 space-y-1 text-slate-700">
            <div>Ovulation</div>
            <div className="text-rose-600 font-bold pl-2">↓</div>
            <div>Fertilization</div>
            <div className="text-rose-600 font-bold pl-2">↓</div>
            <div>Early embryo development</div>
            <div className="text-rose-600 font-bold pl-2">↓</div>
            <div>Movement toward the uterus (tubal transit: 6 to 12 DPO)</div>
            <div className="text-rose-600 font-bold pl-2">↓</div>
            <div>Implantation into endometrium</div>
            <div className="text-rose-600 font-bold pl-2">↓</div>
            <div>Increasing hCG secretion by syncytiotrophoblasts</div>
            <div className="text-rose-600 font-bold pl-2">↓</div>
            <div className="font-bold text-emerald-700">Pregnancy test becomes detectable</div>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          This distinction explains why someone cannot reliably take a pregnancy test immediately after intercourse or even immediately after estimated conception. The pregnancy hormone hCG becomes detectable only after pregnancy-related biological processes have progressed sufficiently.
        </p>
      </section>

      {/* 9. When Should You Take a Pregnancy Test? */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <CheckCircle2 className="h-5 w-5 text-rose-600" />
            When Should You Take a Pregnancy Test?
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Understanding hCG sensitivity and testing thresholds
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          A conception estimate should not be confused with the earliest reliable pregnancy-test date. Home pregnancy tests detect human chorionic gonadotropin (hCG).
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          The NHS states that most pregnancy tests are most reliable from the first day of a missed period. If you do not know when your next period is due, the NHS advises testing at least 21 days after the last unprotected sex.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Testing too early can produce a negative result even when pregnancy has occurred. Therefore, if this calculator gives you an estimated conception date, treat the result as a dating estimate, not as a signal that a pregnancy test must already be positive.
        </p>
      </section>

      {/* 10. Calculating an Estimated Due Date From Conception */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Baby className="h-5 w-5 text-rose-600" />
            Calculating an Estimated Due Date From Conception
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            The mathematical relationship between 280-day gestational age and 266-day post-conception age
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          A standard pregnancy-dating convention uses approximately 40 weeks, or 280 days, from the first day of the LMP. Another way to express pregnancy duration is approximately 266 days from conception. These numbers describe the same general pregnancy timeline from different starting points.
        </p>

        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 space-y-1">
          <span className="font-bold text-slate-900 block text-sm">Example Timeline:</span>
          <p className="m-0 leading-relaxed">
            <strong>Estimated conception:</strong> January 15<br />
            <strong>Approximately 266 days later:</strong> October 8
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          The calculator uses conception-based dating for its reverse calculations, while also maintaining the conventional pregnancy-dating relationship to the LMP.
        </p>

        <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/30 text-xs sm:text-sm text-slate-700">
          <p className="m-0 leading-relaxed">
            For users who already have a clinically established due date, the{" "}
            <Link
              href="/calculators/due-date-calculator"
              className="text-rose-700 font-bold hover:underline"
            >
              Due Date Calculator
            </Link>{" "}
            can be used as the related calculator for working with the expected delivery date and trimester breakdowns.
          </p>
        </div>
      </section>

      {/* 11. Why an Early Ultrasound May Change Your Dates */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Stethoscope className="h-5 w-5 text-rose-600" />
            Why an Early Ultrasound May Change Your Dates
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Biometric crown-rump length (CRL) measurement versus calendar arithmetic
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Menstrual-cycle calculations are based on assumptions about when ovulation occurred. Ultrasound dating provides an independent way to estimate gestational age.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          ACOG states that first-trimester ultrasound is the most accurate method for establishing or confirming gestational age. Crown-rump-length (CRL) measurements in the first trimester have an accuracy of approximately 5–7 days according to the ACOG guidance.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Later ultrasound dating becomes less precise. That means an early ultrasound can sometimes produce a different estimated due date from an LMP-based calculation. A difference does not automatically mean that one calculation is &quot;wrong.&quot; It may mean that the actual ovulation date differed from the calendar assumption used in the LMP calculation.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          The final clinical dating decision should be made by the healthcare professional managing the pregnancy.
        </p>
      </section>

      {/* 12. IVF and Conception Date Calculations */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Zap className="h-5 w-5 text-rose-600" />
            IVF and Conception Date Calculations
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Clinical dating conventions for Day 3 cleavage and Day 5/6 blastocyst transfers
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          IVF dating is different because important dates are known precisely. For an IVF pregnancy, clinicians know the embryo-transfer date and embryo age.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          ACOG recommends using ART-derived gestational age to assign the estimated due date. For example, the due date for a day-5 embryo transfer is calculated differently from the due date associated with a day-3 embryo transfer.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          This makes IVF dating more precise than trying to reconstruct conception from an uncertain menstrual cycle. The calculator&apos;s IVF mode is therefore intended for users who know the relevant embryo-transfer information.
        </p>
      </section>

      {/* 13. How Accurate Is a Conception Calculator? */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <ShieldCheck className="h-5 w-5 text-rose-600" />
            How Accurate Is a Conception Calculator?
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Understanding biological uncertainty and input precision
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          A conception calculator can provide a useful estimate, but it cannot determine the exact moment fertilization occurred. Accuracy depends heavily on the quality of the information entered.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span className="font-bold text-slate-900">Higher Uncertainty:</span>
            <p className="text-slate-600 m-0 leading-relaxed">
              Calculations based only on an LMP, average cycle length, or an assumed luteal phase, especially if cycles fluctuate.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span className="font-bold text-slate-900">Higher Precision:</span>
            <p className="text-slate-600 m-0 leading-relaxed">
              Calculations based on a known ovulation date from LH monitoring, early ultrasound dating, or IVF embryo transfer information.
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Irregular cycles add another layer of uncertainty because calendar-based ovulation predictions become less dependable when cycle timing varies.
        </p>

        <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800">
          <p className="m-0 font-semibold">
            The correct way to interpret the result is: <span className="text-rose-700 font-bold">&quot;Based on the information entered, this is the most likely timing.&quot;</span> It should not be interpreted as &quot;This is the exact moment conception occurred.&quot;
          </p>
        </div>
      </section>

      {/* 14. Factors That Can Make Conception Dates Harder to Estimate */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            Factors That Can Make Conception Dates Harder to Estimate
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Common biological and clinical variables that influence cycle predictability
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Several situations can make calendar-based estimates less reliable:
        </p>

        <ul className="text-xs sm:text-sm text-slate-700 space-y-2 list-disc pl-5 leading-relaxed m-0">
          <li><strong>Irregular Cycles:</strong> If cycle length changes significantly from month to month, a standard calendar calculation may not identify ovulation accurately.</li>
          <li><strong>Uncertain LMP:</strong> If the first day of the last menstrual period is remembered incorrectly, every subsequent date can shift.</li>
          <li><strong>Delayed or Early Ovulation:</strong> Ovulation does not have to occur on the exact same cycle day every month.</li>
          <li><strong>Hormonal Changes:</strong> Changes in hormonal patterns can affect cycle timing and follicle maturation.</li>
          <li><strong>Breastfeeding or Postpartum Cycles:</strong> Ovulation can be less predictable during periods of reproductive transition.</li>
          <li><strong>Fertility Treatment:</strong> Medication-assisted cycles and assisted reproductive technology require different dating methods.</li>
        </ul>

        <p className="text-xs text-slate-600 leading-relaxed m-0">
          For these situations, clinical information such as ovulation testing, hormone monitoring or early ultrasound may provide more useful dating information than a simple calendar estimate.
        </p>
      </section>

      {/* 15. How to Use the Results From This Calculator */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <FileText className="h-5 w-5 text-rose-600" />
            How to Use the Results From This Calculator
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Interpreting your results as a cohesive reproductive timeline rather than an isolated date
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Use the result as a timeline rather than as a single guaranteed date. For example, if the calculator estimates an estimated conception on January 15, you can interpret that as an approximate fertilization date around the predicted ovulation period.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Then consider the surrounding events:
        </p>

        <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc pl-5 leading-relaxed m-0">
          <li><strong>Fertile window:</strong> Approximately the five days before ovulation through ovulation day</li>
          <li><strong>Implantation:</strong> Several days after fertilization (typically 6 to 12 DPO)</li>
          <li><strong>Pregnancy testing:</strong> Usually more reliable around the missed period</li>
          <li><strong>Estimated due date:</strong> Approximately 266 days after conception</li>
        </ul>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          This approach gives a much better picture of how the dates relate to each other.
        </p>

        <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/30 text-xs sm:text-sm text-slate-700">
          <p className="m-0 leading-relaxed">
            For an even deeper clinical look at day-specific conception probabilities, explore our{" "}
            <Link
              href="/calculators/pregnancy-conception-calculator"
              className="text-rose-700 font-bold hover:underline"
            >
              Pregnancy Conception Calculator
            </Link>{" "}
            with Wilcox cohort curves and multi-mode dating projections.
          </p>
        </div>
      </section>

      {/* 16. A Simple Conception Timeline */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Clock className="h-5 w-5 text-rose-600" />
            A Simple Conception Timeline
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Visual progression of early pregnancy events
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono text-slate-800 space-y-1.5 text-center overflow-x-auto">
          <div className="font-bold">SEXUAL INTERCOURSE</div>
          <div className="text-rose-600 font-bold">↓</div>
          <div>SPERM MAY REMAIN VIABLE FOR SEVERAL DAYS</div>
          <div className="text-rose-600 font-bold">↓</div>
          <div className="font-bold text-rose-700">OVULATION</div>
          <div className="text-rose-600 font-bold">↓</div>
          <div className="font-bold text-purple-700">FERTILIZATION / CONCEPTION</div>
          <div className="text-rose-600 font-bold">↓</div>
          <div>EARLY EMBRYO DEVELOPMENT</div>
          <div className="text-rose-600 font-bold">↓</div>
          <div>IMPLANTATION</div>
          <div className="text-rose-600 font-bold">↓</div>
          <div>hCG RISE</div>
          <div className="text-rose-600 font-bold">↓</div>
          <div className="font-bold text-emerald-700">PREGNANCY TEST</div>
          <div className="text-rose-600 font-bold">↓</div>
          <div className="font-bold text-slate-900">GESTATIONAL AGE &amp; DUE DATE</div>
        </div>

        <p className="text-xs text-slate-500 italic text-center m-0">
          &quot;Pregnancy dating involves several separate biological events. A conception date estimate should not be interpreted as the exact date of intercourse, implantation or the first positive pregnancy test.&quot;
        </p>
      </section>

      {/* 17. Conception Date Example */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <FileText className="h-5 w-5 text-rose-600" />
            Conception Date Example (28-Day Cycle)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Canonical trace illustrating how menstrual parameters translate into gestational dates
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 text-xs sm:text-sm space-y-2.5">
          <span className="font-bold text-slate-900 block">Suppose a person enters:</span>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 m-0">
            <li><strong>LMP:</strong> January 1</li>
            <li><strong>Cycle length:</strong> 28 days</li>
            <li><strong>Luteal phase:</strong> 14 days</li>
          </ul>

          <div className="border-t border-slate-200 pt-2 space-y-1">
            <span className="font-bold text-slate-900 block">The calculator estimates:</span>
            <ul className="list-disc pl-5 space-y-1 text-slate-700 m-0">
              <li><strong>Ovulation:</strong> approximately January 15</li>
              <li><strong>Estimated conception:</strong> approximately January 15</li>
              <li><strong>Estimated fertile window:</strong> January 10 through January 15</li>
              <li><strong>Estimated due date:</strong> approximately October 8</li>
            </ul>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed m-0 pt-1">
            This example demonstrates how an LMP and cycle pattern can be converted into an estimated conception timeline. If the person&apos;s actual ovulation occurred later than expected, the actual conception date could also be later. That is why the result is an estimate rather than a confirmed biological date.
          </p>
        </div>
      </section>

      {/* 18. When to Speak With a Healthcare Professional */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <ShieldCheck className="h-5 w-5 text-rose-600" />
            When to Speak With a Healthcare Professional
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Clinical indicators for formal reproductive evaluation
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          A calculator is useful for understanding timing, but it should not replace medical care. Consider speaking with a healthcare professional when:
        </p>

        <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc pl-5 leading-relaxed m-0">
          <li>Your cycles are consistently very irregular.</li>
          <li>You are unsure about pregnancy dating.</li>
          <li>Your estimated dates differ substantially from an early ultrasound.</li>
          <li>You have concerns about fertility or ovulation.</li>
          <li>You are pregnant and need an official estimated due date.</li>
          <li>You are using fertility treatment or IVF.</li>
          <li>You have been trying to conceive without success for an extended period.</li>
        </ul>

        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700">
          <p className="m-0 leading-relaxed">
            ASRM recommends fertility evaluation after 12 months of regular unprotected intercourse for women under 35, and after 6 months for women aged 35 or older. Earlier evaluation may be appropriate when there are known medical or reproductive factors that could affect fertility.
          </p>
        </div>
      </section>

      {/* 19. Important Limitations */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            Important Limitations
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
          This calculator estimates conception timing using entered cycle, ovulation, pregnancy-dating, ultrasound or IVF information. It does not:
        </p>

        <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 leading-relaxed m-0">
          <li>confirm pregnancy</li>
          <li>confirm ovulation</li>
          <li>determine the exact moment of fertilization</li>
          <li>establish paternity</li>
          <li>diagnose infertility</li>
          <li>replace ultrasound dating</li>
          <li>replace advice from an obstetrician, gynecologist or fertility specialist</li>
        </ul>

        <p className="text-xs text-slate-600 leading-relaxed m-0">
          For pregnancy dating, your healthcare professional may use your LMP, ultrasound findings, assisted-reproduction information and the overall clinical history to establish the best estimated due date.
        </p>
      </section>

      {/* 20. FAQ Section (10 Authoritative Clinical FAQs) */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <HelpCircle className="h-5 w-5 text-rose-600" />
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Authoritative clinical answers on conception timing, ultrasound accuracy, and pregnancy testing
          </p>
        </div>

        <div className="space-y-3">
          {conception_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-50/80 border border-slate-200 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left font-semibold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-100/80 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 font-bold shrink-0">
                      Q{idx + 1}
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-rose-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 text-slate-700 text-xs leading-relaxed bg-white border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 21. EEAT / Medical Trust Note */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-3">
        <div className="border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 m-0">
            <ShieldCheck className="h-4 w-4 text-rose-600" />
            Medical Information Reviewed Against Clinical Guidance
          </h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed m-0">
          The medical claims, dating formulas, and reproductive timing frameworks on this page have been compiled and verified against clinical guidance from:
        </p>

        <ul className="text-xs text-slate-700 space-y-1 list-disc pl-5 m-0">
          <li>
            <a
              href="https://www.asrm.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-rose-700 hover:underline inline-flex items-center gap-1"
            >
              American Society for Reproductive Medicine (ASRM)
              <ExternalLink className="h-3 w-3" />
            </a>{" "}
            — Committee Opinion on Optimizing Natural Fertility.
          </li>
          <li>
            <a
              href="https://www.acog.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-rose-700 hover:underline inline-flex items-center gap-1"
            >
              American College of Obstetricians and Gynecologists (ACOG)
              <ExternalLink className="h-3 w-3" />
            </a>{" "}
            — Committee Opinion No. 700: Methods for Estimating the Due Date.
          </li>
          <li>
            <a
              href="https://www.nhs.uk/pregnancy/trying-for-a-baby/doing-a-pregnancy-test/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-rose-700 hover:underline inline-flex items-center gap-1"
            >
              National Health Service (NHS)
              <ExternalLink className="h-3 w-3" />
            </a>{" "}
            — Clinical Guidance on Home Pregnancy Testing Timing.
          </li>
        </ul>
      </section>

      {/* 22. Final Medical Disclaimer */}
      <section className="bg-white rounded-xl border border-blue-200 p-6 sm:p-8 shadow-xs space-y-2 bg-blue-50/20">
        <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
          <Info className="h-4 w-4 text-blue-600 shrink-0" />
          Clinical Safety &amp; Medical Disclaimer
        </div>
        <p className="text-xs text-slate-700 leading-relaxed m-0">
          This calculator provides an estimate of conception timing based on the information entered and established pregnancy-dating principles. It cannot determine the exact moment fertilization occurred and should not be used as a substitute for medical diagnosis, pregnancy care or professional fertility advice. For an official pregnancy due date or concerns about fertility, pregnancy dating or reproductive health, consult a qualified healthcare professional.
        </p>
      </section>
    </article>
  );
}

export default ConceptionContent;

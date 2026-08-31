"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Sparkles,
  Heart,
  ChevronDown,
  ShieldCheck,
  Activity,
  Clock,
  Info,
  Layers,
  ArrowRight,
  HelpCircle,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { pregnancy_conception_calculatorFaqs } from "@/app/calculators/pregnancy-conception-calculator/faq";

export function PregnancyConceptionContent() {
  return (
    <article className="space-y-8 text-slate-800 leading-relaxed font-normal">
      {/* 1. Introduction & Overview */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-pink-50 text-pink-600 border border-pink-100">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 m-0">
              Estimate Conception Date, Fertile Window and Pregnancy Due Date
            </h2>
            <p className="text-xs text-pink-600 font-semibold m-0 mt-0.5">
              Evidence-Based Reproductive Timing Based on ASRM Guidelines and Prospective Clinical Cohorts
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          A pregnancy conception calculator estimates when fertilization may have occurred and uses that estimate to build a pregnancy timeline. Depending on the information available, you can calculate from your last menstrual period (LMP), estimated due date, ultrasound dating, conception date, ovulation date, reverse dating information, or IVF transfer date.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          This distinction is important: a calculator can estimate a biologically plausible date, but it cannot directly observe fertilization or confirm the exact moment conception occurred.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Menstrual cycles are not perfectly predictable. Even among people who describe their cycles as regular, the fertile window can shift from one cycle to another. A prospective study published in the <em>British Medical Journal (BMJ)</em> found that the fertile window occurred across a much broader range of cycle days than the traditional assumption that fertility is always concentrated around cycle days 10–17.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          For that reason, this calculator is designed as an educational planning and dating reference tool, not as a diagnostic test.
        </p>

        <div className="pt-2 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
            What this calculator estimates:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs text-slate-700">
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
              <span>Conception date</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
              <span>Ovulation date</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
              <span>6-day fertile window</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
              <span>Estimated due date (EDD)</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
              <span>Next expected period</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
              <span>Implantation window</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
              <span>Pregnancy test timing</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
              <span>Gestational milestones</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How the Calculator Works */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Activity className="h-5 w-5 text-pink-600" />
            How Is a Conception Date Estimated?
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Understanding the sequential mathematical and biological relationships across the cycle
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          The calculator begins with the most reliable date information available and works through the reproductive timeline. For cycle-based calculations, the general chronological progression can be visualized as:
        </p>

        {/* Text Diagram / Flowchart */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono text-slate-800 space-y-1.5 overflow-x-auto">
          <div className="font-bold text-slate-900">Reproductive Progression Flow:</div>
          <div className="pl-4 space-y-1 text-slate-700">
            <div>Last Menstrual Period (LMP)</div>
            <div className="text-pink-600 font-bold pl-3">↓ (Follicular phase: Cycle Length − Luteal Phase)</div>
            <div>Estimated Ovulation</div>
            <div className="text-pink-600 font-bold pl-3">↓ (Fertile window: O−5 to Day O)</div>
            <div>Likely Fertilization / Conception Timing</div>
            <div className="text-pink-600 font-bold pl-3">↓ (Tubal transport: 6 to 12 days post-ovulation)</div>
            <div>Implantation Reference Window</div>
            <div className="text-pink-600 font-bold pl-3">↓ (Trophoblast hCG secretion into maternal blood)</div>
            <div>Pregnancy-Test Timing (Day of Missed Period)</div>
            <div className="text-pink-600 font-bold pl-3">↓ (+266 days post-conception / +280 days post-LMP)</div>
            <div className="font-bold text-emerald-700">Estimated Due Date (EDD)</div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-pink-50/30 text-xs text-slate-700 space-y-2">
          <span className="font-bold text-pink-700 block text-sm">
            Simplified Cycle Model Formula:
          </span>
          <p className="m-0 font-mono text-slate-900 bg-white p-2.5 rounded-lg border border-pink-200 inline-block">
            Estimated Ovulation ≈ Cycle Length − Luteal Phase Length
          </p>
          <p className="m-0 leading-relaxed">
            For example, with a standard 28-day cycle and a 14-day luteal-phase assumption: <strong>28 − 14 = Cycle Day 14</strong>. That gives an estimated ovulation around cycle day 14.
          </p>
          <p className="m-0 leading-relaxed text-slate-600">
            This does not mean every 28-day cycle ovulates on day 14. It is a calendar estimate based on the selected assumptions. ASRM specifically notes that calendar-based methods commonly use an approximately 14-day luteal phase to estimate ovulation, while also emphasizing that the actual fertile window can vary considerably.
          </p>
        </div>
      </section>

      {/* 3. What Conception Means */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Layers className="h-5 w-5 text-pink-600" />
            What Is Conception? Fertilization vs. Pregnancy
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Clarifying the physiological stages of early human reproduction
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          In everyday language, &quot;conception&quot; is often used to mean the beginning of pregnancy. In reproductive biology, the more precise term is <strong>fertilization</strong>: the fusion of sperm and egg that forms a single-cell zygote.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Fertilization generally occurs near ovulation because the egg is available for only a limited period after release (approximately 12 to 24 hours), while sperm can remain capable of fertilization for several days under favorable cervical mucus conditions.
        </p>

        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 space-y-2">
          <p className="font-semibold text-slate-900 m-0">
            This is why the most useful conception calculation is not simply &quot;What day of my cycle was I on?&quot; but rather:
          </p>
          <p className="text-pink-700 font-bold m-0 pl-3 border-l-2 border-pink-500">
            When was ovulation likely to occur, and when was intercourse relative to that event?
          </p>
          <p className="text-slate-600 m-0 leading-relaxed">
            Research on naturally conceived pregnancies supports the importance of this relationship. In the prospective Wilcox study, pregnancies occurred when intercourse fell within a six-day period ending on the estimated day of ovulation.
          </p>
        </div>
      </section>

      {/* 4. The Fertile Window */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Calendar className="h-5 w-5 text-pink-600" />
            The 6-Day Fertile Window: Definition &amp; Structure
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            ASRM clinical counseling definition: O−5 through Day O
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          For reproductive counseling, ASRM defines the fertile window as the six-day interval ending on the day of ovulation. Using <span className="font-semibold">O = ovulation day</span>, the calculator&apos;s primary fertile-window model is:
        </p>

        <div className="p-3 rounded-lg bg-pink-50/60 border border-pink-200 text-xs font-mono text-center font-bold text-pink-700">
          O−5 &nbsp;→&nbsp; O−4 &nbsp;→&nbsp; O−3 &nbsp;→&nbsp; O−2 &nbsp;→&nbsp; O−1 &nbsp;→&nbsp; O &nbsp;(Exactly 6 Calendar Days)
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Timing Relative to Ovulation</th>
                <th className="p-3">Representative Calendar Date (Example: Ovulation August 15)</th>
                <th className="p-3">Gamete Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-3 font-semibold">O−5 (5 Days Before)</td>
                <td className="p-3">August 10</td>
                <td className="p-3">Early sperm enter cervical crypts</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">O−4 (4 Days Before)</td>
                <td className="p-3">August 11</td>
                <td className="p-3">Sperm migrate to Fallopian ampulla</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">O−3 (3 Days Before)</td>
                <td className="p-3">August 12</td>
                <td className="p-3">Capacitated sperm await follicle rupture</td>
              </tr>
              <tr className="bg-pink-50/40">
                <td className="p-3 font-bold text-pink-700">O−2 (2 Days Before)</td>
                <td className="p-3 font-bold text-pink-700">August 13</td>
                <td className="p-3">Optimal concentration of viable motile sperm</td>
              </tr>
              <tr className="bg-pink-50/40">
                <td className="p-3 font-bold text-pink-700">O−1 (1 Day Before)</td>
                <td className="p-3 font-bold text-pink-700">August 14</td>
                <td className="p-3">Maximum fertile likelihood prior to release</td>
              </tr>
              <tr className="bg-pink-50/40">
                <td className="p-3 font-bold text-pink-700">O (Ovulation Day)</td>
                <td className="p-3 font-bold text-pink-700">August 15</td>
                <td className="p-3">Oocyte released into Fallopian tube (viable 12–24h)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 space-y-1.5">
          <span className="font-bold text-slate-900 block">Why do some websites show seven days?</span>
          <p className="m-0 leading-relaxed">
            Some patient-oriented explanations describe a broader biological opportunity around ovulation, sometimes including the day after ovulation (O+1). That is different from the six-day fertile-window definition used for clinical counseling and in this calculator.
          </p>
          <p className="m-0 leading-relaxed text-slate-600">
            The calculator therefore keeps the main fertile-window result strictly to six calendar days and treats post-ovulatory timing separately rather than silently mixing the two definitions.
          </p>
        </div>
      </section>

      {/* 5. Best Timing for Conception */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Heart className="h-5 w-5 text-pink-600" />
            When Are the Best Days to Try to Conceive?
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Clinical fecundability peaks during the 2 days immediately preceding ovulation
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          The most important days are generally the days immediately preceding ovulation. ASRM reports that peak fecundability occurs when intercourse takes place within approximately the two days before ovulation.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          This makes biological sense: sperm may already be present in the reproductive tract when the egg is released. That is why waiting for a positive test or waiting for the exact predicted ovulation day can be less useful than covering several fertile-window days.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          ASRM advises that reproductive efficiency is highest with intercourse every 1–2 days during the fertile window, while intercourse 2–3 times per week can produce nearly equivalent results for many couples. Couples should not be pressured into rigid scheduling if a different frequency works better for them.
        </p>

        {/* Visual Timeline Diagram */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-2">
          <span className="font-bold text-slate-900 block">Practical Timing Interpretation (Predicted Ovulation on Day 15):</span>
          <div className="grid grid-cols-6 gap-1.5 text-center font-mono text-[11px]">
            <div className="p-2 rounded-lg bg-white border border-slate-200">
              <div className="text-slate-500">Day 10</div>
              <div className="font-bold text-slate-800">O−5</div>
              <div className="text-[10px] text-blue-600 mt-1">Low</div>
            </div>
            <div className="p-2 rounded-lg bg-white border border-slate-200">
              <div className="text-slate-500">Day 11</div>
              <div className="font-bold text-slate-800">O−4</div>
              <div className="text-[10px] text-blue-600 mt-1">Medium</div>
            </div>
            <div className="p-2 rounded-lg bg-white border border-slate-200">
              <div className="text-slate-500">Day 12</div>
              <div className="font-bold text-slate-800">O−3</div>
              <div className="text-[10px] text-blue-600 mt-1">High</div>
            </div>
            <div className="p-2 rounded-lg bg-pink-50 border border-pink-300">
              <div className="text-pink-600">Day 13</div>
              <div className="font-bold text-pink-700">O−2</div>
              <div className="text-[10px] font-bold text-pink-600 mt-1">Peak</div>
            </div>
            <div className="p-2 rounded-lg bg-pink-50 border border-pink-300">
              <div className="text-pink-600">Day 14</div>
              <div className="font-bold text-pink-700">O−1</div>
              <div className="text-[10px] font-bold text-pink-600 mt-1">Peak</div>
            </div>
            <div className="p-2 rounded-lg bg-pink-50 border border-pink-300">
              <div className="text-pink-600">Day 15</div>
              <div className="font-bold text-pink-700">O</div>
              <div className="text-[10px] font-bold text-pink-600 mt-1">Peak</div>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 m-0 pt-1 text-center">
            ← 6-Day Fertile Window (ASRM Standard) | Days O−2 to O represent highest-priority timing →
          </p>
        </div>
      </section>

      {/* 6. Why Cycle Length & Luteal Phase Matter */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Clock className="h-5 w-5 text-pink-600" />
            Why Cycle Length and Luteal Phase Matter
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Ovulation is not universally fixed on Day 14
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Cycle length directly influences the predicted ovulation date. With an assumed 14-day luteal phase, ovulation shifts substantially depending on overall cycle duration:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-center">
            <span className="text-slate-500 block">21-Day Cycle</span>
            <span className="font-bold text-slate-900 text-sm">Day 7</span>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-center">
            <span className="text-slate-500 block">24-Day Cycle</span>
            <span className="font-bold text-slate-900 text-sm">Day 10</span>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-center">
            <span className="text-slate-500 block">28-Day Cycle</span>
            <span className="font-bold text-slate-900 text-sm">Day 14</span>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-center">
            <span className="text-slate-500 block">30-Day Cycle</span>
            <span className="font-bold text-slate-900 text-sm">Day 16</span>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-center">
            <span className="text-slate-500 block">32-Day Cycle</span>
            <span className="font-bold text-slate-900 text-sm">Day 18</span>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-center">
            <span className="text-slate-500 block">35-Day Cycle</span>
            <span className="font-bold text-slate-900 text-sm">Day 21</span>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-center">
            <span className="text-slate-500 block">40-Day Cycle</span>
            <span className="font-bold text-slate-900 text-sm">Day 26</span>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-center">
            <span className="text-slate-500 block">45-Day Cycle</span>
            <span className="font-bold text-slate-900 text-sm">Day 31</span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 space-y-2">
          <span className="font-bold text-slate-900 block text-sm">What Is the Luteal Phase?</span>
          <p className="m-0 leading-relaxed">
            The luteal phase is the part of the menstrual cycle between ovulation and the beginning of the next menstrual period. For reverse calendar calculations, it matters because the calculator can estimate ovulation by working backward from the expected next period:
          </p>
          <p className="m-0 font-mono text-pink-700 font-bold bg-white p-2 rounded-lg border border-slate-200 inline-block">
            Cycle Length − Luteal Phase = Estimated Ovulation Day
          </p>
          <p className="m-0 leading-relaxed text-slate-600">
            A 30-day cycle with a 14-day luteal phase produces an estimated ovulation on Day 16 (<span className="font-semibold">30 − 14 = 16</span>). If a person has a 12-day luteal phase, ovulation occurs on Day 18. The current calculator allows a direct luteal-phase input (9 to 18 days) rather than silently assuming every user has the exact same luteal duration.
          </p>
        </div>
      </section>

      {/* 7. The 7 Calculation Modalities */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Layers className="h-5 w-5 text-pink-600" />
            Comparison of Calculation Modalities
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            LMP, Due Date, Ultrasound, Known Dates, and Assisted Reproduction (IVF)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-xs m-0">1. Last Menstrual Period (LMP) Method</h3>
            <p className="text-slate-700 leading-relaxed m-0">
              Starts with the first day of your last period and projects forward. Highly convenient because LMP is easily recalled, but accuracy depends on cycle regularity and luteal consistency.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-xs m-0">2. Due Date Reverse Calculation</h3>
            <p className="text-slate-700 leading-relaxed m-0">
              Subtracts 266 days (38 weeks post-conception) from an established EDD to determine conception, then calculates LMP based on your configured cycle and luteal phase.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-xs m-0">3. First-Trimester Ultrasound Dating</h3>
            <p className="text-slate-700 leading-relaxed m-0">
              Uses Crown-Rump Length (CRL) measurements between 7 and 12 weeks. Unlike calendar arithmetic, ultrasound provides biometric evidence of fetal age with an accuracy of ±3 to 5 days.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-xs m-0">4. IVF Embryo Transfer Dating</h3>
            <p className="text-slate-700 leading-relaxed m-0">
              Uses embryo developmental age at transfer: Day 5 blastocyst transfers subtract 5 days (EDD = Transfer + 261d); Day 3 cleavage transfers subtract 3 days (EDD = Transfer + 263d).
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-blue-50/20 text-xs text-slate-700 space-y-1">
          <span className="font-bold text-blue-900 block">Crucial Clinical Distinction:</span>
          <p className="m-0 leading-relaxed">
            <strong>LMP Dating:</strong> Approximately 280 days (40 weeks) measured from the start of menses.<br />
            <strong>Conception-to-EDD Dating:</strong> Approximately 266 days (38 weeks) measured from fertilization.<br />
            These are two different starting points describing the exact same pregnancy timeline.
          </p>
        </div>
      </section>

      {/* 8. Implantation Timing & Pregnancy Testing */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Sparkles className="h-5 w-5 text-pink-600" />
            Implantation Timing &amp; Pregnancy Testing Strategy
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Understanding the 6 to 12 DPO window and hCG detection thresholds
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Implantation occurs after fertilization and subsequent embryonic cleavage, when the developing 100-cell blastocyst attaches to the receptive uterine endometrium. The calculator presents implantation as an estimated reference window (6 to 12 days post-ovulation), not a guaranteed exact date:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-bold text-pink-600 text-[11px] block">6–7 DPO</span>
            <h4 className="font-bold text-slate-900 text-xs m-0">Blastocyst Apposition</h4>
            <p className="text-slate-600 leading-relaxed m-0">Initial microvilli contact with uterine pinopodes.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-bold text-pink-600 text-[11px] block">8–10 DPO</span>
            <h4 className="font-bold text-slate-900 text-xs m-0">Syncytiotrophoblast Invasion</h4>
            <p className="text-slate-600 leading-relaxed m-0">Trophoblasts invade stroma; hCG enters maternal blood.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-bold text-pink-600 text-[11px] block">11–12 DPO</span>
            <h4 className="font-bold text-slate-900 text-xs m-0">Endometrial Encasement</h4>
            <p className="text-slate-600 leading-relaxed m-0">Endometrium heals; hCG reaches urine detection levels.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 space-y-2">
          <span className="font-bold text-slate-900 block text-sm">When Should I Take a Pregnancy Test?</span>
          <p className="m-0 leading-relaxed">
            Pregnancy tests detect human chorionic gonadotropin (hCG), which rises rapidly following implantation. The practical value of testing depends heavily on timing. Testing too early can yield a false-negative result because hCG levels may not have crossed the analytical sensitivity threshold of the test (typically 20–25 mIU/mL for home urine tests).
          </p>
          <p className="m-0 font-semibold text-pink-700">
            Important Distinction: Earliest possible detection ≠ Universally reliable detection.
          </p>
          <p className="m-0 leading-relaxed text-slate-600">
            Testing on or after the day of your missed period (approximately 12 to 14 days post-conception) provides the highest diagnostic reliability.
          </p>
        </div>
      </section>

      {/* 9. Worked Canonical Example */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <FileText className="h-5 w-5 text-pink-600" />
            Worked Example: Canonical 28-Day Menstrual Cycle
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Step-by-step calculation trace for regression testing and clinical transparency
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 text-xs space-y-3">
          <div className="font-bold text-slate-900 text-sm">Scenario Parameters:</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-700">
            <div><strong>LMP:</strong> January 1, 2026</div>
            <div><strong>Cycle Length:</strong> 28 Days</div>
            <div><strong>Luteal Phase:</strong> 14 Days</div>
            <div><strong>Maternal Age:</strong> 28 Years</div>
          </div>

          <div className="border-t border-slate-200 pt-2 space-y-1.5">
            <div className="font-bold text-slate-900">Calculated Chronological Outputs:</div>
            <ul className="list-disc pl-5 space-y-1 text-slate-700 m-0">
              <li><strong>Estimated Ovulation:</strong> January 15, 2026 (LMP + 14 days)</li>
              <li><strong>Estimated Conception:</strong> January 15, 2026</li>
              <li><strong>6-Day Fertile Window:</strong> January 10, 2026 – January 15, 2026 (Days O−5 through O)</li>
              <li><strong>Implantation Reference Range:</strong> January 21, 2026 – January 27, 2026 (6 to 12 DPO)</li>
              <li><strong>Earliest Home Urine Test:</strong> January 27, 2026 (Day of Missed Period)</li>
              <li><strong>Expected Next Period:</strong> January 29, 2026 (LMP + 28 days)</li>
              <li><strong>Fetal Heartbeat Ultrasound:</strong> February 12, 2026 (~6 Weeks Gestational Age)</li>
              <li><strong>Estimated Due Date (EDD):</strong> October 8, 2026 (Conception + 266 days / LMP + 280 days)</li>
            </ul>
          </div>

          <p className="text-[11px] text-pink-700 font-semibold m-0 pt-1">
            Notice that the fertile window contains exactly six calendar days (Jan 10, 11, 12, 13, 14, 15), adhering strictly to ASRM clinical counseling guidance.
          </p>
        </div>
      </section>

      {/* 10. Gestational Age vs Conception Timing */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Clock className="h-5 w-5 text-pink-600" />
            Why Is My Conception Date Different From Pregnancy &quot;Week 1&quot;?
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Understanding obstetric gestational age convention
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          Pregnancy is conventionally dated from the first day of the last menstrual period, even though fertilization usually occurs approximately two weeks later in a textbook 28-day cycle. That means a pregnancy described clinically as &quot;4 weeks pregnant&quot; is not four weeks old from fertilization:
        </p>

        {/* Visual Timeline Diagram */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono space-y-1.5">
          <div className="text-slate-800">LMP (Week 0)</div>
          <div className="text-slate-500 pl-4">│ (~2 weeks follicular phase)</div>
          <div className="text-pink-600 font-bold">↓ Ovulation / Fertilization (Gestational Week 2)</div>
          <div className="text-slate-500 pl-4">│ (~2 weeks luteal phase &amp; implantation)</div>
          <div className="text-purple-600 font-bold">↓ Missed Period / Positive Test (Gestational Week 4)</div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed m-0">
          Therefore: <strong>Gestational Age ≠ Time Since Conception</strong>. The calculator displays both biological conception timing and clinical gestational milestones side-by-side to eliminate this common source of confusion.
        </p>
      </section>

      {/* 11. Important Limitations & Medical Safety */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            What the Calculator Cannot Tell You
          </h2>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed m-0">
          A calendar model provides probability-based planning frameworks. It cannot directly observe internal biological phenomena and cannot determine:
        </p>

        <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 leading-relaxed m-0">
          <li>The exact hour or minute sperm fertilized the ovulated egg.</li>
          <li>Whether an egg was definitely released during a specific cycle (anovulatory cycles can occur).</li>
          <li>Whether a blastocyst has successfully implanted into the endometrium.</li>
          <li>Fetal genetic normalcy, chromosomal health, or pregnancy viability.</li>
          <li>Sperm concentration, progressive motility, or morphology.</li>
          <li>The sex of the baby from intercourse timing (Wilcox et al. found no practical relationship between intercourse timing and fetal sex).</li>
        </ul>
      </section>

      {/* 12. When to Seek Fertility Evaluation */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <ShieldCheck className="h-5 w-5 text-pink-600" />
            When Should I Seek a Clinical Fertility Evaluation?
          </h2>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed m-0">
          A calculator is an educational resource, not an infertility assessment. ASRM clinical guidelines recommend formal evaluation by a reproductive specialist after:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-bold text-slate-900">Female Partner Under 35</span>
            <p className="text-slate-600 m-0 leading-relaxed">
              After 12 months of regular, unprotected intercourse without conception.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-bold text-slate-900">Female Partner 35 or Older</span>
            <p className="text-slate-600 m-0 leading-relaxed">
              After 6 months of regular, unprotected intercourse due to physiological oocyte depletion.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed m-0">
          Earlier evaluation is warranted if you have irregular or absent periods, known endometriosis, prior pelvic surgery, suspected tubal obstruction, or male-factor concerns.
        </p>
      </section>

      {/* 13. Contextual Related Calculators */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Heart className="h-5 w-5 text-pink-600" />
            Related Fertility &amp; Pregnancy Calculators
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Explore companion clinical tools for comprehensive prenatal and menstrual health tracking
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Link
            href="/calculators/ovulation-calculator"
            className="p-4 rounded-xl border border-slate-200 hover:border-pink-400 hover:bg-pink-50/20 transition-all block group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 group-hover:text-pink-600">
                Ovulation Calculator
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-pink-600 transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-normal m-0">
              Estimate ovulation and the six-day fertile window from menstrual-cycle information.
            </p>
          </Link>

          <Link
            href="/calculators/due-date-calculator"
            className="p-4 rounded-xl border border-slate-200 hover:border-pink-400 hover:bg-pink-50/20 transition-all block group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 group-hover:text-pink-600">
                Due Date Calculator
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-pink-600 transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-normal m-0">
              Estimate the expected delivery date from LMP or pregnancy dating information.
            </p>
          </Link>

          <Link
            href="/calculators/pregnancy-calculator"
            className="p-4 rounded-xl border border-slate-200 hover:border-pink-400 hover:bg-pink-50/20 transition-all block group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 group-hover:text-pink-600">
                Pregnancy Calculator
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-pink-600 transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-normal m-0">
              Review pregnancy dates, gestational age and key clinical milestones.
            </p>
          </Link>

          <Link
            href="/calculators/pregnancy-weight-gain-calculator"
            className="p-4 rounded-xl border border-slate-200 hover:border-pink-400 hover:bg-pink-50/20 transition-all block group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 group-hover:text-pink-600">
                Pregnancy Weight Gain Calculator
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-pink-600 transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-normal m-0">
              Review recommended pregnancy weight-gain ranges based on pre-pregnancy characteristics.
            </p>
          </Link>

          <Link
            href="/calculators/bmi-calculator"
            className="p-4 rounded-xl border border-slate-200 hover:border-pink-400 hover:bg-pink-50/20 transition-all block group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 group-hover:text-pink-600">
                BMI Calculator
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-pink-600 transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-normal m-0">
              Calculate BMI for general health and preconception context.
            </p>
          </Link>

          <Link
            href="/calculators/period-calculator"
            className="p-4 rounded-xl border border-slate-200 hover:border-pink-400 hover:bg-pink-50/20 transition-all block group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 group-hover:text-pink-600">
                Period Calculator
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-pink-600 transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-normal m-0">
              Track expected menstrual-cycle dates and period timing.
            </p>
          </Link>
        </div>
      </section>

      {/* 14. Methodology & Authoritative References */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <ShieldCheck className="h-5 w-5 text-pink-600" />
            Methodology &amp; Authoritative Sources
          </h2>
        </div>

        <ul className="text-xs text-slate-600 space-y-2 list-disc pl-5 leading-relaxed m-0">
          <li>
            <strong>American Society for Reproductive Medicine (ASRM):</strong> Optimizing Natural Fertility: A Committee Opinion. <em>Fertil Steril</em> 2021.
          </li>
          <li>
            <strong>American College of Obstetricians and Gynecologists (ACOG):</strong> Committee Opinion No. 700: Methods for Estimating the Due Date (Reaffirmed 2022).
          </li>
          <li>
            <strong>Wilcox, A. J., Weinberg, C. R., &amp; Baird, D. D.:</strong> Timing of Sexual Intercourse in Relation to Ovulation — Detection of the Fertile Window in Menstrual Cycles. <em>New England Journal of Medicine</em>, 1995; 333:1517–1521.
          </li>
          <li>
            <strong>Wilcox, A. J., Dunson, D., &amp; Baird, D. D.:</strong> The timing of the fertile window in the menstrual cycle: day specific estimates from a prospective study. <em>British Medical Journal (BMJ)</em>, 2000; 321:1259–1262.
          </li>
        </ul>
      </section>

      {/* 15. Complete Authoritative 24 FAQs */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <HelpCircle className="h-5 w-5 text-pink-600" />
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Authoritative clinical answers regarding conception timing, ovulation, ultrasound dating, and fertile windows
          </p>
        </div>

        <div className="space-y-3">
          {pregnancy_conception_calculatorFaqs.map((faq, idx) => (
            <details
              key={idx}
              open={idx < 5}
              className="group rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 open:border-pink-200 open:shadow-xs"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-sm text-slate-900 gap-4">
                <span>{faq.question}</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180 group-open:text-pink-600" />
              </summary>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 m-0">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 16. Clinical Health Disclaimer */}
      <section className="bg-white rounded-xl border border-blue-200 p-6 sm:p-8 shadow-xs space-y-2 bg-blue-50/20">
        <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
          <Info className="h-4 w-4 text-blue-600 shrink-0" />
          Clinical Safety &amp; Medical Disclaimer
        </div>
        <p className="text-xs text-slate-700 leading-relaxed m-0">
          This Pregnancy Conception Calculator is an educational and planning tool. It estimates reproductive and pregnancy dates using menstrual-cycle information, dating assumptions, ultrasound inputs, ovulation information or IVF transfer information. It does not directly measure ovulation, fertilization, implantation or fetal health. Calculated dates can differ from actual biological events, especially when cycles are irregular or when ovulation occurs earlier or later than expected. Do not use a calculator result as a substitute for medical diagnosis, pregnancy care, fertility evaluation or urgent medical assessment. For individualized pregnancy or fertility questions, consult an appropriately qualified healthcare professional.
        </p>
      </section>
    </article>
  );
}

export default PregnancyConceptionContent;

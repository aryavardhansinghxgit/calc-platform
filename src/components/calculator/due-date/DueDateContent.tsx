"use client";

import React from "react";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  Award,
  ShieldCheck,
  Info,
  Calendar,
  Sparkles,
  Layers,
  Activity,
  Zap,
} from "lucide-react";

export function DueDateContent() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none space-y-10 text-zinc-700 dark:text-zinc-300 leading-relaxed">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent border border-pink-500/20 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-pink-600 text-white shadow-xs">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 m-0">
              Complete Medical Guide to Pregnancy Due Date Calculation
            </h2>
            <p className="text-xs text-pink-600 dark:text-pink-400 font-semibold m-0 mt-0.5">
              Based on Guidelines from ACOG, ASRM, and WHO Reference Standards
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-900 dark:text-zinc-300 m-0 leading-relaxed">
          An Estimated Due Date (EDD), historically termed the *estimated date of confinement*, serves as the clinical anchor for your entire pregnancy journey. Accurate due date estimation ensures timely prenatal screenings, monitors fetal growth trajectory, prevents unnecessary postterm labor inductions, and guides critical medical interventions.
        </p>
      </section>

      {/* 2. Gestational Age vs. Fetal Age */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2  dark:border-zinc-800 pb-2">
          <Clock className="h-5 w-5 text-pink-500" />
          1. Understanding Gestational Age vs. Conceptional Age
        </h2>
        <p className="text-xs text-slate-900 dark:text-slate-100">
          A common source of confusion for expectant parents is the difference between <strong>gestational age</strong> (menstrual age) and <strong>fetal age</strong> (conceptional age):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <span className="font-bold text-pink-600 dark:text-pink-400 uppercase text-[10px] tracking-wider">
              Gestational Age (40 Weeks Total)
            </span>
            <p className="text-slate-900 dark:text-zinc-300 leading-relaxed">
              Measured from the first day of your Last Menstrual Period (LMP). Clinically, pregnancy is dated as lasting 280 days (40 weeks) from LMP. Note that during the first ~2 weeks of gestational age, you are not yet biologically pregnant.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <span className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-wider">
              Fetal / Conceptional Age (38 Weeks Total)
            </span>
            <p className="text-slate-900 dark:text-zinc-300 leading-relaxed">
              Measured from the actual moment of ovulation and fertilization. Fetal age lags behind gestational age by approximately 2 weeks (266 days or 38 weeks total).
            </p>
          </div>
        </div>
      </section>

      {/* 3. Mathematical Formulas Explained */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2  dark:border-zinc-800 pb-2">
          <Sparkles className="h-5 w-5 text-pink-500" />
          2. Clinical Formulas: Naegele's, Mittendorf-Williams & Parikh's
        </h2>
        <p className="text-xs text-slate-900 dark:text-slate-100">
          Several mathematical methods are used in obstetrics to calculate the due date depending on cycle regularity and clinical history:
        </p>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-bold text-pink-600 dark:text-pink-400">1. Standard Naegele's Rule</span>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Formula: Add 1 year to LMP, subtract 3 months, and add 7 days. Assumes a standard 28-day cycle with ovulation occurring on Day 14.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">2. Cycle-Adjusted Parikh's Formula</span>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Formula: Add 280 days to LMP, plus (Cycle Length minus 28 days). If your cycle is 32 days, your due date is shifted forward by +4 days.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">3. Mittendorf-Williams Rule (Parity Adjustment)</span>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Statistical research shows first-time mothers (primiparas) carry for an average of 283 days (LMP + 15 days - 3 months), while multiparas average 279 days (LMP + 10 days - 3 months).
            </p>
          </div>
        </div>
      </section>

      {/* 4. Delivery Term Categorization Table */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2  dark:border-zinc-800 pb-2">
          <Calendar className="h-5 w-5 text-pink-500" />
          3. ACOG Delivery Term Categories & Statistical Timing
        </h2>
        <p className="text-xs text-slate-900 dark:text-slate-100">
          The American College of Obstetricians and Gynecologists (ACOG) replaces vague terms like "term" with precise clinical categories to optimize neonatal outcomes:
        </p>

        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold  dark:border-zinc-800">
              <tr>
                <th className="p-3">ACOG Term Category</th>
                <th className="p-3">Gestational Age Range</th>
                <th className="p-3">Delivery Probability</th>
                <th className="p-3">Clinical Management Notes</th>
              </tr>
            </thead>
            <tbody className=" dark:divide-zinc-800">
              <tr>
                <td className="p-3 font-semibold text-blue-600">Preterm</td>
                <td className="p-3">Less than 37 Weeks 0 Days</td>
                <td className="p-3 font-bold">~10%</td>
                <td className="p-3">High NICU monitoring; lung maturity support.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600">Early Term</td>
                <td className="p-3">37 Weeks 0 Days – 38 Weeks 6 Days</td>
                <td className="p-3 font-bold">~26%</td>
                <td className="p-3">Healthy, but slightly higher respiratory risk than full term.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600">Full Term</td>
                <td className="p-3">39 Weeks 0 Days – 40 Weeks 6 Days</td>
                <td className="p-3 font-bold text-blue-600">~57%</td>
                <td className="p-3">Optimal neonatal outcomes; lowest morbidity.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600">Late Term</td>
                <td className="p-3">41 Weeks 0 Days – 41 Weeks 6 Days</td>
                <td className="p-3 font-bold">~6%</td>
                <td className="p-3">Increased biophysical profile & non-stress testing.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-red-600">Postterm</td>
                <td className="p-3">42 Weeks 0 Days and beyond</td>
                <td className="p-3 font-bold">~1%</td>
                <td className="p-3">Labor induction recommended due to placental aging.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Ultrasound Dating Precision */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2  dark:border-zinc-800 pb-2">
          <Activity className="h-5 w-5 text-pink-500" />
          4. Ultrasound Dating: Crown-Rump Length (CRL) vs. Late Scans
        </h2>
        <p className="text-xs text-slate-900 dark:text-slate-100">
          When clinical dates derived from LMP differ from ultrasound measurements, ACOG guidelines specify when to redate the pregnancy based on scan accuracy:
        </p>

        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-pink-500/10 text-pink-900 dark:text-pink-200 border border-pink-500/20">
              <span className="font-bold">First-Trimester CRL Scan (&lt;14 Weeks):</span>
              <p className="m-0 mt-1 text-[11px] leading-relaxed">
                Crown-Rump Length (CRL) is the gold standard for dating. If ultrasound EDD differs from LMP EDD by <strong>&gt;5 days</strong> (up to 8w6d) or <strong>&gt;7 days</strong> (9w0d–13w6d), the ultrasound EDD replaces the LMP EDD.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-900 dark:text-purple-200 border border-purple-500/20">
              <span className="font-bold">Second & Third Trimester Scans (&gt;14 Weeks):</span>
              <p className="m-0 mt-1 text-[11px] leading-relaxed">
                Uses Biparietal Diameter (BPD), Head Circumference (HC), and Femur Length (FL). Margin of error expands to ±7–14 days in T2 and ±21 days in T3 due to biological growth variations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Medical Disclaimer */}
      <section className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 text-xs text-blue-900 dark:text-blue-200 space-y-1">
        <span className="font-bold flex items-center gap-1.5 text-sm">
          <Info className="h-4 w-4 text-blue-500" /> Clinical Disclaimer
        </span>
        <p className="m-0 leading-relaxed">
          This calculator provides estimations based on ACOG Committee Opinion No. 700 and ASRM standards. Only ~4% of women deliver on their exact due date. Always consult your Obstetrician/Gynecologist or Certified Nurse-Midwife for formal ultrasound confirmation and individualized prenatal management.
        </p>
      </section>
    </article>
  );
}

export default DueDateContent;

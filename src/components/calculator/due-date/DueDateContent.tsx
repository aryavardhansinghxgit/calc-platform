"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Activity,
  Heart,
  Baby,
  Stethoscope,
  Info,
  HelpCircle,
  ChevronDown,
  Layers,
  Scale,
  TrendingUp,
  FileText,
} from "lucide-react";
import { due_date_calculatorFaqs } from "@/app/calculators/due-date-calculator/faq";

export function DueDateContent() {
  // All 25 FAQs open by default for full accessibility, SEO indexing, and executive transparency
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: due_date_calculatorFaqs.length }, (_, i) => i))
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
    <article className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-10 divide-y divide-slate-100 dark:divide-slate-800 font-sans">
      {/* 1. HERO INTRODUCTION & CLINICAL SCOPE */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <BookOpen className="h-4 w-4" />
          Clinical Reference &amp; Obstetric Dating Guide
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 m-0">
          Complete Medical Guide to Pregnancy Due Date Calculation
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold m-0">
          Grounded in Clinical Practice Guidelines from ACOG (Committee Opinion No. 700), ASRM, and WHO Standards
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          An Estimated Due Date (EDD)—historically referred to as the <em>estimated date of confinement (EDC)</em>—serves as the foundational clinical anchor for your entire pregnancy journey. Accurate due date estimation ensures that prenatal diagnostic screenings occur at precise biological windows, monitors fetal growth trajectory, prevents unnecessary postterm labor inductions, and guides critical obstetric decision-making.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          This comprehensive calculator integrates the five internationally validated clinical dating methods: Last Menstrual Period (LMP) with Naegele&apos;s Rule, cycle-adjusted Parikh&apos;s Formula, first-trimester Crown-Rump Length (CRL) ultrasound dating, Assisted Reproductive Technology (IVF Day 3 / Day 5 embryo transfer), and statistical parity adjustments (Mittendorf-Williams Rule).
        </p>
      </div>

      {/* 2. GESTATIONAL AGE VS CONCEPTIONAL AGE */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          1. Understanding Gestational Age vs. Conceptional Age
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A frequent point of confusion for expectant parents is the mathematical distinction between <strong>gestational age</strong> (menstrual age) and <strong>fetal age</strong> (conceptional or embryonic age):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <span className="font-bold text-pink-600 dark:text-pink-400 uppercase text-xs tracking-wider block">
              Gestational Age (40 Weeks / 280 Days)
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Measured starting from the first day of your Last Menstrual Period (LMP). In a standard 28-day cycle, the first approximately 14 days occur before ovulation and fertilization. Therefore, during weeks 1 and 2 of gestational age, biological conception has not yet taken place.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <span className="font-bold text-blue-600 dark:text-blue-400 uppercase text-xs tracking-wider block">
              Fetal / Conceptional Age (38 Weeks / 266 Days)
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Measured from the actual biological moment of fertilization (ovulation). Fetal age is precisely 14 days shorter than gestational age in a 28-day cycle. A baby at 12 weeks gestational age has a biological fetal age of 10 weeks.
            </p>
          </div>
        </div>

        {/* Visual Gestational Timeline */}
        <div className="my-6 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Gestational Timeline Progression
          </span>
          <div className="overflow-x-auto py-2">
            <div className="min-w-[640px] flex items-center justify-between text-center text-xs font-semibold text-slate-700 dark:text-slate-300">
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shrink-0">
                <span className="block font-bold text-blue-600 dark:text-blue-400">LMP Day 0</span>
                <span className="text-[10px] text-slate-500">Gestational Baseline</span>
              </div>
              <span className="text-slate-400 font-bold">→</span>
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shrink-0">
                <span className="block font-bold text-pink-600">Ovulation</span>
                <span className="text-[10px] text-slate-500">Day 14 (Fertilization)</span>
              </div>
              <span className="text-slate-400 font-bold">→</span>
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shrink-0">
                <span className="block font-bold text-purple-600">Implantation</span>
                <span className="text-[10px] text-slate-500">Day 20–24 (hCG Rise)</span>
              </div>
              <span className="text-slate-400 font-bold">→</span>
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shrink-0">
                <span className="block font-bold text-emerald-600">1st Scan (CRL)</span>
                <span className="text-[10px] text-slate-500">Weeks 7–12</span>
              </div>
              <span className="text-slate-400 font-bold">→</span>
              <div className="p-2.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 shrink-0 font-bold">
                <span className="block">EDD Target</span>
                <span className="text-[10px]">40 Weeks (280 Days)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 5 CLINICAL DATING METHODOLOGIES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          2. The 5 Clinical Dating Methodologies Explained
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Obstetricians utilize five primary mathematical and imaging methodologies to determine and verify the estimated due date:
        </p>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5">
            <span className="font-bold text-pink-600 dark:text-pink-400 text-sm block">
              Method 1: Naegele&apos;s Rule (Standard LMP Dating)
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Devised by German obstetrician Franz Karl Naegele in 1812: <code>EDD = LMP + 1 Year − 3 Months + 7 Days</code>. This adds exactly 280 days to the LMP, presuming a classic 28-day cycle with ovulation occurring precisely on Day 14.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5">
            <span className="font-bold text-blue-600 dark:text-blue-400 text-sm block">
              Method 2: Parikh&apos;s Formula (Cycle Length Correction)
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Modifies Naegele&apos;s rule for non-28-day cycles: <code>EDD = LMP + 280 Days + (Cycle Length − 28 Days)</code>. Because the luteal phase remains relatively constant (~14 days) while the follicular phase varies, women with a 35-day cycle ovulate on Day 21, shifting the due date 7 days later.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm block">
              Method 3: First-Trimester Ultrasound Dating (Crown-Rump Length)
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              ACOG Committee Opinion No. 700 designates first-trimester ultrasound measurement of Crown-Rump Length (CRL) up to 13 weeks 6 days as the most accurate dating method (precision ±3 to 5 days). The ultrasound EDD is calculated as: <code>EDD = Scan Date + 280 Days − Gestational Age at Scan</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5">
            <span className="font-bold text-purple-600 dark:text-purple-400 text-sm block">
              Method 4: Assisted Reproductive Technology (IVF Transfer Dating)
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Because the exact biological age of the embryo is known at transfer, IVF provides exact dating:
              <br />• <strong>Day 5 Blastocyst:</strong> <code>EDD = Transfer Date + 261 Days</code>
              <br />• <strong>Day 3 Embryo:</strong> <code>EDD = Transfer Date + 263 Days</code>
              <br />• <strong>Fresh Egg Retrieval / Oocyte Insemination:</strong> <code>EDD = Retrieval Date + 266 Days</code>
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5">
            <span className="font-bold text-amber-600 dark:text-amber-400 text-sm block">
              Method 5: Mittendorf-Williams Rule (Parity Statistical Adjustment)
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Epidemiological research published in <em>Obstetrics &amp; Gynecology</em> demonstrated that uncomplicated pregnancies in first-time mothers (primiparas) last an average of 283 days (LMP + 15 days − 3 months), while multiparas average 279 days (LMP + 10 days − 3 months).
            </p>
          </div>
        </div>
      </section>

      {/* 4. DATING METHODS COMPARISON TABLE */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          3. Comparison of Pregnancy Dating Methods
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Each dating method provides specific clinical utility, margin of error, and optimal timing:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 my-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Dating Method</th>
                <th className="p-3">Required Input</th>
                <th className="p-3">Accuracy Margin</th>
                <th className="p-3">Best Clinical Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-pink-600 dark:text-pink-400">Naegele&apos;s Rule (LMP)</td>
                <td className="p-3">First day of last period</td>
                <td className="p-3">±7 to 10 Days</td>
                <td className="p-3">Regular 28-day cycles with known LMP date</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Parikh&apos;s Formula</td>
                <td className="p-3">LMP + Average cycle length</td>
                <td className="p-3">±5 to 7 Days</td>
                <td className="p-3">Predictable cycles longer or shorter than 28 days</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">Ultrasound (CRL &lt;14w)</td>
                <td className="p-3">Scan date + measured GA</td>
                <td className="p-3 font-bold text-emerald-600">±3 to 5 Days (Gold Standard)</td>
                <td className="p-3">ACOG clinical standard for confirming/redating EDD</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-purple-600 dark:text-purple-400">IVF Transfer Date</td>
                <td className="p-3">Transfer date + embryo stage</td>
                <td className="p-3 font-bold text-purple-600">Exact Biological Date</td>
                <td className="p-3">Assisted reproductive technology pregnancies</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-amber-600 dark:text-amber-400">Conception Date</td>
                <td className="p-3">Known ovulation/intercourse date</td>
                <td className="p-3">±3 to 5 Days</td>
                <td className="p-3">Tracked ovulation with LH test kits or BBT</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. ACOG DELIVERY TERM CATEGORIES & STATISTICAL DISTRIBUTION */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          4. ACOG Delivery Term Categories &amp; Birth Probabilities
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The American College of Obstetricians and Gynecologists (ACOG) and the Society for Maternal-Fetal Medicine (SMFM) replaced the broad label &quot;term&quot; with four distinct gestational definitions to reflect critical neonatal outcomes:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 my-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Term Category</th>
                <th className="p-3">Gestational Age Range</th>
                <th className="p-3">Delivery Likelihood</th>
                <th className="p-3">Clinical Significance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-amber-600 dark:text-amber-400">Preterm</td>
                <td className="p-3">&lt; 37 Weeks 0 Days</td>
                <td className="p-3 font-bold">~10%</td>
                <td className="p-3">Immature lung surfactants; potential NICU support required</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Early Term</td>
                <td className="p-3">37 Weeks 0 Days – 38 Weeks 6 Days</td>
                <td className="p-3 font-bold">~26%</td>
                <td className="p-3">Healthy, but higher mild respiratory morbidity than full term</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">Full Term</td>
                <td className="p-3">39 Weeks 0 Days – 40 Weeks 6 Days</td>
                <td className="p-3 font-bold text-emerald-600">~57% (Optimal)</td>
                <td className="p-3">Lowest rates of neonatal morbidity, optimal brain &amp; lung maturity</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-purple-600 dark:text-purple-400">Late Term</td>
                <td className="p-3">41 Weeks 0 Days – 41 Weeks 6 Days</td>
                <td className="p-3 font-bold">~6%</td>
                <td className="p-3">Increased fetal surveillance (biophysical profile, non-stress tests)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-red-600 dark:text-red-400">Postterm</td>
                <td className="p-3">≥ 42 Weeks 0 Days</td>
                <td className="p-3 font-bold">~1%</td>
                <td className="p-3">Labor induction indicated due to placental calcification &amp; oligohydramnios</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. ULTRASOUND DATING PRECISION & ACOG REDATING GUIDELINES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          5. Ultrasound Dating Precision &amp; ACOG Redating Rules
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          When clinical dates derived from LMP differ from ultrasound biometric measurements, ACOG guidelines specify exact discrepancy thresholds for redating the pregnancy:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1">
            <strong className="text-pink-600 dark:text-pink-400 block font-bold">
              Up to 8 Weeks 6 Days Gestational Age
            </strong>
            <p className="text-slate-700 dark:text-slate-300">
              Redate if ultrasound CRL discrepancy exceeds <strong>&gt; 5 days</strong> from LMP EDD.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1">
            <strong className="text-pink-600 dark:text-pink-400 block font-bold">
              9 Weeks 0 Days to 13 Weeks 6 Days
            </strong>
            <p className="text-slate-700 dark:text-slate-300">
              Redate if ultrasound CRL discrepancy exceeds <strong>&gt; 7 days</strong> from LMP EDD.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 block font-bold">
              14 Weeks 0 Days to 21 Weeks 6 Days (2nd Trimester)
            </strong>
            <p className="text-slate-700 dark:text-slate-300">
              Redate if composite biometry (BPD, HC, AC, FL) discrepancy exceeds <strong>&gt; 7 to 10 days</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1">
            <strong className="text-purple-600 dark:text-purple-400 block font-bold">
              28 Weeks 0 Days and Beyond (3rd Trimester)
            </strong>
            <p className="text-slate-700 dark:text-slate-300">
              Redate if discrepancy exceeds <strong>&gt; 21 days</strong>. Third-trimester ultrasound is the least reliable for dating due to normal genetic growth variations.
            </p>
          </div>
        </div>
      </section>

      {/* 7. WORKED STEP-BY-STEP CALCULATION EXAMPLES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          6. Worked Step-by-Step Calculation Examples
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Review these real-world obstetric calculations demonstrating each clinical mode:
        </p>

        <div className="space-y-4 text-xs sm:text-sm">
          {/* Example 1 */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <h3 className="font-bold text-pink-600 dark:text-pink-400 text-sm">
              Example 1: Standard 28-Day Cycle (Naegele&apos;s Rule)
            </h3>
            <div className="text-slate-700 dark:text-slate-300 space-y-1 font-mono text-xs">
              <div>• Input: LMP = January 1, 2026 | Cycle Length = 28 Days</div>
              <div>• Calculation: Jan 1, 2026 + 1 Year = Jan 1, 2027</div>
              <div>• Subtract 3 Months = Oct 1, 2026</div>
              <div>• Add 7 Days = <span className="font-bold text-blue-600 dark:text-blue-400">October 8, 2026</span></div>
              <div>• Optimal Full-Term Window (39w0d): September 24, 2026 – October 8, 2026</div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">
              Example 2: 35-Day Extended Cycle (Parikh&apos;s Adjustment)
            </h3>
            <div className="text-slate-700 dark:text-slate-300 space-y-1 font-mono text-xs">
              <div>• Input: LMP = January 1, 2026 | Cycle Length = 35 Days</div>
              <div>• Cycle Adjustment: 35 − 28 = +7 Days (delayed ovulation on Cycle Day 21)</div>
              <div>• Base EDD = October 8, 2026</div>
              <div>• Adjusted EDD: Oct 8 + 7 Days = <span className="font-bold text-blue-600 dark:text-blue-400">October 15, 2026</span></div>
            </div>
          </div>

          {/* Example 3 */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <h3 className="font-bold text-purple-600 dark:text-purple-400 text-sm">
              Example 3: IVF Day 5 Blastocyst Transfer
            </h3>
            <div className="text-slate-700 dark:text-slate-300 space-y-1 font-mono text-xs">
              <div>• Input: Transfer Date = April 15, 2026 | Embryo = Day 5 Blastocyst</div>
              <div>• Formula: Transfer Date + 261 Days</div>
              <div>• Calculation: April 15, 2026 + 261 Days = <span className="font-bold text-purple-600 dark:text-purple-400">January 1, 2027</span></div>
              <div>• Calculated Conception Baseline: April 10, 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. 40-WEEK TRIMESTER PROGRESSION & MILESTONES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          7. 40-Week Trimester Progression &amp; Key Prenatal Milestones
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Pregnancy spans three distinct developmental phases, each associated with specific clinical evaluations:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5">
            <strong className="block text-pink-600 dark:text-pink-400 font-bold text-sm">
              First Trimester (Weeks 1–13)
            </strong>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Organogenesis period. Critical milestones include cardiac activity detection (5.5–6w), NIPT cell-free DNA screening (10w+), and nuchal translucency scan (11–13w).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5">
            <strong className="block text-blue-600 dark:text-blue-400 font-bold text-sm">
              Second Trimester (Weeks 14–27)
            </strong>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Rapid somatic growth. Comprehensive anatomy ultrasound (18–22w), fetal quickening movements felt, maternal glucose tolerance screening (24–28w), and viability milestone (24w).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5">
            <strong className="block text-purple-600 dark:text-purple-400 font-bold text-sm">
              Third Trimester (Weeks 28–40+)
            </strong>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Alveolar surfactant production and subcutaneous fat storage. Group B Strep (GBS) swab (36w), fetal presentation assessment, and biweekly prenatal monitoring.
            </p>
          </div>
        </div>
      </section>

      {/* 9. COMMON DATING MISTAKES & MISCONCEPTIONS */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          8. Common Due Date Mistakes &amp; Misconceptions
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Avoid these frequent misunderstandings regarding pregnancy dating:
        </p>

        <div className="space-y-2 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white block">
                Mistake 1: Treating EDD as an Exact Delivery Expiration Date
              </strong>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                Only ~4% to 5% of deliveries occur on the exact due date. The due date marks the center point of a bell curve; 90% of healthy births occur naturally between 37w0d and 41w6d.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white block">
                Mistake 2: Continuously Redating Pregnancy in the 3rd Trimester
              </strong>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                ACOG explicitly advises against modifying an established first-trimester EDD based on late second- or third-trimester scans. Size differences late in pregnancy indicate fetal growth velocity, not dating error.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white block">
                Mistake 3: Overlooking Menstrual Cycle Irregularity
              </strong>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                Applying standard Naegele&apos;s rule to a 38-day cycle introduces a 10-day dating error, potentially leading to premature labor induction or misdiagnosed fetal growth restriction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. WARNING SIGNS & WHEN TO CONTACT A HEALTHCARE PROVIDER */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          9. Warning Signs &amp; When to Contact Your Healthcare Provider
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Online calculators provide mathematical estimates and cannot replace clinical evaluation. Contact your obstetrician, midwife, or labor &amp; delivery triage immediately if you experience:
        </p>

        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li>Any bright red vaginal bleeding or fluid leaking (suspected ruptured membranes)</li>
          <li>Regular, painful uterine contractions occurring every 5 minutes or less before 37 weeks</li>
          <li>Noticeable decrease or cessation in fetal movements after 28 weeks</li>
          <li>Severe persistent headache, sudden visual disturbances, or upper abdominal pain (preeclampsia warning signs)</li>
          <li>Fever greater than 100.4°F (38°C) or severe chills</li>
        </ul>
      </section>

      {/* 11. FREQUENTLY ASKED QUESTIONS (25 AUTHORITATIVE ACCORDION FAQS) */}
      <section className="pt-8 space-y-4 print:break-inside-auto not-prose">
        <div className="flex items-center gap-2 mb-2 print:mb-2 print:break-after-avoid">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 print:hidden" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 m-0">
            Frequently Asked Questions (25 Clinical Answers)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Evidence-based answers to clinical questions regarding pregnancy dating, gestational milestones, ultrasound accuracy, and birth timing.
        </p>

        <div className="space-y-3 pt-2">
          {due_date_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:border-slate-300 print:shadow-none print:break-inside-avoid"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-pink-600 dark:text-pink-400 font-sans tabular-nums text-xs font-bold shrink-0">
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
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 12. METHODOLOGY & CLINICAL SOURCES */}
      <div className="pt-8 print:break-inside-avoid">
        <section className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            <FileText className="h-4 w-4 text-blue-600 shrink-0" />
            Methodology &amp; Evidence-Based Clinical Sources
          </div>
          <p className="leading-relaxed">
            This due date calculation platform is formulated in strict accordance with the clinical dating criteria established by:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
            <li>American College of Obstetricians and Gynecologists (ACOG) Committee Opinion No. 700: <em>Methods for Estimating the Due Date</em> (Reaffirmed 2023).</li>
            <li>American Society for Reproductive Medicine (ASRM) Practice Committee: <em>Assisted Reproductive Technology (ART) Pregnancy Dating Guidelines</em> (2022).</li>
            <li>Mittendorf, R., Williams, M. A., Berkey, C. S., &amp; Cotter, P. F. (1990). <em>The length of uncomplicated human gestation</em>. Obstetrics &amp; Gynecology, 75(6), 922–932.</li>
            <li>World Health Organization (WHO): <em>WHO Recommendations on Antenatal Care for a Positive Pregnancy Experience</em> (Gestational Age Assessment).</li>
          </ul>
        </section>
      </div>

      {/* 13. MEDICAL DISCLAIMER */}
      <div className="pt-6 print:break-inside-avoid">
        <section className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0" />
            Important Clinical Health Disclaimer
          </div>
          <p className="leading-relaxed m-0">
            This pregnancy due date calculator is provided strictly for educational and informational planning purposes. Only approximately 4% of babies are born on their exact calculated due date. Mathematical estimations must always be verified by an Obstetrician/Gynecologist (OB-GYN) or Certified Nurse-Midwife (CNM) via formal first-trimester ultrasound biometric assessment.
          </p>
        </section>
      </div>
    </article>
  );
}

export default DueDateContent;

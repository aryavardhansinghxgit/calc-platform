"use client";

import React from "react";
import {
  BookOpen,
  Heart,
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

export function PregnancyConceptionContent() {
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
              Complete Medical Guide to Pregnancy Conception & Fertility
            </h2>
            <p className="text-xs text-pink-600 dark:text-pink-400 font-semibold m-0 mt-0.5">
              Based on Guidelines from ACOG, ASRM, and WHO Reference Standards
            </p>
          </div>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 m-0 leading-relaxed">
          Understanding the exact timing of conception is essential for accurate gestational age determination, prenatal care scheduling, screening timeline calculations, and tracking fetal development milestones. This comprehensive clinical guide explores the biological mechanisms of fertilization, embryo implantation, ultrasound dating methods, cycle variations, and fertility optimization.
        </p>
      </section>

      {/* 2. Core Concepts: Fertilization vs. Conception */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          <Heart className="h-5 w-5 text-pink-500" />
          1. What Is Conception & Fertilization?
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          In medical and scientific terminology, <strong>fertilization</strong> and <strong>conception</strong> refer to distinct physiological stages in early human reproduction:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <span className="font-bold text-pink-600 dark:text-pink-400 uppercase text-[10px] tracking-wider">
              Fertilization
            </span>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Fertilization occurs when a single viable sperm penetrates the outer membrane (zona pellucida) of an ovulated egg inside the Fallopian tube. This forms a single-cell diploid zygote containing a complete set of 46 chromosomes.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <span className="font-bold text-purple-600 dark:text-purple-400 uppercase text-[10px] tracking-wider">
              Conception & Implantation
            </span>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Medically, clinical conception requires both fertilization in the Fallopian tube and subsequent attachment/implantation of the multicellular blastocyst into the uterine endometrial lining, which occurs 6 to 12 days after fertilization.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The Biological Reproduction Process */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          <Activity className="h-5 w-5 text-pink-500" />
          2. The Female Reproductive Cycle & Ovulation Mechanics
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          The female menstrual cycle is governed by a tightly regulated hormonal feedback loop between the hypothalamus, anterior pituitary gland, and ovaries (the HPO axis):
        </p>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-bold text-pink-600 dark:text-pink-400">Phase 1: Follicular Phase (Days 1 to Ovulation)</span>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Follicle-Stimulating Hormone (FSH) stimulates ovarian follicles to mature. Maturing follicles secrete estrogen, thickening the uterine lining and converting cervical mucus into a clear, stretchy, egg-white consistency that nourishes sperm.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-bold text-purple-600 dark:text-purple-400">Phase 2: Luteal Surge & Ovulation (Mid-Cycle)</span>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Rising estrogen triggers a surge in Luteinizing Hormone (LH) from the pituitary gland. Approximately 24 to 36 hours post-LH surge, the dominant follicle ruptures, releasing a mature oocyte into the peritoneal cavity toward the Fallopian tube.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-bold text-emerald-600 dark:text-emerald-400">Phase 3: Luteal Phase (Post-Ovulation to Period)</span>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              The ruptured follicle transforms into the corpus luteum, producing high levels of progesterone. Progesterone stabilizes the endometrium for embryo implantation. The luteal phase is remarkably constant across women, averaging 14 days (range 9–18 days).
            </p>
          </div>
        </div>
      </section>

      {/* 4. Fertile Window & Lifespan Table */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          <Calendar className="h-5 w-5 text-pink-500" />
          3. Fertile Window, Egg Viability & Sperm Lifespan
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          The <strong>fertile window</strong> spans a 6-day period ending on the day of ovulation. Although an ovulated egg remains viable for only 12 to 24 hours, sperm can survive up to 5 days inside fertile cervical mucus:
        </p>

        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="p-3">Intercourse Day relative to Ovulation</th>
                <th className="p-3">Sperm Survival Status</th>
                <th className="p-3">Conception Chance (%)</th>
                <th className="p-3">Fertility Classification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              <tr>
                <td className="p-3 font-semibold">5 Days Before (-5)</td>
                <td className="p-3">Early sperm entering cervical crypts</td>
                <td className="p-3 font-bold text-amber-600">~5%</td>
                <td className="p-3">Low Fertility</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">4 Days Before (-4)</td>
                <td className="p-3">Sperm migrating to ampulla</td>
                <td className="p-3 font-bold text-amber-600">~12%</td>
                <td className="p-3">Medium Fertility</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">3 Days Before (-3)</td>
                <td className="p-3">Capacitated sperm awaiting egg</td>
                <td className="p-3 font-bold text-purple-600">~18%</td>
                <td className="p-3">High Fertility</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">2 Days Before (-2)</td>
                <td className="p-3">Optimal sperm concentration in ampulla</td>
                <td className="p-3 font-bold text-pink-600">~28%</td>
                <td className="p-3">Peak Fertility</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">1 Day Before (-1)</td>
                <td className="p-3">Maximum fertile likelihood</td>
                <td className="p-3 font-bold text-pink-600">~32%</td>
                <td className="p-3">Peak Fertility</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Ovulation Day (Day 0)</td>
                <td className="p-3">Egg released into Fallopian tube</td>
                <td className="p-3 font-bold text-pink-600">~33%</td>
                <td className="p-3">Peak Fertility</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">1 Day After (+1)</td>
                <td className="p-3">Egg aging / degrading</td>
                <td className="p-3 font-bold text-zinc-500">&lt; 4%</td>
                <td className="p-3">Low / Closing Window</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Calculation Methods Explained */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          <Sparkles className="h-5 w-5 text-pink-500" />
          4. How Pregnancy Conception Is Calculated
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <h3 className="font-bold text-pink-600 dark:text-pink-400 text-sm m-0">
              1. Due Date Method
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Gestational age is calculated as 280 days (40 weeks) from LMP or 266 days (38 weeks) from conception. Subtracting 266 days from an established Due Date yields the estimated conception date.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <h3 className="font-bold text-purple-600 dark:text-purple-400 text-sm m-0">
              2. Last Period (LMP) Method
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Based on Naegele's Rule adjusted for custom cycle lengths. Formula: Conception = LMP + (Cycle Length - Luteal Phase Length). For a standard 28-day cycle, conception occurs 14 days after LMP.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <h3 className="font-bold text-emerald-600 dark:text-emerald-400 text-sm m-0">
              3. Early Ultrasound Scan
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Crown-Rump Length (CRL) measurement during first-trimester ultrasound (Weeks 7–12) has a margin of error of only ±3 to 5 days, making it the most accurate clinical dating tool.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Implantation Timeline & Early Signs */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          <Layers className="h-5 w-5 text-pink-500" />
          5. Implantation Physiology & Detection Timeline
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Following fertilization in the Fallopian tube, the zygote undergoes rapid cleavage divisions while traveling toward the uterus over 3 to 5 days. Upon reaching the uterine cavity as a 100-cell blastocyst, it sheds its outer layer and burrows into the endometrial stroma:
        </p>

        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-pink-500/10 text-pink-900 dark:text-pink-200 border border-pink-500/20">
              <span className="font-bold">Implantation Milestones:</span>
              <ul className="list-disc pl-4 mt-1 space-y-1 text-[11px]">
                <li><strong>6–7 DPO:</strong> Blastocyst attaches to uterine epithelium.</li>
                <li><strong>8–9 DPO:</strong> Trophoblast invades lining (Peak implantation window).</li>
                <li><strong>10–12 DPO:</strong> Endometrium seals over blastocyst; hCG enters blood.</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-900 dark:text-purple-200 border border-purple-500/20">
              <span className="font-bold">Early Pregnancy Signs:</span>
              <ul className="list-disc pl-4 mt-1 space-y-1 text-[11px]">
                <li>Light implantation spotting (occurs in ~25% of pregnancies).</li>
                <li>Mild lower abdominal twinges or cramping.</li>
                <li>Basal Body Temperature (BBT) triphasic shift.</li>
                <li>Breast tenderness & early fatigue due to progesterone surge.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Clinical Disclaimer */}
      <section className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 text-xs text-blue-900 dark:text-blue-200 space-y-1">
        <span className="font-bold flex items-center gap-1.5 text-sm">
          <Info className="h-4 w-4 text-blue-500" /> Medical & Dating Disclaimer
        </span>
        <p className="m-0 leading-relaxed">
          This calculator provides clinical estimations derived from ACOG and ASRM mathematical models. Because human menstrual cycles fluctuate and sperm viability varies, exact conception dates cannot be pinpointed with 100% certainty without early ultrasound verification. Consult your Obstetrician/Gynecologist or Certified Nurse-Midwife for medical diagnosis and prenatal care.
        </p>
      </section>
    </article>
  );
}

export default PregnancyConceptionContent;

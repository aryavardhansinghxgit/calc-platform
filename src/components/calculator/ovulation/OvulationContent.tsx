"use client";

import React from "react";
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Award,
  ShieldCheck,
  Info,
  Calendar,
  Activity,
  Zap,
  Flame,
  Thermometer,
} from "lucide-react";

export function OvulationContent() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none space-y-10 text-zinc-700 dark:text-zinc-300 leading-relaxed">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent border border-pink-500/20 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-pink-600 text-white shadow-xs">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 m-0">
              Complete Clinical Guide to Ovulation & Fertility Tracking
            </h2>
            <p className="text-xs text-pink-600 dark:text-pink-400 font-semibold m-0 mt-0.5">
              Based on Guidelines from ASRM, ACOG, and WHO Reference Standards
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-900 dark:text-zinc-300 m-0 leading-relaxed">
          Ovulation is the pivotal biological event in female reproductive physiology. Understanding ovulation timing, fertile windows, hormonal surges, and symptothermal biomarkers empowers women to optimize conception chances, diagnose cycle irregularities, or navigate natural family planning.
        </p>
      </section>

      {/* 2. Menstrual Cycle Phases & Hormonal Cascade */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-2">1. The Four Phases of the Menstrual Cycle
        </h2>
        <p className="text-xs text-slate-900 dark:text-slate-100">
          The human menstrual cycle is regulated by the Hypothalamic-Pituitary-Ovarian (HPO) axis, progressing through four synchronized phases:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <span className="font-bold text-red-600 uppercase text-[10px] tracking-wider">
              1. Menstrual Phase (Days 1–5)
            </span>
            <p className="text-slate-900 dark:text-zinc-300 leading-relaxed m-0">
              Triggered by the sharp drop in progesterone and estrogen at the end of the previous cycle. The functional layer of the uterine endometrium sheds, resulting in menstrual bleeding lasting 3 to 7 days.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <span className="font-bold text-blue-600 uppercase text-[10px] tracking-wider">
              2. Follicular Phase (Days 1–13)
            </span>
            <p className="text-slate-900 dark:text-zinc-300 leading-relaxed m-0">
              Pituitary Follicle-Stimulating Hormone (FSH) stimulates multiple ovarian follicles. A single dominant follicle matures and secretes increasing amounts of estradiol, thickening the uterine lining.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <span className="font-bold text-pink-600 uppercase text-[10px] tracking-wider">
              3. Ovulatory Phase (Day 14)
            </span>
            <p className="text-slate-900 dark:text-zinc-300 leading-relaxed m-0">
              High estrogen triggers a surge in Luteinizing Hormone (LH surge). Within 24 to 36 hours of LH surge, the mature follicle ruptures, releasing a single oocyte into the Fallopian tube.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <span className="font-bold text-blue-600 uppercase text-[10px] tracking-wider">
              4. Luteal Phase (Days 15–28)
            </span>
            <p className="text-slate-900 dark:text-zinc-300 leading-relaxed m-0">
              The ruptured follicle transforms into the corpus luteum, producing progesterone. Progesterone stabilizes the endometrial lining for embryo implantation and causes a thermal shift in basal body temperature.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The 6-Day Fertile Window & Conception Probability */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-2">2. The Biological Fertile Window & Conception Probabilities
        </h2>
        <p className="text-xs text-slate-900 dark:text-slate-100">
          Biological fertility depends on the intersection of <strong>sperm lifespan</strong> (up to 5 days in fertile cervical mucus) and <strong>egg lifespan</strong> (12 to 24 hours post-ovulation). This creates a 6-day fertile window:
        </p>

        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold  dark:border-zinc-800">
              <tr>
                <th className="p-3">Day Relative to Ovulation</th>
                <th className="p-3">Fertility Rating</th>
                <th className="p-3">Daily Conception Probability</th>
                <th className="p-3">Physiological State</th>
              </tr>
            </thead>
            <tbody className=" dark:divide-zinc-800">
              <tr>
                <td className="p-3 font-semibold">5 Days Before (O-5)</td>
                <td className="p-3 text-blue-600 font-semibold">Moderate</td>
                <td className="p-3 font-bold">~5%</td>
                <td className="p-3">Early sperm entry; depends on EWCM cervical mucus.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">4 Days Before (O-4)</td>
                <td className="p-3 text-blue-600 font-semibold">Moderate</td>
                <td className="p-3 font-bold">~11%</td>
                <td className="p-3">Sperm can survive in crypts of cervical canal.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">3 Days Before (O-3)</td>
                <td className="p-3 text-blue-600 font-semibold">High</td>
                <td className="p-3 font-bold">~16%</td>
                <td className="p-3">High conception potential; active sperm waiting.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600">2 Days Before (O-2)</td>
                <td className="p-3 text-blue-600 font-bold">Peak</td>
                <td className="p-3 font-bold text-blue-600">~27%</td>
                <td className="p-3 font-semibold">One of the two most fertile days of the cycle.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600">1 Day Before (O-1)</td>
                <td className="p-3 text-blue-600 font-bold">Peak</td>
                <td className="p-3 font-bold text-blue-600">~31%</td>
                <td className="p-3 font-semibold">Optimal sperm arrival prior to egg release.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-pink-600">Ovulation Day (O)</td>
                <td className="p-3 text-pink-600 font-bold">Peak</td>
                <td className="p-3 font-bold text-pink-600">~33%</td>
                <td className="p-3 font-semibold">Egg released; peak fertilization probability.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">1 Day After (O+1)</td>
                <td className="p-3 text-slate-900 font-semibold">Low</td>
                <td className="p-3 font-bold">~2%</td>
                <td className="p-3">Egg degrades within 12–24 hours if unfertilized.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Symptothermal Tracking Methods */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-2">3. Symptothermal Tracking: BBT, OPK, and Cervical Mucus
        </h2>
        <p className="text-xs text-slate-900 dark:text-slate-100">
          While calendar algorithms estimate ovulation based on cycle length averages, combining <strong>biomarker tracking</strong> pinpoints ovulation with clinical accuracy:
        </p>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-bold text-pink-600 dark:text-pink-400">1. Basal Body Temperature (BBT)</span>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed m-0">
              Measured immediately upon waking before physical activity. Progesterone secreted after ovulation causes a thermogenic shift of <strong>+0.3°C to +0.5°C (+0.5°F to +1.0°F)</strong>. A sustained 3-day high temperature confirms ovulation has occurred.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">2. Ovulation Predictor Kits (LH Surge Tests)</span>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed m-0">
              Over-the-counter urine test strips detect Luteinizing Hormone (LH). A positive test indicates that ovulation will occur within <strong>24 to 36 hours</strong>, serving as an advance predictor for timing intercourse.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">3. Cervical Mucus Monitoring (Billing Method)</span>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed m-0">
              Estrogen causes cervical mucus to shift from dry/sticky to <strong>clear, stretchy, egg-white cervical mucus (EWCM)</strong> near ovulation. EWCM nourishes sperm and facilitates rapid transit through the cervix.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Shettles Gender Timing Theory */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-2">4. Shettles Method for Gender Conception Timing
        </h2>
        <p className="text-xs text-slate-900 dark:text-slate-100">
          Developed by Dr. Landrum Shettles, this method proposes timing intercourse relative to ovulation to influence offspring sex based on sperm dimorphism:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 space-y-1.5">
            <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">Conceiving a Boy (Y-Sperm Strategy)</span>
            <p className="text-slate-900 dark:text-zinc-300 leading-relaxed m-0">
              Y-chromosome sperm are smaller, faster, but less resilient. Intercourse should occur as close to ovulation as possible (0 DPO or 12 hours after) so Y-sperm reach the egg first.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-pink-500/20 bg-pink-500/5 space-y-1.5">
            <span className="font-bold text-pink-600 dark:text-pink-400 text-sm">Conceiving a Girl (X-Sperm Strategy)</span>
            <p className="text-slate-900 dark:text-zinc-300 leading-relaxed m-0">
              X-chromosome sperm are larger, slower, but more resilient in acidic environments. Intercourse should occur 2 to 4 days before ovulation (-4 to -2 DPO), abstaining 24–48 hours prior to ovulation.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Medical Disclaimer */}
      <section className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 text-xs text-blue-900 dark:text-blue-200 space-y-1">
        <span className="font-bold flex items-center gap-1.5 text-sm">
          <Info className="h-4 w-4 text-blue-500" /> Clinical Disclaimer
        </span>
        <p className="m-0 leading-relaxed">
          This calculator provides estimations based on ASRM and WHO reproductive standards. Ovulation calculators should not be relied upon as a sole method of contraception. For irregular cycles, PCOS, or fertility concerns, consult a board-certified Reproductive Endocrinologist or Gynecologist.
        </p>
      </section>
    </article>
  );
}

export default OvulationContent;

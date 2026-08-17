"use client";

import React from "react";
import {
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Award,
  ShieldCheck,
  Scale,
  Sparkles,
  Info,
  Flame,
  Droplet,
  HeartPulse,
} from "lucide-react";

export function PregnancyWeightGainContent() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none space-y-10 text-zinc-700 dark:text-zinc-300 leading-relaxed">
      {/* 1. Introduction Header & Executive Summary */}
      <section className="bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent border border-pink-500/20 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-pink-600 text-white shadow-sm">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 m-0">
              Complete Guide to Healthy Pregnancy Weight Gain
            </h2>
            <p className="text-xs text-pink-600 dark:text-pink-400 font-semibold m-0 mt-0.5">
              Based on Institute of Medicine (IOM) & American College of Obstetricians and Gynecologists (ACOG) Guidelines
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-900 dark:text-zinc-300 m-0 leading-relaxed">
          Weight gain during pregnancy is a natural, vital physiological process required to nurture a growing fetus, expand uterine tissue, synthesize amniotic fluid, build placental infrastructure, and store maternal nutrients for lactation. This comprehensive guide details exact clinical recommendations, week-by-week weight curves, physiological distributions, caloric adjustments, and essential nutritional recommendations.
        </p>
      </section>

      {/* 2. Institute of Medicine (IOM) Guideline Tables */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-2">1. Institute of Medicine (IOM) Target Weight Gain Guidelines
        </h2>
        <p className="text-xs text-slate-900 dark:text-slate-100">
          The Institute of Medicine (in collaboration with the National Research Council) established target weight gain categories based on pre-pregnancy Body Mass Index (BMI).
        </p>

        {/* IOM Table 1: Single Pregnancy */}
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold  dark:border-zinc-800">
              <tr>
                <th className="p-3">Pre-Pregnancy BMI Category</th>
                <th className="p-3">BMI Range (kg/m²)</th>
                <th className="p-3">Total Recommended Gain (lbs)</th>
                <th className="p-3">Total Recommended Gain (kg)</th>
                <th className="p-3">T2 & T3 Weekly Rate (lbs/wk)</th>
              </tr>
            </thead>
            <tbody className=" dark:divide-zinc-800">
              <tr>
                <td className="p-3 font-semibold text-pink-600 dark:text-pink-400">Underweight</td>
                <td className="p-3">&lt; 18.5</td>
                <td className="p-3 font-bold">28 – 40 lbs</td>
                <td className="p-3 font-bold">12.5 – 18.0 kg</td>
                <td className="p-3">1.0 (1.0 – 1.3 lbs/wk)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Normal Weight</td>
                <td className="p-3">18.5 – 24.9</td>
                <td className="p-3 font-bold">25 – 35 lbs</td>
                <td className="p-3 font-bold">11.5 – 16.0 kg</td>
                <td className="p-3">1.0 (0.8 – 1.0 lbs/wk)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Overweight</td>
                <td className="p-3">25.0 – 29.9</td>
                <td className="p-3 font-bold">15 – 25 lbs</td>
                <td className="p-3 font-bold">7.0 – 11.5 kg</td>
                <td className="p-3">0.6 (0.5 – 0.7 lbs/wk)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Obese</td>
                <td className="p-3">≥ 30.0</td>
                <td className="p-3 font-bold">11 – 20 lbs</td>
                <td className="p-3 font-bold">5.0 – 9.0 kg</td>
                <td className="p-3">0.5 (0.4 – 0.6 lbs/wk)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* IOM Table 2: Twin Pregnancy */}
        <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 pt-2">
          Twin Gestation Weight Gain Guidelines
        </h3>
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold  dark:border-zinc-800">
              <tr>
                <th className="p-3">Pre-Pregnancy BMI Category</th>
                <th className="p-3">Twin Target Weight Gain (lbs)</th>
                <th className="p-3">Twin Target Weight Gain (kg)</th>
                <th className="p-3">T2 & T3 Weekly Rate (lbs/wk)</th>
              </tr>
            </thead>
            <tbody className=" dark:divide-zinc-800">
              <tr>
                <td className="p-3 font-semibold">Underweight (&lt; 18.5)</td>
                <td className="p-3 font-bold">50 – 62 lbs</td>
                <td className="p-3 font-bold">22.7 – 28.1 kg</td>
                <td className="p-3">1.5 – 1.8 lbs/wk</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Normal Weight (18.5–24.9)</td>
                <td className="p-3 font-bold">37 – 54 lbs</td>
                <td className="p-3 font-bold">16.8 – 24.5 kg</td>
                <td className="p-3">1.2 – 1.7 lbs/wk</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Overweight (25.0–29.9)</td>
                <td className="p-3 font-bold">31 – 50 lbs</td>
                <td className="p-3 font-bold">14.1 – 22.7 kg</td>
                <td className="p-3">1.0 – 1.5 lbs/wk</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Obese (≥ 30.0)</td>
                <td className="p-3 font-bold">25 – 42 lbs</td>
                <td className="p-3 font-bold">11.3 – 19.1 kg</td>
                <td className="p-3">0.8 – 1.2 lbs/wk</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Physiological Weight Composition Breakdown */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-2">2. Physiological Breakdown: Where Does the Weight Go?
        </h2>
        <p className="text-xs text-slate-900 dark:text-slate-100">
          A common misconception is that pregnancy weight gain consists mostly of fat. In reality, maternal body fat represents only about 25% to 30% of total gestational weight gain. For an average 30 lb (13.6 kg) total weight gain at full term (40 weeks):
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-bold text-pink-600 dark:text-pink-400">Baby (Fetus): 7.5 lbs (3.4 kg)</span>
            <p className="text-slate-900 dark:text-slate-100">Average full-term infant weight at delivery.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">Placenta: 1.5 lbs (0.7 kg)</span>
            <p className="text-slate-900 dark:text-slate-100">Vascular organ supplying oxygen and nutrient transfer.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">Amniotic Fluid: 2.0 lbs (0.9 kg)</span>
            <p className="text-slate-900 dark:text-slate-100">Protective cushioning liquid surrounding baby.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">Uterine Expansion: 2.0 lbs (0.9 kg)</span>
            <p className="text-slate-900 dark:text-slate-100">Hypertrophy of uterine smooth muscle tissue.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-bold text-red-600 dark:text-red-400">Maternal Blood Volume: 4.0 lbs (1.8 kg)</span>
            <p className="text-slate-900 dark:text-slate-100">50% increase in circulating blood plasma volume.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">Extracellular Fluids: 3.0 lbs (1.4 kg)</span>
            <p className="text-slate-900 dark:text-slate-100">Increased tissue fluid and cellular hydration.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">Breast Tissue: 2.0 lbs (0.9 kg)</span>
            <p className="text-slate-900 dark:text-slate-100">Mammary gland development for breastfeeding preparation.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">Fat & Nutrient Stores: 7.0 lbs (3.2 kg)</span>
            <p className="text-slate-900 dark:text-slate-100">Energy reserve required for labor and early lactation.</p>
          </div>
        </div>
      </section>

      {/* 4. Trimester Calorie Requirements & Nutrition */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-2">3. Trimester-by-Trimester Caloric & Nutrient Requirements
        </h2>
        <p className="text-xs text-slate-900 dark:text-slate-100">
          The phrase "eating for two" does not mean doubling caloric intake. The American College of Obstetricians and Gynecologists recommends specific, moderate daily caloric increases by trimester:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <span className="font-bold text-pink-600 dark:text-pink-400 uppercase text-[10px] tracking-wider">
              Trimester 1 (W1 – W13)
            </span>
            <div className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">
              +0 kcal / day
            </div>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              No extra caloric intake required. Focus on nutrient quality, mitigating nausea, and ensuring daily 600 mcg Folic Acid intake.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <span className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-wider">
              Trimester 2 (W14 – W27)
            </span>
            <div className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">
              +340 kcal / day
            </div>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Equivalent to an apple with peanut butter or a bowl of Greek yogurt with berries. Supports rapid fetal bone and muscle development.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <span className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-wider">
              Trimester 3 (W28 – W40)
            </span>
            <div className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">
              +450 kcal / day
            </div>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Equivalent to a turkey sandwich and a glass of pasteurized milk. Essential for fetal fat deposition, brain growth, and lung maturation.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Complications of Suboptimal Weight Gain */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-2">4. Complications of Inadequate or Excessive Weight Gain
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-2">
            <h3 className="font-bold text-amber-800 dark:text-blue-400 text-sm m-0">
              Risks of Inadequate Weight Gain
            </h3>
            <ul className="list-disc pl-4 space-y-1 text-zinc-700 dark:text-zinc-300">
              <li>Low Birth Weight (LBW) under 5.5 lbs (2.5 kg).</li>
              <li>Preterm delivery before 37 weeks.</li>
              <li>Increased risk of neonatal intensive care unit (NICU) admission.</li>
              <li>Impaired fetal neurological and organ development.</li>
              <li>Maternal nutritional depletion and postpartum fatigue.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-orange-500/20 bg-orange-500/5 space-y-2">
            <h3 className="font-bold text-orange-800 dark:text-orange-300 text-sm m-0">
              Risks of Excessive Weight Gain
            </h3>
            <ul className="list-disc pl-4 space-y-1 text-zinc-700 dark:text-zinc-300">
              <li>Fetal Macrosomia (birth weight &gt; 8.8 lbs or 4.0 kg).</li>
              <li>Gestational Diabetes Mellitus (GDM) and preeclampsia.</li>
              <li>Increased likelihood of Emergency Cesarean Section (C-section).</li>
              <li>Long-term maternal postpartum weight retention.</li>
              <li>Childhood obesity risk in offspring.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Food Safety & Substances to Avoid */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-2">5. Food Safety Guidelines & Substances to Avoid
        </h2>
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs space-y-3">
          <p className="m-0 leading-relaxed">
            Maintaining food safety is crucial during pregnancy due to altered maternal immune responses, which increase susceptibility to foodborne pathogens like <em>Listeria monocytogenes</em>, <em>Salmonella</em>, and <em>Toxoplasma gondii</em>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-red-500/10 text-red-900 dark:text-red-200 border border-red-500/20">
              <span className="font-bold">Foods to Avoid:</span>
              <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11px]">
                <li>High-mercury fish (Shark, Swordfish, King Mackerel, Tilefish).</li>
                <li>Raw or undercooked meat, poultry, sushi, or raw shellfish.</li>
                <li>Unpasteurized milk, cheese (brie, feta, queso fresco), or juices.</li>
                <li>Raw sprouts (alfalfa, clover, radish).</li>
                <li>Unwashed fruits and vegetables.</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 border border-emerald-500/20">
              <span className="font-bold">Strict Restrictions:</span>
              <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11px]">
                <li><strong>Alcohol:</strong> Zero intake. No safe threshold exists during pregnancy.</li>
                <li><strong>Smoking / Nicotine:</strong> Complete cessation to prevent fetal hypoxia.</li>
                <li><strong>Caffeine:</strong> Limit to under 200 mg/day (~1–2 cups of coffee).</li>
                <li><strong>Herbal Supplements:</strong> Consult OB/GYN before taking unverified herbs.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Clinical Disclaimer */}
      <section className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 text-xs text-blue-900 dark:text-blue-200 space-y-1">
        <span className="font-bold flex items-center gap-1.5 text-sm">
          <Info className="h-4 w-4 text-blue-500" /> Medical Disclaimer
        </span>
        <p className="m-0 leading-relaxed">
          This calculator provides general weight gain targets derived from the Institute of Medicine (IOM) and American College of Obstetricians and Gynecologists (ACOG) guidelines. Every pregnancy is unique. Maternal conditions such as gestational diabetes, pre-existing hypertension, hyperemesis gravidarum, or multifetal gestations require personalized medical oversight from a licensed Obstetrician/Gynecologist or Certified Nurse-Midwife.
        </p>
      </section>
    </article>
  );
}

export default PregnancyWeightGainContent;

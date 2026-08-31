"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Scale,
  Activity,
  Calculator,
  Calendar,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  Info,
  Flame,
  CheckCircle2,
  Users,
} from "lucide-react";
import { pregnancy_weight_gain_calculatorFaqs } from "@/app/calculators/pregnancy-weight-gain-calculator/faq";

export function PregnancyWeightGainContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <article className="space-y-8 text-slate-800 leading-relaxed font-normal">
      {/* 1. Introduction */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-pink-50 text-pink-600 border border-pink-100 shadow-2xs">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 m-0">
              Pregnancy Weight Gain: Clinical Guidelines &amp; Trajectory
            </h2>
            <p className="text-xs text-pink-600 font-semibold m-0 mt-0.5">
              Institute of Medicine (IOM) &amp; American College of Obstetricians and Gynecologists (ACOG) Framework
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-700 m-0 leading-relaxed">
          How much weight should you gain during pregnancy? There is no single number that applies to every pregnancy. Recommended gestational weight gain depends primarily on your pre-pregnancy body mass index (BMI), whether you are carrying one baby or twins, and how far along you are in pregnancy.
        </p>
        <p className="text-sm text-slate-700 m-0 leading-relaxed">
          This Pregnancy Weight Gain Calculator uses pre-pregnancy BMI and pregnancy stage to estimate a recommended weight-gain range and show where your current weight falls within that range. You can enter your height, pre-pregnancy weight, current pregnancy weight, pregnancy week, and pregnancy type, then view your estimated target, current gain, weekly gain guidance, and 40-week trajectory.
        </p>
        <p className="text-sm text-slate-700 m-0 leading-relaxed">
          The calculator is based on the established Institute of Medicine (IOM) gestational weight-gain recommendations and related clinical guidance. ACOG uses these recommendations as a basis for counseling about pregnancy weight gain, while also emphasizing that weight gain should be interpreted in the context of fetal growth, maternal health, nutrition, exercise, and individual clinical circumstances.
        </p>
        <p className="text-sm text-slate-700 m-0 leading-relaxed">
          Your pre-pregnancy BMI is therefore the starting point for understanding the recommended range. You can calculate that BMI directly with this calculator, or use the{" "}
          <Link
            href="/calculators/bmi-calculator"
            className="text-pink-600 hover:text-pink-700 font-semibold underline underline-offset-2"
          >
            BMI Calculator
          </Link>{" "}
          when you want to check your BMI separately.
        </p>
      </section>

      {/* 2. Quick Answer: How Much Weight Should You Gain During Pregnancy? */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Scale className="h-5 w-5 text-pink-600" />
            Quick Answer: How Much Weight Should You Gain During Pregnancy?
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Standard population-based target ranges published by the Institute of Medicine (IOM) and endorsed by ACOG.
          </p>
        </div>

        {/* Singleton Table */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Singleton Gestation Total Weight-Gain Ranges (IOM Guidelines)
          </h4>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Pre-pregnancy BMI</th>
                  <th className="p-3">BMI Category</th>
                  <th className="p-3">Recommended Total Gain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-semibold">Below 18.5</td>
                  <td className="p-3 text-pink-700 font-medium">Underweight</td>
                  <td className="p-3 font-bold text-slate-900">28–40 lb (12.5–18 kg)</td>
                </tr>
                <tr className="hover:bg-slate-50/50 bg-pink-50/20">
                  <td className="p-3 font-semibold">18.5–24.9</td>
                  <td className="p-3 text-emerald-700 font-medium">Normal weight</td>
                  <td className="p-3 font-bold text-slate-900">25–35 lb (11.5–16 kg)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-semibold">25.0–29.9</td>
                  <td className="p-3 text-amber-700 font-medium">Overweight</td>
                  <td className="p-3 font-bold text-slate-900">15–25 lb (7–11.5 kg)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-semibold">30.0 or higher</td>
                  <td className="p-3 text-purple-700 font-medium">Obesity</td>
                  <td className="p-3 font-bold text-slate-900">11–20 lb (5–9 kg)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Twin Table */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-purple-600" />
            Twin Gestation Total Weight-Gain Ranges
          </h4>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Pre-pregnancy BMI</th>
                  <th className="p-3">Twin-Pregnancy Total Gain</th>
                  <th className="p-3">Clinical Source Nuance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-semibold">Below 18.5</td>
                  <td className="p-3 font-bold text-slate-900">50–62 lb (22.7–28.1 kg)</td>
                  <td className="p-3 text-slate-500 text-[11px]">CDC guidance recommendation / exception</td>
                </tr>
                <tr className="hover:bg-slate-50/50 bg-pink-50/20">
                  <td className="p-3 font-semibold">18.5–24.9</td>
                  <td className="p-3 font-bold text-slate-900">37–54 lb (16.8–24.5 kg)</td>
                  <td className="p-3 text-slate-500 text-[11px]">IOM / ACOG provisional guideline</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-semibold">25.0–29.9</td>
                  <td className="p-3 font-bold text-slate-900">31–50 lb (14.1–22.7 kg)</td>
                  <td className="p-3 text-slate-500 text-[11px]">IOM / ACOG provisional guideline</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-semibold">30.0 or higher</td>
                  <td className="p-3 font-bold text-slate-900">25–42 lb (11.3–19.1 kg)</td>
                  <td className="p-3 text-slate-500 text-[11px]">IOM / ACOG provisional guideline</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          An important clinical nuance is that the 50–62 lb range for underweight women with twins is commonly presented by CDC guidance as an exception to the IOM-derived twin recommendations. It should therefore not be described as though every twin-pregnancy range originated in exactly the same evidence base.
        </p>
        <p className="text-xs text-slate-600 leading-relaxed">
          These figures are pregnancy-level guidelines, not a requirement to hit a specific number on a specific day. Your clinician may interpret them together with fetal growth, symptoms, nutrition, activity level, and your overall health.
        </p>
      </section>

      {/* 3. Why Pre-Pregnancy BMI Matters */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Activity className="h-5 w-5 text-blue-600" />
            Why Pre-Pregnancy BMI Matters
          </h3>
        </div>
        <p className="text-sm text-slate-700 m-0 leading-relaxed">
          Pregnancy weight-gain recommendations are based on BMI before pregnancy rather than on your pregnancy weight alone.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 space-y-1.5">
          <p>BMI = weight (kg) / height (m)²</p>
          <p className="text-slate-500">For US units: BMI = weight (lb) × 703 / height (in)²</p>
        </div>
        <p className="text-sm text-slate-700 m-0 leading-relaxed">
          The reason BMI matters is that the same amount of pregnancy weight gain can represent very different changes depending on a person&apos;s starting weight.
        </p>
        <p className="text-sm text-slate-700 m-0 leading-relaxed">
          For example, a 25-pound gain is within the standard total recommendation for a normal-BMI singleton pregnancy, while the same 25-pound total is already above the standard range for someone whose pre-pregnancy BMI was in the obesity category.
        </p>
        <p className="text-sm text-slate-700 m-0 leading-relaxed">
          This is why the calculator starts with your pre-pregnancy weight and height rather than using a universal pregnancy weight target. If you want to calculate or double-check the underlying BMI separately, use the{" "}
          <Link
            href="/calculators/bmi-calculator"
            className="text-pink-600 hover:text-pink-700 font-semibold underline underline-offset-2"
          >
            BMI Calculator
          </Link>
          .
        </p>
      </section>

      {/* 4. How the Calculator Works & Current Gain Calculation */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Calculator className="h-5 w-5 text-purple-600" />
            How the Calculator Works
          </h3>
        </div>
        <p className="text-sm text-slate-700 m-0 leading-relaxed">
          The calculator combines several clinical parameters:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs text-slate-700">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">1. Pre-pregnancy height</div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">2. Pre-pregnancy weight</div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">3. Pregnancy type</div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">4. Current pregnancy weight</div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">5. Current gestational week</div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">6. Unit system (US / Metric)</div>
        </div>
        <p className="text-sm text-slate-700 m-0 leading-relaxed">
          From these inputs, it calculates or determines: pre-pregnancy BMI, BMI category, current pregnancy weight gain, week-specific target range, total recommended pregnancy gain, average second- and third-trimester gain rate, projected 40-week weight range, current status relative to the recommended range, and pregnancy weight trajectory.
        </p>

        <div className="pt-2 border-t border-slate-100 space-y-3">
          <h4 className="text-sm font-bold text-slate-900">
            How to Calculate Your Current Pregnancy Weight Gain
          </h4>
          <p className="text-sm text-slate-700 m-0 leading-relaxed">
            The simplest part of the calculation is the amount of weight gained so far:
          </p>
          <div className="p-3.5 rounded-xl bg-pink-50/60 border border-pink-200 text-xs font-semibold text-slate-900">
            Current weight gain = Current pregnancy weight − Pre-pregnancy weight
          </div>
          <p className="text-sm text-slate-700 m-0 leading-relaxed">
            For example: Pre-pregnancy weight: 130 lb, Current weight: 150 lb $\to$ Current gain: 150 − 130 = 20 lb.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            The calculator then compares that gain with the expected range for the current pregnancy week, BMI category, and pregnancy type. This distinction matters because total recommended gain and week-specific recommended gain are not the same thing. Someone may have a total recommended range of 25–35 lb for the entire pregnancy but still be expected to have gained considerably less than 25 lb at an earlier gestational week.
          </p>
        </div>
      </section>

      {/* 5. Pregnancy Weight Gain by BMI Categories */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Scale className="h-5 w-5 text-emerald-600" />
            Pregnancy Weight Gain by BMI Category
          </h3>
        </div>

        <div className="space-y-4 text-xs text-slate-700">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <h4 className="text-sm font-bold text-pink-700 m-0">Underweight Before Pregnancy (BMI &lt; 18.5)</h4>
            <p className="m-0 leading-relaxed">
              A pre-pregnancy BMI below 18.5 falls into the underweight category used by the IOM guidelines. For a singleton pregnancy, the recommended total gain is 28–40 lb. Underweight women generally have a higher recommended pregnancy-gain range because entering pregnancy with lower body reserves changes the nutritional and growth considerations used in the guideline framework. For twin pregnancies, CDC guidance gives a total target of approximately 50–62 lb for women who began pregnancy underweight. This is an area where individualized prenatal care is especially important, because the overall target should be considered alongside fetal growth and maternal nutrition.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <h4 className="text-sm font-bold text-emerald-700 m-0">Normal Pre-pregnancy BMI (BMI 18.5–24.9)</h4>
            <p className="m-0 leading-relaxed">
              A BMI from 18.5 through 24.9 falls into the normal-weight category. For a singleton pregnancy, the recommended total gain is 25–35 lb. For a twin pregnancy, the commonly used range is 37–54 lb. This is the category used in the calculator examples where a woman beginning pregnancy at 5 ft 6 in and 130 lb has a BMI of approximately 21.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <h4 className="text-sm font-bold text-amber-700 m-0">Overweight Before Pregnancy (BMI 25.0–29.9)</h4>
            <p className="m-0 leading-relaxed">
              A pre-pregnancy BMI from 25.0 through 29.9 is classified as overweight. The singleton target is 15–25 lb. For twins, the commonly used total range is 31–50 lb. The goal is not simply to maximize pregnancy weight gain. Clinical guidance emphasizes balancing maternal nutrition and healthy fetal growth while avoiding unnecessary excess gain.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <h4 className="text-sm font-bold text-purple-700 m-0">Obesity Before Pregnancy (BMI ≥ 30.0)</h4>
            <p className="m-0 leading-relaxed">
              A pre-pregnancy BMI of 30 or higher falls into the obesity category used by the IOM framework. The singleton recommendation is 11–20 lb. For twin pregnancy, the commonly used target is 25–42 lb. These ranges should not be interpreted as a requirement to gain weight at a uniform rate. Clinical monitoring is particularly important when pre-pregnancy BMI is higher because fetal growth and maternal health can affect how a clinician interprets the trajectory.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Trimester-by-Trimester Gain & Weekly Rates */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Calendar className="h-5 w-5 text-indigo-600" />
            How Much Weight Should You Gain Each Week?
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Pregnancy weight gain is not expected to be perfectly linear from the day of conception to delivery.
          </p>
        </div>
        <p className="text-sm text-slate-700 m-0 leading-relaxed">
          During the first trimester, weight gain may be small. ACOG notes that someone who began pregnancy at a healthy weight may gain only about 1–5 pounds during the first 12 weeks, although individual experiences vary. For the second and third trimesters, the IOM framework provides average weekly gain rates that depend on pre-pregnancy BMI.
        </p>

        {/* Weekly Rates Table */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Singleton Second &amp; Third Trimester Mean Weekly Gain Rates
          </h4>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">BMI Category</th>
                  <th className="p-3">Approximate Mean Gain Rate in 2nd / 3rd Trimester</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-3 font-semibold text-pink-700">Underweight</td>
                  <td className="p-3 font-bold text-slate-900">1.0–1.3 lb/week (0.45–0.59 kg/week)</td>
                </tr>
                <tr className="bg-pink-50/20">
                  <td className="p-3 font-semibold text-emerald-700">Normal weight</td>
                  <td className="p-3 font-bold text-slate-900">0.8–1.0 lb/week (0.36–0.45 kg/week)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-amber-700">Overweight</td>
                  <td className="p-3 font-bold text-slate-900">0.5–0.7 lb/week (0.23–0.32 kg/week)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-purple-700">Obesity</td>
                  <td className="p-3 font-bold text-slate-900">0.4–0.6 lb/week (0.18–0.27 kg/week)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
          <p>These are averages used for guidance rather than a requirement that the scale increase by exactly the same amount every week. Actual weekly weight may fluctuate because of:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Fluid retention &amp; cellular hydration changes</li>
            <li>Appetite changes &amp; nausea or vomiting</li>
            <li>Constipation and bowel movement frequency</li>
            <li>Physical activity adjustments</li>
            <li>Measurement timing and normal biological variation</li>
          </ul>
          <p>A week with little change does not necessarily indicate a problem, just as a single larger increase does not automatically mean that your overall trajectory is unhealthy.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 text-sm m-0">First Trimester Dynamics</h4>
            <p className="text-slate-600 m-0 leading-relaxed">
              ACOG notes that during the first 12 weeks a person with a healthy pre-pregnancy weight may gain only 1–5 pounds or may gain no weight at all. Nausea and vomiting can reduce food intake for some people, while others notice increased appetite or early fluid changes. The absence of substantial weight gain early in pregnancy does not automatically mean that something is wrong.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 text-sm m-0">Second &amp; Third Trimester Dynamics</h4>
            <p className="text-slate-600 m-0 leading-relaxed">
              After the first trimester, weight gain generally becomes more progressive. ACOG states that a person who started pregnancy at a healthy weight generally gains around 0.5–1 pound per week during the second and third trimesters. The calculator displays a week-specific range rather than simply dividing the total pregnancy target by 40 weeks.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Singleton vs Twin Pregnancy & What "On Track" Means */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Users className="h-5 w-5 text-purple-600" />
            Singleton vs. Twin Pregnancy &amp; Status Interpretation
          </h3>
        </div>
        <p className="text-sm text-slate-700 m-0 leading-relaxed">
          A twin pregnancy requires a different weight-gain framework from a singleton pregnancy. More than one fetus means the pregnancy has different nutritional, fetal-growth, and maternal physiological requirements. The IOM recommendations for twins are therefore higher than singleton ranges for comparable pre-pregnancy BMI categories.
        </p>
        <p className="text-sm text-slate-700 m-0 leading-relaxed">
          The calculator changes the target model when you select Twins / Multiples. Do not compare your twin-pregnancy target directly with a singleton chart. Also note that evidence is less complete for triplet and higher-order pregnancies. Those pregnancies require individualized guidance from the obstetric team rather than assuming that the twin ranges simply multiply.
        </p>

        <div className="pt-3 border-t border-slate-100 space-y-3">
          <h4 className="text-sm font-bold text-slate-900">What Does &quot;On Track&quot; Mean?</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            The calculator classifies your current gain according to the week-specific range used by the calculation model:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700">
            <li><strong>Below Recommended Weight Gain:</strong> If your gain falls below the lower boundary of the week-specific target.</li>
            <li><strong>On Track — Optimal Weight Gain:</strong> If your gain falls within the week-specific target range.</li>
            <li><strong>Above Recommended Weight Gain:</strong> If your gain exceeds the upper boundary of the week-specific target.</li>
          </ul>
          <p className="text-xs text-slate-600 leading-relaxed">
            These labels are intended as screening-style feedback from the calculator, not as a medical diagnosis. For example, suppose the calculator gives a week-23 twin target of 16–24 lb: 15 lb is below the displayed range; 20 lb is within the displayed range; 24 lb is at the upper boundary; and 25 lb is above the displayed range. A status result should not be interpreted in isolation. ACOG emphasizes that clinical judgment and fetal growth matter when assessing pregnancy weight gain.
          </p>
        </div>
      </section>

      {/* 8. Physiological Weight Composition & Trajectory Chart */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Activity className="h-5 w-5 text-pink-600" />
            Why Your Weight May Not Follow a Perfect Straight Line
          </h3>
        </div>
        <p className="text-sm text-slate-700 m-0 leading-relaxed">
          Pregnancy weight is made up of several changing components rather than one single tissue compartment. Pregnancy-related weight includes contributions from the developing fetus, placenta, amniotic fluid, uterus, breast tissue, increased blood volume, extracellular fluid, and maternal fat stores.
        </p>
        <p className="text-sm text-slate-700 m-0 leading-relaxed">
          The relative contribution of these components changes throughout pregnancy. This is why a week-by-week graph should be viewed as a range or trajectory rather than as an exact prediction of what your body should weigh on one particular date.
        </p>
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <Info className="h-4 w-4 text-blue-600" /> Educational Model Clarification
          </p>
          <p className="m-0 leading-relaxed">
            The calculator&apos;s Weight Composition Breakdown is an educational model designed to show where pregnancy-related weight can come from. It is not a direct measurement of your fetus, placenta, blood volume, fluid volume, or body-fat distribution.
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700">
          <h4 className="text-sm font-bold text-slate-900">Reading the 40-Week Trajectory Chart</h4>
          <p className="leading-relaxed">
            The 40-Week Trajectory Chart is designed to make the pregnancy weight target easier to understand visually. Instead of seeing only one total number, you can see how the recommended range develops across pregnancy.
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Gestational week on the horizontal axis</li>
            <li>Projected pregnancy-weight range on the vertical axis</li>
            <li>Current-weight marker placed on the active week</li>
            <li>Green shaded band representing the modeled recommended trajectory</li>
          </ul>
          <p className="leading-relaxed">
            A point outside the shaded area should be interpreted as a prompt to look at the broader pattern and, when appropriate, discuss the trajectory with your healthcare provider. It should not be interpreted as proof that your pregnancy is healthy or unhealthy based on one measurement.
          </p>
        </div>
      </section>

      {/* 9. Caloric & Nutritional Guidelines */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <Flame className="h-5 w-5 text-amber-600" />
            Weight Gain and Calories During Pregnancy
          </h3>
        </div>
        <p className="text-sm text-slate-700 m-0 leading-relaxed">
          Pregnancy increases nutritional requirements, but &quot;eating for two&quot; does not mean doubling calorie intake. ACOG states that people with a healthy pre-pregnancy weight generally do not need additional calories during the first trimester. The average additional energy requirement is approximately 340 calories per day during the second trimester and about 450 calories per day during the third trimester.
        </p>
        <p className="text-sm text-slate-700 m-0 leading-relaxed">
          Those figures are general guidance rather than an individualized prescription. Calorie needs vary with factors such as pre-pregnancy size, activity, pregnancy stage, and whether the pregnancy involves multiples. For this reason, use the calculator&apos;s calorie and nutrient section as general educational guidance rather than as a personalized diet plan.
        </p>
        <p className="text-sm text-slate-700 m-0 leading-relaxed">
          When you want to understand the arithmetic behind daily calorie calculations, you can also use the{" "}
          <Link
            href="/calculators/calorie-calculator"
            className="text-pink-600 hover:text-pink-700 font-semibold underline underline-offset-2"
          >
            Calorie Calculator
          </Link>
          , but pregnancy-specific nutrition should be discussed with your obstetrician, midwife, or registered dietitian.
        </p>

        <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-700">
          <h4 className="text-sm font-bold text-slate-900">What Should You Eat to Support Healthy Pregnancy Weight Gain?</h4>
          <p className="leading-relaxed">
            The goal is not simply to make the scale move upward. A balanced pregnancy diet should provide adequate energy and nutrient density while supporting fetal growth:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">Vegetables and fresh fruit</div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">Whole grains and complex carbs</div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">Legumes, lentils, and beans</div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">Pasteurized dairy or fortified plant milk</div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">Eggs, low-mercury fish, and poultry</div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">Nuts, seeds, and healthy dietary fats</div>
          </div>
          <p className="leading-relaxed pt-1">
            Protein, iron, folate, iodine, calcium, vitamin D and other nutrients are important during pregnancy. A prenatal vitamin may also be recommended, but supplements should not be used as a substitute for a varied diet. People with severe nausea, persistent vomiting, food insecurity, restricted diets, diabetes, eating disorders, or other nutritional concerns may need individualized dietary support.
          </p>
        </div>
      </section>

      {/* 10. Gaining Too Little vs. Gaining Too Much & Consistent Weighing */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            Evaluating Deviations: Gaining Too Little vs. Too Much
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
            <h4 className="font-bold text-amber-900 text-sm m-0">What If You Are Gaining Too Little Weight?</h4>
            <p className="text-slate-700 leading-relaxed">
              A calculator result showing weight gain below a recommended range does not by itself diagnose a pregnancy problem. Possible reasons include early-pregnancy nausea, vomiting or hyperemesis, reduced appetite, dietary restrictions, inaccurate weight measurements, incorrect pregnancy week, illness, or differences in individual metabolism and fluid balance. If weight gain is consistently below the expected pattern, your prenatal care provider can assess the broader picture, including fetal growth and nutritional intake. Do not try to force rapid weight gain simply because a calculator reports that you are below a target.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-orange-200 bg-orange-50/40 space-y-2">
            <h4 className="font-bold text-orange-900 text-sm m-0">What If You Are Gaining Too Much Weight?</h4>
            <p className="text-slate-700 leading-relaxed">
              Likewise, a result above the recommended trajectory does not automatically mean that your pregnancy is unhealthy. Weight can increase rapidly because of fluid retention, swelling, changes in activity, dietary changes, measurement differences, or normal individual variation. However, unusually rapid weight gain can sometimes accompany conditions that need medical attention. Contact your maternity care provider promptly if rapid weight gain occurs with symptoms such as significant swelling, severe headache, visual changes, shortness of breath, or upper abdominal pain.
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-700">
          <h4 className="text-sm font-bold text-slate-900">How to Weigh Yourself Consistently During Pregnancy</h4>
          <p className="leading-relaxed">
            If you are tracking pregnancy weight, consistency makes your measurements more useful:
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Use the same calibrated scale</li>
            <li>Weigh under similar conditions (e.g., in the morning after voiding)</li>
            <li>Wear similar light clothing</li>
            <li>Record measurements consistently and avoid comparing readings taken at very different times of day</li>
          </ul>
          <p className="leading-relaxed">
            Daily fluctuations can occur because body water, food intake, and bowel movements change. Looking at the overall trend is generally more useful than reacting to a single measurement.
          </p>
        </div>
      </section>

      {/* 11. Worked Clinical Examples */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            Clinical Worked Examples
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Step-by-step arithmetic illustrating how current weight gain, weekly targets, and total targets interact.
          </p>
        </div>

        <div className="space-y-3 text-xs text-slate-700">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm m-0">Example 1: Normal-BMI Twin Pregnancy</h4>
            <p className="m-0 leading-relaxed">
              <strong>Inputs:</strong> Twins / Multiples, Height: 5 ft 6 in, Pre-pregnancy weight: 130 lb, Current weight: 150 lb, Week: 23.
            </p>
            <p className="m-0 leading-relaxed">
              <strong>Calculations:</strong> Pre-pregnancy BMI = 21.0 (Normal weight category). Current weight gain = 150 − 130 = 20 lb. The calculator&apos;s week-23 twin target is 16–24 lb. Therefore, 20 lb falls within the displayed week-specific target (On Track). The total twin-pregnancy target for this category is 37–54 lb. This demonstrates why current gain and total target must not be confused: a patient does not need to have gained 37–54 lb by week 23.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm m-0">Example 2: Below the Displayed Target</h4>
            <p className="m-0 leading-relaxed">
              <strong>Inputs:</strong> Twins, 5 ft 6 in, Pre-pregnancy: 130 lb, Current: 142 lb, Week: 23.
            </p>
            <p className="m-0 leading-relaxed">
              <strong>Calculations:</strong> Current gain = 142 − 130 = 12 lb. At week 23, with a target of 16–24 lb, the calculator classifies 12 lb as Below Recommended Weight Gain. This does not diagnose inadequate fetal growth or a medical condition; it indicates only that the entered gain is below the calculator&apos;s week-specific reference range.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm m-0">Example 3: How Total Target and Weekly Target Differ</h4>
            <p className="m-0 leading-relaxed">
              Suppose a person has a singleton pregnancy and a normal pre-pregnancy BMI. The total recommended gain is 25–35 lb. That does NOT mean 25–35 lb by week 20. Instead, weight gain is distributed across pregnancy, with relatively little gain often occurring during the first trimester and a more progressive pattern during the second and third trimesters. The calculator&apos;s 40-week trajectory is designed to illustrate that progression.
            </p>
          </div>
        </div>
      </section>

      {/* 12. Clinical Context & Limitations */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            Clinical Context, Provider Guidance &amp; Limitations
          </h3>
        </div>

        <div className="space-y-3 text-xs text-slate-700">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="font-bold text-slate-900 m-0">Why the Calculator Uses Pre-Pregnancy Weight</h4>
            <p className="m-0 leading-relaxed">
              Pregnancy weight-gain recommendations are tied to the starting BMI category. Once pregnancy begins, the pregnancy itself changes the scale reading through fetal growth, placenta, fluid, maternal tissues, and other physiological changes. Using current pregnancy weight as the starting point would therefore make it harder to compare the result with the standard guideline framework. The calculator consequently uses pre-pregnancy height and weight to establish your baseline BMI category before evaluating pregnancy weight gain.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="font-bold text-slate-900 m-0">When to Contact Your Healthcare Provider</h4>
            <p className="m-0 leading-relaxed">
              Speak with your obstetrician, midwife, or other qualified prenatal clinician when: you are losing weight unexpectedly; weight gain is consistently much faster or slower than expected; severe nausea or vomiting makes eating difficult; you have significant swelling or sudden rapid weight gain; you have diabetes or another condition affecting nutrition; fetal growth is a concern; you are carrying twins or higher-order multiples; or you have questions about whether your individual target should differ from a standard guideline range.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="font-bold text-slate-900 m-0">Important Limitations of BMI-Based Pregnancy Weight Guidelines</h4>
            <p className="m-0 leading-relaxed">
              BMI is a useful starting point, but it is not a complete description of individual health. The guideline ranges do not fully capture: body composition, muscle mass, pre-existing disease, fetal growth, fluid status, nutritional status, pregnancy complications, medication effects, or individual clinical history. ACOG specifically emphasizes individualized care and clinical judgment when managing pregnancy weight gain. Therefore, being slightly outside a guideline range does not automatically mean that something is wrong, and being inside a range does not guarantee a healthy pregnancy.
            </p>
          </div>
        </div>
      </section>

      {/* 13. Clinical References */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <ExternalLink className="h-5 w-5 text-blue-600" />
            Clinical References &amp; Authoritative Sources
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            The recommendations and clinical frameworks discussed on this page are derived from published medical guidelines:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <a
            href="https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2013/01/weight-gain-during-pregnancy"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-pink-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 group-hover:text-pink-600 transition-colors block">
                ACOG Committee Opinion
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                American College of Obstetricians and Gynecologists: Weight Gain During Pregnancy (No. 548).
              </p>
            </div>
            <span className="text-[10px] font-semibold text-pink-600 flex items-center gap-1 mt-2">
              View Publication <ExternalLink className="h-3 w-3" />
            </span>
          </a>

          <a
            href="https://www.nationalacademies.org/our-work/weight-gain-during-pregnancy-reexamining-the-guidelines"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-pink-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 group-hover:text-pink-600 transition-colors block">
                Institute of Medicine (IOM)
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                National Academies of Sciences, Engineering, and Medicine: Weight Gain During Pregnancy: Reexamining the Guidelines.
              </p>
            </div>
            <span className="text-[10px] font-semibold text-pink-600 flex items-center gap-1 mt-2">
              View Publication <ExternalLink className="h-3 w-3" />
            </span>
          </a>

          <a
            href="https://www.cdc.gov/reproductivehealth/maternalinfanthealth/pregnancy-weight-gain.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-pink-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 group-hover:text-pink-600 transition-colors block">
                CDC Pregnancy Weight Gain
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                Centers for Disease Control and Prevention: Maternal and Infant Health Clinical Guidance.
              </p>
            </div>
            <span className="text-[10px] font-semibold text-pink-600 flex items-center gap-1 mt-2">
              View Publication <ExternalLink className="h-3 w-3" />
            </span>
          </a>
        </div>
      </section>

      {/* 14. Frequently Asked Questions (Exact 14 FAQs in 401(k) White-Card Layout) */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <HelpCircle className="h-5 w-5 text-pink-600" />
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Authoritative clinical answers to common questions about pregnancy weight gain targets.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {pregnancy_weight_gain_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 hover:text-pink-600 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-pink-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 15. Medical Disclaimer */}
      <section className="bg-blue-50 border border-blue-200 rounded-xl p-5 sm:p-6 text-xs text-blue-900 space-y-2">
        <span className="font-bold flex items-center gap-1.5 text-sm text-blue-950">
          <Info className="h-4 w-4 text-blue-600" /> Medical Disclaimer
        </span>
        <p className="m-0 leading-relaxed">
          This Pregnancy Weight Gain Calculator provides educational estimates based on pre-pregnancy BMI, pregnancy type, gestational week, and established population-based pregnancy weight-gain guidance. It does not diagnose a medical condition or replace individualized prenatal care.
        </p>
        <p className="m-0 leading-relaxed">
          Weight-gain recommendations are general clinical guidelines. Your appropriate weight trajectory may differ depending on fetal growth, maternal health, nutrition, fluid status, pregnancy complications, and other factors.
        </p>
        <p className="m-0 leading-relaxed">
          Do not use this calculator to diagnose inadequate fetal growth, malnutrition, pre-eclampsia, gestational diabetes, or any other medical condition. Contact your obstetrician, midwife, or other qualified healthcare professional for individualized advice.
        </p>
      </section>
    </article>
  );
}

export default PregnancyWeightGainContent;

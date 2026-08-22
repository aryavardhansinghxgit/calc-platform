"use client";

import React from "react";
import Link from "next/link";
import {
  Flame,
  Scale,
  Activity,
  Zap,
  TrendingDown,
  TrendingUp,
  RotateCcw,
  BookOpen,
  PieChart,
  HelpCircle,
  ShieldAlert,
  Info,
} from "lucide-react";
import { calorie_calculatorFaqs } from "@/app/calculators/calorie-calculator/faq";

export function CalorieContent() {
  return (
    <article className="mt-8 space-y-12 text-zinc-800 dark:text-zinc-200">
      {/* SECTION 1: What Is a Calorie Calculator? */}
      <section className="space-y-4 p-6 sm:p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400">
          <Flame className="w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400">
            1. What Is a Calorie Calculator?
          </h2>
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-zinc-300">
          A <strong>calorie calculator</strong> is a mathematical energy-planning tool designed to estimate your daily caloric needs for weight maintenance, weight loss, or weight gain. By integrating physical demographics—including age, biological sex, height, current body weight, and typical physical activity level—the calculator models how much chemical energy your body expends each day.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-zinc-300">
          The calculation system integrates several core components:
        </p>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-zinc-300 list-disc pl-5">
          <li><strong>Baseline Energy Modeling:</strong> Calculates your resting energy expenditure via the Basal Metabolic Rate (BMR) and scales it across six physical activity categories to establish your Total Daily Energy Expenditure (TDEE).</li>
          <li><strong>Seven Goal Scenarios:</strong> Evaluates illustrative daily targets for maintenance, mild deficit (-250 kcal/day), standard deficit (-500 kcal/day), extreme deficit (-1000 kcal/day), mild surplus (+250 kcal/day), standard surplus (+500 kcal/day), and fast surplus (+1000 kcal/day).</li>
          <li><strong>Weekly Schedule &amp; Nutrient Breakdown:</strong> Redistributes caloric budgets across a 7-day zigzag schedule and converts caloric goals into macronutrient gram distributions (carbohydrates, protein, and dietary fats).</li>
        </ul>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 italic">
          It is essential to distinguish between population-based mathematical estimation and individual medical evaluation. The outputs generated here are modeled planning estimates derived from standardized equations. Real-world human metabolism varies according to body composition, endocrine status, genetics, medications, and adaptive physiological mechanisms.
        </p>
      </section>

      {/* SECTION 2: How Energy Balance Affects Calorie Needs */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg sm:text-xl">
          <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            2. How Energy Balance Affects Calorie Needs
          </h2>
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-zinc-300">
          Body weight trajectory over time is fundamentally governed by the relationship between <strong>energy intake</strong> (the calories consumed through food and beverages) and <strong>energy expenditure</strong> (the calories expended through resting cellular processes, food digestion, and physical movement).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
          <div className="p-4 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-200 space-y-1.5">
            <strong className="block text-sm">Caloric Deficit (Energy Out &gt; In)</strong>
            <p className="text-xs font-normal text-sky-700 dark:text-sky-300 leading-relaxed">
              When intake is lower than expenditure, the body oxidizes endogenous energy stores (glycogen and adipose tissue) to meet physiological demands, resulting in net body weight reduction.
            </p>
          </div>
          <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 space-y-1.5">
            <strong className="block text-sm">Energy Balance (Energy In = Out)</strong>
            <p className="text-xs font-normal text-emerald-700 dark:text-emerald-300 leading-relaxed">
              When intake matches total daily energy expenditure, body weight remains relatively stable over time without significant composition shifts.
            </p>
          </div>
          <div className="p-4 bg-orange-50/70 dark:bg-orange-950/30 rounded-xl border border-orange-200 dark:border-orange-800 text-orange-900 dark:text-orange-200 space-y-1.5">
            <strong className="block text-sm">Caloric Surplus (Energy In &gt; Out)</strong>
            <p className="text-xs font-normal text-orange-700 dark:text-orange-300 leading-relaxed">
              When intake exceeds expenditure, surplus energy is stored as glycogen, body fat, or muscular tissue (when supported by progressive resistance training).
            </p>
          </div>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          In practical day-to-day living, actual weight change does not occur in a purely static or linear manner. Real-world scale weight is constantly influenced by transient fluid shifts, glycogen storage fluctuations, changes in daily spontaneous movement (NEAT), digestive transit time, and individual metabolic variability.
        </p>
      </section>

      {/* SECTION 3: How BMR and TDEE Determine Daily Calorie Needs */}
      <section className="space-y-4 p-6 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg sm:text-xl">
          <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            3. How BMR and TDEE Determine Daily Calorie Needs
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
          Calculating your daily energy requirements begins with two sequential physiological baselines: <strong>Basal Metabolic Rate (BMR)</strong> and <strong>Total Daily Energy Expenditure (TDEE)</strong>.
        </p>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-zinc-300 list-disc pl-5">
          <li><strong>Basal Metabolic Rate (BMR):</strong> The minimum baseline energy expenditure required to sustain vital involuntary physiological functions at complete rest—including cellular homeostasis, central nervous system activity, cardiac output, respiration, and thermoregulation.</li>
          <li><strong>Total Daily Energy Expenditure (TDEE):</strong> The total estimated number of calories expended across a full 24-hour day, calculated by scaling BMR with an activity multiplier that accounts for occupational movement, digestion, and deliberate physical exercise.</li>
        </ul>

        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Established Population-Based Predictive Equations
          </h3>

          <div className="p-3.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1 text-xs">
            <strong className="text-zinc-900 dark:text-zinc-100 text-sm">A. Mifflin-St Jeor Equation (Default Standard)</strong>
            <p className="text-zinc-500 dark:text-zinc-400">Validated in 1990 as a standard predictive formula for healthy modern adults:</p>
            <div className="font-mono text-blue-600 dark:text-blue-400 bg-zinc-50 dark:bg-zinc-950 p-2 rounded border border-zinc-200 dark:border-zinc-800 text-[11px] mt-1 space-y-0.5">
              <p>Male: BMR = (10 × W_kg) + (6.25 × H_cm) - (5 × Age) + 5</p>
              <p>Female: BMR = (10 × W_kg) + (6.25 × H_cm) - (5 × Age) - 161</p>
            </div>
          </div>

          <div className="p-3.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1 text-xs">
            <strong className="text-zinc-900 dark:text-zinc-100 text-sm">B. Revised Harris-Benedict Equation (Roza &amp; Shizgal 1984)</strong>
            <p className="text-zinc-500 dark:text-zinc-400">A modernized re-evaluation of the classic 1919 metabolic study:</p>
            <div className="font-mono text-blue-600 dark:text-blue-400 bg-zinc-50 dark:bg-zinc-950 p-2 rounded border border-zinc-200 dark:border-zinc-800 text-[11px] mt-1 space-y-0.5">
              <p>Male: BMR = 88.362 + (13.397 × W_kg) + (4.799 × H_cm) - (5.677 × Age)</p>
              <p>Female: BMR = 447.593 + (9.247 × W_kg) + (3.098 × H_cm) - (4.330 × Age)</p>
            </div>
          </div>

          <div className="p-3.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1 text-xs">
            <strong className="text-zinc-900 dark:text-zinc-100 text-sm">C. Katch-McArdle Equation (Lean Mass Based)</strong>
            <p className="text-zinc-500 dark:text-zinc-400">Calculates resting energy expenditure directly from estimated Lean Body Mass (LBM):</p>
            <div className="font-mono text-blue-600 dark:text-blue-400 bg-zinc-50 dark:bg-zinc-950 p-2 rounded border border-zinc-200 dark:border-zinc-800 text-[11px] mt-1 space-y-0.5">
              <p>LBM = Weight_kg × (1 - BodyFat% / 100)</p>
              <p>BMR = 370 + (21.6 × LBM)</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-zinc-400 pt-1">
          To evaluate your resting metabolic rate independently without activity multipliers, visit our{" "}
          <Link href="/calculators/bmr-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700">
            dedicated BMR calculator
          </Link>
          . To explore the full physics and physiological components of daily expenditure, consult our{" "}
          <Link href="/calculators/tdee-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700">
            comprehensive TDEE calculator
          </Link>
          .
        </p>
      </section>

      {/* SECTION 4: Calculating Maintenance Calories */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg sm:text-xl">
          <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            4. Calculating Maintenance Calories
          </h2>
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-zinc-300">
          Your <strong>maintenance calorie target</strong> represents the estimated daily energy intake at which the selected mathematical model predicts energy balance equilibrium (0 kcal net deficit or surplus). At this intake level, consumed energy matches estimated expenditure, supporting stable body mass.
        </p>

        <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">Verified Baseline Worked Example</h4>
          <p className="text-zinc-600 dark:text-zinc-400">
            <strong>Inputs:</strong> Age 25, Male, Height 178 cm (5 ft 10 in), Weight 74.84 kg (165 lbs), Moderately Active (1.55× multiplier).
          </p>
          <div className="space-y-1 font-mono text-[11px] text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 p-2.5 rounded border border-zinc-200 dark:border-zinc-800">
            <p>1. BMR (Mifflin) = round(10 × 74.84 + 6.25 × 178 - 5 × 25 + 5) = <strong>1740 kcal/day</strong></p>
            <p>2. TDEE (Maintenance) = round(1740 × 1.55) = <strong>2697 kcal/day</strong></p>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            The resulting figure of <strong>2697 kcal/day</strong> represents the calculator&apos;s modeled maintenance estimate for this profile. Because actual energy expenditure fluctuates from day to day, maintenance is practically observed as an approximate caloric range rather than a single fixed biological number.
          </p>
        </div>
      </section>

      {/* SECTION 5: Calorie Deficits for Weight-Loss Planning */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg sm:text-xl">
          <TrendingDown className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            5. Calorie Deficits for Weight-Loss Planning
          </h2>
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-zinc-300">
          A <strong>caloric deficit</strong> occurs when daily energy intake is established below your maintenance expenditure. To support structured dietary planning, the calculator models three standard illustrative deficit tiers:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-zinc-200 dark:border-zinc-800 border-collapse">
            <thead className="bg-zinc-100 dark:bg-zinc-900 font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="p-2.5 border-r border-zinc-200 dark:border-zinc-800">Modeled Goal Tier</th>
                <th className="p-2.5 border-r border-zinc-200 dark:border-zinc-800">Daily Calorie Offset</th>
                <th className="p-2.5 border-r border-zinc-200 dark:border-zinc-800">Daily Target Intake</th>
                <th className="p-2.5">Modeled Equivalent Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr className="bg-emerald-50/40 dark:bg-emerald-950/20">
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-semibold">Maintenance (Equilibrium)</td>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-mono">0 kcal/day</td>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-mono font-bold text-emerald-700 dark:text-emerald-400">2697 kcal/day</td>
                <td className="p-2.5 text-emerald-700 dark:text-emerald-400">0.0 lb/week</td>
              </tr>
              <tr>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-semibold">Mild Weight Loss</td>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-mono">-250 kcal/day</td>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-mono font-bold text-sky-700 dark:text-sky-400">2447 kcal/day</td>
                <td className="p-2.5 text-sky-700 dark:text-sky-400">-0.5 lb/week (-0.25 kg)</td>
              </tr>
              <tr>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-semibold">Standard Weight Loss</td>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-mono">-500 kcal/day</td>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-mono font-bold text-blue-700 dark:text-blue-400">2197 kcal/day</td>
                <td className="p-2.5 text-blue-700 dark:text-blue-400">-1.0 lb/week (-0.5 kg)</td>
              </tr>
              <tr>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-semibold">Extreme Weight Loss</td>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-mono">-1000 kcal/day</td>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-mono font-bold text-orange-700 dark:text-orange-400">1697 kcal/day</td>
                <td className="p-2.5 text-orange-700 dark:text-orange-400">-2.0 lb/week (-1.0 kg)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          These tiers represent illustrative calorie-target scenarios derived from mathematical offsets. When evaluating long-term target weight ranges, consult our{" "}
          <Link href="/calculators/ideal-weight-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700">
            ideal body weight calculator
          </Link>{" "}
          for formula-based reference benchmarks.
        </p>
      </section>

      {/* SECTION 6: The 3,500-Calorie Weight-Change Heuristic */}
      <section className="space-y-4 p-5 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800">
        <div className="flex items-center gap-2 text-amber-950 dark:text-amber-100 font-bold text-base sm:text-lg">
          <BookOpen className="w-5 h-5 text-amber-700 dark:text-amber-400" />
          <h2>6. The 3,500-Calorie Weight-Change Heuristic</h2>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-amber-950 dark:text-amber-200">
          The weekly rate approximations displayed across weight-loss calculators historically derive from the <strong>Wishnofsky 3,500-calorie heuristic</strong> (Wishnofsky, 1958). This arithmetic model assumes that one pound (0.45 kg) of human adipose body tissue contains approximately 3,500 kilocalories of stored chemical energy.
        </p>
        <div className="font-mono text-[11px] bg-white dark:bg-zinc-900 p-2.5 rounded border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 space-y-0.5">
          <p>• Cumulative Deficit of 3,500 kcal/week (500 kcal/day) ≈ 1.0 lb/week modeled reduction</p>
          <p>• Cumulative Deficit of 1,750 kcal/week (250 kcal/day) ≈ 0.5 lb/week modeled reduction</p>
        </div>
        <p className="text-xs leading-relaxed text-amber-900 dark:text-amber-300">
          <strong>Scientific Qualifications:</strong> While the 3,500-kcal rule provides an accessible arithmetic planning baseline, actual human weight loss is non-linear. As body weight decreases, the metabolic cost of moving that body also declines, gradually reducing daily maintenance expenditure. Adaptive thermogenesis, fluid balance fluctuations, and shifts in lean tissue also alter real-world weight change over time.
        </p>
      </section>

      {/* SECTION 7: Calorie Surpluses for Weight-Gain Planning */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg sm:text-xl">
          <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            7. Calorie Surpluses for Weight-Gain Planning
          </h2>
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-zinc-300">
          For individuals seeking to increase body mass, support athletic training, or facilitate muscular hypertrophy, the calculator models three illustrative <strong>hypercaloric surplus scenarios</strong>:
        </p>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-zinc-300 list-disc pl-5">
          <li><strong>Mild Weight Gain (+250 kcal/day):</strong> Modeled target of <strong>2947 kcal/day</strong> (~+0.5 lb/week modeled rate).</li>
          <li><strong>Standard Weight Gain (+500 kcal/day):</strong> Modeled target of <strong>3197 kcal/day</strong> (~+1.0 lb/week modeled rate).</li>
          <li><strong>Fast Weight Gain (+1000 kcal/day):</strong> Modeled target of <strong>3697 kcal/day</strong> (~+2.0 lb/week modeled rate).</li>
        </ul>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          The calculator calculates an energy surplus; it does not calculate or guarantee muscle gain. The degree to which excess caloric energy is partitioned into lean muscular tissue rather than adipose storage is conditional upon progressive resistance training, adequate protein availability, training experience, and individual biological response. To explore healthy target weight parameters, reference our{" "}
          <Link href="/calculators/ideal-weight-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700">
            ideal body weight calculator
          </Link>
          .
        </p>
      </section>

      {/* SECTION 8: Activity Levels and Energy Expenditure */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg sm:text-xl">
          <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            8. Activity Levels and Energy Expenditure
          </h2>
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-zinc-300">
          To scale resting metabolic rate into estimated total daily expenditure, the calculator applies standard physical activity planning multipliers:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <strong className="text-zinc-900 dark:text-zinc-100 block">Sedentary (1.200×)</strong>
            <span className="text-zinc-500 dark:text-zinc-400 block mt-0.5">Desk jobs, minimal walking, little deliberate exercise (2088 kcal/day baseline).</span>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <strong className="text-zinc-900 dark:text-zinc-100 block">Lightly Active (1.375×)</strong>
            <span className="text-zinc-500 dark:text-zinc-400 block mt-0.5">Light walking or recreational sports 1 to 3 days/week (2393 kcal/day).</span>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <strong className="text-zinc-900 dark:text-zinc-100 block">Moderately Active (1.550×)</strong>
            <span className="text-zinc-500 dark:text-zinc-400 block mt-0.5">Moderate structured exercise 4 to 5 days/week (2697 kcal/day).</span>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <strong className="text-zinc-900 dark:text-zinc-100 block">Active / Very Active (1.725×)</strong>
            <span className="text-zinc-500 dark:text-zinc-400 block mt-0.5">Rigorous daily exercise or demanding workouts 6 to 7 days/week (3002 kcal/day).</span>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <strong className="text-zinc-900 dark:text-zinc-100 block">Very Active (1.900×)</strong>
            <span className="text-zinc-500 dark:text-zinc-400 block mt-0.5">Intense athletic conditioning or two-a-day regimens (3306 kcal/day).</span>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <strong className="text-zinc-900 dark:text-zinc-100 block">Extra Active (2.000×)</strong>
            <span className="text-zinc-500 dark:text-zinc-400 block mt-0.5">Full-time manual physical labor plus training (3480 kcal/day).</span>
          </div>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          These activity factors are planning multipliers, not exact physical measurements. Daily burn is also driven by Non-Exercise Activity Thermogenesis (NEAT)—the spontaneous energy used during fidgeting, typing, standing, and household tasks.
        </p>
      </section>

      {/* SECTION 9: Body-Fat Estimates and Calorie Planning */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg sm:text-xl">
          <PieChart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            9. Body-Fat Estimates and Calorie Planning
          </h2>
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-zinc-300">
          When direct body-composition measurements are unavailable, the calculator provides an estimated body fat percentage using the <strong>Deurenberg anthropometric formula</strong>:
        </p>
        <div className="font-mono text-xs bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-blue-600 dark:text-blue-400">
          Estimated Body Fat % = 1.20 × BMI + 0.23 × Age - 10.8 × Sex - 5.4<br />
          <span className="text-zinc-500 dark:text-zinc-400 text-[11px] font-sans">*(Where Sex = 1 for biological males, and Sex = 0 for biological females).*</span>
        </div>
        <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          For the 25-year-old male baseline (BMI = 23.62 kg/m²), the equation yields <strong>17.89% (rounded to 18%)</strong>. This value is an estimated body-fat percentage derived from statistical regression equations, not a clinical measurement. To measure body composition using circumference protocols, visit our{" "}
          <Link href="/calculators/body-fat-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700">
            body fat percentage calculator
          </Link>
          , or check general weight-to-height screening via our{" "}
          <Link href="/calculators/bmi-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700">
            Body Mass Index (BMI) calculator
          </Link>
          .
        </p>
      </section>

      {/* SECTION 10: Macronutrient Ratios and Calorie Conversion */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg sm:text-xl">
          <PieChart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            10. Macronutrient Ratios and Calorie Conversion
          </h2>
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-zinc-300">
          Macronutrients supply the chemical energy required by human metabolism. Energy values are calculated using standard Atwater factors: <strong>4 kcal/g for carbohydrates</strong>, <strong>4 kcal/g for protein</strong>, and <strong>9 kcal/g for dietary fat</strong>.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-zinc-200 dark:border-zinc-800 border-collapse">
            <thead className="bg-zinc-100 dark:bg-zinc-900 font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="p-2.5 border-r border-zinc-200 dark:border-zinc-800">Preset Scenario</th>
                <th className="p-2.5 border-r border-zinc-200 dark:border-zinc-800">Ratio (C / P / F)</th>
                <th className="p-2.5 border-r border-zinc-200 dark:border-zinc-800">Carbohydrates (4 kcal)</th>
                <th className="p-2.5 border-r border-zinc-200 dark:border-zinc-800">Protein (4 kcal)</th>
                <th className="p-2.5">Dietary Fat (9 kcal)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-bold">Balanced</td>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-mono">50% / 20% / 30%</td>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-mono">275g (1099 kcal)</td>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-mono font-bold text-emerald-700 dark:text-emerald-400">110g (439 kcal)</td>
                <td className="p-2.5 font-mono">73g (659 kcal)</td>
              </tr>
              <tr>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-bold">Higher Protein</td>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-mono">40% / 30% / 30%</td>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-mono">220g (879 kcal)</td>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-mono font-bold text-emerald-700 dark:text-emerald-400">165g (659 kcal)</td>
                <td className="p-2.5 font-mono">73g (659 kcal)</td>
              </tr>
              <tr>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-bold">Lower Carb</td>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-mono">25% / 35% / 40%</td>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-mono">137g (549 kcal)</td>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-mono font-bold text-emerald-700 dark:text-emerald-400">192g (769 kcal)</td>
                <td className="p-2.5 font-mono">98g (879 kcal)</td>
              </tr>
              <tr>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-bold">Ketogenic-style</td>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-mono">5% / 25% / 70%</td>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-mono">28g (110 kcal)</td>
                <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800 font-mono font-bold text-emerald-700 dark:text-emerald-400">137g (549 kcal)</td>
                <td className="p-2.5 font-mono">171g (1538 kcal)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Calculated at the standard 2197 kcal daily target baseline. To customize individual carbohydrate, fat, and protein targets, visit our{" "}
          <Link href="/calculators/macro-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700">
            macronutrient ratio calculator
          </Link>
          . To evaluate protein requirements based on specific sports and resistance-training intensities, explore our{" "}
          <Link href="/calculators/protein-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700">
            protein intake calculator
          </Link>
          .
        </p>
      </section>

      {/* SECTION 11: Zigzag Calorie Cycling and Weekly Budgeting */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg sm:text-xl">
          <RotateCcw className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            11. Zigzag Calorie Cycling and Weekly Budgeting
          </h2>
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-zinc-300">
          <strong>Zigzag calorie cycling</strong> is a dietary scheduling strategy that redistributes your weekly calorie budget across higher- and lower-calorie days while preserving an identical cumulative 7-day energy intake (2197 × 7 = <strong>15,379 kcal/week</strong>).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <strong className="text-zinc-900 dark:text-zinc-100 text-sm block">Schedule 1: 3 High / 4 Low Days</strong>
            <p className="text-zinc-600 dark:text-zinc-400">
              High Days (Sun, Wed, Sat) set to maintenance TDEE (2697 kcal/day); Low Days (Mon, Tue, Thu, Fri) set to 1822 kcal/day.
            </p>
            <p className="font-mono font-bold text-blue-600 dark:text-blue-400 pt-1">Total: 15,379 kcal (Avg: 2197 kcal/day)</p>
          </div>
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <strong className="text-zinc-900 dark:text-zinc-100 text-sm block">Schedule 2: Progressive 7-Day Wave</strong>
            <p className="text-zinc-600 dark:text-zinc-400">
              Gradual undulating distribution ranging from 1867 kcal (Sun) up to 2527 kcal (Fri) and 2087 kcal (Sat).
            </p>
            <p className="font-mono font-bold text-purple-600 dark:text-purple-400 pt-1">Total: 15,379 kcal (Avg: 2197 kcal/day)</p>
          </div>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Zigzag scheduling provides practical dietary flexibility—such as aligning higher caloric intake with demanding workout days or social events—without altering net weekly energy balance.
        </p>
      </section>

      {/* SECTION 12: Food and Exercise Calorie Reference */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg sm:text-xl">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            12. Food and Exercise Calorie Reference
          </h2>
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-zinc-300">
          To assist with day-to-day dietary tracking and physical activity planning, the calculator integrates two reference directories:
        </p>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-zinc-300 list-disc pl-5">
          <li><strong>Common Foods Reference Directory:</strong> Nutritional energy reference values across 36 common food staples (fruits, vegetables, lean proteins, dairy, and meal items) categorized with typical serving sizes, dietary calories (kcal), and equivalent kilojoules (kJ).</li>
          <li><strong>Exercise Energy Expenditure Estimates:</strong> Estimates hourly caloric burn across common physical activities (walking, bicycling, swimming, resistance exercise, running) across 125 lb (57 kg), 155 lb (70 kg), and 185 lb (84 kg) reference weights.</li>
        </ul>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          These values represent population averages derived from standard reference datasets. Actual individual energy expenditure varies based on body composition, movement efficiency, and workout intensity.
        </p>
      </section>

      {/* SECTION 13: Calorie-to-Kilojoule Conversion */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg sm:text-xl">
          <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            13. Calorie-to-Kilojoule Conversion
          </h2>
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-zinc-300">
          In international nutrition and scientific physics, energy is measured in both dietary calories (kilocalories) and International System (SI) units:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-center">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] text-zinc-500 uppercase block font-sans">Kilojoules</span>
            <strong className="text-sm text-blue-600 dark:text-blue-400 block mt-0.5">1 kcal = 4.1868 kJ</strong>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] text-zinc-500 uppercase block font-sans">Joules</span>
            <strong className="text-sm text-emerald-600 dark:text-emerald-400 block mt-0.5">1 kcal = 4186.8 J</strong>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] text-zinc-500 uppercase block font-sans">Megajoules</span>
            <strong className="text-sm text-purple-600 dark:text-purple-400 block mt-0.5">1 kcal = 0.00419 MJ</strong>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] text-zinc-500 uppercase block font-sans">Watt-hours</span>
            <strong className="text-sm text-orange-600 dark:text-orange-400 block mt-0.5">1 kcal ≈ 1.163 Wh</strong>
          </div>
        </div>
      </section>

      {/* SECTION 14: 20 Authoritative FAQs (Open by Default) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg sm:text-xl">
          <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            14. Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {calorie_calculatorFaqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5 shadow-sm"
            >
              <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 15: Calculation Methodology & Health Disclaimer */}
      <section className="p-6 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm space-y-4 text-zinc-600 dark:text-zinc-400">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3>Calculation Methodology</h3>
          </div>
          <p className="leading-relaxed">
            Resting energy requirements are estimated using validated population equations (Mifflin-St Jeor, Revised Harris-Benedict 1984, or Katch-McArdle) and scaled by physical activity planning factors (1.20× to 2.00×) to determine Total Daily Energy Expenditure. Calorie target tiers apply arithmetic offsets (±250 to ±1000 kcal/day) with an automated safety floor to prevent unsafe crash targets. Zigzag schedules preserve 100% of the weekly calorie budget across high/low and wave distributions. Macronutrient gram conversions use standard Atwater factors (4 kcal/g for protein and carbohydrates, 9 kcal/g for fat).
          </p>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 space-y-1.5">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
            <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h3>Educational &amp; Health Disclaimer</h3>
          </div>
          <p className="leading-relaxed">
            This calculator provides mathematical estimates of energy expenditure and daily calorie targets based on user-entered parameters and standardized population equations. Individual caloric requirements and metabolic rates can differ significantly based on genetics, body composition, medical conditions, medications, and physical activity. Results are intended for educational and nutritional planning purposes only and do not constitute a medical diagnosis, clinical evaluation, or individualized medical nutrition therapy. Consult a licensed registered dietitian (RDN) or healthcare provider for personalized medical dietary guidance.
          </p>
        </div>
      </section>
    </article>
  );
}

export default CalorieContent;

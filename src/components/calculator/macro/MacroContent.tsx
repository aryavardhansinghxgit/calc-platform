"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  ShieldAlert,
  BookOpen,
  PieChart as PieIcon,
  Scale,
  Flame,
  Activity,
  Dumbbell,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { macro_calculatorFaqs } from "@/app/calculators/macro-calculator/faq";

export function MacroContent() {
  // All 26 accredited FAQs open by default following the 401(k) standard
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: macro_calculatorFaqs.length }, (_, i) => i))
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
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800 font-sans">
      {/* 1. EXPANDED MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is a Macro Calculator?
          </h2>
          <p>
            A macro calculator estimates how many calories you may need each day and then divides that calorie target among the three primary macronutrients: protein, carbohydrates, and dietary fat.
          </p>
          <p>
            Your result is not simply a fixed calorie number. A useful macro plan starts with an estimate of resting energy expenditure, adjusts that estimate for physical activity, applies a goal such as maintenance, fat loss, muscle gain, or body recomposition, and then converts the resulting calorie target into grams of protein, carbohydrates, and fat.
          </p>
          <p>
            This Macro Calculator combines those steps in one place. It can use different BMR equations, activity levels, body-fat information where appropriate, predefined diet styles, custom macro ratios, and goal-specific calorie adjustments.
          </p>
          <p>
            Because energy expenditure is difficult to determine outside controlled laboratory testing, the result should be treated as a planning estimate rather than an exact measurement of your metabolism. The original Mifflin-St Jeor study developed its equation from measured resting energy expenditure in 498 healthy adults, illustrating why these equations are predictive models rather than direct metabolic measurements. Explore your baseline expenditure in our{" "}
            <Link href="/calculators/bmr-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              BMR Calculator
            </Link>{" "}
            and{" "}
            <Link href="/calculators/tdee-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              TDEE Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            The Three Macronutrients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="flex justify-between items-center">
                <strong className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">Protein</strong>
                <span className="font-mono font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded text-[11px]">
                  4 kcal / g
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Protein supplies amino acids needed for the maintenance and repair of body tissues and supports many physiological functions. In a macro calculation, protein is expressed in grams and contributes approximately 4 kcal per gram under the standard Atwater general-factor approach. Established dietary reference ranges for healthy adults place protein at 10–35% of total energy. Plan targeted protein goals in our{" "}
                <Link href="/calculators/protein-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                  Protein Calculator
                </Link>
                .
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="flex justify-between items-center">
                <strong className="text-sky-700 dark:text-sky-400 font-bold text-sm">Carbohydrates</strong>
                <span className="font-mono font-bold bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 px-2 py-0.5 rounded text-[11px]">
                  4 kcal / g
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Carbohydrates provide approximately 4 kcal per gram and are an important energy source, particularly for activities involving moderate- to high-intensity exercise. The established adult Acceptable Macronutrient Distribution Range (AMDR) is 45–65% of total calories from carbohydrate. Endurance athletes may allocate more calories here. Plan carb needs using our{" "}
                <Link href="/calculators/carbohydrate-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                  Carbohydrate Calculator
                </Link>
                .
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="flex justify-between items-center">
                <strong className="text-purple-700 dark:text-purple-400 font-bold text-sm">Dietary Fat</strong>
                <span className="font-mono font-bold bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded text-[11px]">
                  9 kcal / g
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Dietary fat is the most energy-dense major macronutrient, providing approximately 9 kcal per gram. It provides essential fatty acids and participates in hormone production and vitamin absorption. The adult AMDR is 20–35% of total energy. Unsaturated fats from nuts, seeds, fish, and plant oils support a balanced pattern. See our{" "}
                <Link href="/calculators/fat-intake-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                  Fat Intake Calculator
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How This Macro Calculator Works
          </h2>
          <p>
            The calculator follows a sequence rather than using one arbitrary calorie-per-pound rule:
          </p>
          <div className="space-y-3 pt-1">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-slate-100 text-sm block mb-1">
                Step 1: Estimate BMR
              </strong>
              <p className="text-slate-600 dark:text-slate-400">
                Basal Metabolic Rate (BMR) represents the estimated energy required to sustain basic physiological functions at rest. Depending on the selected equation, the calculator may use age, biological sex, body weight, height, and lean body mass or body-fat percentage. The calculator supports multiple predictive equations rather than treating one equation as universally superior.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-slate-100 text-sm block mb-1">
                Step 2: Convert BMR Into a Daily Energy Estimate
              </strong>
              <p className="text-slate-600 dark:text-slate-400">
                Your activity level is used to estimate how much additional energy you expend over a typical day, producing an estimated Total Daily Energy Expenditure (TDEE) or maintenance calorie level (TDEE ≈ BMR × Activity Factor). Occupational movement, exercise, step count, body composition, and spontaneous physical activity all vary between individuals, as recognized in the NIH Body Weight Planner.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-slate-100 text-sm block mb-1">
                Step 3: Apply the Selected Goal
              </strong>
              <p className="text-slate-600 dark:text-slate-400">
                The calculator modifies estimated maintenance calories according to your objective: Maintenance (calories equal expenditure), Cutting / Fat Loss (calorie deficit applied), Bulking / Muscle Gain (calorie surplus applied), Body Recomposition (smaller energy adjustment with emphasis on protein), or Athlete / Performance (larger carbohydrate proportion). Check overall calorie targets in our{" "}
                <Link href="/calculators/calorie-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                  Calorie Calculator
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Calories Become Macros
          </h2>
          <p>
            Once a daily calorie target has been selected, the calculator converts the chosen percentage split into grams using standard Atwater general factors (USDA FoodData Central):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-center pt-1">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-emerald-700 dark:text-emerald-300 font-bold block">Protein (g)</span>
              <span>Calories × Protein % ÷ 4</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-sky-700 dark:text-sky-300 font-bold block">Carbohydrate (g)</span>
              <span>Calories × Carb % ÷ 4</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-purple-700 dark:text-purple-300 font-bold block">Fat (g)</span>
              <span>Calories × Fat % ÷ 9</span>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Your Displayed Macro Calories May Differ by 1–3 Calories
          </h2>
          <p>
            The calculator performs the underlying calculation using the more precise values and then displays whole grams for convenience.
          </p>
          <p>
            For example, the canonical calculator scenario is approximately 2,697 kcal/day with 202 g protein, 270 g carbohydrate, and 90 g fat. The precise calculated energy is reconciled internally, but multiplying the displayed whole grams back together (202 × 4 = 808 kcal, 270 × 4 = 1,080 kcal, 90 × 9 = 810 kcal) produces 2,698 kcal—a 1 kcal difference. This is a normal consequence of displaying practical whole-number gram targets rather than exposing every decimal place.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Example: How to Read Your Macro Result
          </h2>
          <p>
            Suppose your target is approximately 2,697 kcal/day and your chosen split is 30% protein / 40% carbohydrate / 30% fat. The calculator estimates:
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold">
                <tr>
                  <th className="p-3">Macronutrient</th>
                  <th className="p-3">Share</th>
                  <th className="p-3">Approx. Calories</th>
                  <th className="p-3">Approx. Grams</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-emerald-700 dark:text-emerald-400">Protein</td>
                  <td className="p-3">30%</td>
                  <td className="p-3">809 kcal</td>
                  <td className="p-3 font-bold">202 g</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-sky-700 dark:text-sky-400">Carbohydrates</td>
                  <td className="p-3">40%</td>
                  <td className="p-3">1,079 kcal</td>
                  <td className="p-3 font-bold">270 g</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-purple-700 dark:text-purple-400">Fat</td>
                  <td className="p-3">30%</td>
                  <td className="p-3">809 kcal</td>
                  <td className="p-3 font-bold">90 g</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            The percentages sum to 100%. The calculator&apos;s internal values use more precision than the rounded numbers shown in the table.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Choosing the Right Macro Ratio
          </h2>
          <p>
            There is no single macro ratio that is optimal for every person. A useful starting ratio depends on what you are trying to accomplish:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 text-sm block">For General Maintenance</strong>
              <p className="text-slate-600 dark:text-slate-400">
                A balanced split (30% P / 40% C / 30% F) provides a practical starting point. The calculator&apos;s Standard and Maintenance modes are designed for this use.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 text-sm block">For Fat Loss</strong>
              <p className="text-slate-600 dark:text-slate-400">
                A calorie deficit is the primary energy variable. Protein is given a larger share to support satiety and preserve lean muscle mass. The CDC notes that gradual weight loss (1–2 lb/week) is generally more sustainable than rapid loss.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 text-sm block">For Muscle Gain</strong>
              <p className="text-slate-600 dark:text-slate-400">
                A calorie surplus makes gaining body mass easier, while resistance training and adequate protein provide the nutritional context for muscle development.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 text-sm block">For Body Recomposition</strong>
              <p className="text-slate-600 dark:text-slate-400">
                Aiming to reduce body fat while maintaining or increasing lean mass typically involves a relatively small calorie deficit or maintenance-level intake combined with sufficient protein and resistance training. Compare body metrics with our{" "}
                <Link href="/calculators/body-fat-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                  Body Fat Calculator
                </Link>
                .
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5 md:col-span-2">
              <strong className="text-slate-900 dark:text-slate-100 text-sm block">For Athletic Performance</strong>
              <p className="text-slate-600 dark:text-slate-400">
                High training volumes increase the practical importance of carbohydrate availability because glycogen is a major fuel source for higher-intensity exercise. A performance-oriented macro split should be interpreted in the context of training volume, recovery, and total energy availability.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8 to 11 */}
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Protein: How Much Do You Actually Need?
            </h2>
            <p>
              Protein requirements are highly individual. The established adult RDA is approximately 0.8 g/kg/day, while the acceptable macro range for healthy adults is 10–35% of total calories. People who perform regular resistance exercise or who are dieting may deliberately use higher protein intakes (1.6–2.2 g/kg). The appropriate amount depends on body mass, lean mass, training, energy intake, age, and health status.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Carbohydrates and Exercise Performance
            </h2>
            <p>
              Carbohydrate availability becomes increasingly relevant as training intensity and duration increase. Muscle and liver glycogen provide carbohydrate stores that can be used during exercise. Consequently, endurance athletes and people participating in frequent high-intensity training have different carbohydrate requirements from a sedentary person eating the same number of total calories. The calculator&apos;s Athlete Planner shifts macro allocation toward carbohydrate as a planning estimate.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Understanding Fat Intake
            </h2>
            <p>
              Fat should not simply be treated as the leftover category after protein and carbohydrates are assigned. Fat provides essential fatty acids and is involved in normal physiological processes, hormone synthesis, and cellular membrane integrity. The established adult AMDR for fat is 20–35% of calories. Both the amount and quality of dietary fat matter.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Keto Macros
            </h2>
            <p>
              A ketogenic diet typically places carbohydrates substantially lower than a conventional balanced diet, with a larger proportion of calories coming from fat (25% P / 5% C / 70% F). The calculator&apos;s Keto mode reflects a predefined low-carbohydrate preset, not a medical definition that every ketogenic diet must follow. People using therapeutic ketogenic diets for medical conditions require clinician-supervised nutritional management.
            </p>
          </div>
        </section>

        {/* Section 12 to 15 */}
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              What Is IIFYM?
            </h2>
            <p>
              IIFYM, or &quot;If It Fits Your Macros,&quot; is a flexible dieting approach based on meeting daily calorie and macro targets while allowing greater freedom in food selection. Tracking numerical macro targets over the course of the day rather than requiring rigid meal plans can improve adherence, but hitting macro numbers does not automatically guarantee nutritional completeness—food quality, fiber, micronutrients, hydration, and overall dietary pattern still matter.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Why the Same Calories Can Produce Different Macro Targets
            </h2>
            <p>
              Two people consuming 2,700 calories might use 30% protein / 40% carbohydrate / 30% fat (202g P / 270g C / 90g F) versus 45% protein / 35% carbohydrate / 20% fat (304g P / 236g C / 60g F). They consume approximately the same total energy, but the gram targets are very different. This is why the calculator separates Energy target → Macro percentage → Grams instead of treating calories and macros as interchangeable concepts.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Food Quality Still Matters
            </h2>
            <p>
              A macro target tells you how much protein, carbohydrate, and fat to consume, but not whether those foods create a nutritionally balanced diet. A high-quality eating pattern includes a variety of vegetables, fruit, whole grains, legumes, lean meats, eggs, seafood, dairy, nuts, seeds, and healthy plant oils. USDA FoodData Central notes that food-composition values vary between samples, so nutrition databases should be treated as estimates rather than immutable constants.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Why Your Real Maintenance Calories May Differ From the Calculator
            </h2>
            <p>
              A calculator estimates energy expenditure using population-derived equations and activity assumptions. Your actual maintenance intake is revealed by your real-world weight trend over time. Differences arise from activity estimation variations, untracked spontaneous movement (NEAT), exercise intensity differences, individual body composition, and normal food-tracking errors.
            </p>
          </div>
        </section>

        {/* Section 16 & 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Use the Calculator in Practice
          </h2>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <ol className="list-decimal pl-5 space-y-2 text-slate-700 dark:text-slate-300">
              <li><strong>Enter accurate measurements:</strong> Use your current morning body weight and measured height.</li>
              <li><strong>Select an appropriate BMR equation:</strong> Mifflin-St Jeor is a common starting point; use Katch-McArdle or Cunningham if you have verified body composition data.</li>
              <li><strong>Select an honest activity level:</strong> Match the description to your actual routine rather than aspirational training.</li>
              <li><strong>Select your goal:</strong> Maintenance, cutting, bulking, recomposition, or performance.</li>
              <li><strong>Review the macro allocation:</strong> Check both percentage and gram targets.</li>
              <li><strong>Follow the plan consistently:</strong> Track actual food intake accurately.</li>
              <li><strong>Compare your trend with the estimate:</strong> Your scale trend over 2 to 4 weeks provides empirical evidence of your actual energy requirements.</li>
            </ol>
          </div>
        </section>

        {/* Section 18 to 21 */}
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              How Often Should You Recalculate Your Macros?
            </h2>
            <p>
              You do not need to recalculate your macros daily. Recalculate after meaningful changes in body weight (5 to 10 pounds), major shifts in training volume, or when changing fitness goals, rather than reacting to daily scale fluctuations.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Why Weight-Loss Calculations Are Estimates &amp; The 3,500-Calorie Rule
            </h2>
            <p>
              The traditional rule of thumb says a 3,500-calorie cumulative deficit equals one pound of body weight. While useful as an introduction, the NIDDK and NIH explain that the human body responds dynamically to changing energy intake and expenditure, making real-world body-weight change non-linear. The 12-week projection is a modeled scenario, not a guarantee.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Body Composition and Lean Body Mass
            </h2>
            <p>
              Lean Body Mass (LBM = Weight − Fat Mass) represents all non-fat tissues. Formulas like Katch-McArdle use LBM to estimate expenditure directly. Because estimated body-fat percentage can contain measurement error, verify your baseline with our{" "}
              <Link href="/calculators/ideal-weight-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Ideal Weight Calculator
              </Link>{" "}
              and{" "}
              <Link href="/calculators/bmi-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                BMI Calculator
              </Link>
              .
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              The Macro Calculator&apos;s Calculation Pipeline
            </h2>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono text-center text-slate-700 dark:text-slate-300">
              Personal Measurements → BMR Equation → Estimated BMR → Activity Multiplier → Estimated TDEE → Goal Adjustment → Daily Calorie Target → Macro Ratio Split → Grams (Protein ÷ 4, Carbs ÷ 4, Fat ÷ 9)
            </div>
          </div>
        </section>

        {/* Section 22 to 24 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Macro Calculator Limitations &amp; When to Adjust
          </h2>
          <p>
            A macro calculator cannot directly measure your metabolism. Important sources of uncertainty include predictive equation error, activity classification variance, food-tracking inaccuracy, fluid retention, and adaptive thermogenesis. Do not reduce calories simply because the scale fluctuates over a few days; evaluate multi-week trends before modifying targets.
          </p>
        </section>
      </div>

      {/* 2. FREQUENTLY ASKED QUESTIONS (ALL 26 UNFOLDED BY DEFAULT) */}
      <div className="pt-8 space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {macro_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-900/50 font-normal border-t border-slate-100 dark:border-slate-800/60 mt-1">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. NUTRITION & MEDICAL DISCLAIMER */}
      <div className="pt-8">
        <section className="p-4 sm:p-5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3.5 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
          <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <strong className="font-bold block text-amber-950 dark:text-amber-100 text-sm">
              Nutrition &amp; Medical Disclaimer
            </strong>
            <p className="leading-relaxed">
              This calculator is intended for educational and general fitness-planning purposes. It estimates calorie and macronutrient needs using predictive equations, activity assumptions and user-provided information. It does not directly measure metabolism and does not provide medical diagnosis or individualized medical treatment.
            </p>
            <p className="leading-relaxed">
              Individual energy and nutrient requirements can differ substantially from calculator estimates. People who are pregnant or breastfeeding, have a medical condition, take medications that affect weight or metabolism, have a history of an eating disorder, or have specialized sports-nutrition requirements should consult an appropriately qualified healthcare professional before making major dietary changes.
            </p>
            <p className="text-xs text-amber-800 dark:text-amber-300/90 pt-1">
              <strong>Research foundations:</strong> Original Mifflin-St Jeor study (1990), USDA FoodData Central energy factor documentation, National Academies dietary reference intakes (AMDR), CDC weight-management guidelines, and NIH/NIDDK Body Weight Planner dynamic energy modeling.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}

export default MacroContent;

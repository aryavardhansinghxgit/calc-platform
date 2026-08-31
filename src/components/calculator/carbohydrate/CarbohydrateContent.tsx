"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  Apple,
  Calculator,
  Scale,
  Flame,
  Activity,
  Dumbbell,
  PieChart,
  Layers,
} from "lucide-react";
import { carbohydrate_calculatorFaqs } from "@/app/calculators/carbohydrate-calculator/faq";

export function CarbohydrateContent() {
  // All 24 approved FAQs open by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 24 }, (_, i) => i))
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

  const relatedCalculators = [
    {
      name: "TDEE Calculator",
      slug: "/calculators/tdee-calculator",
      desc: "Determine total daily energy expenditure based on baseline physical activity.",
      icon: Activity,
    },
    {
      name: "Calorie Calculator",
      slug: "/calculators/calorie-calculator",
      desc: "Estimate daily energy targets for weight loss, maintenance, or gain.",
      icon: Flame,
    },
    {
      name: "Macro Calculator",
      slug: "/calculators/macro-calculator",
      desc: "Calculate balanced protein, carbohydrate, and fat grams for your TDEE.",
      icon: PieChart,
    },
    {
      name: "Protein Calculator",
      slug: "/calculators/protein-calculator",
      desc: "Calculate personalized daily protein targets for muscle preservation and growth.",
      icon: Dumbbell,
    },
    {
      name: "Fat Intake Calculator",
      slug: "/calculators/fat-intake-calculator",
      desc: "Model healthy dietary fat ranges based on metabolic health guidelines.",
      icon: Apple,
    },
    {
      name: "BMR Calculator",
      slug: "/calculators/bmr-calculator",
      desc: "Compare resting basal metabolic rate across 5 clinical predictive formulas.",
      icon: Calculator,
    },
    {
      name: "Body Fat Calculator",
      slug: "/calculators/body-fat-calculator",
      desc: "Estimate body fat percentage and lean tissue mass from body measurements.",
      icon: Layers,
    },
    {
      name: "BMI Calculator",
      slug: "/calculators/bmi-calculator",
      desc: "Evaluate adult weight-for-height clinical category and health metrics.",
      icon: Scale,
    },
  ];

  return (
    <article className="mt-6 bg-white rounded-xl border border-slate-200 p-5 sm:p-7 text-slate-800 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100">
      {/* 1. MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800">
        {/* Overview Header */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 pb-1">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <BookOpen className="h-4 w-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Evidence-Informed Nutrition Guide
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600">
            Carbohydrate Calculator: Find a Practical Daily Carb Target
          </h2>
          <p className="font-semibold text-slate-900 text-sm sm:text-base">
            How many carbohydrates should you eat each day?
          </p>
          <p>
            There is no single carbohydrate number that works for everyone. Your useful daily carb target depends on your total energy needs, activity level, fitness goal, food preferences, and the way you divide calories between carbohydrate, protein, and fat.
          </p>
          <p>
            This carbohydrate calculator estimates a daily carbohydrate target from your personal characteristics and energy requirements. It supports different goals, including maintenance, weight loss, weight gain, athletic performance, lower-carbohydrate eating, higher-carbohydrate eating, and a custom carbohydrate target.
          </p>
          <p>
            The calculator also lets you examine fiber, net carbs, glycemic index (GI), glycemic load (GL), and seven-day carbohydrate cycling, so you can move beyond a single number and understand how different carbohydrate choices fit into your overall diet.
          </p>
          <p>
            For most people, the most useful way to use a carb calculator is not to treat the result as a rigid prescription. Instead, use it as a starting point, then adjust it based on body-weight trends, training performance, hunger, recovery, and adherence.
          </p>
        </section>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            What This Carbohydrate Calculator Calculates
          </h2>
          <p>
            The calculator combines several pieces of information to estimate an appropriate carbohydrate target:
          </p>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-blue-900 font-semibold">
            Estimated energy requirement → calorie target → carbohydrate allocation → grams of carbohydrate
          </div>
          <p>Depending on the selected mode, it can also calculate or display:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Daily carbohydrate target in grams</li>
            <li>Carbohydrate calories</li>
            <li>Carbohydrate percentage of total calories</li>
            <li>Net-carbohydrate tracking value</li>
            <li>Fiber adjustment</li>
            <li>Sugar-alcohol adjustment</li>
            <li>Glycemic index and glycemic load for a selected food</li>
            <li>Seven-day carbohydrate-cycling schedules</li>
            <li>Food-level carbohydrate information</li>
            <li>Different BMR-based energy estimates</li>
            <li>Weight-loss, maintenance, muscle-gain, and athletic scenarios</li>
          </ul>
          <p>
            The calculator is therefore broader than a simple “grams of carbs per day” calculator: it is designed to show how a carbohydrate target fits into the rest of an energy and nutrition plan.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            How Many Carbs Should You Eat Per Day?
          </h2>
          <p>
            A useful carbohydrate intake depends first on how many calories you need. Before calculating carbohydrates, establishing your total energy needs using a{" "}
            <Link href="/calculators/calorie-calculator" className="text-blue-600 font-medium underline">
              Calorie Calculator
            </Link>{" "}
            is essential.
          </p>
          <p>For example, suppose your estimated daily calorie target is:</p>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
            <div><strong>Daily Calorie Target:</strong> 2,361 kcal/day</div>
            <div><strong>Selected Carbohydrate Allocation:</strong> 50% of calories</div>
            <div><strong>Carbohydrate Energy Target:</strong> 2,361 × 0.50 = 1,180.5 kcal</div>
            <div><strong>Using ~4 kcal per gram of carbohydrate:</strong> 1,180.5 ÷ 4 = 295.1 g</div>
            <div><strong>Displayed Target:</strong> Approximately <strong>295 g carbohydrate/day</strong></div>
          </div>
          <p>
            This illustrates an important point: a carbohydrate target is often derived from an energy target. Changing your calorie requirement while keeping the same carbohydrate percentage will change your carbohydrate grams.
          </p>
          <p>The calculation can be summarized as:</p>
          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 font-mono text-xs text-blue-900 font-semibold">
            Carbohydrate grams = (Daily calories × carbohydrate %) ÷ 4
          </div>
          <p>
            The 4 kcal/g value is the conventional energy factor used for carbohydrate in nutrition calculations. Actual metabolizable energy can vary depending on food composition and labeling conventions, so this formula should be understood as a planning calculation rather than a laboratory measurement.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Carbohydrates and Your Total Calorie Target
          </h2>
          <p>
            Carbohydrates are one of the three primary macronutrients, together with protein and fat. To explore complete macronutrient distributions across all three categories, you can use our{" "}
            <Link href="/calculators/macro-calculator" className="text-blue-600 font-medium underline">
              Macro Calculator
            </Link>
            .
          </p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
            <div>• <strong>Carbohydrate:</strong> ~4 kcal/g</div>
            <div>• <strong>Protein:</strong> ~4 kcal/g</div>
            <div>• <strong>Fat:</strong> ~9 kcal/g</div>
          </div>
          <p>
            The calculator uses those conventional energy factors when converting a percentage-based macro allocation into grams.
          </p>
          <p>
            This is why the calculator does not determine carbohydrate intake in isolation. A 2,000-calorie diet and a 3,000-calorie diet could use the same carbohydrate percentage but produce very different gram targets.
          </p>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">Daily Calories</th>
                  <th className="p-3">Carb Allocation</th>
                  <th className="p-3">Approx. Carbs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold">2,000 kcal</td>
                  <td className="p-3">45%</td>
                  <td className="p-3 font-bold text-blue-600">225 g</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold">2,000 kcal</td>
                  <td className="p-3">50%</td>
                  <td className="p-3 font-bold text-blue-600">250 g</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold">2,500 kcal</td>
                  <td className="p-3">50%</td>
                  <td className="p-3 font-bold text-blue-600">313 g</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold">3,000 kcal</td>
                  <td className="p-3">50%</td>
                  <td className="p-3 font-bold text-blue-600">375 g</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            These are mathematical examples rather than universal dietary recommendations.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Carbohydrate Intake for Maintenance
          </h2>
          <p>
            A maintenance diet aims to provide enough energy to support your usual activity while keeping body weight broadly stable over time. Your baseline expenditure can be measured with our{" "}
            <Link href="/calculators/tdee-calculator" className="text-blue-600 font-medium underline">
              TDEE Calculator
            </Link>
            .
          </p>
          <p>
            Your calculator&apos;s Maintenance mode starts from your estimated energy requirement and applies the selected carbohydrate allocation. This is useful when you want to answer:
          </p>
          <blockquote className="p-3 bg-slate-50 border-l-4 border-blue-500 rounded-r-xl italic text-slate-700 text-xs">
            “How many carbs should I eat if I want to maintain my current weight?”
          </blockquote>
          <p>
            The important distinction is that maintenance calories are an estimate. Your actual maintenance intake is ultimately determined by your real-world energy expenditure and long-term weight trend. A calculator can give you a sensible starting point, but your body-weight trend provides the practical feedback:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs">
            <li><strong>Weight stable over several weeks:</strong> estimated intake may be close to maintenance;</li>
            <li><strong>Weight consistently falling:</strong> actual energy intake is likely below expenditure;</li>
            <li><strong>Weight consistently rising:</strong> actual energy intake is likely above expenditure.</li>
          </ul>
          <p>
            This makes a calculator useful for planning without turning it into a rigid rule.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Carbohydrates for Weight Loss
          </h2>
          <p>
            A calorie deficit is generally required for sustained weight loss, but the carbohydrate share of that deficit can vary considerably. A lower-carbohydrate diet is one possible strategy. So is a moderate- or higher-carbohydrate diet.
          </p>
          <p>The more important questions are:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs">
            <li>Can you maintain the calorie deficit?</li>
            <li>Are you consuming enough protein?</li>
            <li>Is your diet nutritionally adequate?</li>
            <li>Can you train and recover effectively?</li>
            <li>Does the eating pattern fit your preferences and lifestyle?</li>
          </ul>
          <p>
            The carbohydrate calculator allows different weight-loss modes so you can examine how changing carbohydrate allocation affects the resulting gram target.
          </p>
          <p>
            For example, lowering carbohydrates from 50% to 35% does not automatically produce more fat loss if total energy intake remains the same. The change primarily changes where the calories come from. That distinction is important because carbohydrate percentage and calorie intake are related but not interchangeable.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Carbohydrates for Muscle Gain
          </h2>
          <p>
            When gaining muscle or body mass, carbohydrate can be useful for supporting training volume and replenishing muscle glycogen. A higher carbohydrate target can fit naturally into a calorie surplus, especially for people performing frequent resistance or high-volume training.
          </p>
          <p>
            However, more carbohydrate is not automatically better. A useful approach is to ensure that:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs">
            <li>Total calories support the goal</li>
            <li>Protein intake is adequate (calculate targets with our{" "}
              <Link href="/calculators/protein-calculator" className="text-blue-600 font-medium underline">
                Protein Calculator
              </Link>
              )
            </li>
            <li>Fat intake remains sufficient</li>
            <li>Remaining calories are allocated to carbohydrate according to training needs and preference</li>
          </ul>
          <p>
            Your calculator&apos;s Weight Gain / Muscle modes allow you to examine this trade-off numerically.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Carbohydrates for Athletes
          </h2>
          <p>
            Carbohydrate requirements can differ substantially between a sedentary adult and someone training for prolonged endurance exercise.
          </p>
          <p>
            For athletes, carbohydrate is often more useful when expressed relative to body weight and training demands rather than as a fixed percentage of total calories.
          </p>
          <p>
            Sports-nutrition literature has historically used approximate ranges such as 5–7 g/kg/day for general training and 7–10 g/kg/day for higher endurance demands, while emphasizing that requirements vary according to training volume and competition demands.
          </p>
          <p>
            This is why the calculator includes separate athletic and endurance-oriented modes rather than assuming that the same carbohydrate target is optimal for every active person. A cyclist completing long training sessions, for example, may have a very different carbohydrate requirement from someone performing three short resistance workouts each week.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Carbohydrate Timing Around Exercise
          </h2>
          <p>
            The amount of carbohydrate you consume matters, but the timing can matter too when training performance is a priority.
          </p>
          <p>
            For longer or more demanding training sessions, carbohydrate consumed before exercise can help provide readily available energy. During prolonged exercise, carbohydrate intake may help maintain performance. After training, carbohydrate contributes to glycogen restoration, particularly when another demanding session is scheduled soon.
          </p>
          <p>The exact strategy depends on:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs">
            <li>Exercise duration;</li>
            <li>Exercise intensity;</li>
            <li>Training frequency;</li>
            <li>Tolerance of food during exercise;</li>
            <li>Total daily carbohydrate intake;</li>
            <li>Competition schedule.</li>
          </ul>
          <p>
            This is why the calculator&apos;s daily target should be viewed as the overall planning number, while meal timing can be adjusted around training.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Daily Carbohydrate Reference Values
          </h2>
          <p>Reference values and individualized targets are not the same thing.</p>
          <p>
            For U.S. nutrition labeling, the FDA currently uses a 275 g Daily Value for total carbohydrate, based on a 2,000-calorie reference diet. The FDA also emphasizes that an individual&apos;s calorie needs can be higher or lower than 2,000 kcal.
          </p>
          <p>
            The National Academies&apos; Dietary Reference Intake framework lists 130 g/day as the adult carbohydrate RDA and historically provides an adult carbohydrate AMDR of 45–65% of energy.
          </p>
          <p>These numbers answer different questions:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs">
            <li><strong>130 g/day:</strong> a population-level nutrient reference.</li>
            <li><strong>45–65%:</strong> an acceptable macronutrient distribution range.</li>
            <li><strong>275 g/day:</strong> the FDA Nutrition Facts Daily Value based on a 2,000-calorie reference diet.</li>
          </ul>
          <p>
            None of these numbers should automatically be treated as your personal carbohydrate target. Your personalized calculator result depends on your chosen calorie target and the selected carbohydrate strategy.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Total Carbohydrates vs Net Carbohydrates
          </h2>
          <h3 className="text-sm font-bold text-slate-900">What Are Net Carbs?</h3>
          <p>
            “Net carbs” is a common dietary-tracking term, especially in low-carbohydrate and ketogenic diet communities. A commonly used calculation is:
          </p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-blue-900 font-semibold">
            Net carbs = Total carbohydrate − dietary fiber − selected sugar alcohols
          </div>
          <p>
            However, this is a tracking convention, not a legally standardized Nutrition Facts quantity.
          </p>
          <p>
            The American Diabetes Association notes that “net carbs” does not have a legal definition and advises that people pay attention to total carbohydrate on food labels. It also points out that fiber and sugar alcohols do not all behave identically in digestion and metabolism.
          </p>
          <p>
            The FDA Nutrition Facts framework separately identifies total carbohydrate and its components, including dietary fiber, sugars, added sugars and, where applicable, sugar alcohols.
          </p>
          <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-200 text-xs space-y-1.5">
            <div className="font-bold text-blue-900">Net Carbs Calculation Example:</div>
            <div>Suppose a food provides: 30 g total carbohydrate, 8 g fiber, and 2 g sugar alcohols.</div>
            <div className="font-mono font-bold text-blue-800">Net carbs = 30 − 8 − 2 = 20 g</div>
            <div className="text-slate-600 italic">
              That is a bookkeeping calculation. It does not mean the body literally absorbs exactly 20 g of carbohydrate energy in every case. Different fibers and sugar alcohols have different physiological behavior, which is why the calculator labels net carbohydrates as a tracking value rather than a biological measurement.
            </div>
          </div>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            How to Read a Nutrition Label
          </h2>
          <p>
            For everyday carbohydrate tracking, start with the Nutrition Facts label. FDA guidance identifies total carbohydrate as the headline carbohydrate quantity and lists dietary fiber, sugars and added sugars beneath it.
          </p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-blue-900 font-semibold">
            Serving size → Total carbohydrate → Fiber → Sugars → Added sugars → Other relevant ingredients
          </div>
          <p>
            Be careful when comparing products because the serving size may differ. The FDA states that nutrition information is normally based on the labeled serving size, not necessarily the entire package.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Glycemic Index vs Glycemic Load
          </h2>
          <h3 className="text-sm font-bold text-slate-900">Glycemic Index (GI)</h3>
          <p>
            Glycemic index describes the relative effect of a carbohydrate-containing food on blood glucose under standardized testing conditions. GI is associated with a food rather than with your entire daily carbohydrate target. You can inspect values in our interactive <span className="font-semibold text-blue-700">Glycemic Index food database</span> table above. A food can therefore have a GI value while your daily diet does not have one single universally meaningful GI number.
          </p>

          <h3 className="text-sm font-bold text-slate-900 pt-2">Glycemic Load (GL)</h3>
          <p>
            Glycemic load incorporates both GI and the amount of available carbohydrate consumed. A commonly used equation is:
          </p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-blue-900 font-semibold">
            GL = GI × available carbohydrate (g) ÷ 100
          </div>
          <p>For example, suppose a food has:</p>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1 font-mono">
            <div>GI = 36</div>
            <div>Available carbohydrate = 15.8 g</div>
            <div>GL = 36 × 15.8 ÷ 100 = 5.688</div>
            <div className="font-bold text-blue-700">Rounded: GL ≈ 6</div>
          </div>
          <p>
            The calculator displays this food-level result when a food and serving are selected. When no food is selected, the calculator deliberately does not invent a daily GL number.
          </p>

          <h3 className="text-sm font-bold text-slate-900 pt-2">Why Serving Size Matters for Glycemic Load</h3>
          <p>
            GI and GL should not be confused. A food&apos;s GI describes its relative glycemic response, while GL incorporates the amount of carbohydrate in the portion.
          </p>
          <p>
            That means eating two servings rather than one can substantially increase total glycemic load even when the food&apos;s GI classification does not change. This is why the calculator links GL to the selected food and serving, rather than presenting GL as a property of your entire carbohydrate target.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            What Is a Low-Carbohydrate Diet?
          </h2>
          <p>
            “Low-carb” does not have one universally accepted numerical definition that applies to every purpose. Different dietary systems use different thresholds. Some approaches reduce carbohydrate moderately, while ketogenic diets reduce carbohydrate much more substantially to promote nutritional ketosis.
          </p>
          <p>
            The important distinction is: <strong>low-carb is a dietary pattern</strong>, not one exact medically defined carbohydrate number for every person.
          </p>
          <p>
            Your calculator allows lower-carbohydrate settings so you can model a chosen intake rather than assuming that one threshold is correct for everyone. People with diabetes, medication-related glucose concerns, kidney disease, pregnancy, eating disorders, or other medical conditions may need individualized dietary guidance rather than relying on a generic low-carb target.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            What Is a Ketogenic Diet?
          </h2>
          <p>
            A ketogenic diet is a very-low-carbohydrate dietary pattern that typically produces nutritional ketosis when carbohydrate intake is sufficiently restricted, although the exact response varies. A ketogenic approach is substantially different from simply choosing a 35–45% carbohydrate diet.
          </p>
          <p>
            If you use the calculator&apos;s low-carbohydrate or custom modes for ketogenic planning, treat the result as a mathematical carbohydrate target—not as confirmation that you are in ketosis. Ketosis is influenced by total carbohydrate intake, individual metabolism, activity, fasting status and other factors.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Carbohydrate Quality Matters
          </h2>
          <p>Counting carbohydrate grams alone does not describe the nutritional quality of a diet.</p>
          <p>
            WHO&apos;s 2023 carbohydrate guideline places substantial emphasis on carbohydrate quality, including dietary fiber and the types of foods supplying carbohydrate. WHO recommends that carbohydrate intake primarily come from foods such as whole grains, vegetables, fruits and pulses.
          </p>
          <p>This is an important distinction:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs">
            <li><strong>Carbohydrate quantity</strong> answers “how much?”</li>
            <li><strong>Carbohydrate quality</strong> helps answer “from what foods?”</li>
          </ul>
          <p>
            For example, two diets could contain the same number of carbohydrate grams while differing greatly in fiber, micronutrients, degree of processing, food volume, added sugars, satiety, and overall dietary pattern. Therefore, reaching a carbohydrate target is only one part of building a nutritionally adequate diet.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Fiber and Carbohydrate Intake
          </h2>
          <p>
            Fiber is included within total carbohydrate on U.S. Nutrition Facts labeling. The traditional U.S. Dietary Reference framework uses approximately <strong>14 g fiber per 1,000 kcal</strong> as a reference level for adults.
          </p>
          <p>
            WHO&apos;s newer carbohydrate guidance also places emphasis on dietary fiber and recommends adults consume at least 25 g/day of naturally occurring dietary fiber, alongside greater intake of whole grains, vegetables, fruits and pulses. These references should not be confused with a requirement that everyone consume precisely the same amount.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Sugar Alcohols and Net-Carb Calculations
          </h2>
          <p>
            Sugar alcohols include compounds such as erythritol, xylitol, sorbitol and maltitol. They are not physiologically identical. Some are absorbed more extensively than others, and their energy contribution and effects on blood glucose can differ. For balancing total energy intake between dietary fat and carbohydrates, use our{" "}
            <Link href="/calculators/fat-intake-calculator" className="text-blue-600 font-medium underline">
              Fat Intake Calculator
            </Link>
            .
          </p>
          <p>
            This matters because a simplistic “subtract every sugar alcohol completely” rule may not reflect the behavior of every ingredient. The calculator therefore treats sugar alcohol subtraction as part of its net-carb tracking convention, not as an exact measurement of absorbable carbohydrate. For medical carbohydrate counting, total carbohydrate on the Nutrition Facts label may be the more appropriate quantity to follow, consistent with ADA guidance.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Seven-Day Carbohydrate Cycling
          </h2>
          <p>
            Carbohydrate cycling means varying carbohydrate intake across different days rather than eating exactly the same amount every day. For example:
          </p>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">Day</th>
                  <th className="p-3">Training Demand</th>
                  <th className="p-3">Relative Carb Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50"><td className="p-3 font-semibold">Monday</td><td className="p-3">Hard training</td><td className="p-3 font-bold text-blue-600">Higher</td></tr>
                <tr className="hover:bg-slate-50"><td className="p-3 font-semibold">Tuesday</td><td className="p-3">Recovery</td><td className="p-3">Moderate</td></tr>
                <tr className="hover:bg-slate-50"><td className="p-3 font-semibold">Wednesday</td><td className="p-3">Hard training</td><td className="p-3 font-bold text-blue-600">Higher</td></tr>
                <tr className="hover:bg-slate-50"><td className="p-3 font-semibold">Thursday</td><td className="p-3">Rest</td><td className="p-3 text-slate-500">Lower</td></tr>
                <tr className="hover:bg-slate-50"><td className="p-3 font-semibold">Friday</td><td className="p-3">Hard training</td><td className="p-3 font-bold text-blue-600">Higher</td></tr>
                <tr className="hover:bg-slate-50"><td className="p-3 font-semibold">Saturday</td><td className="p-3">Long session</td><td className="p-3 font-bold text-emerald-600">Highest</td></tr>
                <tr className="hover:bg-slate-50"><td className="p-3 font-semibold">Sunday</td><td className="p-3">Recovery</td><td className="p-3">Moderate</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            The purpose is generally to align carbohydrate availability with training demands or personal preferences.
          </p>
          <p>
            Carb cycling is a planning strategy, not a requirement for fat loss or muscle gain. Evidence does not establish that carbohydrate cycling is universally superior to a consistent carbohydrate intake when total energy and nutritional adequacy are appropriately managed. The calculator&apos;s seven-day feature is therefore best used as a scheduling and planning tool.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Carbohydrates Before and After Training
          </h2>
          <p>
            For people who train regularly, carbohydrate distribution across the day can be useful:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs">
            <li><strong>Before training:</strong> A carbohydrate-containing meal or snack may provide readily available energy, especially before longer or high-intensity sessions.</li>
            <li><strong>After training:</strong> Carbohydrate contributes to restoration of muscle glycogen.</li>
            <li><strong>Between sessions:</strong> The importance of carbohydrate replacement rises when another demanding training session occurs within a relatively short period.</li>
          </ul>
          <p>
            However, the ideal amount and timing depend on training duration, intensity, total daily carbohydrate intake and the individual&apos;s tolerance. The daily target remains the bigger picture.
          </p>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Why Your Calculator Result May Differ From Someone Else&apos;s
          </h2>
          <p>
            Two people can have very different carbohydrate targets even when they appear similar. Comparing formulas on our{" "}
            <Link href="/calculators/bmr-calculator" className="text-blue-600 font-medium underline">
              BMR Calculator
            </Link>{" "}
            or measuring lean body mass with our{" "}
            <Link href="/calculators/body-fat-calculator" className="text-blue-600 font-medium underline">
              Body Fat Calculator
            </Link>{" "}
            can clarify why energy estimates diverge.
          </p>
          <p>Differences may come from:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs">
            <li>Body size and composition;</li>
            <li>Age and sex;</li>
            <li>Activity level and energy expenditure;</li>
            <li>Fitness goal and training volume;</li>
            <li>Selected BMR equation;</li>
            <li>Calorie target and carbohydrate percentage;</li>
            <li>Dietary preferences.</li>
          </ul>
          <p>
            This is why “How many carbs should I eat?” cannot be answered reliably with one universal number. The calculator is designed to make those assumptions visible rather than hiding them.
          </p>
        </section>

        {/* Section 21 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Worked Example: From Calories to Carbohydrates
          </h2>
          <p>Suppose the calculator estimates TDEE = 2,361 kcal/day and the chosen carbohydrate allocation is 50%:</p>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs font-mono">
            <div><strong>Step 1 — Calculate carbohydrate calories:</strong> 2,361 × 50% = 1,180.5 kcal</div>
            <div><strong>Step 2 — Convert carbohydrate calories to grams:</strong> 1,180.5 ÷ 4 = 295.1 g</div>
            <div><strong>Step 3 — Apply display rounding:</strong> ≈ 295 g carbohydrate/day</div>
            <div><strong>Step 4 — Calculate a tracking-style net-carb figure (with 28 g fiber):</strong> 295 − 28 = 267 g</div>
          </div>
          <p>
            So the calculator displays approximately <strong>295 g total carbohydrate</strong> and a <strong>267 g net-carb tracking value</strong>. The second figure is a dietary bookkeeping convention, not a standardized FDA nutrient measurement.
          </p>
        </section>

        {/* Section 22 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            How to Use the Carbohydrate Calculator
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-700">
            <li><strong>Enter your personal information:</strong> Enter your age, sex, height, weight, and activity level. Use the unit selector to choose U.S. or metric measurements.</li>
            <li><strong>Select your goal:</strong> Choose the mode that best describes your current objective: maintenance, weight loss, weight gain, athletic performance, endurance, low-carb, moderate-carb, high-carb, or custom target.</li>
            <li><strong>Select the BMR method:</strong> The calculator can compare different BMR equations (Mifflin-St Jeor, Katch-McArdle, Harris-Benedict, Cunningham). Because predictive equations estimate energy expenditure rather than directly measuring it, changing formulas can slightly change the resulting calorie and carbohydrate target.</li>
            <li><strong>Review carbohydrate grams:</strong> The calculator converts the energy allocation into grams using the conventional 4 kcal/g carbohydrate factor.</li>
            <li><strong>Review fiber and net carbs:</strong> Use the fiber and sugar-alcohol fields when you want a tracking-style net-carbohydrate estimate.</li>
            <li><strong>Explore GI and GL:</strong> Select a food and serving from the food database to obtain a food-specific GI and glycemic-load calculation. Without a selected food, the calculator intentionally displays GL as not calculated.</li>
            <li><strong>Review the seven-day schedule:</strong> Use carbohydrate cycling to see how a variable intake could be distributed across a week.</li>
          </ol>
        </section>

        {/* Section 23 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Carbohydrate Calculator Limitations
          </h2>
          <p>
            No carbohydrate calculator can know your exact daily carbohydrate requirement from height, weight and activity alone. Your actual needs can change with training volume, illness, changes in body weight, changes in energy expenditure, appetite, occupation, sleep, food choices, environmental conditions, training phase, and individual physiology.
          </p>
          <p>
            Likewise, a BMR or TDEE estimate is not a direct measurement of metabolic rate. The most useful approach is to treat the calculator result as a starting estimate, then compare it with real-world results. For example, someone might begin with a calculated maintenance target and then monitor body weight for several weeks. If the trend consistently moves in one direction, the practical maintenance estimate can be adjusted.
          </p>
        </section>

        {/* Section 24: References */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Sources and Authoritative References
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-700">
            <li>
              <strong>World Health Organization (WHO):</strong> <em>Carbohydrate intake for adults and children: WHO guideline (2023).</em> Emphasizes carbohydrate quality, dietary fiber density, and prioritizing carbohydrate intake from whole grains, vegetables, whole fruits, and pulses.
            </li>
            <li>
              <strong>U.S. Food and Drug Administration (FDA):</strong> <em>Daily Value on the Nutrition and Supplement Facts Labels.</em> Lists the current Nutrition Facts Daily Value for total carbohydrate at 275 g/day based on a 2,000-calorie reference diet.
            </li>
            <li>
              <strong>U.S. Food and Drug Administration (FDA):</strong> <em>Interactive Nutrition Facts Label – Total Carbohydrate.</em> Details reporting requirements for total carbohydrate, dietary fiber, total sugars, added sugars, and sugar alcohols.
            </li>
            <li>
              <strong>National Academies of Sciences, Engineering, and Medicine:</strong> <em>Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, Cholesterol, Protein, and Amino Acids.</em> Outlines the adult carbohydrate RDA of 130 g/day and the AMDR of 45–65% of daily energy.
            </li>
            <li>
              <strong>American Diabetes Association (ADA):</strong> <em>Get to Know Carbs.</em> Clarifies that “net carbs” has no legal definition and advises prioritizing total carbohydrate for clinical glycemic management.
            </li>
            <li>
              <strong>American College of Sports Medicine (ACSM) &amp; ISSN:</strong> <em>Nutrition and Athletic Performance Consensus Statements.</em> Recommends scaling athlete carbohydrate availability in grams per kilogram of body weight relative to training load.
            </li>
          </ul>
        </section>

        {/* Medical & Nutrition Disclaimer */}
        <section className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-xs uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            Medical &amp; Nutrition Disclaimer
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>Educational and planning notice:</strong> This calculator provides estimates based on mathematical formulas, calorie assumptions, activity levels and dietary conventions. It does not measure metabolism, diagnose medical conditions, or prescribe a diet. Individual carbohydrate needs can differ substantially. People with diabetes, kidney disease, pregnancy, eating disorders, gastrointestinal conditions, or other specialized nutritional needs should obtain individualized advice from a qualified healthcare professional or registered dietitian.
          </p>
        </section>
      </div>

      {/* 2. RELATED CALCULATORS MODULE */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          Related Health &amp; Nutrition Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {relatedCalculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link
                key={calc.slug}
                href={calc.slug}
                className="p-3.5 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 rounded-xl transition-all group flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-md bg-white border border-slate-200 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                      {calc.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {calc.desc}
                  </p>
                </div>
                <div className="text-[10px] font-bold text-blue-600 group-hover:underline pt-2">
                  Launch Tool →
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 3. FREQUENTLY ASKED QUESTIONS ACCORDION (24 APPROVED QUESTIONS) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {carbohydrate_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 font-sans tabular-nums text-xs font-bold shrink-0">
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default CarbohydrateContent;

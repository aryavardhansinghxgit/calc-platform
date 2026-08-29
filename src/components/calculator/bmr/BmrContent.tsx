"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  Activity,
  Scale,
  Flame,
  BookOpen,
  ShieldAlert,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { bmr_calculatorFaqs } from "@/app/calculators/bmr-calculator/faq";

export function BmrContent() {
  // All 20 approved FAQs open by default following the 401(k) standard
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: bmr_calculatorFaqs.length }, (_, i) => i))
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
    <article className="mt-8 space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed">
      {/* 1. Header & Overview Card */}
      <section className="space-y-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-200 dark:border-blue-900/50">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
              BMR Calculator – Basal Metabolic Rate, TDEE &amp; Calorie Goals
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
              Calculate Your Basal Metabolic Rate
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Basal Metabolic Rate (BMR) is an estimate of the energy your body needs to support essential physiological functions while at rest. This BMR Calculator uses established predictive equations to estimate resting energy expenditure from your age, sex, height and weight, with additional support for body-fat-based calculation through the Katch-McArdle equation.
        </p>

        <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs sm:text-sm">
          <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Use the calculator to compare:
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-6 list-disc text-slate-600 dark:text-slate-400">
            <li>Mifflin-St Jeor BMR</li>
            <li>Revised Harris-Benedict BMR</li>
            <li>Katch-McArdle BMR</li>
            <li>Estimated maintenance calories (TDEE)</li>
            <li>Activity-level calorie requirements</li>
            <li>Smart calorie targets for cutting, maintaining or bulking</li>
            <li>Lean body mass</li>
            <li>Body-fat-based calculations</li>
            <li>Protein, carbohydrate and dietary-fat targets</li>
            <li>Estimated hydration needs</li>
          </ul>
        </div>

        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The result is a prediction, not a laboratory measurement of your metabolism. Predictive equations are useful because they make individualized estimates from ordinary measurements, but their accuracy varies between individuals and populations. The original Mifflin-St Jeor research, for example, developed a resting-energy expenditure equation using indirect calorimetry measurements from 498 healthy adults.
        </p>
      </section>

      {/* 2. What Is BMR? */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Flame className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          What Is BMR?
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          BMR stands for Basal Metabolic Rate. It represents the amount of energy your body would theoretically require to maintain fundamental physiological functions under basal resting conditions.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Your body continuously uses energy for processes such as breathing, circulation, maintaining body temperature, cellular activity, nervous-system function, and organ function. BMR is therefore only one part of your total daily energy expenditure.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-xs font-mono text-center text-slate-700 dark:text-slate-300 overflow-x-auto">
          <pre className="inline-block text-left leading-tight">
{`                    TOTAL DAILY ENERGY USE
                             │
                 ┌───────────┴───────────┐
                 │                       │
                BMR                  Activity & Food
                 │                       │
        Resting energy             ┌─────┼─────┐
                                   │     │     │
                                  NEAT  EAT   TEF`}
          </pre>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">BMR:</span>
            <span className="text-slate-600 dark:text-slate-400">Resting energy requirement for vital physiological functions.</span>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">NEAT:</span>
            <span className="text-slate-600 dark:text-slate-400">Non-exercise activity thermogenesis (everyday movement, posture, chores).</span>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">EAT:</span>
            <span className="text-slate-600 dark:text-slate-400">Exercise activity thermogenesis (structured workouts, running, lifting).</span>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">TEF:</span>
            <span className="text-slate-600 dark:text-slate-400">Thermic effect of food (energy spent digesting, absorbing, and storing nutrients).</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          This is why your BMR and your daily calorie requirement are not the same thing.
        </p>
      </section>

      {/* 3. BMR vs. TDEE */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          BMR vs. TDEE
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          One of the most common mistakes when using a BMR calculator is assuming that the BMR result represents the number of calories you should eat every day. It does not.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-sky-700 dark:text-sky-400">BMR (Basal Metabolic Rate)</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Your BMR is a resting-energy estimate assuming zero movement or digestive processing.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400">TDEE (Total Daily Energy Expenditure)</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Your Total Daily Energy Expenditure accounts for your daily activity, workouts, and digestion in addition to your resting expenditure. Explore complete daily expenditure modeling in our{" "}
              <Link href="/calculators/tdee-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300">
                TDEE Calculator
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-slate-800 dark:text-slate-200 space-y-1 text-center sm:text-left">
          <div>TDEE ≈ BMR × Activity Factor</div>
          <div className="text-slate-500 dark:text-slate-400 text-[11px] font-sans pt-0.5">
            For example, using the calculator&apos;s moderately active multiplier: BMR × 1.55 = estimated maintenance calories.
          </div>
        </div>

        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The calculator therefore lets you see how the same BMR translates into different calorie requirements under different activity assumptions. The use of BMR as the foundation for estimating total energy requirements is also reflected in the FAO/WHO/UNU framework for human energy requirements.
        </p>
      </section>

      {/* 4. How This BMR Calculator Works */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          How This BMR Calculator Works
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator follows a straightforward sequence:
        </p>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Step 1: Enter Your Personal Measurements</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Enter age, biological sex, height, and body weight. The calculator supports multiple unit systems (US, Metric, Other) so you can work in the units most convenient for you.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Step 2: Choose a BMR Equation</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              You can select among several established predictive equations: Mifflin-St Jeor, Revised Harris-Benedict (1984), or Katch-McArdle.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Step 3: Select an Activity Level</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The calculator converts estimated resting expenditure into a modeled maintenance calorie requirement using its 6-tier activity multipliers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Step 4: Select a Goal</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Choose from available goal modes: aggressive cut, slow cut, maintain, slow bulk, aggressive bulk, or performance. The calculator produces an estimated calorie target associated with that goal.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Step 5: Review Body Composition and Macronutrients</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Where applicable, review lean body mass, fat mass, protein targets, carbohydrate targets, and dietary-fat targets. The result can then be exported via CSV, shared via URL, or saved locally.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Mifflin-St Jeor Equation & Worked Reference Example */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Mifflin-St Jeor Equation
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The calculator&apos;s primary BMR option is the Mifflin-St Jeor equation:
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-blue-700 dark:text-blue-300 space-y-1.5">
          <div>Men: BMR = 10W + 6.25H - 5A + 5</div>
          <div>Women: BMR = 10W + 6.25H - 5A - 161</div>
          <div className="text-slate-500 dark:text-slate-400 font-sans text-[11px] pt-1">
            where: W = body weight in kilograms, H = height in centimeters, A = age in years.
          </div>
        </div>

        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The equation was published in 1990 after being derived from data from 498 healthy adults whose resting energy expenditure was measured using indirect calorimetry.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Worked Reference Scenario
          </h4>
          <p className="text-slate-600 dark:text-slate-400">
            Suppose a male is 25 years old, weighs 160 lb (72.5748 kg), and is 70 inches (177.8 cm) tall:
          </p>
          <div className="font-mono text-[11px] text-slate-800 dark:text-slate-200 space-y-1 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <div>BMR = 10(72.5748) + 6.25(177.8) - 5(25) + 5</div>
            <div>BMR = 725.748 + 1111.25 - 125 + 5 = 1,716.998 kcal/day</div>
            <div className="font-bold text-blue-600 dark:text-blue-400">Rounded for display: 1,717 kcal/day</div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-[11px]">
            That is the exact value represented by the supplied PDF&apos;s US-unit reference scenario.
          </p>
        </div>
      </section>

      {/* 6. Why Your BMR Can Change When You Switch Units */}
      <section className="space-y-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Why Your BMR Can Change When You Switch Units
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A mathematically important detail is that unit conversion can introduce displayed differences when the entered values are rounded.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          For example: 160 lb is approximately 72.5748 kg. But entering 72.6 kg uses a slightly different number. Likewise, 70 inches = 177.8 cm, while manually entering 178 cm is not identical.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Because BMR equations use the actual numerical values, these small differences can produce a difference of one or two displayed calories. This explains why the reference PDF can show approximately 1,717 kcal, while a screenshot using explicitly entered 72.6 kg and 178 cm produces approximately 1,719 kcal. That is a rounding/input-state difference, not evidence that the equation itself has changed. The calculator therefore keeps greater numerical precision internally and rounds the final result for presentation.
        </p>
      </section>

      {/* 7. Revised Harris-Benedict & Katch-McArdle Equations */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Revised Harris-Benedict &amp; Katch-McArdle Equations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
            <h4 className="font-bold text-sm text-purple-700 dark:text-purple-400">Revised Harris-Benedict (1984)</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Published by Roza and Shizgal in 1984 and evaluated against indirect calorimetry:
            </p>
            <div className="font-mono text-[11px] text-purple-700 dark:text-purple-300 space-y-1 bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-700">
              <div>Men: BMR = 88.362 + 13.397W + 4.799H - 5.677A</div>
              <div>Women: BMR = 447.593 + 9.247W + 3.098H - 4.330A</div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
              Because the coefficients differ from Mifflin-St Jeor, the two equations produce slightly different estimates for the same person. Different models reflect different baseline datasets and methodologies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
            <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400">Katch-McArdle Equation</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Calculates expenditure strictly from Lean Body Mass (LBM), making it independent of gender:
            </p>
            <div className="font-mono text-[11px] text-emerald-700 dark:text-emerald-300 space-y-1 bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-700">
              <div>LBM = Weight × (1 - Body_Fat / 100)</div>
              <div>BMR = 370 + (21.6 × LBM_kg)</div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
              Example: Weight = 72.6 kg, Body fat = 17% → LBM = 60.26 kg → BMR ≈ 370 + (21.6 × 60.26) ≈ 1,672 kcal/day. Accurate body fat estimates from our{" "}
              <Link href="/calculators/body-fat-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
                Body Fat Calculator
              </Link>{" "}
              are critical here.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Which Formula to Use & Why Results Differ */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Which BMR Formula Should You Use &amp; Why Calculators Differ
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <strong className="text-blue-700 dark:text-blue-400 font-bold block">Mifflin-St Jeor</strong>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              A strong general-purpose choice when you know age, sex, height, and weight.
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <strong className="text-purple-700 dark:text-purple-400 font-bold block">Revised Harris-Benedict</strong>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Useful as an additional comparison using a distinct historical regression dataset.
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <strong className="text-emerald-700 dark:text-emerald-400 font-bold block">Katch-McArdle</strong>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Useful when you have a reasonably reliable estimate of body fat percentage or lean mass.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 dark:text-slate-100">Why Different BMR Calculators Give Different Answers:</h4>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
            <li><strong>Different equations:</strong> Mifflin-St Jeor and Harris-Benedict do not produce identical estimates.</li>
            <li><strong>Different unit precision:</strong> 160 lb converted exactly to kg (72.5748 kg) differs from manually entering 72.6 kg.</li>
            <li><strong>Different rounding:</strong> Some calculators round intermediate variables; others maintain full floating precision.</li>
            <li><strong>Different definitions:</strong> Some sites report BMR while others report RMR (Resting Metabolic Rate) or immediately multiply by activity.</li>
            <li><strong>Different activity models:</strong> Starting from the same BMR, different calculators apply different multipliers.</li>
          </ul>
        </div>
      </section>

      {/* 9. Activity Multipliers Table */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Understanding Activity Multipliers
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Once BMR is estimated, the calculator shows maintenance calories across physical activity tiers:
        </p>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700/60 rounded-xl">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Activity Level</th>
                <th className="p-3">Multiplier</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Sedentary</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">1.20×</td>
                <td className="p-3">Little to no structured physical exercise; desk-bound lifestyle</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Lightly Active</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">1.375×</td>
                <td className="p-3">Light exercise or occupational walking 1–3 days/week</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Moderately Active</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">1.55×</td>
                <td className="p-3">Moderate exercise or sports training 3–5 days/week</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Very Active</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">1.725×</td>
                <td className="p-3">Hard exercise or demanding physical labor 6–7 days/week</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Athlete / Intense</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">1.90×</td>
                <td className="p-3">Intense training 6–7 days/week or twice-daily sports conditioning</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Extra Active</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">2.00×</td>
                <td className="p-3">Heavy physical job combined with intense athletic training</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          These multipliers serve as estimation parameters, not laboratory measurements. If BMR = 1,700 kcal/day, then at 1.55×: 1,700 × 1.55 = 2,635 kcal/day modeled maintenance. Activity categories are approximate because people with the same nominal activity level can have very different step counts and occupations.
        </p>
      </section>

      {/* 10. Weight Loss, Weight Gain, Lean Bulk & Body Composition */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Weight Loss, Weight Gain, Lean Bulk &amp; Body Composition
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">BMR and Weight Loss</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Weight loss generally requires sustained energy intake below total expenditure (Calorie Intake &lt; TDEE). For example, TDEE = 2,600 kcal and Intake = 2,100 kcal gives a modeled 500 kcal/day deficit. Long-term weight change is dynamic rather than linear, as modeled by the NIH/NIDDK Body Weight Planner. For daily deficit planning, compare with our{" "}
              <Link href="/calculators/calorie-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
                Calorie Calculator
              </Link>
              .
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">BMR and Weight Gain</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              For weight gain, Calorie Intake &gt; TDEE (e.g. TDEE = 2,600 kcal and Intake = 2,900 kcal gives a 300 kcal/day surplus). Actual changes depend on training, appetite, activity, and recovery. A calorie target is a planning starting point rather than a guarantee.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Lean Bulk Workflow</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              A lean bulk provides enough energy to support tissue growth while controlling excess fat accumulation: <em>Estimate BMR → estimate TDEE → select a modest surplus → monitor results → adjust</em>. To establish daily protein intake, utilize our{" "}
              <Link href="/calculators/protein-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
                Protein Calculator
              </Link>
              .
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Body Composition &amp; Lean Mass</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Two people of identical body weight can have vastly different muscle, fat, bone, and water proportions. Lean body mass is estimated as LBM = Weight × (1 - BF). At 72.6 kg and 17% body fat, LBM is approximately 72.6 × 0.83 = 60.3 kg. Evaluate clinical stature with our{" "}
              <Link href="/calculators/bmi-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
                BMI Calculator
              </Link>{" "}
              and{" "}
              <Link href="/calculators/ideal-weight-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
                Ideal Weight Calculator
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* 11. BMR and Macronutrients */}
      <section className="space-y-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          BMR and Macronutrients
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The calculator&apos;s smart-goal system translates daily energy requirements into structured macronutrient targets using physiological caloric densities:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-center">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 block">Protein</span>
            <span className="text-slate-700 dark:text-slate-300">4 kcal / gram</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-amber-600 dark:text-amber-400 block">Carbohydrate</span>
            <span className="text-slate-700 dark:text-slate-300">4 kcal / gram</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-rose-600 dark:text-rose-400 block">Dietary Fat</span>
            <span className="text-slate-700 dark:text-slate-300">9 kcal / gram</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          For example: 150 g of protein provides 150 × 4 = 600 kcal, while 70 g of fat provides 70 × 9 = 630 kcal. These conversions translate a calorie target into an approximate macronutrient distribution. To customize carbohydrate, fat, and protein ratios for specific training goals, explore our{" "}
          <Link href="/calculators/macro-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
            Macro Calculator
          </Link>
          .
        </p>
      </section>

      {/* 12. Physiological Determinants: Age, Sex, Muscle & Direct Measurement */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Physiological Determinants: Age, Sex, Muscle &amp; Direct Measurement
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Why BMR Changes as You Lose Weight</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Because body mass influences resting expenditure, weight loss lowers predicted BMR. Someone who preserves considerable lean mass retains a higher resting expenditure than someone with greater lean tissue loss. Re-evaluate your calorie targets after significant weight shifts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">BMR, Age &amp; Sex</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              As age increases, equations predict lower resting expenditure due to gradual sarcopenia. For sex, Mifflin-St Jeor applies +5 for males and -161 for females, reflecting population-level differences in average skeletal muscle mass, bone density, and essential adipose tissue.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Does Muscle Increase BMR?</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Muscle contributes to resting expenditure (~6 kcal/lb/day), but internal organs (liver, brain, heart, kidneys) have far higher resting energy demands relative to mass. Adding muscle elevates BMR, but the effect is part of an integrated physiological profile rather than an enormous automatic increase.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Can You Measure BMR Directly?</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              A calculator does not directly measure metabolism. A direct measurement requires laboratory indirect calorimetry (measuring O₂ consumption and CO₂ production under strict overnight fasting conditions). A predictive calculator generates a mathematical prediction from input parameters.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1 text-xs">
          <strong className="text-slate-900 dark:text-slate-100">Why Actual Calories May Differ From Your Calculator:</strong>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Real-world maintenance intake can differ because: activity category was selected incorrectly, daily movement (NEAT) differs from assumptions, body composition differs, exercise volume fluctuates, food tracking is inaccurate, or adaptive thermogenesis occurs during prolonged dieting. Use your calculation as a starting hypothesis and calibrate against your multi-week scale trend.
          </p>
        </div>
      </section>

      {/* 13. BMR Calculator Example From the Reference */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          BMR Calculator Example From the Reference
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The supplied reference PDF uses a 25-year-old male baseline:
        </p>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700/60 rounded-xl">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Input / Metric</th>
                <th className="p-3">Reference Value</th>
                <th className="p-3">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Age &amp; Gender</td>
                <td className="p-3 font-medium">25 years (Male)</td>
                <td className="p-3">Healthy adult baseline</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Height</td>
                <td className="p-3 font-medium">178 cm (70 in = 177.8 cm)</td>
                <td className="p-3">Displayed rounded to 178 cm in report</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Weight</td>
                <td className="p-3 font-medium">160 lb (72.5748 kg)</td>
                <td className="p-3">Displayed rounded to 72.6 kg in report</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Estimated Body Fat</td>
                <td className="p-3 font-medium">17.1%</td>
                <td className="p-3">Deurenberg adult predictive formula</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Selected BMR</td>
                <td className="p-3 font-bold text-sky-600 dark:text-sky-400">1,717 kcal/day</td>
                <td className="p-3">Mifflin-St Jeor: 10(72.5748) + 6.25(177.8) - 5(25) + 5 = 1,716.998</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Maintenance TDEE</td>
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">2,661 kcal/day</td>
                <td className="p-3">Moderately Active: 1,717 × 1.55 = 2,661.35 kcal/day</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Lean Body Mass</td>
                <td className="p-3 font-bold text-rose-600 dark:text-rose-400">132.6 lb</td>
                <td className="p-3">160 lb × (1 - 0.171) = 132.64 lb (FFMI: 19)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Water Intake Target</td>
                <td className="p-3 font-medium">3.2 L (14 cups)</td>
                <td className="p-3">Hydration estimate based on body weight + moderate activity</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400">
          Notice that the exact converted weight is approximately 72.5748 kg, whereas manually entering 72.6 kg creates a slightly different mathematical input (1,718.5 → 1,719 kcal). That explains the small differences seen across views.
        </p>
      </section>

      {/* 14. How to Use & Limitations */}
      <section className="space-y-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-sans">
          How to Use the BMR Calculator Properly &amp; Limitations
        </h3>
        <div className="space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed">
          <p>
            <strong>Recommended Workflow:</strong> Start with the Mifflin-St Jeor estimate using accurate height and weight → Compare formulas (Revised Harris-Benedict and Katch-McArdle) → Estimate maintenance using your typical activity level → Select your goal (cut, maintain, bulk, performance) → Validate against multi-week scale and performance reality → Recalculate when body weight changes significantly.
          </p>
          <p>
            <strong>Calculator Limitations:</strong> A BMR calculator cannot directly observe oxygen consumption, carbon-dioxide production, spontaneous fidgeting, exact food intake, or daily endocrine fluctuations. FAO/WHO energy-requirement literature treats predictive equations as practical estimation tools rather than universal laboratory measurements.
          </p>
        </div>
      </section>

      {/* 15. 20 Accredited FAQs (All Open by Default following 401(k) Standard) */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {bmr_calculatorFaqs.map((faq, idx) => {
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 16. Scientific Interpretation Note */}
      <section className="space-y-2 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-4">
        <h4 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
          Scientific Interpretation Note
        </h4>
        <p className="leading-relaxed">
          The most important point to remember is that BMR is a model output, not a biological constant. A calculator takes measurable characteristics such as age, sex, height and body weight and transforms them through a predictive equation. That gives you a useful estimate. It does not mean your metabolism has been measured to the nearest calorie. A difference of a few calories between two sites may simply reflect different input precision or equation selection, while a larger difference comes from using a different predictive model.
        </p>
      </section>

      {/* 17. Important Health Disclaimer */}
      <section className="p-4 sm:p-5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3.5 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
        <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold block text-amber-950 dark:text-amber-100">
            Important Health Disclaimer
          </strong>
          <p className="leading-relaxed">
            This calculator is provided for educational and planning purposes only. It estimates resting energy expenditure from predictive equations and does not directly measure metabolism or diagnose medical conditions. Individual energy requirements can differ substantially from calculator estimates. People who are pregnant or breastfeeding, have a medical condition, have a history of an eating disorder, are under 18, or have specialized clinical or athletic nutrition requirements should seek individualized guidance from an appropriately qualified healthcare professional.
          </p>
        </div>
      </section>
    </article>
  );
}

export default BmrContent;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  ShieldAlert,
  BookOpen,
  Activity,
  Scale,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { tdee_calculatorFaqs } from "@/app/calculators/tdee-calculator/faq";

export function TdeeContent() {
  // All 18 FAQs open by default following the 401(k) standard
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 18 }, (_, i) => i))
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
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 space-y-8">
      {/* Header Section */}
      <section className="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-100 dark:border-blue-900/40">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
              TDEE Calculator — Maintenance Calories, BMR &amp; Weight Goals
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              Estimate Your Total Daily Energy Expenditure
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Your Total Daily Energy Expenditure (TDEE) is an estimate of how many calories your body uses over an average day. It combines the energy required to support basic physiological functions with the energy associated with daily movement, exercise, and processing food.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs sm:text-sm">
          <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            This TDEE Calculator lets you estimate:
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-6 list-disc text-slate-600 dark:text-slate-400">
            <li>BMR or resting energy expenditure</li>
            <li>Maintenance calories</li>
            <li>TDEE</li>
            <li>Estimated NEAT (daily movement)</li>
            <li>Estimated EAT (planned workouts)</li>
            <li>Estimated TEF (digestion)</li>
            <li>Calorie targets for weight loss</li>
            <li>Calorie targets for weight gain</li>
            <li>Lean-bulk and body-recomposition targets</li>
            <li>12-week weight projections</li>
            <li>Results using multiple BMR equations</li>
          </ul>
        </div>

        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The calculator also lets you adjust activity level, daily steps, and structured workouts so the result reflects more than just age, height, weight, and sex.
        </p>

        <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs text-slate-700 dark:text-slate-300">
          <p className="leading-relaxed font-medium">
            <strong>Predictive equations provide estimates, not direct measurements.</strong> Their accuracy varies by equation, population, body composition and individual characteristics, so a calculated BMR or TDEE should be treated as a starting estimate rather than an exact metabolic measurement.
          </p>
        </div>
      </section>

      {/* Section 1: What Is TDEE? */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          What Is TDEE?
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          TDEE means Total Daily Energy Expenditure. It is the estimated amount of energy your body uses during a full day.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-xs font-mono text-center text-slate-700 dark:text-slate-300 overflow-x-auto">
          <pre className="inline-block text-left leading-tight">
{`                 TDEE
                  │
        ┌─────────┼─────────┐
        │         │         │
       BMR       TEF     Activity
                           │
                     ┌─────┴─────┐
                     │           │
                    EAT         NEAT
                 Exercise    Daily movement`}
          </pre>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100">BMR:</span> Energy required for basic physiological functions at rest.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100">TEF:</span> Energy used to digest, absorb, and process food.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100">EAT:</span> Exercise activity thermogenesis, or planned exercise.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100">NEAT:</span> Non-exercise activity thermogenesis, or movement outside formal exercise.
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          NEAT can vary substantially between individuals because daily occupations, movement habits and other environmental and biological factors differ.
        </p>
      </section>

      {/* Section 2: TDEE vs BMR */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          TDEE vs BMR
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          BMR and TDEE are not the same number.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-cyan-600 dark:text-cyan-400">BMR (Basal Metabolic Rate)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              BMR is an estimate of the energy required to support essential physiological processes under resting conditions. For detailed isolated basal analysis, explore our{" "}
              <Link href="/calculators/bmr-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                BMR Calculator
              </Link>
              .
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400">TDEE (Total Daily Energy Expenditure)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              TDEE is broader because it includes activity and food-related energy expenditure in addition to resting energy expenditure.
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          For example, a person&apos;s calculator result might be: <strong>BMR: 1,740 kcal/day</strong> and <strong>TDEE: 2,797 kcal/day</strong>. The additional calories represent modeled expenditure associated with the person&apos;s activity and other components. This is why eating approximately your BMR is not the same as eating at maintenance.
        </p>
      </section>

      {/* Section 3: How This TDEE Calculator Works */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          How This TDEE Calculator Works
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator uses several defined stages:
        </p>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">1. Estimate resting energy expenditure</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Choose one of the available BMR equations. The calculator supports seven methods: Mifflin-St Jeor, Katch-McArdle, Harris-Benedict, Revised Harris-Benedict, Cunningham, Schofield, and Owen. These equations are predictive models rather than direct measurements.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">2. Apply the activity model</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Select an activity level appropriate to your typical lifestyle. The calculator uses activity multipliers as planning assumptions. They should not be interpreted as exact physiological measurements.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">3. Account for steps</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Daily steps can provide an additional estimate of non-exercise movement.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">4. Model workouts</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Structured workouts contribute to estimated EAT. The calculator uses your workout frequency, workout duration, and body weight to estimate this component.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">5. Model TEF</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The calculator uses a simplified model for the thermic effect of food. TEF varies with food composition, energy intake and individual characteristics, so the calculator&apos;s value should be interpreted as a modeled estimate rather than a direct measurement.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">6. Derive the displayed NEAT</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-mono">
              NEAT = TDEE - BMR - EAT - TEF
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Within this calculator, NEAT is presented as a residual component. This means the displayed NEAT value is calculated from the model. It is not a number measured from a wearable or laboratory test.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: TDEE Calculator Example Table */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          TDEE Calculator Example
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Use the calculator&apos;s reference scenario: Age: 25, Sex: Male, Height: 5 ft 10 in, Weight: 165 lb, Activity: Moderately Active, Daily steps: 7,500, Workouts: 4 per week, BMR equation: Mifflin-St Jeor.
        </p>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700/60 rounded-xl">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Metric</th>
                <th className="p-3">Estimate</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">BMR</td>
                <td className="p-3 font-bold text-cyan-600 dark:text-cyan-400">1,740 kcal/day</td>
                <td className="p-3">Resting basal expenditure from Mifflin-St Jeor</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">NEAT</td>
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">623 kcal/day</td>
                <td className="p-3">Modeled residual non-exercise physical activity</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">EAT</td>
                <td className="p-3 font-bold text-amber-600 dark:text-amber-400">154 kcal/day</td>
                <td className="p-3">Modeled exercise expenditure (4 sessions/wk, 45 min)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">TEF</td>
                <td className="p-3 font-bold text-purple-600 dark:text-purple-400">280 kcal/day</td>
                <td className="p-3">Thermic effect of food (~10% modeling assumption)</td>
              </tr>
              <tr className="bg-slate-100/70 dark:bg-slate-800/70 font-bold text-slate-900 dark:text-slate-100">
                <td className="p-3">Total TDEE</td>
                <td className="p-3 text-blue-600 dark:text-blue-400">2,797 kcal/day</td>
                <td className="p-3">Reconciliation: 1,740 + 623 + 154 + 280 = 2,797</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
          1,740 + 623 + 154 + 280 = 2,797
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          So the component breakdown is internally consistent with the displayed TDEE.
        </p>
      </section>

      {/* Section 5: What Is BMR? & The Seven Equations */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          What Is BMR?
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Basal Metabolic Rate (BMR) represents the energy required for basic physiological functions. These include processes such as breathing, circulation, maintaining body temperature, supporting organs, and cellular activity. When evaluating general body stature alongside BMR, our{" "}
          <Link href="/calculators/bmi-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
            BMI Calculator
          </Link>{" "}
          and{" "}
          <Link href="/calculators/ideal-weight-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
            Ideal Weight Calculator
          </Link>{" "}
          provide helpful reference points.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          In practice, many nutrition calculators use predictive equations for resting energy expenditure rather than measuring BMR directly. The Mifflin-St Jeor equation, for example, was developed from a sample of 498 healthy adults whose resting energy expenditure was measured by indirect calorimetry.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-slate-900 dark:text-slate-100 space-y-1.5">
          <div className="font-bold text-blue-600 dark:text-blue-400 font-sans">Mifflin-St Jeor Formulas:</div>
          <div>Men: BMR = 10W + 6.25H - 5A + 5</div>
          <div>Women: BMR = 10W + 6.25H - 5A - 161</div>
          <div className="text-slate-500 dark:text-slate-400 font-sans text-[11px] pt-1">
            where: W = weight in kilograms, H = height in centimeters, A = age in years.
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 italic">
          These equations are useful estimates, but prediction error varies across populations and individuals.
        </p>
      </section>

      {/* Section 6: The Seven BMR Equations */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          The Seven BMR Equations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400">Mifflin-St Jeor</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A widely used modern predictive equation for resting energy expenditure. Uses weight + height + age + sex. The original study compared the equation against indirect-calorimetry measurements in adults.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400">Katch-McArdle</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Katch-McArdle uses fat-free mass, making it particularly useful when you have a reasonably reliable body-composition estimate from our{" "}
              <Link href="/calculators/body-fat-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Body Fat Calculator
              </Link>
              .
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400">Harris-Benedict</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The original Harris-Benedict equations are historical predictive equations for basal energy expenditure.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400">Revised Harris-Benedict</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A later revision updated the original Harris-Benedict relationships using additional data.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400">Cunningham</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Cunningham is another fat-free-mass-based equation and can be useful in athletic populations where lean mass is known.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400">Schofield &amp; Owen</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Schofield:</strong> Developed from a large dataset of measured BMR values and later contributed to the FAO/WHO/UNU energy-requirement framework.<br />
              <strong>Owen:</strong> Provides another predictive approach for resting energy expenditure.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300">
          <strong className="text-slate-900 dark:text-slate-100">Why do the formulas give different results?</strong>
          <p className="mt-1 leading-relaxed text-slate-600 dark:text-slate-400">
            Because each equation was developed using different datasets, variables and modeling assumptions. There is no universal formula that will produce the exact resting expenditure of every person.
          </p>
        </div>
      </section>

      {/* Section 7: NEAT, EAT, TEF */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          NEAT, EAT, and TEF Explained
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-emerald-600 dark:text-emerald-400">What Is NEAT?</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              NEAT stands for Non-Exercise Activity Thermogenesis. It describes energy expenditure from physical activity that is not formal exercise: walking around the house, standing, commuting, shopping, household work, occupational movement, changing posture, and fidgeting. Research shows that NEAT can differ dramatically between people of similar body size. The calculator models NEAT rather than measuring it directly.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-amber-600 dark:text-amber-400">What Is EAT?</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              EAT means Exercise Activity Thermogenesis. It represents the energy associated with structured exercise: running, cycling, swimming, resistance training, sports, and planned cardio sessions. The amount of energy used during exercise depends on body size, exercise type, duration, and intensity.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-purple-600 dark:text-purple-400">What Is TEF?</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              TEF means Thermic Effect of Food. It refers to the increase in energy expenditure associated with eating, digesting, absorbing and processing nutrients. TEF varies with meal energy content and macronutrient composition. This calculator uses a simplified model rather than calculating TEF from every food you eat.
            </p>
          </div>
        </div>
      </section>

      {/* Section 8: Activity Levels & Steps */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Activity Levels and TDEE
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator provides activity multipliers such as:
        </p>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700/60 rounded-xl">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Activity</th>
                <th className="p-3">Multiplier</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Sedentary</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">1.20</td>
                <td className="p-3">Desk job, little to no deliberate exercise</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Lightly Active</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">1.375</td>
                <td className="p-3">Light exercise or occupational movement 1–3 days/week</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Moderately Active</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">1.55</td>
                <td className="p-3">Moderate exercise or sports 3–5 days/week</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Very Active</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">1.725</td>
                <td className="p-3">Hard exercise or demanding physical labor 6–7 days/week</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Competitive Athlete</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">2.10</td>
                <td className="p-3">Professional training 2+ sessions/day or heavy endurance load</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          These values are calculator estimation parameters, not measurements of an individual&apos;s actual activity expenditure. For example, two people classified as &ldquo;moderately active&rdquo; may have very different occupations, step counts, exercise routines, commuting patterns, and movement habits. Therefore, select the activity level that best represents your typical routine rather than choosing the highest category simply because you exercise several times per week.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1 text-xs">
          <strong className="text-slate-900 dark:text-slate-100">Should Steps Be Added to TDEE?</strong>
          <p className="leading-relaxed text-slate-600 dark:text-slate-400">
            Steps are one useful indicator of daily movement. Walking more generally increases physical activity, but converting a specific number of steps into an exact calorie expenditure is difficult because calorie cost depends on body weight, walking speed, stride length, terrain, duration, and individual biomechanics. This calculator therefore treats step-related expenditure as a modeled adjustment, not a laboratory measurement. Also avoid adding smartwatch &ldquo;active calories&rdquo; directly on top of a TDEE result without considering whether the activity has already been included in the calculator&apos;s assumptions.
          </p>
        </div>
      </section>

      {/* Section 9: Maintenance, Loss, Gain, Lean Bulk, Recomp */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          Maintenance Calories &amp; Goal Targets
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Maintenance Calories</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Your estimated maintenance calories are approximately equal to your modeled TDEE (e.g. 2,797 kcal/day). It is not a guarantee that your body weight will remain identical every day. Actual weight fluctuates because of water, glycogen, digestive contents, sodium, hormonal changes, and activity variations. For general daily energy planning, compare with our{" "}
              <Link href="/calculators/calorie-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Calorie Calculator
              </Link>
              .
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Calories for Weight Loss</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-mono">
              Calorie Intake &lt; TDEE &nbsp;|&nbsp; 2,797 - 2,297 = 500 kcal/day
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              That is a useful mathematical scenario. It should not be interpreted as a guarantee of a particular weekly weight-loss rate. NIDDK&apos;s weight-modeling work explains why the simple fixed-calorie approach can overpredict long-term weight loss as energy expenditure and body weight change over time.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Calories for Weight Gain</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-mono">
              Calorie Intake &gt; TDEE &nbsp;|&nbsp; 2,800 - 2,500 = 300 kcal/day
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              A moderate surplus may be useful for people deliberately trying to gain body mass, but the appropriate amount depends on the person&apos;s goals and response. For targeted macronutrient partitioning, see our{" "}
              <Link href="/calculators/macro-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Macro Calculator
              </Link>
              .
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">What Is a Lean Bulk?</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              A lean bulk generally means trying to increase body mass while limiting unnecessary fat gain: <em>Resistance training + sufficient protein + controlled calorie surplus</em>. To dial in daily amino-acid targets, reference our{" "}
              <Link href="/calculators/protein-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Protein Calculator
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1 text-xs">
          <strong className="text-slate-900 dark:text-slate-100">Body Recomposition</strong>
          <p className="leading-relaxed text-slate-600 dark:text-slate-400">
            Body recomposition refers broadly to changing body composition by reducing fat while maintaining or increasing lean mass. This is more complex than simply setting one calorie number. Results depend on training, protein intake, energy balance, sleep, recovery, starting body composition, and training experience. The calculator&apos;s recomposition target is therefore a planning estimate, not a guarantee of simultaneous fat loss and muscle gain.
          </p>
        </div>
      </section>

      {/* Section 10: 3500 Rule & 12-Week Projection */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          The 3,500-Calorie Rule &amp; 12-Week Projections
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The traditional rule says: <em>3,500 kcal ≈ 1 lb of body weight</em>. This is useful as a simple educational approximation, but it should not be treated as an immutable biological law. Weight loss changes energy expenditure and body composition over time, so the actual trajectory is not perfectly linear. NIDDK developed the Body Weight Planner specifically to model these dynamic changes, noting that simple fixed-calorie calculations can overestimate long-term weight loss.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Understanding the 12-Week Projection
          </h4>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            The calculator can show how body weight could theoretically change under a selected calorie deficit or surplus. A simple projection assumes the selected energy difference remains approximately constant (e.g. 500 kcal/day deficit over 12 weeks). The resulting line is a mathematical scenario. It does not account perfectly for changing body weight, changing resting expenditure, changing spontaneous activity, changing appetite, changes in exercise, water-weight fluctuations, or adherence.
          </p>
        </div>
      </section>

      {/* Section 11: Real-World Maintenance & Calibration */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          How to Find Your Real-World Maintenance Calories
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A practical method is to treat your TDEE calculation as a starting hypothesis:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-xs text-center">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <div className="font-bold text-blue-600 dark:text-blue-400">Step 1</div>
            <div className="text-slate-700 dark:text-slate-300 font-semibold">Calculate</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Estimate your starting TDEE</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <div className="font-bold text-blue-600 dark:text-blue-400">Step 2</div>
            <div className="text-slate-700 dark:text-slate-300 font-semibold">Set Target</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Choose a daily calorie intake</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <div className="font-bold text-blue-600 dark:text-blue-400">Step 3</div>
            <div className="text-slate-700 dark:text-slate-300 font-semibold">Consistency</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Keep intake &amp; activity steady</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <div className="font-bold text-blue-600 dark:text-blue-400">Step 4</div>
            <div className="text-slate-700 dark:text-slate-300 font-semibold">Track Trend</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Log multi-week scale weights</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <div className="font-bold text-blue-600 dark:text-blue-400">Step 5</div>
            <div className="text-slate-700 dark:text-slate-300 font-semibold">Calibrate</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Compare reality with estimate</div>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          If your weight is consistently increasing when you expected maintenance, your actual expenditure may be lower than the original estimate or your intake may be higher than recorded. If your weight is consistently decreasing, the opposite may be true. This process turns the calculator from a one-time answer into a starting point that can be calibrated against real-world observations.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1 text-xs">
          <strong className="text-slate-900 dark:text-slate-100">Why Two People Can Have Different Maintenance Calories:</strong>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Consider two people with identical age, sex, height, and weight. Their TDEE can still differ because their daily lives differ. One person might work at a desk, walk 4,000 steps, and exercise twice weekly, while another might work on their feet, walk 12,000 steps, and train five times weekly. Their resting energy expenditure may be similar, but their activity expenditure can be very different. NEAT research specifically demonstrates large differences in non-exercise activity among individuals.
          </p>
        </div>
      </section>

      {/* Section 12: Accuracy, Athletes, Limitations */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Accuracy, Athletes &amp; Limitations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Is a TDEE Calculator Accurate?</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              It can be useful without being exact. That distinction matters. A predictive equation may perform reasonably well on average while still being inaccurate for a specific person. The final TDEE estimate introduces another layer of uncertainty because activity, steps, exercise and TEF are modeled. Therefore, a good interpretation is: <em>Estimated TDEE = starting point</em>, not measured daily calorie expenditure.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">TDEE for Athletes</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Athletes can have substantially different energy requirements from sedentary people. Training load changes with sport, volume, duration, intensity, competition schedule, recovery, and body composition. An athlete calculator mode provides a useful starting range, but high-level athletes often require individualized planning. The Cunningham equation and other fat-free-mass-based methods may be particularly useful in some athletic contexts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">TDEE and Fitness Trackers</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Fitness watches and activity trackers provide estimates. A common mistake is combining TDEE calculator + smartwatch active calories + exercise calories from another calculator without checking whether the same activity has been counted more than once. The safest approach is to understand the methodology behind each number before combining them.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">TDEE and Metabolism</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Your metabolism is not a single fixed daily number. Energy expenditure changes with body size, body composition, physical activity, food intake, environmental conditions, and adaptation to changes in energy balance. That is why a TDEE number should be considered a model of average expenditure under specific assumptions, not a permanent metabolic identity.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1 text-xs">
          <strong className="text-slate-900 dark:text-slate-100">TDEE Calculator Limitations:</strong>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            This calculator is intentionally practical rather than laboratory-based. It cannot directly measure resting metabolic rate, individual NEAT, exact exercise calorie expenditure, exact thermic effect of food, or daily metabolic adaptation. A laboratory measurement such as indirect calorimetry can measure resting energy expenditure more directly, while research methods such as doubly labeled water can quantify free-living total energy expenditure. Predictive calculators trade that precision for convenience and accessibility. The calculator&apos;s value is therefore in giving you a structured, reproducible starting estimate.
          </p>
        </div>
      </section>

      {/* Section 13: Frequently Asked Questions (18 Items, All Open by Default as in 401k) */}
      <section className="pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {tdee_calculatorFaqs.map((faq, idx) => {
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

      {/* Section 14: Scientific Methodology Note */}
      <section className="space-y-2 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-4">
        <h4 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
          Scientific Methodology Note
        </h4>
        <p className="leading-relaxed">
          This calculator combines established predictive equations with practical activity assumptions. The Mifflin-St Jeor equation was derived from measured resting energy expenditure using indirect calorimetry. NEAT is a recognized component of energy expenditure and can vary substantially between people because of differences in movement and lifestyle. TEF varies with meal energy content, macronutrient composition and individual factors, so a simplified calculator must treat it as a modeled component rather than an exact measurement. For long-term weight-change modeling, NIDDK research demonstrates why a static calorie-to-weight relationship can be insufficient and why energy expenditure should be considered dynamically.
        </p>
      </section>

      {/* Section 15: Important Medical & Nutritional Disclaimer */}
      <section className="p-4 sm:p-5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3.5 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
        <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold block text-amber-950 dark:text-amber-100">
            Important Medical &amp; Nutritional Disclaimer
          </strong>
          <p className="leading-relaxed">
            This calculator is for educational and planning purposes. It estimates energy expenditure using predictive equations and activity assumptions; it does not measure metabolism or provide medical advice. Individual calorie needs can differ substantially. People with medical conditions, pregnancy, eating disorders, or specialized athletic or nutrition needs should consult a qualified healthcare professional.
          </p>
        </div>
      </section>
    </article>
  );
}

export default TdeeContent;

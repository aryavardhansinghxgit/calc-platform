"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  Flame,
  BookOpen,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles,
  Compass,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { calories_burned_calculatorFaqs } from "@/app/calculators/calories-burned-calculator/faq";

export function CaloriesBurnedContent() {
  // All 16 FAQs open by default (matching 401(k) / Healthy Weight layout pattern)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: calories_burned_calculatorFaqs.length }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <article className="mt-8 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 sm:p-8 text-zinc-800 dark:text-zinc-200 leading-relaxed text-sm sm:text-base space-y-10 divide-y divide-zinc-100 dark:divide-zinc-800">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4 pt-2">
        <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <Flame className="w-6 h-6 text-amber-500" />
          Calories Burned Calculator: Estimate Exercise Energy Expenditure
        </h2>
        <p>
          The <strong>Calories Burned Calculator</strong> estimates the energy you expend during physical activity using body weight, exercise duration or distance, and the MET value assigned to the activity. It can be used for walking, running, cycling, swimming, hiking, conditioning exercise, sports, household activities, and many other forms of movement.
        </p>
        <p>
          The calculator supports two practical ways to estimate exercise expenditure:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-zinc-700 dark:text-zinc-300">
          <li><strong>By Duration:</strong> Choose an activity, enter your body weight, and specify how long you were active.</li>
          <li><strong>By Distance:</strong> Choose an activity such as running or walking, enter distance and speed, and let the calculator derive the activity duration.</li>
        </ul>
        <p>
          The activity library is based on standardized values from the <strong>2024 Compendium of Physical Activities</strong>, which organizes physical activities by intensity using MET values. The 2024 Adult Compendium contains activity categories including walking, running, bicycling, conditioning exercise, sports, water activities, home activities, transportation, occupation, and more.
        </p>
        <p>
          The result should be interpreted as an estimate of exercise-related energy expenditure, not as a direct measurement of your metabolism. The Compendium itself notes that standard MET values were developed to standardize activity intensity and were not designed to determine the precise energy cost of an individual activity session.
        </p>
      </section>

      {/* 2. HOW THE CALCULATOR WORKS */}
      <section className="space-y-4 pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          How the Calculator Works: What Is a MET?
        </h2>
        <p>
          <strong>MET</strong> stands for <em>Metabolic Equivalent of Task</em>.
        </p>
        <p>
          In the standard Compendium framework, 1 MET corresponds to approximately <strong>3.5 mL of oxygen per kilogram of body weight per minute</strong> (3.5 mL O₂/kg/min). This provides a standardized physiological baseline to express the relative energy cost of physical activities relative to quiet rest. The Compendium provides the standardized conversion:
        </p>
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 font-sans tabular-nums font-semibold text-center text-xs sm:text-sm text-blue-700 dark:text-blue-300">
          kcal/min = [ MET × 3.5 × body weight (kg) ] / 200
        </div>
        <p>
          The calculator uses that standardized conversion together with the selected activity&apos;s MET value.
        </p>
        <p>
          A higher MET represents a higher estimated intensity. For example, the 2024 Compendium assigns different MET values to activities according to their pace, conditions, and effort. Walking entries range from very slow walking around 2.3 MET to brisk walking around 4.8 MET and very brisk uphill walking at still higher values.
        </p>
      </section>

      {/* 3. CALORIES BURNED FORMULA */}
      <section className="space-y-4 pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Calories Burned Formula
        </h2>
        <p>
          The calculator&apos;s primary energy expenditure equation is:
        </p>
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 font-sans tabular-nums font-bold text-center text-sm sm:text-base text-blue-700 dark:text-blue-300 space-y-1">
          <div>Calories Burned (kcal) = [ MET × 3.5 × Weight (kg) × Duration (min) ] / 200</div>
        </div>
        <p>
          The corresponding calorie burn rate is:
        </p>
        <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 font-sans tabular-nums font-semibold text-center text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
          Calories per Minute (kcal/min) = [ MET × 3.5 × Weight (kg) ] / 200
        </div>
        <p>
          And the hourly expenditure rate is:
        </p>
        <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 font-sans tabular-nums font-semibold text-center text-xs sm:text-sm text-purple-700 dark:text-purple-300">
          Calories per Hour (kcal/hour) = Calories per Minute × 60
        </div>
        <p>
          The calculator performs these calculations using <strong>unrounded intermediate values</strong> and rounds only when presenting the final result.
        </p>
        <p>
          That distinction is important. Rounding the calories-per-minute figure first and then multiplying that rounded number by 60 can create avoidable cascading discrepancies between the headline result, hourly rate, and exported data. The calculator therefore keeps the underlying calculation at full floating-point precision before formatting the displayed values.
        </p>
      </section>

      {/* 4. STEP-BY-STEP EXAMPLE */}
      <section className="space-y-4 pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Step-by-Step Example: Walking for 45 Minutes
        </h2>
        <p>
          Suppose you weigh <strong>160 lb</strong> (which is approximately 72.57 kg) and perform moderate walking with a MET value of <strong>3.5</strong> for <strong>45 minutes</strong>.
        </p>
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 space-y-2 text-xs sm:text-sm font-sans tabular-nums">
          <div><strong>Step 1: Calculate minute burn rate:</strong></div>
          <div className="pl-4 text-blue-700 dark:text-blue-300 font-semibold">
            kcal/min = (3.5 × 3.5 × 72.5748) / 200 = 4.4452 kcal/min ≈ 4.45 kcal/min
          </div>
          <div><strong>Step 2: Multiply by active duration:</strong></div>
          <div className="pl-4 text-blue-700 dark:text-blue-300 font-semibold">
            Total Calories = 4.4452 × 45 = 200.03 kcal ≈ 200 kcal
          </div>
          <div><strong>Step 3: Derive hourly rate:</strong></div>
          <div className="pl-4 text-purple-700 dark:text-purple-300 font-semibold">
            Hourly Rate = 4.4452 × 60 = 266.71 kcal/hour
          </div>
        </div>
        <p>
          So the calculator estimates approximately:
        </p>
        <ul className="list-disc pl-5 space-y-1 font-sans tabular-nums">
          <li><strong>Calories Burned:</strong> 200 calories</li>
          <li><strong>Burn Rate:</strong> 4.45 kcal/min</li>
          <li><strong>Hourly Rate:</strong> 266.71 kcal/hour</li>
        </ul>
        <p>
          These values correspond to the calculator&apos;s validated baseline.
        </p>
        <p>
          The example illustrates an important physiological point: calorie expenditure depends not only on the activity but also on body mass and duration. For the same MET and same amount of time, a heavier person will receive a higher estimated energy expenditure because the equation scales directly with body weight.
        </p>
      </section>

      {/* 5. DISTANCE MODE */}
      <section className="space-y-4 pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Distance Mode: How the Distance Calculator Works
        </h2>
        <p>
          Distance mode is useful when you know how far you travelled and how quickly you moved rather than the total elapsed active time.
        </p>
        <p>
          The calculator first derives duration from velocity:
        </p>
        <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 font-sans tabular-nums font-semibold text-center text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
          Duration (minutes) = [ Distance / Speed ] × 60
        </div>
        <p>
          It then applies the activity&apos;s appropriate documented MET value.
        </p>
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 space-y-2 text-xs sm:text-sm">
          <strong className="block text-zinc-900 dark:text-zinc-100 font-bold text-sm">
            Example: Running 5 Miles at 6 mph (160 lb adult)
          </strong>
          <ul className="list-disc pl-5 space-y-1 font-sans tabular-nums">
            <li><strong>Distance:</strong> 5 miles</li>
            <li><strong>Speed:</strong> 6 mph (10 min/mile pace)</li>
            <li><strong>Derived Time:</strong> (5 / 6) × 60 = 50 minutes</li>
            <li><strong>Compendium MET:</strong> Documented category at 6.0 mph = 9.8 MET</li>
            <li><strong>Minute Rate:</strong> (9.8 × 3.5 × 72.5748) / 200 = 12.4466 kcal/min ≈ 12.45 kcal/min</li>
            <li><strong>Total Calories:</strong> 12.4466 × 50 = 622.33 kcal ≈ 622 calories</li>
            <li><strong>Hourly Rate:</strong> 12.4466 × 60 = 746.79 kcal/hour</li>
          </ul>
        </div>
        <p>
          The system ensures that distance, speed, and duration remain mathematically consistent without rounding leakage.
        </p>
      </section>

      {/* 6. WHY BODY WEIGHT CHANGES THE RESULT */}
      <section className="space-y-4 pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Does Body Weight Affect Calories Burned?
        </h2>
        <p>
          <strong>Yes.</strong>
        </p>
        <p>
          Because the standard Compendium equation contains body weight directly:
        </p>
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 font-sans font-bold text-center text-xs sm:text-sm text-blue-700 dark:text-blue-300">
          Calories ∝ Body Weight
        </div>
        <p>
          Holding activity intensity (MET) and duration constant, calorie expenditure scales linearly with weight. For example, a person weighing 80 kg and a person weighing 60 kg performing the exact same activity at the same MET for the same amount of time will not receive the same estimated energy expenditure: the 80 kg individual expends 33.3% more energy because greater mechanical work is required to propel mass.
        </p>
        <p>
          The calculator allows the user to switch between US and metric units while maintaining the underlying physical equivalence. The final implementation uses:
        </p>
        <ul className="list-disc pl-5 space-y-1 font-sans tabular-nums text-xs sm:text-sm">
          <li><strong>1 lb = 0.45359237 kg</strong></li>
          <li><strong>1 mile = 1.609344 km</strong></li>
          <li><strong>1 mph = 1.609344 km/h</strong></li>
        </ul>
        <p>
          and has been rigorously verified for unit invariance.
        </p>
      </section>

      {/* 7. WHY DURATION MATTERS */}
      <section className="space-y-4 pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
          How Does Exercise Duration Affect Calories Burned?
        </h2>
        <p>
          For a fixed body weight and fixed MET value, estimated calories increase linearly with time.
        </p>
        <p>
          If an activity burns X kcal in 30 minutes, then the same physiological model produces approximately 2X kcal in 60 minutes before display rounding.
        </p>
        <p>
          This means increasing exercise duration is mathematically equivalent to extending the time over which the selected activity intensity is applied. The regression suite explicitly verifies the identity:
        </p>
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 font-sans font-bold text-center text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
          Calories(2t) = 2 × Calories(t)
        </div>
      </section>

      {/* 8. ACTIVITY MET DATABASE */}
      <section className="space-y-4 pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          2024 Compendium Activity Database
        </h2>
        <p>
          The calculator contains a searchable database of <strong>56 activities across eight categories</strong>, using standardized activity-intensity values from the 2024 Compendium.
        </p>
        <p>
          Categories include:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold">
          <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-800">🚶 Walking &amp; Hiking</div>
          <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-800">🏃 Running &amp; Jogging</div>
          <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-800">🚴 Cycling &amp; Biking</div>
          <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-800">🏊 Swimming &amp; Water</div>
          <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-800">🏋️ Conditioning &amp; Gym</div>
          <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-800">🏀 Sports &amp; Athletics</div>
          <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-800">🧹 Household &amp; Daily</div>
          <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-800">🧘 Mobility &amp; Flexibility</div>
        </div>
        <p>
          The 2024 Adult Compendium itself is substantially larger and contains 22 major activity headings, including bicycling, conditioning exercise, home activities, running, sports, walking, water activities, and others. The calculator uses an activity&apos;s specific MET value, rather than assuming that every instance of an activity has the same energy cost. This matters because pace, terrain, equipment, effort, and other conditions change the appropriate activity category.
        </p>
      </section>

      {/* 9. EXERCISE INTENSITY */}
      <section className="space-y-4 pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Exercise Intensity: What Does a Higher MET Mean?
        </h2>
        <p>
          A higher MET indicates a higher standardized intensity of physical activity.
        </p>
        <p>
          The 2024 Compendium includes activities from very light movement to highly vigorous exercise. For example, its conditioning section includes moderate calisthenics at 3.8 MET, vigorous calisthenics at 7.5 MET, and some vigorous interval activities at 11 MET or higher.
        </p>
        <p>
          A higher MET generally produces a higher estimated calorie expenditure for the same body weight and duration. However, MET should not be interpreted as a personalized metabolic measurement. Standard MET values are population-level activity classifications, and the Compendium explicitly discusses limitations in applying standard MET values to precise individual energy expenditure.
        </p>
      </section>

      {/* 10. CALORIES BURNED VS FAT LOSS */}
      <section className="space-y-4 pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Does Burning 200 Calories Mean You Lost a Certain Amount of Body Fat?
        </h2>
        <p>
          <strong>Not directly.</strong>
        </p>
        <p>
          The calculator displays an energy-equivalent estimate using the traditional 3,500-kcal-per-pound planning heuristic, but this should not be interpreted as a direct measurement of adipose tissue loss.
        </p>
        <p>
          Energy expenditure during an exercise session and actual long-term body-fat change are distinct physiological concepts. Body-weight and body-composition changes are influenced by:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
          <li>Total dietary energy intake</li>
          <li>Total daily energy expenditure (TDEE) and non-exercise activity thermogenesis (NEAT)</li>
          <li>Repeated physical training adaptations</li>
          <li>Metabolic adaptation to energy restriction</li>
          <li>Shifts in skeletal muscle versus adipose tissue</li>
          <li>Transient fluid and intramuscular glycogen fluctuations</li>
          <li>Individual endocrine and genetic physiology</li>
        </ul>
        <p>
          For this reason, the calculator labels the output as a <strong>fat-equivalent energy estimate</strong>, rather than claiming that the calculated number represents measured fat loss. To understand your overall energy balance, pair this with our{" "}
          <Link href="/calculators/tdee-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
            TDEE Calculator
          </Link>{" "}
          and monitor dietary intake with the{" "}
          <Link href="/calculators/calorie-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
            Calorie Calculator
          </Link>
          .
        </p>
      </section>

      {/* 11. WHY YOUR WATCH MAY SHOW A DIFFERENT NUMBER */}
      <section className="space-y-4 pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Why Does My Fitness Tracker Show Different Calories?
        </h2>
        <p>
          It is normal for a wearable, exercise machine, and MET-based calculator to produce different calorie estimates.
        </p>
        <p>
          The calculator applies a standardized activity-intensity model using the selected MET value, body weight, and duration. Wearable devices incorporate additional signals such as optical photoplethysmography (wrist heart rate), tri-axial motion sensors, GPS cadence, and proprietary machine-learning algorithms.
        </p>
        <p>
          Neither number should automatically be treated as an exact measurement. The Compendium itself states that standard MET values were created primarily to standardize the classification of physical activity and were not designed to determine the precise energy cost for every individual.
        </p>
        <p>
          Differences arise from:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
          <li><strong>Activity classification:</strong> The selected category may not perfectly match what you actually did.</li>
          <li><strong>Intensity:</strong> Real effort may differ from the standardized activity category.</li>
          <li><strong>Individual physiology:</strong> Heart rate response, movement economy, and muscle mass vary widely.</li>
          <li><strong>Measurement method:</strong> Wearables and MET equations use fundamentally different inputs and mathematical assumptions.</li>
        </ul>
      </section>

      {/* 12. WALKING & RUNNING DYNAMICS */}
      <section className="space-y-4 pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Calories Burned Walking vs. Running
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 space-y-2">
            <strong className="block text-zinc-900 dark:text-zinc-100 font-bold text-sm">
              Walking Dynamics
            </strong>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Walking calories depend on body weight, speed, duration, grade, and loads. The Compendium includes distinct walking entries: very slow walking (2.3 MET), moderate walking at 3.0 mph (3.5 MET), brisk walking at 3.5–3.9 mph (4.8 MET), and walking uphill with a backpack (6.0–7.5 MET). A 45-minute walk at one pace has a noticeably different estimate from a 45-minute walk at another.
            </p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 space-y-2">
            <strong className="block text-zinc-900 dark:text-zinc-100 font-bold text-sm">
              Running Dynamics
            </strong>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Running produces a substantially higher energy expenditure estimate because the center of mass is repeatedly lifted against gravity. Moderate running at 6.0 mph carries a documented MET rating of 9.8, scaling to 11.5 MET at 7.5 mph and 14.5+ MET during competitive intervals. Runners can use our{" "}
              <Link href="/calculators/pace-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Pace Calculator
              </Link>{" "}
              to convert race splits into velocity benchmarks.
            </p>
          </div>
        </div>
      </section>

      {/* 13. CYCLING, SWIMMING & OTHER ACTIVITIES */}
      <section className="space-y-4 pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Calories Burned for Cycling, Swimming and Other Activities
        </h2>
        <p>
          The same methodology applies across a broad spectrum of physical activities:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm">
          <li><strong>Cycling:</strong> Intensity varies exponentially by speed because aerodynamic drag increases quadratically with velocity. Casual cycling below 10 mph is 4.0 MET; vigorous cycling at 14–16 mph is 10.0 MET.</li>
          <li><strong>Swimming:</strong> Energy cost varies by stroke and speed. Freestyle swimming at moderate pace is 5.8 MET, while vigorous butterfly stroke exceeds 13.8 MET.</li>
          <li><strong>Conditioning Exercise:</strong> Ranges from light yoga (2.8 MET) to moderate strength training (5.0 MET) and vigorous HIIT circuits (8.0 MET).</li>
          <li><strong>Household &amp; Daily Life:</strong> Everyday tasks carry measurable metabolic costs. The 2024 Compendium includes sweeping, mopping, grocery shopping, laundry, and active childcare (2.5–4.0 MET).</li>
        </ul>
      </section>

      {/* 14. 1-HOUR CALORIE BURN TABLE */}
      <section className="space-y-4 pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
          1-Hour Calorie Burn Table: Compare by Body Weight
        </h2>
        <p>
          The calculator includes a dynamic one-hour comparison matrix that recalculates calorie expenditure for benchmark activities at four reference body weights: <strong>125 lb (57 kg)</strong>, <strong>155 lb (70 kg)</strong>, <strong>185 lb (84 kg)</strong>, and <strong>215 lb (98 kg)</strong>.
        </p>
        <p>
          The values are calculated dynamically rather than stored as static numbers, using:
        </p>
        <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 font-sans tabular-nums font-semibold text-center text-xs sm:text-sm text-blue-700 dark:text-blue-300">
          1-Hour Calories = [ 60 × MET × 3.5 × weight (kg) ] / 200
        </div>
        <p>
          This lets users see how body mass changes estimated expenditure without manually repeating the calculation.
        </p>
      </section>

      {/* 15. HOW TO USE THE CALCULATOR */}
      <section className="space-y-4 pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
          How to Use the Calculator (Step-by-Step Guide)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400 block uppercase tracking-wider text-[11px]">Step 1: Choose Units</span>
            <p className="text-zinc-600 dark:text-zinc-400">Select US Units (lbs, miles, mph) or Metric (kg, km, km/h). The system mathematically converts values preserving underlying physical equivalence.</p>
          </div>
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400 block uppercase tracking-wider text-[11px]">Step 2: Select Mode</span>
            <p className="text-zinc-600 dark:text-zinc-400">Use By Duration when you know elapsed time. Use By Distance when you know how far and fast you travelled.</p>
          </div>
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400 block uppercase tracking-wider text-[11px]">Step 3: Select Activity</span>
            <p className="text-zinc-600 dark:text-zinc-400">Choose the activity that best matches what you performed to load the standardized Compendium MET intensity rating.</p>
          </div>
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400 block uppercase tracking-wider text-[11px]">Step 4: Enter Body Weight</span>
            <p className="text-zinc-600 dark:text-zinc-400">Enter your current body weight. The formula scales expenditure directly with body mass.</p>
          </div>
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400 block uppercase tracking-wider text-[11px]">Step 5: Enter Duration/Distance</span>
            <p className="text-zinc-600 dark:text-zinc-400">For duration mode, enter hours and minutes. For distance mode, enter distance and speed.</p>
          </div>
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400 block uppercase tracking-wider text-[11px]">Step 6: Review Result</span>
            <p className="text-zinc-600 dark:text-zinc-400">Review total calories burned, minute burn rate, hourly rate, fat-equivalent energy, and dynamic comparisons.</p>
          </div>
        </div>
      </section>

      {/* 16. UNDERSTANDING THE RESULT & IMPORTANT LIMITATIONS */}
      <section className="space-y-4 pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Understanding the Result &amp; Important Limitations
        </h2>
        <p>
          The result is best understood as a standardized estimate of energy expenditure associated with the selected activity session. It does not mean that your body necessarily burned exactly that many calories, that all of the energy came from body fat, or that the number predicts exactly how much body weight will change.
        </p>
        <p>
          No general-purpose calories-burned calculator can precisely measure the individual metabolic cost of a workout. Its strength is <strong>consistency</strong>: the same activity, body weight, and duration are processed using the same documented equation. Actual expenditure can differ because of:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm">
          <li><strong>Movement economy:</strong> Biomechanical efficiency varies; seasoned athletes often expend less energy at a given speed than novices.</li>
          <li><strong>Cardiovascular fitness:</strong> Stroke volume and mitochondrial density alter relative perceived effort.</li>
          <li><strong>Terrain and environment:</strong> Incline, road surface, wind resistance, and temperature affect the metabolic cost of movement.</li>
          <li><strong>Body composition:</strong> Skeletal muscle consumes more resting oxygen than adipose tissue. To assess resting energy demand, calculate your baseline with our{" "}
            <Link href="/calculators/bmr-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              BMR Calculator
            </Link>.
          </li>
          <li><strong>Individual metabolic variation:</strong> Standard MET values assume an average resting metabolic rate of 3.5 mL O₂/kg/min, which varies across age, sex, and health status.</li>
        </ul>
      </section>

      {/* 17. CALCULATION BREAKDOWN DIAGRAM */}
      <section className="space-y-4 pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Calculation Breakdown Diagram
        </h2>
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 font-mono text-[11px] sm:text-xs overflow-x-auto text-zinc-800 dark:text-zinc-200 leading-tight">
          <pre>{`                   ACTIVITY
                      │
                      ▼
                 MET VALUE
                      │
                      │
        ┌─────────────┴─────────────┐
        │                           │
        ▼                           ▼
   BODY WEIGHT                  DURATION
     (kg)                         (min)
        │                           │
        └─────────────┬─────────────┘
                      ▼
        MET × 3.5 × Weight × Time
                      │
                      ▼
                    ÷ 200
                      │
                      ▼
              CALORIES BURNED
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
      kcal/min    kcal/hour   Energy Equivalent`}</pre>
        </div>
      </section>

      {/* 18. RESULT CONSISTENCY & REUSABLE TOOLS */}
      <section className="space-y-4 pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Result Consistency &amp; Built-In Tools
        </h2>
        <p>
          The calculator deliberately separates calculation precision from display precision. Raw metrics flow directly through the pipeline without intermediate rounding:
        </p>
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 font-mono text-center text-xs text-zinc-700 dark:text-zinc-300">
          Raw Calories → Raw kcal/min → Raw kcal/hour → Boundary Formatting → UI / Chart / PDF / CSV
        </div>
        <p>
          The calculator is designed to make your results actionable and reusable:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm">
          <li><strong>Save Scenarios:</strong> Store calculations to the interactive tray for instant comparison.</li>
          <li><strong>Restore Calculations:</strong> One-click restore re-populates all inputs without manual re-entry.</li>
          <li><strong>Copy Summary:</strong> Copy a clean, structured clinical summary to the clipboard.</li>
          <li><strong>Share URL:</strong> Share links with encoded parameters that preserve the calculation state.</li>
          <li><strong>Export CSV:</strong> Download RFC-compliant CSV data containing all raw-derived metrics.</li>
          <li><strong>Print / PDF Report:</strong> Generate a clean, high-fidelity printable assessment via browser print.</li>
        </ul>
      </section>

      {/* 19. SCIENTIFIC DISCLAIMER */}
      <section className="space-y-3 pt-6">
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            Important Health and Fitness Disclaimer
          </div>
          <p>
            This calculator provides an estimate of exercise energy expenditure using standardized MET values, body weight, and duration or distance. It does not directly measure an individual&apos;s oxygen consumption, metabolism, or exact calorie expenditure. Actual energy expenditure can vary substantially between people and exercise conditions. The energy-equivalent fat value is a planning heuristic and should not be interpreted as measured body-fat loss. This calculator is intended for educational and general fitness-planning purposes and does not constitute medical advice.
          </p>
        </div>
      </section>

      {/* 20. FAQ SECTION (16 Authoritative FAQs Matching SEO Package) */}
      <section className="pt-8">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {calories_burned_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 21. SOURCES & REFERENCES */}
      <section className="space-y-3 pt-6">
        <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Scientific Sources &amp; References
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
          <li>
            <strong>2024 Compendium of Physical Activities:</strong> The primary authoritative source for standardized activity-intensity MET values across 22 major activity headings.
          </li>
          <li>
            <strong>Compendium Unit Conversions:</strong> Formulates the standard physiological conversion: kcal/min = (MET × 3.5 × body weight in kg) / 200.
          </li>
          <li>
            <strong>Compendium Corrected METs – Adults:</strong> Explains the purpose and limitations of standard METs and discusses why standardized METs should not be interpreted as exact individual measurements.
          </li>
          <li>
            <strong>CDC Physical Activity Guidelines for Adults:</strong> Provides general guidance on physical activity intensity and cardiovascular health benchmarks.
          </li>
        </ul>
      </section>
    </article>
  );
}

export default CaloriesBurnedContent;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  Activity,
  Timer,
  Award,
  HeartPulse,
  Scale,
  Zap,
} from "lucide-react";
import { pace_calculatorFaqs } from "@/app/calculators/pace-calculator/faq";

export function PaceContent() {
  // All 20 FAQs open by default (or toggleable) like 401(k)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 20 }, (_, i) => i))
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
    <article className="text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* MAIN EDUCATIONAL BODY CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Pace Calculator – Running Pace, Speed, Race Time &amp; Training Analysis
          </h2>
          <p>
            Running pace is simply the amount of time required to cover a given distance. Most runners express it as minutes per kilometer (min/km) or minutes per mile (min/mi). Unlike speed, which is normally expressed as distance per unit of time, pace is expressed as time per unit of distance.
          </p>
          <p>
            That distinction is important when planning a run. A pace of 5:00 per kilometer means you need five minutes to cover each kilometer. The same performance corresponds to approximately 8:03 per mile, a speed of about 12 km/h, or 7.46 mph. For cross-training speed comparisons, you can evaluate your tempo with our{" "}
            <Link href="/calculators/speed-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Speed Calculator
            </Link>{" "}
            or convert course lengths with our{" "}
            <Link href="/calculators/distance-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Distance Calculator
            </Link>
            .
          </p>
          <p>
            This Pace Calculator goes beyond a basic pace conversion. It can solve for pace, time, or distance, convert between common running units, evaluate multiple segment splits, estimate finish times for standard race distances using the Riegel endurance equation, and provide age-based maximum-heart-rate estimates and training zones.
          </p>
          <p>
            The calculation engine has been independently tested across thousands of scenarios, including unit conversion, segment weighting, race prediction, heart-rate calculations, invalid-input handling, and cross-module consistency.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is Running Pace?
          </h2>
          <p>
            Running pace describes how much time it takes to travel one unit of distance. The most common forms are:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Minutes per kilometer (min/km):</strong> The international metric standard used across global athletics.</li>
            <li><strong>Minutes per mile (min/mi):</strong> The imperial standard commonly used in the United States and United Kingdom.</li>
          </ul>
          <p>
            For example, suppose you run 5 kilometers in 25 minutes:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans text-center text-sm sm:text-base font-bold text-blue-700 dark:text-blue-300">
            Pace = Time / Distance = 25 minutes / 5 km = 5:00 min/km
          </div>
          <p>
            That means, on average, you covered each kilometer in five minutes. The calculator uses the same underlying relationship when solving the other directions:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans text-center text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              Time = Distance × Pace
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans text-center text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              Distance = Time / Pace
            </div>
          </div>
          <p>
            This makes the calculator a three-way solver, rather than simply a pace converter. The production QA specifically verified all three directions and confirmed that the calculated result is reflected in the corresponding solved input field.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Use the Pace Calculator
          </h2>
          <p>
            Enter the two quantities you already know and let the calculator solve the third:
          </p>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-blue-600 dark:text-blue-400 block mb-1">To calculate pace:</strong>
              <p>Enter <strong>Distance + Total Time</strong>. For example, Distance: 5 km, Time: 25:00. Result: Pace = <strong>5:00 /km</strong> (approx. <strong>8:03 /mile</strong>).</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-blue-600 dark:text-blue-400 block mb-1">To calculate finish time:</strong>
              <p>Enter <strong>Distance + Pace</strong>. For example, Distance: 5 km, Pace: 5:00 /km. Result: Time = <strong>25:00</strong>.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-blue-600 dark:text-blue-400 block mb-1">To calculate distance:</strong>
              <p>Enter <strong>Time + Pace</strong>. For example, Time: 25:00, Pace: 5:00 /km. Result: Distance = <strong>5.000 km</strong>.</p>
            </div>
          </div>
          <p>
            The calculator does not require users to manually rearrange the formulas, and the solved field is clearly marked in the interface.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Pace Calculator Example
          </h2>
          <p>
            Consider a runner who completes a 5 km run in 25 minutes. The total running time is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans text-center text-xs sm:text-sm font-semibold">
            25 × 60 = 1,500 seconds
          </div>
          <p>
            The pace per kilometer is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans text-center text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            1,500 / 5 = 300 seconds per km = 5:00 /km
          </div>
          <p>
            Converting that pace to miles gives approximately:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans text-center text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-400">
            300 × 1.609344 = 482.8 seconds = 8:03 /mile
          </div>
          <p>
            The equivalent speed is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans text-center text-xs sm:text-sm font-semibold text-purple-700 dark:text-purple-400">
            5 km / (25/60 hr) = 12.00 km/h = 7.46 mph = 3.33 m/s
          </div>
          <p>
            The calculator&apos;s verified baseline produces 5:00/km, 8:03/mile, 12.00 km/h, 7.46 mph and 3.33 m/s.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Pace vs. Speed: What Is the Difference?
          </h2>
          <p>
            Pace and speed describe the same performance from opposite directions:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Pace answers:</strong> How long does it take me to cover one kilometer or mile?</li>
            <li><strong>Speed answers:</strong> How many kilometers or miles do I cover per hour?</li>
          </ul>
          <p>
            A faster runner has a lower numerical pace but a higher numerical speed.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Performance</th>
                  <th className="p-3">Pace</th>
                  <th className="p-3">Approx. Speed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-3 font-semibold">Easy effort</td>
                  <td className="p-3 font-sans tabular-nums">6:00 /km (9:39 /mi)</td>
                  <td className="p-3 font-sans tabular-nums">10.0 km/h (6.21 mph)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Moderate effort</td>
                  <td className="p-3 font-sans tabular-nums">5:00 /km (8:03 /mi)</td>
                  <td className="p-3 font-sans tabular-nums">12.0 km/h (7.46 mph)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Faster tempo</td>
                  <td className="p-3 font-sans tabular-nums">4:00 /km (6:26 /mi)</td>
                  <td className="p-3 font-sans tabular-nums">15.0 km/h (9.32 mph)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            When planning races, pace is often easier to use because it translates directly into split targets. A runner targeting a 25-minute 5K, for example, needs an average pace of 5:00/km.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Kilometer to Mile Pace Conversion
          </h2>
          <p>
            The exact international constant used for distance conversion is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans text-center text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
            1 mile = 1.609344 km &nbsp;&bull;&nbsp; 1 km = 0.621371 mile
          </div>
          <p>
            To convert pace per kilometer to pace per mile, multiply the seconds-per-kilometer value by 1.609344. For example:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans text-center text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300">
            5:00 /km = 300 sec/km &nbsp;&rarr;&nbsp; 300 × 1.609344 = 482.8032 sec/mile &approx; 8:03 /mile
          </div>
          <p>
            The calculator preserves the conversion relationship internally with high precision and formats the displayed answer at the output boundary.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Speed Conversion
          </h2>
          <p>
            The calculator also converts running performance into speed. Useful relationships include:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans text-center text-xs sm:text-sm font-bold">
              km/h &divide; 1.609344 = mph
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans text-center text-xs sm:text-sm font-bold">
              km/h &divide; 3.6 = m/s
            </div>
          </div>
          <p>
            For a 5:00/km pace (12 km/h):
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans text-center text-xs sm:text-sm font-semibold">
            12 km/h &divide; 1.609344 &approx; 7.46 mph &nbsp;&bull;&nbsp; 12 / 3.6 = 3.33 m/s
          </div>
          <p>
            These conversions are useful when switching between outdoor running, treadmill settings, cycling calculations, laboratory measurements, or training plans that use different units.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Running Split Calculator
          </h2>
          <p>
            A single average pace can hide what happened during a run. That is why the calculator includes a Multipoint Segment Splits mode. You can enter multiple legs of a run and calculate:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Individual segment pace</li>
            <li>Total cumulative distance</li>
            <li>Total elapsed time</li>
            <li>Overall weighted average pace</li>
            <li>Split pacing trends</li>
          </ul>
          <p>
            The calculator supports up to 12 segments. For example:
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Segment</th>
                  <th className="p-3">Distance</th>
                  <th className="p-3">Split Time</th>
                  <th className="p-3">Segment Pace</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-3 font-semibold">Leg 1</td>
                  <td className="p-3">1 km</td>
                  <td className="p-3 font-sans tabular-nums">5:00</td>
                  <td className="p-3 font-sans tabular-nums">5:00 /km</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Leg 2</td>
                  <td className="p-3">1 km</td>
                  <td className="p-3 font-sans tabular-nums">4:55</td>
                  <td className="p-3 font-sans tabular-nums">4:55 /km</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Leg 3</td>
                  <td className="p-3">1 km</td>
                  <td className="p-3 font-sans tabular-nums">4:50</td>
                  <td className="p-3 font-sans tabular-nums">4:50 /km</td>
                </tr>
                <tr className="bg-emerald-50/60 dark:bg-emerald-950/20 font-bold">
                  <td className="p-3 text-emerald-900 dark:text-emerald-300">Total</td>
                  <td className="p-3 text-emerald-900 dark:text-emerald-300">3 km</td>
                  <td className="p-3 font-sans tabular-nums text-emerald-900 dark:text-emerald-300">14:45</td>
                  <td className="p-3 font-sans tabular-nums text-emerald-900 dark:text-emerald-300">4:55 /km (7:55 /mi)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The calculator intentionally uses a time-weighted-by-distance result, rather than averaging the displayed pace numbers blindly. This matters when segments have different distances. For example, a 1 km segment completed in 4:00 and a 2 km segment completed in 12:00 give:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans text-center text-xs sm:text-sm font-semibold">
            Total = 3 km in 16:00 &nbsp;&rarr;&nbsp; 16:00 / 3 = 5:20 /km (not the unweighted average 5:00)
          </div>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Calculate Average Running Pace
          </h2>
          <p>
            For a complete run:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans text-center text-sm sm:text-base font-bold text-blue-700 dark:text-blue-300">
            Average Pace = Total Time / Total Distance
          </div>
          <p>
            The important detail is to calculate this using the total elapsed time and total distance. Do not average several pace values unless the segments are identical in distance. For equal-distance kilometer splits, an arithmetic average may happen to work. For unequal segments, it produces mathematical distortion.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Race Finish Time Predictor
          </h2>
          <p>
            The calculator includes a race prediction tool based on Peter Riegel&apos;s endurance equation. Riegel published his work on endurance and athletic performance in <em>American Scientist</em> in 1981. The equation estimates the time required at another distance based on a known performance:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans text-center text-sm sm:text-base font-bold text-blue-700 dark:text-blue-300">
            T₂ = T₁ &times; (D₂ / D₁)^1.06
          </div>
          <p>
            Where T₁ is your known race time, D₁ is your known race distance, T₂ is predicted race time, and D₂ is target race distance. The exponent 1.06 accounts for physiological fatigue over longer distances.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Distance</th>
                  <th className="p-3">Predicted Finish Time</th>
                  <th className="p-3">Required Pace (/km)</th>
                  <th className="p-3">Required Pace (/mile)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                <tr>
                  <td className="p-3 font-semibold font-sans">5K</td>
                  <td className="p-3 font-bold text-blue-600 dark:text-blue-400">25:00</td>
                  <td className="p-3">5:00 /km</td>
                  <td className="p-3">8:03 /mi</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold font-sans">10K</td>
                  <td className="p-3 font-bold text-blue-600 dark:text-blue-400">52:07</td>
                  <td className="p-3">5:13 /km</td>
                  <td className="p-3">8:23 /mi</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold font-sans">Half Marathon (13.1 mi)</td>
                  <td className="p-3 font-bold text-blue-600 dark:text-blue-400">1:55:00</td>
                  <td className="p-3">5:27 /km</td>
                  <td className="p-3">8:46 /mi</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold font-sans">Marathon (26.2 mi)</td>
                  <td className="p-3 font-bold text-blue-600 dark:text-blue-400">3:59:47</td>
                  <td className="p-3">5:41 /km</td>
                  <td className="p-3">9:09 /mi</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            <strong>Important limitation:</strong> A race prediction is not a guarantee of future performance. Riegel&apos;s equation is an empirical endurance model that does not explicitly account for weekly training volume, terrain, elevation, temperature, wind, fueling, hydration, or pacing strategy.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Your 5K Pace Cannot Simply Be Used as Marathon Pace
          </h2>
          <p>
            Running performance is distance-dependent. A runner can maintain a much faster pace over 5 km than over 42.195 km because muscular and systemic fatigue accumulates as race duration increases. Training plans therefore use different intensities for different purposes.
          </p>
          <p>
            Race-specific pace, tempo work, intervals and easy running are not interchangeable. Coaching guidance commonly emphasizes adjusting pace according to the purpose and duration of the workout rather than treating one pace as appropriate for every run. That is why the calculator&apos;s race predictor applies an endurance-adjustment exponent rather than multiplying your 5K pace linearly. To balance calorie expenditure across these distances, check our{" "}
            <Link href="/calculators/calories-burned-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calories Burned Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Running by Pace, Heart Rate or Effort?
          </h2>
          <p>
            Pace is useful, but it is not the only way to judge running intensity. Your pace can change even when your physiological effort does not. Heat, humidity, hills, wind, fatigue and hydration can all influence how difficult a given pace feels. A practical approach is to treat these three measures as complementary:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-blue-600 dark:text-blue-400 block mb-1">Pace</strong>
              <p className="text-xs">Tells you what you are mechanically doing on the road or track.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">Heart Rate</strong>
              <p className="text-xs">Gives you real-time internal cardiovascular and physiological feedback.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-purple-600 dark:text-purple-400 block mb-1">Perceived Effort</strong>
              <p className="text-xs">Tells you how the workout actually feels relative to recovery status.</p>
            </div>
          </div>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Heart Rate Zones Calculator
          </h2>
          <p>
            The calculator includes age-based heart-rate estimates using two commonly referenced formulas. For targeted cardiovascular conditioning protocols, compare with our{" "}
            <Link href="/calculators/target-heart-rate-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Target Heart Rate Calculator
            </Link>
            .
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-blue-600 dark:text-blue-400 block mb-1">Fox Formula (Baseline)</strong>
              <p className="font-sans font-bold">HRmax = 220 &minus; Age</p>
              <p className="text-xs text-slate-500 mt-1">For age 30: 220 &minus; 30 = 190 bpm</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-blue-600 dark:text-blue-400 block mb-1">Tanaka Formula (Clinical)</strong>
              <p className="font-sans font-bold">HRmax = 208 &minus; 0.7 &times; Age</p>
              <p className="text-xs text-slate-500 mt-1">For age 30: 208 &minus; 21 = 187 bpm</p>
            </div>
          </div>
          <p>
            The calculator uses percentage bands to display five training zones (based on Age 30 Fox baseline of 190 bpm):
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Zone</th>
                  <th className="p-3">Intensity</th>
                  <th className="p-3">Estimated Range</th>
                  <th className="p-3">Primary Training Benefit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-3 font-semibold text-sky-600 dark:text-sky-400">Zone 1</td>
                  <td className="p-3">50&ndash;60%</td>
                  <td className="p-3 font-sans tabular-nums font-bold">95&ndash;114 bpm</td>
                  <td className="p-3">Active recovery, warm-up, baseline fat oxidation</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">Zone 2</td>
                  <td className="p-3">60&ndash;70%</td>
                  <td className="p-3 font-sans tabular-nums font-bold">114&ndash;133 bpm</td>
                  <td className="p-3">Mitochondrial density, base endurance, lipid metabolism</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-green-600 dark:text-green-400">Zone 3</td>
                  <td className="p-3">70&ndash;80%</td>
                  <td className="p-3 font-sans tabular-nums font-bold">133&ndash;152 bpm</td>
                  <td className="p-3">Aerobic power, tempo capacity, glycogen efficiency</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-amber-600 dark:text-amber-400">Zone 4</td>
                  <td className="p-3">80&ndash;90%</td>
                  <td className="p-3 font-sans tabular-nums font-bold">152&ndash;171 bpm</td>
                  <td className="p-3">Lactate threshold, sustained hard effort (10K pace)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-rose-600 dark:text-rose-400">Zone 5</td>
                  <td className="p-3">90&ndash;100%</td>
                  <td className="p-3 font-sans tabular-nums font-bold">171&ndash;190 bpm</td>
                  <td className="p-3">VO2 Max, neuromuscular speed, sprint intervals</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Fox vs. Tanaka Maximum Heart Rate
          </h2>
          <p>
            The two formulas can produce different estimates for the same person. At age 30, Fox yields 190 bpm while Tanaka yields 187 bpm. Neither result should automatically be treated as the person&apos;s true physiological maximum. Actual maximum heart rate varies considerably between individuals, and age-based formulas have prediction error.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is a Good Running Pace?
          </h2>
          <p>
            There is no universal &ldquo;good&rdquo; running pace. A 6:00/km pace could be very easy for an experienced runner, a normal training pace for another, or close to maximum sustainable effort for a beginner. Your appropriate pace depends on fitness, race distance, training history, terrain, weather, recovery, age, and current goals.
          </p>
          <p>
            A useful pace is therefore not the fastest number you can run once; it is the pace that matches the purpose of the workout. For overall health and body composition tracking, pair your training with our{" "}
            <Link href="/calculators/bmi-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              BMI Calculator
            </Link>{" "}
            and daily{" "}
            <Link href="/calculators/calorie-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calorie Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Use the Calculator for Race Training
          </h2>
          <p>
            A practical training workflow includes six steps:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>Start with a recent performance:</strong> Use a recent, representative race or time trial.</li>
            <li><strong>Calculate your average pace:</strong> Enter distance and finish time.</li>
            <li><strong>Convert the result:</strong> View your equivalent min/km, min/mile, km/h, mph, and m/s.</li>
            <li><strong>Review race projections:</strong> Use the Riegel predictor to get model-based estimates for 5K, 10K, half marathon, and marathon distances.</li>
            <li><strong>Compare your actual splits:</strong> Use Segment Splits to determine whether you started too quickly, slowed progressively, or finished faster.</li>
            <li><strong>Use heart rate as additional context:</strong> The HR zones provide an age-based training reference, complementing perceived effort.</li>
          </ol>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Negative Splits and Pacing Strategy
          </h2>
          <p>
            A runner does not have to maintain exactly the same pace throughout a race. A 10 km race might contain slower opening kilometers, steady middle kilometers, and faster finishing kilometers. Comparing even pacing (5:00 / 5:00 / 5:00) with progressive pacing (5:10 / 5:00 / 4:50) shows that both may produce the same average pace, but the split pattern is completely different. That distinction matters when analyzing race execution and lactate threshold management.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Conditions Matter More Than the Calculator Suggests
          </h2>
          <p>
            A pace calculator performs mathematical calculations from the inputs you provide. It cannot know whether you are running into a headwind, uphill, in extreme heat, on a technical trail, or while fatigued. Coaching guidance emphasizes pace ranges and adjustments for weather, terrain, and fueling rather than treating one number as an inflexible pass/fail target.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Pace Calculator Accuracy and Validation
          </h2>
          <p>
            The calculator&apos;s mathematical engine has been tested beyond a handful of examples. The production regression suite verified:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>95/95 end-to-end checks passed</li>
            <li>3,200 randomized scenarios</li>
            <li>500 pace scenarios &bull; 500 time/distance solver scenarios &bull; 500 conversion scenarios</li>
            <li>500 segment scenarios &bull; 500 Riegel scenarios &bull; 300 heart-rate scenarios</li>
            <li>300 cross-module invariants &bull; 300 export/state scenarios</li>
          </ul>
          <p>
            The test suite also verified that invalid zero or negative inputs produce controlled states instead of artificial extreme outputs, while valid ultra-endurance values remain supported.
          </p>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Final Takeaway
          </h2>
          <p>
            A good pace calculator should do more than tell you that 5 km in 25 minutes equals 5:00/km. It should help you understand the entire performance:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-sans text-center text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-300">
            Distance &rarr; Time &rarr; Pace &rarr; Speed &rarr; Splits &rarr; Race Projection &rarr; Training Intensity
          </div>
          <p>
            Treat calculated numbers as decision-support tools, not guarantees. A mathematically correct pace can still be the wrong training target for a particular day.
          </p>
        </section>

        {/* Section 21: Methodology & Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Calculation Methodology &amp; Athletic Disclaimer
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Calculation Methodology
              </div>
              <p>
                Core methodology: Running pace is evaluated by dividing elapsed time by distance in meters, converted to min/km and min/mile using exact standards (1 mile = 1,609.344 meters). Segment splits use time-weighted distance aggregation. Race projections use Peter Riegel&apos;s endurance model with a verified 1.06 exponent. Heart rate zones use Fox (220 &minus; Age) and Tanaka (208 &minus; 0.7 &times; Age) equations.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Athletic &amp; Sports Physiology Disclaimer
              </div>
              <p>
                This calculator is an educational and training resource, not medical advice or a cardiovascular diagnosis. Age-predicted heart rate equations carry standard individual estimation errors of approximately 10&ndash;12 bpm. Consult a qualified physician or certified endurance coach before undertaking intense interval programs or high-intensity Zone 5 training protocols.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 20 APPROVED FAQs SECTION (Styled like 401(k) calculator) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {pace_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
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

export default PaceContent;

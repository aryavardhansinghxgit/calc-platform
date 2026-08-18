"use client";

import React from "react";
import Link from "next/link";

export function TimeContent() {
  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-6 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. INTRODUCTION */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          How the Time & Duration Calculator Works
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The Time Calculator performs multi-unit arithmetic on time values (days, hours, minutes, and seconds). It allows you to:
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Add or Subtract Two Time Values:</strong> Combine or find the difference between two durations with automatic sexagesimal (base-60) rollover.</li>
          <li><strong>Shift a Date by Time:</strong> Add or subtract days, hours, minutes, and seconds from a specific calendar date and timestamp.</li>
          <li><strong>Evaluate Free-Text Expressions:</strong> Solve multi-term time strings such as <code>1d 4h 30m + 2.5h - 45s</code> instantly.</li>
          <li><strong>Track Work Duration:</strong> Calculate elapsed hours between clock-in and clock-out with unpaid lunch breaks and gross earnings.</li>
        </ol>
      </div>

      {/* 2. THE CONCEPTS & PHYSICS OF TIME */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          The Philosophy & Physics of Time
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div>
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Ancient Greek Philosophy (Aristotle)
            </span>
            <p>
              Aristotle (384–322 BC) defined time as <em>"a number of movement in respect of the before and after."</em> In Aristotle's view, time is not an independent entity, but a continuous measurement of change and motion in the physical universe.
            </p>
          </div>

          <div>
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Newton's Absolute Time vs. Leibniz's Relational Time
            </span>
            <p>
              In his 1687 <em>Principia</em>, Sir Isaac Newton proposed <strong>Absolute Time</strong>: a uniform, universal backdrop that flows equably without relation to anything external. In contrast, Gottfried Wilhelm Leibniz argued for <strong>Relational Time</strong>: time is merely an order of succession between events, having no standalone existence without physical objects and interactions.
            </p>
          </div>

          <div>
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Einstein's Spacetime & General Relativity
            </span>
            <p>
              Albert Einstein unified space and time into a four-dimensional continuum known as <strong>spacetime</strong>. According to Special Relativity, the speed of light (<em>c</em>) is constant for all observers, meaning time passes slower for objects moving at high velocity (time dilation). In General Relativity, mass and gravity warp spacetime: clocks tick slower in stronger gravitational fields (gravitational time dilation), a phenomenon that GPS satellites must mathematically correct for daily.
            </p>
          </div>
        </div>
      </div>

      {/* 3. HOW WE MEASURE TIME: THE SEXAGESIMAL (BASE-60) SYSTEM */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Why 60 Seconds in a Minute? (The Sexagesimal System)
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Unlike our base-10 decimal currency and metric systems, time is measured in <strong>base-60 (sexagesimal)</strong>, an ancient counting system developed by the Sumerians (3rd millennium BC) and refined by the Babylonians.
        </p>
        <p className="text-slate-600 dark:text-slate-300 mt-2 text-xs sm:text-sm">
          <strong>The Mathematical Advantage of 60:</strong> 60 is a <em>superior highly composite number</em>. It has 12 distinct divisors: <code>1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60</code>. This makes 60 exceptionally easy to divide into halves (30m), thirds (20m), quarters (15m), fifths (12m), sixths (10m), tenths (6m), and twelfths (5m) without recurring fractions.
        </p>
      </div>

      {/* 4. EVOLUTION OF TIMEKEEPING INSTRUMENTS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          From Sundials to Atomic Clocks
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Sundials & Clepsydras (Ancient World):</strong> The Egyptians divided daylight into 12 parts using shadow sundials and tracked night hours with star decans. Clepsydras (water clocks) measured time by the steady drip of water through a calibrated orifice.</li>
          <li><strong>Mechanical Pendulum Clocks (1656):</strong> Dutch scientist Christiaan Huygens invented the pendulum clock, reducing clock errors from ~15 minutes per day to under 10 seconds per day.</li>
          <li><strong>Cesium-133 Atomic Clocks (Modern Standard):</strong> In 1967, the International System of Units (SI) redefined the second as exactly <strong>9,192,631,770 periods of radiation</strong> corresponding to the transition between two hyperfine levels of the ground state of the Cesium-133 atom.</li>
        </ul>
      </div>

      {/* 5. TIME UNITS CONVERSION REFERENCE TABLE */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Standard Units of Time Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Unit</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Definition / Relationship</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Total Seconds</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2 px-2.5 font-medium">Millennium</td>
                <td className="py-2 px-2.5">1,000 years</td>
                <td className="py-2 px-2.5 font-mono">31,556,952,000 s</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Century</td>
                <td className="py-2 px-2.5">100 years</td>
                <td className="py-2 px-2.5 font-mono">3,155,695,200 s</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Year (Mean Solar)</td>
                <td className="py-2 px-2.5">365.2425 days / 12 months</td>
                <td className="py-2 px-2.5 font-mono">31,556,952 s</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Week</td>
                <td className="py-2 px-2.5">7 days</td>
                <td className="py-2 px-2.5 font-mono">604,800 s</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Day</td>
                <td className="py-2 px-2.5">24 hours / 1,440 minutes</td>
                <td className="py-2 px-2.5 font-mono">86,400 s</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Hour</td>
                <td className="py-2 px-2.5">60 minutes / 3,600 seconds</td>
                <td className="py-2 px-2.5 font-mono">3,600 s</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Minute</td>
                <td className="py-2 px-2.5">60 seconds</td>
                <td className="py-2 px-2.5 font-mono">60 s</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Second</td>
                <td className="py-2 px-2.5">SI Base Unit of Time</td>
                <td className="py-2 px-2.5 font-mono">1 s</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Millisecond</td>
                <td className="py-2 px-2.5">10⁻³ second (1/1,000 s)</td>
                <td className="py-2 px-2.5 font-mono">0.001 s</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. STEP-BY-STEP WORKED EXAMPLES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          Worked Calculation Examples
        </h2>
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Example 1: Adding Time Durations (Sexagesimal Rollover)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Calculate: <strong>(4 hours, 45 minutes, 50 seconds) + (3 hours, 25 minutes, 30 seconds)</strong>
            </p>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              • Seconds: 50 + 30 = 80s → 1 minute and 20 seconds.<br />
              • Minutes: 45 + 25 + 1 (carried) = 71m → 1 hour and 11 minutes.<br />
              • Hours: 4 + 3 + 1 (carried) = 8 hours.<br />
              → <strong>Result: 8 hours, 11 minutes, 20 seconds</strong> (8.1889 decimal hours).
            </p>
          </div>

          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Example 2: Subtracting Time with Borrowing
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Calculate: <strong>(5 hours, 15 minutes, 10 seconds) - (2 hours, 40 minutes, 35 seconds)</strong>
            </p>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              • Seconds: 10 is smaller than 35. Borrow 1 minute (60s): (10 + 60) - 35 = 35 seconds.<br />
              • Minutes: Remaining 14 is smaller than 40. Borrow 1 hour (60m): (14 + 60) - 40 = 34 minutes.<br />
              • Hours: (5 - 1) - 2 = 2 hours.<br />
              → <strong>Result: 2 hours, 34 minutes, 35 seconds</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 7. COMMON MISTAKES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Common Mistakes When Calculating Time
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Confusing Decimal Hours with Minutes:</strong> <code>4.5 hours</code> equals 4 hours and 30 minutes, not 4 hours and 50 minutes. To convert decimal minutes to regular minutes, multiply the decimal fraction by 60 (e.g. 0.75 × 60 = 45 minutes).</li>
          <li><strong>Overnight Midnight Crossing:</strong> When a work shift starts at 10:00 PM (22:00) and ends at 6:00 AM (06:00), simple subtraction (6 - 22 = -16) fails. Adding 24 hours to the end time (6 + 24 = 30; 30 - 22 = 8 hours) yields the correct overnight duration.</li>
          <li><strong>12-Hour vs. 24-Hour (Military) Misinterpretation:</strong> 12:00 AM represents midnight (00:00), while 12:00 PM represents noon (12:00).</li>
        </ul>
      </div>

      {/* 8. RELATED CALCULATORS */}
      <div className="pt-6">
        <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2">
          Related Calculators
        </h2>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-semibold">
          <Link
            href="/calculators/date-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Date Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/age-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Age Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/time-duration-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Time Duration Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/hours-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Hours Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/day-counter-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Day Counter Calculator
          </Link>
        </div>
      </div>
    </article>
  );
}

export default TimeContent;

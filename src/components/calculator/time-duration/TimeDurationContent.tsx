"use client";

import React from "react";
import Link from "next/link";

export function TimeDurationContent() {
  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-6 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. INTRODUCTION */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          How to Calculate the Duration Between Two Times
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Calculating the exact time elapsed between two timestamps requires sexagesimal (base-60) subtraction. This guide explains how to convert times into 24-hour notation, apply the 60-minute borrow method when starting minutes exceed ending minutes, and convert final durations into decimal hours and total seconds.
        </p>
        <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Who uses it:</strong> Project managers, athletes and coaches, audio/video editors, lab researchers, and pilots.</li>
          <li><strong>What it calculates:</strong> Elapsed hours, minutes, seconds, decimal hours, total minutes, and cross-date intervals.</li>
          <li><strong>Core principle:</strong> Because 1 hour equals 60 minutes (and 1 minute equals 60 seconds), standard base-10 subtraction cannot be used directly without borrowing in increments of 60.</li>
        </ul>
      </div>

      {/* 2. THE THREE-STEP MANUAL CALCULATION METHOD */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          The 3-Step Manual Duration Formula
        </h2>
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          
          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Step 1: Convert Both Times to 24-Hour Military Format
            </span>
            <p>
              • AM hours (00:00 to 11:59) remain unchanged, except 12:00 AM becomes <code>00:00</code>.<br />
              • PM hours (12:00 PM to 11:59 PM): 12:00 PM stays <code>12:00</code>, and 1:00 PM to 11:00 PM have 12 added to the hour (e.g., 1:00 PM = <code>13:00</code>, 5:30 PM = <code>17:30</code>).
            </p>
          </div>

          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Step 2: Compare Minutes & Apply Sexagesimal Borrowing
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Case A: Ending Minutes ≥ Starting Minutes</span>
                <p className="text-slate-600 dark:text-slate-300 mb-2">Subtract minutes from minutes and hours from hours directly:</p>
                <div className="font-mono text-xs bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                  &nbsp;&nbsp;13:57<br />
                  - 09:22<br />
                  -------<br />
                  &nbsp;&nbsp;04:35 (4 hours, 35 mins)
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Case B: Starting Minutes &gt; Ending Minutes</span>
                <p className="text-slate-600 dark:text-slate-300 mb-2">Borrow 1 hour (60 minutes) from ending hours before subtracting:</p>
                <div className="font-mono text-xs bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                  &nbsp;&nbsp;13:57 &nbsp;→ &nbsp;12:117<br />
                  - 09:58 &nbsp;→ - 09:58<br />
                  ------- &nbsp; &nbsp; -------<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;03:59 (3 hours, 59 mins)
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Step 3: Handle Midnight Rollover
            </span>
            <p>
              If the ending time is on the following day (e.g., 10:30 PM to 6:15 AM), add 24 hours to the ending time before subtracting (e.g., 6:15 AM + 24h = 30:15 → 30:15 - 22:30 = 29:75 - 22:30 = 7 hours and 45 minutes).
            </p>
          </div>
        </div>
      </div>

      {/* 3. REFERENCE LOOKUP TABLE: COMMON TIME INTERVALS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Time Duration Conversion Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Unit Interval</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Total Hours</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Total Minutes</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Total Seconds</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2 px-2.5 font-medium">1 Hour</td>
                <td className="py-2 px-2.5 font-mono text-blue-600 dark:text-blue-400">1.0 hr</td>
                <td className="py-2 px-2.5 font-mono">60 min</td>
                <td className="py-2 px-2.5 font-mono">3,600 s</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">1 Day (24 hrs)</td>
                <td className="py-2 px-2.5 font-mono text-blue-600 dark:text-blue-400">24.0 hrs</td>
                <td className="py-2 px-2.5 font-mono">1,440 min</td>
                <td className="py-2 px-2.5 font-mono">86,400 s</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">1 Week (7 days)</td>
                <td className="py-2 px-2.5 font-mono text-blue-600 dark:text-blue-400">168.0 hrs</td>
                <td className="py-2 px-2.5 font-mono">10,080 min</td>
                <td className="py-2 px-2.5 font-mono">604,800 s</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">30-Day Month</td>
                <td className="py-2 px-2.5 font-mono text-blue-600 dark:text-blue-400">720.0 hrs</td>
                <td className="py-2 px-2.5 font-mono">43,200 min</td>
                <td className="py-2 px-2.5 font-mono">2,592,000 s</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">365-Day Solar Year</td>
                <td className="py-2 px-2.5 font-mono text-indigo-600 dark:text-indigo-400 font-bold">8,760.0 hrs</td>
                <td className="py-2 px-2.5 font-mono">525,600 min</td>
                <td className="py-2 px-2.5 font-mono">31,536,000 s</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. WORKED EXAMPLES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          Worked Calculation Examples
        </h2>
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Example 1: Complex Borrowing with Hours, Minutes & Seconds
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Start Time: <strong>08:45:50 AM</strong> | End Time: <strong>02:15:20 PM</strong>
            </p>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              • Convert End Time to 24-hour: 14:15:20.<br />
              • Borrow 1 minute for seconds: 14:14:80.<br />
              • Borrow 1 hour for minutes: 13:74:80.<br />
              • Subtract Start: 13:74:80 - 08:45:50 = <strong>5 hours, 29 minutes, and 30 seconds (5.4917 decimal hours)</strong>.
            </p>
          </div>

          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Example 2: Cross-Date Flight Duration
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Departure: <strong>Oct 12, 10:30 PM</strong> | Arrival: <strong>Oct 14, 06:15 AM</strong>
            </p>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              • Total elapsed calendar days: 1 full day (Oct 13 = 24h).<br />
              • Remaining from Oct 12: 1.5 hours.<br />
              • Elapsed into Oct 14: 6.25 hours.<br />
              → <strong>Total Elapsed Duration: 1 day, 7 hours, 45 minutes (31.75 hours)</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 5. COMMON MISTAKES TO AVOID */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Common Mistakes in Time Duration Math
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Decimal minutes confusion:</strong> <code>7.5 hours</code> equals 7 hours and 30 minutes, not 7 hours and 50 minutes.</li>
          <li><strong>Base-10 subtraction errors:</strong> Subtracting <code>:50</code> from <code>:20</code> by writing <code>-30</code> instead of borrowing 60 minutes to make <code>80 - 50 = 30 minutes</code>.</li>
          <li><strong>Overnight midnight subtraction:</strong> Forgetting to add 24 hours to overnight end times, producing invalid negative results.</li>
        </ul>
      </div>

      {/* 6. RELATED CALCULATORS */}
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
            href="/calculators/time-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Time Calculator
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
            href="/calculators/time-card-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Time Card Calculator
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

export default TimeDurationContent;

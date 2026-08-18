"use client";

import React from "react";
import Link from "next/link";

export function HoursContent() {
  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-6 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. INTRODUCTION */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          How the Hours Calculator Works
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The Hours Calculator finds the exact elapsed hours and minutes between two timestamps. An hour is defined as 60 minutes (3,600 seconds), and there are 24 hours in a standard solar day. This tool helps you:
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Calculate Intraday Hours:</strong> Find total working hours between clock-in and clock-out with unpaid break deductions.</li>
          <li><strong>Track Multi-Day Durations:</strong> Determine total hours across several days, weeks, or calendar dates.</li>
          <li><strong>Compute Overtime & Pay:</strong> Separate regular hours from overtime hours (over 8h/day) and estimate gross payroll earnings.</li>
        </ol>
      </div>

      {/* 2. 12-HOUR VS 24-HOUR CLOCK SYSTEMS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          12-Hour vs. 24-Hour (Military) Clock Systems
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div>
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              12-Hour Clock (AM / PM)
            </span>
            <p>
              The 12-hour clock divides the 24-hour day into two 12-hour periods:
              <br />
              • <strong>AM (Ante Meridiem):</strong> Latin for <em>"before midday"</em>, running from 12:00 midnight to 11:59 in the morning.
              <br />
              • <strong>PM (Post Meridiem):</strong> Latin for <em>"after noon"</em>, running from 12:00 noon to 11:59 at night.
              <br />
              <em>Convention note:</em> 12:00 AM denotes midnight (the start of the day), and 12:00 PM denotes noon (midday).
            </p>
          </div>

          <div>
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              24-Hour Clock (Military & International Standard)
            </span>
            <p>
              The 24-hour clock (ISO 8601 standard) uses the continuous numbers <code>00:00</code> to <code>23:59</code>, where <code>00:00</code> is midnight. Hours 00 to 11 match 12-hour AM times, while hours 12 to 23 represent PM times (e.g., 17:30 = 5:30 PM). This completely eliminates AM/PM ambiguity and is standard in aviation, healthcare, computing, and military operations.
            </p>
          </div>
        </div>
      </div>

      {/* 3. EXPLICIT REFERENCE TABLE: HOURS IN DIFFERENT TIME PERIODS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Hours in Different Time Periods Reference Table
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-3 text-xs sm:text-sm">
          Exact hour counts across standard calendar intervals:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Time Interval</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Total Hours</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Notes / Basis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2 px-2.5 font-medium">Hours in a Day</td>
                <td className="py-2 px-2.5 font-bold text-blue-600 dark:text-blue-400">24 hrs</td>
                <td className="py-2 px-2.5">1 full earth rotation (1,440 minutes)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Hours in a Week</td>
                <td className="py-2 px-2.5 font-bold text-blue-600 dark:text-blue-400">168 hrs</td>
                <td className="py-2 px-2.5">7 days × 24 hours</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Hours in a Month</td>
                <td className="py-2 px-2.5 font-mono">
                  672 hrs (28-day Feb)<br />
                  696 hrs (29-day leap Feb)<br />
                  720 hrs (30-day month)<br />
                  744 hrs (31-day month)<br />
                  <strong>730.5 hrs (Average)</strong>
                </td>
                <td className="py-2 px-2.5">Varies by specific calendar month length (30.4375 average days)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Hours in a Year</td>
                <td className="py-2 px-2.5 font-mono">
                  8,760 hrs (365-day year)<br />
                  8,784 hrs (366-day leap year)<br />
                  <strong>8,766 hrs (Average)</strong>
                </td>
                <td className="py-2 px-2.5">Mean Gregorian solar year (365.2425 days × 24h)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Hours in a Decade</td>
                <td className="py-2 px-2.5 font-mono">
                  87,648 hrs (2 leap years)<br />
                  87,672 hrs (3 leap years)<br />
                  <strong>87,660 hrs (Average)</strong>
                </td>
                <td className="py-2 px-2.5">10 consecutive calendar years</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Hours in a Century</td>
                <td className="py-2 px-2.5 font-bold text-indigo-600 dark:text-indigo-400">876,600 hrs</td>
                <td className="py-2 px-2.5">100 Gregorian years (including 24 leap years)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. STEP-BY-STEP WORKED EXAMPLES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          Worked Calculation Examples
        </h2>
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Example 1: Standard Workday with Lunch Break
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Clock-in at <strong>8:30 AM</strong>, Clock-out at <strong>5:00 PM</strong>, with a <strong>30-minute unpaid lunch break</strong>.
            </p>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              • Convert to 24-hour: 08:30 to 17:00.<br />
              • Total elapsed time: 8 hours and 30 minutes (510 minutes).<br />
              • Subtract break: 510m - 30m = 480 minutes.<br />
              → <strong>Net Paid Time: 8 hours and 0 minutes (8.00 decimal hours)</strong>.
            </p>
          </div>

          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Example 2: Overnight Shift Crossing Midnight
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Clock-in at <strong>10:15 PM</strong>, Clock-out at <strong>6:45 AM</strong> the next morning, with a <strong>45-minute break</strong>.
            </p>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              • Convert to 24-hour: 22:15 to 06:45.<br />
              • Because 06:45 is earlier than 22:15, add 24 hours: 06:45 + 24h = 30:45.<br />
              • Raw difference: 30:45 - 22:15 = 8 hours and 30 minutes (510 minutes).<br />
              • Subtract break: 510m - 45m = 465 minutes.<br />
              → <strong>Net Paid Time: 7 hours and 45 minutes (7.75 decimal hours)</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 5. COMMON MISTAKES TO AVOID */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Common Mistakes When Calculating Hours
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Confusing Decimal Hours with Minutes:</strong> Writing <code>8.30 hours</code> on a payroll sheet means 8 hours and 18 minutes (0.30 × 60 = 18m), not 8 hours and 30 minutes (which is <code>8.50 hours</code>).</li>
          <li><strong>Forgetting Overnight Rollover:</strong> Subtraction without adding 24 hours to overnight end times results in negative numbers.</li>
          <li><strong>Omitting Unpaid Breaks:</strong> Many labor laws require deducting mandatory 30-minute or 60-minute unpaid lunch intervals from gross shift time.</li>
        </ul>
      </div>

      {/* 6. RELATED CALCULATORS */}
      <div className="pt-6">
        <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2">
          Related Calculators
        </h2>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-semibold">
          <Link
            href="/calculators/time-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Time Calculator
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

export default HoursContent;

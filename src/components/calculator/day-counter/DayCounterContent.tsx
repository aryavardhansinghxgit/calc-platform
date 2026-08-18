"use client";

import React from "react";
import Link from "next/link";

export function DayCounterContent() {
  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-6 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. INTRODUCTION */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          How the Day Counter Works
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The Day Counter computes the exact number of calendar days, business days, and weekend days between any two dates, or projects forward/backward from a given start date.
        </p>
        <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Who uses it:</strong> Project managers, legal discovery teams, supply chain planners, students, and human resource departments.</li>
          <li><strong>What it calculates:</strong> Total elapsed calendar days, working business days (Monday–Friday), weekend counts (Saturdays/Sundays), and public holiday exclusions.</li>
          <li><strong>Inclusive vs. Exclusive Counting:</strong> Standard date math calculates elapsed duration (March 1 to March 3 = 2 elapsed days). If you check <em>&quot;Include End Day&quot;</em>, both endpoints are counted as whole calendar days (March 1 to March 3 = 3 days).</li>
        </ul>
      </div>

      {/* 2. CONWAY'S DOOMSDAY RULE & DAY-OF-THE-WEEK ALGORITHM */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Conway&apos;s Doomsday Rule: Mental Math Day-of-the-Week Algorithm
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm mb-3">
          Invented by British mathematician John Horton Conway, the <strong>Doomsday Rule</strong> allows anyone to calculate the exact day of the week for any Gregorian calendar date mentally. It relies on specific anchor dates (&quot;doomsdays&quot;) that always fall on the exact same day of the week in any given year.
        </p>

        {/* Century Anchors & Doomsday Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm mb-4">
          
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1.5">
              1. Century Anchor Days (400-Year Cycle)
            </span>
            <div className="space-y-1 font-mono text-xs">
              <div>• 1800s: <strong>Friday (5)</strong></div>
              <div>• 1900s: <strong>Wednesday (3)</strong></div>
              <div>• 2000s: <strong>Tuesday (2)</strong></div>
              <div>• 2100s: <strong>Sunday (0)</strong></div>
              <div>• 2200s: <strong>Friday (5)</strong> (Pattern repeats every 400 years)</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1.5">
              2. Month Doomsday Memory Anchors
            </span>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 font-mono text-xs">
              <div>• Jan: 3 (4 in leap)</div>
              <div>• Jul: 7/11 (7-Eleven)</div>
              <div>• Feb: 28 (29 in leap)</div>
              <div>• Aug: 8/8 (Even)</div>
              <div>• Mar: 3/14 (Pi Day)</div>
              <div>• Sep: 9/5 (9 to 5)</div>
              <div>• Apr: 4/4 (Even)</div>
              <div>• Oct: 10/10 (Even)</div>
              <div>• May: 5/9 (9 to 5)</div>
              <div>• Nov: 11/7 (7-Eleven)</div>
              <div>• Jun: 6/6 (Even)</div>
              <div>• Dec: 12/12 (Even)</div>
            </div>
          </div>

        </div>

        {/* Worked Doomsday Example */}
        <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5 text-xs sm:text-sm">
          <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
            Worked Doomsday Example: What day of the week is March 15, 2292?
          </span>
          <p className="text-slate-500 dark:text-slate-400 mt-0.5 space-y-0.5">
            1. Century anchor for 2200 is <strong>Friday (a = 5)</strong>.<br />
            2. Divide last two digits by 12: <code>92 ÷ 12 = 7</code> (remainder 8) → <code>b = 7</code>, <code>c = 8</code>.<br />
            3. Divide remainder by 4: <code>8 ÷ 4 = 2</code> → <code>d = 2</code>.<br />
            4. Sum: <code>a + b + c + d = 5 + 7 + 8 + 2 = 22</code>.<br />
            5. Modulo 7: <code>22 - (3 × 7) = 1 (Monday)</code>. The 2292 year doomsday is <strong>Monday</strong>.<br />
            6. Closest March doomsday is March 14 (Monday). March 15 is 1 day after (Monday + 1).<br />
            → <strong>Result: March 15, 2292 is a Tuesday</strong>.
          </p>
        </div>
      </div>

      {/* 3. FINANCIAL DAY-COUNT CONVENTIONS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Financial Day-Count Conventions
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-3 text-xs sm:text-sm">
          In corporate finance, banking, and bond markets, interest accrual depends on standardized day-count conventions:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Actual / Actual (ICMA Standard)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Counts exact calendar days between dates and divides by the exact number of days in the year (365 or 366). Used primarily for government bonds and US Treasury securities.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Actual / 360 (Money Market Standard)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Counts exact calendar days between dates but assumes a 360-day year. Common in commercial paper, short-term lending, and eurocurrency markets.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Actual / 365 (Fixed Banking Standard)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Counts exact calendar days and divides by 365 (ignoring leap years). Standard in British consumer finance and retail banking.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              30 / 360 (Bond Basis)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Assumes every calendar month has exactly 30 days and the year has 360 days. Standard for corporate and municipal bonds in the United States and Europe.
            </p>
          </div>
        </div>
      </div>

      {/* 4. DAYS PER MONTH & QUARTERLY DISTRIBUTION */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Days Per Month & Quarterly Distribution Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Quarter</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Months Included</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Days (Standard Year)</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Days (Leap Year)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2 px-2.5 font-medium">Q1 (First Quarter)</td>
                <td className="py-2 px-2.5">January, February, March</td>
                <td className="py-2 px-2.5 font-mono text-blue-600 dark:text-blue-400 font-bold">90 days</td>
                <td className="py-2 px-2.5 font-mono text-purple-600 dark:text-purple-400 font-bold">91 days</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Q2 (Second Quarter)</td>
                <td className="py-2 px-2.5">April, May, June</td>
                <td className="py-2 px-2.5 font-mono text-blue-600 dark:text-blue-400 font-bold">91 days</td>
                <td className="py-2 px-2.5 font-mono">91 days</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Q3 (Third Quarter)</td>
                <td className="py-2 px-2.5">July, August, September</td>
                <td className="py-2 px-2.5 font-mono text-blue-600 dark:text-blue-400 font-bold">92 days</td>
                <td className="py-2 px-2.5 font-mono">92 days</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Q4 (Fourth Quarter)</td>
                <td className="py-2 px-2.5">October, November, December</td>
                <td className="py-2 px-2.5 font-mono text-blue-600 dark:text-blue-400 font-bold">92 days</td>
                <td className="py-2 px-2.5 font-mono">92 days</td>
              </tr>
              <tr className="font-bold">
                <td className="py-2 px-2.5">Full Year Total</td>
                <td className="py-2 px-2.5">All 12 Months</td>
                <td className="py-2 px-2.5 font-mono text-indigo-600 dark:text-indigo-400">365 days</td>
                <td className="py-2 px-2.5 font-mono text-indigo-600 dark:text-indigo-400">366 days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. COMMON DAY-COUNTING MISTAKES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Common Day-Counting Mistakes to Avoid
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Inclusive vs Exclusive Confusion:</strong> Signing a 30-day contract starting on June 1 means the 30th day is June 30th if inclusive, or July 1st if exclusive (elapsed days).</li>
          <li><strong>Overlooking February Leap Days:</strong> In leap years, February has 29 days. Missing leap day calculations causes 1-day shifts across multi-year contracts.</li>
          <li><strong>Assuming 5 Business Days Every Week:</strong> Federal holidays (such as Memorial Day or Labor Day) create 4-day working weeks. Always exclude regional holidays when computing project deadlines.</li>
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
            href="/calculators/time-duration-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Time Duration Calculator
          </Link>
        </div>
      </div>
    </article>
  );
}

export default DayCounterContent;

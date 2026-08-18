"use client";

import React from "react";
import Link from "next/link";

export function AgeContent() {
  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-6 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. INTRODUCTION */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          How the Age & Date Interval Calculator Works
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The Age Calculator finds the exact elapsed time between your date of birth and today (or any chosen target date). It gives your precise age in years, months, and days, along with total days, hours, and minutes lived.
        </p>
        <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Who uses it:</strong> Job applicants, parents, students, HR teams, and anyone filling out official forms.</li>
          <li><strong>What it calculates:</strong> Exact years, months, days, weeks, total hours, and your next birthday countdown.</li>
          <li><strong>Why accuracy matters:</strong> Calendar months have varying lengths (28 to 31 days) and leap years add extra days, so simple math can be misleading.</li>
        </ul>
      </div>

      {/* 2. THE CORE CONCEPT: WHY AGE MATH IS NOT JUST SIMPLE DIVISION */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          The Math Behind Date Calculations
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Dividing the total number of days by 365 or 30 leads to rounding errors because calendar months vary and leap years happen every 4 years:
        </p>
        <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Unequal month lengths:</strong> February has 28 days (29 in leap years), four months have 30 days, and seven months have 31 days. Exact age calculations must step through each specific month.</li>
          <li><strong>Leap year rules:</strong> A year is a leap year if divisible by 4, except century years which must also be divisible by 400 (e.g. 2000 was a leap year, but 1900 was not).</li>
        </ul>
      </div>

      {/* 3. STEP-BY-STEP FORMULA (BORROW METHOD) */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Step-by-Step Calculation Method (The Borrow Method)
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-3">
          To calculate age accurately, subtract the Birth Date from the Target Date in three simple steps:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Subtract the Days:</strong> Subtract the birth day from the target day. If the target day is smaller, borrow 1 month from the target month and add the exact number of days from the previous month.</li>
          <li><strong>Subtract the Months:</strong> Subtract the birth month from the target month. If the target month is smaller, borrow 1 year (12 months) from the target year.</li>
          <li><strong>Subtract the Years:</strong> Subtract the birth year from the target year to get the final year count.</li>
        </ol>
      </div>

      {/* 4. WORKED EXAMPLES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          Worked Examples
        </h2>
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Example 1: Simple Calculation (No Borrowing Needed)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Birth Date: <strong>March 10, 2000</strong> | Target Date: <strong>August 25, 2026</strong>
            </p>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              Days: 25 - 10 = 15 days • Months: 8 - 3 = 5 months • Years: 2026 - 2000 = 26 years → <strong>26 years, 5 months, 15 days</strong>.
            </p>
          </div>

          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Example 2: Borrowing Days Across Month Boundaries
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Birth Date: <strong>May 24, 1998</strong> | Target Date: <strong>August 15, 2026</strong>
            </p>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              Target day 15 is smaller than 24. Borrow 1 month from August (now July, which has 31 days): (15 + 31) - 24 = 22 days. Months: 7 - 5 = 2 months. Years: 2026 - 1998 = 28 years → <strong>28 years, 2 months, 22 days</strong>.
            </p>
          </div>

          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Example 3: Leap Day Birth (February 29)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Birth Date: <strong>February 29, 2004</strong> | Target Date: <strong>March 1, 2026</strong>
            </p>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              In non-leap years (like 2026), February has 28 days. Under standard legal rules, the full 22nd year completes on March 1, 2026 (or on Feb 28 depending on jurisdiction).
            </p>
          </div>
        </div>
      </div>

      {/* 5. CULTURAL AGE COMPARISON TABLE */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          How Different Cultures Count Age
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-3 text-xs sm:text-sm">
          A quick comparison of age counting traditions around the world:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">System</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Age at Birth</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">When Age Increases</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2 px-2.5 font-medium text-slate-900 dark:text-white">Western System</td>
                <td className="py-2 px-2.5">0 years old</td>
                <td className="py-2 px-2.5">On your birthday</td>
                <td className="py-2 px-2.5">International standard</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium text-slate-900 dark:text-white">Traditional Chinese (Sui)</td>
                <td className="py-2 px-2.5">1 year old</td>
                <td className="py-2 px-2.5">On Lunar Chinese New Year</td>
                <td className="py-2 px-2.5">Cultural custom in East Asia</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium text-slate-900 dark:text-white">Traditional Korean</td>
                <td className="py-2 px-2.5">1 year old</td>
                <td className="py-2 px-2.5">On January 1st each year</td>
                <td className="py-2 px-2.5">Traditional counting</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. COMMON MISTAKES TO AVOID */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Common Mistakes When Calculating Age
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Dividing total days by 365:</strong> Ignores leap years and creates a 1-day error for every 4 years lived.</li>
          <li><strong>End-of-month confusion:</strong> Calculating from Feb 28 to Mar 31 can mean 1 month and 3 days (sequential) or exactly 1 month (month-end to month-end).</li>
          <li><strong>Inclusive day counting:</strong> Standard calculations count elapsed time. If both the start and end dates must be included, add 1 extra day.</li>
        </ul>
      </div>

      {/* 7. PRACTICAL APPLICATIONS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Practical Everyday Uses
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Legal eligibility:</strong> Verifying age for school admissions, voter registration, and driving licenses.</li>
          <li><strong>Retirement planning:</strong> Determining pension eligibility and age thresholds (e.g. 59½ for IRA withdrawals).</li>
          <li><strong>Milestone tracking:</strong> Tracking upcoming birthdays, half-birthdays, and days-alive milestones.</li>
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
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Date Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/time-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Time Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/time-duration-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Time Duration Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/day-counter-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Day Counter Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/hours-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Hours Calculator
          </Link>
        </div>
      </div>
    </article>
  );
}

export default AgeContent;

"use client";

import React from "react";
import Link from "next/link";

export function DateContent() {
  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-6 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. INTRODUCTION */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          How the Date Calculator Works
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The Date Calculator is a multipurpose date tool designed to solve two primary calendar problems:
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Days Between Two Dates:</strong> Finds the exact number of days, weeks, months, and years between any start date and end date.</li>
          <li><strong>Add or Subtract Time:</strong> Adds or subtracts any combination of years, months, weeks, days, or business days to find a past or future date.</li>
        </ol>
        <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Who uses it:</strong> Project managers calculating sprint timelines, legal assistants verifying filing deadlines, HR specialists tracking probation periods, and individuals planning events.</li>
          <li><strong>Why it matters:</strong> Because months have varying lengths (28, 29, 30, or 31 days) and leap years occur every 4 years, manual calendar math is prone to errors.</li>
        </ul>
      </div>

      {/* 2. MATHEMATICAL CONCEPT: THE GREGORIAN CALENDAR */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Calendar Mechanics & Leap Year Rules
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The world standard Gregorian calendar organizes the solar year into 365 days, with an extra leap day added to February every four years to stay in sync with the Earth’s orbit around the sun (~365.2422 days).
        </p>

        <div className="mt-3 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <p>
            <strong>The 400-Year Leap Rule:</strong> A year is a leap year if it is evenly divisible by 4, with one important exception: century years (like 1900 or 2100) are <em>not</em> leap years unless they are also evenly divisible by 400 (such as the year 2000).
          </p>
          <p>
            <strong>Month Length Variation:</strong> A simple division by 30 or 365 produces errors because the 12 calendar months have uneven lengths:
          </p>
        </div>

        {/* Days in Month Quick Reference Table */}
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Month</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Days (Standard Year)</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Days (Leap Year)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2 px-2.5">January, March, May, July, August, October, December</td>
                <td className="py-2 px-2.5 font-medium">31 days</td>
                <td className="py-2 px-2.5 font-medium">31 days</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5">April, June, September, November</td>
                <td className="py-2 px-2.5 font-medium">30 days</td>
                <td className="py-2 px-2.5 font-medium">30 days</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5">February</td>
                <td className="py-2 px-2.5 font-medium">28 days</td>
                <td className="py-2 px-2.5 font-medium text-blue-600 dark:text-blue-400">29 days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. HOW THE CALCULATION WORKS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Step-by-Step Calculation Steps
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div>
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              1. Date Difference (Borrowing Method)
            </span>
            <p>
              To find the duration between two dates, subtract the starting day, month, and year from the ending day, month, and year. If the ending day is smaller than the starting day, borrow the exact day count from the preceding month. If the ending month is smaller, borrow 12 months from the ending year.
            </p>
          </div>

          <div>
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              2. Adding / Subtracting Time (Month-End Clamping)
            </span>
            <p>
              When adding months to a date that ends on the 31st (for example, January 31 + 1 month), the calculator clamps the resulting date to the last valid day of that month (February 28 in standard years, or February 29 in leap years).
            </p>
          </div>

          <div>
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              3. Business Days Calculation
            </span>
            <p>
              When calculating in business days, the engine counts step-by-step through each calendar day, automatically skipping weekends (Saturdays and Sundays) and any recognized federal or public holidays.
            </p>
          </div>
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
              Example 1: Days Between Two Dates
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Start Date: <strong>March 15, 2026</strong> | End Date: <strong>October 28, 2026</strong>
            </p>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              Days: 28 - 15 = 13 days • Months: 10 - 3 = 7 months • Years: 2026 - 2026 = 0 years → <strong>7 months, 13 days</strong> (Total: 227 calendar days, or 32 weeks and 3 days).
            </p>
          </div>

          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Example 2: Adding 45 Business Days
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Start Date: <strong>Monday, August 10, 2026</strong> + <strong>45 Business Days</strong> (excluding weekends and US Labor Day)
            </p>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              45 working days skips 9 weekends (18 weekend days) plus Labor Day (Sep 7, 2026) → Target Date: <strong>Wednesday, October 14, 2026</strong> (65 total calendar days).
            </p>
          </div>
        </div>
      </div>

      {/* 5. 2026 & 2027 US FEDERAL HOLIDAYS REFERENCE TABLE */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          U.S. Federal Holidays Schedule (2026 – 2027)
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-3 text-xs sm:text-sm">
          Federal holidays observed by banks, government offices, and stock markets:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Holiday Name</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">2026 Date</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">2027 Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2 px-2.5 font-medium">New Year's Day</td>
                <td className="py-2 px-2.5">Jan 1, 2026 (Thu)</td>
                <td className="py-2 px-2.5">Jan 1, 2027 (Fri)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Martin Luther King Jr. Day</td>
                <td className="py-2 px-2.5">Jan 19, 2026 (Mon)</td>
                <td className="py-2 px-2.5">Jan 18, 2027 (Mon)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Presidents' Day</td>
                <td className="py-2 px-2.5">Feb 16, 2026 (Mon)</td>
                <td className="py-2 px-2.5">Feb 15, 2027 (Mon)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Memorial Day</td>
                <td className="py-2 px-2.5">May 25, 2026 (Mon)</td>
                <td className="py-2 px-2.5">May 31, 2027 (Mon)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Juneteenth</td>
                <td className="py-2 px-2.5">Jun 19, 2026 (Fri)</td>
                <td className="py-2 px-2.5">Jun 19, 2027 (Sat)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Independence Day</td>
                <td className="py-2 px-2.5">Jul 4, 2026 (Sat)</td>
                <td className="py-2 px-2.5">Jul 4, 2027 (Sun)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Labor Day</td>
                <td className="py-2 px-2.5">Sep 7, 2026 (Mon)</td>
                <td className="py-2 px-2.5">Sep 6, 2027 (Mon)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Columbus Day</td>
                <td className="py-2 px-2.5">Oct 12, 2026 (Mon)</td>
                <td className="py-2 px-2.5">Oct 11, 2027 (Mon)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Veterans Day</td>
                <td className="py-2 px-2.5">Nov 11, 2026 (Wed)</td>
                <td className="py-2 px-2.5">Nov 11, 2027 (Thu)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Thanksgiving Day</td>
                <td className="py-2 px-2.5">Nov 26, 2026 (Thu)</td>
                <td className="py-2 px-2.5">Nov 25, 2027 (Thu)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Christmas Day</td>
                <td className="py-2 px-2.5">Dec 25, 2026 (Fri)</td>
                <td className="py-2 px-2.5">Dec 25, 2027 (Sat)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. COMMON MISTAKES TO AVOID */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Common Mistakes When Calculating Dates
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Inclusive vs Exclusive Counting:</strong> Standard date subtraction counts elapsed intervals (e.g. Monday to Tuesday is 1 day). If you need to count both the start day and the end day as active days, enable the "Include end day (+1 day)" setting.</li>
          <li><strong>Assuming 30 Days in Every Month:</strong> Adding "1 month" to January 31 results in February 28 (or 29 in a leap year), not February 31.</li>
          <li><strong>Overlooking Floating Holidays:</strong> Holidays like Memorial Day (last Monday of May) and Thanksgiving (4th Thursday of November) change calendar dates every year.</li>
        </ul>
      </div>

      {/* 7. PRACTICAL APPLICATIONS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Practical Everyday Uses
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Contract Deadlines:</strong> Calculating 30-day, 60-day, or 90-day notice periods for leases and commercial agreements.</li>
          <li><strong>Project Management:</strong> Scheduling agile sprints, delivery dates, and project milestones based on working business days.</li>
          <li><strong>Finance & Payroll:</strong> Counting billing cycles, interest accrual periods, and payroll payment dates.</li>
        </ul>
      </div>

      {/* 8. RELATED CALCULATORS */}
      <div className="pt-6">
        <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2">
          Related Calculators
        </h2>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-semibold">
          <Link
            href="/calculators/age-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Age Calculator
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
            href="/calculators/time-duration-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Time Duration Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/day-counter-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Day Counter Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/hours-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Hours Calculator
          </Link>
        </div>
      </div>
    </article>
  );
}

export default DateContent;

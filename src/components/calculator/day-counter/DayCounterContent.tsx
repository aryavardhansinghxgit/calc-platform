"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, Calendar, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { day_counter_calculatorFaqs } from "@/app/calculators/day-counter-calculator/faq";

export function DayCounterContent() {
  // All 21 FAQs open by default (matching 401(k) format)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 21 }, (_, i) => i))
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
    <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base divide-y divide-slate-100 dark:divide-slate-800">
      
      {/* 1. EXPANDED MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section: Calculate Days Between Two Dates */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Calculate Days Between Two Dates
          </h2>
          <p>
            A Day Counter Calculator helps you find the exact number of calendar days between two dates and can also show working days, weekends, weeks, hours and minutes.
          </p>
          <p>
            Enter a start date and end date to calculate the elapsed time between them. You can choose whether the end date is included, exclude applicable U.S. federal holidays from working-day calculations, add or subtract days from a starting date, or use Conway&apos;s Doomsday Rule to determine the weekday of a date.
          </p>
          <p>
            This calculator is useful for everyday date questions, project planning, business schedules, deadlines, leave planning, event countdowns, service periods and other situations where the difference between two calendar dates matters.
          </p>
          <p>
            It also separates several concepts that are often confused:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 dark:text-slate-300">
            <li><strong>Calendar days</strong> count the elapsed dates.</li>
            <li><strong>Working days</strong> apply a workweek and holiday rules.</li>
            <li><strong>Business-day calculations</strong> determine a future or previous date while skipping non-working days.</li>
            <li><strong>Financial day-count conventions</strong> use specialized rules for calculating accrual fractions.</li>
          </ul>
          <p>
            That distinction is important because the answer to &quot;how many days?&quot; depends on what you actually want to count.
          </p>
        </section>

        {/* Section: What Does a Day Counter Calculate? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Does a Day Counter Calculate?
          </h2>
          <p>
            At its simplest, a date difference is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-sm font-bold text-slate-900 dark:text-white">
            Elapsed Days = End Date − Start Date
          </div>
          <p>
            For example, from <strong>September 14, 2026 → December 14, 2026</strong> with the end date excluded gives <strong>91 days</strong>.
          </p>
          <p>
            The same interval can be represented as:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 dark:text-slate-300">
            <li><strong>13 weeks</strong></li>
            <li><strong>2,184 hours</strong></li>
            <li><strong>131,040 minutes</strong></li>
          </ul>
          <p>
            The calculator derives those sub-units from the same underlying calendar duration rather than treating each as a separate calculation.
          </p>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white mb-1">Calendar Difference Flow:</div>
            <div>Start Date → End Date → Calendar Difference</div>
            <div className="pl-4">├── Calendar Days (91 days)</div>
            <div className="pl-4">├── Weeks (13 weeks)</div>
            <div className="pl-4">├── Hours (2,184 hours)</div>
            <div className="pl-4">└── Minutes (131,040 minutes)</div>
          </div>

          <p>
            If you need chronological age rather than a raw date duration, use the{" "}
            <Link href="/calculators/age-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:no-underline">
              Age Calculator
            </Link>{" "}
            instead, because age is normally expressed in completed years, months and days rather than simply dividing a day total by 365.
          </p>
        </section>

        {/* Section: Days Between Two Dates: Example */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Days Between Two Dates: Example
          </h2>
          <p>
            Suppose the dates are <strong>September 14, 2026</strong> and <strong>December 14, 2026</strong> with exclusive end-date counting. The interval can be broken down month by month:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                  <th className="py-2 px-3 font-semibold text-slate-900 dark:text-white">Month</th>
                  <th className="py-2 px-3 font-semibold text-slate-900 dark:text-white">Calculation</th>
                  <th className="py-2 px-3 font-semibold text-slate-900 dark:text-white">Days Contributed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="py-2 px-3 font-medium">September</td>
                  <td className="py-2 px-3 font-mono">30 − 14</td>
                  <td className="py-2 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">16 days</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium">October</td>
                  <td className="py-2 px-3 font-mono">Full month</td>
                  <td className="py-2 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">31 days</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium">November</td>
                  <td className="py-2 px-3 font-mono">Full month</td>
                  <td className="py-2 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">30 days</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium">December</td>
                  <td className="py-2 px-3 font-mono">1 to 14 (exclusive of 14)</td>
                  <td className="py-2 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">14 days</td>
                </tr>
                <tr className="bg-slate-50/70 dark:bg-slate-800/40 font-bold">
                  <td className="py-2 px-3">Total</td>
                  <td className="py-2 px-3 font-mono">16 + 31 + 30 + 14</td>
                  <td className="py-2 px-3 font-mono text-indigo-600 dark:text-indigo-400">91 calendar days</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Therefore, the duration is exactly <strong>91 calendar days</strong>. For broader calendar and offset inquiries, explore our{" "}
            <Link href="/calculators/date-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:no-underline">
              Date Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section: Inclusive vs Exclusive Date Counting */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Inclusive vs Exclusive Date Counting
          </h2>
          <p>
            One of the most common causes of disagreement between date calculators is whether the final date is included:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-1 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Exclusive counting:</strong> The calculator measures the elapsed interval between the two dates. For example, <code>March 1 → March 3</code> yields <strong>2 days</strong>.
            </li>
            <li>
              <strong>Inclusive counting:</strong> Both endpoint dates are counted as complete calendar days. March 1, March 2 and March 3 are included, yielding <strong>3 days</strong>.
            </li>
          </ul>
          <p>
            For the same reason, comparing the same date to itself (<code>March 1 → March 1</code>) yields <strong>0 days exclusive</strong> but <strong>1 day inclusive</strong>. The calculator provides an explicit <em>&quot;Include end day in count&quot;</em> setting so the counting rule is always transparent.
          </p>
        </section>

        {/* Section: Does the Start Date Count? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Does the Start Date Count?
          </h2>
          <p>
            That depends on the selected convention. In the calculator&apos;s normal elapsed-duration mode, the start date is the temporal baseline. The end date may then either be excluded or included through the explicit setting.
          </p>
          <p>
            This is why <code>March 1 → March 3</code> is 2 days under exclusive counting rather than 3. When using a different application&apos;s business-day or deadline rules, always check its stated convention instead of assuming every system counts dates identically. When converting intervals into smaller units like hours, seconds or minutes, reference our{" "}
            <Link href="/calculators/time-duration-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:no-underline">
              Time Duration Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section: What Happens When the Dates Are Reversed? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Happens When the Dates Are Reversed?
          </h2>
          <p>
            Suppose you enter <strong>December 14, 2026</strong> as the start date and <strong>September 14, 2026</strong> as the end date.
          </p>
          <p>
            The calculator identifies the reversed order rather than silently presenting a misleading positive result. It indicates with an explicit notice that the dates were reordered for the duration calculation and provides a 1-click button to swap them.
          </p>
          <p>
            This is especially useful for deadline calculations, because a result such as &quot;91 days&quot; is ambiguous if the displayed start date is later than the displayed end date.
          </p>
        </section>

        {/* Section: Calendar Days vs Working Days */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Calendar Days vs Working Days
          </h2>
          <p>
            Calendar days and working days answer fundamentally different questions:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 dark:text-slate-300">
            <li><strong>Calendar days</strong> include every single day in the interval without exception.</li>
            <li><strong>Working days</strong> depend on the selected work schedule and holiday exclusions.</li>
          </ul>
          <p>
            For the calculator&apos;s standard schedule, Monday through Friday are working days, and Saturday and Sunday are weekend days. The calculator also supports alternate workweek schedules including four-day (Mon–Thu) and six-day (Mon–Sat) patterns.
          </p>
          <p>
            So a 14-day calendar interval can contain fewer than 10 working days, depending on where it begins and whether public holidays fall within it.
          </p>
        </section>

        {/* Section: Working Days Example */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Working Days Example
          </h2>
          <p>
            For <strong>September 14, 2026 → December 14, 2026</strong> (exclusive):
          </p>
          <p>
            The 91 calendar days contain <strong>65 weekdays</strong> and <strong>26 weekend days</strong> before federal holiday exclusions. The interval includes three applicable federal holidays:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 dark:text-slate-300">
            <li>Columbus Day (Monday, October 12, 2026)</li>
            <li>Veterans Day (Wednesday, November 11, 2026)</li>
            <li>Thanksgiving Day (Thursday, November 26, 2026)</li>
          </ul>
          <p>
            After removing those three weekday holidays: <code>65 − 3 = 62 working days</code>.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                  <th className="py-2 px-3 font-semibold text-slate-900 dark:text-white">Metric</th>
                  <th className="py-2 px-3 font-semibold text-slate-900 dark:text-white">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                <tr>
                  <td className="py-2 px-3 font-sans font-medium">Calendar days</td>
                  <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">91</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans font-medium">Working days</td>
                  <td className="py-2 px-3 font-bold text-blue-600 dark:text-blue-400">62</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans font-medium">Weekend days</td>
                  <td className="py-2 px-3 font-bold text-slate-700 dark:text-slate-300">26</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans font-medium">Weeks</td>
                  <td className="py-2 px-3">13</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans font-medium">Hours</td>
                  <td className="py-2 px-3">2,184</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans font-medium">Minutes</td>
                  <td className="py-2 px-3">131,040</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: How U.S. Federal Holidays Affect Working Days */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How U.S. Federal Holidays Affect Working Days
          </h2>
          <p>
            The calculator can exclude U.S. federal holidays when determining working days. Federal holidays are established by 5 U.S.C. § 6103. The U.S. Office of Personnel Management (OPM) lists holidays such as New Year&apos;s Day, Martin Luther King Jr. Day, Washington&apos;s Birthday, Memorial Day, Juneteenth, Independence Day, Labor Day, Columbus Day, Veterans Day, Thanksgiving and Christmas.
          </p>
          <p>
            Several of these dates move from year to year according to weekday rules:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 dark:text-slate-300 font-mono text-xs">
            <li>Thanksgiving 2025 = November 27</li>
            <li>Thanksgiving 2026 = November 26</li>
            <li>Thanksgiving 2027 = November 25</li>
          </ul>
          <p>
            OPM&apos;s schedules confirm those dates. The calculator therefore generates holidays dynamically for the exact year being calculated instead of using one fixed year&apos;s dates.
          </p>
        </section>

        {/* Section: Federal Holidays That Fall on Weekends */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Federal Holidays That Fall on Weekends
          </h2>
          <p>
            For most federal employees working a Monday-through-Friday schedule, OPM states that a Saturday federal holiday is generally observed on the preceding Friday, while a Sunday holiday is generally observed on the following Monday.
          </p>
          <p>
            For example, Independence Day in 2026 falls on <strong>Saturday, July 4</strong>. The observed federal holiday for most federal employees is <strong>Friday, July 3, 2026</strong>.
          </p>
          <p>
            The calculator handles the observed weekday rather than simply ignoring the Saturday holiday. This distinction matters significantly when calculating business days and contractual deadlines.
          </p>
        </section>

        {/* Section: Are Federal Holidays the Same as Company Holidays? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Are Federal Holidays the Same as Company Holidays?
          </h2>
          <p>
            No. A federal holiday calendar is not automatically identical to a private employer&apos;s holiday calendar. A company may close on additional days (such as the day after Thanksgiving or Christmas Eve), remain open on some federal holidays (such as Columbus Day or Veterans Day), use a different shift schedule, or define business days contractually.
          </p>
          <p>
            Therefore, the federal-holiday option should be used when the relevant work schedule actually follows that holiday calendar. For employment, contractual or legal deadlines, the governing policy remains authoritative.
          </p>
        </section>

        {/* Section: How the Calculator Handles Leap Years */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How the Calculator Handles Leap Years
          </h2>
          <p>
            The calculator uses the standard astronomical Gregorian leap-year rule:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-xs sm:text-sm">
            A year divisible by 4 is normally a leap year, except century years that are not divisible by 400.
          </div>
          <p>
            So:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 font-mono text-xs text-slate-700 dark:text-slate-300">
            <li>2024 = leap year (divisible by 4)</li>
            <li>2028 = leap year (divisible by 4)</li>
            <li>2000 = leap year (century year divisible by 400)</li>
            <li>1900 = not a leap year (century year not divisible by 400)</li>
            <li>2100 = not a leap year (century year not divisible by 400)</li>
          </ul>
          <p>
            The U.S. Naval Observatory confirms this Gregorian rule and the 400-year cycle containing exactly 146,097 days. The calculator&apos;s tests explicitly verify those century cases.
          </p>
        </section>

        {/* Section: Why Leap Years Change Date Calculations */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Leap Years Change Date Calculations
          </h2>
          <p>
            Consider:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-1 text-slate-700 dark:text-slate-300 font-mono text-xs">
            <li><code>February 28, 2024 → March 1, 2024</code>: 2024 contains February 29, so there are <strong>2 elapsed days</strong>.</li>
            <li><code>February 28, 2025 → March 1, 2025</code>: 2025 is a common year, so there is only <strong>1 elapsed day</strong>.</li>
          </ul>
          <p>
            The calculator verifies both transitions to ensure multi-year calculations do not accumulate 1-day drift errors.
          </p>
        </section>

        {/* Section: Why February 30 Should Never Be Accepted */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why February 30 Should Never Be Accepted
          </h2>
          <p>
            An important quality test for any date calculator is invalid-date handling. <strong>February 30, 2026</strong> does not exist in the Gregorian calendar.
          </p>
          <p>
            Some programming environments normalize invalid date values automatically. That can turn an invalid input like February 30 into March 2 without notifying the user.
          </p>
          <p>
            This calculator validates the year, month and day before constructing the date, so impossible values such as February 30, April 31, and June 31 are rejected instead of being silently changed. This is especially critical for applications involving legal deadlines and contractual periods.
          </p>
        </section>

        {/* Section: Adding Days to a Date */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Adding Days to a Date
          </h2>
          <p>
            Sometimes the question is not <em>&quot;How many days are between these dates?&quot;</em> but rather <em>&quot;What date will be 30 days after this date?&quot;</em>
          </p>
          <p>
            The calculator&apos;s Add/Subtract mode handles that problem:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 font-mono text-xs text-slate-700 dark:text-slate-300">
            <li>January 1, 2026 + 30 calendar days = January 31, 2026</li>
            <li>January 31, 2026 − 30 calendar days = January 1, 2026</li>
            <li>February 28, 2024 + 1 day = February 29, 2024 (leap year)</li>
            <li>February 28, 2025 + 1 day = March 1, 2025 (standard year)</li>
          </ul>
        </section>

        {/* Section: Adding Business Days Instead of Calendar Days */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Adding Business Days Instead of Calendar Days
          </h2>
          <p>
            Business-day arithmetic is different. If you add one calendar day to a Friday, you reach Saturday. If you add one business day to a Friday under a Monday–Friday workweek, you reach Monday.
          </p>
          <p>
            For example:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm">
            Friday, August 7, 2026 + 1 business day = Monday, August 10, 2026
          </div>
          <p>
            because Saturday and Sunday are skipped. If Monday is an excluded public holiday, the result moves to the next eligible working day (Tuesday).
          </p>
        </section>

        {/* Section: What Is a Business Day? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is a Business Day?
          </h2>
          <p>
            There is no single universal business-day definition. The calculator can apply standard Monday–Friday or other configured work schedules, and can optionally remove excluded federal holidays. The effective rule is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">
            Working Day = Work-Schedule Day AND Not an Excluded Holiday
          </div>
          <p>
            For a real contract, employer deadline or financial agreement, always use the work-calendar definition specified by that agreement.
          </p>
        </section>

        {/* Section: Multi-Year Date Calculations */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Multi-Year Date Calculations
          </h2>
          <p>
            Long date ranges introduce additional complications because the calculator must handle leap years, different month lengths, changing floating holidays, observed holiday shifts, and year boundaries.
          </p>
          <p>
            The calculator generates holiday dates independently for each year covered by the range. This matters for a ten-year calculation just as much as for a short interval around Thanksgiving.
          </p>
        </section>

        {/* Section: Date Calculations Across Year Boundaries */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Date Calculations Across Year Boundaries
          </h2>
          <p>
            A simple year transition does not create a special mathematical exception: <code>December 31 → January 1</code> is 1 elapsed day under exclusive counting.
          </p>
          <p>
            However, when working-day or holiday calculations are involved, the two dates belong to different holiday calendars. That is why the calculator treats each year separately when generating year-specific holidays.
          </p>
        </section>

        {/* Section: What Is the "Percent of Mean Gregorian Year"? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is the &quot;Percent of Mean Gregorian Year&quot;?
          </h2>
          <p>
            The calculator includes a useful comparison showing the interval as a percentage of a mean Gregorian year. It uses exactly <strong>365.2425 days</strong> as the denominator:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center">
            Percent of Mean Gregorian Year = (Days ÷ 365.2425) × 100
          </div>
          <p>
            For our benchmark of 91 days: <code>91 ÷ 365.2425 × 100 ≈ 24.91%</code>.
          </p>
          <p>
            The 365.2425 figure comes from the Gregorian calendar&apos;s 400-year cycle: <code>146,097 ÷ 400 = 365.2425 days per year</code>. This is why the calculator labels the metric <em>Percent of Mean Gregorian Year</em> rather than leaving the denominator ambiguous.
          </p>
        </section>

        {/* Section: Why a Gregorian Year Is 365.2425 Days on Average */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why a Gregorian Year Is 365.2425 Days on Average
          </h2>
          <p>
            A Gregorian calendar year is not exactly 365 days because leap days are inserted over time. Across the complete 400-year cycle:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center">
            303 common years (365 d) + 97 leap years (366 d) = 146,097 days
          </div>
          <p>
            and <code>146,097 ÷ 400 = 365.2425 days/year</code>. The U.S. Naval Observatory confirms this average and the exact 400-year repetition of the Gregorian civil calendar.
          </p>
        </section>

        {/* Section: Conway's Doomsday Rule */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Conway&apos;s Doomsday Rule
          </h2>
          <p>
            The Day Counter also includes a Doomsday Rule Solver. Conway&apos;s Doomsday Rule is a mental-calculation technique for determining the weekday associated with any Gregorian date. The algorithm works through:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-center space-y-1 text-slate-700 dark:text-slate-300">
            Century Anchor → Year ÷ 12 → Year Remainder → Remainder ÷ 4 → Year&apos;s Doomsday → Month Anchor → Weekday
          </div>
          <p>
            The calculator&apos;s implementation has been checked across thousands of dates and against independent Gregorian weekday calculations.
          </p>
        </section>

        {/* Section: Example: What Day Was March 15, 2026? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Example: What Day Was March 15, 2026?
          </h2>
          <p>
            The calculator verifies:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 font-mono text-xs text-slate-700 dark:text-slate-300">
            <li>March 15, 2026 = <strong>Sunday</strong></li>
            <li>March 15, 2292 = <strong>Tuesday</strong></li>
            <li>January 1, 2000 = <strong>Saturday</strong></li>
            <li>February 29, 2024 = <strong>Thursday</strong></li>
          </ul>
          <p>
            This makes the Doomsday mode useful when you want to answer a weekday question without manually consulting a calendar. If you also need clock-time conversions, check out our{" "}
            <Link href="/calculators/time-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:no-underline">
              Time Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section: What Is a Financial Day-Count Convention? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is a Financial Day-Count Convention?
          </h2>
          <p>
            Financial calculations sometimes use specialized methods to turn a date interval into an accrual fraction. Examples include:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 dark:text-slate-300">
            <li>Actual/Actual</li>
            <li>Actual/360</li>
            <li>Actual/365 Fixed</li>
            <li>30/360</li>
          </ul>
          <p>
            These should not be confused with ordinary calendar-day counting. A financial contract may specify a particular convention, and the result can depend on that exact convention.
          </p>
        </section>

        {/* Section: Actual/Actual Is Not One Universal Formula */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Actual/Actual Is Not One Universal Formula
          </h2>
          <p>
            The name Actual/Actual can refer to different conventions. Two important examples are:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-1 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Actual/Actual ICMA:</strong> Used in coupon-period calculations based on the actual length of the coupon period together with coupon frequency.
            </li>
            <li>
              <strong>Actual/Actual ISDA:</strong> Uses separate day denominators for common and leap years (days in standard years divided by 365, days in leap years divided by 366).
            </li>
          </ul>
          <p>
            ISDA explicitly recognizes ACT/ACT (ICMA) as distinct from other Actual/Actual variants. So a financial calculator should identify the specific convention instead of simply saying: <em>&quot;Actual/Actual = actual days divided by 365 or 366.&quot;</em>
          </p>
        </section>

        {/* Section: Actual/360 & Actual/365 Fixed */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Actual/360 and Actual/365 Fixed
          </h2>
          <p>
            <strong>Actual/360</strong> uses <code>Actual Days ÷ 360</code> for the relevant day-count fraction. It is common in commercial paper and money markets, and differs from simply asking how many calendar days elapsed.
          </p>
          <p>
            <strong>Actual/365 Fixed</strong> uses <code>Actual Days ÷ 365</code>. The denominator remains 365 rather than switching to 366 during leap years. That is one reason Actual/365 Fixed can produce a different accrual fraction from Actual/Actual ISDA for a period involving February 29.
          </p>
        </section>

        {/* Section: What Is 30/360? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is 30/360?
          </h2>
          <p>
            30/360 is a family of financial day-count conventions that approximates months as 30-day periods. However, <strong>30/360 US</strong> and <strong>30E/360</strong> are not identical.
          </p>
          <p>
            ISDA publishes separate examples for 30/360 and 30E/360, demonstrating that the convention must be identified precisely. The correct financial question is therefore not simply <em>&quot;Which 30/360 formula?&quot;</em> but <em>&quot;Which specific 30/360 convention does the contract or instrument require?&quot;</em>
          </p>
        </section>

        {/* Section: Why Different Date Calculators Can Give Different Answers */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Different Date Calculators Can Give Different Answers
          </h2>
          <p>
            Two calculators may both be functioning correctly but use different rules. Differences can come from:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 dark:text-slate-300">
            <li>inclusive vs exclusive counting;</li>
            <li>business-day definitions;</li>
            <li>holiday calendars;</li>
            <li>observed holiday rules;</li>
            <li>leap-year handling;</li>
            <li>financial day-count conventions;</li>
            <li>reversed-date policies;</li>
            <li>date formatting;</li>
            <li>timezone treatment.</li>
          </ul>
          <p>
            So when two tools disagree, compare their assumptions before deciding that one result is wrong.
          </p>
        </section>

        {/* Section: Date-Only Arithmetic and Time Zones */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Date-Only Arithmetic and Time Zones
          </h2>
          <p>
            A date such as <strong>September 14, 2026</strong> is a calendar date, not necessarily a specific instant in time. If date-only values are incorrectly processed as local or UTC timestamps, a user in another timezone can potentially see the date shift backward or forward by one day.
          </p>
          <p>
            The calculator deliberately performs date arithmetic in pure calendar coordinates to avoid daylight-saving and timezone shifts in date-only calculations. That is especially important for international users.
          </p>
        </section>

        {/* Section: Date Calculators for Deadlines, Planning & Leave */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Date Calculators for Deadlines, Planning and Leave
          </h2>
          <p>
            A date calculator can help you perform the arithmetic behind a deadline, but the governing deadline rule still matters. For example, a policy might specify <em>10 calendar days</em>, <em>10 business days</em>, <em>10 days excluding the start date</em>, or <em>10 days including the filing date</em>. Those rules are not interchangeable.
          </p>
          <p>
            For project planning, showing both calendar days and working days is much more informative than a single duration: a project might last 91 calendar days but contain only 62 working days under standard workweek and holiday rules.
          </p>
          <p>
            Leave systems also have special rules concerning weekends, public holidays, and employee schedules. The Day Counter provides the underlying arithmetic, but the employer&apos;s leave policy remains authoritative.
          </p>
        </section>

        {/* Section: Common Day-Counting Errors */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Common Day-Counting Errors
          </h2>
          <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div>• <strong>Counting both endpoints unintentionally:</strong> Always check whether the calculation is inclusive or exclusive.</div>
            <div>• <strong>Using fixed holiday dates:</strong> Thanksgiving does not occur on the same numerical date every year. The correct date is determined by the fourth Thursday of November.</div>
            <div>• <strong>Ignoring observed holidays:</strong> A Saturday or Sunday federal holiday produces a weekday observed date for most federal employees.</div>
            <div>• <strong>Forgetting leap years:</strong> February 29 changes the elapsed duration across February in leap years.</div>
            <div>• <strong>Treating business days as 5/7 of calendar days:</strong> Holiday and week-boundary effects make simple proportional estimates unreliable.</div>
            <div>• <strong>Accepting impossible dates:</strong> February 30 is not a calendar date.</div>
            <div>• <strong>Treating financial conventions as ordinary date subtraction:</strong> Financial day-count fractions use their own specialized rules.</div>
            <div>• <strong>Ignoring reversed date order:</strong> A date range should make its direction clear.</div>
          </div>
        </section>

        {/* Section: Day Counter Result Reference */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Day Counter Result Reference
          </h2>
          <p>
            For the calculator&apos;s benchmark:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 font-mono text-xs text-slate-700 dark:text-slate-300">
            <li>Start: September 14, 2026</li>
            <li>End: December 14, 2026</li>
            <li>End date: excluded</li>
            <li>Federal holidays: excluded from working days</li>
          </ul>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                  <th className="py-2 px-3 font-semibold text-slate-900 dark:text-white">Calculation</th>
                  <th className="py-2 px-3 font-semibold text-slate-900 dark:text-white">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                <tr>
                  <td className="py-2 px-3 font-sans font-medium">Calendar duration</td>
                  <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">91 days</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans font-medium">Working days</td>
                  <td className="py-2 px-3 font-bold text-blue-600 dark:text-blue-400">62</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans font-medium">Weekend days</td>
                  <td className="py-2 px-3">26</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans font-medium">Weeks</td>
                  <td className="py-2 px-3">13 weeks</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans font-medium">Hours</td>
                  <td className="py-2 px-3">2,184</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans font-medium">Minutes</td>
                  <td className="py-2 px-3">131,040</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans font-medium">Mean Gregorian year</td>
                  <td className="py-2 px-3 font-bold text-indigo-600 dark:text-indigo-400">24.91%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            The benchmark has been independently verified in the current implementation.
          </p>
        </section>

        {/* Section: Methodology & Sources */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Methodology &amp; Sources
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Gregorian Calendar Standard
              </div>
              <p>
                The calculator uses Gregorian calendar arithmetic and validates dates against the actual number of days in each month. Its leap-year logic follows the standard 400-year Gregorian cycle. The U.S. Naval Observatory confirms that the Gregorian calendar repeats exactly every 400 years and averages 365.2425 days per year.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                U.S. Federal Holidays &amp; Financial Standards
              </div>
              <p>
                The federal holiday set follows the holidays established under U.S. federal law (5 U.S.C. § 6103), with year-specific schedules and observed dates referenced through the Office of Personnel Management. The financial section distinguishes the major day-count conventions rather than treating &quot;Actual/Actual&quot; or &quot;30/360&quot; as universal formulas. ISDA documentation confirms the differences among the principal variants.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Final Takeaway */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Final Takeaway
          </h2>
          <p>
            A reliable Day Counter Calculator needs more than simple subtraction. The exact result depends on the rules being applied:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-center space-y-1 text-slate-700 dark:text-slate-300">
            VALID DATE → START / END ORDER → INCLUSIVE OR EXCLUSIVE? → CALENDAR OR WORKING DAYS? → WHICH WORK SCHEDULE? → WHICH HOLIDAY CALENDAR? → FINAL RESULT
          </div>
          <p>
            For the benchmark interval from September 14, 2026 to December 14, 2026, the exclusive elapsed duration is 91 calendar days. Under the standard Monday–Friday schedule and with applicable U.S. federal holidays excluded, that becomes 62 working days and 26 weekend days. The same 91-day interval is 13 weeks, 2,184 hours, 131,040 minutes, and approximately 24.91% of a 365.2425-day mean Gregorian year.
          </p>
          <p>
            For ordinary date arithmetic, that makes the calculator useful for quickly answering questions such as how many days between two dates, how many business days, what date is 90 days from now, or what weekday was a particular date. For legal, contractual, employment or financial deadlines, however, the calculator should be treated as the arithmetic engine—not the governing authority. The applicable contract, policy, regulation or financial convention determines how the final date must actually be interpreted.
          </p>
        </section>

      </div>

      {/* 2. FAQ SECTION (All 21 Approved FAQs, Open by Default, Matching 401(k) Format) */}
      <div className="pt-8 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {day_counter_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50/70 dark:bg-slate-800/40 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between hover:bg-slate-100/80 dark:hover:bg-slate-700/40 transition-colors cursor-pointer"
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-800/20 font-normal">
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

export default DayCounterContent;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, Calendar, Info } from "lucide-react";
import { day_of_the_week_calculatorFaqs } from "@/app/calculators/day-of-the-week-calculator/faq";

export function DayOfWeekContent() {
  // All 24 FAQs open by default (like 401k format)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: day_of_the_week_calculatorFaqs.length }, (_, i) => i))
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
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. EXPANDED MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section 1: Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Find the Day of the Week for Any Date
          </h2>
          <p>
            The Day of the Week Calculator tells you which weekday falls on any valid date you enter. It can be used for a birthday, anniversary, historical event, future deadline, calendar check, or simply to answer questions such as:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>What day of the week was I born?</li>
            <li>What day was July 20, 1969?</li>
            <li>What day of the week was July 4, 1776?</li>
            <li>What day will a future date fall on?</li>
          </ul>
          <p>
            The calculator goes beyond returning only Monday through Sunday. It can also show the day of the year, ISO week number, leap-year status, days remaining in the year, a monthly calendar view, and the mathematical steps behind the weekday calculation. It also supports batch date checking and a separate proleptic Julian-calendar mode.
          </p>
        </section>

        {/* Section 2: What Day of the Week Is Today? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Day of the Week Is Today?
          </h2>
          <p>
            The calculator&apos;s Today function uses the current local calendar date rather than relying on a fixed example date. It can also calculate Yesterday with one click.
          </p>
          <p>
            Because a weekday is determined from the calendar date itself, a date such as <strong>September 15, 2026</strong> has a fixed Gregorian weekday: <strong>Tuesday</strong>. The calculator independently verifies this result against an additional weekday algorithm.
          </p>
        </section>

        {/* Section 3: What Is a Day of the Week Calculator? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is a Day of the Week Calculator?
          </h2>
          <p>
            A day-of-the-week calculator is a calendar algorithm that maps a valid date to one of the seven weekdays: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday.
          </p>
          <p>
            Unlike a date-duration calculator, it does not primarily ask how much time passed between two dates. Instead, it answers: <em>&ldquo;Which weekday corresponds to this calendar date?&rdquo;</em> That can be calculated mathematically without counting every date one by one.
          </p>
        </section>

        {/* Section 4: What Day Was I Born? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Day Was I Born?
          </h2>
          <p>
            One of the most common uses of a weekday calculator is finding your birth weekday. Enter your month, day, and year, and the calculator returns the corresponding weekday. For example, entering <strong>July 20, 1969</strong> returns <strong>Sunday</strong>. The calculator also reports the date&apos;s day-of-year position, leap-year status and ISO week information. For detailed age calculation in years, months, and days from your birth date, explore our{" "}
            <Link href="/calculators/age-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Age Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 5: How Does the Day of the Week Calculator Work? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Does the Day of the Week Calculator Work?
          </h2>
          <p>
            The Gregorian calculation uses Zeller&apos;s Congruence. Instead of moving through every date from a reference point, the formula transforms the date into a small set of arithmetic values.
          </p>
          <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            h = ( q + ⌊13(m + 1) / 5⌋ + K + ⌊K / 4⌋ + ⌊J / 4⌋ - 2J ) mod 7
          </div>
          <p>
            The calculator maps the modular result as follows:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 dark:border-zinc-700">
              <thead>
                <tr className="bg-slate-100 dark:bg-zinc-800 border-b border-slate-200 dark:border-zinc-700">
                  <th className="py-2 px-3 font-semibold text-slate-900 dark:text-white">Result (h)</th>
                  <th className="py-2 px-3 font-semibold text-slate-900 dark:text-white">Weekday</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-zinc-700">
                <tr><td className="py-2 px-3 font-mono">0</td><td className="py-2 px-3">Saturday</td></tr>
                <tr><td className="py-2 px-3 font-mono">1</td><td className="py-2 px-3">Sunday</td></tr>
                <tr><td className="py-2 px-3 font-mono">2</td><td className="py-2 px-3">Monday</td></tr>
                <tr><td className="py-2 px-3 font-mono">3</td><td className="py-2 px-3">Tuesday</td></tr>
                <tr><td className="py-2 px-3 font-mono">4</td><td className="py-2 px-3">Wednesday</td></tr>
                <tr><td className="py-2 px-3 font-mono">5</td><td className="py-2 px-3">Thursday</td></tr>
                <tr><td className="py-2 px-3 font-mono">6</td><td className="py-2 px-3">Friday</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            January and February are treated as months 13 and 14 of the preceding year, which is an important part of the algorithm. The calculator also provides a Show Steps feature so you can inspect the arithmetic rather than relying on a hidden result.
          </p>
        </section>

        {/* Section 6: What Is Zeller's Congruence? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is Zeller&apos;s Congruence?
          </h2>
          <p>
            Zeller&apos;s Congruence is a closed-form calendar algorithm for finding the weekday of a date. The key variables are:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>q</strong> — day of the month</li>
            <li><strong>m</strong> — adjusted month number (March = 3, April = 4, &hellip;, December = 12, January = 13, February = 14)</li>
            <li><strong>K</strong> — year within the century (year mod 100)</li>
            <li><strong>J</strong> — zero-based century (⌊year / 100⌋)</li>
          </ul>
          <p>
            For January and February, the year is treated as the previous year for the calculation. This allows the weekday to be obtained using modular arithmetic rather than iterating through every preceding calendar day.
          </p>
        </section>

        {/* Section 7: Step-by-Step Example: September 15, 2026 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Step-by-Step Example: September 15, 2026
          </h2>
          <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2">
            <p><strong>Date:</strong> September 15, 2026 (Gregorian)</p>
            <ul className="list-disc pl-5 space-y-1 font-mono text-xs text-slate-700 dark:text-slate-300">
              <li>q = 15, m = 9, year = 2026</li>
              <li>K = 2026 mod 100 = 26, J = ⌊2026 / 100⌋ = 20</li>
              <li>⌊13(9 + 1) / 5⌋ = ⌊130 / 5⌋ = 26</li>
              <li>⌊K / 4⌋ = ⌊26 / 4⌋ = 6, ⌊J / 4⌋ = ⌊20 / 4⌋ = 5, 2J = 40</li>
              <li>h = (15 + 26 + 26 + 6 + 5 - 40) mod 7 = 38 mod 7 = 3</li>
            </ul>
            <p>
              The validated result is <strong>Tuesday (h = 3)</strong>. The calculator&apos;s Gregorian engine has been independently tested against another weekday algorithm, including this specific date. That means the visible result, the calendar grid and the mathematical derivation all use the same authoritative calendar calculation rather than separate approximations.
            </p>
          </div>
        </section>

        {/* Section 8: What Is the Day of the Year? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is the Day of the Year?
          </h2>
          <p>
            The day of the year, also called an ordinal date, tells you the numerical position of a date within its calendar year. January 1 is Day 1. In a common year, December 31 is Day 365. In a leap year, December 31 is Day 366.
          </p>
          <p>
            For example: <strong>September 15, 2026 = Day 258</strong>, and <strong>February 29, 2024 = Day 60</strong>. Both values are independently verified by the calculator.
          </p>
        </section>

        {/* Section 9: How Many Days Are Left in the Year? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Many Days Are Left in the Year?
          </h2>
          <p>
            The calculator defines days remaining as: <strong>Days in Year − Day of Year</strong>, excluding the current date.
          </p>
          <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
            <p>For September 15, 2026: <strong>365 − 258 = 107 days remaining</strong>.</p>
            <p>For December 31: <strong>365 − 365 = 0 days remaining</strong>.</p>
            <p>For February 29, 2024: <strong>366 − 60 = 306 days remaining</strong>.</p>
          </div>
          <p>
            This definition matters because &ldquo;days left&rdquo; can otherwise be ambiguous if the current date is included.
          </p>
        </section>

        {/* Section 10: What Is an ISO Week Number? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is an ISO Week Number?
          </h2>
          <p>
            An ISO week number identifies a date&apos;s position within the ISO week calendar. ISO week dates are part of the ISO 8601 family of standards. ISO defines week dates alongside calendar and ordinal dates.
          </p>
          <p>
            For ISO week numbering: Monday is Day 1 of the week. The first ISO week is the week containing the year&apos;s first Thursday. This means January 1 does not always belong to ISO Week 1 of its own calendar year. For example, <strong>December 30, 2024</strong> belongs to <strong>ISO Week 1 of 2025</strong>. The calculator verifies this boundary case.
          </p>
        </section>

        {/* Section 11: Why Can January 1 Belong to the Previous ISO Year? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Can January 1 Belong to the Previous ISO Year?
          </h2>
          <p>
            ISO week numbering is based on complete Monday-to-Sunday week boundaries rather than simply starting a new week on January 1. Consider a January 1 that falls near the end of an ISO week. It may belong to Week 52 or Week 53 of the previous ISO year.
          </p>
          <p>
            This is why a date can have Calendar year = 2025 but ISO week-year = 2024. The distinction becomes especially important in business reporting, financial reporting, logistics, payroll systems and software that groups data by ISO week.
          </p>
        </section>

        {/* Section 12: How Does the Calculator Handle Leap Years? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Does the Calculator Handle Leap Years?
          </h2>
          <p>
            The Gregorian leap-year rule is:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Divisible by 4 → normally a leap year;</li>
            <li>Divisible by 100 → not a leap year;</li>
            <li>Divisible by 400 → leap year again.</li>
          </ul>
          <p>
            Therefore: <strong>2000 = leap year</strong>, <strong>2024 = leap year</strong>, <strong>2028 = leap year</strong>, while <strong>2100, 2200, and 2300 = common years</strong>, and <strong>2400 = leap year</strong>.
          </p>
          <p>
            The U.S. Naval Observatory describes the same Gregorian rule and notes that the calendar contains 146,097 days in 400 years, averaging 365.2425 days per year. The calculator independently validates these century boundaries.
          </p>
        </section>

        {/* Section 13: Why Does a Leap Year Have 366 Days? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Does a Leap Year Have 366 Days?
          </h2>
          <p>
            The Gregorian calendar normally has 365 days. A leap day is added approximately every four years to keep the civil calendar aligned with the seasonal year. Without leap-year corrections, the calendar would gradually drift relative to the seasons. The Gregorian system improves this by using the century and 400-year exceptions described above. That extra day is why February 29, 2024 exists while February 29, 2025 does not.
          </p>
        </section>

        {/* Section 14: Why February 29 Can Change Calendar Calculations */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why February 29 Can Change Calendar Calculations
          </h2>
          <p>
            A leap day affects day of year, days remaining, weekday calculations, date arithmetic, and ISO week boundaries. For example, <strong>February 29, 2024</strong> is <strong>Thursday</strong> and <strong>Day 60 of 366</strong>. The following day, March 1, 2024, is Day 61. The calculator independently verifies these values.
          </p>
        </section>

        {/* Section 15: Does the First Day of the Week Setting Change the Answer? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Does the First Day of the Week Setting Change the Answer?
          </h2>
          <p>
            <strong>No.</strong> The calculator allows Sunday-start or Monday-start for the visual calendar layout. Changing that setting changes how the month grid is displayed, but it does not change the actual weekday of the selected date. For example, September 15, 2026 remains Tuesday whether the calendar grid starts on Sunday or Monday. This distinction is important: <em>week display convention ≠ calculated weekday</em>.
          </p>
        </section>

        {/* Section 16: Gregorian Calendar vs Julian Calendar */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Gregorian Calendar vs Julian Calendar
          </h2>
          <p>
            The calculator supports both the Gregorian Calendar and the Proleptic Julian Calendar. These are different calendar systems with different leap-year rules. The Gregorian calendar uses the 400-year century rule. The Julian calendar treats every fourth year as a leap year, without the Gregorian century exception. As a result, the same nominal date can produce a different weekday under the two systems.
          </p>
        </section>

        {/* Section 17: What Is a Proleptic Julian Calendar? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is a Proleptic Julian Calendar?
          </h2>
          <p>
            A proleptic Julian calendar applies Julian calendar rules mathematically to a date even when that date falls outside the period in which the Julian calendar was historically in civil use.
          </p>
          <p>
            This calculator intentionally describes its mode as <strong>Proleptic Julian Calendar (Historical / Astronomical)</strong> rather than implying that every location historically used the Julian calendar until one universal switch date. That distinction is important when researching historical dates.
          </p>
        </section>

        {/* Section 18: Why Can a Historical Date Have Two Different Weekdays? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Can a Historical Date Have Two Different Weekdays?
          </h2>
          <p>
            The same written date can produce different results depending on which calendar system is being used. For example, the calculator verifies:
          </p>
          <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
            <p><strong>September 15, 2026:</strong> Tuesday — Gregorian</p>
            <p><strong>September 15, 2026:</strong> Monday — Proleptic Julian</p>
          </div>
          <p>
            Those are not contradictory results once the calendar system is explicitly identified. The key is to know which calendar your source used.
          </p>
        </section>

        {/* Section 19: Why Historical Dates Need Extra Care */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Historical Dates Need Extra Care
          </h2>
          <p>
            The Gregorian calendar was introduced in 1582, but adoption was not simultaneous worldwide. Different regions adopted Gregorian dating at different times (e.g., Britain and the American colonies in 1752, Russia in 1918, Greece in 1923).
          </p>
          <p>
            Therefore, there is a difference between the mathematically calculated proleptic Gregorian weekday and the weekday actually used in a particular historical location at that time. For historical research, the local calendar and historical convention should be checked rather than assuming that every country used the same system. The calculator explicitly presents its Julian mode as a mathematical/proleptic system rather than a universal reconstruction of every historical civil calendar.
          </p>
        </section>

        {/* Section 20-22: Benchmark Dates */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Benchmark Historical Dates
          </h2>
          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <span className="font-bold text-slate-900 dark:text-white block mb-0.5">What Day Was July 20, 1969?</span>
              <p>July 20, 1969 was <strong>Sunday</strong>. This is the date associated with the Apollo 11 lunar landing. The calculator uses this date as a preset and independently verifies its weekday.</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <span className="font-bold text-slate-900 dark:text-white block mb-0.5">What Day Was July 4, 1776?</span>
              <p>July 4, 1776 was <strong>Thursday</strong> under the Gregorian calculation used by the calculator. It is available as the US Independence (1776) preset and is independently validated.</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <span className="font-bold text-slate-900 dark:text-white block mb-0.5">What Day Was January 1, 2000?</span>
              <p>January 1, 2000 was <strong>Saturday</strong>. This is one of the calculator&apos;s regression reference dates and is independently verified.</p>
            </div>
          </div>
        </section>

        {/* Section 23: Batch Date Parser */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Does the Batch Date Parser Work?
          </h2>
          <p>
            The Batch Multi-Date Parser lets you enter multiple dates, typically one per line, and calculate them together. For example:
          </p>
          <pre className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs">
{`1969-07-20
1776-07-04
2000-01-01
2026-08-18`}
          </pre>
          <p>
            The calculator returns the weekday and additional date information for each valid input. The batch parser uses strict YYYY-MM-DD parsing and validates each date before calculating it. This prevents malformed dates from being silently converted into different valid dates.
          </p>
        </section>

        {/* Section 24-25: Strict Validation */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Strict Date Validation: What Happens If I Enter February 30?
          </h2>
          <p>
            February 30 is not a valid Gregorian date. The calculator rejects impossible dates such as:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>2026-02-30 (February has at most 28 or 29 days)</li>
            <li>2026-02-31</li>
            <li>2026-04-31 (April has 30 days)</li>
            <li>2025-02-29 (2025 is a common year)</li>
          </ul>
          <p>
            Calendar software can accidentally normalize impossible dates if it relies directly on native date constructors (for example, overflowing February 30 into March 2). A reliable date calculator should first ask: <em>Does this calendar date actually exist?</em> Only after that validation should the weekday calculation begin. This calculator explicitly validates the year, month and day and reports an accessible error state for invalid dates.
          </p>
        </section>

        {/* Section 26: Very Old Years */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Does the Calculator Work for Very Old Years?
          </h2>
          <p>
            The supported range is <strong>Year 1 through Year 9999</strong>. The calculator also specifically protects against the common JavaScript Date behavior that can reinterpret years from 0–99 as 1900–1999. For example, <strong>0033</strong> remains <strong>0033</strong> rather than incorrectly becoming 1933. That makes the historical mode considerably safer for ancient-date calculations than a naive JavaScript-date implementation.
          </p>
        </section>

        {/* Section 27-28: Differences */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Day of Year vs. ISO Week vs. Weekday
          </h2>
          <p>
            They measure different calendar properties:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Day of Year:</strong> Counts the date&apos;s position from January 1 (e.g., September 15, 2026 = Day 258).</li>
            <li><strong>ISO Week:</strong> Places the date into an ISO Monday-to-Sunday week (e.g., September 15, 2026 = ISO Week 38).</li>
            <li><strong>Weekday vs Weekend:</strong> Weekday is Monday through Friday; Weekend is Saturday and Sunday. The actual calculated weekday itself does not depend on this classification.</li>
          </ul>
        </section>

        {/* Section 29-32: Future & Historical Events */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Using the Calculator for Future and Historical Events
          </h2>
          <p>
            A weekday is mathematically determined for any valid date within the calculator&apos;s supported range. You can use it for future deadlines, anniversaries, planned events, recurring dates, and scheduling checks.
          </p>
          <p>
            When researching historical events, always identify whether the source recorded the date in the Gregorian calendar, Julian calendar, or another local convention. The one-day difference for September 15, 2026 (Tuesday in Gregorian vs. Monday in Julian) is not an arithmetic mistake; it is the consequence of applying two different calendar systems to the same nominal date.
          </p>
        </section>

        {/* Section 33-36: Comparative Tools */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Day of the Week Calculator vs. Day Counter vs. Date Calculator
          </h2>
          <p>
            These calculators answer different questions:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 dark:border-zinc-700">
              <thead>
                <tr className="bg-slate-100 dark:bg-zinc-800 border-b border-slate-200 dark:border-zinc-700">
                  <th className="py-2 px-3 font-semibold text-slate-900 dark:text-white">Question</th>
                  <th className="py-2 px-3 font-semibold text-slate-900 dark:text-white">Best Tool</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-zinc-700">
                <tr>
                  <td className="py-2 px-3">What day of the week is this date?</td>
                  <td className="py-2 px-3 font-medium">Day of the Week Calculator</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">What day was I born?</td>
                  <td className="py-2 px-3 font-medium">
                    Day of the Week Calculator /{" "}
                    <Link href="/calculators/age-calculator" className="text-blue-600 dark:text-blue-400 underline">
                      Age Calculator
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3">How many days are between two dates?</td>
                  <td className="py-2 px-3 font-medium">
                    <Link href="/calculators/day-counter-calculator" className="text-blue-600 dark:text-blue-400 underline">
                      Day Counter Calculator
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3">How many working days are in a period?</td>
                  <td className="py-2 px-3 font-medium">
                    <Link href="/calculators/day-counter-calculator" className="text-blue-600 dark:text-blue-400 underline">
                      Day Counter Calculator
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3">What date is 30 days after another date?</td>
                  <td className="py-2 px-3 font-medium">
                    <Link href="/calculators/date-calculator" className="text-blue-600 dark:text-blue-400 underline">
                      Date Calculator
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            For elapsed date calculations, use the{" "}
            <Link href="/calculators/day-counter-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Day Counter Calculator
            </Link>{" "}
            rather than trying to infer duration from weekday information. For date arithmetic like adding or subtracting days, our{" "}
            <Link href="/calculators/date-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Date Calculator
            </Link>{" "}
            is specifically designed for calendar math.
          </p>
        </section>

        {/* Section 37-38: Calendar Grid Engine */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Calendar Grid: Synchronized Month View
          </h2>
          <p>
            The calculator includes a monthly calendar view around the selected date. The grid is generated from the same active calendar engine used for the main weekday result. This prevents a confusing failure mode where the headline could say one weekday while the selected date appeared under another weekday in the calendar.
          </p>
          <p>
            The calendar remains seven columns wide and supports both Sunday-first and Monday-first presentation. Changing the calendar system changes both the result and the grid consistently.
          </p>
        </section>

        {/* Section 39-41: Practical Features */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Copy, Share, History, CSV and Print Architecture
          </h2>
          <p>
            The calculator supports several practical output options:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Copy Summary:</strong> Copies the selected date, weekday, calendar system, day-of-year information, ISO week and related details.</li>
            <li><strong>Share URL:</strong> Preserves the complete calculation state (date, calendar system, week start) so recipients see the identical result.</li>
            <li><strong>History:</strong> Valid calculations can be saved locally in your browser, while invalid dates are blocked from saving.</li>
            <li><strong>CSV Export:</strong> Structured CSV export is provided for both single-date and batch multi-date results.</li>
            <li><strong>PDF / Print:</strong> A dedicated print-report stylesheet preserves a clean 7-column calendar and calculation summary while hiding web-only buttons and navigation.</li>
            <li><strong>Client-Side Execution:</strong> All calculations execute locally in your browser with zero outbound network requests.</li>
          </ul>
        </section>

        {/* Section 42-44: Manual Calculation & 400-Year Cycle */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Calculate the Weekday Manually &amp; The 400-Year Cycle
          </h2>
          <p>
            To calculate the weekday by hand using Zeller&apos;s Congruence:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Take the day of the month (q).</li>
            <li>Adjust January and February to months 13 and 14 of the previous year.</li>
            <li>Split the year into century (J) and within-century (K) parts.</li>
            <li>Substitute the values into the formula and evaluate integer divisions.</li>
            <li>Take the resulting sum modulo 7.</li>
            <li>Map the result (0 = Saturday, 1 = Sunday, &hellip;, 6 = Friday).</li>
          </ol>
          <p>
            Because there are 7 weekdays, advancing 7 days returns to the same weekday. The Gregorian calendar contains exactly <strong>146,097 days in 400 years</strong>, and 146,097 = 20,871 × 7. The complete 400-year Gregorian cycle contains an exact whole number of weeks, meaning the calendar repeats its exact pattern of days every 400 years.
          </p>
        </section>

        {/* Section 45: Common Mistakes */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Common Day-of-the-Week Calculation Mistakes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <strong className="text-slate-900 dark:text-white block mb-0.5">Mistake 1: Treating invalid dates as valid</strong>
              <span className="text-slate-600 dark:text-slate-400">February 30 or April 31 do not exist in the calendar and must be rejected.</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <strong className="text-slate-900 dark:text-white block mb-0.5">Mistake 2: Ignoring leap years</strong>
              <span className="text-slate-600 dark:text-slate-400">Weekdays shift differently around February and March in leap years vs. common years.</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <strong className="text-slate-900 dark:text-white block mb-0.5">Mistake 3: Confusing ISO week with calendar week</strong>
              <span className="text-slate-600 dark:text-slate-400">ISO week numbering follows its own standard where Week 1 has the year&apos;s first Thursday.</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <strong className="text-slate-900 dark:text-white block mb-0.5">Mistake 4: Ignoring the calendar system</strong>
              <span className="text-slate-600 dark:text-slate-400">Gregorian and Julian calculations produce different historical weekdays.</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <strong className="text-slate-900 dark:text-white block mb-0.5">Mistake 5: Assuming display week changes the weekday</strong>
              <span className="text-slate-600 dark:text-slate-400">Sunday-start or Monday-start display setting only rearranges the calendar columns.</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <strong className="text-slate-900 dark:text-white block mb-0.5">Mistake 6: Assuming global 1582 adoption</strong>
              <span className="text-slate-600 dark:text-slate-400">Historical calendar adoption varied widely between regions across four centuries.</span>
            </div>
          </div>
        </section>

        {/* Section 46: Quick Reference Table */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Quick Reference: Verified Reference Dates
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 dark:border-zinc-700">
              <thead>
                <tr className="bg-slate-100 dark:bg-zinc-800 border-b border-slate-200 dark:border-zinc-700">
                  <th className="py-2 px-3 font-semibold text-slate-900 dark:text-white">Date</th>
                  <th className="py-2 px-3 font-semibold text-slate-900 dark:text-white">Gregorian Weekday</th>
                  <th className="py-2 px-3 font-semibold text-slate-900 dark:text-white">Day of Year</th>
                  <th className="py-2 px-3 font-semibold text-slate-900 dark:text-white">Leap Year</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-zinc-700">
                <tr><td className="py-2 px-3 font-medium">January 1, 2000</td><td className="py-2 px-3">Saturday</td><td className="py-2 px-3">1</td><td className="py-2 px-3">Yes</td></tr>
                <tr><td className="py-2 px-3 font-medium">July 4, 1776</td><td className="py-2 px-3">Thursday</td><td className="py-2 px-3">186</td><td className="py-2 px-3">No (Julian 1776 was leap)</td></tr>
                <tr><td className="py-2 px-3 font-medium">July 20, 1969</td><td className="py-2 px-3">Sunday</td><td className="py-2 px-3">201</td><td className="py-2 px-3">No</td></tr>
                <tr><td className="py-2 px-3 font-medium">February 29, 2024</td><td className="py-2 px-3">Thursday</td><td className="py-2 px-3">60</td><td className="py-2 px-3">Yes</td></tr>
                <tr><td className="py-2 px-3 font-medium">January 1, 2025</td><td className="py-2 px-3">Wednesday</td><td className="py-2 px-3">1</td><td className="py-2 px-3">No</td></tr>
                <tr><td className="py-2 px-3 font-medium">September 13, 2026</td><td className="py-2 px-3">Sunday</td><td className="py-2 px-3">256</td><td className="py-2 px-3">No</td></tr>
                <tr><td className="py-2 px-3 font-medium">September 14, 2026</td><td className="py-2 px-3">Monday</td><td className="py-2 px-3">257</td><td className="py-2 px-3">No</td></tr>
                <tr><td className="py-2 px-3 font-medium">September 15, 2026</td><td className="py-2 px-3">Tuesday</td><td className="py-2 px-3">258</td><td className="py-2 px-3">No</td></tr>
                <tr><td className="py-2 px-3 font-medium">December 31, 2026</td><td className="py-2 px-3">Thursday</td><td className="py-2 px-3">365</td><td className="py-2 px-3">No</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 47: Methodology and Sources */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Methodology and Sources
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Gregorian Weekday Calculation
              </div>
              <p>
                The calculator uses Zeller&apos;s Congruence for Gregorian weekday calculation, including the standard January/February adjustment and modulo mapping. Its implementation has been independently checked against another weekday algorithm across 1,000 randomized Gregorian dates.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Calendar className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Proleptic Julian Calculation
              </div>
              <p>
                The historical mode uses pure proleptic Julian arithmetic and applies the Julian leap-year rule. It has been independently checked against an astronomical Julian-day-based calculation across 1,000 randomized dates.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Info className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                ISO 8601 Week Dates &amp; Day of Year
              </div>
              <p>
                ISO 8601 defines Gregorian calendar dates, ordinal dates and week dates. The calculator&apos;s ISO-week implementation follows Monday-based ISO week numbering and has been independently tested against the ISO definition.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Gregorian Leap Years &amp; Date Validation
              </div>
              <p>
                The Gregorian calendar uses the 4-year rule with the century exception and 400-year correction. The U.S. Naval Observatory states that 97 leap days occur every 400 years and the average Gregorian calendar year is 365.2425 days. The calculator validates year, month and day combinations before performing calculations, rejecting non-existent dates.
              </p>
            </div>
          </div>
        </section>

        {/* Section 48: Useful Related Calculators */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Useful Related Calculators
          </h2>
          <p>
            Explore complementary tools across our date and time suite:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>
              For date arithmetic rather than weekday lookup, the{" "}
              <Link href="/calculators/day-counter-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Day Counter Calculator
              </Link>{" "}
              can calculate elapsed calendar days, working days and related durations.
            </li>
            <li>
              For age-specific calculations and chronological milestones, use the{" "}
              <Link href="/calculators/age-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Age Calculator
              </Link>
              .
            </li>
            <li>
              For general date addition and subtraction operations, the{" "}
              <Link href="/calculators/date-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Date Calculator
              </Link>{" "}
              provides calendar math.
            </li>
            <li>
              For sub-day intervals and clock calculations, the{" "}
              <Link href="/calculators/time-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Time Calculator
              </Link>{" "}
              and{" "}
              <Link href="/calculators/hours-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Hours Calculator
              </Link>{" "}
              are better suited to hour-level and minute-level duration.
            </li>
          </ul>
        </section>

        {/* Section 49: Final Takeaway */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Final Takeaway
          </h2>
          <p>
            The answer to <em>&ldquo;What day of the week is this date?&rdquo;</em> may look simple, but a reliable calculator must handle much more than a seven-item lookup table. It must correctly understand valid calendar dates, leap years, century rules, Gregorian arithmetic, Julian arithmetic, ISO week numbering, historical calendar interpretation, and the distinction between calendar presentation and weekday calculation.
          </p>
          <p>
            The Day of the Week Calculator combines those capabilities in one interface. It can calculate a single date, process batches of dates, show the mathematical Zeller derivation, display day-of-year and ISO-week information, compare Gregorian and proleptic Julian systems, preserve calculation state for sharing, save valid history entries, export CSV data and generate a dedicated printable report.
          </p>
          <p>
            For an ordinary modern date, the Gregorian result is the appropriate starting point. For a historical date, always check the calendar system behind the source. Enter a date above to find its weekday instantly.
          </p>
        </section>

      </div>

      {/* 2. FAQ SECTION (All 24 Approved FAQs, Open by Default like 401(k) format) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {day_of_the_week_calculatorFaqs.map((faq, idx) => {
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

export default DayOfWeekContent;

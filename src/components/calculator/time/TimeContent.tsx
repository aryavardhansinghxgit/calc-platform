"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck } from "lucide-react";
import { time_calculatorFaqs } from "@/app/calculators/time-calculator/faq";

export function TimeContent() {
  // All 12 FAQs open by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 12 }, (_, i) => i))
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
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-6 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. SINGLE CANONICAL RELATED CALCULATORS BLOCK (Exactly 7 Verified Live Routes) */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          Related Date &amp; Time Calculators
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/calculators/date-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Date Calculator
          </Link>
          <Link
            href="/calculators/age-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Age Calculator
          </Link>
          <Link
            href="/calculators/time-duration-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Time Duration Calculator
          </Link>
          <Link
            href="/calculators/hours-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Hours Calculator
          </Link>
          <Link
            href="/calculators/day-counter-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Day Counter Calculator
          </Link>
          <Link
            href="/calculators/time-zone-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Time Zone Calculator
          </Link>
          <Link
            href="/calculators/time-card-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Time Card Calculator
          </Link>
        </div>
      </div>

      {/* 2. 15 LONG-FORM EDUCATIONAL SECTIONS */}
      <div className="space-y-6 pt-6 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is a Time Calculator?
          </h2>
          <p>
            A time calculator converts, adds, subtracts and interprets durations expressed in days, hours, minutes and seconds. Unlike ordinary decimal arithmetic, time uses a sexagesimal structure: 60 seconds make a minute and 60 minutes make an hour. A useful calculator therefore has to normalize carries and borrows instead of simply adding decimal-looking numbers. This Time Calculator extends the basic operation into four workflows: duration arithmetic, date-time shifting, expression parsing, and work-duration tracking. That makes it useful for everyday calculations such as combining task durations, finding an end time, evaluating a multi-term expression, or turning a work shift into paid hours.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How to Add Time Correctly
          </h2>
          <p>
            To add two time durations, the calculator converts each duration to a common unit—seconds—then combines the signed totals and converts the result back into normalized days, hours, minutes and seconds. The core conversion is:
          </p>
          <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-sans tabular-nums text-xs sm:text-sm text-center">
            {"Total Seconds = (Days × 86,400) + (Hours × 3,600) + (Minutes × 60) + Seconds"}
          </div>
          <p>
            For example, 4 hours 45 minutes 50 seconds plus 3 hours 25 minutes 30 seconds equals 29,480 seconds, which normalizes to 8 hours 11 minutes 20 seconds. The same process handles carries automatically: 80 seconds becomes 1 minute 20 seconds, and 71 minutes becomes 1 hour 11 minutes.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. How to Subtract Time and Borrow Across Units
          </h2>
          <p>
            Subtraction works on the same total-seconds representation, but the final normalized result may be negative. In a manual calculation, borrowing is the familiar rule: if the seconds in the first duration are smaller than the seconds being subtracted, borrow one minute (60 seconds); if the remaining minutes are too small, borrow one hour (60 minutes). For example, 5 hours 15 minutes 10 seconds minus 2 hours 40 minutes 35 seconds equals 2 hours 34 minutes 35 seconds. A robust calculator should preserve a signed result rather than wrapping a negative duration around a 24-hour clock. For standalone duration intervals between specific times, explore our{" "}
            <Link
              href="/calculators/time-duration-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Time Duration Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Decimal Hours, Total Minutes and Total Seconds
          </h2>
          <p>
            A duration can be represented in several equivalent forms. To convert $H$ hours, $M$ minutes and $S$ seconds into decimal hours, use:
          </p>
          <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-sans tabular-nums text-xs sm:text-sm text-center">
            {"Decimal Hours = Hours + (Minutes / 60) + (Seconds / 3,600)"}
          </div>
          <p>
            The validated example 8 hours 11 minutes 20 seconds becomes approximately 8.1889 decimal hours. Decimal hours are particularly useful for timesheets and payroll because 30 minutes is 0.5 hours, not 0.30 hours. The calculator also reports total minutes and total seconds, allowing the same duration to be checked from multiple perspectives.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Why Time Uses Base-60 Instead of Base-100
          </h2>
          <p>
            Time uses a sexagesimal, or base-60, structure for hours, minutes and seconds. Because 60 has many divisors (1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60), fractions such as halves, thirds, quarters, fifths and sixths can be represented cleanly in minute-based subdivisions. The historical reasons for the widespread use of base-60 are associated with ancient Mesopotamian mathematical traditions. For calculator users, the practical consequence is simpler: decimal intuition can be misleading. 1.5 hours is 1 hour 30 minutes, while 1.30 hours means 1 hour 18 minutes if interpreted as a decimal number of hours.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Adding or Subtracting Time From a Date
          </h2>
          <p>
            A duration can be shifted from a starting date and timestamp to find a target date and time. The calculator models this as an elapsed-duration shift using UTC-based timestamp arithmetic. For example, August 23, 2026 at 10:30 AM plus 1 day 5 hours 30 minutes produces August 24, 2026 at 4:00 PM. Because the engine uses UTC arithmetic rather than local-browser offset arithmetic, the model intentionally treats a 24-hour shift as exactly 86,400 seconds. This is an important distinction from calendar applications that apply local-time rules around daylight-saving transitions. To calculate calendar intervals between two calendar dates, use our{" "}
            <Link
              href="/calculators/date-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Date Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Calendar Dates, Leap Years and Midnight Crossings
          </h2>
          <p>
            Date calculations must respect actual calendar structure rather than treating every month as the same length. January 31 plus one day becomes February 1; February 28 plus one day becomes February 29 in a leap year; February 29 plus one day becomes March 1. Midnight crossings also require date-aware behavior: 11:30 PM plus two hours becomes 1:30 AM on the following calendar date. These rules are separate from ordinary duration arithmetic and should not be conflated with assumptions such as every month containing 30 days. For counting elapsed days or business days between dates, visit our{" "}
            <Link
              href="/calculators/day-counter-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Day Counter Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. 12-Hour and 24-Hour Time: AM, PM and Midnight
          </h2>
          <p>
            In 12-hour notation, 12:00 AM represents midnight and corresponds to 00:00 in a 24-hour clock; 12:00 PM represents noon and corresponds to 12:00. The transition around noon and midnight is a common source of manual errors. For example, 11:59 AM plus one minute is 12:00 PM, while 11:59 PM plus one minute is 12:00 AM on the next calendar day. The calculator supports 12-hour and 24-hour display modes while keeping the underlying time value the same.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. How the Expression Parser Works
          </h2>
          <p>
            The expression parser lets users write multi-term duration expressions such as &ldquo;1d 2h 3m 4s + 4h 5s - 2030s + 28h.&rdquo; The parser recognizes supported day, hour, minute and second units, converts each token to signed seconds, and accumulates the expression left to right. In the validated example, the total is 206,959 seconds, or 2 days 9 hours 29 minutes 19 seconds, equivalent to approximately 57.4886 decimal hours. This makes the calculator useful when a duration contains several additions and subtractions that would be tedious to normalize by hand.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Work Hours, Breaks and Overnight Shifts
          </h2>
          <p>
            The Work Duration &amp; Tracker mode converts clock-in and clock-out times into elapsed paid time. If the end time is earlier than the start time, the engine treats the interval as an overnight shift by adding 24 hours before subtracting the unpaid break. For a 9:00 AM to 5:30 PM shift with a 30-minute unpaid break, the gross duration is 8.5 hours and paid time is 8.0 hours. For a 10:00 PM to 6:00 AM shift with a 30-minute break, the gross duration is 8 hours and paid time is 7.5 hours. The calculator then estimates gross earnings as paid hours &times; hourly wage. For recurring weekly timesheet schedules, see our{" "}
            <Link
              href="/calculators/time-card-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Time Card Calculator
            </Link>{" "}
            and{" "}
            <Link
              href="/calculators/hours-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Hours Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Time Zones, UTC and Daylight Saving Time
          </h2>
          <p>
            Coordinated Universal Time (UTC) is an internationally agreed time scale used as the basis for global timekeeping, while local civil times are represented as offsets from UTC. NIST explains that UTC itself is not adjusted for daylight saving time; local time zones may change their offset from UTC when DST begins or ends. This calculator uses UTC-based date shifting for deterministic elapsed-duration calculations, so it should not be described as a named-time-zone conversion tool. Its behavior is intentionally different from software that asks for a specific location and applies local DST rules. For converting clock times between world cities and named time zones, use our{" "}
            <Link
              href="/calculators/time-zone-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Time Zone Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. What a Second Actually Means
          </h2>
          <p>
            The SI second is the base unit used to define time intervals in the International System of Units. NIST describes the second using the fixed cesium-133 transition frequency of 9,192,631,770 hertz. This matters to a calculator mainly because hours, minutes and days are built from standardized seconds for duration arithmetic. It is not necessary for ordinary time addition, but it explains why the unit conversion behind the calculator can be expressed precisely in seconds.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Common Time-Calculation Mistakes
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>
              <strong>Confusing Decimal Hours with Minutes:</strong> 4.5 hours equals 4 hours 30 minutes, not 4 hours 50 minutes. To convert decimal minutes to regular minutes, multiply the decimal fraction by 60 (e.g. 0.75 &times; 60 = 45 minutes).
            </li>
            <li>
              <strong>Forgetting Rollover Carries:</strong> Forgetting to carry 60 seconds into a minute or 60 minutes into an hour produces invalid sums like &ldquo;4 hours 85 minutes.&rdquo;
            </li>
            <li>
              <strong>Overnight Shift Subtraction:</strong> Mishandling midnight when subtracting an overnight shift (e.g. subtracting 10:00 PM from 6:00 AM directly yields a negative value unless 24 hours is added to the morning time).
            </li>
            <li>
              <strong>Clock Time vs. Elapsed Duration:</strong> Confusing clock time with elapsed duration: 2:00 PM to 4:00 PM is a 2-hour interval, not the difference between the numbers 4 and 2 under every possible date context.
            </li>
          </ul>
        </section>

        {/* Section 14 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Time Calculator Use Cases for Work, Projects and Everyday Planning
          </h2>
          <p>
            Time arithmetic is useful for payroll and timesheets, project schedules, travel and transit planning, task tracking, exercise intervals, study schedules, production timelines and countdown calculations. The decimal-hours output is particularly useful when a payroll or project system expects hours as a decimal number, while the H:MM:SS representation is easier for humans to read. The date-shift mode is useful when a task has an exact elapsed duration, while the work tracker is useful when a shift has a start time, end time and unpaid break. To determine chronological milestones and age differences, check our{" "}
            <Link
              href="/calculators/age-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Age Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Calculation Methodology, Limits and Disclaimer
          </h2>
          <p>
            The calculator&apos;s core duration model converts time components to total seconds, applies addition or subtraction, and normalizes the signed result into days, hours, minutes and seconds. Date-time shifting uses UTC-based timestamp arithmetic, so the result represents an exact elapsed-duration shift rather than location-specific civil-time scheduling. The expression parser tokenizes supported time units and accumulates signed second values from left to right. Work duration detects overnight crossing, subtracts unpaid breaks, clamps paid time at zero, and calculates gross earnings from paid hours and hourly wage. Displayed decimal values are rounded to the selected precision. These outputs are mathematical calculations from the inputs you provide; they are not legal, payroll-compliance, contractual-deadline, travel, or official timekeeping determinations.
          </p>
        </section>
      </div>

      {/* 3. FAQ SECTION (12 Canonical Approved FAQs, Open by Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {time_calculatorFaqs.map((faq, idx) => {
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

      {/* 4. METHODOLOGY & DISCLAIMER */}
      <div className="pt-6 space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
          <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            Methodology
          </div>
          <p>
            The calculator uses exact integer-second arithmetic for duration math, UTC-based timestamp shifting for date mode, signed-token accumulation for expressions, and elapsed-minute calculations for work tracking. The presentation layer may round decimal outputs, but rounding should not be applied repeatedly to the underlying computation. The page should make clear that named time-zone conversion, official payroll compliance, contractual deadlines, legal timekeeping requirements and government time determinations require their own domain-specific sources or systems.
          </p>
        </div>

        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
          <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            Disclaimer
          </div>
          <p>
            This tool provides mathematical estimates and transformations based on the input values and the calculator&apos;s defined model. Important payroll, employment, legal, travel, scheduling or contractual decisions should be checked against the applicable official rules, employer policies, calendar system and time-zone data.
          </p>
        </div>
      </div>
    </article>
  );
}

export default TimeContent;

"use client";

import React from "react";
import Link from "next/link";

export function TimeDurationContent() {
  return (
    <article className="text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      
      {/* 1. INTRODUCTION & CORE PRINCIPLES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Time Duration Calculator: Calculate Elapsed Time Precisely
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Knowing how much time has passed sounds simple until the start and end values cross an hour, midnight, a date boundary, or several separate time intervals. Subtracting 8:30 AM from 5:30 PM is straightforward, but calculations become less obvious when the interval is 10:45:50 PM to 1:20:15 AM, when dates span several days, or when a total duration must be assembled from several separate tasks. A reliable time duration calculator solves these problems by treating time as a sequence of precisely measured intervals rather than simply subtracting the visible clock numbers. This calculator allows you to work with same-day times, dates and times across different calendar days, and multiple time segments that need to be added together. It also presents the result in several useful units so the same duration can be understood as hours, minutes, seconds, or decimal hours.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          At the foundation of every duration calculation is the second. The Bureau International des Poids et Mesures (BIPM) identifies the second, symbol s, as the SI base unit for time, and NIST describes the second as the standard unit underlying modern time measurement. Larger everyday units are built from it: one minute contains 60 seconds, one hour contains 60 minutes or 3,600 seconds, and one 24-hour day contains 86,400 seconds. These relationships make it possible to convert a complicated time interval into one common unit, perform the arithmetic reliably, and then convert the answer back into a human-readable format.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The calculator is particularly useful because it separates clock time from elapsed duration. A clock tells you the position of a particular moment in a day, while a duration tells you the amount of time between two moments. NIST makes the same conceptual distinction in its explanation of time measurement: clocks are used to determine time intervals separating events. That distinction matters when two times appear numerically reversed. For example, 2:00 AM occurs numerically before 10:00 PM on a clock, but 10:00 PM followed by 2:00 AM represents a four-hour overnight interval.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          This calculator therefore handles the problem in the way people actually encounter it. You can calculate how long a work shift lasted, determine the length of a sleep period, measure the duration between two appointments, total several project tasks, calculate study time, check travel duration, or convert a duration into decimal hours for timesheets and payroll. The tool is designed to keep the arithmetic transparent by exposing the component hours, minutes, and seconds instead of returning only one opaque number.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          For related calculations, the <Link href="/calculators/time-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Time Calculator</Link> is useful when you need to perform broader time arithmetic, while the <Link href="/calculators/hours-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Hours Calculator</Link> is a natural choice when your main goal is working with working hours or hourly totals. When the calculation depends primarily on two calendar dates rather than clock times, the <Link href="/calculators/date-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Date Calculator</Link> provides the corresponding date-focused analysis. A <Link href="/calculators/time-card-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Time Card Calculator</Link> is better suited to collecting several employee work periods and calculating payroll-oriented totals.
        </p>
      </section>

      {/* 2. HOW TO CALCULATE DURATION & SEXAGESIMAL BORROWING */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          How to Calculate the Duration Between Two Times
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The basic elapsed-time problem is defined as:
        </p>
        
        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 font-mono text-center text-sm sm:text-base font-bold text-blue-700 dark:text-blue-300">
          End Time − Start Time = Elapsed Duration
        </div>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The arithmetic looks simple, but clocks are not ordinary decimal numbers. Hours are divided into minutes using base 60, and minutes are divided into seconds using base 60. That means a result such as 8 hours and 75 minutes is not a valid normalized duration; it must become 9 hours and 15 minutes. A properly designed calculator therefore performs the subtraction and then normalizes the result so that minutes and seconds remain within their normal ranges.
        </p>

        <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 space-y-2 text-xs sm:text-sm">
          <span className="font-bold text-slate-900 dark:text-white block text-sm sm:text-base">
            Standard Direct Subtraction Example:
          </span>
          <p className="text-slate-600 dark:text-slate-300">
            <strong>Start:</strong> 8:30 AM &nbsp;|&nbsp; <strong>End:</strong> 5:30 PM
          </p>
          <p className="text-slate-600 dark:text-slate-300 font-mono text-xs">
            1. Convert to 24-hour time: 08:30 → 17:30<br />
            2. Subtract: 17:30 − 08:30 = 09:00<br />
            3. Result: 9 hours, 0 minutes, 0 seconds (9.0000 decimal hours | 540 total minutes | 32,400 total seconds)
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-xs">
            Conversion verification: 9 × 60 = 540 minutes; 540 × 60 = 32,400 seconds.
          </p>
        </div>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          This method becomes more important when minutes or seconds require borrowing. Suppose the start time is 9:58 and the end time is 1:57 PM. The visible minute values are reversed because 57 is smaller than 58. The solution is not to declare the result negative. Instead, one hour (60 minutes) is borrowed from the ending hour:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-3">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">Minute Borrowing (13:57 − 09:58):</span>
            <div className="font-mono text-xs bg-slate-50 dark:bg-slate-800 p-2.5 rounded border border-slate-200 dark:border-slate-700">
              &nbsp;&nbsp;1:57 PM (13:57) → 12:117<br />
              - 09:58 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;→ - 09:58<br />
              -------------------------<br />
              &nbsp;&nbsp;03:59 (3 hours, 59 minutes)
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">Second & Minute Borrowing (10:30:15 − 08:45:50):</span>
            <div className="font-mono text-xs bg-slate-50 dark:bg-slate-800 p-2.5 rounded border border-slate-200 dark:border-slate-700">
              1. Borrow 1 min for seconds: 10:29:75<br />
              2. 75s − 50s = 25s<br />
              3. Borrow 1 hr for minutes: 09:89:75<br />
              4. 09:89:75 − 08:45:50 = 1h 44m 25s
            </div>
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          This is known as sexagesimal arithmetic, because minutes and seconds operate in a base-60 system. The calculator&apos;s step-by-step borrowing logic is valuable because it makes this normally hidden process visible.
        </p>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          There is another practical issue: 12-hour clock notation contains two special boundary values. 12:00 AM represents midnight, while 12:00 PM represents noon. The two values must not be treated as ordinary 12-hour integers. In 24-hour notation:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-center">
          <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">12:00 AM = 00:00</div>
          <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">12:00 PM = 12:00</div>
          <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">1:00 PM = 13:00</div>
          <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">11:59 PM = 23:59</div>
        </div>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Converting to a continuous 24-hour representation before calculating the difference prevents accidental inversion errors. For everyday time calculations, the important rule is therefore not merely &quot;subtract the hours.&quot; The reliable process is to place both moments on the same time scale, account for minutes and seconds using base-60 arithmetic, handle any day rollover explicitly, normalize the result, and only then convert it into other units.
        </p>
      </section>

      {/* 3. SAME-DAY, OVERNIGHT AND MIDNIGHT CALCULATIONS */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Same-Day, Overnight and Midnight Calculations
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          A same-day calculation assumes that both times belong to the same calendar date. This is the simplest situation, but it still requires correct handling of AM/PM and the 12-hour clock. An overnight calculation is different because the ending clock value may appear numerically smaller than the starting clock value even though the elapsed duration is positive.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          For example, consider an interval from <strong>10:00 PM</strong> to <strong>2:00 AM</strong>. It would be incorrect to calculate <code>2 − 22 = −20 hours</code>. The correct interpretation is that the interval continues through midnight. From 10:00 PM to midnight is two hours, and from midnight to 2:00 AM is another two hours (<code>2 + 2 = 4 hours</code>).
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The boundary becomes even more important when seconds are included. Consider <strong>11:59:50 PM → 12:00:10 AM</strong>. The interval crosses midnight, but the actual elapsed time is only <strong>20 seconds</strong>. A calculation that ignores the day transition may incorrectly generate a large negative value. A calculator designed for real-world use identifies the rollover automatically when its rules indicate that the ending moment occurs on the following day.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The same principle applies when the exact times are identical. A start time of 8:00 AM and an end time of 8:00 AM on the same day represents a duration of <strong>0 hours</strong>. But 8:00 AM on August 27 to 8:00 AM on August 28 represents <strong>24 hours</strong>. The clock values are identical; the dates are not. This is why a cross-date calculator needs a genuine calendar model rather than merely comparing hour and minute fields.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Date transitions also create special cases at the end of a month and around leap years. For example, an interval from February 28 to February 29 is possible in a leap year (such as 2024 or 2028) but not in an ordinary year. The Gregorian calendar rules therefore matter whenever a duration crosses a calendar boundary. Similarly, across New Year (December 31, 11:59 PM → January 1, 12:01 AM), the elapsed duration is <strong>2 minutes</strong>, even though the displayed calendar date, month, and year all change.
        </p>
      </section>

      {/* 4. ADDING MULTIPLE TIME INTERVALS */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Adding Multiple Time Intervals
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Many real-world time calculations are not about one start and one end. Instead, you may have several separate periods that need to be combined. A student might record 1 hour 45 minutes of study in the morning, 2 hours 30 minutes in the afternoon, and 55 minutes 30 seconds in the evening. An employee might have several work sessions separated by unpaid breaks. A project manager may record the duration of several tasks that must be totaled into one project-time figure.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          This is what the Multi-Segment Time Adder is designed to solve. Suppose the intervals are:
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-mono space-y-1.5">
          <div>Segment 1: 1h 45m 00s</div>
          <div>Segment 2: 2h 30m 00s</div>
          <div>Segment 3: 0h 55m 30s</div>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
            • Sum Seconds: 0 + 0 + 30 = 30s<br />
            • Sum Minutes: 45 + 30 + 55 = 130m → (130m = 2h 10m)<br />
            • Sum Hours: 1 + 2 + 0 + 2h = 5h<br />
            → <strong>Final Total: 5h 10m 30s</strong> (5.175 decimal hours | 310.5 total minutes | 18,630 total seconds | 21.6% solar day)
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The underlying mathematical invariant is straightforward:
        </p>
        
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-300">
          Total Seconds = (Hours × 3,600) + (Minutes × 60) + Seconds
        </div>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          For this example: <code>(5 × 3,600) + (10 × 60) + 30 = 18,000 + 600 + 30 = 18,630 seconds</code>. A trustworthy time calculator distinguishes between component values and cumulative totals. The displayed seconds field in a normalized result is 30 (the remaining seconds), while the total number of elapsed seconds is 18,630. Those are different measurements and should never be confused.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The Multi-Segment mode also calculates the average duration of the segments. If three segments total 5h 10m 30s, the average segment duration is <code>18,630s ÷ 3 = 6,210s = 1h 43m 30s</code>. This becomes useful when analyzing repeated tasks, training sessions, study blocks, production cycles, or work intervals.
        </p>
      </section>

      {/* 5. DECIMAL HOURS, MINUTES AND SECONDS CONVERSIONS */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Decimal Hours, Minutes and Seconds: Understanding the Conversions
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          A duration can be represented in several mathematically equivalent ways, but those representations should not be confused. One of the most common mistakes is treating a value such as 5.30 hours as though it meant 5 hours 30 minutes. It does not.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Decimal hours use ordinary base-10 fractions, while minutes and seconds use base-60 units. The exact formula is:
        </p>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-300">
          Decimal Hours = Hours + (Minutes / 60) + (Seconds / 3,600)
        </div>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          For <strong>5h 10m 30s</strong>, the calculation is <code>5 + 10/60 + 30/3,600 = 5 + 0.1666667 + 0.0083333 = 5.175 hours</code>. In contrast, <strong>5.30 decimal hours</strong> means <code>5 hours + (0.30 × 60 minutes) = 5 hours 18 minutes</code>.
        </p>

        <div className="overflow-x-auto my-3">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                <th className="py-2 px-2.5 font-semibold">Unit Interval</th>
                <th className="py-2 px-2.5 font-semibold">Total Hours</th>
                <th className="py-2 px-2.5 font-semibold">Total Minutes</th>
                <th className="py-2 px-2.5 font-semibold">Total Seconds</th>
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
      </section>

      {/* 6. APPLICATIONS IN WORK, STUDY, TRAVEL AND EVERYDAY PLANNING */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Time Duration in Work, Study, Travel and Everyday Planning
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Elapsed-time calculations appear in almost every schedule-based activity because people usually plan around intervals rather than isolated clock readings:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc list-inside">
          <li><strong>Work Shifts &amp; Timesheets:</strong> A shift from 8:30 AM to 5:30 PM spans 9 hours. If a 1-hour unpaid lunch break occurs, using the <Link href="/calculators/time-card-calculator" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">Time Card Calculator</Link> or Multi-Segment Adder determines the billable 8.0-hour total accurately.</li>
          <li><strong>Study &amp; Productivity Blocks:</strong> Combining targeted intervals (e.g. 1h 45m mathematics, 2h 30m physics, 55m 30s revision) preserves schedule granularity while totaling 5h 10m 30s.</li>
          <li><strong>Travel &amp; Flight Planning:</strong> Cross-date flights departing late evening (e.g., Oct 12 at 10:30 PM) and arriving two mornings later (Oct 14 at 6:15 AM) represent 1 day, 7 hours, and 45 minutes (31.75 decimal hours).</li>
          <li><strong>Sleep Tracking:</strong> Retiring at 11:15 PM and waking at 6:45 AM yields 7 hours and 30 minutes of elapsed sleep crossing the midnight boundary.</li>
          <li><strong>Hourly Contractor Invoicing:</strong> Working 4 hours and 30 minutes converts directly into <code>4.5 decimal hours</code>, eliminating payroll rounding disputes.</li>
        </ul>
      </section>

      {/* 7. COMMON TIME-DURATION CALCULATION MISTAKES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Common Time-Duration Calculation Mistakes
        </h2>
        <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <strong>1. Decimal minutes confusion:</strong> Treating 7.5 hours as 7 hours 50 minutes instead of 7 hours 30 minutes (0.5 × 60 = 30).
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <strong>2. 12 AM vs. 12 PM reversal:</strong> Confusing midnight (12:00 AM = 00:00) with noon (12:00 PM = 12:00).
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <strong>3. Ignoring overnight midnight rollovers:</strong> Subtracting 10:00 PM from 2:00 AM without adding 24 hours produces invalid negative results.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <strong>4. Overlooking seconds during borrowing:</strong> Subtracting :50s from :15s directly instead of borrowing 60 seconds (75s − 50s = 25s).
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <strong>5. Non-normalized duration outputs:</strong> Presenting &quot;4 hours 75 minutes 90 seconds&quot; instead of normalizing to 5 hours 16 minutes 30 seconds.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <strong>6. Remainder vs. cumulative seconds confusion:</strong> Reporting 30 seconds instead of 18,630 total elapsed seconds in cumulative intervals.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <strong>7. Fixed month-length assumptions:</strong> Assuming all months have 30 days rather than calculating exact calendar days and leap years (Feb 28 vs Feb 29).
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <strong>8. Same-time date confusion:</strong> 8:00 AM to 8:00 AM on the same date is 0 hours, whereas across consecutive days it represents 24 hours.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <strong>9. Premature rounding:</strong> Rounding 5.175 hours to 5.2 hours before converting to minutes alters 310.5 minutes into 312 minutes.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <strong>10. Using the wrong tool:</strong> Using a calendar date counter for clock times or an intraday clock for multi-week spans.
          </div>
        </div>
      </section>

      {/* 8. FORMULA REFERENCE */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Formula Reference
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Basic Elapsed Time</span>
            Duration = End Date/Time − Start Date/Time
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Total Seconds Conversion</span>
            Total Seconds = (Hours × 3,600) + (Minutes × 60) + Seconds
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Decimal Hours</span>
            Decimal Hours = Total Seconds ÷ 3,600
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Total Minutes</span>
            Total Minutes = Total Seconds ÷ 60
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">24-Hour Solar Day Standard</span>
            1 Day = 24 Hours = 1,440 Minutes = 86,400 Seconds
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Normalization Invariant</span>
            0 ≤ Seconds &lt; 60 &nbsp;|&nbsp; 0 ≤ Minutes &lt; 60
          </div>
        </div>
      </section>

    </article>
  );
}

export default TimeDurationContent;

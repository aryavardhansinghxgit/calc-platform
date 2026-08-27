"use client";

import React from "react";
import Link from "next/link";

export function HoursContent() {
  return (
    <article className="text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. WHAT IS AN HOURS CALCULATOR */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. What Is an Hours Calculator?
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          An hours calculator determines the elapsed time between two times or timestamps and converts the result into useful units such as hours, minutes, seconds, and decimal hours. Unlike a simple subtraction exercise, a calendar-aware time calculator must account for AM/PM conversion, midnight rollover, date changes, unpaid breaks, and, in some modes, multiple calendar days. The goal is to produce a consistent numeric duration without forcing users to manually convert every time into minutes before doing the arithmetic.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          The current calculator goes beyond a single start-and-end field. It provides <strong>Hours Between Two Times</strong> for intraday calculations, <strong>Hours Between Two Dates</strong> for multi-day durations, and a <strong>Time Card &amp; Overtime Solver</strong> for separating regular and overtime hours. That combination makes the page useful for everyday time tracking as well as more structured work-hour planning. For general clock calculations, explore the{" "}
          <Link href="/calculators/time-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Time Calculator
          </Link>.
        </p>
      </div>

      {/* 2. HOW TO CALCULATE HOURS BETWEEN TWO TIMES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. How to Calculate Hours Between Two Times
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          For ordinary intraday work, convert both clock times into a common minute-based representation, subtract the start from the end, apply an overnight rollover when required, subtract any unpaid break minutes, and divide by 60 to display decimal hours. For the validated baseline, 8:30 AM to 5:30 PM is 9 hours, which is 540 minutes and 32,400 seconds.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          Using a common minute representation avoids mistakes caused by treating AM and PM as separate numeric values. It also makes the calculation easy to verify independently. The calculator follows the same core principle but wraps it in time-format parsing, rollover handling, and the configured break rules. To measure elapsed duration between precise moments, visit the{" "}
          <Link href="/calculators/time-duration-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Time Duration Calculator
          </Link>.
        </p>
      </div>

      {/* 3. DECIMAL HOURS VS. HOURS AND MINUTES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Decimal Hours vs. Hours and Minutes
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Decimal hours and clock-style hours and minutes are not interchangeable formats. One decimal hour equals 60 minutes, so 0.30 hours equals 18 minutes, while 0.50 hours equals 30 minutes and 0.75 hours equals 45 minutes. This means 8.30 decimal hours represents 8 hours and 18 minutes, not 8 hours and 30 minutes.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          This distinction matters in payroll, spreadsheets, and time-entry systems. A user who enters 8 hours 30 minutes should normally enter 8.50 decimal hours if the receiving system expects decimal time. The calculator&apos;s conversion outputs make this relationship explicit so that users can compare clock notation with decimal notation without guessing.
        </p>
      </div>

      {/* 4. CONVERTING MINUTES TO DECIMAL HOURS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          4. Converting Minutes to Decimal Hours
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          To convert minutes to decimal hours, divide the number of minutes by 60. For example, 15 minutes is 0.25 hours, 30 minutes is 0.50 hours, 45 minutes is 0.75 hours, and 18 minutes is 0.30 hours. For a mixed value, 8 hours 18 minutes becomes 8 + 18/60 = 8.30 hours.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          The same method works in reverse. Multiply the decimal fraction by 60 to recover the minutes. Thus 7.75 hours contains 0.75 × 60 = 45 minutes, giving 7 hours and 45 minutes. Because payroll and time-tracking systems often use decimal hours, learning this conversion is one of the most practical uses of an hours calculator.
        </p>
      </div>

      {/* 5. OVERNIGHT SHIFT CALCULATIONS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          5. Overnight Shift Calculations
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Overnight shifts are a common source of errors because the clock-out time may be numerically earlier than the clock-in time. A 10:15 PM start followed by a 6:45 AM end should not be interpreted as a negative duration. Instead, the end timestamp belongs to the following calendar day. The validated example produces 8 hours 30 minutes before a 45-minute unpaid break and 7 hours 45 minutes, or 7.75 decimal hours, after the deduction.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          The important rule is that overnight rollover is a calendar adjustment, not a change to the meaning of the clock. The time 6:45 AM remains 6:45 AM; the calculation simply recognizes that the end occurs on the next date. This same logic applies to shorter midnight crossings such as 11:30 PM to 12:30 AM. For weekly work shifts, see the{" "}
          <Link href="/calculators/time-card-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Time Card Calculator
          </Link>.
        </p>
      </div>

      {/* 6. UNPAID BREAK DEDUCTIONS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          6. Unpaid Break Deductions
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          When a break is unpaid, the break duration should be subtracted from the raw elapsed shift time before paid hours are reported. A 9-hour shift with a 30-minute unpaid break becomes 8.5 paid hours. A 60-minute unpaid break reduces the same shift to 8 paid hours. The calculator keeps the break in minutes so that deductions remain exact and easy to audit.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          A break longer than the raw shift must be handled safely rather than producing an unexplained negative paid duration. The validated engine uses defensive handling for edge conditions, clamping net hours to zero. Whether a particular break is legally required to be unpaid is a separate employment-law question and can vary by jurisdiction and classification.
        </p>
      </div>

      {/* 7. HOURS BETWEEN TWO DATES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          7. Hours Between Two Dates
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          For multi-day calculations, the tool measures the elapsed time across the calendar span rather than assuming that the duration is only one workday. The validated reference example runs from August 24, 2026 at 8:30 AM to August 29, 2026 at 5:30 PM and reports 129 total hours, or 5 days and 9 hours. That corresponds to 7,740 minutes and 464,400 seconds.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          This mode is useful for long project spans, travel intervals, multi-day events, on-call periods, and other situations where the total elapsed duration crosses calendar dates. It should not be confused with business-day counting: 129 calendar hours is an elapsed-time quantity, while working hours depend on schedules, weekends, breaks, and other rules. For calendar date intervals, consult the{" "}
          <Link href="/calculators/date-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Date Calculator
          </Link>.
        </p>
      </div>

      {/* 8. TIME CARD AND OVERTIME CALCULATIONS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          8. Time Card and Overtime Calculations
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The Time Card &amp; Overtime Solver separates total worked time into regular and overtime portions using the configured daily overtime threshold and multiplier. In the validated baseline, 9 hours worked with an 8-hour threshold produces 8 regular hours and 1 overtime hour. At a $25 hourly rate with a 1.5x multiplier, regular earnings are $200 and overtime earnings are $37.50, for $237.50 estimated gross earnings.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          This is an arithmetic model. It does not by itself determine whether a worker is legally entitled to overtime, which employees are exempt, or which threshold applies under local law. The calculator&apos;s settings let users model a chosen threshold and multiplier, while official payroll treatment must follow the employer&apos;s policy and applicable law.
        </p>
      </div>

      {/* 9. OVERTIME THRESHOLDS AND MULTIPLIERS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          9. Overtime Thresholds and Multipliers
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          An overtime threshold defines how many hours remain in the regular bucket before additional hours are treated as overtime in the calculator&apos;s model. With an 8-hour threshold, 7 hours remains entirely regular, 8 hours contains no modeled overtime, and 9 hours produces 8 regular plus 1 overtime hour. The multiplier then controls the modeled overtime rate. A 1.5x multiplier turns a $20 base wage into a $30 overtime rate.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          The calculator can therefore be used to compare scenarios such as 1.25x, 1.5x, and 2.0x, but these values should be treated as user-selected assumptions. Payroll law can use weekly thresholds, daily thresholds, double-time rules, collective bargaining terms, or exemptions that differ from the simple model used by a calculator.
        </p>
      </div>

      {/* 10. 12-HOUR VS. 24-HOUR TIME */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          10. 12-Hour vs. 24-Hour Time
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The 12-hour clock divides the day into two 12-hour periods, AM and PM. Midnight is 12:00 AM, while noon is 12:00 PM. The 24-hour clock represents the day continuously from 00:00 through 23:59, so 5:30 PM becomes 17:30 and 10:15 PM becomes 22:15. The 24-hour representation removes AM/PM ambiguity and is especially useful for calculations involving overnight shifts.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          The calculator accepts 12-hour values with AM/PM selections and internally normalizes them for arithmetic. Users can therefore enter familiar clock notation while still receiving exact minute-based duration results. The two systems describe the same civil time; the difference is representation, not a different duration. If scheduling across time zones, check the{" "}
          <Link href="/calculators/time-zone-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Time Zone Calculator
          </Link>.
        </p>
      </div>

      {/* 11. HOURS IN A DAY, WEEK, MONTH AND YEAR */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          11. Hours in a Day, Week, Month and Year
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          A standard day contains 24 hours and a seven-day week contains 168 hours. Calendar months do not all contain the same number of days: a 28-day February has 672 hours, a 29-day leap-year February has 696, a 30-day month has 720, and a 31-day month has 744. These are exact calendar totals for the named month lengths.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          The reference table below also shows average month and year figures. An average month of about 30.4375 days corresponds to 730.5 hours, while an average Gregorian year of about 365.25 days corresponds to 8,766 hours. These average values are useful reference figures, not substitutes for actual calendar intervals. When a calculation concerns specific dates, use the actual dates rather than an average month or average year.
        </p>

        {/* Hours Reference Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 dark:border-slate-800 rounded-lg">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700">
                <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Time Interval</th>
                <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Total Hours</th>
                <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Notes / Basis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2 px-3 font-medium">Hours in a Day</td>
                <td className="py-2 px-3 font-bold text-blue-600 dark:text-blue-400">24 hrs</td>
                <td className="py-2 px-3">1 full earth rotation (1,440 minutes)</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Hours in a Week</td>
                <td className="py-2 px-3 font-bold text-blue-600 dark:text-blue-400">168 hrs</td>
                <td className="py-2 px-3">7 days × 24 hours</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Hours in a Month</td>
                <td className="py-2 px-3 font-mono">
                  672 hrs (28-day Feb)<br />
                  696 hrs (29-day leap Feb)<br />
                  720 hrs (30-day month)<br />
                  744 hrs (31-day month)<br />
                  <strong>730.5 hrs (Average)</strong>
                </td>
                <td className="py-2 px-3">Varies by calendar month length (30.4375 average days)</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Hours in a Year</td>
                <td className="py-2 px-3 font-mono">
                  8,760 hrs (365-day year)<br />
                  8,784 hrs (366-day leap year)<br />
                  <strong>8,766 hrs (Average)</strong>
                </td>
                <td className="py-2 px-3">Mean Gregorian solar year (365.2425 days × 24h)</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Hours in a Decade</td>
                <td className="py-2 px-3 font-mono">
                  87,648 hrs (2 leap years)<br />
                  87,672 hrs (3 leap years)<br />
                  <strong>87,660 hrs (Average)</strong>
                </td>
                <td className="py-2 px-3">10 consecutive calendar years</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Hours in a Century</td>
                <td className="py-2 px-3 font-bold text-indigo-600 dark:text-indigo-400">876,600 hrs</td>
                <td className="py-2 px-3">100 Gregorian years (including 24 leap years)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 12. HOURS, PAYROLL TIME AND DAY-COUNT CONVENTIONS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          12. Hours, Payroll Time and Day-Count Conventions
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          An elapsed-hours calculator measures actual time between timestamps. Payroll systems can apply additional conventions: rounding rules, grace periods, break policies, overtime rules, shift premiums, weekly thresholds, and jurisdiction-specific requirements. Therefore a calculator result may differ from a payroll record even when the start and end times appear identical.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          The right interpretation is that the calculator provides a transparent arithmetic baseline. If an employer&apos;s timekeeping system uses a specific rounding increment or policy, that policy can change the reported payable time. Users should compare the calculator&apos;s assumptions with the employer&apos;s published timekeeping rules instead of assuming that one general formula is legally controlling. For chronological lifespan calculations, visit the{" "}
          <Link href="/calculators/age-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Age Calculator
          </Link>.
        </p>
      </div>

      {/* 13. COMMON MISTAKES WHEN CALCULATING HOURS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          13. Common Mistakes When Calculating Hours
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The most common errors are confusing decimal hours with minutes, forgetting overnight rollover, omitting unpaid-break deductions, and using a fixed assumption for multi-day periods. Another frequent mistake is subtracting clock numbers directly without first converting AM/PM values to a consistent numeric representation. For example, 8:30 AM to 5:30 PM is not obtained by simply calculating 17.5 - 8.5 unless those times have already been correctly converted to a 24-hour or equivalent numeric scale.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          A reliable workflow is: normalize the start and end timestamps, identify whether the end is on the same or next date, calculate raw elapsed minutes, apply configured unpaid breaks, then convert the final result into hours and minutes or decimal hours. The calculator automates that sequence. For simple day tallies, use the{" "}
          <Link href="/calculators/day-counter-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Day Counter Calculator
          </Link>.
        </p>
      </div>

      {/* 14. WORKED EXAMPLES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          14. Worked Examples
        </h2>
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Example 1: Standard Workday with Lunch Break
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Clock-in at <strong>8:30 AM</strong>, Clock-out at <strong>5:00 PM</strong>, with a <strong>30-minute unpaid lunch break</strong>.
            </p>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              • Convert to 24-hour: 08:30 to 17:00.<br />
              • Total elapsed time: 8 hours and 30 minutes (510 minutes).<br />
              • Subtract break: 510m - 30m = 480 minutes.<br />
              → <strong>Net Paid Time: 8 hours and 0 minutes (8.00 decimal hours)</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Example 2: Overnight Shift Crossing Midnight
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Clock-in at <strong>10:15 PM</strong>, Clock-out at <strong>6:45 AM</strong> the next morning, with a <strong>45-minute unpaid break</strong>.
            </p>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              • Convert to 24-hour: 22:15 to 06:45.<br />
              • Because 06:45 is earlier than 22:15, add 24 hours: 06:45 + 24h = 30:45.<br />
              • Raw difference: 30:45 - 22:15 = 8 hours and 30 minutes (510 minutes).<br />
              • Subtract break: 510m - 45m = 465 minutes.<br />
              → <strong>Net Paid Time: 7 hours and 45 minutes (7.75 decimal hours)</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 15. METHODOLOGY, PRIVACY AND LIMITATIONS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          15. Methodology, Privacy and Limitations
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong>Core methodology:</strong> Times are converted into a common minute-based representation; overnight cases apply a 24-hour rollover when the end belongs to the following date; unpaid break minutes are deducted before paid-time reporting; multi-day intervals incorporate the date span; decimal hours are derived from total minutes divided by 60; and timecard earnings are separated into regular and modeled overtime segments.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          The calculator is an educational and planning tool, not an official payroll system or legal decision engine. Overtime eligibility, paid-break rules, and working-time requirements differ by jurisdiction, employment classification, contract, and employer policy. All mathematical calculations execute locally in your browser, and saved history is stored in local browser storage when enabled on your device.
        </p>
      </div>
    </article>
  );
}

export default HoursContent;

"use client";

import React from "react";
import Link from "next/link";

export function DateContent() {
  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. WHAT IS A DATE CALCULATOR */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. What Is a Date Calculator?
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          A date calculator is a calendar-arithmetic tool that determines the interval between two dates or calculates a new date after adding or subtracting a specified duration. Instead of treating every month as 30 days or every year as 365 days, a calendar-aware calculator uses the actual Gregorian calendar structure: months have different lengths, February can contain 28 or 29 days, and leap years follow a specific rule. This makes a date calculator substantially more reliable for real calendar operations than simple multiplication by an assumed average month length.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          The current calculator combines three functions. The <strong>Days Between Two Dates</strong> mode measures an elapsed date interval. The <strong>Add or Subtract from a Date</strong> mode moves a starting date by years, months, weeks, and days. The <strong>Business &amp; Working Days</strong> mode counts workdays while accounting for weekends, configured holidays, and custom workweek settings. The same page can therefore serve simple personal planning needs and more structured scheduling scenarios.
        </p>
      </div>

      {/* 2. HOW DAYS BETWEEN TWO DATES ARE CALCULATED */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. How Days Between Two Dates Are Calculated
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Under the validated calculator convention, the standard date difference is an exclusive elapsed interval: the difference between August 24, 2026 and September 23, 2026 is 30 days. The calculator also supports an inclusive setting, which changes the count by including the configured end day. This distinction matters because everyday language such as &quot;between&quot; can be ambiguous when someone is counting active calendar dates rather than elapsed intervals.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          The safest practice is to identify the counting convention before interpreting a result. For example, January 1 to January 2 is one elapsed day under exclusive counting, but two calendar dates under inclusive counting. The calculator therefore exposes the convention instead of hiding it inside the result. This is especially useful for project schedules, notice periods, and deadline calculations where a policy may explicitly require inclusive or exclusive treatment. For simple day tallies, you can also consult the{" "}
          <Link href="/calculators/day-counter-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Day Counter Calculator
          </Link>.
        </p>
      </div>

      {/* 3. INCLUSIVE VS. EXCLUSIVE DATE COUNTING */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Inclusive vs. Exclusive Date Counting
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Exclusive date counting measures the elapsed interval between two dates. When the start and end dates are identical, the elapsed interval is zero. Inclusive counting treats both boundary dates as active counted days, so the same single-date interval can produce one day. For January 1 through January 2, exclusive counting produces one day while inclusive counting produces two counted dates.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          There is no universally correct choice independent of context. A mathematical elapsed duration normally uses exclusive difference, while a business or legal rule may define a counting period by explicitly including or excluding particular dates. The calculator explains that its <em>Include End Day</em> setting changes the mathematical convention, but users should follow the governing policy when a deadline, contract, filing period, or work schedule specifies its own counting rule. For sub-day interval breakdowns, explore the{" "}
          <Link href="/calculators/time-duration-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Time Duration Calculator
          </Link>.
        </p>
      </div>

      {/* 4. GREGORIAN CALENDAR AND LEAP-YEAR RULES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          4. Gregorian Calendar and Leap-Year Rules
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The Date Calculator uses Gregorian calendar logic. A Gregorian leap year is divisible by 4, except for century years that are not divisible by 400. Therefore 2028 is a leap year, 1900 is not, 2000 is, and 2100 is not. The 400-year rule prevents the simple statement that every fourth year is always a leap year from becoming misleading.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          Leap-year handling matters whenever a calculation crosses February. A date interval that crosses February 29 can differ by one day from an otherwise similar interval in a standard year. Long-range calculations also depend on the century rule, so a date engine should use calendar-aware leap-year logic rather than a crude every-four-years shortcut. The validated calculator explicitly handles 2000 and 2400 as leap years and 1900 and 2100 as non-leap years. For chronological lifespan calculations, visit the{" "}
          <Link href="/calculators/age-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Age Calculator
          </Link>.
        </p>
      </div>

      {/* 5. MONTH LENGTHS AND WHY MONTHS ARE NOT FIXED DURATIONS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          5. Month Lengths and Why Months Are Not Fixed Durations
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Calendar months contain 28, 29, 30, or 31 days. January, March, May, July, August, October, and December have 31 days; April, June, September, and November have 30; February has 28 in a standard year and 29 in a leap year. This is why &quot;add one month&quot; is not equivalent to &quot;add 30 days.&quot;
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          For example, adding one month to January 31 requires a month-end rule because February does not have a 31st day. The current calculator uses month-end clamping, so January 31 plus one month becomes February 28 in a standard year or February 29 in a leap year. This behavior is important enough to explain directly because users often assume that all month arithmetic is reversible or that one month always equals 30 days.
        </p>

        {/* Days in Month Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 dark:border-slate-800 rounded-lg">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700">
                <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Months</th>
                <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Standard Year Length</th>
                <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Leap Year Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2 px-3">Jan, Mar, May, Jul, Aug, Oct, Dec</td>
                <td className="py-2 px-3 font-medium">31 days</td>
                <td className="py-2 px-3 font-medium">31 days</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Apr, Jun, Sep, Nov</td>
                <td className="py-2 px-3 font-medium">30 days</td>
                <td className="py-2 px-3 font-medium">30 days</td>
              </tr>
              <tr>
                <td className="py-2 px-3">February</td>
                <td className="py-2 px-3 font-medium">28 days</td>
                <td className="py-2 px-3 font-medium text-blue-600 dark:text-blue-400">29 days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. ADDING AND SUBTRACTING DAYS, WEEKS, MONTHS AND YEARS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          6. Adding and Subtracting Days, Weeks, Months and Years
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Date arithmetic begins with a start date and applies the requested duration according to the calculator&apos;s defined operation order and month-end rules. Adding 30 calendar days to August 24, 2026 produces September 23, 2026 under the validated engine. Subtracting 30 days from the same date produces July 25, 2026. Weeks are exact multiples of seven calendar days, while months and years require calendar-aware handling because their lengths vary.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          Mixed durations deserve extra care. A request such as one year, two months, three weeks, and ten days cannot be treated as one fixed number of days because the year and month components depend on the calendar path. The calculator describes these inputs as calendar units rather than approximate time units. Where month-end clamping occurs, the result follows the documented convention and the page explains that this is intentional rather than a rounding error. For gestational timeline calculations, see the{" "}
          <Link href="/calculators/due-date-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Due Date Calculator
          </Link>.
        </p>
      </div>

      {/* 7. BUSINESS DAYS AND WORKING DAYS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          7. Business Days and Working Days
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Business-day calculations differ from ordinary calendar-day calculations because weekends and selected holidays are excluded from the working-day count. The calculator evaluates the calendar span day by day and classifies each date according to the selected workweek and holiday rules. In the validated baseline, August 24, 2026 through September 23, 2026 contains 30 calendar days, 21 working days, 8 weekend days, and one excluded holiday.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          This approach is more transparent than assuming a fixed ratio such as five business days for every seven calendar days. A date range can cross holidays, month boundaries, and custom weekend patterns, so the exact result depends on the dates and settings. The page calls the output a working-day or business-day calculation rather than imply that it represents every employer&apos;s official working schedule.
        </p>
      </div>

      {/* 8. U.S. FEDERAL HOLIDAYS AND OBSERVED DATES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          8. U.S. Federal Holidays and Observed Dates
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The calculator&apos;s U.S. holiday configuration tracks the 11 federal holidays established in 5 U.S.C. 6103, including New Year&apos;s Day, Martin Luther King Jr. Day, Washington&apos;s Birthday, Memorial Day, Juneteenth, Independence Day, Labor Day, Columbus Day, Veterans Day, Thanksgiving Day, and Christmas Day. The Office of Personnel Management (OPM) publishes the annual federal schedule and explains that when a federal holiday falls on a Saturday or Sunday, a corresponding in-lieu day is generally observed for federal employees working a Monday-through-Friday schedule.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          For 2026, OPM lists July 3 as the observed Independence Day holiday because July 4 falls on Saturday, while Labor Day is September 7. For 2027, OPM lists June 18 as the observed Juneteenth holiday and July 5 as the observed Independence Day holiday. The calculator follows its configured holiday dates consistently; users should not assume that a federal-employee observation rule is automatically identical to every private employer&apos;s or contract&apos;s holiday schedule.
        </p>
      </div>

      {/* 9. FLOATING HOLIDAYS AND HOLIDAY GENERATION */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          9. Floating Holidays and Holiday Generation
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Some federal holidays have fixed dates, while others are defined by a weekday rule. Martin Luther King Jr. Day is the third Monday in January, Washington&apos;s Birthday is the third Monday in February, Memorial Day is the last Monday in May, Labor Day is the first Monday in September, Columbus Day is the second Monday in October, and Thanksgiving is the fourth Thursday in November. The Office of Personnel Management publishes these legal definitions and the resulting annual schedules.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          A calendar engine that supports future years generates these floating holidays from their rules instead of copying one year&apos;s dates into every year. The validated Date Calculator does this algorithmically for holidays such as Memorial Day, Labor Day, and Thanksgiving. That matters because floating holidays move to different calendar dates from year to year. You can also determine which day of the week a milestone occurs using the{" "}
          <Link href="/calculators/day-of-the-week-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Day of the Week Calculator
          </Link>.
        </p>
      </div>

      {/* 10. CUSTOM WEEKEND SCHEDULES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          10. Custom Weekend Schedules
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          A business-day calculation is not universally Monday through Friday. The calculator supports custom weekend configurations such as Friday/Saturday or Sunday-only schedules, allowing the working-day model to better match nonstandard calendars. This is useful for organizations and users whose routine days off differ from the conventional Saturday/Sunday weekend.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          The important distinction is between the calculator&apos;s configurable mathematical schedule and an employer&apos;s actual policy. A custom weekend setting tells the engine which weekdays to exclude; it does not establish that an organization officially recognizes those days as non-working. Users should select the schedule that matches the rule they are modeling and verify any external deadline policy independently.
        </p>
      </div>

      {/* 11. COUNTING DAYS FOR DEADLINES AND NOTICE PERIODS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          11. Counting Days for Deadlines and Notice Periods
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Date calculations are often used for 30-day, 60-day, and 90-day notice periods, project milestones, lease dates, payroll cycles, and other deadlines. These use cases are precisely where inclusive versus exclusive counting can change the answer by one day. A date calculator can show the mathematical result under a selected convention, but the governing contract, statute, policy, or scheduling instruction may define whether the starting day counts, whether the end day counts, or whether weekends and holidays are excluded.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          For legal or contractual deadlines, the calculator should be treated as a planning aid rather than a legal determination. A clause may specify business days, calendar days, court days, or a jurisdiction-specific rule. The safest practice is to explain the mathematical convention used by the calculator and recommend checking the governing document whenever a deadline has legal or financial consequences.
        </p>
      </div>

      {/* 12. PRACTICAL USES FOR PROJECT MANAGEMENT AND SCHEDULING */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          12. Practical Uses for Project Management and Scheduling
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Project teams can use a date calculator to translate a planned duration into a target calendar date, compare calendar days with workdays, and account for weekends and holidays when setting milestones. A project that needs 20 working days may require more than 28 calendar days if holidays or nonstandard workweeks intervene. The same principle applies to sprint schedules, delivery windows, maintenance intervals, and implementation plans.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          Because the tool exposes the underlying dates and settings, it is more useful than a generic &quot;add 20 days&quot; shortcut when the schedule is sensitive to working days. Users can also switch between ordinary calendar arithmetic and business-day arithmetic without manually rebuilding the date range. For shift and operational time tracking, see the{" "}
          <Link href="/calculators/hours-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Hours Calculator
          </Link>.
        </p>
      </div>

      {/* 13. DATE CALCULATIONS FOR PAYROLL AND FINANCE */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          13. Date Calculations for Payroll and Finance
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Date intervals also occur in payroll, billing cycles, interest-accrual periods, subscription periods, and payment schedules. A calendar-day interval can be converted into exact hours, minutes, and seconds using fixed calendar-day units: one day is 24 hours, 1,440 minutes, or 86,400 seconds. The calculator&apos;s validated baseline converts 30 days to 720 hours, 43,200 minutes, and 2,592,000 seconds.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          Those conversions describe elapsed calendar days. They should not be confused with interest conventions such as actual/360, actual/365, 30/360, or institution-specific accrual rules. A financial agreement can use a contractual day-count convention that differs from simple elapsed-day arithmetic. The date calculator is a calendar calculation tool, not a universal financial accrual engine. For general clock and time math, use the{" "}
          <Link href="/calculators/time-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Time Calculator
          </Link>.
        </p>
      </div>

      {/* 14. WHY CALENDAR ARITHMETIC IS BETTER THAN FIXED-DAY ASSUMPTIONS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          14. Why Calendar Arithmetic Is Better Than Fixed-Day Assumptions
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          A shortcut such as &quot;one month equals 30 days&quot; can create errors whenever a calculation crosses a 31-day month, February, a leap year, or a month-end boundary. Likewise, treating a year as exactly 365 days can be wrong for date intervals that cross February 29. The calculator avoids these shortcuts by using actual calendar dates.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          The distinction becomes more important as the interval grows. Over a single week, a simple seven-day assumption is exact. Over multiple months or years, the actual placement of month boundaries and leap days matters. This is why calendar-aware computation is essential rather than presenting a date calculator as ordinary arithmetic over average time units.
        </p>
      </div>

      {/* 15. METHODOLOGY, PRIVACY AND LIMITATIONS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          15. Methodology, Privacy and Limitations
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong>Core methodology:</strong> Date intervals are calculated from the selected start and end dates under the configured inclusive/exclusive convention. Date offsets apply calendar years, months, weeks, and days using the engine&apos;s month-end rules. Business-day calculations evaluate dates against the selected workweek and holiday set. Unit conversions then derive weeks, hours, minutes, and seconds from the discrete calendar-day interval. The validated engine also calculates day-of-week information and the percentage of the solar year using a documented denominator (365.2425 average Gregorian calendar days).
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          The calculator is an educational and scheduling model, not a legal deadline determination, court-date calculator, employer payroll policy, or official government scheduling authority. Holiday schedules can vary by jurisdiction and organization. Federal holiday observation rules are specifically defined for federal employees and may not match private-sector calendars. All calculations are performed entirely in your browser, and saved history is stored locally on your device when enabled.
        </p>
      </div>
    </article>
  );
}

export default DateContent;

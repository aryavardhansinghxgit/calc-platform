"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck } from "lucide-react";
import { age_calculatorFaqs } from "@/app/calculators/age-calculator/faq";

export function AgeContent() {
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
            href="/calculators/time-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Time Calculator
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

      {/* 2. 18 LONG-FORM EDUCATIONAL SECTIONS */}
      <div className="space-y-6 pt-6 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is an Age Calculator?
          </h2>
          <p>
            An age calculator determines a person&apos;s chronological age from a birth date and an assessment date. When the assessment date is today, the result answers the familiar question &ldquo;How old am I?&rdquo; When a different date is entered, the same calculation can show how old someone was in the past or how old they will be on a future date. A calendar age is normally expressed as completed years, followed by remaining months and days. This is different from simply subtracting birth years because the exact birthday and the lengths of the intervening months matter. Current age-calculator search results emphasize this years-months-days format as the primary result, with total days and birthday countdowns commonly offered as supporting outputs.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How Exact Age in Years, Months and Days Is Calculated
          </h2>
          <p>
            The calculator uses calendar arithmetic rather than a fixed &ldquo;365 days per year&rdquo; shortcut. It determines complete years between the birth date and target date, then complete months after the last whole-year boundary, and finally the remaining days. When the target day is earlier than the birth-day component, the algorithm borrows the actual number of days in the preceding calendar month. That is why a date interval can contain a different number of days than the same number of nominal years multiplied by 365. The validated Age Calculator baseline, January 1, 2000 to August 23, 2026, produces 26 years, 7 months and 22 days, with 9,731 total elapsed days.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Why You Cannot Calculate Exact Age by Using Years &times; 365
          </h2>
          <p>
            A simple approximation such as age &times; 365 ignores leap days and therefore drifts over longer periods. Gregorian calendar years normally contain 365 days, but leap years contain 366. Over a multi-decade interval, several leap days can occur. Months create a second source of variation because they have 28, 29, 30 or 31 days. A calendar-based age calculation therefore needs the actual start and target dates. The difference between a calendar age and a total-day count is not a contradiction: they are two valid representations of the same interval, with years/months/days preserving calendar structure and total days expressing the interval in one uniform unit. For precise clock-time arithmetic and sexagesimal conversions, explore our{" "}
            <Link
              href="/calculators/time-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Time Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. How Calendar Borrowing Works
          </h2>
          <p>
            When the target day is smaller than the birth day, the calculator borrows a month before calculating the remaining days. The borrowed month contributes its actual length. For example, in the validated example from May 24, 1998 to August 15, 2026, the target day 15 is smaller than 24, so the calculation borrows July&apos;s 31 days: (15 + 31) &minus; 24 = 22 days. The month component becomes (8 &minus; 1) &minus; 5 = 2 months, and the final age is 28 years, 2 months and 22 days. This is why a robust age calculator must know the length of the relevant calendar month rather than assuming 30 days.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Month-End Rules and Why January 31 Can Be Special
          </h2>
          <p>
            The calculator supports two explicit month-end behaviors. In Sequential mode, January 31 to February 28 can produce 0 months and 28 days because February 28 is not treated as the same nominal day-of-month. In End-of-Month Anchor mode, two month-end dates can be treated as one month and zero days. This distinction matters for age and date-duration software because &ldquo;one month later&rdquo; is not a fixed number of seconds or days. The important SEO point is that the calculator discloses its month-end convention instead of hiding an implementation assumption.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Leap Years and February 29 Birthdays
          </h2>
          <p>
            The Gregorian leap-year rule is: a year divisible by 4 is a leap year unless it is a century year that is not divisible by 400. Therefore 2000 is a leap year, 1900 is not, 2004 is, and 2100 is not. February 29 introduces a second issue for age calculation: a person born on February 29 reaches non-leap years without an actual February 29 calendar date. This calculator exposes a setting that determines whether the non-leap-year birthday is recognized on February 28 or March 1. That setting changes age/countdown behavior and should be understood as a calculation convention, not a universal legal rule.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. How to Calculate Age on a Specific Date
          </h2>
          <p>
            The second date field is important when the answer depends on an eligibility or assessment date rather than today. You can calculate age on a past date—for example, a historical event—or a future date such as a planned birthday, application deadline or milestone. The mathematically relevant question is always: what is the person&apos;s chronological age as of the selected date? Several current age-calculator competitors similarly support an explicit &ldquo;age as of&rdquo; or target date because it makes the calculation useful for forms and cut-off dates. To shift calendar dates by exact increments or find future milestones, use our{" "}
            <Link
              href="/calculators/date-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Date Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Total Days, Weeks, Hours, Minutes and Seconds Lived
          </h2>
          <p>
            The same calendar interval can be expressed in smaller units. For the validated baseline, 9,731 elapsed days equals 233,544 hours, 14,012,640 minutes and 840,758,400 seconds. These conversions are exact under the calculator&apos;s elapsed-day model: 1 day = 24 hours, 1 hour = 60 minutes and 1 minute = 60 seconds. Total-unit values are useful for milestones and comparisons, but they should not replace the years-months-days representation when the question is a person&apos;s conventional chronological age. For counting elapsed days or business day intervals between two dates, check our{" "}
            <Link
              href="/calculators/day-counter-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Day Counter Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Next Birthday, Birthday Weekday and Half-Birthday
          </h2>
          <p>
            The calculator does more than report a current age. It identifies the next birthday, counts down to it, reports the weekday of that birthday and calculates a half-birthday. For the January 1, 2000 baseline assessed on August 23, 2026, the next birthday is January 1, 2027, which falls on Friday, and the next half-birthday is July 1, 2027. Birthday countdowns are calendar calculations, so they should use real month lengths and leap-year rules rather than converting a year into a fixed 365-day block. For measuring precise duration intervals between specific times, visit our{" "}
            <Link
              href="/calculators/time-duration-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Time Duration Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Business Days and Weekend Days Between Two Dates
          </h2>
          <p>
            The calculator also separates weekdays from weekend days. In the validated baseline, 9,731 total elapsed days are divided into 6,950 working business days and 2,781 weekend days. The current business-day model counts Monday through Friday and weekends as Saturday and Sunday; it does not automatically mean that public holidays have been removed unless the implementation explicitly has a holiday calendar. This distinction matters for employment, project and administrative calculations because a &ldquo;business day&rdquo; can have organization- or jurisdiction-specific definitions beyond a simple weekday count. To calculate shift hours and work intervals, explore our{" "}
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
            11. Traditional and International Age Systems
          </h2>
          <p>
            The calculator presents Western/international chronological age alongside traditional cultural age conventions. In the international system, a newborn begins at age 0 and gains a year on each birthday. Traditional Korean age historically counted a newborn as one and added a year on January 1, but South Korea standardized the international age system for official administrative and civil purposes on June 28, 2023. The traditional Korean method can therefore be presented as a historical or cultural convention, not as the current general legal standard. Traditional Chinese Sui age is likewise a cultural counting convention that follows a different structure from international chronological age and should not be represented as a universal current legal age.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Chinese Zodiac and Western Zodiac
          </h2>
          <p>
            The calculator can provide a Western sun sign and a Chinese zodiac result as optional date-based information. These systems should remain clearly separated from the mathematical age result. Western sun signs use date ranges associated with the zodiac signs, while the Chinese zodiac follows a repeating animal cycle and calendar-year conventions that do not always change on January 1 because the traditional Chinese calendar is lunisolar. For this reason, the Chinese zodiac result should be treated as an informational cultural feature rather than a legal or scientific age classification.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Planetary Age: What &ldquo;Your Age on Mars&rdquo; Actually Means
          </h2>
          <p>
            Planetary-age outputs are best understood as a unit conversion based on orbital periods, not a biological or legal age. The calculator uses elapsed Earth days and divides them by each planet&apos;s orbital period in days. With 9,731 Earth days, the validated outputs are approximately 110.62 Mercury years, 43.31 Venus years, 26.64 Earth years, 14.16 Mars years, 2.25 Jupiter years, 0.90 Saturn years, 0.32 Uranus years and 0.16 Neptune years. This simply answers the question: how many orbital periods of that planet have elapsed during the person&apos;s Earth-based lifetime?
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Age Milestones: 1,000 Days, 10,000 Days and 1 Billion Seconds
          </h2>
          <p>
            Milestone dates translate an age into memorable elapsed-time events. For the validated January 1, 2000 birth date, the calculator identifies the 1,000-day milestone on September 27, 2002; the 5,000-day milestone on September 9, 2013; the 10,000-day milestone on May 19, 2027; and the 30,000-day milestone on February 19, 2082. It also calculates the date when one billion seconds have elapsed, September 9, 2031 for this baseline. These are elapsed-time milestones, not alternative legal ages, and their dates must be calculated from the exact birth date rather than from a rounded age.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Golden Birthday, Life Progress and Other Optional Age Facts
          </h2>
          <p>
            A golden birthday is a celebratory convention in which a person&apos;s age matches the calendar day on which they were born—for example, someone born on January 1 has a golden birthday on January 1 of the year they turn 1. The calculator also reports progress through the current age interval, such as the percentage of the year completed and the days remaining until the next birthday. These outputs are informational features built on the same calendar calculations; they do not change the person&apos;s official chronological age.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Age Calculations for Forms, Cut-Off Dates and Eligibility
          </h2>
          <p>
            An age calculation can help you determine the chronological age on a specified date, but it does not determine whether someone legally qualifies for a program. Official rules can define a cut-off date, a minimum or maximum age, a special age-counting convention, or additional conditions. The safest workflow is to calculate the exact age as of the official date, then read the current eligibility rule for the relevant country, state, institution or program. Age-related legal, tax, licensing and benefits rules should never be inferred solely from the calculator. To calculate exact date boundaries and interval spans, consult our{" "}
            <Link
              href="/calculators/date-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Date Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Retirement-Account Age Thresholds Are Not the Same as Chronological Age
          </h2>
          <p>
            Retirement planning sometimes uses age thresholds, but the age number alone does not determine a person&apos;s tax result. For example, IRS guidance generally treats distributions from a traditional IRA before age 59½ as early distributions and an additional 10% tax may apply unless an exception applies. The exact tax treatment depends on account type and distribution circumstances. The Age Calculator should therefore be used to establish a chronological age or assessment date, while account-specific tax rules should be checked against current IRS guidance. To evaluate long-term financial nest eggs and target milestones, check our{" "}
            <Link
              href="/calculators/retirement-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Retirement Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            18. Calculation Methodology and Disclaimer
          </h2>
          <p>
            The Age Calculator uses Gregorian calendar arithmetic with explicit configuration for month-end behavior, February 29 handling, and inclusive or exclusive day counting. It also converts the final elapsed-day interval into hours, minutes and seconds, counts weekdays and weekends, computes birthday milestones, and uses separately defined formulas for optional cultural and planetary-age displays. These results are mathematical calculations based on the entered dates and selected settings. They are not legal determinations of age eligibility, tax eligibility, pension entitlement, licensing status, immigration status, medical age, or any other regulated status. Where an external rule matters, use the calculator to establish the date-based age and then consult the current official rule.
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
          {age_calculatorFaqs.map((faq, idx) => {
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
            Methodology &amp; Core Age Calculations
          </div>
          <p>
            Core age methodology: calculate chronological years, months and days using Gregorian calendar arithmetic with the calculator&apos;s selected borrowing and month-end rules. The elapsed-day matrix uses actual calendar-day differences and then derives hours, minutes and seconds by fixed unit conversion. Business days currently represent weekdays, with weekend days represented separately. Optional planetary-age values use elapsed Earth days divided by the configured orbital period for each planet. Milestone dates use exact birth-date offsets, including the one-billion-second milestone. Cultural-age outputs are separate conventions and should not be conflated with the core chronological age.
          </p>
        </div>

        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
          <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            Disclaimer &amp; Privacy Notice
          </div>
          <p>
            This calculator provides mathematical and informational estimates from the dates and settings entered. It does not determine legal eligibility, tax eligibility, retirement-account eligibility, pension entitlement, immigration status, licensing requirements, medical age, or any other regulated status. Always check the current official rule for the relevant jurisdiction or program when an age cutoff has legal or financial consequences. Calculations execute client-side in your browser, and saved history is stored locally in your browser storage.
          </p>
        </div>
      </div>
    </article>
  );
}

export default AgeContent;

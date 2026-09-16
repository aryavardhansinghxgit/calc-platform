"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, Globe, Clock, Calendar } from "lucide-react";
import { time_zone_calculatorFaqs } from "@/app/calculators/time-zone-calculator/faq";

export function TimeZoneContent() {
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
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      
      {/* 1. EXPANDED MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section 1: INTRODUCTION */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Time Zone Conversion Made Simple
          </h2>
          <p>
            Time zones make it possible for people in different parts of the world to use local clock times while referring to the same moment. The difficulty is that a location&apos;s time zone is not simply a fixed number of hours from UTC. Some places observe Daylight Saving Time (DST), some do not, some use half-hour or 45-minute offsets, and some jurisdictions have changed their civil-time rules over the years.
          </p>
          <p>
            This <strong>Time Zone Calculator</strong> converts a date and time from one location to another using the applicable named time-zone rules. It can also help compare several cities when planning an international meeting, display synchronized world clocks, and show how working hours overlap across locations.
          </p>
          <p>
            Enter the date, time, origin city, and destination city above. The calculator determines the relevant UTC offset for the selected date, converts the origin time to the corresponding instant in UTC, and then expresses that same instant in the destination time zone.
          </p>
        </section>

        {/* Section 2: HOW IT WORKS */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            How Does a Time Zone Calculator Work?
          </h2>
          <p>
            A reliable time-zone conversion starts with one important idea: <strong>the same instant can have different local clock readings in different places.</strong>
          </p>
          <p>
            For a straightforward conversion, the calculation can be represented as:
          </p>
          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-center">
            <p className="font-semibold text-slate-900 dark:text-white">
              Destination Time = UTC Instant + Destination Zone Offset
            </p>
          </div>
          <p>
            The challenging part is determining the correct offset for the selected date. For example, New York can use UTC−05:00 during standard time and UTC−04:00 during Daylight Saving Time. London can similarly alternate between UTC+00:00 and UTC+01:00. The difference between two cities can therefore change during the year even when neither city has moved.
          </p>
          <p>
            The calculator first resolves the origin date and local clock time, determines its corresponding UTC instant using the selected time-zone rules, and then resolves that instant in the destination zone. This is important because a timezone is a set of civil-time rules, not merely an offset such as &ldquo;UTC−5&rdquo;.
          </p>
          <p>
            For calculations involving elapsed time rather than clock conversion, a separate{" "}
            <Link href="/calculators/time-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              time calculator
            </Link>{" "}
            or{" "}
            <Link href="/calculators/time-duration-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              time duration calculator
            </Link>{" "}
            may be more appropriate.
          </p>
        </section>

        {/* Section 3: VISUAL MODEL */}
        <section className="space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            A Simple Mental Model
          </h3>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-5 sm:p-6">
            <div className="grid gap-4 md:grid-cols-3 text-center">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-slate-900 dark:text-white">Origin</div>
                <div className="text-slate-500 dark:text-slate-400 text-xs mt-1">Local date + local time</div>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-blue-600 dark:text-blue-400">Common Reference</div>
                <div className="text-slate-500 dark:text-slate-400 text-xs mt-1">UTC instant</div>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-slate-900 dark:text-white">Destination</div>
                <div className="text-slate-500 dark:text-slate-400 text-xs mt-1">Same instant in local time</div>
              </div>
            </div>
            <div className="mt-4 text-center font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
              Local Clock → UTC Instant → Destination Local Clock
            </div>
          </div>
        </section>

        {/* Section 4: WORKED EXAMPLES */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Time Zone Conversion Examples
          </h2>

          <div className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              New York to London
            </h3>
            <p>
              Suppose it is 2:30 PM in New York on a date when New York is observing Eastern Daylight Time (UTC−04:00), while London is observing British Summer Time (UTC+01:00).
            </p>
            <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-xs space-y-1">
              <p><strong>New York:</strong> 2:30 PM</p>
              <p><strong>UTC:</strong> 6:30 PM</p>
              <p><strong>London:</strong> 7:30 PM</p>
            </div>
            <p>
              The difference is five hours for that particular date. This does not mean the cities are permanently five hours apart. The difference can temporarily change when the United States and United Kingdom change their clocks on different dates.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Los Angeles to Tokyo
            </h3>
            <p>
              A conversion can also cross midnight. For example, an evening time in Los Angeles can become the following day&apos;s afternoon in Tokyo. The result is not just a different clock reading; the calendar date itself has changed.
            </p>
            <p>
              This is why international scheduling should always consider both the <strong>time and date</strong>.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              New York to India
            </h3>
            <p>
              India uses a half-hour UTC offset rather than a whole-hour offset. Consequently, a conversion from New York to India may produce a difference such as 9 hours 30 minutes or 10 hours 30 minutes depending on the applicable New York seasonal offset.
            </p>
          </div>
        </section>

        {/* Section 5: UTC OFFSET VS TIME ZONE */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            UTC Offset vs. Time Zone: What Is the Difference?
          </h2>
          <p>
            The terms <strong>UTC offset</strong> and <strong>time zone</strong> are often used interchangeably, but they describe different concepts.
          </p>
          <p>
            A UTC offset is the numerical difference between a local clock and UTC at a particular instant. Examples include UTC−05:00, UTC+05:30, and UTC+09:45.
          </p>
          <p>
            A named time zone represents the civil-time rules used by a region. Those rules can include standard offsets, daylight-saving transitions, historical changes, and future changes adopted by the relevant jurisdiction.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Concept</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">What it represents</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="py-2.5 px-3 font-medium">UTC offset</td>
                  <td className="py-2.5 px-3">Numerical difference from UTC at a particular instant</td>
                  <td className="py-2.5 px-3 font-mono">UTC+05:30</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium">Named time zone</td>
                  <td className="py-2.5 px-3">Civil-time rules associated with a geographic region</td>
                  <td className="py-2.5 px-3 font-mono">Asia/Kolkata</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium">UTC</td>
                  <td className="py-2.5 px-3">International reference time scale</td>
                  <td className="py-2.5 px-3 font-mono">UTC+00:00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            This distinction matters because two locations can have the same current UTC offset while having different time-zone rules or histories. A conversion system should therefore identify the actual zone rather than assuming that equal offsets make two locations interchangeable.
          </p>
        </section>

        {/* Section 6: DST DIFFERENCES */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            How Daylight Saving Time Changes Time Zone Differences
          </h2>
          <p>
            Daylight Saving Time changes the local civil clock according to rules adopted by a jurisdiction. It is not a worldwide system and it is not used by every country or region.
          </p>
          <p>
            A common example is the relationship between New York and London. At some times of year they are five hours apart, while around their different seasonal transition dates they can temporarily be four hours apart.
          </p>
          <p>
            This means that a recurring international meeting scheduled for the same local clock time can move relative to participants in another country. Calendar applications and scheduling systems therefore need date-aware time-zone information rather than a permanently stored &ldquo;+5 hours&rdquo; rule.
          </p>
          <p>
            Time-zone rules are maintained in databases such as the IANA Time Zone Database. Those rules can change when governments change civil-time legislation, which is another reason to use named time zones instead of permanently hardcoding seasonal offsets.
          </p>
        </section>

        {/* Section 7: DST TRANSITIONS */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            What Happens During a Daylight Saving Time Transition?
          </h2>
          <div className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Spring-forward: a nonexistent local time
            </h3>
            <p>
              During a spring-forward transition, local clocks move forward and a section of the displayed clock time can disappear. For example, a local clock may move from 1:59:59 AM directly into 3:00 AM. A requested local time such as 2:30 AM therefore does not correspond to an ordinary valid local clock reading on that date.
            </p>
            <p>
              A good time-zone calculator should detect this condition rather than silently treating the nonexistent clock reading as an ordinary time.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Fall-back: an ambiguous local time
            </h3>
            <p>
              During a fall-back transition, the clock moves backward. A local time such as 1:30 AM can occur twice, once before the transition and once after it. These two occurrences correspond to different UTC instants.
            </p>
            <p>
              This is called an <strong>ambiguous local time</strong>. The calculator&apos;s documented transition policy determines how that input is resolved and informs the user when the local clock time is ambiguous.
            </p>
          </div>
        </section>

        {/* Section 8: FRACTIONAL OFFSETS */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Why Do Some Time Zones Use 30-Minute or 45-Minute Offsets?
          </h2>
          <p>
            Not every time zone is aligned to a whole number of hours from UTC. Several locations use offsets containing 30 or 45 minutes.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Location</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Example UTC offset</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Offset type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="py-2.5 px-3 font-medium">India</td>
                  <td className="py-2.5 px-3 font-mono">UTC+05:30</td>
                  <td className="py-2.5 px-3">30 minutes</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium">Nepal</td>
                  <td className="py-2.5 px-3 font-mono">UTC+05:45</td>
                  <td className="py-2.5 px-3">45 minutes</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium">Newfoundland</td>
                  <td className="py-2.5 px-3 font-mono">UTC−03:30 or UTC−02:30 seasonally</td>
                  <td className="py-2.5 px-3">30 minutes</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium">Chatham Islands</td>
                  <td className="py-2.5 px-3 font-mono">UTC+12:45 or UTC+13:45 seasonally</td>
                  <td className="py-2.5 px-3">45 minutes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Fractional offsets are especially important when coordinating meetings, flights, international calls, or deadlines. A system that assumes every timezone uses a whole-hour offset can produce incorrect results.
          </p>
          <p>
            The same principle applies when calculating elapsed intervals. For elapsed-time questions, see the{" "}
            <Link href="/calculators/time-duration-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              time duration calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 9: DATE LINE */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Why Can a Time Zone Conversion Change the Date?
          </h2>
          <p>
            Time-zone conversion can move a clock across midnight. When that happens, the destination date is different even though the underlying instant is still the same.
          </p>
          <p>
            This is particularly noticeable for locations close to opposite sides of the International Date Line. The largest civil-time difference between commonly referenced UTC offsets is 26 hours, from UTC−12 to UTC+14.
          </p>
          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-center">
            <p className="font-semibold text-slate-900 dark:text-white font-mono text-xs sm:text-sm">
              Local Date + Local Time → UTC Instant → Destination Date + Time
            </p>
          </div>
          <p>
            The safest way to communicate an international appointment is therefore to include the complete date, local time, and time zone rather than only writing a clock time such as &ldquo;10:00 AM.&rdquo;
          </p>
          <p>
            For calculations involving a number of calendar days rather than clock zones, the{" "}
            <Link href="/calculators/day-counter-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              day counter calculator
            </Link>{" "}
            can be used separately.
          </p>
        </section>

        {/* Section 10: MEETING PLANNER */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Using the Time Zone Calculator for International Meetings
          </h2>
          <p>
            Converting one city at a time is useful, but international teams often need to find a period when several people are available simultaneously. That is the purpose of the calculator&apos;s multi-city meeting planner.
          </p>
          <p>
            The availability grid evaluates each selected city&apos;s local clock for each UTC hour and classifies the resulting local time. The standard working window used by the planner is <strong>9:00 AM through 4:59 PM local time</strong>, representing a conventional 9 AM–5 PM workday.
          </p>
          <p>
            Because every city is evaluated against the same UTC instant, the grid makes it easier to see whether a proposed meeting falls inside or outside normal working hours for the selected participants.
          </p>
          <div className="space-y-1.5 pt-1">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Practical example
            </h3>
            <p>
              Imagine participants in New York, London, Dubai, and Singapore. A time that is convenient for one city may be early morning or late evening somewhere else. Instead of mentally adding and subtracting several offsets, the availability grid lets you compare the local clock times together.
            </p>
            <p>
              For a more general calculation involving working hours or elapsed periods, you can also use the site&apos;s{" "}
              <Link href="/calculators/hours-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                hours calculator
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Section 11: WORLD CLOCK */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            How the World Clock Works
          </h2>
          <p>
            A world clock should represent one common instant in multiple locations. For example, if the reference instant is 14:30 UTC, the displayed local time in London, New York, New Delhi, and Tokyo will differ, but all of those readings describe the same moment.
          </p>
          <p>
            The key is to calculate each city&apos;s local time from the shared UTC instant and that city&apos;s time-zone rules. The computer&apos;s own local timezone should not change what another selected city means.
          </p>
          <p>
            This distinction is especially useful when comparing an international team, monitoring markets in another region, checking a remote support schedule, or deciding whether it is an appropriate time to call someone overseas.
          </p>
        </section>

        {/* Section 12: UTC VS GMT */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            UTC vs GMT: Are They the Same?
          </h2>
          <p>
            <strong>UTC</strong> is the modern internationally agreed reference time standard. It is based on atomic timekeeping and is coordinated with Earth&apos;s rotation through leap-second adjustments.
          </p>
          <p>
            <strong>GMT</strong> originally referred to mean solar time at Greenwich. In modern everyday usage, GMT is commonly used as the name for the zero-offset time at Greenwich and is often interchangeable with UTC when sub-second distinctions are irrelevant.
          </p>
          <p>
            For ordinary time-zone conversion, the important point is that UTC does not move forward or backward for Daylight Saving Time. Individual local zones may change their offset relative to UTC.
          </p>
        </section>

        {/* Section 13: SPECIAL CASES */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Important Time Zone Exceptions
          </h2>
          <p>
            Time-zone rules do not always follow the pattern users expect from a nearby country or region. Some locations do not observe DST, some use fractional offsets, and some have changed their rules in recent years.
          </p>
          <p>
            Examples include locations in Arizona that do not observe the usual US DST schedule, Hawaii, India, Nepal, and the Chatham Islands. The correct answer depends on the actual selected location and date.
          </p>
          <p>
            This is also why city names are not sufficient by themselves. A robust time-zone system uses a specific geographic time-zone identifier so that the appropriate civil-time rules can be applied.
          </p>
        </section>

        {/* Section 14: COMMON MISTAKES */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Common Time Zone Conversion Mistakes
          </h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">1. Treating an offset as a permanent rule</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Saying that two cities are always five hours apart can be wrong when either location changes its seasonal clock.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">2. Forgetting the date</h3>
              <p className="text-slate-600 dark:text-slate-400">
                A conversion near midnight can change the calendar date. Always communicate the complete date when scheduling internationally.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">3. Assuming every offset is a whole hour</h3>
              <p className="text-slate-600 dark:text-slate-400">
                India, Nepal, Newfoundland, Chatham and other locations demonstrate why half-hour and 45-minute offsets matter.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">4. Ignoring DST transition dates</h3>
              <p className="text-slate-600 dark:text-slate-400">
                A recurring event can appear to move by an hour relative to another country when the jurisdictions change clocks on different dates.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">5. Using an abbreviation without context</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Abbreviations such as CST, PST, or IST can be ambiguous across countries. A named city or IANA-style timezone identifier provides much stronger context.
              </p>
            </div>
          </div>
        </section>

        {/* Section 15: REAL-LIFE USE CASES */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            When Is a Time Zone Calculator Useful?
          </h2>
          <p>
            Time-zone conversion is useful anywhere an activity crosses geographic boundaries. Common situations include international meetings, remote work, customer support, online classes, interviews, conferences, webinars, software release coordination, travel planning, remote team scheduling, and cross-border deadlines.
          </p>
          <p>
            It is particularly valuable when several conditions overlap: different DST policies, fractional UTC offsets, midnight crossings, or a meeting involving several cities at once.
          </p>
          <p>
            For simple arithmetic involving adding or subtracting clock values, the{" "}
            <Link href="/calculators/time-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              time calculator
            </Link>{" "}
            is useful. For calendar-based questions, use the{" "}
            <Link href="/calculators/date-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              date calculator
            </Link>
            . These tools solve related but different problems.
          </p>
        </section>

        {/* Section 16: METHODOLOGY & PRIVACY */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Calculation Methodology and Privacy Notice
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Calculation Methodology
              </div>
              <p>
                The calculator uses named time-zone information and resolves the applicable offset for the selected date rather than assuming that a timezone has one permanent UTC difference. Civil-time rules are maintained as geographic timezone data and can change when governments change legislation. The IANA Time Zone Database is widely used by software systems for representing local-time history, UTC offsets, and daylight-saving rules.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Client-Side Privacy Notice
              </div>
              <p>
                All time zone conversions and saved calculation history run client-side in your web browser. No personal meeting information, dates, or location queries are sent to external computation servers.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* 2. FAQ SECTION (12 Approved FAQs, Open by Default with Smooth Toggle) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {time_zone_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. FINAL SUMMARY */}
      <div className="pt-6 space-y-3 text-xs sm:text-sm">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
          Convert Time Zones With the Full Date and Location Context
        </h2>
        <p>
          A reliable time-zone conversion is more than adding or subtracting a number of hours. The correct result depends on the date, location, applicable UTC offset, seasonal rules, and sometimes whether the local clock time exists uniquely.
        </p>
        <p>
          Use the calculator above whenever you need to convert between cities, compare international working hours, check a world clock, or determine whether a meeting crosses midnight. For date arithmetic, continue with the{" "}
          <Link href="/calculators/date-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
            date calculator
          </Link>
          ; for elapsed time, use the{" "}
          <Link href="/calculators/time-duration-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
            time duration calculator
          </Link>
          .
        </p>
      </div>

    </article>
  );
}

export default TimeZoneContent;

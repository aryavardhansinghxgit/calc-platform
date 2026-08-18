"use client";

import React from "react";
import Link from "next/link";

export function TimeZoneContent() {
  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-6 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. INTRODUCTION */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          What is a Time Zone?
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          A time zone is a designated geographic region that observes a uniform standard time for legal, commercial, and social purposes. Standard time zones are established relative to <strong>Coordinated Universal Time (UTC)</strong>, ranging from <code>UTC-12:00</code> to <code>UTC+14:00</code>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs sm:text-sm">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Greenwich Mean Time (GMT)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Historically defined as the mean solar time at the Royal Observatory in Greenwich, London ($0^\circ$ longitude). GMT is an astronomical time standard and serves today as the civil time zone for the UK, Ireland, and West Africa during winter.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Coordinated Universal Time (UTC)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              The modern global scientific time standard measured by hundreds of ultra-precise atomic clocks (International Atomic Time / TAI) and adjusted periodically via leap seconds to match Earth&apos;s rotational variations. UTC does not observe Daylight Saving Time.
            </p>
          </div>
        </div>
      </div>

      {/* 2. THE LONGITUDINAL PHYSICS OF TIME */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          The Longitudinal Physics of Time Division
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
          The Earth completes one full $360^\circ$ rotation approximately every 24 hours. Dividing $360^\circ$ by 24 yields exactly:
        </p>
        <div className="my-2 p-3 text-center font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800 text-sm sm:text-base">
          360° ÷ 24 Hours = 15° of Longitude per 1 Hour of Solar Time Shift
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
          Traveling eastward adds 1 hour for every $15^\circ$ of longitude crossed, while traveling westward subtracts 1 hour. However, political and economic borders frequently distort these ideal theoretical bands.
        </p>

        {/* Global Time Zone Anomalies */}
        <div className="mt-4 space-y-2 text-xs sm:text-sm">
          <span className="font-bold text-slate-900 dark:text-white block">
            Notable Global Time Zone Anomalies:
          </span>
          <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 list-disc list-inside">
            <li><strong>China (Single Time Zone):</strong> Spans over 60° of longitude (which would naturally span 5 separate time zones), but observes a single national time: <code>UTC+08:00</code> (Beijing Standard Time). In western Xinjiang, the sun may not rise until 10:00 AM in winter.</li>
            <li><strong>India (Single Time Zone & Half-Hour Offset):</strong> Uses a single nationwide zone (Indian Standard Time / <code>UTC+05:30</code>), anchored to the 82.5° East longitude meridian passing through Mirzapur.</li>
            <li><strong>Russia (11 Time Zones):</strong> Spans 11 contiguous time zones from Kaliningrad (<code>UTC+02:00</code>) to Kamchatka (<code>UTC+12:00</code>).</li>
            <li><strong>Nepal (45-Minute Holdout):</strong> Anchored to the meridian of Gauri Sankar mountain (86° 15&apos; East), Nepal observes <code>UTC+05:45</code>, making it one of the world&apos;s few 45-minute offset nations.</li>
            <li><strong>The International Date Line & Line Islands (Kiribati):</strong> In 1994, Kiribati moved the date line eastward to unify its islands into <code>UTC+14:00</code>. This creates a 26-hour time difference between Kiribati and Baker Island (<code>UTC-12:00</code>).</li>
          </ul>
        </div>
      </div>

      {/* 3. UNITED STATES TIME ZONE MAP BREAKDOWN */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          United States Time Zones Reference
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-3 text-xs sm:text-sm">
          The United States and its territories encompass 9 legal standard time zones:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Time Zone</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Standard (Winter)</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Daylight (Summer)</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Coverage / Major Cities</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2 px-2.5 font-medium">Eastern (ET)</td>
                <td className="py-2 px-2.5 font-mono">EST (UTC-5)</td>
                <td className="py-2 px-2.5 font-mono text-blue-600 dark:text-blue-400">EDT (UTC-4)</td>
                <td className="py-2 px-2.5">New York, Washington D.C., Boston, Miami, Atlanta (22 States)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Central (CT)</td>
                <td className="py-2 px-2.5 font-mono">CST (UTC-6)</td>
                <td className="py-2 px-2.5 font-mono text-blue-600 dark:text-blue-400">CDT (UTC-5)</td>
                <td className="py-2 px-2.5">Chicago, Dallas, Houston, Minneapolis, New Orleans</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Mountain (MT)</td>
                <td className="py-2 px-2.5 font-mono">MST (UTC-7)</td>
                <td className="py-2 px-2.5 font-mono text-blue-600 dark:text-blue-400">MDT (UTC-6)</td>
                <td className="py-2 px-2.5">Denver, Salt Lake City, Calgary (Arizona stays MST year-round)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Pacific (PT)</td>
                <td className="py-2 px-2.5 font-mono">PST (UTC-8)</td>
                <td className="py-2 px-2.5 font-mono text-blue-600 dark:text-blue-400">PDT (UTC-7)</td>
                <td className="py-2 px-2.5">Los Angeles, San Francisco, Seattle, Las Vegas, Vancouver</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Alaska (AKT)</td>
                <td className="py-2 px-2.5 font-mono">AKST (UTC-9)</td>
                <td className="py-2 px-2.5 font-mono text-blue-600 dark:text-blue-400">AKDT (UTC-8)</td>
                <td className="py-2 px-2.5">Anchorage, Fairbanks, Juneau</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Hawaii-Aleutian</td>
                <td className="py-2 px-2.5 font-mono">HST (UTC-10)</td>
                <td className="py-2 px-2.5 font-mono">No DST in HI</td>
                <td className="py-2 px-2.5">Honolulu (Aleutian Islands observe HADT UTC-9)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Samoa & Chamorro</td>
                <td className="py-2 px-2.5 font-mono">SST (UTC-11) / ChST (UTC+10)</td>
                <td className="py-2 px-2.5 font-mono">No DST</td>
                <td className="py-2 px-2.5">Pago Pago (Samoa), Guam, Northern Mariana Islands</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. DAYLIGHT SAVING TIME (DST) MECHANICS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Daylight Saving Time (DST) Mechanics
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
          Daylight Saving Time involves advancing clocks by one hour during spring (<em>&quot;spring forward&quot;</em>) and rolling back by one hour in autumn (<em>&quot;fall back&quot;</em>).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs sm:text-sm">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Northern Hemisphere (US & Europe)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>United States:</strong> 2nd Sunday in March to 1st Sunday in November.<br />
              • <strong>European Union:</strong> Last Sunday in March to last Sunday in October.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Southern Hemisphere (Australia & New Zealand)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Because seasons are reversed, clocks spring forward on the <strong>1st Sunday in October</strong> and fall back on the <strong>1st Sunday in April</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 5. STEP-BY-STEP WORKED CONVERSION EXAMPLES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          Step-by-Step Conversion Examples
        </h2>
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Example 1: New York (EDT, UTC-4) to London (BST, UTC+1)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Meeting at <strong>2:30 PM (14:30) EDT in New York</strong>.
            </p>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              • Convert New York local time to UTC: 14:30 - (-4 hours) = 18:30 UTC.<br />
              • Convert UTC to London time: 18:30 + (+1 hour) = 19:30 London BST.<br />
              → <strong>London Time: 7:30 PM BST (5 hours ahead)</strong>.
            </p>
          </div>

          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Example 2: Los Angeles (PST, UTC-8) to Tokyo (JST, UTC+9) with Next-Day Rollover
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Call at <strong>8:00 PM (20:00) PST on Friday in Los Angeles</strong>.
            </p>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              • Convert LA time to UTC: 20:00 - (-8 hours) = 28:00 UTC (04:00 UTC Saturday).<br />
              • Convert UTC to Tokyo time: 04:00 + (+9 hours) = 13:00 JST Saturday.<br />
              → <strong>Tokyo Time: 1:00 PM JST on Saturday (+1 Day, 17 hours ahead)</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 6. RELATED CALCULATORS */}
      <div className="pt-6">
        <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2">
          Related Calculators
        </h2>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-semibold">
          <Link
            href="/calculators/time-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Time Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/hours-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Hours Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/time-card-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Time Card Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/date-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Date Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/day-counter-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Day Counter Calculator
          </Link>
        </div>
      </div>
    </article>
  );
}

export default TimeZoneContent;

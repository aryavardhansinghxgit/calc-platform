"use client";

import React from "react";
import Link from "next/link";

export function DayOfWeekContent() {
  return (
    <article className="text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-6 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. INTRODUCTION & ISO 8601 STANDARD */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          How the Day of the Week is Calculated
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Calculating the day of the week for any past, present, or future calendar date requires modular arithmetic based on solar and lunar orbital cycles. The international standard for data exchange, <strong>ISO 8601</strong>, officially designates <strong>Monday as the first day of the week (Day 1)</strong>, followed sequentially through Sunday (Day 7).
        </p>
        <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Who uses it:</strong> Historians, genealogists, legal analysts, software engineers, and astronomers.</li>
          <li><strong>Calendar systems:</strong> The modern <strong>Gregorian calendar</strong> was introduced by Pope Gregory XIII in October 1582 to rectify the 11-minute annual solar drift in the ancient Roman <strong>Julian calendar</strong>.</li>
        </ul>
      </div>

      {/* 2. ZELLER'S CONGRUENCE ALGORITHM */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Zeller&apos;s Congruence: The Mathematical Formula
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm mb-3">
          Devised by German mathematician Christian Zeller in 1882, Zeller&apos;s Congruence calculates the day of the week ($h$) for any date in the Gregorian calendar:
        </p>

        <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center mb-3">
          {"h = (q + ⌊13(m+1)/5⌋ + K + ⌊K/4⌋ + ⌊J/4⌋ - 2J) mod 7"}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Variable Definitions</span>
            <ul className="space-y-1 text-slate-600 dark:text-slate-300">
              <li>• $q$ = Day of the month (1–31)</li>
              <li>• $m$ = Month number (March = 3, April = 4 ... December = 12). <strong>Note: January and February are counted as months 13 and 14 of the preceding year.</strong></li>
              <li>• $K$ = Year of the century ($year \bmod 100$)</li>
              <li>• $J$ = Zero-based century ($\lfloor year / 100 \rfloor$)</li>
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Result Mapping ($h$)</span>
            <ul className="space-y-1 text-slate-600 dark:text-slate-300 font-mono">
              <li>• 0 = Saturday</li>
              <li>• 1 = Sunday</li>
              <li>• 2 = Monday</li>
              <li>• 3 = Tuesday</li>
              <li>• 4 = Wednesday</li>
              <li>• 5 = Thursday</li>
              <li>• 6 = Friday</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. LINGUISTIC ETYMOLOGY & CROSS-CULTURAL ORIGINS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Where Do the Names of the Days Come From?
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-3 text-xs sm:text-sm">
          The 7-day week originates from ancient Babylonian astronomy, corresponding to the seven visible celestial bodies observed moving across the night sky. In the Hellenistic Roman era, these planets were paired with Roman deities, which later permeated Germanic, Japanese, and Indian civilizations.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Day</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Celestial Body</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Roman / Germanic Deity</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Japanese (7 Luminaries)</th>
                <th className="py-2 px-2.5 font-semibold text-slate-900 dark:text-white">Indian / Sanskrit (Navagraha)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2 px-2.5 font-medium">Sunday</td>
                <td className="py-2 px-2.5">Sun (Sol)</td>
                <td className="py-2 px-2.5">Sol / Sunna</td>
                <td className="py-2 px-2.5 font-mono">Nichiyōbi (日曜日 - Sun)</td>
                <td className="py-2 px-2.5 font-mono">Ravivara (रविवार - Sun)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Monday</td>
                <td className="py-2 px-2.5">Moon (Luna)</td>
                <td className="py-2 px-2.5">Luna / Máni</td>
                <td className="py-2 px-2.5 font-mono">Getsuyōbi (月曜日 - Moon)</td>
                <td className="py-2 px-2.5 font-mono">Somavara (सोमवार - Moon)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Tuesday</td>
                <td className="py-2 px-2.5">Mars (Ares)</td>
                <td className="py-2 px-2.5">Mars / Tiw (Týr)</td>
                <td className="py-2 px-2.5 font-mono">Kayōbi (火曜日 - Fire/Mars)</td>
                <td className="py-2 px-2.5 font-mono">Mangalavara (मंगलवार - Mars)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Wednesday</td>
                <td className="py-2 px-2.5">Mercury (Hermes)</td>
                <td className="py-2 px-2.5">Mercurius / Woden (Odin)</td>
                <td className="py-2 px-2.5 font-mono">Suiyōbi (水曜日 - Water/Mercury)</td>
                <td className="py-2 px-2.5 font-mono">Budhavara (बुधवार - Mercury)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Thursday</td>
                <td className="py-2 px-2.5">Jupiter (Zeus)</td>
                <td className="py-2 px-2.5">Jupiter (Jove) / Thor</td>
                <td className="py-2 px-2.5 font-mono">Mokuyōbi (木曜日 - Wood/Jupiter)</td>
                <td className="py-2 px-2.5 font-mono">Guruvara (गुरुवार - Jupiter/Brihaspati)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Friday</td>
                <td className="py-2 px-2.5">Venus (Aphrodite)</td>
                <td className="py-2 px-2.5">Venus / Frigg (Freyja)</td>
                <td className="py-2 px-2.5 font-mono">Kinyōbi (金曜日 - Gold/Venus)</td>
                <td className="py-2 px-2.5 font-mono">Shukravara (शुक्रवार - Venus)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-medium">Saturday</td>
                <td className="py-2 px-2.5">Saturn (Cronus)</td>
                <td className="py-2 px-2.5">Saturnus</td>
                <td className="py-2 px-2.5 font-mono">Doyōbi (土曜日 - Earth/Saturn)</td>
                <td className="py-2 px-2.5 font-mono">Shanivara (शनिवार - Saturn)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. DAY-BY-DAY CULTURAL & ECONOMIC TRIVIA */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Cultural, Historical & Economic Trivia About Each Day
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <strong className="text-slate-900 dark:text-white">Monday:</strong> Statistically the most likely day for the US stock market to rise. Monday is the only day of the week that is an anagram for a single English word: <em>&quot;Dynamo&quot;</em>. Studies show people complain for an average of 34 minutes on Mondays vs 22 minutes on other days.
          </div>
          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <strong className="text-slate-900 dark:text-white">Tuesday:</strong> Recognized across corporate workplace studies as the most productive day of the week, with the highest volume of submitted job applications. <em>Black Tuesday</em> (October 29, 1929) was the stock market crash that catalyzed the Great Depression.
          </div>
          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <strong className="text-slate-900 dark:text-white">Wednesday:</strong> Known as &quot;Hump Day&quot; in North America due to its position as the middle crest of the Monday–Friday workweek. In German, it is named <em>Mittwoch</em> (&quot;Mid-week&quot;).
          </div>
          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <strong className="text-slate-900 dark:text-white">Thursday:</strong> In Christian tradition, Maundy Thursday commemorates the Last Supper. In the United Kingdom, general elections are held on Thursdays by long-standing convention.
          </div>
          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <strong className="text-slate-900 dark:text-white">Friday:</strong> Coinciding with the 13th day of the month triggers superstitions of bad luck (paraskevidekatriaphobia). Black Friday immediately follows Thanksgiving, driving the largest retail shopping volume of the year.
          </div>
          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <strong className="text-slate-900 dark:text-white">Saturday:</strong> The biblical Sabbath in Jewish tradition. Legally designated as official election voting day in Australia and New Zealand. In Sweden, children celebrate <em>Lördagsgodis</em> (&quot;Saturday sweets&quot;).
          </div>
          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <strong className="text-slate-900 dark:text-white">Sunday:</strong> Traditional day of rest and Christian worship. Any calendar month that begins on a Sunday will always contain a Friday the 13th.
          </div>
        </div>
      </div>

      {/* 5. WORKED CALCULATION EXAMPLES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Step-by-Step Worked Calculation Examples
        </h2>
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Example 1: Apollo 11 Moon Landing (July 20, 1969)
            </span>
            <p className="text-slate-500 dark:text-slate-400 font-mono text-xs">
              • $q = 20$, $m = 7$ (July), $K = 69$, $J = 19$<br />
              • $\lfloor 13(8)/5 \rfloor = \lfloor 104/5 \rfloor = 20$<br />
              • $\lfloor 69/4 \rfloor = 17$, $\lfloor 19/4 \rfloor = 4$, $2J = 38$<br />
              • $h = (20 + 20 + 69 + 17 + 4 - 38) \bmod 7 = 92 \bmod 7 = 1$<br />
              → <strong>$h = 1$ corresponds to Sunday</strong>.
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
            Day Counter
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
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

export default DayOfWeekContent;

"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, BookOpen, Layers, ShieldCheck, HelpCircle, ArrowRight } from "lucide-react";

export function GolfHandicapContent() {
  return (
    <article className="space-y-10 text-zinc-800 dark:text-zinc-200 leading-relaxed text-sm">
      {/* SECTION 1: INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          What Is a Golf Handicap?
        </h2>
        <p>
          A golf handicap is designed to provide a portable measure of a player&apos;s demonstrated playing ability so golfers of different abilities can compete more equitably.
        </p>
        <p>
          Under the <strong>World Handicap System (WHS)</strong>, that measure is the <strong>Handicap Index</strong>. The system uses Score Differentials from a player&apos;s rounds and adjusts for course difficulty and playing conditions. The Handicap Index can then be converted to a <strong>Course Handicap</strong> for a particular set of tees.
        </p>
        <p>
          This Golf Handicap Calculator is designed to perform the core calculations associated with the WHS framework, including:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
          <li className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Score Differential
          </li>
          <li className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> 1–20-score Handicap Index calculations
          </li>
          <li className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> 9-hole Score Differential workflow
          </li>
          <li className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Playing Conditions Calculation (PCC) as an entered value
          </li>
          <li className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Low Handicap Index safeguards
          </li>
          <li className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Soft cap and hard cap
          </li>
          <li className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Exceptional Score Reduction (ESR)
          </li>
          <li className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Course Handicap &amp; Playing Handicap
          </li>
        </ul>

        <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/50 text-xs space-y-1">
          <span className="font-bold text-blue-700 dark:text-blue-300 block uppercase tracking-wider">
            Important Authorization Disclosure
          </span>
          <p className="text-zinc-600 dark:text-zinc-300">
            The result should be understood as a WHS-based calculation or estimate. An official Handicap Index is issued and administered through the appropriate authorized golf organization or club; a standalone calculator does not itself create an officially issued handicap.
          </p>
        </div>
      </section>

      {/* SECTION 2: HANDICAP INDEX VS SCORE DIFFERENTIAL */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Golf Handicap Index vs. Score Differential
        </h2>
        <p>
          These terms are closely related, but they are not the same thing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Score Differential</h3>
            <p>
              A Score Differential evaluates how a particular round compares with the difficulty of the course and the playing conditions.
            </p>
            <p className="font-semibold text-zinc-700 dark:text-zinc-300">
              For an 18-hole score, the current WHS formula is:
            </p>
            <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 text-center font-mono font-bold text-blue-600 dark:text-blue-400">
              Score Differential = (113 / Slope Rating) × (Adjusted Gross Score - Course Rating - PCC)
            </div>
            <p className="text-zinc-500">
              The result is rounded to the nearest tenth (.5 rounded upwards algebraically) per WHS rules.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Handicap Index</h3>
            <p>
              The Handicap Index is built from the player&apos;s relevant Score Differentials rather than from raw scores alone.
            </p>
            <p>
              For a player with 20 Score Differentials, the first step is the average of the lowest 8 of the most recent 20. Safeguards can then modify the result.
            </p>
            <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 text-center font-mono text-zinc-600 dark:text-zinc-400">
              Round Score → AGS → Differential → Record → Best Differentials → Handicap Index
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW TO CALCULATE A GOLF SCORE DIFFERENTIAL */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          How to Calculate a Golf Score Differential
        </h2>
        <p>
          The most important inputs are:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Adjusted Gross Score (AGS):</strong> The gross score adjusted for maximum net double bogey per hole.</li>
          <li><strong>Course Rating:</strong> The evaluation of difficulty for a scratch golfer under normal conditions.</li>
          <li><strong>Slope Rating:</strong> Relative difficulty comparison between a bogey golfer and a scratch golfer.</li>
          <li><strong>PCC Adjustment:</strong> Published Playing Conditions Calculation adjustment (-1.0 to +3.0).</li>
        </ul>

        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2 text-xs">
          <span className="font-bold text-blue-600 dark:text-blue-400 block uppercase tracking-wider">
            Step-by-Step Differential Calculation Example
          </span>
          <p>Suppose: <code>AGS = 85</code>, <code>Course Rating = 72.0</code>, <code>Slope = 113</code>, <code>PCC = 0</code></p>
          <p className="font-mono text-zinc-700 dark:text-zinc-300">
            Differential = (113 / 113) × (85 - 72.0 - 0) = 1.0 × 13.0 = 13.0
          </p>
          <p className="font-bold text-emerald-600 dark:text-emerald-400">
            Resulting Score Differential = 13.0
          </p>
          <p className="text-zinc-500">
            The calculator&apos;s verified golden case produces exactly 13.0.
          </p>
        </div>

        <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 pt-2">
          Why Slope Rating Matters
        </h3>
        <p>
          A score of 85 does not mean exactly the same thing on every golf course. The WHS uses Course Rating to describe the expected score for a scratch golfer under normal conditions, and Slope Rating to represent the relative difficulty of a course for players who are not scratch golfers compared with scratch golfers. A Slope Rating of 113 represents a course of standard relative difficulty.
        </p>
        <p>
          That is why two players shooting the same gross score on different courses can receive different Score Differentials. The calculator therefore uses the Course Rating and Slope Rating instead of treating raw score alone as the measure of performance.
        </p>
      </section>

      {/* SECTION 4: PLAYING CONDITIONS CALCULATION (PCC) */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          What Is the Playing Conditions Calculation (PCC)?
        </h2>
        <p>
          The Playing Conditions Calculation, or PCC, adjusts Score Differentials when scoring conditions on a particular course and day were significantly different from normal expectations.
        </p>
        <p>
          The current WHS PCC range is <strong>-1.0 to +3.0</strong>. A negative adjustment indicates that the course played easier than expected, while a positive adjustment indicates that it played more difficult than expected. Most days produce a PCC of zero.
        </p>
        <p>
          The PCC is a statistical calculation based on scores posted for the course on that day. At least eight eligible scores must be posted by the applicable cutoff for the calculation to occur.
        </p>

        <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 text-xs space-y-1.5">
          <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
            <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" /> Important Calculator Limitation
          </span>
          <p className="text-zinc-700 dark:text-zinc-300">
            This calculator allows you to enter the published daily PCC value. It does not independently calculate the official course-day PCC from the complete set of scores posted at the golf course. That distinction matters. A dropdown containing -1.0, 0.0, +1.0, +2.0, +3.0 is an input to the Score Differential calculation, not an independent PCC-generation engine.
          </p>
        </div>
      </section>

      {/* SECTION 5: WHS 1–20 SCORE SLIDING SCALE TABLE */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          What Is the WHS 1–20 Score Rule?
        </h2>
        <p>
          A player&apos;s scoring record may contain fewer than 20 Score Differentials. The WHS uses a sliding calculation until the player reaches 20 scores. The current USGA Rule 5.2a specifies this reduced-score table, and Rule 5.2b specifies the lowest 8 of the most recent 20 once the record reaches 20:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-xs font-sans tabular-nums">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Score Differentials in Record</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Differentials Used</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="p-2 font-bold">3 Rounds</td>
                <td className="p-2">Lowest 1</td>
                <td className="p-2 text-blue-600 dark:text-blue-400 font-bold">-2.0 strokes</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">4 Rounds</td>
                <td className="p-2">Lowest 1</td>
                <td className="p-2 text-blue-600 dark:text-blue-400 font-bold">-1.0 stroke</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">5 Rounds</td>
                <td className="p-2">Lowest 1</td>
                <td className="p-2">0 (Exact lowest differential)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">6 Rounds</td>
                <td className="p-2">Lowest 2 average</td>
                <td className="p-2 text-blue-600 dark:text-blue-400 font-bold">-1.0 stroke</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">7–8 Rounds</td>
                <td className="p-2">Lowest 2 average</td>
                <td className="p-2">0 (Exact average)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">9–11 Rounds</td>
                <td className="p-2">Lowest 3 average</td>
                <td className="p-2">0 (Exact average)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">12–14 Rounds</td>
                <td className="p-2">Lowest 4 average</td>
                <td className="p-2">0 (Exact average)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">15–16 Rounds</td>
                <td className="p-2">Lowest 5 average</td>
                <td className="p-2">0 (Exact average)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">17–18 Rounds</td>
                <td className="p-2">Lowest 6 average</td>
                <td className="p-2">0 (Exact average)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">19 Rounds</td>
                <td className="p-2">Lowest 7 average</td>
                <td className="p-2">0 (Exact average)</td>
              </tr>
              <tr className="bg-emerald-50/50 dark:bg-emerald-950/20 font-bold">
                <td className="p-2.5 text-emerald-700 dark:text-emerald-300">20 Rounds (Full Standard)</td>
                <td className="p-2.5 text-emerald-700 dark:text-emerald-300">Lowest 8 average</td>
                <td className="p-2.5 text-emerald-700 dark:text-emerald-300">0 (Average of lowest 8)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 pt-2">
          How the 20-Score Handicap Calculation Works
        </h3>
        <p>
          Once a scoring record contains at least 20 Score Differentials, the WHS calculation starts with the player&apos;s lowest 8 of the most recent 20. The eight values are averaged:
        </p>
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700 font-mono text-center text-xs">
          HI_raw = (D_1 + D_2 + ... + D_8) / 8
        </div>
        <p>
          For example, if the eight selected differentials sum to 80.7, then <code>80.7 / 8 = 10.0875</code>. The displayed Handicap Index would be <strong>10.1</strong>. The calculator independently verifies this 20-score example.
        </p>
        <p>
          A WHS Handicap Index is intended to represent demonstrated potential rather than simply average every score. With 20 Score Differentials, the calculation uses the lowest eight rather than all twenty. USGA guidance explains that twelve of the most recent twenty scores are not used in the basic 8-of-20 calculation. Those twelve scores do not disappear; they remain part of the record and can become relevant later as newer scores are posted and the rolling 20-score window changes.
        </p>
        <p>
          You do not need to wait until you have 20 scores to establish a Handicap Index. The WHS can calculate an index once the player has the required minimum 54 holes. For 0, 1, or 2 rounds, the Handicap Index is unavailable and displays <strong>N/A</strong> rather than a fake 0.0 Scratch Handicap. A scratch golfer has a genuine Handicap Index of 0.0, which should never be confused with empty or missing data.
        </p>
      </section>

      {/* SECTION 6: 9-HOLE SCORES UNDER THE 2024 WHS REVISION */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          What Is a 9-Hole Golf Handicap Calculation?
        </h2>
        <p>
          The WHS updated how 9-hole scores are incorporated beginning in 2024. A standalone 9-hole Score Differential component is calculated as:
        </p>
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700 font-mono text-center text-xs font-bold text-blue-600 dark:text-blue-400">
          9-hole Score Differential = (113 / 9-hole Slope) × (9-hole AGS - 9-hole CR - 0.5 × PCC)
        </div>
        <p>
          The critical point is that the 9-hole result is <strong>not simply doubled</strong>.
        </p>
        <p>
          For a handicap calculation, the 9-hole Score Differential is combined with an <strong>expected 9-hole Score Differential</strong> based on the player&apos;s current Handicap Index (HI / 2) to produce an 18-hole Score Differential. The 9-hole differential remains <strong>unrounded</strong> until after that combination.
        </p>

        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2 text-xs">
          <span className="font-bold text-blue-600 dark:text-blue-400 block uppercase tracking-wider">
            Verified 9-Hole Rule 5.1b Example
          </span>
          <p>Suppose: <code>Score = 40</code>, <code>Course Rating = 35.5</code>, <code>Slope = 120</code>, <code>PCC = 0</code></p>
          <p className="font-mono">
            Unrounded 9-Hole Component: (113 / 120) × (40 - 35.5) = 4.2375
          </p>
          <p>
            The standalone component rounds to <strong>4.2</strong>. But for the complete WHS 9-hole workflow with a current Handicap Index of 15.0:
          </p>
          <p className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Expected Component = 15.0 / 2 = 7.5 → Unrounded Sum = 4.2375 + 7.5 = 11.7375 → Final 18-Hole Differential = 11.7
          </p>
        </div>

        <p>
          If you simply double a good 9-hole score, you assume the same performance would duplicate on the back nine. The WHS expected-score method avoids artificially low or volatile results by combining actual performance with the player&apos;s established potential.
        </p>
      </section>

      {/* SECTION 7: COURSE HANDICAP & PLAYING HANDICAP */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Course Handicap vs. Playing Handicap
        </h2>
        <p>
          Your Handicap Index is portable, but you still need to translate it to the specific course and tees you are playing. That is the purpose of the <strong>Course Handicap</strong> and <strong>Playing Handicap</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Course Handicap (Rule 6.1)</h3>
            <p>
              Course Handicap represents the number of strokes a player receives or gives relative to the course and tees:
            </p>
            <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 font-mono text-center font-bold text-blue-600 dark:text-blue-400">
              Course Handicap = HI × (Slope / 113) + (Course Rating - Par)
            </div>
            <p>
              Example: <code>HI = 10.4</code>, <code>Slope = 128</code>, <code>CR = 72.1</code>, <code>Par = 72</code>:
            </p>
            <p className="font-mono">
              10.4 × (128 / 113) + (72.1 - 72) = 11.78 + 0.1 = 11.88 → <strong>12 Strokes</strong>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Playing Handicap (Rule 6.2)</h3>
            <p>
              Playing Handicap applies format-specific tournament allowances to the unrounded Course Handicap:
            </p>
            <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 font-mono text-center font-bold text-emerald-600 dark:text-emerald-400">
              Playing Handicap = Course Handicap × Handicap Allowance
            </div>
            <p>
              At 100% individual stroke play: <code>12 × 1.00 = 12</code> strokes.
            </p>
            <p>
              At 95% Four-Ball stroke play: <code>11.88 × 0.95 = 11.29</code> → <strong>11 Strokes</strong>.
            </p>
          </div>
        </div>

        <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 pt-2">
          Format-Specific Handicap Allowances (USGA Appendix C)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-xs font-sans tabular-nums">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Competition Format</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Recommended Allowance</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Application Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="p-2 font-bold">Individual Stroke Play</td>
                <td className="p-2 font-bold text-blue-600 dark:text-blue-400">100%</td>
                <td className="p-2">Full Course Handicap</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Four-Ball Stroke Play</td>
                <td className="p-2 font-bold text-blue-600 dark:text-blue-400">95%</td>
                <td className="p-2">Applied to each partner&apos;s Course Handicap</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Four-Ball Match Play</td>
                <td className="p-2 font-bold text-blue-600 dark:text-blue-400">90%</td>
                <td className="p-2">Strokes off the lowest player</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">2-Player Scramble</td>
                <td className="p-2 font-bold text-blue-600 dark:text-blue-400">35% Low + 15% High</td>
                <td className="p-2">Combined team playing handicap</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">4-Player Scramble</td>
                <td className="p-2 font-bold text-blue-600 dark:text-blue-400">25% / 20% / 15% / 10%</td>
                <td className="p-2">Ordered from lowest to highest handicap</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 8: SAFEGUARDS: LOW INDEX, SOFT CAP, HARD CAP, ESR */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Safeguards: Low Index, Caps &amp; Exceptional Score Reduction
        </h2>
        <p>
          The WHS includes built-in safeguards to prevent temporary slumps from artificially inflating an index and to ensure rapid response to breakthrough performances:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Low Handicap Index</h3>
            <p>
              The player&apos;s lowest Handicap Index during the preceding 365 days. It serves as the baseline reference anchor for caps.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Soft Cap (Rule 5.7)</h3>
            <p>
              Triggered when the raw index exceeds the Low Index by more than <strong>3.0 strokes</strong>. Suppresses upward movement above 3.0 by <strong>50%</strong>.
            </p>
            <p className="font-mono text-[11px] text-zinc-500">
              Low 10.0, Raw 13.4 → 10.0 + 3.0 + 0.4×0.5 = <strong>13.2</strong>
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Hard Cap (Rule 5.8)</h3>
            <p>
              Imposes an absolute ceiling restricting index increases to a maximum of <strong>5.0 strokes</strong> above the Low Index.
            </p>
            <p className="font-mono text-[11px] text-zinc-500">
              Low 10.0, Raw 18.0 → Ceiling = <strong>15.0</strong>
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2 text-xs">
          <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">
            Exceptional Score Reduction (ESR Rule 5.9)
          </h3>
          <p>
            An ESR is applied when a Score Differential is substantially lower than the player&apos;s Handicap Index at the time the round was played:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>7.0 to 9.9 strokes lower:</strong> -1.0 stroke reduction across all differentials in the record.</li>
            <li><strong>10.0 or more strokes lower:</strong> -2.0 stroke reduction across all differentials in the record.</li>
          </ul>
          <p className="text-zinc-600 dark:text-zinc-400">
            ESR operates on the scoring record prior to cap evaluation. A baseline index of 15.0 with an exceptional differential of 8.0 has a gap of 7.0, triggering a -1.0 ESR adjustment.
          </p>
        </div>
      </section>

      {/* SECTION 9: COMPLETE HANDICAP WORKFLOW & CHECKLIST */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Complete Golf Handicap Workflow &amp; Step-by-Step Checklist
        </h2>
        <p>
          The complete progression from raw scorecard to competition strokes follows this sequence:
        </p>

        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 font-mono text-xs space-y-1 text-center">
          <div>Play Round → Adjusted Gross Score (Net Double Bogey)</div>
          <div>↓</div>
          <div>Course Rating + Slope Rating + PCC Adjustment</div>
          <div>↓</div>
          <div>Score Differential (9-Hole Expected / 18-Hole Standard)</div>
          <div>↓</div>
          <div>Scoring Record → WHS 1–20 Sliding Scale Selection</div>
          <div>↓</div>
          <div>Apply ESR → Average Best Differentials → Apply Soft/Hard Caps</div>
          <div>↓</div>
          <div className="font-bold text-blue-600 dark:text-blue-400">Calculated WHS Handicap Index</div>
          <div>↓</div>
          <div>Course Handicap (CR - Par adjustment) → Playing Handicap (Format Allowance)</div>
        </div>

        <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 pt-2">
          Practical Golf Handicap Checklist
        </h3>
        <ol className="list-decimal pl-5 space-y-1.5 text-xs">
          <li><strong>Correct course and tee ratings:</strong> Use the Course Rating and Slope Rating for the exact tees played.</li>
          <li><strong>Correct score type:</strong> Verify 18-hole or 9-hole format.</li>
          <li><strong>Correct PCC:</strong> Enter the published daily PCC when applicable (-1.0 to +3.0).</li>
          <li><strong>Correct Score Differential:</strong> Check the resulting differential before reviewing the index.</li>
          <li><strong>Scoring record selection:</strong> For 20 scores, confirm the best 8 differentials count.</li>
          <li><strong>Check safeguards:</strong> Review ESR and 365-day Low Index caps where applicable.</li>
          <li><strong>Convert to Course Handicap:</strong> Use Course Rating, Slope Rating, and Par.</li>
          <li><strong>Apply competition allowance:</strong> Playing Handicap depends on the specific event format.</li>
        </ol>
      </section>

      {/* SECTION 10: CONTEXTUAL INTERNAL ANCHORS */}
      <section className="space-y-3 pt-2">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Round Planning &amp; Course Stamina
        </h2>
        <p>
          Managing your schedule and physical conditioning can significantly impact your scoring consistency:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs">
          <li>
            Players planning the time required for a round can also use the{" "}
            <Link
              href="/calculators/pace-calculator"
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Pace Calculator
            </Link>{" "}
            for a separate pace estimate.
          </li>
          <li>
            Golfers who walk the course and want a separate activity estimate can use the{" "}
            <Link
              href="/calculators/calories-burned-calculator"
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Calories Burned Calculator
            </Link>
            .
          </li>
          <li>
            For a separate body-composition reference, the{" "}
            <Link
              href="/calculators/bmi-calculator"
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              BMI Calculator
            </Link>{" "}
            provides a BMI calculation rather than a golf-performance measure.
          </li>
        </ul>
      </section>

      {/* SECTION 11: SCIENTIFIC AND OFFICIAL REFERENCES */}
      <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-6">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-blue-600" /> Scientific &amp; Official References
        </h2>
        <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
          <li>
            <strong>World Handicap System — USGA:</strong> The USGA provides the current Rules of Handicapping, including Score Differential, Handicap Index calculation, 9-hole scoring, Course Handicap, Playing Handicap, safeguards and handicap allowances.
          </li>
          <li>
            <strong>The R&amp;A — Rules of Handicapping:</strong> The R&amp;A publishes the current WHS rules and explains authorization, Handicap Index issuance and the responsibilities of authorized associations.
          </li>
          <li>
            <strong>USGA — 9-Hole Scores:</strong> The current 9-hole process uses the played 9-hole Score Differential plus an expected 9-hole Score Differential to create an 18-hole Score Differential.
          </li>
          <li>
            <strong>USGA — Course and Playing Handicap:</strong> Current Rule 6 defines the Course Handicap formula and the Playing Handicap calculation using the applicable handicap allowance.
          </li>
          <li>
            <strong>USGA — Handicap Allowances:</strong> Appendix C provides recommended allowances for different competition formats.
          </li>
        </ul>
      </section>
    </article>
  );
}

export default GolfHandicapContent;

"use client";

import React from "react";

export function GolfHandicapContent() {
  return (
    <article className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-8 py-2">
      {/* SECTION 1: WHAT IS A GOLF HANDICAP? */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          1. What is a Golf Handicap? (The World Handicap System)
        </h2>
        <p>
          A golf handicap is a numerical measure of a golfer's potential playing ability. In 2020, the governing bodies of golf—the <strong>United States Golf Association (USGA)</strong> and <strong>The R&A</strong>—unified six distinct global handicap systems into a single standardized benchmark: the <strong>World Handicap System (WHS)</strong>.
        </p>
        <p>
          The fundamental philosophy of WHS is that a Handicap Index measures a player's <em>demonstrated potential</em> under normal playing conditions, rather than their simple arithmetic average score. This allows golfers of vastly different skill levels to compete fairly on any golf course worldwide.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-xl space-y-1">
            <h3 className="font-bold text-emerald-800 dark:text-emerald-300">Scratch Golfer (0.0 Index)</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              A player capable of playing to a Course Handicap of 0 on any rated golf course. A scratch golfer averages par on standard courses.
            </p>
          </div>

          <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-800 dark:text-blue-300">Bogey Golfer (20.0 – 24.0 Index)</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              A player with a Course Handicap of approximately 20 on a standard course, averaging about 1 stroke over par per hole.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE CORE MATHEMATICAL FORMULAS */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          2. The Core Mathematical Formulas
        </h2>
        <p>
          Every round posted generates a <strong>Score Differential</strong>, which measures how well you played relative to the difficulty of the course and tees:
        </p>

        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-sans tabular-nums text-xs my-2 text-center text-emerald-700 dark:text-emerald-300 font-bold">
          Score Differential = (113 / Slope Rating) × (Adjusted Gross Score - Course Rating - PCC)
        </div>

        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">WHS 1 to 20 Rounds Sliding Scale Lookup Table</h3>
        <p>
          When you post scores, WHS Rule 5.2 determines how many lowest differentials are averaged to calculate your Handicap Index:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-xs">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Number of Rounds Posted</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Differentials Used</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Adjustment / Calculation Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-sans tabular-nums">
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">3 Rounds</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">Lowest 1</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-emerald-600 font-bold">Lowest 1 Differential - 2.0</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">4 Rounds</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">Lowest 1</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">Lowest 1 Differential - 1.0</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">5 Rounds</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">Lowest 1</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">Lowest 1 Differential (Exact)</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">6 Rounds</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">Lowest 2</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">Average of Lowest 2 Diffs - 1.0</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">7 – 8 Rounds</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">Lowest 2</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">Average of Lowest 2 Differentials</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">9 – 11 Rounds</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">Lowest 3</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">Average of Lowest 3 Differentials</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">12 – 14 Rounds</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">Lowest 4</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">Average of Lowest 4 Differentials</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">15 – 16 Rounds</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">Lowest 5</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">Average of Lowest 5 Differentials</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">17 – 18 Rounds</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">Lowest 6</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">Average of Lowest 6 Differentials</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">19 Rounds</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">Lowest 7</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">Average of Lowest 7 Differentials</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold text-emerald-600">20 Rounds (Full)</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold">Lowest 8</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-emerald-600 font-bold">Average of Lowest 8 Differentials</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 3: UNDERSTANDING COURSE RATING, SLOPE RATING & PAR */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          3. Understanding Course Rating, Slope Rating & Par
        </h2>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          <li>
            <strong>Course Rating:</strong> An evaluation of the difficulty of a set of tees for a scratch golfer under normal playing conditions (e.g., 71.8).
          </li>
          <li>
            <strong>Slope Rating:</strong> Evaluates the relative difficulty of a course for a bogey golfer compared to a scratch golfer. The standard baseline slope is <strong>113</strong>, with ratings ranging from 55 to 155.
          </li>
          <li>
            <strong>Integration of (Course Rating - Par):</strong> Under the 2020 WHS system, Course Handicap explicitly incorporates the difference between Course Rating and Par, allowing players to compete directly off different tees without separate adjustment calculations.
          </li>
        </ul>
      </section>

      {/* SECTION 4: SAFEGUARDS & ANTI-SANDBAGGING RULES */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          4. Safeguards & Anti-Sandbagging Rules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Net Double Bogey Maximum</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Limits the maximum score on any single hole for handicap posting: <strong>Par + 2 + Handicap Strokes Received</strong>.
            </p>
          </div>

          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Soft Cap & Hard Cap</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Tracks your 365-day Low Index. Increases past +3.0 strokes are suppressed by 50% (Soft Cap), with a maximum ceiling of +5.0 strokes (Hard Cap).
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: MATCH PLAY & TOURNAMENT FORMATS */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          5. Match Play & Tournament Formats
        </h2>
        <p>
          WHS mandates format-specific Playing Handicap allowances:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
          <li><strong>Individual Stroke Play:</strong> 100% Course Handicap</li>
          <li><strong>Four-Ball Stroke Play:</strong> 95% Course Handicap</li>
          <li><strong>Alternate Shot / Best Ball:</strong> 85% Course Handicap</li>
          <li><strong>2-Player Scramble:</strong> 35% Low Handicap + 15% High Handicap</li>
        </ul>
      </section>

      {/* SECTION 6: HOW TO LOWER YOUR HANDICAP */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          6. How to Lower Your Handicap
        </h2>
        <p>
          To lower your Handicap Index efficiently:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
          <li><strong>Eliminate Double Bogeys:</strong> Manage course risk by playing away from hazards and aiming for center green.</li>
          <li><strong>Focus on Putting & Short Game:</strong> 65% of shots occur within 100 yards of the hole.</li>
        </ul>
      </section>
    </article>
  );
}

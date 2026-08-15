"use client";

import React from "react";

export function BraSizeContent() {
  return (
    <article className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-8 py-2">
      {/* SECTION 1: THE PHYSICS & BIOLOGY OF BRA SIZING */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          1. The Physics & Biology of Bra Sizing
        </h2>
        <p>
          A properly fitted bra is an architectural support system engineered for human anatomy. Contrary to popular belief, shoulder straps are not designed to carry the weight of breast tissue. Anatomically, <strong>80% of a bra's structural support comes from the underbust band</strong> anchored firmly against the ribcage, while shoulder straps contribute only 20% to stabilize the cups.
        </p>
        <p>
          Bra sizing is composed of two distinct measurements:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Band Size (Ribcage Circumference):</strong> The foundational anchor. A band that is too large slides up the back, causing shoulder pain as straps absorb excessive tension.</li>
          <li><strong>Cup Size (Volumetric Difference):</strong> Cup letters (A, B, C, D, DD, E, F) do not represent absolute volumes. Instead, cup size represents the <em>relative difference</em> between overbust circumference and underbust circumference (e.g., 1 inch difference = A cup, 4 inches = D cup).</li>
        </ul>
      </section>

      {/* SECTION 2: STEP-BY-STEP MEASUREMENT GUIDE */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          2. Step-by-Step Measurement Guide
        </h2>
        <p>
          To achieve accurate fit results at home, use a flexible vinyl measuring tape while wearing an unpadded, non-push-up bra:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl space-y-1">
            <h3 className="font-bold text-rose-700 dark:text-rose-300">1. Measure Underbust (Band)</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Wrap tape around your ribcage directly underneath your bust. Exhale fully and pull tape <strong>snug</strong> (firm fit). Keep tape parallel to the floor across your back.
            </p>
          </div>

          <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-700 dark:text-blue-300">2. Measure Bust (Overbust)</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Wrap tape gently around the fullest point of your breasts (nipple level). Keep tape level across back without compressing tissue.
            </p>
          </div>

          <div className="p-3.5 bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900 rounded-xl space-y-1">
            <h3 className="font-bold text-purple-700 dark:text-purple-300">3. Leaning Technique (Soft Tissue)</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              If breasts are projected or soft, lean forward 45 degrees while measuring overbust to capture full natural tissue volume.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: UNDERSTANDING CUP VOLUME & SISTER SIZES */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          3. Understanding Cup Volume & "Sister Sizes"
        </h2>
        <p>
          A common myth is that a "D cup" is the same size on every woman. In reality, a 30D cup contains significantly less breast volume than a 38D cup. Cup volume scales proportionally with band size.
        </p>
        <p>
          <strong>Sister Sizes</strong> are bra sizes that hold identical cup volume across different band measurements. When you step UP in band size (+2 inches), you must step DOWN in cup letter (-1 cup) to maintain equal volume:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-xs">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Volume Group</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Smaller Band / Larger Cup</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700 text-rose-600">Standard Baseline Size</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Larger Band / Smaller Cup</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-sans tabular-nums">
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">Group A</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">30D</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold text-rose-600">32C</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">34B</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">Group B</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">32DD</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold text-rose-600">34D</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">36C</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">Group C</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">34DDD / 34E</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold text-rose-600">36DD</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">38D</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 4: INTERNATIONAL SIZING CONVERSION STANDARDS */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          4. International Sizing Conversion Standards
        </h2>
        <p>
          Global bra manufacturers use different band and cup naming conventions:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-xs">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">US / Canada</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">United Kingdom (UK)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Europe (EU EN 13402)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">France / Spain (FR)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Australia (AU/NZ)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-sans tabular-nums">
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold">32D</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">32D</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">70D</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">85D</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">10D</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold">34DD / 34E</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">34DD</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">75E</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">90E</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">12DD</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold">36DDD / 36F</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">36E</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">80F</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">95F</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">14E</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold">38G</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">38F</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">85G</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">100G</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">16F</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 5: TROUBLESHOOTING 7 FIT PROBLEMS */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          5. Troubleshooting 7 Common Bra Fit Problems
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100">1. Band Riding Up the Back</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              <strong>Cause:</strong> Band size is too large. <strong>Fix:</strong> Size down 1 band size (e.g. 36C → 34D).
            </p>
          </div>

          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100">2. Underwire Digging into Tissue</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              <strong>Cause:</strong> Cup is too small or wire root is too narrow. <strong>Fix:</strong> Size up 1 cup size.
            </p>
          </div>

          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100">3. Cups Gaping or Wrinkling</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              <strong>Cause:</strong> Cup volume is too large or style cut is too projected for a shallow breast root. <strong>Fix:</strong> Try a balconette or demi cut.
            </p>
          </div>

          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100">4. Double-Bust / Spilling ("Quad-Boob")</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              <strong>Cause:</strong> Cup volume is too small. <strong>Fix:</strong> Increase cup size by 1–2 letters.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: LIFE STAGES & SIZING CHANGES */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          6. Life Stages & Sizing Changes
        </h2>
        <p>
          Breast tissue density, shape, and band volume naturally evolve through different life stages:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
          <li><strong>Pregnancy & Postpartum:</strong> Ribcages expand during the 2nd and 3rd trimesters. Choose wireless drop-cup nursing bras with flexible sizing.</li>
          <li><strong>Weight Shifts & Fitness:</strong> Weight loss primarily reduces underbust band size before cup volume. Re-measure every 6 months.</li>
          <li><strong>High-Impact Sports:</strong> Sports bras should encapsulate or compress without restricting deep diaphragmatic breathing.</li>
        </ul>
      </section>
    </article>
  );
}

"use client";

import React from "react";

export function ShoeSizeContent() {
  return (
    <article className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-8 py-2">
      {/* SECTION 1: THE ANATOMY & BIOMECHANICS OF SHOE SIZING */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. The Anatomy & Biomechanics of Shoe Sizing
        </h2>
        <p>
          Shoe sizing is far more complex than measuring a flat piece of wood. The human foot contains <strong>26 bones, 33 joints, and over 100 muscles, tendons, and ligaments</strong>. When you stand and walk, your foot undergoes dynamic biomechanical changes under body weight load:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          <li>
            <strong>Weight-Bearing Elongation:</strong> Under full body weight, the foot flattens and elongates by up to <strong>0.5 cm to 1.0 cm</strong> compared to a non-weight-bearing sitting position.
          </li>
          <li>
            <strong>Gait Cycle Expansion:</strong> During the push-off phase of walking or running, the arch flexes and the toes splay forward inside the toe box.
          </li>
          <li>
            <strong>Diurnal Swelling (Late Afternoon Effect):</strong> Gravity and physical activity cause body fluids to pool in the lower extremities throughout the day, increasing foot volume by up to <strong>4% to 8% by late afternoon</strong>.
          </li>
        </ul>
      </section>

      {/* SECTION 2: STEP-BY-STEP GUIDE TO MEASURING YOUR FEET AT HOME */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Step-by-Step Guide to Measuring Your Feet at Home
        </h2>
        <p>
          Follow this standardized procedure to get exact heel-to-toe length and width measurements:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-blue-50/60 dark:bg-blue-50/20 border border-emerald-200 dark:border-emerald-900 rounded-xl space-y-1">
            <h3 className="font-bold text-emerald-800 dark:text-blue-400">Step 1: Set Up Paper & Wall</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Tape a blank sheet of paper to a hard floor against a flat vertical wall. Wear the socks you plan to wear with the shoes.
            </p>
          </div>

          <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-800 dark:text-blue-300">Step 2: Trace Both Feet</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Stand flat-footed with your heel touching the wall. Trace around your foot with a vertically held pen. Mark the longest toe and widest ball points.
            </p>
          </div>

          <div className="p-3.5 bg-blue-50/60 dark:bg-blue-50/20 border border-purple-200 dark:border-purple-900 rounded-xl space-y-1">
            <h3 className="font-bold text-purple-800 dark:text-blue-400">Step 3: Measure & Add Margin</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Measure the distance from wall to longest toe mark in cm/inches. Add <strong>10 mm to 12 mm (0.4–0.5 in)</strong> of toe clearance allowance.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: GLOBAL SIZING SYSTEMS & MATHEMATICAL FORMULAS EXPLAINED */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Global Sizing Systems & Mathematical Formulas Explained
        </h2>
        <p>
          Footwear manufacturers worldwide rely on three distinct mathematical standards:
        </p>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">1. US & UK Barleycorn System (1/3 Inch Steps)</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Traditional Anglo-American shoe sizing is based on the <em>barleycorn</em> unit (exactly <strong>1/3 of an inch</strong> or 8.46 mm):
            </p>
            <div className="p-2 bg-white dark:bg-zinc-900 font-sans tabular-nums text-[11px] rounded border border-zinc-200 dark:border-zinc-700 text-center my-1">
              UK Size = 3 × Last Length (inches) - 25
            </div>
            <div className="p-2 bg-white dark:bg-zinc-900 font-sans tabular-nums text-[11px] rounded border border-zinc-200 dark:border-zinc-700 text-center my-1">
              US Men's Size = UK Size + 1 = 3 × Last Length (inches) - 22
            </div>
            <div className="p-2 bg-white dark:bg-zinc-900 font-sans tabular-nums text-[11px] rounded border border-zinc-200 dark:border-zinc-700 text-center my-1">
              US Women's Size = US Men's Size + 1.5
            </div>
          </div>

          <div className="p-3.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">2. European Paris Point System (2/3 CM Steps)</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Continental European sizing uses the <em>Paris Point</em> (Point de Paris), equal to <strong>2/3 of a centimeter</strong> (6.67 mm):
            </p>
            <div className="p-2 bg-white dark:bg-zinc-900 font-sans tabular-nums text-[11px] rounded border border-zinc-200 dark:border-zinc-700 text-center my-1">
              EU Size = 1.5 × Last Length (cm) = 3/2 × (Foot Length + 1.5 cm Allowance)
            </div>
          </div>

          <div className="p-3.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">3. Mondopoint System (ISO 9407)</h3>
            <p className="text-slate-900 dark:text-slate-100">
              The international ISO 9407 standard used in Japan, East Asia, and military applications specifies foot length and width directly in <strong>millimeters (mm)</strong> (e.g., 270/100).
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: COMPLETE INTERNATIONAL SIZING CONVERSION TABLES */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Complete International Sizing Conversion Tables
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-xs">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Foot Length (in)</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Foot Length (cm)</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">US Men</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">US Women</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">UK</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">EU (Paris)</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Japan (cm)</th>
              </tr>
            </thead>
            <tbody className=" dark:divide-zinc-800 font-sans tabular-nums">
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">9.25 in</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">23.5 cm</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">6.0</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold text-blue-600">7.5</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">5.0</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">38</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">23.5</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">9.65 in</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">24.5 cm</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">7.0</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold text-blue-600">8.5</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">6.0</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">39–40</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">24.5</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">10.0 in</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">25.4 cm</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold text-blue-600">8.5</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">10.0</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">7.5</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">41–42</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">25.5</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">10.5 in</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">26.7 cm</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold text-blue-600">10.0</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">11.5</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">9.0</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">43</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">27.0</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">11.0 in</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">27.9 cm</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold text-blue-600">11.5</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">13.0</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">10.5</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">45</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">28.0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 5: UNDERSTANDING SHOE WIDTHS & LETTER CODES */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Understanding Shoe Widths & Letter Codes
        </h2>
        <p>
          Shoe width lettering indicates girth around the ball of the foot:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          <li><strong>Narrow (A / 2A / B for Men; 2A / 3A for Women):</strong> Designed for slim feet with lower instep volume.</li>
          <li><strong>Standard Medium (D for Men; B for Women):</strong> Standard off-the-shelf width accounting for 70% of the population.</li>
          <li><strong>Wide (E / 2E for Men; D / W for Women):</strong> Extra room across the metatarsal joint to prevent bunions and side pinching.</li>
          <li><strong>Extra Wide (4E / 6E for Men; 2E / 4E for Women):</strong> Specialty orthopedic width for wide feet, flat arches, or diabetic footwear.</li>
        </ul>
      </section>

      {/* SECTION 6: SPECIALTY FOOTWEAR FIT NUANCES */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Specialty Footwear Fit Nuances
        </h2>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          <li><strong>Running Shoes:</strong> Size up 0.5 size larger than dress shoes to absorb forward foot sliding on downhill strides.</li>
          <li><strong>Hiking Boots:</strong> Account for thick wool socks and downhill toe impact by ensuring 12–15 mm of toe clearance.</li>
          <li><strong>High Heels:</strong> Fit snugly at the heel to prevent slippage while ensuring ball of foot rests cleanly on the arch pad.</li>
        </ul>
      </section>
    </article>
  );
}

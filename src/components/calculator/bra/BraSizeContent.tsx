"use client";

import React from "react";
import Link from "next/link";

export function BraSizeContent() {
  return (
    <article className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-8 py-2">
      {/* SECTION 1: HOW A BRA SIZE CALCULATOR WORKS */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          How a Bra Size Calculator Works
        </h2>
        <p>
          A bra size is usually expressed with two distinct parts:
        </p>
        <div className="p-3 my-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-800 dark:text-slate-100">
          band size + cup size
        </div>
        <p>For example:</p>
        <div className="p-3 my-2 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-center font-mono font-extrabold text-lg text-blue-600 dark:text-blue-400">
          30D
        </div>
        <p>
          The <strong>30</strong> represents the band designation (ribcage anchor), while the <strong>D</strong> represents the cup designation relative to that band within a particular sizing system.
        </p>
        <p>
          Those two parts are interconnected. A cup letter does not represent one fixed breast volume across every band size. A D cup on one band is not necessarily the same cup volume as a D cup on a substantially larger or smaller band. This fundamental volume-to-circumference relationship forms the biological basis of sister sizing.
        </p>
        <p>
          This Bra Size Calculator uses two primary anatomical body measurements:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Underbust:</strong> measured firmly around the ribcage directly below the breasts.</li>
          <li><strong>Bust:</strong> measured gently around the fullest projection of the bust while standing upright.</li>
        </ul>
        <p>
          It then applies the selected regional sizing convention to estimate a reliable starting size.
        </p>
        <p>
          For the calculator&apos;s reference example:
        </p>
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center">
          30 in underbust + 34 in bust → <span className="font-bold text-blue-600 dark:text-blue-400">30D</span>
        </div>
        <p>
          The tool also displays corresponding international sizes across six global standards, sister-size options, practical fit advice, and optional shape-based style guidance.
        </p>
      </section>

      {/* SECTION 2: HOW TO MEASURE YOUR BRA SIZE */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          How to Measure Your Bra Size
        </h2>
        <p>
          Accurate bra estimation begins with accurate tape placement and consistent posture.
        </p>

        <div className="space-y-3">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">1. Measure your underbust</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Wrap a flexible vinyl measuring tape around your ribcage directly underneath the breasts. Keep the tape level around your torso, comfortably snug against the skin (exhale normally), and strictly parallel to the floor across your back. The calculator uses this measurement to determine the starting band size.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">2. Measure your bust</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Measure around the fullest part of your bust while keeping the tape horizontal. Do not pull the tape so tightly that it compresses or indents soft breast tissue. If breasts are soft or projected, leaning forward 45 degrees can help capture full tissue volume.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">3. Select your unit</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The calculator supports inches (in) and centimeters (cm). The exact conversion standard is:
            </p>
            <div className="p-2 rounded bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 font-mono text-xs text-center">
              1 inch = 2.54 cm | 30 in = 76.2 cm | 34 in = 86.36 cm
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The calculator&apos;s regression testing confirms consistent inch-to-centimeter round trips without rounding drift.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">4. Select the sizing region</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Choose the sizing system most relevant to the bra you are shopping for. Supported standards include US / Canada, United Kingdom (UK), India / Asia (IN), European Union (EU EN 13402), France / Spain (FR), and Australia / New Zealand (AU).
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
          If you also need to convert another body measurement into a standardized consumer size, our <Link href="/calculators/shoe-size-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Shoe Size Calculator</Link> provides a separate measurement-based conversion for international footwear standards.
        </p>
      </section>

      {/* SECTION 3: WHAT IS A BRA BAND SIZE? */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          What Is a Bra Band Size?
        </h2>
        <p>
          The band is the foundational anchor of the bra that wraps horizontally around your ribcage.
        </p>
        <p>
          In a measurement-based sizing system, the underbust measurement is used to determine a starting band designation. This calculator rounds the normalized underbust measurement to an even-numbered band within its supported range (28 to 52 inches):
        </p>
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center">
          30 in underbust → 30 band (US/UK) | 65 cm band (EU) | 80 cm band (FR) | AU 8 band
        </div>
        <p>
          A band that is substantially too loose tends to ride upward on the back under breast tension instead of remaining horizontal. A band that is excessively tight creates discomfort, pinches tissue, and restricts breathing. Band fit should therefore always be checked on the body rather than judged solely from the calculator result.
        </p>
        <p>
          Research on bra fitting shows that measurement-based sizing alone does not guarantee a correct final fit, which is why the calculated size should be treated as an educated starting point.
        </p>
      </section>

      {/* SECTION 4: HOW IS CUP SIZE CALCULATED? */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          How Is Cup Size Calculated?
        </h2>
        <p>
          The base cup calculation begins with the mathematical difference between overbust and underbust:
        </p>
        <div className="p-3 my-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-800 dark:text-slate-100">
          D = B - U
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
          where <em>B</em> is bust measurement, <em>U</em> is underbust measurement, and <em>D</em> is bust-to-underbust difference.
        </p>
        <p>For example:</p>
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center">
          34 in - 30 in = 4 in difference
        </div>
        <p>
          The calculator then maps that difference into the selected regional cup progression. For the US/Canada baseline:
        </p>
        <div className="p-2.5 rounded-lg bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 font-mono text-xs sm:text-sm text-center font-bold text-blue-700 dark:text-blue-300">
          4 in difference → D Cup → Starting Size: 30D
        </div>
        <p>
          This is why entering the two measurements separately matters. The calculator never treats cup letters as an independent fixed measurement.
        </p>
      </section>

      {/* SECTION 5: EXAMPLE: 30 INCHES UNDERBUST AND 34 INCHES BUST */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Example: 30 Inches Underbust and 34 Inches Bust
        </h2>
        <p>
          Suppose your measurements are:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Underbust:</strong> 30 in (76.2 cm)</li>
          <li><strong>Bust:</strong> 34 in (86.36 cm)</li>
        </ul>
        <p>
          Calculation:
        </p>
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center">
          34 - 30 = 4 in difference → 4 in = D Cup → Primary Starting Size: <strong>30D</strong>
        </div>
        <p>
          The calculator&apos;s tested international equivalents for this baseline are:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-xs">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Region Standard</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Starting Size</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Band System</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Cup Designation</th>
              </tr>
            </thead>
            <tbody className="dark:divide-zinc-800 font-sans tabular-nums">
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold">US / Canada</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-rose-600 dark:text-rose-400 font-bold">30D</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">30"</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">D</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold">United Kingdom (UK)</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-blue-600 dark:text-blue-400 font-bold">30D</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">30"</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">D</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold">India / Asia (IN)</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-amber-600 dark:text-amber-400 font-bold">30D</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">30"</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">D</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold">Europe (EU EN 13402)</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-purple-600 dark:text-purple-400 font-bold">65D</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">65 cm</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">D</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold">France / Spain (FR)</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-emerald-600 dark:text-emerald-400 font-bold">80D</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">80 cm</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">D</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold">Australia / NZ (AU)</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-indigo-600 dark:text-indigo-400 font-bold">8D</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">AU 8</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">D</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 italic">
          These outputs represent the calculator&apos;s standardized regional conversion mappings, not a guarantee that every lingerie manufacturer will label identical garments uniformly.
        </p>
      </section>

      {/* SECTION 6: WHY BRA SIZES DIFFER BETWEEN COUNTRIES */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Why Bra Sizes Differ Between Countries
        </h2>
        <p>
          There is no single universal bra-labeling system. Different markets historically evolved distinct band numbering systems and cup progressions.
        </p>
        <p>
          For example, European standards (such as EN 13402) use centimeter-based band numbers rounded to multiples of five:
        </p>
        <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-xs text-center">
          60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120 cm
        </div>
        <p>
          rather than the inch-based band numbers common in US and UK labeling. French and Spanish conventions add 15 to the European band (e.g., EU 65 becomes FR 80). Australian and New Zealand systems use apparel dress sizing numbers (e.g., AU 8, 10, 12, 14, 16) for the band.
        </p>
        <p>
          That is why a single physical measurement corresponds to different numbers and letters across different geographical markets.
        </p>
      </section>

      {/* SECTION 7: INTERNATIONAL BRA SIZE CONVERSION */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          International Bra Size Conversion
        </h2>
        <p>
          The calculator provides a live conversion matrix so you can view your corresponding size under each supported region simultaneously. For the reference 30D baseline, the calculator produces:
        </p>
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center">
          30D (US) → 30D (UK) → 65D (EU) → 80D (FR) → 8D (AU)
        </div>
        <p>
          The exact cup conversion becomes more complex at larger cup sizes because cup progressions diverge after D cups. For example, UK sizing uses a double-letter sequence (D, DD, E, F, FF, G, GG, H, HH, J), while US sizing frequently progresses as D, DD/E, DDD/F, G, H, I, J, K. International conversion must therefore be performed using an established regional standard chart rather than by simply shifting one letter.
        </p>
      </section>

      {/* SECTION 8: WHY YOUR BRA SIZE IS A STARTING POINT, NOT A GUARANTEE */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Why Your Bra Size Is a Starting Point, Not a Guarantee
        </h2>
        <p>
          A measurement calculator can only process the two-dimensional circumference measurements you enter. Real three-dimensional bra fit is governed by several additional physical and mechanical variables:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono font-medium">
          <div className="p-2 bg-slate-50 dark:bg-slate-800/80 rounded border">Breast Shape</div>
          <div className="p-2 bg-slate-50 dark:bg-slate-800/80 rounded border">Tissue Density</div>
          <div className="p-2 bg-slate-50 dark:bg-slate-800/80 rounded border">Root Width</div>
          <div className="p-2 bg-slate-50 dark:bg-slate-800/80 rounded border">Cup Depth</div>
          <div className="p-2 bg-slate-50 dark:bg-slate-800/80 rounded border">Wire Curvature</div>
          <div className="p-2 bg-slate-50 dark:bg-slate-800/80 rounded border">Bridge Width</div>
          <div className="p-2 bg-slate-50 dark:bg-slate-800/80 rounded border">Band Elasticity</div>
          <div className="p-2 bg-slate-50 dark:bg-slate-800/80 rounded border">Brand Grading</div>
        </div>
        <p>
          A landmark 2010 study involving 104 women found that measurement-based and self-selected bra sizes differed significantly from sizes verified using professional clinical fit criteria. A later study of larger-breasted women also documented substantial fit discrepancies even with professionally fitted bras, demonstrating that garment design, wire geometry, and fitting method all influence the final outcome.
        </p>
        <p>
          A reliable bra size calculator should therefore answer: <em>“What size should I try first?”</em> rather than promising a guaranteed fit.
        </p>
      </section>

      {/* SECTION 9: HOW TO CHECK THE FIT OF THE BRA YOU TRY */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          How to Check the Fit of the Bra You Try
        </h2>
        <p>
          Once you have your calculated starting size, evaluate the physical garment using five key anatomical touchpoints:
        </p>

        <div className="space-y-2 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">1. Check the band</span>
            <p className="text-slate-600 dark:text-slate-400">
              A properly fitted band sits level and horizontal around the torso. If it rides up your back under strap tension, the band is too loose.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">2. Check the cups</span>
            <p className="text-slate-600 dark:text-slate-400">
              Look for tissue spilling over the neckline (&quot;quad-boob&quot;), cutting into the armpits, or wrinkling and gaping at the top. Spilling indicates too small a cup; gaping often indicates excess volume or an incompatible cup shape.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">3. Check the underwires</span>
            <p className="text-slate-600 dark:text-slate-400">
              Underwires must encompass breast tissue completely without poking or resting on breast tissue at the sides or center.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">4. Check the center gore</span>
            <p className="text-slate-600 dark:text-slate-400">
              In underwire bras, the center bridge between the cups should lie flat against your sternum. If it tilts away or floats, cup depth is insufficient.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">5. Check the straps</span>
            <p className="text-slate-600 dark:text-slate-400">
              Straps should stabilize cup posture without digging into shoulders. Research confirms that overall bra support is distributed across the underband, cup construction, and straps rather than resting on any single component alone.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10: WHAT ARE SISTER SIZES? */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          What Are Sister Sizes?
        </h2>
        <p>
          Sister sizes are adjacent bra sizes designed to hold approximately equal cup volume while changing the band circumference.
        </p>
        <p>
          For the calculator&apos;s baseline reference size of <strong>30D</strong>, the sister sizes are:
        </p>
        <div className="p-2.5 rounded-lg bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 font-mono text-xs sm:text-sm text-center font-bold text-purple-700 dark:text-purple-300">
          Tighter Band: 28DD/E | Looser Band: 32C
        </div>
        <p>
          The core rule of sister sizing is inverse adjustment:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Step DOWN in band (-2"):</strong> step UP one cup letter to preserve volume.</li>
          <li><strong>Step UP in band (+2"):</strong> step DOWN one cup letter to preserve volume.</li>
        </ul>
        <p>
          Common sister size equivalences include:
        </p>
        <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-xs text-center">
          32DD = 34D = 36C | 34DDD = 36DD = 38D
        </div>
      </section>

      {/* SECTION 11: SISTER SIZES DO NOT MEAN IDENTICAL FIT */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Sister Sizes Do Not Mean Identical Fit
        </h2>
        <p>
          Describing sister sizes as &quot;equal volume&quot; is conceptually helpful, but does not mean identical fit on the body.
        </p>
        <p>
          When you change band size, the garment manufacturer alters more than just the fabric length of the back strap. Grading changes:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li>underwire curvature and spring</li>
          <li>cup root width vs forward cup depth</li>
          <li>center gore height and separation</li>
          <li>shoulder strap placement and spacing</li>
          <li>band tension and ribcage elasticity</li>
        </ul>
        <p>
          Therefore, while <strong>30D</strong> and <strong>28DD</strong> contain similar volumetric tissue capacity, a 28DD bra features a firmer band anchor and narrower wire spread than a 30D or 32C bra.
        </p>
      </section>

      {/* SECTION 12: WHEN TO TRY A SISTER SIZE */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          When to Try a Sister Size
        </h2>
        <p>
          Sister sizes are the most effective problem-solving tool when one dimension of a bra fits well but the other does not:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Cups fit well, but band rides up:</span>
            <p className="text-slate-600 dark:text-slate-400">
              Try a <strong>tighter-band sister size</strong> (e.g., move from 34C to 32D). The cup volume remains equivalent, but the firmer band prevents shifting.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Cups fit well, but band digs uncomfortably:</span>
            <p className="text-slate-600 dark:text-slate-400">
              Try a <strong>looser-band sister size</strong> (e.g., move from 32D to 34C). The cup volume is maintained without ribcage constriction.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 13: BREAST SHAPE AND WHY IT MATTERS AFTER SIZE */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Breast Shape and Why It Matters After Size
        </h2>
        <p>
          Two individuals can share identical underbust and bust measurements yet require completely different bra styles.
        </p>
        <p>
          That is why this calculator includes an optional <strong>Breast Shape &amp; Fit Profile</strong> covering six common profiles:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Even / Standard:</strong> Balanced tissue distribution across upper and lower poles.</li>
          <li><strong>Shallow Root:</strong> Tissue is spread over a broad chest footprint with minimal forward projection.</li>
          <li><strong>Projected:</strong> Tissue extends forward prominently from the ribcage footprint.</li>
          <li><strong>Asymmetrical:</strong> One breast has noticeably greater volume or higher density.</li>
          <li><strong>Bell Shape:</strong> Narrower at the top with fullness concentrated in the lower pole.</li>
          <li><strong>Teardrop:</strong> Gentle, rounded fullness with gradual upper slope.</li>
        </ul>
        <p>
          In this calculator, shape profiling is deliberately separated from the mathematical base size calculation. It customizes fit advice and recommended bra cuts without silently mutating your measured bra size.
        </p>
      </section>

      {/* SECTION 14: WHY CUP SHAPE CAN MATTER MORE THAN THE LETTER */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Why Cup Shape Can Matter More Than the Letter
        </h2>
        <p>
          A cup letter alone does not define the physical three-dimensional geometry of a bra cup. Two bras bearing the exact same nominal size (e.g., 32D) can differ substantially in:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li>cup width vs cup projection depth</li>
          <li>wire arc curvature (narrow U-shape vs wide flat cradle)</li>
          <li>vertical cup height and gore separation</li>
          <li>foam molding stiffness vs soft seamed fabric flexibility</li>
        </ul>
        <p>
          A molded T-shirt bra requires breast tissue to conform to a pre-cast foam shell, whereas a seamed unlined bra contours around your natural tissue shape. Selecting an alternative cut often resolves fit issues without changing your calculated size.
        </p>
      </section>

      {/* SECTION 15: WHAT DIFFERENT BRA STYLES CAN DO */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          What Different Bra Styles Can Do
        </h2>
        <p>
          The calculator features tailored style suggestions based on profile needs:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">T-Shirt &amp; Contour Bra</h4>
            <p className="text-slate-600 dark:text-slate-400">Smooth, seamless molded cups that prevent nipple show-through. Ideal for everyday wear and bell/teardrop shapes.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Balconette / Demi Bra</h4>
            <p className="text-slate-600 dark:text-slate-400">Lower-cut cups with wider-set straps that lift from the bottom. Excellent for shallow roots and open necklines.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Unlined Multi-Seam Bra</h4>
            <p className="text-slate-600 dark:text-slate-400">Constructed with 3 or 4 fabric seams to offer exceptional forward projection, breathability, and deep cup volume for fuller cups (DD+).</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Wireless Comfort / Bralette</h4>
            <p className="text-slate-600 dark:text-slate-400">Underwire-free support providing pressure-free comfort during leisure, pregnancy, sensitive tissue recovery, or lounging.</p>
          </div>
        </div>
      </section>

      {/* SECTION 16: BRA FIT DURING EXERCISE */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Bra Fit During Exercise
        </h2>
        <p>
          Daily wear bras and sports bras serve entirely different biomechanical objectives. During running, jumping, and high-impact sports, unrestrained breast tissue moves in a complex three-dimensional figure-eight pattern, accelerating up to several Gs.
        </p>
        <p>
          Extensive research on 98 sports bras published in sports biomechanics literature documented substantial variations in motion reduction across designs. High performance is a property of garment architecture—such as encapsulation cups, compression overlays, wide supportive underbands, and low-stretch fabrics—rather than simply choosing a larger cup size.
        </p>
      </section>

      {/* SECTION 17: HOW BODY CHANGES CAN AFFECT BRA SIZE */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          How Body Changes Can Affect Bra Size
        </h2>
        <p>
          Body measurements fluctuate across life stages. Weight shifts, fitness regimens, hormonal cycles, pregnancy, postpartum recovery, and aging all modify tissue density and ribcage circumference.
        </p>
        <p>
          When body composition shifts—which can be monitored alongside our <Link href="/calculators/body-fat-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Body Fat Calculator</Link> or evaluated against established body-mass frameworks in our <Link href="/calculators/ideal-weight-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Ideal Weight Calculator</Link>—underbust ribcage circumference often changes before breast tissue volume alters.
        </p>
        <p>
          A practical fitting principle is: <em>Fresh body measurements → New starting size → Physical fit check</em>.
        </p>
      </section>

      {/* SECTION 18: PREGNANCY AND POSTPARTUM FIT */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Pregnancy and Postpartum Fit
        </h2>
        <p>
          During the second and third trimesters of pregnancy, the ribcage naturally expands under hormonal influence (relaxin) to accommodate lung capacity, increasing underbust circumference by 2 to 4 inches.
        </p>
        <p>
          In postpartum and lactation phases, breast volume fluctuates substantially throughout the day. Flexible wireless bras with drop-down cups and multi-column hook extenders accommodate shifting volume without pinching sensitive milk ducts. Any persistent breast pain, inflammation, or skin injury should be evaluated by a healthcare professional.
        </p>
      </section>

      {/* SECTION 19: MEASURING WHEN BREASTS ARE UNEVEN */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Measuring When Breasts Are Uneven
        </h2>
        <p>
          Breast asymmetry is common and entirely normal. When breasts differ in size, always fit the bra to the larger breast to ensure the underwire and cup encase breast tissue without compression.
        </p>
        <p>
          To balance the smaller side, shorten the corresponding shoulder strap or insert a removable foam pad (&quot;cookie&quot;) into the cup. The calculator&apos;s Asymmetrical profile provides practical fit guidance without implying any medical diagnosis.
        </p>
      </section>

      {/* SECTION 20: COMMON BRA-FIT PROBLEMS */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Common Bra-Fit Problems
        </h2>
        <div className="space-y-2 text-xs">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Band riding up the back</span>
            <p className="text-slate-600 dark:text-slate-400">Band is too loose. Size down 1 band size (e.g. 36C → 34D).</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Cup spilling / &quot;Quad-boob&quot;</span>
            <p className="text-slate-600 dark:text-slate-400">Cup volume is too small. Increase cup size by 1 to 2 letters.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Cup gaping or wrinkling</span>
            <p className="text-slate-600 dark:text-slate-400">Cup volume is too large, or cup cut is too projected for a shallow breast root. Try a balconette or demi cut.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Underwires digging into tissue</span>
            <p className="text-slate-600 dark:text-slate-400">Wire root is too narrow or cup is too small. Size up 1 cup size.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Straps slipping off shoulders</span>
            <p className="text-slate-600 dark:text-slate-400">Often caused by a loose band allowing straps to sit too wide on shoulders. Check band firmness first.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Band feels painfully tight</span>
            <p className="text-slate-600 dark:text-slate-400">Check band backwards with cups hanging down your back. If the band feels comfortable backwards, the cups are too small rather than the band.</p>
          </div>
        </div>
      </section>

      {/* SECTION 21: HOW OFTEN SHOULD YOU RE-MEASURE? */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          How Often Should You Re-Measure?
        </h2>
        <p>
          There is no arbitrary calendar interval that applies to every body. Re-measuring is most valuable following real physical triggers:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li>noticeable weight loss or weight gain (&gt; 5 to 10 lbs)</li>
          <li>pregnancy, nursing, or weaning milestones</li>
          <li>changes in athletic training and torso muscle tone</li>
          <li>hormonal therapy or post-surgical recovery</li>
          <li>when favorite bras begin to feel uncomfortable or ride up</li>
        </ul>
      </section>

      {/* SECTION 22: BRA SIZE CALCULATOR LIMITATIONS */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Bra Size Calculator Limitations
        </h2>
        <p>
          This calculator provides a mathematical starting estimate derived from two circumference measurements and standard sizing progressions. It cannot directly measure:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li>volumetric breast tissue density or firmness</li>
          <li>chest wall curvature and sternum angle</li>
          <li>underwire cradle shape and spring</li>
          <li>manufacturer pattern grading and stretch tolerance</li>
        </ul>
        <p>
          Therefore, use the complete fitting workflow:
        </p>
        <div className="p-3 my-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">
          Measure → Calculate → Try on → Check 5 Fit Points → Adjust if Needed
        </div>
      </section>

      {/* SECTION 23: QUICK GUIDE */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Quick Guide: How to Use This Bra Size Calculator
        </h2>
        <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          <li><strong>Choose unit:</strong> Select inches or centimeters.</li>
          <li><strong>Enter underbust:</strong> Measure snugly around ribcage beneath breasts.</li>
          <li><strong>Enter bust:</strong> Measure gently around fullest point while standing upright.</li>
          <li><strong>Select region:</strong> Choose US/CAN, UK, IN, EU, FR, or AU sizing standard.</li>
          <li><strong>Review calculated size:</strong> View your primary band and cup designation.</li>
          <li><strong>Check conversion matrix:</strong> View equivalent international labels.</li>
          <li><strong>Evaluate sister sizes:</strong> Note tighter-band and looser-band alternatives.</li>
          <li><strong>Fine-tune shape profile:</strong> Select your breast shape for custom cut suggestions.</li>
          <li><strong>Try on and verify:</strong> Verify band levelness, cup containment, and gore flatness on body.</li>
        </ol>
      </section>

      {/* SECTION 24: DECISION TREE */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          A Simple Bra-Fitting Decision Tree
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto whitespace-pre">
{`Measure Underbust + Bust
          ↓
Calculate Starting Size
          ↓
Check Regional Label
          ↓
Try on Physical Bra
          ↓
Is the Band Comfortable & Level?
       /          \\
     No            Yes
     ↓              ↓
Check band       Check Cups
or sister size       ↓
                Cups Fit Smoothly?
                /      \\
              No        Yes
              ↓          ↓
        Adjust cup/    Check wires,
        sister size    center & straps
                           ↓
                      Overall Fit Confirmed`}
        </div>
      </section>

      {/* SECTION 25: SCIENTIFIC REFERENCES */}
      <section className="space-y-3 border-t border-slate-200 dark:border-slate-800 pt-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Scientific and Fit References
        </h2>
        <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
          <li>
            <strong>Bra fitting and measurement limitations:</strong> A cross-sectional investigation of 104 women published in clinical fitting literature demonstrated that tape-measure calculations differ significantly from sizes evaluated using professional fit assessment criteria.
          </li>
          <li>
            <strong>Breast biomechanics and support:</strong> Research published in <em>Applied Ergonomics</em> analyzed breast-support garments in larger-breasted females, quantifying significant reductions in biomechanical strain and discomfort when underband support is correctly matched to anatomy.
          </li>
          <li>
            <strong>Sports bra design and kinematics:</strong> A comprehensive study evaluating 98 sports bras identified that motion reduction is primarily driven by encapsulation structure, underband stiffness, and material modulus rather than nominal cup size alone.
          </li>
          <li>
            <strong>International size standardization:</strong> European standard <em>EN 13402</em> defines body measurement size designations for women&apos;s apparel, establishing the centimeter-based underbust band system and bust-to-underbust cup progressions.
          </li>
        </ul>
      </section>
    </article>
  );
}

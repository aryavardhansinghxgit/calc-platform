import React from "react";

export function StairContent() {
  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-200">
      {/* 1. Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          1. Introduction to Staircase Engineering &amp; Anatomy
        </h2>
        <p className="text-sm leading-relaxed">
          Staircase calculation is a fundamental discipline in architectural carpentry, civil engineering, and residential construction. A staircase is a continuous structural flight of steps connecting two vertical elevations. Designing a staircase requires precise mathematical coordination between vertical height (<strong>Total Rise</strong>), horizontal floor space (<strong>Total Run</strong>), human ergonomics, and stringent municipal building codes (such as the <strong>International Residential Code (IRC)</strong> and <strong>International Building Code (IBC)</strong>).
        </p>
        <p className="text-sm leading-relaxed">
          An error as minor as a quarter-inch (0.25 in) discrepancy on a single riser creates a significant tripping hazard, because the human brain develops a subconscious neuromuscular rhythm within the first two steps of ascending or descending stairs. Consequently, building codes enforce tight tolerances on uniform riser heights and tread depths across the entire flight.
        </p>
      </section>

      {/* 2. Core Architectural Terminology */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          2. Essential Stair Terminology &amp; Geometry
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/60 space-y-1">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">Total Rise (Height)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              The total vertical distance from the finished lower floor surface to the finished upper landing floor surface.
            </p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/60 space-y-1">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">Total Run (Length)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              The total horizontal distance spanned by the staircase, measured from the face of the first riser to the face of the final top riser.
            </p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/60 space-y-1">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">Unit Rise (Riser Height)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              The vertical height of an individual step, measured from the top surface of one tread to the top surface of the subsequent tread.
            </p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/60 space-y-1">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">Unit Run (Tread Depth)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              The horizontal walking depth of a single step, measured from the leading edge of one riser to the face of the next riser (excluding nosing overhang).
            </p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/60 space-y-1">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">Nosing Overhang</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              The portion of the tread that protrudes past the front surface of the vertical riser board below it (typically 0.75 to 1.25 inches).
            </p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/60 space-y-1">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">Stringer (Carriage)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              The structural diagonal 2x10 or 2x12 dimensional lumber beam supporting the weight of treads, risers, and occupants.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Mathematical Formulas */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          3. Mathematical Formulation &amp; Step Calculation
        </h2>
        
        <div className="p-4 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800 space-y-3 text-xs font-mono">
          <div className="space-y-1">
            <span className="font-bold text-blue-900 dark:text-blue-200">1. Number of Risers (Step Count):</span>
            <p className="text-zinc-800 dark:text-zinc-200">
              {"Number of Risers = Round(Total Rise / Target Riser Height)"}
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-blue-900 dark:text-blue-200">2. Exact Riser Height:</span>
            <p className="text-zinc-800 dark:text-zinc-200">
              {"Exact Riser Height (R) = Total Rise / Number of Risers"}
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-blue-900 dark:text-blue-200">3. Number of Treads:</span>
            <p className="text-zinc-800 dark:text-zinc-200">
              {"Standard Mount: Treads = Risers - 1  |  Flush Mount: Treads = Risers"}
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-blue-900 dark:text-blue-200">4. Total Run Length:</span>
            <p className="text-zinc-800 dark:text-zinc-200">
              {"Total Run = Number of Treads × Unit Run Depth"}
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-blue-900 dark:text-blue-200">5. Incline Angle (θ):</span>
            <p className="text-zinc-800 dark:text-zinc-200">
              {"θ = arctan(Total Rise / Total Run) × (180 / π)"}
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-blue-900 dark:text-blue-200">6. Stringer Diagonal Length:</span>
            <p className="text-zinc-800 dark:text-zinc-200">
              {"Stringer Length = √((Total Rise)² + (Total Run)²)"}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Ergonomic Rules of Thumb & Blondel's Formula */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          4. Ergonomic Proportions &amp; Blondel&apos;s Formula
        </h2>
        <p className="text-sm leading-relaxed">
          In 1675, French architect François Blondel published the famous ergonomic relationship between riser height (R) and tread run (T) based on the average human walking pace of 64 to 65 cm (25 to 25.5 inches):
        </p>
        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-center font-mono font-bold text-sm text-blue-800 dark:text-blue-300">
          2R + T = 24 to 25 inches (61 to 64 cm)
        </div>
        <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          • If riser height is short (e.g., 6 in), the tread must be longer (12 to 13 in) to maintain natural stride.<br />
          • If riser height is steep (e.g., 7.5 in), the tread is standard (10 in), yielding 2(7.5) + 10 = 25 in.
        </p>
      </section>

      {/* 5. Building Code Standards (IRC vs IBC) */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          5. International Building Code (IRC vs. IBC) Specifications
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
              <tr>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Dimension Parameter</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">IRC (Residential)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">IBC (Commercial)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Engineering Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2 font-semibold">Maximum Riser Height</td>
                <td className="p-2">7.75 in (197 mm)</td>
                <td className="p-2">7.00 in (178 mm)</td>
                <td className="p-2">Prevents steep overexertion &amp; falling forward on descent</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Minimum Tread Depth</td>
                <td className="p-2">10.0 in (254 mm)</td>
                <td className="p-2">11.0 in (279 mm)</td>
                <td className="p-2">Ensures adequate heel support and foot placement</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Minimum Headroom Clearance</td>
                <td className="p-2">80 in (6 ft 8 in / 2032 mm)</td>
                <td className="p-2">80 in (2032 mm)</td>
                <td className="p-2">Measured vertically from sloped nosing plane to ceiling</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Minimum Stairway Width</td>
                <td className="p-2">36 in (914 mm)</td>
                <td className="p-2">44 in (1118 mm) for &gt; 50 occupants</td>
                <td className="p-2">Accommodates emergency egress &amp; furniture transport</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Max Step-to-Step Variation</td>
                <td className="p-2">0.375 in (3/8 in / 9.5 mm)</td>
                <td className="p-2">0.375 in (9.5 mm)</td>
                <td className="p-2">Prevents subconscious cadence trip hazards</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Nosing Overhang Range</td>
                <td className="p-2">0.75 in to 1.25 in</td>
                <td className="p-2">0.75 in to 1.25 in</td>
                <td className="p-2">Provides toe clearance without snagging descending heels</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Stringer Layout & "Dropping the Stringer" Carpentry Rule */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          6. Carpenter&apos;s Guide: Dropping the Stringer
        </h2>
        <p className="text-sm leading-relaxed">
          The most critical and commonly misunderstood step in stair carpentry is <strong>&quot;dropping the stringer&quot;</strong> at the bottom.
        </p>
        <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800 space-y-1 text-xs">
          <span className="font-bold text-amber-900 dark:text-amber-200 block">The Bottom Cut Rule:</span>
          <p className="text-amber-800 dark:text-amber-300">
            When laying out the stringer notches, the bottom of the stringer must be shortened (cut off) by an amount exactly equal to the <strong>thickness of the tread material</strong> (e.g., 1.0 in). 
          </p>
          <p className="text-amber-800 dark:text-amber-300">
            <strong>Why?</strong> Adding a 1.0 in tread on top of the bottom step increases the bottom riser by 1.0 in. Conversely, adding the same tread to the step above increases its height, keeping intermediate risers identical. Without trimming the bottom stringer foot by 1.0 in, the first step would be 1.0 in too tall, and the top step would be 1.0 in too short!
          </p>
        </div>
      </section>

      {/* 7. Worked Example */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          7. Step-by-Step Worked Calculation Example
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-3 text-xs">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            <strong>Problem:</strong> Calculate a straight staircase for an 8-foot basement ceiling with a finished floor-to-floor Total Rise of 108 inches (9 ft). Assume a target riser height of 7.5 in and standard 10 in unit run.
          </p>
          
          <div className="space-y-1.5 font-mono">
            <p><strong>Step 1: Calculate Risers Count</strong><br />
            {"N_risers = 108 / 7.5 = 14.4 => 14 risers"}</p>

            <p><strong>Step 2: Calculate Exact Unit Riser Height</strong><br />
            {"R = 108 / 14 = 7.714 in ≈ 7 11/16 inches (Complies with IRC max 7.75 in)"}</p>

            <p><strong>Step 3: Calculate Treads Count &amp; Total Run</strong><br />
            {"N_treads = 14 - 1 = 13 treads"}<br />
            {"Total Run = 13 × 10 = 130 inches (10 ft 10 in)"}</p>

            <p><strong>Step 4: Calculate Incline Angle</strong><br />
            {"θ = arctan(108 / 130) = arctan(0.8307) = 39.7°"}</p>

            <p><strong>Step 5: Calculate Stringer Length</strong><br />
            {"L = √(108² + 130²) = √(11664 + 16900) = √28564 = 169.0 inches (14.08 ft)"}<br />
            Select a 16-foot 2x12 dimensional board to allow for plumb and level mounting cuts.</p>
          </div>
        </div>
      </section>

      {/* 8. Summary */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          8. Summary &amp; Best Practices Checklist
        </h2>
        <ul className="list-disc list-inside text-xs space-y-1 text-zinc-700 dark:text-zinc-300">
          <li>Always measure <strong>finished floor to finished floor</strong>, accounting for underlayment, hardwood, tile, or carpet thickness.</li>
          <li>Ensure headroom clearance never drops below 80 inches (6 ft 8 in) beneath the upper floor joists.</li>
          <li>For residential stair widths ≤ 36 in, use at least 3 stringers. For widths 37 to 48 in, use 4 stringers to prevent tread deflection.</li>
          <li>Fasten stringers securely using structural steel stair stringer brackets (e.g. Simpson Strong-Tie connectors) rather than relying solely on toenailing.</li>
        </ul>
      </section>
    </div>
  );
}

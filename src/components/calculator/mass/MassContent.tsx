import React from "react";

export function MassContent() {
  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-200">
      {/* 1. Introduction & Mass vs Weight */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          1. Physical Definitions: Mass versus Weight
        </h2>
        <p className="text-sm leading-relaxed">
          In everyday conversational language, the terms <em>mass</em> and <em>weight</em> are frequently conflated, yet in classical mechanics and metrology, they represent fundamentally distinct physical quantities:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-blue-50/50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 space-y-1">
            <h3 className="font-bold text-blue-900 dark:text-blue-200 text-sm">Mass ($m$) — Scalar Invariant</h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              An intrinsic scalar measure of the amount of matter within an object and its resistance to linear acceleration when subjected to a net force ($F = ma$). Measured in <strong>Kilograms (kg)</strong> or grams. An object with a mass of 70 kg retains exactly 70 kg of mass on Earth, on the Moon, or in deep interstellar space.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">Weight ($W$) — Gravitational Vector Force</h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              The downward gravitational force exerted on a mass by a planetary body: $W = m \cdot g$. Measured in <strong>Newtons (N)</strong> or Pound-force (lbf). Because the Moon&apos;s surface gravity is only 1.622 m/s² (~1/6th of Earth&apos;s 9.807 m/s²), a 70 kg person weighs ~686 N (154 lbs) on Earth but only ~114 N (25.5 lbs) on the lunar surface.
            </p>
          </div>
        </div>
      </section>

      {/* 2. The 2019 BIPM Kilogram Redefinition via Planck Constant */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          2. The 2019 BIPM Redefinition of the Kilogram
        </h2>
        <p className="text-sm leading-relaxed">
          From 1889 to May 20, 2019, the kilogram was defined by the <em>International Prototype of the Kilogram (IPK)</em>—a physical cylinder of 90% platinum and 10% iridium alloy housed in a triple-vacuum vault at the BIPM in Sèvres, France. Over 130 years, periodic micro-comparisons revealed that duplicate prototypes had drifted in mass by ~50 micrograms relative to the official artifact.
        </p>
        <p className="text-sm leading-relaxed">
          At the 26th General Conference on Weights and Measures (CGPM), metrologists universally replaced physical artifacts by defining the kilogram in terms of an immutable physical constant: the <strong>Planck constant (h = 6.62607015 × 10⁻³⁴ J·s)</strong>, measured with sub-part-per-billion precision via the <strong>Kibble Balance (watt balance)</strong> and the <strong>Avogadro Silicon Sphere Project</strong>.
        </p>
      </section>

      {/* 3. Mathematical Formulations */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          3. Mathematical Conversion Formulations &amp; Dimensional Ratios
        </h2>

        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-2 text-xs font-mono">
          <p className="font-bold text-blue-800 dark:text-blue-300">
            A. Standard Unit Ratio Conversion (SI to Imperial)
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            {"1 International Avoirdupois Pound (lb) = 0.45359237 kg (Exact Definition)"}<br />
            {"1 Kilogram (kg) = 1 / 0.45359237 ≈ 2.2046226218 lbs"}<br />
            {"1 Stone (UK st) = 14 lbs = 6.35029318 kg"}<br />
            {"1 Ounce (oz) = 1/16 lb = 28.349523125 g"}<br />
            {"1 Metric Carat (ct) = 200 mg = 0.0002 kg"}
          </p>

          <p className="font-bold text-blue-800 dark:text-blue-300 pt-2">
            B. Mass from Density and Displaced Volume
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            {"m = ρ × V"}<br />
            {"Example: Steel block (ρ = 7,850 kg/m³) of volume 0.25 m³:"}<br />
            {"m = 7,850 kg/m³ × 0.25 m³ = 1,962.5 kg (1.9625 metric tonnes = 4,326.58 lbs)"}
          </p>

          <p className="font-bold text-blue-800 dark:text-blue-300 pt-2">
            C. Gravitational Weight Equation Across Planets
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            {"Weight (Newtons) = m × g_surface"}<br />
            {"Where g_Earth = 9.80665 m/s², g_Moon = 1.622 m/s², g_Mars = 3.711 m/s², g_Jupiter = 24.79 m/s²"}
          </p>
        </div>
      </section>

      {/* 4. Comprehensive Mass Units Reference Table */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          4. Comprehensive Mass &amp; Weight Conversion Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
              <tr>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Unit Name</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Symbol</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Exact SI Equivalent (kg)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Pounds Equivalent (lbs)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2 font-bold">Kilogram (SI Base)</td>
                <td className="p-2 font-mono">kg</td>
                <td className="p-2 font-mono">1.0 kg</td>
                <td className="p-2 font-mono">2.20462 lbs</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Pound (Avoirdupois)</td>
                <td className="p-2 font-mono">lbs</td>
                <td className="p-2 font-mono">0.45359237 kg</td>
                <td className="p-2 font-mono">1.0 lbs</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Ounce (Avoirdupois)</td>
                <td className="p-2 font-mono">oz</td>
                <td className="p-2 font-mono">0.028349523125 kg (28.35 g)</td>
                <td className="p-2 font-mono">0.0625 lbs (1/16 lb)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Stone (UK)</td>
                <td className="p-2 font-mono">st</td>
                <td className="p-2 font-mono">6.35029318 kg</td>
                <td className="p-2 font-mono">14.0 lbs</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Metric Ton (Tonne)</td>
                <td className="p-2 font-mono">t</td>
                <td className="p-2 font-mono">1,000.0 kg</td>
                <td className="p-2 font-mono">2,204.62 lbs</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Short Ton (US)</td>
                <td className="p-2 font-mono">ton (US)</td>
                <td className="p-2 font-mono">907.18474 kg</td>
                <td className="p-2 font-mono">2,000.0 lbs</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Long Ton (UK Imperial)</td>
                <td className="p-2 font-mono">ton (UK)</td>
                <td className="p-2 font-mono">1,016.0469088 kg</td>
                <td className="p-2 font-mono">2,240.0 lbs</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Atomic Mass Unit (Dalton)</td>
                <td className="p-2 font-mono">u / Da</td>
                <td className="p-2 font-mono">1.66053906660 × 10⁻²⁷ kg</td>
                <td className="p-2 font-mono">3.66086 × 10⁻²⁷ lbs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Worked Step-by-Step Calculation Example */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          5. Step-by-Step Worked Conversion Example
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2 font-mono text-xs">
          <p className="font-sans font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
            <strong>Problem:</strong> Convert 185.5 pounds (lbs) to kilograms (kg), stones (st), and determine the individual&apos;s weight on the surface of Mars (g = 3.711 m/s²).
          </p>

          <p><strong>Step 1: Convert Pounds to Kilograms</strong><br />
          {"m_kg = 185.5 lbs × 0.45359237 kg/lb = 84.14138 kg ≈ 84.14 kg"}</p>

          <p><strong>Step 2: Convert to UK Stones and Ounces</strong><br />
          {"Stones = 185.5 / 14 = 13.25 stones = 13 st 3.5 lbs"}</p>

          <p><strong>Step 3: Calculate Weight on Mars</strong><br />
          {"Weight_Mars = 84.14138 kg × 3.711 m/s² = 312.25 Newtons (N)"}<br />
          {"Apparent Earth-scale Weight = 84.14138 kg × (3.711 / 9.80665) = 31.84 kg (70.2 lbs)"}</p>
        </div>
      </section>
    </div>
  );
}

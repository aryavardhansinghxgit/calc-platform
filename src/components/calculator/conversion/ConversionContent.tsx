import React from "react";

export function ConversionContent() {
  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-200">
      {/* 1. Introduction & Historical Context */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          1. Metrology &amp; The Evolution of Measurement Systems
        </h2>
        <p className="text-sm leading-relaxed">
          Metrology—the scientific study of measurement—forms the foundation of global commerce, engineering, and scientific research. Early human civilizations devised anatomical and agricultural standards, such as the ancient Egyptian royal cubit (the length of the Pharaoh’s forearm plus palm width) and the English grain (the mass of a single barleycorn).
        </p>
        <p className="text-sm leading-relaxed">
          The French Revolution of 1789 catalyzed the development of the <strong>Metric System (Système Métrique)</strong>, establishing base-10 decimal scaling anchored to invariant terrestrial dimensions (originally defining the meter as one ten-millionth of the distance from the North Pole to the Equator along the Paris meridian). Today, the <strong>International System of Units (SI)</strong>, overseen by the International Bureau of Weights and Measures (BIPM), standardizes seven base physical quantities tied directly to fundamental universal physical constants.
        </p>
      </section>

      {/* 2. The 7 Fundamental SI Base Units */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          2. The Seven Fundamental SI Base Units (2019 BIPM Redefinition)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
              <tr>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Quantity</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Base Unit</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Symbol</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Defining Physical Constant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2 font-bold">Length</td>
                <td className="p-2">Meter</td>
                <td className="p-2 font-mono">m</td>
                <td className="p-2">Speed of light in vacuum: c = 299,792,458 m/s</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Mass</td>
                <td className="p-2">Kilogram</td>
                <td className="p-2 font-mono">kg</td>
                <td className="p-2">Planck constant: h = 6.62607015 × 10⁻³⁴ J⋅s</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Time</td>
                <td className="p-2">Second</td>
                <td className="p-2 font-mono">s</td>
                <td className="p-2">Cesium-133 hyperfine transition frequency: Δν(Cs) = 9,192,631,770 Hz</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Electric Current</td>
                <td className="p-2">Ampere</td>
                <td className="p-2 font-mono">A</td>
                <td className="p-2">Elementary electric charge: e = 1.602176634 × 10⁻¹⁹ C</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Thermodynamic Temp</td>
                <td className="p-2">Kelvin</td>
                <td className="p-2 font-mono">K</td>
                <td className="p-2">Boltzmann constant: k = 1.380649 × 10⁻²³ J/K</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Amount of Substance</td>
                <td className="p-2">Mole</td>
                <td className="p-2 font-mono">mol</td>
                <td className="p-2">Avogadro constant: N(A) = 6.02214076 × 10²³ mol⁻¹</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Luminous Intensity</td>
                <td className="p-2">Candela</td>
                <td className="p-2 font-mono">cd</td>
                <td className="p-2">Luminous efficacy: K(cd) = 683 lm/W</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Mathematical Principles of Dimensional Analysis */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          3. Mathematical Principles: Unit Factor Method (Dimensional Analysis)
        </h2>
        <p className="text-sm leading-relaxed">
          Linear unit conversions rely on the <strong>Unit Factor Method</strong> (also known as the Factor-Label Method). Every conversion factor represents a dimensionless ratio equal to 1, ensuring mathematical invariance during algebraic cancellation:
        </p>

        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-2 text-xs font-mono">
          <p className="font-bold text-blue-800 dark:text-blue-300">
            A. Standard Linear Ratio Multiplication Formula
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            {"Value(Target Unit) = Value(Source Unit) × [ Factor(Source → Base) / Factor(Target → Base) ]"}<br />
            {"Example: 5.0 miles to meters = 5.0 mi × (1609.344 m / 1 mi) = 8,046.72 m"}
          </p>

          <p className="font-bold text-blue-800 dark:text-blue-300 pt-2">
            B. Non-Linear Affine Temperature Transformations (Non-Zero Origin)
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            {"T(°F) = [ T(°C) × (9/5) ] + 32"}<br />
            {"T(°C) = [ T(°F) - 32 ] × (5/9)"}<br />
            {"T(K)  = T(°C) + 273.15"}
          </p>

          <p className="font-bold text-blue-800 dark:text-blue-300 pt-2">
            C. Reciprocal Inverse Transformations (Automotive Fuel Economy)
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            {"L/100km = 235.214583 / MPG(US)"}<br />
            {"km/L = MPG(US) × 0.4251437"}
          </p>
        </div>
      </section>

      {/* 4. Exact International Conversion Factors Reference Table */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          4. Key Standard International Conversion Factors Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
              <tr>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Category</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Imperial / US Customary Unit</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Exact SI Metric Equivalent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2 font-bold">Length</td>
                <td className="p-2">1 International Inch (in)</td>
                <td className="p-2 font-mono">0.0254 m = 2.54 cm (Exact by 1959 Agreement)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Mass</td>
                <td className="p-2">1 International Avoirdupois Pound (lb)</td>
                <td className="p-2 font-mono">0.45359237 kg (Exact)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Volume</td>
                <td className="p-2">1 US Liquid Gallon (gal)</td>
                <td className="p-2 font-mono">3.785411784 Liters = 231 cubic inches</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Area</td>
                <td className="p-2">1 Acre (ac)</td>
                <td className="p-2 font-mono">4,046.8564224 m² = 43,560 sq ft</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Pressure</td>
                <td className="p-2">1 Pound per Square Inch (psi)</td>
                <td className="p-2 font-mono">6,894.757293 Pa ≈ 6.895 kPa</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Power</td>
                <td className="p-2">1 Mechanical Horsepower (hp)</td>
                <td className="p-2 font-mono">745.69987158227 Watts (550 ft⋅lbf/s)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Energy</td>
                <td className="p-2">1 British Thermal Unit (BTU ISO)</td>
                <td className="p-2 font-mono">1,055.05585257341 Joules (J)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Worked Step-by-Step Calculation Example */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          5. Step-by-Step Worked Conversion Calculations
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2 font-mono text-xs">
          <p className="font-sans font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
            <strong>Example 1 (Pressure):</strong> Convert 35.0 PSI (typical vehicle tire pressure) to Kilopascals (kPa) and Bar.
          </p>

          <p><strong>Step 1: Convert PSI to Base SI Unit (Pascal)</strong><br />
          {"1 psi = 6,894.757293 Pa"}<br />
          {"35.0 psi × 6,894.757293 Pa/psi = 241,316.505 Pa"}</p>

          <p><strong>Step 2: Convert Pascal to Kilopascal (kPa)</strong><br />
          {"241,316.505 Pa / 1,000 = 241.32 kPa"}</p>

          <p><strong>Step 3: Convert Pascal to Bar</strong><br />
          {"1 bar = 100,000 Pa"}<br />
          {"241,316.505 Pa / 100,000 = 2.413 bar"}</p>
        </div>
      </section>
    </div>
  );
}

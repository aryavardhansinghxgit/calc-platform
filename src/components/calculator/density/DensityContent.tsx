import React from "react";

export function DensityContent() {
  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-200">
      {/* 1. Introduction & Physical Definition */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          1. Physical Definition of Density &amp; Fundamental Principles
        </h2>
        <p className="text-sm leading-relaxed">
          Density ($\rho$, Greek letter rho) is an intrinsic physical property of matter defined as the ratio of an object&apos;s mass ($m$) to its occupied three-dimensional volume ($V$). Because density is an intensive property—independent of sample size or geometric extent—it serves as a foundational metric in material characterization, fluid statics, structural engineering, and astrophysics.
        </p>
      </section>

      {/* 2. Mathematical Equations & Governing Laws */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          2. Mathematical Formulations &amp; Governing Equations
        </h2>

        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-3 text-xs font-mono">
          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">
              A. Core Density, Mass, and Volume Triad Formulas
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Density (ρ) = m / V  [SI Unit: kg/m³ or g/cm³]"}<br />
              {"Mass (m)    = ρ × V  [SI Unit: kg or g]"}<br />
              {"Volume (V)  = m / ρ  [SI Unit: m³ or cm³]"}<br />
              {"Conversion: 1 g/cm³ = 1,000 kg/m³ = 62.428 lb/ft³ = 8.345 lb/gal (US)"}
            </p>
          </div>

          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">
              B. Archimedes&apos; Principle &amp; Specific Gravity (Buoyancy Equilibrium)
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Buoyant Force (F_b) = ρ_fluid × V_displaced × g"}<br />
              {"Specific Gravity (SG) = ρ_substance / ρ_water_at_4C (where ρ_water = 1,000 kg/m³)"}<br />
              {"Floating Condition: If SG < 1.0, object floats with Submerged Fraction % = SG × 100%"}<br />
              {"Sinking Condition: If SG > 1.0, downward gravitational weight exceeds buoyant force."}
            </p>
          </div>

          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">
              C. Ideal Gas Density Equation (Thermodynamic State Law)
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"ρ_gas = (P × M) / (R × T)"}<br />
              {"Where: P = Absolute Pressure (Pa), M = Molar Mass (kg/mol), R = 8.31446 J/(mol·K), T = Absolute Temp (K)"}
            </p>
          </div>
        </div>
      </section>

      {/* 3. The 4°C Water Density Anomaly */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          3. Thermodynamic Anomaly: Water&apos;s Maximum Density at 3.98°C
        </h2>
        <p className="text-sm leading-relaxed">
          Unlike most substances which monotonically contract and become denser as temperature decreases toward the freezing point, liquid water exhibits a well-documented density anomaly. Between 0°C and 3.98°C, thermal contraction competes with the expansion caused by the formation of an open, tetrahedral hydrogen-bonded cage network.
        </p>
        <p className="text-sm leading-relaxed">
          At 3.98°C (approx. 4.0°C), pure liquid water achieves its maximum density of <strong>999.97 kg/m³ (~1.0000 g/cm³)</strong>. When water freezes into hexagonal ice at 0°C, the rigid crystal lattice expands volume by ~9%, dropping density to <strong>917 kg/m³</strong>. This ensures ice floats on lakes and oceans, insulating aquatic ecosystems from freezing solid.
        </p>
      </section>

      {/* 4. Comprehensive Substance Density Reference Table */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          4. Material Density &amp; Specific Gravity Reference Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
              <tr>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Substance Name</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">State / Category</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Density (kg/m³)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Density (g/cm³)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Specific Gravity</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Buoyancy in Water</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2 font-bold text-amber-700 dark:text-amber-300">Gold (24K Pure)</td>
                <td className="p-2">Precious Metal</td>
                <td className="p-2">19,300 kg/m³</td>
                <td className="p-2">19.30 g/cm³</td>
                <td className="p-2">19.30</td>
                <td className="p-2 font-semibold text-rose-600">Sinks (Rapid)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">Lead</td>
                <td className="p-2">Heavy Metal</td>
                <td className="p-2">11,340 kg/m³</td>
                <td className="p-2">11.34 g/cm³</td>
                <td className="p-2">11.34</td>
                <td className="p-2 font-semibold text-rose-600">Sinks</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-blue-700 dark:text-blue-300">Steel / Carbon Iron</td>
                <td className="p-2">Structural Alloy</td>
                <td className="p-2">7,850 kg/m³</td>
                <td className="p-2">7.85 g/cm³</td>
                <td className="p-2">7.85</td>
                <td className="p-2 font-semibold text-rose-600">Sinks</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-zinc-700 dark:text-zinc-300">Concrete (Reinforced)</td>
                <td className="p-2">Civil Masonry</td>
                <td className="p-2">2,400 kg/m³</td>
                <td className="p-2">2.40 g/cm³</td>
                <td className="p-2">2.40</td>
                <td className="p-2 font-semibold text-rose-600">Sinks</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-blue-900 dark:text-blue-200">Pure Water (4°C)</td>
                <td className="p-2">Standard Liquid</td>
                <td className="p-2 font-bold">1,000 kg/m³</td>
                <td className="p-2 font-bold">1.000 g/cm³</td>
                <td className="p-2 font-bold">1.000</td>
                <td className="p-2 font-semibold text-amber-600">Neutral (Standard)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-sky-700 dark:text-sky-300">Ice (0°C)</td>
                <td className="p-2">Solid Water</td>
                <td className="p-2">917 kg/m³</td>
                <td className="p-2">0.917 g/cm³</td>
                <td className="p-2">0.917</td>
                <td className="p-2 font-semibold text-emerald-600">Floats (91.7% Submerged)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-amber-800 dark:text-amber-200">Oak Hardwood</td>
                <td className="p-2">Seasoned Timber</td>
                <td className="p-2">750 kg/m³</td>
                <td className="p-2">0.750 g/cm³</td>
                <td className="p-2">0.750</td>
                <td className="p-2 font-semibold text-emerald-600">Floats (75% Submerged)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-red-700 dark:text-red-300">Gasoline / Petrol</td>
                <td className="p-2">Hydrocarbon Liquid</td>
                <td className="p-2">740 kg/m³</td>
                <td className="p-2">0.740 g/cm³</td>
                <td className="p-2">0.740</td>
                <td className="p-2 font-semibold text-emerald-600">Floats on Water</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-zinc-600 dark:text-zinc-400">Air (Sea level, 20°C)</td>
                <td className="p-2">Atmospheric Gas</td>
                <td className="p-2">1.204 kg/m³</td>
                <td className="p-2">0.00120 g/cm³</td>
                <td className="p-2">0.0012</td>
                <td className="p-2 font-semibold text-emerald-600">Buoyant in Fluid</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Step-by-Step Worked Calculation Example */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          5. Step-by-Step Worked Calculation Examples
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2 font-mono text-xs">
          <p className="font-sans font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
            <strong>Problem:</strong> An unknown metallic block weighs 4.45 kg and occupies a volume of 500 cm³ (0.0005 m³). Determine its density in kg/m³, g/cm³, specific gravity, and identify the material.
          </p>

          <p><strong>Step 1: Calculate Density in SI Units (kg/m³)</strong><br />
          {"ρ = m / V = 4.45 kg / 0.0005 m³ = 8,900 kg/m³"}</p>

          <p><strong>Step 2: Convert to Grams per Cubic Centimeter (g/cm³)</strong><br />
          {"ρ = 8,900 kg/m³ / 1,000 = 8.90 g/cm³"}</p>

          <p><strong>Step 3: Calculate Specific Gravity and Buoyancy</strong><br />
          {"SG = 8,900 / 1,000 = 8.90"}<br />
          {"Since SG > 1.0, the block sinks rapidly in water. Material identification: Copper (Standard pure copper ρ = 8,960 kg/m³)."}</p>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { weight_calculatorFaqs } from "@/app/calculators/weight-calculator/faq";

export function MassContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200">
      {/* ─── 1. RELATED CALCULATORS — ABOVE CONTENT ─── */}
      <div className="no-print -mt-2 pb-4 border-b border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
          RELATED CALCULATORS:
        </span>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <Link
            href="/calculators/conversion-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Conversion Calculator
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <Link
            href="/calculators/scientific-notation-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Scientific Notation Calculator &amp; Converter
          </Link>
        </div>
      </div>

      {/* ─── 1. Introduction ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          1. Weight Calculator: Mass, Weight, Density &amp; Unit Conversion
        </h2>
        <p className="text-sm leading-relaxed">
          The Weight Calculator is a multi-purpose physics and measurement tool for calculating mass from density and volume, converting common mass and weight units, and determining how the gravitational force on a given mass changes on different celestial bodies.
        </p>
        <p className="text-sm leading-relaxed">
          The calculator combines three closely related tasks that are often confused:
        </p>
        <p className="text-sm leading-relaxed font-semibold text-blue-800 dark:text-blue-300 pl-3 border-l-2 border-blue-500">
          mass calculation, mass/weight unit conversion, and gravitational weight calculation.
        </p>
        <p className="text-sm leading-relaxed">
          That distinction is important. A kilogram is a unit of mass, while weight in the technical physics sense is a force caused by gravity. The National Institute of Standards and Technology (NIST) explicitly recommends making the meaning of the word <em>weight</em> clear because everyday usage commonly treats weight as a synonym for mass, while scientific usage treats weight as a force.
        </p>
        <p className="text-sm leading-relaxed">
          The calculator therefore provides both the familiar everyday conversions, such as kilograms to pounds, and the physics relationship:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700 text-center font-mono text-sm">
          <span className="font-bold text-blue-900 dark:text-blue-200">W = mg</span>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          where <strong>W</strong> is gravitational weight force in newtons, <strong>m</strong> is mass in kilograms, and <strong>g</strong> is local acceleration due to gravity in m/s². The suite integrates a density × volume engine, a 15-unit mass conversion matrix, 39 material presets, and a six-body planetary comparison tool.
        </p>
      </section>

      {/* ─── 2. Mass vs Weight ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          2. Mass vs Weight: What Is the Difference?
        </h2>
        <p className="text-sm leading-relaxed">
          The terms <em>mass</em> and <em>weight</em> are often used interchangeably in everyday conversation, but they describe fundamentally different physical quantities:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800 space-y-2">
            <h3 className="font-bold text-blue-900 dark:text-blue-200 text-sm">
              Mass (m) — Scalar Invariant
            </h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Mass describes an object&apos;s inertial property and, in ordinary engineering contexts, how much matter the object contains and its resistance to linear acceleration when subjected to a net force (F = ma).
            </p>
            <div className="p-2 bg-white dark:bg-zinc-900 rounded border border-blue-200 dark:border-blue-800 text-center font-mono font-bold text-blue-900 dark:text-blue-300">
              SI Base Unit: kilogram (kg)
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              The kilogram is anchored to the fixed numerical value of the Planck constant (h = 6.62607015 × 10⁻³⁴ J·s).
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-2">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
              Weight (W) — Gravitational Vector Force
            </h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              In technical use, weight is the gravitational force exerted on an object by a celestial body: W = mg. NIST describes weight in science and technology as the force associated with local gravitational acceleration.
            </p>
            <div className="p-2 bg-white dark:bg-zinc-900 rounded border border-slate-200 dark:border-zinc-700 text-center font-mono font-bold text-zinc-900 dark:text-zinc-200">
              SI Derived Unit: newton (N)
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              1 N = 1 kg·m/s². In US customary units, weight force is measured in pound-force (lbf).
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed">
          This means an object&apos;s mass remains constant while its gravitational weight changes. An object with a mass of 70 kg remains a 70 kg mass on Earth, on the Moon, and on Mars. What changes is the gravitational force acting upon that mass. That invariant principle governs the Planetary Weight Visualizer.
        </p>
      </section>

      {/* ─── 3. The Main Formula: Mass From Density and Volume ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          3. The Main Formula: Mass From Density and Volume
        </h2>
        <p className="text-sm leading-relaxed">
          One of the primary functions of the calculator is determining mass from volumetric density:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700 text-center space-y-1">
          <div className="font-mono text-base font-bold text-blue-900 dark:text-blue-200">
            m = ρ × V
          </div>
          <p className="text-xs text-zinc-500">
            where <strong>m</strong> = mass, <strong>ρ</strong> (rho) = volumetric mass density, and <strong>V</strong> = volume.
          </p>
        </div>
        <p className="text-sm leading-relaxed">
          The dimensional relationship in SI units verifies complete dimensional consistency:
        </p>
        <div className="p-2 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-700 text-center font-mono text-xs text-zinc-700 dark:text-zinc-300">
          (kg / m³) × m³ = kg
        </div>
        <p className="text-sm leading-relaxed">
          The spatial cubic meters cancel exactly, leaving kilograms. For example, if a material has a density of ρ = 8,900 kg/m³ and occupies V = 1 m³, then:
        </p>
        <p className="text-sm font-mono font-semibold text-center text-blue-900 dark:text-blue-200">
          m = 8,900 kg/m³ × 1 m³ = 8,900 kg
        </p>
        <p className="text-xs text-zinc-500">
          This represents the calculator&apos;s reference copper calculation and is independently verified by the production QA test suite.
        </p>
      </section>

      {/* ─── 4. What Is Density? ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          4. What Is Density?
        </h2>
        <p className="text-sm leading-relaxed">
          Density describes how much mass occupies a given unit volume. The fundamental relationship is:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs font-mono">
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700">
            <span className="text-[10px] text-zinc-400 block font-sans">Solve for Mass</span>
            <span className="font-bold text-blue-800 dark:text-blue-300">m = ρ × V</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700">
            <span className="text-[10px] text-zinc-400 block font-sans">Solve for Density</span>
            <span className="font-bold text-blue-800 dark:text-blue-300">ρ = m / V</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700">
            <span className="text-[10px] text-zinc-400 block font-sans">Solve for Volume</span>
            <span className="font-bold text-blue-800 dark:text-blue-300">V = m / ρ</span>
          </div>
        </div>
        <p className="text-sm leading-relaxed">
          This makes density especially useful when material composition and physical dimensions are known but total mass is not. A cubic meter of a dense noble metal like platinum (21,450 kg/m³) contains far more mass than a cubic meter of oak hardwood (750 kg/m³) or water (1,000 kg/m³).
        </p>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          The calculator automatically normalizes over 39 density units and 18 volume units into SI base representations before calculating mass, ensuring equivalent physical inputs yield identical mass outputs.
        </p>
      </section>

      {/* ─── 5. Unit Compatibility ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          5. Density Units Must Match the Volume Unit
        </h2>
        <p className="text-sm leading-relaxed">
          A frequent source of engineering error is combining incompatible unit dimensions without intermediate conversion. Suppose:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700 font-mono text-xs space-y-1">
          <p>ρ = 8,900 kg/m³ = 8.9 g/cm³ = 8.9 kg/L</p>
          <p>V = 1 m³ = 1,000,000 cm³ = 1,000 L</p>
        </div>
        <p className="text-sm leading-relaxed">
          Multiplying 8.9 g/cm³ by 1,000,000 cm³ yields:
        </p>
        <p className="text-xs font-mono font-semibold text-center text-blue-900 dark:text-blue-200">
          8.9 g/cm³ × 1,000,000 cm³ = 8,900,000 g = 8,900 kg
        </p>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          The calculator&apos;s density-invariance test confirms that equivalent density and volume representations produce the exact same physical mass.
        </p>
      </section>

      {/* ─── 6. Worked Example: Copper ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          6. Worked Example: 8,900 kg/m³ × 1 m³
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700 font-mono text-xs space-y-2">
          <p className="font-sans font-semibold text-zinc-900 dark:text-zinc-100">
            Consider a solid block of refined copper with density ρ = 8,900 kg/m³ occupying volume V = 1 m³:
          </p>
          <p><strong>Step 1: Apply the equation</strong><br />m = ρ × V</p>
          <p><strong>Step 2: Substitute parameters</strong><br />m = (8,900 kg/m³) × (1 m³)</p>
          <p><strong>Step 3: Calculate mass</strong><br />m = 8,900 kg</p>
          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300">
            <span className="font-sans font-bold text-zinc-800 dark:text-zinc-200 block mb-1">Equivalent Mass Unit Conversions:</span>
            <p>• Pounds (Avoirdupois): 8,900 / 0.45359237 ≈ 19,621.1413 lbs</p>
            <p>• Grams: 8,900 × 1,000 = 8,900,000 g</p>
            <p>• Metric Tonnes: 8,900 / 1,000 = 8.9 t</p>
            <p>• US Short Tons: 8,900 / 907.18474 ≈ 9.8106 ton (US)</p>
          </div>
        </div>
      </section>

      {/* ─── 7. Mass Conversion ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          7. Mass Conversion: Kilograms, Pounds, Ounces and More
        </h2>
        <p className="text-sm leading-relaxed">
          The second primary function converts mass values across imperial, metric, US customary, atomic, and astronomical standards. A foundational anchor established by the 1959 International Yard and Pound Agreement is:
        </p>
        <div className="p-3 bg-blue-50/50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800 text-center font-mono text-sm font-bold text-blue-950 dark:text-blue-100">
          1 International Avoirdupois Pound (lb) = 0.45359237 kg (Exact Definition)
        </div>
        <p className="text-sm leading-relaxed">
          Inverting that exact ratio establishes the kilogram-to-pound relationship:
        </p>
        <p className="text-xs font-mono text-center text-zinc-700 dark:text-zinc-300">
          1 kg = 1 / 0.45359237 lb ≈ 2.2046226218 lbs (at 4 decimals: 2.2046 lbs)
        </p>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          NIST Handbook 44 and SI conversion tables anchor all avoirdupois conversions to this exact value. The calculator verifies the complete 15-unit matrix through automated randomized round-trip audits.
        </p>
      </section>

      {/* ─── 8. Common Mass Conversions ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          8. Common Mass Conversions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 font-mono text-xs">
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">1 kg = 1,000 g</span>
            <span className="text-[10px] text-zinc-500">Kilograms to grams</span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">1 kg = 1,000,000 mg</span>
            <span className="text-[10px] text-zinc-500">Kilograms to milligrams</span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">1 t = 1,000 kg</span>
            <span className="text-[10px] text-zinc-500">Metric tonne (megagram)</span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">1 lb = 0.45359237 kg</span>
            <span className="text-[10px] text-zinc-500">Pound avoirdupois (exact)</span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">1 lb = 16 oz</span>
            <span className="text-[10px] text-zinc-500">Pound to ounces</span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">1 st = 14 lb</span>
            <span className="text-[10px] text-zinc-500">UK Stone = 6.35029 kg</span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">1 ct = 0.2 g</span>
            <span className="text-[10px] text-zinc-500">Metric Carat = 200 mg</span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">1 gr = 64.79891 mg</span>
            <span className="text-[10px] text-zinc-500">Grain (1/7000th lb)</span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">1 u = 1.6605 × 10⁻²⁷ kg</span>
            <span className="text-[10px] text-zinc-500">Dalton (Atomic Mass Unit)</span>
          </div>
        </div>
      </section>

      {/* ─── 9. Three Kinds of Tons ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          9. Short Ton, Long Ton and Metric Tonne Are Different
        </h2>
        <p className="text-sm leading-relaxed">
          The word <em>ton</em> is frequently ambiguous in international trade, shipping, logistics, and heavy engineering:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
              <tr>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Unit Name</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Pounds (lbs)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Kilograms (kg)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Primary Standard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2 font-bold">Metric Tonne (t)</td>
                <td className="p-2 font-mono">2,204.62 lbs</td>
                <td className="p-2 font-mono font-bold text-blue-600 dark:text-blue-400">1,000.0 kg</td>
                <td className="p-2">SI Standard (Megagram)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">US Short Ton (ton US)</td>
                <td className="p-2 font-mono">2,000.0 lbs</td>
                <td className="p-2 font-mono">907.18474 kg</td>
                <td className="p-2">US Customary Standard</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">UK Long Ton (ton UK)</td>
                <td className="p-2 font-mono">2,240.0 lbs</td>
                <td className="p-2 font-mono">1,016.0469 kg</td>
                <td className="p-2">British Imperial Standard</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Notice that 1 metric tonne ≠ 1 short ton ≠ 1 long ton. A short ton is ~9.3% lighter than a metric tonne, while a long ton is ~1.6% heavier. NIST lists all three as separate units with distinct conversion factors.
        </p>
      </section>

      {/* ─── 10. Pound Terminology ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          10. Why the Pound Needs Careful Terminology
        </h2>
        <p className="text-sm leading-relaxed">
          The symbol <em>lb</em> commonly appears in everyday mass measurements. The pound-force, however, is a unit of gravitational force:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700 text-center font-mono text-xs">
          1 lbf = 1 lb × 9.80665 m/s² ≈ 4.448222 N
        </div>
        <p className="text-sm leading-relaxed">
          The avoirdupois pound is a unit of mass, whereas pound-force (lbf) is the gravitational force exerted upon that pound of mass under standard Earth gravity. In planetary weight calculations, force in lbf changes with local gravity, whereas mass in pounds remains constant.
        </p>
      </section>

      {/* ─── 11. Planetary Weight Engine ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          11. How Planetary Weight Is Calculated
        </h2>
        <p className="text-sm leading-relaxed">
          The gravitational force acting upon an object of invariant mass <em>m</em> on any celestial body is given by Newton&apos;s second law under gravity:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700 text-center font-mono font-bold text-blue-900 dark:text-blue-200">
          W = m × g_surface
        </div>
        <p className="text-sm leading-relaxed">
          Mass <em>m</em> remains constant across all celestial bodies. What changes is the local surface acceleration <em>g</em>:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
              <tr>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Celestial Body</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Surface Gravity (g)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Relative to Earth</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Force on 70 kg (N)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Force on 70 kg (lbf)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2 font-bold">Earth (Surface)</td>
                <td className="p-2 font-mono">9.80665 m/s²</td>
                <td className="p-2 font-mono">100.0%</td>
                <td className="p-2 font-mono font-bold text-blue-600 dark:text-blue-400">686.47 N</td>
                <td className="p-2 font-mono">154.3 lbf</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Moon</td>
                <td className="p-2 font-mono">1.622 m/s²</td>
                <td className="p-2 font-mono">16.5%</td>
                <td className="p-2 font-mono">113.54 N</td>
                <td className="p-2 font-mono">25.5 lbf</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Mars</td>
                <td className="p-2 font-mono">3.711 m/s²</td>
                <td className="p-2 font-mono">37.8%</td>
                <td className="p-2 font-mono">259.77 N</td>
                <td className="p-2 font-mono">58.4 lbf</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Jupiter</td>
                <td className="p-2 font-mono">24.79 m/s²</td>
                <td className="p-2 font-mono">252.8%</td>
                <td className="p-2 font-mono">1,735.30 N</td>
                <td className="p-2 font-mono">390.1 lbf</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Venus</td>
                <td className="p-2 font-mono">8.87 m/s²</td>
                <td className="p-2 font-mono">90.5%</td>
                <td className="p-2 font-mono">620.90 N</td>
                <td className="p-2 font-mono">139.6 lbf</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Mercury</td>
                <td className="p-2 font-mono">3.70 m/s²</td>
                <td className="p-2 font-mono">37.7%</td>
                <td className="p-2 font-mono">259.00 N</td>
                <td className="p-2 font-mono">58.2 lbf</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── 12 & 13. Mars & Moon Examples ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          12. Example: What Would a 70 kg Mass Weigh on Mars and the Moon?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 font-sans text-sm">
              70 kg Person on Mars (g = 3.711 m/s²)
            </h3>
            <p>m = 70 kg (invariant)</p>
            <p>W = 70 kg × 3.711 m/s² = 259.77 N</p>
            <p>Force in lbf: 259.77 × 0.224809 ≈ 58.4 lbf</p>
            <p className="text-blue-700 dark:text-blue-300 font-bold">
              Apparent Earth scale weight: 26.5 kg
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 font-sans text-sm">
              70 kg Person on the Moon (g = 1.622 m/s²)
            </h3>
            <p>m = 70 kg (invariant)</p>
            <p>W = 70 kg × 1.622 m/s² = 113.54 N</p>
            <p>Force in lbf: 113.54 × 0.224809 ≈ 25.5 lbf</p>
            <p className="text-blue-700 dark:text-blue-300 font-bold">
              Apparent Earth scale weight: 11.6 kg
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed">
          Your mass does not become smaller on the Moon or Mars. The downward gravitational pull acting upon your mass is reduced because the celestial bodies have less total planetary mass and smaller surface gravitational accelerations.
        </p>
      </section>

      {/* ─── 14 & 15. Six-Body Comparison & Local Gravity ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          14. Proportional Scaling &amp; Terrestrial Gravity Variations
        </h2>
        <p className="text-sm leading-relaxed">
          Because gravitational force is linearly proportional to mass (W ∝ m) for a fixed planetary acceleration g, doubling the mass input from 70 kg to 140 kg exactly doubles the weight force across every celestial body.
        </p>
        <p className="text-sm leading-relaxed">
          Even on Earth, gravitational acceleration is not identical everywhere. Centrifugal acceleration from Earth&apos;s rotation and equatorial oblateness cause g to vary from ~9.780 m/s² at the equator to ~9.832 m/s² at the geographic poles. For standard metrology and commerce, the 3rd CGPM established standard nominal gravity:
        </p>
        <div className="p-2 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700 text-center font-mono text-xs">
          g_n = 9.80665 m/s² (Exact Standard Acceleration)
        </div>
      </section>

      {/* ─── 16 & 17. BIPM 2019 Kilogram Redefinition ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          16. The Kilogram and Modern SI Base Units
        </h2>
        <p className="text-sm leading-relaxed">
          From 1889 until 20 May 2019, the kilogram was defined by the <em>International Prototype of the Kilogram (IPK)</em>—a platinum-iridium cylinder stored in a triple-vacuum vault in Sèvres, France. Over 130 years, periodic comparisons revealed that duplicate prototypes had drifted by ~50 micrograms relative to the primary artifact.
        </p>
        <p className="text-sm leading-relaxed">
          At the 26th General Conference on Weights and Measures (CGPM), metrologists universally replaced physical artifacts by anchoring the kilogram to an immutable fundamental constant of quantum mechanics: the <strong>Planck constant (h = 6.62607015 × 10⁻³⁴ J·s)</strong>.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
              <tr>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Quantity</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">SI Base Unit</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Symbol</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Defining Constant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2 font-bold">Mass</td>
                <td className="p-2 font-mono">kilogram</td>
                <td className="p-2 font-mono font-bold text-blue-600 dark:text-blue-400">kg</td>
                <td className="p-2">Planck constant (h)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Length</td>
                <td className="p-2 font-mono">metre</td>
                <td className="p-2 font-mono">m</td>
                <td className="p-2">Speed of light (c)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Time</td>
                <td className="p-2 font-mono">second</td>
                <td className="p-2 font-mono">s</td>
                <td className="p-2">Cesium-133 frequency (ΔνCs)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Electric Current</td>
                <td className="p-2 font-mono">ampere</td>
                <td className="p-2 font-mono">A</td>
                <td className="p-2">Elementary charge (e)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Thermodynamic Temp</td>
                <td className="p-2 font-mono">kelvin</td>
                <td className="p-2 font-mono">K</td>
                <td className="p-2">Boltzmann constant (k)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Amount of Substance</td>
                <td className="p-2 font-mono">mole</td>
                <td className="p-2 font-mono">mol</td>
                <td className="p-2">Avogadro constant (N_A)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Luminous Intensity</td>
                <td className="p-2 font-mono">candela</td>
                <td className="p-2 font-mono">cd</td>
                <td className="p-2">Luminous efficacy (K_cd)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── 19 & 20. Presets & Environmental Factors ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          19. Material Density Library &amp; Physical Variations
        </h2>
        <p className="text-sm leading-relaxed">
          The calculator includes 39 pre-programmed density presets across structural metals (Steel 7,850 kg/m³, Aluminum 2,700 kg/m³, Copper 8,960 kg/m³), engineering solids (Concrete 2,400 kg/m³, Granite 2,650 kg/m³), liquids (Water 1,000 kg/m³, Mercury 13,546 kg/m³), and gases.
        </p>
        <p className="text-sm leading-relaxed">
          However, density presets represent nominal baseline conditions. Real-world materials vary due to alloy chemistry, porosity, temperature expansion, moisture absorption, and mechanical compaction. In high-precision aerospace, structural, or manufacturing projects, always reference specific lab certificates or mill test reports.
        </p>
      </section>

      {/* ─── 22. Step-by-Step Instructions ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          22. How to Use the Weight Calculator
        </h2>
        <div className="space-y-2 text-xs">
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700">
            <span className="font-bold text-blue-800 dark:text-blue-300">Step 1 — Calculate Mass from Density:</span> Select a material preset or enter custom density and volume with corresponding units. Click &quot;Calculate&quot; to inspect mass in kilograms, pounds, metric tonnes, and all 15 matrix units.
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700">
            <span className="font-bold text-blue-800 dark:text-blue-300">Step 2 — Convert Units:</span> Use the Universal Mass Converter to instantly convert between any pair of mass units with exact dimensional formulas.
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700">
            <span className="font-bold text-blue-800 dark:text-blue-300">Step 3 — Visualize Planetary Weight:</span> Enter mass in kilograms to compare gravitational weight force across Earth, Moon, Mars, Jupiter, Venus, and Mercury in pound-force (lbf) and Newtons (N).
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700">
            <span className="font-bold text-blue-800 dark:text-blue-300">Step 4 — Save, Restore &amp; Export:</span> Save calculation snapshots to local storage, restore previously saved inputs with one click, or export data via Copy, Summary, LaTeX, CSV, and TXT metrology sheets.
          </div>
        </div>
      </section>

      {/* ─── 23 & 24. Worked Example: 185.5 lb ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          23. Worked Example: 185.5 lb Conversion &amp; Mars Weight
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700 font-mono text-xs space-y-2">
          <p className="font-sans font-semibold text-zinc-900 dark:text-zinc-100">
            <strong>Problem:</strong> Convert 185.5 pounds (lbs) to kilograms (kg), UK stones (st), and determine gravitational weight force on the surface of Mars (g = 3.711 m/s²).
          </p>
          <p><strong>Step 1: Convert Pounds to SI Base Kilograms</strong><br />
          m_kg = 185.5 lbs × 0.45359237 kg/lb = 84.14138 kg ≈ 84.14 kg</p>

          <p><strong>Step 2: Convert to UK Stones and Ounces</strong><br />
          Stones = 185.5 / 14 = 13.25 stones = 13 st 3.5 lbs</p>

          <p><strong>Step 3: Calculate Weight Force on Mars</strong><br />
          Weight_Mars = 84.14138 kg × 3.711 m/s² = 312.25 Newtons (N)<br />
          Force in lbf: 312.25 N × 0.224809 ≈ 70.2 lbf (apparent Earth-scale scale: 31.84 kg)</p>
        </div>
      </section>

      {/* ─── 27. Common Mistakes ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          27. Common Mistakes When Calculating Mass &amp; Weight
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-red-50/60 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900/50 space-y-1">
            <h3 className="font-bold text-red-900 dark:text-red-300">1. Confusing Mass with Weight</h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              Assuming an astronaut loses mass on the Moon. Mass remains unchanged (70 kg = 70 kg); only gravitational force decreases.
            </p>
          </div>
          <div className="p-3 bg-red-50/60 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900/50 space-y-1">
            <h3 className="font-bold text-red-900 dark:text-red-300">2. Mixing Incompatible Volume Units</h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              Multiplying kg/m³ directly by liters without converting 1 m³ = 1,000 L creates an error of three orders of magnitude (1,000×).
            </p>
          </div>
          <div className="p-3 bg-red-50/60 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900/50 space-y-1">
            <h3 className="font-bold text-red-900 dark:text-red-300">3. Treating Pounds as Newtons</h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              Conflating pound-mass (lbm) with pound-force (lbf). In SI units, mass is kilograms and force is newtons (1 lbf ≈ 4.448 N).
            </p>
          </div>
          <div className="p-3 bg-red-50/60 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900/50 space-y-1">
            <h3 className="font-bold text-red-900 dark:text-red-300">4. Confusing Short, Long, and Metric Tons</h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              Assuming all tons equal 1,000 kg. A US short ton is 907.18 kg; a UK long ton is 1,016.05 kg; a metric tonne is 1,000 kg.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 32. Frequently Asked Questions ─── */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          32. Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {weight_calculatorFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1"
            >
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {faq.question}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 34. Standards & References ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          34. Standards and Authoritative References
        </h2>
        <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-2 list-disc pl-4">
          <li>
            <strong>BIPM (Bureau International des Poids et Mesures):</strong> The International System of Units (SI Brochure, 9th Edition, 2019), defining the kilogram through the Planck constant (h = 6.62607015 × 10⁻³⁴ J·s).
          </li>
          <li>
            <strong>NIST Special Publication 811:</strong> Guide for the Use of the International System of Units (SI), detailing exact unit conversion ratios, avoirdupois standards, and distinction between mass and gravitational force.
          </li>
          <li>
            <strong>NIST Handbook 44:</strong> Specifications, Tolerances, and Other Technical Requirements for Weighing and Measuring Devices.
          </li>
          <li>
            <strong>CODATA 2018 Recommended Values:</strong> Fundamental Physical Constants for Newtonian gravitation and subatomic mass anchors.
          </li>
        </ul>
      </section>

      {/* ─── 35. Contextual Internal Anchor Text ─── */}
      <section className="p-4 bg-blue-50/40 dark:bg-blue-950/20 rounded-xl border border-blue-200/70 dark:border-blue-800/60 text-xs space-y-1.5 leading-relaxed">
        <p>
          For broader engineering conversion work across length, temperature, pressure, energy, and digital storage units, explore our{" "}
          <Link
            href="/calculators/conversion-calculator"
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Conversion Calculator
          </Link>.
        </p>
        <p>
          When performing metrology calculations involving extremely large astronomical masses or subatomic particles in exponential format, use our{" "}
          <Link
            href="/calculators/scientific-notation-calculator"
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Scientific Notation Calculator &amp; Converter
          </Link>.
        </p>
      </section>

      {/* ─── 36. RELATED CALCULATORS — AFTER CONTENT ─── */}
      <div className="no-print pt-6 pb-2 border-t border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
          RELATED CALCULATORS:
        </span>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <Link
            href="/calculators/conversion-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Conversion Calculator
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <Link
            href="/calculators/scientific-notation-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Scientific Notation Calculator &amp; Converter
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MassContent;

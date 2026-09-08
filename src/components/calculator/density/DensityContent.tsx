"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, ExternalLink, HelpCircle } from "lucide-react";
import { density_calculatorFaqs } from "@/app/calculators/density-calculator/faq";

export function DensityContent() {
  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* EXPANDED MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is Density?
          </h2>
          <p>
            Density measures how much mass is contained in a given volume of a substance. The standard relationship is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-semibold">
            ρ = m / V
          </div>
          <p>where:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li><strong>ρ</strong> is density</li>
            <li><strong>m</strong> is mass</li>
            <li><strong>V</strong> is volume</li>
          </ul>
          <p>
            Density is therefore a ratio of mass to volume. A material with more mass packed into the same volume has a greater density.
          </p>
          <p>
            For example, a material with a density of 8,900 kg/m³ contains 8,900 kilograms of mass in one cubic metre, assuming the stated density applies under the relevant conditions.
          </p>
          <p>
            Density calculations are used in engineering, fluid mechanics, material science, chemistry, manufacturing, petroleum measurement, and many everyday measurement problems.
          </p>
          <p>
            This Density Calculator lets you solve the relationship in all three directions:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-xs">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-sans uppercase font-bold">Density</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">ρ = m / V</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-sans uppercase font-bold">Mass</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">m = ρV</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-sans uppercase font-bold">Volume</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">V = m / ρ</span>
            </div>
          </div>
          <p>
            It also extends beyond the basic equation with density-unit conversion, a searchable material database, specific gravity, buoyancy, ideal-gas density, hydrostatic pressure, and API gravity.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            2. Density Formula: ρ = m / V
          </h2>
          <p>
            The fundamental density equation is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-semibold">
            ρ = m / V
          </div>
          <p>
            To calculate density, divide mass by volume. For example, suppose:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li>Mass = 4.45 kg</li>
            <li>Volume = 500 cm³</li>
          </ul>
          <p>First convert the volume into compatible SI base units:</p>
          <p className="font-mono text-xs pl-2 text-slate-800 dark:text-slate-200">
            500 cm³ = 0.0005 m³
          </p>
          <p>Then apply the formula:</p>
          <p className="font-mono text-xs pl-2 text-slate-800 dark:text-slate-200">
            ρ = 4.45 kg / 0.0005 m³ = 8,900 kg/m³
          </p>
          <p>The same physical density can be expressed in other compatible units, including:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 font-mono text-xs text-slate-700 dark:text-slate-300">
            <li>8.9 g/cm³</li>
            <li>8.9 g/mL</li>
            <li>8.9 kg/L</li>
          </ul>
          <p>
            The important point is that the numerical value changes when the unit changes, but the underlying physical density remains the same.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            3. How to Calculate Mass From Density and Volume
          </h2>
          <p>
            When density and volume are known, rearrange the equation:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-semibold">
            m = ρV
          </div>
          <p>Example calculation:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li>Density = 1,000 kg/m³</li>
            <li>Volume = 2 m³</li>
          </ul>
          <p>Therefore:</p>
          <p className="font-mono text-xs pl-2 text-slate-800 dark:text-slate-200">
            m = 1,000 × 2 = 2,000 kg
          </p>
          <p>
            This relationship is useful for estimating the mass of liquids, bulk materials, manufactured components, and other substances when their density and volume are known. When density and volume are known, the{" "}
            <Link
              href="/calculators/mass-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Mass Calculator
            </Link>{" "}
            can be used to calculate the corresponding mass directly.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            4. How to Calculate Volume From Mass and Density
          </h2>
          <p>
            Rearrange the density equation to isolate volume:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-semibold">
            V = m / ρ
          </div>
          <p>Example calculation:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li>Mass = 8,900 kg</li>
            <li>Density = 8,900 kg/m³</li>
          </ul>
          <p>Therefore:</p>
          <p className="font-mono text-xs pl-2 text-slate-800 dark:text-slate-200">
            V = 8,900 / 8,900 = 1 m³
          </p>
          <p>
            This form is useful when the mass and material density are known but the occupied volume is unknown. The units must remain dimensionally compatible:
          </p>
          <p className="font-mono text-xs pl-2 text-slate-800 dark:text-slate-200">
            kg ÷ (kg/m³) = m³
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Why Density Units Matter
          </h2>
          <p>
            A common error is to treat density as just a number without considering its unit. For example:
          </p>
          <p className="font-mono text-xs pl-2 text-slate-800 dark:text-slate-200">
            8.9 g/cm³ and 8,900 kg/m³
          </p>
          <p>
            are completely equivalent because 1 g/cm³ = 1,000 kg/m³. Likewise, 8.9 kg/L represents the same density as 8.9 g/cm³.
          </p>
          <p>
            The calculator performs the required conversions so that the mass, density, and volume quantities are mathematically compatible. This is particularly important for engineering calculations because density is a compound unit rather than a simple mass or length unit.
          </p>
          <p>
            For broader conversions involving length, temperature, mass, volume, pressure and other measurement categories, use the{" "}
            <Link
              href="/calculators/conversion-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Conversion Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Density Conversion Reference
          </h2>
          <p>Common density conversions include:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-slate-200 dark:border-slate-700">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold">
                <tr>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">Density Unit</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">Equivalent in kg/m³</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono text-slate-800 dark:text-slate-200">
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-sans font-medium">1 g/cm³</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">1,000 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-sans font-medium">1 g/mL</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">1,000 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-sans font-medium">1 kg/L</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">1,000 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-sans font-medium">1 kg/m³</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">0.001 g/cm³</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-sans font-medium">1 lb/ft³</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">approximately 16.0185 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-sans font-medium">1 lb/in³</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">approximately 27,679.9 kg/m³</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            NIST publishes conversion factors for density units including g/cm³, lb/ft³, lb/in³, and several mass-per-volume units. Be especially careful with gallons because US and Imperial gallons are different volume units.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Worked Example: 8,900 kg/m³
          </h2>
          <p>Suppose:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li>Mass = 8,900 kg</li>
            <li>Volume = 1 m³</li>
          </ul>
          <p>Then:</p>
          <p className="font-mono text-xs pl-2 text-slate-800 dark:text-slate-200">
            ρ = m / V = 8,900 / 1 = 8,900 kg/m³
          </p>
          <p>Equivalent values across common unit systems:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 font-mono text-xs text-slate-700 dark:text-slate-300">
            <li>8.9 g/cm³</li>
            <li>8.9 g/mL</li>
            <li>8.9 kg/L</li>
          </ul>
          <p>
            The calculator then derives the corresponding values in its supported density matrix. This is a useful benchmark because the same physical density can be expressed through SI, CGS, and customary mass-per-volume units without changing the underlying material property.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Density, Specific Gravity and Relative Density
          </h2>
          <p>
            Specific gravity compares the density of a substance with the density of a reference substance. For the water-based comparison used by the calculator:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-semibold">
            SG = ρ substance / ρ reference
          </div>
          <p>When water is used as the reference:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li>A density of 1,000 kg/m³ gives approximately SG = 1.0</li>
            <li>A density of 8,900 kg/m³ gives SG = 8.9</li>
          </ul>
          <p>
            Specific gravity is dimensionless because the density units cancel. This makes it useful for comparing substances without carrying a specific density unit through every calculation.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Density and Buoyancy
          </h2>
          <p>
            Density is directly connected to whether an object floats or sinks in a fluid. Archimedes&apos; principle states that a submerged object experiences an upward buoyant force equal to the weight of the fluid displaced by the object. The buoyant force can be written:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-semibold">
            Fᵦ = ρ fluid · V displaced · g
          </div>
          <p>
            If an object&apos;s density is less than the surrounding fluid, it tends to float. If its density is greater, it tends to sink. If the densities are equal under the calculator&apos;s reference conditions, the object can be neutrally buoyant.
          </p>
          <p>For water at approximately 1,000 kg/m³:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li>Object density &lt; 1,000 kg/m³ → float tendency</li>
            <li>Object density = 1,000 kg/m³ → neutral buoyancy</li>
            <li>Object density &gt; 1,000 kg/m³ → sink tendency</li>
          </ul>
          <p>
            When the distinction between mass and gravitational force matters, the{" "}
            <Link
              href="/calculators/weight-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Weight Calculator
            </Link>{" "}
            can calculate weight from mass and gravitational acceleration.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Understanding the Buoyancy Visualization
          </h2>
          <p>
            The calculator&apos;s buoyancy graphic is an interactive physical simulation rather than a conventional statistical chart. It responds to the density relationship between the selected object and the reference fluid.
          </p>
          <p>
            For a high-density material such as 8,900 kg/m³ compared with 1,000 kg/m³ water, the specific gravity is 8.9 and the object is classified as sinking. For a lower-density material, the visualization changes to represent floating behavior. For a density approximately equal to the surrounding fluid, the calculator represents the neutral condition separately rather than treating it as a normal sinking state.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Material Density: Why Reference Values Vary
          </h2>
          <p>
            A material does not always have one universal density under every possible condition. Density may change with:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
            <span className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">Temperature</span>
            <span className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">Pressure</span>
            <span className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">Composition</span>
            <span className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">Alloying</span>
            <span className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">Porosity</span>
            <span className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">Moisture</span>
            <span className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">Phase state</span>
            <span className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">Manufacturing condition</span>
          </div>
          <p>
            This is why the material database should be treated as a reference library rather than a substitute for a project specification or laboratory measurement.
          </p>
          <p>
            For engineering work, the appropriate density should come from the relevant standard, material grade, manufacturer data, or measured property when that level of precision is required. The calculator currently contains 40 material records, all of which have been tested by the production QA suite.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Common Material Density Examples
          </h2>
          <p>Examples in the calculator&apos;s reference database include materials such as:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-slate-200 dark:border-slate-700">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold">
                <tr>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">Material</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">Approximate Density (kg/m³)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-800 dark:text-slate-200">
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-medium">Gold (24K)</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-mono">19,300 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-medium">Platinum</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-mono">21,450 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-medium">Tungsten</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-mono">19,250 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-medium">Lead</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-mono">11,340 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-medium">Silver</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-mono">10,490 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-medium">Steel / carbon iron</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-mono">around 7,850 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-medium">Concrete</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-mono">around 2,400 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-medium">Water</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-mono">around 1,000 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-medium">Ice</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-mono">around 917 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-medium">Oak</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-mono">around 750 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-medium">Gasoline</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-mono">around 740 kg/m³</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            These should be treated as reference values associated with the conditions and definitions used by the database rather than universal constants.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Water Density Is Temperature-Dependent
          </h2>
          <p>
            Water is unusual because its density changes with temperature in a non-linear way. Liquid water reaches a maximum density close to 4°C, rather than becoming continuously denser as it cools all the way to its freezing point.
          </p>
          <p>
            Near that temperature, pure water has a density close to 999.97 kg/m³. Ice is substantially less dense, at roughly 917 kg/m³ under commonly cited reference conditions.
          </p>
          <p>
            This density difference is why ice floats on liquid water and why water&apos;s thermal behavior is important in environmental science, fluid mechanics, and natural systems.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Gas Density and the Ideal Gas Law
          </h2>
          <p>
            For gases, density depends strongly on pressure, temperature, and molar mass. The ideal-gas density equation is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-semibold">
            ρ = PM / RT
          </div>
          <p>where:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li><strong>ρ</strong> = gas density</li>
            <li><strong>P</strong> = absolute pressure (Pa)</li>
            <li><strong>M</strong> = molar mass (kg/mol)</li>
            <li><strong>R</strong> = universal gas constant (8.314462618 J/(mol·K))</li>
            <li><strong>T</strong> = absolute temperature in kelvin (K)</li>
          </ul>
          <p>
            The use of absolute temperature is essential. For example, 20°C = 293.15 K. The calculator converts the entered Celsius temperature into kelvin before applying the ideal-gas equation.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Worked Air-Density Example
          </h2>
          <p>For dry atmospheric air, use approximately:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li>M = 28.97 g/mol</li>
            <li>P = 101.325 kPa</li>
            <li>T = 20°C</li>
          </ul>
          <p>Convert to SI base units:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 font-mono text-xs text-slate-700 dark:text-slate-300">
            <li>M = 0.02897 kg/mol</li>
            <li>P = 101,325 Pa</li>
            <li>T = 293.15 K</li>
          </ul>
          <p>Using ρ = PM / RT gives a result of approximately:</p>
          <p className="font-mono text-xs pl-2 text-slate-800 dark:text-slate-200 font-semibold">
            ρ ≈ 1.204 kg/m³
          </p>
          <p>
            The exact displayed value depends on the precision settings and gas constants used by the calculator. Pressure must be interpreted consistently as absolute pressure for the ideal-gas relation.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Hydrostatic Pressure From Density and Depth
          </h2>
          <p>
            The pressure caused by a stationary fluid column is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-semibold">
            P = ρgh
          </div>
          <p>where:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li><strong>P</strong> = hydrostatic gauge pressure</li>
            <li><strong>ρ</strong> = fluid density</li>
            <li><strong>g</strong> = gravitational acceleration (9.80665 m/s²)</li>
            <li><strong>h</strong> = depth</li>
          </ul>
          <p>For water at ρ = 1,000 kg/m³ and depth h = 10 m, using g = 9.80665 m/s²:</p>
          <p className="font-mono text-xs pl-2 text-slate-800 dark:text-slate-200">
            P = 1,000 × 9.80665 × 10 = 98,066.5 Pa ≈ 98.07 kPa ≈ 14.22 psi ≈ 0.981 bar
          </p>
          <p>
            The calculator reports this as gauge pressure rather than silently adding atmospheric pressure.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            17. API Gravity
          </h2>
          <p>
            API gravity is commonly used in petroleum measurement to express the relative density of petroleum liquids. The calculator uses:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-semibold">
            °API = 141.5 / SG − 131.5
          </div>
          <p>
            with specific gravity defined on the standard petroleum reference basis (60°F / 15.56°C relative to water). API documentation describes API-gravity conversions at 60°F and its relationship to relative density and density.
          </p>
          <p>
            At SG = 1.0, the formula gives approximately 10° API. API gravity is inversely related to specific gravity: lower-density petroleum liquids have higher API gravity values. This makes API gravity different from ordinary specific gravity and important to distinguish when interpreting petroleum measurements.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            18. Mass Density and Dimensional Analysis
          </h2>
          <p>
            A reliable density calculation should work dimensionally as well as numerically.
          </p>
          <div className="space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300 pl-2">
            <p>For density: ρ = m / V → [M] / [L]³ = kg / m³</p>
            <p>For mass: m = ρV → (kg/m³)(m³) = kg</p>
            <p>For volume: V = m / ρ → kg ÷ (kg/m³) = m³</p>
          </div>
          <p>
            Checking dimensions is one of the simplest ways to catch unit mistakes before trusting a numerical result.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            19. How to Use the Density Calculator
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Find density</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Enter mass and its unit, volume and its unit. Choose &quot;Find Density&quot; to calculate ρ.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Find mass</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Provide density and its unit, volume and its unit. Choose &quot;Find Mass&quot; to solve m = ρV.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Find volume</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Provide mass and its unit, density and its unit. Choose &quot;Find Volume&quot; to solve V = m/ρ.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Explore a material</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Search the material database and select a reference substance to populate physical density values.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Solve gas density</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Select the gas or enter its molar mass, then supply absolute pressure and temperature.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Calculate hydrostatic pressure</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Enter fluid density and depth. The resulting pressure can be viewed in all supported pressure units.
              </p>
            </div>
          </div>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            20. Common Density Calculation Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-2 pl-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Mixing incompatible units:</strong> Using g/cm³ directly with m³ without conversion produces an incorrect result.
            </li>
            <li>
              <strong>Treating specific gravity as density:</strong> Specific gravity is dimensionless; density has units.
            </li>
            <li>
              <strong>Ignoring temperature:</strong> Gas density changes significantly with temperature.
            </li>
            <li>
              <strong>Using Celsius as kelvin:</strong> The ideal-gas equation requires absolute temperature.
            </li>
            <li>
              <strong>Confusing gauge and absolute pressure:</strong> The pressure basis must match the equation and application.
            </li>
            <li>
              <strong>Treating reference densities as exact universal constants:</strong> Many material densities are condition-dependent.
            </li>
            <li>
              <strong>Rounding too early:</strong> Rounded intermediate values can introduce avoidable error when several conversions are chained.
            </li>
            <li>
              <strong>Assuming one database value represents every grade of a material:</strong> Material composition can alter density.
            </li>
          </ul>
        </section>

        {/* Section 21 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            21. Density Calculator Accuracy and Limitations
          </h2>
          <p>
            There are several meanings of &quot;accurate.&quot; A calculator can be mathematically accurate while a reference material value is only approximate. The density formula itself is deterministic:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-semibold">
            ρ = m / V
          </div>
          <p>
            provided that the measurements and units are correct. Material properties can have additional uncertainty because they may depend on physical conditions. Gas calculations depend on the validity of the ideal-gas approximation and the chosen molar mass and reference conditions. Specific gravity depends on the chosen reference. API gravity depends on its defined petroleum reference basis.
          </p>
          <p>
            The calculator therefore aims to provide transparent calculations rather than implying that every displayed material value is a universal physical constant.
          </p>
        </section>
      </div>

      {/* Section 22: FULLY UNFOLDED FAQ SECTION */}
      <div className="pt-8 space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            22. Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {density_calculatorFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-1.5 shadow-xs"
            >
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0 mt-0.5">
                  Q{idx + 1}.
                </span>
                <span>{faq.question}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-6 font-normal">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 23: STANDARDS AND REFERENCES */}
      <div className="pt-8 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            23. Standards and References
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <p>
            The calculator&apos;s educational material should distinguish between deterministic mathematical relationships and condition-dependent reference data.
          </p>
          <div className="space-y-2.5">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-xs">
                <span>Bureau International des Poids et Mesures (BIPM)</span>
                <a
                  href="https://www.bipm.org/en/si-base-units/kilogram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-0.5 ml-1"
                >
                  SI Base Units <ExternalLink className="h-3 w-3 inline" />
                </a>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                For SI definitions, the BIPM identifies the kilogram as the SI base unit of mass and defines it using the fixed numerical value of the Planck constant: h = 6.62607015 × 10⁻³⁴ J·s.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-xs">
                <span>National Institute of Standards and Technology (NIST)</span>
                <a
                  href="https://www.nist.gov/pml/special-publication-811"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-0.5 ml-1"
                >
                  NIST SP 811 <ExternalLink className="h-3 w-3 inline" />
                </a>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                NIST publishes conversion factors for mass-per-volume quantities including g/cm³, lb/ft³, lb/in³, US-gallon density units, and ton-per-cubic-yard quantities.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-xs">
                <span>American Petroleum Institute (API)</span>
                <a
                  href="https://www.api.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-0.5 ml-1"
                >
                  API Standards <ExternalLink className="h-3 w-3 inline" />
                </a>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                API documentation describes API-gravity conversions using the 60°F reference basis and related density/specific-gravity relationships.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
            For regulated measurement, calibration, petroleum custody transfer, or specification-controlled engineering work, use the applicable standard, technical datasheet, or laboratory measurement rather than relying solely on a general-purpose online calculator.
          </p>
        </div>
      </div>

      {/* RELATED CALCULATORS — AFTER ARTICLE */}
      <div className="pt-6">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-2">
          RELATED CALCULATORS
        </span>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          <Link
            href="/calculators/mass-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition-colors"
          >
            Mass Calculator
          </Link>
          <span className="text-slate-400 dark:text-slate-600 select-none">|</span>
          <Link
            href="/calculators/weight-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition-colors"
          >
            Weight Calculator
          </Link>
        </div>
      </div>
    </article>
  );
}

export default DensityContent;

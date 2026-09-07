"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, Scale, ExternalLink } from "lucide-react";
import { conversion_calculatorFaqs } from "@/app/calculators/conversion-calculator/faq";

export function ConversionContent() {
  // All 14 FAQs open by default (unfolded)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 14 }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* ═══════════════════ RELATED CALCULATORS — ABOVE CONTENT ═══════════════════ */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-700/60 not-prose">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          RELATED CALCULATORS:
        </span>
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium">
          <Link
            href="/calculators/scientific-notation-calculator"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors shadow-2xs"
          >
            Scientific Notation Calculator &amp; Converter
          </Link>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <Link
            href="/calculators/big-number-calculator"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors shadow-2xs"
          >
            Big Number Calculator
          </Link>
        </div>
      </div>

      {/* ═══════════════════ MAIN EDUCATIONAL CONTENT (36 SECTIONS) ═══════════════════ */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 pt-6">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is a Unit Conversion Calculator?
          </h2>
          <p>
            A unit conversion calculator changes a measurement from one unit into another while preserving the same physical quantity.
          </p>
          <p>For example:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            1 meter = 100 centimeters
          </div>
          <p>
            The number changes, but the physical length does not.
          </p>
          <p>
            This distinction is the foundation of measurement conversion. A distance measured as 10 meters and the same distance expressed as 32.8084 feet represent the same physical length in different unit systems.
          </p>
          <p>
            The Conversion Calculator is designed for both everyday and technical work. It supports conversions across length and distance, temperature, area, volume and capacity, weight and mass, time, speed and velocity, pressure, energy and work, power, digital storage and data, and fuel economy. The page also provides quick converters, a complete unit matrix, formula information, and a relative magnitude visualization.
          </p>
          <p>
            The important part is not simply producing another number. A reliable converter must use the correct relationship for the category being converted. Some measurements use a simple multiplicative factor, while others require a different mathematical transformation.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How Unit Conversion Works
          </h2>
          <p>
            For many physical quantities, conversion can be represented as:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            Target Value = Source Value × Conversion Factor
          </div>
          <p>
            For example, the international definition of the inch is exactly:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            1 in = 0.0254 m
          </div>
          <p>So:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            10 in × 0.0254 = 0.254 m
          </div>
          <p>
            The important phrase is conversion factor. The factor relates one unit to another without changing the underlying quantity.
          </p>
          <p>
            For simple linear conversions, you can also think in terms of a unit fraction:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            10 in × (0.0254 m / 1 in) = 0.254 m
          </div>
          <p>
            The inches cancel algebraically, leaving meters.
          </p>
          <p>
            This is commonly called the unit-factor method, factor-label method, or dimensional-analysis approach. It is especially useful because it gives you a way to check whether the units in a calculation make sense.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Why Dimensional Analysis Matters
          </h2>
          <p>
            Suppose you want to convert 100 meters to centimeters. Since 1 m = 100 cm, then:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            100 m × (100 cm / 1 m) = 10,000 cm
          </div>
          <p>
            The meter units cancel algebraically. That same idea helps prevent common mistakes.
          </p>
          <p>
            For example, area is not converted with the ordinary linear factor. Since:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            1 m = 3.280839895 ft
          </div>
          <p>
            it does not follow that 1 m² = 3.280839895 ft². Instead:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            1 m² = (3.280839895)² ft² ≈ 10.7639 ft²
          </div>
          <p>
            That square matters. Likewise, volume uses a cubic relationship: 1 m³ = (3.280839895)³ ft³. This is why a trustworthy unit converter must know what kind of quantity it is converting rather than blindly applying a single generic multiplier.
          </p>
          <p>
            The calculator&apos;s mathematical audit specifically verifies squared area factors and category-specific transformations rather than treating every category as ordinary linear scaling.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            4. The 12 Conversion Categories
          </h2>
          <p>
            The converter brings several types of measurements together in one interface:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-slate-200 dark:border-slate-700 font-sans">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold">
                <tr>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Category</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Typical Examples</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr>
                  <td className="p-2 font-bold text-blue-600 dark:text-blue-400">Length &amp; Distance</td>
                  <td className="p-2">m, km, cm, mm, ft, in, mi, yd, nmi, ly</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-blue-600 dark:text-blue-400">Temperature</td>
                  <td className="p-2">°C, °F, K</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-blue-600 dark:text-blue-400">Area</td>
                  <td className="p-2">m², ft², in², yd², acre, hectare</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-blue-600 dark:text-blue-400">Volume &amp; Capacity</td>
                  <td className="p-2">L, mL, US gal, Imperial gal, ft³, yd³</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-blue-600 dark:text-blue-400">Weight &amp; Mass</td>
                  <td className="p-2">kg, g, mg, lb, oz, metric ton, short ton</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-blue-600 dark:text-blue-400">Time</td>
                  <td className="p-2">s, min, h, day, week</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-blue-600 dark:text-blue-400">Speed &amp; Velocity</td>
                  <td className="p-2">m/s, km/h, mph, knots</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-blue-600 dark:text-blue-400">Pressure</td>
                  <td className="p-2">Pa, kPa, bar, psi, atm</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-blue-600 dark:text-blue-400">Energy &amp; Work</td>
                  <td className="p-2">J, kJ, cal, kcal, BTU, kWh</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-blue-600 dark:text-blue-400">Power</td>
                  <td className="p-2">W, kW, mechanical horsepower (hp)</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-blue-600 dark:text-blue-400">Digital Storage &amp; Data</td>
                  <td className="p-2">B, kB, MB, GB, TB, KiB, MiB, GiB, TiB</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-blue-600 dark:text-blue-400">Fuel Economy</td>
                  <td className="p-2">L/100 km, MPG (US), km/L</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            These are not all mathematically interchangeable. Each category requires its own definitions and transformation rules. The current production audit verified all 12 categories independently with thousands of randomized oracle comparisons.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Length and Distance Conversion
          </h2>
          <p>
            Length is one of the simplest conversion categories because the relationship between units is generally multiplicative. Common relationships include:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
            <p>1 km = 1,000 m</p>
            <p>1 m = 100 cm = 1,000 mm</p>
            <p>1 in = 2.54 cm = 0.0254 m (exact)</p>
          </div>
          <p>
            The calculator&apos;s reference conversion demonstrates 100 m = 0.1 km and 10 m = 32.8084 ft at four decimal places. It also supports microscopic and astronomical units such as micrometers, nanometers, and light years, allowing one measurement to be expressed across a wide range of scales (for example, 100 m = 100,000,000,000 nm = 1.0000 × 10¹¹ nm).
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Temperature Conversion Is Different
          </h2>
          <p>
            Temperature conversion is one of the most important exceptions to the simple multiplier model. The relationship between Celsius and Fahrenheit is an affine transformation:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
            <p>°F = (°C × 9/5) + 32</p>
            <p>°C = (°F - 32) × 5/9</p>
            <p>K = °C + 273.15</p>
          </div>
          <p>
            For example, 100 °C = 212 °F and 0 °C = 32 °F. An especially useful invariant crossover check is -40 °C = -40 °F.
          </p>
          <p>
            The reason this category needs special treatment is that Fahrenheit and Celsius scales have both a scale factor and an offset. Kelvin adds another distinction: Kelvin is the SI base unit for thermodynamic temperature, and it does not use a degree symbol in the unit name or symbol (273.15 K = 0 °C). The converter&apos;s regression suite specifically verifies temperature as an affine transformation rather than an ordinary multiplication.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Area Conversion
          </h2>
          <p>
            Area measures two-dimensional extent, so the linear conversion factor must be squared. For example, since 1 m = 3.280839895 ft, 1 m² = (3.280839895)² ft² ≈ 10.7639 ft².
          </p>
          <p>
            The calculator also supports practical land and construction units such as acres and hectares:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
            <p>1 hectare = 10,000 m²</p>
            <p>1 acre = 43,560 ft² ≈ 4,046.8564 m²</p>
          </div>
          <p>
            Area conversion is particularly important in construction, architecture, land measurement, flooring, roofing, agriculture, and real-estate calculations.
          </p>
          <p>
            For a separate land or floor-area calculation, the{" "}
            <Link
              href="/calculators/square-footage-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700 dark:hover:text-blue-300"
            >
              Square Footage Calculator
            </Link>{" "}
            can be used alongside this unit converter.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Volume and Capacity Conversion
          </h2>
          <p>
            Volume is a three-dimensional quantity, so linear factors are cubed. Common examples include 1 L = 1,000 mL and 1 US gal = 3.785411784 L (defined as exactly 231 cubic inches).
          </p>
          <p>
            The distinction between US liquid gallons and Imperial gallons is important: an Imperial gallon is standardized as exactly 4.54609 liters, making it approximately 20.09% larger than a US liquid gallon. The calculator treats them as distinct definitions rather than collapsing them into a single generic &quot;gallon,&quot; preventing costly errors in international fluid storage and automotive specifications.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Weight and Mass Conversion
          </h2>
          <p>
            Mass and weight are related concepts in everyday trade. The international pound relationship established by the 1959 treaty is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs">
            1 lb = 0.45359237 kg (exact)
          </div>
          <p>
            Therefore, 150 lb = 150 × 0.45359237 = 68.0388555 kg, which rounded to four decimal places gives <strong>68.0389 kg</strong>. This is one of the calculator&apos;s mandatory regression cases.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Time Conversion
          </h2>
          <p>
            Time conversion is straightforward when converting fixed durations: 1 min = 60 s, 1 h = 3,600 s, and 1 day = 86,400 s. Calendar periods such as months and years require care because calendar months do not all contain the same number of days. For this reason, an engineering converter distinguishes a fixed-duration conversion from a calendar-date calculation.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Speed and Velocity Conversion
          </h2>
          <p>
            Speed conversions are multiplicative: 1 m/s = 3.6 km/h, and 1 mph = 1.609344 km/h (exact). For example, 60 mph = 96.56064 km/h. Knots deserve special attention because the knot is based on one nautical mile per hour (1,852 m/h = 1.852 km/h) rather than a statute land mile.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Pressure Conversion
          </h2>
          <p>
            The SI derived unit of pressure is the pascal (1 Pa = 1 N/m²). Practical engineering relationships include:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
            <p>1 psi ≈ 6,894.757293 Pa</p>
            <p>35 psi × 6,894.757293 = 241,316.505 Pa</p>
            <p>241,316.505 Pa / 1,000 ≈ 241.32 kPa</p>
            <p>241,316.505 Pa / 100,000 ≈ 2.413 bar</p>
          </div>
          <p>
            Therefore, 35 psi ≈ 241.32 kPa ≈ 2.413 bar, which serves as a mandatory verification case.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Energy and Work Conversion
          </h2>
          <p>
            Energy and work share the joule (J) as the SI derived unit. Key conversions include 1 kJ = 1,000 J, 1 Wh = 3,600 J, and 1 kWh = 3.6 MJ. Traditional units such as calories (1 cal = 4.184 J) and BTUs (1 BTU ISO ≈ 1,055.05585 J) require attention to their specific definitions.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Power Conversion
          </h2>
          <p>
            Power measures the rate of energy transfer (1 W = 1 J/s, 1 kW = 1,000 W). Mechanical horsepower is defined as 550 ft⋅lbf/s ≈ 745.69987 Watts. The converter explicitly distinguishes mechanical horsepower from metric or electrical horsepower definitions.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Digital Storage: kB Is Not KiB
          </h2>
          <p>
            Decimal SI prefixes use powers of ten: 1 kB = 1,000 B, 1 MB = 1,000,000 B, and 1 GB = 10⁹ B. In contrast, binary IEC prefixes use powers of two: 1 KiB = 1,024 B, 1 MiB = 1,048,576 B, and 1 GiB = 2³⁰ B (1,073,741,824 B). NIST explicitly distinguishes decimal SI prefixes from IEC binary prefixes. Using the correct prefix matters for operating systems, hardware capacity, and bandwidth calculations.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Fuel Economy Conversion
          </h2>
          <p>
            Fuel economy behaves differently from ordinary unit conversion because representations are inversely related:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs">
            L/100 km = 235.214583 / MPG(US)
          </div>
          <p>
            So 5 L/100 km corresponds to approximately 47.04 MPG, while 10 L/100 km corresponds to 23.52 MPG. A smaller L/100 km value represents better fuel economy, while a larger MPG value represents better fuel economy. That reciprocal relationship is why fuel economy cannot use an ordinary linear multiplier.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            17. What Is the SI System?
          </h2>
          <p>
            The International System of Units (SI) is the globally agreed foundation for modern scientific and technical measurement. BIPM identifies seven fundamental SI base quantities and units:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-slate-200 dark:border-slate-700 font-sans">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold">
                <tr>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Base Quantity</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">SI Base Unit</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Symbol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr><td className="p-2 font-medium">Time</td><td className="p-2">second</td><td className="p-2 font-mono">s</td></tr>
                <tr><td className="p-2 font-medium">Length</td><td className="p-2">metre</td><td className="p-2 font-mono">m</td></tr>
                <tr><td className="p-2 font-medium">Mass</td><td className="p-2">kilogram</td><td className="p-2 font-mono">kg</td></tr>
                <tr><td className="p-2 font-medium">Electric current</td><td className="p-2">ampere</td><td className="p-2 font-mono">A</td></tr>
                <tr><td className="p-2 font-medium">Thermodynamic temperature</td><td className="p-2">kelvin</td><td className="p-2 font-mono">K</td></tr>
                <tr><td className="p-2 font-medium">Amount of substance</td><td className="p-2">mole</td><td className="p-2 font-mono">mol</td></tr>
                <tr><td className="p-2 font-medium">Luminous intensity</td><td className="p-2">candela</td><td className="p-2 font-mono">cd</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            All other SI units are derived by combining powers and products of these base units.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            18. Exact vs Approximate Conversion Factors
          </h2>
          <p>
            Not every number displayed by a converter should be interpreted as an exact constant. For example, 1 inch = 0.0254 m and 1 lb = 0.45359237 kg are legally exact definitions. But a displayed result such as 10 m = 32.8084 ft is rounded for presentation. The rounded display is not the same thing as saying the underlying conversion factor itself is approximate. The calculator keeps internal computational precision separate from display precision.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            19. How to Use the Conversion Calculator
          </h2>
          <div className="space-y-2">
            <p><strong>Step 1: Select a category</strong> — Choose the quantity you want to convert (Length, Temperature, Weight, Pressure, etc.).</p>
            <p><strong>Step 2: Enter the source value</strong> — Type the number you want to convert (for example, 100).</p>
            <p><strong>Step 3: Select the source unit</strong> — Choose your starting unit (for example, Meter).</p>
            <p><strong>Step 4: Select the target unit</strong> — Choose your desired unit (for example, Foot).</p>
            <p><strong>Step 5: Set precision</strong> — Select the number of decimal places appropriate for your task.</p>
            <p><strong>Step 6: Review the result</strong> — The calculator shows the converted value and the underlying equation.</p>
            <p><strong>Step 7: Compare other units</strong> — The conversion matrix displays the same quantity in all category units simultaneously.</p>
            <p><strong>Step 8: Use Copy or Export</strong> — Copy the result, copy LaTeX, or export CSV/TXT reports.</p>
            <p><strong>Step 9: Save useful conversions</strong> — Save and restore calculations at any time with one click.</p>
          </div>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            20. Understanding the Conversion Matrix
          </h2>
          <p>
            The conversion matrix is useful when you need more than one destination unit. For example, entering 100 meters instantly displays equivalents in kilometers (0.1), centimeters (10,000), millimeters (100,000), miles (0.0621), yards (109.3613), feet (328.084), and inches (3,937.0079). This eliminates repetitive single conversions when preparing reference tables or technical specifications.
          </p>
        </section>

        {/* Section 21 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            21. What the Relative Magnitude Scale Shows
          </h2>
          <p>
            The Relative Magnitude Scale provides visual comparison across units of the same physical quantity. For instance, 100 m equals 0.1 km, 100,000 mm, and 100,000,000,000 nm. The physical length is identical; only the numerical representation changes. Our normalized logarithmic visualization ensures both large and small units remain clearly visible.
          </p>
        </section>

        {/* Section 22 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            22. Why Scientific Notation Helps With Unit Conversion
          </h2>
          <p>
            Some conversions produce very large or small values (e.g., 100 m = 1.0000 × 10¹¹ nm or 1 nm = 1 × 10⁻⁹ m). Scientific notation provides a compact, readable representation without altering numerical precision.
          </p>
          <p>
            For dedicated scientific-number manipulation, the{" "}
            <Link
              href="/calculators/scientific-notation-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700 dark:hover:text-blue-300"
            >
              Scientific Notation Calculator &amp; Converter
            </Link>{" "}
            is the specialized companion tool.
          </p>
        </section>

        {/* Section 23 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            23. Common Unit-Conversion Mistakes
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Confusing linear, square, and cubic conversions:</strong> Area requires squaring factors; volume requires cubing them.</li>
            <li><strong>Treating Celsius like a simple multiplier:</strong> Celsius to Fahrenheit includes an additive offset of 32.</li>
            <li><strong>Confusing US and Imperial gallons:</strong> The two systems use different legal gallon definitions.</li>
            <li><strong>Treating kB and KiB as identical:</strong> Decimal SI prefixes (10³) and binary IEC prefixes (2¹⁰) are different systems.</li>
            <li><strong>Reversing fuel-economy comparisons:</strong> Higher MPG indicates better fuel economy, while lower L/100 km indicates better efficiency.</li>
            <li><strong>Rounding too early:</strong> Intermediate rounding accumulates numerical drift.</li>
            <li><strong>Ignoring negative signs:</strong> Negative temperatures are valid physical values.</li>
          </ul>
        </section>

        {/* Section 24 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            24. Accuracy, Precision and Display Rounding
          </h2>
          <p>
            Accuracy describes how close a result is to truth. Precision describes how finely a value is represented. Rounding reduces displayed digits (e.g., 32.80839895 ft displayed as 32.8084 ft). The calculator preserves exact computational values internally while formatting to your chosen precision.
          </p>
        </section>

        {/* Section 25 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            25. When Should You Use a Unit Converter Instead of Doing It Manually?
          </h2>
          <p>
            Manual conversion works well for simple ratios (1 kg = 1,000 g). A dedicated converter is superior when multi-system conversions, temperature offsets, squared/cubed area factors, exact US vs Imperial standards, or exportable audit logs are required.
          </p>
        </section>

        {/* Section 26 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            26. Worked Example: 100 Meters to Feet
          </h2>
          <p>Start with 100 m. Using the exact international factor 1 m = 3.280839895013123 ft:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs">
            100 × 3.280839895013123 = 328.0839895013123 ft ≈ 328.0840 ft
          </div>
          <p>The same quantity equals approximately 0.0621 miles, 109.3613 yards, or 3,937.0079 inches.</p>
        </section>

        {/* Section 27 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            27. Worked Example: 100 °C to Fahrenheit
          </h2>
          <p>Start with 100 °C. Using °F = (°C × 9/5) + 32:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs">
            °F = (100 × 9/5) + 32 = 180 + 32 = 212 °F
          </div>
        </section>

        {/* Section 28 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            28. Worked Example: 150 Pounds to Kilograms
          </h2>
          <p>Start with 150 lb. Using 1 lb = 0.45359237 kg exactly:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs">
            150 × 0.45359237 = 68.0388555 kg ≈ 68.0389 kg
          </div>
        </section>

        {/* Section 29 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            29. Worked Example: 35 PSI to kPa and Bar
          </h2>
          <p>Start with 35 psi (typical tire pressure):</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
            <p>35 × 6,894.757293 Pa/psi ≈ 241,316.505 Pa</p>
            <p>241,316.505 Pa / 1,000 ≈ 241.32 kPa</p>
            <p>241,316.505 Pa / 100,000 ≈ 2.413 bar</p>
          </div>
        </section>

        {/* Section 30 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            30. Measurement Standards and the Modern SI
          </h2>
          <p>
            All SI units are defined in terms of fundamental constants of nature (speed of light, Planck constant, elementary charge, Boltzmann constant, Avogadro constant) following the 2019 BIPM redefinition.
          </p>
        </section>

        {/* Section 31 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            31. When a Conversion Result Should Be Treated as Approximate
          </h2>
          <p>
            Displayed values with rounding should be treated as approximations for the requested precision. Governing standards, drawings, and datasheets remain controlling for high-stakes regulatory or engineering documentation.
          </p>
        </section>

        {/* Section 32 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            32. Conversion Calculator Limitations
          </h2>
          <p>
            When a category has multiple definitions (US vs Imperial gallon, decimal vs binary digital prefixes, mechanical vs metric horsepower), our converter clearly indicates the exact standard applied.
          </p>
        </section>

        {/* Section 33 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            33. Quick Reference: Common Conversions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">Length</span>
              <p className="font-mono">1 m = 100 cm</p>
              <p className="font-mono">1 m = 1,000 mm</p>
              <p className="font-mono">1 in = 2.54 cm</p>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">Mass</span>
              <p className="font-mono">1 kg = 1,000 g</p>
              <p className="font-mono">1 lb = 0.45359237 kg</p>
              <p className="font-mono">1 oz ≈ 28.3495 g</p>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">Power &amp; Energy</span>
              <p className="font-mono">1 kW = 1,000 W</p>
              <p className="font-mono">1 hp ≈ 745.6999 W</p>
              <p className="font-mono">1 kWh = 3.6 MJ</p>
            </div>
          </div>
        </section>

        {/* Section 34 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            34. Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Authoritative answers to common measurement and metrology questions:
          </p>
          <div className="space-y-2.5">
            {conversion_calculatorFaqs.map((faq, idx) => {
              const isOpen = openFaqIndices.has(idx);
              return (
                <div
                  key={idx}
                  className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/30 shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-3.5 text-left text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-2 pr-4">
                      <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                        Q{idx + 1}.
                      </span>
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-3.5 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal border-t border-slate-100 dark:border-slate-800/60 mt-1">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 35 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            35. Standards and Reference Sources
          </h2>
          <p>
            For users who need to verify official definitions, refer to these governing scientific authorities:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>
              <a
                href="https://www.bipm.org/en/publications/si-brochure"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                International Bureau of Weights and Measures (BIPM) — SI Brochure <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href="https://www.bipm.org/en/measurement-units/si-base-units"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                BIPM — SI Base Units <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href="https://www.nist.gov/pml/special-publication-811"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                NIST — Guide to the SI and SI Prefixes (SP 811) <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href="https://physics.nist.gov/cuu/Units/binary.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                NIST — Binary Prefixes <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </section>

        {/* Section 36 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            36. Final Practical Guidance
          </h2>
          <p>
            The safest way to use any unit conversion result is to confirm:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li><strong>What quantity am I converting?</strong> — Different categories require different mathematics.</li>
            <li><strong>Which unit convention is applied?</strong> — Verify US vs Imperial, decimal vs binary.</li>
            <li><strong>How much precision is required?</strong> — Never confuse additional display digits with true physical accuracy.</li>
          </ol>
          <p>
            For scientific-number formatting and exponent-based calculations, use the{" "}
            <Link
              href="/calculators/scientific-notation-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700 dark:hover:text-blue-300"
            >
              Scientific Notation Calculator &amp; Converter
            </Link>
            . For calculations involving extremely large integers and arbitrary-precision arithmetic, use the{" "}
            <Link
              href="/calculators/big-number-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700 dark:hover:text-blue-300"
            >
              Big Number Calculator
            </Link>
            .
          </p>
        </section>
      </div>

      {/* ═══════════════════ RELATED CALCULATORS — AFTER CONTENT ═══════════════════ */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-700/60 not-prose mt-8">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          RELATED CALCULATORS:
        </span>
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium">
          <Link
            href="/calculators/scientific-notation-calculator"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors shadow-2xs"
          >
            Scientific Notation Calculator &amp; Converter
          </Link>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <Link
            href="/calculators/big-number-calculator"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors shadow-2xs"
          >
            Big Number Calculator
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ConversionContent;

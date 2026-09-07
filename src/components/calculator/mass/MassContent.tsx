"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ExternalLink } from "lucide-react";
import { mass_calculatorFaqs } from "@/app/calculators/mass-calculator/faq";

export function MassContent() {
  // All 20 FAQs open by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 20 }, (_, i) => i))
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
    <article className="mt-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-xs sm:text-sm space-y-8 divide-y divide-slate-100 dark:divide-slate-800 max-w-4xl mx-auto">
      {/* ─── RELATED CALCULATORS — COMPACT PLACEMENT #1 (ABOVE ARTICLE) ─── */}
      <nav aria-label="Related Calculators" className="pb-2">
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
            RELATED CALCULATORS:
          </span>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <Link
              href="/calculators/conversion-calculator"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Conversion Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <Link
              href="/calculators/scientific-notation-calculator"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Scientific Notation Calculator &amp; Converter
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── CORE EDUCATIONAL ARTICLE (SECTIONS 1–21) ─── */}
      <div className="pt-6 space-y-8">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Mass Calculator: Mass, Weight, Density &amp; Unit Conversion
          </h2>
          <p>
            The Mass Calculator helps you calculate the mass of an object from its density and volume, convert mass between common and specialized units, and compare the gravitational weight of the same mass on different celestial bodies.
          </p>
          <p>The calculator combines three closely related but distinct tasks:</p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>Mass from density and volume</li>
            <li>Universal mass-unit conversion</li>
            <li>Planetary gravitational weight</li>
          </ul>
          <p>The main mass calculation follows:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 text-center font-mono font-bold text-sm text-blue-900 dark:text-blue-200">
            m = ρV
          </div>
          <p>
            where <strong>m</strong> is mass, <strong>ρ</strong> is density, and <strong>V</strong> is volume.
          </p>
          <p>The planetary calculation uses a different relationship:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 text-center font-mono font-bold text-sm text-blue-900 dark:text-blue-200">
            W = mg
          </div>
          <p>
            where <strong>W</strong> is gravitational weight force, <strong>m</strong> is mass, and <strong>g</strong> is the local acceleration due to gravity.
          </p>
          <p>
            This distinction is important. Mass describes the amount of matter in an object, while weight in the physics sense is a force produced by gravity. The same 70 kg mass therefore remains 70 kg on Earth, the Moon, Mars, or Jupiter, while its gravitational weight changes.
          </p>
          <p>
            For general measurement conversions across length, temperature, volume, pressure, mass, and other categories, the{" "}
            <Link
              href="/calculators/conversion-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Conversion Calculator
            </Link>{" "}
            can be used as a broader unit-conversion tool.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. Mass vs Weight: What Is the Difference?
          </h2>
          <p>
            Mass and weight are related, but they are not the same physical quantity.
          </p>
          <p>
            Mass describes how much matter an object contains. The SI unit of mass is the kilogram (kg).
          </p>
          <p>
            Weight is a gravitational force. In SI, it is measured in newtons (N).
          </p>
          <p>The relationship is:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 text-center font-mono font-bold text-sm text-blue-900 dark:text-blue-200">
            W = mg
          </div>
          <p>where:</p>
          <ul className="list-none space-y-1 pl-2 font-mono text-xs">
            <li><strong>W</strong> = gravitational weight force</li>
            <li><strong>m</strong> = mass</li>
            <li><strong>g</strong> = local gravitational acceleration</li>
          </ul>
          <p>Consider an object with a mass of 70 kg.</p>
          <p>
            Its mass remains: <strong>70 kg</strong> regardless of whether the object is on Earth or the Moon.
          </p>
          <p>
            Its weight, however, changes because the value of <strong>g</strong> changes from one celestial body to another.
          </p>
          <p>
            This is why a statement such as &ldquo;I weigh 70 kg&rdquo; is common in everyday language but is not the same as the strict physics definition of weight.
          </p>
          <p>
            In everyday commerce and ordinary conversation, &ldquo;weight&rdquo; is often used to mean mass. In scientific and engineering contexts, it is better to distinguish mass from gravitational force.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. The Main Formula: Mass From Density and Volume
          </h2>
          <p>
            The fundamental equation used by the main module to calculate mass from density and volume is:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 text-center font-mono font-bold text-sm text-blue-900 dark:text-blue-200">
            m = ρV
          </div>
          <p>This follows directly from the definition of density:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 text-center font-mono font-bold text-sm text-blue-900 dark:text-blue-200">
            ρ = m / V
          </div>
          <p>Rearranging gives:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 text-center font-mono font-bold text-sm text-blue-900 dark:text-blue-200">
            m = ρV
          </div>
          <p>The three quantities in the density calculator mass equation are:</p>
          <ul className="list-none space-y-1 pl-2">
            <li><strong>Mass:</strong> m</li>
            <li><strong>Density:</strong> ρ</li>
            <li><strong>Volume:</strong> V</li>
          </ul>
          <p>
            For a result to have the correct units, the density and volume must be compatible.
          </p>
          <p>For example:</p>
          <p className="font-mono text-xs pl-2">kg/m³ × m³ = kg</p>
          <p>The cubic-metre units cancel:</p>
          <p className="font-mono text-xs pl-2">(kg/m³) × m³ = kg</p>
          <p>
            The calculator automatically handles the necessary unit conversion when you select different density and volume units.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. What Is Density?
          </h2>
          <p>
            Density describes how much mass is contained within a given volume.
          </p>
          <p>The standard SI expression is:</p>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-center">
            kg/m³
          </div>
          <p>
            A material with high density contains more mass in the same volume than a material with low density. For example, metals such as gold and copper are substantially denser than water.
          </p>
          <p>Density can also be expressed in units such as:</p>
          <ul className="list-disc list-inside space-y-0.5 pl-1 font-mono text-xs">
            <li>g/cm³</li>
            <li>kg/L</li>
            <li>g/mL</li>
            <li>lb/ft³</li>
            <li>lb/in³</li>
          </ul>
          <p>
            These values can represent the same physical property when their units are correctly converted. For example:
          </p>
          <p className="font-mono text-xs pl-2">
            8.9 kg/L and 8.9 g/cm³ represent the same numerical density because 1 kg/L = 1 g/cm³
          </p>
          <p>
            The calculator&apos;s density engine converts each supported density unit to its internal base representation before calculating mass.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Density Units Must Match the Volume Unit
          </h2>
          <p>
            A common mass-calculation mistake is multiplying numerical values without considering their units.
          </p>
          <p>Suppose:</p>
          <ul className="list-none space-y-1 pl-2 font-mono text-xs">
            <li>density = 8.9 g/cm³</li>
            <li>volume = 1 m³</li>
          </ul>
          <p>
            You cannot simply calculate <strong>8.9 × 1 = 8.9 g</strong> because the density and volume units are different.
          </p>
          <p>The volume must first be expressed in cubic centimetres:</p>
          <p className="font-mono text-xs pl-2">1 m³ = 1,000,000 cm³</p>
          <p>Then:</p>
          <p className="font-mono text-xs pl-2">m = 8.9 g/cm³ × 1,000,000 cm³</p>
          <p className="font-mono text-xs pl-2">m = 8,900,000 g</p>
          <p>which is:</p>
          <p className="font-mono text-xs pl-2">8,900 kg</p>
          <p>The result agrees with:</p>
          <p className="font-mono text-xs pl-2">8,900 kg/m³ × 1 m³ = 8,900 kg</p>
          <p>This is the principle of dimensional consistency.</p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Worked Example: 8,900 kg/m³ × 1 m³
          </h2>
          <p>Suppose a material has:</p>
          <ul className="list-none space-y-1 pl-2 font-mono text-xs">
            <li>Density = 8,900 kg/m³</li>
            <li>Volume = 1 m³</li>
          </ul>
          <p>Apply:</p>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-center">
            m = ρV
          </div>
          <p>Substitute the values:</p>
          <p className="font-mono text-xs pl-2">m = 8,900 × 1</p>
          <p>Therefore:</p>
          <p className="font-mono text-xs pl-2 font-bold text-blue-900 dark:text-blue-200">
            m = 8,900 kg
          </p>
          <p>Equivalent quantities include:</p>
          <ul className="list-disc list-inside space-y-0.5 pl-1 font-mono text-xs">
            <li>8,900,000 g</li>
            <li>8.9 metric tonnes</li>
            <li>approximately 19,621.1413 lb</li>
          </ul>
          <p>
            This is a useful example because the volume is exactly 1 m³, so the numerical value of the density and resulting mass are immediately related.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Density Equivalence Example
          </h2>
          <p>
            The same physical density can be expressed using different unit systems. For example:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-center space-y-1">
            <div>8,900 kg/m³ = 8.9 g/cm³ = 8.9 kg/L</div>
          </div>
          <p>Now consider the equivalent volumes:</p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-center space-y-1">
            <div>1 m³ = 1,000,000 cm³ = 1,000 L</div>
          </div>
          <p>Each form produces the same mass:</p>
          <ul className="list-none space-y-1 pl-2 font-mono text-xs">
            <li>8,900 kg/m³ × 1 m³ = 8,900 kg</li>
            <li>8.9 g/cm³ × 1,000,000 cm³ = 8,900,000 g = 8,900 kg</li>
            <li>8.9 kg/L × 1,000 L = 8,900 kg</li>
          </ul>
          <p>
            The numerical calculation changes because the units change, but the physical quantity does not.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Mass Conversion: Kilograms, Pounds, Ounces and More
          </h2>
          <p>
            The mass converter supports common metric and customary units (including kg to lb and lb to kg conversions) as well as specialized scientific and historical units.
          </p>
          <p>Common units include:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs font-mono p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
            <div>• kilogram (kg)</div>
            <div>• gram (g)</div>
            <div>• milligram (mg)</div>
            <div>• microgram (µg)</div>
            <div>• metric tonne (t)</div>
            <div>• pound (lb)</div>
            <div>• ounce (oz)</div>
            <div>• stone (st)</div>
            <div>• carat (ct)</div>
            <div>• grain</div>
            <div>• short ton</div>
            <div>• long ton</div>
            <div className="col-span-2">• atomic mass unit (u or Da)</div>
          </div>
          <p>
            Frequent conversions like kg to grams, kg to ounces, and metric ton conversion are computed from exact definitions:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-center font-bold">
            1 lb = 0.45359237 kg
          </div>
          <p>Therefore:</p>
          <p className="font-mono text-xs pl-2">
            1 kg = approximately 2.2046226218 lb
          </p>
          <p>The ounce is one sixteenth of an avoirdupois pound:</p>
          <p className="font-mono text-xs pl-2">
            1 oz = 28.349523125 g
          </p>
          <p>
            The converter uses the underlying conversion factors rather than using rounded display values as intermediate inputs.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Common Mass Conversions
          </h2>
          <p>Useful reference conversions include:</p>
          <div className="overflow-x-auto my-3 border border-slate-200 dark:border-slate-800 rounded-lg">
            <table className="min-w-full text-left text-xs sm:text-sm divide-y divide-slate-200 dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-bold text-slate-900 dark:text-slate-100">
                    From
                  </th>
                  <th scope="col" className="px-4 py-2.5 font-bold text-slate-900 dark:text-slate-100 text-right">
                    Equivalent
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
                <tr>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200 font-sans font-medium">1 kg</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300 text-right">2.2046226218 lb approximately</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200 font-sans font-medium">1 lb</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300 text-right">0.45359237 kg</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200 font-sans font-medium">1 oz</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300 text-right">28.349523125 g</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200 font-sans font-medium">1 stone</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300 text-right">14 lb</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200 font-sans font-medium">1 metric tonne</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300 text-right">1,000 kg</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200 font-sans font-medium">1 short ton</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300 text-right">907.18474 kg</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200 font-sans font-medium">1 long ton</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300 text-right">1,016.0469088 kg</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200 font-sans font-medium">1 carat</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300 text-right">0.2 g</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The distinction between short ton and long ton is particularly important. A US short ton is 2,000 lb, a UK long ton is 2,240 lb, and a metric tonne is 1,000 kg. These are three different units and should never be treated as interchangeable.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Short Ton, Long Ton and Metric Tonne Are Different
          </h2>
          <p>The word &ldquo;ton&rdquo; is ambiguous unless the type is specified.</p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li><strong>Metric tonne:</strong> 1 t = 1,000 kg</li>
            <li><strong>US short ton:</strong> 1 short ton = 2,000 lb = 907.18474 kg</li>
            <li><strong>UK long ton:</strong> 1 long ton = 2,240 lb = 1,016.0469088 kg</li>
          </ul>
          <p>
            This difference matters in shipping, engineering, construction, manufacturing, logistics, and historical technical documents.
          </p>
          <p>
            Whenever a calculation uses &ldquo;tons,&rdquo; identify whether it means metric tonne, short ton, or long ton.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Why the Pound Needs Careful Terminology
          </h2>
          <p>
            The symbol or word &ldquo;pound&rdquo; can be confusing because mass and force are both encountered in technical work.
          </p>
          <p>
            A mass pound is generally treated as an avoirdupois pound: <strong>lb</strong>.
          </p>
          <p>
            A force pound is: <strong>lbf</strong>.
          </p>
          <p>
            These are not the same physical quantity. For example, 1 lb = 0.45359237 kg, while gravitational force depends on acceleration.
          </p>
          <p>
            On Earth, an object&apos;s gravitational force can be calculated from <strong>W = mg</strong>. If the calculator displays pound-force, it explicitly identifies that result as <strong>lbf</strong>. This distinction prevents a common misconception in engineering calculations.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. How Planetary Weight Is Calculated
          </h2>
          <p>The planetary module uses:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 text-center font-mono font-bold text-sm text-blue-900 dark:text-blue-200">
            W = mg
          </div>
          <p>
            The mass <strong>m</strong> is kept in kilograms and multiplied by the local gravitational acceleration.
          </p>
          <p>
            For Earth, the calculator uses: <strong>g = 9.80665 m/s²</strong>.
          </p>
          <p>Other bodies have different values. For example, the calculator uses approximately:</p>
          <div className="overflow-x-auto my-3 border border-slate-200 dark:border-slate-800 rounded-lg">
            <table className="min-w-full text-left text-xs sm:text-sm divide-y divide-slate-200 dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-bold text-slate-900 dark:text-slate-100">
                    Celestial body
                  </th>
                  <th scope="col" className="px-4 py-2.5 font-bold text-slate-900 dark:text-slate-100 text-right">
                    g (m/s²)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
                <tr>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200 font-sans font-medium">Earth</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300 text-right">9.80665</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200 font-sans font-medium">Moon</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300 text-right">1.622</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200 font-sans font-medium">Mars</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300 text-right">3.711</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200 font-sans font-medium">Jupiter</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300 text-right">24.79</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200 font-sans font-medium">Venus</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300 text-right">8.87</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200 font-sans font-medium">Mercury</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300 text-right">3.70</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200 font-sans font-medium">Sun</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300 text-right">274.0</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200 font-sans font-medium">Pluto</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300 text-right">0.62</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200 font-sans font-medium">Space / orbit reference</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300 text-right">0.0</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            These values are model inputs used for comparison by the calculator. They are not a statement that gravity is literally zero everywhere in space.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Example: What Would a 70 kg Mass Weigh on Mars and the Moon?
          </h2>
          <p>
            Suppose an object has mass: <strong>m = 70 kg</strong>. We can compare its gravitational weight on Mars, weight on Moon, and weight on Jupiter:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 font-mono text-xs">
            <li><strong>Earth:</strong> W = 70 × 9.80665 ≈ 686.47 N</li>
            <li><strong>Moon:</strong> W = 70 × 1.622 ≈ 113.54 N</li>
            <li><strong>Mars:</strong> W = 70 × 3.711 ≈ 259.77 N</li>
            <li><strong>Jupiter:</strong> W = 70 × 24.79 ≈ 1,735.30 N</li>
          </ul>
          <p>
            The mass remains <strong>70 kg</strong>. The gravitational force changes. This is the key idea behind the planetary comparison tool.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Proportional Scaling &amp; Terrestrial Gravity Variations
          </h2>
          <p>
            For a fixed celestial body: <strong>W = mg</strong>, so weight is directly proportional to mass. If mass doubles, weight doubles. If mass is reduced by half, weight is reduced by half.
          </p>
          <p>
            For example, increasing mass from 70 kg to 140 kg doubles the gravitational weight on every body in the comparison.
          </p>
          <p>
            On Earth, the value of local gravitational acceleration also varies slightly with latitude, altitude, and local geophysical conditions. The calculator uses a defined reference value for comparison rather than attempting to model every local variation.
          </p>
          <p>
            For general physics, engineering, and metrology calculations, the important point is to state which gravitational acceleration is being used.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. The Kilogram and Modern SI Base Units
          </h2>
          <p>
            The kilogram is the SI base unit of mass.
          </p>
          <p>
            Since 20 May 2019, the kilogram has been defined by fixing the numerical value of the Planck constant:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-center font-bold">
            h = 6.62607015 × 10⁻³⁴ J·s
          </div>
          <p>
            This replaced the previous artifact-based definition associated with the International Prototype of the Kilogram.
          </p>
          <p>
            The modern SI is defined using fixed numerical values of fundamental constants. The BIPM identifies the Planck constant as one of the defining constants of the SI. The change did not make everyday kilograms suddenly change size. Instead, it changed the metrological definition used to realize the unit.
          </p>
          <p>
            When mass values become extremely large or extremely small, the{" "}
            <Link
              href="/calculators/scientific-notation-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Scientific Notation Calculator &amp; Converter
            </Link>{" "}
            can make the numerical representation easier to inspect.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Material Density Library &amp; Physical Variations
          </h2>
          <p>
            The calculator includes a material-density library containing many common materials.
          </p>
          <p>
            Material density is not always a single universal value under all conditions. It can vary with:
          </p>
          <ul className="list-disc list-inside space-y-0.5 pl-1">
            <li>temperature</li>
            <li>pressure</li>
            <li>composition</li>
            <li>alloying</li>
            <li>porosity</li>
            <li>moisture</li>
            <li>manufacturing process</li>
            <li>phase</li>
          </ul>
          <p>
            For example, a metal alloy can have a density different from that of a pure element. This is why material presets are convenient for estimates, while laboratory or engineering work may require a measured or specification-based density.
          </p>
          <p>
            When precision matters, use a documented density appropriate to the material grade and physical conditions.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. How to Use the Mass Calculator
          </h2>
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Calculate mass from density and volume
            </h3>
            <ol className="list-decimal list-inside space-y-1 pl-1 text-xs sm:text-sm">
              <li>Select a material preset or enter a density.</li>
              <li>Select the density unit.</li>
              <li>Enter the volume.</li>
              <li>Select the volume unit.</li>
              <li>Calculate.</li>
            </ol>
            <p>
              The result is <strong>m = ρV</strong>. The calculator also displays equivalent mass units through the conversion matrix.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Convert mass between units
            </h3>
            <ol className="list-decimal list-inside space-y-1 pl-1 text-xs sm:text-sm">
              <li>Enter the mass.</li>
              <li>Select the source unit.</li>
              <li>Select the target unit.</li>
              <li>Review the converted result.</li>
            </ol>
            <p>
              The conversion matrix provides additional equivalent values.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Compare planetary weight
            </h3>
            <p>
              Enter a mass in kilograms. The planetary module calculates <strong>W = mg</strong> for each supported celestial body. The same mass is maintained while the gravitational force changes.
            </p>
          </div>
        </section>

        {/* Section 18 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            18. Worked Example: 185.5 lb Conversion &amp; Mars Weight
          </h2>
          <p>Start with: <strong>185.5 lb</strong></p>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Step 1: Convert pounds to kilograms
            </h3>
            <p>Using: 1 lb = 0.45359237 kg</p>
            <p className="font-mono text-xs pl-2">185.5 × 0.45359237 = 84.141384635 kg</p>
            <p>Rounded: <strong>84.1414 kg</strong></p>
          </div>

          <div className="space-y-2 pt-1">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Step 2: Convert pounds to UK stones
            </h3>
            <p>There are 14 pounds in one UK stone:</p>
            <p className="font-mono text-xs pl-2">185.5 / 14 = 13.25 st</p>
            <p>This can also be written as: <strong>13 st 3.5 lb</strong></p>
          </div>

          <div className="space-y-2 pt-1">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Step 3: Convert pounds to ounces
            </h3>
            <p>There are 16 avoirdupois ounces in one pound:</p>
            <p className="font-mono text-xs pl-2">185.5 × 16 = 2,968 oz</p>
          </div>

          <div className="space-y-2 pt-1">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Step 4: Calculate gravitational weight on Mars
            </h3>
            <p>Using: m = 84.141384635 kg and gMars = 3.711 m/s²</p>
            <p className="font-mono text-xs pl-2">W = mg</p>
            <p className="font-mono text-xs pl-2">W = 84.141384635 × 3.711 ≈ 312.25 N</p>
            <p>
              The result demonstrates why mass conversion and planetary weight are separate calculations.
            </p>
          </div>
        </section>

        {/* Section 19 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            19. Common Mistakes When Calculating Mass &amp; Weight
          </h2>
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Mistake 1: Multiplying density and volume without checking units
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                8.9 g/cm³ × 1 m³ is not 8.9 g. The units must first be made compatible.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Mistake 2: Calling kilograms a force unit
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Kilograms measure mass. Newtons measure force.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Mistake 3: Treating all tons as identical
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Short ton, long ton, and metric tonne are different.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Mistake 4: Using rounded conversion factors repeatedly
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                For example, repeatedly converting using 1 kg ≈ 2.2 lb can accumulate avoidable rounding error. For precise conversion, use the defined factor.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Mistake 5: Confusing lb with lbf
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                lb generally refers to pound mass in mass conversion contexts. lbf refers to pound-force.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Mistake 6: Assuming planetary mass changes
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                An object&apos;s mass remains the same when only the gravitational environment changes.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Mistake 7: Treating density as universally fixed
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Real materials can have density values that depend on composition and conditions.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Mistake 8: Ignoring zero and invalid inputs
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Zero can be mathematically meaningful. An empty field or invalid text is different from zero and should not be silently converted into zero.
              </p>
            </div>
          </div>
        </section>

        {/* Section 20 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              20. Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {mass_calculatorFaqs.map((faq, idx) => {
              const isOpen = openFaqIndices.has(idx);
              const label = `Q${idx + 1}.`;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2 pr-4">
                      <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                        {label}
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
                    <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-900/50 font-normal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 21 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              21. Standards and Authoritative References
            </h2>
          </div>
          <p>
            The mass-conversion and SI explanations on this page should be interpreted using established metrology references.
          </p>
          <p>
            The kilogram is defined within the International System of Units by fixing the Planck constant. The BIPM provides the official SI definition and supporting documentation.
          </p>
          <p>
            The international avoirdupois pound has the exact relationship: <strong>1 lb = 0.45359237 kg</strong>. NIST publishes this and related US customary conversion relationships.
          </p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            Recommended source links for this section:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-1 text-xs">
            <li>
              <a
                href="https://www.bipm.org/en/measurement-units/base-units/kilogram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline inline-flex items-center gap-1"
              >
                BIPM — SI definition of the kilogram
                <ExternalLink className="h-3 w-3 inline" />
              </a>
            </li>
            <li>
              <a
                href="https://www.nist.gov/pml/owm/metric-si/unit-conversion"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline inline-flex items-center gap-1"
              >
                NIST — Weights and Measures conversion factors
                <ExternalLink className="h-3 w-3 inline" />
              </a>
            </li>
            <li>
              <a
                href="https://www.nist.gov/pml/owm/publications/nist-handbooks/handbook-44"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline inline-flex items-center gap-1"
              >
                NIST — General Tables of Units of Measurement
                <ExternalLink className="h-3 w-3 inline" />
              </a>
            </li>
          </ul>
          <p className="text-xs text-slate-500 dark:text-slate-400 italic pt-1">
            Use the calculator for numerical conversion and estimation, but for regulated measurement, calibration, legal metrology, or specification-controlled work, use the applicable official standard or authoritative technical source.
          </p>
        </section>
      </div>

      {/* ─── RELATED CALCULATORS — COMPACT PLACEMENT #2 (BELOW ARTICLE) ─── */}
      <nav aria-label="Additional Related Calculators" className="pt-6">
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
            RELATED CALCULATORS:
          </span>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <Link
              href="/calculators/conversion-calculator"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Conversion Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <Link
              href="/calculators/scientific-notation-calculator"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Scientific Notation Calculator &amp; Converter
            </Link>
          </div>
        </div>
      </nav>
    </article>
  );
}

export default MassContent;

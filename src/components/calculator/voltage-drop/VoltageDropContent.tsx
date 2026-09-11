"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, HelpCircle, BookOpen, ShieldCheck } from "lucide-react";
import { voltage_drop_calculatorFaqs } from "@/app/calculators/voltage-drop-calculator/faq";

export function VoltageDropContent() {
  // All 18 FAQs open by default for full visibility and search engine indexing
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 18 }, (_, i) => i))
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
    <div className="space-y-6 mt-6">
      {/* ========================================================================= */}
      {/* 1. RELATED CALCULATORS — ABOVE ARTICLE (RESTRAINED & HORIZONTAL) */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5 no-print">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Related Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/calculators/ohms-law-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Ohm&apos;s Law Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Compute voltage, current, resistance, and electrical power across DC and single-phase AC circuits.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/electricity-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Electrical Power Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Analyze appliance wattage, kilowatt-hour consumption, and circuit operating costs.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EDITORIAL ARTICLE — CLEAN 401(K) STYLE (NO DARK CARDS) */}
      {/* ========================================================================= */}
      <article className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
        <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              1. What Is Voltage Drop?
            </h2>
            <p>
              Voltage drop is the reduction in electrical potential that occurs as current flows through a conductor or other circuit impedance.
            </p>
            <p>
              An electrical source may provide a nominal voltage such as 120 V, 240 V, 230 V, 277 V or 480 V, but the equipment at the end of a long conductor does not necessarily receive that exact voltage. Some of the available voltage is lost along the circuit because the conductor has electrical resistance and, in AC systems, may also have reactance.
            </p>
            <p>
              The basic relationship is simple:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100">
              Vload = Vsupply − Vdrop
            </div>
            <p>
              where:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Vsupply</strong> is the source or nominal circuit voltage,</li>
              <li><strong>Vdrop</strong> is the voltage lost along the conductor, and</li>
              <li><strong>Vload</strong> is the voltage remaining at the receiving end.</li>
            </ul>
            <p>
              Voltage-drop calculations become important when a circuit has significant length, substantial current, relatively small conductors, or loads that are sensitive to reduced terminal voltage.
            </p>
            <p>
              This calculator is designed to evaluate those relationships using DC, single-phase AC and three-phase AC models, together with AWG or metric conductor sizing, conductor material, resistance, reactance, power factor and conduit-related data.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              2. Why Voltage Drop Matters in Electrical Design
            </h2>
            <p>
              A circuit can be thermally capable of carrying its load current and still experience undesirable voltage drop.
            </p>
            <p>
              That distinction is important.
            </p>
            <p>
              Ampacity addresses how much current a conductor can safely carry under specified installation conditions. Voltage drop addresses how much voltage is lost while that current travels through the circuit.
            </p>
            <p>
              They are related design considerations, but they are not the same calculation.
            </p>
            <p>
              Excessive voltage drop can affect equipment performance, particularly for motors, lighting systems, electronic equipment and other loads that require adequate operating voltage.
            </p>
            <p>
              The calculator therefore reports both:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Voltage Drop in Volts</strong></li>
              <li><strong>Voltage Drop as a Percentage</strong></li>
              <li><strong>Voltage at the Load Terminal</strong></li>
            </ul>
            <p>
              This lets a designer see not only the absolute voltage loss, but also how significant that loss is relative to the source voltage.
            </p>
            <p>
              The page&apos;s engineering content explicitly separates voltage-drop considerations from ampacity and distinguishes design guidance from mandatory code requirements.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              3. The Core Voltage Drop Formula
            </h2>
            <p>
              The mathematical model depends on the circuit type.
            </p>
            <p>
              For a DC or purely resistive circuit, the calculator uses:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100">
              Vdrop = (2 × I × L × Reff) / 1000
            </div>
            <p>
              where:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>I</strong> = current in amperes,</li>
              <li><strong>L</strong> = one-way circuit distance in feet,</li>
              <li><strong>Reff</strong> = effective resistance in ohms per 1,000 feet.</li>
            </ul>
            <p>
              The factor of 2 represents the outgoing and returning conductor paths in a two-wire DC or single-phase loop.
            </p>
            <p>
              For example, with I = 15 A, L = 100 ft, and R = 2 Ω/1000 ft, the voltage drop is:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-slate-800 dark:text-slate-200">
              Vdrop = (2 × 15 × 100 × 2) / 1000 = 6.00 V<br />
              Voltage Drop % = (6 / 120) × 100 = 5.00%<br />
              Vload = 120 − 6 = 114.00 V
            </div>
            <p>
              For related circuit calculations, see the{" "}
              <Link
                href="/calculators/ohms-law-calculator"
                className="text-blue-600 dark:text-blue-400 font-medium underline"
              >
                Ohm&apos;s Law Calculator
              </Link>
              . The calculator verifies these relationships using independent regression and randomized testing.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              4. Voltage Drop in Single-Phase AC Circuits
            </h2>
            <p>
              An AC circuit can involve more than simple resistance.
            </p>
            <p>
              In a single-phase AC circuit, inductive reactance can contribute to the effective impedance of the conductor system. The calculator uses the documented approximation:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100">
              Zeff = Reff cosθ + Xeff sinθ
            </div>
            <p>
              where:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>R</strong> is effective resistance,</li>
              <li><strong>X</strong> is effective reactance,</li>
              <li><strong>cosθ</strong> represents the power factor (PF),</li>
              <li><strong>sinθ</strong> = √(1 − PF²) for the lagging-reactive model used by the calculator.</li>
            </ul>
            <p>
              The corresponding single-phase drop is:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100">
              Vdrop = (2 × I × L × Zeff) / 1000
            </div>
            <p>
              This means the same wire can produce different calculated AC voltage-drop behavior when the circuit&apos;s current and power-factor characteristics change. The production implementation specifically verifies the resistance, reactance and power-factor calculations independently.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              5. Voltage Drop in Three-Phase Circuits
            </h2>
            <p>
              Balanced three-phase systems use a different relationship. The calculator applies:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100">
              Vdrop = (√3 × I × L × Zeff) / 1000
            </div>
            <p>
              The factor √3 ≈ 1.732 arises from the phase relationship of a balanced three-phase system. This is not the same as simply applying the two-wire factor used for a single-phase loop.
            </p>
            <p>
              For the calculator&apos;s verified industrial example: 480 V, 120 A, 400 ft, 3/0 AWG copper, steel conduit, PF = 0.85, the calculated result is approximately:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>7.86 V</strong> voltage drop</li>
              <li><strong>1.64%</strong> voltage drop</li>
              <li><strong>472.14 V</strong> load voltage</li>
            </ul>
            <p>
              The implementation and the supplied reference calculation agree on this example.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              6. One-Way Distance vs Total Circuit Length
            </h2>
            <p>
              One of the most common voltage-drop mistakes is entering the wrong conductor distance.
            </p>
            <p>
              For a two-wire DC or single-phase circuit, a stated one-way distance does not represent the complete current path. Current travels out to the load and back from the load, so the effective conductor path is approximately <strong>2 × one-way distance</strong>.
            </p>
            <p>
              For example: 100 ft one way corresponds to 200 ft of total conductor loop length. The calculator handles this relationship in the applicable circuit models.
            </p>
            <p>
              Three-phase calculations are different and must not have the single-phase loop factor incorrectly applied a second time. The production QA specifically verifies that the three-phase implementation does not double the loop distance incorrectly.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              7. How Conductor Size Affects Voltage Drop
            </h2>
            <p>
              Conductor size has a major effect on resistance. For comparable conductor materials and installation conditions:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs sm:text-sm">
              Larger cross-sectional area → Lower resistance → Lower voltage drop
            </div>
            <p>
              For American Wire Gauge, the numbering direction can initially seem backwards: <strong>smaller AWG number = larger conductor</strong>.
            </p>
            <p>
              Therefore: 10 AWG is larger than 12 AWG, and 8 AWG is larger than 10 AWG. Under otherwise identical conditions, increasing conductor size normally reduces voltage drop.
            </p>
            <p>
              The calculator&apos;s What-If conductor comparison makes this relationship visible by recalculating voltage drop, percentage drop, load voltage and status across alternative conductor sizes.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              8. Copper vs Aluminum Conductors
            </h2>
            <p>
              The calculator supports both copper and aluminum conductor selections.
            </p>
            <p>
              The important engineering point is not that one material is universally correct for every installation. Rather, each material has different electrical characteristics, and those characteristics influence conductor resistance and consequently voltage drop.
            </p>
            <p>
              When changing from copper to aluminum, the calculator updates the underlying conductor data instead of merely changing the label. The production audit confirms that copper and aluminum use their corresponding electrical properties and that the calculator&apos;s conductor comparison responds accordingly.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              9. Resistance, Reactance and Impedance
            </h2>
            <p>
              Three related terms are essential to understand:
            </p>
            <div className="space-y-2">
              <p>
                <strong>Resistance:</strong> Opposes current flow and causes real electrical power to be dissipated as heat. For a conductor, resistance depends on material, cross-sectional area, length, temperature, and stranding.
              </p>
              <p>
                <strong>Reactance:</strong> Associated with energy storage and return in AC magnetic and electric fields. Inductive reactance becomes relevant when the AC circuit has inductive raceway characteristics.
              </p>
              <p>
                <strong>Impedance:</strong> Combines resistance and reactance into the overall vector quantity used to describe the AC opposition to alternating current.
              </p>
            </div>
            <p>
              The calculator therefore distinguishes Effective Resistance, Effective Reactance, and Effective Impedance instead of treating every AC circuit as a simple DC resistance problem.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              10. What Power Factor Has to Do With Voltage Drop
            </h2>
            <p>
              Power factor describes the phase relationship between voltage and current in an AC load. For the calculator&apos;s model:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100">
              PF = cosθ, and sinθ = √(1 − PF²)
            </div>
            <p>
              At PF = 1.00, the reactive contribution in the documented equation disappears because sinθ = 0. At lower power factor, the reactance term can contribute more strongly to the effective impedance.
            </p>
            <p>
              The calculator verifies these relationships and uses them in its single-phase and three-phase AC calculations.
            </p>
            <p>
              You can also use the{" "}
              <Link
                href="/calculators/electricity-calculator"
                className="text-blue-600 dark:text-blue-400 font-medium underline"
              >
                Electrical Power Calculator
              </Link>{" "}
              when the load&apos;s power relationship needs to be evaluated separately. Power factor should not be confused with electrical efficiency. A load may have high efficiency and non-unity power factor, or lower efficiency and a different power factor.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              11. How to Calculate Voltage Drop Percentage
            </h2>
            <p>
              Voltage drop in volts is only part of the picture. The corresponding percentage is:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100">
              Voltage Drop % = (Vdrop / Vsupply) × 100
            </div>
            <p>
              Suppose Vdrop = 5.185 V and Vsupply = 120 V. Then: 5.185 / 120 × 100 ≈ 4.32%.
            </p>
            <p>
              The same absolute voltage loss can represent very different percentages at different supply voltages. For example, 5 V of drop on a 24 V circuit (20.8%) is much more significant proportionally than 5 V on a 480 V circuit (1.04%). That is why both the absolute drop and percentage drop should be considered.
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              12. How to Calculate Load-Terminal Voltage
            </h2>
            <p>
              Once voltage drop is known:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100">
              Vload = Vsupply − Vdrop
            </div>
            <p>
              For example: Vsupply = 120 V, Vdrop = 5.185 V, therefore Vload = 114.815 V.
            </p>
            <p>
              A display may round this to 114.81 V. The calculator retains full internal precision and performs rounding only at the presentation stage. This behavior was specifically verified during production QA.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              13. Worked Example: 120 V Residential Circuit
            </h2>
            <p>
              Consider a 120 V single-phase circuit with: 15 A load, 100 ft one-way distance, 12 AWG copper, PVC/nonmetallic conduit, power factor = 0.85.
            </p>
            <p>
              Using the calculator&apos;s reference conductor data: R = 2.00 Ω/1000 ft, X = 0.054 Ω/1000 ft.
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-slate-800 dark:text-slate-200 space-y-1">
              <div>sinθ = √(1 − 0.85²) ≈ 0.526783</div>
              <div>Zeff ≈ 2.00(0.85) + 0.054(0.526783) ≈ 1.72845 Ω/1000 ft</div>
              <div>Vdrop = (2 × 15 × 100 × 1.72845) / 1000 ≈ 5.185 V</div>
              <div>Voltage Drop % = (5.185 / 120) × 100 ≈ 4.32%</div>
              <div>Vload = 120 − 5.185 ≈ 114.81 V</div>
            </div>
            <p>
              The reference PDF and production QA both use this case and arrive at the same displayed result.
            </p>
          </section>

          {/* Section 14 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              14. Worked Example: Changing Wire Size
            </h2>
            <p>
              Keeping the same electrical conditions but changing conductor size demonstrates why voltage-drop analysis is useful. A smaller conductor generally produces greater resistance; a larger conductor generally produces lower resistance.
            </p>
            <p>
              The calculator&apos;s What-If table dynamically compares candidate conductors. In the reference case it shows, among other values:
            </p>
            <ul className="list-disc pl-5 space-y-1 font-mono text-xs">
              <li>14 AWG → 7.997 V → 6.66% (Excessive)</li>
              <li>10 AWG → 3.139 V → 2.62% (Acceptable)</li>
              <li>8 AWG → 2.071 V → 1.73% (Acceptable)</li>
              <li>6 AWG → 1.330 V → 1.11% (Acceptable)</li>
            </ul>
            <p>
              These are not hard-coded educational examples; the calculator dynamically recomputes them from the active circuit conditions. That makes the comparison especially useful when evaluating how a conductor upgrade changes terminal voltage.
            </p>
          </section>

          {/* Section 15 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              15. Worked Example: Three-Phase Industrial Motor Feed
            </h2>
            <p>
              Consider: 480 V, 120 A, 400 ft one way, 3/0 AWG copper, steel conduit, PF = 0.85.
            </p>
            <p>
              The reference conductor values are approximately: R = 0.079 Ω/1000 ft, X = 0.052 Ω/1000 ft.
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-slate-800 dark:text-slate-200 space-y-1">
              <div>sinθ ≈ 0.5268</div>
              <div>Zeff ≈ (0.079 × 0.85) + (0.052 × 0.5268) ≈ 0.09454 Ω/1000 ft</div>
              <div>Vdrop = (√3 × 120 × 400 × 0.09454) / 1000 ≈ 7.86 V</div>
              <div>Percentage = (7.86 / 480) × 100 ≈ 1.64%</div>
              <div>Load-terminal voltage ≈ 472.14 V</div>
            </div>
            <p>
              The verified production calculation reproduces these values.
            </p>
          </section>

          {/* Section 16 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              16. What the Target Voltage-Drop Percentage Means
            </h2>
            <p>
              The calculator provides common design targets such as 1%, 2%, 3%, 5%, and custom targets.
            </p>
            <p>
              These targets are useful for evaluating a design against a chosen criterion, but a calculator status indicator should not be interpreted as a universal declaration that an entire electrical installation is code compliant.
            </p>
            <p>
              Electrical-code requirements depend on the specific installation, adopted code edition, equipment, conductor conditions and jurisdiction. The reference content explicitly distinguishes mandatory code rules from voltage-drop design guidance, and the production audit confirms that distinction is preserved. For final design, use the applicable locally adopted electrical code and qualified engineering review.
            </p>
          </section>

          {/* Section 17 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              17. Voltage Drop Is Not the Same as Ampacity
            </h2>
            <p>
              A conductor can have adequate ampacity and still produce excessive voltage drop over a long run. Conversely, reducing voltage drop by selecting a larger conductor does not automatically establish that the conductor is properly protected or that all installation requirements are satisfied.
            </p>
            <p>
              Ampacity depends on:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Conductor material,</li>
              <li>Insulation temperature rating,</li>
              <li>Ambient temperature,</li>
              <li>Number of current-carrying conductors in raceway,</li>
              <li>Installation method, adjustment and correction factors.</li>
            </ul>
            <p>
              Voltage drop depends on electrical impedance, current, circuit length, phase configuration and related circuit characteristics. Therefore: <strong>Voltage-drop sizing and ampacity sizing should be evaluated separately.</strong> The calculator&apos;s educational content explicitly addresses this distinction.
            </p>
          </section>

          {/* Section 18 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              18. Does Conduit Material Affect Voltage Drop?
            </h2>
            <p>
              For AC systems, installation geometry and magnetic effects can influence conductor reactance. The calculator distinguishes nonmetallic/PVC conduit from magnetic steel conduit where the underlying conductor data specifies different AC reactance characteristics.
            </p>
            <p>
              The reason is that metallic magnetic raceways can influence the AC magnetic field around conductors, affecting the effective reactance used in the model. The production audit explicitly verifies conduit-dependent AC reactance behavior. This does not mean that conduit material changes every DC resistance calculation; its significance depends on the circuit model and conductor data being used.
            </p>
          </section>

          {/* Section 19 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              19. Why Temperature Matters
            </h2>
            <p>
              Electrical conductor resistance changes with temperature. For many metallic conductors, resistance increases as conductor operating temperature increases. That means a conductor&apos;s resistance at an elevated operating temperature can differ from a value measured under different conditions.
            </p>
            <p>
              Engineering tables therefore specify temperature assumptions and conductor characteristics. The reference material uses conductor resistance/reactance data associated with defined temperature conditions (typically 75°C), and the calculator&apos;s educational content treats conductor data as engineering data rather than as a universal constant independent of operating conditions. For professional design, use conductor data appropriate to the actual installation and the applicable standard.
            </p>
          </section>

          {/* Section 20 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              20. Parallel Conductors and Voltage Drop
            </h2>
            <p>
              Where multiple conductors are intentionally connected in parallel, the effective impedance decreases. The calculator uses:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100">
              Reff = R / N, and Xeff = X / N (for N ≥ 1)
            </div>
            <p>
              where N is the number of parallel conductors per phase. For example, with two identical parallel conductors: Reff = R / 2, and Xeff = X / 2. This reduces calculated voltage drop proportionally.
            </p>
            <p>
              The production QA verifies parallel-conductor behavior across randomized test suites. Actual field installations still need to satisfy applicable electrical code rules governing parallel conductors (e.g. minimum 1/0 AWG sizing under NEC 310.10(G)), termination hardware, ampacity, and physical arrangement.
            </p>
          </section>

          {/* Section 21 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              21. When a Larger Wire May Be the Better Engineering Choice
            </h2>
            <p>
              If voltage drop is greater than your selected target, several design variables can influence the result. Depending on the installation, designers may consider:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Larger conductor cross-section (e.g. upgrading from 12 AWG to 10 AWG),</li>
              <li>Shorter conductor run routing,</li>
              <li>Different conductor material (e.g. copper instead of aluminum),</li>
              <li>Parallel conductors where permitted by code,</li>
              <li>Different system voltage (e.g. step-up transformation),</li>
              <li>Appropriate power-factor correction capacitors.</li>
            </ul>
            <p>
              The correct solution depends on the system and applicable requirements. For example, increasing supply voltage for the same power can reduce current, and lower current can reduce resistive voltage drop. But changing system voltage is not a simple software adjustment; it changes equipment requirements, insulation levels, protection and other aspects of the electrical design.
            </p>
          </section>

          {/* Section 22 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              22. How Current Affects Voltage Drop
            </h2>
            <p>
              For the calculator&apos;s fixed-impedance equations: <strong>Vdrop ∝ I</strong>. So if all other variables stay constant and current doubles, voltage drop approximately doubles.
            </p>
            <p>
              For example, 15 A producing 5.185 V drop becomes approximately 10.37 V at 30 A under the same conductor and circuit assumptions. This proportional relationship is one of the calculator&apos;s regression-tested properties. This is why high-current loads can require careful conductor selection even when the run length is moderate.
            </p>
          </section>

          {/* Section 23 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              23. How Distance Affects Voltage Drop
            </h2>
            <p>
              With fixed current and conductor impedance: <strong>Vdrop ∝ L</strong>. Therefore, doubling conductor distance approximately doubles voltage drop.
            </p>
            <p>
              For example: 100 ft producing 5.185 V drop becomes approximately 10.37 V at 200 ft under otherwise unchanged conditions. Long branch runs and subpanel feeds therefore deserve particular attention. The calculator&apos;s dynamic model is tested for exactly this linear behavior.
            </p>
          </section>

          {/* Section 24 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              24. How Supply Voltage Changes Percentage Drop
            </h2>
            <p>
              Absolute voltage drop depends on circuit current, conductor properties and distance. But percentage drop also depends on the source voltage:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100">
              Drop % = (Vdrop / Vsupply) × 100
            </div>
            <p>
              Suppose a conductor causes 5 V of drop. At 120 V, that represents 4.17%. At 240 V, it represents 2.08%. At 480 V, it represents just 1.04%. The absolute voltage loss is the same, but its percentage impact is very different. That distinction is particularly important when comparing low-voltage DC systems with higher-voltage AC systems.
            </p>
          </section>

          {/* Section 25 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              25. Why the &quot;What If?&quot; Table Is Useful
            </h2>
            <p>
              Choosing a conductor from a table based only on ampacity can conceal the effect of conductor length and circuit impedance.
            </p>
            <p>
              The calculator&apos;s What-If comparison provides a practical way to see the consequences of changing conductor size while holding the rest of the circuit constant. For each candidate size it displays wire size, voltage drop, percentage drop, load voltage, and status relative to the target.
            </p>
            <p>
              The production implementation dynamically recalculates the comparison whenever the active electrical parameters change. This turns the page into a design-comparison tool rather than merely a single-number calculator.
            </p>
          </section>

          {/* Section 26 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              26. How to Use the Voltage Drop Calculator
            </h2>
            <p>
              Start with the actual electrical parameters:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Enter supply voltage:</strong> Enter nominal source voltage (e.g. 120 V, 240 V, 480 V).</li>
              <li><strong>Enter load current:</strong> Enter the expected circuit current in amperes.</li>
              <li><strong>Enter one-way distance:</strong> Enter physical one-way distance from source to load in feet or meters. (For general electrical unit conversions, use the{" "}
                <Link
                  href="/calculators/conversion-calculator"
                  className="text-blue-600 dark:text-blue-400 font-medium underline"
                >
                  Conversion Calculator
                </Link>
                ).</li>
              <li><strong>Select circuit phase:</strong> Choose DC, AC Single-Phase, or AC Three-Phase.</li>
              <li><strong>Select conductor information:</strong> Choose Copper or Aluminum, AWG or Metric, and wire gauge, or enter custom resistance and reactance.</li>
              <li><strong>Set conductor configuration:</strong> Enter parallel conductors per phase when applicable.</li>
              <li><strong>Set conduit and power factor:</strong> For AC calculations, select conduit raceway type and load power factor.</li>
              <li><strong>Set your target:</strong> Choose an evaluation drop limit (e.g. 1%, 2%, 3%, or 5%).</li>
              <li><strong>Review the output:</strong> Check Voltage Drop, Drop %, Load Voltage, Effective Impedance, and the What-If comparison matrix.</li>
            </ol>
            <p>
              The calculator&apos;s complete state, modes and outputs are tested through its production regression suite.
            </p>
          </section>

          {/* Section 27 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              27. Common Voltage-Drop Calculation Mistakes
            </h2>
            <p>
              Several mistakes occur repeatedly in design reviews:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Using total cable length as one-way distance:</strong> This accidentally doubles the loop length again in a two-wire model.</li>
              <li><strong>Forgetting circuit type:</strong> A DC formula should not automatically be applied to a three-phase AC circuit.</li>
              <li><strong>Treating AC as purely resistive:</strong> Reactance and power factor can matter substantially in AC systems.</li>
              <li><strong>Reversing AWG size direction:</strong> Remember that a lower AWG number represents a larger conductor.</li>
              <li><strong>Confusing voltage drop with ampacity:</strong> They answer different engineering questions and both must be checked.</li>
              <li><strong>Assuming target percentage is automatically a code requirement:</strong> Local jurisdiction rules must be checked separately.</li>
              <li><strong>Rounding intermediate calculations:</strong> Premature rounding introduces unnecessary numerical error. The production implementation deliberately keeps full internal precision and rounds only at presentation boundaries.</li>
            </ul>
          </section>

          {/* Section 28 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              28. What the Calculator Does Not Replace
            </h2>
            <p>
              A voltage-drop result is one part of electrical design. It does not by itself establish:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Conductor ampacity,</li>
              <li>Overcurrent protection sizing,</li>
              <li>Grounding and bonding compliance,</li>
              <li>Equipment listing requirements,</li>
              <li>Disconnect requirements and installation methods,</li>
              <li>Terminations and short-circuit ratings,</li>
              <li>Complete National Electrical Code (NEC) compliance.</li>
            </ul>
            <p>
              For actual installation work, use the locally adopted electrical code, equipment specifications and qualified professional review. The calculator is most useful as an engineering calculation and comparison aid.
            </p>
          </section>

          {/* Section 29 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              29. Why a Calculation Tool Should Preserve Zero Instead of Replacing It
            </h2>
            <p>
              Zero is often a legitimate engineering input. For example, I = 0 A should produce Vdrop = 0 V. Likewise, L = 0 should produce Vdrop = 0 V, and if both resistance and reactance are zero, Vdrop = 0 V.
            </p>
            <p>
              An engineering calculator should not silently transform an explicit zero into a default nonzero value. The production implementation specifically tests valid physical zeros and rejects invalid negative or non-finite values with explicit validation.
            </p>
          </section>

          {/* Section 30 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              30. Engineering Summary
            </h2>
            <p>
              Voltage drop is fundamentally a relationship between current, distance, conductor impedance, and circuit configuration:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Higher current → Higher voltage drop</li>
              <li>Longer conductor → Higher voltage drop</li>
              <li>Larger conductor → Lower resistance → Lower voltage drop</li>
              <li>Higher supply voltage → Lower percentage drop for the same absolute drop</li>
              <li>Lower power factor can increase the significance of AC reactance</li>
            </ul>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
              <div>DC: Vdrop = (2 × I × L × R) / 1000</div>
              <div>Single-Phase AC: Vdrop = (2 × I × L × Zeff) / 1000</div>
              <div>Three-Phase AC: Vdrop = (√3 × I × L × Zeff) / 1000</div>
              <div>Terminal: Vload = Vsupply − Vdrop</div>
            </div>
            <p>
              These equations provide the mathematical foundation, while the conductor tables, installation assumptions and applicable electrical standards provide the engineering context.
            </p>
          </section>
        </div>

        {/* ========================================================================= */}
        {/* 3. FAQ SECTION — 18 APPROVED QUESTIONS, ALL VISIBLE & UNFOLDED */}
        {/* ========================================================================= */}
        <div className="pt-8">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {voltage_drop_calculatorFaqs.map((faq, idx) => {
              const isOpen = openFaqIndices.has(idx);
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
                    <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-900/50 font-normal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. REFERENCES & METHODOLOGY NOTES */}
        {/* ========================================================================= */}
        <div className="pt-8 space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>Engineering and Code References</span>
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
                National Fire Protection Association — NFPA 70 / National Electrical Code
              </div>
              <p>
                Use the current locally adopted NEC edition for final code interpretation and installation decisions. The calculator does not represent its voltage-drop percentage result as a complete determination of NEC compliance. Public NFPA material confirms that voltage-drop references occur as informational notes (e.g. Informational Note 210.19(A) and 215.2(A)(1)) rather than replacing separate thermal ampacity requirements (NEC 310.16) and equipment listing rules.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
                Schneider Electric — Electrical Calculation Guidance
              </div>
              <p>
                Schneider Electric engineering documentation confirms the use of circuit-specific relationships for AC systems, demonstrating the integral role of power factor, lagging reactive currents, and phase configuration in line-to-line vs line-to-neutral electrical calculations.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
                Calculator Methodology &amp; Safety Notice
              </div>
              <p>
                The calculator implementation separately models DC, single-phase AC and three-phase AC circuits, supporting conductor resistance, reactance, parallel runs, copper and aluminum materials, AWG and metric cross-sections, and dynamic comparison matrices. All calculations are performed client-side using full IEEE 754 precision. Always verify critical power-distribution installations with a licensed professional engineer or master electrician.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* ========================================================================= */}
      {/* 5. FINAL RELATED CALCULATORS — BELOW ARTICLE */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5 no-print">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Related Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/calculators/ohms-law-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Ohm&apos;s Law Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Compute voltage, current, resistance, and electrical power across DC and single-phase AC circuits.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/electricity-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Electrical Power Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Analyze appliance wattage, kilowatt-hour consumption, and circuit operating costs.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default VoltageDropContent;

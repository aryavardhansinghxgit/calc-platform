"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, HelpCircle, BookOpen, ShieldAlert } from "lucide-react";
import { ohms_law_calculatorFaqs } from "@/app/calculators/ohms-law-calculator/faq";

export function OhmsLawContent() {
  // All 16 FAQs open by default for immediate accessibility and SEO indexing
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: ohms_law_calculatorFaqs.length }, (_, i) => i))
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
            href="/calculators/voltage-drop-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Voltage Drop Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Determine wire gauge loss, conductor resistance, and voltage drop across AC and DC transmission runs.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/resistor-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Resistor Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Decode 4-band, 5-band, and 6-band resistors to determine baseline resistance, tolerance, and TCR.
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
          
          {/* Section 1: What Is Ohm's Law? */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              1. What Is Ohm&apos;s Law?
            </h2>
            <p>
              Ohm&apos;s Law describes the relationship between voltage, current and resistance in an ohmic electrical component or circuit.
            </p>
            <p>
              The fundamental equation is:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-sm">
              V = I × R
            </div>
            <p>where:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>V</strong> is voltage in volts (V)</li>
              <li><strong>I</strong> is current in amperes (A)</li>
              <li><strong>R</strong> is resistance in ohms (Ω)</li>
            </ul>
            <p>The equation can be rearranged depending on which quantity is unknown:</p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-sm space-y-1">
              <div>I = V ÷ R</div>
              <div>R = V ÷ I</div>
            </div>
            <p>
              This simple relationship is one of the most useful calculation tools in basic electrical and electronics work. It can be used to determine current through a resistor, estimate the voltage across a resistive load, or calculate resistance from measured voltage and current.
            </p>
            <p>
              However, Ohm&apos;s Law should not be treated as a universal description of every electrical device. It applies directly to ohmic behavior. Components such as diodes and LEDs have nonlinear voltage-current characteristics, while circuits containing significant inductance or capacitance are more appropriately analyzed using impedance and AC circuit methods.
            </p>
          </section>

          {/* Section 2: The Four Core Quantities */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              2. The Four Core Quantities: Voltage, Current, Resistance and Power
            </h2>
            <p>
              The calculator works with four closely connected electrical quantities:
            </p>
            <div className="space-y-3 pl-1">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Voltage</h3>
                <p>
                  Voltage is the electric potential difference between two points. It provides the potential energy change per unit charge associated with moving charge between those points. The SI unit is the volt (V).
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Current</h3>
                <p>
                  Current measures the rate of electric charge flow. The SI unit is the ampere (A). NIST defines the ampere as the SI unit of electric current and gives the relationship between the volt, ampere and ohm through electrical units.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Resistance</h3>
                <p>
                  Resistance describes opposition to electrical current in a circuit element. The SI unit is the ohm (Ω). NIST gives the practical unit relationship: 1 Ω = 1 V/A.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Power</h3>
                <p>
                  Electrical power describes the rate at which electrical energy is transferred or dissipated. The unit is the watt (W). For a resistive load:
                </p>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-sm mt-1">
                  P = V × I
                </div>
                <p className="mt-1">
                  Combining this relationship with Ohm&apos;s Law produces the other common power equations used by the calculator.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: The Complete Formula Set */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              3. The Complete Ohm&apos;s Law and Power Formula Set
            </h2>
            <p>
              There are four fundamental quantities: <strong>V</strong> (Voltage), <strong>I</strong> (Current), <strong>R</strong> (Resistance), and <strong>P</strong> (Power). From Ohm&apos;s Law and the power relationship, the calculator supports the complete set of common two-variable equations:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5 font-mono text-xs">
                <div className="font-bold text-pink-600 dark:text-pink-400 font-sans uppercase tracking-wider text-[11px]">To calculate Voltage</div>
                <div>V = I × R</div>
                <div>V = P ÷ I</div>
                <div>V = √(P × R)</div>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5 font-mono text-xs">
                <div className="font-bold text-amber-600 dark:text-amber-400 font-sans uppercase tracking-wider text-[11px]">To calculate Current</div>
                <div>I = V ÷ R</div>
                <div>I = P ÷ V</div>
                <div>I = √(P ÷ R)</div>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5 font-mono text-xs">
                <div className="font-bold text-indigo-600 dark:text-indigo-400 font-sans uppercase tracking-wider text-[11px]">To calculate Resistance</div>
                <div>R = V ÷ I</div>
                <div>R = V² ÷ P</div>
                <div>R = P ÷ I²</div>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5 font-mono text-xs">
                <div className="font-bold text-emerald-600 dark:text-emerald-400 font-sans uppercase tracking-wider text-[11px]">To calculate Power</div>
                <div>P = V × I</div>
                <div>P = I² × R</div>
                <div>P = V² ÷ R</div>
              </div>
            </div>
            <p className="pt-1">
              These are not twelve unrelated formulas. They are different rearrangements and combinations of two fundamental relationships: V = IR and P = VI. OpenStax presents the same relationship family and shows how the power equations follow directly by substituting Ohm&apos;s Law into P = VI.
            </p>
          </section>

          {/* Section 4: How to Use the Calculator */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              4. How to Use the Ohm&apos;s Law Calculator
            </h2>
            <p>
              The calculator is designed around a simple workflow: provide the known electrical quantities and solve for the unknown quantities.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Step 1: Identify what you know:</strong> For example, Voltage = 12 V and Resistance = 4 Ω.</li>
              <li><strong>Step 2: Select those known quantities:</strong> Use the core calculator&apos;s parameter controls to indicate which values are given.</li>
              <li><strong>Step 3: Calculate:</strong> The calculator determines the remaining electrical quantities. For the example:
                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs mt-1 space-y-1">
                  <div>I = V ÷ R = 12 ÷ 4 = 3 A</div>
                  <div>P = V × I = 12 × 3 = 36 W</div>
                </div>
              </li>
            </ul>
            <p>
              The calculator&apos;s verified golden case produces exactly 3 A and 36 W from 12 V and 4 Ω.
            </p>
          </section>

          {/* Section 5: Worked Example: Finding Current */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              5. Worked Example: Finding Current
            </h2>
            <p>
              Suppose a resistor is connected across 12 V and the resistance is 4 Ω.
            </p>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
              <div>Formula: I = V ÷ R</div>
              <div>Substitution: I = 12 V ÷ 4 Ω</div>
              <div>Therefore: I = 3 A</div>
            </div>
            <p>The resistor current is 3 amperes. The corresponding electrical power is:</p>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
              <div>P = VI = 12 × 3 = 36 W</div>
            </div>
            <p>The same power can be checked independently:</p>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
              <div>P = V² ÷ R = 12² ÷ 4 = 144 ÷ 4 = 36 W</div>
            </div>
            <p>All three power relationships must agree for this resistive example.</p>
          </section>

          {/* Section 6: How Voltage, Current and Resistance Change Together */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              6. How Voltage, Current and Resistance Change Together
            </h2>
            <p>
              Ohm&apos;s Law becomes particularly useful when looking at proportional relationships:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>At constant resistance:</strong> I = V/R, so increasing voltage increases current proportionally.</li>
              <li><strong>At constant voltage:</strong> I = V/R, so increasing resistance decreases current.</li>
              <li><strong>At constant current:</strong> V = IR, so increasing resistance increases the required voltage.</li>
            </ul>
            <p>
              These relationships are experimentally useful because measurements of voltage and current can reveal the effective resistance of an ohmic device. OpenStax describes current as proportional to voltage for ohmic behavior and explains resistance as the proportionality relationship between them.
            </p>
          </section>

          {/* Section 7: What Is Electrical Power? */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              7. What Is Electrical Power?
            </h2>
            <p>
              Electrical power is the rate at which electrical energy is transferred. For a circuit element, P = VI. For a resistor, Ohm&apos;s Law allows this equation to be rewritten as:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-sm space-y-1">
              <div>P = I²R</div>
              <div>P = V²/R</div>
            </div>
            <p>
              These equations are mathematically equivalent when the element behaves according to the resistive Ohm&apos;s Law model. OpenStax derives both forms directly from P = VI and V = IR. This matters in practical electronics because a resistor can have a correct resistance value and still be incorrectly selected if its power rating is too low.
            </p>
          </section>

          {/* Section 8: Resistor Power and Heat */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              8. Resistor Power and Heat
            </h2>
            <p>
              A resistor dissipates electrical power as heat. For example, with I = 3 A and R = 4 Ω, the dissipated power is P = I²R = 3² × 4 = 36 W. A resistor intended for that circuit would need a suitable power rating rather than being selected only by its 4 Ω resistance. For dedicated resistance calculations, see the{" "}
              <Link href="/calculators/resistor-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Resistor Calculator
              </Link>
              . For conductor-level voltage-loss calculations, the{" "}
              <Link href="/calculators/voltage-drop-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Voltage Drop Calculator
              </Link>{" "}
              can be used after the circuit current and load conditions are known.
            </p>
            <p>
              The calculator therefore includes a resistor-power verification and wattage safety-margin workflow. A safety margin does not make an unsuitable physical resistor automatically safe. The actual component&apos;s datasheet, operating temperature, mounting conditions and circuit environment still matter. The calculator&apos;s production QA specifically verifies resistor power and its safety-margin logic.
            </p>
          </section>

          {/* Section 9: Why Power Increases Rapidly With Current */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              9. Why Power Increases Rapidly With Current
            </h2>
            <p>
              The equation P = I²R contains current squared. Therefore, if resistance remains constant and current doubles:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-sm space-y-1">
              <div>P_new = (2I)²R = 4I²R</div>
            </div>
            <p>
              Power becomes four times larger. This is why even a moderate increase in current can substantially increase heating in a resistive component. This relationship is particularly important when checking resistor power ratings, wire heating and other resistive losses.
            </p>
          </section>

          {/* Section 10: Voltage Divider: How Two Resistors Produce a Lower Voltage */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              10. Voltage Divider: How Two Resistors Produce a Lower Voltage
            </h2>
            <p>
              A voltage divider uses resistors in series to produce a fraction of an input voltage. For two resistors R1 and R2, the unloaded output voltage is:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-sm">
              Vout = Vin × R2 / (R1 + R2)
            </div>
            <p>
              The calculator includes a dedicated Voltage Divider mode. For Vin = 12 V, R1 = 10 Ω, and R2 = 5 Ω:
            </p>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
              <div>Vout = 12 × 5 / (10 + 5) = 4 V</div>
              <div>Divider Current: I = 12 / 15 = 0.8 A</div>
              <div>Power in R1: P1 = I²R1 = 0.8² × 10 = 6.4 W</div>
              <div>Power in R2: P2 = 0.8² × 5 = 3.2 W</div>
            </div>
            <p>These exact values are independently verified by the calculator&apos;s production tests.</p>
          </section>

          {/* Section 11: Loaded Voltage Dividers */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              11. Loaded Voltage Dividers
            </h2>
            <p>
              A voltage divider changes when a load is connected to its output. If a load resistor RL is connected across R2, R2 and RL form a parallel combination:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-sm">
              Rparallel = (R2 × RL) / (R2 + RL)
            </div>
            <p>The output then becomes:</p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-sm">
              Vout = Vin × Rparallel / (R1 + Rparallel)
            </div>
            <p>
              This is why an unloaded divider calculation cannot automatically be used after connecting a substantial load. The calculator explicitly supports loaded-divider behavior and verifies the parallel-resistance calculation independently. A divider designed for one load condition can therefore produce a different output under another load condition.
            </p>
          </section>

          {/* Section 12: Voltage Divider Design Intuition */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              12. Voltage Divider Design Intuition
            </h2>
            <p>
              A two-resistor divider behaves predictably at its limiting cases:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>If <strong>R1 = R2</strong>, then Vout = Vin / 2.</li>
              <li>If <strong>R2 = 0 Ω</strong>, the output approaches 0 V.</li>
              <li>If <strong>R1 = 0 Ω</strong>, the output approaches Vin.</li>
            </ul>
            <p>
              These relationships provide useful sanity checks when evaluating a divider calculation. The calculator&apos;s edge-case testing specifically verifies these behaviors.
            </p>
          </section>

          {/* Section 13: Current Divider */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              13. Current Divider: Splitting Current Between Parallel Branches
            </h2>
            <p>
              A current divider is the complementary idea to a voltage divider. In a parallel network, branches share the same voltage while the total current divides among the individual branches. For two resistors:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-sm">
              Req = 1 / (1/R1 + 1/R2)
            </div>
            <p>Once equivalent resistance is known:</p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-sm">
              Vparallel = Itotal × Req
            </div>
            <p>
              Branch currents can then be determined using Ohm&apos;s Law. For Itotal = 2 A, R1 = 10 Ω, and R2 = 10 Ω, the equivalent resistance is Req = 5 Ω. The parallel voltage is V = 2 × 5 = 10 V. Therefore:
            </p>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
              <div>I1 = 10 / 10 = 1 A</div>
              <div>I2 = 10 / 10 = 1 A</div>
              <div>Check: I1 + I2 = 2 A</div>
            </div>
            <p>The production calculator verifies this reference case and current-conservation behavior.</p>
          </section>

          {/* Section 14: Three-Branch Current Divider */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              14. Three-Branch Current Divider
            </h2>
            <p>
              The same concept extends to three or more parallel branches:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-sm">
              Req = 1 / (1/R1 + 1/R2 + 1/R3)
            </div>
            <p>
              Suppose R1 = 10 Ω, R2 = 20 Ω, R3 = 30 Ω, and Itotal = 3 A. First calculate the equivalent resistance, then calculate Vparallel = Itotal × Req. Finally:
            </p>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
              <div>I1 = Vparallel / R1</div>
              <div>I2 = Vparallel / R2</div>
              <div>I3 = Vparallel / R3</div>
            </div>
            <p>
              The key conservation check is: I1 + I2 + I3 = Itotal. The calculator explicitly tests this identity across its three-branch implementation.
            </p>
          </section>

          {/* Section 15: LED Current-Limiting Resistor */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              15. LED Current-Limiting Resistor
            </h2>
            <p>
              LEDs are not ordinary fixed-value resistors. Their voltage-current behavior is nonlinear, so a resistor is commonly used to limit current in a simple LED circuit. For a basic resistor-limited LED circuit:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-sm">
              R = (Vsupply − Vf) / If
            </div>
            <p>
              where Vsupply is the source voltage, Vf is the LED forward-voltage drop, and If is desired LED current.
            </p>
            <p><strong>Example:</strong></p>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
              <div>Supply: 9 V</div>
              <div>LED forward voltage: 2 V</div>
              <div>Desired current: 20 mA = 0.020 A</div>
              <div>Voltage across resistor: 9 − 2 = 7 V</div>
              <div>Required resistance: 7 ÷ 0.020 = 350 Ω</div>
            </div>
            <p>
              The calculator then selects the appropriate E24 standard resistor. The verified result is: Target = 350 Ω, Standard E24 = 360 Ω, and resistor dissipation based on the target calculation: P ≈ 0.140 W.
            </p>
          </section>

          {/* Section 16: Why the Calculator Chooses the Higher E24 Resistor */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              16. Why the Calculator Chooses the Higher E24 Resistor
            </h2>
            <p>
              Standard resistors are manufactured in preferred-value series rather than every possible decimal resistance. If the calculated LED resistor requirement is 350 Ω, standard choices may include values around that target.
            </p>
            <p>
              For a simple current-limiting design, choosing a standard resistor below the calculated minimum can increase LED current. The calculator therefore selects the smallest E24 value greater than or equal to the calculated target resistance. For the 350 Ω example, 360 Ω is preferred over a lower standard resistance.
            </p>
            <p>
              The production QA explicitly verifies that the selected E24 resistance is never below the target in the tested LED cases. The actual LED&apos;s datasheet should still be checked for forward-current and thermal requirements.
            </p>
          </section>

          {/* Section 17: Ohm's Law and AC Circuits */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              17. Ohm&apos;s Law and AC Circuits
            </h2>
            <p>
              The simple equation V = IR works directly for resistive DC circuits and for AC situations where the relevant element behaves as a resistance. AC circuits can also contain capacitive and inductive effects. For such circuits, resistance alone may not adequately describe the relationship between voltage and current.
            </p>
            <p>
              The broader AC quantity is impedance, commonly represented by Z, and a generalized phasor relationship can be written as:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-sm">
              V = I × Z
            </div>
            <p>
              This distinction matters because capacitors and inductors introduce frequency-dependent reactance. Simple resistor equations should not be applied blindly to circuits containing significant inductive or capacitive reactance. OpenStax likewise notes that Ohm&apos;s Law describes a useful proportional relationship for ohmic devices and does not apply universally to all materials and components.
            </p>
          </section>

          {/* Section 18: Resistance Versus Impedance */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              18. Resistance Versus Impedance
            </h2>
            <p>
              Resistance describes opposition associated with resistive behavior. Impedance is the broader AC quantity that incorporates resistance and reactance. A purely resistive element can be represented by Z = R. But a general AC load can have:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-sm">
              Z = R + jX
            </div>
            <p>
              where R is resistance, X is reactance, and j represents the imaginary unit. This distinction becomes important in motors, transformers, inductors, capacitors and other AC networks. Do not assume that an Ohm&apos;s Law calculator based on scalar resistance is a complete AC power-system analysis tool.
            </p>
          </section>

          {/* Section 19: Circuit Consistency */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              19. Circuit Consistency: When Entered Values Disagree
            </h2>
            <p>
              Suppose someone enters V = 12 V, I = 3 A, and R = 4 Ω. These values agree because 12 = 3 × 4.
            </p>
            <p>
              Now suppose V = 12 V, I = 3 A, and R = 10 Ω. These values do not satisfy V = IR because 3 × 10 = 30 V.
            </p>
            <p>
              When multiple electrical values are entered, disagreement can indicate measurement error, incorrect units, incorrect assumptions, a non-ohmic component, or another circuit effect. The calculator includes a consistency check and flags over-constrained input mismatches rather than silently forcing the numbers to agree.
            </p>
          </section>

          {/* Section 20: Common Unit Mistakes */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              20. Common Unit Mistakes
            </h2>
            <p>
              Electrical calculations often fail because the equation is correct but the units are not. Examples:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>20 mA ≠ 20 A, because 20 mA = 0.020 A</li>
              <li>1 kΩ = 1,000 Ω</li>
              <li>1 MΩ = 1,000,000 Ω</li>
            </ul>
            <p>
              A common LED mistake is entering 20 mA as 20 A. The result would be 1,000 times different. Always normalize units before performing the calculation. For broader electrical-unit conversions, use the{" "}
              <Link href="/calculators/conversion-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Conversion Calculator
              </Link>
              .
            </p>
          </section>

          {/* Section 21: Why Resistor Wattage Matters */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              21. Why Resistor Wattage Matters
            </h2>
            <p>
              A resistance value tells you how strongly a resistor opposes current. It does not tell you how much heat the physical component can safely dissipate. For a resistor, P = I²R or P = V²/R. If calculated dissipation exceeds the resistor&apos;s rated power, the component may overheat.
            </p>
            <p>
              A design margin is commonly used so a resistor is not operated continuously at its maximum rating. The calculator includes an explicit resistor power-rating check and configurable safety-margin logic. Always verify the manufacturer&apos;s datasheet and the actual thermal environment before building the circuit.
            </p>
          </section>

          {/* Section 22: Practical Applications of Ohm's Law */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              22. Practical Applications of Ohm&apos;s Law
            </h2>
            <p>
              Ohm&apos;s Law is used throughout electronics and electrical engineering:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Sensor interfaces:</strong> A resistor network can reduce or scale a signal voltage before it reaches another circuit.</li>
              <li><strong>LED circuits:</strong> A series resistor can limit LED current.</li>
              <li><strong>Current measurement:</strong> A known shunt resistance can produce a measurable voltage related to current.</li>
              <li><strong>Power supply analysis:</strong> Measured voltage and current can be used to estimate load resistance and power.</li>
              <li><strong>Heater circuits:</strong> Resistive heaters can be analyzed using voltage, current, resistance and power relationships.</li>
              <li><strong>Electronics troubleshooting:</strong> Measurements of voltage and current can reveal whether a component or circuit is behaving as expected.</li>
            </ul>
            <p>
              These applications all depend on using the correct physical model rather than assuming every device is an ideal resistor.
            </p>
          </section>

          {/* Section 23: When Ohm's Law Does Not Fully Describe the Circuit */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              23. When Ohm&apos;s Law Does Not Fully Describe the Circuit
            </h2>
            <p>
              Ohm&apos;s Law is powerful, but it has limits. It should not automatically be treated as a complete model for:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>LEDs and semiconductor diodes</li>
              <li>Bipolar and field-effect transistors</li>
              <li>Many integrated circuit devices</li>
              <li>Capacitive circuits and inductive circuits</li>
              <li>Frequency-dependent networks and strongly nonlinear loads</li>
            </ul>
            <p>
              For nonlinear components, resistance depends on operating point. For AC reactive networks, impedance and phase relationships become important. For dynamic circuits, transient analysis may be required.
            </p>
          </section>

          {/* Section 24: A Fast Engineering Workflow */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              24. A Fast Engineering Workflow
            </h2>
            <p>For a basic resistive circuit:</p>
            <ol className="list-decimal pl-5 space-y-1.5">
              <li><strong>Identify the known quantities:</strong> Voltage, current, resistance or power.</li>
              <li><strong>Convert units:</strong> Convert mA to A, kΩ to Ω, mW to W, and so forth.</li>
              <li><strong>Select the appropriate formula:</strong> For example, I = V/R.</li>
              <li><strong>Calculate:</strong> Keep full numerical precision internally.</li>
              <li><strong>Cross-check:</strong> Use another identity where possible. For example, P = VI and P = V²/R should agree for a valid resistive circuit.</li>
              <li><strong>Check physical limits:</strong> Does the current make sense? Does the resistor power rating make sense? Is the component actually ohmic?</li>
              <li><strong>Review the result in context:</strong> A mathematically correct number is not automatically proof of a safe physical design.</li>
            </ol>
          </section>

          {/* Section 25: Worked Example: Complete Circuit Analysis */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              25. Worked Example: Complete Circuit Analysis
            </h2>
            <p>Consider V = 24 V and R = 8 Ω:</p>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
              <div>Current: I = V/R = 24/8 = 3 A</div>
              <div>Power: P = VI = 24 × 3 = 72 W</div>
              <div>Cross-check 1: P = I²R = 3² × 8 = 72 W</div>
              <div>Cross-check 2: P = V²/R = 24²/8 = 576/8 = 72 W</div>
              <div>Summary: Voltage = 24 V, Current = 3 A, Resistance = 8 Ω, Power = 72 W</div>
            </div>
            <p>
              If the component is a physical resistor, its power rating must be appropriate for the operating conditions rather than merely equal to the calculated 72 W.
            </p>
          </section>

          {/* Section 26: Understanding the Interactive Formula Wheel */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              26. Understanding the Interactive Formula Wheel
            </h2>
            <p>
              The calculator includes an Interactive Formula Wheel for the four principal quantities: V, I, R, and P. Selecting a quantity presents the equations that can be used to calculate it:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
                <div className="font-bold text-slate-900 dark:text-slate-100 font-sans text-xs">For Voltage:</div>
                <div>V = I × R</div>
                <div>V = P ÷ I</div>
                <div>V = √(P × R)</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
                <div className="font-bold text-slate-900 dark:text-slate-100 font-sans text-xs">For Current:</div>
                <div>I = V ÷ R</div>
                <div>I = P ÷ V</div>
                <div>I = √(P ÷ R)</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
                <div className="font-bold text-slate-900 dark:text-slate-100 font-sans text-xs">For Resistance:</div>
                <div>R = V ÷ I</div>
                <div>R = V² ÷ P</div>
                <div>R = P ÷ I²</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
                <div className="font-bold text-slate-900 dark:text-slate-100 font-sans text-xs">For Power:</div>
                <div>P = V × I</div>
                <div>P = I² × R</div>
                <div>P = V² ÷ R</div>
              </div>
            </div>
            <p className="pt-1">
              The production implementation verifies that the Formula Wheel stays synchronized with the calculation state and is keyboard accessible.
            </p>
          </section>

          {/* Section 27: How to Check a Result Without Trusting a Single Formula */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              27. How to Check a Result Without Trusting a Single Formula
            </h2>
            <p>
              A good engineering habit is to calculate the same quantity in two independent ways. Suppose V = 12 V and R = 4 Ω:
            </p>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
              <div>First calculate: I = 12/4 = 3 A</div>
              <div>Then: P = VI = 12 × 3 = 36 W</div>
              <div>Now use: P = V²/R = 144/4 = 36 W</div>
            </div>
            <p>
              Agreement provides a useful consistency check. The calculator&apos;s automated regression suite applies the same principle across randomized values and independently checks the power identities.
            </p>
          </section>

          {/* Section 28: Engineering Disclaimer */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <span>28. Engineering Disclaimer</span>
            </h2>
            <p>
              Ohm&apos;s Law calculations are mathematical tools and should be applied using an appropriate electrical model. A calculator result does not by itself establish that an electrical installation is safe or code-compliant. Final circuit design may also require consideration of:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>conductor ampacity and overcurrent protection</li>
              <li>conductor operating temperature and insulation ratings</li>
              <li>available short-circuit current</li>
              <li>grounding and bonding requirements</li>
              <li>equipment ratings and enclosure thermal conditions</li>
              <li>applicable national and local electrical codes (e.g. NEC / IEC)</li>
            </ul>
            <p>
              For LEDs and other nonlinear components, consult the manufacturer&apos;s datasheet for exact electrical characteristics. For AC systems containing substantial inductance or capacitance, apply impedance- and phase-based analysis where required. For mains-voltage work and installation decisions, always consult qualified professional engineers and adhere to local electrical regulations.
            </p>
          </section>
        </div>

        {/* ========================================================================= */}
        {/* 3. FAQ SECTION — 16 QUESTIONS ALL VISIBLE & UNFOLDED */}
        {/* ========================================================================= */}
        <div className="pt-8">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {ohms_law_calculatorFaqs.map((faq, idx) => {
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
            <span>References</span>
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
                OpenStax — Ohm&apos;s Law and Electric Power
              </div>
              <p>
                OpenStax documents the fundamental relationship V = IR and the associated power equations: P = VI, P = I²R, and P = V²/R.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
                NIST — SI Units: Electric Current
              </div>
              <p>
                NIST documents the SI relationships among electrical units, including 1 V = 1 W/A and 1 Ω = 1 V/A.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
                NIST — Ampere / Ohm&apos;s Law History
              </div>
              <p>
                NIST identifies Georg Ohm&apos;s formulation in 1827 and describes the relationship among ampere, volt and ohm.
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
            href="/calculators/voltage-drop-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Voltage Drop Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Determine wire gauge loss, conductor resistance, and voltage drop across AC and DC transmission runs.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/resistor-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Resistor Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Decode 4-band, 5-band, and 6-band resistors to determine baseline resistance, tolerance, and TCR.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default OhmsLawContent;

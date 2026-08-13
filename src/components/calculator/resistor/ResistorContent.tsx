"use client";

import React from "react";
import { BookOpen, AlertTriangle, Cpu, CheckCircle, Table } from "lucide-react";

export function ResistorContent() {
  return (
    <article className="prose dark:prose-invert max-w-none space-y-8 text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed mt-10 border-t border-zinc-200 dark:border-zinc-800 pt-8">
      <header>
        <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          The Engineering Guide to Resistors, Color Codes, and Conductor Resistance
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs">
          An authoritative reference on mathematical circuit analysis, conductor properties, and international standards.
        </p>
      </header>

      {/* SECTION 1: INTRODUCTION */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>1.</span> Introduction
        </h3>
        <p>
          A **resistor calculator** is a fundamental utility used in electronics engineering to decode component values, compute network equivalents, and determine physical conductor properties. Resistors are passive two-terminal electrical components that implement electrical resistance as a circuit element. In electronic circuits, resistors are used to reduce current flow, adjust signal levels, divide voltages, bias active elements, and terminate transmission lines.
        </p>
        <p>
          This suite is designed for engineers, students, technicians, and hobbyists who need to quickly calculate component properties. By automating resistor calculations, designers can verify nominal resistance values, determine minimum and maximum tolerances, compute power dissipation margins, and select standard E-series components, ensuring circuits operate within safe operational boundaries.
        </p>
      </section>

      {/* SECTION 2: MATHEMATICAL CONCEPT */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>2.</span> Physical and Mathematical Principles of Resistance
        </h3>
        <p>
          To understand resistors and network behavior, we analyze their physical properties:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Electrical Resistance (R):</strong> The measure of a material&apos;s opposition to the flow of electric current. Measured in Ohms (Ω), it represents the ratio of voltage applied across a conductor to the current flowing through it (Ohm&apos;s Law: R = V / I).
          </li>
          <li>
            <strong>Resistivity (ρ) and Conductivity (σ):</strong> Resistivity is an intrinsic property of a material that quantifies how strongly it opposes current flow. Conductivity is the reciprocal of resistivity (σ = 1 / ρ), representing a material&apos;s ability to conduct current. Silver, copper, and gold have low resistivities, making them excellent conductors, whereas carbon and silicon have higher resistivities.
          </li>
          <li>
            <strong>Joule Heating and Power Rating:</strong> When current flows through a resistor, electrical energy is converted to thermal energy (heat). The power dissipated is calculated as P = I² × R. Every physical resistor has a maximum power rating (e.g., 1/4 W, 1/2 W, 5 W) representing the maximum heat it can dissipate without burning out.
          </li>
          <li>
            <strong>Temperature Coefficient of Resistance (TCR):</strong> A material&apos;s resistance changes with temperature. Most metals have a positive temperature coefficient, meaning resistance increases as temperature rises. The rate of change is measured in parts per million per Kelvin (ppm/K) or per degree Celsius.
          </li>
          <li>
            <strong>E-Series Standards:</strong> Resistors are manufactured in standard logarithmic series (E6, E12, E24, E96, E192) defined by the IEC 60063 standard. Each series divides a decade (e.g., 100 to 1000) into log-spaced steps matching component tolerance thresholds (e.g., ±5% for E24).
          </li>
        </ul>
      </section>

      {/* SECTION 3: FORMULA SECTION */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>3.</span> The Formulas
        </h3>
        <p>
          The Resistor Calculator Suite utilizes the following primary equations depending on the selected module:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">Series Resistance</h4>
            <div className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
              R_total = R_1 + R_2 + ... + R_n
            </div>
            <p className="text-[11px] text-zinc-500">For series resistors, the equivalent resistance is simply the sum of individual values.</p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">Parallel Resistance</h4>
            <div className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
              1 / R_total = Σ (1 / R_i)
            </div>
            <p className="text-[11px] text-zinc-500">The reciprocal equivalent resistance is the sum of the reciprocals of branch resistances.</p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">Conductor Resistance</h4>
            <div className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
              R = ρ × L / A
            </div>
            <p className="text-[11px] text-zinc-500">Resistance equals material resistivity times length divided by cross-sectional area.</p>
          </div>
        </div>

        <h4 className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm mt-3">Other Circuit Formulations:</h4>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Tolerance Bounds:</strong> R_min = R_nominal × (1 - Tol / 100) and R_max = R_nominal × (1 + Tol / 100).</li>
          <li><strong>Conductor Temperature Correction:</strong> R(T) = R_20 × [1 + α × (T - 20)], where α is the temperature coefficient and T is current temperature in °C.</li>
          <li><strong>Power Dissipation:</strong> P = V² / R = I² × R.</li>
          <li><strong>EIA-96 Code:</strong> Value = EIA-Table-Digits × Multiplier-Letter.</li>
        </ul>
      </section>

      {/* SECTION 4: HOW CALCULATION WORKS */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>4.</span> Step-by-Step Calculation Processes
        </h3>
        <p>
          Each calculation module runs a specific step sequence to determine its values:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Color Code Decoding:</strong> Convert band colors to their integer equivalents. For 4-band resistors, combine digit 1 and digit 2 (e.g., Brown=1, Red=2 is 12) and multiply by the multiplier band value (e.g., Gold=0.1, so 12 × 0.1 = 1.2 Ω). The tolerance band determines range limits.
          </li>
          <li>
            <strong>SMD Code Decryption:</strong> 
            For 3-digit codes (e.g., 472), the first two digits (47) are significant and the third (2) is the power of 10 multiplier (47 × 10² = 4,700 Ω = 4.7 kΩ). 
            For EIA-96, look up the 2-digit code in the standardized IEC table to find the base significant value and multiply by the multiplier associated with the letter.
          </li>
          <li>
            <strong>Resistor Networks (Series/Parallel):</strong>
            Sum the nominal branch values. Calculate the maximum and minimum tolerances vectorially (summing absolute bounds for series, and reciprocating branch bounds for parallel runs) to output realistic worst-case tolerances.
          </li>
          <li>
            <strong>Conductor Sizing:</strong>
            Normalize input values (length to meters, area to m²). Multiply length by the material resistivity at 20°C and divide by area. Apply temperature scaling based on the material&apos;s thermal constant (α) to compute resistance at the target operating temperature.
          </li>
        </ol>
      </section>

      {/* SECTION 5: WORKED EXAMPLES */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>5.</span> Worked Engineering Examples
        </h3>
        <div className="space-y-4">
          {/* Example 1 */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/20 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <h4 className="font-bold text-zinc-950 dark:text-zinc-50 text-xs flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              Example A: Decoding a 5-Band Color Resistor
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              Decode the following bands in order: Orange, Blue, Black, Red, Brown.
            </p>
            <div className="mt-2 text-xs font-mono bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border dark:border-zinc-800 space-y-1.5">
              <div><strong>1. Identify digits from first three bands:</strong></div>
              <div>Band 1 (Orange) = 3</div>
              <div>Band 2 (Blue) = 6</div>
              <div>Band 3 (Black) = 0</div>
              <div>Digits combined = 360</div>
              <div><strong>2. Identify Multiplier from 4th band:</strong></div>
              <div>Band 4 (Red) = ×100 (10²)</div>
              <div><strong>3. Calculate Nominal Value:</strong></div>
              <div>R_nominal = 360 × 100 = 36,000 Ω (36 kΩ)</div>
              <div><strong>4. Determine Tolerance bounds from 5th band:</strong></div>
              <div>Band 5 (Brown) = ±1%</div>
              <div>R_min = 36,000 × 0.99 = 35,640 Ω (35.64 kΩ)</div>
              <div>R_max = 36,000 × 1.01 = 36,360 Ω (36.36 kΩ)</div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/20 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <h4 className="font-bold text-zinc-950 dark:text-zinc-50 text-xs flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-600" />
              Example B: Parallel Network Equivalent Resistance & Power
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              Find the total equivalent resistance of three resistors connected in parallel: R1 = 100 Ω (±5%), R2 = 220 Ω (±5%), R3 = 470 Ω (±5%) with a supply voltage of 12V.
            </p>
            <div className="mt-2 text-xs font-mono bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border dark:border-zinc-800 space-y-1.5">
              <div><strong>1. Formula for parallel equivalent resistance:</strong></div>
              <div>1/R_total = 1/100 + 1/220 + 1/470 = 0.01 + 0.004545 + 0.002128 = 0.016673 S</div>
              <div>R_total = 1 / 0.016673 = 59.98 Ω</div>
              <div><strong>2. Calculate worst-case tolerance limits (using minimum branch resistances):</strong></div>
              <div>1/R_min_equiv = 1/95 + 1/209 + 1/446.5 = 0.010526 + 0.004785 + 0.002240 = 0.017551 S</div>
              <div>R_min = 1 / 0.017551 = 56.98 Ω</div>
              <div>R_max = 1 / (1/105 + 1/231 + 1/493.5) = 62.98 Ω</div>
              <div><strong>3. Perform circuit load calculations at 12V:</strong></div>
              <div>Total Current = 12 V / 59.98 Ω = 0.20 A (200 mA)</div>
              <div>Total Power Dissipation = 12V × 0.20A = 2.4 W</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: COLOR CODE CHART */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>6.</span> Standard Resistor Color Code Reference
        </h3>
        <p>
          This table displays the internationally recognized color value mappings defined in IEC 60062:
        </p>
        <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-700">
                <th className="p-2 border-r border-zinc-200 dark:border-zinc-700">Color</th>
                <th className="p-2 border-r border-zinc-200 dark:border-zinc-700">Significant Digit</th>
                <th className="p-2 border-r border-zinc-200 dark:border-zinc-700">Multiplier</th>
                <th className="p-2 border-r border-zinc-200 dark:border-zinc-700">Tolerance</th>
                <th className="p-2">Temperature Coefficient (ppm/K)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="p-2 border-r font-semibold">Black</td>
                <td className="p-2 border-r">0</td>
                <td className="p-2 border-r">×1</td>
                <td className="p-2 border-r">-</td>
                <td className="p-2">250</td>
              </tr>
              <tr>
                <td className="p-2 border-r font-semibold text-amber-800">Brown</td>
                <td className="p-2 border-r">1</td>
                <td className="p-2 border-r">×10</td>
                <td className="p-2 border-r">±1% (F)</td>
                <td className="p-2">100</td>
              </tr>
              <tr>
                <td className="p-2 border-r font-semibold text-red-600">Red</td>
                <td className="p-2 border-r">2</td>
                <td className="p-2 border-r">×100</td>
                <td className="p-2 border-r">±2% (G)</td>
                <td className="p-2">50</td>
              </tr>
              <tr>
                <td className="p-2 border-r font-semibold text-orange-500">Orange</td>
                <td className="p-2 border-r">3</td>
                <td className="p-2 border-r">×1k</td>
                <td className="p-2 border-r">±0.05% (W)</td>
                <td className="p-2">15</td>
              </tr>
              <tr>
                <td className="p-2 border-r font-semibold text-yellow-500">Yellow</td>
                <td className="p-2 border-r">4</td>
                <td className="p-2 border-r">×10k</td>
                <td className="p-2 border-r">±0.02% (P)</td>
                <td className="p-2">25</td>
              </tr>
              <tr>
                <td className="p-2 border-r font-semibold text-emerald-600">Green</td>
                <td className="p-2 border-r">5</td>
                <td className="p-2 border-r">×100k</td>
                <td className="p-2 border-r">±0.5% (D)</td>
                <td className="p-2">20</td>
              </tr>
              <tr>
                <td className="p-2 border-r font-semibold text-blue-600">Blue</td>
                <td className="p-2 border-r">6</td>
                <td className="p-2 border-r">×1M</td>
                <td className="p-2 border-r">±0.25% (C)</td>
                <td className="p-2">10</td>
              </tr>
              <tr>
                <td className="p-2 border-r font-semibold text-violet-600">Violet</td>
                <td className="p-2 border-r">7</td>
                <td className="p-2 border-r">×10M</td>
                <td className="p-2 border-r">±0.1% (B)</td>
                <td className="p-2">5</td>
              </tr>
              <tr>
                <td className="p-2 border-r font-semibold text-zinc-500">Gray</td>
                <td className="p-2 border-r">8</td>
                <td className="p-2 border-r">×100M</td>
                <td className="p-2 border-r">±0.01% (L)</td>
                <td className="p-2">1</td>
              </tr>
              <tr>
                <td className="p-2 border-r font-semibold text-yellow-600">Gold</td>
                <td className="p-2 border-r">-</td>
                <td className="p-2 border-r">×0.1</td>
                <td className="p-2 border-r">±5% (J)</td>
                <td className="p-2">-</td>
              </tr>
              <tr>
                <td className="p-2 border-r font-semibold text-zinc-400">Silver</td>
                <td className="p-2 border-r">-</td>
                <td className="p-2 border-r">×0.01</td>
                <td className="p-2 border-r">±10% (K)</td>
                <td className="p-2">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 7: COMMON MISTAKES */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>7.</span> Common Electronics Engineering Mistakes
        </h3>
        <div className="p-4 border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl space-y-2">
          <p className="flex items-center gap-1 text-amber-800 dark:text-amber-400 font-bold text-xs">
            <AlertTriangle className="w-4 h-4" /> Keep the following pitfalls in mind when implementing layouts:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li>
              <strong>Reading Color Bands Backwards:</strong> Resistor bands should be read from left to right. The first band is typically located closest to one of the physical metal terminals. High-precision resistors also group the digit bands tightly together, leaving a noticeable space before the tolerance and TCR bands.
            </li>
            <li>
              <strong>Confusing Gold/Silver as Multipliers vs. Tolerances:</strong> Gold can serve as a multiplier (×0.1) or as a tolerance (±5%). Silver can similarly represent a multiplier (×0.01) or a tolerance (±10%). Look at the band position: if they are the 3rd or 4th band, they act as multipliers; if they are the final band, they are tolerances.
            </li>
            <li>
              <strong>Confusing Milli-Ohms (mΩ) with Mega-Ohms (MΩ):</strong> A lowercase &quot;m&quot; denotes $10^{-3}$ Ω, while an uppercase &quot;M&quot; represents $10^6$ Ω. A notation error of this magnitude (nine orders of magnitude) can ruin circuit bias configurations.
            </li>
            <li>
              <strong>Ignoring Temperature Adjustments:</strong> Wire resistivity rises as temperature increases. For circuits operating in high-heat environments (e.g., motor housings, power supplies), you must size resistors to tolerate the resistance shift.
            </li>
            <li>
              <strong>Overloading Power Capacity:</strong> A resistor might have the correct value (e.g., 100 Ω), but if it dissipates 1 Watt in a circuit and you install a standard 0.25 W resistor, it will overheat and burn out. Always include a safety margin (e.g. 50% derating) when selecting components.
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 8: PRACTICAL APPLICATIONS */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>8.</span> Practical Applications
        </h3>
        <p>
          Resistor engineering governs standard circuit layouts:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Voltage Dividers:</strong> Two resistors connected in series are used to scale down input voltages to a lower, readable range (e.g., feeding a 5V sensor signal into a 3.3V microcontroller ADC).
          </li>
          <li>
            <strong>Current Limiting for LEDs:</strong> LEDs are current-driven devices. Connecting a resistor in series limits the current to prevent the LED from drawing excessive current and burning out.
          </li>
          <li>
            <strong>Pull-up and Pull-down Configurations:</strong> Microcontroller input pins float in an undefined state unless connected to a reference voltage. High-value resistors (e.g., 10 kΩ) pull the pins high or low to prevent noise and ensure reliable state transitions.
          </li>
        </ul>
      </section>

      {/* SECTION 9: RELATED CONCEPTS */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>9.</span> Related Mathematical & Electrical Concepts
        </h3>
        <p>
          To expand your electrical knowledge, look into these foundational concepts:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Kirchhoff&apos;s Laws (KVL/KCL):</strong> Mathematical laws governing conservation of charge and energy in circuits.</li>
          <li><strong>Joule Heating (P = I²R):</strong> The physical transformation of electrical energy into thermal energy.</li>
          <li><strong>Ohm&apos;s Law (V = IR):</strong> The fundamental equation establishing the relationship between electrical parameters.</li>
        </ul>
      </section>

      {/* SECTION 10: SUMMARY */}
      <section className="space-y-3 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4" /> Educational Summary
        </h3>
        <p className="text-xs mt-1">
          Resistors are indispensable tools for managing currents and voltages. Safely utilizing them requires looking up their color code values correctly, calculating combined network equivalents, accounting for temperature drifts, and verifying power dissipation limits. This calculator suite automates these math computations to ensure electrical layouts are calculated accurately.
        </p>
      </section>
    </article>
  );
}

export default ResistorContent;

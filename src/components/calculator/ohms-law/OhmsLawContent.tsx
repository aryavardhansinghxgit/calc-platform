"use client";

import React from "react";
import { BookOpen, AlertTriangle, Cpu, CheckCircle } from "lucide-react";

export function OhmsLawContent() {
  return (
    <article className="prose dark:prose-invert max-w-none space-y-8 text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed mt-10 border-t border-zinc-200 dark:border-zinc-800 pt-8">
      <header>
        <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          The Engineering Guide to Ohm&apos;s Law, Electrical Power, and Divider Networks
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs">
          An authoritative reference on circuit equations, Joule heating limits, and practical electrical design.
        </p>
      </header>

      {/* SECTION 1: INTRODUCTION */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>1.</span> Introduction
        </h3>
        <p>
          An **Ohm&apos;s Law Calculator** is an essential tool in electronics and electrical engineering, used to model the relationships between voltage, current, resistance, and electrical power. Discovered by German physicist Georg Ohm in 1827, Ohm&apos;s Law establishes that the current flowing through a conductor between two points is directly proportional to the voltage across those points, and inversely proportional to the resistance of the path.
        </p>
        <p>
          This calculator suite is designed for engineers, technicians, electronics hobbyists, and students. By automating the calculations, users can quickly solve for unknown variables, check circuit consistency, configure voltage and current dividers, and size current-limiting resistors for LEDs, ensuring that physical designs operate safely and reliably.
        </p>
      </section>

      {/* SECTION 2: MATHEMATICAL CONCEPT */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>2.</span> The Mathematical and Physical Foundations of Ohm&apos;s Law
        </h3>
        <p>
          To understand circuit properties, we analyze the four core electrical variables:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Voltage (V):</strong> The difference in electric potential between two points, measured in Volts (V). It acts as the electromotive force driving charge carriers through the conductor.
          </li>
          <li>
            <strong>Current (I):</strong> The rate of flow of electric charge past a point in a circuit, measured in Amperes (A). One Ampere corresponds to one Coulomb of charge moving per second.
          </li>
          <li>
            <strong>Resistance (R):</strong> The opposition that a substance offers to the flow of electric current, measured in Ohms (Ω). It is determined by the material&apos;s physical dimensions and molecular structure.
          </li>
          <li>
            <strong>Power (P):</strong> The rate at which electrical energy is converted to another form (like heat or light), measured in Watts (W). In simple terms, it represents the rate of electrical work done.
          </li>
        </ul>
      </section>

      {/* SECTION 3: FORMULA SECTION */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>3.</span> The Equations
        </h3>
        <p>
          Ohm&apos;s Law and Joule&apos;s Law of heating can be combined into a standard 12-formula matrix, often represented visually as the Ohm&apos;s Law Wheel:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">Voltage (V)</h4>
            <ul className="list-disc pl-4 text-xs font-mono space-y-1">
              <li>V = I × R</li>
              <li>V = P / I</li>
              <li>V = √(P × R)</li>
            </ul>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">Current (I)</h4>
            <ul className="list-disc pl-4 text-xs font-mono space-y-1">
              <li>I = V / R</li>
              <li>I = P / V</li>
              <li>I = √(P / R)</li>
            </ul>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">Resistance (R)</h4>
            <ul className="list-disc pl-4 text-xs font-mono space-y-1">
              <li>R = V / I</li>
              <li>R = V² / P</li>
              <li>R = P / I²</li>
            </ul>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">Power (P)</h4>
            <ul className="list-disc pl-4 text-xs font-mono space-y-1">
              <li>P = V × I</li>
              <li>P = V² / R</li>
              <li>P = I² × R</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW CALCULATION WORKS */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>4.</span> Step-by-Step Sizing Processes
        </h3>
        <p>
          To calculate unknown values, follow this sequential engineering workflow:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Normalize Units:</strong> Convert all input values to base SI units (Voltage to Volts, Current to Amps, Resistance to Ohms, Power to Watts). For example, convert 20 mA to 0.020 A.
          </li>
          <li>
            <strong>Select Mapped Equations:</strong> Identify the two known parameters and select the appropriate formula from the wheel. For instance, if you know resistance and power, calculate voltage as √(P × R).
          </li>
          <li>
            <strong>Verify Consistency:</strong> If the user enters three or four values, calculate the expected variables using any two inputs, then compare them against the other entered values. If they differ by more than 1%, flag a warning to the user.
          </li>
          <li>
            <strong>Check Dissipation Margin:</strong> Compare the calculated power with the resistor&apos;s physical wattage rating. Ensure a safety factor margin (typically 1.5x to 2x) is maintained for reliable design.
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
              Example A: Given Voltage and Resistance
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              Calculate current and power for a 12V automotive circuit connected to a 6 Ω load.
            </p>
            <div className="mt-2 text-xs font-mono bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border dark:border-zinc-800 space-y-1.5">
              <div><strong>1. Identify inputs:</strong> V = 12 V, R = 6 Ω</div>
              <div><strong>2. Calculate Current:</strong></div>
              <div>I = V / R = 12 / 6 = 2 A</div>
              <div><strong>3. Calculate Power Dissipation:</strong></div>
              <div>P = V × I = 12 × 2 = 24 W (or P = V² / R = 12² / 6 = 144 / 6 = 24 W)</div>
              <div><strong>Interpretation:</strong> The circuit draws 2 Amps of current and dissipates 24 Watts of electrical power as heat.</div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/20 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <h4 className="font-bold text-zinc-950 dark:text-zinc-50 text-xs flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-600" />
              Example B: LED Limiting Resistor
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              Find the series resistor needed to power a standard Red LED (forward voltage Vf = 2.0V, recommended forward current If = 20 mA) from a 9V battery source.
            </p>
            <div className="mt-2 text-xs font-mono bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border dark:border-zinc-800 space-y-1.5">
              <div><strong>1. Identify parameters and normalize units:</strong></div>
              <div>V_source = 9 V</div>
              <div>V_forward = 2.0 V</div>
              <div>I_forward = 20 mA = 0.020 A</div>
              <div><strong>2. Calculate required resistor voltage drop:</strong></div>
              <div>V_resistor = V_source - V_forward = 9 - 2.0 = 7.0 V</div>
              <div><strong>3. Calculate Resistance:</strong></div>
              <div>R = V_resistor / I_forward = 7.0 / 0.020 = 350 Ω (closest higher E24 standard value = 360 Ω)</div>
              <div><strong>4. Calculate Power rating needed:</strong></div>
              <div>P = I_forward² × R = 0.020² × 350 = 0.0004 × 350 = 0.14 W</div>
              <div><strong>Recommendation:</strong> Use a 360 Ω resistor rated for at least 1/4 W (0.25 W) to allow a safe margin.</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: COMMON MISTAKES */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>6.</span> Common Engineering Mistakes & Pitfalls
        </h3>
        <div className="p-4 border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl space-y-2">
          <p className="flex items-center gap-1 text-amber-800 dark:text-amber-400 font-bold text-xs">
            <AlertTriangle className="w-4 h-4" /> Watch out for these critical errors during layout configuration:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li>
              <strong>Ignoring Prefix Units (e.g. mA vs A):</strong> Microcontrollers and sensors operate in milli-Amps (mA) or micro-Amps (μA). Multiplying volts directly by mA values without normalizing (e.g., writing 12V × 20mA = 240W instead of 0.24W) results in catastrophic decimal scaling errors.
            </li>
            <li>
              <strong>Applying Simple Resistor Equations to AC Networks:</strong> Ohm&apos;s Law (V = IR) works perfectly in DC and purely resistive AC circuits (like heaters or incandescent bulbs). However, AC circuits containing capacitors or inductors introduce frequency-dependent reactance. In these networks, you must use impedance (Z) instead of resistance: V = I × Z.
            </li>
            <li>
              <strong>Ignoring Resistor Self-Heating (Joule Heating):</strong> A resistor limits current, but it also generates heat. Designers often size the resistance value correctly but select a physical wattage rating that is too small. Always derate resistors by at least 50% to ensure long-term stability in enclosed spaces.
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 7: PRACTICAL APPLICATIONS */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>7.</span> Practical Engineering Applications
        </h3>
        <p>
          Ohm&apos;s Law equations govern everyday layout designs:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Microcontroller Sensor Interfaces:</strong> Voltage dividers scale down sensor outputs to match the input logic thresholds of processors (e.g., reducing a 12V sensor signal to 3.3V).
          </li>
          <li>
            <strong>Circuit Current Measurements:</strong> Placing a small, high-precision shunt resistor in series with a load allows engineers to calculate current by measuring the tiny voltage drop across it.
          </li>
          <li>
            <strong>Power Grid Transmission:</strong> Power transmission lines cover long distances. Sizing lines at extremely high voltage reduces the current required to deliver a given power load, minimizing heating losses ($I^2R$) in the cables.
          </li>
        </ul>
      </section>

      {/* SECTION 8: ENGINEERING DISCLAIMER */}
      <section className="space-y-3 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4" /> Technical Disclaimer
        </h3>
        <p className="text-xs mt-1">
          While Ohm&apos;s Law is incredibly useful, it assumes linear, ohmic behavior. Nonlinear components (such as diodes, LEDs, and transistors) have dynamic resistances that shift with voltage. Additionally, AC inductive and capacitive reactance must be solved using impedance-based vectors. Always consult component specification sheets when modeling physical circuits.
        </p>
      </section>
    </article>
  );
}

export default OhmsLawContent;

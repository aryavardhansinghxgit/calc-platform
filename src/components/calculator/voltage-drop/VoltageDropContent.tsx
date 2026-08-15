"use client";

import React from "react";
import { BookOpen, HelpCircle, AlertTriangle, Cpu, CheckCircle } from "lucide-react";

export function VoltageDropContent() {
  return (
    <article className="prose dark:prose-invert max-w-none space-y-8 text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed mt-10 border-t border-zinc-200 dark:border-zinc-800 pt-8">
      <header>
        <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          Comprehensive Electrical Guide: Conductor Impedance & Voltage Drop
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs">
          An authoritative reference on mathematical formulations, physical wire properties, and National Electrical Code (NEC) guidelines.
        </p>
      </header>

      {/* SECTION 1: INTRODUCTION */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>1.</span> Introduction
        </h3>
        <p>
          A <strong>voltage drop calculator</strong> is an essential engineering tool used to quantify the reduction in electric potential that occurs as current travels through a circuit conductor. When current flows through any material, it encounters electrical resistance (and reactance in AC circuits). This impedance acts as a restrictor, consuming a fraction of the electromotive force and converting it to heat.
        </p>
        <p>
          This calculator is utilized by electrical engineers, industrial contractors, residential electricians, and solar installers to ensure that electrical systems operate safely and efficiently. By projecting voltage drop, designers can guarantee that appliances, machinery, and lighting receive sufficient voltage to operate within their designated specifications, preventing equipment failure, motor overheating, and premature component degradation.
        </p>
      </section>

      {/* SECTION 2: MATHEMATICAL CONCEPT */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>2.</span> Underlying Mathematical & Physical Principles
        </h3>
        <p>
          To understand voltage drop, we must analyze the physical characteristics of electrical conductors:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Resistance ($R$):</strong> The opposition that a substance offers to the flow of electric current. Resistance increases with the length of the conductor and decreases as the cross-sectional area increases. Copper offers lower resistance than aluminum due to its higher density of free electrons.
          </li>
          <li>
            <strong>Inductive Reactance ($X_L$):</strong> In Alternating Current (AC) systems, the changing magnetic fields around conductors introduce inductive reactance. Reactance depends on the physical spacing between phase conductors and the magnetic properties of the surrounding conduit (e.g., steel conduit introduces magnetic coupling, increasing reactance).
          </li>
          <li>
            <strong>Skin Effect & Proximity Effect:</strong> In AC systems, alternating current tends to crowd toward the outer surface of a conductor (skin effect) and is influenced by currents in neighboring wires (proximity effect). This increases the effective AC resistance compared to the DC resistance, particularly in larger wire sizes (1/0 AWG and above).
          </li>
          <li>
            <strong>Power Factor ($PF$ or $\cos\theta$):</strong> Represents the phase angle offset between voltage and current waveforms in AC systems. When inductive loads (like motors or transformers) are present, the power factor drops below 1.0, requiring reactance and resistance to be combined vectorially into an effective impedance ($Z$).
          </li>
        </ul>
      </section>

      {/* SECTION 3: FORMULA SECTION */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>3.</span> The Mathematical Formulas
        </h3>
        <p>
          The calculation of voltage drop depends on whether the system is Direct Current (DC), Single-Phase AC, or Three-Phase AC.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">Direct Current (DC)</h4>
            <div className="font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400 font-bold">
              {"V_d = (2 × I × L × R) / 1000"}
            </div>
            <p className="text-[11px] text-zinc-500">For 2-wire circuits where loop distance is double the one-way run (2 × L).</p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">Single-Phase AC</h4>
            <div className="font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400 font-bold">
              {"V_d = (2 × I × L × Z_eff) / 1000"}
            </div>
            <p className="text-[11px] text-zinc-500">Combines AC resistance and inductive reactance: Z_eff = R × cos(θ) + X × sin(θ).</p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">Three-Phase AC</h4>
            <div className="font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400 font-bold">
              {"V_d = (√3 × I × L × Z_eff) / 1000"}
            </div>
            <p className="text-[11px] text-zinc-500">Calculates line-to-line voltage drop utilizing a factor of √3 ≈ 1.732.</p>
          </div>
        </div>

        <h4 className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm mt-3">Variable Definitions:</h4>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>V_drop:</strong> Voltage drop (in Volts).</li>
          <li><strong>I:</strong> Load current (in Amperes).</li>
          <li><strong>L:</strong> One-way circuit distance (in feet).</li>
          <li><strong>R:</strong> Conductor AC resistance (in Ω per 1000 ft).</li>
          <li><strong>X:</strong> Conductor inductive reactance (in Ω per 1000 ft).</li>
          <li><strong>cos(θ) (PF):</strong> Conductor load power factor.</li>
          <li><strong>sin(θ):</strong> Reactive component (√(1 - PF²)).</li>
          <li><strong>N:</strong> Number of parallel conductors per phase (impedance is divided by N).</li>
        </ul>
      </section>

      {/* SECTION 4: HOW CALCULATION WORKS */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>4.</span> Step-by-Step Calculation Process
        </h3>
        <p>
          To calculate voltage drop programmatically or manually, follow this sequential engineering workflow:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Identify Circuit Parameters:</strong> Determine the supply voltage (V_supply), current (I), and length (L). If length is in meters, convert it to feet (L_feet = L_meters / 0.3048).
          </li>
          <li>
            <strong>Determine Conductor Properties:</strong> Select your conductor material (Copper/Aluminum) and wire size (AWG/Metric). Look up the AC resistance (R) and reactance (X) in NEC Chapter 9 Table 9 based on the conduit type (Steel vs. PVC).
          </li>
          <li>
            <strong>Account for Parallel Conductors:</strong> If you are running multiple cables in parallel per phase, divide the resistance and reactance by the number of parallel runs (N): R_eff = R / N and X_eff = X / N.
          </li>
          <li>
            <strong>Calculate Effective Impedance (Z_eff):</strong>
            <br />
            For AC: Z_eff = R_eff × PF + X_eff × √(1 - PF²)
            <br />
            For DC: Z_eff = R_eff (reactance is zero and power factor is 1.0).
          </li>
          <li>
            <strong>Compute Voltage Drop (V_drop):</strong> Multiply the current, length, and impedance, then apply the phase factor (2 for single-phase/DC, √3 for three-phase):
            <br />
            V_drop = (PhaseFactor × I × L × Z_eff) / 1000
          </li>
          <li>
            <strong>Determine Percentage Drop:</strong>
            <br />
            Voltage Drop % = (V_drop / V_supply) × 100
          </li>
        </ol>
      </section>

      {/* SECTION 5: WORKED EXAMPLES */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>5.</span> Realistic Worked Engineering Examples
        </h3>
        <div className="space-y-4">
          {/* Example 1 */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/20 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <h4 className="font-bold text-zinc-950 dark:text-zinc-50 text-xs flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              Example A: Residential Subpanel Run (Single-Phase AC)
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              Calculate the voltage drop of a 240V, 100A, single-phase circuit running through PVC conduit for a one-way distance of 150 feet. Conductor size is 1 AWG copper with a power factor of 0.90.
            </p>
            <div className="mt-2 text-xs font-sans tabular-nums bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border dark:border-zinc-800 space-y-1.5">
              <div><strong>1. Look up 1 AWG copper in PVC conduit (Table 9):</strong></div>
              <div>AC Resistance (R) = 0.15 Ω/1000 ft</div>
              <div>Reactance (X) = 0.046 Ω/1000 ft</div>
              <div><strong>2. Calculate Effective Impedance (Z):</strong></div>
              <div>sinθ = √(1 - 0.90²) = 0.4359</div>
              <div>Z_eff = (0.15 × 0.90) + (0.046 × 0.4359) = 0.135 + 0.0201 = 0.1551 Ω/1000 ft</div>
              <div><strong>3. Compute Voltage Drop:</strong></div>
              <div>Vd = (2 × I × L × Z_eff) / 1000</div>
              <div>Vd = (2 × 100 A × 150 ft × 0.1551 Ω) / 1000 = 4.65 V</div>
              <div><strong>4. Percentage:</strong></div>
              <div>Vd% = (4.65 V / 240 V) × 100 = 1.94%</div>
              <div><strong>Result:</strong> Voltage at subpanel = 235.35 V (Acceptable drop &lt; 3%).</div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/20 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <h4 className="font-bold text-zinc-950 dark:text-zinc-50 text-xs flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-600" />
              Example B: Industrial Motor Feed (Three-Phase AC)
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              Calculate the line-to-line voltage drop for a 480V, three-phase, 120A induction motor running through steel conduit for a one-way distance of 400 feet. Conductor size is 3/0 AWG copper with a power factor of 0.85.
            </p>
            <div className="mt-2 text-xs font-sans tabular-nums bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border dark:border-zinc-800 space-y-1.5">
              <div><strong>1. Look up 3/0 AWG copper in Steel conduit (Table 9):</strong></div>
              <div>AC Resistance (R) = 0.079 Ω/1000 ft</div>
              <div>Reactance (X) = 0.052 Ω/1000 ft</div>
              <div><strong>2. Calculate Effective Impedance (Z):</strong></div>
              <div>sinθ = √(1 - 0.85²) = 0.5268</div>
              <div>Z_eff = (0.079 × 0.85) + (0.052 × 0.5268) = 0.06715 + 0.02739 = 0.09454 Ω/1000 ft</div>
              <div><strong>3. Compute Voltage Drop:</strong></div>
              <div>Vd = (√3 × I × L × Z_eff) / 1000</div>
              <div>Vd = (1.732 × 120 A × 400 ft × 0.09454 Ω) / 1000 = 7.86 V</div>
              <div><strong>4. Percentage:</strong></div>
              <div>Vd% = (7.86 V / 480 V) × 100 = 1.64%</div>
              <div><strong>Result:</strong> Voltage at motor terminal = 472.14 V (Excellent, within NEC guidelines).</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: VISUAL UNDERSTANDING TABLES */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>6.</span> AWG Conductor Physical & Electrical Reference
        </h3>
        <p>
          This table outlines typical physical properties and resistance characteristics at 75°C (167°F) for copper conductors:
        </p>
        <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-700">
                <th className="p-2 border-r border-zinc-200 dark:border-zinc-700">Size (AWG)</th>
                <th className="p-2 border-r border-zinc-200 dark:border-zinc-700">Diameter (in)</th>
                <th className="p-2 border-r border-zinc-200 dark:border-zinc-700">Area (kcmil)</th>
                <th className="p-2 border-r border-zinc-200 dark:border-zinc-700">DC Resistance (Ω/kft)</th>
                <th className="p-2 border-r border-zinc-200 dark:border-zinc-700">AC Resistance (PVC, Ω/kft)</th>
                <th className="p-2">Reactance (PVC, Ω/kft)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="p-2 border-r font-semibold">14 AWG</td>
                <td className="p-2 border-r">0.0641</td>
                <td className="p-2 border-r">4.11</td>
                <td className="p-2 border-r">3.07</td>
                <td className="p-2 border-r">3.10</td>
                <td className="p-2">0.058</td>
              </tr>
              <tr>
                <td className="p-2 border-r font-semibold">12 AWG</td>
                <td className="p-2 border-r">0.0808</td>
                <td className="p-2 border-r">6.53</td>
                <td className="p-2 border-r">1.93</td>
                <td className="p-2 border-r">2.00</td>
                <td className="p-2">0.054</td>
              </tr>
              <tr>
                <td className="p-2 border-r font-semibold">10 AWG</td>
                <td className="p-2 border-r">0.1019</td>
                <td className="p-2 border-r">10.38</td>
                <td className="p-2 border-r">1.21</td>
                <td className="p-2 border-r">1.20</td>
                <td className="p-2">0.050</td>
              </tr>
              <tr>
                <td className="p-2 border-r font-semibold">8 AWG</td>
                <td className="p-2 border-r">0.1285</td>
                <td className="p-2 border-r">16.51</td>
                <td className="p-2 border-r">0.778</td>
                <td className="p-2 border-r">0.78</td>
                <td className="p-2">0.052</td>
              </tr>
              <tr>
                <td className="p-2 border-r font-semibold">6 AWG</td>
                <td className="p-2 border-r">0.1620</td>
                <td className="p-2 border-r">26.24</td>
                <td className="p-2 border-r">0.491</td>
                <td className="p-2 border-r">0.49</td>
                <td className="p-2">0.051</td>
              </tr>
              <tr>
                <td className="p-2 border-r font-semibold">2 AWG</td>
                <td className="p-2 border-r">0.2576</td>
                <td className="p-2 border-r">66.36</td>
                <td className="p-2 border-r">0.194</td>
                <td className="p-2 border-r">0.19</td>
                <td className="p-2">0.045</td>
              </tr>
              <tr>
                <td className="p-2 border-r font-semibold">1/0 AWG</td>
                <td className="p-2 border-r">0.3249</td>
                <td className="p-2 border-r">105.6</td>
                <td className="p-2 border-r">0.122</td>
                <td className="p-2 border-r">0.12</td>
                <td className="p-2">0.044</td>
              </tr>
              <tr>
                <td className="p-2 border-r font-semibold">4/0 AWG</td>
                <td className="p-2 border-r">0.4600</td>
                <td className="p-2 border-r">211.6</td>
                <td className="p-2 border-r">0.0608</td>
                <td className="p-2 border-r">0.062</td>
                <td className="p-2">0.041</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 7: COMMON MISTAKES */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>7.</span> Common Engineering Mistakes & Pitfalls
        </h3>
        <div className="p-4 border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl space-y-2">
          <p className="flex items-center gap-1 text-amber-800 dark:text-amber-400 font-bold text-xs">
            <AlertTriangle className="w-4 h-4" /> Avoid these critical assumptions:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li>
              <strong>Applying DC Formulas to AC Systems:</strong> AC current flows in shifting directions, creating reactance ($X$). Simply using DC resistance values from Table 8 for larger conductors installed in metal conduit will significantly underestimate the true voltage drop.
            </li>
            <li>
              <strong>Confusing Voltage Drop with Conductor Ampacity:</strong> Ampacity is the maximum current a wire can carry safely without melting its insulation. A wire may be rated for 15 Amps (e.g., 14 AWG), but over a 200-foot run, the voltage drop will be excessive (~7%). Both ampacity AND voltage drop criteria must be satisfied independently.
            </li>
            <li>
              <strong>Ignoring Conduit Material Properties:</strong> Enclosing cables in magnetic iron or steel conduit increases magnetic coupling and inductive reactance. When calculating AC drop, verify if conductors run through PVC or steel to select the proper reactance values.
            </li>
            <li>
              <strong>Treating Loop Length Inaccurately:</strong> For single-phase or DC, current travels out and back, requiring the one-way distance to be doubled ($2 \times L$). For three-phase systems, the phase currents sum vectorially, requiring a factor of $\sqrt{3} \approx 1.732$. Don&apos;t apply the incorrect factor.
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 8: PRACTICAL APPLICATIONS */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>8.</span> Practical Engineering Applications
        </h3>
        <p>
          Voltage drop calculations govern design specifications across multiple fields:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Industrial Plant Motors:</strong> Inductive motors require high starting torque. If voltage drop is too high at startup, the motor may stall or draw excessive current, tripping protective overcurrent relays.
          </li>
          <li>
            <strong>Solar Photovoltaic (PV) Arrays:</strong> Solar runs from panels on a roof to an inverter in a basement can cover long distances. Solar designers restrict voltage drop to under 1% to 2% to maximize energy yield and prevent inverter shutdowns due to overvoltage warnings.
          </li>
          <li>
            <strong>EV Charging Stations:</strong> High-power EV chargers (32A to 48A) run continuously for hours. Excessive voltage drop results in massive energy losses converted to heat inside the conduits, representing unsafe setups and higher energy costs.
          </li>
        </ul>
      </section>

      {/* SECTION 9: RELATED TOPICS */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>9.</span> Related Mathematical & Electrical Concepts
        </h3>
        <p>
          To expand your understanding, explore these related topics:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Ohm&apos;s Law ($V = I \cdot R$):</strong> The foundational equation for circuit analysis.</li>
          <li><strong>Joule Heating ($P = I^2 \cdot R$):</strong> The rate at which electrical energy is dissipated as heat in conductors.</li>
          <li><strong>Conductor Ampacity:</strong> Safe load current thresholds defined by NEC Table 310.16.</li>
          <li><strong>Power Factor Correction:</strong> Using capacitors to align voltage and current waveforms, reducing reactive drop.</li>
        </ul>
      </section>

      {/* SECTION 10: SUMMARY */}
      <section className="space-y-3 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4" /> Educational Summary
        </h3>
        <p className="text-xs mt-1">
          Voltage drop is a physical reality in all electrical wiring systems. Minimizing it requires choosing the correct conductor material, increasing the wire size (AWG or metric cross-section), or keeping distance runs short. Proper calculations combining AC resistance and inductive reactance keep electrical systems compliant, safe, and operating at peak energy efficiency.
        </p>
      </section>
    </article>
  );
}

export default VoltageDropContent;

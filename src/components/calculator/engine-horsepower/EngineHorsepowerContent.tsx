"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, CheckCircle2, ExternalLink } from "lucide-react";

export function EngineHorsepowerContent() {
  // All 12 FAQs open by default as required
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 12 }, (_, i) => i))
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
    <article className="mt-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. MAIN EDUCATIONAL CONTENT (SECTIONS 1 TO 30) */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Intro */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Engine Horsepower Calculator: Torque, RPM, 1/4-Mile, Trap Speed, 0–60 and Boost
          </h2>
          <p>
            Horsepower is one of the most widely used numbers in automotive performance, but a horsepower figure only becomes meaningful when you understand how it was calculated, where it was measured, and what assumptions were used.
          </p>
          <p>
            An engine can have one power figure at the crankshaft, another at the wheels, and a different standardized value after an atmospheric correction. Likewise, horsepower estimated from quarter-mile performance is not the same thing as horsepower measured directly on an engine dynamometer.
          </p>
          <p>
            The <strong>Engine Horsepower Calculator</strong> brings these calculations together in one place. You can estimate crankshaft horsepower from torque and RPM, estimate power from quarter-mile elapsed time or trap speed, estimate the power associated with a 0–60 mph target, and estimate output from engine displacement, boost pressure and volumetric efficiency. The calculator also converts horsepower between common power units and estimates wheel horsepower using a selected drivetrain-loss assumption.
          </p>
          <p>
            This makes the tool useful for performance enthusiasts, automotive students, mechanics, engine builders and anyone who wants to understand how torque, engine speed, vehicle weight and drivetrain efficiency interact.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is Engine Horsepower?
          </h2>
          <p>
            Horsepower is a unit of power. In engineering terms, power describes the rate at which work is performed or energy is transferred.
          </p>
          <p>
            Mechanical horsepower is defined as:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"1 HP = 550 ft·lbf/s"}
          </div>
          <p>
            or:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"1 HP = 33,000 ft·lbf/min"}
          </div>
          <p>
            which corresponds to approximately:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"745.7 W"}
          </div>
          <p>
            The National Institute of Standards and Technology lists mechanical horsepower as 550 ft·lbf/s, equivalent to approximately 745.6999 W, while also distinguishing metric, electrical and boiler horsepower definitions.
          </p>
          <p>
            For automotive applications, horsepower is commonly used to describe the rate at which the engine can deliver mechanical work through the crankshaft.
          </p>
          <p>
            The key idea is simple: <strong>Torque tells you how much rotational force is being produced; horsepower tells you how quickly that rotational work is being performed.</strong>
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            2. Horsepower vs. Torque
          </h2>
          <p>
            Torque and horsepower are related mathematically. For torque measured in pound-feet:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"HP = (Torque × RPM) / 5252.113"}
          </div>
          <p>
            where <em>T</em> = torque in lb-ft, <em>RPM</em> = engine speed, and <em>HP</em> = mechanical horsepower.
          </p>
          <p>
            This means the same torque produces more horsepower at a higher engine speed. For example, 400 lb-ft at 3,000 RPM produces much less horsepower than 400 lb-ft at 6,000 RPM, because the engine is performing the rotational work twice as frequently.
          </p>
          <p>
            That is why a torque curve and horsepower curve should be interpreted together rather than treating one as a substitute for the other.
          </p>
          <p>
            When tire diameter, gearing and engine RPM need to be considered together, the{" "}
            <Link
              href="/calculators/tire-size-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Tire Size Calculator
            </Link>{" "}
            can help connect engine-speed calculations with road speed.
          </p>
          <p>
            The calculator uses the full precision of the torque/RPM relationship internally and rounds only the displayed result. Its production test confirms the core relationship with a 400 lb-ft at 5,252 RPM reference case.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Why Does Horsepower and Torque Intersect at 5,252 RPM?
          </h2>
          <p>
            The famous 5,252 RPM number comes from the definition of mechanical horsepower. Starting with:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"HP = (Torque × RPM) / 5252.113"}
          </div>
          <p>
            set the numerical values of horsepower and torque equal: <em>HP = Torque</em>. Then:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"RPM = 5252.113"}
          </div>
          <p>
            So when torque is measured in lb-ft and power is measured in mechanical horsepower, the numerical values intersect at approximately <strong>5,252 RPM</strong>.
          </p>
          <p>
            The calculator&apos;s graph explicitly verifies this intersection and displays it dynamically. This does not mean 5,252 RPM is a special operating speed for every engine. It is a mathematical consequence of the units used in the equation.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            4. How the 5,252 Constant Is Derived
          </h2>
          <p>
            The traditional mechanical horsepower convention established by James Watt is 33,000 ft·lbf/min. One complete rotational revolution corresponds to 2π radians:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"Constant = 33,000 / (2π) ≈ 33,000 / 6.2831853 ≈ 5252.113"}
          </div>
          <p>
            This produces the familiar automotive rotational equation:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"HP = (Torque × RPM) / 5252.113"}
          </div>
          <p>
            The calculator independently verifies this derivation and uses it directly in the torque/RPM calculation mode.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            5. How to Calculate Horsepower From Torque and RPM
          </h2>
          <p>
            Suppose an engine produces 400 lb-ft at 5,252 RPM. Then:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"HP = (400 × 5252) / 5252.113 ≈ 399.99 HP ≈ 400 BHP"}
          </div>
          <p>
            The calculator&apos;s golden case confirms:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>400 BHP</strong> Crankshaft output</li>
            <li><strong>344 WHP</strong> at 14% manual drivetrain loss</li>
            <li><strong>298.3 kW</strong> International metric power</li>
            <li><strong>406 PS</strong> DIN / Metric horsepower</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            6. BHP, Crankshaft Horsepower and WHP
          </h2>
          <p>
            Horsepower can be reported from different measurement locations across the vehicle:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Crankshaft or Brake Horsepower (BHP):</strong> Refers to raw engine flywheel output measured using an engine dynamometer or an equivalent brake-based absorber stand.
            </li>
            <li>
              <strong>Wheel Horsepower (WHP):</strong> Refers to actual usable power delivered to the pavement at the driven wheels.
            </li>
          </ul>
          <p>
            Between the crankshaft and the road, mechanical energy must pass through transmission gear meshes, clutches or torque converters, driveshafts, differentials, wheel bearings, axles, and tires. These mechanical components introduce parasitic frictional drag. As a result, wheel horsepower is normally lower than crankshaft horsepower.
          </p>
          <p>
            The calculator explicitly separates crankshaft power from wheel power and applies the selected drivetrain-loss model after determining the engine-level value.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            7. How to Convert BHP to WHP
          </h2>
          <p>
            For the calculator&apos;s percentage-loss model:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"WHP = BHP × (1 - Loss)"}
          </div>
          <p>
            where <em>Loss</em> is the drivetrain loss expressed as a decimal. For example, with 400 BHP and 14% loss (0.14):
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"WHP = 400 × (1 - 0.14) = 400 × 0.86 = 344 WHP"}
          </div>
          <p>
            So: <strong>400 BHP → 344 WHP</strong>. The production golden case verifies this exact relationship.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Drivetrain Loss: FWD, RWD and AWD
          </h2>
          <p>
            The calculator provides configurable drivetrain-loss presets based on automotive industry benchmarks:
          </p>
          <div className="overflow-x-auto my-3">
            <table className="w-full text-xs sm:text-sm text-left border-collapse border border-slate-200 dark:border-zinc-800">
              <thead className="bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white">
                <tr>
                  <th className="p-2.5 border border-slate-200 dark:border-zinc-800 font-bold">Drivetrain Configuration</th>
                  <th className="p-2.5 border border-slate-200 dark:border-zinc-800 font-bold">Calculator Preset Loss</th>
                  <th className="p-2.5 border border-slate-200 dark:border-zinc-800 font-bold">400 BHP Yield</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-zinc-800">
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800">Front-Wheel Drive (FWD) Manual</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">11%</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800 font-mono">356 WHP</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800">Rear-Wheel Drive (RWD) Manual</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">14%</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800 font-mono">344 WHP</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800">Rear-Wheel Drive (RWD) Automatic</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">17.5%</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800 font-mono">330 WHP</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800">All-Wheel Drive (AWD / 4WD)</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">22%</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800 font-mono">312 WHP</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            These are estimation presets, not universal physical constants. Actual drivetrain losses vary with transmission design, hypoid differential tooth contact, lubricant viscosity, operating temperatures, tire rolling resistance, and dyno tie-down tension.
          </p>
          <p>
            For this reason, a statement such as &quot;all AWD cars lose exactly 22%&quot; would be misleading. The calculator instead uses these values as practical modeling assumptions.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Why Drivetrain Loss Must Not Be Applied Twice
          </h2>
          <p>
            Suppose an engine produces 400 BHP and the selected drivetrain assumption is 14%. The correct calculation is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"400 × 0.86 = 344 WHP"}
          </div>
          <p>
            Applying the 14% reduction a second time would incorrectly compound the loss: <code>400 × 0.86 × 0.86 = 295.8 WHP</code>. The calculator&apos;s regression suite specifically checks that drivetrain loss is applied consistently rather than being compounded accidentally.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Horsepower From 1/4-Mile Elapsed Time
          </h2>
          <p>
            Quarter-mile drag racing performance can be used to estimate engine power through empirical relationships. One widely tested implementation used by the calculator is the Hale-style elapsed-time model:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"HP = Total Race Weight / (ET / 5.825)³"}
          </div>
          <p>
            where <em>W</em> = total vehicle weight in pounds (curb weight + driver + payload), and <em>ET</em> = quarter-mile elapsed time in seconds.
          </p>
          <p>
            This is an empirical performance model, not a fundamental law of physics. It attempts to relate vehicle mass, elapsed time and the power required to achieve that performance under average traction conditions.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            11. 1/4-Mile Worked Example
          </h2>
          <p>
            Consider a vehicle with <em>W</em> = 3,500 lb total weight and <em>ET</em> = 12.0 s. Using the Hale constant (5.825):
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"HP = 3500 / (12 / 5.825)³ = 3500 / (2.060086)³ ≈ 400.32 BHP ≈ 400 BHP"}
          </div>
          <p>
            The Fox model (using constant 5.71) produces approximately:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"HP = 3500 / (12 / 5.71)³ = 3500 / (2.101576)³ ≈ 377.07 BHP ≈ 377 BHP"}
          </div>
          <p>
            The difference illustrates an important point: different empirical models can estimate somewhat different horsepower from the same track data depending on their baseline calibration vehicles.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Horsepower From Quarter-Mile Trap Speed
          </h2>
          <p>
            Trap speed provides another way to estimate power. The calculator uses the Fox trap-speed formula:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"HP = Total Weight × (Trap Speed / 234)³"}
          </div>
          <p>
            where <em>W</em> = total vehicle weight in lb, and <em>V</em> = finish-line trap speed in mph. For a 3,500 lb vehicle finishing at 114 mph:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"HP = 3500 × (114 / 234)³ = 3500 × (0.487179)³ ≈ 404.71 HP ≈ 405 BHP"}
          </div>
          <p>
            The calculator&apos;s independent golden-case test verifies approximately 404.71 BHP.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            13. ET vs Trap Speed
          </h2>
          <p>
            Elapsed time and trap speed measure different vehicle dynamic characteristics during a drag sprint:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Elapsed Time (ET):</strong> Strongly influenced by launch traction, 60-foot sprint grip, tire choice, shift delays, and suspension setup.
            </li>
            <li>
              <strong>Trap Speed:</strong> Reflects the vehicle&apos;s net power-to-weight ratio over distance, particularly how strongly the engine pulls in the second eighth-mile when wheelspin has subsided.
            </li>
          </ul>
          <p>
            A vehicle with poor launch traction can have a mediocre ET (e.g. 13.5s) while still clocking a huge trap speed (e.g. 118 mph). This is why ET and trap-speed horsepower estimates are complementary indicators rather than duplicates.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Why Quarter-Mile Horsepower Is Only an Estimate
          </h2>
          <p>
            Quarter-mile performance depends on many variables beyond peak engine horsepower:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-semibold my-2">
            <span className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70">Vehicle Total Mass</span>
            <span className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70">Tire Grip &amp; Compound</span>
            <span className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70">Gear Ratios &amp; Shifts</span>
            <span className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70">Aerodynamic Drag</span>
          </div>
          <p>
            Consequently, a track-derived horsepower figure should not be interpreted as though it were a direct dynamometer measurement. The calculator treats ET and trap-speed models as empirical estimators.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Horsepower From a 0–60 MPH Time
          </h2>
          <p>
            The calculator also estimates the power required for a target 0–60 mph acceleration time. Its model uses vehicle mass and acceleration kinematics to estimate required wheel power and incorporates drivetrain loss to yield crankshaft output.
          </p>
          <p>
            The verified reference case is:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Vehicle Weight: 3,500 lb</li>
            <li>Target 0–60 Time: 4.2 seconds</li>
            <li>Drivetrain: RWD Automatic (17.5% loss)</li>
          </ul>
          <p>
            The calculator produces approximately:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"1,503 BHP and 1,240 WHP"}
          </div>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Why Horsepower Alone Does Not Determine 0–60 Time
          </h2>
          <p>
            Two cars with the same horsepower can have radically different 0–60 mph sprint times. The outcome depends heavily on launch control algorithms, all-wheel-drive torque vectoring, tire contact patch, torque curve shape, transmission shift speed, and ambient track temperature.
          </p>
          <p>
            This means a 500-hp car is not automatically faster from 0–60 mph than every 400-hp car. Horsepower is an important input, but acceleration is a vehicle dynamic system problem.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Power-to-Weight Ratio
          </h2>
          <p>
            Power-to-weight ratio normalizes horsepower for vehicle mass:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"lb/HP = Vehicle Weight (lbs) / Horsepower"}
          </div>
          <p>
            For a 3,500 lb vehicle with 400 HP:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"3500 / 400 = 8.75 lb/HP"}
          </div>
          <p>
            A lower lb/HP value means that each horsepower is responsible for accelerating less mass. The calculator also computes HP per short ton (2,000 lbs) and specific power output in Watts per kilogram (W/kg).
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            18. Horsepower Unit Conversion
          </h2>
          <p>
            Different engineering disciplines and automotive regions use different power standards:
          </p>
          <p>
            NIST defines the mechanical horsepower conversion as:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"1 Mechanical HP = 745.699872 Watts"}
          </div>
          <p>
            Therefore, for 400 mechanical horsepower:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"400 HP × 0.745699872 = 298.28 kW ≈ 298.3 kW"}
          </div>
          <p>
            For direct electrical-power relationships involving voltage, current and resistance, see the{" "}
            <Link
              href="/calculators/ohms-law-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Ohm&apos;s Law Calculator
            </Link>.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            19. HP vs PS
          </h2>
          <p>
            Mechanical horsepower (Imperial HP) and Metric horsepower (PS / CV / DIN) are not identical:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"1 Metric PS ≈ 735.49875 W | 1 Mechanical HP ≈ 745.699872 W"}
          </div>
          <p>
            Therefore, one mechanical horsepower is slightly greater than one metric PS:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"1 Mechanical HP ≈ 1.01387 Metric PS"}
          </div>
          <p>
            This distinction is crucial when comparing European OEM vehicle ratings (e.g. 720 PS in Germany) with North American market ratings (710 HP).
          </p>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            20. Forced Induction, Boost and Engine Displacement
          </h2>
          <p>
            The calculator includes a forced-induction estimator that integrates engine displacement, boost pressure, volumetric efficiency (VE), and static compression ratio.
          </p>
          <p>
            A larger displacement engine can theoretically process more air volume per cycle, while turbochargers or superchargers compress ambient intake air above atmospheric pressure (14.7 PSI), increasing air mass density.
          </p>
          <p>
            The verified reference case uses:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>5.0 Liters Displacement (305 CID)</li>
            <li>10 PSI Boost Pressure</li>
            <li>85% Volumetric Efficiency</li>
            <li>9.5:1 Static Compression Ratio</li>
          </ul>
          <p>
            and produces approximately:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"960 BHP | 12.31:1 Effective CR | 662 CFM Airflow"}
          </div>
        </section>

        {/* Section 21 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            21. What Is Volumetric Efficiency?
          </h2>
          <p>
            Volumetric efficiency (VE) describes how effectively an engine fills its cylinders with fresh air/fuel charge during the intake stroke relative to the theoretical static cylinder displacement:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"VE = Actual Inducted Air Volume / Theoretical Displacement Volume"}
          </div>
          <p>
            Naturally aspirated production engines typically achieve between 80% and 95% VE at peak torque RPM. Heavily tuned race engines with tuned intake runners, aggressive camshaft overlap, and scavenged exhaust headers can exceed 100% VE through acoustic resonance ram-charging.
          </p>
        </section>

        {/* Section 22 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            22. Effective Compression Ratio Under Boost
          </h2>
          <p>
            The calculator calculates the effective compression ratio under boost using the standard forced-induction density ratio equation:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"CR_eff = CR_static × √((Boost PSI + 14.7) / 14.7)"}
          </div>
          <p>
            For a 9.5:1 static compression ratio engine at 10 PSI boost:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"CR_eff = 9.5 × √((10 + 14.7) / 14.7) = 9.5 × √(1.6803) ≈ 12.31:1"}
          </div>
          <p>
            This value should be understood as a comparative model metric, not as a replacement for full in-cylinder dynamic pressure logging or detonation knock threshold analysis.
          </p>
        </section>

        {/* Section 23 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            23. Does 10 PSI of Boost Double Horsepower?
          </h2>
          <p>
            Not necessarily. While adding 14.7 PSI of boost doubles ambient manifold pressure, actual net engine horsepower does not double due to thermal compressor inefficiency, charge air heating, intercooler pressure drop, increased exhaust turbine backpressure, parasitic supercharger drive load, and retarded ignition timing needed to prevent knock.
          </p>
          <p>
            The calculator uses an explicit airflow-density model rather than a blanket doubling assumption.
          </p>
        </section>

        {/* Section 24 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            24. SAE J1349 and Atmospheric Correction
          </h2>
          <p>
            Engine power varies with ambient weather because intake air density changes with temperature and barometric pressure. SAE J1349 is an engine power rating standard designed to obtain repeatable dynamometer measurements and correct observed power to standardized baseline inlet-air conditions. The latest standard listing is SAE J1349_202511 (revised November 19, 2025).
          </p>
          <p>
            The standard baseline conditions are:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
            {"Ambient Temperature: 77°F (25°C / 298.15 K) | Barometric Pressure: 29.92 inHg (1013.25 mbar)"}
          </div>
          <p>
            At these reference conditions, the tested correction factor is exactly <strong>CF = 1.000</strong>, ensuring zero baseline drift.
          </p>
        </section>

        {/* Section 25 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            25. SAE Correction Is Not the Same as Altitude Derating
          </h2>
          <p>
            This distinction is vital: SAE J1349&apos;s correction method is not intended as a universal &quot;3% loss per 1,000 feet&quot; rule. SAE&apos;s official standard scope explicitly states that its mathematical pressure and temperature correction formulas are designed for laboratory dynamometer standardization and are not intended for high-altitude vehicle performance derating.
          </p>
        </section>

        {/* Section 26 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            26. Hot Weather and Engine Power
          </h2>
          <p>
            Hotter ambient air is less dense than cooler air at the same pressure. In a naturally aspirated engine, this directly reduces the mass of oxygen entering each cylinder, reducing combustion energy and output. Forced-induction engines can partially compensate via electronic wastegate management, though elevated intake air temperatures can still trigger safety spark-retard tables.
          </p>
        </section>

        {/* Section 27 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            27. How to Use This Engine Horsepower Calculator
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
            <li><strong>Torque &amp; RPM:</strong> Enter rotational torque and engine RPM to determine crankshaft BHP, wheel WHP, kW, and PS.</li>
            <li><strong>1/4-Mile ET:</strong> Enter vehicle curb weight, driver weight, and elapsed time to estimate power using Hale, Fox, or Hunt empirical drag models.</li>
            <li><strong>Trap Speed:</strong> Enter finish-line trap speed and vehicle weight for a traction-independent power estimate.</li>
            <li><strong>0–60 Sprint:</strong> Enter vehicle weight and target 0–60 mph duration to estimate required wheel and crank output.</li>
            <li><strong>Boost &amp; CC:</strong> Enter displacement in liters, boost PSI, volumetric efficiency, and static compression ratio to compute airflow and effective CR.</li>
          </ul>
        </section>

        {/* Section 28 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            28. How to Get Better Results From the Calculator
          </h2>
          <p>
            For maximum accuracy in performance calculations:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li>Weigh the vehicle on certified scales rather than relying on manufacturer curb weight brochure figures.</li>
            <li>Always include driver and payload in total weight when using quarter-mile drag models.</li>
            <li>Use actual timing slip data for trap speed and ET rather than cell phone GPS app approximations.</li>
            <li>Match the drivetrain configuration to your transmission and differential setup.</li>
          </ul>
        </section>

        {/* Section 29 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            29. A Practical Example: 400 BHP Vehicle
          </h2>
          <p>
            Consider a 3,500 lb sports coupe producing 400 BHP with a 6-speed manual transmission (14% drivetrain loss):
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Wheel Output: <code>400 × (1 - 0.14) = 344 WHP</code></li>
            <li>Power-to-Weight Ratio: <code>3500 / 400 = 8.75 lb/HP</code> (229 HP/ton)</li>
            <li>Estimated Quarter-Mile ET: 12.21 seconds @ 112 mph</li>
          </ul>
          <p>
            For operating-cost analysis after estimating vehicle efficiency, the{" "}
            <Link
              href="/calculators/gas-mileage-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Gas Mileage Calculator
            </Link>{" "}
            can convert real-world fuel use into mileage and fuel-economy metrics.
          </p>
        </section>

        {/* Section 30 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            30. Measured vs Estimated Horsepower
          </h2>
          <p>
            This calculator provides analytical estimates from mathematical relationships, empirical track data, and thermodynamic airflow models. A physical dynamometer measures torque absorbed by a water brake, eddy current retarder, or hub dyno.
          </p>
          <p>
            Knowing the distinction between a direct mathematical equation (Torque/RPM), an empirical track estimate (ET/Trap Speed), a thermodynamic airflow projection (Boost/CC), and a direct dyno measurement is critical for proper automotive engineering analysis.
          </p>
        </section>

        {/* 4. IMPORTANT TECHNICAL NOTE */}
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-xs">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            Engineering &amp; Track Testing Safety Note
          </div>
          <p>
            Horsepower estimates derived from quarter-mile performance, 0–60 acceleration, or forced induction assumptions depend on the underlying model and the quality of the input data. They should be treated as engineering estimates rather than guaranteed vehicle performance or direct dynamometer measurements. Conduct all vehicle testing at sanctioned drag strip or race track facilities with appropriate safety equipment and inspected tires.
          </p>
        </div>
      </div>

      {/* 2. FULLY UNFOLDED FREQUENTLY ASKED QUESTIONS */}
      <div className="pt-8 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {[
            {
              question: "What is the formula for horsepower from torque and RPM?",
              answer:
                "For torque in lb-ft: HP = (Torque × RPM) / 5252.113. For example, 400 lb-ft of torque at 5,252 RPM produces approximately 400 mechanical horsepower.",
            },
            {
              question: "Why do horsepower and torque cross at 5,252 RPM?",
              answer:
                "Because 1 mechanical horsepower is defined as 33,000 ft-lb of work per minute, and one rotational revolution equals 2π radians. Dividing 33,000 by 2π yields 5,252.113. When horsepower and torque (in lb-ft) are plotted on matching scales, their values must intersect at 5,252 RPM.",
            },
            {
              question: "What is the difference between BHP and WHP?",
              answer:
                "BHP (Brake Horsepower) represents raw engine flywheel power output before transmission friction. WHP (Wheel Horsepower) is the power measured at the drive wheels on a chassis dynamometer after overcoming 11%–22% drivetrain parasitic friction losses.",
            },
            {
              question: "How do I calculate WHP from BHP?",
              answer:
                "Multiply BHP by (1 - Drivetrain Loss): WHP = BHP × (1 - Loss). For 400 BHP with a 14% manual transmission loss: 400 × 0.86 = 344 WHP.",
            },
            {
              question: "How accurate is a quarter-mile horsepower estimate?",
              answer:
                "It is an empirical estimate with an accuracy typically within 3% to 7% of actual engine output when accurate total race weight (car + driver) and timing slip metrics are used.",
            },
            {
              question: "Is trap speed better than ET for estimating horsepower?",
              answer:
                "Yes. Elapsed time is heavily influenced by tire grip, suspension weight transfer, and driver reaction time, whereas finish-line trap speed reflects the vehicle's true power-to-weight ratio over the entire quarter-mile.",
            },
            {
              question: "How much horsepower do I need for a 0–60 time?",
              answer:
                "There is no single universal horsepower requirement. Vehicle mass, tire traction, drivetrain layout (AWD vs RWD), and launch gearing all dictate acceleration. The calculator estimates the required power using dynamic kinetic energy models.",
            },
            {
              question: "What is the difference between HP, PS and kW?",
              answer:
                "1 Imperial Mechanical Horsepower equals 745.7 Watts. 1 Metric Horsepower (PS) equals 735.5 Watts. A kilowatt (kW) is an international SI power unit equal to 1,000 Watts (1 kW ≈ 1.341 Mechanical HP).",
            },
            {
              question: "Does more boost always mean proportionally more horsepower?",
              answer:
                "No. Boost increases intake manifold pressure, but actual engine power also depends on compressor thermal efficiency, intercooling heat soak, camshaft timing, exhaust backpressure, and ignition timing limits.",
            },
            {
              question: "What is SAE J1349?",
              answer:
                "SAE J1349 is the automotive industry's standardized engine net power test code (latest revision J1349_202511). It measures flywheel power with all factory accessories installed and normalizes output to 77°F (25°C) and 29.92 inHg barometric pressure.",
            },
            {
              question: "Does SAE J1349 calculate horsepower loss at altitude?",
              answer:
                "No. The SAE J1349 standard explicitly states that its laboratory barometric correction formulas are designed for dynamometer testing standardization, not as a universal altitude derating rule for vehicle road performance.",
            },
            {
              question: "Can I calculate horsepower without a dynamometer?",
              answer:
                "Yes. By using rotational torque and engine speed, quarter-mile track timing slips, or intake Mass Air Flow (MAF) sensor telemetry, engineers and enthusiasts can calculate horsepower within 3%–5% accuracy without a dyno facility.",
            },
          ].map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-3.5 sm:p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-3.5 sm:p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. RESTRAINED TEXT-BASED REFERENCES */}
      <div className="pt-8 space-y-3 text-xs text-slate-700 dark:text-slate-300">
        <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-xs">
          <BookOpen className="h-4 w-4 text-blue-600" />
          Standards &amp; Authoritative References
        </div>
        <ul className="space-y-2 pl-1">
          <li className="flex items-start gap-1.5">
            <ExternalLink className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <strong>SAE International:</strong> SAE J1349_202511 — <em>Engine Power Test Code: Spark Ignition and Compression Ignition — As Installed Net Power and Torque Rating</em> (Revised November 19, 2025). Provides repeatable dynamometer measurement standards that accurately reflect engine performance in customer service.
            </div>
          </li>
          <li className="flex items-start gap-1.5">
            <ExternalLink className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <strong>SAE International — Historical J1349 Scope:</strong> Outlines dynamometer test guidelines and standard inlet-air condition normalization, while explicitly specifying that correction formulas are not intended for altitude derating.
            </div>
          </li>
          <li className="flex items-start gap-1.5">
            <ExternalLink className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <strong>National Institute of Standards and Technology (NIST):</strong> Guide for the Use of the International System of Units (SI) — Special Publication 811. Standardizes mechanical, metric, electrical, and boiler horsepower conversions to Watts.
            </div>
          </li>
        </ul>
      </div>
    </article>
  );
}

export default EngineHorsepowerContent;

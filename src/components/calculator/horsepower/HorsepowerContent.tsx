"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Zap,
} from "lucide-react";
import { horsepower_calculatorFaqs } from "@/app/calculators/horsepower-calculator/faq";

export function HorsepowerContent() {
  return (
    <article className="space-y-10 text-slate-800 dark:text-zinc-200 leading-relaxed font-sans">
      {/* HEADER INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400">
          The Complete Guide to Horsepower, Torque, RPM, BHP, WHP and Performance Estimation
        </h2>
        <p>
          Horsepower is one of the most familiar numbers in automotive performance, but it is also one of the most frequently misunderstood. A vehicle may be advertised with a particular horsepower figure, measured at the crankshaft on an engine dynamometer, or reported as wheel horsepower on a chassis dynamometer. The same engine can therefore have different published power figures depending on where and how the measurement is made.
        </p>
        <p>
          This Horsepower Calculator combines several useful performance calculations in one place. It can calculate power from torque and engine speed, estimate horsepower from quarter-mile elapsed time or trap speed, estimate the power associated with a 0–60 mph target, convert between common horsepower units, estimate wheel horsepower after drivetrain losses, and apply an SAE J1349 atmospheric correction model where appropriate.
        </p>
        <p>
          The production implementation has been independently tested across torque/RPM calculations, quarter-mile models, 0–60 calculations, unit conversions, drivetrain losses, power-to-weight calculations, atmospheric correction, graph behavior and export consistency.
        </p>
      </section>

      {/* SECTION 1 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          1. What Is Horsepower?
        </h3>
        <p>
          Horsepower is a unit of power, meaning the rate at which work is performed or energy is transferred.
        </p>
        <p>Mechanical horsepower is defined as:</p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
          1 HP = 550 ft·lbf/s = 33,000 ft·lbf/min ≈ 745.7 W
        </div>
        <p>
          The calculator&apos;s educational content uses this mechanical definition and derives the familiar torque/RPM constant from it.
        </p>
        <p>
          The important point is that horsepower is not a direct measure of force. Torque describes rotational force; horsepower describes how quickly that rotational work is being performed.
        </p>
      </section>

      {/* SECTION 2 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          2. Horsepower vs Torque: What Is the Difference?
        </h3>
        <p>
          Torque and horsepower are related, but they answer different questions. Torque describes the turning effect produced by the engine, while horsepower combines torque with rotational speed:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
          Power ∝ Torque × Angular Velocity &nbsp;|&nbsp; HP = (Torque(lb-ft) × RPM) / 5252.113
        </div>
        <p>
          Therefore an engine producing substantial torque at low RPM can make less horsepower than an engine producing slightly less torque at a much higher RPM. For example, <code>400 lb-ft @ 2,500 RPM</code> and <code>300 lb-ft @ 5,500 RPM</code> do not produce the same horsepower. For evaluating complete engine characteristics across varying displacement architectures, engineers also cross-reference our{" "}
          <Link
            href="/calculators/engine-horsepower-calculator"
            className="text-blue-600 dark:text-blue-400 font-medium underline hover:text-blue-700"
          >
            Engine Horsepower Calculator
          </Link>
          .
        </p>
        <p>
          This is why an engine&apos;s torque curve and power curve must be interpreted together, rather than treating either number as a complete description of performance.
        </p>
      </section>

      {/* SECTION 3 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          3. The Horsepower Formula From Torque and RPM
        </h3>
        <p>When torque is measured in pound-feet, the primary governing equation is:</p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
          HP = (Torque in lb-ft × RPM) / 5252.113
        </div>
        <p>
          The calculator uses the full-precision constant rather than an unnecessarily rounded intermediate value.
        </p>
        <p>
          <strong>Example:</strong> Suppose an engine produces <code>400 lb-ft</code> at <code>5,252.113 RPM</code>. Then:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
          HP = (400 × 5252.113) / 5252.113 = 400 HP
        </div>
        <p>
          That is the reason the familiar 5,252 RPM intersection appears in horsepower-versus-torque graphs when both axes use matching numerical scales. The calculator&apos;s production verification explicitly confirms the 5,252 RPM intersection in both the mathematics and the dynamic SVG visualizer.
        </p>
      </section>

      {/* SECTION 4 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          4. Why Do Torque and Horsepower Curves Meet at 5,252 RPM?
        </h3>
        <p>
          Starting from <code>HP = (T × RPM) / 5252.113</code>, set numerical horsepower equal to numerical torque (<code>HP = T</code>):
        </p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
          T = (T × RPM) / 5252.113 &nbsp;→&nbsp; For nonzero torque: RPM = 5252.113
        </div>
        <p>
          Therefore, on a graph using torque in lb-ft and horsepower in HP, the curves intersect at approximately <strong>5,252 RPM</strong>. This is not a special physical property of engines; it is a direct mathematical consequence of the chosen unit definitions and conversion constant.
        </p>
      </section>

      {/* SECTION 5 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          5. Horsepower From Newton-Meters
        </h3>
        <p>
          When torque is expressed in SI units (Newton-meters, N·m), the conversion to mechanical horsepower is written as:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
          HP = (Torque in N·m × RPM) / 7120.89
        </div>
        <p>
          The exact constant used by the calculator is documented in its tested metric calculation path. This is why a torque figure cannot simply be multiplied by RPM without considering the torque unit.
        </p>
      </section>

      {/* SECTION 6 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          6. How the 5,252 Constant Is Derived
        </h3>
        <p>
          Mechanical horsepower is defined as <code>33,000 ft·lbf/min</code>. One complete revolution equals <code>2π radians</code>. Therefore:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
          Constant = 33,000 / (2π) = 33,000 / 6.2831853 ≈ 5,252.113
        </div>
        <p>
          This links the historical mechanical horsepower definition with the automotive rotational equation. The important distinction is that 5,252 is a conversion constant, not an arbitrary engine tuning parameter.
        </p>
      </section>

      {/* SECTION 7 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          7. BHP, WHP and Crankshaft Horsepower
        </h3>
        <p>
          Horsepower can be measured at different points in the powertrain:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
          <li>
            <strong>Brake Horsepower (BHP):</strong> Generally refers to raw engine power measured at the flywheel or crankshaft under applicable test bench conditions.
          </li>
          <li>
            <strong>Wheel Horsepower (WHP):</strong> Refers to usable power measured at the driven wheels on a chassis dynamometer.
          </li>
        </ul>
        <p>
          Between the crankshaft and the tires, mechanical components such as the clutch or torque converter, transmission, driveshafts, differential, axle shafts, bearings, and tires consume power through friction and rotational inertia. Consequently, WHP is generally lower than crankshaft output.
        </p>
      </section>

      {/* SECTION 8 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          8. How to Calculate Wheel Horsepower From BHP
        </h3>
        <p>If drivetrain loss is modeled as a percentage:</p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
          WHP = BHP × (1 - Loss Percentage)
        </div>
        <p>
          For example, with <code>400 BHP</code> and <code>14%</code> loss: <code>WHP = 400 × 0.86 = 344 WHP</code>. The calculator&apos;s golden case produces exactly this result and independently tests reversal back from WHP to BHP via <code>BHP = WHP / (1 - Loss)</code>.
        </p>
      </section>

      {/* SECTION 9 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          9. Typical Drivetrain Losses
        </h3>
        <p>The calculator includes configurable drivetrain-loss presets:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-zinc-800 rounded-lg">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-bold">
              <tr>
                <th className="p-2.5 border border-slate-200 dark:border-zinc-800">Drivetrain Architecture</th>
                <th className="p-2.5 border border-slate-200 dark:border-zinc-800">Calculator Preset</th>
                <th className="p-2.5 border border-slate-200 dark:border-zinc-800">Output from 400 BHP Crank</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
              <tr>
                <td className="p-2.5 font-bold">Front-Wheel Drive (FWD) Manual</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-mono font-bold">11%</td>
                <td className="p-2.5 font-mono">356 WHP</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">Rear-Wheel Drive (RWD) Manual</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-mono font-bold">14%</td>
                <td className="p-2.5 font-mono">344 WHP</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">Rear-Wheel Drive (RWD) Automatic</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-mono font-bold">17.5%</td>
                <td className="p-2.5 font-mono">330 WHP</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">All-Wheel Drive (AWD / 4WD)</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-mono font-bold">22%</td>
                <td className="p-2.5 font-mono">312 WHP</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 dark:text-zinc-400">
          These values are estimation presets, not universal constants for every vehicle. Actual loss varies with transmission fluid viscosity, tire rolling resistance, differential design, and test methodology.
        </p>
      </section>

      {/* SECTION 10 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          10. Why Drivetrain Loss Should Not Be Applied Twice
        </h3>
        <p>
          Suppose <code>BHP = 400</code> and drivetrain loss is <code>14%</code>:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
          <li><strong>Correct single application:</strong> <code>400 × 0.86 = 344 WHP</code></li>
          <li><strong>Incorrect double application:</strong> <code>400 × 0.86 × 0.86 = 295.84 WHP</code></li>
        </ul>
        <p>
          Double application produces a second, unjustified penalty. A properly audited calculator applies the selected drivetrain model exactly once and maintains a strict distinction between crankshaft power and wheel power.
        </p>
      </section>

      {/* SECTION 11 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          11. Power-to-Weight Ratio
        </h3>
        <p>
          Peak horsepower does not tell the entire performance story. A lighter vehicle can accelerate strongly with less absolute power than a much heavier vehicle because less mass must be accelerated:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
          HP per lb = HP / Weight &nbsp;|&nbsp; lb per HP = Weight / HP &nbsp;|&nbsp; HP/ton = HP / (Weight / 2000)
        </div>
        <p>
          For <code>3,500 lb</code> and <code>400 HP</code>, the ratio is <code>3500 / 400 = 8.75 lb/HP</code>, or <code>229 HP/ton</code> (short ton). Power-to-weight is especially useful when comparing vehicles with significantly different curb weights.
        </p>
      </section>

      {/* SECTION 12 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          12. Horsepower From Quarter-Mile Elapsed Time
        </h3>
        <p>
          Quarter-mile performance can be used to estimate power through empirical drag-racing relationships. One commonly used elapsed-time model is Hale&apos;s formula:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
          ET = 5.825 × (Weight / HP)^(1/3) &nbsp;→&nbsp; HP = Weight / (ET / 5.825)³
        </div>
        <p>
          where <code>W</code> is vehicle weight in pounds and <code>ET</code> is quarter-mile elapsed time in seconds. The calculator implements tested Hale, Fox, and Hunt models rather than treating the old incorrectly inverted formula as valid.
        </p>
      </section>

      {/* SECTION 13 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          13. Why Quarter-Mile Horsepower Is Only an Estimate
        </h3>
        <p>
          A quarter-mile run is influenced by much more than engine peak power alone. Key factors include launch traction, 60-foot times, tire compound and inflation, transmission gear ratios, aerodynamic drag, ambient air density, and track elevation. Because tire diameter changes the relationship between engine RPM, gearing and road speed, the{" "}
          <Link
            href="/calculators/tire-size-calculator"
            className="text-blue-600 dark:text-blue-400 font-medium underline hover:text-blue-700"
          >
            Tire Size Calculator
          </Link>{" "}
          can be useful when investigating how a gearing change affects real-world performance.
        </p>
      </section>

      {/* SECTION 14 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          14. Horsepower From Quarter-Mile Trap Speed
        </h3>
        <p>The trap-speed method uses the speed recorded through the finish traps:</p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold">
          HP = Weight × (Trap Speed in mph / 234)³
        </div>
        <p>
          For <code>Weight = 3,500 lb</code> and <code>Trap Speed = 114 mph</code>:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
          HP = 3500 × (114 / 234)³ ≈ 404.7 HP (approx. 405 HP)
        </div>
        <p>The production audit verifies this exact golden benchmark.</p>
      </section>

      {/* SECTION 15 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          15. ET vs Trap Speed: Why They Can Tell Different Stories
        </h3>
        <p>
          Elapsed time contains strong information about the entire acceleration run, especially launch traction and low-end torque. Trap speed reflects the vehicle&apos;s rate of work near the end of the measured quarter-mile. A car with poor launch traction might record a slower ET but strong trap speed once tires hook; a well-launched AWD car might show a quick ET with lower trap speed. Consequently, ET and trap speed are complementary performance signals.
        </p>
      </section>

      {/* SECTION 16 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          16. The 0–60 MPH Horsepower Estimate
        </h3>
        <p>
          The calculator also estimates the power associated with a target 0–60 mph sprint time using a dynamic kinetic-inertia model for required wheel power, mapped to the selected drivetrain configuration:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
          Required WHP ≈ Weight × (2.5 / Target 0-60 Time)² &nbsp;|&nbsp; Crank BHP = Required WHP / (1 - Loss)
        </div>
        <p>
          For the verified reference case (<code>Weight = 3,500 lb</code>, <code>Target = 4.2 s</code>, <code>Drivetrain = RWD Automatic (17.5% loss)</code>), the calculator yields <code>1,503 BHP</code> and <code>1,240 WHP</code>.
        </p>
      </section>

      {/* SECTION 17 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          17. Why 0–60 Time Is Not Determined by Horsepower Alone
        </h3>
        <p>
          Horsepower matters, but real-world acceleration depends heavily on tire traction, drivetrain gearing, launch control calibration, torque delivery curve, vehicle weight transfer, and transmission shift times. A high-power vehicle can produce a disappointing 0–60 result if it cannot transfer power to the road surface without wheelspin.
        </p>
      </section>

      {/* SECTION 18 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          18. Horsepower Units: HP, PS, kW and More
        </h3>
        <p>Different engineering disciplines and global regions utilize localized power definitions:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase">Mechanical / Imperial HP (hp)</h4>
            <p>Standardized in the US and UK. Defined as 550 ft-lbf/s ≈ <strong>745.699872 Watts</strong>.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase">Metric Horsepower (PS / CV / DIN)</h4>
            <p>Used across Europe and Japan. Defined as lifting 75 kg by 1 m in 1 s ≈ <strong>735.49875 Watts</strong> (1 HP ≈ 1.01387 PS).</p>
          </div>
        </div>
      </section>

      {/* SECTION 19 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          19. Mechanical HP vs Electrical HP vs Boiler HP
        </h3>
        <p>
          The word &quot;horsepower&quot; does not guarantee that the same unit definition is being used:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
          <li><strong>Mechanical Horsepower:</strong> 745.699872 W (automotive standard)</li>
          <li><strong>Electrical Horsepower:</strong> Exactly 746.0 W (industrial electric motor ratings)</li>
          <li><strong>Boiler Horsepower:</strong> Traditionally defined as evaporating 34.5 lbs of water at 212°F per hour = <strong>33,475 BTU/hr</strong> (approx. 9,809.5 W)</li>
        </ul>
        <p>The calculator keeps these unit definitions separate rather than treating every HP label as interchangeable.</p>
      </section>

      {/* SECTION 20 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          20. SAE J1349 and Dyno Weather Correction
        </h3>
        <p>
          Engine power measurements change with environmental conditions because ambient intake-air density varies with temperature, barometric pressure, and humidity. SAE J1349 provides a standardized engine testing methodology and mathematical correction equations to normalize observed dyno runs to standard baseline conditions (<strong>77°F / 25°C, 29.92 inHg barometric pressure</strong>).
        </p>
        <p>
          The calculator&apos;s verified implementation produces <code>CF = 1.000</code> at baseline conditions. <strong>Important limitation:</strong> J1349 correction should not be described as a universal &quot;3% horsepower loss per 1,000 feet&quot; rule; SAE explicitly states that J1349 correction equations are not intended for altitude derating.
        </p>
      </section>

      {/* SECTION 21 & 22 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          21. Temperature and Barometric Pressure Effects
        </h3>
        <p>
          Air density decreases as air temperature increases. For internal combustion engines, lower intake air density means fewer oxygen molecules per cubic foot of air entered into the combustion chambers. Similarly, lower barometric pressure (as encountered at elevation) reduces charge density. Modern turbocharged engines equipped with electronic wastegates can partially compensate by commanding higher boost pressures, which is why environmental effects cannot be reduced to a single blanket percentage.
        </p>
      </section>

      {/* SECTION 23 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          22. Understanding the Horsepower and Torque Graph
        </h3>
        <p>
          The interactive visualizer provides a real-time dyno plot of torque and horsepower. Power is computed point-by-point via <code>HP = (Torque × RPM) / 5252.113</code>. The highlighted amber crossing dot confirms the exact <strong>5,252 RPM</strong> intersection on matching scales. Adjusting torque or RPM updates the visual curves instantaneously.
        </p>
      </section>

      {/* SECTION 24 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          23. How to Use the Horsepower Calculator
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Torque &amp; RPM Mode</h4>
            <p>Enter torque (lb-ft or N·m) and RPM. Returns Crank BHP, WHP, kW, PS, and dyno curve.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">1/4-Mile Drag Strip Mode</h4>
            <p>Enter vehicle curb weight and either elapsed time or trap speed. Select Hale, Fox, or Hunt empirical models.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">0–60 Sprint Mode</h4>
            <p>Enter curb weight and target sprint seconds. Computes required wheel horsepower and crankshaft BHP.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Omnidirectional Unit Converter</h4>
            <p>Convert seamlessly between Mechanical HP, Metric PS, kW, W, electrical HP, boiler HP, BTU/hr, and ft-lb/s.</p>
          </div>
        </div>
      </section>

      {/* SECTION 25 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          24. Worked Example: 400 BHP, 3,500 lb and 12.0 Seconds
        </h3>
        <p>Consider the consistent vehicle test case:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
          <li>Vehicle Curb Weight: <code>3,500 lbs</code></li>
          <li>Quarter-Mile Elapsed Time: <code>12.00 seconds</code></li>
        </ul>
        <p>Using the Hale empirical model:</p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
          HP = 3500 / (12.0 / 5.825)³ = 3500 / 8.7427 ≈ 400.3 BHP (approx. 400 BHP)
        </div>
        <p>
          Using the Fox ET model implemented by the calculator: <code>HP = 3500 / (12.0 / 5.71)³ ≈ 377 BHP</code>. The calculator independently verifies both results, showing how empirical drag models provide bounded engineering estimates.
        </p>
      </section>

      {/* SECTION: FREQUENTLY ASKED QUESTIONS (FULLY UNFOLDED) */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Frequently Asked Questions
          </h3>
        </div>
        <div className="space-y-3">
          {horsepower_calculatorFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/70 space-y-1.5"
            >
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-mono text-xs font-bold shrink-0">
                  Q{idx + 26}.
                </span>
                {faq.question}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal pl-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: REFERENCE FORMULAS SUMMARY */}
      <section className="space-y-3 pt-4">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          Reference Formulas Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70">
            <strong>Torque to HP:</strong> HP = (T_lbft × RPM) / 5252.113
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70">
            <strong>Metric Torque:</strong> HP = (T_Nm × RPM) / 7120.89
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70">
            <strong>Wheel Power:</strong> WHP = BHP × (1 - Loss)
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70">
            <strong>1/4-Mile ET:</strong> HP = Weight / (ET / C)³
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70">
            <strong>Trap Speed:</strong> HP = Weight × (Speed / 234)³
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70">
            <strong>Power-to-Weight:</strong> lb/HP = Weight / HP
          </div>
        </div>
      </section>

      {/* SECTION: PRACTICAL HORSEPOWER CHECKLIST */}
      <section className="space-y-3 pt-4">
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 space-y-3">
          <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-xs">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Practical Horsepower Calculation Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">Measurement Verification:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Confirm whether published power is BHP (crank) or WHP (wheels)</li>
                <li>Verify whether units are Mechanical HP, Metric PS, or Kilowatts</li>
                <li>Identify drivetrain configuration (FWD, RWD, AWD)</li>
                <li>Account for elevation and ambient dyno cell temperature</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">Timeslip &amp; Drag Modeling:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Include driver curb weight in total quarter-mile vehicle weight</li>
                <li>Cross-reference both ET and trap speed for launch quality context</li>
                <li>Use empirical formulas as estimates rather than dyno replacements</li>
                <li>Compare only figures evaluated under identical testing conventions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: STANDARDS & AUTHORITATIVE REFERENCES */}
      <section className="space-y-3 pt-2">
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-xs">
            <BookOpen className="h-4 w-4 text-blue-600" />
            Standards &amp; Authoritative References
          </div>
          <ul className="space-y-1.5 pl-1">
            <li className="flex items-center gap-1.5">
              <ExternalLink className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>
                <strong>SAE International — J1349:</strong> Engine Power Test Procedure — Engine Power and Torque Definition and Standard Atmospheric Correction (J1349:202511).
              </span>
            </li>
            <li className="flex items-center gap-1.5">
              <ExternalLink className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>
                <strong>National Institute of Standards and Technology (NIST):</strong> Guide for the Use of the International System of Units (SI) — Power and Energy Unit Conversion Factors (SP 811).
              </span>
            </li>
            <li className="flex items-center gap-1.5">
              <ExternalLink className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>
                <strong>International Organization for Standardization (ISO):</strong> ISO 1585 Road Vehicles — Engine Test Code — Net Power.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}

export default HorsepowerContent;

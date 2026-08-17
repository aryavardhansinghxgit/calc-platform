import React from "react";

export function SpeedContent() {
  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-200">
      {/* 1. Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          1. Kinematic Foundations: Speed, Velocity &amp; Acceleration
        </h2>
        <p className="text-sm leading-relaxed">
          In classical Newtonian mechanics, motion is quantitatively characterized through time-dependent spatial displacement. Although the terms <em>speed</em> and <em>velocity</em> are often used synonymously in casual speech, physics draws a strict vector distinction between them:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-blue-50/50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 space-y-1">
            <h3 className="font-bold text-blue-900 dark:text-blue-200 text-sm">Speed ($s$) — Scalar Magnitude</h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              The rate of change of total distance covered over elapsed time ($s = d/t$), regardless of direction. Measured in <strong>meters per second (m/s)</strong> in the SI system, or miles per hour (mph) in US Customary units. Always non-negative.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">Velocity (v) — Vector Directional Rate</h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              The rate of change of spatial displacement vector (v = Δr / Δt). Velocity specifies both numerical speed and directional orientation (e.g., 65 mph Due North). An object in uniform circular motion maintains constant speed but undergoes continuous velocity change.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">Acceleration (a) — Derivative of Velocity</h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              The time rate of change of velocity (a = dv/dt), measured in <strong>m/s²</strong>. Acceleration occurs whenever an object speeds up, slows down (deceleration), or alters its trajectory.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Mathematical Concept & Core Equations */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          2. Mathematical Concept &amp; Core Kinematic Equations
        </h2>

        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-3 text-xs font-mono">
          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">A. The Fundamental Tri-Modal Kinematic Relations</p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Speed:    s = d / t"}<br />
              {"Distance: d = s × t"}<br />
              {"Time:     t = d / s"}
            </p>
          </div>

          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">B. Time-Weighted Average Speed (Harmonic Mean Principle)</p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"v_avg = Total Distance / Total Elapsed Time = (d1 + d2 + ... + dn) / (t1 + t2 + ... + tn)"}<br />
              {"Note: When traveling equal distances d at speeds v1 and v2, the average speed is the Harmonic Mean:"}<br />
              {"v_avg = 2 × v1 × v2 / (v1 + v2)"}
            </p>
          </div>

          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">C. Athletic Pace Formulations (Inverted Speed)</p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Pace (min/mile) = Total Minutes / Total Miles = 60 / Speed_mph"}<br />
              {"Pace (min/km)   = Total Minutes / Total Kilometers = 60 / Speed_kmh"}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Comprehensive Speed Conversion Matrix */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          3. Comprehensive Speed &amp; Pace Conversion Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
              <tr>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Unit Name</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Symbol</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">SI Base (m/s)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Miles/Hour (mph)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Kilometers/Hour (km/h)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2 font-bold">Meters per Second (SI)</td>
                <td className="p-2 font-mono">m/s</td>
                <td className="p-2 font-mono">1.0 m/s</td>
                <td className="p-2 font-mono">2.23694 mph</td>
                <td className="p-2 font-mono">3.60000 km/h</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Kilometers per Hour</td>
                <td className="p-2 font-mono">km/h</td>
                <td className="p-2 font-mono">0.27778 m/s</td>
                <td className="p-2 font-mono">0.62137 mph</td>
                <td className="p-2 font-mono">1.0 km/h</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Miles per Hour</td>
                <td className="p-2 font-mono">mph</td>
                <td className="p-2 font-mono">0.44704 m/s</td>
                <td className="p-2 font-mono">1.0 mph</td>
                <td className="p-2 font-mono">1.60934 km/h</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Knots (Nautical mi/h)</td>
                <td className="p-2 font-mono">kn</td>
                <td className="p-2 font-mono">0.51444 m/s</td>
                <td className="p-2 font-mono">1.15078 mph</td>
                <td className="p-2 font-mono">1.85200 km/h</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Feet per Second</td>
                <td className="p-2 font-mono">ft/s</td>
                <td className="p-2 font-mono">0.30480 m/s</td>
                <td className="p-2 font-mono">0.68182 mph</td>
                <td className="p-2 font-mono">1.09728 km/h</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Mach (Sound in Air at 20°C)</td>
                <td className="p-2 font-mono">Mach</td>
                <td className="p-2 font-mono">343.0 m/s</td>
                <td className="p-2 font-mono">767.27 mph</td>
                <td className="p-2 font-mono">1,234.8 km/h</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Speed of Light in Vacuum</td>
                <td className="p-2 font-mono">c</td>
                <td className="p-2 font-mono">299,792,458 m/s</td>
                <td className="p-2 font-mono">670,616,629 mph</td>
                <td className="p-2 font-mono">1,079,252,849 km/h</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Real-World Speed Benchmarks Table */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          4. Real-World Physical &amp; Biological Velocity Benchmarks
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
              <tr>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Entity / Phenomenon</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Velocity (m/s)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Kilometers/Hour (km/h)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Miles/Hour (mph)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2 font-bold">Garden Snail</td>
                <td className="p-2 font-mono">0.001 m/s</td>
                <td className="p-2 font-mono">0.0036 km/h</td>
                <td className="p-2 font-mono">0.0022 mph</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Human Brisk Walk</td>
                <td className="p-2 font-mono">1.39 m/s</td>
                <td className="p-2 font-mono">5.0 km/h</td>
                <td className="p-2 font-mono">3.1 mph</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Usain Bolt (100m Peak Record)</td>
                <td className="p-2 font-mono">12.42 m/s</td>
                <td className="p-2 font-mono">44.72 km/h</td>
                <td className="p-2 font-mono">27.78 mph</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Cheetah (Full Sprint)</td>
                <td className="p-2 font-mono">33.53 m/s</td>
                <td className="p-2 font-mono">120.7 km/h</td>
                <td className="p-2 font-mono">75.0 mph</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Commercial Jetliner (Boeing 747)</td>
                <td className="p-2 font-mono">253.0 m/s</td>
                <td className="p-2 font-mono">911.0 km/h</td>
                <td className="p-2 font-mono">566.0 mph</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Speed of Sound in Air (Mach 1)</td>
                <td className="p-2 font-mono">343.0 m/s</td>
                <td className="p-2 font-mono">1,234.8 km/h</td>
                <td className="p-2 font-mono">767.3 mph</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">ISS Orbital Satellite Speed</td>
                <td className="p-2 font-mono">7,660.0 m/s</td>
                <td className="p-2 font-mono">27,576.0 km/h</td>
                <td className="p-2 font-mono">17,135.0 mph</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Earth Orbital Revolution</td>
                <td className="p-2 font-mono">29,780.0 m/s</td>
                <td className="p-2 font-mono">107,208.0 km/h</td>
                <td className="p-2 font-mono">66,616.0 mph</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Step-by-Step Worked Kinematic Example */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          5. Step-by-Step Worked Kinematics Problem
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2 font-mono text-xs">
          <p className="font-sans font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
            <strong>Problem:</strong> A marathon runner completes a 26.21875-mile (42.195 km) race in exactly 3 hours, 15 minutes, and 30 seconds. Calculate their average speed in mph, km/h, and their average pace per mile and per kilometer.
          </p>

          <p><strong>Step 1: Convert Elapsed Time to Decimal Hours and Seconds</strong><br />
          {"Total Seconds = (3 × 3600) + (15 × 60) + 30 = 10,800 + 900 + 30 = 11,730 seconds"}<br />
          {"Total Hours   = 11,730 / 3600 = 3.25833 hours"}</p>

          <p><strong>Step 2: Calculate Speed (mph and km/h)</strong><br />
          {"Speed_mph  = 26.21875 miles / 3.25833 hours = 8.0466 mph ≈ 8.05 mph"}<br />
          {"Speed_kmh  = 42.195 km / 3.25833 hours = 12.950 km/h"}</p>

          <p><strong>Step 3: Calculate Mile Pace and Kilometer Pace</strong><br />
          {"Pace_mile  = (11,730 s / 26.21875 mi) = 447.39 s/mile = 7 minutes 27 seconds per mile (7:27 /mi)"}<br />
          {"Pace_km    = (11,730 s / 42.195 km) = 277.99 s/km = 4 minutes 38 seconds per km (4:38 /km)"}</p>
        </div>
      </section>
    </div>
  );
}

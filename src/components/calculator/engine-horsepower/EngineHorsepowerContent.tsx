"use client";

import React from "react";

export function EngineHorsepowerContent() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-800 dark:text-zinc-200">
      {/* SECTION 1 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 pb-2">
          1. What is Engine Horsepower? (Origins &amp; Physics)
        </h2>
        <p>
          In automotive engineering and atmospheric physics, <strong>horsepower (HP)</strong> is the standard unit of measurement for mechanical power output—the rate at which work is performed by an internal combustion engine, electric motor, or hybrid drivetrain over time.
        </p>
        <p>
          The unit was originally coined in the late 18th century by Scottish inventor <strong>James Watt</strong> to evaluate the performance of his improved steam engine against draft horses. Watt determined experimentally that a heavy pit pony could lift an average of 22,000 foot-pounds of coal per minute. He conservatively scaled this figure by 50% for standard draft horses, establishing the universal engineering definition:
        </p>

        <div className="my-4 p-4 bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-blue-900 dark:text-blue-200 font-mono text-sm text-center font-bold shadow-xs rounded-xl">
          {"1 Mechanical Horsepower (HP) = 33,000 foot-pounds of work per minute = 550 ft-lb/sec = 745.7 Watts"}
        </div>

        <p>
          Fundamentally, mechanical power is derived from basic Newtonian work and time principles:
        </p>

        <div className="my-4 p-4 bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-blue-900 dark:text-blue-200 font-mono text-sm text-center font-bold shadow-xs rounded-xl">
          {"Power = Work / Time = (Force × Distance) / Time = Force × Velocity"}
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 pb-2">
          2. Mathematical Models for Estimating Horsepower
        </h2>
        <p>
          In performance automotive testing outside a fixed engine dynamometer cell, vehicle dynamics engineers rely on three empirical models to estimate power output:
        </p>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white">A. The Quarter-Mile Elapsed Time (ET) Formula</h3>
        <p>
          First derived by performance researchers Fox and Hale, this formula computes horsepower based on total vehicle race weight (W, in pounds) and quarter-mile sprint duration (ET, in seconds):
        </p>

        <div className="my-4 p-4 bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-blue-900 dark:text-blue-200 font-mono text-sm text-center font-bold shadow-xs rounded-xl">
          {"Horsepower = Weight (lbs) / (ET / 5.825)³"}
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white">B. The Quarter-Mile Trap Speed Formula</h3>
        <p>
          Because quarter-mile elapsed time is heavily influenced by tire spin, launch traction, and driver reaction times, <strong>finish-line trap speed</strong> offers a significantly more reliable reflection of raw engine horsepower:
        </p>

        <div className="my-4 p-4 bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-blue-900 dark:text-blue-200 font-mono text-sm text-center font-bold shadow-xs rounded-xl">
          {"Horsepower = Weight (lbs) × (Trap Speed (mph) / 234)³"}
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white">C. The Rotational Torque-to-Power Equation &amp; 5,252 Derivation</h3>
        <p>
          Internal combustion engines produce rotational torque (force around an axis). To convert rotational torque (T, in lb-ft) at a specific crankshaft engine speed (N, in RPM) into linear horsepower:
        </p>

        <div className="my-4 p-4 bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-blue-900 dark:text-blue-200 font-mono text-sm text-center font-bold shadow-xs rounded-xl">
          {"Horsepower = (Torque (lb-ft) × RPM) / 5,252.11"}
        </div>

        <p>
          The 5,252 constant is derived directly from James Watt&apos;s original standard (33,000 ft-lbs/min) divided by 2π radians per revolution:
        </p>

        <div className="my-4 p-4 bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-blue-900 dark:text-blue-200 font-mono text-sm text-center font-bold shadow-xs rounded-xl">
          {"Constant = (33,000 ft-lbs/min) / (2π rad/rev) = 33,000 / 6.2831853 = 5,252.113"}
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 pb-2">
          3. Gross HP vs. Net HP vs. Brake HP (BHP) vs. Wheel HP (WHP)
        </h2>
        <p>
          Automotive specifications utilize distinct terminology depending on where power is measured:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>SAE Gross Horsepower (Pre-1972):</strong> Power measured on a bare engine dyno stand without accessories, water pumps, alternators, exhaust headers, or air filter boxes attached.
          </li>
          <li>
            <strong>SAE Net Horsepower (1972–Present):</strong> Engine output standardized by SAE J1349, measured at the flywheel with all production accessories, factory exhaust manifolds, and intake systems operating.
          </li>
          <li>
            <strong>Brake Horsepower (BHP):</strong> Crankshaft flywheel power output measured via engine brake dyno absorbers.
          </li>
          <li>
            <strong>Wheel Horsepower (WHP):</strong> Actual usable power delivered to the pavement at the tires after overcoming driveline friction and rotational mass.
          </li>
        </ul>
      </section>

      {/* SECTION 4 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 pb-2">
          4. Drivetrain Parasitic Loss Dynamics
        </h2>
        <p>
          When power travels from the engine crankshaft to the drive tires, energy is lost to mechanical gear mesh friction, fluid churning inside torque converters, differential hypoid gear friction, and wheel bearing drag:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm text-left border-collapse border border-slate-200 dark:border-zinc-800">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white">
              <tr>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Drivetrain Configuration</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Average Parasitic Loss %</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">500 BHP Yield (WHP)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">Front-Wheel Drive (FWD) Manual</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">10% – 12%</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-mono">445 WHP</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">Rear-Wheel Drive (RWD) Manual</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">13% – 15%</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-mono">430 WHP</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">Rear-Wheel Drive (RWD) Torque Converter Auto</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">16% – 19%</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-mono">412 WHP</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">All-Wheel Drive (AWD / 4WD) Systems</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">20% – 25%</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-mono">390 WHP</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 5 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 pb-2">
          5. Forced Induction, Displacement &amp; Volumetric Efficiency (VE)
        </h2>
        <p>
          Naturally aspirated engines rely on atmospheric pressure to fill combustion chambers, achieving between 80% and 95% Volumetric Efficiency (VE). Forced induction systems (turbochargers and superchargers) compress ambient intake air above sea level pressure (14.7 PSI):
        </p>

        <div className="my-4 p-4 bg-slate-50 dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 font-mono text-sm text-center">
          {"Effective Compression Ratio = Static CR × √((Boost PSI + 14.7) / 14.7)"}
        </div>

        <p>
          Adding 14.7 PSI (1.0 Bar) of forced induction boost pressure doubles intake air density, theoretically doubling engine mass airflow capacity before thermal losses.
        </p>
      </section>

      {/* SECTION 6 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 pb-2">
          6. Track Testing Safety &amp; Methodology
        </h2>
        <p>
          When evaluating performance metrics on a quarter-mile drag strip, ensure that vehicle race weight reflects the exact total mass of the car, driver, payload, and fuel load (6.0 lbs per gallon for gasoline). Conduct all acceleration passes on certified drag strip facilities with approved safety equipment and proper tire pressure setup.
        </p>
      </section>
    </article>
  );
}

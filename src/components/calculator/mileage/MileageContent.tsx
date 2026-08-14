"use client";

import React from "react";

export function MileageContent() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-800 dark:text-zinc-200">
      {/* SECTION 1 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 pb-2">
          1. What is Vehicle Mileage &amp; Fuel Economy?
        </h2>
        <p>
          In automotive transportation and financial accounting, <strong>vehicle mileage</strong> refers to the measure of distance traveled relative to fuel or energy consumed. While commonly used interchangeably, <strong>fuel economy</strong> and <strong>fuel consumption</strong> express efficiency from inverse mathematical perspectives:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Fuel Economy (Distance-per-Volume):</strong> Measures how far a vehicle travels per unit of fuel consumed—typically expressed as <strong>Miles Per Gallon (MPG)</strong> in the United States and United Kingdom, or <strong>Kilometers per Liter (km/L)</strong> in Japan and Latin America. Higher numbers indicate superior efficiency.
          </li>
          <li>
            <strong>Fuel Consumption (Volume-per-Distance):</strong> Measures how much fuel a vehicle consumes over a fixed standardized distance—expressed as <strong>Liters per 100 Kilometers (L/100 km)</strong> across Continental Europe, Canada, and Australia, or <strong>Gallons per 100 Miles</strong>. Lower numbers indicate superior efficiency.
          </li>
        </ul>
      </section>

      {/* SECTION 2 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 pb-2">
          2. Mathematical Formulas &amp; Conversion Equations
        </h2>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white">A. Standard Gas Mileage Formulas</h3>
        <p>
          To compute fuel economy manually from trip distance and fuel volume added at the pump:
        </p>

        <div className="my-4 p-4 bg-slate-50 dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 font-mono text-sm text-center">
          {"US MPG = Distance Traveled (Miles) / Fuel Added (Gallons)"}
        </div>

        <div className="my-4 p-4 bg-slate-50 dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 font-mono text-sm text-center">
          {"L/100km = (Fuel Consumed (Liters) × 100) / Distance Traveled (Kilometers)"}
        </div>

        <div className="my-4 p-4 bg-slate-50 dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 font-mono text-sm text-center">
          {"Cost Per Mile ($/mi) = Fuel Price per Gallon ($/gal) / US MPG"}
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white">B. The &quot;MPG Illusion&quot; Explained</h3>
        <p>
          Because Miles Per Gallon (MPG) is non-linear relative to actual fuel volume consumed, drivers frequently fall victim to the <strong>MPG Illusion</strong>. A linear increase in MPG does not produce a linear reduction in fuel consumption:
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm text-left border-collapse border border-slate-200 dark:border-zinc-800">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white">
              <tr>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">MPG Upgrade Transition</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Fuel Used per 10,000 Miles</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Actual Fuel Saved</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-blue-600">15 MPG → 20 MPG (+5 MPG)</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-mono">666.7 gal → 500.0 gal</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-mono font-bold text-emerald-600">166.7 Gallons Saved</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">30 MPG → 35 MPG (+5 MPG)</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-mono">333.3 gal → 285.7 gal</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-mono">47.6 Gallons Saved</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">40 MPG → 50 MPG (+10 MPG)</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-mono">250.0 gal → 200.0 gal</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-mono">50.0 Gallons Saved</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Notice that upgrading a heavy truck from 15 to 20 MPG saves <strong>over 3 times more fuel</strong> per 10,000 miles than upgrading an efficient commuter car from 40 to 50 MPG!
        </p>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white">C. Global Unit Conversion Formula Constants</h3>
        <div className="my-4 p-4 bg-slate-50 dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 font-mono text-sm text-center">
          {"L/100km = 235.215 / US MPG = 282.481 / UK MPG"}
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 pb-2">
          3. The Tank-to-Tank Measurement Method (Step-by-Step)
        </h2>
        <p>
          While modern vehicle digital dashboards report real-time mileage estimates based on engine fuel injector pulse durations, manual <strong>tank-to-tank fill-up recording</strong> remains the gold standard for verified fuel logging:
        </p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Step 1 (Initial Fill):</strong> Fill your vehicle&apos;s fuel tank completely until the automatic fuel pump nozzle clicks off. Record the baseline odometer reading or reset your trip odometer to zero.
          </li>
          <li>
            <strong>Step 2 (Normal Operation):</strong> Drive the vehicle under normal daily commuting and highway conditions until the fuel level drops to roughly a quarter tank.
          </li>
          <li>
            <strong>Step 3 (Refill &amp; Record):</strong> Return to the gas station, fill the tank completely using the same pump shut-off setting, and record the exact gallons/Liters added on the pump receipt.
          </li>
          <li>
            <strong>Step 4 (Division):</strong> Divide the trip odometer distance by the exact volume of fuel added.
          </li>
        </ol>
      </section>

      {/* SECTION 4 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 pb-2">
          4. Key Mechanical &amp; Environmental Factors Influencing Mileage
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Tire Inflation Pressure:</strong> Underinflated tires deform against the pavement, increasing rolling resistance. For every 1 PSI drop below factory placard pressure across all four tires, fuel economy decreases by 0.2% to 0.3%.
          </li>
          <li>
            <strong>Aerodynamics &amp; Highway Velocity:</strong> Aerodynamic drag increases exponentially with the square of velocity. Above 55 mph, engine power is primarily expended overcoming air resistance, causing fuel economy to drop by 7% to 25% at 65–80 mph.
          </li>
          <li>
            <strong>Air Conditioning vs. Window Drag Crossover:</strong> Driving with open windows creates aerodynamic turbulence at high speeds. Below 45 mph, open windows are more efficient than running AC; above 45–50 mph, closed windows with AC operating yields superior fuel economy.
          </li>
        </ul>
      </section>

      {/* SECTION 5 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 pb-2">
          5. Business Mileage &amp; Tax Deduction Regulations
        </h2>
        <p>
          Tax authorities (such as the Internal Revenue Service in the US) allow self-employed individuals, independent contractors, and business owners to deduct vehicle operating expenses using the <strong>Standard Mileage Rate</strong> ($0.67 per mile for business travel):
        </p>

        <div className="my-4 p-4 bg-slate-50 dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 font-mono text-sm text-center">
          {"Tax Reimbursement Claim ($) = Qualifying Business Miles Driven × Standard Allowance Rate ($/mi)"}
        </div>
      </section>

      {/* SECTION 6 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 pb-2">
          6. Electric Vehicle Mileage (MPGe) &amp; Energy Efficiency
        </h2>
        <p>
          To compare electric vehicles (EVs) with traditional gas-powered cars, the Environmental Protection Agency (EPA) established <strong>Miles Per Gallon Equivalent (MPGe)</strong> based on thermal energy equivalency:
        </p>

        <div className="my-4 p-4 bg-slate-50 dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 font-mono text-sm text-center">
          {"1 Gallon of Gasoline Thermal Energy = 33.7 Kilowatt-Hours (kWh) of Electricity"}
        </div>
      </section>
    </article>
  );
}

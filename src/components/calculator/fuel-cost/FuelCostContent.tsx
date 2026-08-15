"use client";

import React from "react";

export function FuelCostContent() {
  return (
    <article className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-8 py-2">
      {/* SECTION 1: THE MATHEMATICS OF FUEL CONSUMPTION & COST */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          1. The Mathematics of Fuel Consumption &amp; Cost
        </h2>
        <p>
          Calculating vehicle fuel expenses involves evaluating the relationship between trip distance, engine efficiency, and fuel unit pricing:
        </p>

        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-sans tabular-nums text-xs my-2 text-center text-emerald-700 dark:text-emerald-300 font-bold overflow-x-auto">
          Fuel Needed (Gallons) = Trip Distance (Miles) / Fuel Efficiency (MPG)
        </div>

        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-sans tabular-nums text-xs my-2 text-center text-sky-700 dark:text-sky-300 font-bold overflow-x-auto">
          Fuel Needed (Liters) = Distance (km) × [ (L/100km) / 100 ]
        </div>

        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-sans tabular-nums text-xs my-2 text-center text-amber-700 dark:text-amber-300 font-bold overflow-x-auto">
          Total Cost = Fuel Needed × Price Per Unit + Tolls + Parking
        </div>

        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-sans tabular-nums text-xs my-2 text-center text-purple-700 dark:text-purple-300 font-bold overflow-x-auto">
          Cost Per Mile ($/mi) = Fuel Price Per Gallon / Vehicle MPG
        </div>
      </section>

      {/* SECTION 2: IMPERIAL VS. METRIC FUEL ECONOMY CONVERSION DYNAMICS */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          2. Imperial vs. Metric Fuel Economy Conversion Dynamics (The "MPG Illusion")
        </h2>
        <p>
          Miles Per Gallon (MPG) is a <em>distance-per-volume</em> metric, whereas Liters per 100 Kilometers (L/100km) is a <em>volume-per-distance</em> metric. This fundamental difference causes the non-linear relationship known as the <strong>MPG Illusion</strong>:
        </p>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Replacing a 14 MPG gas guzzler with a 20 MPG vehicle saves far more fuel over 10,000 miles (214 gallons saved) than replacing a 35 MPG car with a 50 MPG hybrid (85 gallons saved), even though both represent a 15 MPG numerical improvement.
        </p>

        <div className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-xl space-y-1 text-xs">
          <h3 className="font-bold text-emerald-900 dark:text-emerald-200">Exact Mathematical Conversion Constants</h3>
          <p className="font-sans tabular-nums text-emerald-700 dark:text-emerald-300 font-bold">
            L/100km = 235.215 / US MPG &nbsp;|&nbsp; L/100km = 282.481 / UK Imperial MPG
          </p>
        </div>
      </section>

      {/* SECTION 3: AERODYNAMICS, SPEED & DRIVING PHYSICS */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          3. Aerodynamics, Speed &amp; Driving Physics
        </h2>
        <p>
          Aerodynamic drag force increases with the square of velocity (\(F_d \propto v^2\)), meaning engine power required to overcome air resistance increases with the cube of velocity. Fuel economy drops significantly at speeds above 55 mph (90 km/h):
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-sans tabular-nums">
          <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <div className="font-bold">60 mph</div>
            <div className="text-emerald-600 font-bold">-3% MPG</div>
          </div>
          <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <div className="font-bold">65 mph</div>
            <div className="text-yellow-600 font-bold">-8% MPG</div>
          </div>
          <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <div className="font-bold">70 mph</div>
            <div className="text-amber-600 font-bold">-17% MPG</div>
          </div>
          <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <div className="font-bold">75 mph</div>
            <div className="text-rose-600 font-bold">-23% MPG</div>
          </div>
          <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <div className="font-bold">80 mph</div>
            <div className="text-purple-600 font-bold">-28% MPG</div>
          </div>
        </div>
      </section>

      {/* SECTION 4: 10 ACTIONABLE VEHICLE OPTIMIZATION TIPS */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          4. Actionable Vehicle Optimization &amp; Fuel Saving Tips
        </h2>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          <li><strong>Maintain Correct Tire Inflation:</strong> Underinflated tires increase rolling resistance, losing 0.2% to 0.3% efficiency per 1 PSI drop.</li>
          <li><strong>Remove Empty Roof Cargo Racks:</strong> Parasitic drag from roof cargo boxes penalizes highway fuel economy by 10% to 25%.</li>
          <li><strong>Air Conditioning vs. Open Windows:</strong> Use open windows at city speeds under 45 mph; use AC at highway speeds over 50 mph to prevent window drag.</li>
          <li><strong>Eliminate Excess Trunk Weight:</strong> An extra 100 lbs (45 kg) reduces efficiency by ~1%.</li>
        </ul>
      </section>

      {/* SECTION 5: ELECTRIC VEHICLE (EV) VS. ICE COST PARITY */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          5. Electric Vehicle (EV) vs. Internal Combustion Engine (ICE) Cost Parity
        </h2>
        <p>
          Electric vehicles are 3 to 4 times more energy-efficient than internal combustion engines. Typical EV operating costs range from <strong>3¢ to 5¢ per mile</strong> ($0.14/kWh residential off-peak charging), compared to <strong>12¢ to 18¢ per mile</strong> for a 25 MPG gasoline car at $3.50/gallon.
        </p>
      </section>

      {/* SECTION 6: COMMERCIAL FLEET & BUSINESS TAX MILEAGE DEDUCTIONS */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          6. Commercial Fleet &amp; Business Tax Mileage Deductions
        </h2>
        <p>
          For business travel reimbursement, the IRS Standard Mileage Rate (e.g. 67¢ per mile for 2024) covers fuel, insurance, depreciation, and maintenance. Keeping an accurate digital log of trip distance, purpose, and fuel receipts ensures full tax compliance.
        </p>
      </section>
    </article>
  );
}

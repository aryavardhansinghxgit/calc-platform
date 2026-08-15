"use client";

import React from "react";

export function GasMileageContent() {
  return (
    <article className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-8 py-2">
      {/* SECTION 1: THE MATHEMATICS OF FUEL ECONOMY & GAS MILEAGE */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          1. The Mathematics of Fuel Economy &amp; Gas Mileage
        </h2>
        <p>
          Calculating vehicle fuel economy measures how efficiently your vehicle converts liquid fuel into distance traveled:
        </p>

        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-sans tabular-nums text-xs my-2 text-center text-sky-700 dark:text-sky-300 font-bold overflow-x-auto">
          US MPG = Miles Driven / Gallons Consumed
        </div>

        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-sans tabular-nums text-xs my-2 text-center text-teal-700 dark:text-teal-300 font-bold overflow-x-auto">
          L/100km = (Liters Consumed × 100) / Kilometers Driven
        </div>

        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-sans tabular-nums text-xs my-2 text-center text-amber-700 dark:text-amber-300 font-bold overflow-x-auto">
          Cost Per Mile ($/mi) = Gas Price Per Gallon / Vehicle MPG
        </div>

        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-sans tabular-nums text-xs my-2 text-center text-purple-700 dark:text-purple-300 font-bold overflow-x-auto">
          Distance Per Dollar = Miles Driven / Total Fuel Cost
        </div>
      </section>

      {/* SECTION 2: THE "MPG ILLUSION" & METRIC CONVERSION SCIENCE */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          2. The "MPG Illusion" &amp; Metric Conversion Science
        </h2>
        <p>
          Miles Per Gallon (MPG) is an inverse volume metric. Because MPG is non-linear relative to actual fuel consumption, consumers often misjudge fuel savings. This phenomenon is known in behavioral science as the <strong>MPG Illusion</strong>:
        </p>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Improving a heavy truck from 10 to 15 MPG saves 333 gallons of gas every 10,000 miles. Improving a compact car from 30 to 35 MPG saves only 48 gallons over the same distance! This is why Liters per 100km (L/100km) or Gallons per 1,000 miles is a more linear benchmark.
        </p>

        <div className="p-3.5 bg-sky-50/60 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900 rounded-xl space-y-1 text-xs">
          <h3 className="font-bold text-sky-900 dark:text-sky-200">Exact Conversion Constants</h3>
          <p className="font-sans tabular-nums text-sky-700 dark:text-sky-300 font-bold">
            L/100km = 235.215 / US MPG &nbsp;|&nbsp; L/100km = 282.481 / UK Imperial MPG
          </p>
        </div>
      </section>

      {/* SECTION 3: HOW TO ACCURATELY TRACK GAS MILEAGE AT THE PUMP */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          3. How to Accurately Track Gas Mileage at the Pump (Step-by-Step)
        </h2>
        <ol className="list-decimal pl-5 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          <li><strong>Step 1:</strong> Fill your fuel tank completely until the gas pump automatic shut-off nozzle clicks off.</li>
          <li><strong>Step 2:</strong> Reset your trip odometer to zero (or record your exact starting master odometer reading).</li>
          <li><strong>Step 3:</strong> Drive normally until your fuel tank is at least half empty.</li>
          <li><strong>Step 4:</strong> Refill your tank completely at the same gas station and pump if possible. Record exact gallons/liters added and miles/km driven.</li>
          <li><strong>Step 5:</strong> Divide total miles driven by gallons added. To eliminate single-tank pump shut-off variances, use a rolling 3-tank average.</li>
        </ol>
      </section>

      {/* SECTION 4: KEY FACTORS AFFECTING REAL-WORLD GAS MILEAGE */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          4. Key Factors Affecting Real-World Gas Mileage
        </h2>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          <li><strong>Aerodynamic Drag &amp; Speed:</strong> Air resistance increases exponentially above 50–55 mph, causing fuel economy to drop by 7% to 25% at highway speeds of 65–80 mph.</li>
          <li><strong>Tire Pressure:</strong> Underinflated tires increase rolling resistance, reducing fuel economy by 0.2% to 0.3% per 1 PSI drop across all four tires.</li>
          <li><strong>Vehicle Weight &amp; Parasitic Drag:</strong> Carrying 100 lbs of extra trunk cargo reduces MPG by ~1%. Roof boxes and bike racks add significant parasitic drag.</li>
          <li><strong>Seasonal Winter Blends:</strong> Winter-blend gasoline contains higher butane content (lower energy density per gallon), causing a 2% to 8% drop in cold weather mileage.</li>
        </ul>
      </section>

      {/* SECTION 5: DRIVING TECHNIQUES TO MAXIMIZE MPG (HYPER-MILING) */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          5. Driving Techniques to Maximize MPG (Hyper-Miling Strategies)
        </h2>
        <p>
          Adopting smooth driving habits can boost fuel economy by 15% to 30% in city driving:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          <li><strong>Smooth Acceleration &amp; Anticipatory Braking:</strong> Avoid jackrabbit starts and coast to red lights.</li>
          <li><strong>Optimal Highway Speed:</strong> Cruise between 55 and 65 mph using cruise control on flat terrain.</li>
          <li><strong>Minimize Idling:</strong> Idling burns 0.2 to 0.5 gallons of fuel per hour yielding 0.0 MPG.</li>
        </ul>
      </section>

      {/* SECTION 6: FLEET MILEAGE TRACKING & TAX DEDUCTIONS */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          6. Fleet Mileage Tracking &amp; Tax Deductions
        </h2>
        <p>
          For business travel reimbursement, taxpayers can choose between the IRS Standard Mileage Rate (e.g. 67¢/mile for 2024) or the Actual Expense Method. Maintaining a continuous mileage log with date, destination, business purpose, and odometer readings ensures complete tax compliance during audits.
        </p>
      </section>
    </article>
  );
}

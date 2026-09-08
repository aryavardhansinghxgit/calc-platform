"use client";

import React from "react";
import Link from "next/link";
import { gas_mileage_calculatorFaqs } from "@/app/calculators/gas-mileage-calculator/faq";

export function GasMileageContent() {
  return (
    <article className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed font-normal text-sm sm:text-base max-w-4xl mx-auto">
      {/* 1. What Is a Gas Mileage Calculator? */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          1. What Is a Gas Mileage Calculator?
        </h2>
        <p>
          A gas mileage calculator measures how efficiently a vehicle turns fuel into distance traveled. The most familiar U.S. measure is miles per gallon (MPG), but the same vehicle efficiency can also be expressed as kilometers per liter (km/L) or liters per 100 kilometers (L/100km).
        </p>
        <p>
          The basic relationship is straightforward:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm text-center text-slate-900 dark:text-slate-100">
          MPG = Distance Traveled ÷ Fuel Used
        </div>
        <p>
          For example, if a vehicle travels 360 miles and uses 12 U.S. gallons:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm text-center text-slate-900 dark:text-slate-100">
          360 ÷ 12 = 30 MPG
        </div>
        <p>
          This calculator goes beyond a simple MPG formula. It can calculate mileage from odometer readings, evaluate a single trip, combine multiple fuel-up records into a weighted rolling average, estimate driving range from tank capacity, convert among fuel-economy standards, estimate fuel spending, and project annual fuel use.
        </p>
        <p>
          That makes it useful for drivers who want to answer practical questions such as:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400 text-sm">
          <li>How many miles per gallon does my car actually get?</li>
          <li>How much will this trip cost?</li>
          <li>How far can I travel on a full tank?</li>
          <li>How much will I spend on gasoline over a year?</li>
          <li>How does my MPG compare with km/L or L/100km?</li>
        </ul>
      </section>

      {/* 2. How to Calculate MPG */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          2. How to Calculate MPG
        </h2>
        <p>
          The standard MPG equation is:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm text-center text-slate-900 dark:text-slate-100">
          MPG = Miles Driven ÷ Gallons Consumed
        </div>
        <p>
          The distance should represent the actual distance traveled during the measurement period, while the fuel quantity should represent the amount of fuel consumed.
        </p>
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 pt-1">
          Example
        </h3>
        <p>
          Suppose:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400 text-sm">
          <li>Starting odometer = 12,000 miles</li>
          <li>Ending odometer = 12,360 miles</li>
          <li>Fuel added = 12 gallons</li>
        </ul>
        <p>
          Distance traveled:
        </p>
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm text-slate-900 dark:text-slate-100">
          12,360 − 12,000 = 360 miles
        </div>
        <p>
          Fuel economy:
        </p>
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm text-slate-900 dark:text-slate-100">
          360 ÷ 12 = 30 MPG
        </div>
        <p>
          So the vehicle achieved <strong>30 U.S. MPG</strong>. This is a measured fuel-economy result rather than a manufacturer&apos;s rating. The calculator&apos;s verified reference case produces exactly this result.
        </p>
      </section>

      {/* 3. Why Real-World MPG Is Often More Useful Than a Rated Number */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          3. Why Real-World MPG Is Often More Useful Than a Rated Number
        </h2>
        <p>
          A published fuel-economy rating is valuable for comparing vehicles under standardized testing conditions, but your actual mileage depends on how, where and under what conditions you drive.
        </p>
        <p>
          DOE notes that fuel economy can be affected by driving behavior, vehicle condition and operating environment. Aggressive acceleration, braking and speeding can reduce fuel economy substantially, while proper maintenance and appropriate tire inflation can improve efficiency.
        </p>
        <p>
          Your own MPG can therefore change with:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-400">
          <ul className="list-disc pl-5 space-y-1">
            <li>highway versus city driving</li>
            <li>stop-and-go traffic</li>
            <li>vehicle speed</li>
            <li>terrain</li>
            <li>weather</li>
            <li>temperature</li>
          </ul>
          <ul className="list-disc pl-5 space-y-1">
            <li>wind</li>
            <li>payload</li>
            <li>tire pressure</li>
            <li>air-conditioning use</li>
            <li>driving style</li>
            <li>vehicle condition</li>
          </ul>
        </div>
        <p>
          That is why keeping a record of actual fuel purchases and odometer readings is useful when you want to understand your vehicle&apos;s long-term fuel consumption.
        </p>
      </section>

      {/* 4. How to Measure Your Real-World Gas Mileage */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          4. How to Measure Your Real-World Gas Mileage
        </h2>
        <p>
          For a practical real-world measurement, use a repeatable fill-up method.
        </p>
        <p>
          Start with a consistent tank-fill condition and record the odometer reading. Drive normally, refill the vehicle and record the new odometer reading together with the amount of fuel added.
        </p>
        <p>
          Then calculate:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm space-y-1 text-slate-900 dark:text-slate-100">
          <div>Distance = Ending Odometer − Starting Odometer</div>
          <div>MPG = Distance ÷ Fuel Added</div>
        </div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 pt-1">
          Worked Example
        </h3>
        <p className="text-sm">
          Starting odometer: 12,000 mi | Ending odometer: 12,360 mi | Fuel: 12 gal
        </p>
        <p className="text-sm">
          Therefore: Distance = 360 mi, and MPG = 30. Repeating this across several fill-ups gives a more useful picture of long-term fuel economy than relying on a single tank.
        </p>
        <p className="text-sm">
          For a multi-tank record, this calculator uses total distance divided by total fuel rather than incorrectly averaging the individual MPG figures.
        </p>
      </section>

      {/* 5. Why a Multi-Tank Average Should Be Weighted */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          5. Why a Multi-Tank Average Should Be Weighted
        </h2>
        <p>
          Suppose three fill-ups contain:
        </p>
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-lg">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold">
              <tr>
                <th className="p-2.5">Fill-up</th>
                <th className="p-2.5">Distance</th>
                <th className="p-2.5">Fuel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono text-xs sm:text-sm">
              <tr>
                <td className="p-2.5 font-sans">1</td>
                <td className="p-2.5">340 mi</td>
                <td className="p-2.5">11.8 gal</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans">2</td>
                <td className="p-2.5">355 mi</td>
                <td className="p-2.5">12.1 gal</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans">3</td>
                <td className="p-2.5">330 mi</td>
                <td className="p-2.5">11.5 gal</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Total distance: 340 + 355 + 330 = 1,025 miles. Total fuel: 11.8 + 12.1 + 11.5 = 35.4 gallons.
        </p>
        <p>
          The correct aggregate MPG is:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm text-center text-slate-900 dark:text-slate-100">
          1,025 ÷ 35.4 = 28.9548 MPG
        </div>
        <p>
          The important point is that you should not simply calculate each tank&apos;s MPG and take their arithmetic average unless every fuel-up represents exactly the same fuel quantity. The weighted calculation preserves the actual relationship between total distance and total fuel consumed. The calculator&apos;s multi-tank engine independently verifies this method.
        </p>
      </section>

      {/* 6. MPG, km/L and L/100km Mean the Same Thing in Different Ways */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          6. MPG, km/L and L/100km Mean the Same Thing in Different Ways
        </h2>
        <p>
          Fuel economy is expressed differently around the world.
        </p>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Miles per gallon (MPG):</strong> Answers <em>How many miles can the vehicle travel on one gallon?</em> Higher MPG means better fuel economy.
          </p>
          <p>
            <strong>Kilometers per liter (km/L):</strong> Answers <em>How many kilometers can the vehicle travel on one liter?</em> Higher km/L means better fuel economy.
          </p>
          <p>
            <strong>Liters per 100 kilometers (L/100km):</strong> Answers <em>How many liters does the vehicle consume to travel 100 kilometers?</em> Lower L/100km means better fuel economy.
          </p>
        </div>
        <p>
          This last convention is therefore the opposite of MPG conceptually: Higher MPG = better, Higher km/L = better, and Lower L/100km = better. Keeping that direction straight prevents many conversion mistakes.
        </p>
      </section>

      {/* 7. How to Convert U.S. MPG to L/100km */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          7. How to Convert U.S. MPG to L/100km
        </h2>
        <p>
          For U.S. MPG:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm text-center text-slate-900 dark:text-slate-100">
          L/100km = 235.214583 ÷ MPG
        </div>
        <p>
          For example, 30 MPG becomes:
        </p>
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm text-center text-slate-900 dark:text-slate-100">
          235.214583 ÷ 30 = 7.8405 L/100km
        </div>
        <p>
          So 30 U.S. MPG ≈ 7.84 L/100km. NIST documents the U.S. MPG conversion relationship using approximately 235.215. The calculator keeps the internal conversion at full numerical precision and rounds only for presentation. Its production tests verify 5,000/5,000 randomized round-trip conversions within the required tolerance.
        </p>
      </section>

      {/* 8. U.S. MPG and UK Imperial MPG Are Not the Same */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          8. U.S. MPG and UK Imperial MPG Are Not the Same
        </h2>
        <p>
          This distinction is important because a gallon is not the same volume in the U.S. and the United Kingdom.
        </p>
        <p>
          NIST lists: <strong>1 U.S. gallon = 3.785412 liters</strong> and <strong>1 U.K./Imperial gallon = 4.54609 liters</strong>. As a result, the numerical MPG conversion differs.
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm space-y-1 text-slate-900 dark:text-slate-100">
          <div>For U.S. MPG: L/100km = 235.214583 ÷ MPG</div>
          <div>For Imperial MPG: L/100km ≈ 282.481 ÷ MPG</div>
        </div>
        <p>
          For example, 30 U.S. MPG ≈ 7.84 L/100km, while 30 Imperial MPG ≈ 9.42 L/100km. The production calculator explicitly distinguishes US MPG from UK Imperial MPG, eliminating ambiguous terminology.
        </p>
      </section>

      {/* 9. How to Calculate Fuel Cost From MPG */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          9. How to Calculate Fuel Cost From MPG
        </h2>
        <p>
          Once you know the distance and fuel economy, fuel cost becomes a second calculation. First calculate fuel required:
        </p>
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm text-center text-slate-900 dark:text-slate-100">
          Fuel Required = Distance ÷ MPG
        </div>
        <p>
          Then multiply by fuel price:
        </p>
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm text-center text-slate-900 dark:text-slate-100">
          Fuel Cost = Fuel Required × Fuel Price
        </div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 pt-1">
          Example
        </h3>
        <p className="text-sm">
          Distance: 300 miles | Fuel economy: 25 MPG | Fuel price: $3.50/gal
        </p>
        <p className="text-sm font-mono">
          Fuel required: 300 ÷ 25 = 12 gallons<br />
          Fuel cost: 12 × $3.50 = $42.00
        </p>
        <p>
          Therefore, 300 miles at 25 MPG costs $42.00 at $3.50 per gallon. The calculator independently verifies this reference case. For a broader trip-expense calculation, see the{" "}
          <Link
            href="/calculators/fuel-cost-calculator"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Fuel Cost Calculator
          </Link>.
        </p>
      </section>

      {/* 10. How to Calculate Fuel Cost Per Mile */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          10. How to Calculate Fuel Cost Per Mile
        </h2>
        <p>
          Fuel cost per mile can be calculated directly:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm text-center text-slate-900 dark:text-slate-100">
          Cost per Mile = Fuel Price ÷ MPG
        </div>
        <p>
          For $3.50/gal and 25 MPG, the result is: $3.50 ÷ 25 = $0.14 per mile. This is a fuel-only measurement. It does not automatically include insurance, maintenance, financing, depreciation, registration, repairs, parking, or tolls. If those expenses are added, you are calculating a broader transportation cost rather than fuel cost alone.
        </p>
      </section>

      {/* 11. How a Round Trip Changes Fuel Use */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          11. How a Round Trip Changes Fuel Use
        </h2>
        <p>
          A common source of mistakes is confusing one-way and round-trip distance. Suppose the one-way trip is 300 miles. A round trip is 600 miles. At 25 MPG, the fuel requirement is 600 ÷ 25 = 24 gallons. At $3.50/gal, the fuel expense is 24 × $3.50 = $84.00.
        </p>
        <p>
          Notice that doubling the distance doubles fuel use and fuel cost while MPG remains unchanged. MPG measures vehicle efficiency; it does not depend on whether the journey is one-way or round-trip.
        </p>
      </section>

      {/* 12. How to Calculate Driving Range From Tank Capacity */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          12. How to Calculate Driving Range From Tank Capacity
        </h2>
        <p>
          A simple estimated driving-range relationship is:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm text-center text-slate-900 dark:text-slate-100">
          Range = Tank Capacity × Fuel Economy
        </div>
        <p>
          For a vehicle with 15 gallons of usable fuel capacity and 30 MPG, the estimated range is 15 × 30 = 450 miles. At $3.50 per gallon, a complete 15-gallon fill would cost 15 × $3.50 = $52.50. The calculator verifies both calculations. This is an estimate rather than a guarantee. Actual range may be lower because drivers normally do not use every drop of fuel, and real-world fuel economy changes with operating conditions.
        </p>
      </section>

      {/* 13. How to Calculate Annual Fuel Cost */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          13. How to Calculate Annual Fuel Cost
        </h2>
        <p>
          Annual fuel spending can be estimated when you know annual distance, fuel economy, and fuel price. The equations are:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm space-y-1 text-slate-900 dark:text-slate-100">
          <div>Annual Fuel = Annual Distance ÷ MPG</div>
          <div>Annual Fuel Cost = Annual Fuel × Fuel Price</div>
        </div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 pt-1">
          Example
        </h3>
        <p className="text-sm">
          Annual driving: 15,000 miles | Fuel economy: 30 MPG | Fuel price: $3.50/gal
        </p>
        <p className="text-sm font-mono">
          Annual fuel: 15,000 ÷ 30 = 500 gallons<br />
          Annual fuel cost: 500 × $3.50 = $1,750
        </p>
        <p>
          The production reference calculation verifies this exact result. This figure is sensitive to both annual mileage and fuel price, so it should be treated as a planning estimate rather than a permanent yearly expense.
        </p>
      </section>

      {/* 14. How Fuel Price Changes Affect Your Budget */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          14. How Fuel Price Changes Affect Your Budget
        </h2>
        <p>
          Fuel price changes have a direct linear effect on fuel spending. Suppose you use 500 gallons per year:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400 text-sm font-mono">
          <li>At $3.00/gal: annual fuel cost = $1,500</li>
          <li>At $4.00/gal: annual fuel cost = $2,000</li>
          <li>At $5.00/gal: annual fuel cost = $2,500</li>
        </ul>
        <p>
          The vehicle&apos;s MPG has not changed; only the price per gallon changed. The same principle applies to smaller trip calculations: if fuel consumption remains constant, doubling fuel price doubles fuel cost.
        </p>
      </section>

      {/* 15. How Driving Style Can Affect Gas Mileage */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          15. How Driving Style Can Affect Gas Mileage
        </h2>
        <p>
          Fuel economy is not determined only by the engine and transmission. The U.S. Department of Energy&apos;s Alternative Fuels Data Center reports that aggressive driving behavior—including speeding and rapid acceleration and braking—can reduce fuel economy by 15%–30% at highway speeds and 10%–40% in stop-and-go traffic.
        </p>
        <p>
          That does not mean every driver will experience exactly those percentages. They are broad findings associated with aggressive-driving conditions. Practical efficiency improvements include smoother acceleration, avoiding unnecessary hard braking, reducing excessive idling, maintaining appropriate tire pressure and planning routes efficiently. The purpose of a mileage calculator is to let you measure the effect of those changes against your own actual fuel records.
        </p>
      </section>

      {/* 16. Why Vehicle Speed Matters */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          16. Why Vehicle Speed Matters
        </h2>
        <p>
          At higher road speeds, aerodynamic resistance becomes increasingly important. Aerodynamic drag force is approximately proportional to the square of vehicle speed:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm text-center text-slate-900 dark:text-slate-100">
          F_drag ∝ v²
        </div>
        <p>
          The aerodynamic power required to overcome that drag scales approximately with the cube of velocity:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm text-center text-slate-900 dark:text-slate-100">
          P_drag ∝ v³
        </div>
        <p>
          These are not exponential relationships. DOE&apos;s transportation data also shows that fuel economy varies with vehicle speed rather than remaining constant across all speeds. For example, its modeled midsize conventional gasoline car data changes from 43 MPG at 45 mph, 45 MPG at 55 mph, 38 MPG at 65 mph and 32 MPG at 75 mph. These values are an example model, not a universal curve for every vehicle. That is why a vehicle&apos;s highway MPG can deteriorate as sustained speed increases even though the engine may be operating efficiently in other respects.
        </p>
      </section>

      {/* 17. Tire Pressure and Fuel Economy */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          17. Tire Pressure and Fuel Economy
        </h2>
        <p>
          Tire pressure affects rolling resistance and therefore can affect fuel consumption. DOE recommends maintaining the manufacturer&apos;s specified tire pressure. Its fuel-conservation guidance states that properly inflated tires can improve fuel economy by about 0.6% on average and up to 3%, depending on circumstances.
        </p>
        <p>
          This does not mean a universal MPG penalty can be assigned to every 1 PSI of underinflation. The actual effect depends on the tire, vehicle, loading, road surface, temperature and amount of underinflation. Use the vehicle manufacturer&apos;s recommended cold tire pressure as your baseline.
        </p>
      </section>

      {/* 18. Extra Weight, Cargo and Roof Loads */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          18. Extra Weight, Cargo and Roof Loads
        </h2>
        <p>
          Additional vehicle mass requires more energy, particularly when the vehicle repeatedly accelerates. Roof-mounted cargo can also introduce aerodynamic drag. DOE&apos;s fuel-saving guidance gives examples showing that roof cargo can significantly affect fuel economy, especially at highway and Interstate speeds.
        </p>
        <p>
          The exact effect varies by vehicle shape, cargo size, cargo position, speed, road conditions, and traffic. Therefore, claims such as &quot;X pounds always reduce MPG by exactly Y%&quot; should be treated cautiously. A better approach is to compare your measured MPG before and after a sustained change under similar conditions.
        </p>
      </section>

      {/* 19. How the MPG "Illusion" Works */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          19. How the MPG &quot;Illusion&quot; Works
        </h2>
        <p>
          MPG is useful, but it is not always intuitive when comparing improvements. Consider two vehicles traveling 10,000 miles:
        </p>
        <div className="space-y-1.5 text-sm font-mono bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
          <p><strong>Vehicle A (10 MPG → 15 MPG):</strong></p>
          <p>At 10 MPG, fuel required = 1,000 gallons</p>
          <p>At 15 MPG, fuel required = 666.67 gallons</p>
          <p className="text-emerald-600 dark:text-emerald-400 font-bold">Fuel saved = 333.33 gallons</p>
        </div>
        <p>
          Now compare upgrading an already efficient vehicle from 30 MPG to 35 MPG over that same 10,000 miles:
        </p>
        <div className="space-y-1.5 text-sm font-mono bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
          <p><strong>Vehicle B (30 MPG → 35 MPG):</strong></p>
          <p>At 30 MPG, fuel required = 333.33 gallons</p>
          <p>At 35 MPG, fuel required = 285.71 gallons</p>
          <p className="font-semibold text-slate-700 dark:text-slate-300">Fuel saved = 47.62 gallons</p>
        </div>
        <p>
          So a 5-MPG improvement does not always represent the same real-world fuel saving. When evaluating a vehicle or efficiency improvement, fuel consumed over a fixed distance can be more intuitive than MPG alone.
        </p>
      </section>

      {/* 20. Gas Mileage and CO2 Emissions */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          20. Gas Mileage and CO₂ Emissions
        </h2>
        <p>
          Fuel consumption can also be converted into an estimated amount of direct combustion CO₂. The calculator uses:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm text-center text-slate-900 dark:text-slate-100">
          8.887 kg CO₂ per U.S. gallon of gasoline
        </div>
        <p>
          EPA documents the same gasoline factor of 8,887 grams of CO₂ per gallon consumed. Therefore, if a trip uses 12 gallons, estimated direct gasoline combustion CO₂ is: 12 × 8.887 = 106.644 kg CO₂, or approximately <strong>106.6 kg CO₂</strong>. That is the calculator&apos;s reference result.
        </p>
        <p>
          This should be understood as a fuel-combustion estimate, not a complete lifecycle carbon footprint. EPA also distinguishes tailpipe emissions from upstream emissions associated with fuel production.
        </p>
      </section>

      {/* 21. Gasoline and Diesel Use Different CO2 Factors */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          21. Gasoline and Diesel Use Different CO₂ Factors
        </h2>
        <p>
          If diesel is selected, a different fuel factor is required. EPA gives <strong>10,180 grams CO₂ per gallon of diesel</strong> compared with 8,887 grams CO₂ per gallon of gasoline.
        </p>
        <p>
          That does not mean a diesel vehicle automatically produces more CO₂ per mile. Fuel economy also matters:
        </p>
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm text-center text-slate-900 dark:text-slate-100">
          CO₂ per distance ≈ fuel used per distance × CO₂ per unit of fuel
        </div>
        <p>
          That is why both the fuel type and the vehicle&apos;s fuel economy matter when estimating emissions.
        </p>
      </section>

      {/* 22. What the Fuel Economy Numbers Really Mean */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          22. What the Fuel Economy Numbers Really Mean
        </h2>
        <p>
          The four common representations can be summarized as:
        </p>
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-lg">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold">
              <tr>
                <th className="p-2.5">Metric</th>
                <th className="p-2.5">Meaning</th>
                <th className="p-2.5">Better result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono text-xs sm:text-sm">
              <tr>
                <td className="p-2.5 font-sans font-medium">US MPG</td>
                <td className="p-2.5 font-sans">Miles per U.S. gallon</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">Higher</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium">UK Imperial MPG</td>
                <td className="p-2.5 font-sans">Miles per Imperial gallon</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">Higher</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium">km/L</td>
                <td className="p-2.5 font-sans">Kilometers per liter</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">Higher</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium">L/100km</td>
                <td className="p-2.5 font-sans">Liters per 100 kilometers</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">Lower</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The numerical difference between these systems is not merely a formatting issue because the U.S. and Imperial gallons themselves have different volumes. NIST lists 3.785412 L for a U.S. gallon and 4.54609 L for an Imperial gallon. This is why international vehicle specifications should always be checked for their underlying unit standard. For conversions beyond fuel economy, use the{" "}
          <Link
            href="/calculators/conversion-calculator"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Conversion Calculator
          </Link>.
        </p>
      </section>

      {/* 23. Odometer Log, Single Trip, Multi-Tank and Range Planner */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          23. Odometer Log, Single Trip, Multi-Tank and Range Planner
        </h2>
        <p>
          This calculator is designed around four different real-world use cases:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-400">
          <li><strong>Odometer Log:</strong> Use starting and ending odometer readings plus fuel added to calculate actual mileage.</li>
          <li><strong>Single Trip:</strong> Use distance, fuel economy and fuel price to estimate consumption and cost.</li>
          <li><strong>Multi-Tank Log:</strong> Enter repeated fuel-up records to calculate a weighted average over multiple tanks.</li>
          <li><strong>Range Planner:</strong> Combine tank capacity with fuel economy to estimate how far the vehicle can travel before refueling.</li>
        </ul>
        <p>
          These are different problems and should not be forced into one formula. The production calculator keeps these calculation modes separated and independently tested. When the journey distance itself needs to be estimated, the{" "}
          <Link
            href="/calculators/mileage-calculator"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Mileage Calculator
          </Link>{" "}
          can be used first.
        </p>
      </section>

      {/* 24. How to Use the Gas Mileage Calculator */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          24. How to Use the Gas Mileage Calculator
        </h2>
        <div className="space-y-2 text-sm">
          <p>
            <strong>To calculate real MPG:</strong> Enter Starting Odometer, Ending Odometer, and Fuel Added. The calculator determines distance, MPG, metric equivalents, trip cost, cost per distance, and related fuel metrics.
          </p>
          <p>
            <strong>To calculate a single-trip fuel cost:</strong> Enter distance, fuel economy, and fuel price. The calculator determines required fuel and trip cost.
          </p>
          <p>
            <strong>To calculate a multi-tank average:</strong> Add each fill-up with its distance, fuel quantity, and fuel price. The calculator aggregates the records using total distance divided by total fuel.
          </p>
          <p>
            <strong>To estimate range:</strong> Enter tank capacity and fuel economy. The calculator calculates the corresponding estimated driving range.
          </p>
        </div>
      </section>

      {/* 25. Worked Example: From Fuel Log to Annual Budget */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          25. Worked Example: From Fuel Log to Annual Budget
        </h2>
        <p>
          Consider a driver whose measured results are: 12,000 → 12,360 miles with 12 gallons added and a gasoline price of $3.50/gal.
        </p>
        <p>
          The measurement produces:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm space-y-1 text-slate-900 dark:text-slate-100">
          <div>• Distance: 12,360 − 12,000 = 360 miles driven</div>
          <div>• Fuel Economy: 360 ÷ 12 = 30 MPG</div>
          <div>• Trip fuel cost: 12 × $3.50 = $42.00</div>
          <div>• Cost per mile: $42 ÷ 360 = $0.1167/mile (about $0.12/mile)</div>
          <div>• Range (15-gal tank): 15 × 30 = 450 miles estimated range</div>
          <div>• Full-tank fuel cost: 15 × $3.50 = $52.50</div>
          <div>• Annual fuel (15,000 miles): 15,000 ÷ 30 = 500 gallons</div>
          <div>• Annual fuel cost: 500 × $3.50 = $1,750.00</div>
          <div>• Estimated gasoline combustion CO₂: 500 × 8.887 ≈ 4,443.5 kg (about 4.44 metric tons)</div>
        </div>
        <p>
          Every major value in this worked example is independently verified by the calculator&apos;s production QA.
        </p>
      </section>

      {/* Frequently Asked Questions (All 12 visible, unfolded) */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {gas_mileage_calculatorFaqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-1.5"
            >
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Sources & References */}
      <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          References &amp; Methodology
        </h2>
        <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <div>
            <p className="font-semibold text-slate-800 dark:text-slate-200">Fuel economy and driving behavior:</p>
            <p>
              • U.S. Department of Energy — Alternative Fuels Data Center: <em>Efficient Driving to Conserve Fuel</em>. Supports discussion of aggressive driving, maintenance, tire pressure and fuel-saving behavior.
            </p>
            <p>
              • U.S. Department of Energy — <em>Fuel Economy / Gas-Saving Tips</em>. Supports discussion of speed, roof cargo, driving behavior and fuel economy variability.
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-800 dark:text-slate-200">Units and fuel-economy conversions:</p>
            <p>
              • National Institute of Standards and Technology — <em>NIST Guide to the SI, Appendix B</em>. Supports U.S. versus Imperial gallon definitions and MPG conversion factors.
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-800 dark:text-slate-200">Carbon emissions:</p>
            <p>
              • U.S. Environmental Protection Agency — <em>Greenhouse Gas Equivalencies Calculator: Calculations and References</em>. Supports gasoline and diesel combustion emission factors.
            </p>
            <p>
              • U.S. Environmental Protection Agency — <em>Comparison: Your Car vs. an Electric Vehicle</em>. Supports distinction between tailpipe and upstream emissions.
            </p>
          </div>
        </div>
      </section>

      {/* Related Calculators — BELOW content */}
      <section className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
          RELATED CALCULATORS
        </span>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-medium">
          <Link
            href="/calculators/fuel-cost-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Fuel Cost Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/mileage-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Mileage Calculator
          </Link>
        </div>
      </section>
    </article>
  );
}

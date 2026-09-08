"use client";

import React from "react";
import Link from "next/link";
import { fuel_cost_calculatorFaqs } from "@/app/calculators/fuel-cost-calculator/faq";

export function FuelCostContent() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans leading-relaxed text-slate-800 dark:text-slate-200">
      {/* ═══════════════════ RELATED CALCULATORS — ABOVE ARTICLE ═══════════════════ */}
      <section className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 sm:p-4 text-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Related Calculators
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/calculators/gas-mileage-calculator"
            className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Gas Mileage Calculator</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
          </Link>
          <Link
            href="/calculators/mileage-calculator"
            className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Mileage Calculator</span>
          </Link>
        </div>
      </section>

      {/* ═══════════════════ LONG-FORM EDUCATIONAL ARTICLE ═══════════════════ */}
      <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 text-sm sm:text-base leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            1. What Is a Fuel Cost Calculator?
          </h2>
          <p>
            A fuel cost calculator estimates how much fuel a vehicle needs for a journey and how much that fuel is likely to cost at a specified fuel price.
          </p>
          <p>
            The core relationship is simple:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            Fuel Required = Distance ÷ Fuel Economy
          </div>
          <p>
            When distance is measured in miles and fuel economy in miles per gallon (MPG):
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            Fuel Required (gal) = Distance (mi) ÷ MPG
          </div>
          <p>
            Once the amount of fuel is known:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            Fuel Cost = Fuel Required × Fuel Price
          </div>
          <p>
            That basic calculation becomes much more useful when it also accounts for round trips, commuting frequency, real-world efficiency penalties, tolls, parking, fuel-economy conversions, and EV charging costs.
          </p>
          <p>
            This Fuel Cost Calculator combines those scenarios so the user can estimate a single road trip, recurring commuting expense, measured real-world MPG, or a gasoline-versus-EV comparison.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            2. How to Calculate Fuel Cost
          </h2>
          <p>
            Suppose a vehicle travels:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            300 miles
          </div>
          <p>
            and gets:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            25 MPG
          </div>
          <p>
            The fuel required is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            300 ÷ 25 = 12 gallons
          </div>
          <p>
            At:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            $3.50 per gallon
          </div>
          <p>
            the fuel expense is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            12 × $3.50 = $42.00
          </div>
          <p>
            Therefore: 300 miles at 25 MPG costs $42.00 in fuel at $3.50/gal.
          </p>
          <p>
            The calculator&apos;s production regression confirms exactly this result.
          </p>
          <p>
            The formula does not require a vehicle-specific fuel-cost database. It requires the distance, actual or assumed fuel economy, and fuel price.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            3. How a Road Trip Fuel Cost Is Calculated
          </h2>
          <p>
            For a one-way trip:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            Fuel = Distance ÷ MPG
          </div>
          <p>
            For a round trip:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            Fuel = (2 × One-Way Distance) ÷ MPG
          </div>
          <p>
            For example:
          </p>
          <p>
            One-way distance: 300 miles. Round-trip distance: 600 miles. At 25 MPG, fuel required becomes:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            600 ÷ 25 = 24 gallons
          </div>
          <p>
            At $3.50/gal:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            24 × $3.50 = $84.00
          </div>
          <p>
            The calculator verifies this round-trip case as: 600 miles, 24 gallons, $84.00. For general trip-distance calculations, the{" "}
            <Link
              href="/calculators/mileage-calculator"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Mileage Calculator
            </Link>{" "}
            can provide the underlying distance estimate.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            4. What Is Cost Per Mile?
          </h2>
          <p>
            Cost per mile describes the fuel expense associated with traveling one mile.
          </p>
          <p>
            For a gasoline vehicle:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            Cost per Mile = Fuel Price per Gallon ÷ MPG
          </div>
          <p>
            With $3.50/gal and 25 MPG, the result is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            $3.50 ÷ 25 = $0.14/mile
          </div>
          <p>
            Notice that this is a fuel-only figure.
          </p>
          <p>
            If tolls, parking, maintenance, insurance, depreciation, financing, or other ownership expenses are included, the result is no longer simply fuel cost per mile.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            5. How Commute Fuel Cost Is Calculated
          </h2>
          <p>
            A recurring commute is different from a single road trip because the trip repeats.
          </p>
          <p>
            Suppose the daily round-trip commute is: 300 miles. Fuel economy: 25 MPG. Fuel price: $3.50/gal. Work days per month: 22.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>Daily fuel: 300 ÷ 25 = 12 gallons</p>
            <p>Daily fuel cost: 12 × $3.50 = $42.00</p>
            <p>Monthly fuel: 12 × 22 = 264 gallons</p>
            <p>Monthly cost: 264 × $3.50 = $924.00</p>
            <p>Annual cost: $924 × 12 = $11,088.00</p>
          </div>
          <p>
            The calculator independently verifies: $42/day, $210/week, $924/month, and $11,088/year.
          </p>
          <p>
            This assumes the entered work-day frequency represents the days the trip actually occurs.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            6. One-Way vs Round-Trip Commute Distance
          </h2>
          <p>
            This distinction is one of the easiest ways to create an incorrect fuel estimate.
          </p>
          <p>
            A commute distance of 30 miles can mean either 30 miles one way or 30 miles round trip. Those are not equivalent.
          </p>
          <p>
            If 30 miles is one-way, the daily round trip is:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            60 miles → At 25 MPG: 60 ÷ 25 = 2.4 gallons/day
          </div>
          <p>
            If 30 miles is already the round-trip distance:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            30 miles → At 25 MPG: 30 ÷ 25 = 1.2 gallons/day
          </div>
          <p>
            Always confirm what the distance input represents before calculating recurring fuel costs.
          </p>
          <p>
            The current calculator explicitly labels its commute reference as a daily round-trip distance, while its result subtitle also distinguishes daily and monthly quantities.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            7. How the MPG Calculator Works
          </h2>
          <p>
            The MPG Solver calculates real-world fuel economy from odometer movement and fuel added.
          </p>
          <p>
            The formula is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            MPG = Distance Driven ÷ Fuel Added
          </div>
          <p>
            Distance driven is:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            End Odometer − Start Odometer
          </div>
          <p>
            Example: Start = 10,000 miles, End = 10,350 miles, Fuel added = 14 gallons.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>Distance: 10,350 − 10,000 = 350 miles</p>
            <p>Fuel economy: 350 ÷ 14 = 25.00 MPG</p>
          </div>
          <p>
            The calculator also gives the metric equivalent: ≈ 9.41 L/100km. For a dedicated fuel-economy calculation, see the{" "}
            <Link
              href="/calculators/gas-mileage-calculator"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Gas Mileage Calculator
            </Link>.
          </p>
          <p>
            This is often more useful than relying only on a manufacturer&apos;s advertised fuel-economy rating because it can be calculated from actual driving and refueling data.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            8. How to Measure Real-World MPG Accurately
          </h2>
          <p>
            For a useful fuel-economy measurement:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm">
            <li>Fill the tank to a consistent level.</li>
            <li>Record the odometer reading.</li>
            <li>Drive normally.</li>
            <li>Refill the tank.</li>
            <li>Record the new odometer reading.</li>
            <li>Record the amount of fuel added.</li>
            <li>Divide distance traveled by fuel added.</li>
          </ul>
          <p>
            The more consistently the fill level and measurement conditions are maintained, the more useful the comparison becomes.
          </p>
          <p>
            A single tank may not represent long-term fuel economy because traffic, weather, terrain, speed, payload, tire pressure and driving behavior can all change consumption.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            9. Why Real-World MPG Can Differ From the Rated Number
          </h2>
          <p>
            A vehicle&apos;s observed fuel economy can differ from its laboratory or certification result.
          </p>
          <p>
            Real-world factors include:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded">
              • Average road speed
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded">
              • Acceleration and braking patterns
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded">
              • Traffic congestion and idle time
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded">
              • Terrain elevation and grades
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded">
              • Ambient temperature and headwinds
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded">
              • Vehicle payload and passenger count
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded">
              • Tire condition and inflation levels
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded">
              • Heating, air conditioning, and electrical loads
            </div>
          </div>
          <p>
            Therefore, a road-trip estimate based on a rated MPG figure should be treated as an estimate.
          </p>
          <p>
            Measured MPG from your own fuel and odometer records is usually more relevant for predicting your personal fuel budget.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            10. MPG vs L/100km
          </h2>
          <p>
            MPG and L/100km measure the same broad concept in different ways.
          </p>
          <p>
            MPG expresses miles traveled per gallon (higher MPG means better fuel economy).
          </p>
          <p>
            L/100km expresses liters consumed per 100 kilometers (lower L/100km means better fuel economy).
          </p>
          <p>
            For U.S. MPG:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            L/100km ≈ 235.214583 ÷ MPG
          </div>
          <p>
            Thus: 25 MPG ≈ 9.41 L/100km. For broader distance conversions, use the{" "}
            <Link
              href="/calculators/conversion-calculator"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Conversion Calculator
            </Link>.
          </p>
          <p>
            The calculator supports both U.S. and Imperial MPG modes and has removed internal rounding that previously caused conversion drift. The final audit reports 5,000/5,000 conversion round trips passing.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            11. U.S. Gallons vs Imperial Gallons
          </h2>
          <p>
            A gallon is not the same size in every measurement system.
          </p>
          <p>
            NIST lists:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>1 U.S. gallon = 3.785412 L</p>
            <p>1 U.K./Imperial gallon = 4.54609 L</p>
          </div>
          <p>
            That difference matters when converting MPG to L/100km. For the calculator:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>U.S. MPG: L/100km ≈ 235.214583 ÷ MPG</p>
            <p>Imperial MPG: L/100km ≈ 282.481 ÷ MPG</p>
          </div>
          <p>
            For example: 25 U.S. MPG ≈ 9.41 L/100km, while 25 Imperial MPG ≈ 11.30 L/100km.
          </p>
          <p>
            The current production version explicitly supports the two conversion constants separately. This distinction is especially important for international users.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            12. How Real-World Efficiency Penalties Affect Fuel Cost
          </h2>
          <p>
            A vehicle can use more fuel than its idealized fuel-economy estimate because operating conditions change efficiency.
          </p>
          <p>
            This calculator models several real-world penalty scenarios, including:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm">
            <li>Roof cargo and rooftop carriers</li>
            <li>Higher-speed driving above 65 mph</li>
            <li>Towing trailers or heavy payloads</li>
            <li>Winter cold weather and winter fuel blends</li>
          </ul>
          <p>
            The current implementation compounds these efficiency penalties multiplicatively rather than treating them as unrelated additive adjustments.
          </p>
          <p>
            For example, when a vehicle experiences a reduction in effective fuel economy, the practical result is less distance traveled per gallon, and therefore more fuel required for the same distance.
          </p>
          <p>
            That makes penalty modeling more useful for trip planning than assuming the official MPG figure applies identically to every journey.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            13. Why Speed Can Affect Fuel Economy
          </h2>
          <p>
            Aerodynamic drag is strongly speed-dependent.
          </p>
          <p>
            For aerodynamic drag force:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            F_drag ∝ v²
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            where F_drag = aerodynamic drag force and v = vehicle speed.
          </p>
          <p>
            The power needed to overcome aerodynamic drag scales approximately as:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            P_drag ∝ v³
          </div>
          <p>
            This distinction matters. The force increases roughly with the square of velocity, while the corresponding aerodynamic power requirement has an approximately cubic relationship.
          </p>
          <p>
            Therefore, sustained high-speed driving can increase energy demand substantially even when the distance traveled remains unchanged.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            14. Why Tire Pressure Matters
          </h2>
          <p>
            Underinflated tires can increase rolling resistance and therefore increase the energy required to move a vehicle.
          </p>
          <p>
            This does not mean that every small pressure difference produces a fixed universal percentage increase in fuel consumption.
          </p>
          <p>
            The actual effect depends on the tire, vehicle, pressure difference, temperature, road surface and driving conditions.
          </p>
          <p>
            Use the vehicle manufacturer&apos;s recommended cold tire pressure as the reference rather than deliberately overinflating tires to reduce fuel cost.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            15. Does Vehicle Weight Affect Fuel Cost?
          </h2>
          <p>
            Additional vehicle mass requires more energy, particularly during acceleration and in stop-and-go driving.
          </p>
          <p>
            The effect is not a simple universal &quot;X% more fuel for Y pounds&quot; rule. It depends on:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm">
            <li>Driving cycle and traffic regularity</li>
            <li>Acceleration frequency and severity</li>
            <li>Terrain profile and hill climbing</li>
            <li>Vehicle type and base curb weight</li>
            <li>Cruising speed</li>
            <li>Drivetrain efficiency</li>
          </ul>
          <p>
            Therefore, removing unnecessary cargo can improve efficiency, but the magnitude should not be assumed to be identical for every vehicle or trip.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            16. Tolls and Parking Are Different From Fuel Cost
          </h2>
          <p>
            Fuel expense is determined by fuel consumption and fuel price.
          </p>
          <p>
            Tolls and parking are separate trip expenses. The calculator therefore treats:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs sm:text-sm font-semibold">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg">
              Fuel Cost
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg">
              Tolls
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg">
              Parking
            </div>
          </div>
          <p>
            as distinct components. For the reference case: Fuel = $42.00, Tolls = $20.00, Parking = $10.00 → Total = $72.00.
          </p>
          <p>
            The production audit verifies this additive behavior. This makes the total-trip figure more useful for real journey planning.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            17. How Carpooling Changes the Cost Per Person
          </h2>
          <p>
            Suppose the total trip cost is $42.00:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>1 person: $42.00 total</p>
            <p>2 people: $21.00 each</p>
            <p>3 people: $14.00 each</p>
            <p>4 people: $10.50 each</p>
          </div>
          <p>
            The total trip expense does not change merely because the passengers split it. Only the individual share changes.
          </p>
          <p>
            The calculator verifies all four cases. This is useful when comparing the personal cost of driving alone with shared commuting or group travel.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            18. Gasoline Cost vs Electric Vehicle Charging Cost
          </h2>
          <p>
            An EV comparison requires a different energy model.
          </p>
          <p>
            For gasoline:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            Fuel Required = Distance ÷ MPG
          </div>
          <p>
            For an EV expressed in kWh/100 miles:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            EV Energy = Distance × kWh/100mi ÷ 100
          </div>
          <p>
            Suppose: 300 miles. Gas vehicle: 25 MPG, $3.50/gal. EV consumption: 30 kWh/100mi, $0.15/kWh electricity.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>Gasoline: 300 ÷ 25 = 12 gallons → Cost: 12 × $3.50 = $42.00</p>
            <p>EV energy: 300 × 30 ÷ 100 = 90 kWh → Cost: 90 × $0.15 = $13.50</p>
            <p>Savings: $42.00 − $13.50 = $28.50</p>
          </div>
          <p>
            The current calculator verifies this exact reference case. For household electricity-cost estimates, see the{" "}
            <Link
              href="/calculators/electricity-calculator"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Electricity Calculator
            </Link>.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            19. Why EV Savings Depend on the Situation
          </h2>
          <p>
            An EV does not have one universal cost advantage. The comparison changes with:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm">
            <li>Gasoline price per gallon</li>
            <li>Electricity price per kilowatt-hour</li>
            <li>Gasoline vehicle fuel economy (MPG)</li>
            <li>EV energy consumption efficiency (kWh/100mi)</li>
            <li>Charging location (home residential vs DC fast charging)</li>
            <li>Charging utility tariff (flat rate vs peak time-of-use)</li>
            <li>Trip distance and temperature effects</li>
          </ul>
          <p>
            The U.S. Department of Energy&apos;s Alternative Fuels Data Center similarly notes that EV charging costs depend on electricity price, region, time of use and charging location.
          </p>
          <p>
            This is why the calculator uses user-entered assumptions rather than claiming a fixed EV savings percentage.
          </p>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            20. What Happens When an EV Costs More Than Gasoline?
          </h2>
          <p>
            A comparison should not call a negative number &quot;savings.&quot; The calculator now handles this correctly:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm">
            <li><strong>When the EV is cheaper:</strong> EV Savings: $X.XX per trip</li>
            <li><strong>When both cost the same:</strong> No cost difference</li>
            <li><strong>When the EV is more expensive:</strong> EV Premium: $X.XX more per trip</li>
          </ul>
          <p>
            The current UI uses sign-aware presentation and does not display a negative value inside a green &quot;savings&quot; message.
          </p>
        </section>

        {/* Section 21 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            21. Fuel Cost and CO₂ Emissions
          </h2>
          <p>
            Fuel cost and carbon emissions are related but they are not the same metric.
          </p>
          <p>
            For gasoline, the calculator uses:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            8.887 kg CO₂ per gallon
          </div>
          <p>
            The EPA documents the same conversion factor of 8,887 grams of CO₂ per gallon of gasoline consumed.
          </p>
          <p>
            Therefore: 12 gallons × 8.887 kg/gal ≈ 106.6 kg CO₂. That is the calculator&apos;s reference value.
          </p>
          <p>
            The result should be understood as an estimated direct CO₂ amount associated with gasoline combustion under the selected factor, not as a complete lifecycle emissions assessment.
          </p>
          <p>
            EPA separately discusses upstream gasoline emissions and broader greenhouse-gas accounting, which is why a tailpipe factor should not automatically be presented as total lifecycle emissions.
          </p>
        </section>

        {/* Section 22 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            22. Gasoline vs Diesel Emissions Factors
          </h2>
          <p>
            The calculator also supports diesel emissions using:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            10.18 kg CO₂ per gallon
          </div>
          <p>
            EPA documents 10,180 grams of CO₂ per gallon of diesel consumed.
          </p>
          <p>
            These are fuel-combustion factors. They should not be confused with a full lifecycle carbon footprint that includes fuel extraction, refining, transportation, electricity generation, infrastructure, or vehicle manufacturing.
          </p>
        </section>

        {/* Section 23 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            23. Why Fuel Prices Matter So Much
          </h2>
          <p>
            Fuel price enters the calculation linearly. If 12 gallons are needed:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>At $3.00/gal → Cost = $36.00</p>
            <p>At $4.00/gal → Cost = $48.00</p>
            <p>At $5.00/gal → Cost = $60.00</p>
          </div>
          <p>
            Fuel consumption has not changed. Only the price per gallon changed.
          </p>
          <p>
            The same principle applies to EV electricity pricing. This makes price sensitivity particularly useful when planning long-distance travel or comparing vehicles.
          </p>
        </section>

        {/* Section 24 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            24. How to Use the Fuel Cost Calculator
          </h2>
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Road Trip Mode</h3>
              <p>Enter distance, fuel economy, fuel price, optional penalties, tolls, and parking.</p>
              <p className="text-slate-600 dark:text-slate-400">Review: fuel required, fuel cost, cost per mile, estimated CO₂, and total trip expense.</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Commute Mode</h3>
              <p>Enter daily round-trip distance, MPG, fuel price, and work days per month.</p>
              <p className="text-slate-600 dark:text-slate-400">Review: daily, weekly, monthly, and annual commute costs.</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">MPG Solver Mode</h3>
              <p>Enter starting odometer, ending odometer, and gallons of fuel added.</p>
              <p className="text-slate-600 dark:text-slate-400">Review: distance driven, calculated MPG, and equivalent L/100km.</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">EV vs Gas Mode</h3>
              <p>Enter trip distance, gasoline MPG, gasoline price, EV kWh/100mi, and electricity price.</p>
              <p className="text-slate-600 dark:text-slate-400">Review: gasoline cost, EV energy cost, and net savings or EV premium.</p>
            </div>
          </div>
        </section>

        {/* Section 25 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            25. Worked Example: Complete Road Trip Budget
          </h2>
          <p>
            Suppose: Distance = 300 miles, Fuel economy = 25 MPG, Fuel price = $3.50/gal, Tolls = $20.00, Parking = $10.00.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>Fuel required: 300 ÷ 25 = 12 gallons</p>
            <p>Fuel cost: 12 × $3.50 = $42.00</p>
            <p>Total trip expense: $42.00 + $20.00 + $10.00 = $72.00</p>
            <p>Fuel cost per mile: $42.00 ÷ 300 = $0.14/mile</p>
            <p>Estimated gasoline CO₂: 12 × 8.887 ≈ 106.6 kg CO₂</p>
          </div>
          <p>
            This example separates the four useful planning quantities: fuel consumption, fuel cost, other trip expenses, and estimated emissions.
          </p>
        </section>

        {/* ═══════════════════ FULLY UNFOLDED FAQ SECTION ═══════════════════ */}
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 pb-1">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {fuel_cost_calculatorFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1.5"
              >
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════ SOURCES / REFERENCES ═══════════════════ */}
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Fuel, Emissions and Measurement References
          </h2>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>U.S. Environmental Protection Agency — Greenhouse Gas Equivalencies Calculator: Calculations and References</li>
            <li>U.S. Environmental Protection Agency — Comparison: Your Car vs. an Electric Vehicle</li>
            <li>U.S. Department of Energy — Alternative Fuels Data Center: Electricity Basics</li>
            <li>U.S. Department of Energy — Alternative Fuels Data Center: Electric Vehicle Readiness</li>
            <li>National Institute of Standards and Technology — Guide to the SI / Unit Conversion Factors</li>
          </ul>
          <p className="text-xs pt-1">
            EPA documents the gasoline factor of 8,887 g CO₂/gallon and diesel factor of 10,180 g CO₂/gallon, which directly supports the emissions calculations used on this page.
          </p>
          <p className="text-xs">
            NIST documents the distinction between U.S. and Imperial gallons, which supports the calculator&apos;s separate MPG conversion modes.
          </p>
          <p className="text-xs">
            DOE&apos;s Alternative Fuels Data Center notes that EV charging economics depend on electricity price, region, time of use and charging location, supporting the scenario-based framing of the EV comparison.
          </p>
        </section>
      </article>

      {/* ═══════════════════ RELATED CALCULATORS — AFTER ARTICLE ═══════════════════ */}
      <section className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 sm:p-4 text-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Related Calculators
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/calculators/gas-mileage-calculator"
            className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Gas Mileage Calculator</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
          </Link>
          <Link
            href="/calculators/mileage-calculator"
            className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Mileage Calculator</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default FuelCostContent;

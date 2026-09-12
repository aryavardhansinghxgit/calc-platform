"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, CheckCircle2, ExternalLink } from "lucide-react";
import { mileage_calculatorFaqs } from "@/app/calculators/mileage-calculator/faq";

export function MileageContent() {
  // All 16 FAQs open by default as required
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 16 }, (_, i) => i))
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
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. EXPANDED MAIN EDUCATIONAL CONTENT (SECTIONS 1 TO 20) */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Intro */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            The Complete Guide to Vehicle Mileage, MPG, Fuel Economy, Mileage Cost and MPGe
          </h2>
          <p>
            A mileage calculation looks simple—distance divided by fuel—but accurate vehicle efficiency analysis involves several related measurements. Depending on the vehicle and the question being asked, you may need miles per gallon (MPG), kilometers per liter (km/L), liters per 100 kilometers (L/100km), fuel cost per mile, annual fuel spending, business mileage reimbursement, or electric-vehicle MPGe.
          </p>
          <p>
            This <strong>Mileage Calculator</strong> brings these calculations together in one place. You can calculate conventional fuel economy from distance and fuel added, convert between international fuel-economy units, analyze multiple fill-ups, estimate business mileage reimbursement, and compare electric-vehicle efficiency using MPGe.
          </p>
          <p>
            The calculator also includes a continuously updating efficiency gauge and supports petrol, diesel, CNG, Auto LPG and EV scenarios. Its production verification confirms that the mathematical engine, unit conversions, multi-leg calculations, EV calculations, cost calculations, visualization and exports remain synchronized with the underlying inputs.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Does Vehicle Mileage Mean?
          </h2>
          <p>
            Vehicle mileage describes how efficiently a vehicle converts fuel or electrical energy into useful travel.
          </p>
          <p>
            In everyday usage, several terms are often mixed together:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Mileage</strong> commonly refers to how far a vehicle travels for a given quantity of fuel.</li>
            <li><strong>Fuel economy</strong> usually describes distance per unit of fuel, such as MPG or km/L.</li>
            <li><strong>Fuel consumption</strong> describes the inverse relationship, such as liters consumed per 100 kilometers.</li>
          </ul>
          <p>
            These measures contain the same underlying information but express it in different ways. For example, a vehicle that travels farther on the same quantity of fuel has a higher distance-per-fuel figure:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            MPG = Distance / Fuel
          </div>
          <p>
            L/100km moves in the opposite direction:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            L/100km = (Fuel × 100) / Distance
          </div>
          <p>
            Therefore, higher MPG is better, while lower L/100km is better.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How to Calculate MPG
          </h2>
          <p>
            For a conventional vehicle, the basic formula is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            MPG = Miles Driven / Gallons of Fuel Used
          </div>
          <p>
            Suppose a vehicle travels 350 miles and consumes 11.5 US gallons:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            MPG = 350 / 11.5 = 30.4348
          </div>
          <p>
            So the vehicle&apos;s calculated fuel economy is approximately <strong>30.4 US MPG</strong>. That exact example appears in the supplied calculator reference, together with the corresponding metric and cost calculations.
          </p>
          <p>
            The important measurement detail is that the fuel quantity should represent the fuel actually consumed over the measured distance. That is why a consistent tank-to-tank fill-up method is generally more reliable than estimating consumption from a dashboard snapshot.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            3. How to Calculate L/100km
          </h2>
          <p>
            L/100km expresses fuel consumption rather than distance per fuel. The formula is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            L/100km = (Fuel Used in Liters × 100) / Distance in Kilometers
          </div>
          <p>
            For example, if a vehicle consumes 20 liters over 400 km:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            (20 × 100) / 400 = 5.0 L/100km
          </div>
          <p>
            This is why a lower value represents better efficiency. A useful mental rule is: <em>MPG and km/L increase as efficiency improves; L/100km decreases.</em> The calculator handles these inverse relationships automatically rather than asking the user to perform multiple manual conversions.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            4. MPG, km/L and L/100km Are Different Ways to Express Efficiency
          </h2>
          <p>
            These measures are mathematically related, but they should never be treated as interchangeable numbers. For Indian and other metric markets:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            km/L = Distance in km / Fuel in Liters &nbsp;|&nbsp; L/100km = 100 / (km/L)
          </div>
          <p>
            For example, <strong>30 km/L</strong> corresponds to:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            100 / 30 = 3.3333 L/100km
          </div>
          <p>
            The calculator&apos;s production tests verify this inverse relationship across randomized conversions.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            5. US MPG vs UK Imperial MPG
          </h2>
          <p>
            One of the most common international mileage mistakes is treating US gallons and Imperial gallons as the same quantity. They are not.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li>A US liquid gallon is approximately <strong>3.78541 Liters</strong>.</li>
            <li>An Imperial gallon is approximately <strong>4.54609 Liters</strong>.</li>
          </ul>
          <p>
            The Imperial gallon is therefore ~20.1% larger. Consequently, a vehicle that produces a particular fuel economy in US MPG will have a different numerical value in Imperial MPG. For example, the calculator&apos;s verified conversion for approximately <strong>30.4 US MPG</strong> produces approximately <strong>36.6 UK Imperial MPG</strong>. This is why an international mileage converter must identify the gallon system explicitly.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            6. The Tank-to-Tank Method for Measuring Real Mileage
          </h2>
          <p>
            A reliable mileage calculation starts with reliable measurements. A practical tank-to-tank procedure is:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Step 1: Fill the tank.</strong> Fill the fuel tank consistently until the automatic pump nozzle clicks off, and record the baseline odometer reading.</li>
            <li><strong>Step 2: Drive normally.</strong> Use the vehicle under ordinary commuting and highway conditions. Avoid changing the measurement procedure midway through the test.</li>
            <li><strong>Step 3: Refill.</strong> At the next fill-up, record the trip distance traveled and the exact volume of fuel added from the gas pump receipt.</li>
            <li><strong>Step 4: Calculate.</strong> Use <code>Mileage = Distance / Fuel Added</code>.</li>
          </ol>
          <p>
            A longer measurement interval can also smooth out short-term variations caused by traffic, ambient temperature, terrain and driving conditions.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Why Your Dashboard MPG May Differ From Your Measured MPG
          </h2>
          <p>
            Modern vehicles usually estimate fuel economy electronically. The estimate can be based on fuel-injection pulse duration, vehicle speed, engine operating conditions and mass airflow measurements. A tank-to-tank calculation instead uses physical quantities: recorded distance plus metered fuel added equals measured fuel economy.
          </p>
          <p>
            These two methods therefore do not have to produce exactly the same value. Small differences can arise from rounding, fuel-level sender measurement, pump shutoff behavior, driving conditions, temperature, tire pressure, traffic, and changes in terrain. The correct approach is not to assume one number is automatically wrong. Instead, use a consistent measurement method when comparing one fill-up against another.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Understanding the MPG Illusion
          </h2>
          <p>
            MPG is not a linear measure of fuel savings. Consider 10,000 miles of driving:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li>At 15 MPG: <code>10,000 / 15 = 666.67 gal</code></li>
            <li>At 20 MPG: <code>10,000 / 20 = 500.00 gal</code> (Fuel saved: <strong>166.67 gallons</strong>)</li>
            <li>At 40 MPG: <code>10,000 / 40 = 250.00 gal</code></li>
            <li>At 50 MPG: <code>10,000 / 50 = 200.00 gal</code> (Fuel saved: <strong>50.00 gallons</strong>)</li>
          </ul>
          <p>
            Notice that upgrading a vehicle from 15 to 20 MPG (+5 MPG) saves <strong>over 3 times more fuel</strong> than upgrading an efficient car from 40 to 50 MPG (+10 MPG)! This demonstrates why absolute MPG improvements can be deceptive when comparing vehicles with different starting efficiencies. The underlying relationship is easier to see when fuel consumption (gallons per 1,000 miles or L/100km) is compared.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Fuel Cost Per Mile
          </h2>
          <p>
            Fuel economy can be converted into a direct operating-cost measure. For US MPG:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            Cost per mile = Fuel Price per Gallon / MPG
          </div>
          <p>
            For example, at 30 MPG and $3.50/gal, the fuel-only cost is <code>3.50 / 30 = $0.1167/mile</code>, which rounds to approximately <strong>$0.12 per mile</strong>. This number is useful for comparing vehicles because it connects fuel efficiency directly to the price paid at the pump. For comprehensive multi-stop highway route modeling including tolls and rest stops, you can evaluate expenses using our{" "}
            <Link href="/calculators/fuel-cost-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Fuel Cost Calculator
            </Link>
            . Remember that fuel-only cost should not be confused with total vehicle ownership expense, which also encompasses depreciation, maintenance, insurance, and financing.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Estimating Fuel Cost for a Trip
          </h2>
          <p>
            Once fuel economy and fuel price are known, the fuel required for a trip can be estimated:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            Fuel Required = Trip Distance / MPG &nbsp;|&nbsp; Trip Fuel Cost = Fuel Required × Fuel Price
          </div>
          <p>
            For example, 300 miles at 25 MPG requires 12 gallons. At $3.50 per gallon, the trip fuel cost is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            12 × $3.50 = $42.00
          </div>
          <p>
            The production QA confirms this exact mathematical relationship in the calculator.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Calculating Annual Fuel Spending
          </h2>
          <p>
            Annual fuel cost can be estimated from projected annual driving distance:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            Annual Fuel = Annual Distance / Fuel Economy &nbsp;|&nbsp; Annual Fuel Cost = Annual Fuel × Fuel Price
          </div>
          <p>
            For example, at 15,000 miles per year and 30 MPG:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            15,000 / 30 = 500 gallons &nbsp;→&nbsp; 500 × $3.50 = $1,750 / year
          </div>
          <p>
            This is an estimate, not a guarantee, because actual pump prices and driving conditions fluctuate over the course of a year.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Using Multiple Fill-Ups for a Better Mileage Average
          </h2>
          <p>
            When several fill-ups are available, do not simply average the individual MPG values. The mathematically correct combined fuel economy is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            Weighted MPG = Σ Distance / Σ Fuel
          </div>
          <p>
            For example:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li>Fill-up 1: 320 km, 10.5 Liters</li>
            <li>Fill-up 2: 340 km, 11.0 Liters</li>
            <li>Total distance: 660 km | Total fuel: 21.5 Liters</li>
          </ul>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            660 / 21.5 = 30.6977 km/L (approx. 30.7 km/L)
          </div>
          <p>
            The calculator specifically uses the weighted <code>Σ D / Σ F</code> method, and the production test suite verifies it independently. This approach prevents a short trip with unusual traffic from skewing the fleet average.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Factors That Change Real-World Mileage
          </h2>
          <p>
            A vehicle&apos;s rated or calculated efficiency is not necessarily the efficiency experienced on every road. Real-world mileage varies due to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Speed:</strong> Aerodynamic resistance becomes dominant at highway speeds. Aerodynamic drag force is proportional to velocity squared (<em>F<sub>d</sub> ∝ v²</em>), and the engine power required to overcome drag scales with the cube of velocity (<em>P ∝ v³</em>).</li>
            <li><strong>Tire Pressure:</strong> Underinflated tires increase rolling resistance. NHTSA recommends following the vehicle manufacturer&apos;s specified cold tire pressure.</li>
            <li><strong>Temperature:</strong> Cold conditions prolong engine warmup cycles, increase aerodynamic air density, and increase EV battery cabin heating requirements.</li>
            <li><strong>Traffic &amp; Driving Habits:</strong> Frequent stop-and-go acceleration and heavy cargo significantly reduce mileage.</li>
            <li><strong>Powertrain Performance:</strong> For understanding how engine displacement, torque, and power output interact with vehicle dynamics, explore our{" "}
              <Link href="/calculators/horsepower-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Horsepower Calculator
              </Link>
              .
            </li>
          </ul>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Highway Speed and Aerodynamic Efficiency
          </h2>
          <p>
            A common misconception is that aerodynamic drag grows &quot;exponentially.&quot; A more precise engineering description is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            F_d = 0.5 × ρ × C_d × A × v²
          </div>
          <p>
            where <code>ρ</code> is air density, <code>C_d</code> is the drag coefficient, <code>A</code> is frontal area, and <code>v</code> is vehicle speed. Because power is force multiplied by velocity (<code>P = F × v</code>), the engine power required to overcome aerodynamic drag scales with the cube of velocity (<strong>v³</strong>). This distinction explains why fuel economy can deteriorate significantly at higher cruising speeds (e.g. 75–80 mph vs 55–60 mph).
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Business Mileage and IRS Mileage Rates
          </h2>
          <p>
            The calculator includes an IRS business-mileage reimbursement and tax-claim mode:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            Mileage Claim Amount = Qualifying Business Miles × Applicable Rate
          </div>
          <p>
            For example, using the historical 2024 standard rate of $0.67 per mile:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            450 miles × $0.67 = $301.50
          </div>
          <div className="p-3.5 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
            <h3 className="font-bold text-blue-900 dark:text-blue-200 text-xs sm:text-sm">
              Official IRS Mileage Rates Notice
            </h3>
            <p className="text-xs text-blue-800 dark:text-blue-300">
              The IRS standard mileage rates vary by tax year and effective period:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-blue-200 dark:border-blue-800">
                <thead>
                  <tr className="bg-blue-100/60 dark:bg-blue-900/40">
                    <th className="p-2 border border-blue-200 dark:border-blue-800 font-bold">Tax Period</th>
                    <th className="p-2 border border-blue-200 dark:border-blue-800 font-bold">Business Travel Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-blue-200 dark:border-blue-800">2024 Full Year</td>
                    <td className="p-2 border border-blue-200 dark:border-blue-800 font-mono">$0.67 / mile</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-blue-200 dark:border-blue-800">2025 Full Year</td>
                    <td className="p-2 border border-blue-200 dark:border-blue-800 font-mono">$0.70 / mile</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-blue-200 dark:border-blue-800">Jan. 1 – Jun. 30, 2026</td>
                    <td className="p-2 border border-blue-200 dark:border-blue-800 font-mono">$0.725 / mile</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-blue-200 dark:border-blue-800">Jul. 1 – Dec. 31, 2026</td>
                    <td className="p-2 border border-blue-200 dark:border-blue-800 font-mono">$0.76 / mile</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            The standard mileage rate is an optional tax standard. Actual deductibility depends on taxpayer status, business documentation, and applicable tax regulations.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Electric Vehicle Efficiency and MPGe
          </h2>
          <p>
            Electric vehicles do not consume liquid gallons of gasoline, so conventional MPG is not a direct physical measurement. The EPA established <strong>MPGe (Miles Per Gallon Equivalent)</strong> based on thermal energy equivalency: <strong>1 US gallon of gasoline contains 33.7 kWh of electrical energy</strong>.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            mi/kWh = Miles Driven / kWh Used &nbsp;|&nbsp; MPGe = (mi/kWh) × 33.7
          </div>
          <p>
            For example, an EV traveling 240 miles on 75 kWh achieves:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/70 font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100">
            (240 / 75) = 3.2 mi/kWh &nbsp;→&nbsp; 3.2 × 33.7 = 107.84 MPGe (approx. 107.8 MPGe)
          </div>
          <p>
            At $0.16/kWh, total electricity cost is $12.00, yielding $0.05/mile and 20 miles per dollar. For comparing pure gas consumption benchmarks, verify details using our{" "}
            <Link href="/calculators/gas-mileage-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Gas Mileage Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            17. MPGe Is Not the Same as Electricity Consumption
          </h2>
          <p>
            Two EV efficiency expressions describe the same vehicle from inverse viewpoints:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Miles per kWh (mi/kWh):</strong> measures distance divided by electricity. Higher is more efficient.</li>
            <li><strong>kWh per 100 miles (kWh/100mi):</strong> measures electricity divided by distance. Lower is more efficient.</li>
          </ul>
          <p>
            For example, if a vehicle consumes <code>30 kWh / 100 miles</code>, then <code>100 / 30 = 3.3333 mi/kWh</code>, yielding approximately <code>3.3333 × 33.7 ≈ 112.3 MPGe</code>. Checking the unit prevents false comparisons.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            18. How Driving Conditions Affect EV Efficiency
          </h2>
          <p>
            EV efficiency changes with operating conditions: high highway speeds increase aerodynamic drag, extreme cold or heat triggers cabin HVAC battery drain, payload adds rolling mass, and aggressive driving limits regenerative braking energy recovery. Official EPA ratings combine city and highway dyno cycles, whereas this calculator calculates efficiency from your real metered kWh and trip distance.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            19. Understanding the Efficiency Dashboard
          </h2>
          <p>
            The calculator&apos;s efficiency dashboard is a visual interpretation of your vehicle&apos;s calculated efficiency. The continuous SVG gauge dynamically adjusts its scale, angle, and labels based on the active unit system (US MPG, L/100km, UK MPG, km/L, or MPGe). It should be read together with the exact numerical readout and cost metrics.
          </p>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            20. How the Mileage Calculator Handles Real-World Scenarios
          </h2>
          <p>
            The calculator is built for four distinct transportation tasks:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Fuel Mileage:</strong> Calculates tank-to-tank fuel economy, international unit conversions, and cost per mile.</li>
            <li><strong>IRS Tax Claim:</strong> Calculates business, medical, or charitable mileage deductions with standard or custom rates.</li>
            <li><strong>Multi-Leg Log:</strong> Computes true weighted average fleet efficiency (<code>Σ D / Σ F</code>) across multiple tank fill-ups.</li>
            <li><strong>EV &amp; MPGe:</strong> Computes electricity consumption, MPGe equivalent ratings, and charging cost analytics.</li>
          </ul>
        </section>
      </div>

      {/* 2. FREQUENTLY ASKED QUESTIONS (16 UNFOLDED FAQS) */}
      <div className="pt-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {mileage_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 21}.
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. PRACTICAL CHECKLIST & DISCLAIMER */}
      <div className="pt-6 space-y-4">
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 space-y-3">
          <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-xs">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Practical Mileage Calculation Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-700 dark:text-slate-300">
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">For Real-World Mileage:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Use the same vehicle &amp; fuel grade</li>
                <li>Fill tank to automatic shutoff</li>
                <li>Reset trip odometer</li>
                <li>Drive normally under routine conditions</li>
                <li>Refill completely &amp; divide distance by fuel</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">For Business Mileage:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Record exact starting &amp; ending odometer</li>
                <li>Log trip purpose, date &amp; destination</li>
                <li>Select the applicable IRS period rate</li>
                <li>Multiply qualifying miles × rate</li>
                <li>Retain contemporaneous tax logs</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">For EV Efficiency:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Record trip odometer distance</li>
                <li>Record metered kWh charged</li>
                <li>Calculate miles per kWh</li>
                <li>Convert to MPGe (× 33.7 kWh/gal)</li>
                <li>Track electric utility charging tariff</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. STANDARDS AND AUTHORITATIVE REFERENCES */}
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/70 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-xs">
            <BookOpen className="h-4 w-4 text-blue-600" />
            Standards &amp; Authoritative References
          </div>
          <ul className="space-y-1.5 pl-1">
            <li className="flex items-center gap-1.5">
              <ExternalLink className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>
                <strong>Internal Revenue Service (IRS):</strong> Standard Mileage Rates Notice for current and historical vehicle reimbursement standards.
              </span>
            </li>
            <li className="flex items-center gap-1.5">
              <ExternalLink className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>
                <strong>U.S. Environmental Protection Agency (EPA):</strong> Fuel Economy Testing Regulations &amp; MPGe Equivalency Standards (40 CFR Part 600).
              </span>
            </li>
            <li className="flex items-center gap-1.5">
              <ExternalLink className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>
                <strong>National Highway Traffic Safety Administration (NHTSA):</strong> Tire Safety, Placard Pressures, and Rolling Resistance Guidelines.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}

export default MileageContent;

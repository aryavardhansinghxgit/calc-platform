import React from "react";
import Link from "next/link";
import { electricity_calculatorFaqs } from "@/app/calculators/electricity-calculator/faq";

export function ElectricityContent() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans leading-relaxed text-slate-800 dark:text-slate-200">
      {/* ═══════════════════ RELATED CALCULATORS — ABOVE ARTICLE ═══════════════════ */}
      <section className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 sm:p-4 text-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Related Calculators
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/calculators/btu-calculator"
            className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>BTU Calculator</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
          </Link>
          <Link
            href="/calculators/conversion-calculator"
            className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Conversion Calculator</span>
          </Link>
        </div>
      </section>

      {/* ═══════════════════ LONG-FORM EDUCATIONAL ARTICLE ═══════════════════ */}
      <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 text-sm sm:text-base leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            1. What Is an Electricity Calculator?
          </h2>
          <p>
            An electricity calculator estimates how much electrical energy a device uses over time and how much that energy may cost at a given electricity rate.
          </p>
          <p>
            The central distinction is between power and energy.
          </p>
          <p>
            Power is the rate at which electrical energy is being used and is commonly expressed in watts (W) or kilowatts (kW). Energy is the accumulated quantity of electricity consumed over time and is commonly expressed in watt-hours (Wh) or kilowatt-hours (kWh).
          </p>
          <p>
            For a continuously operating appliance, the basic relationship is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            Energy (kWh) = Power (W) × Time (hours) ÷ 1,000
          </div>
          <p>
            This calculator extends that basic calculation to situations where an appliance has a duty cycle, where electricity prices vary by time of use, where multiple household appliances need to be aggregated, and where an efficiency upgrade needs to be evaluated.
          </p>
          <p>
            The U.S. Department of Energy uses the same basic wattage-and-time relationship when explaining appliance electricity consumption.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            2. Watts, Kilowatts, Watt-Hours and Kilowatt-Hours
          </h2>
          <p>These units describe different physical quantities.</p>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 pt-1">Watt (W)</h3>
          <p>A watt is a unit of power.</p>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 pt-1">Kilowatt (kW)</h3>
          <p>One kilowatt equals:</p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            1 kW = 1,000 W
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 pt-1">Watt-hour (Wh)</h3>
          <p>A watt-hour measures energy accumulated over time.</p>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 pt-1">Kilowatt-hour (kWh)</h3>
          <p>A kilowatt-hour is:</p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            1 kWh = 1,000 Wh
          </div>
          <p>For example, a 1,000 W appliance operating continuously for one hour uses:</p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            1,000 W × 1 h ÷ 1,000 = 1 kWh
          </div>
          <p>A 100 W appliance operating for ten hours uses the same amount:</p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            100 W × 10 h ÷ 1,000 = 1 kWh
          </div>
          <p>This is why appliance wattage alone cannot tell you the monthly electricity cost.</p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            3. The Basic Formula for Appliance Energy Consumption
          </h2>
          <p>For a simple appliance:</p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            Energy = Power × Time
          </div>
          <p>When power is entered in watts:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            Energy (kWh) = Power (W) × Hours ÷ 1,000
          </div>
          <p>Consider a 1,500 W appliance running for eight hours:</p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            1,500 × 8 ÷ 1,000 = 12 kWh
          </div>
          <p>
            That is the theoretical consumption if the appliance draws its full rated power continuously.
          </p>
          <p>
            Many real appliances do not operate that way. Air conditioners, refrigerators, heating systems and electronically controlled equipment can cycle or modulate, which is why an operating-duty-cycle input can provide a more useful estimate.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            4. How Duty Cycle Changes Electricity Consumption
          </h2>
          <p>Suppose the appliance is rated 1,500 W but operates at an average duty cycle of 60%.</p>
          <p>The effective load becomes:</p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            1,500 × 0.60 = 900 W
          </div>
          <p>At eight operating hours per day:</p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            900 × 8 ÷ 1,000 = 7.20 kWh/day
          </div>
          <p>
            That is the reference case used by this calculator. The difference between 12 kWh/day and 7.2 kWh/day is entirely due to the assumed operating duty cycle.
          </p>
          <p>
            A duty cycle is an estimate of how much of the rated operating capacity is actually used over the relevant period. It should not be interpreted as a laboratory measurement unless the user has actual operating data.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            5. How to Calculate Monthly and Annual Electricity Use
          </h2>
          <p>This calculator uses:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>365.25 days/year</p>
            <p>365.25 ÷ 12 = 30.4375 days/month</p>
          </div>
          <p>For the 7.20 kWh/day reference case:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>Monthly energy = 7.20 × 30.4375 = 219.15 kWh</p>
            <p>Annual energy = 7.20 × 365.25 = 2,629.80 kWh</p>
          </div>
          <p>
            The result is an annual-average estimate. It does not mean every calendar month contains exactly 30.4375 days.
          </p>
          <p>
            Using one consistent time basis across the calculator prevents monthly and annual totals from drifting apart.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            6. How to Calculate the Electricity Cost of an Appliance
          </h2>
          <p>Once energy use is known, the basic energy charge is:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            Cost = Energy (kWh) × Electricity Rate ($/kWh)
          </div>
          <p>At 219.15 kWh/month and $0.16/kWh, the monthly energy charge is approximately:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>Monthly: 219.15 × 0.16 = $35.06</p>
            <p>Annual: 2,629.80 × 0.16 = $420.77</p>
          </div>
          <p>These are the calculator&apos;s reference outputs.</p>
          <p>A real utility bill can include additional charges beyond the energy component.</p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            7. Why Electricity Prices Differ by Location
          </h2>
          <p>There is no single electricity rate that applies everywhere.</p>
          <p>
            EIA reports that U.S. residential electricity averaged 17.30¢/kWh in 2025, but state and locality-level prices differed considerably.
          </p>
          <p>
            That makes the distinction between energy consumption and electricity price particularly important. Two homes can use exactly the same 500 kWh and receive very different bills because their tariffs differ.
          </p>
          <p>Use your utility&apos;s actual applicable rate whenever possible.</p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            8. Electricity Consumption vs Your Actual Utility Bill
          </h2>
          <p>The calculator estimates the electricity cost represented by the inputs you provide.</p>
          <p>A utility bill can contain several different components.</p>
          <p>DOE describes three broad categories that commonly appear in utility rate structures:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Energy charges based on kWh</li>
            <li>Demand charges based on maximum kW</li>
            <li>Fixed charges billed independently of consumption</li>
          </ul>
          <p>Depending on the utility, additional charges may also apply.</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            calculator energy cost ≠ guaranteed final utility bill
          </div>
          <p>unless the exact billing structure has been modeled.</p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            9. What Is a Time-of-Use Electricity Rate?
          </h2>
          <p>A time-of-use (TOU) tariff charges different prices during different periods.</p>
          <p>For example:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 font-mono text-xs sm:text-sm">
            <li>Peak rate: $0.28/kWh</li>
            <li>Off-peak rate: $0.12/kWh</li>
          </ul>
          <p>
            The same amount of electricity can therefore cost different amounts depending on when it is consumed.
          </p>
          <p>
            DOE notes that time-variable electricity pricing can change the economics of when electricity is consumed, which is why load timing can matter as much as total usage in some rate plans.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            10. Worked Time-of-Use Example
          </h2>
          <p>Use:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 font-mono text-xs sm:text-sm">
            <li>Peak energy: 8 kWh/day</li>
            <li>Peak rate: $0.28/kWh</li>
            <li>Off-peak energy: 16 kWh/day</li>
            <li>Off-peak rate: $0.12/kWh</li>
            <li>Fixed monthly fee: $15</li>
          </ul>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>Total daily energy: 8 + 16 = 24 kWh/day</p>
            <p>Monthly energy: 24 × 30.4375 = 730.5 kWh/month</p>
            <p>Peak cost: 8 × 30.4375 × $0.28 = $68.18</p>
            <p>Off-peak cost: 16 × 30.4375 × $0.12 = $58.44</p>
            <p>Adding the fixed fee: $68.18 + $58.44 + $15 = $141.62/month</p>
          </div>
          <p>The reference calculation in the production test suite matches this result.</p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            11. Why Time of Use Can Change Your Electricity Bill Without Changing kWh
          </h2>
          <p>Suppose a household consumes 730.5 kWh/month under two different tariff structures.</p>
          <p>The energy total remains unchanged.</p>
          <p>
            But if more of that energy moves from a high-cost period to a lower-cost period, the total bill can fall. That means TOU optimization is not necessarily about using less electricity. It can also be about when electricity is used.
          </p>
          <p>
            This is one reason EV charging, water heating, storage, and other flexible loads are increasingly evaluated against time-variable tariffs. DOE specifically identifies shifting consumption from higher-cost periods to lower-cost periods as one way of managing energy charges.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            12. Whole-House Electricity Consumption
          </h2>
          <p>
            A household electricity estimate becomes more useful when major appliances are evaluated together.
          </p>
          <p>
            The whole-house module allows multiple appliances to be entered with quantity, power, hours per day, and category. The calculator then estimates each load&apos;s contribution and aggregates total household electricity use.
          </p>
          <p>In the reference household:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 font-mono text-xs sm:text-sm">
            <li>796.5 kWh/month</li>
            <li>$127.44/month</li>
            <li>$1,529.26/year</li>
          </ul>
          <p>
            The Living Room AC accounts for approximately 46% of total monthly energy according to the calculator&apos;s defined allocation metric.
          </p>
          <p>
            This lets users identify where energy consumption is concentrated instead of assuming the highest-wattage appliance is automatically the largest monthly energy user.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            13. How the Household Power Allocation Visualization Works
          </h2>
          <p>The visualization represents the share of total household energy attributed to each appliance.</p>
          <p>
            If total monthly consumption is 800 kWh and one appliance accounts for 400 kWh, that appliance represents 50% of total consumption.
          </p>
          <p>
            The current implementation uses actual percentages rather than forcing minimum-width visual segments. This avoids showing a visible &quot;slice&quot; for an appliance whose calculated consumption is zero.
          </p>
          <p>
            The visual therefore functions as a representation of the calculation rather than an independent estimate.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            14. Power Hog vs Energy Hog
          </h2>
          <p>An appliance can have a high instantaneous power demand without consuming the most electricity over a month.</p>
          <p>Consider:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 font-mono text-xs sm:text-sm">
            <li>1,000 W for 1 hour = 1 kWh</li>
            <li>100 W for 20 hours = 2 kWh</li>
          </ul>
          <p>The second device consumes more total energy: 2 kWh versus 1 kWh.</p>
          <p>
            This distinction is why the household module identifies the top contributor using its defined monthly energy metric rather than simply ranking devices by nameplate wattage.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            15. Standby and Vampire Electricity Consumption
          </h2>
          <p>Electronic devices can consume electricity while switched off or in standby mode.</p>
          <p>This is often called standby power or phantom/vampire load.</p>
          <p>The calculation is still based on power × time. The challenge is that a small standby load can persist for many hours.</p>
          <p>
            If a device uses only a small amount of power but remains connected continuously, its annual energy can be larger than expected from a quick glance at the wattage.
          </p>
          <p>
            The most reliable way to estimate such loads is to use measured consumption when available rather than assuming a universal standby value.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            16. Power Units Used in Electrical and HVAC Calculations
          </h2>
          <p>Common relationships include:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 font-mono text-xs sm:text-sm">
            <li>1 kW = 1,000 W</li>
            <li>1 mechanical horsepower ≈ 745.7 W</li>
            <li>1 metric horsepower ≈ 735.5 W</li>
            <li>1 refrigeration ton = 12,000 BTU/hr</li>
          </ul>
          <p>The final relationship is particularly important.</p>
          <p>
            A refrigeration ton represents thermal cooling capacity. It does not mean that an air conditioner necessarily consumes 3.51685 kW of electricity.
          </p>
          <p>
            Electrical input depends on equipment efficiency, controls, compressor operation, fan operation and operating conditions.
          </p>
          <p>
            For room cooling-load and HVAC capacity calculations, use the{" "}
            <Link href="/calculators/btu-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              BTU Calculator
            </Link>{" "}
            when appropriate. For general unit conversions, use the{" "}
            <Link href="/calculators/conversion-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Conversion Calculator
            </Link>
            . For mass and material calculations, see the{" "}
            <Link href="/calculators/mass-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Mass Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            17. Why a 1.5-Ton AC Does Not Automatically Use 3.5 kW of Electricity
          </h2>
          <p>This is a common calculation error.</p>
          <p>1.5 tons of refrigeration describes cooling capacity. It does not directly tell you electrical input power.</p>
          <p>
            The electrical consumption of an air conditioner depends on its efficiency and operating state.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            cooling capacity and electrical consumption are different quantities
          </div>
          <p>
            This calculator&apos;s appliance-energy model uses electrical power when estimating kWh consumption, rather than treating refrigeration tonnage as identical to electrical wattage.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            18. Energy-Efficiency and LED Upgrade Savings
          </h2>
          <p>The calculator can compare an existing load with a more efficient replacement.</p>
          <p>Reference case:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 font-mono text-xs sm:text-sm">
            <li>Existing power: 60 W</li>
            <li>Replacement power: 9 W</li>
            <li>Quantity: 10</li>
            <li>The old load is: 60 × 10 = 600 W</li>
            <li>The new load is: 9 × 10 = 90 W</li>
            <li>Power reduction: 600 − 90 = 510 W</li>
            <li>At six hours per day: 510 × 6 ÷ 1,000 = 3.06 kWh/day saved</li>
            <li>Annual savings: approximately 1,118 kWh/year</li>
          </ul>
          <p>The production test confirms the calculator&apos;s reference results.</p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            19. How Energy-Upgrade Payback Is Calculated
          </h2>
          <p>Suppose 10 replacement units cost $4 each:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            Initial investment: 10 × $4 = $40
          </div>
          <p>Annual electricity savings: $178.83.</p>
          <p>Simple payback:</p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            $40 ÷ ($178.83 ÷ 12) ≈ 2.68 months (displayed as 2.7 months)
          </div>
          <p>
            This is a simple payback calculation. It does not necessarily include maintenance savings, product lifetime, financing costs, replacement timing, rebates or future electricity-price changes.
          </p>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            20. Cumulative Savings vs Net Profit
          </h2>
          <p>These terms should not be treated as interchangeable.</p>
          <ul className="list-disc list-inside space-y-1 pl-2 font-mono text-xs sm:text-sm">
            <li>Five-year cumulative electricity savings: $178.83 × 5 ≈ $894</li>
            <li>Initial investment: $40</li>
            <li>Five-year net profit ≈ $894 − $40 = $854</li>
          </ul>
          <p>
            The calculator now shows these as distinct concepts, which is mathematically more informative than labeling both values as savings.
          </p>
        </section>

        {/* Section 21 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            21. Electricity Carbon Emissions
          </h2>
          <p>A simplified electricity-emissions estimate is:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            CO₂e = Electricity Consumption × Emissions Factor
          </div>
          <p>
            The difficulty is that electricity does not have one universal emissions factor. The factor depends on the electricity-generation mix and the reporting methodology.
          </p>
          <p>
            EPA&apos;s current GHG Emission Factors Hub includes regularly updated electricity factors using sources including eGRID.
          </p>
          <p>
            Accordingly, the calculator&apos;s carbon output should be described as an estimated carbon footprint rather than a direct physical measurement of the emissions caused by one appliance.
          </p>
        </section>

        {/* Section 22 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            22. Why Your Actual Electricity Consumption May Differ
          </h2>
          <p>A mathematically correct calculator can still differ from real measured consumption.</p>
          <p>Reasons include:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li><strong>Variable power draw:</strong> Many appliances do not consume their nameplate rating continuously.</li>
            <li><strong>Cycling:</strong> Compressors, thermostats and heating elements may turn on and off.</li>
            <li><strong>Weather:</strong> Heating and cooling loads depend heavily on ambient conditions.</li>
            <li><strong>User behavior:</strong> Actual runtime may differ from assumed hours.</li>
            <li><strong>Equipment condition:</strong> Efficiency changes with maintenance, age and operating conditions.</li>
            <li><strong>Standby loads:</strong> Electronics can continue consuming small amounts of electricity.</li>
            <li><strong>Tariff structure:</strong> Your actual utility bill can contain charges not represented by a simple kWh × rate calculation.</li>
          </ul>
          <p>The correct interpretation is therefore: the calculator estimates based on explicit assumptions.</p>
        </section>

        {/* Section 23 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            23. How to Use the Electricity Calculator
          </h2>
          <div className="space-y-2 text-xs sm:text-sm">
            <p><strong>Step 1 — Single appliance:</strong> Enter power, duty cycle, hours per day, days per week, and electricity rate. The calculator returns daily consumption, monthly consumption, annual consumption, estimated cost, and estimated carbon.</p>
            <p><strong>Step 2 — Time-of-use bill:</strong> Enter peak energy, peak rate, off-peak energy, off-peak rate, and fixed monthly fee.</p>
            <p><strong>Step 3 — Whole-house estimate:</strong> Add appliance, quantity, power, hours/day, and category. Then compare each load&apos;s contribution.</p>
            <p><strong>Step 4 — Efficiency upgrade:</strong> Enter old power, new power, quantity, daily hours, and electricity rate. Review annual energy saved, annual money saved, payback, ROI, five-year cumulative savings, five-year net profit, and carbon avoided.</p>
          </div>
          <p className="text-xs pt-1">
            The post-fix release confirms all four modules and their cross-module state handling are operational.
          </p>
        </section>

        {/* Section 24 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            24. Worked Example: 1,500 W Appliance at 60% Duty Cycle
          </h2>
          <p>Given: Power = 1,500 W, Duty cycle = 60%, Operating time = 8 h/day, Electricity rate = $0.16/kWh.</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>Effective power: 1,500 × 0.60 = 900 W</p>
            <p>Daily energy: 900 × 8 ÷ 1,000 = 7.20 kWh/day</p>
            <p>Monthly energy: 7.20 × 30.4375 = 219.15 kWh/month</p>
            <p>Annual energy: 7.20 × 365.25 = 2,629.80 kWh/year</p>
            <p>Monthly cost: 219.15 × $0.16 = $35.06</p>
            <p>Annual cost: 2,629.80 × $0.16 = $420.77</p>
          </div>
          <p>The production reference confirms: 900 W effective power, 7.20 kWh/day, 219.15 kWh/month, $35.06/month, and $420.77/year.</p>
        </section>

        {/* Section 25 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            25. Common Electricity Calculation Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
            <li><strong>Using watts as though they were kWh:</strong> Power must be multiplied by time to obtain energy.</li>
            <li><strong>Ignoring operating time:</strong> A 1,500 W appliance used briefly may consume less energy than a 200 W appliance used continuously.</li>
            <li><strong>Assuming 100% duty cycle:</strong> Cycling equipment may operate at a lower average load.</li>
            <li><strong>Using someone else&apos;s electricity rate:</strong> Use your own utility&apos;s rate whenever possible.</li>
            <li><strong>Treating a refrigeration ton as electrical kW:</strong> Cooling capacity and electrical input are different quantities.</li>
            <li><strong>Ignoring fixed utility charges:</strong> Some bills contain fixed monthly charges.</li>
            <li><strong>Treating a national average electricity price as a personal tariff:</strong> Local prices can differ substantially. EIA&apos;s 2025 data demonstrate this variation.</li>
            <li><strong>Treating carbon output as an exact measurement:</strong> It is an estimate based on an emissions factor.</li>
            <li><strong>Calling all five-year savings &quot;profit&quot;:</strong> Profit must account for the initial investment.</li>
            <li><strong>Assuming calculated consumption is identical to meter readings:</strong> Actual usage depends on equipment behavior and operating conditions.</li>
          </ul>
        </section>

        {/* ═══════════════════ FULLY UNFOLDED FAQ SECTION ═══════════════════ */}
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 pb-1">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {electricity_calculatorFaqs.map((faq, idx) => (
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
            Electricity and Utility-Rate References
          </h2>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>U.S. Department of Energy — Evaluating Your Utility Rate Options</li>
            <li>U.S. Energy Information Administration — Electricity Prices and Factors Affecting Prices</li>
            <li>U.S. Energy Information Administration — Residential Energy Consumption Survey</li>
            <li>U.S. Environmental Protection Agency — GHG Emission Factors Hub</li>
          </ul>
          <p className="text-xs pt-1">
            DOE&apos;s utility guidance is particularly relevant to the TOU section because it explicitly discusses energy charges, fixed charges, demand charges and time-variable pricing. EIA&apos;s current electricity-price data support the discussion of rate variation and current U.S. residential pricing. EIA&apos;s current 2024 RECS release provides updated household energy-use and appliance-related data for the U.S. residential sector. EPA&apos;s current Emission Factors Hub includes updated electricity factors and eGRID-derived information.
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
            href="/calculators/btu-calculator"
            className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>BTU Calculator</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
          </Link>
          <Link
            href="/calculators/conversion-calculator"
            className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Conversion Calculator</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ElectricityContent;

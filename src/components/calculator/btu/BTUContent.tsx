"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, Flame, Compass, ArrowRight } from "lucide-react";
import { btu_calculatorFaqs } from "@/app/calculators/btu-calculator/faq";

export function BTUContent() {
  // All FAQs open by default (unfolded, 401(k) executive style)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: btu_calculatorFaqs.length }, (_, i) => i))
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
      
      {/* ── 0. RELATED CALCULATORS (TOP BLOCK) ── */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 not-prose">
        <span className="text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px] font-bold">
          Related Calculators:
        </span>
        <Link
          href="/calculators/square-footage-calculator"
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
        >
          Square Footage Calculator
        </Link>
        <span className="text-slate-300 dark:text-slate-600">|</span>
        <Link
          href="/calculators/electricity-calculator"
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
        >
          Electricity Calculator
        </Link>
      </div>

      {/* ── 1. EXPANDED MAIN EDUCATIONAL CONTENT (21 COMPLETE SECTIONS) ── */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 pt-6">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is a BTU?
          </h2>
          <p>
            A British thermal unit (BTU) is a unit used to describe an amount of heat energy. NIST defines a BTU as the quantity of heat required to raise the temperature of one pound of water by 1°F under its specified reference conditions.
          </p>
          <p>
            In HVAC work, however, you will commonly see BTU per hour (BTU/hr) rather than a bare BTU. BTU/hr describes the rate at which heating or cooling capacity is delivered or removed. That distinction matters when choosing an air conditioner, estimating heating requirements, or comparing equipment capacity.
          </p>
          <p>
            This BTU Calculator uses BTU/hr as the primary capacity unit and converts the result into related quantities such as refrigeration tons and kilowatts where applicable. It also includes separate tools for cooling estimates, heating-load estimates, and electricity-cost comparisons.
          </p>
          <p>
            The calculator is designed to answer practical questions such as:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>How many BTUs does a room need for cooling?</li>
            <li>What AC tonnage corresponds to a calculated cooling load?</li>
            <li>How many BTUs per hour are required for a simplified heating estimate?</li>
            <li>How does a higher SEER rating affect operating cost?</li>
            <li>What is the approximate electricity cost of running an air conditioner?</li>
          </ul>
          <p>
            For room air conditioners, ENERGY STAR likewise expresses cooling capacity in BTUs per hour and recommends determining the area being cooled before selecting the appropriate capacity.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. What Does BTU/hr Mean for Air Conditioning?
          </h2>
          <p>
            For an air conditioner, a BTU/hr rating represents the rate of heat removal capacity.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 not-prose my-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400 block mb-0.5">12,000 BTU/hr</span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">1 refrigeration ton</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400 block mb-0.5">24,000 BTU/hr</span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">2 refrigeration tons</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400 block mb-0.5">36,000 BTU/hr</span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">3 refrigeration tons</span>
            </div>
          </div>
          <p>
            The conventional relationship is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg font-mono text-xs text-blue-700 dark:text-blue-400 border border-slate-200 dark:border-slate-700/60">
            1 ton = 12,000 BTU/hr
          </div>
          <p>
            The U.S. Department of Energy also describes residential air-conditioning capacity using this 12,000-BTU-per-hour-per-ton convention.
          </p>
          <p>
            This means tonnage is simply another way of expressing cooling capacity. A calculated requirement of 8,750 BTU/hr corresponds to:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-md font-mono text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
            8,750 ÷ 12,000 = 0.729 ton
          </div>
          <p>
            The calculator reports both the calculated tonnage and a practical commercial tonnage step where applicable. This is useful because real HVAC equipment is commonly sold in standardized capacity ranges rather than arbitrary fractional values.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. How the AC Cooling BTU Calculator Works
          </h2>
          <p>
            The cooling calculator begins with the floor area of the room or space and then applies additional factors. For a rectangular room:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-md font-mono text-xs text-blue-700 dark:text-blue-400 border border-slate-200 dark:border-slate-700/60">
            Area = Length × Width (e.g., 15 ft × 20 ft = 300 ft²)
          </div>
          <p>
            If your room has an L-shaped layout or multiple alcoves, calculate total area first using our{" "}
            <Link href="/calculators/square-footage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Square Footage Calculator
            </Link>{" "}
            and switch the tool into Direct Area mode.
          </p>
          <p>
            ENERGY STAR&apos;s room-air-conditioner guidance similarly starts with the square footage of the area being cooled and provides capacity ranges associated with different room sizes. It also notes that its room-air-conditioner capacity table is based on an 8-foot ceiling.
          </p>
          <p>
            This calculator expands that basic idea by considering:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-xs space-y-1 border border-slate-200 dark:border-slate-700/60 font-mono text-slate-700 dark:text-slate-300">
            <div>Floor area</div>
            <div>+ Ceiling-height adjustment</div>
            <div>+ Occupancy adjustment</div>
            <div>+ Room-type adjustment</div>
            <div className="pt-1 text-blue-700 dark:text-blue-400">Multiplied by selected factors for: Sun exposure × Insulation × Climate zone</div>
          </div>
          <p>
            The calculator therefore provides more context than simply multiplying room length and width by a generic rule.
          </p>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-2">
            Why floor area matters
          </h3>
          <p>
            A larger conditioned area generally requires greater cooling capacity because there is more space and building surface area contributing to the thermal load. For standard room-air-conditioner sizing, ENERGY STAR publishes capacity ranges such as 5,000 BTU/hr for smaller spaces and progressively larger capacity recommendations as the cooled area increases.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Ceiling Height, Occupants, Sun and Insulation
          </h2>
          <p>
            Room size is only part of the problem.
          </p>
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Ceiling height</h3>
            <p>
              The calculator includes an adjustment when ceiling height exceeds the baseline condition used by the calculation model. A room with unusually high ceilings contains more conditioned air volume than a room with an otherwise identical floor area and standard ceiling height.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Occupancy</h3>
            <p>
              People add sensible and latent heat to a conditioned space. This is why cooling-load calculations can increase when more people regularly occupy the room. The calculator uses an occupancy adjustment within its specified model. ENERGY STAR&apos;s room-air-conditioner guidance also recommends adding 600 BTU/hr for each person above two occupants under its room-sizing procedure.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Sun exposure</h3>
            <p>
              Direct solar gain can increase cooling requirements. The calculator therefore distinguishes shaded, moderate, and high-sun conditions. ENERGY STAR similarly recommends reducing room-air-conditioner capacity by 10% for heavily shaded rooms and increasing it by 10% for very sunny rooms.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Insulation</h3>
            <p>
              Insulation affects how readily heat flows through the building envelope. Better insulation generally reduces the cooling load, while poor insulation can increase it. The calculator represents this through selectable insulation multipliers.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Worked Example: 300 ft² Room
          </h2>
          <p>
            Consider the calculator&apos;s reference example:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs font-sans space-y-1.5">
            <div><strong>Length:</strong> 15 ft | <strong>Width:</strong> 20 ft | <strong>Ceiling height:</strong> 9 ft</div>
            <div><strong>Occupants:</strong> 2 | <strong>Room type:</strong> Bedroom | <strong>Insulation:</strong> Average</div>
            <div><strong>Sun exposure:</strong> Moderate | <strong>Climate:</strong> Moderate (Mid-Atlantic)</div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-xs font-mono space-y-1 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300">
            <div>1. Area = 15 ft × 20 ft = 300 ft²</div>
            <div>2. Area-based baseline (for 300 ft²): 8,000 BTU/hr</div>
            <div>3. 9-foot ceiling offset (1 ft over 8 ft baseline): +750 BTU/hr</div>
            <div>4. 2 occupants: 0 BTU/hr (standard baseline)</div>
            <div>5. Selected environmental factors: 1.00 × 1.00 × 1.00</div>
            <div className="pt-1 font-bold text-blue-700 dark:text-blue-400">
              Total Required Cooling: 8,000 + 750 = 8,750 BTU/hr
            </div>
          </div>
          <p>
            The calculator therefore reports:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Cooling capacity:</strong> 8,750 BTU/hr</li>
            <li><strong>Exact tonnage:</strong> ≈ 0.73 ton</li>
            <li><strong>Commercial tonnage:</strong> 0.75 ton</li>
            <li><strong>Power equivalent:</strong> ≈ 2.56 kW (3.43 HP)</li>
            <li><strong>Equipment category:</strong> Window Unit</li>
          </ul>
          <p>
            That result should be treated as a planning estimate produced by the calculator&apos;s stated model, not as a substitute for a detailed professional HVAC load calculation.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. BTU to Tons: How to Convert Cooling Capacity
          </h2>
          <p>
            The basic conversion is:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-md font-mono text-xs text-blue-700 dark:text-blue-400 border border-slate-200 dark:border-slate-700/60">
            Tons = BTU/hr ÷ 12,000
          </div>
          <div className="overflow-x-auto not-prose my-3">
            <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-700">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 font-bold">
                  <th className="border border-slate-200 dark:border-slate-700 p-2.5 text-left">Cooling Capacity</th>
                  <th className="border border-slate-200 dark:border-slate-700 p-2.5 text-left">Exact Tonnage</th>
                  <th className="border border-slate-200 dark:border-slate-700 p-2.5 text-left">Commercial Equipment Mapping</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr>
                  <td className="p-2.5 font-mono font-semibold">6,000 BTU/hr</td>
                  <td className="p-2.5">0.50 ton</td>
                  <td className="p-2.5">0.50 Ton Small Window Unit</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-semibold">8,750 BTU/hr</td>
                  <td className="p-2.5">0.73 ton</td>
                  <td className="p-2.5">0.75 Ton Medium Window / 9k Mini-Split</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-semibold">12,000 BTU/hr</td>
                  <td className="p-2.5">1.00 ton</td>
                  <td className="p-2.5">1.00 Ton Large Window / 12k Mini-Split</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-semibold">18,000 BTU/hr</td>
                  <td className="p-2.5">1.50 tons</td>
                  <td className="p-2.5">1.50 Ton Multi-Split / Ducted System</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-semibold">24,000 BTU/hr</td>
                  <td className="p-2.5">2.00 tons</td>
                  <td className="p-2.5">2.00 Ton Central AC / Heat Pump</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-semibold">36,000 BTU/hr</td>
                  <td className="p-2.5">3.00 tons</td>
                  <td className="p-2.5">3.00 Ton Whole-House Central Air</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The calculator maps the exact result to standardized commercial tonnage values because calculated tonnage does not necessarily equal the exact equipment size you purchase. A piece of equipment is selected based on available model capacities, manufacturer performance data, design conditions, and the actual building load.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. BTU to kW Conversion
          </h2>
          <p>
            BTU/hr can also be expressed as thermal power. The calculator uses:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-md font-mono text-xs text-blue-700 dark:text-blue-400 border border-slate-200 dark:border-slate-700/60">
            kW = BTU/hr ÷ 3412.142
          </div>
          <p>
            For the 8,750 BTU/hr example:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-md font-mono text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
            8,750 ÷ 3412.142 ≈ 2.56 kW
          </div>
          <p>
            This is a useful conversion for comparing thermal capacity with electrical energy concepts. However, it is important not to interpret the converted 2.56 kW as automatically meaning that the air conditioner draws exactly 2.56 kW of electricity. BTU/hr is cooling capacity. Electrical input depends on equipment efficiency. That distinction becomes important when using the calculator&apos;s SEER and energy-cost module.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Heating BTU Calculator
          </h2>
          <p>
            Cooling and heating loads are related to the same basic physics but should not be treated as identical calculations. The heating module estimates required heating capacity from:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-xs font-mono space-y-0.5 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300">
            <div>Building volume (Length × Width × Height)</div>
            <div>× Temperature difference (ΔT = Indoor design temp − Outdoor design low)</div>
            <div>× Envelope heat-loss factor (H)</div>
            <div>× Altitude adjustment factor</div>
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-2">
            Worked heating example
          </h3>
          <p>
            Using: Length = 30 ft, Width = 40 ft, Height = 9 ft, Indoor = 70°F, Outdoor = 20°F.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-xs font-mono space-y-1 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300">
            <div>Volume: 30 × 40 × 9 = 10,800 ft³ (305.8 m³)</div>
            <div>Temperature difference: 70 − 20 = 50°F</div>
            <div>Envelope factor (Average/Standard): 0.13 BTU / (hr · ft³ · °F)</div>
            <div className="pt-1 font-bold text-blue-700 dark:text-blue-400">
              Estimated Load: 10,800 × 50 × 0.13 = 70,200 BTU/hr (20.57 kW)
            </div>
          </div>
          <p>
            The corresponding thermal-power equivalent is approximately 70,200 ÷ 3412.142 ≈ 20.57 kW. The calculator also estimates fuel-equivalent consumption under its configured 85% AFUE assumption.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. What Is AFUE?
          </h2>
          <p>
            Annual Fuel Utilization Efficiency (AFUE) is used to describe the efficiency of fuel-burning heating equipment. The calculator&apos;s fuel-equivalent module uses an 85% AFUE assumption when converting the calculated heat requirement into estimated natural-gas, propane, and other fuel consumption.
          </p>
          <p>
            For example, its reference heating case produces approximately:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Natural gas:</strong> 0.826 therms/hr (70,200 ÷ [100,000 × 0.85])</li>
            <li><strong>Propane:</strong> 0.903 gal/hr (70,200 ÷ [91,500 × 0.85])</li>
            <li><strong>Electric resistance:</strong> 20.57 kWh/hr</li>
          </ul>
          <p>
            These are calculated energy-equivalent estimates, not guarantees of actual fuel consumption in a particular furnace or boiler. Actual performance depends on equipment efficiency, cycling, controls, distribution losses, operating conditions, and the building itself.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. What Is SEER?
          </h2>
          <p>
            SEER, and for newer U.S. equipment SEER2, describes the seasonal cooling efficiency of an air conditioner or heat pump. The basic concept is a ratio of cooling provided to electrical energy consumed. DOE and ENERGY STAR documentation describe SEER2 in BTU per watt-hour and note the transition to SEER2 ratings for equipment tested under the updated procedure beginning in 2023.
          </p>
          <p>
            A higher SEER value generally means less electricity is required to provide the same cooling output under the rating assumptions. The calculator&apos;s energy model simplifies this relationship as:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-md font-mono text-xs text-blue-700 dark:text-blue-400 border border-slate-200 dark:border-slate-700/60">
            Electrical power ≈ BTU rating ÷ SEER
          </div>
          <p>
            For an 18,000 BTU/hr unit at SEER 16:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-md font-mono text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
            18,000 ÷ 16 = 1,125 W = 1.125 kW
          </div>
          <p>
            This is an estimate based on the calculator&apos;s model rather than a prediction of instantaneous real-world compressor power under every condition.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. How Much Does an 18,000 BTU Air Conditioner Cost to Run?
          </h2>
          <p>
            Using the calculator&apos;s reference case:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs font-sans space-y-1">
            <div><strong>Cooling rating:</strong> 18,000 BTU/hr | <strong>SEER:</strong> 16</div>
            <div><strong>Operating time:</strong> 8 hours/day | <strong>Electricity rate:</strong> $0.16/kWh</div>
          </div>
          <p>
            To examine broader residential electric billing scenarios, explore our{" "}
            <Link href="/calculators/electricity-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Electricity Calculator
            </Link>
            . The specific AC cost breakdown is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-xs font-mono space-y-1 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300">
            <div>Electrical power: 18,000 ÷ 16 = 1.125 kW</div>
            <div>Daily energy: 1.125 kW × 8 h = 9.00 kWh/day</div>
            <div>Daily cost: 9.00 kWh × $0.16 = $1.44/day</div>
            <div>Monthly cost (average month 365/12 days): $1.44 × 30.416 ≈ $43.80/month</div>
            <div>Annual cost: $1.44 × 365 = $525.60/year</div>
          </div>
          <p>
            This makes the energy-cost calculator useful for comparing the effect of operating hours, electricity prices, and efficiency ratings.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. SEER Comparison: Does a Higher Rating Save Electricity?
          </h2>
          <p>
            Holding the cooling load, operating hours, and electricity price constant, increasing SEER reduces the calculator&apos;s modeled electrical input. For the same 18,000 BTU/hr system at 8 hours/day and $0.16/kWh:
          </p>
          <div className="overflow-x-auto not-prose my-3">
            <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-700">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 font-bold">
                  <th className="border border-slate-200 dark:border-slate-700 p-2.5 text-left">SEER Rating</th>
                  <th className="border border-slate-200 dark:border-slate-700 p-2.5 text-left">Approx. Power</th>
                  <th className="border border-slate-200 dark:border-slate-700 p-2.5 text-left">Estimated Annual Cost</th>
                  <th className="border border-slate-200 dark:border-slate-700 p-2.5 text-left">Annual Savings vs SEER 10</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono">
                <tr>
                  <td className="p-2.5 font-bold">SEER 10</td>
                  <td className="p-2.5">1.800 kW</td>
                  <td className="p-2.5 font-semibold text-slate-700 dark:text-slate-300">$840.96</td>
                  <td className="p-2.5 text-slate-400">—</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">SEER 14</td>
                  <td className="p-2.5">1.286 kW</td>
                  <td className="p-2.5 font-semibold text-slate-700 dark:text-slate-300">$600.69</td>
                  <td className="p-2.5 text-emerald-600 dark:text-emerald-400">$240.27/yr</td>
                </tr>
                <tr className="bg-blue-50/50 dark:bg-blue-950/20">
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">SEER 16 (Energy Star)</td>
                  <td className="p-2.5 text-blue-600 dark:text-blue-400">1.125 kW</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">$525.60</td>
                  <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">$315.36/yr</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">SEER 18</td>
                  <td className="p-2.5">1.000 kW</td>
                  <td className="p-2.5 font-semibold text-slate-700 dark:text-slate-300">$467.20</td>
                  <td className="p-2.5 text-emerald-600 dark:text-emerald-400">$373.76/yr</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">SEER 20</td>
                  <td className="p-2.5">0.900 kW</td>
                  <td className="p-2.5 font-semibold text-slate-700 dark:text-slate-300">$420.48</td>
                  <td className="p-2.5 text-emerald-600 dark:text-emerald-400">$420.48/yr</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">SEER 24</td>
                  <td className="p-2.5">0.750 kW</td>
                  <td className="p-2.5 font-semibold text-slate-700 dark:text-slate-300">$350.40</td>
                  <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">$490.56/yr</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The calculator displays this relationship visually in its SEER comparison chart. The key principle is straightforward: higher efficiency yields less modeled electricity per unit of cooling, translating directly into lower operating cost when other inputs remain constant.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Why AC Size Should Not Be Chosen From Square Footage Alone
          </h2>
          <p>
            A quick square-footage calculation is useful for an initial estimate, but it does not capture every factor that influences a real building&apos;s cooling load. Professional load calculations account for conditions such as:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Windows and glazing properties (U-factor and SHGC)</li>
            <li>Solar orientation and shading obstacles</li>
            <li>Air infiltration rates (ACH50 blower door ratings)</li>
            <li>Ventilation requirements and continuous fresh-air intake</li>
            <li>Building-envelope insulation and thermal mass</li>
            <li>Duct leakage and attic duct thermal conduction</li>
            <li>Internal heat gains from lighting and electronics</li>
            <li>Design outdoor summer dry-bulb and wet-bulb temperatures</li>
            <li>Moisture and latent cooling loads</li>
          </ul>
          <p>
            ACCA&apos;s Manual J standard includes detailed procedures addressing design conditions, fenestration, infiltration, internal loads, duct loads, ventilation, moisture migration, and other factors. That is why this calculator should be used as a fast estimating and educational tool, particularly during early planning, comparison, and feasibility checks.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. What Happens If an Air Conditioner Is Too Small?
          </h2>
          <p>
            An undersized system may struggle to remove enough heat during design conditions. Possible consequences include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Longer operating periods:</strong> The compressor runs continuously without cycling off.</li>
            <li><strong>Insufficient comfort:</strong> Indoor temperature remains elevated on hot summer afternoons (90°F+).</li>
            <li><strong>Failure to reach the setpoint:</strong> Rooms remain uncomfortable despite non-stop energy expenditure.</li>
            <li><strong>Excessive wear:</strong> Blower motors and compressor windings suffer continuous mechanical stress.</li>
          </ul>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. What Happens If an Air Conditioner Is Too Large?
          </h2>
          <p>
            Bigger does not automatically mean better. Oversized cooling equipment may satisfy the thermostat quickly and cycle off before adequately controlling indoor moisture in humid conditions.
          </p>
          <p>
            ENERGY STAR specifically warns that oversized room air conditioners can contribute to discomfort because inadequate run time can leave cool air feeling damp and clammy. Short continuous runtimes prevent the cooling coils from condensing moisture from the air, keeping relative humidity above 60% and fostering mold and mildew growth.
          </p>
          <p>
            The objective is not maximum BTU capacity, but rather capacity appropriate for the actual load.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. How to Use This BTU Calculator
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 not-prose">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400 block uppercase">For Cooling</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 m-0">
                Enter room length and width (or direct area), ceiling height, occupants, room type, insulation, sun exposure, and climate zone. Returns BTU/hr, tonnage, kW, and equipment category.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400 block uppercase">For Heating</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 m-0">
                Enter building length, width, ceiling height, indoor setpoint, design outdoor low, insulation condition, and altitude. Returns required heating BTU/hr and fuel consumption.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400 block uppercase">For Operating Cost</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 m-0">
                Enter appliance BTU rating, SEER efficiency, daily operating hours, and electricity rate. Compares daily, monthly, annual operating cost and CO₂ emissions across SEER tiers.
              </p>
            </div>
          </div>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. BTU Calculator Limitations
          </h2>
          <p>
            This calculator intentionally provides a practical estimating model rather than attempting to reproduce every requirement of a formal HVAC design standard. The cooling module uses an area-based capacity model plus selected adjustments. The heating module uses a simplified volumetric heat-loss model. The operating-cost module uses a simplified BTU/efficiency relationship and a fixed grid-emissions factor for its carbon estimate.
          </p>
          <p>
            ACCA describes Manual J as the recognized residential load-calculation standard and notes that detailed load calculations are used for proper HVAC system sizing.
          </p>

          {/* E-E-A-T Sizing Disclaimer Callout */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5 not-prose">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              HVAC Sizing Disclaimer &amp; Verification Guidance
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed m-0">
              This calculator provides an estimate based on the inputs and calculation model described on this page. Actual HVAC loads depend on building construction, windows, insulation, infiltration, solar exposure, climate, ducts, equipment performance and other site-specific conditions. For final HVAC equipment selection, verify the result with an appropriate professional load calculation, manufacturer performance data and applicable local requirements.
            </p>
          </div>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            18. BTU, Tons, kW and SEER: The Difference
          </h2>
          <p>
            These terms are related, but they do not mean the same thing:
          </p>
          <div className="overflow-x-auto not-prose my-3">
            <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-700">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 font-bold">
                  <th className="border border-slate-200 dark:border-slate-700 p-2.5 text-left">Term</th>
                  <th className="border border-slate-200 dark:border-slate-700 p-2.5 text-left">What It Describes</th>
                  <th className="border border-slate-200 dark:border-slate-700 p-2.5 text-left">Standard Conversion / Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr>
                  <td className="p-2.5 font-bold font-mono text-blue-600 dark:text-blue-400">BTU/hr</td>
                  <td className="p-2.5">Rate of heating or cooling thermal capacity</td>
                  <td className="p-2.5 font-mono">1 BTU/hr = 0.293071 W</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold font-mono text-blue-600 dark:text-blue-400">Ton</td>
                  <td className="p-2.5">Refrigeration cooling capacity unit</td>
                  <td className="p-2.5 font-mono">1 Ton = 12,000 BTU/hr (3.517 kW)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold font-mono text-blue-600 dark:text-blue-400">kW</td>
                  <td className="p-2.5">Power unit used for thermal or electrical calculations</td>
                  <td className="p-2.5 font-mono">1 kW = 3,412.142 BTU/hr</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold font-mono text-blue-600 dark:text-blue-400">SEER / SEER2</td>
                  <td className="p-2.5">Seasonal cooling energy efficiency rating</td>
                  <td className="p-2.5 font-mono">BTU total cooling ÷ Watt-hours electrical draw</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold font-mono text-blue-600 dark:text-blue-400">AFUE</td>
                  <td className="p-2.5">Seasonal efficiency for combustion heating equipment</td>
                  <td className="p-2.5 font-mono">% of chemical fuel converted into usable heat</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            A common mistake is to treat BTU capacity and electrical consumption as interchangeable. They are not. An 18,000 BTU/hr air conditioner does not consume 18,000 BTU/hr worth of electricity; its electrical draw depends on efficiency (SEER) and operating ambient conditions.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            19. Practical BTU Sizing Examples
          </h2>
          <div className="space-y-2.5">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-slate-100 block mb-1">Example 1: Small bedroom (150 sq ft)</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 m-0">
                A 10 ft × 15 ft room with average insulation and 2 occupants requires ~6,000 BTU/hr (0.50 Ton). Enter the actual room dimensions rather than relying solely on a generic BTU-per-square-foot rule.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-slate-100 block mb-1">Example 2: High-ceiling living room (300 sq ft, 10 ft ceiling)</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 m-0">
                Two rooms can have the same floor area while having different ceiling heights. A 10-foot ceiling adds an extra +1,500 BTU offset over the 8-foot baseline, taking load from 8,000 to 9,500 BTU/hr.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-slate-100 block mb-1">Example 3: Kitchen with cooking equipment</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 m-0">
                A kitchen has additional internal heat gains from ranges and refrigerators. ENERGY STAR recommends adding +4,000 BTU/hr to account for sensible appliance heat gains.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-slate-100 block mb-1">Example 4: Sunny master suite</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 m-0">
                A strongly sun-exposed south-facing bedroom receives a +10% solar gain multiplier in the model, taking load from 8,750 to 9,625 BTU/hr.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-slate-100 block mb-1">Example 5: Upgrading from SEER 14 to SEER 20</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 m-0">
                Two units can provide the same 18,000 BTU/hr cooling capacity while consuming vastly different amounts of electricity. Upgrading from SEER 14 ($601/yr) to SEER 20 ($420/yr) saves over $180 every year in operating electricity costs.
              </p>
            </div>
          </div>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            20. How Accurate Is a BTU Calculator?
          </h2>
          <p>
            Accuracy depends on what question you are asking.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose my-2">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400 block uppercase">What This Calculator Solves</span>
              <ul className="text-xs text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1 m-0">
                <li>Basic capacity estimation</li>
                <li>BTU-to-ton conversion</li>
                <li>BTU-to-kW conversion</li>
                <li>Simple energy-cost comparison</li>
                <li>SEER efficiency payback comparisons</li>
              </ul>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-200 block uppercase">When Formal Manual J Is Required</span>
              <ul className="text-xs text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1 m-0">
                <li>Final HVAC equipment purchasing &amp; permits</li>
                <li>Ductwork sizing and static pressure calculation</li>
                <li>Room-by-room zoning layout</li>
                <li>Complex multi-story architectural heat loss</li>
                <li>Building energy code documentation</li>
              </ul>
            </div>
          </div>
          <p>
            Therefore, the right way to interpret this tool is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-xs font-semibold text-center text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
            Fast estimate → Compare options → Understand capacity → Professional verification → Final equipment choice
          </div>
        </section>

        {/* Section 21 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            21. BTU Calculator Summary
          </h2>
          <p>
            A BTU calculator helps translate physical building characteristics and operating assumptions into useful HVAC capacity and energy estimates. The most important concepts are:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>BTU/hr:</strong> Rate of heating or cooling capacity delivered or removed.</li>
            <li><strong>1 Ton:</strong> Exactly 12,000 BTU/hr of cooling capacity.</li>
            <li><strong>Cooling load:</strong> Depends on more than floor area—higher ceilings, higher occupancy, and direct sun exposure increase demand.</li>
            <li><strong>Insulation:</strong> Materially affects both heating heat-loss and cooling heat-gain rates.</li>
            <li><strong>SEER:</strong> Seasonal efficiency rating; higher SEER reduces electrical wattage draw for the same cooling capacity.</li>
            <li><strong>Operating cost:</strong> Depends on capacity × efficiency × running hours × local electricity rate.</li>
          </ul>
          <p>
            For quick planning, this BTU Calculator combines cooling estimates, heating estimates, tonnage conversion, energy-cost calculations, and SEER comparison in one place. Use the calculated result as a starting point, then verify important HVAC decisions against the actual building conditions and professional load-design requirements.
          </p>
        </section>
      </div>

      {/* ── 2. RELATED CALCULATORS (BOTTOM BLOCK) ── */}
      <div className="pt-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 not-prose">
          <span className="text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px] font-bold">
            Related Calculators:
          </span>
          <Link
            href="/calculators/square-footage-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
          >
            Square Footage Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <Link
            href="/calculators/electricity-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
          >
            Electricity Calculator
          </Link>
        </div>
      </div>

      {/* ── 3. FAQ SECTION (Unfolded by Default, 401(k) Executive Style) ── */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {btu_calculatorFaqs.map((faq, idx) => {
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
                      Q{idx + 1}.
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

    </article>
  );
}

export default BTUContent;

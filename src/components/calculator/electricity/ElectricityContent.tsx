import React from "react";

export function ElectricityContent() {
  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-200">
      {/* 1. Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          1. Introduction to Electrical Power &amp; Energy Dynamics
        </h2>
        <p className="text-sm leading-relaxed">
          Electrical power is the instantaneous rate at which electrical energy is transferred by an electric circuit, measured in Watts ($W$) or Kilowatts ($kW$). In contrast, electrical energy is the cumulative product of power demand over duration, billed by power utilities worldwide in Kilowatt-hours ($kWh$) or &quot;Units&quot; (in India). Accurate energy forecasting requires modeling device wattage, duty cycle (% active load), and regional tariff schedules.
        </p>
      </section>

      {/* 2. Mathematical Concept & Core Equations */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          2. Mathematical Formulas for Power, Energy &amp; Cost
        </h2>

        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-3 text-xs font-mono">
          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">
              A. Fundamental Energy Consumption Equation
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Energy (kWh) = [ Power (Watts) × Duty Cycle (%) × Operating Time (Hours) ] / 1,000"}<br />
              {"Monthly Energy (kWh) = Daily kWh × 30.4375"}<br />
              {"Annual Energy (kWh) = Daily kWh × 365.25"}
            </p>
          </div>

          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">
              B. Utility Billing &amp; Time-of-Use (TOU) Rates
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Total Cost = (Peak kWh × Peak Rate) + (Off-Peak kWh × Off-Peak Rate) + Fixed Grid Fee"}<br />
              {"Effective Blended Rate ($/kWh) = (Energy Cost) / (Total kWh)"}
            </p>
          </div>

          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">
              C. Power Unit Conversions
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"1 Kilowatt (kW) = 1,000 Watts (W)"}<br />
              {"1 Mechanical Horsepower (hp) = 745.7 Watts"}<br />
              {"1 Metric Horsepower (PS) = 735.5 Watts"}<br />
              {"1 Ton of Refrigeration (TR) = 12,000 BTU/hr = 3,516.85 Watts"}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Comprehensive Appliance Wattage & Duty Cycle Matrix */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          3. Typical Appliance Wattage &amp; Duty Cycle Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
              <tr>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Appliance Category</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Typical Wattage (W)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Daily Duty Cycle (%)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Est. Monthly kWh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2 font-bold text-blue-700 dark:text-blue-300">Central AC (3.5 kW / 3 Ton)</td>
                <td className="p-2">3,000W – 4,500W</td>
                <td className="p-2">60% – 75% (compressor cycle)</td>
                <td className="p-2">550 – 900 kWh</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-blue-700 dark:text-blue-300">Inverter Split AC (1.5 Ton)</td>
                <td className="p-2">1,200W – 1,600W</td>
                <td className="p-2">50% – 60% (variable speed)</td>
                <td className="p-2">180 – 290 kWh</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-emerald-700 dark:text-emerald-300">Refrigerator (Frost-Free)</td>
                <td className="p-2">150W – 300W</td>
                <td className="p-2">30% – 40% (24 hrs/day)</td>
                <td className="p-2">35 – 70 kWh</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-amber-700 dark:text-amber-300">Water Heater / Geyser</td>
                <td className="p-2">2,500W – 4,500W</td>
                <td className="p-2">100% (when heating)</td>
                <td className="p-2">150 – 270 kWh</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-purple-700 dark:text-purple-300">Level 2 EV Charger (240V / 32A)</td>
                <td className="p-2">7,200W – 9,600W</td>
                <td className="p-2">100% (while charging)</td>
                <td className="p-2">250 – 600 kWh</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-zinc-700 dark:text-zinc-300">LED Lighting (10 bulbs @ 9W)</td>
                <td className="p-2">90W total</td>
                <td className="p-2">100% (6 hrs/day)</td>
                <td className="p-2">16.4 kWh</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Phantom Loads / Vampire Draw */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          4. Vampire Power &amp; Standby Consumption
        </h2>
        <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          Standby power (or phantom load) refers to the electric power consumed by electronic devices while turned off or in standby mode. Across modern households, standby draw accounts for <strong>5% to 10% of residential electricity bills</strong> (~100 to 200 kWh per year). Common culprits include smart TVs, game consoles, set-top cable boxes, microwave digital clocks, and unswitched smart home plugs.
        </p>
      </section>

      {/* 5. Step-by-Step Worked Calculation */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          5. Step-by-Step Worked Calculation Example
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2 font-mono text-xs">
          <p className="font-sans font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
            <strong>Problem:</strong> Calculate the monthly energy consumption, electric bill, and annual carbon emissions of a 1.5-ton split AC (1,500 Watts) running 8 hours per day at a 60% compressor duty cycle, with an electricity tariff of $0.16/kWh.
          </p>

          <p><strong>Step 1: Calculate Effective Operating Power</strong><br />
          {"Effective Power = 1,500 Watts × 0.60 duty cycle = 900 Watts (0.90 kW)"}</p>

          <p><strong>Step 2: Calculate Daily Energy Consumption</strong><br />
          {"Daily Energy = (900 Watts × 8 Hours) / 1,000 = 7.20 kWh / day"}</p>

          <p><strong>Step 3: Calculate Monthly &amp; Annual Energy</strong><br />
          {"Monthly Energy = 7.20 kWh × 30.4375 days = 219.15 kWh / month"}<br />
          {"Annual Energy = 7.20 kWh × 365.25 days = 2,629.80 kWh / year"}</p>

          <p><strong>Step 4: Calculate Operating Costs &amp; Carbon Footprint</strong><br />
          {"Monthly Cost = 219.15 kWh × $0.16/kWh = $35.06 / month"}<br />
          {"Annual Cost = 2,629.80 kWh × $0.16/kWh = $420.77 / year"}<br />
          {"Carbon Emissions = 2,629.80 kWh × 0.386 kg CO2e/kWh = 1,015 kg CO2e / year (1.02 Metric Tonnes)"}</p>
        </div>
      </section>

      {/* 6. Practical Energy Conservation Strategies */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          6. High-Impact Energy Efficiency Strategies
        </h2>
        <ul className="list-disc list-inside text-xs space-y-1 text-zinc-700 dark:text-zinc-300">
          <li><strong>LED Retrofit:</strong> Replacing incandescent 60W bulbs with 9W LEDs cuts lighting power consumption by 85% with immediate payback within 2 to 4 months.</li>
          <li><strong>Thermostat Optimization:</strong> Adjusting cooling thermostats upward by 1°C (2°F) reduces air conditioner compressor workload and energy consumption by ~6% to 8%.</li>
          <li><strong>Off-Peak EV Scheduling:</strong> Charging electric vehicles during utility off-peak windows (11:00 PM to 6:00 AM) saves up to 50% on Level 2 charging costs under Time-of-Use tariffs.</li>
        </ul>
      </section>
    </div>
  );
}

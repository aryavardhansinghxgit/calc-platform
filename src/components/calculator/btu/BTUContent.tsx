"use client";

import React from "react";

export function BTUContent() {
  return (
    <article className="prose prose-sm dark:prose-invert max-w-none space-y-8 text-zinc-800 dark:text-zinc-200">
      {/* ── 1. Introduction & Thermodynamic Definition ── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          1. What Is a BTU? Thermodynamic Definition &amp; Core Principles
        </h2>
        <p>
          A <strong>British Thermal Unit (BTU)</strong> is a traditional unit of heat energy defined as the amount of thermal energy required to raise the temperature of <strong>one pound (0.4536 kg) of liquid water by one degree Fahrenheit (0.556 °C)</strong> at standard atmospheric pressure (14.696 psia) at approximately 39.1 °F (maximum density of water).
        </p>
        <p>
          In heating, ventilation, and air conditioning (HVAC) engineering, BTU is almost universally used as a rate of heat transfer per unit of time, specifically <strong>BTU per hour (BTU/hr)</strong>. For cooling systems, BTUs measure the rate at which thermal energy is <em>extracted</em> from an enclosed space, whereas for heating systems, BTUs quantify the rate at which heat is <em>injected</em> into the building envelope.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 not-prose my-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800/60">
            <span className="text-xs font-bold text-blue-800 dark:text-blue-300 block mb-1">1 BTU</span>
            <span className="text-[11px] text-zinc-600 dark:text-zinc-400">1,055.056 Joules (J) = 252.164 calories</span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800/60">
            <span className="text-xs font-bold text-blue-800 dark:text-blue-300 block mb-1">1 Watt</span>
            <span className="text-[11px] text-zinc-600 dark:text-zinc-400">3.412142 BTU/hr (1 kW = 3,412.14 BTU/hr)</span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800/60">
            <span className="text-xs font-bold text-blue-800 dark:text-blue-300 block mb-1">1 Ton of Refrigeration</span>
            <span className="text-[11px] text-zinc-600 dark:text-zinc-400">12,000 BTU/hr = 3.51685 kW of cooling</span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800/60">
            <span className="text-xs font-bold text-blue-800 dark:text-blue-300 block mb-1">1 Therm (Natural Gas)</span>
            <span className="text-[11px] text-zinc-600 dark:text-zinc-400">100,000 BTU = 29.3 kWh</span>
          </div>
        </div>
      </section>

      {/* ── 2. Mathematical Heat Load Formulas ── */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          2. Mathematical Heat Load Formulas &amp; Engineering Physics
        </h2>
        <p>
          HVAC load estimation is grounded in the First and Second Laws of Thermodynamics. Heat spontaneously flows from regions of higher temperature to regions of lower temperature through conduction, convection, radiation, and air infiltration.
        </p>

        {/* Heating formula */}
        <div className="bg-slate-50 dark:bg-zinc-800/60 rounded-lg p-4 border border-slate-200 dark:border-zinc-700/60 space-y-2">
          <h3 className="font-bold text-sm text-blue-700 dark:text-blue-300 m-0">
            A. Conductive &amp; Convective Building Heat Loss Formula (Heating Load)
          </h3>
          <div className="font-mono text-xs bg-white dark:bg-zinc-900 p-2.5 rounded border border-zinc-200 dark:border-zinc-800 text-blue-600 dark:text-blue-400">
            Q_heat (BTU/hr) = Volume (ft³) × ΔT (°F) × Heat Loss Coefficient (H)
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 m-0">
            Where <code>ΔT = T_indoor - T_outdoor_low</code>. The heat loss coefficient <code>H</code> represents the overall building thermal envelope transfer rate in <code>BTU / (hr · ft³ · °F)</code>:
          </p>
          <ul className="text-xs text-zinc-600 dark:text-zinc-400 list-disc pl-5 space-y-1">
            <li><strong>Poor / Drafty Envelope:</strong> <code>H ≈ 0.18</code> (Uninsulated 2x4 framing, single-pane windows, leaky building envelope).</li>
            <li><strong>Average / Standard Construction:</strong> <code>H ≈ 0.13</code> (R-13 walls, R-30 attic, double-pane vinyl windows).</li>
            <li><strong>Tight / Energy-Efficient Envelope:</strong> <code>H ≈ 0.08</code> (R-21+ walls with continuous exterior foam, R-50 attic, Low-E argon windows, air tightness &lt; 2.0 ACH50).</li>
          </ul>
        </div>

        {/* Cooling formula */}
        <div className="bg-slate-50 dark:bg-zinc-800/60 rounded-lg p-4 border border-slate-200 dark:border-zinc-700/60 space-y-2">
          <h3 className="font-bold text-sm text-blue-700 dark:text-blue-300 m-0">
            B. Multi-Factor Cooling Load Formula (AC Sizing)
          </h3>
          <div className="font-mono text-xs bg-white dark:bg-zinc-900 p-2.5 rounded border border-zinc-200 dark:border-zinc-800 text-blue-600 dark:text-blue-400">
            Q_cool (BTU/hr) = [Q_base(Area) + Q_ceiling + Q_occupants + Q_appliance] × F_sun × F_insulation × F_climate
          </div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
            <p><strong>Correction Multipliers:</strong></p>
            <ul className="list-disc pl-5 space-y-0.5">
              <li><code>Q_occupants</code>: Standard base includes 2 occupants. Add <strong>+600 BTU/hr</strong> for each occupant above 2 (subtract 400 BTU for 0–1).</li>
              <li><code>Q_appliance</code>: Add <strong>+4,000 BTU/hr</strong> for kitchens (stoves/refrigerators) and <strong>+5,000 BTU/hr</strong> for server rooms.</li>
              <li><code>F_sun</code>: Shaded rooms = <strong>0.90</strong>; Average exposure = <strong>1.00</strong>; Heavy direct solar gain = <strong>1.10</strong>.</li>
              <li><code>F_insulation</code>: Poor = <strong>1.25</strong>; Average = <strong>1.00</strong>; Good = <strong>0.90</strong>; Excellent = <strong>0.80</strong>.</li>
              <li><code>F_climate</code>: Moderate = <strong>1.00</strong>; Hot &amp; Humid (high latent moisture load) = <strong>1.15</strong>.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 3. Energy Star Sizing Chart ── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          3. Energy Star Recommended AC Sizing Reference Table
        </h2>
        <p>
          The table below reflects baseline cooling capacity recommendations established by the U.S. Department of Energy (DOE) and EnergyStar.gov for standard 8-foot ceilings:
        </p>
        <div className="overflow-x-auto not-prose">
          <table className="w-full text-xs border-collapse border border-zinc-200 dark:border-zinc-700">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-950/40 text-zinc-800 dark:text-zinc-200 font-bold">
                <th className="border border-zinc-200 dark:border-zinc-700 p-2.5 text-left">Room Area (sq ft)</th>
                <th className="border border-zinc-200 dark:border-zinc-700 p-2.5 text-left">Room Area (m²)</th>
                <th className="border border-zinc-200 dark:border-zinc-700 p-2.5 text-left">Baseline Cooling (BTU/hr)</th>
                <th className="border border-zinc-200 dark:border-zinc-700 p-2.5 text-left">AC Tonnage Equivalent</th>
                <th className="border border-zinc-200 dark:border-zinc-700 p-2.5 text-left">Recommended Equipment Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2.5 font-semibold">100 – 150 sq ft</td>
                <td className="p-2.5">9.3 – 13.9 m²</td>
                <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400 font-bold">5,000 – 6,000 BTU</td>
                <td className="p-2.5 font-sans">0.50 Ton</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">Small Window Unit / Compact Portable</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold">150 – 250 sq ft</td>
                <td className="p-2.5">13.9 – 23.2 m²</td>
                <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400 font-bold">6,000 – 7,000 BTU</td>
                <td className="p-2.5 font-sans">0.55 – 0.60 Ton</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">Standard Bedroom Window AC / 9k Mini-Split</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold">250 – 350 sq ft</td>
                <td className="p-2.5">23.2 – 32.5 m²</td>
                <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400 font-bold">7,000 – 8,500 BTU</td>
                <td className="p-2.5 font-sans">0.75 Ton</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">Large Bedroom / Medium Living Room AC</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold">350 – 450 sq ft</td>
                <td className="p-2.5">32.5 – 41.8 m²</td>
                <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400 font-bold">9,000 – 10,500 BTU</td>
                <td className="p-2.5 font-sans">0.75 – 1.0 Ton</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">Ductless Mini-Split / Master Suite Unit</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold">450 – 550 sq ft</td>
                <td className="p-2.5">41.8 – 51.1 m²</td>
                <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400 font-bold">12,000 – 14,000 BTU</td>
                <td className="p-2.5 font-sans">1.0 – 1.25 Ton</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">Studio Apartment / 12k Mini-Split</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold">550 – 700 sq ft</td>
                <td className="p-2.5">51.1 – 65.0 m²</td>
                <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400 font-bold">14,000 – 18,000 BTU</td>
                <td className="p-2.5 font-sans">1.25 – 1.50 Ton</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">Open-Concept Living &amp; Dining Room</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold">700 – 1,000 sq ft</td>
                <td className="p-2.5">65.0 – 92.9 m²</td>
                <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400 font-bold">18,000 – 21,000 BTU</td>
                <td className="p-2.5 font-sans">1.50 – 1.75 Ton</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">Large Apartment / Multi-Zone Split</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold">1,000 – 1,500 sq ft</td>
                <td className="p-2.5">92.9 – 139.4 m²</td>
                <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400 font-bold">21,000 – 30,000 BTU</td>
                <td className="p-2.5 font-sans">2.0 – 2.5 Ton</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">Central AC / Multi-Zone Heat Pump</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold">1,500 – 2,500 sq ft</td>
                <td className="p-2.5">139.4 – 232.3 m²</td>
                <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400 font-bold">30,000 – 48,000 BTU</td>
                <td className="p-2.5 font-sans">3.0 – 4.0 Ton</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">Whole-House Central Ducted System</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 4. SEER2, EER, and Operating Cost Physics ── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          4. SEER2, EER &amp; AFUE Efficiency Metrics Explained
        </h2>
        <p>
          Efficiency ratings define how effectively an HVAC appliance converts electrical or combustible energy into heating and cooling output:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 not-prose">
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 block">SEER / SEER2 (Cooling)</span>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 m-0">
              <strong>Seasonal Energy Efficiency Ratio:</strong> Total cooling output in BTUs divided by total electrical energy input in Watt-hours over a typical cooling season.
              <br />
              <code>Power (Watts) = BTU_rating / SEER</code>. Upgrading from SEER 10 to SEER 20 cuts electricity consumption by exactly <strong>50%</strong>.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 block">HSPF / HSPF2 (Heat Pump Heating)</span>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 m-0">
              <strong>Heating Seasonal Performance Factor:</strong> Total seasonal heating output (BTUs) divided by total electrical energy (Watt-hours). Modern cold-climate inverter heat pumps achieve HSPF2 ratings of 9.0 to 12.0+.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 block">AFUE % (Combustion Heating)</span>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 m-0">
              <strong>Annual Fuel Utilization Efficiency:</strong> The percentage of chemical fuel converted into usable thermal heat. Standard gas furnaces operate at 80% AFUE, while modern condensing furnaces reach 96% to 98% AFUE.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. Worked Examples ── */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          5. Step-by-Step Worked Engineering Calculations
        </h2>

        {/* Example 1: AC */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 m-0">
            Example 1: Master Bedroom Cooling Requirement (Hot Sunny Exposure)
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 m-0">
            A second-floor master bedroom measures 15 ft × 20 ft (300 sq ft) with 10 ft ceilings, 2 occupants, average insulation, high direct sun exposure (south-facing windows), in a hot/humid climate zone.
          </p>
          <div className="bg-slate-50 dark:bg-zinc-800 rounded-lg p-3 text-xs space-y-1 font-sans tabular-nums border border-zinc-200 dark:border-zinc-700">
            <p>1. Base Area BTU: For 300 sq ft → <strong>8,000 BTU/hr</strong></p>
            <p>2. Ceiling Offset: 10 ft ceiling (2 ft over standard 8 ft) → 8,000 × (2/8) × 0.75 = <strong>+1,500 BTU/hr</strong></p>
            <p>3. Occupancy Load: 2 people (included in base) → <strong>+0 BTU/hr</strong></p>
            <p>4. Subtotal Before Multipliers: 8,000 + 1,500 = 9,500 BTU/hr</p>
            <p>5. Sun Exposure Multiplier: High direct sun → <strong>1.10×</strong></p>
            <p>6. Climate Zone Multiplier: Hot &amp; Humid → <strong>1.15×</strong></p>
            <p>7. Final Total: 9,500 × 1.10 × 1.15 = <strong>12,017 BTU/hr</strong></p>
            <p>8. Required AC Size: 12,017 ÷ 12,000 = <strong>1.00 Ton</strong> (Recommended: 1.0 Ton / 12,000 BTU Ductless Mini-Split)</p>
          </div>
        </div>

        {/* Example 2: Heating */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 m-0">
            Example 2: Whole-House Heating Load (Cold Climate Winter)
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 m-0">
            A 2,000 sq ft single-story ranch home (40 ft × 50 ft × 9 ft ceiling = 18,000 ft³ volume) in Minneapolis with standard insulation. Desired indoor temperature is 70 °F; design outdoor low is -10 °F (ΔT = 80 °F).
          </p>
          <div className="bg-slate-50 dark:bg-zinc-800 rounded-lg p-3 text-xs space-y-1 font-sans tabular-nums border border-zinc-200 dark:border-zinc-700">
            <p>1. Building Volume: 40 × 50 × 9 = <strong>18,000 ft³</strong></p>
            <p>2. Design Temperature Difference (ΔT): 70 °F - (-10 °F) = <strong>80 °F</strong></p>
            <p>3. Standard Heat Loss Coefficient (H): <strong>0.13 BTU / (ft³ · °F)</strong></p>
            <p>4. Total Heating Load: 18,000 × 80 × 0.13 = <strong>187,200 BTU/hr</strong> (54.86 kW)</p>
            <p>5. Natural Gas Requirement (at 85% furnace AFUE): 187,200 ÷ (100,000 × 0.85) = <strong>2.20 Therms/hr</strong></p>
          </div>
        </div>
      </section>

      {/* ── 6. Dangers of Incorrect HVAC Sizing ── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          6. The Dangers of Oversizing vs. Undersizing HVAC Systems
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800/60 space-y-2">
            <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
              Consequences of Oversizing (Unit Too Big)
            </h4>
            <ul className="text-xs space-y-1.5 text-zinc-700 dark:text-zinc-300 list-disc pl-4">
              <li><strong>Short-Cycling:</strong> The unit reaches setpoint temperature within minutes and shuts down before completing a full refrigeration cycle.</li>
              <li><strong>Poor Dehumidification:</strong> Air conditioners remove moisture during long continuous runs. Oversized units leave indoor air cold and clammy (relative humidity &gt; 65%), fostering mold and mildew growth.</li>
              <li><strong>Premature Compressor Failure:</strong> Repeated on/off starting surges place heavy mechanical strain on electrical capacitors and compressor scroll windings.</li>
              <li><strong>High Energy Bills:</strong> Starting an electric motor consumes 3 to 5× more power than running continuously.</li>
            </ul>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800/60 space-y-2">
            <h4 className="text-xs font-bold text-red-800 dark:text-red-300 uppercase tracking-wider">
              Consequences of Undersizing (Unit Too Small)
            </h4>
            <ul className="text-xs space-y-1.5 text-zinc-700 dark:text-zinc-300 list-disc pl-4">
              <li><strong>Inability to Maintain Setpoint:</strong> On peak summer afternoons (95 °F+) or deep winter nights, the unit runs continuously 24/7 without reaching the target temperature.</li>
              <li><strong>Excessive Wear &amp; Continuous Power Draw:</strong> Continuous non-stop duty cycles burn through blower motors and drive electric bills up.</li>
              <li><strong>Evaporator Coil Icing:</strong> Undersized refrigerant flow in prolonged low-airflow conditions can cause the indoor evaporator coil to freeze into a solid block of ice.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 7. Summary Checklist ── */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          7. Summary &amp; HVAC Sizing Best Practices
        </h2>
        <p className="text-xs leading-relaxed">
          Accurate BTU estimation requires balancing square footage, cubic volume, window orientation, insulation quality, and local design temperatures. Always verify that your chosen equipment matches the calculated load within a ±10% margin, ensure your ductwork is sized for at least 400 CFM per ton of cooling, and select modern inverter-driven units with high SEER2 and HSPF2 ratings for maximum operational savings.
        </p>
      </section>
    </article>
  );
}

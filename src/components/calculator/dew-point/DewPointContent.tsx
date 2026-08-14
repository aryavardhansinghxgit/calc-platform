"use client";

import React from "react";

export function DewPointContent() {
  return (
    <article className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-8 py-2">
      {/* SECTION 1: THE PHYSICS OF HUMIDITY, WATER VAPOR & DEW POINT */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          1. The Physics of Humidity, Water Vapor & Dew Point
        </h2>
        <p>
          The <strong>dew point temperature</strong> is the exact temperature to which moist air must be cooled at constant barometric pressure to become fully saturated with water vapor (100% relative humidity).
        </p>
        <p>
          According to <strong>Dalton's Law of Partial Pressures</strong>, atmospheric air is a mixture of dry gases and water vapor. The maximum amount of water vapor that air can accommodate before condensation occurs is strictly governed by the air temperature—a thermodynamic relationship described by the <strong>Clausius-Clapeyron relation</strong>.
        </p>

        <div className="p-3.5 bg-sky-50/60 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900 rounded-xl space-y-1 text-xs">
          <h3 className="font-bold text-sky-900 dark:text-sky-200">Why Relative Humidity is Misleading Across Temperatures</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Relative Humidity (RH) measures the ratio of actual water vapor pressure to saturation vapor pressure at a given temperature. Because warm air can hold exponentially more water vapor than cold air, 50% RH at 95°F (35°C) represents a heavy mass of moisture (dew point 73°F), whereas 50% RH at 50°F (10°C) represents crisp dry air (dew point 32°F). Dew point is an absolute measure of actual moisture mass that remains constant regardless of temperature fluctuations.
          </p>
        </div>
      </section>

      {/* SECTION 2: MATHEMATICAL FORMULAS & DERIVATIONS */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          2. Mathematical Formulas & Derivations
        </h2>
        
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">1. The Alduchov &amp; Eskridge (1996) Improved Magnus Formula</h3>
        <p>
          The standard high-precision formulation for saturation vapor pressure e_s(T) and dew point T_d (precision ±0.01°C):
        </p>

        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-mono text-xs my-2 text-center text-sky-700 dark:text-sky-300 font-bold overflow-x-auto">
          gamma(T, RH) = ln(RH / 100) + (17.625 × T) / (243.04 + T)
        </div>

        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-mono text-xs my-2 text-center text-sky-700 dark:text-sky-300 font-bold overflow-x-auto">
          Td = (243.04 × gamma) / (17.625 - gamma)
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Where T is air temperature in °C and RH is relative humidity (0–100%).
        </p>

        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">2. The Rule-of-Thumb Approximation</h3>
        <p className="text-xs">
          For relative humidity values above 50%, the dew point can be estimated quickly without logarithms using:
        </p>
        <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg font-mono text-xs text-center text-sky-700 dark:text-sky-300 font-bold">
          Td ≈ T - [ (100 - RH) / 5 ]
        </div>
      </section>

      {/* SECTION 3: DEW POINT VS. WET-BULB VS. FROST POINT */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          3. Dew Point vs. Wet-Bulb Temperature vs. Frost Point
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Dew Point (Td)</h4>
            <p className="text-zinc-600 dark:text-zinc-400">Temperature where existing water vapor reaches 100% saturation at constant pressure.</p>
          </div>

          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Wet-Bulb Temp (Tw)</h4>
            <p className="text-zinc-600 dark:text-zinc-400">Lowest temperature achievable solely through evaporative cooling off a moist wick in moving air.</p>
          </div>

          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Frost Point (Tf)</h4>
            <p className="text-zinc-600 dark:text-zinc-400">Desublimation temperature where vapor transitions directly into ice crystals below 32°F (0°C).</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: DEW POINT AND HUMAN THERMAL COMFORT */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          4. Dew Point and Human Thermal Comfort (The "Muggy" Index)
        </h2>
        <p>
          Elevated dew points severely restrict sweat evaporation from skin, driving up core body temperature and cardiovascular fatigue:
        </p>

        <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          <li><strong>&lt; 50°F (&lt; 10°C):</strong> Dry, crisp, and refreshing. Ideal athletic conditions.</li>
          <li><strong>50°F–59°F (10°C–15°C):</strong> Comfortable and optimal indoor baseline (ASHRAE 55 envelope).</li>
          <li><strong>60°F–64°F (16°C–18°C):</strong> Noticeably humid ("sticky" feeling during physical labor).</li>
          <li><strong>65°F–69°F (18°C–21°C):</strong> Uncomfortable, muggy, and oppressive. High sweat volume.</li>
          <li><strong>≥ 70°F (≥ 21°C):</strong> SEVERE HEAT STRESS: Tropical conditions; dangerous for strenuous labor.</li>
        </ul>
      </section>

      {/* SECTION 5: REAL-WORLD APPLICATIONS & INDUSTRY USE CASES */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          5. Real-World Applications &amp; Industry Use Cases
        </h2>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          <li><strong>Aviation Meteorology:</strong> Cumulus cloud base altitude (in feet) is calculated using the temperature-dewpoint spread: Cloud Base (ft) = [(T°F - Td°F) / 4.4] × 1,000.</li>
          <li><strong>Industrial Coating &amp; Painting (ISO 8502-4):</strong> Substrate steel temperature must be at least <strong>5°F (3°C) above dew point</strong> prior to sandblasting or painting to prevent microscopic moisture entrapment and premature coating failure.</li>
          <li><strong>HVAC &amp; Building Envelope Science:</strong> Preventing interstitial condensation and toxic mold growth within insulated walls.</li>
        </ul>
      </section>
    </article>
  );
}

"use client";

import React from "react";

export function HeatIndexContent() {
  return (
    <article className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-8 py-2">
      {/* SECTION 1: THE PHYSIOLOGY OF HEAT STRESS & EVAPORATIVE COOLING */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          1. The Physiology of Heat Stress & Evaporative Cooling
        </h2>
        <p>
          The Heat Index (often referred to as the <em>apparent temperature</em> or <em>humiture</em>) measures how hot weather actually feels to the human body when relative humidity is combined with ambient air temperature.
        </p>
        <p>
          The human body regulates its internal core temperature at approximately <strong>98.6°F (37.0°C)</strong> primarily through the evaporation of sweat. As sweat evaporates off the skin, it absorbs latent heat of vaporization (approximately 2,427 Joules per gram of water evaporated), effectively transferring heat away from the bloodstream to the surrounding air.
        </p>

        <div className="p-3.5 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl space-y-1 text-xs">
          <h3 className="font-bold text-amber-900 dark:text-amber-200">The Paradox of Humidity vs. Dry Air</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Why does a dry 100°F day feel more tolerable than an 88°F day with 85% relative humidity? In dry desert air (15% RH), sweat evaporates almost instantaneously, keeping skin temperature cool. In humid air (85% RH), the surrounding air is already near moisture saturation point, preventing sweat from evaporating. Liquid sweat drips off the body without cooling it, trapping metabolic heat inside the body.
          </p>
        </div>
      </section>

      {/* SECTION 2: MATHEMATICAL FORMULAS BEHIND HEAT INDEX */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          2. Mathematical Formulas Behind Heat Index
        </h2>
        
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">1. The 9-Term NOAA/NWS Rothfusz Regression Equation</h3>
        <p>
          In 1990, Lans P. Rothfusz of the National Weather Service derived a 9-parameter polynomial regression equation to approximate Dr. Robert G. Steadman's 1979 biometeorological model:
        </p>

        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-sans tabular-nums text-xs my-2 text-center text-amber-700 dark:text-amber-300 font-bold overflow-x-auto">
          HI = -42.379 + 2.04901523×T + 10.14333127×R - 0.22475541×T×R - 0.00683783×T² - 0.05481717×R² + 0.00122874×T²×R + 0.00085282×T×R² - 0.00000199×T²×R²
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Where T is air temperature in °F and R is relative humidity (0–100%).
        </p>

        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">2. Low and High Humidity Corrections</h3>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          <li><strong>Low Humidity Adjustment (RH &lt; 13% &amp; 80°F ≤ T ≤ 112°F):</strong> Subtract [ (13 - RH) / 4 ] × √[ (17 - |T - 95|) / 17 ].</li>
          <li><strong>High Humidity Adjustment (RH &gt; 85% &amp; 80°F ≤ T ≤ 87°F):</strong> Add [ (RH - 85) / 10 ] × [ (87 - T) / 5 ].</li>
        </ul>
      </section>

      {/* SECTION 3: HEAT INDEX VS. WBGT VS. WIND CHILL */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          3. Heat Index vs. Wet-Bulb Globe Temperature (WBGT) vs. Wind Chill
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Shade Heat Index</h4>
            <p className="text-zinc-600 dark:text-zinc-400">Models apparent temperature in the shade for general public weather advisories.</p>
          </div>

          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Wet-Bulb Globe (WBGT)</h4>
            <p className="text-zinc-600 dark:text-zinc-400">Models heat stress in direct sunlight combining solar radiation, humidity, wind, and sun angle (used by military & OSHA).</p>
          </div>

          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Winter Wind Chill</h4>
            <p className="text-zinc-600 dark:text-zinc-400">Models cold convective heat loss from wind stripping the skin's thermal boundary layer below 50°F.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: HEAT-RELATED ILLNESSES & CLINICAL SYMPTOMS */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          4. Heat-Related Illnesses & Clinical Symptoms
        </h2>
        <p>
          Exposure to high heat index conditions causes severe strain on the cardiovascular and nervous systems:
        </p>

        <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          <li><strong>Heat Cramps:</strong> Painful muscle spasms in abdomen, arms, or legs caused by electrolyte loss through heavy sweating.</li>
          <li><strong>Heat Exhaustion:</strong> Heavy sweating, rapid heart rate, dizziness, headache, nausea, and cool/clammy skin. Requires immediate shade, rest, and water.</li>
          <li><strong>Heat Stroke (LIFE-THREATENING EMERGENCY):</strong> Core body temperature rises above <strong>104°F (40°C)</strong>. Symptoms include hot/dry skin or profuse sweating, confusion, slurred speech, seizures, and loss of consciousness. Call 911 immediately and initiate rapid body cooling with ice packs or cold water immersion.</li>
        </ul>
      </section>

      {/* SECTION 5: HIGH-RISK DEMOGRAPHICS & OCCUPATIONAL HEAT SAFETY */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          5. High-Risk Demographics & Occupational Heat Safety
        </h2>
        <p>
          Elderly adults (over 65), infants, outdoor construction workers, and endurance athletes have reduced thermoregulatory reserves. OSHA mandates structured work/rest cycles (e.g. 45 min work / 15 min rest at 91°F–103°F HI) and drinking 1 cup of cold water every 20 minutes to prevent occupational heat casualties.
        </p>
      </section>
    </article>
  );
}

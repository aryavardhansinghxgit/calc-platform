"use client";

import React from "react";

export function WindChillContent() {
  return (
    <article className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-8 py-2">
      {/* SECTION 1: THE BIOPHYSICS OF WIND CHILL & HUMAN THERMOREGULATION */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          1. The Biophysics of Wind Chill & Human Thermoregulation
        </h2>
        <p>
          Wind chill is a measure of the rate of convective heat loss from exposed human skin caused by the combined effect of cold ambient air temperature and wind speed.
        </p>
        <p>
          Your body naturally warms a microscopic layer of air trapped directly against your skin, known as the <strong>thermal boundary layer</strong>. In calm conditions, this boundary layer provides a protective cushion of warm air that slows down conductive and radiative heat loss. However, when wind blows across your skin, it strips away this insulating layer through <strong>forced convective heat transfer</strong>, forcing your body to constantly expend metabolic energy heating fresh, cold air.
        </p>

        <div className="p-3.5 bg-sky-50/60 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900 rounded-xl space-y-1 text-xs">
          <h3 className="font-bold text-sky-900 dark:text-sky-200">Critical Physics Fact: Inanimate Objects vs. Human Tissue</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Wind chill accelerates the <em>speed</em> of cooling, but it <strong>cannot cool any object below the actual air temperature</strong>. A car radiator or water pipe exposed to a 10°F air temperature with a -15°F wind chill will cool down to 10°F much faster, but it will never drop below 10°F or freeze if the air temperature remains above 32°F (0°C).
          </p>
        </div>
      </section>

      {/* SECTION 2: MATHEMATICAL FORMULAS & HISTORICAL EVOLUTION */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          2. Mathematical Formulas & Historical Evolution
        </h2>
        
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">1. The Modern JAG/TI Formula (US NWS & Environment Canada)</h3>
        <p>
          In 2001, the National Weather Service (NWS) and Environment Canada updated the wind chill index using clinical facial skin heat-transfer models developed by the Joint Action Group for Temperature Indices (JAG/TI):
        </p>

        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-mono text-xs my-2 text-center text-sky-700 dark:text-sky-300 font-bold">
          Wind Chill (°F) = 35.74 + 0.6215 × T - 35.75 × (V^0.16) + 0.4275 × T × (V^0.16)
        </div>

        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-mono text-xs my-2 text-center text-sky-700 dark:text-sky-300 font-bold">
          Wind Chill (°C) = 13.12 + 0.6215 × T - 11.37 × (V^0.16) + 0.3965 × T × (V^0.16)
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Where \(T\) is air temperature in °F or °C, and \(V\) is wind speed in mph or km/h measured at 10 meters (33 feet) standard anemometer height.
        </p>

        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">2. The Historical Siple and Passel Antarctic Formula (1945–2001)</h3>
        <p>
          The original wind chill index was created in 1945 by Antarctic explorers Paul Siple and Charles Passel. They measured how fast water cylinders froze in Antarctic winds. Because plastic bottles lack internal metabolic heat generation and blood circulation, the 1945 formula significantly overstated human cold perception and was replaced in 2001.
        </p>
      </section>

      {/* SECTION 3: WIND CHILL VS. HEAT INDEX VS. DEW POINT */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          3. Wind Chill vs. Heat Index vs. Dew Point
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Winter Wind Chill (Convective Loss)</h4>
            <p className="text-zinc-600 dark:text-zinc-400">
              Applies below 50°F (10°C). Driven primarily by wind speed stripping body heat through convective air displacement.
            </p>
          </div>

          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Summer Heat Index (Evaporative Suppression)</h4>
            <p className="text-zinc-600 dark:text-zinc-400">
              Applies above 80°F (27°C). Driven by high relative humidity preventing sweat evaporation from cooling the skin.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: MEDICAL COLD INJURIES (FROSTBITE & HYPOTHERMIA) */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          4. Medical Cold Injuries: Frostbite & Hypothermia Staging
        </h2>
        <p>
          Cold exposure causes progressive tissue damage and core body cooling:
        </p>

        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Clinical Stages of Frostbite</h3>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          <li><strong>Frostnip (Pre-Frostbite):</strong> Superficial numbness, skin redness, and tingling. Reversible with immediate rewarming.</li>
          <li><strong>First-Degree Frostbite:</strong> Numbness and white/yellowish skin discoloration. Partial-thickness skin involvement.</li>
          <li><strong>Second-Degree Frostbite:</strong> Clear fluid-filled blisters form within 24 hours. Hardening of outer skin tissue.</li>
          <li><strong>Third & Fourth-Degree Frostbite:</strong> Deep tissue necrosis involving muscles, tendons, and bones. Blood-filled blisters and purplish-black eschar (gangrene).</li>
        </ul>

        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Hypothermia Clinical Staging</h3>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          <li><strong>Mild Hypothermia (95°F / 35°C Core Temp):</strong> Uncontrollable shivering, rapid breathing, pale cold skin.</li>
          <li><strong>Moderate Hypothermia (90°F / 32°C Core Temp):</strong> Shivering stops, loss of fine motor skills, slurred speech, confusion.</li>
          <li><strong>Severe Hypothermia (&lt;82°F / 28°C Core Temp):</strong> Irrational behavior ("paradoxical undressing"), loss of consciousness, low pulse, cardiac arrest risk.</li>
        </ul>
      </section>

      {/* SECTION 5: OCCUPATIONAL & OUTDOOR RECREATION SAFETY */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          5. Occupational & Outdoor Recreation Safety Standards
        </h2>
        <p>
          Under OSHA cold stress guidelines, outdoor workers (construction, utility, delivery) must take mandatory warm-up breaks in heated shelters when wind chills fall below -15°F (-26°C).
        </p>
        <p>
          For winter athletes (cyclists, runners, skiers), forward travel motion creates a <strong>relative headwind</strong> that adds to natural wind velocity. Cycling at 20 mph into a 10 mph breeze produces an effective 30 mph wind speed across your chest and face.
        </p>
      </section>
    </article>
  );
}

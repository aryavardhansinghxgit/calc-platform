"use client";

import React from "react";
import Link from "next/link";
import { heat_index_calculatorFaqs } from "@/app/calculators/heat-index-calculator/faq";

export function HeatIndexContent() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed space-y-10 py-4 text-sm sm:text-base">
      {/* ARTICLE HEADER & INTRO */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Heat Index Calculator: NWS Formula, Heat Index Chart &amp; Heat Risk
        </h2>
        <p>
          A heat index calculator combines air temperature and relative humidity to estimate how hot conditions feel to the human body. Unlike the temperature shown by a thermometer, the heat index is an apparent temperature intended to communicate the effect of humidity on heat stress.
        </p>
        <p>
          The National Weather Service (NWS) calculates the heat index primarily from air temperature and relative humidity. Standard heat-index values are intended for shaded conditions. Exposure to direct sunlight can increase the heat index by up to about 15°F, which is why a sunny outdoor environment may feel considerably hotter than the number reported for shade.
        </p>
        <p>
          This calculator follows the NWS heat-index procedure rather than applying the Rothfusz polynomial indiscriminately. It evaluates the lower-temperature simple pathway, the Rothfusz regression, the official low- and high-humidity corrections, and the calculator&apos;s clearly identified supplemental direct-sun estimate. It also supports dew-point input and provides an interactive heat-index reference matrix.
        </p>
        <p>
          For a useful reference case, 85°F with 70% relative humidity produces a heat index of approximately 92.7°F using the NWS method.
        </p>
        <p>
          That does not mean the air itself has become 92.7°F. It means the combination of temperature and humidity produces a level of apparent heat comparable to that temperature under the conditions represented by the index.
        </p>
      </section>

      {/* 1. WHAT IS THE HEAT INDEX? */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          1. What Is the Heat Index?
        </h3>
        <p>
          The heat index is an apparent-temperature measure that combines air temperature and humidity to communicate how hot the environment feels when the body&apos;s ability to lose heat is reduced by moisture in the air.
        </p>
        <p>
          When relative humidity is high, evaporation of sweat becomes less effective. Because evaporation is one of the body&apos;s important cooling mechanisms, humid conditions can increase physiological heat strain even when the thermometer reading has not changed.
        </p>
        <p>
          For example, compare two environments at the same temperature:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2 text-sm font-sans">
          <p className="font-semibold text-slate-900 dark:text-slate-100">Comparing Equivalent Air Temperatures:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li><strong>85°F at 30% RH:</strong> Feels like approximately 84°F</li>
            <li><strong>versus</strong></li>
            <li><strong>85°F at 70% RH:</strong> Feels like approximately 92.7°F</li>
          </ul>
        </div>
        <p>
          The second environment feels substantially hotter because the atmosphere contains more moisture and therefore provides less favorable conditions for evaporative cooling.
        </p>
        <p>
          The heat index is designed to communicate this combined effect in a single temperature-like value. The NWS describes it as an apparent temperature and uses a standard operational calculation based primarily on air temperature and relative humidity.
        </p>
      </section>

      {/* 2. HEAT INDEX CALCULATOR VS ACTUAL TEMPERATURE */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          2. Heat Index Calculator vs Actual Temperature
        </h3>
        <p>
          A heat index value should never be confused with the actual air temperature.
        </p>
        <p>
          Suppose:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
          <li>Air temperature = 85°F</li>
          <li>Relative humidity = 70%</li>
          <li>Heat index ≈ 92.7°F</li>
        </ul>
        <p>
          The thermometer still reads approximately 85°F.
        </p>
        <p>
          The heat index communicates the apparent thermal burden associated with the temperature and humidity combination. It is therefore better thought of as a heat-stress communication index than as a second thermometer reading.
        </p>
        <p>
          This distinction becomes particularly important when discussing safety. A calculated heat index is not a measurement of your body&apos;s internal temperature, and it does not tell you exactly how quickly a specific person will develop heat illness.
        </p>
      </section>

      {/* 3. HOW THE NWS HEAT INDEX FORMULA WORKS */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          3. How the NWS Heat Index Formula Works
        </h3>
        <p>
          The main NWS heat-index regression is the Rothfusz regression, developed from multiple regression analysis and documented by the National Weather Service. For Fahrenheit inputs, the equation is:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold overflow-x-auto leading-relaxed">
          HI = -42.379 + 2.04901523·T + 10.14333127·RH - 0.22475541·T·RH - 0.00683783·T² - 0.05481717·RH² + 0.00122874·T²·RH + 0.00085282·T·RH² - 0.00000199·T²·RH²
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          where <em>T</em> = air temperature in °F, <em>RH</em> = relative humidity in percent, and <em>HI</em> = heat index in °F.
        </p>
        <p>
          The equation looks complicated because it contains interaction terms between temperature and humidity. That complexity is intentional: the relationship between thermal sensation and humidity is not a simple one-to-one subtraction or addition.
        </p>
        <p>
          The NWS describes the Rothfusz equation as a refinement obtained through multiple regression analysis.
        </p>
      </section>

      {/* 4. THE NWS DOES NOT USE ROTHFUSZ FOR EVERY INPUT */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          4. The NWS Does Not Use Rothfusz for Every Input
        </h3>
        <p>
          A common mistake in online heat-index calculators is to take the Rothfusz equation and apply it to every temperature and humidity combination.
        </p>
        <p>
          The NWS procedure is more careful.
        </p>
        <p>
          First, a simpler heat-index calculation is performed:
        </p>
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold overflow-x-auto">
          HI_simple = 0.5 × [ T + 61.0 + (T - 68.0)·1.2 + (RH)·0.094 ]
        </div>
        <p>
          The preliminary value is averaged with the actual temperature. When the resulting value is below approximately 80°F, the NWS uses the simpler procedure rather than the full Rothfusz regression.
        </p>
        <p>
          When the preliminary value reaches the relevant threshold, the full regression is used together with any applicable humidity adjustment. The NWS also notes that Rothfusz is not appropriate for extreme temperature/humidity conditions outside the range represented by its underlying data.
        </p>
        <p>
          This calculator follows that decision pathway rather than blindly extrapolating the polynomial.
        </p>
      </section>

      {/* 5. LOW-HUMIDITY AND HIGH-HUMIDITY CORRECTIONS */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          5. Low-Humidity and High-Humidity Corrections
        </h3>
        <p>
          The NWS procedure includes two conditional corrections to improve the regression in particular humidity ranges.
        </p>
        <div className="space-y-3">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1.5 text-xs sm:text-sm">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Low Relative Humidity Adjustment</h4>
            <p className="text-slate-700 dark:text-slate-300">
              When <strong>RH &lt; 13%</strong> and <strong>80°F ≤ T ≤ 112°F</strong>, a low-humidity adjustment is subtracted:
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-center font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
              Adjustment = [ (13 - RH) / 4 ] × √[ (17 - |T - 95|) / 17 ]
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              This prevents the primary regression from overstating heat index in certain very dry conditions.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1.5 text-xs sm:text-sm">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">High Relative Humidity Adjustment</h4>
            <p className="text-slate-700 dark:text-slate-300">
              When <strong>RH &gt; 85%</strong> and <strong>80°F ≤ T ≤ 87°F</strong>, a high-humidity adjustment is added:
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-center font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
              Adjustment = [ (RH - 85) / 10 ] × [ (87 - T) / 5 ]
            </div>
          </div>
        </div>
        <p>
          The calculator evaluates these conditions explicitly rather than applying them outside their intended domains.
        </p>
      </section>

      {/* 6. EXAMPLE: 85°F AND 70% RELATIVE HUMIDITY */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          6. Example: 85°F and 70% Relative Humidity
        </h3>
        <p>
          One of the most useful examples for understanding a heat index calculator is:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
          <li>Air temperature: 85°F</li>
          <li>Relative humidity: 70%</li>
        </ul>
        <p>
          The NWS calculation gives a heat index of approximately:
        </p>
        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl text-center space-y-1">
          <div className="text-2xl font-black text-amber-900 dark:text-amber-200 font-sans tabular-nums">
            92.7°F (33.7°C)
          </div>
          <p className="text-xs text-amber-800 dark:text-amber-300 font-medium">
            Shaded Apparent Temperature under Official NWS Rothfusz Regression
          </p>
        </div>
        <p>
          The important interpretation is:
        </p>
        <p>
          The air temperature is 85°F, while the heat-index value is approximately 92.7°F.
        </p>
        <p>
          The result is an apparent-temperature indicator, not a measurement of actual air temperature.
        </p>
        <p>
          The current calculator independently verifies this reference case against an external mathematical oracle.
        </p>
      </section>

      {/* 7. HEAT INDEX CHART */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          7. Heat Index Chart
        </h3>
        <p>
          A heat index chart allows temperature and humidity to be compared without performing the formula manually.
        </p>
        <p>
          The calculator provides an interactive matrix based on the NWS calculation. Representative values are:
        </p>
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl font-sans text-xs sm:text-sm">
          <table className="w-full text-center border-collapse tabular-nums">
            <caption className="sr-only">Official NWS Heat Index Reference Grid (°F)</caption>
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-slate-100">
                <th scope="col" className="p-2.5 border-b border-r border-slate-200 dark:border-slate-700">Relative Humidity</th>
                <th scope="col" className="p-2.5 border-b border-r border-slate-200 dark:border-slate-700">80°F</th>
                <th scope="col" className="p-2.5 border-b border-r border-slate-200 dark:border-slate-700">85°F</th>
                <th scope="col" className="p-2.5 border-b border-r border-slate-200 dark:border-slate-700">90°F</th>
                <th scope="col" className="p-2.5 border-b border-r border-slate-200 dark:border-slate-700">95°F</th>
                <th scope="col" className="p-2.5 border-b border-slate-200 dark:border-slate-700">100°F</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr>
                <th scope="row" className="p-2.5 border-r border-slate-200 dark:border-slate-800 font-bold bg-slate-50 dark:bg-slate-800/50">40% RH</th>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">80°F</td>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">84°F</td>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">91°F</td>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">99°F</td>
                <td className="p-2.5">109°F</td>
              </tr>
              <tr>
                <th scope="row" className="p-2.5 border-r border-slate-200 dark:border-slate-800 font-bold bg-slate-50 dark:bg-slate-800/50">50% RH</th>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">81°F</td>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">87°F</td>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">95°F</td>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">105°F</td>
                <td className="p-2.5">118°F</td>
              </tr>
              <tr>
                <th scope="row" className="p-2.5 border-r border-slate-200 dark:border-slate-800 font-bold bg-slate-50 dark:bg-slate-800/50">60% RH</th>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">82°F</td>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">89°F</td>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">100°F</td>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">113°F</td>
                <td className="p-2.5">130°F</td>
              </tr>
              <tr>
                <th scope="row" className="p-2.5 border-r border-slate-200 dark:border-slate-800 font-bold bg-slate-50 dark:bg-slate-800/50">70% RH</th>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">83°F</td>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">93°F</td>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">106°F</td>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">123°F</td>
                <td className="p-2.5">143°F</td>
              </tr>
              <tr>
                <th scope="row" className="p-2.5 border-r border-slate-200 dark:border-slate-800 font-bold bg-slate-50 dark:bg-slate-800/50">80% RH</th>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">84°F</td>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">97°F</td>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">113°F</td>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">134°F</td>
                <td className="p-2.5">158°F</td>
              </tr>
              <tr>
                <th scope="row" className="p-2.5 border-r border-slate-200 dark:border-slate-800 font-bold bg-slate-50 dark:bg-slate-800/50">90% RH</th>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">86°F</td>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">102°F</td>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">122°F</td>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800">147°F</td>
                <td className="p-2.5">176°F</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          These values are generated through the calculator&apos;s complete NWS procedure and independently verified across all 30 matrix cells.
        </p>
        <p>
          The pattern is intuitive: at a fixed temperature, increasing humidity generally increases heat index. At a fixed humidity, increasing air temperature generally increases heat index.
        </p>
      </section>

      {/* 8. WHAT DOES A HEAT INDEX OF 90°F, 100°F OR 110°F MEAN? */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          8. What Does a Heat Index of 90°F, 100°F or 110°F Mean?
        </h3>
        <p>
          The NWS commonly presents heat-index classifications such as:
        </p>
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl font-sans text-xs sm:text-sm">
          <table className="w-full text-left border-collapse">
            <caption className="sr-only">NWS Heat Hazard Classification Tiers</caption>
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-slate-100">
                <th scope="col" className="p-2.5 border-b border-r border-slate-200 dark:border-slate-700">Classification</th>
                <th scope="col" className="p-2.5 border-b border-r border-slate-200 dark:border-slate-700">Heat Index</th>
                <th scope="col" className="p-2.5 border-b border-slate-200 dark:border-slate-700">General Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr>
                <th scope="row" className="p-2.5 border-r border-slate-200 dark:border-slate-800 font-bold text-amber-700 dark:text-amber-400">Caution</th>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800 font-mono">80–90°F</td>
                <td className="p-2.5">Fatigue is possible with prolonged exposure or physical activity</td>
              </tr>
              <tr>
                <th scope="row" className="p-2.5 border-r border-slate-200 dark:border-slate-800 font-bold text-orange-700 dark:text-orange-400">Extreme Caution</th>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800 font-mono">90–103°F</td>
                <td className="p-2.5">Heat illness becomes increasingly possible</td>
              </tr>
              <tr>
                <th scope="row" className="p-2.5 border-r border-slate-200 dark:border-slate-800 font-bold text-rose-700 dark:text-rose-400">Danger</th>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800 font-mono">103–124°F</td>
                <td className="p-2.5">Heat cramps and exhaustion become more likely; heat stroke is possible</td>
              </tr>
              <tr>
                <th scope="row" className="p-2.5 border-r border-slate-200 dark:border-slate-800 font-bold text-purple-700 dark:text-purple-400">Extreme Danger</th>
                <td className="p-2.5 border-r border-slate-200 dark:border-slate-800 font-mono">125°F+</td>
                <td className="p-2.5">Heat stroke becomes highly likely with continued exposure</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The exact interpretation is about risk with exposure and activity, not a guarantee that a particular person will experience a specific medical outcome. NWS heat-index guidance uses similar classification language.
        </p>
        <p>
          For workplace decisions, heat index alone is not sufficient for the most accurate hazard assessment. OSHA explains that Heat Index does not account for workload, wind, sunlight, radiant heat sources or clothing/PPE in the way WBGT-based assessment can.
        </p>
      </section>

      {/* 9. DIRECT SUNLIGHT AND THE HEAT INDEX */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          9. Direct Sunlight and the Heat Index
        </h3>
        <p>
          Standard NWS heat-index charts represent shady conditions.
        </p>
        <p>
          NWS notes that exposure to direct sunlight can increase the heat index by up to approximately 15°F.
        </p>
        <p>
          The calculator therefore provides a clearly labeled:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2 text-sm font-sans">
          <p className="font-bold text-slate-900 dark:text-slate-100">
            Direct Sun Conservative Estimate (+15°F)
          </p>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            This is intentionally separate from the standard shaded NWS heat-index result.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            For the 85°F / 70% RH example:
          </p>
          <ul className="list-disc pl-5 space-y-0.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li>Shaded heat index: <strong>approximately 92.7°F</strong></li>
            <li>Calculator&apos;s conservative direct-sun estimate: <strong>approximately 107.7°F</strong></li>
          </ul>
        </div>
        <p>
          The +15°F figure should not be interpreted as an exact physical correction that applies to every sunny environment. The NWS wording is &quot;up to 15°F,&quot; so the calculator identifies its implementation as a conservative maximum-load estimate rather than pretending that every sunny location experiences an identical +15°F increase.
        </p>
      </section>

      {/* 10. RELATIVE HUMIDITY VS DEW POINT */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          10. Relative Humidity vs Dew Point
        </h3>
        <p>
          Relative humidity is not the only way to describe atmospheric moisture.
        </p>
        <p>
          This calculator also supports dew point input.
        </p>
        <p>
          Relative humidity tells you how close the air is to saturation at its current temperature. Dew point tells you the temperature to which air would need to be cooled for saturation to occur.
        </p>
        <p>
          That distinction matters because the same dew point can correspond to very different relative humidities at different air temperatures.
        </p>
        <p>
          A{" "}
          <Link
            href="/calculators/dew-point-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700"
          >
            Dew Point Calculator
          </Link>{" "}
          can also be useful when you want to convert atmospheric temperature and moisture observations into a dew-point value before comparing conditions.
        </p>
        <p>
          For this reason, a dew-point-based heat-index calculation first establishes the corresponding atmospheric moisture state and then applies the same NWS heat-index procedure.
        </p>
        <p>
          An important physical validation is also enforced: the entered dew point cannot exceed the air temperature under an ordinary atmospheric interpretation.
        </p>
      </section>

      {/* 11. HEAT INDEX IN CELSIUS AND FAHRENHEIT */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          11. Heat Index in Celsius and Fahrenheit
        </h3>
        <p>
          The heat index is commonly published in Fahrenheit in the United States, while Celsius is widely used internationally.
        </p>
        <p>
          The temperature conversion is:
        </p>
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-center text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold overflow-x-auto space-y-1">
          <div>°C = (°F - 32) × (5 / 9)</div>
          <div>°F = °C × (9 / 5) + 32</div>
        </div>
        <p>
          For example:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
          <li>85°F = 29.44°C</li>
          <li>92.7°F ≈ 33.7°C</li>
        </ul>
        <p>
          Changing the display unit must not change the underlying physical calculation. The calculator verifies Fahrenheit/Celsius equivalence and only rounds the final presentation value.
        </p>
        <p>
          When working with related temperature quantities, a{" "}
          <Link
            href="/calculators/conversion-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700"
          >
            Conversion Calculator
          </Link>{" "}
          can be useful for checking unit transformations independently.
        </p>
      </section>

      {/* 12. HEAT INDEX VS HUMIDITY */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          12. Heat Index vs Humidity
        </h3>
        <p>
          Humidity affects heat index because it influences evaporative cooling.
        </p>
        <p>
          At higher relative humidity, sweat evaporates less efficiently. That can make a warm environment feel hotter and can increase heat strain during physical activity.
        </p>
        <p>
          However, relative humidity should not be interpreted in isolation.
        </p>
        <p>
          A humidity of 70% at 70°F does not create the same heat stress as 70% humidity at 100°F.
        </p>
        <p>
          That is exactly why the heat index combines temperature and humidity rather than assigning risk from humidity alone.
        </p>
      </section>

      {/* 13. HEAT INDEX VS WIND CHILL */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          13. Heat Index vs Wind Chill
        </h3>
        <p>
          The heat index and wind chill address opposite environmental situations.
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2 text-sm font-sans">
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li><strong>Heat index:</strong> primarily communicates hot conditions when humidity affects the body&apos;s cooling process.</li>
            <li><strong>Wind chill:</strong> communicates cold-weather heat loss when wind increases the rate of heat removal from exposed skin.</li>
          </ul>
        </div>
        <p>
          A useful way to remember the difference is:
        </p>
        <p className="font-semibold text-slate-900 dark:text-slate-100 pl-4 border-l-2 border-blue-500">
          Heat Index → heat + humidity<br />
          Wind Chill → cold + wind
        </p>
        <p>
          For cold-weather calculations, the{" "}
          <Link
            href="/calculators/wind-chill-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700"
          >
            Wind Chill Calculator
          </Link>{" "}
          is the appropriate tool rather than applying a heat-index equation.
        </p>
        <p>
          Neither measure is simply &quot;the real temperature.&quot; Both are specialized apparent-temperature indices designed for specific environmental conditions.
        </p>
      </section>

      {/* 14. HEAT INDEX VS WBGT */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          14. Heat Index vs WBGT
        </h3>
        <p>
          Heat Index and Wet Bulb Globe Temperature (WBGT) should not be treated as interchangeable.
        </p>
        <p>
          OSHA explains that standard Heat Index values are measured in the shade and combine air temperature and relative humidity. Heat Index does not account for the effects of wind, sunlight, radiant heat sources or workload. WBGT incorporates temperature, humidity, radiant heat and wind and is therefore more appropriate for detailed occupational heat assessment.
        </p>
        <p>
          The calculator therefore does not label its supplemental moisture-weighted calculation as WBGT.
        </p>
        <p>
          Its Adjusted Heat Stress Estimate is explicitly identified as a calculator-specific ambient heuristic rather than an on-site WBGT measurement.
        </p>
        <p>
          For occupational safety decisions, especially where heavy work or protective clothing is involved, use appropriate worksite measurements and applicable professional guidance rather than relying on a general heat-index number alone. OSHA specifically recommends on-site WBGT measurement for workplace environmental heat assessment.
        </p>
      </section>

      {/* 15. HEAT INDEX AND OUTDOOR WORK */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          15. Heat Index and Outdoor Work
        </h3>
        <p>
          Heat-index information can be useful for general public awareness, but workplace heat exposure is more complicated.
        </p>
        <p>
          OSHA recommends considering:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
          <li>environmental heat;</li>
          <li>workload;</li>
          <li>clothing and PPE;</li>
          <li>worker acclimatization;</li>
          <li>radiant heat;</li>
          <li>air movement.</li>
        </ul>
        <p>
          This is one reason an occupational heat-stress assessment cannot be reduced to a single Heat Index number. OSHA describes Heat Index as useful for screening, but says it is less desirable than WBGT for detailed workplace assessment.
        </p>
        <p>
          The calculator&apos;s Reference Work / Rest Benchmark is therefore intentionally presented as an illustrative planning reference rather than an official universal OSHA work/rest schedule.
        </p>
      </section>

      {/* 16. HYDRATION DURING HOT WORK */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          16. Hydration During Hot Work
        </h3>
        <p>
          Hydration needs depend on activity, duration, environmental conditions and the individual.
        </p>
        <p>
          NIOSH guidance states that during moderately intense work in moderate heat lasting less than two hours, workers should drink approximately one cup of water every 15–20 minutes. For prolonged sweating lasting several hours, electrolyte-containing beverages may be appropriate.
        </p>
        <p>
          This should not be interpreted as a universal prescription for every person or every work situation.
        </p>
        <p>
          The more important principle is to maintain adequate hydration and provide appropriate opportunities for workers to rest and cool down.
        </p>
      </section>

      {/* 17. HEAT EXHAUSTION AND HEAT STROKE */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          17. Heat Exhaustion and Heat Stroke
        </h3>
        <p>
          A high heat index signals increased environmental heat stress, but a calculator cannot diagnose heat illness.
        </p>
        <p>
          Heat exhaustion can include symptoms such as heavy sweating, weakness, dizziness, headache, nausea and fatigue. Heat stroke is much more serious and can become life-threatening.
        </p>
        <p>
          The NWS notes that higher heat-index conditions are associated with progressively greater risk of heat disorders, particularly with prolonged exposure and physical activity.
        </p>
        <p>
          If someone develops signs of serious heat illness, especially confusion, altered mental status, collapse or other emergency symptoms, seek urgent medical assistance rather than relying on a calculator result.
        </p>
        <p>
          A heat index value is an environmental indicator—not a measurement of the body&apos;s internal core temperature.
        </p>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (FULLY UNFOLDED IN SSR) */}
      <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Frequently Asked Questions
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Authoritative answers on the National Weather Service heat index formula, dew point calculations, and heat hazard precautions.
          </p>
        </div>

        <div className="space-y-4 not-prose">
          {heat_index_calculatorFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2"
            >
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {faq.question}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HEAT INDEX SAFETY NOTE */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Heat Index Safety Note
        </h3>
        <p>
          A calculator provides an estimate from environmental inputs. It does not measure your body&apos;s core temperature, diagnose heat illness, or establish a guaranteed safe exposure time.
        </p>
        <p>
          Heat risk can change substantially with:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
          <li>physical workload;</li>
          <li>direct sunlight;</li>
          <li>wind and radiant heat;</li>
          <li>clothing and PPE;</li>
          <li>hydration;</li>
          <li>acclimatization;</li>
          <li>exposure duration;</li>
          <li>individual health and susceptibility.</li>
        </ul>
        <p>
          OSHA specifically cautions that Heat Index does not provide the same level of workplace hazard assessment as WBGT and recommends appropriate worksite evaluation for occupational heat exposure.
        </p>
        <p>
          For severe symptoms or suspected heat stroke, seek emergency medical care.
        </p>
      </section>

      {/* METHODOLOGY */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Methodology
        </h3>
        <p>
          This calculator implements the NWS heat-index decision process rather than treating the Rothfusz equation as universally applicable.
        </p>
        <p>
          The implementation contains:
        </p>
        <div className="space-y-3 font-sans text-xs sm:text-sm">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
            <strong className="text-slate-900 dark:text-slate-100 block font-bold">Simple heat-index pathway:</strong>
            <p className="text-slate-700 dark:text-slate-300">
              Used when the preliminary result is below the full-regression threshold.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
            <strong className="text-slate-900 dark:text-slate-100 block font-bold">Rothfusz regression:</strong>
            <p className="text-slate-700 dark:text-slate-300">
              Used when conditions qualify for the full procedure.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
            <strong className="text-slate-900 dark:text-slate-100 block font-bold">Low-relative-humidity correction:</strong>
            <p className="text-slate-700 dark:text-slate-300">
              Applied only within the documented NWS temperature and humidity domain.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
            <strong className="text-slate-900 dark:text-slate-100 block font-bold">High-relative-humidity correction:</strong>
            <p className="text-slate-700 dark:text-slate-300">
              Applied only within its documented domain.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
            <strong className="text-slate-900 dark:text-slate-100 block font-bold">Dew-point pathway:</strong>
            <p className="text-slate-700 dark:text-slate-300">
              Converts physically consistent dew-point input into the atmospheric moisture information required for the heat-index calculation.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
            <strong className="text-slate-900 dark:text-slate-100 block font-bold">Direct-sun conservative estimate:</strong>
            <p className="text-slate-700 dark:text-slate-300">
              Presented separately from the shaded NWS Heat Index.
            </p>
          </div>
        </div>
        <p>
          The current implementation independently verifies the NWS procedure, the two humidity corrections, Celsius equivalence, dew-point handling and all 30 heat-index matrix cells.
        </p>
      </section>

      {/* AUTHORITATIVE REFERENCES */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Authoritative References
        </h3>
        <ul className="space-y-3 font-sans text-xs sm:text-sm list-none pl-0">
          <li className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl">
            <strong className="text-slate-900 dark:text-slate-100 block font-bold">
              National Weather Service — Heat Index
            </strong>
            <p className="text-slate-600 dark:text-slate-400 mt-0.5">
              The NWS documents the heat-index concept, shaded-location assumption, direct-sun effect, classification ranges and Rothfusz regression.
            </p>
          </li>
          <li className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl">
            <strong className="text-slate-900 dark:text-slate-100 block font-bold">
              OSHA — Heat Hazard Recognition
            </strong>
            <p className="text-slate-600 dark:text-slate-400 mt-0.5">
              OSHA explains the limitations of Heat Index for occupational assessment and the importance of WBGT, workload, PPE, acclimatization, radiant heat and site-specific conditions.
            </p>
          </li>
          <li className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl">
            <strong className="text-slate-900 dark:text-slate-100 block font-bold">
              OSHA — Heat Stress Calculator
            </strong>
            <p className="text-slate-600 dark:text-slate-400 mt-0.5">
              OSHA&apos;s workplace heat-stress calculator uses WBGT, workload, acclimatization status and clothing factors rather than relying only on Heat Index.
            </p>
          </li>
          <li className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl">
            <strong className="text-slate-900 dark:text-slate-100 block font-bold">
              NIOSH / CDC — Heat Stress Recommendations
            </strong>
            <p className="text-slate-600 dark:text-slate-400 mt-0.5">
              NIOSH provides recommendations concerning hydration, rest breaks, acclimatization and protection against occupational heat stress.
            </p>
          </li>
        </ul>
      </section>
    </article>
  );
}

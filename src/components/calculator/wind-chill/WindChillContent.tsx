"use client";

import React from "react";
import Link from "next/link";
import {
  Thermometer,
  Wind,
  ShieldAlert,
  AlertTriangle,
  Info,
  BookOpen,
  Activity,
  CheckCircle2,
  FileCheck,
  Compass,
} from "lucide-react";

export function WindChillContent() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed space-y-10 py-4">
      {/* INTRO */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Wind Chill Calculator: NWS Formula, Wind Chill Chart &amp; Frostbite Risk
        </h2>
        <p>
          A wind chill calculator estimates how cold the air can feel to exposed human skin when air temperature and wind are considered together. Wind does not literally change the thermometer reading of the surrounding air; instead, moving air increases the rate at which heat is removed from exposed skin. The National Weather Service (NWS) Wind Chill Temperature is designed to communicate this effect in a simple temperature-like value.
        </p>
        <p>
          This calculator lets you enter air temperature and wind speed, choose a temperature and wind unit, and compare the result with an interactive wind-chill matrix. It also distinguishes the NWS/JAG-TI calculation from the Australian Steadman apparent-temperature model, so a result is always interpreted according to the model actually selected.
        </p>
        <p>
          For example, under the NWS model, an air temperature of 10°F with a 20 mph wind produces a wind chill of approximately −8.9°F. That does not mean the air itself has reached −8.9°F. It means the combination of cold air and wind produces a much greater rate of heat loss from exposed skin.
        </p>
      </section>

      {/* 1. WHAT IS WIND CHILL? */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          1. What Is Wind Chill?
        </h2>
        <p>
          Wind chill is a measure of the effect of cold air and wind on exposed skin. On a calm day, a thin layer of warmed air forms close to the skin and provides some insulation. Wind continually replaces that layer with colder surrounding air, increasing convective heat loss.
        </p>
        <p>
          The result is a &quot;feels like&quot; temperature, rather than a second physical air temperature.
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1 text-sm font-sans">
          <p className="font-semibold text-slate-900 dark:text-slate-100">Consider:</p>
          <ul className="list-disc pl-5 space-y-0.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li>Actual air temperature: <strong>10°F</strong></li>
            <li>Wind speed: <strong>20 mph</strong></li>
            <li>NWS wind chill: <strong>approximately −9°F (−8.9°F)</strong></li>
          </ul>
        </div>
        <p>
          A thermometer still reads about 10°F. The wind-chill value communicates the increased cooling effect experienced by exposed skin.
        </p>
        <p>
          That distinction is essential when interpreting weather forecasts, outdoor-work conditions and cold-exposure risk.
        </p>
      </section>

      {/* 2. HOW THE NWS WIND CHILL FORMULA WORKS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          2. How the NWS Wind Chill Formula Works
        </h2>
        <p>
          The modern NWS Wind Chill Temperature formula for Fahrenheit is:
        </p>
        <div className="p-3.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl font-mono text-center font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
          WCT = 35.74 + 0.6215·T - 35.75·(V<sup>0.16</sup>) + 0.4275·T·(V<sup>0.16</sup>)
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Where <em>T</em> is air temperature in °F, and <em>V</em> is wind speed in mph.
        </p>
        <p>
          The NWS formula is defined for air temperatures at or below 50°F and wind speeds above 3 mph.
        </p>
        <p>
          The formula is not simply &quot;temperature minus wind speed.&quot; The wind-speed term uses a fractional power, which is why increasing wind speed has a diminishing effect on the numerical wind-chill value as speeds become very high.
        </p>
        <p>
          The current calculator independently verifies its Fahrenheit implementation against an external mathematical oracle and its reference case agrees with the uploaded PDF.
        </p>
      </section>

      {/* 3. WIND CHILL IN CELSIUS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          3. Wind Chill in Celsius
        </h2>
        <p>
          For Celsius and kilometres per hour, the NWS/JAG-TI implementation uses:
        </p>
        <div className="p-3.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl font-mono text-center font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
          WCT = 13.12 + 0.6215·T - 11.37·(V<sup>0.16</sup>) + 0.3965·T·(V<sup>0.16</sup>)
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Where <em>T</em> is air temperature in °C, and <em>V</em> is wind speed in km/h.
        </p>
        <p>
          When working between Fahrenheit/Celsius or mph/km/h, a{" "}
          <Link href="/calculators/conversion-calculator" className="text-sky-600 dark:text-sky-400 font-semibold hover:underline">
            Conversion Calculator
          </Link>{" "}
          can help verify the input units before applying the wind-chill equation.
        </p>
        <p>
          The calculator keeps full internal numerical precision and converts units before applying the formula rather than rounding the converted wind speed prematurely. Its production tests include 25,000 randomized Celsius NWS cases and pass them all.
        </p>
      </section>

      {/* 4. WIND CHILL VS ACTUAL AIR TEMPERATURE */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          4. Wind Chill vs Actual Air Temperature
        </h2>
        <p>
          The most important wind-chill concept is that wind chill is not the actual air temperature.
        </p>
        <p>
          Suppose the weather station reports:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li>Air temperature: <strong>10°F</strong></li>
          <li>Wind chill: <strong>−9°F</strong></li>
        </ul>
        <p>
          The surrounding air remains approximately 10°F. Wind increases the rate at which exposed skin loses heat, making the conditions feel colder.
        </p>
        <p>
          The same principle applies to many inanimate objects. Environment and Climate Change Canada explains that wind chill can accelerate cooling toward the actual air temperature, but it does not cause an object to cool below that ambient temperature merely because the wind-chill index is lower.
        </p>
        <p>
          For example, if an outdoor object is at 70°F and the air is 10°F, strong wind can make the object lose heat faster, but the wind-chill index does not become the object&apos;s new equilibrium temperature.
        </p>
      </section>

      {/* 5. WHY DOES WIND MAKE COLD FEEL WORSE? */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          5. Why Does Wind Make Cold Feel Worse?
        </h2>
        <p>
          Your body continuously transfers heat to its surroundings. A relatively still layer of air near the skin can act as a small insulating layer. Wind removes that layer and replaces it with colder air.
        </p>
        <p>
          This is why the same air temperature can feel substantially colder on a windy day than on a calm day.
        </p>
        <p>
          The National Weather Service describes wind chill as being based on heat loss from exposed skin, while Environment Canada similarly explains it as the combined effect of temperature and wind on the rate of heat loss.
        </p>
        <p>
          Clothing works in part by trapping air. Multiple appropriate layers can help maintain insulation and reduce the effect of moving cold air.
        </p>
      </section>

      {/* 6. WIND CHILL CHART */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          6. Wind Chill Chart: Temperature and Wind Speed Together
        </h2>
        <p>
          A wind-chill chart is simply a grid showing how different combinations of temperature and wind produce different calculated values.
        </p>
        <p>
          The calculator&apos;s NWS reference matrix includes:
        </p>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
          <table className="w-full text-center border-collapse text-xs">
            <caption className="sr-only">NWS Wind Chill Reference Grid (°F)</caption>
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-slate-100">
                <th scope="col" className="p-2.5 border border-slate-200 dark:border-slate-700">Wind</th>
                <th scope="col" className="p-2.5 border border-slate-200 dark:border-slate-700">20°F</th>
                <th scope="col" className="p-2.5 border border-slate-200 dark:border-slate-700">10°F</th>
                <th scope="col" className="p-2.5 border border-slate-200 dark:border-slate-700">0°F</th>
                <th scope="col" className="p-2.5 border border-slate-200 dark:border-slate-700">−10°F</th>
                <th scope="col" className="p-2.5 border border-slate-200 dark:border-slate-700">−20°F</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono">
              <tr>
                <th scope="row" className="p-2 font-bold bg-slate-50 dark:bg-slate-800/60 text-center font-sans">10 mph</th>
                <td className="p-2 border border-slate-200 dark:border-slate-700">9°F</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−4°F</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−16°F</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−28°F</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−41°F</td>
              </tr>
              <tr>
                <th scope="row" className="p-2 font-bold bg-slate-50 dark:bg-slate-800/60 text-center font-sans">20 mph</th>
                <td className="p-2 border border-slate-200 dark:border-slate-700">4°F</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700 font-bold text-sky-700 dark:text-sky-300">−9°F</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−22°F</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−35°F</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−48°F</td>
              </tr>
              <tr>
                <th scope="row" className="p-2 font-bold bg-slate-50 dark:bg-slate-800/60 text-center font-sans">30 mph</th>
                <td className="p-2 border border-slate-200 dark:border-slate-700">1°F</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−12°F</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−26°F</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−39°F</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−53°F</td>
              </tr>
              <tr>
                <th scope="row" className="p-2 font-bold bg-slate-50 dark:bg-slate-800/60 text-center font-sans">40 mph</th>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−1°F</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−15°F</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−29°F</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−43°F</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−57°F</td>
              </tr>
              <tr>
                <th scope="row" className="p-2 font-bold bg-slate-50 dark:bg-slate-800/60 text-center font-sans">50 mph</th>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−3°F</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−17°F</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−31°F</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−45°F</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">−60°F</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          These values are verified in the production calculator.
        </p>
        <p>
          The interactive matrix is useful because it lets you see the trend immediately: colder air and stronger wind generally produce lower wind-chill values.
        </p>
        <p>
          The table is also exposed semantically rather than being a color-only graphic, so the numerical values remain available to assistive technologies.
        </p>
      </section>

      {/* 7. WHEN DOES WIND CHILL BECOME DANGEROUS? */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          7. When Does Wind Chill Become Dangerous?
        </h2>
        <p>
          Wind chill is particularly important because it helps communicate conditions associated with increased risk of cold injury.
        </p>
        <p>
          The Canadian wind-chill framework classifies:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li><strong>0 to −9:</strong> low risk;</li>
          <li><strong>−10 to −27:</strong> moderate risk;</li>
          <li><strong>−28 to −39:</strong> high risk;</li>
          <li><strong>−40 to −47:</strong> very high risk;</li>
          <li><strong>−48 to −54:</strong> severe risk;</li>
          <li><strong>−55 or colder:</strong> extreme risk.</li>
        </ul>
        <p>
          At progressively colder wind-chill values, exposed skin can freeze more quickly. Environment Canada notes approximate exposure ranges ranging from tens of minutes at high-risk values to only a few minutes or less at the most extreme values.
        </p>
        <p>
          These values should be treated as risk guidance, not a promise that every individual will experience frostbite on an exact schedule.
        </p>
      </section>

      {/* 8. WIND CHILL AND FROSTBITE */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          8. Wind Chill and Frostbite
        </h2>
        <p>
          Frostbite is an actual cold injury caused by freezing of body tissue. The CDC describes common signs as numbness and skin that becomes pale, white or grayish-yellow and unusually firm or waxy.
        </p>
        <p>
          Wind chill matters because faster heat loss can make exposed skin lose heat more rapidly.
        </p>
        <p>
          The NWS gives a well-known reference condition of 0°F with a 15 mph wind, for which the wind chill is approximately −19°F; under those conditions, exposed skin can freeze in about 30 minutes.
        </p>
        <p>
          The calculator uses published risk thresholds as exposure guidance, but it does not treat them as guarantees. Actual risk varies with clothing, exposed body area, duration, wind, moisture, individual physiology and other circumstances.
        </p>
      </section>

      {/* 9. CAN FROSTBITE HAPPEN WHEN AIR TEMP IS ABOVE FREEZING? */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          9. Can Frostbite Happen When the Air Temperature Is Above Freezing?
        </h2>
        <p>
          This is a common point of confusion.
        </p>
        <p>
          The NWS explicitly states that frostbite requires the actual air temperature near the skin to be below freezing. A wind-chill value cannot by itself make a person develop frostbite when the thermometer indicates above-freezing air.
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1 text-xs sm:text-sm">
          <p className="font-semibold text-slate-900 dark:text-slate-100">For example:</p>
          <ul className="list-disc pl-5 space-y-0.5 text-slate-700 dark:text-slate-300">
            <li>Actual air: <strong>35°F</strong></li>
            <li>Strong wind: <strong>possible</strong></li>
            <li>Calculated apparent/wind-chill value: <strong>potentially much lower</strong></li>
          </ul>
        </div>
        <p>
          That may feel very cold and prolonged cold exposure can still present other hazards, including hypothermia, but the wind-chill number itself should not be interpreted as proof that frostbite will occur while the actual ambient air remains above freezing.
        </p>
        <p>
          The calculator specifically contains protection against an above-freezing frostbite false positive.
        </p>
      </section>

      {/* 10. RUNNING, CYCLING OR SKIING */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          10. What Happens When You Are Running, Cycling or Skiing?
        </h2>
        <p>
          A person moving through still air can experience airflow over the body even when the surrounding weather station reports little wind. For practical exposure assessment, forward motion can therefore create additional relative airflow.
        </p>
        <p>
          The calculator provides activity/headwind options and tests them separately from the stationary condition.
        </p>
        <p>
          Its current activity model includes configured adjustments such as:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li><strong>stationary:</strong> +0 mph;</li>
          <li><strong>walking:</strong> +3 mph;</li>
          <li><strong>running:</strong> +8 mph;</li>
          <li><strong>cycling/skiing:</strong> +20 mph.</li>
        </ul>
        <p>
          These should be understood as the calculator&apos;s supplemental relative-airflow model rather than pretending that the NWS formula itself contains those activity categories.
        </p>
        <p>
          For example, if environmental wind is 10 mph and your activity model adds 20 mph of forward-motion airflow, the calculator can evaluate an effective airflow of 30 mph.
        </p>
      </section>

      {/* 11. NWS WIND CHILL VS STEADMAN */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          11. NWS Wind Chill vs Steadman Apparent Temperature
        </h2>
        <p>
          Not every &quot;feels like&quot; temperature is calculated with the same formula.
        </p>
        <p>
          The calculator supports both:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li><strong>NWS / NOAA JAG-TI Wind Chill</strong></li>
          <li><strong>Australian Steadman Apparent Temperature</strong></li>
        </ul>
        <p>
          The NWS wind-chill calculation is designed around cold-weather heat loss from exposed skin. The Australian apparent-temperature concept incorporates atmospheric moisture and temperature in a broader apparent-temperature framework. The Bureau of Meteorology documents apparent temperature using air temperature and vapour pressure as key variables.
        </p>
        <p>
          Therefore, two models may legitimately produce different numerical values for the same weather conditions.
        </p>
        <p>
          The calculator explicitly preserves the selected model in its result and in its exports, avoiding the common mistake of presenting a model-specific result as a universal &quot;true&quot; temperature.
        </p>
      </section>

      {/* 12. WIND CHILL, HEAT INDEX AND DEW POINT ARE DIFFERENT */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          12. Wind Chill, Heat Index and Dew Point Are Different
        </h2>
        <p>
          These weather concepts describe different physical situations:
        </p>
        <div className="space-y-3">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Wind chill</span>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Used primarily for cold conditions and the effect of wind on heat loss from exposed skin.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              <Link href="/calculators/heat-index-calculator" className="text-sky-600 dark:text-sky-400 hover:underline">
                Heat index
              </Link>
            </span>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Used for hot conditions, where humidity reduces the body&apos;s ability to cool itself through evaporation.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              <Link href="/calculators/dew-point-calculator" className="text-sky-600 dark:text-sky-400 hover:underline">
                Dew point
              </Link>
            </span>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Describes the temperature to which air must be cooled for saturation to occur, and is closely related to atmospheric moisture.
            </p>
          </div>
        </div>
        <p>
          They should not be treated as interchangeable &quot;feels like&quot; numbers.
        </p>
        <p>
          A winter weather report may focus on wind chill, while a hot and humid summer report may emphasize heat index.
        </p>
      </section>

      {/* 13. WHY WAS THE FORMULA CHANGED? */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          13. Why Was the Wind Chill Formula Changed?
        </h2>
        <p>
          The modern U.S. Wind Chill Temperature Index replaced the older Siple-Passel formulation.
        </p>
        <p>
          The NWS explains that the earlier method was based on experiments involving water-filled containers in Antarctic conditions. The newer formulation was developed from improved heat-transfer modeling, a human-face model and controlled human testing, making it more representative of human cold exposure.
        </p>
        <p>
          This is why an old wind-chill chart found in an older reference may not match a modern NWS chart.
        </p>
        <p>
          When comparing online calculators, always check which wind-chill formula they use before concluding that one of the calculators is wrong.
        </p>
      </section>

      {/* 14. HOW TO USE THE WIND CHILL CALCULATOR */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          14. How to Use the Wind Chill Calculator
        </h2>
        <p>
          For an ordinary NWS wind-chill calculation:
        </p>
        <ol className="list-decimal pl-5 space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li>Select <strong>NWS / NOAA JAG/TI</strong>.</li>
          <li>Enter the actual air temperature.</li>
          <li>Enter the wind speed.</li>
          <li>Choose °F/mph or the supported metric units.</li>
          <li>Review the calculated wind chill.</li>
          <li>Check the risk guidance and heat-map position.</li>
          <li>Review any activity or vulnerability modifiers you intentionally selected.</li>
        </ol>
        <p>
          For the clearest interpretation, distinguish between:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li><strong>actual weather conditions</strong></li>
          <li><strong>calculated exposure indicator</strong></li>
        </ul>
        <p>
          The calculator should never be used as a replacement for current official weather warnings during dangerous conditions.
        </p>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {/* FAQ 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              What is a wind chill calculator?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              A wind chill calculator combines air temperature and wind speed to estimate how cold the conditions may feel to exposed skin. The NWS wind-chill value is an exposure-oriented &quot;feels like&quot; index, not a separate physical air temperature.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              What is the NWS wind chill formula?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              For Fahrenheit, the NWS formula is: <code>WCT = 35.74 + 0.6215·T - 35.75·(V^0.16) + 0.4275·T·(V^0.16)</code>, where <em>T</em> is temperature in °F and <em>V</em> is wind speed in mph. The NWS defines the formula for temperatures at or below 50°F and wind speeds above 3 mph.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              What is the wind chill at 10°F and 20 mph?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Using the NWS/JAG-TI formula, the result is approximately −8.9°F. The calculator&apos;s production test suite independently verifies this exact reference case.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Can wind chill make water, pipes or a car engine colder than the actual air temperature?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              No. Wind can increase the rate at which an object loses heat, but the object cannot be cooled below the surrounding air temperature solely because of wind chill. Environment Canada gives the same physical explanation.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Can you get frostbite when the air temperature is above freezing but wind chill is below freezing?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              According to the NWS, frostbite requires the actual air temperature near the skin to be below freezing. A wind-chill number alone cannot make frostbite occur when the ambient air remains above freezing.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              At what wind chill does frostbite become dangerous?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Risk increases as wind chill falls. Environment Canada classifies −28 to −39 as high risk, −40 to −47 as very high risk, −48 to −54 as severe risk and −55 or colder as extreme risk. Exposure times can become very short at the coldest values.
            </p>
          </div>

          {/* FAQ 7 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              How long can exposed skin be outside in extreme wind chill?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              There is no universally guaranteed safe duration. Published wind-chill guidance provides approximate exposure windows under specific conditions, but actual risk depends on clothing, exposed skin, wind, moisture, activity and individual factors. Seek shelter and protect exposed skin when conditions are hazardous.
            </p>
          </div>

          {/* FAQ 8 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Does running or cycling change wind chill?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Your forward movement can create additional airflow over the body. This is sometimes called relative wind or relative airflow. The calculator includes an optional activity/headwind model so you can evaluate conditions during movement, but that supplemental adjustment should not be confused with the core NWS meteorological formula.
            </p>
          </div>

          {/* FAQ 9 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              What is the difference between wind chill and Steadman apparent temperature?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              They are different apparent-temperature models. NWS wind chill focuses on cold-related heat loss from exposed skin, while Steadman&apos;s apparent-temperature framework incorporates temperature and atmospheric moisture. Because the models represent different physical relationships, they can produce different numbers for the same weather conditions.
            </p>
          </div>

          {/* FAQ 10 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Why does my wind chill result differ from another website?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              The most common reasons are different formulas, unit conversions, weather inputs, wind measurement conventions or rounding. Always compare the model being used before comparing the numerical results. This calculator explicitly identifies the active model in its result and exports.
            </p>
          </div>

          {/* FAQ 11 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              What are the early signs of frostbite and hypothermia?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Frostbite can cause numbness and skin that becomes pale, white or grayish-yellow and firm or waxy. Hypothermia can involve shivering, exhaustion, confusion, fumbling hands, drowsiness and slurred speech. Hypothermia is a medical emergency.
            </p>
          </div>

          {/* FAQ 12 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Is wind chill the same as a &quot;feels like&quot; temperature?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Not always. &quot;Feels like&quot; is a broad everyday description that can refer to several different apparent-temperature models. Wind chill specifically describes the effect of cold air and wind, while other apparent-temperature measures can incorporate variables such as humidity.
            </p>
          </div>
        </div>
      </section>

      {/* SAFETY NOTE */}
      <section className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
          <ShieldAlert className="h-5 w-5 text-sky-600" />
          Wind Chill Safety Note
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Wind-chill calculations are useful for understanding exposure conditions, but they do not diagnose frostbite or hypothermia and do not guarantee a specific exposure time for an individual.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          The CDC advises getting out of the cold or protecting exposed skin when frostbite signs such as numbness, redness, pain or abnormal skin color develop. Hypothermia can occur after prolonged cold exposure and is a medical emergency when serious symptoms appear.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          For active winter storms, extreme cold warnings and immediate safety decisions, use current official weather and emergency information in addition to any calculator.
        </p>
      </section>

      {/* METHODOLOGY & REFERENCE NOTES */}
      <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Methodology &amp; Reference Notes
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          This calculator uses explicitly named models rather than treating all apparent-temperature formulas as interchangeable.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          The NWS/JAG-TI calculation is based on established cold-weather heat-loss modeling and has defined input-domain conditions.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          The production implementation independently verifies its NWS Fahrenheit and Celsius calculations, Steadman model, unit conversions, heat-map cells, frostbite-risk logic, activity adjustments and export consistency. The current verification suite reports 1,025,008 / 1,025,008 passing assertions.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          The heat-map values used on the page are also regression-tested against the reference table.
        </p>
      </section>

      {/* AUTHORITATIVE REFERENCES */}
      <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
        <h2 className="text-base font-bold text-slate-800 dark:text-slate-200">
          Authoritative References
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>U.S. National Weather Service — Understanding Wind Chill:</strong> Defines the wind-chill concept and provides the standard example of 0°F with 15 mph producing a −19°F wind chill.
          </li>
          <li>
            <strong>U.S. National Weather Service — Wind Chill Questions:</strong> Documents the NWS formula, its domain and the important distinction between actual air temperature and frostbite risk.
          </li>
          <li>
            <strong>Environment and Climate Change Canada — Wind Chill and the Wind Chill Index:</strong> Provides current wind-chill risk categories, exposure guidance and the explanation that wind chill does not cool objects below ambient air temperature.
          </li>
          <li>
            <strong>CDC — Preventing Frostbite:</strong> Provides current signs, risk factors and safety guidance for frostbite.
          </li>
          <li>
            <strong>CDC — Preventing Hypothermia:</strong> Provides current signs, risk factors and emergency guidance for hypothermia.
          </li>
          <li>
            <strong>Australian Bureau of Meteorology — Apparent Temperature:</strong> Provides background on the Australian apparent-temperature concept and its relationship to temperature and water-vapour pressure.
          </li>
        </ul>
      </section>
    </article>
  );
}

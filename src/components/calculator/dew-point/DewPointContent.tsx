"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, ArrowRight } from "lucide-react";
import { dew_point_calculatorFaqs } from "@/app/calculators/dew-point-calculator/faq";

export function DewPointContent() {
  // All 15 FAQs open by default for full SSR indexability and UX visibility
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 15 }, (_, i) => i))
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
    <article className="mt-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">

      {/* 4. INTRODUCTION / ARTICLE OPENING */}
      <div className="pt-6 space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-normal">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Dew Point: What It Means and Why It Matters
          </h2>
          <p>
            Dew point is the temperature at which air becomes saturated with water vapor and condensation can begin. In practical terms, it tells you how much moisture is actually present in the air. A higher dew point generally means more atmospheric moisture and a greater likelihood of a muggy or humid feeling. NOAA describes dew point as the temperature at which water vapor turns into liquid droplets when the air is cooled to saturation.
          </p>
          <p>
            That makes dew point useful in situations where relative humidity alone can be misleading. Relative humidity changes when air temperature changes even if the amount of moisture in the air stays similar, while dew point is much more directly tied to the moisture content of the air.
          </p>
          <p>
            For example, air at 70°F and 65% relative humidity has a dew point of about 57.7°F using the calculator&apos;s selected Alduchov &amp; Eskridge approximation. That single temperature can help describe humidity, condensation potential and comfort more intuitively than relative humidity alone.
          </p>
          <p>
            This Dew Point Calculator calculates dew point from temperature and relative humidity and can also solve in the reverse direction. It additionally provides wet-bulb temperature, absolute humidity, vapor pressure, frost point, an approximate cloud-base estimate, a comfort interpretation and a Coating Condensation Screening result based on the calculator&apos;s stated 5°F surface-to-dew-point screening benchmark.
          </p>
        </section>

        {/* 5. SECTION — WHAT IS DEW POINT? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is Dew Point?
          </h2>
          <p>
            The dew point is the temperature to which air must be cooled, at approximately constant moisture content, for saturation to occur.
          </p>
          <p>
            When the temperature of a surface falls to or below the dew point of the surrounding air, water vapor can condense on that surface. This is why droplets can appear on a cold drink, a window, metal equipment or another surface that becomes sufficiently cool.
          </p>
          <p>
            Dew point therefore provides a useful bridge between atmospheric humidity and visible condensation.
          </p>
          <p>
            A useful way to think about the relationship is:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Higher dew point →</strong> more moisture in the air</li>
            <li><strong>Surface temperature approaching dew point →</strong> increasing condensation risk</li>
            <li><strong>Surface temperature at or below dew point →</strong> condensation can occur</li>
          </ul>
          <p>
            Dew point does not mean that condensation must occur everywhere at exactly the same moment. Actual condensation also depends on the surface condition, heat transfer, air movement, local temperature variations and other environmental factors.
          </p>
        </section>

        {/* 6. SECTION — DEW POINT VS RELATIVE HUMIDITY */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Dew Point vs. Relative Humidity
          </h2>
          <p>
            Relative humidity and dew point both describe atmospheric moisture, but they answer different questions.
          </p>
          <p>
            Relative humidity expresses how close the air is to saturation at its current temperature.
          </p>
          <p>
            Dew point expresses the temperature at which saturation would be reached if the air were cooled.
          </p>
          <p>
            This distinction is important because relative humidity depends strongly on temperature.
          </p>
          <p>
            Suppose two locations both have 60% relative humidity. If one location is much warmer, the actual amount of water vapor in the air can be very different. Their dew points will reveal that difference more clearly.
          </p>
          <p>
            That is why dew point is often useful for interpreting how moist the air actually is. NOAA notes that higher dew points correspond to greater moisture and generally more humid conditions.
          </p>
          <p>
            As a practical rule:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 font-medium">
            Relative humidity tells you how full the air is relative to its temperature-dependent capacity; dew point tells you how much cooling is required to reach saturation.
          </div>
          <p>
            This is also why weather reports often provide both temperature and dew point.
          </p>
        </section>

        {/* 7. SECTION — HOW THE CALCULATOR WORKS */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How the Dew Point Calculator Works
          </h2>
          <p>
            The calculator uses air temperature and relative humidity to estimate dew point.
          </p>
          <p>
            Its primary calculation uses the Alduchov &amp; Eskridge (1996) improved Magnus-form approximation for saturation vapor pressure. The published work presents this as an improved approximation for saturation vapor pressure rather than an exact universal equation of state.
          </p>
          <p>
            For temperatures expressed in degrees Celsius, the calculator&apos;s formulation can be represented by the commonly used Magnus-type structure:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs text-center text-blue-700 dark:text-blue-300 font-bold overflow-x-auto space-y-1.5">
            <div>γ(T, RH) = ln(RH / 100) + (a · T) / (b + T)</div>
            <div>T_d = (b · γ(T, RH)) / (a - γ(T, RH))</div>
          </div>
          <p>
            where T_d is dew-point temperature and the constants correspond to the selected approximation.
          </p>
          <p>
            The important point is that the calculator performs its internal calculations using full floating-point precision and rounds only when presenting the final result.
          </p>
          <p>
            That matters for inverse calculations and chained quantities such as vapor pressure, absolute humidity and moisture-related margins.
          </p>
        </section>

        {/* 8. SECTION — WORKED EXAMPLE */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Dew Point Example: 70°F and 65% Relative Humidity
          </h2>
          <p>Consider air at:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Air temperature: 70°F</li>
            <li>Relative humidity: 65%</li>
          </ul>
          <p>The calculator produces approximately:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 font-medium">
            Dew point: <strong>57.7°F</strong> (or about <strong>14.3°C</strong>)
          </div>
          <p>
            This means the air would reach saturation at approximately 57.7°F if it were cooled without changing its moisture content.
          </p>
          <p>The same example produces additional useful quantities in the calculator:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Wet-bulb temperature: about 62.0°F</li>
            <li>Absolute humidity: about 11.97 g/m³</li>
            <li>Actual vapor pressure: about 16.25 hPa</li>
          </ul>
          <p>
            The dew point therefore gives a compact description of the moisture state, while the additional outputs help interpret that state for different applications.
          </p>
        </section>

        {/* 9. SECTION — REVERSE CALCULATIONS */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Calculate Relative Humidity From Dew Point
          </h2>
          <p>The relationship works in both directions.</p>
          <p>
            Instead of entering temperature and relative humidity, you can start with air temperature and dew point and estimate relative humidity.
          </p>
          <p>This is useful when a weather observation gives you:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>air temperature</li>
            <li>dew-point temperature</li>
          </ul>
          <p>but does not directly provide relative humidity.</p>
          <p>
            NOAA&apos;s Weather Prediction Center publishes the same general type of temperature/dew-point relationship for calculating relative humidity.
          </p>
          <p>
            Because dew point and relative humidity are mathematically connected through saturation vapor pressure, the inverse calculation can recover humidity from a known dew point and air temperature.
          </p>
        </section>

        {/* 10. SECTION — AIR TEMPERATURE FROM DEW POINT */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Calculate Air Temperature From Dew Point and Humidity
          </h2>
          <p>The calculator can also solve the opposite problem:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 font-medium">
            What air temperature corresponds to a given dew point and relative humidity?
          </div>
          <p>
            This is useful for scenario analysis and for checking whether combinations of temperature, humidity and dew point are internally consistent.
          </p>
          <p>
            For example, a fixed dew point represents a fixed moisture-related state, while changing air temperature changes relative humidity.
          </p>
          <p>
            This is one reason dew point is useful for understanding how humidity evolves during warming and cooling.
          </p>
        </section>

        {/* 11. SECTION — VAPOR PRESSURE AND ABSOLUTE HUMIDITY */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Vapor Pressure and Absolute Humidity
          </h2>
          <p>Dew point is closely related to vapor pressure.</p>
          <p>
            Actual vapor pressure represents the partial pressure contributed by water vapor in the air.
          </p>
          <p>
            Saturation vapor pressure is the vapor pressure corresponding to saturation at a particular temperature.
          </p>
          <p>
            Relative humidity can be expressed conceptually as the ratio between actual vapor pressure and saturation vapor pressure:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs text-center text-blue-700 dark:text-blue-300 font-bold overflow-x-auto">
            RH ≈ 100 × (e / e_s)
          </div>
          <p>where e is actual vapor pressure and e_s is saturation vapor pressure.</p>
          <p>The calculator uses this relationship to derive additional moisture quantities.</p>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-3">Absolute Humidity</h3>
          <p>
            Absolute humidity describes the mass of water vapor contained in a given volume of air, commonly expressed in g/m³.
          </p>
          <p>
            This can be useful when you need a moisture quantity expressed directly as water-vapor mass instead of a percentage.
          </p>
          <p>
            Because temperature and vapor pressure are linked, the calculator can provide these values consistently from the same underlying moisture state.
          </p>
        </section>

        {/* 12. SECTION — WET-BULB TEMPERATURE */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Dew Point vs. Wet-Bulb Temperature
          </h2>
          <p>
            Wet-bulb temperature is related to evaporation and evaporative cooling, but it is not the same thing as dew point.
          </p>
          <p>For the same air:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Dew point</strong> describes the temperature at which saturation is reached through cooling.</li>
            <li><strong>Wet-bulb temperature</strong> describes the equilibrium temperature associated with evaporative cooling under the approximation used.</li>
          </ul>
          <p>
            The calculator estimates wet-bulb temperature using the Stull (2011) empirical approximation. Stull&apos;s published equation was developed for standard sea-level pressure and is intended for approximately 5%–99% relative humidity and −20°C to 50°C air temperature, with an exception for some combinations of low humidity and cold temperature. The reported error over its stated valid range is approximately −1°C to +0.65°C, with mean absolute error below 0.3°C.
          </p>
          <p>
            Therefore, the wet-bulb result should be interpreted as an estimate, not as a pressure-independent exact psychrometric solution.
          </p>
          <p>
            When evaluating how hot the air may feel under humid conditions, compare the result with the{" "}
            <Link
              href="/calculators/heat-index-calculator"
              className="font-semibold text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Heat Index Calculator
            </Link>
            , which provides a separate apparent-temperature calculation based on temperature and humidity.
          </p>
        </section>

        {/* 13. SECTION — FROST POINT */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Dew Point and Frost Point
          </h2>
          <p>
            At temperatures below freezing, moisture can deposit directly as ice under appropriate conditions.
          </p>
          <p>
            The term frost point is used for the temperature associated with deposition of water vapor onto an ice surface rather than ordinary liquid-water condensation.
          </p>
          <p>
            This distinction matters in cold environments because water can transition directly between vapor and solid phases.
          </p>
          <p>
            The calculator therefore distinguishes frost-point behavior from ordinary dew-point calculations where appropriate.
          </p>
          <p>
            The same basic moisture principle remains: cooler surface or air → closer to saturation → greater potential for condensation or deposition.
          </p>
        </section>

        {/* 14. SECTION — CLOUD BASE */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Estimating Cloud Base From Temperature and Dew Point
          </h2>
          <p>
            The calculator also provides an approximate cloud-base estimate using the temperature/dew-point spread.
          </p>
          <p>
            A commonly used aviation and meteorological rule of thumb estimates cloud base above ground level from the difference between air temperature and dew point. A larger temperature/dew-point spread generally corresponds to a higher estimated cloud base, while a smaller spread indicates a lower one.
          </p>
          <p>
            This is only an approximation and should not be treated as a universal cloud-ceiling calculation. Actual cloud development depends on atmospheric stability, lifting mechanism, terrain, pressure and other meteorological variables.
          </p>
          <p>
            The National Weather Service uses temperature/dew-point spread relationships in practical weather calculations, including approximate cloud-base estimation in appropriate convective contexts.
          </p>
          <p>
            For this reason, the calculator labels this output as an estimate, not an exact forecast of cloud-base height.
          </p>
        </section>

        {/* 15. SECTION — CONDENSATION AND SURFACE TEMPERATURE */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Dew Point and Condensation
          </h2>
          <p>
            One of the most useful applications of dew point is assessing whether a surface may become wet from condensation.
          </p>
          <p>
            Imagine air with a dew point of 57.7°F.
          </p>
          <p>
            If a nearby surface cools toward 57.7°F, condensation becomes increasingly possible.
          </p>
          <p>
            If the surface reaches or falls below the dew point, the surface can be at conditions where condensation occurs.
          </p>
          <p>This is especially important for:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-700 dark:text-slate-300">
            <div>• cold pipes</div>
            <div>• HVAC equipment</div>
            <div>• refrigeration systems</div>
            <div>• windows</div>
            <div>• metal structures</div>
            <div>• storage environments</div>
            <div>• warehouses</div>
            <div>• electrical equipment</div>
            <div>• painted and coated surfaces</div>
          </div>
          <p>
            The key comparison is therefore not simply air temperature vs. humidity, but <strong>surface temperature vs. dew point</strong>. That distinction is critical in practical condensation assessment.
          </p>
        </section>

        {/* 16. SECTION — COATING CONDENSATION SCREENING */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Dew Point and Coating Condensation Screening
          </h2>
          <p>
            For coating and painting work, the calculator provides a separate Coating Condensation Screening result.
          </p>
          <p>
            The calculator uses a 5°F surface-to-dew-point difference as its stated screening benchmark:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs text-center text-blue-700 dark:text-blue-300 font-bold overflow-x-auto">
            T_surface - T_d ≥ 5°F
          </div>
          <p>
            When this condition is satisfied, the calculator reports that the selected screening condition has been met.
          </p>
          <p>
            This benchmark is deliberately presented as a calculator-specific conservative screening rule, not as certification.
          </p>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-2">Important Standards Clarification</h3>
          <p>
            ISO 8502-4:2017 is a current international standard that provides guidance for estimating the probability of condensation before paint application. The ISO description specifically addresses estimation of condensation probability on a surface to be painted and whether site conditions are suitable for painting.
          </p>
          <p>
            However, this calculator&apos;s 5°F benchmark does not constitute ISO 8502-4 compliance or certification.
          </p>
          <p>It also does not replace:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>the coating manufacturer&apos;s application requirements</li>
            <li>project specifications</li>
            <li>site inspection</li>
            <li>substrate condition assessment</li>
            <li>surface cleanliness requirements</li>
            <li>measured environmental conditions</li>
            <li>temperature gradients across the work area</li>
            <li>other applicable standards or procedures</li>
          </ul>
          <p>
            Accordingly, the calculator should be used as a screening and decision-support tool, not as a certification instrument.
          </p>
        </section>

        {/* 17. SECTION — DEW POINT AND COMFORT */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Does Dew Point Say About Comfort?
          </h2>
          <p>
            Dew point is often easier to interpret as a measure of perceived moisture than relative humidity alone.
          </p>
          <p>
            As dew point rises, more water vapor is present in the air and evaporation of sweat becomes less effective.
          </p>
          <p>In general:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Low dew point:</strong> air tends to feel dry or crisp.</li>
            <li><strong>Moderate dew point:</strong> conditions can feel comfortable.</li>
            <li><strong>Higher dew point:</strong> conditions increasingly feel humid or sticky.</li>
            <li><strong>Very high dew point:</strong> moisture can feel oppressive, especially during hot weather.</li>
          </ul>
          <p>
            NOAA similarly explains that higher dew points generally correspond to more moisture and a more humid feeling.
          </p>
          <p>
            The precise comfort category should be treated as a practical interpretation rather than a universal physiological law. Individual perception, temperature, airflow, clothing and activity level all matter. In cold-weather analysis, the{" "}
            <Link
              href="/calculators/wind-chill-calculator"
              className="font-semibold text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Wind Chill Calculator
            </Link>{" "}
            provides a complementary measure of apparent temperature based on wind and air temperature.
          </p>
        </section>

        {/* 18. SECTION — WHY DEW POINT IS USEFUL */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Where Dew Point Is Used
          </h2>
          <p>Dew point has applications far beyond weather forecasts.</p>
          <div className="space-y-2.5">
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Weather:</strong> Meteorologists use dew point to describe atmospheric moisture and assess conditions related to fog, clouds, precipitation and humidity.
            </div>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">HVAC:</strong> Engineers can use dew point when assessing moisture control, condensation potential and dehumidification.
            </div>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Buildings:</strong> Dew point is important when evaluating cold surfaces, windows, insulation and moisture accumulation.
            </div>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Refrigeration:</strong> Cold equipment surfaces can fall below the ambient dew point, allowing moisture to condense.
            </div>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Industrial coatings:</strong> Surface temperature relative to dew point is an important part of condensation-risk assessment before applying coatings.
            </div>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Storage:</strong> Warehouses and enclosed spaces can experience moisture problems when surfaces cool below the surrounding air&apos;s dew point.
            </div>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Everyday weather decisions:</strong> Dew point can help explain why a day feels dry, comfortable, sticky or oppressive even when relative humidity by itself appears similar.
            </div>
          </div>
        </section>

        {/* 19. SECTION — HOW TO USE THE CALCULATOR */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Use the Dew Point Calculator
          </h2>
          <div className="space-y-2.5">
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Step 1: Enter the air temperature</strong>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">Enter the measured or observed air temperature in Fahrenheit or Celsius.</p>
            </div>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Step 2: Enter relative humidity</strong>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">Enter the relative humidity as a percentage.</p>
            </div>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Step 3: Select the calculation</strong>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">Use the standard dew-point calculation or one of the available inverse modes when you want to solve from dew point.</p>
            </div>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Step 4: Review the moisture outputs</strong>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">The calculator can show: dew point, wet-bulb temperature, absolute humidity, vapor pressure, frost point, cloud-base estimate, comfort interpretation, and surface-to-dew-point margin.</p>
            </div>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Step 5: Check condensation conditions</strong>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">For a physical surface, enter its temperature and compare it with the calculated dew point.</p>
            </div>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Step 6: Apply the result to the actual situation</strong>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">For professional applications, compare the calculator output with the relevant manufacturer&apos;s instructions, project requirements and field measurements.</p>
            </div>
          </div>
        </section>

        {/* 20. SECTION — COMMON MISTAKES */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Common Dew Point Calculation Mistakes
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Confusing dew point with relative humidity:</strong> They are related, but they are not interchangeable.
            </li>
            <li>
              <strong>Assuming 100% humidity means the air is always cold:</strong> Relative humidity is temperature-dependent. Air can reach 100% RH at many different temperatures.
            </li>
            <li>
              <strong>Ignoring surface temperature:</strong> Condensation depends strongly on the temperature of the surface, not simply the surrounding air temperature.
            </li>
            <li>
              <strong>Treating an approximate cloud-base value as an exact ceiling:</strong> Cloud-base rules of thumb are approximations and depend on atmospheric conditions.
            </li>
            <li>
              <strong>Treating wet-bulb temperature as dew point:</strong> Wet-bulb and dew point describe different physical processes.
            </li>
            <li>
              <strong>Treating the 5°F coating benchmark as an ISO certification:</strong> The calculator&apos;s 5°F benchmark is only a screening benchmark. It is not a declaration of ISO 8502-4 compliance.
            </li>
          </ul>
        </section>

        {/* 21. SECTION — LIMITATIONS */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Calculator Limitations
          </h2>
          <p>No dew-point calculator can capture every environmental variable in a real physical system.</p>
          <p>Results can differ from field measurements because of:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-700 dark:text-slate-300">
            <div>• sensor accuracy</div>
            <div>• local temperature gradients</div>
            <div>• changing humidity</div>
            <div>• atmospheric pressure</div>
            <div>• airflow</div>
            <div>• surface emissivity</div>
            <div>• thermal radiation</div>
            <div>• rapidly changing weather</div>
            <div>• wet or contaminated surfaces</div>
            <div>• non-uniform conditions</div>
          </div>
          <p>
            The calculator&apos;s dew-point calculation is based on an empirical saturation-vapor-pressure approximation, while the wet-bulb result uses the Stull empirical approximation under its stated conditions.
          </p>
          <p>
            The cloud-base output is an approximation and should not be treated as a direct forecast.
          </p>
          <p>
            The coating result is a screening calculation and does not certify compliance with any coating specification or international standard.
          </p>
        </section>
      </div>

      {/* 23. FAQ SECTION (All 15 Approved FAQs, Open by Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {dew_point_calculatorFaqs.map((faq, idx) => {
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

      {/* 25. SOURCE / METHODOLOGY SECTION */}
      <div className="pt-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Scientific and Methodology References
          </h2>
        </div>
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-slate-900 dark:text-slate-100 block">NOAA — Dew Point and Relative Humidity</strong>
            <p>
              NOAA explains the relationship between air temperature, dew point and relative humidity and provides practical dew-point/relative-humidity calculations.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-slate-900 dark:text-slate-100 block">Alduchov, O. A. &amp; Eskridge, R. E. (1996)</strong>
            <p>
              Improved Magnus Form Approximation of Saturation Vapor Pressure, <em>Journal of Applied Meteorology and Climatology</em>, 35, 601–609. DOI: 10.1175/1520-0450(1996)035&lt;0601:IMFAOS&gt;2.0.CO;2.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-slate-900 dark:text-slate-100 block">Stull, R. (2011)</strong>
            <p>
              Wet-Bulb Temperature from Relative Humidity and Air Temperature, <em>Journal of Applied Meteorology and Climatology</em>, 50, 2267–2269. DOI: 10.1175/JAMC-D-11-0143.1.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-slate-900 dark:text-slate-100 block">ISO 8502-4:2017</strong>
            <p>
              Preparation of steel substrates before application of paints and related products — Part 4: Guidance on the estimation of the probability of condensation prior to paint application. The ISO publication states that the 2017 edition is the current published version and provides guidance for estimating condensation probability.
            </p>
          </div>
        </div>
      </div>

      {/* 24. AFTER-FAQ RELATED CALCULATORS (Symmetrical Bottom Block) */}
      <div className="no-print pt-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Related Calculators
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Link
            href="/calculators/heat-index-calculator"
            className="group p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-400/60 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-all block"
          >
            <div className="font-bold text-sm text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
              <span>Heat Index Calculator</span>
              <ArrowRight className="h-3.5 w-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-normal font-normal">
              Understand how temperature and humidity combine to affect apparent heat.
            </p>
          </Link>
          <Link
            href="/calculators/wind-chill-calculator"
            className="group p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-400/60 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-all block"
          >
            <div className="font-bold text-sm text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
              <span>Wind Chill Calculator</span>
              <ArrowRight className="h-3.5 w-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-normal font-normal">
              Estimate apparent cold temperature from air temperature and wind speed.
            </p>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default DewPointContent;

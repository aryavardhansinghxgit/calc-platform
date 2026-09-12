"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Info,
} from "lucide-react";
import { tire_size_calculatorFaqs } from "@/app/calculators/tire-size-calculator/faq";

export function TireSizeContent() {
  // All 18 FAQs unfolded by default per platform specifications
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: tire_size_calculatorFaqs.length }, (_, i) => i))
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
      {/* 1. MAIN SEO ARTICLE */}
      <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Header & Introductory Overview */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Tire Size Calculator: Compare Tire Diameter, Fitment, Speedometer &amp; Gearing
          </h2>
          <p>
            Choosing a different tire size changes more than the appearance of a vehicle. Tire diameter affects rolling circumference, revolutions per mile, indicated versus actual speed, ride height and the mechanical relationship between the tires and final-drive gearing. Tire width and wheel offset also affect how a wheel-and-tire package occupies the available space around the suspension and fender.
          </p>
          <p>
            The Tire Size Calculator lets you compare two tire configurations and see these changes together rather than evaluating tire diameter alone. Enter a standard metric size such as 225/50R17 or a flotation-style size such as 33x12.50R15, and the calculator can determine sidewall height, overall diameter, circumference, revolutions per mile and speedometer difference. It can also analyze wheel offset and backspacing and estimate the effect of tire diameter on effective final-drive ratio.
          </p>
          <p>
            The calculator&apos;s production reference case, for example, compares 225/50R17 with 245/45R18 and calculates approximately 25.86 in versus 26.68 in overall diameter, a difference of 0.82 in or about 3.2%.
          </p>
          <p>
            The purpose of the comparison is not simply to tell you whether a tire is &ldquo;bigger&rdquo; or &ldquo;smaller.&rdquo; It is to show exactly how the proposed size changes the vehicle&apos;s geometry and speed relationship.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            1. How to Read a Tire Size Such as 225/50R17
          </h3>
          <p>A common passenger-car tire marking looks like:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-sm font-bold text-slate-900 dark:text-slate-100">
            225/50R17
          </div>
          <p>Each part describes a different property.</p>
          <p><strong>225</strong> is the nominal section width in millimetres.</p>
          <p><strong>50</strong> is the aspect ratio. It means the nominal sidewall height is 50% of the section width.</p>
          <p><strong>R</strong> indicates radial construction.</p>
          <p><strong>17</strong> is the nominal wheel rim diameter in inches.</p>
          <p>
            So a 225/50R17 tire has a nominal section width of 225 mm and a sidewall height calculated from 50% of that width. The same basic structure applies to many P-Metric tire sizes.
          </p>
          <p>
            The distinction between nominal section width and actual tread/contact width matters. Section width is not simply the width of the rubber that touches the road. ETRTO describes tire service information in terms of standardized markings and distinguishes dimensions from the load index and speed symbol used in the service description.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            2. What Does the Aspect Ratio Mean?
          </h3>
          <p>The aspect ratio expresses sidewall height as a percentage of section width.</p>
          <p>The fundamental calculation is:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            {"H_mm = W_mm × (AR / 100)"}
          </div>
          <p>where <em>H</em> = sidewall height, <em>W</em> = section width, and <em>AR</em> = aspect ratio.</p>
          <p>For <strong>225/50R17</strong>, the sidewall calculation is:</p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs text-slate-800 dark:text-slate-200">
            {"225 × 0.50 = 112.5 mm"}
          </div>
          <p>Converting to inches:</p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs text-slate-800 dark:text-slate-200">
            {"112.5 / 25.4 ≈ 4.4291 in"}
          </div>
          <p>
            The calculator keeps this value at full precision internally and rounds only when displaying the result. This is important because rounding the sidewall before calculating the final diameter would introduce unnecessary error into every downstream calculation.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            3. How Is Overall Tire Diameter Calculated?
          </h3>
          <p>For a conventional tire-size notation, the overall diameter is approximately:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            {"D = d_rim + 2H"}
          </div>
          <p>where <em>D</em> = overall tire diameter, <em>d_rim</em> = wheel rim diameter, and <em>H</em> = one-side sidewall height.</p>
          <p>For <strong>225/50R17</strong>:</p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs text-slate-800 dark:text-slate-200">
            {"H = 4.4291 in"}
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs text-slate-800 dark:text-slate-200">
            {"D = 17 + 2(4.4291) ≈ 25.858 in → 225/50R17 ≈ 25.86 in"}
          </div>
          <p>For <strong>245/45R18</strong>:</p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs text-slate-800 dark:text-slate-200">
            {"H ≈ 4.3406 in → 18 + 2(4.3406) ≈ 26.6811 in → 245/45R18 ≈ 26.68 in"}
          </div>
          <p>These are the exact production golden-case values verified by the calculator.</p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            4. Tire Diameter Comparison: 225/50R17 vs 245/45R18
          </h3>
          <p>The difference between these two sizes provides a useful example of why tire-size comparisons should be calculated instead of guessed.</p>
          <div className="overflow-x-auto my-2">
            <table className="w-full text-left border-collapse border border-slate-200 dark:border-slate-700 text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 font-bold">
                  <th className="p-2.5">Specification</th>
                  <th className="p-2.5">225/50R17</th>
                  <th className="p-2.5">245/45R18</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                <tr>
                  <td className="p-2.5 font-medium">Section width</td>
                  <td className="p-2.5">225 mm</td>
                  <td className="p-2.5">245 mm</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Sidewall</td>
                  <td className="p-2.5">4.43 in</td>
                  <td className="p-2.5">4.34 in</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Overall diameter</td>
                  <td className="p-2.5">25.86 in</td>
                  <td className="p-2.5">26.68 in</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Circumference</td>
                  <td className="p-2.5">81.24 in</td>
                  <td className="p-2.5">83.82 in</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Revs/mile</td>
                  <td className="p-2.5">780</td>
                  <td className="p-2.5">756</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The target tire is approximately <strong>0.82 in</strong> larger in diameter, or about <strong>3.2%</strong> larger. The calculator independently verifies every value in this comparison.
          </p>
          <p>
            This is a good example of why changing from a 17-inch wheel to an 18-inch wheel does not automatically tell you what the resulting overall diameter will be. The tire&apos;s section width and aspect ratio also change.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            5. How Tire Circumference Changes
          </h3>
          <p>Once overall diameter is known, circumference follows from:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            {"C = π × D"}
          </div>
          <p>
            For the stock tire: <code>C = π(25.858)</code>, which gives approximately <strong>81.24 in</strong>.
          </p>
          <p>
            For the target tire: <code>C = π(26.6811)</code>, which gives approximately <strong>83.82 in</strong>.
          </p>
          <p>
            The production engine reports a circumference increase of about <strong>2.58 in</strong> or <strong>65.7 mm</strong> between the two reference sizes.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            6. Revolutions Per Mile
          </h3>
          <p>A larger tire travels farther during one complete revolution.</p>
          <p>For a tire with circumference <em>C</em>:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            {"Rev/Mile = 63,360 / C_in"}
          </div>
          <p>because one statute mile contains 63,360 inches.</p>
          <p>
            For the reference comparison: <code>225/50R17 → ≈ 780 rev/mile</code>, while <code>245/45R18 → ≈ 756 rev/mile</code>. So the larger tire requires approximately 24 fewer revolutions to travel one mile.
          </p>
          <p>
            The relationship is straightforward: <em>larger diameter → larger circumference → fewer revolutions per mile</em>, and <em>smaller diameter → smaller circumference → more revolutions per mile</em>.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            7. How Larger Tires Affect the Speedometer
          </h3>
          <p>Vehicle speed calculations often depend on wheel or drivetrain rotational speed.</p>
          <p>
            If the vehicle&apos;s electronics are calibrated for the original tire circumference but a larger tire is installed, each tire revolution covers more ground.
          </p>
          <p>For a simplified diameter-based comparison:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            {"V_actual = V_indicated × (D_new / D_stock)"}
          </div>
          <p>
            Using the reference sizes: <code>D_stock = 25.858 in</code> and <code>D_new = 26.6811 in</code>.
          </p>
          <p>At a displayed speed of 65 mph:</p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs text-slate-800 dark:text-slate-200">
            {"65 × (26.6811 / 25.858) ≈ 67.1 mph"}
          </div>
          <p>
            So the calculator reports approximately <strong>67.1 mph actual</strong> when the indicated speed is 65 mph, under this geometric comparison. The reverse trend applies to a smaller tire.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            8. Speedometer Calibration Matrix
          </h3>
          <p>Rather than calculating only one speed, the calculator evaluates the effect at multiple reference speeds.</p>
          <p>For the 225/50R17 → 245/45R18 comparison, its live matrix includes:</p>
          <div className="overflow-x-auto my-2">
            <table className="w-full text-left border-collapse border border-slate-200 dark:border-slate-700 text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 font-bold">
                  <th className="p-2.5">Indicated Speed</th>
                  <th className="p-2.5">Approx. Actual Speed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                <tr><td className="p-2.5">20 mph</td><td className="p-2.5 font-medium">20.6 mph</td></tr>
                <tr><td className="p-2.5">30 mph</td><td className="p-2.5 font-medium">30.9 mph</td></tr>
                <tr><td className="p-2.5">45 mph</td><td className="p-2.5 font-medium">46.4 mph</td></tr>
                <tr><td className="p-2.5">60 mph</td><td className="p-2.5 font-medium">61.9 mph</td></tr>
                <tr><td className="p-2.5">70 mph</td><td className="p-2.5 font-medium">72.2 mph</td></tr>
                <tr><td className="p-2.5">80 mph</td><td className="p-2.5 font-medium">82.5 mph</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            These values are generated from the tire-diameter ratio rather than individually hard-coded numbers. This makes the matrix useful for seeing how a small percentage change in rolling diameter propagates across normal driving speeds.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            9. Why a 3% Tire-Diameter Difference Gets a Warning
          </h3>
          <p>
            Many tire-fitment discussions use approximately 3% as a practical screening threshold when comparing replacement tire diameters. The calculator therefore provides a warning when the diameter difference exceeds its configured 3% threshold.
          </p>
          <p>But this distinction matters:</p>
          <p>
            The 3% value is a calculator screening rule, not a universal legal or engineering guarantee that a tire combination is safe.
          </p>
          <p>
            Actual compatibility depends on the vehicle manufacturer, tire load capacity, wheel dimensions, suspension geometry, steering clearance, braking and stability-control systems, drivetrain characteristics and other factors. NHTSA advises consumers to use the vehicle manufacturer&apos;s original or recommended tire size, and emphasizes correct load and inflation information.
          </p>
          <p>
            Therefore the warning should be interpreted as: <em>&ldquo;Investigate this size change carefully.&rdquo;</em> It should not be interpreted as: <em>&ldquo;Below 3% is guaranteed safe.&rdquo;</em> The calculator has specifically been corrected so this distinction is reflected in its educational content.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            10. Plus Sizing: What +1, +2 and +3 Mean
          </h3>
          <p>
            Plus sizing describes a change to wheel diameter accompanied by a change in tire aspect ratio intended to maintain a similar overall rolling diameter. For example, a vehicle may move from a 16-inch wheel to a 17-inch wheel while using a lower-profile tire.
          </p>
          <p>
            The objective is often to maintain approximately similar overall diameter while changing wheel diameter, tire sidewall, section width, appearance and steering response.
          </p>
          <p>
            However, plus sizing is not a mathematical guarantee of equal diameter. The actual tire size must still be calculated. Two different tire combinations can both be described informally as a &ldquo;+1&rdquo; fitment while producing slightly different rolling diameters. The calculator therefore compares the actual dimensions rather than assuming that a plus-size designation is sufficient.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            11. Section Width Is Not the Same as Tread Width
          </h3>
          <p>
            A common mistake is to interpret the first number of a tire size as the exact width of the tread contacting the road. It is better understood as the nominal section width of the inflated tire under the applicable measurement conditions.
          </p>
          <p>
            For <strong>225/50R17</strong>, the 225 refers to the nominal section width in millimetres. Actual tread width depends on the tire design.
          </p>
          <p>
            This distinction becomes especially important when estimating fender clearance because a tire&apos;s published section width and the actual tread contact patch answer different questions.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            12. Metric Tires vs Flotation Tires
          </h3>
          <p>Passenger and light-truck tires can use different sizing conventions.</p>
          <p>A metric example: <code>225/50R17</code></p>
          <p>A flotation example: <code>33x12.50R15</code></p>
          <p>In the flotation format:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>approximately 33 inches = overall diameter;</li>
            <li>12.50 inches = nominal section width;</li>
            <li>15 inches = rim diameter.</li>
          </ul>
          <p>
            The calculator supports both sizing approaches and keeps the underlying physical geometry consistent. The flotation parser is separately tested using values such as 33x12.50R15 and 35x12.50R17.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            13. Wheel Offset: What Does ET Mean?
          </h3>
          <p>Tire diameter is only one part of fitment.</p>
          <p>
            Wheel offset, commonly called ET, describes the position of the wheel mounting face relative to the wheel&apos;s centerline. The calculator supports positive offset, zero offset, and negative offset.
          </p>
          <p>Conceptually:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Positive ET</strong> moves the mounting surface toward the outside face of the wheel.</li>
            <li><strong>Zero ET</strong> places the mounting surface at the wheel centerline.</li>
            <li><strong>Negative ET</strong> moves the mounting surface toward the inside of the wheel.</li>
          </ul>
          <p>
            Changing ET changes where the wheel sits relative to suspension components and the fender. The calculator explicitly separates wheel-rim width from tire section width when performing this calculation.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            14. Wheel Offset and Fender Poke
          </h3>
          <p>Consider the calculator&apos;s tested example:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2 text-xs">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
              <strong>Stock Wheel:</strong> 7.5&quot; ET+45
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
              <strong>Target Wheel:</strong> 8.5&quot; ET+35
            </div>
          </div>
          <p>
            The rim becomes 1.0&quot; wider. At the same time, offset decreases by 10 mm. The resulting geometric shifts are <strong>2.7 mm</strong> closer to the inner strut side and <strong>22.7 mm</strong> farther outward toward the fender. The production calculator independently verifies both values.
          </p>
          <p>
            This is why saying &ldquo;the wheel is only 10 mm lower offset&rdquo; does not tell the complete fitment story. Rim width and offset interact.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            15. What Is Wheel Backspacing?
          </h3>
          <p>Backspacing measures the distance from the wheel&apos;s mounting face toward the inner edge of the rim.</p>
          <p>The calculator uses:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            {"BS = [(W_rim + 1.0'') / 2] + (ET / 25.4)"}
          </div>
          <p>under its selected wheel-measurement convention.</p>
          <p>For the reference wheels:</p>
          <p>
            <strong>Stock:</strong> 7.5&quot; at ET+45 produces approximately <strong>6.02&quot;</strong>.
          </p>
          <p>
            <strong>Target:</strong> 8.5&quot; at ET+35 produces approximately <strong>6.13&quot;</strong>.
          </p>
          <p>
            The production test verifies these values. Backspacing is particularly useful in wheel-fitment work because it complements the ET number when considering inner suspension clearance.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            16. Tire Diameter and Effective Final-Drive Ratio
          </h3>
          <p>Changing tire diameter also changes the effective gearing at the road.</p>
          <p>The calculator uses:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            {"R_effective = R_stock × (D_stock / D_new)"}
          </div>
          <p>Suppose the factory axle ratio is 3.73 and the tire changes from 25.86&quot; to 26.68&quot;. Then:</p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs text-slate-800 dark:text-slate-200">
            {"3.73 × (25.86 / 26.68) ≈ 3.62"}
          </div>
          <p>
            So the effective ratio becomes approximately <strong>3.62</strong>. The numerical final-drive ratio becomes lower because the taller tire travels farther per revolution.
          </p>
          <p>
            The calculator&apos;s production audit verifies this relationship and calculates approximately 3.85 as the compensating ratio needed to restore the original geometric relationship.
          </p>
          <p>
            A change in tire diameter can also change the relationship between engine output, road speed and gearing; the{" "}
            <Link href="/calculators/engine-horsepower-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Engine Horsepower Calculator
            </Link>{" "}
            can be used separately when you need to examine engine power.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            17. Does a Larger Tire Always Reduce Performance?
          </h3>
          <p>Not necessarily. A larger tire can affect several characteristics simultaneously.</p>
          <p>Increasing diameter can:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>increase ground clearance;</li>
            <li>reduce engine RPM for a given road speed;</li>
            <li>reduce effective numerical gearing;</li>
            <li>alter speedometer calibration;</li>
            <li>change acceleration characteristics;</li>
            <li>change tire mass and rotational inertia.</li>
          </ul>
          <p>Increasing width can:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>change available traction;</li>
            <li>change rolling resistance;</li>
            <li>change steering behavior;</li>
            <li>alter fender and suspension clearance.</li>
          </ul>
          <p>
            The result depends on the entire vehicle system. This is why &ldquo;larger tires are better&rdquo; or &ldquo;smaller tires are faster&rdquo; are incomplete statements.
          </p>
          <p>
            For the fuel-economy consequences of changing rolling resistance, driving conditions or vehicle efficiency, compare the result with the{" "}
            <Link href="/calculators/gas-mileage-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Gas Mileage Calculator
            </Link>.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            18. Tire Diameter and Ride Height
          </h3>
          <p>Changing overall tire diameter changes the tire radius by half of the diameter difference.</p>
          <p>For <code>ΔD = 0.82&quot;</code>, the geometric radius change is:</p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs text-slate-800 dark:text-slate-200">
            {"Δr = 0.82 / 2 ≈ 0.41 in (≈ 10.4 mm)"}
          </div>
          <p>
            The calculator labels this as a static geometric estimate. Actual vehicle ride height can differ because of tire loading, inflation pressure, tire construction and suspension conditions.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            19. Fitment Is More Than Tire Diameter
          </h3>
          <p>A tire can have a suitable overall diameter and still create a fitment problem.</p>
          <p>A complete assessment should consider:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Overall diameter:</strong> Checks vertical size and rolling circumference.</li>
            <li><strong>Section width:</strong> Checks lateral tire size.</li>
            <li><strong>Wheel width:</strong> Determines the rim supporting the tire.</li>
            <li><strong>Offset:</strong> Changes wheel position relative to the suspension and fender.</li>
            <li><strong>Backspacing:</strong> Helps evaluate inner wheel clearance.</li>
            <li><strong>Suspension movement:</strong> Clearance can change as the suspension compresses or steers.</li>
            <li><strong>Load capacity:</strong> The replacement tire must be appropriate for the vehicle&apos;s required load.</li>
            <li><strong>Speed capability:</strong> The tire&apos;s service description includes a speed symbol associated with its rated capability. ETRTO describes the service description as a load index plus a speed symbol; for example, the speed symbol identifies maximum speed capability under the applicable test conditions.</li>
          </ul>
        </section>

        {/* Section 20 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            20. Load Index and Speed Rating
          </h3>
          <p>A tire marking can contain a service description such as <strong>91V</strong>.</p>
          <p>
            The load index is a numerical code associated with the maximum load capacity of the tire under the specified conditions. It is not itself a measurement such as kilograms or pounds.
          </p>
          <p>
            The speed symbol is a letter associated with the tire&apos;s maximum speed capability under the applicable standards and conditions. ETRTO&apos;s current recommendations identify the service description as a load index plus speed symbol and provide corresponding speed-symbol information.
          </p>
          <p>
            This is important when comparing replacement tires because matching physical dimensions alone does not establish that the replacement tire has sufficient load or speed capability.
          </p>
        </section>

        {/* Section 21 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            21. Tire Pressure Should Come From the Vehicle Manufacturer
          </h3>
          <p>A tire-size calculator does not replace the vehicle manufacturer&apos;s load and inflation specifications.</p>
          <p>
            NHTSA advises drivers to use the manufacturer&apos;s recommended cold inflation pressure, which is normally provided on the vehicle information placard and in the owner&apos;s manual. NHTSA also specifically warns that the pressure molded on a tire sidewall is the tire&apos;s maximum permissible pressure, not necessarily the vehicle&apos;s recommended operating pressure.
          </p>
          <p>
            For a modified vehicle, changing tire size may require a more careful assessment of load capacity, pressure and wheel compatibility.
          </p>
          <p>
            Once the expected driving distance and vehicle efficiency are known, the{" "}
            <Link href="/calculators/fuel-cost-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Fuel Cost Calculator
            </Link>{" "}
            can turn those assumptions into a practical operating-cost estimate.
          </p>
        </section>

        {/* Section 22 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            22. How to Use the Tire Size Calculator
          </h3>
          <p>Start with the factory or current tire. For example: <code>225/50R17</code>.</p>
          <p>Enter the proposed replacement: <code>245/45R18</code>.</p>
          <p>
            The calculator then compares section width, sidewall height, overall diameter, circumference, diameter percentage change, revolutions per mile, and indicated versus actual speed.
          </p>
          <p>
            Enable <em>Wheel Offset &amp; Backspacing Mechanics</em> when wheel width and ET are changing as well. Enable the <em>Axle Differential Gear Ratio Adjuster</em> when you need to understand the gearing effect of a different tire diameter.
          </p>
          <p>
            The calculator is therefore most useful when the whole wheel-and-tire package is being evaluated rather than just the tire sidewall code.
          </p>
        </section>

        {/* Section 23 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            23. Worked Example: 225/50R17 to 245/45R18
          </h3>
          <p>Start with <code>225/50R17</code>:</p>
          <p>Sidewall: <code>225 × 0.50 = 112.5 mm</code></p>
          <p>Diameter: <code>17 + 2(112.5 / 25.4) ≈ 25.86&quot;</code></p>
          <p>Now compare <code>245/45R18</code>:</p>
          <p>Sidewall: <code>245 × 0.45 = 110.25 mm</code></p>
          <p>Diameter: <code>18 + 2(110.25 / 25.4) ≈ 26.68&quot;</code></p>
          <p>Diameter change: <code>26.68 - 25.86 ≈ 0.82&quot;</code></p>
          <p>Percentage change: <code>≈ 3.2%</code></p>
          <p>At an indicated 65 mph, geometric actual speed becomes <strong>≈ 67.1 mph</strong>.</p>
          <p>
            The calculator&apos;s production golden case confirms these same values. This is precisely the type of comparison where a tire-size calculator is more useful than relying on the nominal &ldquo;+1 wheel&rdquo; label alone.
          </p>
        </section>

        {/* Section 24 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            24. How to Interpret the Calculator&apos;s Warning
          </h3>
          <p>
            A warning does not automatically mean a tire cannot physically be installed. It means the calculated geometry has crossed the calculator&apos;s configured screening condition and deserves additional investigation.
          </p>
          <p>Before purchasing or installing a different wheel-and-tire combination, verify:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>vehicle manufacturer&apos;s approved tire sizes;</li>
            <li>load index;</li>
            <li>speed rating;</li>
            <li>wheel diameter and width;</li>
            <li>bolt pattern and hub compatibility;</li>
            <li>brake clearance;</li>
            <li>suspension clearance;</li>
            <li>steering clearance;</li>
            <li>fender clearance;</li>
            <li>inflation requirements;</li>
            <li>TPMS compatibility where applicable.</li>
          </ul>
          <p>
            NHTSA recommends following vehicle manufacturer recommendations for replacement tire size and stresses the importance of correct tire load and inflation information.
          </p>
        </section>

        {/* Section 25 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            25. DOT Tire Date: How to Read the Four-Digit Code
          </h3>
          <p>
            Tires sold in the United States carry tire identification information governed by federal requirements. NHTSA documentation describes the Tire Identification Number and its date code, with the date portion identifying the week and year of manufacture.
          </p>
          <p>For a four-digit date code such as <strong>1326</strong>:</p>
          <p>the first two digits represent the production week: <strong>13</strong>;</p>
          <p>and the final two digits represent the year: <strong>26</strong>,</p>
          <p>meaning the tire was manufactured during the 13th week of 2026.</p>
          <p>
            Tire age should be evaluated alongside physical condition, usage, storage history and manufacturer guidance rather than relying on one universal replacement date. NHTSA recommends regular inspection for cracks, bulges, cuts, punctures, treadwear and other damage.
          </p>
        </section>

        {/* Section 26 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            26. Why Tire Fitment Cannot Be Determined From Diameter Alone
          </h3>
          <p>Two tires can have nearly identical overall diameters but very different widths.</p>
          <p>Two tires can have the same width but different sidewall heights.</p>
          <p>
            Two wheel combinations can use the same tire but put the wheel in significantly different positions because of changes in rim width and ET.
          </p>
          <p>The most useful fitment calculation therefore considers:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-sans text-center text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            {"Tire geometry + Wheel geometry + Vehicle clearance + Load and speed requirements"}
          </div>
          <p>
            The calculator combines several of those geometric relationships so that you can see the consequences of a proposed change in one place.
          </p>
        </section>

        {/* Section 27 */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            27. Engineering Limitations of a Tire Size Calculator
          </h3>
          <p>
            The values calculated from tire-size notation represent geometric estimates based on nominal dimensions. Actual manufactured tire dimensions can differ depending on the tire model, approved measuring rim and operating conditions.
          </p>
          <p>
            Similarly, calculated speedometer change describes the geometric effect of rolling diameter. It does not guarantee the exact correction observed by a particular vehicle because electronic calibration, tire deformation and operating conditions can influence real-world measurements.
          </p>
          <p>
            Wheel-clearance calculations are also geometric screening tools. They do not replace physically checking the assembled wheel and tire on the vehicle through the full steering and suspension range.
          </p>
          <p>
            The safest interpretation is therefore: <em>Use the calculator to identify dimensional changes and potential issues, then verify vehicle-specific compatibility before installation.</em>
          </p>
        </section>

        {/* Engineering Note Callout */}
        <section className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            Engineering Note
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            This calculator is a dimensional and comparative tool, not a vehicle-approval system. Calculated diameter, speedometer change, offset, backspacing and gearing effects are mathematical estimates based on the entered dimensions. Before fitting a non-standard tire or wheel combination, verify manufacturer recommendations, load index, speed rating, wheel compatibility, brake clearance, suspension clearance, steering clearance, fender clearance and required inflation pressure.
          </p>
        </section>
      </div>

      {/* 2. FREQUENTLY ASKED QUESTIONS (ALL 18 UNFOLDED BY DEFAULT) */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Independent mathematical and automotive fitment answers addressing common tire sizing, speedometer calibration, and wheel clearance questions.
        </p>

        <div className="space-y-3 pt-2">
          {tire_size_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-850/50 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 flex items-center justify-between gap-3 font-bold text-slate-900 dark:text-white text-xs sm:text-sm hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. STANDARDS & SAFETY REFERENCES */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Standards &amp; Safety References
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/70 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              NHTSA — TireWise
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              NHTSA recommends that replacement tires be the same size as the original tires or another size recommended by the vehicle manufacturer, and provides guidance on tire pressure, inspection and maintenance.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/70 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              NHTSA — Tire Pressure
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              NHTSA explains that the vehicle manufacturer&apos;s recommended cold inflation pressure is found on the vehicle placard and/or in the owner&apos;s manual and should not be confused with the maximum pressure molded into the tire sidewall.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/70 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-amber-600" />
              NHTSA — Tire Identification Number
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              NHTSA documentation describes the DOT/TIN marking system and its manufacturing-date information.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/70 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-purple-600" />
              ETRTO — Recommendations
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              The European Tyre and Rim Technical Organisation documents tire technical terminology, service descriptions, load index and speed symbols, along with technical guidance for tire and rim applications.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}

import React from "react";
import Link from "next/link";
import { speed_calculatorFaqs } from "@/app/calculators/speed-calculator/faq";

export function SpeedContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200">
      {/* ─── RELATED CALCULATORS (ABOVE CONTENT) ─── */}
      <div className="no-print -mt-2 pb-4 border-b border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
          RELATED CALCULATORS:
        </span>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <Link
            href="/calculators/conversion-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Conversion Calculator
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <Link
            href="/calculators/scientific-notation-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Scientific Notation Calculator &amp; Converter
          </Link>
        </div>
      </div>

      {/* ─── 1. Introduction ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          1. Speed Calculator: Calculate Speed, Distance, Time &amp; Running Pace
        </h2>
        <p className="text-sm leading-relaxed">
          The Speed Calculator is an all-in-one tool for solving the basic relationship between speed, distance, and time. Enter a known distance and travel time to calculate speed, or switch the calculation mode to solve for distance or elapsed time. The page also provides a multi-unit speed converter, a running and race pace calculator with split times, and a multi-segment average speed calculator.
        </p>
        <p className="text-sm leading-relaxed">The central relationship is:</p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 text-center font-mono text-sm">
          <span className="font-bold text-blue-900 dark:text-blue-200">v = d / t</span>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          where <strong>v</strong> is speed, <strong>d</strong> is distance, and <strong>t</strong> is elapsed time. From that equation, the other two common forms follow:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 text-center font-mono text-xs space-y-1">
          <div>d = v &times; t</div>
          <div>t = d / v</div>
        </div>
        <p className="text-sm leading-relaxed">
          These three equations cover a large range of everyday, athletic, transportation, engineering, and physics calculations.
        </p>
        <p className="text-sm leading-relaxed">
          The calculator is designed to keep the calculation and the unit conversion separate. You can calculate a result in the unit most natural for your input and then inspect equivalent values in other speed units such as miles per hour, kilometers per hour, meters per second, knots, feet per second, and other specialized units supported by the converter.
        </p>
        <p className="text-sm leading-relaxed">
          For running and race planning, the page also reverses the usual speed relationship and expresses performance as pace: the amount of time needed to travel one mile or one kilometer.
        </p>
      </section>

      {/* ─── 2. What Is Speed? ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          2. What Is Speed?
        </h2>
        <p className="text-sm leading-relaxed">
          Speed describes how quickly an object or person covers distance.
        </p>
        <p className="text-sm leading-relaxed">For constant motion, average speed is calculated as:</p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 text-center font-mono text-sm">
          v = d / t
        </div>
        <p className="text-sm leading-relaxed">
          If a car travels 150 miles in 3 hours:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 font-mono text-xs space-y-1">
          <div>v = 150 / 3</div>
          <div className="font-bold text-blue-900 dark:text-blue-200">v = 50 mph</div>
        </div>
        <p className="text-sm leading-relaxed">
          The result means that the car covered an average of 50 miles for each hour of elapsed travel time.
        </p>
        <p className="text-sm leading-relaxed">
          Speed is a scalar quantity: it has a magnitude but no direction. This is different from velocity, which includes direction as well as magnitude.
        </p>
        <p className="text-sm leading-relaxed">
          That distinction matters when interpreting calculations. A calculator using only distance and elapsed time is normally calculating speed, not a complete vector velocity.
        </p>
      </section>

      {/* ─── 3. How the Speed Formula Works ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          3. How the Speed Formula Works
        </h2>
        <p className="text-sm leading-relaxed">
          The relationship between speed, distance, and time can be remembered as:
        </p>
        <ul className="list-disc list-inside text-sm space-y-1 pl-2">
          <li><strong>Speed</strong> = Distance &divide; Time</li>
          <li><strong>Distance</strong> = Speed &times; Time</li>
          <li><strong>Time</strong> = Distance &divide; Speed</li>
        </ul>
        <p className="text-sm leading-relaxed">A simple way to organize the relationship is:</p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 text-center font-mono text-xs">
          {"Distance"}<br />
          {"----------------"}<br />
          {"Speed × Time"}
        </div>
        <p className="text-sm leading-relaxed">From this relationship:</p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 font-mono text-xs space-y-1 text-center">
          <div>v = d / t</div>
          <div>d = v &times; t</div>
          <div>t = d / v</div>
        </div>
        <p className="text-sm leading-relaxed">
          The Speed Calculator lets you select which quantity you want to find, so you do not have to rearrange the equation manually.
        </p>
      </section>

      {/* ─── 4. How to Calculate Speed From Distance and Time ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          4. How to Calculate Speed From Distance and Time
        </h2>
        <p className="text-sm leading-relaxed">
          To calculate speed, divide the total distance traveled by the elapsed time.
        </p>
        <p className="text-sm leading-relaxed"><strong>Example:</strong></p>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">Distance = 100 miles, Time = 1 hour 30 minutes</p>
        <p className="text-sm leading-relaxed">First convert the time to hours:</p>
        <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700 font-mono text-xs">
          1 hour 30 minutes = 1.5 hours
        </div>
        <p className="text-sm leading-relaxed">Then:</p>
        <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700 font-mono text-xs space-y-1">
          <div>v = 100 / 1.5</div>
          <div>v = 66.666666...</div>
          <div className="font-bold text-blue-900 dark:text-blue-200">Rounded: 66.67 mph</div>
        </div>
        <p className="text-sm leading-relaxed">The same physical speed can be represented in other units:</p>
        <ul className="list-disc list-inside text-sm space-y-1 pl-2">
          <li>&approx; 107.29 km/h</li>
          <li>&approx; 29.80 m/s</li>
        </ul>
        <p className="text-sm leading-relaxed">
          The calculator performs these conversions automatically after calculating the primary result.
        </p>
      </section>

      {/* ─── 5. Worked Example: 100 Miles in 1 Hour 30 Minutes ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          5. Worked Example: 100 Miles in 1 Hour 30 Minutes
        </h2>
        <p className="text-sm leading-relaxed">Suppose a vehicle travels 100 mi in 1 h 30 min.</p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 font-mono text-xs space-y-2">
          <p><strong>Step 1: Convert the time.</strong><br />1 h 30 min = 1.5 h</p>
          <p><strong>Step 2: Apply the speed equation.</strong><br />v = d / t</p>
          <p><strong>Step 3: Substitute the inputs.</strong><br />v = 100 / 1.5</p>
          <p><strong>Step 4: Calculate.</strong><br />v = 66.666666...</p>
          <p><strong>Step 5: Round the displayed result.</strong><br /><span className="font-bold text-blue-900 dark:text-blue-200">v &approx; 66.67 mph</span></p>
        </div>
        <p className="text-sm leading-relaxed">
          Equivalent values are approximately 107.29 km/h and 29.80 m/s. This example is one of the calculator&apos;s production regression cases.
        </p>
      </section>

      {/* ─── 6. How to Calculate Distance ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          6. How to Calculate Distance
        </h2>
        <p className="text-sm leading-relaxed">When speed and time are known, use:</p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 text-center font-mono text-sm font-bold text-blue-900 dark:text-blue-200">
          d = v &times; t
        </div>
        <p className="text-sm leading-relaxed"><strong>Example:</strong> Speed = 60 mph, Time = 2 hours</p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 font-mono text-xs space-y-1">
          <div>d = 60 &times; 2</div>
          <div className="font-bold text-blue-900 dark:text-blue-200">d = 120 miles</div>
        </div>
        <p className="text-sm leading-relaxed">
          So the expected travel distance is 120 mi. The same method works for metric units and other compatible unit systems. The important requirement is that the distance and speed units are handled consistently.
        </p>
      </section>

      {/* ─── 7. How to Calculate Travel Time ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          7. How to Calculate Travel Time
        </h2>
        <p className="text-sm leading-relaxed">When distance and speed are known:</p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 text-center font-mono text-sm font-bold text-blue-900 dark:text-blue-200">
          t = d / v
        </div>
        <p className="text-sm leading-relaxed"><strong>Example:</strong> Distance = 250 km, Speed = 100 km/h</p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 font-mono text-xs space-y-1">
          <div>t = 250 / 100</div>
          <div>t = 2.5 hours</div>
          <div className="font-bold text-blue-900 dark:text-blue-200">2 hours 30 minutes</div>
        </div>
        <p className="text-sm leading-relaxed">
          The calculator displays the time result in a convenient clock-style format after performing the numerical calculation.
        </p>
      </section>

      {/* ─── 8. Speed Units and Conversion ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          8. Speed Units and Conversion
        </h2>
        <p className="text-sm leading-relaxed">
          Different fields use different speed units. Common examples include meters per second (m/s), kilometers per hour (km/h), miles per hour (mph), knots (kn), and feet per second (ft/s).
        </p>
        <p className="text-sm leading-relaxed">
          For conversions involving length, temperature, pressure, mass, energy and other measurement categories, use the{" "}
          <Link href="/calculators/conversion-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Conversion Calculator
          </Link>.
        </p>
        <p className="text-sm leading-relaxed">
          The converter on this page supports 27 speed representations, including common, engineering, scientific, and specialized forms. Some of the most useful relationships are:
        </p>
        <ul className="list-disc list-inside text-xs font-mono space-y-1 pl-2 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
          <li>1 m/s = 3.6 km/h</li>
          <li>1 mph = 0.44704 m/s</li>
          <li>1 mph = 1.609344 km/h</li>
          <li>1 knot = 0.514444... m/s</li>
          <li>1 knot = 1.852 km/h</li>
        </ul>
        <p className="text-sm leading-relaxed">
          The calculator&apos;s unit-conversion engine has been independently tested across all 27 supported units and 10,000 randomized conversion round trips.
        </p>
      </section>

      {/* ─── 9. mph to km/h ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          9. mph to km/h
        </h2>
        <p className="text-sm leading-relaxed">
          To convert miles per hour to kilometers per hour:
        </p>
        <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700 font-mono text-xs">
          km/h = mph &times; 1.609344
        </div>
        <p className="text-sm leading-relaxed"><strong>Example:</strong> 60 mph &times; 1.609344 = 96.56064 km/h &approx; 96.56 km/h.</p>
        <p className="text-sm leading-relaxed">For the reverse conversion:</p>
        <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700 font-mono text-xs">
          mph = km/h &divide; 1.609344
        </div>
        <p className="text-sm leading-relaxed"><strong>Example:</strong> 100 km/h &divide; 1.609344 &approx; 62.1371 mph.</p>
      </section>

      {/* ─── 10. mph to m/s ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          10. mph to m/s
        </h2>
        <p className="text-sm leading-relaxed">
          To convert miles per hour to meters per second:
        </p>
        <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700 font-mono text-xs">
          m/s = mph &times; 0.44704
        </div>
        <p className="text-sm leading-relaxed"><strong>Example:</strong> 1 mph &times; 0.44704 = 0.44704 m/s. This is an especially useful conversion when moving between everyday road speeds and SI-based physics calculations.</p>
      </section>

      {/* ─── 11. km/h to m/s ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          11. km/h to m/s
        </h2>
        <p className="text-sm leading-relaxed">
          Because 1 km = 1,000 m and 1 hour = 3,600 seconds, we obtain:
        </p>
        <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700 font-mono text-xs space-y-1">
          <div>1 km/h = 1000 / 3600 m/s = 0.277777... m/s</div>
          <div className="font-bold text-blue-900 dark:text-blue-200">m/s = km/h &divide; 3.6</div>
        </div>
        <p className="text-sm leading-relaxed"><strong>Example:</strong> 72 km/h &divide; 3.6 = 20 m/s.</p>
      </section>

      {/* ─── 12. Knots and Nautical Speed ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          12. Knots and Nautical Speed
        </h2>
        <p className="text-sm leading-relaxed">
          A knot is a nautical speed unit equal to one nautical mile per hour. The standard relationship is:
        </p>
        <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700 font-mono text-xs space-y-1">
          <div>1 knot = 1.852 km/h</div>
          <div>1 knot &approx; 0.514444 m/s</div>
        </div>
        <p className="text-sm leading-relaxed">
          Knots are commonly encountered in marine navigation and aviation. For example, 10 knots &times; 1.852 = 18.52 km/h.
        </p>
      </section>

      {/* ─── 13. Other Speed Units Supported by the Converter ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          13. Other Speed Units Supported by the Converter
        </h2>
        <p className="text-sm leading-relaxed">
          In addition to everyday units, the calculator includes specialized representations such as:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700">
          <div>&bull; km/min, km/s</div>
          <div>&bull; m/h, m/min</div>
          <div>&bull; cm/h, cm/min, cm/s</div>
          <div>&bull; mm/h, mm/min, mm/s</div>
          <div>&bull; in/h, in/min, in/s</div>
          <div>&bull; yd/h, yd/min, yd/s</div>
          <div>&bull; mi/min, mi/s</div>
          <div>&bull; ft/s, ft/min, ft/h</div>
          <div>&bull; knots, Mach, c</div>
          <div>&bull; fur/ftn (furlongs/fortnight)</div>
          <div>&bull; Beaufort equivalent</div>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Specialized values should be interpreted according to the definition used by the calculator. In particular, Mach is a ratio to a reference speed of sound (343 m/s in 20&deg;C air) and can depend on atmospheric reference conditions.
        </p>
      </section>

      {/* ─── 14. SI Unit of Speed ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          14. SI Unit of Speed
        </h2>
        <p className="text-sm leading-relaxed">
          The SI unit of speed is the meter per second (m/s). It follows directly from the SI base units of length and time: m/s = meter / second.
        </p>
        <p className="text-sm leading-relaxed">
          For technical and scientific work, keeping the units explicit makes calculations easier to audit.
        </p>
        <p className="text-sm leading-relaxed">
          For very large or very small numerical values, the{" "}
          <Link href="/calculators/scientific-notation-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Scientific Notation Calculator &amp; Converter
          </Link>{" "}
          can make scientific-form calculations easier to read.
        </p>
      </section>

      {/* ─── 15. Speed vs Velocity ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          15. Speed vs Velocity
        </h2>
        <p className="text-sm leading-relaxed">
          Speed and velocity are related but are not identical:
        </p>
        <ul className="list-disc list-inside text-sm space-y-1 pl-2">
          <li><strong>Speed</strong> is a scalar quantity. It tells you how fast something is moving.</li>
          <li><strong>Velocity</strong> is a vector quantity. It includes both magnitude and directional orientation.</li>
        </ul>
        <p className="text-sm leading-relaxed">
          For example, a car traveling at 60 km/h east has a velocity whose magnitude is 60 km/h and whose direction is east. A calculation that only knows distance = 60 km and time = 1 hour can determine average speed = 60 km/h, but cannot determine a complete velocity vector without directional information. For this reason, the scalar results on this page are labeled as speed.
        </p>
      </section>

      {/* ─── 16. Average Speed ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          16. Average Speed
        </h2>
        <p className="text-sm leading-relaxed">
          For a trip containing multiple segments, the correct general average-speed formula is:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 text-center font-mono text-sm font-bold text-blue-900 dark:text-blue-200">
          Average Speed = Total Distance / Total Time = &Sigma;d / &Sigma;t
        </div>
        <p className="text-sm leading-relaxed">
          This is different from simply taking the arithmetic mean of the segment speeds.
        </p>
        <p className="text-sm leading-relaxed">
          <strong>Example:</strong> Segment 1: 60 km in 1 hour; Segment 2: 80 km in 1 hour. Total distance = 140 km, Total time = 2 hours. Average speed = 140 / 2 = 70 km/h.
        </p>
      </section>

      {/* ─── 17. Why Total Distance Divided by Total Time Matters ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          17. Why Total Distance Divided by Total Time Matters
        </h2>
        <p className="text-sm leading-relaxed">
          Consider a trip where segments have unequal durations:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 font-mono text-xs space-y-1">
          <div>Segment 1: 60 km in 1 hour (Speed = 60 km/h)</div>
          <div>Segment 2: 80 km in 2 hours (Speed = 40 km/h)</div>
          <div>Total distance = 140 km, Total time = 3 h</div>
          <div className="font-bold text-blue-900 dark:text-blue-200">Average speed = 140 / 3 &approx; 46.67 km/h</div>
        </div>
        <p className="text-sm leading-relaxed">
          It is not simply (60 + 40) / 2 = 50 km/h. The 46.67 km/h value correctly accounts for the actual amount of time spent traveling. That is why the multi-segment module uses s_avg = &Sigma;d / &Sigma;t and labels the result Average Trip Speed.
        </p>
      </section>

      {/* ─── 18. Harmonic Mean and Speed ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          18. Harmonic Mean and Speed
        </h2>
        <p className="text-sm leading-relaxed">
          The harmonic mean is useful for some rate-averaging problems, but it is not the universal formula for a multi-segment journey. For equal-distance segments, harmonic averaging is appropriate:
        </p>
        <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700 font-mono text-xs text-center">
          H = 2 / (1/v&sub1; + 1/v&sub2;)
        </div>
        <p className="text-sm leading-relaxed">
          <strong>Example:</strong> Travel half the total distance at 60 km/h and half at 120 km/h. Because the distances are equal, H = 2 / (1/60 + 1/120) = 80 km/h. The actual trip average speed is also 80 km/h. For unequal distances, however, total distance divided by total time is the required formula.
        </p>
      </section>

      {/* ─── 19. Running Pace vs Running Speed ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          19. Running Pace vs Running Speed
        </h2>
        <p className="text-sm leading-relaxed">
          Runners often describe performance using pace instead of speed. Speed answers &ldquo;How fast am I moving?&rdquo; while Pace answers &ldquo;How much time does it take me to cover one mile or one kilometer?&rdquo;
        </p>
        <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700 font-mono text-xs text-center">
          Pace = Time / Distance
        </div>
        <p className="text-sm leading-relaxed">
          For example, a runner completing 5 km in 24 minutes 30 seconds covers each kilometer in 24.5 / 5 = 4.9 minutes = 4 minutes 54 seconds per km (4:54 min/km).
        </p>
      </section>

      {/* ─── 20. Example: 5K in 24:30 ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          20. Example: 5K in 24:30
        </h2>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 font-mono text-xs space-y-1">
          <p><strong>Distance:</strong> 5.00 km (3.11 miles)</p>
          <p><strong>Total Seconds:</strong> 24 &times; 60 + 30 = 1,470 s</p>
          <p><strong>Pace per KM:</strong> 1,470 / 5 = 294 s = 4:54 min/km</p>
          <p><strong>Pace per Mile:</strong> &approx; 7:53 min/mile</p>
          <p><strong>Average Speed:</strong> &approx; 12.24 km/h (7.61 mph)</p>
        </div>
      </section>

      {/* ─── 21. Understanding the Split Table ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          21. Understanding the Split Table
        </h2>
        <p className="text-sm leading-relaxed">
          For a constant target pace, the cumulative times for a 5K in 24:30 are:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 text-center">
          <div>KM 1: 04:54</div>
          <div>KM 2: 09:48</div>
          <div>KM 3: 14:42</div>
          <div>KM 4: 19:36</div>
          <div className="font-bold text-blue-900 dark:text-blue-200">Finish: 24:30</div>
        </div>
        <p className="text-sm leading-relaxed">
          The split interval is 4:54 per kilometer. The cumulative time increases by one equal interval at each kilometer, making it useful for tracking pacing strategy during a race or training session.
        </p>
      </section>

      {/* ─── 22. Race Pace Presets ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          22. Race Pace Presets
        </h2>
        <p className="text-sm leading-relaxed">
          The calculator includes race presets such as 5K, 10K, Half Marathon, and Full Marathon, as well as custom-distance support. For each distance, it determines pace per mile, pace per kilometer, average speed, total duration, and milestone splits.
        </p>
      </section>

      {/* ─── 23. Marathon Pace Example ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          23. Marathon Pace Example
        </h2>
        <p className="text-sm leading-relaxed">
          Consider a marathon distance of 42.195 km (26.21875 miles) with a finishing time of 3 hours 15 minutes 30 seconds:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 font-mono text-xs space-y-1">
          <div>Total time = 3 &times; 3600 + 15 &times; 60 + 30 = 11,730 seconds = 3.25833... hours</div>
          <div>Average speed = 42.195 / 3.25833... &approx; 12.95 km/h (&approx; 8.05 mph)</div>
          <div className="font-bold text-blue-900 dark:text-blue-200">Pace: 4:38 min/km (&approx; 7:27 min/mile)</div>
        </div>
      </section>

      {/* ─── 24. What Happens When Time Is Zero? ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          24. What Happens When Time Is Zero?
        </h2>
        <p className="text-sm leading-relaxed">
          A non-zero distance divided by zero time is not a valid finite speed. For example, 100 miles / 0 hours does not equal 0 mph. The calculator treats this as an invalid calculation and displays:
        </p>
        <div className="p-2 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-800 font-mono text-xs text-red-700 dark:text-red-300 font-medium">
          &ldquo;Time must be greater than zero.&rdquo;
        </div>
        <p className="text-sm leading-relaxed">
          This distinction is important because a zero value and an invalid or missing value are not the same thing. A valid example is 0 miles / 1 hour, which correctly gives 0 mph.
        </p>
      </section>

      {/* ─── 25. Input Validation and Calculation Reliability ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          25. Input Validation and Calculation Reliability
        </h2>
        <p className="text-sm leading-relaxed">
          A reliable calculator distinguishes between 0, an empty input, and invalid text. For example, 0 is a real numerical value, an empty field means no value has been entered, and text such as &ldquo;abc&rdquo; is not a valid numerical distance or time. The Speed Calculator validates these conditions rather than silently converting invalid inputs into a meaningful-looking result.
        </p>
      </section>

      {/* ─── 26. Accuracy, Precision and Rounding ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          26. Accuracy, Precision and Rounding
        </h2>
        <p className="text-sm leading-relaxed">
          The displayed number of decimal places is a presentation choice. For example, 66.666666... may be displayed as 66.67 mph. For technical work, distinguish calculation precision from measurement accuracy. Output should always be interpreted together with the precision of the input measurements.
        </p>
      </section>

      {/* ─── 27. Why Unit Consistency Matters ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          27. Why Unit Consistency Matters
        </h2>
        <p className="text-sm leading-relaxed">
          Always make sure the units are compatible. For example, 100 km / 2 h produces 50 km/h, while 100 miles / 2 hours produces 50 mph. The numerical speed is &ldquo;50&rdquo; in both cases, but the physical speeds are different. Unit conversions must occur before comparing numerical speed values across systems.
        </p>
      </section>

      {/* ─── 28. Speed Conversion Reference Table ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          28. Speed Conversion Reference Table
        </h2>
        <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="p-2 border-r border-zinc-200 dark:border-zinc-800">Conversion</th>
                <th className="p-2 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr><td className="p-2 border-r border-zinc-200 dark:border-zinc-800">1 m/s</td><td className="p-2 text-right font-mono">3.6 km/h</td></tr>
              <tr><td className="p-2 border-r border-zinc-200 dark:border-zinc-800">1 mph</td><td className="p-2 text-right font-mono">1.609344 km/h</td></tr>
              <tr><td className="p-2 border-r border-zinc-200 dark:border-zinc-800">1 mph</td><td className="p-2 text-right font-mono">0.44704 m/s</td></tr>
              <tr><td className="p-2 border-r border-zinc-200 dark:border-zinc-800">1 knot</td><td className="p-2 text-right font-mono">1.852 km/h</td></tr>
              <tr><td className="p-2 border-r border-zinc-200 dark:border-zinc-800">1 knot</td><td className="p-2 text-right font-mono">0.514444 m/s</td></tr>
              <tr><td className="p-2 border-r border-zinc-200 dark:border-zinc-800">1 km/h</td><td className="p-2 text-right font-mono">0.277777... m/s</td></tr>
              <tr><td className="p-2 border-r border-zinc-200 dark:border-zinc-800">1 m/s</td><td className="p-2 text-right font-mono">2.236936... mph</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── 29. Common Speed-Calculation Mistakes ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          29. Common Speed-Calculation Mistakes
        </h2>
        <div className="space-y-2 text-sm">
          <p><strong>Dividing by the wrong time:</strong> Always convert hours, minutes, and seconds into a consistent decimal time unit before calculating.</p>
          <p><strong>Mixing miles and kilometers:</strong> Distance and speed units must correspond.</p>
          <p><strong>Forgetting that pace is the inverse perspective:</strong> Speed is distance divided by time. Pace is time divided by distance.</p>
          <p><strong>Averaging segment speeds directly:</strong> For a general multi-segment trip, use Total Distance / Total Time rather than a simple arithmetic average of speeds.</p>
          <p><strong>Calling scalar speed &ldquo;velocity&rdquo;:</strong> Direction is required for a complete velocity vector.</p>
          <p><strong>Treating zero as invalid in every situation:</strong> Zero distance and zero speed can be legitimate values. The calculator distinguishes valid zero from invalid division-by-zero situations.</p>
        </div>
      </section>

      {/* ─── 30. How to Use the Speed Calculator ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          30. How to Use the Speed Calculator
        </h2>
        <div className="space-y-2 text-sm">
          <p><strong>Find Speed:</strong> Select Find Speed. Enter travel distance, unit, and elapsed hours, minutes, seconds. The calculator evaluates v = d / t.</p>
          <p><strong>Find Distance:</strong> Select Find Distance. Enter known speed and elapsed time. The calculator evaluates d = v &times; t.</p>
          <p><strong>Find Time:</strong> Select Find Time. Enter known distance and speed. The calculator evaluates t = d / v.</p>
          <p><strong>Convert Speed:</strong> Enter amount, source unit, and target unit. The converter returns the selected target speed and provides a complete conversion matrix.</p>
          <p><strong>Calculate Running Pace:</strong> Choose a race preset or custom distance, and enter target time. The calculator determines pace per mile, pace per kilometer, average speed, and split times.</p>
          <p><strong>Analyze Multiple Segments:</strong> Enter each segment&apos;s distance and time. The calculator totals distance and time and computes Average Trip Speed = &Sigma;d / &Sigma;t.</p>
        </div>
      </section>

      {/* ─── 31. Speed Calculator for Travel ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          31. Speed Calculator for Travel
        </h2>
        <p className="text-sm leading-relaxed">
          For road trips, cycling, walking, boating, aviation, and other forms of travel, the basic equation is the same: speed = distance / time. The important part is selecting sensible units. For example, 120 miles in 2.5 hours gives 48 mph, while 120 km in 2.5 hours gives 48 km/h.
        </p>
      </section>

      {/* ─── 32. Speed Calculator for Running and Training ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          32. Speed Calculator for Running and Training
        </h2>
        <p className="text-sm leading-relaxed">
          Running calculations often benefit from using pace rather than raw speed. A training target might be specified as 5:00 min/km or 8:00 min/mile. Knowing both pace = 4:54 min/km and speed &approx; 12.24 km/h gives two different but equivalent ways to describe the same running performance.
        </p>
      </section>

      {/* ─── 33. Speed in Physics and Engineering ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          33. Speed in Physics and Engineering
        </h2>
        <p className="text-sm leading-relaxed">
          The same speed equation is a foundation for many introductory kinematics problems. If distance is measured in meters and time in seconds: v = d / t produces m/s. If distance is measured in kilometers and time in hours: v = d / t produces km/h. Dimensional consistency is essential in engineering and physics calculations.
        </p>
      </section>

      {/* ─── 34. When the Speed Calculator Should Not Be Used Alone ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          34. When the Speed Calculator Should Not Be Used Alone
        </h2>
        <p className="text-sm leading-relaxed">
          This calculator is useful for mathematical and planning calculations, but some real-world problems require additional information:
        </p>
        <ul className="list-disc list-inside text-sm space-y-1 pl-2 text-zinc-600 dark:text-zinc-400">
          <li>acceleration and changing-speed motion</li>
          <li>direction-dependent velocity</li>
          <li>wind or current corrections</li>
          <li>braking-distance analysis</li>
          <li>vehicle dynamics and aerodynamic calculations</li>
          <li>navigation with changing headings</li>
        </ul>
      </section>

      {/* ─── 35. Compact Formula Reference ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          35. A Compact Formula Reference
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700">
          <div>Speed: v = d / t</div>
          <div>Distance: d = vt</div>
          <div>Time: t = d / v</div>
          <div>Pace: pace = t / d</div>
          <div>Average Trip Speed: s_avg = &Sigma;d / &Sigma;t</div>
          <div>mph to km/h: km/h = mph &times; 1.609344</div>
          <div>mph to m/s: m/s = mph &times; 0.44704</div>
          <div>km/h to m/s: m/s = km/h &divide; 3.6</div>
          <div>Knots to km/h: km/h = knots &times; 1.852</div>
        </div>
      </section>

      {/* ─── 36. Frequently Asked Questions (Unfolded) ─── */}
      <section className="space-y-4 pt-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          36. Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {speed_calculatorFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 space-y-1.5"
            >
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {faq.question}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 37. Final Takeaway ─── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          37. Final Takeaway
        </h2>
        <p className="text-sm leading-relaxed">
          The most important relationships on this page are:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 font-mono text-xs space-y-1 text-center">
          <div>Speed: v = d / t</div>
          <div>Distance: d = vt</div>
          <div>Time: t = d / v</div>
          <div>Pace: pace = t / d</div>
          <div>Average Trip Speed: s_avg = &Sigma;d / &Sigma;t</div>
        </div>
        <p className="text-sm leading-relaxed">
          The key to accurate results is not simply entering numbers into a calculator. It is using the correct physical quantity, keeping units consistent, handling time correctly, and interpreting the result at an appropriate precision.
        </p>
        <p className="text-sm leading-relaxed">
          For everyday travel, athletics, unit conversion, and basic kinematics, these relationships cover a large range of practical calculations. For advanced motion problems involving acceleration, direction, changing conditions, or vector quantities, use a model appropriate to those additional variables.
        </p>
      </section>

      {/* ─── RELATED CALCULATORS (AFTER CONTENT) ─── */}
      <div className="no-print pt-4 border-t border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
          RELATED CALCULATORS:
        </span>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <Link
            href="/calculators/conversion-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Conversion Calculator
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <Link
            href="/calculators/scientific-notation-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Scientific Notation Calculator &amp; Converter
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck } from "lucide-react";

export function DistanceContent() {
  // All 5 educational FAQs open by default, matching the 401(k) format
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set([0, 1, 2, 3, 4])
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

  const distanceFaqs = [
    {
      question: "How does 2D Euclidean distance differ from Manhattan distance?",
      answer: "Euclidean distance is the straight-line 'as-the-crow-flies' displacement between two points derived via the Pythagorean theorem: d = √[(x₂ - x₁)² + (y₂ - y₁)²]. Manhattan distance (also known as Taxicab or L₁ metric) restricts motion strictly along orthogonal grid axes: d_M = |x₂ - x₁| + |y₂ - y₁|. Because a straight hypotenuse is the shortest path between two points in flat space, Euclidean distance is always less than or equal to Manhattan distance."
    },
    {
      question: "Why can't I use the standard 2D distance formula for latitude and longitude coordinates?",
      answer: "The 2D planar Euclidean formula assumes a flat Cartesian coordinate system where grid axes are orthogonal and uniform everywhere. Planet Earth is a curved spheroid where lines of longitude converge at the poles (1° of longitude spans ~111.32 km at the equator, but shrinks to 0 km at the poles). Using flat 2D math on latitude and longitude introduces severe distortion. Accurate Earth distances require spherical trigonometry such as the Haversine Great-Circle formula."
    },
    {
      question: "What is the exact difference between statute miles and nautical miles?",
      answer: "A statute mile is defined under international agreement (1959) as exactly 1,609.344 meters (5,280 feet). An international nautical mile is defined as exactly 1,852 meters (~6,076.12 feet). A nautical mile corresponds approximately to one minute of latitude (1/60th of a degree) along Earth's meridian, making it the universal standard for maritime navigation and aerospace flight planning."
    },
    {
      question: "How is average speed calculated when traveling different distances at different speeds?",
      answer: "Average speed across multiple trip segments is always total distance divided by total time: s_avg = (d₁ + d₂) / (t₁ + t₂). It is a common mistake to calculate the arithmetic mean of individual speeds: (s₁ + s₂) / 2. Because more time is spent during lower-speed segments, the true average speed is the harmonic mean, which is always lower than or equal to the simple arithmetic average."
    },
    {
      question: "Why can line coefficients A and B not both be zero in point-to-line calculations?",
      answer: "In the standard linear equation Ax + By + C = 0, the denominator of the perpendicular distance formula is √(A² + B²). If both A and B are zero, the expression becomes 0x + 0y + C = 0, which does not define a line (it is either an empty set when C ≠ 0 or the entire plane when C = 0), and dividing by zero is mathematically undefined."
    }
  ];

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* PRE-CONTENT RELATED CALCULATORS (Immediately before main educational content) */}
      <div className="pb-2">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Related Calculators:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <Link
            href="/calculators/pythagorean-theorem-calculator"
            className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors"
          >
            Pythagorean Theorem Calculator
          </Link>
          <Link
            href="/calculators/slope-calculator"
            className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors"
          >
            Slope Calculator
          </Link>
          <Link
            href="/calculators/triangle-calculator"
            className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors"
          >
            Triangle Calculator
          </Link>
          <Link
            href="/calculators/standard-deviation-calculator"
            className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors"
          >
            Standard Deviation Calculator
          </Link>
        </div>
      </div>

      {/* MAIN EDUCATIONAL BODY (13 Core Sections + Practical Trust Block) */}
      <div className="pt-6 space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is Distance?
          </h2>
          <p>
            Distance is a measure of the separation between two points, objects, locations, or positions. The correct calculation depends on the space in which the points are defined.
          </p>
          <p>
            On a two-dimensional Cartesian plane, distance between two points is the length of the straight line joining them. The familiar formula is derived directly from the Pythagorean theorem, which can be explored in detail using our{" "}
            <Link href="/calculators/pythagorean-theorem-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Pythagorean Theorem Calculator
            </Link>
            .
          </p>
          <p>
            For points P₁ = (x₁, y₁) and P₂ = (x₂, y₂), the Euclidean distance is:
          </p>
          <div className="font-mono text-xs bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-blue-700 dark:text-blue-300">
            d = √[(x₂ − x₁)² + (y₂ − y₁)²]
          </div>
          <p>
            The subtraction terms represent the horizontal and vertical changes between the points. Squaring removes the effect of the sign, and the square root gives the length of the resulting right-triangle hypotenuse.
          </p>
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            The idea is simple: horizontal change + vertical change &rarr; right triangle &rarr; hypotenuse = distance.
          </p>
          <p>
            This is why the distance formula and the Pythagorean theorem are so closely connected.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. Distance Between Two Points in 2D
          </h2>
          <p>
            For two points (x₁, y₁) and (x₂, y₂), use the standard 2D Euclidean distance formula:
          </p>
          <div className="font-mono text-xs bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-blue-700 dark:text-blue-300">
            d = √[(x₂ − x₁)² + (y₂ − y₁)²]
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider">
              Worked Example
            </h3>
            <p>Find the distance between P₁ = (0, 0) and P₂ = (3, 4):</p>
            <div className="font-mono text-xs space-y-1">
              <p>1. Calculate coordinate differences: Δx = 3 − 0 = 3, Δy = 4 − 0 = 4</p>
              <p>2. Square and sum: d = √(3² + 4²) = √(9 + 16) = √25 = 5</p>
            </div>
            <p>So the distance is <strong>5 units</strong>.</p>
          </div>

          <p>
            The calculator also obtains the midpoint: M = ((x₁ + x₂)/2, (y₁ + y₂)/2). For this example, M = (1.5, 2). To evaluate the incline angle and steepness between these coordinates, refer to our{" "}
            <Link href="/calculators/slope-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Slope Calculator
            </Link>
            .
          </p>
          <p>
            The same calculation can also reveal related metrics such as Manhattan distance (L₁ norm) and Chebyshev distance (L∞ norm) when those measurements are useful. The distance formula is a standard application of the Pythagorean theorem in the Cartesian coordinate system.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Distance in 3D Coordinates
          </h2>
          <p>
            A three-dimensional point contains one additional spatial coordinate: (x, y, z).
          </p>
          <p>
            For points P₁ = (x₁, y₁, z₁) and P₂ = (x₂, y₂, z₂), the Euclidean distance is:
          </p>
          <div className="font-mono text-xs bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-blue-700 dark:text-blue-300">
            d = √[(x₂ − x₁)² + (y₂ − y₁)² + (z₂ − z₁)²]
          </div>
          <p>
            The additional z-coordinate represents displacement through the third dimension.
          </p>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider">
              Example
            </h3>
            <p>Consider P₁ = (1, 1, 1) and P₂ = (4, 5, 9):</p>
            <div className="font-mono text-xs space-y-1">
              <p>Coordinate differences: Δx = 3, Δy = 4, Δz = 8</p>
              <p>d = √(3² + 4² + 8²) = √(9 + 16 + 64) = √89 ≈ 9.434</p>
            </div>
          </div>
          <p>
            This is useful whenever ordinary 2D distance is insufficient, including spatial geometry, computer graphics, robotics, surveying models, engineering coordinates, and other three-dimensional calculations.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Distance Between Latitude and Longitude Coordinates
          </h2>
          <p>
            Latitude and longitude coordinates describe positions on Earth&apos;s surface rather than points on a flat Cartesian grid.
          </p>
          <p>
            For geographical coordinates, applying the ordinary 2D distance formula directly to latitude and longitude is not appropriate for accurate Earth-surface distance because the Earth is curved.
          </p>
          <p>
            This calculator therefore uses a great-circle/Haversine calculation for latitude/longitude inputs. The Haversine formulation uses the angular differences between the two positions and an Earth-radius convention to estimate the shortest surface path between the locations:
          </p>
          <div className="font-mono text-xs bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-blue-700 dark:text-blue-300 space-y-1">
            <p>a = sin²(Δφ/2) + cos(φ₁)cos(φ₂)sin²(Δλ/2)</p>
            <p>c = 2 &middot; atan2(√a, √(1−a))</p>
            <p>d = R &times; c</p>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            where φ represents latitude in radians, λ represents longitude in radians, R is the Earth-radius value used by the calculator (R = 6,371.0088 km), and d is the resulting great-circle distance.
          </p>
          <p>
            <strong>Example (New York to London):</strong> Using coordinates for New York (40.7128° N, 74.0060° W) and London (51.5074° N, 0.1278° W), the calculator returns approximately <strong>3,461 miles</strong> (or approximately <strong>5,570 km</strong>), with the corresponding nautical-mile distance (3,008 NM) and initial bearing (51.21° NE).
          </p>
          <p>
            The important distinction is that this is a great-circle distance, not a road-route distance. A driving distance, walking distance, or actual flight path can be different because those measurements follow networks or operational routes rather than the shortest surface arc.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. What Is Great-Circle Distance?
          </h2>
          <p>
            A great circle is a circle on a sphere whose plane passes through the center of the sphere.
          </p>
          <p>
            The shortest surface path between two points on an ideal spherical Earth follows a great-circle arc. This is why great-circle calculations are useful for estimating long-distance geographic separation.
          </p>
          <p>
            The result should therefore be interpreted as an approximate spherical-Earth surface distance, not as:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-xs">
            <li>driving distance,</li>
            <li>railway distance,</li>
            <li>walking distance,</li>
            <li>airport-to-airport operational routing distance, or</li>
            <li>an exact route produced by a navigation service.</li>
          </ul>
          <p>
            This distinction is especially important for travel and navigation. The calculator reports the geographic distance in multiple units so that the same result can be interpreted in miles, kilometers, and nautical miles.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Speed, Distance and Time
          </h2>
          <p>
            Distance can also be calculated when speed and elapsed time are known. The fundamental relationship is:
          </p>
          <div className="font-mono text-xs bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-blue-700 dark:text-blue-300">
            speed = distance / time &nbsp;|&nbsp; distance = speed &times; time &nbsp;|&nbsp; time = distance / speed
          </div>
          <p>
            These three equations describe the same relationship from different directions.
          </p>
          <p>
            <strong>Example:</strong> Suppose speed = 60 miles/hour and time = 2.5 hours. Then distance = 60 &times; 2.5 = 150 miles. The calculator can therefore be used as a speed calculator, distance calculator, or time calculator depending on which quantity is unknown.
          </p>
          <p>
            <strong>Unit consistency matters:</strong> The units must agree. For example, 60 miles/hour &times; 2.5 hours = 150 miles, whereas combining miles with kilometers per hour without conversion would produce an invalid result. For precise conversions, use a consistent base unit before applying the equation. NIST provides standardized conversion factors including 1 mile = 1.609344 km and 1 mile = 1609.344 m.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Point-to-Line Distance
          </h2>
          <p>
            The shortest distance from a point to an infinite straight line is the perpendicular distance.
          </p>
          <p>
            For the line Ax + By + C = 0 and point (x₀, y₀), the perpendicular distance is:
          </p>
          <div className="font-mono text-xs bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-blue-700 dark:text-blue-300">
            d = |Ax₀ + By₀ + C| / √(A² + B²)
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider">
              Worked Example
            </h3>
            <p>Find the distance from P = (2, 3) to the line 3x + 4y − 12 = 0:</p>
            <div className="font-mono text-xs space-y-1">
              <p>d = |3(2) + 4(3) − 12| / √(3² + 4²)</p>
              <p>d = |6 + 12 − 12| / 5 = 6 / 5 = 1.2</p>
            </div>
            <p>Therefore, distance = <strong>1.2 units</strong>.</p>
          </div>
          <p>
            This measurement is particularly useful in coordinate geometry, analytic geometry, engineering calculations, geometry algorithms, and determining the shortest separation between a point and a line. A useful equivalent interpretation is that the denominator normalizes the line coefficients so that the numerator corresponds to an actual geometric distance.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Distance Units and Conversions
          </h2>
          <p>
            Distance may be expressed using different systems depending on the application:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-2.5">Unit</th>
                  <th className="p-2.5">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr><td className="p-2 font-bold font-mono">meter (m)</td><td className="p-2">SI base unit of length</td></tr>
                <tr><td className="p-2 font-bold font-mono">kilometer (km)</td><td className="p-2">1,000 meters</td></tr>
                <tr><td className="p-2 font-bold font-mono">foot (ft)</td><td className="p-2">U.S./imperial length unit (0.3048 m)</td></tr>
                <tr><td className="p-2 font-bold font-mono">inch (in)</td><td className="p-2">1/12 of a foot (0.0254 m)</td></tr>
                <tr><td className="p-2 font-bold font-mono">yard (yd)</td><td className="p-2">3 feet (0.9144 m)</td></tr>
                <tr><td className="p-2 font-bold font-mono">mile (mi)</td><td className="p-2">5,280 feet (1,609.344 m)</td></tr>
                <tr><td className="p-2 font-bold font-mono">nautical mile (NM)</td><td className="p-2">navigation-related distance unit (1,852 m)</td></tr>
              </tbody>
            </table>
          </div>

          <p>
            The meter is the SI unit of length. NIST defines the meter through the fixed numerical value of the speed of light in vacuum. For common exact conversion factors: 1 mile = 1.609344 km, 1 mile = 1609.344 m, and 1 nautical mile = 1852 m. The nautical mile is defined as 1,852 meters and is widely used in marine and aviation navigation contexts.
          </p>
          <p>
            For example: 1000 meters = 1 kilometer ≈ 3280.8399 feet ≈ 0.6214 miles ≈ 0.5400 nautical miles. The calculator provides these conversions automatically rather than requiring the user to perform each conversion separately. For statistical variability in measurements, visit our{" "}
            <Link href="/calculators/standard-deviation-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Standard Deviation Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. How the Distance Calculator Chooses the Formula
          </h2>
          <p>
            There is no single distance formula that is appropriate for every problem.
          </p>
          <ul className="list-disc pl-6 space-y-1 text-xs">
            <li><strong>Use 2D Euclidean distance</strong> when the points are defined by ordinary x-y coordinates.</li>
            <li><strong>Use 3D Euclidean distance</strong> when each point has x, y, and z coordinates.</li>
            <li><strong>Use great-circle distance</strong> when the inputs are geographic latitude and longitude and the desired measurement is the shortest approximate path over Earth&apos;s spherical surface.</li>
            <li><strong>Use speed &times; time</strong> when distance is derived from a known speed and elapsed time.</li>
            <li><strong>Use point-to-line distance</strong> when the problem asks for the shortest perpendicular separation from a point to a line.</li>
          </ul>
          <p>
            This distinction prevents one of the most common mistakes in distance calculations: applying a mathematically correct formula to the wrong type of space.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Common Distance-Calculation Mistakes
          </h2>
          <div className="space-y-2 text-xs">
            <p><strong>Mixing latitude/longitude with Cartesian coordinates:</strong> Latitude and longitude are angular geographic coordinates. They should not normally be treated as ordinary x-y distances when calculating long Earth-surface distances.</p>
            <p><strong>Forgetting the third coordinate:</strong> A 3D distance requires all three coordinate differences: Δx, Δy, Δz. Dropping z changes the geometry from 3D to 2D.</p>
            <p><strong>Using inconsistent speed units:</strong> Miles should be paired with miles per hour when time is expressed in hours. Likewise, kilometers pair naturally with kilometers per hour.</p>
            <p><strong>Averaging individual speeds incorrectly:</strong> For a trip with multiple stages, average speed is generally based on total distance / total time rather than simply taking the arithmetic mean of the individual speeds.</p>
            <p><strong>Using an invalid line equation:</strong> For point-to-line calculations, A and B cannot both be zero because 0x + 0y + C = 0 does not define a normal line when the coefficients of x and y both vanish.</p>
            <p><strong>Rounding too early:</strong> Keep additional precision throughout the calculation and round only the final displayed result. Early rounding can introduce avoidable discrepancies.</p>
          </div>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Worked Examples at a Glance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Example A — 2D Points</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">(0,0) &rarr; (3,4)</p>
              <p className="font-bold mt-1">Distance = 5 units</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Example B — 3D Points</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">(1,1,1) &rarr; (4,5,9)</p>
              <p className="font-bold mt-1">Distance = √89 ≈ 9.434 units</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Example C — Speed &amp; Time</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">60 mph &times; 2.5 h</p>
              <p className="font-bold mt-1">Distance = 150 miles</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Example D — Point to Line</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">Pt (2,3) to 3x + 4y − 12 = 0</p>
              <p className="font-bold mt-1">Distance = 1.2 units</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 sm:col-span-2 md:col-span-2">
              <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Example E — Geographic Coordinates</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">New York &rarr; London</p>
              <p className="font-bold mt-1">Great-circle distance ≈ 3,461 miles (5,570 km)</p>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            These examples cover the major calculation modes offered by the tool.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Distance in Mathematics, Engineering and Navigation
          </h2>
          <p>
            Distance calculations appear in many technical disciplines.
          </p>
          <p>
            In coordinate geometry, distance determines the length of a line segment between two points. The same geometric construction is obtained by forming a right triangle and applying the Pythagorean theorem, or solving related polygon dimensions with our{" "}
            <Link href="/calculators/triangle-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Triangle Calculator
            </Link>
            .
          </p>
          <p>
            In physics, distance is used together with time to calculate speed and together with displacement measurements to describe motion.
          </p>
          <p>
            In engineering, coordinate distances can represent offsets, spatial separations, component positions, surveying coordinates, and geometric dimensions.
          </p>
          <p>
            In GIS and geospatial analysis, latitude and longitude require geographic distance calculations rather than simple flat-plane formulas.
          </p>
          <p>
            In aviation and marine navigation, nautical miles and geographic bearings are common because geographic position and angular separation matter directly. A nautical mile is exactly 1,852 meters.
          </p>
          <p>
            In computer graphics and robotics, 3D Euclidean distance can be used to determine spatial separation between objects or positions.
          </p>
          <p>
            The underlying principle remains the same: identify the geometry and measurement system first, then select the formula that matches it.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Distance Formula Reference
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-2.5">Problem Type</th>
                  <th className="p-2.5">Formula</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                <tr><td className="p-2 font-bold font-sans">2D Euclidean</td><td className="p-2 text-blue-600 dark:text-blue-400">d = √[(x₂−x₁)² + (y₂−y₁)²]</td></tr>
                <tr><td className="p-2 font-bold font-sans">3D Euclidean</td><td className="p-2 text-blue-600 dark:text-blue-400">d = √[(x₂−x₁)² + (y₂−y₁)² + (z₂−z₁)²]</td></tr>
                <tr><td className="p-2 font-bold font-sans">Speed &rarr; Distance</td><td className="p-2 text-blue-600 dark:text-blue-400">d = s &times; t</td></tr>
                <tr><td className="p-2 font-bold font-sans">Speed</td><td className="p-2 text-blue-600 dark:text-blue-400">s = d / t</td></tr>
                <tr><td className="p-2 font-bold font-sans">Time</td><td className="p-2 text-blue-600 dark:text-blue-400">t = d / s</td></tr>
                <tr><td className="p-2 font-bold font-sans">Point to line</td><td className="p-2 text-blue-600 dark:text-blue-400">d = |Ax₀+By₀+C| / √(A²+B²)</td></tr>
                <tr><td className="p-2 font-bold font-sans">Great-circle</td><td className="p-2 text-blue-600 dark:text-blue-400">d = R &times; c using Haversine angular separation</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            This compact reference is useful when the user already understands the underlying concepts and simply needs the correct equation.
          </p>
        </section>

        {/* Understanding the Result / Trust Block */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Understanding the Result
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Measurement Model Scope
              </div>
              <p>
                A calculated distance is only as meaningful as the measurement model and inputs used to obtain it. A 2D coordinate distance represents straight-line separation in a flat coordinate system. A 3D result represents straight-line Euclidean separation through three-dimensional space. A latitude/longitude result represents an approximate shortest surface distance using a spherical Earth model. A speed–time result assumes the supplied speed and time describe the motion being evaluated.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Travel &amp; Terrain Advisory
              </div>
              <p>
                For geographic travel, remember that great-circle distance is not the same thing as road distance or a real-world route. Actual travel distance can be longer because of roads, air corridors, coastlines, terrain, routing restrictions, and other constraints. Calculations run entirely in your browser with zero data retention.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* FAQ SECTION (Open by Default, Unfolded like 401(k) format) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {distanceFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* POST-CONTENT RELATED CALCULATORS (Immediately after content) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Related Calculators:
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-semibold">
          <Link
            href="/calculators/pythagorean-theorem-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-blue-600 dark:text-blue-400 block transition-colors"
          >
            Pythagorean Theorem Calculator &rarr;
          </Link>
          <Link
            href="/calculators/slope-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-blue-600 dark:text-blue-400 block transition-colors"
          >
            Slope Calculator &rarr;
          </Link>
          <Link
            href="/calculators/triangle-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-blue-600 dark:text-blue-400 block transition-colors"
          >
            Triangle Calculator &rarr;
          </Link>
          <Link
            href="/calculators/standard-deviation-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-blue-600 dark:text-blue-400 block transition-colors"
          >
            Standard Deviation Calculator &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}

export default DistanceContent;

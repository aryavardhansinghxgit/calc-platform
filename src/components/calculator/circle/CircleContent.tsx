"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown } from "lucide-react";

export function CircleContent() {
  // All 21 FAQs open (unfolded) by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 21 }, (_, i) => i))
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

  const faqs = [
    {
      question: "What is the formula for the area of a circle?",
      answer: "The area of a circle is A = πr², where r is the radius of the circle."
    },
    {
      question: "What is the formula for circumference?",
      answer: "Circumference can be calculated using either C = 2πr (from radius) or C = πd (from diameter), where r is the radius and d is the diameter."
    },
    {
      question: "How do I find the radius from the diameter?",
      answer: "Divide the diameter by 2: r = d / 2. For example, a diameter of 14 cm gives a radius of 7 cm."
    },
    {
      question: "How do I find the radius from circumference?",
      answer: "Use r = C / (2π). Enter the circumference into the calculator's circumference mode to obtain the radius and other properties automatically."
    },
    {
      question: "How do I find the radius from area?",
      answer: "Use r = √(A / π). This is the inverse of the standard circle area formula A = πr²."
    },
    {
      question: "What is the difference between radius and diameter?",
      answer: "The radius runs from the center of the circle to its outer boundary. The diameter passes completely through the center from one side of the circle to the other and is exactly twice the radius (d = 2r)."
    },
    {
      question: "How do I calculate circumference from diameter?",
      answer: "Use C = πd. For example, a diameter of 10 gives C = 10π ≈ 31.4159 units."
    },
    {
      question: "How do I calculate circle area from diameter?",
      answer: "Because r = d/2, the area in terms of diameter is A = π(d/2)² = πd² / 4."
    },
    {
      question: "What is π in a circle formula?",
      answer: "π (pi) is the mathematical constant equal to the ratio of a circle's circumference to its diameter (π = C / d). Its decimal expansion begins 3.1415926535..."
    },
    {
      question: "Does the circle calculator work with diameter instead of radius?",
      answer: "Yes. The core solver is bidirectional and can start from radius, diameter, circumference, or area."
    },
    {
      question: "What is an arc length?",
      answer: "Arc length is the distance measured along part of a circle's circumference. For a central angle θ in radians: L = rθ. For degrees: L = (θ / 360°) × 2πr."
    },
    {
      question: "What is a sector of a circle?",
      answer: "A sector is the region bounded by two radii and the arc between them, similar to a slice of a pie or pizza."
    },
    {
      question: "What is a chord?",
      answer: "A chord is a straight line segment connecting any two points on the circumference of a circle."
    },
    {
      question: "What is sagitta?",
      answer: "Sagitta (often called segment height) is the perpendicular distance from the midpoint of a chord to the arc apex: h = r - √(r² - (c/2)²)."
    },
    {
      question: "Can a chord be longer than the diameter?",
      answer: "No. The maximum chord length is the diameter of the circle (c ≤ 2r). A chord longer than the diameter is geometrically impossible."
    },
    {
      question: "What is an annulus?",
      answer: "An annulus is the ring-shaped region between two concentric circles. Its area is A = π(R² - r²), where R is the outer radius and r is the inner radius."
    },
    {
      question: "How do I calculate a circle from three points?",
      answer: "Three non-collinear points determine a unique circumcircle. The circumcircle solver calculates its center (h, k) and radius R using perpendicular bisector equations and verifies that all three points are equidistant from the center."
    },
    {
      question: "What happens if the three points are collinear?",
      answer: "A unique finite circumcircle cannot be determined because the points lie along the same straight line; the circumradius is infinite and the cross-product determinant equals zero."
    },
    {
      question: "Should I use degrees or radians for arc calculations?",
      answer: "Either may be used when the corresponding formula is applied correctly. Radian formulas use θ directly (L = rθ), while degree formulas require conversion by the factor π/180 or the ratio (θ / 360°)."
    },
    {
      question: "Why is my area unit squared?",
      answer: "Area measures a two-dimensional surface. Because the radius is squared in the formula (r²), converting a length unit also squares the conversion factor (for example, 1 m = 100 cm, but 1 m² = 10,000 cm²)."
    },
    {
      question: "Is the decimal result exactly equal to the π expression?",
      answer: "No. An expression such as 25π is exact, while 78.5398 is a rounded decimal approximation."
    }
  ];

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      
      {/* RELATED CALCULATORS — ABOVE THE MAIN CONTENT */}
      <div>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Related Calculators
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm">
            <Link href="/calculators/area-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Area Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <Link href="/calculators/volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Volume Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <Link href="/calculators/triangle-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Triangle Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <Link href="/calculators/distance-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Distance Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <Link href="/calculators/pythagorean-theorem-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Pythagorean Theorem Calculator
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN LONG-FORM EDUCATIONAL CONTENT */}
      <div className="pt-8 space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Intro */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Circle Calculator: Area, Circumference, Radius, Diameter &amp; More
          </h2>
          <p>
            A circle can be described using several measurements, but four quantities are especially important: radius, diameter, circumference and area. Once one of these measurements is known, the others can be calculated because they are all connected by the same geometric relationships involving &pi;.
          </p>
          <p>
            This Circle Calculator is designed to handle more than a basic area calculation. You can work backward from a known radius, diameter, circumference or area, then calculate the remaining properties. It also includes dedicated tools for circular sectors and arcs, chords and sagitta, annuli, circle equations, circumcircles through three points, and circle-related unit conversions.
          </p>
          <p>
            The calculator shows numerical results together with the underlying formulas and mathematical relationships, making it useful for geometry exercises, checking calculations, engineering work, design measurements and everyday circular measurements.
          </p>
        </section>

        {/* What Can It Calculate */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Can a Circle Calculator Calculate?
          </h2>
          <p>The core circle solver calculates:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Radius (<em>r</em>)</li>
            <li>Diameter (<em>d</em>)</li>
            <li>Circumference (<em>C</em>)</li>
            <li>Circle area (<em>A</em>)</li>
          </ul>
          <p>The wider Circle Calculator suite also includes:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Sector area</li>
            <li>Arc length</li>
            <li>Sector perimeter</li>
            <li>Chord length and circular segment measurements</li>
            <li>Sagitta (segment height)</li>
            <li>Annulus or circular-ring area</li>
            <li>Circle equations in standard and general form</li>
            <li>Circumcircle from three points</li>
            <li>Circle radius, diameter, circumference and area conversions</li>
            <li>Step-by-step mathematical relationships</li>
            <li>Visual geometric diagrams</li>
          </ul>
          <p>
            This means you do not necessarily need to know the radius first. For example, if you know the diameter of a circular table, the circumference of a pipe, or the area of a circular region, the calculator can work backward to the radius and then determine the other measurements.
          </p>
        </section>

        {/* The Four Main Measurements */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            The Four Main Measurements of a Circle
          </h2>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">1. Radius</h3>
            <p>
              The radius, written as <em>r</em>, is the straight-line distance from the center of a circle to any point on its circumference. For a given circle, every radius has the same length. The radius is the most important starting quantity in many circle formulas because both circumference and area can be expressed directly in terms of <em>r</em>.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">2. Diameter</h3>
            <p>
              The diameter, written as <em>d</em>, is the straight-line distance across a circle through its center. The diameter is exactly twice the radius:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
              d = 2r &emsp; &rArr; &emsp; r = d / 2
            </div>
            <p>
              For example, if a circle has a diameter of 20 cm: <em>r = 20 / 2 = 10 cm</em>. The distinction between radius and diameter matters in practical measurements. A circular object may be specified by its diameter even though the formula being used requires the radius.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">3. Circumference</h3>
            <p>
              The circumference is the distance around the outside boundary of a circle.
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
              C = 2&pi;r = &pi;d
            </div>
            <p>
              These two formulas are equivalent because <em>d = 2r</em>. For example, when <em>r = 5</em>: <em>C = 2&pi;(5) = 10&pi; &approx; 31.4159 units</em>. The exact answer can be retained as 10&pi;, while the decimal value is an approximation.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">4. Area</h3>
            <p>
              The area of a circle is the amount of two-dimensional space enclosed by its circumference. The standard formula is:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
              A = &pi;r&sup2;
            </div>
            <p>
              Because the radius is squared, area is expressed in square units. For example, when <em>r = 5 cm</em>: <em>A = &pi;(5&sup2;) = 25&pi; &approx; 78.5398 cm&sup2;</em>. This is an important units distinction: a radius measured in centimetres produces an area measured in square centimetres. For broader 2D area calculations, explore our{" "}
              <Link href="/calculators/area-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
                Area Calculator
              </Link>.
            </p>
          </div>
        </section>

        {/* Formula Reference Table */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Circle Formula Reference
          </h2>
          <p>The principal formulas used by the calculator are:</p>
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3 font-bold text-slate-900 dark:text-slate-100">Quantity</th>
                  <th className="p-3 font-bold text-slate-900 dark:text-slate-100">Formula</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-normal">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold">Diameter</td>
                  <td className="p-3 font-mono">d = 2r</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold">Radius</td>
                  <td className="p-3 font-mono">r = d / 2</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold">Circumference</td>
                  <td className="p-3 font-mono">C = 2&pi;r</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold">Circumference from diameter</td>
                  <td className="p-3 font-mono">C = &pi;d</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold">Radius from circumference</td>
                  <td className="p-3 font-mono">r = C / (2&pi;)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold">Diameter from circumference</td>
                  <td className="p-3 font-mono">d = C / &pi;</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold">Area</td>
                  <td className="p-3 font-mono">A = &pi;r&sup2;</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold">Radius from area</td>
                  <td className="p-3 font-mono">r = &radic;(A / &pi;)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold">Diameter from area</td>
                  <td className="p-3 font-mono">d = 2&radic;(A / &pi;)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            The standard formulas for circumference and area are documented in OpenStax prealgebra and geometry texts.
          </p>
        </section>

        {/* How to Use */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Use the Circle Calculator
          </h2>
          <div className="space-y-2.5">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100">Step 1: Choose the measurement you know</span>
              <p className="mt-1">Select the appropriate input type: Radius, Diameter, Circumference, or Area.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100">Step 2: Enter the value</span>
              <p className="mt-1">Enter the known numerical measurement using a consistent unit (for example, r = 5).</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100">Step 3: Read the calculated properties</span>
              <p className="mt-1">The calculator instantly determines the other circle measurements: radius = 5, diameter = 10, circumference &approx; 31.4159, and area &approx; 78.5398.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100">Step 4: Check the formula</span>
              <p className="mt-1">The calculator displays the step-by-step mathematical derivation behind the result, allowing you to verify how the number was obtained.</p>
            </div>
          </div>
        </section>

        {/* Worked Example */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Worked Example: Find Area and Circumference from Radius
          </h2>
          <p>Suppose a circular garden has a radius of 4 metres.</p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 font-mono space-y-2">
            <div><strong>Diameter:</strong> d = 2r = 2(4) = 8 m</div>
            <div><strong>Circumference:</strong> C = 2&pi;r = 2&pi;(4) = 8&pi; &approx; 25.1327 m</div>
            <div><strong>Area:</strong> A = &pi;r&sup2; = &pi;(4&sup2;) = 16&pi; &approx; 50.2655 m&sup2;</div>
          </div>
          <p>
            So a circle with radius 4 m has a diameter of 8 m, a circumference of about 25.1327 m, and an area of about 50.2655 m&sup2;.
          </p>
        </section>

        {/* How to Find Radius from Area */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Find Radius from Area
          </h2>
          <p>Sometimes the area is known but the radius is not. Start with:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            A = &pi;r&sup2; &emsp; &rArr; &emsp; A / &pi; = r&sup2; &emsp; &rArr; &emsp; r = &radic;(A / &pi;)
          </div>
          <p>
            For example, if <em>A = 78.5398 cm&sup2;</em>:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center">
            r = &radic;(78.5398 / &pi;) = &radic;(25) &approx; 5 cm
          </div>
          <p>
            Once the radius has been recovered, the diameter and circumference can be calculated normally. This reverse calculation is particularly useful when a specification gives the area of a circular region but the physical radius is required.
          </p>
        </section>

        {/* How to Find Radius from Circumference */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Find Radius from Circumference
          </h2>
          <p>Starting from <em>C = 2&pi;r</em>, divide both sides by <em>2&pi;</em>:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            r = C / (2&pi;)
          </div>
          <p>
            For example, if a circular object has circumference 31.4159 cm:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center">
            r &approx; 31.4159 / (2&pi;) &approx; 5 cm &emsp; &rArr; &emsp; d = 2r = 10 cm
          </div>
        </section>

        {/* Radius vs Diameter */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Radius vs Diameter: What Is the Difference?
          </h2>
          <p>
            The radius extends from the center to the circumference. The diameter extends completely across the circle and passes through the center. Therefore:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            d = 2r &emsp; and &emsp; r = d / 2
          </div>
          <p>
            A common mistake is entering a diameter into a formula that expects a radius. Because the area formula contains <em>r&sup2;</em>, confusing the two creates a four-fold error: treating <em>d = 10</em> as <em>r = 10</em> produces <em>&pi;(10&sup2;) = 100&pi;</em>, whereas the true area for diameter 10 is obtained from <em>r = 5</em>: <em>&pi;(5&sup2;) = 25&pi;</em>.
          </p>
        </section>

        {/* Why Does Pi Appear */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Does &pi; Appear in Circle Calculations?
          </h2>
          <p>
            The constant &pi; (pi) represents the ratio between a circle&apos;s circumference and its diameter:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            &pi; = C / d
          </div>
          <p>
            The same ratio applies to every circle in Euclidean space, leading directly to <em>C = &pi;d = 2&pi;r</em> and <em>A = &pi;r&sup2;</em>. For numerical calculations, &pi; is approximated by 3.141592653589793..., while exact mathematical work retains &pi; symbolically. Keeping an exact result such as 25&pi; preserves mathematical clarity, while decimals such as 78.5398 represent rounded engineering values.
          </p>
        </section>

        {/* Sector Area and Arc Length */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Sector Area and Arc Length
          </h2>
          <p>
            A sector is a portion of a circle bounded by two radii and the arc between them. The calculator determines sector measurements from the radius and central angle:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs sm:text-sm">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100 font-sans">Angle in Radians:</span>
              <div>Arc length: L = r&theta;</div>
              <div>Sector area: A = &frac12;r&sup2;&theta;</div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100 font-sans">Angle in Degrees:</span>
              <div>Arc length: L = (&theta; / 360&deg;) &times; 2&pi;r</div>
              <div>Sector area: A = (&theta; / 360&deg;) &times; &pi;r&sup2;</div>
            </div>
          </div>
          <p>
            For example, with <em>r = 6</em> and <em>&theta; = 60&deg;</em>: <em>L = (60/360) &times; 2&pi;(6) = 2&pi; &approx; 6.2832</em>, and <em>A = (60/360) &times; &pi;(6&sup2;) = 6&pi; &approx; 18.8496</em>. A complete 360&deg; sector equals the entire circle.
          </p>
        </section>

        {/* Circular Segments, Chords and Sagitta */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Circular Segments, Chords and Sagitta
          </h2>
          <p>
            A circular segment is the region cut off from a circle by a chord. A chord is a straight line whose endpoints lie on the circumference. The sagitta (segment height <em>h</em>) is the perpendicular distance from the midpoint of the chord to the arc apex:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            h = r - &radic;(r&sup2; - (c/2)&sup2;)
          </div>
          <p>
            A chord cannot be longer than the diameter (<em>c &le; 2r</em>). For <em>r = 10</em> and <em>c = 12</em>, <em>h = 10 - &radic;(100 - 36) = 2</em>, central angle &theta; &approx; 73.7398&deg;, and minor segment area <em>A = &frac12;r&sup2;(&theta; - sin &theta;) &approx; 16.3501</em>.
          </p>
        </section>

        {/* Annulus or Circular Ring Area */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Annulus or Circular Ring Area
          </h2>
          <p>
            An annulus is the ring-shaped region between two concentric circles with outer radius <em>R</em> and inner radius <em>r</em>:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            A<sub>annulus</sub> = &pi;(R&sup2; - r&sup2;) &emsp; | &emsp; Wall thickness: t = R - r
          </div>
          <p>
            For <em>R = 10</em> and <em>r = 6</em>: <em>A = &pi;(100 - 36) = 64&pi; &approx; 201.0619</em>, with wall thickness <em>t = 4</em> and average radius 8. The outer radius must be strictly greater than the inner radius.
          </p>
        </section>

        {/* Circle Equation */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Circle Equation &amp; Coordinate Geometry
          </h2>
          <p>
            A circle in the Cartesian plane is represented by its center <em>(h, k)</em> and radius <em>r</em>:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            Standard form: (x - h)&sup2; + (y - k)&sup2; = r&sup2;
          </div>
          <p>
            For center (2, -3) and radius 5: <em>(x - 2)&sup2; + (y + 3)&sup2; = 25</em>. Expanding produces general form: <em>x&sup2; + y&sup2; - 4x + 6y - 12 = 0</em>. For coordinate distances between centers and points, try our{" "}
            <Link href="/calculators/distance-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Distance Calculator
            </Link>.
          </p>
        </section>

        {/* Circumcircle from Three Points */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Circumcircle from Three Points
          </h2>
          <p>
            Three non-collinear points uniquely determine a circumcircle. For points <em>P1(0, 0), P2(4, 0), P3(0, 3)</em>:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            Circumcenter: (2.0, 1.5) &emsp; | &emsp; Circumradius R = 2.5 &emsp; | &emsp; Area = 6.25&pi; &approx; 19.635
          </div>
          <p>
            The calculator verifies that all three points are equidistant from the center. If points are collinear, a finite circumcircle cannot be formed. For triangular polygon calculations, see our{" "}
            <Link href="/calculators/triangle-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Triangle Calculator
            </Link>{" "}and{" "}
            <Link href="/calculators/pythagorean-theorem-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Pythagorean Theorem Calculator
            </Link>.
          </p>
        </section>

        {/* Why Doubling the Radius Quadruples Area */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Doubling the Radius Quadruples the Area
          </h2>
          <p>
            Circumference is linear (<em>C = 2&pi;r</em>), while area is quadratic (<em>A = &pi;r&sup2;</em>). When the radius doubles from <em>r &rarr; 2r</em>:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Circumference: <em>C<sub>new</sub> = 2&pi;(2r) = 2C</em> (doubles)</li>
            <li>Area: <em>A<sub>new</sub> = &pi;(2r)&sup2; = 4&pi;r&sup2; = 4A</em> (quadruples)</li>
          </ul>
          <p>
            This fundamental scaling principle is essential when sizing circular pipes, storage tanks, and engine cylinders. For 3D circular objects such as cylinders and spheres, visit our{" "}
            <Link href="/calculators/volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Volume Calculator
            </Link>.
          </p>
        </section>

        {/* Common Mistakes */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Common Circle Calculation Mistakes
          </h2>
          <div className="space-y-2.5">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100">Using diameter as radius</span>
              <p className="mt-1">If a problem gives <em>d = 20 cm</em>, the radius is 10 cm, not 20 cm. Remember to divide diameter by 2 before applying <em>A = &pi;r&sup2;</em>.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100">Forgetting that area uses square units</span>
              <p className="mt-1">Radius in centimetres produces area in cm&sup2;. Radius in metres produces area in m&sup2;. Never report area in linear units.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100">Mixing degrees and radians</span>
              <p className="mt-1">Using degree values directly in <em>L = r&theta;</em> yields incorrect answers. Always convert degrees to radians (&theta;<sub>rad</sub> = &theta;&deg; &times; &pi;/180) first.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100">Entering impossible chords</span>
              <p className="mt-1">A chord cannot exceed the circle diameter (<em>c &le; 2r</em>). A chord of 25 in a circle of radius 10 is geometrically impossible.</p>
            </div>
          </div>
        </section>

        {/* Real-World Applications */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Circle Geometry in Real-World Applications
          </h2>
          <p>Circle formulas are used across engineering, design, architecture, and manufacturing:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100">Civil &amp; Construction Engineering</span>
              <p className="text-slate-600 dark:text-slate-400">Designing road roundabouts, water reservoirs, culverts, drainage conduits, and circular foundation footings.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100">Mechanical Systems &amp; Drive Trains</span>
              <p className="text-slate-600 dark:text-slate-400">Calculating pulley ratios, gear pitch circles, flywheel inertia, and engine cylinder displacement volumes.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100">Architecture &amp; Interior Design</span>
              <p className="text-slate-600 dark:text-slate-400">Planning rotunda rooms, curved masonry arches, circular stairwells, and decorative floor mosaics.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100">Optics, Photography &amp; Astronomy</span>
              <p className="text-slate-600 dark:text-slate-400">Sizing camera lens aperture diaphragms (f-stop ratios), telescope mirror surface areas, and orbital radii.</p>
            </div>
          </div>
        </section>

        {/* When Should You Use Each */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            When Should You Use Each Circle Calculation?
          </h2>
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3 font-bold text-slate-900 dark:text-slate-100">What You Know</th>
                  <th className="p-3 font-bold text-slate-900 dark:text-slate-100">What You Can Calculate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-normal">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold">Radius</td>
                  <td className="p-3">Diameter, circumference, area</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold">Diameter</td>
                  <td className="p-3">Radius, circumference, area</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold">Circumference</td>
                  <td className="p-3">Radius, diameter, area</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold">Area</td>
                  <td className="p-3">Radius, diameter, circumference</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold">Radius + central angle</td>
                  <td className="p-3">Arc length, sector area, perimeter</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold">Radius + chord</td>
                  <td className="p-3">Sagitta height, segment area, central angle</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold">Outer + inner radius</td>
                  <td className="p-3">Annulus ring area, wall thickness, average radius</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold">Center + radius</td>
                  <td className="p-3">Standard and general circle equations</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold">Three non-collinear points</td>
                  <td className="p-3">Circumcenter, circumradius, circumcircle area</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>

      {/* 21 APPROVED FAQS (UNFOLDED BY DEFAULT) */}
      <div className="pt-8">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-800/20 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* QUICK REFERENCE SUMMARY */}
      <div className="pt-8 space-y-6 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Quick Reference: Circle Formulas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 font-mono text-xs">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              d = 2r
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              r = d / 2
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              C = 2&pi;r = &pi;d
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              A = &pi;r&sup2;
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              r = C / (2&pi;)
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              r = &radic;(A / &pi;)
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              L = r&theta;<sub>rad</sub>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              A<sub>sector</sub> = (&theta;/360)&pi;r&sup2;
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              A<sub>annulus</sub> = &pi;(R&sup2; - r&sup2;)
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Summary
          </h2>
          <p>
            The fundamental relationships of a circle are simple but powerful: <em>d = 2r</em>, <em>C = 2&pi;r</em>, and <em>A = &pi;r&sup2;</em>. Knowing any one of radius, diameter, circumference, or area is enough to determine all the others. More specialized measurements such as sector area, arc length, chord length, sagitta, annulus area, and circumcircle coordinates follow from the exact same mathematical foundation.
          </p>
        </section>
      </div>

      {/* RELATED CALCULATORS — AFTER THE CONTENT */}
      <div className="pt-6">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Related Calculators
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm">
            <Link href="/calculators/area-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Area Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <Link href="/calculators/volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Volume Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <Link href="/calculators/triangle-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Triangle Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <Link href="/calculators/distance-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Distance Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <Link href="/calculators/pythagorean-theorem-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Pythagorean Theorem Calculator
            </Link>
          </div>
        </div>
      </div>

    </article>
  );
}

export default CircleContent;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { volume_calculatorFaqs } from "@/app/calculators/volume-calculator/faq";

export function VolumeContent() {
  // All 12 FAQs open by default for immediate readability and SEO indexing
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 12 }, (_, i) => i))
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
    <article className="mt-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-10">
      {/* ========================================================================= */}
      {/* 2. RELATED CALCULATORS — DIRECTLY ABOVE EDUCATIONAL CONTENT */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Related Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <Link
            href="/calculators/surface-area-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Surface Area Calculator &amp; 3D Solids Net Suite</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Calculate the surface area of common 3D solids and compare the exposed area with the volume of the same shape.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/area-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Area Calculator &amp; 2D Geometry Suite</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Calculate the area of rectangles, circles, triangles and other two-dimensional shapes used as bases for volume calculations.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/density-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Density Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Convert between mass, volume and density when a volume measurement needs to be combined with material properties.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MAIN EDUCATIONAL CONTENT */}
      {/* ========================================================================= */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Intro */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            Volume Calculator: Calculate the Volume of 3D Shapes
          </h2>
          <p>
            Volume measures how much three-dimensional space an object occupies. For a solid geometric shape, volume is expressed in cubic units such as cubic meters (m³), cubic centimeters (cm³), cubic feet (ft³), cubic inches (in³), or cubic yards (yd³). For liquid and storage applications, the same physical volume may also be expressed in liters, milliliters, US gallons or Imperial gallons.
          </p>
          <p>
            This volume calculator brings several common geometry and capacity problems together in one tool. Depending on the shape you select, you can calculate the volume of cylinders, spheres, cones, cubes, rectangular prisms, spherical caps, ellipsoids, conical frustums, square pyramids, hollow tubes and capsules. The calculator also includes a rectangular tank mode that separates filled liquid volume from total tank capacity, which is important when a container is only partially filled.
          </p>
          <p>
            The underlying geometry is straightforward: volume formulas generally combine a shape&apos;s base area with a relevant height or use a shape-specific three-dimensional formula. Standard references give <span className="font-mono font-semibold">V = lwh</span> for a rectangular solid, <span className="font-mono font-semibold">V = πr²h</span> for a cylinder, <span className="font-mono font-semibold">V = (4/3)πr³</span> for a sphere and <span className="font-mono font-semibold">V = (1/3)πr²h</span> for a cone.
          </p>
        </section>

        {/* How to Use */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Use This Volume Calculator
          </h2>
          <p>
            Start by selecting the 3D shape that matches the object you are measuring. Enter the dimensions shown for that shape and select the desired unit system. The calculator then evaluates the corresponding geometric formula and displays the result at the selected decimal precision.
          </p>
          <p>
            For example, a cylinder requires its radius and height. A rectangular prism requires length, width and height. A sphere requires its radius. A cone requires its base radius and perpendicular height. A tank additionally requires the liquid fill depth when you want the amount of liquid currently inside rather than the full container capacity.
          </p>
          <p>
            The calculator keeps the mathematical result separate from its displayed formatting, so choosing two, four or six decimal places changes the presentation rather than changing the underlying calculation. This is particularly useful when working with engineering dimensions where small rounding differences can become significant.
          </p>
        </section>

        {/* Formulas for 3D Shapes */}
        <section className="space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            Volume Formulas for Common 3D Shapes
          </h2>

          {/* Cylinder */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Cylinder
            </h3>
            <p>
              For a right circular cylinder with radius <span className="font-mono">r</span> and height <span className="font-mono">h</span>:
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono font-bold text-blue-700 dark:text-blue-300">
              V = π · r² · h
            </div>
            <p>
              The circular base has area <span className="font-mono">πr²</span>, and multiplying that area by the cylinder height gives the volume. The total surface area is:
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-slate-800 dark:text-slate-200">
              SA = 2πr² + 2πrh = 2πr(r + h)
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              This model is useful for pipes, cans, tanks and cylindrical containers.
            </p>
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900 font-mono text-xs space-y-1">
              <span className="font-bold text-blue-900 dark:text-blue-300 block font-sans">Worked Cylinder Example:</span>
              <span>For r = 5 m and h = 10 m:</span><br />
              <span>V = π × (5)² × (10) = 250π ≈ 785.3982 m³</span><br />
              <span>SA = 2 × π × 5 × (5 + 10) = 150π ≈ 471.2389 m²</span>
            </div>
          </div>

          {/* Rectangular Prism */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Rectangular Prism and Box Volume
            </h3>
            <p>
              For a rectangular solid:
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono font-bold text-blue-700 dark:text-blue-300">
              V = l · w · h
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              where <span className="font-mono">l</span> = length, <span className="font-mono">w</span> = width, and <span className="font-mono">h</span> = height. This is one of the simplest and most frequently used volume formulas. It applies to boxes, rooms, rectangular containers and many construction measurements.
            </p>
            <p>
              The important point is that all three dimensions must represent the same unit. For example, multiplying feet × feet × feet produces cubic feet, not square feet or gallons.
            </p>
          </div>

          {/* Cube */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Cube Volume
            </h3>
            <p>
              A cube has six equal square faces, so a single edge length <span className="font-mono">a</span> determines its volume:
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono font-bold text-blue-700 dark:text-blue-300">
              V = a³ | SA = 6a²
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              For a = 5 m: V = 5³ = 125 m³. The calculator preserves the requested display precision, so this can be shown as 125.0000 m³ when four decimal places are selected.
            </p>
          </div>

          {/* Sphere */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Sphere Volume
            </h3>
            <p>
              For a sphere with radius <span className="font-mono">r</span>:
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono font-bold text-blue-700 dark:text-blue-300">
              V = (4/3) · π · r³ | SA = 4 · π · r²
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              The radius must run from the center of the sphere to its surface. If you are given a diameter instead, first use <span className="font-mono">r = d / 2</span>. The sphere formula is a standard result in elementary geometry.
            </p>
          </div>

          {/* Cone */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Cone Volume
            </h3>
            <p>
              For a right circular cone:
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono font-bold text-blue-700 dark:text-blue-300">
              V = (1/3) · π · r² · h
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              The height <span className="font-mono">h</span> is the perpendicular distance from the base to the apex, not the slant height. The slant height is:
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-slate-800 dark:text-slate-200">
              s = √(r² + h²)
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              and can be used when calculating the cone&apos;s surface area. OpenStax likewise derives the cone volume as one-third of the volume of a cylinder with the same base and height.
            </p>
          </div>
        </section>

        {/* Tank Capacity Section */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Calculate Tank Capacity
          </h2>
          <p>
            For a rectangular tank, there are two different measurements that should never be confused:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Total tank capacity</strong> is the volume the container can hold when filled to its full internal height:
              <div className="my-1.5 p-2 bg-slate-50 dark:bg-slate-800/60 rounded font-mono font-bold">
                V_total = l · w · h
              </div>
            </li>
            <li>
              <strong>Liquid volume</strong> is the amount actually present at a particular fill depth <span className="font-mono">d</span>:
              <div className="my-1.5 p-2 bg-slate-50 dark:bg-slate-800/60 rounded font-mono font-bold">
                V_liquid = l · w · d
              </div>
            </li>
            <li>
              The <strong>remaining empty or air volume</strong> is:
              <div className="my-1.5 p-2 bg-slate-50 dark:bg-slate-800/60 rounded font-mono font-bold">
                V_air = V_total - V_liquid
              </div>
            </li>
          </ul>

          <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 space-y-2">
            <h3 className="font-bold text-blue-900 dark:text-blue-300 text-sm">
              Worked Tank Example
            </h3>
            <p className="text-xs">
              Suppose a rectangular tank measures: <strong>Length = 10 ft, Width = 6 ft, Total Height = 4 ft, Liquid Depth = 3 ft</strong>.
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
              <div>Total Tank Capacity = 10 × 6 × 4 = <strong>240 ft³</strong></div>
              <div>Filled Liquid Volume = 10 × 6 × 3 = <strong>180 ft³</strong></div>
              <div>Remaining Air Volume = 240 - 180 = <strong>60 ft³</strong></div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-sans">
                Using the international foot definition, 1 cubic foot corresponds to 28.316846592 liters.
              </div>
              <div className="font-bold text-blue-700 dark:text-blue-300">
                Filled Liquid Volume = 180 × 28.316846592 = 5,097.0324 L (1,346.4935 US Gallons)
              </div>
              <div className="font-bold text-slate-800 dark:text-slate-200">
                Total Tank Capacity = 240 × 28.316846592 = 6,796.0432 L (1,795.3247 US Gallons)
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              This distinction matters in water tanks, storage vessels and other partially filled containers. The calculator therefore reports Liquid Storage Capacity, Total Tank Capacity and Remaining Air Volume separately rather than combining them into one misleading number. The production implementation and regression audit specifically verify this distinction.
            </p>
          </div>
        </section>

        {/* Additional 3D Shapes */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            Spherical Caps, Ellipsoids, Frustums, Pyramids, Tubes &amp; Capsules
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Spherical Caps and Partial Spheres
              </h3>
              <p>
                A spherical cap is the portion of a sphere cut off by a plane. Its volume depends on sphere radius <span className="font-mono">R</span> and cap height <span className="font-mono">h</span>:
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded font-mono font-bold">
                V = (π · h² / 3) · (3R - h)
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                The cap height must be geometrically valid relative to the sphere diameter (<span className="font-mono">h ≤ 2R</span>). The calculator rejects impossible configurations instead of silently adjusting them. Useful for domes, tank ends, and lens geometry.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Ellipsoid Volume
              </h3>
              <p>
                An ellipsoid generalizes a sphere along three perpendicular semi-axes <span className="font-mono">a, b, c</span>:
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded font-mono font-bold">
                V = (4/3) · π · a · b · c
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                A sphere is the special case where <span className="font-mono">a = b = c = r</span>. The three dimensions must be semi-axis lengths, not full diameters.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Conical Frustum Volume
              </h3>
              <p>
                A conical frustum is the portion of a cone remaining after its tip is cut off:
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded font-mono font-bold">
                V = (πh / 3) · (R² + Rr + r²)
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                With slant height <span className="font-mono">s = √(h² + (R - r)²)</span>. Useful for tapered containers, funnels, hoppers, and truncated conical components.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Square Pyramid Volume
              </h3>
              <p>
                For a square pyramid with base edge <span className="font-mono">a</span> and height <span className="font-mono">h</span>:
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded font-mono font-bold">
                V = (1/3) · a² · h
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                The factor of 1/3 appears because a pyramid occupies one-third the volume of its enclosing prism (<span className="font-mono">V = (1/3)Ah</span>).
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Hollow Tube and Pipe Volume
              </h3>
              <p>
                If <span className="font-mono">R</span> is outer radius, <span className="font-mono">r</span> is inner radius, and <span className="font-mono">h</span> is length:
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded font-mono font-bold">
                V = π · h · (R² - r²) = [π(d1² - d2²)l] / 4
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                The volume represents the solid cylindrical wall, not the empty bore. The calculator validates that inner diameter cannot equal or exceed outer diameter.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Capsule Volume
              </h3>
              <p>
                A capsule consists of a cylindrical middle section and two hemispherical ends:
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded font-mono font-bold">
                V = π · r² · h + (4/3) · π · r³
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Combines cylindrical and full spherical volume into one solid. Useful for rounded containers, pharmaceutical capsules, and pressurized gas tanks.
              </p>
            </div>
          </div>
        </section>

        {/* 4. VOLUME CONVERSION SECTION */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            Volume Units: m³, ft³, in³, yd³, Liters and Gallons
          </h2>
          <p>
            Volume units are cubic because volume describes three dimensions. A length conversion therefore changes differently when cubed. For example, 1 m = 3.28084 ft, but 1 m³ ≈ 35.3147 ft³.
          </p>
          <p>
            The calculator can convert volume into several common units, including cubic meters, liters, milliliters, US gallons, US fluid ounces, US quarts, Imperial gallons, cubic feet, cubic inches and cubic yards:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              1 m³ = <strong>1,000 L</strong>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              1 ft³ = <strong>28.3168 L</strong>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              1 yd³ = <strong>27 ft³</strong>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              1 US gal = <strong>3.7854 L</strong>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-xs">
            The calculator keeps US liquid gallons separate from UK/Imperial gallons (1 Imp gal ≈ 4.54609 L) because these are distinct units. For unit standardization, the international SI framework is maintained by the Bureau International des Poids et Mesures (BIPM).
          </p>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              How to Convert Cubic Feet to Liters
            </h3>
            <p className="text-xs">
              To convert cubic feet to liters: <span className="font-mono font-bold">L = ft³ × 28.316846592</span>.
              For example, 25 ft³ × 28.316846592 = <strong>707.9212 L</strong>. Conversely, <span className="font-mono font-bold">ft³ = L / 28.316846592</span>. This is particularly useful when a tank specification is given in cubic feet but the required capacity is needed in liters.
            </p>
          </div>
        </section>

        {/* 5. HOW TO CHECK A VOLUME CALCULATION */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Check a Volume Calculation
          </h2>
          <p>A good volume calculation should pass three basic checks:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Check 1: Units</h3>
              <p className="text-slate-600 dark:text-slate-400">
                All dimensions in a formula must be expressed in compatible units. For example, do not multiply 5 ft × 2 m × 3 ft directly; convert all to feet or meters first.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Check 2: Shape</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Use the formula associated with the actual geometry. A cylinder, sphere, and cone do not use the same equation.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Check 3: Magnitude</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Consider whether the final number is physically reasonable. A small object should not suddenly produce a massive volume unless the dimensions justify it.
              </p>
            </div>
          </div>
        </section>

        {/* 6. VOLUME VS SURFACE AREA */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Volume and Surface Area Are Different
          </h2>
          <p>
            Volume and surface area describe different geometric properties. Volume measures the amount of three-dimensional space inside a solid and is expressed in cubic units. Surface area measures the total area covering the object&apos;s exterior and is expressed in square units.
          </p>
          <p>
            For example, a cylinder has <span className="font-mono">V = πr²h</span> but <span className="font-mono">SA = 2πr² + 2πrh</span>. Increasing the radius affects volume more strongly than it affects a simple linear measurement because radius is squared in the volume formula. For projects where both quantities are needed, use the{" "}
            <Link href="/calculators/surface-area-calculator" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
              Surface Area Calculator &amp; 3D Solids Net Suite
            </Link>{" "}
            alongside this tool.
          </p>
        </section>

        {/* 7. PRACTICAL USE CASES */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            Practical &amp; Professional Applications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Construction &amp; Civil</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Calculate concrete pour volumes, gravel requirements, rectangular spaces, pipes, and earthwork holdbacks.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Storage &amp; Tanks</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Calculate full tank capacity, actual liquid volume at a specified fill depth, and remaining air volume.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Manufacturing &amp; Packaging</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Estimate volume and surface area of cylindrical, spherical, hollow, or capsule-shaped products and shipping containers.
              </p>
            </div>
          </div>
        </section>

        {/* 8. ACCURACY & ROUNDING */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            Accuracy, Floating-Point Precision &amp; Rounding
          </h2>
          <p>
            The calculator performs the geometric calculation using the underlying numeric values and only applies the selected decimal precision to the displayed result. For example, a result can be displayed as 785.40 m³ at two decimal places, or 785.3982 m³ at four decimal places.
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-xs">
            The distinction is important because formatting precision and mathematical precision are not the same thing. For engineering, scientific and construction work, use input measurements that are themselves sufficiently accurate. Reporting many decimal places does not make an imprecise physical measurement more accurate.
          </p>
        </section>

        {/* 9. SHORT WORKED EXAMPLE */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            Worked Step-by-Step Example: Cylinder
          </h2>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1.5">
            <div><strong>Problem:</strong> A cylinder has base radius r = 4 m and height h = 10 m. Find its volume.</div>
            <div>Formula: <strong>V = π · r² · h</strong></div>
            <div>Substitution: V = π × (4)² × (10) = π × 16 × 10 = <strong>160π</strong></div>
            <div className="font-bold text-blue-700 dark:text-blue-300">Result: V ≈ 502.6548 m³</div>
            <div className="text-slate-500 font-sans text-[11px] pt-1 border-t border-slate-200 dark:border-slate-700">
              The calculator provides corresponding conversions in liters (502,654.82 L), US gallons (132,793.41 gal), and cubic feet (17,751.08 ft³).
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* 10. FAQS ACCORDION SECTION */}
      {/* ========================================================================= */}
      <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {volume_calculatorFaqs.map((faq, index) => {
            const isOpen = openFaqIndices.has(index);
            return (
              <div
                key={index}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center justify-between gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/50 dark:border-slate-700/50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. TRUST BLOCK / CONTENT NOTE */}
      {/* ========================================================================= */}
      <section className="p-4 sm:p-5 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-900 space-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h3 className="font-bold text-blue-950 dark:text-blue-200 text-xs sm:text-sm">
            Important: Volume Is Not the Same as Capacity in Every Context
          </h3>
        </div>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          In geometry, volume describes the three-dimensional space occupied by a solid. In tanks and containers, the word capacity often refers to how much liquid the container can hold. For partially filled containers, distinguish:
        </p>
        <ul className="text-xs text-slate-700 dark:text-slate-300 list-disc pl-5 space-y-1">
          <li><strong>Total tank capacity:</strong> maximum available internal volume (<span className="font-mono">V_total = l·w·h</span>)</li>
          <li><strong>Liquid volume:</strong> volume currently occupied by liquid (<span className="font-mono">V_liquid = l·w·d</span>)</li>
          <li><strong>Remaining air volume:</strong> unused internal space (<span className="font-mono">V_air = V_total - V_liquid</span>)</li>
        </ul>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
          Keeping these measurements separate avoids one of the most common errors in tank-capacity calculations.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 12. RELATED CALCULATORS — AFTER THE CONTENT */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Explore More Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <Link
            href="/calculators/surface-area-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Surface Area Calculator &amp; 3D Solids Net Suite</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Calculate exterior surface area for common three-dimensional solids.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/area-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Area Calculator &amp; 2D Geometry Suite</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Calculate the area of circles, rectangles, triangles and other 2D shapes used in geometry.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/density-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Density Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Use volume together with mass and density for material and physics calculations.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </article>
  );
}

export default VolumeContent;

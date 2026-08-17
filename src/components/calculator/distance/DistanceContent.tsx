"use client";

import React from "react";

export function DistanceContent() {
  return (
    <article className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-w-5xl mx-auto">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          1. Introduction to Distance &amp; Spatial Metrics
        </h2>
        <p>
          <strong>Distance</strong> is the quantitative measurement of how far apart two objects, coordinate locations, or geographical points are in physical space or abstract mathematical metric spaces. In the International System of Units (SI), distance is measured in <strong>meters (m)</strong> or <strong>kilometers (km)</strong>.
        </p>
        <p>
          Calculating spatial and geodesic distance is critical across flight planning, marine navigation, telematics, robotics, urban grid routing, and sports kinematics.
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          2. Core Distance Metrics &amp; Space Geometry
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Euclidean Space (L₂ Norm)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Straight-line distance between two points in 2D or 3D space: <strong>d = &radic;[(&Delta;x)&sup2; + (&Delta;y)&sup2; + (&Delta;z)&sup2;]</strong>.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Geodesic / Haversine (Curved Earth)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Great-circle shortest flight path distance over Earth&apos;s spherical surface between Latitude/Longitude coordinates.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Manhattan Metric (L₁ Norm)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              City block distance traveling only along orthogonal grid axes: <strong>d_M = |&Delta;x| + |&Delta;y|</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          3. Complete Distance Formulas Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3">Distance Type</th>
                <th className="p-3">Primary Distance Formula</th>
                <th className="p-3">Variable Definitions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
              <tr>
                <td className="p-3 font-bold font-sans">2D Euclidean Distance</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">d = &radic;[(x₂ - x₁)&sup2; + (y₂ - y₁)&sup2;]</td>
                <td className="p-3 font-sans">Coordinates (x₁, y₁) and (x₂, y₂)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">3D Spatial Distance</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">d = &radic;[(&Delta;x)&sup2; + (&Delta;y)&sup2; + (&Delta;z)&sup2;]</td>
                <td className="p-3 font-sans">3D Coordinates (x, y, z)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Haversine Great-Circle</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">d = 2R &middot; arcsin(&radic;[sin&sup2;(&Delta;&phi;/2) + cos(&phi;₁)cos(&phi;₂)sin&sup2;(&Delta;&lambda;/2)])</td>
                <td className="p-3 font-sans">Earth Radius R = 6,371 km, Lat (&phi;), Lon (&lambda;)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Kinematics Distance</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">d = s &times; t</td>
                <td className="p-3 font-sans">Speed (s), Time (t)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Point-to-Line Distance</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">d = |Ax₀ + By₀ + C| / &radic;(A&sup2; + B&sup2;)</td>
                <td className="p-3 font-sans">Point (x₀, y₀), Line Ax + By + C = 0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          4. How Step-by-Step Derivation Works
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 1: Coordinate Difference Calculation</h3>
            <p>Subtract point components to find orthogonal deltas: &Delta;x = x₂ - x₁ and &Delta;y = y₂ - y₁.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 2: Metric Power Sum &amp; Root Extraction</h3>
            <p>Square each delta, sum the squared deltas, and extract the square root: d = &radic;[(&Delta;x)&sup2; + (&Delta;y)&sup2;].</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 3: Multi-Unit Conversion</h3>
            <p>Convert calculated distance into Kilometers, Miles, Nautical Miles, Feet, and Inches.</p>
          </div>
        </div>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          5. Worked Step-by-Step Examples
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">
              Example 1: 2D Distance Between (0,0) and (3,4) [3-4-5 Right Triangle]
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> Find the distance between (0, 0) and (3, 4).
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              1. &Delta;x = 3 - 0 = 3, &Delta;y = 4 - 0 = 4.<br />
              2. d = &radic;[3&sup2; + 4&sup2;] = &radic;[9 + 16] = &radic;25 = 5.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">
              Example 2: Flight Distance New York to London (Haversine Formula)
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> Calculate Great-Circle flight distance between New York (40.7128&deg;N, 74.0060&deg;W) and London (51.5074&deg;N, 0.1278&deg;W).
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              1. Convert Lat/Lon to Radians.<br />
              2. Haversine component a = 0.0743.<br />
              3. Great-Circle Distance d = 6,371 &times; 0.5429 &approx; 3,459 miles (5,567 km).
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING & CONVERSION MATRIX */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          6. Common Distance Unit Conversion Reference Matrix
        </h2>
        <p className="text-xs">
          The reference table below lists standard conversion factors relative to 1 Meter (m):
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3">Unit Name</th>
                <th className="p-3">Meters (m)</th>
                <th className="p-3">Kilometers (km)</th>
                <th className="p-3">Miles (mi)</th>
                <th className="p-3">Nautical Miles (NM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
              <tr>
                <td className="p-2.5 font-bold font-sans">1 Meter (m)</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">1.0000</td>
                <td className="p-2.5">0.0010 km</td>
                <td className="p-2.5">0.000621 mi</td>
                <td className="p-2.5">0.000540 NM</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold font-sans">1 Kilometer (km)</td>
                <td className="p-2.5 font-bold">1,000 m</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">1.0000 km</td>
                <td className="p-2.5 font-bold">0.62137 mi</td>
                <td className="p-2.5">0.53996 NM</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold font-sans">1 Mile (mi)</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">1,609.34 m</td>
                <td className="p-2.5 font-bold">1.60934 km</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">1.0000 mi</td>
                <td className="p-2.5">0.86898 NM</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold font-sans">1 Nautical Mile (NM)</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">1,852.00 m</td>
                <td className="p-2.5 font-bold">1.85200 km</td>
                <td className="p-2.5 font-bold">1.15078 mi</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">1.0000 NM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          7. Common Pitfalls &amp; Frequent User Errors
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-xs">
          <li>
            <strong>Using Flat Cartesian Formulas for Global Distances:</strong> Using 2D Euclidean math on Lat/Lon coordinates produces massive errors because lines of longitude converge at the poles.
          </li>
          <li>
            <strong>Confusing Miles and Nautical Miles:</strong> 1 Nautical Mile = 1.15078 Statute Miles (a 15% difference in flight range).
          </li>
          <li>
            <strong>Averaging Speeds Incorrectly:</strong> Calculating average trip speed by taking (s₁ + s₂)/2 instead of Total Distance / Total Time.
          </li>
        </ul>
      </section>

      {/* 8. PRACTICAL APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          8. Practical &amp; Professional Applications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Aviation &amp; Maritime Flight Paths</h3>
            <p>Computing Great-Circle waypoint courses, initial compass headings, and fuel endurance limits.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">GIS &amp; GPS Telematics</h3>
            <p>Vehicle fleet tracking, geofencing radii, and nearest-neighbor spatial queries.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Athletics &amp; Marathon Pace Sizing</h3>
            <p>Sizing running splits (min/mile, min/km) and estimated finish times across marathon distances.</p>
          </div>
        </div>
      </section>

      {/* 9. RELATED CONCEPTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          9. Related Mathematical Concepts
        </h2>
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Slope Calculator
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Triangle Calculator
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Pythagorean Theorem Calculator
          </span>
        </div>
      </section>

      {/* 10. SUMMARY */}
      <section className="p-5 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h2 className="text-base font-bold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs text-slate-700 dark:text-slate-300">
          Distance measures spatial separation across 2D/3D Euclidean coordinate planes, Haversine spherical Earth surfaces, and kinematic speed-time relationships. Through Pythagorean integration and Haversine trigonometry, distances can be converted into Miles, Kilometers, Feet, and Nautical Miles.
        </p>
      </section>
    </article>
  );
}

export default DistanceContent;

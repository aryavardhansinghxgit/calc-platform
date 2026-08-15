"use client";

import React from "react";

export function HalfLifeContent() {
  return (
    <div className="space-y-8 text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
      {/* SECTION 1: WHAT IS HALF-LIFE */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          1. What is Half-Life? (Radioactive &amp; Biological Decay)
        </h2>
        <p className="text-sm leading-relaxed">
          The <strong>half-life</strong> (symbolized as <code>t½</code> or <code>t₁/₂</code>) is defined as the time required for a quantity of a substance undergoing exponential decay to decrease to exactly half of its initial value. 
        </p>
        <p className="text-sm leading-relaxed">
          The concept originated in nuclear physics to describe the unstable atomic nuclei of radioactive isotopes (such as Carbon-14 or Uranium-238). However, half-life principles apply universally across pharmacology (drug elimination half-life), environmental science (pollutant degradation), and financial modeling (depreciation).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Physical Half-Life</h3>
            <p className="leading-relaxed font-medium">
              The fixed time required for half of the radioactive nuclei in a sample to spontaneously decay into daughter nuclides. It is unaffected by temperature, pressure, or chemical bonds.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Biological Half-Life</h3>
            <p className="leading-relaxed font-medium">
              The time required for an organism or human body to metabolize and excrete 50% of an administered drug or substance through renal or hepatic pathways.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Effective Half-Life</h3>
            <p className="leading-relaxed font-medium">
              Combines both physical decay and biological clearance in nuclear medicine: <code>1/t_eff = 1/t_phys + 1/t_biol</code>.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE FORMULAS EXPLAINED */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          2. The Half-Life Formulas Explained
        </h2>
        <p className="text-sm leading-relaxed">
          Exponential decay can be modeled using three equivalent mathematical formulations:
        </p>

        <div className="space-y-3 text-xs font-medium">
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-1 text-blue-700 dark:text-blue-400 font-sans tabular-nums">
            <h3 className="font-bold text-sm">Base-1/2 Exponential Form</h3>
            <div>{"N(t) = N₀ × (1/2)^(t / t½)"}</div>
            <p className="text-slate-700 dark:text-slate-300 pt-1">
              Where <strong>N(t)</strong> is the remaining quantity at time <strong>t</strong>, <strong>N₀</strong> is the initial starting quantity, and <strong>t½</strong> is the half-life period.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1 font-sans tabular-nums">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Natural Exponential Form</h3>
            <div>{"N(t) = N₀ × e^(-λt)"}</div>
            <p className="text-slate-700 dark:text-slate-300 pt-1">
              Where <strong>λ</strong> (lambda) is the decay constant, representing the probability of a nucleus decaying per unit time.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1 font-sans tabular-nums">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Relationship Between Constants</h3>
            <div>{"t½ = ln(2) / λ ≈ 0.693147 / λ"}</div>
            <div>{"τ (Mean Lifetime) = 1 / λ = t½ / ln(2) ≈ 1.4427 × t½"}</div>
          </div>
        </div>
      </section>

      {/* SECTION 3: COMMON APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          3. Real-World Applications of Half-Life
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Radiocarbon Dating (Carbon-14)</h3>
            <p className="leading-relaxed">
              Archaeologists measure the remaining ratio of Carbon-14 (t½ = 5,730 years) to Carbon-12 in organic fossils and ancient wood artifacts to determine age up to 50,000 years.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Nuclear Medicine (Technetium-99m &amp; Iodine-131)</h3>
            <p className="leading-relaxed">
              Short-lived radiopharmaceuticals like Technetium-99m (t½ = 6 hours) allow diagnostic organ imaging with minimal long-term radiation exposure to patients.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Pharmacokinetics &amp; Drug Dosing</h3>
            <p className="leading-relaxed">
              Medical clinicians use drug elimination half-life to schedule repeated doses so that blood plasma concentrations stay within the therapeutic window.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Nuclear Waste &amp; Environmental Safety</h3>
            <p className="leading-relaxed">
              Evaluating long-term storage containment facilities for hazardous fission products like Cesium-137 (t½ = 30.17 years) and Plutonium-239 (t½ = 24,100 years).
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: ISOTOPE REFERENCE TABLE */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          4. Isotope Reference Table
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <table className="w-full text-left border-collapse text-xs font-sans tabular-nums font-bold">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">
                <th className="p-3">Isotope Name</th>
                <th className="p-3">Half-Life Value</th>
                <th className="p-3">Decay Mode</th>
                <th className="p-3">Primary Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {[
                { name: "Carbon-14 (C-14)", half: "5,730 years", mode: "Beta-minus (β⁻)", app: "Archaeological organic dating" },
                { name: "Uranium-238 (U-238)", half: "4.468 billion years", mode: "Alpha (α)", app: "Geological rock dating & nuclear power" },
                { name: "Iodine-131 (I-131)", half: "8.02 days", mode: "Beta-minus & Gamma", app: "Thyroid cancer therapy" },
                { name: "Cesium-137 (Cs-137)", half: "30.17 years", mode: "Beta-minus & Gamma", app: "Industrial sensors & fallout tracing" },
                { name: "Radium-226 (Ra-226)", half: "1,600 years", mode: "Alpha (α)", app: "Historical paint & brachytherapy" },
                { name: "Technetium-99m (Tc-99m)", half: "6.006 hours", mode: "Gamma (γ)", app: "SPECT diagnostic medical scans" },
                { name: "Tritium (H-3)", half: "12.32 years", mode: "Beta-minus (β⁻)", app: "Fusion research & luminous dials" },
                { name: "Radon-222 (Rn-222)", half: "3.823 days", mode: "Alpha (α)", app: "Indoor air quality monitoring" }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 text-slate-900 dark:text-slate-100">{row.name}</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400">{row.half}</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">{row.mode}</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">{row.app}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default HalfLifeContent;

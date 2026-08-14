import React from "react";

export function MolarityContent() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-700 dark:text-zinc-300">
      {/* 1. FUNDAMENTAL CONCEPTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          Fundamental Concepts of Chemical Concentration
        </h2>
        <p className="leading-relaxed">
          In solution chemistry, concentration quantifies the amount of solute dissolved within a given volume or mass of solvent. Understanding chemical solutions requires mastering four fundamental pillars:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-1">
            <h4 className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">Solute</h4>
            <p className="leading-relaxed">
              The chemical substance that is dissolved (e.g., solid <span className="font-mono">NaCl</span> salt or pure acetic acid).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-1">
            <h4 className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">Solvent</h4>
            <p className="leading-relaxed">
              The liquid medium in which the solute dissolves (most commonly deionized water, <span className="font-mono">H₂O</span>).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-1">
            <h4 className="font-extrabold text-purple-600 dark:text-purple-400 text-sm">Solution</h4>
            <p className="leading-relaxed">
              The homogeneous mixture resulting from the complete dissolution of solute within the solvent.
            </p>
          </div>
        </div>

        <p className="leading-relaxed text-xs">
          <strong>The Mole &amp; Avogadro&apos;s Number:</strong> A mole is the fundamental SI unit for the amount of substance, defined as exactly <strong>6.02214076 × 10²³</strong> elementary entities (atoms, molecules, or ions). 
          <strong> Molarity (M)</strong> measures the number of moles of solute contained in exactly one liter (1.0 L) of final solution (<span className="font-mono">mol/L</span>).
        </p>
      </section>

      {/* 2. CORE MATHEMATICAL FORMULAS */}
      <section className="space-y-4 border-t border-slate-200 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          The Core Mathematical Formulas for Solution Chemistry
        </h2>
        <p className="leading-relaxed">
          Quantitative solution preparation relies on four core mathematical equations:
        </p>

        {/* Math Formula Cards */}
        <div className="space-y-3 my-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 font-mono text-xs space-y-1">
            <span className="text-slate-500 font-bold block text-[10px] uppercase">1. Primary Molarity Equation:</span>
            <div className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">
              Molarity (M) = Moles of Solute (n) / Volume of Solution in Liters (V)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 font-mono text-xs space-y-1">
            <span className="text-slate-500 font-bold block text-[10px] uppercase">2. Solute Mass Preparation Equation:</span>
            <div className="text-blue-600 dark:text-blue-400 font-extrabold text-sm">
              Mass (g) = Molarity (M) × Volume (L) × Molar Mass (g/mol)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 font-mono text-xs space-y-1">
            <span className="text-slate-500 font-bold block text-[10px] uppercase">3. Stock Dilution Law Equation:</span>
            <div className="text-purple-600 dark:text-purple-400 font-extrabold text-sm">
              C₁ · V₁ = C₂ · V₂   or   M₁ · V₁ = M₂ · V₂
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 font-mono text-xs space-y-1">
            <span className="text-slate-500 font-bold block text-[10px] uppercase">4. Mass Percentage to Molarity Conversion:</span>
            <div className="text-amber-600 dark:text-amber-400 font-extrabold text-sm">
              Molarity (M) = [Mass % × Density (g/mL) × 10] / Molar Mass (g/mol)
            </div>
          </div>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 dark:text-zinc-100 pt-2">
          Step-by-Step Solute Mass Calculation Example
        </h3>
        <p className="leading-relaxed text-xs">
          Suppose you need to prepare <strong>500 mL (0.500 L)</strong> of a <strong>0.250 M</strong> Sodium Chloride solution (<span className="font-mono">NaCl</span>, formula weight <strong>58.44 g/mol</strong>):
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 font-mono text-xs space-y-2">
          <p className="text-slate-700 dark:text-zinc-300">
            Solute Mass (g) = Molarity (mol/L) × Volume (L) × Molar Mass (g/mol)
          </p>
          <p className="text-slate-700 dark:text-zinc-300">
            Solute Mass (g) = 0.250 mol/L × 0.500 L × 58.44 g/mol
          </p>
          <p className="text-emerald-600 dark:text-emerald-400 font-black text-sm">
            Solute Mass = 7.305 grams of NaCl
          </p>
        </div>
      </section>

      {/* 3. COMPARISON REFERENCE TABLE */}
      <section className="space-y-4 border-t border-slate-200 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          Molarity vs. Molality vs. Normality Comparison Table
        </h2>
        <p className="leading-relaxed">
          Comparison matrix of chemical concentration measurement units:
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-zinc-800">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-bold">
              <tr>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Concentration Unit</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Symbol</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Mathematical Definition</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Temperature Dependent?</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-emerald-600">Molarity</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">M</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">moles solute / L solution</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 text-rose-600 font-bold">Yes (Volumetric expansion)</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-blue-600">Molality</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">m</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">moles solute / kg solvent</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 text-emerald-600 font-bold">No (Mass invariant)</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-purple-600">Normality</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">N</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">equivalents solute / L solution</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 text-rose-600 font-bold">Yes</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-amber-600">Mass Concentration</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">g/L or mg/mL</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">mass solute / L solution</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 text-rose-600 font-bold">Yes</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-teal-600">Parts Per Million</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">PPM</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">mg solute / L water (1 ppm ≈ 1 mg/L)</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">Negligible in dilute water</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. LABORATORY BEST PRACTICES */}
      <section className="space-y-4 border-t border-slate-200 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          Essential Laboratory Protocols &amp; Best Practices
        </h2>
        <p className="leading-relaxed">
          Preparing accurate chemical solutions requires strict adherence to volumetric laboratory protocols:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs my-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-extrabold text-amber-600 dark:text-amber-400 text-sm">Volumetric Expansion &amp; Order of Mixing</h4>
            <p className="leading-relaxed">
              <strong>Never add solvent to final volume first!</strong> Dissolving solid solute causes volume expansion or contraction. Always dissolve solute in ~70–80% of final solvent volume before bringing to the meniscus mark.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-extrabold text-rose-600 dark:text-rose-400 text-sm">The &quot;Acid to Water&quot; Safety Rule</h4>
            <p className="leading-relaxed">
              <strong>Always add acid to water (AA), never water to acid!</strong> Concentrated acids release extreme exothermic heat upon hydration. Adding water directly into concentrated acid can cause violent boiling and hazardous splattering.
            </p>
          </div>
        </div>
      </section>

      {/* 5. HYDRATES & STOCK ACIDS */}
      <section className="space-y-4 border-t border-slate-200 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          Working with Hydrates &amp; Commercial Stock Acids
        </h2>
        <p className="leading-relaxed">
          Concentrations of common concentrated commercial stock acid reagents:
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-zinc-800 font-mono">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-bold">
              <tr>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Commercial Reagent Acid</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Formula</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Mass % (w/w)</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Density (g/mL)</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Stock Molarity (M)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">Hydrochloric Acid (Concentrated)</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">HCl</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">37.0%</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">1.19 g/mL</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 text-emerald-600 font-bold">12.1 M</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">Sulfuric Acid (Concentrated)</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">H2SO4</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">96.0%</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">1.84 g/mL</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 text-emerald-600 font-bold">18.0 M (36.0 N)</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">Nitric Acid (Concentrated)</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">HNO3</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">70.0%</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">1.42 g/mL</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 text-emerald-600 font-bold">15.8 M</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">Acetic Acid Glacial</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">CH3COOH</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">99.7%</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">1.05 g/mL</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 text-emerald-600 font-bold">17.4 M</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. TEMPERATURE DEPENDENCE */}
      <section className="space-y-4 border-t border-slate-200 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          Temperature Dependence &amp; Volumetric Glassware Calibration
        </h2>
        <p className="leading-relaxed text-xs">
          Volumetric laboratory glassware (Class A Volumetric Flasks) is calibrated at standard <strong>20°C (68°F)</strong>. Because aqueous liquids undergo thermal expansion (~0.02% per °C), preparing solutions at non-ambient temperatures introduces systematic volumetric error. High-precision analytical titrations should always allow solutions to thermalize to 20°C before final volume adjustment.
        </p>
      </section>
    </article>
  );
}

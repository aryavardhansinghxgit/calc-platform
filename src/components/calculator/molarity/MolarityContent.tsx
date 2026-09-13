"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, Beaker, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { molarity_calculatorFaqs } from "@/app/calculators/molarity-calculator/faq";

export function MolarityContent() {
  // All 11 FAQs open by default for complete SSR visibility & SEO crawlability
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 11 }, (_, i) => i))
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
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. EXPANDED MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Molarity: The Core Idea Behind Solution Concentration
          </h2>
          <p>
            Molarity is one of the most commonly used ways to describe the concentration of a chemical solution. It tells you how much substance is present in a given volume of the final solution.
          </p>
          <p>
            In practical laboratory work, molarity is used when preparing standards, making buffers and reagents, performing dilutions, calculating reaction quantities, and interpreting concentrations in analytical chemistry.
          </p>
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-xs space-y-2 my-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              Fundamental Concentration Relationship
            </span>
            <div className="text-base font-extrabold text-blue-600 dark:text-blue-400">
              M = n / V
            </div>
            <p className="text-slate-600 dark:text-zinc-400 text-xs">
              where <strong>M</strong> = molarity (amount concentration in mol/L), <strong>n</strong> = amount of solute in moles, and <strong>V</strong> = volume of the final solution in liters.
            </p>
          </div>

          <p>
            IUPAC&apos;s current terminology calls this quantity <em>amount concentration</em>, while &ldquo;molarity&rdquo; remains a very common practical term and <span className="font-sans font-bold">M</span> is commonly used for mol/L.
          </p>
          <p>
            This Molarity Calculator extends that basic equation into a practical solution-preparation tool. You can solve for molarity, solute mass, solution volume or molar mass; account for hydrates; solve stock dilutions; convert mass percentage to molarity; and convert dilute aqueous PPM/PPB concentrations to molarity and molality.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is Molarity?
          </h2>
          <p>
            Molarity describes the amount of solute per unit volume of the final solution. For example, a 1.0 M sodium chloride solution contains approximately 1.0 mole of NaCl for every liter of final solution.
          </p>
          <p>
            The important word is <strong>final</strong>. If you are preparing 1 L of a 1 M solution, the goal is not necessarily to dissolve the calculated solid in exactly 1 L of water. You dissolve the solute and then bring the solution to a final volume of 1 L.
          </p>
          <p>
            That distinction matters because adding a solute can change the volume of the resulting solution. IUPAC defines amount concentration in terms of amount of substance divided by the volume of the mixture or solution.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            The Molarity Formula
          </h2>
          <p>
            The fundamental equation is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/80 rounded-lg border border-slate-200 dark:border-zinc-700 font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400 text-sm">
            M = n / V
          </div>
          <p>
            Because the number of moles can be calculated from mass and molar mass,
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/80 rounded-lg border border-slate-200 dark:border-zinc-700 font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400 text-sm">
            n = m / MW
          </div>
          <p>
            the molarity equation becomes:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/80 rounded-lg border border-slate-200 dark:border-zinc-700 font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400 text-sm">
            M = m / (MW × V)
          </div>
          <p>
            where <em>m</em> = solute mass in grams, <em>MW</em> = molar mass in g/mol, and <em>V</em> = final solution volume in liters.
          </p>
          <p>
            This gives the four-way relationship used by the calculator. From the same relationship you can solve for any one unknown:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-1 font-sans tabular-nums text-xs">
              <span className="font-extrabold uppercase text-[10px] text-slate-500 dark:text-zinc-400">Solve For Mass</span>
              <div className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                m = M × MW × V
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-1 font-sans tabular-nums text-xs">
              <span className="font-extrabold uppercase text-[10px] text-slate-500 dark:text-zinc-400">Solve For Volume</span>
              <div className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                V = m / (M × MW)
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-1 font-sans tabular-nums text-xs">
              <span className="font-extrabold uppercase text-[10px] text-slate-500 dark:text-zinc-400">Solve For Molar Mass</span>
              <div className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                MW = m / (M × V)
              </div>
            </div>
          </div>

          <p>
            This is why the calculator can work in both directions instead of only answering &ldquo;What is the molarity?&rdquo;
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Calculate Molarity From Mass and Volume
          </h2>
          <p>To calculate molarity from a measured mass:</p>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong>Step 1: Determine the moles:</strong> <span className="font-sans font-bold">n = m / MW</span>
            </li>
            <li>
              <strong>Step 2: Convert final solution volume to liters:</strong> For example, <span className="font-sans">500 mL = 0.500 L</span>.
            </li>
            <li>
              <strong>Step 3: Divide moles by final volume:</strong> <span className="font-sans font-bold">M = n / V</span>
            </li>
          </ul>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-1.5 font-sans tabular-nums text-xs mt-3">
            <span className="font-bold text-slate-700 dark:text-zinc-300 block">Example Calculation:</span>
            <p>Suppose you have: NaCl mass = 58.44 g, NaCl molar mass = 58.44 g/mol, final solution volume = 1.00 L.</p>
            <p>The number of moles is: n = 58.44 / 58.44 = 1.000 mol.</p>
            <p className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
              Therefore: M = 1.000 / 1.00 = 1.000 M
            </p>
          </div>
          <p className="text-xs text-slate-600 dark:text-zinc-400">
            The calculator&apos;s NaCl example uses this same relationship. NIST lists sodium chloride with a molecular weight of 58.443 in its Chemistry WebBook.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Worked Example: How Much NaCl Is Needed for 0.250 M?
          </h2>
          <p>
            A very common laboratory question is: <em>How many grams of NaCl are needed to prepare 500 mL of a 0.250 M solution?</em>
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2 font-sans tabular-nums text-xs">
            <p>Given: M = 0.250 mol/L, V = 0.500 L, MW = 58.44 g/mol</p>
            <p>Formula: m = M × V × MW</p>
            <p>Calculation: m = (0.250) × (0.500) × (58.44)</p>
            <p className="text-base font-black text-blue-600 dark:text-blue-400">
              m = 7.305 g of NaCl
            </p>
          </div>
          <p>
            The calculator reproduces this result and the QA suite independently verified it.
          </p>
          <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/50 text-xs space-y-1">
            <span className="font-bold text-blue-900 dark:text-blue-300 block">Practical Preparation Guidance:</span>
            <p className="leading-relaxed">
              For accurate volumetric preparation, weigh approximately 7.305 g of NaCl, dissolve it in an appropriate portion of water (~350–400 mL), transfer the solution to the volumetric flask, rinse the transfer beaker, and bring the solution to the final 500 mL meniscus mark. Do not interpret &ldquo;500 mL of solution&rdquo; as &ldquo;500 mL of water plus the salt.&rdquo;
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Molarity and Moles Are Not the Same Thing
          </h2>
          <p>
            A mole measures an <strong>amount of substance</strong> (exactly 6.02214076 × 10²³ elementary entities). Molarity measures the <strong>amount of substance per volume of solution</strong>.
          </p>
          <p>
            For example, <em>1 mole NaCl</em> is an amount (58.44 g). But <em>1 M NaCl</em> is a concentration (1 mole per liter of final solution). This distinction becomes critical whenever volume changes, because the amount of solute and the concentration are different physical quantities.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Choosing the Correct Units
          </h2>
          <p>
            Many incorrect molarity calculations are caused not by the formula but by unit mismatches. The calculator supports:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700">
              <strong>Mass:</strong> g, mg, μg, kg
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700">
              <strong>Volume:</strong> L, mL, μL
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700">
              <strong>Concentration:</strong> M, mM, μM
            </div>
          </div>
          <p>
            Before applying <span className="font-sans font-bold">M = m / (MW × V)</span>, quantities must be normalized. For example, 100 mL = 0.100 L and 1000 mg = 1.000 g. A factor-of-1000 conversion error can turn a correct equation into a completely wrong concentration.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Molar Mass Is the Bridge Between Mass and Moles
          </h2>
          <p>
            Molar mass connects a measured mass to the chemical amount in moles: <span className="font-sans font-bold">n = m / MW</span>. That is why the correct molecular or formula mass is critical.
          </p>
          <p>
            For sodium chloride, NIST lists 58.443 as the molecular weight in its Chemistry WebBook. For a simple compound, the molar mass is obtained from the chemical formula and atomic masses of constituent elements.
          </p>
          <p>
            For complicated chemical formulas, you can first use the{" "}
            <Link href="/calculators/molecular-weight-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Molecular Weight Calculator
            </Link>{" "}
            to determine the formula mass before entering it here.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Hydrates: Why the Formula Weight Can Change
          </h2>
          <p>
            Some compounds are supplied or weighed as hydrates containing water of crystallization. A general hydrate is written as <span className="font-sans">compound · nH₂O</span>. Its effective formula mass is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/80 rounded-lg border border-slate-200 dark:border-zinc-700 font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400 text-xs sm:text-sm">
            MW_hydrate = MW_anhydrous + n × MW_H2O
          </div>
          <p>
            The calculator represents this using a hydrate-water increment (where each bound water molecule contributes approximately 18.01528 g/mol). For example, moving from anhydrous copper(II) sulfate (159.60 g/mol) to copper(II) sulfate pentahydrate adds 5 × 18.01528 = 90.076 g/mol, yielding 249.68 g/mol.
          </p>
          <p>
            <strong>Practical rule:</strong> Use the formula mass of the material you will actually weigh. Do not automatically substitute the anhydrous molar mass for a hydrate.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is a Dilution?
          </h2>
          <p>
            Dilution reduces the concentration of a solution by adding solvent while retaining the same amount of dissolved solute. For an idealized dilution relationship:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/80 rounded-lg border border-slate-200 dark:border-zinc-700 font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400 text-sm">
            C₁V₁ = C₂V₂   (or M₁V₁ = M₂V₂)
          </div>
          <p>
            where <em>C₁</em> = initial stock concentration, <em>V₁</em> = volume of stock used, <em>C₂</em> = final diluted concentration, and <em>V₂</em> = final solution volume. The underlying physical principle is conservation of solute: <span className="font-sans font-bold">n₁ = n₂</span>.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Use the C₁V₁ = C₂V₂ Dilution Calculator
          </h2>
          <p>
            Suppose a stock solution is C₁ = 10 M, and you want to prepare C₂ = 1 M with a final volume of V₂ = 100 mL. Solve for V₁:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-1.5 font-sans tabular-nums text-xs">
            <p>V₁ = (C₂ × V₂) / C₁</p>
            <p>V₁ = (1 M × 100 mL) / 10 M</p>
            <p className="text-base font-black text-emerald-600 dark:text-emerald-400">
              V₁ = 10 mL
            </p>
          </div>
          <p>
            Therefore, 10 mL of the concentrated stock solution is required, and 90 mL of solvent is added to reach a final volume of 100 mL under the ideal dilution relationship.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            A Critical Dilution Check: C₂ Cannot Exceed C₁
          </h2>
          <p>
            A dilution decreases or, in the limiting case, maintains concentration. Therefore:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/80 rounded-lg border border-slate-200 dark:border-zinc-700 font-sans tabular-nums font-bold text-amber-600 dark:text-amber-400 text-sm">
            C₂ ≤ C₁  (for a conventional dilution operation)
          </div>
          <p>
            If you start with C₁ = 1 M, you cannot obtain C₂ = 10 M by adding solvent. That would be a concentration increase rather than a dilution.
          </p>
          <p>
            The calculator explicitly identifies this condition and suppresses the impossible preparation protocol. Equal concentrations are also handled separately: when C₁ = C₂, no solvent dilution is required.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Important Note About Final Volume and Solvent Volume
          </h2>
          <p>
            In simple dilution calculations, you often see <span className="font-sans font-bold">V_solvent ≈ V₂ - V₁</span>. This is a useful preparation approximation, but it should not be interpreted as a universal exact volume-additivity law for every solution.
          </p>
          <p>
            The most reliable laboratory instruction is generally to use the appropriate volumetric procedure: transfer the calculated stock amount and bring the solution to the specified final meniscus volume. This becomes particularly important with concentrated mineral acids where exothermic dissolution causes volume contraction.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Mass Percentage to Molarity
          </h2>
          <p>
            For a commercial liquid reagent described by mass percentage and density, the calculator converts the concentration into molarity using:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/80 rounded-lg border border-slate-200 dark:border-zinc-700 font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400 text-xs sm:text-sm">
            M = [Mass % × Density (g/mL) × 10] / Molar Mass (g/mol)
          </div>
          <p>
            The factor of 10 comes from converting the percentage and density units into grams of solute per liter. For example, concentrated hydrochloric acid (37% w/w, density 1.19 g/mL, MW 36.46 g/mol) yields:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/80 rounded-lg border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-xs">
            M = (37 × 1.19 × 10) / 36.46 = <strong>12.0762 M (~12.1 M)</strong>
          </div>
          <p>
            When the conversion starts from mass percentage, the{" "}
            <Link href="/calculators/density-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Density Calculator
            </Link>{" "}
            can be useful when you need to determine a missing density, mass or volume.
          </p>
          <p>
            When working with percentage-based inputs, the{" "}
            <Link href="/calculators/percentage-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Percentage Calculator
            </Link>{" "}
            can help verify the percentage arithmetic before completing the concentration calculation.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Molarity vs. Molality
          </h2>
          <p>
            Molarity and molality are often confused because their names are similar:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400 block text-sm">Molarity (M)</span>
              <p>M = moles of solute / liters of solution</p>
              <p className="text-slate-500 text-[11px]">Denominator is solution volume (temperature-dependent).</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400 block text-sm">Molality (m)</span>
              <p>m = moles of solute / kilograms of solvent</p>
              <p className="text-slate-500 text-[11px]">Denominator is solvent mass (temperature-invariant).</p>
            </div>
          </div>
          <p>
            IUPAC defines amount concentration using volume and molality using the amount of substance divided by solvent mass. Because liquids expand with temperature, molality is preferred for physical chemistry studies like colligative properties.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Temperature Matters for Molarity
          </h2>
          <p>
            Molarity uses solution volume in the denominator: <span className="font-sans font-bold">M = n / V</span>. Because volume changes with temperature, the numerical molarity of a solution changes with temperature even when solute amount remains constant.
          </p>
          <p>
            Standard laboratory volumetric glassware (Class A) is calibrated at standard 20°C (68°F). For high-precision analytical work, solutions should be thermalized to 20°C before final meniscus volume adjustment.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Normality and Equivalence Factor
          </h2>
          <p>
            The calculator also supports normality in the mass-percent conversion workflow:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/80 rounded-lg border border-slate-200 dark:border-zinc-700 font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400 text-sm">
            N = M × n
          </div>
          <p>
            where <em>n</em> is the selected equivalence factor. For example, for 1.0 M sulfuric acid (diprotic acid, n = 2), normality is 2.0 N for acid-base neutralizations. Because equivalence depends on the particular chemical reaction, normality is reaction-dependent.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            PPM and PPB to Molarity
          </h2>
          <p>
            For dilute aqueous solutions, PPM is conveniently expressed as approximately <span className="font-sans font-bold">1 ppm ≈ 1 mg/L</span> under the usual dilute-water approximation.
          </p>
          <p>
            To convert dilute aqueous concentration into molarity:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/80 rounded-lg border border-slate-200 dark:border-zinc-700 font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400 text-xs sm:text-sm">
            M = (ppm × 10⁻³) / MW
          </div>
          <p>
            For 500 ppm NaCl (MW 58.44 g/mol), the concentration is 0.500 g/L, which yields M = 0.500 / 58.44 = <strong>0.008556 M</strong>.
          </p>
          <p className="text-xs text-slate-600 dark:text-zinc-400">
            <strong>Important limitation:</strong> The shortcut 1 ppm ≈ 1 mg/L is not a universal law for every medium. For non-aqueous solvents or dense brines, use the mass-based definition.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            PPM vs. PPB
          </h2>
          <p>
            The basic scale relationship is <span className="font-sans font-bold">1 ppm = 1000 ppb</span>. Therefore, 500 ppb = 0.500 ppm. Always verify whether concentration is specified on a mass-per-mass or mass-per-volume basis before converting.
          </p>
        </section>

        {/* Section 20 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How the Calculator Handles Density
          </h2>
          <p>
            Density connects mass percentage to volume. The calculator keeps reagent density and solvent density completely separate so that the reagent density used for concentrated acids cannot accidentally contaminate the PPM/molality calculation. That state isolation is an integral part of this calculator&apos;s validated architecture.
          </p>
        </section>

        {/* Section 21 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Preparing a Solution From a Calculated Mass
          </h2>
          <p>A typical gravimetric solution preparation sequence in the laboratory involves:</p>
          <ol className="space-y-1.5 list-decimal pl-5 text-xs">
            <li>Calculate the required mass using the calculator.</li>
            <li>Weigh the solute on an analytical balance using a weigh boat.</li>
            <li>Transfer the solute to a beaker and dissolve in ~70–80% of total solvent.</li>
            <li>Transfer quantitatively to a Class A volumetric flask.</li>
            <li>Rinse the beaker and transfer washings to the flask.</li>
            <li>Add deionized water until the bottom of the meniscus touches the calibration line.</li>
            <li>Stopper and invert 10–15 times to ensure complete mixing.</li>
          </ol>
        </section>

        {/* Section 22 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Safe Dilution of Concentrated Acids
          </h2>
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              Safety Rule: Always Add Acid to Water (AA)
            </div>
            <p className="leading-relaxed">
              Diluting concentrated acids (such as sulfuric acid or hydrochloric acid) releases extreme exothermic hydration heat. The American Chemical Society (ACS) specifically recommends slowly adding acid to water while stirring. Never pour water into concentrated acid, as localized boiling can cause corrosive splattering.
            </p>
          </div>
        </section>

        {/* Section 23 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Common Molarity Calculation Mistakes
          </h2>
          <ul className="space-y-2 list-disc pl-5 text-xs">
            <li><strong>Using milliliters instead of liters:</strong> 250 mL is 0.250 L, not 250 L.</li>
            <li><strong>Using the anhydrous molar mass for a hydrate:</strong> Hydrates have a significantly higher formula weight due to crystallization water.</li>
            <li><strong>Using solvent volume instead of final solution volume:</strong> Adding 1 L of water to solute does not yield 1 L of solution due to dissolution volume change.</li>
            <li><strong>Confusing molarity and molality:</strong> Molarity uses liters of solution; molality uses kilograms of solvent.</li>
            <li><strong>Forgetting density in mass percent conversions:</strong> Mass percentage alone cannot yield molarity without solution density.</li>
            <li><strong>Attempting to dilute to a higher concentration:</strong> Dilution cannot produce C₂ &gt; C₁.</li>
          </ul>
        </section>

        {/* Section 24 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            A Practical Way to Check Your Answer
          </h2>
          <p>
            A quick dimensional check can catch most calculation mistakes:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/80 rounded-lg border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-xs space-y-1">
            <p><strong>Mass check:</strong> [mol/L] × [L] × [g/mol] = grams (g)</p>
            <p><strong>Dilution check:</strong> C₁V₁ = C₂V₂ (moles on left equal moles on right)</p>
            <p><strong>PPM check:</strong> [g/L] / [g/mol] = mol/L (M)</p>
          </div>
        </section>

        {/* Section 25 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            When to Use a Molarity Calculator
          </h2>
          <p>A molarity calculator is especially useful when:</p>
          <ul className="space-y-1.5 list-disc pl-5 text-xs">
            <li>Preparing standard solutions from solid dry reagents.</li>
            <li>Calculating dilution volumes from stock reagents via C₁V₁ = C₂V₂.</li>
            <li>Converting commercial acid reagent bottles (mass % and density) to working molarities.</li>
            <li>Working with trace environmental concentrations (PPM / PPB).</li>
            <li>Weighing hydrated salts with multiple crystallization water molecules.</li>
            <li>Reverse-calculating volume or molecular mass from known solution parameters.</li>
          </ul>
        </section>

        {/* Section 26 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            A Simple Workflow for Accurate Use
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700">
              <strong>1. Identify the chemical:</strong> Match formula and hydrate state.
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700">
              <strong>2. Confirm molar mass:</strong> Verify anhydrous vs. hydrated formula weight.
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700">
              <strong>3. Normalize units:</strong> Verify L vs. mL and g vs. mg.
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700">
              <strong>4. Choose calculation mode:</strong> Standard prep, dilution, mass %, or PPM.
            </div>
          </div>
        </section>

        {/* Section 27 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Calculator Limitations and Scientific Scope
          </h2>
          <p>
            This calculator is designed to perform concentration calculations consistently and transparently. Key scope considerations include:
          </p>
          <ul className="space-y-1.5 list-disc pl-5 text-xs">
            <li>Assumes aqueous solvents with Class A volumetric calibration at standard 20°C.</li>
            <li>Dilution assumes ideal volumetric additivity, valid for dilute aqueous solutions.</li>
            <li>Normality requires selecting the appropriate reaction-specific equivalence factor.</li>
            <li>PPM conversion applies the dilute aqueous approximation (1 ppm ≈ 1 mg/L).</li>
          </ul>
          <p className="text-xs">
            The calculator should be used as a calculation and preparation-support tool, while experimental standard operating procedures (SOPs) and safety data sheets (SDSs) govern actual laboratory practice.
          </p>
        </section>

        {/* Scientific References */}
        <section className="space-y-3 pt-6">
          <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2 text-xs">
            <span className="font-bold uppercase tracking-wider text-slate-900 dark:text-zinc-100 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Scientific Reference Notes
            </span>
            <p className="leading-relaxed">
              Terminology and concentration definitions are based on current International Union of Pure and Applied Chemistry (IUPAC) Compendium of Chemical Terminology (Gold Book). Chemical molecular weights and densities referenced in our verified database adhere to National Institute of Standards and Technology (NIST) Chemistry WebBook (e.g., NaCl MW = 58.443 g/mol). Concentrated acid handling guidelines conform to American Chemical Society (ACS) laboratory safety protocols.
            </p>
          </div>
        </section>
      </div>

      {/* 2. FREQUENTLY ASKED QUESTIONS (11 Approved FAQs, Open by Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {molarity_calculatorFaqs.map((faq, idx) => {
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
    </article>
  );
}

export default MolarityContent;

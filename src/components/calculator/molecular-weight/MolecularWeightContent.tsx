"use client";

import React, { useState } from "react";
import { PERIODIC_TABLE_ELEMENTS } from "@/app/calculators/molecular-weight-calculator/periodic-table";
import { ElementData } from "@/app/calculators/molecular-weight-calculator/types";
import { Atom, Info, Sparkles, Filter } from "lucide-react";

// Category styling map
const CATEGORY_MAP: Record<string, { label: string; bg: string; text: string; border: string }> = {
  nonmetal: { label: "Reactive Nonmetal", bg: "bg-emerald-500/15 dark:bg-blue-50/60", text: "text-blue-600 dark:text-blue-400", border: "border-emerald-300 dark:border-emerald-800" },
  noble: { label: "Noble Gas", bg: "bg-purple-500/15 dark:bg-blue-50/60", text: "text-blue-600 dark:text-blue-400", border: "border-purple-300 dark:border-purple-800" },
  alkali: { label: "Alkali Metal", bg: "bg-rose-500/15 dark:bg-blue-50/60", text: "text-blue-600 dark:text-blue-400", border: "border-rose-300 dark:border-rose-800" },
  alkaline: { label: "Alkaline Earth Metal", bg: "bg-amber-500/15 dark:bg-blue-50/60", text: "text-blue-600 dark:text-blue-400", border: "border-amber-300 dark:border-amber-800" },
  metalloid: { label: "Metalloid", bg: "bg-teal-500/15 dark:bg-blue-50/60", text: "text-blue-600 dark:text-blue-400", border: "border-teal-300 dark:border-teal-800" },
  halogen: { label: "Halogen", bg: "bg-blue-500/15 dark:bg-blue-950/60", text: "text-blue-700 dark:text-blue-300", border: "border-blue-300 dark:border-blue-800" },
  transition: { label: "Transition Metal", bg: "bg-sky-500/15 dark:bg-blue-50/60", text: "text-blue-600 dark:text-blue-400", border: "border-sky-300 dark:border-sky-800" },
  "post-transition": { label: "Post-Transition Metal", bg: "bg-indigo-500/15 dark:bg-blue-50/60", text: "text-blue-600 dark:text-blue-400", border: "border-indigo-300 dark:border-indigo-800" },
  lanthanide: { label: "Lanthanide", bg: "bg-pink-500/15 dark:bg-pink-950/60", text: "text-pink-700 dark:text-pink-300", border: "border-pink-300 dark:border-pink-800" },
  actinide: { label: "Actinide", bg: "bg-orange-500/15 dark:bg-orange-950/60", text: "text-orange-700 dark:text-orange-300", border: "border-orange-300 dark:border-orange-800" },
};

/**
 * Modern Full Interactive Periodic Table Component
 */
function ModernPeriodicTable() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(PERIODIC_TABLE_ELEMENTS["C"]);

  const elementsList = Object.values(PERIODIC_TABLE_ELEMENTS);

  // Group elements by Period (1-7) & Separate Lanthanides/Actinides
  const mainGridElements = elementsList.filter((e) => e.category !== "lanthanide" && e.category !== "actinide");
  const lanthanides = elementsList.filter((e) => e.category === "lanthanide");
  const actinides = elementsList.filter((e) => e.category === "actinide");

  return (
    <div className="my-8 space-y-4 not-prose">
      {/* Header & Controls */}
      <div className="bg-slate-50 dark:bg-zinc-800/80 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-blue-600 dark:text-blue-400">
              <Atom className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-zinc-100">
                Interactive IUPAC Periodic Table of Elements
              </h3>
              <p className="text-xs text-slate-900 dark:text-slate-100">
                Explore standard atomic weights ($g/mol$), monoisotopic masses ($Da$), categories, and elemental periods.
              </p>
            </div>
          </div>

          {selectedCategory && (
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-zinc-200 hover:bg-slate-300 cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Category Legend Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" /> Series:
          </span>
          {Object.entries(CATEGORY_MAP).map(([catKey, catMeta]) => {
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setSelectedCategory(isSelected ? null : catKey)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border transition-all cursor-pointer ${catMeta.bg} ${catMeta.text} ${catMeta.border} ${
                  isSelected ? "ring-2 ring-emerald-500 scale-105" : "hover:opacity-80"
                }`}
              >
                {catMeta.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* SELECTED ELEMENT INSPECTOR CARD */}
      {selectedElement && (
        <div className="bg-gradient-to-br from-emerald-50 via-teal-50/60 to-slate-50 dark:from-zinc-800 dark:to-zinc-900 text-slate-900 dark:text-zinc-100 p-4 rounded-2xl shadow-xs border border-emerald-200/80 dark:border-zinc-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-white dark:bg-zinc-800 border border-emerald-300 dark:border-zinc-700 shadow-xs flex flex-col items-center justify-center shrink-0">
              <span className="text-2xl font-black font-sans tabular-nums text-blue-600 dark:text-blue-400">{selectedElement.symbol}</span>
              <span className="text-[9px] font-sans tabular-nums text-slate-900 dark:text-slate-100">#{selectedElement.number}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-black text-slate-900 dark:text-zinc-100">{selectedElement.name}</h4>
                <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-50/60 text-blue-600 dark:text-blue-400 border border-emerald-200 dark:border-emerald-800 text-[10px] font-sans tabular-nums font-bold uppercase">
                  {CATEGORY_MAP[selectedElement.category]?.label || selectedElement.category}
                </span>
              </div>
              <p className="text-xs text-slate-900 dark:text-slate-100 font-sans tabular-nums mt-0.5">
                Period {selectedElement.period} • Group {selectedElement.group}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-sans tabular-nums border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-zinc-700 pt-3 sm:pt-0 sm:pl-6 w-full sm:w-auto">
            <div>
              <span className="text-[10px] text-slate-900 dark:text-slate-100 uppercase tracking-wider block font-bold">Standard Atomic Weight</span>
              <span className="text-sm font-black text-blue-600 dark:text-blue-400">{selectedElement.atomicWeight} g/mol</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-900 dark:text-slate-100 uppercase tracking-wider block font-bold">Monoisotopic Mass</span>
              <span className="text-sm font-black text-blue-600 dark:text-blue-400">{selectedElement.monoisotopicMass} Da</span>
            </div>
          </div>
        </div>
      )}

      {/* MAIN PERIODIC TABLE GRID (18 Groups x 7 Periods) */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs overflow-x-auto">
        <div className="min-w-[760px] space-y-2">
          {/* Main Grid (18 columns) */}
          <div className="grid grid-cols-18 gap-1 text-center">
            {Array.from({ length: 7 }, (_, periodIdx) => {
              const currentPeriod = periodIdx + 1;
              return (
                <React.Fragment key={`period-${currentPeriod}`}>
                  {Array.from({ length: 18 }, (_, groupIdx) => {
                    const currentGroup = groupIdx + 1;
                    const el = mainGridElements.find((e) => e.period === currentPeriod && e.group === currentGroup);

                    if (!el) {
                      return <div key={`empty-${currentPeriod}-${currentGroup}`} className="h-12" />;
                    }

                    const catMeta = CATEGORY_MAP[el.category] || CATEGORY_MAP.nonmetal;
                    const isDimmed = selectedCategory && selectedCategory !== el.category;
                    const isSelected = selectedElement?.symbol === el.symbol;

                    return (
                      <button
                        key={el.symbol}
                        type="button"
                        onClick={() => setSelectedElement(el)}
                        className={`h-12 p-1 rounded-lg border flex flex-col items-center justify-between transition-all cursor-pointer hover:scale-105 ${catMeta.bg} ${catMeta.text} ${catMeta.border} ${
                          isDimmed ? "opacity-30 scale-95" : ""
                        } ${isSelected ? "ring-2 ring-emerald-500 font-bold scale-105" : ""}`}
                        title={`${el.name} (#${el.number}): ${el.atomicWeight} g/mol`}
                      >
                        <div className="w-full flex items-center justify-between px-0.5 text-[8px] font-sans tabular-nums opacity-80">
                          <span>{el.number}</span>
                        </div>
                        <span className="text-xs font-black font-sans tabular-nums leading-none">{el.symbol}</span>
                        <span className="text-[7.5px] font-sans tabular-nums opacity-90 truncate w-full px-0.5">
                          {el.atomicWeight}
                        </span>
                      </button>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>

          {/* Lanthanides & Actinides Rows */}
          <div className="pt-4  dark:border-zinc-800 space-y-1.5">
            {/* Lanthanides */}
            <div className="flex items-center gap-1">
              <span className="w-20 text-[10px] font-extrabold uppercase text-pink-600 dark:text-pink-400 shrink-0 font-sans tabular-nums">
                Lanthanides
              </span>
              <div className="grid grid-cols-15 gap-1 flex-1">
                {lanthanides.map((el) => {
                  const catMeta = CATEGORY_MAP[el.category];
                  const isDimmed = selectedCategory && selectedCategory !== el.category;
                  const isSelected = selectedElement?.symbol === el.symbol;
                  return (
                    <button
                      key={el.symbol}
                      type="button"
                      onClick={() => setSelectedElement(el)}
                      className={`h-11 p-1 rounded-lg border flex flex-col items-center justify-between transition-all cursor-pointer hover:scale-105 ${catMeta.bg} ${catMeta.text} ${catMeta.border} ${
                        isDimmed ? "opacity-30 scale-95" : ""
                      } ${isSelected ? "ring-2 ring-pink-500 font-bold" : ""}`}
                      title={`${el.name} (#${el.number}): ${el.atomicWeight} g/mol`}
                    >
                      <span className="text-[7.5px] font-sans tabular-nums opacity-80">{el.number}</span>
                      <span className="text-xs font-black font-sans tabular-nums leading-none">{el.symbol}</span>
                      <span className="text-[7px] font-sans tabular-nums opacity-90 truncate w-full">{el.atomicWeight}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actinides */}
            <div className="flex items-center gap-1">
              <span className="w-20 text-[10px] font-extrabold uppercase text-orange-600 dark:text-orange-400 shrink-0 font-sans tabular-nums">
                Actinides
              </span>
              <div className="grid grid-cols-15 gap-1 flex-1">
                {actinides.map((el) => {
                  const catMeta = CATEGORY_MAP[el.category];
                  const isDimmed = selectedCategory && selectedCategory !== el.category;
                  const isSelected = selectedElement?.symbol === el.symbol;
                  return (
                    <button
                      key={el.symbol}
                      type="button"
                      onClick={() => setSelectedElement(el)}
                      className={`h-11 p-1 rounded-lg border flex flex-col items-center justify-between transition-all cursor-pointer hover:scale-105 ${catMeta.bg} ${catMeta.text} ${catMeta.border} ${
                        isDimmed ? "opacity-30 scale-95" : ""
                      } ${isSelected ? "ring-2 ring-orange-500 font-bold" : ""}`}
                      title={`${el.name} (#${el.number}): ${el.atomicWeight} g/mol`}
                    >
                      <span className="text-[7.5px] font-sans tabular-nums opacity-80">{el.number}</span>
                      <span className="text-xs font-black font-sans tabular-nums leading-none">{el.symbol}</span>
                      <span className="text-[7px] font-sans tabular-nums opacity-90 truncate w-full">{el.atomicWeight}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MolecularWeightContent() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-700 dark:text-zinc-300">
      {/* 1. FUNDAMENTAL DEFINITIONS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          Fundamental Definitions &amp; Chemical Distinctions
        </h2>
        <p className="leading-relaxed">
          In computational chemistry and stoichiometry, measuring chemical substance mass relies on three distinct concepts: 
          <strong> Atomic Mass</strong>, <strong>Molecular Weight</strong>, and <strong>Molar Mass</strong>. While these terms are frequently used interchangeably in laboratory shorthand, they differ fundamentally in physical units and scope:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-1">
            <h4 className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">Atomic Mass (u or Da)</h4>
            <p className="leading-relaxed">
              The mass of a single individual atom, expressed relative to Carbon-12 (defined as exactly 12.000 Da).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-1">
            <h4 className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">Molecular Weight (MW)</h4>
            <p className="leading-relaxed">
              The relative dimensionless ratio or mass of a single discrete molecule in unified atomic mass units (<span className="font-sans tabular-nums">amu</span>).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-1">
            <h4 className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">Molar Mass (M)</h4>
            <p className="leading-relaxed">
              The mass of exactly one mole (<strong>6.02214076 × 10²³</strong> entities) of a chemical substance, expressed in <strong>grams per mole (g/mol)</strong>.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-xs leading-relaxed">
          <strong className="text-slate-900 dark:text-zinc-100">Unit Equivalence Principle:</strong> Because 1 mole of atomic mass units (1 g = 6.022 × 10²³ Da) cancels Avogadro&apos;s number, 1 molecule of Water (<span className="font-sans tabular-nums">H₂O</span>) weighs <strong>18.015 Da</strong>, while 1 mole of Water weighs exactly <strong>18.015 g/mol</strong>.
        </div>
      </section>

      {/* 2. CORE MATHEMATICAL FORMULAS */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          The Core Mathematical Formulas for Molar Mass Calculation
        </h2>
        <p className="leading-relaxed">
          Calculating formula weight requires summing the standard atomic weights of all constituent atoms:
        </p>

        {/* Math Formula Cards */}
        <div className="space-y-3 my-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-xs space-y-1">
            <span className="text-slate-900 font-bold block text-[10px] uppercase">1. Primary Molar Mass Formula:</span>
            <div className="text-blue-600 dark:text-blue-400 font-extrabold text-sm">
              M = Σ(Nᵢ × Aᵢ) = (N₁ · A₁) + (N₂ · A₂) + ... + (Nₖ · Aₖ)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-xs space-y-1">
            <span className="text-slate-900 font-bold block text-[10px] uppercase">2. Elemental Mass Percentage Formula:</span>
            <div className="text-blue-600 dark:text-blue-400 font-extrabold text-sm">
              Mass % of Element i = [(Nᵢ × Aᵢ) / M_total] × 100
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-xs space-y-1">
            <span className="text-slate-900 font-bold block text-[10px] uppercase">3. Mole-Mass-Molecule Conversions:</span>
            <div className="text-blue-600 dark:text-blue-400 font-extrabold text-sm">
              n = m / M,   m = n × M,   N = n × N_A (N_A = 6.022 × 10²³)
            </div>
          </div>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 dark:text-zinc-100 pt-2">
          Step-by-Step Worked Example: Hydrated Copper Sulfate (CuSO₄·5H₂O)
        </h3>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-xs space-y-2">
          <p className="text-slate-700 dark:text-zinc-300">• Copper (Cu): 1 × 63.546 g/mol = 63.546 g/mol</p>
          <p className="text-slate-700 dark:text-zinc-300">• Sulfur (S): 1 × 32.060 g/mol = 32.060 g/mol</p>
          <p className="text-slate-700 dark:text-zinc-300">• Anhydrous Oxygen (O): 4 × 15.999 g/mol = 63.996 g/mol</p>
          <p className="text-slate-700 dark:text-zinc-300">• 5 Water Molecules (5H₂O): 5 × (2 × 1.008 + 15.999) = 90.075 g/mol</p>
          <p className="text-blue-600 dark:text-blue-400 font-black text-sm">
            Total Molar Mass (CuSO₄·5H₂O) = 249.677 g/mol
          </p>
        </div>
      </section>

      {/* 3. EMPIRICAL VS MOLECULAR FORMULAS */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          Empirical vs. Molecular Formula Determination
        </h2>
        <p className="leading-relaxed">
          In analytical elemental combustion analysis, experimental results yield mass percentages of elements:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-xs">
          <li><strong>Empirical Formula:</strong> Represents the simplest reduced whole-number integer ratio of atoms (e.g., <span className="font-sans tabular-nums">CH₂O</span> for glucose).</li>
          <li><strong>Molecular Formula:</strong> Represents the actual integer count of atoms present in one molecule (e.g., <span className="font-sans tabular-nums">C₆H₁₂O₆</span>).</li>
          <li><strong>Integer Multiplier:</strong> Calculated by dividing target molar mass by empirical formula mass (<span className="font-sans tabular-nums">k = M_molecular / M_empirical</span>).</li>
        </ul>
      </section>

      {/* 4. ISOTOPIC ABUNDANCES */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          Standard Atomic Weights &amp; Natural Isotopic Abundances
        </h2>
        <p className="leading-relaxed text-xs">
          Standard atomic weights on the periodic table contain decimal values because they represent the weighted average mass of all stable terrestrial isotopes. 
          For example, natural Chlorine consists of 75.78% ³⁵Cl (mass 34.969 Da) and 24.22% ³⁷Cl (mass 36.966 Da), yielding an IUPAC average atomic weight of <strong>35.45 g/mol</strong>. 
          In high-resolution mass spectrometry (MS), scientists use <strong>Monoisotopic Mass</strong> (calculated strictly from the most abundant single isotope of each element).
        </p>
      </section>

      {/* 5. APPLICATIONS */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          Applications in Stoichiometry, Pharmacology &amp; Industry
        </h2>
        <p className="leading-relaxed text-xs">
          Molar mass calculations underpin stoichiometric theoretical yields in chemical synthesis, active pharmaceutical ingredient (API) dosing formulations (e.g., accounting for hydrochloride salt weight ratios), and solution prep (<span className="font-sans tabular-nums">M = mass / (MW × V)</span>).
        </p>
      </section>

      {/* 6. COMMON ERRORS */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          Common Errors in Molecular Weight Calculations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs my-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">Case Sensitivity Errors</h4>
            <p className="leading-relaxed">
              Entering <span className="font-sans tabular-nums">co</span> instead of <span className="font-sans tabular-nums">Co</span> causes Cobalt (58.93 g/mol) to be misparsed as Carbon Monoxide (28.01 g/mol). Always capitalize element symbols correctly!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">Neglecting Crystallization Waters</h4>
            <p className="leading-relaxed">
              Weighing anhydrous salt mass when using hydrated reagents (e.g. <span className="font-sans tabular-nums">CuSO₄·5H₂O</span>) causes a massive 36% under-dosing error in solution concentration.
            </p>
          </div>
        </div>
      </section>

      {/* FULL MODERN INTERACTIVE PERIODIC TABLE BELOW EDUCATIONAL SECTION */}
      <section className=" dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100 mb-2">
          Full Modern Periodic Table of Elements
        </h2>
        <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed mb-4">
          Use the interactive periodic table reference below to inspect elemental atomic numbers, standard atomic weights, categories, and monoisotopic masses.
        </p>

        <ModernPeriodicTable />
      </section>
    </article>
  );
}

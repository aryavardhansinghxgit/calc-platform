"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PERIODIC_TABLE_ELEMENTS } from "@/app/calculators/molecular-weight-calculator/periodic-table";
import { ElementData } from "@/app/calculators/molecular-weight-calculator/types";
import { Atom, Filter, ChevronDown, BookOpen, ExternalLink } from "lucide-react";
import { molecular_weight_calculatorFaqs } from "@/app/calculators/molecular-weight-calculator/faq";

// Category styling map for Periodic Table
const CATEGORY_MAP: Record<string, { label: string; bg: string; text: string; border: string }> = {
  nonmetal: { label: "Reactive Nonmetal", bg: "bg-emerald-50 dark:bg-emerald-950/40", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-800" },
  noble: { label: "Noble Gas", bg: "bg-purple-50 dark:bg-purple-950/40", text: "text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800" },
  alkali: { label: "Alkali Metal", bg: "bg-rose-50 dark:bg-rose-950/40", text: "text-rose-700 dark:text-rose-300", border: "border-rose-200 dark:border-rose-800" },
  alkaline: { label: "Alkaline Earth Metal", bg: "bg-amber-50 dark:bg-amber-950/40", text: "text-amber-700 dark:text-amber-300", border: "border-amber-200 dark:border-amber-800" },
  metalloid: { label: "Metalloid", bg: "bg-teal-50 dark:bg-teal-950/40", text: "text-teal-700 dark:text-teal-300", border: "border-teal-200 dark:border-teal-800" },
  halogen: { label: "Halogen", bg: "bg-blue-50 dark:bg-blue-950/40", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800" },
  transition: { label: "Transition Metal", bg: "bg-sky-50 dark:bg-sky-950/40", text: "text-sky-700 dark:text-sky-300", border: "border-sky-200 dark:border-sky-800" },
  "post-transition": { label: "Post-Transition Metal", bg: "bg-indigo-50 dark:bg-indigo-950/40", text: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-800" },
  lanthanide: { label: "Lanthanide", bg: "bg-pink-50 dark:bg-pink-950/40", text: "text-pink-700 dark:text-pink-300", border: "border-pink-200 dark:border-pink-800" },
  actinide: { label: "Actinide", bg: "bg-orange-50 dark:bg-orange-950/40", text: "text-orange-700 dark:text-orange-300", border: "border-orange-200 dark:border-orange-800" },
};

/**
 * Modern Full Interactive Periodic Table Component (118 Elements)
 */
function ModernPeriodicTable() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(PERIODIC_TABLE_ELEMENTS["C"]);

  const elementsList = Object.values(PERIODIC_TABLE_ELEMENTS);

  // Separate main grid (Periods 1-7, excluding Lanthanides and Actinides)
  const mainGridElements = elementsList.filter((e) => e.category !== "lanthanide" && e.category !== "actinide");
  const lanthanides = elementsList.filter((e) => e.category === "lanthanide");
  const actinides = elementsList.filter((e) => e.category === "actinide");

  return (
    <div className="my-6 space-y-4 not-prose">
      {/* Header & Category Filter */}
      <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
              <Atom className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                Interactive IUPAC Periodic Table of Elements (1–118)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click any element to inspect atomic weights (g/mol), monoisotopic mass (Da), period, and group.
              </p>
            </div>
          </div>

          {selectedCategory && (
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Category Legend Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" /> Series:
          </span>
          {Object.entries(CATEGORY_MAP).map(([catKey, catMeta]) => {
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setSelectedCategory(isSelected ? null : catKey)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${catMeta.bg} ${catMeta.text} ${catMeta.border} ${
                  isSelected ? "ring-2 ring-blue-500 scale-105" : "hover:opacity-80"
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
        <div className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-xs flex flex-col items-center justify-center shrink-0">
              <span className="text-2xl font-black font-sans tabular-nums text-blue-600 dark:text-blue-400">
                {selectedElement.symbol}
              </span>
              <span className="text-[9px] font-sans tabular-nums text-slate-500 dark:text-slate-400">
                #{selectedElement.number}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                  {selectedElement.name}
                </h4>
                <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[10px] font-bold uppercase">
                  {CATEGORY_MAP[selectedElement.category]?.label || selectedElement.category}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans tabular-nums mt-0.5">
                Period {selectedElement.period} • Group {selectedElement.group}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-sans tabular-nums border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-700 pt-3 sm:pt-0 sm:pl-6 w-full sm:w-auto">
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-bold">
                Standard Atomic Weight
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {selectedElement.atomicWeight} g/mol
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-bold">
                Monoisotopic Mass
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {selectedElement.monoisotopicMass} Da
              </span>
            </div>
          </div>
        </div>
      )}

      {/* MAIN PERIODIC TABLE GRID (18 Columns x 7 Periods) */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-x-auto print:border-none print:p-1 break-inside-avoid">
        <div className="min-w-[760px] space-y-2">
          {/* Main Grid (18 columns) */}
          <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-1 text-center">
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
                        } ${isSelected ? "ring-2 ring-blue-500 font-bold scale-105" : ""}`}
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
          <div className="pt-4 dark:border-slate-800 space-y-1.5 break-inside-avoid">
            {/* Lanthanides */}
            <div className="flex items-center gap-1">
              <span className="w-20 text-[10px] font-bold uppercase text-pink-600 dark:text-pink-400 shrink-0 font-sans tabular-nums">
                Lanthanides
              </span>
              <div className="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-1 flex-1">
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
              <span className="w-20 text-[10px] font-bold uppercase text-orange-600 dark:text-orange-400 shrink-0 font-sans tabular-nums">
                Actinides
              </span>
              <div className="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-1 flex-1">
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
  // All 16 FAQs unfolded by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: molecular_weight_calculatorFaqs.length }, (_, i) => i))
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
            Molecular Weight and Molar Mass: What Are You Actually Calculating?
          </h2>
          <p>
            A chemical formula contains much more information than the names of its elements. Its symbols and subscripts tell you how many atoms of each element are represented, and those atom counts determine the mass associated with one mole of the substance. That is the basis of a molecular weight or molar mass calculation.
          </p>
          <p>
            Enter a formula such as <span className="font-semibold font-sans tabular-nums">H₂O</span>, <span className="font-semibold font-sans tabular-nums">NaCl</span>, <span className="font-semibold font-sans tabular-nums">C₆H₁₂O₆</span>, or a more complicated expression such as <span className="font-semibold font-sans tabular-nums">Ca(OH)₂</span>, and the calculator determines the total mass from the elemental composition.
          </p>
          <p>
            For example, the formula for glucose is <span className="font-semibold font-sans tabular-nums">C₆H₁₂O₆</span>. NIST lists its molecular weight as 180.1559, which is why a calculator using the corresponding average atomic-weight convention reports about 180.156 g/mol for its molar mass.
          </p>
          <p>
            The distinction between terminology matters. In precise IUPAC usage, relative molecular mass is dimensionless, whereas molar mass has units such as g/mol. &ldquo;Molecular weight calculator&rdquo; is nevertheless a very common search and laboratory phrase, so this page uses both terms while keeping their scientific meanings distinct.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Does a Molecular Weight Calculator Do?
          </h2>
          <p>
            This calculator determines the mass associated with a chemical formula by summing the contributions of its constituent atoms. It also goes beyond a simple formula lookup.
          </p>
          <p>You can use it to:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Calculate average molar mass based on standard IUPAC terrestrial atomic weights</li>
            <li>Calculate monoisotopic mass for high-resolution mass spectrometry</li>
            <li>Inspect the exact number of atoms of each constituent element</li>
            <li>Calculate elemental mass percentages and inspect proportional donut distributions</li>
            <li>Work with parentheses, brackets, and complex coordination chemistry groups</li>
            <li>Handle hydrate notation and crystallization waters seamlessly</li>
            <li>Solve empirical formulas from elemental combustion analysis percentages</li>
            <li>Derive molecular formulas from an empirical formula and target molecular mass</li>
            <li>Convert grams to moles, moles to grams, and moles to discrete molecules</li>
            <li>Inspect atomic-weight and isotope information across all 118 elements through the interactive periodic table</li>
          </ul>
          <p>
            The current implementation supports all 118 elements in its periodic-table dataset and has been regression-tested across formula parsing, hydrate handling, composition analysis, and conversions.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Is Molar Mass Calculated From a Chemical Formula?
          </h2>
          <p>The calculation is conceptually straightforward:</p>
          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center font-sans tabular-nums font-bold text-sm sm:text-base text-blue-600 dark:text-blue-400">
            M = Σ(Nᵢ × Aᵢ)
          </div>
          <p>
            where <span className="font-semibold">M</span> is the molar mass, <span className="font-semibold">Nᵢ</span> is the number of atoms of element <span className="font-semibold">i</span>, and <span className="font-semibold">Aᵢ</span> is the standard atomic weight used for that element.
          </p>
          <p>
            For a simple formula, multiply each element&apos;s atomic weight by its subscript and add the results.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Example: Water (H₂O)</span>
            <p>There are two hydrogen atoms and one oxygen atom:</p>
            <p className="font-mono text-blue-600 dark:text-blue-400 font-bold">
              M = (2 × 1.008 g/mol) + (1 × 15.999 g/mol) = 18.015 g/mol
            </p>
          </div>
          <p>
            IUPAC&apos;s standard atomic weights are recommended values intended for normal terrestrial materials and are revised by the Commission on Isotopic Abundances and Atomic Weights (CIAAW).
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Example: Molecular Weight of Glucose
          </h2>
          <p>
            Consider glucose, <span className="font-semibold font-sans tabular-nums">C₆H₁₂O₆</span>. The formula contains 6 carbon atoms, 12 hydrogen atoms, and 6 oxygen atoms:
          </p>
          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-sm sm:text-base text-blue-600 dark:text-blue-400">
            M = (6 × 12.011) + (12 × 1.008) + (6 × 15.999) = 180.156 g/mol
          </div>
          <p>The calculator breaks that result into elemental contributions:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-bold">
                  <th className="py-2">Element</th>
                  <th className="py-2">Atom Count</th>
                  <th className="py-2">Atomic Weight</th>
                  <th className="py-2">Sub-Mass Contribution</th>
                  <th className="py-2 text-right">Mass Percentage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans tabular-nums">
                <tr>
                  <td className="py-2 font-bold text-slate-900 dark:text-slate-100">Carbon (C)</td>
                  <td className="py-2">6</td>
                  <td className="py-2">12.011 g/mol</td>
                  <td className="py-2">72.066 g/mol</td>
                  <td className="py-2 text-right font-bold text-emerald-600 dark:text-emerald-400">40.00%</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-slate-900 dark:text-slate-100">Hydrogen (H)</td>
                  <td className="py-2">12</td>
                  <td className="py-2">1.008 g/mol</td>
                  <td className="py-2">12.096 g/mol</td>
                  <td className="py-2 text-right font-bold text-emerald-600 dark:text-emerald-400">6.71%</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-slate-900 dark:text-slate-100">Oxygen (O)</td>
                  <td className="py-2">6</td>
                  <td className="py-2">15.999 g/mol</td>
                  <td className="py-2">95.994 g/mol</td>
                  <td className="py-2 text-right font-bold text-emerald-600 dark:text-emerald-400">53.28%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            The percentages represent each element&apos;s contribution to the total formula mass, so their sum is exactly 100.00% (within rounding).
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Molecular Mass, Molecular Weight, Formula Mass and Molar Mass
          </h2>
          <p>
            These terms are related, but they are not always interchangeable in rigorous scientific writing:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
              <h4 className="font-bold text-blue-600 dark:text-blue-400 text-xs uppercase">Relative Molecular Mass</h4>
              <p className="text-xs">
                IUPAC defines relative molecular mass (MW) as the ratio of the mass of a molecule to the unified atomic mass unit. It is dimensionless.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
              <h4 className="font-bold text-blue-600 dark:text-blue-400 text-xs uppercase">Molar Mass (M)</h4>
              <p className="text-xs">
                Molar mass is the mass per amount of substance, commonly expressed in grams per mole (<span className="font-semibold font-sans">g/mol</span>). This is used for laboratory stoichiometry.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
              <h4 className="font-bold text-blue-600 dark:text-blue-400 text-xs uppercase">Formula Mass</h4>
              <p className="text-xs">
                For non-molecular substances such as ionic lattices (<span className="font-semibold font-sans">NaCl</span>), formula mass is the more precise term because discrete molecules do not exist.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Average Atomic Weight vs. Monoisotopic Mass
          </h2>
          <p>
            An important feature of this calculator is the distinction between average elemental masses and monoisotopic masses:
          </p>
          <p>
            <strong>Average atomic weight:</strong> The standard atomic weight reflects the terrestrial isotopic abundance mixture for normal materials. It is the appropriate basis for ordinary molar-mass calculations in chemistry.
          </p>
          <p>
            <strong>Monoisotopic mass:</strong> A monoisotopic calculation uses a specified single isotope (the most abundant stable isotope) for each constituent element rather than an abundance-weighted natural mixture. This is essential for high-resolution mass spectrometry (HRMS) and exact m/z peak identification.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Glucose Comparison:</span>
            <p>Average Molar Mass: <strong className="font-sans tabular-nums">180.156 g/mol</strong></p>
            <p>Monoisotopic Mass: <strong className="font-sans tabular-nums">180.0634 Da</strong> (Exact: 6×¹²C + 12×¹H + 6×¹⁶O)</p>
          </div>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Chemical Formula Subscripts Affect Molecular Weight
          </h2>
          <p>
            The subscript tells you how many atoms of the preceding element or group are present. For <span className="font-semibold font-sans">H₂O</span>, the subscript 2 applies only to hydrogen. For <span className="font-semibold font-sans">Ca(OH)₂</span>, the subscript 2 applies to the entire parenthesized hydroxide group: 1 Ca, 2 O, and 2 H.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Example: Aluminum Sulfate Al₂(SO₄)₃</span>
            <p className="font-sans tabular-nums">2 Al + 3 × (1 S + 4 O) = 2 Al + 3 S + 12 O</p>
            <p className="font-bold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
              M = (2 × 26.982) + (3 × 32.060) + (12 × 15.999) = 342.132 g/mol
            </p>
          </div>
          <p>
            The current calculator explicitly supports parentheses, square brackets, and deep coordination structures such as <span className="font-mono">K4[Fe(CN)6]</span> and <span className="font-mono">[Co(NH3)5(CO3)]NO3</span>.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Hydrates and Their Molar Mass
          </h2>
          <p>
            A hydrate contains water of crystallization as part of the chemical formula. For example, in copper(II) sulfate pentahydrate, <span className="font-semibold font-sans">CuSO₄·5H₂O</span>, the five water molecules contribute to the total formula mass:
          </p>
          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-xs sm:text-sm text-blue-600 dark:text-blue-400">
            M_hydrate = M_anhydrous + 5 × M_H2O = 159.602 + (5 × 18.015) = 249.677 g/mol
          </div>
          <p>
            <strong>Why this matters in the laboratory:</strong> If the material you weigh on an analytical balance is a pentahydrate but you calculate its concentration using the anhydrous molar mass (159.60 g/mol), you will under-dose the solution by 36%, introducing massive systematic stoichiometric error.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Empirical Formula vs. Molecular Formula
          </h2>
          <p>
            An <strong>empirical formula</strong> expresses the simplest whole-number integer ratio of the elements in a compound. A <strong>molecular formula</strong> gives the actual number of atoms of each element in a discrete molecule.
          </p>
          <p>
            For glucose, the empirical formula is <span className="font-semibold font-sans">CH₂O</span>, while the molecular formula is <span className="font-semibold font-sans">C₆H₁₂O₆</span>. The relationship between the two is defined by an integer multiplier <span className="font-semibold">k</span>:
          </p>
          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center font-sans tabular-nums font-bold text-xs sm:text-sm text-blue-600 dark:text-blue-400">
            Molecular Formula = (Empirical Formula) × k &emsp;|&emsp; k = M_molecular / M_empirical
          </div>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How the Empirical Formula Solver Works
          </h2>
          <p>
            Suppose analytical elemental combustion analysis gives: Carbon = 40.00%, Hydrogen = 6.71%, Oxygen = 53.29%.
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Convert each mass percentage to moles per 100 g: <span className="font-mono">n_C = 40.00 / 12.011 = 3.330 mol</span>; <span className="font-mono">n_H = 6.71 / 1.008 = 6.657 mol</span>; <span className="font-mono">n_O = 53.29 / 15.999 = 3.331 mol</span>.</li>
            <li>Divide by the smallest mole value (3.330 mol) to normalize: <span className="font-mono">C = 1.00</span>, <span className="font-mono">H = 2.00</span>, <span className="font-mono">O = 1.00</span>.</li>
            <li>Obtain the empirical formula: <span className="font-bold font-sans">CH₂O</span> (Empirical Mass = 30.026 g/mol).</li>
            <li>Given target mass 180.16 g/mol: <span className="font-mono">k = 180.16 / 30.026 = 6</span>.</li>
            <li>Multiply by 6 to yield the molecular formula: <span className="font-bold font-sans text-blue-600 dark:text-blue-400">C₆H₁₂O₆</span>.</li>
          </ol>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Simple Rounding Can Produce the Wrong Formula
          </h2>
          <p>
            Suppose normalized mole ratios are <span className="font-mono">1 : 1.5</span> (as in iron(III) oxide, Fe₂O₃, or butane, C₄H₁₀ with 1:2.5). Simply rounding 1.5 to 2 would falsely yield <span className="font-mono">FeO₂</span> instead of <span className="font-mono">Fe₂O₃</span>!
          </p>
          <p>
            A scientifically reliable solver must search candidate integer multipliers (<span className="font-mono">f ∈ &#123;1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12&#125;</span>) to convert near-rational fractions (<span className="font-mono">1.5 × 2 = 3</span>) into simplest integer subscripts. The current calculator uses this exact rational stoichiometry solver.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Grams, Moles and Molecules
          </h2>
          <p>
            Molar mass is the bridge between macroscopic laboratory mass and the microscopic number of chemical entities:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 font-mono text-center">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-500 block uppercase font-sans font-bold">Mass to Moles</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">n = m / M</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-500 block uppercase font-sans font-bold">Moles to Entities</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">N = n × N_A</span>
            </div>
          </div>
          <p>
            Under the 2019 SI revision, Avogadro&apos;s constant is an exact defining physical constant: <span className="font-semibold font-mono">N_A = 6.02214076 × 10²³ mol⁻¹</span>.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Example: 10 g of Glucose
          </h2>
          <p>
            For glucose, <span className="font-sans tabular-nums font-semibold">C₆H₁₂O₆</span> (M = 180.156 g/mol), a 10 g sample contains:
          </p>
          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm space-y-1">
            <p>n = 10 g / 180.156 g/mol = <strong className="text-blue-600 dark:text-blue-400">0.055507 mol (55.5074 mmol)</strong></p>
            <p>N = 0.05550745 mol × 6.02214076 × 10²³ mol⁻¹ = <strong className="text-emerald-600 dark:text-emerald-400">3.3427 × 10²² molecules</strong></p>
          </div>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Elemental Mass Percentage
          </h2>
          <p>
            Once total molar mass is known, the mass percentage of any constituent element <span className="font-semibold">i</span> is calculated as:
          </p>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-600 dark:text-blue-400">
            Mass % = [(Nᵢ × Aᵢ) / M_total] × 100
          </div>
          <p>
            For checking a standalone percentage calculation, the{" "}
            <Link href="/calculators/percentage-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Percentage Calculator
            </Link>{" "}
            can be used before returning to the chemical-composition analysis.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Use the Composition Chart as a Quick Sanity Check
          </h2>
          <p>
            The calculator&apos;s elemental mass-distribution donut chart is more than decoration. For glucose, oxygen accounts for over half the mass (53.28%), carbon for 40.00%, and hydrogen for only 6.71%. The visual relationship should immediately match the numerical breakdown table.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-mono text-center">
            Chemical Formula → Atom counts → Atomic masses → Total molar mass → Mass % distribution
          </div>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Chemical Formula Capitalization Matters
          </h2>
          <p>
            Chemical symbols are strictly case-sensitive. <span className="font-semibold font-sans">CO₂</span> represents Carbon Dioxide (28.01 g/mol carbon + 32.00 g/mol oxygen = 44.01 g/mol), whereas <span className="font-semibold font-sans">Co₂</span> represents two atoms of Cobalt (58.93 × 2 = 117.87 g/mol).
          </p>
          <p>
            The calculator specifically tests ambiguous lowercase entry such as <span className="font-mono">co2</span> to ensure it disambiguates properly into <span className="font-mono">CO₂</span> rather than corrupting user intent into cobalt.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Makes a Chemical Formula Invalid?
          </h2>
          <p>
            A rigorous formula parser must reject malformed text rather than guessing. Invalid syntax examples rejected by this calculator include:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Unmatched closing or unclosed brackets (<span className="font-mono">H2O)</span>, <span className="font-mono">(H2O</span>, <span className="font-mono">Fe((SO4)3</span>)</li>
            <li>Zero or negative subscripts (<span className="font-mono">C0</span>, <span className="font-mono">H-2O</span>)</li>
            <li>Decimal subscripts (<span className="font-mono">H2.5O</span>, which must not be confused with hydrate syntax)</li>
            <li>Empty parentheses or bracket groups (<span className="font-mono">()</span>, <span className="font-mono">[]</span>)</li>
            <li>Unknown element symbols (<span className="font-mono">Xx</span>, <span className="font-mono">Zz</span>) or unparsed trailing garbage (<span className="font-mono">C6H12O6xyz</span>)</li>
          </ul>
        </section>

        {/* Section 18: Interactive Periodic Table */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Using the Interactive Periodic Table
          </h2>
          <p>
            Use the interactive IUPAC reference below to inspect atomic numbers, standard atomic weights, monoisotopic masses, and chemical series across all 118 elements:
          </p>
          <ModernPeriodicTable />
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            When Should You Use Average Molar Mass?
          </h2>
          <p>
            Average molar mass is the standard choice for routine chemical calculations involving materials with normal terrestrial isotopic composition. Examples include solution preparation, synthetic reaction stoichiometry, reagent titration, and standard mass-to-mole conversions.
          </p>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            When Is Monoisotopic Mass Useful?
          </h2>
          <p>
            Monoisotopic mass is essential in analytical mass spectrometry (MS), high-resolution exact-mass identification (HRMS), and isotopic envelope deconvolution. Because monoisotopic mass reflects exact single-isotope nuclear ground states, it must always be clearly distinguished from average molar mass.
          </p>
        </section>

        {/* Section 21 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Common Molecular Weight Calculation Mistakes
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Ignoring group subscripts:</strong> In <span className="font-mono">Al2(SO4)3</span>, the subscript 3 multiplies both Sulfur (3) and Oxygen (12).</li>
            <li><strong>Neglecting crystallization waters:</strong> Using anhydrous salt mass when working with hydrated reagents (<span className="font-mono">CuSO4·5H2O</span>).</li>
            <li><strong>Capitalization errors:</strong> Entering lowercase <span className="font-mono">co</span> instead of <span className="font-mono">Co</span>.</li>
            <li><strong>Conflating relative molecular mass with molar mass:</strong> Relative molecular mass is dimensionless; molar mass has units of g/mol.</li>
            <li><strong>Rounding empirical ratios too early:</strong> Converting 1.5 directly to 2 rather than multiplying by 2 to find 3.</li>
          </ul>
        </section>

        {/* Section 22 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            When This Calculator Is Most Useful
          </h2>
          <p>
            This calculator is particularly useful for chemistry students practicing formula stoichiometry, synthetic chemists preparing reagents, analytical mass spectrometrists comparing theoretical m/z values, and laboratory technicians verifying reagent spec sheets.
          </p>
          <p>
            For solution preparation, the next step after determining molar mass is often a{" "}
            <Link href="/calculators/molarity-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Molarity Calculator
            </Link>{" "}
            calculation.
          </p>
        </section>

        {/* Section 23 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            A Reliable Workflow for Formula Calculations
          </h2>
          <ol className="list-decimal pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Enter the chemical formula exactly with proper uppercase element symbols.</li>
            <li>Verify bracket grouping and ensure hydrate dots are clearly specified.</li>
            <li>Select the intended mass convention (Average IUPAC vs. Monoisotopic MS).</li>
            <li>Review the atom-count table and confirm elemental mass percentages.</li>
            <li>Convert sample mass to moles and molecule counts as required.</li>
          </ol>
        </section>

        {/* Section 24 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Molecular Weight Calculator Limitations
          </h2>
          <p>
            A formula calculator calculates from the formula you provide. It cannot determine whether the formula describes the actual moisture content, purity, or polymorph of the physical reagent in your laboratory container.
          </p>
          <p>
            When a concentration calculation requires solution density, the{" "}
            <Link href="/calculators/density-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Density Calculator
            </Link>{" "}
            can help determine a missing mass, volume or density value.
          </p>
        </section>
      </div>

      {/* 2. FREQUENTLY ASKED QUESTIONS (UNFOLDED BY DEFAULT) */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Frequently Asked Questions
          </h2>
          <button
            type="button"
            onClick={() => {
              if (openFaqIndices.size === molecular_weight_calculatorFaqs.length) {
                setOpenFaqIndices(new Set());
              } else {
                setOpenFaqIndices(new Set(Array.from({ length: molecular_weight_calculatorFaqs.length }, (_, i) => i)));
              }
            }}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            {openFaqIndices.size === molecular_weight_calculatorFaqs.length ? "Collapse All" : "Expand All"}
          </button>
        </div>

        <div className="space-y-3">
          {molecular_weight_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                >
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-3.5 pb-3.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-slate-800/50 pt-2.5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SCIENTIFIC REFERENCES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Scientific References
        </h2>
        <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
          <li className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <strong className="text-slate-900 dark:text-slate-100 block">IUPAC Gold Book (Compendium of Chemical Terminology)</strong>
            <span>Standard definitions for relative molecular mass, empirical formula, molecular formula, unified atomic mass unit, and the Avogadro constant.</span>
          </li>
          <li className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <strong className="text-slate-900 dark:text-slate-100 block">IUPAC Commission on Isotopic Abundances and Atomic Weights (CIAAW)</strong>
            <span>Standard atomic weights of the elements (2021/2023 revisions) and isotopic composition reference datasets.</span>
          </li>
          <li className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <strong className="text-slate-900 dark:text-slate-100 block">NIST Chemistry WebBook (SRD 69)</strong>
            <span>National Institute of Standards and Technology thermochemical and structural data for molecular compounds (e.g. Glucose MW 180.1559, NaCl MW 58.443).</span>
          </li>
        </ul>
      </section>
    </article>
  );
}

export default MolecularWeightContent;

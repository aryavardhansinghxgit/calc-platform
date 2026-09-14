"use client";

import React from "react";
import { ShieldCheck, Table, Target, AlertTriangle } from "lucide-react";
import { ArmyWHtRResult, ArmyBodyFatResult } from "@/lib/formulas/armyBodyFat";

interface ArmyWHtRTablesProps {
  whtrResult: ArmyWHtRResult;
}

interface HistoricalTablesProps {
  result: ArmyBodyFatResult;
}

export function ArmyWHtRTables({ whtrResult }: ArmyWHtRTablesProps) {
  const whtrTiers = [
    {
      category: "Slim / Low Risk",
      range: "< 0.430",
      armyStatus: "Compliant",
      description: "Lean frame; well below military threshold",
      highlight: whtrResult.isValid && whtrResult.category === "Slim",
    },
    {
      category: "Optimal Army Range",
      range: "0.430 – 0.529",
      armyStatus: "Compliant",
      description: "Standard physical readiness zone; meets Army Directive 2026-13",
      highlight: whtrResult.isValid && whtrResult.category === "Optimal Army Range",
    },
    {
      category: "Approaching Limit",
      range: "0.530 – 0.549",
      armyStatus: "Compliant (Warning)",
      description: "Compliant but nearing the strict 0.550 boundary",
      highlight: whtrResult.isValid && whtrResult.category === "Approaching Limit",
    },
    {
      category: "Exceeds Army Standard",
      range: "0.550 – 0.599",
      armyStatus: "Non-Compliant",
      description: "Exceeds threshold (< 0.55); subject to ABCP assessment",
      highlight: whtrResult.isValid && whtrResult.category === "Exceeds Army Standard",
    },
    {
      category: "High Risk",
      range: "≥ 0.600",
      armyStatus: "Non-Compliant",
      description: "Elevated metabolic and cardiovascular risk profile",
      highlight: whtrResult.isValid && whtrResult.category === "High Risk",
    },
  ];

  return (
    <div className="space-y-8 mt-8">
      {/* 1. Official U.S. Army WHtR Standards (Army Directive 2026-13) */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-sm sm:text-base">
            U.S. Army Waist-to-Height Standards (Army Directive 2026-13)
          </h3>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          The U.S. Army standard requires a Waist-to-Height Ratio <strong>strictly less than 0.55</strong> for all
          active-duty, Reserve, and National Guard personnel. Measurements are taken at the navel twice annually.
        </p>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th scope="col" className="py-2.5 px-3">Classification</th>
                <th scope="col" className="py-2.5 px-3 font-sans tabular-nums text-blue-700 dark:text-blue-400">WHtR Range</th>
                <th scope="col" className="py-2.5 px-3">Army Directive Status</th>
                <th scope="col" className="py-2.5 px-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {whtrTiers.map((row, idx) => (
                <tr
                  key={idx}
                  className={
                    row.highlight
                      ? whtrResult.isCompliant
                        ? "bg-emerald-50/80 dark:bg-emerald-950/30 font-bold border-l-4 border-emerald-600"
                        : "bg-rose-50/80 dark:bg-rose-950/30 font-bold border-l-4 border-rose-600"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                  }
                >
                  <td className="py-2.5 px-3 font-bold text-zinc-900 dark:text-zinc-100">
                    {row.category}
                  </td>
                  <td className="py-2.5 px-3 font-sans tabular-nums font-bold text-blue-700 dark:text-blue-400">
                    {row.range}
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.armyStatus.includes("Compliant") && !row.armyStatus.includes("Non")
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
                          : "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300"
                      }`}
                    >
                      {row.armyStatus}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Waist Reduction Action Plan (Shown only when non-compliant) */}
      {whtrResult.isValid && !whtrResult.isCompliant && (
        <section className="p-5 bg-rose-50/40 dark:bg-rose-950/10 rounded-xl border border-rose-200 dark:border-rose-900/40 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-rose-900 dark:text-rose-200 font-bold text-base">
            <Target className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h3 className="text-sm sm:text-base">Waist Circumference Compliance Target</h3>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Based on your height of <strong>{whtrResult.height} {whtrResult.unitLabel}</strong>, calculate the maximum
            waist circumference required to achieve a compliant Waist-to-Height Ratio (&lt; 0.55).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <span className="text-zinc-500 text-[10px] font-bold uppercase block">Max Compliant Waist</span>
              <strong className="text-lg font-black text-emerald-600 dark:text-emerald-400 block mt-1">
                {whtrResult.maxCompliantWaist} {whtrResult.unitLabel}
              </strong>
              <span className="text-[10px] text-zinc-400 block">Threshold at WHtR 0.549</span>
            </div>

            <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <span className="text-zinc-500 text-[10px] font-bold uppercase block">Required Waist Reduction</span>
              <strong className="text-lg font-black text-rose-600 dark:text-rose-400 block mt-1">
                {whtrResult.requiredWaistReduction} {whtrResult.unitLabel}
              </strong>
              <span className="text-[10px] text-zinc-400 block">Reduction needed to pass</span>
            </div>

            <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <span className="text-zinc-500 text-[10px] font-bold uppercase block">Testing Interval</span>
              <strong className="text-lg font-black text-blue-600 dark:text-blue-400 block mt-1">
                Semi-Annual
              </strong>
              <span className="text-[10px] text-zinc-400 block">Assessed twice per calendar year</span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// --------------------------------------------------------------------
// Historical Reference Tables Component
// --------------------------------------------------------------------
export function HistoricalArmyTables({ result }: HistoricalTablesProps) {
  const armyStandardsTable = [
    { id: "17_20", ageGroup: "Age 17 – 20", maleMax: "20%", femaleMax: "30%" },
    { id: "21_27", ageGroup: "Age 21 – 27", maleMax: "22%", femaleMax: "32%" },
    { id: "28_39", ageGroup: "Age 28 – 39", maleMax: "24%", femaleMax: "34%" },
    { id: "40_plus", ageGroup: "Age 40 and Over (40+)", maleMax: "26%", femaleMax: "36%" },
  ];

  return (
    <div className="space-y-6 mt-6 p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
      <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
        <AlertTriangle className="w-4 h-4" />
        <h4>Historical Reference: 2023 AR 600-9 Maximum Allowable Body Fat Table</h4>
      </div>
      <p className="text-xs text-amber-700 dark:text-amber-400">
        Notice: The circumference-based body-fat percentage standards below have been superseded by Army Directive 2026-13
        (Waist-to-Height Ratio &lt; 0.55). Provided for historical reference only.
      </p>

      <div className="overflow-x-auto rounded-lg border border-amber-200 dark:border-amber-900/60 bg-white dark:bg-zinc-900">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
            <tr>
              <th className="py-2.5 px-3">Age Bracket</th>
              <th className="py-2.5 px-3">Male Max (Historical)</th>
              <th className="py-2.5 px-3">Female Max (Historical)</th>
              <th className="py-2.5 px-3">Policy Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
            {armyStandardsTable.map((row) => (
              <tr key={row.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                <td className="py-2 px-3 font-bold">{row.ageGroup}</td>
                <td className="py-2 px-3">{row.maleMax}</td>
                <td className="py-2 px-3">{row.femaleMax}</td>
                <td className="py-2 px-3 text-zinc-400">Rescinded / Replaced by WHtR</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

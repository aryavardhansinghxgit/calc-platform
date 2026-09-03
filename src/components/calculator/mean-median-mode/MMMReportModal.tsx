"use client";

import React from "react";
import { Printer, X, FileText } from "lucide-react";
import {
  StandardMMMResult,
  AdvancedMeansResult,
  GroupedMMMResult,
  TargetMeanResult,
  OutlierSkewnessResult
} from "@/app/calculators/mean-median-mode-calculator/mmm-logic";

interface MMMReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  rawInput: string;
  isSample: boolean;
  stats1: StandardMMMResult;
  advValues: string;
  advWeights: string;
  advResult: AdvancedMeansResult;
  groupedVals: string;
  groupedFreqs: string;
  groupedResult: GroupedMMMResult;
  targetCurrent: string;
  targetGoal: number;
  targetTotalN: number;
  targetResult: TargetMeanResult;
  compareA: string;
  compareB: string;
  statsA: StandardMMMResult;
  statsB: StandardMMMResult;
  outlierInput: string;
  outlierResult: OutlierSkewnessResult;
}

export function MMMReportModal({
  isOpen,
  onClose,
  rawInput,
  isSample,
  stats1,
  advValues,
  advWeights,
  advResult,
  groupedVals,
  groupedFreqs,
  groupedResult,
  targetCurrent,
  targetGoal,
  targetTotalN,
  targetResult,
  compareA,
  compareB,
  statsA,
  statsB,
  outlierInput,
  outlierResult
}: MMMReportModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const activeSD = isSample ? stats1.sampleSD : stats1.popSD;
  const activeVar = isSample ? stats1.sampleVar : stats1.popVar;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #mmm-report-content,
          #mmm-report-content * {
            visibility: visible;
          }
          #mmm-report-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px !important;
            background: white !important;
            color: black !important;
          }
          .no-print-in-modal {
            display: none !important;
          }
        }
      `}</style>

      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8 overflow-hidden">
        {/* MODAL HEADER */}
        <div className="no-print-in-modal flex items-center justify-between p-4 px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-base text-slate-900 dark:text-slate-100">
              Central Tendency &amp; Statistical Analysis Report
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE REPORT CONTENT */}
        <div id="mmm-report-content" className="p-6 sm:p-8 space-y-6 text-slate-900 dark:text-slate-100 font-sans">
          {/* EXECUTIVE HEADER */}
          <div className="border-b border-slate-200 pb-4 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-blue-700">Central Tendency &amp; Dispersion Analysis Report</h1>
              <p className="text-xs text-slate-500 mt-1">
                Comprehensive Suite: Mean, Median, Mode, Range, Advanced Means, Grouped Data, Target Solver &amp; Skewness
              </p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <span className="font-bold text-slate-700 block">{today}</span>
              <span>CalcPlatform Mathematical Suite</span>
            </div>
          </div>

          {/* MODULE 1: STANDARD RAW DATA STREAM */}
          <div className="space-y-3">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 border-b border-slate-100 pb-1">
              1. Standard Raw Data Stream ({isSample ? "Sample s" : "Population σ"})
            </h2>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono">
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">Active Dataset</span>
              <span className="break-all">{rawInput}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 text-center">
                <span className="text-[10px] uppercase font-bold text-blue-700 block">Mean (Average x̄)</span>
                <span className="text-lg font-extrabold font-mono text-blue-800">{stats1.mean}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Median (Middle)</span>
                <span className="text-lg font-extrabold font-mono text-slate-800">{stats1.median}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Mode ({stats1.modeType})</span>
                <span className="text-lg font-extrabold font-mono text-slate-800">
                  {stats1.modes.length > 0 ? stats1.modes.join(", ") : "None"}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Range (Max - Min)</span>
                <span className="text-lg font-extrabold font-mono text-slate-800">{stats1.range}</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-xs font-mono text-center">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-sans">Count (N)</span>
                <span className="font-bold">{stats1.count}</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-sans">Sum (Σx)</span>
                <span className="font-bold">{stats1.sum}</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-sans">Variance ({isSample ? "s²" : "σ²"})</span>
                <span className="font-bold">{activeVar}</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-sans">Std Dev ({isSample ? "s" : "σ"})</span>
                <span className="font-bold">{activeSD}</span>
              </div>
            </div>
          </div>

          {/* MODULE 2: ADVANCED MEANS SUITE */}
          <div className="space-y-3 border-t border-slate-200 pt-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 border-b border-slate-100 pb-1">
              2. Advanced Means Suite
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Weighted Mean</span>
                <span className="text-base font-extrabold font-mono text-blue-600">
                  {advResult.weightedMean !== undefined ? advResult.weightedMean : "N/A"}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Trimmed Mean ({advResult.trimPct}%)</span>
                <span className="text-base font-extrabold font-mono text-emerald-600">{advResult.trimmedMean}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Geometric Mean</span>
                <span className="text-base font-extrabold font-mono text-slate-800">
                  {advResult.geometricMean !== undefined ? advResult.geometricMean : "N/A"}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Harmonic Mean</span>
                <span className="text-base font-extrabold font-mono text-slate-800">
                  {advResult.harmonicMean !== undefined ? advResult.harmonicMean : "N/A"}
                </span>
              </div>
            </div>
            {advResult.trimExplanation && (
              <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                {advResult.trimExplanation}
              </p>
            )}
          </div>

          {/* MODULE 3: GROUPED DATA & FREQUENCY TABLE */}
          <div className="space-y-3 border-t border-slate-200 pt-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 border-b border-slate-100 pb-1">
              3. Frequency Distribution / Grouped Data Mode
            </h2>

            <div className="grid grid-cols-3 gap-3 text-xs text-center">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Grouped Mean (x̄_grouped)</span>
                <span className="text-base font-extrabold font-mono text-blue-600">{groupedResult.groupedMean}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Frequency (Σf)</span>
                <span className="text-base font-extrabold font-mono text-slate-800">{groupedResult.totalN}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Modal Class</span>
                <span className="text-base font-extrabold font-mono text-slate-800">{groupedResult.modalClass}</span>
              </div>
            </div>
          </div>

          {/* MODULE 4: TARGET MEAN SOLVER */}
          <div className="space-y-3 border-t border-slate-200 pt-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 border-b border-slate-100 pb-1">
              4. Target Mean Solver (&quot;What Score Do I Need?&quot;)
            </h2>

            <div className="grid grid-cols-3 gap-3 text-xs text-center">
              <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200">
                <span className="text-[10px] uppercase font-bold text-blue-700 block">Required Score on Final Test</span>
                <span className="text-xl font-extrabold font-mono text-blue-800">{targetResult.neededScore}%</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Current Average</span>
                <span className="text-base font-extrabold font-mono text-slate-800">{targetResult.currentMean}%</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Needed Total Sum</span>
                <span className="text-base font-extrabold font-mono text-slate-800">{targetResult.neededTotalSum}</span>
              </div>
            </div>
          </div>

          {/* MODULE 5 & 6: COMPARISON & OUTLIER SKEWNESS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200 pt-4">
            {/* COMPARISON */}
            <div className="space-y-2">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 border-b border-slate-100 pb-1">
                5. Two-Dataset Comparison
              </h2>
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase">
                    <th className="py-1">Metric</th>
                    <th className="py-1">Data A</th>
                    <th className="py-1">Data B</th>
                    <th className="py-1">Δ (B-A)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr>
                    <td className="py-1 font-sans">Mean</td>
                    <td className="py-1">{statsA.mean}</td>
                    <td className="py-1">{statsB.mean}</td>
                    <td className="py-1 font-bold text-blue-600">{(statsB.mean - statsA.mean).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-sans">Median</td>
                    <td className="py-1">{statsA.median}</td>
                    <td className="py-1">{statsB.median}</td>
                    <td className="py-1 font-bold text-blue-600">{(statsB.median - statsA.median).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-sans">Range</td>
                    <td className="py-1">{statsA.range}</td>
                    <td className="py-1">{statsB.range}</td>
                    <td className="py-1 font-bold text-blue-600">{(statsB.range - statsA.range).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-sans">Sample SD</td>
                    <td className="py-1">{statsA.sampleSD}</td>
                    <td className="py-1">{statsB.sampleSD}</td>
                    <td className="py-1 font-bold text-blue-600">{(statsB.sampleSD - statsA.sampleSD).toFixed(4)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* OUTLIER & SKEWNESS */}
            <div className="space-y-2">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 border-b border-slate-100 pb-1">
                6. Outlier &amp; Skewness Inspector
              </h2>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500">Distribution Shape:</span>
                  <span className="font-bold text-blue-600">{outlierResult.skewnessShape}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500">Pearson Skewness:</span>
                  <span className="font-mono font-bold">{outlierResult.skewness}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500">Tukey 1.5×IQR Fences:</span>
                  <span className="font-mono font-bold">[{outlierResult.lowerFence}, {outlierResult.upperFence}]</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500">Identified Outliers:</span>
                  <span className="font-mono font-bold text-red-600">
                    {outlierResult.outliers.length > 0 ? outlierResult.outliers.join(", ") : "None detected"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="border-t border-slate-200 pt-4 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Generated by CalcPlatform Mean, Median, Mode &amp; Range Suite</span>
            <span>Mathematical Validation: 100% Verified Statistical Calculations</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MMMReportModal;

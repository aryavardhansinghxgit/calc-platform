"use client";

import React from "react";
import { Printer, X, ShieldCheck, Bookmark, Layers, TrendingUp } from "lucide-react";
import {
  SurveySampleResult,
  ContinuousMeanSampleResult,
  PowerAnalysisResult,
  ABTestSampleResult,
  ReverseMOEResult,
  generatePowerCurvePoints
} from "@/app/calculators/sample-size-calculator/sample-size-logic";

interface SampleSizeReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  surveyResult: SurveySampleResult;
  contResult: ContinuousMeanSampleResult;
  powerResult: PowerAnalysisResult;
  abResult: ABTestSampleResult;
  revMOEResult: ReverseMOEResult;
}

export function SampleSizeReportModal({
  isOpen,
  onClose,
  surveyResult,
  contResult,
  powerResult,
  abResult,
  revMOEResult
}: SampleSizeReportModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const powerCurvePoints = generatePowerCurvePoints(
    powerResult.effectSizeD || 0.5,
    powerResult.alphaPct || 5,
    Math.max(100, Math.min(1000, (powerResult.nPerGroup || 64) * 2.5))
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 print:p-0 print:bg-white print:static">
      {/* PRINT-ONLY CSS RULES FOR COMPACT 2-PAGE EXECUTIVE REPORT */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm 10mm;
          }
          body {
            background: #ffffff !important;
            color: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          header, footer, nav, aside, .no-print, button {
            display: none !important;
          }
          .print-container {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            background: transparent !important;
          }
          .page-1 {
            page-break-after: always !important;
            break-after: page !important;
            min-height: 270mm;
          }
          .page-2 {
            page-break-before: always !important;
            break-before: page !important;
            min-height: 270mm;
          }
        }
      `}</style>

      <div className="print-container bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative my-8 print:my-0">
        {/* MODAL CONTROL HEADER (HIDDEN ON PRINT) */}
        <div className="no-print flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-slate-100">
                Executive PDF &amp; Print Report Preview (2 Pages)
              </h2>
              <p className="text-xs text-slate-500">
                Optimized layout for A4 portrait with zero page-break fragmentation.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* REPORT PAGE 1: SURVEY, CONTINUOUS MEAN, A/B & POWER CURVE */}
        {/* ========================================================================= */}
        <div className="page-1 space-y-4">
          {/* HEADER BANNER */}
          <div className="flex items-center justify-between border-b-2 border-blue-600 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                CalcPlatform Statistical Inference Report
              </span>
              <h1 className="text-xl font-black text-slate-900 dark:text-slate-100">
                Sample Size Determination &amp; Power Analysis
              </h1>
            </div>
            <div className="text-right text-[11px] text-slate-500 font-mono">
              Generated: {new Date().toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" })}
            </div>
          </div>

          {/* KEY METRICS SUMMARY STRIP */}
          <div className="grid grid-cols-4 gap-2">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center">
              <span className="text-[9px] font-bold uppercase text-slate-500 block">Survey Sample (n)</span>
              <span className="text-xl font-black text-blue-600 font-mono">
                {surveyResult.sampleSize.toLocaleString()}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[9px] font-bold uppercase text-slate-500 block">Recruitment Target</span>
              <span className="text-xl font-black text-slate-900 dark:text-slate-100 font-mono">
                {surveyResult.invitedTarget.toLocaleString()}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[9px] font-bold uppercase text-slate-500 block">Confidence Level</span>
              <span className="text-xl font-black text-slate-900 dark:text-slate-100 font-mono">
                {surveyResult.confidenceLevelPct}%
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[9px] font-bold uppercase text-slate-500 block">Margin of Error</span>
              <span className="text-xl font-black text-slate-900 dark:text-slate-100 font-mono">
                &plusmn;{surveyResult.marginOfErrorPct}%
              </span>
            </div>
          </div>

          {/* SECTION 1: SURVEY & POLLING SAMPLE SIZE (COCHRAN + FPC) */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <h3 className="text-xs font-black uppercase text-blue-600 tracking-wider">
                1. Survey &amp; Polling Sample Size (Cochran's Formula &amp; FPC)
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                Critical Z = {surveyResult.zScore}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <p><strong>Parameters:</strong> Conf = {surveyResult.confidenceLevelPct}%, MOE = &plusmn;{surveyResult.marginOfErrorPct}%, Proportion p = 50%</p>
                <p><strong>Population:</strong> {surveyResult.populationN ? `N = ${surveyResult.populationN.toLocaleString()} (FPC Applied)` : "Infinite / Unbounded (FPC Not Applied)"}</p>
                <p><strong>Uncorrected Cochran n₀:</strong> {surveyResult.uncorrectedN.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p><strong>Recommended Sample (n):</strong> <span className="font-bold text-blue-600">{surveyResult.sampleSize.toLocaleString()} completed</span></p>
                <p><strong>Recruitment Invites ({surveyResult.responseRatePct}% response):</strong> {surveyResult.invitedTarget.toLocaleString()} participants</p>
                <p className="text-[11px] text-slate-500"><strong>Formula:</strong> n₀ = (Z² · p(1−p)) / e²; n = n₀ / [1 + (n₀ − 1)/N]</p>
              </div>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-[11px] font-sans text-slate-600 dark:text-slate-300">
              <strong>APA Methodology Text:</strong> To achieve a {surveyResult.confidenceLevelPct}% confidence level with a &plusmn;{surveyResult.marginOfErrorPct}% margin of error, a minimum sample size of N = {surveyResult.sampleSize.toLocaleString()} completed responses is required (Cochran's formula{surveyResult.fpcApplied ? `, adjusted for a finite population of N = ${surveyResult.populationN?.toLocaleString()}` : ""}). Assuming a target response rate of {surveyResult.responseRatePct}%, a gross recruitment target of N = {surveyResult.invitedTarget.toLocaleString()} potential participants should be invited.
            </div>
          </div>

          {/* SECTION 2: CONTINUOUS MEAN & STANDARD DEVIATION MODE */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <h3 className="text-xs font-black uppercase text-blue-600 tracking-wider">
                2. Continuous Mean Estimation Sample Size
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                Formula: n = ⌈(Z · σ / E)²⌉
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span className="text-[10px] text-slate-400 block uppercase">Standard Deviation (σ)</span>
                <span className="font-mono font-bold">{contResult.sd}</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span className="text-[10px] text-slate-400 block uppercase">Desired Margin (E)</span>
                <span className="font-mono font-bold">&plusmn;{contResult.precisionE}</span>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Required Sample</span>
                <span className="font-mono font-bold text-blue-600">{contResult.sampleSize.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* SECTION 3: TWO PROPORTIONS A/B TESTING & POWER ANALYSIS */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <h3 className="text-xs font-black uppercase text-blue-600 tracking-wider">
                3. Two Proportions A/B Testing &amp; Conversion Sizing
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                Power = {abResult.powerPct}%, α = {abResult.alphaPct}%
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span className="text-[10px] text-slate-400 block uppercase">Baseline (P1)</span>
                <span className="font-mono font-bold">{abResult.p1Pct}%</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span className="text-[10px] text-slate-400 block uppercase">Variant (P2)</span>
                <span className="font-mono font-bold">{abResult.p2Pct}%</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span className="text-[10px] text-slate-400 block uppercase">Absolute MDE</span>
                <span className="font-mono font-bold">&plusmn;{abResult.absDiffPct}% pts</span>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <span className="text-[10px] text-slate-400 block uppercase">Sample / Variant</span>
                <span className="font-mono font-bold text-blue-600">{abResult.sampleSizePerVariant.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC STATISTICAL POWER CURVE */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <h3 className="text-xs font-black uppercase text-blue-600 tracking-wider">
                Statistical Power Curve (1 - β vs. Sample Size per Group)
              </h3>
              <span className="text-[10px] font-mono text-emerald-600 font-bold">
                Benchmark: {powerResult.powerPct || 80}% Power
              </span>
            </div>
            <div className="w-full flex justify-center py-1">
              <svg viewBox="0 0 500 120" className="w-full max-w-lg h-auto" suppressHydrationWarning>
                {/* Axes */}
                <line x1="40" y1="95" x2="480" y2="95" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="40" y1="95" x2="40" y2="15" stroke="#94a3b8" strokeWidth="1.5" />

                {/* Grid Lines */}
                {[0.2, 0.5, 0.8, 1.0].map((pw) => {
                  const y = 95 - pw * 75;
                  return (
                    <g key={pw}>
                      <line x1="40" y1={y} x2="480" y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2,2" />
                      <text x="35" y={y + 3} textAnchor="end" fontSize="8" fontFamily="monospace" fill="#94a3b8">
                        {(pw * 100).toFixed(0)}%
                      </text>
                    </g>
                  );
                })}

                {/* Benchmark Line */}
                {(() => {
                  const bPower = (powerResult.powerPct || 80) / 100;
                  const bY = 95 - bPower * 75;
                  return (
                    <g>
                      <line x1="40" y1={bY} x2="480" y2={bY} stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,2" />
                      <text x="475" y={bY - 3} textAnchor="end" fontSize="8" fontFamily="monospace" fontWeight="bold" fill="#10b981">
                        {powerResult.powerPct || 80}% Benchmark
                      </text>
                    </g>
                  );
                })()}

                {/* Power Curve Path */}
                {(() => {
                  if (!powerCurvePoints || powerCurvePoints.length === 0) return null;
                  const minN = powerCurvePoints[0].sampleSize;
                  const maxN = powerCurvePoints[powerCurvePoints.length - 1].sampleSize;
                  const pathStr = powerCurvePoints.map((pt, i) => {
                    const x = 40 + ((pt.sampleSize - minN) / (maxN - minN || 1)) * 440;
                    const y = 95 - pt.power * 75;
                    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(" ");
                  return <path d={pathStr} fill="none" stroke="#2563eb" strokeWidth="2.5" suppressHydrationWarning />;
                })()}
              </svg>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* REPORT PAGE 2: REVERSE MOE, BENCHMARK MATRIX, FORMULAS & DISCLAIMER */}
        {/* ========================================================================= */}
        <div className="page-2 space-y-4 pt-6 print:pt-0">
          <div className="flex items-center justify-between border-b-2 border-blue-600 pb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
              CalcPlatform Executive Audit Report — Page 2
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Sample Size Benchmarks &amp; Reference Architecture
            </span>
          </div>

          {/* SECTION 4: REVERSE MARGIN OF ERROR */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-xs font-black uppercase text-blue-600 tracking-wider">
              4. Reverse Margin of Error Analysis
            </h3>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span className="text-[10px] text-slate-400 block uppercase">Completed Sample (n)</span>
                <span className="font-mono font-bold">{revMOEResult.sampleN.toLocaleString()}</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span className="text-[10px] text-slate-400 block uppercase">Confidence Level</span>
                <span className="font-mono font-bold">{revMOEResult.confidenceLevelPct}% (Z={revMOEResult.zScore})</span>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Achieved MOE</span>
                <span className="font-mono font-bold text-blue-600">{revMOEResult.moeFormatted}</span>
              </div>
            </div>
          </div>

          {/* SECTION 5: AUDITED BENCHMARK REFERENCE MATRIX */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <h3 className="text-xs font-black uppercase text-blue-600 tracking-wider">
                5. Sample Size Reference Matrix across Populations (N)
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">
                Cochran's Formula + FPC (p = 0.50)
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] border-collapse font-sans">
                <thead>
                  <tr className="bg-blue-600 text-white font-bold">
                    <th className="p-2">Population Size (N)</th>
                    <th className="p-2">95% Conf, &plusmn;5% MOE</th>
                    <th className="p-2">95% Conf, &plusmn;3% MOE</th>
                    <th className="p-2">99% Conf, &plusmn;1% MOE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono">
                  <tr>
                    <td className="p-2 font-bold text-slate-900 dark:text-slate-100">100</td>
                    <td className="p-2 font-bold text-blue-600">80</td>
                    <td className="p-2">92</td>
                    <td className="p-2">100</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-900 dark:text-slate-100">500</td>
                    <td className="p-2 font-bold text-blue-600">218</td>
                    <td className="p-2">341</td>
                    <td className="p-2">486</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-900 dark:text-slate-100">1,000</td>
                    <td className="p-2 font-bold text-blue-600">278</td>
                    <td className="p-2">517</td>
                    <td className="p-2">944</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-900 dark:text-slate-100">10,000</td>
                    <td className="p-2 font-bold text-blue-600">370</td>
                    <td className="p-2">965</td>
                    <td className="p-2">6,240</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-900 dark:text-slate-100">100,000+ (Infinite)</td>
                    <td className="p-2 font-bold text-blue-600">385</td>
                    <td className="p-2">1,068</td>
                    <td className="p-2">16,588</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 6: MATHEMATICAL FORMULAS REFERENCE */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-xs font-black uppercase text-blue-600 tracking-wider">
              6. Mathematical Formulas Reference
            </h3>
            <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span className="font-bold block text-slate-700 dark:text-slate-300">Cochran's Formula &amp; FPC:</span>
                <span>n₀ = (Z² · p(1−p)) / e²</span>
                <span className="block">n = n₀ / [1 + (n₀ − 1) / N]</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span className="font-bold block text-slate-700 dark:text-slate-300">A/B Testing Proportions:</span>
                <span>n = (Z_α/2 + Z_β)² · [p₁(1−p₁) + p₂(1−p₂)] / (p₁ − p₂)²</span>
              </div>
            </div>
          </div>

          {/* SECTION 7: REGULATORY & STATISTICAL DISCLAIMER */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-[10px] text-slate-500 leading-relaxed space-y-1">
            <div className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Biostatistical &amp; Regulatory Disclaimer</span>
            </div>
            <p>
              This report provides mathematical sample size determination and power calculations based on normal distribution approximations and user-supplied parameters. Sample size recommendations assume simple random sampling unless Finite Population Correction is specified. Regulatory submissions for FDA, EMA, or ICH clinical trials require detailed protocol design, multiplicity corrections, and specialized biostatistical validation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SampleSizeReportModal;

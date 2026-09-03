"use client";

import React from "react";
import { X, Printer, CheckCircle2, ShieldAlert } from "lucide-react";
import {
  StandardZResult,
  InverseZResult,
  IntervalZResult,
  BatchZResult,
  normalPDF
} from "@/app/calculators/z-score-calculator/z-score-logic";

interface ZScoreReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  standardResult: StandardZResult;
  inverseResult: InverseZResult;
  intervalResult: IntervalZResult;
  batchResult: BatchZResult;
}

export function ZScoreReportModal({
  isOpen,
  onClose,
  standardResult,
  inverseResult,
  intervalResult,
  batchResult
}: ZScoreReportModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  // Mini SVG Bell Curve Generator for Print Report
  const renderPrintBellCurve = (targetZ: number, shadedMode: "left" | "right" | "two" | "interval" = "left", z2: number = 0) => {
    const width = 460;
    const height = 110;
    const padding = 30;
    const drawWidth = width - 2 * padding;
    const zMin = -3.5;
    const zMax = 3.5;

    const scaleX = (z: number) => {
      const clampedZ = Math.max(zMin, Math.min(zMax, z));
      return padding + ((clampedZ - zMin) / (zMax - zMin)) * drawWidth;
    };

    const scaleY = (pdf: number) => {
      const maxPDF = 0.42;
      return height - 20 - (pdf / maxPDF) * (height - 35);
    };

    const totalSteps = 140;
    const points: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i <= totalSteps; i++) {
      const z = Number((-3.5 + i * 0.05).toFixed(2));
      const px = Number(scaleX(z).toFixed(1));
      const py = Number(scaleY(normalPDF(z)).toFixed(1));
      points.push({ x: px, y: py, z });
    }

    const curvePathStr = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

    let shadedPoints: { x: number; y: number }[] = [];
    if (shadedMode === "left") {
      shadedPoints = points.filter(p => p.z <= targetZ + 1e-4);
    } else if (shadedMode === "right") {
      shadedPoints = points.filter(p => p.z >= targetZ - 1e-4);
    } else if (shadedMode === "two") {
      const absZ = Math.abs(targetZ);
      shadedPoints = points.filter(p => p.z <= -absZ + 1e-4 || p.z >= absZ - 1e-4);
    } else if (shadedMode === "interval") {
      const minZ = Math.min(targetZ, z2);
      const maxZ = Math.max(targetZ, z2);
      shadedPoints = points.filter(p => p.z >= minZ - 1e-4 && p.z <= maxZ + 1e-4);
    }

    let shadePathStr = "";
    if (shadedPoints.length > 0) {
      const firstX = shadedPoints[0].x.toFixed(1);
      const lastX = shadedPoints[shadedPoints.length - 1].x.toFixed(1);
      const baselineY = (height - 20).toFixed(1);
      const pathSegs = shadedPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
      shadePathStr = `${pathSegs} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;
    }

    const xPos = Number(scaleX(targetZ).toFixed(1));
    const xPos2 = Number(scaleX(z2).toFixed(1));

    return (
      <svg viewBox="0 0 460 110" className="w-full max-w-md h-auto mx-auto block" suppressHydrationWarning>
        <line x1={padding} y1={height - 20} x2={width - padding} y2={height - 20} stroke="#94a3b8" strokeWidth="1.5" />
        {shadePathStr && <path d={shadePathStr} fill="#3b82f6" opacity="0.35" suppressHydrationWarning />}
        <path d={curvePathStr} fill="none" stroke="#2563eb" strokeWidth="2" suppressHydrationWarning />
        {[-3, -2, -1, 0, 1, 2, 3].map(t => {
          const x = scaleX(t);
          return (
            <g key={t}>
              <line x1={x} y1={height - 20} x2={x} y2={height - 16} stroke="#64748b" strokeWidth="1" />
              <text x={x} y={height - 6} textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#64748b">
                {t === 0 ? "μ" : `${t > 0 ? "+" : ""}${t}σ`}
              </text>
            </g>
          );
        })}
        {Number.isFinite(targetZ) && (
          <g>
            <line x1={xPos} y1="12" x2={xPos} y2={height - 20} stroke="#1d4ed8" strokeWidth="1.5" strokeDasharray="3,3" />
            <circle cx={xPos} cy="12" r="3" fill="#1d4ed8" />
            <text x={xPos} y="8" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="monospace" fill="#1d4ed8">
              Z={targetZ.toFixed(2)}
            </text>
          </g>
        )}
        {shadedMode === "interval" && Number.isFinite(z2) && (
          <g>
            <line x1={xPos2} y1="12" x2={xPos2} y2={height - 20} stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />
            <circle cx={xPos2} cy="12" r="3" fill="#10b981" />
            <text x={xPos2} y="8" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="monospace" fill="#10b981">
              Z2={z2.toFixed(2)}
            </text>
          </g>
        )}
      </svg>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 print:p-0 print:bg-white print:static">
      {/* PRINT-ONLY CSS RULES FOR COMPACT 2-PAGE EXECUTIVE LAYOUT */}
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
          /* Hide non-print elements */
          header, footer, nav, aside, .no-print, button {
            display: none !important;
          }
          .print-container {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
          .page-break-after {
            page-break-after: always !important;
            break-after: page !important;
          }
          .avoid-break {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>

      <div className="print-container bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl print:max-h-none print:overflow-visible print:border-none print:shadow-none print:rounded-none">
        {/* MODAL CONTROL HEADER (HIDDEN IN PRINT) */}
        <div className="no-print sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Executive PDF &amp; Print Report Preview (2 Pages)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PAGE 1: STANDARD Z-SCORE, PROBABILITY ENGINE & INVERSE SOLVER */}
        {/* ========================================================================= */}
        <div className="p-8 print:p-2 space-y-6 page-break-after">
          {/* Header */}
          <div className="border-b-2 border-blue-600 pb-3 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl text-blue-600">CalcPlatform</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 uppercase tracking-wider">
                  Normal Distribution Suite
                </span>
              </div>
              <h1 className="text-xl font-black text-slate-900 mt-1">
                Z-Score &amp; Standard Normal Probability Report
              </h1>
            </div>
            <div className="text-right text-[11px] text-slate-500 font-mono">
              <p>Generated: {new Date().toLocaleDateString()}</p>
              <p>Status: Statistically Verified</p>
              <p className="font-bold text-slate-700">Page 1 of 2</p>
            </div>
          </div>

          {/* Module 1: Standard Z-Score & Probabilities */}
          <div className="avoid-break space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-wider text-blue-600">
                1. Standard Z-Score &amp; Probability Analysis (X, μ, σ)
              </h2>
              <span className="text-xs font-bold text-slate-500 font-mono">
                Scope: {standardResult.isSample ? "Sample (x̄, s)" : "Population (μ, σ)"}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Z-Score</span>
                <span className="text-xl font-black font-mono text-blue-600">
                  {standardResult.zScoreFormatted}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Percentile</span>
                <span className="text-xl font-black font-mono text-slate-800">
                  {standardResult.percentileRank}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Left Tail P(Z &lt; z)</span>
                <span className="text-lg font-bold font-mono text-slate-800">
                  {standardResult.leftTailPct}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Two-Tail P(|Z| &gt; |z|)</span>
                <span className="text-lg font-bold font-mono text-slate-800">
                  {standardResult.twoTailsPct}
                </span>
              </div>
            </div>

            {/* Substitution Formula & Step Text */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono">
              <span className="font-bold text-slate-700 block mb-1">Mathematical Derivation:</span>
              <span className="text-blue-700 font-bold">{standardResult.stepText}</span>
            </div>

            {/* Visual Bell Curve */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                Standard Normal Distribution Φ(Z) Visualization
              </span>
              {renderPrintBellCurve(standardResult.zScore, "left")}
            </div>
          </div>

          {/* Module 2: Inverse Z-Score & Critical Values */}
          <div className="avoid-break space-y-3 pt-2 border-t border-slate-200">
            <h2 className="text-sm font-black uppercase tracking-wider text-blue-600">
              2. Inverse Critical Value &amp; Confidence Interval Solver (Z*)
            </h2>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Input Parameter</span>
                <span className="text-sm font-black font-mono text-slate-800">
                  {inverseResult.probInput} ({inverseResult.probType.toUpperCase()})
                </span>
                <span className="text-[9px] text-slate-500 block capitalize">{inverseResult.tailType} Tail</span>
              </div>
              <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Critical Value Z*</span>
                <span className="text-lg font-black font-mono text-blue-600">
                  {inverseResult.tailType === "two" ? `±${inverseResult.criticalZFormatted}` : inverseResult.criticalZFormatted}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Raw Value &amp; Margin</span>
                <span className="text-sm font-black font-mono text-slate-800">
                  X = {inverseResult.rawValueFormatted}
                </span>
                <span className="text-[9px] text-slate-500 block font-mono">
                  MOE = ±{inverseResult.marginOfErrorFormatted}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              {inverseResult.explanation}
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PAGE 2: INTERVAL AREA, BATCH DATASET ANALYZER & FORMULA GUIDE */}
        {/* ========================================================================= */}
        <div className="p-8 print:p-2 space-y-6">
          {/* Header */}
          <div className="border-b-2 border-blue-600 pb-3 flex items-center justify-between">
            <div>
              <span className="font-black text-xl text-blue-600">CalcPlatform</span>
              <h1 className="text-xl font-black text-slate-900 mt-1">
                Interval Area &amp; Batch Dataset Z-Score Analysis
              </h1>
            </div>
            <div className="text-right text-[11px] text-slate-500 font-mono">
              <p>Generated: {new Date().toLocaleDateString()}</p>
              <p className="font-bold text-slate-700">Page 2 of 2</p>
            </div>
          </div>

          {/* Module 3: Interval Area Calculator */}
          <div className="avoid-break space-y-3">
            <h2 className="text-sm font-black uppercase tracking-wider text-blue-600">
              3. Interval &amp; Range Area Analysis P(X₁ ≤ X ≤ X₂)
            </h2>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[9px] text-slate-500 uppercase block">Bounds</span>
                <span className="font-bold font-mono">[{intervalResult.x1}, {intervalResult.x2}]</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[9px] text-slate-500 uppercase block">Z-Scores</span>
                <span className="font-bold font-mono">Z1={intervalResult.z1Formatted}, Z2={intervalResult.z2Formatted}</span>
              </div>
              <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-[9px] text-blue-700 uppercase font-bold block">Area Between</span>
                <span className="font-black font-mono text-blue-700 text-sm">{intervalResult.areaBetweenPct}</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[9px] text-slate-500 uppercase block">Area Outside</span>
                <span className="font-bold font-mono">{intervalResult.areaOutsidePct}</span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              {renderPrintBellCurve(intervalResult.z1, "interval", intervalResult.z2)}
            </div>
          </div>

          {/* Module 4: Batch Dataset Summary */}
          <div className="avoid-break space-y-3 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-wider text-blue-600">
                4. Batch Dataset Analysis (N = {batchResult.count})
              </h2>
              <div className="text-xs font-mono text-slate-600 space-x-3">
                <span>Mean = <strong>{batchResult.mean}</strong></span>
                <span>SD (s) = <strong>{batchResult.sd}</strong></span>
                <span>Var (s²) = <strong>{batchResult.variance}</strong></span>
                <span>Median = <strong>{batchResult.median}</strong></span>
              </div>
            </div>

            {/* Batch Table */}
            <div className="overflow-hidden border border-slate-200 rounded-lg text-[10px]">
              <table className="w-full text-left">
                <thead className="bg-slate-100 font-bold uppercase text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="p-1.5">#</th>
                    <th className="p-1.5">Raw Value (X)</th>
                    <th className="p-1.5">Calculated Z-Score</th>
                    <th className="p-1.5">Percentile Rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {batchResult.items.slice(0, 10).map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                      <td className="p-1.5 text-slate-400">{idx + 1}</td>
                      <td className="p-1.5 font-bold text-slate-800">{item.val}</td>
                      <td className="p-1.5 font-bold text-blue-600">{item.zScoreFormatted}</td>
                      <td className="p-1.5 text-slate-700">{item.percentilePct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {batchResult.items.length > 10 && (
                <div className="p-1 text-center text-[9px] text-slate-500 bg-slate-50">
                  Showing top 10 of {batchResult.items.length} observations (full dataset exported in CSV).
                </div>
              )}
            </div>
          </div>

          {/* Module 5: Mathematical Reference Equations */}
          <div className="avoid-break space-y-2 pt-2 border-t border-slate-200 text-[10px] text-slate-600">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider">
              Mathematical Formulas &amp; Statistical Reference
            </h3>
            <div className="grid grid-cols-3 gap-2 font-mono">
              <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                <strong>Standardization:</strong>
                <p>Z = (X − μ) / σ</p>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                <strong>Empirical Rule:</strong>
                <p>68.27% (±1σ), 95.45% (±2σ)</p>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                <strong>Sample SD (Bessel):</strong>
                <p>s = √[Σ(x − x̄)² / (n − 1)]</p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="avoid-break p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[9px] text-slate-500 flex items-start gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <p>
              Statistical Disclaimer: Z-score conversions to percentiles assume the underlying distribution is normally distributed. Calculations utilize high-precision Abramowitz &amp; Stegun and Acklam approximations. Verified for educational, engineering, and statistical analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ZScoreReportModal;

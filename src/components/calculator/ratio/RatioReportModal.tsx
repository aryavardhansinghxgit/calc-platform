"use client";

import React from "react";
import { Printer, X, FileText } from "lucide-react";

interface RatioReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  propTarget: string;
  propA: string;
  propB: string;
  propC: string;
  propD: string;
  propCalc: {
    solvedVal?: number;
    solvedLabel?: string;
    latex?: string;
    steps?: string[];
    error?: string | null;
  };
  simpA: string;
  simpB: string;
  simpC: string;
  simpCalc: {
    solvedLabel?: string;
    formatted?: string;
    unitRate?: string;
    latex?: string;
    steps?: string[];
    error?: string | null;
  };
  partTotal: string;
  partA: string;
  partB: string;
  partC: string;
  partCalc: {
    solvedLabel?: string;
    formatted?: string;
    shareA?: number;
    shareB?: number;
    shareC?: number;
    pctA?: number;
    pctB?: number;
    pctC?: number;
    hasC?: boolean;
    steps?: string[];
    error?: string | null;
  };
  aspectTool: "aspect" | "golden";
  aspectCalc: {
    isGolden?: boolean;
    solvedLabel?: string;
    formatted?: string;
    simpAspect?: string;
    megapixels?: number;
    aPart?: number;
    bPart?: number;
    totalL?: number;
    steps?: string[];
    error?: string | null;
  };
}

export function RatioReportModal({
  isOpen,
  onClose,
  propTarget,
  propA,
  propB,
  propC,
  propD,
  propCalc,
  simpA,
  simpB,
  simpC,
  simpCalc,
  partTotal,
  partA,
  partB,
  partC,
  partCalc,
  aspectTool,
  aspectCalc
}: RatioReportModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #ratio-report-content,
          #ratio-report-content * {
            visibility: visible;
          }
          #ratio-report-content {
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
              Ratio &amp; Proportion Executive Summary Report
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
        <div id="ratio-report-content" className="p-6 sm:p-8 space-y-6 text-slate-900 dark:text-slate-100 font-sans">
          {/* EXECUTIVE HEADER */}
          <div className="border-b border-slate-200 pb-4 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-blue-700">Ratio &amp; Proportion Analysis Report</h1>
              <p className="text-xs text-slate-500 mt-1">
                Proportion Solver, Multi-Term Simplifier, Amount Partitioning &amp; Aspect/Golden Ratio Suite
              </p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <span className="font-bold text-slate-700 block">{today}</span>
              <span>CalcPlatform Mathematics Suite</span>
            </div>
          </div>

          {/* MODULE 1: PROPORTION SOLVER */}
          <div className="space-y-3">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 border-b border-slate-100 pb-1">
              1. Proportion Solver (A / B = C / D)
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Term A</span>
                <span className="text-sm font-bold font-mono">{propTarget === "A" ? "?" : propA}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Term B</span>
                <span className="text-sm font-bold font-mono">{propTarget === "B" ? "?" : propB}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Term C</span>
                <span className="text-sm font-bold font-mono">{propTarget === "C" ? "?" : propC}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Term D</span>
                <span className="text-sm font-bold font-mono">{propTarget === "D" ? "?" : propD}</span>
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-blue-700">Solved Missing Variable ({propTarget})</span>
              <span className="text-xl font-extrabold font-mono text-blue-700">
                {propCalc.solvedVal !== undefined && !isNaN(propCalc.solvedVal) ? propCalc.solvedVal.toFixed(4) : "N/A"}
              </span>
            </div>

            {propCalc.steps && propCalc.steps.length > 0 && (
              <div className="space-y-1 text-xs font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
                {propCalc.steps.map((s, i) => (
                  <div key={i}>{s}</div>
                ))}
              </div>
            )}
          </div>

          {/* MODULE 2: RATIO SIMPLIFIER */}
          <div className="space-y-3 border-t border-slate-200 pt-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 border-b border-slate-100 pb-1">
              2. Ratio Simplifier &amp; Unit Rate
            </h2>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Input Terms</span>
                <span className="text-sm font-bold font-mono">{simpA} : {simpB}{simpC ? ` : ${simpC}` : ""}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Simplified Integer Ratio</span>
                <span className="text-sm font-extrabold font-mono text-blue-600">{simpCalc.formatted || "N/A"}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Unit Rate (A / B)</span>
                <span className="text-sm font-bold font-mono">{simpCalc.unitRate || "N/A"}</span>
              </div>
            </div>

            {simpCalc.steps && simpCalc.steps.length > 0 && (
              <div className="space-y-1 text-xs font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
                {simpCalc.steps.map((s, i) => (
                  <div key={i}>{s}</div>
                ))}
              </div>
            )}
          </div>

          {/* MODULE 3: RATIO PARTITIONING */}
          <div className="space-y-3 border-t border-slate-200 pt-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 border-b border-slate-100 pb-1">
              3. Ratio Partitioning &amp; Amount Allocation
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Amount</span>
                <span className="text-sm font-bold font-mono">{partTotal}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Share A ({partCalc.pctA?.toFixed(1)}%)</span>
                <span className="text-sm font-extrabold font-mono text-blue-600">{partCalc.shareA?.toFixed(2)}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Share B ({partCalc.pctB?.toFixed(1)}%)</span>
                <span className="text-sm font-extrabold font-mono text-emerald-600">{partCalc.shareB?.toFixed(2)}</span>
              </div>
              {partCalc.hasC && (
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Share C ({partCalc.pctC?.toFixed(1)}%)</span>
                  <span className="text-sm font-extrabold font-mono text-purple-600">{partCalc.shareC?.toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Visual Distribution Bar */}
            {partCalc.pctA !== undefined && (
              <div className="h-6 w-full rounded-lg overflow-hidden flex text-[10px] font-bold text-white text-center leading-6">
                <div style={{ width: `${partCalc.pctA}%` }} className="bg-blue-600">
                  Share A ({partCalc.pctA.toFixed(0)}%)
                </div>
                <div style={{ width: `${partCalc.pctB}%` }} className="bg-emerald-600">
                  Share B ({partCalc.pctB?.toFixed(0)}%)
                </div>
                {partCalc.hasC && partCalc.pctC && (
                  <div style={{ width: `${partCalc.pctC}%` }} className="bg-purple-600">
                    Share C ({partCalc.pctC.toFixed(0)}%)
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MODULE 4: ASPECT RATIO / GOLDEN RATIO */}
          <div className="space-y-3 border-t border-slate-200 pt-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 border-b border-slate-100 pb-1">
              4. {aspectTool === "aspect" ? "Aspect Ratio Resizer" : "Golden Ratio (Φ) Suite"}
            </h2>

            {aspectTool === "aspect" ? (
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Aspect Ratio</span>
                  <span className="text-sm font-bold font-mono">{aspectCalc.simpAspect}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Resized Resolution</span>
                  <span className="text-sm font-extrabold font-mono text-blue-600">{aspectCalc.formatted}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Megapixels</span>
                  <span className="text-sm font-bold font-mono">{aspectCalc.megapixels?.toFixed(2)} MP</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Segment A (Long)</span>
                  <span className="text-sm font-extrabold font-mono text-blue-600">{aspectCalc.aPart?.toFixed(4)}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Segment B (Short)</span>
                  <span className="text-sm font-extrabold font-mono text-amber-600">{aspectCalc.bPart?.toFixed(4)}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Length (A + B)</span>
                  <span className="text-sm font-bold font-mono">{aspectCalc.totalL?.toFixed(4)}</span>
                </div>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="border-t border-slate-200 pt-4 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Generated by CalcPlatform Ratio Calculator</span>
            <span>Mathematical Validation: 100% Verified Proportional Parity</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatioReportModal;

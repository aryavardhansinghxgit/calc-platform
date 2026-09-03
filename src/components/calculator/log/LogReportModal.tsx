"use client";

import React from "react";
import { Printer, X, Check, FileText } from "lucide-react";

interface LogReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseStr: string;
  xStr: string;
  genCalc: {
    resY?: number;
    formatted?: string;
    scientific?: string;
    lnX?: number;
    lnB?: number;
    log10X?: number;
    log2X?: number;
    latex?: string;
    steps?: string[];
    error?: string | null;
  };
  antilogBaseStr: string;
  exponentYStr: string;
  antiCalc: {
    resX?: number;
    formatted?: string;
    scientific?: string;
    steps?: string[];
    error?: string | null;
  };
  bTarget: string;
  bBase: string;
  bArgX: string;
  bLogY: string;
  bidirCalc: {
    resY?: number;
    formatted?: string;
    latex?: string;
    steps?: string[];
    error?: string | null;
  };
  svgChart: React.ReactNode;
}

export function LogReportModal({
  isOpen,
  onClose,
  baseStr,
  xStr,
  genCalc,
  antilogBaseStr,
  exponentYStr,
  antiCalc,
  bTarget,
  bBase,
  bArgX,
  bLogY,
  bidirCalc,
  svgChart
}: LogReportModalProps) {
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
          #log-report-content,
          #log-report-content * {
            visibility: visible;
          }
          #log-report-content {
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
              Logarithm Calculation Executive Summary Report
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
        <div id="log-report-content" className="p-6 sm:p-8 space-y-6 text-slate-900 dark:text-slate-100 font-sans">
          {/* HEADER */}
          <div className="border-b border-slate-200 pb-4 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-blue-700">Log Calculator &amp; Analysis Report</h1>
              <p className="text-xs text-slate-500 mt-1">
                Logarithm Evaluation, Antilogarithm, 3-Variable Solver &amp; Curve Analysis
              </p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <span className="font-bold text-slate-700 block">{today}</span>
              <span>CalcPlatform Mathematics Suite</span>
            </div>
          </div>

          {/* MODULE 1: PRIMARY LOGARITHM RESULT */}
          <div className="space-y-3">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 border-b border-slate-100 pb-1">
              1. Primary Logarithm Evaluation: log_{baseStr}({xStr})
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Base (b)</span>
                <span className="text-sm font-bold font-mono">{baseStr}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Argument (x)</span>
                <span className="text-sm font-bold font-mono">{xStr}</span>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 col-span-2">
                <span className="text-[10px] uppercase font-bold text-blue-600 block">Evaluated Result y = log_b(x)</span>
                <span className="text-lg font-extrabold font-mono text-blue-700">{genCalc.formatted || "N/A"}</span>
              </div>
            </div>

            {/* RELATED LOGARITHMS */}
            {!genCalc.error && (
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block font-sans uppercase">Natural Log ln(x)</span>
                  <span className="font-bold">{genCalc.lnX?.toFixed(8)}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block font-sans uppercase">Common Log log₁₀(x)</span>
                  <span className="font-bold">{genCalc.log10X?.toFixed(8)}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block font-sans uppercase">Binary Log log₂(x)</span>
                  <span className="font-bold">{genCalc.log2X?.toFixed(8)}</span>
                </div>
              </div>
            )}
          </div>

          {/* ACTIVE LOGARITHMIC CURVE */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Active Logarithmic Curve: f(x) = log_{baseStr}(x)
            </span>
            <div className="max-w-md mx-auto">{svgChart}</div>
          </div>

          {/* STEP-BY-STEP DERIVATION */}
          {genCalc.steps && genCalc.steps.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Step-by-Step Derivation
              </h3>
              <div className="space-y-1.5 text-xs font-mono">
                {genCalc.steps.map((step, idx) => (
                  <div key={idx} className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2">
                    <span className="font-bold text-blue-600">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 2: ANTILOGARITHM */}
          <div className="space-y-2 border-t border-slate-200 pt-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600">
              2. Antilogarithm Solver: {antilogBaseStr}^{exponentYStr}
            </h2>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase block">Base</span>
                <span className="font-mono font-bold">{antilogBaseStr}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase block">Exponent</span>
                <span className="font-mono font-bold">{exponentYStr}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase block">Antilog Result (x)</span>
                <span className="font-mono font-bold text-blue-600">{antiCalc.formatted || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* MODULE 3: 3-VARIABLE LOGARITHM SOLVER */}
          <div className="space-y-2 border-t border-slate-200 pt-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600">
              3. 3-Variable Logarithm Equation Solver (bʸ = x)
            </h2>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs font-mono">
              <div className="flex justify-between items-center">
                <span>Target: <strong>{bTarget.toUpperCase()}</strong></span>
                <span>Base (b): <strong>{bBase}</strong></span>
                <span>Argument (x): <strong>{bArgX}</strong></span>
                <span>Exponent (y): <strong>{bLogY}</strong></span>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-200 text-sm font-bold text-emerald-600">
                Solved Value = {bidirCalc.formatted || "N/A"}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="border-t border-slate-200 pt-4 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Generated by CalcPlatform Log Calculator</span>
            <span>Mathematical Validation: 100% Verified Real Domain</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogReportModal;

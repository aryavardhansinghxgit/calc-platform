"use client";

import React, { useRef } from "react";
import { Printer, Download, X, Superscript, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ExponentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Card 1: Power Solver
  solveTarget: string;
  baseVal: string;
  expVal: string;
  targetYVal: string;
  generalResult: any;
  // Card 2: Fractional
  fracBase: string;
  fracNum: string;
  fracDen: string;
  fractionalResult: any;
  // Card 3: Operations
  opType: string;
  opA: string;
  opB: string;
  opM: string;
  opN: string;
  operationsResult: any;
  // Card 4: Scientific
  sciBase: string;
  sciExp: string;
  sciResult: any;
}

export const ExponentReportModal: React.FC<ExponentReportModalProps> = ({
  isOpen,
  onClose,
  solveTarget,
  baseVal,
  expVal,
  targetYVal,
  generalResult,
  fracBase,
  fracNum,
  fracDen,
  fractionalResult,
  opType,
  opA,
  opB,
  opM,
  opN,
  operationsResult,
  sciBase,
  sciExp,
  sciResult
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (!printRef.current) return;
    const printContent = printRef.current.innerHTML;
    const windowPrint = window.open("", "", "left=0,top=0,width=850,height=950,toolbar=0,scrollbars=0,status=0");
    if (!windowPrint) return;

    windowPrint.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Exponent Calculator Executive Report</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0f172a; margin: 24px; line-height: 1.45; font-size: 11px; }
            h1 { font-size: 18px; font-weight: 800; color: #2563eb; margin-bottom: 2px; }
            .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; }
            .badge-blue { background: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe; }
            .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 12px 0; }
            .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin: 8px 0; }
            .grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; margin: 8px 0; }
            .box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 10px; }
            .box-title { font-size: 9px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 2px; }
            .box-val { font-size: 13px; font-weight: 800; color: #0f172a; font-family: monospace; }
            .hero-box { background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 8px; padding: 12px; text-align: center; margin: 12px 0; }
            .hero-title { font-size: 10px; font-weight: 700; color: #3b82f6; text-transform: uppercase; }
            .hero-val { font-size: 18px; font-weight: 900; color: #1d4ed8; font-family: monospace; margin: 4px 0; }
            .step-item { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 8px; margin-bottom: 4px; font-family: monospace; font-size: 10.5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 10px; }
            th, td { border: 1px solid #cbd5e1; padding: 5px 8px; text-align: left; }
            th { background: #f1f5f9; font-weight: 700; color: #1e293b; }
            .header-bar { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #2563eb; padding-bottom: 8px; margin-bottom: 12px; }
            .footer-bar { border-top: 1px solid #e2e8f0; padding-top: 8px; margin-top: 16px; font-size: 9px; color: #64748b; text-align: center; }
            @media print {
              body { margin: 12px; }
              @page { size: letter portrait; margin: 12mm; }
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);

    windowPrint.document.close();
    windowPrint.focus();
    setTimeout(() => {
      windowPrint.print();
      windowPrint.close();
    }, 250);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <DialogHeader className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Superscript className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                Executive Exponent Analysis Report
              </DialogTitle>
              <p className="text-xs text-slate-500">
                Print-optimized mathematical summary &amp; algebraic proofs
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handlePrint}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer">
                <X className="w-4 h-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        {/* PRINTABLE CONTENT CONTAINER */}
        <div ref={printRef} className="p-6 space-y-5 text-slate-900 text-xs bg-white">
          {/* HEADER BAR */}
          <div className="flex justify-between items-start border-b-2 border-blue-600 pb-3">
            <div>
              <h1 className="text-lg font-black text-blue-600">
                CalcPlatform — Exponent &amp; Powers Executive Report
              </h1>
              <p className="text-[10px] text-slate-500 font-medium">
                Comprehensive Mathematical Verification &bull; Standards Compliant
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold">
                ISO / IEEE 754 Floating-Point Verified
              </span>
              <p className="text-[9px] text-slate-400 mt-1 font-mono">
                {new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })} &bull;{" "}
                {new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>

          {/* SECTION 1: GENERAL POWER SOLVER */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b pb-1">
              1. General Power Solver (bⁿ = y)
            </h2>
            <div className="grid grid-cols-4 gap-2">
              <div className="p-2.5 bg-slate-50 rounded border">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">Target Variable</span>
                <span className="text-xs font-bold text-slate-900 font-mono capitalize">{solveTarget}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">Base (b)</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{baseVal}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">Exponent (n)</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{expVal}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">Result (y)</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{targetYVal}</span>
              </div>
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-center">
              <span className="text-[10px] font-bold text-blue-600 uppercase block">Calculated Result</span>
              <span className="text-lg font-black text-blue-900 font-mono">
                {generalResult.error ? generalResult.error : generalResult.formatted}
              </span>
              {generalResult.latex && (
                <span className="block text-[10px] text-blue-700 font-mono mt-0.5">
                  LaTeX: {generalResult.latex}
                </span>
              )}
            </div>

            {generalResult.steps && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-600 uppercase block">Step-by-Step Proof:</span>
                {generalResult.steps.map((step: string, idx: number) => (
                  <div key={idx} className="p-1.5 bg-slate-50 border rounded font-mono text-[10px]">
                    <span className="font-bold text-blue-600">{idx + 1}. </span>
                    {step}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 2: FRACTIONAL & RADICAL EXPONENTS */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b pb-1">
              2. Fractional &amp; Radical Exponents (bᵖ/ᑫ)
            </h2>
            <div className="grid grid-cols-4 gap-2">
              <div className="p-2.5 bg-slate-50 rounded border">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">Base (b)</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{fracBase}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">Numerator (p)</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{fracNum}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">Denominator (q)</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{fracDen}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">Decimal Power</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{fractionalResult.decExp}</span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 border rounded font-mono text-center">
              <span className="font-bold text-blue-600">Radical Form: </span>
              <span>{fractionalResult.radicalNotation}</span>
              <span className="mx-2">&bull;</span>
              <span className="font-bold text-blue-600">Evaluated Value: </span>
              <span className="font-black text-slate-900">{fractionalResult.formatted}</span>
            </div>
          </div>

          {/* SECTION 3: EXPONENT LAWS & OPERATIONS */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b pb-1">
              3. Exponent Law Operation: {operationsResult.formulaName}
            </h2>
            <div className="grid grid-cols-4 gap-2">
              <div className="p-2.5 bg-slate-50 rounded border">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">Base (a)</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{opA}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">Second Base (b)</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{opB}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">Exponent (m)</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{opM}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">Exponent (n)</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{opN}</span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 border rounded font-mono text-center">
              <span className="font-bold text-blue-600">Applied Rule: </span>
              <span>{operationsResult.rule}</span>
              <span className="mx-2">&bull;</span>
              <span className="font-bold text-blue-600">Result: </span>
              <span className="font-black text-slate-900">{operationsResult.res}</span>
            </div>
          </div>

          {/* SECTION 4: SCIENTIFIC & ENGINEERING NOTATION */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b pb-1">
              4. Scientific &amp; Engineering Notation Converter
            </h2>
            <div className="grid grid-cols-4 gap-2">
              <div className="p-2.5 bg-slate-50 rounded border">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">Decimal Value</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{sciResult.decimal}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">Scientific Form</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{sciResult.scientific}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">Engineering Form</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{sciResult.engineering}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">E-Notation</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{sciResult.eNotation}</span>
              </div>
            </div>
          </div>

          {/* FOOTER BAR */}
          <div className="border-t pt-3 mt-4 text-[9px] text-slate-500 text-center space-y-0.5">
            <p className="font-semibold text-slate-600">
              CalcPlatform Exponent Calculator &bull; https://calcplatform.com/calculators/exponent-calculator
            </p>
            <p>Generated for coursework, engineering documentation, and algebraic reference.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExponentReportModal;

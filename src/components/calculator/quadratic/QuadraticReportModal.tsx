"use client";

import React, { useRef } from "react";
import { Printer, Download, X, Superscript, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface QuadraticReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  a: number;
  b: number;
  c: number;
  aStr: string;
  bStr: string;
  cStr: string;
  calculation: any;
  svgChart: React.ReactNode;
}

export const QuadraticReportModal: React.FC<QuadraticReportModalProps> = ({
  isOpen,
  onClose,
  a,
  b,
  c,
  aStr,
  bStr,
  cStr,
  calculation,
  svgChart
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
          <title>Quadratic Equation Analysis &amp; Parabola Geometry Report</title>
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
            table { width: 100%; border-collapse: collapse; margin-top: 6px; font-size: 10px; }
            th { background: #2563eb; color: #ffffff; padding: 6px 8px; text-align: left; font-weight: 700; }
            td { padding: 5px 8px; border-bottom: 1px solid #e2e8f0; }
            .footer { margin-top: 16px; padding-top: 10px; border-top: 1px solid #cbd5e1; font-size: 9px; color: #64748b; }
            @media print {
              body { margin: 0; padding: 12px; }
              .no-print { display: none !important; }
              .page-break-avoid { break-inside: avoid; page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          ${printContent}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 750);
            };
          </script>
        </body>
      </html>
    `);
    windowPrint.document.close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[92vh] flex flex-col p-0 overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
        <DialogHeader className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-row items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600">
              <Superscript className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                Quadratic Analysis &amp; Parabola Geometry Report
              </DialogTitle>
              <p className="text-xs text-slate-500">
                Printable Executive Summary &amp; Step-by-Step Proof
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handlePrint}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500">
                <X className="w-4 h-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          <div ref={printRef} className="space-y-5 text-slate-900 dark:text-slate-100">
            {/* Header with Title and Timestamp */}
            <div className="flex items-start justify-between border-b pb-3 border-slate-200">
              <div>
                <h1 className="text-xl font-extrabold text-blue-600">
                  Quadratic Formula &amp; Parabola Geometry Report
                </h1>
                <p className="text-xs text-slate-500">
                  Standard Form: ax² + bx + c = 0 &bull; Complete Mathematical Audit
                </p>
              </div>
              <div className="text-right text-[10px] text-slate-400 font-sans tabular-nums">
                <div>Generated: {new Date().toLocaleDateString()}</div>
                <div>CalcPlatform Certified</div>
              </div>
            </div>

            {/* Active Equation Hero Box */}
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-center space-y-1">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                Active Quadratic Equation
              </span>
              <div className="text-xl font-extrabold font-mono text-blue-900">
                {a}x² {b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}x {c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`} = 0
              </div>
              <div className="text-xs text-slate-600 font-medium">
                Coefficients: a = {a}, b = {b}, c = {c}
              </div>
            </div>

            {/* Evaluated Roots Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Evaluated Roots (Solutions)
                </span>
                <div className="text-base font-extrabold font-mono text-slate-900">
                  {calculation?.isComplex ? (
                    <div>x = {calculation.realPart?.toFixed(4)} &plusmn; {calculation.absImag?.toFixed(4)}i</div>
                  ) : calculation?.isLinear ? (
                    <div>x = {calculation.linRoot?.toFixed(4)} (Linear)</div>
                  ) : (
                    <div>x₁ = {calculation?.x1Val?.toFixed(4)}, &nbsp; x₂ = {calculation?.x2Val?.toFixed(4)}</div>
                  )}
                </div>
                <div className="text-[11px] text-slate-600">
                  {calculation?.isComplex ? (
                    <span>Two Complex Conjugate Roots (x₁ = {calculation.x1Complex}, x₂ = {calculation.x2Complex})</span>
                  ) : calculation?.isRepeated ? (
                    <span>One Repeated Real Root (Tangent to x-axis)</span>
                  ) : (
                    <span>Two Distinct Real Roots</span>
                  )}
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Discriminant (&Delta; = b² - 4ac)
                </span>
                <div className="text-base font-extrabold font-mono text-blue-600">
                  &Delta; = {calculation?.disc}
                </div>
                <div className="text-[11px] text-slate-600">
                  Classification: {calculation?.discType}
                </div>
              </div>
            </div>

            {/* Parabola Geometry Grid */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Parabola Geometry &amp; Analytics
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[9px] text-slate-400 block font-sans uppercase">Vertex (h, k)</span>
                  <span className="font-bold">({calculation?.h?.toFixed(4)}, {calculation?.k?.toFixed(4)})</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[9px] text-slate-400 block font-sans uppercase">Orientation</span>
                  <span className="font-bold">{calculation?.isMin ? "Upward (Min)" : "Downward (Max)"}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[9px] text-slate-400 block font-sans uppercase">Axis of Symmetry</span>
                  <span className="font-bold">x = {calculation?.h?.toFixed(4)}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[9px] text-slate-400 block font-sans uppercase">Y-Intercept</span>
                  <span className="font-bold">(0, {calculation?.yIntercept})</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[9px] text-slate-400 block font-sans uppercase">Focus Coordinate</span>
                  <span className="font-bold">({calculation?.h?.toFixed(2)}, {calculation?.focusY?.toFixed(2)})</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[9px] text-slate-400 block font-sans uppercase">Directrix Line</span>
                  <span className="font-bold">y = {calculation?.directrixY?.toFixed(2)}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 col-span-2">
                  <span className="text-[9px] text-slate-400 block font-sans uppercase">Vertex Form Equation</span>
                  <span className="font-bold text-blue-600">{calculation?.vertexFormStr}</span>
                </div>
              </div>
            </div>

            {/* Embedded SVG Chart if available */}
            {svgChart && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 page-break-avoid">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Interactive 2D Parabola Coordinate Plot
                </span>
                <div className="w-full flex justify-center max-h-56 overflow-hidden">
                  {svgChart}
                </div>
              </div>
            )}

            {/* Step-by-Step Proof Breakdown */}
            {calculation?.stepsFormula && calculation.stepsFormula.length > 0 && (
              <div className="space-y-2 page-break-avoid">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Step-by-Step Algebraic Derivation (Quadratic Formula)
                </h2>
                <div className="space-y-1">
                  {calculation.stepsFormula.map((step: string, idx: number) => (
                    <div key={idx} className="p-2 bg-slate-50 border border-slate-200 rounded text-xs font-mono">
                      <span className="font-bold text-blue-600 mr-2">{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="footer text-[9px] text-slate-400 border-t pt-2 flex justify-between">
              <span>Quadratic Formula Calculator &bull; Educational &amp; Research Tool</span>
              <span>All Calculations Verified via Pure Algebraic Geometry</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuadraticReportModal;

"use client";

import React, { useRef } from "react";
import { DescriptiveStats, TwoDatasetComparison } from "@/app/calculators/standard-deviation-calculator/std-dev-logic";
import { Printer, Download, X, BarChart2, CheckCircle, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface StdDevReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  rawInput: string;
  isSample: boolean;
  stats: DescriptiveStats;
  rawInputA: string;
  rawInputB: string;
  comparison: TwoDatasetComparison;
  ciMean: string;
  ciSD: string;
  ciN: string;
  ciLevel: number;
  zScore: number;
  marginOfError: number;
}

export const StdDevReportModal: React.FC<StdDevReportModalProps> = ({
  isOpen,
  onClose,
  rawInput,
  isSample,
  stats,
  rawInputA,
  rawInputB,
  comparison,
  ciMean,
  ciSD,
  ciN,
  ciLevel,
  zScore,
  marginOfError,
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const activeSD = isSample ? stats.sampleSD : stats.popSD;
  const activeVar = isSample ? stats.sampleVar : stats.popVar;
  const ciMeanNum = parseFloat(ciMean) || 0;

  const handlePrint = () => {
    if (!printRef.current) return;
    const printContent = printRef.current.innerHTML;
    const windowPrint = window.open("", "", "left=0,top=0,width=850,height=950,toolbar=0,scrollbars=0,status=0");
    if (!windowPrint) return;

    windowPrint.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Standard Deviation & Statistical Analysis Report</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0f172a; margin: 20px; line-height: 1.4; font-size: 11px; }
            h1 { font-size: 18px; font-weight: 800; color: #2563eb; margin-bottom: 2px; }
            h2 { font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1.5px solid #bfdbfe; padding-bottom: 2px; margin-top: 14px; margin-bottom: 6px; }
            .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 6px; }
            .card { background: #f8fafc; border: 1px solid #cbd5e1; padding: 6px 10px; border-radius: 6px; }
            .card-title { font-size: 9px; text-transform: uppercase; color: #64748b; font-weight: 700; }
            .card-value { font-size: 14px; font-weight: 800; color: #0f172a; font-family: monospace; }
            .badge { background: #dbeafe; color: #1e40af; font-weight: bold; padding: 2px 6px; border-radius: 4px; font-size: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 6px; font-size: 10px; }
            th, td { border: 1px solid #cbd5e1; padding: 4px 6px; text-align: left; }
            th { background: #f1f5f9; font-weight: 700; color: #0f172a; }
            .footer { margin-top: 20px; font-size: 9px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 6px; }
            @media print {
              body { margin: 10mm; }
              table, tr, .card { break-inside: avoid; }
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl">
        <DialogHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <DialogTitle className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
            <BarChart2 className="w-5 h-5 text-blue-600" />
            Standard Deviation Statistical Report
          </DialogTitle>
          <div className="flex items-center gap-2">
            <Button
              onClick={handlePrint}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer">
                <X className="w-4 h-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div ref={printRef} className="space-y-4 text-slate-900 dark:text-slate-100 font-sans p-2">
          {/* Header Banner */}
          <div className="flex items-center justify-between border-b pb-2">
            <div>
              <h1 className="text-xl font-black text-blue-600">DESCRIPTIVE STATISTICS SUMMARY</h1>
              <p className="text-xs text-slate-500 font-mono">
                Generated: {new Date().toLocaleDateString(undefined, { dateStyle: "medium" })} at {new Date().toLocaleTimeString(undefined, { timeStyle: "short" })}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-2.5 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800">
                Mode: {isSample ? "Sample SD (Bessel's n - 1)" : "Population SD (Census N)"}
              </span>
            </div>
          </div>

          {/* Dataset Input Info */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border text-xs space-y-1">
            <span className="font-bold uppercase text-[10px] text-slate-500">Active Dataset Input:</span>
            <p className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 break-all">{rawInput}</p>
          </div>

          {/* Primary Key Metrics Grid */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Core Statistical Parameters</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <div className="card p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border">
                <span className="card-title block text-[10px] uppercase text-slate-500 font-bold">Standard Deviation ({isSample ? "s" : "σ"})</span>
                <span className="card-value text-base font-black text-blue-600 font-mono">{activeSD.toFixed(4)}</span>
              </div>
              <div className="card p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border">
                <span className="card-title block text-[10px] uppercase text-slate-500 font-bold">Variance ({isSample ? "s²" : "σ²"})</span>
                <span className="card-value text-base font-black text-slate-800 dark:text-slate-200 font-mono">{activeVar.toFixed(4)}</span>
              </div>
              <div className="card p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border">
                <span className="card-title block text-[10px] uppercase text-slate-500 font-bold">Arithmetic Mean (x̄)</span>
                <span className="card-value text-base font-black text-slate-800 dark:text-slate-200 font-mono">{stats.mean.toFixed(4)}</span>
              </div>
              <div className="card p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border">
                <span className="card-title block text-[10px] uppercase text-slate-500 font-bold">Sum of Squares (SS)</span>
                <span className="card-value text-base font-black text-slate-800 dark:text-slate-200 font-mono">{stats.sumSqDev.toFixed(4)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              <div className="card p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border">
                <span className="card-title block text-[9px] uppercase text-slate-500 font-bold">Count (N)</span>
                <span className="font-mono text-xs font-bold">{stats.count}</span>
              </div>
              <div className="card p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border">
                <span className="card-title block text-[9px] uppercase text-slate-500 font-bold">Sum (∑x)</span>
                <span className="font-mono text-xs font-bold">{stats.sum.toFixed(4)}</span>
              </div>
              <div className="card p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border">
                <span className="card-title block text-[9px] uppercase text-slate-500 font-bold">Standard Error (SE)</span>
                <span className="font-mono text-xs font-bold">{stats.stdError.toFixed(4)}</span>
              </div>
              <div className="card p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border">
                <span className="card-title block text-[9px] uppercase text-slate-500 font-bold">Coeff. of Variation (CV)</span>
                <span className="font-mono text-xs font-bold">{stats.coeffVar.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          {/* Five-Number Summary & Distribution Shape */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Order Statistics &amp; Five-Number Summary</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1 text-xs">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Min</span>
                <span className="font-mono font-bold">{stats.min}</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Q1 (25th %)</span>
                <span className="font-mono font-bold">{stats.q1}</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Median</span>
                <span className="font-mono font-bold text-blue-600">{stats.median}</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Q3 (75th %)</span>
                <span className="font-mono font-bold">{stats.q3}</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Max</span>
                <span className="font-mono font-bold">{stats.max}</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border text-center">
                <span className="text-[10px] text-slate-400 block uppercase">IQR</span>
                <span className="font-mono font-bold">{stats.iqr}</span>
              </div>
            </div>
          </div>

          {/* Step-by-Step Variance Table */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Step-by-Step Variance Calculation Table</h2>
            <div className="overflow-x-auto pt-1">
              <table className="w-full text-xs border">
                <thead>
                  <tr className="bg-slate-100 font-bold">
                    <th className="p-1.5">Index (i)</th>
                    <th className="p-1.5">Value (xᵢ)</th>
                    <th className="p-1.5">Deviation (xᵢ − x̄)</th>
                    <th className="p-1.5">Squared Deviation (xᵢ − x̄)²</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {stats.stepTable.map((row) => (
                    <tr key={row.index} className="border-t">
                      <td className="p-1.5 text-slate-500">{row.index}</td>
                      <td className="p-1.5 font-bold">{row.val}</td>
                      <td className="p-1.5">{row.dev >= 0 ? `+${row.dev}` : row.dev}</td>
                      <td className="p-1.5 font-bold text-blue-600">{row.devSq}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold border-t-2 border-slate-300">
                    <td className="p-1.5" colSpan={3}>Sum of Squared Deviations (SS):</td>
                    <td className="p-1.5 text-blue-700">{stats.sumSqDev.toFixed(4)}</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold">
                    <td className="p-1.5" colSpan={3}>Sample Variance [s² = SS / (N − 1) = {stats.sumSqDev.toFixed(3)} / {Math.max(1, stats.count - 1)}]:</td>
                    <td className="p-1.5 text-blue-700">{stats.sampleVar.toFixed(4)}</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold">
                    <td className="p-1.5" colSpan={3}>Population Variance [σ² = SS / N = {stats.sumSqDev.toFixed(3)} / {stats.count}]:</td>
                    <td className="p-1.5 text-blue-700">{stats.popVar.toFixed(4)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Dual Dataset Comparison (if available) */}
          {comparison.statsA.count > 0 && comparison.statsB.count > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Two-Dataset Comparison (A vs B)</h2>
              <table className="w-full text-xs border font-mono mt-1">
                <thead>
                  <tr className="bg-slate-100 font-bold font-sans">
                    <th className="p-1.5">Dataset</th>
                    <th className="p-1.5">Count (N)</th>
                    <th className="p-1.5">Mean (x̄)</th>
                    <th className="p-1.5">Sample Var (s²)</th>
                    <th className="p-1.5">Sample SD (s)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-1.5 font-bold font-sans">Dataset A</td>
                    <td className="p-1.5">{comparison.statsA.count}</td>
                    <td className="p-1.5">{comparison.statsA.mean.toFixed(2)}</td>
                    <td className="p-1.5">{comparison.statsA.sampleVar.toFixed(4)}</td>
                    <td className="p-1.5">{comparison.statsA.sampleSD.toFixed(4)}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-1.5 font-bold font-sans">Dataset B</td>
                    <td className="p-1.5">{comparison.statsB.count}</td>
                    <td className="p-1.5">{comparison.statsB.mean.toFixed(2)}</td>
                    <td className="p-1.5">{comparison.statsB.sampleVar.toFixed(4)}</td>
                    <td className="p-1.5">{comparison.statsB.sampleSD.toFixed(4)}</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold border-t">
                    <td className="p-1.5 font-sans" colSpan={2}>Variance Ratio (F = Var A / Var B):</td>
                    <td className="p-1.5 text-blue-600">{comparison.fRatio.toFixed(4)}</td>
                    <td className="p-1.5 font-sans">Pooled SD (s_p):</td>
                    <td className="p-1.5 text-blue-600">{comparison.pooledSD.toFixed(4)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Confidence Interval Section */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Confidence Interval Benchmark</h2>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border text-xs grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
              <div>
                <span className="text-[10px] text-slate-500 font-sans block uppercase">Confidence Level</span>
                <span className="font-bold">{ciLevel}% (z = {zScore.toFixed(3)})</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-sans block uppercase">Margin of Error (ME)</span>
                <span className="font-bold text-blue-600">±{marginOfError.toFixed(4)}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] text-slate-500 font-sans block uppercase">Confidence Interval [{ciLevel}%]</span>
                <span className="font-bold text-blue-700 dark:text-blue-300">[{(ciMeanNum - marginOfError).toFixed(4)}, {(ciMeanNum + marginOfError).toFixed(4)}]</span>
              </div>
            </div>
          </div>

          {/* Footer Disclaimer */}
          <div className="footer text-slate-400 text-[9px] pt-3 border-t text-center space-y-0.5">
            <p className="font-semibold">Standard Deviation Calculator — Mathematical &amp; Statistical Analysis Reference Suite</p>
            <p>Calculations adhere to standard Bessel's correction (n - 1) and Gaussian empirical distribution properties.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

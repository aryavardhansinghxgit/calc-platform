"use client";

import React, { useRef } from "react";
import { PregnancyCalculationResults } from "@/lib/calculator-engine/formulas/pregnancy";
import { FETAL_WEEKLY_DATA } from "./fetalData";
import { Printer, Download, X, Baby, HeartPulse, Scale, Calendar, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PregnancyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: PregnancyCalculationResults;
}

export const PregnancyReportModal: React.FC<PregnancyReportModalProps> = ({ isOpen, onClose, results }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const currentWeekInfo = FETAL_WEEKLY_DATA[results.gestationalAgeWeeks] || FETAL_WEEKLY_DATA[40];

  const handlePrint = () => {
    if (!printRef.current) return;
    const printContent = printRef.current.innerHTML;
    const windowPrint = window.open("", "", "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0");
    if (!windowPrint) return;

    windowPrint.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Comprehensive Clinical Pregnancy Report</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #111827; margin: 20px; line-height: 1.5; font-size: 13px; }
            h1 { font-size: 22px; font-weight: 800; color: #e11d48; margin-bottom: 4px; }
            h2 { font-size: 16px; font-weight: 700; color: #111827; border-bottom: 2px solid #fecdd3; padding-bottom: 4px; margin-top: 20px; }
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 10px; }
            .card { background: #f9fafb; border: 1px solid #e5e7eb; padding: 10px 14px; border-radius: 8px; }
            .badge { background: #ffe4e6; color: #9f1239; font-weight: bold; padding: 2px 8px; border-radius: 9999px; font-size: 11px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
            th, td { border: 1px solid #e5e7eb; padding: 6px 10px; text-align: left; }
            th { background: #f3f4f6; font-weight: 600; }
            .footer { margin-top: 30px; font-size: 10px; color: #6b7280; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 10px; }
            @media print {
              body { margin: 0; }
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <DialogTitle className="text-xl font-bold flex items-center gap-2 text-rose-600 dark:text-rose-400">
            <Baby className="h-6 w-6 text-rose-500" />
            Comprehensive Pregnancy Medical Report
          </DialogTitle>
          <div className="flex items-center gap-2">
            <Button onClick={handlePrint} variant="outline" size="sm" className="flex items-center gap-1.5 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300">
              <Printer className="h-4 w-4" />
              Print / Save PDF
            </Button>
          </div>
        </DialogHeader>

        {/* Printable Report Body */}
        <div ref={printRef} className="space-y-6 pt-2 text-zinc-900 dark:text-zinc-100">
          {/* Header Banner */}
          <div className="flex items-center justify-between border-b border-rose-200 pb-3">
            <div>
              <h1 className="text-xl font-black text-rose-600">PREGNANCY CLINICAL SUMMARY</h1>
              <p className="text-xs text-zinc-500">Generated on {new Date().toLocaleDateString("en-US", { dateStyle: "full" })}</p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-rose-100 text-rose-800 font-bold text-xs px-3 py-1 rounded-full">
                Calculation Mode: {results.mode.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Key Findings Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
              <span className="text-[11px] font-semibold text-zinc-500 block">ESTIMATED DUE DATE</span>
              <span className="text-base font-extrabold text-rose-600 dark:text-rose-400">{results.dueDateStr}</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
              <span className="text-[11px] font-semibold text-zinc-500 block">GESTATIONAL AGE</span>
              <span className="text-base font-extrabold text-zinc-900 dark:text-zinc-100">
                {results.gestationalAgeWeeks}w {results.gestationalAgeDays}d
              </span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
              <span className="text-[11px] font-semibold text-zinc-500 block">CURRENT TRIMESTER</span>
              <span className="text-base font-extrabold text-zinc-900 dark:text-zinc-100">
                Trimester {results.currentTrimester}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
              <span className="text-[11px] font-semibold text-zinc-500 block">DAYS REMAINING</span>
              <span className="text-base font-extrabold text-zinc-900 dark:text-zinc-100">
                {results.daysRemaining} Days
              </span>
            </div>
          </div>

          {/* Current Fetal & Maternal Status */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">Week {results.gestationalAgeWeeks} Developmental Overview
            </h2>
            <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-xs space-y-2">
              <p><strong>Fetal Size Analogy:</strong> {currentWeekInfo.sizeAnalogy} (~{currentWeekInfo.lengthCm} cm, {currentWeekInfo.weightGrams} g)</p>
              <p><strong>Fetal Development:</strong> {currentWeekInfo.babyDevelopment}</p>
              <p><strong>Maternal Changes:</strong> {currentWeekInfo.motherChanges}</p>
              <p><strong>Clinical Recommendation:</strong> {currentWeekInfo.keyAdvice}</p>
            </div>
          </div>

          {/* Weight Gain Analysis */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">Weight Gain & BMI Tracking (IOM Standards)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <span className="text-zinc-500">Pre-Pregnancy BMI:</span>
                <span className="font-bold block text-sm">{results.weightMetrics.preBmi} ({results.weightMetrics.bmiCategory})</span>
              </div>
              <div className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <span className="text-zinc-500">Recommended Gain Target:</span>
                <span className="font-bold block text-sm">{results.weightMetrics.minRecommendedLbs} – {results.weightMetrics.maxRecommendedLbs} lbs</span>
              </div>
              <div className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <span className="text-zinc-500">Current Weight Gain:</span>
                <span className="font-bold block text-sm text-emerald-600">{results.weightMetrics.currentGainLbs} lbs ({results.weightMetrics.status})</span>
              </div>
            </div>
          </div>

          {/* Key Clinical Milestones Table */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">Calculated Milestone Schedule
            </h2>
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800">
                  <th className="p-2">Milestone</th>
                  <th className="p-2">Gestational Week</th>
                  <th className="p-2">Estimated Date</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {results.milestones.slice(0, 10).map((m) => (
                  <tr key={m.id} className="border-b border-zinc-200 dark:border-zinc-800">
                    <td className="p-2 font-medium">{m.title}</td>
                    <td className="p-2">Week {m.week}</td>
                    <td className="p-2 font-semibold">{m.dateStr}</td>
                    <td className="p-2">{m.isPassed ? "✓ Completed" : "Upcoming"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Medical Disclaimer */}
          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Educational & Informational Disclaimer:</strong> This pregnancy report is generated for informational tracking purposes only and does not constitute formal medical diagnosis, clinical prognosis, or direct care advice. Always consult a qualified OB-GYN physician or licensed midwife for professional prenatal evaluation.
            </p>
          </div>

          <div className="footer">
            Report generated by Advanced Pregnancy Calculator Platform • Confidential Patient Educational Record
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

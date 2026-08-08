"use client";

import React from "react";
import { X, Printer, Download, FileText } from "lucide-react";
import { CalculatorReportData } from "./types";
import ReportHeader from "./ReportHeader";
import ReportSummaryGrid from "./ReportSummaryGrid";
import ReportRecommendation from "./ReportRecommendation";
import ReportTable from "./ReportTable";
import ReportFooter from "./ReportFooter";

export interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportData: CalculatorReportData;
}

export function ReportModal({ isOpen, onClose, reportData }: ReportModalProps) {
  if (!isOpen || !reportData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto no-print-bg">
      <div className="bg-zinc-900 text-white rounded-2xl border border-zinc-800 shadow-2xl max-w-4xl w-full flex flex-col max-h-[92vh] overflow-hidden no-print-modal">
        {/* Modal Top Action Toolbar (Hidden during print) */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950 no-print">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-600 text-white">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Executive Financial Report Preview
              </h3>
              <p className="text-[11px] text-zinc-400">
                Official CalcPlatform PDF Report — Only report content prints
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" /> Print Report
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" /> Save as PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Report Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-zinc-100 dark:bg-zinc-950">
          <div className="printable-report-section bg-white text-zinc-900 p-8 rounded-xl shadow-xl max-w-3xl mx-auto space-y-6">
            <ReportHeader meta={reportData.meta} />

            <ReportSummaryGrid
              metrics={reportData.keyMetrics}
              sections={reportData.sections}
            />

            {reportData.recommendation && (
              <ReportRecommendation recommendation={reportData.recommendation} />
            )}

            {reportData.table && <ReportTable table={reportData.table} />}

            {reportData.notes && reportData.notes.length > 0 && (
              <div className="border border-zinc-200 rounded-lg p-3 bg-zinc-50 space-y-1 text-[11px] text-zinc-600">
                <span className="font-bold text-zinc-900 block">Analysis Notes & Assumptions:</span>
                <ul className="list-disc pl-4 space-y-0.5">
                  {reportData.notes.map((n: string, i: number) => (
                    <li key={`rnote-${i}`}>{n}</li>
                  ))}
                </ul>
              </div>
            )}

            <ReportFooter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportModal;

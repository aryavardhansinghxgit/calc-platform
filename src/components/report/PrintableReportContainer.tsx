"use client";

import React from "react";
import { CalculatorReportData } from "./types";
import ReportHeader from "./ReportHeader";
import ReportSummaryGrid from "./ReportSummaryGrid";
import ReportRecommendation from "./ReportRecommendation";
import ReportTable from "./ReportTable";
import ReportFooter from "./ReportFooter";

export interface PrintableReportContainerProps {
  reportData: CalculatorReportData;
}

export function PrintableReportContainer({ reportData }: PrintableReportContainerProps) {
  if (!reportData) return null;

  return (
    <div id="calcplatform-printable-report-root" className="printable-report-section bg-white text-zinc-900 font-sans p-6 text-xs max-w-4xl mx-auto space-y-4">
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
              <li key={`note-${i}`}>{n}</li>
            ))}
          </ul>
        </div>
      )}

      <ReportFooter />
    </div>
  );
}

export default PrintableReportContainer;

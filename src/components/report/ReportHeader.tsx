"use client";

import React from "react";
import { ReportMeta } from "./types";

export interface ReportHeaderProps {
  meta: ReportMeta;
}

export function ReportHeader({ meta }: ReportHeaderProps) {
  return (
    <div className="border-b-2 border-zinc-900 pb-4 mb-6 flex items-start justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-extrabold flex items-center justify-center text-sm tracking-tight">
            C
          </div>
          <span className="font-extrabold text-lg tracking-tight text-zinc-900">
            CalcPlatform <span className="text-xs font-normal text-zinc-500 uppercase tracking-widest ml-1">Financial Advisory</span>
          </span>
        </div>
        <h1 className="text-xl font-extrabold uppercase text-blue-600 tracking-wide mt-2">
          {meta.reportTitle || `${meta.calculatorName} Report`}
        </h1>
        <p className="text-xs text-zinc-500 font-medium">
          Official Executive Financial Analysis Document
        </p>
      </div>

      <div className="text-right space-y-1 text-xs font-sans tabular-nums">
        <div className="font-bold text-zinc-900">{meta.calculatorName.toUpperCase()}</div>
        <div className="text-zinc-500">
          <span className="font-semibold text-zinc-700">Date:</span> {meta.generatedDate}
        </div>
        <div className="text-zinc-500">
          <span className="font-semibold text-zinc-700">Time:</span> {meta.generatedTime}
        </div>
      </div>
    </div>
  );
}

export default ReportHeader;

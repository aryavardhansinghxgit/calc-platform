"use client";

import React from "react";
import { ReportTableData } from "./types";

export interface ReportTableProps {
  table: ReportTableData;
}

export function ReportTable({ table }: ReportTableProps) {
  if (!table || !table.rows || table.rows.length === 0) return null;

  return (
    <div className="space-y-2 mt-4">
      <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 border-b border-zinc-900 pb-1">
        {table.title}
      </h3>

      <div className="border border-zinc-300 rounded-lg overflow-hidden text-[11px] font-sans tabular-nums">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-100 border-b border-zinc-300 font-bold uppercase text-[10px] text-zinc-700">
              {table.headers.map((h) => (
                <th
                  key={h.key}
                  className={`py-1.5 px-2.5 ${
                    h.align === "right"
                      ? "text-right"
                      : h.align === "center"
                      ? "text-center"
                      : "text-left"
                  }`}
                >
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rIdx) => (
              <tr
                key={`rrow-${rIdx}`}
                className={`border-b border-zinc-200 ${
                  rIdx % 2 === 1 ? "bg-zinc-50/60" : "bg-white"
                }`}
              >
                {table.headers.map((h) => (
                  <td
                    key={`rcell-${rIdx}-${h.key}`}
                    className={`py-1 px-2.5 ${
                      h.align === "right"
                        ? "text-right font-medium"
                        : h.align === "center"
                        ? "text-center"
                        : "text-left font-medium"
                    }`}
                  >
                    {row[h.key] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {table.footerSummary && (
        <p className="text-[10px] text-zinc-500 italic font-sans tabular-nums text-right">
          {table.footerSummary}
        </p>
      )}
    </div>
  );
}

export default ReportTable;

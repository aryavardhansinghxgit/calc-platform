"use client";

import React from "react";

export interface EducationalTableColumn<T = any> {
  header: string | React.ReactNode;
  accessor?: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

export interface EducationalTableProps<T = any> {
  columns: EducationalTableColumn<T>[];
  data: T[];
  caption?: string;
  className?: string;
}

export function EducationalTable<T = any>({
  columns,
  data,
  caption,
  className = "",
}: EducationalTableProps<T>) {
  return (
    <div
      className={`overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 ${className}`}
    >
      <table className="w-full text-xs text-left">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`p-2.5 font-bold ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-sans tabular-nums text-slate-600 dark:text-slate-400">
          {data.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
            >
              {columns.map((col, colIdx) => {
                let cellValue: React.ReactNode = null;
                if (typeof col.accessor === "function") {
                  cellValue = col.accessor(row);
                } else if (col.accessor) {
                  cellValue = (row as any)[col.accessor];
                }
                return (
                  <td
                    key={colIdx}
                    className={`p-2.5 ${colIdx === 0 ? "font-sans font-medium text-slate-900 dark:text-slate-100" : ""} ${col.className || ""}`}
                  >
                    {cellValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EducationalTable;

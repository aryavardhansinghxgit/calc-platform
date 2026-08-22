"use client";

import React from "react";

export interface ExampleParameter {
  label: string;
  value: string | number;
}

export interface WorkedExampleProps {
  title?: string;
  parameters?: ExampleParameter[];
  steps: Array<string | React.ReactNode>;
  summary?: string | React.ReactNode;
  additionalInfo?: string | React.ReactNode;
  className?: string;
}

export function WorkedExample({
  title,
  parameters = [],
  steps,
  summary,
  additionalInfo,
  className = "",
}: WorkedExampleProps) {
  return (
    <div
      className={`p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 text-xs ${className}`}
    >
      {title && (
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
          {title}
        </span>
      )}

      {parameters && parameters.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-slate-200 dark:border-slate-700 pb-2.5">
          {parameters.map((param, i) => (
            <div key={i}>
              <span className="text-slate-500 block text-[11px]">{param.label}:</span>
              <strong className="text-slate-900 dark:text-slate-100">{param.value}</strong>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-1.5 font-mono text-[11px] leading-relaxed">
        {steps.map((step, idx) => (
          <div key={idx} className="text-slate-800 dark:text-slate-200">
            {step}
          </div>
        ))}
      </div>

      {summary && (
        <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs font-sans font-bold text-blue-700 dark:text-blue-400">
          {summary}
        </div>
      )}

      {additionalInfo && (
        <div className="text-[11px] font-sans text-slate-600 dark:text-slate-400 pt-1">
          {additionalInfo}
        </div>
      )}
    </div>
  );
}

export default WorkedExample;

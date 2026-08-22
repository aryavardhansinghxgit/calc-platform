"use client";

import React from "react";

export interface DisclaimerSectionProps {
  title?: string;
  methodologyTitle?: string;
  methodology?: string | React.ReactNode;
  disclaimerTitle?: string;
  disclaimer?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function DisclaimerSection({
  title = "Financial Planning Methodology & Educational Disclaimer",
  methodologyTitle = "Methodology & Mathematical Principles:",
  methodology,
  disclaimerTitle = "Educational Disclaimer:",
  disclaimer,
  children,
  className = "",
}: DisclaimerSectionProps) {
  return (
    <section
      className={`p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed ${className}`}
    >
      {title && (
        <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
          {title}
        </div>
      )}

      {methodology && (
        <p>
          <strong className="text-slate-800 dark:text-slate-200">{methodologyTitle}</strong>{" "}
          {methodology}
        </p>
      )}

      {disclaimer && (
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
          <strong className="text-slate-700 dark:text-slate-300">{disclaimerTitle}</strong>{" "}
          {disclaimer}
        </p>
      )}

      {children}
    </section>
  );
}

export default DisclaimerSection;

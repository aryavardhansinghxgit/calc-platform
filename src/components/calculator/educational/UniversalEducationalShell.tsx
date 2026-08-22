"use client";

import React from "react";

export interface UniversalEducationalShellProps {
  children: React.ReactNode;
  className?: string;
}

export function UniversalEducationalShell({
  children,
  className = "",
}: UniversalEducationalShellProps) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 space-y-8 shadow-xs text-slate-900 dark:text-slate-100 ${className}`}
    >
      {children}
    </div>
  );
}

export interface EducationalSectionProps {
  id?: string;
  title?: string;
  level?: "h2" | "h3" | "h4";
  className?: string;
  children: React.ReactNode;
}

export function EducationalSection({
  id,
  title,
  level = "h2",
  className = "",
  children,
}: EducationalSectionProps) {
  return (
    <section id={id} className={`space-y-3 sm:space-y-4 ${className}`}>
      {title && (
        <>
          {level === "h2" ? (
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {title}
            </h2>
          ) : level === "h3" ? (
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {title}
            </h3>
          ) : (
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              {title}
            </h4>
          )}
        </>
      )}
      {children}
    </section>
  );
}

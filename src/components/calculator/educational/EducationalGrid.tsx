"use client";

import React from "react";

export interface EducationalCardProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function EducationalCard({
  title,
  children,
  className = "",
}: EducationalCardProps) {
  return (
    <div
      className={`p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1 ${className}`}
    >
      <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">
        {title}
      </h4>
      <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export interface EducationalGridProps {
  columns?: 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}

export function EducationalGrid({
  columns = 2,
  children,
  className = "",
}: EducationalGridProps) {
  const colClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${colClasses[columns]} gap-3.5 ${className}`}>
      {children}
    </div>
  );
}

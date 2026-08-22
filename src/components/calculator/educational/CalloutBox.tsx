"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

export type CalloutVariant = "info" | "success" | "warning" | "neutral" | "pitfall";

export interface CalloutBoxProps {
  title?: string;
  icon?: LucideIcon;
  variant?: CalloutVariant;
  children: React.ReactNode;
  className?: string;
}

export function CalloutBox({
  title,
  icon: Icon,
  variant = "info",
  children,
  className = "",
}: CalloutBoxProps) {
  const variantStyles = {
    info: "bg-blue-50/70 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-slate-700 dark:text-slate-300",
    success: "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-slate-700 dark:text-slate-300",
    warning: "bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-slate-700 dark:text-slate-300",
    neutral: "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300",
    pitfall: "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300",
  };

  const titleStyles = {
    info: "text-blue-900 dark:text-blue-200",
    success: "text-emerald-900 dark:text-emerald-200",
    warning: "text-amber-900 dark:text-amber-200",
    neutral: "text-slate-900 dark:text-slate-100",
    pitfall: "text-slate-900 dark:text-slate-100",
  };

  return (
    <div
      className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${variantStyles[variant]} ${className}`}
    >
      {title && (
        <div className={`font-bold flex items-center gap-1.5 ${titleStyles[variant]}`}>
          {Icon && <Icon className="h-4 w-4 shrink-0" />}
          <span>{title}</span>
        </div>
      )}
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}

export default CalloutBox;

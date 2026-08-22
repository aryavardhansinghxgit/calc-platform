"use client";

import React from "react";
import Link from "next/link";

export interface RelatedCalculatorLink {
  label: string;
  href: string;
  description?: string;
}

export interface RelatedCalculatorsBarProps {
  title?: string;
  links: RelatedCalculatorLink[];
  className?: string;
}

export function RelatedCalculatorsBar({
  title = "Related Calculators:",
  links,
  className = "",
}: RelatedCalculatorsBarProps) {
  if (!links || links.length === 0) return null;

  return (
    <div className={`pt-2 pb-1 space-y-1 ${className}`}>
      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
        {title}
      </span>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        {links.map((item, idx) => (
          <React.Fragment key={item.href}>
            <Link
              href={item.href}
              className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition-colors"
            >
              {item.label}
            </Link>
            {idx < links.length - 1 && (
              <span className="text-slate-400 dark:text-slate-600 select-none">|</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export interface RelatedCalculatorsGridProps {
  title?: string;
  links: RelatedCalculatorLink[];
  className?: string;
}

export function RelatedCalculatorsGrid({
  title = "Related Calculators",
  links,
  className = "",
}: RelatedCalculatorsGridProps) {
  if (!links || links.length === 0) return null;

  return (
    <section className={`space-y-4 pt-2 ${className}`}>
      {title && (
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              {item.label}
            </span>
            {item.description && (
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {item.description}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Home, Compass, Calculator, Percent, Heart, DollarSign, ArrowRight } from "lucide-react";
import { SearchBar } from "@/components/home/SearchBar";

export const metadata: Metadata = {
  title: "404 - Page Not Found | CalcPlatform",
  description: "The calculator or page you are looking for could not be found. Search our comprehensive directory of 200+ financial, health, math, and engineering calculators.",
};

export default function NotFound() {
  const popularCalculators = [
    { title: "Mortgage Calculator", href: "/calculators/mortgage-calculator", icon: DollarSign, category: "Finance" },
    { title: "BMI Calculator", href: "/calculators/bmi-calculator", icon: Heart, category: "Health" },
    { title: "Percentage Calculator", href: "/calculators/percentage-calculator", icon: Percent, category: "Math" },
    { title: "Compound Interest Calculator", href: "/calculators/compound-interest-calculator", icon: DollarSign, category: "Finance" },
    { title: "Auto Loan Calculator", href: "/calculators/auto-loan-calculator", icon: DollarSign, category: "Finance" },
    { title: "Scientific Calculator", href: "/calculators/scientific-calculator", icon: Calculator, category: "Math" },
  ];

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-12 max-w-3xl mx-auto space-y-8 font-sans">
      {/* 404 Badge & Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase">
          <span>Error 404</span>
          <span>•</span>
          <span>Page Not Found</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
          Calculator Not Found
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
          The link you followed may be broken, or the calculator may have been renamed or moved.
        </p>
      </div>

      {/* Quick Search */}
      <div className="w-full max-w-lg mx-auto">
        <SearchBar />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
        <Link
          href="/category/finance"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors"
        >
          <Compass className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          Browse Categories
        </Link>
      </div>

      {/* Popular Tools Grid */}
      <div className="w-full pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
        <h2 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
          Popular Tools You Might Need
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-left text-xs">
          {popularCalculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link
                key={calc.href}
                href={calc.href}
                className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-500 hover:shadow-xs transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shrink-0">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                      {calc.title}
                    </div>
                    <div className="text-[10px] text-zinc-500 dark:text-zinc-400">{calc.category}</div>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

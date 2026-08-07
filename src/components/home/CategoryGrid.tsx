"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, DollarSign, HeartPulse, Calculator as MathIcon, Calendar, Briefcase } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { getCalculatorsByCategory } from "@/calculators";

export interface CategoryGridProps {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export function CategoryGrid() {
  const mainCategories = CATEGORIES.slice(0, 4);

  return (
    <section id="categories" className="space-y-4 pt-2">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
        <h2 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Browse All Calculators
        </h2>
        <span className="text-xs text-zinc-400 font-mono">
          Direct Directory
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainCategories.map((cat) => {
          const Icon = cat.icon;
          const tools = getCalculatorsByCategory(cat.slug);

          return (
            <div key={cat.id} className="space-y-2.5">
              {/* Category Header Link */}
              <Link href={`/category/${cat.slug}`} className="group inline-flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cat.name} Calculators
                </h3>
              </Link>

              {/* Clean Tool Text Link List */}
              <ul className="space-y-1.5 text-xs">
                {tools.map((calc) => (
                  <li key={calc.id}>
                    <Link
                      href={`/calculators/${calc.slug}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-between group"
                    >
                      <span className="truncate">{calc.title}</span>
                      <ArrowRight className="h-3 w-3 text-zinc-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CategoryGrid;

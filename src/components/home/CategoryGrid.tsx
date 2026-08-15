"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { getCalculatorsByCategory } from "@/calculators";
import { getCalculatorDisplayTitle } from "@/lib/calculator-title";

export interface CategoryGridProps {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export function CategoryGrid() {
  const mainCategories = CATEGORIES.slice(0, 4);

  return (
    <section id="categories" className="space-y-4 pt-2">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <h2 className="text-base font-extrabold text-foreground tracking-tight">
          Browse All Calculators
        </h2>
        <span className="text-xs text-muted-foreground font-sans tabular-nums">
          Direct Directory
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainCategories.map((cat) => {
          const tools = getCalculatorsByCategory(cat.slug);

          return (
            <div key={cat.id} className="min-w-0 space-y-2.5">
              {/* Category Header Link */}
              <Link href={`/category/${cat.slug}`} className="group inline-flex min-w-0 max-w-full items-center">
                <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  {cat.name} Calculators
                </h3>
              </Link>

              {/* Clean Tool Text Link List */}
              <ul className="space-y-1.5 text-xs">
                {tools.map((calc) => (
                  <li key={calc.id}>
                    <Link
                      href={`/calculators/${calc.slug}`}
                      className="text-primary hover:underline flex min-w-0 items-center justify-between gap-1 group"
                    >
                      <span className="min-w-0 truncate">{getCalculatorDisplayTitle(calc.title)}</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
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

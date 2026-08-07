"use client";

import React from "react";
import Link from "next/link";
import { Layers, ArrowRight } from "lucide-react";
import { NAVIGATION_CATEGORIES } from "@/constants/navigation";

export interface CategoryGridProps {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export function CategoryGrid({ activeCategory = "Home" }: CategoryGridProps = {}) {
  const gridCategories = NAVIGATION_CATEGORIES.filter((cat) => cat.id !== "home");

  return (
    <section id="categories" className="space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-1.5">
          <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Category Hubs
        </h2>
        <span className="text-xs text-zinc-400 font-mono">
          {gridCategories.length} Categories
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {gridCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive =
            activeCategory.toLowerCase() === cat.id.toLowerCase() ||
            activeCategory.toLowerCase() === cat.name.toLowerCase();

          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-xl"
            >
              <div
                className={`p-3.5 rounded-xl border transition-all duration-150 group flex items-center justify-between cursor-pointer ${
                  isActive
                    ? "bg-blue-50/70 dark:bg-blue-950/40 border-blue-400 dark:border-blue-600"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-zinc-50/80 dark:hover:bg-zinc-800/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {cat.name}
                    </h3>
                    {typeof cat.count === "number" && (
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                        {cat.count} {cat.count === 1 ? "tool" : "tools"}
                      </span>
                    )}
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default CategoryGrid;

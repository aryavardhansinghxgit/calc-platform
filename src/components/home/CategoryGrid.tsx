"use client";

import React from "react";
import { Layers, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { NAVIGATION_CATEGORIES } from "@/constants/navigation";

export interface CategoryGridProps {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export function CategoryGrid({ activeCategory = "Home", onSelectCategory }: CategoryGridProps = {}) {
  // Filter out Home from main grid cards
  const gridCategories = NAVIGATION_CATEGORIES.filter((cat) => cat.id !== "home");

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Layers className="h-5 w-5 text-sky-400" /> Browse Categories
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Select a category to explore targeted calculators & unit tools
          </p>
        </div>

        {activeCategory !== "Home" && (
          <button
            onClick={() => onSelectCategory && onSelectCategory("Home")}
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 underline underline-offset-4"
          >
            Show All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {gridCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive =
            activeCategory.toLowerCase() === cat.id.toLowerCase() ||
            activeCategory.toLowerCase() === cat.name.toLowerCase();

          return (
            <Card
              key={cat.id}
              onClick={() => onSelectCategory && onSelectCategory(cat.name)}
              className={`cursor-pointer transition-all duration-200 border rounded-2xl relative overflow-hidden group ${
                isActive
                  ? "bg-slate-900 border-sky-500/50 ring-2 ring-sky-500/40 shadow-lg shadow-sky-500/10"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              <CardHeader className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sky-400 group-hover:text-sky-300 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  {typeof cat.count === "number" && (
                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700">
                      {cat.count} Tools
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <CardTitle className="text-base font-bold text-white group-hover:text-sky-300 transition-colors flex items-center gap-1.5">
                    {cat.name}
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-sky-400" />
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default CategoryGrid;

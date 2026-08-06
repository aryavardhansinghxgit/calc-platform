"use client";

import React from "react";
import Link from "next/link";
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
    <section id="categories" className="space-y-4 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 tracking-tight flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-600" /> Browse Categories
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Select a category to explore targeted calculators & unit tools
          </p>
        </div>

        {activeCategory !== "Home" && (
          <button
            onClick={() => onSelectCategory && onSelectCategory("Home")}
            className="text-xs font-medium text-blue-600 hover:text-blue-700 underline underline-offset-4"
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
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              onClick={() => onSelectCategory && onSelectCategory(cat.name)}
              className="block"
            >
              <Card
                className={`cursor-pointer transition-all duration-150 border rounded-xl group ${
                  isActive
                    ? "bg-blue-50/50 border-blue-300 shadow-sm"
                    : "bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-sm"
                }`}
              >
                <CardHeader className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-200 text-blue-600 group-hover:text-blue-700 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    {typeof cat.count === "number" && (
                      <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                        {cat.count} Tools
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <CardTitle className="text-base font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                      <span>{cat.name}</span>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-blue-600" />
                    </CardTitle>
                    <CardDescription className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default CategoryGrid;

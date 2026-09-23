"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import LatestCalculators from "@/components/home/LatestCalculators";
import { searchCalculators } from "@/calculators";
import { getCalculatorDisplayTitle } from "@/lib/calculator-title";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchCalculators(searchQuery);
  }, [searchQuery]);

  const hasSearch = searchQuery.trim().length > 0;

  return (
    <div className="space-y-6 pb-6">
      {/* 1. Hero with Quick Scientific Calculator & Integrated SearchBar */}
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* 2. Active Search Results Section (Sorted Alphabetically A–Z) */}
      {hasSearch ? (
        <section className="space-y-4 pt-2 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border pb-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <h2 className="text-base font-extrabold text-foreground tracking-tight">
                  Search Results for &ldquo;{searchQuery}&rdquo;
                </h2>
                <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {searchResults.length} {searchResults.length === 1 ? "Tool" : "Tools"} (A–Z)
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                All matching precision calculators sorted alphabetically
              </p>
            </div>
            <button
              onClick={() => setSearchQuery("")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
            >
              <X className="h-3.5 w-3.5" />
              <span>Clear Search</span>
            </button>
          </div>

          {searchResults.length === 0 ? (
            <div className="p-8 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-2">
              <p className="text-sm font-semibold text-foreground">
                No calculators found matching &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Try checking for typos or searching by keyword like &ldquo;mortgage&rdquo;, &ldquo;tax&rdquo;, &ldquo;emi&rdquo;, &ldquo;percentage&rdquo;, or &ldquo;loan&rdquo;.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  Return to all calculators
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {searchResults.map((calc) => {
                const Icon = calc.icon;
                return (
                  <Link key={calc.id} href={`/calculators/${calc.slug}`} className="min-w-0 group block h-full">
                    <Card className="h-full bg-white dark:bg-zinc-900/90 border-zinc-200/80 dark:border-zinc-800 hover:border-blue-400/70 dark:hover:border-blue-500/60 hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-200 cursor-pointer rounded-xl overflow-hidden">
                      <CardHeader className="p-3.5 sm:p-4 space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="p-2 rounded-lg bg-blue-50/80 dark:bg-zinc-800 border border-blue-100/80 dark:border-zinc-700 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 dark:group-hover:text-zinc-950 transition-colors shadow-2xs">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/90 text-zinc-600 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700 uppercase tracking-wider">
                            {calc.category}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <CardTitle className="min-w-0 text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between gap-1.5 leading-snug">
                            <span className="min-w-0 truncate">{getCalculatorDisplayTitle(calc.title)}</span>
                            <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-blue-600 dark:text-blue-400" />
                          </CardTitle>
                          <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                            {calc.description}
                          </CardDescription>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* 3. 4-Column Directory (Alphabetical Links A–Z) */}
          <CategoryGrid />

          {/* 4. Latest Tools Index */}
          <LatestCalculators />
        </>
      )}
    </div>
  );
}

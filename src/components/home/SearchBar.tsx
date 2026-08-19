"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchCalculators } from "@/calculators";
import { getCalculatorDisplayTitle } from "@/lib/calculator-title";

export interface QuickTag {
  id: string;
  label: string;
  category: string;
}

export interface SearchBarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  quickTags?: QuickTag[];
  selectedCalc?: string;
  onSelectCalc?: (id: string) => void;
  filteredCount?: number;
}

const defaultQuickTags: QuickTag[] = [
  { id: "mortgage", label: "Mortgage", category: "Finance" },
  { id: "auto-loan", label: "Auto Loan", category: "Finance" },
  { id: "loan", label: "Loan", category: "Finance" },
  { id: "emi", label: "EMI", category: "Finance" },
  { id: "sip", label: "SIP", category: "Finance" },
  { id: "compound-interest", label: "Compound", category: "Finance" },
  { id: "fd", label: "FD", category: "Finance" },
  { id: "gst", label: "GST", category: "Finance" },
  { id: "percentage", label: "Percentage", category: "Math" },
  { id: "bmi", label: "BMI", category: "Health" },
  { id: "age", label: "Age", category: "Date" },
];

export function SearchBar({
  searchQuery,
  onSearchChange,
  quickTags = defaultQuickTags,
  selectedCalc,
  onSelectCalc,
}: SearchBarProps = {}) {
  const [internalQuery, setInternalQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const query = searchQuery !== undefined ? searchQuery : internalQuery;

  const handleQueryChange = (val: string) => {
    setInternalQuery(val);
    if (onSearchChange) onSearchChange(val);
  };

  const searchResults = useMemo(() => {
    if (!query || query.trim() === "") return [];
    return searchCalculators(query);
  }, [query]);

  return (
    <div className="space-y-3 max-w-2xl w-full relative">
      {/* Search Input Container */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
        <Input
          type="text"
          placeholder="Search 200+ calculators (e.g. Mortgage, EMI, SIP, GST, BMI)..."
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onChange={(e) => handleQueryChange(e.target.value)}
          aria-label="Search all calculators"
          className="pl-10 pr-9 h-11 text-sm bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 rounded-xl shadow-[0_3px_10px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 focus:shadow-[0_8px_25px_rgba(37,99,235,0.18)] transition-all"
        />
        {query && (
          <button
            onClick={() => handleQueryChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Live Search Dropdown */}
      {isFocused && query.trim() !== "" && (
        <div className="absolute top-13 left-0 right-0 z-50 bg-card border border-blue-200 dark:border-blue-900/70 rounded-2xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto">
          <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-blue-100 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/30">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
              Calculator suggestions
            </span>
            {searchResults.length > 0 && (
              <span className="text-[10px] font-sans tabular-nums font-semibold text-blue-600 dark:text-blue-400">
                {searchResults.length} matches
              </span>
            )}
          </div>
          {searchResults.length === 0 ? (
            <div className="p-4 text-center text-xs text-muted-foreground">
              No calculators found matching &quot;{query}&quot;
            </div>
          ) : (
            searchResults.map((calc) => (
              <Link
                key={calc.id}
                href={`/calculators/${calc.slug}`}
                className="p-3 flex min-w-0 items-center gap-3 border-b border-blue-50 last:border-b-0 dark:border-blue-950/40 hover:bg-blue-50/70 dark:hover:bg-blue-950/30 transition-colors group cursor-pointer"
              >
                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                    <span className="min-w-0 truncate text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                      {getCalculatorDisplayTitle(calc.title)}
                    </span>
                    <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {calc.category}
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-7 w-7 shrink-0 rounded-full bg-blue-50 p-1.5 text-blue-600 transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:translate-x-0.5" />
              </Link>
            ))
          )}
        </div>
      )}

      {/* Quick Launch Chips */}
      <div className="flex items-center flex-wrap gap-1.5 pt-0.5">
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mr-1">
          Quick Launch:
        </span>
        {quickTags.map((tag) => {
          const slug = tag.id.endsWith("-calculator") ? tag.id : `${tag.id}-calculator`;
          const isSelected = selectedCalc === tag.id;
          return (
            <Link
              key={tag.id}
              href={`/calculators/${slug}`}
              onClick={() => onSelectCalc && onSelectCalc(tag.id)}
            >
              <button
                type="button"
                className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-background text-foreground border-border hover:border-primary/50 hover:text-primary"
                }`}
              >
                {tag.label}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SearchBar;

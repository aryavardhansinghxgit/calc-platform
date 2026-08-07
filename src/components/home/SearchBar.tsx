"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, Zap, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchCalculators } from "@/calculators";

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
  { id: "gst", label: "GST", category: "Business" },
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
    <div className="space-y-3 max-w-2xl mx-auto w-full relative">
      {/* Search Input Container */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none z-10" />
        <Input
          type="text"
          placeholder="Search 11+ calculators (e.g. Mortgage, EMI, SIP, GST, BMI)..."
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onChange={(e) => handleQueryChange(e.target.value)}
          aria-label="Search all calculators"
          className="pl-10 pr-9 h-11 text-sm bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 rounded-xl shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
        {query && (
          <button
            onClick={() => handleQueryChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-full transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Live Search Dropdown */}
      {isFocused && query.trim() !== "" && (
        <div className="absolute top-13 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden max-h-72 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800">
          {searchResults.length === 0 ? (
            <div className="p-3.5 text-center text-xs text-zinc-500 dark:text-zinc-400">
              No calculators found matching &quot;{query}&quot;
            </div>
          ) : (
            searchResults.map((calc) => (
              <Link
                key={calc.id}
                href={`/calculators/${calc.slug}`}
                className="p-3 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors group cursor-pointer"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {calc.title}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                      {calc.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">{calc.description}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-transform shrink-0" />
              </Link>
            ))
          )}
        </div>
      )}

      {/* Quick Launch Pills */}
      <div className="flex items-center justify-center flex-wrap gap-1.5 pt-0.5">
        <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1 mr-1">
          <Zap className="h-3 w-3 text-amber-500" /> Quick Launch:
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
                className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
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

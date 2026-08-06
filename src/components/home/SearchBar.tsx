"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, Tag, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchRegistry } from "@/lib/calculator-engine/registry";

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
  { id: "loan", label: "Loan", category: "Finance" },
  { id: "emi", label: "EMI", category: "Finance" },
  { id: "sip", label: "SIP", category: "Finance" },
  { id: "compound-interest", label: "Compound Interest", category: "Finance" },
  { id: "fd", label: "FD", category: "Finance" },
  { id: "gst", label: "GST", category: "Business" },
  { id: "percentage", label: "Percentage", category: "Math" },
  { id: "age", label: "Age", category: "Date" },
];

export function SearchBar({
  searchQuery,
  onSearchChange,
  quickTags = defaultQuickTags,
  selectedCalc = "mortgage",
  onSelectCalc,
  filteredCount,
}: SearchBarProps = {}) {
  const [internalQuery, setInternalQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const query = searchQuery !== undefined ? searchQuery : internalQuery;

  const handleQueryChange = (val: string) => {
    setInternalQuery(val);
    if (onSearchChange) onSearchChange(val);
  };

  // Instant registry-powered search suggestions
  const searchResults = useMemo(() => {
    if (!query || query.trim() === "") return [];
    return searchRegistry(query);
  }, [query]);

  return (
    <div className="space-y-4 max-w-2xl mx-auto w-full relative">
      {/* Search Input Container */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
        <Input
          type="text"
          placeholder="Search 10+ calculators (e.g. Mortgage, EMI, SIP, GST, Age)..."
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onChange={(e) => handleQueryChange(e.target.value)}
          className="pl-12 pr-10 h-14 text-base bg-slate-900/90 border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-[12px] shadow-soft focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
        />
        {query && (
          <button
            onClick={() => handleQueryChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Live Search Autocomplete Modal/Dropdown */}
      {isFocused && query.trim() !== "" && (
        <div className="absolute top-16 left-0 right-0 z-50 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto divide-y divide-slate-800/60">
          {searchResults.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400">
              No calculators found matching &quot;{query}&quot;
            </div>
          ) : (
            searchResults.map((calc) => (
              <Link
                key={calc.id}
                href={`/calculators/${calc.slug}`}
                className="p-3.5 flex items-center justify-between hover:bg-slate-800/60 transition-colors group cursor-pointer"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                      {calc.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      {calc.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{calc.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))
          )}
        </div>
      )}

      {/* Quick Filter Tags */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <Tag className="h-3.5 w-3.5 text-sky-400" /> Quick Select
          </span>
          {typeof filteredCount === "number" && (
            <span className="text-slate-500 font-mono">{filteredCount} available</span>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
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
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-[12px] border transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-500/25 scale-105"
                      : "bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800"
                  }`}
                >
                  {tag.label}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;

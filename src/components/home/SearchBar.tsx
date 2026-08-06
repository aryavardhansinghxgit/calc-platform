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
  { id: "auto-loan", label: "Auto Loan", category: "Finance" },
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

  const searchResults = useMemo(() => {
    if (!query || query.trim() === "") return [];
    return searchRegistry(query);
  }, [query]);

  return (
    <div className="space-y-4 max-w-2xl mx-auto w-full relative">
      {/* Search Input Container */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 pointer-events-none z-10" />
        <Input
          type="text"
          placeholder="Search 10+ calculators (e.g. Mortgage, EMI, SIP, GST, Age)..."
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onChange={(e) => handleQueryChange(e.target.value)}
          className="pl-12 pr-10 h-13 text-base bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400 rounded-xl shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
        />
        {query && (
          <button
            onClick={() => handleQueryChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-700 rounded-full hover:bg-zinc-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Live Search Autocomplete Dropdown */}
      {isFocused && query.trim() !== "" && (
        <div className="absolute top-16 left-0 right-0 z-50 bg-white border border-zinc-200 rounded-xl shadow-lg overflow-hidden max-h-80 overflow-y-auto divide-y divide-zinc-100">
          {searchResults.length === 0 ? (
            <div className="p-4 text-center text-xs text-zinc-500">
              No calculators found matching &quot;{query}&quot;
            </div>
          ) : (
            searchResults.map((calc) => (
              <Link
                key={calc.id}
                href={`/calculators/${calc.slug}`}
                className="p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors group cursor-pointer"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
                      {calc.title}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
                      {calc.category}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 line-clamp-1">{calc.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-blue-600 transition-transform shrink-0" />
              </Link>
            ))
          )}
        </div>
      )}

      {/* Quick Filter Tags */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5 font-medium text-zinc-700">
            <Tag className="h-3.5 w-3.5 text-blue-600" /> Popular Quick Select
          </span>
          {typeof filteredCount === "number" && (
            <span className="text-zinc-400 font-mono">{filteredCount} available</span>
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
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
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

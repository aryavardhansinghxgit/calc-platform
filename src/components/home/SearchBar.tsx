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
    <div className="space-y-3 max-w-2xl w-full relative">
      {/* Search Input Container */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
        <Input
          type="text"
          placeholder="Search 160+ calculators (e.g. Mortgage, EMI, SIP, GST, BMI)..."
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onChange={(e) => handleQueryChange(e.target.value)}
          aria-label="Search all calculators"
          className="pl-10 pr-9 h-11 text-sm bg-background border-border text-foreground placeholder:text-muted-foreground rounded-xl shadow-xs focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
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
        <div className="absolute top-13 left-0 right-0 z-50 bg-card border border-border rounded-xl shadow-lg overflow-hidden max-h-72 overflow-y-auto divide-y divide-border">
          {searchResults.length === 0 ? (
            <div className="p-3.5 text-center text-xs text-muted-foreground">
              No calculators found matching &quot;{query}&quot;
            </div>
          ) : (
            searchResults.map((calc) => (
              <Link
                key={calc.id}
                href={`/calculators/${calc.slug}`}
                className="p-3 flex items-center justify-between hover:bg-muted/60 transition-colors group cursor-pointer"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                      {calc.title}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                      {calc.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-1">{calc.description}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-transform shrink-0" />
              </Link>
            ))
          )}
        </div>
      )}

      {/* Quick Launch Chips */}
      <div className="flex items-center flex-wrap gap-1.5 pt-0.5">
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1 mr-1">
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

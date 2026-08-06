"use client";

import React, { useState } from "react";
import { Search, X, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";

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
  { id: "bmi", label: "BMI", category: "Health" },
  { id: "percentage", label: "Percentage", category: "Math" },
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
  const query = searchQuery !== undefined ? searchQuery : internalQuery;

  const handleQueryChange = (val: string) => {
    setInternalQuery(val);
    if (onSearchChange) onSearchChange(val);
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto w-full">
      {/* Search Input Container */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
        <Input
          type="text"
          placeholder="Search for a calculator (e.g. Mortgage, EMI, SIP, BMI)..."
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          className="pl-12 pr-10 h-14 text-base bg-slate-900/90 border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-[12px] shadow-soft focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
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

      {/* Quick Filter Tags */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <Tag className="h-3.5 w-3.5 text-blue-400" /> Quick Select
          </span>
          {typeof filteredCount === "number" && (
            <span className="text-slate-500 font-mono">{filteredCount} available</span>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {quickTags.map((tag) => {
            const isSelected = selectedCalc === tag.id;
            return (
              <button
                key={tag.id}
                onClick={() => onSelectCalc && onSelectCalc(tag.id)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-[12px] border transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/25 scale-105"
                    : "bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800"
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;

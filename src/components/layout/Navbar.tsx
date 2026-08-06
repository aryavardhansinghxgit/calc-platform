"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Calculator, Search, Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NAVIGATION_CATEGORIES } from "@/constants/navigation";
import { searchRegistry } from "@/lib/calculator-engine/registry";

export interface NavbarProps {
  onSearchChange?: (term: string) => void;
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export function Navbar({ onSearchChange, activeCategory = "Home", onSelectCategory }: NavbarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const categories = NAVIGATION_CATEGORIES;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (onSearchChange) onSearchChange(val);
  };

  const searchResults = useMemo(() => {
    if (!searchTerm || searchTerm.trim() === "") return [];
    return searchRegistry(searchTerm);
  }, [searchTerm]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md text-slate-100">
      {/* Top Bar: Logo & Global Search */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-white font-bold shadow-lg shadow-sky-500/25 group-hover:scale-105 transition-transform">
            <Calculator className="h-6 w-6" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="text-xl font-extrabold tracking-tight text-white">
              Calc<span className="text-sky-400">Platform</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Sparkles className="h-3 w-3" /> Pro Suite
            </span>
          </div>
        </Link>

        {/* Search Input with Autocomplete */}
        <div className="relative w-48 sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10" />
          <Input
            type="text"
            placeholder="Search calculators..."
            value={searchTerm}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onChange={handleSearch}
            className="pl-9 bg-slate-900/90 border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:ring-sky-500 rounded-full h-9 text-sm transition-all"
          />

          {/* Autocomplete Popup */}
          {isFocused && searchTerm.trim() !== "" && (
            <div className="absolute top-11 right-0 left-0 sm:left-auto sm:w-80 z-50 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-72 overflow-y-auto divide-y divide-slate-800/60">
              {searchResults.length === 0 ? (
                <div className="p-3.5 text-center text-xs text-slate-400">
                  No tools found matching &quot;{searchTerm}&quot;
                </div>
              ) : (
                searchResults.map((calc) => (
                  <Link
                    key={calc.id}
                    href={`/calculators/${calc.slug}`}
                    className="p-3 flex items-center justify-between hover:bg-slate-800/60 transition-colors group cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                          {calc.title}
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                          {calc.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{calc.description}</p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-sky-400 transition-transform shrink-0" />
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links Bar */}
      <div className="border-t border-slate-800/80 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between">
          <nav className="hidden md:flex items-center gap-1 py-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;
              const href = cat.slug === "home" || cat.id === "home" ? "/" : `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.name}
                  href={href}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                    isActive
                      ? "bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-sky-400" : "text-slate-400"}`} />
                  {cat.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden py-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-3 space-y-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;
              const href = cat.slug === "home" || cat.id === "home" ? "/" : `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.name}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                      : "text-slate-300 hover:bg-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4 text-sky-400" />
                  {cat.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;


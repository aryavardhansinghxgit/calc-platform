"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Calculator, Search, Menu, X, ArrowRight } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white text-zinc-900 shadow-sm">
      {/* Top Bar: Logo & Global Search */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold group-hover:bg-blue-700 transition-colors">
            <Calculator className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight text-zinc-900">
              Calc<span className="text-blue-600">Platform</span>
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Pro
            </span>
          </div>
        </Link>

        {/* Search Input with Autocomplete */}
        <div className="relative w-48 sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 z-10" />
          <Input
            type="text"
            placeholder="Search calculators..."
            value={searchTerm}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onChange={handleSearch}
            className="pl-9 bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-lg h-9 text-sm transition-all"
          />

          {/* Autocomplete Popup */}
          {isFocused && searchTerm.trim() !== "" && (
            <div className="absolute top-11 right-0 left-0 sm:left-auto sm:w-80 z-50 bg-white border border-zinc-200 rounded-xl shadow-lg overflow-hidden max-h-72 overflow-y-auto divide-y divide-zinc-100">
              {searchResults.length === 0 ? (
                <div className="p-3.5 text-center text-xs text-zinc-500">
                  No tools found matching &quot;{searchTerm}&quot;
                </div>
              ) : (
                searchResults.map((calc) => (
                  <Link
                    key={calc.id}
                    href={`/calculators/${calc.slug}`}
                    className="p-3 flex items-center justify-between hover:bg-zinc-50 transition-colors group cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
                          {calc.title}
                        </span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
                          {calc.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 line-clamp-1">{calc.description}</p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-600 transition-transform shrink-0" />
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links Bar */}
      <div className="border-t border-zinc-200 bg-zinc-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between">
          <nav className="hidden md:flex items-center gap-1 py-1.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;
              const href = cat.slug === "home" || cat.id === "home" ? "/" : `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.name}
                  href={href}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? "bg-white text-blue-600 border border-zinc-200 shadow-sm"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-blue-600" : "text-zinc-500"}`} />
                  {cat.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden py-1.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-700 hover:bg-zinc-100"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 bg-white px-4 py-3 space-y-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;
              const href = cat.slug === "home" || cat.id === "home" ? "/" : `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.name}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  <Icon className="h-4 w-4 text-blue-600" />
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

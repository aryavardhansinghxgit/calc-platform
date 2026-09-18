"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, Search, Menu, X, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NAVIGATION_CATEGORIES } from "@/constants/navigation";
import { getCalculatorDefinition, searchCalculators } from "@/calculators";
import { getCalculatorDisplayTitle } from "@/lib/calculator-title";

import { ThemeToggle } from "./ThemeToggle";

export interface NavbarProps {
  onSearchChange?: (term: string) => void;
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export function Navbar({ onSearchChange, activeCategory = "Home" }: NavbarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname() || "/";

  const categories = NAVIGATION_CATEGORIES;
  const routeCategory = useMemo(() => {
    if (!pathname || pathname === "/") return "Home";

    const category = categories.find(
      (cat) => pathname === `/category/${cat.slug}` || pathname.startsWith(`/category/${cat.slug}/`)
    );
    if (category) return category.name;

    if (pathname.startsWith("/calculators/")) {
      const parts = pathname.split("/");
      const calculatorSlug = parts[2];
      return calculatorSlug ? getCalculatorDefinition(calculatorSlug)?.category : undefined;
    }

    return undefined;
  }, [pathname, categories]);

  const selectedCategory = routeCategory ?? activeCategory;

  // Global Keyboard Shortcut: '/' or 'Ctrl+K' / 'Cmd+K'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (onSearchChange) {
      onSearchChange(term);
    }
  };

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return searchCalculators(searchTerm).slice(0, 8);
  }, [searchTerm]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-blue-500 dark:border-zinc-800 bg-blue-600 dark:bg-zinc-900 shadow-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 h-12">
        {/* Left Section: Logo & Desktop Categories */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white dark:focus-visible:ring-zinc-400 rounded-lg p-1 xl:shrink-0 xl:whitespace-nowrap"
            aria-label="CalcPlatform Home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 font-bold group-hover:bg-blue-50 dark:group-hover:bg-zinc-700 transition-colors shadow-sm">
              <Calculator className="h-4.5 w-4.5" />
            </div>
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-white dark:text-zinc-100">
                Calc<span className="text-blue-100 dark:text-blue-400">Platform</span>
              </span>
              <span className="hidden sm:inline text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/15 dark:bg-zinc-800 text-white dark:text-zinc-300 border border-white/30 dark:border-zinc-700">
                Pro
              </span>
            </div>
          </Link>

          {/* Desktop Categories Navigation */}
          <nav className="hidden xl:ml-2 xl:flex items-center gap-1" aria-label="Main Categories Navigation">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.name;
              const href = cat.slug === "home" || cat.id === "home" ? "/" : `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.name}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white dark:focus-visible:ring-zinc-400 ${
                    isActive
                      ? "bg-white dark:bg-zinc-800 text-blue-700 dark:text-blue-400 font-semibold shadow-sm"
                      : "text-blue-50 dark:text-zinc-300 hover:text-white dark:hover:text-white hover:bg-blue-500/70 dark:hover:bg-zinc-800/70"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Global Compact Search Bar & Controls */}
        <div className="flex min-w-0 flex-1 items-center justify-end gap-1.5 sm:gap-2 sm:flex-none">
          <div className="relative w-0 min-w-0 flex-1 sm:w-64 lg:w-72 sm:flex-none">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-blue-100 dark:text-zinc-400 z-10 pointer-events-none" />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search tools... (/)"
              value={searchTerm}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onChange={handleSearch}
              aria-label="Search calculators"
              className="pl-8 pr-8 sm:pr-12 bg-blue-700/80 dark:bg-zinc-800 border border-blue-400/60 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-zinc-600 text-white dark:text-zinc-100 placeholder:text-blue-200 dark:placeholder:text-zinc-400 focus:border-white dark:focus:border-blue-500 focus:ring-1 focus:ring-white/30 dark:focus:ring-blue-500/30 rounded-lg h-8 text-xs transition-all shadow-none"
            />
            {/* Autocomplete Popup */}
            {isFocused && searchTerm.trim() !== "" && (
              <div className="absolute top-10 right-0 left-0 sm:left-auto sm:w-80 z-50 bg-white dark:bg-zinc-900 border border-blue-200 dark:border-zinc-700 rounded-2xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto">
                <div className="flex items-center justify-between px-3 py-2 border-b border-blue-100 dark:border-zinc-800 bg-blue-50/70 dark:bg-zinc-800/50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                    Calculator suggestions
                  </span>
                  {searchResults.length > 0 && (
                    <span className="text-[10px] font-sans tabular-nums font-semibold text-blue-600 dark:text-blue-400">
                      {searchResults.length} matches
                    </span>
                  )}
                </div>
                {searchResults.length === 0 ? (
                  <div className="p-3.5 text-center text-xs text-zinc-500 dark:text-zinc-400">
                    No calculators found matching &quot;{searchTerm}&quot;
                  </div>
                ) : (
                  searchResults.map((calc) => (
                    <Link
                      key={calc.id}
                      href={`/calculators/${calc.slug}`}
                      className="p-2.5 flex min-w-0 items-center gap-2 border-b border-blue-50 last:border-b-0 dark:border-zinc-800/60 hover:bg-blue-50/70 dark:hover:bg-zinc-800/60 transition-colors group cursor-pointer"
                    >
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex min-w-0 items-center gap-1.5">
                          <span className="min-w-0 truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {getCalculatorDisplayTitle(calc.title)}
                          </span>
                          <span className="shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-zinc-800 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-zinc-700">
                            {calc.category}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="h-6 w-6 shrink-0 rounded-full bg-blue-50 dark:bg-zinc-800 p-1.5 text-blue-600 dark:text-blue-400 transition-all group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white group-hover:translate-x-0.5" />
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden sm:flex items-center gap-1 border-l border-blue-500/80 dark:border-zinc-800 pl-1.5 sm:pl-2">
            <ThemeToggle />
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex sm:hidden items-center gap-1">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="text-white dark:text-zinc-200 hover:bg-white/15 dark:hover:bg-zinc-800 h-8 w-8 p-0"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-blue-500 dark:border-zinc-800 bg-blue-600 dark:bg-zinc-900 px-4 py-3 space-y-2">
          <div className="space-y-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.name;
              const href = cat.slug === "home" || cat.id === "home" ? "/" : `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.name}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-white dark:bg-zinc-800 text-blue-700 dark:text-blue-400 font-semibold"
                      : "text-blue-50 dark:text-zinc-300 hover:bg-blue-500/70 dark:hover:bg-zinc-800/70 hover:text-white dark:hover:text-white"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

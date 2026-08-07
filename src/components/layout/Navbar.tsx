"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Calculator, Search, Menu, X, ArrowRight, Command } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NAVIGATION_CATEGORIES } from "@/constants/navigation";
import { searchCalculators } from "@/calculators";

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

  const categories = NAVIGATION_CATEGORIES;

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
    const val = e.target.value;
    setSearchTerm(val);
    if (onSearchChange) onSearchChange(val);
  };

  const searchResults = useMemo(() => {
    if (!searchTerm || searchTerm.trim() === "") return [];
    return searchCalculators(searchTerm);
  }, [searchTerm]);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md text-zinc-900 dark:text-zinc-100 shadow-sm transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 h-14">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
            aria-label="CalcPlatform Home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold group-hover:bg-blue-700 transition-colors shadow-sm">
              <Calculator className="h-4.5 w-4.5" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Calc<span className="text-blue-600 dark:text-blue-400">Platform</span>
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Pro
              </span>
            </div>
          </Link>

          {/* Desktop Categories Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Categories Navigation">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;
              const href = cat.slug === "home" || cat.id === "home" ? "/" : `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.name}
                  href={href}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-zinc-400"}`} />
                  {cat.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Global Compact Search Bar */}
        <div className="flex items-center gap-2">
          <div className="relative w-44 sm:w-72">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 z-10 pointer-events-none" />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search tools... (/)"
              value={searchTerm}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onChange={handleSearch}
              aria-label="Search calculators"
              className="pl-8 pr-12 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 rounded-lg h-8 text-xs transition-all"
            />
            <kbd className="hidden sm:flex items-center gap-0.5 absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono font-medium text-zinc-400 bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 px-1 py-0.5 rounded pointer-events-none">
              <Command className="h-2.5 w-2.5" />K
            </kbd>

            {/* Autocomplete Popup */}
            {isFocused && searchTerm.trim() !== "" && (
              <div className="absolute top-10 right-0 left-0 sm:left-auto sm:w-80 z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden max-h-72 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800">
                {searchResults.length === 0 ? (
                  <div className="p-3 text-center text-xs text-zinc-500 dark:text-zinc-400">
                    No calculators found matching &quot;{searchTerm}&quot;
                  </div>
                ) : (
                  searchResults.map((calc) => (
                    <Link
                      key={calc.id}
                      href={`/calculators/${calc.slug}`}
                      className="p-2.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors group cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {calc.title}
                          </span>
                          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                            {calc.category}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 line-clamp-1">{calc.description}</p>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-transform shrink-0" />
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 h-8 w-8 p-0"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2 space-y-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.name;
            const href = cat.slug === "home" || cat.id === "home" ? "/" : `/category/${cat.slug}`;
            return (
              <Link
                key={cat.name}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-semibold"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                {cat.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

export default Navbar;

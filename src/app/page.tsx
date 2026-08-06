"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero, SearchBar, CategoryGrid, FeaturedCalculators } from "@/components/home";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCalc, setSelectedCalc] = useState("mortgage");

  const quickTags = [
    { id: "mortgage", label: "Mortgage", category: "Finance" },
    { id: "loan", label: "Loan", category: "Finance" },
    { id: "emi", label: "EMI", category: "Finance" },
    { id: "sip", label: "SIP", category: "Finance" },
    { id: "compound-interest", label: "Compound Interest", category: "Finance" },
    { id: "bmi", label: "BMI", category: "Health" },
    { id: "percentage", label: "Percentage", category: "Math" },
  ];

  const featuredList = [
    { id: "mortgage", title: "Mortgage Calculator", desc: "Calculate home loans & interest", cat: "Finance" },
    { id: "loan", title: "Loan Calculator", desc: "Estimate auto & personal loan payments", cat: "Finance" },
    { id: "emi", title: "EMI Calculator", desc: "Equated Monthly Installment schedule", cat: "Finance" },
    { id: "compound-interest", title: "Compound Interest", desc: "Interest growth over time", cat: "Finance" },
    { id: "bmi", title: "BMI Calculator", desc: "Check Body Mass Index classification", cat: "Health" },
    { id: "sip", title: "SIP Calculator", desc: "Systematic Investment Plan returns", cat: "Finance" },
    { id: "percentage", title: "Percentage Calculator", desc: "Quick percent math & % change", cat: "Math" },
  ];

  const filteredTags = quickTags.filter((tag) => {
    const matchesSearch = tag.label.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Home" || tag.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredFeaturedList = featuredList.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Home" || item.cat === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between selection:bg-sky-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onSearchChange={(term) => setSearchQuery(term)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex-1 w-full space-y-12">
        {/* Hero Section Component */}
        <Hero />

        {/* Search Bar Component */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          quickTags={filteredTags}
          selectedCalc={selectedCalc}
          onSelectCalc={setSelectedCalc}
          filteredCount={filteredFeaturedList.length}
        />

        {/* Category Grid Component */}
        <CategoryGrid
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
        />

        {/* Featured Calculators Component */}
        <FeaturedCalculators
          featuredList={filteredFeaturedList.length > 0 ? filteredFeaturedList : featuredList}
          selectedCalc={selectedCalc}
          onSelectCalc={setSelectedCalc}
        />
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Search, Sparkles, ChevronRight, Calculator as CalcIcon } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import {
  MortgageCalculator,
  LoanCalculator,
  EmiCalculator,
  SipCalculator,
  CompoundInterestCalculator,
  BmiCalculator,
  PercentageCalculator,
} from "@/components/calculator";

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between">
      {/* Header */}
      <Header
        onSearchChange={(term) => setSearchQuery(term)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex-1 w-full space-y-12">
        {/* HERO SECTION */}
        <section className="text-center space-y-6 max-w-3xl mx-auto pt-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Find the Right <span className="text-sky-400">Calculator</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Accurate, easy-to-use calculators for finance, health, math, and everyday decision making.
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search for a calculator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-13 text-base bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-2xl shadow-xl focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          {/* Quick Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {filteredTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setSelectedCalc(tag.id)}
                className={`px-4 py-2 text-sm font-medium rounded-xl border transition-all ${
                  selectedCalc === tag.id
                    ? "bg-sky-500 text-white border-sky-400 shadow-lg shadow-sky-500/25"
                    : "bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800"
                }`}
              >
                [ {tag.label} ]
              </button>
            ))}
          </div>
        </section>

        {/* FEATURED CALCULATORS SECTION */}
        <section className="space-y-6 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-sky-400" /> Featured Calculators
            </h2>
          </div>

          <Tabs value={selectedCalc} onValueChange={setSelectedCalc} className="w-full space-y-6">
            {/* Calculator Select Tabs Header */}
            <TabsList className="bg-slate-900 border border-slate-800 p-1.5 rounded-2xl flex flex-wrap h-auto gap-1">
              {featuredList.map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className="data-[state=active]:bg-sky-500 data-[state=active]:text-white rounded-xl font-medium text-xs sm:text-sm px-3.5 py-2 text-slate-300 transition-all"
                >
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Active Calculator Component View */}
            <div className="pt-2">
              <TabsContent value="mortgage" className="m-0 focus-visible:outline-none">
                <MortgageCalculator />
              </TabsContent>

              <TabsContent value="loan" className="m-0 focus-visible:outline-none">
                <LoanCalculator />
              </TabsContent>

              <TabsContent value="emi" className="m-0 focus-visible:outline-none">
                <EmiCalculator />
              </TabsContent>

              <TabsContent value="compound-interest" className="m-0 focus-visible:outline-none">
                <CompoundInterestCalculator />
              </TabsContent>

              <TabsContent value="bmi" className="m-0 focus-visible:outline-none">
                <BmiCalculator />
              </TabsContent>

              <TabsContent value="sip" className="m-0 focus-visible:outline-none">
                <SipCalculator />
              </TabsContent>

              <TabsContent value="percentage" className="m-0 focus-visible:outline-none">
                <PercentageCalculator />
              </TabsContent>
            </div>
          </Tabs>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

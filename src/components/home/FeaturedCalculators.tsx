"use client";

import React, { useState } from "react";
import { Sparkles, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { getFeaturedCalculators, getCalculatorDefinition } from "@/calculators";
import { getCalculatorDisplayTitle } from "@/lib/calculator-title";

export interface FeaturedItem {
  id: string;
  title: string;
  desc?: string;
  category?: string;
}

export interface FeaturedCalculatorsProps {
  featuredList?: FeaturedItem[];
  selectedCalc?: string;
  onSelectCalc?: (id: string) => void;
}

// Select top 8 premier featured tools for clean hero presentation
const allFeatured = getFeaturedCalculators();
const premierFeaturedIds = ["mortgage", "auto-loan", "loan", "emi", "sip", "income-tax", "bmi", "budget"];

const defaultFeaturedList: FeaturedItem[] = (
  allFeatured.filter((c) => premierFeaturedIds.includes(c.id)).length > 0
    ? allFeatured.filter((c) => premierFeaturedIds.includes(c.id))
    : allFeatured.slice(0, 8)
).map((c) => ({
  id: c.id,
  title: c.title,
  desc: c.description,
  category: c.category,
}));

export function FeaturedCalculators({
  featuredList = defaultFeaturedList,
  selectedCalc,
  onSelectCalc,
}: FeaturedCalculatorsProps = {}) {
  const defaultTab = featuredList.length > 0 ? featuredList[0].id : "mortgage";
  const [internalSelected, setInternalSelected] = useState(defaultTab);
  const activeCalc = selectedCalc !== undefined ? selectedCalc : internalSelected;

  const handleSelect = (val: string) => {
    setInternalSelected(val);
    if (onSelectCalc) onSelectCalc(val);
  };

  return (
    <section className="space-y-4 pt-4 border-t border-border">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground flex items-center gap-2">Premier Interactive Solvers
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Switch tabs for instant real-time computation & data breakdown.
          </p>
        </div>
      </div>

      {/* Tabs Container */}
      <Tabs value={activeCalc} onValueChange={handleSelect} className="w-full space-y-4">
        {/* Horizontal Smooth Scrollable Tab Bar (Single row, non-wrapping, clean alignment) */}
        <div className="w-full overflow-x-auto pb-1.5 scrollbar-none">
          <TabsList className="bg-card border border-border p-1 rounded-xl flex items-center gap-1.5 w-max min-w-full">
            {featuredList.map((item) => (
              <TabsTrigger
                key={item.id}
                value={item.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-xs rounded-lg font-bold text-xs px-3.5 py-2 text-muted-foreground hover:text-foreground whitespace-nowrap transition-all cursor-pointer shrink-0"
              >
                {getCalculatorDisplayTitle(item.title)}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Dynamic Active Calculator View */}
        <div className="pt-1">
          {featuredList.map((item) => {
            const def = getCalculatorDefinition(item.id);
            if (!def) return null;
            const { calculate, ...serializableDef } = def;

            return (
              <TabsContent key={item.id} value={item.id} className="m-0 min-w-0 focus-visible:outline-none">
                <CalculatorLayout definition={serializableDef} />
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </section>
  );
}

export default FeaturedCalculators;

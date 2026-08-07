"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { getFeaturedCalculators, getCalculatorDefinition } from "@/calculators";

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

const defaultFeaturedList: FeaturedItem[] = getFeaturedCalculators().map((c) => ({
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
    <section className="space-y-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" /> Featured Calculators
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Choose a calculator below for instant real-time computation & data breakdown.
          </p>
        </div>
      </div>

      {/* Calculator Selector & Active View Tabs */}
      <Tabs value={activeCalc} onValueChange={handleSelect} className="w-full space-y-6">
        {/* Calculator Select Tabs Header */}
        <TabsList className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1 rounded-xl flex flex-wrap h-auto gap-1">
          {featuredList.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-100 data-[state=active]:shadow-sm rounded-lg font-medium text-xs sm:text-sm px-3.5 py-1.5 text-zinc-600 dark:text-zinc-400 transition-all cursor-pointer"
            >
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Dynamic Active Calculator Content Container */}
        <div className="pt-2">
          {featuredList.map((item) => {
            const def = getCalculatorDefinition(item.id);
            if (!def) return null;
            const { calculate, ...serializableDef } = def;

            return (
              <TabsContent key={item.id} value={item.id} className="m-0 focus-visible:outline-none">
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

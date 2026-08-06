"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
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
import { getFeaturedCalculators } from "@/data/calculators";

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
  const [internalSelected, setInternalSelected] = useState("mortgage");
  const activeCalc = selectedCalc !== undefined ? selectedCalc : internalSelected;

  const handleSelect = (val: string) => {
    setInternalSelected(val);
    if (onSelectCalc) onSelectCalc(val);
  };

  return (
    <section className="space-y-6 pt-6 border-t border-zinc-200">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" /> Featured Calculators
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Choose a calculator below for instant real-time computation & data breakdown.
          </p>
        </div>
      </div>

      {/* Calculator Selector & Active View Tabs */}
      <Tabs value={activeCalc} onValueChange={handleSelect} className="w-full space-y-6">
        {/* Calculator Select Tabs Header */}
        <TabsList className="bg-zinc-100 border border-zinc-200 p-1 rounded-xl flex flex-wrap h-auto gap-1">
          {featuredList.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className="data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm rounded-lg font-medium text-xs sm:text-sm px-3.5 py-1.5 text-zinc-600 transition-all cursor-pointer"
            >
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Active Calculator Component Container */}
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
  );
}

export default FeaturedCalculators;

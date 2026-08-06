"use client";

import React from "react";
import { Sparkles, Calculator as CalcIcon, ChevronRight } from "lucide-react";
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

export interface FeaturedItem {
  id: string;
  title: string;
  desc: string;
  cat: string;
}

export interface FeaturedCalculatorsProps {
  featuredList: FeaturedItem[];
  selectedCalc: string;
  onSelectCalc: (id: string) => void;
}

export function FeaturedCalculators({
  featuredList,
  selectedCalc,
  onSelectCalc,
}: FeaturedCalculatorsProps) {
  return (
    <section className="space-y-6 pt-6 border-t border-slate-800/80">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-sky-400" /> Featured Calculators
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Choose a calculator below for instant real-time computation & data breakdown.
          </p>
        </div>
      </div>

      {/* Calculator Selector & Active View Tabs */}
      <Tabs value={selectedCalc} onValueChange={onSelectCalc} className="w-full space-y-6">
        {/* Calculator Select Tabs Header */}
        <TabsList className="bg-slate-900 border border-slate-800 p-1.5 rounded-2xl flex flex-wrap h-auto gap-1">
          {featuredList.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className="data-[state=active]:bg-sky-500 data-[state=active]:text-white rounded-xl font-medium text-xs sm:text-sm px-3.5 py-2 text-slate-300 transition-all cursor-pointer"
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

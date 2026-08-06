"use client";

import React, { useState, useMemo } from "react";
import { calculateCompoundInterest } from "@/lib/formulas/compoundInterest";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import currency from "currency.js";

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [monthlyDeposit, setMonthlyDeposit] = useState(250);
  const [annualRate, setAnnualRate] = useState(7);
  const [years, setYears] = useState(10);

  const results = useMemo(() => {
    return calculateCompoundInterest({
      principal,
      monthlyDeposit,
      annualRate,
      years,
      compoundFrequencyPerYear: 12,
    });
  }, [principal, monthlyDeposit, annualRate, years]);

  return (
    <Card className="bg-slate-900 border-slate-800 text-slate-100 p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Compound Interest Calculator</CardTitle>
        <CardDescription className="text-slate-400">See how investments grow with interest compounding</CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label className="text-slate-300">Initial Deposit ($)</Label>
            <Input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="bg-slate-950 border-slate-800"
            />
          </div>
          <div>
            <Label className="text-slate-300">Monthly Contribution ($)</Label>
            <Input
              type="number"
              value={monthlyDeposit}
              onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
              className="bg-slate-950 border-slate-800"
            />
          </div>
          <div>
            <Label className="text-slate-300">Annual Rate (%)</Label>
            <Input
              type="number"
              step="0.1"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="bg-slate-950 border-slate-800"
            />
          </div>
          <div>
            <Label className="text-slate-300">Years</Label>
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="bg-slate-950 border-slate-800"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Total Future Balance</div>
            <div className="text-3xl font-extrabold text-emerald-400">{currency(results.futureValue).format()}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400">Total Interest Earned</div>
            <div className="text-xl font-bold text-amber-400">{currency(results.totalInterestEarned).format()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

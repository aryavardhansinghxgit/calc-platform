"use client";

import React, { useState, useMemo } from "react";
import { calculateSip } from "@/lib/formulas/sip";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import currency from "currency.js";

export function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(500);
  const [expectedReturnAnnual, setExpectedReturnAnnual] = useState(12);
  const [tenureYears, setTenureYears] = useState(15);

  const results = useMemo(() => {
    return calculateSip({
      monthlyInvestment,
      expectedReturnAnnual,
      tenureYears,
    });
  }, [monthlyInvestment, expectedReturnAnnual, tenureYears]);

  return (
    <Card className="bg-slate-900 border-slate-800 text-slate-100 p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Systematic Investment Plan (SIP) Calculator</CardTitle>
        <CardDescription className="text-slate-400">Calculate long-term wealth creation</CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-slate-300">Monthly Investment ($)</Label>
            <Input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="bg-slate-950 border-slate-800"
            />
          </div>
          <div>
            <Label className="text-slate-300">Expected Annual Return (%)</Label>
            <Input
              type="number"
              step="0.5"
              value={expectedReturnAnnual}
              onChange={(e) => setExpectedReturnAnnual(Number(e.target.value))}
              className="bg-slate-950 border-slate-800"
            />
          </div>
          <div>
            <Label className="text-slate-300">Tenure (Years)</Label>
            <Input
              type="number"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="bg-slate-950 border-slate-800"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-slate-400">Total Invested</div>
            <div className="text-xl font-bold text-sky-400">{currency(results.totalInvested).format()}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Estimated Returns</div>
            <div className="text-xl font-bold text-amber-400">{currency(results.estimatedReturns).format()}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Future Portfolio Value</div>
            <div className="text-2xl font-extrabold text-emerald-400">{currency(results.totalValue).format()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

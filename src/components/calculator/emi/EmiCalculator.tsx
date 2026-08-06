"use client";

import React, { useState, useMemo } from "react";
import { calculateEmi } from "@/lib/formulas/emi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import currency from "currency.js";

export function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(9.0);
  const [tenureMonths, setTenureMonths] = useState(60);

  const results = useMemo(() => {
    return calculateEmi({
      loanAmount,
      interestRate,
      tenureMonths,
    });
  }, [loanAmount, interestRate, tenureMonths]);

  return (
    <Card className="bg-slate-900 border-slate-800 text-slate-100 p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Equated Monthly Installment (EMI) Calculator</CardTitle>
        <CardDescription className="text-slate-400">Monthly breakdown for loans</CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-slate-300">Principal ($)</Label>
            <Input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="bg-slate-950 border-slate-800"
            />
          </div>
          <div>
            <Label className="text-slate-300">Annual Interest Rate (%)</Label>
            <Input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="bg-slate-950 border-slate-800"
            />
          </div>
          <div>
            <Label className="text-slate-300">Tenure (Months)</Label>
            <Input
              type="number"
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
              className="bg-slate-950 border-slate-800"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Monthly EMI</div>
            <div className="text-3xl font-extrabold text-sky-400">{currency(results.monthlyEmi).format()}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400">Total Interest Payable</div>
            <div className="text-xl font-bold text-amber-400">{currency(results.totalInterest).format()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

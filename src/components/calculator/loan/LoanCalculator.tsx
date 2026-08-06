"use client";

import React, { useState, useMemo } from "react";
import { calculateEmi } from "@/lib/formulas/emi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import currency from "currency.js";

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(5);

  const results = useMemo(() => {
    return calculateEmi({
      loanAmount,
      interestRate,
      tenureMonths: tenureYears * 12,
    });
  }, [loanAmount, interestRate, tenureYears]);

  return (
    <Card className="bg-slate-900 border-slate-800 text-slate-100 p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Personal & Auto Loan Calculator</CardTitle>
        <CardDescription className="text-slate-400">Calculate total cost of borrowing</CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-slate-300">Loan Amount ($)</Label>
            <Input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="bg-slate-950 border-slate-800"
            />
          </div>
          <div>
            <Label className="text-slate-300">Interest Rate (%)</Label>
            <Input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
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
            <div className="text-xs text-slate-400">Monthly Payment</div>
            <div className="text-2xl font-bold text-sky-400">{currency(results.monthlyEmi).format()}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Total Interest</div>
            <div className="text-2xl font-bold text-amber-400">{currency(results.totalInterest).format()}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Total Payment</div>
            <div className="text-2xl font-bold text-emerald-400">{currency(results.totalPayment).format()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import { calculateMortgage } from "@/lib/formulas/mortgage";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import currency from "currency.js";

export function MortgageCalculator() {
  const [homeValue, setHomeValue] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState(4000);
  const [insuranceAnnual, setInsuranceAnnual] = useState(1200);

  const results = useMemo(() => {
    return calculateMortgage({
      homeValue,
      downPayment,
      interestRate,
      loanTermYears,
      propertyTaxAnnual,
      insuranceAnnual,
    });
  }, [homeValue, downPayment, interestRate, loanTermYears, propertyTaxAnnual, insuranceAnnual]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <Card className="md:col-span-5 bg-slate-900 border-slate-800 text-slate-100">
        <CardHeader>
          <CardTitle>Mortgage Calculator</CardTitle>
          <CardDescription className="text-slate-400">Estimate your monthly home loan payments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-slate-300">Home Price ($)</Label>
            <Input
              type="number"
              value={homeValue}
              onChange={(e) => setHomeValue(Number(e.target.value))}
              className="bg-slate-950 border-slate-800"
            />
          </div>
          <div>
            <Label className="text-slate-300">Down Payment ($)</Label>
            <Input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="bg-slate-950 border-slate-800"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
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
              <Label className="text-slate-300">Term (Years)</Label>
              <Input
                type="number"
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="bg-slate-950 border-slate-800"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-7 bg-slate-900 border-slate-800 text-slate-100 p-6 space-y-6">
        <div>
          <h3 className="text-xs uppercase text-slate-400 font-semibold tracking-wider">Total Monthly Payment</h3>
          <div className="text-4xl font-extrabold text-sky-400 mt-1">
            {currency(results.totalMonthlyPayment).format()}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            P&I: {currency(results.monthlyPrincipalAndInterest).format()} | Tax: {currency(results.monthlyPropertyTax).format()} | Ins: {currency(results.monthlyInsurance).format()}
          </div>
        </div>

        <div className="border-t border-slate-800 pt-4">
          <h4 className="text-sm font-semibold text-slate-200 mb-2">Loan Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>Principal: <span className="font-semibold text-slate-100">{currency(results.principal).format()}</span></div>
            <div>Total Interest: <span className="font-semibold text-amber-400">{currency(results.totalInterestPaid).format()}</span></div>
          </div>
        </div>
      </Card>
    </div>
  );
}

"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, AlertTriangle, Lightbulb } from "lucide-react";

export function MortgageContentSection() {
  return (
    <div className="space-y-6">
      {/* 1. How it Works */}
      <Card className="bg-slate-900/60 border-slate-800/80 rounded-[12px] p-6 space-y-4">
        <CardHeader className="p-0 pb-2 border-b border-slate-800">
          <CardTitle className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-sky-400" /> How Mortgages Work
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            A home mortgage is a long-term loan used to purchase real estate property. When you take out a mortgage, the lender provides the funds required to buy the home, and you agree to pay back the loan amount plus interest over a set duration (typically 15 to 30 years).
          </p>
          <p>
            Your monthly payment is typically divided into four main components known as PITI:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-400">
            <li><strong className="text-white">Principal:</strong> The portion of your payment that directly reduces your remaining loan balance.</li>
            <li><strong className="text-white">Interest:</strong> The fee charged by the lender for borrowing money.</li>
            <li><strong className="text-white">Property Taxes:</strong> Annual taxes levied by local government authorities, collected monthly into escrow.</li>
            <li><strong className="text-white">Home Insurance:</strong> Protection insurance covering property damage and structural loss.</li>
          </ul>
        </CardContent>
      </Card>

      {/* 2. Practical Example */}
      <Card className="bg-slate-900/60 border-slate-800/80 rounded-[12px] p-6 space-y-4">
        <CardHeader className="p-0 pb-2 border-b border-slate-800">
          <CardTitle className="text-base font-bold text-white flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-400" /> Practical Worked Example
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            Suppose you purchase a home valued at <strong className="text-sky-400 font-mono">$400,000</strong> with a <strong className="text-emerald-400 font-mono">20% down payment ($80,000)</strong> at a fixed interest rate of <strong className="text-sky-400 font-mono">6.5%</strong> over <strong className="text-white font-mono">30 years</strong>:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Loan Amount</span>
              <span className="text-sm font-bold text-white font-mono">$320,000</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Base Monthly P&I</span>
              <span className="text-sm font-bold text-sky-400 font-mono">$2,022.62</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Total 30-Yr Interest</span>
              <span className="text-sm font-bold text-amber-400 font-mono">$408,144</span>
            </div>
          </div>
          <p className="text-slate-400">
            Adding estimated annual property taxes ($4,800/yr) and insurance ($1,200/yr), your total monthly housing cost is approximately <strong className="text-white font-mono">$2,522.62</strong>.
          </p>
        </CardContent>
      </Card>

      {/* 3. Common Pitfalls & Mistakes */}
      <Card className="bg-slate-900/60 border-slate-800/80 rounded-[12px] p-6 space-y-4">
        <CardHeader className="p-0 pb-2 border-b border-slate-800">
          <CardTitle className="text-base font-bold text-white flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-400" /> Common Mortgage Mistakes to Avoid
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-2.5 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <h4 className="font-semibold text-rose-300">1. Underestimating Hidden Ownership Costs</h4>
            <p className="text-slate-400 leading-relaxed">
              Buyers often calculate only principal and interest, forgetting property tax increases, homeowner association (HOA) fees, and routine home maintenance (typically 1-2% of property value per year).
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <h4 className="font-semibold text-rose-300">2. Making Less Than 20% Down Without Budgeting PMI</h4>
            <p className="text-slate-400 leading-relaxed">
              If your down payment is below 20%, lenders require Private Mortgage Insurance (PMI), which adds $100–$300/month without building equity.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <h4 className="font-semibold text-rose-300">3. Overextending Your Debt-to-Income (DTI) Ratio</h4>
            <p className="text-slate-400 leading-relaxed">
              Financial planners recommend keeping your total housing costs under 28% of your gross monthly income to avoid financial strain.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MortgageContentSection;

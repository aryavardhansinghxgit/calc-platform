"use client";

import React from "react";
import { BookOpen, AlertTriangle, Lightbulb } from "lucide-react";

export function MortgageContentSection() {
  return (
    <div className="space-y-4">
      {/* 1. How it Works */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 flex items-center gap-2">
          <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" /> How Mortgages Work
        </h4>
        <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            A home mortgage is a long-term loan used to purchase real estate. The lender provides funds, and you repay the loan plus interest over 15–30 years.
          </p>
          <p>Your monthly payment (PITI) includes:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-zinc-500 dark:text-zinc-400">
            <li><strong className="text-zinc-900 dark:text-zinc-200">Principal:</strong> Reduces your loan balance.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-200">Interest:</strong> Fee for borrowing money.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-200">Property Taxes:</strong> Annual taxes collected monthly into escrow.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-200">Home Insurance:</strong> Protection covering property damage.</li>
          </ul>
        </div>
      </div>

      {/* 2. Practical Example */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 flex items-center gap-2">
          <Lightbulb className="h-3.5 w-3.5 text-amber-500" /> Worked Example
        </h4>
        <div className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-2">
          <p>
            $400,000 home, 20% down ($80,000), 6.5% rate, 30 years:
          </p>
          <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <div>
              <span className="text-[10px] uppercase text-zinc-400 block font-medium">Loan</span>
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 font-mono">$320,000</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-zinc-400 block font-medium">Monthly P&I</span>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 font-mono">$2,022.62</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-zinc-400 block font-medium">Total Interest</span>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 font-mono">$408,144</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Common Pitfalls */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 flex items-center gap-2">
          <AlertTriangle className="h-3.5 w-3.5 text-red-500" /> Common Mistakes
        </h4>
        <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <strong className="text-zinc-900 dark:text-zinc-200">Underestimating costs.</strong> Budget for taxes, HOA, and maintenance (1-2% of property value/year).
          </div>
          <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <strong className="text-zinc-900 dark:text-zinc-200">Skipping PMI.</strong> Under 20% down adds $100-$300/month in private mortgage insurance.
          </div>
          <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <strong className="text-zinc-900 dark:text-zinc-200">Overextending DTI.</strong> Keep housing costs under 28% of gross monthly income.
          </div>
        </div>
      </div>
    </div>
  );
}

export default MortgageContentSection;

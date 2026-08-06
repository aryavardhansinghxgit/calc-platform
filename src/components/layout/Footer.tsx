"use client";

import React from "react";
import { Calculator } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-sm py-12 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Calculator className="h-5 w-5 text-sky-400" /> CalcPlatform
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Free, fast, and precise financial, mathematical, health, and engineering calculators.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Financial Suite</h4>
          <ul className="space-y-2 text-xs">
            <li className="hover:text-slate-200 cursor-pointer">Mortgage Calculator</li>
            <li className="hover:text-slate-200 cursor-pointer">Loan & Auto Payment</li>
            <li className="hover:text-slate-200 cursor-pointer">EMI Installment</li>
            <li className="hover:text-slate-200 cursor-pointer">SIP Wealth Growth</li>
            <li className="hover:text-slate-200 cursor-pointer">Compound Interest</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Health & Math</h4>
          <ul className="space-y-2 text-xs">
            <li className="hover:text-slate-200 cursor-pointer">BMI Index Calculator</li>
            <li className="hover:text-slate-200 cursor-pointer">Percentage Converter</li>
            <li className="hover:text-slate-200 cursor-pointer">Calorie & Macro Ratio</li>
            <li className="hover:text-slate-200 cursor-pointer">Scientific Math</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Legal & Info</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Calculations are for estimation purposes only. Consult financial advisors for official planning.
          </p>
          <div className="mt-4 text-xs text-slate-600">
            &copy; {new Date().getFullYear()} CalcPlatform. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Calculator } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-sm py-12 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg hover:text-sky-400 transition-colors">
            <Calculator className="h-5 w-5 text-sky-400" /> CalcPlatform
          </Link>
          <p className="text-xs text-slate-500 leading-relaxed">
            Free, fast, and precise financial, mathematical, health, and engineering calculators.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Financial Suite</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/calculators/mortgage-calculator" className="hover:text-sky-400 transition-colors">
                Mortgage Calculator
              </Link>
            </li>
            <li>
              <Link href="/calculators/auto-loan-calculator" className="hover:text-sky-400 transition-colors">
                Auto Loan Calculator
              </Link>
            </li>
            <li>
              <Link href="/calculators/loan-calculator" className="hover:text-sky-400 transition-colors">
                Personal Loan Calculator
              </Link>
            </li>
            <li>
              <Link href="/calculators/emi-calculator" className="hover:text-sky-400 transition-colors">
                EMI Installment
              </Link>
            </li>
            <li>
              <Link href="/calculators/sip-calculator" className="hover:text-sky-400 transition-colors">
                SIP Wealth Growth
              </Link>
            </li>
            <li>
              <Link href="/calculators/compound-interest-calculator" className="hover:text-sky-400 transition-colors">
                Compound Interest
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Categories & Tools</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/category/finance" className="hover:text-sky-400 transition-colors">
                Finance Hub
              </Link>
            </li>
            <li>
              <Link href="/calculators/bmi-calculator" className="hover:text-sky-400 transition-colors">
                BMI Health Calculator
              </Link>
            </li>
            <li>
              <Link href="/calculators/percentage-calculator" className="hover:text-sky-400 transition-colors">
                Percentage Calculator
              </Link>
            </li>
            <li>
              <Link href="/calculators/age-calculator" className="hover:text-sky-400 transition-colors">
                Age Calculator
              </Link>
            </li>
            <li>
              <Link href="/category/math" className="hover:text-sky-400 transition-colors">
                Math Category
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Platform Info</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Calculations are for estimation purposes only. All calculations run client-side for total privacy.
          </p>
          <div className="mt-4 text-xs text-slate-600">
            &copy; {new Date().getFullYear()} CalcPlatform. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


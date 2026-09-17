"use client";

import React from "react";
import Link from "next/link";
import { Calculator } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-blue-500 dark:border-zinc-800 bg-blue-600 dark:bg-zinc-900 text-blue-50 dark:text-zinc-400 text-sm py-12 mt-16 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2 text-white dark:text-zinc-100 font-bold text-lg hover:text-blue-100 dark:hover:text-blue-400 transition-colors">
            <Calculator className="h-5 w-5 text-white dark:text-blue-400" /> CalcPlatform
          </Link>
          <p className="text-xs text-blue-100 dark:text-zinc-400 leading-relaxed">
            Free, fast, and precise financial, mathematical, health, and engineering calculators.
          </p>
        </div>

        <div>
          <h4 className="text-white dark:text-zinc-100 font-semibold mb-3 text-xs uppercase tracking-wider">Financial Suite</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/calculators/mortgage-calculator" className="text-blue-50 dark:text-zinc-400 hover:text-white dark:hover:text-zinc-100 transition-colors">
                Mortgage Calculator
              </Link>
            </li>
            <li>
              <Link href="/calculators/auto-loan-calculator" className="text-blue-50 dark:text-zinc-400 hover:text-white dark:hover:text-zinc-100 transition-colors">
                Auto Loan Calculator
              </Link>
            </li>
            <li>
              <Link href="/calculators/loan-calculator" className="text-blue-50 dark:text-zinc-400 hover:text-white dark:hover:text-zinc-100 transition-colors">
                Personal Loan Calculator
              </Link>
            </li>
            <li>
              <Link href="/calculators/emi-calculator" className="text-blue-50 dark:text-zinc-400 hover:text-white dark:hover:text-zinc-100 transition-colors">
                EMI Installment
              </Link>
            </li>
            <li>
              <Link href="/calculators/sip-calculator" className="text-blue-50 dark:text-zinc-400 hover:text-white dark:hover:text-zinc-100 transition-colors">
                SIP Wealth Growth
              </Link>
            </li>
            <li>
              <Link href="/calculators/compound-interest-calculator" className="text-blue-50 dark:text-zinc-400 hover:text-white dark:hover:text-zinc-100 transition-colors">
                Compound Interest
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white dark:text-zinc-100 font-semibold mb-3 text-xs uppercase tracking-wider">Categories & Tools</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/category/finance" className="text-blue-50 dark:text-zinc-400 hover:text-white dark:hover:text-zinc-100 transition-colors">
                Finance Hub
              </Link>
            </li>
            <li>
              <Link href="/calculators/bmi-calculator" className="text-blue-50 dark:text-zinc-400 hover:text-white dark:hover:text-zinc-100 transition-colors">
                BMI Health Calculator
              </Link>
            </li>
            <li>
              <Link href="/calculators/percentage-calculator" className="text-blue-50 dark:text-zinc-400 hover:text-white dark:hover:text-zinc-100 transition-colors">
                Percentage Calculator
              </Link>
            </li>
            <li>
              <Link href="/calculators/age-calculator" className="text-blue-50 dark:text-zinc-400 hover:text-white dark:hover:text-zinc-100 transition-colors">
                Age Calculator
              </Link>
            </li>
            <li>
              <Link href="/category/math" className="text-blue-50 dark:text-zinc-400 hover:text-white dark:hover:text-zinc-100 transition-colors">
                Math Category
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white dark:text-zinc-100 font-semibold mb-3 text-xs uppercase tracking-wider">Company & Legal</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/about" className="text-blue-50 dark:text-zinc-400 hover:text-white dark:hover:text-zinc-100 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-blue-50 dark:text-zinc-400 hover:text-white dark:hover:text-zinc-100 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-blue-50 dark:text-zinc-400 hover:text-white dark:hover:text-zinc-100 transition-colors">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-blue-50 dark:text-zinc-400 hover:text-white dark:hover:text-zinc-100 transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="mt-4 pt-3 border-t border-blue-500/60 dark:border-zinc-800 text-[11px] text-blue-200 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} CalcPlatform. All calculations run client-side for total privacy.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

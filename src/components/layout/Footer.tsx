"use client";

import React from "react";
import Link from "next/link";
import { Calculator } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-blue-500 bg-blue-600 text-blue-50 text-sm py-12 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg hover:text-blue-100 transition-colors">
            <Calculator className="h-5 w-5 text-white" /> CalcPlatform
          </Link>
          <p className="text-xs text-blue-100 leading-relaxed">
            Free, fast, and precise financial, mathematical, health, and engineering calculators.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Financial Suite</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/calculators/mortgage-calculator" className="text-blue-50 hover:text-white transition-colors">
                Mortgage Calculator
              </Link>
            </li>
            <li>
              <Link href="/calculators/auto-loan-calculator" className="text-blue-50 hover:text-white transition-colors">
                Auto Loan Calculator
              </Link>
            </li>
            <li>
              <Link href="/calculators/loan-calculator" className="text-blue-50 hover:text-white transition-colors">
                Personal Loan Calculator
              </Link>
            </li>
            <li>
              <Link href="/calculators/emi-calculator" className="text-blue-50 hover:text-white transition-colors">
                EMI Installment
              </Link>
            </li>
            <li>
              <Link href="/calculators/sip-calculator" className="text-blue-50 hover:text-white transition-colors">
                SIP Wealth Growth
              </Link>
            </li>
            <li>
              <Link href="/calculators/compound-interest-calculator" className="text-blue-50 hover:text-white transition-colors">
                Compound Interest
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Categories & Tools</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/category/finance" className="text-blue-50 hover:text-white transition-colors">
                Finance Hub
              </Link>
            </li>
            <li>
              <Link href="/calculators/bmi-calculator" className="text-blue-50 hover:text-white transition-colors">
                BMI Health Calculator
              </Link>
            </li>
            <li>
              <Link href="/calculators/percentage-calculator" className="text-blue-50 hover:text-white transition-colors">
                Percentage Calculator
              </Link>
            </li>
            <li>
              <Link href="/calculators/age-calculator" className="text-blue-50 hover:text-white transition-colors">
                Age Calculator
              </Link>
            </li>
            <li>
              <Link href="/category/math" className="text-blue-50 hover:text-white transition-colors">
                Math Category
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Company & Legal</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/about" className="text-blue-50 hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-blue-50 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-blue-50 hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-blue-50 hover:text-white transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="mt-4 pt-3 border-t border-blue-500/60 text-[11px] text-blue-200">
            &copy; {new Date().getFullYear()} CalcPlatform. All calculations run client-side for total privacy.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  Calculator,
  Building,
  HelpCircle,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Scale,
  CheckCircle2,
  Percent,
} from "lucide-react";
import { downPaymentFaqs } from "@/app/calculators/down-payment-calculator/faq";

export { downPaymentFaqs };

export function DownPaymentContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* SECTION 1: WHAT IS A DOWN PAYMENT */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg sm:text-xl">
          <DollarSign className="h-6 w-6" />
          <h2>1. What is a Down Payment &amp; How Does it Work?</h2>
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A down payment is the initial upfront cash contribution paid by a homebuyer toward the total purchase price of real estate. The remaining balance is financed through a primary mortgage loan secured by the property. The down payment establishes your initial home equity position and directly dictates your Loan-to-Value (LTV) ratio.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans text-center">Core Mortgage Down Payment Formulas</div>
          
          <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 space-y-2">
            <div><strong>1. Down Payment Amount ($):</strong></div>
            <div className="text-center font-mono">Down Payment = Purchase Price (P) × (Down % ÷ 100)</div>
            
            <div className="pt-2"><strong>2. Loan Principal Financed ($):</strong></div>
            <div className="text-center font-mono">Loan Amount = Purchase Price − Down Payment</div>

            <div className="pt-2"><strong>3. Total Cash Required at Closing ($):</strong></div>
            <div className="text-center font-mono">Cash to Close = Down Payment + Upfront Closing Costs (2% − 5%)</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW MUCH DOWN PAYMENT DO YOU REALLY NEED */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg sm:text-xl">
          <Building className="h-6 w-6" />
          <h2>2. How Much Down Payment Do You Really Need?</h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The required down payment varies based on loan program guidelines, borrower credit score, occupancy type, and property classification:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">0% Down Payment</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Available via government-backed <Link href="/calculators/va-mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">VA loans</Link> (eligible military veterans) and USDA Rural Development loans (qualifying rural properties).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">3% – 3.5% Down Payment</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Conventional 97 programs require 3% down for qualifying first-time buyers with 620+ credit scores. <Link href="/calculators/fha-loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">FHA loans</Link> require 3.5% down for scores 580+.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">20% Down Payment</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              The standard threshold to eliminate Private Mortgage Insurance (PMI) on conventional financing and minimize lifetime interest expense.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE 20% DOWN PAYMENT MYTH VS REALITY */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg sm:text-xl">
          <Scale className="h-6 w-6" />
          <h2>3. The 20% Down Payment Myth vs. Reality</h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          While putting 20% down eliminates PMI, waiting years to accumulate 20% involves trade-offs regarding market entry timing and capital liquidity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
            <h3 className="font-extrabold text-emerald-700 dark:text-emerald-400 text-sm">Pros of 20% Down</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 font-normal">
              <li>Instant $0 Private Mortgage Insurance (PMI) saving $100–$300/mo</li>
              <li>Lower monthly principal &amp; interest (P&amp;I) payment</li>
              <li>Lower lifetime interest expense over the loan term</li>
              <li>Stronger offer competitiveness in seller markets</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
            <h3 className="font-extrabold text-amber-700 dark:text-amber-400 text-sm">Cons &amp; Opportunity Costs of 20% Down</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 font-normal">
              <li>Depletes liquid cash reserves and emergency safety nets</li>
              <li>Delaying purchase while saving can expose buyers to market price shifts</li>
              <li>Opportunity cost of allocating capital away from other diversified investment assets</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: LOAN PROGRAM COMPARISON MATRIX TABLE */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg sm:text-xl">
          <Calculator className="h-6 w-6" />
          <h2>4. Mortgage Programs &amp; Minimum Down Payment Requirements</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Loan Program</th>
                <th className="p-3">Min Down %</th>
                <th className="p-3">Min Credit Score</th>
                <th className="p-3">Mortgage Insurance Rules</th>
                <th className="p-3 rounded-tr-xl">Upfront Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              <tr>
                <td className="p-3 font-bold text-blue-600">Conventional 97</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">3.0%</td>
                <td className="p-3">620</td>
                <td className="p-3 text-emerald-600 font-bold">Cancels at 78%–80% LTV</td>
                <td className="p-3">$0</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">FHA Loan</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">3.5%</td>
                <td className="p-3">580</td>
                <td className="p-3 text-red-500 font-bold">Life of Loan (if &lt;10% down)</td>
                <td className="p-3 text-amber-600">1.75% UFMIP</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600">VA Loan (Veteran)</td>
                <td className="p-3 font-bold text-emerald-600">0.0%</td>
                <td className="p-3">580+ (Lender)</td>
                <td className="p-3 text-emerald-600 font-bold">$0 Monthly PMI Benefit!</td>
                <td className="p-3 text-amber-600">1.4%–2.15% Funding Fee</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">USDA Rural</td>
                <td className="p-3 font-bold text-emerald-600">0.0%</td>
                <td className="p-3">640</td>
                <td className="p-3 text-amber-600">0.35% Annual Guarantee Fee</td>
                <td className="p-3 text-amber-600">1.0% Guarantee Fee</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 5: PMI REMOVAL GUIDELINES */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg sm:text-xl">
          <ShieldCheck className="h-6 w-6" />
          <h2>5. Private Mortgage Insurance (PMI) &amp; How to Remove It (80% vs. 78% LTV)</h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Federal protections under the <strong>Homeowners Protection Act of 1998</strong> dictate when Private Mortgage Insurance (PMI) on conventional loans must be cancelled:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">80% LTV Borrower Cancellation Request</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              When your principal balance drops to 80% of the original purchase price or appraised value, you have the right to submit a written cancellation request to your loan servicer.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">78% LTV Automatic Lender Termination</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Lenders are legally required to automatically terminate PMI once your loan balance reaches 78% of original value based on the scheduled amortization table.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: DOWN PAYMENT ASSISTANCE */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg sm:text-xl">
          <Percent className="h-6 w-6" />
          <h2>6. Down Payment Assistance (DPA) Programs</h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Numerous state, county, and municipal Down Payment Assistance (DPA) programs exist across the U.S. to help qualified buyers cover upfront cash needs:
        </p>
        <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1 font-medium">
          <li><strong>DPA Grants:</strong> Outright gift funds that never require repayment.</li>
          <li><strong>Forgivable 2nd Loans:</strong> Zero-interest secondary liens forgiven after residing in the property for a specified period (typically 3 to 5 years).</li>
          <li><strong>Deferred Payment Loans:</strong> Second liens with 0% interest repaid when the home is sold, refinanced, or the first mortgage is satisfied.</li>
        </ul>
      </section>

      {/* SECTION 7: FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg sm:text-xl">
          <HelpCircle className="h-6 w-6" />
          <h2>7. Frequently Asked Questions (FAQ)</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Explore essential answers to common questions about mortgage down payments, loan programs, and PMI requirements.
        </p>

        <div className="space-y-3 pt-2">
          {downPaymentFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/20">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 8: SUMMARY */}
      <section className="p-6 sm:p-8 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-3 text-xs sm:text-sm">
        <h3 className="font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          8. Educational Key Takeaways
        </h3>
        <ul className="space-y-2 text-slate-700 dark:text-slate-300 list-disc pl-5 leading-relaxed">
          <li><strong>20% Is Not Mandatory:</strong> Conventional 97 (3%), FHA (3.5%), and VA/USDA (0%) offer viable paths to homeownership.</li>
          <li><strong>PMI Removal Milestone:</strong> Conventional loan PMI is cancellable at 80% LTV by request and cancels automatically at 78% LTV.</li>
          <li><strong>Upfront Cash to Close:</strong> Remember to reserve 2% to 5% of purchase price for closing costs on top of the down payment.</li>
          <li><strong>Liquidity vs Down Payment:</strong> Avoid depleting all emergency cash reserves just to reach a higher down payment tier.</li>
        </ul>
      </section>
    </div>
  );
}

export default DownPaymentContent;

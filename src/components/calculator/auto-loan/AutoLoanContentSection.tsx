"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, BookOpen, Calculator, CheckCircle2, ArrowRight } from "lucide-react";
import AUTO_LOAN_CALCULATOR from "@/calculators/finance/auto-loan";

export function AutoLoanContentSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = AUTO_LOAN_CALCULATOR.faqs || [];

  const relatedCalculators = [
    { name: "Mortgage Calculator", href: "/calculators/mortgage-calculator", desc: "Estimate home payments and interest" },
    { name: "Loan Calculator", href: "/calculators/loan-calculator", desc: "General amortized loan payment analysis" },
    { name: "EMI Calculator", href: "/calculators/emi-calculator", desc: "Equal monthly installment schedule" },
    { name: "Amortization Calculator", href: "/calculators/amortization-calculator", desc: "Full debt reduction schedule" },
    { name: "Mortgage Payoff Calculator", href: "/calculators/mortgage-payoff-calculator", desc: "Accelerate home payoff timelines" },
    { name: "Refinance Calculator", href: "/calculators/refinance-calculator", desc: "Evaluate rate reduction savings" },
    { name: "Personal Loan Calculator", href: "/calculators/personal-loan-calculator", desc: "Unsecured loan borrowing analysis" },
    { name: "Debt Payoff Calculator", href: "/calculators/debt-payoff-calculator", desc: "Consolidate or snowball debt balances" },
  ];

  return (
    <div className="space-y-8 mt-8">
      {/* ==========================================
          SECTION 11: SEO EDUCATIONAL GUIDE (11 PARTS)
         ========================================== */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-8 text-zinc-800 dark:text-zinc-200">
        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              The Complete Guide to Auto Financing & Vehicle Loans
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Master car loan math, interest rates, trade-in credit rules, and vehicle affordability strategies.
            </p>
          </div>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-xs sm:text-sm leading-relaxed">
          {/* Guide 1 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              1. What Is An Auto Loan?
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300">
              An auto loan is a secured loan used specifically to purchase a car, truck, SUV, or motorcycle. The financial institution (bank, credit union, or online lender) provides the upfront capital to buy the vehicle from a dealer or private seller. In exchange, the borrower agrees to repay the loan principal plus interest over a set term ranging from 24 to 84 months.
            </p>
            <p className="text-zinc-600 dark:text-zinc-300 mt-2">
              Because auto loans are secured by the vehicle itself, the lender holds the vehicle title as collateral. If the borrower defaults on monthly payments, the lender has the legal right to repossess the car.
            </p>
          </div>

          {/* Guide 2 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              2. How Auto Financing Works
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300">
              Auto loan financing consists of four core elements:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-1 text-zinc-600 dark:text-zinc-300">
              <li><strong>Vehicle Purchase Price:</strong> The negotiated sticker price of the car before taxes and fees.</li>
              <li><strong>Net Financed Amount:</strong> Vehicle price minus down payment and trade-in equity, plus state sales tax and dealer fees.</li>
              <li><strong>Annual Percentage Rate (APR):</strong> The interest rate charged annually by the lender on the remaining principal balance.</li>
              <li><strong>Loan Term (Duration):</strong> The time allowed to repay the debt, typically measured in 12-month increments (36, 48, 60, 72, or 84 months).</li>
            </ul>
          </div>

          {/* Guide 3 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              3. Dealer Financing vs Bank Financing
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300">
              Car buyers can choose between direct lending (banks, credit unions, online auto lenders) and indirect dealership financing:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <div className="bg-zinc-50 dark:bg-zinc-950 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <h4 className="font-bold text-xs text-blue-600 dark:text-blue-400 mb-1">Direct Bank / Credit Union Financing</h4>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                  Pre-approvals from your local credit union or bank give you competitive interest rate leverage before stepping onto the dealership lot. You enter negotiations knowing your exact budget.
                </p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-950 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <h4 className="font-bold text-xs text-blue-600 dark:text-blue-400 mb-1">Dealership Financing</h4>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                  Dealers access network financing and captive manufacturer lenders (e.g., Toyota Financial). While convenient, dealers may mark up interest rates by 1–2% above wholesale approval rates.
                </p>
              </div>
            </div>
          </div>

          {/* Guide 4 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              4. How Auto Loan Interest Works
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300">
              Auto loan interest is calculated using simple daily interest amortized over your chosen term. In the early months of the loan, a larger portion of your monthly payment goes toward interest charges. As the principal balance declines over time, a greater percentage of each payment directly reduces the remaining loan balance.
            </p>
          </div>

          {/* Guide 5 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              5. Understanding Trade-In Value & State Tax Credits
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300">
              Trading in your current vehicle can significantly lower your new loan balance. In 42 US states, trade-in value provides a sales tax credit:
            </p>
            <div className="bg-blue-50 dark:bg-blue-950/40 p-3.5 rounded-lg border border-blue-100 dark:border-blue-900/50 mt-2 text-xs text-blue-900 dark:text-blue-200">
              <strong>Example Trade-In Tax Savings:</strong> If you buy a $40,000 car with a 6% sales tax rate and trade in a vehicle worth $15,000 in a tax-credit state (e.g., Texas or Florida), sales tax is calculated only on the $25,000 difference ($1,500 tax instead of $2,400 tax), saving you $900 instantly.
            </div>
          </div>

          {/* Guide 6 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              6. How Down Payments Affect Auto Loans
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300">
              New vehicles depreciate roughly 20% in their first year of ownership. A substantial down payment (ideally 20% down on new cars, 10% on used cars) cushions against initial depreciation and protects you from going underwater on your loan.
            </p>
          </div>

          {/* Guide 7 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              7. Lease vs Buy Comparison
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300">
              Leasing involves renting a vehicle for 24 to 36 months, paying only for the vehicle's projected depreciation. Buying builds equity in an asset that you own free and clear once the loan is paid off.
            </p>
          </div>

          {/* Guide 8 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              8. How Credit Scores Affect Loan Rates
            </h3>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs border border-zinc-200 dark:border-zinc-800 rounded-lg">
                <thead className="bg-zinc-100 dark:bg-zinc-950 font-bold">
                  <tr>
                    <th className="p-2 border-b">Credit Tier</th>
                    <th className="p-2 border-b">FICO Score Range</th>
                    <th className="p-2 border-b">Avg New Car APR</th>
                    <th className="p-2 border-b">Avg Used Car APR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  <tr>
                    <td className="p-2 font-semibold text-emerald-600">Super Prime</td>
                    <td className="p-2">781 - 850</td>
                    <td className="p-2 font-mono">5.25%</td>
                    <td className="p-2 font-mono">6.75%</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-blue-600">Prime</td>
                    <td className="p-2">661 - 780</td>
                    <td className="p-2 font-mono">6.45%</td>
                    <td className="p-2 font-mono">8.75%</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-amber-600">Non-Prime</td>
                    <td className="p-2">601 - 660</td>
                    <td className="p-2 font-mono">9.60%</td>
                    <td className="p-2 font-mono">13.25%</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-rose-600">Subprime</td>
                    <td className="p-2">300 - 600</td>
                    <td className="p-2 font-mono">14.50%+</td>
                    <td className="p-2 font-mono">21.00%+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Guide 9 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              9. Tips For Lower Monthly Payments
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-300">
              <li>Increase your upfront cash down payment or trade-in allowance.</li>
              <li>Obtain credit union pre-approval before shopping at dealerships.</li>
              <li>Choose a 60-month loan term instead of 72 or 84 months.</li>
              <li>Opt for a slightly newer used vehicle (1–2 years old) to avoid major initial depreciation.</li>
            </ul>
          </div>

          {/* Guide 10 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              10. Should You Pay Off Your Auto Loan Early?
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300">
              Paying off an auto loan early eliminates monthly debt commitments and saves interest. Most standard auto loans carry no prepayment penalties. However, if your auto loan interest rate is exceptionally low (e.g. 0% to 2.9%), investing spare cash in high-yield savings or index funds may yield higher returns than early loan payoff.
            </p>
          </div>

          {/* Guide 11 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              11. Common Auto Loan Mistakes To Avoid
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 rounded-lg text-rose-900 dark:text-rose-200 text-xs">
                <strong>Mistake 1: Focusing Only On Monthly Payment</strong>
                <p className="mt-1 opacity-90 text-[11px]">
                  Dealers can stretch terms to 84 months to meet target monthly payments while secretly adding thousands in total interest.
                </p>
              </div>
              <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 rounded-lg text-rose-900 dark:text-rose-200 text-xs">
                <strong>Mistake 2: Rolling Over Negative Equity</strong>
                <p className="mt-1 opacity-90 text-[11px]">
                  Rolling an upside-down balance into a new car loan compounds debt and severely damages long-term vehicle equity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 12: FAQ ACCORDION WITH JSON-LD SCHEMA
         ========================================== */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Expert answers to common car financing, trade-in, and interest rate questions.
            </p>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={`faq-${idx}`} className="py-3.5">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left focus-visible:outline-none cursor-pointer group"
                >
                  <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed pr-6 bg-zinc-50 dark:bg-zinc-950 p-3.5 rounded-lg border border-zinc-100 dark:border-zinc-800">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ==========================================
          SECTION 13: RELATED CALCULATORS GRID
         ========================================== */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              Related Financial Calculators
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Explore complementary borrowing, mortgage, and refinancing tools.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {relatedCalculators.map((calc, i) => (
            <Link
              key={`rel-${i}`}
              href={calc.href}
              className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 hover:border-blue-200 dark:hover:border-blue-900/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {calc.name}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                {calc.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

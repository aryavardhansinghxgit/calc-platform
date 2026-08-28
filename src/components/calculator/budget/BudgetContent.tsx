"use client";

import React, { useState } from "react";
import {
  BookOpen,
  PieChart,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  Calculator,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Scale,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { BUDGET_CALCULATOR } from "@/calculators/finance/budget";

export function BudgetContent() {
  const faqs = BUDGET_CALCULATOR.faqs || [];

  // All FAQs open by default (matching 401(k) standard)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: faqs.length }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. EXPANDED MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is a Budget Calculator?
          </h2>
          <p>
            A budget calculator helps organize income, expenses, debt payments, and savings into a consistent monthly view. Instead of looking at individual bills separately, you can compare total after-tax income with total spending and see whether the budget produces a surplus or deficit.
          </p>
          <p>
            This calculator also supports multiple income streams, annual or monthly expense frequencies, category breakdowns, a 50/30/20 benchmark comparison, a debt-to-income (DTI) indicator, and hypothetical income or expense stress scenarios.
          </p>
          <p>
            The result is a planning estimate based on the values and assumptions entered. Actual taxes, household costs, lender requirements, and financial circumstances can differ.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How This Budget Calculator Calculates Take-Home Income
          </h2>
          <p>
            The calculator first annualizes the income entries and combines them into gross annual income. It then applies the entered effective tax rate as a simplified planning assumption:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm space-y-1">
            <div>After-Tax Annual Income = Gross Annual Income &times; (1 &minus; Effective Tax Rate)</div>
            <div className="text-blue-600 dark:text-blue-400 font-bold pt-1">
              Monthly After-Tax Income = After-Tax Annual Income &divide; 12
            </div>
          </div>
          <p>
            For the calculator&apos;s example case, $83,000 of salary plus $1,000 of investment income and $2,000 of other income produces $86,000 of gross annual income. With a 28% effective tax assumption, modeled after-tax income is $61,920 annually, or $5,160 per month.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            This is not a federal, state, or local tax calculation. It does not model tax brackets, deductions, credits, payroll taxes, filing status, or every type of pre-tax deduction.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Monthly vs. Annual Budgeting
          </h2>
          <p>
            Budget inputs can be entered using supported monthly or annual frequencies. The calculator annualizes the values before aggregating them, which keeps a $1,000 monthly expense equivalent to $12,000 annually.
          </p>
          <p>
            This is useful for expenses that do not occur monthly, such as annual insurance, property taxes, gifts, travel, tuition, or vehicle maintenance.
          </p>
          <p>
            For planning purposes, converting irregular expenses into a monthly reserve can make the recurring budget more realistic. The calculator keeps the underlying precision during calculations and rounds displayed currency values for presentation.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Understanding a Budget Surplus or Deficit
          </h2>
          <p>
            Net monthly cash flow is calculated as:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            Net Cash Flow = After-Tax Monthly Income &minus; Total Monthly Expenses
          </div>
          <p>
            A positive number is a modeled surplus. A negative number is a modeled deficit. For the baseline example, after-tax income is $5,160 per month and modeled expenses are $5,220 per month, producing a $60 monthly deficit ($720 annually).
          </p>
          <p>
            A deficit does not necessarily identify one specific cause. It means the entered spending plan exceeds modeled after-tax income under the selected assumptions. Reviewing the category breakdown can help identify whether the gap comes from housing, debt, transportation, discretionary spending, or savings allocations.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. What the 50/30/20 Budget Framework Means
          </h2>
          <p>
            The 50/30/20 framework is a budgeting benchmark that allocates after-tax income among needs, wants, and savings/debt:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs">50% for Needs</strong>
              <p className="text-slate-600 dark:text-slate-400">Core housing, utilities, groceries, healthcare, debt service, and essential transport.</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs">30% for Wants</strong>
              <p className="text-slate-600 dark:text-slate-400">Dining out, entertainment, travel, hobbies, subscriptions, and discretionary shopping.</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs">20% for Savings &amp; Debt</strong>
              <p className="text-slate-600 dark:text-slate-400">Emergency fund contributions, retirement savings, investments, and extra debt paydown.</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            The CFPB has used the 50/30/20 rule in financial-education materials. The framework is a starting point rather than a universal requirement; housing costs, household size, debt, income volatility, location, and financial goals can make another allocation more appropriate.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Needs, Wants, and Savings/Debt Categories
          </h2>
          <p>
            The calculator uses a fixed category mapping so that its 50/30/20 comparison is reproducible:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-xs">
            <li><strong>Needs:</strong> Core housing and utilities, transportation, debt service, healthcare, childcare/tuition, groceries, and household supplies.</li>
            <li><strong>Wants:</strong> Discretionary dining, clothing, hobbies, entertainment, travel, pets, gifts, and other discretionary living costs.</li>
            <li><strong>Savings / Debt:</strong> Emergency reserves, investments, 401(k)/IRA contributions, and extra debt principal payments.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Debt-to-Income (DTI) Ratios in Personal Budgeting
          </h2>
          <p>
            Debt-to-Income (DTI) compares debt payments with gross monthly income:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 text-xs font-mono">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block font-sans">Front-End DTI (Housing Ratio)</strong>
              Housing Costs &divide; Gross Monthly Income
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block font-sans">Back-End DTI (Total Debt Ratio)</strong>
              Total Debt Obligations &divide; Gross Monthly Income
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            For the baseline example, with $7,166.67 gross monthly income ($86,000 annual), $1,800 monthly rent produces a 25.12% front-end DTI, while $2,450 total qualifying debt produces a 34.19% back-end DTI.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. How Mortgage Lenders and the CFPB View DTI
          </h2>
          <p>
            Lenders frequently use DTI as an underwriting threshold when evaluating mortgage, personal loan, or auto loan applications.
          </p>
          <p>
            The CFPB has noted that a 43% DTI ratio was historically an important threshold for Qualified Mortgages, while emphasizing that lenders evaluate additional factors such as credit history, assets, loan type, and down payment.
          </p>
          <p>
            The calculator&apos;s DTI indicators are budgeting approximations based on user-entered values. They do not constitute a credit check or loan pre-approval.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Budget Stress Testing
          </h2>
          <p>
            A budget that works under normal conditions can become strained when income drops or expenses rise. The calculator&apos;s stress test models hypothetical scenarios such as:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-xs">
            <li>A 5% to 20% income reduction (job change, reduced hours, loss of overtime).</li>
            <li>A 3% to 10% expense inflation increase (rising food, utility, or insurance costs).</li>
          </ul>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Testing those scenarios can show whether the household has sufficient buffer to absorb unexpected shocks without relying on high-interest credit card debt.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Zero-Based Budgeting vs. 50/30/20
          </h2>
          <p>
            The 50/30/20 framework uses broad target categories, while zero-based budgeting assigns a purpose to every dollar so that planned income minus planned allocations reaches zero. Neither framework is universally superior.
          </p>
          <p>
            A practical budget can combine both approaches: use broad 50/30/20 allocation targets for a high-level check, then use detailed category tracking to identify where money is actually going.
          </p>
        </section>

        {/* Section 11: Related Calculators (Clean 8-Card Grid) */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Related Financial &amp; Debt Calculators
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Explore these companion planning tools to model debt reduction, loan payments, and income strategies:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <Link
              href="/calculators/loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Loan Calculator</span>
              <span className="text-slate-500 text-[11px]">Model loan payments &amp; interest.</span>
            </Link>
            <Link
              href="/calculators/personal-loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Personal Loan</span>
              <span className="text-slate-500 text-[11px]">Compare personal debt options.</span>
            </Link>
            <Link
              href="/calculators/debt-payoff-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Debt Payoff</span>
              <span className="text-slate-500 text-[11px]">Snowball &amp; avalanche debt strategies.</span>
            </Link>
            <Link
              href="/calculators/credit-card-payoff-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Credit Card Payoff</span>
              <span className="text-slate-500 text-[11px]">Eliminate revolving card balances.</span>
            </Link>
            <Link
              href="/calculators/student-loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Student Loan</span>
              <span className="text-slate-500 text-[11px]">Repayment plans &amp; interest costs.</span>
            </Link>
            <Link
              href="/calculators/refinance-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Refinance Calculator</span>
              <span className="text-slate-500 text-[11px]">Evaluate refinancing savings.</span>
            </Link>
            <Link
              href="/calculators/salary-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Salary Calculator</span>
              <span className="text-slate-500 text-[11px]">Convert wages to annual income.</span>
            </Link>
            <Link
              href="/calculators/take-home-pay-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Take-Home Pay</span>
              <span className="text-slate-500 text-[11px]">Estimate net paycheck deductions.</span>
            </Link>
          </div>
        </section>

        {/* Section 12: Methodology & Financial Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Calculation Methodology &amp; Disclaimers
          </h2>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              Planning &amp; Tax Notice
            </div>
            <p>
              This calculator provides budgeting estimates based on user-entered assumptions. Its tax calculation is a simplified effective-rate model and is not a tax return or estimate of actual federal, state, or local tax liability. DTI results are planning indicators and are not lender approval determinations. The 50/30/20 framework is a budgeting benchmark rather than a universal financial rule. This tool does not provide individualized legal, tax, investment, or financial advice.
            </p>
          </div>
        </section>
      </div>

      {/* 2. FAQ SECTION (Single Clean Accordion Block, Open by Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default BudgetContent;

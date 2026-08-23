"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { HOUSE_AFFORDABILITY_CALCULATOR } from "@/calculators/finance/house-affordability";

export function HouseAffordabilityContentSection() {
  // All 12 FAQs open by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 12 }, (_, i) => i))
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

  const faqs = HOUSE_AFFORDABILITY_CALCULATOR.faqs || [];

  return (
    <div className="space-y-8 py-2 text-zinc-700 dark:text-zinc-300">
      {/* 1. SINGLE CANONICAL RELATED CALCULATORS BLOCK (Exactly 7 Verified Live Routes) */}
      <section className="space-y-3 pt-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Related Home Buying &amp; Mortgage Calculators
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/calculators/mortgage-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Mortgage Calculator
          </Link>
          <Link
            href="/calculators/refinance-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Refinance Calculator
          </Link>
          <Link
            href="/calculators/down-payment-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Down Payment Calculator
          </Link>
          <Link
            href="/calculators/rent-vs-buy-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Rent vs Buy Calculator
          </Link>
          <Link
            href="/calculators/dti-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            DTI Calculator
          </Link>
          <Link
            href="/calculators/amortization-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Amortization Calculator
          </Link>
          <Link
            href="/calculators/fha-loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            FHA Loan Calculator
          </Link>
        </div>
      </section>

      {/* 2. 12 MAIN EDUCATIONAL SECTIONS */}
      <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-900 dark:text-slate-100">
        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is House Affordability?
          </h2>
          <p>
            House affordability is an estimate of the purchase price and mortgage amount supported by the income, debt, down-payment, interest-rate, term, and housing-cost assumptions entered into the calculator. A lender&apos;s qualification amount and a household&apos;s comfortable spending limit are not necessarily the same. The calculator focuses on the mathematical relationship between income, qualifying debt and recurring housing costs. It should therefore be used to compare scenarios rather than treated as an approval amount.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How the Income-Based Affordability Mode Works
          </h2>
          <p>
            The income-based mode converts annual household income into gross monthly income and applies the selected front-end and back-end DTI framework. The front-end ceiling is gross monthly income multiplied by the selected housing ratio. The back-end ceiling is gross monthly income multiplied by the selected total-debt ratio, less existing monthly debt. The engine uses the lower of those two housing ceilings, then solves backward for the mortgage principal and purchase price. In the validated baseline, $120,000 annual income gives $10,000 gross monthly income, a $2,800 front-end ceiling, and $3,100 of back-end housing capacity after $500 of existing debt, so the front-end ceiling controls the result.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. How the Monthly Mortgage Payment Is Calculated
          </h2>
          <p>
            For a fixed-rate mortgage, the calculator uses standard amortization. With principal P, monthly rate r and n monthly payments, {"PMT = P × [r(1+r)^n / ((1+r)^n - 1)]"}. The engine keeps full numerical precision internally and rounds only for presentation. This means the displayed monthly payment may not reproduce the lifetime totals if a user multiplies the rounded display value manually. The validated baseline of $325,114.63 at 6.5% over 30 years produces a modeled principal-and-interest payment of about $2,054.95 per month. Explore detailed loan scenarios with our{" "}
            <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Mortgage Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Front-End vs. Back-End DTI
          </h2>
          <p>
            Front-end DTI measures qualifying housing expense relative to gross monthly income. Back-end DTI adds other qualifying debt payments to the housing expense before dividing by gross monthly income. The calculator uses the selected DTI framework as a planning model, not as a universal underwriting rule. Actual underwriting can consider credit history, reserves, loan-to-value, occupancy, automated underwriting results and other factors. Current Fannie Mae guidance illustrates that applicable DTI limits can vary by underwriting path and borrower circumstances.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Conventional 28/36, FHA 31/43 and VA 41%
          </h2>
          <p>
            The calculator can model commonly used DTI frameworks, but the percentages must not be interpreted as universal approval limits. A 28/36 framework can be used as a conservative planning benchmark. FHA&apos;s 31/43 ratios apply to specified manual-underwriting scenarios, while automated FHA underwriting can produce different outcomes. VA uses 41% as a DTI review threshold rather than a standalone approval cutoff, with residual income and other underwriting considerations also relevant.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Property Taxes, Insurance, HOA Fees and Maintenance
          </h2>
          <p>
            A purchase price that looks affordable from principal and interest alone can become less affordable once recurring ownership costs are included. The calculator can model property taxes, homeowners insurance, HOA fees and maintenance. In budget-based mode, these costs are included in the monthly affordability ceiling. The maintenance input is a planning assumption rather than an official lender requirement, and actual maintenance costs vary substantially by property age, condition, location, size and systems.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. How the Budget-Based Mode Works
          </h2>
          <p>
            The budget-based mode starts with a target monthly housing budget and solves backward for the home price whose modeled principal and interest, property taxes, homeowners insurance, HOA fees and maintenance reserve fit inside that budget. For the validated example, a $3,500 monthly budget, 6.5% rate, 30-year term, 20% down, 1.2% property tax, 0.5% insurance, 0.5% HOA and 1% maintenance produce a $453,179.39 home price and a $3,500 total modeled monthly outflow. This mode can be useful when a household begins with a monthly comfort limit instead of a lender-style income ratio. Compare different loan amounts using our{" "}
            <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Mortgage Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. How Down Payment and Mortgage Insurance Affect Affordability
          </h2>
          <p>
            A larger down payment reduces the amount financed for a given purchase price and can reduce the principal-and-interest payment. It can also change mortgage-insurance requirements and sometimes pricing, depending on the loan type and lender. A 20% down payment can avoid certain conventional PMI requirements, but mortgage-insurance rules differ across conventional, FHA and other programs. The calculator therefore treats down payment as a mathematical financing input rather than a guarantee of a particular insurance outcome. Plan your target down payment with our{" "}
            <Link href="/calculators/down-payment-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Down Payment Calculator
            </Link>{" "}
            or evaluate FHA mortgage options with our{" "}
            <Link href="/calculators/fha-loan-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              FHA Loan Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. What Lenders Consider Beyond DTI
          </h2>
          <p>
            DTI is only one component of mortgage underwriting. Lenders may verify income, employment, credit history, assets and reserves, evaluate loan-to-value and occupancy, and apply program-specific underwriting rules. Automated underwriting systems may also reach different conclusions than a simple ratio test. For that reason, an affordability result can differ from a lender&apos;s actual preapproval amount and should not be presented as a final borrowing limit. Model your overall debt obligations with our{" "}
            <Link href="/calculators/dti-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              DTI Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Closing Costs and Other Upfront Homebuying Costs
          </h2>
          <p>
            The down payment is not the only cash required to buy a home. Closing costs can include lender fees, appraisal, title and recording charges, prepaid taxes and insurance, points, and other transaction expenses. The CFPB notes that closing costs vary by transaction and that a rough early planning estimate can be useful, but the final amount depends on the loan, lender, property, location and services selected. The calculator should therefore be used alongside an actual Loan Estimate when one is available. See how principal paydown progresses over time with our{" "}
            <Link href="/calculators/amortization-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Amortization Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Why Your Affordable Price May Be Lower Than a Lender&apos;s Maximum
          </h2>
          <p>
            A household may choose to spend less than the maximum supported by a lender or by this calculator. Savings goals, emergency reserves, childcare, transportation, repairs, utilities, travel and other personal priorities can make a lower housing budget more appropriate. The CFPB encourages consumers to compare the total cost of homeownership with the rest of their budget rather than focusing only on what a lender might approve. For existing homeowners evaluating refinancing options, try our{" "}
            <Link href="/calculators/refinance-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Refinance Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Calculation Methodology and Disclaimer
          </h2>
          <p>
            Income mode calculates an allowable housing ceiling from the selected DTI framework and existing debt, then solves backward through fixed-rate mortgage amortization and annualized housing-cost assumptions. Budget mode solves backward from a fixed monthly housing budget. Property taxes, insurance, HOA and maintenance are modeled as annual percentages of the home price and converted to monthly amounts when those inputs are enabled. Results are estimates based on user-entered assumptions. They are not lender preapproval, underwriting, legal or tax advice, and they do not guarantee that a household will find, qualify for, or comfortably sustain the resulting mortgage.
          </p>
        </section>
      </div>

      {/* 3. FAQ SECTION (12 Approved FAQs, Open by Default) */}
      <section className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. METHODOLOGY & FINANCIAL DISCLAIMER CARDS */}
      <section className="space-y-4 pt-4">
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2 text-xs leading-relaxed text-slate-800 dark:text-slate-200">
          <div className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 text-xs uppercase tracking-wider">
            <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            Methodology
          </div>
          <p>
            Income mode uses the selected DTI ceilings to establish a maximum monthly housing amount, then solves backward through fixed-rate amortization and recurring housing-cost assumptions. Budget mode solves backward from a fixed monthly housing budget. The engine uses full numerical precision internally and rounds displayed currency values for presentation.
          </p>
        </div>

        <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl space-y-2 text-xs leading-relaxed text-amber-900 dark:text-amber-200">
          <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 text-xs uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            Financial &amp; Underwriting Disclaimer
          </div>
          <p>
            This calculator provides estimates from user-entered assumptions. It is not a lender preapproval system, underwriting engine, legal or tax service, or individualized financial advice. Actual mortgage eligibility, rates, DTI treatment, mortgage insurance, taxes, insurance, HOA fees, closing costs and maintenance expenses can differ.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HouseAffordabilityContentSection;

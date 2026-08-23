"use client";

import React, { useState } from "react";
import {
  BookOpen,
  PieChart,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { BUDGET_CALCULATOR } from "@/calculators/finance/budget";

export function BudgetContent() {
  // All 20 FAQs open by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 20 }, (_, i) => i))
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

  const faqs = BUDGET_CALCULATOR.faqs || [];

  return (
    <div className="space-y-10 mt-6 text-zinc-800 dark:text-zinc-200">
      {/* 1. RELATED CALCULATORS BLOCK (Exactly 7 Verified Active Routes) */}
      <section className="space-y-3 pt-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Related Financial &amp; Debt Calculators
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/calculators/loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Loan Calculator
          </Link>
          <Link
            href="/calculators/personal-loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Personal Loan Calculator
          </Link>
          <Link
            href="/calculators/debt-payoff-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Debt Payoff Calculator
          </Link>
          <Link
            href="/calculators/credit-card-payoff-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Credit Card Payoff Calculator
          </Link>
          <Link
            href="/calculators/student-loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Student Loan Calculator
          </Link>
          <Link
            href="/calculators/refinance-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Refinance Calculator
          </Link>
          <Link
            href="/calculators/credit-card-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Credit Card Calculator
          </Link>
        </div>
      </section>

      {/* 2. 15 EDUCATIONAL SECTIONS */}
      <div className="space-y-8 text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed pt-2">
        {/* Section 1 */}
        <section className="space-y-2">
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
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How This Budget Calculator Calculates Take-Home Income
          </h2>
          <p>
            The calculator first annualizes the income entries and combines them into gross annual income. It then applies the entered effective tax rate as a simplified planning assumption:
          </p>
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border font-mono text-xs space-y-1">
            <div>After-tax annual income = Gross annual income × (1 − effective tax rate)</div>
            <div className="pt-1">Monthly after-tax income is:</div>
            <div className="text-blue-600 dark:text-blue-400 font-bold">After-tax annual income ÷ 12</div>
          </div>
          <p>
            For the calculator&apos;s example case, $83,000 of salary plus $1,000 of investment income and $2,000 of other income produces $86,000 of gross annual income. With a 28% effective tax assumption, modeled after-tax income is $61,920 annually, or $5,160 per month.
          </p>
          <p>
            This is not a federal, state, or local tax calculation. It does not model tax brackets, deductions, credits, payroll taxes, filing status, or every type of pre-tax deduction.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
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
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Understanding a Budget Surplus or Deficit
          </h2>
          <p>
            Net monthly cash flow is:
          </p>
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border font-mono text-xs">
            <div>After-tax monthly income − total monthly expenses</div>
          </div>
          <p>
            A positive number is a modeled surplus. A negative number is a modeled deficit.
          </p>
          <p>
            For the calculator&apos;s baseline example, after-tax income is $5,160 per month and modeled expenses are $5,220 per month, producing a $60 monthly deficit, or $720 annually.
          </p>
          <p>
            A deficit does not necessarily identify one specific cause. It means the entered spending plan exceeds modeled after-tax income under the selected assumptions. Reviewing the category breakdown can help identify whether the gap comes from housing, debt, transportation, discretionary spending, or savings allocations.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. What the 50/30/20 Budget Framework Means
          </h2>
          <p>
            The 50/30/20 framework is a budgeting benchmark that allocates after-tax income among needs, wants, and savings/debt.
          </p>
          <p>
            The common framework uses:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><strong>50%</strong> for needs</li>
            <li><strong>30%</strong> for wants</li>
            <li><strong>20%</strong> for savings and debt repayment</li>
          </ul>
          <p>
            The CFPB has used the 50/30/20 rule in financial-education materials, while also describing budgeting as a way to balance needs, wants, and saving goals.
          </p>
          <p>
            The framework is a starting point rather than a universal requirement. Housing costs, household size, debt, income volatility, location, and financial goals can make another allocation more appropriate.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Needs, Wants, and Savings/Debt Categories
          </h2>
          <p>
            The calculator uses a fixed category mapping so that its 50/30/20 comparison is reproducible.
          </p>
          <p>
            <strong>Needs</strong> include core housing and utilities, transportation, debt service, healthcare, childcare/tuition, groceries, and household supplies.
          </p>
          <p>
            <strong>Wants</strong> include discretionary dining, clothing, hobbies, entertainment, travel, pets, gifts, and other discretionary living costs.
          </p>
          <p>
            <strong>Savings</strong> includes retirement contributions, college savings, taxable investments, and an emergency-fund allocation.
          </p>
          <p>
            Debt payments can appear in the savings/debt bucket for the benchmark comparison. This does not mean debt repayment is literally the same as cash savings; it means both are treated as uses of the 20% planning bucket in this framework.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Debt-to-Income (DTI) Ratio in a Personal Budget
          </h2>
          <p>
            DTI measures certain monthly debt or housing obligations relative to gross monthly income:
          </p>
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border font-mono text-xs">
            <div>DTI = qualifying monthly obligations ÷ gross monthly income × 100</div>
          </div>
          <p>
            The calculator reports a front-end housing indicator and a back-end debt indicator.
          </p>
          <p>
            These ratios can be useful for understanding how much gross income is committed to housing and qualifying debt, but the calculator&apos;s DTI is not a lender approval decision.
          </p>
          <p>
            Mortgage underwriting standards vary by loan program, lender, borrower profile, and underwriting method. For example, Fannie Mae&apos;s current Selling Guide gives different DTI limits depending on underwriting circumstances, including 36%, 45%, and up to 50% in specified cases.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Front-End vs. Back-End DTI
          </h2>
          <p>
            The calculator&apos;s front-end housing indicator uses housing-related obligations such as rent or mortgage payment, property tax, applicable insurance, and HOA/co-op charges.
          </p>
          <p>
            The back-end indicator adds qualifying debt payments such as auto loans, credit card payments, student loans, and other debt liabilities.
          </p>
          <p>
            Non-debt household spending such as groceries, entertainment, and travel is not treated as debt for the back-end DTI calculation.
          </p>
          <p>
            This distinction matters because a household can have high total spending without having a high debt ratio, or vice versa.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Using the Expense Breakdown
          </h2>
          <p>
            The Breakdown view converts every entered expense into annual and monthly amounts and displays its share of the selected income base.
          </p>
          <p>
            Use this view to find the categories with the largest financial impact rather than focusing only on small discretionary purchases.
          </p>
          <p>
            Annual expenses can be particularly useful to review because irregular costs can otherwise be easy to overlook. Insurance, maintenance, taxes, tuition, gifts, and travel can all create large annual obligations even when their monthly cash impact is not immediately visible.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Budget Stress Testing
          </h2>
          <p>
            The Stress Test module is a sensitivity analysis, not a forecast.
          </p>
          <p>
            It models two hypothetical shocks:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><strong>Income Reduction Shock:</strong> Reduces modeled monthly after-tax income by the selected percentage.</li>
            <li><strong>Expense Inflation Surge:</strong> Increases modeled monthly expenses by the selected percentage.</li>
          </ul>
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border font-mono text-xs">
            <div>Stressed surplus = Net monthly income × (1 − income shock) − Total monthly expenses × (1 + expense inflation)</div>
          </div>
          <p>
            At 0% income shock and 0% expense inflation, the result should equal the baseline budget.
          </p>
          <p>
            The stress test is useful for asking questions such as whether a small income reduction would turn a surplus into a deficit or whether a rise in selected spending assumptions would materially change available cash flow.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. How to Budget with Irregular Income or Expenses
          </h2>
          <p>
            When income varies, a conservative budget can start from a lower or more predictable income level rather than assuming the strongest month will continue.
          </p>
          <p>
            For irregular expenses, convert the expected annual cost into a monthly planning amount. For example, $1,200 of annual insurance corresponds to $100 per month.
          </p>
          <p>
            The same approach can be used for annual property taxes, gifts, travel, tuition, vehicle maintenance, or other periodic costs.
          </p>
          <p>
            The calculator does not predict future bills; it helps translate the assumptions you enter into a consistent monthly framework.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. How to Use a Budget When You Have Debt
          </h2>
          <p>
            Debt payments should be entered separately from everyday living expenses so that the budget shows how much of gross income is committed to qualifying debt and how much remains for other uses.
          </p>
          <p>
            A budget deficit can be addressed through a combination of expense changes, income changes, savings adjustments, or debt-payoff strategies. The correct choice depends on the household&apos;s circumstances.
          </p>
          <p>
            For debt-specific repayment modeling, compare this budget with the{" "}
            <Link href="/calculators/debt-payoff-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Debt Payoff Calculator
            </Link>
            ,{" "}
            <Link href="/calculators/credit-card-payoff-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Credit Card Payoff Calculator
            </Link>
            ,{" "}
            <Link href="/calculators/student-loan-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Student Loan Calculator
            </Link>
            ,{" "}
            <Link href="/calculators/personal-loan-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Personal Loan Calculator
            </Link>
            ,{" "}
            <Link href="/calculators/loan-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Loan Calculator
            </Link>
            ,{" "}
            <Link href="/calculators/refinance-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Refinance Calculator
            </Link>
            , or{" "}
            <Link href="/calculators/credit-card-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Credit Card Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Zero-Based Budgeting vs. 50/30/20
          </h2>
          <p>
            The 50/30/20 framework uses broad target categories, while zero-based budgeting assigns a purpose to every dollar so that planned income minus planned allocations reaches zero.
          </p>
          <p>
            Neither framework is universally superior.
          </p>
          <p>
            50/30/20 can provide a quick high-level benchmark. Zero-based budgeting can provide more granular control when a household needs to account for many individual obligations.
          </p>
          <p>
            A practical budget can also combine both approaches: use broad allocation targets for a first check, then use detailed categories to identify where money is actually going.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Emergency Savings and Long-Term Goals
          </h2>
          <p>
            A budget should account for both recurring obligations and future financial needs.
          </p>
          <p>
            Emergency savings can help provide a cash reserve for unexpected expenses or income interruptions. Retirement contributions, education savings, and other investment allocations represent longer-term goals.
          </p>
          <p>
            The calculator does not determine how large your emergency fund should be or guarantee that a particular savings rate is sufficient. Those decisions depend on income stability, household obligations, access to other resources, and financial goals.
          </p>
          <p>
            The CFPB&apos;s budgeting resources emphasize creating a spending plan that accounts for needs, wants, and regular savings.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Calculation Methodology and Disclaimer
          </h2>
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Methodology</h3>
            <p>
              This calculator annualizes supported monthly and annual inputs before aggregating them. Income is combined into gross annual income and converted to a modeled after-tax amount using the entered effective tax-rate assumption. Expenses are grouped into the calculator&apos;s predefined categories and converted to comparable annual and monthly totals.
            </p>
            <p>
              Net cash flow is modeled as after-tax monthly income minus total monthly expenses.
            </p>
            <p>
              The DTI indicators use the calculator&apos;s predefined qualifying housing and debt categories divided by gross monthly income. The 50/30/20 comparison divides each predefined bucket by after-tax monthly income. The Stress Test applies the selected income-reduction and expense-inflation assumptions to the baseline model.
            </p>
          </div>
          <div className="space-y-2 pt-2">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Disclaimer</h3>
            <p>
              This calculator provides budgeting estimates based on user-entered assumptions. Its tax calculation is a simplified effective-rate model and is not a tax return or estimate of actual federal, state, or local tax liability. DTI results are planning indicators and are not lender approval determinations. The 50/30/20 framework is a budgeting benchmark rather than a universal financial rule. Actual expenses, taxes, debt terms, lender standards, investment outcomes, and household circumstances can differ. This tool does not provide individualized legal, tax, investment, or financial advice.
            </p>
          </div>
        </section>
      </div>

      {/* 3. SECTION: FREQUENTLY ASKED QUESTIONS (20 FAQs, Open by Default) */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-900 dark:text-slate-100 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
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
            This calculator annualizes supported monthly and annual inputs before aggregating them. Income is combined into gross annual income and converted to a modeled after-tax amount using the entered effective tax-rate assumption. Expenses are grouped into the calculator&apos;s predefined categories and converted to comparable annual and monthly totals. Net cash flow is modeled as after-tax monthly income minus total monthly expenses. The DTI indicators use the calculator&apos;s predefined qualifying housing and debt categories divided by gross monthly income. The 50/30/20 comparison divides each predefined bucket by after-tax monthly income. The Stress Test applies the selected income-reduction and expense-inflation assumptions to the baseline model.
          </p>
        </div>

        <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl space-y-2 text-xs leading-relaxed text-amber-900 dark:text-amber-200">
          <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 text-xs uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            Financial Disclaimer
          </div>
          <p>
            This calculator provides budgeting estimates based on user-entered assumptions. Its tax calculation is a simplified effective-rate model and is not a tax return or estimate of actual federal, state, or local tax liability. DTI results are planning indicators and are not lender approval determinations. The 50/30/20 framework is a budgeting benchmark rather than a universal financial rule. Actual expenses, taxes, debt terms, lender standards, investment outcomes, and household circumstances can differ. This tool does not provide individualized legal, tax, investment, or financial advice.
          </p>
        </div>
      </section>
    </div>
  );
}

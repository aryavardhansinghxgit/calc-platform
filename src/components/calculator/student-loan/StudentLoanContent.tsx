"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  BookOpen,
  Info,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { STUDENT_LOAN_CALCULATOR } from "@/calculators/finance/student-loan";

export function StudentLoanContent() {
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

  const faqs = STUDENT_LOAN_CALCULATOR.faqs || [];

  return (
    <div className="mt-8 space-y-10 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200">
      {/* 1. RELATED CALCULATORS BLOCK (Exactly 7 Verified Live Routes) */}
      <section className="space-y-3 pt-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Related Educational &amp; Financial Calculators
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
            href="/calculators/refinance-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Refinance Calculator
          </Link>
          <Link
            href="/calculators/budget-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Budget Calculator
          </Link>
          <Link
            href="/calculators/credit-card-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Credit Card Calculator
          </Link>
        </div>
      </section>

      {/* 2. MAIN EDUCATIONAL CONTENT (15 Sections) */}
      <div className="space-y-8 text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed pt-2">
        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is a Student Loan Calculator?
          </h2>
          <p>
            A student loan calculator estimates how a loan balance, interest rate, repayment term, and payment amount interact over time. Depending on the scenario, it can show a required monthly payment, total interest, total repayment, payoff timing, or the effect of changing one of these variables.
          </p>
          <p>
            This calculator extends basic payment math with extra-payment repayment, in-school borrowing projections, federal repayment-plan information, and a student-loan refinancing scenario. Those features address different planning questions, so a result from one module should not automatically be interpreted as a result from another.
          </p>
          <p>
            The calculator provides mathematical estimates. Actual federal loan eligibility, repayment-plan availability, servicing rules, and final payment amounts depend on the borrower&apos;s specific loans and circumstances.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How Student Loan Payments Are Calculated
          </h2>
          <p>
            For a fixed-rate installment scenario, the calculator uses the standard amortization relationship:
          </p>
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border font-mono text-xs space-y-1">
            <div>Monthly rate:</div>
            <div className="text-blue-600 dark:text-blue-400 font-bold">r = APR / 12</div>
            <div className="pt-1">Monthly payment:</div>
            <div className="text-blue-600 dark:text-blue-400 font-bold">PMT = P × [r(1+r)^n / ((1+r)^n − 1)]</div>
            <div className="text-[11px] text-zinc-500 pt-1">
              where P is the balance, r is the monthly rate, and n is the number of monthly payments.
            </div>
          </div>
          <p>
            Example: a $30,000 balance at 6.8% over 10 years produces a modeled payment of approximately $345.24 per month, with approximately $11,428.92 in total interest under the calculator&apos;s fixed-payment model.
          </p>
          <p>
            Displayed values are rounded for presentation; calculations should use the underlying precision before final currency rounding. You can model different scenarios with our{" "}
            <Link href="/calculators/loan-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Loan Calculator
            </Link>{" "}
            to evaluate how standard fixed-rate amortization operates across general installment debts.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. How Interest Changes the Cost of a Student Loan
          </h2>
          <p>
            The monthly payment is only one part of loan cost.
          </p>
          <p>
            A longer repayment term can reduce the required monthly payment while increasing the number of interest-bearing periods and therefore the total interest paid.
          </p>
          <p>
            The calculator separates:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><strong>Principal</strong> — the amount borrowed or remaining.</li>
            <li><strong>Interest</strong> — the modeled financing cost.</li>
            <li><strong>Total payments</strong> — principal plus modeled interest.</li>
          </ul>
          <p>
            This makes it possible to compare a lower monthly payment against the longer-term cost rather than treating the lowest payment as automatically the cheapest option.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. How the Four-Way Student Loan Solver Works
          </h2>
          <p>
            The calculator can solve different missing variables from the other known values.
          </p>
          <p>
            You can use combinations of:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>loan balance</li>
            <li>repayment term</li>
            <li>interest rate</li>
            <li>monthly payment</li>
          </ul>
          <p>
            If the balance, term and interest rate are known, the calculator solves for the monthly payment. If the balance, term and payment are known, it can numerically solve for the implied annual interest rate.
          </p>
          <p>
            Each inverse solution is validated by sending the calculated result back through the forward payment formula.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. What Happens When a Payment Is Too Small?
          </h2>
          <p>
            A loan does not amortize when the scheduled payment is no greater than the interest that accrues during the payment period.
          </p>
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border font-mono text-xs">
            <div>Monthly Interest = Balance × APR / 12</div>
          </div>
          <p>
            If the payment is below that amount, the balance can increase rather than decline. At exactly the interest-only boundary, the payment does not reduce principal.
          </p>
          <p>
            The calculator therefore identifies a non-amortizing state instead of inventing a finite payoff period.
          </p>
          <p>
            Actual federal Direct Loans use daily simple interest, so real federal-servicer interest can differ from a simplified monthly model.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. How Extra Payments Can Shorten Student Loan Payoff
          </h2>
          <p>
            Additional payments can accelerate repayment when they reduce the outstanding balance.
          </p>
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border text-xs space-y-1 font-sans">
            <div className="font-bold text-blue-600 dark:text-blue-400">Verified scenario:</div>
            <div>$30,000 at 6.8%, with a $350 baseline monthly payment and an additional $150 per month produces a $500 modeled payment.</div>
            <div>The tested scenario reduces the modeled payoff period from 118 months to 74 months and reduces modeled interest by $4,421.28.</div>
          </div>
          <p>
            Actual payment application can depend on servicer instructions and loan structure, particularly when a borrower has multiple loans. The calculator&apos;s result represents the modeled scenario rather than a guarantee of how a particular servicer will allocate an extra payment. You can analyze structured acceleration methods using our{" "}
            <Link href="/calculators/debt-payoff-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Debt Payoff Calculator
            </Link>{" "}
            to compare snowball and avalanche reduction strategies.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. In-School Borrowing, Interest and Grace Periods
          </h2>
          <p>
            Students may borrow additional amounts before repayment begins, so the balance at repayment can be higher than the amount originally borrowed.
          </p>
          <p>
            The calculator&apos;s in-school projection models:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>years until graduation</li>
            <li>annual borrowing</li>
            <li>current balance</li>
            <li>interest rate</li>
            <li>grace period</li>
            <li>whether interest is paid during school</li>
          </ul>
          <p>
            For federal-loan education scenarios, the exact treatment of interest depends on loan type and applicable rules. Direct Loans use simple daily interest, and certain federal loans have a generally six-month grace period after leaving school or dropping below half-time enrollment.
          </p>
          <p>
            The calculator should therefore be treated as a planning projection rather than an official federal loan-servicer statement.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Subsidized vs. Unsubsidized Student Loans
          </h2>
          <p>
            The interest treatment of federal loans can differ by loan type.
          </p>
          <p>
            For example, Direct Subsidized Loans have federal interest benefits during qualifying periods, while Direct Unsubsidized Loans accrue interest from disbursement under their applicable rules.
          </p>
          <p>
            Private student loans follow lender-specific terms and should not automatically be assumed to receive federal repayment-plan or interest benefits.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Federal Student Loan Repayment Plans
          </h2>
          <p>
            Federal repayment-plan availability is more complicated than simply choosing a payment percentage.
          </p>
          <p>
            Eligibility can depend on:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>loan type</li>
            <li>first-disbursement date</li>
            <li>consolidation history</li>
            <li>borrower circumstances</li>
            <li>program rules</li>
          </ul>
          <p>
            As of the current federal framework, RAP and Tiered Standard are part of the repayment landscape beginning July 1, 2026, while SAVE is no longer available. Federal Student Aid also identifies PAYE and ICR as plans that will end no later than July 1, 2028.
          </p>
          <p>
            This calculator&apos;s federal-plan section is an educational overview, not a substitute for the official Federal Student Aid Repayment Calculator or a servicer&apos;s eligibility determination.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Student Loan Forgiveness and PSLF
          </h2>
          <p>
            Forgiveness is not automatic merely because a borrower selects a particular repayment plan.
          </p>
          <p>
            Programs such as Public Service Loan Forgiveness have their own qualifying requirements. Federal Student Aid&apos;s PSLF materials specify 120 qualifying payments for PSLF under the program rules.
          </p>
          <p>
            IDR-related discharge also depends on the applicable plan, qualifying payments and other requirements.
          </p>
          <p>
            The calculator should describe potential forgiveness as conditional, never guaranteed.
          </p>
          <p>
            Tax treatment of discharged debt can also vary, so the calculator should not make a blanket statement that forgiven student-loan balances are always tax-free.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Federal vs. Private Student Loans
          </h2>
          <p>
            Federal and private student loans should not be treated as interchangeable.
          </p>
          <p>
            Federal loans may provide access to federal repayment programs and protections subject to eligibility requirements. Private loans are governed primarily by the lender&apos;s contract and generally do not offer the same federal repayment-plan framework.
          </p>
          <p>
            This distinction matters when considering refinancing or unsecured borrowing alternatives like a{" "}
            <Link href="/calculators/personal-loan-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Personal Loan Calculator
            </Link>
            . Refinancing federal student debt into a private loan can change or eliminate access to federal programs and protections.
          </p>
          <p>
            Borrowers should compare not only the interest rate, but also the protections and repayment options they would give up.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Student Loan Refinancing
          </h2>
          <p>
            The refinance module compares the current modeled loan with a proposed private-refinance scenario.
          </p>
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border text-xs space-y-1 font-sans">
            <div className="font-bold text-blue-600 dark:text-blue-400">Verified baseline:</div>
            <div>Current: $30,000 at 6.8% for 10 years</div>
            <div>Refinance: 4.5% for 10 years</div>
            <div className="pt-1 font-bold">Results:</div>
            <div>Current payment: $345.24/month</div>
            <div>Refinanced payment: $310.92/month</div>
            <div>Modeled monthly reduction: $34.32/month</div>
            <div>Modeled interest savings: $4,118.08</div>
          </div>
          <p>
            The calculator labels these metrics separately so that payment reduction is not confused with lifetime interest savings. You can explore broader debt restructuring options with our dedicated{" "}
            <Link href="/calculators/refinance-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Refinance Calculator
            </Link>{" "}
            or evaluate revolving debt trade-offs using our{" "}
            <Link href="/calculators/credit-card-payoff-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Credit Card Payoff Calculator
            </Link>
            .
          </p>
          <p>
            Refinancing federal student debt into private debt may change access to federal benefits and repayment programs; the rate comparison alone does not determine whether refinancing is appropriate.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. How Loan Terms and Repayment Strategy Affect Total Cost
          </h2>
          <p>
            A longer term generally produces a lower required payment but can increase total interest.
          </p>
          <p>
            A shorter term generally increases the required payment but reduces the number of payment periods.
          </p>
          <p>
            Extra payments provide another way to shorten repayment without necessarily changing the scheduled term.
          </p>
          <p>
            The appropriate scenario depends on the borrower&apos;s cash flow, emergency reserves, other debts, loan protections, and goals. You can track your overall monthly financial allocations using a{" "}
            <Link href="/calculators/budget-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Budget Calculator
            </Link>{" "}
            or balance high-interest revolving obligations with our{" "}
            <Link href="/calculators/credit-card-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Credit Card Calculator
            </Link>
            . This calculator shows the mathematical consequences of the assumptions entered; it does not determine which strategy is personally appropriate.
          </p>
        </section>
      </div>

      {/* 3. SECTION 14: FREQUENTLY ASKED QUESTIONS (20 FAQs, Open by Default) */}
      <section className="space-y-6 dark:border-zinc-800 pt-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            14. Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm transition-all"
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

      {/* 4. SECTION 15: METHODOLOGY & FINANCIAL DISCLAIMER */}
      <section className="space-y-4 dark:border-zinc-800 pt-6">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          15. Calculation Methodology &amp; Financial Disclaimer
        </h2>

        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2 text-xs leading-relaxed text-slate-800 dark:text-slate-200">
          <div className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 text-xs uppercase tracking-wider">
            <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            Methodology
          </div>
          <p>
            This calculator uses fixed-payment amortization formulas for its standard repayment scenarios, monthly-rate inversion for supported solver modes, iterative month-by-month repayment simulation for extra-payment scenarios, and a separate projection model for in-school borrowing and repayment entry. Federal repayment-plan information is presented as educational context and is not a substitute for an official federal eligibility or payment determination. Display values are rounded for presentation while calculations use underlying numerical precision.
          </p>
        </div>

        <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl space-y-2 text-xs leading-relaxed text-amber-900 dark:text-amber-200">
          <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 text-xs uppercase tracking-wider">
            <ShieldAlert className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            Disclaimer
          </div>
          <p>
            This calculator provides estimates based on the information and assumptions entered. Actual student-loan interest, payment amounts, repayment-plan eligibility, servicer payment allocation, federal program requirements, private-lender terms, and refinancing offers may differ. Federal and private student loans can have materially different rules and protections. Federal repayment-plan and forgiveness information can change as laws and program rules change. This tool is not a federal loan-servicer system, loan approval system, legal or tax advice, or individualized financial advice.
          </p>
        </div>
      </section>
    </div>
  );
}

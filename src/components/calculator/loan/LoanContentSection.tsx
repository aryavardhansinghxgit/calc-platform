"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calculator,
  Percent,
  Layers,
  Clock,
  Zap,
  TrendingDown,
  DollarSign,
  Scale,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { loan_calculatorFaqs } from "@/calculators/finance/loan/faq";

export function LoanContentSection() {
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

  const relatedCalculators = [
    {
      name: "Mortgage Calculator",
      slug: "/calculators/mortgage-calculator",
    },
    {
      name: "Auto Loan Calculator",
      slug: "/calculators/auto-loan-calculator",
    },
    {
      name: "Student Loan Calculator",
      slug: "/calculators/student-loan-calculator",
    },
    {
      name: "Personal Loan Calculator",
      slug: "/calculators/personal-loan-calculator",
    },
    {
      name: "Amortization Calculator",
      slug: "/calculators/amortization-calculator",
    },
    {
      name: "Interest Rate Calculator",
      slug: "/calculators/interest-rate-calculator",
    },
    {
      name: "Refinance Calculator",
      slug: "/calculators/refinance-calculator",
    },
  ];

  return (
    <article className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-10 divide-y divide-slate-100 dark:divide-slate-800 shadow-xs">
      {/* 1. SINGLE CANONICAL RELATED CALCULATORS BLOCK (AT TOP - Exactly 7 Verified Live Routes) */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          Related Lending &amp; Debt Calculators
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          {relatedCalculators.map((calc, idx) => (
            <Link
              key={idx}
              href={calc.slug}
              className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              {calc.name}
            </Link>
          ))}
        </div>
      </div>

      {/* 2. SECTION 1: WHAT IS AN AMORTIZED INSTALLMENT LOAN */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Comprehensive Loan Theory &amp; Financial Analysis
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          1. What Is an Amortized Installment Loan?
        </h2>
        <p>
          An installment loan is a contractual financial agreement where a borrower receives an upfront sum of capital (the loan principal) from a financial institution or private lender and agrees to repay the debt through regularly scheduled periodic installments over a defined duration. For specialized vehicular debt, consumers frequently turn to the{" "}
          <Link href="/calculators/auto-loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Auto Loan Calculator
          </Link>
          , but the underlying mathematical principles of installment credit govern mortgages, personal credit lines, and commercial debt alike.
        </p>
        <p>
          For a standard amortizing installment loan, each scheduled periodic payment remains fixed in total dollar amount throughout the term, but the internal mathematical composition shifts dynamically across every compounding cycle:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Principal Allocation:</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The exact portion of the payment that directly reduces the outstanding principal obligation. As principal declines, the base on which subsequent interest is assessed diminishes.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Interest Allocation:</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The fee charged by the lender for the use of borrowed capital, calculated by multiplying the outstanding principal balance by the periodic interest rate.
            </p>
          </div>
        </div>
        <p>
          In the opening periods of a long-term installment loan, interest constitutes the dominant share of each monthly payment. As previous payments systematically reduce the remaining principal balance, less interest accrues in subsequent cycles. Consequently, an increasingly larger percentage of each subsequent payment is directed toward principal reduction until the debt is fully retired at maturity.
        </p>
      </section>

      {/* 3. SECTION 2: THE STANDARD AMORTIZATION FORMULA */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          2. The Mechanics of Loan Payments: Standard Amortization Formula
        </h2>
        <p>
          The level periodic payment required to fully amortize a fixed-rate installment debt over <em>n</em> periods at a constant periodic interest rate <em>r</em> is derived from the annuity present-value formula:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-blue-600 dark:text-blue-400 font-bold space-y-1">
          <div>PMT = P × [ r(1 + r)^n ] / [ (1 + r)^n − 1 ]</div>
          <div className="text-slate-600 dark:text-slate-400 font-normal pt-1">
            Where P = Initial Loan Principal, r = Periodic Interest Rate (Annual Rate / Periods per Year), n = Total Number of Scheduled Payments.
          </div>
        </div>
        <p>
          To inspect how each payment divides between principal reduction and lender interest over time, borrowers can explore the{" "}
          <Link href="/calculators/amortization-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Amortization Calculator
          </Link>
          . In the special edge case of a 0% interest rate loan, the formula simplifies gracefully to <code>PMT = P / n</code>.
        </p>
      </section>

      {/* 4. SECTION 3: NOMINAL INTEREST RATE VS. APR */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          3. Nominal Interest Rate vs. Annual Percentage Rate (APR)
        </h2>
        <p>
          A common source of confusion in consumer credit is the distinction between the nominal (stated) note rate and the Annual Percentage Rate (APR). While the nominal rate determines the periodic interest charge assessed on the unpaid balance, the APR is a comprehensive regulatory measure established under the U.S. Truth in Lending Act (TILA) Regulation Z that reflects the true, annualized cost of credit including mandatory prepaid finance charges.
        </p>
        <p>
          Upfront financing fees—such as origination points, underwriting fees, application processing charges, and document preparation costs—reduce the net loan proceeds received by the borrower. When these fees are factored into the internal rate of return (IRR) across scheduled payments, the effective APR exceeds the nominal note rate. For loans with zero upfront finance fees, the APR equals the nominal rate.
        </p>
      </section>

      {/* 5. SECTION 4: COMPOUNDING FREQUENCIES AND EFFECTIVE ANNUAL RATES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          4. Compounding Frequencies and Effective Annual Borrowing Cost
        </h2>
        <p>
          Interest compounding frequency dictates how frequently accrued interest is capitalized into the loan balance if left unpaid, or how the periodic rate is derived from an annualized figure. In U.S. consumer mortgages and personal installment loans, interest is typically compounded monthly (APR convention). In Canadian mortgage lending, semi-annual compounding is mandated by statute. To analyze pure compound growth across different frequencies, refer to the{" "}
          <Link href="/calculators/interest-rate-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Interest Rate Calculator
          </Link>
          .
        </p>
        <p>
          The conversion from a nominal annual rate <em>r</em> compounded <em>m</em> times per year to the Effective Annual Rate (EAR / APY) follows:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
          EAR = (1 + r / m)^m − 1
        </div>
      </section>

      {/* 6. SECTION 5: PAYMENT FREQUENCIES (REGULAR VS ACCELERATED) */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          5. Payment Frequencies: Regular vs. Accelerated Schedules
        </h2>
        <p>
          Selecting a payment frequency other than monthly can alter either cash flow convenience or total interest expenses:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li><strong>Regular Biweekly:</strong> Divides the annual interest rate into 26 periods. The biweekly payment is calculated to amortize the loan over the exact agreed term. Total annual payments equal 12 monthly payments.</li>
          <li><strong>Accelerated Biweekly:</strong> Takes the standard monthly payment and divides it exactly by two (<code>PMT_monthly / 2</code>), paid every two weeks across 26 annual cycles. Because 26 half-payments equal 13 full monthly payments per year, the extra month&apos;s principal reduction shortens the loan term by years and saves substantial interest.</li>
          <li><strong>Weekly &amp; Accelerated Weekly:</strong> Divides payments into 52 weekly installments, further smoothing cash flow and accelerating principal retirement.</li>
        </ul>
      </section>

      {/* 7. SECTION 6: PREPAYMENT STRATEGIES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          6. Prepayment Strategies: Extra Monthly, Annual, and Lump-Sum Payoffs
        </h2>
        <p>
          In an amortizing loan, every extra dollar paid above the scheduled installment is applied directly to reduce the outstanding principal balance. Because subsequent periodic interest is assessed on a smaller principal base, prepayments trigger a compounding savings effect:
        </p>
        <p>
          For example, on a $200,000 15-year loan at 6.0% interest, adding just $100 per month to the regular payment shortens the repayment timeline by 15 months and saves over $10,000 in lifetime finance charges. Lump-sum annual bonuses or one-time principal injections achieve similar interest savings.
        </p>
      </section>

      {/* 8. SECTION 7: REVERSE SOLVING */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          7. Reverse Solving: Loan Affordability and Payoff Duration Models
        </h2>
        <p>
          Rather than solving for payment given a known loan amount, borrowers frequently need to solve inverse mathematical problems:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Affordability (Max Principal):</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Calculates the maximum borrowable principal <code>P = PMT × [1 − (1 + r)^−n] / r</code> supported by a designated monthly payment budget.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Duration Solver (Payoff Timeline):</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Calculates the required term <code>n = ln(PMT / (PMT − P·r)) / ln(1 + r)</code> needed to extinguish a debt at a specified fixed payment.
            </p>
          </div>
        </div>
      </section>

      {/* 9. SECTION 8: REFINANCING ECONOMICS */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          8. Refinancing Economics and Break-Even Recovery Timelines
        </h2>
        <p>
          Refinancing involves replacing an existing debt with a new loan featuring different interest rates, term lengths, or principal balances. For detailed mortgage refinancing modeling, consult the{" "}
          <Link href="/calculators/refinance-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Refinance Calculator
          </Link>
          .
        </p>
        <p>
          A critical consideration in refinancing is evaluating the break-even recovery horizon: <code>Break-Even Months = Upfront Closing Costs / Monthly Payment Savings</code>. If a borrower plans to relocate or retire the loan before the break-even period concludes, refinancing may result in a net financial loss despite lower nominal monthly payments.
        </p>
      </section>

      {/* 10. SECTION 9: DEFERRED PAYMENT & BOND MODELS */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          9. Alternative Debt Structures: Deferred Payment &amp; Bond Models
        </h2>
        <p>
          While amortized loans feature ongoing periodic principal and interest payments, other credit structures operate on lump-sum maturity principles:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Deferred Payment Loan:</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              No periodic installments occur during the loan term. The entire principal and accrued compounded interest are paid in a single lump sum at loan maturity: <code>FV = P × (1 + r/m)^(m·t)</code>.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Bond / Lump-Sum Maturity:</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              A predetermined face value is due at maturity. The calculator computes the discounted present value capital received when the debt is issued: <code>PV = FV / (1 + r/m)^(m·t)</code>.
            </p>
          </div>
        </div>
      </section>

      {/* 11. SECTION 10: SECURED VS UNSECURED DEBT */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          10. Secured vs. Unsecured Debt: Collateral, Risk, and Underwriting
        </h2>
        <p>
          Consumer and commercial loans generally fall into two broad structural classifications:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-blue-600" /> Secured Loans
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Secured debt is backed by specific pledged collateral (such as residential real estate in a mortgage or a motor vehicle in an auto loan). If the borrower defaults, the lender holds a legal lien allowing repossession or foreclosure. Because collateral mitigates lender risk, secured loans typically feature higher borrowing limits, longer terms, and lower interest rates.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-1.5">
              <Scale className="h-4 w-4 text-indigo-600" /> Unsecured Loans
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Unsecured debt—such as credit cards, personal signature loans, and certain student loans—is not backed by physical collateral. Lenders evaluate creditworthiness through the &ldquo;5 C&apos;s of Credit&rdquo; (Character, Capacity, Capital, Collateral, Conditions). Due to elevated lender risk, unsecured loans generally carry higher interest rates and stricter credit score thresholds. For unsecured installment borrowing, explore the{" "}
              <Link href="/calculators/personal-loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Personal Loan Calculator
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* 12. FREQUENTLY ASKED QUESTIONS (12 CANONICAL FAQS OPEN BY DEFAULT) */}
      <section className="pt-8 space-y-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {loan_calculatorFaqs.map((faq, index) => {
            const isOpen = openFaqIndices.has(index);
            return (
              <div
                key={index}
                className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 flex items-center justify-between font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-bold min-w-[24px]">
                      Q{index + 1}.
                    </span>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}

export default LoanContentSection;

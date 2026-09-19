"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  PieChart as PieIcon,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Target,
  Scale,
  Calculator,
  FileText,
  Clock,
  Layers,
  Sparkles,
  TrendingDown,
  Building2,
  Landmark,
  ArrowRightLeft,
} from "lucide-react";

export const repaymentFaqs = [
  {
    question: "What is the mathematical difference between a Fixed Term and a Fixed Installment repayment plan?",
    answer:
      "A Fixed Term plan fixes the maturity horizon (e.g., 5, 15, or 30 years) and calculates the exact periodic payment required to amortize the debt to zero. A Fixed Installment plan fixes the dollar payment amount (e.g., $350/month) and solves logarithmically for the number of periods n = −ln[1 − (P × i)/PMT] / ln(1 + i) required to eliminate the debt.",
  },
  {
    question: "How does compounding frequency affect my effective loan interest rate?",
    answer:
      "Compounding frequency dictates how frequently accrued interest is capitalized into the principal balance. When payment frequency (k) differs from compounding frequency (m), the effective periodic interest rate is converted using the formula: i = (1 + r/m)^(m/k) − 1. More frequent compounding (e.g., daily vs. annual) slightly increases the effective annualized borrowing rate.",
  },
  {
    question: "What is negative amortization and when does it occur?",
    answer:
      "Negative amortization occurs when your periodic payment is smaller than the interest accrued during that billing cycle (Payment < Balance × Periodic Rate). The unpaid interest is capitalized and added directly to the principal balance, causing the debt to grow exponentially rather than decline.",
  },
  {
    question: "How do accelerated bi-weekly payments cut years off a loan?",
    answer:
      "Accelerated bi-weekly payments split your monthly payment into two equal halves paid every 14 days. Because there are 52 weeks in a calendar year, you make 26 half-payments (equivalent to 13 full monthly payments per year). That single extra monthly payment per year goes 100% toward principal, shaving 4 to 8 years off a 30-year loan.",
  },
  {
    question: "Why do early loan payments consist mostly of interest while later payments consist mostly of principal?",
    answer:
      "Under standard amortization mathematics, periodic interest is calculated directly against the remaining unpaid principal balance. Because the loan balance is at its highest during the initial months, interest charges consume the majority of each installment. As principal is gradually retired, less interest accrues, allowing a progressively larger fraction of each fixed installment to reduce principal.",
  },
  {
    question: "How do extra principal payments compound savings over time?",
    answer:
      "Extra principal payments reduce the remaining balance immediately. Because subsequent interest calculations are executed against a smaller principal base, every future interest charge is permanently reduced. This creates a reverse compounding effect that shortens the total payoff timeline and saves thousands in lifetime interest.",
  },
  {
    question: "What is the difference between simple interest and amortizing installment interest?",
    answer:
      "Simple interest is calculated strictly on the original principal borrowed over time (Interest = Principal × Rate × Time). Amortized installment interest recalculates interest at every payment interval against the declining outstanding principal balance, with each installment covering accrued interest first and principal reduction second.",
  },
  {
    question: "What is continuous compounding and when is it used?",
    answer:
      "Continuous compounding assumes interest accrues and compounds at every infinitesimal moment using the mathematical constant e. The periodic rate formula is i = e^(r/k) − 1. It represents the absolute mathematical upper limit of interest accumulation for a given nominal rate.",
  },
  {
    question: "How can I calculate how much loan I can afford based on a monthly payment budget?",
    answer:
      "You can solve backward from your monthly payment budget (PMT) using the present value of an annuity formula: Principal = PMT × [((1 + i)^n − 1) / (i × (1 + i)^n)]. For example, a $1,500/month budget over 15 years at 6% interest supports a maximum loan balance of $177,755.",
  },
  {
    question: "Can I pay off my loan early without incurring prepayment penalties?",
    answer:
      "Under federal regulations, the vast majority of US consumer loans, conforming mortgages, auto loans, and federal student loans prohibit prepayment penalties. However, commercial loans, subprime mortgages, or specific private contracts may carry prepayment fees during the first 1 to 5 years. Always check your loan disclosure note.",
  },
  {
    question: "Why does paying only the minimum on a credit card take decades to pay off?",
    answer:
      "Credit card minimum payments are usually set as a percentage of the remaining balance (e.g., 1% of balance + monthly finance charges). As your balance decreases, the required minimum payment decreases proportionally, creating an asymptotic repayment curve that extends the payoff timeline over 15 to 30 years.",
  },
  {
    question: "How does inflation affect the real cost of repaying fixed-rate debt?",
    answer:
      "Inflation erodes the purchasing power of money over time. When you hold fixed-rate debt, your monthly repayment remains constant in nominal dollars while prevailing wages and price levels rise, making future debt installments cheaper in real economic terms.",
  },
];

export function RepaymentContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-10 text-slate-900 dark:text-slate-100 font-sans">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Comprehensive Debt Repayment &amp; Amortization Guide
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
          1. Introduction to Loan Repayment Mathematics
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A <strong>Loan Repayment Schedule</strong> (or amortization plan) is a structured financial mechanism that dictates how a borrowed principal balance, subject to periodic compound interest, is systematically retired over time through regular installments.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Every loan payment is mathematically partitioned into two components: <strong>accrued interest</strong> (the lender's finance charge) and <strong>principal reduction</strong> (the equity portion that permanently lowers the remaining debt balance). Whether you are managing personal loans, mortgages, auto financing, or credit card balances, understanding the interaction between compounding intervals, payment frequencies, and extra principal prepayments empowers you to achieve debt freedom years ahead of schedule.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Fixed Term Mode</span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Lock in a target duration (e.g., 5 or 30 years) to solve for the exact required periodic installment.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Fixed Installment Mode</span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Set your monthly budget to solve logarithmically for the exact payoff date and total interest saved.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Bi-Weekly Acceleration</span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Execute 26 half-payments annually (13 full payments) to shave 4 to 8 years off long-term mortgages.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          2. Mathematical Concept: Compounding Harmonization &amp; Amortization Dynamics
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The core mathematical principle of loan amortization governs how periodic interest interacts with payment frequency:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
          <li>
            <strong>Compounding Frequency Harmonization:</strong> When compounding frequency ($m$) differs from payment frequency ($k$), the effective periodic interest rate ($i$) must be adjusted via the standard financial equivalence equation:
            <br />
            <span className="font-mono text-xs text-blue-600 dark:text-blue-400">
              i = (1 + r / m)^(m / k) − 1
            </span>
          </li>
          <li>
            <strong>Continuous Compounding Limit:</strong> When interest compounds continuously at every infinitesimal moment, the periodic rate simplifies to:
            <br />
            <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
              i = e^(r / k) − 1
            </span>
          </li>
          <li>
            <strong>Amortization Balance Decay:</strong> In every period t, interest is computed against the opening balance (I_t = B_(t−1) × i). Principal reduction (P_t = PMT − I_t) reduces the ending balance (B_t = B_(t−1) − P_t).
          </li>
        </ul>
      </section>

      {/* 3. FORMULAS SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          3. Core Formulas &amp; Variable Definitions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Fixed-Term Periodic Payment ($PMT$)
            </h3>
            <div className="space-y-1.5 font-mono text-xs text-slate-800 dark:text-slate-200">
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                PMT = P × [i(1 + i)^n] ÷ [(1 + i)^n − 1]
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Total Amount Paid = PMT × n
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Total Interest = (PMT × n) − P
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Fixed Installment Duration ($n$) &amp; Affordability
            </h3>
            <div className="space-y-1.5 font-mono text-xs text-slate-800 dark:text-slate-200">
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Periods (n) = −ln[1 − (P × i) ÷ PMT] ÷ ln(1 + i)
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Max Principal (P) = PMT × [((1 + i)^n − 1) ÷ (i(1 + i)^n)]
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Negative Amortization Condition: PMT ≤ P × i
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          4. How the Calculation Works (Step-by-Step)
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3 items-start">
            <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">Step 1:</span>
            <div>
              <strong>Establish Loan Parameters:</strong> Input original principal ($P$), annual nominal rate ($r$), compounding interval ($m$), and payment frequency ($k$).
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3 items-start">
            <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">Step 2:</span>
            <div>
              <strong>Calculate Effective Periodic Rate:</strong> Convert annual nominal rate into effective rate per payment period i = (1 + r/m)^(m/k) − 1.
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3 items-start">
            <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">Step 3:</span>
            <div>
              <strong>Solve for Payment or Duration:</strong> Compute fixed installment $PMT$ or solve logarithmically for period count $n$.
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3 items-start">
            <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">Step 4:</span>
            <div>
              <strong>Incorporate Prepayments &amp; Build Ledger:</strong> Integrate extra monthly or lump-sum prepayments to generate the accelerated amortization schedule and cumulative interest total.
            </div>
          </div>
        </div>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          5. Worked Numerical Examples
        </h2>

        <div className="space-y-4">
          {/* Example 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Example 1: Fixed Term Loan ($10,000 @ 10% for 5 Years)
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold">
                Fixed Term
              </span>
            </div>
            <div className="text-xs font-mono space-y-1 text-slate-800 dark:text-slate-200">
              <div>1. Principal (P) = $10,000.00 | Annual Rate (r) = 10.0% | Monthly Rate (i) = 0.10 / 12 = 0.008333</div>
              <div>2. Number of Payments (n) = 5 years × 12 = 60 months</div>
              <div>3. Monthly Payment (PMT) = $10,000 × [0.008333 × (1.008333)^60] ÷ [(1.008333)^60 − 1] = $212.47</div>
              <div>4. Total Repaid = 60 × $212.47 = $12,748.23</div>
              <div className="text-blue-600 dark:text-blue-400 font-bold pt-1">
                5. Total Interest Paid = $12,748.23 − $10,000.00 = $2,748.23
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Example 2: Fixed Installment ($10,000 @ 10% Paying $300/Month)
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-semibold">
                Fixed Payment
              </span>
            </div>
            <div className="text-xs font-mono space-y-1 text-slate-800 dark:text-slate-200">
              <div>1. Monthly Budget (PMT) = $300.00 | Principal (P) = $10,000.00 | Rate (i) = 0.008333</div>
              <div>2. Numerator: −ln[1 − ($10,000 × 0.008333) / $300] = −ln[1 − 0.27777] = −ln(0.7222) = 0.3254</div>
              <div>3. Denominator: ln(1 + 0.008333) = ln(1.008333) = 0.008298</div>
              <div>4. Payoff Duration (n) = 0.3254 ÷ 0.008298 = 39.2 months (3 Years 4 Months)</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold pt-1">
                5. Total Interest Paid = $1,757.50 (Saves $990.73 &amp; 21 Months vs. 5-Year Plan)
              </div>
            </div>
          </div>

          {/* Example 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Example 3: Accelerated Bi-Weekly Mortgage ($300,000 @ 6.5% for 30 Years)
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-semibold">
                Bi-Weekly Acceleration
              </span>
            </div>
            <div className="text-xs font-mono space-y-1 text-slate-800 dark:text-slate-200">
              <div>1. Standard Monthly Payment = $1,896.20/month | Total 30-Year Interest = $382,633.47</div>
              <div>2. Accelerated Bi-Weekly Installment = $1,896.20 ÷ 2 = $948.10 every 14 days</div>
              <div>3. Annual Payments = 26 × $948.10 = $24,650.60 (Equals 13 monthly payments/year)</div>
              <div className="text-purple-600 dark:text-purple-400 font-bold pt-1">
                4. New Payoff Timeline = 24.2 Years (5.8 Years Faster) | Interest Saved = $87,256.29
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING & COMPARISON MATRIX */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          6. Visual Understanding: Term Horizon vs. Total Interest Trade-Off
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The table below illustrates the mathematical trade-off between monthly installment amount and cumulative interest across a $50,000 loan at 8.0% interest:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Loan Term</th>
                <th className="p-3">Monthly Payment ($)</th>
                <th className="p-3">Total Repaid ($)</th>
                <th className="p-3">Total Interest Paid ($)</th>
                <th className="p-3">Interest-to-Principal Ratio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-slate-100">3 Years (36 Mos)</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">$1,566.82</td>
                <td className="p-3">$56,405.52</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$6,405.52</td>
                <td className="p-3">12.8%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 bg-blue-50/50 dark:bg-blue-950/20 font-semibold">
                <td className="p-3 font-sans text-blue-700 dark:text-blue-300">5 Years (60 Mos)</td>
                <td className="p-3 text-blue-700 dark:text-blue-300">$1,013.82</td>
                <td className="p-3 text-blue-700 dark:text-blue-300">$60,829.18</td>
                <td className="p-3 text-blue-700 dark:text-blue-300">$10,829.18</td>
                <td className="p-3">21.7%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-slate-100">10 Years (120 Mos)</td>
                <td className="p-3">$606.64</td>
                <td className="p-3">$72,796.56</td>
                <td className="p-3 text-amber-600 dark:text-amber-400">$22,796.56</td>
                <td className="p-3">45.6%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-slate-100">15 Years (180 Mos)</td>
                <td className="p-3">$477.83</td>
                <td className="p-3">$86,008.67</td>
                <td className="p-3 text-rose-600 dark:text-rose-400">$36,008.67</td>
                <td className="p-3">72.0%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-slate-100">30 Years (360 Mos)</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$366.88</td>
                <td className="p-3">$132,077.58</td>
                <td className="p-3 text-rose-600 dark:text-rose-400 font-bold">$82,077.58</td>
                <td className="p-3">164.2%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          7. Critical Loan Repayment Pitfalls to Avoid
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              1. Falling Into Negative Amortization
            </h3>
            <p className="text-amber-800/90 dark:text-amber-300/90 text-xs">
              Selecting a fixed payment lower than the periodic interest charge ($PMT \leq P \times i$) causes unpaid interest to capitalize, driving debt upward indefinitely.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              2. Confusing Regular vs. Accelerated Bi-Weekly
            </h3>
            <p className="text-amber-800/90 dark:text-amber-300/90 text-xs">
              Regular bi-weekly (Annual payment ÷ 26) saves zero time. Accelerated bi-weekly (Monthly payment ÷ 2) creates the crucial 13th full payment per year.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              3. Paying Only Minimums on Revolving Cards
            </h3>
            <p className="text-amber-800/90 dark:text-amber-300/90 text-xs">
              Because credit card minimums decline as the balance falls, paying only the minimum stretches payoff over 20+ years and doubles total interest paid.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              4. Focusing Exclusively on Monthly Payment
            </h3>
            <p className="text-amber-800/90 dark:text-amber-300/90 text-xs">
              A 30-year loan lowers monthly cash flow requirements but increases cumulative interest by 100%–200% compared to a 15-year term.
            </p>
          </div>
        </div>
      </section>

      {/* 8. PRACTICAL APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Landmark className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          8. Practical Industry &amp; Personal Finance Applications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Mortgage Acceleration</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Homeowners model $100–$250/mo extra principal curtailments or accelerated bi-weekly schedules to pay off 30-year mortgages in 22–24 years.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Auto Loan Payoff</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Borrowers calculate exact payoff dates when adding lump-sum tax refunds directly to principal, eliminating negative vehicle equity.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Debt Consolidation</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Consumers compare rolling multiple high-APR credit cards into a single lower-rate personal loan to establish a fixed debt-free date.
            </p>
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            9. Frequently Asked Questions (FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {repaymentFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-start gap-2.5">
                    <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <div className="shrink-0 text-slate-400">
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 leading-relaxed font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. SUMMARY & KEY TAKEAWAYS */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-3">
        <h3 className="font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          10. Educational Key Takeaways
        </h3>
        <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 list-disc pl-5 leading-relaxed">
          <li><strong>Amortization Asymmetry:</strong> Early payments are mostly interest; later payments are mostly principal.</li>
          <li><strong>Bi-Weekly Alpha:</strong> Accelerated bi-weekly repayment creates a 13th full payment annually that directly eliminates principal.</li>
          <li><strong>Compounding Precision:</strong> Use i = (1 + r/m)^(m/k) − 1 whenever compounding and payment schedules differ.</li>
          <li><strong>Negative Amortization Alert:</strong> Always ensure periodic payment exceeds accrued interest charges.</li>
          <li><strong>Prepayment Power:</strong> Applying extra cash directly to principal permanently lowers all future compound interest charges.</li>
        </ul>
      </section>
    </div>
  );
}

export default RepaymentContent;

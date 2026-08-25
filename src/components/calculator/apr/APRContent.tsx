"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Info, AlertTriangle } from "lucide-react";

export function APRContent() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          APR Calculator
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          Calculate exact Annual Percentage Rate (APR) across fixed installment loans, mortgage discount points, revolving credit card payoff schedules, reverse target loan budgets, side-by-side financing comparisons, and accelerated prepayment scenarios.
        </p>
      </div>

      {/* 2. WHAT IS APR? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. What Is APR?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Annual Percentage Rate, or APR, is a standardized way to express the annualized cost of borrowing while incorporating both the nominal interest rate and mandatory upfront finance charges under the applicable calculation methodology. That makes APR different from a simple interest-rate quote because the interest rate alone does not reflect the impact of upfront origination fees, closing costs, or discount points.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          An APR calculator is useful when comparing loans that combine different combinations of interest rates, origination charges, discount points, or other modeled finance fees. Two loans can have identical nominal rates but materially different APRs when one requires higher upfront fees.
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Analytical Planning Notice</span>
          </div>
          <p>
            This calculator is an analytical planning tool. It is not an official Loan Estimate, Closing Disclosure, lender compliance system, or legal determination of a lender's required APR disclosure.
          </p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          When you want to compare the broader monthly payment structure alongside borrowing costs, use the{" "}
          <Link href="/calculators/loan-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Loan Calculator
          </Link>{" "}
          so you can separate payment size from annualized financing charges.
        </p>
      </section>

      {/* 3. APR VS INTEREST RATE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. APR vs. Nominal Interest Rate
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The nominal interest rate measures the periodic percentage charged directly on the outstanding principal balance. The APR is a broader annualized cost metric that incorporates the nominal interest rate and qualifying finance charges under the calculator's modeled methodology.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">Nominal Interest Rate</div>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Determines your monthly contractual payment (P&I) based on the outstanding loan principal.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">Annual Percentage Rate (APR)</div>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Determines the effective annualized cost by equating the net amount financed to the stream of monthly payments.
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For borrowers comparing home purchase financing, the{" "}
          <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Mortgage Calculator
          </Link>{" "}
          evaluates monthly payment, property taxes, and amortization schedules, while the APR calculator isolates the financing-fee effect.
        </p>
      </section>

      {/* 4. HOW THIS APR CALCULATOR WORKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. How This APR Calculator Works
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The standard fixed-loan module starts with the gross loan amount and subtracts upfront financing fees to determine the net amount financed for the APR cash-flow equation. Under the validated baseline:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Gross Loan: $100,000 | Upfront Fees: $2,500</div>
          <div>• Amount Financed: <strong>$97,500</strong> ($100,000 - $2,500)</div>
          <div>• Nominal Rate: 6.0% (Monthly Rate: 0.5%) | Term: 120 Months (10 Years)</div>
          <div>• Monthly Payment: <strong>$1,110.21/month</strong></div>
          <div>• Modeled Real APR: <strong>6.563%</strong> (APR Gap: +0.563%)</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The monthly payment is calculated using the standard fixed-rate amortization equation:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"PMT = P \\times \\frac{r(1+r)^N}{(1+r)^N - 1}"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The APR engine then solves for the periodic discount rate that equates the present value of future payments to the net amount financed.
        </p>
      </section>

      {/* 5. WHY APR REQUIRES NUMERICAL SOLVING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Why APR Requires Numerical Root Solving
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          APR cannot be obtained by simply adding a fee percentage to the interest rate. Because upfront fees reduce the net cash disbursed while contractual payments remain based on the full principal, the calculator must solve an internal rate of return polynomial equation:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"\\text{Amount Financed} = \\sum_{t=1}^{N} \\frac{\\text{Payment}_t}{(1 + r)^t}"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The engine solves for \(r\) using the <strong>Newton-Raphson</strong> numerical iteration method with robust convergence tolerances and derivative protections, multiplying the periodic root by 12 (or 26 for bi-weekly) to yield the annualized real APR.
        </p>
      </section>

      {/* 6. FEE SENSITIVITY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. How Upfront Fees Change Modeled APR
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Holding loan amount ($100,000), nominal rate (6.0%), and term (10 years) constant, increasing upfront fees produces a strictly monotonic increase in modeled APR:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-center">
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 block text-[10px]">Fee: $0</span>
            <span className="font-extrabold text-blue-600">6.000% APR</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 block text-[10px]">Fee: $500</span>
            <span className="font-extrabold text-blue-600">6.110% APR</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 block text-[10px]">Fee: $2,500</span>
            <span className="font-extrabold text-blue-600">6.563% APR</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 block text-[10px]">Fee: $5,000</span>
            <span className="font-extrabold text-blue-600">7.155% APR</span>
          </div>
        </div>
      </section>

      {/* 7. TERM SENSITIVITY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. How Loan Term Changes APR
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The same $2,500 upfront fee exerts a larger percentage impact on a shorter loan because the fee is amortized over fewer payment cycles:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• 5-Year Term (60 Months @ 6.0%, $2,500 Fee): <strong>7.078% APR</strong></div>
          <div>• 10-Year Term (120 Months @ 6.0%, $2,500 Fee): <strong>6.563% APR</strong></div>
          <div>• 30-Year Term (360 Months @ 6.0%, $2,500 Fee): <strong>6.220% APR</strong></div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          This does not mean a longer loan is cheaper overall. While longer terms yield lower APR spreads, they accumulate significantly higher total dollar interest over time. Review full amortization cash flows with the{" "}
          <Link href="/calculators/amortization-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Amortization Calculator
          </Link>.
        </p>
      </section>

      {/* 8. MORTGAGE APR AND DISCOUNT POINTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Mortgage APR and Discount Points
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Mortgage loans frequently involve discount points paid upfront to lower the nominal interest rate. One mortgage point equals 1.0% of the loan amount. In our validated baseline ($350,000 home, $70,000 down payment, $280,000 loan, 6.2% rate, $3,500 loan fees, 0.5 points):
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Points Fee (0.5% on $280k): <strong>$1,400</strong></div>
          <div>• Total Upfront Fees: $3,500 + $1,400 = <strong>$4,900</strong></div>
          <div>• Amount Financed: $280,000 - $4,900 = <strong>$275,100</strong></div>
          <div>• Monthly Payment: <strong>$1,714.91/month</strong></div>
          <div>• Modeled Mortgage APR: <strong>6.367%</strong></div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Buying points increases upfront fees but reduces monthly interest payments. If you plan to retain the mortgage past the breakeven threshold, paying points can reduce total borrowing costs over the full term.
        </p>
      </section>

      {/* 9. CREDIT CARD APR PAYOFF */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Credit Card APR and Revolving Debt Payoff
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Revolving credit accounts operate differently from fixed installment loans. Credit cards calculate finance charges using daily periodic rates on fluctuating balances. Under our validated baseline ($5,000 balance, 21.99% APR, +$50 extra monthly payment):
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Payoff Timeline: <strong>74 Months (6.2 Years)</strong> vs. 268 Months (22.3 Years on Minimum Only)</div>
          <div>• Total Interest Paid: <strong>$3,227</strong> (Total Outflow: $8,227)</div>
          <div>• Lifetime Interest Saved: <strong>$8,572</strong> ($11,799 - $3,227)</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For specialized card payoff strategies including snowball and avalanche simulations, use the{" "}
          <Link href="/calculators/credit-card-payoff-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Credit Card Payoff Calculator
          </Link>.
        </p>
      </section>

      {/* 10. REVERSE TARGET APR SOLVER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. Reverse Target APR & Borrowing Capacity Solver
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The reverse solver works backward from a target monthly payment, loan term, and maximum acceptable APR ceiling. In our validated example ($500/mo payment, 5 years, 7.5% target APR, $1,000 fees):
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Present Value of $500/mo Annuity: <strong>$24,953.25</strong></div>
          <div>• Maximum Allowable Gross Loan: $24,953 + $1,000 = <strong>$25,953</strong></div>
          <div>• Modeled Finance Charges: ($500 × 60) - $24,953 = <strong>$5,047</strong></div>
        </div>
      </section>

      {/* 11. 3-LOAN COMPARISON MATRIX */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. Side-by-Side 3-Loan APR Comparison Matrix
        </h2>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• <strong>Offer A (5.5% Nominal, $3,000 Fees):</strong> Real APR = 6.171% | $1,085.26/mo | Total Cost = $130,231.53 (Best Value)</div>
          <div>• <strong>Offer B (6.0% Nominal, $1,000 Fees):</strong> Real APR = 6.223% | $1,110.21/mo | Total Cost = $133,224.60</div>
          <div>• <strong>Offer C (6.5% Nominal, $0 Fees):</strong> Real APR = 6.500% | $1,135.48/mo | Total Cost = $136,257.57</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The engine's "Best Value" rating is determined deterministically by the lowest modeled Real APR. For auto financing comparisons, explore the{" "}
          <Link href="/calculators/auto-loan-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Auto Loan Calculator
          </Link>.
        </p>
      </section>

      {/* 12. PREPAYMENT AND REALIZED APR */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. Prepayment and Effective Realized APR
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          When borrowers make extra principal payments or refinance early, the actual realized APR increases because upfront fees are amortized over a compressed holding duration. In our validated example ($25,000 loan @ 7.0%, $500 fee, +$100 extra payment):
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Original Term: 60 Months → Accelerated Term: <strong>49 Months (11 Months Saved)</strong></div>
          <div>• Interest Saved: <strong>$939</strong> ($4,702 - $3,763)</div>
          <div>• Disclosed 60-Month APR: 7.844% → Accelerated Realized APR: <strong>8.629%</strong></div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For refinancing evaluations where upfront closing fees must be weighed against lower monthly payments, use the{" "}
          <Link href="/calculators/refinance-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Refinance Calculator
          </Link>.
        </p>
      </section>

      {/* 13. APR VS APY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. APR vs. Annual Percentage Yield (APY)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          APR and APY serve fundamentally different purposes in finance:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">APR (Borrowing Cost)</div>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Measures annualized borrowing costs on debt without compounding interest within the annual period.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">APY (Savings / Investment Yield)</div>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Measures the effective annual rate of return on deposits factoring in intra-year compound interest.
            </p>
          </div>
        </div>
      </section>

      {/* 14. INCLUDED VS EXCLUDED FEES UNDER TILA */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. Fees Included vs. Excluded in TILA Mortgage APR
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">Fees INCLUDED in APR</h3>
            <ul className="space-y-1 text-slate-700 dark:text-slate-300 list-disc list-inside font-normal">
              <li>Lender origination & processing fees</li>
              <li>Discount points (paid to buy down rate)</li>
              <li>Underwriting and document preparation fees</li>
              <li>Private Mortgage Insurance (PMI / MIP)</li>
              <li>Escrow administration & broker fees</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm">Fees EXCLUDED from APR</h3>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside font-normal">
              <li>Home appraisal and pest inspection fees</li>
              <li>Title insurance and title search fees</li>
              <li>Attorney fees and notary charges</li>
              <li>Property taxes and hazard insurance reserves</li>
              <li>Recording and government transfer taxes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 15. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. Common APR Calculator Mistakes to Avoid
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li><strong>Comparing nominal rates while ignoring upfront fees:</strong> A lower headline rate with high closing costs can produce a higher overall borrowing cost.</li>
            <li><strong>Comparing APRs across different loan terms without adjusting for fee amortization:</strong> Shorter terms inherently concentrate upfront fees over fewer months.</li>
            <li><strong>Treating APR as an exact prediction of realized cost after early payoff:</strong> Refinancing or selling early increases the effective realized APR.</li>
            <li><strong>Assuming every closing cost is included in APR:</strong> Third-party appraisal, title, and escrow fees are generally excluded under TILA.</li>
            <li><strong>Treating discount points as an ordinary rate discount:</strong> Points require cash upfront at closing and require an extended holding period to break even.</li>
            <li><strong>Comparing revolving credit card APR directly with fixed mortgage APR:</strong> Card interest compounds on daily balances, whereas installment loans use fixed amortization.</li>
            <li><strong>Treating calculator APR as an official lender disclosure:</strong> Actual lender disclosures depend on final underwriting and settlement charges.</li>
            <li><strong>Assuming the lowest APR is automatically the best choice for every borrower:</strong> If you plan to move within a few years, a no-fee loan with a slightly higher APR may cost less overall.</li>
            <li><strong>Ignoring monthly payment cash flow:</strong> A lower APR on a 15-year term requires much higher monthly cash outflow than a 30-year loan.</li>
            <li><strong>Treating 740+ credit scores as guaranteed approval thresholds:</strong> Debt ratios, down payment size, and income documentation also govern lender underwriting.</li>
          </ul>
        </div>
      </section>

      {/* 16. CORE FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          15. Core APR Mathematical Formulas
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
          <div>• <strong>Monthly Payment:</strong> PMT = P × [r(1+r)^N] ÷ [(1+r)^N - 1]</div>
          <div>• <strong>Amount Financed:</strong> Loan Principal - Upfront Financing Fees</div>
          <div>• <strong>Present Value Identity:</strong> Amount Financed = Σ (Payment_t ÷ (1 + r)^t)</div>
          <div>• <strong>Annualized Real APR:</strong> Monthly Periodic Rate (r) × 12 × 100%</div>
          <div>• <strong>Discount Points Fee:</strong> Loan Principal × Points Percentage</div>
          <div>• <strong>Reverse Loan Capacity:</strong> PV(Target Payment Annuity @ Target APR) + Upfront Fees</div>
        </div>
      </section>

      {/* 17. YMYL AND REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Regulatory Disclosure & Consumer Notice</span>
        </div>
        <p>
          This APR calculator is designed for educational comparison purposes under Truth in Lending Act (TILA) principles and does not replace official lender Loan Estimates, Closing Disclosures, or formal underwriting commitments. Actual APRs and terms are determined by licensed mortgage and lending institutions.
        </p>
      </section>
    </div>
  );
}

export default APRContent;

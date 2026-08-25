"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Info } from "lucide-react";

export function InterestRateContent() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Interest Rate Calculator
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          Calculate implied loan interest rates, investment returns, periodic contribution growth rates, APY/EAR conversions, and after-tax inflation-adjusted real purchasing-power yields.
        </p>
      </div>

      {/* 2. WHAT IS AN INTEREST RATE CALCULATOR? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. What Is an Interest Rate Calculator?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          An interest rate calculator works backward from known financial values to estimate the rate that makes those values mathematically consistent. For a loan, that means starting with the principal, monthly payment, and loan term, then solving for the implied annual interest rate. For an investment, it means starting with the starting principal, ending balance, contribution pattern, and time horizon to solve for the annualized growth rate.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          That makes an interest rate calculator fundamentally different from a conventional payment calculator. A payment calculator starts with the interest rate and determines the payment. An interest rate solver starts with the payment and solves for the rate.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          When the main question is simply "What will my loan payment be at a given rate?", the{" "}
          <Link href="/calculators/loan-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Loan Calculator
          </Link>{" "}
          is the direct tool. When the question is "What interest rate does this payment imply?", this Interest Rate Calculator is the appropriate starting point.
        </p>
      </section>

      {/* 3. WHAT CAN THIS CALCULATOR SOLVE? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. What Can This Calculator Solve?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Amortized Loan Rate Solver</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Solves the implied nominal borrowing rate and true APR from loan amount, term, payment, fees, and balloon balances.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Lump-Sum Investment Yield</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Solves annual nominal growth and APY from starting principal, ending balance, time horizon, and compounding frequency.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Periodic Contribution Solver</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Solves required growth rate from starting balance, recurring deposits, frequency, target balance, and deposit timing.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">APR / APY / EAR Converter</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Converts between nominal annual rates and compounding yields across annual, quarterly, monthly, daily, and continuous periods.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 sm:col-span-2 md:col-span-2">
            <span className="font-extrabold text-blue-600">Fisher Real After-Tax Return</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Computes net purchasing power yield by accounting for tax drag and inflation using the exact Fisher relationship.
            </p>
          </div>
        </div>
      </section>

      {/* 4. HOW TO CALCULATE LOAN INTEREST RATE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. How to Calculate an Interest Rate From a Loan Payment
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator solves for the periodic interest rate r that satisfies the present value equation for an amortized loan:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"P = PMT × [ (1 - (1 + r)^(-N)) / r ]"}</div>
          <div className="text-[11px] text-slate-500 pt-1">
            Where: P = principal loan amount, PMT = periodic payment, r = periodic rate, N = total number of payment periods.
          </div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Because r appears both inside the compound discount term and in the denominator, there is no closed-form algebraic rearrangement that isolates r. The engine therefore uses iterative numerical root solving.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For a full month-by-month principal and interest amortization breakdown, explore the{" "}
          <Link href="/calculators/amortization-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Amortization Calculator
          </Link>.
        </p>
      </section>

      {/* 5. VALIDATED LOAN EXAMPLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Validated Loan Example: $32,000 at $960 Per Month
        </h2>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Loan Amount: $32,000 | Term: 3 Years (36 Months) | Payment: $960.00/mo</div>
          <div>• Solved Monthly Rate: <strong>0.00422067</strong> (0.4221% per month)</div>
          <div>• Solved Nominal Annual Rate: <strong>5.0648%</strong></div>
          <div>• Total Contractual Repayment: 36 × $960 = <strong>$34,560.00</strong></div>
          <div>• Total Interest Paid: $34,560 - $32,000 = <strong>$2,560.00</strong></div>
          <div>• Interest-to-Principal Ratio: <strong>8.00%</strong> ($2,560 ÷ $32,000 × 100)</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The amortization schedule reconciles to an exact $0.00 terminal balance at Month 36.
        </p>
      </section>

      {/* 6. WHY NUMERICAL METHODS ARE NEEDED */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Dual Numerical Root-Solving Architecture
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          To guarantee sub-millisecond convergence without numerical instability or division-by-zero singularities, the engine deploys a dual strategy:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">1. Newton-Raphson Iteration</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Uses an analytical first derivative to rapidly converge quadratically to 8 decimal places within 10–15 iterations.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">2. Bracketed Bisection Fallback</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              If initial derivative slope is zero or near a singularity, the engine falls back to bracketed bisection to guarantee convergence.
            </p>
          </div>
        </div>
      </section>

      {/* 7. MONTHLY PAYMENT SENSITIVITY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Monthly Payment Sensitivity Analysis
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Holding loan principal ($32,000) and term (36 months) constant, varying the monthly payment demonstrates monotonic interest rate sensitivity:
        </p>
        <div className="grid grid-cols-3 gap-3 text-xs font-mono text-center">
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 block text-[10px]">$900/Month</span>
            <span className="font-extrabold text-blue-600">0.812% Rate</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 block text-[10px]">$960/Month</span>
            <span className="font-extrabold text-blue-600">5.0648% Rate</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 block text-[10px]">$1,000/Month</span>
            <span className="font-extrabold text-blue-600">7.915% Rate</span>
          </div>
        </div>
      </section>

      {/* 8. BALLOON PAYMENTS AND UPFRONT FEES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Balloon Payments and Upfront Fees (True APR)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          When a loan includes a final lump-sum balloon payment at maturity, less principal is amortized across monthly installments, which increases the implied borrowing rate for the same monthly payment.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Upfront financing fees reduce the net amount financed while monthly payments remain unchanged, producing a True APR higher than the nominal rate (e.g. $1,000 fees on $32,000 increases True APR from 5.0648% to 7.242%). For dedicated APR fee modeling, use the{" "}
          <Link href="/calculators/apr-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            APR Calculator
          </Link>.
        </p>
      </section>

      {/* 9. LUMP-SUM INVESTMENT RETURN SOLVER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Lump-Sum Investment Return Solver
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The investment module calculates the annualized compound growth rate required to grow a starting principal PV into a target ending balance FV:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"• Discrete Compounding: r = m × [ (FV / PV)^(1 / (m × t)) - 1 ]"}</div>
          <div>{"• Continuous Compounding: r = ln(FV / PV) / t"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          In our validated baseline ($5,000 growing to $8,000 over 5 years with monthly compounding):
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Annual Nominal Rate: <strong>9.437%</strong> | Effective Annual Rate (APY): <strong>9.856%</strong></div>
          <div>• Total Capital Gain: <strong>$3,000.00</strong> | Percentage ROI: <strong>60.00%</strong></div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For future balance projections where the growth rate is already known, explore the{" "}
          <Link href="/calculators/future-value-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Future Value Calculator
          </Link>.
        </p>
      </section>

      {/* 10. COMPOUNDING FREQUENCY COMPARISON MATRIX */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. Compounding Frequency and APY Invariant
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For the identical $5,000 → $8,000 five-year growth target, more frequent compounding requires a lower nominal interest rate to achieve the exact same 9.856% effective annual yield:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Annual Compounding: Nominal <strong>9.856%</strong> | APY: 9.856%</div>
          <div>• Quarterly Compounding: Nominal <strong>9.511%</strong> | APY: 9.856%</div>
          <div>• Monthly Compounding: Nominal <strong>9.437%</strong> | APY: 9.856%</div>
          <div>• Daily Compounding: Nominal <strong>9.401%</strong> | APY: 9.856%</div>
          <div>• Continuous Compounding: Nominal <strong>9.394%</strong> (~9.4%) | APY: 9.856%</div>
        </div>
      </section>

      {/* 11. PERIODIC CONTRIBUTION SOLVER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. Periodic Contribution Investment Rate Solver
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          When regularly depositing capital into an investment account, the required growth rate is solved via the future value of an annuity equation:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Starting Balance: $5,000 | Monthly Contribution: $300 | Target: $50,000 | Term: 8 Years</div>
          <div>• Total Contributed: <strong>$33,800.00</strong> ($5,000 + $300 × 96)</div>
          <div>• Total Interest Earned: <strong>$16,200.00</strong></div>
          <div>• Required Annual Growth Rate (Ordinary End): <strong>8.150%</strong> (APY: 8.462%)</div>
          <div>• Required Annual Growth Rate (Due Beginning): <strong>7.935%</strong> (Receives extra compounding interval)</div>
        </div>
      </section>

      {/* 12. RATE CONVERTER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. APR vs. APY vs. EAR Comprehensive Rate Converter
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The converter translates stated nominal rates into effective annual compounding yields:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Stated Nominal Rate (Monthly Compounded): <strong>6.0000%</strong></div>
          <div>• Effective Annual Rate (APY / EAR): <strong>6.1678%</strong> {"via (1 + 0.06/12)^12 - 1"}</div>
          <div>• Daily Compounded APR Equivalent: <strong>5.9855%</strong></div>
          <div>• Continuous Rate Equivalent: <strong>5.985%</strong> (5.9855%)</div>
        </div>
      </section>

      {/* 13. REAL AFTER-TAX RETURN */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. Real After-Tax Return & The Fisher Relationship
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Nominal investment yields do not represent real increases in purchasing power because taxes and inflation erode gross returns:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Nominal Return: 8.0% | Marginal Tax Rate: 25.0% | Inflation Rate: 3.0%</div>
          <div>• After-Tax Nominal Yield: 8.0% × (1 - 0.25) = <strong>6.000%</strong> (Tax Drag: -2.0%)</div>
          <div>• Real Purchasing Power Yield: {"(1 + 0.06) / (1 + 0.03) - 1 ="} <strong>2.913%</strong></div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For standalone purchasing power analyses across historical economic cycles, use the{" "}
          <Link href="/calculators/inflation-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Inflation Calculator
          </Link>.
        </p>
      </section>

      {/* 14. SIMPLE VS COMPOUND INTEREST */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. Simple Interest vs. Compound Interest
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">{"Simple Interest: I = P × r × t"}</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Calculated strictly on the initial principal. Payouts remain constant without compounding growth. Compare performance in our{" "}
              <Link href="/calculators/roi-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                ROI Calculator
              </Link>.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">{"Compound Interest: A = P(1 + r/m)^(m×t)"}</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Interest is periodically reinvested, accelerating wealth accumulation exponentially over multi-year investment horizons.
            </p>
          </div>
        </div>
      </section>

      {/* 15. RULE OF 72 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. The Rule of 72 Doubling Time Heuristic
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          {"The Rule of 72 is a mental-math rule of thumb for estimating how many years it takes for an investment to double at a fixed annual rate: Doubling Time ≈ 72 / r. At an 8.0% annual rate, capital doubles in approximately 72 / 8 = 9 years. It serves as a handy approximation rather than an exact compounding equation."}
        </p>
      </section>

      {/* 16. WORKED EXAMPLE AUTO LOAN */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          15. Worked Example: Auto Loan Rate Solver ($25,000, 48 Months, $580/mo)
        </h2>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Loan Amount: $25,000 | Term: 48 Months | Monthly Payment: $580.00</div>
          <div>• Exact Solved Monthly Rate: <strong>0.004480</strong></div>
          <div>• Exact Stated Nominal Annual Rate: <strong>5.376%</strong> (yields exact $580.00 payment)</div>
          <div>• Note: A 5.42% nominal rate corresponds to a $580.49 monthly payment; backward solving from exactly $580.00 yields 5.376%.</div>
        </div>
      </section>

      {/* 17. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          16. Common Interest Rate Calculator Mistakes to Avoid
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li><strong>Using a payment without verifying whether it includes fees:</strong> Taxes, insurance, and warranty fees distort implied interest rate calculations.</li>
            <li><strong>Comparing interest rates across different compounding frequencies:</strong> A 6% rate compounded daily yields more than 6% compounded annually.</li>
            <li><strong>Confusing borrowing APR with investment APY:</strong> APR reflects annualized borrowing costs with fees; APY reflects compounding investment yields.</li>
            <li><strong>Ignoring balloon payments at maturity:</strong> Omitting a balloon underestimates the true implied borrowing rate.</li>
            <li><strong>Ignoring upfront financing charges:</strong> Origination fees reduce net cash received and increase True APR.</li>
            <li><strong>Treating a numerical root solver as a direct algebraic formula:</strong> Amortized rates require iterative numerical approximation.</li>
            <li><strong>Rounding rates prematurely:</strong> Retain high internal floating precision before annualizing.</li>
            <li><strong>Confusing nominal gross yield with real purchasing-power growth:</strong> High inflation can turn positive nominal gains into negative real yields.</li>
            <li><strong>Ignoring tax drag on taxable savings:</strong> Ordinary income taxes significantly reduce net compounding.</li>
            <li><strong>Assuming inflation remains constant:</strong> Purchasing power fluctuates across economic cycles.</li>
            <li><strong>Treating the Rule of 72 as an exact formula:</strong> It is a simplified heuristic.</li>
            <li><strong>Assuming central bank rate changes translate 1:1 into consumer loan rates:</strong> Lender credit risk, bond yields, and margins determine consumer rates.</li>
            <li><strong>Treating projected investment returns as guaranteed:</strong> Market returns fluctuate based on asset allocation and market volatility.</li>
          </ul>
        </div>
      </section>

      {/* 18. CORE FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          17. Core Interest Rate Formulas Reference
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
          <div>{"• Amortized Loan Rate: P = PMT × [ (1 - (1+r)^(-N)) / r ] (Solved numerically via Newton-Raphson)"}</div>
          <div>{"• Balloon Loan: P = PMT × [ (1 - (1+r)^(-N)) / r ] + Balloon × (1+r)^(-N)"}</div>
          <div>{"• Lump-Sum Discrete Return: r = m × [ (FV / PV)^(1 / (m × t)) - 1 ]"}</div>
          <div>{"• Lump-Sum Continuous Return: r = ln(FV / PV) / t"}</div>
          <div>{"• Ordinary Annuity: FV = PV(1+r)^N + PMT × [ ((1+r)^N - 1) / r ]"}</div>
          <div>{"• Effective Annual Rate (APY): EAR = (1 + r/m)^m - 1"}</div>
          <div>{"• Fisher Real Return: r_real = [ (1 + r_nominal × (1 - tax)) / (1 + inflation) ] - 1"}</div>
        </div>
      </section>

      {/* 19. YMYL AND REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Financial Planning & Regulatory Notice</span>
        </div>
        <p>
          This interest rate calculator is an educational mathematical modeling tool. Actual loan approvals, interest rates, APR disclosures, investment returns, and tax obligations depend on formal lender underwriting, contractual terms, market conditions, and applicable tax regulations.
        </p>
      </section>
    </div>
  );
}

export default InterestRateContent;

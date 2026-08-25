"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Info } from "lucide-react";

export function CdContent() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          CD Calculator
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          Calculate CD maturity value, interest, APY, after-tax growth, inflation-adjusted value, early-withdrawal penalties, CD ladder results and CD vs HYSA comparisons.
        </p>
      </div>

      {/* 2. WHAT IS A CD CALCULATOR? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. What Is a CD Calculator?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A CD calculator estimates how a certificate of deposit can grow over a defined term using the starting deposit, annual rate or APY, compounding frequency, and other assumptions. A more advanced CD calculator goes beyond the maturity balance to estimate after-tax interest, inflation-adjusted purchasing power, CD ladder outcomes, early-withdrawal costs, break-even periods, and the starting deposit required to reach a target balance.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A certificate of deposit is generally a time-deposit product where money is committed for a specified period in exchange for a stated or otherwise defined return. The trade-off is usually liquidity: a conventional CD can provide a predictable return under the selected assumptions, while accessing the money before maturity may involve product-specific penalties or restrictions.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          For a broader comparison of flexible savings strategies, the{" "}
          <Link href="/calculators/savings-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Savings Calculator
          </Link>{" "}
          can be used alongside this calculator. For pure return comparisons across different asset classes, our{" "}
          <Link href="/calculators/roi-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            ROI Calculator
          </Link>{" "}
          provides a useful companion scenario.
        </p>
      </section>

      {/* 3. HOW TO USE THE CD CALCULATOR */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. How to Use the CD Calculator
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Start by entering the amount you plan to deposit. Then select the CD term, enter the rate or APY used by the model, and choose the compounding frequency.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Fixed-CD Maturity Growth</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Review final balance, gross pre-tax interest, effective APY, tax drag, net after-tax return, and real purchasing-power balance.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Multi-Tier CD Ladder</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Spread capital across multiple staggered maturities to balance long-term yields with annual liquidity events.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">CD vs. HYSA Comparator</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Test rate-lock protection against a modeled decaying savings account yield path during central bank rate cuts.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Early Withdrawal Penalty</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Calculate accrued interest, penalty deductions, net early payout, and break-even months for switching to a higher rate.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Target Savings Goal Solver</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Work backward from a target maturity sum to find the exact initial principal required today.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Specialty CD Simulator</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Compare No-Penalty liquid CDs and Bump-Up CDs against traditional fixed-rate certificates.
            </p>
          </div>
        </div>
      </section>

      {/* 4. HOW CD INTEREST IS CALCULATED */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. How CD Interest Is Calculated
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For a standard fixed-rate compound-growth model:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"A = P × (1 + r/n)^(n×t)"}</div>
          <div className="text-[11px] text-slate-500 pt-1">
            Where: A = maturity balance, P = starting principal, r = nominal annual rate, n = compounding periods per year (365 for daily, 12 for monthly), t = time in years.
          </div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A daily-compounded CD uses 365 compounding intervals per year, producing slightly higher terminal growth than monthly or annual compounding under the same nominal rate.
        </p>
      </section>

      {/* 5. VALIDATED BASELINE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Validated Baseline: $10,000 CD at 5.0%
        </h2>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Starting Deposit: $10,000 | Term: 12 Months | Nominal Rate: 5.0% (Daily Compounding)</div>
          <div>• Marginal Tax Rate: 24% | Expected Inflation Rate: 2.5%</div>
          <div>• Compound Maturity Balance: <strong>$10,512.67</strong></div>
          <div>• Gross Pre-Tax Total Interest: <strong>+$512.67</strong></div>
          <div>• Effective Annual Percentage Yield (APY): <strong>5.127%</strong></div>
          <div>• Modeled Tax Drag (24%): <strong>-$123.04</strong></div>
          <div>• Net After-Tax Interest: <strong>+$389.63</strong> | Net After-Tax Balance: <strong>$10,389.63</strong></div>
          <div>• Real Inflation-Adjusted Balance: <strong>$10,136.23</strong> {"($10,389.63 ÷ 1.025)"}</div>
        </div>
      </section>

      {/* 6. APY VS NOMINAL CD RATE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. APY vs. Nominal CD Rate
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A CD&apos;s nominal rate and APY are related, but they are not identical metrics. The nominal annual rate does not reflect intra-year compounding, while APY reflects the true effective annual yield:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"APY = (1 + r/n)^n - 1"}</div>
          <div>• With a 5.0% nominal rate compounded daily: <strong>APY ≈ 5.127%</strong></div>
          <div>• With a 5.0% nominal rate compounded monthly: <strong>APY ≈ 5.116%</strong></div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          When comparing CD offers across different banks, always verify whether quotes represent nominal APR or APY. For general rate conversions, use our{" "}
          <Link href="/calculators/interest-rate-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Interest Rate Calculator
          </Link>.
        </p>
      </section>

      {/* 7. AFTER-TAX CD GROWTH */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. After-Tax CD Growth & Tax Drag
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Interest earned on CDs held in standard taxable accounts is subject to federal and state income tax as ordinary income in the year it is credited.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Gross Interest: $512.67 | Tax Rate: 24%</div>
          <div>• Modeled Tax Drag: <strong>$123.04</strong> ($512.67 × 0.24)</div>
          <div>• Net Take-Home Interest: <strong>$389.63</strong> | Net Balance: <strong>$10,389.63</strong></div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Holding CDs inside tax-advantaged accounts (such as Traditional or Roth IRAs) defers or eliminates this annual tax drag.
        </p>
      </section>

      {/* 8. INFLATION-ADJUSTED CD VALUE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Inflation-Adjusted CD Value & Purchasing Power
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A CD can grow in nominal dollars while adding much less purchasing power in real terms:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"Real Purchasing Power Balance = After-Tax Balance ÷ (1 + Inflation)^t"}</div>
          <div>{"$10,389.63 ÷ 1.025^1 = "}<strong>$10,136.23</strong></div>
          <div>• Real Net Purchasing Power Gain: <strong>+$136.23</strong></div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For standalone purchasing power analyses across historical and custom inflation scenarios, explore the{" "}
          <Link href="/calculators/inflation-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Inflation Calculator
          </Link>.
        </p>
      </section>

      {/* 9. MONTHLY CD SCHEDULE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Month-by-Month CD Compounding Progression
        </h2>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Month 1: Beg Bal: $10,000.00 | Interest: +$41.75 | End Bal: $10,041.75 | Real: $10,011.11</div>
          <div>• Month 2: Beg Bal: $10,041.75 | Interest: +$41.93 | End Bal: $10,083.68 | Real: $10,022.26</div>
          <div>• Month 3: Beg Bal: $10,083.68 | Interest: +$42.10 | End Bal: $10,125.78 | Real: $10,033.46</div>
          <div>• Month 6: Beg Bal: $10,210.50 | Interest: +$42.63 | End Bal: $10,253.13 | Real: $10,067.32</div>
          <div>• Month 12: Terminal Ending Balance: <strong>$10,512.67</strong> | Cumulative Tax: $123.04 | Real: <strong>$10,136.23</strong></div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For amortized loan schedules where balances decrease rather than compound upward, see the{" "}
          <Link href="/calculators/amortization-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Amortization Calculator
          </Link>.
        </p>
      </section>

      {/* 10. WHAT IS A CD LADDER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. What Is a CD Ladder Strategy?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A CD ladder divides a larger cash balance across several CDs with staggered maturity dates (e.g. 1-year, 2-year, 3-year, 4-year, and 5-year CDs). This provides predictable annual cash liquidity while capturing higher long-term fixed rates.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Total Ladder Capital: $25,000 across 5 Stages ($5,000 per tranche)</div>
          <div>• Tranche 1 (1 Yr @ 4.25% APY): Maturity = <strong>$5,212.50</strong></div>
          <div>• Tranche 2 (2 Yr @ 4.50% APY): Maturity = <strong>$5,460.12</strong></div>
          <div>• Tranche 3 (3 Yr @ 4.75% APY): Maturity = <strong>$5,746.88</strong></div>
          <div>• Tranche 4 (4 Yr @ 5.00% APY): Maturity = <strong>$6,077.53</strong></div>
          <div>• Tranche 5 (5 Yr @ 5.25% APY): Maturity = <strong>$6,457.74</strong></div>
          <div>• Compounded 5-Year Ladder Total: <strong>$28,954.78</strong> | Blended Average APY: <strong>4.75%</strong></div>
          <div>• Annual Cash Liquidity Event: <strong>$5,000.00</strong></div>
        </div>
      </section>

      {/* 11. CD VS HYSA COMPARISON */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. CD vs. High-Yield Savings Account (HYSA) Yield Comparator
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          When central banks cut interest rates, variable HYSA yields drop automatically, whereas a fixed CD locks in guaranteed interest:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Deposit Amount: $20,000 | Term: 24 Months</div>
          <div>• Fixed CD @ 5.25% APY: Ending Return = <strong>$22,155.13</strong></div>
          <div>• Variable HYSA (4.50% starting with 1.0%/yr drop): Ending Return = <strong>$21,465.75</strong></div>
          <div>• <strong>CD Rate-Lock Advantage: +$689.38 (+3.45%)</strong></div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For flexible deposits where liquidity is paramount, compare with the{" "}
          <Link href="/calculators/savings-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Savings Calculator
          </Link>.
        </p>
      </section>

      {/* 12. EARLY WITHDRAWAL PENALTY & BREAK-EVEN */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. Early Withdrawal Penalties & Break-Even Timeline
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Breaking a CD before maturity triggers early withdrawal penalties (typically 90 to 180 days of simple interest):
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Principal: $15,000 | Term: 24 Months | CD Rate: 4.8% APY | Penalty: 180 Days</div>
          <div>• Exit at Month 6: Gross Interest Earned = +$355.78</div>
          <div>• Penalty Deduction: -$355.07 {"($15,000 × 0.048/365 × 180)"}</div>
          <div>• Net Interest Received: <strong>+$0.71</strong> | Net Payout: <strong>$15,000.71</strong></div>
          <div>• Break-Even for 5.8% Replacement Rate: <strong>29 Months</strong></div>
        </div>
      </section>

      {/* 13. TARGET SAVINGS GOAL SOLVER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. CD Maturity Goal Solver
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Solve backward to determine how much capital must be deposited today to achieve a specific future balance:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"P = Target ÷ (1 + APY)^t"}</div>
          <div>• Target: $50,000 | APY: 5.0% | Term: 3 Years</div>
          <div>• Required Initial Principal Deposit: <strong>$43,191.88</strong></div>
          <div>• Modeled Total Interest Earned: <strong>+$6,808.12</strong> (Growth: +15.76%)</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For recurring contribution schedules, model projections with the{" "}
          <Link href="/calculators/future-value-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Future Value Calculator
          </Link>.
        </p>
      </section>

      {/* 14. SPECIALTY CDS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. Specialty CDs: No-Penalty & Bump-Up Structures
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">No-Penalty (Liquid) CD</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Allows penalty-free withdrawals after 7 days from funding in exchange for a modest yield spread ($10,000 at 4.75% standard vs 4.50% liquid yields $10,450 vs $10,475, a -$25 liquidity cost).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Bump-Up CD</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Permits a one-time interest rate increase if prevailing market yields rise during the term, providing upside protection in rising-rate environments.
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For international or country-specific fixed-term bank deposits, see our{" "}
          <Link href="/calculators/fd-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            FD Calculator
          </Link>.
        </p>
      </section>

      {/* 15. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. Common CD Mistakes to Avoid
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li><strong>Comparing CD APY directly with nominal savings APR:</strong> APY includes compounding; nominal APR does not.</li>
            <li><strong>Ignoring the compounding frequency:</strong> Daily compounding yields more than quarterly or annual compounding.</li>
            <li><strong>Forgetting tax drag on credited interest:</strong> Ordinary income taxes reduce net yield every year.</li>
            <li><strong>Ignoring inflation drag:</strong> High inflation can erode real purchasing power despite positive nominal interest.</li>
            <li><strong>Assuming early exit is cost-free:</strong> Penalties can exceed accrued interest and erode principal if withdrawn too early.</li>
            <li><strong>Assuming penalty terms are identical across institutions:</strong> Penalty days vary significantly by bank and term.</li>
            <li><strong>Locking emergency reserves into non-liquid long-term CDs:</strong> Maintain liquid emergency funds before locking cash.</li>
            <li><strong>Assuming the highest APY is universally best:</strong> Longer terms reduce liquidity and create reinvestment risk.</li>
            <li><strong>Assuming CD ladders always outperform single CDs:</strong> Ladders trade maximum yield for staggered liquidity.</li>
            <li><strong>Assuming No-Penalty CDs are always superior:</strong> Lower APYs reduce total interest over full holding periods.</li>
            <li><strong>Treating HYSA rate decline comparisons as guaranteed forecasts:</strong> Market rate paths fluctuate based on central bank policy.</li>
            <li><strong>Assuming deposit insurance coverage is unlimited:</strong> FDIC/NCUA coverage applies up to $250,000 per depositor, per institution.</li>
            <li><strong>Treating calculator tax output as personal tax advice:</strong> Individual tax situations vary based on state and bracket.</li>
            <li><strong>Prematurely rounding intermediate numbers:</strong> Retain full floating-point precision when modeling multi-year growth.</li>
          </ul>
        </div>
      </section>

      {/* 16. CORE FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          15. Core CD Formulas Reference
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
          <div>{"• Fixed-Rate Compound Growth: A = P(1 + r/n)^(nt)"}</div>
          <div>{"• Annual Percentage Yield: APY = (1 + r/n)^n - 1"}</div>
          <div>{"• Tax Drag: Tax Drag = Pre-Tax Interest × Marginal Tax Rate"}</div>
          <div>{"• Net After-Tax Balance: After-Tax Balance = Principal + Pre-Tax Interest - Tax Drag"}</div>
          <div>{"• Real Inflation-Adjusted Balance: Real Balance = After-Tax Balance ÷ (1 + Inflation)^t"}</div>
          <div>{"• Goal Solver Required Principal: P = Target ÷ (1 + APY)^t"}</div>
          <div>{"• CD Ladder Tranche: Maturity = Tranche Principal × (1 + Tranche APY)^Term"}</div>
          <div>{"• Early Exit Penalty: Penalty = Principal × (APY / 365) × PenaltyDays"}</div>
        </div>
      </section>

      {/* 17. YMYL AND REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Deposit Insurance & Financial Planning Notice</span>
        </div>
        <p>
          This CD calculator is an educational mathematical modeling tool. Eligible deposits at participating banks and credit unions may qualify for deposit insurance through the FDIC or NCUA subject to applicable $250,000 coverage limits and ownership-category rules. Exact CD terms, early-withdrawal penalties, renewal grace periods, and tax obligations depend on your specific financial institution and individual tax circumstances.
        </p>
      </section>
    </div>
  );
}

export default CdContent;

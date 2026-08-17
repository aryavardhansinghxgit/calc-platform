"use client";

import React from "react";

export function CdContent() {
  return (
    <div className="space-y-3 text-black dark:text-white font-medium leading-normal max-w-4xl mx-auto text-xs">
      {/* H1 Title */}
      <div className="border-b border-slate-300 dark:border-slate-700 pb-2">
        <h1 className="text-xl font-black text-black dark:text-white tracking-tight">
          CD Calculator — Certificate of Deposit Interest & APY Growth
        </h1>
        <p className="text-xs text-black dark:text-white mt-0.5">
          Fixed-Income CD Engine, Rolling Multi-Tier Ladder Builder, HYSA Yield Comparator, Early Exit Penalty Solver & Fisher Inflation Drag Analysis.
        </p>
      </div>

      {/* SECTION 1: WHAT IS A CD & FDIC INSURANCE */}
      <section className="space-y-2">
        <h2 className="text-base font-bold text-black dark:text-white tracking-tight">
          What is a Certificate of Deposit (CD)? How CDs Work
        </h2>
        <p className="leading-relaxed">
          A <strong>Certificate of Deposit (CD)</strong> is a low-risk time-deposit financial contract issued by commercial banks and credit unions. When an investor deposits capital into a CD, they agree to leave the principal untouched for a pre-determined duration (ranging from 3 months to 5 years). In exchange for this commitment, the financial institution guarantees a fixed interest rate that significantly outperforms basic savings accounts.
        </p>
        <p className="leading-relaxed">
          CDs are backed by government-sponsored insurance protections up to <strong>$250,000 per depositor, per insured institution</strong> through the Federal Deposit Insurance Corporation (FDIC) for banks or the National Credit Union Administration (NCUA) for credit unions. This makes CDs virtually risk-free from credit default.
        </p>
      </section>

      {/* SECTION 2: MATHEMATICAL FORMULAS */}
      <section className="space-y-2">
        <h2 className="text-base font-bold text-black dark:text-white tracking-tight">
          How to Calculate CD Earnings (Step-by-Step Mathematical Guide)
        </h2>
        <p className="leading-relaxed">
          The future balance of a CD depends on the principal $P$, the nominal interest rate $r$, the compounding frequency $n$, and the term duration $t$ in years:
        </p>

        <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 space-y-2 font-mono">
          <div>
            <div className="font-bold text-black dark:text-white text-xs font-sans">1. Compound Interest Balance Formula</div>
            <div className="p-2 bg-white dark:bg-slate-950 rounded text-xs font-bold text-black dark:text-white text-center mt-1">
              {"A = P \\cdot \\left(1 + \\frac{r}{n}\\right)^{n \\cdot t}"}
            </div>
          </div>

          <div>
            <div className="font-bold text-black dark:text-white text-xs font-sans">2. APY to Nominal Rate (r) Conversion</div>
            <div className="p-2 bg-white dark:bg-slate-950 rounded text-xs font-bold text-black dark:text-white text-center mt-1">
              {"r = n \\cdot \\left[ (1 + \\text{APY})^{1/n} - 1 \\right]"}
            </div>
          </div>

          <div>
            <div className="font-bold text-black dark:text-white text-xs font-sans">3. Net After-Tax Interest Earned</div>
            <div className="p-2 bg-white dark:bg-slate-950 rounded text-xs font-bold text-black dark:text-white text-center mt-1">
              {"\\text{Net Interest} = (A - P) \\cdot (1 - \\text{Tax Rate})"}
            </div>
          </div>

          <div>
            <div className="font-bold text-black dark:text-white text-xs font-sans">4. Inflation-Adjusted Real Value (Purchasing Power)</div>
            <div className="p-2 bg-white dark:bg-slate-950 rounded text-xs font-bold text-black dark:text-white text-center mt-1">
              {"\\text{Real Value} = \\frac{\\text{After-Tax Balance}}{(1 + \\text{Inflation Rate})^t}"}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: APY VS APR */}
      <section className="space-y-2">
        <h2 className="text-base font-bold text-black dark:text-white tracking-tight">
          Understanding APY vs. Interest Rate (APR) in Fixed-Income Accounts
        </h2>
        <p className="leading-relaxed">
          It is critical to distinguish between stated interest rate (APR) and Annual Percentage Yield (APY):
        </p>
        <ul className="list-disc pl-4 space-y-1">
          <li><strong>Annual Percentage Rate (APR / Nominal Rate):</strong> The simple annual rate earned without compounding.</li>
          <li><strong>Annual Percentage Yield (APY):</strong> The true effective annual return including intra-year compounding. Because most CDs compound daily or monthly, APY is slightly higher than APR.</li>
          <li><strong>Compounding Impact:</strong> On a 5.00% APY CD with daily compounding, the underlying nominal rate is approximately 4.879%. Daily compounding yields higher dollar returns than monthly or annual compounding over identical terms.</li>
        </ul>
      </section>

      {/* SECTION 4: TYPES OF CDS EXPLAINED */}
      <section className="space-y-2">
        <h2 className="text-base font-bold text-black dark:text-white tracking-tight">
          Complete Certificate of Deposit Types Explained
        </h2>

        <div className="space-y-2">
          <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded border border-slate-300 dark:border-slate-700">
            <h3 className="font-bold text-black dark:text-white">1. Traditional Fixed-Rate CDs</h3>
            <p className="text-black dark:text-white text-[11px] pt-0.5">
              Standard time deposit paying a fixed APY for a set duration (e.g. 12 or 60 months). Early withdrawal incurs a fixed interest penalty.
            </p>
          </div>

          <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded border border-slate-300 dark:border-slate-700">
            <h3 className="font-bold text-black dark:text-white">2. No-Penalty (Liquid) CDs</h3>
            <p className="text-black dark:text-white text-[11px] pt-0.5">
              Allows penalty-free withdrawal of full principal and interest after 7 days from funding. APY is typically 0.20% to 0.40% lower than standard CDs.
            </p>
          </div>

          <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded border border-slate-300 dark:border-slate-700">
            <h3 className="font-bold text-black dark:text-white">3. Bump-Up and Step-Up CDs</h3>
            <p className="text-black dark:text-white text-[11px] pt-0.5">
              Provides the option to exercise a one-time rate bump if interest rates rise during the term.
            </p>
          </div>

          <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded border border-slate-300 dark:border-slate-700">
            <h3 className="font-bold text-black dark:text-white">4. Brokered CDs vs. Bank CDs</h3>
            <p className="text-black dark:text-white text-[11px] pt-0.5">
              Purchased through brokerage accounts (e.g., Fidelity, Schwab). Can be traded on the secondary market prior to maturity without bank early exit penalties.
            </p>
          </div>

          <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded border border-slate-300 dark:border-slate-700">
            <h3 className="font-bold text-black dark:text-white">5. Jumbo CDs and Specialty Terms</h3>
            <p className="text-black dark:text-white text-[11px] pt-0.5">
              High-denomination CDs (typically $100,000 minimum deposit) offering premium APY tiers.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE CD LADDER STRATEGY */}
      <section className="space-y-2">
        <h2 className="text-base font-bold text-black dark:text-white tracking-tight">
          The CD Ladder Strategy: Maximizing Liquidity and Yield
        </h2>
        <p className="leading-relaxed">
          A <strong>CD Ladder</strong> is a fixed-income portfolio strategy where total capital is divided equally across multiple maturities (e.g., 1-year, 2-year, 3-year, 4-year, and 5-year CDs).
        </p>
        <p className="leading-relaxed font-mono text-[11px]">
          Example: Investing $25,000 by placing $5,000 into each of 5 CD terms. Every 12 months, one CD matures, giving you $5,000+ in annual liquidity. You then reinvest the matured funds into a new top-tier 5-year CD. Within 5 years, your entire portfolio earns peak 5-year yields while providing 20% annual liquidity.
        </p>
      </section>

      {/* SECTION 6: EARLY WITHDRAWAL PENALTIES */}
      <section className="space-y-2">
        <h2 className="text-base font-bold text-black dark:text-white tracking-tight">
          Early Withdrawal Penalties and How to Avoid Them
        </h2>
        <p className="leading-relaxed">
          Financial institutions enforce interest penalties for early withdrawal prior to maturity:
        </p>
        <ul className="list-disc pl-4 space-y-1">
          <li><strong>Terms &le; 12 Months:</strong> Typically 90 days of simple interest.</li>
          <li><strong>Terms 12 to 36 Months:</strong> Typically 180 days of simple interest.</li>
          <li><strong>Terms &gt; 36 Months:</strong> Typically 270 to 360 days of simple interest.</li>
        </ul>
        <p className="leading-relaxed">
          If a CD is cashed out shortly after opening, the penalty can exceed earned interest, causing a slight loss of initial principal.
        </p>
      </section>

      {/* SECTION 7: TAXATION ON CD EARNINGS */}
      <section className="space-y-2">
        <h2 className="text-base font-bold text-black dark:text-white tracking-tight">
          Tax Rules on CD Earnings: 1099-INT and Phantom Income
        </h2>
        <p className="leading-relaxed">
          Interest earned on CDs in taxable accounts is taxed as ordinary income at your marginal federal and state tax rates. Under IRS rules, interest is taxable in the year it is credited by the bank, even if the CD has not matured (known as <em>Phantom Income</em>). Placing CDs inside Traditional or Roth IRA accounts eliminates or defers this annual tax drag.
        </p>
      </section>

      {/* SECTION 8: WORKED MATHEMATICAL CASE STUDIES */}
      <section className="space-y-2">
        <h2 className="text-base font-bold text-black dark:text-white tracking-tight">
          Real-World Case Studies: 1-Year CD vs. 5-Year Ladder vs. HYSA
        </h2>

        <div className="space-y-2 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-xs text-black dark:text-white">
              Case Study 1: $10,000 in a 1-Year CD @ 5.0% APY (Daily Compounding)
            </h3>
            <p className="text-black dark:text-white leading-relaxed font-mono text-[11px]">
              Ending Balance = $10,000 * (1 + 0.05)^1 = $10,500.00. Pre-tax interest = $500.00.
            </p>
            <p className="text-black dark:text-white leading-relaxed">
              At a 24% marginal tax bracket, tax drag = $120.00, yielding a net take-home balance of $10,380.00.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-xs text-black dark:text-white">
              Case Study 2: Early Exit Penalty Deduction on $15,000 2-Year CD broken at Month 6
            </h3>
            <p className="text-black dark:text-white leading-relaxed font-mono text-[11px]">
              Gross interest earned at month 6 = $360.00. 180-day simple penalty = $355.07. Net payout = $15,004.93.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9: SUMMARY */}
      <section className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 space-y-1">
        <h2 className="font-bold text-xs text-black dark:text-white">
          Educational Summary
        </h2>
        <p className="text-black dark:text-white leading-relaxed font-medium">
          Certificates of Deposit provide guaranteed, risk-free compounding returns protected by federal FDIC insurance. Evaluating APY vs. APR, inflation drag, tax liability, and CD laddering strategies enables optimal fixed-income capital allocation.
        </p>
      </section>
    </div>
  );
}

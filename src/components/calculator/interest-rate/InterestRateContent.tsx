"use client";

import React from "react";

export function InterestRateContent() {
  return (
    <div className="space-y-6 text-black dark:text-white font-medium leading-normal max-w-4xl mx-auto text-xs">
      {/* H1 Title */}
      <div className="border-b border-slate-300 dark:border-slate-700 pb-2">
        <h1 className="text-xl font-black text-black dark:text-white tracking-tight">
          Interest Rate Calculator — Find Loan APR, Investment Returns & APY
        </h1>
        <p className="text-xs text-black dark:text-white mt-0.5">
          Quantitative Amortized Loan Rate Solver, Lump-Sum & Annuity Return Engine, APR to APY Converter & Fisher Inflation Adjuster.
        </p>
      </div>

      {/* SECTION 1: WHAT IS AN INTEREST RATE */}
      <section className="space-y-2">
        <h2 className="text-base font-bold text-black dark:text-white tracking-tight">
          What is an Interest Rate? Definitions, Borrowing Costs & Investment Returns
        </h2>
        <p className="leading-relaxed">
          An <strong>interest rate</strong> is the percentage of principal charged by a lender for the use of assets, or the rate of return earned by an investor on a deposited principal balance over a specified timeframe (typically expressed as an annual percentage rate). Interest rates govern the cost of consumer debt (mortgages, auto loans, credit cards) and the compounding growth rate of wealth (high-yield savings, CDs, bonds, and annuities).
        </p>
        <p className="leading-relaxed">
          Central banks, such as the Federal Reserve or the European Central Bank, establish benchmark policy rates (such as the Federal Funds Rate). Commercial banks adjust their prime lending rates accordingly, directly influencing borrowing APRs and savings APYs across the financial system.
        </p>
      </section>

      {/* SECTION 2: SIMPLE VS COMPOUND INTEREST */}
      <section className="space-y-2">
        <h2 className="text-base font-bold text-black dark:text-white tracking-tight">
          Simple Interest vs. Compound Interest: The Power of Compounding
        </h2>
        <p className="leading-relaxed">
          Understanding the mathematical distinction between simple and compound interest is essential for debt management and wealth accumulation:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 space-y-1 font-mono">
            <div className="font-bold text-black dark:text-white text-xs font-sans">Simple Interest Formula</div>
            <div className="p-2 bg-white dark:bg-slate-950 rounded text-xs font-bold text-black dark:text-white text-center">
              {"I = P \\times r \\times t"}
            </div>
            <p className="text-black dark:text-white text-[11px] font-sans font-normal pt-1">
              Interest is calculated strictly on the original principal amount. The annual interest payout remains constant every year.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 space-y-1 font-mono">
            <div className="font-bold text-black dark:text-white text-xs font-sans">Compound Interest Formula</div>
            <div className="p-2 bg-white dark:bg-slate-950 rounded text-xs font-bold text-black dark:text-white text-center">
              {"A = P \\cdot \\left(1 + \\frac{r}{m}\\right)^{m \\cdot t}"}
            </div>
            <p className="text-black dark:text-white text-[11px] font-sans font-normal pt-1">
              Interest is added back to the principal at each interval m, earning "interest on interest" and accelerating growth exponentially.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: FORMULAS REFERENCE MATRIX */}
      <section className="space-y-2">
        <h2 className="text-base font-bold text-black dark:text-white tracking-tight">
          Complete Interest Rate Formulas Reference Matrix
        </h2>

        <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 space-y-2 font-mono">
          <div>
            <div className="font-bold text-black dark:text-white text-xs font-sans">1. Lump-Sum Compound Interest Rate Equation</div>
            <div className="p-2 bg-white dark:bg-slate-950 rounded text-xs font-bold text-black dark:text-white text-center mt-1">
              {"r = m \\cdot \\left[ \\left(\\frac{A}{P}\\right)^{\\frac{1}{m \\cdot t}} - 1 \\right]"}
            </div>
          </div>

          <div>
            <div className="font-bold text-black dark:text-white text-xs font-sans">2. Continuous Compounding Rate Formula (e^rt)</div>
            <div className="p-2 bg-white dark:bg-slate-950 rounded text-xs font-bold text-black dark:text-white text-center mt-1">
              {"A = P \\cdot e^{r \\cdot t} \\implies r = \\frac{\\ln(A / P)}{t}"}
            </div>
          </div>

          <div>
            <div className="font-bold text-black dark:text-white text-xs font-sans">3. Amortized Loan Payment Interest Formula (Newton-Raphson Solver)</div>
            <div className="p-2 bg-white dark:bg-slate-950 rounded text-xs font-bold text-black dark:text-white text-center mt-1">
              {"f(r) = P - M \\cdot \\left[ \\frac{1 - (1 + r/12)^{-n}}{r/12} \\right] = 0"}
            </div>
          </div>

          <div>
            <div className="font-bold text-black dark:text-white text-xs font-sans">4. Effective Annual Rate (EAR / APY) Conversion</div>
            <div className="p-2 bg-white dark:bg-slate-950 rounded text-xs font-bold text-black dark:text-white text-center mt-1">
              {"\\text{EAR} = \\left(1 + \\frac{r}{m}\\right)^m - 1"}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: APR VS APY VS EAR */}
      <section className="space-y-2">
        <h2 className="text-base font-bold text-black dark:text-white tracking-tight">
          APR vs. APY vs. EAR: Understanding the Differences
        </h2>
        <p className="leading-relaxed">
          The financial industry quotes different interest rate metrics depending on whether you are borrowing or investing:
        </p>
        <ul className="list-disc pl-4 space-y-1">
          <li><strong>Annual Percentage Rate (APR):</strong> The simple annual rate quoted on loans, credit cards, and mortgages. True APR incorporates upfront lender fees and points into the annual cost.</li>
          <li><strong>Annual Percentage Yield (APY) / Effective Annual Rate (EAR):</strong> Reflects the actual annual yield accounting for intra-year interest compounding.</li>
          <li><strong>Why the Difference Matters:</strong> A 6.00% APR compounded monthly produces an Effective APY of 6.17%. Lenders advertise APR on loans to display smaller borrowing costs, while banks advertise APY on savings to display higher yields.</li>
        </ul>
      </section>

      {/* SECTION 5: NOMINAL VS REAL INTEREST RATES */}
      <section className="space-y-2">
        <h2 className="text-base font-bold text-black dark:text-white tracking-tight">
          Nominal vs. Real Interest Rates (Factoring in Inflation and Taxes)
        </h2>
        <p className="leading-relaxed">
          Gross nominal returns do not measure real wealth accumulation. Inflation erodes purchasing power, while taxes reduce net nominal returns.
        </p>

        <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 space-y-1 font-mono">
          <div className="font-bold text-black dark:text-white text-xs font-sans">The Fisher Equation for Real Purchasing Power</div>
          <div className="p-2 bg-white dark:bg-slate-950 rounded text-xs font-bold text-black dark:text-white text-center">
            {"r_{\\text{real}} = \\frac{1 + r_{\\text{tax}}}{1 + i_{\\text{inflation}}} - 1"}
          </div>
          <p className="text-black dark:text-white text-[11px] font-sans font-normal pt-1">
            Where r_tax = r_nominal * (1 - Tax Rate). If an investment yields 8% nominal, tax is 25%, and inflation is 3%, your net after-tax yield is 6%, producing a real purchasing power gain of 2.91% per year.
          </p>
        </div>
      </section>

      {/* SECTION 6: WORKED MATHEMATICAL EXAMPLES */}
      <section className="space-y-2">
        <h2 className="text-base font-bold text-black dark:text-white tracking-tight">
          Worked Step-by-Step Mathematical Examples
        </h2>

        <div className="space-y-2 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-xs text-black dark:text-white">
              Example 1: Solving Rate for a Lump-Sum Investment ($5,000 to $8,000 in 5 Years, Monthly Compounding)
            </h3>
            <p className="text-black dark:text-white leading-relaxed font-mono text-[11px]">
              r = 12 * [ (8000 / 5000)^(1 / 60) - 1 ] = 12 * [ 1.6^(0.016667) - 1 ] = 0.09437 = 9.44% / year.
            </p>
            <p className="text-black dark:text-white leading-relaxed">
              Effective APY = (1 + 0.09437 / 12)^12 - 1 = 9.86% per year.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-xs text-black dark:text-white">
              Example 2: Finding Auto Loan Interest Rate ($25,000 Loan, 48 Months, $580/month Payment)
            </h3>
            <p className="text-black dark:text-white leading-relaxed font-mono text-[11px]">
              Newton-Raphson iteration solves f(i) = 25000 - 580 * [ (1 - (1+i)^-48) / i ] = 0.
            </p>
            <p className="text-black dark:text-white leading-relaxed font-mono text-[11px]">
              Result: Monthly rate i = 0.004516 (yields Stated Nominal Annual Rate r = 0.004516 * 12 * 100 = 5.42% / year).
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: SUMMARY */}
      <section className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 space-y-1">
        <h2 className="font-bold text-xs text-black dark:text-white">
          Educational Summary
        </h2>
        <p className="text-black dark:text-white leading-relaxed font-medium">
          Accurately solving for interest rates across debt amortizations and investment portfolios enables precise cost-benefit evaluation, true APR comparison, and inflation-protected wealth planning.
        </p>
      </section>
    </div>
  );
}

"use client";

import React from "react";

export function PaybackPeriodContent() {
  return (
    <div className="space-y-10 text-black dark:text-slate-100 font-medium leading-relaxed">
      {/* 1. WHAT IS PAYBACK PERIOD? */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          1. What is the Payback Period? Core Capital Budgeting Concepts
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          In corporate finance, private equity, and capital budgeting, the <strong>Payback Period</strong> measures the exact amount of time required for a proposed capital investment to generate sufficient cumulative net cash inflows to recover the initial capital expenditure outlay (CF_0).
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-center font-mono font-bold text-xs text-black dark:text-slate-100">
          Cumulative Net Cash Inflows = Initial Capital Investment (CF_0)
        </div>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Corporate treasurers and executive decision-makers prioritize the payback period as an intuitive measure of <strong>liquidity risk</strong>. Shorter payback periods minimize the duration that corporate capital is exposed to market uncertainty, operational volatility, and credit risk.
        </p>
      </section>

      {/* 2. SIMPLE VS DISCOUNTED PAYBACK */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          2. Simple Payback Period vs. Discounted Payback Period (DPP)
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          While both metrics calculate the time to break even, they treat the <strong>time value of money (TVM)</strong> fundamentally differently:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Simple Payback Period (Undiscounted)
            </h3>
            <p className="text-black dark:text-slate-100">
              Sums nominal, unadjusted cash inflows year after year until the initial outlay is fully recovered. It is simple to compute and easy for non-financial managers to interpret, but it implicitly assumes an interest rate of 0% and treats a dollar received ten years from now as equal in value to a dollar received today.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Discounted Payback Period (DPP)
            </h3>
            <p className="text-black dark:text-slate-100">
              Discounts each expected future cash flow back to its present value (PV) using the firm&apos;s <strong>Weighted Average Cost of Capital (WACC)</strong> or hurdle rate before tallying cumulative recovery. Because present value dollars are smaller than nominal dollars, DPP is always longer than the Simple Payback Period for any positive discount rate (r &gt; 0%).
            </p>
          </div>
        </div>
      </section>

      {/* 3. COMPLETE FORMULAS REFERENCE MATRIX */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          3. Complete Payback Period Formulas Reference Matrix
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              A. Simple Payback for Equal / Uniform Cash Inflows
            </h3>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-center font-bold text-black dark:text-slate-100">
              Payback Period = Initial Investment / Annual Cash Inflow
            </div>
            <p className="text-black dark:text-slate-100">
              For an initial outlay of $100,000 with constant annual inflows of $25,000: Payback = $100,000 / $25,000 = 4.0 Years.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              B. Simple Payback for Unequal / Irregular Cash Inflows (Linear Interpolation)
            </h3>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-center font-bold text-black dark:text-slate-100">
              Payback Period = A + [ (Initial Investment - Cumulative Cash Flow at A) / Cash Flow in Year (A + 1) ]
            </div>
            <p className="text-black dark:text-slate-100">
              where <em>A</em> is the last full year before cumulative cash flows turn positive, and the fraction represents the precise portion of the subsequent year required to recover the remaining balance.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              C. Closed-Form Discounted Payback Period (DPP) for Uniform Annuities
            </h3>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-center font-bold text-black dark:text-slate-100">
              DPP = -ln[ 1 - (Initial Investment &times; r) / Annual Cash Flow ] / ln(1 + r)
            </div>
            <p className="text-black dark:text-slate-100">
              For an initial investment of $100 with $20/year cash flow at a 10% discount rate: DPP = -ln[1 - (100 &times; 0.10) / 20] / ln(1 + 0.10) = -ln(0.5) / ln(1.10) = 7.2725 Years.
            </p>
          </div>
        </div>
      </section>

      {/* 4. THE 3 CRITICAL LIMITATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          4. The 3 Critical Limitations of Payback Period Analysis
        </h2>
        <div className="space-y-2.5 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">
              1. The Post-Payback Cash Flow Blind Spot
            </h3>
            <p className="text-black dark:text-slate-100">
              Payback period completely ignores all cash flows received after the breakeven point. A project that breaks even in 2 years and stops producing cash will be chosen over a project that breaks even in 2.5 years but generates millions in profit over the next 20 years.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">
              2. Scale &amp; Total Profitability Insensitivity
            </h3>
            <p className="text-black dark:text-slate-100">
              Payback measures speed of initial capital recovery, not the total amount of shareholder wealth created. An investment of $1,000 that returns $1,000 in Year 1 has a 1-year payback, but generates $0 in total net profit.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">
              3. Time Value of Money Ignorance in Simple Payback
            </h3>
            <p className="text-black dark:text-slate-100">
              Simple payback assigns equal weight to immediate cash flows and distant future cash flows, distorting long-term capital allocation unless paired with Discounted Payback or Net Present Value (NPV).
            </p>
          </div>
        </div>
      </section>

      {/* 5. WORKED STEP-BY-STEP EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          5. Worked Step-by-Step Practical Examples
        </h2>

        {/* Example 1 */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 text-xs">
          <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
            Example 1: Unequal Cash Flows on a $100,000 Outlay @ 10% Discount Rate
          </h3>
          <p className="text-black dark:text-slate-100">
            Initial Outlay = <strong>$100,000</strong>. Annual projected inflows: Year 1: $5,000, Year 2: $25,000, Year 3: $35,000, Year 4: $40,000, Year 5: $30,000, Year 6: $10,000.
          </p>
          <div className="space-y-1 font-mono text-black dark:text-slate-100 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <div>1. Cumulative Nominal Cash Flows: Y1: $5k, Y2: $30k, Y3: $65k, Y4: $105k (Breakeven achieved in Year 4)</div>
            <div>2. Simple Payback = 3 + [ ($100k - $65k) / $40k ] = 3 + 35/40 = 3.875 Years (3 yrs, 10 mos, 15 days)</div>
            <div>3. Discounted Cash Flows (PV @ 10%): Y1: $4,545, Y2: $20,661, Y3: $26,296, Y4: $27,321, Y5: $18,628, Y6: $5,645</div>
            <div>4. Cumulative Discounted PV: Y1: $4.5k, Y2: $25.2k, Y3: $51.5k, Y4: $78.8k, Y5: $97.5k, Y6: $103.1k</div>
            <div>5. Discounted Payback Period (DPP) = 5 + [ ($100,000 - $97,451) / $5,645 ] = 5.452 Years (5 yrs, 5 mos, 13 days)</div>
            <div>6. Net Present Value (NPV @ 10%) = +$3,095.56 | Internal Rate of Return (IRR) = 10.975% / yr</div>
          </div>
        </div>

        {/* Example 2 */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 text-xs">
          <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
            Example 2: Commercial Equipment Lease / Solar Panel Installation
          </h3>
          <p className="text-black dark:text-slate-100">
            Installation cost = <strong>$25,000</strong> upfront. Monthly electricity bill savings = <strong>$450/month</strong> ($5,400/year). Cost of capital = <strong>6.0%</strong>.
          </p>
          <div className="space-y-1 font-mono text-black dark:text-slate-100 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <div>1. Simple Payback Period = $25,000 / $5,400 = 4.63 Years (4 yrs, 7 mos, 17 days)</div>
            <div>2. Discounted Payback Period (DPP @ 6.0%) = 5.51 Years (5 yrs, 6 mos, 4 days)</div>
            <div>3. Total 10-Year Lifecycle Nominal Savings = $54,000 (Net Profit: +$29,000)</div>
          </div>
        </div>
      </section>

      {/* 6. PRACTICAL INDUSTRY APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          6. Practical Applications of Payback Analysis Across Industries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. Renewable Energy &amp; Solar Installations
            </h3>
            <p className="text-black dark:text-slate-100">
              Homeowners and commercial facilities calculate how many years of utility savings and solar tax credits are required to offset initial photovoltaic hardware and installation costs.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Manufacturing &amp; Industrial Automation
            </h3>
            <p className="text-black dark:text-slate-100">
              Plant managers evaluate robotics and assembly line upgrades based on labor reduction, lower error rates, and scrap savings against machinery purchase and commissioning outlays.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. IT Infrastructure &amp; SaaS Cloud Migration
            </h3>
            <p className="text-black dark:text-slate-100">
              Chief Information Officers (CIOs) determine the break-even duration of enterprise software deployments and cloud migrations against legacy server hardware maintenance contracts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. Commercial Real Estate Renovations
            </h3>
            <p className="text-black dark:text-slate-100">
              Property syndicators and landlords analyze the payback period of tenant improvements, HVAC overhauls, and cosmetic renovations funded by incremental monthly rental increases.
            </p>
          </div>
        </div>
      </section>

      {/* 7. SUMMARY */}
      <section className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          7. Educational Summary
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          The Payback Period and Discounted Payback Period provide essential insights into project liquidity, operational risk exposure, and capital velocity. For optimal corporate governance and wealth creation, analysts should use payback as an initial risk constraint while relying on Net Present Value (NPV) and Internal Rate of Return (IRR) as primary project acceptance criteria.
        </p>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS (12 FAQS) */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-3 text-xs leading-relaxed text-black dark:text-slate-100">
          {/* FAQ 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. What is the difference between Simple Payback Period and Discounted Payback Period?
            </h3>
            <p className="text-black dark:text-slate-100">
              <strong>Simple Payback Period</strong> sums undiscounted nominal cash flows until the initial investment is recovered. <strong>Discounted Payback Period (DPP)</strong> discounts every future cash flow to its present value using a specific hurdle rate (WACC) before calculating the breakeven point.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Why is the Discounted Payback Period always longer than the Simple Payback Period?
            </h3>
            <p className="text-black dark:text-slate-100">
              Because future cash flows are discounted by $(1 + r)^t$, each future dollar is worth less in present value terms than its nominal value. Therefore, more periods of cash inflows are required to accumulate enough present value to cover the initial outlay.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. What is a good or acceptable payback period for a business investment?
            </h3>
            <p className="text-black dark:text-slate-100">
              Acceptable payback thresholds depend on the asset class and industry risk. Tech startups and software tools typically target payback periods under 1 to 2 years; commercial equipment targets 3 to 5 years; and infrastructure or real estate developments target 7 to 10+ years.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. Why does the payback period ignore cash flows that occur after the break-even point?
            </h3>
            <p className="text-black dark:text-slate-100">
              By definition, payback only measures the time required to recover initial principal. It stops tallying once cumulative cash flows hit zero, making it blind to post-breakeven profitability and long-term cash generation.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              5. How is linear interpolation used to calculate exact fractional months and days in payback?
            </h3>
            <p className="text-black dark:text-slate-100">
              Linear interpolation assumes cash flows occur uniformly throughout the year. The formula divides the unrecovered balance at the start of the breakeven year by the total cash flow generated during that year to determine fractional years, months, and days.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              6. How do you choose a discount rate for calculating the discounted payback period?
            </h3>
            <p className="text-black dark:text-slate-100">
              The discount rate should reflect the project&apos;s risk profile and the company&apos;s <strong>Weighted Average Cost of Capital (WACC)</strong>, incorporating equity required returns, debt interest borrowing costs, and inflation expectations.
            </p>
          </div>

          {/* FAQ 7 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              7. Can a project have a positive NPV but fail a payback period requirement?
            </h3>
            <p className="text-black dark:text-slate-100">
              Yes. A project with back-loaded cash flows may take 6 years to break even (failing a corporate 4-year payback policy) while generating huge profits in Years 7 to 15 that produce a massive positive Net Present Value.
            </p>
          </div>

          {/* FAQ 8 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              8. How does inflation impact the real payback time of an investment?
            </h3>
            <p className="text-black dark:text-slate-100">
              Inflation erodes the purchasing power of future cash inflows. Simple payback ignores this effect, but Discounted Payback incorporates inflation into the nominal discount rate to accurately measure true economic recovery.
            </p>
          </div>

          {/* FAQ 9 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              9. What is the relationship between Payback Period and Accounting Rate of Return (ARR)?
            </h3>
            <p className="text-black dark:text-slate-100">
              Payback measures the speed of cash recovery, whereas ARR measures accounting net income relative to book asset value. Both are simple screening tools, but neither discounts cash flows for the time value of money.
            </p>
          </div>

          {/* FAQ 10 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              10. Why should companies never rely solely on the payback period to make capital budgeting decisions?
            </h3>
            <p className="text-black dark:text-slate-100">
              Sole reliance on payback period causes companies to reject highly profitable long-term projects in favor of mediocre short-term investments, reducing total enterprise value and long-term competitiveness.
            </p>
          </div>

          {/* FAQ 11 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              11. What is the closed-form formula for discounted payback on equal annual annuities?
            </h3>
            <p className="text-black dark:text-slate-100">
              When annual cash inflows are constant (PMT), the exact DPP is given by: DPP = -ln[1 - (CF_0 &times; r) / PMT] / ln(1 + r), which eliminates the need for manual step-by-step table compounding.
            </p>
          </div>

          {/* FAQ 12 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              12. How does cash flow velocity affect payback period versus total profitability?
            </h3>
            <p className="text-black dark:text-slate-100">
              High cash flow velocity (front-loaded cash inflows) accelerates payback and dramatically increases NPV by reducing discounting penalties and freeing up capital for early reinvestment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PaybackPeriodContent;

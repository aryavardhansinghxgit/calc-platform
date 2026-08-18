"use client";

import React from "react";

export function MutualFundContent() {
  return (
    <div className="space-y-10 text-black dark:text-slate-100 font-medium leading-relaxed">
      {/* 1. INTRODUCTION */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          1. Introduction to Mutual Funds &amp; Net Asset Value (NAV) Mechanics
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          A <strong>mutual fund</strong> is an open-end professionally managed investment vehicle that pools capital from retail and institutional investors to purchase a diversified portfolio of securities, such as equities, corporate bonds, government treasuries, and money market instruments. When an individual invests in a mutual fund, they purchase proportional equity shares representing a fractional interest in the fund&apos;s underlying aggregate asset base.
        </p>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Unlike exchange-traded equities or ETFs that trade continuously throughout market hours at fluctuating market bids and asks, mutual fund shares do not trade on intraday exchanges. Instead, all buy and redemption orders execute exactly once per business day after major US markets close at 4:00 PM Eastern Standard Time (EST) at the single official <strong>Net Asset Value (NAV)</strong> per share:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-center font-mono font-bold text-xs text-black dark:text-slate-100">
          NAV = ( Total Market Value of Fund Assets - Total Fund Liabilities ) / Total Outstanding Shares
        </div>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Because mutual funds pool trillions of dollars globally, understanding how management fees, sales commissions, and annual operational costs compound over multi-decade holding periods is paramount for long-term wealth preservation.
        </p>
      </section>

      {/* 2. COMPREHENSIVE ANATOMY OF MUTUAL FUND FEES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          2. Complete Anatomy of Mutual Fund Fees &amp; Share Classes
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Mutual fund costs are categorized into two primary classifications: one-time transactional commissions (sales loads) and ongoing operational expenses (the expense ratio).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. Transactional Sales Loads (Entry &amp; Exit)
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-black dark:text-slate-100">
              <li>
                <strong>Class A Shares (Front-End Sales Load):</strong> An upfront sales commission deducted immediately from your initial and recurring cash deposits (typically 2.0% to 5.75%). For example, a 5.0% front-end load on a $10,000 investment immediately removes $500, leaving only $9,500 working in the market.
              </li>
              <li>
                <strong>Class B Shares (Back-End / CDSC Load):</strong> No upfront fee is charged upon entry, but a <em>Contingent Deferred Sales Charge (CDSC)</em> applies if you redeem shares within 5 to 7 years. The exit penalty systematically declines per year held (e.g., Year 1: 5% &rarr; Year 5: 1% &rarr; Year 6+: 0%).
              </li>
              <li>
                <strong>Class C Shares (Level-Load):</strong> Often feature a flat 1.0% redemption fee during the first year, paired with a permanently higher ongoing annual 12b-1 marketing fee.
              </li>
              <li>
                <strong>No-Load Funds:</strong> Funds sold directly to investors without any front-end entry loads or back-end exit charges.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. The Annual Operating Expense Ratio (OER)
            </h3>
            <p className="text-black dark:text-slate-100">
              The expense ratio represents the annualized percentage of fund assets automatically deducted on a daily basis from the fund&apos;s Net Asset Value (NAV). It comprises three core components:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-black dark:text-slate-100">
              <li>
                <strong>Management Fee (0.10% - 1.50%):</strong> Direct advisory compensation paid to portfolio managers and research analysts for asset allocation and security selection.
              </li>
              <li>
                <strong>12b-1 Distribution &amp; Marketing Fees (0.25% - 1.00%):</strong> SEC-regulated fees paid to brokers, financial advisors, and platform distribution channels to market the fund.
              </li>
              <li>
                <strong>Administrative &amp; Custodial Costs (0.05% - 0.30%):</strong> Legal compliance, auditing, shareholder record-keeping, and custodial transfer services.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. THE DEVASTATING COMPOUNDING IMPACT OF FEE DRAG */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          3. The Mathematics of Compounding Fee Drag Over 30 Years
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          A common misconception among retail investors is that an annual expense ratio of 1.0% or 1.5% is a negligible cost. However, because fees are deducted continuously from total assets (not just profits), the investor loses not only the principal dollar amount of the fee, but also the exponential compound interest that money would have generated over decades.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 text-xs">
          <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
            30-Year Compounding Comparison ($100,000 Lump-Sum @ 8.0% Gross Market Return)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse text-xs font-mono font-bold">
              <thead>
                <tr className="border-b border-slate-300 dark:border-slate-700 text-black dark:text-slate-100">
                  <th className="p-2 text-left font-sans">Investment Vehicle</th>
                  <th className="p-2">Expense Ratio</th>
                  <th className="p-2">Net Annual Return</th>
                  <th className="p-2">30-Year Ending Value</th>
                  <th className="p-2">Lost Wealth to Fees</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-black dark:text-slate-100">
                <tr>
                  <td className="p-2 text-left font-sans font-bold text-blue-700 dark:text-blue-400">Zero-Fee Baseline</td>
                  <td className="p-2">0.00%</td>
                  <td className="p-2">8.00%</td>
                  <td className="p-2">$1,006,265</td>
                  <td className="p-2">$0 (0%)</td>
                </tr>
                <tr>
                  <td className="p-2 text-left font-sans font-bold text-emerald-700 dark:text-emerald-400">Passive Index Fund / ETF</td>
                  <td className="p-2">0.05%</td>
                  <td className="p-2">7.95%</td>
                  <td className="p-2">$992,305</td>
                  <td className="p-2">$13,960 (1.4%)</td>
                </tr>
                <tr>
                  <td className="p-2 text-left font-sans font-bold text-amber-700 dark:text-amber-400">Moderate Active Fund</td>
                  <td className="p-2">0.75%</td>
                  <td className="p-2">7.25%</td>
                  <td className="p-2">$811,940</td>
                  <td className="p-2">$194,325 (19.3%)</td>
                </tr>
                <tr>
                  <td className="p-2 text-left font-sans font-bold text-red-700 dark:text-red-400">High-Cost Active Fund</td>
                  <td className="p-2">1.50%</td>
                  <td className="p-2">6.50%</td>
                  <td className="p-2">$661,437</td>
                  <td className="p-2">$344,828 (34.3%)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-black dark:text-slate-100 pt-1">
            Over 30 years, an investor in a 1.50% active mutual fund surrenders <strong>over 34% of their potential lifetime net worth</strong> exclusively to management fees and lost compound interest!
          </p>
        </div>
      </section>

      {/* 4. NET INTERNAL RATE OF RETURN (NET IRR) */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          4. Understanding Net IRR (Internal Rate of Return) vs. Nominal Return
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          When analyzing mutual fund marketing materials, published performance figures reflect time-weighted total returns before sales loads and taxes. For investors making ongoing monthly or annual contributions (dollar-cost averaging), simple percentage returns provide a distorted gauge of actual financial performance.
        </p>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          <strong>Net Internal Rate of Return (Net IRR)</strong> solves for the exact discount rate that sets the Net Present Value (NPV) of all historical cash outflows (initial lump-sum and periodic SIP deposits) equal to the present value of the final net liquidated portfolio balance after deducting all front-end loads, back-end fees, and daily operating expenses:
        </p>
        <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center font-mono text-xs font-bold text-black dark:text-slate-100">
          0 = -Initial Outflow - &sum;[m=1 to N] &lbrace; Monthly Deposit_m / (1 + r_m)^m &rbrace; + &lbrace; Final Net Balance / (1 + r_m)^N &rbrace;
        </div>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Our calculator executes a high-speed second-order Newton-Raphson numerical root-finding algorithm to compute your true annualized Net IRR down to three decimal places in under 10 milliseconds.
        </p>
      </section>

      {/* 5. ACTIVE VS PASSIVE MANAGEMENT (SPIVA EVIDENCE) */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          5. Active Management vs. Passive Indexing: Empirical SPIVA Evidence
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          The S&amp;P Indices Versus Active (SPIVA) Scorecard consistently tracks the performance of actively managed equity and fixed-income mutual funds against their respective benchmark indices across global markets:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-sm text-black dark:text-slate-100">
          <li>
            <strong>15-Year Horizon:</strong> Over 90% of active large-cap US equity fund managers fail to outperform the passive S&amp;P 500 Index net of fees.
          </li>
          <li>
            <strong>20-Year Horizon:</strong> Over 94% of active equity managers underperform passive broad-market benchmarks.
          </li>
          <li>
            <strong>Survivorship Bias:</strong> Nearly 50% of active mutual funds are merged or liquidated within a 15-year window due to chronic chronic underperformance.
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          The primary driver of active underperformance is not managerial incompetence, but the insurmountable mathematical hurdle of overcoming 1.0% to 2.5% in combined annual expense ratios, sales loads, and internal portfolio trading costs.
        </p>
      </section>

      {/* 6. WORKED STEP-BY-STEP PRACTICAL EXAMPLE */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          6. Worked Step-by-Step Mathematical Example
        </h2>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 text-xs">
          <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
            Example: $20,000 Initial + $1,000/Month over 5 Years @ 5.0% Return, 2.0% Load, 0.5% Expense Ratio
          </h3>
          <div className="space-y-1 font-mono text-black dark:text-slate-100 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <div>1. Net Initial Working Capital = $20,000 &times; (1 - 0.02) = $19,600 (Sales Load: $400)</div>
            <div>2. Net Monthly Deposit = $1,000 &times; (1 - 0.02) = $980/mo (Monthly Load: $20/mo &times; 60 = $1,200)</div>
            <div>3. Total Sales Charges Incurred = $400 + $1,200 = $1,600.00</div>
            <div>4. Net Compounding Growth Rate = 5.0% - 0.5% = 4.50%/year (Monthly Rate i = (1.045)^(1/12) - 1 = 0.3675%)</div>
            <div>5. Month-by-Month Compounding over 60 Months yields Final Ending Value = $90,077.09</div>
            <div>6. Total Principal Invested = $20,000 + (60 &times; $1,000) = $80,000.00</div>
            <div>7. Net Return = $90,077.09 - $80,000.00 = $10,077.09</div>
            <div>8. Zero-Fee Gross Baseline Value = $93,000.49 (Gross Profit: $13,000.49)</div>
            <div>9. Total Fees Paid = Gross Profit ($13,000.49) - Net Profit ($10,077.09) = $2,923.40</div>
            <div>10. Operating Expenses Drag = $2,923.40 - $1,600.00 = $1,323.40</div>
            <div>11. Solved Net IRR = 3.844% per year</div>
          </div>
        </div>
      </section>

      {/* 7. TAX IMPLICATIONS */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          7. Tax Implications: Capital Gains Distributions &amp; Phantom Taxes
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          When mutual fund managers buy and sell underlying securities inside the fund portfolio to meet redemption requests or rebalance allocations, any realized net capital gains must legally be distributed to shareholders before year-end.
        </p>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          In taxable brokerage accounts, shareholders owe capital gains taxes on these distributions during the tax year they are distributed, even if the investor did not sell a single share of the fund and automatically reinvested all payouts. This structural tax inefficiency makes traditional mutual funds less tax-efficient than index ETFs, which utilize in-kind creation and redemption mechanisms to avoid triggering taxable capital gains.
        </p>
      </section>

      {/* 8. SUMMARY */}
      <section className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          8. Educational Summary
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Mutual fund valuation requires evaluating the combined impact of front-end sales charges, contingent deferred exit loads, daily operational expense ratios, and cash flow timing. By minimizing sales loads, selecting low-cost index funds or no-load share classes, and harnessing disciplined dollar-cost averaging, investors can eliminate hundreds of thousands of dollars in compounding fee drag and maximize their net realized wealth.
        </p>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS (12 FAQS) */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-3 text-xs leading-relaxed text-black dark:text-slate-100">
          {/* FAQ 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. What is an expense ratio in a mutual fund and how is it deducted?
            </h3>
            <p className="text-black dark:text-slate-100">
              An expense ratio is the annual percentage of a mutual fund&apos;s total assets dedicated to management, administrative, custodial, and marketing operations. It is not billed as a separate invoice; rather, 1/365th of the annual rate is automatically deducted daily from the fund&apos;s Net Asset Value (NAV) before daily share prices are published.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. What is the difference between a Front-End Load and a Back-End Load?
            </h3>
            <p className="text-black dark:text-slate-100">
              A <strong>front-end load</strong> (Class A shares) is a sales commission charged upfront when purchasing shares, reducing your starting investment balance. A <strong>back-end load</strong> (Class B shares) is charged when you sell or redeem shares, typically calculated on either the initial principal or the final market value depending on fund prospectus terms.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. What is a Contingent Deferred Sales Charge (CDSC)?
            </h3>
            <p className="text-black dark:text-slate-100">
              A CDSC is a structured back-end redemption penalty that systematically scales down to 0% the longer you hold the fund. For example, a fund might impose a 5% exit charge if sold in Year 1, 4% in Year 2, declining by 1% each subsequent year until reaching 0% after Year 5 or 6.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. Why is Net IRR a better performance metric than nominal total return?
            </h3>
            <p className="text-black dark:text-slate-100">
              Nominal total return only compares your ending balance against total cash invested without accounting for the exact timing of periodic monthly deposits or upfront sales charges. <strong>Net IRR</strong> calculates the true annualized internal rate of return earned on every individual dollar invested across the holding timeline.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              5. What are 12b-1 fees and why do investors pay them?
            </h3>
            <p className="text-black dark:text-slate-100">
              12b-1 fees are operational expenses capped by FINRA at 0.75% for distribution and marketing plus 0.25% for shareholder servicing. They are paid out of fund assets to compensate broker-dealers and financial intermediaries for selling the mutual fund to the public.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              6. How do no-load index mutual funds save money compared to actively managed funds?
            </h3>
            <p className="text-black dark:text-slate-100">
              No-load index funds eliminate 2% to 5.75% in upfront entry commissions and feature ultra-low annual expense ratios (often 0.02% to 0.05% vs. 1.00% to 1.50% for active funds). Over 20 to 30 years, avoiding these fees can increase an investor&apos;s final accumulated wealth by 25% to 35%.
            </p>
          </div>

          {/* FAQ 7 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              7. What is Net Asset Value (NAV) and when is it calculated?
            </h3>
            <p className="text-black dark:text-slate-100">
              Net Asset Value (NAV) is the per-share value of a mutual fund calculated by dividing total assets minus total liabilities by the number of outstanding shares. It is computed exactly once per business day after US financial markets close at 4:00 PM EST.
            </p>
          </div>

          {/* FAQ 8 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              8. How does a Systematic Investment Plan (SIP) dollar-cost average market fluctuations?
            </h3>
            <p className="text-black dark:text-slate-100">
              A Systematic Investment Plan automatically invests a fixed dollar amount at regular monthly intervals. When market prices drop, your fixed deposit automatically purchases more fund shares; when prices rise, it buys fewer shares, naturally lowering your average purchase cost per share over time.
            </p>
          </div>

          {/* FAQ 9 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              9. Are mutual fund capital gain distributions taxable even if I do not sell shares?
            </h3>
            <p className="text-black dark:text-slate-100">
              Yes. If held in a taxable non-retirement account, any net capital gains realized by the fund manager during the year must be passed through to shareholders and are taxable in the year received, even if you reinvest all distributions into new shares.
            </p>
          </div>

          {/* FAQ 10 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              10. How do mutual funds compare to Exchange-Traded Funds (ETFs)?
            </h3>
            <p className="text-black dark:text-slate-100">
              Mutual funds trade once per day at 4:00 PM NAV and can distribute unwanted taxable capital gains. ETFs trade continuously intraday on stock exchanges, usually feature lower expense ratios, have no sales loads, and utilize in-kind creation/redemption mechanisms to avoid triggering taxable capital gains.
            </p>
          </div>

          {/* FAQ 11 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              11. Can a mutual fund charge both a front-end load and a high annual expense ratio?
            </h3>
            <p className="text-black dark:text-slate-100">
              Yes. Many actively managed Class A retail mutual funds charge both a 5.0% front-end entry commission and an annual operating expense ratio of 1.0% to 1.5%. This dual-fee structure creates severe compounding drag on long-term wealth accumulation.
            </p>
          </div>

          {/* FAQ 12 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              12. How does portfolio turnover rate create hidden trading costs in mutual funds?
            </h3>
            <p className="text-black dark:text-slate-100">
              Turnover measures how frequently the fund manager buys and sells securities inside the portfolio. High turnover (&gt;100%/yr) incurs substantial institutional brokerage commissions, bid-ask spreads, and market impact costs that are not included in the published expense ratio but silently subtract from fund returns.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MutualFundContent;

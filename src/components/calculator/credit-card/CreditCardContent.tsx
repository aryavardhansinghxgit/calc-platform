"use client";

import React from "react";
import Link from "next/link";

export function CreditCardContent() {
  return (
    <div className="space-y-12 text-black dark:text-slate-100 font-normal leading-relaxed text-sm">
      {/* 1. WHAT IS A CREDIT CARD CALCULATOR? */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          1. What Is a Credit Card Calculator?
        </h2>
        <p>
          A credit card calculator is an interactive financial modeling tool engineered to analyze the dynamics of revolving consumer debt. Unlike installment credit—such as an auto loan or a fixed-rate mortgage modeled through a{" "}
          <Link
            href="/calculators/loan-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            standard consumer loan calculator
          </Link>
          —credit cards do not have a predetermined payoff schedule, fixed principal maturity date, or static monthly installment amount. Instead, cardholders are extended an open-ended line of credit up to a pre-approved credit limit, against which they may repeatedly borrow, repay, and borrow again.
        </p>
        <p>
          Every billing cycle, a cardholder&apos;s financial obligations fluctuate based on new transactions, posted payments, interest charges, annual percentage rates (APRs), and issuer-mandated minimum payment requirements. Because revolving interest compounds over time on unpaid balances, small changes in monthly repayment amounts can alter debt-free timelines by years and shift total finance charges by thousands of dollars.
        </p>
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
          <span className="font-bold text-sm text-black dark:text-slate-100 block">
            Core Educational Simulation Capabilities
          </span>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>Model payoff durations under fixed monthly payment amounts or target debt-free timelines.</li>
            <li>Analyze the mechanics of monthly interest compounding and finance charge accumulation.</li>
            <li>Evaluate the mathematical consequences of paying only issuer minimums versus accelerated payments.</li>
            <li>Quantify the net economic benefit and break-even timeline of 0% promotional balance transfers.</li>
            <li>Compare multi-card debt elimination methodologies (Debt Avalanche vs. Debt Snowball).</li>
            <li>Calculate revolving credit utilization ratios and estimate paydown paths toward benchmark levels.</li>
            <li>Estimate the total upfront fees and immediate interest costs of credit card cash advances.</li>
          </ul>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          This calculator is designed as an educational simulation tool. It isolates key financial variables to provide transparent, standardized estimates. It does not pull live financial accounts, reproduce an individual issuer&apos;s billing statement down to the penny, or guarantee specific credit score outcomes.
        </p>
      </section>

      {/* 2. HOW CREDIT CARD INTEREST IS CALCULATED */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          2. How Credit Card Interest Is Calculated
        </h2>
        <p>
          Understanding how finance charges accrue is fundamental to managing revolving debt. Credit card interest calculations involve two distinct perspectives: the simplified monthly periodic rate model used by this calculator, and the daily periodic rate methods commonly employed by commercial credit card issuers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-base text-black dark:text-slate-100">
              A. This Calculator&apos;s Monthly Model
            </h3>
            <p className="text-xs sm:text-sm">
              To provide clear and responsive planning estimates, this calculator applies a standardized monthly periodic rate to the beginning balance of each monthly cycle:
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
              <div>Monthly Periodic Rate (r) = APR ÷ 12</div>
              <div>Monthly Interest = Beginning Balance × r</div>
            </div>
            <p className="text-xs">
              For example, on an $8,000 balance at 18% APR, the monthly rate is 1.5% (0.015), producing a first-month finance charge of $120.00 ($8,000 × 0.015). For compounding variations, see our{" "}
              <Link
                href="/calculators/apr-calculator"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                comprehensive APR calculator
              </Link>.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-base text-black dark:text-slate-100">
              B. Real-World Issuer Methods (Daily ADB)
            </h3>
            <p className="text-xs sm:text-sm">
              In live accounts, many card issuers calculate interest on a daily basis using the Average Daily Balance (ADB) method:
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
              <div>Daily Periodic Rate (DPR) = APR ÷ 365</div>
              <div>ADB = (Sum of Daily Balances) ÷ (Days in Cycle)</div>
              <div>Monthly Interest ≈ ADB × DPR × Days in Cycle</div>
            </div>
            <p className="text-xs">
              On a 30-day month with a static $8,000 balance, the daily ADB method produces $118.36 ($8,000 × (0.18 ÷ 365) × 30).
            </p>
          </div>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left border-collapse border border-slate-300 dark:border-slate-700 text-xs sm:text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800 text-black dark:text-slate-100">
              <tr>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Calculation Dimension</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Calculator Model (Monthly Periodic)</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Commercial Issuer Method (Daily ADB)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">Periodic Rate</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">18% ÷ 12 = 1.500000% per month</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">18% ÷ 365 = 0.049315% per day</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">Cycle Balance Base</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">Static starting balance ($8,000.00)</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">Sum of daily closing balances ÷ 30</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">Modeled Interest (30 Days)</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">$120.00</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-bold">$118.36</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. CREDIT CARD PAYOFF TIMELINES & FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          3. Credit Card Payoff Timelines &amp; Formulas
        </h2>
        <p>
          When paying a fixed monthly amount toward a revolving credit card balance, each payment must first satisfy the accrued monthly finance charge. The remainder is applied toward reducing the principal balance.
        </p>

        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
          <span className="font-bold text-sm text-black dark:text-slate-100 block">
            Payoff Duration Formula (Ordinary Annuity Amortization)
          </span>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm">
            n = -ln(1 - (B × r) / P) ÷ ln(1 + r)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
            <div><strong>n</strong> = Number of monthly repayment periods (months)</div>
            <div><strong>B</strong> = Outstanding principal balance ($)</div>
            <div><strong>r</strong> = Monthly periodic interest rate (APR ÷ 100 ÷ 12)</div>
            <div><strong>P</strong> = Total monthly payment amount ($)</div>
          </div>
        </div>

        <p>
          <strong>Modeled Example ($8,000 Balance, 18% APR, $200/Month):</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
          <li>Monthly Periodic Rate: r = 0.18 ÷ 12 = 0.015</li>
          <li>Interest Quotient: (8,000 × 0.015) ÷ 200 = 120 ÷ 200 = 0.60</li>
          <li>Numerator: -ln(1 - 0.60) = -ln(0.40) ≈ 0.916291</li>
          <li>Denominator: ln(1 + 0.015) = ln(1.015) ≈ 0.0148886</li>
          <li>Payoff Duration: n = 0.916291 ÷ 0.0148886 ≈ 61.54 → <strong>62 Months (5 Years, 2 Months)</strong></li>
          <li>Total Interest Paid: <strong>$4,308.98</strong> | Total Repayment Amount: <strong>$12,308.98</strong></li>
        </ul>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          For granular milestone schedules, accelerated lump-sum calculators, and payoff date targets, see our{" "}
          <Link
            href="/calculators/credit-card-payoff-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            dedicated credit card payoff calculator
          </Link>.
        </p>
      </section>

      {/* 4. MINIMUM PAYMENTS & NEGATIVE AMORTIZATION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          4. Minimum Payments &amp; Negative Amortization
        </h2>
        <p>
          Card issuers require borrowers to make a minimum monthly payment to keep accounts in good standing and avoid late penalties. However, minimum payment structures are engineered primarily to reduce short-term default risk rather than accelerate debt elimination.
        </p>

        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-3">
          <h3 className="font-bold text-sm text-black dark:text-slate-100">
            How Minimum Payments Are Structured
          </h3>
          <p className="text-xs sm:text-sm">
            Minimum-payment formulas vary by issuer and card agreement. A formula may combine a percentage of the balance with interest and fees, apply a fixed minimum-dollar amount, or use multiple conditional rules. Common market structures include:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Percentage Plus Finance Charges:</strong> max(Floor, Monthly Interest + Fees + 1% of Principal Balance)</li>
            <li><strong>Flat Percentage:</strong> max(Floor, Percentage of Total Balance)</li>
            <li><strong>Fixed Dollar Floor:</strong> A mandatory baseline (with CFPB market reports observing fixed floors commonly ranging from $15 to $50).</li>
          </ul>
        </div>

        <p>
          <strong>The Declining Minimum Trap (Illustrative Scenario):</strong> Because percentage-based minimum payments scale with the remaining balance, the required payment decreases every single month as principal declines. In illustrative modeling scenarios on an $8,000 balance at 18% APR, relying exclusively on minimum payments can stretch repayment across <strong>15 to 30+ years</strong> and result in total interest charges exceeding the original balance borrowed.
        </p>

        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700 space-y-2">
          <span className="font-bold text-sm text-amber-900 dark:text-amber-200 block">
            Negative Amortization (Payment ≤ Monthly Interest)
          </span>
          <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-100">
            Under this calculator&apos;s simplified model, if your scheduled monthly payment is less than or equal to the monthly interest charge, the payment cannot cover accrued finance charges. Unpaid interest prevents principal reduction, causing debt to expand indefinitely rather than amortizing toward zero.
          </p>
        </div>
      </section>

      {/* 5. EXTRA PAYMENTS & LUMP-SUM ACCELERATION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          5. Extra Payments &amp; Lump-Sum Acceleration
        </h2>
        <p>
          Under this calculator&apos;s simplified model, the portion of a payment remaining after modeled interest is applied reduces the outstanding balance. Because revolving finance charges are calculated on the remaining balance, paying extra principal produces an immediate, compounding reduction in future interest charges.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-300 dark:border-slate-700 text-xs sm:text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800 text-black dark:text-slate-100">
              <tr>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Repayment Scenario</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Monthly Payment</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Payoff Timeline</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Total Interest</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Interest Savings</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Time Saved</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">Base Plan</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$200.00</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">62 Months</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$4,308.98</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">—</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">—</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">+$50/Month Extra</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$250.00</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">45 Months</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$3,017.31</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">$1,291.67</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-bold">17 Months</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">+$100/Month Extra</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$300.00</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">35 Months</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$2,323.85</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">$1,985.13</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-bold">27 Months</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">$1,000 Lump Sum</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$200.00</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">51 Months</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$3,165.72</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">$1,143.26</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-bold">11 Months</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. AMORTIZATION SCHEDULE */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          6. Understanding Your Credit Card Amortization Schedule
        </h2>
        <p>
          An amortization schedule provides a complete month-by-month accounting of how each payment is divided between finance charges and principal reduction throughout the repayment term:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
          <li><strong>Total Payment:</strong> Payment = Interest Paid + Principal Paid</li>
          <li><strong>Ending Balance:</strong> Ending Balance = Starting Balance - Principal Paid</li>
        </ul>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left border-collapse border border-slate-300 dark:border-slate-700 text-xs sm:text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800 text-black dark:text-slate-100">
              <tr>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Month</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Starting Balance</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Total Payment</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Principal Paid</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Interest Paid</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Ending Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">Month 1</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$8,000.00</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$200.00</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$80.00</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$120.00</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$7,920.00</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">Month 12</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$7,064.21</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$200.00</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$94.04</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$105.96</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$6,970.17</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">Month 36</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$4,394.88</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$200.00</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$134.08</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$65.92</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$4,260.80</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">Month 62</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$107.24</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$108.85</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$107.24</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$1.61</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-bold">$0.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          To analyze fixed installment schedules for mortgages or auto loans, use our general{" "}
          <Link
            href="/calculators/amortization-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            loan amortization calculator
          </Link>.
        </p>
      </section>

      {/* 7. DEBT AVALANCHE VS DEBT SNOWBALL */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          7. Debt Avalanche vs. Debt Snowball for Credit Cards
        </h2>
        <p>
          When managing multiple revolving credit accounts, allocating extra budget strategically can significantly impact the speed and cost of debt elimination:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-base text-black dark:text-slate-100">
              1. Debt Avalanche (Highest APR First)
            </h3>
            <p className="text-xs sm:text-sm">
              Under the calculator&apos;s fixed-rate, fixed-budget assumptions, the Avalanche method prioritizes the card with the highest APR and mathematically minimizes modeled total interest costs and repayment duration.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-base text-black dark:text-slate-100">
              2. Debt Snowball (Smallest Balance First)
            </h3>
            <p className="text-xs sm:text-sm">
              The Snowball method prioritizes the smallest balance first. It may create earlier account closures and a sense of progress, providing psychological momentum, although it can produce higher modeled interest than Avalanche.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400">
          To build a unified repayment plan across multiple debt categories, explore our{" "}
          <Link
            href="/calculators/debt-payoff-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            multi-debt payoff calculator
          </Link>.
        </p>
      </section>

      {/* 8. 0% APR BALANCE TRANSFERS & BREAK-EVEN ANALYSIS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          8. 0% APR Balance Transfers &amp; Break-Even Analysis
        </h2>
        <p>
          A 0% APR balance transfer temporarily waives finance charges for an introductory promotional window (commonly 12 to 21 months).
        </p>

        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
          <span className="font-bold text-sm text-black dark:text-slate-100 block">
            Simple Break-Even Estimate
          </span>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm">
            Break-Even Month = ⌈Transfer Fee Amount ÷ Monthly Interest Saved on Original Card⌉
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            This approximation uses initial monthly interest; a comprehensive modeled comparison accounts for declining balances and cumulative interest over time.
          </p>
        </div>

        <p className="text-xs sm:text-sm">
          <strong>Important Consumer Nuance:</strong> Promotional 0% interest is temporary. After the introductory window expires, the card&apos;s standard post-promotional APR applies to any residual balance. Furthermore, the CFPB cautions that carrying a transferred balance can cause new purchases to accrue interest depending on the card&apos;s terms and grace period. To compare alternative fixed-rate restructuring options, see our{" "}
          <Link
            href="/calculators/debt-consolidation-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            debt consolidation calculator
          </Link>{" "}
          and{" "}
          <Link
            href="/calculators/personal-loan-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            fixed-rate personal loan calculator
          </Link>.
        </p>
      </section>

      {/* 9. ACCELERATED PAYMENT MODELS: BIWEEKLY PAYMENTS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          9. Accelerated Payment Models: Biweekly Credit Card Payments
        </h2>
        <p>
          Making biweekly payments is an accelerated payoff strategy. Because there are 52 weeks in a calendar year, paying half of your regular monthly payment every two weeks results in 26 half-payments:
        </p>
        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono text-xs sm:text-sm">
          26 Half-Payments per Year = 13 Monthly-Equivalent Payments (Monthly Payment × 13 ÷ 12)
        </div>
        <p className="text-xs sm:text-sm">
          This extra monthly equivalent per year accelerates principal reduction and shortens total repayment duration. This is an educational payment model; cardholders should confirm their issuer&apos;s payment posting rules.
        </p>
      </section>

      {/* 10. CREDIT UTILIZATION & CREDIT-SCORE CONTEXT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          10. Credit Utilization &amp; Credit-Score Context
        </h2>
        <p>
          Revolving credit utilization measures the proportion of your available credit limits that you are actively borrowing:
        </p>
        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono text-xs sm:text-sm">
          Utilization Ratio (%) = (Total Outstanding Balances ÷ Total Credit Limits) × 100
        </div>
        <p className="text-xs sm:text-sm">
          Credit utilization is an important factor in many credit-scoring models. Keeping balances low relative to available credit is generally recommended. Ratios below 30% and 10% are commonly cited reference benchmarks, not guaranteed score thresholds.
        </p>
      </section>

      {/* 11. CREDIT CARD CASH ADVANCE COSTS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          11. Credit Card Cash Advance Costs
        </h2>
        <p>
          A credit card cash advance carries substantially higher borrowing costs than purchase transactions:
        </p>
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 text-xs sm:text-sm">
          <div><strong>Upfront Charges:</strong> max(Amount × Fee%, Fee Floor) + ATM Surcharge</div>
          <div><strong>Accrued Interest:</strong> Amount × (Cash Advance APR ÷ 365) × Days Held</div>
          <div><strong>Total Repayment Cost:</strong> Amount + Upfront Charges + Accrued Interest</div>
        </div>
        <p className="text-xs sm:text-sm">
          Cash advances generally begin accruing interest from the transaction date, and the applicable APR and fees depend on the card agreement. For example, borrowing $1,000 at 27.99% APR with a 5% fee and $4 ATM surcharge for 30 days costs $77.01 in total charges.
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          <strong>Simple Annualized Cost Equivalent: 93.7%</strong>. This figure annualizes the 30-day modeled cost on a simple basis; it is not the card&apos;s APR or an effective annual rate.
        </p>
      </section>

      {/* 12. GRACE PERIODS, PENALTY APRS & CARDHOLDER PROTECTIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          12. Grace Periods, Penalty APRs &amp; Cardholder Protections
        </h2>
        <div className="space-y-3 text-xs sm:text-sm">
          <p>
            <strong>21-Day Statement Delivery vs. Purchase Grace Period:</strong> Federal rules (Regulation Z 12 CFR § 1026.5(b)(2)(ii)) generally require periodic statements to be delivered at least 21 days before the payment due date. A purchase grace period is a contractual feature offered by many card issuers, not a universally mandated benefit. If your card provides a purchase grace period, carrying an unpaid balance can cause you to lose that grace-period benefit, depending on the card agreement.
          </p>
          <p>
            <strong>Trailing (Residual) Interest:</strong> When a balance is carried, interest may continue to accrue between the statement closing date and the date payment posts, potentially requiring consecutive on-time full payments to fully restore the grace period.
          </p>
          <p>
            <strong>Penalty APRs &amp; Rate Reevaluation:</strong> If an account becomes 60 or more days delinquent, issuers may apply a penalty APR subject to 45 days advance notice. For rate increases covered by Regulation Z&apos;s reevaluation rules (12 CFR § 1026.59), the issuer must review the rate increase at least once every six months. A review does not necessarily restore the original APR; any required reduction depends on applicable rules and the issuer&apos;s reasonable review policies.
          </p>
        </div>
      </section>

      {/* 13. METHODOLOGY & TECHNICAL ASSUMPTIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          13. Credit Card Calculator Methodology &amp; Technical Assumptions
        </h2>
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 text-xs sm:text-sm">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Monthly Compounding:</strong> Calculations apply a monthly periodic rate (APR ÷ 12).</li>
            <li><strong>Rounding Precision:</strong> Internal computations use double-precision floating points; display values round to two decimal places ($0.01).</li>
            <li><strong>Payment Hierarchy:</strong> Payments satisfy monthly modeled interest first, with the remainder reducing principal balance.</li>
            <li><strong>Final-Payment Clamping:</strong> Payments in the terminal month clamp exactly to residual balance plus interest, reaching $0.00 without negative balances.</li>
            <li><strong>Model Exclusions:</strong> Simulations assume static APRs and zero new mid-cycle transactions during the modeled payoff term.</li>
          </ul>
        </div>
      </section>

      {/* 14. FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          14. Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          The following reference answers address common consumer inquiries regarding credit card calculations, interest compounding, and repayment strategies:
        </p>

        <div className="space-y-3 pt-2">
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              1. How is credit card interest calculated on a daily balance?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              This calculator uses a simplified monthly periodic-rate model where monthly interest equals beginning balance multiplied by (APR ÷ 12). In real-world credit card accounts, many issuers calculate interest daily using the Average Daily Balance (ADB) method: the Annual Percentage Rate is divided by 365 to establish a Daily Periodic Rate (DPR), and monthly finance charges equal ADB × DPR × Number of Days in the Billing Cycle.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              2. What is the credit card minimum payment trap and how does it work?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              The minimum payment trap is an illustrative scenario that occurs when a borrower pays only the minimum amount required by the issuer. Because the required dollar amount decreases as the principal shrinks, repayment can stretch across 15 to 30+ years in typical modeling scenarios, substantially increasing total lifetime interest costs compared to fixed monthly payments.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              3. Which debt elimination strategy is better: Debt Avalanche or Debt Snowball?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Under fixed-rate, fixed-budget assumptions and the calculator&apos;s simplified model, the Debt Avalanche method mathematically minimizes total interest paid by targeting the card with the highest APR first. The Debt Snowball method prioritizes the smallest balance first to build behavioral momentum and provide psychological motivation through faster account closures.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              4. How does a 0% APR balance transfer save money on credit card debt?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A 0% balance transfer credit card temporarily waives interest charges for an introductory promotional window (commonly 12 to 21 months), allowing 100% of payments during that window to reduce principal. After accounting for the upfront transfer fee (typically 3% to 5%) and any post-promotional APR applied to remaining balances, cardholders can achieve substantial interest savings. Note that new purchases made on the card may accrue interest while a transferred balance is carried.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              5. What happens if my monthly payment is less than the monthly interest charge?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Negative amortization occurs under this simplified model: the unpaid monthly interest charge exceeds the payment amount, and the remaining debt balance expands over time rather than amortizing toward zero.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              6. How does my credit card balance affect my credit utilization score?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Credit utilization measures the percentage of your total revolving credit limit currently reported as outstanding (Total Balances ÷ Total Limits). Revolving credit utilization is an important factor in many credit-scoring models (such as FICO and VantageScore). Maintaining modest utilization (such as below 30% or 10%) is a widely recognized reference benchmark, though exact score impacts depend on the individual scoring model and overall credit profile.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              7. Why do credit card cash advances cost significantly more than purchases?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Cash advances generally do not have a purchase grace period; interest begins accruing immediately upon withdrawal from the transaction date under typical card terms. In addition, cash advances often carry higher APRs than purchases and incur upfront transaction fees (such as 3% to 5% with a minimum dollar floor) plus potential third-party ATM surcharges.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              8. How does making bi-weekly payments help pay off credit card debt faster?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Making an accelerated bi-weekly payment of half your monthly amount results in 26 half-payments per year, which equals 13 full monthly payments instead of 12. This accelerated payment model directly reduces principal faster, shortens overall payoff timelines, and reduces total interest charges.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              9. Can I lower my credit card APR by negotiating directly with my card issuer?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Some card issuers may consider APR reductions, temporary promotional rates, or hardship repayment plans for existing cardholders in good standing, but approval and the terms of any rate adjustment depend entirely on the issuer, account history, credit standing, and individual circumstances.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              10. What is a Penalty APR and how is it triggered?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A Penalty APR is an elevated, punitive interest rate that issuers may apply when an account becomes 60 or more days delinquent. For rate increases covered by Regulation Z&apos;s reevaluation rules, the issuer must review the applicable rate increase at least once every six months. A review does not necessarily restore the original APR; any required reduction depends on the applicable rule and the issuer&apos;s reasonable review policies.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              11. When should I consider a personal consolidation loan over credit cards?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A fixed-rate personal debt consolidation loan may be beneficial when a borrower can secure an interest rate substantially lower than their credit card APRs and prefers a fixed monthly payment with a defined loan term (such as 2 to 5 years), provided origination fees and total borrowing costs are carefully evaluated.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              12. What is the credit card grace period and how does it work?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Under federal rules (Regulation Z / CARD Act), card issuers must generally deliver periodic billing statements at least 21 days before the payment due date. A purchase grace period is a contractual feature offered by many card issuers. If your card provides a purchase grace period, carrying an unpaid balance can cause you to lose that grace-period benefit, depending on the card agreement. When a grace period is lost, new purchases may begin accruing interest according to the account&apos;s terms.
            </p>
          </div>
        </div>
      </section>

      {/* 15. METHODOLOGY & DISCLAIMER */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          15. Calculation Methodology &amp; Educational Disclaimer
        </h2>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-2">
          <p>
            This credit card calculator is provided solely for educational, illustrative, and personal financial planning purposes. Calculations are mathematical simulations based on standardized monthly compounding formulas and user-supplied numerical inputs.
          </p>
          <p>
            Actual credit card account terms, finance charges, daily balance calculations, billing cycle day counts, fees, and promotional APR terms are determined exclusively by your cardholder agreement and issuing financial institution. This tool does not provide legal, tax, investment, or individualized financial advice.
          </p>
        </div>
      </section>
    </div>
  );
}

export default CreditCardContent;

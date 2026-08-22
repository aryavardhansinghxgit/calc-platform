"use client";

import React from "react";
import Link from "next/link";

export function CreditCardPayoffContent() {
  return (
    <div className="space-y-12 text-black dark:text-slate-100 font-normal leading-relaxed text-sm">
      {/* 1. WHAT IS A CREDIT CARD PAYOFF CALCULATOR? */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          1. What Is a Credit Card Payoff Calculator?
        </h2>
        <p>
          A credit card payoff calculator is a quantitative financial modeling tool engineered to solve the mathematical dynamics of revolving consumer debt elimination. While a{" "}
          <Link
            href="/calculators/credit-card-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            general credit card calculator
          </Link>{" "}
          evaluates monthly finance charges, credit utilization, and cardholder protections, this dedicated payoff suite focuses specifically on debt-free timelines, required monthly budgets, multi-card acceleration strategies, and interest-minimization pathways.
        </p>
        <p>
          Unlike fixed installment loans with static maturity dates, credit cards are open-ended revolving lines of credit. Every monthly billing cycle, finance charges compound on the remaining unpaid balance. Consequently, even modest adjustments to your monthly payment amount can shorten your repayment timeline by years and save thousands of dollars in cumulative interest.
        </p>

        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
          <span className="font-bold text-sm text-black dark:text-slate-100 block">
            Integrated Debt-Elimination Engines in This Suite
          </span>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li><strong>Multi-Card Payoff Suite:</strong> Compare Debt Avalanche (highest APR first) vs. Debt Snowball (smallest balance first) across multiple card accounts.</li>
            <li><strong>Fixed Monthly Payment Solver:</strong> Calculate exact payoff months and cumulative finance charges given a set monthly repayment budget.</li>
            <li><strong>Target Payoff Date Solver:</strong> Solve the required monthly payment needed to clear an outstanding balance within a specific target number of months.</li>
            <li><strong>Minimum Payment Trap Comparator:</strong> Contrast the cost of paying only issuer minimums against accelerated monthly payment plans.</li>
            <li><strong>0% APR Balance Transfer Optimizer:</strong> Model upfront transfer fees, promotional clearing payments, and net interest savings.</li>
            <li><strong>Daily Periodic Rate (DPR) Solver:</strong> Illustrate how daily finance charges accrue across billing cycles under daily periodic rate conventions.</li>
          </ul>
        </div>
      </section>

      {/* 2. HOW CREDIT CARD PAYOFF TIMELINES ARE CALCULATED */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          2. How Credit Card Payoff Timelines Are Calculated
        </h2>
        <p>
          To determine how many months it will take to pay off a credit card balance with a fixed monthly payment, the calculator applies an ordinary annuity logarithmic formula based on monthly periodic compounding:
        </p>

        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
          <span className="font-bold text-sm text-black dark:text-slate-100 block">
            Logarithmic Payoff Duration Formula
          </span>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm">
            n = -ln(1 - (B × r) / P) ÷ ln(1 + r)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
            <div><strong>n</strong> = Number of monthly payment periods</div>
            <div><strong>B</strong> = Starting principal credit card balance ($)</div>
            <div><strong>r</strong> = Monthly periodic interest rate (APR ÷ 100 ÷ 12)</div>
            <div><strong>P</strong> = Fixed monthly payment amount ($)</div>
          </div>
        </div>

        <p>
          <strong>Step-by-Step Worked Example ($5,000 Balance, 21.99% APR, $200/Month Payment):</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
          <li><strong>Monthly Periodic Rate:</strong> r = 0.2199 ÷ 12 = 0.018325 per month</li>
          <li><strong>Interest Quotient:</strong> (5,000 × 0.018325) ÷ 200 = 91.625 ÷ 200 = 0.458125</li>
          <li><strong>Numerator:</strong> -ln(1 - 0.458125) = -ln(0.541875) ≈ 0.612719</li>
          <li><strong>Denominator:</strong> ln(1 + 0.018325) = ln(1.018325) ≈ 0.018159</li>
          <li><strong>Payoff Duration:</strong> n = 0.612719 ÷ 0.018159 ≈ 33.74 → <strong>34 Months</strong> (2 Years, 10 Months)</li>
          <li><strong>Cumulative Interest Paid:</strong> <strong>$1,748.69</strong> | <strong>Total Amount Repaid:</strong> <strong>$6,748.69</strong></li>
        </ul>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          To convert annual rates to daily periodic rates or effective annual yields, see our{" "}
          <Link
            href="/calculators/apr-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            comprehensive APR calculator
          </Link>.
        </p>
      </section>

      {/* 3. CALCULATING MONTHLY PAYMENT FOR TARGET PAYOFF DATE */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          3. Calculating the Monthly Payment for a Target Payoff Date
        </h2>
        <p>
          When you have a specific debt-free deadline—such as eliminating your balance in 12, 24, or 36 months—the required fixed monthly payment is solved using the inverse amortizing payment formula:
        </p>

        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
          <span className="font-bold text-sm text-black dark:text-slate-100 block">
            Required Monthly Payment Formula (Amortized Installment)
          </span>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm">
            PMT = [B × r × (1 + r)^n] ÷ [(1 + r)^n - 1]
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            For 0% promotional rates, the equation simplifies to: PMT = B ÷ n.
          </p>
        </div>

        <p>
          <strong>Target Payoff Benchmarks on an $8,000 Balance at 22.50% APR:</strong>
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-300 dark:border-slate-700 text-xs sm:text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800 text-black dark:text-slate-100">
              <tr>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Target Timeframe</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Required Monthly Payment</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Total Interest Incurred</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Total Repayment Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">12 Months (1 Year)</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">$748.83/mo</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$985.95</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$8,985.95</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">24 Months (2 Years)</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">$417.00/mo</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$2,008.08</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$10,008.08</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">36 Months (3 Years)</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">$308.17/mo</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$3,094.27</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$11,094.27</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">48 Months (4 Years)</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">$255.08/mo</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$4,243.68</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$12,243.68</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          To model fixed installment schedules for personal or auto loans, use our{" "}
          <Link
            href="/calculators/loan-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            standard consumer loan calculator
          </Link>.
        </p>
      </section>

      {/* 4. MATHEMATICAL IMPACT OF EXTRA PAYMENTS & LUMP SUMS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          4. The Mathematical Impact of Extra Payments &amp; Lump Sums
        </h2>
        <p>
          Because revolving interest is computed directly on the outstanding principal balance, every additional dollar paid above accrued finance charges creates an immediate compounding reduction in subsequent interest charges.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-300 dark:border-slate-700 text-xs sm:text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800 text-black dark:text-slate-100">
              <tr>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Repayment Plan ($5,000 @ 21.99%)</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Monthly Payment</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Payoff Duration</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Total Interest</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Interest Savings</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Time Saved</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">Base Plan</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$200.00/mo</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">34 Months</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$1,748.69</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">—</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">—</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">+$50/Month Extra</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$250.00/mo</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">26 Months</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$1,280.95</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">$467.74</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-bold">8 Months</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">+$100/Month Extra</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$300.00/mo</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">21 Months</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$1,012.35</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">$736.34</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-bold">13 Months</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">$1,000 Initial Lump Sum</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$200.00/mo</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">26 Months</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$1,211.53</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">$537.16</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-bold">8 Months</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. MINIMUM PAYMENT TRAP & NEGATIVE AMORTIZATION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          5. The Minimum Payment Trap &amp; Negative Amortization
        </h2>
        <p>
          Card issuers require minimum monthly payments to service debt and prevent delinquency. However, because percentage-based minimum payment requirements scale down as the balance shrinks, relying solely on minimum payments creates an illustrative scenario known as the <em>minimum payment trap</em>.
        </p>

        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
          <span className="font-bold text-sm text-black dark:text-slate-100 block">
            Illustrative Minimum Payment Comparator Model
          </span>
          <p className="text-xs sm:text-sm">
            This calculator models an illustrative minimum-payment formula: <code>max($25, 2% of balance + monthly modeled interest)</code>. On a $6,000 balance at 24.0% APR, the baseline minimum payment is $240.00/month:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Minimum Only ($240.00/mo):</strong> 36 Months | Total Interest: <strong>$2,400.68</strong> | Total Cost: $8,400.68</li>
            <li><strong>+$50/Month Plan ($290.00/mo):</strong> 27 Months | Total Interest: <strong>$1,821.46</strong> (Saves $579.22)</li>
            <li><strong>+$100/Month Plan ($340.00/mo):</strong> 22 Months | Total Interest: <strong>$1,474.22</strong> (Saves $926.46)</li>
          </ul>
          <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
            Note: Actual minimum-payment rules vary by issuer and cardholder agreement.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700 space-y-2">
          <span className="font-bold text-sm text-amber-900 dark:text-amber-200 block">
            Negative Amortization Boundary (Payment ≤ Monthly Interest)
          </span>
          <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-100">
            Under the calculator&apos;s monthly model, if your monthly payment is less than or equal to the monthly interest charge, the payment cannot cover accrued finance charges. The balance will not amortize toward zero.
          </p>
        </div>
      </section>

      {/* 6. UNDERSTANDING AMORTIZATION SCHEDULE */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          6. Understanding Your Credit Card Amortization Schedule
        </h2>
        <p>
          An amortization schedule provides a transparent month-by-month accounting of how each payment is divided between accrued finance charges and principal reduction throughout the repayment term:
        </p>

        <div className="overflow-x-auto">
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
                <td className="p-3 border border-slate-300 dark:border-slate-700">$5,000.00</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$200.00</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$108.38</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$91.62</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$4,891.62</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">Month 12</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$3,663.78</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$200.00</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$132.86</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$67.14</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$3,530.92</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">Month 24</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$1,894.67</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$200.00</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$165.28</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$34.72</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$1,729.39</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-medium">Month 34</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$146.03</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$148.71</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$146.03</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700">$2.68</td>
                <td className="p-3 border border-slate-300 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">$0.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          To inspect fixed-schedule installment loans, use our{" "}
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
          7. Debt Avalanche vs. Debt Snowball: Choosing Your Strategy
        </h2>
        <p>
          When managing multiple credit cards, allocating extra monthly funds strategically across your portfolio determines the speed and total cost of debt elimination:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-base text-black dark:text-slate-100">
              1. Debt Avalanche (Highest APR First)
            </h3>
            <p className="text-xs sm:text-sm">
              Under fixed-rate, fixed-budget assumptions with no new purchases or changing fees, the Debt Avalanche method prioritizes the card with the highest APR, minimizing modeled total interest cost and overall debt-free duration.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-base text-black dark:text-slate-100">
              2. Debt Snowball (Smallest Balance First)
            </h3>
            <p className="text-xs sm:text-sm">
              The Debt Snowball method targets the card with the smallest dollar balance first, producing earlier individual account closures that may provide psychological momentum and simplify monthly obligations.
            </p>
          </div>
        </div>

        <p>
          <strong>Comparative Example ($14,500 Across 3 Cards, $500/Month Budget):</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
          <li><strong>Card Roster:</strong> Card 1 ($4,600 @ 18.99%), Card 2 ($3,900 @ 19.99%), Card 3 ($6,000 @ 15.99%).</li>
          <li><strong>Debt Avalanche Result:</strong> 38 Months | Total Interest: <strong>$4,471.20</strong> | Total Cost: $18,971.20</li>
          <li><strong>Debt Snowball Result:</strong> 38 Months | Total Interest: <strong>$4,582.47</strong> | Total Cost: $19,082.47</li>
          <li><strong>Net Difference:</strong> Avalanche saves <strong>$111.27</strong> in total interest under this model.</li>
        </ul>
      </section>

      {/* 8. PAYING OFF MULTIPLE CREDIT CARDS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          8. How to Pay Off Multiple Credit Cards Efficiently
        </h2>
        <p>
          Managing multi-card payoff requires establishing a disciplined payment hierarchy:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm">
          <li><strong>Service All Minimums:</strong> Pay the required minimum payment on every active card to keep accounts in good standing.</li>
          <li><strong>Target Extra Funds:</strong> Direct 100% of your remaining discretionary payoff budget toward your primary target card (highest APR for Avalanche, or smallest balance for Snowball).</li>
          <li><strong>Execute the Rollover:</strong> Once the target card reaches a zero balance, roll its entire payment amount into the next target card in line.</li>
        </ol>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          To manage non-card debt portfolios such as auto or student loans, explore our{" "}
          <Link
            href="/calculators/debt-payoff-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            multi-debt portfolio payoff calculator
          </Link>.
        </p>
      </section>

      {/* 9. 0% BALANCE TRANSFERS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          9. 0% APR Balance Transfers: Payoff Acceleration &amp; Net Savings
        </h2>
        <p>
          A 0% APR balance transfer credit card temporarily waives interest charges for an introductory promotional window in exchange for an upfront balance transfer fee:
        </p>

        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
          <span className="font-bold text-sm text-black dark:text-slate-100 block">
            Balance Transfer Economics Model
          </span>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
            <div>Upfront Transfer Fee ($) = Balance × Transfer Fee %</div>
            <div>New Transferred Balance ($) = Balance + Upfront Transfer Fee</div>
            <div>Monthly Payment to Clear in Promo = New Transferred Balance ÷ Promotional Months</div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            <strong>Modeled Example ($7,500 Balance, 22.0% Original APR, 18 Months Promo, 3.0% Fee):</strong><br/>
            Upfront Fee: <strong>$225.00</strong> | New Balance: <strong>$7,725.00</strong> | Required Clearing Payment: <strong>$429.17/month</strong>.<br/>
            Estimated Interest on Old Card: $1,373.37 | Net Interest Savings (After Fee): <strong>$1,148.37</strong>.
          </p>
        </div>

        <p className="text-xs sm:text-sm">
          <strong>Post-Promotional Terms:</strong> Promotional periods and transfer fees vary by card offer. Any balance remaining after the introductory window expires will accrue interest at the card&apos;s standard post-promotional APR. To compare balance transfers with fixed-rate restructuring options, see our{" "}
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

      {/* 10. DAILY PERIODIC RATE VS MONTHLY PERIODIC MODELS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          10. Daily Periodic Rate (DPR) vs. Monthly Periodic Models
        </h2>
        <p>
          It is important to understand the modeling distinction between payoff planning tools and commercial credit card billing practices:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-base text-black dark:text-slate-100">
              A. Monthly Periodic Rate Model (Engines A–E)
            </h3>
            <p className="text-xs sm:text-sm">
              Applies a standardized monthly rate (<code>r = APR ÷ 12</code>) to starting balances to provide clear, responsive amortization projections over multi-year horizons.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-base text-black dark:text-slate-100">
              B. Simplified DPR Model (Engine F)
            </h3>
            <p className="text-xs sm:text-sm">
              Illustrates daily finance charges: <code>DPR = APR ÷ 365</code>. On a $4,000 balance at 24.99% APR for 30 billing days, DPR is <strong>0.0684657%/day</strong>, generating <strong>$2.74/day</strong> in interest and a <strong>$82.16/month</strong> finance charge.
            </p>
          </div>
        </div>
      </section>

      {/* 11. ADDITIONAL MONTHLY SPENDING */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          11. Monthly Additional Spending &amp; Debt Compounding
        </h2>
        <p>
          Adding new purchases during a debt payoff program undermines debt elimination. In the calculator&apos;s simulation sequence, finance charges accrue on starting balances, new spending is added, and the monthly payment is deducted:
        </p>
        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono text-xs sm:text-sm">
          Ending Balance = (Starting Balance × (1 + r)) + Monthly Additional Spend - Monthly Payment
        </div>
        <p className="text-xs sm:text-sm">
          If monthly spending plus accrued interest exceeds your payment, the balance expands over time rather than amortizing.
        </p>
      </section>

      {/* 12. CREDIT UTILIZATION & SCORE CONTEXT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          12. Credit Utilization &amp; Credit-Score Context During Paydown
        </h2>
        <p>
          Revolving credit utilization measures the percentage of your total available credit lines currently reported as debt:
        </p>
        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono text-xs sm:text-sm">
          Credit Utilization Ratio (%) = (Total Reported Balances ÷ Total Credit Limits) × 100
        </div>
        <p className="text-xs sm:text-sm">
          Credit utilization is an important factor in many credit-scoring models. Paying down balances can reduce reported utilization, but exact score impacts depend on the individual scoring model and complete credit profile.
        </p>
      </section>

      {/* 13. CARDHOLDER PROTECTIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          13. Cardholder Protections, Grace Periods &amp; Penalty APRs
        </h2>
        <div className="space-y-3 text-xs sm:text-sm">
          <p>
            <strong>21-Day Periodic Statement Delivery vs. Grace Period:</strong> Federal regulations (Regulation Z 12 CFR § 1026.5(b)(2)(ii)) generally require card issuers to deliver periodic statements at least 21 days before the payment due date. A purchase grace period is a contractual feature; carrying an unpaid balance can forfeit the grace-period benefit, causing new transactions to accrue interest according to account terms.
          </p>
          <p>
            <strong>Penalty APRs &amp; Rate Re-evaluation:</strong> If an account becomes 60 or more days delinquent, issuers may apply a penalty APR. Under Regulation Z (12 CFR § 1026.59), certain rate increases are subject to periodic re-evaluation requirements at least once every six months, though a review does not necessarily restore the original APR.
          </p>
          <p>
            <strong>Late-Fee Regulations:</strong> Late-fee amounts, penalty APRs, notice requirements, and fee limits depend on applicable federal regulations and the cardholder agreement.
          </p>
        </div>
      </section>

      {/* 14. FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100 tracking-tight">
          14. Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          The following reference answers address common consumer inquiries regarding credit card debt elimination, interest compounding, and repayment strategies:
        </p>

        <div className="space-y-3 pt-2">
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              1. What is the Debt Avalanche method for paying off credit cards?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              The Debt Avalanche method allocates all discretionary debt payoff funds toward the credit card with the highest Annual Percentage Rate (APR) while paying minimum dues on the rest. Once the highest-rate card is cleared, the freed-up payment rolls down to the next highest APR. Under fixed-rate, fixed-budget assumptions with no new purchases or changing fees, the Avalanche method prioritizes the highest-APR debt and minimizes modeled interest cost.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              2. What is the Debt Snowball method?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              The Debt Snowball method directs all extra payments to the credit card with the smallest outstanding dollar balance, regardless of interest rate. Once that card is fully paid off, the payment &apos;snowballs&apos; into the next smallest balance, providing fast psychological wins and momentum.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              3. What is the Minimum Payment Trap on credit cards?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Credit card issuers typically set minimum monthly payments using formulas that combine a percentage of principal with finance charges and fees (or a mandatory minimum dollar floor). Paying only the minimum causes the required payment to shrink as the balance declines, stretching repayment over extended timelines and substantially increasing total lifetime finance charges.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              4. How does Daily Periodic Rate (DPR) work on credit card balances?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Credit card interest is compounded daily by many card issuers using the Daily Periodic Rate (DPR = APR ÷ 365). Your DPR is multiplied each day by your Average Daily Balance, meaning making payments earlier in your billing cycle reduces accrued interest charges immediately.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              5. What is a 0% APR Balance Transfer and how does it save money?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A balance transfer card offers a 0% promotional interest rate for an introductory window (commonly 12 to 21 months) in exchange for an upfront transfer fee (typically 3% to 5%). During this interest-free promotional window, 100% of your monthly payments go directly toward reducing principal debt. Any balance remaining after the promotional period incurs standard post-promotional APR charges.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              6. Does paying off credit cards improve my credit score?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Credit utilization is an important factor in many credit-scoring models. Lower reported balances relative to available credit can be beneficial, but no utilization percentage guarantees a particular credit score.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              7. Should I close paid-off credit card accounts?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              In many cases, keeping paid-off cards open can help preserve your overall available credit limit (which keeps overall revolving utilization lower) and support credit history length. However, closing an account may make sense if the card carries high annual fees or presents an ongoing spending temptation.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              8. How does making bi-weekly credit card payments help?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Making an accelerated bi-weekly payment of half your monthly payment every two weeks results in 26 half-payments per year (equal to 13 full monthly payments). This extra annual payment reduces principal faster and shortens debt-free timelines.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              9. What is the difference between a Credit Card and a Debt Consolidation Loan?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A debt consolidation personal loan replaces multiple revolving credit card balances with a single fixed-rate installment loan, providing a set payoff end date and fixed monthly payments, whereas credit cards are open-ended revolving lines of credit.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              10. Can I negotiate lower interest rates with credit card companies?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Cardholders may ask their issuer about a lower APR, hardship program, or other account options. Approval and the terms of any change depend on the issuer, account history, and circumstances.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              11. What happens if I miss a minimum credit card payment?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A missed payment can trigger late fees, forfeit promotional 0% APRs, impose a high penalty APR, and result in a negative delinquency report to credit bureaus if unpaid past 30 days. Late-fee limits and amounts depend on applicable federal rules and the cardholder agreement.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-slate-100">
              12. How much should I pay each month to become debt-free in 2 years?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              To clear debt in 24 months, use an amortized installment formula that covers both monthly interest charges and steady principal reduction. For example, an $8,000 balance at 22.5% APR requires approximately $417.00/month to reach a zero balance in 24 months.
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
            This credit card payoff calculator is provided solely for educational, illustrative, and personal financial planning purposes. Projections are mathematical simulations based on standardized monthly compounding formulas (APR ÷ 12) or simplified daily periodic rate models (APR ÷ 365).
          </p>
          <p>
            Actual credit card account balances, daily finance charges, billing cycle lengths, fees, promotional terms, and repayment outcomes are determined exclusively by your cardholder agreement and issuing financial institution. This tool does not provide legal, tax, investment, or individualized financial advice.
          </p>
        </div>
      </section>
    </div>
  );
}

export default CreditCardPayoffContent;

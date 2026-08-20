"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Home, Shield, DollarSign, Calculator, HelpCircle } from "lucide-react";

export function MortgageContentSection() {
  return (
    <div className="space-y-10 py-4 text-slate-900 dark:text-slate-100">
      {/* SECTION 1: Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Home className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Understanding Your Mortgage &amp; Total Housing Costs
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A residential mortgage represents one of the largest long-term financial commitments a household can make.
          While homebuyers frequently evaluate properties based on the contract purchase price and the nominal interest
          rate, the true ongoing cost of homeownership involves a combination of debt service, local municipal property
          taxes, hazard insurance, community association assessments, and potential private mortgage insurance.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          This <strong>Mortgage Calculator</strong> is engineered to provide a comprehensive, transparent breakdown of
          your housing expenses. Beyond standard principal and interest calculations, it allows you to simulate
          real-world escrow expenses, projected annual cost inflation, accelerated biweekly payback schedules, and
          customized extra principal curtailment strategies to evaluate lifetime interest savings.
        </p>
      </section>

      {/* SECTION 2: How to Use the Mortgage Calculator */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          How to Use the Mortgage Calculator
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The calculator is organized into interactive modules that update monthly obligations, visual charts, and
          amortization schedules in real time:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Home Price &amp; Down Payment</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Enter the home contract purchase price and your upfront down payment (in dollars or percentage). The tool
              automatically computes required loan principal and loan-to-value (LTV) ratio.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Loan Term &amp; Interest Rate</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Specify your repayment horizon (such as 15 or 30 years) and the fixed annual note interest rate charged on
              the unpaid principal balance.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Taxes, Insurance &amp; PMI</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Input annual property taxes (as a flat dollar amount or percentage), annual hazard insurance premiums, and
              applicable Private Mortgage Insurance (PMI) rates for loans with less than 20% down.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">HOA Dues &amp; Maintenance Reserves</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Enter monthly Homeowners Association (HOA) fees and annual auxiliary maintenance reserves (which the
              calculator divides by 12 to establish a monthly reserve).
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Annual Cost Escalation</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Model long-term inflation by specifying projected annual percentage increases for municipal taxes,
              insurance premiums, HOA dues, and maintenance costs.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Principal Curtailment &amp; Biweekly</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Simulate elective extra monthly payments, annual anniversary contributions, up to 8 one-time lump sums,
              or toggle the 26-period biweekly payment program.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: What the Mortgage Calculator Calculates */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          What the Mortgage Calculator Calculates
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The calculator delivers a multi-dimensional summary of your initial monthly cash commitments and cumulative
          30-year lifetime obligations:
        </p>
        <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Principal &amp; Interest (P&amp;I Base):</strong> The contractual monthly debt service required to amortize your loan balance to zero over the chosen term.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Monthly Property Tax Escrow:</strong> Exactly 1/12th of your estimated annual municipal property tax obligation.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Monthly Home Insurance Escrow:</strong> Exactly 1/12th of your annual hazard and property insurance premium.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Monthly Private Mortgage Insurance (PMI):</strong> The temporary monthly fee applied when down payment is under 20% (LTV &gt; 80%).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Monthly HOA &amp; Auxiliary Reserves:</strong> Non-escrow community dues plus 1/12th of annual maintenance reserves.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Total Monthly Housing Outflow:</strong> The total first-year monthly budget requirement (P&amp;I + Taxes + Insurance + PMI + HOA + Other Reserves + Extra Principal).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Lifetime Interest &amp; Total Cost:</strong> Cumulative interest accrued over the repayment period and total out-of-pocket cash expended across all categories.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Payoff Date:</strong> The exact calendar month and year when your mortgage balance reaches zero.</span>
          </li>
        </ul>
      </section>

      {/* SECTION 4: How Mortgage Payments Are Calculated */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          How Mortgage Payments Are Calculated
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Fixed-rate mortgage payments are calculated using standard closed-form annuity amortization mathematics.
          Each monthly payment is structured so that the combined sum of periodic interest and principal reduction
          remains constant throughout the term.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
            Standard Fixed-Rate Mortgage Formula:
          </span>
          <div className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-slate-100 py-1 overflow-x-auto">
            M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
            <div><strong>M:</strong> Monthly Principal &amp; Interest Payment</div>
            <div><strong>P:</strong> Principal Loan Amount (Home Price - Down Payment)</div>
            <div><strong>r:</strong> Monthly Interest Rate (Annual Note Rate / 12 / 100)</div>
            <div><strong>n:</strong> Total Monthly Payment Periods (Loan Term in Years × 12)</div>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong>Zero-Interest Edge Case:</strong> In the theoretical scenario where a loan carries a 0% interest rate (r = 0),
          the formula simplifies to linear principal division: <code>M = P / n</code>. In this case, total interest is $0.00,
          and every dollar paid reduces the outstanding balance directly.
        </p>
      </section>

      {/* SECTION 5: Comprehensive Worked Mortgage Calculation */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Comprehensive Worked Mortgage Calculation
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          To illustrate how each individual component builds into your total monthly housing outflow, examine the
          step-by-step arithmetic for the following baseline scenario:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-slate-200 dark:border-slate-700 pb-2.5">
            <div><span className="text-slate-500 block">Home Price:</span><strong>$400,000.00</strong></div>
            <div><span className="text-slate-500 block">Down Payment (20%):</span><strong>$80,000.00</strong></div>
            <div><span className="text-slate-500 block">Loan Principal (P):</span><strong>$320,000.00</strong></div>
            <div><span className="text-slate-500 block">Interest Rate:</span><strong>6.706%</strong></div>
          </div>
          <div className="space-y-1.5 font-mono text-[11px] leading-relaxed">
            <p>1. Monthly Interest Rate (r) = 0.06706 / 12 = 0.0055883333...</p>
            <p>2. Total Payment Periods (n) = 30 years × 12 = 360 months</p>
            <p>3. Compounding Factor (1 + r)^360 = (1.0055883333)^360 ≈ 7.464627</p>
            <p>4. Monthly P&amp;I = $320,000 × [ 0.0055883333 × 7.464627 ] / [ 7.464627 - 1 ] = <strong>$2,066.16</strong></p>
            <p>5. Monthly Property Tax (1.2% on $400k) = $4,800.00 / 12 = <strong>$400.00</strong></p>
            <p>6. Monthly Home Insurance = $1,500.00 / 12 = <strong>$125.00</strong></p>
            <p>7. Monthly PMI = $0.00 (Waived due to 20% down payment)</p>
            <p>8. Monthly HOA Dues = <strong>$333.33</strong></p>
            <p>9. Monthly Maintenance Reserves = $4,000.00 / 12 = <strong>$333.33</strong></p>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs font-sans font-bold text-blue-700 dark:text-blue-400">
              Total Monthly Housing Outflow = $2,066.16 + $400.00 + $125.00 + $0.00 + $333.33 + $333.33 = $3,257.82 / month
            </div>
            <div className="text-[11px] font-sans text-slate-600 dark:text-slate-400">
              Total Lifetime Cost (30 Years) = $320,000 (Principal) + $423,818.78 (Interest) + $144,000 (Taxes) + $45,000 (Insurance) + $120,000 (HOA) + $120,000 (Reserves) = <strong>$1,172,818.78</strong>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Mortgage Amortization Mechanics */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Mortgage Amortization Mechanics
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Amortization refers to the process of gradually retiring debt through scheduled periodic payments. In a standard
          fixed-rate mortgage, the internal composition of your payment shifts continuously throughout the term:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Early Loan Periods (Years 1–5)</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Because monthly interest is calculated against the large initial balance (<code>Interest = Balance × r</code>),
              the interest charge consumes the majority of your early payments. In Month 1 of our example, $1,788.27 goes to
              interest while only $277.89 reduces principal.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Later Loan Periods (Years 20–30)</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              As consecutive payments reduce the remaining balance, the monthly interest charge drops proportionally.
              Because the total monthly P&amp;I remains fixed, an accelerating portion of each payment is applied directly
              to principal, building equity rapidly.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          To inspect a standalone schedule isolating annual interest deductions for tax planning, visit our dedicated{" "}
          <Link href="/calculators/amortization-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            amortization calculator
          </Link>.
        </p>
      </section>

      {/* SECTION 7: Property Taxes, Insurance, and Escrow */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Property Taxes, Home Insurance, and Escrow Accounts
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Most residential lenders require borrowers to maintain an <strong>escrow account</strong> to ensure annual
          property taxes and hazard insurance premiums are paid reliably on time.
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          Your mortgage servicer collects 1/12th of your estimated annual tax and insurance liabilities each month. Under
          the federal Real Estate Settlement Procedures Act (RESPA, 12 U.S.C. § 2609), servicers may maintain a reasonable
          cushion (typically up to 2 months of escrow collections) and conduct an annual escrow analysis to adjust monthly
          collections based on revised municipal tax assessments. In this calculator, setting an annual escalation percentage
          models how inflation compounds these escrow expenses over 15 to 30 years.
        </p>
      </section>

      {/* SECTION 8: Private Mortgage Insurance (PMI) */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Private Mortgage Insurance (PMI) &amp; LTV Thresholds
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          When purchasing a home with a conventional mortgage and putting down less than 20% of the purchase price, your
          loan-to-value (LTV) ratio exceeds 80%. Lenders require Private Mortgage Insurance (PMI) to mitigate credit risk.
        </p>
        <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs space-y-1.5">
          <span className="font-bold text-blue-900 dark:text-blue-200 block">
            Authoritative Regulatory Guidelines (Homeowners Protection Act of 1998 / CFPB 12 U.S.C. § 4901):
          </span>
          <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Borrower-Requested Cancellation (80% LTV):</strong> Borrowers have the legal right to request PMI cancellation in writing once their principal balance reaches 80% of the original property value, subject to good payment history and property equity verification.</li>
            <li><strong>Automatic Lender Termination (78% LTV):</strong> Lenders are legally required to automatically terminate PMI on the date the loan is scheduled to reach 78% of the original purchase price under the initial amortization schedule, provided payments are current.</li>
          </ul>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <em>Calculator Modeling Disclosure:</em> This calculator uses an <strong>80% LTV planning assumption</strong> to
          model when PMI charges drop to $0 in the amortization schedule. Actual legal cancellation or termination depends
          on your specific loan agreement, servicer policies, appraisal verification, and federal/state regulations. To see
          how different upfront cash amounts impact your loan-to-value ratio, explore our{" "}
          <Link href="/calculators/down-payment-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            down payment calculator
          </Link>.
        </p>
      </section>

      {/* SECTION 9: HOA Fees and Other Housing Costs */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          HOA Fees and Auxiliary Housing Costs
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A frequent homebuying oversight is confusing <strong>PITI</strong> (Principal, Interest, Taxes, Insurance) with
          the <strong>total monthly cost of living in a property</strong>.
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          Homeowners Association (HOA) dues and condominium assessments are non-escrow payments made directly to an
          association management company to fund exterior maintenance, landscaping, shared amenities, and capital reserves.
          Additionally, financial planners recommend budgeting for regular home maintenance reserves. In our calculator,
          entering an annual reserve under <code>Other Costs ($/yr)</code> divides the amount by 12 and adds it to your
          monthly housing outflow without misrepresenting it as part of contractual loan debt service.
        </p>
      </section>

      {/* SECTION 10: Extra Mortgage Payments */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Extra Mortgage Payments &amp; Principal Curtailment
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Making additional principal payments can reduce overall interest costs and shorten the repayment period when
          funds are applied directly to principal reduction.
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <th className="p-2.5 font-bold">Curtailment Strategy ($320k Loan @ 6.706%)</th>
                <th className="p-2.5 font-bold">New Payoff Term</th>
                <th className="p-2.5 font-bold">Time Saved</th>
                <th className="p-2.5 font-bold">Total Interest Saved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-sans tabular-nums text-slate-600 dark:text-slate-400">
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">Baseline (No Extra Payments)</td>
                <td className="p-2.5">360 Months (30.0 Yrs)</td>
                <td className="p-2.5">0 Months</td>
                <td className="p-2.5">$0.00</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">+$200 / Month Extra Principal</td>
                <td className="p-2.5">295 Months (~24.6 Yrs)</td>
                <td className="p-2.5">65 Months (5.4 Yrs)</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">$90,073.60</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">+$2,000 / Year (Annual Bonus)</td>
                <td className="p-2.5">289 Months (~24.1 Yrs)</td>
                <td className="p-2.5">71 Months (5.9 Yrs)</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">$97,337.83</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">Single $20,000 Lump Sum (Month 12)</td>
                <td className="p-2.5">304 Months (~25.3 Yrs)</td>
                <td className="p-2.5">56 Months (4.7 Yrs)</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">$84,926.92</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          If market interest rates have declined since you acquired your mortgage, existing homeowners can calculate potential
          savings and break-even horizons with our{" "}
          <Link href="/calculators/refinance-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            mortgage refinance calculator
          </Link>.
        </p>
      </section>

      {/* SECTION 11: Biweekly Mortgage Payments */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Biweekly Mortgage Payment Mechanics
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A standard mortgage requires 12 monthly payments per year. Under a biweekly program, you pay exactly half of your
          monthly principal and interest payment (<code>M / 2</code>) every two weeks.
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          Because there are 52 weeks in a calendar year, a biweekly schedule produces <strong>26 half-payments</strong>,
          which equals <strong>13 full monthly payments per year</strong> (<code>26 × 0.5 = 13</code>). Under the calculator's
          modeled assumptions on a 30-year loan, this additional monthly payment applied directly to principal accelerates
          loan payoff by several years and eliminates substantial compounding interest.
        </p>
      </section>

      {/* SECTION 12: 15-Year vs. 30-Year Fixed Mortgages */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          15-Year vs. 30-Year Fixed Mortgages
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Choosing between a 15-year and a 30-year fixed mortgage represents a direct trade-off between monthly cash flow
          flexibility and total lifetime borrowing cost:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">30-Year Fixed Mortgage</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li>Lower required monthly debt service obligations.</li>
              <li>Maximum household budget flexibility during unexpected income disruptions.</li>
              <li>Higher total interest paid over the multi-decade amortization horizon.</li>
            </ul>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">15-Year Fixed Mortgage</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li>Higher mandatory monthly payments (typically 35% to 50% higher).</li>
              <li>Substantial lifetime interest savings (often saving over 50% in total interest).</li>
              <li>Rapid home equity accumulation within the first five years.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 13: How Much House Can I Afford? */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          How Much House Can I Afford?
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Calculating the monthly payment on a known purchase price is a forward estimation problem. However, if you are
          beginning your home search and need to determine your maximum purchasing budget based on gross income and existing
          debt obligations, you require a reverse underwriting calculation.
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          Lenders assess your borrowing eligibility using <strong>Debt-to-Income (DTI)</strong> ratios:
          a front-end ratio (housing costs divided by gross monthly income, commonly targeted around 28%) and a back-end ratio
          (all recurring debt payments divided by gross monthly income, commonly capped around 36% to 43%). To evaluate your
          purchasing budget, use our{" "}
          <Link href="/calculators/house-affordability-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            house affordability calculator
          </Link>{" "}
          or verify your borrowing ratios with our{" "}
          <Link href="/calculators/dti-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            debt-to-income calculator
          </Link>.
        </p>
      </section>

      {/* SECTION 14: Common Mortgage Calculation Pitfalls */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Common Mortgage Calculation Pitfalls
        </h3>
        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <strong>1. Confusing Note Interest Rate with APR:</strong> The note rate is the annual percentage charged on
            your unpaid principal balance. The Annual Percentage Rate (APR) reflects the note rate plus upfront lender fees,
            discount points, and closing charges. Entering an APR into an amortization formula will overstate your monthly debt service.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <strong>2. Budgeting Strictly for Principal and Interest:</strong> Omission of property taxes, hazard insurance,
            and HOA fees can cause a household budget shortfall of 20% to 40% relative to actual out-of-pocket housing costs.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <strong>3. Assuming Government Loans Follow Conventional PMI Rules:</strong> FHA loans require Upfront and
            Annual Mortgage Insurance Premiums (MIP) that often persist for the entire loan life. Borrowers considering
            low down payment government options should use our{" "}
            <Link href="/calculators/fha-loan-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              FHA loan calculator
            </Link>, while eligible military veterans should model zero-down benefits on our{" "}
            <Link href="/calculators/va-mortgage-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              VA mortgage calculator
            </Link>.
          </div>
        </div>
      </section>

      {/* SECTION 15: Related Calculators Grid */}
      <section className="space-y-4 pt-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Related Real Estate &amp; Financing Calculators
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <Link
            href="/calculators/house-affordability-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              House Affordability
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Calculate max home budget from income.</span>
          </Link>
          <Link
            href="/calculators/amortization-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Amortization Calculator
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Full annual &amp; monthly payment tables.</span>
          </Link>
          <Link
            href="/calculators/down-payment-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Down Payment Calculator
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Optimize upfront cash &amp; eliminate PMI.</span>
          </Link>
          <Link
            href="/calculators/refinance-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Refinance Calculator
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Calculate break-even refi savings.</span>
          </Link>
          <Link
            href="/calculators/rent-vs-buy-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Rent vs. Buy Calculator
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Compare long-term equity accumulation.</span>
          </Link>
          <Link
            href="/calculators/dti-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              DTI Ratio Calculator
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Check front-end &amp; back-end ratios.</span>
          </Link>
          <Link
            href="/calculators/fha-loan-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              FHA Loan Calculator
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">3.5% down financing with MIP.</span>
          </Link>
          <Link
            href="/calculators/va-mortgage-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              VA Mortgage Calculator
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Zero-down military financing terms.</span>
          </Link>
        </div>
      </section>

      {/* SECTION 16: Frequently Asked Questions */}
      <section className="space-y-4 pt-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              How is my monthly principal and interest payment calculated?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Your base payment is calculated using fixed-rate amortization: <code>M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]</code>,
              where P is your loan amount, r is your monthly interest rate (annual note rate divided by 12), and n is the total
              number of monthly payment periods (e.g., 360 months for a 30-year mortgage).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              What is the difference between PITI and Total Monthly Housing Outflow?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>PITI</strong> is the traditional banking benchmark consisting of Principal, Interest, Property Taxes, and
              Homeowners Insurance. <strong>Total Monthly Housing Outflow</strong> is a comprehensive personal budgeting figure
              that includes PITI plus Private Mortgage Insurance (PMI), Homeowners Association (HOA) dues, auxiliary maintenance
              reserves, and elective extra principal payments.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              What is the difference between note interest rate and APR?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Your <strong>interest rate (note rate)</strong> is the annual percentage charged on your unpaid principal balance.
              The <strong>Annual Percentage Rate (APR)</strong> reflects the note rate plus upfront financing fees, discount points,
              and mandatory lender closing charges expressed as an annualized percentage.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              When can Private Mortgage Insurance (PMI) be removed?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Under the federal Homeowners Protection Act of 1998 (HPA), conventional loan borrowers may submit a written request
              to cancel PMI once their principal balance reaches 80% of the original home purchase price, while servicers are
              mandated to terminate PMI automatically once the scheduled balance reaches 78% LTV, provided payments are current.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              How do extra principal payments shorten my mortgage payoff timeline?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Extra payments apply 100% directly toward reducing your unpaid balance. Because future monthly interest is calculated
              against this lower balance, interest charges decrease permanently, allowing subsequent fixed payments to extinguish
              the remaining debt years ahead of schedule.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              How does a biweekly mortgage payment program save interest?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A biweekly schedule splits your monthly principal and interest payment in half (M / 2) and pays it every two weeks.
              Because there are 52 weeks in a year, you make 26 half-payments, which equals 13 full monthly payments annually.
              Under the calculator's assumptions, this extra payment compresses a 30-year term down by several years.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MortgageContentSection;


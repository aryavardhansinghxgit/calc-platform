"use client";

import React from "react";
import Link from "next/link";

export function RentVsBuyContent() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-normal leading-relaxed max-w-4xl mx-auto py-4">
      {/* 1. Page Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Rent vs Buy Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
          Compare renting and buying with mortgage costs, rent growth, home appreciation, taxes, maintenance, investment opportunity cost, breakeven horizon and modeled net worth.
        </p>
      </div>

      {/* 2. What Does a Rent vs Buy Calculator Actually Do? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          2. What Does a Rent vs Buy Calculator Actually Do?
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          The decision to rent or buy a home is not simply a comparison between monthly rent and a mortgage payment. A meaningful comparison can include the down payment, mortgage interest, principal repayment, property taxes, homeowners insurance, maintenance, HOA costs, buying and selling transaction costs, home appreciation, rent increases, renter&apos;s insurance, the opportunity cost of money tied up in the home, and potential tax effects.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          This calculator is a planning and comparison tool rather than a universal decision-maker. Its result depends on the numbers entered: home price, rent, financing terms, expected appreciation, rent growth, investment return, transaction costs, taxes, insurance and the expected holding period. The validated baseline produces a modeled breakeven horizon of about 4.8 years and a 30-year cumulative net-cost comparison that favors buying under the selected assumptions, but those outputs are scenario-specific rather than guarantees.
        </p>
      </section>

      {/* 3. The Most Important Idea: Compare Total Economics, Not Just Monthly Payment */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          3. The Most Important Idea: Compare Total Economics, Not Just Monthly Payment
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A mortgage payment contains both financing cost and principal repayment. Principal reduces the outstanding balance and builds equity; interest is a financing cost. Homeowners may also pay property taxes, insurance, maintenance, HOA dues and transaction costs. Renters generally avoid many of those ownership expenses, but face rent increases and may retain capital that could otherwise be invested.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          For that reason, this calculator should not be described as a simple mortgage-payment-versus-rent calculator. It is a scenario model that compares cash flow, unrecoverable costs, equity accumulation, opportunity cost and modeled net worth. For standalone mortgage schedule calculations, explore our <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Mortgage Calculator</Link>, or evaluate rental lease cash flows with the <Link href="/calculators/rent-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Rent Calculator</Link>.
        </p>
      </section>

      {/* 4. How to Use the Calculator */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          4. How to Use the Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
          <li>Enter the home price and down-payment percentage.</li>
          <li>Enter the mortgage rate and loan term.</li>
          <li>Add property taxes, homeowners insurance, maintenance and HOA assumptions.</li>
          <li>Add buying closing costs and expected selling costs.</li>
          <li>Enter current monthly rent and annual rent growth.</li>
          <li>Add renter&apos;s insurance and other relevant rental-side costs.</li>
          <li>Enter the investment-return assumption used for opportunity-cost modeling.</li>
          <li>Review the mortgage and ownership cost breakdown before interpreting the result.</li>
          <li>Inspect the breakeven horizon and stay-duration table.</li>
          <li>Review the price-to-rent ratio and 5% rule as heuristics.</li>
          <li>Review the modeled net-worth comparison.</li>
          <li>Save scenarios when comparing alternative assumptions.</li>
        </ol>
      </section>

      {/* 5. Inputs Explained */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          5. Inputs Explained
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.1 Home Price and Down Payment</h3>
            <p className="mt-1 leading-relaxed">
              Home price and down payment determine the initial loan balance. In the validated baseline, a $500,000 home with 20% down requires a $100,000 down payment and produces a $400,000 mortgage. These inputs affect interest, principal accumulation, transaction costs and the opportunity cost of capital. To model specific cash-to-close requirements, see our <Link href="/calculators/down-payment-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Down Payment Calculator</Link>.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.2 Mortgage Rate and Loan Term</h3>
            <p className="mt-1 leading-relaxed">
              The interest rate and loan term determine the fixed-rate amortization schedule. A higher rate generally increases financing cost; a longer term generally lowers required monthly principal-and-interest payment but extends the period over which interest accrues. You can compare term lengths with our <Link href="/calculators/loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Loan Calculator</Link>.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.3 Property Tax, Insurance, Maintenance and HOA</h3>
            <p className="mt-1 leading-relaxed">
              These costs create an ownership burden beyond principal and interest. The calculator models them according to the configured assumptions, so the long-term comparison does not treat today&apos;s ownership costs as permanently fixed.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.4 Rent and Rent Growth</h3>
            <p className="mt-1 leading-relaxed">
              The renter-side model begins with the current monthly rent and applies the selected annual rent-growth assumption. This lets the calculator compare a changing rental burden against changing ownership economics over time.
            </p>
          </div>
        </div>
      </section>

      {/* 6. How the Mortgage Side Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          6. How the Mortgage Side Works
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          The mortgage portion uses standard fixed-rate amortization. Each payment is divided into interest and principal. The interest component is calculated from the outstanding balance, while the principal component reduces that balance. Over time, the interest share generally falls and the principal share rises.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Because the rent-vs-buy comparison uses the amortization schedule rather than a rough average, modeled equity accumulation is tied to actual period-by-period loan balance reduction under the selected rate and term.
        </p>
      </section>

      {/* 7. Buying Costs Beyond the Mortgage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          7. Buying Costs Beyond the Mortgage
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Owning a home involves expenses that do not build equity. Property taxes, homeowners insurance, maintenance and HOA dues can all contribute to the long-term cost of ownership. Buying and selling can also introduce transaction friction through closing costs, selling costs and other one-time expenses.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          These costs matter especially for shorter holding periods. A buyer may need several years for appreciation and principal repayment to overcome transaction friction. That is one reason the calculator reports a breakeven horizon instead of a timeless buy-or-rent answer.
        </p>
      </section>

      {/* 8. Why the Length of Time You Stay Matters */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          8. Why the Length of Time You Stay Matters
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Time is one of the strongest variables in rent-vs-buy analysis. Upfront buying costs and future selling costs are concentrated around transactions, while principal repayment and appreciation accumulate over time. Renting has lower transaction friction in many scenarios but exposes the renter to ongoing rent growth.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          The validated baseline reports a modeled breakeven of approximately 4.8 years. This means the selected model crosses its chosen comparison threshold around that point; it does not mean every buyer should plan to own a home for at least 4.8 years. Check your overall budget fit with our <Link href="/calculators/house-affordability-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">House Affordability Calculator</Link>.
        </p>
      </section>

      {/* 9. Breakeven Point Explained */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          9. Breakeven Point Explained
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          The breakeven point is the modeled time at which the calculator&apos;s selected economic measure changes in favor of one housing path. The page should clearly identify whether this comparison is based on cumulative net cost, cash flow, or a wealth measure. The word &apos;breakeven&apos; should not be treated as a universal economic threshold.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Under the validated baseline, the 30-year modeled cumulative net cost is approximately $726,761 for buying and $1,721,379 for renting. Those figures are outputs of the selected assumptions, not forecasts.
        </p>
      </section>

      {/* 10. Home Appreciation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          10. Home Appreciation
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Home appreciation affects the modeled value of the property over time. Under a 3% annual assumption, future value grows through compounding. Appreciation can materially increase modeled home equity, but it is uncertain and can be lower, higher, flat or negative in actual markets.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Because appreciation can dominate long-horizon results, users should test conservative and downside cases rather than relying on one expected growth rate.
        </p>
      </section>

      {/* 11. Rent Growth */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          11. Rent Growth
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Rent growth compounds over time. A $3,000 monthly rent with 3% annual growth becomes about $3,090 in the next annual period before subsequent increases. Over long horizons, even modest annual rent growth can create a substantial difference compared with treating rent as permanently flat.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Rent growth is a scenario input, not a guarantee. Local markets, lease terms and supply-demand conditions can produce different outcomes.
        </p>
      </section>

      {/* 12. Opportunity Cost of the Down Payment */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          12. Opportunity Cost of the Down Payment
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A down payment is capital that becomes tied up in the property. The opportunity-cost model asks what that capital might have earned if it had instead remained invested. The calculator uses the selected investment-return assumption to model that alternative path.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          This does not make renting automatically superior or buying automatically superior. The result depends on the interaction among investment return, mortgage cost, appreciation, rent growth, transaction costs, taxes and holding period. Investment returns are uncertain and should be treated as scenario assumptions rather than guarantees.
        </p>
      </section>

      {/* 13. Price-to-Rent Ratio */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          13. Price-to-Rent Ratio
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          The price-to-rent ratio is home price divided by annual rent. In the validated baseline, $500,000 divided by $36,000 of annual rent equals 13.8889, displayed as 13.9. The calculator uses ratio bands as an illustrative market heuristic rather than a universal rule.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A ratio can be useful for screening, but it does not replace a full financial comparison. Mortgage rates, taxes, maintenance, appreciation, rent growth, transaction costs and investment assumptions can all change the result. For real estate investors evaluating multi-family assets, see our <Link href="/calculators/rental-property-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Rental Property Calculator</Link>.
        </p>
      </section>

      {/* 14. The 5% Rule */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          14. The 5% Rule
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          The calculator&apos;s 5% rule section uses a dynamic unrecoverable-cost model rather than a single static 5% of home value. In the validated baseline, 6.632% mortgage rate + 1.5% property tax + 1.5% maintenance = 9.632% modeled annual unrecoverable cost. Applied to $500,000, that equals $48,160 per year or approximately $4,013.33 per month.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          This should be presented as the calculator&apos;s specific implementation of an unrecoverable-cost heuristic. It is not a universal law of housing economics.
        </p>
      </section>

      {/* 15. Tax Benefits and the Mortgage Interest Shield */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          15. Tax Benefits and the Mortgage Interest Shield
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          The calculator includes a simplified tax-benefit model using the selected federal rate, filing status and property-tax assumptions. In the validated baseline, the model uses $26,528 of first-year mortgage interest, $7,500 of modeled property tax, a $30,000 standard deduction and a 25% marginal federal rate, producing an estimated $1,007 annual tax benefit.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          This should be labeled as an illustrative tax estimate, not a tax refund or individualized tax determination. Tax rules are time-sensitive and personal tax outcomes depend on filing status, eligible deductions, itemization and other circumstances. If evaluating a mortgage rate modification, visit our <Link href="/calculators/refinance-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Refinance Calculator</Link>.
        </p>
      </section>

      {/* 16. Net Worth: Home Equity vs Investment Portfolio */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          16. Net Worth: Home Equity vs Investment Portfolio
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A useful rent-vs-buy model distinguishes total cash cost from wealth accumulation. Buying can build home equity through principal repayment and appreciation. Renting can preserve liquidity and leave more capital available for investment.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Under the validated baseline, the ten-year modeled home-equity figure is approximately $359,958 while the renter-side modeled stock portfolio from the $100,000 down-payment opportunity at a 5% return is approximately $162,889. The model therefore shows a buying-side advantage under those selected assumptions.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          This is not a prediction of actual investment returns or house-price growth. Change the assumptions and the result can change.
        </p>
      </section>

      {/* 17. Why Buying Can Win in One Scenario and Renting in Another */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          17. Why Buying Can Win in One Scenario and Renting in Another
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          There is no single answer for every household because the comparison is driven by assumptions. A long expected holding period, moderate home appreciation, faster rent growth and manageable transaction costs can strengthen the modeled buying case. A short stay, high transaction costs, low appreciation and strong alternative investment returns can strengthen the modeled renting case.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Use the calculator as a sensitivity-analysis tool: change one assumption at a time and observe which variables have the biggest effect on the result.
        </p>
      </section>

      {/* 18. Short-Term vs Long-Term Housing Decisions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          18. Short-Term vs Long-Term Housing Decisions
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Short-term ownership can be more sensitive to transaction friction because purchase and sale costs are concentrated around the beginning and end of the holding period. Long-term ownership gives more time for principal repayment and appreciation to influence the modeled comparison.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Renting can provide flexibility, especially when a move is likely, but a long rental horizon exposes the household to cumulative rent growth. Neither path is automatically optimal in every market or for every financial situation.
        </p>
      </section>

      {/* 19. Common Mistakes to Avoid */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          19. Common Mistakes to Avoid
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
          <li>Comparing rent only with mortgage principal and interest.</li>
          <li>Treating the entire mortgage payment as an unrecoverable expense.</li>
          <li>Ignoring property tax, insurance, maintenance or HOA.</li>
          <li>Ignoring purchase and selling costs.</li>
          <li>Assuming home appreciation is guaranteed.</li>
          <li>Assuming investment returns are guaranteed.</li>
          <li>Using the price-to-rent ratio as the final answer.</li>
          <li>Treating the 5% rule as a universal law.</li>
          <li>Ignoring rent inflation.</li>
          <li>Treating the simplified tax model as personal tax advice.</li>
          <li>Reading a scenario-specific breakeven year as a universal rule.</li>
        </ul>
      </section>

      {/* 20. A Better Way to Use the Calculator: Scenario Analysis */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          20. A Better Way to Use the Calculator: Scenario Analysis
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Create a baseline scenario, a conservative ownership scenario and a conservative renting scenario. Change appreciation, rent growth, investment return, maintenance and transaction costs across the scenarios. Then compare breakeven, cumulative cost and modeled net worth.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          The objective is not to produce a perfect forecast. It is to identify which assumptions drive the decision and how robust the result is when reasonable assumptions change.
        </p>
      </section>

      {/* 21. Methodology and Core Formulas */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          21. Methodology and Core Formulas
        </h2>
        <div className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.1 Mortgage Payment</h3>
            <p className="mt-0.5 font-mono text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
              M = P[r(1+r)^n] / [(1+r)^n - 1]
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.2 Home Value</h3>
            <p className="mt-0.5 leading-relaxed">
              Home value is modeled through the configured appreciation assumption using compound growth over time: Value<sub>t</sub> = Value<sub>0</sub> × (1 + r<sub>appreciation</sub>)<sup>t</sup>.
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.3 Rent</h3>
            <p className="mt-0.5 leading-relaxed">
              Rent grows according to the selected annual escalation assumption: Rent<sub>t</sub> = Rent<sub>0</sub> × (1 + r<sub>escalation</sub>)<sup>t</sup>.
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.4 Price-to-Rent Ratio</h3>
            <p className="mt-0.5 leading-relaxed">
              Price-to-rent ratio = Home Price ÷ Annual Rent. The validated baseline is 13.8889, displayed as 13.9.
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.5 Opportunity Cost</h3>
            <p className="mt-0.5 leading-relaxed">
              The opportunity-cost model projects alternative investment growth for capital that would otherwise be committed to the home, using the selected return assumption: Portfolio<sub>t</sub> = Down Payment × (1 + r<sub>investment</sub>)<sup>t</sup>.
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.6 Tax Benefit</h3>
            <p className="mt-0.5 leading-relaxed">
              The tax section uses the configured simplified itemized-deduction model and marginal rate to estimate an illustrative annual benefit: Tax Benefit = max(0, Itemized Deductions - Standard Deduction) × Marginal Tax Rate.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RentVsBuyContent;

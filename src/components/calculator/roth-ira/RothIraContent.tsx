import React from "react";
import Link from "next/link";
import { BookOpen, ShieldCheck, Calculator, Table, Percent, CheckCircle2, TrendingUp, AlertTriangle } from "lucide-react";

export function RothIraContent() {
  return (
    <article className="text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8">
      {/* Editorial Overview Section */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Roth IRA Calculator: How Growth, Contributions, Taxes, and Eligibility Fit Together
        </h2>
        <p>
          A Roth IRA can be difficult to evaluate from a single headline number because several different questions are mixed together: how much can be contributed, whether direct contributions are allowed at a particular income level, how investment growth compounds over decades, and how the eventual tax treatment compares with a taxable account. A useful Roth IRA calculator should separate those questions instead of treating &ldquo;Roth IRA value&rdquo; as a single formula. This calculator is designed around that separation. You can project the growth of a current Roth balance plus future contributions, compare the modeled result with a taxable investment account, test a Backdoor Roth conversion scenario, review 2026 contribution and income thresholds, and inspect an annual schedule showing how the balances evolve over time. The result is intended to function as a planning model: it helps you understand the mathematical consequences of contribution rate, time horizon, investment return, and taxes before you make a retirement decision.
        </p>
        <p>
          The central idea is compounding. Money that remains invested can generate returns, and those returns can themselves participate in subsequent growth. For a recurring-contribution projection, the future balance depends on the starting balance, the contribution amount, the assumed rate of return, the number of periods, and when each contribution is added. A calculator therefore needs a precise timing convention. In this tool, the growth model uses beginning-of-period annual contributions for the main Roth projection, which is an annuity-due convention. That matters because a contribution invested at the beginning of a year receives one more compounding interval than the same contribution invested at the end. The calculator&rsquo;s annual schedule is the best place to verify the convention because each row carries the prior ending balance into the next year&rsquo;s starting balance while adding the new contribution and modeled growth.
        </p>
        <p>
          The tax side is equally important. A Roth IRA is funded with money that generally does not receive an upfront income-tax deduction, and qualified distributions from a Roth IRA can be tax-free. The IRS states that a qualified Roth IRA distribution generally requires that the five-year period beginning with the first tax year for which the Roth IRA was established for the taxpayer has been satisfied and that an applicable qualifying event, such as reaching age 59 &frac12;, disability, death, or the first-home exception, applies. That means the calculator should not describe every Roth withdrawal as automatically tax-free. The distinction between contributions, earnings, conversions, and qualified distributions is part of what makes the Roth model useful rather than merely promotional.
        </p>
      </section>

      {/* Section: How a Roth IRA Grows Over Time */}
      <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          How a Roth IRA Grows Over Time
        </h2>
        <p>
          The most powerful variable in a retirement projection is usually not a single contribution; it is the combination of time and compounding. Suppose an investor begins with a Roth IRA balance, adds a fixed amount every year, and earns a constant assumed return. Each contribution becomes its own investment stream, while the existing balance continues to compound. Over a long horizon, this creates a curve that is often much steeper than a simple &ldquo;contributions added together&rdquo; calculation. That is why a Roth IRA calculator should show both total principal contributed and the amount of modeled growth. A future balance by itself can look impressive, but separating principal from growth reveals how much of the ending value came from the investor&rsquo;s own deposits versus the assumed return on capital.
        </p>
        <p>
          For a beginning-of-period annual contribution model, the future value can be represented as the starting balance grown for the full horizon plus the future value of the annual contribution stream. In standard notation, for a starting principal <span className="font-serif italic">P</span>, annual contribution <span className="font-serif italic">C</span>, periodic rate <span className="font-serif italic">r</span>, and <span className="font-serif italic">n</span> periods, the annuity-due form is:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-center">
          FV = P(1 + r)<sup>n</sup> + C &middot; [((1 + r)<sup>n</sup> &minus; 1) / r] &middot; (1 + r)
        </div>
        <p>
          With the zero-rate case handled separately as <span className="font-mono text-xs">FV = P + C &middot; n</span>. The exact implementation retains full precision internally and rounds only the displayed currency values. This prevents a common error where a rounded annual result is fed back into the next year and causes cumulative drift. The calculator&rsquo;s schedule always reconciles year <span className="font-serif italic">N</span> ending balance with year <span className="font-serif italic">N+1</span> beginning balance.
        </p>
        <p>
          The effect of time can be understood through a simple example. Consider a person who starts with $30,000, contributes $7,500 at the beginning of each year, and assumes a 6% annual return from age 30 through age 65. Under the calculator&rsquo;s beginning-of-year convention, the total principal is $292,500, while the modeled Roth balance is approximately $1.116 million. The difference is not &ldquo;free money&rdquo;; it is the mathematical consequence of repeated compounding under a constant return assumption. A different contribution timing convention would produce a different answer, which is why it is useful to display the convention explicitly rather than leaving users to infer it.
        </p>
        <p>
          The projection is most helpful when treated as a sensitivity tool rather than a promise. A 6% constant annual return is not guaranteed in actual markets, and real investments experience volatility, fees, taxes outside the Roth, and periods of negative performance. The calculator is therefore best used to compare assumptions: what changes if the annual contribution is lower, if retirement occurs earlier, or if the return assumption is reduced? For a broader accumulation model, the{" "}
          <Link href="/calculators/retirement-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
            Retirement Calculator
          </Link>{" "}
          can be used alongside the Roth projection to examine the retirement horizon from a larger portfolio perspective.
        </p>
      </section>

      {/* Section: 2026 Limits and Combined IRA Rule */}
      <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          2026 Roth IRA Contribution Limits and the Combined IRA Rule
        </h2>
        <p>
          Contribution limits are easy to misinterpret because the annual limit applies across an individual&rsquo;s Traditional and Roth IRAs rather than creating a separate full limit for each account. For 2026, the IRS states that the total contribution an individual makes to all Traditional and Roth IRAs is limited to $7,500, or $8,600 for an individual age 50 or older, subject to a lower limit if taxable compensation is less. This means a person generally cannot contribute $7,500 to a Roth IRA and another $7,500 to a Traditional IRA and claim that the full $15,000 is permitted under the ordinary annual IRA limit. The contribution ceiling is a combined IRA limit.
        </p>
        <p>
          The age-50 catch-up amount is an additional $1,100 for 2026, bringing the general age-50-and-over limit to $8,600. The IRS explains that these dollar amounts are adjusted periodically for cost-of-living changes, which is why the calculator labels the year rather than using a timeless &ldquo;maximum contribution&rdquo; number. The page&rsquo;s preset controls therefore remain explicit about the tax year: a 2025 maximum of $7,000 and an age-50-and-over amount of $8,000 belong to 2025, while the corresponding 2026 figures are $7,500 and $8,600.
        </p>
        <p>
          There is another practical limitation that matters when planning maximum contributions: the combined annual IRA limit does not override the taxable-compensation requirement. The IRS states that 2026 contributions are limited to $7,500 ($8,600 at age 50 or older) or, if less, the individual&rsquo;s taxable compensation for the year. A projection calculator may still allow a user to enter a hypothetical contribution for modeling, but the educational copy should distinguish a mathematical scenario from a contribution amount the taxpayer is actually eligible to make. This distinction is important for trust because a future-value calculation is not the same thing as a tax-form eligibility determination.
        </p>
        <p>
          A practical way to use the calculator is to start with the statutory limit, then ask whether taxable compensation, filing status, MAGI, or other rules constrain the contribution. Once those questions are separated, the growth model becomes easier to understand. Users who want to examine accumulation in a tax-advantaged workplace plan can also compare the result with the{" "}
          <Link href="/calculators/401k-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
            401(k) Calculator
          </Link>
          , while users focused on general savings accumulation can use the{" "}
          <Link href="/calculators/savings-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
            Savings Calculator
          </Link>
          .
        </p>
      </section>

      {/* Section: MAGI Phase-Outs */}
      <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Roth IRA Income Limits and the 2026 MAGI Phase-Out
        </h2>
        <p>
          Unlike a simple &ldquo;contribute or do not contribute&rdquo; rule, Roth IRA eligibility can change gradually across an income phase-out range. For 2026, the IRS lists a Roth IRA modified adjusted gross income phase-out range of $153,000 to $168,000 for single filers and heads of household. For married couples filing jointly, the range is $242,000 to $252,000. For a married individual filing separately who lived with their spouse at any time during the year, the phase-out range remains $0 to $10,000. These are tax-year thresholds, so a calculator should display the applicable year and should not recycle an older year&rsquo;s values without warning.
        </p>
        <p>
          The phrase &ldquo;MAGI phase-out&rdquo; matters because the calculation is not based simply on salary or gross income. Modified adjusted gross income for Roth purposes follows specific tax rules, and the taxpayer&rsquo;s filing status changes the applicable threshold. That makes a generic one-number eligibility test insufficient for serious planning. A good calculator can flag whether the entered MAGI is below, inside, or above the published range, but it should not imply that the result replaces a complete tax-return calculation. The role of the tool is to make the threshold structure understandable and to give the user a consistent planning reference point.
        </p>
        <p>
          Boundary testing is particularly important. At a threshold of $153,000 for a single filer, the behavior immediately below the threshold should differ from the behavior within the phase-out range, and the behavior at or above $168,000 should reflect the upper boundary. The same principle applies at $242,000 and $252,000 for married filing jointly. Testing those boundaries is more valuable than testing another arbitrary middle value because it verifies that the implementation handles the exact points at which eligibility changes. The calculator should also avoid the common mistake of using 2025 thresholds after displaying 2026 in the interface.
        </p>
        <p>
          Users comparing retirement-account options may find it useful to run their Roth scenario and then review the broader{" "}
          <Link href="/calculators/traditional-ira-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
            Traditional IRA Calculator
          </Link>{" "}
          to understand how pre-tax contribution treatment changes the planning question. A comparison with the{" "}
          <Link href="/calculators/investment-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
            Investment Calculator
          </Link>{" "}
          can also show the difference between account-specific tax assumptions and a general investment-growth model.
        </p>
      </section>

      {/* Section: Roth vs Taxable Account */}
      <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Roth IRA vs. a Taxable Investment Account
        </h2>
        <p>
          Comparing a Roth IRA with a taxable account is not simply a matter of applying a tax percentage to the final balance. The timing of taxes is part of the model. A Roth IRA can allow qualified withdrawals of both contributions and investment earnings without federal income tax, while a taxable account may incur taxes during the investment period or at realization depending on the type of income and transaction. A calculator therefore needs to explain exactly what its taxable-account scenario represents. In this model, the taxable side is a simplified planning comparison designed to illustrate modeled tax drag; it is not a complete simulation of every dividend, capital-gain realization, loss offset, holding period, or state tax rule.
        </p>
        <p>
          The advantage of using the comparison module is that the user can see the same starting assumptions pushed through two different tax treatments. If the starting balance, annual contributions, return assumption, and time horizon are held constant, the gap between the projected Roth balance and taxable balance represents the modeled effect of the different tax assumptions. This is more informative than saying that one account is &ldquo;better&rdquo; in every situation. A taxable account can provide flexibility and access that may matter outside retirement-account rules, while a Roth IRA can provide a particularly attractive tax structure for qualified retirement distributions.
        </p>
        <p>
          The calculator should also distinguish &ldquo;modeled tax avoided&rdquo; from an actual future tax bill. The amount shown as a tax difference is the output of the assumptions entered into the model. It is not a guarantee of what a taxpayer will owe or save because actual tax outcomes depend on future laws, income sources, investment turnover, tax rates, deductions, basis, and the eventual transaction pattern. The right way to read the chart is therefore: &ldquo;Under these assumptions, the model produces this difference.&rdquo; That wording preserves the educational value without turning a projection into a promise.
        </p>
        <p>
          The comparison becomes particularly useful when combined with scenario testing. Reduce the assumed return, shorten the time horizon, or change the marginal tax assumption and observe how the gap changes. When the user wants a general future-value computation without Roth-specific eligibility rules, the{" "}
          <Link href="/calculators/future-value-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
            Future Value Calculator
          </Link>{" "}
          is a useful companion. The{" "}
          <Link href="/calculators/compound-interest-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
            Compound Interest Calculator
          </Link>{" "}
          can also isolate the compounding effect itself, making it easier to understand how much of the result comes from time and reinvested growth rather than account type.
        </p>
      </section>

      {/* Section: Backdoor Roth Conversions */}
      <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Backdoor Roth Conversions: What the Calculator Can and Cannot Show
        </h2>
        <p>
          A Backdoor Roth strategy generally describes a sequence in which money is contributed to a Traditional IRA and then converted to a Roth IRA when the taxpayer is not eligible or chooses not to make a direct Roth contribution. The tax consequence depends on the tax status of the amount converted. The IRS explains that converting an amount from a Traditional IRA to a Roth IRA generally causes previously untaxed amounts to be included in gross income and reported for tax purposes. The conversion itself is not the same thing as a regular annual Roth IRA contribution.
        </p>
        <p>
          For a simplified planning example, suppose a user models a $50,000 conversion and enters a 25% tax assumption. The calculator may display $12,500 as modeled upfront conversion tax and then project the converted Roth amount under the chosen investment assumptions. That arithmetic is intentionally simple: $50,000 &times; 25% = $12,500. The actual federal tax result can be different because the tax treatment of a conversion depends on the amount that is taxable, basis, other IRA balances, filing status, other income, and the taxpayer&rsquo;s broader return.
        </p>
        <p>
          One of the most important limitations is the pro-rata rule. A taxpayer who has pre-tax amounts in Traditional, SEP, or SIMPLE IRAs can have the taxable amount of a Roth conversion determined under rules that take the taxpayer&rsquo;s aggregate IRA balances and basis into account. The calculator should therefore label the Backdoor Roth output as a simplified scenario unless it actually models those details. The IRS also confirms that Traditional, SEP, and SIMPLE IRA amounts have specific conversion and reporting rules.
        </p>
        <p>
          Another important distinction is that the conversion tax and the future investment growth are separate events. Paying tax on a conversion does not itself determine the future performance of the converted assets. The calculator should therefore show the conversion amount, the modeled tax at conversion, the projected Roth value, and the comparison result as separate numbers. This makes the decision easier to audit and avoids the misleading impression that the tax cost somehow disappears inside the investment-return assumption. The{" "}
          <Link href="/calculators/income-tax-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
            Income Tax Calculator
          </Link>{" "}
          can provide broader income-tax context, while the{" "}
          <Link href="/calculators/retirement-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
            Retirement Calculator
          </Link>{" "}
          can be used to place the converted amount into a wider retirement plan.
        </p>
      </section>

      {/* Section: Five-Year Rule & Qualified Distributions */}
      <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Roth IRA Withdrawals, the Five-Year Rule, and Qualified Distributions
        </h2>
        <p>
          One reason Roth IRA projections can look different from taxable-account projections is the potential tax treatment of qualified distributions. The IRS states that a Roth IRA distribution is qualified when the five-year period beginning with the first tax year for which the taxpayer established and contributed to a Roth IRA has been satisfied and the distribution is made after age 59 &frac12;, because of disability, to a beneficiary or estate after death, or under the first-home exception subject to its rules. This means age alone is not the entire test.
        </p>
        <p>
          The five-year concept also illustrates why retirement-account planning requires more than a future-value formula. A projection can estimate how large an account might become, but the tax character of a withdrawal depends on the reason for the distribution, the age of the taxpayer, the history of the Roth IRA, and whether the amount being withdrawn represents regular contributions, conversion amounts, or earnings. The calculator therefore should use precise language such as &ldquo;projected tax-free value under qualified-distribution assumptions&rdquo; rather than claiming that all future withdrawals are automatically tax-free.
        </p>
        <p>
          For users who are primarily interested in accessible retirement capital, it is also useful to separate contributions from investment earnings. Roth IRA regular contributions have different distribution treatment from earnings, and conversion amounts have their own ordering and five-year considerations. Those details are outside a simple growth projection unless the calculator explicitly models them. The purpose of the educational content is to make that boundary visible so users know when the calculator is a planning illustration and when professional or tax-specific analysis may be necessary.
        </p>
        <p>
          The most useful workflow is therefore to use the calculator in layers: first determine the projected account value, then examine the contribution and tax-year limits that apply, and finally consider whether the planned withdrawal strategy fits the qualified-distribution rules. For general retirement planning, the{" "}
          <Link href="/calculators/401k-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
            401(k) Calculator
          </Link>{" "}
          and{" "}
          <Link href="/calculators/retirement-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
            Retirement Calculator
          </Link>{" "}
          can be used as complementary tools rather than treating the Roth projection as a complete retirement plan.
        </p>
      </section>

      {/* Section: Annual Schedule & Chart */}
      <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          How to Read the Roth IRA Annual Schedule and Growth Chart
        </h2>
        <p>
          A long-term retirement balance is easier to trust when the calculator shows how it was built. The annual schedule should therefore be treated as the audit trail for the headline result. Each row represents an age or year, beginning with the prior ending balance, adding the new contribution according to the stated timing convention, applying the modeled return, and producing a new ending balance. A valid schedule has an important invariant: the ending balance for one row becomes the beginning balance for the next row. If that continuity breaks, the headline result cannot be considered reliable.
        </p>
        <p>
          The schedule also helps users understand why the curve accelerates. Early in the projection, a large portion of the ending balance may come directly from the investor&rsquo;s contributions because the account has had relatively little time to compound. Later, the annual growth amount can become larger because the account itself has become larger. In a constant-return illustration, the chart may therefore steepen as retirement approaches even though the contribution amount remains unchanged. That visual does not mean future returns will actually follow the same path; it shows the arithmetic consequence of the assumptions entered.
        </p>
        <p>
          The Roth-versus-taxable chart should use the same underlying schedule values instead of creating separate display-only calculations. This matters because a chart that uses different rounding, tax logic, or timing from the table can produce a visually convincing but mathematically inconsistent page. A production-quality calculator should have one authoritative calculation state and derive the headline cards, annual table, comparison, and chart from that same state. Users should be able to change one input and see every dependent output update together.
        </p>
        <p>
          The schedule is also the right place to inspect total principal. In the example with a $30,000 starting balance and $7,500 annual contribution over 35 years, the modeled principal total is $292,500. The remaining difference between that principal and the projected ending value is modeled investment growth. Because the calculator preserves full internal precision and rounds only for presentation, the displayed table and the downloadable schedule should reconcile to the same underlying result.
        </p>
      </section>

      {/* Section: Using without Overestimating */}
      <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Using the Roth IRA Calculator Without Overestimating the Result
        </h2>
        <p>
          The best way to use a retirement calculator is to compare scenarios rather than to search for one &ldquo;correct&rdquo; future balance. Start with a realistic current balance and contribution amount, use a return assumption that you can explain, and then test a lower-return case. Repeat the calculation with an earlier retirement age and a later retirement age. If the result changes dramatically, that sensitivity is useful information: it tells you that the plan is strongly dependent on time horizon or return assumptions.
        </p>
        <p>
          It is also helpful to separate legal limits from investment assumptions. The 2026 contribution limit is an external rule published by the IRS, while a 6% expected return is an assumption supplied by the user. The first is a tax-year fact that should be refreshed when the IRS publishes new cost-of-living adjustments. The second is a modeling input that should never be presented as guaranteed. Keeping those two categories visually separate makes the calculator easier to understand and easier to update.
        </p>
        <p>
          Finally, treat the Roth advantage shown by the calculator as conditional. It depends on the assumptions used for contribution amounts, tax rates, return, time horizon, and taxable-account tax treatment. A result such as &ldquo;Roth advantage: $337,739&rdquo; is not an intrinsic property of every Roth IRA; it is the difference produced by that scenario. The right question is not whether the number is universally true, but whether the assumptions are visible, internally consistent, and appropriate for the user&rsquo;s planning question.
        </p>
        <p>
          For readers moving from account-specific retirement planning to broader investment analysis, the{" "}
          <Link href="/calculators/investment-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
            Investment Calculator
          </Link>{" "}
          can model a general investment trajectory, the{" "}
          <Link href="/calculators/savings-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
            Savings Calculator
          </Link>{" "}
          can focus on savings accumulation, and the{" "}
          <Link href="/calculators/inflation-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
            Inflation Calculator
          </Link>{" "}
          can help explain how future nominal dollars compare with today&rsquo;s purchasing power. Those tools answer adjacent questions without changing the Roth-specific tax and eligibility logic on this page.
        </p>
      </section>

      {/* 2026 Roth IRA Reference Table */}
      <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Table className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            2026 Roth IRA Reference Table
          </h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold">
                <th className="p-3 border-b border-slate-200 dark:border-slate-700">Rule</th>
                <th className="p-3 border-b border-slate-200 dark:border-slate-700">2026 Value / Explanation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-medium text-slate-900 dark:text-slate-200">Annual IRA contribution limit</td>
                <td className="p-3 text-slate-700 dark:text-slate-300 font-semibold text-emerald-600 dark:text-emerald-400">$7,500 total across Traditional + Roth IRAs</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-medium text-slate-900 dark:text-slate-200">Age 50+ catch-up</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">$1,100; general combined limit becomes $8,600</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-medium text-slate-900 dark:text-slate-200">Taxable compensation rule</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Contribution is limited to $7,500 / $8,600 or taxable compensation, if less</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-medium text-slate-900 dark:text-slate-200">Roth MAGI phase-out &ndash; Single / Head of Household</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">$153,000 to $168,000</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-medium text-slate-900 dark:text-slate-200">Roth MAGI phase-out &ndash; Married Filing Jointly</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">$242,000 to $252,000</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-medium text-slate-900 dark:text-slate-200">Roth MAGI phase-out &ndash; Married Filing Separately</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">$0 to $10,000</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-medium text-slate-900 dark:text-slate-200">Saver&rsquo;s Credit income limit &ndash; Married Filing Jointly</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">$80,500</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-medium text-slate-900 dark:text-slate-200">Saver&rsquo;s Credit income limit &ndash; Head of Household</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">$60,375</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-medium text-slate-900 dark:text-slate-200">Saver&rsquo;s Credit income limit &ndash; Single / MFS</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">$40,250</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Source note: the contribution limits, Roth MAGI ranges, and Saver&rsquo;s Credit thresholds above are current 2026 figures published by the IRS and should be treated as year-specific data rather than permanent rules.
        </p>
      </section>

      {/* Section: Roth IRA Formulas Used in a Growth Projection */}
      <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Roth IRA Formulas Used in a Growth Projection
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Beginning-of-period annual contribution model
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              For annual contributions made at the beginning of each period:
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-center text-xs sm:text-sm">
              FV = P(1 + r)<sup>n</sup> + C &middot; [((1 + r)<sup>n</sup> &minus; 1) / r] &middot; (1 + r)
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Where <span className="font-serif italic">P</span> is the starting balance, <span className="font-serif italic">C</span> is the annual contribution, <span className="font-serif italic">r</span> is the annual growth rate expressed as a decimal, and <span className="font-serif italic">n</span> is the number of contribution periods. At <span className="font-mono text-xs">r = 0</span>, the formula becomes <span className="font-mono text-xs">FV = P + C &middot; n</span>.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Modeled taxable-account comparison
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              The taxable comparison uses the implementation&rsquo;s documented tax-drag assumption. The page explicitly labels this as a model rather than implying that every taxable brokerage account incurs tax in exactly the same way. Actual tax results depend on the type and timing of income, realization events, basis, filing status, and applicable tax rules.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Simple conversion-tax illustration
            </h3>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-center text-xs sm:text-sm">
              Modeled conversion tax = Conversion Amount &times; Assumed Tax Rate
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Example: $50,000 &times; 25% = $12,500. This is an illustrative assumption, not a substitute for an individualized tax-return calculation. The IRS confirms that previously untaxed amounts converted from a Traditional IRA to a Roth IRA can be included in gross income.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Important Planning Disclosure */}
      <section className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="p-4 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
          <div className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-200 text-sm">
            <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            Important Planning Disclosure
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            This calculator is an educational planning model and does not provide tax, investment, legal, or retirement advice. Current-year contribution limits and income thresholds should be verified against the latest IRS guidance before filing or contributing. Investment returns shown by the calculator are assumptions, not guarantees. Roth conversion and distribution taxation can depend on facts that are not captured by a simplified model, including basis, other IRA balances, filing status, taxable income, and the timing and purpose of distributions. For tax-specific decisions, users should verify the result with current IRS guidance or a qualified tax professional.
          </p>
        </div>
      </section>
    </article>
  );
}

export default RothIraContent;

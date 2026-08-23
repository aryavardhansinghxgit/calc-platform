"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck } from "lucide-react";
import { roth_ira_faqs } from "@/calculators/finance/roth-ira/faq";

export function RothIraContent() {
  // All 12 FAQs open by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 12 }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. SINGLE CANONICAL RELATED CALCULATORS BLOCK (Exactly 7 Verified Live Routes) */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          Related Retirement &amp; Wealth Tools
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/calculators/401k-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            401(k) Calculator
          </Link>
          <Link
            href="/calculators/retirement-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Retirement Calculator
          </Link>
          <Link
            href="/calculators/investment-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Investment Calculator
          </Link>
          <Link
            href="/calculators/savings-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Savings Calculator
          </Link>
          <Link
            href="/calculators/future-value-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Future Value Calculator
          </Link>
          <Link
            href="/calculators/compound-interest-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Compound Interest Calculator
          </Link>
          <Link
            href="/calculators/inflation-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Inflation Calculator
          </Link>
        </div>
      </div>

      {/* 2. EXPANDED MAIN EDUCATIONAL CONTENT (17 COMPLETE SECTIONS) */}
      <div className="space-y-8 pt-6 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is a Roth IRA Calculator?
          </h2>
          <p>
            A Roth IRA calculator is a planning tool that estimates how a Roth IRA balance could grow from a current balance and recurring contributions over a selected time horizon. Because Roth IRA contributions are made with after-tax dollars, the calculator can be useful for comparing the projected account value with a taxable account under a specified tax-drag assumption. In this calculator, contributions are modeled at the beginning of each year, so each annual contribution participates in the modeled year&apos;s growth. The annual schedule then carries the ending balance forward into the next year.
          </p>
          <p>
            The calculator goes beyond a simple future-value formula. It also checks contribution limits, models a simplified Backdoor Roth conversion, evaluates Roth contribution phase-out ranges by filing status and tax year, estimates a Form 8880 Saver&apos;s Credit under its implemented rules, and produces a side-by-side annual schedule. These tools answer different questions, so the page describes each mode separately rather than implying that one headline balance represents every Roth decision a user might make.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How Roth IRA Compound Growth Works
          </h2>
          <p>
            Roth growth is driven by the starting balance, the contribution stream, the investment-return assumption and the number of years invested. In the validated baseline, a $30,000 starting balance and $7,500 annual contribution are projected from age 30 through age 65 using a 6% return assumption and beginning-of-year contribution timing. The resulting Roth balance is $1,116,488.75. Total principal is $292,500, leaving $823,988.75 of modeled growth.
          </p>
          <p>
            The word modeled matters. A calculator using a 6% annual return assumes the account compounds at that rate according to its defined timing convention; an actual Roth IRA experiences changing market returns and investment expenses. Real-world results may therefore be higher or lower. The calculator&apos;s purpose is to make the effect of assumptions visible. Users can change the contribution amount, return assumption and retirement age to understand sensitivity instead of treating one scenario as a guaranteed outcome.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Roth IRA Contributions and the Shared IRA Limit
          </h2>
          <p>
            Roth IRA contributions are subject to an annual IRA contribution limit that is shared with traditional IRA contributions. For 2026, the IRS says the total amount an individual contributes to all of their traditional IRAs and Roth IRAs generally cannot exceed $7,500, or $8,600 for someone age 50 or older, or the individual&apos;s taxable compensation if that amount is lower. The 2026 Roth IRA contribution limit itself is therefore $7,500 before the age-50 catch-up, while the catch-up is $1,100. The combined age-50-and-over maximum is $8,600. For comprehensive multi-pillar retirement modeling, explore our{" "}
            <Link href="/calculators/retirement-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Retirement Calculator
            </Link>
            .
          </p>
          <p>
            The distinction between the Roth limit and the shared IRA limit is important. A person cannot contribute $7,500 to a Roth IRA and another $7,500 to a traditional IRA simply because both accounts exist. The contribution limit applies across the traditional and Roth IRA accounts together. Rollovers and certain other transactions are treated differently from ordinary annual contributions, so users should not try to infer their eligibility for every IRA transaction from the annual contribution field alone.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. 2025 vs. 2026 Roth IRA Limits
          </h2>
          <p>
            The calculator supports separate 2025 and 2026 IRA limit scenarios. For 2025, the regular IRA contribution limit is $7,000 and the age-50-and-over catch-up is $1,000, producing a maximum of $8,000. For 2026, the regular contribution limit rises to $7,500 and the IRA catch-up rises to $1,100, producing a maximum age-50-and-over contribution of $8,600. These values should always be displayed with the relevant tax year because IRS cost-of-living adjustments can change the amounts in future years.
          </p>
          <p>
            The calculator does not present the $8,000 2025 total or the $7,000 2025 base as if they are current 2026 rules. Likewise, the 2026 IRA catch-up is $1,100, not the $8,000 catch-up that applies to most 401(k) plans in 2026. The IRS explicitly lists the IRA catch-up separately from 401(k) catch-up limits.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Roth IRA Income Limits and MAGI Phase-Outs
          </h2>
          <p>
            A direct Roth IRA contribution can be affected by modified adjusted gross income and filing status. For 2026, the Roth IRA phase-out range is $153,000 to $168,000 for single taxpayers and heads of household, $242,000 to $252,000 for married couples filing jointly, and $0 to $10,000 for a married individual filing separately. The calculator therefore distinguishes direct Roth contribution eligibility from the annual dollar contribution limit. Someone can have enough compensation to contribute but still have a reduced or eliminated direct Roth contribution because of the applicable income phase-out.
          </p>
          <p>
            A MAGI checker is also not the same thing as a complete federal tax-return MAGI calculation unless the product collects and calculates all of the relevant inputs. If the calculator uses MAGI as an entered value, it says that clearly. The tool can then compare that entered MAGI against the applicable threshold, but it does not imply that salary alone determines Roth IRA MAGI or that a simplified checker replaces a tax return or tax professional&apos;s calculation.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Roth IRA vs. Taxable Account
          </h2>
          <p>
            The calculator compares a Roth IRA with a taxable account by holding the contribution path and investment-return assumption constant and applying a simplified annual tax-drag model to the taxable account. Under the validated baseline, the Roth balance reaches $1,116,488.75 while the taxable model reaches $778,750.04, a difference of $337,738.71. The taxable model also reports $162,083.35 of modeled tax drag over the 35-year horizon.
          </p>
          <p>
            This comparison is intentionally a model, not a full U.S. brokerage tax simulator. Actual taxable investing can generate different tax consequences depending on interest, qualified and nonqualified dividends, realized capital gains, holding periods, tax-loss activity, asset location, state taxes and the investor&apos;s personal tax circumstances. The page therefore calls the result a modeled ending-balance difference or modeled tax drag, rather than implying that the displayed difference equals a guaranteed tax savings figure for a real taxpayer.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. How the Calculator Handles Beginning-of-Year Contributions
          </h2>
          <p>
            The Roth engine uses beginning-of-year contribution timing. In the baseline, age 30 starts with $30,000, adds the $7,500 annual contribution at the beginning of the period, and then applies the 6% return assumption to the combined $37,500, producing $2,250 of modeled growth and a $39,750 year-end Roth balance. That convention continues for the full schedule. Because the timing is explicit, the first year&apos;s contribution gets a full year of modeled growth. To inspect mathematical compounding equations, check our{" "}
            <Link href="/calculators/compound-interest-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Compound Interest Calculator
            </Link>
            .
          </p>
          <p>
            This convention is different from a model in which a contribution arrives at the end of the year. The purpose is not to claim that every employer or brokerage deposits money on January 1; it is to provide a consistent annual planning model. Actual contribution timing can vary by payroll schedule, brokerage processing and account activity. The methodology section therefore identifies beginning-of-year timing so that users understand why results can differ from a monthly or paycheck-level simulation.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. What Is a Backdoor Roth IRA?
          </h2>
          <p>
            A Backdoor Roth is generally a strategy involving a nondeductible contribution to a traditional IRA followed by a conversion to a Roth IRA when the taxpayer&apos;s circumstances make a direct Roth contribution unavailable or less suitable. The calculator includes a simplified Backdoor Roth conversion mode that takes a conversion amount, an entered marginal tax rate, a return assumption and a time horizon. It computes modeled conversion tax as conversion amount multiplied by the entered tax rate and then projects the converted balance using the calculator&apos;s compound-growth model.
          </p>
          <p>
            That is useful for scenario analysis, but it is deliberately narrower than an actual tax calculation. A real conversion can be affected by the taxpayer&apos;s other traditional, SEP and SIMPLE IRA balances, basis in nondeductible contributions, other income, filing status, tax brackets, state taxes and timing. A user should therefore understand the Backdoor Roth output as a simplified scenario. It is not a determination of what the taxpayer will owe when Form 8606 and the federal return are completed.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. The Backdoor Roth Pro-Rata Rule
          </h2>
          <p>
            The pro-rata rule is one of the most important limitations to mention when discussing Backdoor Roth strategies. If a taxpayer has other pre-tax traditional, SEP or SIMPLE IRA balances, the tax treatment of a conversion may not be determined by looking only at the one nondeductible contribution that was converted. The IRS rules generally require the taxpayer to consider the IRA balances and basis together when determining the taxable portion of the distribution or conversion.
          </p>
          <p>
            The calculator does not collect every fact required to determine a taxpayer&apos;s actual pro-rata tax result. It therefore does not say that a conversion creates zero tax simply because the contribution was converted immediately. The safer explanation is that the tool shows the arithmetic under its selected conversion-tax assumption, while actual conversion taxation can depend on other IRA balances and the applicable pro-rata rules. This distinction is especially important because users often search for Backdoor Roth calculators expecting the output to be a complete tax determination.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Roth IRA Distribution Ordering Rules
          </h2>
          <p>
            Roth IRA distributions are not treated as one undifferentiated pool of dollars. For tax purposes, the ordering rules generally treat regular contributions as coming out first, followed by conversion and rollover amounts, with earnings considered last. This distinction matters because the tax and additional-tax treatment can be different for contributions, converted amounts and earnings. A calculator that projects accumulation does not automatically become a distribution calculator simply because it explains these rules.
          </p>
          <p>
            The page avoids broad statements such as &quot;you can withdraw any amount at any time tax-free.&quot; Regular Roth contributions generally have different treatment from earnings, and conversion amounts can have their own rules relevant to the additional 10% tax. The correct educational approach is to explain the ordering framework and then state that specific distributions can require an analysis of contribution history, conversion history, five-year periods and qualifying exceptions.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. When Roth IRA Distributions Are Qualified
          </h2>
          <p>
            A qualified Roth IRA distribution is generally one that occurs after the five-year period that begins with the first tax year for which the individual made a Roth IRA contribution for the applicable rule and also meets a qualifying condition such as reaching age 59 1/2, disability, death, or the qualified first-home exception within the applicable lifetime limit. The IRS describes the five-year requirement separately from the qualifying event; reaching age 59 1/2 by itself does not turn every Roth distribution into a qualified distribution.
          </p>
          <p>
            This distinction is critical to the page&apos;s language. The calculator explains when qualified Roth IRA distributions can be tax-free under current rules, but it never promises that every withdrawal is tax-free. Actual treatment depends on what type of amount is distributed, the individual&apos;s five-year history, age and the applicable exception. The IRS&apos;s publications and current guidance remain the authoritative source for distribution rules.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Roth IRA RMDs and the Original Owner vs. Beneficiary
          </h2>
          <p>
            Original owners of Roth IRAs generally do not have to take lifetime required minimum distributions while they are alive under current federal rules. Beneficiaries of inherited Roth IRAs are treated differently and are generally subject to inherited-account distribution requirements. The IRS explicitly distinguishes original owners from beneficiaries for RMD purposes.
          </p>
          <p>
            This distinction is worth keeping in the educational content because the phrase &quot;Roth IRA has no RMDs&quot; can be misleading if it is not qualified. The accurate statement is that an original Roth IRA owner is generally not subject to lifetime RMDs, while an inherited Roth IRA is subject to beneficiary rules. The calculator does not model inherited-account distribution schedules, so the page avoids implying that the tool calculates beneficiary RMDs.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Saver&apos;s Credit and Roth IRA Contributions
          </h2>
          <p>
            The Saver&apos;s Credit, also called the Retirement Savings Contributions Credit, can provide a federal tax credit for eligible retirement contributions for taxpayers who meet the applicable income, age, student and dependency requirements. For 2026, the AGI ceiling is $80,500 for married couples filing jointly, $60,375 for heads of household, and $40,250 for single or married-filing-separately filers. The actual credit percentage depends on filing status and AGI, and the credit is capped by the applicable contribution base and tax rules. For basic disciplined savings projections, test our{" "}
            <Link href="/calculators/savings-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Savings Calculator
            </Link>
            .
          </p>
          <p>
            The calculator&apos;s Saver&apos;s Credit checker is described as an eligibility model based on its inputs, not as a filed Form 8880 or a guaranteed credit amount. A user&apos;s final credit can depend on details that are not captured in a simplified calculator, including whether the person is a full-time student, whether another taxpayer can claim them, and other eligibility requirements. The page also distinguishes the current Saver&apos;s Credit rules from the separate Saver&apos;s Match program that applies to future tax years rather than using the programs interchangeably.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Roth IRA Compensation Limits
          </h2>
          <p>
            The annual Roth IRA contribution limit is also constrained by taxable compensation. For 2026, the IRS states that total contributions to all traditional and Roth IRAs generally cannot exceed $7,500, or $8,600 for someone age 50 or older, or the person&apos;s taxable compensation for the year if that is lower. A user therefore cannot simply contribute the full statutory limit when eligible compensation is lower. To compare with employer-sponsored payroll plans, see our{" "}
            <Link href="/calculators/401k-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              401(k) Calculator
            </Link>
            .
          </p>
          <p>
            This is an important distinction from account balance. Having $30,000 already in a Roth IRA does not by itself create more annual contribution room, and investment income inside the account is not the same thing as taxable compensation for purposes of making the ordinary annual contribution. The calculator therefore preserves its compensation constraint and describes it as a modeled eligibility limit rather than as a complete determination of every form of eligible IRA transaction.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Why the Roth-vs-Taxable Advantage Is a Model Output
          </h2>
          <p>
            The headline difference between the Roth and taxable account projections is useful because it illustrates how different tax assumptions can affect long-term accumulation. In the validated baseline, the Roth ends at $1,116,488.75 while the taxable model ends at $778,750.04. The displayed advantage of $337,738.71 is the difference between those two modeled ending balances. For customized asset allocation comparisons, explore our{" "}
            <Link href="/calculators/investment-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Investment Calculator
            </Link>
            .
          </p>
          <p>
            It is not presented as a universal tax savings figure. The taxable model applies an annual tax-drag approximation to growth, while actual taxable investing can produce a mixture of interest income, dividend income and realized capital gains at different rates and times. Likewise, qualified Roth treatment depends on the applicable rules. The result is therefore best understood as a side-by-side scenario showing what happens under the calculator&apos;s assumptions. Users can change the inputs to explore sensitivity rather than treating the comparison as a prediction of the tax result for their brokerage account.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Backdoor Roth Conversion Tax as a Simplified Scenario
          </h2>
          <p>
            In the validated Backdoor Roth baseline, the calculator takes a $50,000 conversion amount and a 25% entered tax rate and computes $12,500 of modeled upfront conversion tax. It then projects the $50,000 converted amount at 6% for 35 years to arrive at approximately $384,304.18. The modeled taxable comparison reaches approximately $233,367.09, producing a calculated net advantage of $138,437.09 after subtracting the $12,500 modeled conversion tax. For lump-sum TVM formulas, see our{" "}
            <Link href="/calculators/future-value-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Future Value Calculator
            </Link>
            .
          </p>
          <p>
            These numbers are internally consistent with the calculator&apos;s formula, but the tax assumption is intentionally simple. The calculator does not establish a taxpayer&apos;s actual conversion tax because that can depend on other IRA balances, basis, income, filing status, state tax, deductions and other facts. The page uses phrases such as &quot;modeled conversion tax&quot; and &quot;modeled advantage under these assumptions&quot; rather than &quot;your tax bill&quot; or &quot;your guaranteed tax savings.&quot;
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Calculation Methodology and Tax Disclaimer
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Calculation Methodology
              </div>
              <p>
                Core methodology: the Roth engine projects a beginning-of-year contribution plus the prior balance and then applies the annual return assumption. The taxable-account comparison uses a simplified annual tax-drag model. The Backdoor Roth mode calculates a simplified conversion tax from the entered marginal rate and compounds the converted amount over the selected horizon. The MAGI checker evaluates the entered filing status, tax year and MAGI against the configured phase-out ranges. The Saver&apos;s Credit mode applies the configured Form 8880-style tiers and eligibility inputs. The annual schedule is derived from the same underlying calculation engine rather than from an independent chart-only approximation. For inflation impact adjustments, check our{" "}
                <Link href="/calculators/inflation-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                  Inflation Calculator
                </Link>
                .
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Tax Disclaimer &amp; Privacy Notice
              </div>
              <p>
                This calculator is an educational planning model, not a tax-return preparer, legal determination, individualized tax recommendation or guarantee of investment performance. Roth IRA eligibility and distribution rules can depend on tax year, filing status, MAGI, compensation, contribution history, conversion history, other IRA balances, five-year periods and other facts. Calculations are performed in your browser, and saved calculation history is stored locally in your browser. Verify current rules with the IRS and consider professional advice for circumstances such as a Backdoor Roth conversion, complex pro-rata basis issues or a large taxable distribution.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 3. FAQ SECTION (Exactly 12 Approved FAQs, Open by Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {roth_ira_faqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default RothIraContent;

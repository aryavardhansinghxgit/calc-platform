"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck } from "lucide-react";
import { four_zero_one_kFaqs } from "@/calculators/finance/401k/faq";

export function FourZeroOneKContent() {
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
      {/* 1. EXPANDED MAIN EDUCATIONAL CONTENT (17 COMPLETE SECTIONS) */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is a 401(k) Calculator?
          </h2>
          <p>
            A 401(k) calculator is a planning tool that estimates how a retirement account could grow over time from a combination of an existing balance, employee contributions, employer matching contributions, salary growth and an assumed investment return. The basic model is a time-series projection: each year begins with an account balance, adds the employee contribution, adds the modeled employer match, applies the calculator&apos;s investment-growth convention, and produces a new ending balance. The process repeats until the selected retirement age. This makes the result easier to inspect than a single compound-growth number because the user can see how salary, contributions, matching dollars and investment growth evolve together.
          </p>
          <p>
            The most useful 401(k) calculators also show the difference between nominal dollars and purchasing power. A future balance such as $1.9 million may look large in future dollars, but its inflation-adjusted value can be materially lower. This calculator therefore presents both the projected nominal account value and an inflation-adjusted purchasing-power estimate. That second number is not a prediction of what the user will actually be able to spend; it is a mathematical conversion based on the selected inflation assumption. The same model-bound approach applies to the monthly retirement-withdrawal estimate and the early-withdrawal calculator.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How 401(k) Contributions Build Retirement Wealth
          </h2>
          <p>
            Employee contributions are one of the core drivers of the projection. The calculator takes annual salary and multiplies it by the selected employee deferral rate. If salary is $75,000 and the employee deferral rate is 10%, the model starts with a $7,500 annual employee contribution. When salary growth is enabled, later-year contributions can become larger because the contribution percentage is applied to the growing salary. The resulting contribution stream is not a single fixed deposit; it is a sequence of annual contributions linked to the salary path.
          </p>
          <p>
            Employer matching adds another stream. In the baseline, the employer matches 50% of employee contributions up to 6% of salary. That means contributing at least 6% of salary is enough to receive the model&apos;s maximum match under the stated formula. The contribution rate above that threshold can continue increasing the employee contribution and retirement balance, but it does not increase the modeled employer match once the match limit has been reached. Real plan formulas differ, so the calculator&apos;s employer-match result should always be understood as the formula the user entered rather than a universal employer benefit.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Employer Matching and the Match Maximizer
          </h2>
          <p>
            The employer-match feature answers a practical question: how much of your salary must you contribute to capture the maximum employer matching amount under the plan formula you entered? With a 50% employer match and a 6% match limit, the model calculates a maximum employer contribution of 3% of salary. On a $75,000 salary, that is $2,250 per year. The calculator&apos;s Match Maximizer therefore identifies 6% of salary as the minimum employee deferral needed to capture that modeled maximum match. This is a mathematical result of the entered plan terms, not a statement that every employer offers the same benefit. For full long-term retirement roadmap modeling, explore our{" "}
            <Link href="/calculators/retirement-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Retirement Calculator
            </Link>
            .
          </p>
          <p>
            The page avoids turning matching contributions into an unconditional investment-return guarantee. A matching contribution can create an immediate increase relative to the employee contribution that qualifies for the match, but actual plan terms control eligibility, vesting, timing, compensation definitions, and applicable annual limits. The calculator also does not model a separate vesting schedule, so the projected employer contributions should be interpreted as retained under the tool&apos;s stated assumptions. The actual plan document remains authoritative.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Salary Growth and Its Effect on a 401(k) Projection
          </h2>
          <p>
            Salary growth can have a compounding effect on retirement contributions because a percentage-based deferral rises as the underlying salary rises. In the validated baseline, salary starts at $75,000 and grows 3% per year. The second year therefore uses $77,250, while the third year uses approximately $79,567.50. At a 10% employee deferral, the contribution grows with salary rather than staying fixed at $7,500. Employer matching can grow at the same time because the match formula is also tied to salary. To see pure compounding mechanics over multi-decade periods, test our{" "}
            <Link href="/calculators/compound-interest-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Compound Interest Calculator
            </Link>
            .
          </p>
          <p>
            This is one reason a long retirement horizon can produce a dramatically different result from a simple fixed-contribution example. The salary-growth assumption affects the amount going into the account, while the investment-return assumption affects how the accumulated balance and contributions grow. The model does not know whether a real person&apos;s salary will rise at exactly 3% every year. A user can therefore treat salary growth as a scenario input and compare assumptions rather than treating one rate as a forecast.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Investment Return and the Meaning of a Projected Balance
          </h2>
          <p>
            The investment-return input is an assumption used by the model to grow the account balance. A higher positive return generally produces a higher projected balance, while a lower return produces a lower projection, all else equal. The calculator&apos;s baseline uses 6%, but that number is not a guaranteed investment return. Actual retirement-account returns depend on the investments chosen, market performance, fees, timing, contribution allocation, and other factors. A projection should therefore be interpreted as what the account could look like under these assumptions rather than what the account will be worth. For customized portfolio asset allocation analysis, use our{" "}
            <Link href="/calculators/investment-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Investment Calculator
            </Link>
            .
          </p>
          <p>
            The calculator also uses a specified growth convention for distributed payroll contributions: annual growth is modeled from the starting balance plus a contribution timing adjustment, rather than pretending that every payroll deposit occurred on the first day of the year. This is an approximation intended to keep the annual model transparent and efficient. The educational content states the model scope instead of presenting the formula as an exact reconstruction of a real 401(k) account that experiences daily investment returns, individual payroll dates, fund fees and market volatility.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Inflation and the Purchasing Power of a Future 401(k) Balance
          </h2>
          <p>
            Nominal account value and purchasing power answer different questions. If the calculator projects a retirement balance of $1,899,989.67 at age 65 and assumes 3% annual inflation for 35 years, it converts the nominal amount into today&apos;s-dollar purchasing power using the inflation model. The resulting estimate is about $675,224.81. This does not mean the account literally contains $675,224 in future dollars; it means the future nominal balance has a purchasing-power equivalent of approximately that amount under the selected inflation assumption. For broader inflation simulations, use our{" "}
            <Link href="/calculators/inflation-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Inflation Calculator
            </Link>
            .
          </p>
          <p>
            This distinction is essential when people use a retirement calculator for long horizons. Inflation affects what future dollars can buy, so a large nominal balance can have a substantially smaller real value. At the same time, the inflation model is itself an assumption. Actual inflation can vary over time, and spending patterns may not rise at exactly the same rate as the general inflation assumption. The calculator therefore offers an inflation-adjusted planning view rather than a guarantee of future living costs.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Traditional 401(k) vs. Roth 401(k)
          </h2>
          <p>
            Traditional and Roth 401(k) contributions differ primarily in when taxes are applied. Traditional 401(k) employee deferrals are generally made on a pre-tax basis under applicable plan and tax rules, while designated Roth 401(k) contributions are made with after-tax dollars. The future tax treatment of distributions differs as well. A traditional distribution can generally be included in ordinary income, whereas a qualified Roth distribution can be tax-free when the applicable requirements are satisfied. The IRS describes qualified Roth distributions as distributions that meet the relevant rules rather than treating every Roth withdrawal as automatically tax-free. For individual retirement account tax comparisons, see our{" "}
            <Link href="/calculators/ira-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              IRA Calculator
            </Link>
            .
          </p>
          <p>
            The calculator&apos;s educational comparison does not imply that the two account types are completely simulated as separate tax engines unless the implementation actually calculates them separately. If the page is comparing the concepts rather than modeling tax differences numerically, say so explicitly. Tax treatment can change with legislation and with the user&apos;s circumstances. For a real contribution decision, the plan document, current tax rules and the user&apos;s own circumstances are more authoritative than a generic calculator.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. 2026 401(k) Contribution Limits and Catch-Up Contributions
          </h2>
          <p>
            The contribution-limit section is time-sensitive and must be labeled by tax year. For 2026, the IRS lists a $24,500 employee elective-deferral limit for most 401(k) plans. Participants who are age 50 or older by the end of the calendar year can generally make an additional catch-up contribution of up to $8,000 for 2026, if the plan permits it. The IRS also states that a higher catch-up limit of $11,250 applies in 2026 for employees who attain age 60, 61, 62 or 63 during the year and participate in most 401(k), 403(b), governmental 457 and federal TSP plans. These figures are subject to applicable rules and plan terms and can change in later tax years.
          </p>
          <p>
            The calculator models the 2026 regular limit ($24,500) and the general age-50+ catch-up of $8,000 and does not separately model the enhanced age-60-to-63 catch-up. That limitation is stated plainly. The IRS also notes that plan terms can impose lower elective-deferral limits and that overall annual-addition limits can include employer contributions and other amounts. The number $24,500 is therefore a tax-year limit under federal rules, not a universal statement that every participant can contribute exactly that amount regardless of plan rules, compensation or eligibility.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Early 401(k) Withdrawals and the 10% Additional Tax
          </h2>
          <p>
            A distribution from a qualified retirement plan before age 59 1/2 is generally treated as an early distribution and may be subject to an additional 10% tax unless an exception applies. The IRS explicitly lists exceptions, which means a simple statement that every withdrawal before 59 1/2 pays 10% is too broad. The calculator&apos;s Early Withdrawal mode uses a simplified scenario: the user enters an amount, federal tax rate, state tax rate and local rate, and the model separately calculates the 10% additional penalty and the modeled income-tax amount.
          </p>
          <p>
            The validated example uses a $10,000 withdrawal, a 25% federal tax assumption and a 5% state tax assumption, producing a modeled $1,000 additional tax/penalty and $3,000 modeled income taxes, for $6,000 modeled net cash. This is mathematically correct within the calculator&apos;s model, but it is not an IRS tax-return calculation. Federal withholding, final tax liability, state rules, the taxable portion of a distribution and applicable exceptions can differ. The output is therefore labeled a simplified scenario estimate rather than a statement of the user&apos;s actual tax bill.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Hardship Withdrawals and 401(k) Participant Loans
          </h2>
          <p>
            Hardship distributions and participant loans are different ways of accessing a retirement plan, and both depend heavily on plan provisions. The IRS explains that a 401(k) plan may permit hardship distributions for certain immediate and heavy financial needs and that the plan determines when funds may be accessed. Hardship distributions may still be subject to income tax and the additional 10% tax unless an exception applies. The calculator therefore avoids universal statements about how much of a hardship withdrawal the participant keeps after taxes and penalties.
          </p>
          <p>
            A properly structured participant loan is also different from a distribution. The IRS states that some plans permit loans and that a compliant plan loan generally is not taxable as a distribution when the applicable criteria and repayment terms are satisfied. The IRS also explains that defaults or violations of plan loan requirements can lead to taxable treatment. The calculator explains this distinction, but because it does not model plan-loan limits, repayment schedules and defaults, the page does not imply that every 401(k) loan is automatically tax-free or cost-free.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Monthly Retirement Withdrawal Capacity
          </h2>
          <p>
            The calculator&apos;s monthly withdrawal output is an illustrative 20-year real annuity calculation. Under the validated baseline, the nominal return is 6% and inflation is 3%, producing a real-return assumption of roughly 2.91%. That real rate, together with the projected retirement balance and a 20-year withdrawal horizon, produces a modeled monthly withdrawal capacity of approximately $3,752.17. This is not the same as applying a generic 4% withdrawal rule, and it is not labeled a universally safe withdrawal amount. For TVM annuity equations, check our{" "}
            <Link href="/calculators/future-value-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Future Value Calculator
            </Link>
            .
          </p>
          <p>
            The model is useful because it connects the projected account balance to a defined withdrawal assumption. At the same time, real retirement sustainability depends on sequence of returns, taxes, investment fees, longevity, spending changes, healthcare costs, Social Security, other assets and many other factors. The calculator answers a narrower mathematical question: given the balance, real return and 20-year annuity assumption, what monthly payment does the model support? That is an estimate, not a guarantee of lifetime income.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Age-by-Age 401(k) Schedule
          </h2>
          <p>
            The age-by-age schedule is one of the most valuable parts of the calculator because it makes the projection auditable. Each row contains age/year, salary, employee contribution, employer match, investment growth, ending balance and purchasing power. The ending balance reconciles from the beginning balance plus the model&apos;s annual contribution, employer match and investment-growth calculation. The full 35-year schedule ties directly to the headline ending balance of $1,899,989.67.
          </p>
          <p>
            The schedule also reveals how the composition of growth changes over time. Early in the horizon, contributions are a larger part of the annual change because the account balance is still relatively small. Later, investment growth can become the largest annual component because growth is being calculated on a much larger accumulated balance. This is why the chart and schedule use the same engine rather than separate approximations: users can move from a headline balance to an age-specific row and reconcile the result.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Employer Matching vs. IRS Contribution Limits
          </h2>
          <p>
            Two separate limits often get confused in retirement planning. The employer match formula determines how much matching money the employer adds based on employee contributions, while the IRS elective-deferral limit restricts how much an employee can generally defer into the plan. For example, with a 50% match up to 6% of salary, contributing 6% can capture the model&apos;s maximum match even though the employee may be allowed to contribute much more under the annual IRS limit. The calculator therefore treats match optimization and contribution-limit enforcement as separate pieces of the model.
          </p>
          <p>
            The IRS also distinguishes elective deferrals from total annual additions to a defined-contribution plan. For 2026, the overall annual-addition limit is $72,000, with different treatment for catch-up contributions and special age ranges, while the employee elective-deferral limit is $24,500. Because the calculator does not model every plan-level compensation, nondiscrimination, vesting and employer-contribution rule, the content states what is being modeled and avoids implying that the tool is a complete compliance calculator for every 401(k) plan.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Vesting and Why the Projected Match May Not Equal Vested Value
          </h2>
          <p>
            An employer&apos;s matching contribution is an account contribution, but the employee&apos;s eventual ownership of employer contributions can be affected by vesting rules in the plan. The current calculator does not model a separate vesting schedule; its projected match is treated as retained under the assumptions entered. That is useful for comparing contribution strategies, but it is not a statement about what the participant would necessarily be entitled to keep after leaving an employer.
          </p>
          <p>
            This distinction can materially matter for someone with a short tenure or a plan using graded or cliff vesting. Users should check the plan&apos;s Summary Plan Description or other official documents for vesting rules. The calculator&apos;s role is to model the arithmetic of the entered match formula, not to determine the legal ownership of employer contributions.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Why a 401(k) Projection Can Differ From Your Actual Account
          </h2>
          <p>
            A projection can differ from an actual 401(k) balance for many legitimate reasons. Market returns are not a fixed annual percentage in real life. Contributions may be made each paycheck rather than once per year. Salary can change differently from the assumed growth rate. Employer match formulas can include different eligibility, compensation, vesting or per-pay-period rules. Investment expenses and fund-level fees can reduce returns. Plan restrictions can affect contributions and distributions. None of these differences necessarily indicates a problem with the calculator if the calculator is faithfully applying its stated assumptions. For basic disciplined cash flow modeling, test our{" "}
            <Link href="/calculators/savings-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Savings Calculator
            </Link>
            .
          </p>
          <p>
            The best way to use the result is therefore as a scenario model. Match the inputs as closely as possible to your plan, compare alternative contribution rates and return assumptions, and inspect the age-by-age schedule. When the result is used for an actual retirement decision, the official plan documents, account statements, investment disclosures and current tax rules should take precedence over a generic online projection.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. How 401(k) Growth, Taxes and Inflation Fit Together
          </h2>
          <p>
            The calculator contains several concepts that should be kept separate. Investment growth is the increase or decrease in the account value produced by the model&apos;s assumed return. Inflation is a purchasing-power adjustment that translates a future balance into an approximate today&apos;s-dollar equivalent. Tax treatment depends on the type of contribution and distribution. These are different mechanisms and should not be collapsed into a single return-after-tax-and-inflation number unless the engine explicitly models those interactions.
          </p>
          <p>
            Traditional 401(k) contributions generally receive tax-deferred treatment under applicable rules, while Roth contributions are made with after-tax dollars and can receive tax-free treatment when qualified distribution requirements are met. Employer matching and vesting add another layer. For current-law statements, use IRS material as the authoritative source and clearly label the tax year, because retirement-plan rules can change.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Calculation Methodology and Retirement Disclaimer
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Calculation Methodology
              </div>
              <p>
                Core methodology: the calculator projects the account year by year from the current age through the retirement age. Salary is grown according to the selected annual salary-growth assumption. Employee contributions are calculated from the year&apos;s salary and deferral rate, subject to the modeled contribution limit. Employer matching is calculated from the plan&apos;s entered match percentage and match-limit percentage. Investment growth uses the calculator&apos;s specified annual approximation for distributed payroll contributions. The resulting ending balance becomes the next year&apos;s starting balance. Purchasing power is then calculated using the selected inflation assumption. The withdrawal tool uses the modeled real-return annuity method over its defined horizon.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Retirement Disclaimer &amp; Privacy Notice
              </div>
              <p>
                This is a planning calculator, not a fiduciary recommendation, tax-return calculator, plan document, legal determination, or guarantee of investment performance. Actual 401(k) outcomes depend on plan terms, contributions, employer matching, vesting, investment performance, fees, taxes, inflation, withdrawals and other factors. The model also does not separately simulate the higher age-60-to-63 catch-up contribution for 2026. Calculations are performed in your browser, and saved calculation history is stored locally in your browser. Verify current contribution limits and distribution rules with the IRS and your plan administrator before making decisions.
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
          {four_zero_one_kFaqs.map((faq, idx) => {
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

export default FourZeroOneKContent;

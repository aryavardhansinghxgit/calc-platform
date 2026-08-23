"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck } from "lucide-react";
import { future_valueFaqs } from "@/calculators/finance/future-value/faq";

export function FutureValueContent() {
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
          Related Wealth &amp; Investment Tools
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
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
            href="/calculators/present-value-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Present Value Calculator
          </Link>
          <Link
            href="/calculators/retirement-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Retirement Calculator
          </Link>
          <Link
            href="/calculators/401k-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            401(k) Calculator
          </Link>
          <Link
            href="/calculators/ira-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            IRA Calculator
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
            1. What Is Future Value?
          </h2>
          <p>
            Future value (FV) is the value that a current amount of money, plus any future contributions, is projected to reach at a specified future date under stated growth assumptions. The core idea is the time value of money: money available today can earn a return, and when earnings remain invested they can themselves generate additional earnings. For a single lump sum, the familiar compound-growth model is <code>FV = PV(1 + r/n)^(nt)</code>, where PV is the present value, r is the nominal annual rate expressed as a decimal, n is the number of compounding periods per year, and t is the number of years. For comprehensive asset allocation modeling, use our{" "}
            <Link href="/calculators/investment-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Investment Calculator
            </Link>
            .
          </p>
          <p>
            Future value becomes more useful when recurring contributions are included because real savings plans rarely consist of a single deposit. A monthly contribution creates a series of future cash flows, each with a different amount of time to grow. The calculator therefore treats the initial lump sum and recurring contributions as separate components before combining them. This is also why a future-value result should always be read together with the total amount invested and the modeled growth: a large future balance can come from substantial contributions, from investment growth, or from a combination of both.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How the Future Value Formula Works
          </h2>
          <p>
            For a single lump sum, the compound-growth equation is <code>FV = PV(1 + r/n)^(nt)</code>. The periodic growth rate is the nominal annual rate divided by the number of compounding periods per year. If $10,000 is invested at 8% nominal annual growth with monthly compounding for 10 years, the lump-sum component grows to about $22,196.40. The calculator then separately models recurring contributions using the ordinary-annuity expression when deposits occur at the end of each period.
          </p>
          <p>
            For an ordinary annuity, <code>FV = PMT[((1+i)^N - 1)/i]</code>, where PMT is the recurring contribution, i is the contribution-period rate, and N is the number of contributions. In the validated baseline, $500 monthly for 120 months at the corresponding monthly rate produces about $91,473.02. Adding that to the $22,196.40 lump-sum component produces $113,669.42. This decomposition is valuable because it lets the user distinguish the money they contributed from the growth generated by the model. The calculator retains full precision internally and rounds displayed currency values only for presentation.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Future Value of a Lump Sum vs. Recurring Contributions
          </h2>
          <p>
            A lump-sum investment and a recurring-contribution plan can both be evaluated with future-value mathematics, but they behave differently because the money is invested for different lengths of time. A lump sum entered at the start of the horizon receives the full compounding period. A monthly contribution made at the end of each month receives fewer compounding periods on average because later deposits have less time to grow. This is why a recurring contribution schedule cannot be treated as a single deposit equal to the sum of all contributions. You can also explore pure recurring schedules with our{" "}
            <Link href="/calculators/savings-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Savings Calculator
            </Link>
            .
          </p>
          <p>
            The calculator explicitly separates these components in its baseline. The $10,000 initial investment grows to $22,196.40, while the $500 monthly contribution stream grows to $91,473.02. The total invested is $70,000, but the modeled future value is $113,669.42 because the model adds $43,669.42 of growth. This presentation is more useful for users than a single headline because it answers three distinct questions: how much did I put in, how much growth did the assumptions generate, and what is the projected ending balance?
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Ordinary Annuity vs. Annuity Due
          </h2>
          <p>
            The timing of recurring contributions changes future value. An ordinary annuity assumes contributions are made at the end of each period. An annuity due assumes contributions are made at the beginning. Because beginning-of-period contributions receive one extra period of growth in a standard setup, the annuity-due result is higher for a positive periodic rate. The calculator supports both timing modes, so the difference should be visible and mathematically traceable.
          </p>
          <p>
            For the validated baseline, end-of-period contributions produce $113,669.42. Beginning-of-period contributions produce $114,279.24, a difference of $609.82. That difference is exactly the additional compounding period applied to the recurring contribution stream in the model. Future-value calculators commonly expose this same timing distinction because the answer materially depends on whether a deposit is made at the beginning or end of each period.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. How Compounding Frequency Affects Future Value
          </h2>
          <p>
            Compounding frequency describes how often the modeled return is applied to the balance. With a positive nominal rate and otherwise comparable assumptions, more frequent compounding generally produces a higher future value because interest or earnings are incorporated into the balance sooner. The effect is visible in the validated spectrum: annual compounding produces $108,187.97, semi-annual $112,059.88, quarterly $113,116.71, monthly $113,669.42, and daily $113,940.67.
          </p>
          <p>
            The exact comparison becomes more subtle when contribution frequency and compounding frequency differ. Monthly contributions into an annually compounded model are not mathematically identical to monthly contributions into a monthly compounded model. A robust calculator must define how contribution dates map to compounding periods and then apply that convention consistently. The final content therefore explains compounding as one dimension of the model and contribution frequency as another, rather than implying that changing one automatically changes the other.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Contribution Frequency and Step-Up Contributions
          </h2>
          <p>
            Recurring contributions can be monthly, quarterly, semiannual, or annual, depending on what the calculator supports. A higher contribution frequency does not automatically mean a higher annual contribution amount: the total contributed depends on both the amount per contribution and the number of contributions per year. Users should compare schedules on an annual contribution basis when evaluating strategies. The calculator&apos;s schedule and total-invested metrics make that comparison possible.
          </p>
          <p>
            The step-up feature models contributions that rise over time, such as increasing a monthly savings amount by a defined percentage each year. This is a growing-annuity concept rather than a simple fixed-payment annuity. In the validated engine, a 5% annual step-up produces $137,633.24 and a 10% step-up produces $169,451.98 under the tested baseline assumptions. These are model outputs for those specific assumptions; the effect of a contribution increase depends on the starting amount, return assumption, time horizon, timing and escalation rate. It should never be presented as a universal percentage increase in retirement wealth.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Inflation-Adjusted Future Value
          </h2>
          <p>
            A nominal future value is expressed in future dollars. Inflation adjustment translates that nominal amount into an estimate of purchasing power in today&apos;s dollars under a stated inflation assumption. The basic real-value relationship is <code>Real Value = Nominal Future Value / (1 + inflation)^years</code>. In the validated example, $1,000,000 received 30 years in the future under 3% annual inflation corresponds to about $411,986.76 of today&apos;s purchasing power. For broader purchasing power simulations, review our{" "}
            <Link href="/calculators/inflation-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Inflation Calculator
            </Link>
            .
          </p>
          <p>
            This distinction is crucial for long-term planning. A future balance can look large in nominal terms while buying substantially less than the same number of dollars buys today. Current future-value tools commonly expose inflation adjustment because users often want to know not just the amount of money on a future statement, but what that amount might represent in today&apos;s purchasing power. Inflation itself is an assumption in the model; actual inflation can differ over time, so the real-value output should be described as an illustrative purchasing-power estimate rather than a forecast.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Tax Drag and the Limits of a Simplified Tax Model
          </h2>
          <p>
            Taxes can reduce modeled compounding because money removed from an investment for taxes is money that is no longer available to compound. The effect depends on what is taxed, when it is taxed, the account structure, tax jurisdiction, tax rate, and whether gains are realized or remain unrealized. A simplified calculator can illustrate tax drag by applying the defined tax assumption to modeled growth, but that is not the same thing as reproducing an individual&apos;s actual tax return or investment tax treatment.
          </p>
          <p>
            The page distinguishes the calculator&apos;s tax model from real-world tax law. Tax-advantaged accounts can alter the timing or treatment of taxes, but{" "}
            <Link href="/calculators/401k-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              401(k) Calculator
            </Link>
            ,{" "}
            <Link href="/calculators/ira-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              IRA Calculator
            </Link>
            , Roth IRA, ISA and other account types have different rules and are governed by different jurisdictions. The safe framing is that account type can change the tax treatment of investment growth, subject to applicable law and product rules. The calculator does not claim that any particular account universally prevents tax drag or recommend an account as the right choice for a particular user.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Effective APY vs. Nominal Annual Rate
          </h2>
          <p>
            The nominal annual rate and effective annual yield are not always the same when compounding occurs more than once per year. For a nominal rate r compounded n times per year, the effective annual rate is <code>(1 + r/n)^n - 1</code>. At an 8% nominal rate compounded monthly, the calculator produces an effective annual yield of approximately 8.30%. The effective figure incorporates the intra-year compounding effect, while the nominal rate is the stated annual rate before that frequency adjustment.
          </p>
          <p>
            This distinction helps users compare scenarios with different compounding conventions, although effective annual yield alone does not describe a recurring-contribution strategy. A full future-value projection also depends on when contributions are made and how frequently those contributions interact with the modeled growth process. The page therefore treats APY as a supporting metric rather than as a substitute for the complete accumulation schedule.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. How Long Does It Take an Investment to Double?
          </h2>
          <p>
            The calculator displays an estimated years-to-double metric based on the effective annual growth rate. Under a constant effective rate, the exact doubling period can be written as <code>ln(2) / ln(1 + effective rate)</code>. With an effective annual rate of about 8.30%, the mathematical doubling time is about 8.69 years, displayed as 8.7 years. This is an assumption-based calculation, not a statement that an investment will actually double on a fixed date.
          </p>
          <p>
            The familiar Rule of 72 is a mental shortcut, not the exact equation. It can be useful for quick estimation around common rate ranges, but the logarithmic formula is more precise. The calculator labels its metric as an estimate based on the entered effective rate rather than a guarantee of future market performance.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Future Value and Goal Planning
          </h2>
          <p>
            A future-value calculator can also work backward from a target. Instead of asking &quot;What will my investment become?&quot;, the user can ask &quot;How much must I contribute to reach a target?&quot; The reverse problem can solve for a required periodic contribution, initial balance, rate or horizon. The mathematical method depends on the variable being solved. Periodic contribution and initial value can be solved analytically with our{" "}
            <Link href="/calculators/present-value-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Present Value Calculator
            </Link>
            , while rate or horizon can require numerical methods. For comprehensive post-career models, explore our{" "}
            <Link href="/calculators/retirement-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Retirement Calculator
            </Link>
            .
          </p>
          <p>
            The validated goal example sets a $1,000,000 target, $10,000 starting balance, 8% rate and 10-year horizon. The modeled required monthly contribution is $5,344.77. At 0% growth, the same target requires $8,250 per month because the future-value equation becomes simple addition. A goal-solver result is conditional: it assumes the selected rate, contribution timing, horizon and other model inputs remain as specified. It is not a guarantee that the target will be reached in the real world.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Scenario Comparison and Return Assumptions
          </h2>
          <p>
            Scenario comparison is useful because investment outcomes are uncertain. The calculator provides Conservative, Moderate and Aggressive scenarios around a base rate, allowing users to compare projected ending balances without changing the rest of the inputs. In the validated baseline, 5.5% produces $97,064.56, 8.0% produces $113,669.42, and 11.0% produces $138,390.57. The ordering is mathematically monotonic because the other inputs remain constant and the rate changes.
          </p>
          <p>
            Scenario labels do not make the returns themselves conservative, moderate or aggressive in a universal financial sense. They are labels attached to user-selected assumptions. A preset such as S&amp;P 500 (10%), Balanced (7%) or Fixed Deposit (6.5%) must likewise be understood as illustrative return assumptions. Current financial calculators expose scenario rates precisely because users need to examine several possibilities rather than treat one rate as certain.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Monte Carlo Simulation: What the Probability Means
          </h2>
          <p>
            The calculator&apos;s Monte Carlo feature uses 500 simulated paths, a stochastic return process and a deterministic seed so the result is reproducible between runs. The current implementation uses Box-Muller normal transforms and a seeded pseudo-random generator. The output in the validated baseline is 51.0% for the selected goal. Because the simulation is model-based, the correct interpretation is that 51% of simulated paths reached the target under the selected assumptions, not that the user has a factual 51% probability of investment success.
          </p>
          <p>
            Monte Carlo analysis is valuable because a single fixed return assumption can hide the variability that investors actually face. At the same time, the quality of a Monte Carlo estimate depends on the assumed mean return, volatility, contribution path, horizon, distributional model and other assumptions. The calculator&apos;s probability is an output of the simulation model, not a personalized forecast.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Understanding Return Multiple, Interest Share and Growth Efficiency
          </h2>
          <p>
            The calculator displays several percentages that describe growth from different denominators. Return Multiple is future value divided by total invested, so the validated 113,669.42 / 70,000 calculation produces about 1.62x. Interest Share is interest earned divided by future value, which is 43,669.42 / 113,669.42 = 38.4%. Growth Efficiency uses a different denominator: interest earned divided by total invested, producing 43,669.42 / 70,000 = 62.4%.
          </p>
          <p>
            These metrics should not be conflated. Interest Share answers how much of the ending balance is growth under the model. Growth Efficiency answers how large the modeled growth is relative to the amount invested. Neither metric is a standard measure of actual portfolio performance, annualized return, or risk-adjusted efficiency. They are explanatory calculator metrics that help users interpret the relationship between contributions and modeled growth.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Reading the Accumulation Schedule
          </h2>
          <p>
            The accumulation schedule is the audit trail for the future-value result. Every period contains a starting balance, contribution, interest earned and ending balance. Under the calculator&apos;s baseline timing convention, the invariant is <code>End Balance = Start Balance + Contribution + Interest Earned</code>. The yearly schedule summarizes the same monthly data, so the ten annual rows reconcile exactly to the 120 monthly rows.
          </p>
          <p>
            The schedule is useful because it shows where the final balance came from instead of asking users to trust a single headline number. In the validated baseline, year 1 starts at $10,000, adds $6,000 of contributions and $1,054.96 of interest to reach $17,054.96. By year 10 the balance reaches $113,669.42. The table also supports search, monthly/yearly views and CSV export, which makes the calculation independently inspectable outside the calculator interface.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Future Value vs. Present Value
          </h2>
          <p>
            Present value asks what a future amount is worth today under a stated discount or growth rate. Future value asks what a current amount or stream of contributions may become later. They are two directions of the same time-value-of-money relationship. For a single lump sum, moving forward uses compound growth; moving backward uses discounting.
          </p>
          <p>
            The distinction matters when planning goals. A present-value question might be &quot;How much would I need today to have $1 million in ten years?&quot; A future-value question might be &quot;How much will $100,000 grow to in ten years?&quot; The calculator&apos;s goal solver extends the future-value framework by allowing the user to solve backward for required contribution, present balance, rate or horizon.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Methodology, Limitations and Financial Disclaimer
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Methodology &amp; Model Assumptions
              </div>
              <p>
                Core methodology: the calculator combines a lump-sum compound-growth component with a recurring-contribution model. Contribution timing supports ordinary-annuity and annuity-due behavior. Different compounding and contribution frequencies are aligned through the implementation&apos;s defined periodic model. Step-up contributions use an annual escalation schedule. Inflation adjustment converts nominal future value to a present-purchasing-power estimate. Tax drag applies the calculator&apos;s defined simplified tax treatment. Goal solving uses analytical inversion where available and iterative solving for rate or time. Monte Carlo uses a seeded stochastic model for reproducible scenario analysis.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Disclaimer &amp; Privacy Notice
              </div>
              <p>
                This is a mathematical planning and educational calculator, not an investment adviser, tax adviser, broker, guaranteed-return product or personalized retirement plan. Actual investment results can differ because returns vary, contributions change, inflation changes, taxes and fees vary, and real products have terms that are not represented by the model. A displayed rate, scenario or Monte Carlo probability is an assumption or model output. Calculations are performed in your browser, and saved calculation history is stored locally in your browser. Users should verify product-specific rates, fees, taxes and account rules from the relevant provider and applicable official sources before making financial decisions.
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
          {future_valueFaqs.map((faq, idx) => {
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

export default FutureValueContent;

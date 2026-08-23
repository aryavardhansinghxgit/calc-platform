"use client";

import React, { useState } from "react";
import { ChevronDown, BookOpen, HelpCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { SAVINGS_CALCULATOR } from "@/calculators/finance/savings";

export function SavingsContent() {
  // All 20 FAQs open by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 20 }, (_, i) => i))
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

  const faqs = SAVINGS_CALCULATOR.faqs || [];

  return (
    <article className="prose dark:prose-invert max-w-none space-y-8 text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed mt-6">
      {/* 1. RELATED CALCULATORS BLOCK (Exactly 7 Verified Active Routes) */}
      <section className="space-y-3 pt-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Related Savings &amp; Investment Calculators
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/calculators/investment-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Investment Calculator
          </Link>
          <Link
            href="/calculators/retirement-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Retirement Calculator
          </Link>
          <Link
            href="/calculators/cd-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            CD Calculator
          </Link>
          <Link
            href="/calculators/inflation-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Inflation Calculator
          </Link>
          <Link
            href="/calculators/budget-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Budget Calculator
          </Link>
          <Link
            href="/calculators/401k-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            401(k) Calculator
          </Link>
          <Link
            href="/calculators/interest-rate-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Interest Rate Calculator
          </Link>
        </div>
      </section>

      {/* 2. 15 EDUCATIONAL SECTIONS */}
      <div className="space-y-8 text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed pt-2">
        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is a Savings Calculator?
          </h2>
          <p>
            A savings calculator estimates how an initial balance and recurring contributions could grow over a selected time horizon under an assumed annual rate and compounding frequency. This calculator also models contribution increases, taxes on interest, inflation-adjusted purchasing power, savings goals, retirement projections, and FIRE target heuristics. Results are mathematical estimates based on the assumptions entered.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How Compound Interest Affects Savings Growth
          </h2>
          <p>
            Compound interest means interest earned in one period becomes part of the balance used to calculate later interest. Over longer horizons, the timing of contributions and the rate applied to the balance can materially affect the ending value. Investor.gov provides compound-interest guidance built around an initial investment, recurring contribution, estimated rate, time and compounding frequency.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. How This Calculator Models Contribution Timing
          </h2>
          <p>
            The engine uses a month-by-month simulation. Annual contributions are deposited in Month 1 of each year, while monthly contributions are deposited at the beginning of each month. Because money deposited earlier has more time to earn interest, a $6,000 annual contribution deposited at the start of each year can produce a different result from six or twelve smaller deposits spread across the year. This timing is a property of the calculator&apos;s model, not a universal bank posting rule.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Annual vs. Monthly Contributions
          </h2>
          <p>
            A savings plan can combine annual and monthly contributions, with independent annual increase assumptions. Monthly contributions usually enter the modeled account earlier and more frequently than a single annual deposit. The calculator therefore keeps annual and monthly streams separate and combines them during the monthly simulation.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. How Growing Contributions Change the Result
          </h2>
          <p>
            The calculator can increase recurring contributions by a percentage each year. For example, an annual contribution of $5,000 with a 3% yearly increase follows a schedule beginning at $5,000, then $5,150, then $5,304.50. Higher contribution growth increases total principal contributed and, when held for longer periods, can also increase the interest earned on that larger balance.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. APY, Nominal Rate and Compounding Frequency
          </h2>
          <p>
            The calculator accepts an annual rate and a compounding frequency. It derives an effective annual yield using APY = (1 + r/n)^n − 1, then converts that effective annual yield to the monthly rate used by the simulation. APY is an annualized yield that reflects compounding; it should not be treated as interchangeable with a nominal rate. Bankrate and Forbes describe APY as incorporating the effect of compound interest. Compare nominal vs effective yields with our{" "}
            <Link href="/calculators/interest-rate-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Interest Rate Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. How Taxes Affect Interest Earned
          </h2>
          <p>
            The calculator can model a tax rate applied to interest. This is a simplified planning assumption rather than a calculation of your actual federal or state tax bill. IRS guidance says that most interest received or credited to an account that is available for withdrawal is taxable income, subject to exceptions.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Inflation and Purchasing Power
          </h2>
          <p>
            A future balance can be larger in nominal dollars while buying less than the same number of dollars today. The calculator estimates inflation-adjusted purchasing power by dividing the nominal future balance by (1 + inflation rate)^years. This is a scenario estimate, not a forecast of actual inflation. For deeper purchasing power modeling, explore our{" "}
            <Link href="/calculators/inflation-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Inflation Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Savings Goal Planning
          </h2>
          <p>
            The Goal Planner works backward from a target amount to estimate a required lump-sum deposit, monthly savings amount, or annual savings amount under the selected rate, horizon and tax assumptions. A goal result is only as realistic as the rate, timing, contribution and tax assumptions used. Integrate goal funding into your cash-flow structure using our{" "}
            <Link href="/calculators/budget-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Budget Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Emergency Savings and Short-Term Goals
          </h2>
          <p>
            An emergency fund is a cash reserve for unplanned expenses such as repairs, medical bills or loss of income. The CFPB emphasizes that the amount needed depends on the household&apos;s situation rather than one universal number. Bank and credit-union deposits are commonly used when safety and accessibility are priorities.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Savings Accounts, CDs and Deposit Insurance
          </h2>
          <p>
            Savings accounts and CDs are deposit products, while stocks, bonds, mutual funds and other investments are not bank deposits. FDIC insurance generally covers qualifying deposits at an FDIC-insured bank up to $250,000 per depositor, per insured bank, per ownership category. It does not cover investment products such as mutual funds or stocks. Compare fixed-term rates using our{" "}
            <Link href="/calculators/cd-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              CD Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Savings vs. Investing
          </h2>
          <p>
            Cash savings can be useful for goals where liquidity and principal stability matter. Investments can expose money to market volatility in exchange for the possibility of higher long-term returns. The appropriate choice depends on the goal, horizon, liquidity needs and risk tolerance; the savings calculator does not determine suitability. For market asset simulations, see our{" "}
            <Link href="/calculators/investment-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Investment Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Retirement and FIRE Planning
          </h2>
          <p>
            The Retirement Estimator extends the savings model to the years between current age and retirement age. The FIRE module uses a 25-times-annual-expenses heuristic with LeanFIRE at 75% of the standard target and FatFIRE at 150%. These are planning heuristics, not guarantees of retirement success or a guaranteed withdrawal amount. For full decumulation modeling, use our{" "}
            <Link href="/calculators/retirement-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Retirement Calculator
            </Link>{" "}
            and{" "}
            <Link href="/calculators/401k-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              401(k) Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. What Scenario and Monte Carlo Results Mean
          </h2>
          <p>
            Return scenarios and Monte Carlo results are sensitivity tools. A scenario changes an assumed return while keeping the other model inputs consistent. Monte Carlo simulation introduces random return variation around the modeled return and reports a distribution of outcomes. A probability result is not a promise that an actual portfolio will achieve that outcome.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Calculation Methodology and Disclaimer
          </h2>
          <p>
            The core engine uses a month-by-month simulation, preserves annual and monthly contribution streams, converts the entered annual rate to an effective annual yield based on compounding frequency, applies tax assumptions to modeled interest, and discounts the final balance for inflation when requested. The calculator is an educational planning tool. Actual savings rates, APYs, taxes, inflation, fees, account rules, investment returns and household circumstances can differ.
          </p>
        </section>
      </div>

      {/* 3. SECTION: FREQUENTLY ASKED QUESTIONS (20 FAQs, Open by Default) */}
      <section className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. METHODOLOGY & FINANCIAL DISCLAIMER CARDS */}
      <section className="space-y-4 pt-4">
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2 text-xs leading-relaxed text-slate-800 dark:text-slate-200">
          <div className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 text-xs uppercase tracking-wider">
            <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            Methodology
          </div>
          <p>
            Core engine: month-by-month cash-flow simulation. Annual contributions are deposited in Month 1 of each year; monthly contributions are deposited at the beginning of each month. The entered nominal annual rate and selected compounding frequency determine effective annual yield and the monthly rate used by the simulation. Tax is modeled as a simplified interest-tax assumption. Inflation-adjusted value is nominal future balance divided by (1 + inflation)^years. Goal planning uses the validated closed-form contribution solver. Retirement and Monte Carlo modules use the full annual/monthly contribution schedule.
          </p>
        </div>

        <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl space-y-2 text-xs leading-relaxed text-amber-900 dark:text-amber-200">
          <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 text-xs uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            Financial Disclaimer
          </div>
          <p>
            This calculator provides mathematical estimates from user-entered assumptions. Actual savings rates, APYs, taxes, fees, inflation, contribution timing, account rules, investment returns and household circumstances can differ. The tool is not a bank quote, investment recommendation, tax advice, or individualized financial advice. FDIC insurance applies only to qualifying deposits at FDIC-insured institutions and is subject to ownership-category rules and coverage limits.
          </p>
        </div>
      </section>
    </article>
  );
}

export default SavingsContent;

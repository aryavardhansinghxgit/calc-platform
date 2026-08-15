"use client";

import React, { useState } from "react";
import { ChevronDown, BookOpen, HelpCircle, Lightbulb, ShieldCheck, CheckCircle2 } from "lucide-react";

export function SavingsContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "What is a savings calculator and why should I use one?",
      a: "A savings calculator is an advanced financial planning tool designed to project the future growth of your money over time. By incorporating initial deposits, recurring monthly or annual contributions, compounding frequencies, tax rates, and inflation rates, it provides an accurate forecast of accumulated wealth and purchasing power.",
    },
    {
      q: "How does compound interest accelerate savings growth?",
      a: "Compound interest is interest earned on both your initial principal balance and the accumulated interest from prior periods. Unlike simple interest, compound interest creates an exponential growth curve—turning modest regular savings into significant long-term wealth.",
    },
    {
      q: "What is the difference between APR and APY?",
      a: "APR (Annual Percentage Rate) measures the simple yearly interest rate charged or earned without taking compound interest into account. APY (Annual Percentage Yield) reflects the true annual return rate by factoring in how frequently interest compounds (daily, monthly, quarterly, or annually).",
    },
    {
      q: "What is the Effective Annual Rate (EAR)?",
      a: "The Effective Annual Rate (EAR) is mathematically identical to APY for interest earned. It formulaically converts a nominal APR compounding over 'n' periods per year into its true annualized yield using EAR = (1 + r/n)^n - 1.",
    },
    {
      q: "How do monthly vs. annual contributions affect long-term growth?",
      a: "Making monthly contributions generates higher long-term returns than making a single annual contribution of the same total amount because monthly deposits enter the account earlier in the year and begin compounding immediately.",
    },
    {
      q: "Why should I increase my contributions by 3% to 5% each year?",
      a: "Implementing an annual contribution step-up strategy aligns your savings growth with wage increases and counteracts inflation. Even a modest 3% annual contribution increase can double your total accumulated savings balance over 20 to 30 years.",
    },
    {
      q: "How does tax impact interest earnings?",
      a: "Interest earned in standard bank savings accounts or CDs is taxed as ordinary income. Tax drag reduces your net interest yield each period, slowing down compound growth compared to tax-advantaged accounts like Roth IRAs or 401(k)s.",
    },
    {
      q: "How does inflation affect future savings purchasing power?",
      a: "Inflation erodes the purchasing power of money over time. Even if your nominal bank balance grows to $100,000, an average annual inflation rate of 2.5% means that $100,000 will buy significantly less in 20 years than it does today. Our calculator displays both nominal and real inflation-adjusted values.",
    },
    {
      q: "What is the Rule of 72?",
      a: "The Rule of 72 is a mental math shortcut used to estimate how many years it will take to double an investment at a fixed annual rate of return. Simply divide 72 by your interest rate (e.g., 72 / 6% = 12 years to double).",
    },
    {
      q: "How much money should I save in an emergency fund?",
      a: "Financial planners universally recommend maintaining 3 to 6 months of essential living expenses in a liquid High-Yield Savings Account (HYSA). This protects you against job loss, medical emergencies, or home repairs without forcing you to sell investments at a loss.",
    },
    {
      q: "What is a High-Yield Savings Account (HYSA)?",
      a: "A High-Yield Savings Account (HYSA) is an FDIC-insured deposit account offered primarily by online banks that pays significantly higher interest rates—often 10x to 20x higher—than traditional brick-and-mortar savings accounts.",
    },
    {
      q: "What is the 50/30/20 budget rule for savings?",
      a: "The 50/30/20 budgeting rule allocates 50% of net income to needs (housing, food, utilities), 30% to wants (dining, travel, hobbies), and at least 20% directly to savings, debt repayment, and investments.",
    },
    {
      q: "How does the FIRE Movement (Financial Independence, Retire Early) work?",
      a: "The FIRE movement focuses on aggressive saving rates (often 50%+ of income) to build a retirement corpus equal to 25 times annual living expenses. According to the 4% safe withdrawal rule, this balance allows you to retire decades early without running out of money.",
    },
    {
      q: "What is the difference between a savings account and investing?",
      a: "Savings accounts provide principal safety, FDIC insurance up to $250,000, and full liquidity, making them ideal for short-term goals and emergency funds. Investing in stocks, index funds, or real estate carries market risk but offers higher potential long-term returns to beat inflation.",
    },
    {
      q: "How can I calculate how much I need to save each month to hit a target goal?",
      a: "You can use the 'Goal Planner' mode in our calculator. Simply enter your desired target amount and years available, and the system automatically solves for the exact monthly contribution needed based on your compounding interest rate.",
    },
  ];

  return (
    <article className="prose dark:prose-invert max-w-none space-y-8 text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed mt-10 border-t border-zinc-200 dark:border-zinc-800 pt-8">
      <header>
        <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          Comprehensive Savings & Compound Wealth Guide
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs">
          Master compound interest, contribution growth strategies, tax drag, inflation defense, and retirement planning.
        </p>
      </header>

      {/* SECTION 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">What Is a Savings Calculator?</h2>
        <p>
          A <strong>savings calculator</strong> is a sophisticated financial planning tool designed to simulate the future growth of monetary reserves over time. Whether you are building an emergency cash fund, saving for a home down payment, planning a child&apos;s college education, or building a retirement nest egg, a savings calculator models how periodic cash contributions interact with compound interest rates.
        </p>
        <p>
          Unlike basic compound interest tools, our advanced savings engine incorporates growing contribution rates, variable compounding frequencies (daily, weekly, monthly, quarterly, semi-annually, annually), ordinary income tax drag, and inflation-adjusted purchasing power analysis.
        </p>
      </section>

      {/* SECTION 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">How Savings Grow Over Time</h2>
        <p>
          Savings growth is driven by three interconnected variables: <strong>Time ($t$)</strong>, <strong>Contributions ($PMT$)</strong>, and <strong>Rate of Return ($r$)</strong>. When funds are deposited into a compound interest-bearing account, growth follows an exponential curve rather than a linear line.
        </p>
        <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400">
          {"A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]"}
        </div>
        <p>
          In the early years of saving, total contributions account for the vast majority of your overall balance. However, as the balance accumulates, interest earned in previous periods begins generating its own interest, allowing compound earnings to eclipse total personal contributions.
        </p>
      </section>

      {/* SECTION 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Compound Interest Explained</h2>
        <p>
          Albert Einstein famously called compound interest the &quot;eighth wonder of the world.&quot; Compounding occurs when interest earned on a principal balance is reinvested, causing subsequent interest calculations to apply to a continually expanding baseline.
        </p>
        <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">The Power of Compounding Frequencies</h3>
        <p>
          The frequency with which interest is compounded determines how rapidly your balance grows:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Daily ($n=365$):</strong> Interest is calculated every single day, maximizing velocity.</li>
          <li><strong>Monthly ($n=12$):</strong> Standard compounding frequency for high-yield savings accounts and money market accounts.</li>
          <li><strong>Annually ($n=1$):</strong> Interest is added once per year, producing slightly lower annualized yield.</li>
        </ul>
      </section>

      {/* SECTION 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Simple Interest vs Compound Interest</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Feature</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Simple Interest</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Compound Interest</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-700 font-semibold">Base Calculation</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-700">Calculated strictly on initial principal $P$</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-700">Calculated on principal + accumulated interest</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-700 font-semibold">Growth Curve</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-700">Linear progression ($I = P \cdot r \cdot t$)</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-700">{"Exponential progression A = P(1+r/n)^(nt)"}</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-700 font-semibold">Long-Term Wealth</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-700">Significantly lower return over 10+ years</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-700">Multiplies wealth rapidly over extended horizons</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Importance of Regular Contributions</h2>
        <p>
          While an initial deposit establishes a baseline, making consistent recurring contributions (monthly or annual) is the single most controllable factor in wealth accumulation. Regular deposits Dollar-Cost Average (DCA) your savings efforts and smooth out market volatility when investing in yield-bearing assets.
        </p>
      </section>

      {/* SECTION 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Monthly vs Annual Contributions</h2>
        <p>
          Saving $500 every month produces a higher ending balance than depositing $6,000 at the end of the year. This is because monthly payments enter the account early, earning compounding returns throughout all 12 months of the calendar year.
        </p>
      </section>

      {/* SECTION 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Contribution Growth Strategy</h2>
        <p>
          As your career advances and your income grows, your monthly savings should increase proportionately. Increasing your recurring deposit by just 3% to 5% each year offsets cost-of-living increases and accelerates your path toward financial independence.
        </p>
      </section>

      {/* SECTION 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Tax Impact on Savings</h2>
        <p>
          In taxable savings accounts, interest earned is treated as ordinary taxable income. A 24% marginal tax rate drag reduces a nominal 5.0% interest yield down to an effective post-tax return of 3.8%. Utilizing tax-advantaged accounts like Roth IRAs, 401(k)s, or Health Savings Accounts (HSAs) shields your compounding interest from annual tax drag.
        </p>
      </section>

      {/* SECTION 9 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Inflation and Purchasing Power</h2>
        <p>
          Inflation represents the gradual decrease in purchasing power over time. If inflation averages 2.5% annually, a future nominal balance of $500,000 in 20 years will possess an inflation-adjusted purchasing power equivalent to roughly $305,000 in today&apos;s dollars.
        </p>
      </section>

      {/* SECTION 10 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">APY vs APR</h2>
        <p>
          The <strong>Annual Percentage Rate (APR)</strong> states the simple rate of interest, whereas the <strong>Annual Percentage Yield (APY)</strong> incorporates intra-year compounding. For example, a 5.00% APR compounding monthly yields an APY of 5.12%.
        </p>
      </section>

      {/* SECTION 11 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Effective Annual Rate (EAR)</h2>
        <p>
          The Effective Annual Rate (EAR) formula allows investors to accurately compare accounts with different compounding schedules:
        </p>
        <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-xl font-sans tabular-nums text-xs text-purple-600 dark:text-purple-400">
          {"EAR = (1 + r/n)^n - 1"}
        </div>
      </section>

      {/* SECTION 12 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Emergency Fund Planning</h2>
        <p>
          Financial advisors recommend holding 3 to 6 months of essential living expenses in a High-Yield Savings Account. An emergency fund provides a liquidity buffer against unexpected job changes, medical bills, or vehicle repairs.
        </p>
      </section>

      {/* SECTION 13 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Savings Goals</h2>
        <p>
          Categorize your savings goals into short-term (under 2 years), medium-term (2–5 years), and long-term (5+ years) horizons to match risk profiles with liquidity requirements.
        </p>
      </section>

      {/* SECTION 14 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Retirement Savings</h2>
        <p>
          Accumulating a retirement corpus requires long-term compounding. According to the 4% safe withdrawal rule, accumulating $1,000,000 yields an estimated $40,000 per year ($3,333/month) in inflation-adjusted retirement income.
        </p>
      </section>

      {/* SECTION 15 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">FIRE Movement and Savings</h2>
        <p>
          The <strong>FIRE (Financial Independence, Retire Early)</strong> movement emphasizes saving 50% or more of your annual income to achieve a net worth of 25 times your annual living expenses, enabling retirement decades before traditional age 65.
        </p>
      </section>

      {/* SECTION 16 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Best Savings Strategies</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Automate Savings:</strong> Set up auto-transfers on payday before discretionary spending occurs (&quot;Pay Yourself First&quot;).</li>
          <li><strong>High-Yield Savings:</strong> Move cash out of traditional 0.01% accounts into 4.0%+ HYSA accounts.</li>
          <li><strong>Step-Up Escalation:</strong> Direct annual raises and bonuses directly into savings contributions.</li>
        </ul>
      </section>

      {/* SECTION 17 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Common Savings Mistakes</h2>
        <p>
          Avoid leaving excess cash in low-yielding checking accounts, failing to adjust savings for inflation, ignoring tax drag, or stopping contributions during temporary economic downturns.
        </p>
      </section>

      {/* SECTION 18 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">How Much Should You Save Each Month?</h2>
        <p>
          Following the 50/30/20 budgeting framework, allocate at least 20% of your take-home income toward savings, investments, and principal debt reduction.
        </p>
      </section>

      {/* SECTION 19 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Rule of 72</h2>
        <p>
          Divide 72 by your annual interest rate to determine the doubling period:
        </p>
        <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-xl font-sans tabular-nums text-xs text-emerald-600 dark:text-emerald-400">
          {"Years to Double = 72 / Interest Rate (%)"}
        </div>
      </section>

      {/* SECTION 20 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">High Yield Savings Accounts</h2>
        <p>
          High-Yield Savings Accounts (HYSAs) offer FDIC insurance protection up to $250,000 per depositor while delivering competitive variable APYs that keep pace with Federal Reserve benchmark interest rates.
        </p>
      </section>

      {/* SECTION 21 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Savings Account vs Investments</h2>
        <p>
          Use savings accounts for capital preservation, emergency funds, and goals under 3 years. Use diversified investments (stocks, bonds, index funds) for goals exceeding 5 years to achieve higher growth rates.
        </p>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-600" /> Frequently Asked Questions (FAQs)
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-3.5 text-left text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-zinc-400 transition-transform ${openFaq === idx ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === idx && (
                <div className="p-3.5 pt-0 text-xs text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800/60 leading-normal">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

export default SavingsContent;

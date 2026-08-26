"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, ShieldCheck, Zap, AlertTriangle, CheckCircle2, DollarSign, Calculator, PieChart, Layers, ArrowRight, Award, HelpCircle, Info } from "lucide-react";

export function RoiContent() {
  const faqs = [
    {
      q: "What is ROI?",
      a: "Return on Investment (ROI) measures the gain or loss on an investment relative to the amount originally invested. The basic formula is (Amount Returned − Amount Invested) ÷ Amount Invested × 100. A $1,000 investment that becomes $2,000 therefore produces a 100% ROI.",
    },
    {
      q: "How do I calculate annualized ROI?",
      a: "Annualized ROI converts a total beginning-to-ending return into a geometric annual growth rate. The calculator uses [(Amount Returned ÷ Amount Invested)^(1/Years) − 1] × 100. This makes returns earned over different holding periods easier to compare.",
    },
    {
      q: "What is the difference between ROI and CAGR?",
      a: "Simple ROI measures the total percentage gain or loss without normalizing for time. CAGR, or compound annual growth rate, expresses the equivalent annual compounded growth rate over a specified period. For one beginning value and one ending value, the calculator's annualized ROI follows the same geometric concept as CAGR.",
    },
    {
      q: "What is the difference between ROI and IRR?",
      a: "ROI compares an initial investment with an ending result. IRR is designed for situations with multiple cash inflows and outflows whose timing affects the return. When contributions or withdrawals occur on different dates, IRR or XIRR may be more appropriate than a simple beginning-to-ending ROI.",
    },
    {
      q: "Can ROI be negative?",
      a: "Yes. When the amount returned is less than the amount invested, ROI is negative. For example, investing $50,000 and receiving $30,000 produces a $20,000 loss and a total ROI of -40%.",
    },
    {
      q: "How do I calculate ROI using start and end dates?",
      a: "Use the calculator's Date mode to enter the investment start and end dates. The calculator derives the holding period and then annualizes the return using that time interval. This avoids manually estimating the number of years.",
    },
    {
      q: "What is real ROI?",
      a: "Real ROI adjusts investment performance for inflation so that the result is expressed in purchasing-power terms. The calculator uses the selected inflation assumption to estimate real annualized return and inflation-adjusted value rather than treating nominal dollars as having constant purchasing power.",
    },
    {
      q: "How does capital-gains tax affect ROI?",
      a: "The calculator models a user-entered capital-gains tax rate against the modeled investment gain. In the $1,000-to-$2,000 example, a 15% assumption applied to the $1,000 gain produces $150 of modeled tax and a $1,850 post-tax final value. Actual tax liability depends on tax law and individual circumstances.",
    },
    {
      q: "What is a good ROI for a stock-market investment?",
      a: "There is no single ROI that is universally 'good.' Expected return depends on the asset, time period, risk, diversification, fees, and market conditions. Investor.gov notes that historical long-term stock-market estimates can be useful reference points but also emphasizes that investments involve risk and that past performance does not guarantee future results.",
    },
    {
      q: "What is a good ROI for real estate?",
      a: "There is no universal target ROI for every property. Real-estate return can combine appreciation, rental income, operating expenses, financing costs, taxes, maintenance, transaction costs, and the holding period. A property with a high gross return can have a much lower net return after those costs.",
    },
    {
      q: "How does the Target ROI Goal feature work?",
      a: "Goal Seeker calculates the final amount required to achieve a specified ROI on the entered initial investment. For example, a $1,000 investment with a 100% ROI target requires a final value of $2,000.",
    },
    {
      q: "What is Scenario Comparison mode?",
      a: "Scenario Comparison lets you enter two investment outcomes and compare their total ROI and annualized ROI side by side. This is particularly useful when the investments have different returns, capital amounts, or holding periods.",
    },
    {
      q: "What is the Wealth Multiplier?",
      a: "The Wealth Multiplier is the final value divided by the original investment. A 2.0x multiplier means $1,000 became $2,000. A 1.5x multiplier means $1,000 became $1,500.",
    },
    {
      q: "Does ROI include dividends or rental income?",
      a: "It can, provided those amounts are included in the calculator's Amount Returned according to the scenario being modeled. For a complete investment-return analysis, distributions and proceeds that belong to the investment should be included consistently rather than counting only the change in market price.",
    },
    {
      q: "How do I calculate ROI on a business investment?",
      a: "At a basic level, subtract the investment's total cost from the amount ultimately returned, then divide the gain by the investment amount. A more complete business ROI should also consider operating costs, additional capital contributions, taxes, distributions, and the timing of cash flows.",
    },
    {
      q: "What is the What-If Sensitivity Matrix?",
      a: "The What-If Matrix shows how a fixed starting investment could grow under different assumed annual return rates and holding periods. It is a scenario-analysis tool, not a forecast. Higher assumed returns and longer holding periods create larger modeled values through compound growth.",
    },
    {
      q: "Is this ROI Calculator free?",
      a: "The calculator is designed as a free calculation and planning tool. The current interface also provides scenario analysis, schedule views, and export functions.",
    },
    {
      q: "Can I export my ROI analysis?",
      a: "Yes. The current calculator provides CSV and Excel schedule exports and a Print/PDF option. The exported schedule should contain the same calculated values displayed in the calculator.",
    },
    {
      q: "What is the difference between gross ROI and net ROI?",
      a: "Gross ROI describes the return before certain costs, fees, taxes, or expenses are deducted. Net ROI attempts to measure what remains after the applicable costs have been incorporated. For meaningful comparisons, the assumptions should be consistent across both investments.",
    },
    {
      q: "How does the holding period affect ROI?",
      a: "Holding period does not change the basic point-to-point ROI percentage, but it strongly affects annualized ROI. The same 100% total ROI represents a much stronger annualized return when earned quickly than when earned over many years.",
    },
  ];

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-xs leading-relaxed">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
          ROI Calculator — Return on Investment &amp; Profitability Planner
        </h1>
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">
          Measure Investment Return, Annualized Growth and Real Profitability
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          Return on investment, or ROI, is one of the simplest ways to describe how much an investment gained or lost relative to the amount originally committed. That simplicity is useful, but it can also become misleading when ROI is used without considering the length of time, taxes, inflation, transaction costs, or the timing of cash flows. A 100% return earned in one year is economically very different from a 100% return earned over ten years. Likewise, a nominal 12% return does not represent the same increase in purchasing power when inflation is 2% compared with 8%. This ROI Calculator is designed to make those distinctions visible rather than reducing every investment to one headline percentage.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          At its most basic level, ROI compares the amount invested with the amount ultimately returned. The calculator defines net gain as the difference between the final amount returned and the original investment, while total ROI expresses that gain as a percentage of the original capital. For example, investing $1,000 and receiving $2,000 produces a $1,000 gain and a total ROI of 100%. The wealth multiplier in that case is 2.0x because the final value is twice the initial amount. This is the core calculation shown in the reference document and is the foundation for the other modules.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          The difficulty begins when time is introduced. A 100% total ROI does not tell you how efficiently the capital grew. The calculator therefore also converts a point-to-point return into an annualized rate when a holding period is supplied. The reference example uses $1,000 growing to $2,000 over 4.395 years, producing a total ROI of 100% but an annualized return of approximately 17.08%. That distinction is essential for comparing investments with different holding periods. The SEC similarly describes an annual rate of return as the percentage change in an investment&apos;s value over a one-year period, and investment performance needs to be understood in terms of how it is calculated and presented.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          The calculator goes further by estimating real annualized return after inflation and a modeled post-tax value. In the reference scenario, a 15% capital-gains assumption and 4% inflation transform the nominal result into a lower after-tax and inflation-adjusted picture. That does not mean taxes or inflation always affect every investment in exactly the same way; it means the calculator lets the user see the consequences of the assumptions entered.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          The investment itself can also matter less than the measurement method. A stock investment may generate appreciation and dividends. A rental property may generate rent and eventually a sale proceeds. A business investment may produce cash distributions. A project may involve several investments and withdrawals at different dates. Simple ROI is useful for a beginning-and-ending comparison, but it is not automatically the right metric for every cash-flow pattern. The reference guide explicitly distinguishes simple ROI from CAGR/annualized return and IRR/XIRR, with the latter being more appropriate when multiple cash flows occur at different times.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          That is the central idea behind this calculator: a return percentage is only meaningful when the period, cash-flow structure, costs, taxes, and purchasing-power assumptions are understood.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          For a financing-related investment decision, the result can be considered alongside the <Link href="/calculators/loan-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Loan Calculator</Link> or <Link href="/calculators/apr-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">APR Calculator</Link> to compare the return opportunity with the cost of borrowed capital. For property investments, the <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Mortgage Calculator</Link>, <Link href="/calculators/home-equity-loan-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Home Equity Loan Calculator</Link> and <Link href="/calculators/heloc-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">HELOC Calculator</Link> can model the financing side separately.
        </p>
      </section>

      {/* 2. HOW TO CALCULATE ROI AND ANNUALIZED ROI CORRECTLY */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          How to Calculate ROI and Annualized ROI Correctly
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          The basic ROI calculation begins with two values: the amount invested and the amount returned. The calculator&apos;s reference formula is:
        </p>
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl text-center font-sans font-bold text-blue-600 dark:text-blue-400 text-sm">
          ROI = [(Amount Returned − Amount Invested) ÷ Amount Invested] × 100
        </div>
        <p className="text-slate-900 dark:text-slate-100">
          The amount returned minus the amount invested is the net gain or loss. If the result is positive, the investment gained value; if it is negative, the investment lost value.
        </p>
        <div className="bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-4 rounded-xl space-y-1.5 font-sans">
          <div className="font-bold text-blue-900 dark:text-blue-200 text-xs">Worked Calculation (Basic):</div>
          <div>Net Gain = $6,250 − $5,000 = $1,250</div>
          <div>ROI = $1,250 ÷ $5,000 × 100 = 25%</div>
        </div>
        <p className="text-slate-900 dark:text-slate-100">
          A 25% ROI therefore means that the gain was equal to 25% of the original investment. It does not automatically mean a 25% annual return. Without knowing the holding period, the timing of the return remains incomplete.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          This becomes obvious with a 100% ROI. Turning $1,000 into $2,000 produces 100% total ROI, but the economic meaning changes dramatically depending on whether it occurred in one year, five years, or twenty years. The calculator therefore annualizes the return using a geometric formula:
        </p>
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl text-center font-sans font-bold text-blue-600 dark:text-blue-400 text-sm">
          Annualized ROI = [(Amount Returned ÷ Amount Invested)^(1 ÷ Years) − 1] × 100
        </div>
        <p className="text-slate-900 dark:text-slate-100">
          For the reference example: $2,000 ÷ $1,000 = 2, and with a 4.395-year holding period: 2^(1/4.395) − 1 ≈ 17.08%.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          This is essentially a CAGR-style calculation because it converts the beginning and ending values into a constant annual growth rate that would produce the same final amount over the stated period. Investor.gov defines compound annual growth rate as a measure of annualized growth over a specified period, while the SEC uses compounded annual return concepts in investment-performance disclosures.
        </p>

        {/* COMPARISON TABLE: ROI vs CAGR vs IRR */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-[11px]">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold">Metric</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-blue-600 dark:text-blue-400">Simple ROI</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-blue-600 dark:text-blue-400">Annualized ROI / CAGR</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-blue-600 dark:text-blue-400">IRR / XIRR</th>
              </tr>
            </thead>
            <tbody className="text-slate-900 dark:text-slate-100">
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Time Horizon Included?</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">NO (Point-to-Point Total %)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">YES (Normalized per Year)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">YES (Exact Cash Flow Dates)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Cash Flow Complexity</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Single Initial &amp; Final Value</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Single Initial &amp; Final Value</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Multiple Inflows &amp; Outflows</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Compounding Effect</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Ignores Compounding</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Geometric Annual Compounding</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Time-Weighted Cash Yield</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Primary Use Case</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Quick Short-Term Performance</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Long-Term Multi-Year Assets</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">SIPs, PE &amp; Complex Projects</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-slate-900 dark:text-slate-100">
          The difference between simple ROI and annualized ROI is therefore not cosmetic. Suppose two investments each produce 100% total ROI. Investment A takes one year; Investment B takes five years. Their total ROIs are identical, but the annualized rates are not. The one-year result corresponds to 100% annual growth, whereas the five-year result is only about 14.87% annualized. The time dimension changes the interpretation completely.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          The calculator&apos;s date mode makes this more useful by allowing an exact beginning and ending date rather than forcing the user to estimate the holding period manually. A partial holding period such as 4.395 years can therefore be incorporated into the annualization calculation instead of rounding it to four or five years.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          For investment accumulation involving repeated contributions, a dedicated <Link href="/calculators/compound-interest-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Compound Interest Calculator</Link> or <Link href="/calculators/future-value-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Future Value Calculator</Link> can complement this tool because those tools are designed around growth mechanics rather than measuring the performance of one initial investment.
        </p>
      </section>

      {/* 3. REAL ROI, INFLATION AND POST-TAX INVESTMENT VALUE */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          Real ROI, Inflation and Post-Tax Investment Value
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          A nominal ROI can look impressive while providing a much smaller increase in real purchasing power. The reason is that investment returns are measured in money, while investors ultimately use money to purchase goods and services. Inflation changes what a given dollar can buy over time. The SEC and Investor.gov both emphasize that investments carry market risk and that historical or assumed returns should not be interpreted as guarantees of future performance.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          The calculator therefore includes an inflation-adjusted layer. In the reference scenario, $1,000 grows to $2,000 over 4.395 years. The nominal result is a 100% total ROI and approximately 17.08% annualized ROI. But the calculator also applies a 4% inflation assumption and reports a lower real annualized return of approximately 12.58%.
        </p>
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl text-center font-sans font-bold text-blue-600 dark:text-blue-400 text-sm">
          Real Return = [(1 + Nominal Return) ÷ (1 + Inflation)] − 1
        </div>
        <p className="text-slate-900 dark:text-slate-100">
          This calculation is useful because simply subtracting inflation from a nominal return is only an approximation. The exact relationship between purchasing-power growth and nominal growth is multiplicative. If an investment earns 10% and inflation is 4%, the exact real return is slightly below 6%, not exactly 6%, because the investment&apos;s nominal growth and the price level compound relative to each other.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          The calculator also models a post-tax value. In its reference case, the investment grows from $1,000 to $2,000, producing a $1,000 gain. With a 15% tax assumption applied to that modeled gain, the estimated tax is $150 and the post-tax final value becomes $1,850. This is an illustrative tax model, not a statement that every investment gain is taxed at 15%. Actual taxation depends on the investment, holding period, taxpayer circumstances, jurisdiction, account type, basis, and applicable tax rules.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          The IRS explains that a capital gain or loss generally arises from the difference between an asset&apos;s amount realized and its adjusted basis, and that tax treatment depends on the nature of the transaction and the taxpayer&apos;s circumstances. A generic ROI calculator therefore cannot determine an individual&apos;s actual tax liability solely from the final investment amount. The calculator&apos;s tax field should instead be understood as a user-selected modeling assumption.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          Fees are another part of this story. Investment fees reduce the amount of capital that remains invested and therefore reduce the amount available to compound. The SEC&apos;s 2025 Investor Bulletin specifically warns that even apparently small investment fees and expenses can have a substantial long-term effect because they reduce the amount of money remaining in the portfolio to earn returns.
        </p>
      </section>

      {/* 4. TARGET ROI GOAL SEEKER AND SCENARIO COMPARISON */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          Target ROI Goal Seeker and Investment Scenario Comparison
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          The Target ROI Goal feature reverses the normal ROI calculation. Instead of asking, &quot;What return did I achieve?&quot;, it asks, &quot;What final amount would I need to achieve the ROI percentage I want?&quot;
        </p>
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl text-center font-sans font-bold text-blue-600 dark:text-blue-400 text-sm">
          Target Final Value = Initial Investment × (1 + Target ROI / 100)
        </div>
        <p className="text-slate-900 dark:text-slate-100">
          Suppose the initial investment is $1,000 and the target ROI is 100%. The required final value is $1,000 × 2 = $2,000. Entering $2,000 back into the Standard ROI calculation produces exactly 100% ROI. That creates a useful cross-module validation: Goal Seeker and Standard ROI are algebraic inverses of one another under the same assumptions.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          The Scenario A vs. B module extends the same logic into side-by-side analysis. In the current production example, Scenario A invests $1,000 and returns $2,000, producing 100% total ROI and approximately 17.08% annualized ROI over the selected holding period. Scenario B returns $2,800 on the same $1,000 investment, producing 180% total ROI and approximately 26.4% annualized ROI. The important point is that the comparison includes both total and annualized performance rather than relying on one number.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          Scenario comparison should also avoid confusing dollar profit with percentage return. Turning $1,000 into $2,000 creates $1,000 of profit. Turning $100,000 into $150,000 creates $50,000 of profit. The second investment produces a much larger dollar gain but a smaller percentage ROI. Both measures can be important depending on whether the question concerns capital efficiency or absolute wealth creation.
        </p>
      </section>

      {/* 5. ASSET BENCHMARKS AND WHAT-IF MATRIX */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          Asset Benchmarks and the Limits of Comparing Investments by One Percentage
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          The Asset Benchmarks section is designed to give users a reference framework for interpreting an investment return. The current calculator displays benchmark scenarios for assets such as the S&amp;P 500, Nasdaq 100, gold, residential real estate, and a high-yield fixed deposit. These figures are useful only when their measurement period and methodology are understood. A benchmark&apos;s percentage cannot meaningfully be compared with a personal investment return if the two figures represent different periods, different definitions of income, or different treatment of dividends, fees, and taxes.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          The What-If Sensitivity Matrix provides a cleaner mathematical comparison because it holds the initial investment constant and changes the annual return assumption across multiple time horizons. The current matrix includes annual returns from 5% through 100% and periods from one year through ten years. Its purpose is not to predict that an investment will earn 50% or 100%; it demonstrates how different assumed rates compound over time.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          For example, under a compound-growth model, $1,000 at 5% becomes $1,050 after one year and approximately $1,628.89 after ten years. At 10% annual growth, the ten-year value is approximately $2,593.74. At 100% annual growth, the mathematical result becomes $1,024,000 after ten years. The huge difference is not evidence that a 100% annual return is realistic; it illustrates how powerful the exponent in compound growth becomes as the time horizon increases.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          A similar caution applies to the calculator&apos;s ROI Health Rating. A label such as &quot;Outperforming&quot; is useful only as a relative visualization under the calculator&apos;s selected assumptions and benchmark framework. It should never be interpreted as an investment recommendation.
        </p>
      </section>

      {/* 6. GROWTH TRAJECTORY AND INVESTMENT SCHEDULE */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          Growth Trajectory, Real Purchasing Power and the Investment Schedule
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          A single final ROI percentage can hide the path taken to reach the final value. The Growth Trajectory section addresses that problem by displaying the investment year by year, showing starting capital, annual growth, nominal ending value, real purchasing power, and cumulative ROI. This schedule turns a single endpoint calculation into a chronological story of how the investment value changes.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          For the reference scenario, the initial investment is $1,000 and the final value is $2,000 over 4.395 years. The table begins with the initial capital and tracks the modeled growth through the available annual periods, with the final row reaching the $2,000 ending value and 100% cumulative ROI.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          A good schedule must obey several internal identities. The ending value of one period becomes the starting capital for the next period. Growth reconciles to the change in capital, and cumulative ROI is calculated from the original investment rather than from the immediately preceding year&apos;s balance.
        </p>
      </section>

      {/* 7. TOP 10 ROI MISTAKES TO AVOID */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          ROI Mistakes: Why a High Percentage Does Not Automatically Mean a Better Investment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-900 dark:text-slate-100">
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">1. Omitting Holding Period Duration</span>
            <p className="text-[11px]">A 50% return over six months and a 50% return over ten years are not equivalent investment performances.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">2. Ignoring Transaction &amp; Holding Costs</span>
            <p className="text-[11px]">Failing to factor in maintenance, property taxes, legal fees, commissions, or interest drag overestimates net return.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">3. Confusing Gross and Net Return</span>
            <p className="text-[11px]">If an investment produces $2,000 from $1,000 but incurs $100 of costs, the net gain is $900, not $1,000.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">4. Treating Capital Gains Tax as Universal</span>
            <p className="text-[11px]">Actual taxation depends on adjusted basis, holding period, entity structure, and jurisdiction.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">5. Subtracting Inflation Directly</span>
            <p className="text-[11px]">A 12% nominal return and 4% inflation do not produce exactly 8% real return; purchasing power is multiplicative.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">6. Using Simple ROI for Recurring Cash Flows</span>
            <p className="text-[11px]">For multi-date SIP deposits or capital calls, money-weighted IRR/XIRR must be used instead of simple ROI.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">7. Assuming Benchmarks Guarantee Returns</span>
            <p className="text-[11px]">Historical market performance is an observational reference and does not guarantee future results.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">8. Comparing Investments Solely by Total ROI</span>
            <p className="text-[11px]">Risk, volatility, liquidity, lockup periods, and tax treatment fundamentally alter return quality.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">9. Confusing Wealth with Efficiency</span>
            <p className="text-[11px]">$100,000 returning 20% creates $20,000; $1,000 returning 100% creates $1,000. Do not confuse percentage with absolute wealth.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">10. Treating Health Rating as a Recommendation</span>
            <p className="text-[11px]">The ROI Health Rating is an illustrative relative indicator, not personalized financial advice.</p>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5 shadow-xs space-y-2"
            >
              <h3 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums font-bold shrink-0">
                  Q{idx + 1}.
                </span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. YMYL, REGULATORY DISCLOSURE & RESEARCH BASIS */}
      <section className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400 space-y-3">
        <div className="font-bold flex items-center gap-2 text-zinc-800 dark:text-zinc-200 text-xs">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>Important Investment Interpretation &amp; Research Basis</span>
        </div>
        <p>
          <strong>Measurement vs. Prediction:</strong> ROI is a measurement, not a prediction. A calculated historical or hypothetical return does not guarantee that the same return will occur in the future. Investment performance can be affected by market volatility, fees, taxes, inflation, liquidity, leverage, timing, and changes in the underlying asset. Investor.gov specifically advises investors to understand how performance information is calculated and warns that past performance does not necessarily predict future results.
        </p>
        <p>
          <strong>Research Basis:</strong> The mathematical structure follows standard financial compounding principles ($FV = PV \times (1+r)^t$), Fisher real-return formulation ($[(1+r)/(1+i)] - 1$), and IRS capital-gains principles where tax is modeled exclusively on taxable profit ($Amount Returned - Amount Invested$).
        </p>
      </section>
    </article>
  );
}
export default RoiContent;

"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Calculator,
  Percent,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  Clock,
  Layers,
  ArrowUpRight,
  Scale,
  RefreshCw,
  Flame,
  ShieldAlert,
} from "lucide-react";

export function SipContent() {
  const faqList = [
    {
      question: "What is a Systematic Investment Plan (SIP)?",
      answer:
        "A Systematic Investment Plan (SIP) is a recurring-investment approach in which a fixed amount is contributed at regular periodic intervals (typically monthly). This calculator models the mathematical compound growth of those recurring contributions under a selected return assumption.",
    },
    {
      question: "What is the difference between a SIP and a recurring monthly investment?",
      answer:
        "For the recurring-contribution model used by this calculator, the underlying compounding mathematics is identical. 'SIP' is standard terminology internationally (particularly in India and the UK), while US financial institutions and investors typically use 'recurring investment,' 'monthly contribution,' or 'automated dollar-cost averaging.' Actual commercial investment products can differ in fees, taxes, custody, and transaction mechanics.",
    },
    {
      question: "How does the SIP return calculator work mathematically?",
      answer:
        "The calculator evaluates the compounding formula for an Annuity Due: M = P × [((1+i)^n - 1) / i] × (1+i), where P is the monthly contribution, i is the monthly periodic return rate (Annual Return / 12 / 100), and n is the total number of monthly compounding periods.",
    },
    {
      question: "Why does the calculator use beginning-of-period (Annuity Due) timing?",
      answer:
        "In automated recurring investment schedules, contributions are credited at the beginning of each monthly cycle, allowing that month's deposit to earn a full month of compound returns during the period.",
    },
    {
      question: "What is a Step-Up (Top-Up) SIP and how does it work?",
      answer:
        "A Step-Up SIP increases your monthly contribution by a specified percentage (e.g., 10%) or fixed dollar amount once per year, aligning investment growth with career earnings and salary raises.",
    },
    {
      question: "How does inflation affect projected investment wealth?",
      answer:
        "Inflation reduces the future purchasing power of money. The calculator computes real purchasing power using exponential discounting: Real Value = Nominal Value / (1 + Inflation Rate)^Years.",
    },
    {
      question: "How is capital gains tax modeled in this calculator?",
      answer:
        "The calculator applies a simplified percentage deduction against estimated capital gains (excluding original principal contributions). It serves as an illustrative model rather than an official multi-bracket tax filing engine.",
    },
    {
      question: "Are investment returns in a SIP guaranteed?",
      answer:
        "No. Market investments are subject to price volatility and capital risk. The return rate entered into the calculator is a hypothetical modeling assumption, not a guaranteed return forecast.",
    },
    {
      question: "How does recurring monthly investing compare to lump-sum investing?",
      answer:
        "Lump-sum investing deploys all capital upfront, gaining maximum compounding duration if markets rise immediately. Recurring monthly investing spreads capital deployment across time, mitigating point-in-time market peak risk.",
    },
    {
      question: "How does the Goal Seeker feature calculate required monthly savings?",
      answer:
        "Goal Seeker inverts the compounding annuity-due formula to solve for the monthly contribution needed to reach a target financial goal under your chosen time horizon and return assumptions.",
    },
  ];

  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200">
      {/* 1. What Is a SIP / Recurring Monthly Investment? */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <TrendingUp className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            1. What Is a Systematic Investment Plan (SIP) / Recurring Investment?
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          A <strong className="text-slate-900 dark:text-slate-100">Systematic Investment Plan (SIP)</strong> is a recurring-investment approach in which a fixed amount of capital is contributed at regular periodic intervals (typically monthly). This calculator models the mathematical compound growth of those recurring contributions under a selected return assumption.
        </p>

        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs leading-relaxed text-blue-950 dark:text-blue-200 space-y-1">
          <strong className="block font-semibold">US & International Terminology Context:</strong>
          <span>
            "Systematic Investment Plan (SIP)" is widely used terminology across international markets including India and the United Kingdom. In the United States, similar automated wealth accumulation is commonly referred to as <strong className="text-blue-700 dark:text-blue-300">recurring investing</strong>, <strong className="text-blue-700 dark:text-blue-300">monthly contributions</strong>, or <strong className="text-blue-700 dark:text-blue-300">automated dollar-cost averaging</strong>. The calculator models the mathematical accumulation process rather than any single legal or custodial product. For general multi-asset portfolio projections, explore our{" "}
            <Link
              href="/calculators/investment-calculator"
              className="font-bold underline text-blue-700 dark:text-blue-300 hover:text-blue-800"
            >
              general portfolio growth models
            </Link>.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Periodic Compounding
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Contributions made in earlier periods experience compounding returns over longer time horizons, generating non-linear wealth accumulation over 10, 20, or 30 years.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Scale className="h-4 w-4" /> Dollar-Cost Averaging Concept
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Allocating a fixed dollar amount across fluctuating market cycles purchases more asset units when prices are lower and fewer when prices are higher, mitigating single point-in-time entry risk.
            </p>
          </div>
        </div>
      </section>

      {/* 2. The Mathematical SIP Future Value Formula */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Calculator className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            2. The Mathematical SIP Future Value Formula (Annuity Due)
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Because automated recurring contributions are credited at the beginning of each monthly period, the calculator models accumulation using the compounding formula for the <strong className="text-slate-900 dark:text-slate-100">Future Value of an Annuity Due</strong>:
        </p>

        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white font-mono text-center text-lg sm:text-xl font-bold tracking-wider shadow-md overflow-x-auto">
          {"M = P × [ ((1 + i)ⁿ − 1) / i ] × (1 + i)"}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400 font-mono text-sm block">M</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Total Maturity Value</span>
            <span className="text-slate-500 text-[11px] block">Projected nominal accumulated wealth</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-sm block">P</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Monthly Contribution</span>
            <span className="text-slate-500 text-[11px] block">Fixed periodic cash deposited</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-amber-600 dark:text-amber-400 font-mono text-sm block">i</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Periodic Monthly Rate</span>
            <span className="text-slate-500 text-[11px] block">Annual Return Assumption ÷ 12 ÷ 100</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-purple-600 dark:text-purple-400 font-mono text-sm block">n</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Total Compounding Months</span>
            <span className="text-slate-500 text-[11px] block">Investment Tenure (Years) × 12</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
          <span className="font-bold text-slate-900 dark:text-slate-100 block">
            Zero-Return Limit (r = 0.0%):
          </span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            When the expected return assumption is set to 0.0%, the compounding formula simplifies to a linear sum:
          </p>
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 font-mono font-bold text-blue-600 dark:text-blue-400 text-center">
            {"lim_{i → 0} M = P × n"}
          </div>
          <p className="text-slate-500 text-[11px]">
            Under zero returns, total maturity value equals exactly total cash deposits ($P × n$) with $0.00 in estimated gains. For evaluating single lump-sum compound interest frequencies, explore our{" "}
            <Link
              href="/calculators/compound-interest-calculator"
              className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
            >
              compound interest calculator
            </Link>.
          </p>
        </div>
      </section>

      {/* 3. Step-by-Step Worked Mathematical Calculation */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Layers className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            3. Step-by-Step Worked Mathematical Calculation
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          To illustrate how annuity-due monthly compounding operates, let us evaluate the mathematical model under a hypothetical scenario:
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
          <span className="font-bold text-slate-900 dark:text-slate-100 block">Hypothetical Modeling Parameters:</span>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
            <li><strong>Monthly Contribution (P):</strong> $500.00</li>
            <li><strong>Expected Annual Return Assumption:</strong> 12.00%</li>
            <li><strong>Investment Horizon:</strong> 10 Years (n = 120 months)</li>
            <li><strong>Inflation Rate Assumption:</strong> 4.00%</li>
            <li><strong>Simplified Tax on Gains Assumption:</strong> 10.00%</li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-bold block">Step 1: Compute Periodic Monthly Rate (i)</strong>
            <span className="font-mono text-slate-700 dark:text-slate-300 block">i = 12.00 / 12 / 100 = 0.01 (1.0% per month)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-bold block">Step 2: Compute Compounding Factor (1 + i)ⁿ</strong>
            <span className="font-mono text-slate-700 dark:text-slate-300 block">(1 + 0.01)¹²⁰ = (1.01)¹²⁰ ≈ 3.30038689</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-bold block">Step 3: Solve Annuity-Due Nominal Maturity (M)</strong>
            <span className="font-mono text-slate-700 dark:text-slate-300 block">
              M = 500 × [ (3.30038689 − 1) / 0.01 ] × 1.01 = 500 × 230.038689 × 1.01 = <strong>$116,169.54</strong>
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-bold block">Step 4: Invested Principal & Estimated Returns</strong>
            <span className="font-mono text-slate-700 dark:text-slate-300 block">
              Total Invested Principal = $500 × 120 = <strong>$60,000.00</strong>
            </span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
              Estimated Wealth Returns = $116,169.54 − $60,000.00 = <strong>$56,169.54</strong> (Wealth Multiplier: 1.94x)
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-bold block">Step 5: Inflation & Tax Adjustments</strong>
            <span className="font-mono text-slate-700 dark:text-slate-300 block">
              Real Purchasing Power = $116,169.54 / (1 + 0.04)¹⁰ = <strong>$78,479.98</strong>
            </span>
            <span className="font-mono text-slate-700 dark:text-slate-300 block">
              Estimated Tax Drag = $56,169.54 × 10% = <strong>$5,616.95</strong> | Post-Tax Maturity = <strong>$110,552.59</strong>
            </span>
          </div>
        </div>
      </section>

      {/* 4. Step-Up (Top-Up) Contributions */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Flame className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            4. Step-Up (Top-Up) Contributions: Wage-Indexed Compounding
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          A <strong className="text-slate-900 dark:text-slate-100">Step-Up SIP</strong> models increasing your monthly contribution by an annual percentage (e.g., +10%/year) to match annual salary raises.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold">
              <tr>
                <th className="p-3">Strategy ($500/mo Base, 10Y Horizon, 12% Return)</th>
                <th className="p-3">Total Invested</th>
                <th className="p-3">Projected Returns</th>
                <th className="p-3">Total Maturity Value</th>
                <th className="p-3">Decomposition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Flat Contribution ($500/mo)</td>
                <td className="p-3 font-mono">$60,000.00</td>
                <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">$56,169.54</td>
                <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">$116,169.54</td>
                <td className="p-3 text-slate-500">Baseline</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">10% Annual Step-Up</td>
                <td className="p-3 font-mono font-bold">$95,624.55</td>
                <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">$73,091.77</td>
                <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">$168,716.31</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                  +$35,624.55 deposits + $16,922.23 returns (+$52,546.77 total)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500">
          Under identical return assumptions, increasing periodic contributions expands final projected maturity value because more total capital is deployed into compounding periods.
        </p>
      </section>

      {/* 5. Systematic Investing (SIP) vs. Lump-Sum Deployment */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Scale className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            5. Systematic Recurring Investing vs. Lump-Sum Deployment
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Choosing between recurring monthly contributions and a single upfront lump-sum deposit is a scenario-dependent decision:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
              Recurring Monthly Investing (SIP)
            </span>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-disc pl-4">
              <li>Often convenient for investors contributing from regular monthly income.</li>
              <li>Mitigates the timing risk of deploying a large sum right before a market correction.</li>
              <li>Later contributions have shorter compounding horizons.</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
              One-Time Lump-Sum Deployment
            </span>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-disc pl-4">
              <li>Can be relevant when an investor already has liquid capital available from a bonus or windfall.</li>
              <li>Allows 100% of capital to compound across the entire investment horizon.</li>
              <li>Carries higher exposure to short-term market entry valuations.</li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          To evaluate single lump sums under various discount rate and duration assumptions, use our{" "}
          <Link
            href="/calculators/future-value-calculator"
            className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
          >
            future value calculator
          </Link>{" "}
          or examine historical annualized growth using our{" "}
          <Link
            href="/calculators/cagr-calculator"
            className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
          >
            CAGR calculator
          </Link>.
        </p>
      </section>

      {/* 6. Inflation & Simplified Tax Modeling */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <DollarSign className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            6. Inflation Purchasing Power & Simplified Tax Modeling
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Long-term financial projections must account for purchasing power erosion and potential tax liability:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Inflation Discounting:</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Nominal maturity figures are discounted exponentially:
            </p>
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 font-mono text-center font-bold text-blue-600 dark:text-blue-400">
              {"Real Value = Nominal Value / (1 + Inflation Rate)ⁿ"}
            </div>
            <p className="text-[11px] text-slate-500">
              To analyze purchasing power changes across consumer price indices, visit our{" "}
              <Link
                href="/calculators/inflation-calculator"
                className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
              >
                inflation calculator
              </Link>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Simplified Tax Drag Assumption:</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The calculator applies a simplified percentage deduction against estimated gains (excluding principal):
            </p>
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 font-mono text-center font-bold text-blue-600 dark:text-blue-400">
              {"Tax Drag = Estimated Gains × Tax Rate %"}
            </div>
            <p className="text-[11px] text-slate-500">
              This provides an illustrative estimate. Actual tax liabilities depend on jurisdiction, account type, asset holding periods, and applicable statutory tax brackets.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Goal Seeker & SWP Drawdown */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <RefreshCw className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            7. Goal-Based Planning & Systematic Withdrawal (SWP)
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Goal Seeker (Reverse Annuity):</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Solves for the estimated monthly contribution required to achieve a target future goal:
            </p>
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 font-mono text-center font-bold text-blue-600 dark:text-blue-400">
              {"P_req = Target / [ ((1+i)ⁿ − 1)/i × (1+i) ]"}
            </div>
            <p className="text-[11px] text-slate-500">
              Example: Accumulating $250,000 in 15 years @ 9% return models a required deposit of <strong>$655.75/month</strong> ($118,035 principal + $131,965.63 returns).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Systematic Withdrawal (Decumulation):</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Models periodic cash distributions during retirement while remaining capital continues compounding.
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Under the calculator's constant-return assumptions, a withdrawal amount below periodic portfolio growth can theoretically preserve the balance. Actual retirement portfolios are subject to volatility, fees, inflation, and sequence-of-returns risk. For full retirement planning, use our{" "}
              <Link
                href="/calculators/retirement-calculator"
                className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
              >
                retirement calculator
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Common Investment Pitfalls */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            8. Common Recurring-Investment Pitfalls
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <strong className="font-semibold text-slate-900 dark:text-slate-100 block">1. Treating Return Assumptions as Guarantees</strong>
            <p className="text-slate-600 dark:text-slate-300">
              Assuming a hypothetical 10% or 12% modeling rate represents guaranteed annual growth rather than a volatile long-term average.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <strong className="font-semibold text-slate-900 dark:text-slate-100 block">2. Overlooking Expense Ratio Drag</strong>
            <p className="text-slate-600 dark:text-slate-300">
              Ignoring annual mutual fund management fees. A 1% ongoing expense ratio can erode tens of thousands of dollars over multi-decade horizons. Compare fund fees with our{" "}
              <Link
                href="/calculators/mutual-fund-calculator"
                className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
              >
                mutual fund fee calculator
              </Link>.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <strong className="font-semibold text-slate-900 dark:text-slate-100 block">3. Ignoring Inflation Erosion</strong>
            <p className="text-slate-600 dark:text-slate-300">
              Evaluating long-term wealth targets solely in nominal dollars without checking constant-dollar purchasing power.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <strong className="font-semibold text-slate-900 dark:text-slate-100 block">4. Stopping Contributions During Downturns</strong>
            <p className="text-slate-600 dark:text-slate-300">
              Halting automated recurring contributions during market pullbacks, which disrupts cost averaging and long-term compounding discipline.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Related Financial Calculators */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <ArrowUpRight className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            9. Explore Related Financial Calculators
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <Link
            href="/calculators/investment-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                Investment Calculator
              </span>
              <span className="text-slate-500 text-[11px]">Multi-asset portfolio growth modeling</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/calculators/compound-interest-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                Compound Interest Calculator
              </span>
              <span className="text-slate-500 text-[11px]">Daily, monthly, and annual compounding</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/calculators/future-value-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                Future Value Calculator
              </span>
              <span className="text-slate-500 text-[11px]">Time-value-of-money lump sum projections</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/calculators/retirement-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                Retirement Calculator
              </span>
              <span className="text-slate-500 text-[11px]">Nest egg and income replacement targets</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/calculators/inflation-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                Inflation Calculator
              </span>
              <span className="text-slate-500 text-[11px]">CPI purchasing power discounting</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/calculators/cagr-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                CAGR Calculator
              </span>
              <span className="text-slate-500 text-[11px]">Compound annual growth rate analysis</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* 10. Frequently Asked Questions */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            10. Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-3">
          {faqList.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5"
            >
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {faq.question}
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Methodology & Financial Disclaimer */}
      <section className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 text-[11px] leading-relaxed text-slate-500 space-y-1.5">
        <strong className="block font-semibold text-slate-700 dark:text-slate-300">
          Calculation Methodology & Non-Advisory Disclaimer:
        </strong>
        <p>
          Calculations execute 100% client-side in your browser using standard IEEE 754 floating-point annuity-due compounding equations. The SIP Health Score is a calculator-generated heuristic indicator based on tenure and accumulation ratios, not a fiduciary investment evaluation. This calculator is provided for educational and mathematical scenario modeling only and does not constitute investment advice, financial planning, or a recommendation to purchase specific securities. Past historical performance does not guarantee future results.
        </p>
      </section>
    </div>
  );
}

export default SipContent;

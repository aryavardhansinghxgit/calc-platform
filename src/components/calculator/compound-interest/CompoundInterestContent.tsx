"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  HelpCircle,
  TrendingUp,
  Calculator as CalcIcon,
  PieChart,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Percent,
  Zap,
  Clock,
  DollarSign,
  Scale,
  Award,
  Layers,
  Sliders,
} from "lucide-react";

export function CompoundInterestContent() {
  return (
    <article className="prose dark:prose-invert max-w-none space-y-12 text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
      {/* ==========================================
          H2 1: WHAT IS COMPOUND INTEREST?
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <TrendingUp className="h-6 w-6 text-blue-600" /> What Is Compound Interest?
        </h2>

        <p className="text-base font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed">
          <strong>Compound interest</strong> is the addition of interest to the principal sum of a loan or deposit—or in simpler terms, <em>interest earned on interest</em>. It is the fundamental mechanism that powers modern wealth accumulation, allowing financial assets to grow exponentially over time rather than linearly.
        </p>

        <p>
          When you place funds in a compounding financial vehicle (such as a high-yield savings account, fixed deposit, or reinvested index fund), the initial money you deposit generates an interest payout. In the subsequent period, interest is calculated not just on your initial deposit, but on your <strong>initial deposit plus all previously accumulated interest</strong>. This continuous cycle creates an accelerating snowball effect: the larger your balance becomes, the faster your interest earnings compound.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 space-y-2">
            <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Earning Compound Interest (Wealth Generation)
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              When you invest or save, compounding works continuously in your favor. Reinvesting your yield turns small regular contributions into large fortunes over multi-decade horizons in vehicles like 401(k)s, IRAs, and mutual funds.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 space-y-2">
            <h3 className="text-sm font-bold text-rose-900 dark:text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-rose-500" /> Paying Compound Interest (Debt Snowball)
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              When you borrow money (e.g., credit cards or revolving lines of credit), compound interest works against you. Unpaid interest is added to your principal balance, causing debt to escalate rapidly if minimum payments are missed.
            </p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 pt-2">Real-World Examples of Compounding Vehicles</h3>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
          <li><strong>Savings Accounts & CDs:</strong> Banks pay monthly or daily compounding interest on cash deposits. Explore our <Link href="/category/finance" className="text-blue-600 font-semibold hover:underline">Savings Calculator</Link> to project high-yield savings growth.</li>
          <li><strong>Mutual Funds & ETFs:</strong> Reinvested dividends purchase additional shares, expanding your underlying asset base automatically. Use our <Link href="/calculators/investment-calculator" className="text-blue-600 font-semibold hover:underline">Investment Calculator</Link> for equity portfolio projections.</li>
          <li><strong>Retirement Accounts (401k / Roth IRA):</strong> Multi-decade tax-advantaged compounding builds retirement security. Try our <Link href="/calculators/retirement-calculator" className="text-blue-600 font-semibold hover:underline">Retirement Calculator</Link>.</li>
          <li><strong>Credit Cards:</strong> Lenders charge daily compound interest on unpaid balances, driving high effective annual percentage rates (APR).</li>
        </ul>

        {/* Standard Formula Box */}
        <div className="p-5 rounded-xl bg-zinc-900 text-white font-sans tabular-nums space-y-3 shadow-md my-4">
          <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider block">Standard Compound Interest Formula</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-400">
            A = P &times; (1 + r / n)<sup>(n &times; t)</sup>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300 pt-2 border-t border-zinc-800">
            <div><strong>A</strong> = Future Value (Final Accumulated Balance)</div>
            <div><strong>P</strong> = Principal (Initial Deposit / Loan Amount)</div>
            <div><strong>r</strong> = Nominal Annual Interest Rate (as a decimal)</div>
            <div><strong>n</strong> = Compounding Frequency (periods per year)</div>
            <div><strong>t</strong> = Time Horizon in Years</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Simple Numerical Worked Example:</h4>
          <p>
            Suppose you deposit <strong>$1,000</strong> in a certificate of deposit paying <strong>6% annual interest</strong> compounded <strong>semi-annually (n = 2)</strong> for <strong>2 years (t = 2)</strong>.
          </p>
          <div className="font-sans tabular-nums text-indigo-600 dark:text-indigo-400 font-semibold">
            A = 1,000 &times; (1 + 0.06 / 2)<sup>(2 &times; 2)</sup> = 1,000 &times; (1.03)<sup>4</sup> = 1,000 &times; 1.125508 = $1,125.51
          </div>
          <p className="text-zinc-500">
            Total interest earned over 2 years is <strong>$125.51</strong>, which is <strong>$5.51 more</strong> than simple interest ($120.00) because interest earned in period 1 earned additional interest in periods 2, 3, and 4.
          </p>
        </div>
      </section>

      {/* ==========================================
          H2 2: HOW COMPOUND INTEREST WORKS
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <Clock className="h-6 w-6 text-indigo-600" /> How Compound Interest Works: Step-by-Step Breakdown
        </h2>

        <p>
          To intuitively understand compound growth, observe how a <strong>$10,000 deposit</strong> earning <strong>8% annual interest</strong> grows over 10 consecutive years. Notice how the annual interest earned increases every single year even though you never add another dollar of fresh capital:
        </p>

        <ul className="list-disc pl-5 space-y-1.5 text-xs">
          <li><strong>Year 1:</strong> Interest is earned on the initial $10,000 principal ($10,000 &times; 8% = $800). Ending balance: $10,800.</li>
          <li><strong>Year 2:</strong> Interest is earned on the new balance of $10,800 ($10,800 &times; 8% = $864). Ending balance: $11,664.</li>
          <li><strong>Year 3:</strong> Interest is earned on the new balance of $11,664 ($11,664 &times; 8% = $933.12). Ending balance: $12,597.12.</li>
        </ul>

        {/* 10-Year Year-by-Year Schedule Table */}
        <div className="overflow-x-auto my-4">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-700">
              <tr>
                <th className="p-3">Year</th>
                <th className="p-3">Beginning Balance ($)</th>
                <th className="p-3">Interest Earned (8% Annual)</th>
                <th className="p-3">Ending Balance ($)</th>
                <th className="p-3">Cumulative Growth (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-sans tabular-nums">
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold font-sans">Year 1</td>
                <td className="p-3">$10,000.00</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+$800.00</td>
                <td className="p-3 font-bold">$10,800.00</td>
                <td className="p-3 text-zinc-500">8.00%</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold font-sans">Year 2</td>
                <td className="p-3">$10,800.00</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+$864.00</td>
                <td className="p-3 font-bold">$11,664.00</td>
                <td className="p-3 text-zinc-500">16.64%</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold font-sans">Year 3</td>
                <td className="p-3">$11,664.00</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+$933.12</td>
                <td className="p-3 font-bold">$12,597.12</td>
                <td className="p-3 text-zinc-500">25.97%</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold font-sans">Year 4</td>
                <td className="p-3">$12,597.12</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+$1,007.77</td>
                <td className="p-3 font-bold">$13,604.89</td>
                <td className="p-3 text-zinc-500">36.05%</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold font-sans">Year 5</td>
                <td className="p-3">$13,604.89</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+$1,088.39</td>
                <td className="p-3 font-bold">$14,693.28</td>
                <td className="p-3 text-zinc-500">46.93%</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold font-sans">Year 6</td>
                <td className="p-3">$14,693.28</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+$1,175.46</td>
                <td className="p-3 font-bold">$15,868.74</td>
                <td className="p-3 text-zinc-500">58.69%</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold font-sans">Year 7</td>
                <td className="p-3">$15,868.74</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+$1,269.50</td>
                <td className="p-3 font-bold">$17,138.24</td>
                <td className="p-3 text-zinc-500">71.38%</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold font-sans">Year 8</td>
                <td className="p-3">$17,138.24</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+$1,371.06</td>
                <td className="p-3 font-bold">$18,509.30</td>
                <td className="p-3 text-zinc-500">85.09%</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold font-sans">Year 9</td>
                <td className="p-3">$18,509.30</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+$1,480.74</td>
                <td className="p-3 font-bold">$19,990.05</td>
                <td className="p-3 text-zinc-500">99.90%</td>
              </tr>
              <tr className="bg-emerald-50/70 dark:bg-emerald-950/40 hover:bg-emerald-100/70 font-bold">
                <td className="p-3 font-sans">Year 10</td>
                <td className="p-3">$19,990.05</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+$1,599.20</td>
                <td className="p-3 font-bold text-emerald-700 dark:text-emerald-300">$21,589.25</td>
                <td className="p-3 text-emerald-600">115.89%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs leading-relaxed">
          <strong>Why the Growth Curve Steepens:</strong> In Year 1, interest generated $800. By Year 10, annual interest reached $1,599.20—nearly double the first year's payout! This exponential slope occurs because the base upon which interest is calculated grows every single year.
        </p>
      </section>

      {/* ==========================================
          H2 3: COMPOUND INTEREST FORMULA EXPLAINED
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <Percent className="h-6 w-6 text-purple-600" /> Compound Interest Formulas & Mathematical Mechanics
        </h2>

        <p>
          Depending on your financial objective, different mathematical rearrangements of the compound interest formula are required.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div className="p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 space-y-2">
            <span className="text-xs font-bold text-purple-900 dark:text-purple-300 block">1. Future Value Formula (FV)</span>
            <div className="font-sans tabular-nums text-sm font-black text-purple-700 dark:text-purple-300">
              FV = P &times; (1 + r/n)<sup>nt</sup>
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
              Used to calculate what a current lump-sum investment will grow into in the future. Calculate future wealth using our <Link href="/calculators/future-value-calculator" className="text-purple-600 font-semibold hover:underline">Future Value Calculator</Link>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-2">
            <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 block">2. Present Value Formula (PV)</span>
            <div className="font-sans tabular-nums text-sm font-black text-indigo-700 dark:text-indigo-300">
              PV = FV / (1 + r/n)<sup>nt</sup>
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
              Used to determine how much money you must deposit today to reach a specific financial target in the future. Try our <Link href="/calculators/present-value-calculator" className="text-indigo-600 font-semibold hover:underline">Present Value Calculator</Link>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 space-y-2">
            <span className="text-xs font-bold text-blue-900 dark:text-blue-300 block">3. CAGR / Required Return Rate</span>
            <div className="font-sans tabular-nums text-sm font-black text-blue-700 dark:text-blue-300">
              r = n &times; [(FV/P)<sup>1/(nt)</sup> &minus; 1]
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
              Used to find the exact annual return rate needed to turn principal P into future value FV. See our <Link href="/calculators/roi-calculator" className="text-blue-600 font-semibold hover:underline">ROI Calculator</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          H2 4: SIMPLE INTEREST VS COMPOUND INTEREST
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <Scale className="h-6 w-6 text-emerald-600" /> Simple Interest vs Compound Interest: Detailed Comparison
        </h2>

        <p>
          The distinction between simple interest and compound interest represents the difference between linear accumulation and exponential compounding.
        </p>

        {/* Detailed Feature Comparison Table */}
        <div className="overflow-x-auto my-4">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-700">
              <tr>
                <th className="p-3">Feature</th>
                <th className="p-3">Simple Interest</th>
                <th className="p-3">Compound Interest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold">Interest Calculation</td>
                <td className="p-3 text-zinc-600 dark:text-zinc-400">Calculated strictly on the initial principal sum.</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Calculated on principal PLUS accumulated interest.</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold">Growth Pattern</td>
                <td className="p-3 text-zinc-600 dark:text-zinc-400">Linear growth (equal dollar amounts each year).</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Exponential growth (accelerating annual earnings).</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold">Long-Term Returns</td>
                <td className="p-3 text-zinc-600 dark:text-zinc-400">Substantially lower over multi-year horizons.</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Exponentially higher over 10+ year timeframes.</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold">Savings Accounts</td>
                <td className="p-3 text-zinc-600 dark:text-zinc-400">Rarely used in modern retail banking.</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Standard format for savings, CDs, and money markets.</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold">Loans</td>
                <td className="p-3 text-zinc-600 dark:text-zinc-400">Used for short-term car loans or personal notes.</td>
                <td className="p-3 text-zinc-600 dark:text-zinc-400">Used for mortgages, student loans, and credit cards.</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold">Mathematical Complexity</td>
                <td className="p-3 font-sans tabular-nums text-zinc-600">I = P &times; r &times; t</td>
                <td className="p-3 font-sans tabular-nums text-emerald-600 font-bold">A = P &times; (1 + r/n)<sup>nt</sup></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 20-Year Comparative Worked Example */}
        <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 space-y-2 text-xs">
          <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">20-Year Case Study ($10,000 at 8% Interest):</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-emerald-900">
              <span className="font-bold block text-zinc-700 dark:text-zinc-300">Simple Interest Result (Linear)</span>
              <div className="font-sans tabular-nums text-base font-bold text-zinc-800 dark:text-zinc-200 mt-1">$26,000.00</div>
              <span className="text-[11px] text-zinc-500 block">$10,000 principal + $16,000 simple interest ($800/yr &times; 20)</span>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-emerald-300 dark:border-emerald-700">
              <span className="font-bold block text-emerald-600 dark:text-emerald-400">Compound Interest Result (Monthly n=12)</span>
              <div className="font-sans tabular-nums text-base font-black text-emerald-600 dark:text-emerald-400 mt-1">$49,268.03</div>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-300 block">$10,000 principal + $39,268.03 compound interest!</span>
            </div>
          </div>
          <p className="pt-1 text-zinc-700 dark:text-zinc-300">
            <strong>The Compounding Advantage:</strong> Compound interest generated an extra <strong>+$23,268.03 in pure wealth</strong> (+145.4% more profit) on the exact same $10,000 investment!
          </p>
        </div>
      </section>

      {/* ==========================================
          H2 5: DIFFERENT COMPOUNDING FREQUENCIES
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <Layers className="h-6 w-6 text-amber-500" /> Impact of Compounding Frequencies
        </h2>

        <p>
          The compounding frequency specifies how often accrued interest is calculated and added back to the principal balance. As frequency increases, interest is reinvested earlier, generating slightly higher yields.
        </p>

        {/* Frequencies Comparison Table ($10k at 8% for 10 Years) */}
        <div className="overflow-x-auto my-4">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-700">
              <tr>
                <th className="p-3">Compounding Frequency</th>
                <th className="p-3">Periods / Year (n)</th>
                <th className="p-3">Final Balance ($)</th>
                <th className="p-3">Interest Earned ($)</th>
                <th className="p-3">Effective Annual Yield (APY)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-sans tabular-nums">
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-sans font-medium">Annual</td>
                <td className="p-3">1</td>
                <td className="p-3 font-bold">$21,589.25</td>
                <td className="p-3 text-emerald-600 font-semibold">+$11,589.25</td>
                <td className="p-3 text-zinc-500">8.0000%</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-sans font-medium">Semi-Annual</td>
                <td className="p-3">2</td>
                <td className="p-3 font-bold">$21,911.23</td>
                <td className="p-3 text-emerald-600 font-semibold">+$11,911.23</td>
                <td className="p-3 text-zinc-500">8.1600%</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-sans font-medium">Quarterly</td>
                <td className="p-3">4</td>
                <td className="p-3 font-bold">$22,080.40</td>
                <td className="p-3 text-emerald-600 font-semibold">+$12,080.40</td>
                <td className="p-3 text-zinc-500">8.2432%</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-sans font-medium">Monthly</td>
                <td className="p-3">12</td>
                <td className="p-3 font-bold">$22,196.40</td>
                <td className="p-3 text-emerald-600 font-semibold">+$12,196.40</td>
                <td className="p-3 text-zinc-500">8.2999%</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-sans font-medium">Daily</td>
                <td className="p-3">365</td>
                <td className="p-3 font-bold">$22,253.46</td>
                <td className="p-3 text-emerald-600 font-semibold">+$12,253.46</td>
                <td className="p-3 text-zinc-500">8.3278%</td>
              </tr>
              <tr className="bg-amber-50/70 dark:bg-amber-950/40 hover:bg-amber-100/70 font-bold">
                <td className="p-3 font-sans">Continuous (A = Pe^rt)</td>
                <td className="p-3">&infin;</td>
                <td className="p-3 text-amber-900 dark:text-amber-100">$22,255.41</td>
                <td className="p-3 text-amber-600 font-bold">+$12,255.41</td>
                <td className="p-3 text-amber-600">8.3287%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ==========================================
          H2 6: APR VS APY
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <Percent className="h-6 w-6 text-indigo-600" /> APR vs. APY: Knowing the Crucial Difference
        </h2>

        <p>
          Financial institutions frequently quote interest rates using two distinct metrics: <strong>APR (Annual Percentage Rate)</strong> and <strong>APY (Annual Percentage Yield)</strong>. Understanding the difference is vital when comparing loans or investment products.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 space-y-2">
            <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300">APR (Annual Percentage Rate)</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              The stated nominal annual rate. It does NOT reflect intra-year compounding. Lenders prefer quoting APR on credit cards and mortgages because it makes borrowing rates appear lower.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 space-y-2">
            <h3 className="text-sm font-bold text-purple-900 dark:text-purple-300">APY (Annual Percentage Yield)</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              The effective annual return including compounding. Banks quote APY on savings accounts and CDs because intra-year compounding makes return yields appear higher.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900 text-white font-sans tabular-nums space-y-2 text-xs">
          <span className="text-indigo-400 font-bold">APY Conversion Formula:</span>
          <div className="text-base font-bold text-emerald-400">
            APY = (1 + APR / n)<sup>n</sup> &minus; 1
          </div>
          <p className="text-zinc-400 text-[11px]">
            Example: A credit card charging 12% APR with monthly compounding (n = 12) has an effective APY of:
            <br />
            (1 + 0.12/12)<sup>12</sup> &minus; 1 = (1.01)<sup>12</sup> &minus; 1 = <strong>12.6825%</strong>.
          </p>
        </div>
      </section>

      {/* ==========================================
          H2 7: EFFECTIVE ANNUAL RATE (EAR)
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <Award className="h-6 w-6 text-purple-600" /> Effective Annual Rate (EAR)
        </h2>

        <p>
          <strong>Effective Annual Rate (EAR)</strong>—mathematically equivalent to APY—is the universal benchmark used in corporate finance and quantitative banking to evaluate the true annual cost of debt or return on investments across mismatched compounding schedules.
        </p>

        {/* EAR Table for 10% APR */}
        <div className="overflow-x-auto my-4">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-700">
              <tr>
                <th className="p-3">Nominal Rate (APR)</th>
                <th className="p-3">Compounding Schedule</th>
                <th className="p-3">Effective Annual Rate (EAR / APY)</th>
                <th className="p-3">Effective Yield Increase</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-sans tabular-nums">
              <tr>
                <td className="p-3 font-sans">10.00%</td>
                <td className="p-3 font-sans">Annual (n = 1)</td>
                <td className="p-3 font-bold text-zinc-800 dark:text-zinc-200">10.0000%</td>
                <td className="p-3 text-zinc-400">Baseline</td>
              </tr>
              <tr>
                <td className="p-3 font-sans">10.00%</td>
                <td className="p-3 font-sans">Semi-Annual (n = 2)</td>
                <td className="p-3 font-bold text-zinc-800 dark:text-zinc-200">10.2500%</td>
                <td className="p-3 text-emerald-600">+0.2500%</td>
              </tr>
              <tr>
                <td className="p-3 font-sans">10.00%</td>
                <td className="p-3 font-sans">Quarterly (n = 4)</td>
                <td className="p-3 font-bold text-zinc-800 dark:text-zinc-200">10.3813%</td>
                <td className="p-3 text-emerald-600">+0.3813%</td>
              </tr>
              <tr>
                <td className="p-3 font-sans">10.00%</td>
                <td className="p-3 font-sans">Monthly (n = 12)</td>
                <td className="p-3 font-bold text-zinc-800 dark:text-zinc-200">10.4713%</td>
                <td className="p-3 text-emerald-600">+0.4713%</td>
              </tr>
              <tr>
                <td className="p-3 font-sans">10.00%</td>
                <td className="p-3 font-sans">Daily (n = 365)</td>
                <td className="p-3 font-bold text-zinc-800 dark:text-zinc-200">10.5156%</td>
                <td className="p-3 text-emerald-600">+0.5156%</td>
              </tr>
              <tr className="bg-purple-50/70 dark:bg-purple-950/40 font-bold">
                <td className="p-3 font-sans">10.00%</td>
                <td className="p-3 font-sans">Continuous</td>
                <td className="p-3 font-bold text-purple-700 dark:text-purple-300">10.5171%</td>
                <td className="p-3 text-purple-600">+0.5171%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ==========================================
          H2 8: THE POWER OF COMPOUND INTEREST OVER TIME
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <Clock className="h-6 w-6 text-blue-600" /> Time Horizon: The Single Most Dominant Factor
        </h2>

        <p>
          While principal and interest rates matter, <strong>time horizon is the exponential variable</strong> in compound growth. Doubling your investment horizon doesn't double your return—it quadruples or octuples it!
        </p>

        {/* Growth over 5, 10, 20, 30, 40 years ($5k at 8%) */}
        <div className="overflow-x-auto my-4">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-700">
              <tr>
                <th className="p-3">Time Horizon</th>
                <th className="p-3">Initial Deposit ($)</th>
                <th className="p-3">Final Accumulated Balance ($)</th>
                <th className="p-3">Total Interest Earned ($)</th>
                <th className="p-3">Growth Multiplier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-sans tabular-nums">
              <tr>
                <td className="p-3 font-bold font-sans">5 Years</td>
                <td className="p-3">$5,000.00</td>
                <td className="p-3 font-bold">$7,346.64</td>
                <td className="p-3 text-emerald-600">+$2,346.64</td>
                <td className="p-3 text-zinc-500">1.47x</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">10 Years</td>
                <td className="p-3">$5,000.00</td>
                <td className="p-3 font-bold">$10,794.62</td>
                <td className="p-3 text-emerald-600">+$5,794.62</td>
                <td className="p-3 text-zinc-500">2.16x</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">20 Years</td>
                <td className="p-3">$5,000.00</td>
                <td className="p-3 font-bold">$23,304.79</td>
                <td className="p-3 text-emerald-600">+$18,304.79</td>
                <td className="p-3 text-zinc-500">4.66x</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">30 Years</td>
                <td className="p-3">$5,000.00</td>
                <td className="p-3 font-bold">$50,313.28</td>
                <td className="p-3 text-emerald-600">+$45,313.28</td>
                <td className="p-3 text-zinc-500">10.06x</td>
              </tr>
              <tr className="bg-blue-50/70 dark:bg-blue-950/40 font-bold">
                <td className="p-3 font-sans">40 Years</td>
                <td className="p-3">$5,000.00</td>
                <td className="p-3 text-blue-700 dark:text-blue-300">$108,622.61</td>
                <td className="p-3 text-emerald-600 font-bold">+$103,622.61</td>
                <td className="p-3 text-blue-600">21.72x</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ==========================================
          H2 9: RETIREMENT PLANNING
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <ShieldCheck className="h-6 w-6 text-emerald-600" /> Compound Interest & Retirement Planning
        </h2>

        <p>
          Retirement plans like 401(k)s, Traditional IRAs, and Roth IRAs utilize regular monthly contributions coupled with tax-free or tax-deferred compounding. Calculate monthly contribution trajectories using our <Link href="/calculators/sip-calculator" className="text-blue-600 font-semibold hover:underline">SIP Calculator</Link> or <Link href="/calculators/fd-calculator" className="text-blue-600 font-semibold hover:underline">FD Calculator</Link>.
        </p>

        <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 space-y-2 text-xs">
          <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">The Power of $300/Month from Age 25 to 65:</h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            If an investor contributes <strong>$300 per month</strong> into a low-cost index fund earning an average <strong>8% annual return</strong> over 40 years:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-sans tabular-nums pt-1">
            <div className="p-2 rounded bg-white dark:bg-zinc-900">
              <span className="text-[10px] text-zinc-500 block">Total Out-of-Pocket:</span>
              <span className="font-bold">$144,000</span>
            </div>
            <div className="p-2 rounded bg-white dark:bg-zinc-900">
              <span className="text-[10px] text-zinc-500 block">Total Interest Earned:</span>
              <span className="font-bold text-emerald-600">+$905,181</span>
            </div>
            <div className="p-2 rounded bg-emerald-600 text-white font-bold">
              <span className="text-[10px] text-emerald-200 block">Final Nest Egg:</span>
              <span>$1,049,181</span>
            </div>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 pt-1">
            Over <strong>86% of the final million-dollar balance</strong> consists of pure compound interest!
          </p>
        </div>
      </section>

      {/* ==========================================
          H2 10: COMPOUND INTEREST IN LOANS & DEBT
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <AlertTriangle className="h-6 w-6 text-rose-600" /> The Dark Side: Compound Interest in Loans & Debt
        </h2>

        <p>
          While compounding is an investor's greatest ally, it is a borrower's heaviest burden. Credit cards compound interest <strong>daily</strong> on revolving balances. If you make only minimum monthly payments, your payment primarily covers daily interest charges, leaving the principal balance virtually untouched.
        </p>

        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Strategies to Prevent Debt Compounding:</h3>
        <ul className="list-disc pl-5 space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
          <li><strong>Pay Credit Card Balances in Full:</strong> Avoid revolving balances to prevent daily compound interest charges.</li>
          <li><strong>Use the Debt Avalanche Method:</strong> Target extra payments toward loans with the highest APY first.</li>
          <li><strong>Make Extra Principal Payments:</strong> Accelerating principal reduction curtails future interest compounding.</li>
        </ul>
      </section>

      {/* ==========================================
          H2 11: FACTORS THAT AFFECT COMPOUND GROWTH
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <Sliders className="h-6 w-6 text-blue-600" /> 5 Key Factors Affecting Compound Growth
        </h2>

        <ol className="list-decimal pl-5 space-y-2 text-xs">
          <li><strong>Initial Principal ($P$):</strong> The starting seed capital. Higher initial deposits provide a larger base for period 1 compounding.</li>
          <li><strong>Interest Rate ($r$):</strong> The rate of return. Small increases in interest rate yield dramatic non-linear compounding gains over multi-decade spans.</li>
          <li><strong>Time Horizon ($t$):</strong> The single most dominant factor. Exponential acceleration requires time to mature.</li>
          <li><strong>Compounding Frequency ($n$):</strong> Daily vs monthly vs annual compounding schedules. More frequent intervals increase effective APY.</li>
          <li><strong>Additional Contributions ($PMT$):</strong> Regular monthly or annual additions inject fresh principal, compounding alongside existing balances.</li>
        </ol>
      </section>

      {/* ==========================================
          H2 12: COMMON MISTAKES INVESTORS MAKE
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <AlertTriangle className="h-6 w-6 text-amber-500" /> 6 Common Mistakes That Severely Undermine Compounding
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h4 className="font-bold text-zinc-800 dark:text-zinc-200">1. Delaying the Start Date</h4>
            <p className="text-zinc-600 dark:text-zinc-400">Waiting 10 years to start investing can reduce your final retirement balance by over 50% due to lost compounding years.</p>
          </div>

          <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h4 className="font-bold text-zinc-800 dark:text-zinc-200">2. Ignoring High Management Fees</h4>
            <p className="text-zinc-600 dark:text-zinc-400">A 2% annual expense ratio erodes compounding returns significantly over 30 years compared to low-cost index funds (0.05%).</p>
          </div>

          <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h4 className="font-bold text-zinc-800 dark:text-zinc-200">3. Premature Cash Withdrawals</h4>
            <p className="text-zinc-600 dark:text-zinc-400">Cashing out investment dividends or retirement accounts breaks the continuous compounding cycle.</p>
          </div>

          <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h4 className="font-bold text-zinc-800 dark:text-zinc-200">4. Confusing APR with APY</h4>
            <p className="text-zinc-600 dark:text-zinc-400">Failing to evaluate the effective annual rate (EAR) when comparing loan offers or savings accounts.</p>
          </div>
        </div>
      </section>

      {/* ==========================================
          H2 13: TIPS TO MAXIMIZE COMPOUND GROWTH
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <Award className="h-6 w-6 text-emerald-600" /> Actionable Strategies to Maximize Compound Growth
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Start Immediately:</strong> Time in the market beats timing the market.</span>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Automate Reinvestment:</strong> Enable DRIP (Dividend Reinvestment Plans) on stocks and mutual funds.</span>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Escalate Contributions:</strong> Increase your monthly deposit rate by 1% to 2% every year.</span>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Minimize Investment Fees:</strong> Choose low-cost index funds and ETFs.</span>
          </div>
        </div>
      </section>

      {/* ==========================================
          H2 14: FREQUENTLY ASKED QUESTIONS (FAQ)
         ========================================== */}
      <section className="space-y-6 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <HelpCircle className="h-6 w-6 text-indigo-600" /> Frequently Asked Questions (15+ Comprehensive FAQs)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">1. What is compound interest?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Compound interest is interest calculated on both the initial principal deposit and all cumulative interest earned from prior periods.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">2. How is compound interest calculated?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              It is calculated using the formula A = P(1 + r/n)^(nt), where P is principal, r is rate, n is compounding frequency, and t is time in years.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">3. What is the difference between APR and APY?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              APR is the stated nominal rate without compounding, while APY reflects the true effective annual rate including intra-year compounding.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">4. What compounding frequency is best for investors?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Higher compounding frequencies (such as daily or continuous) maximize returns because earnings are reinvested earlier.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">5. Can compound interest make you rich?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Yes. Consistent monthly deposits combined with 20 to 40 years of compound growth are responsible for building self-made retirement millionaires.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">6. How does compound interest affect debt and loans?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              On loans like credit cards, unpaid interest compounds daily, causing total balances to multiply rapidly if only minimum payments are made.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">7. What is Effective Annual Rate (EAR)?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              EAR is the standardized annual return metric that accounts for intra-year compounding, allowing fair comparisons across different compounding frequencies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">8. How does inflation affect compound interest growth?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Inflation reduces real purchasing power. Real return equals nominal compound return minus the inflation rate.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">9. What is continuous compounding?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Continuous compounding assumes interest is calculated and added constantly at every infinitely small instant using A = Pe^(rt).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">10. How much can $10,000 grow in 20 years at 8%?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              $10,000 grows to $46,609 under annual compounding and $49,268 under monthly compounding at 8% over 20 years.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">11. What is the Rule of 72?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              A quick mental rule to estimate how many years it takes to double your money by dividing 72 by the annual return percentage (72 / r).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">12. Do savings accounts compound daily or monthly?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Most high-yield savings accounts compound interest daily and credit it to your account on the last day of each month.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">13. Is simple interest ever better than compound interest?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              For borrowers, simple interest is vastly superior because debt does not snowball. For investors, compound interest is always better.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">14. What is the difference between nominal and effective rate?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              The nominal rate is the stated annual percentage without intra-year compounding, while the effective rate is the actual rate earned including compounding.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">15. How do taxes affect compound interest returns?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Taxes on annual interest payments reduce the compounding base each year unless funds are held in tax-deferred or tax-free accounts like 401(k)s or Roth IRAs.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Calculator as CalcIcon,
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
  ShieldCheck,
  Percent,
  Zap,
} from "lucide-react";

export function CompoundInterestContent() {
  const faqList = [
    {
      question: "What is compound interest?",
      answer:
        "Compound interest is the interest calculated on the initial principal plus all accumulated interest from prior periods, allowing savings and investments to grow exponentially over time.",
    },
    {
      question: "What is the mathematical compound interest formula?",
      answer:
        "The standard formula is A = P × (1 + r/n)^(n×t), where A is future value, P is principal, r is nominal annual interest rate as a decimal, n is compounding frequency per year, and t is years.",
    },
    {
      question: "What is the difference between APR and APY?",
      answer:
        "In this calculator, APR is treated as the stated nominal annual rate before intra-year compounding, while APY (Annual Percentage Yield) reflects the effective annual return earned when intra-year compounding is included. Official consumer APR disclosures on loans may incorporate additional upfront fees and finance charges.",
    },
    {
      question: "How does compounding frequency affect investment returns?",
      answer:
        "More frequent compounding (such as daily or monthly) reinvests earnings earlier, producing higher effective annual yields and larger final balances compared to annual compounding under the same nominal rate.",
    },
    {
      question: "What is Effective Annual Rate (EAR)?",
      answer:
        "Effective Annual Rate (EAR) is the standardized annualized rate that accounts for compounding within the year (EAR = (1 + r/n)^n - 1), allowing direct comparisons between financial products with differing compounding schedules.",
    },
    {
      question: "What is continuous compounding?",
      answer:
        "Continuous compounding represents the mathematical upper bound of compounding where interest is calculated and added constantly at every infinitely small instant using the formula A = P × e^(rt).",
    },
    {
      question: "What is the Rule of 72 and how accurate is it?",
      answer:
        "The Rule of 72 is a mental shortcut to estimate doubling time by dividing 72 by the annual interest rate (72 / r). It is accurate within 1% error for interest rates between 5% and 10%.",
    },
    {
      question: "How does simple interest differ from compound interest?",
      answer:
        "Simple interest calculates returns strictly on original principal (A = P × (1 + rt)), resulting in linear growth, whereas compound interest generates accelerating exponential growth.",
    },
    {
      question: "Can compound interest work against borrowers on debt?",
      answer:
        "Yes. When unpaid interest on revolving credit lines or loans is added back to the principal or calculated on a daily periodic basis, finance charges expand if balances are not paid off promptly.",
    },
    {
      question: "Is my calculation data private?",
      answer:
        "Yes. All computations execute 100% client-side in your web browser. No financial data, interest rates, or balances are transmitted to external servers.",
    },
  ];

  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200">
      {/* 1. What Is Compound Interest? */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <TrendingUp className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            1. What Is Compound Interest?
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <strong className="text-slate-900 dark:text-slate-100">Compound interest</strong> occurs when previously accumulated interest is added back to the principal sum of a deposit or loan, allowing subsequent interest calculations to be based on an expanding foundation. Compound interest can accelerate long-term capital growth because previously accrued interest can itself earn additional returns.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Earning Compound Growth (Assets)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              When saving or investing, compounding operates in your favor. Reinvesting interest and dividends accelerates wealth accumulation over multi-decade horizons in cash deposit vehicles and diversified portfolios.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" /> Paying Compound Interest (Liabilities)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              When borrowing money, compound interest increases the cost of carrying balances. If finance charges are added to unpaid principal or calculated daily, overall debt balances can escalate if payments are delayed.
            </p>
          </div>
        </div>
      </section>

      {/* 2. The Core Compound Interest Formula */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <CalcIcon className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            2. The Core Compound Interest Formula
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          For discrete compounding schedules (daily, monthly, quarterly, semi-annually, or annually), future value is computed using the standard compound interest formula:
        </p>

        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white font-mono text-center text-lg sm:text-xl font-bold tracking-wider shadow-md overflow-x-auto">
          {"A = P × (1 + r / n)^(n × t)"}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400 font-mono text-sm block">A</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Future Value</span>
            <span className="text-slate-500 text-[11px] block">Final accumulated balance</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-sm block">P</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Initial Principal</span>
            <span className="text-slate-500 text-[11px] block">Starting cash deposit</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-amber-600 dark:text-amber-400 font-mono text-sm block">r</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Annual Rate</span>
            <span className="text-slate-500 text-[11px] block">Nominal interest as decimal</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-purple-600 dark:text-purple-400 font-mono text-sm block">n</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Frequency</span>
            <span className="text-slate-500 text-[11px] block">Compounding cycles / year</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-cyan-600 dark:text-cyan-400 font-mono text-sm block">t</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Time Horizon</span>
            <span className="text-slate-500 text-[11px] block">Number of years</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
          <span className="font-bold text-slate-900 dark:text-slate-100 block">
            Zero-Rate Case (r = 0.0%):
          </span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            When the nominal interest rate is zero ($r = 0$), the formula simplifies to:
          </p>
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 font-mono font-bold text-blue-600 dark:text-blue-400 text-center">
            {"lim_{r → 0} A = P × (1 + 0)^(nt) = P"}
          </div>
          <p className="text-slate-500 text-[11px]">
            Under a zero-percent rate assumption, total interest earned is identically $0.00, and the ending balance equals the original principal deposit. To project single lump sums under various discount rate and duration assumptions, use our{" "}
            <Link
              href="/calculators/future-value-calculator"
              className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
            >
              future value calculator
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
          To illustrate discrete compounding mechanics, let us evaluate the mathematical model under a hypothetical scenario:
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
          <span className="font-bold text-slate-900 dark:text-slate-100 block">Hypothetical Model Parameters:</span>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
            <li><strong>Initial Principal Deposit (P):</strong> $10,000.00</li>
            <li><strong>Nominal Annual Interest Rate (r):</strong> 8.00% (0.08)</li>
            <li><strong>Compounding Frequency (n):</strong> 12 (Monthly Compounding)</li>
            <li><strong>Time Horizon (t):</strong> 20 Years (n × t = 240 monthly compounding cycles)</li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-bold block">Step 1: Compute Periodic Monthly Rate (i)</strong>
            <span className="font-mono text-slate-700 dark:text-slate-300 block">i = r / n = 0.08 / 12 ≈ 0.00666667 (0.6667% per month)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-bold block">Step 2: Compute Compounding Factor (1 + i)^(n×t)</strong>
            <span className="font-mono text-slate-700 dark:text-slate-300 block">(1 + 0.00666667)²⁴⁰ ≈ 4.92680277</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-bold block">Step 3: Solve Final Accumulated Value (A)</strong>
            <span className="font-mono text-slate-700 dark:text-slate-300 block">
              A = $10,000 × 4.92680277 = <strong>$49,268.03</strong>
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-bold block">Step 4: Decompose Principal & Compound Earnings</strong>
            <span className="font-mono text-slate-700 dark:text-slate-300 block">
              Initial Principal (P) = $10,000.00 (20.3% of ending balance)
            </span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
              Total Compound Interest Earned = $49,268.03 − $10,000.00 = <strong>$39,268.03</strong> (Growth Multiplier: 4.93x)
            </span>
          </div>
        </div>
      </section>

      {/* 4. Compounding Frequency Comparison */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Percent className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            4. Compounding Frequency: How Intervals Change Returns
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          The compounding frequency (n) specifies how often accrued interest is credited back to the principal balance during the year. Under identical starting principal (P = $10,000), annual nominal rate (r = 7.0%), and time horizon (t = 10 Years), more frequent compounding yields higher final balances due to earlier reinvestment of intermediate returns:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold">
              <tr>
                <th className="p-3">Compounding Schedule</th>
                <th className="p-3">Periods / Year (n)</th>
                <th className="p-3">Final Balance (A)</th>
                <th className="p-3">Total Interest Earned</th>
                <th className="p-3">Effective Annual Yield (APY)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-mono">
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">Annual</td>
                <td className="p-3">1</td>
                <td className="p-3">$19,671.51</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$9,671.51</td>
                <td className="p-3">7.0000%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">Semi-Annual</td>
                <td className="p-3">2</td>
                <td className="p-3">$19,897.89</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$9,897.89</td>
                <td className="p-3">7.1225%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">Quarterly</td>
                <td className="p-3">4</td>
                <td className="p-3">$20,015.97</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$10,015.97</td>
                <td className="p-3">7.1859%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">Monthly</td>
                <td className="p-3">12</td>
                <td className="p-3">$20,096.61</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$10,096.61</td>
                <td className="p-3">7.2290%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">Bi-Weekly</td>
                <td className="p-3">26</td>
                <td className="p-3">$20,118.59</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$10,118.59</td>
                <td className="p-3">7.2386%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">Weekly</td>
                <td className="p-3">52</td>
                <td className="p-3">$20,128.05</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$10,128.05</td>
                <td className="p-3">7.2458%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">Daily</td>
                <td className="p-3">365</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">$20,136.18</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">$10,136.18</td>
                <td className="p-3 font-bold">7.2501%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">Continuous</td>
                <td className="p-3">∞</td >
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">$20,137.53</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">$10,137.53</td>
                <td className="p-3 font-bold">7.2508%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500">
          Under the stated assumptions, increasing compounding frequency from Annual to Monthly produces an extra <strong>+$425.10</strong> in interest. Increasing from Daily to Continuous adds only <strong>+$1.35</strong> over 10 years, demonstrating asymptotic diminishing returns.
        </p>
      </section>

      {/* 5. APR vs. APY & Rate Conversion */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Scale className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            5. APR vs. APY & Effective Annual Rate (EAR)
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Financial institutions utilize distinct interest rate metrics depending on whether products involve borrowing or depositing funds:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Nominal Rate / Mathematical APR:</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The stated annual percentage rate before intra-year compounding is applied. In this calculator, APR is treated as a nominal rate ($r$) for mathematical compounding comparisons. Official consumer APR disclosures on loans under the Truth in Lending Act (TILA) may incorporate additional finance charges or origination fees.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Annual Percentage Yield (APY) & EAR:</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The standardized effective annual rate reflecting intra-year compounding over a 365-day year:
            </p>
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 font-mono text-center font-bold text-blue-600 dark:text-blue-400">
              {"APY = (1 + APR / n)ⁿ − 1"}
            </div>
            <p className="text-[11px] text-slate-500">
              Under the US Truth in Savings Act (TISA), banks disclose APY on deposit products so consumers can compare accounts with differing compounding schedules.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs leading-relaxed text-blue-950 dark:text-blue-200 space-y-1">
          <strong className="block font-semibold">Rate Conversion Mathematics:</strong>
          <span>
            A <strong>6.00% nominal rate with monthly compounding</strong> generates an Effective Annual Rate (EAR) of <strong>6.16778%</strong>. The mathematically equivalent nominal daily-compounded rate is <strong>5.98554%</strong> under the stated assumptions.
          </span>
        </div>
      </section>

      {/* 6. Continuous Compounding & Rule of 72 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Zap className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            6. Continuous Compounding & The Rule of 72
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Continuous Compounding (A = P eʳᵗ):</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              For a fixed nominal interest rate, continuous compounding represents the mathematical limiting value of increasingly frequent discrete compounding as $n$ approaches infinity.
            </p>
            <p className="text-[11px] text-slate-500">
              Hypothetical model: $5,000 at 6.5% over 5 years yields <strong>$6,920.15</strong> (+$1,920.15 interest, 1.3840x multiplier).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Rule of 72 Doubling Approximation:</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Estimates doubling time via $T \approx 72 / r$. For an 8% return, Rule of 72 estimates <strong>9.00 years</strong> vs. exact logarithmic doubling of <strong>9.01 years</strong> (0.07% error).
            </p>
            <p className="text-[11px] text-slate-500">
              The Rule of 69.3 ($69.3 / r$) provides closer estimates for continuous compounding or rates under 5%.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Simple vs. Compound Interest Growth */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Clock className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            7. Simple vs. Compound Interest: 30-Year Comparison
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Simple interest calculates returns strictly on the initial deposit ($A = P(1+rt)$), whereas compound interest reinvests earnings ($A = P(1+r/12)^(12×t)$):
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold">
              <tr>
                <th className="p-3">Milestone ($10,000 at 8% Annual Rate)</th>
                <th className="p-3">Simple Interest Balance</th>
                <th className="p-3">Compound Balance (Monthly)</th>
                <th className="p-3">Compounding Advantage (Bonus)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-mono">
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">Year 1</td>
                <td className="p-3">$10,800.00</td>
                <td className="p-3">$10,830.00</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+$30.00</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">Year 5</td>
                <td className="p-3">$14,000.00</td>
                <td className="p-3">$14,898.46</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+$898.46</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">Year 10</td>
                <td className="p-3">$18,000.00</td>
                <td className="p-3">$22,196.40</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+$4,196.40</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">Year 20</td>
                <td className="p-3">$26,000.00</td>
                <td className="p-3">$49,268.03</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+$23,268.03</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">Year 30</td>
                <td className="p-3">$34,000.00</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">$109,357.30</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+$75,357.30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. Practical Applications in Personal Finance */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <DollarSign className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            8. Practical Applications in Personal Finance
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Savings Accounts & CDs:</strong>
            <p className="text-slate-600 dark:text-slate-300">
              Commercial bank products differ in APY, compounding conventions, minimum balances, and early-withdrawal penalties. To model term deposit growth, evaluate our{" "}
              <Link
                href="/calculators/cd-calculator"
                className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
              >
                CD calculator
              </Link>{" "}
              or plan cash reserves with our{" "}
              <Link
                href="/calculators/savings-calculator"
                className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
              >
                savings calculator
              </Link>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Credit Cards & Debt:</strong>
            <p className="text-slate-600 dark:text-slate-300">
              Credit-card interest calculations depend on the issuer and cardholder agreement. Many U.S. issuers use daily periodic rates or average-daily-balance methods. To estimate payoff timelines, use our{" "}
              <Link
                href="/calculators/credit-card-payoff-calculator"
                className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
              >
                credit card payoff calculator
              </Link>.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
          <strong className="text-slate-900 dark:text-slate-100 block font-semibold">
            Hypothetical Ordinary-Annuity Model ($300/Month from Age 25 to 65 at 8% Return):
          </strong>
          <p className="text-slate-600 dark:text-slate-300">
            Consider an illustrative investor contributing $300/month for 40 years under a constant 8.0% annual return assumption compounded monthly:
          </p>
          <ul className="list-disc pl-5 space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
            <li>Total Out-of-Pocket Deposits: <strong>$144,000.00</strong></li>
            <li>Projected Ending Value: <strong>$1,049,181.18</strong></li>
            <li>Total Compound Earnings: <strong>$905,181.18</strong> (86.3% of the ending balance)</li>
          </ul>
          <p className="text-[11px] text-slate-500">
            *Assumed modeling parameter only; past performance does not guarantee future results. For retirement planning, explore our{" "}
            <Link
              href="/calculators/retirement-calculator"
              className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
            >
              retirement calculator
            </Link>{" "}
            and{" "}
            <Link
              href="/calculators/sip-calculator"
              className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
            >
              SIP calculator
            </Link>.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
          <strong className="text-slate-900 dark:text-slate-100 block font-semibold">
            Scenario-Specific Fee Drag ($100,000 Principal over 30 Years at 7% Gross Return):
          </strong>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            At a 0.0% fee, the balance grows to <strong>$761,225.50</strong>. After a 1.0% annual management fee (6.0% net return), the balance reaches <strong>$574,349.12</strong>, representing a cumulative fee drag of <strong>$186,876.38</strong>.
          </p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <Link
            href="/calculators/future-value-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                Future Value Calculator
              </span>
              <span className="text-slate-500 text-[11px]">Time-value-of-money projections</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/calculators/investment-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                Investment Calculator
              </span>
              <span className="text-slate-500 text-[11px]">Multi-asset portfolio modeling</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/calculators/savings-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                Savings Calculator
              </span>
              <span className="text-slate-500 text-[11px]">Cash savings accumulation</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/calculators/sip-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                SIP Calculator
              </span>
              <span className="text-slate-500 text-[11px]">Monthly recurring contributions</span>
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
              <span className="text-slate-500 text-[11px]">Nest egg and income targets</span>
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
              <span className="text-slate-500 text-[11px]">Annualized growth rate analysis</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/calculators/cd-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                CD Calculator
              </span>
              <span className="text-slate-500 text-[11px]">Certificate of deposit returns</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/calculators/credit-card-payoff-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                Credit Card Payoff Calculator
              </span>
              <span className="text-slate-500 text-[11px]">Revolving debt payoff schedules</span>
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

      {/* 11. Methodology & Privacy Disclaimer */}
      <section className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 text-[11px] leading-relaxed text-slate-500 space-y-1.5">
        <strong className="block font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          Client-Side Privacy & Mathematical Methodology:
        </strong>
        <p>
          All computations execute 100% client-side in your web browser using standard IEEE 754 floating-point equations. No financial inputs, interest rates, or balances are stored or transmitted to external servers. This calculator is provided for educational and mathematical scenario modeling only and does not constitute financial advice, banking recommendations, or a guarantee of investment returns. Past historical performance does not guarantee future results.
        </p>
      </section>
    </div>
  );
}

export default CompoundInterestContent;
